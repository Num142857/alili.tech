---
title: 手把手教你用原生JavaScript造轮子（1）——分页器（最后更新：Vue插件版本，本篇Over！）
hidden: true
categories: reprint
slug: 5eb2f494
date: 2018-10-24 08:17:54
---

{{< raw >}}

                    
<p>&#x65E5;&#x5E38;&#x5DE5;&#x4F5C;&#x4E2D;&#x7ECF;&#x5E38;&#x4F1A;&#x53D1;&#x73B0;&#x6709;&#x5927;&#x91CF;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x662F;&#x91CD;&#x590D;&#x7684;&#xFF0C;&#x800C;&#x7528;&#x522B;&#x4EBA;&#x7684;&#x63D2;&#x4EF6;&#x4E5F;&#x4E0D;&#x80FD;&#x5B8C;&#x7F8E;&#x89E3;&#x51B3;&#x4E00;&#x4E9B;&#x5B9A;&#x5236;&#x5316;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x51B3;&#x5B9A;&#x628A;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x7EC4;&#x4EF6;&#x62BD;&#x79BB;&#x3001;&#x5C01;&#x88C5;&#x51FA;&#x6765;&#xFF0C;&#x5F62;&#x6210;&#x4E00;&#x5957;&#x81EA;&#x5DF1;&#x7684;&#x63D2;&#x4EF6;&#x5E93;&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x6211;&#x5C06;&#x7528;&#x8FD9;&#x4E2A;&#x6559;&#x7A0B;&#x7CFB;&#x5217;&#x8BB0;&#x5F55;&#x4E0B;&#x6BCF;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#xFF0C;&#x624B;&#x628A;&#x624B;&#x6559;&#x4F60;&#x5982;&#x4F55;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x53BB;&#x9020;&#x51FA;&#x4E00;&#x5957;&#x5B9E;&#x7528;&#x6027;&#x3001;&#x53EF;&#x590D;&#x7528;&#x6027;&#x9AD8;&#x7684;&#x8F6E;&#x5B50;&#x3002;</p>
<p>So, Let&apos;s begin!</p>
<blockquote>&#x76EE;&#x524D;&#x9879;&#x76EE;&#x4F7F;&#x7528; ES5&#x53CA;UMD &#x89C4;&#x8303;&#x5C01;&#x88C5;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x524D;&#x7AEF;&#x6682;&#x65F6;&#x53EA;&#x652F;&#x6301;<code>&lt;script&gt;</code>&#x6807;&#x7B7E;&#x7684;&#x5F15;&#x5165;&#x65B9;&#x5F0F;&#xFF0C;&#x672A;&#x6765;&#x4F1A;&#x9010;&#x6B65;&#x7528; ES6 &#x8FDB;&#x884C;&#x91CD;&#x6784;<p>&#x6F14;&#x793A;&#x5730;&#x5740;&#xFF1A;<em><a href="https://csdoker.github.io/csdemos/pagination/" rel="nofollow noreferrer" target="_blank">pagination</a></em><br>Github&#xFF1A;<em><a href="https://github.com/csdoker/csdwheels" rel="nofollow noreferrer" target="_blank">csdwheels</a></em><br><em>&#x4E0D;&#x8981;&#x541D;&#x556C;&#x4F60;&#x7684;Star&#x54E6;~(&#x3003;&apos;&#x25BD;&apos;&#x3003;)</em></p>
</blockquote>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015772540?w=813&amp;h=508" del-src="https://static.alili.tech/img/remote/1460000015772540?w=813&amp;h=508" alt="pagination" title="pagination" style="cursor: pointer;"></span></p>
<h1 id="articleHeader0">JavaScript&#x6A21;&#x5757;&#x5316;</h1>
<p>&#x8981;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;JavaScript&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x9996;&#x5148;&#x8981;&#x4ECE;JavaScript&#x7684;&#x6A21;&#x5757;&#x5316;&#x8BB2;&#x8D77;&#x3002;<br>&#x4EC0;&#x4E48;&#x662F;&#x6A21;&#x5757;&#x5316;&#xFF1F;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x5C31;&#x662F;&#x8BA9;JavaScript&#x80FD;&#x591F;&#x4EE5;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x7EC4;&#x7EC7;&#x548C;&#x7EF4;&#x62A4;&#x4EE3;&#x7801;&#xFF0C;&#x5F53;&#x591A;&#x4EBA;&#x5F00;&#x53D1;&#x65F6;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x5F15;&#x7528;&#x5BF9;&#x65B9;&#x7684;&#x4EE3;&#x7801;&#x5757;&#x53C8;&#x4E0D;&#x9020;&#x6210;&#x51B2;&#x7A81;&#x3002;<br><code>ECMAScript6</code>&#x6807;&#x51C6;&#x4E4B;&#x524D;&#x5E38;&#x89C1;&#x7684;&#x6A21;&#x5757;&#x5316;&#x89C4;&#x8303;&#x6709;&#xFF1A;<code>CommonJS</code>&#x3001;<code>AMD</code>&#x3001;<code>UMD</code>&#x7B49;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x6682;&#x65F6;&#x662F;&#x91C7;&#x7528;ES5&#x8BED;&#x6CD5;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9009;&#x7528;UMD&#x7684;&#x89C4;&#x8303;&#x6765;&#x7EC4;&#x7EC7;&#x4EE3;&#x7801;&#x3002;<br>&#x5173;&#x4E8E;&#x6A21;&#x5757;&#x5316;&#x7684;&#x53D1;&#x5C55;&#x8FC7;&#x7A0B;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF1A;</p>
<ul>
<li><a href="https://yuguo.us/weblog/javascript-module-development-history" rel="nofollow noreferrer" target="_blank">JavaScript&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7A0B;&#x7B80;&#x53F2;&#xFF08;2009-2016&#xFF09;</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/26231889" rel="nofollow noreferrer" target="_blank">JavaScript&#x6A21;&#x5757;&#x6F14;&#x5316;&#x7B80;&#x53F2;</a></li>
</ul>
<p>&#x5728;&#x8FD9;&#x79CD;&#x6A21;&#x5757;&#x89C4;&#x8303;&#x7684;&#x6807;&#x51C6;&#x4E4B;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4E00;&#x79CD;&#x673A;&#x5236;&#x6765;&#x52A0;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x4F8B;&#x5982;&#x5B9E;&#x73B0;&#x4E86;AMD&#x89C4;&#x8303;&#x7684;require.js&#xFF0C;&#x5176;&#x7528;&#x6CD5;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x962E;&#x4E00;&#x5CF0;&#x5199;&#x7684;&#x8FD9;&#x7BC7;&#x6559;&#x7A0B;&#xFF1A;</p>
<ul><li><a href="http://www.ruanyifeng.com/blog/2012/11/require_js.html" rel="nofollow noreferrer" target="_blank">Javascript&#x6A21;&#x5757;&#x5316;&#x7F16;&#x7A0B;&#xFF08;&#x4E09;&#xFF09;&#xFF1A;require.js&#x7684;&#x7528;&#x6CD5;</a></li></ul>
<p>&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5F00;&#x53D1;&#x7684;&#x8F6E;&#x5B50;&#x6682;&#x65F6;&#x4E0D;&#x6D89;&#x53CA;&#x5230;&#x591A;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#xFF0C;&#x6240;&#x4EE5;&#x6A21;&#x5757;&#x7684;&#x52A0;&#x8F7D;&#x6682;&#x65F6;&#x4E0D;&#x4E88;&#x8FC7;&#x591A;&#x8BA8;&#x8BBA;&#xFF0C;&#x8BFB;&#x8005;&#x53EF;&#x81EA;&#x5DF1;&#x8FDB;&#x884C;&#x62D3;&#x5C55;&#x5B66;&#x4E60;&#x3002;</p>
<p>&#x56DE;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x4E3B;&#x9898;&#x4E0A;&#xFF0C;&#x5728;&#x6B63;&#x5F0F;&#x5F00;&#x53D1;&#x4E4B;&#x524D;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x8865;&#x5145;&#x4E00;&#x70B9;&#x5176;&#x4ED6;&#x65B9;&#x9762;&#x7684;&#x77E5;&#x8BC6;&#x3002;</p>
<h1 id="articleHeader1">&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;</h1>
<p>&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;ES5&#x4E00;&#x822C;&#x6709;&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#xFF1A;</p>
<ul><li>&#x51FD;&#x6570;&#x58F0;&#x660E;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo () {}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{}</code></pre>
<p>&#x8FD9;&#x6837;&#x58F0;&#x660E;&#x7684;&#x51FD;&#x6570;&#x548C;&#x53D8;&#x91CF;&#x4E00;&#x6837;&#xFF0C;&#x4F1A;&#x88AB;&#x81EA;&#x52A8;&#x63D0;&#x5347;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x653E;&#x5728;&#x8C03;&#x7528;&#x5B83;&#x7684;&#x8BED;&#x53E5;&#x540E;&#x9762;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();
function foo () {}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">foo();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params"></span>) </span>{}</code></pre>
<ul><li>&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = function () {}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{}</code></pre>
<p>&#x53F3;&#x8FB9;&#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x8D4B;&#x503C;&#x7ED9;&#x4E86;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF;&#x540D;&#x6765;&#x8C03;&#x7528;&#x5B83;&#xFF0C;&#x4F46;&#x662F;&#x548C;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x901A;&#x8FC7;&#x8868;&#x8FBE;&#x5F0F;&#x58F0;&#x660E;&#x7684;&#x51FD;&#x6570;&#x4E0D;&#x4F1A;&#x88AB;&#x63D0;&#x5347;&#x3002;</p>
<ul><li>&#x4F7F;&#x7528;Function&#x6784;&#x9020;&#x51FD;&#x6570;</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = new Function ()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> foo = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Function</span> ()</code></pre>
<p>&#x90A3;&#x4E48;&#x6709;&#x6CA1;&#x6709;&#x4E00;&#x79CD;&#x529E;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0D;&#x5199;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x76F4;&#x63A5;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x5E76;&#x81EA;&#x52A8;&#x8C03;&#x7528;&#x5B83;&#x5462;&#xFF1F;<br>&#x7B54;&#x6848;&#x80AF;&#x5B9A;&#x7684;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x3002;&#xFF08;&#x5B9E;&#x9645;&#x4E0A;&#x6211;&#x7684;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://rekodsc.com/detail/5" rel="nofollow noreferrer" target="_blank">&#x6253;&#x7816;&#x5757;&#x2014;&#x2014;js&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x521D;&#x8BC6;</a>&#x4E2D;&#x5C31;&#x66FE;&#x63D0;&#x5230;&#x8FC7;&#xFF09;</p>
<p>&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;<code>Immediately-Invoked Function Expression</code>&#xFF0C;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF0C;&#x5C31;&#x662F;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6709;&#x7684;&#x5730;&#x65B9;&#x4E5F;&#x79F0;&#x4E3A;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x7684;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x3002;<br>&#x5B83;&#x7684;&#x57FA;&#x672C;&#x5F62;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function () {
    console.log(&apos;hello&apos;)
}());

(function () {
    console.log(&apos;hello&apos;)
})();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
}());

(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;hello&apos;</span>)
})();</code></pre>
<blockquote>&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#x662F;&#x7B49;&#x6548;&#x7684;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x524D;&#x8005;&#x8BA9;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x66F4;&#x50CF;&#x662F;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#x3002;</blockquote>
<p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x8FD9;&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#x7684;&#x4F5C;&#x7528;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5728;()&#x5185;&#x5B9A;&#x4E49;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x53C8;&#x4F7F;&#x7528;()&#x6765;&#x6267;&#x884C;&#x8BE5;&#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x5C31;&#x662F;&#x81EA;&#x6267;&#x884C;&#x7684;&#x3002;</p>
<p>IIFE&#x7684;&#x4E00;&#x4E9B;&#x597D;&#x5904;&#x5982;&#x4E0B;&#xFF1A;</p>
<ul>
<li>&#x907F;&#x514D;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x53D8;&#x91CF;</li>
<li>&#x51CF;&#x5C11;&#x547D;&#x540D;&#x51B2;&#x7A81;</li>
<li>&#x60F0;&#x6027;&#x52A0;&#x8F7D;</li>
</ul>
<p>&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x800C;&#x5728;ES6&#x4E4B;&#x524D;JavaScript&#x662F;&#x6CA1;&#x6709;&#x5757;&#x7EA7;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x3002;<br>&#x5229;&#x7528;&#x8FD9;&#x4E00;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x677E;&#x7684;&#x4FDD;&#x8BC1;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x7684;&#x53D8;&#x91CF;&#x4E0D;&#x88AB;&#x8986;&#x76D6;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// libA.js
(function(){
  var num = 1;
})();

// libB.js
(function(){
    var num = 2;
})();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// libA.js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> num = <span class="hljs-number">1</span>;
})();

<span class="hljs-comment">// libB.js</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">2</span>;
})();</code></pre>
<p>&#x4E0A;&#x9762;&#x8FD9;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x6A21;&#x5757;&#x4E2D;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x90FD;&#x662F;&#x72EC;&#x7ACB;&#x7684;&#xFF0C;&#x4E92;&#x4E0D;&#x5F71;&#x54CD;&#x3002;&#xFF08;&#x5982;&#x679C;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x60F3;&#x8981;&#x4E92;&#x76F8;&#x5F15;&#x7528;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x7528;&#x5230;&#x6A21;&#x5757;&#x7684;&#x52A0;&#x8F7D;&#x5668;&#x4E86;&#xFF0C;&#x4F8B;&#x5982;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;<code>require.js</code>&#x7B49;&#x5E93;&#xFF09;&#x3001;</p>
<p>&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x4E00;&#x4E2A;&#x5B9E;&#x73B0;&#x4E86;UMD&#x89C4;&#x8303;&#x7684;IIFE&#x6A21;&#x677F;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#x5B50;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof define === &apos;function&apos; &amp;&amp; define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === &apos;object&apos; &amp;&amp; module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
  }
}(typeof self !== &apos;undefined&apos; ? self : this, function () {
    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return {};
}));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// if the module has no dependencies, the above pattern can be simplified to</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">root, factory</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; define.amd) {
        <span class="hljs-comment">// AMD. Register as an anonymous module.</span>
        define([], factory);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">&apos;object&apos;</span> &amp;&amp; <span class="hljs-built_in">module</span>.exports) {
        <span class="hljs-comment">// Node. Does not work with strict CommonJS, but</span>
        <span class="hljs-comment">// only CommonJS-like environments that support module.exports,</span>
        <span class="hljs-comment">// like Node.</span>
        <span class="hljs-built_in">module</span>.exports = factory();
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// Browser globals (root is window)</span>
        root.returnExports = factory();
  }
}(<span class="hljs-keyword">typeof</span> self !== <span class="hljs-string">&apos;undefined&apos;</span> ? self : <span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// Just return a value to define the module export.</span>
    <span class="hljs-comment">// This example returns an object, but the module</span>
    <span class="hljs-comment">// can return a function as the exported value.</span>
    <span class="hljs-keyword">return</span> {};
}));</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;UMD&#x89C4;&#x8303;&#x540C;&#x65F6;&#x517C;&#x5BB9;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x3001;Node&#x73AF;&#x5883;&#x53CA;AMD&#x89C4;&#x8303;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x4F7F;&#x7528;UMD&#x5305;&#x88C5;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#x4E2D;&#x8FD0;&#x884C;&#x4E86;&#x3002;</p>
<h1 id="articleHeader2">&#x63D2;&#x4EF6;&#x6A21;&#x677F;</h1>
<p>&#x5F00;&#x53D1;&#x63D2;&#x4EF6;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x70B9;&#xFF0C;&#x5C31;&#x662F;&#x63D2;&#x4EF6;&#x7684;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x81F3;&#x5C11;&#x8981;&#x80FD;&#x540C;&#x65F6;&#x5728;&#x51E0;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#x4E2D;&#x8FD0;&#x884C;&#x3002;&#x5176;&#x6B21;&#xFF0C;&#x5B83;&#x8FD8;&#x9700;&#x8981;&#x6EE1;&#x8DB3;&#x4EE5;&#x4E0B;&#x51E0;&#x79CD;&#x529F;&#x80FD;&#x53CA;&#x6761;&#x4EF6;&#xFF1A;</p>
<ol>
<li>&#x63D2;&#x4EF6;&#x81EA;&#x8EAB;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0E;&#x7528;&#x6237;&#x5F53;&#x524D;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x76F8;&#x4E92;&#x72EC;&#x7ACB;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x63D2;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x4E0D;&#x80FD;&#x5F71;&#x54CD;&#x4F7F;&#x7528;&#x8005;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF1B;</li>
<li>&#x63D2;&#x4EF6;&#x9700;&#x5177;&#x5907;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x53C2;&#x6570;&#xFF1B;</li>
<li>&#x63D2;&#x4EF6;&#x9664;&#x4E86;&#x5177;&#x5907;&#x5DF2;&#x5B9E;&#x73B0;&#x7684;&#x57FA;&#x672C;&#x529F;&#x80FD;&#x5916;&#xFF0C;&#x9700;&#x63D0;&#x4F9B;&#x90E8;&#x5206;API&#xFF0C;&#x4F7F;&#x7528;&#x8005;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BE5;API&#x4FEE;&#x6539;&#x63D2;&#x4EF6;&#x529F;&#x80FD;&#x7684;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x7528;&#x6237;&#x81EA;&#x5B9A;&#x4E49;&#x63D2;&#x4EF6;&#x6548;&#x679C;&#xFF1B;</li>
<li>&#x63D2;&#x4EF6;&#x652F;&#x6301;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF1B;</li>
<li>&#x63D2;&#x4EF6;&#x9700;&#x63D0;&#x4F9B;&#x76D1;&#x542C;&#x5165;&#x53E3;&#xFF0C;&#x53CA;&#x9488;&#x5BF9;&#x6307;&#x5B9A;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x76D1;&#x542C;&#xFF0C;&#x4F7F;&#x5F97;&#x8BE5;&#x5143;&#x7D20;&#x4E0E;&#x63D2;&#x4EF6;&#x54CD;&#x5E94;&#x8FBE;&#x5230;&#x63D2;&#x4EF6;&#x6548;&#x679C;&#x3002;</li>
</ol>
<p>&#x7B2C;&#x4E00;&#x70B9;&#x6211;&#x4EEC;&#x5229;&#x7528;UMD&#x5305;&#x88C5;&#x7684;&#x65B9;&#x5F0F;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x6765;&#x770B;&#x770B;&#x7B2C;&#x4E8C;&#x548C;&#x7B2C;&#x4E09;&#x70B9;&#x3002;</p>
<p>&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x5185;&#x90E8;&#x4F1A;&#x6709;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x4E14;&#x4F1A;&#x63D0;&#x4F9B;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x8BA9;&#x7528;&#x6237;&#x5B9E;&#x73B0;&#x90E8;&#x5206;&#x529F;&#x80FD;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x3002;&#x90A3;&#x4E48;&#x600E;&#x4E48;&#x5B9E;&#x73B0;&#x5462;&#xFF0C;&#x8FD9;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5408;&#x5E76;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function extend(o, n, override) {
    for (var p in n) {
        if (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
}

// &#x9ED8;&#x8BA4;&#x53C2;&#x6570;
var options = {
    pageNumber: 1,
    pageShow: 2
};

// &#x7528;&#x6237;&#x8BBE;&#x7F6E;
var userOptions = {
    pageShow: 3,
    pageCount: 10
}

extend(options, userOptions, true);

// &#x5408;&#x5E76;&#x540E;
options = {
    pageNumber: 1,
    pageShow: 3,
    pageCount: 10
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">o, n, override</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> p <span class="hljs-keyword">in</span> n) {
        <span class="hljs-keyword">if</span> (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
}

<span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x53C2;&#x6570;</span>
<span class="hljs-keyword">var</span> options = {
    <span class="hljs-attr">pageNumber</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">pageShow</span>: <span class="hljs-number">2</span>
};

<span class="hljs-comment">// &#x7528;&#x6237;&#x8BBE;&#x7F6E;</span>
<span class="hljs-keyword">var</span> userOptions = {
    <span class="hljs-attr">pageShow</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">pageCount</span>: <span class="hljs-number">10</span>
}

extend(options, userOptions, <span class="hljs-literal">true</span>);

<span class="hljs-comment">// &#x5408;&#x5E76;&#x540E;</span>
options = {
    <span class="hljs-attr">pageNumber</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">pageShow</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">pageCount</span>: <span class="hljs-number">10</span>
}</code></pre>
<p>&#x5982;&#x4E0A;&#xFF0C;&#x91C7;&#x7528;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x7684;<code>extend</code>&#x51FD;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5BF9;&#x8C61;&#x7684;&#x5408;&#x5E76;&#x4E86;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x63D2;&#x4EF6;&#x4E5F;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x8BBE;&#x7F6E;&#x53C2;&#x6570;&#x7684;&#x529F;&#x80FD;&#x3002;</p>
<blockquote>&#x8FD9;&#x91CC;&#x7684;extend&#x51FD;&#x6570;&#x4E3A;&#x6D45;&#x62F7;&#x8D1D;&#xFF0C;&#x56E0;&#x4E3A;&#x63D2;&#x4EF6;&#x7684;&#x7528;&#x6237;&#x53C2;&#x6570;&#x4E00;&#x822C;&#x662F;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x5B9E;&#x73B0;&#x6DF1;&#x62F7;&#x8D1D;&#x53EF;&#x53C2;&#x8003;jQuery&#x4E2D;extend&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x3002;</blockquote>
<p>&#x7B2C;&#x56DB;&#x70B9;&#x6211;&#x4EEC;&#x63D2;&#x4EF6;&#x6682;&#x65F6;&#x4E0D;&#x9700;&#x8981;&#x8FD9;&#x6837;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x6682;&#x65F6;&#x4E0D;&#x652F;&#x6301;&#x5B83;&#x3002;&#x7B2C;&#x4E94;&#x70B9;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x6211;&#x4EEC;&#x4F1A;&#x901A;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x53BB;&#x9010;&#x6B65;&#x5B9E;&#x73B0;&#x5B83;&#x3002;</p>
<p>&#x7EFC;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x51FA;&#x4E00;&#x4E2A;&#x57FA;&#x7840;&#x7684;&#x63D2;&#x4EF6;&#x6A21;&#x677F;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=";// JavaScript&#x5F31;&#x8BED;&#x6CD5;&#x7684;&#x7279;&#x70B9;,&#x5982;&#x679C;&#x524D;&#x9762;&#x521A;&#x597D;&#x6709;&#x4E2A;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x4EE5;&quot;;&quot;&#x7ED3;&#x5C3E;,&#x90A3;&#x4E48;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;
(function(root, factory) {
  if (typeof define === &apos;function&apos; &amp;&amp; define.amd) {
    define([], factory);
  } else if (typeof module === &apos;object&apos; &amp;&amp; module.exports) {
    module.exports = factory();
  } else {
    root.Plugin = factory();
  }
}(typeof self !== &apos;undefined&apos; ? self : this, function() {
  &apos;use strict&apos;;

  // tool
  function extend(o, n, override) {
    for (var p in n) {
      if (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
  }

  // polyfill
  var EventUtil = {
    addEvent: function(element, type, handler) {
      // &#x6DFB;&#x52A0;&#x7ED1;&#x5B9A;
      if (element.addEventListener) {
        // &#x4F7F;&#x7528;DOM2&#x7EA7;&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        // &#x4F7F;&#x7528;IE&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;
        element.attachEvent(&quot;on&quot; + type, handler);
      } else {
        // &#x4F7F;&#x7528;DOM0&#x7EA7;&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;
        element[&quot;on&quot; + type] = handler;
      }
    },
    // &#x79FB;&#x9664;&#x4E8B;&#x4EF6;
    removeEvent: function(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.datachEvent) {
        element.detachEvent(&quot;on&quot; + type, handler);
      } else {
        element[&quot;on&quot; + type] = null;
      }
    },
    getEvent: function(event) {
      // &#x8FD4;&#x56DE;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x5F15;&#x7528;
      return event ? event : window.event;
    },
    // &#x83B7;&#x53D6;mouseover&#x548C;mouseout&#x76F8;&#x5173;&#x5143;&#x7D20;
    getRelatedTarget: function(event) {
      if (event.relatedTarget) {
        return event.relatedTarget;
      } else if (event.toElement) {
        // &#x517C;&#x5BB9;IE8-
        return event.toElement;
      } else if (event.formElement) {
        return event.formElement;
      } else {
        return null;
      }
    },
    getTarget: function(event) {
      //&#x8FD4;&#x56DE;&#x4E8B;&#x4EF6;&#x6E90;&#x76EE;&#x6807;
      return event.target || event.srcElement;
    },
    preventDefault: function(event) {
      //&#x53D6;&#x6D88;&#x9ED8;&#x8BA4;&#x4E8B;&#x4EF6;
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    stopPropagation: function(event) {
      if (event.stopPropagation) {
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    },
    // &#x83B7;&#x53D6;mousedown&#x6216;mouseup&#x6309;&#x4E0B;&#x6216;&#x91CA;&#x653E;&#x7684;&#x6309;&#x94AE;&#x662F;&#x9F20;&#x6807;&#x4E2D;&#x7684;&#x54EA;&#x4E00;&#x4E2A;
    getButton: function(event) {
      if (document.implementation.hasFeature(&quot;MouseEvents&quot;, &quot;2.0&quot;)) {
        return event.button;
      } else {
        //&#x5C06;IE&#x6A21;&#x578B;&#x4E0B;&#x7684;button&#x5C5E;&#x6027;&#x6620;&#x5C04;&#x4E3A;DOM&#x6A21;&#x578B;&#x4E0B;&#x7684;button&#x5C5E;&#x6027;
        switch (event.button) {
          case 0:
          case 1:
          case 3:
          case 5:
          case 7:
            //&#x6309;&#x4E0B;&#x7684;&#x662F;&#x9F20;&#x6807;&#x4E3B;&#x6309;&#x94AE;&#xFF08;&#x4E00;&#x822C;&#x662F;&#x5DE6;&#x952E;&#xFF09;
            return 0;
          case 2:
          case 6:
            //&#x6309;&#x4E0B;&#x7684;&#x662F;&#x4E2D;&#x95F4;&#x7684;&#x9F20;&#x6807;&#x6309;&#x94AE;
            return 2;
          case 4:
            //&#x9F20;&#x6807;&#x6B21;&#x6309;&#x94AE;&#xFF08;&#x4E00;&#x822C;&#x662F;&#x53F3;&#x952E;&#xFF09;
            return 1;
        }
      }
    },
    //&#x83B7;&#x53D6;&#x8868;&#x793A;&#x9F20;&#x6807;&#x6EDA;&#x8F6E;&#x6EDA;&#x52A8;&#x65B9;&#x5411;&#x7684;&#x6570;&#x503C;
    getWheelDelta: function(event) {
      if (event.wheelDelta) {
        return event.wheelDelta;
      } else {
        return -event.detail * 40;
      }
    },
    // &#x4EE5;&#x8DE8;&#x6D4F;&#x89C8;&#x5668;&#x53D6;&#x5F97;&#x76F8;&#x540C;&#x7684;&#x5B57;&#x7B26;&#x7F16;&#x7801;&#xFF0C;&#x9700;&#x5728;keypress&#x4E8B;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;
    getCharCode: function(event) {
      if (typeof event.charCode == &quot;number&quot;) {
        return event.charCode;
      } else {
        return event.keyCode;
      }
    }
  };

  // plugin construct function
  function Plugin(selector, userOptions) {
    // Plugin() or new Plugin()
    if (!(this instanceof Plugin)) return new Plugin(selector, userOptions);
    this.init(selector, userOptions)
  }
  Plugin.prototype = {
    constructor: Plugin,
    // default option
    options: {},
    init: function(selector, userOptions) {
      extend(this.options, userOptions, true);
    }
  };

  return Plugin;
}));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">;<span class="hljs-comment">// JavaScript&#x5F31;&#x8BED;&#x6CD5;&#x7684;&#x7279;&#x70B9;,&#x5982;&#x679C;&#x524D;&#x9762;&#x521A;&#x597D;&#x6709;&#x4E2A;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x4EE5;&quot;;&quot;&#x7ED3;&#x5C3E;,&#x90A3;&#x4E48;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x8BED;&#x6CD5;&#x9519;&#x8BEF;</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root, factory</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; define.amd) {
    define([], factory);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">&apos;object&apos;</span> &amp;&amp; <span class="hljs-built_in">module</span>.exports) {
    <span class="hljs-built_in">module</span>.exports = factory();
  } <span class="hljs-keyword">else</span> {
    root.Plugin = factory();
  }
}(<span class="hljs-keyword">typeof</span> self !== <span class="hljs-string">&apos;undefined&apos;</span> ? self : <span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">  &apos;use strict&apos;</span>;

  <span class="hljs-comment">// tool</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">o, n, override</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> p <span class="hljs-keyword">in</span> n) {
      <span class="hljs-keyword">if</span> (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
  }

  <span class="hljs-comment">// polyfill</span>
  <span class="hljs-keyword">var</span> EventUtil = {
    <span class="hljs-attr">addEvent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, type, handler</span>) </span>{
      <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x7ED1;&#x5B9A;</span>
      <span class="hljs-keyword">if</span> (element.addEventListener) {
        <span class="hljs-comment">// &#x4F7F;&#x7528;DOM2&#x7EA7;&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;</span>
        element.addEventListener(type, handler, <span class="hljs-literal">false</span>);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.attachEvent) {
        <span class="hljs-comment">// &#x4F7F;&#x7528;IE&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;</span>
        element.attachEvent(<span class="hljs-string">&quot;on&quot;</span> + type, handler);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// &#x4F7F;&#x7528;DOM0&#x7EA7;&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;</span>
        element[<span class="hljs-string">&quot;on&quot;</span> + type] = handler;
      }
    },
    <span class="hljs-comment">// &#x79FB;&#x9664;&#x4E8B;&#x4EF6;</span>
    removeEvent: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, type, handler</span>) </span>{
      <span class="hljs-keyword">if</span> (element.removeEventListener) {
        element.removeEventListener(type, handler, <span class="hljs-literal">false</span>);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (element.datachEvent) {
        element.detachEvent(<span class="hljs-string">&quot;on&quot;</span> + type, handler);
      } <span class="hljs-keyword">else</span> {
        element[<span class="hljs-string">&quot;on&quot;</span> + type] = <span class="hljs-literal">null</span>;
      }
    },
    <span class="hljs-attr">getEvent</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x5F15;&#x7528;</span>
      <span class="hljs-keyword">return</span> event ? event : <span class="hljs-built_in">window</span>.event;
    },
    <span class="hljs-comment">// &#x83B7;&#x53D6;mouseover&#x548C;mouseout&#x76F8;&#x5173;&#x5143;&#x7D20;</span>
    getRelatedTarget: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">if</span> (event.relatedTarget) {
        <span class="hljs-keyword">return</span> event.relatedTarget;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (event.toElement) {
        <span class="hljs-comment">// &#x517C;&#x5BB9;IE8-</span>
        <span class="hljs-keyword">return</span> event.toElement;
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (event.formElement) {
        <span class="hljs-keyword">return</span> event.formElement;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }
    },
    <span class="hljs-attr">getTarget</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-comment">//&#x8FD4;&#x56DE;&#x4E8B;&#x4EF6;&#x6E90;&#x76EE;&#x6807;</span>
      <span class="hljs-keyword">return</span> event.target || event.srcElement;
    },
    <span class="hljs-attr">preventDefault</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-comment">//&#x53D6;&#x6D88;&#x9ED8;&#x8BA4;&#x4E8B;&#x4EF6;</span>
      <span class="hljs-keyword">if</span> (event.preventDefault) {
        event.preventDefault();
      } <span class="hljs-keyword">else</span> {
        event.returnValue = <span class="hljs-literal">false</span>;
      }
    },
    <span class="hljs-attr">stopPropagation</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">if</span> (event.stopPropagation) {
        event.stopPropagation();
      } <span class="hljs-keyword">else</span> {
        event.cancelBubble = <span class="hljs-literal">true</span>;
      }
    },
    <span class="hljs-comment">// &#x83B7;&#x53D6;mousedown&#x6216;mouseup&#x6309;&#x4E0B;&#x6216;&#x91CA;&#x653E;&#x7684;&#x6309;&#x94AE;&#x662F;&#x9F20;&#x6807;&#x4E2D;&#x7684;&#x54EA;&#x4E00;&#x4E2A;</span>
    getButton: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.implementation.hasFeature(<span class="hljs-string">&quot;MouseEvents&quot;</span>, <span class="hljs-string">&quot;2.0&quot;</span>)) {
        <span class="hljs-keyword">return</span> event.button;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//&#x5C06;IE&#x6A21;&#x578B;&#x4E0B;&#x7684;button&#x5C5E;&#x6027;&#x6620;&#x5C04;&#x4E3A;DOM&#x6A21;&#x578B;&#x4E0B;&#x7684;button&#x5C5E;&#x6027;</span>
        <span class="hljs-keyword">switch</span> (event.button) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-number">5</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-number">7</span>:
            <span class="hljs-comment">//&#x6309;&#x4E0B;&#x7684;&#x662F;&#x9F20;&#x6807;&#x4E3B;&#x6309;&#x94AE;&#xFF08;&#x4E00;&#x822C;&#x662F;&#x5DE6;&#x952E;&#xFF09;</span>
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
          <span class="hljs-keyword">case</span> <span class="hljs-number">6</span>:
            <span class="hljs-comment">//&#x6309;&#x4E0B;&#x7684;&#x662F;&#x4E2D;&#x95F4;&#x7684;&#x9F20;&#x6807;&#x6309;&#x94AE;</span>
            <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-number">4</span>:
            <span class="hljs-comment">//&#x9F20;&#x6807;&#x6B21;&#x6309;&#x94AE;&#xFF08;&#x4E00;&#x822C;&#x662F;&#x53F3;&#x952E;&#xFF09;</span>
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
        }
      }
    },
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x8868;&#x793A;&#x9F20;&#x6807;&#x6EDA;&#x8F6E;&#x6EDA;&#x52A8;&#x65B9;&#x5411;&#x7684;&#x6570;&#x503C;</span>
    getWheelDelta: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">if</span> (event.wheelDelta) {
        <span class="hljs-keyword">return</span> event.wheelDelta;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> -event.detail * <span class="hljs-number">40</span>;
      }
    },
    <span class="hljs-comment">// &#x4EE5;&#x8DE8;&#x6D4F;&#x89C8;&#x5668;&#x53D6;&#x5F97;&#x76F8;&#x540C;&#x7684;&#x5B57;&#x7B26;&#x7F16;&#x7801;&#xFF0C;&#x9700;&#x5728;keypress&#x4E8B;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</span>
    getCharCode: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> event.charCode == <span class="hljs-string">&quot;number&quot;</span>) {
        <span class="hljs-keyword">return</span> event.charCode;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> event.keyCode;
      }
    }
  };

  <span class="hljs-comment">// plugin construct function</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Plugin</span>(<span class="hljs-params">selector, userOptions</span>) </span>{
    <span class="hljs-comment">// Plugin() or new Plugin()</span>
    <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Plugin)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Plugin(selector, userOptions);
    <span class="hljs-keyword">this</span>.init(selector, userOptions)
  }
  Plugin.prototype = {
    <span class="hljs-attr">constructor</span>: Plugin,
    <span class="hljs-comment">// default option</span>
    options: {},
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, userOptions</span>) </span>{
      extend(<span class="hljs-keyword">this</span>.options, userOptions, <span class="hljs-literal">true</span>);
    }
  };

  <span class="hljs-keyword">return</span> Plugin;
}));</code></pre>
<p>&#x8FD9;&#x91CC;&#x8FD8;&#x4F7F;&#x7528;&#x5230;&#x4E86;&#x4E00;&#x4E2A;<code>EventUtil</code>&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x4E3B;&#x8981;&#x662F;&#x9488;&#x5BF9;&#x4E8B;&#x4EF6;&#x6CE8;&#x518C;&#x7684;&#x4E00;&#x4E9B;&#x517C;&#x5BB9;&#x6027;&#x505A;&#x4E86;&#x4E00;&#x4E9B;polyfill&#x5C01;&#x88C5;&#xFF0C;&#x5177;&#x4F53;&#x539F;&#x7406;&#x53EF;&#x4EE5;&#x53C2;&#x9605;&#xFF1A;</p>
<ul>
<li><a href="https://www.cnblogs.com/hykun/p/EventUtil.html" rel="nofollow noreferrer" target="_blank">EventUtil&#x2014;&#x2014;&#x8DE8;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;</a></li>
<li><a href="https://www.cnblogs.com/vali/p/5881329.html" rel="nofollow noreferrer" target="_blank">&#x8DE8;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;-------EventUtil &#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x53CA;&#x7528;&#x6CD5;</a></li>
</ul>
<p>&#x5230;&#x6B64;&#xFF0C;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x57FA;&#x672C;&#x6A21;&#x677F;&#x5C31;&#x5927;&#x81F4;&#x6210;&#x578B;&#x4E86;&#x3002;&#x4E0B;&#x4E00;&#x8282;&#xFF0C;&#x6211;&#x4EEC;&#x7EC8;&#x4E8E;&#x53EF;&#x4EE5;&#x6B63;&#x5F0F;&#x5F00;&#x59CB;&#x5206;&#x9875;&#x63D2;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#x4E86;&#xFF01;</p>
<h1 id="articleHeader3">&#x601D;&#x8DEF;&#x5206;&#x6790;</h1>
<blockquote>&#x6709;&#x4EBA;&#x8BF4;&#x8BA1;&#x7B97;&#x673A;&#x7684;&#x672C;&#x8D28;&#x5C31;&#x662F;&#x5BF9;&#x73B0;&#x5B9E;&#x4E16;&#x754C;&#x7684;&#x62BD;&#x8C61;&#xFF0C;&#x800C;&#x7F16;&#x7A0B;&#x5219;&#x662F;&#x5BF9;&#x8FD9;&#x4E2A;&#x62BD;&#x8C61;&#x4E16;&#x754C;&#x89C4;&#x5219;&#x7684;&#x5236;&#x5B9A;&#x3002;</blockquote>
<p>&#x6B63;&#x5982;&#x4E0A;&#x9762;&#x8FD9;&#x53E5;&#x8BDD;&#x6240;&#x8BF4;&#xFF0C;&#x5728;&#x5B9E;&#x9645;&#x7F16;&#x7801;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x9700;&#x8981;&#x5BF9;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x9700;&#x6C42;&#x6548;&#x679C;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x601D;&#x8DEF;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x6700;&#x540E;&#x518D;&#x8FDB;&#x4E00;&#x6B65;&#x628A;&#x8FD9;&#x4E2A;&#x601D;&#x8DEF;&#x8FC7;&#x7A0B;&#x62BD;&#x8C61;&#x4E3A;&#x6709;&#x903B;&#x8F91;&#x7684;&#x4EE3;&#x7801;&#x3002;<br>&#x6211;&#x4EEC;&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x5206;&#x9875;&#x6548;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#xFF0C;&#x6211;&#x628A;&#x5B83;&#x5206;&#x6210;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x663E;&#x793A;&#x548C;&#x4E0D;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#x7684;&#xFF0C;&#x9996;&#x5148;&#x6765;&#x770B;&#x7B2C;&#x4E00;&#x79CD;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x603B;&#x5171;30&#x9875;
// &#x7B2C;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x4E0D;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF0C;&#x5F53;&#x524D;&#x9875;&#x7801;&#x524D;&#x540E;&#x6700;&#x591A;&#x663E;&#x793A;2&#x4E2A;&#x9875;&#x7801;
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 1&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 2 3 4 5
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 2&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 2 3 4 5
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 3&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 2 3 4 5
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 4&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 2 3 4 5 6
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 15&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 13 14 15 16 17
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 27&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 25 26 27 28 29
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 28&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 26 27 28 29 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 29&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 26 27 28 29 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 30&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 26 27 28 29 30" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x603B;&#x5171;30&#x9875;</span>
<span class="hljs-comment">// &#x7B2C;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x4E0D;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF0C;&#x5F53;&#x524D;&#x9875;&#x7801;&#x524D;&#x540E;&#x6700;&#x591A;&#x663E;&#x793A;2&#x4E2A;&#x9875;&#x7801;</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">1</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">2</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">3</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">4</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span>
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">15</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span>
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">27</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">28</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">29</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">30</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span></code></pre>
<p>&#x867D;&#x7136;&#x4E0A;&#x9762;&#x6BCF;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E2D;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x6216;&#x8D85;&#x94FE;&#x63A5;&#xFF0C;&#x4F46;&#x73B0;&#x5728;&#x65E2;&#x7136;&#x662F;&#x5206;&#x6790;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x5C31;&#x628A;&#x5B83;&#x7B80;&#x5316;&#x5E76;&#x5FFD;&#x7565;&#xFF0C;&#x4E8E;&#x662F;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5C31;&#x53D8;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x8F93;&#x51FA;&#x9898;&#x3002;<br>&#x6211;&#x4EEC;&#x5148;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showPages (page, total, show) {

}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showPages</span> (<span class="hljs-params">page, total, show</span>) </span>{

}</code></pre>
<p>&#x51FD;&#x6570;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x5206;&#x522B;&#x4E3A;&#xFF1A;&#x5F53;&#x524D;&#x9875;&#x7801;&#x3001;&#x603B;&#x9875;&#x7801;&#x6570;&#x3001;&#x5F53;&#x524D;&#x9875;&#x7801;&#x9762;&#x524D;&#x540E;&#x6700;&#x591A;&#x663E;&#x793A;&#x9875;&#x7801;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5FAA;&#x73AF;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x6253;&#x5370;&#x5206;&#x9875;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var total = 30;
for (var i = 1; i &lt;= total; i++) {
    console.log(showPages(i, total));
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> total = <span class="hljs-number">30</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= total; i++) {
    <span class="hljs-built_in">console</span>.log(showPages(i, total));
}</code></pre>
<p>&#x8FD9;&#x6837;&#x4ECE;&#x9875;&#x7801;&#x4E3A;1&#x5230;&#x6700;&#x540E;&#x4E00;&#x9875;&#x7684;&#x7ED3;&#x679C;&#x5C31;&#x5168;&#x8F93;&#x51FA;&#x4E86;&#xFF0C;&#x6700;&#x540E;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B8C;&#x6210;<code>showPages()</code>&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showPages (page, total, show) {
    var str = &apos;&apos;;
    if (page &lt; show + 1) {
        for (var i = 1; i &lt;= show * 2 + 1; i++) {
            str = str + &apos; &apos; + i;
        }
    } else if (page &gt; total - show) {
        for (var i = total - show * 2; i &lt;= total; i++) {
            str = str + &apos; &apos; + i;
        }
    } else {
        for (var i = page - show; i &lt;= page + show; i++) {
            str = str + &apos; &apos; + i;
        }
    }
    return str.trim();
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showPages</span> (<span class="hljs-params">page, total, show</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">if</span> (page &lt; show + <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= show * <span class="hljs-number">2</span> + <span class="hljs-number">1</span>; i++) {
            str = str + <span class="hljs-string">&apos; &apos;</span> + i;
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (page &gt; total - show) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = total - show * <span class="hljs-number">2</span>; i &lt;= total; i++) {
            str = str + <span class="hljs-string">&apos; &apos;</span> + i;
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = page - show; i &lt;= page + show; i++) {
            str = str + <span class="hljs-string">&apos; &apos;</span> + i;
        }
    }
    <span class="hljs-keyword">return</span> str.trim();
}</code></pre>
<p>&#x601D;&#x8DEF;&#x662F;&#x5206;&#x6BB5;&#x62FC;&#x51FA;&#x9875;&#x7801;&#xFF0C;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015768443?w=816&amp;h=524" del-src="https://static.alili.tech/img/remote/1460000015772540?w=813&amp;h=508" alt="1" title="1" style="cursor: pointer;"></span></p>
<p>&#x4E0D;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#x7684;&#x9875;&#x7801;&#x6B63;&#x5E38;&#x8F93;&#x51FA;&#x4E86;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#x7684;&#x60C5;&#x51B5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7B2C;&#x4E8C;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF0C;&#x5F53;&#x524D;&#x9875;&#x7801;&#x524D;&#x540E;&#x6700;&#x591A;&#x663E;&#x793A;2&#x4E2A;&#x9875;&#x7801;
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 1&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 2 3 ... 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 2&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 2 3 4 ... 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 3&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 2 3 4 5 ... 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 4&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 2 3 4 5 6 ... 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 5&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 ... 3 4 5 6 7 ... 30
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 15&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 ... 13 14 15 16 17 ... 30
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 26&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 ... 24 25 26 27 28 ... 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 27&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 ... 25 26 27 28 29 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 28&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 ... 26 27 28 29 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 29&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 ... 27 28 29 30
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; 30&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; 1 ... 28 29 30" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF0C;&#x5F53;&#x524D;&#x9875;&#x7801;&#x524D;&#x540E;&#x6700;&#x591A;&#x663E;&#x793A;2&#x4E2A;&#x9875;&#x7801;</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">1</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> ... <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">2</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> ... <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">3</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> ... <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">4</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> ... <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">5</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> ... <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> <span class="hljs-number">7</span> ... <span class="hljs-number">30</span>
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">15</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> ... <span class="hljs-number">13</span> <span class="hljs-number">14</span> <span class="hljs-number">15</span> <span class="hljs-number">16</span> <span class="hljs-number">17</span> ... <span class="hljs-number">30</span>
...
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">26</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> ... <span class="hljs-number">24</span> <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> ... <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">27</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> ... <span class="hljs-number">25</span> <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">28</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> ... <span class="hljs-number">26</span> <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">29</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> ... <span class="hljs-number">27</span> <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span>
&#x5F53;&#x524D;&#x9875;&#x7801;&#x4E3A; <span class="hljs-number">30</span>&#xFF0C;&#x90A3;&#x4E48;&#x663E;&#x793A; <span class="hljs-number">1</span> ... <span class="hljs-number">28</span> <span class="hljs-number">29</span> <span class="hljs-number">30</span></code></pre>
<p>&#x540C;&#x6837;&#x9700;&#x8981;&#x5B8C;&#x6210;<code>showPages()</code>&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showPages(page, length, show) {
    var str = &apos;&apos;;
    var preIndex = page - (show + 1);
    var aftIndex = page + (show + 1);
    if (page &lt; show + 3) {
        for (var i = 1; i &lt;= show * 2 + 3; i++) {
            if ((i !== preIndex &amp;&amp; i !== aftIndex) || (i === 1 || i === total)) {
                str = str + &apos; &apos; + i;
            } else {
                str = str + &apos; ... &apos; + total;
                break;
            }
        }
    } else if (page &gt; total - (show + 2)) {
        for (var i = total; i &gt;= total - (show * 2 + 2); i--) {
            if ((i !== preIndex &amp;&amp; i !== aftIndex) || (i === 1 || i === total)) {
                str = i + &apos; &apos; + str;
            } else {
                str = &apos;1 ... &apos; + str;
                break;
            }
        }
    } else {
        for (var i = preIndex + 1; i &lt;= aftIndex - 1; i++) {
            str = str + &apos; &apos; + i;
        }
        str = &apos;1 ... &apos; + str + &apos; ... &apos; + total;
    }
    return str.trim();
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showPages</span>(<span class="hljs-params">page, length, show</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">var</span> preIndex = page - (show + <span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> aftIndex = page + (show + <span class="hljs-number">1</span>);
    <span class="hljs-keyword">if</span> (page &lt; show + <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= show * <span class="hljs-number">2</span> + <span class="hljs-number">3</span>; i++) {
            <span class="hljs-keyword">if</span> ((i !== preIndex &amp;&amp; i !== aftIndex) || (i === <span class="hljs-number">1</span> || i === total)) {
                str = str + <span class="hljs-string">&apos; &apos;</span> + i;
            } <span class="hljs-keyword">else</span> {
                str = str + <span class="hljs-string">&apos; ... &apos;</span> + total;
                <span class="hljs-keyword">break</span>;
            }
        }
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (page &gt; total - (show + <span class="hljs-number">2</span>)) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = total; i &gt;= total - (show * <span class="hljs-number">2</span> + <span class="hljs-number">2</span>); i--) {
            <span class="hljs-keyword">if</span> ((i !== preIndex &amp;&amp; i !== aftIndex) || (i === <span class="hljs-number">1</span> || i === total)) {
                str = i + <span class="hljs-string">&apos; &apos;</span> + str;
            } <span class="hljs-keyword">else</span> {
                str = <span class="hljs-string">&apos;1 ... &apos;</span> + str;
                <span class="hljs-keyword">break</span>;
            }
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = preIndex + <span class="hljs-number">1</span>; i &lt;= aftIndex - <span class="hljs-number">1</span>; i++) {
            str = str + <span class="hljs-string">&apos; &apos;</span> + i;
        }
        str = <span class="hljs-string">&apos;1 ... &apos;</span> + str + <span class="hljs-string">&apos; ... &apos;</span> + total;
    }
    <span class="hljs-keyword">return</span> str.trim();
}</code></pre>
<p>&#x540C;&#x6837;&#x4E5F;&#x662F;&#x91C7;&#x7528;&#x5206;&#x6BB5;&#x62FC;&#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x80FD;&#x6210;&#x529F;&#x6253;&#x5370;&#x51FA;&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000015768444?w=808&amp;h=593" del-src="https://static.alili.tech/img/remote/1460000015772540?w=813&amp;h=508" alt="2" title="2" style="cursor: pointer;"></span></p>
<p>&#x4F46;&#x662F;&#x4ED4;&#x7EC6;&#x770B;&#x770B;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x53D1;&#x73B0;&#x6709;&#x5927;&#x91CF;&#x91CD;&#x590D;&#x5197;&#x4F59;&#x7684;&#x903B;&#x8F91;&#x4E86;&#xFF0C;&#x80FD;&#x4E0D;&#x80FD;&#x4F18;&#x5316;&#x5462;&#xFF1F;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x79CD;&#x66F4;&#x4E3A;&#x53D6;&#x5DE7;&#x7684;&#x601D;&#x8DEF;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function showPages (page, total, show) {
    var str = page + &apos;&apos;;
    for (var i = 1; i &lt;= show; i++) {
        if (page - i &gt; 1) {
            str = page - i + &apos; &apos; + str;
        }
        if (page + i &lt; total) {
            str = str + &apos; &apos; + (page + i);
        }
    }
    if (page - (show + 1) &gt; 1) {
        str = &apos;... &apos; + str;
    }
    if (page &gt; 1) {
        str = 1 + &apos; &apos; + str;
    }
    if (page + show + 1 &lt; total) {
        str = str + &apos; ...&apos;;
    }
    if (page &lt; total) {
        str = str + &apos; &apos; + total;
    }
    return str;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showPages</span> (<span class="hljs-params">page, total, show</span>) </span>{
    <span class="hljs-keyword">var</span> str = page + <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= show; i++) {
        <span class="hljs-keyword">if</span> (page - i &gt; <span class="hljs-number">1</span>) {
            str = page - i + <span class="hljs-string">&apos; &apos;</span> + str;
        }
        <span class="hljs-keyword">if</span> (page + i &lt; total) {
            str = str + <span class="hljs-string">&apos; &apos;</span> + (page + i);
        }
    }
    <span class="hljs-keyword">if</span> (page - (show + <span class="hljs-number">1</span>) &gt; <span class="hljs-number">1</span>) {
        str = <span class="hljs-string">&apos;... &apos;</span> + str;
    }
    <span class="hljs-keyword">if</span> (page &gt; <span class="hljs-number">1</span>) {
        str = <span class="hljs-number">1</span> + <span class="hljs-string">&apos; &apos;</span> + str;
    }
    <span class="hljs-keyword">if</span> (page + show + <span class="hljs-number">1</span> &lt; total) {
        str = str + <span class="hljs-string">&apos; ...&apos;</span>;
    }
    <span class="hljs-keyword">if</span> (page &lt; total) {
        str = str + <span class="hljs-string">&apos; &apos;</span> + total;
    }
    <span class="hljs-keyword">return</span> str;
}</code></pre>
<p>&#x6253;&#x5370;&#x7ED3;&#x679C;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4F46;&#x4EE3;&#x7801;&#x5374;&#x5927;&#x4E3A;&#x7CBE;&#x7B80;&#x4E86;&#x3002;</p>
<h1 id="articleHeader4">&#x57FA;&#x672C;&#x67B6;&#x6784;</h1>
<p>&#x4E00;&#x4E2A;&#x597D;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x4EE3;&#x7801;&#x4E00;&#x5B9A;&#x662F;&#x9AD8;&#x590D;&#x7528;&#x3001;&#x4F4E;&#x8026;&#x5408;&#x3001;&#x6613;&#x62D3;&#x5C55;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x91C7;&#x7528;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x642D;&#x5EFA;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x57FA;&#x672C;&#x67B6;&#x6784;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6A21;&#x4EFF;jQuery $()
function $(selector, context) {
    context = arguments.length &gt; 1 ? context : document;
    return context ? context.querySelectorAll(selector) : null;
}

var Pagination = function(selector, pageOption) {
    // &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
    this.options = {
        curr: 1,
        pageShow: 2,
        ellipsis: true,
        hash: false
    };
    // &#x5408;&#x5E76;&#x914D;&#x7F6E;
    extend(this.options, pageOption, true);
    // &#x5206;&#x9875;&#x5668;&#x5143;&#x7D20;
    this.pageElement = $(selector)[0];
    // &#x6570;&#x636E;&#x603B;&#x6570;
    this.dataCount = this.options.count;
    // &#x5F53;&#x524D;&#x9875;&#x7801;
    this.pageNumber = this.options.curr;
    // &#x603B;&#x9875;&#x6570;
    this.pageCount = Math.ceil(this.options.count / this.options.limit);
    // &#x6E32;&#x67D3;
    this.renderPages();
    // &#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;
    this.options.callback &amp;&amp; this.options.callback({
        curr: this.pageNumber,
        limit: this.options.limit,
        isFirst: true
    });
    // &#x6539;&#x53D8;&#x9875;&#x6570;&#x5E76;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;
    this.changePage();
};

Pagination.prototype = {
    constructor: Pagination,
    changePage: function() {}
};

return Pagination;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x6A21;&#x4EFF;jQuery $()</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">$</span>(<span class="hljs-params">selector, context</span>) </span>{
    context = <span class="hljs-built_in">arguments</span>.length &gt; <span class="hljs-number">1</span> ? context : <span class="hljs-built_in">document</span>;
    <span class="hljs-keyword">return</span> context ? context.querySelectorAll(selector) : <span class="hljs-literal">null</span>;
}

<span class="hljs-keyword">var</span> Pagination = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, pageOption</span>) </span>{
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.options = {
        <span class="hljs-attr">curr</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">pageShow</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">ellipsis</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">hash</span>: <span class="hljs-literal">false</span>
    };
    <span class="hljs-comment">// &#x5408;&#x5E76;&#x914D;&#x7F6E;</span>
    extend(<span class="hljs-keyword">this</span>.options, pageOption, <span class="hljs-literal">true</span>);
    <span class="hljs-comment">// &#x5206;&#x9875;&#x5668;&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.pageElement = $(selector)[<span class="hljs-number">0</span>];
    <span class="hljs-comment">// &#x6570;&#x636E;&#x603B;&#x6570;</span>
    <span class="hljs-keyword">this</span>.dataCount = <span class="hljs-keyword">this</span>.options.count;
    <span class="hljs-comment">// &#x5F53;&#x524D;&#x9875;&#x7801;</span>
    <span class="hljs-keyword">this</span>.pageNumber = <span class="hljs-keyword">this</span>.options.curr;
    <span class="hljs-comment">// &#x603B;&#x9875;&#x6570;</span>
    <span class="hljs-keyword">this</span>.pageCount = <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.options.count / <span class="hljs-keyword">this</span>.options.limit);
    <span class="hljs-comment">// &#x6E32;&#x67D3;</span>
    <span class="hljs-keyword">this</span>.renderPages();
    <span class="hljs-comment">// &#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">this</span>.options.callback &amp;&amp; <span class="hljs-keyword">this</span>.options.callback({
        <span class="hljs-attr">curr</span>: <span class="hljs-keyword">this</span>.pageNumber,
        <span class="hljs-attr">limit</span>: <span class="hljs-keyword">this</span>.options.limit,
        <span class="hljs-attr">isFirst</span>: <span class="hljs-literal">true</span>
    });
    <span class="hljs-comment">// &#x6539;&#x53D8;&#x9875;&#x6570;&#x5E76;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-keyword">this</span>.changePage();
};

Pagination.prototype = {
    <span class="hljs-attr">constructor</span>: Pagination,
    <span class="hljs-attr">changePage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
};

<span class="hljs-keyword">return</span> Pagination;</code></pre>
<p>&#x5982;&#x4E0A;&#xFF0C;&#x4E00;&#x4E2A;&#x91C7;&#x7528;&#x539F;&#x578B;&#x6A21;&#x5F0F;&#x7684;&#x5206;&#x9875;&#x5668;&#x5BF9;&#x8C61;&#x5C31;&#x642D;&#x5EFA;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5BF9;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x4E00;&#x4E00;&#x8BB2;&#x89E3;&#x3002;</p>
<h2 id="articleHeader5">&#x5206;&#x9875;&#x914D;&#x7F6E;</h2>
<p>&#x672C;&#x5206;&#x9875;&#x5668;&#x63D0;&#x4F9B;&#x5982;&#x4E0B;&#x57FA;&#x672C;&#x53C2;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5206;&#x9875;&#x5143;&#x7D20;ID&#xFF08;&#x5FC5;&#x586B;&#xFF09;
var selector = &apos;#pagelist&apos;;

// &#x5206;&#x9875;&#x914D;&#x7F6E;
var pageOption = {
  // &#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;&#xFF08;&#x5FC5;&#x586B;&#xFF09;
  limit: 5,
  // &#x6570;&#x636E;&#x603B;&#x6570;&#xFF08;&#x4E00;&#x822C;&#x901A;&#x8FC7;&#x540E;&#x7AEF;&#x83B7;&#x53D6;&#xFF0C;&#x5FC5;&#x586B;&#xFF09;
  count: 162,
  // &#x5F53;&#x524D;&#x9875;&#x7801;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;1&#xFF09;
  curr: 1,
  // &#x662F;&#x5426;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#xFF09;
  ellipsis: true,
  // &#x5F53;&#x524D;&#x9875;&#x524D;&#x540E;&#x4E24;&#x8FB9;&#x53EF;&#x663E;&#x793A;&#x7684;&#x9875;&#x7801;&#x4E2A;&#x6570;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;2&#xFF09;
  pageShow: 2,
  // &#x5F00;&#x542F;location.hash&#xFF0C;&#x5E76;&#x81EA;&#x5B9A;&#x4E49;hash&#x503C; &#xFF08;&#x9ED8;&#x8BA4;&#x5173;&#x95ED;&#xFF09;
  // &#x5982;&#x679C;&#x5F00;&#x542F;&#xFF0C;&#x5728;&#x89E6;&#x53D1;&#x5206;&#x9875;&#x65F6;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x5BF9;url&#x8FFD;&#x52A0;&#xFF1A;#!hash&#x503C;={curr} &#x5229;&#x7528;&#x8FD9;&#x4E2A;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x9875;&#x9762;&#x8F7D;&#x5165;&#x65F6;&#x5C31;&#x5B9A;&#x4F4D;&#x5230;&#x6307;&#x5B9A;&#x9875;
  hash: false,
  // &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x540E;&#x9ED8;&#x8BA4;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x7136;&#x540E;&#x5F53;&#x5206;&#x9875;&#x88AB;&#x5207;&#x6362;&#x65F6;&#x518D;&#x6B21;&#x89E6;&#x53D1;
  callback: function(obj) {
    // obj.curr&#xFF1A;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x9875;&#x7801;
    // obj.limit&#xFF1A;&#x83B7;&#x53D6;&#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;
    // obj.isFirst&#xFF1A;&#x662F;&#x5426;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#xFF0C;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x521D;&#x59CB;&#x52A0;&#x8F7D;&#x7684;&#x5224;&#x65AD;

    // &#x9996;&#x6B21;&#x4E0D;&#x6267;&#x884C;
    if (!obj.isFirst) {
      // do something
    }
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5206;&#x9875;&#x5143;&#x7D20;ID&#xFF08;&#x5FC5;&#x586B;&#xFF09;</span>
<span class="hljs-keyword">var</span> selector = <span class="hljs-string">&apos;#pagelist&apos;</span>;

<span class="hljs-comment">// &#x5206;&#x9875;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">var</span> pageOption = {
  <span class="hljs-comment">// &#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;&#xFF08;&#x5FC5;&#x586B;&#xFF09;</span>
  limit: <span class="hljs-number">5</span>,
  <span class="hljs-comment">// &#x6570;&#x636E;&#x603B;&#x6570;&#xFF08;&#x4E00;&#x822C;&#x901A;&#x8FC7;&#x540E;&#x7AEF;&#x83B7;&#x53D6;&#xFF0C;&#x5FC5;&#x586B;&#xFF09;</span>
  count: <span class="hljs-number">162</span>,
  <span class="hljs-comment">// &#x5F53;&#x524D;&#x9875;&#x7801;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;1&#xFF09;</span>
  curr: <span class="hljs-number">1</span>,
  <span class="hljs-comment">// &#x662F;&#x5426;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#xFF09;</span>
  ellipsis: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// &#x5F53;&#x524D;&#x9875;&#x524D;&#x540E;&#x4E24;&#x8FB9;&#x53EF;&#x663E;&#x793A;&#x7684;&#x9875;&#x7801;&#x4E2A;&#x6570;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;2&#xFF09;</span>
  pageShow: <span class="hljs-number">2</span>,
  <span class="hljs-comment">// &#x5F00;&#x542F;location.hash&#xFF0C;&#x5E76;&#x81EA;&#x5B9A;&#x4E49;hash&#x503C; &#xFF08;&#x9ED8;&#x8BA4;&#x5173;&#x95ED;&#xFF09;</span>
  <span class="hljs-comment">// &#x5982;&#x679C;&#x5F00;&#x542F;&#xFF0C;&#x5728;&#x89E6;&#x53D1;&#x5206;&#x9875;&#x65F6;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x5BF9;url&#x8FFD;&#x52A0;&#xFF1A;#!hash&#x503C;={curr} &#x5229;&#x7528;&#x8FD9;&#x4E2A;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x9875;&#x9762;&#x8F7D;&#x5165;&#x65F6;&#x5C31;&#x5B9A;&#x4F4D;&#x5230;&#x6307;&#x5B9A;&#x9875;</span>
  hash: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x540E;&#x9ED8;&#x8BA4;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x7136;&#x540E;&#x5F53;&#x5206;&#x9875;&#x88AB;&#x5207;&#x6362;&#x65F6;&#x518D;&#x6B21;&#x89E6;&#x53D1;</span>
  callback: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">// obj.curr&#xFF1A;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x9875;&#x7801;</span>
    <span class="hljs-comment">// obj.limit&#xFF1A;&#x83B7;&#x53D6;&#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;</span>
    <span class="hljs-comment">// obj.isFirst&#xFF1A;&#x662F;&#x5426;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#xFF0C;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x521D;&#x59CB;&#x52A0;&#x8F7D;&#x7684;&#x5224;&#x65AD;</span>

    <span class="hljs-comment">// &#x9996;&#x6B21;&#x4E0D;&#x6267;&#x884C;</span>
    <span class="hljs-keyword">if</span> (!obj.isFirst) {
      <span class="hljs-comment">// do something</span>
    }
  }
};</code></pre>
<p>&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x91CC;&#x8C03;&#x7528;<code>extend()</code>&#x5B8C;&#x6210;&#x4E86;&#x7528;&#x6237;&#x53C2;&#x6570;&#x4E0E;&#x63D2;&#x4EF6;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x7684;&#x5408;&#x5E76;&#x3002;</p>
<h2 id="articleHeader6">&#x56DE;&#x8C03;&#x4E8B;&#x4EF6;</h2>
<p>&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5728;&#x6539;&#x53D8;&#x4E86;&#x63D2;&#x4EF6;&#x72B6;&#x6001;&#x540E;&#xFF08;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x7B49;&#xFF09;&#xFF0C;&#x63D2;&#x4EF6;&#x9700;&#x8981;&#x4F5C;&#x51FA;&#x4E00;&#x5B9A;&#x7684;&#x53CD;&#x5E94;&#x3002;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5BF9;&#x7528;&#x6237;&#x884C;&#x4E3A;&#x8FDB;&#x884C;&#x4E00;&#x5B9A;&#x7684;&#x76D1;&#x542C;&#xFF0C;&#x8FD9;&#x79CD;&#x76D1;&#x542C;&#x4E60;&#x60EF;&#x4E0A;&#x5C31;&#x53EB;&#x4F5C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;<br>&#x5728;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x6BB5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;
this.options.callback &amp;&amp; this.options.callback({
    curr: this.pageNumber,
    limit: this.options.limit,
    isFirst: true
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">this</span>.options.callback &amp;&amp; <span class="hljs-keyword">this</span>.options.callback({
    <span class="hljs-attr">curr</span>: <span class="hljs-keyword">this</span>.pageNumber,
    <span class="hljs-attr">limit</span>: <span class="hljs-keyword">this</span>.options.limit,
    <span class="hljs-attr">isFirst</span>: <span class="hljs-literal">true</span>
});</code></pre>
<p>&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x662F;&#x4E0D;&#x662F;&#x6709;&#x70B9;&#x5947;&#x602A;&#x5462;&#xFF0C;&#x5176;&#x5B9E;&#x5B83;&#x76F8;&#x5F53;&#x4E8E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(this.options.callback){
    this.options.callback({
        curr: this.pageNumber,
        limit: this.options.limit,
        isFirst: true
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.options.callback){
    <span class="hljs-keyword">this</span>.options.callback({
        <span class="hljs-attr">curr</span>: <span class="hljs-keyword">this</span>.pageNumber,
        <span class="hljs-attr">limit</span>: <span class="hljs-keyword">this</span>.options.limit,
        <span class="hljs-attr">isFirst</span>: <span class="hljs-literal">true</span>
    });
}</code></pre>
<p>&#x60F3;&#x5FC5;&#x806A;&#x660E;&#x7684;&#x4F60;&#x5DF2;&#x7ECF;&#x660E;&#x767D;&#x4E86;&#x5427;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;<code>callback</code>&#x5E76;&#x4E0D;&#x662F;&#x67D0;&#x4E2A;&#x5177;&#x4F53;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x800C;&#x662F;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x3002;&#x4E0D;&#x7BA1;callback&#x6307;&#x5411;&#x8C01;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x5224;&#x65AD;&#x5B83;&#x6709;&#x6CA1;&#x6709;&#x5B58;&#x5728;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x5C31;&#x6267;&#x884C;&#x5B83;&#x3002;</p>
<h1 id="articleHeader7">&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;</h1>
<p>&#x63A5;&#x4E0B;&#x6765;&#x9700;&#x8981;&#x5BF9;&#x5206;&#x9875;&#x5668;&#x8FDB;&#x884C;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x7684;&#x7ED1;&#x5B9A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5B8C;&#x6210;&#x6211;&#x4EEC;&#x7684;<code>changePage()</code>&#x65B9;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="changePage: function() {
    var self = this;
    var pageElement = self.pageElement;
    EventUtil.addEvent(pageElement, &quot;click&quot;, function(ev) {
        var e = ev || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toLocaleLowerCase() == &quot;a&quot;) {
            if (target.id === &quot;prev&quot;) {
                self.prevPage();
            } else if (target.id === &quot;next&quot;) {
                self.nextPage();
            } else if (target.id === &quot;first&quot;) {
                self.firstPage();
            } else if (target.id === &quot;last&quot;) {
                self.lastPage();
            } else if (target.id === &quot;page&quot;) {
                self.goPage(parseInt(target.innerHTML));
            } else {
                return;
            }
            self.renderPages();
            self.options.callback &amp;&amp; self.options.callback({
                curr: self.pageNumber,
                limit: self.options.limit,
                isFirst: false
            });
            self.pageHash();
        }
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">changePage: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> pageElement = self.pageElement;
    EventUtil.addEvent(pageElement, <span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ev</span>) </span>{
        <span class="hljs-keyword">var</span> e = ev || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-keyword">var</span> target = e.target || e.srcElement;
        <span class="hljs-keyword">if</span> (target.nodeName.toLocaleLowerCase() == <span class="hljs-string">&quot;a&quot;</span>) {
            <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;prev&quot;</span>) {
                self.prevPage();
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;next&quot;</span>) {
                self.nextPage();
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;first&quot;</span>) {
                self.firstPage();
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;last&quot;</span>) {
                self.lastPage();
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;page&quot;</span>) {
                self.goPage(<span class="hljs-built_in">parseInt</span>(target.innerHTML));
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">return</span>;
            }
            self.renderPages();
            self.options.callback &amp;&amp; self.options.callback({
                <span class="hljs-attr">curr</span>: self.pageNumber,
                <span class="hljs-attr">limit</span>: self.options.limit,
                <span class="hljs-attr">isFirst</span>: <span class="hljs-literal">false</span>
            });
            self.pageHash();
        }
    });
}</code></pre>
<p>&#x6574;&#x4F53;&#x7684;&#x903B;&#x8F91;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x90FD;&#x80FD;&#x8F7B;&#x677E;&#x770B;&#x61C2;&#xFF0C;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x70B9;&#x51FB;&#x7684;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x903B;&#x8F91;&#x64CD;&#x4F5C;&#xFF0C;&#x4F46;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x6709;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x4E00;&#x70B9;&#x964C;&#x751F;&#x3002;</p>
<p>Q&#xFF1A;&#x8FD9;&#x4E2A;<code>target</code>&#x662F;&#x5565;&#xFF1F;&#x8FD9;&#x4E2A;<code>srcElement</code>&#x53C8;&#x662F;&#x5565;&#xFF1F;<br>A&#xFF1A;&#x8FD9;&#x5176;&#x5B9E;&#x662F;JavaScript&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#x65B9;&#x9762;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5982;&#x4E0B;&#x6587;&#x7AE0;&#x8FDB;&#x884C;&#x5B66;&#x4E60;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#x3002;</p>
<p><a href="https://www.cnblogs.com/liugang-vip/p/5616484.html" rel="nofollow noreferrer" target="_blank">js&#x4E2D;&#x7684;&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#x6216;&#x662F;&#x4E8B;&#x4EF6;&#x4EE3;&#x7406;&#x8BE6;&#x89E3;</a></p>
<p>&#x63D2;&#x4EF6;&#x5BF9;&#x8C61;&#x3001;&#x914D;&#x7F6E;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x4E8B;&#x4EF6;&#x4E5F;&#x7ED1;&#x5B9A;&#x4E86;&#xFF0C;&#x90A3;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x5E94;&#x8BE5;&#x5B8C;&#x6210;&#x6211;&#x4EEC;&#x9875;&#x7801;&#x4E0A;&#x663E;&#x793A;&#x7684;DOM&#x8282;&#x70B9;&#x7684;&#x6E32;&#x67D3;&#x4E86;&#x3002;</p>
<h1 id="articleHeader8">&#x6E32;&#x67D3;DOM</h1>
<p>&#x6E32;&#x67D3;&#x7684;&#x8FC7;&#x7A0B;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5BF9;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x5C01;&#x88C5;&#x7684;&#x90A3;&#x51E0;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x6253;&#x5370;&#x51FD;&#x6570;&#x7684;&#x6539;&#x8FDB;&#xFF0C;&#x628A;&#x5B57;&#x7B26;&#x4E32;&#x6539;&#x4E3A;&#x5177;&#x4F53;&#x7684;DOM&#x8282;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x6DFB;&#x52A0;&#x8FDB;&#x9875;&#x9762;&#x5373;&#x53EF;&#x3002;<br>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;<code>createHtml()</code>&#x51FD;&#x6570;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createHtml: function(elemDatas) {
  var self = this;
  var fragment = document.createDocumentFragment();
  var liEle = document.createElement(&quot;li&quot;);
  var aEle = document.createElement(&quot;a&quot;);
  elemDatas.forEach(function(elementData, index) {
    liEle = liEle.cloneNode(false);
    aEle = aEle.cloneNode(false);
    liEle.setAttribute(&quot;class&quot;, CLASS_NAME.ITEM);
    aEle.setAttribute(&quot;href&quot;, &quot;javascript:;&quot;);
    aEle.setAttribute(&quot;id&quot;, elementData.id);
    if (elementData.id !== &apos;page&apos;) {
      aEle.setAttribute(&quot;class&quot;, CLASS_NAME.LINK);
    } else {
      aEle.setAttribute(&quot;class&quot;, elementData.className);
    }
    aEle.innerHTML = elementData.content;
    liEle.appendChild(aEle);
    fragment.appendChild(liEle);
  });
  return fragment;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">createHtml: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">elemDatas</span>) </span>{
  <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();
  <span class="hljs-keyword">var</span> liEle = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;li&quot;</span>);
  <span class="hljs-keyword">var</span> aEle = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;a&quot;</span>);
  elemDatas.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">elementData, index</span>) </span>{
    liEle = liEle.cloneNode(<span class="hljs-literal">false</span>);
    aEle = aEle.cloneNode(<span class="hljs-literal">false</span>);
    liEle.setAttribute(<span class="hljs-string">&quot;class&quot;</span>, CLASS_NAME.ITEM);
    aEle.setAttribute(<span class="hljs-string">&quot;href&quot;</span>, <span class="hljs-string">&quot;javascript:;&quot;</span>);
    aEle.setAttribute(<span class="hljs-string">&quot;id&quot;</span>, elementData.id);
    <span class="hljs-keyword">if</span> (elementData.id !== <span class="hljs-string">&apos;page&apos;</span>) {
      aEle.setAttribute(<span class="hljs-string">&quot;class&quot;</span>, CLASS_NAME.LINK);
    } <span class="hljs-keyword">else</span> {
      aEle.setAttribute(<span class="hljs-string">&quot;class&quot;</span>, elementData.className);
    }
    aEle.innerHTML = elementData.content;
    liEle.appendChild(aEle);
    fragment.appendChild(liEle);
  });
  <span class="hljs-keyword">return</span> fragment;
}</code></pre>
<p>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;li class=&quot;pagination-item&quot;&gt;&lt;a href=&quot;javascript:;&quot; id=&quot;page&quot; class=&quot;pagination-link current&quot;&gt;1&lt;/a&gt;&lt;/li&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;page&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-link current&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>&#x4EE3;&#x7801;&#x4E2D;&#x6709;&#x6D89;&#x53CA;&#x5230;&#x4E24;&#x4E2A;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x7684;API&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;API&#x662F;<code>document.createDocumentFragment()</code>&#xFF0C;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x4E34;&#x65F6;&#x5360;&#x4F4D;&#x7B26;&#xFF0C;&#x7136;&#x540E;&#x5B58;&#x653E;&#x90A3;&#x4E9B;&#x9700;&#x8981;&#x63D2;&#x5165;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x907F;&#x514D;&#x9875;&#x9762;&#x8FDB;&#x884C;DOM&#x64CD;&#x4F5C;&#x65F6;&#x7684;&#x91CD;&#x7ED8;&#x548C;&#x56DE;&#x6D41;&#xFF0C;&#x51CF;&#x5C0F;&#x9875;&#x9762;&#x7684;&#x8D1F;&#x62C5;&#xFF0C;&#x63D0;&#x5347;&#x9875;&#x9762;&#x6027;&#x80FD;&#x3002;&#x76F8;&#x5173;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x53EF;&#x53C2;&#x9605;&#x4EE5;&#x4E0B;&#x6587;&#x7AE0;&#xFF1A;</p>
<ul>
<li><a href="https://www.cnblogs.com/leejersey/p/3516603.html" rel="nofollow noreferrer" target="_blank">JS&#x6027;&#x80FD;&#x4F18;&#x5316;&#x4E4B;&#x521B;&#x5EFA;&#x6587;&#x6863;&#x788E;&#x7247;</a></li>
<li><a href="https://blog.csdn.net/github_39457740/article/details/80698584" rel="nofollow noreferrer" target="_blank">&#x524D;&#x7AEF;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x7B2C;&#x4E09;&#x7BC7;-documentFragment</a></li>
</ul>
<p>&#x7B2C;&#x4E8C;&#x4E2A;API&#x662F;<code>cloneNode()</code>&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x5F88;&#x591A;&#x5143;&#x7D20;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x8FD9;&#x4E2A;API&#x6765;&#x51CF;&#x5C11;&#x5C5E;&#x6027;&#x7684;&#x8BBE;&#x7F6E;&#x6B21;&#x6570;&#xFF0C;&#x4E0D;&#x8FC7;&#x5FC5;&#x987B;&#x5148;&#x63D0;&#x524D;&#x51C6;&#x5907;&#x4E00;&#x4E2A;&#x6837;&#x677F;&#x8282;&#x70B9;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var frag = document.createDocumentFragment();
for (var i = 0; i &lt; 1000; i++) {
    var el = document.createElement(&apos;p&apos;);
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);
//&#x66FF;&#x6362;&#x4E3A;&#xFF1A;
var frag = document.createDocumentFragment();
var pEl = document.getElementsByTagName(&apos;p&apos;)[0];
for (var i = 0; i &lt; 1000; i++) {
    var el = pEl.cloneNode(false);
    el.innerHTML = i;
    frag.appendChild(el);
}
document.body.appendChild(frag);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> frag = <span class="hljs-built_in">document</span>.createDocumentFragment();
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    <span class="hljs-keyword">var</span> el = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&apos;p&apos;</span>);
    el.innerHTML = i;
    frag.appendChild(el);
}
<span class="hljs-built_in">document</span>.body.appendChild(frag);
<span class="hljs-comment">//&#x66FF;&#x6362;&#x4E3A;&#xFF1A;</span>
<span class="hljs-keyword">var</span> frag = <span class="hljs-built_in">document</span>.createDocumentFragment();
<span class="hljs-keyword">var</span> pEl = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&apos;p&apos;</span>)[<span class="hljs-number">0</span>];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    <span class="hljs-keyword">var</span> el = pEl.cloneNode(<span class="hljs-literal">false</span>);
    el.innerHTML = i;
    frag.appendChild(el);
}
<span class="hljs-built_in">document</span>.body.appendChild(frag);</code></pre>
<p>&#x5B8C;&#x6210;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x540E;&#xFF0C;&#x518D;&#x8FDB;&#x4E00;&#x6B65;&#x5C01;&#x88C5;&#x6210;&#x4E24;&#x4E2A;&#x63D2;&#x5165;&#x8282;&#x70B9;&#x7684;&#x51FD;&#x6570;&#xFF1A;&#xFF08;&#x8FD9;&#x4E00;&#x6B65;&#x53EF;&#x7701;&#x7565;&#xFF09;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addFragmentBefore: function(fragment, datas) {
  fragment.insertBefore(this.createHtml(datas), fragment.firstChild);
}

addFragmentAfter: function(fragment, datas) {
  fragment.appendChild(this.createHtml(datas));
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">addFragmentBefore: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fragment, datas</span>) </span>{
  fragment.insertBefore(<span class="hljs-keyword">this</span>.createHtml(datas), fragment.firstChild);
}

addFragmentAfter: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fragment, datas</span>) </span>{
  fragment.appendChild(<span class="hljs-keyword">this</span>.createHtml(datas));
}</code></pre>
<p>&#x524D;&#x8005;&#x5728;&#x6700;&#x524D;&#x63D2;&#x5165;&#x8282;&#x70B9;&#xFF0C;&#x540E;&#x8005;&#x5728;&#x6700;&#x540E;&#x63D2;&#x5165;&#x8282;&#x70B9;&#x3002;<br>&#x4E00;&#x4E9B;&#x5E38;&#x91CF;&#x548C;&#x91CD;&#x590D;&#x64CD;&#x4F5C;&#x4E5F;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x62BD;&#x53D6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pageInfos: [{
    id: &quot;first&quot;,
    content: &quot;&#x9996;&#x9875;&quot;
  },
  {
    id: &quot;prev&quot;,
    content: &quot;&#x524D;&#x4E00;&#x9875;&quot;
  },
  {
    id: &quot;next&quot;,
    content: &quot;&#x540E;&#x4E00;&#x9875;&quot;
  },
  {
    id: &quot;last&quot;,
    content: &quot;&#x5C3E;&#x9875;&quot;
  },
  {
    id: &quot;&quot;,
    content: &quot;...&quot;
  }
]

getPageInfos: function(className, content) {
  return {
    id: &quot;page&quot;,
    className: className,
    content: content
  };
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">pageInfos: [{
    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;first&quot;</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;prev&quot;</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x524D;&#x4E00;&#x9875;&quot;</span>
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;next&quot;</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x540E;&#x4E00;&#x9875;&quot;</span>
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;last&quot;</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x5C3E;&#x9875;&quot;</span>
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;&quot;</span>,
    <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;...&quot;</span>
  }
]

getPageInfos: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">className, content</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;page&quot;</span>,
    <span class="hljs-attr">className</span>: className,
    <span class="hljs-attr">content</span>: content
  };
}</code></pre>
<p>&#x5229;&#x7528;&#x4E0A;&#x9762;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x5BF9;&#x8C61;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5BF9;&#x6700;&#x5F00;&#x59CB;&#x90A3;&#x4E24;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x6539;&#x9020;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderNoEllipsis: function() {
  var fragment = document.createDocumentFragment();
  if (this.pageNumber &lt; this.options.pageShow + 1) {
    fragment.appendChild(this.renderDom(1, this.options.pageShow * 2 + 1));
  } else if (this.pageNumber &gt; this.pageCount - this.options.pageShow) {
    fragment.appendChild(this.renderDom(this.pageCount - this.options.pageShow * 2, this.pageCount));
  } else {
    fragment.appendChild(this.renderDom(this.pageNumber - this.options.pageShow, this.pageNumber + this.options.pageShow));
  }
  if (this.pageNumber &gt; 1) {
    this.addFragmentBefore(fragment, [
      this.pageInfos[0],
      this.pageInfos[1]
    ]);
  }
  if (this.pageNumber &lt; this.pageCount) {
    this.addFragmentAfter(fragment, [this.pageInfos[2], this.pageInfos[3]]);
  }
  return fragment;
}

renderEllipsis: function() {
  var fragment = document.createDocumentFragment();
  this.addFragmentAfter(fragment, [
    this.getPageInfos(CLASS_NAME.LINK + &quot; current&quot;, this.pageNumber)
  ]);
  for (var i = 1; i &lt;= this.options.pageShow; i++) {
    if (this.pageNumber - i &gt; 1) {
      this.addFragmentBefore(fragment, [
        this.getPageInfos(CLASS_NAME.LINK, this.pageNumber - i)
      ]);
    }
    if (this.pageNumber + i &lt; this.pageCount) {
      this.addFragmentAfter(fragment, [
        this.getPageInfos(CLASS_NAME.LINK, this.pageNumber + i)
      ]);
    }
  }
  if (this.pageNumber - (this.options.pageShow + 1) &gt; 1) {
    this.addFragmentBefore(fragment, [this.pageInfos[4]]);
  }
  if (this.pageNumber &gt; 1) {
    this.addFragmentBefore(fragment, [
      this.pageInfos[0],
      this.pageInfos[1],
      this.getPageInfos(CLASS_NAME.LINK, 1)
    ]);
  }
  if (this.pageNumber + this.options.pageShow + 1 &lt; this.pageCount) {
    this.addFragmentAfter(fragment, [this.pageInfos[4]]);
  }
  if (this.pageNumber &lt; this.pageCount) {
    this.addFragmentAfter(fragment, [
      this.getPageInfos(CLASS_NAME.LINK, this.pageCount),
      this.pageInfos[2],
      this.pageInfos[3]
    ]);
  }
  return fragment;
}

renderDom: function(begin, end) {
  var fragment = document.createDocumentFragment();
  var str = &quot;&quot;;
  for (var i = begin; i &lt;= end; i++) {
    str = this.pageNumber === i ? CLASS_NAME.LINK + &quot; current&quot; : CLASS_NAME.LINK;
    this.addFragmentAfter(fragment, [this.getPageInfos(str, i)]);
  }
  return fragment;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">renderNoEllipsis: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber &lt; <span class="hljs-keyword">this</span>.options.pageShow + <span class="hljs-number">1</span>) {
    fragment.appendChild(<span class="hljs-keyword">this</span>.renderDom(<span class="hljs-number">1</span>, <span class="hljs-keyword">this</span>.options.pageShow * <span class="hljs-number">2</span> + <span class="hljs-number">1</span>));
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber &gt; <span class="hljs-keyword">this</span>.pageCount - <span class="hljs-keyword">this</span>.options.pageShow) {
    fragment.appendChild(<span class="hljs-keyword">this</span>.renderDom(<span class="hljs-keyword">this</span>.pageCount - <span class="hljs-keyword">this</span>.options.pageShow * <span class="hljs-number">2</span>, <span class="hljs-keyword">this</span>.pageCount));
  } <span class="hljs-keyword">else</span> {
    fragment.appendChild(<span class="hljs-keyword">this</span>.renderDom(<span class="hljs-keyword">this</span>.pageNumber - <span class="hljs-keyword">this</span>.options.pageShow, <span class="hljs-keyword">this</span>.pageNumber + <span class="hljs-keyword">this</span>.options.pageShow));
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.addFragmentBefore(fragment, [
      <span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">0</span>],
      <span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">1</span>]
    ]);
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber &lt; <span class="hljs-keyword">this</span>.pageCount) {
    <span class="hljs-keyword">this</span>.addFragmentAfter(fragment, [<span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">2</span>], <span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">3</span>]]);
  }
  <span class="hljs-keyword">return</span> fragment;
}

renderEllipsis: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();
  <span class="hljs-keyword">this</span>.addFragmentAfter(fragment, [
    <span class="hljs-keyword">this</span>.getPageInfos(CLASS_NAME.LINK + <span class="hljs-string">&quot; current&quot;</span>, <span class="hljs-keyword">this</span>.pageNumber)
  ]);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= <span class="hljs-keyword">this</span>.options.pageShow; i++) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber - i &gt; <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">this</span>.addFragmentBefore(fragment, [
        <span class="hljs-keyword">this</span>.getPageInfos(CLASS_NAME.LINK, <span class="hljs-keyword">this</span>.pageNumber - i)
      ]);
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber + i &lt; <span class="hljs-keyword">this</span>.pageCount) {
      <span class="hljs-keyword">this</span>.addFragmentAfter(fragment, [
        <span class="hljs-keyword">this</span>.getPageInfos(CLASS_NAME.LINK, <span class="hljs-keyword">this</span>.pageNumber + i)
      ]);
    }
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber - (<span class="hljs-keyword">this</span>.options.pageShow + <span class="hljs-number">1</span>) &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.addFragmentBefore(fragment, [<span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">4</span>]]);
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber &gt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">this</span>.addFragmentBefore(fragment, [
      <span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">0</span>],
      <span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">1</span>],
      <span class="hljs-keyword">this</span>.getPageInfos(CLASS_NAME.LINK, <span class="hljs-number">1</span>)
    ]);
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber + <span class="hljs-keyword">this</span>.options.pageShow + <span class="hljs-number">1</span> &lt; <span class="hljs-keyword">this</span>.pageCount) {
    <span class="hljs-keyword">this</span>.addFragmentAfter(fragment, [<span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">4</span>]]);
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.pageNumber &lt; <span class="hljs-keyword">this</span>.pageCount) {
    <span class="hljs-keyword">this</span>.addFragmentAfter(fragment, [
      <span class="hljs-keyword">this</span>.getPageInfos(CLASS_NAME.LINK, <span class="hljs-keyword">this</span>.pageCount),
      <span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">2</span>],
      <span class="hljs-keyword">this</span>.pageInfos[<span class="hljs-number">3</span>]
    ]);
  }
  <span class="hljs-keyword">return</span> fragment;
}

renderDom: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">begin, end</span>) </span>{
  <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment();
  <span class="hljs-keyword">var</span> str = <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = begin; i &lt;= end; i++) {
    str = <span class="hljs-keyword">this</span>.pageNumber === i ? CLASS_NAME.LINK + <span class="hljs-string">&quot; current&quot;</span> : CLASS_NAME.LINK;
    <span class="hljs-keyword">this</span>.addFragmentAfter(fragment, [<span class="hljs-keyword">this</span>.getPageInfos(str, i)]);
  }
  <span class="hljs-keyword">return</span> fragment;
}</code></pre>
<p>&#x903B;&#x8F91;&#x548C;&#x6700;&#x5F00;&#x59CB;&#x7684;<code>showPages()</code>&#x5B8C;&#x5168;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x662F;&#x53D8;&#x6210;&#x4E86;DOM&#x7684;&#x64CD;&#x4F5C;&#x800C;&#x5DF2;&#x3002;</p>
<p>&#x81F3;&#x6B64;&#xFF0C;&#x6E32;&#x67D3;&#x90E8;&#x5206;&#x7684;&#x51FD;&#x6570;&#x57FA;&#x672C;&#x4E5F;&#x5C01;&#x88C5;&#x5B8C;&#x6210;&#xFF0C;&#x6700;&#x540E;&#x8FD8;&#x5269;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#x9875;&#x7801;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x4F5C;&#x8BB2;&#x89E3;&#x4E86;&#xFF0C;&#x53EF;&#x81EA;&#x884C;&#x53C2;&#x8003;<a href="https://github.com/csdoker/csdwheels/blob/master/src/pagination/pagination.js" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a>&#x3002;</p>
<h1 id="articleHeader9">&#x4F7F;&#x7528;&#x573A;&#x666F;</h1>
<p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x4E5F;&#x770B;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x6B64;&#x5206;&#x9875;&#x5668;&#x53EA;&#x8D1F;&#x8D23;&#x5206;&#x9875;&#x672C;&#x8EAB;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#x4E0E;&#x6E32;&#x67D3;&#x9700;&#x8981;&#x53E6;&#x5916;&#x53BB;&#x5B8C;&#x6210;&#x3002;<br>&#x4E0D;&#x8FC7;&#xFF0C;&#x6B64;&#x5206;&#x9875;&#x5668;&#x4E0D;&#x4EC5;&#x80FD;&#x5E94;&#x7528;&#x5728;&#x4E00;&#x822C;&#x7684;&#x5F02;&#x6B65;&#x5206;&#x9875;&#x4E0A;&#xFF0C;&#x8FD8;&#x53EF;&#x76F4;&#x63A5;&#x5BF9;&#x4E00;&#x6BB5;&#x5DF2;&#x77E5;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5206;&#x9875;&#x5C55;&#x73B0;&#xFF0C;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x5982;&#x4E0B;&#xFF1A;</p>
<h2 id="articleHeader10">&#x524D;&#x7AEF;&#x5206;&#x9875;</h2>
<p>&#x5728;callback&#x91CC;&#x5BF9;&#x603B;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x7136;&#x540E;&#x53D6;&#x51FA;&#x5F53;&#x524D;&#x9875;&#x9700;&#x8981;&#x5C55;&#x793A;&#x7684;&#x6570;&#x636E;&#x5373;&#x53EF;</p>
<h2 id="articleHeader11">&#x540E;&#x7AEF;&#x5206;&#x9875;</h2>
<p>&#x5229;&#x7528;url&#x4E0A;&#x7684;&#x9875;&#x7801;&#x53C2;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x9875;&#x9762;&#x8F7D;&#x5165;&#x65F6;&#x5C31;&#x5B9A;&#x4F4D;&#x5230;&#x6307;&#x5B9A;&#x9875;&#x7801;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x8BF7;&#x6C42;&#x540E;&#x7AEF;&#x6307;&#x5B9A;&#x9875;&#x7801;&#x4E0B;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E; &#x5728;callback&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#x53D6;&#x5F97;&#x5F53;&#x524D;&#x9875;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>window.location.href</code>&#x6539;&#x53D8;url&#xFF0C;&#x5E76;&#x5C06;&#x5F53;&#x524D;&#x9875;&#x7801;&#x4F5C;&#x4E3A;url&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#xFF0C;&#x4F8B;&#x5982;&quot;./test.html?page=&quot;</p>
<h1 id="articleHeader12">&#x63D2;&#x4EF6;&#x8C03;&#x7528;</h1>
<p>&#x63D2;&#x4EF6;&#x7684;&#x8C03;&#x7528;&#x4E5F;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#xFF0C;&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x9875;&#x9762;&#x5F15;&#x5165;&#x76F8;&#x5173;&#x7684;CSS&#x3001;JS&#x6587;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;link rel=&quot;stylesheet&quot; href=&quot;pagination.min.css&quot;&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;pagination.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;pagination.min.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;pagination.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote>&#x6837;&#x5F0F;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x4E0D;&#x6EE1;&#x610F;&#x53EF;&#x81EA;&#x884C;&#x8C03;&#x6574;</blockquote>
<p>&#x7136;&#x540E;&#x5C06;HTML&#x7ED3;&#x6784;&#x63D2;&#x5165;&#x6587;&#x6863;&#x4E2D;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;ol class=&quot;pagination&quot; id=&quot;pagelist&quot;&gt;&lt;/ol&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">ol</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;pagelist&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span></code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x5C06;&#x5FC5;&#x586B;&#x3001;&#x9009;&#x586B;&#x7684;&#x53C2;&#x6570;&#x914D;&#x7F6E;&#x597D;&#x5373;&#x53EF;&#x5B8C;&#x6210;&#x672C;&#x5206;&#x9875;&#x63D2;&#x4EF6;&#x7684;&#x521D;&#x59CB;&#x5316;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5206;&#x9875;&#x5143;&#x7D20;ID&#xFF08;&#x5FC5;&#x586B;&#xFF09;
var selector = &apos;#pagelist&apos;;

// &#x5206;&#x9875;&#x914D;&#x7F6E;
var pageOption = {
  // &#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;&#xFF08;&#x5FC5;&#x586B;&#xFF09;
  limit: 5,
  // &#x6570;&#x636E;&#x603B;&#x6570;&#xFF08;&#x4E00;&#x822C;&#x901A;&#x8FC7;&#x540E;&#x7AEF;&#x83B7;&#x53D6;&#xFF0C;&#x5FC5;&#x586B;&#xFF09;
  count: 162,
  // &#x5F53;&#x524D;&#x9875;&#x7801;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;1&#xFF09;
  curr: 1,
  // &#x662F;&#x5426;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#xFF09;
  ellipsis: true,
  // &#x5F53;&#x524D;&#x9875;&#x524D;&#x540E;&#x4E24;&#x8FB9;&#x53EF;&#x663E;&#x793A;&#x7684;&#x9875;&#x7801;&#x4E2A;&#x6570;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;2&#xFF09;
  pageShow: 2,
  // &#x5F00;&#x542F;location.hash&#xFF0C;&#x5E76;&#x81EA;&#x5B9A;&#x4E49;hash&#x503C; &#xFF08;&#x9ED8;&#x8BA4;&#x5173;&#x95ED;&#xFF09;
  // &#x5982;&#x679C;&#x5F00;&#x542F;&#xFF0C;&#x5728;&#x89E6;&#x53D1;&#x5206;&#x9875;&#x65F6;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x5BF9;url&#x8FFD;&#x52A0;&#xFF1A;#!hash&#x503C;={curr} &#x5229;&#x7528;&#x8FD9;&#x4E2A;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x9875;&#x9762;&#x8F7D;&#x5165;&#x65F6;&#x5C31;&#x5B9A;&#x4F4D;&#x5230;&#x6307;&#x5B9A;&#x9875;
  hash: false,
  // &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x540E;&#x9ED8;&#x8BA4;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x7136;&#x540E;&#x5F53;&#x5206;&#x9875;&#x88AB;&#x5207;&#x6362;&#x65F6;&#x518D;&#x6B21;&#x89E6;&#x53D1;
  callback: function(obj) {
    // obj.curr&#xFF1A;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x9875;&#x7801;
    // obj.limit&#xFF1A;&#x83B7;&#x53D6;&#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;
    // obj.isFirst&#xFF1A;&#x662F;&#x5426;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#xFF0C;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x521D;&#x59CB;&#x52A0;&#x8F7D;&#x7684;&#x5224;&#x65AD;

    // &#x9996;&#x6B21;&#x4E0D;&#x6267;&#x884C;
    if (!obj.isFirst) {
      // do something
    }
  }
};

// &#x521D;&#x59CB;&#x5316;&#x5206;&#x9875;&#x5668;
new Pagination(selector, pageOption);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5206;&#x9875;&#x5143;&#x7D20;ID&#xFF08;&#x5FC5;&#x586B;&#xFF09;</span>
<span class="hljs-keyword">var</span> selector = <span class="hljs-string">&apos;#pagelist&apos;</span>;

<span class="hljs-comment">// &#x5206;&#x9875;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">var</span> pageOption = {
  <span class="hljs-comment">// &#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;&#xFF08;&#x5FC5;&#x586B;&#xFF09;</span>
  limit: <span class="hljs-number">5</span>,
  <span class="hljs-comment">// &#x6570;&#x636E;&#x603B;&#x6570;&#xFF08;&#x4E00;&#x822C;&#x901A;&#x8FC7;&#x540E;&#x7AEF;&#x83B7;&#x53D6;&#xFF0C;&#x5FC5;&#x586B;&#xFF09;</span>
  count: <span class="hljs-number">162</span>,
  <span class="hljs-comment">// &#x5F53;&#x524D;&#x9875;&#x7801;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;1&#xFF09;</span>
  curr: <span class="hljs-number">1</span>,
  <span class="hljs-comment">// &#x662F;&#x5426;&#x663E;&#x793A;&#x7701;&#x7565;&#x53F7;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x663E;&#x793A;&#xFF09;</span>
  ellipsis: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// &#x5F53;&#x524D;&#x9875;&#x524D;&#x540E;&#x4E24;&#x8FB9;&#x53EF;&#x663E;&#x793A;&#x7684;&#x9875;&#x7801;&#x4E2A;&#x6570;&#xFF08;&#x9009;&#x586B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;2&#xFF09;</span>
  pageShow: <span class="hljs-number">2</span>,
  <span class="hljs-comment">// &#x5F00;&#x542F;location.hash&#xFF0C;&#x5E76;&#x81EA;&#x5B9A;&#x4E49;hash&#x503C; &#xFF08;&#x9ED8;&#x8BA4;&#x5173;&#x95ED;&#xFF09;</span>
  <span class="hljs-comment">// &#x5982;&#x679C;&#x5F00;&#x542F;&#xFF0C;&#x5728;&#x89E6;&#x53D1;&#x5206;&#x9875;&#x65F6;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x5BF9;url&#x8FFD;&#x52A0;&#xFF1A;#!hash&#x503C;={curr} &#x5229;&#x7528;&#x8FD9;&#x4E2A;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x9875;&#x9762;&#x8F7D;&#x5165;&#x65F6;&#x5C31;&#x5B9A;&#x4F4D;&#x5230;&#x6307;&#x5B9A;&#x9875;</span>
  hash: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x540E;&#x9ED8;&#x8BA4;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x7136;&#x540E;&#x5F53;&#x5206;&#x9875;&#x88AB;&#x5207;&#x6362;&#x65F6;&#x518D;&#x6B21;&#x89E6;&#x53D1;</span>
  callback: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">// obj.curr&#xFF1A;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x9875;&#x7801;</span>
    <span class="hljs-comment">// obj.limit&#xFF1A;&#x83B7;&#x53D6;&#x6BCF;&#x9875;&#x663E;&#x793A;&#x6570;&#x636E;&#x6761;&#x6570;</span>
    <span class="hljs-comment">// obj.isFirst&#xFF1A;&#x662F;&#x5426;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x9875;&#x9762;&#xFF0C;&#x4E00;&#x822C;&#x7528;&#x4E8E;&#x521D;&#x59CB;&#x52A0;&#x8F7D;&#x7684;&#x5224;&#x65AD;</span>

    <span class="hljs-comment">// &#x9996;&#x6B21;&#x4E0D;&#x6267;&#x884C;</span>
    <span class="hljs-keyword">if</span> (!obj.isFirst) {
      <span class="hljs-comment">// do something</span>
    }
  }
};

<span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x5206;&#x9875;&#x5668;</span>
<span class="hljs-keyword">new</span> Pagination(selector, pageOption);</code></pre>
<blockquote>&#x5728;&#x4E24;&#x79CD;&#x57FA;&#x7840;&#x6A21;&#x5F0F;&#x4E4B;&#x4E0A;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x5F00;&#x542F;Hash&#x6A21;&#x5F0F;</blockquote>
<p>&#x90A3;&#x4E48;&#xFF0C;&#x6574;&#x4E2A;&#x5206;&#x9875;&#x5668;&#x63D2;&#x4EF6;&#x7684;&#x5C01;&#x88C5;&#x5230;&#x8FD9;&#x91CC;&#x5C31;&#x5168;&#x90E8;&#x8BB2;&#x89E3;&#x5B8C;&#x6BD5;&#x4E86;&#xFF0C;&#x600E;&#x4E48;&#x6837;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x89C9;&#x5F97;&#x8FD8;&#x633A;&#x7B80;&#x5355;&#xFF1F;&#x5077;&#x5077;&#x544A;&#x8BC9;&#x4F60;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x4F1A;&#x9010;&#x6E10;&#x5C1D;&#x8BD5;&#x70B9;&#x66F4;&#x6709;&#x96BE;&#x5EA6;&#x7684;&#x63D2;&#x4EF6;&#x54E6;&#xFF01;&#x656C;&#x8BF7;&#x671F;&#x5F85;~~</p>
<blockquote>&#x5E73;&#x5FC3;&#x800C;&#x8BBA;&#xFF0C;&#x6574;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x8D28;&#x91CF;&#x867D;&#x7136;&#x4E00;&#x822C;&#xFF0C;&#x4F46;&#x662F;&#x903B;&#x8F91;&#x548C;&#x7ED3;&#x6784;&#x6211;&#x89C9;&#x5F97;&#x8FD8;&#x662F;&#x5199;&#x5F97;&#x7B97;&#x6BD4;&#x8F83;&#x6E05;&#x6670;&#x7684;&#x5427;&#x3002;&#x4EE3;&#x7801;&#x7684;&#x4E0D;&#x8DB3;&#x4E4B;&#x5904;&#x80AF;&#x5B9A;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x4E5F;&#x5E0C;&#x671B;&#x5404;&#x4F4D;&#x770B;&#x5B98;&#x591A;&#x591A;&#x6307;&#x6559;&#xFF01;</blockquote>
<h1 id="articleHeader13">&#x66F4;&#x65B0;&#xFF08;2018-7-29&#xFF09;</h1>
<h2 id="articleHeader14">ES6-&#x73AF;&#x5883;&#x914D;&#x7F6E;</h2>
<p>2015&#x5E74;&#xFF0C;ECMAScript&#x6B63;&#x5F0F;&#x53D1;&#x5E03;&#x4E86;&#x5B83;&#x7684;&#x65B0;&#x7248;&#x672C;&#x2014;&#x2014;ECMAScript6&#xFF0C;&#x5BF9;JavaScript&#x8BED;&#x8A00;&#x672C;&#x8EAB;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x6B21;&#x5F7B;&#x5F7B;&#x5E95;&#x5E95;&#x7684;&#x5347;&#x7EA7;&#x3002;</p>
<p>&#x7ECF;&#x8FC7;&#x8FD9;&#x6B21;&#x66F4;&#x65B0;&#xFF0C;&#x4E0D;&#x4EC5;&#x4FEE;&#x590D;&#x4E86;&#x8BB8;&#x591A;ES5&#x65F6;&#x4EE3;&#x7559;&#x4E0B;&#x6765;&#x7684;&#x201C;&#x5751;&#x201D;&#xFF0C;&#x66F4;&#x662F;&#x5728;&#x539F;&#x6709;&#x7684;&#x8BED;&#x6CD5;&#x548C;&#x89C4;&#x5219;&#x4E0A;&#x589E;&#x52A0;&#x4E86;&#x4E0D;&#x5C11;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x5C3D;&#x7BA1;&#x76EE;&#x524D;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x65B0;&#x89C4;&#x8303;&#x652F;&#x6301;&#x5F97;&#x5E76;&#x4E0D;&#x5B8C;&#x5584;&#xFF0C;&#x4F46;&#x7ECF;&#x8FC7;&#x4E00;&#x4E9B;&#x795E;&#x5947;&#x7684;&#x5DE5;&#x5177;&#x5904;&#x7406;&#x540E;&#x5C31;&#x80FD;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x201C;&#x8BA4;&#x8BC6;&#x201D;&#x8FD9;&#x4E9B;&#x65B0;&#x4E1C;&#x897F;&#xFF0C;&#x5E76;&#x517C;&#x5BB9;&#x5B83;&#x4EEC;&#x4E86;&#x3002;</p>
<p>so&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x6709;&#x4EC0;&#x4E48;&#x7406;&#x7531;&#x4E0D;&#x7528;&#x5F3A;&#x5927;&#x7684;ES6&#x5462;&#xFF1F;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x8BA9;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x4E9B;&#x795E;&#x5947;&#x7684;&#x5DE5;&#x5177;&#x662F;&#x600E;&#x4E48;&#x4F7F;&#x7528;&#x7684;&#x5427;&#x3002;</p>
<h3 id="articleHeader15">Babel</h3>
<p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x6765;&#x8F6C;&#x6362;ES6&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5B83;&#x7684;&#x82B3;&#x540D;&#x53EB;Babel&#x3002;<br>Babel&#x662F;&#x4E00;&#x4E2A;&#x7F16;&#x8BD1;&#x5668;&#xFF0C;&#x8D1F;&#x8D23;&#x5C06;&#x6E90;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x6210;&#x6307;&#x5B9A;&#x8BED;&#x6CD5;&#x7684;&#x76EE;&#x6807;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x4F7F;&#x5B83;&#x4EEC;&#x5F88;&#x597D;&#x7684;&#x6267;&#x884C;&#x5728;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x5B83;&#x6765;&#x7F16;&#x8BD1;&#x6211;&#x4EEC;&#x7684;ES6&#x4EE3;&#x7801;&#x3002;</p>
<p>&#x8981;&#x4F7F;&#x7528;Babel&#x76F8;&#x5173;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5FC5;&#x987B;&#x5148;&#x7528;npm&#x5B89;&#x88C5;&#x5B83;&#x4EEC;&#xFF1A;&#xFF08;npm&#x53CA;node&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x8BF7;&#x81EA;&#x884C;&#x5B66;&#x4E60;&#xFF09;</p>
<blockquote>npm i babel-cli babel-preset-env babel-core babel-loader babel-plugin-transform-runtime babel-polyfill babel-runtime -D</blockquote>
<p>&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x4F7F;&#x7528;&#x547D;&#x4EE4;&#x7F16;&#x8BD1;&#x67D0;&#x4E2A;&#x76EE;&#x5F55;&#x4E0B;&#x7684;js&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x8F93;&#x51FA;&#x5B83;&#x4EEC;&#x4E86;&#x3002;</p>
<p>But&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x5B8C;&#x7F8E;&#x65B9;&#x6848;&#x4E86;&#x5417;&#xFF1F;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x3002;</p>
<p>&#x5728;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x8003;&#x8651;&#x66F4;&#x591A;&#x4E1C;&#x897F;&#xFF0C;&#x6BD4;&#x5982;&#x6A21;&#x5757;&#x5316;&#x5F00;&#x53D1;&#x3001;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#x548C;&#x6784;&#x5EFA;&#x7B49;&#x7B49;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x66F4;&#x4E3A;&#x5F3A;&#x5927;&#x7684;&#x5DE5;&#x5177;&#x6765;&#x5347;&#x7EA7;&#x6211;&#x4EEC;&#x7684;&#x8FD9;&#x5957;&#x6784;&#x5EFA;&#x6D41;&#x7A0B;&#x3002;</p>
<h3 id="articleHeader16">Webpack</h3>
<blockquote>&#x56F4;&#x89C2;&#x7FA4;&#x4F17;&#xFF1A;&#x6211;&#x77E5;&#x9053;&#x4E86;&#xFF01;&#x4F60;&#x662F;&#x60F3;&#x8BF4;Gulp&#x5BF9;&#x5427;&#xFF1F;&#xFF01;<p>&#x5582;&#xFF0C;&#x9192;&#x9192;&#xFF01;&#x5927;&#x6E05;&#x4EA1;&#x4E86;&#xFF01;</p>
</blockquote>
<p>&#x5728;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x4EE5;&#x53CA;&#x5DE5;&#x7A0B;&#x5316;&#x5927;&#x884C;&#x5176;&#x9053;&#x7684;&#x4ECA;&#x5929;&#xFF0C;&#x60F3;&#x5FC5;&#x5927;&#x5BB6;&#x5BF9;Webpack&#x3001;Gulp&#x7B49;&#x5DE5;&#x5177;&#x5E76;&#x4E0D;&#x4F1A;&#x611F;&#x5230;&#x964C;&#x751F;&#xFF0C;&#x914D;&#x5408;&#x5B83;&#x4EEC;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5927;&#x578B;&#x524D;&#x7AEF;&#x5E94;&#x7528;&#x7684;&#x6784;&#x5EFA;&#x3001;&#x6253;&#x5305;&#x3001;&#x53D1;&#x5E03;&#x7684;&#x6D41;&#x7A0B;&#x3002;<br>&#x4E0D;&#x8FC7;&#x73B0;&#x5728;&#x662F;2018&#x5E74;&#x4E86;&#xFF0C;&#x4E09;&#x5927;&#x6846;&#x67B6;&#x4E09;&#x8DB3;&#x9F0E;&#x7ACB;&#xFF0C;&#x800C;Gulp&#x5DF2;&#x7ECF;&#x7A0D;&#x663E;&#x8001;&#x6001;&#xFF0C;&#x4F5C;&#x4E3A;&#x5B83;&#x7684;&#x665A;&#x8F88;&#xFF0C;&#x4E00;&#x4E2A;&#x540D;&#x53EB;Webpack&#x7684;&#x5C11;&#x5E74;&#x6B63;&#x5728;&#x9010;&#x6E10;&#x5D1B;&#x8D77;&#x3002;<br>&#x8FD9;&#x4F4D;&#x5C11;&#x5E74;&#xFF0C;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5728;&#x4F7F;&#x7528;Vue&#x3001;React&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x5DF2;&#x7ECF;&#x6216;&#x591A;&#x6216;&#x5C11;&#x63A5;&#x89E6;&#x8FC7;&#x5B83;&#x4E86;&#x3002;&#x7B80;&#x800C;&#x8A00;&#x4E4B;&#xFF0C;&#x5B83;&#x548C;Gulp&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x89D2;&#x8272;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x914D;&#x7F6E;&#x66F4;&#x4E3A;&#x7B80;&#x5355;&#xFF0C;&#x6784;&#x5EFA;&#x66F4;&#x4E3A;&#x9AD8;&#x6548;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;Webpack&#x662F;&#x600E;&#x4E48;&#x4F7F;&#x7528;&#x7684;&#x5427;&#x3002;</p>
<blockquote>&#x5982;&#x679C;&#x4F60;&#x8FD8;&#x6CA1;&#x6709;&#x63A5;&#x89E6;&#x8FC7;Webpack&#xFF0C;&#x90A3;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x6587;&#x6863;&#xFF0C;&#x5148;&#x5BF9;Webpack&#x6709;&#x4E00;&#x4E2A;&#x5927;&#x81F4;&#x7684;&#x8BA4;&#x8BC6;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x4E0D;&#x4F5C;&#x8FC7;&#x591A;&#x4ECB;&#x7ECD;&#xFF0C;&#x53EA;&#x8BB2;&#x89E3;&#x5B83;&#x7684;&#x5B89;&#x88C5;&#x4E0E;&#x914D;&#x7F6E;&#x3002;</blockquote>
<p>As usual&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x5B83;&#xFF1A;</p>
<blockquote>npm i webpack webpack-cli webpack-dev-server -D</blockquote>
<p>&#x4F7F;&#x7528;&#x5B83;&#x4E5F;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x540D;&#x53EB;<code>webpack.config.js</code>&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x5373;&#x53EF;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);

module.exports = {
  // &#x6A21;&#x5F0F;&#x914D;&#x7F6E;
  mode: &apos;development&apos;,
  // &#x5165;&#x53E3;&#x6587;&#x4EF6;
  entry: {},
  // &#x51FA;&#x53E3;&#x6587;&#x4EF6;
  output: {},
  // &#x5BF9;&#x5E94;&#x7684;&#x63D2;&#x4EF6;
  plugins: [],
  // &#x5904;&#x7406;&#x5BF9;&#x5E94;&#x6A21;&#x5757;
  module: {}
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// &#x6A21;&#x5F0F;&#x914D;&#x7F6E;</span>
  mode: <span class="hljs-string">&apos;development&apos;</span>,
  <span class="hljs-comment">// &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  entry: {},
  <span class="hljs-comment">// &#x51FA;&#x53E3;&#x6587;&#x4EF6;</span>
  output: {},
  <span class="hljs-comment">// &#x5BF9;&#x5E94;&#x7684;&#x63D2;&#x4EF6;</span>
  plugins: [],
  <span class="hljs-comment">// &#x5904;&#x7406;&#x5BF9;&#x5E94;&#x6A21;&#x5757;</span>
  <span class="hljs-built_in">module</span>: {}
}</code></pre>
<p>&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x4E3B;&#x8981;&#x90E8;&#x5206;&#x6709;&#xFF1A;&#x5165;&#x53E3;&#x3001;&#x51FA;&#x53E3;&#x3001;&#x63D2;&#x4EF6;&#x3001;&#x6A21;&#x5757;&#xFF0C;&#x5728;&#x5177;&#x4F53;&#x914D;&#x7F6E;&#x5B83;&#x4EEC;&#x4E4B;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5148;&#x7406;&#x4E00;&#x7406;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x7684;&#x6253;&#x5305;&#x6784;&#x5EFA;&#x6D41;&#x7A0B;&#xFF1A;</p>
<ol>
<li>&#x5BFB;&#x627E;&#x5230;<code>./src/es6/</code>&#x76EE;&#x5F55;&#x4E0B;&#x9762;&#x7684;<code>index.js</code>&#x9879;&#x76EE;&#x5165;&#x53E3;&#x6587;&#x4EF6;</li>
<li>&#x4F7F;&#x7528;Babel&#x7F16;&#x8BD1;&#x5B83;&#x53CA;&#x5B83;&#x6240;&#x5F15;&#x7528;&#x7684;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#xFF08;&#x5982;Scss&#x3001;css&#x6587;&#x4EF6;&#x7B49;&#xFF09;</li>
<li>&#x538B;&#x7F29;&#x7F16;&#x8BD1;&#x5B8C;&#x6210;&#x540E;&#x7684;js&#x6587;&#x4EF6;&#xFF0C;&#x914D;&#x7F6E;&#x4E3A;umd&#x89C4;&#x8303;&#xFF0C;&#x91CD;&#x547D;&#x540D;&#x4E3A;<code>csdwheels.min.js</code>
</li>
<li>&#x6E05;&#x7A7A;<code>dist-es6</code>&#x76EE;&#x5F55;</li>
<li>&#x8F93;&#x51FA;&#x81F3;<code>dist-es6</code>&#x76EE;&#x5F55;&#x4E0B;</li>
</ol>
<p>&#x8981;&#x4F7F;&#x7528;&#x6E05;&#x7A7A;&#x76EE;&#x5F55;&#x3001;&#x538B;&#x7F29;&#x4EE3;&#x7801;&#x3001;&#x89E3;&#x6790;css&#x7B49;&#x529F;&#x80FD;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x4E00;&#x4E0B;&#x989D;&#x5916;&#x7684;&#x5305;&#xFF1A;</p>
<blockquote>npm i clean-webpack-plugin uglifyjs-webpack-plugin css-loader style-loader node-sass sass-loader</blockquote>
<p>&#x8981;&#x5728;&#x914D;&#x7F6E;&#x4E2D;&#x8BA9;babel&#x5931;&#x6548;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;<code>.babelrc</code>&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;&#x5176;&#x4E2D;&#x6307;&#x5B9A;&#x7F16;&#x7801;&#x89C4;&#x5219;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;env&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;env&quot;</span>]
}</code></pre>
<p>&#x6700;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x5B8C;&#x6210;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
const UglifyJsPlugin = require(&apos;uglifyjs-webpack-plugin&apos;);
const CleanWebpackPlugin = require(&apos;clean-webpack-plugin&apos;); //&#x6BCF;&#x6B21;&#x6784;&#x5EFA;&#x6E05;&#x7406;dist&#x76EE;&#x5F55;

module.exports = {
  // &#x6A21;&#x5F0F;&#x914D;&#x7F6E;
  mode: &apos;development&apos;,
  // &#x5165;&#x53E3;&#x6587;&#x4EF6;
  entry: {
    pagination: &apos;./src/es6/index.js&apos;
  },
  // &#x51FA;&#x53E3;&#x6587;&#x4EF6;
  output: {
    path: path.resolve(__dirname, &apos;dist-es6&apos;),
    filename: &quot;csdwheels.min.js&quot;,
    libraryTarget: &apos;umd&apos;,
    library: &apos;csdwheels&apos;
  },
  // &#x5BF9;&#x5E94;&#x7684;&#x63D2;&#x4EF6;
  plugins: [
    new CleanWebpackPlugin([&apos;dist-es6&apos;]),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i
    })
  ],
  // &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x914D;&#x7F6E;
  devServer: {},
  // &#x5904;&#x7406;&#x5BF9;&#x5E94;&#x6A21;&#x5757;
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname , &apos;src/es6&apos;),
        exclude: /node_modules/,
        use: [&apos;babel-loader&apos;]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: &apos;style-loader&apos;
        }, {
          loader: &apos;css-loader&apos;
        }, {
          loader: &apos;sass-loader&apos;
        }]
      }
    ]
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;clean-webpack-plugin&apos;</span>); <span class="hljs-comment">//&#x6BCF;&#x6B21;&#x6784;&#x5EFA;&#x6E05;&#x7406;dist&#x76EE;&#x5F55;</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// &#x6A21;&#x5F0F;&#x914D;&#x7F6E;</span>
  mode: <span class="hljs-string">&apos;development&apos;</span>,
  <span class="hljs-comment">// &#x5165;&#x53E3;&#x6587;&#x4EF6;</span>
  entry: {
    <span class="hljs-attr">pagination</span>: <span class="hljs-string">&apos;./src/es6/index.js&apos;</span>
  },
  <span class="hljs-comment">// &#x51FA;&#x53E3;&#x6587;&#x4EF6;</span>
  output: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;dist-es6&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&quot;csdwheels.min.js&quot;</span>,
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">&apos;umd&apos;</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">&apos;csdwheels&apos;</span>
  },
  <span class="hljs-comment">// &#x5BF9;&#x5E94;&#x7684;&#x63D2;&#x4EF6;</span>
  plugins: [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">&apos;dist-es6&apos;</span>]),
    <span class="hljs-keyword">new</span> UglifyJsPlugin({
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js($|\?)/i</span>
    })
  ],
  <span class="hljs-comment">// &#x5F00;&#x53D1;&#x670D;&#x52A1;&#x5668;&#x914D;&#x7F6E;</span>
  devServer: {},
  <span class="hljs-comment">// &#x5904;&#x7406;&#x5BF9;&#x5E94;&#x6A21;&#x5757;</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">include</span>: path.join(__dirname , <span class="hljs-string">&apos;src/es6&apos;</span>),
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">use</span>: [<span class="hljs-string">&apos;babel-loader&apos;</span>]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;style-loader&apos;</span>
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;css-loader&apos;</span>
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;sass-loader&apos;</span>
        }]
      }
    ]
  }
}</code></pre>
<p>&#x5149;&#x914D;&#x7F6E;&#x597D;&#x8FD8;&#x4E0D;&#x591F;&#xFF0C;&#x6211;&#x4EEC;&#x603B;&#x9700;&#x8981;&#x7528;&#x547D;&#x4EE4;&#x6765;&#x8FD0;&#x884C;&#x5B83;&#x5427;&#xFF0C;&#x5728;<code>package.json</code>&#x91CC;&#x914D;&#x7F6E;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;test&quot;: &quot;node test/test.js&quot;,
  &quot;dev&quot;: &quot;webpack-dev-server&quot;,
  &quot;build&quot;: &quot;webpack &amp;&amp; gulp mini &amp;&amp; npm run test&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;node test/test.js&quot;</span>,
  <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server&quot;</span>,
  <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;webpack &amp;&amp; gulp mini &amp;&amp; npm run test&quot;</span>
}</code></pre>
<p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;dev&#x53EF;&#x4EE5;&#x542F;&#x52A8;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;&#x6765;&#x5C55;&#x793A;&#x9879;&#x76EE;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x6682;&#x65F6;&#x4E0D;&#x9700;&#x8981;&#xFF0C;&#x800C;&#x8FD0;&#x884C;<code>npm run build</code>&#x547D;&#x4EE4;&#x5C31;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x5C06;&#x6211;&#x4EEC;&#x7684;<code>./src/es5</code>&#x548C;<code>./src/es6</code>&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6E90;&#x7801;&#x6253;&#x5305;&#x597D;&#x8F93;&#x51FA;&#x5230;&#x6307;&#x5B9A;&#x76EE;&#x5F55;&#x4E86;&#x3002;</p>
<blockquote>&#x4E0D;&#x662F;&#x8BF4;&#x597D;&#x4E0D;&#x7528;Gulp&#x7684;&#x5462;&#xFF1F;&#x561B;&#x3002;&#x3002;&#x9488;&#x5BF9;ES5&#x7684;&#x6253;&#x5305;&#x5DE5;&#x4F5C;&#x6765;&#x8BF4;Gulp&#x8FD8;&#x662F;&#x633A;&#x597D;&#x7528;&#x7684;&#xFF0C;&#x771F;&#x9999;&#x8B66;&#x544A;&#xFF01;</blockquote>
<p>ES6&#x5F00;&#x53D1;&#x6240;&#x9700;&#x8981;&#x7684;&#x73AF;&#x5883;&#x7EC8;&#x4E8E;&#x914D;&#x7F6E;&#x5B8C;&#x6210;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x8BA9;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x4EE3;&#x7801;&#x7684;&#x91CD;&#x6784;&#x5427;&#xFF01;</p>
<h2 id="articleHeader17">ES6-&#x4EE3;&#x7801;&#x91CD;&#x6784;</h2>
<blockquote>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8981;&#x5165;&#x95E8;ES6&#xFF0C;&#x5F3A;&#x70C8;&#x63A8;&#x8350;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;<a href="http://es6.ruanyifeng.com" rel="nofollow noreferrer" target="_blank">&#x6559;&#x7A0B;</a><p>&#x76F8;&#x5173;&#x7684;&#x65B0;&#x8BED;&#x6CD5;&#x548C;&#x7279;&#x6027;&#x8F83;&#x591A;&#xFF0C;&#x4E0D;&#x8FC7;&#x8981;&#x6211;&#x4EEC;&#x7684;&#x9879;&#x76EE;&#x8981;&#x91CD;&#x6784;&#x4E3A;ES6&#x6682;&#x65F6;&#x8FD8;&#x7528;&#x4E0D;&#x4E86;&#x591A;&#x5C11;&#x6BD4;&#x8F83;&#x9AD8;&#x7EA7;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x7740;&#x91CD;&#x770B;&#x5B8C;<code>Class</code>&#x90E8;&#x5206;&#x5373;&#x53EF;&#x3002;</p>
</blockquote>
<p>ES6&#x5F15;&#x5165;&#x7684;&#x65B0;&#x7279;&#x6027;&#x4E2D;&#xFF0C;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x5C31;&#x662F;<code>Class</code>&#x4E86;&#x3002;&#x6709;&#x4E86;&#x5B83;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x50CF;&#x4EE5;&#x524D;&#x90A3;&#x6837;&#x7528;&#x6784;&#x9020;&#x51FD;&#x6570;&#x53BB;&#x6A21;&#x62DF;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;JavaScript&#x539F;&#x751F;&#x652F;&#x6301;&#x7684;&#x4E00;&#x79CD;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#xFF0C;&#x867D;&#x7136;&#x5E95;&#x5C42;&#x4ECD;&#x7136;&#x662F;&#x539F;&#x578B;&#x94FE;&#xFF0C;&#x4E0D;&#x8FC7;&#x81F3;&#x5C11;&#x5199;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x770B;&#x4E0A;&#x53BB;&#x50CF;&#x662F;&#x90A3;&#x4E48;&#x4E00;&#x56DE;&#x4E8B;&#x4E86;&#x3002;</p>
<p>&#x62FF;&#x524D;&#x9762;&#x63D0;&#x5230;&#x7684;&#x63D2;&#x4EF6;&#x6A21;&#x677F;&#x6765;&#x8BF4;&#xFF0C;ES5&#x7684;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x7684;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(root, factory) {
  if (typeof define === &apos;function&apos; &amp;&amp; define.amd) {
    define([], factory);
  } else if (typeof module === &apos;object&apos; &amp;&amp; module.exports) {
    module.exports = factory();
  } else {
    root.Plugin = factory();
  }
}(typeof self !== &apos;undefined&apos; ? self : this, function() {
  &apos;use strict&apos;;

  // tool
  function extend(o, n, override) {
    for (var p in n) {
      if (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
  }

  // plugin construct function
  function Plugin(selector, userOptions) {
    // Plugin() or new Plugin()
    if (!(this instanceof Plugin)) return new Plugin(selector, userOptions);
    this.init(selector, userOptions)
  }
  Plugin.prototype = {
    constructor: Plugin,
    // default option
    options: {},
    init: function(selector, userOptions) {
      extend(this.options, userOptions, true);
    }
  };

  return Plugin;
}));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root, factory</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> define === <span class="hljs-string">&apos;function&apos;</span> &amp;&amp; define.amd) {
    define([], factory);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">module</span> === <span class="hljs-string">&apos;object&apos;</span> &amp;&amp; <span class="hljs-built_in">module</span>.exports) {
    <span class="hljs-built_in">module</span>.exports = factory();
  } <span class="hljs-keyword">else</span> {
    root.Plugin = factory();
  }
}(<span class="hljs-keyword">typeof</span> self !== <span class="hljs-string">&apos;undefined&apos;</span> ? self : <span class="hljs-keyword">this</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
<span class="hljs-meta">  &apos;use strict&apos;</span>;

  <span class="hljs-comment">// tool</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">extend</span>(<span class="hljs-params">o, n, override</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> p <span class="hljs-keyword">in</span> n) {
      <span class="hljs-keyword">if</span> (n.hasOwnProperty(p) &amp;&amp; (!o.hasOwnProperty(p) || override))
        o[p] = n[p];
    }
  }

  <span class="hljs-comment">// plugin construct function</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Plugin</span>(<span class="hljs-params">selector, userOptions</span>) </span>{
    <span class="hljs-comment">// Plugin() or new Plugin()</span>
    <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Plugin)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Plugin(selector, userOptions);
    <span class="hljs-keyword">this</span>.init(selector, userOptions)
  }
  Plugin.prototype = {
    <span class="hljs-attr">constructor</span>: Plugin,
    <span class="hljs-comment">// default option</span>
    options: {},
    <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selector, userOptions</span>) </span>{
      extend(<span class="hljs-keyword">this</span>.options, userOptions, <span class="hljs-literal">true</span>);
    }
  };

  <span class="hljs-keyword">return</span> Plugin;
}));</code></pre>
<p>&#x7ECF;&#x8FC7;<code>Class</code>&#x8FD9;&#x79CD;&#x65B0;&#x8BED;&#x6CD5;&#x7CD6;&#x7684;&#x6539;&#x9020;&#x540E;&#xFF0C;&#x5B83;&#x53D8;&#x6210;&#x4E86;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ES6 &#x63D2;&#x4EF6;&#x6A21;&#x677F;
class Plugin {
  constructor(selector, options = {}) {
    this.options = {};
    Object.assign(this.options, options);
    this.init(selector, options);
  }

  init(selector, options) {}
}
export default Plugin;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ES6 &#x63D2;&#x4EF6;&#x6A21;&#x677F;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Plugin</span> </span>{
  <span class="hljs-keyword">constructor</span>(selector, options = {}) {
    <span class="hljs-keyword">this</span>.options = {};
    <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>.options, options);
    <span class="hljs-keyword">this</span>.init(selector, options);
  }

  init(selector, options) {}
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Plugin;</code></pre>
<p>&#x6539;&#x9020;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x4EC5;&#x5728;&#x8BED;&#x6CD5;&#x5C42;&#x9762;&#x76F4;&#x63A5;&#x652F;&#x6301;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x66F4;&#x662F;&#x53BB;&#x6389;&#x4E86;IIFE&#x8FD9;&#x79CD;&#x81C3;&#x80BF;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x4E0D;&#x7BA1;&#x662F;&#x770B;&#x8D77;&#x6765;&#x8FD8;&#x662F;&#x5199;&#x8D77;&#x6765;&#x90FD;&#x66F4;&#x4E3A;&#x6E05;&#x6670;&#x6D41;&#x7545;&#x4E86;&#x3002;</p>
<blockquote>&#x5229;&#x7528;&#x5185;&#x7F6E;&#x7684;<code>Object.assign()</code>&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x66FF;&#x6362;&#x6389;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x7684;extend&#x51FD;&#x6570;&#xFF0C;&#x529F;&#x80FD;&#x53EF;&#x4EE5;&#x8BF4;&#x5B8C;&#x5168;&#x4E00;&#x6837;&#xFF0C;&#x800C;&#x4E14;&#x66F4;&#x4E3A;&#x5F3A;&#x5927;</blockquote>
<p>&#x6709;&#x4E86;&#x65B0;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x5F00;&#x59CB;&#x63D2;&#x4EF6;&#x4EE3;&#x7801;&#x7684;&#x91CD;&#x6784;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x8D34;&#x4E0A;&#x53D8;&#x52A8;&#x6BD4;&#x8F83;&#x5927;&#x7684;&#x51E0;&#x4E2A;&#x5730;&#x65B9;&#xFF0C;&#x5176;&#x4F59;&#x90E8;&#x5206;&#x53EF;&#x53C2;&#x8003;<a href="https://github.com/csdoker/csdwheels/blob/master/src/es6/pagination/pagination.js" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &apos;../../../style/pagination/pagination.scss&apos;

class Pagination {
  static CLASS_NAME = {
    ITEM: &apos;pagination-item&apos;,
    LINK: &apos;pagination-link&apos;
  }

  static PAGE_INFOS = [{
      id: &quot;first&quot;,
      content: &quot;&#x9996;&#x9875;&quot;
    },
    {
      id: &quot;prev&quot;,
      content: &quot;&#x524D;&#x4E00;&#x9875;&quot;
    },
    {
      id: &quot;next&quot;,
      content: &quot;&#x540E;&#x4E00;&#x9875;&quot;
    },
    {
      id: &quot;last&quot;,
      content: &quot;&#x5C3E;&#x9875;&quot;
    },
    {
      id: &quot;&quot;,
      content: &quot;...&quot;
    }
  ]

  constructor(selector, options = {}) {
    // &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
    this.options = {
      curr: 1,
      pageShow: 2,
      ellipsis: true,
      hash: false
    };
    Object.assign(this.options, options);
    this.init(selector);
  }

  changePage () {
    let pageElement = this.pageElement;
    this.addEvent(pageElement, &quot;click&quot;, (ev) =&gt; {
      let e = ev || window.event;
      let target = e.target || e.srcElement;
      if (target.nodeName.toLocaleLowerCase() == &quot;a&quot;) {
        if (target.id === &quot;prev&quot;) {
          this.prevPage();
        } else if (target.id === &quot;next&quot;) {
          this.nextPage();
        } else if (target.id === &quot;first&quot;) {
          this.firstPage();
        } else if (target.id === &quot;last&quot;) {
          this.lastPage();
        } else if (target.id === &quot;page&quot;) {
          this.goPage(parseInt(target.innerHTML));
        } else {
          return;
        }
        this.renderPages();
        this.options.callback &amp;&amp; this.options.callback({
          curr: this.pageNumber,
          limit: this.options.limit,
          isFirst: false
        });
        this.pageHash();
      }
    });
  }

  init(selector) {
    // &#x5206;&#x9875;&#x5668;&#x5143;&#x7D20;
    this.pageElement = this.$(selector)[0];
    // &#x6570;&#x636E;&#x603B;&#x6570;
    this.dataCount = this.options.count;
    // &#x5F53;&#x524D;&#x9875;&#x7801;
    this.pageNumber = this.options.curr;
    // &#x603B;&#x9875;&#x6570;
    this.pageCount = Math.ceil(this.options.count / this.options.limit);
    // &#x6E32;&#x67D3;
    this.renderPages();
    // &#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;
    this.options.callback &amp;&amp; this.options.callback({
      curr: this.pageNumber,
      limit: this.options.limit,
      isFirst: true
    });
    // &#x6539;&#x53D8;&#x9875;&#x6570;&#x5E76;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;
    this.changePage();
  }
}
export default Pagination;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> <span class="hljs-string">&apos;../../../style/pagination/pagination.scss&apos;</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Pagination</span> </span>{
  <span class="hljs-keyword">static</span> CLASS_NAME = {
    <span class="hljs-attr">ITEM</span>: <span class="hljs-string">&apos;pagination-item&apos;</span>,
    <span class="hljs-attr">LINK</span>: <span class="hljs-string">&apos;pagination-link&apos;</span>
  }

  <span class="hljs-keyword">static</span> PAGE_INFOS = [{
      <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;first&quot;</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x9996;&#x9875;&quot;</span>
    },
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;prev&quot;</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x524D;&#x4E00;&#x9875;&quot;</span>
    },
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;next&quot;</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x540E;&#x4E00;&#x9875;&quot;</span>
    },
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;last&quot;</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;&#x5C3E;&#x9875;&quot;</span>
    },
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">&quot;&quot;</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">&quot;...&quot;</span>
    }
  ]

  <span class="hljs-keyword">constructor</span>(selector, options = {}) {
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;</span>
    <span class="hljs-keyword">this</span>.options = {
      <span class="hljs-attr">curr</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">pageShow</span>: <span class="hljs-number">2</span>,
      <span class="hljs-attr">ellipsis</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">hash</span>: <span class="hljs-literal">false</span>
    };
    <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>.options, options);
    <span class="hljs-keyword">this</span>.init(selector);
  }

  changePage () {
    <span class="hljs-keyword">let</span> pageElement = <span class="hljs-keyword">this</span>.pageElement;
    <span class="hljs-keyword">this</span>.addEvent(pageElement, <span class="hljs-string">&quot;click&quot;</span>, (ev) =&gt; {
      <span class="hljs-keyword">let</span> e = ev || <span class="hljs-built_in">window</span>.event;
      <span class="hljs-keyword">let</span> target = e.target || e.srcElement;
      <span class="hljs-keyword">if</span> (target.nodeName.toLocaleLowerCase() == <span class="hljs-string">&quot;a&quot;</span>) {
        <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;prev&quot;</span>) {
          <span class="hljs-keyword">this</span>.prevPage();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;next&quot;</span>) {
          <span class="hljs-keyword">this</span>.nextPage();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;first&quot;</span>) {
          <span class="hljs-keyword">this</span>.firstPage();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;last&quot;</span>) {
          <span class="hljs-keyword">this</span>.lastPage();
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.id === <span class="hljs-string">&quot;page&quot;</span>) {
          <span class="hljs-keyword">this</span>.goPage(<span class="hljs-built_in">parseInt</span>(target.innerHTML));
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.renderPages();
        <span class="hljs-keyword">this</span>.options.callback &amp;&amp; <span class="hljs-keyword">this</span>.options.callback({
          <span class="hljs-attr">curr</span>: <span class="hljs-keyword">this</span>.pageNumber,
          <span class="hljs-attr">limit</span>: <span class="hljs-keyword">this</span>.options.limit,
          <span class="hljs-attr">isFirst</span>: <span class="hljs-literal">false</span>
        });
        <span class="hljs-keyword">this</span>.pageHash();
      }
    });
  }

  init(selector) {
    <span class="hljs-comment">// &#x5206;&#x9875;&#x5668;&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">this</span>.pageElement = <span class="hljs-keyword">this</span>.$(selector)[<span class="hljs-number">0</span>];
    <span class="hljs-comment">// &#x6570;&#x636E;&#x603B;&#x6570;</span>
    <span class="hljs-keyword">this</span>.dataCount = <span class="hljs-keyword">this</span>.options.count;
    <span class="hljs-comment">// &#x5F53;&#x524D;&#x9875;&#x7801;</span>
    <span class="hljs-keyword">this</span>.pageNumber = <span class="hljs-keyword">this</span>.options.curr;
    <span class="hljs-comment">// &#x603B;&#x9875;&#x6570;</span>
    <span class="hljs-keyword">this</span>.pageCount = <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.options.count / <span class="hljs-keyword">this</span>.options.limit);
    <span class="hljs-comment">// &#x6E32;&#x67D3;</span>
    <span class="hljs-keyword">this</span>.renderPages();
    <span class="hljs-comment">// &#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">this</span>.options.callback &amp;&amp; <span class="hljs-keyword">this</span>.options.callback({
      <span class="hljs-attr">curr</span>: <span class="hljs-keyword">this</span>.pageNumber,
      <span class="hljs-attr">limit</span>: <span class="hljs-keyword">this</span>.options.limit,
      <span class="hljs-attr">isFirst</span>: <span class="hljs-literal">true</span>
    });
    <span class="hljs-comment">// &#x6539;&#x53D8;&#x9875;&#x6570;&#x5E76;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;</span>
    <span class="hljs-keyword">this</span>.changePage();
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Pagination;</code></pre>
<p>&#x603B;&#x7ED3;&#x8D77;&#x6765;&#xFF0C;&#x8FD9;&#x6B21;&#x6539;&#x9020;&#x7528;&#x5230;&#x7684;&#x8BED;&#x6CD5;&#x5C31;&#x8FD9;&#x4E48;&#x51E0;&#x70B9;&#xFF1A;</p>
<ol>
<li>const&#x3001;let&#x66FF;&#x6362;var</li>
<li>&#x7528;constructor&#x5B9E;&#x73B0;&#x6784;&#x9020;&#x51FD;&#x6570;</li>
<li>&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x66FF;&#x6362;function</li>
</ol>
<p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x5728;&#x5B89;&#x88C5;&#x4E86;Sass&#x7684;&#x7F16;&#x8BD1;&#x63D2;&#x4EF6;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x80FD;&#x76F4;&#x63A5;&#x5728;&#x8FD9;&#x4E2A;js&#x6587;&#x4EF6;&#x4E2D;&#x628A;&#x6837;&#x5F0F;import&#x8FDB;&#x6765;&#xFF0C;&#x8FD9;&#x6837;&#x6253;&#x5305;&#x538B;&#x7F29;&#x540E;&#x7684;js&#x4E2D;&#x4E5F;&#x4F1A;&#x5305;&#x542B;&#x8FDB;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#x4EE3;&#x7801;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x989D;&#x5916;&#x518D;&#x5F15;&#x5165;&#x6837;&#x5F0F;&#x6587;&#x4EF6;&#x4E86;&#x3002;<br>&#x6700;&#x540E;&#xFF0C;&#x7531;&#x4E8E;ES6&#x5E76;&#x4E0D;&#x652F;&#x6301;&#x7C7B;&#x7684;&#x9759;&#x6001;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x8FD8;&#x9700;&#x8981;&#x7528;&#x5230;ES7&#x65B0;&#x63D0;&#x6848;&#x7684;<code>static</code>&#x8BED;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5B89;&#x88C5;&#x5BF9;&#x5E94;&#x7684;babel&#x5305;&#xFF1A;</p>
<blockquote>npm i babel-preset-stage-0 -D</blockquote>
<p>&#x5B89;&#x88C5;&#x540E;&#xFF0C;&#x5728;.babelrc&#x6587;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;&#x5B83;&#x5373;&#x53EF;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;env&quot;, &quot;stage-0&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;env&quot;</span>, <span class="hljs-string">&quot;stage-0&quot;</span>]
}</code></pre>
<p>&#x73B0;&#x5728;&#x4E07;&#x4E8B;&#x4FF1;&#x5907;&#xFF0C;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x8FD0;&#x884C;<code>npm run build</code>&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6211;&#x4EEC;&#x6253;&#x5305;&#x5B8C;&#x6210;&#x540E;&#x7684;<code>csdwheels.min.js</code>&#x6587;&#x4EF6;&#x4E86;&#x3002;</p>
<p>&#x6253;&#x5305;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x53D1;&#x5E03;&#x8FD9;&#x4E2A;npm&#x5305;&#xFF0C;&#x8FD0;&#x884C;&#x5982;&#x4E0B;&#x547D;&#x4EE4;&#x5373;&#x53EF;&#xFF1A;&#xFF08;&#x6709;&#x5173;npm&#x7684;&#x53D1;&#x5E03;&#x6D41;&#x7A0B;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x5570;&#x55E6;&#x4E86;&#xFF09;</p>
<blockquote>npm login<p>npm publish</p>
</blockquote>
<p>&#x8981;&#x4F7F;&#x7528;&#x53D1;&#x5E03;&#x540E;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x8FD9;&#x4E2A;npm&#x5305;&#xFF0C;&#x5E76;<code>import</code>&#x5BF9;&#x5E94;&#x7684;&#x63D2;&#x4EF6;&#xFF1A;</p>
<blockquote>npm i csdwheels -D</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Pagination } from &apos;csdwheels&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { Pagination } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;csdwheels&apos;</span>;</code></pre>
<h1 id="articleHeader18">&#x66F4;&#x65B0;&#xFF08;2018-08-01&#xFF09;</h1>
<h2 id="articleHeader19">Vue&#x63D2;&#x4EF6;&#x7248;&#x672C;</h2>
<p>&#x6309;&#x7167;&#x539F;&#x5B9A;&#x5F00;&#x53D1;&#x8BA1;&#x5212;&#xFF0C;&#x5176;&#x5B9E;&#x662F;&#x4E0D;&#x60F3;&#x9A6C;&#x4E0A;&#x66F4;&#x65B0;Vue&#x7248;&#x672C;&#x7684;&#xFF0C;&#x6BD5;&#x7ADF;&#x8FD9;&#x4E2A;&#x7CFB;&#x5217;&#x7684;&#x201C;&#x5356;&#x70B9;&#x201D;&#x662F;&#x539F;&#x751F;&#x5F00;&#x53D1;&#xFF0C;&#x4E0D;&#x8FC7;&#x6700;&#x8FD1;&#x7528;Vue&#x505A;&#x7684;&#x9879;&#x76EE;&#x548C;&#x81EA;&#x5DF1;&#x7684;&#x535A;&#x5BA2;&#x90FD;&#x6070;&#x597D;&#x7528;&#x5230;&#x4E86;&#x5206;&#x9875;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x51B3;&#x5B9A;&#x4E00;&#x9F13;&#x4F5C;&#x6C14;&#x628A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;Vue&#x7248;&#x672C;&#x5199;&#x51FA;&#x6765;&#xFF0C;&#x6B63;&#x597D;&#x4E5F;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x673A;&#x4F1A;&#x5B66;&#x5B66;Vue&#x63D2;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#x3002;</p>
<h3 id="articleHeader20">&#x5F00;&#x53D1;&#x89C4;&#x8303;</h3>
<p>&#x65E2;&#x7136;&#x662F;&#x6846;&#x67B6;&#xFF0C;&#x90A3;&#x80AF;&#x5B9A;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x5F00;&#x53D1;&#x89C4;&#x8303;&#x4E86;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x63D2;&#x4EF6;&#x4E00;&#x6837;&#xFF0C;&#x5B83;&#x4E5F;&#x4F1A;&#x7ED9;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x5404;&#x5F0F;&#x5404;&#x6837;&#x7684;API&#x63A5;&#x53E3;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x80FD;&#x5B9A;&#x5236;&#x81EA;&#x5DF1;&#x7684;&#x63D2;&#x4EF6;&#x6A21;&#x5757;&#x3002;<br>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x63D2;&#x4EF6;&#x5728;Vue&#x4E2D;&#x9700;&#x8981;&#x6302;&#x8F7D;&#x5230;&#x5168;&#x5C40;&#x4E0A;&#xFF0C;&#x8FD9;&#x6837;&#x624D;&#x80FD;&#x76F4;&#x63A5;&#x5728;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x5F15;&#x5165;&#x63D2;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Pagination from &apos;./components/vue-wheels-pagination&apos;

const VueWheelsPagination = {
  install (Vue, options) {
    Vue.component(Pagination.name, Pagination)
  }
}

if (typeof window !== &apos;undefined&apos; &amp;&amp; window.Vue) {
  window.Vue.use(VueWheelsPagination)
}

export { VueWheelsPagination }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Pagination <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/vue-wheels-pagination&apos;</span>

<span class="hljs-keyword">const</span> VueWheelsPagination = {
  install (Vue, options) {
    Vue.component(Pagination.name, Pagination)
  }
}

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  <span class="hljs-built_in">window</span>.Vue.use(VueWheelsPagination)
}

<span class="hljs-keyword">export</span> { VueWheelsPagination }</code></pre>
<p><code>vue-wheels-pagination</code>&#x662F;&#x6211;&#x4EEC;&#x5373;&#x5C06;&#x8981;&#x5F00;&#x53D1;&#x7684;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#xFF0C;&#x5F15;&#x5165;&#x540E;&#x901A;&#x8FC7;<code>install</code>&#x65B9;&#x6CD5;&#x628A;&#x5B83;&#x6302;&#x8F7D;&#x4E0A;&#x53BB;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5916;&#x90E8;&#x5C31;&#x53EF;&#x4EE5;<code>use</code>&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x4E86;&#xFF0C;&#x6700;&#x540E;&#x5BFC;&#x51FA;&#x8FD9;&#x4E2A;&#x6302;&#x8F7D;&#x4E86;&#x6211;&#x4EEC;&#x63D2;&#x4EF6;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#xFF08;&#x5982;&#x679C;&#x68C0;&#x6D4B;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x540E;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6302;&#x8F7D;&#x5B83;&#xFF09;<br>&#x8FD9;&#x5DEE;&#x4E0D;&#x591A;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x63D2;&#x4EF6;&#x6A21;&#x677F;&#x4E86;&#xFF0C;&#x66F4;&#x8BE6;&#x7EC6;&#x7684;&#x914D;&#x7F6E;&#x53EF;&#x53C2;&#x8003;<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x3002;</p>
<p>&#x5C06;&#x8FD9;&#x4E2A;&#x5165;&#x53E3;&#x7528;<code>Webpack</code>&#x6253;&#x5305;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x4F60;Vue&#x9879;&#x76EE;&#x4E2D;&#x7684;<code>main.js</code>&#x4E2D;&#x5168;&#x5C40;&#x52A0;&#x8F7D;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { VueWheelsPagination } from &apos;vue-wheels&apos;
Vue.use(VueWheelsPagination)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { VueWheelsPagination } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-wheels&apos;</span>
Vue.use(VueWheelsPagination)</code></pre>
<p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x5C31;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x7528;Vue&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x600E;&#x4E48;&#x5B8C;&#x6210;&#x8FD9;&#x4E2A;&#x5206;&#x9875;&#x63D2;&#x4EF6;&#x7684;&#x5427;&#xFF01;</p>
<h3 id="articleHeader21">DOM&#x6E32;&#x67D3;</h3>
<p>&#x5229;&#x7528;&#x73B0;&#x4EE3;<code>MVVM</code>&#x6846;&#x67B6;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x4E0D;&#x5FC5;&#x518D;&#x7528;&#x539F;&#x751F;JS&#x7684;API&#x53BB;&#x76F4;&#x63A5;&#x64CD;&#x4F5C;DOM&#x4E86;&#xFF0C;&#x53D6;&#x800C;&#x4EE3;&#x4E4B;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;DOM&#x7ED3;&#x6784;&#x4E0A;&#x5229;&#x7528;&#x6846;&#x67B6;&#x63D0;&#x4F9B;&#x7684;API&#x95F4;&#x63A5;&#x8FDB;&#x884C;DOM&#x7684;&#x6E32;&#x67D3;&#x53CA;&#x4EA4;&#x4E92;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template lang=&quot;html&quot;&gt;
  &lt;nav class=&quot;pagination&quot;&gt;
    &lt;a href=&quot;javascript:;&quot; class=&quot;pagination-item first&quot; @click=&quot;goFirst()&quot; v-if=&quot;pageNumber &gt; 1&quot;&gt;{{info.firstInfo}}&lt;/a&gt;
    &lt;a href=&quot;javascript:;&quot; class=&quot;pagination-item prev&quot; @click=&quot;goPrev()&quot; v-if=&quot;pageNumber &gt; 1&quot;&gt;{{info.prevInfo}}&lt;/a&gt;
    &lt;ul class=&quot;pagination-list&quot; v-if=&quot;ellipsis&quot;&gt;
      &lt;li class=&quot;pagination-item&quot; @click=&quot;goFirst()&quot; v-if=&quot;pageNumber &gt; 1&quot;&gt;1&lt;/li&gt;
      &lt;li class=&quot;pagination-item ellipsis&quot; v-if=&quot;pageNumber - (max + 1) &gt; 1&quot;&gt;...&lt;/li&gt;
      &lt;li class=&quot;pagination-item&quot;
          @click=&quot;goPage(pageNumber - pageIndex)&quot;
          v-if=&quot;pageNumber - pageIndex &gt; 1&quot;
          v-for=&quot;pageIndex in rPageData&quot;
          :key=&quot;pageNumber - pageIndex&quot;&gt;
        {{pageNumber - pageIndex}}
      &lt;/li&gt;
      &lt;li class=&quot;pagination-item current&quot; @click=&quot;goPage(pageNumber)&quot;&gt;{{pageNumber}}&lt;/li&gt;
      &lt;li class=&quot;pagination-item&quot;
          @click=&quot;goPage(pageNumber + pageIndex)&quot;
          v-if=&quot;pageNumber + pageIndex &lt; pageCount&quot;
          v-for=&quot;pageIndex in pageData&quot;
          :key=&quot;pageNumber + pageIndex&quot;&gt;
        {{pageNumber + pageIndex}}
      &lt;/li&gt;
      &lt;li class=&quot;pagination-item ellipsis&quot; v-if=&quot;pageNumber + max + 1 &lt; pageCount&quot;&gt;...&lt;/li&gt;
      &lt;li class=&quot;pagination-item&quot; @click=&quot;goLast()&quot; v-if=&quot;pageNumber &lt; pageCount&quot;&gt;{{pageCount}}&lt;/li&gt;
    &lt;/ul&gt;
    &lt;ul class=&quot;pagination-list&quot; v-if=&quot;!ellipsis&quot;&gt;
      &lt;li :class=&quot;pageIndex === pageNumber ? &apos;pagination-item current&apos; : &apos;pagination-item&apos;&quot;
          @click=&quot;goPage(pageIndex)&quot;
          v-for=&quot;pageIndex in pageDataFront&quot;
          v-if=&quot;pageNumber &lt; max + 1&quot;
          :key=&quot;pageIndex&quot;&gt;
        {{pageIndex}}
      &lt;/li&gt;
      &lt;li :class=&quot;pageIndex === pageNumber ? &apos;pagination-item current&apos; : &apos;pagination-item&apos;&quot;
          @click=&quot;goPage(pageIndex)&quot;
          v-for=&quot;pageIndex in pageDataCenter&quot;
          v-if=&quot;pageNumber &gt; pageCount - max&quot;
          :key=&quot;pageIndex&quot;&gt;
        {{pageIndex}}
      &lt;/li&gt;
      &lt;li :class=&quot;pageIndex === pageNumber ? &apos;pagination-item current&apos; : &apos;pagination-item&apos;&quot;
          @click=&quot;goPage(pageIndex)&quot;
          v-for=&quot;pageIndex in pageDataBehind&quot;
          v-if=&quot;max + 1 &lt;= pageNumber &amp;&amp; pageNumber &lt;= pageCount - max&quot;
          :key=&quot;pageIndex&quot;&gt;
        {{pageIndex}}
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;a href=&quot;javascript:;&quot; class=&quot;pagination-item next&quot; @click=&quot;goNext()&quot; v-if=&quot;pageNumber &lt; pageCount&quot;&gt;{{info.nextInfo}}&lt;/a&gt;
    &lt;a href=&quot;javascript:;&quot; class=&quot;pagination-item last&quot; @click=&quot;goLast()&quot; v-if=&quot;pageNumber &lt; pageCount&quot;&gt;{{info.lastInfo}}&lt;/a&gt;
  &lt;/nav&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;html&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item first&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goFirst()&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &gt; 1&quot;</span>&gt;</span>"{{"info.firstInfo"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item prev&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goPrev()&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &gt; 1&quot;</span>&gt;</span>"{{"info.prevInfo"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-list&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;ellipsis&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goFirst()&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &gt; 1&quot;</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item ellipsis&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber - (max + 1) &gt; 1&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item&quot;</span>
          @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goPage(pageNumber - pageIndex)&quot;</span>
          <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber - pageIndex &gt; 1&quot;</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;pageIndex in rPageData&quot;</span>
          <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;pageNumber - pageIndex&quot;</span>&gt;</span>
        {{pageNumber - pageIndex}}
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item current&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goPage(pageNumber)&quot;</span>&gt;</span>"{{"pageNumber"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item&quot;</span>
          @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goPage(pageNumber + pageIndex)&quot;</span>
          <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber + pageIndex &lt; pageCount&quot;</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;pageIndex in pageData&quot;</span>
          <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;pageNumber + pageIndex&quot;</span>&gt;</span>
        {{pageNumber + pageIndex}}
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item ellipsis&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber + max + 1 &lt; pageCount&quot;</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goLast()&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &lt; pageCount&quot;</span>&gt;</span>"{{"pageCount"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-list&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;!ellipsis&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;pageIndex === pageNumber ? &apos;pagination-item current&apos; : &apos;pagination-item&apos;&quot;</span>
          @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goPage(pageIndex)&quot;</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;pageIndex in pageDataFront&quot;</span>
          <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &lt; max + 1&quot;</span>
          <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;pageIndex&quot;</span>&gt;</span>
        {{pageIndex}}
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;pageIndex === pageNumber ? &apos;pagination-item current&apos; : &apos;pagination-item&apos;&quot;</span>
          @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goPage(pageIndex)&quot;</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;pageIndex in pageDataCenter&quot;</span>
          <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &gt; pageCount - max&quot;</span>
          <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;pageIndex&quot;</span>&gt;</span>
        {{pageIndex}}
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;pageIndex === pageNumber ? &apos;pagination-item current&apos; : &apos;pagination-item&apos;&quot;</span>
          @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goPage(pageIndex)&quot;</span>
          <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;pageIndex in pageDataBehind&quot;</span>
          <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;max + 1 &lt;= pageNumber &amp;&amp; pageNumber &lt;= pageCount - max&quot;</span>
          <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;pageIndex&quot;</span>&gt;</span>
        {{pageIndex}}
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item next&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goNext()&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &lt; pageCount&quot;</span>&gt;</span>"{{"info.nextInfo"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pagination-item last&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;goLast()&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;pageNumber &lt; pageCount&quot;</span>&gt;</span>"{{"info.lastInfo"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>&#x5982;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x5728;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x7684;<code>template</code>&#x6807;&#x7B7E;&#x4E2D;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x5927;&#x90E8;&#x5206;&#x7684;&#x6E32;&#x67D3;&#x903B;&#x8F91;&#x3002;&#x76F8;&#x5BF9;&#x539F;&#x751F;JS&#x5B9E;&#x73B0;&#x7684;&#x7248;&#x672C;&#xFF0C;&#x4E0D;&#x4EC5;&#x8F7B;&#x677E;&#x7701;&#x53BB;&#x4E86;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x3001;DOM&#x64CD;&#x4F5C;&#x7B49;&#x6B65;&#x9AA4;&#xFF0C;&#x800C;&#x4E14;&#x8BA9;&#x6211;&#x4EEC;&#x80FD;&#x53EA;&#x5173;&#x6CE8;&#x63D2;&#x4EF6;&#x672C;&#x8EAB;&#x5177;&#x4F53;&#x7684;&#x4EA4;&#x4E92;&#x903B;&#x8F91;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x5927;&#x5927;&#x51CF;&#x8F7B;&#x4E86;&#x5F00;&#x53D1;&#x96BE;&#x5EA6;&#xFF0C;&#x5E76;&#x63D0;&#x5347;&#x4E86;&#x9875;&#x9762;&#x6027;&#x80FD;&#x3002;&#x5269;&#x4E0B;&#x7684;&#x6570;&#x636E;&#x90E8;&#x5206;&#x7684;&#x903B;&#x8F91;&#x53CA;&#x4EA4;&#x4E92;&#x5904;&#x7406;&#xFF0C;&#x5728;JS&#x4E2D;&#x5B8C;&#x6210;&#x5373;&#x53EF;&#x3002;</p>
<h3 id="articleHeader22">&#x4EA4;&#x4E92;&#x903B;&#x8F91;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  name: &apos;VueWheelsPagination&apos;,
  props: {
    count: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    curr: {
      type: Number,
      required: false,
      default: 1
    },
    max: {
      type: Number,
      required: false,
      default: 2
    },
    ellipsis: {
      type: Boolean,
      required: false,
      default: true
    },
    info: {
      type: Object,
      required: false,
      default: {
        firstInfo: &apos;&#x9996;&#x9875;&apos;,
        prevInfo: &apos;&#x524D;&#x4E00;&#x9875;&apos;,
        nextInfo: &apos;&#x540E;&#x4E00;&#x9875;&apos;,
        lastInfo: &apos;&#x5C3E;&#x9875;&apos;
      }
    }
  },
  data () {
    return {
      pageNumber: this.curr
    }
  },
  watch: {
    curr (newVal) {
      this.pageNumber = newVal
    }
  },
  computed: {
    pageData () {
      let pageData = []
      for (let index = 1; index &lt;= this.max; index++) {
        pageData.push(index)
      }
      return pageData
    },
    rPageData () {
      return this.pageData.slice(0).reverse()
    },
    pageDataFront () {
      let pageDataFront = []
      for (let index = 1; index &lt;= this.max * 2 + 1; index++) {
        pageDataFront.push(index)
      }
      return pageDataFront
    },
    pageDataCenter () {
      let pageDataCenter = []
      for (let index = this.pageCount - this.max * 2; index &lt;= this.pageCount; index++) {
        pageDataCenter.push(index)
      }
      return pageDataCenter
    },
    pageDataBehind () {
      let pageDataBehind = []
      for (let index = this.pageNumber - this.max; index &lt;= this.pageNumber + this.max; index++) {
        pageDataBehind.push(index)
      }
      return pageDataBehind
    },
    pageCount () {
      return Math.ceil(this.count / this.limit)
    }
  },
  methods: {
    goFirst () {
      this.pageNumber = 1
      this.$emit(&apos;pageChange&apos;, 1)
    },
    goPrev () {
      this.pageNumber--
      this.$emit(&apos;pageChange&apos;, this.pageNumber)
    },
    goPage (pageNumber) {
      this.pageNumber = pageNumber
      this.$emit(&apos;pageChange&apos;, this.pageNumber)
    },
    goNext () {
      this.pageNumber++
      this.$emit(&apos;pageChange&apos;, this.pageNumber)
    },
    goLast () {
      this.pageNumber = this.pageCount
      this.$emit(&apos;pageChange&apos;, this.pageNumber)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;VueWheelsPagination&apos;</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">count</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">limit</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">curr</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">1</span>
    },
    <span class="hljs-attr">max</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">2</span>
    },
    <span class="hljs-attr">ellipsis</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Boolean</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">info</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">default</span>: {
        <span class="hljs-attr">firstInfo</span>: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>,
        <span class="hljs-attr">prevInfo</span>: <span class="hljs-string">&apos;&#x524D;&#x4E00;&#x9875;&apos;</span>,
        <span class="hljs-attr">nextInfo</span>: <span class="hljs-string">&apos;&#x540E;&#x4E00;&#x9875;&apos;</span>,
        <span class="hljs-attr">lastInfo</span>: <span class="hljs-string">&apos;&#x5C3E;&#x9875;&apos;</span>
      }
    }
  },
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">pageNumber</span>: <span class="hljs-keyword">this</span>.curr
    }
  },
  <span class="hljs-attr">watch</span>: {
    curr (newVal) {
      <span class="hljs-keyword">this</span>.pageNumber = newVal
    }
  },
  <span class="hljs-attr">computed</span>: {
    pageData () {
      <span class="hljs-keyword">let</span> pageData = []
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">1</span>; index &lt;= <span class="hljs-keyword">this</span>.max; index++) {
        pageData.push(index)
      }
      <span class="hljs-keyword">return</span> pageData
    },
    rPageData () {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.pageData.slice(<span class="hljs-number">0</span>).reverse()
    },
    pageDataFront () {
      <span class="hljs-keyword">let</span> pageDataFront = []
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">1</span>; index &lt;= <span class="hljs-keyword">this</span>.max * <span class="hljs-number">2</span> + <span class="hljs-number">1</span>; index++) {
        pageDataFront.push(index)
      }
      <span class="hljs-keyword">return</span> pageDataFront
    },
    pageDataCenter () {
      <span class="hljs-keyword">let</span> pageDataCenter = []
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.pageCount - <span class="hljs-keyword">this</span>.max * <span class="hljs-number">2</span>; index &lt;= <span class="hljs-keyword">this</span>.pageCount; index++) {
        pageDataCenter.push(index)
      }
      <span class="hljs-keyword">return</span> pageDataCenter
    },
    pageDataBehind () {
      <span class="hljs-keyword">let</span> pageDataBehind = []
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.pageNumber - <span class="hljs-keyword">this</span>.max; index &lt;= <span class="hljs-keyword">this</span>.pageNumber + <span class="hljs-keyword">this</span>.max; index++) {
        pageDataBehind.push(index)
      }
      <span class="hljs-keyword">return</span> pageDataBehind
    },
    pageCount () {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.ceil(<span class="hljs-keyword">this</span>.count / <span class="hljs-keyword">this</span>.limit)
    }
  },
  <span class="hljs-attr">methods</span>: {
    goFirst () {
      <span class="hljs-keyword">this</span>.pageNumber = <span class="hljs-number">1</span>
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;pageChange&apos;</span>, <span class="hljs-number">1</span>)
    },
    goPrev () {
      <span class="hljs-keyword">this</span>.pageNumber--
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;pageChange&apos;</span>, <span class="hljs-keyword">this</span>.pageNumber)
    },
    goPage (pageNumber) {
      <span class="hljs-keyword">this</span>.pageNumber = pageNumber
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;pageChange&apos;</span>, <span class="hljs-keyword">this</span>.pageNumber)
    },
    goNext () {
      <span class="hljs-keyword">this</span>.pageNumber++
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;pageChange&apos;</span>, <span class="hljs-keyword">this</span>.pageNumber)
    },
    goLast () {
      <span class="hljs-keyword">this</span>.pageNumber = <span class="hljs-keyword">this</span>.pageCount
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;pageChange&apos;</span>, <span class="hljs-keyword">this</span>.pageNumber)
    }
  }
}</code></pre>
<p>&#x603B;&#x4F53;&#x5206;&#x6210;&#x51E0;&#x4E2A;&#x90E8;&#x5206;&#xFF1A;</p>
<ol>
<li>props&#x5C5E;&#x6027;&#x4E2D;&#x5BF9;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x7C7B;&#x578B;&#x3001;&#x9ED8;&#x8BA4;&#x503C;&#x3001;&#x662F;&#x5426;&#x5FC5;&#x586B;&#x7B49;&#x914D;&#x7F6E;&#x7684;&#x5B9A;&#x4E49;</li>
<li>&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;&#x5BF9;&#x5206;&#x9875;&#x5668;&#x672C;&#x8EAB;&#x6240;&#x9700;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;</li>
<li>&#x5B9A;&#x4E49;&#x64CD;&#x4F5C;&#x9875;&#x7801;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x5F53;&#x524D;&#x9875;&#x7801;</li>
<li>&#x5728;watch&#x5C5E;&#x6027;&#x4E2D;&#x76D1;&#x542C;&#x9875;&#x7801;&#x7684;&#x53D8;&#x5316;&#xFF08;&#x4E3B;&#x8981;&#x5E94;&#x7528;&#x4E8E;&#x4E0D;&#x901A;&#x8FC7;&#x5206;&#x9875;&#x800C;&#x5728;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x6539;&#x53D8;&#x9875;&#x7801;&#x7684;&#x60C5;&#x51B5;&#xFF09;</li>
</ol>
<p>&#x8FD9;&#x6837;&#xFF0C;&#x6574;&#x4E2A;&#x5206;&#x9875;&#x63D2;&#x4EF6;&#x7684;&#x5F00;&#x53D1;&#x5C31;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#x3002;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x611F;&#x89C9;&#x5F97;&#x5230;&#xFF0C;&#x5173;&#x4E8E;&#x5206;&#x9875;&#x903B;&#x8F91;&#x90E8;&#x5206;&#x7684;&#x4EE3;&#x7801;&#x91CF;&#x662F;&#x660E;&#x663E;&#x51CF;&#x5C11;&#x4E86;&#x4E0D;&#x5C11;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x63D2;&#x4EF6;&#x672C;&#x8EAB;&#x7684;&#x903B;&#x8F91;&#x4E5F;&#x66F4;&#x6E05;&#x6670;&#xFF0C;&#x548C;&#x6211;&#x4EEC;&#x524D;&#x9762;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x4ECE;&#x5E95;&#x5C42;&#x5B9E;&#x73B0;&#x8D77;&#x6765;&#x7684;&#x7248;&#x672C;&#x6BD4;&#x8F83;&#x8D77;&#x6765;&#xFF0C;&#x66F4;&#x6613;&#x62D3;&#x5C55;&#x548C;&#x7EF4;&#x62A4;&#x4E86;&#x3002;</p>
<p>&#x5728;&#x5916;&#x5C42;&#x7684;&#x7EC4;&#x4EF6;&#x4E0A;&#x8C03;&#x7528;&#x8D77;&#x6765;&#x5927;&#x6982;&#x5C31;&#x50CF;&#x8FD9;&#x6837;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;div class=&quot;main&quot;&gt;
      &lt;vue-wheels-pagination @pageChange=&quot;change&quot; :count=&quot;count&quot; :limit=&quot;limit&quot; :info=&quot;info&quot;&gt;&lt;/vue-wheels-pagination&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">vue-wheels-pagination</span> @<span class="hljs-attr">pageChange</span>=<span class="hljs-string">&quot;change&quot;</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count&quot;</span> <span class="hljs-attr">:limit</span>=<span class="hljs-string">&quot;limit&quot;</span> <span class="hljs-attr">:info</span>=<span class="hljs-string">&quot;info&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-wheels-pagination</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  name: &apos;app&apos;,
  data () {
    return {
      count: 162,
      limit: 5,
      info: {
        firstInfo: &apos;&lt;&lt;&apos;,
        prevInfo: &apos;&lt;&apos;,
        nextInfo: &apos;&gt;&apos;,
        lastInfo: &apos;&gt;&gt;&apos;
      }
    }
  },
  methods: {
    change (pageNumber) {
      console.log(pageNumber)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;app&apos;</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">count</span>: <span class="hljs-number">162</span>,
      <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span>,
      <span class="hljs-attr">info</span>: {
        <span class="hljs-attr">firstInfo</span>: <span class="hljs-string">&apos;&lt;&lt;&apos;</span>,
        <span class="hljs-attr">prevInfo</span>: <span class="hljs-string">&apos;&lt;&apos;</span>,
        <span class="hljs-attr">nextInfo</span>: <span class="hljs-string">&apos;&gt;&apos;</span>,
        <span class="hljs-attr">lastInfo</span>: <span class="hljs-string">&apos;&gt;&gt;&apos;</span>
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    change (pageNumber) {
      <span class="hljs-built_in">console</span>.log(pageNumber)
    }
  }
}</code></pre>
<p>&#x4F20;&#x5165;&#x5FC5;&#x586B;&#x548C;&#x9009;&#x586B;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x518D;&#x76D1;&#x542C;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x5192;&#x6CE1;&#x56DE;&#x6765;&#x7684;&#x9875;&#x7801;&#x503C;&#xFF0C;&#x6700;&#x540E;&#x5728;&#x4F60;&#x81EA;&#x5DF1;&#x5B9A;&#x4E49;&#x7684;<code>change()</code>&#x65B9;&#x6CD5;&#x91CC;&#x8FDB;&#x884C;&#x8DF3;&#x8F6C;&#x7B49;&#x5BF9;&#x5E94;&#x7684;&#x903B;&#x8F91;&#x5904;&#x7406;&#x5C31;&#x884C;&#x4E86;&#x3002;</p>
<p>&#x9879;&#x76EE;&#x7684;&#x6253;&#x5305;&#x6D41;&#x7A0B;&#x548C;&#x4E0A;&#x4E00;&#x8282;&#x63D0;&#x5230;&#x7684;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x5728;&#x914D;&#x7F6E;&#x4E0A;&#x989D;&#x5916;&#x589E;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x672C;&#x5730;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x670D;&#x52A1;&#x5668;&#x7684;&#x542F;&#x52A8;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x7684;<a href="https://github.com/csdoker/vue-wheels/blob/master/webpack.config.js" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a>&#x3002;&#x6253;&#x5305;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x53D1;&#x5E03;&#x4E00;&#x4E2A;npm&#x5305;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55;Vue&#x9879;&#x76EE;&#x4E2D;&#x5F15;&#x5165;&#x5E76;&#x4F7F;&#x7528;&#x4E86;&#x3002;</p>
<blockquote>&#x540E;&#x9762;&#x5F00;&#x53D1;&#x7684;&#x8F6E;&#x5B50;&#x4E0D;&#x4E00;&#x5B9A;&#x90FD;&#x4F1A;&#x53D1;&#x5E03;Vue&#x7248;&#x672C;&#xFF0C;&#x56E0;&#x4E3A;&#x5DF2;&#x7ECF;&#x7ED9;&#x5927;&#x5BB6;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x91CD;&#x6784;&#x548C;&#x5305;&#x88C5;&#x63D2;&#x4EF6;&#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x53EF;&#x81EA;&#x884C;&#x5229;&#x7528;&#x6846;&#x67B6;&#x7684;&#x89C4;&#x8303;&#x8FDB;&#x884C;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x3002;</blockquote>
<p>&#x5230;&#x6B62;&#x4E3A;&#x6B62;&#xFF0C;&#x6211;&#x4EEC;&#x7B2C;&#x4E00;&#x4E2A;&#x8F6E;&#x5B50;&#x7684;&#x5F00;&#x53D1;&#x5C31;&#x7B97;&#x771F;&#x6B63;&#x7ED3;&#x675F;&#x4E86;&#xFF0C;&#x6240;&#x6709;&#x6E90;&#x7801;&#x5DF2;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#x5230;<code>github</code>&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x53D1;&#x73B0;&#x6709;bug&#x6216;&#x5176;&#x4ED6;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x56DE;&#x590D;&#x5728;&#x9879;&#x76EE;&#x7684;<code>issue</code>&#x4E2D;&#xFF0C;&#x54B1;&#x4EEC;&#x540E;&#x4F1A;&#x6709;&#x671F;&#xFF01;&#xFF08;&#x6316;&#x5751;&#x4E0D;&#x586B;&#xFF0C;&#x9003;&#x3002;&#x3002;</p>
<p>To be continued...</p>
<h1 id="articleHeader23">&#x53C2;&#x8003;&#x5185;&#x5BB9;</h1>
<ul>
<li><a href="https://blog.iihaiku.com/2016/11/23/basic-review-from-anonymous-function-to-iife" rel="nofollow noreferrer" target="_blank">&#x7531;&#x533F;&#x540D;&#x51FD;&#x6570;&#x5C55;&#x5F00;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x77E5;&#x8BC6;&#x70B9;</a></li>
<li><a href="https://ltaoo.github.io/2016/08/07/immediately-invoked-function-expression" rel="nofollow noreferrer" target="_blank">&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;(IIFE)</a></li>
<li><a href="https://github.com/umdjs/umd" rel="nofollow noreferrer" target="_blank">UMD (Universal Module Definition)</a></li>
<li><a href="http://geocld.github.io/2016/03/10/javascript_plugin" rel="nofollow noreferrer" target="_blank">&#x539F;&#x751F;JavaScript&#x63D2;&#x4EF6;&#x7F16;&#x5199;&#x6307;&#x5357;</a></li>
<li><a href="https://www.jianshu.com/p/e65c246beac1" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x9AD8;&#x903C;&#x683C;&#x7684;&#x539F;&#x751F;JS&#x63D2;&#x4EF6;</a></li>
<li><a href="http://f2e.souche.com/blog/ru-he-xie-ge-jian-dan-de-fen-ye" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x5199;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5206;&#x9875;</a></li>
<li><a href="http://www.cnblogs.com/liyunhua/p/4529086.html" rel="nofollow noreferrer" target="_blank">&#x6211;&#x603B;&#x7ED3;&#x7684;js&#x6027;&#x80FD;&#x4F18;&#x5316;&#x7684;&#x5C0F;&#x77E5;&#x8BC6;</a></li>
<li><a href="https://www.webpackjs.com/guides/getting-started" rel="nofollow noreferrer" target="_blank">&#x8D77;&#x6B65; | webpack &#x4E2D;&#x6587;&#x7F51;</a></li>
<li><a href="https://segmentfault.com/a/1190000013512471">webpack &#x9879;&#x76EE;&#x6784;&#x5EFA;&#xFF1A;&#xFF08;&#x4E00;&#xFF09;&#x57FA;&#x672C;&#x67B6;&#x6784;&#x642D;&#x5EFA;</a></li>
<li><a href="https://segmentfault.com/a/1190000013542132" target="_blank">webpack &#x9879;&#x76EE;&#x6784;&#x5EFA;&#xFF1A;&#xFF08;&#x4E8C;&#xFF09;ES6 &#x7F16;&#x8BD1;&#x73AF;&#x5883;&#x642D;&#x5EFA;</a></li>
<li><a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">Vue-Guide-&#x63D2;&#x4EF6;</a></li>
<li><a href="https://www.cnblogs.com/shapeY/p/7875930.html" rel="nofollow noreferrer" target="_blank">&#x7B2C;&#x4E00;&#x4E2A;Vue&#x63D2;&#x4EF6;&#x4ECE;&#x5C01;&#x88C5;&#x5230;&#x53D1;&#x5E03;</a></li>
<li><a href="https://blog.csdn.net/applechu_lu/article/details/79329446" rel="nofollow noreferrer" target="_blank">vue&#x5C01;&#x88C5;&#x63D2;&#x4EF6;&#x5E76;&#x53D1;&#x5E03;&#x5230;npm&#x4E0A;</a></li>
<li><a href="https://www.cnblogs.com/yesyes/p/7588833.html" rel="nofollow noreferrer" target="_blank">vue&#x5C01;&#x88C5;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x5E76;&#x53D1;&#x5E03;&#x5230;npm</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你用原生JavaScript造轮子（1）——分页器（最后更新：Vue插件版本，本篇Over！）

## 原文链接
[https://segmentfault.com/a/1190000015768440](https://segmentfault.com/a/1190000015768440)


---
title: '你不知道的JavaScript·第一部分' 
date: 2018-11-26 2:30:09
hidden: true
slug: 2jya7df008m
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x7B2C;&#x4E00;&#x7AE0;&#xFF1A; &#x4F5C;&#x7528;&#x57DF;&#x662F;&#x4EC0;&#x4E48;</h3><h4>1&#x3001; &#x7F16;&#x8BD1;&#x539F;&#x7406;</h4><p>JavaScript &#x88AB;&#x5217;&#x4E3A; &#x2018;&#x52A8;&#x6001;&#x2019; &#x6216; &#x2018;&#x89E3;&#x91CA;&#x6267;&#x884C;&#x2019; &#x8BED;&#x8A00;&#xFF0C;&#x4E8E;&#x5176;&#x4ED6;&#x4F20;&#x7EDF;&#x8BED;&#x8A00;&#xFF08;&#x5982; java&#xFF09;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;JavaScript&#x662F;&#x8FB9;&#x7F16;&#x8BD1;&#x8FB9;&#x6267;&#x884C;&#x7684;&#x3002;<br>&#x4E00;&#x6BB5;&#x6E90;&#x7801;&#x5728;&#x6267;&#x884C;&#x524D;&#x4F1A;&#x7ECF;&#x5386;&#x4E09;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A; <code>&#x5206;&#x8BCD;/&#x8BCD;&#x6CD5;&#x5206;&#x6790;</code> -&gt; <code>&#x89E3;&#x6790;/&#x8BED;&#x6CD5;&#x5206;&#x6790;</code> -&gt; <code>&#x4EE3;&#x7801;&#x751F;&#x6210;</code></p><ul><li>&#x5206;&#x8BCD;/&#x8BCD;&#x6CD5;&#x5206;&#x6790;</li></ul><p>&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x5C06;&#x5B57;&#x7B26;&#x4E32;&#x5206;&#x89E3;&#x6210;&#x8BCD;&#x6CD5;&#x5355;&#x5143;&#xFF0C;&#x5982; var a = 2; &#x4F1A;&#x88AB;&#x5206;&#x89E3;&#x6210;&#x8BCD;&#x6CD5;&#x5355;&#x5143; var&#x3001; a&#x3001; = &#x3001;2&#x3001;;&#x3002;&#x7A7A;&#x683C;&#x4E00;&#x822C;&#x6CA1;&#x610F;&#x4E49;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;</p><ul><li>&#x89E3;&#x6790;/&#x8BED;&#x6CD5;&#x5206;&#x6790;</li></ul><p>&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4F1A;&#x5C06;&#x8BCD;&#x6CD5;&#x5355;&#x5143;&#x8F6C;&#x6362;&#x6210; <code>&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;</code>&#xFF08;Abstract Syntax Tree,AST&#xFF09;&#x3002;<br>&#x5982; var a = 2; &#x5BF9;&#x5E94;&#x7684; <code>&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;</code> &#x5982;&#x4E0B;, &#x53EF;&#x901A;&#x8FC7; <a href="https://astexplorer.net/" rel="nofollow noreferrer" target="_blank">&#x5728;&#x7EBF;&#x53EF;&#x89C6;&#x5316;AST</a> &#x7F51;&#x5740;&#x5728;&#x7EBF;&#x5206;&#x6790;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;type&quot;: &quot;Program&quot;,
  &quot;start&quot;: 0,
  &quot;end&quot;: 10,
  &quot;body&quot;: [
    {
      &quot;type&quot;: &quot;VariableDeclaration&quot;,
      &quot;start&quot;: 0,
      &quot;end&quot;: 10,
      &quot;declarations&quot;: [
        {
          &quot;type&quot;: &quot;VariableDeclarator&quot;,
          &quot;start&quot;: 4,
          &quot;end&quot;: 9,
          &quot;id&quot;: {
            &quot;type&quot;: &quot;Identifier&quot;,
            &quot;start&quot;: 4,
            &quot;end&quot;: 5,
            &quot;name&quot;: &quot;a&quot;
          },
          &quot;init&quot;: {
            &quot;type&quot;: &quot;Literal&quot;,
            &quot;start&quot;: 8,
            &quot;end&quot;: 9,
            &quot;value&quot;: 2,
            &quot;raw&quot;: &quot;2&quot;
          }
        }
      ],
      &quot;kind&quot;: &quot;var&quot;
    }
  ],
  &quot;sourceType&quot;: &quot;module&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;Program&quot;</span>,
  <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">&quot;end&quot;</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">&quot;body&quot;</span>: [
    {
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;VariableDeclaration&quot;</span>,
      <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-number">0</span>,
      <span class="hljs-attr">&quot;end&quot;</span>: <span class="hljs-number">10</span>,
      <span class="hljs-attr">&quot;declarations&quot;</span>: [
        {
          <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;VariableDeclarator&quot;</span>,
          <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-number">4</span>,
          <span class="hljs-attr">&quot;end&quot;</span>: <span class="hljs-number">9</span>,
          <span class="hljs-attr">&quot;id&quot;</span>: {
            <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;Identifier&quot;</span>,
            <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-number">4</span>,
            <span class="hljs-attr">&quot;end&quot;</span>: <span class="hljs-number">5</span>,
            <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;a&quot;</span>
          },
          <span class="hljs-attr">&quot;init&quot;</span>: {
            <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;Literal&quot;</span>,
            <span class="hljs-attr">&quot;start&quot;</span>: <span class="hljs-number">8</span>,
            <span class="hljs-attr">&quot;end&quot;</span>: <span class="hljs-number">9</span>,
            <span class="hljs-attr">&quot;value&quot;</span>: <span class="hljs-number">2</span>,
            <span class="hljs-attr">&quot;raw&quot;</span>: <span class="hljs-string">&quot;2&quot;</span>
          }
        }
      ],
      <span class="hljs-attr">&quot;kind&quot;</span>: <span class="hljs-string">&quot;var&quot;</span>
    }
  ],
  <span class="hljs-attr">&quot;sourceType&quot;</span>: <span class="hljs-string">&quot;module&quot;</span>
}</code></pre><ul><li>&#x4EE3;&#x7801;&#x751F;&#x6210;</li></ul><p>&#x5C06; AST &#x8F6C;&#x6362;&#x6210;&#x53EF;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5B58;&#x653E;&#x4E8E;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5E76;&#x5206;&#x914D;&#x5185;&#x5B58;&#x548C;&#x8F6C;&#x5316;&#x4E3A;&#x4E00;&#x4E9B;&#x673A;&#x5668;&#x6307;&#x4EE4;</p><h4>2&#x3001;&#x7406;&#x89E3;&#x4F5C;&#x7528;&#x57DF;</h4><p>&#x5176;&#x5B9E;&#x7ED3;&#x5408;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x7F16;&#x8BD1;&#x539F;&#x7406;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x597D;&#x7406;&#x89E3;&#x4E86;&#x3002;&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x662F;&#x5F53;&#x524D;&#x6267;&#x884C;&#x4EE3;&#x7801;&#x5BF9;&#x8FD9;&#x4E9B;&#x6807;&#x8BC6;&#x7B26;&#x7684;&#x8BBF;&#x95EE;&#x6743;&#x9650;&#x3002;<br>&#x7F16;&#x8BD1;&#x5668;&#x4F1A;&#x5728;&#x5F53;&#x524D;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x58F0;&#x660E;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;&#xFF0C;&#x8FD0;&#x884C;&#x65F6;&#x5F15;&#x64CE;&#x4F1A;&#x53BB;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x67E5;&#x627E;&#x8FD9;&#x4E9B;&#x53D8;&#x91CF;&#xFF08;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BFB;&#x5740;&#x7684;&#x8FC7;&#x7A0B;&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x627E;&#x5230;&#x8FD9;&#x4E9B;&#x53D8;&#x91CF;&#x5C31;&#x53EF;&#x4EE5;&#x64CD;&#x4F5C;&#x53D8;&#x91CF;&#xFF0C;&#x627E;&#x4E0D;&#x5230;&#x5C31;&#x5F80;&#x4E0A;&#x4E00;&#x5C42;&#x4F5C;&#x7528;&#x57DF;&#x627E;&#xFF08;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x7684;&#x6982;&#x5FF5;&#xFF09;&#xFF0C;&#x6216;&#x8005;&#x8FD4;&#x56DE; null</p><h3 id="articleHeader1">&#x7B2C;&#x4E09;&#x7AE0;&#xFF1A; &#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x548C;&#x5757;&#x4F5C;&#x7528;&#x57DF;</h3><h4>1&#x3001;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x4F5C;&#x7528;&#x57DF;</h4><p>&#x6BCF;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x90FD;&#x4F1A;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x90A3;&#x4F5C;&#x7528;&#x57DF;&#x6709;&#x4EC0;&#x4E48;&#x7528;&#x5462;&#xFF0C;&#x5B83;&#x80FD;&#x8BA9;&#x8BE5;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x4E0D;&#x88AB;&#x5916;&#x754C;&#x8BBF;&#x95EE;&#x5230;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x53CD;&#x8FC7;&#x6765;&#x8BF4;&#x662F;&#x4E0D;&#x8BA9;&#x8BE5;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7684;&#x53D8;&#x91CF;&#x6216;&#x51FD;&#x6570;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x3002;</p><p>&#x5BF9;&#x6BD4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 123
function bar() {
  //...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-comment">//...</span>
}</code></pre><p>&#x548C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  var a = 123
  function bar() {
    //...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">//...</span>
  }
}</code></pre><p>&#x53D8;&#x91CF; a &#x548C;&#x51FD;&#x6570; bar &#x7528;&#x4E00;&#x4E2A;&#x51FD;&#x6570; foo &#x5305;&#x88F9;&#x8D77;&#x6765;&#xFF0C;&#x51FD;&#x6570; foo &#x4F1A;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x53D8;&#x91CF; a &#x548C;&#x51FD;&#x6570; bar &#x5916;&#x754C;&#x5C06;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#xFF0C;&#x540C;&#x65F6;&#x53D8;&#x91CF;&#x6216;&#x51FD;&#x6570;&#x4E5F;&#x4E0D;&#x4F1A;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x3002;</p><h4>2&#x3001;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;</h4><p>&#x8FDB;&#x4E00;&#x6B65;&#x601D;&#x8003;&#xFF0C;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x7684;&#x53D8;&#x91CF; a &#x548C;&#x51FD;&#x6570; bar &#x6709;&#x4E86;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4F46;&#x51FD;&#x6570; foo &#x4E0D;&#x4E5F;&#x662F;&#x66B4;&#x9732;&#x5728;&#x5168;&#x5C40;&#xFF0C;&#x4E5F;&#x5BF9;&#x5168;&#x5C40;&#x9020;&#x6210;&#x6C61;&#x67D3;&#x4E86;&#x554A;&#x3002;&#x662F;&#x7684;&#xFF0C;JavaScript&#x5BF9;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x63D0;&#x51FA;&#x4E86;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A; <code>&#x7ACB;&#x5373;&#x6267;&#x884C;&#x51FD;&#x6570; (IIFE)</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function foo() {
  var a = 123
  function bar() {
    //...
  }
})()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">123</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">//...</span>
  }
})()</code></pre><p>&#x7B2C;&#x4E00;&#x4E2A;&#xFF08;&#xFF09;&#x5C06;&#x51FD;&#x6570;&#x53D8;&#x6210;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#xFF08;&#xFF09;&#x6267;&#x884C;&#x4E86;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6700;&#x7EC8;&#x51FD;&#x6570; foo &#x4E5F;&#x5F62;&#x6210;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4E0D;&#x4F1A;&#x6C61;&#x67D3;&#x5230;&#x5168;&#x5C40;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x4E0D;&#x88AB;&#x5168;&#x5C40;&#x8BBF;&#x95EE;&#x7684;&#x5230;&#x3002;</p><h4>3&#x3001;&#x5757;&#x4F5C;&#x7528;&#x57DF;</h4><p>es6&#x4E4B;&#x524D;JavaScript&#x662F;&#x6CA1;&#x6709;&#x5757;&#x4F5C;&#x7528;&#x57DF;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#x7684;&#xFF0C;&#x8FD9;&#x4E0E;&#x4E00;&#x822C;&#x7684;&#x8BED;&#x8A00;&#xFF08;&#x5982;Java &#xFF0C;C&#xFF09;&#x5F88;&#x5927;&#x4E0D;&#x540C;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i &lt; 10; i++) {
  console.log(&apos;i=&apos;, i);
}
console.log(&apos;&#x8F93;&#x51FA;&apos;, i); // &#x8F93;&#x51FA; 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;i=&apos;</span>, i);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8F93;&#x51FA;&apos;</span>, i); <span class="hljs-comment">// &#x8F93;&#x51FA; 10</span></code></pre><p>for &#x5FAA;&#x73AF;&#x5B9A;&#x4E49;&#x4E86;&#x53D8;&#x91CF; i&#xFF0C;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x53EA;&#x60F3;&#x8FD9;&#x4E2A;&#x53D8;&#x91CF; i &#x5728;&#x5FAA;&#x73AF;&#x5185;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x5FFD;&#x7565;&#x4E86; i &#x5176;&#x5B9E;&#x662F;&#x4F5C;&#x7528;&#x5728;&#x5916;&#x90E8;&#x4F5C;&#x7528;&#x57DF;(&#x51FD;&#x6570;&#x6216;&#x5168;&#x5C40;)&#x7684;&#x3002;&#x6240;&#x4EE5;&#x5FAA;&#x73AF;&#x8FC7;&#x540E;&#x4E5F;&#x80FD;&#x6B63;&#x5E38;&#x6253;&#x5370;&#x51FA; i ,&#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x5757;&#x7684;&#x6982;&#x5FF5;&#x3002;</p><p>&#x751A;&#x81F3;&#x8FDE; try/catch &#x4E5F;&#x6CA1;&#x5F62;&#x6210;&#x5757;&#x4F5C;&#x7528;&#x57DF;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  for (var i = 0; i &lt; 10; i++) {
    console.log(&apos;i=&apos;, i);
  }
} catch (error) {}
console.log(&apos;&#x8F93;&#x51FA;&apos;, i); // &#x8F93;&#x51FA; 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;i=&apos;</span>, i);
  }
} <span class="hljs-keyword">catch</span> (error) {}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8F93;&#x51FA;&apos;</span>, i); <span class="hljs-comment">// &#x8F93;&#x51FA; 10</span></code></pre><blockquote>&#x89E3;&#x51B3;&#x65B9;&#x6CD5;1</blockquote><p>&#x5F62;&#x6210;&#x5757;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x65B9;&#x6CD5;&#x5F53;&#x7136;&#x662F;&#x4F7F;&#x7528; es6 &#x7684; let &#x548C; const &#x4E86;&#xFF0C; let &#x4E3A;&#x5176;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x9690;&#x5F0F;&#x7684;&#x52AB;&#x6301;&#x4E86;&#x6240;&#x5728;&#x7684;&#x5757;&#x4F5C;&#x7528;&#x57DF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let i = 0; i &lt; 10; i++) {
  console.log(&apos;i=&apos;, i);
}
console.log(&apos;&#x8F93;&#x51FA;&apos;, i); // ReferenceError: i is not defined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;i=&apos;</span>, i);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8F93;&#x51FA;&apos;</span>, i); <span class="hljs-regexp">//</span> ReferenceError: i <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> defined</code></pre><p>&#x5C06;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x7684; var &#x6362;&#x6210; let &#x6700;&#x540E;&#x8F93;&#x51FA;&#x5C31;&#x62A5;&#x9519;&#x4E86; ReferenceError: i is not defined &#xFF0C;&#x8BF4;&#x660E;&#x88AB; let &#x58F0;&#x660E;&#x7684; i &#x53EA;&#x4F5C;&#x7528;&#x5728;&#x4E86; for &#x8FD9;&#x4E2A;&#x5757;&#x4E2D;&#x3002;</p><p>&#x9664;&#x4E86; let &#x4F1A;&#x8BA9; for&#x3001;if&#x3001;try/catch &#x7B49;&#x5F62;&#x6210;&#x5757;&#xFF0C;JavaScript &#x7684; <code>{}</code> &#x4E5F;&#x80FD;&#x5F62;&#x6210;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  let name = &apos;&#x66FE;&#x7530;&#x751F;&apos;
}

console.log(name); //ReferenceError: name is not defined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>{
  let <span class="hljs-built_in">name</span> = <span class="hljs-string">&apos;&#x66FE;&#x7530;&#x751F;&apos;</span>
}

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">name</span>); <span class="hljs-comment">//ReferenceError: name is not defined</span></code></pre><blockquote>&#x89E3;&#x51B3;&#x65B9;&#x6CD5;2</blockquote><p>&#x65E9;&#x5728;&#x6CA1; es6 &#x7684; let &#x58F0;&#x660E;&#x4E4B;&#x524D;&#xFF0C;&#x5E38;&#x7528;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x5229;&#x7528; <code>&#x51FD;&#x6570;&#x4E5F;&#x80FD;&#x5F62;&#x6210;&#x4F5C;&#x7528;&#x57DF;</code> &#x8FD9;&#x4E48;&#x4E2A;&#x6982;&#x5FF5;&#x6765;&#x89E3;&#x51B3;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#x7684;&#x3002;</p><p>&#x770B;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  var result = []
  for (var i = 0; i &lt; 10; i++) {
    result[i] = function () {
      return i
    }
  }
  console.log(i&#xFF09;// i &#x4F5C;&#x7528;&#x5728;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;for &#x6267;&#x884C;&#x5B8C;&#x6B64;&#x65F6; i &#x5DF2;&#x7ECF;&#x7B49;&#x4E8E; 10 &#x4E86;
  return result
}
var result = foo()
console.log(result[0]()); // &#x8F93;&#x51FA; 10 &#x671F;&#x671B; 0
console.log(result[1]()); // &#x8F93;&#x51FA; 10 &#x671F;&#x671B; 1
console.log(result[2]()); // &#x8F93;&#x51FA; 10 &#x671F;&#x671B; 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> result = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> i
    }
  }
  <span class="hljs-built_in">console</span>.log(i&#xFF09;<span class="hljs-comment">// i &#x4F5C;&#x7528;&#x5728;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;for &#x6267;&#x884C;&#x5B8C;&#x6B64;&#x65F6; i &#x5DF2;&#x7ECF;&#x7B49;&#x4E8E; 10 &#x4E86;</span>
  <span class="hljs-keyword">return</span> result
}
<span class="hljs-keyword">var</span> result = foo()
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">0</span>]()); <span class="hljs-comment">// &#x8F93;&#x51FA; 10 &#x671F;&#x671B; 0</span>
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">1</span>]()); <span class="hljs-comment">// &#x8F93;&#x51FA; 10 &#x671F;&#x671B; 1</span>
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">2</span>]()); <span class="hljs-comment">// &#x8F93;&#x51FA; 10 &#x671F;&#x671B; 2</span></code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x51FA;&#x73B0;&#x7684;&#x95EE;&#x9898;&#x662F;&#x6267;&#x884C;&#x6570;&#x7EC4;&#x51FD;&#x6570;&#x6700;&#x7EC8;&#x90FD;&#x8F93;&#x51FA;&#x4E86; 10&#xFF0C; &#x56E0;&#x4E3A; i &#x4F5C;&#x7528;&#x5728;&#x6574;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;for &#x6267;&#x884C;&#x5B8C;&#x6B64;&#x65F6; i &#x5DF2;&#x7ECF;&#x7B49;&#x4E8E; 10 &#x4E86;, &#x6240;&#x4EE5;&#x5F53;&#x540E;&#x7EED;&#x6267;&#x884C;&#x51FD;&#x6570; <code>result[x]()</code> &#x5185;&#x90E8;&#x8FD4;&#x56DE;&#x7684; i &#x5DF2;&#x7ECF;&#x662F; 10 &#x4E86;&#x3002;</p><p>&#x5229;&#x7528;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x6765;&#x89E3;&#x51B3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  var result = []
  for (var i = 0; i &lt; 10; i++) {
    result[i] = function (num) {
      return function () { // &#x51FD;&#x6570;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#x88AB;&#x79C1;&#x6709;&#x5316;&#x4E86;
        return num
      }
    }(i)
  }
  return result
}
var result = foo()
console.log(result[0]()); // 0
console.log(result[1]()); // 1
console.log(result[2]()); // 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> result = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    result[i] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">num</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// &#x51FD;&#x6570;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x5185;&#x90E8;&#x53D8;&#x91CF;&#x88AB;&#x79C1;&#x6709;&#x5316;&#x4E86;</span>
        <span class="hljs-keyword">return</span> num
      }
    }(i)
  }
  <span class="hljs-keyword">return</span> result
}
<span class="hljs-keyword">var</span> result = foo()
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">0</span>]()); <span class="hljs-comment">// 0</span>
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">1</span>]()); <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(result[<span class="hljs-number">2</span>]()); <span class="hljs-comment">// 2</span></code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E5F;&#x662F;&#x633A;&#x5178;&#x578B;&#x7684;&#xFF0C;&#x4E00;&#x822C;&#x9762;&#x8BD5;&#x9898;&#x6BD4;&#x8F83;&#x8003;&#x57FA;&#x7840;&#x7684;&#x8BDD;&#x5C31;&#x4F1A;&#x88AB;&#x95EE;&#x9053;&#xFF0C;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x4E0D;&#x4EC5;&#x8003;&#x5BDF;&#x5230;&#x4E86;&#x5757;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x8FD8;&#x8003;&#x5BDF;&#x5230;&#x4E86;&#x95ED;&#x5305;&#x7684;&#x6982;&#x5FF5;&#xFF08;&#x95ED;&#x5305;&#x540E;&#x7EED;&#x8BB2;&#x4F46;&#x4E0D;&#x5F71;&#x54CD;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x7684;&#x7406;&#x89E3;&#xFF09;&#xFF0C;&#x591A;&#x7422;&#x78E8;&#x4E00;&#x4E0B;&#x5C31;&#x7406;&#x89E3;&#x4E86;&#x3002;</p><h3 id="articleHeader2">&#x7B2C;&#x56DB;&#x7AE0;&#xFF1A; &#x63D0;&#x5347;</h3><p>&#x63D0;&#x5347;&#x6307;&#x7684;&#x662F;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x548C;&#x51FD;&#x6570;&#x63D0;&#x5347;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;JavaScript&#x4F1A;&#x6709;&#x63D0;&#x5347;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#x5462;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x56E0;&#x4E3A;JavaScript&#x4EE3;&#x7801;&#x662F;&#x5148; <code>&#x7F16;&#x8BD1;</code> &#x540E; <code>&#x6267;&#x884C;</code> &#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#x5C31;&#x4F1A;&#x5148;&#x5BF9;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x505A;&#x58F0;&#x660E;&#xFF0C;&#x5728;&#x6267;&#x884C;&#x9636;&#x6BB5;&#x5C31;&#x51FA;&#x73B0;&#x4E86;&#x6240;&#x8C13;&#x7684;&#x53D8;&#x91CF;&#x63D0;&#x5347;&#x548C;&#x51FD;&#x6570;&#x63D0;&#x5347;&#x4E86;&#x3002;</p><h4>1&#x3001;&#x53D8;&#x91CF;&#x63D0;&#x5347;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a); // undefined
var a = 1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801; <code>console.log(a); // undefined</code> &#x5C31;&#x662F;&#x56E0;&#x4E3A;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#x5148;&#x5BF9;&#x53D8;&#x91CF;&#x505A;&#x4E86;&#x58F0;&#x660E;,&#x5148;&#x58F0;&#x660E;&#x4E86;&#x4E2A;&#x53D8;&#x91CF; a, &#x5E76;&#x9ED8;&#x8BA4;&#x8D4B;&#x503C; undefined</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a;
console.log(a); // undefined
a = 1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs abnf"><code>var a<span class="hljs-comment">;</span>
console.log(a)<span class="hljs-comment">; // undefined</span>
<span class="hljs-attribute">a</span> = <span class="hljs-number">1</span><span class="hljs-comment">;</span></code></pre><h4>2&#x3001;&#x51FD;&#x6570;&#x63D0;&#x5347;</h4><p>&#x51FD;&#x6570;&#x540C;&#x6837;&#x4E5F;&#x5B58;&#x5728;&#x63D0;&#x5347;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x51FD;&#x6570;&#x80FD;&#x5148;&#x8C03;&#x7528;&#x540E;&#x58F0;&#x660E;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();
function foo() {
  console.log(&apos;---foo----&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>foo();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;---foo----&apos;</span>);
}</code></pre><p>&#x6CE8;&#x610F;:&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x4E0D;&#x4F1A;&#x88AB;&#x63D0;&#x5347;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo();
var foo = function() {
  console.log(&apos;---foo----&apos;);
}
// TypeError: foo is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>foo();
<span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;---foo----&apos;</span>);
}
<span class="hljs-comment">// TypeError: foo is not a function</span></code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x51FD;&#x6570;&#x4F1A;&#x9996;&#x5148;&#x88AB;&#x63D0;&#x5347;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x662F;&#x53D8;&#x91CF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = 1;
foo();
function foo() {
  console.log(&apos;---foo----&apos;);
}
// TypeError: foo is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-number">1</span>;
foo();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;---foo----&apos;</span>);
}
<span class="hljs-comment">// TypeError: foo is not a function</span></code></pre><p>&#x5206;&#x6790;&#x4E00;&#x4E0B;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x7F16;&#x8BD1;&#x540E;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = undefined; // &#x53D8;&#x91CF;&#x540D;&#x8D4B;&#x503C; undefined
function foo() {     // &#x51FD;&#x6570;&#x5148;&#x63D0;&#x5347;
  console.log(&apos;---foo----&apos;);
}
foo = 1;             // &#x4F46;&#x63A5;&#x4E0B;&#x53BB;&#x662F;&#x53D8;&#x91CF;&#x88AB;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#x4E86; 1&#xFF0C;&#x662F;&#x4E2A;Number&#x7C7B;&#x578B;
foo();               // Number&#x7C7B;&#x578B;&#x5F53;&#x7136;&#x4E0D;&#x80FD;&#x7528;&#x51FD;&#x6570;&#x65B9;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x5C31;&#x62A5;&#x9519;&#x4E86;
// TypeError: foo is not a function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> foo = <span class="hljs-literal">undefined</span>; <span class="hljs-comment">// &#x53D8;&#x91CF;&#x540D;&#x8D4B;&#x503C; undefined</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{     <span class="hljs-comment">// &#x51FD;&#x6570;&#x5148;&#x63D0;&#x5347;</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;---foo----&apos;</span>);
}
foo = <span class="hljs-number">1</span>;             <span class="hljs-comment">// &#x4F46;&#x63A5;&#x4E0B;&#x53BB;&#x662F;&#x53D8;&#x91CF;&#x88AB;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#x4E86; 1&#xFF0C;&#x662F;&#x4E2A;Number&#x7C7B;&#x578B;</span>
foo();               <span class="hljs-comment">// Number&#x7C7B;&#x578B;&#x5F53;&#x7136;&#x4E0D;&#x80FD;&#x7528;&#x51FD;&#x6570;&#x65B9;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x5C31;&#x62A5;&#x9519;&#x4E86;</span>
<span class="hljs-comment">// TypeError: foo is not a function</span></code></pre><h3 id="articleHeader3">&#x7B2C;&#x4E94;&#x7AE0;&#xFF1A; &#x4F5C;&#x7528;&#x57DF;&#x95ED;&#x5305;</h3><p>&#x95ED;&#x5305;&#x95EE;&#x9898;&#x4E00;&#x76F4;&#x4F1A;&#x5728;JavaScript&#x88AB;&#x63D0;&#x8D77;&#xFF0C;&#x662F;JavaScript&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x5947;&#x8469;&#x7684;&#x6982;&#x5FF5;</p><h4>1&#x3001;&#x95ED;&#x5305;&#x7684;&#x4EA7;&#x751F;</h4><blockquote>&#x95ED;&#x5305;&#x7684;&#x6982;&#x5FF5;&#xFF1A; &#x5F53;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8BB0;&#x4F4F;&#x5E76;&#x8BBF;&#x95EE;&#x6240;&#x5728;&#x7684;&#x8BCD;&#x6CD5;&#x4F5C;&#x7528;&#x57DF;&#x65F6;&#xFF0C;&#x5C31;&#x4EA7;&#x751F;&#x4E86;&#x95ED;&#x5305;</blockquote><p>&#x6982;&#x5FF5;&#x8C8C;&#x4F3C;&#x633A;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x7B80;&#x5355;&#x5206;&#x6790;&#x4E0B;&#xFF0C;&#x9996;&#x5148;&#x95ED;&#x5305;&#x662F; <code>&#x4EA7;&#x751F;&#x7684;</code>&#xFF0C;&#x662F;&#x5728;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x4E2D;&#x4EA7;&#x751F;&#x7684;&#xFF0C;&#x6709;&#x7684;&#x4E00;&#x4E9B;&#x7F51;&#x7EDC;&#x535A;&#x6587;&#x76F4;&#x63A5;&#x5C06;&#x95ED;&#x5305;&#x5B9A;&#x4E49;&#x4E3A; <code>&#x67D0;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x51FD;&#x6570;</code> &#x662F;&#x9519;&#x7684;&#x3002;</p><p>&#x95ED;&#x5305;&#x662F;&#x600E;&#x4E48;&#x4EA7;&#x751F;&#x7684;&#x5462;&#xFF0C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x80FD;&#x8BBF;&#x95EE;&#x5230;&#x6240;&#x5728;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x5C31;&#x4EA7;&#x751F;&#x4E86;&#x95ED;&#x5305;&#xFF0C;&#x6CE8;&#x610F;&#x5230;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x54B1;&#x4EEC;&#x6700;&#x4E0A;&#x9762;&#x7684;&#x7AE0;&#x8282;&#x6709;&#x63D0;&#x5230;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  var a = 0;
  function bar() {
    a++;
    console.log(a);
  }
  return bar;
}

var bat = foo()
bat() // 1
bat() // 2
bat() // 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> a = <span class="hljs-number">0</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    a++;
    <span class="hljs-built_in">console</span>.log(a);
  }
  <span class="hljs-keyword">return</span> bar;
}

<span class="hljs-keyword">var</span> bat = foo()
bat() <span class="hljs-comment">// 1</span>
bat() <span class="hljs-comment">// 2</span>
bat() <span class="hljs-comment">// 3</span></code></pre><p>&#x7ED3;&#x5408;&#x4F8B;&#x5B50;&#x5206;&#x6790;&#x4E00;&#x4E0B;&#xFF1A; &#x51FD;&#x6570; foo &#x5185;&#x90E8;&#x8FD4;&#x56DE;&#x4E86;&#x51FD;&#x6570; bar ,&#x5916;&#x90E8;&#x58F0;&#x660E;&#x4E2A;&#x53D8;&#x91CF; bat &#x62FF;&#x5230; foo &#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570; bar &#xFF0C;&#x6267;&#x884C; bat() &#x53D1;&#x73B0;&#x80FD;&#x6B63;&#x5E38;&#x8F93;&#x51FA; 1 &#xFF0C;&#x6CE8;&#x610F;&#x524D;&#x9762;&#x7AE0;&#x8282;&#x63D0;&#x5230;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x53D8;&#x91CF; a &#x662F;&#x5728;&#x51FD;&#x6570; foo &#x5185;&#x90E8;&#x7684;&#x4E00;&#x4E2A;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#xFF0C;&#x4E0D;&#x80FD;&#x88AB;&#x5916;&#x754C;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x4F46;&#x5916;&#x90E8;&#x51FD;&#x6570; bat &#x5374;&#x80FD;&#x8BBF;&#x95EE;&#x7684;&#x5230;&#x79C1;&#x6709;&#x53D8;&#x91CF; a&#xFF0C;&#x8FD9;&#x8BF4;&#x660E;&#x4E86; <code>&#x5916;&#x90E8;&#x51FD;&#x6570; bat &#x6301;&#x6709;&#x51FD;&#x6570; foo &#x7684;&#x4F5C;&#x7528;&#x57DF;</code> &#xFF0C;&#x4E5F;&#x5C31;&#x4EA7;&#x751F;&#x4E86;&#x95ED;&#x5305;&#x3002;</p><p>&#x95ED;&#x5305;&#x7684;&#x5F62;&#x6210;&#x6709;&#x4EC0;&#x4E48;&#x7528;&#x5462;&#xFF0C;JavaScript &#x8BA9;&#x95ED;&#x5305;&#x7684;&#x5B58;&#x5728;&#x660E;&#x663E;&#x6709;&#x5B83;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x4F5C;&#x7528;&#x662F;&#x4E3A;&#x4E86;&#x6A21;&#x5757;&#x5316;&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x6301;&#x6709;&#x53E6;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x95ED;&#x5305;&#x7279;&#x6027;&#x53BB;&#x505A;&#x66F4;&#x591A;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x4F46;&#x8FD9;&#x8FB9;&#x5C31;&#x6682;&#x4E14;&#x8BA8;&#x8BBA;&#x6A21;&#x5757;&#x5316;&#x8FD9;&#x4E2A;&#x4F5C;&#x7528;&#x3002;</p><p>&#x51FD;&#x6570;&#x6709;&#x4EC0;&#x4E48;&#x4F5C;&#x7528;&#x5462;&#xFF0C;&#x79C1;&#x6709;&#x5316;&#x53D8;&#x91CF;&#x6216;&#x65B9;&#x6CD5;&#x5440;&#xFF0C;&#x90A3;&#x51FD;&#x6570;&#x5185;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#x88AB;&#x79C1;&#x6709;&#x5316;&#x4E86;&#x51FD;&#x6570;&#x600E;&#x4E48;&#x548C;&#x5916;&#x90E8;&#x505A; <code>&#x4EA4;&#x6D41;</code> &#x5462;, &#x66B4;&#x9732;&#x51FA;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;&#x6216;&#x65B9;&#x6CD5;&#x5440;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
  var _a = 0;
  var b = 0;
  function _add() {
    b = _a + 10    
  }
  function bar() {
    _add()
  }
  function getB() {
    return b
  }
  return {
    bar: bar,
    getB: getB
  }
}

var bat = foo()
bat.bar()
bat.getB() // 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> _a = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">0</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_add</span>(<span class="hljs-params"></span>) </span>{
    b = _a + <span class="hljs-number">10</span>    
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    _add()
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getB</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> b
  }
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">bar</span>: bar,
    <span class="hljs-attr">getB</span>: getB
  }
}

<span class="hljs-keyword">var</span> bat = foo()
bat.bar()
bat.getB() <span class="hljs-comment">// 10</span></code></pre><p>&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x51FD;&#x6570; foo &#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x5185;&#x90E8;&#x58F0;&#x660E;&#x4E86;&#x4E00;&#x4E9B;&#x79C1;&#x6709;&#x53D8;&#x91CF;&#x548C;&#x65B9;&#x6CD5;&#xFF0C;&#x4E5F;&#x5BF9;&#x5916;&#x754C;&#x66B4;&#x9732;&#x4E86;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x662F;&#x5728;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x987A;&#x5E26;&#x4EA7;&#x751F;&#x4E86;&#x4E00;&#x4E2A;&#x95ED;&#x5305;</p><h4>2&#x3001;&#x6A21;&#x5757;&#x673A;&#x5236;</h4><p>&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x4E86;&#x95ED;&#x5305;&#x7684;&#x4EA7;&#x751F;&#x548C;&#x4F5C;&#x7528;&#xFF0C;&#x8C8C;&#x4F3C;&#x5728;&#x4F7F;&#x7528; es6&#x8BED;&#x6CD5; &#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x5F88;&#x5C11;&#x7528;&#x5230;&#x4E86;&#x95ED;&#x5305;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x6211;&#x4EEC;&#x4E00;&#x76F4;&#x5728;&#x7528;&#x95ED;&#x5305;&#x7684;&#x6982;&#x5FF5;&#x7684;&#x3002;</p><blockquote>foo.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _a = 0;
var b = 0;
function _add() {
  b = _a + 10
}
function bar() {
  _add()
}
function getB() {
  return b
}
export default {
  bar: bar,
  getB: getB
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _a = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_add</span>(<span class="hljs-params"></span>) </span>{
  b = _a + <span class="hljs-number">10</span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
  _add()
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getB</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> b
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">bar</span>: bar,
  <span class="hljs-attr">getB</span>: getB
}</code></pre><blockquote>bat.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import bat from &apos;foo&apos;

bat.bar()
bat.getB() // 10" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> bat <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;foo&apos;</span>

bat.bar()
bat.getB() <span class="hljs-comment">// 10</span></code></pre><p>&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x662F; es6 &#x6A21;&#x5757;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x60CA;&#x5947;&#x7684;&#x53D1;&#x73B0;&#x53D8;&#x91CF; bat &#x53EF;&#x4EE5;&#x8BB0;&#x4F4F;&#x5E76;&#x8BBF;&#x95EE;&#x6A21;&#x5757; foo &#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x8FD9;&#x7B26;&#x5408;&#x4E86;&#x95ED;&#x5305;&#x7684;&#x6982;&#x5FF5;&#x3002;</p><h3 id="articleHeader4">&#x5C0F;&#x7ED3;&#xFF1A;</h3><p>&#x672C;&#x7AE0;&#x8282;&#x6211;&#x4EEC;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x4E86;JavaScript&#x7684; <code>&#x4F5C;&#x7528;&#x57DF;</code>&#xFF0C;<code>&#x63D0;&#x5347;</code>&#xFF0C;<code>&#x95ED;&#x5305;</code>&#x7B49;&#x6982;&#x5FF5;&#xFF0C;&#x5E0C;&#x671B;&#x4F60;&#x80FD;&#x6709;&#x6240;&#x6536;&#x83B7;&#xFF0C;&#x4E0B;&#x4E00;&#x90E8;&#x5206;&#x6574;&#x7406;&#x4E0B; <code>this&#x89E3;&#x6790;</code>&#x3001;<code>&#x5BF9;&#x8C61;</code>&#x3001;<code>&#x539F;&#x578B;</code> &#x7B49;&#x4E00;&#x4E9B;&#x6982;&#x5FF5;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x5174;&#x8DA3;&#x4E5F;&#x53EF;&#x4EE5;&#x53BB;&#x6211;&#x7684; <a href="https://github.com/ZengTianShengZ/My-Blog" rel="nofollow noreferrer" target="_blank">github-blog</a> &#x63D0; <code>issues</code> &#xFF0C;github&#x4E5F;&#x6574;&#x7406;&#x4E86;&#x51E0;&#x7BC7;&#x6587;&#x7AE0;&#x4F1A;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#xFF0C;&#x6B22;&#x8FCE; <code>star</code></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的JavaScript·第一部分

## 原文链接
[https://segmentfault.com/a/1190000015390384](https://segmentfault.com/a/1190000015390384)


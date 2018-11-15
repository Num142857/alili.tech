---
title: 细数 JavaScript 实用黑科技(一)
reprint: true
categories: reprint
abbrlink: 54bdd25b
date: 2018-11-07 02:30:15
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016507838" src="https://static.alili.tech/img/remote/1460000016507838" alt="JavaScript" title="JavaScript" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x53EA;&#x6709;&#x6DF1;&#x5165;&#x5B66;&#x7CBE;&#x4E00;&#x95E8;&#x8BED;&#x8A00;&#xFF0C;&#x5B66;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x624D;&#x80FD;&#x66F4;&#x597D;&#x5730;&#x4E3E;&#x4E00;&#x53CD;&#x4E09;&#xFF0C;&#x89E6;&#x7C7B;&#x65C1;&#x542C;&#x3002;</p><p>&#x4ECE;&#x63A5;&#x89E6;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x5230;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x5C06;&#x8FD1; 2 &#x5E74;&#x4E86;&#xFF0C;&#x6700;&#x8FD1;&#x53C8;&#x770B;&#x4E86;&#x962E;&#x4E00;&#x950B;&#x5199;&#x7684;&#xFF1A; <a href="https://wangdoc.com/javascript/index.html" rel="nofollow noreferrer" target="_blank">&#x300A;JavaScript &#x8BED;&#x8A00;&#x5165;&#x95E8;&#x6559;&#x7A0B;&#x300B;</a> &#x4E00;&#x4E66;&#xFF0C;&#x91CD;&#x6E29; JavaScript &#x3002;</p><p>&#x5C0F;&#x6C6A;&#x5C06;&#x5DE5;&#x4F5C;&#x548C;&#x9762;&#x8BD5;&#x9047;&#x5230;&#x8FC7;&#x7684;&#xFF0C;&#x6CA1;&#x591A;&#x5C11;&#x4EBA;&#x77E5;&#x9053;&#x7684; JavaScript &#x6280;&#x5DE7;&#xFF0C;&#x5374;&#x5341;&#x5206;&#x5B9E;&#x7528;&#x7684;&#x6280;&#x5DE7;&#x90FD;&#x603B;&#x7ED3;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#xFF0C;&#x5206;&#x4EAB;&#x7ED9;&#x5927;&#x5BB6; &#x3002;</p><p>&#x6E29;&#x6545;&#x800C;&#x77E5;&#x65B0;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x6280;&#x672F;&#x5E94;&#x8BE5;&#x6709;&#x7684;&#x6001;&#x5EA6;&#x662F;&#xFF1A; Stay hungry ! Stay young &#xFF01;</p><h1 id="articleHeader1">1. &#x6807;&#x7B7E;&#xFF08;label&#xFF09;</h1><p>JavaScript &#x8BED;&#x8A00;&#x5141;&#x8BB8;&#xFF0C;&#x8BED;&#x53E5;&#x7684;&#x524D;&#x9762;&#x6709;&#x6807;&#x7B7E;&#xFF08;label&#xFF09;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x5B9A;&#x4F4D;&#x7B26;&#xFF0C;&#x7528;&#x4E8E;&#x8DF3;&#x8F6C;&#x5230;&#x7A0B;&#x5E8F;&#x7684;&#x4EFB;&#x610F;&#x4F4D;&#x7F6E;&#xFF0C;&#x6807;&#x7B7E;&#x7684;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="label:
  &#x8BED;&#x53E5;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code><span class="hljs-keyword">label</span><span class="bash">:
</span>  &#x8BED;&#x53E5;</code></pre><p>&#x6807;&#x7B7E;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x7684;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x4F46;&#x4E0D;&#x80FD;&#x662F;&#x4FDD;&#x7559;&#x5B57;&#xFF0C;&#x8BED;&#x53E5;&#x90E8;&#x5206;&#x53EF;&#x4EE5;&#x662F;&#x4EFB;&#x610F;&#x8BED;&#x53E5;&#x3002;</p><p>&#x6807;&#x7B7E;&#x901A;&#x5E38;&#x4E0E; break &#x8BED;&#x53E5;&#x548C; continue &#x8BED;&#x53E5;&#x914D;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x8DF3;&#x51FA;&#x7279;&#x5B9A;&#x7684;&#x5FAA;&#x73AF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="top:
  for (var i = 0; i &lt; 3; i++){
    for (var j = 0; j &lt; 3; j++){
      if (i === 1 &amp;&amp; j === 1) break top;
      console.log(&apos;i=&apos; + i + &apos;, j=&apos; + j);
    }
  }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>top:
  for (var <span class="hljs-attr">i</span> = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++){
    for (var <span class="hljs-attr">j</span> = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">3</span>; j++){
      <span class="hljs-keyword">if</span> (<span class="hljs-attr">i</span> === <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-attr">j</span> === <span class="hljs-number">1</span>) break top;
      console.log(&apos;<span class="hljs-attr">i=&apos;</span> + i + &apos;, <span class="hljs-attr">j=&apos;</span> + j);
    }
  }
// <span class="hljs-attr">i=0,</span> <span class="hljs-attr">j=0</span>
// <span class="hljs-attr">i=0,</span> <span class="hljs-attr">j=1</span>
// <span class="hljs-attr">i=0,</span> <span class="hljs-attr">j=2</span>
// <span class="hljs-attr">i=1,</span> <span class="hljs-attr">j=0</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E3A;&#x4E00;&#x4E2A;&#x53CC;&#x91CD;&#x5FAA;&#x73AF;&#x533A;&#x5757;&#xFF0C;break &#x547D;&#x4EE4;&#x540E;&#x9762;&#x52A0;&#x4E0A;&#x4E86; top &#x6807;&#x7B7E;&#xFF08;&#x6CE8;&#x610F;&#xFF0C;top &#x4E0D;&#x7528;&#x52A0;&#x5F15;&#x53F7;&#xFF09;&#xFF0C;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x65F6;&#xFF0C;&#x76F4;&#x63A5;&#x8DF3;&#x51FA;&#x53CC;&#x5C42;&#x5FAA;&#x73AF;&#x3002;&#x5982;&#x679C; break &#x8BED;&#x53E5;&#x540E;&#x9762;&#x4E0D;&#x4F7F;&#x7528;&#x6807;&#x7B7E;&#xFF0C;&#x5219;&#x53EA;&#x80FD;&#x8DF3;&#x51FA;&#x5185;&#x5C42;&#x5FAA;&#x73AF;&#xFF0C;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x6B21;&#x7684;&#x5916;&#x5C42;&#x5FAA;&#x73AF;&#x3002;</p><p>&#x6807;&#x7B7E;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;&#x8DF3;&#x51FA;&#x4EE3;&#x7801;&#x5757;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo: {
  console.log(1);
  break foo;  // &#x6CE8;&#x610F;&#x8981;&#x52A0; break &#x624D;&#x80FD;&#x9000;&#x51FA;
  console.log(&apos;&#x672C;&#x884C;&#x4E0D;&#x4F1A;&#x8F93;&#x51FA;&apos;);
}
console.log(2);
// 1
// 2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>foo: {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  <span class="hljs-keyword">break</span> foo;  <span class="hljs-comment">// &#x6CE8;&#x610F;&#x8981;&#x52A0; break &#x624D;&#x80FD;&#x9000;&#x51FA;</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x672C;&#x884C;&#x4E0D;&#x4F1A;&#x8F93;&#x51FA;&apos;</span>);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5230; break foo&#xFF0C;&#x5C31;&#x4F1A;&#x8DF3;&#x51FA;&#x533A;&#x5757;&#x3002;</p><p>continue &#x8BED;&#x53E5;&#x4E5F;&#x53EF;&#x4EE5;&#x4E0E;&#x6807;&#x7B7E;&#x914D;&#x5408;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="top:
  for (var i = 0; i &lt; 3; i++){
    for (var j = 0; j &lt; 3; j++){
      if (i === 1 &amp;&amp; j === 1) continue top;
      console.log(&apos;i=&apos; + i + &apos;, j=&apos; + j);
    }
  }
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
// i=2, j=0
// i=2, j=1
// i=2, j=2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>top:
  for (var <span class="hljs-attr">i</span> = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">3</span>; i++){
    for (var <span class="hljs-attr">j</span> = <span class="hljs-number">0</span>; j &lt; <span class="hljs-number">3</span>; j++){
      <span class="hljs-keyword">if</span> (<span class="hljs-attr">i</span> === <span class="hljs-number">1</span> &amp;&amp; <span class="hljs-attr">j</span> === <span class="hljs-number">1</span>) continue top;
      console.log(&apos;<span class="hljs-attr">i=&apos;</span> + i + &apos;, <span class="hljs-attr">j=&apos;</span> + j);
    }
  }
// <span class="hljs-attr">i=0,</span> <span class="hljs-attr">j=0</span>
// <span class="hljs-attr">i=0,</span> <span class="hljs-attr">j=1</span>
// <span class="hljs-attr">i=0,</span> <span class="hljs-attr">j=2</span>
// <span class="hljs-attr">i=1,</span> <span class="hljs-attr">j=0</span>
// <span class="hljs-attr">i=2,</span> <span class="hljs-attr">j=0</span>
// <span class="hljs-attr">i=2,</span> <span class="hljs-attr">j=1</span>
// <span class="hljs-attr">i=2,</span> <span class="hljs-attr">j=2</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;continue &#x547D;&#x4EE4;&#x540E;&#x9762;&#x6709;&#x4E00;&#x4E2A;&#x6807;&#x7B7E;&#x540D;&#xFF0C;&#x6EE1;&#x8DB3;&#x6761;&#x4EF6;&#x65F6;&#xFF0C;&#x4F1A;&#x8DF3;&#x8FC7;&#x5F53;&#x524D;&#x5FAA;&#x73AF;&#xFF0C;&#x76F4;&#x63A5;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x8F6E; <strong>&#x5916;&#x5C42;&#x5FAA;&#x73AF;&#x3002;</strong> &#x5982;&#x679C; continue &#x8BED;&#x53E5;&#x540E;&#x9762;&#x4E0D;&#x4F7F;&#x7528;&#x6807;&#x7B7E;&#xFF0C;&#x5219;&#x53EA;&#x80FD;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x8F6E;&#x7684; <strong>&#x5185;&#x5C42;&#x5FAA;&#x73AF;&#x3002;</strong></p><p>&#x5C0F;&#x6C6A;&#x7ECF;&#x8FC7;&#x5B9E;&#x8DF5;&#x5F97;&#x51FA;&#x4EE5;&#x4E0B;&#x7528;&#x9014;&#x3002;</p><p><strong>&#x7528;&#x9014;&#xFF1A;</strong></p><ul><li>&#x53EF;&#x4EE5;&#x8DF3;&#x51FA;&#x5FAA;&#x73AF;&#x3002;</li><li>&#x5BF9;&#x4E8E;&#x591A;&#x5C42;&#x5FAA;&#x73AF;&#x4E5F;&#x540C;&#x6837;&#x9002;&#x7528;&#x3002;</li><li>&#x7279;&#x522B;&#x662F;&#x4E24;&#x5C42;&#x6216;&#x8005;&#x591A;&#x5C42;&#x5FAA;&#x73AF;&#xFF0C;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x627E;&#x5230;&#x60F3;&#x8981;&#x7684;&#x67D0;&#x4E2A;&#x503C;&#x65F6;&#xFF0C;&#x800C;&#x5FAA;&#x73AF;&#x7684;&#x6570;&#x636E;&#x662F;&#x5927;&#x91CF;&#x7684;&#xFF0C;&#x7528;&#x6807;&#x7B7E;&#x5C31;&#x975E;&#x5E38;&#x9AD8;&#x6548;&#x3002;</li></ul><h1 id="articleHeader2">2. &#x533A;&#x5206;&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;</h1><p>&#x5148;&#x6765;&#x9053;&#x9762;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(typeof window)
console.log(typeof {}) 
console.log(typeof [])
console.log(typeof null)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> {}) 
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> [])
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> <span class="hljs-literal">null</span>)</code></pre><p>&#x7B54;&#x6848;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;object&quot;
&quot;object&quot;
&quot;object&quot;
&quot;object&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">&quot;object&quot;</span>
<span class="hljs-string">&quot;object&quot;</span>
<span class="hljs-string">&quot;object&quot;</span>
<span class="hljs-string">&quot;object&quot;</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;null &#x8FD4;&#x56DE; object &#x3002;&#x8FD9;&#x662F;&#x7531;&#x4E8E;&#x5386;&#x53F2;&#x539F;&#x56E0;&#x9020;&#x6210;&#x7684;&#xFF0C;&#x4E14;&#x4E00;&#x5207;&#x539F;&#x578B;&#x94FE;&#x7684;&#x7EC8;&#x70B9;&#x90FD;&#x662F; null&#x3002;<br>&#x7A7A;&#x6570;&#x7EC4;&#xFF08; [] &#xFF09;&#x7684;&#x7C7B;&#x578B;&#x4E5F;&#x662F; object&#xFF0C;&#x8FD9;&#x8868;&#x793A;&#x5728; JavaScript &#x5185;&#x90E8;&#xFF0C;&#x6570;&#x7EC4;&#x672C;&#x8D28;&#x4E0A;&#x53EA;&#x662F;&#x4E00;&#x79CD;&#x7279;&#x6B8A;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x800C; instanceof &#x8FD0;&#x7B97;&#x7B26;&#x53EF;&#x4EE5;&#x533A;&#x5206;&#x6570;&#x7EC4;&#x548C;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o = {};
var a = [];

o instanceof Array // false
a instanceof Array // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> o = {};
<span class="hljs-keyword">var</span> a = [];

o <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> <span class="hljs-comment">// false</span>
a <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span> <span class="hljs-comment">// true</span></code></pre><h1 id="articleHeader3">3. null, undefined &#x548C;&#x5E03;&#x5C14;&#x503C;</h1><p>&#x7ECF;&#x5E38;&#x4F1A;&#x6709;&#x9762;&#x8BD5;&#x5B98;&#x95EE;&#xFF1A;null &#x4E0E; undefined &#x7684;&#x533A;&#x522B; &#xFF1F;</p><p>&#x533A;&#x522B;&#xFF1A;</p><ul><li><strong>null &#x662F;&#x4E00;&#x4E2A;&#x8868;&#x793A;&#x201C;&#x7A7A;&#x201D;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x8F6C;&#x4E3A;&#x6570;&#x503C;&#x65F6;&#x4E3A; 0 &#x3002;</strong></li><li><strong>undefined &#x662F;&#x4E00;&#x4E2A;&#x8868;&#x793A;&quot;&#x6B64;&#x5904;&#x65E0;&#x5B9A;&#x4E49;&quot;&#x7684;&#x539F;&#x59CB;&#x503C;&#xFF0C;&#x8F6C;&#x4E3A;&#x6570;&#x503C;&#x65F6;&#x4E3A; NaN&#x3002;</strong></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Number(null) // 0
5 + null // 5

Number(undefined) // NaN
5 + undefined // NaN" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">Number</span>(<span class="hljs-literal">null</span>) <span class="hljs-comment">// 0</span>
<span class="hljs-number">5</span> + <span class="hljs-literal">null</span> <span class="hljs-comment">// 5</span>

<span class="hljs-built_in">Number</span>(<span class="hljs-literal">undefined</span>) <span class="hljs-comment">// NaN</span>
<span class="hljs-number">5</span> + <span class="hljs-literal">undefined</span> <span class="hljs-comment">// NaN</span></code></pre><h3 id="articleHeader4">3.1 &#x7528;&#x6CD5;&#x548C;&#x542B;&#x4E49;</h3><p>&#x5BF9;&#x4E8E; null &#x548C; undefined&#xFF0C;&#x5927;&#x81F4;&#x53EF;&#x4EE5;&#x50CF;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x7406;&#x89E3;&#x3002;</p><p>null &#x8868;&#x793A;&#x7A7A;&#x503C;&#xFF0C;&#x5373;&#x8BE5;&#x5904;&#x7684;&#x503C;&#x73B0;&#x5728;&#x4E3A;&#x7A7A;&#x3002;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x67D0;&#x4E2A;&#x53C2;&#x6570;&#x672A;&#x8BBE;&#x7F6E;&#x4EFB;&#x4F55;&#x503C;&#xFF0C;&#x8FD9;&#x65F6;&#x5C31;&#x53EF;&#x4EE5;&#x4F20;&#x5165; null&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x53C2;&#x6570;&#x4E3A;&#x7A7A;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x67D0;&#x4E2A;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x5F15;&#x64CE;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x8FD0;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x672A;&#x51FA;&#x9519;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x4F1A;&#x4F20;&#x5165; null &#xFF0C;&#x8868;&#x793A;&#x672A;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x3002;</p><p>undefined &#x8868;&#x793A;&#x201C;&#x672A;&#x5B9A;&#x4E49;&#x201D;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x8FD4;&#x56DE; undefined &#x7684;&#x5178;&#x578B;&#x573A;&#x666F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x53D8;&#x91CF;&#x58F0;&#x660E;&#x4E86;&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x8D4B;&#x503C;
var i;
i // undefined

// &#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x5E94;&#x8BE5;&#x63D0;&#x4F9B;&#x7684;&#x53C2;&#x6570;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#xFF0C;&#x8BE5;&#x53C2;&#x6570;&#x7B49;&#x4E8E; undefined
function f(x) {
  return x;
}
f() // undefined

// &#x5BF9;&#x8C61;&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x7684;&#x5C5E;&#x6027;
var  o = new Object();
o.p // undefined

// &#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x65F6;&#xFF0C;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE; undefined
function f() {}
f() // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x53D8;&#x91CF;&#x58F0;&#x660E;&#x4E86;&#xFF0C;&#x4F46;&#x6CA1;&#x6709;&#x8D4B;&#x503C;</span>
<span class="hljs-keyword">var</span> i;
i <span class="hljs-comment">// undefined</span>

<span class="hljs-comment">// &#x8C03;&#x7528;&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x5E94;&#x8BE5;&#x63D0;&#x4F9B;&#x7684;&#x53C2;&#x6570;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#xFF0C;&#x8BE5;&#x53C2;&#x6570;&#x7B49;&#x4E8E; undefined</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x</span>) </span>{
  <span class="hljs-keyword">return</span> x;
}
f() <span class="hljs-comment">// undefined</span>

<span class="hljs-comment">// &#x5BF9;&#x8C61;&#x6CA1;&#x6709;&#x8D4B;&#x503C;&#x7684;&#x5C5E;&#x6027;</span>
<span class="hljs-keyword">var</span>  o = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
o.p <span class="hljs-comment">// undefined</span>

<span class="hljs-comment">// &#x51FD;&#x6570;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#x503C;&#x65F6;&#xFF0C;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE; undefined</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{}
f() <span class="hljs-comment">// undefined</span></code></pre><p>&#x6CE8;&#x610F;&#xFF0C;&#x5E03;&#x5C14;&#x503C;&#x8F6C;&#x6362;&#x7684;&#x65F6;&#x5019;&#xFF0C;<strong>&#x7A7A;&#x6570;&#x7EC4;&#xFF08;[]&#xFF09;&#x548C;&#x7A7A;&#x5BF9;&#x8C61;&#xFF08;{}&#xFF09;&#x5BF9;&#x5E94;&#x7684;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x90FD;&#x662F;true&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ([]) {
  console.log(&apos;true&apos;);
}
// true

if ({}) {
  console.log(&apos;true&apos;);
}
// true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">if</span> ([]) {
  <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">&apos;true&apos;</span>);
}
<span class="hljs-comment">// true</span>

<span class="hljs-selector-tag">if</span> ({}) {
  <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">&apos;true&apos;</span>);
}
<span class="hljs-comment">// true</span></code></pre><h1 id="articleHeader5">4. &#x6570;&#x503C;</h1><p>JavaScript &#x5185;&#x90E8;&#xFF0C;&#x6240;&#x6709;&#x6570;&#x5B57;&#x90FD;&#x662F;&#x4EE5; 64 &#x4F4D;&#x6D6E;&#x70B9;&#x6570;&#x5F62;&#x5F0F;&#x50A8;&#x5B58;&#xFF0C;&#x5373;&#x4F7F;&#x6574;&#x6570;&#x4E5F;&#x662F;&#x5982;&#x6B64;&#x3002;&#x6240;&#x4EE5;&#xFF0C;1 &#x4E0E; 1.0 &#x662F;&#x76F8;&#x540C;&#x7684;&#xFF0C;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 === 1.0 // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs basic"><code style="word-break:break-word;white-space:initial"><span class="hljs-symbol">1 </span>=== <span class="hljs-number">1.0</span> // true</code></pre><p>JavaScript &#x8BED;&#x8A00;&#x7684;&#x5E95;&#x5C42;&#x6839;&#x672C;&#x6CA1;&#x6709;&#x6574;&#x6570;&#xFF0C;&#x6240;&#x6709;&#x6570;&#x5B57;&#x90FD;&#x662F;&#x5C0F;&#x6570;&#xFF08; 64 &#x4F4D;&#x6D6E;&#x70B9;&#x6570;&#xFF09;&#x3002;&#x5BB9;&#x6613;&#x9020;&#x6210;&#x6DF7;&#x6DC6;&#x7684;&#x662F;&#xFF0C;&#x67D0;&#x4E9B;&#x8FD0;&#x7B97;&#x53EA;&#x6709;&#x6574;&#x6570;&#x624D;&#x80FD;&#x5B8C;&#x6210;&#xFF0C;&#x6B64;&#x65F6; JavaScript &#x4F1A;&#x81EA;&#x52A8;&#x628A; 64 &#x4F4D;&#x6D6E;&#x70B9;&#x6570;&#xFF0C;&#x8F6C;&#x6210; 32 &#x4F4D;&#x6574;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x8FD0;&#x7B97;&#x3002;</p><p><strong>&#x7531;&#x4E8E;&#x6D6E;&#x70B9;&#x6570;&#x4E0D;&#x662F;&#x7CBE;&#x786E;&#x7684;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x6D89;&#x53CA;&#x5C0F;&#x6570;&#x7684;&#x6BD4;&#x8F83;&#x548C;&#x8FD0;&#x7B97;&#x8981;&#x7279;&#x522B;&#x5C0F;&#x5FC3;&#x3002;</strong></p><p>&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0.1 + 0.2 === 0.3
// false

0.3 / 0.1
// 2.9999999999999996

(0.3 - 0.2) === (0.2 - 0.1)
// false

2.22 + 2.21
// 4.43 

3.45 + 1.11
// 4.5600000000000005

2.22 + 2.24
// 4.460000000000001" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">0.1</span> + <span class="hljs-number">0.2</span> === <span class="hljs-number">0.3</span>
<span class="hljs-comment">// false</span>

<span class="hljs-number">0.3</span> / <span class="hljs-number">0.1</span>
<span class="hljs-comment">// 2.9999999999999996</span>

(<span class="hljs-number">0.3</span> - <span class="hljs-number">0.2</span>) === (<span class="hljs-number">0.2</span> - <span class="hljs-number">0.1</span>)
<span class="hljs-comment">// false</span>

<span class="hljs-number">2.22</span> + <span class="hljs-number">2.21</span>
<span class="hljs-comment">// 4.43 </span>

<span class="hljs-number">3.45</span> + <span class="hljs-number">1.11</span>
<span class="hljs-comment">// 4.5600000000000005</span>

<span class="hljs-number">2.22</span> + <span class="hljs-number">2.24</span>
<span class="hljs-comment">// 4.460000000000001</span></code></pre><p>&#x4F46;&#x662F;&#x5546;&#x54C1;&#x8BA1;&#x7B97;&#x91D1;&#x989D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x91D1;&#x989D;&#x7684;&#x7ED3;&#x679C;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x4FDD;&#x7559;&#x4E24;&#x500D;&#x5C0F;&#x6570;&#x70B9;&#x7684;&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;</p><p>&#x53EF;&#x4EE5;&#x7528; <strong>toFixed</strong> &#x89E3;&#x51B3;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 2.22 + 2.24
// 4.460000000000001
var result = (a).toFixed(2)
// 4.46" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> <span class="hljs-selector-tag">a</span> = <span class="hljs-number">2.22</span> + <span class="hljs-number">2.24</span>
<span class="hljs-comment">// 4.460000000000001</span>
<span class="hljs-selector-tag">var</span> result = (a).toFixed(<span class="hljs-number">2</span>)
<span class="hljs-comment">// 4.46</span></code></pre><h1 id="articleHeader6">5. Object &#x5C5E;&#x6027;&#x7684;&#x904D;&#x5386;</h1><p>for...in &#x5FAA;&#x73AF;&#x7528;&#x6765;&#x904D;&#x5386;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5168;&#x90E8;&#x5C5E;&#x6027;(&#x5305;&#x62EC;&#x53EF;&#x904D;&#x5386;&#x7684;&#x7EE7;&#x627F;&#x7684;&#x5C5E;&#x6027;)&#x3002;&#x4F46;&#x662F;&#xFF0C;<strong>&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x90FD;&#x662F;&#x53EA;&#x60F3;&#x904D;&#x5386;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;</strong>&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528; for...in &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5E94;&#x8BE5;&#x7ED3;&#x5408;&#x4F7F;&#x7528; hasOwnProperty &#x65B9;&#x6CD5;&#xFF0C;&#x5728;&#x5FAA;&#x73AF;&#x5185;&#x90E8;&#x5224;&#x65AD;&#x4E00;&#x4E0B;&#xFF0C;&#x67D0;&#x4E2A;&#x5C5E;&#x6027;&#x662F;&#x5426;&#x4E3A;&#x5BF9;&#x8C61;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var person = { name: &apos;&#x8001;&#x5F20;&apos; };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> person = { name: &apos;&#x8001;&#x5F20;&apos; };

<span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> <span class="hljs-built_in">key</span> <span class="hljs-keyword">in</span> person) {
  <span class="hljs-keyword">if</span> (person.hasOwnProperty(<span class="hljs-built_in">key</span>)) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">key</span>);
  }
}
// name</code></pre><h1 id="articleHeader7">&#x6700;&#x540E;</h1><p>&#x91CD;&#x5927;&#x4E8B;&#x4EF6;&#xFF1A;<strong>2017&#x5E74;11&#x6708;&#xFF0C;&#x6240;&#x6709;&#x4E3B;&#x6D41;&#x6D4F;&#x89C8;&#x5668;&#x5168;&#x90E8;&#x652F;&#x6301; WebAssembly&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x4EFB;&#x4F55;&#x8BED;&#x8A00;&#x90FD;&#x53EF;&#x4EE5;&#x7F16;&#x8BD1;&#x6210; JavaScript&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x8FD0;&#x884C;&#x3002;</strong></p><p><strong>&#x524D;&#x7AEF;&#x8FD8;&#x662F;&#x5F88;&#x6709;&#x672A;&#x6765;&#x7684; &#xFF01;&#xFF01;&#xFF01;</strong></p><p>&#x4E0B;&#x8282;&#x5185;&#x5BB9;&#xFF1A;<a href="https://segmentfault.com/a/1190000016512527">&#x7EC6;&#x6570; JavaScript &#x5B9E;&#x7528;&#x9ED1;&#x79D1;&#x6280;(&#x4E8C;)</a> &#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x8BE5;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5230;&#x6211;&#x7684; github star &#x4E00;&#x4E0B;&#xFF0C;&#x8C22;&#x8C22;&#x3002;</p><p><a href="https://github.com/biaochenxuying/blog" rel="nofollow noreferrer" target="_blank">github &#x5730;&#x5740;</a></p><p>&#x53C2;&#x8003;&#x6559;&#x7A0B;&#xFF1A; <a href="https://wangdoc.com/javascript/" rel="nofollow noreferrer" target="_blank">&#x300A;JavaScript &#x8BED;&#x8A00;&#x5165;&#x95E8;&#x6559;&#x7A0B;&#x300B;</a></p><p>&#x4F60;&#x4EE5;&#x4E3A;&#x672C;&#x6587;&#x5C31;&#x8FD9;&#x4E48;&#x7ED3;&#x675F;&#x4E86; ? <strong>&#x7CBE;&#x5F69;&#x5728;&#x540E;&#x9762; &#xFF01;&#xFF01;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016460783" src="https://static.alili.tech/img/remote/1460000016460783" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5BF9; <strong>&#x5168;&#x6808;&#x5F00;&#x53D1;</strong> &#x6709;&#x5174;&#x8DA3;&#x7684;&#x670B;&#x53CB;&#x53EF;&#x4EE5;&#x626B;&#x4E0B;&#x65B9;&#x4E8C;&#x7EF4;&#x7801;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x516C;&#x4F17;&#x53F7;</p><p>&#x6211;&#x4F1A;&#x4E0D;&#x5B9A;&#x671F;&#x66F4;&#x65B0;&#x6709;&#x4EF7;&#x503C;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><blockquote>&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;<strong>BiaoChenXuYing</strong><br>&#x5206;&#x4EAB; &#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x3001;&#x540E;&#x7AEF;&#x5F00;&#x53D1; &#x7B49;&#x76F8;&#x5173;&#x7684;&#x6280;&#x672F;&#x6587;&#x7AE0;&#xFF0C;&#x70ED;&#x70B9;&#x8D44;&#x6E90;&#xFF0C;&#x5168;&#x6808;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x6210;&#x957F;&#x4E4B;&#x8DEF;&#x3002;</blockquote><p>&#x5173;&#x6CE8;&#x516C;&#x4F17;&#x53F7;&#x5E76;&#x56DE;&#x590D; <strong>&#x798F;&#x5229;</strong> &#x4FBF;&#x514D;&#x8D39;&#x9001;&#x4F60;&#x89C6;&#x9891;&#x8D44;&#x6E90;&#xFF0C;&#x7EDD;&#x5BF9;&#x5E72;&#x8D27;&#x3002;</p><p>&#x798F;&#x5229;&#x8BE6;&#x60C5;&#x8BF7;&#x70B9;&#x51FB;&#xFF1A; <a href="https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&amp;mid=2247483711&amp;idx=1&amp;sn=1ffb576159805e92fc57f5f1120fce3a&amp;chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&amp;token=1560489745&amp;lang=zh_CN#rd" rel="nofollow noreferrer" target="_blank">&#x514D;&#x8D39;&#x8D44;&#x6E90;&#x5206;&#x4EAB;--Python&#x3001;Java&#x3001;Linux&#x3001;Go&#x3001;node&#x3001;vue&#x3001;react&#x3001;javaScript</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016505245" src="https://static.alili.tech/img/remote/1460000016505245" alt="BiaoChenXuYing" title="BiaoChenXuYing" style="cursor:pointer"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
细数 JavaScript 实用黑科技(一)

## 原文链接
[https://segmentfault.com/a/1190000016507835](https://segmentfault.com/a/1190000016507835)


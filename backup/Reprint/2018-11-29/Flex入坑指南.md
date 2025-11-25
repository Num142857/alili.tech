---
title: 'Flex入坑指南' 
date: 2018-11-29 9:27:39
hidden: true
slug: 9a4sle7n5f
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x5F39;&#x6027;&#x5E03;&#x5C40;<code>flex</code>&#x662F;&#x4E00;&#x4E2A;&#x51E0;&#x5E74;&#x524D;&#x7684;CSS&#x5C5E;&#x6027;&#x4E86;&#xFF0C;&#x8BF4;&#x5B83;&#x89E3;&#x653E;&#x4E86;&#x4E00;&#x90E8;&#x5206;&#x751F;&#x4EA7;&#x529B;&#x4E0D;&#x4E3A;&#x8FC7;&#x3002;<em>&#x81F3;&#x5C11;&#x89E3;&#x653E;&#x4E86;&#x4E0D;&#x5C11;CSS&#x5E03;&#x5C40;&#x76F8;&#x5173;&#x7684;&#x9762;&#x8BD5;&#x9898; :)</em>  <br>&#x4E4B;&#x524D;&#x7F51;&#x4E0A;&#x6D41;&#x884C;&#x7684;&#x5404;&#x79CD;<em>XX&#x5E03;&#x5C40;</em>&#xFF0C;&#x4EC0;&#x4E48;<code>postion: absolute</code>+<code>margin</code>&#xFF0C;<code>float</code>+<code>padding</code>&#xFF0C;&#x5404;&#x79CD;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>flex</code>&#x6765;&#x53D6;&#x4EE3;&#x4E4B;&#x3002;  <br>&#x65E9;&#x4E24;&#x5E74;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD8;&#x662F;&#x4F1A;&#x62C5;&#x5FC3;&#x6709;&#x517C;&#x5BB9;&#x6027;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x67D0;&#x4E9B;&#x624B;&#x673A;&#x5728;&#x4F7F;&#x7528;&#x4E86;<code>auto-prefixer</code>&#x4EE5;&#x540E;&#x4F9D;&#x7136;&#x4F1A;&#x51FA;&#x73B0;&#x4E0D;&#x517C;&#x5BB9;&#x7684;&#x95EE;&#x9898;&#x3002;  <br>&#x597D;&#x5728;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x662F;2018&#x5E74;&#x4E86;&#xFF0C;&#x4E0D;&#x5FC5;&#x518D;&#x62C5;&#x5FC3;&#x90A3;&#x4E9B;&#x8001;&#x65E7;&#x7684;&#x8BBE;&#x5907;&#xFF0C;&#x5E0C;&#x671B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x80FD;&#x5E2E;&#x4F60;&#x52A0;&#x6DF1;&#x5BF9;<code>flex</code>&#x7684;&#x8BA4;&#x8BC6;&#x3002;</p>
<h2 id="articleHeader0">&#x51C6;&#x5907;&#x5DE5;&#x4F5C;</h2>
<p>&#x9996;&#x5148;&#xFF0C;<code>flex</code>&#x88AB;&#x79F0;&#x4E3A;&#x4E00;&#x4E2A;&#x5F39;&#x6027;&#x76D2;&#x6A21;&#x578B;&#xFF0C;&#x4E5F;&#x6709;&#x79F0;&#x5F39;&#x6027;&#x5E03;&#x5C40;&#x7684;&#x3002;  <br>&#x603B;&#x4E4B;&#xFF0C;&#x76D2;&#x5B50;&#x4E5F;&#x597D;&#x3001;&#x5E03;&#x5C40;&#x4E5F;&#x7F62;&#xFF0C;&#x6211;&#x4EEC;&#x603B;&#x662F;&#x9700;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;<code>Container</code>&#x7684;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;container&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x4EE5;&#x53CA;&#x5982;&#x679C;&#x5355;&#x7EAF;&#x7684;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#x7684;&#x8BDD;&#xFF0C;&#x662F;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x610F;&#x4E49;&#x7684;&#x3002;  <br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x6709;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;contianer&quot;&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;contianer&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x4E0B;&#x8FB9;&#x7684;&#x6240;&#x6709;&#x4F8B;&#x5B50;&#x57FA;&#x672C;&#x90FD;&#x662F;&#x57FA;&#x4E8E;&#x4EE5;&#x4E0A;DOM&#x7ED3;&#x6784;&#x6765;&#x505A;&#x7684;&#x3002;</p>
<h2 id="articleHeader1">&#x57FA;&#x672C;&#x8BED;&#x6CD5;</h2>
<p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x6709;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5199;<code>flex</code>&#x5E03;&#x5C40;&#x7684;<code>html</code>&#x7ED3;&#x6784;&#x3002;  <br>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x57FA;&#x7840;&#x7684;<code>flex</code>&#x5E03;&#x5C40;&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
  .container {
    display: flex;
    height: 50px;

    color: #fff;
    border: 1px solid #03a9f4;
  }

  .item {
    flex: 1;

    text-align: center;
    background: #03a9f4;
  }
&lt;/style&gt;
&lt;div class=&quot;contianer&quot;&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
  &lt;div class=&quot;item&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;

    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#03a9f4</span>;
  }

  <span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;

    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#03a9f4</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;contianer&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x6211;&#x4EEC;&#x5728;&#x5BB9;&#x5668;&#x4E0A;&#x4F7F;&#x7528;<code>display: flex</code>&#x6765;&#x544A;&#x8BC9;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;<code>flex</code>&#x5E03;&#x5C40;&#x7684;&#x5F00;&#x59CB;&#x3002;  <br>&#x7136;&#x540E;&#x7ED9;&#x6240;&#x6709;&#x7684;<code>item</code>&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>flex: 1</code>&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6765;&#x8868;&#x660E;&#xFF0C;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x8FB9;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x4F1A;&#x6CBF;&#x7740;<strong>&#x4E3B;&#x8F74;</strong>&#x6765;<strong>&#x5E73;&#x5206;</strong>&#x6240;&#x6709;&#x7684;&#x533A;&#x57DF;&#xFF0C;&#x5C31;&#x8FD9;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x591A;&#x5217;&#x7B49;&#x5BBD;&#x5E03;&#x5C40;&#x3002;  </p>
<p>&#x5173;&#x4E8E;<code>flex</code>&#xFF0C;&#x6700;&#x91CD;&#x8981;&#x7684;&#x5C31;&#x662F;&#x8981;&#x8BB0;&#x4F4F;&#x4ED6;&#x6709;&#x4E24;&#x6761;&#x8F74;&#x7EBF;&#xFF08;&#x4E3B;&#x8F74;&#x3001;&#x4EA4;&#x53C9;&#x8F74;&#xFF09;&#xFF0C;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x5C5E;&#x6027;&#x90FD;&#x662F;&#x4F9D;&#x8D56;&#x4E8E;&#x8F74;&#x7EBF;&#x7684;&#x65B9;&#x5411;&#x3002;  <br><span class="img-wrap"><img data-src="https://mdn.mozillademos.org/files/12998/flexbox.png" src="https://static.alili.techhttps://mdn.mozillademos.org/files/12998/flexbox.png" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>&#x56FE;&#x7247;&#x6765;&#x81EA;<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes" rel="nofollow noreferrer" target="_blank">MDN</a>
</blockquote>
<p>&#x56E0;&#x4E3A;<code>flex</code>&#x5E03;&#x5C40;&#x5206;&#x4E3A;&#x4E86;&#x5BB9;&#x5668;&#x548C;&#x5185;&#x5BB9;&#x4E24;&#x5757;&#xFF0C;&#x5404;&#x81EA;&#x6709;&#x5404;&#x81EA;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x5148;&#x4ECE;&#x5BB9;&#x5668;&#x7C7B;&#x7684;&#x8BF4;&#x8D77;&#x3002;</p>
<h2 id="articleHeader2">&#x5BB9;&#x5668;&#x76F8;&#x5173;&#x7684;flex&#x5C5E;&#x6027;</h2>
<p>&#x5B9E;&#x73B0;&#x4E0A;&#x8FB9;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x662F;&#x4F9D;&#x8D56;&#x4E8E;&#x5F88;&#x591A;&#x9ED8;&#x8BA4;&#x5C5E;&#x6027;&#x503C;&#x3002;  <br>&#x6BD4;&#x5982;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x4EEC;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x4F1A;&#x6A2A;&#x5411;&#x7684;&#x8FDB;&#x884C;&#x5206;&#x5272;&#x7A7A;&#x95F4;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7AD6;&#x5411;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x7528;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x9ED8;&#x8BA4;&#x503C;&#xFF1A;</p>
<h3 id="articleHeader3">flex-direction</h3>
<p><code>flex-direction</code>&#x7528;&#x4E8E;&#x5B9A;&#x4E49;<code>flex</code>&#x5E03;&#x5C40;&#x4E2D;&#x7684;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x3002;  <br>&#x9ED8;&#x8BA4;&#x53D6;&#x503C;&#x4E3A;<code>row</code>&#xFF0C;&#x662F;&#x6A2A;&#x5411;&#x7684;&#xFF0C;&#x8868;&#x793A;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x6211;&#x4EEC;&#x7684;&#x6240;&#x6709;&#x5B50;&#x5143;&#x7D20;&#x4F1A;&#x6309;&#x7167;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#x7684;&#x987A;&#x5E8F;&#x8FDB;&#x884C;&#x6392;&#x5217;&#x3002;  <br>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BBE;&#x7F6E;&#x503C;&#x4E3A;<code>column</code>&#x6765;&#x6539;&#x53D8;&#x4E3B;&#x8F74;&#x7684;&#x65B9;&#x5411;&#xFF0C;&#x5C06;&#x5176;&#x4FEE;&#x6539;&#x4E3A;&#x4ECE;&#x4E0A;&#x5230;&#x4E0B;&#x3002;&#xFF08;&#x6539;&#x53D8;<code>flex-direction</code>&#x7684;&#x503C;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x4E00;&#x4E9B;&#x76F8;&#x5173;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4F1A;&#x5728;&#x4E0B;&#x8FB9;&#x8BF4;&#x5230;&#xFF09;  </p>
<p><code>flex-direction</code>&#x5171;&#x6709;&#x56DB;&#x4E2A;&#x6709;&#x6548;&#x503C;&#x53EF;&#x9009;&#xFF1A;</p>
<ol>
<li>
<code>row</code> &#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;</li>
<li>
<code>row-reverse</code> &#x4ECE;&#x53F3;&#x5230;&#x5DE6;</li>
<li>
<code>column</code> &#x4ECE;&#x4E0A;&#x5230;&#x4E0B;</li>
<li>
<code>column-reverse</code> &#x4ECE;&#x4E0B;&#x5230;&#x4E0A;</li>
</ol>
<p><em>P.S. &#x5728;React-Native&#x4E2D;&#x9ED8;&#x8BA4;&#x7684;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x4E3A;<code>column</code></em></p>
<p>&#x6240;&#x4EE5;&#x8BF4;<code>flex-direction</code>&#x7684;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#xFF1A;<strong>&#x5B9A;&#x4E49;&#x5BB9;&#x5668;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x6392;&#x5217;&#x65B9;&#x5411;</strong></p>
<h3 id="articleHeader4">flex-wrap</h3>
<p>&#x8BE5;&#x5C5E;&#x6027;&#x7528;&#x4E8E;&#x5B9A;&#x4E49;&#x5F53;&#x5B50;&#x5143;&#x7D20;&#x6CBF;&#x7740;&#x4E3B;&#x8F74;&#x8D85;&#x51FA;&#x5BB9;&#x5668;&#x8303;&#x56F4;&#x540E;&#xFF0C;&#x5E94;&#x8BE5;&#x6309;&#x7167;&#x600E;&#x6837;&#x7684;&#x89C4;&#x5219;&#x8FDB;&#x884C;&#x6392;&#x5217;&#x3002;  <br>&#x8BE5;&#x5C5E;&#x6027;&#x53EA;&#x6709;&#x7B80;&#x5355;&#x7684;&#x4E09;&#x4E2A;&#x53D6;&#x503C;&#xFF1A;</p>
<ol>
<li>
<code>wrap</code> &#x8D85;&#x51FA;&#x4E3B;&#x8F74;&#x8303;&#x56F4;&#x540E;&#x6362;&#x884C;&#x663E;&#x793A;&#xFF0C;&#x6362;&#x884C;&#x65B9;&#x5411;&#x6309;&#x7167;&#x4EA4;&#x53C9;&#x8F74;&#x7684;&#x65B9;&#x5411;&#x6765;&#xFF08;<em>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x5C31;&#x662F;&#x6298;&#x884C;&#x5230;&#x4E0B;&#x4E00;&#x884C;</em>&#xFF09;</li>
<li>
<code>wrap-reverse</code> &#x8D85;&#x51FA;&#x4E3B;&#x8F74;&#x8303;&#x56F4;&#x540E;&#x6362;&#x884C;&#x663E;&#x793A;&#xFF0C;&#x4F46;&#x662F;&#x65B9;&#x5411;&#x662F;&#x4EA4;&#x53C9;&#x8F74;&#x7684;&#x53CD;&#x5411;&#xFF08;<em>&#x4E5F;&#x5C31;&#x662F;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x7B2C;&#x4E00;&#x884C;&#x4F1A;&#x51FA;&#x73B0;&#x5728;&#x6700;&#x4E0B;&#x8FB9;</em>&#xFF09;</li>
<li>
<code>nowrap</code> &#x5373;&#x4F7F;&#x8D85;&#x51FA;&#x5BB9;&#x5668;&#x4E5F;&#x4E0D;&#x4F1A;&#x8FDB;&#x884C;&#x6362;&#x884C;&#xFF0C;&#x800C;&#x662F;&#x5C1D;&#x8BD5;&#x538B;&#x7F29;&#x5185;&#x90E8;flex&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;<em>&#x5728;&#x4E0B;&#x8FB9;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x76F8;&#x5173;&#x7684;&#x5C5E;&#x6027;&#x4F1A;&#x8BB2;&#x5230;</em>&#xFF09;</li>
</ol>
<p>&#x4E09;&#x79CD;&#x53D6;&#x503C;&#x7684;&#x793A;&#x4F8B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbbKq8" src="https://static.alili.tech/img/bVbbKq8" alt="g0no.png" title="g0no.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">flex-flow</h3>
<p><code>flex-flow</code>&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5199;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x9002;&#x7528;&#x4E8E;&#x4E0A;&#x8FB9;&#x63D0;&#x5230;&#x7684;<code>flex-direction</code>&#x548C;<code>flex-wrap</code>  </p>
<p>&#x8BED;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selector {
  flex-flow: &lt;flex-direction&gt; &lt;flex-wrap&gt;;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">selector</span> {
  <span class="hljs-attribute">flex-flow</span>: &lt;flex-direction&gt; &lt;flex-wrap&gt;;
}</code></pre>
<h3 id="articleHeader6">justify-content</h3>
<p>&#x8FD9;&#x4E2A;&#x4F1A;&#x5B9A;&#x4E49;&#x6211;&#x4EEC;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x5982;&#x4F55;&#x6CBF;&#x7740;&#x4E3B;&#x8F74;&#x8FDB;&#x884C;&#x6392;&#x5217;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x4E0A;&#x8FB9;&#x662F;&#x76F4;&#x63A5;&#x586B;&#x5145;&#x6EE1;&#x4E86;&#x7236;&#x5143;&#x7D20;&#xFF0C;&#x4E0D;&#x592A;&#x80FD;&#x770B;&#x51FA;&#x6548;&#x679C;&#x3002;  <br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5BF9;&#x4EE3;&#x7801;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style media=&quot;screen&quot;&gt;
  .container {
    display: flex;
    width: 400px;

    color: #fff;
    border: 1px solid #03a9f4;
  }

  .item {
    /* flex: 1; */
    width: 100px;

    text-align: center;
    background: #03a9f4;
  }
&lt;/style&gt;
&lt;div class=&quot;container&quot;&gt;
  &lt;div class=&quot;item&quot;&gt;Item 1&lt;/div&gt;
  &lt;div class=&quot;item&quot;&gt;Item 2&lt;/div&gt;
  &lt;div class=&quot;item&quot;&gt;Item 3&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">media</span>=<span class="hljs-string">&quot;screen&quot;</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;

    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#03a9f4</span>;
  }

  <span class="hljs-selector-class">.item</span> {
    <span class="hljs-comment">/* flex: 1; */</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;

    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#03a9f4</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>Item 1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>Item 2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>Item 3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&#x5C06;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x90FD;&#x6539;&#x4E3A;&#x56FA;&#x5B9A;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x7236;&#x5143;&#x7D20;&#x6709;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x4F1A;&#x7A7A;&#x5728;&#x90A3;&#x91CC;&#x3002;  <br><code>justify-content</code>&#x7684;&#x9ED8;&#x8BA4;&#x53D6;&#x503C;&#x4E3A;<code>normal</code>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x5C31;&#x662F;<code>start</code>&#x4E86;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6839;&#x636E;&#x4E3B;&#x8F74;&#x7684;&#x65B9;&#x5411;(<code>flex-direction</code>)&#x5806;&#x5728;&#x8D77;&#x59CB;&#x5904;&#x3002;  </p>
<p>&#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;&#x53D6;&#x503C;&#xFF1A;</p>
<ol>
<li>
<code>center</code> &#x5FC5;&#x7136;&#x9996;&#x9009;&#x7684;&#x662F;<code>center</code>&#xFF0C;&#x80FD;&#x591F;&#x5B8C;&#x7F8E;&#x7684;&#x5B9E;&#x73B0;&#x6CBF;&#x4E3B;&#x8F74;&#x5C45;&#x4E2D;</li>
<li>
<code>flex-start</code> &#x6CBF;&#x7740;&#x4E3B;&#x8F74;&#x4ECE;&#x884C;&#x9996;&#x5F00;&#x59CB;&#x6392;&#x5217;</li>
<li>
<code>flex-end</code> &#x6CBF;&#x7740;&#x4E3B;&#x8F74;&#x4ECE;&#x884C;&#x672B;&#x5F00;&#x59CB;&#x6392;&#x5217;</li>
</ol>
<p>&#x4EE5;&#x53CA;&#x51E0;&#x4E2A;&#x4E0D;&#x592A;&#x5E38;&#x7528;&#x7684;&#x53D6;&#x503C;&#xFF1A;</p>
<ol>
<li>
<code>space-between</code> &#x5C06;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x5728;&#x5B50;&#x5143;&#x7D20;&#x4E2D;&#x95F4;&#x8FDB;&#x884C;&#x5E73;&#x5206;&#xFF0C;&#x4FDD;&#x8BC1;&#x6CBF;&#x4E3B;&#x8F74;&#x4E24;&#x4FA7;&#x4E0D;&#x4F1A;&#x7559;&#x6709;&#x7A7A;&#x767D;&#x3002;</li>
<li>
<code>space-around</code> &#x5C06;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x5747;&#x5300;&#x7684;&#x5206;&#x5E03;&#x5728;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x6CBF;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x7684;&#x4E24;&#x4FA7;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x4E3B;&#x8F74;&#x4E24;&#x4FA7;&#x4E5F;&#x4F1A;&#x6709;&#x7A7A;&#x767D;&#xFF0C;&#x4F46;&#x662F;&#x5FC5;&#x7136;&#x662F;&#x4E2D;&#x95F4;&#x7A7A;&#x767D;&#x7684;<code>1/2</code>&#x5927;&#x5C0F;&#x3002;</li>
<li>
<code>space-evenly</code> &#x5C06;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x5728;&#x6240;&#x6709;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x5E73;&#x5747;&#x5206;&#x914D;&#xFF0C;&#x4E3B;&#x8F74;&#x4E24;&#x4FA7;&#x7684;&#x7A7A;&#x767D;&#x9762;&#x79EF;&#x4E5F;&#x4F1A;&#x4E0E;&#x4E2D;&#x95F4;&#x7684;&#x9762;&#x79EF;&#x76F8;&#x7B49;&#x3002;</li>
</ol>
<p>&#x516D;&#x79CD;&#x6548;&#x679C;&#x7684;&#x793A;&#x4F8B;&#xFF1A;  <br><span class="img-wrap"><img data-src="/img/bVbbKq9" src="https://static.alili.tech/img/bVbbKq9" alt="6dn.png" title="6dn.png" style="cursor: pointer; display: inline;"></span></p>
<h4>Warning</h4>
<p>&#x6709;&#x4E00;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#xFF0C;<code>justify-content</code>&#x7684;&#x53D6;&#x503C;&#x90FD;&#x662F;&#x4F9D;&#x7167;<code>flex-direction</code>&#x6240;&#x5B9A;&#x4E49;&#x7684;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#x6765;&#x5C55;&#x793A;&#x7684;&#x3002;  <br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;<code>center</code>&#x5728;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x7528;&#x4E8E;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#xFF0C;&#x5728;<code>flex-direction: column-*</code>&#x65F6;&#xFF0C;&#x5219;&#x662F;&#x4F5C;&#x4E3A;&#x5782;&#x76F4;&#x5C45;&#x4E2D;&#x6765;&#x5C55;&#x793A;&#x7684;&#x3002;</p>
<h3 id="articleHeader7">align-content</h3>
<p>&#x540C;&#x6837;&#x7684;&#xFF0C;<code>align-content</code>&#x4E5F;&#x662F;&#x7528;&#x6765;&#x63A7;&#x5236;&#x5143;&#x7D20;&#x5728;&#x4EA4;&#x53C9;&#x8F74;&#x4E0A;&#x7684;&#x6392;&#x5217;&#x987A;&#x5E8F;&#xFF0C;&#x4F46;&#x662F;&#x65E2;&#x7136;&#x4F1A;&#x51FA;&#x73B0;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#xFF08;<code>align-items</code>&#x548C;<code>align-content</code>&#xFF09;&#xFF0C;&#x52BF;&#x5FC5;&#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x533A;&#x522B;&#x3002;  </p>
<p>&#x56E0;&#x4E3A;<code>align-content</code>&#x53EA;&#x80FD;&#x4F5C;&#x7528;&#x4E8E;&#x591A;&#x884C;&#x60C5;&#x51B5;&#x4E0B;&#x7684;<code>flex</code>&#x5E03;&#x5C40;&#xFF0C;&#x6240;&#x4EE5;&#x53D6;&#x503C;&#x4F1A;&#x66F4;&#x63A5;&#x8FD1;&#x989D;&#x65CB;&#x8F6C;&#x540E;&#x7684;<code>justify-content</code>&#xFF0C;&#x540C;&#x6837;&#x7684;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>space-between</code>&#x4E4B;&#x7C7B;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x3002;  </p>
<p>&#x56E0;&#x4E3A;&#x53D6;&#x503C;&#x57FA;&#x672C;&#x7C7B;&#x4F3C;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x518D;&#x91CD;&#x590D;&#x4E0A;&#x8FB9;<code>justify-content</code>&#x6240;&#x5217;&#x7684;&#x8868;&#x683C;&#xFF0C;&#x76F4;&#x63A5;&#x4E0A;&#x6548;&#x679C;&#xFF1A;  <br><span class="img-wrap"><img data-src="/img/bVbbKra" src="https://static.alili.tech/img/bVbbKra" alt="bafa.png" title="bafa.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">align-items</h3>
<p><code>align-items</code>&#x4E0E;&#x4E0A;&#x8FB9;&#x7684;<code>justify-content</code>&#x7C7B;&#x4F3C;&#xFF0C;&#x4E5F;&#x9002;&#x7528;&#x4E8E;&#x5B9A;&#x4E49;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x6392;&#x5217;&#x65B9;&#x5F0F;&#x3002;  <br>&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;<code>align-items</code>&#x4F5C;&#x7528;&#x4E8E;&#x4EA4;&#x53C9;&#x8F74;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x9ED8;&#x8BA4;<code>flex-direction: row</code>&#x60C5;&#x51B5;&#x4E0B;&#x7684;&#x4ECE;&#x4E0A;&#x5230;&#x4E0B;&#x7684;&#x90A3;&#x6839;&#x8F74;&#x7EBF;&#xFF09;  <br>&#x76EE;&#x6D4B;&#x5E73;&#x65F6;&#x7528;&#x5230;&#x7684;&#x6700;&#x591A;&#x7684;&#x5730;&#x65B9;&#x5C31;&#x662F;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x5427;&#xFF08;<em>&#x6211;&#x73B0;&#x5728;&#x61D2;&#x7684;&#xFF1A;&#x53EA;&#x8981;&#x6709;&#x56FE;&#x6807;&#x3001;&#x8868;&#x5355; &amp; &#x6587;&#x5B57; &#x7684;&#x5355;&#x884C;&#x6DF7;&#x5408;&#xFF0C;&#x90FD;&#x4F1A;&#x9009;&#x62E9;<code>align-items: center</code>&#x6765;&#x5B9E;&#x73B0;:)</em>&#xFF09;</p>
<p>&#x5E38;&#x7528;&#x7684;&#x53D6;&#x503C;&#xFF1A;</p>
<ol>
<li>
<code>center</code> &#x5E38;&#x7528;&#x6765;&#x505A;&#x5782;&#x76F4;(<em>&#x4EA4;&#x53C9;&#x8F74;</em>)&#x5C45;&#x4E2D;</li>
<li>
<code>flex-start</code> &#x6CBF;&#x7740;&#x4EA4;&#x53C9;&#x8F74;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;&#x6392;&#x5217;</li>
<li>
<code>flex-end</code> &#x4E0E;<code>flex-start</code>&#x65B9;&#x5411;&#x76F8;&#x53CD;</li>
<li>
<code>stretch</code> &#x5C06;&#x5143;&#x7D20;&#x6491;&#x6EE1;&#x5BB9;&#x5668;&#x7684;&#x4EA4;&#x53C9;&#x8F74;&#x5BBD;&#x5EA6;&#xFF08;<em>&#x5728;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x91CC;&#x6307;&#x5BB9;&#x5668;&#x7684;&#x9AD8;&#x5EA6;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x5355;&#x7EAF;&#x7684;&#x8BF4;&#x8FD9;&#x6761;&#x8F74;&#x7EBF;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x5BBD;&#x5EA6;&#x66F4;&#x5408;&#x9002;&#x4E00;&#x4E9B;</em>&#xFF09;</li>
<li>
<code>baseline</code> &#x5C06;&#x5143;&#x7D20;&#x6309;&#x7167;&#x6587;&#x672C;&#x5185;&#x5BB9;&#x7684;&#x57FA;&#x7EBF;&#x8FDB;&#x884C;&#x6392;&#x5217;</li>
</ol>
<p>&#x4EE5;&#x4E0A;&#x53D6;&#x503C;&#x7684;&#x793A;&#x4F8B;&#xFF1A;  <br><span class="img-wrap"><img data-src="/img/bVbbKrf" src="https://static.alili.tech/img/bVbbKrf" alt="l6ri.png" title="l6ri.png" style="cursor: pointer;"></span></p>
<h4>align-content&#x4E0E;align-items&#x7684;&#x5F02;&#x540C;</h4>
<p>&#x4E24;&#x8005;&#x7684;&#x76F8;&#x540C;&#x70B9;&#x5728;&#x4E8E;&#xFF0C;&#x90FD;&#x662F;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x5728;&#x4EA4;&#x53C9;&#x8F74;&#x4E0A;&#x7684;&#x6392;&#x5217;&#x987A;&#x5E8F;&#x3002;  <br>&#x800C;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x4EE5;&#x4E0B;&#x4E24;&#x70B9;&#xFF1A;</p>
<ol>
<li>
<code>align-content</code>&#x53EA;&#x80FD;&#x5E94;&#x7528;&#x4E8E;&#x591A;&#x884C;&#x7684;&#x60C5;&#x51B5;&#x4E0B;</li>
<li>
<code>align-content</code>&#x4F1A;&#x5C06;&#x6240;&#x6709;&#x7684;&#x5143;&#x7D20;&#x8BA4;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x6574;&#x4F53;&#x5E76;&#x8FDB;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x5904;&#x7406;&#x3001;&#x800C;<code>align-items</code>&#x5219;&#x4F1A;&#x6309;&#x7167;&#x6BCF;&#x4E00;&#x884C;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF1A;</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVbbKrg" src="https://static.alili.tech/img/bVbbKrg" alt="cvld.png" title="cvld.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">place-content</h3>
<p><code>place-content</code>&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;<code>justify-content</code>&#x548C;<code>align-content</code>&#x7684;&#x7B80;&#x5199;&#x4E86;&#xFF08;<em>&#x4E8B;&#x5B9E;&#x4E0A;&#x5C31;&#x662F;</em>&#xFF09;</p>
<p>&#x8BED;&#x6CD5;&#x4E3A;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selector {
  place-content: &lt;align-content&gt; &lt;justify-content&gt;;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">selector</span> {
  <span class="hljs-attribute">place-content</span>: &lt;align-content&gt; &lt;justify-content&gt;;
}</code></pre>
<p><em>P.S. &#x5982;&#x679C;&#x5355;&#x884C;(&#x5143;&#x7D20;)&#x60F3;&#x8981;&#x5B9E;&#x73B0;&#x5C45;&#x4E2D;&#x8FD8;&#x662F;&#x8001;&#x8001;&#x5B9E;&#x5B9E;&#x7684;&#x4F7F;&#x7528;<code>align-items</code>+<code>justify-content</code>&#x5427; :)</em></p>
<h2 id="articleHeader10">&#x5B50;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#x4EEC;</h2>
<p>&#x6709;&#x5173;&#x5BB9;&#x5668;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x90FD;&#x5DF2;&#x7ECF;&#x5217;&#x5728;&#x4E86;&#x4E0A;&#x8FB9;&#xFF0C;&#x4E0B;&#x8FB9;&#x7684;&#x4E00;&#x4E9B;&#x5219;&#x662F;&#x5728;&#x5BB9;&#x5668;&#x5185;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x7684;&#x5C5E;&#x6027;&#x3002;</p>
<h3 id="articleHeader11">flex-grow</h3>
<p><code>flex-grow</code>&#x7528;&#x6765;&#x63A7;&#x5236;&#x67D0;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#x5728;&#x9700;&#x8981;&#x6CBF;&#x4E3B;&#x8F74;&#x586B;&#x5145;&#x65F6;&#x6240;&#x5360;&#x7684;&#x6BD4;&#x4F8B;&#xFF0C;&#x53D6;&#x503C;&#x4E3A;&#x6B63;&#x6570;&#xFF08;&#x6D6E;&#x70B9;&#x6570;&#x4E5F;&#x53EF;&#x4EE5;&#x7684;&#xFF09;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selector {
  flex-grow: 1;
  flex-grow: 1.5;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">selector</span> {
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1.5</span>;
}</code></pre>
<p>&#x4E3E;&#x4F8B;&#x8BF4;&#x660E;&#xFF1A;  <br>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#x4E2D;&#x6709;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x5BB9;&#x5668;&#x5269;&#x4F59;&#x5BBD;&#x5EA6;&#x4E3A;100px&#xFF0C;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x586B;&#x5145;&#x5B83;&#x3002;  <br>&#x5982;&#x679C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86;<code>flex-grow: 2</code>&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x7684;&#x8BBE;&#x7F6E;&#x4E3A;<code>1</code>(<em>&#x9ED8;&#x8BA4;&#x4E0D;&#x8BBE;&#x7F6E;&#x7684;&#x8BDD;&#xFF0C;&#x4E0D;&#x4F1A;&#x53BB;&#x586B;&#x5145;&#x5269;&#x4F59;&#x5BBD;&#x5EA6;</em>)  <br>&#x5219;&#x4F1A;&#x51FA;&#x73B0;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x60C5;&#x51B5;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5360;&#x7528;<code>50px</code>&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x5404;&#x5360;&#x7528;<code>25px</code>&#x3002;  </p>
<p><span class="img-wrap"><img data-src="/img/bVbbKrh" src="https://static.alili.tech/img/bVbbKrh" alt="tcd0.png" title="tcd0.png" style="cursor: pointer; display: inline;"></span></p>
<h4>Warning</h4>
<p>&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x4E00;&#x70B9;&#x662F;&#xFF0C;<code>flex-grow</code>&#x5B9A;&#x4E49;&#x7684;&#x662F;&#x5BF9;&#x4E8E;&#x5269;&#x4F59;&#x5BBD;&#x5EA6;&#x7684;&#x5229;&#x7528;&#x3002;  <br>&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x5360;&#x7528;&#x7684;&#x7A7A;&#x95F4;&#x4E0D;&#x88AB;&#x8BA1;&#x7B97;&#x5728;&#x5185;&#xFF0C;&#x4E3A;&#x4E86;&#x9A8C;&#x8BC1;&#x4E0A;&#x8FB9;&#x7684;&#x89C2;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x4E00;&#x4E2A;&#x5C0F;&#x5B9E;&#x9A8C;&#x3002;  <br>&#x7ED9;&#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;<code>padding-left: 20px</code>&#xFF0C;&#x4FDD;&#x8BC1;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x5360;&#x7528;<code>20px</code>&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x7136;&#x540E;&#x5206;&#x522B;&#x8BBE;&#x7F6E;<code>flex-grow</code>&#x6765;&#x67E5;&#x770B;&#x6700;&#x540E;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x662F;&#x591A;&#x5C11;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: flex;
  width: 160px;
  height: 20px;
  align-items: stretch;
}

.item {
  flex-grow: 1;
  padding-left: 20px;
}

.item:first-of-type {
  flex-grow: 2;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">align-items</span>: stretch;
}

<span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
}

<span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:first-of-type</span> {
  <span class="hljs-attribute">flex-grow</span>: <span class="hljs-number">2</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbKri" src="https://static.alili.tech/img/bVbbKri" alt="4fc7.png" title="4fc7.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbbKrj" src="https://static.alili.tech/img/bVbbKrj" alt="3jm1.png" title="3jm1.png" style="cursor: pointer;"></span></p>
<p>&#x6211;&#x4EEC;&#x7ED9;&#x5BB9;&#x5668;&#x8BBE;&#x7F6E;&#x4E86;&#x5BBD;&#x5EA6;&#x4E3A;<code>160px</code>&#xFF08;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x7684;&#x51CF;&#x53BB;<code>padding-left</code>&#x8BA1;&#x7B97;&#xFF09;&#x3002;  <br>&#x6700;&#x540E;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86;<code>flex-grow: 2</code>&#x7684;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x4E3A;<code>70px</code>&#xFF0C;&#x800C;&#x8BBE;&#x7F6E;<code>flex-grow: 1</code>&#x7684;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x4E3A;<code>45px</code>&#x3002;  <br>&#x5728;&#x51CF;&#x53BB;&#x4E86;&#x81EA;&#x8EAB;&#x7684;<code>20px</code>&#x4EE5;&#x540E;&#xFF0C;<code>50 / 25 === 2 // true</code>&#x3002;</p>
<h3 id="articleHeader12">flex-shrink</h3>
<p><code>flex-shrink</code>&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x4E0E;<code>flex-grow</code>&#x76F8;&#x53CD;&#x7684;&#x4E00;&#x4E2A;&#x8BBE;&#x7F6E;&#xFF0C;&#x53D6;&#x503C;&#x540C;&#x6837;&#x662F;&#x6B63;&#x6570;&#x3002;  <br>&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x5F53;&#x5BB9;&#x5668;&#x5BBD;&#x5EA6;&#x5C0F;&#x4E8E;&#x6240;&#x6709;&#x5B50;&#x5143;&#x7D20;&#x6240;&#x5360;&#x7528;&#x5BBD;&#x5EA6;&#x65F6;&#x7684;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#x3002;  <br>&#x6BD4;&#x5982;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x7684;&#x5BB9;&#x5668;&#x5BBD;&#x4E3A;<code>100px</code>&#xFF0C;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#x5747;&#x4E3A;<code>40px</code>&#xFF0C;&#x5219;&#x4F1A;&#x51FA;&#x73B0;&#x5BB9;&#x5668;&#x65E0;&#x6CD5;&#x5B8C;&#x5168;&#x5C55;&#x793A;&#x6240;&#x6709;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x95EE;&#x9898;&#x3002;  <br>&#x6240;&#x4EE5;&#x9ED8;&#x8BA4;&#x7684;<code>flex</code>&#x4F1A;&#x5BF9;&#x5B50;&#x5143;&#x7D20;&#x8FDB;&#x884C;&#x7F29;&#x653E;&#xFF0C;&#x5404;&#x4E2A;&#x5143;&#x7D20;&#x8981;&#x7F29;&#x653E;&#x591A;&#x5C11;&#xFF0C;&#x5219;&#x662F;&#x6839;&#x636E;<code>flex-shrink</code>&#x7684;&#x914D;&#x7F6E;&#x6765;&#x5F97;&#x5230;&#x7684;&#xFF08;<em>&#x9ED8;&#x8BA4;&#x4E3A;1&#xFF0C;&#x6240;&#x6709;&#x5143;&#x7D20;&#x5E73;&#x5747;&#x5206;&#x644A;</em>&#xFF09;  <br>&#x5C31;&#x50CF;&#x4E0A;&#x8FB9;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x4E09;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x8BBE;&#x7F6E;&#x4E86;<code>flex-shrink: 2</code>&#xFF0C;&#x5219;&#x6700;&#x7EC8;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x5BBD;&#x5EA6;&#x4E3A;<code>30px</code>&#xFF0C;&#x5176;&#x4F59;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x4E3A;<code>35px</code>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
  display: flex;
  width: 100px;
  height: 20px;
  align-items: stretch;
}

.item {
  width: 40px;
  /* flex-shrink: 1; it&apos;s default value */
  font-size: 0;
  background: #03a9f4;
}

.item:first-of-type {
  flex-shrink: 2;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">align-items</span>: stretch;
}

<span class="hljs-selector-class">.item</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-comment">/* flex-shrink: 1; it&apos;s default value */</span>
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#03a9f4</span>;
}

<span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:first-of-type</span> {
  <span class="hljs-attribute">flex-shrink</span>: <span class="hljs-number">2</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbKrm" src="https://static.alili.tech/img/bVbbKrm" alt="1s06.png" title="1s06.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVbbKro" src="https://static.alili.tech/img/bVbbKro" alt="8rro.png" title="8rro.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13">flex-basis</h3>
<p>&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x5728;<code>flex</code>&#x5BB9;&#x5668;&#x4E2D;&#x6240;&#x5360;&#x636E;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x9ED8;&#x8BA4;&#x4E3B;&#x8F74;&#x65B9;&#x5411;&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x6765;&#x8BA9;<code>flex</code>&#x6765;&#x8BA1;&#x7B97;&#x5BB9;&#x5668;&#x662F;&#x5426;&#x8FD8;&#x6709;&#x5269;&#x4F59;&#x9762;&#x79EF;&#x7684;&#x3002;  <br>&#x9ED8;&#x8BA4;&#x53D6;&#x503C;&#x4E3A;<code>auto</code>&#xFF0C;&#x5219;&#x610F;&#x5473;&#x7740;&#x7EE7;&#x627F;<code>width</code>&#xFF08;<code>direction: column</code>&#x65F6;&#x662F;<code>height</code>&#xFF09;&#x7684;&#x503C;&#x3002;<br>&#x4E00;&#x822C;&#x6765;&#x8BB2;&#x5F88;&#x5C11;&#x4F1A;&#x53BB;&#x8BBE;&#x7F6E;&#x8FD9;&#x4E2A;&#x503C;&#x3002;</p>
<h3 id="articleHeader14">flex</h3>
<p><code>flex</code>&#x5219;&#x662F;&#x4E0A;&#x8FB9;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x7B80;&#x5199;&#xFF0C;&#x8BED;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selector {
  flex: &lt;flex-grow&gt; &lt;flex-shrink&gt; &lt;flex-basis&gt;;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">selector</span> {
  <span class="hljs-attribute">flex</span>: &lt;flex-grow&gt; &lt;flex-shrink&gt; &lt;flex-basis&gt;;
}</code></pre>
<p>&#x4E00;&#x822C;&#x6765;&#x8BB2;&#x5982;&#x679C;&#x8981;&#x5199;&#x7B80;&#x5199;&#x7684;&#x8BDD;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x4F1A;&#x9009;&#x62E9;&#x8BBE;&#x7F6E;&#x4E3A;<code>auto</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x83B7;&#x53D6;&#x5143;&#x7D20;&#x7684;<code>width</code>&#x3002;</p>
<h3 id="articleHeader15">align-self</h3>
<p>&#x6548;&#x679C;&#x5982;&#x540C;&#x5176;&#x540D;&#x5B57;&#xFF0C;&#x9488;&#x5BF9;&#x67D0;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x7C7B;&#x4F3C;<code>align-items</code>&#x7684;&#x6548;&#x679C;&#x3002;  <br>&#x53D6;&#x503C;&#x4E0E;<code>align-items</code>&#x4E00;&#x81F4;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9488;&#x5BF9;&#x6027;&#x7684;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x6548;&#x679C;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center :first-child {
  align-self: stretch;
}

.flex-start :first-child {
  align-self: flex-end;
}

.flex-end :first-child {
  align-self: flex-start;
}

.stretch :first-child {
  align-self: center;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.center</span> <span class="hljs-selector-pseudo">:first-child</span> {
  <span class="hljs-attribute">align-self</span>: stretch;
}

<span class="hljs-selector-class">.flex-start</span> <span class="hljs-selector-pseudo">:first-child</span> {
  <span class="hljs-attribute">align-self</span>: flex-end;
}

<span class="hljs-selector-class">.flex-end</span> <span class="hljs-selector-pseudo">:first-child</span> {
  <span class="hljs-attribute">align-self</span>: flex-start;
}

<span class="hljs-selector-class">.stretch</span> <span class="hljs-selector-pseudo">:first-child</span> {
  <span class="hljs-attribute">align-self</span>: center;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbKrr" src="https://static.alili.tech/img/bVbbKrr" alt="83evalign-self-example-1" title="83evalign-self-example-1" style="cursor: pointer;"></span></p>
<h3 id="articleHeader16">order</h3>
<p>&#x4EE5;&#x53CA;&#x6700;&#x540E;&#x8FD9;&#x91CC;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;<code>order</code>&#x5C5E;&#x6027;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x5728;&#x5C55;&#x793A;&#x4E0A;&#x7684;&#x5143;&#x7D20;&#x987A;&#x5E8F;&#x3002;  <br>&#x53D6;&#x503C;&#x4E3A;&#x4E00;&#x4E2A;&#x4EFB;&#x610F;&#x6574;&#x6570;&#x3002;  </p>
<p>&#x9ED8;&#x8BA4;&#x7684;&#x53D6;&#x503C;&#x4E3A;<code>1</code>&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x540E;&#x8FB9;&#x7684;&#x5143;&#x7D20;&#x63D0;&#x524D;&#x663E;&#x793A;&#xFF0C;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x5982;&#x4E0B;&#x5C5E;&#x6027;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".item:last-of-type {
  order: -1;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:last-of-type</span> {
  <span class="hljs-attribute">order</span>: -<span class="hljs-number">1</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVbbKrs" src="https://static.alili.tech/img/bVbbKrs" alt="92r4.png" title="92r4.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>P.S. &#x8FD9;&#x4E2A;&#x987A;&#x5E8F;&#x7684;&#x6539;&#x53D8;&#x53EA;&#x662F;&#x663E;&#x793A;&#x4E0A;&#x7684;&#xFF0C;&#x4E0D;&#x4F1A;&#x771F;&#x6B63;&#x7684;&#x6539;&#x53D8;html&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;&#x4F60;&#x4F9D;&#x7136;&#x4E0D;&#x80FD;&#x901A;&#x8FC7;<code>.item:last-of-type ~ .item</code>&#x6765;&#x83B7;&#x53D6;&#x5B83;&#x5728;&#x89C6;&#x89C9;&#x4E0A;&#x540E;&#x8FB9;&#x7684;&#x5144;&#x5F1F;&#x5143;&#x7D20;</em>  <br><em>&#x5F53;order&#x91CD;&#x590D;&#x65F6;&#xFF0C;&#x6309;&#x7167;&#x4E4B;&#x524D;&#x7684;&#x987A;&#x5E8F;&#x6392;&#x5217;&#x5927;&#x5C0F;</em></p>
<h2 id="articleHeader17">&#x603B;&#x7ED3;</h2>
<p><code>flex</code>&#x76F8;&#x5173;&#x7684;&#x5C5E;&#x6027;&#x5982;&#x4F55;&#x62C6;&#x5206;&#x4EE5;&#x540E;&#xFF0C;&#x5E76;&#x4E0D;&#x7B97;&#x592A;&#x591A;&#x3002;  <br>&#x8111;&#x6D77;&#x4E2D;&#x6709;&#x4E3B;&#x8F74;&#x548C;&#x4EA4;&#x53C9;&#x8F74;&#x7684;&#x6982;&#x5FF5;&#x4E4B;&#x540E;&#xFF0C;&#x5E94;&#x8BE5;&#x4F1A;&#x53D8;&#x5F97;&#x6E05;&#x6670;&#x4E00;&#x4E9B;&#x3002;  <br>&#x5173;&#x4E8E;&#x4E0A;&#x8FF0;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x603B;&#x7ED3;&#xFF1A;</p>
<h3 id="articleHeader18">&#x5BB9;&#x5668;&#x76F8;&#x5173;</h3>
<table>
<thead><tr>
<th align="left">&#x5C5E;&#x6027;&#x540D;</th>
<th align="left">&#x4F5C;&#x7528;</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>flex-direction</code></td>
<td align="left">&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x4E3B;&#x8F74;&#x7684;&#x65B9;&#x5411;&#xFF0C;&#x6700;&#x57FA;&#x7840;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x9ED8;&#x8BA4;&#x4ECE;&#x5DE6;&#x5230;&#x53F3;&#xFF0C;&#x6B64;&#x5C5E;&#x6027;&#x4E00;&#x6539;&#xFF0C;&#x4E0B;&#x5217;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x8981;&#x8DDF;&#x7740;&#x6539;&#xFF0C;&#x771F;&#x53EF;&#x8C13;&#x7275;&#x4E00;&#x53D1;&#x800C;&#x52A8;&#x5168;&#x8EAB;</td>
</tr>
<tr>
<td align="left"><code>flex-wrap</code></td>
<td align="left">&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x8D85;&#x51FA;&#x5BB9;&#x5668;&#x540E;&#x7684;&#x6362;&#x884C;&#x89C4;&#x5219;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E0D;&#x6362;&#x884C;</td>
</tr>
<tr>
<td align="left"><code>justify-content</code></td>
<td align="left">&#x8BBE;&#x7F6E;&#x6CBF;&#x4E3B;&#x8F74;&#x7684;&#x6392;&#x5217;&#x89C4;&#x5219;</td>
</tr>
<tr>
<td align="left"><code>align-content</code></td>
<td align="left">&#x8BBE;&#x7F6E;&#x6CBF;&#x4EA4;&#x53C9;&#x8F74;&#x7684;&#x6392;&#x5217;&#x89C4;&#x5219;</td>
</tr>
<tr>
<td align="left"><code>align-items</code></td>
<td align="left">&#x4EE5;&#x884C;&#xFF08;&#x9ED8;&#x8BA4;<code>direction</code>&#x60C5;&#x51B5;&#x4E0B;&#xFF09;&#x4E3A;&#x5355;&#x4F4D;&#xFF0C;&#x8BBE;&#x7F6E;&#x6CBF;&#x4EA4;&#x53C9;&#x8F74;&#x7684;&#x6392;&#x5217;&#x89C4;&#x5219;</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader19">&#x5143;&#x7D20;&#x76F8;&#x5173;</h3>
<table>
<thead><tr>
<th align="left">&#x5C5E;&#x6027;&#x540D;</th>
<th align="left">&#x4F5C;&#x7528;</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>flex-grow</code></td>
<td align="left">&#x5F53;&#x5BB9;&#x5668;&#x5927;&#x4E8E;&#x6240;&#x6709;&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x6309;&#x4EC0;&#x4E48;&#x6BD4;&#x4F8B;&#x5C06;&#x5269;&#x4F59;&#x7A7A;&#x95F4;&#x5206;&#x914D;&#x7ED9;&#x5143;&#x7D20;</td>
</tr>
<tr>
<td align="left"><code>flex-shrink</code></td>
<td align="left">&#x5F53;&#x5BB9;&#x5668;&#x5C0F;&#x4E8E;&#x6240;&#x6709;&#x5143;&#x7D20;&#x65F6;&#xFF0C;&#x5143;&#x7D20;&#x6309;&#x7167;&#x4EC0;&#x4E48;&#x6BD4;&#x4F8B;&#x6765;&#x7F29;&#x5C0F;&#x81EA;&#x5DF1;</td>
</tr>
<tr>
<td align="left"><code>flex-basis</code></td>
<td align="left">&#x5F88;&#x5C11;&#x7528;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8BBE;&#x7F6E;&#x5728;&#x5BB9;&#x5668;&#x4E2D;&#x7684;&#x5BBD;(&#x9AD8;)</td>
</tr>
<tr>
<td align="left"><code>align-self</code></td>
<td align="left">&#x9488;&#x5BF9;&#x67D0;&#x4E9B;&#x5143;&#x7D20;&#x5355;&#x72EC;&#x8BBE;&#x7F6E;<code>align-items</code>&#x76F8;&#x5173;&#x7684;&#x6548;&#x679C;</td>
</tr>
<tr>
<td align="left"><code>order</code></td>
<td align="left">&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x5728;&#x663E;&#x793A;&#x4E0A;&#x7684;&#x987A;&#x5E8F;</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader20">&#x7B80;&#x5199;</h3>
<table>
<thead><tr>
<th align="left">&#x5C5E;&#x6027;&#x540D;</th>
<th align="left">&#x4F5C;&#x7528;</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>flex-flow</code></td>
<td align="left">
<code>flex-direction</code>&#x4E0E;<code>flex-wrap</code>&#x7684;&#x7B80;&#x5199;</td>
</tr>
<tr>
<td align="left"><code>place-content</code></td>
<td align="left">
<code>justify-content</code>&#x4E0E;<code>align-content</code>&#x7684;&#x7B80;&#x5199;</td>
</tr>
<tr>
<td align="left"><code>flex</code></td>
<td align="left">
<code>flex-grow</code>&#x3001;<code>flex-shrink</code>&#x4E0E;<code>flex-basis</code>&#x7684;&#x7B80;&#x5199;</td>
</tr>
</tbody>
</table>
<p>&#x4EE5;&#x53CA;&#x6587;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x90FD;&#x5728;&#x8FD9;&#x91CC; <a href="https://github.com/jiasm/notebook/tree/master/html/flex" rel="nofollow noreferrer" target="_blank">code here</a>&#x3002;</p>
<h3 id="articleHeader21">&#x53C2;&#x8003;&#x8D44;&#x6599;</h3>
<ol>
<li>
<a href="https://medium.freecodecamp.org/an-animated-guide-to-flexbox-d280cf6afc35" rel="nofollow noreferrer" target="_blank">How Flexbox works&#x200A;</a><em>(&#x6B64;&#x6587;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;gif&#x56FE;&#x771F;&#x5FC3;&#x8D5E;)</em>
</li>
<li><a href="https://medium.freecodecamp.org/understanding-flexbox-everything-you-need-to-know-b4013d4dc9af" rel="nofollow noreferrer" target="_blank">Understanding Flexbox: Everything you need to know</a></li>
<li><a href="https://medium.freecodecamp.org/learn-css-flexbox-in-5-minutes-b941f0affc34" rel="nofollow noreferrer" target="_blank">Learn CSS Flexbox in 5 Minutes</a></li>
</ol>
<p><em>P.S. &#x5148;&#x7ACB;&#x4E00;&#x4E2A;flag&#xFF0C;&#x540E;&#x7EED;&#x8FD8;&#x4F1A;&#x51FA;&#x4E00;&#x7BC7;&#x5404;&#x79CD;flex&#x7684;&#x771F;&#x5B9E;&#x573A;&#x666F;&#x5E94;&#x7528;&#xFF0C;&#x6BD5;&#x7ADF;&#xFF0C;&#x7EB8;&#x4E0A;&#x8C08;&#x5175;&#x6CA1;&#x6709;&#x610F;&#x4E49;</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flex入坑指南

## 原文链接
[https://segmentfault.com/a/1190000015154130](https://segmentfault.com/a/1190000015154130)


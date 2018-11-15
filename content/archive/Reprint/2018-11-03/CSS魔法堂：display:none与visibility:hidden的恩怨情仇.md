---
title: 'CSS魔法堂：display:none与visibility:hidden的恩怨情仇'
hidden: true
categories: reprint
slug: 874add44
date: 2018-11-03 02:30:13
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x2003;&#x8FD8;&#x8BB0;&#x5F97;&#x9762;&#x8BD5;&#x65F6;&#x88AB;&#x95EE;&#x8D77;&quot;&#x8BF7;&#x8BF4;&#x8BF4;display:none&#x548C;visibility:hidden&#x7684;&#x533A;&#x522B;&quot;&#x5417;&#xFF1F;&#x662F;&#x4E0D;&#x662F;&#x56DE;&#x7B54;&#x5B8C;<code>display:none</code>&#x4E0D;&#x5360;&#x7528;&#x539F;&#x6765;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x800C;<code>visibility:hidden</code>&#x4FDD;&#x7559;&#x539F;&#x6765;&#x7684;&#x4F4D;&#x7F6E;&#x540E;&#xFF0C;&#x9762;&#x8BD5;&#x5B98;&#x5C31;&#x4F1A;&#x5FC3;&#x4E00;&#x7B11;&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x4E0D;&#x6B62;&#x90A3;&#x4E48;&#x7B80;&#x5355;&#x5462;&#xFF01;&#x672C;&#x6587;&#x6211;&#x4EEC;&#x5C06;&#x4E00;&#x8D77;&#x6DF1;&#x7A76;&#x5B83;&#x4FE9;&#x7684;&#x6069;&#x6028;&#x60C5;&#x4EC7;&#xFF0C;&#x4E0B;&#x6B21;&#x9762;&#x8BD5;&#x65F6;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x56DE;&#x7B54;&#x5F97;&#x66F4;&#x51FA;&#x5F69;&#xFF01;</p><h2 id="articleHeader1">&#x6DF1;&#x5165;<code>display:none</code></h2><p>&#x2003;&#x6211;&#x4EEC;&#x90FD;&#x6E05;&#x695A;&#x5F53;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;<code>display:none</code>&#x540E;&#xFF0C;&#x754C;&#x9762;&#x4E0A;&#x5C06;&#x4E0D;&#x4F1A;&#x663E;&#x793A;&#x8BE5;&#x5143;&#x7D20;&#xFF0C;&#x5E76;&#x4E14;&#x8BE5;&#x5143;&#x7D20;&#x4E0D;&#x5360;&#x5E03;&#x5C40;&#x7A7A;&#x95F4;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x4ECD;&#x7136;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;JavaScript&#x64CD;&#x4F5C;&#x8BE5;&#x5143;&#x7D20;&#x3002;&#x4F46;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x8FD9;&#x6837;&#x5462;&#xFF1F;<br>&#x2003;&#x8FD9;&#x4E2A;&#x6D89;&#x53CA;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x6E32;&#x67D3;&#x539F;&#x7406;&#xFF1A;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x89E3;&#x6790;HTML&#x6807;&#x7B7E;&#x751F;&#x6210;DOM Tree&#xFF0C;&#x89E3;&#x6790;CSS&#x751F;&#x6210;CSSOM&#xFF0C;&#x7136;&#x540E;&#x5C06;DOM Tree&#x548C;CSSOM&#x5408;&#x6210;&#x751F;&#x6210;Render Tree&#xFF0C;&#x5143;&#x7D20;&#x5728;Render Tree&#x4E2D;&#x5BF9;&#x5E94;0&#x6216;&#x591A;&#x4E2A;&#x76D2;&#x5B50;&#xFF0C;&#x7136;&#x540E;&#x6D4F;&#x89C8;&#x5668;&#x4EE5;&#x76D2;&#x5B50;&#x6A21;&#x578B;&#x7684;&#x4FE1;&#x606F;&#x5E03;&#x5C40;&#x548C;&#x6E32;&#x67D3;&#x754C;&#x9762;&#x3002;&#x800C;&#x8BBE;&#x7F6E;&#x4E3A;<code>display:none</code>&#x7684;&#x5143;&#x7D20;&#x5219;&#x5728;Render Tree&#x4E2D;&#x6CA1;&#x6709;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x76D2;&#x5B50;&#x6A21;&#x578B;&#xFF0C;&#x56E0;&#x6B64;&#x540E;&#x7EED;&#x7684;&#x5E03;&#x5C40;&#x3001;&#x6E32;&#x67D3;&#x5DE5;&#x4F5C;&#x81EA;&#x7136;&#x6CA1;&#x5B83;&#x4EC0;&#x4E48;&#x4E8B;&#x4E86;&#xFF0C;&#x81F3;&#x4E8E;DOM&#x64CD;&#x4F5C;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#x3002;<br>&#x2003;&#x4F46;&#x9664;&#x4E86;&#x4E0A;&#x9762;&#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x4EE5;&#x4E0B;8&#x4E2A;&#x70B9;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;<br>1.&#x539F;&#x751F;&#x9ED8;&#x8BA4;<code>display:none</code>&#x7684;&#x5143;&#x7D20;<br>&#x5176;&#x5B9E;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F;&#x5143;&#x7D20;&#x4E2D;&#x6709;&#x4E0D;&#x5C11;&#x81EA;&#x5E26;<code>display:none</code>&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5982;<code>link</code>,<code>script</code>,<code>style</code>,<code>dialog</code>,<code>input[type=hidden]</code>&#x7B49;.</p><p>2.HTML5&#x4E2D;&#x65B0;&#x589E;hidden&#x5E03;&#x5C14;&#x5C5E;&#x6027;&#xFF0C;&#x8BA9;&#x5F00;&#x53D1;&#x8005;&#x81EA;&#x5B9A;&#x4E49;&#x5143;&#x7D20;&#x7684;&#x9690;&#x85CF;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x517C;&#x5BB9;&#x539F;&#x751F;&#x4E0D;&#x652F;&#x6301;hidden&#x5C5E;&#x6027;&#x7684;&#x6D4F;&#x89C8;&#x5668;  */
[hidden]{
  display: none;
}

&lt;span hidden&gt;Hide and Seek: You can&apos;t see me!&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-comment">/* &#x517C;&#x5BB9;&#x539F;&#x751F;&#x4E0D;&#x652F;&#x6301;hidden&#x5C5E;&#x6027;&#x7684;&#x6D4F;&#x89C8;&#x5668;  */</span>
<span class="hljs-selector-attr">[hidden]</span>{
  <span class="hljs-attribute">display</span>: none;
}

&lt;<span class="hljs-selector-tag">span</span> hidden&gt;Hide and Seek: You can<span class="hljs-string">&apos;t see me!&lt;/span&gt;</span></code></pre><p>3.&#x7236;&#x5143;&#x7D20;&#x4E3A;<code>display:none</code>&#xFF0C;&#x5B50;&#x5B59;&#x5143;&#x7D20;&#x4E5F;&#x96BE;&#x9003;&#x4E00;&#x52AB;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".hidden{
  display: none;
}
.visible{
  display: block;
}

*** START ***
&lt;div class=&quot;hidden&quot;&gt;
  I&apos;m parent!
  &lt;div class=&quot;visible&quot;&gt; I&apos;m son! &lt;/div&gt;
&lt;/div&gt;
*** END ***" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>.hidden{
  display: none;
}
.visible{
  display: block;
}

*** START ***
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;hidden&quot;</span>&gt;
  I&apos;m parent!
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;visible&quot;</span>&gt; I&apos;m son! &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
*** END ***</code></pre><p>&#x6D4F;&#x89C8;&#x5668;&#x76F4;&#x63A5;&#x663E;&#x793A;&#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*** START ***
*** END ***" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs asciidoc"><code><span class="hljs-bullet">*** </span>START ***
<span class="hljs-bullet">*** </span>END **<span class="hljs-strong">*</span></code></pre><p>4.&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x7126;&#x70B9;<br>&#x672C;&#x6765;&#x65E0;&#x4E00;&#x76D2;&#xFF0C;&#x4F55;&#x5904;&#x60F9;&#x7126;&#x70B9;&#x5462;^_^&#x5373;&#x4F7F;&#x901A;&#x8FC7;tab&#x952E;&#x4E5F;&#x662F;&#x6CA1;&#x529E;&#x6CD5;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x771F;&#x5FC3;&#x4E0D;&#x4F1A;&#x83B7;&#x5F97;&#x7126;&#x70B9; --&gt;
&lt;input type=&quot;hidden&quot;&gt;
&lt;div tabindex=&quot;1&quot; style=&quot;display:none&quot;&gt;hidden&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- &#x771F;&#x5FC3;&#x4E0D;&#x4F1A;&#x83B7;&#x5F97;&#x7126;&#x70B9; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">&quot;1&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display:none&quot;</span>&gt;</span>hidden<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>5.&#x65E0;&#x6CD5;&#x54CD;&#x5E94;&#x4EFB;&#x4F55;&#x4E8B;&#x4EF6;&#xFF0C;&#x65E0;&#x8BBA;&#x662F;&#x6355;&#x83B7;&#x3001;&#x547D;&#x4E2D;&#x76EE;&#x6807;&#x548C;&#x5192;&#x6CE1;&#x9636;&#x6BB5;&#x5747;&#x4E0D;&#x53EF;&#x4EE5;<br>&#x7531;&#x4E8E;<code>display:none</code>&#x7684;&#x5143;&#x7D20;&#x6839;&#x672C;&#x4E0D;&#x4F1A;&#x5728;&#x754C;&#x9762;&#x4E0A;&#x6E32;&#x67D3;&#xFF0C;&#x5C31;&#x662F;&#x8FDE;1&#x4E2A;&#x50CF;&#x7D20;&#x7684;&#x90FD;&#x4E0D;&#x5360;&#xFF0C;&#x56E0;&#x6B64;&#x81EA;&#x7136;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x547D;&#x4E2D;&#xFF0C;&#x800C;&#x5143;&#x7D20;&#x4E5F;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x7126;&#x70B9;&#xFF0C;&#x90A3;&#x4E48;&#x4E5F;&#x4E0D;&#x80FD;&#x6210;&#x4E3A;&#x952E;&#x76D8;&#x4E8B;&#x4EF6;&#x7684;&#x547D;&#x4E2D;&#x76EE;&#x6807;&#xFF1B;&#x800C;&#x7236;&#x5143;&#x7D20;&#x7684;display&#x4E3A;none&#x65F6;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x7684;display&#x5FC5;&#x5B9A;&#x4E3A;none&#xFF0C;&#x56E0;&#x6B64;&#x5143;&#x7D20;&#x4E5F;&#x6CA1;&#x6709;&#x673A;&#x4F1A;&#x4F4D;&#x4E8E;&#x4E8B;&#x4EF6;&#x6355;&#x83B7;&#x6216;&#x5192;&#x6CE1;&#x9636;&#x6BB5;&#x7684;&#x8DEF;&#x5F84;&#x8DEF;&#x5F84;&#x4E0A;&#xFF0C;&#x56E0;&#x6B64;<code>display:none</code>&#x7684;&#x5143;&#x7D20;&#x65E0;&#x6CD5;&#x54CD;&#x5E94;&#x4E8B;&#x4EF6;&#x3002;</p><p>6.&#x4E0D;&#x803D;&#x8BEF;form&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x6570;&#x636E;<br>&#x867D;&#x7136;&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x770B;&#x5230;<code>display:none</code>&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x4F46;&#x5F53;&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x65F6;&#x4F9D;&#x7136;&#x4F1A;&#x5C06;&#x9690;&#x85CF;&#x7684;input&#x5143;&#x7D20;&#x7684;&#x503C;&#x63D0;&#x4EA4;&#x4E0A;&#x53BB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form&gt;
  &lt;input type=&quot;hidden&quot; name=&quot;id&quot;&gt;
  &lt;input type=&quot;text&quot; name=&quot;gguid&quot; style=&quot;display:none&quot;&gt;
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">form</span>&gt;
  &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> name=<span class="hljs-string">&quot;id&quot;</span>&gt;
  &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;text&quot;</span> name=<span class="hljs-string">&quot;gguid&quot;</span> style=<span class="hljs-string">&quot;display:none&quot;</span>&gt;
&lt;/<span class="hljs-keyword">form</span>&gt;</code></pre><p>7.CSS&#x4E2D;&#x7684;counter&#x4F1A;&#x5FFD;&#x7565;<code>display:none</code>&#x7684;&#x5143;&#x7D20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".start{
  counter-reset: son 0;
}
.son{
  counter-increment: son 1;
}
.son::before{
  content: counter(son) &quot;. &quot;;
}

&lt;div class=&quot;start&quot;&gt;
  &lt;div class=&quot;son&quot;&gt;son1&lt;/div&gt;
  &lt;div class=&quot;son&quot; style=&quot;display:none&quot;&gt;son2&lt;/div&gt;
  &lt;div class=&quot;son&quot;&gt;son3&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>.start{
  counter-reset: son <span class="hljs-number">0</span>;
}
.son{
  counter-increment: son <span class="hljs-number">1</span>;
}
.son::<span class="hljs-keyword">before</span>{
  content: counter(son) <span class="hljs-string">&quot;. &quot;</span>;
}

&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;start&quot;</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;son&quot;</span>&gt;son1&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;son&quot;</span> style=<span class="hljs-string">&quot;display:none&quot;</span>&gt;son2&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;son&quot;</span>&gt;son3&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x7ED3;&#x679C;&#x5C31;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. son1
2. son3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>son1
<span class="hljs-bullet">2. </span>son3</code></pre><p>8.Transition&#x5BF9;<code>display</code>&#x7684;&#x53D8;&#x5316;&#x4E0D;&#x611F;&#x5192;<br>&#x8BE6;&#x60C5;&#x8BF7;&#x53C2;&#x8003;<a href="https://www.cnblogs.com/fsjohnhuang/p/9143035.html" rel="nofollow noreferrer" target="_blank">CSS&#x9B54;&#x6CD5;&#x5802;&#xFF1A;Transition&#x5C31;&#x8FD9;&#x4E48;&#x597D;&#x73A9;</a></p><p>9.display&#x53D8;&#x5316;&#x65F6;&#x5C06;&#x89E6;&#x53D1;reflow<br>&#x6487;&#x5F00;<code>display:none</code>&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x770B;<code>display:block</code>&#x8868;&#x793A;&#x5143;&#x7D20;&#x4F4D;&#x4E8E;BFC&#x4E2D;&#xFF0C;&#x800C;<code>display:inline</code>&#x5219;&#x8868;&#x793A;&#x5143;&#x7D20;&#x4F4D;&#x4E8E;IFC&#x4E2D;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;<code>display</code>&#x7684;&#x7528;&#x4E8E;&#x5C31;&#x662F;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x6240;&#x5C5E;&#x7684;&#x5E03;&#x5C40;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x82E5;&#x4FEE;&#x6539;<code>display</code>&#x503C;&#x5219;&#x8868;&#x793A;&#x5143;&#x7D20;&#x91C7;&#x7528;&#x7684;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#x5DF2;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x4E0D;&#x89E6;&#x53D1;reflow&#x624D;&#x5947;&#x602A;&#x5462;&#xFF01;</p><h2 id="articleHeader2">&#x6DF1;&#x5165;<code>visibility</code></h2><p>&#x2003;visibility&#x6709;&#x4E24;&#x4E2A;&#x4E0D;&#x540C;&#x7684;&#x4F5C;&#x7528;</p><ol><li>&#x7528;&#x4E8E;&#x9690;&#x85CF;&#x8868;&#x683C;&#x7684;&#x884C;&#x548C;&#x5217;</li><li>&#x7528;&#x4E8E;&#x5728;&#x4E0D;&#x89E6;&#x53D1;&#x5E03;&#x5C40;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x9690;&#x85CF;&#x5143;&#x7D20;</li></ol><h3 id="articleHeader3">4&#x4E2A;&#x6709;&#x6548;&#x503C;</h3><p>1.visible<br>&#x2003;&#x6CA1;&#x4EC0;&#x4E48;&#x597D;&#x8BF4;&#x7684;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x754C;&#x9762;&#x4E0A;&#x663E;&#x793A;&#x3002;<br>2.hidden<br>&#x2003;&#x8BA9;&#x5143;&#x7D20;&#x5728;&#x89C1;&#x9762;&#x4E0A;&#x4E0D;&#x53EF;&#x89C6;&#xFF0C;&#x4F46;&#x4FDD;&#x7559;&#x5143;&#x7D20;&#x539F;&#x6765;&#x5360;&#x6709;&#x7684;&#x4F4D;&#x7F6E;&#x3002;<br>3.collapse<br>&#x2003;&#x7528;&#x4E8E;&#x8868;&#x683C;&#x5B50;&#x5143;&#x7D20;(&#x5982;<code>tr</code>,<code>tbody</code>,<code>col</code>,<code>colgroup</code>)&#x65F6;&#x6548;&#x679C;&#x548C;<code>display:none</code>&#x4E00;&#x6837;&#xFF0C;&#x7528;&#x4E8E;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x4E0A;&#x65F6;&#x5219;&#x6548;&#x679C;&#x4E0E;<code>visibility:hidden</code>&#x4E00;&#x6837;&#x3002;&#x4E0D;&#x8FC7;&#x7531;&#x4E8E;&#x5404;&#x6D4F;&#x89C8;&#x5668;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#x5747;&#x6709;&#x51FA;&#x5165;&#xFF0C;&#x56E0;&#x6B64;&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x503C;&#x3002;<br>4.inherit<br>&#x2003;&#x7EE7;&#x627F;&#x7236;&#x5143;&#x7D20;&#x7684;<code>visibility</code>&#x503C;&#x3002;</p><h2 id="articleHeader4">&#x5BF9;&#x6BD4;&#x6E05;&#x695A;<code>display:none</code>&#x548C;<code>visibility:hidden</code></h2><p>&#x2003;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5BF9;<code>display:none</code>&#x5217;&#x51FA;8&#x70B9;&#x6CE8;&#x610F;&#x4E8B;&#x9879;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x4EC5;&#x9700;&#x5BF9;&#x7167;&#x5B83;&#x9010;&#x4E00;&#x5217;&#x51FA;<code>visibility</code>&#x7684;&#x4E0D;&#x5C31;&#x6E05;&#x6670;&#x53EF;&#x89C1;&#x4E86;&#x5417;&#xFF1F;<br>1.&#x7236;&#x5143;&#x7D20;&#x4E3A;<code>visibility:hidden</code>&#xFF0C;&#x800C;&#x5B50;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E3A;<code>visibility:visible</code>&#x5E76;&#x4E14;&#x751F;&#x6548;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
  border: solid 2px blue;
}
.visible{
  visibility: visible;
}
.hidden{
  visibility: hidden;
}
&lt;div class=&quot;hidden&quot;&gt;
  I&apos;m Parent.
  &lt;div class=&quot;visible&quot;&gt;
    I&apos;m Son.
  &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code><span class="hljs-keyword">div</span>{
  border: solid <span class="hljs-number">2</span>px blue;
}
.visible{
  visibility: visible;
}
.hidden{
  visibility: hidden;
}
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;hidden&quot;</span>&gt;
  I&apos;m Parent.
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;visible&quot;</span>&gt;
    I&apos;m Son.
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000016570006?w=647&amp;h=73" src="https://static.alili.tech/img/remote/1460000016570006?w=647&amp;h=73" alt="" title="" style="cursor:pointer"></span></p><p>2.&#x548C;<code>display:none</code>&#x4E00;&#x6837;&#x65E0;&#x6CD5;&#x83B7;&#x5F97;&#x7126;&#x70B9;</p><p>3.&#x53EF;&#x5728;&#x5192;&#x6CE1;&#x9636;&#x6BB5;&#x54CD;&#x5E94;&#x4E8B;&#x4EF6;<br>&#x7531;&#x4E8E;&#x8BBE;&#x7F6E;&#x4E3A;<code>visibility:hidden</code>&#x7684;&#x5143;&#x7D20;&#x5176;&#x5B50;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x4E3A;<code>visibility:visible</code>&#xFF0C;&#x56E0;&#x6B64;&#x9690;&#x85CF;&#x7684;&#x5143;&#x7D20;&#x6709;&#x53EF;&#x80FD;&#x4F4D;&#x4E8E;&#x4E8B;&#x4EF6;&#x5192;&#x6CE1;&#x7684;&#x8DEF;&#x5F84;&#x4E0A;&#x56E0;&#x6B64;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5C06;&#x9F20;&#x6807;&#x79FB;&#x81F3;<code>.visible</code>&#x65F6;&#xFF0C;<code>.hidden</code>&#x4F1A;&#x54CD;&#x5E94;<code>hover</code>&#x4E8B;&#x4EF6;&#x663E;&#x793A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
  border: solid 2px blue;
}
.visible{
  visibility: visible;
}
.hidden{
  visibility: hidden;
}
.hidden:hover{
  visibility: visible;
}
&lt;div class=&quot;hidden&quot;&gt;
  I&apos;m Parent.
  &lt;div class=&quot;visible&quot;&gt;
    I&apos;m Son.
  &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code><span class="hljs-keyword">div</span>{
  border: solid <span class="hljs-number">2</span>px blue;
}
.visible{
  visibility: visible;
}
.hidden{
  visibility: hidden;
}
.hidden:hover{
  visibility: visible;
}
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;hidden&quot;</span>&gt;
  I&apos;m Parent.
  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;visible&quot;</span>&gt;
    I&apos;m Son.
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>4.&#x548C;<code>display:none</code>&#x4E00;&#x6837;&#x4E0D;&#x59A8;&#x788D;form&#x8868;&#x5355;&#x7684;&#x63D0;&#x4EA4;</p><p>5.CSS&#x4E2D;&#x7684;counter&#x4E0D;&#x4F1A;&#x5FFD;&#x7565;</p><p>6.Transition&#x5BF9;<code>visibility</code>&#x7684;&#x53D8;&#x5316;&#x6709;&#x6548;</p><p>7.visibility&#x53D8;&#x5316;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;reflow<br>&#x7531;&#x4E8E;&#x4ECE;visible&#x8BBE;&#x7F6E;&#x4E3A;hidden&#x65F6;&#xFF0C;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x5143;&#x7D20;&#x5E03;&#x5C40;&#x76F8;&#x5173;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;reflow&#xFF0C;&#x53EA;&#x662F;&#x9759;&#x9759;&#x5730;&#x548C;&#x5176;&#x4ED6;&#x6E32;&#x67D3;&#x53D8;&#x5316;&#x4E00;&#x8D77;&#x7B49;&#x5F85;&#x6D4F;&#x89C8;&#x5668;&#x5B9A;&#x65F6;&#x91CD;&#x7ED8;&#x754C;&#x9762;&#x3002;</p><h2 id="articleHeader5">&#x603B;&#x7ED3;</h2><p>&#x2003;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5BF9;<code>display:none</code>&#x548C;<code>visibility:hidden</code>&#x5E94;&#x8BE5;&#x6709;&#x66F4;&#x6DF1;&#x5165;&#x7684;&#x4E86;&#x89E3;&#x4E86;&#xFF0C;&#x4E0B;&#x6B21;&#x9762;&#x8BD5;&#x65F6;&#x6211;&#x4EEC;&#x7684;&#x7B54;&#x6848;&#x4F1A;&#x66F4;&#x4E30;&#x5BCC;&#x51FA;&#x5F69;&#x54E6;&#xFF01;<br>&#x2003;&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x610F;&#x6765;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9727386.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/fsjoh...</a> &#x80A5;&#x4ED4;John^_^</p><h2 id="articleHeader6">&#x5F15;&#x7528;</h2><p><a href="https://css-tricks.com/almanac/properties/v/visibility/" rel="nofollow noreferrer" target="_blank">https://css-tricks.com/almana...</a><br><a href="https://juejin.im/post/5b406f40e51d45194832b759" rel="nofollow noreferrer" target="_blank">https://juejin.im/post/5b406f...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：display:none与visibility:hidden的恩怨情仇

## 原文链接
[https://segmentfault.com/a/1190000016570003](https://segmentfault.com/a/1190000016570003)


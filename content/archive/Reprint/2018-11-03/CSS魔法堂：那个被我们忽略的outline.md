---
title: CSS魔法堂：那个被我们忽略的outline
hidden: true
categories: reprint
slug: 73d3572d
date: 2018-11-03 10:03:44
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x2003;&#x5728;<a href="https://www.cnblogs.com/fsjohnhuang/p/9741345.html" rel="nofollow noreferrer" target="_blank">CSS&#x9B54;&#x6CD5;&#x5802;&#xFF1A;&#x6539;&#x53D8;&#x5355;&#x9009;&#x6846;&#x989C;&#x8272;&#x5C31;&#x8FD9;&#x4E48;&#x5439;&#x6BDB;&#x6C42;&#x75B5;&#xFF01;</a>&#x4E2D;&#x6211;&#x4EEC;&#x8981;&#x6A21;&#x62DF;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x901A;&#x8FC7;<code>Tab</code>&#x952E;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x8FD9;&#x91CC;&#x6D89;&#x53CA;&#x5230;&#x4E00;&#x4E2A;&#x5E38;&#x5E38;&#x88AB;&#x5FFD;&#x7565;&#x7684;&#x5C5E;&#x6027;&#x2014;&#x2014;<code>outline</code>&#xFF0C;&#x7531;&#x4E8E;&#x4E4B;&#x524D;&#x5BF9;&#x5176;&#x5370;&#x8C61;&#x786E;&#x5B9E;&#x6709;&#x4E9B;&#x6A21;&#x7CCA;&#xFF0C;&#x4E8E;&#x662F;&#x672C;&#x6587;&#x6253;&#x7B97;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x7A0D;&#x5FAE;&#x6DF1;&#x5165;&#x7684;&#x7814;&#x7A76;^_^</p><h2 id="articleHeader1">Spec&#x662F;&#x8FD9;&#x6837;&#x63CF;&#x8FF0;&#x5B83;&#x7684;</h2><h3 id="articleHeader2">&#x4F5C;&#x7528;</h3><p>&#x2003;&#x7528;&#x4E8E;&#x521B;&#x5EFA;&#x53EF;&#x89C6;&#x5BF9;&#x8C61;&#x7684;&#x8F6E;&#x5ED3;(&#x5143;&#x7D20;&#x7684;border-box)&#xFF0C;&#x5982;&#x8868;&#x5355;&#x6309;&#x94AE;&#x8F6E;&#x5ED3;&#x7B49;&#x3002;</p><h3 id="articleHeader3">&#x4E0E;border&#x4E0D;&#x540C;</h3><ol><li>outline&#x4E0D;&#x5360;&#x6587;&#x6863;&#x7A7A;&#x95F4;&#xFF1B;</li><li>outline&#x4E0D;&#x4E00;&#x5B9A;&#x662F;&#x77E9;&#x5F62;&#x3002;</li></ol><h3 id="articleHeader4">&#x5177;&#x4F53;&#x5C5E;&#x6027;&#x8BF4;&#x660E;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x8F6E;&#x5ED3;&#x7EBF;&#x989C;&#x8272; 
 * invert&#x8868;&#x793A;&#x4E3A;&#x989C;&#x8272;&#x53CD;&#x8F6C;&#xFF0C;&#x5373;&#x4F7F;&#x8F6E;&#x5ED3;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x80CC;&#x666F;&#x989C;&#x8272;&#x4E2D;&#x90FD;&#x53EF;&#x89C1; 
 */
outline-color: invert | &lt;color_name&gt; | &lt;hex_number&gt; | &lt;rgb_number&gt; | inherit
/* &#x8F6E;&#x5ED3;&#x7EBF;&#x6837;&#x5F0F; */
outline-style: none | dotted | dashed | solid | double | groove | ridge | inset | outset | inherit
/* &#x8F6E;&#x5ED3;&#x7EBF;&#x5BBD;&#x5EA6; */
outline-width: medium | thin | thick | &lt;length&gt; | inherit
/* &#x4E00;&#x6B21;&#x6027;&#x8BBE;&#x7F6E;&#x8F6E;&#x5ED3;&#x7EBF;&#x7684;&#x989C;&#x8272;&#x3001;&#x6837;&#x5F0F; &#x548C; &#x5BBD;&#x5EA6; */
outline: &lt;outline-color&gt; &lt;outline-style&gt; &lt;outline-width&gt;;
/* &#x8F6E;&#x5ED3;&#x7EBF;&#x7684;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x5927;&#x4E8E;0&#x5219;&#x8F6E;&#x5ED3;&#x6269;&#x5927;&#xFF0C;&#x5C0F;&#x4E8E;0&#x5219;&#x8F6E;&#x5ED3;&#x7F29;&#x5C0F; */
outline-offset: 0px;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>/* &#x8F6E;&#x5ED3;&#x7EBF;&#x989C;&#x8272; 
 * invert&#x8868;&#x793A;&#x4E3A;&#x989C;&#x8272;&#x53CD;&#x8F6C;&#xFF0C;&#x5373;&#x4F7F;&#x8F6E;&#x5ED3;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x80CC;&#x666F;&#x989C;&#x8272;&#x4E2D;&#x90FD;&#x53EF;&#x89C1; 
 */
outline-color: invert | <span class="hljs-type">&lt;color_name</span>&gt; | <span class="hljs-type">&lt;hex_number</span>&gt; | <span class="hljs-type">&lt;rgb_number</span>&gt; | <span class="hljs-type">inherit</span>
/* &#x8F6E;&#x5ED3;&#x7EBF;&#x6837;&#x5F0F; */
outline-style: none | <span class="hljs-type">dotted</span> | <span class="hljs-type">dashed</span> | <span class="hljs-type">solid</span> | <span class="hljs-type">double</span> | <span class="hljs-type">groove</span> | <span class="hljs-type">ridge</span> | <span class="hljs-type">inset</span> | <span class="hljs-type">outset</span> | <span class="hljs-type">inherit</span>
/* &#x8F6E;&#x5ED3;&#x7EBF;&#x5BBD;&#x5EA6; */
outline-width: medium | <span class="hljs-type">thin</span> | <span class="hljs-type">thick</span> | <span class="hljs-type">&lt;length</span>&gt; | <span class="hljs-type">inherit</span>
/* &#x4E00;&#x6B21;&#x6027;&#x8BBE;&#x7F6E;&#x8F6E;&#x5ED3;&#x7EBF;&#x7684;&#x989C;&#x8272;&#x3001;&#x6837;&#x5F0F; &#x548C; &#x5BBD;&#x5EA6; */
outline: &lt;outline-color&gt; &lt;outline-style&gt; &lt;outline-width&gt;;
/* &#x8F6E;&#x5ED3;&#x7EBF;&#x7684;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x5927;&#x4E8E;<span class="hljs-number">0</span>&#x5219;&#x8F6E;&#x5ED3;&#x6269;&#x5927;&#xFF0C;&#x5C0F;&#x4E8E;<span class="hljs-number">0</span>&#x5219;&#x8F6E;&#x5ED3;&#x7F29;&#x5C0F; */
outline-offset: <span class="hljs-number">0</span>px;</code></pre><h2 id="articleHeader5">&#x9B54;&#x9B3C;&#x5728;&#x7EC6;&#x8282;</h2><h3 id="articleHeader6">&#x517C;&#x5BB9;&#x6027;</h3><p>&#x2003;<code>outline</code>&#x4F5C;&#x4E3A;CSS2.1&#x89C4;&#x8303;&#xFF0C;&#x56E0;&#x6B64;IE6/7/8(Q)&#x5747;&#x4E0D;&#x652F;&#x6301;&#xFF0C;&#x5728;IE8&#x4E0B;&#x5199;&#x5165;&#x6B63;&#x786E;&#x7684;DOCTYPE&#x5219;&#x652F;&#x6301;outline&#x5C5E;&#x6027;&#x3002;<br>&#x2003;<code>outline-offset</code>&#x5219;IE&#x4E0B;&#x5747;&#x4E0D;&#x652F;&#x6301;&#x3002;</p><h3 id="articleHeader7">IE6/7/8(Q)&#x4E0B;&#x9690;&#x85CF;outline</h3><p>&#x82E5;&#x8981;&#x5728;IE6/7/8(Q)&#x4E0B;&#x9690;&#x85CF;outline&#x6548;&#x679C;&#xFF0C;&#x5219;&#x5728;&#x5143;&#x7D20;&#x4E0A;&#x6DFB;&#x52A0;<code>hideFocus</code>&#x7279;&#x6027;&#x5373;&#x53EF;&#x3002;</p><h3 id="articleHeader8"><code>outline:0</code>&#x548C;<code>outline:none</code>&#x7684;&#x533A;&#x522B;</h3><p>&#x5728;Chrome&#x4E0B;&#x6267;&#x884C;&#x5982;&#x4E0B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style type=&quot;text/css&quot;&gt;
 .outline0{
   outline: 0;
 }
 .outline-none{
   outline: none;
 }
&lt;/style&gt;
&lt;a href=&quot;#&quot; class=&quot;outline0&quot;&gt;outline: 0&lt;/a&gt;
&lt;a href=&quot;#&quot; class=&quot;outline-none&quot;&gt;outline: none&lt;/a&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  const $ = document.querySelector.bind(document)
  const print = console.log.bind(console)
  const cssProps = [&quot;outline-width&quot;, &quot;outline-style&quot;, &quot;outline-color&quot;]
  const slctrs = [&quot;.outline0&quot;, &quot;.outline-none&quot;]
     
  slctrs.forEach(slctr =&gt; {
    styles = window.getComputedStyle($(slctr))
      cssProps.forEach(cssProp =&gt; {
        print(&quot;%s, %s is %s&quot;, slctr, cssProp, styles[cssProp])
      })
    })
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
 <span class="hljs-selector-class">.outline0</span>{
   <span class="hljs-attribute">outline</span>: <span class="hljs-number">0</span>;
 }
 <span class="hljs-selector-class">.outline-none</span>{
   <span class="hljs-attribute">outline</span>: none;
 }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;outline0&quot;</span>&gt;</span>outline: 0<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;outline-none&quot;</span>&gt;</span>outline: none<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">const</span> $ = <span class="hljs-built_in">document</span>.querySelector.bind(<span class="hljs-built_in">document</span>)
  <span class="hljs-keyword">const</span> print = <span class="hljs-built_in">console</span>.log.bind(<span class="hljs-built_in">console</span>)
  <span class="hljs-keyword">const</span> cssProps = [<span class="hljs-string">&quot;outline-width&quot;</span>, <span class="hljs-string">&quot;outline-style&quot;</span>, <span class="hljs-string">&quot;outline-color&quot;</span>]
  <span class="hljs-keyword">const</span> slctrs = [<span class="hljs-string">&quot;.outline0&quot;</span>, <span class="hljs-string">&quot;.outline-none&quot;</span>]
     
  slctrs.forEach(<span class="hljs-function"><span class="hljs-params">slctr</span> =&gt;</span> {
    styles = <span class="hljs-built_in">window</span>.getComputedStyle($(slctr))
      cssProps.forEach(<span class="hljs-function"><span class="hljs-params">cssProp</span> =&gt;</span> {
        print(<span class="hljs-string">&quot;%s, %s is %s&quot;</span>, slctr, cssProp, styles[cssProp])
      })
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outline0, outline-width is 0px
.outline0, outline-style is none
.outline0, outline-color is rgb(0, 0, 238)
.outline-none, outline-width is 0px
.outline-none, outline-style is none
.outline-none, outline-color is rgb(0, 0, 238)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-class">.outline0</span>, <span class="hljs-attribute">outline-width</span> is <span class="hljs-number">0px</span>
<span class="hljs-selector-class">.outline0</span>, <span class="hljs-attribute">outline-style</span> is none
<span class="hljs-selector-class">.outline0</span>, <span class="hljs-attribute">outline-color</span> is rgb(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">238</span>)
<span class="hljs-selector-class">.outline-none</span>, <span class="hljs-attribute">outline-width</span> is <span class="hljs-number">0px</span>
<span class="hljs-selector-class">.outline-none</span>, <span class="hljs-attribute">outline-style</span> is none
<span class="hljs-selector-class">.outline-none</span>, <span class="hljs-attribute">outline-color</span> is rgb(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">238</span>)</code></pre><p>&#x2003;<code>outline</code>&#x4EC5;&#x4EC5;&#x4E3A;&#x8BBE;&#x7F6E;&#x5355;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5177;&#x4F53;&#x7684;<code>outline</code>&#x5C5E;&#x6027;&#x63D0;&#x4F9B;&#x66F4;&#x4FBF;&#x6377;&#x7684;API&#x800C;&#x5DF2;&#xFF0C;&#x56E0;&#x6B64;<code>outline:0</code>&#x548C;<code>outline:none</code>&#x672C;&#x8D28;&#x4E0A;&#x6548;&#x679C;&#x662F;&#x4E00;&#x81F4;&#x7684;&#x3002;</p><h3 id="articleHeader9">&#x771F;&#x5FC3;&#x6CA1;&#x6CD5;&#x5F04;&#x51FA;&#x5706;&#x89D2;</h3><p>&#x2003;&#x81EA;&#x4ECE;&#x6709;&#x4E86;<code>border-radius</code>&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;CSS&#x5236;&#x4F5C;&#x5706;&#x89D2;&#x77E9;&#x5F62;&#x3001;&#x5706;&#x5F62;&#x7B49;&#x56FE;&#x5F62;&#xFF0C;&#x751A;&#x81F3;&#x8FDE;<code>box-shadow</code>&#x4E5F;&#x53D7;&#x5230;<code>border-radius</code>&#x5F71;&#x54CD;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x5143;&#x7D20;&#x9634;&#x5F71;&#x4E5F;&#x80FD;&#x505A;&#x5230;&#x5706;&#x89D2;&#x7684;&#x6548;&#x679C;&#x3002;&#x90A3;&#x4E48;<code>outline</code>&#x662F;&#x5426;&#x4E5F;&#x80FD;&#x505A;&#x51FA;&#x5706;&#x89D2;&#x7684;&#x6548;&#x679C;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x662F;&#x5426;&#x5B9A;&#x7684;&#x3002;&#x90A3;&#x662F;&#x56E0;&#x4E3A;<code>outline</code>&#x7684;&#x4F5C;&#x7528;&#x672C;&#x6765;&#x5C31;&#x662F;&#x7528;&#x4E8E;&#x52FE;&#x52D2;&#x51FA;&#x5143;&#x7D20;&#x6240;&#x5360;&#x7684;&#x7A7A;&#x95F4;&#x8F6E;&#x5ED3;&#xFF0C;&#x901A;&#x8FC7;<code>border-radius</code>&#x867D;&#x7136;&#x5B9E;&#x73B0;&#x4E86;&#x56FE;&#x5F62;&#x89C6;&#x89C9;&#x4E0A;&#x7684;&#x5706;&#x89D2;&#xFF0C;&#x4F46;&#x8BE5;&#x5143;&#x7D20;&#x6240;&#x5360;&#x4F4D;&#x7F6E;&#x7A7A;&#x95F4;&#x4E00;&#x70B9;&#x90FD;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#xFF0C;&#x8FD8;&#x662F;&#x90A3;&#x4E2A;&#x6709;&#x68F1;&#x6709;&#x89D2;&#x7684;&#x65B9;&#x5F62;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style type=&quot;text/css&quot;&gt;
  .round{
    width: 100px;
    height: 100px;
    background: yellow;
    border-radius: 50%;
    outline: solid 1px red;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.round</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: yellow;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">outline</span>: solid <span class="hljs-number">1px</span> red;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016616331?w=178&amp;h=117" src="https://static.alili.tech/img/remote/1460000016616331?w=178&amp;h=117" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader10">&#x8F6E;&#x5ED3;&#x7684;&#x5DEE;&#x5F02;</h3><p>&#x2003;&#x5728;Chrome&#x4E0B;<code>outline</code>&#x4EC5;&#x9650;&#x4E8E;&#x6807;&#x8BC6;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x6240;&#x5360;&#x7684;&#x4F4D;&#x7F6E;&#x7A7A;&#x95F4;&#xFF08;border-box&#xFF09;&#xFF0C;&#x4F46;&#x5728;FireFox&#x4E0B;&#x5219;&#x5305;&#x542B;&#x5B50;&#x5B59;&#x5143;&#x7D20;&#x6240;&#x5360;&#x7684;&#x4F4D;&#x7F6E;&#x7A7A;&#x95F4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style type=&quot;text/css&quot;&gt;
  .outline{
    width: 13px;
    height: 13px;
    outline: 1px solid red;
  }
&lt;/style&gt;
&lt;div class=&quot;outline&quot;&gt;&lt;/div&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
  const el = document.querySelector(&quot;.outline&quot;)
  el.textContent = !!~navigator.appVersion.indexOf(&quot;Chrome&quot;) ? &quot;Chrome&quot; : &quot;FireFox&quot;
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.outline</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">13px</span>;
    <span class="hljs-attribute">outline</span>: <span class="hljs-number">1px</span> solid red;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;outline&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">const</span> el = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&quot;.outline&quot;</span>)
  el.textContent = !!~navigator.appVersion.indexOf(<span class="hljs-string">&quot;Chrome&quot;</span>) ? <span class="hljs-string">&quot;Chrome&quot;</span> : <span class="hljs-string">&quot;FireFox&quot;</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016616332" src="https://static.alili.tech/img/remote/1460000016616332" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader11">&#x603B;&#x7ED3;</h2><p>&#x2003;&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x6765;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9753554.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/fsjoh...</a> ^_^&#x80A5;&#x4ED4;John</p><h2 id="articleHeader12">&#x53C2;&#x8003;</h2><p><a href="https://www.xuebuyuan.com/757567.html" rel="nofollow noreferrer" target="_blank">https://www.xuebuyuan.com/757...</a><br><a href="https://www.zhangxinxu.com/wordpress/2010/01/%E9%A1%B5%E9%9D%A2%E5%8F%AF%E7%94%A8%E6%80%A7%E4%B9%8Boutline%E8%BD%AE%E5%BB%93%E5%A4%96%E6%A1%86%E7%9A%84%E4%B8%80%E4%BA%9B%E7%A0%94%E7%A9%B6/" rel="nofollow noreferrer" target="_blank">https://www.zhangxinxu.com/wo...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：那个被我们忽略的outline

## 原文链接
[https://segmentfault.com/a/1190000016616328](https://segmentfault.com/a/1190000016616328)


---
title: CSS魔法堂：一起玩透伪元素和Content属性
hidden: true
categories: [reprint]
slug: f2cd9071
date: 2018-11-08 02:30:09
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x2003;&#x7EE7;&#x4E0A;&#x7BC7;&#x300A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9551799.html" rel="nofollow noreferrer" target="_blank">CSS&#x9B54;&#x6CD5;&#x5802;&#xFF1A;&#x7A0D;&#x7A0D;&#x6DF1;&#x5165;&#x4F2A;&#x7C7B;&#x9009;&#x62E9;&#x5668;</a>&#x300B;&#x8BB0;&#x5F55;&#x5B8C;&#x4F2A;&#x7C7B;&#x540E;&#xFF0C;&#x6211;&#x81EA;&#x7136;&#x800C;&#x7136;&#x8981;&#x5411;&#x4F2A;&#x5143;&#x7D20;&#x4F38;&#x51FA;&#x201C;&#x9B54;&#x638C;&#x201D;&#x7684;&#x5566;^_^&#x3002;&#x672C;&#x6587;&#x8BB2;&#x8BB2;&#x8FF0;&#x4F2A;&#x5143;&#x7D20;&#x4EE5;&#x53CA;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#x7684;Contet&#x5C5E;&#x6027;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F2A;&#x5143;&#x7D20;&#x66F4;&#x597D;&#x5730;&#x5B9E;&#x73B0;&#x66F4;&#x591A;&#x7684;&#x53EF;&#x80FD;&#xFF01;</p><h2 id="articleHeader1">&#x521D;&#x8BC6;&#x4F2A;&#x5143;&#x7D20;</h2><p>&#x2003;&#x8BF4;&#x8D77;&#x4F2A;&#x5143;&#x7D20;&#x6211;&#x7B2C;&#x4E00;&#x60F3;&#x5230;&#x7684;&#x83AB;&#x8FC7;&#x4E8E;<code>::before</code>&#x548C;<code>::after</code>&#x8FD9;&#x4E24;&#x4E2A;&#x4E86;&#xFF0C;&#x5B83;&#x4FE9;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5728;&#x5176;&#x9644;&#x5C5E;&#x7684;&#x9009;&#x62E9;&#x5668;&#x547D;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x4E0A;&#x63D2;&#x5165;&#x7B2C;&#x4E00;&#x4E2A;&#x5B50;&#x8282;&#x70B9;&#x548C;&#x8FFD;&#x52A0;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5B50;&#x8282;&#x70B9;&#x3002;&#x90A3;&#x8FD9;&#x65F6;&#x6211;&#x4E0D;&#x7981;&#x5730;&#x60F3;&#x95EE;&#xFF1A;&#x201C;&#x76F4;&#x63A5;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;class&#x4E3A;.before&#x548C;.after&#x4E0D;&#x662F;&#x4E00;&#x6837;&#x7684;&#x5417;&#xFF1F;&#x201D;<br>&#x2003;&#x5176;&#x5B9E;&#x4F7F;&#x7528;&#x4F2A;&#x5143;&#x7D20;<code>::before</code>&#x548C;<code>::after</code>&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x597D;&#x5904;&#xFF1A;</p><ol><li>HTML&#x7684;&#x4EE3;&#x7801;&#x91CF;&#x51CF;&#x5C11;&#xFF0C;&#x5BF9;SEO&#x6709;&#x5E2E;&#x52A9;&#xFF1B;</li><li>&#x63D0;&#x9AD8;JavaScript&#x67E5;&#x8BE2;&#x5143;&#x7D20;&#x7684;&#x6548;&#x7387;&#x3002;</li></ol><p>&#x2003;&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x8FD9;&#x4E24;&#x597D;&#x5904;&#x5462;&#xFF1F;&#x539F;&#x56E0;&#x5C31;&#x662F;&#x4F2A;&#x5143;&#x7D20;&#x5E76;&#x4E0D;&#x5B58;&#x5728;&#x4E8E;DOM&#x4E2D;&#xFF0C;&#x800C;&#x662F;&#x4F4D;&#x4E8E;CSSOM&#xFF0C;HTML&#x4EE3;&#x7801;&#x548C;DOM Tree&#x4E2D;&#x5747;&#x6CA1;&#x6709;&#x5B83;&#x7684;&#x8EAB;&#x5F71;&#xFF0C;&#x91CF;&#x5C11;&#x4E86;&#x81EA;&#x7136;&#x6548;&#x7387;&#x6709;&#x6240;&#x63D0;&#x5347;&#x3002;&#x4F46;&#x8FD9;&#x4E5F;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#x2014;&#x2014;&#x6211;&#x4EEC;&#x6CA1;&#x529E;&#x6CD5;&#x901A;&#x8FC7;JavaScript&#x5B8C;&#x5168;&#x64CD;&#x63A7;&#x4F2A;&#x5143;&#x7D20;&#xFF08;&#x6211;&#x5C06;&#x5728;&#x4E0B;&#x9762;&#x4E00;&#x8282;&#x4E3A;&#x5927;&#x5BB6;&#x8BB2;&#x8FF0;&#xFF09;</p><h3 id="articleHeader2">&#x4E00;&#x5927;&#x6CE2;&#x4F2A;&#x5143;&#x7D20;&#x6765;&#x4E86;</h3><p>&#x9664;&#x4E86;<code>::before</code>&#x548C;<code>::after</code>&#x5916;&#xFF0C;&#x522B;&#x6F0F;&#x4E86;&#x4EE5;&#x4E0B;&#x7684;&#x54E6;&#xFF01;</p><ol><li><code>:first-line</code>&#xFF1A;&#x53EA;&#x80FD;&#x7528;&#x4E8E;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x3002;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x9644;&#x5C5E;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x884C;&#x5185;&#x5BB9;&#x7684;&#x6837;&#x5F0F;&#x3002;&#x53EF;&#x7528;&#x7684;CSS&#x5C5E;&#x6027;&#x4E3A;<code>font,color,background,word-spacing,letter-spacing,text-decoration,vertical-align,text-transform,line-height,clear</code>&#x3002;</li><li><code>:first-letter</code>&#xFF1A;&#x53EA;&#x80FD;&#x7528;&#x4E8E;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x3002;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x9644;&#x5C5E;&#x5143;&#x7D20;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x6BCD;&#x7684;&#x6837;&#x5F0F;&#x3002;&#x53EF;&#x7528;&#x7684;CSS&#x5C5E;&#x6027;&#x4E3A;<code>font,color,background,marin,padding,border,text-decoration,vertical-align,text-transform,line-height,float,clear</code>&#x3002;</li><li><code>::selection</code>&#xFF1A;&#x5339;&#x914D;&#x9009;&#x4E2D;&#x90E8;&#x5206;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x53EF;&#x7528;&#x7684;CSS&#x5C5E;&#x6027;&#x4E3A;<code>background,color</code>&#x3002;</li></ol><p>&#x6709;&#x6CA1;&#x6709;&#x53D1;&#x73B0;&#x6709;&#x7684;&#x4F2A;&#x5143;&#x7D20;&#x524D;&#x7F00;&#x662F;<code>:</code>&#x6709;&#x7684;&#x5374;&#x662F;<code>::</code>&#x5462;&#xFF1F;<code>::</code>&#x662F;CSS3&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x5176;&#x5B9E;&#x9664;&#x4E86;<code>::selection</code>&#x5916;&#xFF0C;&#x5176;&#x4ED6;&#x4F2A;&#x5143;&#x7D20;&#x65E2;&#x4E24;&#x79CD;&#x524D;&#x7F00;&#x90FD;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#xFF0C;&#x4E3A;&#x517C;&#x5BB9;&#x6027;&#x53EF;&#x9009;&#x62E9;&#x4F7F;&#x7528;<code>:</code>&#xFF0C;&#x4E3A;&#x5BB9;&#x6613;&#x533A;&#x5206;&#x4F2A;&#x5143;&#x7D20;&#x548C;&#x4F2A;&#x7C7B;&#x5219;&#x4F7F;&#x7528;<code>::</code>&#xFF0C;&#x4F46;&#x6211;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;<code>::</code>&#x6765;&#x63D0;&#x9AD8;&#x53EF;&#x8BFB;&#x6027;&#xFF0C;&#x517C;&#x5BB9;&#x6027;&#x5C31;&#x8BA9;postcss&#x7B49;&#x5DE5;&#x5177;&#x5E2E;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x5C31;&#x597D;&#x4E86;&#x3002;</p><h3 id="articleHeader3"><code>::before</code>&#x548C;<code>::after</code>&#x7684;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h3><ol><li>&#x9ED8;&#x8BA4;<code>display: inline</code>&#xFF1B;</li><li>&#x5FC5;&#x987B;&#x8BBE;&#x7F6E;content&#x5C5E;&#x6027;&#xFF0C;&#x5426;&#x5219;&#x4E00;&#x5207;&#x90FD;&#x662F;&#x65E0;&#x7528;&#x529F;&#xFF1B;</li><li>&#x9ED8;&#x8BA4;<code>user-select: none</code>&#xFF0C;&#x5C31;&#x662F;<code>::before</code>&#x548C;<code>::after</code>&#x7684;&#x5185;&#x5BB9;&#x65E0;&#x6CD5;&#x88AB;&#x7528;&#x6237;&#x9009;&#x4E2D;&#x7684;&#xFF1B;</li><li>&#x4F2A;&#x5143;&#x7D20;&#x548C;&#x4F2A;&#x7C7B;&#x7ED3;&#x5408;&#x4F7F;&#x7528;&#x5F62;&#x5982;&#xFF1A;<code>.target:hover::after</code>&#x3002;</li></ol><h2 id="articleHeader4">JavaScript&#x64CD;&#x4F5C;&#x4F2A;&#x5143;&#x7D20;</h2><p>&#x2003;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7531;&#x4E8E;&#x4F2A;&#x5143;&#x7D20;&#x4EC5;&#x4F4D;&#x4E8E;CSSOM&#x4E2D;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x4EC5;&#x80FD;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;CSSOM API&#x2014;&#x2014;<code>window.getComputedStyle</code>&#x6765;&#x8BFB;&#x53D6;&#x4F2A;&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#x4FE1;&#x606F;&#xFF0C;&#x6CE8;&#x610F;&#xFF1A;&#x6211;&#x4EEC;&#x80FD;&#x505A;&#x7684;&#x5C31;&#x662F;&#x8BFB;&#x53D6;&#xFF0C;&#x65E0;&#x6CD5;&#x8BBE;&#x7F6E;&#x7684;&#x54E6;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{- window.getComputedStyle&#x7684;&#x7C7B;&#x578B; -}
data PseudoElement = &quot;:before&quot; | &quot;::before&quot; | &quot;:after&quot; | &quot;::after&quot; | &quot;:first-line&quot; | &quot;::first-line&quot; | &quot;:first-letter&quot; | &quot;::first-letter&quot; | &quot;::selection&quot; | &quot;:backdrop&quot; | &quot;::backdrop&quot; | Null

window.getComputedStyle :: HTMLElement -&gt; PesudoElement -&gt; CSSStyleDeclaration

{- CSSStyleDeclaration&#x5B9E;&#x4F8B;&#x7684;&#x65B9;&#x6CD5; -}
data CSSPropertyName = &quot;float&quot; | &quot;backround-color&quot; | ......
data DOMPropertyName = &quot;cssFloat&quot; | &quot;styleFloat&quot; | &quot;backgroundColor&quot; | ......

-- IE9+&#x7684;&#x65B9;&#x6CD5;
CSSStyleDeclaration#getPropertyValue :: CSSPropertyName -&gt; *
-- IE6~8&#x7684;&#x65B9;&#x6CD5;
CSSStyleDeclaration#getAttribute :: CSSPropertyName -&gt; *
-- &#x952E;&#x503C;&#x5BF9;&#x65B9;&#x5F0F;&#x83B7;&#x53D6;
CSSStyleDeclaration#[DOMPropertyName] -&gt; *" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>{- window.getComputedStyle&#x7684;&#x7C7B;&#x578B; -}
data PseudoElement = <span class="hljs-string">&quot;:before&quot;</span> | <span class="hljs-string">&quot;::before&quot;</span> | <span class="hljs-string">&quot;:after&quot;</span> | <span class="hljs-string">&quot;::after&quot;</span> | <span class="hljs-string">&quot;:first-line&quot;</span> | <span class="hljs-string">&quot;::first-line&quot;</span> | <span class="hljs-string">&quot;:first-letter&quot;</span> | <span class="hljs-string">&quot;::first-letter&quot;</span> | <span class="hljs-string">&quot;::selection&quot;</span> | <span class="hljs-string">&quot;:backdrop&quot;</span> | <span class="hljs-string">&quot;::backdrop&quot;</span> | Null

window.getComputedStyle :: HTMLElement -&gt; PesudoElement -&gt; CSSStyleDeclaration

{- CSSStyleDeclaration&#x5B9E;&#x4F8B;&#x7684;&#x65B9;&#x6CD5; -}
data CSSPropertyName = <span class="hljs-string">&quot;float&quot;</span> | <span class="hljs-string">&quot;backround-color&quot;</span> | ......
data DOMPropertyName = <span class="hljs-string">&quot;cssFloat&quot;</span> | <span class="hljs-string">&quot;styleFloat&quot;</span> | <span class="hljs-string">&quot;backgroundColor&quot;</span> | ......

-- IE9+&#x7684;&#x65B9;&#x6CD5;
CSSStyleDeclaration#getPropertyValue :: CSSPropertyName -&gt; *
-- IE6~<span class="hljs-number">8</span>&#x7684;&#x65B9;&#x6CD5;
CSSStyleDeclaration#getAttribute :: CSSPropertyName -&gt; *
-- &#x952E;&#x503C;&#x5BF9;&#x65B9;&#x5F0F;&#x83B7;&#x53D6;
CSSStyleDeclaration#[DOMPropertyName] -&gt; *</code></pre><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".target[title=&quot;hello world&quot;]::after{
  display: inline-block;
  content: attr(title);
  background: red;
  text-decoration: underline;
}

const elTarget = document.querySelector(&quot;.target&quot;)
const computedStyle = window.getComputedStyle(elTarget, &quot;::after&quot;)
const content = computedStyle.getPropertyValue(&quot;content&quot;)
const bg = computedStyle.getAttribute(&quot;backgroundColor&quot;)
const txtDecoration = computedStyle[&quot;text-decoration&quot;]

console.log(content) // &quot;hello world&quot;
console.log(bg)      // red
console.log(txtDecoration) // underline" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>.target[title=<span class="hljs-string">&quot;hello world&quot;</span>]::after{
  display: inline-block;
  content: attr(title);
  <span class="hljs-built_in">background</span>: <span class="hljs-built_in">red</span>;
  <span class="hljs-built_in">text</span>-decoration: underline;
}

<span class="hljs-keyword">const</span> elTarget = document.querySelector(<span class="hljs-string">&quot;.target&quot;</span>)
<span class="hljs-keyword">const</span> computedStyle = window.getComputedStyle(elTarget, <span class="hljs-string">&quot;::after&quot;</span>)
<span class="hljs-keyword">const</span> content = computedStyle.getPropertyValue(<span class="hljs-string">&quot;content&quot;</span>)
<span class="hljs-keyword">const</span> bg = computedStyle.getAttribute(<span class="hljs-string">&quot;backgroundColor&quot;</span>)
<span class="hljs-keyword">const</span> txtDecoration = computedStyle[<span class="hljs-string">&quot;text-decoration&quot;</span>]

console.<span class="hljs-built_in">log</span>(content) <span class="hljs-comment">// &quot;hello world&quot;</span>
console.<span class="hljs-built_in">log</span>(bg)      <span class="hljs-comment">// red</span>
console.<span class="hljs-built_in">log</span>(txtDecoration) <span class="hljs-comment">// underline</span></code></pre><h2 id="articleHeader5">&#x73A9;&#x900F;Content&#x5C5E;&#x6027;</h2><p>&#x2003;&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x5229;&#x7528;<code>::before</code>&#x548C;<code>::after</code>&#x5B9E;&#x73B0;tooltip&#x7B49;&#x6548;&#x679C;&#x4E86;&#xFF0C;&#x4F46;&#x5176;&#x5B9E;&#x66F4;&#x4E3A;&#x5F3A;&#x5927;&#x7684;&#x4E14;&#x66F4;&#x9700;&#x82B1;&#x65F6;&#x95F4;&#x7814;&#x7A76;&#x7684;&#x624D;&#x521A;&#x8981;&#x5F00;&#x59CB;&#x5462;&#xFF01;&#x90A3;&#x5C31;&#x662F;Content&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x4EC5;&#x4EC5;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x76F4;&#x63A5;&#x5730;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x4E3A;&#x4F2A;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5B83;&#x8FD8;&#x5177;&#x5907;&#x4E00;&#x5B9A;&#x9650;&#x5EA6;&#x7684;&#x7F16;&#x7A0B;&#x80FD;&#x529B;&#xFF0C;&#x5C31;&#x5982;&#x4E0A;&#x9762;<code>attr(title)</code>&#x90A3;&#x6837;&#xFF0C;&#x4EE5;&#x5176;&#x9644;&#x5C5E;&#x5143;&#x7D20;&#x7684;title&#x7279;&#x6027;&#x4F5C;&#x4E3A;content&#x503C;&#x3002;&#x4E0B;&#x9762;&#x8BF7;&#x5141;&#x8BB8;&#x6211;&#x4E3A;&#x5927;&#x5BB6;&#x4ECB;&#x7ECD;&#x5427;&#xFF01;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div::after{
    content: &quot;&#x666E;&#x901A;&#x5B57;&#x7B26;&#x4E32;&quot;;
    content: attr(&#x7236;&#x5143;&#x7D20;&#x7684;html&#x5C5E;&#x6027;&#x540D;&#x79F0;);
    content: url(&#x56FE;&#x7247;&#x3001;&#x97F3;&#x9891;&#x3001;&#x89C6;&#x9891;&#x7B49;&#x8D44;&#x6E90;&#x7684;url);
    /* &#x4F7F;&#x7528;unicode&#x5B57;&#x7B26;&#x96C6;&#xFF0C;&#x91C7;&#x7528;4&#x4F4D;16&#x8FDB;&#x5236;&#x7F16;&#x7801;
     * &#x4F46;&#x4E0D;&#x540C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x663E;&#x793A;&#x5B58;&#x5728;&#x5DEE;&#x5F02;&#xFF0C;&#x800C;&#x4E14;&#x79FB;&#x52A8;&#x7AEF;&#x8BC6;&#x522B;&#x5EA6;&#x66F4;&#x5DEE;
     */
    content: &quot;\21e0&quot;;
    /* content&#x7684;&#x591A;&#x4E2A;&#x503C;&#x53EF;&#x4EE5;&#x4EFB;&#x610F;&#x7EC4;&#x5408;&#xFF0C;&#x5404;&#x90E8;&#x5206;&#x901A;&#x8FC7;&#x7A7A;&#x683C;&#x5206;&#x9694; */
    content: &quot;&apos;&quot; attr(title) &quot;&apos;&quot;;
    
    /* &#x81EA;&#x589E;&#x8BA1;&#x6570;&#x5668;&#xFF0C;&#x7528;&#x4E8E;&#x63D2;&#x5165;&#x6570;&#x5B57;/&#x5B57;&#x6BCD;/&#x7F57;&#x9A6C;&#x6570;&#x5B57;&#x7F16;&#x53F7;
     * counter-reset: [&lt;identifier&gt; &lt;integer&gt;?]+&#xFF0C;&#x5FC5;&#x9009;&#xFF0C;&#x7528;&#x4E8E;&#x6807;&#x8BC6;&#x81EA;&#x589E;&#x8BA1;&#x6570;&#x5668;&#x7684;&#x4F5C;&#x7528;&#x8303;&#x56F4;&#xFF0C;&lt;identifier&gt;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x540D;&#x79F0;&#xFF0C;&lt;integer&gt;&#x4E3A;&#x8D77;&#x59CB;&#x7F16;&#x53F7;&#x9ED8;&#x8BA4;&#x4E3A;0&#x3002;
     * counter-increment: [&lt;identifier&gt; &lt;integer&gt;?]+&#xFF0C;&#x7528;&#x4E8E;&#x6807;&#x8BC6;&#x8BA1;&#x6570;&#x5668;&#x4E0E;&#x5B9E;&#x9645;&#x5173;&#x8054;&#x7684;&#x8303;&#x56F4;&#xFF0C;&lt;identifier&gt;&#x4E3A;counter-reset&#x4E2D;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x540D;&#x79F0;&#xFF0C;&lt;integer&gt;&#x4E3A;&#x6B65;&#x957F;&#x9ED8;&#x8BA4;&#x4E3A;1&#x3002;
     * &lt;list-style-type&gt;: disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha
     */
    content: counter(&lt;identifier&gt;, &lt;list-style-type&gt;);
    
    /* &#x4EE5;&#x7236;&#x9644;&#x5C5E;&#x5143;&#x7D20;&#x7684;qutoes&#x503C;&#x4F5C;&#x4E3A;content&#x7684;&#x503C;
     */
    content: open-quote | close-quote | no-open-quote | no-close-quote;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&#x666E;&#x901A;&#x5B57;&#x7B26;&#x4E32;&quot;</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">attr</span>(&#x7236;&#x5143;&#x7D20;&#x7684;html&#x5C5E;&#x6027;&#x540D;&#x79F0;);
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">url</span>(&#x56FE;&#x7247;&#x3001;&#x97F3;&#x9891;&#x3001;&#x89C6;&#x9891;&#x7B49;&#x8D44;&#x6E90;&#x7684;url);
    <span class="hljs-comment">/* &#x4F7F;&#x7528;unicode&#x5B57;&#x7B26;&#x96C6;&#xFF0C;&#x91C7;&#x7528;4&#x4F4D;16&#x8FDB;&#x5236;&#x7F16;&#x7801;
     * &#x4F46;&#x4E0D;&#x540C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x663E;&#x793A;&#x5B58;&#x5728;&#x5DEE;&#x5F02;&#xFF0C;&#x800C;&#x4E14;&#x79FB;&#x52A8;&#x7AEF;&#x8BC6;&#x522B;&#x5EA6;&#x66F4;&#x5DEE;
     */</span>
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;\21e0&quot;</span>;
    <span class="hljs-comment">/* content&#x7684;&#x591A;&#x4E2A;&#x503C;&#x53EF;&#x4EE5;&#x4EFB;&#x610F;&#x7EC4;&#x5408;&#xFF0C;&#x5404;&#x90E8;&#x5206;&#x901A;&#x8FC7;&#x7A7A;&#x683C;&#x5206;&#x9694; */</span>
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&apos;&quot;</span> <span class="hljs-built_in">attr</span>(title) <span class="hljs-string">&quot;&apos;&quot;</span>;
    
    <span class="hljs-comment">/* &#x81EA;&#x589E;&#x8BA1;&#x6570;&#x5668;&#xFF0C;&#x7528;&#x4E8E;&#x63D2;&#x5165;&#x6570;&#x5B57;/&#x5B57;&#x6BCD;/&#x7F57;&#x9A6C;&#x6570;&#x5B57;&#x7F16;&#x53F7;
     * counter-reset: [&lt;identifier&gt; &lt;integer&gt;?]+&#xFF0C;&#x5FC5;&#x9009;&#xFF0C;&#x7528;&#x4E8E;&#x6807;&#x8BC6;&#x81EA;&#x589E;&#x8BA1;&#x6570;&#x5668;&#x7684;&#x4F5C;&#x7528;&#x8303;&#x56F4;&#xFF0C;&lt;identifier&gt;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x540D;&#x79F0;&#xFF0C;&lt;integer&gt;&#x4E3A;&#x8D77;&#x59CB;&#x7F16;&#x53F7;&#x9ED8;&#x8BA4;&#x4E3A;0&#x3002;
     * counter-increment: [&lt;identifier&gt; &lt;integer&gt;?]+&#xFF0C;&#x7528;&#x4E8E;&#x6807;&#x8BC6;&#x8BA1;&#x6570;&#x5668;&#x4E0E;&#x5B9E;&#x9645;&#x5173;&#x8054;&#x7684;&#x8303;&#x56F4;&#xFF0C;&lt;identifier&gt;&#x4E3A;counter-reset&#x4E2D;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x540D;&#x79F0;&#xFF0C;&lt;integer&gt;&#x4E3A;&#x6B65;&#x957F;&#x9ED8;&#x8BA4;&#x4E3A;1&#x3002;
     * &lt;list-style-type&gt;: disc | circle | square | decimal | decimal-leading-zero | lower-roman | upper-roman | lower-greek | lower-latin | upper-latin | armenian | georgian | lower-alpha | upper-alpha
     */</span>
    <span class="hljs-attribute">content</span>: <span class="hljs-built_in">counter</span>(&lt;identifier&gt;, &lt;list-style-type&gt;);
    
    <span class="hljs-comment">/* &#x4EE5;&#x7236;&#x9644;&#x5C5E;&#x5143;&#x7D20;&#x7684;qutoes&#x503C;&#x4F5C;&#x4E3A;content&#x7684;&#x503C;
     */</span>
    <span class="hljs-attribute">content</span>: open-quote | close-quote | no-open-quote | no-close-quote;
}</code></pre><p>&#x6362;&#x884C;&#x7B26;&#xFF1A;HTML&#x5B9E;&#x4F53;&#x4E3A;<code>&amp;#010</code>&#xFF0C;CSS&#x4E3A;<code>\A</code>&#xFF0C;JS&#x4E3A;<code>\uA</code>&#x3002;</p><p>&#x2003;&#x53EF;&#x4EE5;&#x770B;&#x5230;Content&#x63A5;&#x53D7;6&#x79CD;&#x7C7B;&#x578B;&#xFF0C;&#x548C;&#x4E00;&#x79CD;&#x7EC4;&#x5408;&#x65B9;&#x5F0F;&#x3002;&#x5176;&#x4E2D;&#x6700;&#x540E;&#x4E24;&#x79CD;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x6211;&#x4EEC;&#x540E;&#x9762;&#x9010;&#x4E00;&#x8BF4;&#x660E;&#x3002;</p><h3 id="articleHeader6">&#x81EA;&#x5B9A;&#x4E49;&#x8BA1;&#x6570;&#x5668;</h3><p>&#x2003;HTML&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;<code>ul</code>&#x6216;<code>ol</code>&#x548C;<code>li</code>&#x6765;&#x5B9E;&#x73B0;&#x5217;&#x8868;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5B9E;&#x73B0;&#x66F4;&#x4E3A;&#x53EF;&#x6027;&#x5316;&#x7684;&#x5217;&#x8868;&#xFF0C;&#x90A3;&#x4E48;&#x8BE5;&#x5982;&#x4F55;&#x5904;&#x7406;&#x5462;&#xFF1F;content&#x5C5E;&#x6027;&#x7684;counter&#x7C7B;&#x578B;&#x503C;&#x5C31;&#x80FD;&#x5E2E;&#x5230;&#x6211;&#x4EEC;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- HTML &#x90E8;&#x5206;--&gt;
.dl
 .dt{chapter1}
 .dd{text11}
 .dd{text12}
 .dt{chapter2}
 .dd{text21}
 
/* CSS&#x90E8;&#x5206; */
.dl {
  counter-reset: dt 0; /* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dl&#x65F6;&#xFF0C;&#x91CD;&#x7F6E;dt&#x8BA1;&#x6570;&#x5668;&#x4E3A;0 */
  
  &amp; .dt {
    counter-reset: dd 0; /* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dt&#x65F6;&#xFF0C;&#x91CD;&#x7F6E;dd&#x8BA1;&#x6570;&#x5668;&#x4E3A;0 */
    
    &amp;::before{
        counter-increment: dt 1; /* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dt&#x65F6;&#xFF0C;dt&#x8BA1;&#x6570;&#x5668;&#x81EA;&#x589E;1 */
        content: counter(dt, lower-roman) &quot; &quot;;
    }
  }
  
  &amp; .dd::before {
    counter-increment: dd 1; /* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dd&#x65F6;&#xFF0C;dd&#x8BA1;&#x6570;&#x5668;&#x81EA;&#x589E;1 */
    content: counter(dd) &quot; &quot;;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&lt;!-- HTML &#x90E8;&#x5206;--&gt;
<span class="hljs-selector-class">.dl</span>
 .dt{chapter1}
 .dd{text11}
 .dd{text12}
 .dt{chapter2}
 .dd{text21}
 
<span class="hljs-comment">/* CSS&#x90E8;&#x5206; */</span>
<span class="hljs-selector-class">.dl</span> {
  <span class="hljs-attribute">counter-reset</span>: dt <span class="hljs-number">0</span>; <span class="hljs-comment">/* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dl&#x65F6;&#xFF0C;&#x91CD;&#x7F6E;dt&#x8BA1;&#x6570;&#x5668;&#x4E3A;0 */</span>
  
  &amp; <span class="hljs-selector-class">.dt</span> {
    <span class="hljs-attribute">counter-reset</span>: dd <span class="hljs-number">0</span>; <span class="hljs-comment">/* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dt&#x65F6;&#xFF0C;&#x91CD;&#x7F6E;dd&#x8BA1;&#x6570;&#x5668;&#x4E3A;0 */</span>
    
    &amp;::before{
        <span class="hljs-attribute">counter-increment</span>: dt <span class="hljs-number">1</span>; <span class="hljs-comment">/* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dt&#x65F6;&#xFF0C;dt&#x8BA1;&#x6570;&#x5668;&#x81EA;&#x589E;1 */</span>
        <span class="hljs-attribute">content</span>: counter(dt, lower-roman) <span class="hljs-string">&quot; &quot;</span>;
    }
  }
  
  &amp; <span class="hljs-selector-class">.dd</span>::before {
    <span class="hljs-attribute">counter-increment</span>: dd <span class="hljs-number">1</span>; <span class="hljs-comment">/* &#x8868;&#x793A;&#x89E3;&#x6790;&#x5230;.dd&#x65F6;&#xFF0C;dd&#x8BA1;&#x6570;&#x5668;&#x81EA;&#x589E;1 */</span>
    <span class="hljs-attribute">content</span>: counter(dd) <span class="hljs-string">&quot; &quot;</span>;
  }
}</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016441052?w=307&amp;h=101" src="https://static.alili.tech/img/remote/1460000016441052?w=307&amp;h=101" alt="" title="" style="cursor:pointer"></span></p><p>&#x901A;&#x8FC7;<code>counter-reset</code>&#x6765;&#x5B9A;&#x4E49;&#x548C;&#x91CD;&#x7F6E;&#x8BA1;&#x6570;&#x5668;&#xFF0C;&#x901A;&#x8FC7;<code>counter-increment</code>&#x6765;&#x589E;&#x52A0;&#x8BA1;&#x6570;&#x5668;&#x7684;&#x503C;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;<code>counter</code>&#x6765;&#x51B3;&#x5B9A;&#x4F7F;&#x7528;&#x54EA;&#x4E2A;&#x8BA1;&#x6570;&#x5668;&#xFF0C;&#x5E76;&#x6307;&#x5B9A;&#x4F7F;&#x7528;&#x54EA;&#x79CD;&#x6837;&#x5F0F;&#x3002;<br>&#x2003;&#x5982;&#x679C;&#x7528;JavaScript&#x6765;&#x8868;&#x793A;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x7684;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const globalCounters = {&quot;__temp&quot;:{}}

function resetCounter(name, value){
  globalCounters[name] = value
}
function incrementCounter(name, step){
  const oVal = globalCounters[name]
  if (oVal){
    globalCounters[name] = oVal + step
  }
  else{
    globalCounters.__temp[name] = step
  }
}
function counter(name, style){
    return globalCounters[name] || globalCounters.__temp[name]
}

function applyCSS(mount){
    const clz = mount.className
    if (clz == &quot;dl&quot;){
        resetCounter(&quot;dt&quot;, 0)
        const children = mount.children
        for (let i = 0; i &lt; children.length; ++i){
          applyCSS(children[i])
        }
    }
    else if (clz == &quot;dt&quot;){
        resetCounter(&quot;dd&quot;, 0)
        incrementCounter(&quot;dt&quot;, 1)
        const elAsBefore = document.createElement(&quot;span&quot;)
        elAsBefore.textContent = counter(&quot;dt&quot;, &quot;lower-roman&quot;) + &quot; &quot;
        mount.insertBefore(mount.firstChild)
    }
    else if (clz == &quot;dd&quot;){
        incrementCounter(&quot;dd&quot;, 1)
        const elAsBefore = document.createElement(&quot;span&quot;)
        elAsBefore.textContent = counter(&quot;dd&quot;, &quot;lower-roman&quot;) + &quot; &quot;
        mount.insertBefore(mount.firstChild)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> globalCounters = {<span class="hljs-string">&quot;__temp&quot;</span>:{}}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resetCounter</span>(<span class="hljs-params">name, value</span>)</span>{
  globalCounters[name] = value
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementCounter</span>(<span class="hljs-params">name, step</span>)</span>{
  <span class="hljs-keyword">const</span> oVal = globalCounters[name]
  <span class="hljs-keyword">if</span> (oVal){
    globalCounters[name] = oVal + step
  }
  <span class="hljs-keyword">else</span>{
    globalCounters.__temp[name] = step
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">counter</span>(<span class="hljs-params">name, style</span>)</span>{
    <span class="hljs-keyword">return</span> globalCounters[name] || globalCounters.__temp[name]
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyCSS</span>(<span class="hljs-params">mount</span>)</span>{
    <span class="hljs-keyword">const</span> clz = mount.className
    <span class="hljs-keyword">if</span> (clz == <span class="hljs-string">&quot;dl&quot;</span>){
        resetCounter(<span class="hljs-string">&quot;dt&quot;</span>, <span class="hljs-number">0</span>)
        <span class="hljs-keyword">const</span> children = mount.children
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; children.length; ++i){
          applyCSS(children[i])
        }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (clz == <span class="hljs-string">&quot;dt&quot;</span>){
        resetCounter(<span class="hljs-string">&quot;dd&quot;</span>, <span class="hljs-number">0</span>)
        incrementCounter(<span class="hljs-string">&quot;dt&quot;</span>, <span class="hljs-number">1</span>)
        <span class="hljs-keyword">const</span> elAsBefore = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;span&quot;</span>)
        elAsBefore.textContent = counter(<span class="hljs-string">&quot;dt&quot;</span>, <span class="hljs-string">&quot;lower-roman&quot;</span>) + <span class="hljs-string">&quot; &quot;</span>
        mount.insertBefore(mount.firstChild)
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (clz == <span class="hljs-string">&quot;dd&quot;</span>){
        incrementCounter(<span class="hljs-string">&quot;dd&quot;</span>, <span class="hljs-number">1</span>)
        <span class="hljs-keyword">const</span> elAsBefore = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">&quot;span&quot;</span>)
        elAsBefore.textContent = counter(<span class="hljs-string">&quot;dd&quot;</span>, <span class="hljs-string">&quot;lower-roman&quot;</span>) + <span class="hljs-string">&quot; &quot;</span>
        mount.insertBefore(mount.firstChild)
    }
}</code></pre><h4>&#x5D4C;&#x5957;&#x8BA1;&#x6570;&#x5668;</h4><p>&#x2003;&#x5BF9;&#x4E8E;&#x591A;&#x5C42;&#x5D4C;&#x5957;&#x8BA1;&#x6570;&#x5668;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>counters(&lt;identifier&gt;, &lt;separator&gt;, &lt;list-style-type&gt;?)</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ol
  .li
    .ol
      .li{a}
      .li{b}
  .li
    .ol
      .li{c}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">.ol
  .li
    .ol
      .li{a}
      .li{b}
  .li
    .ol
      .li{c}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ol {
    counter-reset: ol;
    &amp; .li::before {
        counter-increment: ol;
        content: counters(ol, &quot;.&quot;);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ol</span> {
    <span class="hljs-attribute">counter-reset</span>: ol;
    &amp; <span class="hljs-attribute">.li</span>::before {
        counter-increment: ol;
        <span class="hljs-attribute">content</span>: <span class="hljs-built_in">counters</span>(ol, <span class="hljs-string">&quot;.&quot;</span>);
    }
}</code></pre><h4>Content&#x7684;&#x9650;&#x5236;</h4><ol><li>IE8+&#x624D;&#x652F;&#x6301;Content&#x5C5E;&#x6027;&#xFF1B;</li><li>&#x9664;&#x4E86;Opera9.5+&#x4E2D;&#x6240;&#x6709;&#x5143;&#x7D20;&#x5747;&#x652F;&#x6301;&#x5916;&#xFF0C;&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#x4EC5;&#x80FD;&#x7528;&#x4E8E;<code>:before,:after</code>&#x5185;&#x4F7F;&#x7528;&#xFF1B;</li><li>&#x65E0;&#x6CD5;&#x901A;&#x8FC7;JS&#x83B7;&#x53D6;Counter&#x548C;Counters&#x7684;&#x8FD0;&#x7B97;&#x7ED3;&#x679C;&#x3002;&#x5F97;&#x5230;&#x7684;&#x5C31;&#x53EA;&#x80FD;&#x662F;<code>&quot;counter(mycouonter) \&quot; \&quot;&quot;</code>&#x3002;</li></ol><h3 id="articleHeader7">&#x81EA;&#x5B9A;&#x4E49;&#x5F15;&#x53F7;</h3><p>&#x2003;&#x5F15;&#x53F7;&#x8FD9;&#x4E2A;&#x5E73;&#x65F6;&#x5F88;&#x5C11;&#x5728;&#x610F;&#x7684;&#x7B26;&#x53F7;&#xFF0C;&#x5176;&#x5B9E;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x5316;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x5F15;&#x53F7;&#x5C06;&#x4E0D;&#x5C3D;&#x76F8;&#x540C;&#xFF0C;&#x5982;&#x7B80;&#x4F53;&#x4E2D;&#x6587;&#x5730;&#x533A;&#x4F7F;&#x7528;&#x7684;<code>&quot;&quot;</code>&#xFF0C;&#x800C;&#x65E5;&#x672C;&#x5219;&#x4F7F;&#x7528;<code>&#x300C;&#x300D;</code>&#x3002;&#x90A3;&#x6211;&#x4EEC;&#x6839;&#x636E;&#x9700;&#x6C42;&#x81EA;&#x5B9A;&#x4E49;&#x5F15;&#x53F7;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x662F;&#x80AF;&#x5B9A;&#x7684;&#x3002;<br>&#x2003;&#x901A;&#x8FC7;<code>open-quote</code>,<code>close-quote</code>,<code>no-open-quote</code>&#x548C;<code>no-close-quote</code>&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4F8B;&#x5B50;&#x6765;&#x7406;&#x89E3;&#x3002;<br>&#x2003;<code>&lt;q&gt;</code>&#x4F1A;&#x6839;&#x636E;&#x7236;&#x5143;&#x7D20;&#x7684;<code>lang</code>&#x5C5E;&#x6027;&#x81EA;&#x52A8;&#x521B;&#x5EFA;<code>::before</code>&#x548C;<code>::after</code>&#x6765;&#x5B9E;&#x73B0;&#x63D2;&#x5165;quotation marks&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p[lang=en]&gt;q{&#x82F1;&#x8BED;}
p[lang=no]&gt;q{&#x632A;&#x5A01;&#x8BED;}
p[lang=zh]&gt;q{&#x6C49;&#x8BED;}
p[lang=en]&gt;q.no-quote{&#x82F1;&#x8BED;2}
div[lang=no]&gt;.quote{&#x632A;&#x5A01;&#x8BED;2}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">p[lang=en]&gt;q{&#x82F1;&#x8BED;}
p[lang=no]&gt;q{&#x632A;&#x5A01;&#x8BED;}
p[lang=zh]&gt;q{&#x6C49;&#x8BED;}
p[lang=en]&gt;q.no-quote{&#x82F1;&#x8BED;2}
div[lang=no]&gt;.quote{&#x632A;&#x5A01;&#x8BED;2}</code></pre><p>CSS&#x7247;&#x6BB5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p[lang=en] &gt; q{
  quotes: &quot;&lt;!--&quot; &quot;--&gt;&quot;; /* &#x5B9A;&#x4E49;&#x5F15;&#x53F7; */
}
p[lang=en] &gt; q.no-quote::before{
  content: no-open-quote;
  /*&#x6216;&#x8005; content: none;*/
}
div[lang=no] &gt; .quote {
  quotes: &quot;&lt;&lt;-&quot; &quot;-&gt;&gt;&quot;;
}
div[lang=no] &gt; .quote::before {
  content: open-quote;
}
div[lang=no] &gt; .quote::after {
  content: close-quote;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span><span class="hljs-selector-attr">[lang=en]</span> &gt; <span class="hljs-selector-tag">q</span>{
  <span class="hljs-attribute">quotes</span>: <span class="hljs-string">&quot;&lt;!--&quot;</span> <span class="hljs-string">&quot;--&gt;&quot;</span>; <span class="hljs-comment">/* &#x5B9A;&#x4E49;&#x5F15;&#x53F7; */</span>
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-attr">[lang=en]</span> &gt; <span class="hljs-selector-tag">q</span><span class="hljs-selector-class">.no-quote</span><span class="hljs-selector-pseudo">::before</span>{
  <span class="hljs-attribute">content</span>: no-open-quote;
  <span class="hljs-comment">/*&#x6216;&#x8005; content: none;*/</span>
}
<span class="hljs-selector-tag">div</span><span class="hljs-selector-attr">[lang=no]</span> &gt; <span class="hljs-selector-class">.quote</span> {
  <span class="hljs-attribute">quotes</span>: <span class="hljs-string">&quot;&lt;&lt;-&quot;</span> <span class="hljs-string">&quot;-&gt;&gt;&quot;</span>;
}
<span class="hljs-selector-tag">div</span><span class="hljs-selector-attr">[lang=no]</span> &gt; <span class="hljs-selector-class">.quote</span><span class="hljs-selector-pseudo">::before</span> {
  <span class="hljs-attribute">content</span>: open-quote;
}
<span class="hljs-selector-tag">div</span><span class="hljs-selector-attr">[lang=no]</span> &gt; <span class="hljs-selector-class">.quote</span><span class="hljs-selector-pseudo">::after</span> {
  <span class="hljs-attribute">content</span>: close-quote;
}</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016441053?w=384&amp;h=212" src="https://static.alili.tech/img/remote/1460000016441053?w=384&amp;h=212" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader8">&#x793A;&#x4F8B;</h2><h3 id="articleHeader9">&#x5206;&#x5272;&#x7EBF;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.sep{or}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial">p.sep{or}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".sep {
  position: relative;
  text-align: center;
  
  &amp;::before,
  &amp;::after {
    content: &quot;&quot;;
    box-sizing: border-box;
    height: 1px;
    width: 50%;
    border-left: 3em solid transparent;
    border-right: 3em solid transparent;
    position: absolute;
    top: 50%;
  }
  
  &amp;::before {
    left: 0;
  }
  
  &amp;::after {
    right: 0;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.sep</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">text-align</span>: center;
  
  &amp;::before,
  &amp;::after {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">3em</span> solid transparent;
    <span class="hljs-attribute">border-right</span>: <span class="hljs-number">3em</span> solid transparent;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  }
  
  &amp;<span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  }
  
  &amp;<span class="hljs-selector-pseudo">::after</span> {
    <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  }
}</code></pre><h3 id="articleHeader10">&#x53EA;&#x8BFB;&#x6548;&#x679C;(&#x901A;&#x8FC7;&#x906E;&#x7F69;&#x539F;&#x6765;&#x7684;&#x5143;&#x7D20;&#x5B9E;&#x73B0;)</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".input-group {
  position: relative;
  
  &amp;.readonly::before {
    content: &quot;&quot;;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">.input-group {
  position: relative;
  
  &amp;.readonly::before {
    content: &quot;&quot;;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}</code></pre><h3 id="articleHeader11">&#x8BA1;&#x6570;&#x5668;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".selections&gt;input[type=checkbox]{option1}+input[type=checkbox]{option2}
.selection-count" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">.selections&gt;input[type=checkbox]{option1}+input[type=checkbox]{option2}
.selection-count</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".selections{
  counter-reset: selection-count;
  
  &amp; input:checked {
    counter-increment: selection-count;
  }
}
.selection-count::before {
  content: counter(selection-count);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.selections</span>{
  <span class="hljs-attribute">counter-reset</span>: selection-count;
  
  &amp; <span class="hljs-attribute">input</span>:checked {
    counter-increment: selection-count;
  }
}
<span class="hljs-selector-class">.selection-count</span><span class="hljs-selector-pseudo">::before</span> {
  <span class="hljs-attribute">content</span>: <span class="hljs-built_in">counter</span>(selection-count);
}</code></pre><h2 id="articleHeader12">&#x6700;&#x540E;</h2><p>&#x2003;&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x6765;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9665156.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/fsjoh...</a> &#x80A5;&#x4ED4;John^_^</p><h2 id="articleHeader13">&#x53C2;&#x8003;</h2><p><a href="http://www.wozhuye.com/compatible/297.html" rel="nofollow noreferrer" target="_blank">http://www.wozhuye.com/compat...</a><br><a href="https://dev.opera.com/articles/css-generated-content-techniques/" rel="nofollow noreferrer" target="_blank">https://dev.opera.com/article...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：一起玩透伪元素和Content属性

## 原文链接
[https://segmentfault.com/a/1190000016441049](https://segmentfault.com/a/1190000016441049)


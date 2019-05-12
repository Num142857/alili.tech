---
title: 常见样式设计及DOM操作整理
hidden: true
categories: [reprint]
slug: b01c1896
date: 2018-11-11 02:30:06
---

{{< raw >}}
<h1 id="articleHeader0">css&#x90E8;&#x5206;</h1><h3 id="articleHeader1">&#x4E3A;&#x4E0D;&#x540C;&#x94FE;&#x63A5;&#x6DFB;&#x52A0;&#x4E0D;&#x540C;&#x6837;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a[href^=&quot;http&quot;]{
padding-right: 20px;
background: url(external.gif) no-repeat center right;
}
/* email */
a[href^=&quot;mailto:&quot;]{
padding-right: 20px;
background: url(email.png) no-repeat center right;
}
/* pdf */
a[href$=&quot;.pdf&quot;]{
padding-right: 20px;
background: url(pdf.png) no-repeat center right;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href^=&quot;http&quot;]</span>{
<span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(external.gif) no-repeat center right;
}
<span class="hljs-comment">/* email */</span>
<span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href^=&quot;mailto:&quot;]</span>{
<span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(email.png) no-repeat center right;
}
<span class="hljs-comment">/* pdf */</span>
<span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href$=&quot;.pdf&quot;]</span>{
<span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
<span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(pdf.png) no-repeat center right;
}</code></pre><h3 id="articleHeader2">&#x8DE8;&#x6D4F;&#x89C8;&#x5668;&#x7070;&#x5EA6;&#x56FE;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt;
&lt;filter id=&quot;grayscale&quot;&gt;
  &lt;feColorMatrix type=&quot;matrix&quot; values=&quot;0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0&quot;&gt;&lt;/feColorMatrix&gt;
&lt;/filter&gt;
&lt;/svg&gt;
&lt;style&gt;
img{
  filter: url(filters.svg#grayscale); /* Firefox 3.5+ */
  filter: gray; /* IE6-9 */
  -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ &amp; Opera 15+ */
}
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">&quot;http://www.w3.org/2000/svg&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">filter</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;grayscale&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">feColorMatrix</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;matrix&quot;</span> <span class="hljs-attr">values</span>=<span class="hljs-string">&quot;0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">feColorMatrix</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">filter</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">img</span>{
  <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">url</span>(filters.svg#grayscale); <span class="hljs-comment">/* Firefox 3.5+ */</span>
  <span class="hljs-attribute">filter</span>: gray; <span class="hljs-comment">/* IE6-9 */</span>
  <span class="hljs-attribute">-webkit-filter</span>: <span class="hljs-built_in">grayscale</span>(1); <span class="hljs-comment">/* Google Chrome, Safari 6+ &amp; Opera 15+ */</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><h3 id="articleHeader3">&#x52A8;&#x753B;&#x80CC;&#x666F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="button{
background-image: linear-gradient(#5187c4, #1c2f45);
background-size: auto 200%;
background-position: 0 100%;
transition: background-position 0.5s;
}
button:hover {
background-position: 0 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">button</span>{
<span class="hljs-attribute">background-image</span>: <span class="hljs-built_in">linear-gradient</span>(#5187c4, #1c2f45);
<span class="hljs-attribute">background-size</span>: auto <span class="hljs-number">200%</span>;
<span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">100%</span>;
<span class="hljs-attribute">transition</span>: background-position <span class="hljs-number">0.5s</span>;
}
<span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:hover</span> {
<span class="hljs-attribute">background-position</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
}</code></pre><h3 id="articleHeader4">&#x6E05;&#x9664;&#x6D6E;&#x52A8;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x65B9;&#x6CD5;1*/
.clear-fix{
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
}
/*IE*/
.clear{
  overflow: auto; zoom: 1; /*IE6*/
}
/*&#x65B9;&#x6CD5;2*/
&amp;:after{
  content: &quot;&quot;;
  display: block;
  height: 0;
  overflow: hidden;
  clear: both;
}
/*&#x65B9;&#x6CD5;3*/
/*&#x5C06;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7528;&#x4E00;&#x4E2A;&#x4E0D;&#x6D6E;&#x52A8;&#x7684; div &#x5305;&#x88F9;&#x8D77;&#x6765;*/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*&#x65B9;&#x6CD5;1*/</span>
<span class="hljs-selector-class">.clear-fix</span>{
  <span class="hljs-attribute">clear</span>: both;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-comment">/*IE*/</span>
<span class="hljs-selector-class">.clear</span>{
  <span class="hljs-attribute">overflow</span>: auto; <span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>; <span class="hljs-comment">/*IE6*/</span>
}
<span class="hljs-comment">/*&#x65B9;&#x6CD5;2*/</span>
&amp;<span class="hljs-selector-pseudo">:after</span>{
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">overflow</span>: hidden;
  <span class="hljs-attribute">clear</span>: both;
}
<span class="hljs-comment">/*&#x65B9;&#x6CD5;3*/</span>
<span class="hljs-comment">/*&#x5C06;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7528;&#x4E00;&#x4E2A;&#x4E0D;&#x6D6E;&#x52A8;&#x7684; div &#x5305;&#x88F9;&#x8D77;&#x6765;*/</span></code></pre><h3 id="articleHeader5">&#x8868;&#x683C;&#x5BBD;&#x5EA6;&#x81EA;&#x9002;&#x5E94;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="td {
white-space: nowrap;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">td</span> {
<span class="hljs-attribute">white-space</span>: nowrap;
}</code></pre><h3 id="articleHeader6">&#x4EFB;&#x610F;&#x9634;&#x5F71;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box-shadow {
background-color: #FF8020;
width: 160px;
height: 90px;
margin-top: -45px;
margin-left: -80px;
position: absolute;
top: 50%;
left: 50%;
}
.box-shadow:after {
content: &quot;&quot;;
width: 150px;
height: 1px;
margin-top: 88px;
margin-left: -75px;
display: block;
position: absolute;
left: 50%;
z-index: -1;
-webkit-box-shadow: 0px 0px 8px 2px #000000;
-moz-box-shadow: 0px 0px 8px 2px #000000;
box-shadow: 0px 0px 8px 2px #000000;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.box-shadow</span> {
<span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FF8020</span>;
<span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">90px</span>;
<span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">45px</span>;
<span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">80px</span>;
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
}
<span class="hljs-selector-class">.box-shadow</span><span class="hljs-selector-pseudo">:after</span> {
<span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
<span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
<span class="hljs-attribute">margin-top</span>: <span class="hljs-number">88px</span>;
<span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">75px</span>;
<span class="hljs-attribute">display</span>: block;
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>;
<span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">8px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#000000</span>;
<span class="hljs-attribute">-moz-box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">8px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#000000</span>;
<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">0px</span> <span class="hljs-number">8px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#000000</span>;
}</code></pre><h3 id="articleHeader7">&#x6587;&#x672C;&#x5BBD;&#x5EA6;&#x81EA;&#x9002;&#x5E94;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pre {
white-space: pre-line;
word-wrap: break-word;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">pre</span> {
<span class="hljs-attribute">white-space</span>: pre-line;
<span class="hljs-attribute">word-wrap</span>: break-word;
}</code></pre><h3 id="articleHeader8">&#x6A21;&#x7CCA;&#x6587;&#x672C;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".blurry-text {
color: transparent;
text-shadow: 0 0 5px rgba(0,0,0,0.5);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.blurry-text</span> {
<span class="hljs-attribute">color</span>: transparent;
<span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">5px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.5);
}</code></pre><h3 id="articleHeader9">&#x7F51;&#x9875;&#x52A0;&#x8F7D;&#x52A8;&#x753B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loading:after {
overflow: hidden;
display: inline-block;
vertical-align: bottom;
animation: ellipsis 2s infinite;
content: &quot;\2026&quot;;
}
@keyframes ellipsis {
from {
  width: 2px;
}
to {
  width: 15px;
}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">loading</span><span class="hljs-selector-pseudo">:after</span> {
<span class="hljs-attribute">overflow</span>: hidden;
<span class="hljs-attribute">display</span>: inline-block;
<span class="hljs-attribute">vertical-align</span>: bottom;
<span class="hljs-attribute">animation</span>: ellipsis <span class="hljs-number">2s</span> infinite;
<span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;\2026&quot;</span>;
}
@<span class="hljs-keyword">keyframes</span> ellipsis {
<span class="hljs-selector-tag">from</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">2px</span>;
}
<span class="hljs-selector-tag">to</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
}
}</code></pre><h3 id="articleHeader10">&#x7A97;&#x53E3;&#x6F02;&#x6D6E;&#x7269;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;marquee direction=&quot;down&quot; width=&quot;250&quot; height=&quot;200&quot; behavior=&quot;alternate&quot; style=&quot;border:solid&quot;&gt;
&lt;marquee behavior=&quot;alternate&quot;&gt;
  This text will fly
&lt;/marquee&gt;
&lt;/marquee&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">marquee</span> <span class="hljs-attr">direction</span>=<span class="hljs-string">&quot;down&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;250&quot;</span> <span class="hljs-attr">height</span>=<span class="hljs-string">&quot;200&quot;</span> <span class="hljs-attr">behavior</span>=<span class="hljs-string">&quot;alternate&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;border:solid&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">marquee</span> <span class="hljs-attr">behavior</span>=<span class="hljs-string">&quot;alternate&quot;</span>&gt;</span>
  This text will fly
<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">marquee</span>&gt;</span></code></pre><h3 id="articleHeader11">&#x89E3;&#x51B3; input:text &#x81EA;&#x52A8;&#x586B;&#x5145;&#x53D8;&#x9EC4;&#x7684;&#x95EE;&#x9898;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input:-webkit-autofill{
-webkit-box-shadow: 0 0 0px 10000px white inset !important;
box-shadow: 0 0 0px 10000px white inset !important;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:-webkit-autofill</span>{
<span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0px</span> <span class="hljs-number">10000px</span> white inset <span class="hljs-meta">!important</span>;
<span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0px</span> <span class="hljs-number">10000px</span> white inset <span class="hljs-meta">!important</span>;
}</code></pre><h1 id="articleHeader12">jQuery&#x90E8;&#x5206;</h1><h3 id="articleHeader13">&#x8FD4;&#x56DE;&#x5934;&#x90E8;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;a.top&apos;).click(function (e) {
  e.preventDefault();
  $(body).animate({scrollTop: 0}, 800);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&apos;a.top&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  e.preventDefault();
  $(body).animate({<span class="hljs-attr">scrollTop</span>: <span class="hljs-number">0</span>}, <span class="hljs-number">800</span>);
});</code></pre><h3 id="articleHeader14">&#x9884;&#x52A0;&#x8F7D;&#x56FE;&#x7247;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.preloadImages = function () {
  for (var i = 0; i &lt; arguments.length; i++) {
    $(&apos;&lt;img&gt;&apos;).attr(&apos;src&apos;, arguments[i]);
  }
};
$.preloadImages(&apos;img/hover-on.png&apos;, &apos;img/hover-off.png&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$.preloadImages = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
    $(<span class="hljs-string">&apos;&lt;img&gt;&apos;</span>).attr(<span class="hljs-string">&apos;src&apos;</span>, <span class="hljs-built_in">arguments</span>[i]);
  }
};
$.preloadImages(<span class="hljs-string">&apos;img/hover-on.png&apos;</span>, <span class="hljs-string">&apos;img/hover-off.png&apos;</span>);</code></pre><h3 id="articleHeader15">&#x81EA;&#x52A8;&#x66FF;&#x6362;&#x52A0;&#x8F7D;&#x5931;&#x8D25;&#x7684;&#x56FE;&#x7247;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;img&apos;).on(&apos;error&apos;, function () {
  $(this).prop(&apos;src&apos;, &apos;img/broken.png&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&apos;img&apos;</span>).on(<span class="hljs-string">&apos;error&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-keyword">this</span>).prop(<span class="hljs-string">&apos;src&apos;</span>, <span class="hljs-string">&apos;img/broken.png&apos;</span>);
});</code></pre><h3 id="articleHeader16">&#x5207;&#x6362;&#x5143;&#x7D20;&#x7684;&#x5404;&#x79CD;&#x6837;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;.btn&apos;).hover(function () {
  $(this).addClass(&apos;hover&apos;);
}, function () {
  $(this).removeClass(&apos;hover&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&apos;.btn&apos;</span>).hover(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-keyword">this</span>).addClass(<span class="hljs-string">&apos;hover&apos;</span>);
}, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-keyword">this</span>).removeClass(<span class="hljs-string">&apos;hover&apos;</span>);
});</code></pre><h3 id="articleHeader17">&#x7981;&#x7528;/&#x542F;&#x7528;&#x63D0;&#x4EA4;&#x6309;&#x94AE;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;input[type=&quot;submit&quot;]&apos;).prop(&apos;disabled&apos;, true);
$(&apos;input[type=&quot;submit&quot;]&apos;).prop(&apos;disabled&apos;, false);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>$(<span class="hljs-symbol">&apos;input</span>[<span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;submit&quot;</span>]&apos;).prop(<span class="hljs-symbol">&apos;disable</span>d&apos;, <span class="hljs-literal">true</span>);
$(<span class="hljs-symbol">&apos;input</span>[<span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">&quot;submit&quot;</span>]&apos;).prop(<span class="hljs-symbol">&apos;disable</span>d&apos;, <span class="hljs-literal">false</span>);</code></pre><h3 id="articleHeader18">&#x7EC4;&#x7EC7;&#x9ED8;&#x8BA4;&#x4E8B;&#x4EF6;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;a.no-link&apos;).click(function (e) {
e.preventDefault();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&apos;a.no-link&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
e.preventDefault();
});</code></pre><h3 id="articleHeader19">&#x5207;&#x6362;&#x52A8;&#x753B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6DE1;&#x5165;&#x6DE1;&#x51FA;
$(&apos;.btn&apos;).click(function () {
  $(&apos;.element&apos;).fadeToggle(&apos;slow&apos;);
});
//&#x6ED1;&#x5165;&#x6ED1;&#x51FA;
$(&apos;.btn&apos;).click(function () {
$(&apos;.element&apos;).slideToggle(&apos;slow&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x6DE1;&#x5165;&#x6DE1;&#x51FA;</span>
$(<span class="hljs-string">&apos;.btn&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  $(<span class="hljs-string">&apos;.element&apos;</span>).fadeToggle(<span class="hljs-string">&apos;slow&apos;</span>);
});
<span class="hljs-comment">//&#x6ED1;&#x5165;&#x6ED1;&#x51FA;</span>
$(<span class="hljs-string">&apos;.btn&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
$(<span class="hljs-string">&apos;.element&apos;</span>).slideToggle(<span class="hljs-string">&apos;slow&apos;</span>);
});</code></pre><h3 id="articleHeader20">&#x7B80;&#x5355;&#x7684;&#x624B;&#x98CE;&#x7434;&#x6837;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;#accordion&apos;).find(&apos;.content&apos;).hide();  //&#x5173;&#x95ED;&#x5168;&#x90E8;&#x6807;&#x7B7E;
$(&apos;#accordion&apos;).find(&apos;.accordion-header&apos;).click(function () {
  var next = $(this).next();
  next.slideToggle(&apos;fast&apos;);
  $(&apos;.content&apos;).not(next).slideUp(&apos;fast&apos;);
  return false;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">&apos;#accordion&apos;</span>).find(<span class="hljs-string">&apos;.content&apos;</span>).hide();  <span class="hljs-regexp">//</span>&#x5173;&#x95ED;&#x5168;&#x90E8;&#x6807;&#x7B7E;
<span class="hljs-variable">$(</span><span class="hljs-string">&apos;#accordion&apos;</span>).find(<span class="hljs-string">&apos;.accordion-header&apos;</span>).click(function () {
  var <span class="hljs-keyword">next</span> = <span class="hljs-variable">$(</span>this).<span class="hljs-keyword">next</span>();
  <span class="hljs-keyword">next</span>.slideToggle(<span class="hljs-string">&apos;fast&apos;</span>);
  <span class="hljs-variable">$(</span><span class="hljs-string">&apos;.content&apos;</span>).<span class="hljs-keyword">not</span>(<span class="hljs-keyword">next</span>).slideUp(<span class="hljs-string">&apos;fast&apos;</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
});</code></pre><h3 id="articleHeader21">&#x8C03;&#x6574;&#x591A;&#x4E2A; div &#x4E00;&#x6837;&#x9AD8;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $columns = $(&apos;.column&apos;);
var height = 0;
$columns.each(function () {
  if ($(this).height() &gt; height) {
    height = $(this).height();
  }
});
$columns.height(height);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> $<span class="hljs-built_in">columns</span> = $(&apos;.column&apos;);
<span class="hljs-built_in">var</span> <span class="hljs-built_in">height</span> = <span class="hljs-number">0</span>;
$<span class="hljs-built_in">columns</span>.each(function () {
  <span class="hljs-keyword">if</span> ($(this).<span class="hljs-built_in">height</span>() &gt; <span class="hljs-built_in">height</span>) {
    <span class="hljs-built_in">height</span> = $(this).<span class="hljs-built_in">height</span>();
  }
});
$<span class="hljs-built_in">columns</span>.<span class="hljs-built_in">height</span>(<span class="hljs-built_in">height</span>);</code></pre><h3 id="articleHeader22">&#x540C;&#x94FE;&#x63A5;&#x4E0D;&#x540C;&#x6837;&#x5F0F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&apos;a[href^=&quot;http&quot;]&apos;).attr(&apos;target&apos;, &apos;_blank&apos;);
$(&apos;a[href^=&quot;//&quot;]&apos;).attr(&apos;target&apos;, &apos;_blank&apos;);
$(&apos;a[href^=&quot;&apos; + window.location.origin + &apos;&quot;]&apos;).attr(&apos;target&apos;, &apos;_self&apos;);  //cannot work in IE10
$(&quot;a[href$=pdf]&quot;).addClass(&apos;pdf&apos;);
$(&quot;a[href$=doc]&quot;).addClass(&apos;doc&apos;);
$(&quot;a[href$=xls]&quot;).addClass(&apos;xls&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs smalltalk"><code><span class="hljs-string">$(</span><span class="hljs-string">&apos;a[href^=&quot;http&quot;]&apos;</span>).attr(<span class="hljs-string">&apos;target&apos;</span>, <span class="hljs-string">&apos;_blank&apos;</span>);
<span class="hljs-string">$(</span><span class="hljs-string">&apos;a[href^=&quot;//&quot;]&apos;</span>).attr(<span class="hljs-string">&apos;target&apos;</span>, <span class="hljs-string">&apos;_blank&apos;</span>);
<span class="hljs-string">$(</span><span class="hljs-string">&apos;a[href^=&quot;&apos;</span> + window.location.origin + <span class="hljs-string">&apos;&quot;]&apos;</span>).attr(<span class="hljs-string">&apos;target&apos;</span>, <span class="hljs-string">&apos;_self&apos;</span>);  //cannot work in <span class="hljs-type">IE10</span>
<span class="hljs-string">$(</span><span class="hljs-comment">&quot;a[href$=pdf]&quot;</span>).addClass(<span class="hljs-string">&apos;pdf&apos;</span>);
<span class="hljs-string">$(</span><span class="hljs-comment">&quot;a[href$=doc]&quot;</span>).addClass(<span class="hljs-string">&apos;doc&apos;</span>);
<span class="hljs-string">$(</span><span class="hljs-comment">&quot;a[href$=xls]&quot;</span>).addClass(<span class="hljs-string">&apos;xls&apos;</span>);</code></pre><h3 id="articleHeader23">&#x901A;&#x8FC7;&#x5185;&#x5BB9;&#x67E5;&#x627E;&#x5143;&#x7D20;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var search = $(&apos;#search&apos;).val();
$(&apos;div:not(:contains(&quot;&apos; + search + &apos;&quot;))&apos;).hide();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> search = $(<span class="hljs-string">&apos;#search&apos;</span>).val();
$(<span class="hljs-string">&apos;div:not(:contains(&quot;&apos;</span> + search + <span class="hljs-string">&apos;&quot;))&apos;</span>).hide();</code></pre><h3 id="articleHeader24">&#x5F53;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#x89E6;&#x53D1;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).on(&apos;visibilitychange&apos;, function (e) {
  if (e.target.visibilityState === &quot;visible&quot;) {
    console.log(&apos;Tab is now in view!&apos;);
  } else if (e.target.visibilityState === &quot;hidden&quot;) {
    console.log(&apos;Tab is now hidden!&apos;);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">&apos;visibilitychange&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">if</span> (e.target.visibilityState === <span class="hljs-string">&quot;visible&quot;</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Tab is now in view!&apos;</span>);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (e.target.visibilityState === <span class="hljs-string">&quot;hidden&quot;</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Tab is now hidden!&apos;</span>);
  }
});</code></pre><h3 id="articleHeader25">&#x663E;&#x793A; Ajax &#x9519;&#x8BEF;&#x4FE1;&#x606F;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ajaxError(function (e, xhr, settings, error) {
  console.log(error);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ajaxError(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e, xhr, settings, error</span>) </span>{
  <span class="hljs-built_in">console</span>.log(error);
});</code></pre><h3 id="articleHeader26">&#x7981;&#x7528;&#x53F3;&#x952E;&#x83DC;&#x5355;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
  $(document).bind(&quot;contextmenu&quot;, function(e){
     e.preventDefault();
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  $(<span class="hljs-built_in">document</span>).bind(<span class="hljs-string">&quot;contextmenu&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
     e.preventDefault();
  })
})</code></pre><h3 id="articleHeader27">&#x6A21;&#x62DF; placeholder &#x5C5E;&#x6027;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
  var $input_text = $(&quot;input[type=text]&quot;);
  $input_text.val(&quot;Enter your words here...&quot;);

  var originalValue = input.val();
  input.focus(function(){
    if($.trim(input.val()) == originalValue){
      input.val(&quot;&quot;);
    }
  }).blur(funtion(){
    if($.trim(input.val()) == &quot;&quot;){
      input.val(originalValue);
    }
  });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> $input_text = $(<span class="hljs-string">&quot;input[type=text]&quot;</span>);
  $input_text.val(<span class="hljs-string">&quot;Enter your words here...&quot;</span>);

  <span class="hljs-keyword">var</span> originalValue = input.val();
  input.focus(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>($.trim(input.val()) == originalValue){
      input.val(<span class="hljs-string">&quot;&quot;</span>);
    }
  }).blur(funtion(){
    <span class="hljs-keyword">if</span>($.trim(input.val()) == <span class="hljs-string">&quot;&quot;</span>){
      input.val(originalValue);
    }
  });
});</code></pre><h3 id="articleHeader28">&#x5224;&#x65AD;&#x5143;&#x7D20;&#x662F;&#x5426;&#x5B58;&#x5728;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
  if($(&apos;#id&apos;).length){
    //do sth.
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span>($(<span class="hljs-string">&apos;#id&apos;</span>).length){
    <span class="hljs-comment">//do sth.</span>
  }
});</code></pre><h3 id="articleHeader29">&#x653E;&#x5927; <a>&#x6807;&#x7B7E;&#x9762;&#x79EF;</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;div&quot;).click(function(){
  window.loaction = $(this).find(&quot;a&quot;).attr(&quot;href&quot;);
  return false;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&quot;div&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">window</span>.loaction = $(<span class="hljs-keyword">this</span>).find(<span class="hljs-string">&quot;a&quot;</span>).attr(<span class="hljs-string">&quot;href&quot;</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
});</code></pre><h3 id="articleHeader30">&#x6839;&#x636E;&#x6D4F;&#x89C8;&#x5668;&#x5927;&#x5C0F;&#x9009;&#x62E9;&#x4E0D;&#x540C;&#x7684;&#x7C7B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
  $(window).resize(function(){
    if($(window).width() &gt; 1200){
      $(&apos;body&apos;).addClass(&apos;large&apos;);
    } else {
      $(&apos;body&apos;).removeClass(&apos;large&apos;)
    }
  });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  $(<span class="hljs-built_in">window</span>).resize(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>($(<span class="hljs-built_in">window</span>).width() &gt; <span class="hljs-number">1200</span>){
      $(<span class="hljs-string">&apos;body&apos;</span>).addClass(<span class="hljs-string">&apos;large&apos;</span>);
    } <span class="hljs-keyword">else</span> {
      $(<span class="hljs-string">&apos;body&apos;</span>).removeClass(<span class="hljs-string">&apos;large&apos;</span>)
    }
  });
});</code></pre><h3 id="articleHeader31">&#x81EA;&#x5B9A;&#x4E49;&#x4F2A;&#x7C7B;&#x9009;&#x62E9;&#x5668;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.extend($.expr[&apos;:&apos;], {
  moreThan500px:function(a){
    return $(a).width &gt; 500;
  }
}); //create a pseudo selector &apos;:moreThan500px&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$.extend($.expr[<span class="hljs-string">&apos;:&apos;</span>], {
  <span class="hljs-attr">moreThan500px</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a</span>)</span>{
    <span class="hljs-keyword">return</span> $(a).width &gt; <span class="hljs-number">500</span>;
  }
}); <span class="hljs-comment">//create a pseudo selector &apos;:moreThan500px&apos;</span></code></pre><h3 id="articleHeader32">&#x7981;&#x7528; jQuery &#x6240;&#x4EE5;&#x52A8;&#x753B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fx.off = true;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code style="word-break:break-word;white-space:initial">$.fx.<span class="hljs-keyword">off</span> = <span class="hljs-keyword">true</span>;</code></pre><h3 id="articleHeader33">&#x5224;&#x65AD;&#x9F20;&#x6807;&#x5DE6;&#x53F3;&#x952E;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#id&quot;).mousedown(function(e){
  switch(e.witch){
    case 1: //left click
      break;
    case 2: //middle click
      break;
    case 3: //right click
      break;
    default: break;
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&quot;#id&quot;</span>).mousedown(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">switch</span>(e.witch){
    <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>: <span class="hljs-comment">//left click</span>
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>: <span class="hljs-comment">//middle click</span>
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-number">3</span>: <span class="hljs-comment">//right click</span>
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>: <span class="hljs-keyword">break</span>;
  }
});</code></pre><h3 id="articleHeader34">&#x56DE;&#x8F66;&#x63D0;&#x4EA4;&#x8868;&#x5355;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;input&quot;).keyup(function(e){
  if(e.witch == 13 || e.keyCode == 13){
    $(&quot;#submit&quot;).trigger(&apos;click&apos;);
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&quot;input&quot;</span>).keyup(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">if</span>(e.witch == <span class="hljs-number">13</span> || e.keyCode == <span class="hljs-number">13</span>){
    $(<span class="hljs-string">&quot;#submit&quot;</span>).trigger(<span class="hljs-string">&apos;click&apos;</span>);
  }
});</code></pre><h3 id="articleHeader35">&#x914D;&#x7F6E; Ajax &#x7684;&#x5168;&#x5C40;&#x53C2;&#x6570;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#load&quot;).ajaxStart(function(){
  showLoading();
  disableButton();
}).ajaxComplete(function() {
  hideLoading();
  enableButton();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&quot;#load&quot;</span>).ajaxStart(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  showLoading();
  disableButton();
}).ajaxComplete(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  hideLoading();
  enableButton();
});</code></pre><h3 id="articleHeader36">&#x7528; siblings() &#x9009;&#x62E9;&#x5144;&#x5F1F;&#x5143;&#x7D20;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#nav li&quot;).click(function(){
  $(this).addClass(&quot;active&quot;).sibling().removeClass(&apos;active&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&quot;#nav li&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  $(<span class="hljs-keyword">this</span>).addClass(<span class="hljs-string">&quot;active&quot;</span>).sibling().removeClass(<span class="hljs-string">&apos;active&apos;</span>);
});</code></pre><h3 id="articleHeader37">&#x7528; Firebug &#x8F93;&#x51FA;&#x65E5;&#x5FD7;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.log = jQuery.fn.log = function(msg){
  if(console){
    console.log(&quot;%s, %o&quot;, msg, this);
  }
  return $(this);  //&#x94FE;&#x5F0F;&#x8C03;&#x7528;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>jQuery.log = jQuery.fn.log = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">console</span>){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%s, %o&quot;</span>, msg, <span class="hljs-keyword">this</span>);
  }
  <span class="hljs-keyword">return</span> $(<span class="hljs-keyword">this</span>);  <span class="hljs-comment">//&#x94FE;&#x5F0F;&#x8C03;&#x7528;</span>
}</code></pre><h3 id="articleHeader38">CSS &#x94A9;&#x5B50;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.cssHooks[&apos;borderRadius&apos;] = {
  get: function(ele, computed, extra){
    //Read the value of -moz-border-radius, -webkit-border-radius, -o-border-radius, -ms-border-radius or border-radius depanding on browser.
  }
  set: function(ele, value){
    //Set all the property above.
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>$.cssHooks[<span class="hljs-string">&apos;borderRadius&apos;</span>] = {
  <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ele, computed, extra)</span></span>{
    <span class="hljs-comment">//Read the value of -moz-border-radius, -webkit-border-radius, -o-border-radius, -ms-border-radius or border-radius depanding on browser.</span>
  }
  <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(ele, value)</span></span>{
    <span class="hljs-comment">//Set all the property above.</span>
  }
};</code></pre><h3 id="articleHeader39">&#x9650;&#x5236; textarea &#x7684;&#x6587;&#x5B57;&#x6570;&#x91CF;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jQuery.fn.maxLength = function(max){
  this.each(function(){
    var type = this.tagName.toLowerCase();
    var inputType = this.type ? this.type.toLowerCase() : null;
    if(type == &quot;input&quot; &amp;&amp; inputType == &quot;text&quot; || inputType == &quot;password&quot;){
      this.maxLength = max;  //use normal length
    } else if(type == &quot;textarea&quot;){
      this.onkeypress = function(e){
        var ob = e || window.event;
        var keyCode = ob.keyCode;
        var hasSelection - document.selection ? document.selection.createRange().text.length &gt; 0 : this.selectionStart != this.selectionEnd;
        return !(this.value.length &gt;= max &amp;&amp; (keyCode &gt; 50 || keyCode == 32 || keyCode == 0 || keyCode == 13) &amp;&amp; !ob.ctrlKey &amp;&amp; !ob.altKey &amp;&amp; !ob.shiftKey &amp;&amp; !hasSelection);
      };
      this.onkeyup = function(){
        if(this.value.length &gt; max){
          this.value = this.value.substring(0, max);
        }
      };
    }
  });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>jQuery.fn.maxLength = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">max</span>)</span>{
  <span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> type = <span class="hljs-keyword">this</span>.tagName.toLowerCase();
    <span class="hljs-keyword">var</span> inputType = <span class="hljs-keyword">this</span>.type ? <span class="hljs-keyword">this</span>.type.toLowerCase() : <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">if</span>(type == <span class="hljs-string">&quot;input&quot;</span> &amp;&amp; inputType == <span class="hljs-string">&quot;text&quot;</span> || inputType == <span class="hljs-string">&quot;password&quot;</span>){
      <span class="hljs-keyword">this</span>.maxLength = max;  <span class="hljs-comment">//use normal length</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(type == <span class="hljs-string">&quot;textarea&quot;</span>){
      <span class="hljs-keyword">this</span>.onkeypress = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-keyword">var</span> ob = e || <span class="hljs-built_in">window</span>.event;
        <span class="hljs-keyword">var</span> keyCode = ob.keyCode;
        <span class="hljs-keyword">var</span> hasSelection - <span class="hljs-built_in">document</span>.selection ? <span class="hljs-built_in">document</span>.selection.createRange().text.length &gt; <span class="hljs-number">0</span> : <span class="hljs-keyword">this</span>.selectionStart != <span class="hljs-keyword">this</span>.selectionEnd;
        <span class="hljs-keyword">return</span> !(<span class="hljs-keyword">this</span>.value.length &gt;= max &amp;&amp; (keyCode &gt; <span class="hljs-number">50</span> || keyCode == <span class="hljs-number">32</span> || keyCode == <span class="hljs-number">0</span> || keyCode == <span class="hljs-number">13</span>) &amp;&amp; !ob.ctrlKey &amp;&amp; !ob.altKey &amp;&amp; !ob.shiftKey &amp;&amp; !hasSelection);
      };
      <span class="hljs-keyword">this</span>.onkeyup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.value.length &gt; max){
          <span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.value.substring(<span class="hljs-number">0</span>, max);
        }
      };
    }
  });
};</code></pre><h3 id="articleHeader40">&#x5220;&#x9664;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684; HTML &#x6807;&#x7B7E;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.fn.stripHTML = function(){
  var regexp = /&lt;(&quot;[^&quot;]*&quot;|&apos;[^&apos;]&apos;|[^&apos;&quot;&gt;])*/gi;
  this.each(function(){
    $(this).html($(this).html().replace(regexp, &quot;&quot;));
  });
  return $(this);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$.fn.stripHTML = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> regexp = <span class="hljs-regexp">/&lt;(&quot;[^&quot;]*&quot;|&apos;[^&apos;]&apos;|[^&apos;&quot;&gt;])*/gi</span>;
  <span class="hljs-keyword">this</span>.each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).html($(<span class="hljs-keyword">this</span>).html().replace(regexp, <span class="hljs-string">&quot;&quot;</span>));
  });
  <span class="hljs-keyword">return</span> $(<span class="hljs-keyword">this</span>);
}</code></pre><h3 id="articleHeader41">&#x4F7F;&#x7528; proxy() &#x51FD;&#x6570;&#x4EE3;&#x7406;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;panel&quot;).fadeIn(function(){
  $(&quot;panel button&quot;).click(function(){
    $(this).fadeOut(); //&apos;this&apos; is button, not panel
  });
  $(&quot;panel button&quot;).click($.proxy(function(){
    $(this).fadeOut(); //&apos;this&apos; is panel, not button
  }, this));
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-string">&quot;panel&quot;</span>).fadeIn(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  $(<span class="hljs-string">&quot;panel button&quot;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).fadeOut(); <span class="hljs-comment">//&apos;this&apos; is button, not panel</span>
  });
  $(<span class="hljs-string">&quot;panel button&quot;</span>).click($.proxy(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).fadeOut(); <span class="hljs-comment">//&apos;this&apos; is panel, not button</span>
  }, <span class="hljs-keyword">this</span>));
});</code></pre><h3 id="articleHeader42">&#x7981;&#x7528;&#x524D;&#x8FDB;&#x540E;&#x9000;&#x6309;&#x94AE;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
  window.history.forward(1);
  window.history.forward(-1);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">window</span>.history.forward(<span class="hljs-number">1</span>);
  <span class="hljs-built_in">window</span>.history.forward(<span class="hljs-number">-1</span>);
})</code></pre><h1 id="articleHeader43">javascript &#x90E8;&#x5206;</h1><h3 id="articleHeader44">&#x7C7B;&#x6570;&#x7EC4;&#x5BF9;&#x8C61;&#x8F6C;&#x5316;&#x4E3A;&#x6570;&#x7EC4;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function trans(obj){
  return [].slice.call(obj);
}

//&#x4EE5;&#x4E0B;&#x662F; ES6 &#x65B9;&#x6CD5;
function trans(obj){
  return Array.from(obj);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">trans</span>(obj){
  <span class="hljs-keyword">return</span> <span class="hljs-type">[].slice.call(obj)</span>;
}

//&#x4EE5;&#x4E0B;&#x662F; ES6 &#x65B9;&#x6CD5;
<span class="hljs-keyword">function</span> <span class="hljs-title">trans</span>(obj){
  <span class="hljs-keyword">return</span> <span class="hljs-type">Array.from(obj)</span>;
}</code></pre><h3 id="articleHeader45">&#x5224;&#x65AD; &#x6D4F;&#x89C8;&#x5668; js &#x7248;&#x672C;(&#x9E2D;&#x5F0F;&#x8FA9;&#x578B;)</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//js&#x7248;&#x672C;&#x68C0;&#x6D4B;
  var JS_ver = [];
(Number.prototype.toFixed)?JS_ver.push(&quot;1.5&quot;):false;
([].indexOf &amp;&amp; [].forEach)?JS_ver.push(&quot;1.6&quot;):false;
((function(){try {[a,b] = [0,1];return true;}catch(ex) {return false;}})())?JS_ver.push(&quot;1.7&quot;):false;
([].reduce &amp;&amp; [].reduceRight &amp;&amp; JSON)?JS_ver.push(&quot;1.8&quot;):false;
(&quot;&quot;.trimLeft)?JS_ver.push(&quot;1.8.1&quot;):false;
JS_ver.supports = function()
{
&#x3000;&#x3000;if (arguments[0])
&#x3000;&#x3000;&#x3000;&#x3000;return (!!~this.join().indexOf(arguments[0] +&quot;,&quot;) +&quot;,&quot;);
&#x3000;&#x3000;else
&#x3000;&#x3000;&#x3000;&#x3000;return (this[this.length-1]);
}
console.log(&quot;Javascript version supported in this browser: &quot;+ JS_ver.supports());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//js&#x7248;&#x672C;&#x68C0;&#x6D4B;</span>
  <span class="hljs-keyword">var</span> JS_ver = [];
(<span class="hljs-built_in">Number</span>.prototype.toFixed)?JS_ver.push(<span class="hljs-string">&quot;1.5&quot;</span>):<span class="hljs-literal">false</span>;
([].indexOf &amp;&amp; [].forEach)?JS_ver.push(<span class="hljs-string">&quot;1.6&quot;</span>):<span class="hljs-literal">false</span>;
((<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">try</span> {[a,b] = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>];<span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;}<span class="hljs-keyword">catch</span>(ex) {<span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;}})())?JS_ver.push(<span class="hljs-string">&quot;1.7&quot;</span>):<span class="hljs-literal">false</span>;
([].reduce &amp;&amp; [].reduceRight &amp;&amp; <span class="hljs-built_in">JSON</span>)?JS_ver.push(<span class="hljs-string">&quot;1.8&quot;</span>):<span class="hljs-literal">false</span>;
(<span class="hljs-string">&quot;&quot;</span>.trimLeft)?JS_ver.push(<span class="hljs-string">&quot;1.8.1&quot;</span>):<span class="hljs-literal">false</span>;
JS_ver.supports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)
</span>{
&#x3000;&#x3000;<span class="hljs-keyword">if</span> (<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>])
&#x3000;&#x3000;&#x3000;&#x3000;<span class="hljs-keyword">return</span> (!!~<span class="hljs-keyword">this</span>.join().indexOf(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] +<span class="hljs-string">&quot;,&quot;</span>) +<span class="hljs-string">&quot;,&quot;</span>);
&#x3000;&#x3000;<span class="hljs-keyword">else</span>
&#x3000;&#x3000;&#x3000;&#x3000;<span class="hljs-keyword">return</span> (<span class="hljs-keyword">this</span>[<span class="hljs-keyword">this</span>.length<span class="hljs-number">-1</span>]);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Javascript version supported in this browser: &quot;</span>+ JS_ver.supports());</code></pre><h3 id="articleHeader46">&#x83B7;&#x53D6; url &#x4E2D;&#x53C2;&#x6570;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getURIData(url){
  var para = url.slice(url.indexOf(&apos;?&apos;) + 1);
  var reg = /&amp;?(\w*)=([%\w]*)/g;
  var temp, data = {};
  while(temp = reg.exec(para)){
    data[temp[1]] = window.decodeURIComponent(temp[2]);
  }
  return data;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getURIData</span>(<span class="hljs-params">url</span>)</span>{
  <span class="hljs-built_in">var</span> para = <span class="hljs-built_in">url</span>.slice(<span class="hljs-built_in">url</span>.indexOf(<span class="hljs-string">&apos;?&apos;</span>) + <span class="hljs-number">1</span>);
  <span class="hljs-built_in">var</span> reg = <span class="hljs-regexp">/&amp;?(\w*)=([%\w]*)/g</span>;
  <span class="hljs-built_in">var</span> temp, data = {};
  <span class="hljs-keyword">while</span>(temp = reg.exec(para)){
    data[temp[<span class="hljs-number">1</span>]] = <span class="hljs-built_in">window</span>.decodeURIComponent(temp[<span class="hljs-number">2</span>]);
  }
  <span class="hljs-keyword">return</span> data;
}</code></pre><h3 id="articleHeader47">&#x5229;&#x7528; documentFragment &#x907F;&#x514D;&#x591A;&#x6B21;&#x5237;&#x65B0; DOM</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function createList() {
&#x3000;&#x3000;var lis = [&quot;first item&quot;, &quot;second item&quot;, &quot;third item&quot;,
&#x3000;&#x3000;&quot;fourth item&quot;, &quot;fith item&quot;];
&#x3000;&#x3000;var Frag = document.createDocumentFragment();
&#x3000;&#x3000;while (lis.length) {
&#x3000;&#x3000;&#x3000;&#x3000;var li = document.createElement(&quot;li&quot;);
&#x3000;&#x3000;&#x3000;  li.appendChild(document.createTextNode(lis.shift()));
&#x3000;&#x3000;&#x3000;&#x3000;Frag.appendChild(li);
&#x3000;&#x3000;}
&#x3000;&#x3000;document.getElementById(&apos;myUL&apos;).appendChild(Frag);
})();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span> createList() {
&#x3000;&#x3000;var lis = [<span class="hljs-string">&quot;first item&quot;</span>, <span class="hljs-string">&quot;second item&quot;</span>, <span class="hljs-string">&quot;third item&quot;</span>,
&#x3000;&#x3000;<span class="hljs-string">&quot;fourth item&quot;</span>, <span class="hljs-string">&quot;fith item&quot;</span>]<span class="hljs-comment">;</span>
&#x3000;&#x3000;var Frag = document.createDocumentFragment()<span class="hljs-comment">;</span>
&#x3000;&#x3000;while (<span class="hljs-name">lis.length</span>) {
&#x3000;&#x3000;&#x3000;&#x3000;var li = document.createElement(<span class="hljs-string">&quot;li&quot;</span>)<span class="hljs-comment">;</span>
&#x3000;&#x3000;&#x3000;  li.appendChild(<span class="hljs-name">document.createTextNode</span>(<span class="hljs-name">lis.shift</span>()))<span class="hljs-comment">;</span>
&#x3000;&#x3000;&#x3000;&#x3000;Frag.appendChild(<span class="hljs-name">li</span>)<span class="hljs-comment">;</span>
&#x3000;&#x3000;}
&#x3000;&#x3000;document.getElementById(<span class="hljs-name">&apos;myUL&apos;</span>).appendChild(<span class="hljs-name">Frag</span>)<span class="hljs-comment">;</span>
})()<span class="hljs-comment">;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
常见样式设计及DOM操作整理

## 原文链接
[https://segmentfault.com/a/1190000016331039](https://segmentfault.com/a/1190000016331039)


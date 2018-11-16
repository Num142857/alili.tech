---
title: CSS魔法堂：改变单选框颜色就这么吹毛求疵！
hidden: true
categories: [reprint]
slug: 4874f1c2
date: 2018-11-03 02:30:13
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x2003;&#x662F;&#x5426;&#x66FE;&#x7ECF;&#x88AB;&#x4E1A;&#x52A1;&#x63D0;&#x51FA;&quot;&#x80FD;&#x6539;&#x6539;&#x8FD9;&#x4E2A;&#x5355;&#x9009;&#x6846;&#x7684;&#x989C;&#x8272;&#x5427;&#xFF01;&#x8BA9;&#x5B83;&#x548C;&#x4E3B;&#x9898;&#x989C;&#x8272;&#x642D;&#x914D;&#x4E00;&#x4E0B;&#x5427;&#xFF01;&quot;&#xFF0C;&#x7136;&#x540E;&#x82E6;&#x4E8E;&#x539F;&#x751F;&#x4E0D;&#x652F;&#x6301;&#x6362;&#x989C;&#x8272;&#xFF0C;&#x6700;&#x540E;&#x88AB;&#x8FEB;&#x81EA;&#x5DF1;&#x624B;&#x64B8;&#x4E00;&#x4E2A;&#x51D1;&#x5408;&#x4F7F;&#x7528;&#x3002;&#x82E5;&#x629B;&#x5F00;<code>input[type=radio]</code>&#x91CD;&#x65B0;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#xFF0C;&#x53D1;&#x73B0;&#x8981;&#x6A21;&#x62DF;&#x9009;&#x4E2D;&#x3001;&#x672A;&#x9009;&#x4E2D;&#x3001;&#x4E0D;&#x53EF;&#x7528;&#x7B49;&#x72B6;&#x6001;&#x5F88;&#x7E41;&#x7410;&#xFF0C;&#x800C;&#x6D89;&#x53CA;&#x5355;&#x9009;&#x6846;&#x7EC4;&#x5C31;&#x66F4;&#x70E6;&#x4EBA;&#x4E86;&#xFF0C;&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>label</code>&#x3001;<code>::before</code>&#x3001;<code>:checked</code>&#x548C;<code>tabindex</code>&#xFF0C;&#x7136;&#x540E;&#x5916;&#x52A0;&#x5C11;&#x91CF;JavaScript&#x811A;&#x672C;&#x5C31;&#x80FD;&#x5F88;&#x597D;&#x5730;&#x6A21;&#x62DF;&#x51FA;&#x4E00;&#x4E2A;&#x6837;&#x5F0F;&#x66F4;&#x4E30;&#x5BCC;&#x7684;&#x201C;&#x539F;&#x751F;&#x201D;&#x5355;&#x9009;&#x6846;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x6765;&#x5C1D;&#x8BD5;&#x5427;&#xFF01;</p><h2 id="articleHeader1">&#x5355;&#x9009;&#x6846;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;</h2><p>&#x2003;&#x7531;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x76EE;&#x6807;&#x662F;&#x6539;&#x53D8;&#x5355;&#x9009;&#x6846;&#x989C;&#x8272;&#xFF0C;&#x5176;&#x4ED6;&#x5916;&#x89C2;&#x7279;&#x5F81;&#x548C;&#x884C;&#x4E3A;&#x4E0E;&#x539F;&#x6765;&#x7684;&#x5355;&#x9009;&#x6846;&#x4E00;&#x81F4;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5C31;&#x5FC5;&#x987B;&#x5148;&#x4E86;&#x89E3;&#x5355;&#x9009;&#x6846;&#x539F;&#x6765;&#x7684;&#x5916;&#x89C2;&#x7279;&#x5F81;&#x548C;&#x884C;&#x4E3A;&#x4E3B;&#x8981;&#x6709;&#x54EA;&#x4E9B;&#x3002;<br>1.&#x5916;&#x89C2;&#x7279;&#x5F81;<br>1.1.&#x5E38;&#x6001;&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin: 3px 3px 0px 5px;
border: none 0;
padding: 0;
box-sizing: border-box;
display: inline-block;
line-height: normal;
position: static;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">margin</span>: <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">0px</span> <span class="hljs-number">5px</span>;
<span class="hljs-attribute">border</span>: none <span class="hljs-number">0</span>;
<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">box-sizing</span>: border-box;
<span class="hljs-attribute">display</span>: inline-block;
<span class="hljs-attribute">line-height</span>: normal;
<span class="hljs-attribute">position</span>: static;</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x5916;&#x89C2;&#x4E0A;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x8981;&#x4FDD;&#x8BC1;&#x5E03;&#x5C40;&#x7279;&#x6027;&#x548C;&#x539F;&#x751F;&#x7684;&#x4E00;&#x81F4;&#xFF0C;&#x5426;&#x5219;&#x91C7;&#x7528;&#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x66FF;&#x6362;&#x540E;&#x5F88;&#x5927;&#x673A;&#x4F1A;&#x4F1A;&#x5F71;&#x54CD;&#x6574;&#x4F53;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x6700;&#x540E;&#x5BFC;&#x81F4;&#x88AB;&#x8FEB;&#x8C03;&#x6574;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#x7279;&#x6027;&#x6765;&#x8FBE;&#x5230;&#x6574;&#x4F53;&#x7684;&#x534F;&#x8C03;&#xFF0C;&#x4ECE;&#x800C;&#x6269;&#x5927;&#x4E86;&#x4FEE;&#x6539;&#x8303;&#x56F4;&#x3002;</p><p>1.2.&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x7684;&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="outline-offset: 0px;
outline: -webkit-focu-ring-color auto 5px;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">outline-offset</span>: <span class="hljs-number">0px</span>;
<span class="hljs-attribute">outline</span>: -webkit-focu-ring-color auto <span class="hljs-number">5px</span>;</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x8FD9;&#x91CC;&#x7684;&#x83B7;&#x53D6;&#x7126;&#x70B9;&#x7684;&#x6837;&#x5F0F;&#x4EC5;&#x901A;&#x8FC7;&#x952E;&#x76D8;<code>Tab</code>&#x952E;&#x624D;&#x751F;&#x6548;&#xFF0C;&#x82E5;&#x901A;&#x8FC7;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x867D;&#x7136;&#x5355;&#x9009;&#x6846;&#x5DF2;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#xFF0C;&#x4F46;&#x4E0A;&#x8FF0;&#x6837;&#x5F0F;&#x5E76;&#x4E0D;&#x4F1A;&#x751F;&#x6548;&#x3002;</p><p>1.3.&#x8BBE;&#x7F6E;&#x4E3A;<code>disabled</code>&#x7684;&#x6837;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="color: rgb(84, 84, 84);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">color</span>: rgb(<span class="hljs-number">84</span>, <span class="hljs-number">84</span>, <span class="hljs-number">84</span>);</code></pre><p>2.&#x884C;&#x4E3A;&#x7279;&#x5F81;<br>&#x2003;&#x5355;&#x9009;&#x6846;&#x7684;&#x884C;&#x4E3A;&#x7279;&#x5F81;&#xFF0C;&#x660E;&#x663E;&#x5C31;&#x662F;&#x9009;&#x4E2D;&#x4E0E;&#x5426;&#xFF0C;&#x53CA;&#x9009;&#x4E2D;&#x72B6;&#x6001;&#x7684;&#x6539;&#x53D8;&#x4E8B;&#x4EF6;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x4FDD;&#x6301;&#x5BF9;&#x5916;&#x63D0;&#x4F9B;<code>change</code>&#x4E8B;&#x4EF6;&#x3002;<br>&#x2003;&#x53E6;&#x5916;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5F53;&#x901A;&#x8FC7;&#x952E;&#x76D8;&#x7684;<code>Tab</code>&#x952E;&#x8BA9;&#x5355;&#x9009;&#x6846;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x540E;&#xFF0C;&#x518D;&#x6309;&#x4E0B;<code>Space</code>&#x952E;&#x5219;&#x4F1A;&#x9009;&#x4E2D;&#x8BE5;&#x5355;&#x9009;&#x6846;&#x3002;</p><p>&#x2003;&#x6709;&#x4E86;&#x4E0A;&#x8FF0;&#x7684;&#x4E86;&#x89E3;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x7740;&#x624B;&#x64B8;&#x4EE3;&#x7801;&#x4E86;&#xFF01;</p><h2 id="articleHeader2">&#x5C11;&#x5E9F;&#x8BDD;&#xFF0C;&#x64B8;&#x4EE3;&#x7801;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000016588961?w=141&amp;h=102" src="https://static.alili.tech/img/remote/1460000016588961?w=141&amp;h=102" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x56FE;&#x4E2D;&#x5DE6;&#x4FA7;&#x5C31;&#x662F;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#xFF0C;&#x53F3;&#x4FA7;&#x4E3A;&#x6211;&#x4EEC;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5355;&#x9009;&#x6846;&#x3002;&#x4ECE;&#x4E0A;&#x5230;&#x4E0B;&#x4F9D;&#x6B21;&#x4E3A;<em>&#x672A;&#x9009;&#x4E2D;</em>&#x3001;<em>&#x9009;&#x4E2D;</em>&#x3001;<em>&#x83B7;&#x5F97;&#x7126;&#x70B9;</em>&#x548C;<em>disabled</em>&#x72B6;&#x6001;&#x7684;&#x6837;&#x5F0F;&#x3002;</p><p>CSS&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="label.radio {
  /* &#x4FDD;&#x8BC1;&#x5E03;&#x5C40;&#x7279;&#x6027;&#x4FDD;&#x6301;&#x4E00;&#x81F4; */
  margin: 3px 3px 0px 5px;
  display: inline-block;
  box-sizing: border-box;

  width: 12px;
  height: 12px;
}

.radio__appearance{
  display: block; /* &#x8BBE;&#x7F6E;&#x4E3A;block&#x5219;&#x4E0D;&#x53D7;vertical-align&#x5F71;&#x54CD;&#xFF0C;&#x4ECE;&#x800C;&#x4E0D;&#x4F1A;&#x610F;&#x5916;&#x5F71;&#x54CD;&#x5230;.radio&#x7684;linebox&#x9AD8;&#x5EA6; */
  position: relative;
  box-shadow: 0 0 0 1px tomato; /* box-shadow&#x4E0D;&#x50CF;border&#x90A3;&#x6837;&#x4F1A;&#x5F71;&#x54CD;&#x76D2;&#x5B50;&#x7684;&#x6846;&#x9AD8; */
  border-radius: 50%;
  height: 90%;
  width: 90%;
  text-align: center;
}
label.radio [type=radio] + .radio__appearance::before{
  content: &quot;&quot;;
  display: block;
  border-radius: 50%;
  width: 85%;
  height: 85%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: background .3s;
}
label.radio [type=radio]:checked + .radio__appearance::before{
  background: tomato;
}
label.radio [type=radio][disabled] + .radio__appearance{
  opacity: .5;
}
label.radio:focus{
  outline-offset: 0px;
  outline: #999 auto 5px;
}
/* &#x901A;&#x8FC7;&#x9F20;&#x6807;&#x5355;&#x51FB;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;outline&#x6548;&#x679C;&#x4E0D;&#x751F;&#x6548; */
label.radio.clicked{
  outline: none 0;
}
/* &#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x7684;&#x884C;&#x4E3A;&#x4E3B;&#x8981;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5148;&#x5C06;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x9690;&#x85CF; */
label.radio input {
  display: none;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">label</span><span class="hljs-selector-class">.radio</span> {
  <span class="hljs-comment">/* &#x4FDD;&#x8BC1;&#x5E03;&#x5C40;&#x7279;&#x6027;&#x4FDD;&#x6301;&#x4E00;&#x81F4; */</span>
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">0px</span> <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">box-sizing</span>: border-box;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">12px</span>;
}

<span class="hljs-selector-class">.radio__appearance</span>{
  <span class="hljs-attribute">display</span>: block; <span class="hljs-comment">/* &#x8BBE;&#x7F6E;&#x4E3A;block&#x5219;&#x4E0D;&#x53D7;vertical-align&#x5F71;&#x54CD;&#xFF0C;&#x4ECE;&#x800C;&#x4E0D;&#x4F1A;&#x610F;&#x5916;&#x5F71;&#x54CD;&#x5230;.radio&#x7684;linebox&#x9AD8;&#x5EA6; */</span>
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> tomato; <span class="hljs-comment">/* box-shadow&#x4E0D;&#x50CF;border&#x90A3;&#x6837;&#x4F1A;&#x5F71;&#x54CD;&#x76D2;&#x5B50;&#x7684;&#x6846;&#x9AD8; */</span>
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">90%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-tag">label</span><span class="hljs-selector-class">.radio</span> <span class="hljs-selector-attr">[type=radio]</span> + <span class="hljs-selector-class">.radio__appearance</span><span class="hljs-selector-pseudo">::before</span>{
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">85%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">85%</span>;

  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);

  <span class="hljs-attribute">transition</span>: background .<span class="hljs-number">3s</span>;
}
<span class="hljs-selector-tag">label</span><span class="hljs-selector-class">.radio</span> <span class="hljs-selector-attr">[type=radio]</span><span class="hljs-selector-pseudo">:checked</span> + <span class="hljs-selector-class">.radio__appearance</span><span class="hljs-selector-pseudo">::before</span>{
  <span class="hljs-attribute">background</span>: tomato;
}
<span class="hljs-selector-tag">label</span><span class="hljs-selector-class">.radio</span> <span class="hljs-selector-attr">[type=radio]</span><span class="hljs-selector-attr">[disabled]</span> + <span class="hljs-selector-class">.radio__appearance</span>{
  <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">5</span>;
}
<span class="hljs-selector-tag">label</span><span class="hljs-selector-class">.radio</span><span class="hljs-selector-pseudo">:focus</span>{
  <span class="hljs-attribute">outline-offset</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">outline</span>: <span class="hljs-number">#999</span> auto <span class="hljs-number">5px</span>;
}
<span class="hljs-comment">/* &#x901A;&#x8FC7;&#x9F20;&#x6807;&#x5355;&#x51FB;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;outline&#x6548;&#x679C;&#x4E0D;&#x751F;&#x6548; */</span>
<span class="hljs-selector-tag">label</span><span class="hljs-selector-class">.radio</span><span class="hljs-selector-class">.clicked</span>{
  <span class="hljs-attribute">outline</span>: none <span class="hljs-number">0</span>;
}
<span class="hljs-comment">/* &#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x7684;&#x884C;&#x4E3A;&#x4E3B;&#x8981;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5148;&#x5C06;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x9690;&#x85CF; */</span>
<span class="hljs-selector-tag">label</span><span class="hljs-selector-class">.radio</span> <span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">display</span>: none;
}</code></pre><p>HTML&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x672A;&#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;
&lt;label class=&quot;radio&quot; tabindex=&quot;0&quot;&gt;
  &lt;input type=&quot;radio&quot; name=&quot;a&quot;&gt;
  &lt;i class=&quot;radio__appearance&quot;&gt;&lt;/i&gt;
&lt;/label&gt;

&lt;br&gt;

&lt;!-- &#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;
&lt;label class=&quot;radio&quot; tabindex=&quot;0&quot;&gt;
  &lt;input type=&quot;radio&quot; name=&quot;a&quot; checked&gt;
  &lt;i class=&quot;radio__appearance&quot;&gt;&lt;/i&gt;
&lt;/label&gt;

&lt;br&gt;

&lt;!-- disabled&#x72B6;&#x6001; --&gt;
&lt;label class=&quot;radio&quot;&gt;
  &lt;input type=&quot;radio&quot; name=&quot;a&quot; disabled&gt;
  &lt;i class=&quot;radio__appearance&quot;&gt;&lt;/i&gt;
&lt;/label&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- &#x672A;&#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">&quot;0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;a&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__appearance&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">tabindex</span>=<span class="hljs-string">&quot;0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">checked</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__appearance&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

<span class="hljs-comment">&lt;!-- disabled&#x72B6;&#x6001; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">disabled</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__appearance&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span></code></pre><p>JavaScript&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var radios = document.querySelectorAll(&quot;.radio&quot;)
radios.forEach(radio =&gt; {
  // &#x6A21;&#x62DF;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x540E;:focus&#x6837;&#x5F0F;&#x65E0;&#x6548;
  radio.addEventListener(&quot;mousedown&quot;, e =&gt; {
    var tar = e.currentTarget
    tar.classList.add(&quot;clicked&quot;)
    var fp = setInterval(function(){
      if (document.activeElement != tar){
        tar.classList.remove(&quot;clicked&quot;)
        clearInterval(fp)
      }
    }, 400)
  })
  // &#x6A21;&#x62DF;&#x901A;&#x8FC7;&#x952E;&#x76D8;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x540E;&#xFF0C;&#x6309;`Space`&#x952E;&#x6267;&#x884C;&#x9009;&#x4E2D;&#x64CD;&#x4F5C;
  radio.addEventListener(&quot;keydown&quot;, e =&gt; {
    if (e.keyCode === 32){
      e.target.click()
    }
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> radios = <span class="hljs-built_in">document</span>.querySelectorAll(<span class="hljs-string">&quot;.radio&quot;</span>)
radios.forEach(<span class="hljs-function"><span class="hljs-params">radio</span> =&gt;</span> {
  <span class="hljs-comment">// &#x6A21;&#x62DF;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x540E;:focus&#x6837;&#x5F0F;&#x65E0;&#x6548;</span>
  radio.addEventListener(<span class="hljs-string">&quot;mousedown&quot;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-keyword">var</span> tar = e.currentTarget
    tar.classList.add(<span class="hljs-string">&quot;clicked&quot;</span>)
    <span class="hljs-keyword">var</span> fp = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.activeElement != tar){
        tar.classList.remove(<span class="hljs-string">&quot;clicked&quot;</span>)
        clearInterval(fp)
      }
    }, <span class="hljs-number">400</span>)
  })
  <span class="hljs-comment">// &#x6A21;&#x62DF;&#x901A;&#x8FC7;&#x952E;&#x76D8;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x540E;&#xFF0C;&#x6309;`Space`&#x952E;&#x6267;&#x884C;&#x9009;&#x4E2D;&#x64CD;&#x4F5C;</span>
  radio.addEventListener(<span class="hljs-string">&quot;keydown&quot;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">32</span>){
      e.target.click()
    }
  })
})</code></pre><p>&#x8FD9;&#x4E2A;&#x5B9E;&#x73B0;&#x6709;3&#x4E2A;&#x6CE8;&#x610F;&#x70B9;&#xFF1A;</p><ol><li>&#x901A;&#x8FC7;<code>label</code>&#x4F20;&#x9012;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x5230;&#x5173;&#x8054;&#x7684;<code>input[type=radio]</code>&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x5B89;&#x5FC3;&#x9690;&#x85CF;&#x5355;&#x9009;&#x6846;&#x53C8;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x5355;&#x9009;&#x6846;&#x81EA;&#x8EAB;&#x7279;&#x6027;&#x3002;&#x4F46;&#x7531;&#x4E8E;<code>label</code>&#x63A7;&#x4EF6;&#x81EA;&#x8EAB;&#x7684;&#x9650;&#x5236;&#xFF0C;&#x5982;&#x9ED8;&#x8BA4;&#x4E0D;&#x662F;&#x53EF;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x5143;&#x7D20;&#xFF0C;&#x56E0;&#x6B64;&#x65E0;&#x6CD5;&#x4F20;&#x9012;&#x952E;&#x76D8;&#x6309;&#x952E;&#x4E8B;&#x4EF6;&#x5230;&#x5355;&#x9009;&#x6846;&#xFF0C;&#x5373;&#x4F7F;&#x6DFB;&#x52A0;<code>tabindex</code>&#x7279;&#x6027;&#x4E5F;&#x9700;&#x624B;&#x5199;JS&#x6765;&#x5B9E;&#x73B0;&#xFF1B;</li><li>&#x5F53;tabindex&#x5927;&#x4E8E;&#x7B49;&#x4E8E;0&#x65F6;&#x8868;&#x793A;&#x8BE5;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#xFF0C;&#x4E3A;0&#x65F6;&#x8868;&#x793A;&#x6839;&#x636E;&#x5143;&#x7D20;&#x6240;&#x5728;&#x4F4D;&#x7F6E;&#x5B89;&#x6392;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x7684;&#x987A;&#x5E8F;&#xFF0C;&#x800C;&#x5927;&#x4E8E;0&#x5219;&#x8868;&#x793A;&#x8D8A;&#x5C0F;&#x8D8A;&#x5148;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#xFF1B;</li><li>&#x7531;&#x4E8E;&#x5355;&#x9009;&#x6846;&#x7684;<code>display</code>&#x4E3A;<code>inline-block</code>&#xFF0C;&#x56E0;&#x6B64;&#x5355;&#x9009;&#x6846;&#x5C06;&#x5F71;&#x54CD;line box&#x9AD8;&#x5EA6;&#x3002;&#x5F53;&#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x5185;&#x5143;&#x7D20;&#x91C7;&#x7528;<code>inline-block</code>&#x65F6;&#xFF0C;&#x82E5;<code>vertical-align</code>&#x8BBE;&#x7F6E;&#x7A0D;&#x6709;&#x4E0D;&#x614E;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x6240;&#x5728;&#x7684;line box&#x88AB;&#x6491;&#x9AD8;&#xFF0C;&#x4ECE;&#x800C;&#x5BFC;&#x81F4;&#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x6240;&#x5728;&#x7684;line box&#x9AD8;&#x5EA6;&#x53D8;&#x5927;&#x3002;&#x56E0;&#x6B64;&#x8FD9;&#x91CC;&#x91C7;&#x7528;&#x5C06;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x7684;<code>display</code>&#x5747;&#x8BBE;&#x7F6E;&#x4E3A;<code>block</code>&#x7684;&#x505A;&#x6CD5;&#xFF0C;&#x76F4;&#x63A5;&#x8BA9;<code>vertical-align</code>&#x5931;&#x6548;&#xFF0C;&#x63D0;&#x9AD8;&#x53EF;&#x63A7;&#x6027;&#x3002;</li></ol><h2 id="articleHeader3">&#x901A;&#x8FC7;<code>opacity:0</code>&#x5B9E;&#x73B0;(2018/10/5&#x8FFD;&#x52A0;)</h2><p>&#x2003;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x901A;&#x8FC7;label&#x5173;&#x8054;<code>display:none</code>&#x7684;<code>input[type=radio]</code>&#x4ECE;&#x800C;&#x5229;&#x7528;<code>input[type=radio]</code>&#x7B80;&#x5316;&#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x4F9D;&#x7136;&#x8981;&#x624B;&#x5199;JS&#x5B9E;&#x73B0;&#x6309;<code>Space&#x952E;</code>&#x9009;&#x4E2D;&#x7684;&#x884C;&#x4E3A;&#x7279;&#x5F81;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x66F4;&#x7701;&#x4E8B;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x53EA;&#x662F;&#x60F3;&#x8BA9;&#x7528;&#x6237;&#x770B;&#x4E0D;&#x5230;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#xFF0C;&#x90A3;&#x4E48;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x4E3A;<code>opacity:0</code>&#x4E0D;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x5417;&#xFF1F;&#xFF01;<br>CSS&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".radio {
  /* &#x4FDD;&#x8BC1;&#x5E03;&#x5C40;&#x7279;&#x6027;&#x4FDD;&#x6301;&#x4E00;&#x81F4; */
  margin: 3px 3px 0px 5px;
  display: inline-block;
  box-sizing: border-box;

  width: 13px;
  height: 13px;
}
/* &#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x7684;&#x884C;&#x4E3A;&#x4E3B;&#x8981;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5148;&#x5C06;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x900F;&#x660E;&#xFF0C;&#x4E14;&#x6CBE;&#x6EE1;&#x6574;&#x4E2A;&#x7236;&#x5143;&#x7D20; */
.radio input {
  opacity: 0;
  position: absolute;
  z-index: 1; /* &#x5FC5;&#x987B;&#x8986;&#x76D6;&#x5728;.radio__appearance&#x4E0A;&#x624D;&#x80FD;&#x54CD;&#x5E94;&#x9F20;&#x6807;&#x4E8B;&#x4EF6; */
  width: 100%;
  height: 100%;
}
.radio__container-box{
  position: relative;
  width: 100%;
  height: 100%;
}
.radio__appearance{
  display: block; /* &#x8BBE;&#x7F6E;&#x4E3A;block&#x5219;&#x4E0D;&#x53D7;vertical-align&#x5F71;&#x54CD;&#xFF0C;&#x4ECE;&#x800C;&#x4E0D;&#x4F1A;&#x610F;&#x5916;&#x5F71;&#x54CD;&#x5230;.radio&#x7684;linebox&#x9AD8;&#x5EA6; */
  position: relative;
  box-shadow: 0 0 0 1px tomato; /* box-shadow&#x4E0D;&#x50CF;border&#x90A3;&#x6837;&#x4F1A;&#x5F71;&#x54CD;&#x76D2;&#x5B50;&#x7684;&#x6846;&#x9AD8; */
  border-radius: 50%;
  height: 90%;
  width: 90%;
  text-align: center;
}
.radio [type=radio] + .radio__appearance::before{
  content: &quot;&quot;;
  display: block;
  border-radius: 50%;
  width: 85%;
  height: 85%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  transition: background .3s;
}
.radio [type=radio]:checked + .radio__appearance::before{
  background: tomato;
}
.radio [type=radio][disabled] + .radio__appearance{
  opacity: .5;
}
.radio:focus-within .radio__appearance{
  outline-offset: 0px;
  outline: #999 auto 5px;
}
/* &#x901A;&#x8FC7;&#x9F20;&#x6807;&#x5355;&#x51FB;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;outline&#x6548;&#x679C;&#x4E0D;&#x751F;&#x6548; */
.radio.clicked .radio_appearance{
  outline: none 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.radio</span> {
  <span class="hljs-comment">/* &#x4FDD;&#x8BC1;&#x5E03;&#x5C40;&#x7279;&#x6027;&#x4FDD;&#x6301;&#x4E00;&#x81F4; */</span>
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> <span class="hljs-number">0px</span> <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">box-sizing</span>: border-box;

  <span class="hljs-attribute">width</span>: <span class="hljs-number">13px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">13px</span>;
}
<span class="hljs-comment">/* &#x81EA;&#x5B9A;&#x4E49;&#x5355;&#x9009;&#x6846;&#x7684;&#x884C;&#x4E3A;&#x4E3B;&#x8981;&#x662F;&#x57FA;&#x4E8E;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5148;&#x5C06;&#x539F;&#x751F;&#x5355;&#x9009;&#x6846;&#x900F;&#x660E;&#xFF0C;&#x4E14;&#x6CBE;&#x6EE1;&#x6574;&#x4E2A;&#x7236;&#x5143;&#x7D20; */</span>
<span class="hljs-selector-class">.radio</span> <span class="hljs-selector-tag">input</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>; <span class="hljs-comment">/* &#x5FC5;&#x987B;&#x8986;&#x76D6;&#x5728;.radio__appearance&#x4E0A;&#x624D;&#x80FD;&#x54CD;&#x5E94;&#x9F20;&#x6807;&#x4E8B;&#x4EF6; */</span>
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.radio__container-box</span>{
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.radio__appearance</span>{
  <span class="hljs-attribute">display</span>: block; <span class="hljs-comment">/* &#x8BBE;&#x7F6E;&#x4E3A;block&#x5219;&#x4E0D;&#x53D7;vertical-align&#x5F71;&#x54CD;&#xFF0C;&#x4ECE;&#x800C;&#x4E0D;&#x4F1A;&#x610F;&#x5916;&#x5F71;&#x54CD;&#x5230;.radio&#x7684;linebox&#x9AD8;&#x5EA6; */</span>
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">1px</span> tomato; <span class="hljs-comment">/* box-shadow&#x4E0D;&#x50CF;border&#x90A3;&#x6837;&#x4F1A;&#x5F71;&#x54CD;&#x76D2;&#x5B50;&#x7684;&#x6846;&#x9AD8; */</span>
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">90%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">90%</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.radio</span> <span class="hljs-selector-attr">[type=radio]</span> + <span class="hljs-selector-class">.radio__appearance</span><span class="hljs-selector-pseudo">::before</span>{
  <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">85%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">85%</span>;

  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);

  <span class="hljs-attribute">transition</span>: background .<span class="hljs-number">3s</span>;
}
<span class="hljs-selector-class">.radio</span> <span class="hljs-selector-attr">[type=radio]</span><span class="hljs-selector-pseudo">:checked</span> + <span class="hljs-selector-class">.radio__appearance</span><span class="hljs-selector-pseudo">::before</span>{
  <span class="hljs-attribute">background</span>: tomato;
}
<span class="hljs-selector-class">.radio</span> <span class="hljs-selector-attr">[type=radio]</span><span class="hljs-selector-attr">[disabled]</span> + <span class="hljs-selector-class">.radio__appearance</span>{
  <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">5</span>;
}
<span class="hljs-selector-class">.radio</span><span class="hljs-selector-pseudo">:focus-within</span> <span class="hljs-selector-class">.radio__appearance</span>{
  <span class="hljs-attribute">outline-offset</span>: <span class="hljs-number">0px</span>;
  <span class="hljs-attribute">outline</span>: <span class="hljs-number">#999</span> auto <span class="hljs-number">5px</span>;
}
<span class="hljs-comment">/* &#x901A;&#x8FC7;&#x9F20;&#x6807;&#x5355;&#x51FB;&#x83B7;&#x5F97;&#x7126;&#x70B9;&#x65F6;&#xFF0C;outline&#x6548;&#x679C;&#x4E0D;&#x751F;&#x6548; */</span>
<span class="hljs-selector-class">.radio</span><span class="hljs-selector-class">.clicked</span> <span class="hljs-selector-class">.radio_appearance</span>{
  <span class="hljs-attribute">outline</span>: none <span class="hljs-number">0</span>;
}</code></pre><p>HTML&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x672A;&#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;
&lt;span class=&quot;radio&quot;&gt;
  &lt;span class=&quot;radio__container-box&quot;&gt;
    &lt;input type=&quot;radio&quot; name=&quot;a&quot;&gt;
    &lt;i class=&quot;radio__appearance&quot;&gt;&lt;/i&gt;
  &lt;/span&gt;
&lt;/span&gt;

&lt;br&gt;

&lt;!-- &#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;
&lt;span class=&quot;radio&quot;&gt;
  &lt;span class=&quot;radio__container-box&quot;&gt;
    &lt;input type=&quot;radio&quot; name=&quot;a&quot; checked&gt;
    &lt;i class=&quot;radio__appearance&quot;&gt;&lt;/i&gt;
  &lt;/span&gt;
&lt;/span&gt;

&lt;br&gt;

&lt;!-- disabled&#x72B6;&#x6001; --&gt;
&lt;span class=&quot;radio&quot;&gt;
  &lt;span class=&quot;radio__container-box&quot;&gt;
    &lt;input type=&quot;radio&quot; name=&quot;a&quot; disabled&gt;
    &lt;i class=&quot;radio__appearance&quot;&gt;&lt;/i&gt;
  &lt;/span&gt;
&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- &#x672A;&#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__container-box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;a&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__appearance&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x9009;&#x4E2D;&#x72B6;&#x6001; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__container-box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">checked</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__appearance&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>

<span class="hljs-comment">&lt;!-- disabled&#x72B6;&#x6001; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__container-box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;radio&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;a&quot;</span> <span class="hljs-attr">disabled</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;radio__appearance&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>JavaScript&#x90E8;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var radios = document.querySelectorAll(&quot;.radio&quot;)
radios.forEach(radio =&gt; {
  // &#x6A21;&#x62DF;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x540E;:focus&#x6837;&#x5F0F;&#x65E0;&#x6548;
  radio.addEventListener(&quot;mousedown&quot;, e =&gt; {
    var tar = e.currentTarget
    tar.classList.add(&quot;clicked&quot;)
    var fp = setInterval(function(){
      if (!tar.contains(document.activeElement){
        tar.classList.remove(&quot;clicked&quot;)
        clearInterval(fp)
      }
    }, 400)
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> radios = document.querySelectorAll(<span class="hljs-string">&quot;.radio&quot;</span>)
radios.forEach(radio =&gt; {
  <span class="hljs-comment">// &#x6A21;&#x62DF;&#x9F20;&#x6807;&#x70B9;&#x51FB;&#x540E;:focus&#x6837;&#x5F0F;&#x65E0;&#x6548;</span>
  radio.addEventListener(<span class="hljs-string">&quot;mousedown&quot;</span>, e =&gt; {
    <span class="hljs-selector-tag">var</span> tar = e<span class="hljs-selector-class">.currentTarget</span>
    tar<span class="hljs-selector-class">.classList</span><span class="hljs-selector-class">.add</span>(<span class="hljs-string">&quot;clicked&quot;</span>)
    <span class="hljs-selector-tag">var</span> fp = setInterval(function(){
      <span class="hljs-keyword">if</span> (!tar.contains(document.activeElement){
        tar<span class="hljs-selector-class">.classList</span><span class="hljs-selector-class">.remove</span>(<span class="hljs-string">&quot;clicked&quot;</span>)
        clearInterval(fp)
      }
    }, <span class="hljs-number">400</span>)
  })
})</code></pre><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><p>&#x2003;&#x5BF9;&#x4E8E;&#x590D;&#x9009;&#x6846;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7A0D;&#x52A0;&#x4FEE;&#x6539;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;VUE&#x3001;React&#x7B49;&#x6846;&#x67B6;&#x7A0D;&#x5FAE;&#x5C01;&#x88C5;&#x4E00;&#x4E0B;&#x63D0;&#x4F9B;&#x66F4;&#x7B80;&#x7EA6;&#x7684;API&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x5C31;&#x66F4;&#x65B9;&#x4FBF;&#x4E86;&#x3002;<br>&#x2003;&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x6765;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9741345.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/fsjoh...</a> ^_^&#x80A5;&#x4ED4;John</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：改变单选框颜色就这么吹毛求疵！

## 原文链接
[https://segmentfault.com/a/1190000016588958](https://segmentfault.com/a/1190000016588958)


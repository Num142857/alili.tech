---
title: js-xlsx + handsontable + echarts实现excel上传编辑然后显示成图表
hidden: true
categories: [reprint]
slug: b103c272
date: 2018-11-02 02:30:12
---

{{< raw >}}
<p>js-xlsx + handsontable + echarts &#x5B9E;&#x73B0;&#x5728;&#x524D;&#x7AEF;&#x5BFC;&#x5165;excel&#x6570;&#x636E;&#x5E76;&#x751F;&#x6210;echart&#x62A5;&#x8868;</p><h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x6700;&#x8FD1;&#x90FD;&#x5728;&#x505A;&#x7C7B;&#x4F3C; ERP &#x7684;&#x9879;&#x76EE;,&#x6240;&#x4EE5;&#x5462;,&#x53C8;&#x78B0;&#x5230;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x53D8;&#x6001;&#x7684;&#x9700;&#x6C42;(&#x81F3;&#x5C11;&#x5BF9;&#x6211;&#x6765;&#x8BF4;&#x662F;),&#x5728;&#x524D;&#x7AEF;&#x5BFC;&#x5165; excel &#x6587;&#x4EF6;,<br>&#x7136;&#x540E;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x9762;&#x9884;&#x89C8;&#x548C;&#x7F16;&#x8F91;,&#x3000;&#x6700;&#x540E;&#x518D;&#x9009;&#x62E9;&#x4E00;&#x4E9B;&#x6570;&#x636E;,&#x7528;echarts&#x751F;&#x6210;&#x62A5;&#x8868;.</p><h3 id="articleHeader1">&#x4F9D;&#x8D56;</h3><p><a href="https://github.com/SheetJS/js-xlsx" rel="nofollow noreferrer" target="_blank">js-xlsx</a> &#x8BFB;&#x53D6;excel&#x6570;&#x636E;&#x5230;js</p><p><a href="https://github.com/handsontable/handsontable" rel="nofollow noreferrer" target="_blank">handsontable</a> &#x7C7B;&#x4F3C;Excel&#x4E00;&#x6837;&#x663E;&#x793A;&#x548C;&#x7F16;&#x8F91;&#x5217;&#x8868;&#x6570;&#x636E;</p><p><a href="https://github.com/apache/incubator-echarts" rel="nofollow noreferrer" target="_blank">echarts</a> &#x4E00;&#x4E2A;&#x751F;&#x6210;&#x5404;&#x79CD;&#x62A5;&#x8868;&#x7684;&#x5E93;</p><h3 id="articleHeader2">&#x6570;&#x636E;&#x5BFC;&#x5165;</h3><p>&#x6570;&#x636E;&#x5BFC;&#x5165;&#x8FD9;&#x8FB9;&#x9700;&#x8981;&#x7528;&#x5230; &#x6D4F;&#x89C8;&#x5668;&#x7684; <code>FileReader&#x5BF9;&#x8C61;</code> &#x7684; <code>readAsBinaryString()</code> &#x51FD;&#x6570;, &#x628A;&#x9009;&#x62E9;&#x7684;&#x6587;&#x4EF6;&#x8BFB;&#x53D6;&#x51FA;&#x6765;,<br>&#x7136;&#x540E;&#x518D;&#x76D1;&#x542C; FileReader &#x5BF9;&#x8C61;&#x7684; <code>onload &#x4E8B;&#x4EF6;</code> , &#x5728; onload &#x4E8B;&#x4EF6; &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;,&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;&#x5230; &#x8BFB;&#x53D6;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;.<br>&#x8FD9;&#x91CC;&#x987A;&#x4FBF;&#x63D0;&#x4E00;&#x4E0B;, FileReader &#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x4EE5;&#x4E0B;&#x65B9;&#x6CD5;,&#x7528;&#x6765;&#x8BFB;&#x53D6;&#x5404;&#x79CD;&#x683C;&#x5F0F;&#x7684;&#x6570;&#x636E;(&#x53C2;&#x8003;&#x81EA;MDN)</p><p>FileReader.readAsArrayBuffer() // &#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x7684; ArrayBuffer &#x6570;&#x636E;&#x5BF9;&#x8C61;.</p><p>FileReader.readAsBinaryString() // &#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x7684;&#x539F;&#x59CB;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;</p><p>FileReader.readAsDataURL() // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;URL&#x683C;&#x5F0F;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x4EE5;&#x8868;&#x793A;&#x6240;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x7684;&#x5185;&#x5BB9;</p><p>FileReader.readAsText() // &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x4EE5;&#x8868;&#x793A;&#x6240;&#x8BFB;&#x53D6;&#x7684;&#x6587;&#x4EF6;&#x5185;&#x5BB9;</p><blockquote>tips: &#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F; readXxxxx() &#x51FD;&#x6570;,&#x662F;&#x4E0D;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x8BFB;&#x53D6;&#x7ED3;&#x679C;&#x7684;,&#x56E0;&#x4E3A;&#x8BFB;&#x53D6;&#x8FD9;&#x4E2A;&#x52A8;&#x4F5C;&#x5F02;&#x6B65;&#x7684;.</blockquote><p>readAsBinaryString &#x8BFB;&#x53D6;&#x5230;&#x7684;&#x5185;&#x5BB9;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x7684;&#x5B57;&#x7B26;&#x4E32;,&#x8FD9;&#x4E2A;&#x65F6;&#x5019;,&#x9700;&#x8981;&#x8C03;&#x7528; <code>js-xlsx</code><br>&#x7684; <code>read</code> &#x65B9;&#x6CD5;, read &#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x8BFB;&#x6027;&#x5F88;&#x5F3A;&#x7684;&#x5BF9;&#x8C61;&#x4E86;,&#x6211;&#x770B;&#x4E86;&#x4E00;&#x4E0B;,&#x91CC;&#x9762;&#x6709;&#x5173;&#x4E8E;&#x8868;&#x683C;&#x7684;&#x5C5E;&#x6027;&#x5F88;&#x591A;&#x90FD;&#x6709;<br>,&#x5982; &#x6837;&#x5F0F;, vsb&#x5B8F;, sheets&#x7B49;&#x7B49; (&#x53CD;&#x6B63;&#x6211;&#x5BF9;excel&#x4E5F;&#x4E0D;&#x719F;,&#x8BA4;&#x8BC6;&#x7684;&#x4E5F;&#x5C31;&#x8FD9;&#x4E9B;&#x54C8;),</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i xlsx" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> xlsx</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import XLSX from &apos;xlsx&apos;
...
let res = XLSX.read(data, {type: &apos;binary&apos;})
let sheetName = res.Sheets[res.SheetNames[0]]
let table = XLSX.utils.sheet_to_json(sheetName, {header: &apos;A&apos;, raw: true, defval: &apos; &apos;})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>import XLSX from <span class="hljs-string">&apos;xlsx&apos;</span>
...
let res = XLSX.read(data, {type: <span class="hljs-string">&apos;binary&apos;</span>})
let sheetName = res<span class="hljs-selector-class">.Sheets</span>[res<span class="hljs-selector-class">.SheetNames</span>[<span class="hljs-number">0</span>]]
let <span class="hljs-selector-tag">table</span> = XLSX<span class="hljs-selector-class">.utils</span><span class="hljs-selector-class">.sheet_to_json</span>(sheetName, {<span class="hljs-selector-tag">header</span>: <span class="hljs-string">&apos;A&apos;</span>, raw: true, defval: <span class="hljs-string">&apos; &apos;</span>})</code></pre><p>&#x8FD9;&#x91CC;&#x7684; res &#x5F97;&#x5230;&#x7684;&#x6211;&#x731C;&#x662F; excel &#x8868;&#x683C;&#x539F;&#x6709;&#x7684;&#x6570;&#x636E;,&#x91CC;&#x9762;&#x5305;&#x542B;&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x5F88;&#x591A;&#x79CD;&#x6570;&#x636E;,&#x800C;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;,<br>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x5F80;&#x5F80;&#x53EA;&#x662F;&#x7B2C;&#x4E00;&#x4E2A; sheet &#x91CC;&#x9762;&#x7684; <code>&#x7EAF;&#x6570;&#x636E;</code>, &#x6240;&#x4EE5;&#x8C03;&#x7528; <code>XLSX.utils.sheet_to_json</code><br>&#x83B7;&#x53D6;&#x7B2C;&#x4E00;&#x4E2A; sheet &#x7684;&#x6570;&#x636E;, table &#x62FF;&#x5230;&#x7684;&#x5E94;&#x8BE5;&#x662F;&#x4E00;&#x4E2A;&#x6211;&#x4EEC;&#x719F;&#x6089;&#x7684;&#x6570;&#x7EC4;&#x4E86;.&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5982;&#x679C;&#x4F60;&#x53EA;&#x662F;&#x5355;&#x7EAF;&#x7684;&#x6E32;&#x67D3;&#x7684;&#x8BDD;,<br>&#x4F60;&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x5C31;&#x6B64;&#x6253;&#x4F4F;,&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x4E2A;&#x6E32;&#x67D3;&#x65B9;&#x6CD5;(&#x6BD4;&#x5982;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;&#x54C8;)&#x628A;&#x6570;&#x636E;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x5373;&#x53EF;.</p><p>&#x5982;&#x679C;&#x5355;&#x7EAF;&#x7684;&#x663E;&#x793A;&#x65E0;&#x6CD5;&#x6EE1;&#x8DB3;&#x4F60;&#x7684;&#x9700;&#x6C42;,&#x90A3;&#x4E48;&#x4F60;&#x53EF;&#x80FD;&#x9700;&#x8981; handsontable &#x4E86;.</p><blockquote>tips: sheet_to_json &#x7684; &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x91CC;&#x9762;&#x7684; header&#xFF0C;&#x53EF;&#x4EE5;&#x4F20;&#x6570;&#x5B57;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8F6C; &apos;A&apos;, &#x4E24;&#x4E2A;&#x7684;&#x4E3B;&#x8981;&#x533A;&#x522B;&#x5728;&#x4E8E;&#x8F6C;&#x5316;&#x51FA;&#x6765;&#x7684;&#x8868;&#x7B2C;&#x4E00;&#x884C;&#x5982;&#x679C;&#x662F;&#x7A7A;&#x884C;&#x4F1A;&#x4E0D;&#x4F1A;&#x6B63;&#x5E38;&#x663E;&#x793A;&#xFF0C;<br>&#x4F20; &apos;A&apos; &#x4F1A;&#x6B63;&#x5E38;&#x663E;&#x793A;&#xFF0C;&#x4F20;&#x6570;&#x5B57;&#x7684;&#x8BDD;&#xFF0C;&#x5982;&#x679C;&#x8868;&#x683C;&#x7684;&#x7B2C;&#x4E00;&#x884C;&#x6709;&#x7A7A;&#x767D;&#x5355;&#x5143;&#x683C;&#xFF0C;&#x8868;&#x683C;&#x4F1A;&#x9519;&#x4E71;&#x3002;</blockquote><h3 id="articleHeader3">&#x6570;&#x636E;&#x5C55;&#x793A;</h3><p>&#x9996;&#x5148;&#x5F53;&#x7136;&#x662F;&#x5B89;&#x88C5;,&#x6211;&#x7684;&#x9879;&#x76EE;&#x662F;&#x57FA;&#x4E8E; vue &#x7684;,&#x6240;&#x4EE5;&#x8981;&#x5B89;&#x88C5; vue &#x7248;&#x672C;&#x7684;,&#x5176;&#x4ED6;&#x6846;&#x67B6;&#x7684;,&#x53EA;&#x8981;&#x5B89;&#x88C5;&#x54CD;&#x5E94;&#x7684;&#x7248;&#x672C;&#x5373;&#x53EF;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i @handsontable/vue" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial"><span class="hljs-built_in">npm</span> i @handsontable/vue</code></pre><p>&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8FD9;&#x4E48;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
 &lt;HotTable :settings=&quot;settings&quot;&gt;&lt;/HotTable&gt;
&lt;/template&gt;

&lt;script&gt;
import HotTable from &apos;@handsontable/vue&apos;
export default {
  ...
  components: {HotTable}
  ...
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">HotTable</span> <span class="hljs-attr">:settings</span>=<span class="hljs-string">&quot;settings&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">HotTable</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> HotTable <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@handsontable/vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  ...
  components: {HotTable}</span><span class="xml"><span class="undefined">
  ...
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x6A21;&#x677F;&#x91CC;&#x9762;&#x7684; settings &#x662F; handsontable &#x7684;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;, &#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x9700;&#x6C42;&#x4E0D;&#x540C;,&#x914D;&#x7F6E;&#x4E5F;&#x4E0D;&#x540C;,&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x5217;&#x4E3E;&#x51FA;&#x6765;&#x4E86;, &#x4E0A;&#x9762;&#x83B7;&#x53D6;&#x5230;&#x7684; table &#x5728;&#x8FD9;&#x91CC;&#x8981;&#x8D4B;&#x503C;&#x7ED9; settings.data</p><p>&#x6211;&#x8FD9;&#x91CC;&#x7528; handsontable &#x663E;&#x793A;&#x6570;&#x636E;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x662F;&#x8BA9;&#x7528;&#x6237;&#x53EF;&#x4EE5;&#x6E05;&#x6670;&#x7684;&#x770B;&#x5230;&#x4E0A;&#x4F20;&#x7684;&#x8868;&#x7684;&#x6570;&#x636E;&#x548C;&#x7ED3;&#x6784;&#xFF0C;&#x53EF;&#x4EE5;&#x5220;&#x9664;&#x5C4C;&#x90E8;&#x5206;&#x65E0;&#x7528;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x51CF;&#x5C11;&#x5197;&#x4F59;&#x3002;</p><h3 id="articleHeader4">&#x751F;&#x6210;&#x62A5;&#x8868;</h3><p>&#x6570;&#x636E;&#x90FD;&#x5904;&#x7406;&#x5B8C;&#x4E86;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x662F;&#x751F;&#x6210;&#x62A5;&#x8868;&#x4E86;&#xFF0C; &#x62A5;&#x8868;&#x8FD9;&#x91CC;&#x7A0D;&#x5FAE;&#x505A;&#x7684;&#x7075;&#x6D3B;&#x4E86;&#x4E00;&#x70B9;&#xFF0C;&#x662F;&#x8981;&#x8BA9;&#x7528;&#x6237;&#x6839;&#x636E;&#x4E0A;&#x4F20;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x81EA;&#x5DF1;&#x9009;&#x62E9;&#x5B57;&#x6BB5;&#xFF0C;&#x7136;&#x540E;&#x7528; echart &#x53BB;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x62A5;&#x8868;&#x3002;</p><p>&#x4E3A;&#x4E86;<del>&#x5077;&#x61D2;</del>&#x964D;&#x4F4E;&#x590D;&#x6742;&#x5EA6;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x53EA;&#x63D0;&#x4F9B;&#x4E86;3&#x79CD;&#x62A5;&#x8868;&#x7C7B;&#x578B;&#x4F9B;&#x9009;&#x62E9;,&#x5206;&#x522B;&#x662F; &#x997C;&#x56FE;&#xFF0C;&#x67F1;&#x72B6;&#x56FE;&#xFF0C;&#x6298;&#x7EBF;&#x56FE;&#xFF0C;&#x7A0D;&#x5FAE;&#x5206;&#x6790; echart &#x7684;&#x914D;&#x7F6E;&#x624B;&#x518C;&#xFF0C;&#x6211;&#x53D1;&#x73B0;&#x5404;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x56FE;&#x8868;&#xFF0C;<br>&#x5176;&#x5B9E;&#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#x5728; series &#x914D;&#x7F6E;&#x9879;&#x4E0B;&#x9762;&#xFF0C;&#x5176;&#x4ED6;&#x4F4D;&#x7F6E;&#x51E0;&#x4E4E;&#x6CA1;&#x5565;&#x533A;&#x522B; <del>&#x5C31;&#x7B97;&#x6709;&#x533A;&#x522B;&#xFF0C;&#x4E5F;&#x88AB;&#x6211;&#x65E0;&#x89C6;</del> &#x3002;&#x6700;&#x7EC8;&#x7684;&#x5B9E;&#x73B0;&#x5927;&#x6982;&#x662F;&#x8FD9;&#x6837;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let option = {
  title: {...},
  tooltip: {...},
  xAxis: {...},
  yAxis: {...},
  toolbox: {...},
}

switch (type) {
  case &apos;pie&apos; : 
    option.series = {...}
    break
  case &apos;pie&apos; : 
    option.series = {...}
    break
  case &apos;pie&apos; : 
    option.series = {...}
    break
}

myChart.setOption(option)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> option = {
  <span class="hljs-attr">title</span>: {...},
  <span class="hljs-attr">tooltip</span>: {...},
  <span class="hljs-attr">xAxis</span>: {...},
  <span class="hljs-attr">yAxis</span>: {...},
  <span class="hljs-attr">toolbox</span>: {...},
}

<span class="hljs-keyword">switch</span> (type) {
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;pie&apos;</span> : 
    option.series = {...}
    <span class="hljs-keyword">break</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;pie&apos;</span> : 
    option.series = {...}
    <span class="hljs-keyword">break</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;pie&apos;</span> : 
    option.series = {...}
    <span class="hljs-keyword">break</span>
}

myChart.setOption(option)</code></pre><blockquote>echart &#x7B2C;&#x4E00;&#x6B21;&#x6E32;&#x67D3;&#x5B8C;&#x4EE5;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x6539;&#x53D8; option &#x7684;&#x6570;&#x636E;&#x7136;&#x540E;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x65B0;&#x7684; option &#x6570;&#x636E;&#x662F;&#x91C7;&#x7528;&#x8FFD;&#x52A0;&#x7684;&#x65B9;&#x5F0F;&#x52A0;&#x8FDB;&#x53BB;&#x7684;&#xFF0C;&#x7C7B;&#x4F3C; javascript &#x7684; Object.assign(),<br>&#x6240;&#x4EE5;&#x5982;&#x679C;&#x65B0;&#x7684;&#x6570;&#x636E;&#x6CA1;&#x529E;&#x6CD5;&#x5B8C;&#x5168;&#x8986;&#x76D6;&#x6389;&#x5C31;&#x65E7;&#x7684;&#x6570;&#x636E;&#x7684;&#x8BDD;&#xFF0C;&#x65E7;&#x7684;&#x90A3;&#x4E9B;&#x6CA1;&#x6709;&#x88AB;&#x8986;&#x76D6;&#x6389;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD8;&#x4F1A;&#x6E32;&#x67D3;&#x51FA;&#x6765;. &#x6211;&#x5BF9;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x5904;&#x7406;&#x65B9;&#x6CD5;&#x662F;&#x8C03;&#x7528; <code>dispose.dispose()</code> &#x628A;&#x5B9E;&#x4F8B;&#x9500;&#x6BC1;&#x6389;&#xFF0C;<br>&#x7136;&#x540E;&#x91CD;&#x65B0;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5B9E;&#x4F8B;&#xFF0C;&#x8BBE;&#x7F6E;&#x65B0;&#x7684; option</blockquote><h3 id="articleHeader5">&#x6700;&#x540E;</h3><p><a href="https://github.com/noahlam/data-process" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a>&#x8BB0;&#x5F97;star &#x548C;follow&#x54E6;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js-xlsx + handsontable + echarts实现excel上传编辑然后显示成图表

## 原文链接
[https://segmentfault.com/a/1190000016448775](https://segmentfault.com/a/1190000016448775)


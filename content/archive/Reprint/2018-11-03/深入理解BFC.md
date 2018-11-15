---
title: 深入理解BFC
reprint: true
categories: reprint
abbrlink: 90bb1448
date: 2018-11-03 10:03:44
---

{{% raw %}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x4EC0;&#x4E48;&#x662F;BFC</h2><p>Formatting context &#x662F; W3C CSS2.1 &#x89C4;&#x8303;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x6982;&#x5FF5;&#x3002;&#x5B83;&#x662F;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x4E00;&#x5757;&#x6E32;&#x67D3;&#x533A;&#x57DF;&#xFF0C;&#x5E76;&#x4E14;&#x6709;&#x4E00;&#x5957;&#x6E32;&#x67D3;&#x89C4;&#x5219;&#xFF0C;&#x5B83;&#x51B3;&#x5B9A;&#x4E86;&#x5176;&#x5B50;&#x5143;&#x7D20;&#x5C06;&#x5982;&#x4F55;&#x5B9A;&#x4F4D;&#xFF0C;&#x4EE5;&#x53CA;&#x548C;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x7684;&#x5173;&#x7CFB;&#x548C;&#x76F8;&#x4E92;&#x4F5C;&#x7528;&#x3002;&#x6700;&#x5E38;&#x89C1;&#x7684; Formatting context &#x6709; Block fomatting context (&#x7B80;&#x79F0;BFC)&#x548C; Inline formatting context (&#x7B80;&#x79F0;IFC)&#x3002;<strong>Block formatting context&#x76F4;&#x8BD1;&#x4E3A;&quot;&#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&quot;&#x3002;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x6E32;&#x67D3;&#x533A;&#x57DF;&#xFF0C;&#x53EA;&#x6709;Block-level box&#x53C2;&#x4E0E;&#xFF0C; &#x5B83;&#x89C4;&#x5B9A;&#x4E86;&#x5185;&#x90E8;&#x7684;Block-level Box&#x5982;&#x4F55;&#x5E03;&#x5C40;&#xFF0C;&#x5E76;&#x4E14;&#x4E0E;&#x8FD9;&#x4E2A;&#x533A;&#x57DF;&#x5916;&#x90E8;&#x6BEB;&#x4E0D;&#x76F8;&#x5E72;</strong>&#x3002;<strong>&#x901A;&#x4FD7;&#x5730;&#x8BB2;&#xFF0C;BFC&#x662F;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;&#xFF0C;&#x7528;&#x4E8E;&#x7BA1;&#x7406;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x3002;</strong></p><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x5982;&#x4F55;&#x521B;&#x5EFA;BFC</h2><ul><li>float&#x4E3A; left|right</li><li>overflow&#x4E3A; hidden|auto|scroll</li><li>display&#x4E3A; table-cell|table-caption|inline-block|inline-flex|flex</li><li>position&#x4E3A; absolute|fixed</li><li>&#x6839;&#x5143;&#x7D20;</li></ul><h2 id="articleHeader2">&#x4E09;&#x3001;BFC&#x5E03;&#x5C40;&#x89C4;&#x5219;&#xFF1A;</h2><ul><li>&#x5185;&#x90E8;&#x7684;Box&#x4F1A;&#x5728;&#x5782;&#x76F4;&#x65B9;&#x5411;&#xFF0C;&#x4E00;&#x4E2A;&#x63A5;&#x4E00;&#x4E2A;&#x5730;&#x653E;&#x7F6E;(&#x5373;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x72EC;&#x5360;&#x4E00;&#x884C;)&#x3002;</li><li>BFC&#x7684;&#x533A;&#x57DF;&#x4E0D;&#x4F1A;&#x4E0E;float box&#x91CD;&#x53E0;(<strong>&#x5229;&#x7528;&#x8FD9;&#x70B9;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x81EA;&#x9002;&#x5E94;&#x4E24;&#x680F;&#x5E03;&#x5C40;</strong>)&#x3002;</li><li>&#x5185;&#x90E8;&#x7684;Box&#x5782;&#x76F4;&#x65B9;&#x5411;&#x7684;&#x8DDD;&#x79BB;&#x7531;margin&#x51B3;&#x5B9A;&#x3002;&#x5C5E;&#x4E8E;&#x540C;&#x4E00;&#x4E2A;BFC&#x7684;&#x4E24;&#x4E2A;&#x76F8;&#x90BB;Box&#x7684;margin&#x4F1A;&#x53D1;&#x751F;&#x91CD;&#x53E0;(<strong>margin&#x91CD;&#x53E0;&#x4E09;&#x4E2A;&#x6761;&#x4EF6;:&#x540C;&#x5C5E;&#x4E8E;&#x4E00;&#x4E2A;BFC;&#x76F8;&#x90BB;;&#x5757;&#x7EA7;&#x5143;&#x7D20;</strong>)&#x3002;</li><li>&#x8BA1;&#x7B97;BFC&#x7684;&#x9AD8;&#x5EA6;&#x65F6;&#xFF0C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E5F;&#x53C2;&#x4E0E;&#x8BA1;&#x7B97;&#x3002;&#xFF08;&#x6E05;&#x9664;&#x6D6E;&#x52A8; haslayout&#xFF09;</li><li>BFC&#x5C31;&#x662F;&#x9875;&#x9762;&#x4E0A;&#x7684;&#x4E00;&#x4E2A;&#x9694;&#x79BB;&#x7684;&#x72EC;&#x7ACB;&#x5BB9;&#x5668;&#xFF0C;&#x5BB9;&#x5668;&#x91CC;&#x9762;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x5916;&#x9762;&#x7684;&#x5143;&#x7D20;&#x3002;&#x53CD;&#x4E4B;&#x4E5F;&#x5982;&#x6B64;&#x3002;</li></ul><h2 id="articleHeader3">&#x56DB;&#x3001; BFC&#x6709;&#x54EA;&#x4E9B;&#x7279;&#x6027;</h2><h3 id="articleHeader4">&#x7279;&#x6027;1&#xFF1A;BFC&#x4F1A;&#x963B;&#x6B62;&#x5782;&#x76F4;&#x5916;&#x8FB9;&#x8DDD;&#x6298;&#x53E0;</h3><p><strong>&#x6309;&#x7167;BFC&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x53EA;&#x6709;&#x540C;&#x5C5E;&#x4E8E;&#x4E00;&#x4E2A;BFC&#x65F6;&#xFF0C;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x624D;&#x6709;&#x53EF;&#x80FD;&#x53D1;&#x751F;&#x5782;&#x76F4;margin&#x7684;&#x91CD;&#x53E0;</strong>&#xFF0C;&#x8FD9;&#x4E2A;&#x5305;&#x62EC;&#x76F8;&#x90BB;&#x5143;&#x7D20;&#x6216;&#x8005;&#x5D4C;&#x5957;&#x5143;&#x7D20;&#xFF0C;&#x53EA;&#x8981;&#x4ED6;&#x4EEC;&#x4E4B;&#x95F4;&#x6CA1;&#x6709;&#x963B;&#x6321;&#xFF08;<strong>&#x6BD4;&#x5982;&#x8FB9;&#x6846;&#x3001;&#x975E;&#x7A7A;&#x5185;&#x5BB9;&#x3001;padding&#x7B49;</strong>&#xFF09;&#x5C31;&#x4F1A;&#x53D1;&#x751F;margin&#x91CD;&#x53E0;&#x3002;</p><h4>&#x2460;&#x76F8;&#x90BB;&#x5144;&#x5F1F;&#x5143;&#x7D20;margin&#x91CD;&#x53E0;&#x95EE;&#x9898;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
p{
        color: #fff;
        background: #888;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
  }
&lt;/style&gt;
&lt;body&gt;
    &lt;p&gt;ABC&lt;/p&gt;
    &lt;p&gt;abc&lt;/p&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span>{
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">text-align</span>:center;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>ABC<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>abc<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016721097?w=208&amp;h=306" src="https://static.alili.tech/img/remote/1460000016721097?w=208&amp;h=306" alt="&#x76F8;&#x90BB;&#x5144;&#x5F1F;&#x5143;&#x7D20;margin&#x91CD;&#x53E0;&#x95EE;&#x9898;" title="&#x76F8;&#x90BB;&#x5144;&#x5F1F;&#x5143;&#x7D20;margin&#x91CD;&#x53E0;&#x95EE;&#x9898;" style="cursor:pointer;display:inline"></span><br>&#x4E0A;&#x9762;&#x4F8B;&#x4E2D;&#x4E24;&#x4E2A;P&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x8DDD;&#x79BB;&#x672C;&#x8BE5;&#x4E3A;200px,&#x7136;&#x800C;&#x5B9E;&#x9645;&#x4E0A;&#x53EA;&#x6709;100px,&#x53D1;&#x751F;&#x4E86;margin&#x91CD;&#x53E0;&#x3002;&#x9047;&#x5230;&#x8FD9;&#x79CD;&#x60C5;&#x5F62;&#xFF0C;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x5904;&#x7406;&#xFF1F;<br><strong>&#x53EA;&#x9700;&#x8981;&#x5728;p&#x5916;&#x9762;&#x5305;&#x88F9;&#x4E00;&#x5C42;&#x5BB9;&#x5668;&#xFF0C;&#x5E76;&#x89E6;&#x53D1;&#x8BE5;&#x5BB9;&#x5668;&#x751F;&#x6210;&#x4E00;&#x4E2A;BFC&#x3002;&#x90A3;&#x4E48;&#x4E24;&#x4E2A;P&#x4FBF;&#x4E0D;&#x5C5E;&#x4E8E;&#x540C;&#x4E00;&#x4E2A;BFC&#xFF0C;&#x5C31;&#x4E0D;&#x4F1A;&#x53D1;&#x751F;margin&#x91CD;&#x53E0;&#x4E86;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
p{
        color: #fff;
        background: #888;
        width: 200px;
        line-height: 100px;
        text-align:center;
        margin: 100px;
    }
.wrap{
  overflow:hidden;
}
&lt;/style&gt;
&lt;body&gt;
   &lt;p&gt;ABC&lt;/p&gt;
  &lt;div class=&quot;wrap&quot;&gt;
    &lt;p&gt;abc&lt;/p&gt;
  &lt;/div&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">p</span>{
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#888</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">text-align</span>:center;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span>;
    }
<span class="hljs-selector-class">.wrap</span>{
  <span class="hljs-attribute">overflow</span>:hidden;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>ABC<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wrap&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>abc<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016721098?w=205&amp;h=408" src="https://static.alili.tech/img/remote/1460000016721098?w=205&amp;h=408" alt="bug&#x4FEE;&#x8865;&#x540E;" title="bug&#x4FEE;&#x8865;&#x540E;" style="cursor:pointer"></span></p><h4>&#x2461;&#x7236;&#x5B50;&#x5143;&#x7D20;margin&#x91CD;&#x53E0;&#x95EE;&#x9898;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.box{
width:100px;
height:100px;
background:#ccc;
}
.wrap {
  background:yellow;
}
.wrap h1{
  background:pink;
  margin:40px;
}
&lt;/style&gt;
&lt;body&gt;
&lt;div class=&quot;box&quot;&gt;box&lt;/div&gt;
&lt;div class=&quot;wrap&quot;&gt;
  &lt;h1&gt;h1&lt;/h1&gt;
&lt;/div&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span>{
<span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
<span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
<span class="hljs-attribute">background</span>:<span class="hljs-number">#ccc</span>;
}
<span class="hljs-selector-class">.wrap</span> {
  <span class="hljs-attribute">background</span>:yellow;
}
<span class="hljs-selector-class">.wrap</span> <span class="hljs-selector-tag">h1</span>{
  <span class="hljs-attribute">background</span>:pink;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">40px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>box<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wrap&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>h1<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016721099" src="https://static.alili.tech/img/remote/1460000016721099" alt="&#x7236;&#x5B50;&#x5143;&#x7D20;margin&#x91CD;&#x53E0;&#x95EE;&#x9898;" title="&#x7236;&#x5B50;&#x5143;&#x7D20;margin&#x91CD;&#x53E0;&#x95EE;&#x9898;" style="cursor:pointer"></span><br>&#x4E0A;&#x56FE;wrap&#x5143;&#x7D20;&#x4E0E;h1&#x5143;&#x7D20;&#x4E4B;&#x95F4;l&#x7406;&#x8BBA;&#x4E0A;&#x672C;&#x8BE5;&#x6709;&#x4E2A;40px&#x7684;&#x4E0A;&#x4E0B;margin&#x503C;,&#x7136;&#x800C;&#x5B9E;&#x9645;&#x4E0A;&#x7236;&#x5B50;&#x5143;&#x7D20;&#x5E76;&#x6CA1;&#x6709;&#x5B58;&#x5728;margin&#x503C;&#xFF0C;&#x4E0E;&#x6B64;&#x540C;&#x65F6;&#xFF0C;&#x4E24;&#x4E2A;div&#x5143;&#x7D20;&#x7684;&#x95F4;&#x8DDD;&#x4E3A;40px&#x3002;&#x9047;&#x5230;&#x8FD9;&#x79CD;&#x60C5;&#x5F62;&#xFF0C;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x5904;&#x7406;&#xFF1F;<br>&#x5904;&#x7406;&#x65B9;&#x6CD5;&#x5176;&#x5B9E;&#x6709;&#x5F88;&#x591A;&#xFF0C;<strong>&#x5728;wrap&#x5143;&#x7D20;&#x4E2D;&#x6DFB;&#x52A0;:overflow:hidden;&#x6216;&#x8005;overflow&#xFF1A;auto&#xFF1B;&#x4F7F;&#x5176;&#x7236;&#x5143;&#x7D20;&#x5F62;&#x6210;&#x4E00;&#x4E2A;BFC&#xFF1B;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;wrap&#x5143;&#x7D20;&#x4E2D;&#x6DFB;&#x52A0;border&#xFF1A;1px solid&#xFF1B;&#x6216;&#x662F;padding&#xFF1A;1px&#xFF1B;</strong>&#x8FD9;&#x4E9B;&#x90FD;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x89E3;&#x51B3;&#x7236;&#x5B50;&#x5143;&#x7D20;margin&#x91CD;&#x53E0;&#x95EE;&#x9898;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016721100?w=632&amp;h=226" src="https://static.alili.tech/img/remote/1460000016721100?w=632&amp;h=226" alt="bug&#x4FEE;&#x8865;&#x540E;" title="bug&#x4FEE;&#x8865;&#x540E;" style="cursor:pointer"></span></p><h3 id="articleHeader5">&#x7279;&#x6027;2&#xFF1A;BFC&#x4E0D;&#x4F1A;&#x91CD;&#x53E0;&#x6D6E;&#x52A8;&#x5143;&#x7D20;</h3><p>&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x7279;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x521B;&#x9020;<strong>&#x81EA;&#x9002;&#x5E94;&#x4E24;&#x680F;&#x5E03;&#x5C40;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.box1{
  height: 100px;
  width: 100px;
  float: left;
  background: lightblue;
}
.box2{width: 200px;
  height: 200px;
  background: #eee;
}
&lt;/style&gt;
&lt;body&gt;
&lt;div class=&quot;box1&quot;&gt;&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x5DE6;&#x6D6E;&#x52A8;&#x7684;&#x5143;&#x7D20;&lt;/div&gt;
&lt;div class=&quot;box2&quot;&gt;&#x5582;&#x5582;&#x5582;!&#x5927;&#x5BB6;&#x4E0D;&#x8981;&#x751F;&#x6C14;&#x561B;&#xFF0C;&#x751F;&#x6C14;&#x4F1A;&#x72AF;&#x55D4;&#x6212;&#x7684;&#x3002;&#x609F;&#x7A7A;&#x4F60;&#x4E5F;&#x592A;&#x8C03;&#x76AE;&#x4E86;&#xFF0C;
&#x6211;&#x8DDF;&#x4F60;&#x8BF4;&#x8FC7;&#x53EB;&#x4F60;&#x4E0D;&#x8981;&#x4E71;&#x6254;&#x4E1C;&#x897F;&#xFF0C;&#x4F60;&#x600E;&#x4E48;&#x53C8;&#x2026;&#x2026;&#x4F60;&#x770B;&#xFF0C;&#x6211;&#x8FD8;&#x6CA1;&#x8BF4;&#x5B8C;&#x4F60;&#x5C31;&#x628A;&#x68CD;&#x5B50;&#x7ED9;&#x6254;&#x6389;&#x4E86;!
&#x6708;&#x5149;&#x5B9D;&#x76D2;&#x662F;&#x5B9D;&#x7269;&#xFF0C;&#x4F60;&#x628A;&#x5B83;&#x6254;&#x6389;&#x4F1A;&#x6C61;&#x67D3;&#x73AF;&#x5883;&#xFF0C;&#x8981;&#x662F;&#x7838;&#x5230;&#x5C0F;&#x670B;&#x53CB;&#x600E;&#x4E48;&#x529E;&#xFF0C;&#x5C31;&#x7B97;&#x7838;&#x4E0D;&#x5230;&#x5C0F;&#x670B;&#x53CB;&#xFF0C;
&#x7838;&#x5230;&#x82B1;&#x82B1;&#x8349;&#x8349;&#x4E5F;&#x662F;&#x4E0D;&#x5BF9;&#x7684;&#x3002;&lt;/div&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box1</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">background</span>: lightblue;
}
<span class="hljs-selector-class">.box2</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#eee</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box1&quot;</span>&gt;</span>&#x6211;&#x662F;&#x4E00;&#x4E2A;&#x5DE6;&#x6D6E;&#x52A8;&#x7684;&#x5143;&#x7D20;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box2&quot;</span>&gt;</span>&#x5582;&#x5582;&#x5582;!&#x5927;&#x5BB6;&#x4E0D;&#x8981;&#x751F;&#x6C14;&#x561B;&#xFF0C;&#x751F;&#x6C14;&#x4F1A;&#x72AF;&#x55D4;&#x6212;&#x7684;&#x3002;&#x609F;&#x7A7A;&#x4F60;&#x4E5F;&#x592A;&#x8C03;&#x76AE;&#x4E86;&#xFF0C;
&#x6211;&#x8DDF;&#x4F60;&#x8BF4;&#x8FC7;&#x53EB;&#x4F60;&#x4E0D;&#x8981;&#x4E71;&#x6254;&#x4E1C;&#x897F;&#xFF0C;&#x4F60;&#x600E;&#x4E48;&#x53C8;&#x2026;&#x2026;&#x4F60;&#x770B;&#xFF0C;&#x6211;&#x8FD8;&#x6CA1;&#x8BF4;&#x5B8C;&#x4F60;&#x5C31;&#x628A;&#x68CD;&#x5B50;&#x7ED9;&#x6254;&#x6389;&#x4E86;!
&#x6708;&#x5149;&#x5B9D;&#x76D2;&#x662F;&#x5B9D;&#x7269;&#xFF0C;&#x4F60;&#x628A;&#x5B83;&#x6254;&#x6389;&#x4F1A;&#x6C61;&#x67D3;&#x73AF;&#x5883;&#xFF0C;&#x8981;&#x662F;&#x7838;&#x5230;&#x5C0F;&#x670B;&#x53CB;&#x600E;&#x4E48;&#x529E;&#xFF0C;&#x5C31;&#x7B97;&#x7838;&#x4E0D;&#x5230;&#x5C0F;&#x670B;&#x53CB;&#xFF0C;
&#x7838;&#x5230;&#x82B1;&#x82B1;&#x8349;&#x8349;&#x4E5F;&#x662F;&#x4E0D;&#x5BF9;&#x7684;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016721101" src="https://static.alili.tech/img/remote/1460000016721101" alt="&#x6587;&#x5B57;&#x56F4;&#x7ED5;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x6392;&#x5217;" title="&#x6587;&#x5B57;&#x56F4;&#x7ED5;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x6392;&#x5217;" style="cursor:pointer"></span><br>&#x4E0A;&#x56FE;&#x4E2D;&#xFF0C;&#x6587;&#x5B57;&#x56F4;&#x7ED5;&#x7740;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x6392;&#x5217;&#xFF0C;&#x4E0D;&#x8FC7;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x8FD9;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x3002;&#x6B64;&#x65F6;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;<strong>&#x4E3A;.box2&#x5143;&#x7D20;&#x7684;&#x6837;&#x5F0F;&#x52A0;&#x4E0A;overflow:hidden&#xFF1B;&#x4F7F;&#x5176;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;BFC,&#x8BA9;&#x5176;&#x5185;&#x5BB9;&#x6D88;&#x9664;&#x5BF9;&#x5916;&#x754C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5F71;&#x54CD;</strong>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016721102?w=400&amp;h=162" src="https://static.alili.tech/img/remote/1460000016721102?w=400&amp;h=162" alt="&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;" title="&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;" style="cursor:pointer"></span><br>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x4E24;&#x5217;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;&#xFF0C;&#x6548;&#x679C;&#x4E0D;&#x9519;&#xFF0C;&#x6B64;&#x65F6;&#x5DE6;&#x8FB9;&#x7684;&#x5BBD;&#x5EA6;&#x56FA;&#x5B9A;&#xFF0C;&#x53F3;&#x8FB9;&#x7684;&#x5185;&#x5BB9;&#x81EA;&#x9002;&#x5E94;&#x5BBD;&#x5EA6;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6539;&#x53D8;&#x6587;&#x5B57;&#x7684;&#x5927;&#x5C0F;&#x6216;&#x8005;&#x5DE6;&#x8FB9;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x4E24;&#x680F;&#x5E03;&#x5C40;&#x7684;&#x7ED3;&#x6784;&#x4F9D;&#x7136;&#x6CA1;&#x6709;&#x6539;&#x53D8;&#xFF01;</p><h3 id="articleHeader6">&#x7279;&#x6027;3&#xFF1A;BFC&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x6D6E;&#x52A8;----&#x6E05;&#x9664;&#x6D6E;&#x52A8;</h3><p>&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#x6D6E;&#x52A8;&#x4F1A;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x770B;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
.box1{
  width:100px;
  height:100px;
  float:left;
  border: 1px solid #000;
}
.box2{
  width:100px;
  height:100px;
  float:left;
  border: 1px solid #000;
}
.box{
  background:yellow
}
&lt;/style&gt;
&lt;body&gt;
&lt;div class=&quot;box&quot;&gt;
  &lt;div class=&quot;box1&quot;&gt;&lt;/div&gt;
  &lt;div class=&quot;box2&quot;&gt;&lt;/div&gt;
&lt;/div&gt; 
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box1</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
}
<span class="hljs-selector-class">.box2</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
}
<span class="hljs-selector-class">.box</span>{
  <span class="hljs-attribute">background</span>:yellow
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016721103" src="https://static.alili.tech/img/remote/1460000016721103" alt="&#x51FA;&#x73B0;bug" title="&#x51FA;&#x73B0;bug" style="cursor:pointer"></span></p><p>&#x7531;&#x4E8E;&#x5BB9;&#x5668;&#x5185;&#x4E24;&#x4E2A;div&#x5143;&#x7D20;&#x6D6E;&#x52A8;&#xFF0C;&#x8131;&#x79BB;&#x4E86;&#x6587;&#x6863;&#x6D41;&#xFF0C;&#x7236;&#x5BB9;&#x5668;&#x5185;&#x5BB9;&#x5BBD;&#x5EA6;&#x4E3A;&#x96F6;&#xFF08;&#x5373;&#x53D1;&#x751F;&#x9AD8;&#x5EA6;&#x584C;&#x9677;&#xFF09;&#xFF0C;&#x672A;&#x80FD;&#x5C06;&#x5B50;&#x5143;&#x7D20;&#x5305;&#x88F9;&#x4F4F;&#x3002;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x628A;&#x628A;&#x7236;&#x5143;&#x7D20;&#x53D8;&#x6210;&#x4E00;&#x4E2A;BFC&#x5C31;&#x884C;&#x4E86;&#x3002;&#x5E38;&#x7528;&#x7684;&#x529E;&#x6CD5;&#x662F;&#x7ED9;&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;overflow:hidden&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016721104?w=630&amp;h=104" src="https://static.alili.tech/img/remote/1460000016721104?w=630&amp;h=104" alt="&#x4FEE;&#x8865;&#x540E;" title="&#x4FEE;&#x8865;&#x540E;" style="cursor:pointer"></span><br><strong>&#x672C;&#x6587;&#x4E8E;2018.10.14&#x91CD;&#x65B0;&#x4FEE;&#x6539;&#xFF0C;&#x5E0C;&#x671B;&#x6587;&#x7AE0;&#x5BF9;&#x4F60;&#x6709;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x5728;<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">&#x6211;&#x7684;GitHub&#x535A;&#x5BA2;</a>&#x70B9;&#x8D5E;&#x548C;&#x5173;&#x6CE8;&#xFF0C;&#x611F;&#x6FC0;&#x4E0D;&#x5C3D;&#xFF01;</strong></p><h2 id="articleHeader7">&#x53C2;&#x8003;&#x6587;&#x7AE0;</h2><h3 id="articleHeader8"><a href="https://www.jianshu.com/p/acf76871d259" rel="nofollow noreferrer" target="_blank">&#x3010;CSS&#x3011;&#x6DF1;&#x5165;&#x7406;&#x89E3;BFC&#x539F;&#x7406;&#x53CA;&#x5E94;&#x7528;</a></h3><h3 id="articleHeader9"><a href="https://zhuanlan.zhihu.com/p/25321647" rel="nofollow noreferrer" target="_blank">10 &#x5206;&#x949F;&#x7406;&#x89E3; BFC &#x539F;&#x7406;</a></h3>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解BFC

## 原文链接
[https://segmentfault.com/a/1190000016721094](https://segmentfault.com/a/1190000016721094)


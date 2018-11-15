---
title: 图解一下啥是CSS堆叠上下文，啥是CSS堆叠层叠顺序，让你对css的疑惑少一点?
hidden: true
categories: reprint
slug: b3209b2b
date: 2018-11-05 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">CSS &#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x662F;&#x5565;&#xFF1F;</h2><p>&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x6837;&#x5F0F;&#x7684; div&#xFF0C;&#x6837;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
    width: 200px;
    height: 200px;
    border:10px solid red;
    padding:15px;
    margin:12px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">10px</span> solid red;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">15px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">12px</span>;
}
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZsh?w=550&amp;h=534" src="https://static.alili.tech/img/bVbhZsh?w=550&amp;h=534" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x8FD9;&#x8FB9;&#x6709;&#x4E2A;&#x95EE;&#x9898;&#x662F;&#xFF1A; border &#x548C; background&#x662F;&#x4EC0;&#x4E48;&#x5173;&#x7CFB; &#xFF1F;</strong></p><p>&#x8FD9;&#x8FB9;&#x6709;&#x4E24;&#x4E2A;&#x9009;&#x9879;&#xFF1A;</p><ol><li>&#x5E73;&#x884C;&#x7684;</li><li>border &#x66F4;&#x9760;&#x8FD1;&#x7528;&#x6237;</li><li>background &#x66F4;&#x9760;&#x8FD1;&#x7528;&#x6237;</li></ol><p>&#x4F60;&#x4EEC;&#x4F1A;&#x9009;&#x62E9;&#x54EA;&#x4E2A;&#x5462;&#xFF1F;</p><p>&#x5176;&#x5B9E;&#x5F04;&#x61C2;&#x8FD9;&#x4E2A;&#x5F88;&#x7B80;&#x5355;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x628A; border &#x8BBE;&#x7F6E;&#x6210;&#x534A;&#x900F;&#x660E;&#x5C31;&#x77E5;&#x9053;&#x7B54;&#x6848;&#x5566;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border:10px solid rgba(255, 0, 0, 0, .3);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">border</span><span class="hljs-selector-pseudo">:10px</span> <span class="hljs-selector-tag">solid</span> <span class="hljs-selector-tag">rgba</span>(255, 0, 0, 0, <span class="hljs-selector-class">.3</span>);

</code></pre><p><span class="img-wrap"><img data-src="/img/bVbhZtt?w=572&amp;h=552" src="https://static.alili.tech/img/bVbhZtt?w=572&amp;h=552" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x4ECE;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x7EA2;&#x8272;&#x900F;&#x7740;&#x7EFF;&#x8272;&#xFF0C;&#x6240;&#x4EE5;&#x662F; border &#x66F4;&#x9760;&#x8FD1;&#x7528;&#x6237; &#x3002;</strong> &#x8FD9;&#x65F6;&#x5019;&#x4F60;&#x5C31;&#x77E5;&#x9053;div &#x4E0D;&#x662F;&#x5E73;&#x7684;&#xFF0C;&#x5728;&#x5782;&#x76F4;&#x5C4F;&#x5E55;&#x4E0A;&#x4E5F;&#x662F;&#x6709;&#x5C42;&#x6B21;&#x5173;&#x7CFB;&#x7684;&#xFF0C;&#x90A3;&#x8FD9;&#x4E2A;&#x5C42;&#x6B21;&#x5173;&#x7CFB;&#x5C31;&#x53EB;&#x505A;&#x5806;<strong>&#x53E0;&#x4E0A;&#x4E0B;&#x6587;</strong>&#x3002;</p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x5728; div &#x91CC;&#x9762;&#x5199;&#x4E2A; &#x2018;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#x2019;&#xFF0C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZuI?w=568&amp;h=550" src="https://static.alili.tech/img/bVbhZuI?w=568&amp;h=550" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x91CC;&#x53C8;&#x5F15;&#x53D1;&#x4E86;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x4E2A; &#x2018;&#x4F60;&#x597D;&#xFF0C;&#x4E16;&#x754C;&#x2019;&#xFF0C; &#x662F;&#x5728;&#x54EA;&#x5C42;&#x4E86;&#xFF0C;&#x662F;&#x5728; border &#x4E0A;&#x8FD8;&#x662F;&#x5728; border &#x4E0E; background &#x4E4B;&#x95F4;&#x5462;&#xFF1F;</p><p>&#x8FD9;&#x8FB9;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x628A;&apos;&#x4F60;&#x597D;&apos;&#x79FB;&#x52A8;&#x5230;border&#x4E0A;&#x5C31;&#x53EF;&#x77E5;&#x9053;&#x539F;&#x56E0;&#x4E86;&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x628A;&#x6587;&#x5B57;&#x79FB;&#x52A8;&#x8FC7;&#x53BB;&#x5462;&#xFF1F;&#x8FD9;&#x8FB9;&#x6211;&#x4EEC;&#x7528; <strong>text-indent</strong> ,&#x6837;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
  width: 200px;
  height: 200px;
  border:10px solid rgb(255, 0, 0);
  padding:15px;
  margin:12px;
  background-color: green;
  text-indent: -20px;
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">10px</span> solid <span class="hljs-built_in">rgb</span>(255, 0, 0);
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">15px</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">12px</span>;
  <span class="hljs-attribute">background-color</span>: green;
  <span class="hljs-attribute">text-indent</span>: -<span class="hljs-number">20px</span>;
}

</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZvs?w=660&amp;h=498" src="https://static.alili.tech/img/bVbhZvs?w=660&amp;h=498" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>&#x4ECE;&#x8FD0;&#x884C;&#x6548;&#x679C;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x4E86;&#xFF0C;&#x6587;&#x5B57;&#x662F;&#x5728; border&#x4E0A;&#x9762;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x6587;&#x5B57;&#x533A;&#x57DF;&#xFF08;&#x5185;&#x8054;&#x5143;&#x7D20;&#xFF09;&#x662F;&#x66F4;&#x9760;&#x8FD1;&#x7528;&#x6237;&#x7684;</strong></p><p>&#x90A3;&#x5982;&#x679C;div &#x91CC;&#x9762;&#x8FD8;&#x6709;&#x4E00;&#x4E2A; div &#x5462;&#xFF1F;&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // html
  &lt;div class=&quot;parent&quot;&gt;
    &#x4F60;&#x597D;&#xFF0C;CSS&#x4E16;&#x754C;
    &lt;div class=&quot;child&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-comment">// html</span>
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;
    &#x4F60;&#x597D;&#xFF0C;CSS&#x4E16;&#x754C;
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;child&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/div&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // css
   .parent{
      width: 200px;
      height: 200px;
      border:10px solid rgb(255, 0, 0);
      padding:15px;
      margin:12px;
      background-color: green;
      text-indent: -20px;
    }
    .child{
      height: 20px;
      background:purple;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>    <span class="hljs-comment">// css</span>
   <span class="hljs-selector-class">.parent</span>{
      <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">border</span>:<span class="hljs-number">10px</span> solid rgb(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
      <span class="hljs-attribute">padding</span>:<span class="hljs-number">15px</span>;
      <span class="hljs-attribute">margin</span>:<span class="hljs-number">12px</span>;
      <span class="hljs-attribute">background-color</span>: green;
      <span class="hljs-attribute">text-indent</span>: -<span class="hljs-number">20px</span>;
    }
    <span class="hljs-selector-class">.child</span>{
      <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
      <span class="hljs-attribute">background</span>:purple;
    }</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZv6?w=670&amp;h=572" src="https://static.alili.tech/img/bVbhZv6?w=670&amp;h=572" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x53C8;&#x5F15;&#x53D1;&#x4E86;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x7D2B;&#x8272;&#x533A;&#x57DF;&#x662F;&#x6BD4;&#x6587;&#x5B57;&#x533A;&#x57DF;&#x9AD8;&#x8FD8;&#x662F;&#x76F8;&#x53CD;&#x5462;&#xFF1F;</p><p>&#x90A3;&#x600E;&#x4E48;&#x9A8C;&#x8BC1;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x4E86;&#xFF1F;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x628A;&#x91CC;&#x9762;&#x7684; div &#x5F80;&#x4E0A;&#x79FB;&#x52A8;&#x5C31;&#x884C;&#xFF0C;<strong>&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x4E0D;&#x80FD;&#x7528; position&#x56E0;&#x4E3A;&#x4E3A;&#x6539;&#x53D8;&#x5C42;&#x7EA7;&#x7ED3;&#x6784;</strong>&#xFF0C; &#x6211;&#x4EEC;&#x53EA;&#x8981;&#x7528; margin-top &#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    margin-top:-20px;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code style="word-break:break-word;white-space:initial">    <span class="hljs-attribute">margin-top</span>:-<span class="hljs-number">20px</span>;</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZwp?w=652&amp;h=534" src="https://static.alili.tech/img/bVbhZwp?w=652&amp;h=534" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x6587;&#x5B57;&#x533A;&#x57DF;&#x662F;&#x5728;&#x4E0A;&#x9762;&#x7684;&#x3002;&#x8FD9;&#x8FB9;&#x5C31;&#x5F97;&#x51FA;&#x4E00;&#x4E2A;&#x7ED3;&#x8BBA;&#xFF1A;</p><blockquote><strong>&#x5982;&#x679C;div&#x91CC;&#x9762;&#x6709;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#xFF0C;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x662F;&#x76D6;&#x4E0D;&#x4F4F;&#x5185;&#x8054;&#x5143;&#x7D20;&#x7684;&#xFF0C;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#x5185;&#x8054;&#x5143;&#x7D20;&#x79BB;&#x7528;&#x6237;&#x66F4;&#x8FD1;</strong></blockquote><p>&#x90A3;&#x5982;&#x679C;&#x91CC;&#x9762;div&#x6709;&#x6587;&#x5B57;&#x5462;&#xFF1F; &#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x9700;&#x8981; &#x5199;&#x51E0;&#x4E2A;&#x5B57;&#xFF0C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZxg?w=664&amp;h=568" src="https://static.alili.tech/img/bVbhZxg?w=664&amp;h=568" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0; &#x5B50;&#x5143;&#x7D20;&#x7684;&#x6587;&#x5B57;&#x533A;&#x57DF;&#x4F1A;&#x76D6;&#x4F4F;&#x7236;&#x5143;&#x7D20;&#x7684;&#x6587;&#x5B57;&#x533A;&#x57DF;&#xFF0C;<strong>&#x6240;&#x4EE5;&#x8FD9;&#x8FB9;&#x53C8;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x7684;&#x7ED3;&#x8BBA;&#xFF1A;&#x6587;&#x5B57;&#x533A;&#x57DF;&#x540E;&#x51FA;&#x73B0;&#x7684;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x51FA;&#x73B0;&#x7684;&#x3002;</strong></p><h4>&#x6D6E;&#x52A8;&#x5143;&#x7D20;</h4><p>&#x6765;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // html
  &lt;div class=&quot;parent&quot;&gt;
      &#x4F60;&#x597D;
    &lt;div class=&quot;float&quot;&gt;

    &lt;/div&gt;
  &lt;/div&gt;
  // css
.parent{
  width: 200px;
  height: 200px;
  border:10px solid rgb(255, 0, 0);
  padding:15px;
  margin:12px;
  background-color: green;
  color: aliceblue;
}
.float{
  height: 40px;
  width: 40px;
  background:purple;
  float: left;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>  <span class="hljs-comment">// html</span>
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;parent&quot;</span>&gt;
      &#x4F60;&#x597D;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;float&quot;</span>&gt;

    &lt;/div&gt;
  &lt;/div&gt;
  <span class="hljs-comment">// css</span>
.parent{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">10px</span> solid rgb(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">15px</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">12px</span>;
  <span class="hljs-attribute">background-color</span>: green;
  <span class="hljs-attribute">color</span>: aliceblue;
}
.<span class="hljs-attribute">float</span>{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">background</span>:purple;
  <span class="hljs-attribute">float</span>: left;
}
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZye?w=654&amp;h=566" src="https://static.alili.tech/img/bVbhZye?w=654&amp;h=566" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5C31;&#x4E0D;&#x89E3;&#x91CA;&#x4E86;&#xFF0C;&#x4F60;&#x4EEC;&#x80AF;&#x5B9A;&#x90FD; &#x77E5;&#x9053; &#xFF1F;&#x6309;&#x4E0A;&#x9762;&#x7684;&#x5957;&#x8DEF;&#xFF0C;&#x8FD9;&#x91CC;&#x540C;&#x6837;&#x8FD8;&#x662F;&#x90A3;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x4F60;&#x597D;&#x5728;&#x4E0A;&#x9762;&#x5462;&#x8FD8;&#x662F;&#x8FD9;&#x4E2A; float &#x5143;&#x7D20;&#x5462;&#xFF1F;</p><p>&#x8981;&#x9A8C;&#x8BC1;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x540C;&#x6837;&#x4F7F;&#x7528; text-indent &#x90A3;&#x6587;&#x5B57;&#x5411;&#x5DE6;&#x52A8;&#x70B9;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x76F4;&#x63A5; &#x4E0A;&#x6548;&#x679C;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZyJ?w=592&amp;h=552" src="https://static.alili.tech/img/bVbhZyJ?w=592&amp;h=552" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4ECE;&#x6548;&#x679C;&#x56FE;&#xFF0C;<strong>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x51FA; &#x6587;&#x5B57;&#x533A;&#x57DF;&#x662F;&#x5728; &#x6D6E;&#x4E91;&#x5143;&#x7D20;&#x4E0A;&#x9762;&#x7684;&#x3002;</strong></p><p>&#x90A3;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x662F;&#x5728; &#x6587;&#x5B57;&#x533A;&#x57DF;&#x4E0E;&#x5185;&#x90E8;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x5462;&#xFF0C;&#x8FD8;&#x662F;&#x5185;&#x90E8;&#x5757;&#x7EA7;&#x4E0E;border&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x5462;&#xFF1F;&#x6362;&#x53E5;&#x8BDD;&#x8BF4;&#x5C31;&#x662F; &#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E0E;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x54EA;&#x4E2A;&#x79BB;&#x7528;&#x6237;&#x66F4;&#x8FD1;&#xFF1F;</p><p>&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x5728;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x5199;&#x4E00;&#x4E2A; child:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   // hmtl
  &lt;div class=&quot;parent&quot;&gt;
      &#x4F60;&#x597D;
    &lt;div class=&quot;float&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;child&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;

  // css
  
 .child{
  height: 20px;
  background: black;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>   <span class="hljs-comment">// hmtl</span>
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;parent&quot;</span>&gt;
      &#x4F60;&#x597D;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;float&quot;</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;child&quot;</span>&gt;&lt;/div&gt;
  &lt;/div&gt;

  <span class="hljs-comment">// css</span>
  
 .child{
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">background</span>: black;
}
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZzi?w=592&amp;h=526" src="https://static.alili.tech/img/bVbhZzi?w=592&amp;h=526" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x4E0A;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6D6E;&#x4E91;&#x5143;&#x7D20;&#x76D6;&#x4F4F;&#x4E86; child&#x5143;&#x7D20;&#xFF0C;<strong>&#x8BF4;&#x660E;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x5C42;&#x7EA7;&#x662F;&#x6BD4;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x9AD8;&#x7684;</strong>&#x3002;&#x5373;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x662F;&#x5728;&#x6587;&#x5B57;&#x533A;&#x57DF;&#x4E0E;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x7684;&#x3002;</p><p>&#x90A3;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x91CC;&#x9762;&#x7684;&#x6587;&#x5B57;&#x4E0E;&#x5916;&#x9762;&#x7684;&#x6587;&#x5B57;&#x662F;&#x600E;&#x4E48;&#x6837;&#x7684;&#x5462;&#xFF1F;&#x8FD9;&#x8FB9;&#x6211;&#x76F4;&#x63A5;&#x5728;&#x6D6E;&#x52A8;&#x91CC;&#x9762;&#x52A0;&#x4E86; float&#x6587;&#x5B57;&#xFF0C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZAi?w=642&amp;h=528" src="https://static.alili.tech/img/bVbhZAi?w=642&amp;h=528" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0; &#x6D6E;&#x52A8;&#x91CC;&#x9762;&#x7684;&#x6587;&#x5B57;&#x662F;&#x76D6;&#x4E0D;&#x4F4F;&#x6D6E;&#x52A8;&#x5916;&#x9762;&#x6587;&#x5B57;&#x7684;&#x3002;</p><h4>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;</h4><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x6211;&#x4EEC;&#x589E;&#x52A0;&#x4E00;&#x4E2A; relative &#x5143;&#x7D20;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // htmk
  &lt;div class=&quot;parent&quot;&gt;
      &#x4F60;&#x597D;
    &lt;div class=&quot;float&quot;&gt;floatt&lt;/div&gt;
    &lt;div class=&quot;child&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;relative&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
  
 // css
.relative{
  width: 100px;
  height: 100px;
  background: pink;
  margin-top: -15px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>  <span class="hljs-comment">// htmk</span>
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;parent&quot;</span>&gt;
      &#x4F60;&#x597D;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;float&quot;</span>&gt;floatt&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;child&quot;</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;relative&quot;</span>&gt;&lt;/div&gt;
  &lt;/div&gt;
  
 <span class="hljs-comment">// css</span>
.relative{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: pink;
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">15px</span>;
}
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZBJ?w=684&amp;h=554" src="https://static.alili.tech/img/bVbhZBJ?w=684&amp;h=554" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x7ED9;&#x7C7B;relative &#x52A0;&#x4E0A;&#x4E00;&#x4E2A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position:relative;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">position</span>:relative;
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZBQ?w=588&amp;h=564" src="https://static.alili.tech/img/bVbhZBQ?w=588&amp;h=564" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0; relative &#x5143;&#x7D20;&#x76D6;&#x4F4F;&#x4E86;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#xFF0C;&#x8FD9;&#x8BF4;&#x660E; &#x7ED9;&#x5143;&#x7D20;&#x52A0;&#x4E00;&#x4E2A; relative &#x5B9A;&#x4F4D;&#x4F1A;&#x589E;&#x52A0;&#x5BF9;&#x5E94;&#x7684;&#x4E00;&#x4E2A;&#x5C42;&#x7EA7;&#x3002;&#x68C0;&#x67E5; relative &#x5143;&#x7D20;&#xFF0C;&#x4F1A;&#x770B;&#x5230;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZDN?w=678&amp;h=162" src="https://static.alili.tech/img/bVbhZDN?w=678&amp;h=162" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x52A0;&#x4E86; position:relative&#x5B9A;&#x4F4D;&#x4F1A;&#x591A;&#x4E86;&#x4E00;&#x4E2A; z-index:auto &#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F60;&#x5B9A;&#x4F4D;&#xFF0C;&#x90FD;&#x662F;&#x6309;z-index&#x6765;&#x8BA1;&#x7B97;&#x7684;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7ED9;&#x6CA1;&#x6709;&#x5B9A;&#x4F4D;&#x7684; child&#x5143;&#x7D20;&#x52A0;&#x4E0A;&#x4E00;&#x4E2A;z-index:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;div class=&quot;parent&quot;&gt;
      &#x4F60;&#x597D;
    &lt;div class=&quot;float&quot;&gt;floatt&lt;/div&gt;
    &lt;div class=&quot;child&quot; style=&quot;z-index:99999&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;relative&quot;&gt;&lt;/div&gt;
  &lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>  &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;parent&quot;</span>&gt;
      &#x4F60;&#x597D;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;float&quot;</span>&gt;floatt&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;child&quot;</span> style=<span class="hljs-string">&quot;z-index:99999&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;relative&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZEt?w=768&amp;h=530" src="https://static.alili.tech/img/bVbhZEt?w=768&amp;h=530" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0; child &#x5143;&#x7D20;&#x5E76;&#x6CA1;&#x6709;&#x76D6;&#x4F4F; relative &#x5143;&#x7D20;&#xFF01;</p><blockquote>&#x8FD9;&#x8FB9;&#x76F4;&#x63A5; &#x7ED9;&#x4E86;&#x7ED3;&#x8BBA;&#x4E86;&#xFF1A;z-index &#x53EA;&#x6709;&#x5728; position:relative|absolute<br>&#x624D;&#x6709;&#x6548;&#x679C;&#xFF0C;&#x5982;&#x679C;&#x90FD;&#x662F;relative&#xFF0C;z-index&#x4E00;&#x6837;&#xFF0C;&#x90A3;&#x4E48;&#x540E;&#x9762;&#x4F1A;&#x76D6;&#x524D;&#x9762;&#xFF0C;z-index&#x503C;&#x5927;&#x7684;&#x4F1A;&#x76D6;&#x4F4F;&#x5C0F;&#x7684;&#x3002;</blockquote><p>&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x5728;&#x539F;&#x6709;&#x4E0A;&#x52A0;&#x4E00;&#x4E2A;relative2&#xFF0C;&#x6837;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".relative2{
  width: 100px; 
  height: 150px;
  background: gold;
  margin-top: -15px;
  position: relative;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.relative2</span>{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; 
  <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
  <span class="hljs-attribute">background</span>: gold;
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">15px</span>;
  <span class="hljs-attribute">position</span>: relative;
}</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhZGo?w=658&amp;h=604" src="https://static.alili.tech/img/bVbhZGo?w=658&amp;h=604" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6B64;&#x65F6;&#x7ED9; relative2 &#x52A0;&#x4E0A;&#x4E00;&#x4E2A; z-index:-1,&#x5728;&#x770B;</p><p><span class="img-wrap"><img data-src="/img/bVbhZGG?w=758&amp;h=622" src="https://static.alili.tech/img/bVbhZGG?w=758&amp;h=622" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x53C8;&#x5F97;&#x51FA;&#x4E00;&#x4E2A;&#x7ED3;&#x8BBA;&#xFF1A;z-index&#x4E3A;&#x8D1F;&#x503C;&#x65F6;&#xFF0C;&#x662F;&#x4F4D;&#x4E8E; background&#x4E0B;&#x9762;&#x7684;</strong></p><p>&#x8FD9;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x7ED9;.parent&#x5143;&#x7D20;&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  position: relative;
  z-index: 0;    
  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">0</span>;    
  </code></pre><p>&#x8FD9;&#x65F6;&#x7684;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh1B0?w=698&amp;h=644" src="https://static.alili.tech/img/bVbh1B0?w=698&amp;h=644" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x65F6;&#x5947;&#x602A;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x51FA;&#x73B0;&#x4E86;&#xFF0C;z-index: -1 &#x7684;&#x8DD1;&#x5230;&#x4E0A;&#x9762;&#x6765;&#x4E86;&#x3002;</p><p>MDN&#x4E0A;&#x6709;&#x5BF9;&#x4EC0;&#x4E48;&#x5806;&#x53E0;&#x7ED9;&#x51FA;&#x4E86;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#xFF0C;&#x5982;&#x4E0B; &#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh26j?w=1616&amp;h=1042" src="https://static.alili.tech/img/bVbh26j?w=1616&amp;h=1042" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x7ED9;.parent&#x5143;&#x7D20;&#x8BBE;&#x7F6E;z-index&#xFF1A;0 &#xFF0C;&#x6839;&#x636E;MDN&#x8BF4;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF; &#x521B;&#x9020;&#x4E00;&#x4E2A;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587; &#x3002;</p><p>&#x90A3;&#x4EC0;&#x4E48;&#x662F;&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#xFF1F;&#x4E0B;&#x9762;&#x662F;&#x5F20;&#x946B;&#x65ED;&#x4E00;&#x6BB5;&#x539F;&#x6587;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh26C?w=1626&amp;h=348" src="https://static.alili.tech/img/bVbh26C?w=1626&amp;h=348" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5176;&#x5B9E;&#x8FD9;&#x8DDF;&#x7F8E;&#x56FD;&#x4E00;&#x4E2A;&#x5927;&#x6CD5;&#x5B98;&#x8BF4;&#x7684;&#x4E00;&#x53E5;&#x8BDD;&#x5F88;&#x50CF;&#xFF1A;<strong>&#x6211;&#x4E0D;&#x77E5;&#x9053;&#x4EC0;&#x4E48;&#x8272;&#x60C5;&#xFF0C;&#x4F46;&#x5F53;&#x6211;&#x770B;&#x5230;&#x5B83;&#x662F;&#x6211;&#x5C31;&#x77E5;&#x9053;&#x4EC0;&#x4E48;&#x662F;&#x8272;&#x60C5;&#x3002;</strong></p><p>CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x4E5F;&#x662F;&#x7C7B;&#x4F3C;&#x7684;&#x9053;&#x7406;&#xFF0C;&#x4F60;&#x5F88;&#x96BE;&#x8BF4;&#x51FA;&#x4EC0;&#x4E48;&#x662F;CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x4F46;&#x53EA;&#x8981;&#x5B83;&#x6EE1;&#x8DB3;MDN&#x5217;&#x51FA;&#x7684;&#x51E0;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x5B83;&#x5C31;&#x662F;CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x3002;</p><h2 id="articleHeader1">CSS&#x5806;&#x53E0;&#x5C42;&#x53E0;&#x987A;&#x5E8F;</h2><p>CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x662F;&#x6709;&#x4E00;&#x4E2A;&#x5782;&#x76F4;&#x5C4F;&#x5E55;&#x4E0A;&#x6709;&#x4E00;&#x4E2A;&#x4E0A;&#x5173;&#x7CFB;&#x7684;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x5173;&#x7CFB;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh26Z?w=1268&amp;h=1112" src="https://static.alili.tech/img/bVbh26Z?w=1268&amp;h=1112" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x6240;&#x4EE5;&#x8FD9;&#x5C31;&#x89E3;&#x91CA;&#x4E3A;&#x4EC0;&#x4E48;z-index&#x4E3A;&#x8D1F;&#x503C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x4F1A;&#x5728; background&#x4E0A;&#x9762;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC; z-index:0 &#x65F6;&#x5C31;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x3002;</p><h2 id="articleHeader2">CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x4F5C;&#x7528;</h2><p>&#x4E0B;&#x9762;&#x7ED9;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7684;&#x5185;&#x5BB9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // html
  &lt;div class=&quot;parent&quot;&gt;
    &lt;div class=&quot;a relative&quot;&gt;a
      &lt;div class=&quot;a1&quot;&gt;a1&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;b relative&quot;&gt;b
      &lt;div class=&quot;b1&quot;&gt;b1&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  // css
 .parent{
  width: 200px;
  height: 200px;
  border:10px solid rgb(255, 0, 0);
  padding:15px;
  margin:12px;
  background-color: green;
}
.relative{
  width:100px;
  height:100px;
  background: orange;
  position: relative;
  border:1px solid red;
}
.a1{
  position: relative;
  background:green;
}
.b1{
  position: relative;
  background:red;
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>  <span class="hljs-comment">// html</span>
  &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;parent&quot;</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;a relative&quot;</span>&gt;<span class="hljs-selector-tag">a</span>
      &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;a1&quot;</span>&gt;a1&lt;/div&gt;
    &lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;b relative&quot;</span>&gt;<span class="hljs-selector-tag">b</span>
      &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">&quot;b1&quot;</span>&gt;b1&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  <span class="hljs-comment">// css</span>
 .parent{
  <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">10px</span> solid rgb(<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">15px</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">12px</span>;
  <span class="hljs-attribute">background-color</span>: green;
}
.relative{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
  <span class="hljs-attribute">background</span>: orange;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid red;
}
.a1{
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">background</span>:green;
}
.b1{
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">background</span>:red;
}

</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh28k?w=566&amp;h=546" src="https://static.alili.tech/img/bVbh28k?w=566&amp;h=546" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x5728;b1&#x5728;&#x6DFB;&#x52A0;&#x4EE5;&#x4E0B;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   margin-top: -90px;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>   <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">90px</span>;
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbh28m?w=556&amp;h=568" src="https://static.alili.tech/img/bVbh28m?w=556&amp;h=568" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>b1&#x4F1A;&#x76D6;&#x4F4F;a1&#xFF0C;&#x8FD9;&#x4E2A;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x77E5;&#x9053;&#x662F;&#x4EC0;&#x4E48;&#x539F;&#x56E0;&#x4E86;&#x5427;&#xFF1F;&#x56E0;&#x4E3A;a1 b1&#x90FD;&#x662F;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x76D6;&#x4F4F;&#x524D;&#x9762;&#x7684;&#xFF0C;&#x6CA1;&#x6BDB;&#x75C5;&#xFF01;</p><p><strong>&#x90A3;&#x4E48; a1 &#x548C; b1 &#x7684;CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x662F;&#x8C01;&#xFF1F;</strong></p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;MDN&#x7ED9;&#x51FA;&#x7684;&#x7B2C;&#x4E00;&#x53E5;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh28K?w=1328&amp;h=396" src="https://static.alili.tech/img/bVbh28K?w=1328&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x6839;&#x5143;&#x7D20;</strong>&#xFF0C;&#x6240;&#x4EE5;a1 &#x548C; b1&#x7684;CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x5C31;&#x662F;Html</p><p>&#x63A5;&#x7740;&#x7ED9;a1&#x4EE5;&#x4E0B;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   z-index: 2;
   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs n1ql"><code>   z-<span class="hljs-keyword">index</span>: <span class="hljs-number">2</span>;
   </code></pre><p>&#x63A5;&#x7740;&#x7ED9;b1&#x4EE5;&#x4E0B;&#x6837;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="z-index: 0;    


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code><span class="hljs-attribute">z-index</span>: 0;    

<span class="undefined">
</span></code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh29c?w=658&amp;h=580" src="https://static.alili.tech/img/bVbh29c?w=658&amp;h=580" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>a1&#x8DD1;&#x5230;b1&#x4E0A;&#x9762;&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x56E0;&#x4E3A; a1 &#x7684;z-index:2 &#x6BD4; b1&#x7684;z-index:0 &#x5728;&#xFF0C;&#x6240;&#x4EE5;a1&#x5728;&#x4E0A;&#x9762;&#x3002;</p><h4><strong>&#x73B0;&#x5728;&#x6709;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;a1&#x662F;&#x6C38;&#x8FDC;&#x76D6;&#x4F4F;b1&#x5417;&#xFF1F;</strong></h4><p>&#x8FD9;&#x8FB9;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x8BF4;&#xFF0C;a1 &#x7684;z-index:2&#x6BD4; b1&#x7684; z-index:0 &#x6C38;&#x8FDC;&#x90FD;&#x5927;&#xFF0C;&#x5F53;&#x7136;&#x4F1A;&#x76D6;&#x4F4F;b1&#x5440;&#xFF01;<strong>&#x662F;&#x8FD9;&#x6837;&#x5417;&#xFF1F;</strong>&#x6211;&#x4EEC;&#x8BD5;&#x7740;&#x6539;&#x53D8;&#x4E00;&#x4E0B;CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5206;&#x522B;&#x7ED9;a &#x548C; b&#x5404;&#x505A;&#x4E00;&#x4E2A;CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#xFF1A; &#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".a{
  position: relative;
  z-index: 1;
}
.b{
  position: relative;
  z-index: 1;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.a</span>{
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.b</span>{
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
}
</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbh3as?w=650&amp;h=534" src="https://static.alili.tech/img/bVbh3as?w=650&amp;h=534" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5148;&#x5206;&#x6790;a &#x548C; b&#x5B83;&#x4EEC;&#x662F;&#x8C01;&#x8986;&#x76D6;&#x8C01;&#xFF0C;&#x56E0;&#x4E3A; &#x4E24;&#x4E2A;&#x5B9A;&#x4F4D;&#x548C;z-index&#x90FD;&#x4E00;&#x6837;&#x6240;&#x4EE5; b &#x4F1A;&#x8986;&#x76D6; a&#x3002;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x73B0;&#x8C61;&#x6709;&#x6CA1;&#x6709;&#x53D1;&#x73B0;&#xFF0C; b1 &#x76D6;&#x4F4F;&#x4E86; a1? &#x660E;&#x660E; a1 &#x7684; z-index &#x5927;&#x4E8E; b1,&#x8FD9;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#x4E3A;&#x4EC0;&#x4E48;&#x5C0F;&#x7684;&#x4F1A;&#x76D6;&#x4F4F;&#x5927;&#x7684;&#xFF1F;&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;</p><p>&#x56E0;&#x4E3A; b &#x6BD4; a &#x9AD8;&#x4E00;&#x70B9;&#xFF0C;&#x6240;&#x4EE5; b &#x91CC;&#x9762;&#x7684;&#x5185;&#x5BB9;&#x90FD;&#x4F1A;&#x6BD4; a &#x9AD8;&#x4E00;&#x70B9;&#x3002;&#x8FD9;&#x5C31;&#x662F; CSS&#x5806;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x4E00;&#x4E2A;&#x7279;&#x6027;&#x3002;</p><p>&#x6BD4;&#x5982;&#x8BF4;&#x963F;&#x91CC;&#x5DF4;&#x5DF4;&#x6709;&#x4E00;&#x4E2A;&#x5947;&#x602A;&#x7684;&#x90E8;&#x95E8;&#x53EB;&#x505A;&#x653F;&#x59D4;&#xFF0C;&#x662F;&#x7531;&#x9A6C;&#x4E91;&#x7B49;&#x4E00;&#x4E9B;&#x521B;&#x59CB;&#x4EBA;&#x7EC4;&#x6210;&#x7684;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x90E8;&#x95E8;&#x91CC;&#x9762;&#xFF0C;&#x4F60;&#x662F;&#x4E0D;&#x662F;&#x90FD;&#x6BD4;&#x5176;&#x5B83;&#x90E8;&#x95E8;&#x8981;&#x9AD8;&#x7EA7;&#x70B9;&#x3002;</p><p><strong>&#x6240;&#x4EE5; b1 &#x867D;&#x7136;&#x5728; b &#x91CC;&#x9762;&#x7B49;&#x7EA7;&#x4E3A;0&#xFF0C;&#x5728; b &#x662F;&#x9AD8;&#x7EA7;&#x7684;&#x4E00;&#x4E2A;&#x90E8;&#x95E8;&#xFF0C;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x538B;&#x8FC7;&#x4F60; a &#x8FD9;&#x4E2A;&#x90E8;&#x95E8;&#x91CC;&#x9762;&#x7684; 2 &#x7EA7;&#x7684;&#x4EBA;&#x3002;</strong></p><p>&#x4ECA;&#x5929;&#x8BF4;&#x8FD9;&#x4E9B;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x592A;&#x660E;&#x767D;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x4EE5;&#x4E0B;&#x7684;&#x5185;&#x5BB9; &#xFF1A;</p><p><a href="https://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/" rel="nofollow noreferrer" target="_blank">&#x5F20;&#x946B;&#x65ED;&#x7684;&#x6DF1;&#x5165;&#x7406;&#x89E3;CSS&#x4E2D;&#x7684;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x548C;&#x5C42;&#x53E0;&#x987A;&#x5E8F;</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context" rel="nofollow noreferrer" target="_blank">MDN &#x6587;&#x6863;</a></p><p><strong>&#x66F4;&#x591A;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x5F88;&#x5C11;&#x4EBA;&#x559C;&#x6B22;&#x7684;&#x4E00;&#x4E2A;&#x7B28;&#x7B28;&#x7684;&#x4EBA;</strong></p><p><strong>&#x4E00;&#x4E2A;&#x7B28;&#x7B28;&#x7684;&#x7801;&#x519C;&#xFF0C;&#x6211;&#x7684;&#x4E16;&#x754C;&#x53EA;&#x80FD;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbg32a?w=258&amp;h=258" src="https://static.alili.tech/img/bVbg32a?w=258&amp;h=258" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
图解一下啥是CSS堆叠上下文，啥是CSS堆叠层叠顺序，让你对css的疑惑少一点?

## 原文链接
[https://segmentfault.com/a/1190000016656270](https://segmentfault.com/a/1190000016656270)


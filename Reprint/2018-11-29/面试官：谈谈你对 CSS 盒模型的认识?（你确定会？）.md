---
title: '面试官：谈谈你对 CSS 盒模型的认识?（你确定会？）' 
date: 2018-11-29 2:30:09
hidden: true
slug: hyjxoxh35he
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x9898;&#x76EE;&#xFF1A;&#x8C08;&#x8C08;&#x4F60;&#x5BF9; CSS &#x76D2;&#x6A21;&#x578B;&#x7684;&#x8BA4;&#x8BC6;</blockquote><p>&#x6D89;&#x53CA;&#x77E5;&#x8BC6;&#x70B9;(&#x5C42;&#x5C42;&#x9012;&#x8FDB;):</p><ol><li>&#x57FA;&#x672C;&#x6982;&#x5FF5;&#xFF1A;&#x6807;&#x51C6;&#x6A21;&#x578B;+ IE&#x6A21;&#x578B;(&#x533A;&#x522B;)</li><li>CSS&#x5982;&#x4F55;&#x8BBE;&#x7F6E;&#x8FD9;&#x4E24;&#x79CD;&#x6A21;&#x578B;</li><li>JS&#x5982;&#x4F55;&#x8BBE;&#x7F6E;&#x83B7;&#x53D6;&#x76D2;&#x5B50;&#x6A21;&#x578B;&#x5BF9;&#x5E94;&#x7684;&#x5BBD;&#x548C;&#x9AD8;</li><li>&#x5B9E;&#x4F8B;&#x9898;(&#x6839;&#x636E;&#x76D2;&#x6A21;&#x578B;&#x89E3;&#x91CA;&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;)</li><li>BFC(&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;&#x89E3;&#x51B3;&#x65B9;&#x6848;)</li></ol><h2 id="articleHeader0">CSS&#x76D2;&#x6A21;&#x578B;</h2><h4>1. &#x57FA;&#x672C;&#x6982;&#x5FF5;&#xFF1A;&#x6807;&#x51C6;&#x6A21;&#x578B;+ IE&#x6A21;&#x578B;</h4><p><span class="img-wrap"><img data-src="/img/bVbb5zA?w=746&amp;h=455" src="https://static.alili.tech/img/bVbb5zA?w=746&amp;h=455" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x4ECE;&#x4E0A;&#x56FE;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6807;&#x51C6; W3C &#x76D2;&#x5B50;&#x6A21;&#x578B;&#x7684;&#x8303;&#x56F4;&#x5305;&#x62EC; margin&#x3001;border&#x3001;padding&#x3001;content&#xFF0C;&#x5E76;&#x4E14; content &#x90E8;&#x5206;&#x4E0D;&#x5305;&#x542B;&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x3002;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbb5zB?w=791&amp;h=462" src="https://static.alili.tech/img/bVbb5zB?w=791&amp;h=462" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x4ECE;&#x4E0A;&#x56FE;&#x53EF;&#x4EE5;&#x770B;&#x5230; IE &#x76D2;&#x5B50;&#x6A21;&#x578B;&#x7684;&#x8303;&#x56F4;&#x4E5F;&#x5305;&#x62EC; margin&#x3001;border&#x3001;padding&#x3001;content&#xFF0C;&#x548C;&#x6807;&#x51C6; W3C &#x76D2;&#x5B50;&#x6A21;&#x578B;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF1A;IE &#x76D2;&#x5B50;&#x6A21;&#x578B;&#x7684; content &#x90E8;&#x5206;&#x5305;&#x542B;&#x4E86; border &#x548C; pading&#x3002;</p><h4>2. CSS&#x5982;&#x4F55;&#x8BBE;&#x7F6E;&#x8FD9;&#x4E24;&#x79CD;&#x6A21;&#x578B;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-sizing:conent-box;
box-sizing:border-box;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-built_in">box</span>-sizing:conent-<span class="hljs-built_in">box</span>;
<span class="hljs-built_in">box</span>-sizing:<span class="hljs-built_in">border</span>-<span class="hljs-built_in">box</span>;
</code></pre><h4>3.JS&#x5982;&#x4F55;&#x8BBE;&#x7F6E;&#x83B7;&#x53D6;&#x76D2;&#x5B50;&#x6A21;&#x578B;&#x5BF9;&#x5E94;&#x7684;&#x5BBD;&#x548C;&#x9AD8;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dom.style.width/height
dom.currentStyle.width/height  (ie&#x652F;&#x6301;)
window.getComputedStyle(dom).width/height;
dom.getBoundingClientRect().width/height;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>dom<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.width</span>/<span class="hljs-attribute">height</span>
dom<span class="hljs-selector-class">.currentStyle</span><span class="hljs-selector-class">.width</span>/<span class="hljs-attribute">height</span>  (ie&#x652F;&#x6301;)
window.getComputedStyle(dom).<span class="hljs-attribute">width</span>/height;
dom.getBoundingClientRect().<span class="hljs-attribute">width</span>/height;
</code></pre><h4>4. &#x5B9E;&#x4F8B;&#x9898;(&#x6839;&#x636E;&#x76D2;&#x6A21;&#x578B;&#x89E3;&#x91CA;&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;)</h4><p><span class="img-wrap"><img data-src="/img/bVbb5Bs?w=493&amp;h=223" src="https://static.alili.tech/img/bVbb5Bs?w=493&amp;h=223" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x5982;&#x4E0A;&#x56FE;:&#x6709;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x5176;&#x4E2D;&#x5B50;&#x5143;&#x7D20;&#x9AD8;&#x5EA6;&#x4E3A;100px,&#x5B50;&#x5143;&#x7D20;&#x4E0E;&#x7236;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x8FB9;&#x8DDD;&#x4E3A; 10px,&#x6C42;&#x7236;&#x5143;&#x7D20;&#x7684;&#x5B9E;&#x9645;&#x9AD8;&#x5EA6;&#xFF1F;</p><p>&#x7B54;&#x6848;:&#x8BF4;100px &#x5BF9;&#xFF0C;&#x8BF4;110 &#x4E5F;&#x5BF9;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x634F;&#xFF1F;&#x8FD9;&#x4E2A;&#x8981;&#x770B;&#x7236;&#x5143;&#x7D20;&#x7684;&#x76D2;&#x6A21;&#x578B;&#x8981;&#x600E;&#x4E48;&#x8BBE;&#x7F6E;&#x7684;&#xFF0C;&#x4E0A;&#x4EE3;&#x7801;&#x6F14;&#x793A;&#x54AF;&#xFF0C;&#x6CE8;&#x610F;&#x770B;&#x5662;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;style&gt;
    html,*{
      padding: 0;margin: 0;
    }
    #sec{
      background: #f00;
    }
    .child{
      height: 100px;
      margin-top: 10px;
      background: yellow;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;section id=&quot;sec&quot;&gt;
    &lt;article class=&quot;child&quot;&gt;
    &lt;/article&gt;
  &lt;/section&gt;
&lt;/body&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,*{
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#sec</span>{
      <span class="hljs-attribute">background</span>: <span class="hljs-number">#f00</span>;
    }
    <span class="hljs-selector-class">.child</span>{
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
      <span class="hljs-attribute">background</span>: yellow;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;sec&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">article</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">article</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5BN?w=1009&amp;h=374" src="https://static.alili.tech/img/bVbb5BN?w=1009&amp;h=374" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x56FE;&#x8BC1;&#x660E; 100px &#x662F;&#x5BF9;&#x7684;&#x3002;</p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x7ED9;&#x5143;&#x7D20;&#x52A0;&#x4E2A; overflow:hidden,&#x7136;&#x540E;&#x5728;&#x770B;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5BZ?w=1366&amp;h=419" src="https://static.alili.tech/img/bVbb5BZ?w=1366&amp;h=419" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x8FD9;&#x65F6;&#x9AD8;&#x5EA6;&#x4E3A; 110px, &#x8FD9;&#x65F6;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x4F1A;&#x7591;&#x95EE;,&#x4E3A;&#x4EC0;&#x4E48;&#x7ED9;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A; overflow:hidden&#x4EE5;&#x540E;&#xFF0C;&#x5B83;&#x7684;&#x9AD8;&#x5EA6;&#x5C31;&#x6210; 110 &#x5462;&#xFF0C;&#x8FD9;&#x5757;&#x7684;&#x57FA;&#x672C;&#x539F;&#x7406;&#x662F;&#x5565;&#x5462;&#xFF0C;&#x548B;&#x5C31;&#x8FD9;&#x6837;&#x5462;&#xFF1F;&#x8BF4;&#x8FD9;&#x4E2A;&#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x5F15;&#x7528;&#x4E00;&#x4E2A;&#x77E5;&#x8BC6;&#x70B9;&#xFF1A;</p><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x662F;&#x7236;&#x5B50;&#x5143;&#x7D20;&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;&#xFF0C;&#x90A3;&#x4E48;&#x8FD8;&#x6709;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;&#x5C31;&#x662F;&#xFF0C;&#x4E00;&#x79CD;&#x662F;&#x5144;&#x5F1F;&#x5143;&#x7D20;&#xFF0C;&#x5C31;&#x662F;&#x4E24;&#x4E2A; div &#x6328;&#x7740;&#xFF0C;&#x6BCF;&#x4E2A;&#x90FD;&#x4E0A;&#x8FB9;&#x8DDD;&#x6216;&#x8005;&#x4E0B;&#x8FB9;&#x8DDD;&#xFF0C;&#x90A3;&#x4E48;&#x91CD;&#x53E0;&#x7684;&#x539F;&#x5219;&#x5C31;&#x662F;&#x53D6;&#x6700;&#x5927;&#x503C;&#x3002;</p><p>&#x6765;&#x56DE;&#x7B54;&#x4E0A;&#x9762;&#x95EE;&#x9898;&#xFF1A;&#x7ED9;&#x7236;&#x7EA7;&#x52A0;&#x4E86; overflow:hidden,&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7ED9;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;BFC(&#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;)&#xFF0C;&#x90A3;&#x4EC0;&#x4E48;&#x662F;BFC&#xFF0C;&#x8BF7;&#x770B;&#x4E0B;&#x4E00;&#x4E2A;&#x8BDD;&#x3002;</p><h4>5. BFC(&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;&#x89E3;&#x51B3;&#x65B9;&#x6848;)</h4><ul><li>BFC &#x7684;&#x57FA;&#x672C;&#x6982;&#x5FF5;</li><li>BFC &#x7684;&#x539F;&#x7406;</li><li>&#x5982;&#x4F55;&#x521B;&#x5EFA; BFC</li><li>BFC&#x4F7F;&#x7528;&#x573A;&#x666F;</li></ul><h4>BFC &#x7684;&#x57FA;&#x672C;&#x6982;&#x5FF5;</h4><p>Block Formatting Context, &#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x5757;&#x7EA7;&#x6E32;&#x67D3;&#x533A;&#x57DF;&#xFF0C;&#x8BE5;&#x533A;&#x57DF;&#x62E5;&#x6709;&#x4E00;&#x5957;&#x6E32;&#x67D3;&#x89C4;&#x683C;&#x6765;&#x7EA6;&#x675F;&#x5757;&#x7EA7;&#x76D2;&#x5B50;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x4E14;&#x4E0E;&#x533A;&#x57DF;&#x5916;&#x90E8;&#x65E0;&#x5173;&#x3002;</p><h4>BFC &#x7684;&#x539F;&#x7406;</h4><ol><li>BFC &#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x7684;&#x8FB9;&#x8DDD;&#x4F1A;&#x53D1;&#x751F;&#x91CD;&#x53E0;</li><li>BFC &#x7684;&#x533A;&#x57DF;&#x4E0D;&#x4F1A;&#x4E0E;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684; float &#x91CD;&#x53E0;</li><li>&#x72EC;&#x7ACB;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x5185;&#x5916;&#x5143;&#x7D20;&#x4E92;&#x4E0D;&#x5F71;&#x54CD;</li><li>&#x8BA1;&#x7B97; BFC &#x9AD8;&#x5EA6;&#xFF0C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E5F;&#x53C2;&#x4E0E;&#x8BA1;&#x7B97;</li></ol><h4>&#x5982;&#x4F55;&#x521B;&#x5EFA; BFC</h4><ul><li>float &#x4E0D;&#x4E3A;none&#x7684;&#x65F6;&#x5019;</li><li>position &#x4E0D;&#x4E3A; static &#x6216;&#x8005; relative &#x7684;&#x65F6;&#x5019;</li><li>display &#x4E0E; table &#x76F8;&#x5173;&#x7684;&#x65F6;&#x5019;</li><li>overflow &#x4E3A;auto, hidden &#x7684;&#x65F6;&#x5019;</li></ul><h4>BFC&#x4F7F;&#x7528;&#x573A;&#x666F;</h4><h5>&#x573A;&#x666F;&#x4E00;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;style&gt;
    html,*{
      padding: 0;margin: 0;
    }
    #margin{
      background: pink;
      overflow: hidden;
    }
    #margin&gt;p{
      margin: 5px auto 25px;
      background: red;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;section id=&quot;margin&quot;&gt;
    &lt;p&gt;1&lt;/p&gt;
    &lt;p&gt;2&lt;/p&gt;
    &lt;p&gt;3&lt;/p&gt;
  &lt;/section&gt;
&lt;/body&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,*{
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#margin</span>{
      <span class="hljs-attribute">background</span>: pink;
      <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-id">#margin</span>&gt;<span class="hljs-selector-tag">p</span>{
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span> auto <span class="hljs-number">25px</span>;
      <span class="hljs-attribute">background</span>: red;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;margin&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbb5EF?w=1352&amp;h=563" src="https://static.alili.tech/img/bVbb5EF?w=1352&amp;h=563" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span>]</p><p>&#x5982;&#x4E0A;&#x56FE;&#xFF0C;&#x6211;&#x4EEC;&#x7ED9;&#x6BCF;&#x4E2A;p &#x8BBE;&#x7F6E;&#x4E0A;&#x8FB9;&#x8DDD;5&#xFF0C; &#x4E0B;25 &#x7ED3;&#x679C;&#x4ECE;&#x7B2C;&#x4E8C;&#x4E2A;&#x8D77;&#x6765;&#x5B83;&#x7684;&#x4E0A;&#x8FB9;&#x8DDD;&#xFF0C;&#x4E0B;&#x8FB9;&#x8DDD;&#x90FD;&#x662F;25 &#x800C;&#x4E0D;&#x662F; 30&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;&#x95EE;&#x9898;&#xFF0C;&#x90A3;&#x5982;&#x4F55;&#x6D88;&#x9664;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5462;&#xFF1F;</p><p>&#x89E3;:&#x5C31;&#x662F;&#x7ED9;&#x5B50;&#x5143;&#x7D20;&#x52A0;&#x4E2A;&#x4E00;&#x4E2A;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#xFF0C;&#x8BA9;&#x4F60;&#x80FD;&#x5143;&#x7D20;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; BFC&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5FC?w=446&amp;h=156" src="https://static.alili.tech/img/bVbb5FC?w=446&amp;h=156" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#x5982;&#x56FE;:</p><p><span class="img-wrap"><img data-src="/img/bVbb5FE?w=1317&amp;h=226" src="https://static.alili.tech/img/bVbb5FE?w=1317&amp;h=226" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h5>&#x573A;&#x666F;&#x4E8C;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;style&gt;
    html,*{
      padding: 0;margin: 0;
    }
    #layout{
      background: red;
    }
    .left {
      width: 100px;
      height: 100px;
      background: pink;
      float:left;
    }
    .right{
      height: 110px;
      background: #ccc;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;section id=&quot;layout&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
  &lt;/section&gt;
&lt;/body&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,*{
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#layout</span>{
      <span class="hljs-attribute">background</span>: red;
    }
    <span class="hljs-selector-class">.left</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background</span>: pink;
      <span class="hljs-attribute">float</span>:left;
    }
    <span class="hljs-selector-class">.right</span>{
      <span class="hljs-attribute">height</span>: <span class="hljs-number">110px</span>;
      <span class="hljs-attribute">background</span>: <span class="hljs-number">#ccc</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;layout&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5Gh?w=1366&amp;h=284" src="https://static.alili.tech/img/bVbb5Gh?w=1366&amp;h=284" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x8FD0;&#x884C;&#x6548;&#x679C;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#xFF0C;&#x5F53;&#x53F3;&#x4FA7;&#x589E;&#x9AD8;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x4FB5;&#x5165;&#x5DE6;&#x4FA7;&#x7684;&#x5360;&#x4F4D;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;float&#x7684;&#x7279;&#x6027;&#xFF0C;&#x663E;&#x793A;&#x8FD9;&#x4E2A;&#x4E0D;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x5DE6;&#x53F3;&#x5E03;&#x5C40;&#x7684;&#x76EE;&#x7684;&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x7ED9;&#x53F3;&#x4FA7;&#x7684;&#x5143;&#x7D20;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; BFC,&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5Gw?w=396&amp;h=133" src="https://static.alili.tech/img/bVbb5Gw?w=396&amp;h=133" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5Gy?w=1366&amp;h=196" src="https://static.alili.tech/img/bVbb5Gy?w=1366&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h5>&#x573A;&#x666F;&#x4E09;&#xFF08;&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x7684;&#x539F;&#x7406;&#xFF09;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;style&gt;
    html,*{
      padding: 0;margin: 0;
    }
    #float{
      background: red;
    }
    .float{
      float: left;
      font-size: 30px;
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;section id=&quot;float&quot;&gt;
    &lt;div class=&quot;float&quot;&gt;&#x6211;&#x7684;&#x6D6E;&#x52A8;&#x7684;&#x5C0F;&#x667A;&lt;/div&gt;
  &lt;/section&gt;
&lt;/body&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">html</span>,*{
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-id">#float</span>{
      <span class="hljs-attribute">background</span>: red;
    }
    <span class="hljs-selector-class">.float</span>{
      <span class="hljs-attribute">float</span>: left;
      <span class="hljs-attribute">font-size</span>: <span class="hljs-number">30px</span>;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;float&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;float&quot;</span>&gt;</span>&#x6211;&#x7684;&#x6D6E;&#x52A8;&#x7684;&#x5C0F;&#x667A;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5Hb?w=1351&amp;h=389" src="https://static.alili.tech/img/bVbb5Hb?w=1351&amp;h=389" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x4E3A;0&#xFF0C;&#x8FD9;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x5440;&#xFF1F;</p><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A; float &#x5BFC;&#x81F4;&#x4E86;&#x5143;&#x7D20;&#x7684;&#x574D;&#x584C;&#xFF0C;&#x6240;&#x4EE5;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x4E3A;0&#xFF0C;&#x8FD9;&#x65F6;&#x6211;&#x4EEC;&#x7ED9;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; BFC&#xFF0C;&#x5C31;&#x80FD;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbb5HH?w=379&amp;h=137" src="https://static.alili.tech/img/bVbb5HH?w=379&amp;h=137" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbb5HI?w=1334&amp;h=424" src="https://static.alili.tech/img/bVbb5HI?w=1334&amp;h=424" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F; BFC&#x7684;&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x539F;&#x7406;&#x3002;</p><blockquote>&#x613F;&#x4F60;&#x6210;&#x4E3A;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;&#x8005;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
面试官：谈谈你对 CSS 盒模型的认识?（你确定会？）

## 原文链接
[https://segmentfault.com/a/1190000015235886](https://segmentfault.com/a/1190000015235886)


---
title: 【响应式布局】initial containing block、viewport以及相关尺寸
hidden: true
categories: [reprint]
slug: 3dd1c6bb
date: 2018-11-08 02:30:09
---

{{< raw >}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4FEE;&#x6539;&#x3001;&#x6574;&#x7406;&#x81EA;<a href="https://www.jianshu.com/p/fb982ea8dce3" rel="nofollow noreferrer" target="_blank">&#x6211;&#x4EE5;&#x524D;&#x5199;&#x7684;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;</a>&#x3002;</p><p>&#x5728;&#x9605;&#x8BFB;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E4B;&#x524D;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x8BBE;&#x5907;&#x50CF;&#x7D20;&#x3001;&#x903B;&#x8F91;&#x50CF;&#x7D20;&#xFF08;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#xFF09;&#x548C;CSS&#x50CF;&#x7D20;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x89C1;&#x6211;&#x7684;&#x524D;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://segmentfault.com/a/1190000011753855">&#x7406;&#x89E3;&#x8BBE;&#x5907;&#x50CF;&#x7D20;&#x3001;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x548C;css&#x50CF;&#x7D20;</a>&#x3002;</p><p>&#x5728;&#x7ECF;&#x5178;&#x6587;&#x7AE0;<a href="https://www.quirksmode.org/mobile/viewports.html" rel="nofollow noreferrer" target="_blank">A tale of two viewports</a>&#x4E2D;&#xFF0C;&#x4F5C;&#x8005;&#x5B9A;&#x4E49;&#x4E86;&#x4E24;&#x79CD;&#x89C6;&#x53E3;&#xFF1A;</p><ol><li>layout viewport &#x5305;&#x542B;&#x4E86;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5DF2;&#x7ECF;&#x8BA1;&#x7B97;&#x597D;&#x4E86;layout viewport&#x4E2D;&#x7684;&#x6240;&#x6709;&#x6837;&#x5F0F;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVus6r" src="https://static.alili.tech/img/bVus6r" alt="" title="" style="cursor:pointer;display:inline"></span></li><li><p>visual viewport &#x7528;&#x6237;&#x770B;&#x5230;&#x7684;&#x7684;<a href="https://developer.mozilla.org/en-US/docs/Glossary/viewport" rel="nofollow noreferrer" target="_blank">&#x6D4F;&#x89C8;&#x7A97;&#x53E3;</a>&#xFF08;&#x5728;CSS&#x6807;&#x51C6;&#x4E2D;&#x88AB;&#x79F0;&#x4E3A;<a href="https://www.w3.org/TR/CSS2/visuren.html#viewport" rel="nofollow noreferrer" target="_blank">viewport</a>&#xFF09;&#x3002;&#x5982;&#x679C;&#x9875;&#x9762;&#x5185;&#x5BB9;&#x6EA2;&#x51FA;&#x4E86;visual viewport&#xFF0C;&#x7528;&#x6237;&#x9700;&#x8981;&#x79FB;&#x52A8;visual viewport&#xFF08;&#x6EDA;&#x52A8;&#xFF09;&#x624D;&#x80FD;&#x770B;&#x5B8C;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x3002;visual viewport&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x5C4F;&#x5E55;&#x4E0A;&#x7684;&#x4E00;&#x4E2A;&#x201C;&#x7A97;&#x53E3;&#x201D;&#xFF0C;&#x7528;&#x6237;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x7A97;&#x53E3;&#x6765;&#x89C2;&#x5BDF;&#x9875;&#x9762;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbg46k?w=380&amp;h=519" src="https://static.alili.tech/img/bVbg46k?w=380&amp;h=519" alt="" title="" style="cursor:pointer;display:inline"></span></p><blockquote>&#x6EA2;&#x51FA;&#x3001;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x6211;&#x603B;&#x7ED3;&#x5728;&#x4E86;&#x53E6;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#xFF1A;<a href="https://segmentfault.com/a/1190000016431062">css&#x6EA2;&#x51FA;&#x673A;&#x5236;&#x63A2;&#x7A76;</a>&#x3002;</blockquote></li></ol><p>&#x5728;&#x8BA8;&#x8BBA;layout viewport&#x3001;visual viewport&#x7684;&#x5C3A;&#x5BF8;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;<strong>&#x4F7F;&#x7528;CSS&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;</strong>&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x3002;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5173;&#x5FC3;&#x7684;&#x662F;&#x5B83;&#x4EEC;<strong>&#x80FD;&#x5BB9;&#x7EB3;&#x591A;&#x5927;&#x7684;&#x5143;&#x7D20;&#x3001;&#x591A;&#x5C11;&#x4E2A;&#x5143;&#x7D20;</strong>&#xFF0C;&#x8FD9;&#x4E9B;&#x5143;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#x90FD;&#x662F;&#x901A;&#x8FC7;CSS&#x6765;&#x5B9A;&#x4E49;&#x7684;&#x3002;</p><p>&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;<a href="https://www.w3.org/TR/CSS2/" rel="nofollow noreferrer" target="_blank">CSS2.1&#x6807;&#x51C6;</a>&#xFF08;&#x4E3B;&#x8981;&#x662F;8&#x3001;9&#x3001;10&#x3001;11&#x7AE0;&#xFF09;&#x51FA;&#x53D1;&#xFF0C;&#x66F4;&#x52A0;&#x89C4;&#x8303;&#x5730;&#x8BA8;&#x8BBA;&#x8FD9;&#x4E9B;&#x5185;&#x5BB9;&#x3002;</p><h1 id="articleHeader1">initial containing block&#xFF08;layout viewport&#xFF09;&#x4E0E; visual viewport</h1><p>&#x9996;&#x5148;&#x9700;&#x8981;&#x5148;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;containing block&#x3002;containing block&#x5F71;&#x54CD;&#x7740;&#x5176;&#x4E2D;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x548C;&#x5B9A;&#x4F4D;&#x3002;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;position:absolute&#x7684;&#x5143;&#x7D20;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x3010;&#x6700;&#x8FD1;&#x5DF2;&#x5B9A;&#x4F4D;&#x7956;&#x5148;&#x3011;&#x6765;&#x5B9A;&#x4F4D;&#x7684;&#xFF0C;&#x5176;&#x80CC;&#x540E;&#x7684;&#x539F;&#x56E0;&#x662F;&#xFF1A;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x76D2;&#x5B50;&#xFF08;box&#xFF09;&#x7684;containing block&#x7531;&#x3010;&#x6700;&#x8FD1;&#x5DF2;&#x5B9A;&#x4F4D;&#x7956;&#x5148;&#x7684;padding edge&#x3011;&#x4EA7;&#x751F;&#x3002;&#x8BE6;&#x89C1;MDN<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block" rel="nofollow noreferrer" target="_blank">Layout and the containing block</a>&#x3002;</p><p>&#x5728;CSS&#x6807;&#x51C6;&#x4E2D;&#xFF0C;&lt;html&gt;&#x5143;&#x7D20;&#x7684;containing block&#x79F0;&#x4E3A;<a href="https://www.w3.org/TR/CSS2/visudet.html#containing-block-details" rel="nofollow noreferrer" target="_blank">initial containing block</a>&#x3002;&#x5176;&#x4ED6;&#x6587;&#x7AE0;&#x6240;&#x8BF4;&#x7684;layout viewport&#x5176;&#x5B9E;&#x5C31;&#x662F;initial containing block&#x3002;&#x540E;&#x9762;&#x6211;&#x5C06;&#x6DF7;&#x7528;&#x8FD9;&#x4E24;&#x4E2A;&#x8BCD;&#x3002;</p><h2 id="articleHeader2">initial containing block&#x7684;&#x5C3A;&#x5BF8;</h2><p>initial containing block&#x7684;&#x5C3A;&#x5BF8;&#x6709;&#x4EC0;&#x4E48;&#x7528;&#xFF1F;&#x5B83;&#x53EF;&#x4EE5;&#x51B3;&#x5B9A;&lt;html&gt;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x3002;&#x5F53;<strong>&lt;html&gt;&#x7684;&#x5BBD;&#x5EA6;&#x3001;&#x9AD8;&#x5EA6;&#x3001;padding&#x3001;margin</strong>&#x4F7F;&#x7528;<strong>&#x767E;&#x5206;&#x6570;</strong>&#x7684;&#x503C;&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;&#x767E;&#x5206;&#x6570;&#x7684;&#x57FA;&#x51C6;&#x5C31;&#x662F;initial containing block&#x7684;&#x5C3A;&#x5BF8;&#x3002;</p><blockquote><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding" rel="nofollow noreferrer" target="_blank">padding</a>&#x3001;<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin" rel="nofollow noreferrer" target="_blank">margin</a>&#x4F7F;&#x7528;&#x767E;&#x5206;&#x6570;&#x503C;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;containing block&#x7684;<strong>width</strong>&#x8BA1;&#x7B97;&#x7684;&#xFF0C;&#x5305;&#x62EC;<strong>xxx-top</strong>&#x3001;<strong>xxx-bottom</strong>&#xFF01;<br>&lt;html&gt;&#x5143;&#x7D20;&#x662F;&#x4E00;&#x4E2A;block element&#xFF0C;&#x4E0E;&#x5176;&#x4ED6;&#x7684;block element&#x4E00;&#x6837;&#xFF0C;&#x5B83;&#x7684;&#x5BBD;&#x5EA6;&#x9ED8;&#x8BA4;&#x4E3A;containing block&#x7684;100%&#xFF08;&#x5BF9;&#x4E8E;&lt;html&gt;&#x5C31;&#x662F;initial containing block&#x7684;100%&#xFF09;&#xFF0C;&#x5B83;&#x7684;&#x9AD8;&#x5EA6;&#x9ED8;&#x8BA4;&#x7531;&#x5B50;&#x5143;&#x7D20;&lt;body&gt;&#x6491;&#x5F00;&#xFF08;&#x9664;&#x975E;&#x660E;&#x786E;&#x8BBE;&#x7F6E;&#x4E86;&#x9AD8;&#x5EA6;&#xFF09;&#x3002;</blockquote><p><strong>&#x90A3;&#x4E48;initial containing block&#x7684;&#x5C3A;&#x5BF8;&#x662F;&#x600E;&#x4E48;&#x786E;&#x5B9A;&#x7684;&#x5462;&#xFF1F;</strong></p><h3 id="articleHeader3">&#x684C;&#x9762;&#x6D4F;&#x89C8;&#x5668;</h3><p><strong>&#x5728;&#x684C;&#x9762;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;initial containing block&#x7684;&#x5C3A;&#x5BF8;&#x7B49;&#x4E8E;visual viewport&#x7684;&#x5C3A;&#x5BF8;</strong>&#x3002;</p><blockquote>&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x6DF7;&#x6DC6;&#xFF0C;&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x90FD;&#x4F7F;&#x7528;visual viewport&#x6765;&#x6307;&#x4EE3;&#x6D4F;&#x89C8;&#x7A97;&#x53E3;&#x3002;</blockquote><p>&#x4EE5;&#x4E0B;&#x4F8B;&#x5B50;&#x9A8C;&#x8BC1;&#x4E86;&#xFF0C;initial containing block&#x7684;&#x5C3A;&#x5BF8;&#x662F;&#x7B49;&#x4E8E;&#x6D4F;&#x89C8;&#x7A97;&#x53E3;&#x7684;&#x3002;&#x5E76;&#x4E14;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x5B83;&#xFF0C;&#x6765;&#x5143;&#x7D20;&#x7684;width&#x3001;height&#x3001;padding&#xFF08;margin&#x540C;&#x7406;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, user-scalable=no&quot;&gt;
  &lt;title&gt;test&lt;/title&gt;
  &lt;style&gt;
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html,
    body {
      /* &#x4F7F;html, body&#x7684;&#x5C3A;&#x5BF8;&#x59CB;&#x7EC8;&#x4E0E;visual viewport&#x76F8;&#x540C;&#xFF08;&#x5373;&#x4F7F;&#x4F60;&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5927;&#x5C0F;&#xFF09;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */
      width: 100%;
      height: 100%;
    }

    html {
      /* &#x76F8;&#x5BF9;&#x4E8E;initial containing block&#x8BA1;&#x7B97;&#x767E;&#x5206;&#x6BD4; */
      padding-left: 50%;
    }


    #box {
      /* &#x586B;&#x6EE1;body&#x5143;&#x7D20;&#xFF0C;&#x65B9;&#x4FBF;&#x770B;&#x51FA;body&#x7684;&#x5927;&#x5C0F; */
      width: 100%;
      height: 100%;
      /* &#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x5728;body&#x4E0A;&#x5E94;&#x7528;background-color&#x6765;&#x770B;&#x5B83;&#x7684;&#x5927;&#x5C0F;&#xFF1F;
      &#x56E0;&#x4E3A;body&#x4E0A;&#x4F7F;&#x7528;background&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x8BE1;&#x5F02;&#x7684;&#x73B0;&#x8C61;&#xFF1A;background&#x4F1A;&#x8D85;&#x51FA;body&#x8986;&#x76D6;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x3002;
      https://css-tricks.com/just-one-of-those-weird-things-about-css-background-on-body/ */
      background-color: aqua;
    }
  &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;div id=&quot;box&quot;&gt;
  &lt;/div&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1, user-scalable=no&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">box-sizing</span>: border-box;
    }

    <span class="hljs-selector-tag">html</span>,
    <span class="hljs-selector-tag">body</span> {
      <span class="hljs-comment">/* &#x4F7F;html, body&#x7684;&#x5C3A;&#x5BF8;&#x59CB;&#x7EC8;&#x4E0E;visual viewport&#x76F8;&#x540C;&#xFF08;&#x5373;&#x4F7F;&#x4F60;&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5927;&#x5C0F;&#xFF09;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    }

    <span class="hljs-selector-tag">html</span> {
      <span class="hljs-comment">/* &#x76F8;&#x5BF9;&#x4E8E;initial containing block&#x8BA1;&#x7B97;&#x767E;&#x5206;&#x6BD4; */</span>
      <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">50%</span>;
    }


    <span class="hljs-selector-id">#box</span> {
      <span class="hljs-comment">/* &#x586B;&#x6EE1;body&#x5143;&#x7D20;&#xFF0C;&#x65B9;&#x4FBF;&#x770B;&#x51FA;body&#x7684;&#x5927;&#x5C0F; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-comment">/* &#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x5728;body&#x4E0A;&#x5E94;&#x7528;background-color&#x6765;&#x770B;&#x5B83;&#x7684;&#x5927;&#x5C0F;&#xFF1F;
      &#x56E0;&#x4E3A;body&#x4E0A;&#x4F7F;&#x7528;background&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x8BE1;&#x5F02;&#x7684;&#x73B0;&#x8C61;&#xFF1A;background&#x4F1A;&#x8D85;&#x51FA;body&#x8986;&#x76D6;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x3002;
      https://css-tricks.com/just-one-of-those-weird-things-about-css-background-on-body/ */</span>
      <span class="hljs-attribute">background-color</span>: aqua;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><h3 id="articleHeader4">&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;</h3><p><strong>&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#x4E0A;&#xFF0C;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x6709;&#x4E00;&#x4E9B;&#x4E0D;&#x540C;</strong>&#xFF1A;&#x73B0;&#x5728;&#x5927;&#x90E8;&#x5206;&#x7684;&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x6709;2&#x79CD;&#x6A21;&#x5F0F;&#xFF1A;&#x201C;&#x67E5;&#x770B;&#x684C;&#x9762;&#x7248;&#x7F51;&#x7AD9;&#x201D;&#x548C;&#x201C;&#x67E5;&#x770B;&#x79FB;&#x52A8;&#x7248;&#x7F51;&#x7AD9;&#x201D;&#xFF1A;</p><ul><li>&#x5728;&#x201C;&#x67E5;&#x770B;&#x684C;&#x9762;&#x7248;&#x7F51;&#x7AD9;&#x201D;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;<strong>&#x5C06;layout viewport&#x7684;&#x8BBE;&#x7F6E;&#x4E3A;&#x4E00;&#x4E2A;&#x9884;&#x5B9A;&#x4E49;&#x5C3A;&#x5BF8;</strong>&#xFF0C;&#x5BBD;&#x5EA6;&#x4E00;&#x822C;&#x662F;980&#x4E2A;CSS&#x50CF;&#x7D20;&#xFF0C;&#x9AD8;&#x5EA6;&#x4E00;&#x822C;&#x662F;1500&#x4EE5;&#x4E0A;&#xFF0C;&#x4E0D;&#x7BA1;visual viewport&#x7684;&#x5C3A;&#x5BF8;&#x662F;&#x591A;&#x5C11;&#x3002;</li><li>&#x5728;&#x201C;&#x67E5;&#x770B;&#x79FB;&#x52A8;&#x7248;&#x7F51;&#x7AD9;&#x201D;&#x6A21;&#x5F0F;&#x4E0B;&#xFF08;&#x9ED8;&#x8BA4;&#x5904;&#x4E8E;&#x8FD9;&#x4E2A;&#x6A21;&#x5F0F;&#xFF09;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x6839;&#x636E;<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag" rel="nofollow noreferrer" target="_blank">viewport meta tag</a>&#x7684;&#x4FE1;&#x606F;&#x6765;&#x51B3;&#x5B9A;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;viewport meta tag&#xFF0C;&#x5219;&#x8868;&#x73B0;&#x4E0E;&#x201C;&#x67E5;&#x770B;&#x684C;&#x9762;&#x7248;&#x7F51;&#x7AD9;&#x201D;&#x6A21;&#x5F0F;&#x76F8;&#x540C;&#x3002;</li></ul><p>&#x5E38;&#x7528;&#x7684;viewport meta tag&#x662F;<code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</code>&#x3002;&#x5B83;&#x544A;&#x8BC9;&#x201C;&#x67E5;&#x770B;&#x79FB;&#x52A8;&#x7248;&#x7F51;&#x7AD9;&#x201D;&#x6A21;&#x5F0F;&#x4E0B;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x5C06;layout viewport&#x7684;&#x5BBD;&#x5EA6;&#xFF08;CSS&#x50CF;&#x7D20;&#xFF09;&#x8BBE;&#x4E3A;&#x8BBE;&#x5907;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#xFF0C;&#x4E00;&#x822C;&#x662F;360px&#x5DE6;&#x53F3;&#xFF09;&#x3002;&#x8FD9;&#x6837;&#xFF0C;&#x5728;&#x7F29;&#x653E;&#x4E3A;100%&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF08;CSS&#x50CF;&#x7D20;&#x5927;&#x5C0F;=&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x5927;&#x5C0F;&#xFF09;&#xFF0C;&#x5C4F;&#x5E55;&#x6070;&#x597D;&#x80FD;&#x88C5;&#x4E0B;layout viewport&#xFF0C;&#x4ECE;&#x800C;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x6A2A;&#x5411;&#x6EDA;&#x52A8;&#x6761;&#x3002;</p><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E0D;&#x7BA1;&#x5904;&#x4E8E;&#x54EA;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x4E0D;&#x7BA1;&#x6709;&#x6CA1;&#x6709;viewport meta tag&#xFF0C;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x5728;&#x52A0;&#x8F7D;&#x4EE5;&#x540E;&#x5C31;&#x56FA;&#x5B9A;&#x4E86;&#x3002;</p><h3 id="articleHeader5">&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x6EA2;&#x51FA; initial containing block(layout viewport)</h3><p>&#x4E0D;&#x8981;&#x89C9;&#x5F97;&quot;initial containing block&quot;&#x540D;&#x5B57;&#x542C;&#x8D77;&#x6765;&#x5F88;&#x5389;&#x5BB3;&#xFF0C;&#x5C31;&#x80AF;&#x5B9A;&#x4F1A;&#x5C06;&#x6240;&#x6709;&#x5185;&#x5BB9;&#x5305;&#x542B;&#x5728;&#x5176;&#x533A;&#x57DF;&#x5185;&#x3002;&#x5C31;&#x50CF;&#x5176;&#x4ED6;&#x666E;&#x901A;&#x7684;<a href="https://www.w3.org/TR/CSS2/visudet.html#containing-block-details" rel="nofollow noreferrer" target="_blank">containing block</a>&#xFF0C;&#x9875;&#x9762;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;<a href="https://segmentfault.com/a/1190000016431062">&#x6EA2;&#x51FA;</a>&#x5B83;&#x3002;&#x6BD4;&#x5982;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x3001;overflow:visible&#x3002;<br>&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, user-scalable=no&quot;&gt;
    &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
    &lt;title&gt;test viewport&lt;/title&gt;
    &lt;style&gt;
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        
        .box {
            width: 100%;
            height: 200px;
            background-color: greenyellow;
        }
        
        .out {
            position: absolute;
            right: -30px;
            background-color: rosybrown;
        }
    &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;div class=&quot;box&quot;&gt;box&lt;/div&gt;
    &lt;div class=&quot;out&quot;&gt;out&lt;/div&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0, user-scalable=no&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test viewport<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">box-sizing</span>: border-box;
        }
        
        <span class="hljs-selector-class">.box</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background-color</span>: greenyellow;
        }
        
        <span class="hljs-selector-class">.out</span> {
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">right</span>: -<span class="hljs-number">30px</span>;
            <span class="hljs-attribute">background-color</span>: rosybrown;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>box<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;out&quot;</span>&gt;</span>out<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x5176;&#x4E2D;div.out&#x5C31;&#x6EA2;&#x51FA;&#x4E86;initial containint block&#x7684;&#x533A;&#x57DF;&#x3002;<br>&#x7531;&#x4E8E;&#x6709;&#x5185;&#x5BB9;&#x6EA2;&#x51FA;&#x4E86;<strong>visual viewport</strong>&#xFF0C;&#x56E0;&#x6B64;&#x5728;visual viewport&#x4E0A;&#x51FA;&#x73B0;&#x4E86;&#x6A2A;&#x5411;&#x6EDA;&#x52A8;&#x6761;&#x3002;visual viewport&#x4E0A;&#x7684;&#x6EDA;&#x52A8;&#x6761;&#x5728;<a href="https://segmentfault.com/a/1190000016431062" target="_blank">css&#x6EA2;&#x51FA;&#x673A;&#x5236;&#x63A2;&#x7A76;</a>&#x4E2D;&#x8BA8;&#x8BBA;&#x3002;</p><h2 id="articleHeader6">&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x7684;&#x5F71;&#x54CD;</h2><p><strong>&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;</strong>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x6539;&#x53D8;visual viewport&#x53EF;&#x5BB9;&#x7EB3;&#x7684;<strong>CSS&#x50CF;&#x7D20;</strong>&#x6570;&#x91CF;&#xFF1A;</p><ul><li>&#x5728;&#x8C03;&#x6574;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x53EF;&#x5BB9;&#x7EB3;&#x7684;<strong>&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;</strong>&#x6570;&#x91CF;&#x4E0D;&#x53D8;&#xFF0C;&#x800C;CSS&#x50CF;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x56E0;&#x6B64;visual viewport&#x53EF;&#x5BB9;&#x7EB3;&#x7684;<strong>CSS&#x50CF;&#x7D20;</strong>&#x6570;&#x91CF;&#x4E5F;&#x6539;&#x53D8;&#xFF1B;</li><li>&#x5728;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x7684;&#x65F6;&#x5019;&#xFF0C;CSS&#x50CF;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#x4E0D;&#x53D8;&#xFF0C;&#x800C;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x53EF;&#x5BB9;&#x7EB3;&#x7684;<strong>&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;</strong>&#x6570;&#x91CF;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x56E0;&#x6B64;visual viewport&#x53EF;&#x5BB9;&#x7EB3;&#x7684;<strong>CSS&#x50CF;&#x7D20;</strong>&#x6570;&#x91CF;&#x4E5F;&#x6539;&#x53D8;&#x3002;</li></ul><h3 id="articleHeader7">&#x684C;&#x9762;&#x6D4F;&#x89C8;&#x5668;</h3><p>&#x5728;&#x684C;&#x9762;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;layout viewport(initial containing block)&#x4FDD;&#x6301;&#x4E0E;visual viewport&#x5C3A;&#x5BF8;&#x76F8;&#x540C;&#xFF08;&#x53EF;&#x5BB9;&#x7EB3;&#x7684;<strong>CSS&#x50CF;&#x7D20;</strong>&#x6570;&#x91CF;&#x76F8;&#x540C;&#xFF09;&#xFF0C;&#x56E0;&#x6B64;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x4E5F;&#x4F1A;&#x968F;&#x7740;<strong>&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;</strong>&#x800C;&#x6539;&#x53D8;&#x3002;<br>&#x4F8B;&#x5B50;+&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;title&gt;test&lt;/title&gt;
  &lt;style&gt;
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html,
    body,
    main {
      /* &#x5BF9;&#x4E8E;block&#x5143;&#x7D20;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%&#x3002;
      &#x653E;&#x5728;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x5F3A;&#x8C03;&#x4E00;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x7EA7;&#x8054;&#x7684;width:100%&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#x59CB;&#x7EC8;&#x7B49;&#x4E8E;visual viewport&#x7684;&#x5BBD;&#x5EA6;&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x7F29;&#x5C0F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x6216;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x589E;&#x52A0;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#xFF08;&#x901A;&#x8FC7;Ctrl+&#x9F20;&#x6807;&#x6EDA;&#x8F6E;&#xFF09;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002; */
      width: 100%;
    }

    .ilbk {
      display: inline-block;
      width: 200px;
      height: 50px;
      background-color: aquamarine;
    }
  &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;main&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;ilbk&quot;&gt;&lt;/div&gt;
  &lt;/main&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">box-sizing</span>: border-box;
    }

    <span class="hljs-selector-tag">html</span>,
    <span class="hljs-selector-tag">body</span>,
    <span class="hljs-selector-tag">main</span> {
      <span class="hljs-comment">/* &#x5BF9;&#x4E8E;block&#x5143;&#x7D20;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%&#x3002;
      &#x653E;&#x5728;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x5F3A;&#x8C03;&#x4E00;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x7EA7;&#x8054;&#x7684;width:100%&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#x59CB;&#x7EC8;&#x7B49;&#x4E8E;visual viewport&#x7684;&#x5BBD;&#x5EA6;&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x7F29;&#x5C0F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x6216;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x589E;&#x52A0;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#xFF08;&#x901A;&#x8FC7;Ctrl+&#x9F20;&#x6807;&#x6EDA;&#x8F6E;&#xFF09;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    }

    <span class="hljs-selector-class">.ilbk</span> {
      <span class="hljs-attribute">display</span>: inline-block;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
      <span class="hljs-attribute">background-color</span>: aquamarine;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ilbk&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x4EE5;&#x4E0A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<strong>&#x7EA7;&#x8054;&#x7684;&#x767E;&#x5206;&#x6570;&#x5BBD;&#x5EA6;</strong>&#x505A;&#x5230;&#x4E86;<strong>&#x54CD;&#x5E94;&#x5F0F;&#x5BBD;&#x5EA6;</strong>&#xFF0C;&#x5373;&#xFF0C;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x5EA6;&#x7531;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x5BBD;&#x5EA6;&#x52A8;&#x6001;&#x51B3;&#x5B9A;&#xFF08;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x662F;&lt;main&gt;&#x5143;&#x7D20;&#xFF09;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5199;&#x6B7B;&#x5728;CSS&#x4E2D;&#x3002;<br>&#x7528;&#x684C;&#x9762;&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5F00;&#x4EE5;&#x4E0A;&#x4F8B;&#x5B50;&#xFF0C;&#x968F;&#x4FBF;&#x6539;&#x53D8;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x3001;&#x6539;&#x53D8;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&lt;main&gt;&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4F1A;&#x968F;&#x4E4B;&#x6539;&#x53D8;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbg6QE?w=1920&amp;h=944" src="https://static.alili.tech/img/bVbg6QE?w=1920&amp;h=944" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader8">&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;</h3><p>&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E0D;&#x7BA1;&#x5904;&#x4E8E;&#x54EA;&#x79CD;&#x6A21;&#x5F0F;&#xFF0C;&#x4E0D;&#x7BA1;&#x6709;&#x6CA1;&#x6709;viewport meta tag&#xFF0C;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x4EE5;&#x540E;&#x5C31;&#x56FA;&#x5B9A;&#x4E86;&#x3002;&#x65E0;&#x8BBA;&#x7528;&#x6237;&#x5982;&#x4F55;&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#xFF08;&#x8FD9;&#x5728;&#x624B;&#x673A;&#x4E0A;&#x4F3C;&#x4E4E;&#x505A;&#x4E0D;&#x5230;&#xFF09;&#xFF0C;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x90FD;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;&#x3002;</p><blockquote>&#x6709;&#x4E00;&#x4E2A;&#x4F8B;&#x5916;&#xFF1A;&#x7528;&#x6237;&#x53EF;&#x4EE5;&#x5728;&#x52A0;&#x8F7D;&#x597D;&#x9875;&#x9762;&#x4EE5;&#x540E;&#x5207;&#x6362;&#x6A2A;&#x5C4F;&#x3001;&#x7AD6;&#x5C4F;&#x6A21;&#x5F0F;&#xFF0C;&#x4ECE;&#x800C;meta viewport tag&#x4E2D;&#x7684;device-width&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x4ECE;&#x800C;layout viewport&#x5BBD;&#x5EA6;&#x6539;&#x53D8;&#x3002;</blockquote><h2 id="articleHeader9">media query</h2><p>&#x4F7F;&#x7528;<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" rel="nofollow noreferrer" target="_blank">media query</a>&#x67E5;&#x8BE2;width&#x3001;height&#x7684;&#x65F6;&#x5019;&#xFF08;&#x6BD4;&#x5982;<code>@media screen and (max-width: 500px) {...}</code>&#xFF09;&#xFF0C;&#x67E5;&#x5230;&#x7684;&#x662F;<strong>layout viewport</strong>&#x7684;&#x5C3A;&#x5BF8;&#xFF0C;&#x5E76;&#x4E14;px&#x6307;&#x7684;&#x662F;<strong>CSS&#x50CF;&#x7D20;</strong>&#x3002;&#x5728;&#x684C;&#x9762;&#x7AEF;&#x548C;&#x79FB;&#x52A8;&#x7AEF;&#x90FD;&#x662F;&#x5982;&#x6B64;&#x3002;<br>&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;title&gt;test1&lt;/title&gt;
  &lt;style&gt;
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    html,
    body,
    main {
      /* &#x5BF9;&#x4E8E;block&#x5143;&#x7D20;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%&#x3002;
      &#x653E;&#x5728;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x5F3A;&#x8C03;&#x4E00;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x7EA7;&#x8054;&#x7684;width:100%&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#x59CB;&#x7EC8;&#x7B49;&#x4E8E;visual viewport&#x7684;&#x5BBD;&#x5EA6;&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x7F29;&#x5C0F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x6216;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x589E;&#x52A0;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#xFF08;&#x901A;&#x8FC7;Ctrl+&#x9F20;&#x6807;&#x6EDA;&#x8F6E;&#xFF09;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002; */
      width: 100%;
      height: 100%;
      background-color: aquamarine;
    }

    @media screen and (max-width: 500px) {
      main {
        background-color: purple;
      }
    }
  &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;main&gt;
  &lt;/main&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test1<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">box-sizing</span>: border-box;
    }

    <span class="hljs-selector-tag">html</span>,
    <span class="hljs-selector-tag">body</span>,
    <span class="hljs-selector-tag">main</span> {
      <span class="hljs-comment">/* &#x5BF9;&#x4E8E;block&#x5143;&#x7D20;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%&#x3002;
      &#x653E;&#x5728;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x5F3A;&#x8C03;&#x4E00;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x7EA7;&#x8054;&#x7684;width:100%&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#x59CB;&#x7EC8;&#x7B49;&#x4E8E;visual viewport&#x7684;&#x5BBD;&#x5EA6;&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x7F29;&#x5C0F;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x6216;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002;
      &#x5982;&#x679C;&#x4F60;&#x589E;&#x52A0;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#xFF08;&#x901A;&#x8FC7;Ctrl+&#x9F20;&#x6807;&#x6EDA;&#x8F6E;&#xFF09;&#xFF0C;main&#x7684;&#x5BBD;&#x5EA6;&#xFF08;&#x4EE5;CSS&#x50CF;&#x7D20;&#x4E3A;&#x5355;&#x4F4D;&#xFF09;&#x4E5F;&#x4F1A;&#xFF08;&#x54CD;&#x5E94;&#x5F0F;&#x5730;&#xFF09;&#x51CF;&#x5C0F;&#xFF0C;&#x4ECE;&#x800C;&#x4F1A;&#x589E;&#x52A0;&#x66F4;&#x591A;&#x7684;&#x6362;&#x884C;&#x4EE5;&#x4FBF;&#x5BB9;&#x7EB3;&#x5185;&#x90E8;&#x7684;div.ilbk&#x3002; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">background-color</span>: aquamarine;
    }

    @<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">500px</span>) {
      <span class="hljs-selector-tag">main</span> {
        <span class="hljs-attribute">background-color</span>: purple;
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5728;&#x684C;&#x9762;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x901A;&#x8FC7;&#x6539;&#x53D8;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x6216;&#x8005;&#x6539;&#x53D8;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#xFF0C;&#x90FD;&#x80FD;&#x9020;&#x6210;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#x7ED3;&#x679C;&#x7684;&#x6539;&#x53D8;&#x3002;&#x524D;&#x9762;&#x5DF2;&#x7ECF;&#x89E3;&#x91CA;&#x8FC7;&#x4E86;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x64CD;&#x4F5C;&#x90FD;&#x4F1A;&#x9020;&#x6210;layout viewport&#x5C3A;&#x5BF8;&#x7684;&#x6539;&#x53D8;&#x3002;</p><h2 id="articleHeader10">&#x4F8B;&#x5B50;</h2><p>&#x4E3A;&#x4E86;&#x8BA9;&#x8BFB;&#x8005;&#x660E;&#x767D;meta viewport&#x3001;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#x51FA;&#x73B0;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x8FD9;&#x91CC;&#x4E3E;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;<br>&#x6709;&#x5F88;&#x591A;&#x7F51;&#x7AD9;&#x6CA1;&#x6709;&#x9488;&#x5BF9;&#x79FB;&#x52A8;&#x7AEF;&#x8FDB;&#x884C;&#x4F18;&#x5316;&#x3002;&#x5BF9;&#x4E8E;&#x8FD9;&#x4E9B;&#x7F51;&#x7AD9;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x4E0A;&#x5C06;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x8BBE;&#x7F6E;&#x4E3A;visual viewport&#x7684;&#x5C3A;&#x5BF8;&#xFF08;&#x5BBD;&#x5EA6;&#x4E3A;360CSS&#x50CF;&#x7D20;&#x5DE6;&#x53F3;&#xFF09;&#xFF0C;&#x90A3;&#x4E48;&#x6392;&#x7248;&#x53EF;&#x80FD;&#x4F1A;&#x5B8C;&#x5168;&#x4E71;&#x6389;&#xFF08;&#x610F;&#x6599;&#x4E4B;&#x5916;&#x7684;&#x6362;&#x884C;&#x3001;&#x6EA2;&#x51FA;&#xFF09;&#x3002;&#x4E3A;&#x4E86;&#x80FD;&#x6B63;&#x786E;&#x663E;&#x793A;&#x8FD9;&#x79CD;&#x7F51;&#x7AD9;&#x7684;&#x6392;&#x7248;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;meta viewport&#x7684;&#x6307;&#x793A;&#xFF0C;&#x79FB;&#x52A8;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#x5C06;layout viewport&#x7684;&#x5C3A;&#x5BF8;&#x8BBE;&#x4E3A;&#x4E0E;&#x7535;&#x8111;&#x6D4F;&#x89C8;&#x5668;&#x4E00;&#x6837;&#xFF0C;&#x6BD4;&#x5982;980px&#xFF08;&#x5355;&#x4F4D;&#xFF1A;CSS&#x50CF;&#x7D20;&#xFF09;&#x3002;&#x7531;&#x4E8E;&#x624B;&#x673A;&#x7684;&#x5C4F;&#x5E55;&#x903B;&#x8F91;&#x50CF;&#x7D20;&#x5BBD;&#x5EA6;&#x4E00;&#x822C;&#x53EA;&#x6709;300~400&#x903B;&#x8F91;&#x50CF;&#x7D20;&#xFF0C;&#x56E0;&#x6B64;&#x9700;&#x8981;&#x5C06;&#x591A;&#x4E2A;css&#x50CF;&#x7D20;&#x7531;1&#x4E2A;&#x903B;&#x8F91;&#x50CF;&#x7D20;&#x663E;&#x793A;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x7F29;&#x5C0F;&#xFF0C;&#x4E0D;&#x8981;&#x5FD8;&#x8BB0;<code>&#x7F29;&#x653E;&#x6BD4;&#x4F8B;=css&#x50CF;&#x7D20;&#x8FB9;&#x957F;/&#x903B;&#x8F91;&#x50CF;&#x7D20;&#x8FB9;&#x957F;</code>&#xFF09;&#xFF0C;&#x901A;&#x8FC7;&#x7F29;&#x5C0F;css&#x50CF;&#x7D20;&#x8BA9;&#x624B;&#x673A;&#x5C4F;&#x5E55;&#x663E;&#x793A;&#x7684;css&#x50CF;&#x7D20;&#x4E0E;&#x7F51;&#x9875;&#x7684;css&#x50CF;&#x7D20;&#x4E00;&#x6837;&#x591A;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhaM9?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVbhaM9?w=1080&amp;h=1920" alt="&#x7528;&#x624B;&#x673A;&#x6D4F;&#x89C8;&#x7535;&#x8111;&#x677F;&#x7F51;&#x9875;" title="&#x7528;&#x624B;&#x673A;&#x6D4F;&#x89C8;&#x7535;&#x8111;&#x677F;&#x7F51;&#x9875;" style="cursor:pointer"></span></p><p>&#x4F46;&#x662F;&#x8FD9;&#x4F1A;&#x5F15;&#x53D1;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x5B57;&#x4F53;&#x5C0F;&#x5F97;&#x96BE;&#x4EE5;&#x9605;&#x8BFB;&#x3002;&#x7528;&#x6237;&#x9605;&#x8BFB;&#x7684;&#x65F6;&#x5019;&#x53C8;&#x4E0D;&#x5F97;&#x4E0D;&#x7528;&#x624B;&#x6307;&#x5C06;&#x7F29;&#x653E;&#x6BD4;&#x4F8B;&#x8C03;&#x6574;&#x5230;100%&#x5DE6;&#x53F3;&#xFF08;&#x4E00;&#x4E2A;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#x663E;&#x793A;&#x4E00;&#x4E2A;css&#x50CF;&#x7D20;&#xFF0C;&#x5BF9;&#x4E8E;&#x6211;&#x7684;&#x624B;&#x673A;&#x6765;&#x8BF4;&#xFF0C;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x53EA;&#x6709;360&#x4E2A;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;visual viewport&#x53EA;&#x663E;&#x793A;layout viewport&#x7684;&#x4E00;&#x90E8;&#x5206;&#x4E86;&#x3002;&#x9605;&#x8BFB;&#x7684;&#x65F6;&#x5019;&#x9700;&#x8981;&#x6A2A;&#x5411;&#x3001;&#x7EB5;&#x5411;&#x6EDA;&#x52A8;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhaNh?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVbhaNh?w=1080&amp;h=1920" alt="&#x7528;&#x624B;&#x673A;&#x6D4F;&#x89C8;&#x7535;&#x8111;&#x677F;&#x7F51;&#x9875;" title="&#x7528;&#x624B;&#x673A;&#x6D4F;&#x89C8;&#x7535;&#x8111;&#x677F;&#x7F51;&#x9875;" style="cursor:pointer"></span><br>&#x867D;&#x7136;&#x80FD;&#x591F;&#x9605;&#x8BFB;&#x7F51;&#x7AD9;&#x5185;&#x5BB9;&#xFF0C;&#x4F46;&#x8FD9;&#x4F9D;&#x7136;&#x662F;&#x4E00;&#x79CD;&#x975E;&#x5E38;&#x5DEE;&#x7684;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x3002;</p><p>&#x9002;&#x914D;&#x79FB;&#x52A8;&#x7AEF;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x4F7F;&#x7528;<code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</code>&#x6765;&#x5B9A;&#x4E49;layout viewport&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#x6765;&#x4E3A;&#x4E0D;&#x540C;&#x7684;layout viewport&#x5B9A;&#x4E49;&#x4E0D;&#x540C;&#x7684;CSS&#x6392;&#x7248;&#x3002;&#x4EE5;&#x4E0B;&#x662F;&#x6D4F;&#x89C8;&#x7684;&#x6548;&#x679C;&#xFF08;&#x4F7F;&#x7528;&#x201C;&#x67E5;&#x770B;&#x79FB;&#x52A8;&#x7248;&#x7F51;&#x7AD9;&#x201D;&#x6A21;&#x5F0F;&#xFF09;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhaNq?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVbhaNq?w=1080&amp;h=1920" alt="&#x9002;&#x914D;&#x79FB;&#x52A8;&#x7AEF;&#x4EE5;&#x540E;" title="&#x9002;&#x914D;&#x79FB;&#x52A8;&#x7AEF;&#x4EE5;&#x540E;" style="cursor:pointer"></span><br>&#x73B0;&#x5728;&#x7684;&#x5B57;&#x4F53;&#x5927;&#x5C0F;&#x5408;&#x9002;&#x4E86;&#xFF0C;&#x7F51;&#x9875;&#x7684;&#x6392;&#x7248;&#x53D8;&#x5316;&#x4E86;&#xFF0C;&#x6CA1;&#x6709;&#x5143;&#x7D20;&#x6A2A;&#x5411;&#x6EA2;&#x51FA;&#xFF0C;&#x6CA1;&#x6709;&#x6A2A;&#x5411;&#x6EDA;&#x52A8;&#x6761;&#xFF0C;&#x5728;&#x79FB;&#x52A8;&#x7AEF;&#x4E0A;&#x7684;&#x9605;&#x8BFB;&#x4F53;&#x9A8C;&#x66F4;&#x597D;&#x3002;</p><hr><h1 id="articleHeader11">&#x76F8;&#x5173;&#x5C5E;&#x6027;</h1><h2 id="articleHeader12">1. screen.width/height</h2><p><a href="https://segmentfault.com/a/1190000011753855">&#x4E0A;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;</a>&#x8BF4;&#x8FC7;&#x7684;screen.width/height&#xFF1A;&#x6574;&#x4E2A;&#x5C4F;&#x5E55;&#x7684;&#x5BBD;&#x5EA6;&#x548C;&#x9AD8;&#x5EA6;&#x3002;&#x8FD9;&#x4E24;&#x4E2A;&#x6570;&#x503C;&#x7684;&#x5355;&#x4F4D;&#x662F;<strong>&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;</strong>&#x3002;&#x8FD9;&#x4E24;&#x4E2A;&#x6570;&#x503C;<strong>&#x4E0D;&#x968F;</strong>&#x9875;&#x9762;&#x7F29;&#x653E;&#x3001;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x800C;&#x6539;&#x53D8;&#xFF0C;&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x56FA;&#x5B9A;&#x4E0D;&#x53D8;&#x7684;&#xFF08;&#x9664;&#x975E;&#x4F60;&#x901A;&#x8FC7;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x6539;&#x53D8;&#x5C4F;&#x5E55;&#x7684;&#x5206;&#x8FA8;&#x7387;&#xFF09;&#x3002;&#x8FD9;&#x4E24;&#x4E2A;&#x6570;&#x503C;&#x662F;&#x64CD;&#x4F5C;&#x7CFB;&#x7EDF;&#x51B3;&#x5B9A;&#x7684;&#xFF0C;&#x7531;&#x4E8E;&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;:&#x8BBE;&#x5907;&#x50CF;&#x7D20;&#x7ECF;&#x5E38;&#x4E0D;&#x7B49;&#x4E8E;1&#xFF1A;1&#xFF0C;&#x5B9E;&#x9645;&#x5C4F;&#x5E55;&#x7269;&#x7406;&#x50CF;&#x7D20;&#x7684;&#x5206;&#x8FA8;&#x7387;&#x4E0D;&#x4E00;&#x5B9A;&#x662F;screen.width&#xD7;screen.height&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhaNA?w=1240&amp;h=661" src="https://static.alili.tech/img/bVbhaNA?w=1240&amp;h=661" alt="iphone&#x5404;&#x4EE3;&#x7684;&#x903B;&#x8F91;&#x5206;&#x8FA8;&#x7387;&#x548C;&#x7269;&#x7406;&#x5206;&#x8FA8;&#x7387;" title="iphone&#x5404;&#x4EE3;&#x7684;&#x903B;&#x8F91;&#x5206;&#x8FA8;&#x7387;&#x548C;&#x7269;&#x7406;&#x5206;&#x8FA8;&#x7387;" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x4E0A;&#x56FE;&#x4E2D;&#x5217;&#x51FA;&#x4E86;iphone&#x5404;&#x4EE3;&#x7684;<strong>&#x8BBE;&#x5907;&#x5206;&#x8FA8;&#x7387;&#xFF08;&#x7269;&#x7406;&#x5206;&#x8FA8;&#x7387;&#xFF09;</strong>&#x548C;<strong>&#x903B;&#x8F91;&#x5206;&#x8FA8;&#x7387;</strong>&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x770B;&#x8FD9;&#x4E24;&#x884C;&#x3002;</p><p>&#x8BBE;&#x5907;&#x5206;&#x8FA8;&#x7387;&#x5C31;&#x662F;&#x5C4F;&#x5E55;&#x4E0A;&#x7684;&#x7269;&#x7406;&#x50CF;&#x7D20;&#x7684;&#x6570;&#x91CF;&#xFF0C;&#x5F53;&#x624B;&#x673A;&#x5382;&#x5546;&#x5BA3;&#x4F20;&#x81EA;&#x5DF1;&#x7684;&#x5C4F;&#x5E55;&#x6709;&#x591A;&#x4E48;&#x6E05;&#x6670;&#x9510;&#x5229;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x76F8;&#x4E92;&#x6500;&#x6BD4;&#x7684;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x6570;&#x503C;&#x3002;</p><p>&#x903B;&#x8F91;&#x5206;&#x8FA8;&#x7387;&#x5C31;&#x662F;screen.width/height&#x3002;&#x4E3A;&#x4EC0;&#x4E48;iphone3GS&#x4EE5;&#x540E;&#x7684;iphone&#x90FD;&#x8981;&#x628A;&#x8FD9;&#x4E2A;&#x503C;&#x8BBE;&#x4E3A;&#x5B9E;&#x9645;&#x5C4F;&#x5E55;&#x5206;&#x8FA8;&#x7387;&#x7684;1/2&#x6216;1/3&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x968F;&#x7740;&#x5C4F;&#x5E55;&#x4E0A;&#x585E;&#x8FDB;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x7684;&#x7269;&#x7406;&#x50CF;&#x7D20;&#xFF0C;&#x5C4F;&#x5E55;&#x5927;&#x5C0F;&#x7684;&#x53D8;&#x5316;&#x5374;&#x4E0D;&#x90A3;&#x4E48;&#x660E;&#x663E;&#xFF0C;&#x56E0;&#x6B64;&#x50CF;&#x7D20;&#x5BC6;&#x5EA6;&#x4E5F;&#x8D8A;&#x6765;&#x8D8A;&#x9AD8;&#x3002;&#x5982;&#x679C;&#x8FD8;&#x8BA9;&#x903B;&#x8F91;&#x5206;&#x8FA8;&#x7387;&#xFF1A;&#x771F;&#x5B9E;&#x5C4F;&#x5E55;&#x5206;&#x8FA8;&#x7387;=1&#xFF1A;1&#xFF0C;&#x90A3;&#x4E48;12px&#x7684;&#x5B57;&#x4F53;&#x5C31;&#x4F1A;&#x8D8A;&#x6765;&#x8D8A;&#x5C0F;&#xFF0C;&#x5F71;&#x54CD;&#x9605;&#x8BFB;&#x4F53;&#x9A8C;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x540E;&#x7EED;&#x7684;iphone&#x7528;4&#x4E2A;&#x7269;&#x7406;&#x50CF;&#x7D20;&#xFF08;&#x751A;&#x81F3;9&#x4E2A;&#x50CF;&#x7D20;&#xFF09;&#x7EC4;&#x5408;&#x6210;&#x4E00;&#x4E2A;&#x201C;&#x903B;&#x8F91;&#x50CF;&#x7D20;&#x201D;&#x3002;&#x8FD9;&#x6837;&#xFF0C;&#x5373;&#x4F7F;&#x7269;&#x7406;&#x50CF;&#x7D20;&#x8D8A;&#x6765;&#x8D8A;&#x5C0F;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x201C;&#x903B;&#x8F91;&#x50CF;&#x7D20;&#x201D;&#x7684;&#x5927;&#x5C0F;&#x53D8;&#x5316;&#x4E0D;&#x5927;&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x653E;&#x5FC3;&#x5730;&#x4F7F;&#x7528;&#x903B;&#x8F91;&#x50CF;&#x7D20;&#x6765;&#x8861;&#x91CF;&#x5927;&#x5C0F;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x771F;&#x5B9E;&#x5927;&#x5C0F;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x663E;&#x793A;&#x5668;&#x4E0A;&#x51FA;&#x73B0;&#x4E25;&#x91CD;&#x504F;&#x5DEE;&#x3002;</p><h2 id="articleHeader13">2. window.innerWidth/Height</h2><p>visual viewport&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6D4F;&#x89C8;&#x5668;<strong>&#x5185;&#x5BB9;&#x7A97;&#x53E3;</strong>&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x4E0D;&#x5305;&#x62EC;&#x83DC;&#x5355;&#x680F;&#x3001;&#x5730;&#x5740;&#x680F;&#x3001;&#x72B6;&#x6001;&#x680F;&#x7B49;&#xFF0C;&#x4F46;&#x662F;<strong>&#x5305;&#x62EC;&#x6EDA;&#x52A8;&#x6761;</strong>&#x3002;<strong>&#x5355;&#x4F4D;&#x662F;CSS&#x50CF;&#x7D20;</strong>&#x3002;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4F60;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;&#x5F53;&#x524D;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x53EF;&#x4EE5;&#x5BB9;&#x7EB3;&#x591A;&#x5C11;&#x4E2A;css&#x50CF;&#x7D20;&#x3002;&#x5F53;&#x7528;&#x6237;&#x653E;&#x5927;&#x7684;&#x65F6;&#x5019;&#x8FD9;&#x4E2A;&#x6570;&#x503C;&#x4F1A;&#x51CF;&#x5C11;&#xFF08;&#x56E0;&#x4E3A;css&#x50CF;&#x7D20;&#x53D8;&#x5927;&#x4E86;&#xFF09;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x7F29;&#x5C0F;&#x7684;&#x65F6;&#x5019;&#x8FD9;&#x4E2A;&#x6570;&#x503C;&#x589E;&#x5927;&#x3002;<strong>&#x7F29;&#x653E;&#x6539;&#x53D8;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x90FD;&#x4F1A;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x503C;</strong>&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhaN4?w=500&amp;h=313" src="https://static.alili.tech/img/bVbhaN4?w=500&amp;h=313" alt="" title="" style="cursor:pointer;display:inline"></span></p><blockquote>&#x4E0E;&#x4E4B;&#x5BF9;&#x5E94;&#x7684;&#xFF0C;window.outerWidth/outerHeight&#x7ED9;&#x51FA;&#x6574;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5927;&#x5C0F;&#xFF08;&#x5305;&#x62EC;&#x5404;&#x79CD;&#x680F;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x5355;&#x4F4D;&#x662F;<strong>&#x8BBE;&#x5907;&#x72EC;&#x7ACB;&#x50CF;&#x7D20;</strong>&#x3002;</blockquote><h2 id="articleHeader14">3. document.documentElement.clientWidth/Height</h2><p>Layout Viewport(initial containing block)&#x7684;&#x5C3A;&#x5BF8;&#x3002;&#x6CE8;&#x610F;&#xFF0C;Layout Viewport&#x6CA1;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#xFF08;&#x6839;&#x636E;<a href="https://segmentfault.com/a/1190000016431062" target="_blank">css&#x6EA2;&#x51FA;&#x673A;&#x5236;&#x63A2;&#x7A76;</a>&#x4E2D;&#x7684;&#x8BA8;&#x8BBA;&#xFF0C;&#x53EA;&#x6709;<strong>&#x5143;&#x7D20;</strong>&#x6216;&#x8005;<strong>visual viewport</strong>&#x624D;&#x80FD;&#x62E5;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#xFF09;&#x3002;<strong>&#x5355;&#x4F4D;&#x662F;CSS&#x50CF;&#x7D20;</strong>&#x3002;</p><blockquote><a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement" rel="nofollow noreferrer" target="_blank">document.documentElement</a>&#x6307;&#x7684;&#x662F;html&#x5143;&#x7D20;&#xFF0C;&#x901A;&#x5E38;<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth" rel="nofollow noreferrer" target="_blank">Element.clientWidth</a>&#x5E94;&#x8BE5;&#x7ED9;&#x51FA;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;&#x533A;&#x57DF;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x4F46;&#x662F;document.documentElement.clientWidth/Height&#x5E76;&#x4E0D;&#x8861;&#x91CF;html&#x5143;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x7279;&#x4F8B;&#x3002;&#x5404;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x9075;&#x5FAA;&#x7740;&#x8FD9;&#x4E2A;&#x7EA6;&#x5B9A;&#x3002;&#x5E76;&#x4E14;&#xFF0C;<a href="https://drafts.csswg.org/cssom-view/#dom-element-clientwidth" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x4E2A;&#x7EA6;&#x5B9A;&#x6B63;&#x5728;&#x88AB;&#x6807;&#x51C6;&#x5316;</a>&#x3002;</blockquote><h2 id="articleHeader15">4. document.documentElement.offsetWidth/Height</h2><p>&lt;html&gt;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x3002;&#x524D;&#x9762;&#x5DF2;&#x7ECF;&#x8BA8;&#x8BBA;&#x8FC7;&lt;html&gt;&#x5143;&#x7D20;&#x7684;&#x5C3A;&#x5BF8;&#x662F;&#x5982;&#x4F55;&#x8BA1;&#x7B97;&#x7684;&#x4E86;&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&lt;html&gt;&#x7684;&#x5BBD;&#x5EA6;&#x59CB;&#x7EC8;&#x4E0E;Layout Viewport&#x5BBD;&#x5EA6;&#x76F8;&#x540C;&#x3002;<strong>&#x5355;&#x4F4D;&#x662F;CSS&#x50CF;&#x7D20;</strong>&#x3002;&lt;html&gt;&#x5143;&#x7D20;&#x7684;&#x9AD8;&#x5EA6;&#x7531;&#x5185;&#x5BB9;&#x6491;&#x5F00;&#x3002;</p><h2 id="articleHeader16">5. window.pageXOffset/pageYOffset</h2><p>&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;&#xFF0C;&#x63CF;&#x8FF0;visual viewport&#x5DF2;&#x7ECF;&#x5411;&#x53F3;&#x3001;&#x5411;&#x4E0B;&#x6EDA;&#x52A8;&#x4E86;&#x591A;&#x5C11;&#x4E2A;&#x50CF;&#x7D20;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;visual viewport&#x76F8;&#x5BF9;&#x4E8E;layout viewport&#x7684;&#x504F;&#x79FB;&#x503C;&#x3002;<strong>&#x5355;&#x4F4D;&#x662F;CSS&#x50CF;&#x7D20;</strong>&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbhaN5?w=500&amp;h=429" src="https://static.alili.tech/img/bVbhaN5?w=500&amp;h=429" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x6709;1&#x4E2A;&#x522B;&#x540D;&#xFF08;&#x524D;&#x8005;&#x7684;&#x517C;&#x5BB9;&#x6027;&#x66F4;&#x597D;&#x4E9B;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.pageXOffset == window.scrollX; // always true
window.pageYOffset == window.scrollY; // always true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.pageXOffset == <span class="hljs-built_in">window</span>.scrollX; <span class="hljs-comment">// always true</span>
<span class="hljs-built_in">window</span>.pageYOffset == <span class="hljs-built_in">window</span>.scrollY; <span class="hljs-comment">// always true</span></code></pre><p>&#x6B64;&#x5916;&#xFF0C;&#x7531;&#x4E8E;Element&#x4E0A;&#x5C31;&#x6709;&#x83B7;&#x53D6;&#x5185;&#x5BB9;&#x6EDA;&#x52A8;&#x7684;<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft" rel="nofollow noreferrer" target="_blank">scrollLeft</a>&#x3001;<a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop" rel="nofollow noreferrer" target="_blank">scrollTop</a>&#x5C5E;&#x6027;&#xFF08;&#x6240;&#x6709;Element&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xFF09;&#xFF0C;&#x56E0;&#x6B64;&#x8FD8;&#x6709;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.pageXOffset === document.documentElement.scrollLeft; // always true
window.pageYOffset === document.documentElement.scrollTop; // always true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.pageXOffset === <span class="hljs-built_in">document</span>.documentElement.scrollLeft; <span class="hljs-comment">// always true</span>
<span class="hljs-built_in">window</span>.pageYOffset === <span class="hljs-built_in">document</span>.documentElement.scrollTop; <span class="hljs-comment">// always true</span></code></pre><blockquote>&#x5F53;&#x7528;&#x6237;&#x8FDB;&#x884C;&#x7F29;&#x653E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;<strong>&#x5C3D;&#x91CF;</strong>&#x4FDD;&#x8BC1;&#xFF1A;&#x539F;&#x5148;&#x5728;&#x5185;&#x5BB9;&#x533A;&#x9876;&#x90E8;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5728;&#x7F29;&#x653E;&#x4EE5;&#x540E;&#x4F9D;&#x7136;&#x5728;&#x5185;&#x5BB9;&#x533A;&#x9876;&#x90E8;&#xFF0C;&#x770B;&#x4EE5;&#x4E0B;&#x4F8B;&#x5B50;&#xFF1A;<br>&#x653E;&#x5927;&#x524D;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhaOc?w=1240&amp;h=775" src="https://static.alili.tech/img/bVbhaOc?w=1240&amp;h=775" alt="&#x653E;&#x5927;&#x524D;" title="&#x653E;&#x5927;&#x524D;" style="cursor:pointer"></span><br>&#x653E;&#x5927;&#x540E;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhaOe?w=1240&amp;h=775" src="https://static.alili.tech/img/bVbhaOe?w=1240&amp;h=775" alt="&#x653E;&#x5927;&#x540E;" title="&#x653E;&#x5927;&#x540E;" style="cursor:pointer"></span><br>&#x539F;&#x672C;&#x6570;&#x5B57;3&#x5728;&#x9876;&#x90E8;&#xFF0C;&#x653E;&#x5927;&#x540E;3&#x4F9D;&#x7136;&#x5728;&#x9876;&#x90E8;&#x3002;window.pageYOffset<strong>&#x5927;&#x81F4;&#x76F8;&#x540C;</strong>&#x3002;&#x5927;&#x81F4;&#x76F8;&#x540C;&#x7684;&#x539F;&#x56E0;&#x662F;CSS&#x50CF;&#x7D20;&#x6570;&#x91CF;&#x4E0D;&#x968F;&#x7740;&#x7F29;&#x653E;&#x800C;&#x53D8;&#x5316;&#xFF0C;<strong>&#x539F;&#x672C;&#x5728;&#x4E0A;&#x65B9;&#x7684;&#x5185;&#x5BB9;&#x9AD8;&#x5EA6;&#x6709;&#x591A;&#x5C11;&#x4E2A;CSS&#x50CF;&#x7D20;&#xFF0C;&#x653E;&#x7F29;&#x4EE5;&#x540E;&#x4F9D;&#x7136;&#x662F;&#x591A;&#x5C11;&#x4E2A;CSS&#x50CF;&#x7D20;</strong>&#x3002;&#x81F3;&#x4E8E;<strong>&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x662F;&#x5B8C;&#x5168;&#x76F8;&#x540C;</strong>&#xFF0C;&#x662F;&#x56E0;&#x4E3A;<em>&quot;&#x539F;&#x5148;&#x5728;&#x5185;&#x5BB9;&#x533A;&#x9876;&#x90E8;&#x7684;&#x5143;&#x7D20;&#xFF0C;&#x5728;&#x7F29;&#x653E;&#x4EE5;&#x540E;&#x4F9D;&#x7136;&#x5728;&#x5185;&#x5BB9;&#x533A;&#x9876;&#x90E8;&quot;</em>&#x8FD9;&#x4E00;&#x673A;&#x5236;&#x65E0;&#x6CD5;&#x5B8C;&#x7F8E;&#x5730;&#x505A;&#x5230;&#x3002;</blockquote><h1 id="articleHeader17">&#x76F8;&#x5173;&#x89C4;&#x8303;&#x7684;&#x8FDB;&#x5C55;</h1><p>&#x4E00;&#x4E9B;&#x6BD4;css2.1&#x66F4;&#x65B0;&#x7684;&#x6587;&#x6863;&#xFF08;&#x4F46;&#x662F;&#x8FD8;&#x6CA1;&#x6709;&#x6B63;&#x5F0F;&#x4F5C;&#x4E3A;Recommondation&#x89C4;&#x8303;&#xFF09;&#xFF1A;</p><ol><li><a href="https://www.w3.org/TR/CSS/" rel="nofollow noreferrer" target="_blank">CSS Snapshot</a> CSS3&#x5F00;&#x59CB;&#xFF0C;CSS&#x4E0D;&#x518D;&#x7531;&#x4E00;&#x4EFD;&#x5927;&#x800C;&#x5168;&#x7684;&#x6587;&#x6863;&#x6765;&#x5B9A;&#x4E49;&#xFF0C;&#x800C;&#x662F;&#x5206;&#x6210;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x3001;&#x7531;&#x591A;&#x4E2A;&#x6587;&#x6863;&#x6765;&#x5B9A;&#x4E49;&#xFF0C;&#x65B9;&#x4FBF;&#x5404;&#x4E2A;&#x6280;&#x672F;&#x7684;&#x72EC;&#x7ACB;&#x6F14;&#x5316;&#x3002;&#x8FD9;&#x4EFD;&#x6587;&#x6863;&#x6536;&#x96C6;&#x4E86;&#x5F53;&#x524D;&#x96B6;&#x5C5E;&#x4E8E;CSS&#x7684;&#x3001;&#x76F8;&#x5BF9;&#x7A33;&#x5B9A;&#x7684;&#x6587;&#x6863;&#x3002;</li><li><a href="https://www.w3.org/TR/css-box-3/" rel="nofollow noreferrer" target="_blank">CSS Box Model Module Level 3</a> &#x76D2;&#x6A21;&#x578B;&#x6587;&#x6863;&#x3002;<a href="https://www.w3.org/TR/css-box-3/#changes-since-css-level-2" rel="nofollow noreferrer" target="_blank">&#x8BE5;&#x6587;&#x6863;&#x7684;&#x5185;&#x5BB9;&#x4E0E;CSS2.1&#x76F8;&#x6BD4;&#x6CA1;&#x6709;&#x53D8;&#x5316;</a>&#x3002;</li><li><a href="https://www.w3.org/TR/css-position-3/" rel="nofollow noreferrer" target="_blank">CSS Positioned Layout Module Level 3</a> &#x5E03;&#x5C40;&#x3001;&#x5C42;&#x53E0;&#x6587;&#x6863;&#x3002;</li><li><a href="https://www.w3.org/TR/css-display-3/" rel="nofollow noreferrer" target="_blank">CSS Display Module Level 3</a> CSS formatting box tree&#x6587;&#x6863;&#x3002;</li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【响应式布局】initial containing block、viewport以及相关尺寸

## 原文链接
[https://segmentfault.com/a/1190000016432896](https://segmentfault.com/a/1190000016432896)


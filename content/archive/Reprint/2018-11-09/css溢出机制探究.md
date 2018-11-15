---
title: css溢出机制探究
hidden: true
categories: reprint
slug: 1a886eaf
date: 2018-11-09 02:30:05
---

{{< raw >}}
<h1 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;&#x6DF1;&#x5165;&#x5B66;&#x4E60;CSS&#x6EA2;&#x51FA;&#x673A;&#x5236;&#xFF1F;</h1><p>&#x5728;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5185;&#x5BB9;&#x6EA2;&#x51FA;&#x662F;&#x7ECF;&#x5E38;&#x89C1;&#x5230;&#x7684;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x6DF1;&#x5165;&#x4E86;&#x89E3;&#x8FD9;&#x4E2A;&#x673A;&#x5236;&#xFF0C;&#x4F60;&#x7ECF;&#x5E38;&#x4F1A;&#x78B0;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#xFF1A;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x4E2A;&#x5143;&#x7D20;&#x6CA1;&#x6709;&#x53D7;&#x5230;&#x7956;&#x5148;&#x5143;&#x7D20;&#x7684;overflow:hidden&#x7684;&#x5F71;&#x54CD;&#xFF1F;&#x8FD9;&#x91CC;&#x51FA;&#x73B0;&#x7684;&#x6EDA;&#x52A8;&#x6761;&#x662F;&#x54EA;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#xFF1F;&#x5982;&#x4F55;&#x6D88;&#x9664;&#x8FD9;&#x4E2A;&#x6EDA;&#x52A8;&#x6761;&#xFF1F;&#x5982;&#x4F55;&#x5728;&#x6307;&#x5B9A;&#x7684;&#x5143;&#x7D20;&#x4E0A;&#x589E;&#x52A0;&#x6EDA;&#x52A8;&#x529F;&#x80FD;&#xFF1F;<br>&#x5728;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x4F1A;&#x4ECE;CSS&#x6807;&#x51C6;&#x51FA;&#x53D1;&#xFF0C;&#x8BA8;&#x8BBA;CSS&#x6EA2;&#x51FA;&#x673A;&#x5236;&#x7684;&#x7EC6;&#x8282;&#x3002;</p><h1 id="articleHeader1">&#x6EA2;&#x51FA;</h1><p>&#x5F53;&#x4E00;&#x4E2A;&#x76D2;&#x5B50;&#xFF08;<a href="https://www.w3.org/TR/CSS2/visuren.html#block-boxes" rel="nofollow noreferrer" target="_blank">block container box</a>&#xFF09;&#x7684;<strong>&#x5185;&#x5BB9;</strong>&#xFF08;&#x5B50;&#x5143;&#x7D20;&#x3001;&#x5B59;&#x5B50;&#x5143;&#x7D20;&#x7B49;&#x540E;&#x88D4;&#xFF09;&#x8D85;&#x8FC7;&#x76D2;&#x5B50;&#x672C;&#x8EAB;&#x7684;&#x5927;&#x5C0F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x4F1A;&#x51FA;&#x73B0;&#x6EA2;&#x51FA;&#x3002;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;CSS&#x5C5E;&#x6027;<a href="https://www.w3.org/TR/CSS2/visufx.html#propdef-overflow" rel="nofollow noreferrer" target="_blank">overflow</a>&#x51B3;&#x5B9A;&#x5982;&#x4F55;&#x5904;&#x7406;&#x6EA2;&#x51FA;&#x3002;&#x8FD9;&#x4E2A;css&#x5C5E;&#x6027;&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x4E0D;&#x8BA8;&#x8BBA;&#x4E86;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x6307;&#x51FA;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x51E0;&#x70B9;&#xFF1A;</p><ul><li>overflow&#x4F1A;&#x5F71;&#x54CD;&#x6240;&#x5728;&#x5143;&#x7D20;&#x7684;<strong>&#x6240;&#x6709;&#x5185;&#x5BB9;&#x7684;&#x88C1;&#x526A;&#x3001;&#x6EDA;&#x52A8;</strong>&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x4F8B;&#x5916;&#xFF1A;&quot;It affects the clipping of all of the element&apos;s content except any <strong>descendant elements (and their respective content and descendants)</strong> whose <strong><a href="https://www.w3.org/TR/CSS2/visudet.html#containing-block-details" rel="nofollow noreferrer" target="_blank">containing block</a></strong> is the <strong><a href="https://www.w3.org/TR/CSS2/visuren.html#viewport" rel="nofollow noreferrer" target="_blank">viewport</a> or an ancestor</strong> of the element.&quot; &#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;overflow&#x7684;<strong>&#x6240;&#x5728;&#x5143;&#x7D20;</strong>&#x5FC5;&#x987B;&#x662F;<strong>&#x5185;&#x5BB9;&#x5143;&#x7D20;</strong>&#x7684;&#x76F4;&#x63A5;&#x6216;&#x95F4;&#x63A5;containing block&#xFF0C;&#x8FD9;&#x65F6;overflow&#x5C5E;&#x6027;&#x624D;&#x4F1A;&#x5F71;&#x54CD;&#x8FD9;&#x4E2A;<strong>&#x5185;&#x5BB9;&#x5143;&#x7D20;</strong>&#x3002;&#x6BD4;&#x5982;<code>&lt;A&gt;&lt;B&gt;&lt;C&gt;&lt;C/&gt;&lt;B/&gt;&lt;A/&gt;</code>&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;B&#x7684;overflow&#x4F1A;&#x5F71;&#x54CD;C&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;C&#x662F;&#x76F8;&#x5BF9;&#x4E8E;viewport&#x6216;&#x8005;A&#x5B9A;&#x4F4D;&#x7684;&#xFF08;&#x6BD4;&#x5982;&#x4F7F;&#x7528;&#x4E86;position:absolute&#xFF09;&#xFF0C;&#x90A3;&#x4E48;C&#x7684;&#x663E;&#x793A;&#x5C31;&#x4E0D;&#x53D7;B&#x7684;&#x88C1;&#x526A;&#x3001;&#x6EDA;&#x52A8;&#x7684;&#x5F71;&#x54CD;&#x3002;</li><li>&#x5F53;&#x9700;&#x8981;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6EDA;&#x52A8;&#x6761;&#x4F1A;&#x653E;&#x5728;border&#x4E0E;padding&#x4E4B;&#x95F4;&#x3002;&#x7236;&#x5143;&#x7D20;&#x4EA7;&#x751F;&#x6EDA;&#x52A8;&#x6761;&#x4EE5;&#x540E;&#xFF0C;&#x5B83;&#x4EA7;&#x751F;&#x7684;<a href="https://www.w3.org/TR/CSS2/visudet.html#containing-block-details" rel="nofollow noreferrer" target="_blank">containing block</a>&#x7684;&#x5C3A;&#x5BF8;&#x4F1A;&#x51CF;&#x5C11;&#xFF0C;&#x4EE5;&#x4FBF;&#x7ED9;&#x6EDA;&#x52A8;&#x6761;&#x817E;&#x51FA;&#x7A7A;&#x95F4;&#x3002;</li><li><a href="https://www.w3.org/TR/css-position-3/#vp" rel="nofollow noreferrer" target="_blank">CSS3&#x6587;&#x6863;</a>&#xFF1A;&quot;When the viewport is smaller than the area of the <strong><a href="https://www.w3.org/TR/CSS2/intro.html#canvas" rel="nofollow noreferrer" target="_blank">canvas</a></strong> on which the document is rendered, the user agent may offer a scrolling mechanism.&quot; &#x5373;&#xFF0C;visual viewport&#x53EF;&#x4EE5;&#x62E5;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#x3002;</li><li>&#x5728;&lt;html&gt;&#x548C;&lt;body&gt;&#x4E0A;&#x7684;overflow&#x5C5E;&#x6027;&#x5B58;&#x5728;<strong>&#x5192;&#x6CE1;</strong>&#x73B0;&#x8C61;: &quot;UAs must apply the &apos;overflow&apos; property set on the <strong>root element</strong> to the <strong>viewport</strong>. When the root element is an HTML &quot;HTML&quot; element or an XHTML &quot;html&quot; element, and that element has an HTML <strong>&quot;BODY&quot; element</strong> or an XHTML &quot;body&quot; element as a child, user agents must <strong>instead</strong> apply the &apos;overflow&apos; property from the first such child element to the <strong>viewport</strong>, <strong>if the value on the root element is &apos;visible&apos;</strong>. The &apos;visible&apos; value when used for the <strong>viewport</strong> must be interpreted as <strong>&apos;auto&apos;</strong>. The element from which the value is propagated must have a used value for &apos;overflow&apos; of <strong>&apos;visible&apos;</strong>. &quot;</li></ul><p>&#x53EF;&#x4EE5;&#x63A8;&#x65AD;&#x51FA;&#xFF1A;</p><ul><li><p>&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x53EA;&#x6709;<strong>&#x5143;&#x7D20;</strong>&#x624D;&#x80FD;&#x62E5;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#xFF08;&#x66F4;&#x51C6;&#x786E;&#x5730;&#x8BF4;&#xFF0C;&#x53EA;&#x6709;&#x4EA7;&#x751F;<a href="https://www.w3.org/TR/CSS2/visuren.html#block-boxes" rel="nofollow noreferrer" target="_blank">block container box</a>&#x7684;<strong>&#x5143;&#x7D20;</strong>&#x624D;&#x80FD;&#x62E5;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#xFF09;&#x3002;&#x4F46;visual viewport&#x662F;&#x4E2A;&#x4F8B;&#x5916;&#x3002;&#x5B83;&#x867D;&#x7136;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x53EF;&#x4EE5;&#x62E5;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#x3002;&#x5982;&#x679C;&#x5728;&lt;html&gt;&#x548C;&lt;body&gt;&#x4E0A;&#x90FD;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;overflow&#x5C5E;&#x6027;&#x800C;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x503C;visible&#xFF08;&#x5927;&#x90E8;&#x5206;&#x573A;&#x666F;&#x90FD;&#x662F;&#x8FD9;&#x6837;&#xFF09;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;visual viewport&#x7684;overflow&#x5C31;&#x662F;auto&#xFF1A;&#x5F53;&#x7F51;&#x9875;&#x4E2D;&#x6709;&#x5185;&#x5BB9;&#x8D85;&#x51FA;visual viewport&#x65F6;&#xFF0C;visual viewport&#x4E0A;&#x4F1A;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761;&#x3002;</p><blockquote>&#x5173;&#x4E8E;viewport&#x7684;&#x8BA8;&#x8BBA;&#x5728;<a href="https://segmentfault.com/a/1190000016432896">&#x3010;&#x54CD;&#x5E94;&#x5F0F;&#x5E03;&#x5C40;&#x3011;initial containing block&#x3001;viewport&#x4EE5;&#x53CA;&#x76F8;&#x5173;&#x5C3A;&#x5BF8;</a>&#x3002;</blockquote></li><li>&lt;html&gt;&#x7684;&#x6700;&#x7EC8;overflow&#x6C38;&#x8FDC;&#x90FD;&#x662F;visible&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&lt;html&gt;&#x5143;&#x7D20;&#x6C38;&#x8FDC;&#x4E0D;&#x53EF;&#x80FD;&#x62E5;&#x6709;&#x6EDA;&#x52A8;&#x6761;&#x3002;</li><li>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8981;&#x4E3A;&lt;body&gt;&#x8BBE;&#x7F6E;&#x975E;visible&#x7684;overflow&#xFF0C;&#x9700;&#x8981;&#x5148;&#x4E3A;&lt;html&gt;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x975E;visible&#x7684;&#x503C;&#x6765;&#x5192;&#x6CE1;&#xFF0C;&#x4ECE;&#x800C;&lt;body&gt;&#x7684;overflow&#x4E0D;&#x4F1A;&#x88AB;&#x5192;&#x6CE1;&#x3002;</li></ul><h1 id="articleHeader2">&#x5C0F;&#x7EC3;&#x4E60;</h1><p>&#x5C0F;&#x7EC3;&#x4E60;&#xFF1A;&#x5229;&#x7528;&#x4EE5;&#x4E0A;&#x539F;&#x7406;&#xFF0C;&#x4F7F;visual viewport&#x548C;&lt;body&gt;&#x90FD;&#x62E5;&#x6709;&#x6A2A;&#x3001;&#x7AD6;&#x6EDA;&#x52A8;&#x6761;&#xFF0C;&#x603B;&#x5171;4&#x4E2A;&#x6EDA;&#x52A8;&#x6761;&#x3002;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;overflow: scroll&#xFF08;&#x8FD9;&#x6837;&#x5C31;&#x592A;&#x7B80;&#x5355;&#x4E86;&#xFF09;&#x3002;<br>&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x4F7F;visual viewport&#x548C;&lt;body&gt;&#x7684;&#x6700;&#x7EC8;overflow&#x503C;&#x90FD;&#x4E3A;auto&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761;&#x3002;</li><li>&#x89E6;&#x53D1;visual viewport&#x548C;&lt;body&gt;&#x7684;&#x6EA2;&#x51FA;&#x3002;&#x901A;&#x8FC7;&#x3010;&#x4E3A;&#x5185;&#x5BB9;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x66F4;&#x5927;&#x7684;&#x5C3A;&#x5BF8;&#x3011;&#x6765;&#x505A;&#x5230;&#x3002;</li></ol><p>&#x4EE3;&#x7801;+&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
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

    html {
      /* &#x4F7F;html&#x7684;&#x5C3A;&#x5BF8;&#x59CB;&#x7EC8;&#x4E0E;visual viewport&#x76F8;&#x540C;&#xFF08;&#x5373;&#x4F7F;&#x4F60;&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5927;&#x5C0F;&#xFF09;&#xFF0C;&#x4ECE;&#x800C;body&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6BD4;visual viewport&#x8FD8;&#x5927;&#x7684;&#x5C3A;&#x5BF8;(110%)&#x3002;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */
      width: 100%;
      height: 100%;
      /* &#x975E;visible&#x7684;&#x503C;&#x5192;&#x6CE1;&#x5230;visual viewport&#x4E0A;&#xFF0C;&#x4F7F;visual viewport&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */
      overflow: auto;
      border: 15px solid red;
    }

    body {
      /* &#x4F7F;&#x5F97;body&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */
      overflow: auto;
      /* body&#x6EA2;&#x51FA;html&#xFF0C;&#x4ECE;&#x800C;&#x6EA2;&#x51FA;initial containning block&#xFF0C;&#x4ECE;&#x800C;&#x6EA2;&#x51FA;visual viewport&#xFF0C;&#x4F7F;&#x5F97;visual viewport&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761;&#x3002;
      &#x5F53;&#x7136;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5F88;&#x591A;&#x5176;&#x4ED6;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x89E6;&#x53D1;visual viewport&#x7684;&#x6EA2;&#x51FA;&#xFF0C;&#x6BD4;&#x5982;&#x589E;&#x5927;html&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005;&#x5728;body&#x4E2D;&#x5F04;&#x4E00;&#x4E2A;position: absolute&#x7684;div */
      width: 110%;
      height: 110%;
      border: 15px solid green;
    }

    main {
      /* main&#x6EA2;&#x51FA;body&#xFF0C;&#x4F7F;&#x5F97;body&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */
      width: 110%;
      height: 110%;
      border: 15px solid blue;
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
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1, user-scalable=no&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">box-sizing</span>: border-box;
    }

    <span class="hljs-selector-tag">html</span> {
      <span class="hljs-comment">/* &#x4F7F;html&#x7684;&#x5C3A;&#x5BF8;&#x59CB;&#x7EC8;&#x4E0E;visual viewport&#x76F8;&#x540C;&#xFF08;&#x5373;&#x4F7F;&#x4F60;&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5927;&#x5C0F;&#xFF09;&#xFF0C;&#x4ECE;&#x800C;body&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6BD4;visual viewport&#x8FD8;&#x5927;&#x7684;&#x5C3A;&#x5BF8;(110%)&#x3002;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-comment">/* &#x975E;visible&#x7684;&#x503C;&#x5192;&#x6CE1;&#x5230;visual viewport&#x4E0A;&#xFF0C;&#x4F7F;visual viewport&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */</span>
      <span class="hljs-attribute">overflow</span>: auto;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid red;
    }

    <span class="hljs-selector-tag">body</span> {
      <span class="hljs-comment">/* &#x4F7F;&#x5F97;body&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */</span>
      <span class="hljs-attribute">overflow</span>: auto;
      <span class="hljs-comment">/* body&#x6EA2;&#x51FA;html&#xFF0C;&#x4ECE;&#x800C;&#x6EA2;&#x51FA;initial containning block&#xFF0C;&#x4ECE;&#x800C;&#x6EA2;&#x51FA;visual viewport&#xFF0C;&#x4F7F;&#x5F97;visual viewport&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761;&#x3002;
      &#x5F53;&#x7136;&#xFF0C;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5F88;&#x591A;&#x5176;&#x4ED6;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x89E6;&#x53D1;visual viewport&#x7684;&#x6EA2;&#x51FA;&#xFF0C;&#x6BD4;&#x5982;&#x589E;&#x5927;html&#x5143;&#x7D20;&#xFF0C;&#x6216;&#x8005;&#x5728;body&#x4E2D;&#x5F04;&#x4E00;&#x4E2A;position: absolute&#x7684;div */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">110%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">110%</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid green;
    }

    <span class="hljs-selector-tag">main</span> {
      <span class="hljs-comment">/* main&#x6EA2;&#x51FA;body&#xFF0C;&#x4F7F;&#x5F97;body&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">110%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">110%</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid blue;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbg5HU?w=1920&amp;h=948" src="https://static.alili.tech/img/bVbg5HU?w=1920&amp;h=948" alt="" title="" style="cursor:pointer;display:inline"></span></p><blockquote>&#x81EA;&#x5DF1;&#x5728;chrome&#x4E2D;&#x6253;&#x5F00;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#xFF0C;&#x80FD;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x5730;&#x770B;&#x51FA;&#x662F;&#x600E;&#x4E48;&#x505A;&#x5230;&#x7684;&#x3002;</blockquote><p>&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;absolute&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6EA2;&#x51FA;initial containing block&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
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

    html {
      /* &#x4F7F;html&#x7684;&#x5C3A;&#x5BF8;&#x59CB;&#x7EC8;&#x4E0E;visual viewport&#x76F8;&#x540C;&#xFF08;&#x5373;&#x4F7F;&#x4F60;&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5927;&#x5C0F;&#xFF09;&#xFF0C;&#x4ECE;&#x800C;body&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6BD4;visual viewport&#x8FD8;&#x5927;&#x7684;&#x5C3A;&#x5BF8;(110%)&#x3002;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */
      width: 100%;
      height: 100%;
      /* &#x975E;visible&#x7684;&#x503C;&#x5192;&#x6CE1;&#x5230;visual viewport&#x4E0A;&#xFF0C;&#x4F7F;visual viewport&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */
      overflow: auto;
      border: 15px solid red;
    }

    body {
      /* &#x4F7F;&#x5F97;body&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */
      overflow: auto;
      /* &#x4E3A;body&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5C3A;&#x5BF8;&#xFF0C;&#x4ECE;&#x800C;main&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6BD4;body&#x8FD8;&#x5927;&#x7684;&#x5C3A;&#x5BF8;(110%)&#x3002;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */
      height: 100%;
      border: 15px solid green;
    }

    main {
      /* main&#x6EA2;&#x51FA;body&#xFF0C;&#x4F7F;&#x5F97;body&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */
      width: 110%;
      height: 110%;
      border: 15px solid blue;
    }

    .abs {
      /* &#x901A;&#x8FC7;absolute&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6EA2;&#x51FA;initial containing block&#xFF0C;&#x4ECE;&#x800C;&#x6EA2;&#x51FA;viewport */
      position: absolute;
      width: 100px;
      height: 100px;
      right: -100px;
      bottom: -100px;
      border: 15px solid blueviolet;
    }
  &lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;main&gt;
  &lt;/main&gt;

  &lt;div class=&quot;abs&quot;&gt;&lt;/div&gt;
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

    <span class="hljs-selector-tag">html</span> {
      <span class="hljs-comment">/* &#x4F7F;html&#x7684;&#x5C3A;&#x5BF8;&#x59CB;&#x7EC8;&#x4E0E;visual viewport&#x76F8;&#x540C;&#xFF08;&#x5373;&#x4F7F;&#x4F60;&#x7F29;&#x653E;&#x3001;&#x8C03;&#x6574;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x7684;&#x5927;&#x5C0F;&#xFF09;&#xFF0C;&#x4ECE;&#x800C;body&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6BD4;visual viewport&#x8FD8;&#x5927;&#x7684;&#x5C3A;&#x5BF8;(110%)&#x3002;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-comment">/* &#x975E;visible&#x7684;&#x503C;&#x5192;&#x6CE1;&#x5230;visual viewport&#x4E0A;&#xFF0C;&#x4F7F;visual viewport&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */</span>
      <span class="hljs-attribute">overflow</span>: auto;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid red;
    }

    <span class="hljs-selector-tag">body</span> {
      <span class="hljs-comment">/* &#x4F7F;&#x5F97;body&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */</span>
      <span class="hljs-attribute">overflow</span>: auto;
      <span class="hljs-comment">/* &#x4E3A;body&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5C3A;&#x5BF8;&#xFF0C;&#x4ECE;&#x800C;main&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x6BD4;body&#x8FD8;&#x5927;&#x7684;&#x5C3A;&#x5BF8;(110%)&#x3002;
      &#x5BF9;&#x4E8E;&#x9ED8;&#x8BA4;&#x4E3A;block&#x7684;&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x7701;&#x7565;width: 100%; */</span>
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid green;
    }

    <span class="hljs-selector-tag">main</span> {
      <span class="hljs-comment">/* main&#x6EA2;&#x51FA;body&#xFF0C;&#x4F7F;&#x5F97;body&#x51FA;&#x73B0;&#x6EDA;&#x52A8;&#x6761; */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">110%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">110%</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid blue;
    }

    <span class="hljs-selector-class">.abs</span> {
      <span class="hljs-comment">/* &#x901A;&#x8FC7;absolute&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6EA2;&#x51FA;initial containing block&#xFF0C;&#x4ECE;&#x800C;&#x6EA2;&#x51FA;viewport */</span>
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">right</span>: -<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">100px</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid blueviolet;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;abs&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbg5KJ?w=1920&amp;h=949" src="https://static.alili.tech/img/bVbg5KJ?w=1920&amp;h=949" alt="" title="" style="cursor:pointer;display:inline"></span></p><blockquote>&#x81EA;&#x5DF1;&#x5728;chrome&#x4E2D;&#x6253;&#x5F00;&#x4EE5;&#x4E0A;&#x4EE3;&#x7801;&#xFF0C;&#x80FD;&#x66F4;&#x52A0;&#x6E05;&#x6670;&#x5730;&#x770B;&#x51FA;&#x662F;&#x600E;&#x4E48;&#x505A;&#x5230;&#x7684;&#x3002;</blockquote><h1 id="articleHeader3">&#x5982;&#x4F55;&#x770B;&#x51FA;&#x67D0;&#x4E2A;&#x6EDA;&#x52A8;&#x6761;&#x662F;&#x5C5E;&#x4E8E;&#x54EA;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#xFF1F;</h1><p>&#x901A;&#x8FC7;Chrome DevTools&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x6240;&#x5C5E;&#x5143;&#x7D20;&#x3002;<br>&#x524D;&#x9762;&#x5DF2;&#x7ECF;&#x8BF4;&#x8FC7;&#xFF0C;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x4F4D;&#x7F6E;&#x5728;&#x5143;&#x7D20;&#x7684;border&#x4E0E;padding&#x4E4B;&#x95F4;&#x3002;&#x5F53;&#x4F60;&#x4F7F;&#x7528;Chrome DevTools&#x9009;&#x4E2D;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#xFF0C;&#x53D1;&#x73B0;&#x6EDA;&#x52A8;&#x6761;&#x6070;&#x597D;&#x5728;&#x9AD8;&#x4EAE;&#x533A;&#x57DF;&#xFF08;border&#xFF09;&#x5185;&#x90E8;&#x65F6;&#xFF0C;&#x6EDA;&#x52A8;&#x6761;&#x5C31;&#x5C5E;&#x4E8E;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbg6Ja?w=1920&amp;h=951" src="https://static.alili.tech/img/bVbg6Ja?w=1920&amp;h=951" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x8981;&#x5224;&#x65AD;&#x6EDA;&#x52A8;&#x6761;&#x662F;&#x5426;&#x5C5E;&#x4E8E;visual viewport&#xFF0C;&#x9996;&#x5148;&#x5148;&#x5C06;&#x53F3;&#x8FB9;&#x3001;&#x4E0B;&#x8FB9;&#x7684;&#x6EDA;&#x52A8;&#x6761;&#x5206;&#x522B;&#x6EDA;&#x52A8;&#x5230;&#x6700;&#x4E0B;&#x3001;&#x6700;&#x53F3;&#xFF08;&#x8FD9;&#x4E00;&#x6B65;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x5B83;&#x4FDD;&#x8BC1;&#x6CA1;&#x6709;&#x5185;&#x5BB9;&#x85CF;&#x5728;&#x6EDA;&#x52A8;&#x6761;&#x4E0B;&#x9762;&#xFF09;&#x3002;&#x7136;&#x540E;&#xFF0C;<code>Ctrl+Shift+C</code>&#x9009;&#x62E9;&#x53F3;&#x8FB9;&#x6216;&#x4E0B;&#x8FB9;&#x7684;&#x6EDA;&#x52A8;&#x6761;&#xFF0C;&#x5982;&#x679C;<strong>&#x9AD8;&#x4EAE;&#x7684;&#x533A;&#x57DF;&#x4E0D;&#x5305;&#x542B;&#x8FD9;&#x4E2A;&#x6EDA;&#x52A8;&#x6761;</strong>&#xFF0C;&#x5C31;&#x8BF4;&#x660E;&#x8FD9;&#x4E2A;&#x6EDA;&#x52A8;&#x6761;&#x4E0D;&#x5C5E;&#x4E8E;&#x4EFB;&#x4F55;&#x5143;&#x7D20;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5C5E;&#x4E8E;visual viewport&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbg6ML?w=1920&amp;h=946" src="https://static.alili.tech/img/bVbg6ML?w=1920&amp;h=946" alt="" title="" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader4">JavaScript&#x83B7;&#x53D6;&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;</h1><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br>&#x83B7;&#x53D6;&#x6216;&#x8BBE;&#x7F6E;&#x5143;&#x7D20;&#x7684;&#x5185;&#x5BB9;&#x88AB;&#x6EDA;&#x52A8;&#x7684;&#x8DDD;&#x79BB;&#x3002;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x9002;&#x7528;&#x4E8E;&#x6240;&#x6709;Element&#x3002;</p><p>&#x5982;&#x679C;&#x60F3;&#x8981;&#x83B7;&#x53D6;visual viewport&#x7684;&#x6EDA;&#x52A8;&#x8DDD;&#x79BB;&#xFF0C;&#x9664;&#x4E86;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4EE5;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x66F4;&#x591A;&#x7B49;&#x6548;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x89C1;<a href="https://segmentfault.com/a/1190000016432896#articleHeader16">&#x3010;&#x54CD;&#x5E94;&#x5F0F;&#x5E03;&#x5C40;&#x3011;initial containing block&#x3001;viewport&#x4EE5;&#x53CA;&#x76F8;&#x5173;&#x5C3A;&#x5BF8;</a>&#x3002;</p><h1 id="articleHeader5">&#x53C2;&#x8003;&#x8D44;&#x6599;</h1><ol><li><a href="https://www.w3.org/TR/CSS2/visufx.html#overflow" rel="nofollow noreferrer" target="_blank">css2.1&#x6807;&#x51C6;</a>&#x3002;</li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css溢出机制探究

## 原文链接
[https://segmentfault.com/a/1190000016431062](https://segmentfault.com/a/1190000016431062)


---
title: 学习Less-看这篇就够了
reprint: true
categories: reprint
abbrlink: '38415731'
date: 2018-10-30 02:30:12
---

{{% raw %}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><h3 id="articleHeader1">CSS&#x7684;&#x77ED;&#x677F;</h3><p>&#xA0;&#xA0;&#xA0;&#xA0;&#x4F5C;&#x4E3A;&#x524D;&#x7AEF;&#x5B66;&#x4E60;&#x8005;&#x7684;&#x6211;&#x4EEC; &#x6216;&#x591A;&#x6216;&#x5C11;&#x90FD;&#x8981;&#x5B66;&#x4E9B; CSS &#xFF0C;&#x5B83;&#x4F5C;&#x4E3A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x7684;&#x4E09;&#x5927;&#x57FA;&#x77F3;&#x4E4B;&#x4E00;&#xFF0C;&#x65F6;&#x523B;&#x5F15;&#x9886;&#x7740; Web &#x7684;&#x53D1;&#x5C55;&#x6F6E;&#x5411;&#x3002; &#x800C; CSS &#x4F5C;&#x4E3A;&#x4E00;&#x95E8;&#x6807;&#x8BB0;&#x6027;&#x8BED;&#x8A00;&#xFF0C;&#x53EF;&#x80FD; &#x7ED9;&#x521D;&#x5B66;&#x8005;&#x7B2C;&#x4E00;&#x5370;&#x8C61; &#x5C31;&#x662F;&#x7B80;&#x5355;&#x6613;&#x61C2;&#xFF0C;&#x6BEB;&#x65E0;&#x903B;&#x8F91;&#xFF0C;&#x4E0D;&#x50CF;&#x7F16;&#x7A0B;&#x8BE5;&#x6709;&#x7684;&#x6837;&#x5B50;&#x3002;&#x5728;&#x8BED;&#x6CD5;&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x6BCF;&#x5F53;&#x65B0;&#x5C5E;&#x6027;&#x63D0;&#x51FA;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x517C;&#x5BB9;&#x53C8;&#x4F1A;&#x9A6C;&#x4E0A;&#x53D8;&#x6210;&#x7ECA;&#x811A;&#x77F3;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4; CSS &#x77ED;&#x677F;&#x4E0D;&#x5BB9;&#x5FFD;&#x89C6;&#x3002;</p><p>&#xA0;&#xA0;&#xA0;&#xA0;&#x95EE;&#x9898;&#x7684;&#x8BDE;&#x751F;&#x5F80;&#x5F80;&#x4F34;&#x968F;&#x7740;&#x6280;&#x672F;&#x7684;&#x5174;&#x8D77;&#xFF0C; &#x5728; Web &#x53D1;&#x5C55;&#x7684;&#x8FD9;&#x51E0;&#x5E74;&#xFF0C; &#x4E3A;&#x4E86;&#x8BA9; CSS &#x5BCC;&#x6709;&#x903B;&#x8F91;&#x6027;&#xFF0C;&#x77ED;&#x677F;&#x4E0D;&#x90A3;&#x4E48;&#x4E25;&#x91CD;&#xFF0C;&#x6D8C;&#x73B0;&#x51FA;&#x4E86; &#x4E00;&#x4E9B;&#x795E;&#x5947;&#x7684;&#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;&#x3002; &#x5B83;&#x4EEC;&#x8BA9; CSS &#x5F7B;&#x5E95;&#x53D8;&#x6210;&#x4E00;&#x95E8; &#x53EF;&#x4EE5;&#x4F7F;&#x7528; &#x53D8;&#x91CF; &#x3001;&#x5FAA;&#x73AF; &#x3001;&#x7EE7;&#x627F; &#x3001;&#x81EA;&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;&#x7B49;&#x591A;&#x79CD;&#x7279;&#x6027;&#x7684;&#x6807;&#x8BB0;&#x8BED;&#x8A00;&#xFF0C;&#x903B;&#x8F91;&#x6027;&#x5F97;&#x4EE5;&#x5927;&#x5927;&#x589E;&#x5F3A;&#x3002;</p><h3 id="articleHeader2">&#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;&#x7684;&#x8BDE;&#x751F;</h3><p>&#x5176;&#x4E2D; &#x5C31;&#x6211;&#x6240;&#x77E5;&#x7684;&#x6709;&#x4E09;&#x95E8;&#x8BED;&#x8A00;&#xFF1A;Sass&#x3001;Less &#x3001;Stylus &#x3002;</p><ol><li>Sass &#x8BDE;&#x751F;&#x4E8E; 2007 &#x5E74;&#xFF0C;Ruby &#x7F16;&#x5199;&#xFF0C;&#x5176;&#x8BED;&#x6CD5;&#x529F;&#x80FD;&#x90FD;&#x5341;&#x5206;&#x5168;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4; &#x5B83;&#x5B8C;&#x5168;&#x628A; CSS &#x53D8;&#x6210;&#x4E86;&#x4E00;&#x95E8;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x3002;&#x53E6;&#x5916; &#x5728;&#x56FD;&#x5185;&#x5916;&#x90FD;&#x5F88;&#x53D7;&#x6B22;&#x8FCE;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x7684;&#x9879;&#x76EE;&#x56E2;&#x961F;&#x5F88;&#x662F;&#x5F3A;&#x5927; &#xFF0C;&#x662F;&#x4E00;&#x6B3E;&#x5341;&#x5206;&#x4F18;&#x79C0;&#x7684;&#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;&#x3002;</li><li>Stylus &#x8BDE;&#x751F;&#x4E8E; 2010 &#x5E74;&#xFF0C;&#x6765;&#x81EA; Node.js &#x793E;&#x533A;&#xFF0C;&#x8BED;&#x6CD5;&#x529F;&#x80FD;&#x4E5F;&#x548C; Sass &#x4E0D;&#x76F8;&#x4F2F;&#x4EF2;&#xFF0C;&#x662F;&#x4E00;&#x95E8;&#x5341;&#x5206;&#x72EC;&#x7279;&#x7684;&#x521B;&#x65B0;&#x578B;&#x8BED;&#x8A00;&#x3002;</li><li>Less &#x8BDE;&#x751F;&#x4E8E; 2009 &#x5E74;&#xFF0C;&#x53D7;Sass&#x7684;&#x5F71;&#x54CD;&#x521B;&#x5EFA;&#x7684;&#x4E00;&#x4E2A;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x3002; &#x5B83;&#x6269;&#x5145;&#x4E86; CSS &#x8BED;&#x8A00;&#xFF0C;&#x589E;&#x52A0;&#x4E86;&#x8BF8;&#x5982;&#x53D8;&#x91CF;&#x3001;&#x6DF7;&#x5408;&#xFF08;mixin&#xFF09;&#x3001;&#x51FD;&#x6570;&#x7B49;&#x529F;&#x80FD;&#xFF0C;&#x8BA9; CSS &#x66F4;&#x6613;&#x7EF4;&#x62A4;&#x3001;&#x65B9;&#x4FBF;&#x5236;&#x4F5C;&#x4E3B;&#x9898;&#x3001;&#x6269;&#x5145;&#xFF08;<em>&#x5F15;&#x7528;&#x4E8E;&#x5B98;&#x7F51;</em>&#xFF09;&#x3002;</li></ol><h3 id="articleHeader3">&#x9009;&#x62E9;&#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;</h3><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5341;&#x5206;&#x7EA0;&#x7ED3;&#x7684;&#x95EE;&#x9898;&#x3002;</p><p>&#x5728;&#x6211;&#x770B;&#x6765;&#xFF0C;&#x8FD9;&#x5C31;&#x597D;&#x6BD4; &#x627E;&#x5973;&#x670B;&#x53CB;&#xFF0C;&#x6709;&#x4EBA;&#x559C;&#x6B22; &#x8D24;&#x60E0;&#x5B89;&#x9759;&#x7684;&#xFF0C;&#x5C31;&#x6709;&#x4EBA;&#x559C;&#x6B22; &#x6D3B;&#x6CFC;&#x7231;&#x95F9;&#x7684;&#xFF0C;&#x5404;&#x6709;&#x5404;&#x7684;&#x7231;&#x597D;&#xFF0C;&#x53EF;&#x665A;&#x4E0A;&#x95ED;&#x706F;&#x540E; &#x5176;&#x5B9E;&#x90FD;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x4E0D;&#x7528;&#x592A;&#x8FC7;&#x7EA0;&#x7ED3;&#x3002;&#x5F53;&#x7136;&#x4E86; &#xFF0C;&#x9996;&#x5148; &#x4F60;&#x8981;&#x6709;&#x5973;&#x670B;&#x53CB;&#x3002;</p><p>&#x5728;&#x7F51;&#x4E0A;&#x8BA8;&#x8BBA;&#x770B;&#x6765;&#xFF0C;Sass &#x4E0E; Stylus &#x76F8;&#x6BD4;&#x4E8E; Less &#x529F;&#x80FD;&#x66F4;&#x4E3A;&#x4E30;&#x5BCC;&#xFF0C;&#x4F46;&#x5BF9;&#x4E8E;&#x5B66;&#x4E60;&#x6210;&#x672C;&#x4EE5;&#x53CA;&#x9002;&#x5E94;&#x65F6;&#x95F4; &#xFF0C;Less &#x7A0D;&#x80DC;&#x4E00;&#x7B79;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x6211;&#x9009;&#x62E9; Less &#x7684;&#x539F;&#x56E0;&#x3002;</p><p>Less &#x6CA1;&#x6709;&#x53BB;&#x6389;&#x4EFB;&#x4F55; CSS &#x7684;&#x529F;&#x80FD;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x73B0;&#x6709;&#x7684;&#x8BED;&#x6CD5;&#x4E0A;&#xFF0C;&#x589E;&#x6DFB;&#x4E86;&#x8BB8;&#x591A;&#x989D;&#x5916;&#x7684;&#x529F;&#x80FD;&#x7279;&#x6027;&#xFF0C;&#x6240;&#x4EE5;&#x5B66;&#x4E60; Less &#x662F;&#x4E00;&#x4EF6;&#x975E;&#x5E38;&#x8212;&#x670D;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x4E4B;&#x524D;&#x6CA1;&#x6709;&#x63A5;&#x89E6;&#x8FC7;&#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;&#xFF0C;&#x7EA0;&#x7ED3;&#x5E94;&#x8BE5;&#x5B66;&#x54EA;&#x4E00;&#x4E2A;&#xFF0C;&#x4E0D;&#x5982;&#x5148;&#x770B;&#x770B; &#x4E0B;&#x9762; Less &#x7684;&#x4ECB;&#x7ECD;&#xFF0C;&#x6211;&#x76F8;&#x4FE1;&#x4F60;&#x4F1A;&#x7231;&#x4E0A;&#x5B83;&#x7684;&#x3002;</p><h3 id="articleHeader4">&#x4F7F;&#x7528; Less &#x7684;&#x524D;&#x594F;</h3><p>&#x4F7F;&#x7528; Less &#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;</p><ol><li>&#x5728;&#x9875;&#x9762;&#x4E2D; &#x5F15;&#x5165; Less.js<br>&#x53EF;&#x5728;<a href="http://lesscss.org/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x7F51;</a>&#x4E0B;&#x8F7D;<br>&#x6216;&#x4F7F;&#x7528;CDN</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;script src=&quot;//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial">    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;//cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;link &#x6807;&#x7B7E;&#x4E00;&#x5B9A;&#x8981;&#x5728; Less.js &#x4E4B;&#x524D;&#x5F15;&#x5165;&#xFF0C;&#x5E76;&#x4E14; link &#x6807;&#x7B7E;&#x7684; rel &#x5C5E;&#x6027;&#x8981;&#x8BBE;&#x7F6E;&#x4E3A;stylesheet/less&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       &lt;link rel=&quot;stylesheet/less&quot; href=&quot;style.less&quot;&gt;
       &lt;script src=&quot;less.min.js&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">       <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet/less&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;style.less&quot;</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;less.min.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><ol><li>&#x5728;&#x547D;&#x4EE4;&#x884C; &#x4F7F;&#x7528;npm&#x5B89;&#x88C5;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      npm install -g less" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">      npm install -g less</code></pre><p>&#x5177;&#x4F53;&#x4F7F;&#x7528;&#x547D;&#x4EE4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      $ lessc styles.less &gt; styles.css" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">      $ lessc styles.less &gt; styles.css</code></pre><p>&#x5047;&#x5982;&#x8FD8;&#x6709;&#x95EE;&#x9898;&#xFF0C;<a href="http://less.bootcss.com/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x7F51;</a>&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x660E;&#x786E;&#x7684;&#x6B65;&#x9AA4;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x4E5F;&#x662F; Webpack &#x7684;&#x4F7F;&#x7528;&#x8005;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x914D;&#x5408; less-loader &#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x89C1;&#x6211;&#x7684;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF1A;<a href="https://tomotoes.com/posts/4d6f8cc5/" rel="nofollow noreferrer" target="_blank">Webpack&#x98DE;&#x884C;&#x624B;&#x518C;</a>&#xFF0C;&#x91CC;&#x9762;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;&#x4E86; less &#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x5728;&#x672C;&#x5730;&#x73AF;&#x5883;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF1B;&#x4F46;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E2D;&#xFF0C;&#x6027;&#x80FD;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF0C;&#x6700;&#x597D;&#x4F7F;&#x7528;&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</p><h2 id="articleHeader5">&#x6B63;&#x6587;</h2><p>&#x4E0B;&#x9762;&#x6211;&#x5C06;&#x7B80;&#x4ECB; Less &#x7684;&#x529F;&#x80FD;&#x7279;&#x6027;&#x3002;</p><h3 id="articleHeader6">&#x53D8;&#x91CF;</h3><p>&#x6211;&#x4EEC;&#x5E38;&#x5E38;&#x5728; CSS &#x4E2D; &#x770B;&#x5230;&#x540C;&#x4E00;&#x4E2A;&#x503C;&#x91CD;&#x590D;&#x591A;&#x6B21;&#xFF0C;&#x8FD9;&#x6837;&#x96BE;&#x6613;&#x4E8E;&#x4EE3;&#x7801;&#x7EF4;&#x62A4;&#x3002;<br>&#x7406;&#x60F3;&#x72B6;&#x6001;&#xFF0C;&#x5E94;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bgColor=&quot;skyblue&quot;;
$(&quot;.post-content&quot;).css(&quot;background-color&quot;,bgColor);
$(&quot;#wrap&quot;).css(&quot;background-color&quot;,bgColor);
$(&quot;.arctive&quot;).css(&quot;background-color&quot;,bgColor);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> bgColor=<span class="hljs-string">&quot;skyblue&quot;</span>;
$(<span class="hljs-string">&quot;.post-content&quot;</span>).css(<span class="hljs-string">&quot;background-color&quot;</span>,bgColor);
$(<span class="hljs-string">&quot;#wrap&quot;</span>).css(<span class="hljs-string">&quot;background-color&quot;</span>,bgColor);
$(<span class="hljs-string">&quot;.arctive&quot;</span>).css(<span class="hljs-string">&quot;background-color&quot;</span>,bgColor);</code></pre><p>&#x53EA;&#x8981;&#x6211;&#x4EEC;&#x4FEE;&#x6539; <code>bgColor</code>&#x8FD9;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;&#xFF0C; &#x6574;&#x4E2A;&#x9875;&#x9762;&#x7684;&#x80CC;&#x666F;&#x989C;&#x8272;&#x90FD;&#x4F1A;&#x968F;&#x4E4B;&#x6539;&#x53D8;&#x3002;</p><p>&#x800C; Less &#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x5341;&#x5206;&#x5F3A;&#x5927;&#xFF0C;&#x53EF;&#x5316;&#x4E07;&#x7269;&#xFF0C;&#x503C;&#x5F97;&#x4E00;&#x63D0;&#x7684;&#x662F;&#xFF0C;&#x5176;&#x53D8;&#x91CF;&#x662F;&#x5E38;&#x91CF; &#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x80FD;&#x5B9A;&#x4E49;&#x4E00;&#x6B21;&#xFF0C;&#x4E0D;&#x80FD;&#x91CD;&#x590D;&#x4F7F;&#x7528;&#x3002;<br><strong>&#x503C;&#x53D8;&#x91CF;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @color: #999;
      @bgColor: skyblue;//&#x4E0D;&#x8981;&#x6DFB;&#x52A0;&#x5F15;&#x53F7;
      @width: 50%;
      #wrap {
        color: @color;
        width: @width;
      }
    
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
      #wrap {
        color: #999;
        width: 50%;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@color:</span> <span class="hljs-number">#999</span>;
      <span class="hljs-variable">@bgColor:</span> skyblue;<span class="hljs-comment">//&#x4E0D;&#x8981;&#x6DFB;&#x52A0;&#x5F15;&#x53F7;</span>
      <span class="hljs-variable">@width:</span> <span class="hljs-number">50%</span>;
      <span class="hljs-selector-id">#wrap</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-variable">@color</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-variable">@width</span>;
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
      }</code></pre><p>&#x4EE5; <code>@</code> &#x5F00;&#x5934; &#x5B9A;&#x4E49;&#x53D8;&#x91CF;&#xFF0C;&#x5E76;&#x4E14;&#x4F7F;&#x7528;&#x65F6; &#x76F4;&#x63A5; &#x952E;&#x5165; <code>@</code>&#x540D;&#x79F0;&#x3002;</p><p>&#x5728;&#x5E73;&#x65F6;&#x5DE5;&#x4F5C;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x628A; &#x5E38;&#x7528;&#x7684;&#x53D8;&#x91CF; &#x5C01;&#x88C5;&#x5230;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x8FD9;&#x6837;&#x5229;&#x4E8E;&#x4EE3;&#x7801;&#x7EC4;&#x7EC7;&#x7EF4;&#x62A4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      @lightPrimaryColor: #c5cae9;
      @textPrimaryColor: #fff;
      @accentColor: rgb(99, 137, 185);
      @primaryTextColor: #646464;
      @secondaryTextColor: #000;
      @dividerColor: #b6b6b6;
      @borderColor: #dadada;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-variable">@lightPrimaryColor:</span> <span class="hljs-number">#c5cae9</span>;
      <span class="hljs-variable">@textPrimaryColor:</span> <span class="hljs-number">#fff</span>;
      <span class="hljs-variable">@accentColor:</span> rgb(<span class="hljs-number">99</span>, <span class="hljs-number">137</span>, <span class="hljs-number">185</span>);
      <span class="hljs-variable">@primaryTextColor:</span> <span class="hljs-number">#646464</span>;
      <span class="hljs-variable">@secondaryTextColor:</span> <span class="hljs-number">#000</span>;
      <span class="hljs-variable">@dividerColor:</span> <span class="hljs-number">#b6b6b6</span>;
      <span class="hljs-variable">@borderColor:</span> <span class="hljs-number">#dadada</span>;</code></pre><p><strong>&#x9009;&#x62E9;&#x5668;&#x53D8;&#x91CF;</strong></p><p>&#x8BA9; &#x9009;&#x62E9;&#x5668; &#x53D8;&#x6210; &#x52A8;&#x6001;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @mySelector: #wrap;
      @Wrap: wrap;
      @{mySelector}{ //&#x53D8;&#x91CF;&#x540D; &#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5305;&#x88F9;
        color: #999;
        width: 50%;
      }
      .@{Wrap}{
        color:#ccc;
      }
      #@{Wrap}{
        color:#666;
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #wrap{
        color: #999;
        width: 50%;
      }
      .wrap{
        color:#ccc;
      }
      #wrap{
        color:#666;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@mySelector:</span> #wrap;
      <span class="hljs-variable">@Wrap:</span> wrap;
      <span class="hljs-variable">@{mySelector}</span>{ <span class="hljs-comment">//&#x53D8;&#x91CF;&#x540D; &#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5305;&#x88F9;</span>
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
      }
      <span class="hljs-selector-class">.@{Wrap}</span>{
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#ccc</span>;
      }
      <span class="hljs-selector-id">#@{Wrap}</span>{
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#666</span>;
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
      }
      <span class="hljs-selector-class">.wrap</span>{
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#ccc</span>;
      }
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#666</span>;
      }</code></pre><p><strong>&#x5C5E;&#x6027;&#x53D8;&#x91CF;</strong></p><p>&#x53EF;&#x51CF;&#x5C11;&#x4EE3;&#x7801;&#x4E66;&#x5199;&#x91CF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @borderStyle: border-style;
      @Soild:solid;
      #wrap{
        @{borderStyle}: @Soild;//&#x53D8;&#x91CF;&#x540D; &#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5305;&#x88F9;
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #wrap{
        border-style:solid;
      }
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@borderStyle:</span> border-style;
      <span class="hljs-variable">@Soild:</span>solid;
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">@{borderStyle}</span>: <span class="hljs-variable">@Soild</span>;<span class="hljs-comment">//&#x53D8;&#x91CF;&#x540D; &#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5305;&#x88F9;</span>
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">border-style</span>:solid;
      }
    </code></pre><p><strong>url &#x53D8;&#x91CF;</strong></p><p>&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x4FEE;&#x6539;&#x5176;&#x53D8;&#x91CF;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @images: &quot;../img&quot;;//&#x9700;&#x8981;&#x52A0;&#x5F15;&#x53F7;
      body {
        background: url(&quot;@{images}/dog.png&quot;);//&#x53D8;&#x91CF;&#x540D; &#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5305;&#x88F9;
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      body {
        background: url(&quot;../img/dog.png&quot;);
      }
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@images:</span> <span class="hljs-string">&quot;../img&quot;</span>;<span class="hljs-comment">//&#x9700;&#x8981;&#x52A0;&#x5F15;&#x53F7;</span>
      <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: url(<span class="hljs-string">&quot;@{images}/dog.png&quot;</span>);<span class="hljs-comment">//&#x53D8;&#x91CF;&#x540D; &#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5927;&#x62EC;&#x53F7;&#x5305;&#x88F9;</span>
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background</span>: url(<span class="hljs-string">&quot;../img/dog.png&quot;</span>);
      }
    </code></pre><p><strong>&#x58F0;&#x660E;&#x53D8;&#x91CF;</strong></p><p>&#x6709;&#x70B9;&#x7C7B;&#x4F3C;&#x4E8E; &#x4E0B;&#x9762;&#x7684; &#x6DF7;&#x5408;&#x65B9;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      - &#x7ED3;&#x6784;: @name: { &#x5C5E;&#x6027;: &#x503C; ;};
      - &#x4F7F;&#x7528;&#xFF1A;@name();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>      -<span class="ruby"> &#x7ED3;&#x6784;: @name: { &#x5C5E;&#x6027;: &#x503C; ;};
</span>      -<span class="ruby"> &#x4F7F;&#x7528;&#xFF1A;@name();
</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @background: {background:red;};
      #main{
          @background();
      }
      @Rules:{
          width: 200px;
          height: 200px;
          border: solid 1px red;
      };
      #con{
        @Rules();
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #main{
        background:red;
      }
      #con{
        width: 200px;
        height: 200px;
        border: solid 1px red;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@background:</span> {<span class="hljs-attribute">background</span>:red;};
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-variable">@background</span>();
      }
      <span class="hljs-variable">@Rules:</span>{
          <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
          <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
          <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
      };
      <span class="hljs-selector-id">#con</span>{
        <span class="hljs-variable">@Rules</span>();
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">background</span>:red;
      }
      <span class="hljs-selector-id">#con</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
      }</code></pre><p><strong>&#x53D8;&#x91CF;&#x8FD0;&#x7B97;</strong></p><p>&#x4E0D;&#x5F97;&#x4E0D;&#x63D0;&#x7684;&#x662F;&#xFF0C;Less &#x7684;&#x53D8;&#x91CF;&#x8FD0;&#x7B97;&#x5B8C;&#x5168;&#x8D85;&#x51FA;&#x6211;&#x7684;&#x671F;&#x671B;&#xFF0C;&#x5341;&#x5206;&#x5F3A;&#x5927;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  - &#x52A0;&#x51CF;&#x6CD5;&#x65F6; &#x4EE5;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7684;&#x5355;&#x4F4D;&#x4E3A;&#x57FA;&#x51C6;
  - &#x4E58;&#x9664;&#x6CD5;&#x65F6; &#x6CE8;&#x610F;&#x5355;&#x4F4D;&#x4E00;&#x5B9A;&#x8981;&#x7EDF;&#x4E00;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>  -<span class="ruby"> &#x52A0;&#x51CF;&#x6CD5;&#x65F6; &#x4EE5;&#x7B2C;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x7684;&#x5355;&#x4F4D;&#x4E3A;&#x57FA;&#x51C6;
</span>  -<span class="ruby"> &#x4E58;&#x9664;&#x6CD5;&#x65F6; &#x6CE8;&#x610F;&#x5355;&#x4F4D;&#x4E00;&#x5B9A;&#x8981;&#x7EDF;&#x4E00;
</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @width:300px;
      @color:#222;
      #wrap{
        width:@width-20;
        height:@width-20*5;
        margin:(@width-20)*5;
        color:@color*2;
        background-color:@color + #111;
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #wrap{
        width:280px;
        height:200px;
        margin:1400px;
        color:#444;
        background-color:#333;
      }
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@width:</span><span class="hljs-number">300px</span>;
      <span class="hljs-variable">@color:</span><span class="hljs-number">#222</span>;
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-variable">@width-20</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-variable">@width-20</span>*<span class="hljs-number">5</span>;
        <span class="hljs-attribute">margin</span>:(<span class="hljs-variable">@width-20</span>)*<span class="hljs-number">5</span>;
        <span class="hljs-attribute">color</span>:<span class="hljs-variable">@color</span>*<span class="hljs-number">2</span>;
        <span class="hljs-attribute">background-color</span>:<span class="hljs-variable">@color</span> + <span class="hljs-number">#111</span>;
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">280px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">1400px</span>;
        <span class="hljs-attribute">color</span>:<span class="hljs-number">#444</span>;
        <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#333</span>;
      }
    </code></pre><p><strong>&#x53D8;&#x91CF;&#x4F5C;&#x7528;&#x57DF;</strong></p><p>&#x4E00;&#x53E5;&#x8BDD;&#x7406;&#x89E3;&#x5C31;&#x662F;&#xFF1A;<strong>&#x5C31;&#x8FD1;&#x539F;&#x5219;</strong>&#xFF0C;&#x4E0D;&#x8981;&#x8DDF;&#x6211;&#x63D0;&#x95ED;&#x5305;&#x3002;</p><p><em>&#x501F;&#x52A9;&#x5B98;&#x7F51;&#x7684;Demo</em></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @var: @a;
      @a: 100%;
      #wrap {
        width: @var;
        @a: 9%;
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #wrap {
        width: 9%;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@var:</span> <span class="hljs-variable">@a</span>;
      <span class="hljs-variable">@a:</span> <span class="hljs-number">100%</span>;
      <span class="hljs-selector-id">#wrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-variable">@var</span>;
        <span class="hljs-variable">@a:</span> <span class="hljs-number">9%</span>;
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">9%</span>;
      }</code></pre><p><strong>&#x7528;&#x53D8;&#x91CF;&#x53BB;&#x5B9A;&#x4E49;&#x53D8;&#x91CF;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @fnord:  &quot;I am fnord.&quot;;
      @var:    &quot;fnord&quot;;
      #wrap::after{
        content: @@var; //&#x5C06;@var&#x66FF;&#x6362;&#x4E3A;&#x5176;&#x503C; content:@fnord;
      }
      /* &#x751F;&#x6210;&#x7684; CSS */
      #wrap::after{
        content: &quot;I am fnord.&quot;;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@fnord:</span>  <span class="hljs-string">&quot;I am fnord.&quot;</span>;
      <span class="hljs-variable">@var:</span>    <span class="hljs-string">&quot;fnord&quot;</span>;
      <span class="hljs-selector-id">#wrap</span><span class="hljs-selector-pseudo">::after</span>{
        <span class="hljs-attribute">content</span>: <span class="hljs-variable">@@var</span>; <span class="hljs-comment">//&#x5C06;@var&#x66FF;&#x6362;&#x4E3A;&#x5176;&#x503C; content:@fnord;</span>
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span><span class="hljs-selector-pseudo">::after</span>{
        <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;I am fnord.&quot;</span>;
      }</code></pre><h3 id="articleHeader7">&#x5D4C;&#x5957;</h3><p><strong>&amp; &#x7684;&#x5999;&#x7528;</strong></p><p>&amp; &#xFF1A;&#x4EE3;&#x8868;&#x7684;&#x4E0A;&#x4E00;&#x5C42;&#x9009;&#x62E9;&#x5668;&#x7684;&#x540D;&#x5B57;&#xFF0C;&#x6B64;&#x4F8B;&#x4FBF;&#x662F;<code>header</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      #header{
        &amp;:after{
          content:&quot;Less is more!&quot;;
        }
        .title{
          font-weight:bold;
        }
        &amp;_content{//&#x7406;&#x89E3;&#x65B9;&#x5F0F;&#xFF1A;&#x76F4;&#x63A5;&#x628A; &amp; &#x66FF;&#x6362;&#x6210; #header
          margin:20px;
        }
      }
      /* &#x751F;&#x6210;&#x7684; CSS */
      #header::after{
        content:&quot;Less is more!&quot;;
      }
      #header .title{ //&#x5D4C;&#x5957;&#x4E86;
        font-weight:bold;
      }
      #header_content{//&#x6CA1;&#x6709;&#x5D4C;&#x5957;&#xFF01;
          margin:20px;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-id">#header</span>{
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span>{
          <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;Less is more!&quot;</span>;
        }
        <span class="hljs-selector-class">.title</span>{
          <span class="hljs-attribute">font-weight</span>:bold;
        }
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-tag">_content</span>{<span class="hljs-comment">//&#x7406;&#x89E3;&#x65B9;&#x5F0F;&#xFF1A;&#x76F4;&#x63A5;&#x628A; &amp; &#x66FF;&#x6362;&#x6210; #header</span>
          <span class="hljs-attribute">margin</span>:<span class="hljs-number">20px</span>;
        }
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#header</span><span class="hljs-selector-pseudo">::after</span>{
        <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;Less is more!&quot;</span>;
      }
      <span class="hljs-selector-id">#header</span> <span class="hljs-selector-class">.title</span>{ <span class="hljs-comment">//&#x5D4C;&#x5957;&#x4E86;</span>
        <span class="hljs-attribute">font-weight</span>:bold;
      }
      <span class="hljs-selector-id">#header_content</span>{<span class="hljs-comment">//&#x6CA1;&#x6709;&#x5D4C;&#x5957;&#xFF01;</span>
          <span class="hljs-attribute">margin</span>:<span class="hljs-number">20px</span>;
      }</code></pre><p><strong>&#x5A92;&#x4F53;&#x67E5;&#x8BE2;</strong></p><p>&#x5728;&#x4EE5;&#x5F80;&#x7684;&#x5DE5;&#x4F5C;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528; &#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#xFF0C;&#x90FD;&#x8981;&#x628A;&#x4E00;&#x4E2A;&#x5143;&#x7D20; &#x5206;&#x5F00;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      #wrap{
        width:500px;
      }
      @media screen and (max-width:768px){
        #wrap{
          width:100px;
        }
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">500px</span>;
      }
      @<span class="hljs-keyword">media</span> screen and (max-width:<span class="hljs-number">768px</span>){
        <span class="hljs-selector-id">#wrap</span>{
          <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
        }
      }</code></pre><p>Less &#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x5341;&#x5206;&#x4FBF;&#x6377;&#x7684;&#x65B9;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      #main{
          //something...
    
          @media screen{
              @media (max-width:768px){
                width:100px;
              }
          }
          @media tv {
            width:2000px;
          }
      }
      /* &#x751F;&#x6210;&#x7684; CSS */
      @media screen and (maxwidth:768px){
        #main{
            width:100px; 
        }
      }
      @media tv{
        #main{
          width:2000px;
        }
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-comment">//something...</span>
    
          <span class="hljs-keyword">@media</span> screen{
              <span class="hljs-keyword">@media</span> (<span class="hljs-attribute">max-width</span>:<span class="hljs-number">768px</span>){
                <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
              }
          }
          <span class="hljs-keyword">@media</span> tv {
            <span class="hljs-attribute">width</span>:<span class="hljs-number">2000px</span>;
          }
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-keyword">@media</span> screen and (<span class="hljs-attribute">maxwidth</span>:<span class="hljs-number">768px</span>){
        <span class="hljs-selector-id">#main</span>{
            <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>; 
        }
      }
      <span class="hljs-keyword">@media</span> tv{
        <span class="hljs-selector-id">#main</span>{
          <span class="hljs-attribute">width</span>:<span class="hljs-number">2000px</span>;
        }
      }</code></pre><p>&#x552F;&#x4E00;&#x7684;&#x7F3A;&#x70B9;&#x5C31;&#x662F; &#x6BCF;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x90FD;&#x4F1A;&#x7F16;&#x8BD1;&#x51FA;&#x81EA;&#x5DF1; <code>@media</code> &#x58F0;&#x660E;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x5408;&#x5E76;&#x3002;</p><p><strong>&#x5B9E;&#x6218;&#x6280;&#x5DE7;</strong></p><p>&#x53EF;&#x4EE5;&#x501F;&#x52A9; Less &#x5728;&#x5143;&#x7D20;&#x4E2D;&#xFF0C;&#x53BB;&#x5B9A;&#x4E49;&#x81EA;&#x5DF1;&#x7684;&#x79C1;&#x6709;&#x6837;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      #main{
        // something..
        &amp;.show{
          display:block;
        }
      }
      .show{
        display:none;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-comment">// something..</span>
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.show</span>{
          <span class="hljs-attribute">display</span>:block;
        }
      }
      <span class="hljs-selector-class">.show</span>{
        <span class="hljs-attribute">display</span>:none;
      }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      const main = document.getElementById(&quot;main&quot;);
      main.classList.add(&quot;show&quot;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">      <span class="hljs-keyword">const</span> main = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;main&quot;</span>);
      main.classList.add(<span class="hljs-string">&quot;show&quot;</span>);</code></pre><p>&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      #main.show{
        display:block;
      }
      .show{
        display:none; //&#x4F1A;&#x88AB;&#x8986;&#x76D6;&#x3002;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-selector-id">#main</span><span class="hljs-selector-class">.show</span>{
        <span class="hljs-attribute">display</span>:block;
      }
      <span class="hljs-selector-class">.show</span>{
        <span class="hljs-attribute">display</span>:none; <span class="hljs-comment">//&#x4F1A;&#x88AB;&#x8986;&#x76D6;&#x3002;</span>
      }</code></pre><h3 id="articleHeader8">&#x6DF7;&#x5408;&#x65B9;&#x6CD5;</h3><p><strong>&#x65E0;&#x53C2;&#x6570;&#x65B9;&#x6CD5;</strong></p><p>&#x65B9;&#x6CD5;&#x72B9;&#x5982; &#x58F0;&#x660E;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x4F7F;&#x7528;&#x65F6; &#x76F4;&#x63A5;&#x952E;&#x5165;&#x540D;&#x79F0;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .card { // &#x7B49;&#x4EF7;&#x4E8E; .card()
          background: #f6f6f6;
          -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
          box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
      }
      #wrap{
        .card;//&#x7B49;&#x4EF7;&#x4E8E;.card();
      }
      /* &#x751F;&#x6210;&#x7684; CSS */
      #wrap{
        background: #f6f6f6;
        -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
        box-shadow: 0 1px 2px rgba(151, 151, 151, .58);
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.card</span> { <span class="hljs-comment">// &#x7B49;&#x4EF7;&#x4E8E; .card()</span>
          <span class="hljs-attribute">background</span>: <span class="hljs-number">#f6f6f6</span>;
          <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> rgba(<span class="hljs-number">151</span>, <span class="hljs-number">151</span>, <span class="hljs-number">151</span>, .<span class="hljs-number">58</span>);
          <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> rgba(<span class="hljs-number">151</span>, <span class="hljs-number">151</span>, <span class="hljs-number">151</span>, .<span class="hljs-number">58</span>);
      }
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-selector-class">.card</span>;<span class="hljs-comment">//&#x7B49;&#x4EF7;&#x4E8E;.card();</span>
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f6f6f6</span>;
        <span class="hljs-attribute">-webkit-box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> rgba(<span class="hljs-number">151</span>, <span class="hljs-number">151</span>, <span class="hljs-number">151</span>, .<span class="hljs-number">58</span>);
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">2px</span> rgba(<span class="hljs-number">151</span>, <span class="hljs-number">151</span>, <span class="hljs-number">151</span>, .<span class="hljs-number">58</span>);
      }</code></pre><p>&#x5176;&#x4E2D; <code>.card</code> &#x4E0E; <code>.card()</code> &#x662F;&#x7B49;&#x4EF7;&#x7684;&#x3002;<br>&#x4E2A;&#x4EBA;&#x5EFA;&#x8BAE;&#xFF0C;&#x4E3A;&#x4E86;&#x907F;&#x514D; &#x4EE3;&#x7801;&#x6DF7;&#x6DC6;&#xFF0C;&#x5E94;&#x5199;&#x6210; :</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      .card(){
        //something...
      }
      #wrap{
        .card();
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-selector-class">.card</span>(){
        <span class="hljs-comment">//something...</span>
      }
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-selector-class">.card</span>();
      }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8981;&#x70B9;&#xFF1A;
  `.` &#x4E0E; `#` &#x7686;&#x53EF;&#x4F5C;&#x4E3A; &#x65B9;&#x6CD5;&#x524D;&#x7F00;&#x3002;
  &#x65B9;&#x6CD5;&#x540E;&#x5199;&#x4E0D;&#x5199; `()` &#x770B;&#x4E2A;&#x4EBA;&#x4E60;&#x60EF;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>&#x8981;&#x70B9;&#xFF1A;
  `.` &#x4E0E; `#` &#x7686;&#x53EF;&#x4F5C;&#x4E3A; &#x65B9;&#x6CD5;&#x524D;&#x7F00;&#x3002;
  &#x65B9;&#x6CD5;&#x540E;&#x5199;&#x4E0D;&#x5199; `()` &#x770B;&#x4E2A;&#x4EBA;&#x4E60;&#x60EF;&#x3002;
</code></pre><p><strong>&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x65B9;&#x6CD5;</strong></p><p>Less &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C; &#x6CA1;&#x6709;&#x4F20;&#x53C2;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x5C06;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x3002;</p><p><code>@arguments</code> &#x72B9;&#x5982; JS &#x4E2D;&#x7684; <code>arguments</code> &#x6307;&#x4EE3;&#x7684;&#x662F; &#x5168;&#x90E8;&#x53C2;&#x6570;&#x3002;</p><p>&#x4F20;&#x7684;&#x53C2;&#x6570;&#x4E2D; &#x5FC5;&#x987B;&#x5E26;&#x7740;&#x5355;&#x4F4D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .border(@a:10px,@b:50px,@c:30px,@color:#000){
          border:solid 1px @color;
          box-shadow: @arguments;//&#x6307;&#x4EE3;&#x7684;&#x662F; &#x5168;&#x90E8;&#x53C2;&#x6570;
      }
      #main{
          .border(0px,5px,30px,red);//&#x5FC5;&#x987B;&#x5E26;&#x7740;&#x5355;&#x4F4D;
      }
      #wrap{
          .border(0px);
      }
      #content{
        .border;//&#x7B49;&#x4EF7;&#x4E8E; .border()
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #main{
          border:solid 1px red;
          box-shadow:0px,5px,30px,red;
      }
      #wrap{
          border:solid 1px #000;
          box-shadow: 0px 50px 30px #000;
      }
      #content{
          border:solid 1px #000;
          box-shadow: 10px 50px 30px #000;
      }
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.border</span>(<span class="hljs-variable">@a</span>:<span class="hljs-number">10px</span>,<span class="hljs-variable">@b</span>:<span class="hljs-number">50px</span>,<span class="hljs-variable">@c</span>:<span class="hljs-number">30px</span>,<span class="hljs-variable">@color</span>:<span class="hljs-number">#000</span>){
          <span class="hljs-attribute">border</span>:solid <span class="hljs-number">1px</span> <span class="hljs-variable">@color</span>;
          <span class="hljs-attribute">box-shadow</span>: <span class="hljs-variable">@arguments</span>;<span class="hljs-comment">//&#x6307;&#x4EE3;&#x7684;&#x662F; &#x5168;&#x90E8;&#x53C2;&#x6570;</span>
      }
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-selector-class">.border</span>(<span class="hljs-number">0px</span>,<span class="hljs-number">5px</span>,<span class="hljs-number">30px</span>,red);<span class="hljs-comment">//&#x5FC5;&#x987B;&#x5E26;&#x7740;&#x5355;&#x4F4D;</span>
      }
      <span class="hljs-selector-id">#wrap</span>{
          <span class="hljs-selector-class">.border</span>(<span class="hljs-number">0px</span>);
      }
      <span class="hljs-selector-id">#content</span>{
        <span class="hljs-selector-class">.border</span>;<span class="hljs-comment">//&#x7B49;&#x4EF7;&#x4E8E; .border()</span>
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-attribute">border</span>:solid <span class="hljs-number">1px</span> red;
          <span class="hljs-attribute">box-shadow</span>:<span class="hljs-number">0px</span>,<span class="hljs-number">5px</span>,<span class="hljs-number">30px</span>,red;
      }
      <span class="hljs-selector-id">#wrap</span>{
          <span class="hljs-attribute">border</span>:solid <span class="hljs-number">1px</span> <span class="hljs-number">#000</span>;
          <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0px</span> <span class="hljs-number">50px</span> <span class="hljs-number">30px</span> <span class="hljs-number">#000</span>;
      }
      <span class="hljs-selector-id">#content</span>{
          <span class="hljs-attribute">border</span>:solid <span class="hljs-number">1px</span> <span class="hljs-number">#000</span>;
          <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">10px</span> <span class="hljs-number">50px</span> <span class="hljs-number">30px</span> <span class="hljs-number">#000</span>;
      }
    </code></pre><p><strong>&#x65B9;&#x6CD5;&#x7684;&#x5339;&#x914D;&#x6A21;&#x5F0F;</strong></p><p>&#x4E0E; &#x9762;&#x5411;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x591A;&#x6001; &#x5F88;&#x76F8;&#x4F3C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .triangle(top,@width:20px,@color:#000){
          border-color:transparent  transparent @color transparent ;
      }
      .triangle(right,@width:20px,@color:#000){
          border-color:transparent @color transparent  transparent ;
      }
    
      .triangle(bottom,@width:20px,@color:#000){
          border-color:@color transparent  transparent  transparent ;
      }
      .triangle(left,@width:20px,@color:#000){
          border-color:transparent  transparent  transparent @color;
      }
      .triangle(@_,@width:20px,@color:#000){
          border-style: solid;
          border-width: @width;
      }
      #main{
          .triangle(left, 50px, #999)
      }
      /* &#x751F;&#x6210;&#x7684; CSS */
      #main{
        border-color:transparent  transparent  transparent #999;
        border-style: solid;
        border-width: 50px;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.triangle</span>(top,<span class="hljs-variable">@width</span>:<span class="hljs-number">20px</span>,<span class="hljs-variable">@color</span>:<span class="hljs-number">#000</span>){
          <span class="hljs-attribute">border-color</span>:transparent  transparent <span class="hljs-variable">@color</span> transparent ;
      }
      <span class="hljs-selector-class">.triangle</span>(right,<span class="hljs-variable">@width</span>:<span class="hljs-number">20px</span>,<span class="hljs-variable">@color</span>:<span class="hljs-number">#000</span>){
          <span class="hljs-attribute">border-color</span>:transparent <span class="hljs-variable">@color</span> transparent  transparent ;
      }
    
      <span class="hljs-selector-class">.triangle</span>(bottom,<span class="hljs-variable">@width</span>:<span class="hljs-number">20px</span>,<span class="hljs-variable">@color</span>:<span class="hljs-number">#000</span>){
          <span class="hljs-attribute">border-color</span>:<span class="hljs-variable">@color</span> transparent  transparent  transparent ;
      }
      <span class="hljs-selector-class">.triangle</span>(left,<span class="hljs-variable">@width</span>:<span class="hljs-number">20px</span>,<span class="hljs-variable">@color</span>:<span class="hljs-number">#000</span>){
          <span class="hljs-attribute">border-color</span>:transparent  transparent  transparent <span class="hljs-variable">@color</span>;
      }
      <span class="hljs-selector-class">.triangle</span>(<span class="hljs-variable">@_</span>,<span class="hljs-variable">@width</span>:<span class="hljs-number">20px</span>,<span class="hljs-variable">@color</span>:<span class="hljs-number">#000</span>){
          <span class="hljs-attribute">border-style</span>: solid;
          <span class="hljs-attribute">border-width</span>: <span class="hljs-variable">@width</span>;
      }
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-selector-class">.triangle</span>(left, <span class="hljs-number">50px</span>, <span class="hljs-number">#999</span>)
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">border-color</span>:transparent  transparent  transparent <span class="hljs-number">#999</span>;
        <span class="hljs-attribute">border-style</span>: solid;
        <span class="hljs-attribute">border-width</span>: <span class="hljs-number">50px</span>;
      }</code></pre><p>&#x8981;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  - &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570; `left` &#x8981;&#x4F1A;&#x627E;&#x5230;&#x65B9;&#x6CD5;&#x4E2D;&#x5339;&#x914D;&#x7A0B;&#x5EA6;&#x6700;&#x9AD8;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5339;&#x914D;&#x7A0B;&#x5EA6;&#x76F8;&#x540C;&#xFF0C;&#x5C06;&#x5168;&#x90E8;&#x9009;&#x62E9;&#xFF0C;&#x5E76;&#x5B58;&#x5728;&#x7740;&#x6837;&#x5F0F;&#x8986;&#x76D6;&#x66FF;&#x6362;&#x3002;

  - &#x5982;&#x679C;&#x5339;&#x914D;&#x7684;&#x53C2;&#x6570; &#x662F;&#x53D8;&#x91CF;&#xFF0C;&#x5219;&#x5C06;&#x4F1A;&#x5339;&#x914D;&#xFF0C;&#x5982; `@_` &#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>  -<span class="ruby"> &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570; <span class="hljs-string">`left`</span> &#x8981;&#x4F1A;&#x627E;&#x5230;&#x65B9;&#x6CD5;&#x4E2D;&#x5339;&#x914D;&#x7A0B;&#x5EA6;&#x6700;&#x9AD8;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5339;&#x914D;&#x7A0B;&#x5EA6;&#x76F8;&#x540C;&#xFF0C;&#x5C06;&#x5168;&#x90E8;&#x9009;&#x62E9;&#xFF0C;&#x5E76;&#x5B58;&#x5728;&#x7740;&#x6837;&#x5F0F;&#x8986;&#x76D6;&#x66FF;&#x6362;&#x3002;
</span>
  -<span class="ruby"> &#x5982;&#x679C;&#x5339;&#x914D;&#x7684;&#x53C2;&#x6570; &#x662F;&#x53D8;&#x91CF;&#xFF0C;&#x5219;&#x5C06;&#x4F1A;&#x5339;&#x914D;&#xFF0C;&#x5982; <span class="hljs-string">`@_`</span> &#x3002;
</span></code></pre><p><strong>&#x65B9;&#x6CD5;&#x7684;&#x547D;&#x540D;&#x7A7A;&#x95F4;</strong></p><p>&#x8BA9;&#x65B9;&#x6CD5;&#x66F4;&#x52A0;&#x89C4;&#x8303;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      #card(){
          background: #723232;
          .d(@w:300px){
              width: @w;
              
              #a(@h:300px){
                  height: @h;//&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0A;&#x4E00;&#x5C42;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x65B9;&#x6CD5;
                  width: @w;
              }
          }
      }
      #wrap{
          #card &gt; .d &gt; #a(100px); // &#x7236;&#x5143;&#x7D20;&#x4E0D;&#x80FD;&#x52A0; &#x62EC;&#x53F7;
      }
      #main{
          #card .d();
      }
      #con{
          //&#x4E0D;&#x5F97;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x65B9;&#x6CD5;
          //.d() &#x5982;&#x679C;&#x524D;&#x9762;&#x6CA1;&#x6709;&#x5F15;&#x5165;&#x547D;&#x540D;&#x7A7A;&#x95F4; #card &#xFF0C;&#x5C06;&#x4F1A;&#x62A5;&#x9519;
          
          #card; // &#x7B49;&#x4EF7;&#x4E8E; #card();
          .d(20px); //&#x5FC5;&#x987B;&#x5148;&#x5F15;&#x5165; #card
      }
      /* &#x751F;&#x6210;&#x7684; CSS */
      #wrap{
        height:100px;
        width:300px;
      }
      #main{
        width:300px;
      }
      #con{
        width:20px;
      }
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-id">#card</span>(){
          <span class="hljs-attribute">background</span>: <span class="hljs-number">#723232</span>;
          <span class="hljs-selector-class">.d</span>(<span class="hljs-variable">@w</span>:<span class="hljs-number">300px</span>){
              <span class="hljs-attribute">width</span>: <span class="hljs-variable">@w</span>;
              
              <span class="hljs-selector-id">#a</span>(<span class="hljs-variable">@h</span>:<span class="hljs-number">300px</span>){
                  <span class="hljs-attribute">height</span>: <span class="hljs-variable">@h</span>;<span class="hljs-comment">//&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0A;&#x4E00;&#x5C42;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x65B9;&#x6CD5;</span>
                  <span class="hljs-attribute">width</span>: <span class="hljs-variable">@w</span>;
              }
          }
      }
      <span class="hljs-selector-id">#wrap</span>{
          <span class="hljs-selector-id">#card</span> &gt; <span class="hljs-selector-class">.d</span> &gt; <span class="hljs-selector-id">#a</span>(<span class="hljs-number">100px</span>); <span class="hljs-comment">// &#x7236;&#x5143;&#x7D20;&#x4E0D;&#x80FD;&#x52A0; &#x62EC;&#x53F7;</span>
      }
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-selector-id">#card</span> <span class="hljs-selector-class">.d</span>();
      }
      <span class="hljs-selector-id">#con</span>{
          <span class="hljs-comment">//&#x4E0D;&#x5F97;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x65B9;&#x6CD5;</span>
          <span class="hljs-comment">//.d() &#x5982;&#x679C;&#x524D;&#x9762;&#x6CA1;&#x6709;&#x5F15;&#x5165;&#x547D;&#x540D;&#x7A7A;&#x95F4; #card &#xFF0C;&#x5C06;&#x4F1A;&#x62A5;&#x9519;</span>
          
          <span class="hljs-selector-id">#card</span>; <span class="hljs-comment">// &#x7B49;&#x4EF7;&#x4E8E; #card();</span>
          <span class="hljs-selector-class">.d</span>(<span class="hljs-number">20px</span>); <span class="hljs-comment">//&#x5FC5;&#x987B;&#x5148;&#x5F15;&#x5165; #card</span>
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
      }
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
      }
      <span class="hljs-selector-id">#con</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">20px</span>;
      }
    </code></pre><p>&#x8981;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  - &#x5728; CSS &#x4E2D;`&gt;` &#x9009;&#x62E9;&#x5668;&#xFF0C;&#x9009;&#x62E9;&#x7684;&#x662F; &#x513F;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x5C31;&#x662F; &#x5FC5;&#x987B;&#x4E0E;&#x7236;&#x5143;&#x7D20; &#x6709;&#x76F4;&#x63A5;&#x8840;&#x6E90;&#x7684;&#x5143;&#x7D20;&#x3002;
  - &#x5728;&#x5F15;&#x5165;&#x547D;&#x4EE4;&#x7A7A;&#x95F4;&#x65F6;&#xFF0C;&#x5982;&#x4F7F;&#x7528; `&gt;` &#x9009;&#x62E9;&#x5668;&#xFF0C;&#x7236;&#x5143;&#x7D20;&#x4E0D;&#x80FD;&#x52A0; &#x62EC;&#x53F7;&#x3002;
  - &#x4E0D;&#x5F97;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x65B9;&#x6CD5; &#x5FC5;&#x987B;&#x5148;&#x5F15;&#x5165;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#xFF0C;&#x624D;&#x80FD;&#x4F7F;&#x7528; &#x5176;&#x4E2D;&#x65B9;&#x6CD5;&#x3002;
  - &#x5B50;&#x65B9;&#x6CD5; &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0A;&#x4E00;&#x5C42;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x65B9;&#x6CD5;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>  -<span class="ruby"> &#x5728; CSS &#x4E2D;<span class="hljs-string">`&gt;`</span> &#x9009;&#x62E9;&#x5668;&#xFF0C;&#x9009;&#x62E9;&#x7684;&#x662F; &#x513F;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x5C31;&#x662F; &#x5FC5;&#x987B;&#x4E0E;&#x7236;&#x5143;&#x7D20; &#x6709;&#x76F4;&#x63A5;&#x8840;&#x6E90;&#x7684;&#x5143;&#x7D20;&#x3002;
</span>  -<span class="ruby"> &#x5728;&#x5F15;&#x5165;&#x547D;&#x4EE4;&#x7A7A;&#x95F4;&#x65F6;&#xFF0C;&#x5982;&#x4F7F;&#x7528; <span class="hljs-string">`&gt;`</span> &#x9009;&#x62E9;&#x5668;&#xFF0C;&#x7236;&#x5143;&#x7D20;&#x4E0D;&#x80FD;&#x52A0; &#x62EC;&#x53F7;&#x3002;
</span>  -<span class="ruby"> &#x4E0D;&#x5F97;&#x5355;&#x72EC;&#x4F7F;&#x7528;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x65B9;&#x6CD5; &#x5FC5;&#x987B;&#x5148;&#x5F15;&#x5165;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#xFF0C;&#x624D;&#x80FD;&#x4F7F;&#x7528; &#x5176;&#x4E2D;&#x65B9;&#x6CD5;&#x3002;
</span>  -<span class="ruby"> &#x5B50;&#x65B9;&#x6CD5; &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0A;&#x4E00;&#x5C42;&#x4F20;&#x8FDB;&#x6765;&#x7684;&#x65B9;&#x6CD5;
</span></code></pre><p><strong>&#x65B9;&#x6CD5;&#x7684;&#x6761;&#x4EF6;&#x7B5B;&#x9009;</strong></p><p>Less &#x6CA1;&#x6709; if else&#xFF0C;&#x53EF;&#x662F;&#x5B83;&#x6709; <code>when</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /* Less */
    #card{
        
        // and &#x8FD0;&#x7B97;&#x7B26; &#xFF0C;&#x76F8;&#x5F53;&#x4E8E; &#x4E0E;&#x8FD0;&#x7B97; &amp;&amp;&#xFF0C;&#x5FC5;&#x987B;&#x6761;&#x4EF6;&#x5168;&#x90E8;&#x7B26;&#x5408;&#x624D;&#x4F1A;&#x6267;&#x884C;
        .border(@width,@color,@style) when (@width&gt;100px) and(@color=#999){
            border:@style @color @width;
        }
    
        // not &#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E; &#x975E;&#x8FD0;&#x7B97; !&#xFF0C;&#x6761;&#x4EF6;&#x4E3A; &#x4E0D;&#x7B26;&#x5408;&#x624D;&#x4F1A;&#x6267;&#x884C;
        .background(@color) when not (@color&gt;=#222){
            background:@color;
        }
    
        // , &#x9017;&#x53F7;&#x5206;&#x9694;&#x7B26;&#xFF1A;&#x76F8;&#x5F53;&#x4E8E; &#x6216;&#x8FD0;&#x7B97; ||&#xFF0C;&#x53EA;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x5C31;&#x4F1A;&#x6267;&#x884C;
        .font(@size:20px) when (@size&gt;50px) , (@size&lt;100px){
            font-size: @size;
        }
    }
    #main{
        #card&gt;.border(200px,#999,solid);
        #card .background(#111);
        #card &gt; .font(40px);
    }
    /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
    #main{
      border:solid #999 200px;
      background:#111;
      font-size:40px;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">    <span class="hljs-comment">/* Less */</span>
    <span class="hljs-selector-id">#card</span>{
        
        <span class="hljs-comment">// and &#x8FD0;&#x7B97;&#x7B26; &#xFF0C;&#x76F8;&#x5F53;&#x4E8E; &#x4E0E;&#x8FD0;&#x7B97; &amp;&amp;&#xFF0C;&#x5FC5;&#x987B;&#x6761;&#x4EF6;&#x5168;&#x90E8;&#x7B26;&#x5408;&#x624D;&#x4F1A;&#x6267;&#x884C;</span>
        <span class="hljs-selector-class">.border</span>(<span class="hljs-variable">@width</span>,<span class="hljs-variable">@color</span>,<span class="hljs-variable">@style</span>) <span class="hljs-keyword">when</span> (<span class="hljs-variable">@width</span>&gt;<span class="hljs-number">100px</span>) <span class="hljs-keyword">and</span>(<span class="hljs-variable">@color</span>=<span class="hljs-number">#999</span>){
            <span class="hljs-attribute">border</span>:<span class="hljs-variable">@style</span> <span class="hljs-variable">@color</span> <span class="hljs-variable">@width</span>;
        }
    
        <span class="hljs-comment">// not &#x8FD0;&#x7B97;&#x7B26;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E; &#x975E;&#x8FD0;&#x7B97; !&#xFF0C;&#x6761;&#x4EF6;&#x4E3A; &#x4E0D;&#x7B26;&#x5408;&#x624D;&#x4F1A;&#x6267;&#x884C;</span>
        <span class="hljs-selector-class">.background</span>(<span class="hljs-variable">@color</span>) <span class="hljs-keyword">when</span> <span class="hljs-keyword">not</span> (<span class="hljs-variable">@color</span>&gt;=<span class="hljs-number">#222</span>){
            <span class="hljs-attribute">background</span>:<span class="hljs-variable">@color</span>;
        }
    
        <span class="hljs-comment">// , &#x9017;&#x53F7;&#x5206;&#x9694;&#x7B26;&#xFF1A;&#x76F8;&#x5F53;&#x4E8E; &#x6216;&#x8FD0;&#x7B97; ||&#xFF0C;&#x53EA;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x7B26;&#x5408;&#x6761;&#x4EF6;&#x5C31;&#x4F1A;&#x6267;&#x884C;</span>
        <span class="hljs-selector-class">.font</span>(<span class="hljs-variable">@size</span>:<span class="hljs-number">20px</span>) <span class="hljs-keyword">when</span> (<span class="hljs-variable">@size</span>&gt;<span class="hljs-number">50px</span>) , (<span class="hljs-variable">@size</span>&lt;<span class="hljs-number">100px</span>){
            <span class="hljs-attribute">font-size</span>: <span class="hljs-variable">@size</span>;
        }
    }
    <span class="hljs-selector-id">#main</span>{
        <span class="hljs-selector-id">#card</span>&gt;<span class="hljs-selector-class">.border</span>(<span class="hljs-number">200px</span>,<span class="hljs-number">#999</span>,solid);
        <span class="hljs-selector-id">#card</span> <span class="hljs-selector-class">.background</span>(<span class="hljs-number">#111</span>);
        <span class="hljs-selector-id">#card</span> &gt; <span class="hljs-selector-class">.font</span>(<span class="hljs-number">40px</span>);
    }
    <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
    <span class="hljs-selector-id">#main</span>{
      <span class="hljs-attribute">border</span>:solid <span class="hljs-number">#999</span> <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">background</span>:<span class="hljs-number">#111</span>;
      <span class="hljs-attribute">font-size</span>:<span class="hljs-number">40px</span>;
    }</code></pre><p>&#x8981;&#x70B9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  - &#x6BD4;&#x8F83;&#x8FD0;&#x7B97;&#x6709;&#xFF1A; &gt; &gt;= = =&lt; &lt;&#x3002;
  - = &#x4EE3;&#x8868;&#x7684;&#x662F;&#x7B49;&#x4E8E;
  - &#x9664;&#x53BB;&#x5173;&#x952E;&#x5B57; true &#x4EE5;&#x5916;&#x7684;&#x503C;&#x90FD;&#x88AB;&#x89C6;&#x4E3A; false&#xFF1A;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>  -<span class="ruby"> &#x6BD4;&#x8F83;&#x8FD0;&#x7B97;&#x6709;&#xFF1A; &gt; &gt;= = =&lt; &lt;&#x3002;
</span>  -<span class="ruby"> = &#x4EE3;&#x8868;&#x7684;&#x662F;&#x7B49;&#x4E8E;
</span>  -<span class="ruby"> &#x9664;&#x53BB;&#x5173;&#x952E;&#x5B57; <span class="hljs-literal">true</span> &#x4EE5;&#x5916;&#x7684;&#x503C;&#x90FD;&#x88AB;&#x89C6;&#x4E3A; <span class="hljs-literal">false</span>&#xFF1A;
</span></code></pre><p><strong>&#x6570;&#x91CF;&#x4E0D;&#x5B9A;&#x7684;&#x53C2;&#x6570;</strong></p><p>&#x5982;&#x679C;&#x4F60;&#x5E0C;&#x671B;&#x4F60;&#x7684;&#x65B9;&#x6CD5;&#x63A5;&#x53D7;&#x6570;&#x91CF;&#x4E0D;&#x5B9A;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;... &#xFF0C;&#x72B9;&#x5982; ES6 &#x7684;&#x6269;&#x5C55;&#x8FD0;&#x7B97;&#x7B26;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .boxShadow(...){
          box-shadow: @arguments;
      }
      .textShadow(@a,...){
          text-shadow: @arguments;
      }
      #main{
          .boxShadow(1px,4px,30px,red);
          .textShadow(1px,4px,30px,red);
      }
    
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
      #main{
        box-shadow: 1px 4px 30px red;
        text-shadow: 1px 4px 30px red;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.boxShadow</span>(...){
          <span class="hljs-attribute">box-shadow</span>: <span class="hljs-variable">@arguments</span>;
      }
      <span class="hljs-selector-class">.textShadow</span>(<span class="hljs-variable">@a</span>,...){
          <span class="hljs-attribute">text-shadow</span>: <span class="hljs-variable">@arguments</span>;
      }
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-selector-class">.boxShadow</span>(<span class="hljs-number">1px</span>,<span class="hljs-number">4px</span>,<span class="hljs-number">30px</span>,red);
          <span class="hljs-selector-class">.textShadow</span>(<span class="hljs-number">1px</span>,<span class="hljs-number">4px</span>,<span class="hljs-number">30px</span>,red);
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">4px</span> <span class="hljs-number">30px</span> red;
        <span class="hljs-attribute">text-shadow</span>: <span class="hljs-number">1px</span> <span class="hljs-number">4px</span> <span class="hljs-number">30px</span> red;
      }</code></pre><p><strong>&#x65B9;&#x6CD5;&#x4F7F;&#x7528;important&#xFF01;</strong></p><p>&#x4F7F;&#x7528;&#x65B9;&#x6CD5; &#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5728;&#x65B9;&#x6CD5;&#x540D;&#x540E; &#x52A0;&#x4E0A;&#x5173;&#x952E;&#x5B57;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .border{
          border: solid 1px red;
          margin: 50px;
      }
      #main{
          .border() !important;
      }
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
      #main {
          border: solid 1px red !important;
          margin: 50px !important;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.border</span>{
          <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red;
          <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;
      }
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-selector-class">.border</span>() !important;
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span> {
          <span class="hljs-attribute">border</span>: solid <span class="hljs-number">1px</span> red <span class="hljs-meta">!important</span>;
          <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-meta">!important</span>;
      }</code></pre><p><strong>&#x5FAA;&#x73AF;&#x65B9;&#x6CD5;</strong></p><p>Less &#x5E76;&#x6CA1;&#x6709;&#x63D0;&#x4F9B; for &#x5FAA;&#x73AF;&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x8FD9;&#x4E5F;&#x96BE;&#x4E0D;&#x5012; &#x806A;&#x660E;&#x7684;&#x7A0B;&#x5E8F;&#x5458;&#xFF0C;&#x4F7F;&#x7528;&#x9012;&#x5F52;&#x53BB;&#x5B9E;&#x73B0;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x5B98;&#x7F51;&#x4E2D;&#x7684;&#x4E00;&#x4E2A; Demo&#xFF0C;&#x6A21;&#x62DF;&#x4E86;&#x751F;&#x6210;&#x6805;&#x683C;&#x7CFB;&#x7EDF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .generate-columns(4);
    
      .generate-columns(@n, @i: 1) when (@i =&lt; @n) {
        .column-@{i} {
          width: (@i * 100% / @n);
        }
        .generate-columns(@n, (@i + 1));
      }
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
      .column-1 {
        width: 25%;
      }
      .column-2 {
        width: 50%;
      }
      .column-3 {
        width: 75%;
      }
      .column-4 {
        width: 100%;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="Less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.generate-columns</span>(<span class="hljs-number">4</span>);
    
      <span class="hljs-selector-class">.generate-columns</span>(<span class="hljs-variable">@n</span>, <span class="hljs-variable">@i</span>: <span class="hljs-number">1</span>) <span class="hljs-keyword">when</span> (<span class="hljs-variable">@i</span> =&lt; <span class="hljs-variable">@n</span>) {
        <span class="hljs-selector-class">.column-</span><span class="hljs-variable">@{i}</span> {
          <span class="hljs-attribute">width</span>: (<span class="hljs-variable">@i</span> * <span class="hljs-number">100%</span> / <span class="hljs-variable">@n</span>);
        }
        <span class="hljs-selector-class">.generate-columns</span>(<span class="hljs-variable">@n</span>, (<span class="hljs-variable">@i</span> + <span class="hljs-number">1</span>));
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
      <span class="hljs-selector-class">.column-1</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
      }
      <span class="hljs-selector-class">.column-2</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
      }
      <span class="hljs-selector-class">.column-3</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">75%</span>;
      }
      <span class="hljs-selector-class">.column-4</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      }</code></pre><ol><li><strong>&#x5C5E;&#x6027;&#x62FC;&#x63A5;&#x65B9;&#x6CD5;</strong></li></ol><p><code>+_</code> &#x4EE3;&#x8868;&#x7684;&#x662F; &#x7A7A;&#x683C;&#xFF1B;<code>+</code> &#x4EE3;&#x8868;&#x7684;&#x662F; &#x9017;&#x53F7;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  - &#x9017;&#x53F7;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>
  -<span class="ruby"> &#x9017;&#x53F7;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .boxShadow() {
          box-shadow+: inset 0 0 10px #555;
      }
      .main {
        .boxShadow();
        box-shadow+: 0 0 20px black;
      }
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
      .main {
        box-shadow: inset 0 0 10px #555, 0 0 20px black;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.boxShadow</span>() {
          <span class="hljs-selector-tag">box-shadow</span>+: <span class="hljs-selector-tag">inset</span> <span class="hljs-selector-tag">0</span> <span class="hljs-selector-tag">0</span> <span class="hljs-selector-tag">10px</span> <span class="hljs-selector-id">#555</span>;
      }
      <span class="hljs-selector-class">.main</span> {
        <span class="hljs-selector-class">.boxShadow</span>();
        <span class="hljs-selector-tag">box-shadow</span>+: <span class="hljs-selector-tag">0</span> <span class="hljs-selector-tag">0</span> <span class="hljs-selector-tag">20px</span> <span class="hljs-selector-tag">black</span>;
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
      <span class="hljs-selector-class">.main</span> {
        <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span> <span class="hljs-number">#555</span>, <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span> black;
      }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  - &#x7A7A;&#x683C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code style="word-break:break-word;white-space:initial">  -<span class="ruby"> &#x7A7A;&#x683C;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .Animation() {
        transform+_: scale(2);
      }
      .main {
        .Animation();
        transform+_: rotate(15deg);
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      .main {
        transform: scale(2) rotate(15deg);
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.Animation</span>() {
        <span class="hljs-selector-tag">transform</span>+<span class="hljs-selector-tag">_</span>: <span class="hljs-selector-tag">scale</span>(<span class="hljs-number">2</span>);
      }
      <span class="hljs-selector-class">.main</span> {
        <span class="hljs-selector-class">.Animation</span>();
        <span class="hljs-selector-tag">transform</span>+<span class="hljs-selector-tag">_</span>: <span class="hljs-selector-tag">rotate</span>(<span class="hljs-number">15deg</span>);
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-class">.main</span> {
        <span class="hljs-attribute">transform</span>: scale(<span class="hljs-number">2</span>) rotate(<span class="hljs-number">15deg</span>);
      }</code></pre><ol><li><strong>&#x5B9E;&#x6218;&#x6280;&#x5DE7;</strong><p>&#x4E0B;&#x9762;&#x662F;&#x5B98;&#x7F51;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x8D5E;&#x7684; Demo</p></li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .average(@x, @y) {
        @average: ((@x + @y) / 2);
      }
    
      div {
        .average(16px, 50px); // &#x8C03;&#x7528; &#x65B9;&#x6CD5;
        padding: @average;    // &#x4F7F;&#x7528;&#x8FD4;&#x56DE;&#x503C;
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      div {
        padding: 33px;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.average</span>(<span class="hljs-variable">@x</span>, <span class="hljs-variable">@y</span>) {
        <span class="hljs-variable">@average:</span> ((<span class="hljs-variable">@x</span> + <span class="hljs-variable">@y</span>) / <span class="hljs-number">2</span>);
      }
    
      <span class="hljs-selector-tag">div</span> {
        <span class="hljs-selector-class">.average</span>(<span class="hljs-number">16px</span>, <span class="hljs-number">50px</span>); <span class="hljs-comment">// &#x8C03;&#x7528; &#x65B9;&#x6CD5;</span>
        <span class="hljs-attribute">padding</span>: <span class="hljs-variable">@average</span>;    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x8FD4;&#x56DE;&#x503C;</span>
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">33px</span>;
      }</code></pre><p>&#x53EF;&#x4EE5;&#x8BF4; Less &#x662F;&#x4E00;&#x95E8;&#x4F18;&#x96C5;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#x3002;</p><h3 id="articleHeader9">&#x7EE7;&#x627F;</h3><p>extend &#x662F; Less &#x7684;&#x4E00;&#x4E2A;&#x4F2A;&#x7C7B;&#x3002;&#x5B83;&#x53EF;&#x7EE7;&#x627F; &#x6240;&#x5339;&#x914D;&#x58F0;&#x660E;&#x4E2D;&#x7684;&#x5168;&#x90E8;&#x6837;&#x5F0F;&#x3002;<br><strong>extend &#x5173;&#x952E;&#x5B57;&#x7684;&#x4F7F;&#x7528;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .animation{
          transition: all .3s ease-out;
          .hide{
            transform:scale(0);
          }
      }
      #main{
          &amp;:extend(.animation);
      }
      #con{
          &amp;:extend(.animation .hide);
      }
    
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
      .animation,#main{
        transition: all .3s ease-out;
      }
      .animation .hide , #con{
          transform:scale(0);
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.animation</span>{
          <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span> ease-out;
          <span class="hljs-selector-class">.hide</span>{
            <span class="hljs-attribute">transform</span>:scale(<span class="hljs-number">0</span>);
          }
      }
      <span class="hljs-selector-id">#main</span>{
          <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:extend(.animation)</span>;
      }
      <span class="hljs-selector-id">#con</span>{
          <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:extend(.animation</span> <span class="hljs-selector-class">.hide</span>);
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
      <span class="hljs-selector-class">.animation</span>,<span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span> ease-out;
      }
      <span class="hljs-selector-class">.animation</span> <span class="hljs-selector-class">.hide</span> , <span class="hljs-selector-id">#con</span>{
          <span class="hljs-attribute">transform</span>:scale(<span class="hljs-number">0</span>);
      }</code></pre><p><strong>all &#x5168;&#x5C40;&#x641C;&#x7D22;&#x66FF;&#x6362;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &#x4F7F;&#x7528;&#x9009;&#x62E9;&#x5668;&#x5339;&#x914D;&#x5230;&#x7684; &#x5168;&#x90E8;&#x58F0;&#x660E;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code style="word-break:break-word;white-space:initial">  &#x4F7F;&#x7528;&#x9009;&#x62E9;&#x5668;&#x5339;&#x914D;&#x5230;&#x7684; &#x5168;&#x90E8;&#x58F0;&#x660E;&#x3002;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      #main{
        width: 200px;
      }
      #main {
        &amp;:after {
          content:&quot;Less is good!&quot;;
        }
      }
      #wrap:extend(#main all) {}
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #main,#wrap{
        width: 200px;
      }
      #main:after, #wrap:after {
          content: &quot;Less is good!&quot;;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
      }
      <span class="hljs-selector-id">#main</span> {
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span> {
          <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;Less is good!&quot;</span>;
        }
      }
      <span class="hljs-selector-id">#wrap</span><span class="hljs-selector-pseudo">:extend(</span><span class="hljs-selector-id">#main</span> <span class="hljs-keyword">all</span>) {}
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span>,<span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
      }
      <span class="hljs-selector-id">#main</span><span class="hljs-selector-pseudo">:after</span>, <span class="hljs-selector-id">#wrap</span><span class="hljs-selector-pseudo">:after</span> {
          <span class="hljs-attribute">content</span>: <span class="hljs-string">&quot;Less is good!&quot;</span>;
      }</code></pre><p><strong>&#x51CF;&#x5C11;&#x4EE3;&#x7801;&#x7684;&#x91CD;&#x590D;&#x6027;</strong></p><p>&#x4ECE;&#x8868;&#x9762; &#x770B;&#x6765;&#xFF0C;extend &#x4E0E; &#x65B9;&#x6CD5; &#x6700;&#x5927;&#x7684;&#x5DEE;&#x522B;&#xFF0C;&#x5C31;&#x662F; extend &#x662F;&#x540C;&#x4E2A;&#x9009;&#x62E9;&#x5668;&#x5171;&#x7528;&#x540C;&#x4E00;&#x4E2A;&#x58F0;&#x660E;&#xFF0C;&#x800C; &#x65B9;&#x6CD5; &#x662F;&#x4F7F;&#x7528;&#x81EA;&#x5DF1;&#x7684;&#x58F0;&#x660E;&#xFF0C;&#x8FD9;&#x65E0;&#x7591; &#x589E;&#x52A0;&#x4E86;&#x4EE3;&#x7801;&#x7684;&#x91CD;&#x590D;&#x6027;&#x3002;</p><p>&#x65B9;&#x6CD5;&#x793A;&#x4F8B; &#x4E0E;&#x4E0A;&#x9762;&#x7684; extend &#x8FDB;&#x884C;&#x5BF9;&#x6BD4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      .Method{
        width: 200px;
        &amp;:after {
            content:&quot;Less is good!&quot;;
        }
      }
      #main{
        .Method;
      }
      #wrap{
        .Method;
      }
    
      /* &#x751F;&#x6210;&#x7684; CSS */
      #main{
        width: 200px;
        &amp;:after{
          content:&quot;Less is good!&quot;;
        }  
      }
      #wrap{
        width: 200px;
        &amp;:after{
          content:&quot;Less is good!&quot;;
        }  
      }
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-class">.Method</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span> {
            <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;Less is good!&quot;</span>;
        }
      }
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-selector-class">.Method</span>;
      }
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-selector-class">.Method</span>;
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span>{
          <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;Less is good!&quot;</span>;
        }  
      }
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span>{
          <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;Less is good!&quot;</span>;
        }  
      }
    </code></pre><p><strong>&#x8981;&#x70B9;</strong></p><p><em>&#x7FFB;&#x8BD1;&#x5B98;&#x7F51;</em></p><li><ul><li>&#x9009;&#x62E9;&#x5668;&#x548C;&#x6269;&#x5C55;&#x4E4B;&#x95F4; &#x662F;&#x5141;&#x8BB8;&#x6709;&#x7A7A;&#x683C;&#x7684;&#xFF1A;pre:hover :extend(div pre).</li><li>&#x53EF;&#x4EE5;&#x6709;&#x591A;&#x4E2A;&#x6269;&#x5C55;: pre:hover:extend(div pre):extend(.bucket tr) - &#x6CE8;&#x610F;&#x8FD9;&#x4E0E; pre:hover:extend(div pre, .bucket tr)&#x4E00;&#x6837;&#x3002;</li><li>&#x8FD9;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#x7684;&#xFF0C;&#x6269;&#x5C55;&#x5FC5;&#x987B;&#x5728;&#x6700;&#x540E; : pre:hover:extend(div pre).nth-child(odd)&#x3002;</li></ul></li><ul><li><p>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x89C4;&#x5219;&#x96C6;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x6240;&#x6709;&#x9009;&#x62E9;&#x5668;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;extend&#x5173;&#x952E;&#x5B57;&#x3002;</p><h3 id="articleHeader10">&#x5BFC;&#x5165;</h3><ol><li><p>&#x5BFC;&#x5165; less &#x6587;&#x4EF6; &#x53EF;&#x7701;&#x7565;&#x540E;&#x7F00;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import &quot;main&quot;; 
//&#x7B49;&#x4EF7;&#x4E8E;
import &quot;main.less&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less"><span class="hljs-selector-tag">import</span> &quot;<span class="hljs-selector-tag">main</span>&quot;; 
<span class="hljs-comment">//&#x7B49;&#x4EF7;&#x4E8E;</span>
<span class="hljs-selector-tag">import</span> &quot;<span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.less</span>&quot;;</code></pre></li><li><p><code>@import</code> &#x7684;&#x4F4D;&#x7F6E;&#x53EF;&#x968F;&#x610F;&#x653E;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#main{
  font-size:15px;
}
@import &quot;style&quot;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less"><span class="hljs-selector-id">#main</span>{
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">15px</span>;
}
<span class="hljs-keyword">@import</span> <span class="hljs-string">&quot;style&quot;</span>;</code></pre></li></ol></li></ul><ol><li><p><strong>reference</strong></p><p>Less &#x4E2D; &#x6700;&#x5F3A;&#x5927;&#x7684;&#x7279;&#x6027;<br>&#x4F7F;&#x7528; &#x5F15;&#x5165;&#x7684; Less &#x6587;&#x4EF6;&#xFF0C;&#x4F46;&#x4E0D;&#x4F1A; &#x7F16;&#x8BD1;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Less */
@import (reference) &quot;bootstrap.less&quot;; 

#wrap:extend(.navbar all){}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less"><span class="hljs-comment">/* Less */</span>
<span class="hljs-keyword">@import</span> (reference) <span class="hljs-string">&quot;bootstrap.less&quot;</span>; 

<span class="hljs-selector-id">#wrap</span><span class="hljs-selector-pseudo">:extend(.navbar</span> <span class="hljs-keyword">all</span>){}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &#x7FFB;&#x8BD1;&#x5B98;&#x7F51;&#xFF1A;
 &gt; &#x4F7F;&#x7528;@import (reference)&#x5BFC;&#x5165;&#x5916;&#x90E8;&#x6587;&#x4EF6;&#xFF0C;&#x4F46;&#x4E0D;&#x4F1A;&#x6DFB;&#x52A0; &#x628A;&#x5BFC;&#x5165;&#x7684;&#x6587;&#x4EF6; &#x7F16;&#x8BD1;&#x5230;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x4E2D;&#xFF0C;&#x53EA;&#x5F15;&#x7528;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elm"><code> &#x7FFB;&#x8BD1;&#x5B98;&#x7F51;&#xFF1A;
 &gt; &#x4F7F;&#x7528;@<span class="hljs-keyword">import</span> (reference)&#x5BFC;&#x5165;&#x5916;&#x90E8;&#x6587;&#x4EF6;&#xFF0C;&#x4F46;&#x4E0D;&#x4F1A;&#x6DFB;&#x52A0; &#x628A;&#x5BFC;&#x5165;&#x7684;&#x6587;&#x4EF6; &#x7F16;&#x8BD1;&#x5230;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x4E2D;&#xFF0C;&#x53EA;&#x5F15;&#x7528;&#x3002;
</code></pre></li><li><p><strong>once</strong></p><blockquote><p>@import&#x8BED;&#x53E5;&#x7684;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x3002;&#x8FD9;&#x8868;&#x660E;&#x76F8;&#x540C;&#x7684;&#x6587;&#x4EF6;&#x53EA;&#x4F1A;&#x88AB;&#x5BFC;&#x5165;&#x4E00;&#x6B21;&#xFF0C;&#x800C;&#x968F;&#x540E;&#x7684;&#x5BFC;&#x5165;&#x6587;&#x4EF6;&#x7684;&#x91CD;&#x590D;&#x4EE3;&#x7801;&#x90FD;&#x4E0D;&#x4F1A;&#x89E3;&#x6790;&#x3002;</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import (once) &quot;foo.less&quot;;
@import (once) &quot;foo.less&quot;; // this statement will be ignored" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less"><span class="hljs-keyword">@import</span> (once) <span class="hljs-string">&quot;foo.less&quot;</span>;
<span class="hljs-keyword">@import</span> (once) <span class="hljs-string">&quot;foo.less&quot;</span>; <span class="hljs-comment">// this statement will be ignored</span></code></pre></li><li><p><strong>multiple</strong></p><blockquote><p>&#x4F7F;&#x7528;@import (multiple)&#x5141;&#x8BB8;&#x5BFC;&#x5165;&#x591A;&#x4E2A;&#x540C;&#x540D;&#x6587;&#x4EF6;&#x3002;</p></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Less */
   
// file: foo.less
.a {
  color: green;
}
// file: main.less
@import (multiple) &quot;foo.less&quot;;
@import (multiple) &quot;foo.less&quot;;
   
/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
.a {
  color: green;
}
.a {
  color: green;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less"><span class="hljs-comment">/* Less */</span>
   
<span class="hljs-comment">// file: foo.less</span>
<span class="hljs-selector-class">.a</span> {
  <span class="hljs-attribute">color</span>: green;
}
<span class="hljs-comment">// file: main.less</span>
<span class="hljs-keyword">@import</span> (multiple) <span class="hljs-string">&quot;foo.less&quot;</span>;
<span class="hljs-keyword">@import</span> (multiple) <span class="hljs-string">&quot;foo.less&quot;</span>;
   
<span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
<span class="hljs-selector-class">.a</span> {
  <span class="hljs-attribute">color</span>: green;
}
<span class="hljs-selector-class">.a</span> {
  <span class="hljs-attribute">color</span>: green;
}</code></pre></li></ol><h3 id="articleHeader11">&#x51FD;&#x6570;</h3><ol><li><p><strong>&#x5224;&#x65AD;&#x7C7B;&#x578B;</strong></p><ul><li><p>isnumber</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5224;&#x65AD;&#x7ED9;&#x5B9A;&#x7684;&#x503C; &#x662F;&#x5426; &#x662F;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x3002;

```less
isnumber(#ff0);     // false
isnumber(blue);     // false
isnumber(&quot;string&quot;); // false
isnumber(1234);     // true
isnumber(56px);     // true
isnumber(7.8%);     // true
isnumber(keyword);  // false
isnumber(url(...)); // false
```
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>&#x5224;&#x65AD;&#x7ED9;&#x5B9A;&#x7684;&#x503C; &#x662F;&#x5426; &#x662F;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x3002;

```<span class="hljs-selector-tag">less</span>
<span class="hljs-selector-tag">isnumber</span>(<span class="hljs-number">#ff0</span>);     <span class="hljs-comment">// false</span>
<span class="hljs-selector-tag">isnumber</span>(blue);     <span class="hljs-comment">// false</span>
<span class="hljs-selector-tag">isnumber</span>(<span class="hljs-string">&quot;string&quot;</span>); <span class="hljs-comment">// false</span>
<span class="hljs-selector-tag">isnumber</span>(<span class="hljs-number">1234</span>);     <span class="hljs-comment">// true</span>
<span class="hljs-selector-tag">isnumber</span>(<span class="hljs-number">56px</span>);     <span class="hljs-comment">// true</span>
<span class="hljs-selector-tag">isnumber</span>(<span class="hljs-number">7.8%</span>);     <span class="hljs-comment">// true</span>
<span class="hljs-selector-tag">isnumber</span>(keyword);  <span class="hljs-comment">// false</span>
<span class="hljs-selector-tag">isnumber</span>(url(<span class="hljs-string">...</span>)); <span class="hljs-comment">// false</span>
```
</code></pre></li><li><p>iscolor</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x5224;&#x65AD;&#x7ED9;&#x5B9A;&#x7684;&#x503C; &#x662F;&#x5426; &#x662F;&#x4E00;&#x4E2A;&#x989C;&#x8272;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x5224;&#x65AD;&#x7ED9;&#x5B9A;&#x7684;&#x503C; &#x662F;&#x5426; &#x662F;&#x4E00;&#x4E2A;&#x989C;&#x8272;&#x3002;</span>
</code></pre></li><li><p>isurl</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x5224;&#x65AD;&#x7ED9;&#x5B9A;&#x7684;&#x503C; &#x662F;&#x5426; &#x662F;&#x4E00;&#x4E2A; url &#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x5224;&#x65AD;&#x7ED9;&#x5B9A;&#x7684;&#x503C; &#x662F;&#x5426; &#x662F;&#x4E00;&#x4E2A; url &#x3002;</span>
</code></pre></li></ul></li><li><p><strong>&#x989C;&#x8272;&#x64CD;&#x4F5C;</strong></p><ul><li><p>saturate</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x589E;&#x52A0;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x989C;&#x8272;&#x9971;&#x548C;&#x5EA6;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x589E;&#x52A0;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x989C;&#x8272;&#x9971;&#x548C;&#x5EA6;&#x3002;</span>
</code></pre></li><li><p>lighten</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x589E;&#x52A0;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x989C;&#x8272;&#x4EAE;&#x5EA6;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x589E;&#x52A0;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x989C;&#x8272;&#x4EAE;&#x5EA6;&#x3002;</span>
</code></pre></li><li><p>darken</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x964D;&#x4F4E;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x989C;&#x8272;&#x4EAE;&#x5EA6;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x964D;&#x4F4E;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x989C;&#x8272;&#x4EAE;&#x5EA6;&#x3002;</span>
</code></pre></li><li><p>fade</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x7ED9;&#x989C;&#x8272;&#x8BBE;&#x5B9A;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x900F;&#x660E;&#x5EA6;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x7ED9;&#x989C;&#x8272;&#x8BBE;&#x5B9A;&#x4E00;&#x5B9A;&#x6570;&#x503C;&#x7684;&#x900F;&#x660E;&#x5EA6;&#x3002;</span>
</code></pre></li><li><p>mix</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x6839;&#x636E;&#x6BD4;&#x4F8B;&#x6DF7;&#x5408;&#x4E24;&#x79CD;&#x989C;&#x8272;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x6839;&#x636E;&#x6BD4;&#x4F8B;&#x6DF7;&#x5408;&#x4E24;&#x79CD;&#x989C;&#x8272;&#x3002;</span>
</code></pre></li></ul></li><li><p><strong>&#x6570;&#x5B66;&#x51FD;&#x6570;</strong></p><ul><li><p>ceil</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x5411;&#x4E0A;&#x53D6;&#x6574;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x5411;&#x4E0A;&#x53D6;&#x6574;&#x3002;</span>
</code></pre></li><li><p>floor</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x5411;&#x4E0B;&#x53D6;&#x6574;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x5411;&#x4E0B;&#x53D6;&#x6574;&#x3002;</span>
</code></pre></li><li><p>percentage</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x5C06;&#x6D6E;&#x70B9;&#x6570;&#x8F6C;&#x6362;&#x4E3A;&#x767E;&#x5206;&#x6BD4;&#x5B57;&#x7B26;&#x4E32;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x5C06;&#x6D6E;&#x70B9;&#x6570;&#x8F6C;&#x6362;&#x4E3A;&#x767E;&#x5206;&#x6BD4;&#x5B57;&#x7B26;&#x4E32;&#x3002;</span>
</code></pre></li><li><p>round</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x56DB;&#x820D;&#x4E94;&#x5165;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x56DB;&#x820D;&#x4E94;&#x5165;&#x3002;</span>
</code></pre></li><li><p>sqrt</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x6570;&#x7684;&#x5E73;&#x65B9;&#x6839;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x6570;&#x7684;&#x5E73;&#x65B9;&#x6839;&#x3002;</span>
</code></pre></li><li><p>abs</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x8BA1;&#x7B97;&#x6570;&#x5B57;&#x7684;&#x7EDD;&#x5BF9;&#x503C;&#xFF0C;&#x539F;&#x6837;&#x4FDD;&#x6301;&#x5355;&#x4F4D;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x8BA1;&#x7B97;&#x6570;&#x5B57;&#x7684;&#x7EDD;&#x5BF9;&#x503C;&#xFF0C;&#x539F;&#x6837;&#x4FDD;&#x6301;&#x5355;&#x4F4D;&#x3002;</span>
</code></pre></li><li><p>pow</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; &#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x6570;&#x7684;&#x4E58;&#x65B9;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-quote">&gt; &#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x6570;&#x7684;&#x4E58;&#x65B9;&#x3002;</span>
</code></pre></li></ul></li></ol><p>&#x7531;&#x4E8E; &#x6587;&#x7AE0; &#x7BC7;&#x5E45;&#x6709;&#x9650;&#xFF0C;&#x6240;&#x4EE5; &#x53EA;&#x80FD;&#x4ECB;&#x7ECD;&#x4E00;&#x4E9B; &#x4F7F;&#x7528;&#x6548;&#x7387;&#x9AD8;&#x7684;&#x51FD;&#x6570;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x5B98;&#x7F51;&#x7684;<a href="http://lesscss.cn/functions/" rel="nofollow noreferrer" target="_blank">&#x51FD;&#x6570;&#x94FE;&#x63A5;</a></p><h3 id="articleHeader12">&#x5176;&#x4ED6;</h3><ol><li><p><strong>&#x6CE8;&#x91CA;</strong></p><ul><li>/* */ CSS&#x539F;&#x751F;&#x6CE8;&#x91CA;&#xFF0C;&#x4F1A;&#x88AB;&#x7F16;&#x8BD1;&#x5728; CSS &#x6587;&#x4EF6;&#x4E2D;&#x3002;</li><li>/&#xA0;&#xA0;&#xA0;/ Less&#x63D0;&#x4F9B;&#x7684;&#x4E00;&#x79CD;&#x6CE8;&#x91CA;&#xFF0C;&#x4E0D;&#x4F1A;&#x88AB;&#x7F16;&#x8BD1;&#x5728; CSS &#x6587;&#x4EF6;&#x4E2D;&#x3002;</li></ul></li><li><strong>&#x907F;&#x514D;&#x7F16;&#x8BD1;</strong></li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      #main{
        width:~&apos;calc(300px-30px)&apos;;
      }
    
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
      #main{
        width:calc(300px-30px);
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-string">~&apos;calc(300px-30px)&apos;</span>;
      }
    
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
      <span class="hljs-selector-id">#main</span>{
        <span class="hljs-attribute">width</span>:calc(<span class="hljs-number">300px</span>-<span class="hljs-number">30px</span>);
      }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &#x7ED3;&#x6784;&#xFF1A; `~&apos; &#x503C; &apos;`
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>  &#x7ED3;&#x6784;&#xFF1A; `~<span class="hljs-string">&apos; &#x503C; &apos;</span>`
</code></pre><ol><li><strong>&#x4F7F;&#x7528; JS</strong><p>&#x56E0;&#x4E3A; Less &#x662F;&#x7531; JS &#x7F16;&#x5199;&#xFF0C;&#x6240;&#x4EE5; Less &#x6709;&#x4E00;&#x5F97;&#x5929;&#x72EC;&#x539A;&#x7684;&#x7279;&#x6027;&#xFF1A;&#x4EE3;&#x7801;&#x4E2D;&#x4F7F;&#x7528; Javascript &#x3002;</p></li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      /* Less */
      @content:`&quot;aaa&quot;.toUpperCase()`;
      #randomColor{
        @randomColor: ~&quot;rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)&quot;;
      }
      #wrap{
        width: ~&quot;`Math.round(Math.random() * 100)`px&quot;;
        &amp;:after{
            content:@content;
        }
        height: ~&quot;`window.innerHeight`px&quot;;
        alert:~&quot;`alert(1)`&quot;;
        #randomColor();
        background-color: @randomColor;
      }
      /* &#x751F;&#x6210;&#x540E;&#x7684; CSS */
    
      // &#x5F39;&#x51FA; 1
      #wrap{
        width: &#x968F;&#x673A;&#x503C;&#xFF08;0~100&#xFF09;px;
        height: 743px;//&#x7531;&#x7535;&#x8111;&#x800C;&#x5F02;
        background: &#x968F;&#x673A;&#x989C;&#x8272;;
      }
      #wrap::after{
        content:&quot;AAA&quot;;
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="less hljs"><code class="less">      <span class="hljs-comment">/* Less */</span>
      <span class="hljs-variable">@content:</span><span class="hljs-built_in">`&quot;aaa&quot;.toUpperCase()`</span>;
      <span class="hljs-selector-id">#randomColor</span>{
        <span class="hljs-variable">@randomColor:</span> <span class="hljs-string">~&quot;rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)&quot;</span>;
      }
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-string">~&quot;`Math.round(Math.random() * 100)`px&quot;</span>;
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:after</span>{
            <span class="hljs-attribute">content</span>:<span class="hljs-variable">@content</span>;
        }
        <span class="hljs-attribute">height</span>: <span class="hljs-string">~&quot;`window.innerHeight`px&quot;</span>;
        <span class="hljs-attribute">alert</span>:<span class="hljs-string">~&quot;`alert(1)`&quot;</span>;
        <span class="hljs-selector-id">#randomColor</span>();
        <span class="hljs-attribute">background-color</span>: <span class="hljs-variable">@randomColor</span>;
      }
      <span class="hljs-comment">/* &#x751F;&#x6210;&#x540E;&#x7684; CSS */</span>
    
      <span class="hljs-comment">// &#x5F39;&#x51FA; 1</span>
      <span class="hljs-selector-id">#wrap</span>{
        <span class="hljs-attribute">width</span>: &#x968F;&#x673A;&#x503C;&#xFF08;<span class="hljs-number">0</span>~<span class="hljs-number">100</span>&#xFF09;px;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">743px</span>;<span class="hljs-comment">//&#x7531;&#x7535;&#x8111;&#x800C;&#x5F02;</span>
        <span class="hljs-attribute">background</span>: &#x968F;&#x673A;&#x989C;&#x8272;;
      }
      <span class="hljs-selector-id">#wrap</span><span class="hljs-selector-pseudo">::after</span>{
        <span class="hljs-attribute">content</span>:<span class="hljs-string">&quot;AAA&quot;</span>;
      }</code></pre><p>&#xA0;&#xA0;&#xA0;&#xA0;&#x524D;&#x51E0;&#x4E2A;&#x6708; &#xFF0C; &#x6709;&#x4E2A; <code>CSS in JS</code> &#x7684;&#x6982;&#x5FF5;&#x975E;&#x5E38;&#x706B;&#xFF0C;&#x73B0;&#x5728; &#x770B;&#x6765; <code>JS in CSS</code> &#x4E5F;&#x672A;&#x66FE;&#x4E0D;&#x53EF;&#x3002;<br>&#x6211;&#x89C9;&#x5F97;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x6839;&#x636E; Less &#x8FD9;&#x4E2A;&#x7279;&#x6027;&#x6765;&#x9020;&#x4E2A;&#x8F6E;&#x5B50;&#xFF0C;JS&#x6765;&#x63A7;&#x5236; CSS &#xFF0C;&#x5F62;&#x6210; &#x52A8;&#x6001;&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x6210;&#x529F; &#x5F88;&#x53EF;&#x80FD;&#x4F1A;&#x6539;&#x53D8; &#x73B0;&#x5728;&#x524D;&#x7AEF;&#x7684;&#x6253;&#x5F00;&#x59FF;&#x52BF;&#x3002;</p><h2 id="articleHeader13">&#x7ED3;&#x675F;&#x8BED;</h2><p>&#xA0;&#xA0;&#xA0;&#xA0;&#x4ECE;&#x6211;&#x5B66;&#x4E60; Web &#x4EE5;&#x6765;&#xFF0C;&#x65E0;&#x6570;&#x524D;&#x8F88;&#x544A;&#x8BC9;&#x6211;&#xFF0C;Web &#x6709;&#x4E09;&#x5927;&#x57FA;&#x77F3;&#xFF0C;JS &#x63A7;&#x5236;&#x884C;&#x4E3A;&#xFF0C;HTML &#x63A7;&#x5236;&#x7ED3;&#x6784;&#xFF0C;CSS &#x63A7;&#x5236;&#x6837;&#x5F0F;&#x3002;&#x6211;&#x4E00;&#x76F4;&#x518D;&#x60F3; &#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x5206;&#x4E3A; 3 &#x4E2A;&#x8BED;&#x8A00;&#xFF1F;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x80FD;&#x5408;&#x6210;&#x4E00;&#x4E2A;&#x8BED;&#x8A00;&#xFF1F;&#x6216;&#x8005;&#x8BF4; &#x5C31;&#x6CA1;&#x6709;&#x66F4;&#x5408;&#x9002;&#x7684;&#x5417;&#xFF1F;&#x5728;&#x8FD9;&#x51E0;&#x5E74;&#x7684; Web &#x53D1;&#x5C55;&#x4E2D;&#xFF0C;&#x9875;&#x9762;&#x4ECE; MVC &#x5230; &#x73B0;&#x5728;&#x7684; MVVC&#xFF0C;&#x7ED3;&#x6784;&#x6B63;&#x5728;&#x53D1;&#x751F;&#x7740;&#x6539;&#x53D8;&#xFF0C;&#x4F46; &#x5176;&#x6839;&#x672C; &#x4E0D;&#x8FC7;&#x662F;&#x9020;&#x4E86;&#x4E00;&#x4E2A;&#x53C8;&#x4E00;&#x4E2A; &#x5B8C;&#x7F8E;&#x7684;&#x8F6E;&#x5B50;&#x3002;&#x6211;&#x4EEC;&#x4E3A;&#x4EC0;&#x4E48;&#x5C31;&#x4E0D;&#x80FD;&#x6253;&#x7834;&#x4F20;&#x7EDF;&#x5462;&#xFF1F;&#x8BA9; &#x524D;&#x7AEF;&#x7684; &#x4E09;&#x5927;&#x57FA;&#x77F3; &#x53D8;&#x6210;&#x4E00;&#x5EA7;&#x5927;&#x5C71;&#x5462; &#xFF1F;<br>&#xA0;&#xA0;&#xA0;&#xA0;&#x8BF7;&#x8BD5;&#x60F3;&#x4E00;&#x4E0B;&#xFF0C;&#x90A3;&#x8BE5;&#x662F;&#x4E2A;&#x600E;&#x6837;&#x7684;&#x4E16;&#x754C;&#x3002;</p><hr><p>&#x6211;&#x53EB; Simon &#xFF0C; &#x6765;&#x81EA;&#x5317;&#x65B9;&#xFF0C;&#x4EE5;&#x4E0A;&#x4FBF;&#x662F; Less &#x7684;&#x7279;&#x6027;&#x603B;&#x7ED3;&#xFF0C;&#x5E0C;&#x671B;&#x672C;&#x6587;&#x80FD;&#x5BF9;&#x4F60;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#x3002;</p><p>&#xFF08;&#x5B8C;&#xFF09;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习Less-看这篇就够了

## 原文链接
[https://segmentfault.com/a/1190000012360995](https://segmentfault.com/a/1190000012360995)


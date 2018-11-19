---
title: '一些css基础学习笔记' 
date: 2018-11-19 2:32:04
hidden: true
slug: d3xc8820ksf
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">relative</h1><p>1.&#x5F53;&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;&#x4E86;relative&#x7684;zindex&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x4E3A;absolute&#x65F6;&#xFF0C;&#x8BBE;&#x7F6E;zindex&#x65E0;&#x6548;<br>2.&#x5F53;&#x7236;&#x5143;&#x7D20;relative&#x8BBE;&#x7F6E;&#x4E86;overflow&#xFF1A;hidden&#x65F6;&#xFF0C;&#x5B50;&#x5143;&#x7D20;absolute&#x8D85;&#x51FA;&#x7236;&#x5143;&#x7D20;&#x90E8;&#x5206;&#x65E0;&#x6548;<br>3.relative&#x53EA;&#x80FD;&#x9650;&#x5236;fix&#x7684;zindex&#x5C42;&#x7EA7;<br>4.Relative&#x76F8;&#x5F53;&#x4E8E;&#x81EA;&#x8EAB;&#x8FDB;&#x884C;&#x5B9A;&#x4F4D;&#xFF0C;absolute&#x76F8;&#x5BF9;&#x4E8E;&#x8FB9;&#x754C;<br>5.Margin&#x4F1A;&#x5F71;&#x54CD;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x5B9A;&#x4F4D;&#xFF0C;&#x800C;relative&#x65E0;&#x5F71;&#x54CD;&#xFF08;&#x81EA;&#x5B9A;&#x4E49;&#x62D6;&#x62FD;&#x6548;&#x679C;&#xFF09;<br>6.top&amp;&amp;bottom&#x540C;&#x65F6;&#x5B58;&#x5728;&#xFF0C;bottom&#x65E0;&#x6548;&#xFF1B;&#x540C;&#x7406;&#xFF0C;right&#x65E0;&#x6548;<br>7.relative&#x53EF;&#x63D0;&#x9AD8;&#x5C42;&#x53E0;&#x7EA7;&#x6570;<br>8.&#x7236;&#x5143;&#x7D20;&#x7684;zindex&#x8F83;&#x5927;&#x6392;&#x524D;&#x9762;&#xFF08;&#x6570;&#x503C;&#xFF09;<br>9.Auto&#x6392;&#x5728;&#x4E0A;&#xFF0C;&#xFF08;&#x5F53;&#x524D;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x751F;&#x6210;&#x76D2;&#x5B50;&#x5C42;&#x53E0;&#x6C34;&#x5E73;&#x662F;0 &#x76D2;&#x5B50;&#x3010;&#x9664;&#x975E;&#x662F;&#x6839;&#x5143;&#x7D20;&#x3011;&#x4E0D;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#xFF09;</p><h2 id="articleHeader1">&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&amp;&#x5C42;&#x53E0;&#x6C34;&#x5E73;</h2><p>&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#xFF1A;&#x662F;html&#x5143;&#x7D20;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x4E09;&#x7EF4;&#x6982;&#x5FF5;&#xFF0C;&#x8868;&#x793A;&#x5143;&#x7D20;&#x518D;z&#x8F74;&#x4E0A;&#x6709;&#x4E86;&#x2018;&#x53EF;&#x4EE5;&#x9AD8;&#x4EBA;&#x4E00;&#x7B49;&#x2019;</p><hr><p>&#x5C42;&#x53E0;&#x6C34;&#x5E73;&#xFF1A;&#x6240;&#x6709;&#x5143;&#x7D20;&#x90FD;&#x6709;&#x51B3;&#x5B9A;&#x540C;&#x4E00;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5728;z&#x8F74;&#x4E0A;&#x7684;&#x663E;&#x793A;&#x987A;&#x5E8F;&#xFF0C;&#x6BD4;&#x8F83;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x5C42;&#x53E0;&#x6C34;&#x5E73;,&#x5FC5;&#x987B;&#x662F;&#x8FD9;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;,&#x5426;&#x5219;&#x6CA1;&#x6709;&#x610F;&#x4E49;&#x3002;z-index&#x53EF;&#x4EE5;&#x5F71;&#x54CD; &#x5C42;&#x53E0;&#x6C34;&#x5E73;(&#x53EA;&#x662F;&#x5F71;&#x54CD;,&#x4E0D;&#x662F;&#x51B3;&#x5B9A;)</p><hr><p>&#x9875;&#x9762;&#x6839;&#x5143;&#x7D20;&#x5929;&#x751F;&#x5177;&#x6709;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x79F0;&#x4E4B;&#x4E3A;&#x201C;&#x6839;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x201D;<br>Zindex&#x503C;&#x4E3A;&#x6570;&#x503C;&#x7684;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x4E5F;&#x5177;&#x6709;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;</p><h2 id="articleHeader2">&#x5C42;&#x53E0;&#x987A;&#x5E8F;&#x662F;&#x89C4;&#x5219;</h2><p>(&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x7684;&#x5143;&#x7D20;,&#x5BF9;&#x5E94;&#x4E0B;&#x9762;&#x89C4;&#x5219;&#x7684;&#x5E8F;&#x53F7;&#x8D8A;&#x5927;,&#x4F4D;&#x7F6E;&#x8D8A;&#x9AD8;)<br>1.&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587; background/border<br>2.&#x8D1F;z-index<br>3.block&#x5757;&#x7EA7;&#x5143;&#x7D20;<br>4.float&#x6D6E;&#x52A8;&#x5143;&#x7D20;<br>5.inline/inline-block&#x884C;&#x5185;&#x5143;&#x7D20;<br>6.z-index:auto&#x6216;&#x8005;z-index:0(&#x4E0D;&#x4F9D;&#x8D56;z-index&#x7684;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;)<br>7.&#x6B63;z-index</p><hr><p>1&#x901A;&#x5E38;&#x662F;&#x88C5;&#x9970;&#x5C5E;&#x6027;;34&#x662F;&#x5E03;&#x5C40;,5&#x662F;&#x5185;&#x5BB9;&#x2014;&#x2014;&#x6240;&#x4EE5;&#x884C;&#x5185;&#x5143;&#x7D20;&#x5177;&#x6709;&#x8F83;&#x9AD8;&#x7684;&#x5C42;&#x53E0;&#x5E8F;&#x53F7;<br>&#x80CC;&#x666F;&#x8272;&#x8986;&#x76D6;&#x662F;&#x5C42;&#x53E0;&#x987A;&#x5E8F;&#xFF0C;&#x6587;&#x5B57;&#x8986;&#x76D6;&#x662F;&#x540E;&#x6765;&#x5C45;&#x4E0A;</p><h2 id="articleHeader3">&#x7236;&#x5143;&#x7D20;&#x6210;&#x4E3A;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;</h2><p>1.&#x7236;&#x5143;&#x7D20;&#x8BBE;&#x7F6E;display&#xFF1A;flex&#x4E14;&#x5B50;&#x5143;&#x7D20;&#x7684;zindex&#x4E0D;&#x4E3A;0&#x65F6;<br>2.&#x7236;&#x5143;&#x7D20;&#x7684;&#x900F;&#x660E;&#x5EA6;&#x6709;&#x5177;&#x4F53;&#x6570;&#x503C;<br>3.transform&#x4E0D;&#x7B49;&#x4E8E;none<br>4.mix-blend-mode&#xFF08;&#x6DF7;&#x5408;&#x6A21;&#x5F0F;&#xFF09;&#x4E0D;&#x7B49;&#x4E8E;normal<br>5.filter&#x4E0D;&#x7B49;&#x4E8E;none<br>6.isolation&#xFF1A;&#xFF08;isolate isolation&#x662F;&#x4E3A;mix-blend-mode&#x800C;&#x751F;&#x7684;&#x5C5E;&#x6027;;mix-blend-mode&#x6DF7;&#x5408;&#x9ED8;&#x8BA4;z&#x8F74;&#x6240;&#x6709;&#x5C42;&#x53E0;&#x5728;&#x4E0B;&#x9762;&#x7684;&#x5143;&#x7D20;&#xFF09;<br>7.&#x6761;&#x4EF6;1:&#x7236;&#x7EA7;&#x9700;&#x8981;&#x662F;flex/inline-flex<br>&#x6761;&#x4EF6;2:&#x5B50;&#x5143;&#x7D20;z-index&#x4E0D;&#x4E3A;auto<br>&#xFF08;&#x53EA;&#x9488;&#x5BF9;chrome&#x7B49;blink&#x5185;&#x6838;&#x6D4F;&#x89C8;&#x5668;&#x6709;&#x6548;&#xFF09;<br>8.will-change&#xFF1A;transform&#xFF08;will-change&#x662F;&#x63D0;&#x9AD8;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x3001;&#x52A8;&#x753B;&#x7B49;&#x6E32;&#x67D3;&#x6027;&#x80FD;&#x7684;&#x5C5E;&#x6027;&#xFF09;<br>9.-webkit-overflow-scrolling:touch&#xFF08;&#x79FB;&#x52A8;&#x7AEF;&#xFF09;</p><hr><p>&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x5C42;&#x53E0;&#x5728;&#x666E;&#x901A;&#x5143;&#x7D20;&#x4E4B;&#x4E0A;,&#x56E0;&#x4E3A;&#x4E00;&#x65E6;&#x6210;&#x4E3A;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;,z-index&#x81EA;&#x52A8;&#x751F;&#x6548;,&#x9ED8;&#x8BA4;z-index:auto&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x4F5C;z-index:0;&#x6240;&#x4EE5;&#x4F1A;&#x8986;&#x76D6;block&#x3001;inline&#x3001;float&#x5143;&#x7D20;</p><p>IE7&#x7684;zindex&#xFF1A;auto&#x4E5F;&#x4F1A;&#x65B0;&#x5EFA;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#xFF1B;&#x5143;&#x7D20;&#x7684;&#x5C42;&#x53E0;&#x6C34;&#x5E73;&#x4E3B;&#x8981;&#x7531;&#x6240;&#x5728;&#x7684;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x51B3;&#x5B9A;&#xFF08;&#x907F;&#x514D;&#x4F7F;&#x7528;&#x5B9A;&#x4F4D;&#x5C5E;&#x6027;&#xFF0C;&#x5B9A;&#x4F4D;&#x5C5E;&#x6027;&#x4ECE;&#x5927;&#x5BB9;&#x5668;&#x5E73;&#x7EA7;&#x5206;&#x79BB;&#x4E3A;&#x79C1;&#x6709;&#x5C0F;&#x5BB9;&#x5668;&#xFF09;</p><p>&#x907F;&#x514D;&#x4E00;&#x5C71;&#x6BD4;&#x4E00;&#x5C71;&#x9AD8;&#x7684;&#x6837;&#x5F0F;&#x95EE;&#x9898;&#xFF08;&#x591A;&#x4EBA;&#x5199;&#x4F5C;&#x53CA;&#x540E;&#x671F;&#x7EF4;&#x62A4;&#xFF09;&#xFF1A;&#x5BF9;&#x4E8E;&#x975E;&#x6D6E;&#x5C42;&#x5143;&#x7D20;&#xFF0C;&#x907F;&#x514D;&#x8BBE;&#x7F6E;z-index&#x503C;&#xFF0C;zindex&#x503C;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x9053;&#x7406;&#x9700;&#x8981;&#x8D85;&#x8FC7;2</p><p>&#x907F;&#x514D;&#x6D6E;&#x5C42;&#x7EC4;&#x4EF6;&#x56E0;zindex&#x88AB;&#x8986;&#x76D6;&#x7684;&#x95EE;&#x9898;&#xFF08;&#x7EC4;&#x4EF6;&#x7684;&#x8986;&#x76D6;&#x89C4;&#x5219;&#x5177;&#x6709;&#x52A8;&#x6001;&#x6027;&#xFF0C;&#x610F;&#x5411;&#x4E0D;&#x5230;&#x7684;&#x9AD8;&#x5C42;&#x7EA7;&#x5143;&#x7D20;&#xFF09;&#xFF1A;</p><p>Zindex&#x8D1F;&#x503C;&#x5143;&#x7D20;&#x518D;&#x5C42;&#x53E0;&#x4E0A;&#x4E0B;&#x6587;&#x7684;&#x80CC;&#x666F;&#x4E4B;&#x4E0A;&#xFF0C;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x4E4B;&#x4E0B;&#x3002;</p><h1 id="articleHeader4">absolute&#xFF1A;&#xFF08;&#x65E0;&#x4F9D;&#x8D56;&#xFF09;</h1><p>1.&#x72EC;&#x7ACB;&#x7684;absolute&#x53EF;&#x4EE5;&#x6446;&#x8131;overflow&#x7684;&#x9650;&#x5236;&#xFF0C;&#x65E0;&#x8BBA;&#x662F;&#x6EDA;&#x52A8;&#x8FD8;&#x662F;&#x9690;&#x85CF;<br>2.&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x751F;&#x6548;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6D6E;&#x52A8;&#x65E0;&#x6548;<br>3.&#x7528;&#x4E86;absolute&#x4E4B;&#x540E;&#xFF0C;&#x7528;display&#xFF0C;&#x4F1A;&#x4FDD;&#x7559;&#x4F4D;&#x7F6E;&#x8DDF;&#x968F;&#x7279;&#x6027;&#xFF0C;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;IE7&#x4E2D;&#x7528;&#x4E86;4.absolute&#x4E4B;&#x540E;&#xFF0C;&#x53EA;&#x4F1A;&#x662F;inline-block&#x6C34;&#x5E73;&#x663E;&#x793A;&#xFF0C;&#x6307;&#x5B9A;&#x5305;&#x4E0A;&lt;div&gt;&#x5C31;&#x89E3;&#x51B3;&#x4E86;&#xFF1B;<br>5.&#x914D;&#x5408;margin&#xFF0C;&#x7CBE;&#x786E;&#x5B9A;&#x4F4D;&#xFF0C;&#x9002;&#x5E94;&#x5404;&#x79CD;&#x6D4F;&#x89C8;&#x5668;<br>6.&#x5728;image&#x548C;i&#x4E2D;&#x95F4;&#x4F7F;&#x7528;&#x6CE8;&#x91CA;&#xFF0C;&#x53EF;&#x4EE5;&#x6D88;&#x9664;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x7684;&#x7A7A;&#x683C;&#xFF08;&#x4FDD;&#x8BC1;&#x8D34;&#x5408;&#xFF0C;&#x53EF;&#x4F7F;&#x7528;absolute&#x8DDF;&#x968F;&#x6027;&#xFF09;</p><h2 id="articleHeader5">&#x4E0B;&#x62C9;&#x6846;&#x5B9A;&#x4F4D;&#xFF08;&#x65E0;&#x4F9D;&#x8D56;&#x5B9A;&#x4F4D;&#xFF09;</h2><p>&#x5229;&#x7528;&#x4E86;&#x5373;&#x4F7F;&#x7ED9;&#x4E88;&#x4E86;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5C5E;&#x6027;&#xFF08;&#x524D;&#x63D0;&#x4E0D;&#x7ED9;&#x4E88;&#x4EFB;&#x4F55;top/left/bottom/right&#x503C;&#xFF09;&#xFF0C;&#x5143;&#x7D20;&#x4F1A;&#x4F9D;&#x7136;&#x4FDD;&#x6301;&#x666E;&#x901A;&#x6587;&#x6863;&#x6D41;&#x7684;&#x89C6;&#x89C9;&#x4F4D;&#x7F6E;&#x3002;&#x8FD9;&#x91CC;&#x8BF4;&#x7684;&#x4F4D;&#x7F6E;&#x662F;&#x4E00;&#x79CD;&#x89C6;&#x89C9;&#x4F4D;&#x7F6E;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x6587;&#x6863;&#x6D41;&#x4F4D;&#x7F6E;&#xFF0C;&#x56E0;&#x4E3A;&#x5176;&#x672C;&#x8EAB;&#x9AD8;&#x5EA6;&#x5728;&#x7236;&#x5143;&#x7D20;&#x4E2D;&#x5DF2;&#x7ECF;&#x584C;&#x9677;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5927;&#x5BB6;&#x5E73;&#x65F6;&#x6240;&#x8C13;&#x7684;&#x5DF2;&#x7ECF;&#x8131;&#x79BB;&#x6587;&#x6863;&#x6D41;&#xFF09;&#xFF0C;&#x6B64;&#x65F6;&#x4F7F;&#x7528;margin&#x505A;&#x5E73;&#x79FB;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x76F8;&#x5BF9;&#x4E8E;&#x81EA;&#x5DF1;&#x8FDB;&#x884C;&#x4E86;&#x5B9A;&#x4F4D;&#xFF0C;&#x524D;&#x63D0;&#x8981;&#x5C06;&#x201C;&#x89C6;&#x89C9;&#x4F4D;&#x7F6E;&#x201D;&#x89C4;&#x5212;&#x597D;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6309;&#x7167;&#x6B63;&#x5E38;&#x7684;&#x6587;&#x6863;&#x6D41;&#x8FDB;&#x884C;&#x5E03;&#x5C40;&#xFF08;&#x540E;&#x9762;&#x7684;&#x5143;&#x7D20;&#x5728;&#x53F3;&#x6216;&#x662F;&#x4E0B;&#x4FA7;&#xFF09;&#x3002;</p><h2 id="articleHeader6">&#x5BF9;&#x9F50;&#x5C45;&#x4E2D;&#x6216;&#x8FB9;&#x7F18;</h2><p>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x7684;&#x5143;&#x7D20;&#x524D;&#x52A0;&#xA0; &#x7236;&#x5143;&#x7D20;text-align:center;&#x5373;&#x53EF;&#x4F7F;&#x5F97;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x7684;&#x5143;&#x7D20;&#x5C45;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div style=&quot;background: rebeccapurple;width: 200px;height: 200px;margin: 50px auto;text-align: center&quot;&gt;
    &amp;nbsp;&lt;div style=&quot;background: aquamarine;width: 50px;height: 50px;position: absolute;display: inline-block;margin-left: -25px&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">&quot;background: rebeccapurple;width: 200px;height: 200px;margin: 50px auto;text-align: center&quot;</span>&gt;
    &amp;nbsp;&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">&quot;background: aquamarine;width: 50px;height: 50px;position: absolute;display: inline-block;margin-left: -25px&quot;</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x53F3;&#x8FB9;&#x4FA7;&#x680F;&#x5E94;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;constr&quot;&gt;
    &lt;div class=&quot;course-fixed-x&quot;&gt;
        &amp;nbsp;&lt;div class=&quot;course-fixed&quot;&gt;
        &lt;a href=&quot;http://www.imooc.com/activity/diaocha&quot; class=&quot;goto_top_diaocha&quot;&gt;&lt;/a&gt;
        &lt;a href=&quot;http://www.imooc.com/mobile/app&quot; class=&quot;goto_top_app&quot;&gt;&lt;/a&gt;
        &lt;a href=&quot;http://www.imooc.com/user/feedback&quot; class=&quot;goto_top_feed&quot;&gt;&lt;/a&gt;
    &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;style&gt;
    body {
        margin: 0;
        font: 14px/1.4 &quot;Microsoft YaHei&quot;;
        background-color: #EDEFF0;
    }

    .constr {
        width: 1200px;
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
    }


    .goto_top_diaocha, .goto_top_app, .goto_top_feed {
        display: block;
        width: 48px;
        height: 48px;
        margin-top: 10px;
        background: url(http://img.mukewang.com/5453076e0001869c01920098.png) no-repeat;
    }

    .goto_top_diaocha {
        background-position: -48px 0;
    }

    .goto_top_diaocha:hover {
        background-position: -48px -50px;
    }

    .goto_top_app {
        background-position: -96px 0;
    }

    .goto_top_app:hover {
        background-position: -96px -50px;
    }

    .goto_top_feed {
        background-position: -144px 0;
    }

    .goto_top_feed:hover {
        background-position: -144px -50px;
    }

    .course-fixed-x {
        height: 0;
        text-align: right;
        overflow: hidden;
    }

    .course-fixed {
        display: inline;
        position: fixed;
        margin-left: 20px;
        bottom: 100px;
    }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;constr&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;course-fixed-x&quot;</span>&gt;</span>
        &amp;nbsp;<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;course-fixed&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;http://www.imooc.com/activity/diaocha&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;goto_top_diaocha&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;http://www.imooc.com/mobile/app&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;goto_top_app&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;http://www.imooc.com/user/feedback&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;goto_top_feed&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">14px</span>/<span class="hljs-number">1.4</span> <span class="hljs-string">&quot;Microsoft YaHei&quot;</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#EDEFF0</span>;
    }

    <span class="hljs-selector-class">.constr</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
        <span class="hljs-attribute">max-width</span>: <span class="hljs-number">80%</span>;
        <span class="hljs-attribute">margin-left</span>: auto;
        <span class="hljs-attribute">margin-right</span>: auto;
    }


    <span class="hljs-selector-class">.goto_top_diaocha</span>, <span class="hljs-selector-class">.goto_top_app</span>, <span class="hljs-selector-class">.goto_top_feed</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">48px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">48px</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">url</span>(http://img.mukewang.com/5453076e0001869c01920098.png) no-repeat;
    }

    <span class="hljs-selector-class">.goto_top_diaocha</span> {
        <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">48px</span> <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.goto_top_diaocha</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">48px</span> -<span class="hljs-number">50px</span>;
    }

    <span class="hljs-selector-class">.goto_top_app</span> {
        <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">96px</span> <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.goto_top_app</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">96px</span> -<span class="hljs-number">50px</span>;
    }

    <span class="hljs-selector-class">.goto_top_feed</span> {
        <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">144px</span> <span class="hljs-number">0</span>;
    }

    <span class="hljs-selector-class">.goto_top_feed</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">background-position</span>: -<span class="hljs-number">144px</span> -<span class="hljs-number">50px</span>;
    }

    <span class="hljs-selector-class">.course-fixed-x</span> {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">text-align</span>: right;
        <span class="hljs-attribute">overflow</span>: hidden;
    }

    <span class="hljs-selector-class">.course-fixed</span> {
        <span class="hljs-attribute">display</span>: inline;
        <span class="hljs-attribute">position</span>: fixed;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">100px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p>&#x661F;&#x53F7;&#x5BF9;&#x9F50;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbex0I?w=152&amp;h=436" src="https://static.alili.tech/img/bVbex0I?w=152&amp;h=436" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>&#x661F;&#x53F7;&#x8FDB;&#x884C;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<br>&#x56FE;&#x6807;&#x5BF9;&#x9F50;&#xFF1A;<br>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbex0P?w=310&amp;h=64" src="https://static.alili.tech/img/bVbex0P?w=310&amp;h=64" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x56FE;&#x6807;&#x8FDB;&#x884C;&#x65E0;&#x4F9D;&#x8D56;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;</p><p>&#x6587;&#x5B57;&#x6EA2;&#x51FA;&#xFF1A;<br>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbex0Q?w=1058&amp;h=84" src="https://static.alili.tech/img/bVbex0Q?w=1058&amp;h=84" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbex0S?w=748&amp;h=120" src="https://static.alili.tech/img/bVbex0S?w=748&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>absolut&#x4E0D;&#x5360;&#x636E;&#x5C3A;&#x5BF8;</p><hr><p>&#x56DE;&#x6D41;&#x4E0E;&#x91CD;&#x7ED8;&#xFF1A;&#x52A8;&#x753B;&#x5C3D;&#x91CF;&#x4F5C;&#x7528;&#x5728;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x4E0A;<br>&#x5782;&#x76F4;&#x7A7A;&#x95F4;&#x7684;&#x5C42;&#x7EA7;&#xFF1A;&#x540E;&#x6765;&#x5C45;&#x4E0A;</p><h2 id="articleHeader7">z-index&#x65E0;&#x4F9D;&#x8D56;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.&#x5982;&#x679C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#xFF0C;&#x81EA;&#x7136;&#x4E0D;&#x9700;&#x8981;zindex&#xFF0C;&#x81EA;&#x52A8;&#x8986;&#x76D6;&#x666E;&#x901A;&#x5143;&#x7D20;
2.&#x5982;&#x679C;&#x4E24;&#x4E2A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x63A7;&#x5236;dom&#x6D41;&#x7684;&#x524D;&#x540E;&#x987A;&#x5E8F;&#x8FBE;&#x5230;&#x9700;&#x8981;&#x7684;&#x8986;&#x76D6;&#x6548;&#x679C;&#xFF0C;&#x4F9D;&#x7136;&#x65E0;zindex
3.&#x5982;&#x679C;&#x591A;&#x4E2A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x4EA4;&#x9519;&#xFF0C;&#x975E;&#x5E38;&#x975E;&#x5E38;&#x5C11;&#x89C1;&#xFF01;&#xFF0C;zindex&#xFF1A;1&#x63A7;&#x5236;
4.&#x5982;&#x679C;&#x975E;&#x5F39;&#x6846;&#x7C7B;&#x7684;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;zindex&gt;2&#xFF0C;&#x5FC5;&#x5B9A;zindex&#x5197;&#x4F59;&#xFF0C;&#x9700;&#x8981;&#x4F18;&#x5316;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>&#x5982;&#x679C;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#xFF0C;&#x81EA;&#x7136;&#x4E0D;&#x9700;&#x8981;zindex&#xFF0C;&#x81EA;&#x52A8;&#x8986;&#x76D6;&#x666E;&#x901A;&#x5143;&#x7D20;
<span class="hljs-number">2.</span>&#x5982;&#x679C;&#x4E24;&#x4E2A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x63A7;&#x5236;dom&#x6D41;&#x7684;&#x524D;&#x540E;&#x987A;&#x5E8F;&#x8FBE;&#x5230;&#x9700;&#x8981;&#x7684;&#x8986;&#x76D6;&#x6548;&#x679C;&#xFF0C;&#x4F9D;&#x7136;&#x65E0;zindex
<span class="hljs-number">3.</span>&#x5982;&#x679C;&#x591A;&#x4E2A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x4EA4;&#x9519;&#xFF0C;&#x975E;&#x5E38;&#x975E;&#x5E38;&#x5C11;&#x89C1;&#xFF01;&#xFF0C;zindex&#xFF1A;<span class="hljs-number">1</span>&#x63A7;&#x5236;
<span class="hljs-number">4.</span>&#x5982;&#x679C;&#x975E;&#x5F39;&#x6846;&#x7C7B;&#x7684;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;zindex&gt;<span class="hljs-number">2</span>&#xFF0C;&#x5FC5;&#x5B9A;zindex&#x5197;&#x4F59;&#xFF0C;&#x9700;&#x8981;&#x4F18;&#x5316;

</code></pre><p>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbex01?w=1406&amp;h=482" src="https://static.alili.tech/img/bVbex01?w=1406&amp;h=482" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><hr><p>Absolute&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x7684;&#x65B9;&#x5411;&#x662F;&#x5BF9;&#x7ACB;&#x7684;&#xFF08;left&amp;right top&amp;bottom&#xFF09;<br>&#x4E3E;&#x4F8B;&#xFF1A;<br>Position:absolute; left:0; top:0; width:50%<br>&#x7B49;&#x540C;&#x4E8E;==&#x300B;<br>position&#xFF1A;absolute; left:0; top:0; right:50%;&#xFF08;IE7+&#x624D;&#x652F;&#x6301;&#xFF09;</p><hr><p><span class="img-wrap"><img data-src="/img/bVbex06?w=1460&amp;h=842" src="https://static.alili.tech/img/bVbex06?w=1460&amp;h=842" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span><br>&#x76F8;&#x4E92;&#x652F;&#x6301;&#x6027;&#xFF1A;<br>1.&#x5BB9;&#x5668;&#x65E0;&#x9700;&#x56FA;&#x5B9A;width&#x3001;height&#x503C;&#xFF0C;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x4EA6;&#x53EF;&#x62C9;&#x4F38;&#xFF1B;<br>2.&#x5BB9;&#x5668;&#x62C9;&#x4F38;&#xFF0C;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x652F;&#x6301;&#x767E;&#x5206;&#x6BD4;width&#x3001;height&#x503C;</p><hr><p><span class="img-wrap"><img data-src="/img/bVbex1e?w=1778&amp;h=318" src="https://static.alili.tech/img/bVbex1e?w=1778&amp;h=318" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x82E5;&#x62C9;&#x4F38;&#x548C;width&amp;height&#x5C3A;&#x5BF8;&#x540C;&#x65F6;&#x5B58;&#x5728;&#xFF0C;&#x90A3;&#x4E48;width/height&#x5C3A;&#x5BF8;&#x5927;&#x4E8E;left/top/right/bottom&#x62C9;&#x4F38;&#x5C3A;&#x5BF8;<br>&#x56E0;&#x6B64;=&#x300B;position&#xFF1A;absolute&#xFF1B;top&#xFF1A;0&#xFF1B;left&#xFF1A;0&#xFF1B;right&#xFF1A;0&#xFF1B;width&#xFF1A;50%&#x7684;&#x5B9E;&#x9645;&#x5BBD;&#x5EA6;&#x662F;50%&#x800C;&#x4E0D;&#x662F;100%&#xFF08;&#x5F53;&#x4F7F;&#x7528;margin&#xFF1A;auto &#x53EF;&#x5B9E;&#x73B0;&#x5C45;&#x4E2D;=&#x300B;&#x7EDD;&#x5BF9;&#x5143;&#x7D20;&#x7684;&#x7EDD;&#x5BF9;&#x5C45;&#x4E2D;&#x6548;&#x679C; IE8+&#x652F;&#x6301;&#xFF09;</p><h2 id="articleHeader8">&#x4E00;&#x4E9B;&#x4F8B;&#x5B50;</h2><p>&#x6CA1;&#x6709;&#x5BBD;&#x5EA6;&#x548C;&#x9AD8;&#x5EA6;&#x58F0;&#x660E;&#x5B9E;&#x73B0;&#x7684;&#x5168;&#x5C4F;&#x81EA;&#x9002;&#x5E94;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
html, body { height: 100%; }
.overlay {
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    background-color: #000;
    opacity: .5; filter: alpha(opacity=50);
}
&lt;/style&gt;
&lt;div class=&quot;overlay&quot;&gt;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; }
<span class="hljs-selector-class">.overlay</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">5</span>; <span class="hljs-attribute">filter</span>: <span class="hljs-built_in">alpha</span>(opacity=50);
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;overlay&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x9AD8;&#x5EA6;&#x81EA;&#x9002;&#x5E94;&#x7684;&#x4E5D;&#x5BAB;&#x683C;&#x6548;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;title&gt;&#x9AD8;&#x5EA6;&#x81EA;&#x9002;&#x5E94;&#x7684;&#x4E5D;&#x5BAB;&#x683C;&#x6548;&#x679C;&lt;/title&gt;
&lt;style&gt;
html, body { height: 100%; margin: 0; }
.page {
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
}
.list {
    float: left;
    height: 33.3%; width: 33.3%;
    position: relative;
}
.list:before {
    content: &apos;&apos;;
    position: absolute;
    left: 10px; right: 10px; top: 10px; bottom: 10px;
    border-radius: 10px;
    background-color: #cad5eb;
}
.list:after {
    content:attr(data-index);
    position: absolute;
    height: 30px;
    left: 0; right: 0; top: 0; bottom: 0;
    margin: auto;
    text-align: center;
    font: 24px/30px bold &apos;microsoft yahei&apos;;
}
&lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;div class=&quot;page&quot;&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;1&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;2&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;3&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;4&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;5&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;6&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;7&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;8&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;list&quot; data-index=&quot;9&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x9AD8;&#x5EA6;&#x81EA;&#x9002;&#x5E94;&#x7684;&#x4E5D;&#x5BAB;&#x683C;&#x6548;&#x679C;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>; <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>; }
<span class="hljs-selector-class">.page</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-class">.list</span> {
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">33.3%</span>; <span class="hljs-attribute">width</span>: <span class="hljs-number">33.3%</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.list</span><span class="hljs-selector-pseudo">:before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">&apos;&apos;</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">10px</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">10px</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">10px</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#cad5eb</span>;
}
<span class="hljs-selector-class">.list</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>:<span class="hljs-built_in">attr</span>(data-index);
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: auto;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">font</span>: <span class="hljs-number">24px</span>/<span class="hljs-number">30px</span> bold <span class="hljs-string">&apos;microsoft yahei&apos;</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;page&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;4&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;5&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;6&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;7&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;8&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;list&quot;</span> <span class="hljs-attr">data-index</span>=<span class="hljs-string">&quot;9&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><hr><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="absolute&#x4E0E;&#x6574;&#x4F53;&#x5E03;&#x5C40;&#xFF1A;
1.body&#x964D;&#x7EA7;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x5347;&#x7EA7;
&#xFF08;&#x5168;&#x5C4F;&#x62C9;&#x4F38;&#x6548;&#x679C;&#xFF1A;position&#xFF1A;absolute&#xFF1B;left&#xFF1A;0&#xFF1B;top&#xFF1A;0&#xFF1B;right&#xFF1A;0&#xFF1B;bottom&#xFF1A;0&#xFF09;
&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x53D7;&#x9650;&#x4E8E;&#x7236;&#x7EA7;&#xFF0C;&#x56E0;&#x6B64;&#x5B50;&#x5143;&#x7D20;&#x60F3;&#x8981;&#x62C9;&#x4F38;&#x9700;&#x8981;&#xFF1A;
html&#xFF0C;body{
    height&#xFF1A;100%&#xFF1B;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>absolute&#x4E0E;&#x6574;&#x4F53;&#x5E03;&#x5C40;&#xFF1A;
1<span class="hljs-selector-class">.body</span>&#x964D;&#x7EA7;&#xFF0C;&#x5B50;&#x5143;&#x7D20;&#x5347;&#x7EA7;
&#xFF08;&#x5168;&#x5C4F;&#x62C9;&#x4F38;&#x6548;&#x679C;&#xFF1A;<span class="hljs-attribute">position</span>&#xFF1A;absolute&#xFF1B;<span class="hljs-attribute">left</span>&#xFF1A;0&#xFF1B;<span class="hljs-attribute">top</span>&#xFF1A;0&#xFF1B;<span class="hljs-attribute">right</span>&#xFF1A;0&#xFF1B;<span class="hljs-attribute">bottom</span>&#xFF1A;0&#xFF09;
&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x53D7;&#x9650;&#x4E8E;&#x7236;&#x7EA7;&#xFF0C;&#x56E0;&#x6B64;&#x5B50;&#x5143;&#x7D20;&#x60F3;&#x8981;&#x62C9;&#x4F38;&#x9700;&#x8981;&#xFF1A;
<span class="hljs-selector-tag">html</span>&#xFF0C;<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">height</span>&#xFF1A;100%&#xFF1B;
}</code></pre><hr><p>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbex1m?w=1646&amp;h=660" src="https://static.alili.tech/img/bVbex1m?w=1646&amp;h=660" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h1 id="articleHeader9">float</h1><p><strong>&#x5177;&#x6709;&#x5305;&#x88F9;&#x6027;&#xFF1A;</strong><br>display&#xFF1A;absolute fixed sticky<br>position&#xFF1A;absolute fixed sticky<br>overflow&#xFF1A;hidden scroll</p><p><strong>&#x5177;&#x6709;&#x7834;&#x574F;&#x6027;&#xFF1A;</strong><br>display&#xFF1A;none<br>position&#xFF1A;absolute fixed sticky</p><p><strong>&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x7684;&#x4E24;&#x5927;&#x65B9;&#x6CD5;&#xFF1A;</strong><br>&#x5E95;&#x90E8;&#x63D2;&#x5165;clear&#xFF1A;both<br>&#x7236;&#x5143;&#x7D20;BFC(IE8+)&#x6216;haslayout&#xFF08;IE6/IE7&#xFF09;<br>Clear&#x901A;&#x5E38;&#x5E94;&#x7528;&#x5F62;&#x5F0F;&#xFF1A;<br>html block&#x6C34;&#x5E73;&#x5143;&#x7D20;&#x5E95;&#x90E8;<br>css after&#x4F2A;&#x5143;&#x7D20;&#x5E95;&#x90E8;&#x751F;&#x6210;</p><hr><p><span class="img-wrap"><img data-src="/img/bVbeBJz?w=1140&amp;h=608" src="https://static.alili.tech/img/bVbeBJz?w=1140&amp;h=608" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br><strong>&#x6743;&#x8861;&#x540E;&#x7684;&#x7B56;&#x7565;&#xFF1A;</strong><br>IE8&#x4E4B;&#x540E;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbeBJA?w=1520&amp;h=36" src="https://static.alili.tech/img/bVbeBJA?w=1520&amp;h=36" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>IE6&amp;IE7&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbeBJI?w=392&amp;h=54" src="https://static.alili.tech/img/bVbeBJI?w=392&amp;h=54" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>&#x4F2A;&#x5143;&#x7D20;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbeBJN?w=1304&amp;h=110" src="https://static.alili.tech/img/bVbeBJN?w=1304&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><hr><p><strong>.clearfix&#x5E94;&#x7528;&#x5728;&#x5305;&#x542B;&#x6D6E;&#x52A8;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#x4E0A;</strong></p><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong><br><strong>1.&#x4F7F;&#x7528;&#x4E86;&quot;clear:both&quot;&#x4F46;&#x662F;&#x5B83;&#x4F1A;&#x4E0E;margin&#x91CD;&#x53E0;&#xFF0C;&#x5219;margin-botttom&#x65E0;&#x6CD5;&#x53D1;&#x6325;&#x4F5C;&#x7528;&#xFF1B;</strong><br><strong>2.&#x4F7F;&#x7528;&#x4E86;&#x201C;overflow&#xFF1A;hidden&#x201D;&#x4F7F;&#x5F97;&#x5143;&#x7D20;BFC&#x5316;&#xFF0C;&#x5305;&#x88F9;&#x597D;&#x4E86;&#xFF0C;&#x4E0D;&#x5F71;&#x54CD;margin-bottom&#x53D1;&#x6325;&#x4F5C;&#x7528;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div style=&quot;background-color: #f5f5f5;&quot;&gt;
    &lt;img src=&quot;http://img.mukewang.com/53d60af3000171a002560191.jpg&quot; style=&quot;float:left;&quot;&gt;
    &lt;div style=&quot;clear:both; margin-bottom:100px;&quot;&gt;clear:both;&lt;/div&gt;
&lt;/div&gt;
&lt;div style=&quot;margin-top: 100px;&quot;&gt;&#x672C;&#x6587;&#x5B57;&#x79BB;&#x56FE;&#x7247;&#x7684;&#x8DDD;&#x79BB;&#x662F;&#xFF1F;&lt;/div&gt;
&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;2.
&lt;div style=&quot;background-color: #f5f5f5; overflow: hidden;&quot;&gt;
    &lt;img src=&quot;http://img.mukewang.com/53d60af3000171a002560191.jpg&quot; style=&quot;float:left; margin-bottom: 100px;&quot;&gt;
&lt;/div&gt;
&lt;div style=&quot;margin-top: 100px;&quot;&gt;&#x672C;&#x6587;&#x5B57;&#x79BB;&#x56FE;&#x7247;&#x7684;&#x8DDD;&#x79BB;&#x662F;&#xFF1F;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-color: #f5f5f5;&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://img.mukewang.com/53d60af3000171a002560191.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;float:left;&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;clear:both; margin-bottom:100px;&quot;</span>&gt;</span>clear:both;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;margin-top: 100px;&quot;</span>&gt;</span>&#x672C;&#x6587;&#x5B57;&#x79BB;&#x56FE;&#x7247;&#x7684;&#x8DDD;&#x79BB;&#x662F;&#xFF1F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>2.
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-color: #f5f5f5; overflow: hidden;&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://img.mukewang.com/53d60af3000171a002560191.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;float:left; margin-bottom: 100px;&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;margin-top: 100px;&quot;</span>&gt;</span>&#x672C;&#x6587;&#x5B57;&#x79BB;&#x56FE;&#x7247;&#x7684;&#x8DDD;&#x79BB;&#x662F;&#xFF1F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><hr><h2 id="articleHeader10">float&#x4F5C;&#x7528;</h2><p>1.&#x5143;&#x7D20;block&#x5757;&#x72B6;&#x5316;&#xFF08;&#x7816;&#x5934;&#x5316;&#xFF09;<br>2.&#x7834;&#x574F;&#x6027;&#x9020;&#x6210;&#x7684;&#x7D27;&#x5BC6;&#x6392;&#x5217;&#x7279;&#x6027;&#xFF08;&#x53BB;&#x7A7A;&#x683C;&#x5316;&#xFF09;</p><p>&#x89C4;&#x5B9A;&#x53EF;&#x4EE5;&#x7531;&#x7528;&#x6237;&#x8C03;&#x6574; div &#x5143;&#x7D20;&#x7684;&#x5927;&#x5C0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div
{
resize:both;
overflow:auto;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>
{
<span class="hljs-attribute">resize</span>:both;
<span class="hljs-attribute">overflow</span>:auto;
}</code></pre><h2 id="articleHeader11">IE7&#x6D6E;&#x52A8;&#x95EE;&#x9898;</h2><p><span class="img-wrap"><img data-src="/img/bVbeBJ8?w=1108&amp;h=376" src="https://static.alili.tech/img/bVbeBJ8?w=1108&amp;h=376" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><hr><h2 id="articleHeader12">&#x4E00;&#x4E9B;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x70B9;</h2><p>&#x5305;&#x542B;&#x5757;&#xFF1A;&#x79BB;&#x8BE5;&#x8BE5;&#x5143;&#x7D20;&#x6700;&#x8FD1;&#x7684;&#x5757;&#x7EA7;&#x7956;&#x5148;&#xFF08;&#x7236;&#x7EA7;&#xFF09;</p><p>&#x300A;css&#x6743;&#x5A01;&#x6307;&#x5357;&#x300B;&#xFF1A;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x540C;&#x65F6;&#x5904;&#x4E8E;&#xFF08;&#x5E38;&#x89C4;&#xFF09;&#x6D41;&#x5185;&#x548C;&#x6D41;&#x5916;<br>1.&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E0D;&#x5F71;&#x54CD;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#xFF08;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x4F1A;&#x5F53;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&#xFF09;<br>2.&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4F1A;&#x5F71;&#x54CD;&#x884C;&#x5185;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;&#xFF08;&#x4ECE;&#x800C;&#x95F4;&#x63A5;&#x5F71;&#x54CD;&#x5757;&#x7EA7;&#x5143;&#x7D20;&#x7684;&#x5E03;&#x5C40;</p><p>&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x6446;&#x653E;&#xFF1A;<br>&#x5C3D;&#x91CF;&#x9760;&#x4E0A;<br>&#x5C3D;&#x91CF;&#x9760;&#x5DE6;/&#x53F3;<br>&#x4EC5;&#x80FD;&#x8981;&#x6328;&#x7740;&#x9760;&#xFF0C;margin&#x5916;&#x8FB9;&#x7F18;&#x6328;&#x7740;&#xFF08;&#x4E24;&#x4E2A;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E4B;&#x95F4;&#x7684;margin&#x4E0D;&#x4F1A;&#x88AB;&#x5408;&#x5E76;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x95F4;&#x63A5;&#x5F71;&#x54CD;&#x5757;&#x7EA7;&#x5143;&#x7D20;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code style="word-break:break-word;white-space:initial">&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x95F4;&#x63A5;&#x5F71;&#x54CD;&#x5757;&#x7EA7;&#x5143;&#x7D20;</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeB7E?w=456&amp;h=94" src="https://static.alili.tech/img/bVbeB7E?w=456&amp;h=94" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader13">&#x6491;&#x5F00;&#x5185;&#x542B;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;&#x65E0;&#x9AD8;&#x5EA6;div&#xFF1A;</h2><p>1.&#x53EF;&#x7528;a&#x6807;&#x7B7E; &#x8BBE;&#x7F6E;display&#xFF1A;inline-block&#xFF1B;width&#xFF1A;100%&#xFF0C; &#x628A;&#x542B;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x7684;div&#x6491;&#x8D77;&#x6765;&#xFF08;div&#x4E0D;&#x7528;&#x8BBE;&#x8BA1;&#x9AD8;&#x5EA6;&#xFF09;<br>2.overflow&#xFF1A;hidden(BFC)<br>3.&#x53EF;&#x7528;a&#x6807;&#x7B7E; &#x8BBE;&#x7F6E;display&#xFF1A;block&#xFF1B;width&#xFF1A;100%&#xFF0C;clear&#xFF1A;both</p><p><span class="img-wrap"><img data-src="/img/bVbeB7T?w=364&amp;h=208" src="https://static.alili.tech/img/bVbeB7T?w=364&amp;h=208" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>4.div=&#x300B;display&#xFF1A;table</p><p>5.div=&#x300B;display&#xFF1A;table-cell</p><p>6.div=&#x300B;display&#xFF1A;flow-root&#xFF08;&#x89E6;&#x53D1;BFC&#xFF09;</p><p>7.div::after&#x4EE3;&#x66FF;a&#x6807;&#x7B7E;=&#x300B;content:&#x2019;&#x2019; display:block; clear:both;(&#x6700;&#x4E0B;&#x65B9;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x9AD8;&#x5EA6;&#x7684;&#x5143;&#x7D20;)</p><p>8.&#x4F7F;&#x7528;.clearfix:after{content:&#x2019;&#x2019; display:block; clear:both;}</p><p>9.&#x8BA9;div&#x4E5F;&#x6D6E;&#x52A8;&#xFF08;BFC&#xFF09;</p><p>&#x6559;&#x5B66;&#x89C6;&#x9891;&#xFF1A;<a href="https://segmentfault.com/l/1500000012666812/play">https://segmentfault.com/l/15...</a></p><hr><h1 id="articleHeader14">overflow</h1><p>overflow-x&#xFF1A;y&#x65B9;&#x5411;&#x81EA;&#x52A8;&#x53D8;&#x6210;auto<br>&#x5728;IE7&#x4E2D;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86;&#x5BBD;&#x5EA6;100%&#x65F6;&#xFF0C;&#x4F1A;&#x51FA;&#x73B0;&#x6C34;&#x5E73;&#x6EDA;&#x52A8;&#x6761;<br>&#x4F7F;overflow&#x8D77;&#x6548;&#xFF1A;<br>1.&#x975E;display&#xFF1A;inline&#x6C34;&#x5E73;<br>2.&#x5BF9;&#x5E94;&#x65B9;&#x4F4D;&#x7684;&#x5C3A;&#x5BF8;&#x9650;&#x5236;&#x3002;width/height/max-width/max-height/absolute&#x62C9;&#x4F38;<br>3.&#x5BF9;&#x4E8E;&#x5355;&#x5143;&#x683C;td&#x7B49;&#xFF0C;&#x8FD8;&#x9700;&#x8981;table&#x4E3A;table-layout&#xFF1A;fixed&#x72B6;&#x6001;</p><h2 id="articleHeader15">overflow&#xFF1A;visible</h2><p>IE7&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#xFF0C;&#x6587;&#x5B57;&#x8D8A;&#x591A;&#xFF0C;&#x6309;&#x94AE;&#x4E24;&#x4FA7;padding&#x7559;&#x767D;&#x5C31;&#x8D8A;&#x5927;</p><p><span class="img-wrap"><img data-src="/img/bVbeBKf?w=1170&amp;h=88" src="https://static.alili.tech/img/bVbeBKf?w=1170&amp;h=88" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br>&#x6309;&#x94AE;&#x5728;IE8&#x663E;&#x793A;&#x6B63;&#x5E38;<br><span class="img-wrap"><img data-src="/img/bVbeBKn?w=872&amp;h=108" src="https://static.alili.tech/img/bVbeBKn?w=872&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br><strong>=&#x300B;IE7&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;&#x7ED9;&#x6240;&#x6709;&#x7684;&#x6309;&#x94AE;&#x6DFB;&#x52A0;&#x6837;&#x5F0F;overflow&#xFF1A;visible</strong></p><p><span class="img-wrap"><img data-src="/img/bVbeBKv?w=894&amp;h=132" src="https://static.alili.tech/img/bVbeBKv?w=894&amp;h=132" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><hr><p><strong>&#x6CE8;&#x610F;:</strong><br>&#x65E0;&#x8BBA;&#x4EC0;&#x4E48;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x9ED8;&#x8BA4;&#x6EDA;&#x52A8;&#x6761;&#x5747;&#x6765;&#x81EA;&lt;html&gt;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&lt;body&gt;&#x6807;&#x7B7E;</p><p><span class="img-wrap"><img data-src="/img/bVbeBKz?w=1310&amp;h=194" src="https://static.alili.tech/img/bVbeBKz?w=1310&amp;h=194" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/bVbeBKy?w=1654&amp;h=688" src="https://static.alili.tech/img/bVbeBKy?w=1654&amp;h=688" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader16">Body/html&#x4E0E;&#x6EDA;&#x52A8;&#x6761;</h2><p>&#x53BB;&#x9664;&#x9875;&#x9762;&#x9ED8;&#x8BA4;&#x6EDA;&#x52A8;&#x6761;&#xFF1A;<code>html{ overflow:hidden; }</code></p><p>js&#x4E0E;&#x6EDA;&#x52A8;&#x9AD8;&#x5EA6;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chrome&#xFF1A; document.body.scrollTop;
&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#xFF1A;document.documentElement.scrollTop;
&#x4F46;&#x4E24;&#x8005;&#x4E0D;&#x4F1A;&#x540C;&#x65F6;&#x5B58;&#x5728;&#xFF0C;&#x56E0;&#x6B64;&#xFF1A;
var st = document.body.scrollTop+document.documentElement.scrollTop;&#xFF08;&#x4E0D;&#x63A8;&#x8350;&#xFF09;
&#x5EFA;&#x8BAE;&#x5199;&#x6CD5;&#xFF1A;var st = document.body.scrollTop||document.documentElement.scrollTop;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>chrome&#xFF1A; <span class="hljs-built_in">document</span>.body.scrollTop;
&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#xFF1A;<span class="hljs-built_in">document</span>.documentElement.scrollTop;
&#x4F46;&#x4E24;&#x8005;&#x4E0D;&#x4F1A;&#x540C;&#x65F6;&#x5B58;&#x5728;&#xFF0C;&#x56E0;&#x6B64;&#xFF1A;
<span class="hljs-keyword">var</span> st = <span class="hljs-built_in">document</span>.body.scrollTop+<span class="hljs-built_in">document</span>.documentElement.scrollTop;&#xFF08;&#x4E0D;&#x63A8;&#x8350;&#xFF09;
&#x5EFA;&#x8BAE;&#x5199;&#x6CD5;&#xFF1A;<span class="hljs-keyword">var</span> st = <span class="hljs-built_in">document</span>.body.scrollTop||<span class="hljs-built_in">document</span>.documentElement.scrollTop;
</code></pre><p><strong>overflow&#x7684;pading-bottom&#x7F3A;&#x5931;&#x73B0;&#x8C61;&#xFF1A;</strong><br><strong>&#x9664;&#x4E86;chrome&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x5176;&#x4ED6;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x4E0D;&#x663E;&#x793A; =&#x300B; &#x5BFC;&#x81F4;&#x4E86;&#x4E0D;&#x4E00;&#x6837;&#x7684;scrollHeight&#xFF08;&#x5143;&#x7D20;&#x5185;&#x5BB9;&#x9AD8;&#x5EA6;&#xFF09;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbeBKV?w=1784&amp;h=936" src="https://static.alili.tech/img/bVbeBKV?w=1784&amp;h=936" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader17">&#x89E3;&#x51B3;&#x6C34;&#x5E73;&#x5C45;&#x4E2D;&#x8DF3;&#x52A8;&#x7684;&#x95EE;&#x9898;&#x7684;&#x4FEE;&#x590D;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.html{
    overflow-y:scroll;
}
2.
.container{
    width:1200px;
    padding-left:calc(100vw - 100%);
}
100vw-&#x6D4F;&#x89C8;&#x5668;&#x5BBD;&#x5EA6;&#xFF1B;100%-&#x53EF;&#x7528;&#x5185;&#x5BB9;&#x5BBD;&#x5EA6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>1<span class="hljs-selector-class">.html</span>{
    <span class="hljs-attribute">overflow-y</span>:scroll;
}
2.
<span class="hljs-selector-class">.container</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">1200px</span>;
    <span class="hljs-attribute">padding-left</span>:<span class="hljs-built_in">calc</span>(100vw - 100%);
}
100<span class="hljs-selector-tag">vw-</span>&#x6D4F;&#x89C8;&#x5668;&#x5BBD;&#x5EA6;&#xFF1B;100%<span class="hljs-selector-tag">-</span>&#x53EF;&#x7528;&#x5185;&#x5BB9;&#x5BBD;&#x5EA6;</code></pre><h2 id="articleHeader18">&#x81EA;&#x5B9A;&#x4E49;&#x6EDA;&#x52A8;&#x6761;-webkit</h2><p><span class="img-wrap"><img data-src="/img/bVbeBK3?w=1066&amp;h=724" src="https://static.alili.tech/img/bVbeBK3?w=1066&amp;h=724" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>Ios&#x539F;&#x751F;&#x6EDA;&#x52A8;&#x56DE;&#x8C03;&#x6548;&#x679C;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-overflow-scrolling&#xFF1A;touch&#xFF1B;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby">webkit-overflow-scrolling&#xFF1A;touch&#xFF1B;
</span></code></pre><p>JQ&#x6EDA;&#x52A8;&#x6761;&#x81EA;&#x5B9A;&#x4E49;&#x63D2;&#x4EF6;&#xFF1A;<a href="https://github.com/malihu/malihu-custom-scrollbar-plugin" rel="nofollow noreferrer" target="_blank">https://github.com/malihu/mal...</a></p><h2 id="articleHeader19">BFC</h2><p>&#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;&#xFF08;&#x5185;&#x90E8;&#x5143;&#x7D20;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x5916;&#x90E8;&#x5143;&#x7D20;&#xFF09;</p><p>&#x6E32;&#x67D3;&#x89C4;&#x5219;&#xFF1A;<br>1.bfc&#x5143;&#x7D20;&#x7684;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x8FB9;&#x8DDD;&#x53D1;&#x751F;&#x91CD;&#x53E0;<br>2.bfc&#x533A;&#x57DF;&#x4E0D;&#x4F1A;&#x4E0E;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x91CD;&#x53E0;<br>3.&#x72EC;&#x7ACB;&#x5BB9;&#x5668;<br>4.&#x8BA1;&#x7B97;bfc&#x9AD8;&#x5EA6;&#x65F6;&#xFF0C;&#x6D6E;&#x52A8;&#x5143;&#x7D20;&#x4E5F;&#x4F1A;&#x53C2;&#x4E0E;&#x8BA1;&#x7B97;</p><p>&#x521B;&#x5EFA;bfc&#xFF1A;<br>1.overflow<br>2.&#x6D6E;&#x52A8;&#x4E0D;&#x4E3A;none<br>3.position&#x4E0D;&#x662F;static<br>4.display&#x4E0E;table&#x6709;&#x5173;</p><p>bfc&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF1A;</p><p>...</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="BFC&#x5782;&#x76F4;&#x65B9;&#x5411;&#x91CD;&#x53E0;

//&#x6D88;&#x9664;&#x91CD;&#x53E0;
    &lt;section id=&quot;bfc&quot;&gt;
        &lt;style&gt;
            #bfc{
                background: paleturquoise;
                overflow: hidden;
            }
            #bfc&gt;p{
                margin: 5px auto 25px;
                background: salmon;
            }
        &lt;/style&gt;
        &lt;p&gt;1&lt;/p&gt;
        &lt;div style=&quot;overflow: hidden;background: mediumorchid&quot;&gt;
            &lt;p&gt;2&lt;/p&gt;
        &lt;/div&gt;
        &lt;p&gt;3&lt;/p&gt;
    &lt;/section&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>BFC&#x5782;&#x76F4;&#x65B9;&#x5411;&#x91CD;&#x53E0;

//&#x6D88;&#x9664;&#x91CD;&#x53E0;
    <span class="hljs-tag">&lt;<span class="hljs-name">section</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;bfc&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
            <span class="hljs-selector-id">#bfc</span>{
                <span class="hljs-attribute">background</span>: paleturquoise;
                <span class="hljs-attribute">overflow</span>: hidden;
            }
            <span class="hljs-selector-id">#bfc</span>&gt;<span class="hljs-selector-tag">p</span>{
                <span class="hljs-attribute">margin</span>: <span class="hljs-number">5px</span> auto <span class="hljs-number">25px</span>;
                <span class="hljs-attribute">background</span>: salmon;
            }
        </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>1<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;overflow: hidden;background: mediumorchid&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>2<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>3<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5E03;&#x5C40;&#x5E94;&#x7528;&#xFF1A;
&lt;section id=&quot;layout&quot;&gt;
    &lt;style&gt;
        #layout{
            background: lightpink;
        }
        .left{
            float: left;
            width: 100px;
            height: 100px;
            background: lemonchiffon;
        }
        .right{
            height: 110px;
            background: lightblue;
            overflow: hidden;
        }
    &lt;/style&gt;
    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
&lt;/section&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&#x5E03;&#x5C40;&#x5E94;&#x7528;&#xFF1A;
&lt;section id=<span class="hljs-string">&quot;layout&quot;</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-id">#layout</span>{
            <span class="hljs-attribute">background</span>: lightpink;
        }
        <span class="hljs-selector-class">.left</span>{
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: lemonchiffon;
        }
        <span class="hljs-selector-class">.right</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">110px</span>;
            <span class="hljs-attribute">background</span>: lightblue;
            <span class="hljs-attribute">overflow</span>: hidden;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;left&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;right&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/section&gt;</span></code></pre><hr><hr><p><strong>overflow&#x4E0E;bfc:</strong><br>1.auto<br>2.scroll<br>3.hidden</p><p>&#x6E05;&#x9664;&#x90E8;&#x5206;&#x6D6E;&#x52A8;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".clearfix{
    overflow:hidden;
    _zoom:1;
}

&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x5F71;&#x54CD;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.clearfix</span>{
    <span class="hljs-attribute">overflow</span>:hidden;
    <span class="hljs-attribute">_zoom</span>:<span class="hljs-number">1</span>;
}

&#x6E05;&#x9664;&#x6D6E;&#x52A8;&#x5F71;&#x54CD;</code></pre><p>&#x901A;&#x7528;&#xFF1A;<br>.clearfix{</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow:hidden;
*zoom:1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">overflow</span>:hidden;
*zoom:<span class="hljs-number">1</span>;</code></pre><p>}<br>.clearfix:after{</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="content:&#x2019;&#x2019;;
display:table;
clear:both;    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">content</span>:&#x2019;&#x2019;;
<span class="hljs-attribute">display</span>:table;
<span class="hljs-attribute">clear</span>:both;    </code></pre><p>}</p><p>&#x907F;&#x514D;margin&#x7A7F;&#x900F;&#x95EE;&#x9898;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Overflow:auto scroll hidden
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code>Overflow:<span class="hljs-keyword">auto</span> scroll hidden
</code></pre><p>&#x4E24;&#x680F;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Overflow:scroll auto hidden
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code>Overflow:scroll <span class="hljs-keyword">auto</span> hidden
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeBLs?w=1820&amp;h=956" src="https://static.alili.tech/img/bVbeBLs?w=1820&amp;h=956" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><strong>&#x6CE8;&#x610F;&#xFF1A;&#x4F7F;&#x7528;padding&#x505A;&#x6D41;&#x4F53;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E07;&#x4E07;&#x4E0D;&#x53EF;&#x8BA9;&#x81EA;&#x9002;&#x5E94;&#x5C42;BFC&#x5316;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbeBLt?w=1728&amp;h=772" src="https://static.alili.tech/img/bVbeBLt?w=1728&amp;h=772" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader20">&#x4E24;&#x680F;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;</h2><p><span class="img-wrap"><img data-src="/img/bVbeBLu?w=1398&amp;h=270" src="https://static.alili.tech/img/bVbeBLu?w=1398&amp;h=270" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#xFF08;IE7&#x53EA;&#x9002;&#x7528;&#x4E8E;block&#x5143;&#x7D20;&#xFF09;</p><h2 id="articleHeader21">overflow&#x4E0E;absolute</h2><p>absolute&#x4F7F;overflow&#xFF1A;hidden&#x5931;&#x6548;</p><p>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x4E0D;&#x603B;&#x662F;&#x88AB;&#x7236;&#x7EA7;overflow&#x5C5E;&#x6027;&#x526A;&#x88C1;&#xFF0C;&#x5C24;&#x5176;&#x5F53;overflow&#x5728;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x53CA;&#x5176;&#x5305;&#x542B;&#x5757;&#xFF08;&#x542B;position&#xFF1A;relative absolute fixed&#x58F0;&#x660E;&#x7684;&#x7236;&#x7EA7;&#x5143;&#x7D20;&#xFF0C;&#x6CA1;&#x6709;&#x5219;body&#x5143;&#x7D20;&#xFF09;&#x4E4B;&#x95F4;&#x7684;&#x65F6;&#x5019;</p><p><span class="img-wrap"><img data-src="/img/bVbeBLD?w=670&amp;h=222" src="https://static.alili.tech/img/bVbeBLD?w=670&amp;h=222" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><hr><p><strong>&#x907F;&#x514D;&#x5931;&#x6548;</strong><br>1.overflow&#x5143;&#x7D20;&#x81EA;&#x8EAB;&#x4E3A;&#x5305;&#x542B;&#x5757;<br>2.overflow&#x5143;&#x7D20;&#x7684;&#x5B50;&#x5143;&#x7D20;&#x4E3A;&#x5305;&#x542B;&#x5757;&#xFF08;&#x4E3A;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x5143;&#x7D20;&#x7684;&#x7236;&#x7EA7;&#xFF09;<br>3.&#x4EFB;&#x610F;&#x5408;&#x6CD5;transform&#x751F;&#x547D;&#x5F53;&#x505A;&#x5305;&#x542B;&#x5757;&#xFF08;&#x8BA9;overflow&#x5143;&#x7D20;&#x81EA;&#x8EAB;transform&#x53EA;&#x9002;&#x7528;&#x4E8E;IE9+/FireFox&#xFF1B;&#x8BA9;overflow&#x5B50;&#x5143;&#x7D20;transform&#x53EF;&#x901A;&#x7528;IE9+)</p><hr><h2 id="articleHeader22">overflow&#x5931;&#x6548;&#x5999;&#x7528;</h2><p>&#xFFFC;<br><span class="img-wrap"><img data-src="/img/bVbeBLJ?w=1782&amp;h=800" src="https://static.alili.tech/img/bVbeBLJ?w=1782&amp;h=800" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader23">resize&#x62C9;&#x4F38;</h2><p>Both&#xFF1A;&#x6C34;&#x5E73;&#x5782;&#x76F4;&#x4E24;&#x8FB9;&#x62C9;<br>horizontal&#xFF1A;&#x53EA;&#x6709;&#x6C34;&#x5E73;&#x65B9;&#x5411;&#x62C9;<br>vertical&#xFF1A;&#x53EA;&#x6709;&#x5782;&#x76F4;&#x65B9;&#x5411;&#x62C9;<br>&#x4F7F;&#x7528;&#x524D;&#x63D0;&#xFF1A;&#x5143;&#x7D20;overflow&#x7684;&#x5C5E;&#x6027;&#x503C;&#x4E0D;&#x80FD;&#x662F;visible<br>&#x6587;&#x672C;&#x57DF;&#x9ED8;&#x8BA4;overflow&#xFF1A;auto</p><h2 id="articleHeader24">text-overflow&#xFF1A;ellipsis</h2><p>&#x6587;&#x672C;&#x6EA2;&#x51FA;&#x7528;&#x7701;&#x7565;&#x53F7;&#x8868;&#x793A;<br>&#x4F7F;&#x7528;&#x524D;&#x63D0;&#xFF1A;&#x5143;&#x7D20;overflow&#x7684;&#x5C5E;&#x6027;&#x503C;&#x662F;hidden</p><h2 id="articleHeader25">&#x951A;&#x70B9;&#x6280;&#x672F;</h2><p>&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x7684;&#x672C;&#x8D28;&#xFF1A;&#x6539;&#x53D8;&#x5BB9;&#x5668;&#x7684;&#x6EDA;&#x52A8;&#x9AD8;&#x5EA6;<br>&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x7684;&#x89E6;&#x53D1;&#xFF1A;url&#x5730;&#x5740;&#x4E2D;&#x951A;&#x94FE;&#x548C;&#x951A;&#x70B9;&#x5143;&#x7D20; &#x53EF;focus&#x7684;&#x951A;&#x70B9;&#x5143;&#x7D20;&#x5904;&#x4E8E;focus&#x6001;<br>&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x7684;&#x4F5C;&#x7528;&#xFF1A;&#x5FEB;&#x901F;&#x5B9A;&#x4F4D;</p><p>&#x951A;&#x70B9;&#x5B9A;&#x4F4D;&#x4E0E;overflow&#x9009;&#x9879;&#x5361;&#x6280;&#x672F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeB7Y?w=974&amp;h=714" src="https://static.alili.tech/img/bVbeB7Y?w=974&amp;h=714" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h1 id="articleHeader26">&#x9875;&#x9762;&#x5E03;&#x5C40;&#x7684;&#x53D8;&#x901A;</h1><h2 id="articleHeader27">&#x5DE6;&#x53F3;&#x5BBD;&#x5EA6;&#x56FA;&#x5B9A;&#xFF0C;&#x4E2D;&#x95F4;&#x9002;&#x5E94;</h2><p>&#x5DF2;&#x77E5;&#x5DE6;&#x53F3;&#x680F;&#x9AD8;&#x5EA6;&#x548C;&#x5BBD;&#x5EA6;&#xFF0C;&#x4E2D;&#x95F4;&#x5757;&#x4E3A;&#x81EA;&#x9002;&#x5E94;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;style&gt;
        .content{
            width: auto;
            background: #e6e6e6;
            /*display: flex;*/
        }
        div{
            height: 100px;
        }
        .left{
            width: 300px;
            background: blueviolet;
            float: left;
        }
        .container{
            background: pink;
        }
        .right{
            width: 300px;
            background: paleturquoise;
            float: right;
        }
        .content-absolute .left2,.container2,.right2{
            position: absolute;
        }
        .left2{
            left: 0;
            width: 300px;
            background: palevioletred;
        }
        .container2{
            left: 300px;
            right: 300px;
            background: yellowgreen;
        }
        .right2{
            right: 0px;
            background: antiquewhite;
            width: 300px;
        }
        .content-flex{
            display: flex;
        }
        .left3{
            background: mediumvioletred;
            width: 300px;
        }
        .container3{
             background: #bab8c7;
             flex: 1;
         }
        .right3{
            background: mediumturquoise;
            width: 300px;
        }
        .content-table{
            display: table;
            width: 100%;
        }
        .right4{
            width: 300px;
            display: table-cell;
            background: #d78cfb;
        }
        .left4{
            width: 300px;
            display: table-cell;
            background: lightcoral;
        }
        .container4{
            background: lavender;
        }
        .content-grid{
            display: grid;
            width: 100%;
            grid-template-columns: 300px auto 300px;
        }
        .left5{
            background: #f8de72;
        }
        .right5{
            background: #e3f8b8;
        }
        .container5{
            background: #f89761;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body style=&quot;padding: 0;margin: 0&quot;&gt;
&lt;div class=&quot;content&quot;&gt;
    &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;container&quot;&gt;
        &#x6D6E;&#x52A8;
    &lt;/div&gt;
&lt;/div&gt;
&lt;!--&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x65B9;&#x6848;--&gt;
&lt;div class=&quot;content-absolute&quot;&gt;
    &lt;div class=&quot;left2&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;container2&quot;&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/div&gt;
    &lt;div class=&quot;right2&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!--&#x5F39;&#x6027;&#x76D2;&#x5B50;--&gt;
&lt;div class=&quot;content-flex&quot;&gt;
    &lt;div class=&quot;left3&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;container3&quot;&gt;&#x5F39;&#x6027;&lt;/div&gt;
    &lt;div class=&quot;right3&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!--&#x8868;&#x683C;&#x5E03;&#x5C40;--&gt;
&lt;div class=&quot;content-table&quot;&gt;
    &lt;div class=&quot;left4&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;container4&quot;&gt;&#x8868;&#x683C;&lt;/div&gt;
    &lt;div class=&quot;right4&quot;&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;!--&#x7F51;&#x683C;&#x5E03;&#x5C40;--&gt;
&lt;div class=&quot;content-grid&quot;&gt;
    &lt;div class=&quot;left5&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;container5&quot;&gt;&#x7F51;&#x683C;&lt;/div&gt;
    &lt;div class=&quot;right5&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-class">.content</span>{
            <span class="hljs-attribute">width</span>: auto;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#e6e6e6</span>;
            <span class="hljs-comment">/*display: flex;*/</span>
        }
        <span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
        }
        <span class="hljs-selector-class">.left</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">background</span>: blueviolet;
            <span class="hljs-attribute">float</span>: left;
        }
        <span class="hljs-selector-class">.container</span>{
            <span class="hljs-attribute">background</span>: pink;
        }
        <span class="hljs-selector-class">.right</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">background</span>: paleturquoise;
            <span class="hljs-attribute">float</span>: right;
        }
        <span class="hljs-selector-class">.content-absolute</span> <span class="hljs-selector-class">.left2</span>,<span class="hljs-selector-class">.container2</span>,<span class="hljs-selector-class">.right2</span>{
            <span class="hljs-attribute">position</span>: absolute;
        }
        <span class="hljs-selector-class">.left2</span>{
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">background</span>: palevioletred;
        }
        <span class="hljs-selector-class">.container2</span>{
            <span class="hljs-attribute">left</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">right</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">background</span>: yellowgreen;
        }
        <span class="hljs-selector-class">.right2</span>{
            <span class="hljs-attribute">right</span>: <span class="hljs-number">0px</span>;
            <span class="hljs-attribute">background</span>: antiquewhite;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        }
        <span class="hljs-selector-class">.content-flex</span>{
            <span class="hljs-attribute">display</span>: flex;
        }
        <span class="hljs-selector-class">.left3</span>{
            <span class="hljs-attribute">background</span>: mediumvioletred;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        }
        <span class="hljs-selector-class">.container3</span>{
             <span class="hljs-attribute">background</span>: <span class="hljs-number">#bab8c7</span>;
             <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
         }
        <span class="hljs-selector-class">.right3</span>{
            <span class="hljs-attribute">background</span>: mediumturquoise;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        }
        <span class="hljs-selector-class">.content-table</span>{
            <span class="hljs-attribute">display</span>: table;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-class">.right4</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">display</span>: table-cell;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#d78cfb</span>;
        }
        <span class="hljs-selector-class">.left4</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">display</span>: table-cell;
            <span class="hljs-attribute">background</span>: lightcoral;
        }
        <span class="hljs-selector-class">.container4</span>{
            <span class="hljs-attribute">background</span>: lavender;
        }
        <span class="hljs-selector-class">.content-grid</span>{
            <span class="hljs-attribute">display</span>: grid;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">300px</span> auto <span class="hljs-number">300px</span>;
        }
        <span class="hljs-selector-class">.left5</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f8de72</span>;
        }
        <span class="hljs-selector-class">.right5</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#e3f8b8</span>;
        }
        <span class="hljs-selector-class">.container5</span>{
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f89761</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;padding: 0;margin: 0&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
        &#x6D6E;&#x52A8;
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#x65B9;&#x6848;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content-absolute&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container2&quot;</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--&#x5F39;&#x6027;&#x76D2;&#x5B50;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content-flex&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container3&quot;</span>&gt;</span>&#x5F39;&#x6027;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--&#x8868;&#x683C;&#x5E03;&#x5C40;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content-table&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left4&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container4&quot;</span>&gt;</span>&#x8868;&#x683C;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right4&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--&#x7F51;&#x683C;&#x5E03;&#x5C40;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content-grid&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left5&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container5&quot;</span>&gt;</span>&#x7F51;&#x683C;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right5&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVbff1r?w=1234&amp;h=664" src="https://static.alili.tech/img/bVbff1r?w=1234&amp;h=664" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVbff1H?w=800&amp;h=666" src="https://static.alili.tech/img/bVbff1H?w=800&amp;h=666" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader28">&#x4E0A;&#x4E0B;&#x9AD8;&#x5EA6;&#x56FA;&#x5B9A;&#xFF0C;&#x4E2D;&#x95F4;&#x9002;&#x5E94;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;style&gt;
        body {
            padding: 0;
            margin: 0;
            height: 100%;
        }

        .header1 {
            height: 100px;
            background: #690;
            width: 100%;
            position: absolute;
            top: 0;
        }

        .container1 {
            background: #FC0;
            width: 100%;
            overflow: auto;
            top: 100px;
            position: absolute;
            bottom: 100px;
        }

        .footer1 {
            height: 100px;
            background: #690;
            width: 100%;
            position: absolute;
            z-index: 200;
            bottom: 0;
        }


    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!--&#x6D6E;&#x52A8;--&gt;
&lt;div class=&quot;content-absolute&quot;&gt;
    &lt;div class=&quot;header1&quot;&gt;&lt;/div&gt;
    &lt;div class=&quot;container1&quot;&gt;
            &#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
            &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
        &lt;p&gt;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;footer1&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
        }

        <span class="hljs-selector-class">.header1</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#690</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
        }

        <span class="hljs-selector-class">.container1</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#FC0</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">overflow</span>: auto;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">100px</span>;
        }

        <span class="hljs-selector-class">.footer1</span> {
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#690</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">position</span>: absolute;
            <span class="hljs-attribute">z-index</span>: <span class="hljs-number">200</span>;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
        }


    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#x6D6E;&#x52A8;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content-absolute&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;header1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container1&quot;</span>&gt;</span>
            &#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;footer1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre><h2 id="articleHeader29">&#x4E24;&#x680F;&#x5E03;&#x5C40;</h2><p><strong>&#x5DE6;&#x5BBD;&#x5EA6;&#x56FA;&#x5B9A;&#xFF0C;&#x53F3;&#x8FB9;&#x81EA;&#x9002;&#x5E94;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;content&quot;&gt;
    &lt;div class=&quot;left1&quot;&gt;
        &lt;p&gt;&#x5DE6;&#x4FA7;&#x9876;&#x5BBD;&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class=&quot;right1&quot;&gt;
        &lt;div class=&quot;right1-content&quot;&gt;
            &lt;p&gt;&#x53F3;&#x4FA7;&#x81EA;&#x9002;&#x5E94;&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;left1&quot;</span>&gt;
        &lt;p&gt;&#x5DE6;&#x4FA7;&#x9876;&#x5BBD;&lt;/p&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;right1&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;right1-content&quot;</span>&gt;
            &lt;p&gt;&#x53F3;&#x4FA7;&#x81EA;&#x9002;&#x5E94;&lt;/p&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        .content {
            width: 100%;
            margin: 0 0 10px;
        }

        .left1 {
            position: relative;
            float: left;
            width: 100px;
            margin-right: -100px;
            background: #4eb3b9;
        }

        .right1 {
            float: right;
            width: 100%;
            background: #f8de72;
        }

        .right1-content {
            margin-left:110px;
            background: #ff0097;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>        <span class="hljs-selector-class">.content</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
        }

        <span class="hljs-selector-class">.left1</span> {
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#4eb3b9</span>;
        }

        <span class="hljs-selector-class">.right1</span> {
            <span class="hljs-attribute">float</span>: right;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f8de72</span>;
        }

        <span class="hljs-selector-class">.right1-content</span> {
            <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">110px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0097</span>;
        }</code></pre><p><strong>&#x5DE6;&#x5BBD;&#x5EA6;&#x81EA;&#x9002;&#x5E94;&#xFF0C;&#x53F3;&#x8FB9;&#x56FA;&#x5B9A;&#x5BBD;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;content&quot;&gt;
    &lt;div class=&quot;left1&quot;&gt;
        &lt;div class=&quot;left1-content&quot;&gt;
            &#x5DE6;&#x4FA7;&#x81EA;&#x9002;&#x5E94;
        &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;right1&quot;&gt;
        &#x53F3;&#x4FA7;&#x9876;&#x5BBD;
    &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;content&quot;</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;left1&quot;</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;left1-content&quot;</span>&gt;
            &#x5DE6;&#x4FA7;&#x81EA;&#x9002;&#x5E94;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;right1&quot;</span>&gt;
        &#x53F3;&#x4FA7;&#x9876;&#x5BBD;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        .content {
            width: 100%;
            margin: 0 0 10px;
        }

        .left1 {
            background: #4eb3b9;
            float: left;
            width: 100%;

        }

        .right1 {
            background: #f8de72;
            width:100px;
            float: right;
            position: relative;
            margin-left: -100px;
        }

        .left1-content {
            background: #ff0097;
            margin-right: 120px;
        }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>        <span class="hljs-selector-class">.content</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
        }

        <span class="hljs-selector-class">.left1</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#4eb3b9</span>;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;

        }

        <span class="hljs-selector-class">.right1</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f8de72</span>;
            <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
            <span class="hljs-attribute">float</span>: right;
            <span class="hljs-attribute">position</span>: relative;
            <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100px</span>;
        }

        <span class="hljs-selector-class">.left1-content</span> {
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#ff0097</span>;
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">120px</span>;
        }</code></pre><p><strong>&#x4E0A;&#x9AD8;&#x5EA6;&#x56FA;&#x5B9A;&#xFF0C;&#x4E0B;&#x81EA;&#x9002;&#x5E94;</strong></p><h1 id="articleHeader30">&#x76D2;&#x6A21;&#x578B;</h1><h2 id="articleHeader31">&#x57FA;&#x672C;&#x6982;&#x5FF5;</h2><p><span class="img-wrap"><img data-src="/img/bVbfgvl?w=978&amp;h=682" src="https://static.alili.tech/img/bVbfgvl?w=978&amp;h=682" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbfgvC?w=1000&amp;h=678" src="https://static.alili.tech/img/bVbfgvC?w=1000&amp;h=678" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><strong>&#x4E24;&#x79CD;&#x6A21;&#x578B;&#x7684;&#x8BBE;&#x7F6E;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-sizing:content-box;//&#x6807;&#x51C6;&#x6A21;&#x578B; &#x9ED8;&#x8BA4;
box-sizing:border-box;//IE&#x6A21;&#x578B;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code><span class="hljs-built_in">box</span>-sizing:content-<span class="hljs-built_in">box</span>;<span class="hljs-comment">//&#x6807;&#x51C6;&#x6A21;&#x578B; &#x9ED8;&#x8BA4;</span>
<span class="hljs-built_in">box</span>-sizing:border-<span class="hljs-built_in">box</span>;<span class="hljs-comment">//IE&#x6A21;&#x578B;</span></code></pre><p><strong>JS&#x8BBE;&#x7F6E;&#x76D2;&#x6A21;&#x578B;&#x5BF9;&#x5E94;&#x7684;&#x5BBD;&#x548C;&#x9AD8;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dom.style.width/height:&#x53EA;&#x80FD;&#x53D6;&#x51FA;&#x5185;&#x8054;&#x6837;&#x5F0F;
dom.currentStyle.width/height:&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x53EF;&#x4EE5;&#xFF0C;&#x53EA;&#x6709;ie&#x652F;&#x6301;
window.getComputedStyle(dom&#xFF09;.width/height:&#x90FD;&#x901A;&#x7528;
dom.getBoundingClientRect().width/height:&#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7EDD;&#x5BF9;&#x4F4D;&#x7F6E;&#xFF0C;&#x6839;&#x636E;&#x89C6;&#x7A97;&#x8BA1;&#x7B97;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>dom<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.width</span>/<span class="hljs-attribute">height</span>:&#x53EA;&#x80FD;&#x53D6;&#x51FA;&#x5185;&#x8054;&#x6837;&#x5F0F;
dom<span class="hljs-selector-class">.currentStyle</span><span class="hljs-selector-class">.width</span>/<span class="hljs-attribute">height</span>:&#x4E09;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x53EF;&#x4EE5;&#xFF0C;&#x53EA;&#x6709;ie&#x652F;&#x6301;
window.getComputedStyle(dom&#xFF09;.<span class="hljs-attribute">width</span>/height:&#x90FD;&#x901A;&#x7528;
dom.getBoundingClientRect().<span class="hljs-attribute">width</span>/height:&#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x7EDD;&#x5BF9;&#x4F4D;&#x7F6E;&#xFF0C;&#x6839;&#x636E;&#x89C6;&#x7A97;&#x8BA1;&#x7B97;</code></pre><h2 id="articleHeader32">&#x5B9E;&#x4F8B;&#x9898;</h2><p><strong>&#x89E3;&#x91CA;&#x8FB9;&#x8DDD;&#x91CD;&#x53E0;</strong><br>&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;&#x5757;&#x7EA7;&#x683C;&#x5F0F;&#x5316;&#x4E0A;&#x4E0B;&#x6587;bfc</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
        html *{
            padding: 0;
            margin: 0;
        }
        .child{
            height: 100px;
            background: pink;
            margin-top: 10px;
        }
        .box{
            background: paleturquoise;
            /*&#x9AD8;&#x5EA6;&#x6539;&#x53D8; &#x7236;&#x5143;&#x7D20;bfc*/
            overflow: hidden;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;!--&#x6D6E;&#x52A8;--&gt;
&lt;div class=&quot;box&quot;&gt;
    &lt;div class=&quot;child&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span> *{
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        }
        <span class="hljs-selector-class">.child</span>{
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">background</span>: pink;
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
        }
        <span class="hljs-selector-class">.box</span>{
            <span class="hljs-attribute">background</span>: paleturquoise;
            <span class="hljs-comment">/*&#x9AD8;&#x5EA6;&#x6539;&#x53D8; &#x7236;&#x5143;&#x7D20;bfc*/</span>
            <span class="hljs-attribute">overflow</span>: hidden;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-comment">&lt;!--&#x6D6E;&#x52A8;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一些css基础学习笔记

## 原文链接
[https://segmentfault.com/a/1190000015821360](https://segmentfault.com/a/1190000015821360)


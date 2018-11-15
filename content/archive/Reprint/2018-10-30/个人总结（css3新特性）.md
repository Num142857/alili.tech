---
title: 个人总结（css3新特性）
hidden: true
categories: reprint
slug: 3a646551
date: 2018-10-30 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">1.&#x524D;&#x8A00;</h2><p>css3&#x8FD9;&#x4E2A;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x4E0D;&#x964C;&#x751F;&#x4E86;&#xFF0C;&#x662F;&#x4E2A;&#x975E;&#x5E38;&#x6709;&#x8DA3;&#xFF0C;&#x795E;&#x5947;&#x7684;&#x4E1C;&#x897F;&#xFF01;&#x6709;&#x4E86;css3&#xFF0C;js&#x90FD;&#x53EF;&#x4EE5;&#x5C11;&#x5199;&#x5F88;&#x591A;&#xFF01;&#x6211;&#x4E4B;&#x524D;&#x4E5F;&#x5199;&#x8FC7;&#x5173;&#x4E8E;css3&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x4E5F;&#x5C01;&#x88C5;&#x8FC7;css3&#x7684;&#x4E00;&#x4E9B;&#x5C0F;&#x52A8;&#x753B;&#x3002;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;css3&#x4E0D;&#x96BE;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x96BE;&#x7528;&#x5F97;&#x597D;&#xFF0C;&#x7528;&#x5F97;&#x987A;&#x624B;&#xFF0C;&#x6700;&#x8FD1;&#x6211;&#x4E5F;&#x5728;&#x8FC7;&#x4E00;&#x904D;css3&#x7684;&#x4E00;&#x4E9B;&#x65B0;&#x7279;&#x6027;&#xFF08;&#x4E0D;&#x662F;&#x5168;&#x90E8;&#xFF0C;&#x662F;&#x6211;&#x5728;&#x5DE5;&#x4F5C;&#x4E0A;&#x5E38;&#x7528;&#x7684;&#xFF0C;&#x6216;&#x8005;&#x89C9;&#x5F97;&#x6709;&#x7528;&#x7684;&#xFF09;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E9B;&#x5B9E;&#x4F8B;&#xFF0C;&#x5C31;&#x5199;&#x4E86;&#x8FD9;&#x4E00;&#x7BC7;&#x603B;&#x7ED3;&#xFF01;&#x5E0C;&#x671B;&#xFF0C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x80FD;&#x5E2E;&#x5230;&#x5927;&#x5BB6;&#x8BA4;&#x8BC6;css3&#x3002;&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E3B;&#x8981;&#x662F;&#x8BA9;&#x5927;&#x5BB6;&#x80FD;&#x4E86;&#x89E3;css3&#x7684;&#x4E00;&#x4E9B;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x4EE5;&#x53CA;&#x57FA;&#x7840;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x611F;&#x89C9;css3&#x7684;&#x9B45;&#x529B;&#xFF01;&#x5982;&#x679C;&#x60F3;&#x8981;&#x7528;&#x597D;css3&#xFF0C;&#x8FD9;&#x4E2A;&#x5F97;&#x9760;&#x5927;&#x5BB6;&#x7EE7;&#x7EED;&#x52AA;&#x529B;&#x5B66;&#x4E60;&#xFF0C;&#x5BFB;&#x627E;&#x4E00;&#x4E9B;&#x8BB2;&#x5F97;&#x66F4;&#x6DF1;&#x5165;&#x7684;&#x6587;&#x7AE0;&#x6216;&#x8005;&#x4E66;&#x7C4D;&#x4E86;&#xFF01;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x6709;&#x4EC0;&#x4E48;&#x5176;&#x4ED6;&#x7279;&#x6027;&#x63A8;&#x8350;&#x7684;&#xFF0C;&#x6B22;&#x8FCE;&#x8865;&#x5145;&#xFF01;&#x5927;&#x5BB6;&#x4E00;&#x8D77;&#x5B66;&#x4E60;&#xFF0C;&#x8FDB;&#x6B65;&#xFF01;</p><blockquote>&#x770B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;&#x770B;&#x5F97;&#x8FC7;&#x4E8E;&#x4ED4;&#x7EC6;&#xFF01;&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x662F;&#x60F3;&#x8BA9;&#x5927;&#x5BB6;&#x4E86;&#x89E3;css3&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF01;&#x4EE3;&#x7801;&#x4E5F;&#x662F;&#x5F88;&#x57FA;&#x7840;&#x7684;&#x7528;&#x6CD5;&#x3002;&#x6211;&#x7ED9;&#x51FA;&#x4EE3;&#x7801;&#x4E3B;&#x8981;&#x662F;&#x8BA9;&#x5927;&#x5BB6;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x8FD0;&#x884C;&#x4E00;&#x4E0B;&#xFF0C;&#x8BA9;&#x5927;&#x5BB6;&#x53C2;&#x8003;&#x548C;&#x8C03;&#x8BD5;&#x3002;&#x4E0D;&#x8981;&#x53EA;&#x770B;&#x4EE3;&#x7801;&#xFF0C;&#x53EA;&#x770B;&#x4EE3;&#x7801;&#x7684;&#x8BDD;&#xFF0C;&#x4E0D;&#x4F1A;&#x77E5;&#x9053;&#x54EA;&#x4E2A;&#x4EE3;&#x7801;&#x6709;&#x4EC0;&#x4E48;&#x4F5C;&#x7528;&#x7684;&#xFF0C;&#x5EFA;&#x8BAE;&#x8FB9;&#x770B;&#x6548;&#x679C;&#x8FB9;&#x770B;&#x4EE3;&#x7801;&#x3002;</blockquote><h2 id="articleHeader1">2.&#x8FC7;&#x6E21;</h2><p>&#x8FC7;&#x6E21;&#xFF0C;&#x662F;&#x6211;&#x5728;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x7528;&#x5F97;&#x6700;&#x591A;&#x7684;&#x4E00;&#x4E2A;&#x7279;&#x6027;&#x4E86;&#xFF01;&#x4E5F;&#x76F8;&#x4FE1;&#x662F;&#x5F88;&#x591A;&#x4EBA;&#x7528;&#x5F97;&#x6700;&#x591A;&#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF01;&#x6211;&#x5E73;&#x5E38;&#x4F7F;&#x7528;&#x5C31;&#x662F;&#x60F3;&#x8BA9;&#x4E00;&#x4E9B;&#x4EA4;&#x4E92;&#x6548;&#x679C;&#xFF08;&#x4E3B;&#x8981;&#x662F;hover&#x52A8;&#x753B;&#xFF09;&#xFF0C;&#x53D8;&#x5F97;&#x751F;&#x52A8;&#x4E00;&#x4E9B;&#xFF0C;&#x4E0D;&#x4F1A;&#x663E;&#x5F97;&#x90A3;&#x4E48;&#x751F;&#x786C;&#xFF01;&#x597D;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x8FDB;&#x5165;&#x6B63;&#x6587;&#xFF01;</p><p>&#x5F15;&#x7528;&#x83DC;&#x9E1F;&#x6559;&#x7A0B;&#x7684;&#x8BF4;&#x6CD5;&#xFF1A;CSS3 &#x8FC7;&#x6E21;&#x662F;&#x5143;&#x7D20;&#x4ECE;&#x4E00;&#x79CD;&#x6837;&#x5F0F;&#x9010;&#x6E10;&#x6539;&#x53D8;&#x4E3A;&#x53E6;&#x4E00;&#x79CD;&#x7684;&#x6548;&#x679C;&#x3002;&#x8981;&#x5B9E;&#x73B0;&#x8FD9;&#x4E00;&#x70B9;&#xFF0C;&#x5FC5;&#x987B;&#x89C4;&#x5B9A;&#x4E24;&#x9879;&#x5185;&#x5BB9;&#xFF1A;&#x6307;&#x5B9A;&#x8981;&#x6DFB;&#x52A0;&#x6548;&#x679C;&#x7684;CSS&#x5C5E;&#x6027;&#x6307;&#x5B9A;&#x6548;&#x679C;&#x7684;&#x6301;&#x7EED;&#x65F6;&#x95F4;&#x3002;</p><h3 id="articleHeader2">2-1&#x8BED;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition&#xFF1A; CSS&#x5C5E;&#x6027;&#xFF0C;&#x82B1;&#x8D39;&#x65F6;&#x95F4;&#xFF0C;&#x6548;&#x679C;&#x66F2;&#x7EBF;(&#x9ED8;&#x8BA4;ease)&#xFF0C;&#x5EF6;&#x8FDF;&#x65F6;&#x95F4;(&#x9ED8;&#x8BA4;0)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code style="word-break:break-word;white-space:initial"><span class="hljs-selector-tag">transition</span>&#xFF1A; <span class="hljs-selector-tag">CSS</span>&#x5C5E;&#x6027;&#xFF0C;&#x82B1;&#x8D39;&#x65F6;&#x95F4;&#xFF0C;&#x6548;&#x679C;&#x66F2;&#x7EBF;(&#x9ED8;&#x8BA4;ease)&#xFF0C;&#x5EF6;&#x8FDF;&#x65F6;&#x95F4;(&#x9ED8;&#x8BA4;<span class="hljs-number">0</span>)</code></pre><p>&#x6817;&#x5B50;1</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x5BBD;&#x5EA6;&#x4ECE;&#x539F;&#x59CB;&#x503C;&#x5230;&#x5236;&#x5B9A;&#x503C;&#x7684;&#x4E00;&#x4E2A;&#x8FC7;&#x6E21;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;ease,&#x8FD0;&#x52A8;&#x65F6;&#x95F4;0.5&#x79D2;&#xFF0C;0.2&#x79D2;&#x540E;&#x6267;&#x884C;&#x8FC7;&#x6E21;*/
transition&#xFF1A;width,.5s,ease,.2s" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/*&#x5BBD;&#x5EA6;&#x4ECE;&#x539F;&#x59CB;&#x503C;&#x5230;&#x5236;&#x5B9A;&#x503C;&#x7684;&#x4E00;&#x4E2A;&#x8FC7;&#x6E21;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;ease,&#x8FD0;&#x52A8;&#x65F6;&#x95F4;0.5&#x79D2;&#xFF0C;0.2&#x79D2;&#x540E;&#x6267;&#x884C;&#x8FC7;&#x6E21;*/</span>
<span class="hljs-selector-tag">transition</span>&#xFF1A;<span class="hljs-selector-tag">width</span>,<span class="hljs-selector-class">.5s</span>,<span class="hljs-selector-tag">ease</span>,<span class="hljs-selector-class">.2s</span></code></pre><p>&#x6817;&#x5B50;2</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x6240;&#x6709;&#x5C5E;&#x6027;&#x4ECE;&#x539F;&#x59CB;&#x503C;&#x5230;&#x5236;&#x5B9A;&#x503C;&#x7684;&#x4E00;&#x4E2A;&#x8FC7;&#x6E21;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;ease,&#x8FD0;&#x52A8;&#x65F6;&#x95F4;0.5&#x79D2;*/
transition&#xFF1A;all,.5s
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/*&#x6240;&#x6709;&#x5C5E;&#x6027;&#x4ECE;&#x539F;&#x59CB;&#x503C;&#x5230;&#x5236;&#x5B9A;&#x503C;&#x7684;&#x4E00;&#x4E2A;&#x8FC7;&#x6E21;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;ease,&#x8FD0;&#x52A8;&#x65F6;&#x95F4;0.5&#x79D2;*/</span>
<span class="hljs-selector-tag">transition</span>&#xFF1A;<span class="hljs-selector-tag">all</span>,<span class="hljs-selector-class">.5s</span>
</code></pre><p>&#x4E0A;&#x9762;&#x6817;&#x5B50;&#x662F;&#x7B80;&#x5199;&#x6A21;&#x5F0F;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5206;&#x5F00;&#x5199;&#x5404;&#x4E2A;&#x5C5E;&#x6027;&#xFF08;&#x8FD9;&#x4E2A;&#x5728;&#x4E0B;&#x9762;&#x5C31;&#x4E0D;&#x518D;&#x91CD;&#x590D;&#x4E86;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="transition-property: width;
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">transition-property</span>: width;
<span class="hljs-attribute">transition-duration</span>: <span class="hljs-number">1s</span>;
<span class="hljs-attribute">transition-timing-function</span>: linear;
<span class="hljs-attribute">transition-delay</span>: <span class="hljs-number">2s</span>;
</code></pre><h3 id="articleHeader3">2-2&#x5B9E;&#x4F8B;-hover&#x6548;&#x679C;</h3><p><span class="img-wrap"><img data-src="/img/bVTbJs?w=467&amp;h=139" src="https://static.alili.tech/img/bVTbJs?w=467&amp;h=139" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x4E24;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;&#x4E86;&#x8FC7;&#x6E21;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x8FC7;&#x6E21;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5F53;&#x4E2D;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x7528;&#x4E86;&#x8FC7;&#x6E21;&#x4E4B;&#x540E;&#x662F;&#x4E0D;&#x662F;&#x6CA1;&#x6709;&#x90A3;&#x4E48;&#x751F;&#x786C;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x53D8;&#x5316;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x663E;&#x5F97;&#x6BD4;&#x8F83;&#x751F;&#x52A8;&#x3002;<br>&#x5F53;&#x7136;&#x8FD9;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x8FC7;&#x6E21;&#x6817;&#x5B50;&#xFF0C;&#x4E24;&#x4E2A;&#x6309;&#x94AE;&#x7684;&#x6837;&#x5F0F;&#x4EE3;&#x7801;&#xFF0C;&#x552F;&#x4E00;&#x7684;&#x533A;&#x522B;&#x5C31;&#x662F;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x52A0;&#x4E86;&#x8FC7;&#x6E21;&#x4EE3;&#x7801;<code>transition: all .5s;</code></p><h3 id="articleHeader4">2-3&#x5B9E;&#x4F8B;-&#x4E0B;&#x62C9;&#x83DC;&#x5355;</h3><p><span class="img-wrap"><img data-src="/img/bVTbLy?w=592&amp;h=570" src="https://static.alili.tech/img/bVTbLy?w=592&amp;h=570" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4E0A;&#x9762;&#x4E24;&#x4E2A;&#x83DC;&#x5355;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#x8FC7;&#x6E21;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x4F7F;&#x7528;&#x8FC7;&#x6E21;&#xFF0C;&#x5927;&#x5BB6;&#x660E;&#x663E;&#x770B;&#x5230;&#x533A;&#x522B;&#xFF0C;&#x4F7F;&#x7528;&#x4E86;&#x8FC7;&#x6E21;&#x770B;&#x8D77;&#x6765;&#x4E5F;&#x662F;&#x6BD4;&#x8F83;&#x8212;&#x670D;&#xFF01;&#x4EE3;&#x7801;&#x533A;&#x522B;&#x5C31;&#x662F;&#x6709;&#x8FC7;&#x6E21;&#x7684;ul&#x7684;&#x4E0A;&#x7EA7;&#x5143;&#x7D20;(&#x7956;&#x5148;&#x5143;&#x7D20;)&#x6709;&#x4E00;&#x4E2A;&#x7C7B;&#x540D;&#xFF08;ul-transition&#xFF09;&#x3002;&#x5229;&#x7528;&#x8FD9;&#x4E2A;&#x7C7B;&#x540D;&#xFF0C;&#x8BBE;&#x7F6E;ul&#x7684;&#x8FC7;&#x6E21;<code>.ul-transition ul{transform-origin: 0 0;transition: all .5s;}</code></p><p>&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x4E0D;&#x77E5;&#x9053;&#x6211;&#x5728;&#x8BF4;&#x4EC0;&#x4E48;&#xFF01;&#x6211;&#x8D34;&#x4E0B;&#x4EE3;&#x7801;&#x5427;</p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;demo-hover demo-ul t_c&quot;&gt;
    &lt;ul class=&quot;fllil&quot;&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;html&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;div&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;h1&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;js&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;string&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;array&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;object&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;number&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;css3&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;transition&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;animation&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;&#x6846;&#x67B6;&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;vue&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;react&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;clear&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;div class=&quot;demo-hover demo-ul ul-transition t_c&quot;&gt;
    &lt;ul class=&quot;fllil&quot;&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;html&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;div&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;h1&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;js&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;string&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;array&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;object&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;number&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;css3&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;transition&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;animation&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li&gt;
            &lt;a href=&quot;javascript:;&quot;&gt;&#x6846;&#x67B6;&lt;/a&gt;
            &lt;ul&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;vue&lt;/a&gt;&lt;/li&gt;
                &lt;li&gt;&lt;a href=&quot;#&quot;&gt;react&lt;/a&gt;&lt;/li&gt;
            &lt;/ul&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;clear&quot;&gt;&lt;/div&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-hover demo-ul t_c&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fllil&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>html<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>div<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>h1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>js<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>string<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>array<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>object<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>number<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>css3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>transition<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>animation<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x6846;&#x67B6;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>vue<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>react<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clear&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-hover demo-ul ul-transition t_c&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;fllil&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>html<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>div<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>h1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>js<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>string<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>array<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>object<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>number<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>css3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>transition<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>animation<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;javascript:;&quot;</span>&gt;</span>&#x6846;&#x67B6;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>vue<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span>react<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;clear&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".demo-ul{margin-bottom: 300px;}
    .demo-ul li{
        padding: 0 10px;
        width: 100px;
        background: #f90;
        position: relative;
    }
    .demo-ul li a{
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .demo-ul li ul{
        position: absolute;
        width: 100%;
        top: 40px;
        left: 0;
        transform: scaleY(0);
        overflow: hidden;
    }
    .ul-transition ul{
        transform-origin: 0 0;
        transition: all .5s;
    }
    .demo-ul li:hover ul{
        transform: scaleY(1);
    }
    .demo-ul li ul li{
        float: none;
        background: #0099ff;

}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.demo-ul</span>{<span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">300px</span>;}
    <span class="hljs-selector-class">.demo-ul</span> <span class="hljs-selector-tag">li</span>{
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#f90</span>;
        <span class="hljs-attribute">position</span>: relative;
    }
    <span class="hljs-selector-class">.demo-ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span>{
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-class">.demo-ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span>{
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">40px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0);
        <span class="hljs-attribute">overflow</span>: hidden;
    }
    <span class="hljs-selector-class">.ul-transition</span> <span class="hljs-selector-tag">ul</span>{
        <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
        <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">5s</span>;
    }
    <span class="hljs-selector-class">.demo-ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-tag">ul</span>{
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(1);
    }
    <span class="hljs-selector-class">.demo-ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>{
        <span class="hljs-attribute">float</span>: none;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#0099ff</span>;

}
</code></pre><p>&#x4E0A;&#x9762;&#x4E24;&#x4E2A;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x8FC7;&#x6E21;&#x5F88;&#x57FA;&#x7840;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x8FC7;&#x6E21;&#x7528;&#x6CD5;&#x7075;&#x6D3B;&#xFF0C;&#x529F;&#x80FD;&#x4E5F;&#x5F3A;&#x5927;&#xFF0C;&#x7ED3;&#x5408;js&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x5404;&#x79CD;&#x6548;&#x679C;&#xFF08;&#x7126;&#x70B9;&#x56FE;&#xFF0C;&#x624B;&#x98CE;&#x7434;&#xFF09;&#x7B49;&#xFF0C;&#x4EE5;&#x53CA;&#x5F88;&#x591A;&#x610F;&#x60F3;&#x4E0D;&#x5230;&#x7684;&#x6548;&#x679C;&#x3002;&#x8FD9;&#x4E2A;&#x9760;&#x5927;&#x5BB6;&#x8981;&#x53BB;&#x6316;&#x6398;&#xFF01;</p><h2 id="articleHeader5">3.&#x52A8;&#x753B;</h2><p>&#x52A8;&#x753B;&#x8FD9;&#x4E2A;&#x5E73;&#x5E38;&#x7528;&#x7684;&#x4E5F;&#x5F88;&#x591A;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x505A;&#x4E00;&#x4E2A;&#x9884;&#x8BBE;&#x7684;&#x52A8;&#x753B;&#x3002;&#x548C;&#x4E00;&#x4E9B;&#x9875;&#x9762;&#x4EA4;&#x4E92;&#x7684;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x7ED3;&#x679C;&#x548C;&#x8FC7;&#x6E21;&#x5E94;&#x8BE5;&#x4E00;&#x6837;&#xFF0C;&#x8BA9;&#x9875;&#x9762;&#x4E0D;&#x4F1A;&#x90A3;&#x4E48;&#x751F;&#x786C;&#xFF01;</p><h3 id="articleHeader6">3-1.&#x8BED;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation&#xFF1A;&#x52A8;&#x753B;&#x540D;&#x79F0;&#xFF0C;&#x4E00;&#x4E2A;&#x5468;&#x671F;&#x82B1;&#x8D39;&#x65F6;&#x95F4;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#xFF08;&#x9ED8;&#x8BA4;ease&#xFF09;&#xFF0C;&#x52A8;&#x753B;&#x5EF6;&#x8FDF;&#xFF08;&#x9ED8;&#x8BA4;0&#xFF09;&#xFF0C;&#x64AD;&#x653E;&#x6B21;&#x6570;&#xFF08;&#x9ED8;&#x8BA4;1&#xFF09;&#xFF0C;&#x662F;&#x5426;&#x53CD;&#x5411;&#x64AD;&#x653E;&#x52A8;&#x753B;&#xFF08;&#x9ED8;&#x8BA4;normal&#xFF09;&#xFF0C;&#x662F;&#x5426;&#x6682;&#x505C;&#x52A8;&#x753B;&#xFF08;&#x9ED8;&#x8BA4;running&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code style="word-break:break-word;white-space:initial">animation&#xFF1A;&#x52A8;&#x753B;&#x540D;&#x79F0;&#xFF0C;&#x4E00;&#x4E2A;&#x5468;&#x671F;&#x82B1;&#x8D39;&#x65F6;&#x95F4;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#xFF08;&#x9ED8;&#x8BA4;ease&#xFF09;&#xFF0C;&#x52A8;&#x753B;&#x5EF6;&#x8FDF;&#xFF08;&#x9ED8;&#x8BA4;<span class="hljs-number">0</span>&#xFF09;&#xFF0C;&#x64AD;&#x653E;&#x6B21;&#x6570;&#xFF08;&#x9ED8;&#x8BA4;<span class="hljs-number">1</span>&#xFF09;&#xFF0C;&#x662F;&#x5426;&#x53CD;&#x5411;&#x64AD;&#x653E;&#x52A8;&#x753B;&#xFF08;&#x9ED8;&#x8BA4;normal&#xFF09;&#xFF0C;&#x662F;&#x5426;&#x6682;&#x505C;&#x52A8;&#x753B;&#xFF08;&#x9ED8;&#x8BA4;running&#xFF09;</code></pre><p>&#x6817;&#x5B50;1</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x6267;&#x884C;&#x4E00;&#x6B21;logo2-line&#x52A8;&#x753B;&#xFF0C;&#x8FD0;&#x52A8;&#x65F6;&#x95F4;2&#x79D2;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#x4E3A; linear*/
animation: logo2-line 2s linear;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-comment">/*&#x6267;&#x884C;&#x4E00;&#x6B21;logo2-line&#x52A8;&#x753B;&#xFF0C;&#x8FD0;&#x52A8;&#x65F6;&#x95F4;2&#x79D2;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#x4E3A; linear*/</span>
<span class="hljs-built_in">animation</span>: logo2-line 2s <span class="hljs-built_in">linear</span>;</code></pre><p>&#x6817;&#x5B50;2</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*2&#x79D2;&#x540E;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x4E00;&#x6B21;logo2-line&#x52A8;&#x753B;&#xFF0C;&#x8FD0;&#x52A8;&#x65F6;&#x95F4;2&#x79D2;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#x4E3A; linear*/
animation: logo2-line 2s linear 2s;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs go"><code><span class="hljs-comment">/*2&#x79D2;&#x540E;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x4E00;&#x6B21;logo2-line&#x52A8;&#x753B;&#xFF0C;&#x8FD0;&#x52A8;&#x65F6;&#x95F4;2&#x79D2;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#x4E3A; linear*/</span>
animation: logo2-line <span class="hljs-number">2s</span> linear <span class="hljs-number">2s</span>;</code></pre><p>&#x6817;&#x5B50;3</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x65E0;&#x9650;&#x6267;&#x884C;logo2-line&#x52A8;&#x753B;&#xFF0C;&#x6BCF;&#x6B21;&#x8FD0;&#x52A8;&#x65F6;&#x95F4;2&#x79D2;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#x4E3A; linear&#xFF0C;&#x5E76;&#x4E14;&#x6267;&#x884C;&#x53CD;&#x5411;&#x52A8;&#x753B;*/
animation: logo2-line 2s linear alternate infinite;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code><span class="hljs-comment">/*&#x65E0;&#x9650;&#x6267;&#x884C;logo2-line&#x52A8;&#x753B;&#xFF0C;&#x6BCF;&#x6B21;&#x8FD0;&#x52A8;&#x65F6;&#x95F4;2&#x79D2;&#xFF0C;&#x8FD0;&#x52A8;&#x66F2;&#x7EBF;&#x4E3A; linear&#xFF0C;&#x5E76;&#x4E14;&#x6267;&#x884C;&#x53CD;&#x5411;&#x52A8;&#x753B;*/</span>
<span class="hljs-built_in">animation</span>: logo2-line 2s <span class="hljs-built_in">linear</span> alternate infinite;</code></pre><p>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animation-fill-mode : none | forwards | backwards | both;
/*none&#xFF1A;&#x4E0D;&#x6539;&#x53D8;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x3002;    
forwards &#xFF1A;&#x5F53;&#x52A8;&#x753B;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x4FDD;&#x6301;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#xFF08;&#x5728;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x4E2D;&#x5B9A;&#x4E49;&#xFF09;&#x3002;    
backwards&#xFF1A;&#x5728; animation-delay &#x6240;&#x6307;&#x5B9A;&#x7684;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x5185;&#xFF0C;&#x5728;&#x52A8;&#x753B;&#x663E;&#x793A;&#x4E4B;&#x524D;&#xFF0C;&#x5E94;&#x7528;&#x5F00;&#x59CB;&#x5C5E;&#x6027;&#x503C;&#xFF08;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x4E2D;&#x5B9A;&#x4E49;&#xFF09;&#x3002; 
both&#xFF1A;&#x5411;&#x524D;&#x548C;&#x5411;&#x540E;&#x586B;&#x5145;&#x6A21;&#x5F0F;&#x90FD;&#x88AB;&#x5E94;&#x7528;&#x3002;  */      " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>animation-fill-mode : none | <span class="hljs-type">forwards</span> | <span class="hljs-type">backwards</span> | <span class="hljs-type">both</span>;
/*none&#xFF1A;&#x4E0D;&#x6539;&#x53D8;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x3002;    
forwards &#xFF1A;&#x5F53;&#x52A8;&#x753B;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x4FDD;&#x6301;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x503C;&#xFF08;&#x5728;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x4E2D;&#x5B9A;&#x4E49;&#xFF09;&#x3002;    
backwards&#xFF1A;&#x5728; animation-delay &#x6240;&#x6307;&#x5B9A;&#x7684;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x5185;&#xFF0C;&#x5728;&#x52A8;&#x753B;&#x663E;&#x793A;&#x4E4B;&#x524D;&#xFF0C;&#x5E94;&#x7528;&#x5F00;&#x59CB;&#x5C5E;&#x6027;&#x503C;&#xFF08;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x4E2D;&#x5B9A;&#x4E49;&#xFF09;&#x3002; 
both&#xFF1A;&#x5411;&#x524D;&#x548C;&#x5411;&#x540E;&#x586B;&#x5145;&#x6A21;&#x5F0F;&#x90FD;&#x88AB;&#x5E94;&#x7528;&#x3002;  */      </code></pre><h3 id="articleHeader7">3-2.logo&#x5C55;&#x793A;&#x52A8;&#x753B;</h3><p><span class="img-wrap"><img data-src="/img/bVTdn3?w=776&amp;h=220" src="https://static.alili.tech/img/bVTdn3?w=776&amp;h=220" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x4E2A;&#x662F;&#x6211;&#x7528;&#x516C;&#x53F8;logo&#x5199;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x6CA1;&#x90A3;&#x4E48;&#x7CBE;&#x7EC6;</p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot; href=&quot;reset.css&quot;&gt;
&lt;/head&gt;
&lt;style&gt;
.logo-box{
    width: 600px;
    margin: 100px auto;
    font-size: 0;
    position: relative;
}
.logo-box div{
    display: inline-block;
}
.logo-box .logo-text{
    margin-left: 10px;
}
.logo-box .logo1{
    animation: logo1 1s ease-in 2s;
    animation-fill-mode:backwards;
}
.logo-box .logo-text{
    animation: logoText 1s ease-in 3s;
    animation-fill-mode:backwards;
}
.logo-box .logo2{
    position: absolute;
    top: 20px;
    left: 20px;
    animation: logo2-middle 2s ease-in;
}
.logo-box .logo2 img{
    animation: logo2-line 2s linear;
}
@keyframes logo1 {
    0%{
        transform:rotate(180deg);
        opacity: 0;
    }
    100%{
        transform:rotate(0deg);
        opacity: 1;
    }
}
@keyframes logoText {
    0%{
        transform:translateX(30px);
        opacity: 0;
    }
    100%{
        transform:translateX(0);
        opacity: 1;
    }
}
@keyframes logo2-line {
    0% { transform: translateX(200px)}
    25% { transform: translateX(150px)}
    50% { transform: translateX(100px)}
    75% { transform: translateX(50px)}
    100% { transform: translateX(0); }
}

@keyframes logo2-middle {
    0% { transform: translateY(0);     }
    25% { transform: translateY(-100px);     }
    50% { transform: translateY(0);     }
    75% { transform: translateY(-50px);     }
    100% { transform: translateY(0); }
}
&lt;/style&gt;
&lt;body&gt;
&lt;div class=&quot;logo-box&quot;&gt;
&lt;div class=&quot;logo1&quot;&gt;&lt;img src=&quot;logo1.jpg&quot;/&gt;&lt;/div&gt;
&lt;div class=&quot;logo2&quot;&gt;&lt;img src=&quot;logo2.jpg&quot;/&gt;&lt;/div&gt;
&lt;div class=&quot;logo-text&quot;&gt;&lt;img src=&quot;logo3.jpg&quot;/&gt;&lt;/div&gt;
&lt;/div&gt;

&lt;div class=&quot;wraper&quot;&gt;&lt;div class=&quot;item&quot;&gt;&lt;/div&gt;&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;reset.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.logo-box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.logo-box</span> <span class="hljs-selector-tag">div</span>{
    <span class="hljs-attribute">display</span>: inline-block;
}
<span class="hljs-selector-class">.logo-box</span> <span class="hljs-selector-class">.logo-text</span>{
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.logo-box</span> <span class="hljs-selector-class">.logo1</span>{
    <span class="hljs-attribute">animation</span>: logo1 <span class="hljs-number">1s</span> ease-in <span class="hljs-number">2s</span>;
    <span class="hljs-attribute">animation-fill-mode</span>:backwards;
}
<span class="hljs-selector-class">.logo-box</span> <span class="hljs-selector-class">.logo-text</span>{
    <span class="hljs-attribute">animation</span>: logoText <span class="hljs-number">1s</span> ease-in <span class="hljs-number">3s</span>;
    <span class="hljs-attribute">animation-fill-mode</span>:backwards;
}
<span class="hljs-selector-class">.logo-box</span> <span class="hljs-selector-class">.logo2</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">animation</span>: logo2-middle <span class="hljs-number">2s</span> ease-in;
}
<span class="hljs-selector-class">.logo-box</span> <span class="hljs-selector-class">.logo2</span> <span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">animation</span>: logo2-line <span class="hljs-number">2s</span> linear;
}
@<span class="hljs-keyword">keyframes</span> logo1 {
    0%{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(180deg);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    100%{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">rotate</span>(0deg);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    }
}
@<span class="hljs-keyword">keyframes</span> logoText {
    0%{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translateX</span>(30px);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    }
    100%{
        <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translateX</span>(0);
        <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    }
}
@<span class="hljs-keyword">keyframes</span> logo2-line {
    0% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(200px)}
    25% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(150px)}
    50% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(100px)}
    75% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(50px)}
    100% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(0); }
}

@<span class="hljs-keyword">keyframes</span> logo2-middle {
    0% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0);     }
    25% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-100px);     }
    50% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0);     }
    75% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50px);     }
    100% { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0); }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo-box&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;logo1.jpg&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo2&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;logo2.jpg&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;logo-text&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;logo3.jpg&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wraper&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x4E0B;&#x9762;&#x8BA9;&#x5927;&#x5BB6;&#x770B;&#x4E00;&#x4E2A;&#x4E13;&#x4E1A;&#x7EA7;&#x522B;&#x7684;</p><p><span class="img-wrap"><img data-src="/img/bVTdpk?w=734&amp;h=214" src="https://static.alili.tech/img/bVTdpk?w=734&amp;h=214" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;Title&lt;/title&gt;
&lt;/head&gt;
&lt;style&gt;
    body {
        font-family: Arial,&quot;Helvetica Neue&quot;,Helvetica,sans-serif;
        overflow: hidden;
        background: #fff;
    }

    .center {
        margin: 80px auto;
    }

    .so {
        display: block;
        width: 500px;
        height: 156px;
        background: #ffffff;
    }
    .so .inner {
        width: 500px;
        height: 156px;
        position: absolute;
    }
    .so .inner * {
        position: absolute;
        animation-iteration-count: infinite;
        animation-duration: 3.5s;
    }
    .so .inner .name {
        position: absolute;
        font-size: 54px;
        left: 130px;
        top: 95px;
    }
    .so .inner .name .b {
        font-weight: bold;
    }
    .so .inner .stack-box {
        top: 100px;
        width: 115px;
        height: 56px;
    }
    .so .inner .box {
        width: 115px;
        height: 56px;
        left: 0px;
    }
    .so .inner .box div {
        background: #BCBBBB;
    }
    .so .inner .box .bottom {
        bottom: 0px;
        left: 0px;
        width: 115px;
        height: 12px;
    }
    .so .inner .box .left {
        bottom: 11px;
        left: 0px;
        width: 12px;
        height: 34px;
    }
    .so .inner .box .right {
        bottom: 11px;
        left: 103px;
        width: 12px;
        height: 34px;
    }
    .so .inner .box .top {
        top: 0px;
        left: 0px;
        width: 0;
        height: 12px;
    }
    .so .inner .stack {
        left: 22px;
        top: 22px;
    }
    .so .inner .stack .inner-item {
        background: #F48024;
        width: 71px;
        height: 12px;
    }
    .so .inner .stack .item {
        transition: transform 0.3s;
        width: 291px;
    }
    .so .inner .stack div:nth-child(1) {
        transform: rotate(0deg);
    }
    .so .inner .stack div:nth-child(2) {
        transform: rotate(12deg);
    }
    .so .inner .stack div:nth-child(3) {
        transform: rotate(24deg);
    }
    .so .inner .stack div:nth-child(4) {
        transform: rotate(36deg);
    }
    .so .inner .stack div:nth-child(5) {
        transform: rotate(48deg);
    }
    .so .inner .box {
        animation-name: box;
    }
    .so .inner .box .top {
        animation-name: box-top;
    }
    .so .inner .box .left {
        animation-name: box-left;
    }
    .so .inner .box .right {
        animation-name: box-right;
    }
    .so .inner .box .bottom {
        animation-name: box-bottom;
    }
    .so .inner .stack-box {
        animation-name: stack-box;
    }
    .so .inner .stack {
        animation-name: stack;
    }
    .so .inner .stack .inner-item {
        animation-name: stack-items;
    }
    .so .inner .stack .item:nth-child(1) {
        animation-name: stack-item-1;
    }
    .so .inner .stack .item:nth-child(2) {
        animation-name: stack-item-2;
    }
    .so .inner .stack .item:nth-child(3) {
        animation-name: stack-item-3;
    }
    .so .inner .stack .item:nth-child(4) {
        animation-name: stack-item-4;
    }
    .so .inner .stack .item:nth-child(5) {
        animation-name: stack-item-5;
    }
    @keyframes stack {
        0% {
            left: 22px;
        }
        15% {
            left: 22px;
        }
        30% {
            left: 52px;
        }
        50% {
            left: 52px;
        }
        80% {
            left: 22px;
        }
    }
    @keyframes stack-item-1 {
        0% {
            transform: rotate(12deg * 0);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 0);
        }
    }
    @keyframes stack-item-2 {
        0% {
            transform: rotate(12deg * 1);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 1);
        }
    }
    @keyframes stack-item-3 {
        0% {
            transform: rotate(12deg * 2);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 2);
        }
    }
    @keyframes stack-item-4 {
        0% {
            transform: rotate(12deg * 3);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 3);
        }
    }
    @keyframes stack-item-5 {
        0% {
            transform: rotate(12deg * 4);
        }
        10% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(0deg);
        }
        54% {
            transform: rotate(0deg);
        }
        92% {
            transform: rotate(12deg * 4);
        }
    }
    @keyframes stack-items {
        0% {
            width: 71px;
        }
        15% {
            width: 71px;
        }
        30% {
            width: 12px;
        }
        50% {
            width: 12px;
        }
        80% {
            width: 71px;
        }
    }
    @keyframes box {
        0% {
            left: 0;
        }
        15% {
            left: 0;
        }
        30% {
            left: 30px;
        }
        50% {
            left: 30px;
        }
        80% {
            left: 0;
        }
    }
    @keyframes box-top {
        0% {
            width: 0;
        }
        6% {
            width: 0;
        }
        15% {
            width: 115px;
        }
        30% {
            width: 56px;
        }
        50% {
            width: 56px;
        }
        59% {
            width: 0;
        }
    }
    @keyframes box-bottom {
        0% {
            width: 115px;
        }
        15% {
            width: 115px;
        }
        30% {
            width: 56px;
        }
        50% {
            width: 56px;
        }
        80% {
            width: 115px;
        }
    }
    @keyframes box-right {
        15% {
            left: 103px;
        }
        30% {
            left: 44px;
        }
        50% {
            left: 44px;
        }
        80% {
            left: 103px;
        }
    }
    @keyframes stack-box {
        0% {
            transform: rotate(0deg);
        }
        30% {
            transform: rotate(0deg);
        }
        40% {
            transform: rotate(135deg);
        }
        50% {
            transform: rotate(135deg);
        }
        83% {
            transform: rotate(360deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
&lt;/style&gt;
&lt;body&gt;
&lt;div class=&quot;so center&quot;&gt;
    &lt;div class=&quot;inner&quot;&gt;
        &lt;div class=&quot;stack-box&quot;&gt;
            &lt;div class=&quot;stack&quot;&gt;
                &lt;div class=&quot;item&quot;&gt;
                    &lt;div class=&quot;inner-item&quot;&gt;&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class=&quot;item&quot;&gt;
                    &lt;div class=&quot;inner-item&quot;&gt;&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class=&quot;item&quot;&gt;
                    &lt;div class=&quot;inner-item&quot;&gt;&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class=&quot;item&quot;&gt;
                    &lt;div class=&quot;inner-item&quot;&gt;&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class=&quot;item&quot;&gt;
                    &lt;div class=&quot;inner-item&quot;&gt;&lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;box&quot;&gt;
                &lt;div class=&quot;bottom&quot;&gt;&lt;/div&gt;
                &lt;div class=&quot;left&quot;&gt;&lt;/div&gt;
                &lt;div class=&quot;right&quot;&gt;&lt;/div&gt;
                &lt;div class=&quot;top&quot;&gt;&lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class=&quot;name&quot;&gt;
            stack&lt;span class=&quot;b&quot;&gt;overflow&lt;/span&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">font-family</span>: Arial,<span class="hljs-string">&quot;Helvetica Neue&quot;</span>,Helvetica,sans-serif;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    }

    <span class="hljs-selector-class">.center</span> {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">80px</span> auto;
    }

    <span class="hljs-selector-class">.so</span> {
        <span class="hljs-attribute">display</span>: block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">156px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">156px</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> * {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">animation-iteration-count</span>: infinite;
        <span class="hljs-attribute">animation-duration</span>: <span class="hljs-number">3.5s</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.name</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">54px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">130px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">95px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.name</span> <span class="hljs-selector-class">.b</span> {
        <span class="hljs-attribute">font-weight</span>: bold;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack-box</span> {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">115px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">56px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">115px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">56px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#BCBBBB</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.bottom</span> {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">115px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">12px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.left</span> {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">11px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.right</span> {
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">11px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">103px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">34px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.top</span> {
        <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">12px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">22px</span>;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">22px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.inner-item</span> {
        <span class="hljs-attribute">background</span>: <span class="hljs-number">#F48024</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">71px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">12px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.item</span> {
        <span class="hljs-attribute">transition</span>: transform <span class="hljs-number">0.3s</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">291px</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg);
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(24deg);
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(36deg);
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(48deg);
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">animation-name</span>: box;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.top</span> {
        <span class="hljs-attribute">animation-name</span>: box-top;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.left</span> {
        <span class="hljs-attribute">animation-name</span>: box-left;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.right</span> {
        <span class="hljs-attribute">animation-name</span>: box-right;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.bottom</span> {
        <span class="hljs-attribute">animation-name</span>: box-bottom;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack-box</span> {
        <span class="hljs-attribute">animation-name</span>: stack-box;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> {
        <span class="hljs-attribute">animation-name</span>: stack;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.inner-item</span> {
        <span class="hljs-attribute">animation-name</span>: stack-items;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:nth-child(1)</span> {
        <span class="hljs-attribute">animation-name</span>: stack-item-<span class="hljs-number">1</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:nth-child(2)</span> {
        <span class="hljs-attribute">animation-name</span>: stack-item-<span class="hljs-number">2</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:nth-child(3)</span> {
        <span class="hljs-attribute">animation-name</span>: stack-item-<span class="hljs-number">3</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:nth-child(4)</span> {
        <span class="hljs-attribute">animation-name</span>: stack-item-<span class="hljs-number">4</span>;
    }
    <span class="hljs-selector-class">.so</span> <span class="hljs-selector-class">.inner</span> <span class="hljs-selector-class">.stack</span> <span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:nth-child(5)</span> {
        <span class="hljs-attribute">animation-name</span>: stack-item-<span class="hljs-number">5</span>;
    }
    @<span class="hljs-keyword">keyframes</span> stack {
        0% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">22px</span>;
        }
        15% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">22px</span>;
        }
        30% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">52px</span>;
        }
        50% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">52px</span>;
        }
        80% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">22px</span>;
        }
    }
    @<span class="hljs-keyword">keyframes</span> stack-item-<span class="hljs-number">1</span> {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 0);
        }
        10% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        54% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        92% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 0);
        }
    }
    @<span class="hljs-keyword">keyframes</span> stack-item-<span class="hljs-number">2</span> {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 1);
        }
        10% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        54% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        92% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 1);
        }
    }
    @<span class="hljs-keyword">keyframes</span> stack-item-<span class="hljs-number">3</span> {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 2);
        }
        10% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        54% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        92% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 2);
        }
    }
    @<span class="hljs-keyword">keyframes</span> stack-item-<span class="hljs-number">4</span> {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 3);
        }
        10% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        54% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        92% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 3);
        }
    }
    @<span class="hljs-keyword">keyframes</span> stack-item-<span class="hljs-number">5</span> {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 4);
        }
        10% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        54% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        92% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(12deg * 4);
        }
    }
    @<span class="hljs-keyword">keyframes</span> stack-items {
        0% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">71px</span>;
        }
        15% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">71px</span>;
        }
        30% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>;
        }
        50% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">12px</span>;
        }
        80% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">71px</span>;
        }
    }
    @<span class="hljs-keyword">keyframes</span> box {
        0% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        }
        15% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        }
        30% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">30px</span>;
        }
        50% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">30px</span>;
        }
        80% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
        }
    }
    @<span class="hljs-keyword">keyframes</span> box-top {
        0% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        }
        6% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        }
        15% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">115px</span>;
        }
        30% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">56px</span>;
        }
        50% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">56px</span>;
        }
        59% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
        }
    }
    @<span class="hljs-keyword">keyframes</span> box-bottom {
        0% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">115px</span>;
        }
        15% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">115px</span>;
        }
        30% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">56px</span>;
        }
        50% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">56px</span>;
        }
        80% {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">115px</span>;
        }
    }
    @<span class="hljs-keyword">keyframes</span> box-right {
        15% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">103px</span>;
        }
        30% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">44px</span>;
        }
        50% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">44px</span>;
        }
        80% {
            <span class="hljs-attribute">left</span>: <span class="hljs-number">103px</span>;
        }
    }
    @<span class="hljs-keyword">keyframes</span> stack-box {
        0% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        30% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg);
        }
        40% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(135deg);
        }
        50% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(135deg);
        }
        83% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
        }
        100% {
            <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;so center&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inner&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack-box&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stack&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inner-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inner-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inner-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inner-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;item&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;inner-item&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;box&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bottom&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;left&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;right&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;top&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span>
            stack<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;b&quot;</span>&gt;</span>overflow<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h3 id="articleHeader8">3-3.loading&#x6548;&#x679C;</h3><p><span class="img-wrap"><img data-src="/img/bVTdrH?w=1192&amp;h=951" src="https://static.alili.tech/img/bVTdrH?w=1192&amp;h=951" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x5B9E;&#x5728;&#x592A;&#x591A;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x76F4;&#x63A5;&#x4E0A;&#x7F51;&#x5740;&#x770B;&#x5427;&#x3002;<a href="http://www.html5tricks.com/demo/css3-loading-cool-styles/index.html" rel="nofollow noreferrer" target="_blank">css3-loading</a></p><h3 id="articleHeader9">3-4.&#x97F3;&#x4E50;&#x9707;&#x52A8;&#x6761;</h3><p><span class="img-wrap"><img data-src="/img/bVTdsN?w=260&amp;h=155" src="https://static.alili.tech/img/bVTdsN?w=260&amp;h=155" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;title&gt;&#x7EAF;CSS3&#x6A21;&#x62DF;&#x8DF3;&#x52A8;&#x7684;&#x97F3;&#x7B26;&#x6548;&#x679C;&lt;/title&gt;
  &lt;style&gt;
    *{margin:0;padding:0;list-style: none;}
    body{background-color: #efefef;}
    .demo-music {
      position: absolute;
      width: 100%;
      height: 200px;
      top: 120px;
      zoom: 1.5;
    }

    .demo-music .music {
      width: 80px;
      height: 50px;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-40px, -25px);
      transform: translate(-40px, -25px);
      position: absolute;
    }

    .demo-music #waves {
      width: 80px;
      height: 50px;
      position: absolute;
      top: 12px;
      left: 12px;
    }

    .demo-music #waves li {
      position: relative;
      float: left;
      height: 100%;
      width: 12%;
      overflow: hidden;
      margin-right: 1px;
    }

    .demo-music #waves li span {
      position: absolute;
      bottom: 0;
      display: block;
      height: 100%;
      width: 100px;
      background: #09f;
    }

    .demo-music #waves .li1 span {
      animation: waves 0.8s linear 0s infinite alternate;
      -webkit-animation: waves 0.8s linear 0s infinite alternate;
    }

    .demo-music #waves .li2 span {
      animation: waves 0.9s linear 0s infinite alternate;
      -webkit-animation: waves 0.9s linear 0s infinite alternate;
    }

    .demo-music #waves .li3 span {
      animation: waves 1s linear 0s infinite alternate;
      -webkit-animation: waves 1s linear 0s infinite alternate;
    }

    .demo-music #waves .li4 span {
      animation: waves 0.8s linear 0s infinite alternate;
      -webkit-animation: waves 0.8s linear 0s infinite alternate;
    }

    .demo-music #waves .li5 span {
      animation: waves 0.7s linear 0s infinite alternate;
      -webkit-animation: waves 0.7s linear 0s infinite alternate;
    }

    .demo-music #waves .li6 span {
      animation: waves 0.8s linear 0s infinite alternate;
      -webkit-animation: waves 0.8s linear 0s infinite alternate;
    }
    @-webkit-keyframes waves {
      10% {
        height: 20%;
      }
      20% {
        height: 60%;
      }
      40% {
        height: 40%;
      }
      50% {
        height: 100%;
      }
      100% {
        height: 50%;
      }
    }

    @keyframes waves {
      10% {
        height: 20%;
      }
      20% {
        height: 60%;
      }
      40% {
        height: 40%;
      }
      50% {
        height: 100%;
      }
      100% {
        height: 50%;
      }
    }
  &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;demo-music&quot;&gt;
    &lt;div class=&quot;music&quot;&gt;
      &lt;ul id=&quot;waves&quot; class=&quot;movement&quot;&gt;
        &lt;li class=&quot;li1&quot;&gt;&lt;span class=&quot;ani-li&quot;&gt;&lt;/span&gt;&lt;/li&gt;
        &lt;li class=&quot;li2&quot;&gt;&lt;span class=&quot;ani-li&quot;&gt;&lt;/span&gt;&lt;/li&gt;
        &lt;li class=&quot;li3&quot;&gt;&lt;span class=&quot;ani-li&quot;&gt;&lt;/span&gt;&lt;/li&gt;
        &lt;li class=&quot;li4&quot;&gt;&lt;span class=&quot;ani-li&quot;&gt;&lt;/span&gt;&lt;/li&gt;
        &lt;li class=&quot;li5&quot;&gt;&lt;span class=&quot;ani-li&quot;&gt;&lt;/span&gt;&lt;/li&gt;
        &lt;li class=&quot;li6&quot;&gt;&lt;span class=&quot;ani-li&quot;&gt;&lt;/span&gt;&lt;/li&gt;
      &lt;/ul&gt;
      &lt;div class=&quot;music-state&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>&#x7EAF;CSS3&#x6A21;&#x62DF;&#x8DF3;&#x52A8;&#x7684;&#x97F3;&#x7B26;&#x6548;&#x679C;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    *{<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;<span class="hljs-attribute">list-style</span>: none;}
    <span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">background-color</span>: <span class="hljs-number">#efefef</span>;}
    <span class="hljs-selector-class">.demo-music</span> {
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">120px</span>;
      <span class="hljs-attribute">zoom</span>: <span class="hljs-number">1.5</span>;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-class">.music</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
      <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate</span>(-40px, -25px);
      <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-40px, -25px);
      <span class="hljs-attribute">position</span>: absolute;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">12px</span>;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">12px</span>;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-tag">li</span> {
      <span class="hljs-attribute">position</span>: relative;
      <span class="hljs-attribute">float</span>: left;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">12%</span>;
      <span class="hljs-attribute">overflow</span>: hidden;
      <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">1px</span>;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">span</span> {
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">display</span>: block;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
      <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-class">.li1</span> <span class="hljs-selector-tag">span</span> {
      <span class="hljs-attribute">animation</span>: waves <span class="hljs-number">0.8s</span> linear <span class="hljs-number">0s</span> infinite alternate;
      <span class="hljs-attribute">-webkit-animation</span>: waves <span class="hljs-number">0.8s</span> linear <span class="hljs-number">0s</span> infinite alternate;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-class">.li2</span> <span class="hljs-selector-tag">span</span> {
      <span class="hljs-attribute">animation</span>: waves <span class="hljs-number">0.9s</span> linear <span class="hljs-number">0s</span> infinite alternate;
      <span class="hljs-attribute">-webkit-animation</span>: waves <span class="hljs-number">0.9s</span> linear <span class="hljs-number">0s</span> infinite alternate;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-class">.li3</span> <span class="hljs-selector-tag">span</span> {
      <span class="hljs-attribute">animation</span>: waves <span class="hljs-number">1s</span> linear <span class="hljs-number">0s</span> infinite alternate;
      <span class="hljs-attribute">-webkit-animation</span>: waves <span class="hljs-number">1s</span> linear <span class="hljs-number">0s</span> infinite alternate;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-class">.li4</span> <span class="hljs-selector-tag">span</span> {
      <span class="hljs-attribute">animation</span>: waves <span class="hljs-number">0.8s</span> linear <span class="hljs-number">0s</span> infinite alternate;
      <span class="hljs-attribute">-webkit-animation</span>: waves <span class="hljs-number">0.8s</span> linear <span class="hljs-number">0s</span> infinite alternate;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-class">.li5</span> <span class="hljs-selector-tag">span</span> {
      <span class="hljs-attribute">animation</span>: waves <span class="hljs-number">0.7s</span> linear <span class="hljs-number">0s</span> infinite alternate;
      <span class="hljs-attribute">-webkit-animation</span>: waves <span class="hljs-number">0.7s</span> linear <span class="hljs-number">0s</span> infinite alternate;
    }

    <span class="hljs-selector-class">.demo-music</span> <span class="hljs-selector-id">#waves</span> <span class="hljs-selector-class">.li6</span> <span class="hljs-selector-tag">span</span> {
      <span class="hljs-attribute">animation</span>: waves <span class="hljs-number">0.8s</span> linear <span class="hljs-number">0s</span> infinite alternate;
      <span class="hljs-attribute">-webkit-animation</span>: waves <span class="hljs-number">0.8s</span> linear <span class="hljs-number">0s</span> infinite alternate;
    }
    @-<span class="hljs-keyword">webkit</span>-<span class="hljs-keyword">keyframes</span> waves {
      10% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20%</span>;
      }
      20% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60%</span>;
      }
      40% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40%</span>;
      }
      50% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      }
      100% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
      }
    }

    @<span class="hljs-keyword">keyframes</span> waves {
      10% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20%</span>;
      }
      20% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60%</span>;
      }
      40% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">40%</span>;
      }
      50% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
      }
      100% {
        <span class="hljs-attribute">height</span>: <span class="hljs-number">50%</span>;
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo-music&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;music&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;waves&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;movement&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li1&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ani-li&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li2&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ani-li&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li3&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ani-li&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li4&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ani-li&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li5&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ani-li&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;li6&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ani-li&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;music-state&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h2 id="articleHeader10">4.&#x5F62;&#x72B6;&#x8F6C;&#x6362;</h2><p>&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x5206;2d&#x8F6C;&#x6362;&#x548C;3d&#x8F6C;&#x6362;&#x3002;&#x6709;&#x4EC0;&#x4E48;&#x597D;&#x73A9;&#x7684;&#xFF0C;&#x4E0B;&#x9762;&#x5217;&#x4E3E;&#x51E0;&#x4E2A;&#xFF01;</p><h3 id="articleHeader11">4-1.&#x8BED;&#x6CD5;</h3><p>transform:&#x9002;&#x7528;&#x4E8E;2D&#x6216;3D&#x8F6C;&#x6362;&#x7684;&#x5143;&#x7D20;<br>transform-origin&#xFF1A;&#x8F6C;&#x6362;&#x5143;&#x7D20;&#x7684;&#x4F4D;&#x7F6E;&#xFF08;&#x56F4;&#x7ED5;&#x90A3;&#x4E2A;&#x70B9;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#xFF09;&#x3002;&#x9ED8;&#x8BA4;(x,y,z)&#xFF1A;(50%,50%,0)</p><h3 id="articleHeader12">4-2.&#x5B9E;&#x4F8B;</h3><p>transform:rotate(30deg);</p><p><span class="img-wrap"><img data-src="/img/bVTdyC?w=284&amp;h=218" src="https://static.alili.tech/img/bVTdyC?w=284&amp;h=218" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>transform:translate(30px,30px);</p><p><span class="img-wrap"><img data-src="/img/bVTdAC?w=501&amp;h=450" src="https://static.alili.tech/img/bVTdAC?w=501&amp;h=450" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>transform:scale(.8);</p><p><span class="img-wrap"><img data-src="/img/bVTdAT?w=404&amp;h=373" src="https://static.alili.tech/img/bVTdAT?w=404&amp;h=373" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>transform: skew(10deg,10deg);</p><p><span class="img-wrap"><img data-src="/img/bVTdBj?w=280&amp;h=160" src="https://static.alili.tech/img/bVTdBj?w=280&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>transform:rotateX(180deg);</p><p><span class="img-wrap"><img data-src="/img/bVTdHv?w=142&amp;h=97" src="https://static.alili.tech/img/bVTdHv?w=142&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>transform:rotateY(180deg);</p><p><span class="img-wrap"><img data-src="/img/bVTdHA?w=142&amp;h=97" src="https://static.alili.tech/img/bVTdHA?w=142&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>transform:rotate3d(10,10,10,90deg);</p><p><span class="img-wrap"><img data-src="/img/bVTdHU?w=182&amp;h=114" src="https://static.alili.tech/img/bVTdHU?w=182&amp;h=114" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader13">5.&#x9009;&#x62E9;&#x5668;</h2><p>css3&#x63D0;&#x4F9B;&#x7684;&#x9009;&#x62E9;&#x5668;&#x53EF;&#x4EE5;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x66F4;&#x52A0;&#x65B9;&#x4FBF;&#xFF01;&#x8FD9;&#x4E2A;&#x5927;&#x5BB6;&#x90FD;&#x8981;&#x4E86;&#x89E3;&#x3002;&#x4E0B;&#x9762;&#x662F;css3&#x63D0;&#x4F9B;&#x7684;&#x9009;&#x62E9;&#x5668;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVTd2d?w=780&amp;h=728" src="https://static.alili.tech/img/bVTd2d?w=780&amp;h=728" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x56FE;&#x7247;&#x6765;&#x81EA;w3c&#x3002;&#x8FD9;&#x4E00;&#x5757;&#x5EFA;&#x8BAE;&#x5927;&#x5BB6;&#x53BB;w3c&#x770B;&#xFF08;<a href="http://www.w3school.com.cn/cssref/css_selectors.asp" rel="nofollow noreferrer" target="_blank">CSS &#x9009;&#x62E9;&#x5668;&#x53C2;&#x8003;&#x624B;&#x518C;</a>&#xFF09;&#xFF0C;&#x90A3;&#x91CC;&#x7684;&#x4F8B;&#x5B50;&#x901A;&#x4FD7;&#x6613;&#x61C2;&#x3002;&#x6211;&#x4E0D;&#x91CD;&#x590D;&#x8BB2;&#x4E86;&#x3002;<br>&#x63D0;&#x4F9B;&#x7684;&#x9009;&#x62E9;&#x5668;&#x91CC;&#x9762;&#xFF0C;&#x57FA;&#x672C;&#x90FD;&#x633A;&#x597D;&#x7528;&#x7684;&#x3002;&#x4F46;&#x662F;&#x6211;&#x89C9;&#x5F97;&#x6709;&#x4E9B;&#x4E0D;&#x4F1A;&#x5F88;&#x5E38;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;<code>:root&#xFF0C;:empty&#xFF0C;:target&#xFF0C;:enabled&#xFF0C;:checked</code>&#x3002;&#x800C;&#x4E14;&#x51E0;&#x4E2A;&#x4E0D;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#xFF0C;&#x7F51;&#x4E0A;&#x7684;&#x8BF4;&#x6CD5;&#x662F;&#x6027;&#x80FD;&#x8F83;&#x5DEE;<code>[attribute*=value]&#xFF0C;[attribute$=value]&#xFF0C;[attribute^=value]</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x6211;&#x6CA1;&#x7528;&#x8FC7;&#xFF0C;&#x4E0D;&#x592A;&#x6E05;&#x695A;&#x3002;</p><h2 id="articleHeader14">6.&#x9634;&#x5F71;</h2><p>&#x4EE5;&#x524D;&#x6CA1;&#x6709;css3&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6216;&#x8005;&#x9700;&#x8981;&#x517C;&#x5BB9;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9634;&#x5F71;&#x53EA;&#x80FD;&#x7528;&#x56FE;&#x7247;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x662F;&#x73B0;&#x5728;&#x4E0D;&#x9700;&#x8981;&#xFF0C;css3&#x5C31;&#x63D0;&#x4F9B;&#x4E86;&#xFF01;</p><h3 id="articleHeader15">6-1.&#x8BED;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="box-shadow: &#x6C34;&#x5E73;&#x9634;&#x5F71;&#x7684;&#x4F4D;&#x7F6E; &#x5782;&#x76F4;&#x9634;&#x5F71;&#x7684;&#x4F4D;&#x7F6E; &#x6A21;&#x7CCA;&#x8DDD;&#x79BB; &#x9634;&#x5F71;&#x7684;&#x5927;&#x5C0F; &#x9634;&#x5F71;&#x7684;&#x989C;&#x8272; &#x9634;&#x5F71;&#x5F00;&#x59CB;&#x65B9;&#x5411;&#xFF08;&#x9ED8;&#x8BA4;&#x662F;&#x4ECE;&#x91CC;&#x5F80;&#x5916;&#xFF0C;&#x8BBE;&#x7F6E;inset&#x5C31;&#x662F;&#x4ECE;&#x5916;&#x5F80;&#x91CC;&#xFF09;;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code><span class="hljs-keyword">box-shadow: </span>&#x6C34;&#x5E73;&#x9634;&#x5F71;&#x7684;&#x4F4D;&#x7F6E; &#x5782;&#x76F4;&#x9634;&#x5F71;&#x7684;&#x4F4D;&#x7F6E; &#x6A21;&#x7CCA;&#x8DDD;&#x79BB; &#x9634;&#x5F71;&#x7684;&#x5927;&#x5C0F; &#x9634;&#x5F71;&#x7684;&#x989C;&#x8272; &#x9634;&#x5F71;&#x5F00;&#x59CB;&#x65B9;&#x5411;&#xFF08;&#x9ED8;&#x8BA4;&#x662F;&#x4ECE;&#x91CC;&#x5F80;&#x5916;&#xFF0C;&#x8BBE;&#x7F6E;<span class="hljs-keyword">inset&#x5C31;&#x662F;&#x4ECE;&#x5916;&#x5F80;&#x91CC;&#xFF09;;
</span></code></pre><h3 id="articleHeader16">6-1.&#x6817;&#x5B50;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt; 
&lt;title&gt;&lt;/title&gt; 
&lt;style&gt; 
div
{
    width:300px;
    height:100px;
    background:#09f;
    box-shadow: 10px 10px 5px #888888;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div&gt;&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"> 
<span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#09f</span>;
    <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">10px</span> <span class="hljs-number">10px</span> <span class="hljs-number">5px</span> <span class="hljs-number">#888888</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTd9F?w=364&amp;h=151" src="https://static.alili.tech/img/bVTd9F?w=364&amp;h=151" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader17">7.&#x8FB9;&#x6846;</h2><h3 id="articleHeader18">7-1.&#x8FB9;&#x6846;&#x56FE;&#x7247;</h3><h4>7-1-1.&#x8BED;&#x6CD5;</h4><p>border-image: &#x56FE;&#x7247;url &#x56FE;&#x50CF;&#x8FB9;&#x754C;&#x5411;&#x5185;&#x504F;&#x79FB; &#x56FE;&#x50CF;&#x8FB9;&#x754C;&#x7684;&#x5BBD;&#x5EA6;(&#x9ED8;&#x8BA4;&#x4E3A;&#x8FB9;&#x6846;&#x7684;&#x5BBD;&#x5EA6;) &#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x5728;&#x8FB9;&#x6846;&#x5916;&#x90E8;&#x7ED8;&#x5236;&#x504F;&#x79FB;&#x7684;&#x91CF;&#xFF08;&#x9ED8;&#x8BA4;0&#xFF09; &#x94FA;&#x6EE1;&#x65B9;&#x5F0F;--&#x91CD;&#x590D;&#xFF08;repeat&#xFF09;&#x3001;&#x62C9;&#x4F38;&#xFF08;stretch&#xFF09;&#x6216;&#x94FA;&#x6EE1;&#xFF08;round&#xFF09;&#xFF08;&#x9ED8;&#x8BA4;&#xFF1A;&#x62C9;&#x4F38;&#xFF08;stretch&#xFF09;&#xFF09;;</p><h4>7-1-2.&#x6817;&#x5B50;</h4><p>&#x8FB9;&#x6846;&#x56FE;&#x7247;&#xFF08;&#x6765;&#x81EA;&#x83DC;&#x9E1F;&#x6559;&#x7A0B;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVTefk?w=81&amp;h=81" src="https://static.alili.tech/img/bVTefk?w=81&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt;
&lt;title&gt;&lt;/title&gt;
&lt;style&gt;
.demo {
    border: 15px solid transparent;
    padding: 15px;   
    border-image: url(border.png);
    border-image-slice: 30;
    border-image-repeat: round;
    border-image-outset: 0;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class=&quot;demo&quot;&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.demo</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">15px</span> solid transparent;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">15px</span>;   
    <span class="hljs-attribute">border-image</span>: <span class="hljs-built_in">url</span>(border.png);
    <span class="hljs-attribute">border-image-slice</span>: <span class="hljs-number">30</span>;
    <span class="hljs-attribute">border-image-repeat</span>: round;
    <span class="hljs-attribute">border-image-outset</span>: <span class="hljs-number">0</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTeeg?w=601&amp;h=91" src="https://static.alili.tech/img/bVTeeg?w=601&amp;h=91" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x6709;&#x8DA3;&#x53D8;&#x5316;</p><p><span class="img-wrap"><img data-src="/img/bVTefm?w=617&amp;h=444" src="https://static.alili.tech/img/bVTefm?w=617&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTefl?w=617&amp;h=444" src="https://static.alili.tech/img/bVTefl?w=617&amp;h=444" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x90A3;&#x4E2A;&#x66F4;&#x597D;&#x770B;&#xFF0C;&#x5927;&#x5BB6;&#x770B;&#x7740;&#x529E;</p><h3 id="articleHeader19">7-2.&#x8FB9;&#x6846;&#x5706;&#x89D2;</h3><h4>7-2-1.&#x8BED;&#x6CD5;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border-radius: n1,n2,n3,n4;
border-radius: n1,n2,n3,n4/n1,n2,n3,n4;
/*n1-n4&#x56DB;&#x4E2A;&#x503C;&#x7684;&#x987A;&#x5E8F;&#x662F;&#xFF1A;&#x5DE6;&#x4E0A;&#x89D2;&#xFF0C;&#x53F3;&#x4E0A;&#x89D2;&#xFF0C;&#x53F3;&#x4E0B;&#x89D2;&#xFF0C;&#x5DE6;&#x4E0B;&#x89D2;&#x3002;*/
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code>border-radius: <span class="hljs-symbol">n1</span>,<span class="hljs-symbol">n2</span>,<span class="hljs-symbol">n3</span>,<span class="hljs-symbol">n4</span>;
border-radius: <span class="hljs-symbol">n1</span>,<span class="hljs-symbol">n2</span>,<span class="hljs-symbol">n3</span>,<span class="hljs-symbol">n4</span>/<span class="hljs-symbol">n1</span>,<span class="hljs-symbol">n2</span>,<span class="hljs-symbol">n3</span>,<span class="hljs-symbol">n4</span>;
<span class="hljs-comment">/*n1-n4&#x56DB;&#x4E2A;&#x503C;&#x7684;&#x987A;&#x5E8F;&#x662F;&#xFF1A;&#x5DE6;&#x4E0A;&#x89D2;&#xFF0C;&#x53F3;&#x4E0A;&#x89D2;&#xFF0C;&#x53F3;&#x4E0B;&#x89D2;&#xFF0C;&#x5DE6;&#x4E0B;&#x89D2;&#x3002;*/</span>
</code></pre><h4>7-2-2.&#x6817;&#x5B50;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt; 
&lt;title&gt;&lt;/title&gt; 
&lt;style&gt; 
div
{
    border:2px solid #a1a1a1;
    padding:10px 40px; 
    background:#dddddd;
    text-align:center;
    width:300px;
    border-radius:25px 0 25px 0;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;border-radius&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"> 
<span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#a1a1a1</span>;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">10px</span> <span class="hljs-number">40px</span>; 
    <span class="hljs-attribute">background</span>:<span class="hljs-number">#dddddd</span>;
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">25px</span> <span class="hljs-number">0</span> <span class="hljs-number">25px</span> <span class="hljs-number">0</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>border-radius<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTegF?w=486&amp;h=82" src="https://static.alili.tech/img/bVTegF?w=486&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader20">8.&#x80CC;&#x666F;</h2><p>&#x8FD9;&#x4E00;&#x5757;&#x4E3B;&#x8981;&#x8BB2;css3&#x63D0;&#x4F9B;&#x80CC;&#x666F;&#x7684;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;</p><h3 id="articleHeader21">background-clip</h3><p>&#x5236;&#x5B9A;&#x80CC;&#x666F;&#x7ED8;&#x5236;&#xFF08;&#x663E;&#x793A;&#xFF09;&#x533A;&#x57DF;</p><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#xFF08;&#x4ECE;&#x8FB9;&#x6846;&#x5F00;&#x59CB;&#x7ED8;&#x5236;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVTeqt?w=533&amp;h=251" src="https://static.alili.tech/img/bVTeqt?w=533&amp;h=251" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x4ECE;padding&#x5F00;&#x59CB;&#x7ED8;&#x5236;&#xFF08;&#x663E;&#x793A;&#xFF09;&#xFF0C;&#x4E0D;&#x7B97;border,&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x628A;border&#x90A3;&#x91CC;&#x7684;&#x80CC;&#x666F;&#x7ED9;&#x88C1;&#x526A;&#x6389;&#xFF01;&#xFF08;background-clip: padding-box;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVTeqv?w=533&amp;h=255" src="https://static.alili.tech/img/bVTeqv?w=533&amp;h=255" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x53EA;&#x5728;&#x5185;&#x5BB9;&#x533A;&#x7ED8;&#x5236;&#xFF08;&#x663E;&#x793A;&#xFF09;&#xFF0C;&#x4E0D;&#x7B97;padding&#x548C;border&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x628A;padding&#x548C;border&#x90A3;&#x91CC;&#x7684;&#x80CC;&#x666F;&#x7ED9;&#x88C1;&#x526A;&#x6389;&#xFF01;&#xFF08;background-clip: content-box;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVTeqy?w=537&amp;h=244" src="https://static.alili.tech/img/bVTeqy?w=537&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader22">background-origin</h3><p>&#x5F15;&#x7528;&#x83DC;&#x9E1F;&#x6559;&#x7A0B;&#x7684;&#x8BF4;&#x6CD5;&#xFF1A;background-Origin&#x5C5E;&#x6027;&#x6307;&#x5B9A;background-position&#x5C5E;&#x6027;&#x5E94;&#x8BE5;&#x662F;&#x76F8;&#x5BF9;&#x4F4D;&#x7F6E;</p><p>&#x4E0B;&#x9762;&#x7684;div&#x521D;&#x59CB;&#x7684;html&#x548C;css&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x5982;&#x4E0B;<br>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;div&gt;</span>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip <span class="hljs-keyword">ex</span> <span class="hljs-keyword">ea</span> commodo consequat.
&lt;/div&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div
{
    border:10px dashed black;
    padding:35px;
    background:url(&apos;logo.png&apos;) no-repeat,#ccc;
    background-position:0px 0px;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">10px</span> dashed black;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">35px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">&apos;logo.png&apos;</span>) no-repeat,<span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">background-position</span>:<span class="hljs-number">0px</span> <span class="hljs-number">0px</span>;
}
</code></pre><p>&#x4E0B;&#x9762;&#x770B;&#x4E0B;&#xFF0C;background-origin&#x4E0D;&#x540C;&#x7684;&#x4E09;&#x79CD;&#x60C5;&#x51B5;</p><p><span class="img-wrap"><img data-src="/img/bVZGAM?w=800&amp;h=506" src="https://static.alili.tech/img/bVZGAM?w=800&amp;h=506" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader23">background-size</h3><p>&#x8FD9;&#x4E2A;&#x76F8;&#x4FE1;&#x5F88;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x5C31;&#x662F;&#x5236;&#x5B9A;&#x80CC;&#x666F;&#x7684;&#x5927;&#x5C0F;<br>&#x4E0B;&#x9762;&#x7684;div&#x521D;&#x59CB;&#x7684;html&#x548C;css&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;&#x5982;&#x4E0B;<br>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code><span class="hljs-symbol">&lt;div&gt;</span>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip <span class="hljs-keyword">ex</span> <span class="hljs-keyword">ea</span> commodo consequat.
&lt;/div&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div
{
    border:1px dashed black;
    padding:35px;
    background:url(&apos;test.jpg&apos;) no-repeat;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> dashed black;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">35px</span>;
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">&apos;test.jpg&apos;</span>) no-repeat;
}
</code></pre><p><span class="img-wrap"><img data-src="/img/bVTgk7?w=1016&amp;h=768" src="https://static.alili.tech/img/bVTgk7?w=1016&amp;h=768" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader24">&#x591A;&#x5F20;&#x80CC;&#x666F;&#x56FE;</h3><p>&#x8FD9;&#x4E2A;&#x6CA1;&#x4EC0;&#x4E48;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#xFF0C;&#x4F7F;&#x7528;&#x591A;&#x5F20;&#x80CC;&#x666F;&#x56FE;&#x7247;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF01;<br>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&#x4E24;&#x5F20;&#x56FE;&#x7247;&#x7684;&#x80CC;&#x666F;&lt;/p&gt;
&lt;div&gt;
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x4E24;&#x5F20;&#x56FE;&#x7247;&#x7684;&#x80CC;&#x666F;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div
{
    border:1px dashed black;
    padding:35px;
    background-size: contain;
    background:url(&apos;test.jpg&apos;) no-repeat left,url(logo.png) no-repeat right;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> dashed black;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">35px</span>;
    <span class="hljs-attribute">background-size</span>: contain;
    <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">&apos;test.jpg&apos;</span>) no-repeat left,<span class="hljs-built_in">url</span>(logo.png) no-repeat right;
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVTglS?w=999&amp;h=199" src="https://static.alili.tech/img/bVTglS?w=999&amp;h=199" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader25">9.&#x53CD;&#x5C04;</h2><p>&#x8FD9;&#x4E2A;&#x4E5F;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x5012;&#x5F71;&#xFF0C;&#x7528;&#x8D77;&#x6765;&#x4E5F;&#x633A;&#x6709;&#x8DA3;&#x7684;&#x3002;</p><h3 id="articleHeader26">9-1.&#x8BED;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-webkit-box-reflect:&#x65B9;&#x5411;[ above-&#x4E0A; | below-&#x4E0B; | right-&#x53F3; | left-&#x5DE6; ]&#xFF0C;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x906E;&#x7F69;&#x56FE;&#x7247;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code style="word-break:break-word;white-space:initial">-webkit-box-reflect:&#x65B9;&#x5411;[ above-&#x4E0A; | <span class="hljs-type">below</span>-&#x4E0B; | <span class="hljs-type">right</span>-&#x53F3; | <span class="hljs-type">left</span>-&#x5DE6; ]&#xFF0C;&#x504F;&#x79FB;&#x91CF;&#xFF0C;&#x906E;&#x7F69;&#x56FE;&#x7247;</code></pre><h3 id="articleHeader27">9-2.&#x4E0B;&#x5012;&#x5F71;</h3><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&#x4E0B;&#x5012;&#x5F71;&lt;/p&gt;
&lt;p class=&quot;reflect-bottom-p&quot;&gt;&lt;img src=&quot;test.jpg&quot; class=&quot;reflect-bottom&quot;&gt;&lt;/p&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x4E0B;&#x5012;&#x5F71;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reflect-bottom-p&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reflect-bottom&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".reflect-bottom-p {
    padding-bottom: 300px;
}
        
.reflect-bottom {
    -webkit-box-reflect: below;
}   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.reflect-bottom-p</span> {
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">300px</span>;
}
        
<span class="hljs-selector-class">.reflect-bottom</span> {
    <span class="hljs-attribute">-webkit-box-reflect</span>: below;
}   </code></pre><p><span class="img-wrap"><img data-src="/img/bVTeoE?w=518&amp;h=669" src="https://static.alili.tech/img/bVTeoE?w=518&amp;h=669" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader28">9-2.&#x53F3;&#x5012;&#x5F71;&#xFF08;&#x6709;&#x504F;&#x79FB;&#xFF09;</h3><p><span class="img-wrap"><img data-src="/img/bVTeoU?w=994&amp;h=351" src="https://static.alili.tech/img/bVTeoU?w=994&amp;h=351" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&#x53F3;&#x5012;&#x5F71;&#x540C;&#x65F6;&#x6709;&#x504F;&#x79FB;&lt;/p&gt;
&lt;p&gt;&lt;img src=&quot;test.jpg&quot; class=&quot;reflect-right-translate&quot;&gt;&lt;/p&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x53F3;&#x5012;&#x5F71;&#x540C;&#x65F6;&#x6709;&#x504F;&#x79FB;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reflect-right-translate&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".reflect-right-translate {
    -webkit-box-reflect: right 10px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.reflect-right-translate</span> {
    <span class="hljs-attribute">-webkit-box-reflect</span>: right <span class="hljs-number">10px</span>;
}</code></pre><h3 id="articleHeader29">9-3.&#x4E0B;&#x5012;&#x5F71;&#xFF08;&#x6E10;&#x53D8;&#xFF09;</h3><p><span class="img-wrap"><img data-src="/img/bVTepo?w=507&amp;h=668" src="https://static.alili.tech/img/bVTepo?w=507&amp;h=668" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&#x4E0B;&#x5012;&#x5F71;&#xFF08;&#x6E10;&#x53D8;&#xFF09;&lt;/p&gt;
&lt;p class=&quot;reflect-bottom-p&quot;&gt;&lt;img src=&quot;test.jpg&quot; class=&quot;reflect-bottom-mask&quot;&gt;&lt;/p&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x4E0B;&#x5012;&#x5F71;&#xFF08;&#x6E10;&#x53D8;&#xFF09;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reflect-bottom-p&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reflect-bottom-mask&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reflect-bottom-mask {
    -webkit-box-reflect: below 0 linear-gradient(transparent, white);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">reflect-bottom-mask</span> {
    <span class="hljs-attribute">-webkit-box-reflect</span>: below <span class="hljs-number">0</span> <span class="hljs-built_in">linear-gradient</span>(transparent, white);
}</code></pre><h3 id="articleHeader30">9-3.&#x4E0B;&#x5012;&#x5F71;&#xFF08;&#x56FE;&#x7247;&#x906E;&#x7F69;&#xFF09;</h3><p>&#x4F7F;&#x7528;&#x7684;&#x56FE;&#x7247;</p><p><span class="img-wrap"><img data-src="/img/bVTepE?w=200&amp;h=200" src="https://static.alili.tech/img/bVTepE?w=200&amp;h=200" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTepD?w=510&amp;h=672" src="https://static.alili.tech/img/bVTepD?w=510&amp;h=672" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&#x4E0B;&#x5012;&#x5F71;&#xFF08;png&#x56FE;&#x7247;&#xFF09;&lt;/p&gt;
&lt;p class=&quot;reflect-bottom-p&quot;&gt;&lt;img src=&quot;test.jpg&quot; class=&quot;reflect-bottom-img&quot;&gt;&lt;/p&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x4E0B;&#x5012;&#x5F71;&#xFF08;png&#x56FE;&#x7247;&#xFF09;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reflect-bottom-p&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;reflect-bottom-img&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".reflect-bottom-img {
    -webkit-box-reflect: below 0 url(shou.png);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.reflect-bottom-img</span> {
    <span class="hljs-attribute">-webkit-box-reflect</span>: below <span class="hljs-number">0</span> <span class="hljs-built_in">url</span>(shou.png);
}
</code></pre><h2 id="articleHeader31">10.&#x6587;&#x5B57;</h2><h3 id="articleHeader32">&#x6362;&#x884C;</h3><p>&#x8BED;&#x6CD5;&#xFF1A;<code>word-break: normal|break-all|keep-all;</code><br>&#x6817;&#x5B50;&#x548C;&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTgo9?w=511&amp;h=446" src="https://static.alili.tech/img/bVTgo9?w=511&amp;h=446" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8BED;&#x6CD5;&#xFF1A;<code>word-wrap: normal|break-word;</code><br>&#x6817;&#x5B50;&#x548C;&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTgpp?w=602&amp;h=423" src="https://static.alili.tech/img/bVTgpp?w=602&amp;h=423" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><blockquote>&#x8D85;&#x51FA;&#x7701;&#x7565;&#x53F7;&#x8FD9;&#x4E2A;&#xFF0C;&#x4E3B;&#x8981;&#x8BB2;<code>text-overflow</code>&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x76F4;&#x63A5;&#x8BB2;&#x5B9E;&#x4F8B;&#x7684;&#x539F;&#x56E0;&#x662F;<code>text-overflow</code>&#x7684;&#x4E09;&#x4E2A;&#x5199;&#x6CD5;&#xFF0C;<code>clip|ellipsis|string</code>&#x3002;<code>clip</code>&#x8FD9;&#x4E2A;&#x65B9;&#x5F0F;&#x5904;&#x7406;&#x4E0D;&#x7F8E;&#x89C2;&#xFF0C;&#x4E0D;&#x4F18;&#x96C5;&#x3002;<code>string</code>&#x53EA;&#x5728;&#x706B;&#x72D0;&#x517C;&#x5BB9;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/bVTgpF?w=595&amp;h=299" src="https://static.alili.tech/img/bVTgpF?w=595&amp;h=299" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader33">&#x8D85;&#x51FA;&#x7701;&#x7565;&#x53F7;</h3><p>&#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x6709;&#x4E09;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x7981;&#x6B62;&#x6362;&#x884C;&#xFF0C;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#xFF0C;&#x8D85;&#x51FA;&#x7701;&#x7565;&#x53F7;<br>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;This is some long text that will not fit in the box&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-keyword">div</span>&gt;This <span class="hljs-keyword">is</span> <span class="hljs-keyword">some</span> long <span class="hljs-built_in">text</span> <span class="hljs-keyword">that</span> will <span class="hljs-keyword">not</span> fit <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> box&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div
{
    width:200px; 
    border:1px solid #000000;
    overflow:hidden;
    white-space:nowrap; 
    text-overflow:ellipsis;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>; 
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#000000</span>;
    <span class="hljs-attribute">overflow</span>:hidden;
    <span class="hljs-attribute">white-space</span>:nowrap; 
    <span class="hljs-attribute">text-overflow</span>:ellipsis;
}</code></pre><p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTgqd?w=292&amp;h=42" src="https://static.alili.tech/img/bVTgqd?w=292&amp;h=42" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader34">&#x591A;&#x884C;&#x8D85;&#x51FA;&#x7701;&#x7565;&#x53F7;</h3><p>&#x8D85;&#x51FA;&#x7701;&#x7565;&#x53F7;&#x3002;&#x8FD9;&#x4E2A;&#x5BF9;&#x4E8E;&#x5927;&#x5BB6;&#x6765;&#x8BF4;&#xFF0C;&#x4E0D;&#x96BE;&#xFF01;&#x4F46;&#x662F;&#x4EE5;&#x524D;&#x5982;&#x679C;&#x662F;&#x591A;&#x884C;&#x8D85;&#x51FA;&#x7701;&#x7565;&#x53F7;&#xFF0C;&#x5C31;&#x53EA;&#x80FD;&#x7528;js&#x6A21;&#x62DF;&#xFF01;&#x73B0;&#x5728;css3&#x63D0;&#x4F9B;&#x4E86;&#x591A;&#x884C;&#x7701;&#x7565;&#x53F7;&#x7684;&#x65B9;&#x6CD5;&#xFF01;&#x9057;&#x61BE;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x6682;&#x65F6;&#x53EA;&#x652F;&#x6301;webkit&#x6D4F;&#x89C8;&#x5668;&#xFF01;</p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;    
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt; 
&lt;title&gt;&lt;/title&gt; 
&lt;style&gt; 
div
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div&gt;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&lt;/div&gt;


&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>    
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"> 
<span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">400px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">overflow </span>: hidden;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;&#x8FD9;&#x91CC;&#x5C06;&#x4F1A;&#x8D85;&#x51FA;&#x9690;&#x85CF;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x6548;&#x679C;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVTd6V?w=491&amp;h=74" src="https://static.alili.tech/img/bVTd6V?w=491&amp;h=74" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x6837;&#x53D1;&#x73B0;&#x8FB9;&#x6846;&#x8D34;&#x7740;&#x96BE;&#x770B;&#xFF0C;&#x8981;&#x6491;&#x5F00;&#x4E00;&#x70B9;&#xFF0C;&#x4F46;&#x662F;&#x6491;&#x5F00;&#x4E0A;&#x4E0B;&#x8FB9;&#x6846;&#x4E0D;&#x8981;&#x4F7F;&#x7528;padding!&#x56E0;&#x4E3A;&#x4F1A;&#x51FA;&#x73B0;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x6548;&#x679C;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVTd66?w=527&amp;h=102" src="https://static.alili.tech/img/bVTd66?w=527&amp;h=102" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x6B63;&#x786E;&#x59FF;&#x52BF;&#x662F;&#x8FD9;&#x6837;&#x5199;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt; 
div
{
    width:400px;
    margin:0 auto;
    overflow : hidden;
    border:1px solid #ccc;
    text-overflow: ellipsis;
    padding:0 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height:30px;
    height:60px;
}
&lt;/style&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css"> 
<span class="hljs-selector-tag">div</span>
{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">400px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">overflow </span>: hidden;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTd7k?w=478&amp;h=104" src="https://static.alili.tech/img/bVTd7k?w=478&amp;h=104" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p>&#x8FD9;&#x6837;&#x5199;&#xFF0C;&#x5C31;&#x7B97;&#x5728;&#x4E0D;&#x662F;webkit&#x5185;&#x6838;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F18;&#x96C5;&#x964D;&#x7EA7;&#xFF08;&#x9AD8;&#x5EA6;=&#x884C;&#x9AD8;*&#x884C;&#x6570;&#xFF08;webkit-line-clamp&#xFF09;&#xFF09;&#xFF01;</p><p><span class="img-wrap"><img data-src="/img/bVTd7u?w=481&amp;h=108" src="https://static.alili.tech/img/bVTd7u?w=481&amp;h=108" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader35">&#x6587;&#x5B57;&#x9634;&#x5F71;</h3><p>&#x8BED;&#x6CD5;&#xFF1A;text-shadow:&#x6C34;&#x5E73;&#x9634;&#x5F71;&#xFF0C;&#x5782;&#x76F4;&#x9634;&#x5F71;&#xFF0C;&#x6A21;&#x7CCA;&#x7684;&#x8DDD;&#x79BB;&#xFF0C;&#x4EE5;&#x53CA;&#x9634;&#x5F71;&#x7684;&#x989C;&#x8272;&#x3002;<br>&#x6817;&#x5B50;&#xFF1A;<code>text-shadow: 0 0 10px #f00;</code><br>&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTgnR?w=378&amp;h=78" src="https://static.alili.tech/img/bVTgnR?w=378&amp;h=78" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader36">11.&#x989C;&#x8272;</h2><p>&#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x5C31;&#x662F;css3&#x63D0;&#x4F9B;&#x4E86;&#x65B0;&#x7684;&#x989C;&#x8272;&#x8868;&#x793A;&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader37">rgba</h3><p>&#x4E00;&#x4E2A;&#x662F;rgba&#xFF08;rgb&#x4E3A;&#x989C;&#x8272;&#x503C;&#xFF0C;a&#x4E3A;&#x900F;&#x660E;&#x5EA6;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="color: rgba(255,00,00,1);
background: rgba(00,00,00,.5);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-attribute">color</span>: rgba(<span class="hljs-number">255</span>,<span class="hljs-number">00</span>,<span class="hljs-number">00</span>,<span class="hljs-number">1</span>);
<span class="hljs-attribute">background</span>: rgba(<span class="hljs-number">00</span>,<span class="hljs-number">00</span>,<span class="hljs-number">00</span>,.<span class="hljs-number">5</span>);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVTgri?w=924&amp;h=81" src="https://static.alili.tech/img/bVTgri?w=924&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader38">hsla</h3><p>h:&#x8272;&#x76F8;&#x201D;&#xFF0C;&#x201C;s&#xFF1A;&#x9971;&#x548C;&#x5EA6;&#x201D;&#xFF0C;&#x201C;l&#xFF1A;&#x4EAE;&#x5EA6;&#x201D;&#xFF0C;&#x201C;a&#xFF1A;&#x900F;&#x660E;&#x5EA6;&#x201D;<br>&#x8FD9;&#x4E2A;&#x6211;&#x59FF;&#x52BF;&#x4E86;&#x89E3;&#x8FC7;&#xFF0C;&#x6CA1;&#x7528;&#x8FC7;&#xFF0C;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x7ED9;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="color: hsla( 112, 72%, 33%, 0.68);
background-color: hsla( 49, 65%, 60%, 0.68);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code><span class="hljs-keyword">color</span>: hsla( <span class="hljs-number">112</span>, <span class="hljs-number">72</span>%, <span class="hljs-number">33</span>%, <span class="hljs-number">0.68</span>);
background-<span class="hljs-keyword">color</span>: hsla( <span class="hljs-number">49</span>, <span class="hljs-number">65</span>%, <span class="hljs-number">60</span>%, <span class="hljs-number">0.68</span>);</code></pre><p><span class="img-wrap"><img data-src="/img/bVTgqS?w=934&amp;h=72" src="https://static.alili.tech/img/bVTgqS?w=934&amp;h=72" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader39">12.&#x6E10;&#x53D8;</h2><p>css3&#x7684;&#x6E10;&#x53D8;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x4E00;&#x5927;&#x4EAE;&#x70B9;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x7EBF;&#x6027;&#x6E10;&#x53D8;&#xFF0C;&#x5F84;&#x5411;&#x6E10;&#x53D8;&#xFF0C;&#x5706;&#x9525;&#x6E10;&#x53D8;&#xFF08;w3c&#x548C;&#x83DC;&#x9E1F;&#x6559;&#x7A0B;&#x90FD;&#x6CA1;&#x6709;&#x63D0;&#x53CA;&#xFF0C;&#x662F;&#x6211;&#x4ECE;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;&#x4E86;&#x89E3;&#x5230;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x5728;&#x8C37;&#x6B4C;&#x6D4F;&#x89C8;&#x5668;&#x5C1D;&#x8BD5;&#xFF0C;&#x5374;&#x662F;&#x4E00;&#x4E2A;&#x65E0;&#x6548;&#x7684;&#x5199;&#x6CD5;&#xFF01;&#x5927;&#x5BB6;&#x5982;&#x679C;&#x77E5;&#x9053;&#x600E;&#x4E48;&#x7528;&#xFF0C;&#x8BF7;&#x544A;&#x77E5;&#xFF01;&#x611F;&#x8C22;&#xFF09;<br>&#x6E10;&#x53D8;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x7531;&#x4E8E;&#x7528;&#x6CD5;&#x7075;&#x6D3B;&#xFF0C;&#x529F;&#x80FD;&#x4E5F;&#x5F3A;&#x5927;&#xFF0C;&#x8FD9;&#x4E2A;&#x5199;&#x8D77;&#x6765;&#x5F88;&#x957F;&#xFF0C;&#x5199;&#x4E00;&#x70B9;&#x53C8;&#x611F;&#x89C9;&#x6CA1;&#x4EC0;&#x4E48;&#x610F;&#x601D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x8D34;&#x51E0;&#x4E2A;&#x94FE;&#x63A5;&#x6559;&#x7A0B;&#x7ED9;&#x5927;&#x5BB6;&#xFF0C;&#x5728;&#x6587;&#x7AE0;&#x6211;&#x4E0D;&#x591A;&#x8BF4;&#x4E86;&#xFF0C;&#x6BD5;&#x7ADF;&#x6211;&#x4E5F;&#x662F;&#x4ECE;&#x90A3;&#x51E0;&#x4E2A;&#x5730;&#x65B9;&#x5B66;&#x7684;&#xFF0C;&#x4ED6;&#x4EEC;&#x5199;&#x5F97;&#x4E5F;&#x662F;&#x6BD4;&#x6211;&#x597D;&#xFF0C;&#x6BD4;&#x6211;&#x8BE6;&#x7EC6;&#xFF01;</p><p><a href="http://www.w3cplus.com/content/css3-gradient" rel="nofollow noreferrer" target="_blank">CSS3 Gradient</a><br><a href="http://www.w3cplus.com/css3/new-css3-linear-gradient.html" rel="nofollow noreferrer" target="_blank">&#x518D;&#x8BF4;CSS3&#x6E10;&#x53D8;&#x2014;&#x2014;&#x7EBF;&#x6027;&#x6E10;&#x53D8;</a><br><a href="http://www.w3cplus.com/css3/new-css3-radial-gradient.html" rel="nofollow noreferrer" target="_blank">&#x518D;&#x8BF4;CSS3&#x6E10;&#x53D8;&#x2014;&#x2014;&#x5F84;&#x5411;&#x6E10;&#x53D8;</a><br><a href="http://www.cnblogs.com/coco1s/p/7079529.html" rel="nofollow noreferrer" target="_blank">&#x795E;&#x5947;&#x7684; conic-gradient &#x5706;&#x9525;&#x6E10;&#x53D8;</a>&#xFF08;&#x8FD9;&#x7BC7;&#x5C31;&#x662F;&#x770B;&#x6211;&#x770B;&#x5230;&#x5706;&#x9525;&#x6E10;&#x53D8;&#x7684;&#x6587;&#x7AE0;&#xFF09;</p><h2 id="articleHeader40">13.Filter&#xFF08;&#x6EE4;&#x955C;&#xFF09;</h2><p>css3&#x7684;&#x6EE4;&#x955C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x4EAE;&#x70B9;&#xFF0C;&#x529F;&#x80FD;&#x5F3A;&#x5927;&#xFF0C;&#x5199;&#x6CD5;&#x4E5F;&#x7075;&#x6D3B;&#x3002;</p><p>&#x6817;&#x5B50;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;p&gt;&#x539F;&#x56FE;&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; /&gt;
&lt;p&gt;&#x9ED1;&#x767D;&#x8272;filter: grayscale(100%)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter: grayscale(100%);&quot;/&gt;
&lt;p&gt;&#x8910;&#x8272;filter:sepia(1)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:sepia(1);&quot;/&gt;
&lt;p&gt;&#x9971;&#x548C;&#x5EA6;saturate(2)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:saturate(2);&quot;/&gt;
&lt;p&gt;&#x8272;&#x76F8;&#x65CB;&#x8F6C;hue-rotate(90deg)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:hue-rotate(90deg);&quot;/&gt;
&lt;p&gt;&#x53CD;&#x8272;filter:invert(1)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:invert(1);&quot;/&gt;
&lt;p&gt;&#x900F;&#x660E;&#x5EA6;opacity(.5)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:opacity(.5);&quot;/&gt;
&lt;p&gt;&#x4EAE;&#x5EA6;brightness(.5)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:brightness(.5);&quot;/&gt;
&lt;p&gt;&#x5BF9;&#x6BD4;&#x5EA6;contrast(2)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:contrast(2);&quot;/&gt;
&lt;p&gt;&#x6A21;&#x7CCA;blur(3px)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:blur(3px);&quot;/&gt;
&lt;p&gt;&#x9634;&#x5F71;drop-shadow(5px 5px 5px #000)&lt;/p&gt;
&lt;img src=&quot;test.jpg&quot; style=&quot;filter:drop-shadow(5px 5px 5px #000);&quot;/&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x539F;&#x56FE;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x9ED1;&#x767D;&#x8272;filter: grayscale(100%)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter: grayscale(100%);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x8910;&#x8272;filter:sepia(1)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:sepia(1);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x9971;&#x548C;&#x5EA6;saturate(2)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:saturate(2);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x8272;&#x76F8;&#x65CB;&#x8F6C;hue-rotate(90deg)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:hue-rotate(90deg);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x53CD;&#x8272;filter:invert(1)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:invert(1);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x900F;&#x660E;&#x5EA6;opacity(.5)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:opacity(.5);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x4EAE;&#x5EA6;brightness(.5)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:brightness(.5);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5BF9;&#x6BD4;&#x5EA6;contrast(2)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:contrast(2);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6A21;&#x7CCA;blur(3px)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:blur(3px);&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x9634;&#x5F71;drop-shadow(5px 5px 5px #000)<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;filter:drop-shadow(5px 5px 5px #000);&quot;</span>/&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/bVTgyB?w=504&amp;h=357" src="https://static.alili.tech/img/bVTgyB?w=504&amp;h=357" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgzW?w=528&amp;h=716" src="https://static.alili.tech/img/bVTgzW?w=528&amp;h=716" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgzY?w=511&amp;h=728" src="https://static.alili.tech/img/bVTgzY?w=511&amp;h=728" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgzZ?w=511&amp;h=721" src="https://static.alili.tech/img/bVTgzZ?w=511&amp;h=721" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgz0?w=513&amp;h=723" src="https://static.alili.tech/img/bVTgz0?w=513&amp;h=723" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgPQ?w=519&amp;h=715" src="https://static.alili.tech/img/bVTgPQ?w=519&amp;h=715" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader41">14.&#x5F39;&#x6027;&#x5E03;&#x5C40;</h2><p>&#x8FD9;&#x91CC;&#x8BF4;&#x7684;&#x5F39;&#x6027;&#x5E03;&#x5C40;&#xFF0C;&#x5C31;&#x662F;flex&#xFF1B;&#x8FD9;&#x4E00;&#x5757;&#x8981;&#x8BB2;&#x7684;&#x8BDD;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x5168;&#x90E8;&#x8BB2;&#x5B8C;&#xFF0C;&#x4E0D;&#x8BB2;&#x5B8C;&#x6CA1;&#x4EC0;&#x4E48;&#x610F;&#x601D;&#xFF0C;&#x53CD;&#x800C;&#x4F1A;&#x628A;&#x5927;&#x5BB6;&#x641E;&#x8499;&#xFF01;&#x8BB2;&#x5B8C;&#x4E5F;&#x662F;&#x5F88;&#x957F;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4E5F;&#x53EA;&#x8D34;&#x6559;&#x7A0B;&#x7F51;&#x5740;&#x3002;&#x535A;&#x5BA2;&#x8BB2;&#x7684;&#x5F88;&#x597D;&#xFF0C;&#x5F88;&#x8BE6;&#x7EC6;&#xFF01;</p><p><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">Flex &#x5E03;&#x5C40;&#x6559;&#x7A0B;&#xFF1A;&#x8BED;&#x6CD5;&#x7BC7;</a><br><a href="http://www.ruanyifeng.com/blog/2015/07/flex-examples.html" rel="nofollow noreferrer" target="_blank">Flex &#x5E03;&#x5C40;&#x6559;&#x7A0B;&#xFF1A;&#x5B9E;&#x4F8B;&#x7BC7;</a></p><h2 id="articleHeader42">15.&#x6805;&#x683C;&#x5E03;&#x5C40;</h2><p>&#x6805;&#x683C;&#x5316;&#x5E03;&#x5C40;&#xFF0C;&#x5C31;&#x662F;grid&#xFF1B;&#x8FD9;&#x4E00;&#x5757;&#x548C;flex&#x4E00;&#x6837;&#xFF0C;&#x8981;&#x8BB2;&#x5C31;&#x5FC5;&#x987B;&#x8BB2;&#x5B8C;&#x3002;&#x8FD9;&#x5757;&#x7684;&#x5185;&#x5BB9;&#x548C;flex&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x4E5F;&#x6709;&#x70B9;&#x957F;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4E5F;&#x8D34;&#x94FE;&#x63A5;&#xFF0C;&#x8FD9;&#x4E2A;&#x94FE;&#x63A5;&#x8BB2;&#x5F97;&#x4E5F;&#x5F88;&#x8BE6;&#x7EC6;&#xFF01;</p><p><a href="http://www.jianshu.com/p/d183265a8dad" rel="nofollow noreferrer" target="_blank">Grid&#x5E03;&#x5C40;&#x6307;&#x5357;</a></p><h2 id="articleHeader43">16.&#x591A;&#x5217;&#x5E03;&#x5C40;</h2><p>&#x8FD9;&#x4E00;&#x5757;&#xFF0C;&#x6211;&#x4E5F;&#x662F;&#x4E86;&#x89E3;&#x8FC7;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x591A;&#x5217;&#x5E94;&#x8BE5;&#x8FD8;&#x662F;&#x633A;&#x6709;&#x7528;&#x7684;&#x3002;&#x867D;&#x7136;&#x6211;&#x6CA1;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7528;&#x8FC7;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x7B80;&#x5355;&#x8BF4;&#x4E0B;&#xFF01;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF01;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x5EFA;&#x8BAE;&#x52A0;&#x79C1;&#x6709;&#x524D;&#x7F00;&#xFF0C;&#x517C;&#x5BB9;&#x6027;&#x6709;&#x5F85;&#x63D0;&#x9AD8;&#xFF01;<br>html</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;newspaper&quot;&gt;
&#x5F53;&#x6211;&#x5E74;&#x8F7B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x68A6;&#x60F3;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x4E16;&#x754C;&#xFF1B;&#x5F53;&#x6211;&#x6210;&#x719F;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x53D1;&#x73B0;&#x6211;&#x4E0D;&#x80FD;&#x591F;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x4E16;&#x754C;&#xFF0C;&#x6211;&#x5C06;&#x76EE;&#x5149;&#x7F29;&#x77ED;&#x4E86;&#x4E9B;&#xFF0C;&#x51B3;&#x5B9A;&#x53EA;&#x6539;&#x53D8;&#x6211;&#x7684;&#x56FD;&#x5BB6;&#xFF1B;&#x5F53;&#x6211;&#x8FDB;&#x5165;&#x66AE;&#x5E74;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x53D1;&#x73B0;&#x6211;&#x4E0D;&#x80FD;&#x591F;&#x6539;&#x53D8;&#x6211;&#x4EEC;&#x7684;&#x56FD;&#x5BB6;&#xFF0C;&#x6211;&#x7684;&#x6700;&#x540E;&#x613F;&#x671B;&#x4EC5;&#x4EC5;&#x662F;&#x6539;&#x53D8;&#x4E00;&#x4E0B;&#x6211;&#x7684;&#x5BB6;&#x5EAD;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x4E5F;&#x4E0D;&#x53EF;&#x80FD;&#x3002;&#x5F53;&#x6211;&#x73B0;&#x5728;&#x8EBA;&#x5728;&#x5E8A;&#x4E0A;&#xFF0C;&#x884C;&#x5C06;&#x5C31;&#x6728;&#x65F6;&#xFF0C;&#x6211;&#x7A81;&#x7136;&#x610F;&#x8BC6;&#x5230;&#xFF1A;&#x5982;&#x679C;&#x4E00;&#x5F00;&#x59CB;&#x6211;&#x4EC5;&#x4EC5;&#x53BB;&#x6539;&#x53D8;&#x6211;&#x81EA;&#x5DF1;&#xFF0C;&#x7136;&#x540E;&#xFF0C;&#x6211;&#x53EF;&#x80FD;&#x6539;&#x53D8;&#x6211;&#x7684;&#x5BB6;&#x5EAD;&#xFF1B;&#x5728;&#x5BB6;&#x4EBA;&#x7684;&#x5E2E;&#x52A9;&#x548C;&#x9F13;&#x52B1;&#x4E0B;&#xFF0C;&#x6211;&#x53EF;&#x80FD;&#x4E3A;&#x56FD;&#x5BB6;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF1B;&#x7136;&#x540E;&#xFF0C;&#x8C01;&#x77E5;&#x9053;&#x5462;?&#x6211;&#x751A;&#x81F3;&#x53EF;&#x80FD;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x4E16;&#x754C;&#x3002;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;newspaper&quot;</span>&gt;
&#x5F53;&#x6211;&#x5E74;&#x8F7B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x68A6;&#x60F3;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x4E16;&#x754C;&#xFF1B;&#x5F53;&#x6211;&#x6210;&#x719F;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x53D1;&#x73B0;&#x6211;&#x4E0D;&#x80FD;&#x591F;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x4E16;&#x754C;&#xFF0C;&#x6211;&#x5C06;&#x76EE;&#x5149;&#x7F29;&#x77ED;&#x4E86;&#x4E9B;&#xFF0C;&#x51B3;&#x5B9A;&#x53EA;&#x6539;&#x53D8;&#x6211;&#x7684;&#x56FD;&#x5BB6;&#xFF1B;&#x5F53;&#x6211;&#x8FDB;&#x5165;&#x66AE;&#x5E74;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x53D1;&#x73B0;&#x6211;&#x4E0D;&#x80FD;&#x591F;&#x6539;&#x53D8;&#x6211;&#x4EEC;&#x7684;&#x56FD;&#x5BB6;&#xFF0C;&#x6211;&#x7684;&#x6700;&#x540E;&#x613F;&#x671B;&#x4EC5;&#x4EC5;&#x662F;&#x6539;&#x53D8;&#x4E00;&#x4E0B;&#x6211;&#x7684;&#x5BB6;&#x5EAD;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x4E5F;&#x4E0D;&#x53EF;&#x80FD;&#x3002;&#x5F53;&#x6211;&#x73B0;&#x5728;&#x8EBA;&#x5728;&#x5E8A;&#x4E0A;&#xFF0C;&#x884C;&#x5C06;&#x5C31;&#x6728;&#x65F6;&#xFF0C;&#x6211;&#x7A81;&#x7136;&#x610F;&#x8BC6;&#x5230;&#xFF1A;&#x5982;&#x679C;&#x4E00;&#x5F00;&#x59CB;&#x6211;&#x4EC5;&#x4EC5;&#x53BB;&#x6539;&#x53D8;&#x6211;&#x81EA;&#x5DF1;&#xFF0C;&#x7136;&#x540E;&#xFF0C;&#x6211;&#x53EF;&#x80FD;&#x6539;&#x53D8;&#x6211;&#x7684;&#x5BB6;&#x5EAD;&#xFF1B;&#x5728;&#x5BB6;&#x4EBA;&#x7684;&#x5E2E;&#x52A9;&#x548C;&#x9F13;&#x52B1;&#x4E0B;&#xFF0C;&#x6211;&#x53EF;&#x80FD;&#x4E3A;&#x56FD;&#x5BB6;&#x505A;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;&#xFF1B;&#x7136;&#x540E;&#xFF0C;&#x8C01;&#x77E5;&#x9053;&#x5462;?&#x6211;&#x751A;&#x81F3;&#x53EF;&#x80FD;&#x6539;&#x53D8;&#x8FD9;&#x4E2A;&#x4E16;&#x754C;&#x3002;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".newspaper
{
    column-count: 3;
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-rule:2px solid #000;
    -webkit-column-rule:2px solid #000;
    -mox-column-rule:2px solid #000;
}    
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.newspaper</span>
{
    <span class="hljs-attribute">column-count</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">-webkit-column-count</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">-moz-column-count</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">column-rule</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">-webkit-column-rule</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#000</span>;
    <span class="hljs-attribute">-mox-column-rule</span>:<span class="hljs-number">2px</span> solid <span class="hljs-number">#000</span>;
}    
</code></pre><p><span class="img-wrap"><img data-src="/img/bVTgRx?w=587&amp;h=163" src="https://static.alili.tech/img/bVTgRx?w=587&amp;h=163" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader44">17.&#x76D2;&#x6A21;&#x578B;&#x5B9A;&#x4E49;</h2><p>box-sizing&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x7F51;&#x4E0A;&#x8BF4;&#x6CD5;&#x662F;&#xFF1A;&#x5C5E;&#x6027;&#x5141;&#x8BB8;&#x60A8;&#x4EE5;&#x7279;&#x5B9A;&#x7684;&#x65B9;&#x5F0F;&#x5B9A;&#x4E49;&#x5339;&#x914D;&#x67D0;&#x4E2A;&#x533A;&#x57DF;&#x7684;&#x7279;&#x5B9A;&#x5143;&#x7D20;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x5927;&#x5BB6;&#x770B;&#x7740;&#x53EF;&#x80FD;&#x4E0D;&#x77E5;&#x9053;&#x5728;&#x8BF4;&#x4EC0;&#x4E48;&#xFF0C;&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x7684;&#x7406;&#x89E3;&#x5C31;&#x662F;&#xFF1A;box-sizing:border-box&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FB9;&#x6846;&#x548C;padding&#x5305;&#x542B;&#x5728;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x9AD8;&#x4E4B;&#x5185;&#xFF01;&#x5982;&#x4E0B;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVZDJZ?w=1040&amp;h=797" src="https://static.alili.tech/img/bVZDJZ?w=1040&amp;h=797" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>box-sizing:content-box&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FB9;&#x6846;&#x548C;padding&#x4E0D;&#x5305;&#x542B;&#x5728;&#x5143;&#x7D20;&#x7684;&#x5BBD;&#x9AD8;&#x4E4B;&#x5185;&#xFF01;&#x5982;&#x4E0B;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/bVZDJ5?w=950&amp;h=876" src="https://static.alili.tech/img/bVZDJ5?w=950&amp;h=876" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader45">18.&#x5A92;&#x4F53;&#x67E5;&#x8BE2;</h2><p>&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#xFF0C;&#x5C31;&#x5728;&#x76D1;&#x542C;&#x5C4F;&#x5E55;&#x5C3A;&#x5BF8;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x5C3A;&#x5BF8;&#x7684;&#x65F6;&#x5019;&#x663E;&#x793A;&#x4E0D;&#x540C;&#x7684;&#x6837;&#x5F0F;&#xFF01;&#x5728;&#x505A;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x7F51;&#x7AD9;&#x91CC;&#x9762;&#xFF0C;&#x662F;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;&#x4E00;&#x73AF;&#xFF01;&#x4E0D;&#x8FC7;&#x7531;&#x4E8E;&#x6211;&#x6700;&#x8FD1;&#x7684;&#x9879;&#x76EE;&#x90FD;&#x662F;&#x4F7F;&#x7528;rem&#x5E03;&#x5C40;&#x3002;&#x6240;&#x4EE5;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#x5C31;&#x6CA1;&#x600E;&#x4E48;&#x7528;&#x4E86;&#xFF01;&#x4F46;&#x662F;&#xFF0C;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#xFF0C;&#x8FD8;&#x662F;&#x5F88;&#x503C;&#x5F97;&#x4E00;&#x770B;&#x7684;&#xFF01;&#x8BF4;&#x4E0D;&#x5B9A;&#x54EA;&#x4E00;&#x5929;&#x5C31;&#x9700;&#x8981;&#x7528;&#x4E0A;&#x4E86;&#xFF01;</p><p>&#x6817;&#x5B50;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta charset=&quot;utf-8&quot;&gt; 
&lt;title&gt;&lt;/title&gt; 
&lt;style&gt;
body {
    background-color: pink;
}
@media screen and (max-width: 960px) {
    body {
        background-color: darkgoldenrod;
    }
}
@media screen and (max-width: 480px) {
    body {
        background-color: lightgreen;
    }
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;&#x91CD;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x67E5;&#x770B;&#x6548;&#x679C;&#xFF01;&lt;/h1&gt;
&lt;p&gt;&#x5982;&#x679C;&#x5A92;&#x4F53;&#x7C7B;&#x578B;&#x5C4F;&#x5E55;&#x7684;&#x53EF;&#x89C6;&#x7A97;&#x53E3;&#x5BBD;&#x5EA6;&#x5C0F;&#x4E8E; 960 px &#xFF0C;&#x80CC;&#x666F;&#x989C;&#x8272;&#x5C06;&#x6539;&#x53D8;&#x3002;&lt;/p&gt;
&lt;p&gt;&#x5982;&#x679C;&#x5A92;&#x4F53;&#x7C7B;&#x578B;&#x5C4F;&#x5E55;&#x7684;&#x53EF;&#x89C6;&#x7A97;&#x53E3;&#x5BBD;&#x5EA6;&#x5C0F;&#x4E8E; 480 px &#xFF0C;&#x80CC;&#x666F;&#x989C;&#x8272;&#x5C06;&#x6539;&#x53D8;&#x3002;&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background-color</span>: pink;
}
@<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">960px</span>) {
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background-color</span>: darkgoldenrod;
    }
}
@<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">480px</span>) {
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background-color</span>: lightgreen;
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x91CD;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#x67E5;&#x770B;&#x6548;&#x679C;&#xFF01;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5982;&#x679C;&#x5A92;&#x4F53;&#x7C7B;&#x578B;&#x5C4F;&#x5E55;&#x7684;&#x53EF;&#x89C6;&#x7A97;&#x53E3;&#x5BBD;&#x5EA6;&#x5C0F;&#x4E8E; 960 px &#xFF0C;&#x80CC;&#x666F;&#x989C;&#x8272;&#x5C06;&#x6539;&#x53D8;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x5982;&#x679C;&#x5A92;&#x4F53;&#x7C7B;&#x578B;&#x5C4F;&#x5E55;&#x7684;&#x53EF;&#x89C6;&#x7A97;&#x53E3;&#x5BBD;&#x5EA6;&#x5C0F;&#x4E8E; 480 px &#xFF0C;&#x80CC;&#x666F;&#x989C;&#x8272;&#x5C06;&#x6539;&#x53D8;&#x3002;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTgPW?w=1022&amp;h=157" src="https://static.alili.tech/img/bVTgPW?w=1022&amp;h=157" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader46">19.&#x6DF7;&#x5408;&#x6A21;&#x5F0F;</h2><p>&#x6DF7;&#x5408;&#x6A21;&#x5F0F;&#xFF0C;&#x5C31;&#x50CF;photoshop&#x91CC;&#x9762;&#x7684;&#x6DF7;&#x5408;&#x6A21;&#x5F0F;&#xFF01;&#x8FD9;&#x4E00;&#x5757;&#xFF0C;&#x6211;&#x4E86;&#x89E3;&#x8FC7;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x4E0A;&#x6CA1;&#x7528;&#x8FC7;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x89C9;&#x5F97;&#x8FD9;&#x4E2A;&#x5E94;&#x8BE5;&#x4E0D;&#x4F1A;&#x6CA1;&#x6709;&#x7528;&#x6B66;&#x4E4B;&#x5730;&#xFF01;<br>css3&#x7684;&#x6DF7;&#x5408;&#x6A21;&#x5F0F;&#xFF0C;&#x4E24;&#x4E2A;&#xFF08;background-blend-mode&#x548C;mix-blend-mode&#xFF09;&#x3002;&#x8FD9;&#x4E24;&#x4E2A;&#x5199;&#x6CD5;&#x548C;&#x663E;&#x793A;&#x6548;&#x679C;&#x90FD;&#x975E;&#x5E38;&#x50CF;&#xFF01;&#x533A;&#x522B;&#x5C31;&#x5728;&#x4E8E;background-blend-mode&#x662F;&#x7528;&#x4E8E;&#x540C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x80CC;&#x666F;&#x56FE;&#x7247;&#x548C;&#x80CC;&#x666F;&#x989C;&#x8272;&#x7684;&#x3002;mix-blend-mode&#x7528;&#x4E8E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x80CC;&#x666F;&#x56FE;&#x7247;&#x6216;&#x8005;&#x989C;&#x8272;&#x548C;&#x5B50;&#x5143;&#x7D20;&#x7684;&#x3002;&#x770B;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x533A;&#x522B;&#x5C31;&#x51FA;&#x6765;&#x4E86;&#xFF01;</p><blockquote>&#x8FD9;&#x4E00;&#x5757;&#x56FE;&#x7247;&#x5F88;&#x591A;&#xFF0C;&#x5927;&#x5BB6;&#x770B;&#x56FE;&#x7247;&#x5FEB;&#x901F;&#x626B;&#x4E00;&#x773C;&#xFF0C;&#x770B;&#x4E0B;&#x4EC0;&#x4E48;&#x6548;&#x679C;&#x5C31;&#x597D;&#xFF01;</blockquote><h3 id="articleHeader47">background-blend-mode</h3><p>&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot;&gt;
        &lt;title&gt;&lt;/title&gt;
    &lt;/head&gt;
    &lt;style&gt;
        div{
            width: 480px;
            height: 300px;
            background:url(&apos;test.jpg&apos;)no-repeat,#09f;
        }
    &lt;/style&gt;
    &lt;body&gt;
        &lt;!----&gt;
        
        &lt;p&gt;&#x539F;&#x56FE;&lt;/p&gt;
        &lt;div&gt;&lt;/div&gt;
        &lt;p&gt;multiply&#x6B63;&#x7247;&#x53E0;&#x5E95;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: multiply;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;screen&#x6EE4;&#x8272;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: screen;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;overlay&#x53E0;&#x52A0;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: overlay;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;darken&#x53D8;&#x6697;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: darken;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;lighten&#x53D8;&#x4EAE;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: lighten;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;color-dodge&#x989C;&#x8272;&#x51CF;&#x6DE1;&#x6A21;&#x5F0F;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: color-dodge;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;color-burn&#x989C;&#x8272;&#x52A0;&#x6DF1;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: color-burn;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;hard-light&#x5F3A;&#x5149;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: hard-light;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;soft-light&#x67D4;&#x5149;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: soft-light;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;difference&#x5DEE;&#x503C;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: difference;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;exclusion&#x6392;&#x9664;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: exclusion;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;hue&#x8272;&#x76F8;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: hue;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;saturation&#x9971;&#x548C;&#x5EA6;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: saturation;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;color&#x989C;&#x8272;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: color;&quot;&gt;&lt;/div&gt;
        &lt;p&gt;luminosity&#x4EAE;&#x5EA6;&lt;/p&gt;
        &lt;div style=&quot;background-blend-mode: luminosity;&quot;&gt;&lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">480px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">background</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">&apos;test.jpg&apos;</span>)<span class="hljs-built_in">no-repeat</span>,<span class="hljs-number">#09f</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-comment">&lt;!----&gt;</span>
        
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x539F;&#x56FE;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>multiply&#x6B63;&#x7247;&#x53E0;&#x5E95;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: multiply;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>screen&#x6EE4;&#x8272;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: screen;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>overlay&#x53E0;&#x52A0;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: overlay;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>darken&#x53D8;&#x6697;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: darken;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>lighten&#x53D8;&#x4EAE;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: lighten;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>color-dodge&#x989C;&#x8272;&#x51CF;&#x6DE1;&#x6A21;&#x5F0F;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: color-dodge;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>color-burn&#x989C;&#x8272;&#x52A0;&#x6DF1;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: color-burn;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hard-light&#x5F3A;&#x5149;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: hard-light;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>soft-light&#x67D4;&#x5149;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: soft-light;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>difference&#x5DEE;&#x503C;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: difference;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>exclusion&#x6392;&#x9664;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: exclusion;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hue&#x8272;&#x76F8;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: hue;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>saturation&#x9971;&#x548C;&#x5EA6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: saturation;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>color&#x989C;&#x8272;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: color;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>luminosity&#x4EAE;&#x5EA6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;background-blend-mode: luminosity;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTgPX?w=502&amp;h=362" src="https://static.alili.tech/img/bVTgPX?w=502&amp;h=362" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgPZ?w=506&amp;h=710" src="https://static.alili.tech/img/bVTgPZ?w=506&amp;h=710" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgP0?w=512&amp;h=711" src="https://static.alili.tech/img/bVTgP0?w=512&amp;h=711" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgP1?w=516&amp;h=711" src="https://static.alili.tech/img/bVTgP1?w=516&amp;h=711" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgP2?w=514&amp;h=353" src="https://static.alili.tech/img/bVTgP2?w=514&amp;h=353" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgP3?w=523&amp;h=709" src="https://static.alili.tech/img/bVTgP3?w=523&amp;h=709" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgP6?w=521&amp;h=708" src="https://static.alili.tech/img/bVTgP6?w=521&amp;h=708" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgP9?w=544&amp;h=713" src="https://static.alili.tech/img/bVTgP9?w=544&amp;h=713" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQa?w=525&amp;h=705" src="https://static.alili.tech/img/bVTgQa?w=525&amp;h=705" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h3 id="articleHeader48">mix-blend-mode</h3><p>&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot;&gt;
        &lt;title&gt;&lt;/title&gt;
    &lt;/head&gt;
    &lt;style&gt;
        div{
            padding: 20px;
            width: 480px;
            background: #09f;
        }
    &lt;/style&gt;
    &lt;body&gt;
        &lt;p&gt;&#x539F;&#x56FE;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;multiply&#x6B63;&#x7247;&#x53E0;&#x5E95;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: multiply;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;screen&#x6EE4;&#x8272;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: screen;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;overlay&#x53E0;&#x52A0;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: overlay;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;darken&#x53D8;&#x6697;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: darken;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;lighten&#x53D8;&#x4EAE;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: lighten;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;color-dodge&#x989C;&#x8272;&#x51CF;&#x6DE1;&#x6A21;&#x5F0F;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: color-dodge;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;color-burn&#x989C;&#x8272;&#x52A0;&#x6DF1;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: color-burn;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;hard-light&#x5F3A;&#x5149;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: hard-light;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;soft-light&#x67D4;&#x5149;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: soft-light;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;difference&#x5DEE;&#x503C;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: difference;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;exclusion&#x6392;&#x9664;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: exclusion;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;hue&#x8272;&#x76F8;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: hue;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;saturation&#x9971;&#x548C;&#x5EA6;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: saturation;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;color&#x989C;&#x8272;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: color;&quot;/&gt;&lt;/div&gt;
        &lt;p&gt;luminosity&#x4EAE;&#x5EA6;&lt;/p&gt;
        &lt;div&gt;&lt;img src=&quot;test.jpg&quot; style=&quot;mix-blend-mode: luminosity;&quot;/&gt;&lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">div</span>{
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">480px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#09f</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x539F;&#x56FE;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>multiply&#x6B63;&#x7247;&#x53E0;&#x5E95;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: multiply;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>screen&#x6EE4;&#x8272;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: screen;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>overlay&#x53E0;&#x52A0;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: overlay;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>darken&#x53D8;&#x6697;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: darken;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>lighten&#x53D8;&#x4EAE;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: lighten;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>color-dodge&#x989C;&#x8272;&#x51CF;&#x6DE1;&#x6A21;&#x5F0F;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: color-dodge;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>color-burn&#x989C;&#x8272;&#x52A0;&#x6DF1;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: color-burn;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hard-light&#x5F3A;&#x5149;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: hard-light;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>soft-light&#x67D4;&#x5149;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: soft-light;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>difference&#x5DEE;&#x503C;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: difference;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>exclusion&#x6392;&#x9664;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: exclusion;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>hue&#x8272;&#x76F8;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: hue;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>saturation&#x9971;&#x548C;&#x5EA6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: saturation;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>color&#x989C;&#x8272;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: color;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>luminosity&#x4EAE;&#x5EA6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;test.jpg&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;mix-blend-mode: luminosity;&quot;</span>/&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/bVTgQd?w=556&amp;h=406" src="https://static.alili.tech/img/bVTgQd?w=556&amp;h=406" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQf?w=550&amp;h=400" src="https://static.alili.tech/img/bVTgQf?w=550&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQk?w=554&amp;h=400" src="https://static.alili.tech/img/bVTgQk?w=554&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQm?w=554&amp;h=398" src="https://static.alili.tech/img/bVTgQm?w=554&amp;h=398" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQp?w=551&amp;h=401" src="https://static.alili.tech/img/bVTgQp?w=551&amp;h=401" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQs?w=544&amp;h=400" src="https://static.alili.tech/img/bVTgQs?w=544&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQv?w=568&amp;h=402" src="https://static.alili.tech/img/bVTgQv?w=568&amp;h=402" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQx?w=555&amp;h=391" src="https://static.alili.tech/img/bVTgQx?w=555&amp;h=391" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQz?w=563&amp;h=404" src="https://static.alili.tech/img/bVTgQz?w=563&amp;h=404" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgQB?w=553&amp;h=400" src="https://static.alili.tech/img/bVTgQB?w=553&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTjea?w=556&amp;h=399" src="https://static.alili.tech/img/bVTjea?w=556&amp;h=399" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTgSP?w=551&amp;h=396" src="https://static.alili.tech/img/bVTgSP?w=551&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTjeh?w=560&amp;h=400" src="https://static.alili.tech/img/bVTjeh?w=560&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTjem?w=558&amp;h=400" src="https://static.alili.tech/img/bVTjem?w=558&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTjep?w=547&amp;h=402" src="https://static.alili.tech/img/bVTjep?w=547&amp;h=402" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/bVTjeq?w=551&amp;h=395" src="https://static.alili.tech/img/bVTjeq?w=551&amp;h=395" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader49">20.&#x5C0F;&#x7ED3;</h2><p>&#x597D;&#x4E86;&#xFF0C;&#x4E2A;&#x4EBA;&#x603B;&#x7ED3;&#x7684;css3&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x5C31;&#x5230;&#x8FD9;&#x91CC;&#x4E86;&#xFF01;&#x5176;&#x4E2D;&#x6709;&#x4E00;&#x4E9B;&#x65B0;&#x7279;&#x6027;&#x5982;&#x679C;&#x60F3;&#x4F7F;&#x7528;&#x7684;&#x597D;&#xFF0C;&#x5FC5;&#x987B;&#x591A;&#x53BB;&#x4E86;&#x89E3;&#x548C;&#x7EC3;&#x4E60;&#x3002;&#x6709;&#x4E9B;&#x65B0;&#x7279;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x5355;&#x72EC;&#x8BE6;&#x7EC6;&#x7684;&#x8BB2;&#xFF0C;&#x6BD4;&#x5982;&#x52A8;&#x753B;&#xFF0C;&#x8FC7;&#x6E21;&#xFF0C;&#x5F39;&#x6027;&#x76D2;&#x5B50;&#xFF0C;&#x6E10;&#x53D8;&#x7B49;&#x3002;&#x4F30;&#x8BA1;&#x53EF;&#x4EE5;&#x5199;&#x51E0;&#x7BC7;&#x6216;&#x8005;&#x5341;&#x51E0;&#x7BC7;&#x6587;&#x7AE0;&#xFF01;&#x7279;&#x522B;&#x662F;&#x52A8;&#x753B;&#xFF0C;&#x4F30;&#x8BA1;&#x5199;&#x4E00;&#x672C;&#x4E66;&#x90FD;&#x53EF;&#x4EE5;&#xFF01;&#x4E0A;&#x9762;&#x5BF9;css3&#x65B0;&#x7279;&#x6027;&#x7684;&#x8BB2;&#x89E3;&#x548C;&#x6848;&#x4F8B;&#xFF0C;&#x90FD;&#x662F;&#x57FA;&#x7840;&#x7684;&#x8BA4;&#x8BC6;&#x548C;&#x7528;&#x6CD5;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x8D77;&#x5230;&#x4E00;&#x4E2A;&#x62D3;&#x5C55;&#x601D;&#x7EF4;&#x7684;&#x4F5C;&#x7528;&#x3002;&#x6700;&#x91CD;&#x8981;&#x7684;&#x662F;&#xFF0C;&#x5927;&#x5BB6;&#x8981;&#x591A;&#x52A0;&#x7EC3;&#x4E60;&#xFF0C;&#x5B9E;&#x64CD;&#x662F;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x73AF;&#xFF0C;&#x5B70;&#x80FD;&#x751F;&#x5DE7;&#x4E5F;&#x662F;&#x8FD9;&#x6837;&#x6765;&#x7684;&#xFF01;css3&#x4E0D;&#x4EC5;&#x8981;&#x4F1A;&#x7528;&#xFF0C;&#x4E5F;&#x8981;&#x7528;&#x597D;&#xFF0C;&#x7528;&#x597D;css3&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x7684;&#x5F00;&#x53D1;&#x4E0A;&#xFF0C;&#x5F88;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#xFF01;&#x5F53;&#x7136;&#x5982;&#x679C;&#x6211;&#x6709;&#x53D1;&#x73B0;&#x4EC0;&#x4E48;&#x597D;&#x73A9;&#x7684;&#xFF0C;&#x6709;&#x7528;&#x7684;&#xFF0C;&#x6211;&#x4F1A;&#x7EE7;&#x7EED;&#x5199;&#x6587;&#x7AE0;&#x3002;<br>&#x6700;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x89C9;&#x5F97;&#x6211;&#x54EA;&#x91CC;&#x5199;&#x9519;&#x4E86;&#xFF0C;&#x5199;&#x5F97;&#x4E0D;&#x597D;&#xFF0C;&#x6216;&#x8005;&#x6709;&#x4EC0;&#x4E48;&#x63A8;&#x8350;&#x7684;&#xFF01;&#x6B22;&#x8FCE;&#x6307;&#x70B9;&#xFF01;</p><p>-------------------------&#x534E;&#x4E3D;&#x7684;&#x5206;&#x5272;&#x7EBF;--------------------<br>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#xFF0C;&#x5173;&#x6CE8;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF1A;&#x5B88;&#x5019;&#x4E66;&#x9601;</p><p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
个人总结（css3新特性）

## 原文链接
[https://segmentfault.com/a/1190000010780991](https://segmentfault.com/a/1190000010780991)


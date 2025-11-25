---
title: 'Web 端反爬虫技术方案' 
date: 2018-11-17 02:30:13
hidden: true
slug: o88sgwbky6
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x5BF9;&#x4E8E;&#x5185;&#x5BB9;&#x578B;&#x7684;&#x516C;&#x53F8;&#xFF0C;&#x6570;&#x636E;&#x7684;&#x5B89;&#x5168;&#x6027;&#x5F88;&#x91CD;&#x8981;&#x3002;&#x5BF9;&#x4E8E;&#x5185;&#x5BB9;&#x516C;&#x53F8;&#x6765;&#x8BF4;&#xFF0C;&#x6570;&#x636E;&#x7684;&#x91CD;&#x8981;&#x6027;&#x4E0D;&#x8A00;&#x800C;&#x55BB;&#x3002;&#x6BD4;&#x5982;&#x4F60;&#x4E00;&#x4E2A;&#x505A;&#x5728;&#x7EBF;&#x6559;&#x80B2;&#x7684;&#x5E73;&#x53F0;&#xFF0C;&#x9898;&#x76EE;&#x7684;&#x6570;&#x636E;&#x5F88;&#x91CD;&#x8981;&#x5427;&#xFF0C;&#x4F46;&#x662F;&#x88AB;&#x522B;&#x4EBA;&#x901A;&#x8FC7;&#x722C;&#x866B;&#x6280;&#x672F;&#x5168;&#x90E8;&#x722C;&#x8D70;&#x4E86;&#xFF1F;&#x5982;&#x679C;&#x6838;&#x5FC3;&#x7ADE;&#x4E89;&#x529B;&#x90FD;&#x88AB;&#x62FF;&#x8D70;&#x4E86;&#xFF0C;&#x90A3;&#x5C31;&#x662F;&#x51C9;&#x51C9;&#x3002;&#x518D;&#x6BD4;&#x8BF4;&#x6709;&#x4E2A;&#x72EC;&#x7ACB;&#x5F00;&#x53D1;&#x8005;&#x60F3;&#x6284;&#x88AD;&#x4F60;&#x7684;&#x4EA7;&#x54C1;&#xFF0C;&#x901A;&#x8FC7;&#x6293;&#x5305;&#x548C;&#x722C;&#x866B;&#x624B;&#x6BB5;&#x5C06;&#x4F60;&#x6838;&#x5FC3;&#x7684;&#x6570;&#x636E;&#x62FF;&#x8D70;&#xFF0C;&#x7136;&#x540E;&#x77ED;&#x671F;&#x5185;&#x505A;&#x4E2A;&#x7F51;&#x7AD9;&#x548C; App&#xFF0C;&#x77ED;&#x671F;&#x5185;&#x6210;&#x4E3A;&#x4F60;&#x7684;&#x52B2;&#x654C;&#x3002;</blockquote><h1 id="articleHeader0">&#x722C;&#x866B;&#x624B;&#x6BB5;</h1><ul><li>&#x76EE;&#x524D;&#x722C;&#x866B;&#x6280;&#x672F;&#x90FD;&#x662F;&#x4ECE;&#x6E32;&#x67D3;&#x597D;&#x7684; html &#x9875;&#x9762;&#x76F4;&#x63A5;&#x627E;&#x5230;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x8282;&#x70B9;&#xFF0C;&#x7136;&#x540E;&#x83B7;&#x53D6;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x672C;</li><li>&#x6709;&#x4E9B;&#x7F51;&#x7AD9;&#x5B89;&#x5168;&#x6027;&#x505A;&#x7684;&#x597D;&#xFF0C;&#x6BD4;&#x5982;&#x5217;&#x8868;&#x9875;&#x53EF;&#x80FD;&#x597D;&#x83B7;&#x53D6;&#xFF0C;&#x4F46;&#x662F;&#x8BE6;&#x60C5;&#x9875;&#x5C31;&#x9700;&#x8981;&#x4ECE;&#x5217;&#x8868;&#x9875;&#x70B9;&#x51FB;&#x5BF9;&#x5E94;&#x7684; item&#xFF0C;&#x5C06; itemId &#x901A;&#x8FC7; form &#x8868;&#x5355;&#x63D0;&#x4EA4;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x91CD;&#x5B9A;&#x5411;&#x5230;&#x8BE6;&#x60C5;&#x9875;&#xFF08;&#x91CD;&#x5B9A;&#x5411;&#x8FC7;&#x6765;&#x7684;&#x5730;&#x5740;&#x540E;&#x624D;&#x5E26;&#x6709;&#x8BE6;&#x60C5;&#x9875;&#x7684;&#x53C2;&#x6570; detailID&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x6B65;&#x9AA4;&#x5C31;&#x53EF;&#x4EE5;&#x62E6;&#x622A;&#x6389;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x722C;&#x866B;&#x5F00;&#x53D1;&#x8005;</li></ul><h1 id="articleHeader1">&#x5236;&#x5B9A;&#x51FA;<strong>Web &#x7AEF;&#x53CD;&#x722C;&#x6280;&#x672F;&#x65B9;&#x6848;</strong></h1><p>&#x672C;&#x4EBA;&#x4ECE;&#x8FD9;2&#x4E2A;&#x89D2;&#x5EA6;&#xFF08;&#x7F51;&#x9875;&#x6240;&#x89C1;&#x975E;&#x6240;&#x5F97;&#x3001;&#x67E5;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x6CA1;&#x7528;&#xFF09;&#x51FA;&#x53D1;&#xFF0C;&#x5236;&#x5B9A;&#x4E86;&#x4E0B;&#x9762;&#x7684;&#x53CD;&#x722C;&#x65B9;&#x6848;&#x3002;</p><ul><li>&#x4F7F;&#x7528;HTTPS &#x534F;&#x8BAE;</li><li>&#x5355;&#x4F4D;&#x65F6;&#x95F4;&#x5185;&#x9650;&#x5236;&#x6389;&#x8BF7;&#x6C42;&#x6B21;&#x6570;&#x8FC7;&#x591A;&#xFF0C;&#x5219;&#x5C01;&#x9501;&#x8BE5;&#x8D26;&#x53F7;</li><li>&#x524D;&#x7AEF;&#x6280;&#x672F;&#x9650;&#x5236; &#xFF08;&#x63A5;&#x4E0B;&#x6765;&#x662F;&#x6838;&#x5FC3;&#x6280;&#x672F;&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x6BD4;&#x5982;&#x9700;&#x8981;&#x6B63;&#x786E;&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;&#x4E3A;&#x201C;19950220&#x201D;

1. &#x5148;&#x6309;&#x7167;&#x81EA;&#x5DF1;&#x9700;&#x6C42;&#x5229;&#x7528;&#x76F8;&#x5E94;&#x7684;&#x89C4;&#x5219;&#xFF08;&#x6570;&#x5B57;&#x4E71;&#x5E8F;&#x6620;&#x5C04;&#xFF0C;&#x6BD4;&#x5982;&#x6B63;&#x5E38;&#x7684;0&#x5BF9;&#x5E94;&#x8FD8;&#x662F;0&#xFF0C;&#x4F46;&#x662F;&#x4E71;&#x5E8F;&#x5C31;&#x662F; 0 &lt;-&gt; 1&#xFF0C;1 &lt;-&gt; 9,3 &lt;-&gt; 8,...&#xFF09;&#x5236;&#x4F5C;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x4F53;&#xFF08;ttf&#xFF09;
2. &#x6839;&#x636E;&#x4E0A;&#x9762;&#x7684;&#x4E71;&#x5E8F;&#x6620;&#x5C04;&#x89C4;&#x5F8B;&#xFF0C;&#x6C42;&#x5F97;&#x5230;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E; 19950220 -&gt; 17730220
3. &#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x6B65;&#x5F97;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4F9D;&#x6B21;&#x904D;&#x5386;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#xFF0C;&#x5C06;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x6839;&#x636E;&#x6309;&#x7167;&#x7EBF;&#x6027;&#x53D8;&#x6362;&#xFF08;y=kx+b&#xFF09;&#x3002;&#x7EBF;&#x6027;&#x65B9;&#x7A0B;&#x7684;&#x7CFB;&#x6570;&#x548C;&#x5E38;&#x6570;&#x9879;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x7684;&#x65E5;&#x671F;&#x8BA1;&#x7B97;&#x5F97;&#x5230;&#x7684;&#x3002;&#x6BD4;&#x5982;&#x5F53;&#x524D;&#x7684;&#x65E5;&#x671F;&#x4E3A;&#x201C;2018-07-24&#x201D;&#xFF0C;&#x90A3;&#x4E48;&#x7EBF;&#x6027;&#x53D8;&#x6362;&#x7684; k &#x4E3A; 7&#xFF0C;b &#x4E3A; 24&#x3002;
4. &#x7136;&#x540E;&#x5C06;&#x53D8;&#x6362;&#x540E;&#x7684;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7528;&#x201C;3.1415926&#x201D;&#x62FC;&#x63A5;&#x8FD4;&#x56DE;&#x7ED9;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#x8005;&#x3002;(&#x4E3A;&#x4EC0;&#x4E48;&#x662F;3.1415926&#xFF0C;&#x56E0;&#x4E3A;&#x5BF9;&#x6570;&#x5B57;&#x4F2A;&#x9020;&#x53CD;&#x722C;&#xFF0C;&#x6240;&#x4EE5;&#x62FC;&#x63A5;&#x7684;&#x6587;&#x672C;&#x80AF;&#x5B9A;&#x662F;&#x6570;&#x5B57;&#x7684;&#x8BDD;&#x4E0D;&#x592A;&#x4F1A;&#x5F15;&#x8D77;&#x7814;&#x7A76;&#x8005;&#x7684;&#x6CE8;&#x610F;&#xFF0C;&#x4F46;&#x662F;&#x6570;&#x5B57;&#x957F;&#x5EA6;&#x592A;&#x77ED;&#x4F1A;&#x8BEF;&#x4F24;&#x6B63;&#x5E38;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6240;&#x4EE5;&#x7528;&#x6240;&#x719F;&#x6089;&#x7684; &#x3A0;)

&#x200B;```
1773 -&gt; &#x201C;1*7+24&#x201D; + &#x201C;3.1415926&#x201D; + &#x201C;7*7+24&#x201D; + &#x201C;3.1415926&#x201D; + &#x201C;7*7+24&#x201D; + &#x201C;3.1415926&#x201D; + &#x201C;3*7+24&#x201D; -&gt; 313.1415926733.1415926733.141592645
02 -&gt; &quot;0*7+24&quot; + &quot;3.1415926&quot; + &quot;2*7+24&quot; -&gt; 243.141592638
20 -&gt; &quot;2*7+24&quot; + &quot;3.1415926&quot; + &quot;0*7+24&quot; -&gt; 383.141592624
&#x200B;```

# &#x524D;&#x7AEF;&#x62FF;&#x5230;&#x6570;&#x636E;&#x540E;&#x518D;&#x89E3;&#x5BC6;&#xFF0C;&#x89E3;&#x5BC6;&#x540E;&#x6839;&#x636E;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5B57;&#x4F53; Render &#x9875;&#x9762;
1. &#x5148;&#x5C06;&#x62FF;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6309;&#x7167;&#x201C;3.1415926&#x201D;&#x62C6;&#x5206;&#x4E3A;&#x6570;&#x7EC4;
2. &#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;1&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x6309;&#x7167;&#x201C;&#x7EBF;&#x6027;&#x53D8;&#x6362;&#x201D;&#xFF08;y=kx+b&#xFF0C;k&#x548C;b&#x540C;&#x6837;&#x6309;&#x7167;&#x5F53;&#x524D;&#x7684;&#x65E5;&#x671F;&#x6C42;&#x89E3;&#x5F97;&#x5230;&#xFF09;&#xFF0C;&#x9006;&#x5411;&#x6C42;&#x89E3;&#x5230;&#x539F;&#x672C;&#x7684;&#x503C;&#x3002;
3. &#x5C06;&#x6B65;&#x9AA4;2&#x7684;&#x7684;&#x5230;&#x7684;&#x6570;&#x636E;&#x4F9D;&#x6B21;&#x62FC;&#x63A5;&#xFF0C;&#x518D;&#x6839;&#x636E; ttf &#x6587;&#x4EF6; Render &#x9875;&#x9762;&#x4E0A;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="markdown hljs"><code class="markdown"><span class="hljs-section"># &#x6BD4;&#x5982;&#x9700;&#x8981;&#x6B63;&#x786E;&#x663E;&#x793A;&#x7684;&#x6570;&#x636E;&#x4E3A;&#x201C;19950220&#x201D;</span>

<span class="hljs-bullet">1. </span>&#x5148;&#x6309;&#x7167;&#x81EA;&#x5DF1;&#x9700;&#x6C42;&#x5229;&#x7528;&#x76F8;&#x5E94;&#x7684;&#x89C4;&#x5219;&#xFF08;&#x6570;&#x5B57;&#x4E71;&#x5E8F;&#x6620;&#x5C04;&#xFF0C;&#x6BD4;&#x5982;&#x6B63;&#x5E38;&#x7684;0&#x5BF9;&#x5E94;&#x8FD8;&#x662F;0&#xFF0C;&#x4F46;&#x662F;&#x4E71;&#x5E8F;&#x5C31;&#x662F; 0 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">-</span>&gt;</span></span> 1&#xFF0C;1 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">-</span>&gt;</span></span> 9,3 <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">-</span>&gt;</span></span> 8,...&#xFF09;&#x5236;&#x4F5C;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x4F53;&#xFF08;ttf&#xFF09;
<span class="hljs-bullet">2. </span>&#x6839;&#x636E;&#x4E0A;&#x9762;&#x7684;&#x4E71;&#x5E8F;&#x6620;&#x5C04;&#x89C4;&#x5F8B;&#xFF0C;&#x6C42;&#x5F97;&#x5230;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E; 19950220 -&gt; 17730220
<span class="hljs-bullet">3. </span>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E00;&#x6B65;&#x5F97;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x4F9D;&#x6B21;&#x904D;&#x5386;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#xFF0C;&#x5C06;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x6839;&#x636E;&#x6309;&#x7167;&#x7EBF;&#x6027;&#x53D8;&#x6362;&#xFF08;y=kx+b&#xFF09;&#x3002;&#x7EBF;&#x6027;&#x65B9;&#x7A0B;&#x7684;&#x7CFB;&#x6570;&#x548C;&#x5E38;&#x6570;&#x9879;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x7684;&#x65E5;&#x671F;&#x8BA1;&#x7B97;&#x5F97;&#x5230;&#x7684;&#x3002;&#x6BD4;&#x5982;&#x5F53;&#x524D;&#x7684;&#x65E5;&#x671F;&#x4E3A;&#x201C;2018-07-24&#x201D;&#xFF0C;&#x90A3;&#x4E48;&#x7EBF;&#x6027;&#x53D8;&#x6362;&#x7684; k &#x4E3A; 7&#xFF0C;b &#x4E3A; 24&#x3002;
<span class="hljs-bullet">4. </span>&#x7136;&#x540E;&#x5C06;&#x53D8;&#x6362;&#x540E;&#x7684;&#x6BCF;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7528;&#x201C;3.1415926&#x201D;&#x62FC;&#x63A5;&#x8FD4;&#x56DE;&#x7ED9;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#x8005;&#x3002;(&#x4E3A;&#x4EC0;&#x4E48;&#x662F;3.1415926&#xFF0C;&#x56E0;&#x4E3A;&#x5BF9;&#x6570;&#x5B57;&#x4F2A;&#x9020;&#x53CD;&#x722C;&#xFF0C;&#x6240;&#x4EE5;&#x62FC;&#x63A5;&#x7684;&#x6587;&#x672C;&#x80AF;&#x5B9A;&#x662F;&#x6570;&#x5B57;&#x7684;&#x8BDD;&#x4E0D;&#x592A;&#x4F1A;&#x5F15;&#x8D77;&#x7814;&#x7A76;&#x8005;&#x7684;&#x6CE8;&#x610F;&#xFF0C;&#x4F46;&#x662F;&#x6570;&#x5B57;&#x957F;&#x5EA6;&#x592A;&#x77ED;&#x4F1A;&#x8BEF;&#x4F24;&#x6B63;&#x5E38;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x6240;&#x4EE5;&#x7528;&#x6240;&#x719F;&#x6089;&#x7684; &#x3A0;)

&#x200B;<span class="hljs-code">```
1773 -&gt; &#x201C;1*7+24&#x201D; + &#x201C;3.1415926&#x201D; + &#x201C;7*7+24&#x201D; + &#x201C;3.1415926&#x201D; + &#x201C;7*7+24&#x201D; + &#x201C;3.1415926&#x201D; + &#x201C;3*7+24&#x201D; -&gt; 313.1415926733.1415926733.141592645
02 -&gt; &quot;0*7+24&quot; + &quot;3.1415926&quot; + &quot;2*7+24&quot; -&gt; 243.141592638
20 -&gt; &quot;2*7+24&quot; + &quot;3.1415926&quot; + &quot;0*7+24&quot; -&gt; 383.141592624
&#x200B;```

# &#x524D;&#x7AEF;&#x62FF;&#x5230;&#x6570;&#x636E;&#x540E;&#x518D;&#x89E3;&#x5BC6;&#xFF0C;&#x89E3;&#x5BC6;&#x540E;&#x6839;&#x636E;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5B57;&#x4F53; Render &#x9875;&#x9762;
1. &#x5148;&#x5C06;&#x62FF;&#x5230;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x6309;&#x7167;&#x201C;3.1415926&#x201D;&#x62C6;&#x5206;&#x4E3A;&#x6570;&#x7EC4;
2. &#x5BF9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;1&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x6309;&#x7167;&#x201C;&#x7EBF;&#x6027;&#x53D8;&#x6362;&#x201D;&#xFF08;y=kx+b&#xFF0C;k&#x548C;b&#x540C;&#x6837;&#x6309;&#x7167;&#x5F53;&#x524D;&#x7684;&#x65E5;&#x671F;&#x6C42;&#x89E3;&#x5F97;&#x5230;&#xFF09;&#xFF0C;&#x9006;&#x5411;&#x6C42;&#x89E3;&#x5230;&#x539F;&#x672C;&#x7684;&#x503C;&#x3002;
3. &#x5C06;&#x6B65;&#x9AA4;2&#x7684;&#x7684;&#x5230;&#x7684;&#x6570;&#x636E;&#x4F9D;&#x6B21;&#x62FC;&#x63A5;&#xFF0C;&#x518D;&#x6839;&#x636E; ttf &#x6587;&#x4EF6; Render &#x9875;&#x9762;&#x4E0A;&#x3002;</span></code></pre><ul><li>&#x540E;&#x7AEF;&#x9700;&#x8981;&#x6839;&#x636E;&#x4E0A;&#x4E00;&#x6B65;&#x8BBE;&#x8BA1;&#x7684;&#x534F;&#x8BAE;&#x5C06;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x52A0;&#x5BC6;&#x5904;&#x7406;</li></ul><p>&#x4E0B;&#x9762;&#x4EE5; <strong>Node.js</strong> &#x4E3A;&#x4F8B;&#x8BB2;&#x89E3;&#x540E;&#x7AEF;&#x9700;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;</p><ul><li>&#x9996;&#x5148;&#x540E;&#x7AEF;&#x8BBE;&#x7F6E;&#x63A5;&#x53E3;&#x8DEF;&#x7531;</li><li>&#x83B7;&#x53D6;&#x8DEF;&#x7531;&#x540E;&#x9762;&#x7684;&#x53C2;&#x6570;</li><li>&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x9700;&#x8981;&#x6839;&#x636E; SQL &#x8BED;&#x53E5;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;&#x3002;&#x5982;&#x679C;&#x662F;&#x6570;&#x5B57;&#x90E8;&#x5206;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x6309;&#x7167;&#x4E0A;&#x9762;&#x7EA6;&#x5B9A;&#x7684;&#x65B9;&#x6CD5;&#x52A0;&#x4EE5;&#x8F6C;&#x6362;&#x3002;</li><li><p>&#x5C06;&#x751F;&#x6210;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x6210; JSON &#x8FD4;&#x56DE;&#x7ED9;&#x8C03;&#x7528;&#x8005;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// json
var JoinOparatorSymbol = &quot;3.1415926&quot;;
function encode(rawData, ruleType) {
  if (!isNotEmptyStr(rawData)) {
    return &quot;&quot;;
  }
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var encodeData = &quot;&quot;;
  for (var index = 0; index &lt; rawData.length; index++) {
    var datacomponent = rawData[index];
    if (!isNaN(datacomponent)) {
      if (ruleType &lt; 3) {
        var currentNumber = rawDataMap(String(datacomponent), ruleType);
        encodeData += (currentNumber * month + day) + JoinOparatorSymbol;
      }
      else if (ruleType == 4) {
        encodeData += rawDataMap(String(datacomponent), ruleType);
      }
      else {
        encodeData += rawDataMap(String(datacomponent), ruleType) + JoinOparatorSymbol;
      }
    }
    else if (ruleType == 4) {
      encodeData += rawDataMap(String(datacomponent), ruleType);
    }

  }
  if (encodeData.length &gt;= JoinOparatorSymbol.length) {
    var lastTwoString = encodeData.substring(encodeData.length - JoinOparatorSymbol.length, encodeData.length);
    if (lastTwoString == JoinOparatorSymbol) {
      encodeData = encodeData.substring(0, encodeData.length - JoinOparatorSymbol.length);
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// json</span>
<span class="hljs-keyword">var</span> JoinOparatorSymbol = <span class="hljs-string">&quot;3.1415926&quot;</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">encode</span>(<span class="hljs-params">rawData, ruleType</span>) </span>{
  <span class="hljs-keyword">if</span> (!isNotEmptyStr(rawData)) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>;
  }
  <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  <span class="hljs-keyword">var</span> year = date.getFullYear();
  <span class="hljs-keyword">var</span> month = date.getMonth() + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">var</span> day = date.getDate();

  <span class="hljs-keyword">var</span> encodeData = <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; rawData.length; index++) {
    <span class="hljs-keyword">var</span> datacomponent = rawData[index];
    <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(datacomponent)) {
      <span class="hljs-keyword">if</span> (ruleType &lt; <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">var</span> currentNumber = rawDataMap(<span class="hljs-built_in">String</span>(datacomponent), ruleType);
        encodeData += (currentNumber * month + day) + JoinOparatorSymbol;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ruleType == <span class="hljs-number">4</span>) {
        encodeData += rawDataMap(<span class="hljs-built_in">String</span>(datacomponent), ruleType);
      }
      <span class="hljs-keyword">else</span> {
        encodeData += rawDataMap(<span class="hljs-built_in">String</span>(datacomponent), ruleType) + JoinOparatorSymbol;
      }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ruleType == <span class="hljs-number">4</span>) {
      encodeData += rawDataMap(<span class="hljs-built_in">String</span>(datacomponent), ruleType);
    }

  }
  <span class="hljs-keyword">if</span> (encodeData.length &gt;= JoinOparatorSymbol.length) {
    <span class="hljs-keyword">var</span> lastTwoString = encodeData.substring(encodeData.length - JoinOparatorSymbol.length, encodeData.length);
    <span class="hljs-keyword">if</span> (lastTwoString == JoinOparatorSymbol) {
      encodeData = encodeData.substring(<span class="hljs-number">0</span>, encodeData.length - JoinOparatorSymbol.length);
    }
  }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B57;&#x4F53;&#x6620;&#x5C04;&#x5904;&#x7406;
function rawDataMap(rawData, ruleType) {

  if (!isNotEmptyStr(rawData) || !isNotEmptyStr(ruleType)) {
    return;
  }
  var mapData;
  var rawNumber = parseInt(rawData);
  var ruleTypeNumber = parseInt(ruleType);
  if (!isNaN(rawData)) {
    lastNumberCategory = ruleTypeNumber;
    //&#x5B57;&#x4F53;&#x6587;&#x4EF6;1&#x4E0B;&#x7684;&#x6570;&#x636E;&#x52A0;&#x5BC6;&#x89C4;&#x5219;
    if (ruleTypeNumber == 1) {
      if (rawNumber == 1) {
        mapData = 1;
      }
      else if (rawNumber == 2) {
        mapData = 2;
      }
      else if (rawNumber == 3) {
        mapData = 4;
      }
      else if (rawNumber == 4) {
        mapData = 5;
      }
      else if (rawNumber == 5) {
        mapData = 3;
      }
      else if (rawNumber == 6) {
        mapData = 8;
      }
      else if (rawNumber == 7) {
        mapData = 6;
      }
      else if (rawNumber == 8) {
        mapData = 9;
      }
      else if (rawNumber == 9) {
        mapData = 7;
      }
      else if (rawNumber == 0) {
        mapData = 0;
      }
    }
    //&#x5B57;&#x4F53;&#x6587;&#x4EF6;2&#x4E0B;&#x7684;&#x6570;&#x636E;&#x52A0;&#x5BC6;&#x89C4;&#x5219;
    else if (ruleTypeNumber == 0) {

      if (rawNumber == 1) {
        mapData = 4;
      }
      else if (rawNumber == 2) {
        mapData = 2;
      }
      else if (rawNumber == 3) {
        mapData = 3;
      }
      else if (rawNumber == 4) {
        mapData = 1;
      }
      else if (rawNumber == 5) {
        mapData = 8;
      }
      else if (rawNumber == 6) {
        mapData = 5;
      }
      else if (rawNumber == 7) {
        mapData = 6;
      }
      else if (rawNumber == 8) {
        mapData = 7;
      }
      else if (rawNumber == 9) {
        mapData = 9;
      }
      else if (rawNumber == 0) {
        mapData = 0;
      }
    }
    //&#x5B57;&#x4F53;&#x6587;&#x4EF6;3&#x4E0B;&#x7684;&#x6570;&#x636E;&#x52A0;&#x5BC6;&#x89C4;&#x5219;
    else if (ruleTypeNumber == 2) {

      if (rawNumber == 1) {
        mapData = 6;
      }
      else if (rawNumber == 2) {
        mapData = 2;
      }
      else if (rawNumber == 3) {
        mapData = 1;
      }
      else if (rawNumber == 4) {
        mapData = 3;
      }
      else if (rawNumber == 5) {
        mapData = 4;
      }
      else if (rawNumber == 6) {
        mapData = 8;
      }
      else if (rawNumber == 7) {
        mapData = 3;
      }
      else if (rawNumber == 8) {
        mapData = 7;
      }
      else if (rawNumber == 9) {
        mapData = 9;
      }
      else if (rawNumber == 0) {
        mapData = 0;
      }
    }
    else if (ruleTypeNumber == 3) {

      if (rawNumber == 1) {
        mapData = &quot;&amp;#xefab;&quot;;
      }
      else if (rawNumber == 2) {
        mapData = &quot;&amp;#xeba3;&quot;;
      }
      else if (rawNumber == 3) {
        mapData = &quot;&amp;#xecfa;&quot;;
      }
      else if (rawNumber == 4) {
        mapData = &quot;&amp;#xedfd;&quot;;
      }
      else if (rawNumber == 5) {
        mapData = &quot;&amp;#xeffa;&quot;;
      }
      else if (rawNumber == 6) {
        mapData = &quot;&amp;#xef3a;&quot;;
      }
      else if (rawNumber == 7) {
        mapData = &quot;&amp;#xe6f5;&quot;;
      }
      else if (rawNumber == 8) {
        mapData = &quot;&amp;#xecb2;&quot;;
      }
      else if (rawNumber == 9) {
        mapData = &quot;&amp;#xe8ae;&quot;;
      }
      else if (rawNumber == 0) {
        mapData = &quot;&amp;#xe1f2;&quot;;
      }
    }
    else{
      mapData = rawNumber;
    }
  } else if (ruleTypeNumber == 4) {
    var sources = [&quot;&#x5E74;&quot;, &quot;&#x4E07;&quot;, &quot;&#x4E1A;&quot;, &quot;&#x4EBA;&quot;, &quot;&#x4FE1;&quot;, &quot;&#x5143;&quot;, &quot;&#x5343;&quot;, &quot;&#x53F8;&quot;, &quot;&#x5DDE;&quot;, &quot;&#x8D44;&quot;, &quot;&#x9020;&quot;, &quot;&#x94B1;&quot;];
    //&#x5224;&#x65AD;&#x5B57;&#x7B26;&#x4E32;&#x4E3A;&#x6C49;&#x5B57;
    if (/^[\u4e00-\u9fa5]*$/.test(rawData)) {

      if (sources.indexOf(rawData) &gt; -1) {
        var currentChineseHexcod = rawData.charCodeAt(0).toString(16);
        var lastCompoent;
        var mapComponetnt;
        var numbers = [&quot;0&quot;, &quot;1&quot;, &quot;2&quot;, &quot;3&quot;, &quot;4&quot;, &quot;5&quot;, &quot;6&quot;, &quot;7&quot;, &quot;8&quot;, &quot;9&quot;];
        var characters = [&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;, &quot;e&quot;, &quot;f&quot;, &quot;g&quot;, &quot;h&quot;, &quot;h&quot;, &quot;i&quot;, &quot;j&quot;, &quot;k&quot;, &quot;l&quot;, &quot;m&quot;, &quot;n&quot;, &quot;o&quot;, &quot;p&quot;, &quot;q&quot;, &quot;r&quot;, &quot;s&quot;, &quot;t&quot;, &quot;u&quot;, &quot;v&quot;, &quot;w&quot;, &quot;x&quot;, &quot;y&quot;, &quot;z&quot;];

        if (currentChineseHexcod.length == 4) {
          lastCompoent = currentChineseHexcod.substr(3, 1);
          var locationInComponents = 0;
          if (/[0-9]/.test(lastCompoent)) {
            locationInComponents = numbers.indexOf(lastCompoent);
            mapComponetnt = numbers[(locationInComponents + 1) % 10];
          }
          else if (/[a-z]/.test(lastCompoent)) {
            locationInComponents = characters.indexOf(lastCompoent);
            mapComponetnt = characters[(locationInComponents + 1) % 26];
          }
          mapData = &quot;&amp;#x&quot; + currentChineseHexcod.substr(0, 3) + mapComponetnt + &quot;;&quot;;
        }
      } else {
        mapData = rawData;
      }

    }
    else if (/[0-9]/.test(rawData)) {
      mapData = rawDataMap(rawData, 2);
    }
    else {
      mapData = rawData;
    }

  }
  return mapData;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x5B57;&#x4F53;&#x6620;&#x5C04;&#x5904;&#x7406;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">rawDataMap</span>(<span class="hljs-params">rawData, ruleType</span>) </span>{

  <span class="hljs-keyword">if</span> (!isNotEmptyStr(rawData) || !isNotEmptyStr(ruleType)) {
    <span class="hljs-keyword">return</span>;
  }
  <span class="hljs-keyword">var</span> mapData;
  <span class="hljs-keyword">var</span> rawNumber = <span class="hljs-built_in">parseInt</span>(rawData);
  <span class="hljs-keyword">var</span> ruleTypeNumber = <span class="hljs-built_in">parseInt</span>(ruleType);
  <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(rawData)) {
    lastNumberCategory = ruleTypeNumber;
    <span class="hljs-comment">//&#x5B57;&#x4F53;&#x6587;&#x4EF6;1&#x4E0B;&#x7684;&#x6570;&#x636E;&#x52A0;&#x5BC6;&#x89C4;&#x5219;</span>
    <span class="hljs-keyword">if</span> (ruleTypeNumber == <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">1</span>) {
        mapData = <span class="hljs-number">1</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">2</span>) {
        mapData = <span class="hljs-number">2</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">3</span>) {
        mapData = <span class="hljs-number">4</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">4</span>) {
        mapData = <span class="hljs-number">5</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">5</span>) {
        mapData = <span class="hljs-number">3</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">6</span>) {
        mapData = <span class="hljs-number">8</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">7</span>) {
        mapData = <span class="hljs-number">6</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">8</span>) {
        mapData = <span class="hljs-number">9</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">9</span>) {
        mapData = <span class="hljs-number">7</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">0</span>) {
        mapData = <span class="hljs-number">0</span>;
      }
    }
    <span class="hljs-comment">//&#x5B57;&#x4F53;&#x6587;&#x4EF6;2&#x4E0B;&#x7684;&#x6570;&#x636E;&#x52A0;&#x5BC6;&#x89C4;&#x5219;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ruleTypeNumber == <span class="hljs-number">0</span>) {

      <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">1</span>) {
        mapData = <span class="hljs-number">4</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">2</span>) {
        mapData = <span class="hljs-number">2</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">3</span>) {
        mapData = <span class="hljs-number">3</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">4</span>) {
        mapData = <span class="hljs-number">1</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">5</span>) {
        mapData = <span class="hljs-number">8</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">6</span>) {
        mapData = <span class="hljs-number">5</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">7</span>) {
        mapData = <span class="hljs-number">6</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">8</span>) {
        mapData = <span class="hljs-number">7</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">9</span>) {
        mapData = <span class="hljs-number">9</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">0</span>) {
        mapData = <span class="hljs-number">0</span>;
      }
    }
    <span class="hljs-comment">//&#x5B57;&#x4F53;&#x6587;&#x4EF6;3&#x4E0B;&#x7684;&#x6570;&#x636E;&#x52A0;&#x5BC6;&#x89C4;&#x5219;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ruleTypeNumber == <span class="hljs-number">2</span>) {

      <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">1</span>) {
        mapData = <span class="hljs-number">6</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">2</span>) {
        mapData = <span class="hljs-number">2</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">3</span>) {
        mapData = <span class="hljs-number">1</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">4</span>) {
        mapData = <span class="hljs-number">3</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">5</span>) {
        mapData = <span class="hljs-number">4</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">6</span>) {
        mapData = <span class="hljs-number">8</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">7</span>) {
        mapData = <span class="hljs-number">3</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">8</span>) {
        mapData = <span class="hljs-number">7</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">9</span>) {
        mapData = <span class="hljs-number">9</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">0</span>) {
        mapData = <span class="hljs-number">0</span>;
      }
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ruleTypeNumber == <span class="hljs-number">3</span>) {

      <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">1</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xefab;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">2</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xeba3;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">3</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xecfa;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">4</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xedfd;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">5</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xeffa;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">6</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xef3a;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">7</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xe6f5;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">8</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xecb2;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">9</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xe8ae;&quot;</span>;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (rawNumber == <span class="hljs-number">0</span>) {
        mapData = <span class="hljs-string">&quot;&amp;#xe1f2;&quot;</span>;
      }
    }
    <span class="hljs-keyword">else</span>{
      mapData = rawNumber;
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (ruleTypeNumber == <span class="hljs-number">4</span>) {
    <span class="hljs-keyword">var</span> sources = [<span class="hljs-string">&quot;&#x5E74;&quot;</span>, <span class="hljs-string">&quot;&#x4E07;&quot;</span>, <span class="hljs-string">&quot;&#x4E1A;&quot;</span>, <span class="hljs-string">&quot;&#x4EBA;&quot;</span>, <span class="hljs-string">&quot;&#x4FE1;&quot;</span>, <span class="hljs-string">&quot;&#x5143;&quot;</span>, <span class="hljs-string">&quot;&#x5343;&quot;</span>, <span class="hljs-string">&quot;&#x53F8;&quot;</span>, <span class="hljs-string">&quot;&#x5DDE;&quot;</span>, <span class="hljs-string">&quot;&#x8D44;&quot;</span>, <span class="hljs-string">&quot;&#x9020;&quot;</span>, <span class="hljs-string">&quot;&#x94B1;&quot;</span>];
    <span class="hljs-comment">//&#x5224;&#x65AD;&#x5B57;&#x7B26;&#x4E32;&#x4E3A;&#x6C49;&#x5B57;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^[\u4e00-\u9fa5]*$/</span>.test(rawData)) {

      <span class="hljs-keyword">if</span> (sources.indexOf(rawData) &gt; <span class="hljs-number">-1</span>) {
        <span class="hljs-keyword">var</span> currentChineseHexcod = rawData.charCodeAt(<span class="hljs-number">0</span>).toString(<span class="hljs-number">16</span>);
        <span class="hljs-keyword">var</span> lastCompoent;
        <span class="hljs-keyword">var</span> mapComponetnt;
        <span class="hljs-keyword">var</span> numbers = [<span class="hljs-string">&quot;0&quot;</span>, <span class="hljs-string">&quot;1&quot;</span>, <span class="hljs-string">&quot;2&quot;</span>, <span class="hljs-string">&quot;3&quot;</span>, <span class="hljs-string">&quot;4&quot;</span>, <span class="hljs-string">&quot;5&quot;</span>, <span class="hljs-string">&quot;6&quot;</span>, <span class="hljs-string">&quot;7&quot;</span>, <span class="hljs-string">&quot;8&quot;</span>, <span class="hljs-string">&quot;9&quot;</span>];
        <span class="hljs-keyword">var</span> characters = [<span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>, <span class="hljs-string">&quot;d&quot;</span>, <span class="hljs-string">&quot;e&quot;</span>, <span class="hljs-string">&quot;f&quot;</span>, <span class="hljs-string">&quot;g&quot;</span>, <span class="hljs-string">&quot;h&quot;</span>, <span class="hljs-string">&quot;h&quot;</span>, <span class="hljs-string">&quot;i&quot;</span>, <span class="hljs-string">&quot;j&quot;</span>, <span class="hljs-string">&quot;k&quot;</span>, <span class="hljs-string">&quot;l&quot;</span>, <span class="hljs-string">&quot;m&quot;</span>, <span class="hljs-string">&quot;n&quot;</span>, <span class="hljs-string">&quot;o&quot;</span>, <span class="hljs-string">&quot;p&quot;</span>, <span class="hljs-string">&quot;q&quot;</span>, <span class="hljs-string">&quot;r&quot;</span>, <span class="hljs-string">&quot;s&quot;</span>, <span class="hljs-string">&quot;t&quot;</span>, <span class="hljs-string">&quot;u&quot;</span>, <span class="hljs-string">&quot;v&quot;</span>, <span class="hljs-string">&quot;w&quot;</span>, <span class="hljs-string">&quot;x&quot;</span>, <span class="hljs-string">&quot;y&quot;</span>, <span class="hljs-string">&quot;z&quot;</span>];

        <span class="hljs-keyword">if</span> (currentChineseHexcod.length == <span class="hljs-number">4</span>) {
          lastCompoent = currentChineseHexcod.substr(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>);
          <span class="hljs-keyword">var</span> locationInComponents = <span class="hljs-number">0</span>;
          <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/[0-9]/</span>.test(lastCompoent)) {
            locationInComponents = numbers.indexOf(lastCompoent);
            mapComponetnt = numbers[(locationInComponents + <span class="hljs-number">1</span>) % <span class="hljs-number">10</span>];
          }
          <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/[a-z]/</span>.test(lastCompoent)) {
            locationInComponents = characters.indexOf(lastCompoent);
            mapComponetnt = characters[(locationInComponents + <span class="hljs-number">1</span>) % <span class="hljs-number">26</span>];
          }
          mapData = <span class="hljs-string">&quot;&amp;#x&quot;</span> + currentChineseHexcod.substr(<span class="hljs-number">0</span>, <span class="hljs-number">3</span>) + mapComponetnt + <span class="hljs-string">&quot;;&quot;</span>;
        }
      } <span class="hljs-keyword">else</span> {
        mapData = rawData;
      }

    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/[0-9]/</span>.test(rawData)) {
      mapData = rawDataMap(rawData, <span class="hljs-number">2</span>);
    }
    <span class="hljs-keyword">else</span> {
      mapData = rawData;
    }

  }
  <span class="hljs-keyword">return</span> mapData;
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//api
module.exports = {
    &quot;GET /api/products&quot;: async (ctx, next) =&gt; {
        ctx.response.type = &quot;application/json&quot;;
        ctx.response.body = {
            products: products
        };
    },

    &quot;GET /api/solution1&quot;: async (ctx, next) =&gt; {

        try {
            var data = fs.readFileSync(pathname, &quot;utf-8&quot;);
            ruleJson = JSON.parse(data);
            rule = ruleJson.data.rule;
        } catch (error) {
            console.log(&quot;fail: &quot; + error);
        }

        var data = {
            code: 200,
            message: &quot;success&quot;,
            data: {
                name: &quot;@&#x676D;&#x57CE;&#x5C0F;&#x5218;&quot;,
                year: LBPEncode(&quot;1995&quot;, rule),
                month: LBPEncode(&quot;02&quot;, rule),
                day: LBPEncode(&quot;20&quot;, rule),
                analysis : rule
            }
        }

        ctx.set(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
        ctx.response.type = &quot;application/json&quot;;
        ctx.response.body = data;
    },


    &quot;GET /api/solution2&quot;: async (ctx, next) =&gt; {
        try {
            var data = fs.readFileSync(pathname, &quot;utf-8&quot;);
            ruleJson = JSON.parse(data);
            rule = ruleJson.data.rule;
        } catch (error) {
            console.log(&quot;fail: &quot; + error);
        }

        var data = {
            code: 200,
            message: &quot;success&quot;,
            data: {
                name: LBPEncode(&quot;&#x5EFA;&#x9020;&#x5E08;&quot;,rule),
                birthday: LBPEncode(&quot;1995&#x5E74;02&#x6708;20&#x65E5;&quot;,rule),
                company: LBPEncode(&quot;&#x4E2D;&#x5929;&#x516C;&#x53F8;&quot;,rule),
                address: LBPEncode(&quot;&#x6D59;&#x6C5F;&#x7701;&#x676D;&#x5DDE;&#x5E02;&#x62F1;&#x5885;&#x533A;&#x77F3;&#x7965;&#x8DEF;&quot;,rule),
                bidprice: LBPEncode(&quot;2&#x4E07;&#x5143;&quot;,rule),
                negative: LBPEncode(&quot;2018&#x5E74;&#x529E;&#x4E8B;&#x6548;&#x7387;&#x592A;&#x9AD8;&#x3001;&#x8D1F;&#x9762;&#x57FA;&#x672C;&#x6CA1;&#x6709;&quot;,rule),
                title: LBPEncode(&quot;&#x5EFA;&#x9020;&#x5E08;&quot;,rule),
                honor: LBPEncode(&quot;&#x6700;&#x4F73;&#x5956;&quot;,rule),
                analysis : rule
            }
        }
        ctx.set(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
        ctx.response.type = &quot;application/json&quot;;
        ctx.response.body = data;
    },

    &quot;POST /api/products&quot;: async (ctx, next) =&gt; {
        var p = {
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };
        products.push(p);
        ctx.response.type = &quot;application/json&quot;;
        ctx.response.body = p;
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//api</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-string">&quot;GET /api/products&quot;</span>: <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        ctx.response.type = <span class="hljs-string">&quot;application/json&quot;</span>;
        ctx.response.body = {
            <span class="hljs-attr">products</span>: products
        };
    },

    <span class="hljs-string">&quot;GET /api/solution1&quot;</span>: <span class="hljs-keyword">async</span> (ctx, next) =&gt; {

        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">var</span> data = fs.readFileSync(pathname, <span class="hljs-string">&quot;utf-8&quot;</span>);
            ruleJson = <span class="hljs-built_in">JSON</span>.parse(data);
            rule = ruleJson.data.rule;
        } <span class="hljs-keyword">catch</span> (error) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;fail: &quot;</span> + error);
        }

        <span class="hljs-keyword">var</span> data = {
            <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;success&quot;</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;@&#x676D;&#x57CE;&#x5C0F;&#x5218;&quot;</span>,
                <span class="hljs-attr">year</span>: LBPEncode(<span class="hljs-string">&quot;1995&quot;</span>, rule),
                <span class="hljs-attr">month</span>: LBPEncode(<span class="hljs-string">&quot;02&quot;</span>, rule),
                <span class="hljs-attr">day</span>: LBPEncode(<span class="hljs-string">&quot;20&quot;</span>, rule),
                <span class="hljs-attr">analysis</span> : rule
            }
        }

        ctx.set(<span class="hljs-string">&quot;Access-Control-Allow-Origin&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>);
        ctx.response.type = <span class="hljs-string">&quot;application/json&quot;</span>;
        ctx.response.body = data;
    },


    <span class="hljs-string">&quot;GET /api/solution2&quot;</span>: <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">var</span> data = fs.readFileSync(pathname, <span class="hljs-string">&quot;utf-8&quot;</span>);
            ruleJson = <span class="hljs-built_in">JSON</span>.parse(data);
            rule = ruleJson.data.rule;
        } <span class="hljs-keyword">catch</span> (error) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;fail: &quot;</span> + error);
        }

        <span class="hljs-keyword">var</span> data = {
            <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>,
            <span class="hljs-attr">message</span>: <span class="hljs-string">&quot;success&quot;</span>,
            <span class="hljs-attr">data</span>: {
                <span class="hljs-attr">name</span>: LBPEncode(<span class="hljs-string">&quot;&#x5EFA;&#x9020;&#x5E08;&quot;</span>,rule),
                <span class="hljs-attr">birthday</span>: LBPEncode(<span class="hljs-string">&quot;1995&#x5E74;02&#x6708;20&#x65E5;&quot;</span>,rule),
                <span class="hljs-attr">company</span>: LBPEncode(<span class="hljs-string">&quot;&#x4E2D;&#x5929;&#x516C;&#x53F8;&quot;</span>,rule),
                <span class="hljs-attr">address</span>: LBPEncode(<span class="hljs-string">&quot;&#x6D59;&#x6C5F;&#x7701;&#x676D;&#x5DDE;&#x5E02;&#x62F1;&#x5885;&#x533A;&#x77F3;&#x7965;&#x8DEF;&quot;</span>,rule),
                <span class="hljs-attr">bidprice</span>: LBPEncode(<span class="hljs-string">&quot;2&#x4E07;&#x5143;&quot;</span>,rule),
                <span class="hljs-attr">negative</span>: LBPEncode(<span class="hljs-string">&quot;2018&#x5E74;&#x529E;&#x4E8B;&#x6548;&#x7387;&#x592A;&#x9AD8;&#x3001;&#x8D1F;&#x9762;&#x57FA;&#x672C;&#x6CA1;&#x6709;&quot;</span>,rule),
                <span class="hljs-attr">title</span>: LBPEncode(<span class="hljs-string">&quot;&#x5EFA;&#x9020;&#x5E08;&quot;</span>,rule),
                <span class="hljs-attr">honor</span>: LBPEncode(<span class="hljs-string">&quot;&#x6700;&#x4F73;&#x5956;&quot;</span>,rule),
                <span class="hljs-attr">analysis</span> : rule
            }
        }
        ctx.set(<span class="hljs-string">&quot;Access-Control-Allow-Origin&quot;</span>, <span class="hljs-string">&quot;*&quot;</span>);
        ctx.response.type = <span class="hljs-string">&quot;application/json&quot;</span>;
        ctx.response.body = data;
    },

    <span class="hljs-string">&quot;POST /api/products&quot;</span>: <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">var</span> p = {
            <span class="hljs-attr">name</span>: ctx.request.body.name,
            <span class="hljs-attr">price</span>: ctx.request.body.price
        };
        products.push(p);
        ctx.response.type = <span class="hljs-string">&quot;application/json&quot;</span>;
        ctx.response.body = p;
    }
};</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x8DEF;&#x7531;
const fs = require(&quot;fs&quot;);

function addMapping(router, mapping){
    for(var url in mapping){
        if (url.startsWith(&quot;GET&quot;)) {
            var path = url.substring(4);
            router.get(path,mapping[url]);
            console.log(`Register URL mapping: GET: ${path}`);
        }else if (url.startsWith(&apos;POST &apos;)) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`Register URL mapping: POST ${path}`);
        } else if (url.startsWith(&apos;PUT &apos;)) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`Register URL mapping: PUT ${path}`);
        } else if (url.startsWith(&apos;DELETE &apos;)) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`Register URL mapping: DELETE ${path}`);
        } else {
            console.log(`Invalid URL: ${url}`);
        }

    }
}


function addControllers(router, dir){
    fs.readdirSync(__dirname + &quot;/&quot; + dir).filter( (f) =&gt; {
        return f.endsWith(&quot;.js&quot;);
    }).forEach( (f) =&gt; {
        console.log(`Process controllers:${f}...`);
        let mapping = require(__dirname + &quot;/&quot; + dir + &quot;/&quot; + f);
        addMapping(router,mapping);
    });
}

module.exports = function(dir){
    let controllers = dir || &quot;controller&quot;;
    let router = require(&quot;koa-router&quot;)();

    addControllers(router,controllers);
    return router.routes();
};

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x8DEF;&#x7531;</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;fs&quot;</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addMapping</span>(<span class="hljs-params">router, mapping</span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> url <span class="hljs-keyword">in</span> mapping){
        <span class="hljs-keyword">if</span> (url.startsWith(<span class="hljs-string">&quot;GET&quot;</span>)) {
            <span class="hljs-keyword">var</span> path = url.substring(<span class="hljs-number">4</span>);
            router.get(path,mapping[url]);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Register URL mapping: GET: <span class="hljs-subst">${path}</span>`</span>);
        }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (url.startsWith(<span class="hljs-string">&apos;POST &apos;</span>)) {
            <span class="hljs-keyword">var</span> path = url.substring(<span class="hljs-number">5</span>);
            router.post(path, mapping[url]);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Register URL mapping: POST <span class="hljs-subst">${path}</span>`</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (url.startsWith(<span class="hljs-string">&apos;PUT &apos;</span>)) {
            <span class="hljs-keyword">var</span> path = url.substring(<span class="hljs-number">4</span>);
            router.put(path, mapping[url]);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Register URL mapping: PUT <span class="hljs-subst">${path}</span>`</span>);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (url.startsWith(<span class="hljs-string">&apos;DELETE &apos;</span>)) {
            <span class="hljs-keyword">var</span> path = url.substring(<span class="hljs-number">7</span>);
            router.del(path, mapping[url]);
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Register URL mapping: DELETE <span class="hljs-subst">${path}</span>`</span>);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Invalid URL: <span class="hljs-subst">${url}</span>`</span>);
        }

    }
}


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addControllers</span>(<span class="hljs-params">router, dir</span>)</span>{
    fs.readdirSync(__dirname + <span class="hljs-string">&quot;/&quot;</span> + dir).filter( <span class="hljs-function">(<span class="hljs-params">f</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> f.endsWith(<span class="hljs-string">&quot;.js&quot;</span>);
    }).forEach( <span class="hljs-function">(<span class="hljs-params">f</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Process controllers:<span class="hljs-subst">${f}</span>...`</span>);
        <span class="hljs-keyword">let</span> mapping = <span class="hljs-built_in">require</span>(__dirname + <span class="hljs-string">&quot;/&quot;</span> + dir + <span class="hljs-string">&quot;/&quot;</span> + f);
        addMapping(router,mapping);
    });
}

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">dir</span>)</span>{
    <span class="hljs-keyword">let</span> controllers = dir || <span class="hljs-string">&quot;controller&quot;</span>;
    <span class="hljs-keyword">let</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;koa-router&quot;</span>)();

    addControllers(router,controllers);
    <span class="hljs-keyword">return</span> router.routes();
};

</code></pre></li><li><p>&#x524D;&#x7AEF;&#x6839;&#x636E;&#x670D;&#x52A1;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x9006;&#x5411;&#x89E3;&#x5BC6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;#year&quot;).html(getRawData(data.year,log));

// util.js
var JoinOparatorSymbol = &quot;3.1415926&quot;;
function isNotEmptyStr($str) {
  if (String($str) == &quot;&quot; || $str == undefined || $str == null || $str == &quot;null&quot;) {
    return false;
  }
  return true;
}

function getRawData($json,analisys) {
  $json = $json.toString();
  if (!isNotEmptyStr($json)) {
    return;
  }
  
  var date= new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var datacomponents = $json.split(JoinOparatorSymbol);
  var orginalMessage = &quot;&quot;;
  for(var index = 0;index &lt; datacomponents.length;index++){
    var datacomponent = datacomponents[index];
      if (!isNaN(datacomponent) &amp;&amp; analisys &lt; 3){
          var currentNumber = parseInt(datacomponent);
          orginalMessage += (currentNumber -  day)/month;
      }
      else if(analisys == 3){
         orginalMessage += datacomponent;
      }
      else{
        //&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#x5F85;&#x7EED;&#xFF0C;&#x672C; Demo &#x6839;&#x636E;&#x672C;&#x4EBA;&#x5728;&#x7814;&#x7A76;&#x53CD;&#x722C;&#x65B9;&#x9762;&#x7684;&#x6280;&#x672F;&#x5E76;&#x5B9E;&#x8DF5;&#x540E;&#x6301;&#x7EED;&#x66F4;&#x65B0;
      }
  }
  return orginalMessage;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">&quot;#year&quot;</span>).html(getRawData(data.year,log));

<span class="hljs-comment">// util.js</span>
<span class="hljs-keyword">var</span> JoinOparatorSymbol = <span class="hljs-string">&quot;3.1415926&quot;</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isNotEmptyStr</span>(<span class="hljs-params">$str</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">String</span>($str) == <span class="hljs-string">&quot;&quot;</span> || $str == <span class="hljs-literal">undefined</span> || $str == <span class="hljs-literal">null</span> || $str == <span class="hljs-string">&quot;null&quot;</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRawData</span>(<span class="hljs-params">$json,analisys</span>) </span>{
  $json = $json.toString();
  <span class="hljs-keyword">if</span> (!isNotEmptyStr($json)) {
    <span class="hljs-keyword">return</span>;
  }
  
  <span class="hljs-keyword">var</span> date= <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
  <span class="hljs-keyword">var</span> year = date.getFullYear();
  <span class="hljs-keyword">var</span> month = date.getMonth() + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">var</span> day = date.getDate();
  <span class="hljs-keyword">var</span> datacomponents = $json.split(JoinOparatorSymbol);
  <span class="hljs-keyword">var</span> orginalMessage = <span class="hljs-string">&quot;&quot;</span>;
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;index &lt; datacomponents.length;index++){
    <span class="hljs-keyword">var</span> datacomponent = datacomponents[index];
      <span class="hljs-keyword">if</span> (!<span class="hljs-built_in">isNaN</span>(datacomponent) &amp;&amp; analisys &lt; <span class="hljs-number">3</span>){
          <span class="hljs-keyword">var</span> currentNumber = <span class="hljs-built_in">parseInt</span>(datacomponent);
          orginalMessage += (currentNumber -  day)/month;
      }
      <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(analisys == <span class="hljs-number">3</span>){
         orginalMessage += datacomponent;
      }
      <span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#x5F85;&#x7EED;&#xFF0C;&#x672C; Demo &#x6839;&#x636E;&#x672C;&#x4EBA;&#x5728;&#x7814;&#x7A76;&#x53CD;&#x722C;&#x65B9;&#x9762;&#x7684;&#x6280;&#x672F;&#x5E76;&#x5B9E;&#x8DF5;&#x540E;&#x6301;&#x7EED;&#x66F4;&#x65B0;</span>
      }
  }
  <span class="hljs-keyword">return</span> orginalMessage;
}
</code></pre></li></ul><p>&#x6BD4;&#x5982;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x662F;323.14743.14743.1446&#xFF0C;&#x6839;&#x636E;&#x6211;&#x4EEC;&#x7EA6;&#x5B9A;&#x7684;&#x7B97;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x7684;&#x5230;&#x7ED3;&#x679C;&#x4E3A;1773</p><ul><li>&#x6839;&#x636E; ttf &#x6587;&#x4EF6; Render &#x9875;&#x9762;<br><span class="img-wrap"><img data-src="/img/remote/1460000015968892?w=1632&amp;h=1136" src="https://static.alili.tech/img/remote/1460000015968892?w=1632&amp;h=1136" alt="&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x4F53;&#x6587;&#x4EF6;" title="&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x4F53;&#x6587;&#x4EF6;" style="cursor:pointer"></span><br>&#x4E0A;&#x9762;&#x8BA1;&#x7B97;&#x7684;&#x5230;&#x7684;1773&#xFF0C;&#x7136;&#x540E;&#x6839;&#x636E;ttf&#x6587;&#x4EF6;&#xFF0C;&#x9875;&#x9762;&#x770B;&#x5230;&#x7684;&#x5C31;&#x662F;1995</li><li>&#x7136;&#x540E;&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x722C;&#x866B;&#x4EBA;&#x5458;&#x67E5;&#x770B; JS &#x7814;&#x7A76;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9; JS &#x7684;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x4E86;&#x52A0;&#x5BC6;&#x5904;&#x7406;&#x3002;&#x5982;&#x679C;&#x4F60;&#x7684;&#x6280;&#x672F;&#x6808;&#x662F; Vue &#x3001;React &#x7B49;&#xFF0C;webpack &#x4E3A;&#x4F60;&#x63D0;&#x4F9B;&#x4E86; JS &#x52A0;&#x5BC6;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x4E5F;&#x5F88;&#x65B9;&#x4FBF;&#x5904;&#x7406;<p><a href="http://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx" rel="nofollow noreferrer" target="_blank">JS&#x6DF7;&#x6DC6;&#x5DE5;&#x5177;</a></p></li><li>&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x8FD8;&#x4E0D;&#x662F;&#x5F88;&#x5B89;&#x5168;&#x3002;&#x4E8E;&#x662F;&#x60F3;&#x5230;&#x4E86;&#x5404;&#x79CD;&#x65B9;&#x6848;&#x7684;&#x7EC4;&#x5408;&#x62F3;&#x3002;&#x6BD4;&#x5982;</li></ul><h2 id="articleHeader2">&#x3000;&#x53CD;&#x722C;&#x5347;&#x7EA7;&#x7248;</h2><p>&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x7ECF;&#x9A8C;&#x4E30;&#x5BCC;&#x7684;&#x722C;&#x866B;&#x5F00;&#x53D1;&#x8005;&#x6765;&#x8BF4;&#xFF0C;&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x6848;&#x53EF;&#x80FD;&#x8FD8;&#x662F;&#x4F1A;&#x5B58;&#x5728;&#x88AB;&#x7834;&#x89E3;&#x7684;&#x53EF;&#x80FD;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x4E4B;&#x524D;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x505A;&#x4E86;&#x5347;&#x7EA7;&#x7248;&#x672C;</p><ol><li>&#x7EC4;&#x5408;&#x62F3;1: &#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x4E0D;&#x8981;&#x56FA;&#x5B9A;&#xFF0C;&#x867D;&#x7136;&#x8BF7;&#x6C42;&#x7684;&#x94FE;&#x63A5;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#xFF0C;&#x4F46;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x7684;&#x65F6;&#x95F4;&#x6233;&#x7684;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x6570;&#x5B57;&#x53D6;&#x6A21;&#xFF0C;&#x6BD4;&#x5982; Demo &#x4E2D;&#x5BF9;4&#x53D6;&#x6A21;&#xFF0C;&#x6709;4&#x79CD;&#x503C; 0&#x3001;1&#x3001;2&#x3001;3&#x3002;&#x8FD9;4&#x79CD;&#x503C;&#x5BF9;&#x5E94;&#x4E0D;&#x540C;&#x7684;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x722C;&#x866B;&#x7EDE;&#x5C3D;&#x8111;&#x6C41;&#x722C;&#x5230;1&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x7684;&#x5B57;&#x4F53;&#x65F6;&#xFF0C;&#x6CA1;&#x60F3;&#x5230;&#x518D;&#x6B21;&#x8BF7;&#x6C42;&#xFF0C;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x7684;&#x89C4;&#x5219;&#x53D8;&#x6389;&#x4E86; &#x1F602;</li><li>&#x7EC4;&#x5408;&#x62F3;2: &#x524D;&#x9762;&#x7684;&#x89C4;&#x5219;&#x662F;&#x5B57;&#x4F53;&#x95EE;&#x9898;&#x4E71;&#x5E8F;&#xFF0C;&#x4F46;&#x662F;&#x53EA;&#x662F;&#x6570;&#x5B57;&#x5339;&#x914D;&#x6253;&#x4E71;&#x6389;&#x3002;&#x6BD4;&#x5982; <strong>1</strong> -&gt; <strong>4</strong>, <strong>5</strong> -&gt; <strong>8</strong>&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x5957;&#x8DEF;&#x5C31;&#x662F;&#x6BCF;&#x4E2A;&#x6570;&#x5B57;&#x5BF9;&#x5E94;&#x4E00;&#x4E2A; <strong>unicode &#x7801;</strong> &#xFF0C;&#x7136;&#x540E;&#x5236;&#x4F5C;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x7684;&#x5B57;&#x4F53;&#xFF0C;&#x53EF;&#x4EE5;&#x662F; .ttf&#x3001;.woff &#x7B49;&#x7B49;&#x3002;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000015968893?w=961&amp;h=585" src="https://static.alili.tech/img/remote/1460000015968893?w=961&amp;h=585" alt="&#x7F51;&#x9875;&#x68C0;&#x5BDF;&#x5143;&#x7D20;&#x5F97;&#x5230;&#x7684;&#x6548;&#x679C;" title="&#x7F51;&#x9875;&#x68C0;&#x5BDF;&#x5143;&#x7D20;&#x5F97;&#x5230;&#x7684;&#x6548;&#x679C;" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015968894?w=462&amp;h=170" src="https://static.alili.tech/img/remote/1460000015968894?w=462&amp;h=170" alt="&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x6570;&#x636E;" title="&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x6570;&#x636E;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x51E0;&#x79CD;&#x7EC4;&#x5408;&#x62F3;&#x6253;&#x4E0B;&#x6765;&#x3002;&#x5BF9;&#x4E8E;&#x4E00;&#x822C;&#x7684;&#x722C;&#x866B;&#x5C31;&#x653E;&#x5F03;&#x4E86;&#x3002;</p><h2 id="articleHeader3">&#x53CD;&#x722C;&#x624B;&#x6BB5;&#x518D;&#x5347;&#x7EA7;</h2><p>&#x4E0A;&#x9762;&#x8BF4;&#x7684;&#x65B9;&#x6CD5;&#x4E3B;&#x8981;&#x662F;&#x9488;&#x5BF9;<strong>&#x6570;&#x5B57;</strong>&#x505A;&#x7684;&#x53CD;&#x722C;&#x624B;&#x6BB5;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x5BF9;&#x6C49;&#x5B57;&#x8FDB;&#x884C;&#x53CD;&#x722C;&#x600E;&#x4E48;&#x529E;&#xFF1F;&#x63A5;&#x4E0B;&#x6765;&#x63D0;&#x4F9B;&#x51E0;&#x79CD;&#x65B9;&#x6848;</p><ol><li><strong>&#x65B9;&#x6848;1:</strong> &#x5BF9;&#x4E8E;&#x4F60;&#x7AD9;&#x70B9;&#x9891;&#x7387;&#x6700;&#x9AD8;&#x7684;&#x8BCD;&#x4E91;&#xFF0C;&#x505A;&#x4E00;&#x4E2A;&#x6C49;&#x5B57;&#x6620;&#x5C04;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#xFF0C;&#x6B65;&#x9AA4;&#x8DDF;&#x6570;&#x5B57;&#x4E00;&#x6837;&#x3002;&#x5148;&#x5C06;&#x5E38;&#x7528;&#x7684;&#x6C49;&#x5B57;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684; ttf &#x6587;&#x4EF6;&#xFF1B;&#x6839;&#x636E;&#x4E0B;&#x9762;&#x63D0;&#x4F9B;&#x7684;&#x94FE;&#x63A5;&#xFF0C;&#x5C06; ttf &#x6587;&#x4EF6;&#x8F6C;&#x6362;&#x4E3A; svg &#x6587;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x4E0B;&#x9762;&#x7684;&#x201C;&#x5B57;&#x4F53;&#x6620;&#x5C04;&#x201D;&#x94FE;&#x63A5;&#x70B9;&#x8FDB;&#x53BB;&#x7684;&#x7F51;&#x7AD9;&#x4E0A;&#x9762;&#x9009;&#x62E9;&#x524D;&#x9762;&#x751F;&#x6210;&#x7684; svg &#x6587;&#x4EF6;&#xFF0C;&#x5C06;svg&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7684;&#x6BCF;&#x4E2A;&#x6C49;&#x5B57;&#x505A;&#x4E2A;&#x6620;&#x5C04;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5C06;&#x6C49;&#x5B57;&#x4E13;&#x4E3A; unicode &#x7801;&#xFF08;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684; unicode &#x7801;&#x4E0D;&#x8981;&#x53BB;&#x5728;&#x7EBF;&#x76F4;&#x63A5;&#x751F;&#x6210;&#xFF0C;&#x56E0;&#x4E3A;&#x76F4;&#x63A5;&#x751F;&#x6210;&#x7684;&#x4E1C;&#x897F;&#x4E5F;&#x5C31;&#x662F;&#x6709;&#x89C4;&#x5F8B;&#x7684;&#x3002;&#x6211;&#x7ED9;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x5148;&#x7528;&#x7F51;&#x7AD9;&#x751F;&#x6210;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x505A;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x6BD4;&#x5982;&#x5C06;&#x201C;e342&#x201D;&#x8F6C;&#x6362;&#x4E3A; &#x201C;e231&#x201D;&#xFF09;&#xFF1B;&#x7136;&#x540E;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x7684;&#x8FD9;&#x4E2A;&#x5B57;&#x4F53;&#x6587;&#x4EF6;&#x7684;&#x89C4;&#x5219;&#x53CD;&#x8FC7;&#x53BB;&#x6620;&#x5C04;&#x51FA;&#x6765;&#x3002;</li><li><strong>&#x65B9;&#x6848;2:</strong> &#x5C06;&#x7F51;&#x7AD9;&#x7684;&#x91CD;&#x8981;&#x5B57;&#x4F53;&#xFF0C;&#x5C06; html &#x90E8;&#x5206;&#x751F;&#x6210;&#x56FE;&#x7247;&#xFF0C;&#x8FD9;&#x6837;&#x5B50;&#x722C;&#x866B;&#x8981;&#x8BC6;&#x522B;&#x5230;&#x9700;&#x8981;&#x7684;&#x5185;&#x5BB9;&#x6210;&#x672C;&#x5C31;&#x5F88;&#x9AD8;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x7528;&#x5230; OCR&#x3002;&#x6548;&#x7387;&#x4E5F;&#x5F88;&#x4F4E;&#x3002;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x62E6;&#x622A;&#x6389;&#x4E00;&#x90E8;&#x5206;&#x7684;&#x722C;&#x866B;</li><li><strong>&#x65B9;&#x6848;3:</strong> &#x770B;&#x5230;&#x643A;&#x7A0B;&#x7684;&#x6280;&#x672F;&#x5206;&#x4EAB;&#x201C;&#x53CD;&#x722C;&#x7684;&#x6700;&#x9AD8;&#x5883;&#x754C;&#x5C31;&#x662F; Canvas &#x7684;&#x6307;&#x7EB9;&#xFF0C;&#x539F;&#x7406;&#x662F;&#x4E0D;&#x540C;&#x7684;&#x673A;&#x5668;&#x4E0D;&#x540C;&#x7684;&#x786C;&#x4EF6;&#x5BF9;&#x4E8E; Canvas &#x753B;&#x51FA;&#x7684;&#x56FE;&#x603B;&#x662F;&#x5B58;&#x5728;&#x50CF;&#x7D20;&#x7EA7;&#x522B;&#x7684;&#x8BEF;&#x5DEE;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x5224;&#x65AD;&#x5F53;&#x5BF9;&#x4E8E;&#x8BBF;&#x95EE;&#x6765;&#x8BF4;&#x5927;&#x91CF;&#x7684; canvas &#x7684;&#x6307;&#x7EB9;&#x4E00;&#x81F4;&#x7684;&#x8BDD;&#xFF0C;&#x5219;&#x8BA4;&#x4E3A;&#x662F;&#x722C;&#x866B;&#xFF0C;&#x5219;&#x53EF;&#x4EE5;&#x5C01;&#x6389;&#x5B83;&#x201D;&#x3002;<p>&#x672C;&#x4EBA;&#x5C06;&#x65B9;&#x6848;1&#x5B9E;&#x73B0;&#x5230; Demo &#x4E2D;&#x4E86;&#x3002;</p></li></ol><h3 id="articleHeader4">&#x5173;&#x952E;&#x6B65;&#x9AA4;</h3><ol><li>&#x5148;&#x6839;&#x636E;&#x4F60;&#x4EEC;&#x7684;&#x4EA7;&#x54C1;&#x627E;&#x5230;&#x5E38;&#x7528;&#x7684;&#x5173;&#x952E;&#x8BCD;&#xFF0C;&#x751F;&#x6210;<strong>&#x8BCD;&#x4E91;</strong></li><li>&#x6839;&#x636E;&#x8BCD;&#x4E91;&#xFF0C;&#x5C06;&#x6BCF;&#x4E2A;&#x5B57;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684; unicode &#x7801;</li><li>&#x5C06;&#x8BCD;&#x4E91;&#x5305;&#x62EC;&#x7684;&#x6C49;&#x5B57;&#x505A;&#x6210;&#x4E00;&#x4E2A;&#x5B57;&#x4F53;&#x5E93;</li><li>&#x5C06;&#x5B57;&#x4F53;&#x5E93; .ttf &#x505A;&#x6210; svg &#x683C;&#x5F0F;&#xFF0C;&#x7136;&#x540E;&#x4E0A;&#x4F20;&#x5230; <a href="https://icomoon.io/app/#/select/font" rel="nofollow noreferrer" target="_blank">icomoon</a> &#x5236;&#x4F5C;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5B57;&#x4F53;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x89C4;&#x5219;&#xFF0C;&#x6BD4;&#x5982; <strong>&#x201C;&#x5E74;&#x201D;</strong> &#x5BF9;&#x5E94;&#x7684; <strong>unicode &#x7801;</strong>&#x662F; <strong>&#x201C;u5e74&#x201D;</strong> &#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E2A; <strong>&#x607A;&#x6492;&#x52A0;&#x5BC6;</strong> &#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E; <strong>&#x504F;&#x79FB;&#x91CF;</strong> &#x4E3A;1&#xFF0C;&#x90A3;&#x4E48;&#x7ECF;&#x8FC7;<strong>&#x607A;&#x6492;&#x52A0;&#x5BC6;</strong> <strong>&#x201C;&#x5E74;&#x201D;</strong>&#x5BF9;&#x5E94;&#x7684; <strong>unicode</strong> &#x7801;&#x662F;<strong>&#x201C;u5e75&#x201D;</strong> &#x3002;&#x5229;&#x7528;&#x8FD9;&#x79CD;&#x89C4;&#x5219;&#x5236;&#x4F5C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x5B57;&#x4F53;&#x5E93;</li><li>&#x5728;&#x6BCF;&#x6B21;&#x8C03;&#x7528;&#x63A5;&#x53E3;&#x7684;&#x65F6;&#x5019;&#x670D;&#x52A1;&#x7AEF;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x662F;&#xFF1A;&#x670D;&#x52A1;&#x7AEF;&#x5C01;&#x88C5;&#x67D0;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x6570;&#x636E;&#x7ECF;&#x8FC7;&#x65B9;&#x6CD5;&#x5224;&#x65AD;&#x662F;&#x4E0D;&#x662F;&#x5728;&#x8BCD;&#x4E91;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x8BCD;&#x4E91;&#x4E2D;&#x7684;&#x5B57;&#x7B26;&#xFF0C;&#x5229;&#x7528;&#x89C4;&#x5219;&#xFF08;&#x627E;&#x5230;&#x6C49;&#x5B57;&#x5BF9;&#x5E94;&#x7684; unicode &#x7801;&#xFF0C;&#x518D;&#x6839;&#x636E;&#x51EF;&#x6492;&#x52A0;&#x5BC6;&#xFF0C;&#x8BBE;&#x7F6E;&#x5BF9;&#x5E94;&#x7684;&#x504F;&#x79FB;&#x91CF;&#xFF0C;Demo &#x4E2D;&#x4E3A;1&#xFF0C;&#x5C06;&#x6BCF;&#x4E2A;&#x6C49;&#x5B57;&#x52A0;&#x5BC6;&#x5904;&#x7406;&#xFF09;&#x52A0;&#x5BC6;&#x5904;&#x7406;&#x540E;&#x8FD4;&#x56DE;&#x6570;&#x636E;</li><li><p>&#x5BA2;&#x6237;&#x7AEF;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#xFF1A;</p><ul><li>&#x5148;&#x5F15;&#x5165;&#x6211;&#x4EEC;&#x524D;&#x9762;&#x5236;&#x4F5C;&#x597D;&#x7684;&#x6C49;&#x5B57;&#x5B57;&#x4F53;&#x5E93;</li><li>&#x8C03;&#x7528;&#x63A5;&#x53E3;&#x62FF;&#x5230;&#x6570;&#x636E;&#xFF0C;&#x663E;&#x793A;&#x5230;&#x5BF9;&#x5E94;&#x7684; Dom &#x8282;&#x70B9;&#x4E0A;</li><li>&#x5982;&#x679C;&#x662F;&#x6C49;&#x5B57;&#x6587;&#x672C;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5BF9;&#x5E94;&#x8282;&#x70B9;&#x7684; css &#x7C7B;&#x8BBE;&#x7F6E;&#x6210;&#x6C49;&#x5B57;&#x7C7B;&#xFF0C;&#x8BE5;&#x7C7B;&#x5BF9;&#x5E94;&#x7684; font-family &#x662F;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x5F15;&#x5165;&#x7684;&#x6C49;&#x5B57;&#x5B57;&#x4F53;&#x5E93;</li></ul></li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//style.css
@font-face {
  font-family: &quot;NumberFont&quot;;
  src: url(&apos;http://127.0.0.1:8080/Util/analysis&apos;);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: &quot;CharacterFont&quot;;
  src: url(&apos;http://127.0.0.1:8080/Util/map&apos;);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h2 {
  font-family: &quot;NumberFont&quot;;
}

h3,a{
  font-family: &quot;CharacterFont&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css">//<span class="hljs-selector-tag">style</span><span class="hljs-selector-class">.css</span>
@<span class="hljs-keyword">font-face</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;NumberFont&quot;</span>;
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">&apos;http://127.0.0.1:8080/Util/analysis&apos;</span>);
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}

@<span class="hljs-keyword">font-face</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;CharacterFont&quot;</span>;
  <span class="hljs-attribute">src</span>: <span class="hljs-built_in">url</span>(<span class="hljs-string">&apos;http://127.0.0.1:8080/Util/map&apos;</span>);
  <span class="hljs-attribute">-webkit-font-smoothing</span>: antialiased;
  <span class="hljs-attribute">-moz-osx-font-smoothing</span>: grayscale;
}

<span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;NumberFont&quot;</span>;
}

<span class="hljs-selector-tag">h3</span>,<span class="hljs-selector-tag">a</span>{
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">&quot;CharacterFont&quot;</span>;
}</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015968895?w=2720&amp;h=1408" src="https://static.alili.tech/img/remote/1460000015968895?w=2720&amp;h=1408" alt="&#x63A5;&#x53E3;&#x6548;&#x679C;" title="&#x63A5;&#x53E3;&#x6548;&#x679C;" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015968896" src="https://static.alili.tech/img/remote/1460000015968896" alt="&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x6548;&#x679C;" title="&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x6548;&#x679C;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader5">&#x4F20;&#x9001;&#x95E8;</h3><p><a href="https://blog.csdn.net/fdipzone/article/details/68166388" rel="nofollow noreferrer" target="_blank">&#x5B57;&#x4F53;&#x5236;&#x4F5C;&#x7684;&#x6B65;&#x9AA4;</a>&#x3001;<a href="https://everythingfonts.com/ttf-to-svg" rel="nofollow noreferrer" target="_blank">ttf&#x8F6C;svg</a>&#x3001;<a href="https://icomoon.io/app/#/select/font" rel="nofollow noreferrer" target="_blank">&#x5B57;&#x4F53;&#x6620;&#x5C04;&#x89C4;&#x5219;</a></p><h2 id="articleHeader6">&#x5B9E;&#x73B0;&#x7684;&#x6548;&#x679C;</h2><ol><li>&#x9875;&#x9762;&#x4E0A;&#x770B;&#x5230;&#x7684;&#x6570;&#x636E;&#x8DDF;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x770B;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x4E0D;&#x4E00;&#x81F4;</li><li>&#x53BB;&#x67E5;&#x770B;&#x63A5;&#x53E3;&#x6570;&#x636E;&#x8DDF;&#x5BA1;&#x6838;&#x5143;&#x7D20;&#x548C;&#x754C;&#x9762;&#x770B;&#x5230;&#x7684;&#x4E09;&#x8005;&#x4E0D;&#x4E00;&#x81F4;</li><li>&#x9875;&#x9762;&#x6BCF;&#x6B21;&#x5237;&#x65B0;&#x4E4B;&#x524D;&#x5F97;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#x66F4;&#x4E0D;&#x4E00;&#x81F4;</li><li>&#x5BF9;&#x4E8E;&#x6570;&#x5B57;&#x548C;&#x6C49;&#x5B57;&#x7684;&#x5904;&#x7406;&#x624B;&#x6BB5;&#x90FD;&#x4E0D;&#x4E00;&#x81F4;</li></ol><p>&#x8FD9;&#x51E0;&#x79CD;&#x7EC4;&#x5408;&#x62F3;&#x6253;&#x4E0B;&#x6765;&#x3002;&#x5BF9;&#x4E8E;&#x4E00;&#x822C;&#x7684;&#x722C;&#x866B;&#x5C31;&#x653E;&#x5F03;&#x4E86;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015968897?w=2734&amp;h=1466" src="https://static.alili.tech/img/remote/1460000015968897?w=2734&amp;h=1466" alt="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;1" title="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;1" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015968898?w=2668&amp;h=1504" src="https://static.alili.tech/img/remote/1460000015968898?w=2668&amp;h=1504" alt="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;2" title="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;2" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015968899?w=2650&amp;h=1436" src="https://static.alili.tech/img/remote/1460000015968899?w=2650&amp;h=1436" alt="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;3" title="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;3" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015968900?w=2748&amp;h=1596" src="https://static.alili.tech/img/remote/1460000015968900?w=2748&amp;h=1596" alt="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;4" title="&#x6570;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;4" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015968895?w=2720&amp;h=1408" src="https://static.alili.tech/img/remote/1460000015968895?w=2720&amp;h=1408" alt="&#x6C49;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;1" title="&#x6C49;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;1" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000015968896" src="https://static.alili.tech/img/remote/1460000015968896" alt="&#x6C49;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;2" title="&#x6C49;&#x5B57;&#x53CD;&#x722C;-&#x7F51;&#x9875;&#x663E;&#x793A;&#x6548;&#x679C;&#x3001;&#x5BA1;&#x67E5;&#x5143;&#x7D20;&#x3001;&#x63A5;&#x53E3;&#x7ED3;&#x679C;&#x60C5;&#x51B5;2" style="cursor:pointer;display:inline"></span></p><hr><p>&#x524D;&#x9762;&#x7684; ttf &#x8F6C; svg &#x7F51;&#x7AD9;&#x5F53; ttf &#x6587;&#x4EF6;&#x592A;&#x5927;&#x4F1A;&#x9650;&#x5236;&#x8F6C;&#x6362;&#xFF0C;&#x8BA9;&#x4F60;&#x8D2D;&#x4E70;&#xFF0C;&#x4E0B;&#x9762;&#x8D34;&#x51FA;&#x4E2A;&#x65B0;&#x7684;&#x94FE;&#x63A5;&#x3002;</p><p><a href="https://convertio.co/zh/font-converter/" rel="nofollow noreferrer" target="_blank">ttf&#x8F6C;svg</a></p><h2 id="articleHeader7"><a href="https://github.com/FantasticLBP/Anti-WebSpider" rel="nofollow noreferrer" target="_blank">Demo &#x5730;&#x5740;</a></h2><p><span class="img-wrap"><img data-src="/img/remote/1460000015968901" src="https://static.alili.tech/img/remote/1460000015968901" alt="&#x6548;&#x679C;&#x6F14;&#x793A;" title="&#x6548;&#x679C;&#x6F14;&#x793A;" style="cursor:pointer"></span></p><p>&#x8FD0;&#x884C;&#x6B65;&#x9AA4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5BA2;&#x6237;&#x7AEF;&#x3002;&#x5148;&#x67E5;&#x770B;&#x672C;&#x673A; ip &#x5728; Demo/Spider-develop/Solution/Solution1.js &#x548C; Demo/Spider-develop/Solution/Solution2.js  &#x91CC;&#x9762;&#x5C06;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x4FEE;&#x6539;&#x4E3A;&#x672C;&#x673A; ip

$ cd Demo
$ ls
REST        Spider-release    file-Server.js
Spider-develop    Util        rule.json
$ node file-Server.js 
Server is runnig at http://127.0.0.1:8080/

//&#x670D;&#x52A1;&#x7AEF; &#x5148;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;
$ cd REST/
$ npm install
$ node app.js " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="powershell hljs"><code class="powershell">//&#x5BA2;&#x6237;&#x7AEF;&#x3002;&#x5148;&#x67E5;&#x770B;&#x672C;&#x673A; ip &#x5728; Demo/Spider-develop/Solution/Solution1.js &#x548C; Demo/Spider-develop/Solution/Solution2.js  &#x91CC;&#x9762;&#x5C06;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x4FEE;&#x6539;&#x4E3A;&#x672C;&#x673A; ip

$ cd Demo
$ ls
REST        Spider-release    file-Server.js
Spider-develop    Util        rule.json
$ node file-Server.js 
Server is runnig at http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span>/

//&#x670D;&#x52A1;&#x7AEF; &#x5148;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;
$ cd REST/
$ npm install
$ node app.js </code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web 端反爬虫技术方案

## 原文链接
[https://segmentfault.com/a/1190000015968889](https://segmentfault.com/a/1190000015968889)


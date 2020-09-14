---
title: '对于页面适配，你应该使用px还是rem' 
date: 2018-11-18 3:32:07
hidden: true
slug: t7zx5ynh68c
categories: [reprint]
---

{{< raw >}}
<p><code>css</code>&#x4E2D;&#x7684;&#x5355;&#x4F4D;&#x5F88;&#x591A;&#xFF0C;<code>%</code>&#x3001;<code>px</code>&#x3001;<code>em</code>&#x3001;<code>rem</code>&#xFF0C;&#x4EE5;&#x53CA;&#x6BD4;&#x8F83;&#x65B0;&#x7684;<code>vw</code>&#x3001;<code>vh</code>&#x7B49;&#x3002;&#x6BCF;&#x4E2A;&#x5355;&#x4F4D;&#x90FD;&#x6709;&#x7279;&#x5B9A;&#x7684;&#x7528;&#x9014;&#xFF0C;&#x6BD4;&#x5982;&#x5F53;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x77E9;&#x5F62;&#x7684;&#x5BBD;&#x9AD8;&#x6BD4;&#x4E3A;<code>16:9</code>&#xFF0C;&#x5E76;&#x4E14;&#x968F;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x81EA;&#x9002;&#x5E94;&#x65F6;&#xFF0C;&#x9664;&#x4E86;&#x7528;<code>%</code>&#xFF0C;&#x5176;&#x4ED6;&#x5355;&#x4F4D;&#x662F;&#x5F88;&#x96BE;&#x505A;&#x5230;&#x7684;&#x3002;&#x6240;&#x4EE5;&#x4E0D;&#x5B58;&#x5728;&#x8BF4;&#x67D0;&#x4E2A;&#x5355;&#x4F4D;&#x662F;&#x9519;&#x8BEF;&#x7684;&#xFF0C;&#x67D0;&#x4E2A;&#x5355;&#x4F4D;&#x662F;&#x6700;&#x597D;&#x7684;&#x8FD9;&#x79CD;&#x8BF4;&#x6CD5;&#x3002;</p><p>&#x90A3;&#x672C;&#x6587;&#x8BF4;&#x7684;&#x9875;&#x9762;&#x9002;&#x914D;&#xFF0C;&#x6307;&#x7684;&#x662F;&#x540C;&#x6837;&#x7684;&#x5E03;&#x5C40;&#xFF0C;&#x5728;&#x4E0D;&#x540C;&#x5927;&#x5C0F;&#x7684;&#x5C4F;&#x5E55;&#x4E0A;&#x600E;&#x4E48;&#x8FDB;&#x884C;&#x7F29;&#x653E;&#x3001;&#x63A7;&#x5236;&#x95F4;&#x8DDD;&#x3001;&#x5BBD;&#x9AD8;&#x3001;&#x5B57;&#x53F7;&#x7B49;&#x5927;&#x5C0F;&#x3002;</p><p>&#x9875;&#x9762;&#x9002;&#x914D;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x5F88;&#x591A;&#xFF1A;</p><ul><li>&#x4F7F;&#x7528;<code>px</code>&#xFF0C;&#x7ED3;&#x5408;Media Query&#x8FDB;&#x884C;&#x9636;&#x68AF;&#x5F0F;&#x7684;&#x9002;&#x914D;&#xFF1B;</li><li>&#x4F7F;&#x7528;<code>%</code>&#xFF0C;&#x6309;&#x767E;&#x5206;&#x6BD4;&#x81EA;&#x9002;&#x5E94;&#x5E03;&#x5C40;&#xFF1B;</li><li>&#x4F7F;&#x7528;<code>rem</code>&#xFF0C;&#x7ED3;&#x5408;<code>html</code>&#x5143;&#x7D20;&#x7684;<code>font-size</code>&#x6765;&#x6839;&#x636E;&#x5C4F;&#x5E55;&#x5BBD;&#x5EA6;&#x9002;&#x914D;&#xFF1B;</li><li>&#x4F7F;&#x7528;<code>vw</code>&#x3001;<code>vh</code>&#xFF0C;&#x76F4;&#x63A5;&#x6839;&#x636E;&#x89C6;&#x53E3;&#x5BBD;&#x9AD8;&#x9002;&#x914D;&#x3002;</li></ul><p>&#x5728;&#x8FD9;&#x4E9B;&#x5927;&#x524D;&#x63D0;&#x4E0B;&#xFF0C;&#x8FD8;&#x9700;&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x5C0F;&#x7684;&#x7EC6;&#x8282;&#x505A;&#x5FAE;&#x8C03;&#x3002;&#x6BD4;&#x5982;&#x4F7F;&#x7528;<code>px</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x80FD;&#x5728;&#x5C0F;&#x5C4F;&#x5E55;&#x4E2D;&#xFF0C;&#x8981;&#x5BF9;&#x67D0;&#x4E2A;&#x5BB9;&#x5668;&#x8FDB;&#x884C;<code>transform: scale(.8)</code>&#xFF0C;&#x9002;&#x5F53;&#x7F29;&#x5C0F;&#x5904;&#x7406;&#x3002;&#x4F7F;&#x7528;<code>rem</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x9700;&#x8981;&#x56FA;&#x5B9A;&#x9875;&#x9762;&#x7684;&#x5DE6;&#x53F3;&#x95F4;&#x8DDD;&#x4E3A;<code>10px</code>&#x7B49;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5BF9;&#x6211;&#x6765;&#x8BF4;&#xFF0C;&#x5C3D;&#x7BA1;&#x7F51;&#x4E0A;&#x66FE;&#x5BF9;<code>px</code>&#x3001;<code>rem</code>&#x548C;<code>em</code>&#x7B49;&#x5355;&#x4F4D;&#x7684;&#x4F18;&#x7F3A;&#x70B9;&#x4E89;&#x8BBA;&#x8FC7;&#x5F88;&#x591A;&#xFF0C;&#x4F46;&#x6211;&#x7684;&#x89C2;&#x70B9;&#x53EF;&#x80FD;&#x662F;&#xFF0C;&#x5177;&#x4F53;&#x60C5;&#x51B5;&#x5177;&#x4F53;&#x5206;&#x6790;&#x3002;&#x6709;&#x540C;&#x5B66;&#x53EF;&#x80FD;&#x8981;&#x70B8;&#x4E86;&#xFF0C;&#x4F60;&#x8FD9;&#x8DDF;&#x6CA1;&#x8BF4;&#x6709;&#x5565;&#x533A;&#x522B;&#xFF1F;</p><p>&#x5BF9;&#xFF0C;&#x6211;&#x7684;&#x610F;&#x601D;&#x8DDF;&#x5F00;&#x7BC7;&#x4E00;&#x6837;&#xFF0C;&#x5355;&#x8BBA;&#x67D0;&#x4E2A;&#x5355;&#x4F4D;&#x7684;&#x597D;&#x574F;&#x662F;&#x6CA1;&#x610F;&#x4E49;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x6700;&#x5173;&#x6CE8;&#x7684;&#x662F;&#xFF1A;&#x4EC0;&#x4E48;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x4EC0;&#x4E48;&#x5355;&#x4F4D;&#x6700;&#x5408;&#x9002;&#x3002;</p><p>&#x4E5F;&#x4E0D;&#x5356;&#x5173;&#x5B50;&#x4E86;&#xFF0C;&#x6211;&#x5C31;&#x76F4;&#x63A5;&#x5217;&#x4E00;&#x4E9B;&#x81EA;&#x5DF1;&#x89C9;&#x5F97;&#x6BD4;&#x8F83;&#x597D;&#x7684;&#x5B9E;&#x8DF5;&#x65B9;&#x5F0F;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x591A;&#x5E74;&#x7684;&#x5F00;&#x53D1;&#x7ECF;&#x9A8C;&#x548C;&#x5927;&#x91CF;&#x7684;&#x8C03;&#x7814;&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x8BBA;&#xFF1A;</p><ol><li>&#x5728;&#x89C6;&#x89C9;&#x7A3F;&#x8981;&#x6C42;&#x56FA;&#x5B9A;&#x5C3A;&#x5BF8;&#x7684;&#x5143;&#x7D20;&#x4E0A;&#x4F7F;&#x7528;<code>px</code>&#x3002;&#x6BD4;&#x5982;<code>1px</code>&#x7EBF;&#xFF0C;<code>4px</code>&#x7684;&#x5706;&#x89D2;&#x8FB9;&#x6846;&#x3002;</li><li>&#x5728;&#x5B57;&#x53F7;&#x3001;&#xFF08;&#x5927;&#x591A;&#x6570;&#xFF09;&#x95F4;&#x8DDD;&#x4E0A;&#x4F7F;&#x7528;<code>rem</code>&#x3002;</li><li>&#x614E;&#x7528;<code>em</code>&#x3002;</li></ol><p>&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x6807;&#x9898;&#x6CA1;&#x63D0;&#x5230;<code>%</code>&#x3001;<code>vw</code>&#x3001;<code>vh</code>&#x8FD9;&#x51E0;&#x4E2A;&#x5462;&#xFF1F;&#x8FD9;&#x51E0;&#x4E2A;&#x90FD;&#x662F;&#x6309;&#x6BD4;&#x4F8B;&#x9002;&#x914D;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x53C2;&#x8003;&#x5BF9;&#x8C61;&#x4E0D;&#x4E00;&#x6837;&#x3002;</p><p><code>%</code>&#x662F;&#x53C2;&#x8003;&#x7236;&#x5BB9;&#x5668;&#xFF0C;<code>vw</code>&#x548C;<code>vh</code>&#x662F;&#x53C2;&#x8003;&#x89C6;&#x53E3;&#x3002;&#x4ED6;&#x4EEC;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x662F;&#x975E;&#x5E38;&#x56FA;&#x5B9A;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7684;<code>16:9</code>&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x9664;&#x4E86;&#x7528;<code>%</code>&#xFF0C;&#x8FD8;&#x6709;&#x66F4;&#x5408;&#x9002;&#x7684;&#x65B9;&#x5F0F;&#x5417;&#xFF1F;&#x53E6;&#x5916;&#xFF0C;<code>1vw = 1%&#x7684;&#x89C6;&#x53E3;&#x5BBD;&#x5EA6;</code>&#x3002;&#x6240;&#x4EE5;&#x5C31;&#x771F;&#x6B63;&#x9700;&#x8981;&#x6309;&#x89C6;&#x53E3;&#x5927;&#x5C0F;&#x9002;&#x914D;&#x7684;&#x65F6;&#x5019;&#x518D;&#x7528;&#x8FD9;&#x4E2A;&#x5355;&#x4F4D;&#x5427;&#xFF0C;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x76F8;&#x5BF9;&#x56FA;&#x5B9A;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4F1A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x8FD9;3&#x4E2A;&#x7ED3;&#x8BBA;&#x7684;&#x7531;&#x6765;&#x3002;</p><h3 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x614E;&#x7528;<code>em</code>&#xFF1F;</h3><p><strong><code>em</code>&#x4F1A;&#x53E0;&#x52A0;&#x8BA1;&#x7B97;&#x3002;</strong>&#x5728;&#x8FD9;&#x4E2A;&#x673A;&#x5236;&#x4E0B;&#x592A;&#x5BB9;&#x6613;&#x72AF;&#x9519;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x8FD9;&#x6BB5;<code>css</code>&#x6307;&#x5B9A;&#x7684;&#x5B57;&#x53F7;&#x5177;&#x4F53;&#x662F;&#x591A;&#x5C11;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// HTML
&lt;span&gt;
    abc
    &lt;span&gt;def&lt;/span&gt;
    abc
&lt;/span&gt;

// CSS
span {font-size: 1.5em;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-comment">// HTML</span>
<span class="hljs-params">&lt;span&gt;</span>
    abc
    <span class="hljs-params">&lt;span&gt;</span>def<span class="hljs-params">&lt;/span&gt;</span>
    abc
<span class="hljs-params">&lt;/span&gt;</span>

<span class="hljs-comment">// CSS</span>
<span class="hljs-class">span </span>{font-size: <span class="hljs-number">1.5</span>em;}</code></pre><p>&#x5B9E;&#x9645;&#x7684;&#x6548;&#x679C;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015867357" src="https://static.alili.tech/img/remote/1460000015867357" alt="em-compound" title="em-compound" style="cursor:pointer"></span></p><p>&#x5148;&#x8981;&#x641E;&#x6E05;&#x695A;<code>em</code>&#x7684;&#x8BA1;&#x7B97;&#x539F;&#x7406;&#xFF0C;&#x5B83;&#x662F;&#x6839;&#x636E;<strong>&#x5F53;&#x524D;&#x5143;&#x7D20;&#x7684;&#x5B57;&#x53F7;</strong>&#x6309;&#x6BD4;&#x4F8B;&#x8BA1;&#x7B97;&#x7684;&#x3002;</p><p>&#x5916;&#x5C42;<code>span</code>&#x7684;&#x5B57;&#x53F7;&#x662F;<code>16px</code>&#xFF08;&#x6D4F;&#x89C8;&#x5668;&#x9ED8;&#x8BA4;&#x503C;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;<code>1.5em</code>&#x4E4B;&#x540E;&#x662F;<code>24px</code>&#x3002;&#x7531;&#x4E8E;&#x5B57;&#x53F7;&#x662F;&#x7EE7;&#x627F;&#x7684;&#xFF0C;&#x5BFC;&#x81F4;&#x5185;&#x5C42;<code>span</code>&#x7684;&#x5B57;&#x53F7;&#x7EE7;&#x627F;&#x8FC7;&#x6765;&#x662F;<code>24px</code>&#xFF0C;&#x518D;&#x7ECF;&#x8FC7;<code>1.5em</code>&#x4E4B;&#x540E;&#x5C31;&#x6210;&#x4E86;<code>36px</code>&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x5C31;&#x7B97;&#x8981;&#x7528;<code>em</code>&#x7684;&#x8BDD;&#xFF0C;&#x5C3D;&#x91CF;&#x4E0D;&#x8981;&#x7528;&#x5728;&#x7EE7;&#x627F;&#x5C5E;&#x6027;&#xFF08;<code>font-size</code>&#xFF09;&#x4E0A;&#xFF0C;&#x9664;&#x975E;&#x4F60;&#x771F;&#x7684;&#x6E05;&#x695A;&#x4F60;&#x5728;&#x505A;&#x4EC0;&#x4E48;&#xFF01;</p><p>&#x6BD4;&#x5982;&#x4F60;&#x60F3;&#x6839;&#x636E;&#x5B57;&#x53F7;&#x81EA;&#x52A8;&#x8C03;&#x6574;&#x5B57;&#x7B26;&#x95F4;&#x8DDD;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x505A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".content {
    font-size: 1rem;
    letter-spacing: .03em;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.content</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">letter-spacing</span>: .<span class="hljs-number">03em</span>;
}</code></pre><p>&#x4F46;&#x518D;&#x4ED4;&#x7EC6;&#x60F3;&#x4E00;&#x4E0B;&#xFF0C;<code>letter-spacing</code>&#x7531;<code>.content</code>&#x7684;&#x5B57;&#x53F7;&#x51B3;&#x5B9A;&#xFF0C;&#x800C;&#x5B83;&#x53C8;&#x7531;<code>html</code>&#x7684;&#x5B57;&#x53F7;&#x51B3;&#x5B9A;&#x3002;&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;<code>letter-spacing</code>&#x4E0D;&#x76F4;&#x63A5;&#x7528;<code>rem</code>&#x5462;&#xFF1F;</p><h3 id="articleHeader1">rem vs. px</h3><p><code>px</code>&#x662F;&#x6211;&#x6BD4;&#x8F83;&#x559C;&#x6B22;&#x7684;&#x4E00;&#x4E2A;&#x5355;&#x4F4D;&#xFF0C;&#x7B80;&#x5355;&#x53C8;&#x76F4;&#x63A5;&#x3002;&#x4F46;&#x7406;&#x6027;&#x9A71;&#x4F7F;&#xFF0C;&#x8FD8;&#x662F;&#x8981;&#x5408;&#x7406;&#x8003;&#x8651;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x3002;</p><p><code>px</code>&#x7684;&#x6027;&#x8D28;&#x51B3;&#x5B9A;&#x4E86;&#x5B83;&#x53EA;&#x80FD;&#x7528;&#x4E8E;&#x56FA;&#x5B9A;&#x5C3A;&#x5BF8;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x89C6;&#x89C9;&#x8BBE;&#x8BA1;&#x5E08;&#x89C4;&#x5B9A;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FB9;&#x6846;&#x5BBD;&#x5EA6;&#x5FC5;&#x987B;&#x662F;<code>2px</code>&#x3002;&#x90A3;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x8BA8;&#x8BBA;&#x4E86;&#x3002;</p><p>&#x9664;&#x4E86;&#x56FA;&#x5B9A;&#x5C3A;&#x5BF8;&#x7528;<code>px</code>&#xFF0C;&#x5176;&#x4ED6;&#x5927;&#x90E8;&#x5206;&#x60C5;&#x51B5;&#x90FD;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>rem</code>&#x3002;</p><p>&#x73B0;&#x5728;&#x8003;&#x8651;&#x4E00;&#x4E2A;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#x573A;&#x666F;&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x90FD;&#x662F;&#x5148;&#x6709;&#x89C6;&#x89C9;&#x7A3F;&#x624D;&#x80FD;&#x5F00;&#x53D1;&#x3002;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x4E00;&#x3001;&#x5047;&#x8BBE;&#x89C6;&#x89C9;&#x7A3F;&#x6309;iPhone 6&#x548C;iPhone 6+&#xFF0C;&#x53CA;&#x5176;&#x4ED6;&#x5C3A;&#x5BF8;&#x5404;&#x51FA;&#x4E86;&#x4E00;&#x4EFD;&#xFF0C;&#x90A3;&#x4F60;&#x5C31;&#x6309;&#x7167;Media Query&#x53BB;&#x9002;&#x914D;&#x3002;&#x4E8C;&#x3001;&#x8BBE;&#x8BA1;&#x5E08;&#x53EA;&#x7ED9;&#x4F60;&#x4E00;&#x79CD;&#x673A;&#x578B;&#x7684;&#x89C6;&#x89C9;&#x7A3F;&#xFF0C;&#x4EE5;iPhone 6&#x4E3A;&#x4F8B;&#xFF0C;<code>750x1334</code>&#xFF0C;2&#x500D;&#x5C4F;&#x4E0B;&#x8F6C;&#x6362;&#x540E;&#x662F;<code>375x667</code>&#x3002;</p><p>&#x7B2C;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#x4E5F;&#x4E0D;&#x8BA8;&#x8BBA;&#x4E86;&#xFF0C;&#x901A;&#x8FC7;Media Query&#x65AD;&#x70B9;&#x9002;&#x914D;&#x540E;&#xFF0C;&#x5176;&#x5B9E;&#x4F60;&#x5904;&#x7406;&#x7684;&#x8FD8;&#x662F;&#x7B2C;&#x4E8C;&#x79CD;&#x60C5;&#x51B5;&#x3002;</p><p>&#x90A3;&#x7B2C;&#x4E8C;&#x79CD;&#x7684;&#x610F;&#x601D;&#x662F;&#xFF0C;&#x4F60;&#x8981;&#x6839;&#x636E;&#x5BBD;&#x5EA6;&#x4E3A;<code>375px</code>&#x7684;&#x7A3F;&#x5B50;&#xFF0C;&#x6269;&#x5C55;&#x5230;&#x9002;&#x914D;&#x4EFB;&#x610F;<strong>&#x5BBD;&#x5EA6;</strong>&#x7684;&#x5C4F;&#x5E55;&#x3002;&#xFF08;&#x9875;&#x9762;&#x9AD8;&#x5EA6;&#x8DDF;&#x4E1A;&#x52A1;&#x6709;&#x5173;&#xFF0C;&#x4E0D;&#x7528;&#x5173;&#x5FC3;&#xFF0C;&#x5BBD;&#x5EA6;&#x80AF;&#x5B9A;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#xFF09;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x62FF;&#x5230;&#x89C6;&#x89C9;&#x7A3F;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015867394" src="https://static.alili.tech/img/remote/1460000015867394" alt="&#x89C6;&#x89C9;&#x7A3F;" title="&#x89C6;&#x89C9;&#x7A3F;" style="cursor:pointer"></span></p><p>&#x6D4B;&#x91CF;&#x540E;&#x4E3B;&#x8981;&#x53C2;&#x6570;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x9875;&#x9762;&#x95F4;&#x8DDD;10px</li><li>&#x6587;&#x5B57;&#x95F4;&#x8DDD;10px&#xFF0C;&#x5B57;&#x53F7;16px</li><li>A&#x9AD8;&#x5EA6;100px</li><li>B&#x9AD8;&#x5EA6;50px&#xFF0C;&#x4E0A;&#x95F4;&#x8DDD;30px</li></ul><p>&#x5F88;&#x5FEB;&#x5C31;&#x80FD;&#x5199;&#x51FA;HTML&#x7ED3;&#x6784;&#x548C;CSS&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;box box-1&quot;&gt;A. &#x7B2C;&#x4E00;&#x6BB5;&#x5185;&#x5BB9;&lt;/div&gt;
&lt;div class=&quot;box box-2&quot;&gt;B. &#x7B2C;&#x4E8C;&#x6BB5;&#x5185;&#x5BB9;&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;box box-1&quot;</span>&gt;A. &#x7B2C;&#x4E00;&#x6BB5;&#x5185;&#x5BB9;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">&quot;box box-2&quot;</span>&gt;B. &#x7B2C;&#x4E8C;&#x6BB5;&#x5185;&#x5BB9;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    padding: 10px;
    background: #f6f0ee;
}

.box {
    padding: 10px;
    font-size: 16px;
    color: #fff;
    box-sizing: border-box;
}

.box-1 {
    height: 100px;
    background: #1daedc;
}

.box-2 {
    margin-top: 30px;
    height: 50px;
    background: #ddbe97;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#f6f0ee</span>;
}

<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}

<span class="hljs-selector-class">.box-1</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#1daedc</span>;
}

<span class="hljs-selector-class">.box-2</span> {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ddbe97</span>;
}</code></pre><p>&#x5B8C;&#x7F8E;&#x7B26;&#x5408;&#x8981;&#x6C42;&#x3002;</p><p>&#x7136;&#x540E;&#x89C6;&#x89C9;&#x5F00;&#x59CB;&#x63D0;&#x8981;&#x6C42;&#x4E86;&#xFF0C;&#x5927;&#x5C4F;&#x4E0A;&#x8981;&#x628A;&#x5B57;&#x4F53;&#x653E;&#x5927;&#x3001;&#x95F4;&#x8DDD;&#x653E;&#x5927;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5019;&#x7684;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x662F;&#xFF0C;&#x95EE;&#x8BBE;&#x8BA1;&#x5E08;&#x662F;&#x8981;&#x9002;&#x914D;&#x54EA;&#x79CD;&#x5C4F;&#x5E55;&#xFF0C;&#x5B57;&#x53F7;&#x662F;&#x591A;&#x5C11;&#xFF0C;&#x95F4;&#x8DDD;&#x662F;&#x591A;&#x5C11;&#x3002;&#x6280;&#x672F;&#x4E0A;&#x518D;&#x901A;&#x8FC7;Media Query&#x5FAE;&#x8C03;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media(min-width: 414px) {
    // &#x8FD9;&#x91CC;&#x4E0D;&#x5199;&#x4E86;&#xFF0C;&#x6309;&#x89C6;&#x89C9;&#x8981;&#x6C42;&#x91CF;&#x5316;&#x5373;&#x53EF;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>@media(<span class="hljs-built_in">min</span>-<span class="hljs-built_in">width</span>: <span class="hljs-number">414</span>px) {
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x4E0D;&#x5199;&#x4E86;&#xFF0C;&#x6309;&#x89C6;&#x89C9;&#x8981;&#x6C42;&#x91CF;&#x5316;&#x5373;&#x53EF;</span>
}</code></pre><p>&#x53E6;&#x4E00;&#x4E2A;&#x9009;&#x62E9;&#x53EF;&#x4EE5;&#x53CD;&#x8FC7;&#x6765;&#x505A;&#x3002;&#x9996;&#x5148;&#x6309;rem&#x4F5C;&#x4E3A;&#x5B57;&#x53F7;&#x3001;&#x5BB9;&#x5668;&#x9AD8;&#x5EA6;&#x3001;&#x5916;&#x95F4;&#x8DDD;&#x7684;&#x5355;&#x4F4D;&#x3002;&#x90A3;&#x4E48;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
    font-size: 16px;
}

.box {
    font-size: 1rem;
}

.box-1 {
    height: 6.25rem;
}

.box-2 {
    margin-top: 1.875rem;
    height: 3.125rem;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
}

<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
}

<span class="hljs-selector-class">.box-1</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">6.25rem</span>;
}

<span class="hljs-selector-class">.box-2</span> {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1.875rem</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3.125rem</span>;
}</code></pre><p>&#x5176;&#x4ED6;&#x7684;&#x6837;&#x5F0F;&#x89C4;&#x5219;&#x4E0D;&#x53D8;&#xFF0C;&#x76EE;&#x524D;&#x7684;&#x7ED3;&#x679C;&#x548C;&#x4E4B;&#x524D;&#x7684;&#x662F;&#x7B49;&#x4EF7;&#x7684;&#x3002;&#x5982;&#x679C;&#x518D;&#x52A0;&#x4E00;&#x70B9;&#x9B54;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;Media Query&#x6539;&#x53D8;iPhone 6+&#x7684;<code>html</code>&#x5B57;&#x53F7;&#xFF0C;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x7684;&#x5C5E;&#x6027;&#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x53D8;&#x5316;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media(min-width: 414px) {
    html {
        font-size: 17.664px;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>@media(<span class="hljs-attribute">min-width</span>: <span class="hljs-number">414px</span>) {
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">17.664px</span>;
    }
}</code></pre><p><code>17.664 = 414 * 16 / 375</code>&#x3002;</p><p>&#x7531;&#x6B64;&#x53EF;&#x4EE5;&#x5F97;&#x5230;<code>html</code>&#x7684;<code>font-size</code>&#x8BA1;&#x7B97;&#x516C;&#x5F0F;&#x4E3A;&#xFF1A;<code>fontSize = deviceWidth * 16 / 375</code>;</p><p>&#x524D;&#x63D0;&#x662F;&#x4F60;&#x7684;<code>html</code>&#x6709;&#x8FD9;&#x6761;<code>meta</code>&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0,user-scalable=no&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code style="word-break:break-word;white-space:initial">&lt;meta <span class="hljs-attr">name=&quot;viewport&quot;</span> <span class="hljs-attr">content=&quot;width=device-width,</span> <span class="hljs-attr">initial-scale=1.0,</span> <span class="hljs-attr">maximum-scale=1.0,</span> <span class="hljs-attr">user-scalable=0,user-scalable=no&quot;&gt;</span></code></pre><p>&#x81F3;&#x4E8E;&#x4E3A;&#x4F55;&#x662F;<code>16px</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x540E;&#x9762;&#x518D;&#x4ECB;&#x7ECD;&#x3002;&#x6240;&#x4EE5;<code>rem</code>&#x6709;&#x4E2A;&#x660E;&#x663E;&#x7684;&#x4F18;&#x70B9;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;<strong>&#x901A;&#x8FC7;&#x5C11;&#x91CF;&#x4EE3;&#x7801;&#x89E3;&#x51B3;&#x5927;&#x90E8;&#x5206;&#x95EE;&#x9898;</strong>&#x3002;</p><p>&#x5982;&#x679C;&#x8FD8;&#x5B58;&#x5728;&#x67D0;&#x4E9B;&#x7EC6;&#x8282;&#x4E0D;&#x591F;&#x6EE1;&#x610F;&#xFF0C;&#x90A3;&#x518D;&#x7528;Media Query&#x5FAE;&#x8C03;&#x3002;&#x8FD9;&#x79CD;&#x4E3B;&#x89C2;&#x7684;&#x201C;&#x597D;&#x770B;&#x201D;&#x3001;&#x201C;&#x4E0D;&#x597D;&#x770B;&#x201D;&#xFF0C;&#x53EF;&#x80FD;&#x6CE8;&#x5B9A;&#x6CA1;&#x6CD5;&#x81EA;&#x52A8;&#x5316;&#x89E3;&#x51B3;&#x5427;&#x3002;</p><p><strong>&#x5173;&#x4E8E;rem&#x517C;&#x5BB9;&#x6027;</strong>&#x3002;&#x684C;&#x9762;&#x7AEF;&#x7684;&#x8BDD;&#x4EC5;&#x5728;<code>IE9+</code>&#x652F;&#x6301;&#x3002;<code>vw</code>&#x548C;<code>vh</code>&#x4E00;&#x6837;&#x3002;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x8981;&#x8003;&#x8651;<code>IE8</code>&#x7684;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x90A3;&#x6CA1;&#x522B;&#x7684;&#x9009;&#x62E9;&#x53EA;&#x80FD;&#x7528;<code>px</code>&#x5427;&#x3002;&#x81F3;&#x4E8E;&#x79FB;&#x52A8;&#x7AEF;&#xFF0C;&#x652F;&#x6301;&#x60C5;&#x51B5;&#x4E0D;&#x9519;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4F7F;&#x7528;&#x3002;</p><h3 id="articleHeader2">html&#x7684;font-size&#x8BE5;&#x5982;&#x4F55;&#x8BBE;&#x7F6E;</h3><p>&#x7531;&#x4E8E;&#xFF08;&#x5927;&#x90E8;&#x5206;&#xFF09;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x9ED8;&#x8BA4;&#x5B57;&#x53F7;&#x4E3A;<code>16px</code>&#xFF0C;&#x6240;&#x4EE5;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x628A;<code>html</code>&#x7684;<code>font-size</code>&#x5F52;&#x4E00;&#x5316;&#x4E3A;<code>16px</code>&#x662F;&#x6BD4;&#x8F83;&#x5408;&#x9002;&#x7684;&#x5B9E;&#x8DF5;&#x65B9;&#x5F0F;&#x3002;&#x540C;&#x65F6;&#x53EF;&#x4EE5;&#x53C2;&#x8003;<a href="http://www.standardista.com/px-to-rem-conversion-if-root-font-size-is-16px/" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a>&#x3002;</p><p>&#x4E3A;&#x4E86;&#x5927;&#x5BB6;&#x4EE5;&#x540E;&#x53C2;&#x8003;&#x65B9;&#x4FBF;&#xFF0C;&#x6211;&#x5217;&#x4E86;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;Media Query&#x65AD;&#x70B9;&#xFF08;&#x4EE5;iPhone 6&#x4E3A;&#x57FA;&#x51C6;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media only screen and (min-width: 320px) {
    html {
        font-size: 13.65px;
    }
}

@media only screen and (min-width: 360px) {
    html {
        font-size: 15.36px;
    }
}

@media only screen and (min-width: 375px) {
    html {
        font-size: 16px;
    }
}

@media only screen and (min-width: 390px) {
    html {
        font-size: 16.64px;
    }
}

@media only screen and (min-width: 414px) {
    html {
        font-size: 17.664px;
    }
}

@media screen and (min-width: 640px) {
    html {
        font-size: 27.31px;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">320px</span>) {
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">13.65px</span>;
    }
}

@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">360px</span>) {
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15.36px</span>;
    }
}

@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">375px</span>) {
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    }
}

@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">390px</span>) {
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16.64px</span>;
    }
}

@<span class="hljs-keyword">media</span> only screen and (min-width: <span class="hljs-number">414px</span>) {
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">17.664px</span>;
    }
}

@<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">640px</span>) {
    <span class="hljs-selector-tag">html</span> {
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">27.31px</span>;
    }
}</code></pre><p>&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x8FD8;&#x4F1A;&#x770B;&#x5230;&#x4E00;&#x4E9B;&#x6587;&#x7AE0;&#x4E2D;&#x5EFA;&#x8BAE;&#x628A;<code>html</code>&#x5B57;&#x53F7;&#x8BBE;&#x6210;<code>62.5%</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
    font-size: 62.5%;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">62.5%</span>;
}</code></pre><p>&#x56E0;&#x4E3A;&#x521A;&#x63D0;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x9ED8;&#x8BA4;&#x7684;&#x5B57;&#x53F7;&#x4E3A;<code>16px</code>&#xFF0C;&#x7528;&#x767E;&#x5206;&#x6BD4;&#x6362;&#x7B97;&#x540E;&#x7B49;&#x4E8E;<code>10px</code>&#xFF0C;&#x6240;&#x4EE5;<code>CSS</code>&#x4E2D;&#x7684;<code>rem</code>&#x662F;&#x76F8;&#x5BF9;&#x4E8E;<code>10px</code>&#x6765;&#x8BA1;&#x7B97;&#xFF0C;&#x8FD9;&#x6837;&#x8BA1;&#x7B97;&#x7684;&#x65F6;&#x5019;&#x5F88;&#x65B9;&#x4FBF;&#xFF0C;&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x76F8;&#x5BF9;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8BBE;&#x7F6E;&#x6765;&#x6539;&#x53D8;&#x6587;&#x5B57;&#x5927;&#x5C0F;&#x3002;</p><p>&#x90A3;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x7528;&#x767E;&#x5206;&#x6BD4;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x8003;&#x8651;&#x5230;&#x8F85;&#x52A9;&#x529F;&#x80FD;&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x8BBE;&#x7F6E;&#x3002;&#x5BF9;&#x4E8E;&#x90E8;&#x5206;&#x7528;&#x6237;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5728;&#x624B;&#x673A;&#x6216;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x8BBE;&#x7F6E;&#x4E2D;&#x589E;&#x5927;&#x624B;&#x673A;&#x5B57;&#x53F7;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5BF9;&#x65B9;&#x5E73;&#x65F6;&#x770B;&#x5B57;&#x662F;&#x5F88;&#x8D39;&#x529B;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4ED6;&#x624D;&#x8981;&#x653E;&#x5927;&#x3002;&#x90A3;&#x628A;html&#x7684;&#x5B57;&#x53F7;&#x8BBE;&#x7F6E;&#x6210;&#x767E;&#x5206;&#x6BD4;&#x5C31;&#x5F88;&#x8D34;&#x5FC3;&#x4E86;&#xFF0C;&#x4F1A;&#x968F;&#x7740;&#x624B;&#x673A;&#x8BBE;&#x7F6E;&#x6539;&#x53D8;&#x9875;&#x9762;&#x7684;&#x5B57;&#x53F7;&#x3002;</p><p>&#x5728;&#x624B;&#x673A;&#x4E0A;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x5B57;&#x53F7;&#x662F;&#x5F88;&#x5E38;&#x89C1;&#x7684;&#x73B0;&#x8C61;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x5145;&#x6EE1;&#x4EBA;&#x9053;&#x4E3B;&#x4E49;&#x7684;&#x6392;&#x7248;&#xFF0C;&#x6211;&#x89C9;&#x5F97;&#x7528;&#x767E;&#x5206;&#x6BD4;&#x662F;&#x975E;&#x5E38;&#x9AD8;&#x5C1A;&#x7684;&#x3002;&#x5B83;&#x4E0D;&#x4EC5;&#x4ECE;&#x89C6;&#x89C9;&#x89D2;&#x5EA6;&#x53BB;&#x8003;&#x8651;&#x7F8E;&#xFF0C;&#x66F4;&#x52A0;&#x505A;&#x5230;&#x4E86;&#x201C;&#x7528;&#x6237;&#x81F3;&#x4E0A;&#x201D;&#x8FD9;&#x56DB;&#x4E2A;&#x5B57;&#x3002;</p><p>&#x597D;&#xFF0C;&#x56DE;&#x5230;&#x73B0;&#x5B9E;&#x73AF;&#x5883;&#x3002;&#x53EA;&#x6709;&#x56FD;&#x5916;&#x90A3;&#x4E9B;&#x5BF9;Accessibility&#x8981;&#x6C42;&#x6BD4;&#x8F83;&#x9AD8;&#x7684;&#x56FD;&#x5BB6;&#xFF0C;&#x624D;&#x4F1A;&#x771F;&#x6B63;&#x53BB;&#x843D;&#x5B9E;&#x8FD9;&#x4E9B;&#x3002;&#x4F46;&#x56FD;&#x5185;&#x7684;&#x8BDD;&#xFF0C;&#x8001;&#x5B9E;&#x8BF4;&#xFF0C;&#x66F4;&#x6CE8;&#x91CD;&#x5916;&#x89C2;&#x7684;&#x7F8E;&#x3002;&#x4ECE;&#x6765;&#x6CA1;&#x6709;&#x54EA;&#x5BB6;&#x4E92;&#x8054;&#x7F51;&#x516C;&#x53F8;&#x7684;&#x9875;&#x9762;&#x4F1A;&#x53BB;&#x517C;&#x5BB9;Screen Reader&#xFF0C;&#x4E5F;&#x5F88;&#x5C11;&#x505A;Keyboard Shortcut&#x3002;</p><p>&#x626F;&#x8FDC;&#x4E86;&#xFF0C;&#x5C31;&#x7B97;&#x4F60;&#x770B;&#x5230;&#x7528;<code>62.5%</code>&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x6709;&#x4E9B;&#x95F4;&#x8DDD;&#x4E5F;&#x662F;&#x4E0D;&#x5408;&#x7406;&#x7684;&#xFF0C;&#x90FD;&#x505A;&#x7684;&#x4E0D;&#x592A;&#x597D;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x628A;&#x6587;&#x6848;&#x505A;&#x5230;&#x56FE;&#x7247;&#x4E0A;&#x7684;&#xFF0C;&#x5BF9;&#x5B57;&#x53F7;&#x6839;&#x672C;&#x4E0D;&#x654F;&#x611F;&#x3002;&#x5982;&#x679C;&#x51FA;&#x53D1;&#x70B9;&#x4E0D;&#x662F;&#x4E3A;&#x4E86;&#x7528;&#x6237;&#x7684;&#x89C6;&#x89C9;&#x63A5;&#x53D7;&#x80FD;&#x529B;&#xFF0C;&#x90A3;&#x5C31;&#x522B;&#x7528;<code>62.5%</code>&#xFF1B;&#x5982;&#x679C;&#x60F3;&#x505A;&#xFF0C;&#x5C31;&#x628A;&#x7F29;&#x653E;&#x8003;&#x8651;&#x5230;&#x4F4D;&#x4E86;&#xFF0C;&#x522B;&#x505A;&#x534A;&#x540A;&#x5B50;&#x3002;</p><p>&#x53E6;&#x5916;&#xFF0C;&#x9488;&#x5BF9;&#x672C;&#x5C0F;&#x8282;&#x5F00;&#x5934;&#x7528;<code>16px</code>&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x8FD9;&#x91CC;&#x518D;&#x7ED9;&#x5927;&#x5BB6;&#x63D0;&#x4F9B;&#x4E00;&#x62DB;&#xFF08;&#x6211;&#x8C03;&#x7814;&#x4E86;&#x4E00;&#x4E0B;&#x76EE;&#x524D;&#x6CA1;&#x4EBA;&#x8FD9;&#x4E48;&#x7528;&#xFF0C;&#x4E5F;&#x662F;&#x7075;&#x5149;&#x4E00;&#x73B0;&#x624D;&#x60F3;&#x5230;&#x7684;&#xFF09;&#x3002;</p><p>&#x7528;Media Query&#x7684;&#x7F3A;&#x70B9;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x5B83;&#x662F;&#x5206;&#x6BB5;&#x51FD;&#x6570;&#xFF0C;&#x5BF9;&#x4E8E;&#x5BBD;&#x5EA6;&#x5728;<code>[320, 360)</code>&#x533A;&#x95F4;&#x5185;&#x7684;&#x5C4F;&#x5E55;&#xFF0C;&#x4F1A;&#x9002;&#x7528;&#x540C;&#x4E00;&#x5957;&#x65B9;&#x6848;&#x3002;&#x6700;&#x5B8C;&#x7F8E;&#x7684;&#x5E94;&#x8BE5;&#x662F;&#x7EBF;&#x6027;&#x51FD;&#x6570;&#xFF0C;&#x600E;&#x4E48;&#x505A;&#xFF1F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x7528;<code>vw</code>&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
    font-size: 4.266667vw;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">4.266667vw</span>;
}</code></pre><p>&#x7528;1&#x884C;&#x4EE3;&#x7801;&#x4EE3;&#x66FF;&#x4E4B;&#x524D;6&#x4E2A;&#x5197;&#x957F;&#x7684;Media Query&#xFF0C;&#x8FD8;&#x4E0D;&#x9519;&#x5427;&#x3002;</p><h3 id="articleHeader3">&#x5982;&#x4F55;&#x63D0;&#x9AD8;rem&#x7684;&#x53EF;&#x8BFB;&#x6027;</h3><p>&#x6211;&#x4EEC;&#x6765;&#x8C08;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x8BDD;&#x9898;&#x3002;</p><p>&#x5F53;&#x4F60;&#x77E5;&#x9053;<code>html</code>&#x7684;<code>font-size</code>&#x600E;&#x4E48;&#x8BBE;&#x7F6E;&#x540E;&#xFF0C;&#x80AF;&#x5B9A;&#x60F3;&#x95EE;&#xFF0C;&#x96BE;&#x9053;&#x6211;&#x6BCF;&#x6B21;&#x5199;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x8FD8;&#x5F97;&#x505A;&#x4E2A;&#x9664;&#x6CD5;&#xFF0C;&#x628A;<code>rem</code>&#x7684;&#x503C;&#x8BA1;&#x7B97;&#x51FA;&#x6765;&#x5417;&#xFF1F;</p><p>&#x6211;&#x76F8;&#x4FE1;&#x7A0D;&#x5FAE;&#x201C;&#x73B0;&#x4EE3;&#x201D;&#x4E00;&#x70B9;&#x7684;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x90FD;&#x4F1A;&#x7528;&#x5230;CSS&#x9884;&#x5904;&#x7406;&#x3002;&#x57FA;&#x4E8E;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#xFF0C;&#x4E8B;&#x60C5;&#x5C31;&#x5F88;&#x597D;&#x529E;&#x4E86;&#xFF0C;&#x4EE5;<code>LESS</code>&#x4E3A;&#x4F8B;&#xFF0C;&#x4E24;&#x6B65;&#x64CD;&#x4F5C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. &#x6309;iPhone 6&#x7684;&#x89C6;&#x89C9;&#x7A3F;&#xFF0C;&#x57FA;&#x51C6;&#x5B57;&#x53F7;&#x4E3A;16px&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;LESS&#x53D8;&#x91CF;&#x3002;
@px: 16rem;

// 2. &#x901A;&#x8FC7;LESS&#x5185;&#x7F6E;&#x7684;&#x9664;&#x6CD5;&#x81EA;&#x52A8;&#x8FD0;&#x7B97;&#x3002;&#x6BD4;&#x5982;&#x7528;&#x5230;16px&#x7684;&#x5B57;&#x53F7;&#x65F6;&#xFF0C;&#x5199;&#x6210;16/@px&#x5373;&#x53EF;&#xFF0C;&#x6700;&#x540E;&#x4F1A;&#x8BA1;&#x7B97;&#x6210;1rem&#x3002;
.example {
    font-size: 16/@px;
    margin: 20/@px 0;
    padding: 20/@px 10/@px;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-comment">// 1. &#x6309;iPhone 6&#x7684;&#x89C6;&#x89C9;&#x7A3F;&#xFF0C;&#x57FA;&#x51C6;&#x5B57;&#x53F7;&#x4E3A;16px&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;LESS&#x53D8;&#x91CF;&#x3002;</span>
<span class="hljs-variable">@px:</span> <span class="hljs-number">16rem</span>;

<span class="hljs-comment">// 2. &#x901A;&#x8FC7;LESS&#x5185;&#x7F6E;&#x7684;&#x9664;&#x6CD5;&#x81EA;&#x52A8;&#x8FD0;&#x7B97;&#x3002;&#x6BD4;&#x5982;&#x7528;&#x5230;16px&#x7684;&#x5B57;&#x53F7;&#x65F6;&#xFF0C;&#x5199;&#x6210;16/@px&#x5373;&#x53EF;&#xFF0C;&#x6700;&#x540E;&#x4F1A;&#x8BA1;&#x7B97;&#x6210;1rem&#x3002;</span>
<span class="hljs-selector-class">.example</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16</span>/<span class="hljs-variable">@px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">20</span>/<span class="hljs-variable">@px</span> <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20</span>/<span class="hljs-variable">@px</span> <span class="hljs-number">10</span>/<span class="hljs-variable">@px</span>;
}</code></pre><h3 id="articleHeader4">&#x5C0F;&#x7ED3;</h3><p>&#x672C;&#x6587;&#x7ED9;&#x5927;&#x5BB6;&#x4ECB;&#x7ECD;&#x4E86;<code>rem</code>&#x7684;&#x9002;&#x914D;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#x4F55;&#x8BBE;&#x7F6E;<code>html</code>&#x7684;<code>font-size</code>&#xFF0C;&#x5982;&#x4F55;&#x66F4;&#x5FEB;&#x5730;&#x4E66;&#x5199;<code>rem</code>&#x7684;&#x503C;&#x3002;</p><p>&#x672C;&#x6587;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x201C;<code>PHP</code>&#x662F;&#x6700;&#x597D;&#x7684;&#x8BED;&#x8A00;&#x201D;&#x8FD9;&#x79CD;&#x7C7B;&#x4F3C;&#x7684;&#x5BFC;&#x5411;&#xFF0C;&#x90FD;&#x662F;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x7684;&#x7ECF;&#x9A8C;&#x548C;&#x89C2;&#x5BDF;&#x6240;&#x5F97;&#x51FA;&#x7684;&#x7ED3;&#x8BBA;&#xFF0C;&#x82E5;&#x6709;&#x4E0D;&#x5BF9;&#x8BF7;&#x6307;&#x6B63;&#x3002;</p><p>&#x9875;&#x9762;&#x9002;&#x914D;&#x662F;&#x5F88;&#x7CBE;&#x7EC6;&#x7684;&#x5DE5;&#x4F5C;&#xFF0C;&#x53EF;&#x80FD;&#x4F60;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x4E00;&#x5957;&#x975E;&#x5E38;&#x719F;&#x7EC3;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x5F0F;&#xFF0C;&#x90A3;&#x4FDD;&#x6301;&#x4E0B;&#x53BB;&#x5373;&#x53EF;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#xFF0C;&#x4E0D;&#x59A8;&#x53C2;&#x8003;&#x4E00;&#x4E0B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
对于页面适配，你应该使用px还是rem

## 原文链接
[https://segmentfault.com/a/1190000015867354](https://segmentfault.com/a/1190000015867354)


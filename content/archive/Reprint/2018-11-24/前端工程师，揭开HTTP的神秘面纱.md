---
title: '前端工程师，揭开HTTP的神秘面纱' 
date: 2018-11-24 2:30:10
hidden: true
slug: 1zefbpkun9i
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x535A;&#x5BA2;&#x5730;&#x5740;&#xFF1A;<a href="https://finget.github.io/2018/07/03/http/" rel="nofollow noreferrer" target="_blank">https://finget.github.io/2018/07/03/http/</a></blockquote><p>&#x6211;&#x53EA;&#x662F;&#x4E2A;&#x521D;&#x5B66;&#x8005;&#xFF0C;&#x56FE;&#x7247;&#x6587;&#x5B57;&#x6709;&#x4E9B;&#x6765;&#x81EA;&#x7F51;&#x4E0A;&#xFF0C;&#x5199;&#x7684;&#x4E0D;&#x5BF9;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8FD8;&#x671B;&#x5927;&#x4F6C;&#x6307;&#x51FA;&#xFF01;</p><h2 id="articleHeader0">&#x6D4F;&#x89C8;&#x5668;&#x8F93;&#x5165;URL&#x540E;HTTP&#x8BF7;&#x6C42;&#x8FD4;&#x56DE;&#x8FC7;&#x7A0B;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000015493583?w=976&amp;h=258" src="https://static.alili.tech/img/remote/1460000015493583?w=976&amp;h=258" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x7F51;&#x7EDC;&#x534F;&#x8BAE;&#x5206;&#x5C42;</h2><h3 id="articleHeader2">OSI&#x4E03;&#x5C42;&#x534F;&#x8BAE;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015493584?w=1120&amp;h=1587" src="https://static.alili.tech/img/remote/1460000015493584?w=1120&amp;h=1587" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader3">&#x4E94;&#x5C42;&#x534F;&#x8BAE;</h3><p>&#x4E94;&#x5C42;&#x534F;&#x8BAE;&#x53EA;&#x662F;OSI&#x548C;TCP/IP&#x7684;&#x7EFC;&#x5408;&#xFF0C;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x8FD8;&#x662F;TCP/IP&#x7684;&#x56DB;&#x5C42;&#x7ED3;&#x6784;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015493585?w=483&amp;h=348" src="https://static.alili.tech/img/remote/1460000015493585?w=483&amp;h=348" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader4">TCP/IP &#x534F;&#x8BAE;</h3><blockquote>TCP(Transmission Control Protocol)&#x4F20;&#x8F93;&#x63A7;&#x5236;&#x534F;&#x8BAE;</blockquote><p>TCP/IP&#x534F;&#x8BAE;&#x5C06;&#x5E94;&#x7528;&#x5C42;&#x3001;&#x8868;&#x793A;&#x5C42;&#x3001;&#x4F1A;&#x8BDD;&#x5C42;&#x5408;&#x5E76;&#x4E3A;&#x5E94;&#x7528;&#x5C42;&#xFF0C;&#x7269;&#x7406;&#x5C42;&#x548C;&#x6570;&#x636E;&#x94FE;&#x8DEF;&#x5C42;&#x5408;&#x5E76;&#x4E3A;&#x7F51;&#x7EDC;&#x63A5;&#x53E3;&#x5C42;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015493586?w=555&amp;h=391" src="https://static.alili.tech/img/remote/1460000015493586?w=555&amp;h=391" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader5">&#x4E09;&#x79CD;&#x6A21;&#x578B;&#x7ED3;&#x6784;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015493587?w=444&amp;h=255" src="https://static.alili.tech/img/remote/1460000015493587?w=444&amp;h=255" alt="" title="" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000015493588?w=583&amp;h=239" src="https://static.alili.tech/img/remote/1460000015493588?w=583&amp;h=239" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader6">&#x5404;&#x5C42;&#x7684;&#x4F5C;&#x7528;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000015493589?w=494&amp;h=760" src="https://static.alili.tech/img/remote/1460000015493589?w=494&amp;h=760" alt="" title="" style="cursor:pointer"></span></p><p>1.&#x7269;&#x7406;&#x5C42;&#xFF1A;<br>&#x4E3B;&#x8981;&#x5B9A;&#x4E49;&#x7269;&#x7406;&#x8BBE;&#x5907;&#x6807;&#x51C6;&#xFF0C;&#x5982;&#x7F51;&#x7EBF;&#x7684;&#x63A5;&#x53E3;&#x7C7B;&#x578B;&#x3001;&#x5149;&#x7EA4;&#x7684;&#x63A5;&#x53E3;&#x7C7B;&#x578B;&#x3001;&#x5404;&#x79CD;&#x4F20;&#x8F93;&#x4ECB;&#x8D28;&#x7684;&#x4F20;&#x8F93;&#x901F;&#x7387;&#x7B49;&#x3002;&#x5B83;&#x7684;&#x4E3B;&#x8981;&#x4F5C;&#x7528;&#x662F;&#x4F20;&#x8F93;&#x6BD4;&#x7279;&#x6D41;&#xFF08;&#x5C31;&#x662F;&#x7531;1&#x3001;0&#x8F6C;&#x5316;&#x4E3A;&#x7535;&#x6D41;&#x5F3A;&#x5F31;&#x6765;&#x8FDB;&#x884C;&#x4F20;&#x8F93;,&#x5230;&#x8FBE;&#x76EE;&#x7684;&#x5730;&#x540E;&#x5728;&#x8F6C;&#x5316;&#x4E3A;1&#x3001;0&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5E38;&#x8BF4;&#x7684;&#x6570;&#x6A21;&#x8F6C;&#x6362;&#x4E0E;&#x6A21;&#x6570;&#x8F6C;&#x6362;&#xFF09;&#x3002;&#x8FD9;&#x4E00;&#x5C42;&#x7684;&#x6570;&#x636E;&#x53EB;&#x505A;&#x6BD4;&#x7279;&#x3002;<br>&#x3000;&#x3000;<br>2.&#x6570;&#x636E;&#x94FE;&#x8DEF;&#x5C42;&#xFF1A;<br>&#x5B9A;&#x4E49;&#x4E86;&#x5982;&#x4F55;&#x8BA9;&#x683C;&#x5F0F;&#x5316;&#x6570;&#x636E;&#x4EE5;&#x8FDB;&#x884C;&#x4F20;&#x8F93;&#xFF0C;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x8BA9;&#x63A7;&#x5236;&#x5BF9;&#x7269;&#x7406;&#x4ECB;&#x8D28;&#x7684;&#x8BBF;&#x95EE;&#x3002;&#x8FD9;&#x4E00;&#x5C42;&#x901A;&#x5E38;&#x8FD8;&#x63D0;&#x4F9B;&#x9519;&#x8BEF;&#x68C0;&#x6D4B;&#x548C;&#x7EA0;&#x6B63;&#xFF0C;&#x4EE5;&#x786E;&#x4FDD;&#x6570;&#x636E;&#x7684;&#x53EF;&#x9760;&#x4F20;&#x8F93;&#x3002; &#x3000;<br>&#x3000;<br>3.&#x7F51;&#x7EDC;&#x5C42;&#xFF1A;<br>&#x5728;&#x4F4D;&#x4E8E;&#x4E0D;&#x540C;&#x5730;&#x7406;&#x4F4D;&#x7F6E;&#x7684;&#x7F51;&#x7EDC;&#x4E2D;&#x7684;&#x4E24;&#x4E2A;&#x4E3B;&#x673A;&#x7CFB;&#x7EDF;&#x4E4B;&#x95F4;&#x63D0;&#x4F9B;&#x8FDE;&#x63A5;&#x548C;&#x8DEF;&#x5F84;&#x9009;&#x62E9;&#x3002;Internet&#x7684;&#x53D1;&#x5C55;&#x4F7F;&#x5F97;&#x4ECE;&#x4E16;&#x754C;&#x5404;&#x7AD9;&#x70B9;&#x8BBF;&#x95EE;&#x4FE1;&#x606F;&#x7684;&#x7528;&#x6237;&#x6570;&#x5927;&#x5927;&#x589E;&#x52A0;&#xFF0C;&#x800C;&#x7F51;&#x7EDC;&#x5C42;&#x6B63;&#x662F;&#x7BA1;&#x7406;&#x8FD9;&#x79CD;&#x8FDE;&#x63A5;&#x7684;&#x5C42;&#x3002;<br>&#x3000;&#x3000;<br>4.&#x4F20;&#x8F93;&#x5C42;&#xFF1A;<br>&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E9B;&#x4F20;&#x8F93;&#x6570;&#x636E;&#x7684;&#x534F;&#x8BAE;&#x548C;&#x7AEF;&#x53E3;&#x53F7;&#xFF08;WWW&#x7AEF;&#x53E3;80&#x7B49;&#xFF09;&#xFF0C;&#x5982;&#xFF1A;<br>TCP&#xFF08;transmission control protocol &#x2013;&#x4F20;&#x8F93;&#x63A7;&#x5236;&#x534F;&#x8BAE;&#xFF0C;&#x4F20;&#x8F93;&#x6548;&#x7387;&#x4F4E;&#xFF0C;&#x53EF;&#x9760;&#x6027;&#x5F3A;&#xFF0C;&#x7528;&#x4E8E;&#x4F20;&#x8F93;&#x53EF;&#x9760;&#x6027;&#x8981;&#x6C42;&#x9AD8;&#xFF0C;&#x6570;&#x636E;&#x91CF;&#x5927;&#x7684;&#x6570;&#x636E;&#xFF09;<br>UDP&#xFF08;user datagram protocol&#x2013;&#x7528;&#x6237;&#x6570;&#x636E;&#x62A5;&#x534F;&#x8BAE;&#xFF0C;&#x4E0E;TCP&#x7279;&#x6027;&#x6070;&#x6070;&#x76F8;&#x53CD;&#xFF0C;&#x7528;&#x4E8E;&#x4F20;&#x8F93;&#x53EF;&#x9760;&#x6027;&#x8981;&#x6C42;&#x4E0D;&#x9AD8;&#xFF0C;&#x6570;&#x636E;&#x91CF;&#x5C0F;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;QQ&#x804A;&#x5929;&#x6570;&#x636E;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4F20;&#x8F93;&#x7684;&#xFF09;&#x3002; &#x4E3B;&#x8981;&#x662F;&#x5C06;&#x4ECE;&#x4E0B;&#x5C42;&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5206;&#x6BB5;&#x548C;&#x4F20;&#x8F93;&#xFF0C;&#x5230;&#x8FBE;&#x76EE;&#x7684;&#x5730;&#x5740;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x91CD;&#x7EC4;&#x3002;&#x5E38;&#x5E38;&#x628A;&#x8FD9;&#x4E00;&#x5C42;&#x6570;&#x636E;&#x53EB;&#x505A;&#x6BB5;&#x3002;<br>&#x3000;&#x3000;<br>5.&#x4F1A;&#x8BDD;&#x5C42;&#xFF1A;<br>&#x901A;&#x8FC7;&#x8FD0;&#x8F93;&#x5C42;&#xFF08;&#x7AEF;&#x53E3;&#x53F7;&#xFF1A;&#x4F20;&#x8F93;&#x7AEF;&#x53E3;&#x4E0E;&#x63A5;&#x6536;&#x7AEF;&#x53E3;&#xFF09;&#x5EFA;&#x7ACB;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x7684;&#x901A;&#x8DEF;&#x3002;&#x4E3B;&#x8981;&#x5728;&#x4F60;&#x7684;&#x7CFB;&#x7EDF;&#x4E4B;&#x95F4;&#x53D1;&#x8D77;&#x4F1A;&#x8BDD;&#x6216;&#x8005;&#x63A5;&#x53D7;&#x4F1A;&#x8BDD;&#x8BF7;&#x6C42;&#xFF08;&#x8BBE;&#x5907;&#x4E4B;&#x95F4;&#x9700;&#x8981;&#x4E92;&#x76F8;&#x8BA4;&#x8BC6;&#x53EF;&#x4EE5;&#x662F;IP&#x4E5F;&#x53EF;&#x4EE5;&#x662F;MAC&#x6216;&#x8005;&#x662F;&#x4E3B;&#x673A;&#x540D;&#xFF09; &#x3000;&#x3000;</p><p>6.&#x8868;&#x793A;&#x5C42;&#xFF1A;<br>&#x53EF;&#x786E;&#x4FDD;&#x4E00;&#x4E2A;&#x7CFB;&#x7EDF;&#x7684;&#x5E94;&#x7528;&#x5C42;&#x6240;&#x53D1;&#x9001;&#x7684;&#x4FE1;&#x606F;&#x53EF;&#x4EE5;&#x88AB;&#x53E6;&#x4E00;&#x4E2A;&#x7CFB;&#x7EDF;&#x7684;&#x5E94;&#x7528;&#x5C42;&#x8BFB;&#x53D6;&#x3002;&#x4F8B;&#x5982;&#xFF0C;PC&#x7A0B;&#x5E8F;&#x4E0E;&#x53E6;&#x4E00;&#x53F0;&#x8BA1;&#x7B97;&#x673A;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x53F0;&#x8BA1;&#x7B97;&#x673A;&#x4F7F;&#x7528;&#x6269;&#x5C55;&#x4E8C;&#x4E00;&#x5341;&#x8FDB;&#x5236;&#x4EA4;&#x6362;&#x7801;&#xFF08;EBCDIC&#xFF09;&#xFF0C;&#x800C;&#x53E6;&#x4E00;&#x53F0;&#x5219;&#x4F7F;&#x7528;&#x7F8E;&#x56FD;&#x4FE1;&#x606F;&#x4EA4;&#x6362;&#x6807;&#x51C6;&#x7801;&#xFF08;ASCII&#xFF09;&#x6765;&#x8868;&#x793A;&#x76F8;&#x540C;&#x7684;&#x5B57;&#x7B26;&#x3002;&#x5982;&#x6709;&#x5FC5;&#x8981;&#xFF0C;&#x8868;&#x793A;&#x5C42;&#x4F1A;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x4E00;&#x79CD;&#x901A;&#x683C;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#x591A;&#x79CD;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x4E4B;&#x95F4;&#x7684;&#x8F6C;&#x6362;&#x3002; &#x3000;&#x3000;</p><p>7.&#x5E94;&#x7528;&#x5C42;&#xFF1A;<br>&#x662F;&#x6700;&#x9760;&#x8FD1;&#x7528;&#x6237;&#x7684;OSI&#x5C42;&#x3002;&#x8FD9;&#x4E00;&#x5C42;&#x4E3A;&#x7528;&#x6237;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#xFF08;&#x4F8B;&#x5982;&#x7535;&#x5B50;&#x90AE;&#x4EF6;&#x3001;&#x6587;&#x4EF6;&#x4F20;&#x8F93;&#x548C;&#x7EC8;&#x7AEF;&#x4EFF;&#x771F;&#xFF09;&#x63D0;&#x4F9B;&#x7F51;&#x7EDC;&#x670D;&#x52A1;&#x3002;</p><h2 id="articleHeader7">HTTP &#x53D1;&#x5C55;&#x5386;&#x53F2;</h2><h3 id="articleHeader8">HTTP/0.9</h3><ul><li>&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x547D;&#x4EE4;GET</li><li>&#x54CD;&#x5E94;&#x7C7B;&#x578B;: &#x4EC5; &#x8D85;&#x6587;&#x672C;</li><li>&#x6CA1;&#x6709;header&#x7B49;&#x63CF;&#x8FF0;&#x6570;&#x636E;&#x7684;&#x4FE1;&#x606F;</li><li>&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x5B8C;&#x6BD5;&#xFF0C;&#x5C31;&#x5173;&#x95ED;TCP&#x8FDE;&#x63A5;</li></ul><h3 id="articleHeader9">HTTP/1.0</h3><ul><li>&#x589E;&#x52A0;&#x4E86;&#x5F88;&#x591A;&#x547D;&#x4EE4;&#xFF08;post HESD &#xFF09;</li><li>&#x589E;&#x52A0;status code &#x548C; header</li><li>&#x591A;&#x5B57;&#x7B26;&#x96C6;&#x652F;&#x6301;&#x3001;&#x591A;&#x90E8;&#x5206;&#x53D1;&#x9001;&#x3001;&#x6743;&#x9650;&#x3001;&#x7F13;&#x5B58;&#x7B49;</li><li>&#x54CD;&#x5E94;&#xFF1A;&#x4E0D;&#x518D;&#x53EA;&#x9650;&#x4E8E;&#x8D85;&#x6587;&#x672C; (Content-Type &#x5934;&#x90E8;&#x63D0;&#x4F9B;&#x4E86;&#x4F20;&#x8F93; HTML &#x4E4B;&#x5916;&#x6587;&#x4EF6;&#x7684;&#x80FD;&#x529B; &#x2014; &#x5982;&#x811A;&#x672C;&#x3001;&#x6837;&#x5F0F;&#x6216;&#x5A92;&#x4F53;&#x6587;&#x4EF6;)</li></ul><h3 id="articleHeader10">HTTP/1.1</h3><ul><li>&#x6301;&#x4E45;&#x8FDE;&#x63A5;&#x3002;TCP&#x4E09;&#x6B21;&#x63E1;&#x624B;&#x4F1A;&#x5728;&#x4EFB;&#x4F55;&#x8FDE;&#x63A5;&#x88AB;&#x5EFA;&#x7ACB;&#x4E4B;&#x524D;&#x53D1;&#x751F;&#x4E00;&#x6B21;&#x3002;&#x6700;&#x7EC8;&#xFF0C;&#x5F53;&#x53D1;&#x9001;&#x4E86;&#x6240;&#x6709;&#x6570;&#x636E;&#x4E4B;&#x540E;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x4E00;&#x4E2A;&#x6D88;&#x606F;&#xFF0C;&#x8868;&#x793A;&#x4E0D;&#x4F1A;&#x518D;&#x6709;&#x66F4;&#x591A;&#x6570;&#x636E;&#x5411;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x4E86;&#xFF1B;&#x5219;&#x5BA2;&#x6237;&#x7AEF;&#x624D;&#x4F1A;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#xFF08;&#x65AD;&#x5F00; TCP&#xFF09;</li><li>&#x652F;&#x6301;&#x7684;&#x65B9;&#x6CD5;: <code>GET</code> , <code>HEAD</code> , <code>POST</code> , <code>PUT</code> ,<code>DELETE</code> , <code>TRACE</code> , <code>OPTIONS</code></li><li>&#x8FDB;&#x884C;&#x4E86;&#x91CD;&#x5927;&#x7684;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x548C;&#x7279;&#x6027;&#x589E;&#x5F3A;&#xFF0C;&#x5206;&#x5757;&#x4F20;&#x8F93;&#x3001;&#x538B;&#x7F29;/&#x89E3;&#x538B;&#x3001;&#x5185;&#x5BB9;&#x7F13;&#x5B58;&#x78CB;&#x5546;&#x3001;&#x865A;&#x62DF;&#x4E3B;&#x673A;&#xFF08;&#x6709;&#x5355;&#x4E2A;IP&#x5730;&#x5740;&#x7684;&#x4E3B;&#x673A;&#x5177;&#x6709;&#x591A;&#x4E2A;&#x57DF;&#x540D;&#xFF09;&#x3001;&#x66F4;&#x5FEB;&#x7684;&#x54CD;&#x5E94;&#xFF0C;&#x4EE5;&#x53CA;&#x901A;&#x8FC7;&#x589E;&#x52A0;&#x7F13;&#x5B58;&#x8282;&#x7701;&#x4E86;&#x66F4;&#x591A;&#x7684;&#x5E26;&#x5BBD;</li></ul><h3 id="articleHeader11">HTTP2</h3><ul><li>&#x6240;&#x6709;&#x6570;&#x636E;&#x4EE5;&#x4E8C;&#x8FDB;&#x5236;&#x4F20;&#x8F93;&#x3002;HTTP1.x&#x662F;&#x57FA;&#x4E8E;&#x6587;&#x672C;&#x7684;&#xFF0C;&#x65E0;&#x6CD5;&#x4FDD;&#x8BC1;&#x5065;&#x58EE;&#x6027;&#xFF0C;HTTP2.0&#x7EDD;&#x5BF9;&#x4F7F;&#x7528;&#x65B0;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x683C;&#x5F0F;&#xFF0C;&#x65B9;&#x4FBF;&#x4E14;&#x5065;&#x58EE;</li><li>&#x540C;&#x4E00;&#x4E2A;&#x8FDE;&#x63A5;&#x91CC;&#x9762;&#x53D1;&#x9001;&#x591A;&#x4E2A;&#x8BF7;&#x6C42;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x6309;&#x7167;&#x987A;&#x5E8F;&#x6765;</li><li>&#x5934;&#x4FE1;&#x606F;&#x538B;&#x7F29;&#x4EE5;&#x53CA;<strong>&#x63A8;&#x9001;</strong>&#x7B49;&#x63D0;&#x9AD8;&#x6548;&#x7387;&#x7684;&#x529F;&#x80FD;</li></ul><h2 id="articleHeader12">&#x4E09;&#x6B21;&#x63E1;&#x624B;</h2><blockquote>&#x5BA2;&#x670D;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#x5728;&#x8FDB;&#x884C;http&#x8BF7;&#x6C42;&#x548C;&#x8FD4;&#x56DE;&#x7684;&#x5DE5;&#x7A0B;&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>TCP connection</code>&#xFF08;&#x7531;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x8D77;&#xFF09;,http&#x4E0D;&#x5B58;&#x5728;&#x8FDE;&#x63A5;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x5B83;&#x53EA;&#x6709;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x3002;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x90FD;&#x662F;&#x6570;&#x636E;&#x5305;&#xFF0C;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x7684;&#x4F20;&#x8F93;&#x901A;&#x9053;&#x5C31;&#x662F;<code>TCP connection</code>&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000015493590?w=635&amp;h=459" src="https://static.alili.tech/img/remote/1460000015493590?w=635&amp;h=459" alt="" title="" style="cursor:pointer"></span></p><p>&#x4F4D;&#x7801;&#x5373;tcp&#x6807;&#x5FD7;&#x4F4D;&#xFF0C;&#x6709;6&#x79CD;&#x6807;&#x793A;&#xFF1A;SYN(synchronous&#x5EFA;&#x7ACB;&#x8054;&#x673A;) ACK(acknowledgement &#x786E;&#x8BA4;) PSH(push&#x4F20;&#x9001;) FIN(finish&#x7ED3;&#x675F;) RST(reset&#x91CD;&#x7F6E;) URG(urgent&#x7D27;&#x6025;)Sequence number(&#x987A;&#x5E8F;&#x53F7;&#x7801;) Acknowledge number(&#x786E;&#x8BA4;&#x53F7;&#x7801;)</p><p>&#x7B2C;&#x4E00;&#x6B21;&#x63E1;&#x624B;&#xFF1A;&#x4E3B;&#x673A;A&#x53D1;&#x9001;&#x4F4D;&#x7801;&#x4E3A;syn&#xFF1D;1&#xFF0C;&#x968F;&#x673A;&#x4EA7;&#x751F;seq number=1234567&#x7684;&#x6570;&#x636E;&#x5305;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4E3B;&#x673A;B&#x7531;SYN=1&#x77E5;&#x9053;&#xFF0C;A&#x8981;&#x6C42;&#x5EFA;&#x7ACB;&#x8054;&#x673A;&#xFF1B;</p><p>&#x7B2C;&#x4E8C;&#x6B21;&#x63E1;&#x624B;&#xFF1A;&#x4E3B;&#x673A;B&#x6536;&#x5230;&#x8BF7;&#x6C42;&#x540E;&#x8981;&#x786E;&#x8BA4;&#x8054;&#x673A;&#x4FE1;&#x606F;&#xFF0C;&#x5411;A&#x53D1;&#x9001;ack number=(&#x4E3B;&#x673A;A&#x7684;seq+1)&#xFF0C;syn=1&#xFF0C;ack=1&#xFF0C;&#x968F;&#x673A;&#x4EA7;&#x751F;seq=7654321&#x7684;&#x5305;&#xFF1B;</p><p>&#x7B2C;&#x4E09;&#x6B21;&#x63E1;&#x624B;&#xFF1A;&#x4E3B;&#x673A;A&#x6536;&#x5230;&#x540E;&#x68C0;&#x67E5;ack number&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF0C;&#x5373;&#x7B2C;&#x4E00;&#x6B21;&#x53D1;&#x9001;&#x7684;seq number+1&#xFF0C;&#x4EE5;&#x53CA;&#x4F4D;&#x7801;ack&#x662F;&#x5426;&#x4E3A;1&#xFF0C;&#x82E5;&#x6B63;&#x786E;&#xFF0C;&#x4E3B;&#x673A;A&#x4F1A;&#x518D;&#x53D1;&#x9001;ack number=(&#x4E3B;&#x673A;B&#x7684;seq+1)&#xFF0C;ack=1&#xFF0C;&#x4E3B;&#x673A;B&#x6536;&#x5230;&#x540E;&#x786E;&#x8BA4;seq&#x503C;&#x4E0E;ack=1&#x5219;&#x8FDE;&#x63A5;&#x5EFA;&#x7ACB;&#x6210;&#x529F;</p><h2 id="articleHeader13">URI&#x3001;URL&#x3001;URN</h2><blockquote>URI: Uniform Resource Identifier/&#x7EDF;&#x4E00;&#x8D44;&#x6E90;&#x6807;&#x8BC6;&#x7B26;<br>URL: Uniform Resource Locator/&#x7EDF;&#x4E00;&#x8D44;&#x6E90;&#x5B9A;&#x4F4D;&#x5668;<br>URN: Uniform Resource Name/&#x6C38;&#x4E45;&#x7EDF;&#x4E00;&#x8D44;&#x6E90;&#x5B9A;&#x4F4D;&#x7B26;</blockquote><p>web&#x4E0A;&#x7684;&#x5404;&#x79CD;&#x8D44;&#x6E90;&#xFF08;html&#x3001;&#x56FE;&#x7247;&#x3001;&#x89C6;&#x9891;&#x3001;&#x97F3;&#x9891;&#x7B49;&#xFF09;&#x90FD;&#x7531;&#x4E00;&#x4E2A;URI&#x6807;&#x8BC6;&#x5B9A;&#x4F4D;&#x3002;URI&#x76F8;&#x5F53;&#x4E8E;&#x5B83;&#x4EEC;&#x7684;&#x8BE6;&#x7EC6;&#x201C;&#x5BB6;&#x5EAD;&#x4F4F;&#x5740;&#x201D;&#x3002;</p><p>URI&#x5305;&#x542B;&#x4E86;URL&#x548C;URN&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015493591?w=600&amp;h=391" src="https://static.alili.tech/img/remote/1460000015493591?w=600&amp;h=391" alt="" title="" style="cursor:pointer"></span></p><blockquote>URL&#x662F;URI&#x7684;&#x4E00;&#x79CD;&#xFF0C;&#x4E0D;&#x4EC5;&#x6807;&#x8BC6;&#x4E86;Web &#x8D44;&#x6E90;&#xFF0C;&#x8FD8;&#x6307;&#x5B9A;&#x4E86;&#x64CD;&#x4F5C;&#x6216;&#x8005;&#x83B7;&#x53D6;&#x65B9;&#x5F0F;&#xFF0C;&#x540C;&#x65F6;&#x6307;&#x51FA;&#x4E86;&#x4E3B;&#x8981;&#x8BBF;&#x95EE;&#x673A;&#x5236;&#x548C;&#x7F51;&#x7EDC;&#x4F4D;&#x7F6E;&#x3002;<p>URN&#x662F;URI&#x7684;&#x4E00;&#x79CD;&#xFF0C;&#x7528;&#x7279;&#x5B9A;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x540D;&#x5B57;&#x6807;&#x8BC6;&#x8D44;&#x6E90;&#x3002;&#x4F7F;&#x7528;URN&#x53EF;&#x4EE5;&#x5728;&#x4E0D;&#x77E5;&#x9053;&#x5176;&#x7F51;&#x7EDC;&#x4F4D;&#x7F6E;&#x53CA;&#x8BBF;&#x95EE;&#x65B9;&#x5F0F;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x8BA8;&#x8BBA;&#x8D44;&#x6E90;&#x3002;</p></blockquote><p>&#x7F51;&#x4E0A;&#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8FD9;&#x662F;&#x4E00;&#x4E2A;URI
http://bitpoetry.io/posts/hello.html#intro

// &#x8D44;&#x6E90;&#x8BBF;&#x95EE;&#x65B9;&#x5F0F;
http://

// &#x8D44;&#x6E90;&#x5B58;&#x50A8;&#x4F4D;&#x7F6E;
bitpoetry.io/posts/hello.html

#intro // &#x8D44;&#x6E90;

// URL
http://bitpoetry.io/posts/hello.html

// URN
bitpoetry.io/posts/hello.html#intro" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-comment">// &#x8FD9;&#x662F;&#x4E00;&#x4E2A;URI</span>
<span class="hljs-symbol">http:</span><span class="hljs-comment">//bitpoetry.io/posts/hello.html#intro</span>

<span class="hljs-comment">// &#x8D44;&#x6E90;&#x8BBF;&#x95EE;&#x65B9;&#x5F0F;</span>
<span class="hljs-symbol">http:</span><span class="hljs-comment">//</span>

<span class="hljs-comment">// &#x8D44;&#x6E90;&#x5B58;&#x50A8;&#x4F4D;&#x7F6E;</span>
bitpoetry.io<span class="hljs-meta-keyword">/posts/</span>hello.html

<span class="hljs-meta">#intro <span class="hljs-comment">// &#x8D44;&#x6E90;</span></span>

<span class="hljs-comment">// URL</span>
<span class="hljs-symbol">http:</span><span class="hljs-comment">//bitpoetry.io/posts/hello.html</span>

<span class="hljs-comment">// URN</span>
bitpoetry.io<span class="hljs-meta-keyword">/posts/</span>hello.html<span class="hljs-meta">#intro</span></code></pre><h2 id="articleHeader14">HTTP&#x62A5;&#x6587;</h2><p>&#x8BF7;&#x6C42;&#x62A5;&#x6587;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015493592?w=600&amp;h=316" src="https://static.alili.tech/img/remote/1460000015493592?w=600&amp;h=316" alt="" title="" style="cursor:pointer"></span></p><p>&#x54CD;&#x5E94;&#x62A5;&#x6587;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015493593?w=629&amp;h=295" src="https://static.alili.tech/img/remote/1460000015493593?w=629&amp;h=295" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader15">HTTP &#x5404;&#x79CD;&#x7279;&#x6027;</h2><h3 id="articleHeader16">curl</h3><blockquote>curl&#x547D;&#x4EE4;&#x662F;&#x4E00;&#x4E2A;&#x5229;&#x7528;URL&#x89C4;&#x5219;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x4E0B;&#x5DE5;&#x4F5C;&#x7684;&#x6587;&#x4EF6;&#x4F20;&#x8F93;&#x5DE5;&#x5177;&#x3002;&#x5B83;&#x652F;&#x6301;&#x6587;&#x4EF6;&#x7684;&#x4E0A;&#x4F20;&#x548C;&#x4E0B;&#x8F7D;&#xFF0C;&#x6240;&#x4EE5;&#x662F;&#x7EFC;&#x5408;&#x4F20;&#x8F93;&#x5DE5;&#x5177;&#xFF0C;&#x4F46;&#x6309;&#x4F20;&#x7EDF;&#xFF0C;&#x4E60;&#x60EF;&#x79F0;curl&#x4E3A;&#x4E0B;&#x8F7D;&#x5DE5;&#x5177;&#x3002;&#x4F5C;&#x4E3A;&#x4E00;&#x6B3E;&#x5F3A;&#x529B;&#x5DE5;&#x5177;&#xFF0C;curl&#x652F;&#x6301;&#x5305;&#x62EC;HTTP&#x3001;HTTPS&#x3001;ftp&#x7B49;&#x4F17;&#x591A;&#x534F;&#x8BAE;&#xFF0C;&#x8FD8;&#x652F;&#x6301;POST&#x3001;cookies&#x3001;&#x8BA4;&#x8BC1;&#x3001;&#x4ECE;&#x6307;&#x5B9A;&#x504F;&#x79FB;&#x5904;&#x4E0B;&#x8F7D;&#x90E8;&#x5206;&#x6587;&#x4EF6;&#x3001;&#x7528;&#x6237;&#x4EE3;&#x7406;&#x5B57;&#x7B26;&#x4E32;&#x3001;&#x9650;&#x901F;&#x3001;&#x6587;&#x4EF6;&#x5927;&#x5C0F;&#x3001;&#x8FDB;&#x5EA6;&#x6761;&#x7B49;&#x7279;&#x5F81;&#x3002;&#x505A;&#x7F51;&#x9875;&#x5904;&#x7406;&#x6D41;&#x7A0B;&#x548C;&#x6570;&#x636E;&#x68C0;&#x7D22;&#x81EA;&#x52A8;&#x5316;&#xFF0C;curl&#x53EF;&#x4EE5;&#x795D;&#x4E00;&#x81C2;&#x4E4B;&#x529B;&#x3002;</blockquote><p><a href="http://man.linuxde.net/curl" rel="nofollow noreferrer" target="_blank">&#x66F4;&#x8BE6;&#x7EC6;&#x7684;CURL&#xFF0C;&#x70B9;&#x8FD9;&#x91CC;&#x3002;</a></p><p>curl &#x8BBF;&#x95EE; <code>baidu.com</code>:<br><span class="img-wrap"><img data-src="/img/remote/1460000015493594?w=723&amp;h=126" src="https://static.alili.tech/img/remote/1460000015493594?w=723&amp;h=126" alt="" title="" style="cursor:pointer"></span></p><p>&#x8FD4;&#x56DE;&#x7684;&#x5185;&#x5BB9;&#x4E2D;&#xFF0C;html&#x90E8;&#x5206;&#x53EA;&#x6709;&#x4E00;&#x4E2A;meta&#x6807;&#x7B7E;&#xFF0C;<code>&lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;url=http://www.baidu.com/&quot;&gt;</code>&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x8BBF;&#x95EE;&#x7684;&#x662F;<code>baidu.com</code>&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x81EA;&#x52A8;&#x89E3;&#x6790;&#x8FD9;&#x4E2A;meta&#x6807;&#x7B7E;&#x5E76;&#x91CD;&#x5B9A;&#x5411;&#x5230;<code>http://www.baidu.com/</code>&#xFF0C;&#x7136;&#x800C;&#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x5E76;&#x6CA1;&#x6709;&#x89E3;&#x6790;&#x7684;&#x529F;&#x80FD;&#x3002;</p><p>curl &#x8BBF;&#x95EE; <code>www.baidu.com</code>:<br><span class="img-wrap"><img data-src="/img/remote/1460000015493595?w=723&amp;h=416" src="https://static.alili.tech/img/remote/1460000015493595?w=723&amp;h=416" alt="" title="" style="cursor:pointer"></span></p><h4>curl&#x5E38;&#x7528;&#x547D;&#x4EE4;</h4><p><code>-v</code> &#x663E;&#x793A;&#x8BE6;&#x7EC6;&#x7684;&#x8BF7;&#x6C42;&#x4FE1;&#x606F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015493596?w=724&amp;h=708" src="https://static.alili.tech/img/remote/1460000015493596?w=724&amp;h=708" alt="" title="" style="cursor:pointer"></span></p><p><code>-X</code> &#x6307;&#x5B9A;&#x8BF7;&#x6C42;&#x65B9;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -X GET www.xxxx.com/xx/xx?xx=123

curl -X POST www.xxxx.com/xx/xx?xx=123" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code>curl -X GET www.xxxx.com<span class="hljs-regexp">/xx/</span>xx?xx=<span class="hljs-number">123</span>

curl -X POST www.xxxx.com<span class="hljs-regexp">/xx/</span>xx?xx=<span class="hljs-number">123</span></code></pre><p><code>-o / -O</code> &#x4FDD;&#x5B58;&#x4E0B;&#x8F7D;&#x7684;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5C06;&#x6587;&#x4EF6;&#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;&#x5E76;&#x547D;&#x540D;&#x4E3A;mygettext.html
curl -o mygettext.html http://www.gnu.org/software/gettext/manual/gettext.html

// &#x5C06;&#x6587;&#x4EF6;&#x4FDD;&#x5B58;&#x5230;&#x672C;&#x5730;&#x5E76;&#x547D;&#x540D;&#x4E3A;gettext.html
curl -O http://www.gnu.org/software/gettext/manual/gettext.html" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code><span class="hljs-regexp">//</span> &#x5C06;&#x6587;&#x4EF6;&#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;&#x5E76;&#x547D;&#x540D;&#x4E3A;mygettext.html
curl -o mygettext.html http:<span class="hljs-regexp">//</span>www.gnu.org<span class="hljs-regexp">/software/g</span>ettext<span class="hljs-regexp">/manual/g</span>ettext.html

<span class="hljs-regexp">//</span> &#x5C06;&#x6587;&#x4EF6;&#x4FDD;&#x5B58;&#x5230;&#x672C;&#x5730;&#x5E76;&#x547D;&#x540D;&#x4E3A;gettext.html
curl -O http:<span class="hljs-regexp">//</span>www.gnu.org<span class="hljs-regexp">/software/g</span>ettext<span class="hljs-regexp">/manual/g</span>ettext.html</code></pre><h3 id="articleHeader17">CORS&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x7684;&#x9650;&#x5236;&#x4E0E;&#x89E3;&#x51B3;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server1.js
const http = require(&apos;http&apos;)
const fs = require(&apos;fs&apos;)

http.createServer(function (request, response) {
  console.log(&apos;request come&apos;, request.url)

  const html = fs.readFileSync(&apos;test.html&apos;, &apos;utf8&apos;)
  response.writeHead(200, {
    &apos;Content-Type&apos;: &apos;text/html&apos;
  })
  response.end(html)
}).listen(8888)

console.log(&apos;server listening on 8888&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server1.js</span>
<span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;request come&apos;</span>, request.url)

  <span class="hljs-keyword">const</span> html = fs.readFileSync(<span class="hljs-string">&apos;test.html&apos;</span>, <span class="hljs-string">&apos;utf8&apos;</span>)
  response.writeHead(<span class="hljs-number">200</span>, {
    <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;text/html&apos;</span>
  })
  response.end(html)
}).listen(<span class="hljs-number">8888</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server listening on 8888&apos;</span>)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server2.js
const http = require(&apos;http&apos;)

http.createServer(function (request, response) {
  console.log(&apos;request come&apos;, request.url)

  response.end(&apos;123&apos;)
}).listen(8887)

console.log(&apos;server listening on 8887&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server2.js</span>
<span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;request come&apos;</span>, request.url)

  response.end(<span class="hljs-string">&apos;123&apos;</span>)
}).listen(<span class="hljs-number">8887</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server listening on 8887&apos;</span>)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.html
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    
&lt;/body&gt;
&lt;script&gt;
  fetch(&apos;http://127.0.0.1:8887&apos;);
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// test.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  fetch(<span class="hljs-string">&apos;http://127.0.0.1:8887&apos;</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015493597?w=938&amp;h=67" src="https://static.alili.tech/img/remote/1460000015493597?w=938&amp;h=67" alt="" title="" style="cursor:pointer"></span></p><p>&#x5904;&#x7406;&#x65B9;&#x6CD5;&#xFF1A;<br>1.&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x5904;&#x7406;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server2.js &#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8BBE;&#x7F6E;&#x5141;&#x8BB8;&#x8DE8;&#x57DF;
response.writeHead(200, {
  &apos;Access-Control-Allow-Origin&apos;: &apos;*&apos; // * &#x8868;&#x793A;&#x4EFB;&#x4F55;&#x57DF;&#x540D;&#x4E0B;&#x90FD;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;,&#x4E5F;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x57DF;&#x540D;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server2.js &#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8BBE;&#x7F6E;&#x5141;&#x8BB8;&#x8DE8;&#x57DF;</span>
response.writeHead(<span class="hljs-number">200</span>, {
  <span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>: <span class="hljs-string">&apos;*&apos;</span> <span class="hljs-comment">// * &#x8868;&#x793A;&#x4EFB;&#x4F55;&#x57DF;&#x540D;&#x4E0B;&#x90FD;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;,&#x4E5F;&#x53EF;&#x4EE5;&#x6307;&#x5B9A;&#x57DF;&#x540D;</span>
})</code></pre><p>2.jsonp</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.html
&lt;script src=&quot;http://127.0.0.1:8887&quot;&gt;&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// test.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;http://127.0.0.1:8887&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><blockquote>&#x5C31;&#x7B97;&#x5B58;&#x5728;&#x8DE8;&#x57DF;&#xFF0C;&#x8BF7;&#x6C42;&#x8FD8;&#x662F;&#x4F1A;&#x53D1;&#x9001;&#xFF0C;&#x54CD;&#x5E94;&#x4E5F;&#x4F1A;&#x8FD4;&#x56DE;&#xFF0C;&#x53EA;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x53D1;&#x73B0;&#x4E86;&#x5B58;&#x5728;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#x5C31;&#x5C06;&#x8FD4;&#x56DE;&#x5185;&#x5BB9;&#x5C4F;&#x853D;&#x4E86;&#xFF0C;&#x5E76;&#x62A5;&#x9519;&#x63D0;&#x793A;&#x3002;</blockquote><h3 id="articleHeader18">CORS &#x9884;&#x8BF7;&#x6C42;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.html
&lt;script&gt;
  fetch(&apos;http://127.0.0.1:8887&apos;,{
    method: &apos;post&apos;,
    headers: {
      &apos;X-Test-Cors&apos;: &apos;123&apos;
    }
  });
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// test.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  fetch(<span class="hljs-string">&apos;http://127.0.0.1:8887&apos;</span>,{
    method: <span class="hljs-string">&apos;post&apos;</span>,
    headers: {
      <span class="hljs-string">&apos;X-Test-Cors&apos;</span>: <span class="hljs-string">&apos;123&apos;</span>
    }
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015493598?w=1197&amp;h=103" src="https://static.alili.tech/img/remote/1460000015493598?w=1197&amp;h=103" alt="" title="" style="cursor:pointer"></span></p><p>&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x7684;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;<code>X-Test-Cors</code>&#x5728;&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x88AB;&#x5141;&#x8BB8;&#x3002;</p><p>&#x867D;&#x7136;&#x4E0D;&#x5141;&#x8BB8;&#x8DE8;&#x57DF;&#xFF0C;&#x4F46;&#x662F;&#x8BF7;&#x6C42;&#x4ECD;&#x7136;&#x4F1A;&#x53D1;&#x9001;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x6210;&#x529F;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015493599?w=756&amp;h=512" src="https://static.alili.tech/img/remote/1460000015493599?w=756&amp;h=512" alt="" title="" style="cursor:pointer"></span></p><p>&#x9ED8;&#x8BA4;&#x5141;&#x8BB8;&#x7684;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>GET</li><li>HEAD</li><li>POST</li></ul><p>&#x5176;&#x4ED6;&#x7684;&#x65B9;&#x6CD5;(PUT&#x3001;DELETE)&#x90FD;&#x9700;&#x8981;&#x9884;&#x8BF7;&#x6C42;&#x9A8C;&#x8BC1;&#x7684;&#x3002;</p><p>&#x9ED8;&#x8BA4;&#x5141;&#x8BB8;&#x7684;<code>Content-Type</code>:</p><ul><li>text/plain</li><li>multipart/form-data</li><li>application/x-www-form-urlencoded</li></ul><p>&#x600E;&#x6837;&#x8BBE;&#x7F6E;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x7684;&#x8BF7;&#x6C42;&#x5934;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server2.js 
response.writeHead(200, {
  &apos;Access-Control-Allow-Origin&apos;: &apos;*&apos;,
  &apos;Access-Control-Allow-Headers&apos;: &apos;X-Test-Cors&apos; // &#x52A0;&#x4E0A;&#x8FD9;&#x4E2A;&#x8BBE;&#x7F6E;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server2.js </span>
response.writeHead(<span class="hljs-number">200</span>, {
  <span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>: <span class="hljs-string">&apos;*&apos;</span>,
  <span class="hljs-string">&apos;Access-Control-Allow-Headers&apos;</span>: <span class="hljs-string">&apos;X-Test-Cors&apos;</span> <span class="hljs-comment">// &#x52A0;&#x4E0A;&#x8FD9;&#x4E2A;&#x8BBE;&#x7F6E;</span>
})</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015493600?w=1231&amp;h=523" src="https://static.alili.tech/img/remote/1460000015493600?w=1231&amp;h=523" alt="" title="" style="cursor:pointer"></span></p><p>&#x9996;&#x5148;&#x53D1;&#x9001;&#x4E00;&#x4E2A;&#x9884;&#x8BF7;&#x6C42;&#xFF0C;&#x9884;&#x8BF7;&#x6C42;&#x5C31;&#x662F;&#x544A;&#x8BC9;&#x6D4F;&#x89C8;&#x5668;&#x63A5;&#x4E0B;&#x6765;&#x8981;&#x53D1;&#x9001;&#x7684;post&#x8BF7;&#x6C42;&#x662F;&#x88AB;&#x5141;&#x8BB8;&#x7684;&#x3002;</p><p>&#x8BBE;&#x7F6E;&#x5141;&#x8BB8;&#x7684;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server2.js 
response.writeHead(200, {
  &apos;Access-Control-Allow-Origin&apos;: &apos;*&apos;,
  &apos;Access-Control-Allow-Headers&apos;: &apos;X-Test-Cors&apos;,
  &apos;Access-Control-Allow-Methods&apos;: &apos;POST, PUT, DELETE&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server2.js </span>
response.writeHead(<span class="hljs-number">200</span>, {
  <span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>: <span class="hljs-string">&apos;*&apos;</span>,
  <span class="hljs-string">&apos;Access-Control-Allow-Headers&apos;</span>: <span class="hljs-string">&apos;X-Test-Cors&apos;</span>,
  <span class="hljs-string">&apos;Access-Control-Allow-Methods&apos;</span>: <span class="hljs-string">&apos;POST, PUT, DELETE&apos;</span>
})</code></pre><p>&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5B89;&#x5168;&#x65F6;&#x95F4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server2.js 
response.writeHead(200, {
  &apos;Access-Control-Allow-Origin&apos;: &apos;*&apos;,
  &apos;Access-Control-Allow-Headers&apos;: &apos;X-Test-Cors&apos;,
  &apos;Access-Control-Allow-Methods&apos;: &apos;POST, PUT, DELETE&apos;,
  &apos;Access-Control-Max-Age&apos;: &apos;1000&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server2.js </span>
response.writeHead(<span class="hljs-number">200</span>, {
  <span class="hljs-string">&apos;Access-Control-Allow-Origin&apos;</span>: <span class="hljs-string">&apos;*&apos;</span>,
  <span class="hljs-string">&apos;Access-Control-Allow-Headers&apos;</span>: <span class="hljs-string">&apos;X-Test-Cors&apos;</span>,
  <span class="hljs-string">&apos;Access-Control-Allow-Methods&apos;</span>: <span class="hljs-string">&apos;POST, PUT, DELETE&apos;</span>,
  <span class="hljs-string">&apos;Access-Control-Max-Age&apos;</span>: <span class="hljs-string">&apos;1000&apos;</span>
})</code></pre><p><code>Access-Control-Max-Age</code>&#x7684;&#x5355;&#x4F4D;&#x662F;&#x79D2;&#xFF0C;&#x610F;&#x601D;&#x5C31;&#x662F;&#x5728;&#x591A;&#x5C11;&#x79D2;&#x4EE5;&#x5185;&#xFF0C;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x7684;&#x8FD9;&#x4E9B;&#x5141;&#x8BB8;&#x7684;&#x8BF7;&#x6C42;&#x5934;&#xFF0C;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#xFF0C;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x53D1;&#x9001;&#x9884;&#x8BF7;&#x6C42;&#x9A8C;&#x8BC1;&#x7684;&#xFF0C;&#x76F4;&#x63A5;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#xFF0C;&#x5E76;&#x53D1;&#x9001;&#x3002;</p><h3 id="articleHeader19">&#x7F13;&#x5B58;Cache-Control</h3><p>&#x5E38;&#x7528;&#x503C;&#xFF1A;</p><table><thead><tr><th>Cache-Control</th><th>&#x8BF4;&#x660E;</th></tr></thead><tbody><tr><td>public</td><td>&#x6240;&#x6709;&#x5185;&#x5BB9;&#x90FD;&#x5C06;&#x88AB;&#x7F13;&#x5B58;(&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x4EE3;&#x7406;&#x670D;&#x52A1;&#x5668;&#x90FD;&#x53EF;&#x7F13;&#x5B58;)</td></tr><tr><td>private</td><td>&#x5185;&#x5BB9;&#x53EA;&#x7F13;&#x5B58;&#x5230;&#x79C1;&#x6709;&#x7F13;&#x5B58;&#x4E2D;(&#x4EC5;&#x5BA2;&#x6237;&#x7AEF;&#x53EF;&#x4EE5;&#x7F13;&#x5B58;&#xFF0C;&#x4EE3;&#x7406;&#x670D;&#x52A1;&#x5668;&#x4E0D;&#x53EF;&#x7F13;&#x5B58;)</td></tr><tr><td>no-cache</td><td>&#x5FC5;&#x987B;&#x5148;&#x4E0E;&#x670D;&#x52A1;&#x5668;&#x786E;&#x8BA4;&#x8FD4;&#x56DE;&#x7684;&#x54CD;&#x5E94;&#x662F;&#x5426;&#x88AB;&#x66F4;&#x6539;&#xFF0C;&#x7136;&#x540E;&#x624D;&#x80FD;&#x4F7F;&#x7528;&#x8BE5;&#x54CD;&#x5E94;&#x6765;&#x6EE1;&#x8DB3;&#x540E;&#x7EED;&#x5BF9;&#x540C;&#x4E00;&#x4E2A;&#x7F51;&#x5740;&#x7684;&#x8BF7;&#x6C42;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5982;&#x679C;&#x5B58;&#x5728;&#x5408;&#x9002;&#x7684;&#x9A8C;&#x8BC1;&#x4EE4;&#x724C; (ETag)&#xFF0C;no-cache &#x4F1A;&#x53D1;&#x8D77;&#x5F80;&#x8FD4;&#x901A;&#x4FE1;&#x6765;&#x9A8C;&#x8BC1;&#x7F13;&#x5B58;&#x7684;&#x54CD;&#x5E94;&#xFF0C;&#x5982;&#x679C;&#x8D44;&#x6E90;&#x672A;&#x88AB;&#x66F4;&#x6539;&#xFF0C;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x4E0B;&#x8F7D;&#x3002;</td></tr><tr><td>no-store</td><td>&#x6240;&#x6709;&#x5185;&#x5BB9;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x7F13;&#x5B58;&#x5230;&#x7F13;&#x5B58;&#x6216; Internet &#x4E34;&#x65F6;&#x6587;&#x4EF6;&#x4E2D;</td></tr><tr><td>must-revalidation/proxy-revalidation</td><td>&#x5982;&#x679C;&#x7F13;&#x5B58;&#x7684;&#x5185;&#x5BB9;&#x5931;&#x6548;&#xFF0C;&#x8BF7;&#x6C42;&#x5FC5;&#x987B;&#x53D1;&#x9001;&#x5230;&#x670D;&#x52A1;&#x5668;/&#x4EE3;&#x7406;&#x4EE5;&#x8FDB;&#x884C;&#x91CD;&#x65B0;&#x9A8C;&#x8BC1;</td></tr><tr><td>max-age=xxx (xxx is numeric)</td><td>&#x7F13;&#x5B58;&#x7684;&#x5185;&#x5BB9;&#x5C06;&#x5728; xxx &#x79D2;&#x540E;&#x5931;&#x6548;, &#x8FD9;&#x4E2A;&#x9009;&#x9879;&#x53EA;&#x5728;HTTP 1.1&#x53EF;&#x7528;, &#x5E76;&#x5982;&#x679C;&#x548C;Last-Modified&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#x65F6;, &#x4F18;&#x5148;&#x7EA7;&#x8F83;&#x9AD8;</td></tr></tbody></table><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server.js
const http = require(&apos;http&apos;)
const fs = require(&apos;fs&apos;)

http.createServer(function (request, response) {
  console.log(&apos;request come&apos;, request.url)

  if (request.url === &apos;/&apos;) {
    const html = fs.readFileSync(&apos;test.html&apos;, &apos;utf8&apos;)
    response.writeHead(200, {
      &apos;Content-Type&apos;: &apos;text/html&apos;
    })
    response.end(html)
  }

  if (request.url === &apos;/script.js&apos;) {
    response.writeHead(200, {
      &apos;Content-Type&apos;: &apos;text/javascript&apos;,
      &apos;Cache-Control&apos;: &apos;max-age=20,public&apos; // &#x7F13;&#x5B58;20s &#x591A;&#x4E2A;&#x503C;&#x7528;&#x9017;&#x53F7;&#x5206;&#x5F00;
    })
    response.end(&apos;console.log(&quot;script loaded&quot;)&apos;)
  }
}).listen(8888)

console.log(&apos;server listening on 8888&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server.js</span>
<span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;request come&apos;</span>, request.url)

  <span class="hljs-keyword">if</span> (request.url === <span class="hljs-string">&apos;/&apos;</span>) {
    <span class="hljs-keyword">const</span> html = fs.readFileSync(<span class="hljs-string">&apos;test.html&apos;</span>, <span class="hljs-string">&apos;utf8&apos;</span>)
    response.writeHead(<span class="hljs-number">200</span>, {
      <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;text/html&apos;</span>
    })
    response.end(html)
  }

  <span class="hljs-keyword">if</span> (request.url === <span class="hljs-string">&apos;/script.js&apos;</span>) {
    response.writeHead(<span class="hljs-number">200</span>, {
      <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;text/javascript&apos;</span>,
      <span class="hljs-string">&apos;Cache-Control&apos;</span>: <span class="hljs-string">&apos;max-age=20,public&apos;</span> <span class="hljs-comment">// &#x7F13;&#x5B58;20s &#x591A;&#x4E2A;&#x503C;&#x7528;&#x9017;&#x53F7;&#x5206;&#x5F00;</span>
    })
    response.end(<span class="hljs-string">&apos;console.log(&quot;script loaded&quot;)&apos;</span>)
  }
}).listen(<span class="hljs-number">8888</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server listening on 8888&apos;</span>)</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.html
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    
&lt;/body&gt;
&lt;script src=&quot;/script.js&quot;&gt;&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// test.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/script.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015493601?w=1026&amp;h=461" src="https://static.alili.tech/img/remote/1460000015493601?w=1026&amp;h=461" alt="" title="" style="cursor:pointer"></span></p><p>&#x5237;&#x65B0;&#x4F1A;&#x53D1;&#x73B0;<code>script.js</code>&#x662F;&#x4ECE;&#x7F13;&#x5B58;&#x4E2D;&#x83B7;&#x53D6;&#x7684;&#xFF0C;&#x8BF7;&#x6C42;&#x65F6;&#x95F4;&#x4E5F;&#x662F;0&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000015493602?w=1060&amp;h=197" src="https://static.alili.tech/img/remote/1460000015493602?w=1060&amp;h=197" alt="" title="" style="cursor:pointer"></span></p><blockquote>&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;&#x6211;&#x4EEC;&#x7684;&#x56FE;&#x7247;&#xFF0C;&#x6587;&#x4EF6;&#x3001;js&#x4EE3;&#x7801;&#xFF0C;&#x4F46;&#x662F;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4EE3;&#x7801;&#x66F4;&#x65B0;&#x4E86;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x8FD8;&#x662F;&#x5728;&#x7F13;&#x5B58;&#x4E2D;&#x83B7;&#x53D6;&#x7684;&#x65E7;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x8FD9;&#x5C31;&#x8BDE;&#x751F;&#x4E86;&#xFF0C;webpack&#x6253;&#x5305;&#x4E2D;&#x51FA;&#x73B0;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x540E;&#x52A0;&#x4E0A;hash&#x503C;&#xFF0C;&#x5F53;&#x6587;&#x4EF6;&#x6539;&#x53D8;&#x65F6;hash&#x503C;&#x4E5F;&#x6539;&#x53D8;&#xFF0C;&#x8FD9;&#x6837;&#x6D4F;&#x89C8;&#x5668;&#x5C31;&#x4F1A;&#x53D1;&#x9001;&#x65B0;&#x7684;&#x8BF7;&#x6C42;&#x5230;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x3002;</blockquote><h4>&#x7F13;&#x5B58;&#x9A8C;&#x8BC1;</h4><p><span class="img-wrap"><img data-src="/img/remote/1460000015493603?w=736&amp;h=327" src="https://static.alili.tech/img/remote/1460000015493603?w=736&amp;h=327" alt="" title="" style="cursor:pointer"></span></p><p>&#x9A8C;&#x8BC1;&#x5934;&#xFF1A;</p><ul><li>Last-Modified</li></ul><p>&#x4E0A;&#x6B21;&#x4FEE;&#x6539;&#x65F6;&#x95F4;<br>&#x914D;&#x5408;If-Modified-Since&#x6216;&#x8005;If-Unmodified-Since&#x4F7F;&#x7528;<br>&#x5BF9;&#x6BD4;&#x4E0A;&#x6B21;&#x4FEE;&#x6539;&#x65F6;&#x95F4;&#x4EE5;&#x9A8C;&#x8BC1;&#x8D44;&#x6E90;&#x662F;&#x5426;&#x9700;&#x8981;&#x66F4;&#x65B0;</p><ul><li>Etag</li></ul><p>&#x6570;&#x636E;&#x7B7E;&#x540D;(&#x5185;&#x5BB9;&#x4FEE;&#x6539;&#xFF0C;&#x7B7E;&#x540D;&#x5C31;&#x4F1A;&#x6539;&#x53D8;)<br>&#x914D;&#x5408;If-Match&#x6216;&#x8005;If-Non-Match&#x4F7F;&#x7528;<br>&#x5BF9;&#x6BD4;&#x8D44;&#x6E90;&#x7684;&#x7B7E;&#x540D;&#x5224;&#x65AD;&#x662F;&#x5426;&#x4F7F;&#x7528;&#x7F13;&#x5B58;</p><h3 id="articleHeader20">Redirect</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;)

http.createServer(function (request, response) {
  console.log(&apos;request come&apos;, request.url)

  if (request.url === &apos;/&apos;) {
    response.writeHead(302, {  // or 301
      &apos;Location&apos;: &apos;/new&apos;
    })
    response.end()
  }
  if (request.url === &apos;/new&apos;) {
    response.writeHead(200, {
      &apos;Content-Type&apos;: &apos;text/html&apos;,
    })
    response.end(&apos;&lt;div&gt;this is content&lt;/div&gt;&apos;)
  }
}).listen(8888)

console.log(&apos;server listening on 8888&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>)

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, response</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;request come&apos;</span>, request.url)

  <span class="hljs-keyword">if</span> (request.url === <span class="hljs-string">&apos;/&apos;</span>) {
    response.writeHead(<span class="hljs-number">302</span>, {  <span class="hljs-comment">// or 301</span>
      <span class="hljs-string">&apos;Location&apos;</span>: <span class="hljs-string">&apos;/new&apos;</span>
    })
    response.end()
  }
  <span class="hljs-keyword">if</span> (request.url === <span class="hljs-string">&apos;/new&apos;</span>) {
    response.writeHead(<span class="hljs-number">200</span>, {
      <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;text/html&apos;</span>,
    })
    response.end(<span class="hljs-string">&apos;&lt;div&gt;this is content&lt;/div&gt;&apos;</span>)
  }
}).listen(<span class="hljs-number">8888</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server listening on 8888&apos;</span>)</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000015493604?w=824&amp;h=357" src="https://static.alili.tech/img/remote/1460000015493604?w=824&amp;h=357" alt="" title="" style="cursor:pointer"></span></p><blockquote>302&#x4E34;&#x65F6;&#x8DF3;&#x8F6C;&#xFF0C;301&#x6C38;&#x4E45;&#x8DF3;&#x8F6C;&#xFF0C;301&#x4ECE;&#x7F13;&#x5B58;&#x79CD;&#x83B7;&#x53D6;&#x8DF3;&#x8F6C;&#xFF0C;&#x4F7F;&#x7528;301&#x4E4B;&#x540E;&#xFF0C;&#x4E3B;&#x52A8;&#x6743;&#x5C31;&#x638C;&#x63E1;&#x5728;&#x7528;&#x6237;&#x624B;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x7528;&#x6237;&#x4E0D;&#x6E05;&#x7406;&#x7F13;&#x5B58;&#xFF0C;&#x90A3;&#x5C31;&#x7B97;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6539;&#x53D8;&#x4E86;&#x4E5F;&#x6CA1;&#x7528;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000015493605?w=660&amp;h=154" src="https://static.alili.tech/img/remote/1460000015493605?w=660&amp;h=154" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader21">Content Security Policy (&#x7F51;&#x9875;&#x5B89;&#x5168;&#x653F;&#x7B56;)</h3><p><a href="http://www.ruanyifeng.com/blog/2016/09/csp.html" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;:Content Security Policy &#x5165;&#x95E8;&#x6559;&#x7A0B;</a></p><h2 id="articleHeader22">HTTPS</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000015493606?w=1129&amp;h=605" src="https://static.alili.tech/img/remote/1460000015493606?w=1129&amp;h=605" alt="" title="" style="cursor:pointer"></span></p><p>HTTPS&#x548C;HTTP&#x7684;&#x533A;&#x522B;&#x4E3B;&#x8981;&#x4E3A;&#x4EE5;&#x4E0B;&#x56DB;&#x70B9;&#xFF1A;<br>&#x4E00;&#x3001;https&#x534F;&#x8BAE;&#x9700;&#x8981;&#x5230;ca&#x7533;&#x8BF7;&#x8BC1;&#x4E66;&#xFF0C;&#x4E00;&#x822C;&#x514D;&#x8D39;&#x8BC1;&#x4E66;&#x5F88;&#x5C11;&#xFF0C;&#x9700;&#x8981;&#x4EA4;&#x8D39;&#x3002;<br>&#x4E8C;&#x3001;http&#x662F;&#x8D85;&#x6587;&#x672C;&#x4F20;&#x8F93;&#x534F;&#x8BAE;&#xFF0C;&#x4FE1;&#x606F;&#x662F;&#x660E;&#x6587;&#x4F20;&#x8F93;&#xFF0C;https &#x5219;&#x662F;&#x5177;&#x6709;&#x5B89;&#x5168;&#x6027;&#x7684;ssl&#x52A0;&#x5BC6;&#x4F20;&#x8F93;&#x534F;&#x8BAE;&#x3002;<br>&#x4E09;&#x3001;http&#x548C;https&#x4F7F;&#x7528;&#x7684;&#x662F;&#x5B8C;&#x5168;&#x4E0D;&#x540C;&#x7684;&#x8FDE;&#x63A5;&#x65B9;&#x5F0F;&#xFF0C;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#x4E5F;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x524D;&#x8005;&#x662F;80&#xFF0C;&#x540E;&#x8005;&#x662F;443&#x3002;<br>&#x56DB;&#x3001;http&#x7684;&#x8FDE;&#x63A5;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7684;&#xFF1B;HTTPS&#x534F;&#x8BAE;&#x662F;&#x7531;SSL+HTTP&#x534F;&#x8BAE;&#x6784;&#x5EFA;&#x7684;&#x53EF;&#x8FDB;&#x884C;&#x52A0;&#x5BC6;&#x4F20;&#x8F93;&#x3001;&#x8EAB;&#x4EFD;&#x8BA4;&#x8BC1;&#x7684;&#x7F51;&#x7EDC;&#x534F;&#x8BAE;&#xFF0C;&#x6BD4;http&#x534F;&#x8BAE;&#x5B89;&#x5168;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端工程师，揭开HTTP的神秘面纱

## 原文链接
[https://segmentfault.com/a/1190000015493580](https://segmentfault.com/a/1190000015493580)


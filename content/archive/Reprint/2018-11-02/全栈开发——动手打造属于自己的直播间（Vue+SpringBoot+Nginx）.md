---
title: 全栈开发——动手打造属于自己的直播间（Vue+SpringBoot+Nginx）
hidden: true
categories: [reprint]
slug: e3c0a852
date: 2018-11-02 02:30:11
---

{{< raw >}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x5927;&#x5B66;&#x7684;&#x5B66;&#x4E60;&#x65F6;&#x5149;&#x4E34;&#x8FD1;&#x5C3E;&#x58F0;&#xFF0C;&#x611F;&#x53F9;&#x65F6;&#x5149;&#x5306;&#x5306;&#xFF0C;&#x4E09;&#x5E74;&#x4E00;&#x6643;&#x800C;&#x8FC7;&#x3002;&#x540C;&#x5B66;&#x4EEC;&#x90FD;&#x5FD9;&#x7740;&#x627E;&#x5DE5;&#x4F5C;&#xFF0C;&#x6211;&#x4E5F;&#x5728;&#x8FD9;&#x91CC;&#x629B;&#x4E00;&#x4EFD;<a href="http://139.199.82.213:8080/LiveDemo/resume" rel="nofollow noreferrer" target="_blank">&#x7B80;&#x5386;</a>&#x5427;&#xFF0C;&#x6B22;&#x8FCE;&#x5404;&#x4F4D;&#x8001;&#x677F;&#x548C;&#x730E;&#x624B;&#x8BDA;&#x9080;&#x3002;&#x6211;&#x4EEC;&#x8FDB;&#x5165;&#x6B63;&#x9898;&#x3002;&#x76F4;&#x64AD;&#x884C;&#x4E1A;&#x662F;&#x5F53;&#x524D;&#x706B;&#x70ED;&#x7684;&#x884C;&#x4E1A;&#xFF0C;&#x8C01;&#x90FD;&#x60F3;&#x4ECE;&#x4E2D;&#x5206;&#x5F97;&#x4E00;&#x676F;&#x7FB9;&#xFF0C;&#x76F4;&#x64AD;&#x517B;&#x6D3B;&#x4E86;&#x4E00;&#x5927;&#x6279;&#x4EBA;&#xFF0C;&#x4E00;&#x4E2A;&#x5E73;&#x53F0;&#x4E3B;&#x64AD;&#x7C97;&#x7565;&#x4F30;&#x8BA1;&#x5C31;&#x6709;&#x51E0;&#x5343;&#x53F7;&#x4EBA;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x65F6;&#x5728;&#x7EBF;&#x89C2;&#x770B;&#x91CF;&#x6709;&#x7684;&#x5C45;&#x7136;&#x5230;&#x4E86;&#x60CA;&#x4EBA;&#x7684;&#x767E;&#x4E07;&#x7EA7;&#x522B;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x6E38;&#x620F;&#x4E3B;&#x64AD;&#xFF0C;&#x53EF;&#x60F3;&#x800C;&#x77E5;&#xFF0C;&#x76F4;&#x64AD;&#x95F4;&#x662F;&#x4E00;&#x4E2A;&#x78C1;&#x94C1;&#x5F0F;&#x7684;&#x5E7F;&#x544A;&#x4F20;&#x64AD;&#x5A92;&#x4ECB;&#xFF0C;&#x4E5F;&#x96BE;&#x602A;&#x8FD9;&#x4E48;&#x591A;&#x5DE8;&#x5934;&#x516C;&#x53F8;&#x90FD;&#x62A2;&#x7740;&#x505A;&#x76F4;&#x64AD;&#x3002;&#x6211;&#x4E0D;&#x592A;&#x6E05;&#x695A;&#x76F4;&#x64AD;&#x884C;&#x4E1A;&#x6280;&#x672F;&#x6709;&#x591A;&#x6DF1;&#xFF0C;&#x6BD5;&#x7ADF;&#x81EA;&#x5DF1;&#x6CA1;&#x505A;&#x8FC7;&#xFF0C;&#x4F46;&#x662F;&#x54B1;&#x4EEC;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x6EE1;&#x8DB3;&#x51E0;&#x767E;&#x53F7;&#x4EBA;&#x540C;&#x65F6;&#x89C2;&#x770B;&#x7684;&#x76F4;&#x64AD;&#x95F4;&#x5440;&#x3002;</p><hr><h1 id="articleHeader1">&#x6700;&#x7EC8;&#x6210;&#x679C;</h1><ul><li><p><a href="http://139.199.82.213:8080/LiveDemo/live_room" rel="nofollow noreferrer" target="_blank">&#x6F14;&#x793A;&#x5730;&#x5740;(&#x7535;&#x8111;&#x7AEF;&#x4E0E;&#x79FB;&#x52A8;&#x7AEF;&#x6548;&#x679C;&#x4E0D;&#x540C;&#x54E6;)</a></p></li><li><p><a href="https://github.com/jack-hoo/LiveRoomDemo_Server" rel="nofollow noreferrer" target="_blank">&#x670D;&#x52A1;&#x7AEF;&#x9879;&#x76EE;&#x5730;&#x5740;</a></p></li><li><p><a href="https://github.com/jack-hoo/LiveRoomDemo_Client" rel="nofollow noreferrer" target="_blank">&#x5BA2;&#x6237;&#x7AEF;&#x9879;&#x76EE;&#x5730;&#x5740;</a></p></li></ul><blockquote><p>&#x624B;&#x673A;&#x7AEF;&#x6548;&#x679C;</p></blockquote><p><span class="img-wrap"><img data-src="/img/bVPDP5?w=492&amp;h=875" src="https://static.alili.tech/img/bVPDP5?w=492&amp;h=875" alt="&#x52A8;&#x56FE;" title="&#x52A8;&#x56FE;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4E2A;&#x573A;&#x666F;&#x5F88;&#x719F;&#x6089;&#x5427;~~ &#x901A;&#x8FC7;obs&#x63A8;&#x6D41;&#x8F6F;&#x4EF6;&#x6765;&#x63A8;&#x6D41;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVPDQd?w=1080&amp;h=1920" src="https://static.alili.tech/img/bVPDQd?w=1080&amp;h=1920" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6237;&#x5916;&#x76F4;&#x64AD;&#xFF0C;&#x901A;&#x8FC7;yasea&#x624B;&#x673A;&#x7AEF;&#x63A8;&#x6D41;&#x8F6F;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;&#x624B;&#x673A;&#x6444;&#x50CF;&#x5934;&#x63A8;&#x6D41;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVPDYu?w=720&amp;h=1280" src="https://static.alili.tech/img/bVPDYu?w=720&amp;h=1280" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><blockquote><p>&#x7535;&#x8111;&#x7AEF;&#x6548;&#x679C;</p></blockquote><p>&#x64AD;&#x653E;&#x9999;&#x6E2F;&#x536B;&#x89C6;</p><p><span class="img-wrap"><img data-src="/img/bVPDZo?w=1920&amp;h=890" src="https://static.alili.tech/img/bVPDZo?w=1920&amp;h=890" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x76F4;&#x64AD;&#x753B;&#x9762;</p><p><span class="img-wrap"><img data-src="/img/bVPDZ1?w=1920&amp;h=816" src="https://static.alili.tech/img/bVPDZ1?w=1920&amp;h=816" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h1 id="articleHeader2">&#x9879;&#x76EE;&#x603B;&#x89C8;</h1><p>&#x9879;&#x76EE;&#x5206;&#x4E3A;&#x4E09;&#x4E2A;&#x90E8;&#x5206;:</p><ol><li><p><strong>&#x5BA2;&#x6237;&#x7AEF;</strong><br>&#x76F4;&#x64AD;&#x95F4;&#x89C6;&#x9891;&#x62C9;&#x6D41;&#x3001;&#x64AD;&#x653E;&#x548C;&#x804A;&#x5929;&#x5BA4;&#xFF0C;&#x70AB;&#x9177;&#x7684;&#x5F39;&#x5E55;&#x4EE5;&#x53CA;&#x76F4;&#x64AD;&#x95F4;&#x4FE1;&#x606F;</p></li><li><p><strong>&#x670D;&#x52A1;&#x7AEF;</strong><br>&#x5904;&#x7406;&#x76F4;&#x64AD;&#x95F4;&#x3001;&#x7528;&#x6237;&#x7684;&#x6570;&#x636E;&#x4E1A;&#x52A1;,&#x804A;&#x5929;&#x5BA4;&#x6D88;&#x606F;&#x7684;&#x5904;&#x7406;</p></li><li><p><strong>&#x670D;&#x52A1;&#x5668;&#x90E8;&#x7F72;</strong><br>&#x89C6;&#x9891;&#x670D;&#x52A1;&#x5668;&#x548C;web&#x670D;&#x52A1;&#x5668;</p></li></ol><h1 id="articleHeader3">&#x6280;&#x672F;&#x6808;</h1><p><strong>&#x79FB;&#x52A8;&#x5BA2;&#x6237;&#x7AEF;</strong></p><ul><li><p>VUE&#x5168;&#x5BB6;&#x6876;</p></li><li><p>UI&#x5C42;vonic</p></li><li><p>axios</p></li><li><p>&#x89C6;&#x9891;&#x64AD;&#x653E;&#x5668;: vue-video-player + videojs-contrib-hls</p></li><li><p>websocket&#x5BA2;&#x6237;&#x7AEF;: vue-stomp</p></li><li><p>&#x5F39;&#x5E55;&#x63D2;&#x4EF6;: vue-barrage</p></li><li><p>&#x6253;&#x5305;&#x5DE5;&#x5177;:webpack</p></li></ul><p><strong>&#x7535;&#x8111;&#x7AEF;&#x5BA2;&#x6237;&#x7AEF;</strong></p><ul><li><p>&#x9879;&#x76EE;&#x67B6;&#x6784;: Jquery + BootStrap</p></li><li><p>&#x89C6;&#x9891;&#x64AD;&#x653E;&#x5668;: video.js</p></li><li><p>websocket&#x5BA2;&#x6237;&#x7AEF;: stomp.js + sockjs.js</p></li><li><p>&#x5F39;&#x5E55;&#x63D2;&#x4EF6;: Jquery.danmu.js</p></li><li><p>&#x6A21;&#x7248;&#x5F15;&#x64CE;: thymeleaf</p></li></ul><p><strong>&#x670D;&#x52A1;&#x7AEF;</strong></p><ul><li><p>IDE: IntelliJ IDEA</p></li><li><p>&#x9879;&#x76EE;&#x67B6;&#x6784;: SpringBoot1.5.4 +Maven3.0</p></li><li><p>&#x4E3B;&#x6570;&#x636E;&#x5E93;: Mysql5.7</p></li><li><p>&#x8F85;&#x6570;&#x636E;&#x5E93;: redis3.2</p></li><li><p>&#x6570;&#x636E;&#x5E93;&#x8BBF;&#x95EE;&#x5C42;: spring-boot-starter-data-jpa + spring-boot-starter-data-redis</p></li><li><p>websocket: spring-boot-starter-websocket</p></li><li><p>&#x6D88;&#x606F;&#x4E2D;&#x95F4;&#x4EF6;: RabbitMQ/3.6.10</p></li></ul><p><strong>&#x670D;&#x52A1;&#x5668;&#x90E8;&#x7F72;</strong></p><ul><li><p>&#x89C6;&#x9891;&#x76F4;&#x64AD;&#x6A21;&#x5757;: nginx-rtmp-module</p></li><li><p>web&#x5E94;&#x7528;&#x670D;&#x52A1;&#x5668;: tomcat8.0</p></li><li><p>&#x670D;&#x52A1;&#x5668;: &#x817E;&#x8BAF;&#x4E91;centos6.5</p></li></ul><h1 id="articleHeader4">&#x6280;&#x672F;&#x70B9;&#x8BB2;&#x89E3;</h1><h3 id="articleHeader5">&#x76F4;&#x64AD;&#x95F4;&#x4E3B;&#x8981;&#x6D89;&#x53CA;&#x5230;&#x4E24;&#x4E2A;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#xFF1A;&#x7B2C;&#x4E00;&#x662F;&#x89C6;&#x9891;&#x76F4;&#x64AD;&#x3001;&#x7B2C;&#x4E8C;&#x662F;&#x804A;&#x5929;&#x5BA4;&#x3002;&#x8FD9;&#x4E24;&#x4E2A;&#x90FD;&#x662F;&#x975E;&#x5E38;&#x8BB2;&#x7A76;&#x5B9E;&#x65F6;&#x6027;&#x3002;</h3><ul><li><p><strong>&#x89C6;&#x9891;&#x76F4;&#x64AD;</strong></p></li></ul><p>&#x8BF4;&#x5230;&#x76F4;&#x64AD;&#x6211;&#x4EEC;&#x5148;&#x4E86;&#x89E3;&#x4E0B;&#x51E0;&#x4E2A;&#x5E38;&#x7528;&#x7684;&#x76F4;&#x64AD;&#x6D41;&#x534F;&#x8BAE;,&#x770B;&#x4E86;&#x633A;&#x591A;&#x7684;&#x6D41;&#x5A92;&#x4F53;&#x534F;&#x8BAE;&#x6587;&#x7AE0;&#x535A;&#x5BA2;&#xFF0C;&#x4F46;&#x90FD;&#x662F;&#x975E;&#x5E38;&#x7C97;&#x7565;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x6BD4;&#x8F83;&#x8BE6;&#x7EC6;&#x7684;<a href="http://blog.csdn.net/tttyd/article/details/12032357/" rel="nofollow noreferrer" target="_blank"> &#x6D41;&#x5A92;&#x4F53;&#x534F;&#x8BAE;&#x4ECB;&#x7ECD;</a>&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8BE6;&#x7EC6;&#x4E86;&#x89E3;&#x534F;&#x8BAE;&#x5185;&#x5BB9;&#x4F30;&#x8BA1;&#x53BB;&#x8981;&#x770B;&#x770B;&#x4E13;&#x4E1A;&#x4E66;&#x7C4D;&#x4E86;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7528;&#x5230;&#x7684;&#x53EA;&#x662F;rtmp&#x548C;hls&#xFF0C;&#x5B9E;&#x8DF5;&#x540E;&#x53D1;&#x73B0;&#xFF1A;rtmp&#x53EA;&#x80FD;&#x591F;&#x5728;&#x7535;&#x8111;&#x7AEF;&#x64AD;&#x653E;&#xFF0C;hls&#x53EA;&#x80FD;&#x591F;&#x5728;&#x624B;&#x673A;&#x7AEF;&#x64AD;&#x653E;&#x3002;&#x800C;&#x4E14;rtmp&#x662F;&#x76F8;&#x5F53;&#x5FEB;&#x7684;&#x5C3D;&#x7BA1;&#x6CA1;&#x6709;rtsp&#x90A3;&#x4E48;&#x5FEB;&#xFF0C;&#x5EF6;&#x8FDF;&#x53EA;&#x6709;&#x51E0;&#x79D2;&#xFF0C;&#x6211;&#x6D4B;&#x8BD5;&#x7684;&#x5C31;&#x5DEE;&#x4E0D;&#x591A;2-5&#x79D2;&#xFF0C;&#x4F46;&#x662F;hls&#x5927;&#x6982;&#x6709;10&#x51E0;&#x79D2;&#x3002;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x4F60;&#x4F53;&#x9A8C;&#x8FC7;demo,&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#x624B;&#x673A;&#x5EF6;&#x8FDF;&#x6BD4;&#x8F83;&#x591A;&#x3002;</p><p>&#x76F4;&#x64AD;&#x7684;&#x6D41;&#x7A0B;:<br>&#x76F4;&#x64AD;&#x5206;&#x4E3A;&#x63A8;&#x6D41;&#x548C;&#x62C9;&#x6D41;&#x4E24;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x90A3;&#x4E48;&#x6D41;&#x63A8;&#x5411;&#x54EA;&#x91CC;&#xFF0C;&#x62C9;&#x6D41;&#x53C8;&#x4ECE;&#x54EA;&#x91CC;&#x62C9;&#x53D6;&#x5462;&#xFF1F;&#x90A3;&#x5F53;&#x7136;&#x9700;&#x8981;&#x89C6;&#x9891;&#x670D;&#x52A1;&#x5668;&#x5566;&#xFF0C;&#x5343;&#x4E07;&#x4E0D;&#x8981;&#x4EE5;&#x4E3A;&#x89C6;&#x9891;&#x76F4;&#x64AD;&#x670D;&#x52A1;&#x5668;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x5176;&#x5B9E;&#x5728;nginx&#x670D;&#x52A1;&#x5668;&#x4E2D;&#x4E00;&#x5207;&#x90FD;&#x53D8;&#x5F97;&#x7B80;&#x5355;&#x3002;&#x540E;&#x9762;&#x6211;&#x4F1A;&#x8BB2;&#x89E3;&#x5982;&#x4F55;&#x90E8;&#x7F72;Nginx&#x670D;&#x52A1;&#x5668;&#x5E76;&#x914D;&#x7F6E;&#x89C6;&#x9891;&#x6A21;&#x5757;(nginx-rtmp-module).</p><p>&#x9996;&#x5148;&#x4E3B;&#x64AD;&#x901A;&#x8FC7;&#x63A8;&#x6D41;&#x8F6F;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;OBS Studio&#x63A8;&#x6D41;&#x8F6F;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x6BD4;&#x8F83;&#x4E13;&#x4E1A;&#x7EA7;&#x522B;&#x7684;&#xFF0C;&#x5F88;&#x591A;&#x76F4;&#x64AD;&#x5E73;&#x53F0;&#x7684;&#x63A8;&#x8350;&#x4E3B;&#x64AD;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x8F6F;&#x4EF6;&#x6765;&#x63A8;&#x9001;&#x89C6;&#x9891;&#x6D41;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4E5F;&#x63A8;&#x8350;&#x4E00;&#x4E2A;&#x5F00;&#x6E90;&#x7684;&#x5B89;&#x5353;&#x7AEF;&#x63A8;&#x6D41;&#x5DE5;&#x5177;Yasea,<a href="https://pan.baidu.com/s/1gfcgLYb" rel="nofollow noreferrer" target="_blank">&#x4E0B;&#x8F7D;&#x5730;&#x5740;</a>&#xFF0C;&#x6587;&#x4EF6;&#x5F88;&#x5C0F;&#xFF0C;&#x4F46;&#x662F;&#x5F88;&#x5F3A;&#x5927;&#x3002;<br>&#x76F4;&#x64AD;&#x5185;&#x5BB9;&#x63A8;&#x9001;&#x5230;&#x670D;&#x52A1;&#x5668;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4F7F;&#x7528;&#x89C6;&#x9891;&#x7F16;&#x7801;&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x8F6C;&#x7801;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x8F6C;&#x6362;&#x6210;&#x5404;&#x79CD;&#x9AD8;&#x6E05;&#xFF0C;&#x6807;&#x6E05;&#xFF0C;&#x8D85;&#x6E05;&#x7684;&#x5206;&#x8FA8;&#x7387;&#x89C6;&#x9891;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x4EEC;&#x5728;&#x5404;&#x4E2A;&#x89C6;&#x9891;&#x7F51;&#x7AD9;&#x90FD;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x89C6;&#x9891;&#x6E05;&#x6670;&#x5EA6;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x8F6C;&#x7801;&#xFF0C;&#x53EA;&#x662F;&#x901A;&#x8FC7;&#x524D;&#x7AEF;&#x89C6;&#x9891;&#x64AD;&#x653E;&#x5668;(video.js)&#x6765;&#x62C9;&#x53D6;&#x89C6;&#x9891;.&#x8FD9;&#x6837;&#x6574;&#x4E2A;&#x89C6;&#x9891;&#x63A8;&#x6D41;&#x62C9;&#x6D41;&#x8FC7;&#x7A0B;&#x5C31;&#x5B8C;&#x6210;&#x4E86;&#x3002;</p><ul><li><p><strong>&#x804A;&#x5929;&#x5BA4;</strong></p></li></ul><p>&#x76F4;&#x64AD;&#x95F4;&#x91CC;&#x9762;&#x7684;&#x804A;&#x5929;&#x5BA4;&#x8DDF;&#x6211;&#x4EEC;&#x7684;&#x7FA4;&#x804A;&#x5929;&#x5DEE;&#x4E0D;&#x591A;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x5B83;&#x53D8;&#x6210;&#x4E86;web&#x7AEF;&#xFF0C;web&#x7AEF;&#x7684;&#x5373;&#x65F6;&#x901A;&#x4FE1;&#x65B9;&#x6848;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9009;&#x62E9;websocket&#x534F;&#x8BAE;&#x6765;&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x901A;&#x4FE1;&#xFF0C;websocket&#x662F;&#x57FA;&#x4E8E;http&#x4E4B;&#x4E0A;&#x7684;&#x4F20;&#x8F93;&#x534F;&#x8BAE;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001;http&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x643A;&#x5E26;Upgrade:websocket&#x5347;&#x7EA7;&#x5934;&#x4FE1;&#x606F;&#x8868;&#x793A;&#x8F6C;&#x6362;websocket&#x534F;&#x8BAE;&#xFF0C;&#x901A;&#x8FC7;&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x63E1;&#x624B;&#x6210;&#x529F;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5EFA;&#x7ACB;tcp&#x901A;&#x9053;&#xFF0C;&#x7531;&#x6B64;&#x6765;&#x4F20;&#x9012;&#x6D88;&#x606F;&#xFF0C;&#x5B83;&#x4E0E;http&#x6700;&#x5927;&#x7684;&#x5DEE;&#x522B;&#x5C31;&#x662F;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x53EF;&#x4EE5;&#x4E3B;&#x52A8;&#x5411;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6D88;&#x606F;&#x3002;</p><p>&#x65E2;&#x7136;&#x5EFA;&#x7ACB;&#x4E86;&#x6D88;&#x606F;&#x901A;&#x9053;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x5F80;&#x901A;&#x9053;&#x91CC;&#x53D1;&#x6D88;&#x606F;&#xFF0C;&#x4F46;&#x662F;&#x603B;&#x5F97;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#x6765;&#x7BA1;&#x63A7;&#x6D88;&#x606F;&#x8BE5;&#x53D1;&#x7ED9;&#x8C01;&#x5427;&#xFF0C;&#x8981;&#x4E0D;&#x7136;&#x5168;&#x4E71;&#x5957;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x4E86;&#x6D88;&#x606F;&#x4E2D;&#x95F4;&#x4EF6;RabbitMQ.&#x4F7F;&#x7528;&#x5B83;&#x6765;&#x8D1F;&#x8D23;&#x6D88;&#x606F;&#x7684;&#x8DEF;&#x7531;&#x53BB;&#x5411;&#x3002;</p><hr><h2 id="articleHeader6"><strong>&#x7406;&#x8BBA;&#x77E5;&#x8BC6;&#x90FD;&#x8BB2;&#x5B8C;&#x5566;&#xFF0C;&#x5B9E;&#x64CD;&#x65F6;&#x95F4;&#x5230;!</strong></h2><h1 id="articleHeader7">&#x79FB;&#x52A8;&#x5BA2;&#x6237;&#x7AEF;&#x5B9E;&#x64CD;</h1><p><strong><a href="https://github.com/jack-hoo/LiveRoomDemo_Client" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#x5730;&#x5740;</a></strong></p><h2 id="articleHeader8">&#x5DE5;&#x7A0B;&#x7ED3;&#x6784;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|&#x2014;&#x2014; build                        &#x6784;&#x5EFA;&#x670D;&#x52A1;&#x548C;webpack&#x914D;&#x7F6E;        
|&#x2014;&#x2014; congfig                      &#x9879;&#x76EE;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;
|&#x2014;&#x2014; dist                         build&#x751F;&#x6210;&#x751F;&#x4EA7;&#x76EE;&#x5F55;
|&#x2014;&#x2014; static                       &#x9759;&#x6001;&#x8D44;&#x6E90;
|&#x2014;&#x2014; package.json                 &#x9879;&#x76EE;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
|&#x2014;&#x2014; src                          &#x5F00;&#x53D1;&#x6E90;&#x4EE3;&#x7801;&#x76EE;&#x5F55;
    |&#x2014;&#x2014; api                      &#x901A;&#x8FC7;axios&#x5BFC;&#x51FA;&#x7684;api&#x76EE;&#x5F55;
    |&#x2014;&#x2014; components               &#x9875;&#x9762;&#x548C;&#x7EC4;&#x4EF6;
    |&#x2014;&#x2014; public                   &#x516C;&#x6709;&#x7EC4;&#x4EF6;
    |&#x2014;&#x2014; vuex                     &#x5168;&#x5C40;&#x72B6;&#x6001;
    |&#x2014;&#x2014; main.js                  &#x5E94;&#x7528;&#x542F;&#x52A8;&#x914D;&#x7F6E;&#x70B9;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">|&#x2014;&#x2014; build                        &#x6784;&#x5EFA;&#x670D;&#x52A1;&#x548C;webpack&#x914D;&#x7F6E;        </span>
<span class="hljs-string">|&#x2014;&#x2014; congfig                      &#x9879;&#x76EE;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;</span>
<span class="hljs-string">|&#x2014;&#x2014; dist                         build&#x751F;&#x6210;&#x751F;&#x4EA7;&#x76EE;&#x5F55;</span>
<span class="hljs-string">|&#x2014;&#x2014; static                       &#x9759;&#x6001;&#x8D44;&#x6E90;</span>
<span class="hljs-string">|&#x2014;&#x2014; package.json                 &#x9879;&#x76EE;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
<span class="hljs-string">|&#x2014;&#x2014; src                          &#x5F00;&#x53D1;&#x6E90;&#x4EE3;&#x7801;&#x76EE;&#x5F55;</span>
    <span class="hljs-string">|&#x2014;&#x2014; api                      &#x901A;&#x8FC7;axios&#x5BFC;&#x51FA;&#x7684;api&#x76EE;&#x5F55;</span>
    <span class="hljs-string">|&#x2014;&#x2014; components               &#x9875;&#x9762;&#x548C;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-string">|&#x2014;&#x2014; public                   &#x516C;&#x6709;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-string">|&#x2014;&#x2014; vuex                     &#x5168;&#x5C40;&#x72B6;&#x6001;</span>
    <span class="hljs-string">|&#x2014;&#x2014; main.js                  &#x5E94;&#x7528;&#x542F;&#x52A8;&#x914D;&#x7F6E;&#x70B9;</span></code></pre><h2 id="articleHeader9">&#x529F;&#x80FD;&#x6A21;&#x5757;</h2><ul><li><p>&#x62C9;&#x53D6;&#x670D;&#x52A1;&#x5668;&#x7684;&#x76F4;&#x64AD;&#x89C6;&#x9891;&#x6D41;(hls)&#x5E76;&#x64AD;&#x653E;&#x76F4;&#x64AD;&#x753B;&#x9762;</p></li><li><p>&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x521B;&#x5EFA;websocket&#x8FDE;&#x63A5;&#xFF0C;&#x6536;&#x53D1;&#x804A;&#x5929;&#x5BA4;&#x6D88;&#x606F;</p></li><li><p>&#x901A;&#x8FC7;websocket&#x83B7;&#x53D6;&#x6D88;&#x606F;&#x5E76;&#x53D1;&#x9001;&#x5230;&#x5F39;&#x5E55;</p></li><li><p>&#x901A;&#x8FC7;websocket&#x5B9E;&#x65F6;&#x66F4;&#x65B0;&#x5728;&#x7EBF;&#x7528;&#x6237;</p></li><li><p>&#x7ED3;&#x5408;&#x670D;&#x52A1;&#x7AEF;&#x83B7;&#x53D6;&#x8BBF;&#x95EE;&#x5386;&#x53F2;&#x8BB0;&#x5F55;</p></li><li><p>&#x95EE;&#x9898;&#x53CD;&#x9988;&#x6A21;&#x5757;</p></li></ul><h2 id="articleHeader10">&#x6548;&#x679C;&#x56FE;</h2><p><span class="img-wrap"><img data-src="/img/remote/1460000009892011?w=492&amp;h=875" src="https://static.alili.tech/img/remote/1460000009892011?w=492&amp;h=875" alt="&#x5168;&#x5C40;&#x529F;&#x80FD;" title="&#x5168;&#x5C40;&#x529F;&#x80FD;" style="cursor:pointer"></span></p><h2 id="articleHeader11">&#x9879;&#x76EE;&#x8BF4;&#x660E;</h2><p><strong><a href="https://github.com/jack-hoo/LiveRoomDemo_Client" rel="nofollow noreferrer" target="_blank">&#x8BF7;&#x53C2;&#x8003;&#x6E90;&#x7801;</a></strong></p><h1 id="articleHeader12">&#x670D;&#x52A1;&#x7AEF;&#x5B9E;&#x64CD;</h1><p><strong><a href="https://github.com/jack-hoo/LiveRoomDemo_Server" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#x5730;&#x5740;</a></strong></p><p>&#x7531;&#x4E8E;&#x4E2A;&#x4EBA;&#x6BD4;&#x8F83;&#x559C;&#x6B22;&#x63A5;&#x89E6;&#x65B0;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x6240;&#x4EE5;&#x540E;&#x7AEF;&#x9009;&#x62E9;&#x4E86;springboot&#xFF0C;&#x524D;&#x7AEF;&#x9009;&#x62E9;&#x4E86;Vue.js&#x5E74;&#x8F7B;&#x4EBA;&#x561B;&#x603B;&#x5F97;&#x8DDF;&#x4E0A;&#x6F6E;&#x6D41;&#x3002;SpringBoot&#x5B9E;&#x8DF5;&#x8FC7;&#x540E;&#x53D1;&#x73B0;&#x771F;&#x7684;&#x592A;&#x7701;&#x5FC3;&#x4E86;&#xFF0C;&#x4E0D;&#x7528;&#x518D;&#x7406;&#x4F1A;&#x5404;&#x79CD;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5168;&#x81EA;&#x52A8;&#x5316;&#x88C5;&#x914D;&#x3002;<br>&#x8FD9;&#x91CC;&#x8D34;&#x4E00;&#x4E0B;pom.xml</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot; xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
    xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.hushangjie&lt;/groupId&gt;
    &lt;artifactId&gt;rtmp-demo&lt;/artifactId&gt;
    &lt;version&gt;0.0.1-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;name&gt;rtmp-demo&lt;/name&gt;
    &lt;description&gt;Demo project for Spring Boot&lt;/description&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;1.5.4.RELEASE&lt;/version&gt;
        &lt;relativePath/&gt; &lt;!-- lookup parent from repository --&gt;
    &lt;/parent&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;project.reporting.outputEncoding&gt;UTF-8&lt;/project.reporting.outputEncoding&gt;
        &lt;java.version&gt;1.8&lt;/java.version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-devtools&lt;/artifactId&gt;
            &lt;optional&gt;true&lt;/optional&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-actuator-docs&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-redis&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;!--&lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt;
        &lt;/dependency&gt;--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-thymeleaf&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;!--&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x89E3;&#x6790;HTML5--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;net.sourceforge.nekohtml&lt;/groupId&gt;
            &lt;artifactId&gt;nekohtml&lt;/artifactId&gt;
            &lt;version&gt;1.9.22&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
            &lt;!-- &#x6253;&#x5305;&#x6210;war&#x65F6;&#x53EF;&#x4EE5;&#x79FB;&#x9664;&#x5D4C;&#x5165;&#x5F0F;tomcat&#x63D2;&#x4EF6; --&gt;
            &lt;!--&lt;exclusions&gt;
                &lt;exclusion&gt;
                    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                    &lt;artifactId&gt;spring-boot-starter-tomcat&lt;/artifactId&gt;
                &lt;/exclusion&gt;
            &lt;/exclusions&gt;--&gt;
        &lt;/dependency&gt;
        &lt;!--&lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;3.1.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-websocket&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;
            &lt;scope&gt;test&lt;/scope&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.webjars&lt;/groupId&gt;
            &lt;artifactId&gt;vue&lt;/artifactId&gt;
            &lt;version&gt;2.1.3&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;joda-time&lt;/groupId&gt;
            &lt;artifactId&gt;joda-time&lt;/artifactId&gt;
            &lt;version&gt;2.9.2&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;!-- RabbitMQ&#x76F8;&#x5173;&#x914D;&#x7F6E;--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.projectreactor&lt;/groupId&gt;
            &lt;artifactId&gt;reactor-core&lt;/artifactId&gt;
            &lt;version&gt;2.0.8.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;io.projectreactor&lt;/groupId&gt;
            &lt;artifactId&gt;reactor-net&lt;/artifactId&gt;
            &lt;version&gt;2.0.8.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;io.netty&lt;/groupId&gt;
            &lt;artifactId&gt;netty-all&lt;/artifactId&gt;
            &lt;version&gt;4.1.6.Final&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
                &lt;configuration&gt;
                    &lt;fork&gt;true&lt;/fork&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;


&lt;/project&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?</span>xml version=<span class="hljs-string">&quot;1.0&quot;</span> encoding=<span class="hljs-string">&quot;UTF-8&quot;</span><span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">project</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">&quot;http://maven.apache.org/POM/4.0.0&quot;</span> <span class="hljs-attr">xmlns:xsi</span>=<span class="hljs-string">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span>
    <span class="hljs-attr">xsi:schemaLocation</span>=<span class="hljs-string">&quot;http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">modelVersion</span>&gt;</span>4.0.0<span class="hljs-tag">&lt;/<span class="hljs-name">modelVersion</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>com.hushangjie<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>rtmp-demo<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>0.0.1-SNAPSHOT<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">packaging</span>&gt;</span>jar<span class="hljs-tag">&lt;/<span class="hljs-name">packaging</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>rtmp-demo<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">description</span>&gt;</span>Demo project for Spring Boot<span class="hljs-tag">&lt;/<span class="hljs-name">description</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">parent</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-parent<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.5.4.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">relativePath</span>/&gt;</span> <span class="hljs-comment">&lt;!-- lookup parent from repository --&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">parent</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">properties</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">project.build.sourceEncoding</span>&gt;</span>UTF-8<span class="hljs-tag">&lt;/<span class="hljs-name">project.build.sourceEncoding</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">project.reporting.outputEncoding</span>&gt;</span>UTF-8<span class="hljs-tag">&lt;/<span class="hljs-name">project.reporting.outputEncoding</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">java.version</span>&gt;</span>1.8<span class="hljs-tag">&lt;/<span class="hljs-name">java.version</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">properties</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">dependencies</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-devtools<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">optional</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">optional</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-actuator<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-actuator-docs<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-data-jpa<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-data-redis<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-security&lt;/artifactId&gt;
        &lt;/dependency&gt;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-thymeleaf<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&#x975E;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x89E3;&#x6790;HTML5--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>net.sourceforge.nekohtml<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>nekohtml<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>1.9.22<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-web<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- &#x6253;&#x5305;&#x6210;war&#x65F6;&#x53EF;&#x4EE5;&#x79FB;&#x9664;&#x5D4C;&#x5165;&#x5F0F;tomcat&#x63D2;&#x4EF6; --&gt;</span>
            <span class="hljs-comment">&lt;!--&lt;exclusions&gt;
                &lt;exclusion&gt;
                    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                    &lt;artifactId&gt;spring-boot-starter-tomcat&lt;/artifactId&gt;
                &lt;/exclusion&gt;
            &lt;/exclusions&gt;--&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-comment">&lt;!--&lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;3.1.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-websocket<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-starter-test<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">scope</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">scope</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.webjars<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>vue<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.1.3<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>mysql<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>mysql-connector-java<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>joda-time<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>joda-time<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.9.2<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- RabbitMQ&#x76F8;&#x5173;&#x914D;&#x7F6E;--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>io.projectreactor<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>reactor-core<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.0.8.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>io.projectreactor<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>reactor-net<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>2.0.8.RELEASE<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>io.netty<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>netty-all<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>4.1.6.Final<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">dependencies</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">build</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">plugins</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">plugin</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>org.springframework.boot<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>spring-boot-maven-plugin<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">configuration</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">fork</span>&gt;</span>true<span class="hljs-tag">&lt;/<span class="hljs-name">fork</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">configuration</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">plugin</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">plugins</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">build</span>&gt;</span>


<span class="hljs-tag">&lt;/<span class="hljs-name">project</span>&gt;</span>
</code></pre><p>application.properties&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="spring.datasource.url=jdbc:mysql://host:3306/database?characterEncoding=utf8&amp;amp;useSSL=false
spring.datasource.username=username
spring.datasource.password=password
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.thymeleaf.mode=LEGACYHTML5
server.port=8085
# REDIS (RedisProperties)
# Redis&#x6570;&#x636E;&#x5E93;&#x7D22;&#x5F15;&#xFF08;&#x9ED8;&#x8BA4;&#x4E3A;0&#xFF09;
spring.redis.database=0  
# Redis&#x670D;&#x52A1;&#x5668;&#x5730;&#x5740;
spring.redis.host=127.0.0.1
# Redis&#x670D;&#x52A1;&#x5668;&#x8FDE;&#x63A5;&#x7AEF;&#x53E3;
spring.redis.port=6379  
# Redis&#x670D;&#x52A1;&#x5668;&#x8FDE;&#x63A5;&#x5BC6;&#x7801;&#xFF08;&#x9ED8;&#x8BA4;&#x4E3A;&#x7A7A;&#xFF09;
spring.redis.password=
# &#x8FDE;&#x63A5;&#x6C60;&#x6700;&#x5927;&#x8FDE;&#x63A5;&#x6570;&#xFF08;&#x4F7F;&#x7528;&#x8D1F;&#x503C;&#x8868;&#x793A;&#x6CA1;&#x6709;&#x9650;&#x5236;&#xFF09;
spring.redis.pool.max-active=8  
# &#x8FDE;&#x63A5;&#x6C60;&#x6700;&#x5927;&#x963B;&#x585E;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#xFF08;&#x4F7F;&#x7528;&#x8D1F;&#x503C;&#x8868;&#x793A;&#x6CA1;&#x6709;&#x9650;&#x5236;&#xFF09;
spring.redis.pool.max-wait=-1  
# &#x8FDE;&#x63A5;&#x6C60;&#x4E2D;&#x7684;&#x6700;&#x5927;&#x7A7A;&#x95F2;&#x8FDE;&#x63A5;
spring.redis.pool.max-idle=8  
# &#x8FDE;&#x63A5;&#x6C60;&#x4E2D;&#x7684;&#x6700;&#x5C0F;&#x7A7A;&#x95F2;&#x8FDE;&#x63A5;
spring.redis.pool.min-idle=0  
# &#x8FDE;&#x63A5;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#xFF08;&#x6BEB;&#x79D2;&#xFF09;
spring.redis.timeout=0 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>spring.datasource.<span class="hljs-attr">url=jdbc:mysql://host:3306/database?characterEncoding=utf8&amp;amp;useSSL=false</span>
spring.datasource.<span class="hljs-attr">username=username</span>
spring.datasource.<span class="hljs-attr">password=password</span>
spring.datasource.<span class="hljs-attr">driver-class-name=com.mysql.jdbc.Driver</span>
spring.thymeleaf.<span class="hljs-attr">mode=LEGACYHTML5</span>
server.<span class="hljs-attr">port=8085</span>
<span class="hljs-comment"># REDIS (RedisProperties)</span>
<span class="hljs-comment"># Redis&#x6570;&#x636E;&#x5E93;&#x7D22;&#x5F15;&#xFF08;&#x9ED8;&#x8BA4;&#x4E3A;0&#xFF09;</span>
spring.redis.<span class="hljs-attr">database=0</span>  
<span class="hljs-comment"># Redis&#x670D;&#x52A1;&#x5668;&#x5730;&#x5740;</span>
spring.redis.<span class="hljs-attr">host=127.0.0.1</span>
<span class="hljs-comment"># Redis&#x670D;&#x52A1;&#x5668;&#x8FDE;&#x63A5;&#x7AEF;&#x53E3;</span>
spring.redis.<span class="hljs-attr">port=6379</span>  
<span class="hljs-comment"># Redis&#x670D;&#x52A1;&#x5668;&#x8FDE;&#x63A5;&#x5BC6;&#x7801;&#xFF08;&#x9ED8;&#x8BA4;&#x4E3A;&#x7A7A;&#xFF09;</span>
spring.redis.<span class="hljs-attr">password=</span>
<span class="hljs-comment"># &#x8FDE;&#x63A5;&#x6C60;&#x6700;&#x5927;&#x8FDE;&#x63A5;&#x6570;&#xFF08;&#x4F7F;&#x7528;&#x8D1F;&#x503C;&#x8868;&#x793A;&#x6CA1;&#x6709;&#x9650;&#x5236;&#xFF09;</span>
spring.redis.pool.<span class="hljs-attr">max-active=8</span>  
<span class="hljs-comment"># &#x8FDE;&#x63A5;&#x6C60;&#x6700;&#x5927;&#x963B;&#x585E;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#xFF08;&#x4F7F;&#x7528;&#x8D1F;&#x503C;&#x8868;&#x793A;&#x6CA1;&#x6709;&#x9650;&#x5236;&#xFF09;</span>
spring.redis.pool.<span class="hljs-attr">max-wait=-1</span>  
<span class="hljs-comment"># &#x8FDE;&#x63A5;&#x6C60;&#x4E2D;&#x7684;&#x6700;&#x5927;&#x7A7A;&#x95F2;&#x8FDE;&#x63A5;</span>
spring.redis.pool.<span class="hljs-attr">max-idle=8</span>  
<span class="hljs-comment"># &#x8FDE;&#x63A5;&#x6C60;&#x4E2D;&#x7684;&#x6700;&#x5C0F;&#x7A7A;&#x95F2;&#x8FDE;&#x63A5;</span>
spring.redis.pool.<span class="hljs-attr">min-idle=0</span>  
<span class="hljs-comment"># &#x8FDE;&#x63A5;&#x8D85;&#x65F6;&#x65F6;&#x95F4;&#xFF08;&#x6BEB;&#x79D2;&#xFF09;</span>
spring.redis.<span class="hljs-attr">timeout=0</span> </code></pre><h2 id="articleHeader13">websocket&#x914D;&#x7F6E;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
    //&#x62E6;&#x622A;&#x5668;&#x6CE8;&#x5165;service&#x5931;&#x8D25;&#x89E3;&#x51B3;&#x529E;&#x6CD5;
    @Bean
    public MyChannelInterceptor myChannelInterceptor(){
        return new MyChannelInterceptor();
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        //&#x6DFB;&#x52A0;&#x8BBF;&#x95EE;&#x57DF;&#x540D;&#x9650;&#x5236;&#x53EF;&#x4EE5;&#x9632;&#x6B62;&#x8DE8;&#x57DF;socket&#x8FDE;&#x63A5;
        //setAllowedOrigins(&quot;http://localhost:8085&quot;)
        registry.addEndpoint(&quot;/live&quot;).setAllowedOrigins(&quot;*&quot;).addInterceptors(new HandShkeInceptor()).withSockJS();

    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        /*.enableSimpleBroker(&quot;/topic&quot;,&quot;/queue&quot;);*/
        //&#x5047;&#x5982;&#x9700;&#x8981;&#x7B2C;&#x4E09;&#x65B9;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF0C;&#x6BD4;&#x5982;rabitMQ,activeMq&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;
        registry.setApplicationDestinationPrefixes(&quot;/demo&quot;)
                .enableStompBrokerRelay(&quot;/topic&quot;,&quot;/queue&quot;)
                .setRelayHost(&quot;127.0.0.1&quot;)
                .setRelayPort(61613)
                .setClientLogin(&quot;guest&quot;)
                .setClientPasscode(&quot;guest&quot;)
                .setSystemLogin(&quot;guest&quot;)
                .setSystemPasscode(&quot;guest&quot;)
                .setSystemHeartbeatSendInterval(5000)
                .setSystemHeartbeatReceiveInterval(4000);
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        ChannelRegistration channelRegistration = registration.setInterceptors(myChannelInterceptor());
        super.configureClientInboundChannel(registration);
    }

    @Override
    public void configureClientOutboundChannel(ChannelRegistration registration) {
        super.configureClientOutboundChannel(registration);
    }

}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-meta">@Configuration</span>
<span class="hljs-meta">@EnableWebSocketMessageBroker</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WebSocketConfig</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">AbstractWebSocketMessageBrokerConfigurer</span> </span>{
    <span class="hljs-comment">//&#x62E6;&#x622A;&#x5668;&#x6CE8;&#x5165;service&#x5931;&#x8D25;&#x89E3;&#x51B3;&#x529E;&#x6CD5;</span>
    <span class="hljs-meta">@Bean</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> MyChannelInterceptor <span class="hljs-title">myChannelInterceptor</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> MyChannelInterceptor();
    }
    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">registerStompEndpoints</span><span class="hljs-params">(StompEndpointRegistry registry)</span> </span>{
        <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x8BBF;&#x95EE;&#x57DF;&#x540D;&#x9650;&#x5236;&#x53EF;&#x4EE5;&#x9632;&#x6B62;&#x8DE8;&#x57DF;socket&#x8FDE;&#x63A5;</span>
        <span class="hljs-comment">//setAllowedOrigins(&quot;http://localhost:8085&quot;)</span>
        registry.addEndpoint(<span class="hljs-string">&quot;/live&quot;</span>).setAllowedOrigins(<span class="hljs-string">&quot;*&quot;</span>).addInterceptors(<span class="hljs-keyword">new</span> HandShkeInceptor()).withSockJS();

    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">configureMessageBroker</span><span class="hljs-params">(MessageBrokerRegistry registry)</span> </span>{
        <span class="hljs-comment">/*.enableSimpleBroker(&quot;/topic&quot;,&quot;/queue&quot;);*/</span>
        <span class="hljs-comment">//&#x5047;&#x5982;&#x9700;&#x8981;&#x7B2C;&#x4E09;&#x65B9;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF0C;&#x6BD4;&#x5982;rabitMQ,activeMq&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;</span>
        registry.setApplicationDestinationPrefixes(<span class="hljs-string">&quot;/demo&quot;</span>)
                .enableStompBrokerRelay(<span class="hljs-string">&quot;/topic&quot;</span>,<span class="hljs-string">&quot;/queue&quot;</span>)
                .setRelayHost(<span class="hljs-string">&quot;127.0.0.1&quot;</span>)
                .setRelayPort(<span class="hljs-number">61613</span>)
                .setClientLogin(<span class="hljs-string">&quot;guest&quot;</span>)
                .setClientPasscode(<span class="hljs-string">&quot;guest&quot;</span>)
                .setSystemLogin(<span class="hljs-string">&quot;guest&quot;</span>)
                .setSystemPasscode(<span class="hljs-string">&quot;guest&quot;</span>)
                .setSystemHeartbeatSendInterval(<span class="hljs-number">5000</span>)
                .setSystemHeartbeatReceiveInterval(<span class="hljs-number">4000</span>);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">configureClientInboundChannel</span><span class="hljs-params">(ChannelRegistration registration)</span> </span>{
        ChannelRegistration channelRegistration = registration.setInterceptors(myChannelInterceptor());
        <span class="hljs-keyword">super</span>.configureClientInboundChannel(registration);
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">configureClientOutboundChannel</span><span class="hljs-params">(ChannelRegistration registration)</span> </span>{
        <span class="hljs-keyword">super</span>.configureClientOutboundChannel(registration);
    }

}
</code></pre><p>&#x914D;&#x7F6E;&#x7C7B;&#x7EE7;&#x627F;&#x4E86;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#x914D;&#x7F6E;&#x7C7B;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x6211;&#x4EEC;&#x5C06;&#x4F7F;&#x7528;&#x6D88;&#x606F;&#x4EE3;&#x7406;rabbitmq.&#x4F7F;&#x7528;registerStompEndpoints&#x65B9;&#x6CD5;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;websocket&#x7EC8;&#x7AEF;&#x8FDE;&#x63A5;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x4E24;&#x4E2A;&#x4E1C;&#x897F;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x662F;stomp&#x548C;sockjs,sockjs&#x662F;&#x5565;&#x5462;&#xFF0C;&#x5176;&#x5B9E;&#x5B83;&#x662F;&#x5BF9;&#x4E8E;websocket&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x5355;&#x7EAF;&#x4F7F;&#x7528;websocket&#x7684;&#x8BDD;&#x6548;&#x7387;&#x4F1A;&#x975E;&#x5E38;&#x4F4E;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x7F16;&#x7801;&#x91CF;&#x4E5F;&#x4F1A;&#x589E;&#x591A;&#xFF0C;&#x800C;&#x4E14;&#x5982;&#x679C;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;websocket&#xFF0C;sockjs&#x4F1A;&#x81EA;&#x52A8;&#x964D;&#x7EA7;&#x4E3A;&#x8F6E;&#x8BE2;&#x7B56;&#x7565;&#xFF0C;&#x5E76;&#x6A21;&#x62DF;websocket,&#x4FDD;&#x8BC1;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#x53EF;&#x4EE5;&#x901A;&#x4FE1;&#x3002;<br>stomp&#x6709;&#x662F;&#x4EC0;&#x4E48;<a href="http://blog.csdn.net/chszs/article/details/46592777" rel="nofollow noreferrer" target="_blank">&#x770B;&#x8FD9;&#x91CC;</a></p><p>stomp&#x662F;&#x4E00;&#x79CD;&#x7B80;&#x5355;(&#x6D41;)&#x6587;&#x672C;&#x5B9A;&#x5411;&#x6D88;&#x606F;&#x534F;&#x8BAE;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x53EF;&#x4E92;&#x64CD;&#x4F5C;&#x7684;&#x8FDE;&#x63A5;&#x683C;&#x5F0F;&#xFF0C;&#x5141;&#x8BB8;STOMP&#x5BA2;&#x6237;&#x7AEF;&#x4E0E;&#x4EFB;&#x610F;STOMP&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF08;Broker&#xFF09;&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x7684;RabbbitMQ,&#x5B83;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#x3002;<br>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;configureMessageBroker&#x6765;&#x914D;&#x7F6E;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x6211;&#x4EEC;&#x5C06;&#x8981;&#x90E8;&#x7F72;&#x7684;&#x670D;&#x52A1;&#x5668;&#x4E5F;&#x5E94;&#x8BE5;&#x8981;&#x6709;RabbitMQ&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5B89;&#x88C5;&#x975E;&#x5E38;&#x5BB9;&#x6613;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8BF4;&#x660E;&#x4E86;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x914D;&#x7F6E;&#x4E86;&#x201C;/topic,/queue&#x201D;&#x4E24;&#x4E2A;&#x4EE3;&#x7406;&#x8F6C;&#x64AD;&#x7B56;&#x7565;&#xFF0C;&#x5C31;&#x662F;&#x8BF4;&#x5BA2;&#x6237;&#x7AEF;&#x8BA2;&#x9605;&#x4E86;&#x524D;&#x7F00;&#x4E3A;&#x201C;/topic,/queue&#x201D;&#x9891;&#x9053;&#x90FD;&#x4F1A;&#x901A;&#x8FC7;&#x6D88;&#x606F;&#x4EE3;&#x7406;(RabbitMQ)&#x6765;&#x8F6C;&#x53D1;&#x3002;&#x8DDF;spring&#x6CA1;&#x5565;&#x5173;&#x7CFB;&#x5566;&#xFF0C;&#x5B8C;&#x5168;&#x89E3;&#x8026;&#x3002;</p><h2 id="articleHeader14">websocke&#x5982;&#x4F55;&#x4FDD;&#x8BC1;&#x5B89;&#x5168;</h2><p>&#x4E00;&#x5F00;&#x59CB;&#x63A5;&#x89E6; stomp&#x7684;&#x65F6;&#x5019;&#x4E00;&#x76F4;&#x6709;&#x4E2A;&#x95EE;&#x9898;&#x56F0;&#x6270;&#x6211;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x53EA;&#x8981;&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x901A;&#x8FC7;websocket&#x5EFA;&#x7ACB;&#x4E86;&#x8FDE;&#x63A5;&#xFF0C;&#x90A3;&#x4E48;&#x4ED6;&#x5C31;&#x53EF;&#x4EE5;&#x8BA2;&#x9605;&#x4EFB;&#x4F55;&#x5185;&#x5BB9;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x4EFB;&#x4F55;&#x6D88;&#x606F;&#xFF0C;&#x8FD9;&#x6837;&#x5C82;&#x4E0D;&#x662F;&#x4E71;&#x4E86;&#x5957;&#x5566;&#xFF0C;&#x4E8E;&#x662F;&#x6211;&#x7FFB;&#x9605;&#x4E86;&#x5927;&#x91CF;&#x535A;&#x5BA2;&#x6587;&#x7AE0;&#xFF0C;&#x5F88;&#x591A;&#x90FD;&#x662F;&#x5B98;&#x65B9;&#x7684;&#x4F8B;&#x5B50;&#x5E76;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#x5B9E;&#x9645;&#x95EE;&#x9898;&#x3002;&#x7ECF;&#x8FC7;&#x7422;&#x78E8;&#xFF0C;&#x5176;&#x5B9E;websocket&#x662F;&#x8981;&#x8003;&#x8651;&#x5B89;&#x5168;&#x6027;&#x7684;&#x3002;&#x5177;&#x4F53;&#x5728;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x65B9;&#x9762;</p><ol><li><p>&#x8DE8;&#x57DF;websocket&#x8FDE;&#x63A5;</p></li><li><p>&#x534F;&#x8BAE;&#x5347;&#x7EA7;&#x524D;&#x63E1;&#x624B;&#x62E6;&#x622A;&#x5668;</p></li><li><p>&#x6D88;&#x606F;&#x4FE1;&#x9053;&#x62E6;&#x622A;&#x5668;</p></li></ol><p>&#x5BF9;&#x4E8E;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;setAllowedOrigins&#x65B9;&#x6CD5;&#x6765;&#x8BBE;&#x7F6E;&#x53EF;&#x8FDE;&#x63A5;&#x7684;&#x57DF;&#x540D;&#xFF0C;&#x9632;&#x6B62;&#x8DE8;&#x7AD9;&#x8FDE;&#x63A5;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x7AD9;&#x5185;&#x7528;&#x6237;&#x662F;&#x5426;&#x5141;&#x8BB8;&#x8FDE;&#x63A5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5982;&#x4E0B;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class HandShkeInceptor extends HttpSessionHandshakeInterceptor {
    private static final Set&lt;UserEntity&gt; ONLINE_USERS = new HashSet&lt;&gt;();
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map&lt;String, Object&gt; attributes) throws Exception {

        System.out.println(&quot;&#x63E1;&#x624B;&#x524D;&quot;+request.getURI());
        //http&#x534F;&#x8BAE;&#x8F6C;&#x6362;websoket&#x534F;&#x8BAE;&#x8FDB;&#x884C;&#x524D;&#xFF0C;&#x901A;&#x5E38;&#x8FD9;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5224;&#x65AD;&#x7528;&#x6237;&#x5408;&#x6CD5;&#x6027;&#x7B49;
        //&#x9274;&#x522B;&#x7528;&#x6237;
       if (request instanceof ServletServerHttpRequest) {
            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
           //&#x8FD9;&#x53E5;&#x8BDD;&#x5F88;&#x91CD;&#x8981;&#x5982;&#x679C;getSession(true)&#x4F1A;&#x5BFC;&#x81F4;&#x79FB;&#x52A8;&#x7AEF;&#x65E0;&#x6CD5;&#x63E1;&#x624B;&#x6210;&#x529F;
           //request.getSession(true)&#xFF1A;&#x82E5;&#x5B58;&#x5728;&#x4F1A;&#x8BDD;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x4F1A;&#x8BDD;&#xFF0C;&#x5426;&#x5219;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x4F1A;&#x8BDD;&#x3002;
           //request.getSession(false)&#xFF1A;&#x82E5;&#x5B58;&#x5728;&#x4F1A;&#x8BDD;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x4F1A;&#x8BDD;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;NULL
           //HttpSession session = servletRequest.getServletRequest().getSession(false);
            HttpSession session = servletRequest.getServletRequest().getSession();
            UserEntity user = (UserEntity) session.getAttribute(&quot;user&quot;);
            if (user != null) {
                //&#x8FD9;&#x91CC;&#x53EA;&#x4F7F;&#x7528;&#x7B80;&#x5355;&#x7684;session&#x6765;&#x5B58;&#x50A8;&#x7528;&#x6237;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E86;springsecurity&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;principal
                return super.beforeHandshake(request, response, wsHandler, attributes);
            }else {
                System.out.println(&quot;&#x7528;&#x6237;&#x672A;&#x767B;&#x5F55;&#xFF0C;&#x63E1;&#x624B;&#x5931;&#x8D25;&#xFF01;&quot;);
                return false;
            }
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception ex) {
        //&#x63E1;&#x624B;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x901A;&#x5E38;&#x7528;&#x6765;&#x6CE8;&#x518C;&#x7528;&#x6237;&#x4FE1;&#x606F;
        System.out.println(&quot;&#x63E1;&#x624B;&#x540E;&quot;);
        super.afterHandshake(request, response, wsHandler, ex);
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HandShkeInceptor</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">HttpSessionHandshakeInterceptor</span> </span>{
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">final</span> Set&lt;UserEntity&gt; ONLINE_USERS = <span class="hljs-keyword">new</span> HashSet&lt;&gt;();
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">boolean</span> <span class="hljs-title">beforeHandshake</span><span class="hljs-params">(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map&lt;String, Object&gt; attributes)</span> <span class="hljs-keyword">throws</span> Exception </span>{

        System.out.println(<span class="hljs-string">&quot;&#x63E1;&#x624B;&#x524D;&quot;</span>+request.getURI());
        <span class="hljs-comment">//http&#x534F;&#x8BAE;&#x8F6C;&#x6362;websoket&#x534F;&#x8BAE;&#x8FDB;&#x884C;&#x524D;&#xFF0C;&#x901A;&#x5E38;&#x8FD9;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5224;&#x65AD;&#x7528;&#x6237;&#x5408;&#x6CD5;&#x6027;&#x7B49;</span>
        <span class="hljs-comment">//&#x9274;&#x522B;&#x7528;&#x6237;</span>
       <span class="hljs-keyword">if</span> (request <span class="hljs-keyword">instanceof</span> ServletServerHttpRequest) {
            ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
           <span class="hljs-comment">//&#x8FD9;&#x53E5;&#x8BDD;&#x5F88;&#x91CD;&#x8981;&#x5982;&#x679C;getSession(true)&#x4F1A;&#x5BFC;&#x81F4;&#x79FB;&#x52A8;&#x7AEF;&#x65E0;&#x6CD5;&#x63E1;&#x624B;&#x6210;&#x529F;</span>
           <span class="hljs-comment">//request.getSession(true)&#xFF1A;&#x82E5;&#x5B58;&#x5728;&#x4F1A;&#x8BDD;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x4F1A;&#x8BDD;&#xFF0C;&#x5426;&#x5219;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x4F1A;&#x8BDD;&#x3002;</span>
           <span class="hljs-comment">//request.getSession(false)&#xFF1A;&#x82E5;&#x5B58;&#x5728;&#x4F1A;&#x8BDD;&#x5219;&#x8FD4;&#x56DE;&#x8BE5;&#x4F1A;&#x8BDD;&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE;NULL</span>
           <span class="hljs-comment">//HttpSession session = servletRequest.getServletRequest().getSession(false);</span>
            HttpSession session = servletRequest.getServletRequest().getSession();
            UserEntity user = (UserEntity) session.getAttribute(<span class="hljs-string">&quot;user&quot;</span>);
            <span class="hljs-keyword">if</span> (user != <span class="hljs-keyword">null</span>) {
                <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x53EA;&#x4F7F;&#x7528;&#x7B80;&#x5355;&#x7684;session&#x6765;&#x5B58;&#x50A8;&#x7528;&#x6237;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E86;springsecurity&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;principal</span>
                <span class="hljs-function"><span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.<span class="hljs-title">beforeHandshake</span><span class="hljs-params">(request, response, wsHandler, attributes)</span></span>;
            }<span class="hljs-keyword">else</span> {
                System.out.println(<span class="hljs-string">&quot;&#x7528;&#x6237;&#x672A;&#x767B;&#x5F55;&#xFF0C;&#x63E1;&#x624B;&#x5931;&#x8D25;&#xFF01;&quot;</span>);
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">afterHandshake</span><span class="hljs-params">(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception ex)</span> </span>{
        <span class="hljs-comment">//&#x63E1;&#x624B;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x901A;&#x5E38;&#x7528;&#x6765;&#x6CE8;&#x518C;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
        System.out.println(<span class="hljs-string">&quot;&#x63E1;&#x624B;&#x540E;&quot;</span>);
        <span class="hljs-keyword">super</span>.afterHandshake(request, response, wsHandler, ex);
    }
}</code></pre><p>HttpSessionHandshakeInterceptor &#x8FD9;&#x4E2A;&#x62E6;&#x622A;&#x5668;&#x7528;&#x6765;&#x7BA1;&#x7406;&#x63E1;&#x624B;&#x548C;&#x63E1;&#x624B;&#x540E;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BF7;&#x6C42;&#x4FE1;&#x606F;&#xFF0C;&#x6BD4;&#x5982;token&#x3001;&#x6216;&#x8005;session&#x5224;&#x7528;&#x6237;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x8FDE;&#x63A5;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x591F;&#x9632;&#x8303;&#x975E;&#x6CD5;&#x7528;&#x6237;&#x3002;</p><p>&#x90A3;&#x5982;&#x4F55;&#x9650;&#x5236;&#x7528;&#x6237;&#x53EA;&#x80FD;&#x8BA2;&#x9605;&#x6307;&#x5B9A;&#x5185;&#x5BB9;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x63A5;&#x7740;&#x5F80;&#x4E0B;&#x770B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class MyChannelInterceptor extends ChannelInterceptorAdapter {
    @Autowired
    private StatDao statDao;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public boolean preReceive(MessageChannel channel) {
        System.out.println(&quot;preReceive&quot;);
        return super.preReceive(channel);
    }

    @Override
    public Message&lt;?&gt; preSend(Message&lt;?&gt; message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        //&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x5185;&#x5BB9;&#xFF08;&#x9632;&#x6B62;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x4E0D;&#x5408;&#x6CD5;&#x9891;&#x9053;&#xFF09;
        if (StompCommand.SUBSCRIBE.equals(command)) {
            //&#x4ECE;&#x6570;&#x636E;&#x5E93;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x9891;&#x9053;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;(&#x8FD9;&#x91CC;&#x4E3A;&#x4E86;&#x6F14;&#x793A;&#x76F4;&#x63A5;&#x4F7F;&#x7528;set&#x96C6;&#x5408;&#x4EE3;&#x66FF;)
            Set&lt;String&gt; subedChannelInDB = new HashSet&lt;&gt;();
            subedChannelInDB.add(&quot;/topic/group&quot;);
            subedChannelInDB.add(&quot;/topic/online_user&quot;);
            if (subedChannelInDB.contains(accessor.getDestination())) {
                //&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x5408;&#x6CD5;
                return super.preSend(message, channel);
            } else {
                //&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x4E0D;&#x5408;&#x6CD5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;null&#x524D;&#x7AEF;&#x7528;&#x6237;&#x5C31;&#x63A5;&#x53D7;&#x4E0D;&#x5230;&#x8BE5;&#x9891;&#x9053;&#x4FE1;&#x606F;&#x3002;
                return null;
            }
        } else {
            return super.preSend(message, channel);
        }

    }
    @Override
    public void afterSendCompletion(Message&lt;?&gt; message, MessageChannel channel, boolean sent, Exception ex) {
        //System.out.println(&quot;afterSendCompletion&quot;);
        //&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x662F;&#x5426;&#x8FDE;&#x63A5;&#x6210;&#x529F;&#xFF0C;&#x641C;&#x96C6;&#x5728;&#x7EBF;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x5982;&#x679C;&#x6570;&#x636E;&#x91CF;&#x8FC7;&#x5927;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x5E93;&#x6BD4;&#x5982;redis,
        //&#x8FD9;&#x91CC;&#x7531;&#x4E8E;&#x9700;&#x8981;&#x9891;&#x7E41;&#x7684;&#x5220;&#x9664;&#x548C;&#x589E;&#x52A0;&#x96C6;&#x5408;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;set&#x96C6;&#x5408;&#x6765;&#x5B58;&#x50A8;&#x5728;&#x7EBF;&#x7528;&#x6237;
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        if (StompCommand.SUBSCRIBE.equals(command)){
            Map&lt;String,UserEntity&gt; map = (Map&lt;String, UserEntity&gt;) accessor.getHeader(&quot;simpSessionAttributes&quot;);
            //ONLINE_USERS.add(map.get(&quot;user&quot;));
            UserEntity user = map.get(&quot;user&quot;);
            if(user != null){
                statDao.pushOnlineUser(user);
                Guest guest = new Guest();
                guest.setUserEntity(user);
                guest.setAccessTime(Calendar.getInstance().getTimeInMillis());
                statDao.pushGuestHistory(guest);
                //&#x901A;&#x8FC7;websocket&#x5B9E;&#x65F6;&#x8FD4;&#x56DE;&#x5728;&#x7EBF;&#x4EBA;&#x6570;
                this.simpMessagingTemplate.convertAndSend(&quot;/topic/online_user&quot;,statDao.getAllUserOnline());
            }

        }
        //&#x5982;&#x679C;&#x7528;&#x6237;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;&#xFF0C;&#x5220;&#x9664;&#x7528;&#x6237;&#x4FE1;&#x606F;
        if (StompCommand.DISCONNECT.equals(command)){
            Map&lt;String,UserEntity&gt; map = (Map&lt;String, UserEntity&gt;) accessor.getHeader(&quot;simpSessionAttributes&quot;);
            //ONLINE_USERS.remove(map.get(&quot;user&quot;));
            UserEntity user = map.get(&quot;user&quot;);
            if (user != null){
                statDao.popOnlineUser(user);
                simpMessagingTemplate.convertAndSend(&quot;/topic/online_user&quot;,statDao.getAllUserOnline());
            }

        }
        super.afterSendCompletion(message, channel, sent, ex);
    }

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-keyword">public</span> class MyChannelInterceptor extends ChannelInterceptorAdapter {
    @Autowired
    <span class="hljs-keyword">private</span> StatDao statDao;
    @Autowired
    <span class="hljs-keyword">private</span> SimpMessagingTemplate simpMessagingTemplate;

    @Override
    <span class="hljs-keyword">public</span> <span class="hljs-built_in">boolean</span> preReceive(MessageChannel channel) {
        System.out.<span class="hljs-built_in">println</span>(<span class="hljs-string">&quot;preReceive&quot;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.preReceive(channel);
    }

    @Override
    <span class="hljs-keyword">public</span> Message&lt;?&gt; preSend(Message&lt;?&gt; message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        <span class="hljs-comment">//&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x5185;&#x5BB9;&#xFF08;&#x9632;&#x6B62;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x4E0D;&#x5408;&#x6CD5;&#x9891;&#x9053;&#xFF09;</span>
        <span class="hljs-keyword">if</span> (StompCommand.SUBSCRIBE.equals(command)) {
            <span class="hljs-comment">//&#x4ECE;&#x6570;&#x636E;&#x5E93;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x9891;&#x9053;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;(&#x8FD9;&#x91CC;&#x4E3A;&#x4E86;&#x6F14;&#x793A;&#x76F4;&#x63A5;&#x4F7F;&#x7528;set&#x96C6;&#x5408;&#x4EE3;&#x66FF;)</span>
            Set&lt;<span class="hljs-keyword">String</span>&gt; subedChannelInDB = <span class="hljs-keyword">new</span> HashSet&lt;&gt;();
            subedChannelInDB.<span class="hljs-built_in">add</span>(<span class="hljs-string">&quot;/topic/group&quot;</span>);
            subedChannelInDB.<span class="hljs-built_in">add</span>(<span class="hljs-string">&quot;/topic/online_user&quot;</span>);
            <span class="hljs-keyword">if</span> (subedChannelInDB.contains(accessor.getDestination())) {
                <span class="hljs-comment">//&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x5408;&#x6CD5;</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.preSend(message, channel);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">//&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x4E0D;&#x5408;&#x6CD5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;null&#x524D;&#x7AEF;&#x7528;&#x6237;&#x5C31;&#x63A5;&#x53D7;&#x4E0D;&#x5230;&#x8BE5;&#x9891;&#x9053;&#x4FE1;&#x606F;&#x3002;</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.preSend(message, channel);
        }

    }
    @Override
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> afterSendCompletion(Message&lt;?&gt; message, MessageChannel channel, <span class="hljs-built_in">boolean</span> sent, Exception ex) {
        <span class="hljs-comment">//System.out.println(&quot;afterSendCompletion&quot;);</span>
        <span class="hljs-comment">//&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x662F;&#x5426;&#x8FDE;&#x63A5;&#x6210;&#x529F;&#xFF0C;&#x641C;&#x96C6;&#x5728;&#x7EBF;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x5982;&#x679C;&#x6570;&#x636E;&#x91CF;&#x8FC7;&#x5927;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x5E93;&#x6BD4;&#x5982;redis,</span>
        <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x7531;&#x4E8E;&#x9700;&#x8981;&#x9891;&#x7E41;&#x7684;&#x5220;&#x9664;&#x548C;&#x589E;&#x52A0;&#x96C6;&#x5408;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;set&#x96C6;&#x5408;&#x6765;&#x5B58;&#x50A8;&#x5728;&#x7EBF;&#x7528;&#x6237;</span>
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        <span class="hljs-keyword">if</span> (StompCommand.SUBSCRIBE.equals(command)){
            Map&lt;<span class="hljs-keyword">String</span>,UserEntity&gt; <span class="hljs-built_in">map</span> = (Map&lt;<span class="hljs-keyword">String</span>, UserEntity&gt;) accessor.getHeader(<span class="hljs-string">&quot;simpSessionAttributes&quot;</span>);
            <span class="hljs-comment">//ONLINE_USERS.add(map.get(&quot;user&quot;));</span>
            UserEntity user = <span class="hljs-built_in">map</span>.<span class="hljs-built_in">get</span>(<span class="hljs-string">&quot;user&quot;</span>);
            <span class="hljs-keyword">if</span>(user != <span class="hljs-keyword">null</span>){
                statDao.pushOnlineUser(user);
                Guest guest = <span class="hljs-keyword">new</span> Guest();
                guest.setUserEntity(user);
                guest.setAccessTime(Calendar.getInstance().getTimeInMillis());
                statDao.pushGuestHistory(guest);
                <span class="hljs-comment">//&#x901A;&#x8FC7;websocket&#x5B9E;&#x65F6;&#x8FD4;&#x56DE;&#x5728;&#x7EBF;&#x4EBA;&#x6570;</span>
                <span class="hljs-keyword">this</span>.simpMessagingTemplate.convertAndSend(<span class="hljs-string">&quot;/topic/online_user&quot;</span>,statDao.getAllUserOnline());
            }

        }
        <span class="hljs-comment">//&#x5982;&#x679C;&#x7528;&#x6237;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;&#xFF0C;&#x5220;&#x9664;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
        <span class="hljs-keyword">if</span> (StompCommand.DISCONNECT.equals(command)){
            Map&lt;<span class="hljs-keyword">String</span>,UserEntity&gt; <span class="hljs-built_in">map</span> = (Map&lt;<span class="hljs-keyword">String</span>, UserEntity&gt;) accessor.getHeader(<span class="hljs-string">&quot;simpSessionAttributes&quot;</span>);
            <span class="hljs-comment">//ONLINE_USERS.remove(map.get(&quot;user&quot;));</span>
            UserEntity user = <span class="hljs-built_in">map</span>.<span class="hljs-built_in">get</span>(<span class="hljs-string">&quot;user&quot;</span>);
            <span class="hljs-keyword">if</span> (user != <span class="hljs-keyword">null</span>){
                statDao.popOnlineUser(user);
                simpMessagingTemplate.convertAndSend(<span class="hljs-string">&quot;/topic/online_user&quot;</span>,statDao.getAllUserOnline());
            }

        }
        <span class="hljs-keyword">super</span>.afterSendCompletion(message, channel, sent, ex);
    }

}</code></pre><p>&#x5728;stomp&#x91CC;&#x9762;&#xFF0C;Channel&#x4FE1;&#x9053;&#x5C31;&#x662F;&#x6D88;&#x606F;&#x4F20;&#x9001;&#x7684;&#x901A;&#x9053;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x4E0E;&#x670D;&#x52A1;&#x7AEF;&#x5EFA;&#x7ACB;&#x4E86;&#x8FDE;&#x63A5;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x5EFA;&#x7ACB;&#x4E86;&#x901A;&#x9053;&#xFF0C;&#x4EE5;&#x540E;&#x7684;&#x4FE1;&#x606F;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x901A;&#x9053;&#x6765;&#x4F20;&#x8F93;&#x3002;&#x6240;&#x6709;&#x7684;&#x6D88;&#x606F;&#x90FD;&#x6709;&#x6D88;&#x606F;&#x5934;&#xFF0C;&#x88AB;&#x5C01;&#x88C5;&#x5728;&#x4E86;spring &#x7684;messag&#x63A5;&#x53E3;&#x4E2D;&#xFF0C;&#x6BD4;&#x5982;&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#x65F6;&#x5019;&#x6D88;&#x606F;&#x5934;&#x5C31;&#x542B;&#x6709;CONNECT,&#x5F53;&#x7136;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x4FE1;&#x606F;&#x3002;&#x5BA2;&#x6237;&#x7AEF;&#x8BA2;&#x9605;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x6709;&#x8BA2;&#x9605;&#x5934;&#x4FE1;&#x606F;SUBSCRIBE&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x662F;&#x4E0D;&#x662F;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E2A;&#x62E6;&#x622A;&#x5668;ChannelInterceptorAdapter &#x4E2D;&#x62E6;&#x622A;&#x6BCF;&#x4E2A;&#x4EBA;&#x7684;&#x8BA2;&#x9605;&#x4FE1;&#x606F;&#xFF0C;&#x7136;&#x540E;&#x4E0E;&#x6570;&#x636E;&#x5E93;&#x7684;&#x4FE1;&#x606F;&#x4F5C;&#x6BD4;&#x5BF9;&#xFF0C;&#x6700;&#x540E;&#x51B3;&#x5B9A;&#x8FD9;&#x4E2A;&#x7528;&#x6237;&#x662F;&#x5426;&#x53EF;&#x4EE5;&#x8BA2;&#x9605;&#x8FD9;&#x4E2A;&#x9891;&#x9053;&#x7684;&#x4FE1;&#x606F;&#x5462;&#xFF0C;&#x5BF9;&#x7684;&#xFF0C;&#x8FD9;&#x662F;&#x6211;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x6309;&#x7167;&#x8FD9;&#x6837;&#x7684;&#x601D;&#x8DEF;&#xFF0C;&#x505A;&#x5355;&#x804A;&#x4E0D;&#x662F;&#x8FCE;&#x5203;&#x800C;&#x89E3;&#x4E86;&#x5417;&#x3002;<br>&#x90A3;&#x5BA2;&#x6237;&#x7AEF;&#x901A;&#x8FC7;websocket&#x53D1;&#x9001;&#x7684;&#x6D88;&#x606F;&#x5982;&#x4F55;&#x5230;&#x8FBE;&#x8BA2;&#x9605;&#x8005;&#x624B;&#x4E2D;&#x5462;&#xFF0C;&#x6309;&#x7167;rabbitmq&#x7684;&#x89C4;&#x5219;&#xFF0C;&#x8BA2;&#x9605;&#x8005;&#x5C5E;&#x4E8E;&#x6D88;&#x8D39;&#x8005;&#xFF0C;&#x53D1;&#x9001;&#x6D88;&#x606F;&#x7684;&#x4E00;&#x65B9;&#x5C5E;&#x4E8E;&#x751F;&#x4EA7;&#x8005;&#xFF0C;&#x751F;&#x4EA7;&#x8005;&#x901A;&#x8FC7;websocket&#x628A;&#x6D88;&#x606F;&#x53D1;&#x9001;&#x5230;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x901A;&#x8FC7;&#x8F6C;&#x53D1;&#x7ED9;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF08;rabbitmq&#xFF09;,&#x6D88;&#x606F;&#x4EE3;&#x7406;&#x8D1F;&#x8D23;&#x5B58;&#x50A8;&#x6D88;&#x606F;&#xFF0C;&#x7BA1;&#x7406;&#x53D1;&#x9001;&#x89C4;&#x5219;&#xFF0C;&#x63A8;&#x9001;&#x6D88;&#x606F;&#x7ED9;&#x8BA2;&#x9605;&#x8005;&#xFF0C;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    @MessageMapping(value = &quot;/chat&quot;)
    @SendTo(&quot;/topic/group&quot;)
    public MsgEntity testWst(String message , @Header(value = &quot;simpSessionAttributes&quot;) Map&lt;String,Object&gt; session){
        UserEntity user = (UserEntity) session.get(&quot;user&quot;);
        String username = user.getRandomName();
        MsgEntity msg = new MsgEntity();
        msg.setCreator(username);
        msg.setsTime(Calendar.getInstance());
        msg.setMsgBody(message);
        return msg;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>    <span class="hljs-meta">@MessageMapping</span>(value = <span class="hljs-string">&quot;/chat&quot;</span>)
    <span class="hljs-meta">@SendTo</span>(<span class="hljs-string">&quot;/topic/group&quot;</span>)
    public MsgEntity testWst(<span class="hljs-built_in">String</span> message , <span class="hljs-meta">@Header</span>(value = <span class="hljs-string">&quot;simpSessionAttributes&quot;</span>) <span class="hljs-built_in">Map</span>&lt;<span class="hljs-built_in">String</span>,<span class="hljs-built_in">Object</span>&gt; session){
        UserEntity user = (UserEntity) session.<span class="hljs-keyword">get</span>(<span class="hljs-string">&quot;user&quot;</span>);
        <span class="hljs-built_in">String</span> username = user.getRandomName();
        MsgEntity msg = <span class="hljs-keyword">new</span> MsgEntity();
        msg.setCreator(username);
        msg.setsTime(Calendar.getInstance());
        msg.setMsgBody(message);
        <span class="hljs-keyword">return</span> msg;
    }</code></pre><p>@MessageMapping&#x770B;&#x8D77;&#x6765;&#x8DDF;springmvc&#x65B9;&#x6CD5;&#x7279;&#x522B;&#x50CF;&#xFF0C;&#x5B83;&#x5373;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x7C7B;&#x7EA7;&#x522B;&#x4E0A;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x65B9;&#x6CD5;&#x7EA7;&#x522B;&#x4E0A;<br>&#x5F53;&#x53D1;&#x9001;&#x8005;&#x5F80;&#x2018;/chat&#x2019;&#x53D1;&#x9001;&#x6D88;&#x606F;&#x540E;&#xFF0C;&#x670D;&#x52A1;&#x7AEF;&#x63A5;&#x53D7;&#x5230;&#x6D88;&#x606F;&#xFF0C;&#x518D;&#x53D1;&#x9001;&#x7ED9;&#x201C;/topic/group&#x201D;&#x7684;&#x8BA2;&#x9605;&#x8005;&#xFF0C;@SendTo&#x5C31;&#x662F;&#x53D1;&#x9001;&#x7ED9;&#x8C01;&#xFF0C;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x6709;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF0C;&#x53EA;&#x4F7F;&#x7528;&#x4E86;enableSimpleBroker(&quot;/topic&quot;,&quot;/queue&quot;)&#x7B80;&#x5355;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x662F;&#x76F4;&#x63A5;&#x53D1;&#x9001;&#x5230;&#x6D88;&#x606F;&#x8BA2;&#x9605;&#x8005;&#xFF0C;&#x5982;&#x679C;&#x914D;&#x7F6E;&#x4E86;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF0C;&#x90A3;&#x8FD8;&#x8981;&#x901A;&#x8FC7;&#x6D88;&#x606F;&#x4EE3;&#x7406;&#xFF0C;&#x7531;&#x5B83;&#x6765;&#x8F6C;&#x53D1;&#x3002;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x968F;&#x65F6;&#x53D1;&#x9001;&#x6D88;&#x606F;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#xFF08;&#x8FD9;&#x6837;&#x7684;&#x573A;&#x666F;&#x5F88;&#x5E38;&#x89C1;&#xFF0C;&#x6BD4;&#x5982;&#x53D1;&#x9001;&#x5168;&#x5C40;&#x901A;&#x77E5;&#xFF09;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;SimpMessagingTemplate&#x7C7B;&#xFF0C;&#x901A;&#x8FC7;&#x6CE8;&#x5165;&#x8BE5;bean,&#x5728;&#x5408;&#x9002;&#x7684;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#x4E2D;&#x53D1;&#x9001;&#x6D88;&#x606F;&#x3002;</p><h2 id="articleHeader15">Redis&#x7EDF;&#x8BA1;&#x6570;&#x636E;</h2><p>&#x76F4;&#x64AD;&#x95F4;&#x7ECF;&#x5E38;&#x9700;&#x8981;&#x7EDF;&#x8BA1;&#x6570;&#x636E;&#xFF0C;&#x6BD4;&#x5982;&#x5B9E;&#x65F6;&#x5728;&#x7EBF;&#x4EBA;&#x6570;&#xFF0C;&#x8BBF;&#x95EE;&#x91CF;&#xFF0C;&#x8D21;&#x732E;&#x6392;&#x884C;&#x699C;&#xFF0C;&#x8BA2;&#x9605;&#x91CF;&#x3002;&#x6211;&#x9009;&#x62E9;&#x7684;&#x65B9;&#x6848;&#x662F;&#x4F7F;&#x7528;redis&#x6765;&#x8BA1;&#x6570;&#xFF0C;&#x5C3D;&#x7BA1;&#x8FD9;&#x4E2A;demo&#x53EF;&#x80FD;&#x4E0D;&#x4F1A;&#x592A;&#x591A;&#x4EBA;&#x8BBF;&#x95EE;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x7684;&#x76EE;&#x7684;&#x662F;&#x5B66;&#x4E60;&#x5982;&#x4F55;&#x4F7F;&#x7528;redis<br>&#x5148;&#x770B;springboot&#x4E2D;redis&#x7684;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Configuration
public class RedisConfig extends CachingConfigurerSupport{
    /**
     * &#x751F;&#x6210;key&#x7684;&#x7B56;&#x7565;
     *
     * @return
     */
    @Bean
    public KeyGenerator keyGenerator() {
        return new KeyGenerator() {
            @Override
            public Object generate(Object target, Method method, Object... params) {
                StringBuilder sb = new StringBuilder();
                sb.append(target.getClass().getName());
                sb.append(method.getName());
                for (Object obj : params) {
                    sb.append(obj.toString());
                }
                return sb.toString();
            }
        };
    }

    /**
     * &#x7BA1;&#x7406;&#x7F13;&#x5B58;
     *
     * @param redisTemplate
     * @return
     */
    @SuppressWarnings(&quot;rawtypes&quot;)
    @Bean
    public CacheManager cacheManager(RedisTemplate redisTemplate) {
        RedisCacheManager rcm = new RedisCacheManager(redisTemplate);
        //&#x8BBE;&#x7F6E;&#x7F13;&#x5B58;&#x8FC7;&#x671F;&#x65F6;&#x95F4;
        // rcm.setDefaultExpiration(60);//&#x79D2;
        //&#x8BBE;&#x7F6E;value&#x7684;&#x8FC7;&#x671F;&#x65F6;&#x95F4;
        Map&lt;String,Long&gt; map=new HashMap();
        map.put(&quot;test&quot;,60L);
        rcm.setExpires(map);
        return rcm;
    }

    /**
     * RedisTemplate&#x914D;&#x7F6E;
     * @param factory
     * @return
     */
    @Bean
    public RedisTemplate&lt;String, String&gt; redisTemplate(RedisConnectionFactory factory) {
        StringRedisTemplate template = new StringRedisTemplate(factory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setValueSerializer(jackson2JsonRedisSerializer);//&#x5982;&#x679C;key&#x662F;String &#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E00;&#x4E0B;StringSerializer,&#x4E0D;&#x7136;key&#x4F1A;&#x4E71;&#x7801; /XX/XX
        template.afterPropertiesSet();
        //template.setStringSerializer();
        return template;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs aspectj"><code><span class="hljs-meta">@Configuration</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">RedisConfig</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">CachingConfigurerSupport</span></span>{
    <span class="hljs-comment">/**
     * &#x751F;&#x6210;key&#x7684;&#x7B56;&#x7565;
     *
     * <span class="hljs-doctag">@return</span>
     */</span>
    <span class="hljs-meta">@Bean</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function">KeyGenerator <span class="hljs-title">keyGenerator</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> KeyGenerator() {
            <span class="hljs-meta">@Override</span>
            <span class="hljs-keyword">public</span> <span class="hljs-function">Object <span class="hljs-title">generate</span><span class="hljs-params">(Object <span class="hljs-keyword">target</span>, Method method, Object... params)</span> </span>{
                StringBuilder sb = <span class="hljs-keyword">new</span> StringBuilder();
                sb.append(<span class="hljs-keyword">target</span>.getClass().getName());
                sb.append(method.getName());
                <span class="hljs-keyword">for</span> (Object obj : params) {
                    sb.append(obj.toString());
                }
                <span class="hljs-function"><span class="hljs-keyword">return</span> sb.<span class="hljs-title">toString</span><span class="hljs-params">()</span></span>;
            }
        };
    }

    <span class="hljs-comment">/**
     * &#x7BA1;&#x7406;&#x7F13;&#x5B58;
     *
     * <span class="hljs-doctag">@param</span> redisTemplate
     * <span class="hljs-doctag">@return</span>
     */</span>
    <span class="hljs-meta">@SuppressWarnings</span>(<span class="hljs-string">&quot;rawtypes&quot;</span>)
    <span class="hljs-meta">@Bean</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function">CacheManager <span class="hljs-title">cacheManager</span><span class="hljs-params">(RedisTemplate redisTemplate)</span> </span>{
        RedisCacheManager rcm = <span class="hljs-keyword">new</span> RedisCacheManager(redisTemplate);
        <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x7F13;&#x5B58;&#x8FC7;&#x671F;&#x65F6;&#x95F4;</span>
        <span class="hljs-comment">// rcm.setDefaultExpiration(60);//&#x79D2;</span>
        <span class="hljs-comment">//&#x8BBE;&#x7F6E;value&#x7684;&#x8FC7;&#x671F;&#x65F6;&#x95F4;</span>
        Map&lt;String,Long&gt; map=<span class="hljs-keyword">new</span> HashMap();
        map.put(<span class="hljs-string">&quot;test&quot;</span>,<span class="hljs-number">60</span>L);
        rcm.setExpires(map);
        <span class="hljs-keyword">return</span> rcm;
    }

    <span class="hljs-comment">/**
     * RedisTemplate&#x914D;&#x7F6E;
     * <span class="hljs-doctag">@param</span> factory
     * <span class="hljs-doctag">@return</span>
     */</span>
    <span class="hljs-meta">@Bean</span>
    <span class="hljs-keyword">public</span> RedisTemplate&lt;String, String&gt; redisTemplate(RedisConnectionFactory factory) {
        StringRedisTemplate template = <span class="hljs-keyword">new</span> StringRedisTemplate(factory);
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = <span class="hljs-keyword">new</span> Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = <span class="hljs-keyword">new</span> ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setValueSerializer(jackson2JsonRedisSerializer);<span class="hljs-comment">//&#x5982;&#x679C;key&#x662F;String &#x9700;&#x8981;&#x914D;&#x7F6E;&#x4E00;&#x4E0B;StringSerializer,&#x4E0D;&#x7136;key&#x4F1A;&#x4E71;&#x7801; /XX/XX</span>
        template.afterPropertiesSet();
        <span class="hljs-comment">//template.setStringSerializer();</span>
        <span class="hljs-keyword">return</span> template;
    }
}</code></pre><p>redis&#x6570;&#x636E;&#x7EDF;&#x8BA1;Dao&#x7684;&#x5B9E;&#x73B0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Repository
public class StatDao {
    @Autowired
    RedisTemplate redisTemplate;
    public void pushOnlineUser(UserEntity userEntity){
        redisTemplate.opsForSet().add(&quot;OnlineUser&quot;,userEntity);
    }
    public void popOnlineUser(UserEntity userEntity){
        redisTemplate.opsForSet().remove(&quot;OnlineUser&quot; ,userEntity);
    }
    public Set getAllUserOnline(){
        return redisTemplate.opsForSet().members(&quot;OnlineUser&quot;);
    }
    public void pushGuestHistory(Guest guest){
        //&#x6700;&#x591A;&#x5B58;&#x50A8;&#x6307;&#x5B9A;&#x4E2A;&#x6570;&#x7684;&#x8BBF;&#x5BA2;
        if (redisTemplate.opsForList().size(&quot;Guest&quot;) == 200l){
            redisTemplate.opsForList().rightPop(&quot;Guest&quot;);
        }
        redisTemplate.opsForList().leftPush(&quot;Guest&quot;,guest);
    }
    public List getGuestHistory(){
        return redisTemplate.opsForList().range(&quot;Guest&quot;,0,-1);
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>@Repository
<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">StatDao</span> {
    @Autowired
    RedisTemplate redisTemplate;
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">pushOnlineUser</span>(<span class="hljs-params">UserEntity userEntity</span>)</span>{
        redisTemplate.opsForSet().<span class="hljs-keyword">add</span>(<span class="hljs-string">&quot;OnlineUser&quot;</span>,userEntity);
    }
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">popOnlineUser</span>(<span class="hljs-params">UserEntity userEntity</span>)</span>{
        redisTemplate.opsForSet().<span class="hljs-keyword">remove</span>(<span class="hljs-string">&quot;OnlineUser&quot;</span> ,userEntity);
    }
    <span class="hljs-function"><span class="hljs-keyword">public</span> Set <span class="hljs-title">getAllUserOnline</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> redisTemplate.opsForSet().members(<span class="hljs-string">&quot;OnlineUser&quot;</span>);
    }
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> <span class="hljs-title">pushGuestHistory</span>(<span class="hljs-params">Guest guest</span>)</span>{
        <span class="hljs-comment">//&#x6700;&#x591A;&#x5B58;&#x50A8;&#x6307;&#x5B9A;&#x4E2A;&#x6570;&#x7684;&#x8BBF;&#x5BA2;</span>
        <span class="hljs-keyword">if</span> (redisTemplate.opsForList().size(<span class="hljs-string">&quot;Guest&quot;</span>) == <span class="hljs-number">200</span>l){
            redisTemplate.opsForList().rightPop(<span class="hljs-string">&quot;Guest&quot;</span>);
        }
        redisTemplate.opsForList().leftPush(<span class="hljs-string">&quot;Guest&quot;</span>,guest);
    }
    <span class="hljs-function"><span class="hljs-keyword">public</span> List <span class="hljs-title">getGuestHistory</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> redisTemplate.opsForList().range(<span class="hljs-string">&quot;Guest&quot;</span>,<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>);
    }
}
</code></pre><p>Dao&#x5C42;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x7EDF;&#x8BA1;&#x5728;&#x7EBF;&#x4EBA;&#x6570;&#x548C;&#x8BBF;&#x5BA2;&#x3002;&#x4F46;&#x662F;&#x5728;&#x7EBF;&#x4EBA;&#x6570;&#x662F;&#x5B9E;&#x65F6;&#x66F4;&#x65B0;&#x7684;&#xFF0C;&#x65E2;&#x7136;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;websocket&#x5B9E;&#x65F6;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x5C31;&#x975E;&#x5E38;&#x5BB9;&#x6613;&#x4E86;&#xFF0C;&#x524D;&#x9762;&#x6211;&#x4EEC;&#x8BB2;&#x8FC7;&#xFF0C;&#x901A;&#x8FC7;&#x4FE1;&#x9053;&#x62E6;&#x622A;&#x5668;&#x53EF;&#x4EE5;&#x62E6;&#x622A;&#x8FDE;&#x63A5;&#xFF0C;&#x8BA2;&#x9605;&#xFF0C;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;&#x7B49;&#x7B49;&#x4E8B;&#x4EF6;&#x4FE1;&#x606F;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5F53;&#x7528;&#x6237;&#x8FDE;&#x63A5;&#x65F6;&#x5B58;&#x50A8;&#x5728;&#x7EBF;&#x7528;&#x6237;&#xFF0C;&#x901A;&#x8FC7;websocket&#x8FD4;&#x56DE;&#x5728;&#x7EBF;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class MyChannelInterceptor extends ChannelInterceptorAdapter {
    @Autowired
    private StatDao statDao;
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Override
    public boolean preReceive(MessageChannel channel) {
        System.out.println(&quot;preReceive&quot;);
        return super.preReceive(channel);
    }

    @Override
    public Message&lt;?&gt; preSend(Message&lt;?&gt; message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        //&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x5185;&#x5BB9;&#xFF08;&#x9632;&#x6B62;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x4E0D;&#x5408;&#x6CD5;&#x9891;&#x9053;&#xFF09;
        if (StompCommand.SUBSCRIBE.equals(command)) {
            //&#x4ECE;&#x6570;&#x636E;&#x5E93;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x9891;&#x9053;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;(&#x8FD9;&#x91CC;&#x4E3A;&#x4E86;&#x6F14;&#x793A;&#x76F4;&#x63A5;&#x4F7F;&#x7528;set&#x96C6;&#x5408;&#x4EE3;&#x66FF;)
            Set&lt;String&gt; subedChannelInDB = new HashSet&lt;&gt;();
            subedChannelInDB.add(&quot;/topic/group&quot;);
            subedChannelInDB.add(&quot;/topic/online_user&quot;);
            if (subedChannelInDB.contains(accessor.getDestination())) {
                //&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x5408;&#x6CD5;
                return super.preSend(message, channel);
            } else {
                //&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x4E0D;&#x5408;&#x6CD5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;null&#x524D;&#x7AEF;&#x7528;&#x6237;&#x5C31;&#x63A5;&#x53D7;&#x4E0D;&#x5230;&#x8BE5;&#x9891;&#x9053;&#x4FE1;&#x606F;&#x3002;
                return null;
            }
        } else {
            return super.preSend(message, channel);
        }

    }
    @Override
    public void afterSendCompletion(Message&lt;?&gt; message, MessageChannel channel, boolean sent, Exception ex) {
        //System.out.println(&quot;afterSendCompletion&quot;);
        //&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x662F;&#x5426;&#x8FDE;&#x63A5;&#x6210;&#x529F;&#xFF0C;&#x641C;&#x96C6;&#x5728;&#x7EBF;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x5982;&#x679C;&#x6570;&#x636E;&#x91CF;&#x8FC7;&#x5927;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x5E93;&#x6BD4;&#x5982;redis,
        //&#x8FD9;&#x91CC;&#x7531;&#x4E8E;&#x9700;&#x8981;&#x9891;&#x7E41;&#x7684;&#x5220;&#x9664;&#x548C;&#x589E;&#x52A0;&#x96C6;&#x5408;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;set&#x96C6;&#x5408;&#x6765;&#x5B58;&#x50A8;&#x5728;&#x7EBF;&#x7528;&#x6237;
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        if (StompCommand.SUBSCRIBE.equals(command)){
            Map&lt;String,UserEntity&gt; map = (Map&lt;String, UserEntity&gt;) accessor.getHeader(&quot;simpSessionAttributes&quot;);
            //ONLINE_USERS.add(map.get(&quot;user&quot;));
            UserEntity user = map.get(&quot;user&quot;);
            if(user != null){
                statDao.pushOnlineUser(user);
                Guest guest = new Guest();
                guest.setUserEntity(user);
                guest.setAccessTime(Calendar.getInstance().getTimeInMillis());
                statDao.pushGuestHistory(guest);
                //&#x901A;&#x8FC7;websocket&#x5B9E;&#x65F6;&#x8FD4;&#x56DE;&#x5728;&#x7EBF;&#x4EBA;&#x6570;
                this.simpMessagingTemplate.convertAndSend(&quot;/topic/online_user&quot;,statDao.getAllUserOnline());
            }

        }
        //&#x5982;&#x679C;&#x7528;&#x6237;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;&#xFF0C;&#x5220;&#x9664;&#x7528;&#x6237;&#x4FE1;&#x606F;
        if (StompCommand.DISCONNECT.equals(command)){
            Map&lt;String,UserEntity&gt; map = (Map&lt;String, UserEntity&gt;) accessor.getHeader(&quot;simpSessionAttributes&quot;);
            //ONLINE_USERS.remove(map.get(&quot;user&quot;));
            UserEntity user = map.get(&quot;user&quot;);
            if (user != null){
                statDao.popOnlineUser(user);
                simpMessagingTemplate.convertAndSend(&quot;/topic/online_user&quot;,statDao.getAllUserOnline());
            }

        }
        super.afterSendCompletion(message, channel, sent, ex);
    }

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code><span class="hljs-keyword">public</span> class MyChannelInterceptor extends ChannelInterceptorAdapter {
    @Autowired
    <span class="hljs-keyword">private</span> StatDao statDao;
    @Autowired
    <span class="hljs-keyword">private</span> SimpMessagingTemplate simpMessagingTemplate;

    @Override
    <span class="hljs-keyword">public</span> <span class="hljs-built_in">boolean</span> preReceive(MessageChannel channel) {
        System.out.<span class="hljs-built_in">println</span>(<span class="hljs-string">&quot;preReceive&quot;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.preReceive(channel);
    }

    @Override
    <span class="hljs-keyword">public</span> Message&lt;?&gt; preSend(Message&lt;?&gt; message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        <span class="hljs-comment">//&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x5185;&#x5BB9;&#xFF08;&#x9632;&#x6B62;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x4E0D;&#x5408;&#x6CD5;&#x9891;&#x9053;&#xFF09;</span>
        <span class="hljs-keyword">if</span> (StompCommand.SUBSCRIBE.equals(command)) {
            <span class="hljs-comment">//&#x4ECE;&#x6570;&#x636E;&#x5E93;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x9891;&#x9053;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;(&#x8FD9;&#x91CC;&#x4E3A;&#x4E86;&#x6F14;&#x793A;&#x76F4;&#x63A5;&#x4F7F;&#x7528;set&#x96C6;&#x5408;&#x4EE3;&#x66FF;)</span>
            Set&lt;<span class="hljs-keyword">String</span>&gt; subedChannelInDB = <span class="hljs-keyword">new</span> HashSet&lt;&gt;();
            subedChannelInDB.<span class="hljs-built_in">add</span>(<span class="hljs-string">&quot;/topic/group&quot;</span>);
            subedChannelInDB.<span class="hljs-built_in">add</span>(<span class="hljs-string">&quot;/topic/online_user&quot;</span>);
            <span class="hljs-keyword">if</span> (subedChannelInDB.contains(accessor.getDestination())) {
                <span class="hljs-comment">//&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x5408;&#x6CD5;</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.preSend(message, channel);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">//&#x8BE5;&#x7528;&#x6237;&#x8BA2;&#x9605;&#x7684;&#x9891;&#x9053;&#x4E0D;&#x5408;&#x6CD5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;null&#x524D;&#x7AEF;&#x7528;&#x6237;&#x5C31;&#x63A5;&#x53D7;&#x4E0D;&#x5230;&#x8BE5;&#x9891;&#x9053;&#x4FE1;&#x606F;&#x3002;</span>
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.preSend(message, channel);
        }

    }
    @Override
    <span class="hljs-keyword">public</span> <span class="hljs-keyword">void</span> afterSendCompletion(Message&lt;?&gt; message, MessageChannel channel, <span class="hljs-built_in">boolean</span> sent, Exception ex) {
        <span class="hljs-comment">//System.out.println(&quot;afterSendCompletion&quot;);</span>
        <span class="hljs-comment">//&#x68C0;&#x6D4B;&#x7528;&#x6237;&#x662F;&#x5426;&#x8FDE;&#x63A5;&#x6210;&#x529F;&#xFF0C;&#x641C;&#x96C6;&#x5728;&#x7EBF;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x5982;&#x679C;&#x6570;&#x636E;&#x91CF;&#x8FC7;&#x5927;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x6570;&#x636E;&#x5E93;&#x6BD4;&#x5982;redis,</span>
        <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x7531;&#x4E8E;&#x9700;&#x8981;&#x9891;&#x7E41;&#x7684;&#x5220;&#x9664;&#x548C;&#x589E;&#x52A0;&#x96C6;&#x5408;&#x5185;&#x5BB9;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;set&#x96C6;&#x5408;&#x6765;&#x5B58;&#x50A8;&#x5728;&#x7EBF;&#x7528;&#x6237;</span>
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();
        <span class="hljs-keyword">if</span> (StompCommand.SUBSCRIBE.equals(command)){
            Map&lt;<span class="hljs-keyword">String</span>,UserEntity&gt; <span class="hljs-built_in">map</span> = (Map&lt;<span class="hljs-keyword">String</span>, UserEntity&gt;) accessor.getHeader(<span class="hljs-string">&quot;simpSessionAttributes&quot;</span>);
            <span class="hljs-comment">//ONLINE_USERS.add(map.get(&quot;user&quot;));</span>
            UserEntity user = <span class="hljs-built_in">map</span>.<span class="hljs-built_in">get</span>(<span class="hljs-string">&quot;user&quot;</span>);
            <span class="hljs-keyword">if</span>(user != <span class="hljs-keyword">null</span>){
                statDao.pushOnlineUser(user);
                Guest guest = <span class="hljs-keyword">new</span> Guest();
                guest.setUserEntity(user);
                guest.setAccessTime(Calendar.getInstance().getTimeInMillis());
                statDao.pushGuestHistory(guest);
                <span class="hljs-comment">//&#x901A;&#x8FC7;websocket&#x5B9E;&#x65F6;&#x8FD4;&#x56DE;&#x5728;&#x7EBF;&#x4EBA;&#x6570;</span>
                <span class="hljs-keyword">this</span>.simpMessagingTemplate.convertAndSend(<span class="hljs-string">&quot;/topic/online_user&quot;</span>,statDao.getAllUserOnline());
            }

        }
        <span class="hljs-comment">//&#x5982;&#x679C;&#x7528;&#x6237;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;&#xFF0C;&#x5220;&#x9664;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
        <span class="hljs-keyword">if</span> (StompCommand.DISCONNECT.equals(command)){
            Map&lt;<span class="hljs-keyword">String</span>,UserEntity&gt; <span class="hljs-built_in">map</span> = (Map&lt;<span class="hljs-keyword">String</span>, UserEntity&gt;) accessor.getHeader(<span class="hljs-string">&quot;simpSessionAttributes&quot;</span>);
            <span class="hljs-comment">//ONLINE_USERS.remove(map.get(&quot;user&quot;));</span>
            UserEntity user = <span class="hljs-built_in">map</span>.<span class="hljs-built_in">get</span>(<span class="hljs-string">&quot;user&quot;</span>);
            <span class="hljs-keyword">if</span> (user != <span class="hljs-keyword">null</span>){
                statDao.popOnlineUser(user);
                simpMessagingTemplate.convertAndSend(<span class="hljs-string">&quot;/topic/online_user&quot;</span>,statDao.getAllUserOnline());
            }

        }
        <span class="hljs-keyword">super</span>.afterSendCompletion(message, channel, sent, ex);
    }

}</code></pre><p>&#x7531;&#x4E8E;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x6709;&#x79FB;&#x52A8;&#x7AEF;&#x548C;&#x7535;&#x8111;&#x7AEF;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x6839;&#x636E;&#x8BF7;&#x6C42;&#x4EE3;&#x7406;UserAgent&#x6765;&#x5224;&#x65AD;&#x5BA2;&#x6237;&#x7AEF;&#x5C5E;&#x4E8E;&#x54EA;&#x4E00;&#x79CD;&#x7C7B;&#x578B;&#x3002;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x7C7B;&#x5728;&#x6E90;&#x7801;&#x4E0A;&#x6709;&#x3002;&#x6211;&#x5C31;&#x4E0D;&#x8D34;&#x4E86;&#x3002;</p><h1 id="articleHeader16">&#x670D;&#x52A1;&#x5668;&#x90E8;&#x7F72;</h1><p>&#x8BF4;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#x5373;&#x65F6;&#x901A;&#x4FE1;&#xFF0C;&#x5374;&#x6CA1;&#x53D1;&#x73B0;&#x89C6;&#x9891;&#x76F4;&#x64AD;&#x3002;&#x4E0D;&#x8981;&#x7740;&#x6025;&#x6211;&#x4EEC;&#x9A6C;&#x4E0A;&#x8FDB;&#x5165;&#x89C6;&#x9891;&#x73AF;&#x8282;&#x3002;&#x6587;&#x7AE0;&#x5F00;&#x5934;&#x5C31;&#x8BF4;&#x660E;&#x4E86;&#x51E0;&#x79CD;&#x5A92;&#x4F53;&#x6D41;&#x534F;&#x8BAE;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x8BB2;&#x89E3;&#x8BE6;&#x7EC6;&#x7684;&#x534F;&#x8BAE;&#x6D41;&#x7A0B;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x77E5;&#x9053;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x901A;&#x8FC7;&#x63A8;&#x6D41;&#x8F6F;&#x4EF6;&#x91C7;&#x96C6;&#x89C6;&#x9891;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x4F55;&#x91C7;&#x96C6;&#x4E5F;&#x4E0D;&#x662F;&#x6211;&#x4EEC;&#x5173;&#x6CE8;&#x7684;&#x3002;&#x91C7;&#x96C6;&#x5230;&#x4FE1;&#x606F;&#x540E;&#x901A;&#x8FC7;&#x8F6F;&#x4EF6;&#x6765;&#x63A8;&#x9001;&#x5230;&#x6307;&#x5B9A;&#x7684;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;</p><blockquote><p>obs&#x63A8;&#x6D41;&#x8BBE;&#x7F6E;</p></blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000009892012?w=1003&amp;h=928" src="https://static.alili.tech/img/remote/1460000009892012?w=1003&amp;h=928" alt="&#x7535;&#x8111;&#x7AEF;" title="&#x7535;&#x8111;&#x7AEF;" style="cursor:pointer"></span></p><blockquote><p>yasea&#x624B;&#x673A;&#x7AEF;&#x63A8;&#x6D41;&#x8BBE;&#x7F6E;</p></blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000009892013?w=1080&amp;h=1920" src="https://static.alili.tech/img/remote/1460000009892013?w=1080&amp;h=1920" alt="&#x7535;&#x8111;&#x7AEF;" title="&#x7535;&#x8111;&#x7AEF;" style="cursor:pointer;display:inline"></span></p><p>&#x7EA2;&#x8272;&#x90E8;&#x5206;&#x662F;&#x670D;&#x52A1;&#x5668;&#x5F00;&#x653E;&#x7684;&#x83B7;&#x53D6;&#x6D41;&#x63A5;&#x53E3;&#x3002;</p><h2 id="articleHeader17">Nginx-rtmp-module&#x914D;&#x7F6E;</h2><p>&#x89C6;&#x9891;&#x670D;&#x52A1;&#x5668;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x4E5F;&#x652F;&#x6301;&#x5F88;&#x591A;&#x5A92;&#x4F53;&#x6D41;&#x534F;&#x8BAE;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9009;&#x62E9;nginx-rtmp-module&#x6765;&#x505A;&#x89C6;&#x9891;&#x670D;&#x52A1;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;linux&#x4E0B;&#x5B89;&#x88C5;nginx,&#x5E76;&#x5B89;&#x88C5;rtmp&#x6A21;&#x5757;&#x3002;&#x672C;&#x4EBA;&#x4E5F;&#x662F;linux&#x521D;&#x5B66;&#x8005;&#xFF0C;&#x4E00;&#x6B65;&#x6B65;&#x6478;&#x7D22;&#x7740;&#x628A;&#x670D;&#x52A1;&#x5668;&#x642D;&#x5EFA;&#x597D;&#xFF0C;&#x542C;&#x8BF4;tomcat&#x548C;nginx&#x5F88;&#x914D;&#x54E6;&#xFF0C;&#x6240;&#x4EE5;&#x4F5C;&#x4E3A;&#x514D;&#x8D39;&#x5F00;&#x6E90;&#x7684;&#x5F53;&#x7136;&#x9996;&#x9009;&#x8FD9;&#x4E24;&#x4E2A;&#x3002;<br>&#x63A5;&#x4E0B;&#x6765;&#x9700;&#x8981;&#x5728;linux&#x5B89;&#x88C5;&#x4E00;&#x4E0B;&#x8F6F;&#x4EF6;&#x548C;&#x670D;&#x52A1;&#x3002;</p><ol><li><p>Nginx&#x4EE5;&#x53CA;Nginx-rtmp-module</p></li><li><p>Tomcat</p></li><li><p>Mysql</p></li><li><p>Redis</p></li><li><p>RabbitMQ</p></li></ol><p>&#x5B89;&#x88C5;&#x6B65;&#x9AA4;&#x6211;&#x5C31;&#x4E0D;&#x8BF4;&#x4E86;&#xFF0C;&#x5927;&#x5BB6;&#x641C;&#x7D22;&#x4E00;&#x4E0B;&#x5566;&#xFF0C;&#x8FD9;&#x91CC;&#x8D34;&#x4E00;&#x4E0B;nginx.conf&#x6587;&#x4EF6;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rtmp {
    server {
        listen 1935;
        chunk_size 4096;

        application video {
                play /yjdata/www/www/video;
        }
        application live {
                live on;
                hls on;
                hls_path /yjdata/www/www/live/hls/;
                hls_fragment 5s;
        }
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code><span class="hljs-section">rtmp</span> {
    <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span> <span class="hljs-number">1935</span>;
        <span class="hljs-attribute">chunk_size</span> <span class="hljs-number">4096</span>;

        <span class="hljs-attribute">application</span> video {
                <span class="hljs-attribute">play</span> /yjdata/www/www/video;
        }
        <span class="hljs-attribute">application</span> live {
                <span class="hljs-attribute">live</span> <span class="hljs-literal">on</span>;
                <span class="hljs-attribute">hls</span> <span class="hljs-literal">on</span>;
                <span class="hljs-attribute">hls_path</span> /yjdata/www/www/live/hls/;
                <span class="hljs-attribute">hls_fragment</span> <span class="hljs-number">5s</span>;
        }
    }
}
</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x662F;&#x914D;&#x7F6E;rtmp&#x6A21;&#x5757;, play /yjdata/www/www/video &#x6307;&#x7684;&#x662F;&#x914D;&#x7F6E;&#x70B9;&#x64AD;&#x6A21;&#x5757;&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x64AD;&#x653E;/yjdata/www/www/video&#x8DEF;&#x5F84;&#x4E0B;&#x7684;&#x89C6;&#x9891;&#x3002;hls_path&#x5236;&#x5B9A;hls&#x5206;&#x5757;&#x5B58;&#x653E;&#x8DEF;&#x5F84;&#xFF0C;&#x56E0;&#x4E3A;hls&#x662F;&#x901A;&#x8FC7;&#x83B7;&#x53D6;&#x5230;&#x63A8;&#x9001;&#x7684;&#x89C6;&#x9891;&#x6D41;&#x4FE1;&#x606F;&#xFF0C;&#x5206;&#x5757;&#x5B58;&#x50A8;&#x5728;&#x670D;&#x52A1;&#x5668;&#x3002;&#x6240;&#x4EE5;&#x5B83;&#x7684;&#x5EF6;&#x65F6;&#x6BD4;rtmp&#x8981;&#x66F4;&#x9AD8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;
        index index.jsp index.html;
        root /yjdata/www/www;
        #access_log  logs/host.access.log  main;

        location / {
            proxy_pass  http://127.0.0.1:8080;
        }
        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|js|css|docx|pdf|doc|ppt|html|properties)$ {
                expires 30d;
                root /yjdata/www/www/static/;
        }
        location /hls {
            types {
                application/vnd.apple.mpegurl m3u8;
                #application/x-mpegURL;
                video/mp2t ts;
            }
            alias /yjdata/www/www/live/hls/;
            expires -1;
            add_header Cache-Control no-cache;
        }

        location /stat {
                 rtmp_stat all;
                 rtmp_stat_stylesheet stat.xsl;
        }

        location /stat.xsl {
                root /soft/nginx/nginx-rtmp-module/;
         }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code> server {
        listen       <span class="hljs-number">80</span>;
        server_name  localhost;

        <span class="hljs-comment">#charset koi8-r;</span>
        index index.jsp index.html;
        root /yjdata/www/www;
        <span class="hljs-comment">#access_log  logs/host.access.log  main;</span>

        <span class="hljs-keyword">location</span> <span class="hljs-title">/ {
            proxy_pass</span>  http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">8080</span>;
        }
        <span class="hljs-keyword">location</span> <span class="hljs-title">~ .*\.(gif</span>|jpg|jpeg|png|bmp|swf|js|css|docx|pdf|doc|ppt|html|properties)$ {
                expires <span class="hljs-number">30</span>d;
                root /yjdata/www/www/static/;
        }
        <span class="hljs-keyword">location</span> <span class="hljs-title">/hls</span> {
            types {
                application/vnd.apple.mpegurl m3u8;
                <span class="hljs-comment">#application/x-mpegURL;</span>
                video/mp2t ts;
            }
            alias /yjdata/www/www/live/hls/;
            expires -<span class="hljs-number">1</span>;
            add_header Cache-Control no-cache;
        }

        <span class="hljs-keyword">location</span> <span class="hljs-title">/stat</span> {
                 rtmp_stat all;
                 rtmp_stat_stylesheet stat.xsl;
        }

        <span class="hljs-keyword">location</span> <span class="hljs-title">/stat</span>.xsl {
                root /soft/nginx/nginx-rtmp-module/;
         }
</code></pre><p>&#x4E0A;&#x9762;&#x914D;&#x7F6E;&#x4E86;location &#x6307;&#x5411;/hls,&#x522B;&#x540D;&#x662F;/yjdata/www/www/live/hls/&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x5728;&#x524D;&#x7AEF;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x57DF;&#x540D;+/hls/+&#x6587;&#x4EF6;&#x540D;.m3u8&#x83B7;&#x53D6;&#x76F4;&#x64AD;&#x89C6;&#x9891;&#x3002;<br>&#x5173;&#x4E8E;nginx&#x7684;&#x914D;&#x7F6E;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#xFF0C;&#x6211;&#x4E5F;&#x5728;&#x5B66;&#x4E60;&#x5F53;&#x4E2D;&#x3002;&#x603B;&#x800C;&#x8A00;&#x4E4B;nginx&#x975E;&#x5E38;&#x5F3A;&#x5927;&#x3002;</p><h1 id="articleHeader18">&#x603B;&#x7ED3;</h1><p>&#x901A;&#x8FC7;&#x4ECE;&#x524D;&#x7AEF;=&gt;&#x540E;&#x53F0;=&gt;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#x8D70;&#x4E0B;&#x6765;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x82B1;&#x5F88;&#x591A;&#x5FC3;&#x601D;&#x3002;&#x4F46;&#x662F;&#x6536;&#x83B7;&#x4E5F;&#x662F;&#x5F88;&#x591A;&#x3002;&#x672C;&#x4EBA;&#x5C06;&#x4ECE;&#x5927;&#x5B66;&#x51FA;&#x6765;&#xFF0C;&#x521D;&#x51FA;&#x8305;&#x5E90;,&#x6587;&#x7AE0;&#x9519;&#x8BEF;&#x4E4B;&#x5904;&#xFF0C;&#x5C3D;&#x8BF7;&#x6307;&#x6B63;&#x3002;&#x672C;&#x4EBA;&#x90AE;&#x7BB1;979783618@qq.com</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
全栈开发——动手打造属于自己的直播间（Vue+SpringBoot+Nginx）

## 原文链接
[https://segmentfault.com/a/1190000009892006](https://segmentfault.com/a/1190000009892006)


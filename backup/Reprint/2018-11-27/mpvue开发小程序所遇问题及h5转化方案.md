---
title: 'mpvue开发小程序所遇问题及h5转化方案' 
date: 2018-11-27 2:30:13
hidden: true
slug: apjh2lqafj
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">mpvue&#x5F00;&#x53D1;&#x5C0F;&#x7A0B;&#x5E8F;&#x6240;&#x9047;&#x95EE;&#x9898;&#x53CA;h5&#x8F6C;&#x5316;&#x65B9;&#x6848;</h1><ul><li>&#x9879;&#x76EE;&#x7ED3;&#x6784;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    |---build
        |---pages.js&#x6587;&#x4EF6;&#x76EE;&#x5F55;
    |---src
        |---component&#x5B50;&#x7EC4;&#x4EF6;
        |---pages
            |---&#x4E1A;&#x52A1;&#x9875;&#x9762;
        |---store&#xFF0C;vuex&#x50A8;&#x5B58;
        |---utils
            |---&#x8BF7;&#x6C42;api.js
            |---format&#x683C;&#x5F0F;&#x5316;&#x63D2;&#x4EF6;&#xFF0C;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E2D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;vue&#x81EA;&#x5E26;&#x7684;&#x683C;&#x5F0F;&#x5316;&#x53EA;&#x80FD;&#x624B;&#x52A8;&#x4FEE;&#x6539;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x7684;&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x4EF7;&#x683C;&#xFF0C;&#x8BA2;&#x5355;&#x72B6;&#x6001;&#x7B49;
            |---request&#x5C01;&#x88C5;fly&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x62E6;&#x622A;
            |---wx.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code>    <span class="hljs-string">|---build</span>
        <span class="hljs-string">|---pages.js&#x6587;&#x4EF6;&#x76EE;&#x5F55;</span>
    <span class="hljs-string">|---src</span>
        <span class="hljs-string">|---component&#x5B50;&#x7EC4;&#x4EF6;</span>
        <span class="hljs-string">|---pages</span>
            <span class="hljs-string">|---&#x4E1A;&#x52A1;&#x9875;&#x9762;</span>
        <span class="hljs-string">|---store&#xFF0C;vuex&#x50A8;&#x5B58;</span>
        <span class="hljs-string">|---utils</span>
            <span class="hljs-string">|---&#x8BF7;&#x6C42;api.js</span>
            <span class="hljs-string">|---format&#x683C;&#x5F0F;&#x5316;&#x63D2;&#x4EF6;&#xFF0C;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E2D;&#x4E0D;&#x80FD;&#x4F7F;&#x7528;vue&#x81EA;&#x5E26;&#x7684;&#x683C;&#x5F0F;&#x5316;&#x53EA;&#x80FD;&#x624B;&#x52A8;&#x4FEE;&#x6539;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x7684;&#x65F6;&#x95F4;&#x6233;&#xFF0C;&#x4EF7;&#x683C;&#xFF0C;&#x8BA2;&#x5355;&#x72B6;&#x6001;&#x7B49;</span>
            <span class="hljs-string">|---request&#x5C01;&#x88C5;fly&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x62E6;&#x622A;</span>
            <span class="hljs-string">|---wx.js</span></code></pre><ul><li><p>&#x73AF;&#x5883;&#x53CA;&#x4F9D;&#x8D56;</p><ul><li>less-loader,&#x63D0;&#x4F9B;&#x5D4C;&#x5957;&#x6837;&#x5F0F;&#xFF0C;&#x8C01;&#x7528;&#x8C01;&#x77E5;&#x9053;</li><li><a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">flyio</a>&#x63D0;&#x4F9B;&#x8BF7;&#x6C42;&#x4FBF;&#x4E8E;&#x8BF7;&#x6C42;&#x6A21;&#x5757;&#x7684;&#x5FEB;&#x901F;&#x8F6C;&#x5316;h5(flyio&#x63D0;&#x4F9B;&#x4E86;h5,&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x8BF7;&#x6C42;&#x5C01;&#x88C5;&#xFF0C;<a href="https://github.com/F-loat/ithome-lite/blob/master/src/utils/request.js" rel="nofollow noreferrer" target="_blank">&#x53C2;&#x8003;mpvue&#x4E2D;&#x63D0;&#x4F9B;&#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</a>&#x5199;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x672A;&#x767B;&#x5F55;&#x72B6;&#x6001;&#x8DF3;&#x8F6C;&#x9875;&#x9762;)&#xFF0C;&#x81EA;&#x5DF1;&#x5728;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E2D;wx.request&#x5C01;&#x88C5;&#x4E5F;&#x4E00;&#x6837;&#xFF0C;&#x53EA;&#x662F;&#x8F6C;h5&#x53C8;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E2A;axios&#x3002;</li><li>&#x817E;&#x8BAF;&#x5730;&#x56FE;<a href="http://lbs.qq.com/qqmap_wx_jssdk/method-reverseGeocoder.html" rel="nofollow noreferrer" target="_blank">qqMap</a>&#x63D0;&#x4F9B;&#x7684;reverseGeocoder(wx.getLocation&#x53EA;&#x63D0;&#x4F9B;&#x4E86;&#x7ECF;&#x7EAC;&#x5EA6;&#x5B9A;&#x4F4D;&#xFF0C;&#x800C;&#x4EA7;&#x54C1;&#x9700;&#x8981;&#x7684;&#x662F;&#x786E;&#x8BA4;&#x5B9A;&#x4F4D;&#x540E;&#x83B7;&#x53D6;&#x57CE;&#x5E02;&#xFF0C;&#x8FDB;&#x884C;&#x540C;&#x57CE;&#x5546;&#x54C1;&#x68C0;&#x7D22;)</li><li><a href="https://www.jianshu.com/p/34d6dcbdc2e5" rel="nofollow noreferrer" target="_blank">&#x963F;&#x91CC;&#x4E91;oss&#x5BF9;&#x8C61;&#x50A8;&#x5B58;&#x5904;&#x7406;&#x6587;&#x4EF6;&#x4E0A;&#x4F20;</a>&#xFF0C;&#x6BD4;&#x8F83;&#x610F;&#x5916;&#x7684;&#x662F;&#x817E;&#x8BAF;&#x5BF9;&#x963F;&#x91CC;&#x4E91;&#x7684;oss&#x57DF;&#x540D;&#x524D;&#x7F00;&#x8FDB;&#x884C;&#x4E86;&#x5C01;&#x7981;&#x540E;&#x53F0;&#x4E0D;&#x80FD;&#x914D;&#x7F6E;&#xFF0C;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x662F;&#x8BA9;&#x540E;&#x53F0;&#x5C06;&#x8BE5;&#x57DF;&#x540D;&#x8FDB;&#x884C;&#x670D;&#x52A1;&#x5668;&#x57DF;&#x540D;&#x4EE3;&#x7406;&#x3002;&#x63D0;&#x4E00;&#x5634;&#xFF0C;&#x6700;&#x5F00;&#x59CB;&#x7528;&#x4E03;&#x725B;&#x4E91;&#x6CA1;&#x6709;&#x51FA;&#x73B0;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5ACC;&#x9EBB;&#x70E6;&#x7684;&#x53EF;&#x4EE5;&#x7528;&#x4E03;&#x725B;!<span class="img-wrap"><img data-src="/img/bVbcn4M?w=818&amp;h=333" src="https://static.alili.tech/img/bVbcn4M?w=818&amp;h=333" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></li><li>&#x5BCC;&#x6587;&#x672C;&#x5904;&#x7406;&#xFF0C;&#x4F7F;&#x7528;mpvue&#x4F8B;&#x5B50;&#x4E2D;&#x63D0;&#x4F9B;&#x7684;<a href="https://github.com/F-loat/mpvue-wxParse" rel="nofollow noreferrer" target="_blank">mpvue-wxparse</a>&#xFF0C;&#x5F53;&#x7136;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5199;</li></ul></li><li><p>&#x5C0F;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;</p><ul><li>&#x4F7F;&#x7528;mpvue&#x662F;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x723D;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;vue&#x7684;&#x8BED;&#x6CD5;&#x57FA;&#x672C;&#x80FD;&#x6B63;&#x5E38;&#x4F7F;&#x7528;&#x4F46;&#x6709;&#x51E0;&#x4E2A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x95EE;&#x9898;</li><li>&#x9875;&#x9762;&#x4F20;&#x9012;&#x53C2;&#x6570;&#x7C7B;&#x4F3C;get&#x8BF7;&#x6C42;?key=value&#xFF0C;&#x4E0B;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x91C7;&#x7528;$mp.query.key&#x83B7;&#x53D6;&#x4F46;&#x662F;&#x5728;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x9875;&#x9762;&#x5982;&#x5546;&#x54C1;&#x8BE6;&#x60C5;&#x591A;&#x6B21;key&#x7684;&#x5207;&#x6362;&#x7531;&#x4E8E;&#x9875;&#x9762;&#x7F13;&#x5B58;key&#x4F1A;&#x4FDD;&#x6301;&#x4E0D;&#x53D8;&#xFF0C;&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x4E0D;&#x540C;&#x60C5;&#x51B5;&#x53EF;&#x80FD;&#x4E0D;&#x540C;&#xFF0C;&#x6211;&#x91C7;&#x53D6;&#x7684;&#x65B9;&#x6848;&#x662F;&#x5728;onUnload&#x4E2D;&#x6E05;&#x9664;key&#xFF0C;&#x867D;&#x7136;mpvue&#x6587;&#x6863;&#x5B98;&#x65B9;&#x4E0D;&#x63A8;&#x8350;&#x7528;&#x5C0F;&#x7A0B;&#x5E8F;&#x7684;&#x5468;&#x671F;&#xFF0C;&#x4F46;&#x9700;&#x8981;&#x591A;&#x6B21;&#x5207;&#x6362;key&#x7684;&#x9875;&#x9762;&#x76EE;&#x524D;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x5148;&#x8FD9;&#x4E48;&#x5904;&#x7406;&#x5427;&#x3002;</li><li>&#x6700;&#x5F00;&#x59CB;&#x4EC5;&#x6253;&#x7B97;&#x505A;&#x5C0F;&#x7A0B;&#x5E8F;&#xFF0C;&#x540E;&#x6765;&#x9700;&#x8981;&#x8865;&#x5145;app&#xFF0C;&#x9700;&#x8981;&#x5728;&#x5F00;&#x653E;&#x5E73;&#x53F0;&#x5173;&#x8054;&#x5C0F;&#x7A0B;&#x5E8F;&#x540E;&#x4F7F;&#x7528;unionId&#x4EE5;&#x4F7F;&#x4E09;&#x7AEF;&#x7528;&#x6237;&#x76F8;&#x540C;&#xFF0C;&#x6CA1;&#x6709;&#x505A;&#x597D;&#x4EA7;&#x54C1;&#x5B9A;&#x4F4D;&#xFF0C;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x8FDB;&#x884C;&#x8868;&#x7ED3;&#x6784;&#x8BBE;&#x7F6E;&#x3002;&#x83B7;&#x53D6;&#x65B9;&#x6CD5;&#x4E3A;&#x5229;&#x7528;wx.login&#x83B7;&#x53D6;iv&#xFF0C;sessionkey&#x89E3;&#x6790;encryptedData</li><li>&#x56FE;&#x7247;&#x9A8C;&#x8BC1;&#x7801;&#x9700;&#x8981;&#x5E26;session&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x7528;img&#x6807;&#x7B7E;&#x53D1;&#x9001;get&#x8BF7;&#x6C42;&#xFF0C;&#x800C;&#x662F;&#x9700;&#x8981;&#x8981;&#x901A;&#x8FC7;filedownload&#x8BF7;&#x6C42;&#x5730;&#x5740;&#x4E0B;&#x8F7D;&#x4E8C;&#x8FDB;&#x5236;&#x6587;&#x4EF6;&#x540E;&#x8F6C;&#x94FE;&#x63A5;&#x7ED1;&#x5B9A;&#x7ED9;img</li><li>input&#x51FD;&#x6570;&#x89E6;&#x53D1;&#x805A;&#x7126;&#x9700;&#x8981;&#x5148;&#x8BBE;&#x7F6E;:focus&#x5148;&#x4E3A;false&#x518D;&#x4E3A;true&#x8FDB;&#x884C;&#x805A;&#x7126;</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x56E0;&#x4E3A;&#x53EA;&#x4F1A;&#x7ED1;&#x5B9A;&#x4E00;&#x6B21;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;OnShow&#x5468;&#x671F;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x5728;onshow&#x5468;&#x671F;&#x83B7;&#x53D6;&#x83B7;&#x53D6;&#x4E0D;&#x5230;this.$children</li><li>&#x5C0F;&#x7A0B;&#x5E8F;&#x5728;&#x5173;&#x95ED;5&#x5206;&#x949F;&#x5185;&#x4E0D;&#x4F1A;&#x88AB;&#x6E05;&#x9664;&#x90E8;&#x5206;&#x9875;&#x9762;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x4E0B;&#x62C9;&#x5237;&#x65B0;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;main.js&#x5F00;&#x542F;enablePullDownRefresh: true&#xFF0C;&#x4F46;&#x4F1A;&#x4E0E;scroll-view&#x4E2D;&#x7684;&#x4E0B;&#x62C9;&#x51B2;&#x7A81;&#xFF0C;&#x53EA;&#x80FD;&#x4E8C;&#x9009;&#x4E00;</li><li>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;swiper&#x5D4C;&#x5957;scroll-view&#x8FDB;&#x884C;tab&#x680F;&#x7EC4;&#x4EF6;&#x5236;&#x4F5C;&#xFF0C;swiper&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x9AD8;&#x5EA6;&#x9700;&#x8981;&#x7528;js&#x5199;&#x5B9A;&#x9AD8;&#x5EA6;&#xFF0C;&#x9AD8;&#x5EA6;&#x901A;&#x8FC7;getSystemInfo&#x83B7;&#x53D6;&#xFF0C;&#x5982;&#x679C;&#x901A;&#x8FC7;&#x5F39;&#x6027;&#x5E03;&#x5C40;flex:1;&#x53EF;&#x80FD;&#x5BFC;&#x81F4;&#x90E8;&#x5206;ios&#x65E7;&#x7248;&#x672C;&#x9AD8;&#x5EA6;&#x6491;&#x4E0D;&#x5F00;,&#x5D4C;&#x5957;&#x6BD4;&#x8F83;&#x591A;&#x5C31;&#x4E0D;&#x8D34;&#x4EE3;&#x7801;&#x4E86;<span class="img-wrap"><img data-src="/img/bVbcoaW?w=489&amp;h=454" src="https://static.alili.tech/img/bVbcoaW?w=489&amp;h=454" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></li><li>&#x9ED8;&#x8BA4;&#x5404;&#x79CD;&#x5C0F;&#x7A0B;&#x5E8F;&#x539F;&#x751F;&#x81EA;&#x5E26;&#x56FE;&#x6807;&#x662F;&#x767D;&#x8272;&#xFF0C;&#x5982;&#x679C;&#x80CC;&#x666F;&#x8272;&#x662F;&#x767D;&#x8272;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x53EF;&#x80FD;&#x4E00;&#x4E0B;&#x5B50;&#x53D1;&#x73B0;&#x4E0D;&#x4E86;&#x52A0;&#x8F7D;&#x56FE;&#x6D88;&#x5931;&#x7684;&#x539F;&#x56E0;.window&#x91CC;&#x914D;&#x7F6E;backgroundTextStyle:&apos;dark&apos;</li><li>&#x5C0F;&#x7A0B;&#x5E8F;&#x6709;&#x4E0D;&#x5C11;&#x4FDD;&#x7559;&#x5B57;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E0D;&#x8981;&#x91CD;&#x590D;&#xFF0C;<a href="http://mpvue.com/qa/" rel="nofollow noreferrer" target="_blank">&#x67E5;&#x770B;Q&amp;A</a></li><li>&#x524D;&#x51E0;&#x6B21;&#x63D0;&#x4EA4;&#x5BA1;&#x6838;&#x4F3C;&#x4E4E;&#x662F;&#x673A;&#x5668;&#x5BA1;&#x6838;&#xFF0C;&#x4EE3;&#x7801;&#x5F02;&#x5E38;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x3002;</li><li>watch&#x5168;&#x5C40;vuex&#x4F1A;&#x5728;&#x975E;&#x5F53;&#x524D;&#x9875;&#x9762;&#x6267;&#x884C;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x62FF;&#x4E86;$mp&#x91CC;&#x9762;&#x7684;&#x53C2;&#x6570;&#x53EF;&#x80FD;&#x4F1A;&#x5168;&#x5C40;&#x62A5;&#x9519;</li><li>api,&#x8FC7;&#x6EE4;&#x51FD;&#x6570;&#x590D;&#x7528;&#x65B9;&#x9762;&#xFF0C;import&#x7684;js&#x5728;&#x6BCF;&#x6B21;Import&#x6253;&#x5305;&#x8FDB;&#x53BB;&#x90FD;&#x4F1A;&#x76F4;&#x63A5;&#x62F7;&#x8D1D;&#x6574;&#x4E2A;js&#xFF0C;60&#x4E2A;&#x9875;&#x9762;&#x5C31;&#x91CD;&#x590D;60&#x6B21;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x90E8;&#x5206;&#x516C;&#x5171;&#x7684;js&#x653E;&#x5230;vendor.js&#x4E2D;&#xFF0C;&#x5C31;&#x53EA;&#x6253;&#x5305;&#x4E00;&#x6B21;&#x4E86;&#xFF0C;&#x5305;&#x5927;&#x5C0F;&#x6709;&#x660E;&#x663E;&#x53D8;&#x5316;&#xFF0C;&#x4FEE;&#x6539;webpack&#xFF0C;&#x53C2;&#x8003;<a href="https://github.com/Meituan-Dianping/mpvue/issues/289" rel="nofollow noreferrer" target="_blank">issue</a></li></ul></li></ul><h2><span class="img-wrap"><img data-src="/img/remote/1460000015558729?w=2300&amp;h=462" src="https://static.alili.tech/img/remote/1460000015558729?w=2300&amp;h=462" alt="" title="" style="cursor:pointer;display:inline"></span></h2><ul><li><p>&#x8F6C;h5&#x5B9E;&#x8DF5;</p><ul><li><p>&#x5C0F;&#x7A0B;&#x5E8F;&#x4E0E;h5&#x9700;&#x8981;&#x66FF;&#x6362;&#x7684;&#x5927;&#x6982;30%&#x9875;&#x9762;&#x6E32;&#x67D3;&#x8F7B;&#x677E;&#xFF0C;&#x4F46;&#x7EC4;&#x4EF6;&#x66FF;&#x6362;&#x9700;&#x8981;&#x82B1;&#x4E00;&#x5B9A;&#x65F6;&#x95F4;&#xFF0C;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#x7684;&#x5305;&#x62EC;&#x4EE5;&#x4E0B;vue&#x9879;&#x76EE;&#x5E38;&#x7528;&#x90E8;&#x5206;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x4E00;&#x4E24;&#x4E2A;vue&#x9879;&#x76EE;&#x76F8;&#x4FE1;&#x65E9;&#x5C31;&#x64CD;&#x4F5C;&#x8FC7;&#x8FD9;&#x4E9B;&#x90E8;&#x5206;&#xFF0C;&#x66FF;&#x6362;&#x8FD9;&#x4E9B;&#x7EC4;&#x4EF6;&#x4E5F;&#x5C31;&#x6539;&#x6539;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF0C;&#x91C7;&#x7528;&#x7684;ui&#x6846;&#x67B6;&#x662F;&#x63A5;&#x8FD1;weui&#x7684;vux</p><ul><li><p>wx&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED3;&#x5408;router&#x548C;vux&#x5C01;&#x88C5;&#x4E00;&#x4E0B;&#x5176;&#x4E2D;&#x7684;navigateTo&#xFF0C;redirectTo&#x7B49;&#x8DEF;&#x7531;&#x53CA;&#x6A21;&#x6001;&#x6846;&#x548C;toast&#xFF0C;&#x5E76;&#x5728;webpack.base.conf&#x914D;&#x7F6E;wx&#x6307;&#x5411;&#x8BE5;&#x6587;&#x4EF6;,&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x4F7F;&#x7528;wx&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x7528;&#x4FEE;&#x6539;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*webpack.base.conf*/
resolve: {
  extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
  alias: {
    &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;,
    &apos;@&apos;: resolve(&apos;src&apos;),
    &apos;wx&apos;: resolve(&apos;src/utils/wxSimulate.js&apos;)
  }
},
/*&#x6A21;&#x62DF;wx&#x7684;&#x81EA;&#x5DF1;&#x5199;&#x7684;wxsimilate.js*/
  import router from &apos;../router&apos;
  import Vue from &apos;vue&apos;
  import { ConfirmPlugin, ToastPlugin } from &apos;vux&apos;
  Vue.use(ConfirmPlugin)
  Vue.use(ToastPlugin)
  const wx = {
    navigateTo ({ url }) {
      console.log(url)
      router.push({ path: url })
    },
    redirectTo ({url}) {
      router.replace({ path: url })
    },
    navigateBack () {
      router.go(-1)
    },
    showToast ({title}) {
      Vue.$vux.toast.show({
        // &#x7EC4;&#x4EF6;&#x9664;show&#x5916;&#x7684;&#x5C5E;&#x6027;
        text: title
      })
    },
    // &#x6A21;&#x6001;&#x6846;&#x663E;&#x793A;
    showModal ({title, content, success}) {
      Vue.$vux.confirm.show({
        title,
        content,
        // &#x7EC4;&#x4EF6;&#x9664;show&#x5916;&#x7684;&#x5C5E;&#x6027;
        onConfirm () {
          success &amp;&amp; success({confirm: true, cancel: false})
        },
        onCancel () {
          success &amp;&amp; success({confirm: false, cancel: true})
        }
      })
    }
  }
  window.wx = wx
  export default wx
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*webpack.base.conf*/</span>
resolve: {
  <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
  <span class="hljs-attr">alias</span>: {
    <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>,
    <span class="hljs-string">&apos;@&apos;</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>),
    <span class="hljs-string">&apos;wx&apos;</span>: resolve(<span class="hljs-string">&apos;src/utils/wxSimulate.js&apos;</span>)
  }
},
<span class="hljs-comment">/*&#x6A21;&#x62DF;wx&#x7684;&#x81EA;&#x5DF1;&#x5199;&#x7684;wxsimilate.js*/</span>
  <span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../router&apos;</span>
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
  <span class="hljs-keyword">import</span> { ConfirmPlugin, ToastPlugin } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vux&apos;</span>
  Vue.use(ConfirmPlugin)
  Vue.use(ToastPlugin)
  <span class="hljs-keyword">const</span> wx = {
    navigateTo ({ url }) {
      <span class="hljs-built_in">console</span>.log(url)
      router.push({ <span class="hljs-attr">path</span>: url })
    },
    redirectTo ({url}) {
      router.replace({ <span class="hljs-attr">path</span>: url })
    },
    navigateBack () {
      router.go(<span class="hljs-number">-1</span>)
    },
    showToast ({title}) {
      Vue.$vux.toast.show({
        <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x9664;show&#x5916;&#x7684;&#x5C5E;&#x6027;</span>
        text: title
      })
    },
    <span class="hljs-comment">// &#x6A21;&#x6001;&#x6846;&#x663E;&#x793A;</span>
    showModal ({title, content, success}) {
      Vue.$vux.confirm.show({
        title,
        content,
        <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x9664;show&#x5916;&#x7684;&#x5C5E;&#x6027;</span>
        onConfirm () {
          success &amp;&amp; success({<span class="hljs-attr">confirm</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">cancel</span>: <span class="hljs-literal">false</span>})
        },
        onCancel () {
          success &amp;&amp; success({<span class="hljs-attr">confirm</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">cancel</span>: <span class="hljs-literal">true</span>})
        }
      })
    }
  }
  <span class="hljs-built_in">window</span>.wx = wx
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> wx
</code></pre></li><li>&#x5730;&#x56FE;(&#x91C7;&#x7528;<a href="https://elemefe.github.io/vue-amap/" rel="nofollow noreferrer" target="_blank">vue-amap</a>)&#xFF0C;&#x4E0D;&#x591A;&#x8BF4;&#xFF0C;&#x9762;&#x5411;api&#x7F16;&#x7A0B;</li><li>&#x4E0A;&#x4E0B;&#x62C9;&#x52A0;&#x8F7D;&#x91C7;&#x7528;<a href="https://ustbhuangyi.github.io/better-scroll/#/" rel="nofollow noreferrer" target="_blank">betterscroll</a>&#x5C01;&#x88C5;&#x4E00;&#x4E2A;<a href="https://www.cnblogs.com/xiaohaifengke/p/7308943.html" rel="nofollow noreferrer" target="_blank">scroll&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;slot</a>,slot&#x6587;&#x7AE0;&#x53C2;&#x8003;&#x70B9;&#x5DE6;&#x8FB9;</li><li><p>rpx&#x91C7;&#x7528;less+<a href="https://github.com/amfe/lib-flexible" rel="nofollow noreferrer" target="_blank">flexible</a>&#x4E2D;@rpx&#x4EE3;&#x66FF;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x628A;&#x6240;&#x6709;rpx&#x6362;&#x6210;@rpx&#x5373;&#x53EF;&#xFF0C;&#x4E0D;&#x61C2;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x4E00;&#x4E0B;rem&#x76F8;&#x5173;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*mpvue*/
  &lt;style scoped lang=&quot;less&quot;&gt;
  #index {padding:100rpx 20rpx 110rpx;}
/*vue*/
  &lt;style scoped lang=&quot;less&quot;&gt;
  @charset &quot;utf-8&quot;;
  @rpx: 117.188rem;
  #index {padding:100/@rpx 20/@rpx 110/@rpx;}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*mpvue*/</span>
  &lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">scoped</span> <span class="hljs-selector-tag">lang</span>=&quot;<span class="hljs-selector-tag">less</span>&quot;&gt;
  <span class="hljs-selector-id">#index</span> {<span class="hljs-attribute">padding</span>:<span class="hljs-number">100</span>rpx <span class="hljs-number">20</span>rpx <span class="hljs-number">110</span>rpx;}
<span class="hljs-comment">/*vue*/</span>
  &lt;<span class="hljs-selector-tag">style</span> <span class="hljs-selector-tag">scoped</span> <span class="hljs-selector-tag">lang</span>=&quot;<span class="hljs-selector-tag">less</span>&quot;&gt;
  @<span class="hljs-keyword">charset</span> <span class="hljs-string">&quot;utf-8&quot;</span>;
  @<span class="hljs-keyword">rpx</span>: <span class="hljs-number">117.188rem</span>;
  <span class="hljs-selector-id">#index</span> {<span class="hljs-attribute">padding</span>:<span class="hljs-number">100</span>/@rpx <span class="hljs-number">20</span>/@rpx <span class="hljs-number">110</span>/@rpx;}</code></pre></li><li>flyio&#x4ECE;mpvue&#x642C;&#x8FC7;&#x6765;&#x57FA;&#x672C;&#x4E0D;&#x53D8;</li><li>&#x521A;&#x624D;mpvue&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x963F;&#x91CC;&#x4E91;oss&#x4E0A;&#x4F20;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x4E2D;&#x7684;uploadFile&#x4E3A;h5&#x4E2D;&#x7684;FormData&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x4E0A;&#x4F20;</li><li>&#x4E24;&#x8005;&#x7684;input&#x805A;&#x7126;&#x51FD;&#x6570;&#x4E1A;&#x52A1;&#x4E0D;&#x540C;&#xFF0C;h5&#x4E2D;ios&#x4E0D;&#x5141;&#x8BB8;&#x51FD;&#x6570;&#x540A;&#x8D77;&#x805A;&#x7126;&#x9700;&#x8981;&#x7528;&#x6237;&#x81EA;&#x5DF1;&#x624B;&#x70B9;&#xFF0C;&#x5B89;&#x5353;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x7684;el.focus()&#x8FDB;&#x884C;&#x3002;</li></ul></li></ul></li><li>&#x6700;&#x540E;&#x611F;&#x8C22;&#x7F8E;&#x56E2;&#x7684;&#x5404;&#x4F4D;&#x5927;&#x4F6C;&#xFF0C;&#x8BA9;&#x6211;&#x8FD9;&#x4E2A;&#x83DC;&#x9E21;&#x8212;&#x8212;&#x670D;&#x670D;&#x7684;&#x5F00;&#x53D1;&#x4E86;&#x5C0F;&#x7A0B;&#x5E8F;&#x3001;&#x4E1A;&#x7EE9;&#x4E5F;&#x8FBE;&#x6807;&#x4E86;&#xFF0C;&#x5BF9;&#x6587;&#x7AE0;&#x6709;&#x95EE;&#x9898;&#x7684;&#x5927;&#x4F6C;&#x8BF7;&#x6307;&#x6B63;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x90FD;&#x80FD;&#x987A;&#x987A;&#x5229;&#x5229;&#x5F00;&#x5F00;&#x5FC3;&#x5FC3;&#x7684;&#x5F00;&#x53D1;&#x5C0F;&#x7A0B;&#x5E8F;&#xFF0C;&#x6700;&#x8FD1;&#x770B;&#x5230;&#x4EAC;&#x4E1C;&#x51FA;&#x4E86;&#x4E2A;taro&#x53C8;&#x51C6;&#x5907;&#x5F00;&#x542F;&#x65B0;&#x7684;&#x586B;&#x5751;&#x4E4B;&#x8DEF;&#x5566;&#x3002;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mpvue开发小程序所遇问题及h5转化方案

## 原文链接
[https://segmentfault.com/a/1190000015307003](https://segmentfault.com/a/1190000015307003)


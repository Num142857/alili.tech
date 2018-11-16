---
title: 适配器在JavaScript中的体现
hidden: true
categories: [reprint]
slug: 773c94a3
date: 2018-11-03 02:30:13
---

{{< raw >}}
<p>&#x9002;&#x914D;&#x5668;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x5728;JavaScript&#x4E2D;&#x975E;&#x5E38;&#x6709;&#x7528;&#xFF0C;&#x5728;&#x5904;&#x7406;&#x8DE8;&#x6D4F;&#x89C8;&#x5668;&#x517C;&#x5BB9;&#x95EE;&#x9898;&#x3001;&#x6574;&#x5408;&#x591A;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;SDK&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x90FD;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5B83;&#x7684;&#x8EAB;&#x5F71;&#x3002;<br>&#x5176;&#x5B9E;&#x5728;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x4F1A;&#x4E0D;&#x7ECF;&#x610F;&#x95F4;&#x5199;&#x51FA;&#x7B26;&#x5408;&#x67D0;&#x79CD;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6BD5;&#x7ADF;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x5C31;&#x662F;&#x8001;&#x524D;&#x8F88;&#x4EEC;&#x603B;&#x7ED3;&#x63D0;&#x70BC;&#x51FA;&#x6765;&#x7684;&#x4E00;&#x4E9B;&#x80FD;&#x591F;&#x5E2E;&#x52A9;&#x63D0;&#x5347;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x7684;&#x4E00;&#x4E9B;&#x6A21;&#x7248;&#xFF0C;&#x6E90;&#x4E8E;&#x65E5;&#x5E38;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#x3002;<br>&#x800C;<code>&#x9002;&#x914D;&#x5668;</code>&#x5176;&#x5B9E;&#x5728;<code>JavaScript</code>&#x4E2D;&#x5E94;&#x8BE5;&#x662F;&#x6BD4;&#x8F83;&#x5E38;&#x89C1;&#x7684;&#x4E00;&#x79CD;&#x4E86;&#x3002;</p><p>&#x5728;&#x7EF4;&#x57FA;&#x767E;&#x79D1;&#x4E2D;&#xFF0C;&#x5173;&#x4E8E;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#x7684;&#x5B9A;&#x4E49;&#x4E3A;&#xFF1A;</p><blockquote>&#x5728;&#x8F6F;&#x4EF6;&#x5DE5;&#x7A0B;&#x4E2D;&#xFF0C;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#x662F;&#x4E00;&#x79CD;&#x8F6F;&#x4EF6;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF0C;&#x5141;&#x8BB8;&#x4ECE;&#x53E6;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#x4F7F;&#x7528;&#x73B0;&#x6709;&#x7C7B;&#x7684;&#x63A5;&#x53E3;&#x3002;&#x5B83;&#x901A;&#x5E38;&#x7528;&#x4E8E;&#x4F7F;&#x73B0;&#x6709;&#x7684;&#x7C7B;&#x4E0E;&#x5176;&#x4ED6;&#x7C7B;&#x4E00;&#x8D77;&#x5DE5;&#x4F5C;&#xFF0C;&#x800C;&#x65E0;&#x9700;&#x4FEE;&#x6539;&#x5176;&#x6E90;&#x4EE3;&#x7801;&#x3002;</blockquote><h2 id="articleHeader0">&#x751F;&#x6D3B;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;</h2><p>&#x5728;&#x751F;&#x6D3B;&#x4E2D;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x5C31;&#x662F;&#x7535;&#x6E90;&#x63D2;&#x5934;&#x7684;&#x9002;&#x914D;&#x5668;&#x4E86;&#xFF0C;&#x4E16;&#x754C;&#x5404;&#x56FD;&#x7684;&#x63D2;&#x5EA7;&#x6807;&#x51C6;&#x5404;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x6839;&#x636E;&#x5404;&#x56FD;&#x7684;&#x6807;&#x51C6;&#x8D2D;&#x4E70;&#x5BF9;&#x5E94;&#x7684;&#x7535;&#x6E90;&#x63D2;&#x5934;&#x90A3;&#x672A;&#x514D;&#x592A;&#x8FC7;&#x4E8E;&#x6D6A;&#x8D39;&#x94B1;&#x8D22;&#xFF0C;&#x5982;&#x679C;&#x8BF4;&#x81EA;&#x5DF1;&#x5E26;&#x7740;&#x63D2;&#x5EA7;&#xFF0C;&#x628A;&#x4EBA;&#x5BB6;&#x5899;&#x6572;&#x788E;&#xFF0C;&#x91CD;&#x65B0;&#x63A5;&#x7EBF;&#xFF0C;&#x4E5F;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x73B0;&#x5B9E;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#x5C31;&#x4F1A;&#x6709;&#x63D2;&#x5934;&#x7684;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x7528;&#x6765;&#x5C06;&#x67D0;&#x79CD;&#x63D2;&#x5934;&#x8F6C;&#x6362;&#x6210;&#x53E6;&#x4E00;&#x79CD;&#x63D2;&#x5934;&#xFF0C;&#x5728;&#x63D2;&#x5EA7;&#x548C;&#x4F60;&#x7684;&#x7535;&#x6E90;&#x4E4B;&#x95F4;&#x505A;&#x4E2D;&#x8F6C;&#x7684;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#xFF0C;&#x5C31;&#x662F;&#x9002;&#x914D;&#x5668;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbhcy7?w=443&amp;h=373" src="https://static.alili.tech/img/bVbhcy7?w=443&amp;h=373" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader1">&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x4F53;&#x73B0;</h2><p>&#x800C;&#x8F6C;&#x5411;&#x5230;&#x7F16;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4E2A;&#x4EBA;&#x662F;&#x8FD9;&#x6837;&#x7406;&#x89E3;&#x7684;&#xFF1A;</p><blockquote>&#x5C06;&#x90A3;&#x4E9B;&#x4F60;&#x4E0D;&#x613F;&#x610F;&#x770B;&#x89C1;&#x7684;&#x810F;&#x4EE3;&#x7801;&#x85CF;&#x8D77;&#x6765;&#xFF0C;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x8BF4;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9002;&#x914D;&#x5668;</blockquote><h3 id="articleHeader2">&#x63A5;&#x5165;&#x591A;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;SDK</h3><p>&#x4E3E;&#x4E2A;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x505A;&#x4E00;&#x4E2A;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x5F00;&#x53D1;&#xFF0C;&#x91CC;&#x8FB9;&#x7528;&#x5230;&#x4E86;&#x5FAE;&#x4FE1;&#x7684;&#x652F;&#x4ED8;&#x6A21;&#x5757;&#xFF0C;&#x7ECF;&#x8FC7;&#x957F;&#x65F6;&#x95F4;&#x7684;&#x8054;&#x8C03;&#xFF0C;&#x7EC8;&#x4E8E;&#x8DD1;&#x901A;&#x4E86;&#x6574;&#x4E2A;&#x6D41;&#x7A0B;&#xFF0C;&#x6B63;&#x5F53;&#x4F60;&#x51C6;&#x5907;&#x5F00;&#x5FC3;&#x7684;&#x6253;&#x5305;&#x4E0A;&#x7EBF;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5F97;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;&#x9700;&#x6C42;&#xFF1A;<br><strong>&#x6211;&#x4EEC;&#x9700;&#x8981;&#x63A5;&#x5165;&#x652F;&#x4ED8;&#x5B9D;&#x516C;&#x4F17;&#x53F7;&#x7684;SDK&#xFF0C;&#x4E5F;&#x8981;&#x6709;&#x652F;&#x4ED8;&#x7684;&#x6D41;&#x7A0B;</strong></p><p>&#x4E3A;&#x4E86;&#x590D;&#x7528;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x5728;&#x811A;&#x672C;&#x4E2D;&#x5199;&#x4E0B;&#x8FD9;&#x6837;&#x7684;&#x903B;&#x8F91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (platform === &apos;wechat&apos;) {
  wx.pay(config)
} else if (platform === &apos;alipay&apos;) {
  alipay.pay(config)
}

// &#x505A;&#x4E00;&#x4E9B;&#x540E;&#x7EED;&#x7684;&#x903B;&#x8F91;&#x5904;&#x7406;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (platform === <span class="hljs-string">&apos;wechat&apos;</span>) {
  wx.pay(config)
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (platform === <span class="hljs-string">&apos;alipay&apos;</span>) {
  alipay.pay(config)
}

<span class="hljs-comment">// &#x505A;&#x4E00;&#x4E9B;&#x540E;&#x7EED;&#x7684;&#x903B;&#x8F91;&#x5904;&#x7406;</span></code></pre><p>&#x4F46;&#x662F;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#xFF0C;&#x5404;&#x5382;&#x7684;SDK&#x6240;&#x63D0;&#x4F9B;&#x7684;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x90FD;&#x4F1A;&#x591A;&#x591A;&#x5C11;&#x5C11;&#x6709;&#x4E9B;&#x533A;&#x522B;&#xFF0C;<del>&#x867D;&#x8BF4;&#x6709;&#x4E9B;&#x65F6;&#x5019;&#x6587;&#x6863;&#x53EF;&#x80FD;&#x7528;&#x7684;&#x662F;&#x540C;&#x4E00;&#x4EFD;&#xFF0C;&#x81F4;&#x656C;&#x53CB;&#x5546;&#x3002;</del></p><p>&#x6240;&#x4EE5;&#x9488;&#x5BF9;&#x4E0A;&#x8FF0;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5E76;&#x4E0D;&#x662F;&#x771F;&#x5B9E;&#x7684;&#x53C2;&#x6570;&#x914D;&#x7F6E;&#xFF0C;&#x4EC5;&#x4EC5;&#x4E3E;&#x4F8B;&#x4F7F;&#x7528;
const config = {
  price: 10,
  goodsId: 1
}

// &#x8FD8;&#x6709;&#x53EF;&#x80FD;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x4E5F;&#x4E0D;&#x76F8;&#x540C;
if (platform === &apos;wechat&apos;) {
  config.appId = &apos;XXX&apos;
  config.secretKey = &apos;XXX&apos;
  wx.pay(config).then((err, data) =&gt; {
    if (err) // error

    // success
  })
} else if (platform === &apos;alipay&apos;) {
  config.token = &apos;XXX&apos;
  alipay.pay(config, data =&gt; {
    // success
  }, err =&gt; {
    // error
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5E76;&#x4E0D;&#x662F;&#x771F;&#x5B9E;&#x7684;&#x53C2;&#x6570;&#x914D;&#x7F6E;&#xFF0C;&#x4EC5;&#x4EC5;&#x4E3E;&#x4F8B;&#x4F7F;&#x7528;</span>
<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">price</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">goodsId</span>: <span class="hljs-number">1</span>
}

<span class="hljs-comment">// &#x8FD8;&#x6709;&#x53EF;&#x80FD;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#x4E5F;&#x4E0D;&#x76F8;&#x540C;</span>
<span class="hljs-keyword">if</span> (platform === <span class="hljs-string">&apos;wechat&apos;</span>) {
  config.appId = <span class="hljs-string">&apos;XXX&apos;</span>
  config.secretKey = <span class="hljs-string">&apos;XXX&apos;</span>
  wx.pay(config).then(<span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-comment">// error</span>

    <span class="hljs-comment">// success</span>
  })
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (platform === <span class="hljs-string">&apos;alipay&apos;</span>) {
  config.token = <span class="hljs-string">&apos;XXX&apos;</span>
  alipay.pay(config, data =&gt; {
    <span class="hljs-comment">// success</span>
  }, err =&gt; {
    <span class="hljs-comment">// error</span>
  })
}</code></pre><p>&#x5C31;&#x76EE;&#x524D;&#x6765;&#x8BF4;&#xFF0C;&#x4EE3;&#x7801;&#x63A5;&#x53E3;&#x8FD8;&#x7B97;&#x662F;&#x6E05;&#x6670;&#xFF0C;&#x53EA;&#x8981;&#x6211;&#x4EEC;&#x5199;&#x597D;&#x6CE8;&#x91CA;&#xFF0C;&#x8FD9;&#x4E5F;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x592A;&#x7CDF;&#x7CD5;&#x7684;&#x4EE3;&#x7801;&#x3002;<br>&#x4F46;&#x662F;&#x751F;&#x6D3B;&#x603B;&#x662F;&#x5145;&#x6EE1;&#x4E86;&#x610F;&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x53C8;&#x63A5;&#x5230;&#x4E86;&#x9700;&#x6C42;&#x9700;&#x8981;&#x6DFB;&#x52A0;QQ&#x7684;SDK&#x3001;&#x7F8E;&#x56E2;&#x7684;SDK&#x3001;&#x5C0F;&#x7C73;&#x7684;SDK&#xFF0C;&#x6216;&#x8005;&#x67D0;&#x4E9B;&#x94F6;&#x884C;&#x7684;SDK&#x3002;</p><p>&#x6B64;&#x65F6;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="switch (platform) {
  case &apos;wechat&apos;:
    // &#x5FAE;&#x4FE1;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
  break
  case &apos;QQ&apos;:
    // QQ&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
  break
  case &apos;alipay&apos;:
    // &#x652F;&#x4ED8;&#x5B9D;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
  break
  case &apos;meituan&apos;:
    // &#x7F8E;&#x56E2;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
  break
  case &apos;xiaomi&apos;:
    // &#x5C0F;&#x7C73;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
  break
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">switch</span> (platform) {
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;wechat&apos;</span>:
    <span class="hljs-comment">// &#x5FAE;&#x4FE1;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
  <span class="hljs-keyword">break</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;QQ&apos;</span>:
    <span class="hljs-comment">// QQ&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
  <span class="hljs-keyword">break</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;alipay&apos;</span>:
    <span class="hljs-comment">// &#x652F;&#x4ED8;&#x5B9D;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
  <span class="hljs-keyword">break</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;meituan&apos;</span>:
    <span class="hljs-comment">// &#x7F8E;&#x56E2;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
  <span class="hljs-keyword">break</span>
  <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;xiaomi&apos;</span>:
    <span class="hljs-comment">// &#x5C0F;&#x7C73;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
  <span class="hljs-keyword">break</span>
}</code></pre><p>&#x8FD9;&#x5DF2;&#x7ECF;&#x4E0D;&#x662F;&#x4E00;&#x4E9B;&#x6CE8;&#x91CA;&#x80FD;&#x591F;&#x5F25;&#x8865;&#x7684;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x53D8;&#x5F97;&#x8D8A;&#x6765;&#x8D8A;&#x96BE;&#x7EF4;&#x62A4;&#xFF0C;&#x5404;&#x79CD;SDK&#x5343;&#x5947;&#x767E;&#x602A;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#x679C;&#x5176;&#x4ED6;&#x4EBA;&#x4E5F;&#x8981;&#x505A;&#x7C7B;&#x4F3C;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x5199;&#x4E00;&#x904D;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x90A3;&#x80AF;&#x5B9A;&#x662F;&#x5F88;&#x6D6A;&#x8D39;&#x8D44;&#x6E90;&#x7684;&#x4E00;&#x4EF6;&#x4E8B;&#x513F;&#x3002;</p><p>&#x6240;&#x4EE5;&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;&#x6211;&#x4EEC;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x6E05;&#x6670;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x540E;&#x4EBA;&#x91CD;&#x590D;&#x7684;&#x8E29;&#x8FD9;&#x4E2A;&#x5751;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x5C06;&#x5B83;&#x8FDB;&#x884C;&#x62C6;&#x5206;&#x51FA;&#x6765;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x7684;&#x51FD;&#x6570;&#x6765;&#x5B58;&#x5728;&#xFF1A;<br>&#x627E;&#x5230;&#x5176;&#x4E2D;&#x67D0;&#x4E00;&#x4E2A;SDK&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x6216;&#x8005;&#x4E00;&#x4E2A;&#x6211;&#x4EEC;&#x7EA6;&#x5B9A;&#x597D;&#x7684;&#x89C4;&#x5219;&#x4F5C;&#x4E3A;&#x57FA;&#x51C6;&#x3002;<br>&#x6211;&#x4EEC;&#x6765;&#x544A;&#x8BC9;&#x8C03;&#x7528;&#x65B9;&#xFF0C;&#x4F60;&#x8981;&#x600E;&#x4E48;&#x600E;&#x4E48;&#x505A;&#xFF0C;&#x4F60;&#x80FD;&#x600E;&#x6837;&#x83B7;&#x53D6;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x8FDB;&#x884C;&#x8FD9;&#x4E9B;&#x5404;&#x79CD;&#x80AE;&#x810F;&#x7684;&#x5224;&#x65AD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pay ({
  price,
  goodsId
}) {
  return new Promise((resolve, reject) =&gt; {
    const config = {}

    switch (platform) {
      case &apos;wechat&apos;:
        // &#x5FAE;&#x4FE1;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
        config.price = price
        config.goodsId = goodsId
        config.appId = &apos;XXX&apos;
        config.secretKey = &apos;XXX&apos;
        wx.pay(config).then((err, data) =&gt; {
          if (err) return reject(err)

          resolve(data)
        })
      break
      case &apos;QQ&apos;:
        // QQ&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
        config.price = price * 100
        config.gid = goodsId
        config.appId = &apos;XXX&apos;
        config.secretKey = &apos;XXX&apos;
        config.success = resolve
        config.error = reject
        qq.pay(config)
      break
      case &apos;alipay&apos;:
        // &#x652F;&#x4ED8;&#x5B9D;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;
        config.payment = price
        config.id = goodsId
        config.token = &apos;XXX&apos;
        alipay.pay(config, resolve, reject)
      break
    }
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pay</span> (<span class="hljs-params">{
  price,
  goodsId
}</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> config = {}

    <span class="hljs-keyword">switch</span> (platform) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;wechat&apos;</span>:
        <span class="hljs-comment">// &#x5FAE;&#x4FE1;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
        config.price = price
        config.goodsId = goodsId
        config.appId = <span class="hljs-string">&apos;XXX&apos;</span>
        config.secretKey = <span class="hljs-string">&apos;XXX&apos;</span>
        wx.pay(config).then(<span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
          <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> reject(err)

          resolve(data)
        })
      <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;QQ&apos;</span>:
        <span class="hljs-comment">// QQ&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
        config.price = price * <span class="hljs-number">100</span>
        config.gid = goodsId
        config.appId = <span class="hljs-string">&apos;XXX&apos;</span>
        config.secretKey = <span class="hljs-string">&apos;XXX&apos;</span>
        config.success = resolve
        config.error = reject
        qq.pay(config)
      <span class="hljs-keyword">break</span>
      <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;alipay&apos;</span>:
        <span class="hljs-comment">// &#x652F;&#x4ED8;&#x5B9D;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
        config.payment = price
        config.id = goodsId
        config.token = <span class="hljs-string">&apos;XXX&apos;</span>
        alipay.pay(config, resolve, reject)
      <span class="hljs-keyword">break</span>
    }
  })
}</code></pre><p>&#x8FD9;&#x6837;&#x65E0;&#x8BBA;&#x6211;&#x4EEC;&#x5728;&#x4EC0;&#x4E48;&#x73AF;&#x5883;&#x4E0B;&#xFF0C;&#x53EA;&#x8981;&#x6211;&#x4EEC;&#x7684;&#x9002;&#x914D;&#x5668;&#x652F;&#x6301;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x7EA6;&#x5B9A;&#x597D;&#x7684;&#x901A;&#x7528;&#x89C4;&#x5219;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x800C;&#x5177;&#x4F53;&#x6267;&#x884C;&#x7684;&#x662F;&#x4EC0;&#x4E48;SDK&#xFF0C;&#x5219;&#x662F;&#x9002;&#x914D;&#x5668;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x7684;&#x4E8B;&#x60C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// run anywhere
await pay({
  price: 10,
  goodsId: 1
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// run anywhere</span>
<span class="hljs-keyword">await</span> pay({
  <span class="hljs-attr">price</span>: <span class="hljs-number">10</span>,
  <span class="hljs-attr">goodsId</span>: <span class="hljs-number">1</span>
})</code></pre><p>&#x5BF9;&#x4E8E;SDK&#x63D0;&#x4F9B;&#x65B9;&#xFF0C;&#x4EC5;&#x4EC5;&#x9700;&#x8981;&#x77E5;&#x9053;&#x81EA;&#x5DF1;&#x6240;&#x9700;&#x8981;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x6309;&#x7167;&#x81EA;&#x5DF1;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x3002;<br>&#x5BF9;&#x4E8E;SDK&#x8C03;&#x7528;&#x623F;&#xFF0C;&#x4EC5;&#x4EC5;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x7EA6;&#x5B9A;&#x597D;&#x7684;&#x901A;&#x7528;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4EE5;&#x53CA;&#x6309;&#x7167;&#x7EA6;&#x5B9A;&#x7684;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x76D1;&#x542C;&#x56DE;&#x8C03;&#x5904;&#x7406;&#x3002;</p><p>&#x6574;&#x5408;&#x591A;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;SDK&#x7684;&#x4EFB;&#x52A1;&#x5C31;&#x4EA4;&#x7531;&#x9002;&#x914D;&#x5668;&#x6765;&#x505A;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5C06;&#x9002;&#x914D;&#x5668;&#x7684;&#x4EE3;&#x7801;&#x538B;&#x7F29;&#xFF0C;&#x6DF7;&#x6DC6;&#xFF0C;&#x653E;&#x5728;&#x4E00;&#x4E2A;&#x770B;&#x4E0D;&#x89C1;&#x7684;&#x89D2;&#x843D;&#x91CC;&#x53BB;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x903B;&#x8F91;&#x5C31;&#x4F1A;&#x53D8;&#x5F97;&#x5F88;&#x6E05;&#x6670;&#x4E86; :)&#x3002;</p><p>&#x9002;&#x914D;&#x5668;&#x5927;&#x81F4;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x6709;&#x4E00;&#x70B9;&#x4E00;&#x5B9A;&#x8981;&#x660E;&#x786E;&#xFF0C;&#x9002;&#x914D;&#x5668;&#x4E0D;&#x662F;&#x94F6;&#x5F39;&#xFF0C;__&#x90A3;&#x4E9B;&#x7E41;&#x7410;&#x7684;&#x4EE3;&#x7801;&#x59CB;&#x7EC8;&#x662F;&#x5B58;&#x5728;&#x7684;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x4F60;&#x5728;&#x5199;&#x4E1A;&#x52A1;&#x7684;&#x65F6;&#x5019;&#x770B;&#x4E0D;&#x5230;&#x5B83;&#x7F62;&#x4E86;__&#xFF0C;&#x773C;&#x4E0D;&#x89C1;&#x5FC3;&#x4E0D;&#x70E6;&#x3002;</p><h3 id="articleHeader3">&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x4F8B;&#x5B50;</h3><p>&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#xFF0C;<code>jQuery</code>&#x4E2D;&#x5C31;&#x6709;&#x5F88;&#x591A;&#x9002;&#x914D;&#x5668;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x5305;&#x62EC;&#x6700;&#x57FA;&#x7840;&#x7684;<code>$(&apos;selector&apos;).on</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0D;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x660E;&#x663E;&#x7684;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#x4E48;&#xFF1F;</p><p>&#x4E00;&#x6B65;&#x6B65;&#x7684;&#x8FDB;&#x884C;&#x964D;&#x7EA7;&#xFF0C;&#x5E76;&#x4E14;&#x62B9;&#x5E73;&#x4E86;&#x4E00;&#x4E9B;&#x6D4F;&#x89C8;&#x5668;&#x4E4B;&#x95F4;&#x7684;&#x5DEE;&#x5F02;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7B80;&#x5355;&#x7684;<code>on</code>&#x6765;&#x8FDB;&#x884C;&#x5728;&#x4E3B;&#x6D41;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x8FDB;&#x884C;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F2A;&#x4EE3;&#x7801;&#x793A;&#x4F8B;
function on (target, event, callback) {
  if (target.addEventListener) {
    // &#x6807;&#x51C6;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x65B9;&#x5F0F;
    target.addEventListener(event, callback)
  } else if (target.attachEvent) {
    // IE&#x4F4E;&#x7248;&#x672C;&#x7684;&#x76D1;&#x542C;&#x65B9;&#x5F0F;
    target.attachEvent(event, callback)
  } else {
    // &#x4E00;&#x4E9B;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x65B9;&#x5F0F;
    target[`on${event}`] = callback
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F2A;&#x4EE3;&#x7801;&#x793A;&#x4F8B;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">on</span> (<span class="hljs-params">target, event, callback</span>) </span>{
  <span class="hljs-keyword">if</span> (target.addEventListener) {
    <span class="hljs-comment">// &#x6807;&#x51C6;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x65B9;&#x5F0F;</span>
    target.addEventListener(event, callback)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (target.attachEvent) {
    <span class="hljs-comment">// IE&#x4F4E;&#x7248;&#x672C;&#x7684;&#x76D1;&#x542C;&#x65B9;&#x5F0F;</span>
    target.attachEvent(event, callback)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// &#x4E00;&#x4E9B;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x65B9;&#x5F0F;</span>
    target[<span class="hljs-string">`on<span class="hljs-subst">${event}</span>`</span>] = callback
  }
}</code></pre><p>&#x6216;&#x8005;&#x5728;Node&#x4E2D;&#x7684;&#x8FD9;&#x6837;&#x7684;&#x4F8B;&#x5B50;&#x66F4;&#x662F;&#x5E38;&#x89C1;&#xFF0C;&#x56E0;&#x4E3A;&#x65E9;&#x5E74;&#x662F;&#x6CA1;&#x6709;<code>Promise</code>&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5927;&#x591A;&#x6570;&#x7684;&#x5F02;&#x6B65;&#x7531;<code>callback</code>&#x6765;&#x5B8C;&#x6210;&#xFF0C;&#x4E14;&#x6709;&#x4E00;&#x4E2A;&#x7EA6;&#x5B9A;&#x597D;&#x7684;&#x89C4;&#x5219;&#xFF0C;<code>Error-first callback</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;)

fs.readFile(&apos;test.txt&apos;, (err, data) =&gt; {
  if (err) // &#x5904;&#x7406;&#x5F02;&#x5E38;

  // &#x5904;&#x7406;&#x6B63;&#x786E;&#x7ED3;&#x679C;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

fs.readFile(<span class="hljs-string">&apos;test.txt&apos;</span>, (err, data) =&gt; {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-comment">// &#x5904;&#x7406;&#x5F02;&#x5E38;</span>

  <span class="hljs-comment">// &#x5904;&#x7406;&#x6B63;&#x786E;&#x7ED3;&#x679C;</span>
})</code></pre><p>&#x800C;&#x6211;&#x4EEC;&#x7684;&#x65B0;&#x529F;&#x80FD;&#x90FD;&#x91C7;&#x7528;&#x4E86;<code>async/await</code>&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8FDB;&#x884C;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x590D;&#x7528;&#x4E00;&#x4E9B;&#x8001;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x529F;&#x80FD;&#x65F6;&#xFF0C;&#x76F4;&#x63A5;&#x53BB;&#x4FEE;&#x6539;&#x8001;&#x9879;&#x76EE;&#x7684;&#x4EE3;&#x7801;&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x53EF;&#x884C;&#x7684;&#x3002;<br>&#x8FD9;&#x6837;&#x7684;&#x517C;&#x5BB9;&#x5904;&#x7406;&#x9700;&#x8981;&#x8C03;&#x7528;&#x65B9;&#x6765;&#x505A;&#xFF0C;&#x6240;&#x4EE5;&#x4E3A;&#x4E86;&#x8BA9;&#x903B;&#x8F91;&#x4EE3;&#x7801;&#x770B;&#x8D77;&#x6765;&#x4E0D;&#x662F;&#x592A;&#x6DF7;&#x4E71;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x5C06;&#x8FD9;&#x6837;&#x7684;&#x56DE;&#x8C03;&#x8F6C;&#x6362;&#x4E3A;<code>Promise</code>&#x7684;&#x7248;&#x672C;&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;)

function readFile (fileName) {
  return new Promise((resolve, reject) =&gt; {
    fs.readFile(fileName, (err, data) =&gt; {
      if (err) reject(err)

      resolve(data)
    })
  })
}

await readFile(&apos;test.txt&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readFile</span> (<span class="hljs-params">fileName</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    fs.readFile(fileName, (err, data) =&gt; {
      <span class="hljs-keyword">if</span> (err) reject(err)

      resolve(data)
    })
  })
}

<span class="hljs-keyword">await</span> readFile(<span class="hljs-string">&apos;test.txt&apos;</span>)</code></pre><p>&#x56E0;&#x4E3A;&#x524D;&#x8FB9;&#x4E5F;&#x63D0;&#x5230;&#x4E86;&#xFF0C;&#x8FD9;&#x79CD;<code>Error-first callback</code>&#x662F;&#x4E00;&#x4E2A;&#x7EA6;&#x5B9A;&#x597D;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x677E;&#x7684;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x901A;&#x7528;&#x7684;&#x9002;&#x914D;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function promisify(func) {
  return (...args) =&gt; new Promise((resolve, reject) =&gt; {
    func(...args, (err, data) =&gt; {
      if (err) reject(err)

      resolve(data)
    })
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promisify</span>(<span class="hljs-params">func</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    func(...args, (err, data) =&gt; {
      <span class="hljs-keyword">if</span> (err) reject(err)

      resolve(data)
    })
  })
}</code></pre><p>&#x7136;&#x540E;&#x5728;&#x4F7F;&#x7528;&#x524D;&#x8FDB;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x8F6C;&#x6362;&#x5C31;&#x53EF;&#x4EE5;&#x7528;&#x6211;&#x4EEC;&#x9884;&#x671F;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6267;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require(&apos;fs&apos;)

const readFile = promisify(fs.readFile)

await readFile(&apos;test.txt&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-keyword">const</span> readFile = promisify(fs.readFile)

<span class="hljs-keyword">await</span> readFile(<span class="hljs-string">&apos;test.txt&apos;</span>)</code></pre><blockquote>&#x5728;Node8&#x4E2D;&#xFF0C;&#x5B98;&#x65B9;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#xFF1A;<a href="https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original" rel="nofollow noreferrer" target="_blank">util.promisify</a></blockquote><h2 id="articleHeader4">&#x5C0F;&#x7ED3;</h2><p>&#x4E2A;&#x4EBA;&#x89C2;&#x70B9;&#xFF1A;&#x6240;&#x6709;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x90FD;&#x4E0D;&#x662F;&#x51ED;&#x7A7A;&#x60F3;&#x8C61;&#x51FA;&#x6765;&#x7684;&#xFF0C;&#x80AF;&#x5B9A;&#x662F;&#x5728;&#x5F00;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x603B;&#x7ED3;&#x63D0;&#x70BC;&#x51FA;&#x7684;&#x4E00;&#x4E9B;&#x9AD8;&#x6548;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x53EF;&#x80FD;&#x4F60;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x521A;&#x5F00;&#x59CB;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x53BB;&#x751F;&#x5543;&#x8FD9;&#x4E9B;&#x5404;&#x79CD;&#x547D;&#x540D;&#x9AD8;&#x5927;&#x4E0A;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x3002;<br>&#x56E0;&#x4E3A;&#x4E66;&#x4E2D;&#x6240;&#x8BF4;&#x7684;&#x573A;&#x666F;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x5168;&#x9762;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x9488;&#x5BF9;&#x67D0;&#x4E9B;&#x8BED;&#x8A00;&#xFF0C;&#x4F1A;&#x5B58;&#x5728;&#x66F4;&#x597D;&#x7684;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x751F;&#x642C;&#x786C;&#x5957;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x4F1A;&#x5199;&#x51FA;&#x6709;&#x7075;&#x9B42;&#x7684;&#x4EE3;&#x7801; :)</p><blockquote>&#x7EB8;&#x4E0A;&#x5F97;&#x6765;&#x7EC8;&#x89C9;&#x6D45;&#xFF0C;&#x7EDD;&#x77E5;&#x6B64;&#x4E8B;&#x8981;&#x8EAC;&#x884C;&#x3002; &#x2014;&#x2014;&#x2014;&#x2014; &#x300A;&#x51AC;&#x591C;&#x8BFB;&#x4E66;&#x793A;&#x5B50;&#x807F;&#x300B;&#xFF0C;&#x9646;&#x6E38;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
适配器在JavaScript中的体现

## 原文链接
[https://segmentfault.com/a/1190000016453875](https://segmentfault.com/a/1190000016453875)


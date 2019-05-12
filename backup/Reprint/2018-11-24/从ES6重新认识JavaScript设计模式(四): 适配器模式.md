---
title: '从ES6重新认识JavaScript设计模式(四): 适配器模式' 
date: 2018-11-24 2:30:10
hidden: true
slug: ul503chsf5
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0"><strong>1 &#x4EC0;&#x4E48;&#x662F;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;</strong></h3><blockquote><strong>&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;(Adapter)</strong>&#xFF1A;&#x5C06;&#x4E00;&#x4E2A;&#x7C7B;&#x7684;&#x63A5;&#x53E3;&#x8F6C;&#x6362;&#x6210;&#x5BA2;&#x6237;&#x5E0C;&#x671B;&#x7684;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#xFF0C;&#x4F7F;&#x5F97;&#x539F;&#x672C;&#x7531;&#x4E8E;&#x63A5;&#x53E3;&#x4E0D;&#x517C;&#x5BB9;&#x800C;&#x4E0D;&#x80FD;&#x4E00;&#x8D77;&#x5DE5;&#x4F5C;&#x7684;&#x90A3;&#x4E9B;&#x7C7B;&#x53EF;&#x4EE5;&#x4E00;&#x8D77;&#x5DE5;&#x4F5C;&#x3002;</blockquote><p>&#x5728;&#x751F;&#x6D3B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x8BB8;&#x591A;&#x7684;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x4F8B;&#x5982;iPhone7&#x4EE5;&#x540E;&#x7684;&#x8033;&#x673A;&#x63A5;&#x53E3;&#x4ECE;3.5mm&#x5706;&#x5B54;&#x63A5;&#x53E3;&#x66F4;&#x6539;&#x6210;&#x4E3A;&#x4E86;&#x82F9;&#x679C;&#x4E13;&#x5C5E;&#x7684; lightning&#x63A5;&#x53E3;&#x3002;&#x8BB8;&#x591A;&#x4EBA;&#x4EE5;&#x524D;&#x7684;&#x5706;&#x5B54;&#x8033;&#x673A;&#x5C31;&#x9700;&#x8981;&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x4E2A;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x624D;&#x80FD;&#x591F;&#x5728;&#x81EA;&#x4E2A;&#x513F;&#x65B0;&#x4E70;&#x7684;iPhone&#x4E0A;&#x9762;&#x542C;&#x6B4C;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015482455?w=517&amp;h=468" src="https://static.alili.tech/img/remote/1460000015482455?w=517&amp;h=468" alt="image_1chh3hfii6f51tbbs71cc7cnqm.png-64.6kB" title="image_1chh3hfii6f51tbbs71cc7cnqm.png-64.6kB" style="cursor:pointer;display:inline"></span></p><p>&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x9047;&#x89C1;&#x8FD9;&#x6837;&#x7684;&#x573A;&#x666F;&#xFF1A;&#x5F53;&#x6211;&#x4EEC;&#x8BD5;&#x56FE;&#x8C03;&#x7528;&#x67D0;&#x4E2A;&#x6A21;&#x5757;&#x6216;&#x8005;&#x5BF9;&#x8C61;&#x7684;&#x63A5;&#x53E3;&#x65F6;&#xFF0C;&#x5374;&#x53D1;&#x73B0;&#x8FD9;&#x4E2A;<strong>&#x63A5;&#x53E3;&#x7684;&#x683C;&#x5F0F;&#x4E0D;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x7684;&#x9700;&#x6C42;</strong>&#x3002;&#x8FD9;&#x65F6;&#x6709;&#x4E24;&#x79CD;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;&#x7B2C;&#x4E00;&#x79CD;&#x662F;&#x4FEE;&#x6539;&#x539F;&#x6765;&#x7684;&#x63A5;&#x53E3;&#x5B9E;&#x73B0;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x539F;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x4F8B;&#x5982;&#x662F;&#x4E00;&#x4E2A;&#x5E93;&#x6216;&#x6846;&#x67B6;&#xFF0C;&#x66F4;&#x6539;&#x539F;&#x4EE3;&#x7801;&#x5C31;&#x663E;&#x5F97;&#x5F88;&#x4E0D;&#x73B0;&#x5B9E;&#x4E86;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x65F6;&#x5C31;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x4ECA;&#x5929;&#x6240;&#x8BB2;&#x7684;&#x7B2C;&#x4E8C;&#x79CD;&#x529E;&#x6CD5;&#xFF1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x5C06;&#x539F;&#x63A5;&#x53E3;&#x8F6C;&#x6362;&#x4E3A;&#x5BA2;&#x6237;&#x5E0C;&#x671B;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#xFF0C;&#x5BA2;&#x6237;&#x53EA;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x9002;&#x914D;&#x5668;&#x5373;&#x53EF;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x53EA;&#x6709;JavaScript&#x8FD9;&#x4E00;&#x95E8;&#x8BED;&#x8A00;&#x7ECF;&#x9A8C;&#x7684;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x6765;&#x8BF4;&#xFF0C;&#x53EF;&#x80FD;&#x5BF9;&#x4E8E;&#x63A5;&#x53E3;&#x7684;&#x6982;&#x5FF5;&#x6BD4;&#x8F83;&#x964C;&#x751F;&#x3002;&#x5EFA;&#x8BAE;&#x53C2;&#x8003;&#x9605;&#x8BFB;<a href="https://www.tslang.cn/docs/handbook/interfaces.html" rel="nofollow noreferrer" target="_blank">TypeScript-&#x63A5;&#x53E3;</a>&#x7684;&#x6587;&#x6863;&#x6765;&#x66F4;&#x597D;&#x7684;&#x7406;&#x89E3;&#x63A5;&#x53E3;&#x3002;</p><h3 id="articleHeader1"><strong>2 ES6&#x4E2D;&#x7684;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;</strong></h3><p>&#x5728;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E00;&#x822C;&#x6709;&#x4EE5;&#x4E0B;&#x4E09;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;&#x5E93;&#x7684;&#x9002;&#x914D;&#x3001;&#x53C2;&#x6570;&#x7684;&#x9002;&#x914D;&#x548C;&#x6570;&#x636E;&#x7684;&#x9002;&#x914D;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x5C06;&#x4EE5;&#x6211;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x5B9E;&#x9645;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#x660E;&#x3002;</p><h4><strong>2.1 &#x5E93;&#x7684;&#x9002;&#x914D;</strong></h4><p>&#x9879;&#x76EE;&#x4E0A;&#x7EBF;&#x524D;&#x901A;&#x5E38;&#x4F1A;&#x8981;&#x6C42;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#x5728;&#x9875;&#x9762;&#x4E2D;&#x4F1A;&#x63A5;&#x5165;&#x7EDF;&#x8BA1;&#x7F51;&#x9875;&#x6570;&#x636E;&#x7528;&#x7684;SDK&#xFF0C;&#x8FD9;&#x4E9B;SDK&#x80FD;&#x591F;&#x91C7;&#x96C6;&#x7528;&#x6237;&#x7684;&#x4FE1;&#x606F;&#x548C;&#x7F51;&#x9875;&#x884C;&#x751F;&#x6210;&#x53EF;&#x89C6;&#x5316;&#x7684;&#x56FE;&#x8868;&#x548C;&#x8868;&#x683C;&#xFF0C;&#x6765;&#x5E2E;&#x52A9;&#x7F51;&#x7AD9;&#x8FD0;&#x8425;&#x4EBA;&#x5458;&#x548C;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x66F4;&#x597D;&#x7684;&#x6839;&#x636E;&#x7528;&#x6237;&#x884C;&#x4E3A;&#x6765;&#x63D0;&#x5347;&#x7F51;&#x9875;&#x8D28;&#x91CF;&#x3002;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x9002;&#x914D;&#x5668;&#x5728;&#x63A5;&#x5165;&#x91C7;&#x96C6;&#x6570;&#x636E;&#x7684;&#x5E93;&#x65F6;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015482456" src="https://static.alili.tech/img/remote/1460000015482456" alt="Who-is-a-Data-Analyst-Digital-nest-www.digitalnest.in_.png-230kB" title="Who-is-a-Data-Analyst-Digital-nest-www.digitalnest.in_.png-230kB" style="cursor:pointer"></span></p><p>&#x76EE;&#x524D;&#x56FD;&#x5185;&#x505A;&#x5F97;&#x6BD4;&#x8F83;&#x597D;&#x7684;&#x6570;&#x636E;&#x5206;&#x6790;&#x7F51;&#x7AD9;&#x6709;<a href="https://mtj.baidu.com/web/welcome/landing" rel="nofollow noreferrer" target="_blank">&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;</a>&#x3001;<a href="https://www.sensorsdata.cn/" rel="nofollow noreferrer" target="_blank">&#x795E;&#x7B56;&#x6570;&#x636E;</a>&#x3001;<a href="https://www.umeng.com/" rel="nofollow noreferrer" target="_blank">&#x53CB;&#x76DF;</a>&#x7B49;&#x3002;&#x5728;&#x4E00;&#x4E2A;&#x4F60;&#x505A;&#x7684;&#x7535;&#x5546;&#x7C7B;&#x7F51;&#x7AD9; &#x9879;&#x76EE;&#x4E0A;&#x7EBF;&#x524D;&#xFF0C;&#x4F60;&#x7684;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x8981;&#x6C42;&#x4F60;&#x63A5;&#x5165;&#x4E86;&#x767E;&#x5EA6;&#x7684;&#x4EE3;&#x7801;&#x7528;&#x4E8E;&#x6570;&#x636E;&#x91C7;&#x96C6;&#xFF0C;&#x5E76;&#x5728;&#x51E0;&#x5341;&#x4E2A;&#x6D89;&#x53CA;&#x7528;&#x6237;&#x64CD;&#x4F5C;&#x7684;&#x5730;&#x65B9;&#x8FDB;&#x884C;&#x4E86;&#x57CB;&#x70B9;&#x3002;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x63D0;&#x4F9B;&#x7684;&#x57CB;&#x70B9;&#x63A5;&#x53E3;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _hmt.push([&apos;_trackEvent&apos;, category, action, opt_label,opt_value]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript" style="word-break:break-word;white-space:initial"> _hmt.push([<span class="hljs-string">&apos;_trackEvent&apos;</span>, category, action, opt_label,opt_value]);</code></pre><p>&#x6309;&#x7167;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x7684;&#x8981;&#x6C42;&#xFF0C;&#x4F60;&#x6839;&#x636E;&#x4E0A;&#x9762;&#x7684;&#x683C;&#x5F0F;&#x5C06;&#x57CB;&#x70B9;&#x4EE3;&#x7801;&#x5199;&#x5230;&#x4E86;&#x9875;&#x9762;&#x7684;&#x591A;&#x4E2A;&#x5730;&#x65B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html
_hmt.push([&apos;_trackEvent&apos;, &apos;web&apos;, &apos;page_enter&apos;, &apos;position&apos;, &apos;index.html&apos;]);

//product-detail.html
_hmt.push([&apos;_trackEvent&apos;, &apos;web&apos;, &apos;page_enter&apos;, &apos;position&apos;, &apos;product-detail.html&apos;]);

_hmt.push([&apos;_trackEvent&apos;, &apos;web&apos;, &apos;product_detail_view&apos;, &apos;product_id&apos;, productId]);

_hmt.push([&apos;_trackEvent&apos;, &apos;web&apos;, &apos;add-product-chart&apos;, &apos;product_id&apos;, productId]);

//...&#x8FD8;&#x6709;&#x51E0;&#x5341;&#x4E2A;&#x9875;&#x9762;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code><span class="hljs-comment">//index.html</span>
_hmt.<span class="hljs-keyword">push</span>([<span class="hljs-string">&apos;_trackEvent&apos;</span>, <span class="hljs-string">&apos;web&apos;</span>, <span class="hljs-string">&apos;page_enter&apos;</span>, <span class="hljs-string">&apos;position&apos;</span>, <span class="hljs-string">&apos;index.html&apos;</span>]);

<span class="hljs-comment">//product-detail.html</span>
_hmt.<span class="hljs-keyword">push</span>([<span class="hljs-string">&apos;_trackEvent&apos;</span>, <span class="hljs-string">&apos;web&apos;</span>, <span class="hljs-string">&apos;page_enter&apos;</span>, <span class="hljs-string">&apos;position&apos;</span>, <span class="hljs-string">&apos;product-detail.html&apos;</span>]);

_hmt.<span class="hljs-keyword">push</span>([<span class="hljs-string">&apos;_trackEvent&apos;</span>, <span class="hljs-string">&apos;web&apos;</span>, <span class="hljs-string">&apos;product_detail_view&apos;</span>, <span class="hljs-string">&apos;product_id&apos;</span>, productId]);

_hmt.<span class="hljs-keyword">push</span>([<span class="hljs-string">&apos;_trackEvent&apos;</span>, <span class="hljs-string">&apos;web&apos;</span>, <span class="hljs-string">&apos;add-product-chart&apos;</span>, <span class="hljs-string">&apos;product_id&apos;</span>, productId]);

<span class="hljs-comment">//...&#x8FD8;&#x6709;&#x51E0;&#x5341;&#x4E2A;&#x9875;&#x9762;</span></code></pre><p>&#x8FC7;&#x4E86;&#x51E0;&#x4E2A;&#x6708;&#x4E4B;&#x540E;&#xFF0C;&#x8BE5;&#x7535;&#x5546;&#x7F51;&#x7AD9;&#x53D1;&#x5C55;&#x901F;&#x5EA6;&#x5F88;&#x5FEB;&#xFF0C;&#x8FD0;&#x8425;&#x4EBA;&#x5458;&#x611F;&#x89C9;&#x5230;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x63D0;&#x4F9B;&#x7684;&#x91C7;&#x96C6;&#x6570;&#x636E;&#x5728;&#x5DF2;&#x7ECF;&#x65E0;&#x6CD5;&#x6EE1;&#x8DB3;&#x5F53;&#x524D;&#x7F51;&#x7AD9;&#x7684;&#x89C4;&#x6A21;&#x3002;&#x8FD0;&#x8425;&#x4EBA;&#x5458;&#x548C;&#x4EA7;&#x54C1;&#x7ECF;&#x7406;&#x5546;&#x91CF;&#x540E;&#x51B3;&#x5B9A;&#xFF0C;&#x6570;&#x636E;&#x91C7;&#x96C6;&#x5E73;&#x53F0;&#x9700;&#x8981;&#x4ECE;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x5207;&#x6362;&#x5230;&#x795E;&#x7B56;&#x6570;&#x636E;&#xFF0C;&#x795E;&#x7B56;&#x6570;&#x636E;&#x63D0;&#x4F9B;&#x7684;&#x57CB;&#x70B9;&#x63A5;&#x53E3;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sa.track(eventName, {
  attrName: value 
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript">sa.track(eventName, {
  <span class="hljs-attr">attrName</span>: value 
})</code></pre><p>&#x63A5;&#x53E3;&#x7684;&#x89C4;&#x5219;&#x4E0D;&#x540C;&#xFF0C;&#x5C31;&#x610F;&#x5473;&#x7740;&#x4F60;&#x9700;&#x8981;&#x5C06;&#x51E0;&#x5341;&#x4E2A;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x7684;<code>_htm.push</code>&#x63A5;&#x53E3;&#x66F4;&#x6539;&#x6210;&#x4E3A;&#x795E;&#x7B56;&#x63D0;&#x4F9B;&#x7684;<code>sa.track</code>&#x63A5;&#x53E3;&#x3002;&#x5176;&#x5B9E;&#x4E0D;&#x7528;&#x8FD9;&#x4E48;&#x9EBB;&#x70E6;&#xFF0C;&#x5199;&#x4E00;&#x4E2A;&#x9002;&#x914D;&#x5668;&#x5C31;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x6240;&#x6709;&#x57CB;&#x70B9;&#x4E8B;&#x4EF6;&#x7684;&#x8FC1;&#x79FB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.js

let _hmt = {
  push: (arr) {
    
    const [eventName, attrName, value] = [...arr.splice(2)];
    
    let attrObj = {
      [attrName]: value
    };

    sa.track(eventName, attrObj);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code><span class="hljs-comment">//app.js</span>

<span class="hljs-keyword">let</span> _hmt = {
  push: (arr) {
    
    <span class="hljs-keyword">const</span> [eventName, attrName, <span class="hljs-keyword">value</span>] = [...arr.splice(<span class="hljs-number">2</span>)];
    
    <span class="hljs-keyword">let</span> attrObj = {
      [attrName]: <span class="hljs-keyword">value</span>
    };

    sa.track(eventName, attrObj);
  }
}</code></pre><p>&#x901A;&#x8FC7;&#x5206;&#x6790;&#x6BD4;&#x8F83;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x7684;&#x63A5;&#x53E3;&#x548C;&#x795E;&#x7B56;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x5728;&#x795E;&#x7B56;&#x4E2D;&#x53EA;&#x9700;&#x8981;&#x4F20;&#x5165;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<code>eventName</code>&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x63A5;&#x53E3;&#x4E2D;&#x7684;<code>action</code>, <code>attrName</code>&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x63A5;&#x53E3;&#x4E2D;&#x7684;<code>opt_label</code>&#xFF0C; <code>value</code>&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x63A5;&#x53E3;&#x4E2D;&#x7684;<code>opt_value</code>; &#x5220;&#x9664;&#x4E86;&#x767E;&#x5EA6;&#x7EDF;&#x8BA1;&#x7684;SDK&#x540E;&#xFF0C;SDK&#x6240;&#x63D0;&#x4F9B;&#x7684;<code>_htm</code>&#x8FD9;&#x4E2A;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E5F;&#x5C31;&#x4E0D;&#x5B58;&#x5728;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x8BE5;&#x53D8;&#x91CF;&#x540D;&#x505A;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x5728;<code>push</code>&#x65B9;&#x6CD5;&#x83B7;&#x53D6;<code>sa.track</code>&#x6240;&#x9700;&#x8981;&#x7684;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x5E76;&#x8C03;&#x7528;<code>sa.track</code>&#x5373;&#x53EF;&#x3002;</p><h4><strong>2.2 &#x53C2;&#x6570;&#x7684;&#x9002;&#x914D;</strong></h4><p>&#x6709;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x4F20;&#x5165;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4F8B;&#x5982;&#x5728;<code>SDK</code>&#x8FD9;&#x4E2A;&#x7C7B;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;<code>phoneStatus</code>&#xFF0C;&#x9700;&#x8981;&#x4F20;&#x5165;&#x4E94;&#x4E2A;&#x53C2;&#x6570;&#x7528;&#x4E8E;&#x63A5;&#x6536;&#x624B;&#x673A;&#x7684;&#x76F8;&#x5173;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SDK {
  phoneStatus(brand, os, carrier, language, network) {

    //dosomething.....
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SDK</span> </span>{
  phoneStatus(brand, os, carrier, language, network) {

    <span class="hljs-comment">//dosomething.....</span>
  }
}</code></pre><p>&#x901A;&#x5E38;&#x5728;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x5927;&#x4E8E;3&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x8003;&#x8651;&#x5C06;&#x53C2;&#x6570;&#x5408;&#x5E76;&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5F62;&#x5F0F;&#xFF0C;&#x5C31;&#x50CF;&#x6211;&#x4EEC;<code>$.ajax</code>&#x7684;&#x505A;&#x6CD5;&#x4E00;&#x6837;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5C06;<code>phoneStatus</code>&#x7684;&#x53C2;&#x6570;&#x63A5;&#x53E3;&#x5B9A;&#x4E49;&#x5982;&#x4E0B;&#xFF08;<code>String</code>&#x4EE3;&#x8868;&#x53C2;&#x6570;&#x7C7B;&#x578B;&#xFF0C;<code>?:</code> &#x4EE3;&#x8868;&#x53EF;&#x9009;&#x9879;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  brand: String
  os: String
  carrier:? String
  language:? String
  network:? String
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>{
  brand: <span class="hljs-keyword">String</span>
  os: <span class="hljs-keyword">String</span>
  carrier:? <span class="hljs-keyword">String</span>
  language:? <span class="hljs-keyword">String</span>
  network:? <span class="hljs-keyword">String</span>
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;<code>carrier</code>&#x3001;<code>language</code>&#xFF0C;<code>network</code>&#x8FD9;&#x4E09;&#x4E2A;&#x5C5E;&#x6027;&#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x4F20;&#x5165;&#x7684;&#xFF0C;&#x5B83;&#x4EEC;&#x5728;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x53EF;&#x80FD;&#x88AB;&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x9ED8;&#x8BA4;&#x503C;&#x3002;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x65B9;&#x6CD5;&#x5185;&#x90E8;&#x91C7;&#x7528;&#x9002;&#x914D;&#x5668;&#x6765;&#x9002;&#x914D;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class SDK {
  phoneStatus(config) {
    
    let defaultConfig = {
      brand: null,  //&#x624B;&#x673A;&#x54C1;&#x724C;
      os: null, //&#x7CFB;&#x7EDF;&#x7C7B;&#x578B;&#xFF1A; Andoird&#x6216; iOS
      carrier: &apos;china-mobile&apos;, //&#x8FD0;&#x8425;&#x5546;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E2D;&#x56FD;&#x79FB;&#x52A8;
      language: &apos;zh&apos;, //&#x8BED;&#x8A00;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E2D;&#x6587;
      network: &apos;wifi&apos;, //&#x7F51;&#x7EDC;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;wifi
    }
    
    //&#x53C2;&#x6570;&#x9002;&#x914D;
    for( let i in config) {
      defaultConfig[i] = config[i] || defaultConfig[i];
    }
    
    //dosomething.....
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SDK</span> </span>{
  phoneStatus(config) {
    
    <span class="hljs-keyword">let</span> defaultConfig = {
      <span class="hljs-attr">brand</span>: <span class="hljs-literal">null</span>,  <span class="hljs-comment">//&#x624B;&#x673A;&#x54C1;&#x724C;</span>
      os: <span class="hljs-literal">null</span>, <span class="hljs-comment">//&#x7CFB;&#x7EDF;&#x7C7B;&#x578B;&#xFF1A; Andoird&#x6216; iOS</span>
      carrier: <span class="hljs-string">&apos;china-mobile&apos;</span>, <span class="hljs-comment">//&#x8FD0;&#x8425;&#x5546;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E2D;&#x56FD;&#x79FB;&#x52A8;</span>
      language: <span class="hljs-string">&apos;zh&apos;</span>, <span class="hljs-comment">//&#x8BED;&#x8A00;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E2D;&#x6587;</span>
      network: <span class="hljs-string">&apos;wifi&apos;</span>, <span class="hljs-comment">//&#x7F51;&#x7EDC;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;wifi</span>
    }
    
    <span class="hljs-comment">//&#x53C2;&#x6570;&#x9002;&#x914D;</span>
    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> config) {
      defaultConfig[i] = config[i] || defaultConfig[i];
    }
    
    <span class="hljs-comment">//dosomething.....</span>
  }
}</code></pre><h4><strong>2.3 &#x6570;&#x636E;&#x7684;&#x9002;&#x914D;</strong></h4><p>&#x6570;&#x636E;&#x7684;&#x9002;&#x914D;&#x5728;&#x524D;&#x7AEF;&#x4E2D;&#x662F;&#x6700;&#x4E3A;&#x5E38;&#x89C1;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x8FD9;&#x65F6;&#x9002;&#x914D;&#x5668;&#x5728;&#x89E3;&#x51B3;&#x524D;&#x540E;&#x7AEF;&#x7684;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x4E0A;&#x6709;&#x7740;&#x91CD;&#x8981;&#x7684;&#x610F;&#x4E49;&#x3002;&#x901A;&#x5E38;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#x548C;&#x6211;&#x4EEC;&#x524D;&#x7AEF;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x662F;&#x4E0D;&#x4E00;&#x81F4;&#x7684;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x5728;&#x5728;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;UI&#x6846;&#x67B6;&#x65F6;&#xFF0C;&#x6846;&#x67B6;&#x6240;&#x89C4;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x6709;&#x7740;&#x56FA;&#x5B9A;&#x7684;&#x683C;&#x5F0F;&#x3002;&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5C31;&#x9700;&#x8981;&#x5BF9;&#x540E;&#x7AEF;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x8FDB;&#x884C;&#x9002;&#x914D;&#x3002;</p><p>&#x4F8B;&#x5982;&#x7F51;&#x9875;&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;Echarts&#x6298;&#x7EBF;&#x56FE;&#x5BF9;&#x7F51;&#x7AD9;&#x6BCF;&#x5468;&#x7684;<code>uv</code>&#xFF0C;&#x901A;&#x5E38;&#x540E;&#x7AEF;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {
    &quot;day&quot;: &quot;&#x5468;&#x4E00;&quot;,
    &quot;uv&quot;: 6300
  },
  {
    &quot;day&quot;: &quot;&#x5468;&#x4E8C;&quot;,
    &quot;uv&quot;: 7100
  },  {
    &quot;day&quot;: &quot;&#x5468;&#x4E09;&quot;,
    &quot;uv&quot;: 4300
  },  {
    &quot;day&quot;: &quot;&#x5468;&#x56DB;&quot;,
    &quot;uv&quot;: 3300
  },  {
    &quot;day&quot;: &quot;&#x5468;&#x4E94;&quot;,
    &quot;uv&quot;: 8300
  },  {
    &quot;day&quot;: &quot;&#x5468;&#x516D;&quot;,
    &quot;uv&quot;: 9300
  }, {
    &quot;day&quot;: &quot;&#x5468;&#x65E5;&quot;,
    &quot;uv&quot;: 11300
  }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="JSON">[
  {
    <span class="hljs-attr">&quot;day&quot;</span>: <span class="hljs-string">&quot;&#x5468;&#x4E00;&quot;</span>,
    <span class="hljs-attr">&quot;uv&quot;</span>: <span class="hljs-number">6300</span>
  },
  {
    <span class="hljs-attr">&quot;day&quot;</span>: <span class="hljs-string">&quot;&#x5468;&#x4E8C;&quot;</span>,
    <span class="hljs-attr">&quot;uv&quot;</span>: <span class="hljs-number">7100</span>
  },  {
    <span class="hljs-attr">&quot;day&quot;</span>: <span class="hljs-string">&quot;&#x5468;&#x4E09;&quot;</span>,
    <span class="hljs-attr">&quot;uv&quot;</span>: <span class="hljs-number">4300</span>
  },  {
    <span class="hljs-attr">&quot;day&quot;</span>: <span class="hljs-string">&quot;&#x5468;&#x56DB;&quot;</span>,
    <span class="hljs-attr">&quot;uv&quot;</span>: <span class="hljs-number">3300</span>
  },  {
    <span class="hljs-attr">&quot;day&quot;</span>: <span class="hljs-string">&quot;&#x5468;&#x4E94;&quot;</span>,
    <span class="hljs-attr">&quot;uv&quot;</span>: <span class="hljs-number">8300</span>
  },  {
    <span class="hljs-attr">&quot;day&quot;</span>: <span class="hljs-string">&quot;&#x5468;&#x516D;&quot;</span>,
    <span class="hljs-attr">&quot;uv&quot;</span>: <span class="hljs-number">9300</span>
  }, {
    <span class="hljs-attr">&quot;day&quot;</span>: <span class="hljs-string">&quot;&#x5468;&#x65E5;&quot;</span>,
    <span class="hljs-attr">&quot;uv&quot;</span>: <span class="hljs-number">11300</span>
  }
]</code></pre><p>&#x4F46;&#x662F;Echarts&#x9700;&#x8981;&#x7684;x&#x8F74;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x548C;&#x5750;&#x6807;&#x70B9;&#x7684;&#x6570;&#x636E;&#x662F;&#x957F;&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x7684;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[&quot;&#x5468;&#x4E8C;&quot;, &quot;&#x5468;&#x4E8C;&quot;, &quot;&#x5468;&#x4E09;&quot;&#xFF0C; &quot;&#x5468;&#x56DB;&quot;&#xFF0C; &quot;&#x5468;&#x4E94;&quot;&#xFF0C; &quot;&#x5468;&#x516D;&quot;&#xFF0C; &quot;&#x5468;&#x65E5;&quot;] //x&#x8F74;&#x7684;&#x6570;&#x636E;

[6300. 7100, 4300, 3300, 8300, 9300, 11300] //&#x5750;&#x6807;&#x70B9;&#x7684;&#x6570;&#x636E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript">[<span class="hljs-string">&quot;&#x5468;&#x4E8C;&quot;</span>, <span class="hljs-string">&quot;&#x5468;&#x4E8C;&quot;</span>, <span class="hljs-string">&quot;&#x5468;&#x4E09;&quot;</span>&#xFF0C; <span class="hljs-string">&quot;&#x5468;&#x56DB;&quot;</span>&#xFF0C; <span class="hljs-string">&quot;&#x5468;&#x4E94;&quot;</span>&#xFF0C; <span class="hljs-string">&quot;&#x5468;&#x516D;&quot;</span>&#xFF0C; <span class="hljs-string">&quot;&#x5468;&#x65E5;&quot;</span>] <span class="hljs-comment">//x&#x8F74;&#x7684;&#x6570;&#x636E;</span>

[<span class="hljs-number">6300.</span> <span class="hljs-number">7100</span>, <span class="hljs-number">4300</span>, <span class="hljs-number">3300</span>, <span class="hljs-number">8300</span>, <span class="hljs-number">9300</span>, <span class="hljs-number">11300</span>] <span class="hljs-comment">//&#x5750;&#x6807;&#x70B9;&#x7684;&#x6570;&#x636E;</span></code></pre><p>&#x6240;&#x4EE5;&#x8FD9;&#x662F;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x9002;&#x914D;&#x5668;&#xFF0C;&#x5C06;&#x540E;&#x7AEF;&#x7684;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x505A;&#x9002;&#x914D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//x&#x8F74;&#x9002;&#x914D;&#x5668;
function echartXAxisAdapter(res) {
  return res.map(item =&gt; item.day);
}

//&#x5750;&#x6807;&#x70B9;&#x9002;&#x914D;&#x5668;
function echartDataAdapter(res) {
  return res.map(item =&gt; item.uv);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//x&#x8F74;&#x9002;&#x914D;&#x5668;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">echartXAxisAdapter</span>(<span class="hljs-params">res</span>) </span>{
  <span class="hljs-keyword">return</span> res.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.day);
}

<span class="hljs-comment">//&#x5750;&#x6807;&#x70B9;&#x9002;&#x914D;&#x5668;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">echartDataAdapter</span>(<span class="hljs-params">res</span>) </span>{
  <span class="hljs-keyword">return</span> res.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.uv);
}</code></pre><h3 id="articleHeader2"><strong>3 &#x603B;&#x7ED3;</strong></h3><p>&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#x5728;JS&#x4E2D;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x5F88;&#x591A;&#xFF0C;&#x5728;&#x53C2;&#x6570;&#x7684;&#x9002;&#x914D;&#x4E0A;&#xFF0C;&#x6709;&#x8BB8;&#x591A;&#x5E93;&#x548C;&#x6846;&#x67B6;&#x90FD;&#x4F7F;&#x7528;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#xFF1B;&#x6570;&#x636E;&#x7684;&#x9002;&#x914D;&#x5728;&#x89E3;&#x51B3;&#x524D;&#x540E;&#x7AEF;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x4E0A;&#x5341;&#x5206;&#x91CD;&#x8981;&#x3002;&#x4F46;&#x662F;&#x9002;&#x914D;&#x5668;&#x6A21;&#x5F0F;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x4EA1;&#x7F8A;&#x8865;&#x7262;&#x7684;&#x6A21;&#x5F0F;&#xFF0C;&#x5B83;&#x89E3;&#x51B3;&#x7684;&#x662F;&#x73B0;&#x5B58;&#x7684;&#x4E24;&#x4E2A;&#x63A5;&#x53E3;&#x4E4B;&#x95F4;&#x4E0D;&#x517C;&#x5BB9;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4F60;&#x4E0D;&#x5E94;&#x8BE5;&#x5728;&#x8F6F;&#x4EF6;&#x7684;&#x521D;&#x671F;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x5C31;&#x4F7F;&#x7528;&#x8BE5;&#x6A21;&#x5F0F;&#xFF1B;&#x5982;&#x679C;&#x5728;&#x8BBE;&#x8BA1;&#x4E4B;&#x521D;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x591F;&#x7EDF;&#x7B79;&#x7684;&#x89C4;&#x5212;&#x597D;&#x63A5;&#x53E3;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x90A3;&#x4E48;&#x9002;&#x914D;&#x5668;&#x5C31;&#x5E94;&#x8BE5;&#x5C3D;&#x91CF;&#x51CF;&#x5C11;&#x4F7F;&#x7528;&#x3002;</p><hr><h3 id="articleHeader3">&#x53C2;&#x8003;&#x6587;&#x732E;:</h3><ul><li>[1] &#x5F20;&#x8363;&#x94ED; JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F; [M].&#x4EBA;&#x6C11;&#x90AE;&#x7535;&#x51FA;&#x7248;&#x793E;</li><li>[2] &#x7A0B;&#x6770; &#x5927;&#x8BDD;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F; [M].&#x6E05;&#x534E;&#x5927;&#x5B66;&#x51FA;&#x7248;&#x793E;</li><li>[3] &#x66FE;&#x63A2; JavaScript&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0E;&#x5F00;&#x53D1;&#x5B9E;&#x8DF5; [M].r&#x4EBA;&#x6C11;&#x90AE;&#x7535;&#x51FA;&#x7248;&#x793E;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从ES6重新认识JavaScript设计模式(四): 适配器模式

## 原文链接
[https://segmentfault.com/a/1190000015482452](https://segmentfault.com/a/1190000015482452)


---
title: 'Vue-cli3.0 + Element UI + ThinkPHP5.1 + RBAC权限 + 响应式的后台管理系统' 
date: 2018-11-23 2:30:10
hidden: true
slug: f7e892lvg2
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p><strong>&#x9879;&#x76EE;&#x524D;&#x7AEF;&#x5730;&#x5740;&#xFF1A;</strong> <a href="https://github.com/lmxdawn/vue-admin-html" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/lmxdawn/vue-admin-html" rel="nofollow noreferrer" target="_blank">https://github.com/lmxdawn/vu...</a></p><p><strong>&#x9879;&#x76EE;&#x540E;&#x7AEF;&#x5730;&#x5740;&#xFF1A;</strong> <a href="https://github.com/lmxdawn/vue-admin-php" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/lmxdawn/vue-admin-php" rel="nofollow noreferrer" target="_blank">https://github.com/lmxdawn/vu...</a></p><h1 id="articleHeader1">&#x89C9;&#x5F97;&#x6709;&#x7528;&#x8BF7; star</h1><h1 id="articleHeader2">&#x76EE;&#x524D; v3.0.0 &#x7248;&#x672C; <a href="https://github.com/lmxdawn/vue-admin-html/tree/v1.0.0" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x524D;&#x5F80; v1.0.0 &#x7248;&#x672C;</a></h1><h2 id="articleHeader3">&#x66F4;&#x65B0;&#x65E5;&#x5FD7;</h2><ul><li>[x] &#x66F4;&#x65B0;vue-cli&#x4E3A;3.0&#x7248;&#x672C; <a href="https://segmentfault.com/a/1190000015133974">&#x8FD9;&#x91CC;&#x6709;&#x7BC7;&#x6587;&#x7AE0;</a></li><li>[x] &#x589E;&#x52A0;&#x4E0A;&#x4F20;&#x63D2;&#x4EF6;</li><li>[x] &#x589E;&#x52A0;&#x5E7F;&#x544A;&#x7BA1;&#x7406;</li><li>[x] &#x4F18;&#x5316;&#x8DEF;&#x7531;&#x63A7;&#x5236;</li><li>[x] &#x4F18;&#x5316;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</li><li>[x] &#x767B;&#x5F55;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x5B58;&#x50A8;&#x6539;&#x4E3A; cookie</li></ul><h1 id="articleHeader4">&#x4E00;&#x952E;&#x64CD;&#x4F5C;&#x5305; <a href="https://pan.baidu.com/s/1gBPdt5IdDKhATNka1l1xOg" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x4E0B;&#x8F7D;</a></h1><ol><li>&#x96C6;&#x6210;&#x73AF;&#x5883;&#x642D;&#x5EFA;: windows &#x4E0A;&#x9762;&#x5EFA;&#x8BAE;&#x7528; phpstudy ,&#x5176;&#x5B83;&#x73AF;&#x5883;&#x81EA;&#x884C;&#x767E;&#x5EA6;</li><li>&#x628A;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x653E;&#x5230;&#x7F51;&#x7AD9;&#x6839;&#x76EE;&#x5F55;</li><li>&#x628A;MySQL&#x7684;root&#x5BC6;&#x7801;&#x6539;&#x4E3A; root, &#x518D;&#x65B0;&#x5EFA;&#x6570;&#x636E;&#x5E93; vue-admin ,&#x518D;&#x628A;vue-admin.sql &#x6587;&#x4EF6;&#x5BFC;&#x5165;&#x5230;MySQL</li><li>&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668; &#x8F93;&#x5165; <a href="http://localhost/vue-admin-html/dist/index.html" rel="nofollow noreferrer" target="_blank">http://localhost/vue-admin-ht...</a></li></ol><h1 id="articleHeader5">v3.0.0 &#x8E29;&#x8FC7;&#x7684;&#x5751;</h1><ol><li>&#x8FD9;&#x6B21;&#x66F4;&#x65B0;&#x540E; vuex &#x5F00;&#x542F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x540E;&#xFF0C;&#x51FA;&#x73B0;&#x6D45;&#x62F7;&#x8D1D;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x662F;&#x53D8;&#x91CF;&#x5F15;&#x7528;&#x7684;&#x95EE;&#x9898; <a href="https://segmentfault.com/q/1010000010025289/a-1020000015605407">&#x8FD9;&#x91CC;&#x6709;&#x7BC7;&#x6587;&#x7AE0;</a></li><li>&#x8FD8;&#x6709;&#x5C31;&#x662F;&#x8DEF;&#x7531;&#x5BFC;&#x5165;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x65F6;&#x8981;&#x5728;&#x6587;&#x4EF6;&#x5934;&#x90E8;&#x5F15;&#x5165;&#x5177;&#x4F53;&#x7684;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x7528; resolve =&gt; require([&apos;xx.vue&apos;], resolve) &#x6216;&#x8005; () =&gt; import(&apos;xx.vue&apos;) &#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C; &#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x90FD;&#x6709;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x5FAA;&#x73AF;&#x5F15;&#x7528;&#x7684;&#x9519;&#x8BEF;&#xFF01; <code>throw new Error(&apos;Cyclic dependency&apos; + nodeRep)</code></li></ol><h1 id="articleHeader6">vue-admin-html</h1><blockquote>Vue-cli3.0 + Element UI + ThinkPHP5.1 + RBAC&#x6743;&#x9650; + &#x54CD;&#x5E94;&#x5F0F;&#x7684;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;</blockquote><h2 id="articleHeader7">&#x6743;&#x9650;&#x6F14;&#x793A;</h2><p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/rule.gif" src="https://static.alili.techhttps://lmxdawn.github.io/images/rule.gif" alt="donate" title="donate" style="cursor:pointer"></span></p><h2 id="articleHeader8">&#x8DEF;&#x7531;&#x89C4;&#x5219;&#x56FE;&#x793A;</h2><blockquote>&#x8DEF;&#x5F84;: vue-admin-html/src/router/index.js</blockquote><p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/router.png" src="https://static.alili.techhttps://lmxdawn.github.io/images/router.png" alt="donate" title="donate" style="cursor:pointer"></span></p><h2 id="articleHeader9">env &#x914D;&#x7F6E;&#x8BF4;&#x660E;</h2><blockquote>&#x8DEF;&#x5F84;: vue-admin-html/.env.development</blockquote><p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/env.png" src="https://static.alili.techhttps://lmxdawn.github.io/images/env.png" alt="donate" title="donate" style="cursor:pointer"></span></p><h2 id="articleHeader10">&#x624B;&#x673A;&#x7248;&#x6F14;&#x793A;</h2><p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/phone.gif" src="https://static.alili.techhttps://lmxdawn.github.io/images/phone.gif" alt="donate" title="donate" style="cursor:pointer"></span></p><h2 id="articleHeader11">&#x4E0A;&#x4F20;&#x63D2;&#x4EF6;&#x6F14;&#x793A;</h2><p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/upload.gif" src="https://static.alili.techhttps://lmxdawn.github.io/images/upload.gif" alt="donate" title="donate" style="cursor:pointer"></span></p><h2 id="articleHeader12">&#x6DFB;&#x52A0; &#x963F;&#x91CC;&#x5DF4;&#x5DF4;&#x77E2;&#x91CF;&#x56FE;&#x6F14;&#x793A;</h2><blockquote>&#x8DEF;&#x5F84;: vue-admin-html/src/assets/icons &#x6CE8;&#x610F; vue-admin-html/src/assets/icons/iconfont.js &#x5934;&#x90E8;&#x9700;&#x8981;&#x52A0; <code>/* eslint-disable */</code> &#x53BB;&#x6389; eslint &#x68C0;&#x67E5;</blockquote><p>1.&#x7B2C;&#x4E00;&#x6B65; &#x9009;&#x597D;&#x4E00;&#x4E2A;&#x56FE;&#x6807;&#x52A0;&#x5165;&#x5230;&#x8D2D;&#x7269;&#x8F66; -&gt; &#x628A;&#x8D2D;&#x7269;&#x8F66;&#x7684;&#x6DFB;&#x52A0;&#x90FD;&#x9879;&#x76EE; -&gt; &#x4E0B;&#x8F7D;&#x9879;&#x76EE;&#x5230;&#x672C;&#x5730;</p><p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/icon1.gif" src="https://static.alili.techhttps://lmxdawn.github.io/images/icon1.gif" alt="donate" title="donate" style="cursor:pointer"></span></p><p>2.&#x7B2C;&#x4E8C;&#x6B65; &#x89E3;&#x538B;&#x4E0B;&#x8F7D;&#x597D;&#x7684;&#x6587;&#x4EF6; -&gt; &#x590D;&#x5236;&#x5230; src/assets/icons , &#x8986;&#x76D6;&#x6389; -&gt; &#x589E;&#x52A0; iconfont.js &#x7684; eslint &#x6CE8;&#x91CA;</p><p><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/icon2.gif" src="https://static.alili.techhttps://lmxdawn.github.io/images/icon2.gif" alt="donate" title="donate" style="cursor:pointer"></span></p><h2 id="articleHeader13">&#x529F;&#x80FD;</h2><ul><li>[x] &#x7BA1;&#x7406;&#x5458;&#x767B;&#x5F55;</li><li>[x] &#x767B;&#x5F55;</li><li>[x] &#x4FEE;&#x6539;&#x5BC6;&#x7801;</li><li>[x] &#x89D2;&#x8272;&#x7BA1;&#x7406;</li><li>[x] &#x6743;&#x9650;&#x7BA1;&#x7406;</li><li>[x] 401/404&#x9519;&#x8BEF;&#x9875;&#x9762;</li><li>[x] &#x52A8;&#x6001;&#x9762;&#x5305;&#x5C51;</li><li>[x] &#x52A8;&#x6001;&#x4FA7;&#x8FB9;&#x680F;</li><li>[x] &#x5E7F;&#x544A;&#x7BA1;&#x7406;</li></ul><h2 id="articleHeader14">&#x5B89;&#x88C5;&#x6B65;&#x9AA4;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/lmxdawn/vue-admin-html.git      // &#x628A;&#x6A21;&#x677F;&#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;
cd vue-admin-html    // &#x8FDB;&#x5165;&#x6A21;&#x677F;&#x76EE;&#x5F55;
npm install         // &#x5B89;&#x88C5;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#xFF0C;&#x7B49;&#x5F85;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x4E4B;&#x540E;

&#x6784;&#x5EFA;&#x65F6;&#x4E09;&#x79CD;&#x73AF;&#x5883;&#x53EF;&#x9009;&#xFF0C;&#x89E3;&#x51B3;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x6765;&#x56DE;&#x5207;&#x6362;&#x914D;&#x7F6E;&#x7684;&#x75DB;&#x695A;&#xFF08;serve&#xFF1A;&#x672C;&#x5730;&#x6D4B;&#x8BD5;&#xFF0C;stage&#xFF1A;&#x9884;&#x4E0A;&#x7EBF;&#xFF0C;build&#xFF1A;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#xFF09;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code>git clone https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/lmxdawn/</span>vue-admin-html.git      <span class="hljs-regexp">//</span> &#x628A;&#x6A21;&#x677F;&#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;
cd vue-admin-html    <span class="hljs-regexp">//</span> &#x8FDB;&#x5165;&#x6A21;&#x677F;&#x76EE;&#x5F55;
npm install         <span class="hljs-regexp">//</span> &#x5B89;&#x88C5;&#x9879;&#x76EE;&#x4F9D;&#x8D56;&#xFF0C;&#x7B49;&#x5F85;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x4E4B;&#x540E;

&#x6784;&#x5EFA;&#x65F6;&#x4E09;&#x79CD;&#x73AF;&#x5883;&#x53EF;&#x9009;&#xFF0C;&#x89E3;&#x51B3;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x6765;&#x56DE;&#x5207;&#x6362;&#x914D;&#x7F6E;&#x7684;&#x75DB;&#x695A;&#xFF08;serve&#xFF1A;&#x672C;&#x5730;&#x6D4B;&#x8BD5;&#xFF0C;stage&#xFF1A;&#x9884;&#x4E0A;&#x7EBF;&#xFF0C;build&#xFF1A;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#xFF09;
</code></pre><h2 id="articleHeader15">&#x672C;&#x5730;&#x5F00;&#x53D1;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F00;&#x542F;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE; http://localhost:8080
npm run serve
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>// &#x5F00;&#x542F;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x8BBF;&#x95EE; http://localhost:<span class="hljs-number">8080</span>
npm <span class="hljs-keyword">run</span><span class="bash"> serve
</span></code></pre><h2 id="articleHeader16">&#x6784;&#x5EFA;&#x9884;&#x4E0A;&#x7EBF;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6267;&#x884C;&#x6784;&#x5EFA;&#x547D;&#x4EE4;&#xFF0C;&#x751F;&#x6210;&#x7684;stage&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x5373;&#x53EF;&#x8BBF;&#x95EE;
npm run stage
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>// &#x6267;&#x884C;&#x6784;&#x5EFA;&#x547D;&#x4EE4;&#xFF0C;&#x751F;&#x6210;&#x7684;stage&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x5373;&#x53EF;&#x8BBF;&#x95EE;
npm <span class="hljs-keyword">run</span><span class="bash"> stage
</span></code></pre><h2 id="articleHeader17">&#x6784;&#x5EFA;&#x751F;&#x4EA7;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6267;&#x884C;&#x6784;&#x5EFA;&#x547D;&#x4EE4;&#xFF0C;&#x751F;&#x6210;&#x7684;dist&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x5373;&#x53EF;&#x8BBF;&#x95EE;
npm run build
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>// &#x6267;&#x884C;&#x6784;&#x5EFA;&#x547D;&#x4EE4;&#xFF0C;&#x751F;&#x6210;&#x7684;dist&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x5373;&#x53EF;&#x8BBF;&#x95EE;
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span></code></pre><h1 id="articleHeader18">&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4ECB;&#x7ECD;</h1><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; LICENSE                                 // &#x7248;&#x6743;&#x8BB8;&#x53EF;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; README.md                               // &#x6587;&#x6863;
&#x251C;&#x2500;&#x2500; babel.config.js                         // babel &#x63D2;&#x4EF6;&#x914D;&#x7F6E;                
&#x251C;&#x2500;&#x2500; jest.config.js                          // jest &#x6D4B;&#x8BD5;&#x914D;&#x7F6E;   
&#x251C;&#x2500;&#x2500; package-lock.json                       // &#x9501;&#x5B9A;&#x5F53;&#x524D;&#x5B89;&#x88C5;&#x7684;&#x6269;&#x5C55;&#x5305;&#x7684;&#x7248;&#x672C;
&#x251C;&#x2500;&#x2500; package.json                            // &#x58F0;&#x660E;&#x5F15;&#x7528;&#x4E86;&#x54EA;&#x4E9B;&#x6269;&#x5C55;&#x5305;
&#x251C;&#x2500;&#x2500; public                                  // &#x516C;&#x5171;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; favicon.ico                         // &#x56FE;&#x6807;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.html                          // &#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; src                                     // src &#x4E3B;&#x8981;&#x4EE3;&#x7801;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; App.vue                             // Vue &#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; api                                 // API &#x63A5;&#x53E3;&#x903B;&#x8F91;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; ad                              // &#x5E7F;&#x544A;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; ad.js                       // &#x5E7F;&#x544A;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; adSite.js                   // &#x5E7F;&#x544A;&#x4F4D;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; auth                            // &#x6743;&#x9650;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authAdmin.js                // &#x6743;&#x9650;&#x7528;&#x6237;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authPermissionRule.js       // &#x6743;&#x9650;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; authRole.js                 // &#x89D2;&#x8272;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResource.js                 // &#x6587;&#x4EF6;&#x8D44;&#x6E90;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResourceTag.js              // &#x6587;&#x4EF6;&#x8D44;&#x6E90;&#x7684;&#x6807;&#x7B7E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; login.js                        // &#x767B;&#x5F55;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; upload.js                       // &#x65E7;&#x7248;&#x672C;&#x4E0A;&#x4F20;&#x63D2;&#x4EF6;&#x7684;&#x63A5;&#x53E3;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; assets                              // &#x8D44;&#x6E90;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; icons                           // &#x56FE;&#x6807;(&#x4F7F;&#x7528;&#x7684;&#x662F; &#x963F;&#x91CC;&#x5DF4;&#x5DF4;&#x77E2;&#x91CF;&#x56FE;&#x6807;&#x5E93;)
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo.css                    // demo &#x6837;&#x5F0F;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo_fontclass.html         // demo HTML
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo_symbol.html            // demo
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo_unicode.html           // demo
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.css                // css
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.eot                // 
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.js                 // js &#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.svg                // svg &#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.ttf                // &#x5B57;&#x4F53;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; iconfont.woff               // &#x5B57;&#x4F53;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; image                           // &#x8D44;&#x6E90;&#x56FE;&#x7247;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; file_type_icon.png          // &#x6587;&#x4EF6;&#x56FE;&#x6807;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; logo.png                        // logo
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; components                          // &#x7EC4;&#x4EF6;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; HelloWorld.vue                  // &#x6D4B;&#x8BD5;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; common                          // &#x516C;&#x5171;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; FileResource.vue            // &#x4E0A;&#x4F20;&#x8D44;&#x6E90;&#x7684;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; IconSvg.vue                 // &#x56FE;&#x6807;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; UploadFile.vue              // &#x65E7;&#x7248;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config                              // &#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; app.js                          // &#x9879;&#x76EE;&#x7684;&#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; constants                           // &#x9879;&#x76EE;&#x7684;&#x5E38;&#x91CF;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; element.js                          // &#x5F15;&#x5165; element-ui &#x7684;js&#x6587;&#x4EF6; (&#x8FD9;&#x4E2A;&#x4E5F;&#x53EF;&#x76F4;&#x63A5;&#x5199;&#x5728; main.js &#x91CC;&#x9762;)
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; filtres                             // &#x8FC7;&#x6EE4;&#x5668;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.js                        // &#x5168;&#x5C40;&#x8FC7;&#x6EE4;&#x5668;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; main.js                             // &#x4E3B;&#x5165;&#x53E3;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; mock                                // &#x6A21;&#x62DF;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authAdmin.js                    // &#x6743;&#x9650;&#x7528;&#x6237;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authPermissionRule.js           // &#x6743;&#x9650;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authRole.js                     // &#x89D2;&#x8272;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResource.js                 // &#x4E0A;&#x4F20;&#x8D44;&#x6E90;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResourceTag.js              // &#x4E0A;&#x4F20;&#x8D44;&#x6E90;&#x7684;&#x5206;&#x7EC4;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js                        // &#x5F15;&#x5165; mockjs &#x7684;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; login.js                        // &#x767B;&#x5F55;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; upload.js                       // &#x65E7;&#x7248;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; role.js                             // &#x52A8;&#x6001;&#x4E0A;&#x4F20; router &#x8DEF;&#x7531;&#x7684;&#x4E3B;&#x8981;&#x6587;&#x4EF6;, &#x5E76;&#x4E14;&#x521D;&#x59CB;&#x5316;&#x6743;&#x9650;, &#x68C0;&#x6D4B;&#x6743;&#x9650;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; router                              // &#x8DEF;&#x7531;&#x76F8;&#x5173;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.js                        // &#x8DEF;&#x7531;&#x4E3B;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; store                               // vuex &#x72B6;&#x6001; &#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; actions.js                      // Action
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; getters.js                      // Getter
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js                        // &#x5165;&#x53E3;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; modules                         // &#x6A21;&#x5757;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; admin.js                    // Admin &#x7528;&#x6237;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; app.js                      // APP &#x9879;&#x76EE;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; mutation-types.js               // Mutation
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; styles                              // &#x6837;&#x5F0F;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; base.scss                       // &#x57FA;&#x7840;&#x6837;&#x5F0F;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; mixin.scss                      // &#x57FA;&#x7840;&#x65B9;&#x6CD5;&#x7684;&#x6837;&#x5F0F;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; utils                               // &#x5DE5;&#x5177;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; auth.js                         // &#x6743;&#x9650;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; axios.js                        // request &#x8BF7;&#x6C42;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; haiZiToPinYin.js                // &#x6C49;&#x5B57;&#x8F6C;&#x62FC;&#x97F3;&#x7684;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; store.js                        // &#x5B58;&#x653E;&#x4FE1;&#x606F;&#x7684;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; views                               // &#x9875;&#x9762;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; adManage                        // &#x5E7F;&#x544A;&#x7BA1;&#x7406;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; ad.vue                      // &#x5E7F;&#x544A;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; adSite.vue                  // &#x5E7F;&#x544A;&#x4F4D;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; components                      // &#x5E94;&#x7528;&#x6F14;&#x793A;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; uploadList.vue              // &#x4E0A;&#x4F20;&#x63D2;&#x4EF6;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; error                           // &#x9519;&#x8BEF;&#x9875;&#x9762;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; err401.vue                  // 401
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; err404.vue                  // 404&#x9875;&#x9762;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; err500.vue                  // 500&#x9875;&#x9762;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; home                            // &#x9996;&#x9875;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; SidebarItem.vue             // &#x5DE6;&#x8FB9;&#x680F;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; TabsView.vue                // &#x9876;&#x90E8;tabs
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.vue                   // &#x5165;&#x53E3;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; main.vue                    // &#x524D;&#x8A00;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; login                           // &#x767B;&#x5F55;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.vue                   // &#x767B;&#x5F55;&#x9996;&#x9875;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; profile                         // &#x6D4B;&#x8BD5;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.vue                   
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; userManage                      // &#x7528;&#x6237;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0;         &#x2514;&#x2500;&#x2500; admin                       // &#x7BA1;&#x7406;&#x5458;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; authAdmin.vue           // &#x6743;&#x9650;&#x7528;&#x6237;
&#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; authPermissionRule.vue  // &#x6743;&#x9650;
&#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; authRole.vue            // &#x89D2;&#x8272;
&#x2502;&#xA0;&#xA0;             &#x2514;&#x2500;&#x2500; router.vue              // &#x8DEF;&#x7531;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; tests                                   // &#x6D4B;&#x8BD5;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; unit                                
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; HelloWorld.spec.js              
&#x2514;&#x2500;&#x2500; vue.config.js                           // &#x6784;&#x5EFA;&#x9879;&#x76EE;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="markdown hljs"><code class="markdown">&#x251C;&#x2500;&#x2500; LICENSE                                 // &#x7248;&#x6743;&#x8BB8;&#x53EF;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; README.md                               // &#x6587;&#x6863;
&#x251C;&#x2500;&#x2500; babel.config.js                         // babel &#x63D2;&#x4EF6;&#x914D;&#x7F6E;                
&#x251C;&#x2500;&#x2500; jest.config.js                          // jest &#x6D4B;&#x8BD5;&#x914D;&#x7F6E;   
&#x251C;&#x2500;&#x2500; package-lock.json                       // &#x9501;&#x5B9A;&#x5F53;&#x524D;&#x5B89;&#x88C5;&#x7684;&#x6269;&#x5C55;&#x5305;&#x7684;&#x7248;&#x672C;
&#x251C;&#x2500;&#x2500; package.json                            // &#x58F0;&#x660E;&#x5F15;&#x7528;&#x4E86;&#x54EA;&#x4E9B;&#x6269;&#x5C55;&#x5305;
&#x251C;&#x2500;&#x2500; public                                  // &#x516C;&#x5171;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; favicon.ico                         // &#x56FE;&#x6807;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.html                          // &#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; src                                     // src &#x4E3B;&#x8981;&#x4EE3;&#x7801;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; App.vue                             // Vue &#x5165;&#x53E3;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; api                                 // API &#x63A5;&#x53E3;&#x903B;&#x8F91;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; ad                              // &#x5E7F;&#x544A;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; ad.js                       // &#x5E7F;&#x544A;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; adSite.js                   // &#x5E7F;&#x544A;&#x4F4D;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; auth                            // &#x6743;&#x9650;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authAdmin.js                // &#x6743;&#x9650;&#x7528;&#x6237;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authPermissionRule.js       // &#x6743;&#x9650;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; authRole.js                 // &#x89D2;&#x8272;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResource.js                 // &#x6587;&#x4EF6;&#x8D44;&#x6E90;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResourceTag.js              // &#x6587;&#x4EF6;&#x8D44;&#x6E90;&#x7684;&#x6807;&#x7B7E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; login.js                        // &#x767B;&#x5F55;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; upload.js                       // &#x65E7;&#x7248;&#x672C;&#x4E0A;&#x4F20;&#x63D2;&#x4EF6;&#x7684;&#x63A5;&#x53E3;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; assets                              // &#x8D44;&#x6E90;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; icons                           // &#x56FE;&#x6807;(&#x4F7F;&#x7528;&#x7684;&#x662F; &#x963F;&#x91CC;&#x5DF4;&#x5DF4;&#x77E2;&#x91CF;&#x56FE;&#x6807;&#x5E93;)
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo.css                    // demo &#x6837;&#x5F0F;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo_fontclass.html         // demo HTML
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo_symbol.html            // demo
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; demo_unicode.html           // demo
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.css                // css
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.eot                // 
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.js                 // js &#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.svg                // svg &#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; iconfont.ttf                // &#x5B57;&#x4F53;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; iconfont.woff               // &#x5B57;&#x4F53;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; image                           // &#x8D44;&#x6E90;&#x56FE;&#x7247;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; file<span class="hljs-emphasis">_type_</span>icon.png          // &#x6587;&#x4EF6;&#x56FE;&#x6807;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; logo.png                        // logo
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; components                          // &#x7EC4;&#x4EF6;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; HelloWorld.vue                  // &#x6D4B;&#x8BD5;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; common                          // &#x516C;&#x5171;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; FileResource.vue            // &#x4E0A;&#x4F20;&#x8D44;&#x6E90;&#x7684;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; IconSvg.vue                 // &#x56FE;&#x6807;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; UploadFile.vue              // &#x65E7;&#x7248;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x7684;&#x7EC4;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config                              // &#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; app.js                          // &#x9879;&#x76EE;&#x7684;&#x914D;&#x7F6E;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; constants                           // &#x9879;&#x76EE;&#x7684;&#x5E38;&#x91CF;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; element.js                          // &#x5F15;&#x5165; element-ui &#x7684;js&#x6587;&#x4EF6; (&#x8FD9;&#x4E2A;&#x4E5F;&#x53EF;&#x76F4;&#x63A5;&#x5199;&#x5728; main.js &#x91CC;&#x9762;)
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; filtres                             // &#x8FC7;&#x6EE4;&#x5668;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.js                        // &#x5168;&#x5C40;&#x8FC7;&#x6EE4;&#x5668;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; main.js                             // &#x4E3B;&#x5165;&#x53E3;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; mock                                // &#x6A21;&#x62DF;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authAdmin.js                    // &#x6743;&#x9650;&#x7528;&#x6237;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authPermissionRule.js           // &#x6743;&#x9650;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; authRole.js                     // &#x89D2;&#x8272;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResource.js                 // &#x4E0A;&#x4F20;&#x8D44;&#x6E90;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fileResourceTag.js              // &#x4E0A;&#x4F20;&#x8D44;&#x6E90;&#x7684;&#x5206;&#x7EC4;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js                        // &#x5F15;&#x5165; mockjs &#x7684;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; login.js                        // &#x767B;&#x5F55;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; upload.js                       // &#x65E7;&#x7248;&#x4E0A;&#x4F20;&#x6587;&#x4EF6;&#x7684;&#x6570;&#x636E;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; role.js                             // &#x52A8;&#x6001;&#x4E0A;&#x4F20; router &#x8DEF;&#x7531;&#x7684;&#x4E3B;&#x8981;&#x6587;&#x4EF6;, &#x5E76;&#x4E14;&#x521D;&#x59CB;&#x5316;&#x6743;&#x9650;, &#x68C0;&#x6D4B;&#x6743;&#x9650;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; router                              // &#x8DEF;&#x7531;&#x76F8;&#x5173;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.js                        // &#x8DEF;&#x7531;&#x4E3B;&#x6587;&#x4EF6;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; store                               // vuex &#x72B6;&#x6001; &#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; actions.js                      // Action
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; getters.js                      // Getter
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js                        // &#x5165;&#x53E3;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; modules                         // &#x6A21;&#x5757;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; admin.js                    // Admin &#x7528;&#x6237;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; app.js                      // APP &#x9879;&#x76EE;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; mutation-types.js               // Mutation
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; styles                              // &#x6837;&#x5F0F;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; base.scss                       // &#x57FA;&#x7840;&#x6837;&#x5F0F;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; mixin.scss                      // &#x57FA;&#x7840;&#x65B9;&#x6CD5;&#x7684;&#x6837;&#x5F0F;
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; utils                               // &#x5DE5;&#x5177;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; auth.js                         // &#x6743;&#x9650;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; axios.js                        // request &#x8BF7;&#x6C42;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; haiZiToPinYin.js                // &#x6C49;&#x5B57;&#x8F6C;&#x62FC;&#x97F3;&#x7684;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; store.js                        // &#x5B58;&#x653E;&#x4FE1;&#x606F;&#x7684;&#x5DE5;&#x5177;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; views                               // &#x9875;&#x9762;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; adManage                        // &#x5E7F;&#x544A;&#x7BA1;&#x7406;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; ad.vue                      // &#x5E7F;&#x544A;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; adSite.vue                  // &#x5E7F;&#x544A;&#x4F4D;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; components                      // &#x5E94;&#x7528;&#x6F14;&#x793A;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; uploadList.vue              // &#x4E0A;&#x4F20;&#x63D2;&#x4EF6;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; error                           // &#x9519;&#x8BEF;&#x9875;&#x9762;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; err401.vue                  // 401
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; err404.vue                  // 404&#x9875;&#x9762;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; err500.vue                  // 500&#x9875;&#x9762;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; home                            // &#x9996;&#x9875;&#x76EE;&#x5F55;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; SidebarItem.vue             // &#x5DE6;&#x8FB9;&#x680F;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; TabsView.vue                // &#x9876;&#x90E8;tabs
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.vue                   // &#x5165;&#x53E3;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; main.vue                    // &#x524D;&#x8A00;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; login                           // &#x767B;&#x5F55;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.vue                   // &#x767B;&#x5F55;&#x9996;&#x9875;
&#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; profile                         // &#x6D4B;&#x8BD5;
&#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.vue                   
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; userManage                      // &#x7528;&#x6237;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0;         &#x2514;&#x2500;&#x2500; admin                       // &#x7BA1;&#x7406;&#x5458;&#x76F8;&#x5173;
&#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; authAdmin.vue           // &#x6743;&#x9650;&#x7528;&#x6237;
&#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; authPermissionRule.vue  // &#x6743;&#x9650;
&#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; authRole.vue            // &#x89D2;&#x8272;
&#x2502;&#xA0;&#xA0;             &#x2514;&#x2500;&#x2500; router.vue              // &#x8DEF;&#x7531;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; tests                                   // &#x6D4B;&#x8BD5;
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; unit                                
&#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; HelloWorld.spec.js              
&#x2514;&#x2500;&#x2500; vue.config.js                           // &#x6784;&#x5EFA;&#x9879;&#x76EE;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</code></pre><h1 id="articleHeader19">Online Demo</h1><p>&#xFF08;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x6700;&#x65B0;&#x7248;Chrome&#x6D4F;&#x89C8;&#x5668;&#xFF09;<br><a href="https://lmxdawn.github.io/vue-admin" rel="nofollow noreferrer" target="_blank">&#x5728;&#x7EBF; Demo</a></p><h1 id="articleHeader20">Donate</h1><p>&#x9F13;&#x52B1;&#x9F13;&#x52B1;&#x9F13;&#x52B1;&#xFF0C;&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#x8BF4;&#x4E09;&#x904D;<br><span class="img-wrap"><img data-src="https://lmxdawn.github.io/images/pay.png" src="https://static.alili.techhttps://lmxdawn.github.io/images/pay.png" alt="donate" title="donate" style="cursor:pointer;display:inline"></span></p><h1 id="articleHeader21">License</h1><p><a href="https://github.com/lmxdawn/vue-admin-html/blob/master/LICENSE" rel="nofollow noreferrer" target="_blank">MIT</a></p><p>Copyright (c) 2018 lmxdawn</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-cli3.0 + Element UI + ThinkPHP5.1 + RBAC权限 + 响应式的后台管理系统

## 原文链接
[https://segmentfault.com/a/1190000015619977](https://segmentfault.com/a/1190000015619977)


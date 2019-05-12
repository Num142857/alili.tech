---
title: 'EggVueSsr实现前后端分离、服务器和客户端同构渲染' 
date: 2018-11-19 2:30:09
hidden: true
slug: nes10w286h
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">Egg + Vue + Ssr</h1><blockquote>&#x4E0B;&#x4E00;&#x4EE3;web&#x5F00;&#x53D1;&#x6846;&#x67B6;</blockquote><h3 id="articleHeader1">&#x73AF;&#x5883;&#x7248;&#x672C; &amp;&amp; &#x6A21;&#x5F0F;</h3><ul><li>Egg &#x7248;&#x672C;: ^2.x.x; &#x6A21;&#x5F0F;&#xFF1A; MVC</li><li>Node &#x7248;&#x672C;: ^8.x.x+</li><li>Npm &#x7248;&#x672C;: ^5.x.x+</li><li>Webpack &#x7248;&#x672C;: ^4.x.x</li><li>Vue &#x7248;&#x672C;: ^2.5.0 &#x6A21;&#x5F0F;&#xFF1A;MVVM</li><li>egg-view-vue-ssr &#x7248;&#x672C;: ^3.x.x</li></ul><h3 id="articleHeader2">&#x8FD0;&#x884C;&#x547D;&#x4EE4;</h3><ul><li>&#x5B89;&#x88C5;cli(&#x975E;&#x5FC5;&#x9700;)</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install easywebpack-cli -g" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install easywebpack-cli -g</code></pre><ul><li>&#x5B89;&#x88C5;&#x4F9D;&#x8D56;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install</code></pre><ul><li>&#x672C;&#x5730;&#x5F00;&#x53D1;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm run dev</code></pre><ul><li>&#x53D1;&#x5E03;&#x6A21;&#x5F0F;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm run build </code></pre><ul><li>&#x542F;&#x52A8;&#x5E94;&#x7528;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm start </code></pre><h3 id="articleHeader3">&#x9879;&#x76EE;&#x7ED3;&#x6784;&#x548C;&#x57FA;&#x672C;&#x89C4;&#x8303;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    &#x251C;&#x2500;&#x2500; app
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; controller               //&#x63A7;&#x5236;&#x5668;&#xFF08;&#x6A21;&#x5F0F;&#xFF1A;C&#x5C42;&#xFF09;
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; test
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;  &#xA0;&#xA0; &#x2514;&#x2500;&#x2500; test.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; models                   //&#x6570;&#x636E;&#x6A21;&#x578B;&#xFF08;&#x6A21;&#x5F0F;&#xFF1A;M&#x5C42;&#xFF09;
    &#x2502;&#xA0;&#xA0; &#x2502;    &#x251C;&#x2500;&#x2500; api                 //&#x63A5;&#x53E3;api
    &#x2502;   &#x2502;    &#x251C;&#x2500;&#x2500; mocks               //&#x6570;&#x636E;&#x5904;&#x7406;
    &#x2502;&#xA0;&#xA0; &#x2502;        &#x251C;&#x2500;&#x2500; app
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;  &#xA0;&#xA0;  &#x2514;&#x2500;&#x2500; home
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; extend
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; lib
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; middleware
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; mocks
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; proxy
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; router.js                 //&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8DEF;&#x7531;
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; view                             //&#x89C6;&#x56FE;&#xFF08;&#x6A21;&#x5F0F;&#xFF1A;V&#x5C42;&#xFF0C;&#x5DE5;&#x5177;&#x751F;&#x6210;&#xFF09;
    &#x2502;&#xA0;&#xA0; &#x2502;   &#x251C;&#x2500;&#x2500; about                 // &#x670D;&#x52A1;&#x5668;&#x7F16;&#x8BD1;&#x7684;jsbundle&#x6587;&#x4EF6;
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; about.js
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;  &#x2502;&#xA0;&#xA0;   &#x2514;&#x2500;&#x2500; home.js         // &#x670D;&#x52A1;&#x5668;&#x7F16;&#x8BD1;&#x7684;jsbundle&#x6587;&#x4EF6;
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; layout                // &#x7528;&#x4E8E;&#x6839;&#x636E;&#x6307;&#x5B9A;&#x7684;layout&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;html&#x9875;&#x9762;, &#x7528;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x6E32;&#x67D3;&#x5931;&#x8D25;&#x65F6;,&#x91C7;&#x7528;&#x5BA2;&#x6237;&#x7AEF;&#x6E32;&#x67D3;
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; layout.html
    &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; web                       //&#x89C6;&#x56FE;&#xFF08;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x76EE;&#x5F55;&#x5F00;&#x53D1;--&gt;&#x751F;&#x6210;&#x6A21;&#x5F0F;&#xFF1A;V&#x5C42;&#xFF09;
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; asset                 // &#x5B58;&#x653E;&#x516C;&#x5171;js,css&#x8D44;&#x6E90;
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; framework             // &#x524D;&#x7AEF;&#x516C;&#x5171;&#x5E93;&#x548C;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fastclick
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; fastclick.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; sdk
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; sdk.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; storage
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; storage.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; vue               // &#x4E0E;vue&#x76F8;&#x5173;&#x7684;&#x516C;&#x5F00;&#x4EE3;&#x7801;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; app.js        // &#x524D;&#x540E;&#x7AEF;&#x8C03;&#x7528;&#x5165;&#x53E3;, &#x9ED8;&#x8BA4;&#x5F15;&#x5165;componet/directive/filter
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; component.js  // &#x7EC4;&#x4EF6;&#x5165;&#x53E3;, &#x53EF;&#x4EE5;&#x589E;&#x52A0;component&#x76EE;&#x5F55;,&#x7C7B;&#x4F3C;&#x4E0B;&#x9762;&#x7684;directive
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; directive     // directive &#x76EE;&#x5F55;,&#x5B58;&#x653E;&#x5404;&#x79CD;directive&#x7EC4;&#x4EF6;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; directive.js  // directive&#x5F15;&#x7528;&#x5165;&#x53E3;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; filter.js     // filter&#x5F15;&#x7528;&#x5165;&#x53E3;
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; page                  // &#x524D;&#x7AEF;&#x9875;&#x9762;&#x548C;webpack&#x6784;&#x5EFA;&#x76EE;&#x5F55;, &#x4E5F;&#x5C31;&#x662F;webpack&#x6253;&#x5305;&#x914D;&#x7F6E;entryDir
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home              // &#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x9075;&#x5FAA;&#x76EE;&#x5F55;&#x540D;, js&#x6587;&#x4EF6;&#x540D;, scss&#x6587;&#x4EF6;&#x540D;, vue&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x540C;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home.scss
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home.vue
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; images        // &#x9875;&#x9762;&#x81EA;&#x6709;&#x56FE;&#x7247;,&#x516C;&#x5171;&#x56FE;&#x7247;&#x548C;css&#x653E;&#x5230;asset&#x4E0B;&#x9762;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; icon_more.png
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; w-week        // &#x9875;&#x9762;&#x81EA;&#x6709;&#x7EC4;&#x4EF6;,&#x516C;&#x5171;&#x7EC4;&#x4EF6;&#x653E;&#x5230;widget&#x4E0B;&#x9762;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; w-week.scss
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; w-week.vue
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; test             // &#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x9075;&#x5FAA;&#x76EE;&#x5F55;&#x540D;, js&#x6587;&#x4EF6;&#x540D;, scss&#x6587;&#x4EF6;&#x540D;, vue&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x540C;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; test.vue
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; store                // &#x5F15;&#x5165;vuex &#x7684;&#x57FA;&#x672C;&#x89C4;&#x8303;, &#x53EF;&#x4EE5;&#x5206;&#x6A21;&#x5757;
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; app
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; actions.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; getters.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; mutation-type.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; mutations.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; store.js
    &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; component           // &#x516C;&#x5171;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;, &#x6BD4;&#x5982;loading, toast&#x7B49;, &#x9075;&#x5FAA;&#x76EE;&#x5F55;&#x540D;, js&#x6587;&#x4EF6;&#x540D;, scss&#x6587;&#x4EF6;&#x540D;, vue&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x540C;
    &#x2502;&#xA0;&#xA0;         &#x251C;&#x2500;&#x2500; loading
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; loading.scss
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; loading.vue
    &#x2502;&#xA0;&#xA0;         &#x251C;&#x2500;&#x2500; test
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; test.vue
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; test.scss
    &#x2502;&#xA0;&#xA0;         &#x2514;&#x2500;&#x2500; toast
    &#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; toast.scss
    &#x2502;&#xA0;&#xA0;             &#x2514;&#x2500;&#x2500; toast.vue
    &#x251C;&#x2500;&#x2500; build                       //  webpack &#x81EA;&#x5B9A;&#x4E49;&#x914D;&#x7F6E;&#x5165;&#x53E3;, &#x4F1A;&#x4E0E;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x8FDB;&#x884C;&#x5408;&#x5E76;(&#x770B;&#x4F3C;&#x8FD9;&#x4E48;&#x591A;,&#x5176;&#x5B9E;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x5360;&#x4E2A;&#x4F4D;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;)
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; base
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;  &#x2514;&#x2500;&#x2500; index.js            // &#x516C;&#x5171;&#x914D;&#x7F6E;        
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500;  client                 // &#x5BA2;&#x6237;&#x7AEF;webpack&#x7F16;&#x8BD1;&#x914D;&#x7F6E;
    &#x2502;&#xA0;&#xA0; &#x2502;   &#x251C;&#x2500;&#x2500; dev.js
    &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; prod.js
    &#x2502;&#xA0;&#xA0; &#x2502;   &#x2514;&#x2500;&#x2500; index.js
    &#x2502;   &#x251C;&#x2500;&#x2500;  server                 // &#x670D;&#x52A1;&#x7AEF;webpack&#x7F16;&#x8BD1;&#x914D;&#x7F6E;
    &#x2502;&#xA0;&#xA0; &#x2502;    &#x251C;&#x2500;&#x2500; dev.js
    &#x2502;   &#x2502;    &#x251C;&#x2500;&#x2500; prod.js
    &#x2502;&#xA0;&#xA0; &#x2502;    &#x2514;&#x2500;&#x2500; index.js
    &#x2502;   &#x2514;&#x2500;&#x2500; index.js
    &#x251C;&#x2500;&#x2500; config
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.default.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.local.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.prod.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.test.js
    &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; plugin.js
    &#x251C;&#x2500;&#x2500; doc
    &#x251C;&#x2500;&#x2500; index.js
    &#x251C;&#x2500;&#x2500; public                      // webpack&#x7F16;&#x8BD1;&#x76EE;&#x5F55;&#x7ED3;&#x6784;, render&#x6587;&#x4EF6;&#x67E5;&#x627E;&#x76EE;&#x5F55;
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; manifest.json           // &#x8D44;&#x6E90;&#x4F9D;&#x8D56;&#x8868;
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; static
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; css
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home.07012d33.css
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; test
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; test.4bbb32ce.css
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; img
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; change_top.4735c57.png
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; intro.0e66266.png
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; test
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; test.js
    &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; vendor.js               // &#x751F;&#x6210;&#x7684;&#x516C;&#x5171;&#x6253;&#x5305;&#x5E93;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>
    &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">app</span>
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; controller               <span class="hljs-comment">//&#x63A7;&#x5236;&#x5668;&#xFF08;&#x6A21;&#x5F0F;&#xFF1A;C&#x5C42;&#xFF09;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">test</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;  &#xA0;&#xA0; &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">test</span>.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; models                   <span class="hljs-comment">//&#x6570;&#x636E;&#x6A21;&#x578B;&#xFF08;&#x6A21;&#x5F0F;&#xFF1A;M&#x5C42;&#xFF09;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;    &#x251C;&#x2500;&#x2500; api                 <span class="hljs-comment">//&#x63A5;&#x53E3;api</span>
    &#x2502;   &#x2502;    &#x251C;&#x2500;&#x2500; mocks               <span class="hljs-comment">//&#x6570;&#x636E;&#x5904;&#x7406;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;        &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">app</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;  &#xA0;&#xA0;  &#x2514;&#x2500;&#x2500; home
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; extend
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; lib
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; middleware
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; mocks
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; proxy
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; router.js                 <span class="hljs-comment">//&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8DEF;&#x7531;</span>
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">view</span>                             <span class="hljs-comment">//&#x89C6;&#x56FE;&#xFF08;&#x6A21;&#x5F0F;&#xFF1A;V&#x5C42;&#xFF0C;&#x5DE5;&#x5177;&#x751F;&#x6210;&#xFF09;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;   &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">about</span>                 <span class="hljs-comment">// &#x670D;&#x52A1;&#x5668;&#x7F16;&#x8BD1;&#x7684;jsbundle&#x6587;&#x4EF6;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">about</span>.js
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;  &#x2502;&#xA0;&#xA0;   &#x2514;&#x2500;&#x2500; home.js         <span class="hljs-comment">// &#x670D;&#x52A1;&#x5668;&#x7F16;&#x8BD1;&#x7684;jsbundle&#x6587;&#x4EF6;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; layout                <span class="hljs-comment">// &#x7528;&#x4E8E;&#x6839;&#x636E;&#x6307;&#x5B9A;&#x7684;layout&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;html&#x9875;&#x9762;, &#x7528;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x6E32;&#x67D3;&#x5931;&#x8D25;&#x65F6;,&#x91C7;&#x7528;&#x5BA2;&#x6237;&#x7AEF;&#x6E32;&#x67D3;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; layout.html
    &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; web                       <span class="hljs-comment">//&#x89C6;&#x56FE;&#xFF08;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x76EE;&#x5F55;&#x5F00;&#x53D1;--&gt;&#x751F;&#x6210;&#x6A21;&#x5F0F;&#xFF1A;V&#x5C42;&#xFF09;</span>
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; asset                 <span class="hljs-comment">// &#x5B58;&#x653E;&#x516C;&#x5171;js,css&#x8D44;&#x6E90;</span>
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; framework             <span class="hljs-comment">// &#x524D;&#x7AEF;&#x516C;&#x5171;&#x5E93;&#x548C;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; fastclick
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; fastclick.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; sdk
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; sdk.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; storage
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; storage.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; vue               <span class="hljs-comment">// &#x4E0E;vue&#x76F8;&#x5173;&#x7684;&#x516C;&#x5F00;&#x4EE3;&#x7801;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">app</span>.js        <span class="hljs-comment">// &#x524D;&#x540E;&#x7AEF;&#x8C03;&#x7528;&#x5165;&#x53E3;, &#x9ED8;&#x8BA4;&#x5F15;&#x5165;componet/directive/filter</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; component.js  <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x5165;&#x53E3;, &#x53EF;&#x4EE5;&#x589E;&#x52A0;component&#x76EE;&#x5F55;,&#x7C7B;&#x4F3C;&#x4E0B;&#x9762;&#x7684;directive</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; directive     <span class="hljs-comment">// directive &#x76EE;&#x5F55;,&#x5B58;&#x653E;&#x5404;&#x79CD;directive&#x7EC4;&#x4EF6;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; directive.js  <span class="hljs-comment">// directive&#x5F15;&#x7528;&#x5165;&#x53E3;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; filter.js     <span class="hljs-comment">// filter&#x5F15;&#x7528;&#x5165;&#x53E3;</span>
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; page                  <span class="hljs-comment">// &#x524D;&#x7AEF;&#x9875;&#x9762;&#x548C;webpack&#x6784;&#x5EFA;&#x76EE;&#x5F55;, &#x4E5F;&#x5C31;&#x662F;webpack&#x6253;&#x5305;&#x914D;&#x7F6E;entryDir</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home              <span class="hljs-comment">// &#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x9075;&#x5FAA;&#x76EE;&#x5F55;&#x540D;, js&#x6587;&#x4EF6;&#x540D;, scss&#x6587;&#x4EF6;&#x540D;, vue&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x540C;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home.scss
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home.vue
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; images        <span class="hljs-comment">// &#x9875;&#x9762;&#x81EA;&#x6709;&#x56FE;&#x7247;,&#x516C;&#x5171;&#x56FE;&#x7247;&#x548C;css&#x653E;&#x5230;asset&#x4E0B;&#x9762;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; icon_more.png
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; w-week        <span class="hljs-comment">// &#x9875;&#x9762;&#x81EA;&#x6709;&#x7EC4;&#x4EF6;,&#x516C;&#x5171;&#x7EC4;&#x4EF6;&#x653E;&#x5230;widget&#x4E0B;&#x9762;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; w-week.scss
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; w-week.vue
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">test</span>             <span class="hljs-comment">// &#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x9075;&#x5FAA;&#x76EE;&#x5F55;&#x540D;, js&#x6587;&#x4EF6;&#x540D;, scss&#x6587;&#x4EF6;&#x540D;, vue&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x540C;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">test</span>.vue
    &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; store                <span class="hljs-comment">// &#x5F15;&#x5165;vuex &#x7684;&#x57FA;&#x672C;&#x89C4;&#x8303;, &#x53EF;&#x4EE5;&#x5206;&#x6A21;&#x5757;</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">app</span>
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; actions.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; getters.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; index.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; mutation-<span class="hljs-keyword">type</span>.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; mutations.js
    &#x2502;&#xA0;&#xA0;     &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; store.js
    &#x2502;&#xA0;&#xA0;     &#x2514;&#x2500;&#x2500; component           <span class="hljs-comment">// &#x516C;&#x5171;&#x4E1A;&#x52A1;&#x7EC4;&#x4EF6;, &#x6BD4;&#x5982;loading, toast&#x7B49;, &#x9075;&#x5FAA;&#x76EE;&#x5F55;&#x540D;, js&#x6587;&#x4EF6;&#x540D;, scss&#x6587;&#x4EF6;&#x540D;, vue&#x6587;&#x4EF6;&#x540D;&#x76F8;&#x540C;</span>
    &#x2502;&#xA0;&#xA0;         &#x251C;&#x2500;&#x2500; loading
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; loading.scss
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; loading.vue
    &#x2502;&#xA0;&#xA0;         &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">test</span>
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">test</span>.vue
    &#x2502;&#xA0;&#xA0;         &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">test</span>.scss
    &#x2502;&#xA0;&#xA0;         &#x2514;&#x2500;&#x2500; toast
    &#x2502;&#xA0;&#xA0;             &#x251C;&#x2500;&#x2500; toast.scss
    &#x2502;&#xA0;&#xA0;             &#x2514;&#x2500;&#x2500; toast.vue
    &#x251C;&#x2500;&#x2500; build                       <span class="hljs-comment">//  webpack &#x81EA;&#x5B9A;&#x4E49;&#x914D;&#x7F6E;&#x5165;&#x53E3;, &#x4F1A;&#x4E0E;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x8FDB;&#x884C;&#x5408;&#x5E76;(&#x770B;&#x4F3C;&#x8FD9;&#x4E48;&#x591A;,&#x5176;&#x5B9E;&#x8FD9;&#x91CC;&#x53EA;&#x662F;&#x5360;&#x4E2A;&#x4F4D;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;)</span>
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; base
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;  &#x2514;&#x2500;&#x2500; index.js            <span class="hljs-comment">// &#x516C;&#x5171;&#x914D;&#x7F6E;        </span>
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500;  client                 <span class="hljs-comment">// &#x5BA2;&#x6237;&#x7AEF;webpack&#x7F16;&#x8BD1;&#x914D;&#x7F6E;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;   &#x251C;&#x2500;&#x2500; dev.js
    &#x2502;   &#x2502;   &#x251C;&#x2500;&#x2500; prod.js
    &#x2502;&#xA0;&#xA0; &#x2502;   &#x2514;&#x2500;&#x2500; index.js
    &#x2502;   &#x251C;&#x2500;&#x2500;  server                 <span class="hljs-comment">// &#x670D;&#x52A1;&#x7AEF;webpack&#x7F16;&#x8BD1;&#x914D;&#x7F6E;</span>
    &#x2502;&#xA0;&#xA0; &#x2502;    &#x251C;&#x2500;&#x2500; dev.js
    &#x2502;   &#x2502;    &#x251C;&#x2500;&#x2500; prod.js
    &#x2502;&#xA0;&#xA0; &#x2502;    &#x2514;&#x2500;&#x2500; index.js
    &#x2502;   &#x2514;&#x2500;&#x2500; index.js
    &#x251C;&#x2500;&#x2500; config
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.default.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.<span class="hljs-keyword">local</span>.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.prod.js
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; config.<span class="hljs-keyword">test</span>.js
    &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">plugin</span>.js
    &#x251C;&#x2500;&#x2500; doc
    &#x251C;&#x2500;&#x2500; index.js
    &#x251C;&#x2500;&#x2500; public                      <span class="hljs-comment">// webpack&#x7F16;&#x8BD1;&#x76EE;&#x5F55;&#x7ED3;&#x6784;, render&#x6587;&#x4EF6;&#x67E5;&#x627E;&#x76EE;&#x5F55;</span>
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; manifest.json           <span class="hljs-comment">// &#x8D44;&#x6E90;&#x4F9D;&#x8D56;&#x8868;</span>
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; static
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; css
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; home.07012d33.css
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">test</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0;     &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">test</span>.4bbb32ce.css
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; img
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; change_top.4735c57.png
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; intro.0e66266.png
    &#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; <span class="hljs-keyword">test</span>
    &#x2502;&#xA0;&#xA0; &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; <span class="hljs-keyword">test</span>.js
    &#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; vendor.js               <span class="hljs-comment">// &#x751F;&#x6210;&#x7684;&#x516C;&#x5171;&#x6253;&#x5305;&#x5E93;</span></code></pre><h3 id="articleHeader4">nodejs&#x670D;&#x52A1;&#x5668;&#x5C42;&#x5904;&#x7406;</h3><h5>&#x914D;&#x7F6E;&#x8DEF;&#x7531;router</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF1A;project/app/router.js*/
module.exports = app =&gt; {
  app.get(&apos;/&apos;, app.controller.home.home.index);
  app.get(&apos;/app/api/article/list&apos;, app.controller.app.app.list);
  app.get(&apos;/app/api/article/:id&apos;, app.controller.app.app.detail);
  app.get(&apos;/app(/.+)?&apos;, app.controller.app.app.index);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF1A;project/app/router.js*/</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">app</span> =&gt;</span> {
  app.get(<span class="hljs-string">&apos;/&apos;</span>, app.controller.home.home.index);
  app.get(<span class="hljs-string">&apos;/app/api/article/list&apos;</span>, app.controller.app.app.list);
  app.get(<span class="hljs-string">&apos;/app/api/article/:id&apos;</span>, app.controller.app.app.detail);
  app.get(<span class="hljs-string">&apos;/app(/.+)?&apos;</span>, app.controller.app.app.index);
};</code></pre><h5><a href="https://eggjs.org/zh-cn/basics/controller.html" rel="nofollow noreferrer" target="_blank">&#x63A7;&#x5236;&#x5668;</a></h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF1A;project/app/controller/home/home.js*/
const Controller = require(&apos;egg&apos;).Controller;
const Mocks = require(&apos;../../models/mocks/home/init&apos;);

class HomeController extends Controller {
  mocks(){
    const { ctx } = this;
    return  new Mocks({ctx: ctx});
  }
  async index() {//&#x9875;&#x9762;
    const { ctx  } = this;
    const mocks = this.mocks();
    await ctx.render(&apos;index/index.js&apos;, {
      title: &apos;egg vue ssr&apos;,
      list: await mocks.index() //&#x53D1;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;
    });
  }
  async pager() {//&#x63A5;&#x53E3;
    const { ctx } = this;
    const mocks = this.mocks();
    const pageIndex = ctx.query.pageIndex;
    const pageSize = ctx.query.pageSize;
    ctx.body = await mocks.index();//&#x53D1;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;
  }
};

module.exports = HomeController;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF1A;project/app/controller/home/home.js*/</span>
<span class="hljs-keyword">const</span> Controller = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Controller;
<span class="hljs-keyword">const</span> Mocks = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../../models/mocks/home/init&apos;</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
  mocks(){
    <span class="hljs-keyword">const</span> { ctx } = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">return</span>  <span class="hljs-keyword">new</span> Mocks({<span class="hljs-attr">ctx</span>: ctx});
  }
  <span class="hljs-keyword">async</span> index() {<span class="hljs-comment">//&#x9875;&#x9762;</span>
    <span class="hljs-keyword">const</span> { ctx  } = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">const</span> mocks = <span class="hljs-keyword">this</span>.mocks();
    <span class="hljs-keyword">await</span> ctx.render(<span class="hljs-string">&apos;index/index.js&apos;</span>, {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;egg vue ssr&apos;</span>,
      <span class="hljs-attr">list</span>: <span class="hljs-keyword">await</span> mocks.index() <span class="hljs-comment">//&#x53D1;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;</span>
    });
  }
  <span class="hljs-keyword">async</span> pager() {<span class="hljs-comment">//&#x63A5;&#x53E3;</span>
    <span class="hljs-keyword">const</span> { ctx } = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">const</span> mocks = <span class="hljs-keyword">this</span>.mocks();
    <span class="hljs-keyword">const</span> pageIndex = ctx.query.pageIndex;
    <span class="hljs-keyword">const</span> pageSize = ctx.query.pageSize;
    ctx.body = <span class="hljs-keyword">await</span> mocks.index();<span class="hljs-comment">//&#x53D1;&#x63A5;&#x53E3;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;</span>
  }
};

<span class="hljs-built_in">module</span>.exports = HomeController;</code></pre><h5><a href="https://eggjs.org/zh-cn/basics/controller.html" rel="nofollow noreferrer" target="_blank">&#x63A7;&#x5236;&#x5668;</a>&#xFF1A;ctx&#x5BF9;&#x8C61;&#x5E38;&#x7528;&#x89E3;&#x8BF4;</h5><ul><li>&#x83B7;&#x53D6;&#x9875;&#x9762;&#x53C2;&#x6570;&#xFF08;params&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;&#xFF08;46&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;http://localhost:7001/app/detail/46
const id = this.ctx.params.id;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x83B7;&#x53D6;&#xFF08;46&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;http://localhost:7001/app/detail/46</span>
<span class="hljs-keyword">const</span> id = <span class="hljs-keyword">this</span>.ctx.params.id;</code></pre><ul><li>&#x83B7;&#x53D6;&#x9875;&#x9762;&#x53C2;&#x6570;&#xFF08;query&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;&#xFF08;20&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;http://localhost:7001/?page=20
const page = this.ctx.query.page;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x83B7;&#x53D6;&#xFF08;20&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;http://localhost:7001/?page=20</span>
<span class="hljs-keyword">const</span> page = <span class="hljs-keyword">this</span>.ctx.query.page;</code></pre><ul><li>&#x83B7;&#x53D6;&#x9875;&#x9762;&#x534F;&#x8BAE;&#xFF08;protocol&#xFF09;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x83B7;&#x53D6;&#xFF08;20&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;http://localhost:7001/?page=20
const protocol = this.ctx.protocol;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x83B7;&#x53D6;&#xFF08;20&#xFF09;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;http://localhost:7001/?page=20</span>
<span class="hljs-keyword">const</span> protocol = <span class="hljs-keyword">this</span>.ctx.protocol;</code></pre><ul><li>&#x6E32;&#x67D3;&#x9875;&#x9762;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await ctx.render(&apos;app/app.js&apos;, {});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">await</span> ctx.render(<span class="hljs-string">&apos;app/app.js&apos;</span>, {});</code></pre><ul><li>&#x6E32;&#x67D3;&#x63A5;&#x53E3;&#x6570;&#x636E;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.ctx.body = {title: &apos;&#x63A5;&#x53E3;&apos;};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">this</span>.ctx.body = {<span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x63A5;&#x53E3;&apos;</span>};</code></pre><p><a href="https://eggjs.org/zh-cn/basics/controller.html" rel="nofollow noreferrer" target="_blank">&#x4E86;&#x89E3;&#x66F4;&#x591A;</a></p><h5>&#x6570;&#x636E;&#x6A21;&#x578B;&#xFF1A; API (&#x5FC5;&#x987B;&#x4F20;&#x9875;&#x9762;protocol&#x503C;&#xFF0C;&#x5426;&#x5219;&#x4F7F;&#x7528;config&#x914D;&#x7F6E;)</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF1A;project/app/models/api/api.js */
const axios = require(&apos;axios&apos;);
const Config = require(&apos;../../config/config&apos;);

class Api {
  constructor(opts) {
    console.log(88777);
  }
  fetch(_opt) {
    var param = &apos;&apos;,
      opt = Object.assign({
        baseHost: Config.apiHost,
        protocol: Config.apiProtocol,
        urlMap: &apos;&apos;,
        url: &apos;&apos;,
        method: &apos;GET&apos;,
        type: &apos;json&apos;,
        cookies: true, //Boolean
        timeout: 10000,
        param: null, //{id: 123}
        paramType: 0 // 0&#x8868;&#x793A;&#x53C2;&#x6570;&#x4EE5;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x63D0;&#x4EA4;&#x6BD4;&#x5982;&#x201C;wen=12&amp;xx=333&#x201D;; 1&#x8868;&#x793A;&#x53C2;&#x6570;&#x4EE5;&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#x63D0;&#x4EA4;&#x6BD4;&#x5982;&#x201C;{wen:12, xx:33}&#x201D;
      }, _opt);

    //&#x8003;&#x8651;redis&#x7F13;&#x5B58;&#x5904;&#x7406;

    if (opt.urlMap !== &apos;&apos;) {
      opt.url = `${opt.baseHost}${opt.urlMap}`;
    }

    if (opt.protocol === &apos;https&apos;) {
      opt.url = (opt.url).replace(/^http:(\/\/[\w])/, &apos;https:$1&apos;);
    }
    console.log(&apos;opt.url&apos;, opt.url);
    if (opt.param !== null) {
      for (var key in opt.param) {
        if (typeof opt.param[key] !== &apos;function&apos;) {
          param += &apos;&amp;&apos;+key+&apos;=&apos;+ encodeURIComponent(opt.param[key]);
        }
      }
      param = param.substring(1);
    }

    return axios(opt.url, {
      method: opt.method,
      timeout: opt.timeout,
      data: (opt.paramType === 0) ? param : opt.param,
      withCredentials: opt.cookies
    }).then(function(response) {
      return response.data;
    }).catch(function(ex) {
      return { error: true, url: ex };
    });
  }
}

//export default Api;
module.exports = new Api();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* &#x6587;&#x4EF6;&#x76EE;&#x5F55;&#xFF1A;project/app/models/api/api.js */</span>
<span class="hljs-keyword">const</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;axios&apos;</span>);
<span class="hljs-keyword">const</span> Config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../../config/config&apos;</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Api</span> </span>{
  <span class="hljs-keyword">constructor</span>(opts) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">88777</span>);
  }
  fetch(_opt) {
    <span class="hljs-keyword">var</span> param = <span class="hljs-string">&apos;&apos;</span>,
      opt = <span class="hljs-built_in">Object</span>.assign({
        <span class="hljs-attr">baseHost</span>: Config.apiHost,
        <span class="hljs-attr">protocol</span>: Config.apiProtocol,
        <span class="hljs-attr">urlMap</span>: <span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;GET&apos;</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;json&apos;</span>,
        <span class="hljs-attr">cookies</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//Boolean</span>
        timeout: <span class="hljs-number">10000</span>,
        <span class="hljs-attr">param</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">//{id: 123}</span>
        paramType: <span class="hljs-number">0</span> <span class="hljs-comment">// 0&#x8868;&#x793A;&#x53C2;&#x6570;&#x4EE5;&#x5B57;&#x7B26;&#x4E32;&#x5F62;&#x5F0F;&#x63D0;&#x4EA4;&#x6BD4;&#x5982;&#x201C;wen=12&amp;xx=333&#x201D;; 1&#x8868;&#x793A;&#x53C2;&#x6570;&#x4EE5;&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#x63D0;&#x4EA4;&#x6BD4;&#x5982;&#x201C;{wen:12, xx:33}&#x201D;</span>
      }, _opt);

    <span class="hljs-comment">//&#x8003;&#x8651;redis&#x7F13;&#x5B58;&#x5904;&#x7406;</span>

    <span class="hljs-keyword">if</span> (opt.urlMap !== <span class="hljs-string">&apos;&apos;</span>) {
      opt.url = <span class="hljs-string">`<span class="hljs-subst">${opt.baseHost}</span><span class="hljs-subst">${opt.urlMap}</span>`</span>;
    }

    <span class="hljs-keyword">if</span> (opt.protocol === <span class="hljs-string">&apos;https&apos;</span>) {
      opt.url = (opt.url).replace(<span class="hljs-regexp">/^http:(\/\/[\w])/</span>, <span class="hljs-string">&apos;https:$1&apos;</span>);
    }
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;opt.url&apos;</span>, opt.url);
    <span class="hljs-keyword">if</span> (opt.param !== <span class="hljs-literal">null</span>) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> opt.param) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> opt.param[key] !== <span class="hljs-string">&apos;function&apos;</span>) {
          param += <span class="hljs-string">&apos;&amp;&apos;</span>+key+<span class="hljs-string">&apos;=&apos;</span>+ <span class="hljs-built_in">encodeURIComponent</span>(opt.param[key]);
        }
      }
      param = param.substring(<span class="hljs-number">1</span>);
    }

    <span class="hljs-keyword">return</span> axios(opt.url, {
      <span class="hljs-attr">method</span>: opt.method,
      <span class="hljs-attr">timeout</span>: opt.timeout,
      <span class="hljs-attr">data</span>: (opt.paramType === <span class="hljs-number">0</span>) ? param : opt.param,
      <span class="hljs-attr">withCredentials</span>: opt.cookies
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
      <span class="hljs-keyword">return</span> response.data;
    }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ex</span>) </span>{
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">error</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">url</span>: ex };
    });
  }
}

<span class="hljs-comment">//export default Api;</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> Api();</code></pre><h5>&#x6570;&#x636E;&#x6A21;&#x578B;&#xFF1A;mocks</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x76EE;&#x5F55;&#x6587;&#x4EF6;&#xFF1A;project/app/models/mocks/app/init.js*/
const { fetch } = require(&apos;../../api/api&apos;);

class Mocks  {
    constructor(suppor) {
        this.ctx = suppor.ctx;
    }
    index(){
        let urlMap = &apos;/menus&apos;,
            protocol = this.ctx.protocol;
        return fetch({
            url: &apos;http://m.aipai.com/mobile/apps/apps.php?module=gameIndex&amp;func=newAsset&amp;sort=click&amp;appId=11616&amp;page=3&amp;pageSize=12&apos;,
            //urlMap: urlMap,
            protocol: protocol,//ctx.protocol,
            method: &apos;get&apos;,
            type: &quot;jsonp&quot;,
            //param: param
        }).then(ret=&gt;{
            //&#x8BBF;&#x95EE;&#x8D85;&#x65F6;or&#x8D44;&#x6E90;&#x5730;&#x5740;&#x51FA;&#x9519;
            if(typeof ret.error !== &apos;undefined&apos; &amp;&amp; ret.error){
                //msg = &apos;&#x7F51;&#x7EDC;&#x9519;&#x8BEF;&apos;;
            }else{  }
            return ret;
        });
    }
};
module.exports = Mocks;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*&#x76EE;&#x5F55;&#x6587;&#x4EF6;&#xFF1A;project/app/models/mocks/app/init.js*/</span>
<span class="hljs-keyword">const</span> { fetch } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../../api/api&apos;</span>);

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Mocks</span>  </span>{
    <span class="hljs-keyword">constructor</span>(suppor) {
        <span class="hljs-keyword">this</span>.ctx = suppor.ctx;
    }
    index(){
        <span class="hljs-keyword">let</span> urlMap = <span class="hljs-string">&apos;/menus&apos;</span>,
            protocol = <span class="hljs-keyword">this</span>.ctx.protocol;
        <span class="hljs-keyword">return</span> fetch({
            <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;http://m.aipai.com/mobile/apps/apps.php?module=gameIndex&amp;func=newAsset&amp;sort=click&amp;appId=11616&amp;page=3&amp;pageSize=12&apos;</span>,
            <span class="hljs-comment">//urlMap: urlMap,</span>
            protocol: protocol,<span class="hljs-comment">//ctx.protocol,</span>
            method: <span class="hljs-string">&apos;get&apos;</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">&quot;jsonp&quot;</span>,
            <span class="hljs-comment">//param: param</span>
        }).then(<span class="hljs-function"><span class="hljs-params">ret</span>=&gt;</span>{
            <span class="hljs-comment">//&#x8BBF;&#x95EE;&#x8D85;&#x65F6;or&#x8D44;&#x6E90;&#x5730;&#x5740;&#x51FA;&#x9519;</span>
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> ret.error !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; ret.error){
                <span class="hljs-comment">//msg = &apos;&#x7F51;&#x7EDC;&#x9519;&#x8BEF;&apos;;</span>
            }<span class="hljs-keyword">else</span>{  }
            <span class="hljs-keyword">return</span> ret;
        });
    }
};
<span class="hljs-built_in">module</span>.exports = Mocks;</code></pre><h3 id="articleHeader5">&#x5BA2;&#x6237;&#x7AEF;</h3><h5>&#x83B7;&#x53D6;&#x670D;&#x52A1;&#x7AEF;&#x6570;&#x636E;&#xFF1A;serverData&#xFF08;&#x6CA1;&#x6709;store&#x548C;router&#xFF09;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;
computed: {
  title(){
    return this.serverData.title;
  },
  lists(){
    return this.serverData.list;
  }
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x4F7F;&#x7528;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;</span>
computed: {
  title(){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.serverData.title;
  },
  lists(){
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.serverData.list;
  }
},</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeHzr?w=948&amp;h=742" src="https://static.alili.tech/img/bVbeHzr?w=948&amp;h=742" alt="&#x6570;&#x636E;&#x5982;&#x56FE;" title="&#x6570;&#x636E;&#x5982;&#x56FE;" style="cursor:pointer"></span></p><h5>&#x83B7;&#x53D6;&#x670D;&#x52A1;&#x7AEF;&#x6570;&#x636E;&#xFF1A;serverData&#xFF08;&#x6709;store&#x548C;router&#xFF09;</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x76EE;&#x5F55;&#x6587;&#x4EF6;&#xFF1A;project/app/web/page/app/views/index.vue*/
preFetch ({ state, dispatch, commit }) {//&#x53EA;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6267;&#x884C;; preFetch&#x6BD4;created&#x6267;&#x884C;&#x5FEB;
  return Promise.all([
    dispatch(&apos;FETCH_ARTICLE_LIST_PRE&apos;)
  ])
},
beforeMount() {//&#x53EA;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x6267;&#x884C;; created&#x6BD4;beforeMount&#x6267;&#x884C;&#x5FEB;
  let serverData = this.$store.state.serverData;
  if(serverData.articleList &amp;&amp; serverData.articleList.length &gt;0){
    this.$store.commit(&apos;SET_ARTICLE_LIST&apos;, serverData.articleList);
  }else{
    return Promise.all([
      this.$store.dispatch(&apos;FETCH_ARTICLE_LIST&apos;)
    ]);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*&#x76EE;&#x5F55;&#x6587;&#x4EF6;&#xFF1A;project/app/web/page/app/views/index.vue*/</span>
preFetch ({ state, dispatch, commit }) {<span class="hljs-comment">//&#x53EA;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6267;&#x884C;; preFetch&#x6BD4;created&#x6267;&#x884C;&#x5FEB;</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all([
    dispatch(<span class="hljs-string">&apos;FETCH_ARTICLE_LIST_PRE&apos;</span>)
  ])
},
beforeMount() {<span class="hljs-comment">//&#x53EA;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x6267;&#x884C;; created&#x6BD4;beforeMount&#x6267;&#x884C;&#x5FEB;</span>
  <span class="hljs-keyword">let</span> serverData = <span class="hljs-keyword">this</span>.$store.state.serverData;
  <span class="hljs-keyword">if</span>(serverData.articleList &amp;&amp; serverData.articleList.length &gt;<span class="hljs-number">0</span>){
    <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;SET_ARTICLE_LIST&apos;</span>, serverData.articleList);
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all([
      <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">&apos;FETCH_ARTICLE_LIST&apos;</span>)
    ]);
  }
}</code></pre><p><span class="img-wrap"><img data-src="/img/bVbeHAc?w=728&amp;h=568" src="https://static.alili.tech/img/bVbeHAc?w=728&amp;h=568" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader6">&#x9875;&#x9762;&#x914D;&#x7F6E;</h3><h5>&#x8BBE;&#x7F6E;&#x9875;&#x9762;&#x7684;&#xFF1A;&#x6807;&#x9898;&#x3001;&#x5173;&#x952E;&#x8BCD;&#x3001;&#x63CF;&#x8FF0;&#xFF1B;&#x5F15;&#x5165;css&#x3001;js&#xFF1B;</h5><ul><li>pluginCss&#xFF1A; &#x6570;&#x7EC4;&#xFF1B;&#x5934;&#x90E8;&#x5F15;&#x5165;css</li><li>pluginJs&#xFF1A; &#x6570;&#x7EC4;&#xFF1B;&#x5934;&#x90E8;&#x5F15;&#x5165;js</li><li>pluginFooterJs&#xFF1A; &#x6570;&#x7EC4;&#xFF1B;&#x5E95;&#x90E8;&#x5F15;&#x5165;js</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;layout :layoutData=&quot;layoutData&quot;&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;!-- &lt;transition name=&quot;fade&quot; mode=&quot;out-in&quot;&gt;
      
    &lt;/transition&gt; --&gt;
&lt;/layout&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">layout</span> <span class="hljs-attr">:layoutData</span>=<span class="hljs-string">&quot;layoutData&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;transition name=&quot;fade&quot; mode=&quot;out-in&quot;&gt;
      
    &lt;/transition&gt; --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">layout</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*&#x76EE;&#x5F55;&#x6587;&#x4EF6;&#xFF1A;project/app/web/page/app/app.vue*/
computed: {
      layoutData() {
      let state = this.$store.state;
      return {
        title: state.serverData.title+&quot;: 2018&#x4E16;&#x754C;&#x676F;&#x5927;&#x6570;&#x636E;&#x62A5;&#x544A;&quot;,
        keywords: &quot;keywords&quot;,
        description: &quot;description&quot;,
        pluginCss: [&apos;//www.xxx.com/static/index.min.css&apos;],
        pluginJs: [&quot;//www.xxx.com/static/libs/zepto.min.1.2.0.js&quot;],
        pluginFooterJs: [&quot;//www.xxx.com/static/libs/zepto.min.1.2.0.js&quot;],
      };
    }
 }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*&#x76EE;&#x5F55;&#x6587;&#x4EF6;&#xFF1A;project/app/web/page/app/app.vue*/</span>
computed: {
      layoutData() {
      <span class="hljs-keyword">let</span> state = <span class="hljs-keyword">this</span>.$store.state;
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">title</span>: state.serverData.title+<span class="hljs-string">&quot;: 2018&#x4E16;&#x754C;&#x676F;&#x5927;&#x6570;&#x636E;&#x62A5;&#x544A;&quot;</span>,
        <span class="hljs-attr">keywords</span>: <span class="hljs-string">&quot;keywords&quot;</span>,
        <span class="hljs-attr">description</span>: <span class="hljs-string">&quot;description&quot;</span>,
        <span class="hljs-attr">pluginCss</span>: [<span class="hljs-string">&apos;//www.xxx.com/static/index.min.css&apos;</span>],
        <span class="hljs-attr">pluginJs</span>: [<span class="hljs-string">&quot;//www.xxx.com/static/libs/zepto.min.1.2.0.js&quot;</span>],
        <span class="hljs-attr">pluginFooterJs</span>: [<span class="hljs-string">&quot;//www.xxx.com/static/libs/zepto.min.1.2.0.js&quot;</span>],
      };
    }
 },</code></pre><h3 id="articleHeader7">&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5907;&#x6CE8;&#xFF1A; &#x670D;&#x52A1;&#x7AEF;&#x4E0E;&#x5BA2;&#x6237;&#x7AEF;&#x6570;&#x636E;&#x901A;&#x8FC7;&#x6E32;&#x67D3;window.__INITIAL_STATE__&#x6765;&#x6865;&#x63A5;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial">&#x5907;&#x6CE8;&#xFF1A; &#x670D;&#x52A1;&#x7AEF;&#x4E0E;&#x5BA2;&#x6237;&#x7AEF;&#x6570;&#x636E;&#x901A;&#x8FC7;&#x6E32;&#x67D3;<span class="hljs-built_in">window</span>.__INITIAL_STATE__&#x6765;&#x6865;&#x63A5;&#x7684;</code></pre><ul><li>created &#x670D;&#x52A1;&#x5668;&#x7AEF;&#x3001;&#x5BA2;&#x6237;&#x7AEF;&#x6267;&#x884C;</li><li>preFetch &#xFF08;&#x6709;store&amp;&amp;router&#x65F6;&#x624D;&#x5B58;&#x5728;&#x65B9;&#x6CD5;&#xFF09;&#x670D;&#x52A1;&#x7AEF;&#x6267;&#x884C;&#xFF1B;&#x5FC5;&#x987B;&#x8BBE;&#x7F6E;<a href="https://smallpath.me/post/vue2-ssr-hardcore#router.getmatchedcomponents%E7%9A%84%E5%8C%B9%E9%85%8D%E9%97%AE%E9%A2%98" rel="nofollow noreferrer" target="_blank">router&#x4E3A;&#x9876;&#x7EA7;&#x8DEF;&#x7531;</a>&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x63A7;&#x5236;&#x5668;&#x5FC5;&#x987B;&#x5E26; url: ctx.url.replace(//app/, &apos;&apos;)</li><li>beforeMount &#x5BA2;&#x6237;&#x7AEF;&#x6267;&#x884C;</li><li>&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6267;&#x884C;nodejs&#xFF08;&#x5168;&#x5C40;&#xFF1A;global&#x3001;process&#x3001;console&#xFF09;</li><li>&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x6267;&#x884C;javascript&#xFF08;&#x5168;&#x5C40;&#xFF1A;window&#xFF09;</li></ul><h3 id="articleHeader8">&#x76F8;&#x5173;&#x8D44;&#x6599;</h3><ul><li><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">nodejs</a></li><li><a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npmjs</a></li><li><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack</a></li><li><a href="https://eggjs.org/" rel="nofollow noreferrer" target="_blank">egg</a></li><li><a href="https://github.com/search?q=topic%3Aegg-plugin&amp;type=Repositories" rel="nofollow noreferrer" target="_blank">egg-plugin</a></li><li><a href="https://koa.bootcss.com/" rel="nofollow noreferrer" target="_blank">koajs</a></li><li><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue</a></li><li><a href="https://vuex.vuejs.org/" rel="nofollow noreferrer" target="_blank">vuex</a></li><li><a href="https://router.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue router</a></li><li><a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">vue-devtools</a></li><li><a href="http://hubcarl.github.io/easywebpack/vue/dev/" rel="nofollow noreferrer" target="_blank">Egg+Vue&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x5F00;&#x53D1;&#x6D41;&#x7A0B;</a></li><li><a href="http://hubcarl.github.io/blog/2017/04/15/webpack-project/" rel="nofollow noreferrer" target="_blank">&#x57FA;&#x4E8E;webpack&#x7684;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x548C;egg+vue&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x9879;&#x76EE;&#x5B9E;&#x8DF5;</a></li><li><a href="http://hubcarl.github.io/blog/2017/04/15/egg-webpack/" rel="nofollow noreferrer" target="_blank">koa&#x548C;egg&#x9879;&#x76EE;webpack&#x5185;&#x5B58;&#x7F16;&#x8BD1;&#x548C;&#x70ED;&#x66F4;&#x65B0;&#x5B9E;&#x73B0;</a></li><li><a href="https://github.com/hubcarl/easywebpack" rel="nofollow noreferrer" target="_blank">easywebpack</a></li><li><a href="https://github.com/hubcarl/egg-vue-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">boilerplate</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
EggVueSsr实现前后端分离、服务器和客户端同构渲染

## 原文链接
[https://segmentfault.com/a/1190000015858201](https://segmentfault.com/a/1190000015858201)


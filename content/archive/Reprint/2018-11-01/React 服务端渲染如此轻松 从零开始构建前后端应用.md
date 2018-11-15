---
title: React 服务端渲染如此轻松 从零开始构建前后端应用
hidden: true
categories: reprint
slug: 6d0d53b1
date: 2018-11-01 02:30:08
---

{{< raw >}}
<p>&#x53C2;&#x52A0;&#x6216;&#x7559;&#x610F;&#x4E86;&#x6700;&#x8FD1;&#x4E3E;&#x884C;&#x7684;<a href="https://www.zhihu.com/question/62154473/answer/200045569" rel="nofollow noreferrer" target="_blank">JSConf CN 2017</a>&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x60F3;&#x5FC5;&#x5BF9; Next.js &#x4E0D;&#x518D;&#x964C;&#x751F;&#xFF0C; Next.js &#x7684;&#x4F5C;&#x8005;&#x4E4B;&#x4E00;&#x5230;&#x573A;&#x8FDB;&#x884C;&#x4E86;&#x7CBE;&#x5F69;&#x7684;&#x6F14;&#x8BB2;&#x3002;&#x5176;&#x5B9E;&#x5728;&#x66F4;&#x65E9;&#x4E9B;&#x65F6;&#x5019;&#xFF0C;&#x7531; Facebook &#x4E3E;&#x529E;&#x7684; React Conf 2017&#xFF0C;&#x4ED6;&#x5C31;&#x5230;&#x573A;&#x5E76;&#x6709;&#x8FD1;40&#x5206;&#x949F;&#x7684;&#x5206;&#x4EAB;&#x3002;&#x4F46;&#x4E24;&#x6B21;&#x5206;&#x4EAB;&#x5E26;&#x6765;&#x7684; demo &#x90FD;&#x662F; hacker news&#x3002;&#x6211;&#x89C2;&#x5BDF; Next.js &#x65F6;&#x95F4;&#x8F83;&#x957F;&#xFF0C;&#x770B;&#x7740;&#x5B83;&#x4ECE;1.x &#x7248;&#x672C;&#x4E00;&#x76F4;&#x5230;&#x4E86;&#x4ECA;&#x5929;&#x7684; 3.x&#xFF0C;&#x7EC8;&#x4E8E;&#x51B3;&#x5B9A;&#x5199;&#x4E00;&#x7BC7;&#x5165;&#x95E8;&#x7EA7;&#x7684;&#x65B0;&#x624B;&#x6307;&#x5BFC;&#x6587;&#x7AE0;&#x3002;&#x800C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x8BD5;&#x56FE;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x5168;&#x65B0;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6765;&#x8BA9;&#x5927;&#x5BB6;&#x4E86;&#x89E3; Next.js &#x5230;&#x5E95;&#x662F;&#x5982;&#x4F55;&#x4E0E; React &#x914D;&#x5408;&#xFF0C;&#x8FBE;&#x5230;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x7684;&#x3002;</p><p>&#x201C;React universal&#x201D; &#x662F;&#x793E;&#x533A;&#x4E0A;&#x5F62;&#x5BB9;&#x57FA;&#x4E8E; React &#x6784;&#x5EFA; web &#x5E94;&#x7528;&#xFF0C;&#x5E76;&#x91C7;&#x7528;&#x201C;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#x201D;&#x65B9;&#x5F0F;&#x7684;&#x4E00;&#x4E2A;&#x8BCD;&#x8BED;&#x3002;&#x4E5F;&#x8BB8;&#x5F88;&#x591A;&#x4EBA;&#x5BF9; &#x201C;isomorphic&#x201D; &#x8FD9;&#x4E2A;&#x5355;&#x8BCD;&#x66F4;&#x52A0;&#x719F;&#x6089;&#xFF0C;&#x5176;&#x5B9E;&#x8FD9;&#x4E24;&#x4E2A;&#x8BCD;&#x8BED;&#x60F3;&#x8981;&#x8868;&#x8FBE;&#x7684;&#x6982;&#x5FF5;&#x7C7B;&#x4F3C;&#x3002;&#x4ECA;&#x5929;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x8BA8;&#x8BBA;&#x8FD9;&#x4E24;&#x4E2A;&#x8BCD;&#x8BED;&#x7684;&#xFF0C;<strong>&#x6211;&#x4EEC;&#x8981;&#x5C1D;&#x8BD5;&#x4F7F;&#x7528;&#x6700;&#x65B0;&#x7248; <a href="https://github.com/zeit/next.js" rel="nofollow noreferrer" target="_blank">Next.js</a>&#xFF0C;&#x6784;&#x4EF6;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3; React &#x5E94;&#x7528;&#x3002;</strong>&#x6700;&#x7EC8;&#x9879;&#x76EE;&#x5730;&#x5740;&#x53EF;&#x4EE5;<a href="https://github.com/HOUCe/server-side-react-football" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x8FD9;&#x91CC;&#x67E5;&#x770B;&#x3002;</a></p><h2 id="articleHeader0">&#x4E3A;&#x4F55;&#x8981;&#x5F00;&#x53D1; Universal &#x5E94;&#x7528;&#xFF1F;</h2><p>React app &#x5B9E;&#x73B0;&#x4E86;&#x865A;&#x62DF; DOM&#xFF0C;&#x6765;&#x5B9E;&#x73B0;&#x5BF9;&#x771F;&#x5B9E; DOM &#x7684;&#x62BD;&#x8C61;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x8BBE;&#x8BA1;&#x8FC5;&#x901F;&#x5F15;&#x9886;&#x4E86;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x6D6A;&#x6F6E;&#x3002;&#x4F46;&#x662F; &#x201C;Every great thing comes with a price&#x201D;&#xFF0C;&#x865A;&#x62DF; DOM &#x540C;&#x6837;&#x5E26;&#x6765;&#x4E86;&#x4E00;&#x4E9B;&#x5F0A;&#x7AEF;&#xFF0C;&#x6BD4;&#x5982;&#x5728;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x7684;&#x5F00;&#x53D1;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;SEO&#x5C31;&#x6210;&#x4E86;&#x95EE;&#x9898;&#xFF1B;&#x540C;&#x6837;&#x9996;&#x5C4F;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;&#x53D8;&#x957F;&#xFF0C;&#x5404;&#x79CD; loading &#x6D88;&#x78E8;&#x4EBA;&#x7684;&#x8010;&#x5FC3;&#x3002;&#x5C31;&#x50CF;&#x4E0B;&#x9762;&#x622A;&#x56FE;&#x6240;&#x5C55;&#x73B0;&#x7684;&#x90A3;&#x6837;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260039" src="https://static.alili.tech/img/remote/1460000010260039" alt="&#x9875;&#x9762;" title="&#x9875;&#x9762;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260040" src="https://static.alili.tech/img/remote/1460000010260040" alt="&#x67E5;&#x770B;&#x7F51;&#x9875;&#x6E90;&#x7801;" title="&#x67E5;&#x770B;&#x7F51;&#x9875;&#x6E90;&#x7801;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x4F7F;&#x7528; Next.js &#x5B9E;&#x73B0; Universal</h2><p>Universal &#x5E94;&#x7528;&#x67B6;&#x6784;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x5148;&#x800C;&#x7247;&#x9762;&#x7684;&#x7406;&#x89E3;&#x6210;&#x5E94;&#x7528;&#x5C06;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#x5171;&#x540C;&#x5B8C;&#x6210;&#x6E32;&#x67D3;&#x3002;&#x8FD9;&#x6837;&#x53D6;&#x4EE3;&#x4E86;&#x5B8C;&#x5168;&#x7531;&#x5BA2;&#x6237;&#x7AEF;&#x6E32;&#x67D3;&#xFF08;&#x524D;&#x540E;&#x7AEF;&#x5206;&#x79BB;&#x65B9;&#x5F0F;&#xFF09;&#x6A21;&#x5F0F;&#x3002;&#x5728; React &#x573A;&#x666F;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; React &#x81EA;&#x8EAB;&#x7684; renderToString &#x5B8C;&#x6210;&#x670D;&#x52A1;&#x7AEF;&#x521D;&#x6B21;&#x6E32;&#x67D3;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6BCF;&#x6B21;&#x624B;&#x52A8;&#x6765;&#x5B8C;&#x6210;&#x8FD9;&#x4E9B;&#x8FC7;&#x7A0B;&#xFF0C;&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x7AEF;&#x7E41;&#x7410;&#x914D;&#x7F6E;&#xFF0C;&#x96BE;&#x514D;&#x4EE4;&#x4EBA;&#x5934;&#x5927;&#x5FC3;&#x70E6;&#x3002;</p><p>Next.js &#x7684;&#x51FA;&#x73B0;&#xFF0C;&#x5C31;&#x662F;&#x4E3A;&#x4F60;&#x89E3;&#x51B3;&#x8FD9;&#x79CD;&#x607C;&#x4EBA;&#x7684;&#x95EE;&#x9898;&#x3002;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x8BA4;&#x8BC6;&#x4E00;&#x4E0B;&#x5B83;&#x7684;&#x51E0;&#x4E2A;&#x539F;&#x5219;&#x548C;&#x601D;&#x60F3;&#xFF1A;</p><ul><li><p>&#x4E0D;&#x9700;&#x8981;&#x9664; Next &#x4E4B;&#x5916;&#xFF0C;&#x591A;&#x4F59;&#x7684;&#x914D;&#x7F6E;&#x548C;&#x5B89;&#x88C5;&#xFF08;&#x6BD4;&#x5982; webpack&#xFF0C;babel&#xFF09;&#xFF1B;</p></li><li><p>&#x4F7F;&#x7528; <a href="https://github.com/threepointone/glamor" rel="nofollow noreferrer" target="_blank">Glamor</a> &#x5904;&#x7406;&#x6837;&#x5F0F;&#xFF1B;</p></li><li><p>&#x81EA;&#x52A8;&#x7F16;&#x8BD1;&#x548C;&#x6253;&#x5305;&#xFF1B;</p></li><li><p>&#x70ED;&#x66F4;&#x65B0;&#xFF1B;</p></li><li><p>&#x65B9;&#x4FBF;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7BA1;&#x7406;&#xFF1B;</p></li><li><p>&#x6210;&#x719F;&#x7075;&#x6D3B;&#x7684;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#xFF0C;&#x5305;&#x62EC;&#x8DEF;&#x7531;&#x7EA7;&#x522B; prefetching&#xFF1B;</p></li></ul><h2 id="articleHeader2">Demo&#xFF1A;&#x82F1;&#x8D85;&#x8054;&#x8D5B;&#x79EF;&#x5206;&#x699C;</h2><p>&#x5176;&#x5B9E;&#x5173;&#x4E8E;&#x66F4;&#x591A;&#x7684; Next.js &#x8BBE;&#x8BA1;&#x7406;&#x5FF5;&#x6211;&#x4E0D;&#x60F3;&#x518D;&#x8D58;&#x8FF0;&#x4E86;&#xFF0C;&#x8BFB;&#x8005;&#x90FD;&#x53EF;&#x4EE5;&#x5728;&#x5176;&#x5B98;&#x7F51;&#x627E;&#x5230;&#x4E30;&#x5BCC;&#x7684;&#x5185;&#x5BB9;&#x3002;&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x5C06;&#x4F7F;&#x7528; Football Data API &#x6765;&#x7B80;&#x5355;&#x5F00;&#x53D1;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; Next.js &#x7684;&#x5E94;&#x7528;&#xFF0C;&#x8FD9;&#x4E2A;&#x5E94;&#x7528;&#x5C06;&#x5C55;&#x73B0;&#x82F1;&#x8D85;&#x8054;&#x8D5B;&#x7684;&#x5B9E;&#x65F6;&#x79EF;&#x5206;&#x699C;&#x3002;&#x540C;&#x65F6;&#x5305;&#x542B;&#x4E86;&#x7B80;&#x5355;&#x7684;&#x8DEF;&#x7531;&#x5F00;&#x53D1;&#x548C;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x3002;</p><h3 id="articleHeader3">&#x5C0F;&#x8BD5;&#x725B;&#x5200;</h3><p>&#x76F8;&#x4FE1;&#x6240;&#x6709;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x90FD;&#x538C;&#x6076;&#x8D85;&#x957F;&#x65F6;&#x95F4;&#x7684;&#x5B89;&#x88C5;&#x548C;&#x5404;&#x79CD;&#x4F9D;&#x8D56;&#x3001;&#x63D2;&#x4EF6;&#x914D;&#x7F6E;&#x3002;&#x4E0D;&#x8981;&#x62C5;&#x5FC3;&#xFF0C;Next.js &#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684; npm package &#x6700;&#x5927;&#x9650;&#x5EA6;&#x7684;&#x66FF;&#x4F60;&#x5B8C;&#x6210;&#x4E86;&#x5F88;&#x591A;&#x8017;&#x65F6;&#x4E14;&#x65E0;&#x8DA3;&#x7684;&#x5DE5;&#x4F5C;&#x3002;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Start a new project
npm init
# Install Next.js
npm install next --save
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-comment"># Start a new project</span>
<span class="hljs-built_in">npm</span> init
<span class="hljs-comment"># Install Next.js</span>
<span class="hljs-built_in">npm</span> install next --save
</code></pre><p>&#x5B89;&#x88C5;&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x542F;&#x811A;&#x672C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
   &quot;start&quot;: &quot;next&quot;
 },
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
   <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;next&quot;</span>
 },
 </code></pre><p>Next &#x5B89;&#x88C5;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x4E5F;&#x4F1A;&#x5B89;&#x88C5; React&#xFF0C;&#x6240;&#x4EE5;&#x65E0;&#x9700;&#x81EA;&#x5DF1;&#x8D39;&#x5FC3;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6240;&#x9700;&#x8981;&#x505A;&#x7684;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; pages &#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5E76;&#x5728;&#x5176;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; index.js &#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./pages/index.js

// Import React
import React from &apos;react&apos;

// Export an anonymous arrow function
// which returns the template
export default () =&gt; (
  &lt;h1&gt;This is just so easy!&lt;/h1&gt;
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// ./pages/index.js</span>

<span class="hljs-comment">// Import React</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>

<span class="hljs-comment">// Export an anonymous arrow function</span>
<span class="hljs-comment">// which returns the template</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is just so easy!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
)
</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x770B;&#x5230;&#x7ED3;&#x679C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# Start your app
npm start

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-comment"># Start your app</span>
<span class="hljs-built_in">npm</span> start

</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000010260041" src="https://static.alili.tech/img/remote/1460000010260041" alt="&#x9875;&#x9762;" title="&#x9875;&#x9762;" style="cursor:pointer;display:inline"></span></p><p>&#x9A8C;&#x8BC1;&#x4E00;&#x4E0B;&#x5B83;&#x6765;&#x81EA;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260042" src="https://static.alili.tech/img/remote/1460000010260042" alt="&#x67E5;&#x770B;&#x7F51;&#x9875;&#x6E90;&#x7801;" title="&#x67E5;&#x770B;&#x7F51;&#x9875;&#x6E90;&#x7801;" style="cursor:pointer;display:inline"></span></p><p>&#x5C31;&#x662F;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#xFF0C;&#x6E05;&#x65B0;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x624B;&#x6BB5;&#x5B9E;&#x73B0;&#x8FD9;&#x4E00;&#x5207;&#x7684;&#x8BDD;&#xFF0C;&#x9664;&#x4E86; NodeJS &#x7684;&#x79CD;&#x79CD;&#x7E41;&#x7410;&#x4E0D;&#x8BF4;&#xFF0C;webpack &#x914D;&#x7F6E;&#xFF0C;node_modules &#x4F9D;&#x8D56;&#xFF0C;babel&#x63D2;&#x4EF6;&#x7B49;&#x7B49;&#x5C31;&#x591F;&#x6298;&#x817E;&#x534A;&#x5929;&#x7684;&#x4E86;&#x3002;</p><h2 id="articleHeader4">&#x6DFB;&#x52A0; Page Head</h2><p>&#x5728; ./pages/index.js &#x6587;&#x4EF6;&#x5185;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x9875;&#x9762; head &#x6807;&#x7B7E;&#x3001;meta &#x4FE1;&#x606F;&#x3001;&#x6837;&#x5F0F;&#x8D44;&#x6E90;&#x7B49;&#x7B49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// ./pages/index.js
import React from &apos;react&apos;
// Import the Head Component
import Head from &apos;next/head&apos;

export default () =&gt; (
  &lt;div&gt;
    &lt;Head&gt;
        &lt;title&gt;League Table&lt;/title&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;initial-scale=1.0, width=device-width&quot; /&gt;
        &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/purecss@0.6.1/build/pure-min.css&quot; /&gt;
    &lt;/Head&gt;
    &lt;h1&gt;This is just so easy!&lt;/h1&gt;
  &lt;/div&gt;
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>
<span class="hljs-comment">// ./pages/index.js</span>
<span class="hljs-keyword">import</span> React from <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-comment">// Import the Head Component</span>
<span class="hljs-keyword">import</span> Head from <span class="hljs-string">&apos;next/head&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  &lt;div&gt;
    &lt;Head&gt;
        &lt;title&gt;League Table&lt;/title&gt;
        &lt;meta name=<span class="hljs-string">&quot;viewport&quot;</span> content=<span class="hljs-string">&quot;initial-scale=1.0, width=device-width&quot;</span> /&gt;
        &lt;link rel=<span class="hljs-string">&quot;stylesheet&quot;</span> href=<span class="hljs-string">&quot;https://unpkg.com/purecss@0.6.1/build/pure-min.css&quot;</span> /&gt;
    &lt;/Head&gt;
    &lt;h1&gt;This <span class="hljs-keyword">is</span> just so easy!&lt;/h1&gt;
  &lt;/div&gt;
)
</code></pre><p>&#x8FD9;&#x4E2A; head &#x5F53;&#x7136;&#x4E0D;&#x662F;&#x6307;&#x771F;&#x5B9E;&#x7684; DOM&#xFF0C;&#x5343;&#x4E07;&#x522B;&#x5FD8;&#x4E86; React &#x865A;&#x62DF; DOM &#x7684;&#x6982;&#x5FF5;&#x3002;&#x5176;&#x5B9E;&#x8FD9;&#x662F; Next &#x63D0;&#x4F9B;&#x7684; Head &#x7EC4;&#x4EF6;&#xFF0C;&#x4E0D;&#x8FC7;&#x6700;&#x7EC8;&#x4E00;&#x5B9A;&#x8FD8;&#x662F;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x4E3A;&#x771F;&#x5B9E;&#x7684; head &#x6807;&#x7B7E;&#x3002;</p><h2 id="articleHeader5">&#x53D1;&#x9001; Ajax &#x8BF7;&#x6C42;</h2><p>Next &#x8FD8;&#x63D0;&#x4F9B;&#x4E86; getInitialProps &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x652F;&#x6301;&#x5F02;&#x6B65;&#x9009;&#x9879;&#xFF0C;&#x5E76;&#x4E14;&#x662F;&#x670D;&#x52A1;&#x7AEF;/&#x5BA2;&#x6237;&#x7AEF;&#x540C;&#x6784;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; async/await &#x65B9;&#x5F0F;&#xFF0C;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x3002;&#x8BF7;&#x770B;&#x4E0B;&#x9762;&#x7684;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import Head from &apos;next/head&apos;
import axios from &apos;axios&apos;;

export default class extends React.Component {
    // Async operation with getInitialProps
    static async getInitialProps () {
        // res is assigned the response once the axios
        // async get is completed
        const res = await axios.get(&apos;http://api.football-data.org/v1/competitions/426/leagueTable&apos;);
        // Return properties
        return {data: res.data}
      }
 }
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;
<span class="hljs-keyword">import</span> <span class="hljs-type">Head</span> from <span class="hljs-symbol">&apos;next</span>/head&apos;
<span class="hljs-keyword">import</span> axios from <span class="hljs-symbol">&apos;axio</span>s&apos;;

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-comment">// Async operation with getInitialProps</span>
    static async getInitialProps () {
        <span class="hljs-comment">// res is assigned the response once the axios</span>
        <span class="hljs-comment">// async get is completed</span>
        const res = await axios.get(<span class="hljs-symbol">&apos;http</span>:<span class="hljs-comment">//api.football-data.org/v1/competitions/426/leagueTable&apos;);</span>
        <span class="hljs-comment">// Return properties</span>
        <span class="hljs-keyword">return</span> {data: res.data}
      }
 }
 </code></pre><p>&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86; axios &#x7C7B;&#x5E93;&#x6765;&#x53D1;&#x9001; HTTP &#x8BF7;&#x6C42;&#x3002;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x672A;&#x6765;&#x67D0;&#x4E2A;&#x5408;&#x9002;&#x7684;&#x65F6;&#x5019;&#xFF08;&#x8BF7;&#x6C42;&#x7ED3;&#x679C;&#x8FD4;&#x56DE;&#x65F6;&#xFF09;&#x63A5;&#x6536;&#x6570;&#x636E;&#x3002;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x5148;&#x8FDB;&#x7684; async/await&#xFF0C;&#x4EE5;&#x540C;&#x6B65;&#x7684;&#x65B9;&#x5F0F;&#x5904;&#x7406;&#xFF0C;&#x4ECE;&#x800C;&#x907F;&#x514D;&#x4E86;&#x56DE;&#x8C03;&#x5D4C;&#x5957;&#x548C; promises &#x94FE;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5C06;&#x5F02;&#x6B65;&#x83B7;&#x5F97;&#x7684;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#xFF0C;&#x5B83;&#x5C06;&#x81EA;&#x52A8;&#x6302;&#x8F7D;&#x5728; props &#x4E0A;&#xFF08;&#x6CE8;&#x610F; getInitialProps &#x65B9;&#x6CD5;&#x540D;&#xFF0C;&#x987E;&#x540D;&#x601D;&#x4E49;&#xFF09;&#xFF0C;render &#x65B9;&#x6CD5;&#x91CC;&#x4FBF;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; this.props.data &#x83B7;&#x53D6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import Head from &apos;next/head&apos;
import axios from &apos;axios&apos;;

export default class extends React.Component {
  static async getInitialProps () {
    const res = await axios.get(&apos;http://api.football-data.org/v1/competitions/426/leagueTable&apos;);
    return {data: res.data}
  }
  render () {
    return (
      &lt;div&gt;
        &lt;Head&gt;
            ......
        &lt;/Head&gt;
        &lt;div className=&quot;pure-g&quot;&gt;
            &lt;div className=&quot;pure-u-1-3&quot;&gt;&lt;/div&gt;
            &lt;div className=&quot;pure-u-1-3&quot;&gt;
              &lt;h1&gt;Barclays Premier League&lt;/h1&gt;
              &lt;table className=&quot;pure-table&quot;&gt;
                &lt;thead&gt;
                  &lt;tr&gt;
                    ......
                  &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody&gt;
                {this.props.data.standing.map((standing, i) =&gt; {
                  const oddOrNot = i % 2 == 1 ? &quot;pure-table-odd&quot; : &quot;&quot;;
                  return (
                      &lt;tr key={i} className={oddOrNot}&gt;
                        &lt;td&gt;{standing.position}&lt;/td&gt;
                        &lt;td&gt;&lt;img className=&quot;pure-img logo&quot; src={standing.crestURI}/&gt;&lt;/td&gt;
                        &lt;td&gt;{standing.points}&lt;/td&gt;
                        &lt;td&gt;{standing.goals}&lt;/td&gt;
                        &lt;td&gt;{standing.wins}&lt;/td&gt;
                        &lt;td&gt;{standing.draws}&lt;/td&gt;
                        &lt;td&gt;{standing.losses}&lt;/td&gt;
                      &lt;/tr&gt;
                    );
                })}
                &lt;/tbody&gt;
              &lt;/table&gt;
            &lt;/div&gt;
            &lt;div className=&quot;pure-u-1-3&quot;&gt;&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> Head <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/head&apos;</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">async</span> getInitialProps () {
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> axios.get(<span class="hljs-string">&apos;http://api.football-data.org/v1/competitions/426/leagueTable&apos;</span>);
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">data</span>: res.data}
  }
  render () {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Head</span>&gt;</span>
            ......
        <span class="hljs-tag">&lt;/<span class="hljs-name">Head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-g&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-u-1-3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-u-1-3&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Barclays Premier League<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-table&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                    ......
                  <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
                {this.props.data.standing.map((standing, i) =&gt; {
                  const oddOrNot = i % 2 == 1 ? &quot;pure-table-odd&quot; : &quot;&quot;;
                  return (
                      <span class="hljs-tag">&lt;<span class="hljs-name">tr</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{i}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{oddOrNot}</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{standing.position}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-img logo&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{standing.crestURI}/</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{standing.points}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{standing.goals}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{standing.wins}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{standing.draws}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>{standing.losses}<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                      <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
                    );
                })}
                <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-u-1-3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}
</span></code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x518D;&#x8BBF;&#x95EE;&#x6211;&#x4EEC;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5C31;&#x6709;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260043" src="https://static.alili.tech/img/remote/1460000010260043" alt="&#x9875;&#x9762;" title="&#x9875;&#x9762;" style="cursor:pointer"></span></p><h2 id="articleHeader6">&#x8DEF;&#x7531;&#x548C;&#x9875;&#x9762;&#x8DF3;&#x8F6C;</h2><p>&#x4E5F;&#x8BB8;&#x4F60;&#x5DF2;&#x7ECF;&#x6709;&#x6240;&#x611F;&#x77E5;&#xFF1A;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#x6700;&#x57FA;&#x672C;&#x7684;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x3002;Next &#x4E0D;&#x9700;&#x8981;&#x4EFB;&#x4F55;&#x989D;&#x5916;&#x7684;&#x8DEF;&#x7531;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#xFF0C;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x5728; pages &#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x90FD;&#x5C06;&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x9875;&#x9762;&#x3002;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A; team &#x9875;&#x9762;&#x5427;&#xFF01;&#x65B0;&#x5EFA; ./pages/details.js &#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./pages/details.js
import React from &apos;react&apos;
export default () =&gt; (
  &lt;p&gt;Coming soon. . .!&lt;/p&gt;
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// ./pages/details.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Coming soon. . .!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
)
</code></pre><p>&#x6211;&#x4EEC;&#x4F7F;&#x7528; Next &#x5DF2;&#x7ECF;&#x51C6;&#x5907;&#x597D;&#x7684;&#x7EC4;&#x4EF6; &lt;Link&gt; &#x6765;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./pages/details.js
import React from &apos;react&apos;

// Import Link from next
import Link from &apos;next/link&apos;

export default () =&gt; (
  &lt;div&gt;
      &lt;p&gt;Coming soon. . .!&lt;/p&gt;
      &lt;Link href=&quot;/&quot;&gt;&lt;a&gt;Go Home&lt;/a&gt;&lt;/Link&gt;
  &lt;/div&gt;
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// ./pages/details.js</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>

<span class="hljs-comment">// Import Link from next</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/link&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> () =&gt; (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Coming soon. . .!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span>&gt;</span>Go Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
)
</code></pre><p>&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x4E0D;&#x80FD;&#x603B;&#x662F; &#x201C;Coming soon. . .!&#x201D; &#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x8FDB;&#x884C;&#x5B8C;&#x5584;&#x4EE5;&#x5C55;&#x793A;&#x66F4;&#x591A;&#x5185;&#x5BB9;&#xFF0C;&#x901A;&#x8FC7;&#x9875;&#x9762; URL &#x7684; query id &#x53D8;&#x91CF;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x8BF7;&#x6C42;&#x5E76;&#x5C55;&#x73B0;&#x5F53;&#x524D;&#x76F8;&#x5E94;&#x961F;&#x4F0D;&#x7684;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;
import Head from &apos;next/head&apos;
import Link from &apos;next/link&apos;
import axios from &apos;axios&apos;;

export default class extends React.Component {
    static async getInitialProps ({query}) {
        // Get id from query
        const id = query.id;
        if(!process.browser) {
            // Still on the server so make a request
            const res = await axios.get(&apos;http://api.football-data.org/v1/competitions/426/leagueTable&apos;)
            return {
                data: res.data,
                // Filter and return data based on query
                standing: res.data.standing.filter(s =&gt; s.position == id)
            }
        } else {
            // Not on the server just navigating so use
            // the cache
            const bplData = JSON.parse(sessionStorage.getItem(&apos;bpl&apos;));
            // Filter and return data based on query
            return {standing: bplData.standing.filter(s =&gt; s.position == id)}
        }
    }

    componentDidMount () {
        // Cache data in localStorage if
        // not already cached
        if(!sessionStorage.getItem(&apos;bpl&apos;)) sessionStorage.setItem(&apos;bpl&apos;, JSON.stringify(this.props.data))
    }

    // . . . render method truncated
 }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>
<span class="hljs-keyword">import</span> Head <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/head&apos;</span>
<span class="hljs-keyword">import</span> Link <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;next/link&apos;</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;axios&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> <span class="hljs-keyword">async</span> getInitialProps ({query}) {
        <span class="hljs-comment">// Get id from query</span>
        <span class="hljs-keyword">const</span> id = query.id;
        <span class="hljs-keyword">if</span>(!process.browser) {
            <span class="hljs-comment">// Still on the server so make a request</span>
            <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> axios.get(<span class="hljs-string">&apos;http://api.football-data.org/v1/competitions/426/leagueTable&apos;</span>)
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">data</span>: res.data,
                <span class="hljs-comment">// Filter and return data based on query</span>
                standing: res.data.standing.filter(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.position == id)
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// Not on the server just navigating so use</span>
            <span class="hljs-comment">// the cache</span>
            <span class="hljs-keyword">const</span> bplData = <span class="hljs-built_in">JSON</span>.parse(sessionStorage.getItem(<span class="hljs-string">&apos;bpl&apos;</span>));
            <span class="hljs-comment">// Filter and return data based on query</span>
            <span class="hljs-keyword">return</span> {<span class="hljs-attr">standing</span>: bplData.standing.filter(<span class="hljs-function"><span class="hljs-params">s</span> =&gt;</span> s.position == id)}
        }
    }

    componentDidMount () {
        <span class="hljs-comment">// Cache data in localStorage if</span>
        <span class="hljs-comment">// not already cached</span>
        <span class="hljs-keyword">if</span>(!sessionStorage.getItem(<span class="hljs-string">&apos;bpl&apos;</span>)) sessionStorage.setItem(<span class="hljs-string">&apos;bpl&apos;</span>, <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.props.data))
    }

    <span class="hljs-comment">// . . . render method truncated</span>
 }
</code></pre><p>&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x6839;&#x636E; query &#x53D8;&#x91CF;&#xFF0C;&#x52A8;&#x6001;&#x5C55;&#x73B0;&#x51FA;&#x7403;&#x961F;&#x4FE1;&#x606F;&#x3002;&#x5177;&#x4F53;&#x6765;&#x770B;&#xFF0C;getInitialProps &#x65B9;&#x6CD5;&#x83B7;&#x53D6; URL query id&#xFF0C;&#x6839;&#x636E; id &#x7B5B;&#x9009;&#x51FA;&#xFF08;filter &#x65B9;&#x6CD5;&#xFF09;&#x5C55;&#x793A;&#x4FE1;&#x606F;&#x3002;&#x6709;&#x610F;&#x601D;&#x7684;&#x662F;&#xFF0C;&#x56E0;&#x4E3A;&#x4E00;&#x76F4;&#x7403;&#x961F;&#x7684;&#x4FE1;&#x606F;&#x6BD4;&#x8F83;&#x7A33;&#x5B9A;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x4F7F;&#x7528;&#x4E86; sessionStorage &#x8FDB;&#x884C;&#x5B58;&#x50A8;&#x3002;</p><p>&#x5B8C;&#x6574;&#x7684; render &#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// . . . truncated

export default class extends React.Component {
    // . . . truncated
    render() {

        const detailStyle = {
            ul: {
                marginTop: &apos;100px&apos;
            }
        }

        return  (
             &lt;div&gt;
                &lt;Head&gt;
                    &lt;title&gt;League Table&lt;/title&gt;
                    &lt;meta name=&quot;viewport&quot; content=&quot;initial-scale=1.0, width=device-width&quot; /&gt;
                    &lt;link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/purecss@0.6.1/build/pure-min.css&quot; /&gt;
                &lt;/Head&gt;

                &lt;div className=&quot;pure-g&quot;&gt;
                    &lt;div className=&quot;pure-u-8-24&quot;&gt;&lt;/div&gt;
                    &lt;div className=&quot;pure-u-4-24&quot;&gt;
                        &lt;h2&gt;{this.props.standing[0].teamName}&lt;/h2&gt;
                        &lt;img src={this.props.standing[0].crestURI} className=&quot;pure-img&quot;/&gt;
                        &lt;h3&gt;Points: {this.props.standing[0].points}&lt;/h3&gt;
                    &lt;/div&gt;
                    &lt;div className=&quot;pure-u-12-24&quot;&gt;
                        &lt;ul style={detailStyle.ul}&gt;
                            &lt;li&gt;&lt;strong&gt;Goals&lt;/strong&gt;: {this.props.standing[0].goals}&lt;/li&gt;
                            &lt;li&gt;&lt;strong&gt;Wins&lt;/strong&gt;: {this.props.standing[0].wins}&lt;/li&gt;
                            &lt;li&gt;&lt;strong&gt;Losses&lt;/strong&gt;: {this.props.standing[0].losses}&lt;/li&gt;
                            &lt;li&gt;&lt;strong&gt;Draws&lt;/strong&gt;: {this.props.standing[0].draws}&lt;/li&gt;
                            &lt;li&gt;&lt;strong&gt;Goals Against&lt;/strong&gt;: {this.props.standing[0].goalsAgainst}&lt;/li&gt;
                            &lt;li&gt;&lt;strong&gt;Goal Difference&lt;/strong&gt;: {this.props.standing[0].goalDifference}&lt;/li&gt;
                            &lt;li&gt;&lt;strong&gt;Played&lt;/strong&gt;: {this.props.standing[0].playedGames}&lt;/li&gt;
                        &lt;/ul&gt;
                        &lt;Link href=&quot;/&quot;&gt;Home&lt;/Link&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
             &lt;/div&gt;
            )
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">// . . . truncated

export default class extends React.Component </span><span class="hljs-template-variable">{
    // . . . truncated
    render() {

        const detailStyle = {
            ul: {
                marginTop: &apos;100px&apos;
            }</span><span class="xml">
        }

        return  (
             <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Head</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>League Table<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;initial-scale=1.0, width=device-width&quot;</span> /&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;https://unpkg.com/purecss@0.6.1/build/pure-min.css&quot;</span> /&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">Head</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-g&quot;</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-u-8-24&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-u-4-24&quot;</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">{this.props.standing[0].teamName}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=</span></span><span class="hljs-template-variable">{this.props.standing[0].crestURI}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-img&quot;</span>/&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Points: </span><span class="hljs-template-variable">{this.props.standing[0].points}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;pure-u-12-24&quot;</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">style</span>=</span></span><span class="hljs-template-variable">{detailStyle.ul}</span><span class="xml"><span class="hljs-tag">&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Goals<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>: </span><span class="hljs-template-variable">{this.props.standing[0].goals}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Wins<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>: </span><span class="hljs-template-variable">{this.props.standing[0].wins}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Losses<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>: </span><span class="hljs-template-variable">{this.props.standing[0].losses}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Draws<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>: </span><span class="hljs-template-variable">{this.props.standing[0].draws}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Goals Against<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>: </span><span class="hljs-template-variable">{this.props.standing[0].goalsAgainst}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Goal Difference<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>: </span><span class="hljs-template-variable">{this.props.standing[0].goalDifference}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>Played<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>: </span><span class="hljs-template-variable">{this.props.standing[0].playedGames}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            )
    }
}
</span></code></pre><p>&#x6CE8;&#x610F;&#x4E0B;&#x9762;&#x622A;&#x56FE;&#x4E2D;&#xFF0C;&#x540C;&#x4E00;&#x9875;&#x9762;&#x4E0D;&#x540C; query &#x503C;&#xFF0C;&#x5206;&#x522B;&#x5C55;&#x793A;&#x4E86;&#x51A0;&#x519B;?&#x5207;&#x5C14;&#x897F;&#x548C;&#x66FC;&#x8054;&#x7684;&#x4FE1;&#x606F;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260044" src="https://static.alili.tech/img/remote/1460000010260044" alt="&#x5207;&#x5C14;&#x897F;" title="&#x5207;&#x5C14;&#x897F;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260045" src="https://static.alili.tech/img/remote/1460000010260045" alt="&#x66FC;&#x8054;" title="&#x66FC;&#x8054;" style="cursor:pointer;display:inline"></span></p><p>&#x522B;&#x5FD8;&#x4E86;&#x6211;&#x4EEC;&#x7684;&#x4E3B;&#x9875;&#xFF08;&#x6392;&#x884C;&#x699C;&#x9875;&#x9762;&#xFF09;index.js &#x4E2D;&#xFF0C;&#x4E5F;&#x8981;&#x4F7F;&#x7528;&#x76F8;&#x5E94;&#x7684; sessionStorage &#x903B;&#x8F91;&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x5728; render &#x65B9;&#x6CD5;&#x91CC;&#x52A0;&#x5165;&#x4E00;&#x6761;&#x94FE;&#x63A5;&#x5230;&#x8BE6;&#x60C5;&#x9875;&#x7684; &lt;Link&gt;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;td&gt;&lt;Link href={`/details?id=${standing.position}`}&gt;More...&lt;/Link&gt;&lt;/td&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;td&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{</span>`/<span class="hljs-attr">details</span>?<span class="hljs-attr">id</span>=<span class="hljs-string">${standing.position}</span>`}&gt;</span>More...<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></span>

</code></pre><h2 id="articleHeader7">&#x9519;&#x8BEF;&#x9875;&#x9762;</h2><p>&#x5728; Next &#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; error.js &#x6587;&#x4EF6;&#x5B9A;&#x4E49;&#x9519;&#x8BEF;&#x9875;&#x9762;&#x3002;&#x5728; ./pages &#x4E0B;&#x65B0;&#x5EFA; error.js&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./pages/_error.js
import React from &apos;react&apos;

export default class Error extends React.Component {
  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : null)
    return { statusCode }
  }

  render () {
    return (
      &lt;p&gt;{
        this.props.statusCode
        ? `An error ${this.props.statusCode} occurred on server`
        : &apos;An error occurred on client&apos;
      }&lt;/p&gt;
    )
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-comment">// ./pages/_error.js</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;

export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Error</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  static getInitialProps ({ res, xhr }) {
    const statusCode = res ? res.statusCode : (xhr ? xhr.status : <span class="hljs-literal">null</span>)
    <span class="hljs-keyword">return</span> { statusCode }
  }

  render () {
    <span class="hljs-keyword">return</span> (
      &lt;p&gt;{
        <span class="hljs-keyword">this</span>.props.statusCode
        ? `<span class="hljs-type">An</span> error ${<span class="hljs-keyword">this</span>.props.statusCode} occurred on server`
        : <span class="hljs-symbol">&apos;An</span> error occurred on client&apos;
      }&lt;/p&gt;
    )
  }
}
</code></pre><p>&#x5F53;&#x4F20;&#x7EDF;&#x60C5;&#x51B5;&#x4E0B;&#x9875;&#x9762;404&#x65F6;&#xFF0C;&#x5F97;&#x5230;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260046" src="https://static.alili.tech/img/remote/1460000010260046" alt="404&#x9875;&#x9762;" title="404&#x9875;&#x9762;" style="cursor:pointer"></span></p><p>&#x5728;&#x6211;&#x4EEC;&#x8BBE;&#x7F6E; _ error.js &#x4E4B;&#x540E;&#xFF0C;&#x4FBF;&#x6709;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000010260047" src="https://static.alili.tech/img/remote/1460000010260047" alt="&#x81EA;&#x5B9A;&#x4E49;&#x9519;&#x8BEF;&#x9875;&#x9762;" title="&#x81EA;&#x5B9A;&#x4E49;&#x9519;&#x8BEF;&#x9875;&#x9762;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader8">&#x603B;&#x7ED3;</h2><p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x6613; demo&#xFF0C;&#x53EA;&#x662F;&#x4ECB;&#x7ECD;&#x4E86;<strong>&#x6700;&#x57FA;&#x672C;</strong>&#x7684; Next.JS &#x642D;&#x5EFA; React &#x540C;&#x6784;&#x5E94;&#x7528;&#x7684;&#x57FA;&#x672C;&#x6B65;&#x9AA4;&#x3002;</p><p>&#x60F3;&#x60F3;&#x4F60;&#x662F;&#x5426;&#x538C;&#x70E6;&#x4E86; webpack &#x607C;&#x4EBA;&#x7684;&#x914D;&#x7F6E;&#xFF1F;&#x662F;&#x5426;&#x5BF9;&#x4E8E; Babel &#x5404;&#x79CD;&#x63D2;&#x4EF6;&#x4E91;&#x91CC;&#x96FE;&#x91CC;&#xFF1F;<br><strong>&#x4F7F;&#x7528; Next.js&#xFF0C;&#x7B80;&#x5355;&#x3001;&#x6E05;&#x65B0;&#x800C;&#x53C8;&#x8BBE;&#x8BA1;&#x826F;&#x597D;&#x3002;&#x8FD9;&#x4E5F;&#x662F;&#x5B83;&#x5728;&#x63A8;&#x51FA;&#x77ED;&#x77ED;&#x65F6;&#x95F4;&#x4EE5;&#x6765;&#xFF0C;&#x4FBF;&#x8FC5;&#x901F;&#x8D70;&#x7EA2;&#x7684;&#x539F;&#x56E0;&#x4E4B;&#x4E00;&#x3002;</strong></p><p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;Next &#x8FD8;&#x6709;&#x975E;&#x5E38;&#x591A;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x975E;&#x5E38;&#x591A;&#x7684;&#x5148;&#x8FDB;&#x7406;&#x5FF5;&#x53EF;&#x4EE5;&#x5E94;&#x7528;&#x3002;</p><ul><li><p>&#x6BD4;&#x5982; &lt;Link&gt; &#x642D;&#x914D; prefetch&#xFF0C;&#x9884;&#x5148;&#x8BF7;&#x6C42;&#x8D44;&#x6E90;&#xFF1B;</p></li><li><p>&#x518D;&#x5982;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;&#xFF08;Next.js &#x652F;&#x6301; TC39 dynamic import proposal&#xFF09;&#xFF0C;&#x4ECE;&#x800C;&#x51CF;&#x5C11;&#x9996;&#x6B21; bundle size&#xFF1B;</p></li><li><p>&#x867D;&#x7136;&#x5B83;&#x66FF;&#x6211;&#x4EEC;&#x5C01;&#x88C5;&#x597D;&#x4E86; Webpack&#x3001;Babel &#x7B49;&#x5DE5;&#x5177;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x53C8;&#x80FD; customizing&#xFF0C;&#x6839;&#x636E;&#x9700;&#x8981;&#x81EA;&#x5B9A;&#x4E49;&#x3002;</p></li></ul><p>&#x6700;&#x540E;&#xFF0C;&#x5BF9;&#x4E8E;&#x8FD9;&#x4E9B;&#x672C;&#x6587;&#x7AE0;&#x6CA1;&#x6709;&#x6F14;&#x793A;&#x5230;&#x7684;&#x529F;&#x80FD;&#x662F;&#x5426;&#x6709;&#x4E9B;&#x624B;&#x75D2;&#xFF1F;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x8BFB;&#x8005;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x672C;&#x6587; demo &#x7684;<a href="https://github.com/HOUCe/server-side-react-football" rel="nofollow noreferrer" target="_blank">Github&#x9879;&#x76EE;&#x5730;&#x5740;</a>&#xFF0C;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x5C1D;&#x8BD5;&#x8D77;&#x6765;&#x5427;&#xFF5E;</p><p>&#x672C;&#x6587;&#x610F;&#x8BD1;&#x4E86;<a href="https://scotch.io/tutorials/react-universal-with-next-js-server-side-react" rel="nofollow noreferrer" target="_blank">Chris Nwamba&#x7684;&#xFF1A;React Universal with Next.js: Server-side React &#x4E00;&#x6587;&#xFF0C;</a>&#x5E76;&#x5BF9;&#x539F;&#x6587;&#x8FDB;&#x884C;&#x4E86;&#x5347;&#x7EA7;&#xFF0C;&#x517C;&#x5BB9;&#x4E86;&#x6700;&#x65B0;&#x7684; Next &#x8BBE;&#x8BA1;&#x3002;</p><p>&#x6211;&#x7684;&#x5176;&#x4ED6;&#x5173;&#x4E8E; React &#x6587;&#x7AE0;&#xFF1A;</p><ul><li><p><a href="http://www.jianshu.com/p/49029b49f2b4" rel="nofollow noreferrer" target="_blank">&#x505A;&#x51FA;Uber&#x79FB;&#x52A8;&#x7F51;&#x9875;&#x7248;&#x8FD8;&#x4E0D;&#x591F; &#x6781;&#x81F4;&#x6027;&#x80FD;&#x6253;&#x9020;&#x624D;&#x89C1;&#x771F;&#x7AE0;</a></p></li><li><p><a href="http://www.jianshu.com/p/7a56ac1de2a8" rel="nofollow noreferrer" target="_blank">&#x89E3;&#x6790;Twitter&#x524D;&#x7AEF;&#x67B6;&#x6784; &#x5B66;&#x4E60;&#x590D;&#x6742;&#x573A;&#x666F;&#x6570;&#x636E;&#x8BBE;&#x8BA1;</a></p></li><li><p><a href="http://www.jianshu.com/p/83c86dd0802d" rel="nofollow noreferrer" target="_blank">React Conf 2017 &#x5E72;&#x8D27;&#x603B;&#x7ED3;1: React + ES next = &#x2665;</a></p></li><li><p><a href="http://www.jianshu.com/p/cde3cf7e2760" rel="nofollow noreferrer" target="_blank">React+Redux&#x6253;&#x9020;&#x201C;NEWS EARLY&#x201D;&#x5355;&#x9875;&#x5E94;&#x7528; &#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x7406;&#x89E3;&#x6700;&#x524D;&#x6CBF;&#x6280;&#x672F;&#x6808;&#x771F;&#x8C1B;</a></p></li><li><p><a href="http://www.jianshu.com/p/8e28be0e7ab1" rel="nofollow noreferrer" target="_blank">&#x4E00;&#x4E2A;react+redux&#x5DE5;&#x7A0B;&#x5B9E;&#x4F8B;</a></p></li></ul><p>Happy Coding!</p><p>PS:<br>&#x4F5C;&#x8005;<a href="https://github.com/HOUCe" rel="nofollow noreferrer" target="_blank">Github&#x4ED3;&#x5E93;</a> &#x548C; <a href="https://www.zhihu.com/people/lucas-hc/answers" rel="nofollow noreferrer" target="_blank">&#x77E5;&#x4E4E;&#x95EE;&#x7B54;&#x94FE;&#x63A5;</a><br>&#x6B22;&#x8FCE;&#x5404;&#x79CD;&#x5F62;&#x5F0F;&#x4EA4;&#x6D41;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 服务端渲染如此轻松 从零开始构建前后端应用

## 原文链接
[https://segmentfault.com/a/1190000010260036](https://segmentfault.com/a/1190000010260036)


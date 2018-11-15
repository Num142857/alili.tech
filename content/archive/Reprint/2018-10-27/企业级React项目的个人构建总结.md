---
title: 企业级React项目的个人构建总结
reprint: true
categories: reprint
abbrlink: 54af736c
date: 2018-10-27 02:30:17
---

{{% raw %}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x8DDD;&#x79BB;&#x4E0A;&#x7BC7;&#x6587;&#x7AE0;&#x5DF2;&#x7ECF;&#x597D;&#x957F;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x661F;&#x671F;&#x516C;&#x53F8;&#x6D3E;&#x9A7B;&#x5230;&#x4EAC;&#x4E1C;&#x65B9;&#x8FD9;&#x8FB9;&#x51FA;&#x5DEE;&#x8D1F;&#x8D23;&#x5165;&#x9A7B;&#x9879;&#x76EE;&#x56E2;&#x961F;&#x7684;&#x524D;&#x7AEF;&#x5DE5;&#x4F5C;&#x3002;&#x8FD9;&#x6BB5;&#x65F6;&#x95F4;&#x4ECE;&#x96F6;&#x642D;&#x5EFA;&#x4E00;&#x4E0B;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#xFF0C;&#x8FD9;&#x6B21;&#x7ED9;&#x7684;&#x65F6;&#x95F4;&#x6BD4;&#x8F83;&#x5145;&#x88D5;&#xFF0C;&#x601D;&#x8003;&#x7684;&#x4E5F;&#x6BD4;&#x8F83;&#x591A;&#x3002;&#x4EE5;&#x524D;&#x4E5F;&#x5E38;&#x6709;&#x642D;&#x8FC7;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#xFF0C;&#x4F46;&#x662F;&#x7ED9;&#x7684;&#x65F6;&#x95F4;&#x90FD;&#x6BD4;&#x8F83;&#x7D27;&#xFF0C;&#x56E0;&#x6B64;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x90FD;&#x5FFD;&#x7565;&#x6389;&#x4E86;&#x3002;&#x8FD9;&#x6B21;&#x6B63;&#x597D;&#x5BF9;&#x4EE5;&#x524D;&#x7684;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x4F18;&#x5316;&#xFF0C;&#x5E76;&#x603B;&#x7ED3;&#x4E86;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#x5206;&#x60F3;&#x7ED9;&#x5927;&#x5BB6;&#x3002;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x6709;&#x66F4;&#x597D;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x4EA4;&#x6D41;&#x3002;</p><p><strong>&#x6E29;&#x99A8;&#x63D0;&#x793A;&#xFF1A;</strong> &#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x662F;&#x4EE5;PC&#x7AEF;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x4E3A;&#x89C6;&#x89D2;&#xFF0C;&#x79FB;&#x52A8;&#x7AEF;&#x524D;&#x7AEF;&#x9879;&#x76EE;&#x5E76;&#x4E0D;&#x5B8C;&#x5168;&#x9002;&#x7528;&#x3002;&#x8FD9;&#x70B9;&#x5404;&#x4F4D;&#x5C0F;&#x4F19;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x4E0B;&#x3002;</p><h1 id="articleHeader1">&#x9879;&#x76EE;&#x5730;&#x5740;</h1><blockquote><strong><a href="https://github.com/ruichengping/react-webpack-pc" rel="nofollow noreferrer" target="_blank">https://github.com/ruichengpi...</a></strong></blockquote><p>&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#x505A;&#x7684;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#x7684;&#x6A21;&#x677F;&#x5DE5;&#x5177;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x505A;&#x4E00;&#x4E9B;&#x6539;&#x53D8;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbftef?w=1834&amp;h=594" src="https://static.alili.tech/img/bVbftef?w=1834&amp;h=594" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>package.json&#x4E2D;&#x4E0A;&#x56FE;&#x7EA2;&#x8272;&#x8FB9;&#x6846;&#x91CC;&#x7684;&#x90E8;&#x5206;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E00;&#x4E0B;&#xFF0C;&#x4E0D;&#x7136;&#x8FD0;&#x884C;&#x4F1A;&#x62A5;<strong>&lt;Invalid name: &quot;{{name}}&gt;&quot;</strong>&#x7684;&#x9519;&#x8BEF;&#x3002;</p><hr><p><strong>&#x53E6;&#x5916;&#x9644;&#x4E0A;&#x6211;&#x81EA;&#x5DF1;&#x505A;&#x7684;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#x7684;&#x5730;&#x5740;&#x4F9B;&#x5927;&#x5BB6;&#x4EA4;&#x6D41;&#x5B66;&#x4E60;&#xFF1A;</strong></p><blockquote><strong><a href="https://github.com/ruichengping/asuna-cli" rel="nofollow noreferrer" target="_blank">https://github.com/ruichengpi...</a></strong></blockquote><h1 id="articleHeader2">&#x9879;&#x76EE;&#x8BF4;&#x660E;</h1><p><span class="img-wrap"><img data-src="/img/bVbfvuq?w=552&amp;h=682" src="https://static.alili.tech/img/bVbfvuq?w=552&amp;h=682" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><blockquote>&#x4EE5;&#x4E0A;&#x662F;&#x793A;&#x4F8B;&#x9879;&#x76EE;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5C06;&#x9010;&#x4E00;&#x8FDB;&#x884C;&#x5206;&#x6790;**</blockquote><h2 id="articleHeader3">build</h2><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x653E;&#x4E86;&#x4E00;&#x4E9B;&#x4E0E;webpack&#x6253;&#x5305;&#x7684;&#x76F8;&#x5173;&#x6587;&#x4EF6;&#x3002;</p><ul><li><strong>build.js</strong> ---- webpack&#x6253;&#x5305;&#x811A;&#x672C;&#xFF0C;&#x7528;&#x4E8E;&#x6784;&#x5EFA;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;&#x5305;</li><li><strong>check-versions.js</strong> ---- &#x4E3B;&#x8981;&#x68C0;&#x6D4B;&#x5F53;&#x524D;&#x6253;&#x5305;&#x73AF;&#x5883;&#x7684;node&#x4EE5;&#x53CA;npm&#x7684;&#x7248;&#x672C;&#x662F;&#x5426;&#x7B26;&#x5408;&#x8981;&#x6C42;</li><li><strong>utils.js</strong> ---- webpack&#x6253;&#x5305;&#x6240;&#x9700;&#x8981;&#x7684;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x5E93;</li><li><strong>webpack.base.conf.js</strong> ---- webpack&#x7684;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x914D;&#x7F6E;&#xFF0C;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x7684;webpack&#x914D;&#x7F6E;&#x90FD;&#x662F;&#x57FA;&#x4E8E;&#x6B64;</li><li><strong>webpack.dev.conf.js</strong> ---- &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;webpack&#x914D;&#x7F6E;</li><li><strong>webpack.prod.conf.js</strong> ---- &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;webpack&#x914D;&#x7F6E;</li></ul><p>&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x7684;webpack&#x914D;&#x7F6E;&#x6211;&#x662F;&#x5728;vue-cli&#x7684;&#x9879;&#x76EE;&#x4E0A;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x4E8E;React&#x7684;&#x9879;&#x76EE;&#x6784;&#x5EFA;&#x3002;&#x76EE;&#x524D;&#x53EA;&#x8981;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x8FD9;&#x4E24;&#x4E2A;&#x73AF;&#x5883;&#xFF0C;&#x53EF;&#x80FD;&#x4E00;&#x4E9B;&#x516C;&#x53F8;&#x6709;&#x591A;&#x4E2A;&#x73AF;&#x5883;&#xFF0C;&#x6BCF;&#x4E2A;&#x73AF;&#x5883;&#x4E0B;webpack&#x7684;&#x914D;&#x7F6E;&#x8FD8;&#x4E0D;&#x540C;&#xFF0C;&#x6B64;&#x65F6;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x540D;&#x683C;&#x5F0F;&#x4E3A;&#x201C;<strong>webpack.&lt;&#x73AF;&#x5883;&#x540D;&gt;.conf.js</strong>&#x201D;&#x7684;webpack&#x914D;&#x7F6E;&#x4F7F;&#x7528;&#x3002;<strong>webpack.base.conf.js</strong>&#x91CC;&#x9762;&#x6709;&#x4E00;&#x4E9B;&#x57FA;&#x672C;&#x914D;&#x7F6E;&#x6BD4;&#x5982;<strong>rules</strong>&#x3001;<strong>input</strong>&#x3001;<strong>output</strong>&#x7684;&#x7B49;&#x914D;&#x7F6E;&#xFF0C;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x6BCF;&#x4E2A;&#x73AF;&#x5883;&#x4E0B;&#x8FD9;&#x4E9B;&#x5927;&#x81F4;&#x90FD;&#x662F;&#x76F8;&#x540C;&#xFF0C;&#x4E00;&#x4E9B;&#x4E0D;&#x540C;&#x4E4B;&#x5904;&#x53EF;&#x4EE5;&#x7528;<strong>webpack-merge</strong>&#x63D2;&#x4EF6;&#x8FDB;&#x884C;&#x5408;&#x5E76;&#x3002;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x5927;&#x591A;&#x6570;&#x9879;&#x76EE;&#x6765;&#x8BF4;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x548C;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E24;&#x4E2A;webpack&#x914D;&#x7F6E;&#x8DB3;&#x591F;&#x4E86;&#x3002;</p><h2 id="articleHeader4">config</h2><p>&#x8FD9;&#x91CC;&#x5B58;&#x653E;&#x7740;&#x4E0D;&#x540C;&#x73AF;&#x5883;webpack&#x6240;&#x9700;&#x8981;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#x3002;</p><ul><li><strong>dev.env.js</strong> ---- &#x5411;&#x5916;&#x66B4;&#x9732;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E0B;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;<strong>NODE_ENV</strong></li><li><strong>index.js</strong> ---- &#x5B58;&#x653E;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;</li><li><strong>prod.env.js</strong> ---- &#x5411;&#x5916;&#x66B4;&#x9732;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E0B;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;<strong>NODE_ENV</strong></li></ul><p>&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x518D;&#x52A0;&#x4E00;&#x4E2A;&#x73AF;&#x5883;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x540D;&#x4E3A;&#x201C;&lt;&#x73AF;&#x5883;&#x540D;&gt;.env.js&#x201D;&#x5E76;&#x5411;&#x5916;&#x66B4;&#x9732;&#x73AF;&#x5883;&#x53D8;&#x91CF;<strong>NODE_ENV</strong>&#xFF0C;&#x7136;&#x540E;&#x5728;index.js&#x4E2D;&#x5BFC;&#x5165;&#xFF0C;&#x8FDB;&#x884C;&#x76F8;&#x5173;&#x53C2;&#x6570;&#x8BBE;&#x7F6E;&#x3002;</p><h2 id="articleHeader5">mock</h2><p>&#x8FD9;&#x91CC;&#x662F;&#x7528;&#x6765;&#x505A;&#x63A5;&#x53E3;&#x7684;mock&#x7684;&#xFF0C;&#x53EF;&#x80FD;&#x5F88;&#x591A;&#x516C;&#x53F8;&#x90FD;&#x4E0D;&#x592A;&#x7528;&#xFF0C;&#x6211;&#x5728;&#x5DE5;&#x4F5C;&#x4E5F;&#x5F88;&#x5C11;&#x53BB;mock&#x3002;&#x8FD9;&#x91CC;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x7684;&#x63A5;&#x53E3;mock&#x601D;&#x8DEF;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x9009;&#x62E9;<strong>mockjs</strong>&#x52A0;&#x4E0A;<strong>json-server</strong>&#x7684;&#x7EC4;&#x5408;&#x3002;&#x4E8C;&#x8005;&#x5177;&#x4F53;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5176;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x3002;</p><ul><li><strong>api</strong> ---- &#x5B58;&#x653E;&#x4E0D;&#x540C;api&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;</li><li><strong>index.js</strong> ---- json-server&#x7684;&#x4E3B;&#x6587;&#x4EF6;</li><li><strong>routes.json</strong> ---- &#x8DEF;&#x7531;&#x7684;&#x6620;&#x5C04;</li></ul><p>package.json&#x6211;&#x914D;&#x7F6E;&#x4E00;&#x4E2A;script&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;mock&quot;: &quot;json-server mock/index.js  --port 3000 --routes mock/routes.json&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code style="word-break:break-word;white-space:initial"> <span class="hljs-string">&quot;mock&quot;</span>: <span class="hljs-string">&quot;json-server mock/index.js  --port 3000 --routes mock/routes.json&quot;</span></code></pre><p>&#x63A7;&#x5236;&#x53F0;&#x6267;&#x884C;&#x201C;npm run mock&#x201C;&#x5373;&#x53EF;&#x3002;</p><h2 id="articleHeader6">src</h2><h3 id="articleHeader7">api</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from &apos;lodash&apos;
import http from &apos;../utils/http&apos;

const API_URL={
  fetchUserInfo:{
    method:&apos;GET&apos;,
    url:&apos;/api/user&apos;
  },
  fetchAuthorInfo:{
    method:&apos;GET&apos;,
    url:&apos;/api/author&apos;
  }
}

const API = {}
_.keys(API_URL).forEach(key=&gt;{
  const item = API_URL[key]
  switch(item.method){
    case &apos;GET&apos;:
      API[key]=function(params){
        return http.get(item.url,params)
      }
      break;
    case &apos;POST&apos;:
      API[key]=function(params){
        return http.post(item.url,params)
      }
      break;
    case &apos;DELETE&apos;:
      API[key]=function(params){
        return http.delete(item.url,params)
      }
      break;
    default:
      API[key]=function(params){
        return http.get(item.url,params)
      }
  } 
})

export default API" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash&apos;</span>
<span class="hljs-keyword">import</span> http <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../utils/http&apos;</span>

<span class="hljs-keyword">const</span> API_URL={
  <span class="hljs-attr">fetchUserInfo</span>:{
    <span class="hljs-attr">method</span>:<span class="hljs-string">&apos;GET&apos;</span>,
    <span class="hljs-attr">url</span>:<span class="hljs-string">&apos;/api/user&apos;</span>
  },
  <span class="hljs-attr">fetchAuthorInfo</span>:{
    <span class="hljs-attr">method</span>:<span class="hljs-string">&apos;GET&apos;</span>,
    <span class="hljs-attr">url</span>:<span class="hljs-string">&apos;/api/author&apos;</span>
  }
}

<span class="hljs-keyword">const</span> API = {}
_.keys(API_URL).forEach(<span class="hljs-function"><span class="hljs-params">key</span>=&gt;</span>{
  <span class="hljs-keyword">const</span> item = API_URL[key]
  <span class="hljs-keyword">switch</span>(item.method){
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;GET&apos;</span>:
      API[key]=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>)</span>{
        <span class="hljs-keyword">return</span> http.get(item.url,params)
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;POST&apos;</span>:
      API[key]=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>)</span>{
        <span class="hljs-keyword">return</span> http.post(item.url,params)
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;DELETE&apos;</span>:
      API[key]=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>)</span>{
        <span class="hljs-keyword">return</span> http.delete(item.url,params)
      }
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>:
      API[key]=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">params</span>)</span>{
        <span class="hljs-keyword">return</span> http.get(item.url,params)
      }
  } 
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> API</code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7528;&#x6765;&#x653E;&#x7F6E;api&#x7684;&#x63A5;&#x53E3;&#x5730;&#x5740;&#xFF0C;&#x4E3A;&#x4E86;&#x540E;&#x7EED;&#x7684;&#x63A5;&#x53E3;&#x7EF4;&#x62A4;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x4F7F;&#x7528;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x5199;&#x6B7B;&#x63A5;&#x53E3;&#x5730;&#x5740;&#xFF0C;&#x800C;&#x662F;&#x5C06;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x5C01;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;&#x901A;&#x8FC7;&#x5BF9;&#x63A5;&#x53E3;&#x7684;&#x7EDF;&#x4E00;&#x7EF4;&#x62A4;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x505A;&#x5230;&#x5728;&#x6267;&#x884C;&#x4FEE;&#x6539;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x3001;&#x4FEE;&#x6539;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;&#x3001;&#x65B0;&#x589E;&#x63A5;&#x53E3;&#x7B49;&#x7B49;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x5C31;&#x4E0D;&#x7528;&#x5728;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x91CC;&#x5230;&#x5904;&#x627E;&#x4E86;&#xFF0C;&#x53EA;&#x8981;&#x7EF4;&#x62A4;&#x597D;API_URL&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5373;&#x53EF;&#x3002;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import API from &apos;@/api&apos;
//params&#x4E3A;&#x8BF7;&#x6C42;&#x53C2;&#x6570;
API.fetchUserInfo(params).then(response=&gt;{
    //response&#x4E3A;&#x8FD4;&#x56DE;&#x503C;
    ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> API <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/api&apos;</span>
<span class="hljs-comment">//params&#x4E3A;&#x8BF7;&#x6C42;&#x53C2;&#x6570;</span>
API.fetchUserInfo(params).then(<span class="hljs-function"><span class="hljs-params">response</span>=&gt;</span>{
    <span class="hljs-comment">//response&#x4E3A;&#x8FD4;&#x56DE;&#x503C;</span>
    ...
})</code></pre><h3 id="articleHeader8">assets</h3><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F1A;&#x653E;&#x9879;&#x76EE;&#x7684;&#x6240;&#x9700;&#x8981;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#xFF0C;&#x8FD9;&#x4E9B;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x90FD;&#x662F;&#x505A;&#x56FE;&#x6807;&#x7684;&#xFF0C;&#x90FD;&#x6BD4;&#x8F83;&#x5C0F;&#x3002;webpack&#x4F1A;&#x5C06;&#x5176;&#x8F6C;&#x5316;&#x6210;<strong>BASE64</strong>&#x53BB;&#x4F7F;&#x7528;&#x3002;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x60F3;&#x4EE5;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4F7F;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;static&#x76EE;&#x5F55;&#x4E0B;&#x5B58;&#x653E;&#x56FE;&#x7247;&#x8D44;&#x6E90;&#x3002;</p><h3 id="articleHeader9">components</h3><p>&#x8FD9;&#x91CC;&#x5B58;&#x653E;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x6240;&#x7528;&#x5230;&#x7684;&#x516C;&#x5171;&#x7EC4;&#x4EF6;&#x3002;&#x5B9A;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x8981;&#x6C42;&#x662F;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x6587;&#x4EF6;&#x5939;&#x540D;&#x4E3A;&#x7EC4;&#x4EF6;&#x540D;&#xFF0C;&#x53E6;&#x5916;&#x5728;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x65B0;&#x5EFA;index.jsx&#x548C;style.scss&#x6587;&#x4EF6;&#x3002;&#x4F8B;&#x5982;&#x505A;&#x4E00;&#x4E2A;HelloWorld&#x7EC4;&#x4EF6;&#xFF0C;&#x5219;&#x5E94;&#x8BE5;&#x662F;&#x5982;&#x4E0B;&#x7ED3;&#x6784;&#x3002;</p><p><strong>HelloWorld</strong></p><ul><li>index.jsx</li><li>style.scss //&#x5B58;&#x653E;&#x7EC4;&#x4EF6;&#x7684;&#x6837;&#x5F0F;</li></ul><p><strong>index.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import &apos;./style.scss&apos;;
class HelloWorld extends React.PureComponent{
  render(){
    return (
      &lt;h4 className=&quot;u-text&quot;&gt;Hello World&lt;/h4&gt;
    )
  }
}
export default HelloWorld;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;;
<span class="hljs-keyword">import</span> &apos;./style.scss&apos;;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloWorld</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span></span>{
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;h4 className=<span class="hljs-string">&quot;u-text&quot;</span>&gt;<span class="hljs-type">Hello</span> <span class="hljs-type">World</span>&lt;/h4&gt;
    )
  }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">HelloWorld</span>;</code></pre><p><strong>style.scss</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".u-text{
  color: red;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.u-text</span>{
  <span class="hljs-attribute">color</span>: red;
}</code></pre><h3 id="articleHeader10">layouts</h3><p>&#x8FD9;&#x91CC;&#x5B58;&#x653E;&#x7740;&#x5E03;&#x5C40;&#x6587;&#x4EF6;&#x3002;&#x5173;&#x4E8E;&#x8FD9;&#x4E2A;&#x5E03;&#x5C40;&#x6587;&#x4EF6;&#x6211;&#x662F;&#x8FD9;&#x4E48;&#x53BB;&#x5B9A;&#x4E49;&#x5B83;&#x7684;&#xFF0C;&#x6211;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x6709;&#x4E00;&#x4E9B;&#x9875;&#x9762;&#x4ED6;&#x4EEC;&#x7684;&#x67D0;&#x4E00;&#x90E8;&#x5206;&#x90FD;&#x662F;&#x76F8;&#x540C;&#xFF0C;&#x65E9;&#x4E4B;&#x524D;&#x53EF;&#x80FD;&#x5927;&#x5BB6;&#x53EF;&#x80FD;&#x4F1A;&#x5728;&#x4E00;&#x4E2A;React&#x7EC4;&#x4EF6;&#x52A0;&lt;Switch&gt;&#x548C;&lt;Route&gt;&#x53BB;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x529F;&#x80FD;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x5E72;&#xFF0C;&#x6CA1;&#x6BDB;&#x75C5;&#x3002;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x6709;&#x4E00;&#x4E2A;&#x4E0D;&#x597D;&#x70B9;&#x5C31;&#x662F;&#x4F60;&#x7684;&#x8DEF;&#x7531;&#x6CA1;&#x6CD5;&#x505A;&#x7EDF;&#x4E00;&#x7684;&#x7BA1;&#x7406;&#xFF0C;&#x5206;&#x6563;&#x5728;&#x5404;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x7ED9;&#x540E;&#x7EED;&#x7684;&#x7EF4;&#x62A4;&#x5E26;&#x6765;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x3002;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#xFF0C;&#x6211;&#x9009;&#x62E9;&#x5229;&#x7528;props.children&#x7ED3;&#x5408;&#x6807;&#x7B7E;&#x5D4C;&#x5957;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5B8C;&#x6210;&#x3002;&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><p>&#x5148;&#x5B9A;&#x4E00;&#x4E2A;layout&#xFF08;&#x672C;&#x804C;&#x4E5F;&#x662F;React&#x7EC4;&#x4EF6;&#xFF09;BasicLayout.jsx</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
class BasicLayout extends React.PureComponent{
    render(){
        const {children} = this.props;
        return (
            &lt;div&gt;
                &lt;div&gt;&#x9694;&#x58C1;&#x8001;&#x738B;&#x4ECA;&#x65E5;&#x884C;&#x7A0B;&#xFF1A;&lt;/div&gt;
                &lt;div&gt;{children}&lt;/div&gt;
            &lt;/div&gt;
        )
    }
}
export default BasicLayout;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BasicLayout</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span></span>{
    render(){
        <span class="hljs-keyword">const</span> {children} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x9694;&#x58C1;&#x8001;&#x738B;&#x4ECA;&#x65E5;&#x884C;&#x7A0B;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> BasicLayout;</code></pre><p>&#x5B9A;&#x4E49;&#x5B8C;&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import BasicLayout from &apos;&lt;BasicLayout&#x7684;&#x8DEF;&#x5F84;&gt;&apos;
class Work extends React.PureComponent{
    render(){
        return (
            &lt;BasicLayout&gt;
                &lt;div&gt;&#x4ECA;&#x5929;&#x9694;&#x58C1;&#x8001;&#x738B;&#x6BD4;&#x8F83;&#x7D2F;&#xFF0C;&#x4E0D;&#x5DE5;&#x4F5C;&#xFF01;&lt;/div&gt;
            &lt;BasicLayout&gt;
        )
    }
}
export default BasicLayout;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span> from <span class="hljs-symbol">&apos;reac</span>t&apos;;
<span class="hljs-keyword">import</span> <span class="hljs-type">BasicLayout</span> from &apos;&lt;<span class="hljs-type">BasicLayout</span>&#x7684;&#x8DEF;&#x5F84;&gt;&apos;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Work</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span></span>{
    render(){
        <span class="hljs-keyword">return</span> (
            &lt;<span class="hljs-type">BasicLayout</span>&gt;
                &lt;div&gt;&#x4ECA;&#x5929;&#x9694;&#x58C1;&#x8001;&#x738B;&#x6BD4;&#x8F83;&#x7D2F;&#xFF0C;&#x4E0D;&#x5DE5;&#x4F5C;&#xFF01;&lt;/div&gt;
            &lt;<span class="hljs-type">BasicLayout</span>&gt;
        )
    }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">BasicLayout</span>;</code></pre><p>&#x6700;&#x540E;&#x5728;&#x7684;dom&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;
    &lt;div&gt;&#x9694;&#x58C1;&#x8001;&#x738B;&#x4ECA;&#x65E5;&#x884C;&#x7A0B;&#xFF1A;&lt;/div&gt;
    &lt;div&gt;
        &lt;div&gt;&#x4ECA;&#x5929;&#x9694;&#x58C1;&#x8001;&#x738B;&#x6BD4;&#x8F83;&#x7D2F;&#xFF0C;&#x4E0D;&#x5DE5;&#x4F5C;&#xFF01;&lt;/div&gt;
    &lt;/div&gt; 
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;&#x9694;&#x58C1;&#x8001;&#x738B;&#x4ECA;&#x65E5;&#x884C;&#x7A0B;&#xFF1A;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span>&gt;
        &lt;<span class="hljs-keyword">div</span>&gt;&#x4ECA;&#x5929;&#x9694;&#x58C1;&#x8001;&#x738B;&#x6BD4;&#x8F83;&#x7D2F;&#xFF0C;&#x4E0D;&#x5DE5;&#x4F5C;&#xFF01;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt; 
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x57FA;&#x4E8E;BasicLayout&#x505A;&#x51FA;&#x5F88;&#x591A;&#x4E2A;&#x50CF;&#x4E0B;&#x9762;&#x7684;&#x9875;&#x9762;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;
    &lt;div&gt;&#x9694;&#x58C1;&#x8001;&#x738B;&#x4ECA;&#x65E5;&#x884C;&#x7A0B;&#xFF1A;&lt;/div&gt;
    &lt;div&gt;
       //&lt;&#x4E0D;&#x540C;&#x7684;&#x5185;&#x5BB9;&gt;
    &lt;/div&gt; 
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x9694;&#x58C1;&#x8001;&#x738B;&#x4ECA;&#x65E5;&#x884C;&#x7A0B;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
       //<span class="hljs-tag">&lt;<span class="hljs-name">&#x4E0D;&#x540C;&#x7684;&#x5185;&#x5BB9;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x5C31;&#x53EF;&#x4EE5;&#x5C06;&#x6211;&#x4EEC;&#x5F97;&#x6240;&#x6709;&#x8DEF;&#x7531;&#x5199;&#x5728;&#x4E00;&#x8D77;&#x4E86;&#xFF0C;&#x53EF;&#x80FD;&#x6709;&#x4EBA;&#x89C9;&#x5F97;&#x6BCF;&#x6B21;&#x90FD;&#x8981;&#x5199;&#x5F15;&#x5165;BasicLayout&#x5F88;&#x9EBB;&#x70E6;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x66F4;&#x597D;&#x7528;&#x7684;&#x529E;&#x6CD5;&#xFF0C;&#x5728;&#x8BB2;App.jsx&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x8BF4;&#x5230;&#x8FD9;&#x91CC;&#x5C31;&#x5148;&#x8DF3;&#x8FC7;&#x3002;</p><h3 id="articleHeader11">pages</h3><p>&#x8FD9;&#x91CC;&#x7684;&#x5B58;&#x653E;&#x7684;&#x90FD;&#x662F;&#x9875;&#x9762;&#x7EA7;&#x7EC4;&#x4EF6;&#xFF0C;&#x8DDF;react-router&#x5BF9;&#x5E94;&#x7684;&#x8DEF;&#x7531;&#x9700;&#x8981;&#x4E00;&#x4E00;&#x5BF9;&#x5E94;&#x3002;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x6587;&#x4EF6;&#x540D;&#x5C31;&#x662F;&#x9875;&#x9762;&#x540D;&#x79F0;&#xFF0C;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x8981;&#x5305;&#x542B;&#x5982;&#x4E0B;&#x51E0;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p><ul><li>components ---- &#x5B58;&#x653E;&#x5F53;&#x524D;&#x9875;&#x72EC;&#x6709;&#x7684;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;</li><li>redux ---- &#x5B58;&#x653E;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;<strong>actions.js</strong>&#x3001;<strong>actionTypes.js</strong>&#x3001;<strong>reducer.js</strong>,&#x8FD9;&#x51E0;&#x4E2A;&#x6587;&#x4EF6;&#x5E94;&#x8BE5;&#x53EA;&#x4E0E;&#x8FD9;&#x4E2A;&#x9875;&#x9762;&#x76F8;&#x5173;</li><li>index.jsx ---- &#x9875;&#x9762;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;</li><li>style.scss ---- &#x9875;&#x9762;&#x6240;&#x9700;&#x8981;&#x7684;&#x6837;&#x5F0F;</li></ul><p>&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x81EA;&#x884C;git clone &#x9879;&#x76EE;&#x67E5;&#x770B;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8D34;&#x51FA;&#x6765;&#x4E86;&#x3002;</p><h3 id="articleHeader12">scss</h3><p>&#x8FD9;&#x91CC;&#x5B58;&#x653E;&#x5171;&#x6709;&#x7684;scss&#x6587;&#x4EF6;&#xFF0C;&#x6BD4;&#x8F83;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x529F;&#x80FD;&#x7C7B;&#x3001;@mixin&#x3001;@function&#x7B49;&#x7B49;&#x3002;</p><h3 id="articleHeader13">store</h3><p>&#x8FD9;&#x91CC;&#x6709;&#x56DB;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p><ul><li><strong>actions.js</strong></li><li><strong>actionTypes.js</strong></li><li><strong>reducer.js</strong></li><li><strong>index.js</strong></li></ul><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x6709;&#x81EA;&#x5DF1;&#x7684;<strong>actions.js</strong>&#x3001;<strong>actionTypes.js</strong>&#x3001;<strong>reducer.js</strong>&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x91CC;&#x662F;&#x5168;&#x5C40;&#x7684;&#xFF0C;&#x53E6;&#x5916;index.js&#x4F1A;&#x5411;&#x5916;&#x66B4;&#x9732;store&#xFF0C;&#x7136;&#x540E;&#x518D;main.js&#x4E2D;&#x5F15;&#x5165;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createStore,combineReducers,applyMiddleware} from &apos;redux&apos;;
import thunk from &apos;redux-thunk&apos;;
import API from &apos;@/api&apos;;
import user from &apos;./reducer&apos;;
import author from &apos;@/pages/PageOne/redux/reducer&apos;
const store=createStore(
  combineReducers({
    user,
    author
  }),
  applyMiddleware(thunk.withExtraArgument({
    API
  }))
)
export default store;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {createStore,combineReducers,applyMiddleware} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux&apos;</span>;
<span class="hljs-keyword">import</span> thunk <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-thunk&apos;</span>;
<span class="hljs-keyword">import</span> API <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/api&apos;</span>;
<span class="hljs-keyword">import</span> user <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./reducer&apos;</span>;
<span class="hljs-keyword">import</span> author <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/pages/PageOne/redux/reducer&apos;</span>
<span class="hljs-keyword">const</span> store=createStore(
  combineReducers({
    user,
    author
  }),
  applyMiddleware(thunk.withExtraArgument({
    API
  }))
)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x7EC6;&#x8282;&#xFF0C;redux-thunk&#x662F;&#x53EF;&#x4EE5;&#x643A;&#x5E26;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x5BF9;&#x8C61;&#x6216;&#x8005;&#x65B9;&#x6CD5;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x643A;&#x5E26;API&#x5BF9;&#x8C61;&#x3002;&#x5F53;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;actions.js&#x91CC;&#x9762;&#x4F7F;&#x7528;API&#x5BF9;&#x8C61;&#x65F6;&#xFF0C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x518D;import&#x5BFC;&#x5165;&#x8FDB;&#x6765;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x505A;&#x4E2A;&#x5BF9;&#x6BD4;&#xFF1A;</p><p><strong>&#x4FEE;&#x6539;&#x524D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as actionTypes from &apos;./actionTypes&apos;;
import API from &apos;../api&apos;;

export const fecthUserName=(params)=&gt; async (dispatch,getState)=&gt;{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actionTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./actionTypes&apos;</span>;
<span class="hljs-keyword">import</span> API <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../api&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fecthUserName=<span class="hljs-function">(<span class="hljs-params">params</span>)=&gt;</span> <span class="hljs-keyword">async</span> (dispatch,getState)=&gt;{
  <span class="hljs-keyword">const</span> response =<span class="hljs-keyword">await</span> API.fetchUserInfo(params);
  <span class="hljs-keyword">const</span> {success,data} = response;
  <span class="hljs-keyword">if</span>(success){
    dispatch({
      <span class="hljs-keyword">type</span>:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}</code></pre><p><strong>&#x4FEE;&#x6539;&#x540E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as actionTypes from &apos;./actionTypes&apos;;

export const fecthUserName=(params)=&gt; async (dispatch,getState,{API})=&gt;{
  const response =await API.fetchUserInfo(params);
  const {success,data} = response;
  if(success){
    dispatch({
      type:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actionTypes <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./actionTypes&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fecthUserName=<span class="hljs-function">(<span class="hljs-params">params</span>)=&gt;</span> <span class="hljs-keyword">async</span> (dispatch,getState,{API})=&gt;{
  <span class="hljs-keyword">const</span> response =<span class="hljs-keyword">await</span> API.fetchUserInfo(params);
  <span class="hljs-keyword">const</span> {success,data} = response;
  <span class="hljs-keyword">if</span>(success){
    dispatch({
      <span class="hljs-keyword">type</span>:actionTypes.CHANGE_USER_NAME,
      payload:data
    });
  }
}</code></pre><h3 id="articleHeader14">utils</h3><p>&#x8FD9;&#x91CC;&#x4F1A;&#x5B58;&#x653E;&#x4E00;&#x4E9B;&#x81EA;&#x5DF1;&#x7684;&#x5C01;&#x88C5;&#x7684;js&#x5DE5;&#x5177;&#x6587;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x5728;&#x9879;&#x76EE;&#x57FA;&#x4E8E;axios&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;http.js,&#x7B80;&#x5316;&#x4E86;axios&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><h3 id="articleHeader15">App.jsx</h3><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x4E00;&#x4E0B;&#x8DEF;&#x7531;&#xFF0C;&#x5148;&#x653E;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import {BrowserRouter}from &apos;react-router-dom&apos;;
import { Switch, Route ,Redirect} from &apos;react-router&apos;;
import PageOne from &apos;@/pages/PageOne&apos;;
import PageTwo from &apos;@/pages/PageTwo&apos;;
import NavTwoLayout from &apos;@/layouts/NavTwoLayout&apos;;
import NotFound from &apos;@/pages/404&apos;;
const Router = BrowserRouter;

class App extends React.PureComponent{
  render(){
    return (
      &lt;Router&gt;
        &lt;Switch&gt;
          &lt;Redirect exact from=&quot;/&quot; to=&quot;/navone&quot;/&gt;
          {/* &#x5BFC;&#x822A;&#x680F;1 */}
          &lt;Redirect exact from=&quot;/navone&quot; to=&quot;/navone/pageone&quot;/&gt;
          &lt;Route exact path=&quot;/navone/pageone&quot; component={PageOne}/&gt;
          {/* &#x5BFC;&#x822A;&#x680F;2 */}
          &lt;Route path=&quot;/navtwo&quot; render={({match})=&gt;&lt;NavTwoLayout&gt;
              &lt;Switch&gt;
                &lt;Redirect exact from={`${match.path}`} to={`${match.path}/pagetwo`}/&gt;
                &lt;Route exact path={`${match.path}/pagetwo`} component={PageTwo}/&gt;
              &lt;/Switch&gt;
          &lt;/NavTwoLayout&gt;}/&gt;
          {/* 404 */}
          &lt;Route component={NotFound}/&gt;
        &lt;/Switch&gt;
      &lt;/Router&gt;
    )
  }
}
export default App;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> {BrowserRouter}<span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router-dom&apos;</span>;
<span class="hljs-keyword">import</span> { Switch, Route ,Redirect} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-router&apos;</span>;
<span class="hljs-keyword">import</span> PageOne <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/pages/PageOne&apos;</span>;
<span class="hljs-keyword">import</span> PageTwo <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/pages/PageTwo&apos;</span>;
<span class="hljs-keyword">import</span> NavTwoLayout <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/layouts/NavTwoLayout&apos;</span>;
<span class="hljs-keyword">import</span> NotFound <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/pages/404&apos;</span>;
<span class="hljs-keyword">const</span> Router = BrowserRouter;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span>{</span>
  render(){
    <span class="hljs-keyword">return</span> (
      &lt;Router&gt;
        &lt;Switch&gt;
          &lt;Redirect exact <span class="hljs-keyword">from</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">&quot;/navone&quot;</span>/&gt;
          {<span class="hljs-comment">/* &#x5BFC;&#x822A;&#x680F;1 */</span>}
          &lt;Redirect exact <span class="hljs-keyword">from</span>=<span class="hljs-string">&quot;/navone&quot;</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">&quot;/navone/pageone&quot;</span>/&gt;
          &lt;Route exact path=<span class="hljs-string">&quot;/navone/pageone&quot;</span> component={PageOne}/&gt;
          {<span class="hljs-comment">/* &#x5BFC;&#x822A;&#x680F;2 */</span>}
          &lt;Route path=<span class="hljs-string">&quot;/navtwo&quot;</span> render={({match})=&gt;&lt;NavTwoLayout&gt;
              &lt;Switch&gt;
                &lt;Redirect exact <span class="hljs-keyword">from</span>={`${match.path}`} <span class="hljs-keyword">to</span>={`${match.path}<span class="hljs-regexp">/pagetwo`}/</span>&gt;
                &lt;Route exact path={`${match.path}<span class="hljs-regexp">/pagetwo`} component={PageTwo}/</span>&gt;
              &lt;/Switch&gt;
          &lt;<span class="hljs-regexp">/NavTwoLayout&gt;}/</span>&gt;
          {<span class="hljs-comment">/* 404 */</span>}
          &lt;Route component={NotFound}/&gt;
        &lt;/Switch&gt;
      &lt;/Router&gt;
    )
  }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;</code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x91CD;&#x70B9;&#x8BB2;&#x7684;&#x662F;&#x4E4B;&#x95F4;&#x5728;layouts&#x4E2D;&#x6211;&#x4EEC;&#x8DF3;&#x8FC7;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x80FD;&#x4E0D;&#x80FD;&#x4E0D;&#x6BCF;&#x6B21;&#x90FD;&#x7528;layout&#x7EC4;&#x4EF6;&#x53BB;&#x5305;&#x88F9;&#x4EE3;&#x7801;&#xFF0C;&#x7B54;&#x6848;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x9009;&#x62E9;&lt;Route&gt;&#x4E2D;&#x7684;render&#x5C5E;&#x6027;&#xFF0C;&#x53E6;&#x5916;&#x6211;&#x7528;&#x7684;&#x662F;react-router&#x7684;4.x&#x7248;&#x672C;&#xFF0C;&#x5DF2;&#x7ECF;&#x79FB;&#x9664;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#x4E86;&#xFF0C;&#x8FD9;&#x8FB9;&#x5982;&#x4F55;&#x505A;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x6211;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5F88;&#x7B80;&#x5355;&#x5C31;&#x4E0D;&#x7EC6;&#x8BF4;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;match.path&#x5343;&#x4E07;&#x522B;&#x6F0F;&#x4E86;&#x54E6;&#xFF01;</p><h3 id="articleHeader16">main.js</h3><p>webpack&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4E3B;&#x8981;&#x4E00;&#x4E9B;&#x5168;&#x5C40;js&#x6216;&#x8005;scss&#x7684;&#x5BFC;&#x5165;&#xFF0C;&#x5E76;&#x6267;&#x884C;react-dom&#x4E0B;&#x7684;render&#x65B9;&#x6CD5;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import {render} from &apos;react-dom&apos;;
import {Provider} from &apos;react-redux&apos;;
import store from &apos;@/store&apos;;
import App from &apos;@/App&apos;;
import &apos;@/scss/reset.scss&apos;;
import &apos;@/scss/base.scss&apos;;


render(
  &lt;Provider store={store}&gt;
    &lt;App/&gt;
  &lt;/Provider&gt;,
  document.getElementById(&apos;app&apos;)
)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> {render} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> {Provider} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store&apos;</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/App&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;@/scss/reset.scss&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;@/scss/base.scss&apos;</span>;


render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;app&apos;</span>)
)
</code></pre><h2 id="articleHeader17">static</h2><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x76EE;&#x5F55;&#xFF0C;&#x4E00;&#x822C;&#x5B58;&#x653E;&#x4E00;&#x4E9B;&#x7B2C;&#x4E09;&#x65B9;&#x5DE5;&#x5177;&#x5E93;&#x3002;&#x8FD9;&#x4E2A;&#x76EE;&#x5F55;&#x4E3B;&#x8981;&#x4E24;&#x65B9;&#x9762;&#x8003;&#x8651;&#xFF1A;</p><ul><li>&#x6709;&#x4E9B;&#x7B2C;&#x4E09;&#x65B9;&#x5DE5;&#x5177;&#x5E93;&#x6CA1;&#x6709;npm&#x5305;&#xFF0C;&#x6211;&#x4EEC;&#x65E0;&#x6CD5;&#x7528;npm install &#x6216;&#x8005; yarn add&#x65B9;&#x5F0F;&#x6DFB;&#x52A0;</li><li>&#x4E00;&#x4E9B;&#x6BD4;&#x8F83;&#x5927;&#x7684;&#x7B2C;&#x4E09;&#x65B9;&#x5DE5;&#x5177;&#x5E93;&#x4F1A;&#x5F71;&#x54CD;&#x6211;&#x4EEC;&#x7684;&#x6253;&#x5305;&#x901F;&#x5EA6;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x5B83;&#x62FF;&#x51FA;&#x6765;&#x901A;&#x8FC7;script&#x7684;&#x65B9;&#x5F0F;&#x5F15;&#x5165;</li></ul><p>&#x5176;&#x5B9E;&#x7B2C;&#x4E09;&#x65B9;&#x5DE5;&#x5177;&#x5E93;&#x6700;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x662F;CDN&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E9B;&#x516C;&#x53F8;&#x5C31;&#x662F;&#x6CA1;&#x6709;&#xFF0C;&#x65E0;&#x5948;&#x53EA;&#x80FD;&#x5982;&#x6B64;&#x3002;&#x4F60;&#x52A0;&#x5165;&#x7684;&#x7B2C;&#x4E09;&#x5DE5;&#x5177;&#x5E93;&#x90FD;&#x53EF;&#x5728;&#x5F53;&#x524D;&#x670D;&#x52A1;&#x5668;&#x4E0B;&#x201D;<strong>/static/</strong>*&#x201C;&#x8DEF;&#x5F84;&#x4E0B;&#x83B7;&#x53D6;&#x5230;&#x3002;</p><h2 id="articleHeader18">&#x5176;&#x4ED6;&#x6587;&#x4EF6;</h2><ul><li>.babelrc ---- babel&#x8F6C;&#x6362;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</li><li>.gitignore ---- git&#x64CD;&#x4F5C;&#x6240;&#x9700;&#x8981;&#x5FFD;&#x7565;&#x7684;&#x6587;&#x4EF6;</li><li>.postcssrc.js ---- postcss&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</li><li>index.html ---- &#x6A21;&#x677F;index.html,webpack&#x4F1A;&#x6839;&#x636E;&#x6B64;&#x751F;&#x6210;&#x65B0;&#x7684;index.html,&#x914D;&#x5408;<strong>html-webpack-plugin</strong>&#x4F7F;&#x7528;</li><li>package.json ---- &#x5BB6;&#x55BB;&#x6237;&#x6653;&#x7684;&#x4E1C;&#x897F;</li><li>README.md ---- &#x9879;&#x76EE;&#x8BF4;&#x660E;</li><li>theme.js ---- ant-design&#x7684;&#x4E3B;&#x9898;&#x8272;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x5177;&#x4F53;&#x4F7F;&#x7528;&#x53EF;&#x4EE5;&#x53C2;&#x8003;ant-design&#x3002;</li><li>yarn.lock ---- &#x9501;&#x5B9A;&#x5305;&#x7684;&#x7248;&#x672C;</li></ul><h1 id="articleHeader19">&#x7ED3;&#x8BED;</h1><p>&#x8FD9;&#x4E2A;&#x53EA;&#x662F;&#x4E2A;&#x4EBA;&#x642D;&#x5EFA;&#x4F01;&#x4E1A;&#x7EA7;React&#x9879;&#x76EE;&#x7684;&#x4E00;&#x4E9B;&#x603B;&#x7ED3;&#x3002;&#x5F53;&#x7136;&#x5B58;&#x5728;&#x4E0D;&#x8DB3;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x540E;&#x9762;&#x5728;&#x5DE5;&#x4F5C;&#x8FC7;&#x7A0B;&#x4E2D;&#x5982;&#x679C;&#x6709;&#x4E00;&#x4E9B;&#x597D;&#x7684;&#x60F3;&#x6CD5;&#x4E5F;&#x4F1A;&#x5728;&#x8FD9;&#x4E0A;&#x9762;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x3002;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;Star&#x5173;&#x6CE8;&#xFF01;&#x5982;&#x679C;&#x4F60;&#x4E5F;&#x6709;&#x597D;&#x7684;&#x60F3;&#x6CD5;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x4EA4;&#x6D41;&#xFF0C;&#x5E0C;&#x671B;&#x8FD9;&#x7BC7;&#x62D9;&#x6587;&#x80FD;&#x7ED9;&#x5927;&#x5BB6;&#x4E00;&#x4E9B;&#x542F;&#x53D1;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
企业级React项目的个人构建总结

## 原文链接
[https://segmentfault.com/a/1190000016052564](https://segmentfault.com/a/1190000016052564)


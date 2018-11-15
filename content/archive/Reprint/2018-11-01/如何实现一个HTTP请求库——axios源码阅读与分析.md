---
title: 如何实现一个HTTP请求库——axios源码阅读与分析
reprint: true
categories: reprint
abbrlink: a4161779
date: 2018-11-01 02:30:09
---

{{% raw %}}
<h1 id="articleHeader0">&#x6982;&#x8FF0;</h1><p>&#x5728;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x9047;&#x5230;&#x9700;&#x8981;&#x53D1;&#x9001;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x7684;&#x60C5;&#x51B5;&#x3002;&#x800C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#x9F50;&#x5168;&#xFF0C;&#x63A5;&#x53E3;&#x5B8C;&#x5584;&#x7684;HTTP&#x8BF7;&#x6C42;&#x5E93;&#xFF0C;&#x80FD;&#x591F;&#x5728;&#x5F88;&#x5927;&#x7A0B;&#x5EA6;&#x4E0A;&#x51CF;&#x5C11;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x6210;&#x672C;&#xFF0C;&#x63D0;&#x9AD8;&#x6211;&#x4EEC;&#x7684;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p><p>axios&#x662F;&#x4E00;&#x4E2A;&#x5728;&#x8FD1;&#x4E9B;&#x5E74;&#x6765;&#x975E;&#x5E38;&#x706B;&#x7684;&#x4E00;&#x4E2A;HTTP&#x8BF7;&#x6C42;&#x5E93;&#xFF0C;&#x76EE;&#x524D;&#x5728;<a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">GitHub</a>&#x4E2D;&#x5DF2;&#x7ECF;&#x62E5;&#x6709;&#x4E86;&#x8D85;&#x8FC7;40K&#x7684;star&#xFF0C;&#x53D7;&#x5230;&#x4E86;&#x5404;&#x4F4D;&#x5927;&#x4F6C;&#x7684;&#x63A8;&#x8350;&#x3002;</p><p>&#x4ECA;&#x5929;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x770B;&#x4E0B;&#xFF0C;axios&#x5230;&#x5E95;&#x662F;&#x5982;&#x4F55;&#x8BBE;&#x8BA1;&#x7684;&#xFF0C;&#x5176;&#x4E2D;&#x53C8;&#x6709;&#x54EA;&#x4E9B;&#x503C;&#x5F97;&#x6211;&#x4EEC;&#x5B66;&#x4E60;&#x7684;&#x5730;&#x65B9;&#x3002;&#x6211;&#x5728;&#x5199;&#x8FD9;&#x8FB9;&#x6587;&#x7AE0;&#x65F6;&#xFF0C;axios&#x7684;&#x7248;&#x672C;&#x4E3A;0.18.0&#x3002;&#x6211;&#x4EEC;&#x5C31;&#x4EE5;&#x8FD9;&#x4E2A;&#x7248;&#x672C;&#x7684;&#x4EE3;&#x7801;&#x4E3A;&#x4F8B;&#xFF0C;&#x6765;&#x8FDB;&#x884C;&#x5177;&#x4F53;&#x7684;&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x548C;&#x5206;&#x6790;&#x3002;&#x5F53;&#x524D;axios&#x6240;&#x6709;&#x6E90;&#x7801;&#x6587;&#x4EF6;&#x90FD;&#x5728;<code>lib</code>&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x4E0B;&#x6587;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#x8DEF;&#x5F84;&#x5747;&#x662F;&#x6307;<code>lib</code>&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x7684;&#x8DEF;&#x5F84;&#x3002;</p><p>&#x672C;&#x6587;&#x7684;&#x4E3B;&#x8981;&#x5185;&#x5BB9;&#x6709;&#xFF1A;</p><ul><li>&#x5982;&#x4F55;&#x4F7F;&#x7528;axios</li><li>axios&#x7684;&#x6838;&#x5FC3;&#x6A21;&#x5757;&#x662F;&#x5982;&#x4F55;&#x8BBE;&#x8BA1;&#x4E0E;&#x5B9E;&#x73B0;&#x7684;&#xFF08;&#x8BF7;&#x6C42;&#x3001;&#x62E6;&#x622A;&#x5668;&#x3001;&#x64A4;&#x56DE;&#xFF09;</li><li>axios&#x7684;&#x8BBE;&#x8BA1;&#x6709;&#x4EC0;&#x4E48;&#x503C;&#x5F97;&#x501F;&#x9274;&#x7684;&#x5730;&#x65B9;</li></ul><h1 id="articleHeader1">&#x5982;&#x4F55;&#x4F7F;&#x7528;axios</h1><p>&#x60F3;&#x8981;&#x4E86;&#x89E3;axios&#x7684;&#x8BBE;&#x8BA1;&#xFF0C;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x9700;&#x8981;&#x6765;&#x770B;&#x4E0B;axios&#x662F;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x7684;&#x3002;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x793A;&#x4F8B;&#x6765;&#x4ECB;&#x7ECD;&#x4EE5;&#x4E0B;axios&#x7684;API&#x3002;</p><h2 id="articleHeader2">&#x53D1;&#x9001;&#x8BF7;&#x6C42;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
  method:&apos;get&apos;,
  url:&apos;http://bit.ly/2mTM3nY&apos;,
  responseType:&apos;stream&apos;
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream(&apos;ada_lovelace.jpg&apos;))
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">axios({
  <span class="hljs-attr">method</span>:<span class="hljs-string">&apos;get&apos;</span>,
  <span class="hljs-attr">url</span>:<span class="hljs-string">&apos;http://bit.ly/2mTM3nY&apos;</span>,
  <span class="hljs-attr">responseType</span>:<span class="hljs-string">&apos;stream&apos;</span>
})
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
  response.data.pipe(fs.createWriteStream(<span class="hljs-string">&apos;ada_lovelace.jpg&apos;</span>))
});</code></pre><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B98;&#x65B9;&#x7684;API&#x793A;&#x4F8B;&#x3002;&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;axios&#x7684;&#x7528;&#x6CD5;&#x4E0E;jQuery&#x7684;ajax&#x5F88;&#x76F8;&#x4F3C;&#xFF0C;&#x90FD;&#x662F;&#x901A;&#x8FC7;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;Promise&#xFF08;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;success&#x7684;callback&#xFF0C;&#x4E0D;&#x8FC7;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;Promise&#x6216;&#x8005;await&#xFF09;&#x6765;&#x7EE7;&#x7EED;&#x540E;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x793A;&#x4F8B;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6211;&#x5C31;&#x4E0D;&#x8FC7;&#x591A;&#x8D58;&#x8FF0;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E0B;&#x5982;&#x4F55;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570;&#x3002;</p><h2 id="articleHeader3">&#x589E;&#x52A0;&#x62E6;&#x622A;&#x5668;&#xFF08;Interceptors&#xFF09;&#x51FD;&#x6570;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x6CE8;&#x610F;&#x662F;2&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x6210;&#x529F;&#xFF0C;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x5931;&#x8D25;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x8BF4;&#x660E;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x539F;&#x56E0;
axios.interceptors.request.use(function (config) {
    // &#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x524D;&#x5904;&#x7406;
    return config;
  }, function (error) {
    // &#x8BF7;&#x6C42;&#x9519;&#x8BEF;&#x540E;&#x5904;&#x7406;
    return Promise.reject(error);
  });

// &#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;
axios.interceptors.response.use(function (response) {
    // &#x9488;&#x5BF9;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5904;&#x7406;
    return response;
  }, function (error) {
    // &#x54CD;&#x5E94;&#x9519;&#x8BEF;&#x540E;&#x5904;&#x7406;
    return Promise.reject(error);
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x6CE8;&#x610F;&#x662F;2&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x6210;&#x529F;&#xFF0C;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x5931;&#x8D25;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x8BF4;&#x660E;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x7684;&#x539F;&#x56E0;</span>
axios.interceptors.request.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
    <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x524D;&#x5904;&#x7406;</span>
    <span class="hljs-keyword">return</span> config;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x9519;&#x8BEF;&#x540E;&#x5904;&#x7406;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });

<span class="hljs-comment">// &#x589E;&#x52A0;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;</span>
axios.interceptors.response.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-comment">// &#x9488;&#x5BF9;&#x54CD;&#x5E94;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5904;&#x7406;</span>
    <span class="hljs-keyword">return</span> response;
  }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-comment">// &#x54CD;&#x5E94;&#x9519;&#x8BEF;&#x540E;&#x5904;&#x7406;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error);
  });</code></pre><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF1A;&#x5728;&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x9488;&#x5BF9;&#x8BF7;&#x6C42;&#x7684;config&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF1B;&#x800C;&#x5728;&#x8BF7;&#x6C42;&#x54CD;&#x5E94;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x80FD;&#x9488;&#x5BF9;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x7279;&#x5B9A;&#x7684;&#x64CD;&#x4F5C;&#x3002;&#x540C;&#x65F6;&#xFF0C;&#x5728;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x548C;&#x54CD;&#x5E94;&#x5931;&#x8D25;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x90FD;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x7279;&#x5B9A;&#x7684;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x3002;</p><h2 id="articleHeader4">&#x53D6;&#x6D88;HTTP&#x8BF7;&#x6C42;</h2><p>&#x5728;&#x5B8C;&#x6210;&#x641C;&#x7D22;&#x76F8;&#x5173;&#x7684;&#x529F;&#x80FD;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x9700;&#x8981;&#x9891;&#x7E41;&#x7684;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x6765;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x67E5;&#x8BE2;&#x7684;&#x60C5;&#x51B5;&#x3002;&#x901A;&#x5E38;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x4E0B;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x65F6;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x53D6;&#x6D88;&#x4E0A;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x76F8;&#x5173;&#x7684;&#x529F;&#x80FD;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x4F18;&#x70B9;&#x3002;axios&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get(&apos;/user/12345&apos;, {
  cancelToken: source.token
}).catch(function(thrown) {
  if (axios.isCancel(thrown)) {
    console.log(&apos;Request canceled&apos;, thrown.message);
  } else {
    // handle error
  }
});

axios.post(&apos;/user/12345&apos;, {
  name: &apos;new name&apos;
}, {
  cancelToken: source.token
})

// cancel the request (the message parameter is optional)
source.cancel(&apos;Operation canceled by the user.&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> CancelToken = axios.CancelToken;
<span class="hljs-keyword">const</span> source = CancelToken.source();

axios.get(<span class="hljs-string">&apos;/user/12345&apos;</span>, {
  <span class="hljs-attr">cancelToken</span>: source.token
}).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">thrown</span>) </span>{
  <span class="hljs-keyword">if</span> (axios.isCancel(thrown)) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Request canceled&apos;</span>, thrown.message);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// handle error</span>
  }
});

axios.post(<span class="hljs-string">&apos;/user/12345&apos;</span>, {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;new name&apos;</span>
}, {
  <span class="hljs-attr">cancelToken</span>: source.token
})

<span class="hljs-comment">// cancel the request (the message parameter is optional)</span>
source.cancel(<span class="hljs-string">&apos;Operation canceled by the user.&apos;</span>);</code></pre><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x793A;&#x4F8B;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;axios&#x4F7F;&#x7528;&#x7684;&#x662F;&#x57FA;&#x4E8E;CancelToken&#x7684;&#x4E00;&#x4E2A;&#x64A4;&#x56DE;&#x63D0;&#x6848;&#x3002;&#x4E0D;&#x8FC7;&#xFF0C;&#x76EE;&#x524D;&#x8BE5;&#x63D0;&#x6848;&#x5DF2;&#x7ECF;&#x88AB;&#x64A4;&#x56DE;&#xFF0C;&#x5177;&#x4F53;&#x8BE6;&#x60C5;&#x53EF;&#x4EE5;&#x89C1;<a href="https://github.com/tc39/proposal-cancelable-promises" rel="nofollow noreferrer" target="_blank">&#x6B64;&#x5904;</a>&#x3002;&#x5177;&#x4F53;&#x7684;&#x64A4;&#x56DE;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x6211;&#x4EEC;&#x4F1A;&#x5728;&#x540E;&#x9762;&#x7684;&#x7AE0;&#x8282;&#x6E90;&#x7801;&#x5206;&#x6790;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x8BF4;&#x660E;&#x3002;</p><h1 id="articleHeader5">axios&#x7684;&#x6838;&#x5FC3;&#x6A21;&#x5757;&#x662F;&#x5982;&#x4F55;&#x8BBE;&#x8BA1;&#x4E0E;&#x5B9E;&#x73B0;&#x7684;</h1><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5BF9;axios&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x90FD;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x5927;&#x81F4;&#x7684;&#x4E86;&#x89E3;&#x3002;&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x6309;&#x7167;&#x6A21;&#x5757;&#x6765;&#x5BF9;axios&#x7684;&#x8BBE;&#x8BA1;&#x4E0E;&#x5B9E;&#x73B0;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x3002;&#x4E0B;&#x56FE;&#x662F;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x7BC7;&#x535A;&#x5BA2;&#x4E2D;&#x5C06;&#x4F1A;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x76F8;&#x5173;&#x7684;axios&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x8BFB;&#x8005;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;clone&#x76F8;&#x5173;&#x4EE3;&#x7801;&#x7ED3;&#x5408;&#x535A;&#x5BA2;&#x8FDB;&#x884C;&#x9605;&#x8BFB;&#xFF0C;&#x8FD9;&#x6837;&#x80FD;&#x591F;&#x52A0;&#x6DF1;&#x5BF9;&#x76F8;&#x5173;&#x6A21;&#x5757;&#x7684;&#x7406;&#x89E3;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015747146" src="https://static.alili.tech/img/remote/1460000015747146" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader6">HTTP&#x8BF7;&#x6C42;&#x6A21;&#x5757;</h2><p>&#x4F5C;&#x4E3A;&#x6838;&#x5FC3;&#x6A21;&#x5757;&#xFF0C;axios&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x4F4D;&#x4E8E;<code>core/dispatchReqeust.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x3002;&#x7531;&#x4E8E;&#x7BC7;&#x5E45;&#x6709;&#x9650;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x9009;&#x53D6;&#x90E8;&#x5206;&#x91CD;&#x70B9;&#x7684;&#x6E90;&#x7801;&#x8FDB;&#x884C;&#x7B80;&#x5355;&#x7684;&#x4ECB;&#x7ECD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // &#x5176;&#x4ED6;&#x6E90;&#x7801;

    // default adapter&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x73AF;&#x5883;&#x6765;&#x9009;&#x62E9;&#x4F7F;&#x7528;Node&#x8FD8;&#x662F;XHR&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x7684;&#x6A21;&#x5757;
    var adapter = config.adapter || defaults.adapter; 

    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);

        // &#x5176;&#x4ED6;&#x6E90;&#x7801;

        return response;
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);

            // &#x5176;&#x4ED6;&#x6E90;&#x7801;

            return Promise.reject(reason);
        });
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatchRequest</span>(<span class="hljs-params">config</span>) </span>{
    throwIfCancellationRequested(config);

    <span class="hljs-comment">// &#x5176;&#x4ED6;&#x6E90;&#x7801;</span>

    <span class="hljs-comment">// default adapter&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x73AF;&#x5883;&#x6765;&#x9009;&#x62E9;&#x4F7F;&#x7528;Node&#x8FD8;&#x662F;XHR&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x7684;&#x6A21;&#x5757;</span>
    <span class="hljs-keyword">var</span> adapter = config.adapter || defaults.adapter; 

    <span class="hljs-keyword">return</span> adapter(config).then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAdapterResolution</span>(<span class="hljs-params">response</span>) </span>{
        throwIfCancellationRequested(config);

        <span class="hljs-comment">// &#x5176;&#x4ED6;&#x6E90;&#x7801;</span>

        <span class="hljs-keyword">return</span> response;
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onAdapterRejection</span>(<span class="hljs-params">reason</span>) </span>{
        <span class="hljs-keyword">if</span> (!isCancel(reason)) {
            throwIfCancellationRequested(config);

            <span class="hljs-comment">// &#x5176;&#x4ED6;&#x6E90;&#x7801;</span>

            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(reason);
        });
};</code></pre><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x548C;&#x793A;&#x4F8B;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;<code>dispatchRequest</code>&#x65B9;&#x6CD5;&#x662F;&#x901A;&#x8FC7;&#x83B7;&#x53D6;<code>config.adapter</code>&#x6765;&#x5F97;&#x5230;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x6A21;&#x5757;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F20;&#x5165;&#x7B26;&#x5408;&#x89C4;&#x8303;&#x7684;adapter&#x51FD;&#x6570;&#x6765;&#x66FF;&#x6362;&#x6389;&#x539F;&#x751F;&#x7684;&#x6A21;&#x5757;&#xFF08;&#x867D;&#x7136;&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E5F;&#x7B97;&#x662F;&#x4E00;&#x4E2A;&#x677E;&#x8026;&#x5408;&#x6269;&#x5C55;&#x70B9;&#xFF09;&#x3002;</p><p>&#x5728;<code>default.js</code>&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x770B;&#x5230;&#x76F8;&#x5173;&#x7684;adapter&#x9009;&#x62E9;&#x903B;&#x8F91;&#xFF0C;&#x5373;&#x6839;&#x636E;&#x5F53;&#x524D;&#x5BB9;&#x5668;&#x4E2D;&#x7279;&#x6709;&#x7684;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#x548C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x6765;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getDefaultAdapter() {
    var adapter;
    // &#x53EA;&#x6709;Node.js&#x624D;&#x6709;&#x53D8;&#x91CF;&#x7C7B;&#x578B;&#x4E3A;process&#x7684;&#x7C7B;
    if (typeof process !== &apos;undefined&apos; &amp;&amp; Object.prototype.toString.call(process) === &apos;[object process]&apos;) {
        // Node.js&#x8BF7;&#x6C42;&#x6A21;&#x5757;
        adapter = require(&apos;./adapters/http&apos;);
    } else if (typeof XMLHttpRequest !== &apos;undefined&apos;) {
        // &#x6D4F;&#x89C8;&#x5668;&#x8BF7;&#x6C42;&#x6A21;&#x5757;
        adapter = require(&apos;./adapters/xhr&apos;);
    }
    return adapter;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDefaultAdapter</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> adapter;
    <span class="hljs-comment">// &#x53EA;&#x6709;Node.js&#x624D;&#x6709;&#x53D8;&#x91CF;&#x7C7B;&#x578B;&#x4E3A;process&#x7684;&#x7C7B;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> process !== <span class="hljs-string">&apos;undefined&apos;</span> &amp;&amp; <span class="hljs-built_in">Object</span>.prototype.toString.call(process) === <span class="hljs-string">&apos;[object process]&apos;</span>) {
        <span class="hljs-comment">// Node.js&#x8BF7;&#x6C42;&#x6A21;&#x5757;</span>
        adapter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./adapters/http&apos;</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> XMLHttpRequest !== <span class="hljs-string">&apos;undefined&apos;</span>) {
        <span class="hljs-comment">// &#x6D4F;&#x89C8;&#x5668;&#x8BF7;&#x6C42;&#x6A21;&#x5757;</span>
        adapter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./adapters/xhr&apos;</span>);
    }
    <span class="hljs-keyword">return</span> adapter;
}</code></pre><p>axios&#x4E2D;XHR&#x6A21;&#x5757;&#x8F83;&#x4E3A;&#x7B80;&#x5355;&#xFF0C;&#x4E3A;XMLHTTPRequest&#x5BF9;&#x8C61;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x8FC7;&#x591A;&#x8FDB;&#x884C;&#x4ECB;&#x7ECD;&#x4E86;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x9605;&#x8BFB;&#xFF0C;&#x4EE3;&#x7801;&#x4F4D;&#x4E8E;<code>adapters/xhr.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x3002;</p><h2 id="articleHeader7">&#x62E6;&#x622A;&#x5668;&#x6A21;&#x5757;</h2><p>&#x4E86;&#x89E3;&#x4E86;<code>dispatchRequest</code>&#x5B9E;&#x73B0;&#x7684;HTTP&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x6A21;&#x5757;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E0B;axios&#x662F;&#x5982;&#x4F55;&#x5904;&#x7406;&#x8BF7;&#x6C42;&#x548C;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x51FD;&#x6570;&#x7684;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x4E0B;axios&#x4E2D;&#x8BF7;&#x6C42;&#x7684;&#x7EDF;&#x4E00;&#x5165;&#x53E3;<code>request</code>&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Axios.prototype.request = function request(config) {

    // &#x5176;&#x4ED6;&#x4EE3;&#x7801;

    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Axios.prototype.request = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">config</span>) </span>{

    <span class="hljs-comment">// &#x5176;&#x4ED6;&#x4EE3;&#x7801;</span>

    <span class="hljs-keyword">var</span> chain = [dispatchRequest, <span class="hljs-literal">undefined</span>];
    <span class="hljs-keyword">var</span> promise = <span class="hljs-built_in">Promise</span>.resolve(config);

    <span class="hljs-keyword">this</span>.interceptors.request.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unshiftRequestInterceptors</span>(<span class="hljs-params">interceptor</span>) </span>{
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    <span class="hljs-keyword">this</span>.interceptors.response.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushResponseInterceptors</span>(<span class="hljs-params">interceptor</span>) </span>{
        chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    <span class="hljs-keyword">while</span> (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
    }

    <span class="hljs-keyword">return</span> promise;
};</code></pre><p>&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x662F;axios&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x5165;&#x53E3;&#xFF0C;&#x56E0;&#x4E3A;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x6BD4;&#x8F83;&#x957F;&#xFF0C;&#x6211;&#x5C31;&#x7B80;&#x5355;&#x8BF4;&#x4E00;&#x4E0B;&#x76F8;&#x5173;&#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x8DEF;&#xFF1A;</p><ol><li>chain&#x662F;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x961F;&#x5217;&#x3002;&#x8FD9;&#x4E2A;&#x961F;&#x5217;&#x7684;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x5E26;&#x6709;config&#x53C2;&#x6570;&#x7684;Promise&#x3002;</li><li>&#x5728;chain&#x6267;&#x884C;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x63D2;&#x5165;&#x4E86;&#x521D;&#x59CB;&#x7684;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x51FD;&#x6570;<code>dispatchReqeust</code>&#x548C;&#x4E0E;&#x4E4B;&#x5BF9;&#x5E94;&#x7684;<code>undefined</code>&#x3002;&#x540E;&#x9762;&#x9700;&#x8981;&#x589E;&#x52A0;&#x4E00;&#x4E2A;<code>undefined</code>&#x662F;&#x56E0;&#x4E3A;&#x5728;Promise&#x4E2D;&#xFF0C;&#x9700;&#x8981;&#x4E00;&#x4E2A;success&#x548C;&#x4E00;&#x4E2A;fail&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x4ECE;&#x4EE3;&#x7801;<code>promise = promise.then(chain.shift(), chain.shift());</code>&#x5C31;&#x80FD;&#x591F;&#x770B;&#x51FA;&#x6765;&#x3002;&#x56E0;&#x6B64;&#xFF0C;<code>dispatchReqeust</code>&#x548C;<code>undefined</code>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6210;&#x4E3A;&#x4E00;&#x5BF9;&#x51FD;&#x6570;&#x3002;</li><li>&#x5728;chain&#x6267;&#x884C;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;&#x51FD;&#x6570;<code>dispatchReqeust</code>&#x662F;&#x5904;&#x4E8E;&#x4E2D;&#x95F4;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x5B83;&#x7684;&#x524D;&#x9762;&#x662F;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x901A;&#x8FC7;<code>unshift</code>&#x65B9;&#x6CD5;&#x653E;&#x5165;&#xFF1B;&#x5B83;&#x7684;&#x540E;&#x9762;&#x662F;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#xFF0C;&#x901A;&#x8FC7;<code>push</code>&#x653E;&#x5165;&#x3002;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x8FD9;&#x4E9B;&#x51FD;&#x6570;&#x90FD;&#x662F;&#x6210;&#x5BF9;&#x7684;&#x653E;&#x5165;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x6B21;&#x653E;&#x5165;&#x4E24;&#x4E2A;&#x3002;</li></ol><p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;<code>request</code>&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x5927;&#x81F4;&#x77E5;&#x9053;&#x4E86;&#x62E6;&#x622A;&#x5668;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E0B;&#x5982;&#x4F55;&#x53D6;&#x6D88;&#x4E00;&#x4E2A;HTTP&#x8BF7;&#x6C42;&#x3002;</p><h2 id="articleHeader8">&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x6A21;&#x5757;</h2><p>&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x76F8;&#x5173;&#x7684;&#x6A21;&#x5757;&#x5728;<code>Cancel/</code>&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E0B;&#x76F8;&#x5173;&#x7684;&#x91CD;&#x70B9;&#x4EE3;&#x7801;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E0B;&#x5143;&#x6570;&#x636E;<code>Cancel</code>&#x7C7B;&#x3002;&#x5B83;&#x662F;&#x7528;&#x6765;&#x8BB0;&#x5F55;&#x53D6;&#x6D88;&#x72B6;&#x6001;&#x4E00;&#x4E2A;&#x7C7B;&#xFF0C;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Cancel(message) {
      this.message = message;
    }

    Cancel.prototype.toString = function toString() {
      return &apos;Cancel&apos; + (this.message ? &apos;: &apos; + this.message : &apos;&apos;);
    };

    Cancel.prototype.__CANCEL__ = true;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Cancel</span>(<span class="hljs-params">message</span>) </span>{
      <span class="hljs-keyword">this</span>.message = message;
    }

    Cancel.prototype.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toString</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;Cancel&apos;</span> + (<span class="hljs-keyword">this</span>.message ? <span class="hljs-string">&apos;: &apos;</span> + <span class="hljs-keyword">this</span>.message : <span class="hljs-string">&apos;&apos;</span>);
    };

    Cancel.prototype.__CANCEL__ = <span class="hljs-literal">true</span>;</code></pre><p>&#x800C;&#x5728;CancelToken&#x7C7B;&#x4E2D;&#xFF0C;&#x5B83;&#x901A;&#x8FC7;&#x4F20;&#x9012;&#x4E00;&#x4E2A;Promise&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x4E86;HTTP&#x8BF7;&#x6C42;&#x53D6;&#x6D88;&#xFF0C;&#x7136;&#x6211;&#x4EEC;&#x770B;&#x4E0B;&#x5177;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CancelToken(executor) {
    if (typeof executor !== &apos;function&apos;) {
        throw new TypeError(&apos;executor must be a function.&apos;);
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });

    var token = this;
    executor(function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }

        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}

CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CancelToken</span>(<span class="hljs-params">executor</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> executor !== <span class="hljs-string">&apos;function&apos;</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;executor must be a function.&apos;</span>);
    }

    <span class="hljs-keyword">var</span> resolvePromise;
    <span class="hljs-keyword">this</span>.promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">promiseExecutor</span>(<span class="hljs-params">resolve</span>) </span>{
        resolvePromise = resolve;
    });

    <span class="hljs-keyword">var</span> token = <span class="hljs-keyword">this</span>;
    executor(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">cancel</span>(<span class="hljs-params">message</span>) </span>{
        <span class="hljs-keyword">if</span> (token.reason) {
            <span class="hljs-comment">// Cancellation has already been requested</span>
            <span class="hljs-keyword">return</span>;
        }

        token.reason = <span class="hljs-keyword">new</span> Cancel(message);
        resolvePromise(token.reason);
    });
}

CancelToken.source = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">source</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> cancel;
    <span class="hljs-keyword">var</span> token = <span class="hljs-keyword">new</span> CancelToken(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">executor</span>(<span class="hljs-params">c</span>) </span>{
        cancel = c;
    });
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">token</span>: token,
        <span class="hljs-attr">cancel</span>: cancel
    };
};</code></pre><p>&#x800C;&#x5728;<code>adapter/xhr.js</code>&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x6709;&#x4E0E;&#x4E4B;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (config.cancelToken) {
    // &#x7B49;&#x5F85;&#x53D6;&#x6D88;
    config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
            return;
        }

        request.abort();
        reject(cancel);
        // &#x91CD;&#x7F6E;&#x8BF7;&#x6C42;
        request = null;
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (config.cancelToken) {
    <span class="hljs-comment">// &#x7B49;&#x5F85;&#x53D6;&#x6D88;</span>
    config.cancelToken.promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onCanceled</span>(<span class="hljs-params">cancel</span>) </span>{
        <span class="hljs-keyword">if</span> (!request) {
            <span class="hljs-keyword">return</span>;
        }

        request.abort();
        reject(cancel);
        <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x8BF7;&#x6C42;</span>
        request = <span class="hljs-literal">null</span>;
    });
}</code></pre><p>&#x7ED3;&#x5408;&#x4E0A;&#x9762;&#x7684;&#x53D6;&#x6D88;HTTP&#x8BF7;&#x6C42;&#x7684;&#x793A;&#x4F8B;&#x548C;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x7B80;&#x5355;&#x8BF4;&#x4E0B;&#x76F8;&#x5173;&#x7684;&#x5B9E;&#x73B0;&#x903B;&#x8F91;&#xFF1A;</p><ol><li>&#x5728;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x53D6;&#x6D88;&#x7684;&#x8BF7;&#x6C42;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x521D;&#x59CB;&#x5316;&#x65F6;&#x8C03;&#x7528;&#x4E86;source&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E86;&#x4E00;&#x4E2A;<code>CancelToken</code>&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;A&#x548C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;cancel&#x3002;</li><li>&#x5728;source&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;A&#x4E2D;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x4E86;&#x4E00;&#x4E2A;&#x5728;pending&#x72B6;&#x6001;&#x7684;promise&#x3002;&#x6211;&#x4EEC;&#x5C06;&#x6574;&#x4E2A;&#x5B9E;&#x4F8B;A&#x4F20;&#x9012;&#x7ED9;axios&#x540E;&#xFF0C;&#x8FD9;&#x4E2A;promise&#x88AB;&#x7528;&#x4E8E;&#x505A;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x7684;&#x89E6;&#x53D1;&#x5668;&#x3002;</li><li>&#x5F53;source&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;cancel&#x65B9;&#x6CD5;&#x88AB;&#x8C03;&#x7528;&#x65F6;&#xFF0C;&#x5B9E;&#x4F8B;A&#x4E2D;&#x7684;promise&#x72B6;&#x6001;&#x7531;pending&#x53D8;&#x6210;&#x4E86;fulfilled,&#x7ACB;&#x523B;&#x89E6;&#x53D1;&#x4E86;then&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x89E6;&#x53D1;&#x4E86;axios&#x7684;&#x53D6;&#x6D88;&#x903B;&#x8F91;&#x2014;&#x2014;<code>request.abort()</code>&#x3002;</li></ol><h1 id="articleHeader9">axios&#x7684;&#x8BBE;&#x8BA1;&#x6709;&#x4EC0;&#x4E48;&#x503C;&#x5F97;&#x501F;&#x9274;&#x7684;&#x5730;&#x65B9;</h1><h2 id="articleHeader10">&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x51FD;&#x6570;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</h2><p>&#x5728;&#x4E4B;&#x524D;&#x7684;&#x7AE0;&#x8282;&#x4E2D;&#x6709;&#x63D0;&#x5230;&#x8FC7;&#xFF0C;axios&#x5728;&#x5904;&#x7406;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x7684;<code>dispatchRequest</code>&#x51FD;&#x6570;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x5F53;&#x505A;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x51FD;&#x6570;&#x6765;&#x5BF9;&#x5F85;&#xFF0C;&#x800C;&#x662F;&#x91C7;&#x7528;&#x4E00;&#x89C6;&#x540C;&#x4EC1;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5C06;&#x5176;&#x653E;&#x5728;&#x961F;&#x5217;&#x7684;&#x4E2D;&#x95F4;&#x4F4D;&#x7F6E;&#xFF0C;&#x4ECE;&#x800C;&#x4FDD;&#x8BC1;&#x4E86;&#x961F;&#x5217;&#x5904;&#x7406;&#x7684;&#x4E00;&#x81F4;&#x6027;&#xFF0C;&#x63D0;&#x9AD8;&#x4E86;&#x4EE3;&#x7801;&#x7684;&#x53EF;&#x9605;&#x8BFB;&#x6027;&#x3002;</p><h2 id="articleHeader11">Adapter&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</h2><p>&#x5728;adapter&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#x4E2D;&#xFF0C;axios&#x6CA1;&#x6709;&#x628A;http&#x548C;xhr&#x4E24;&#x4E2A;&#x6A21;&#x5757;&#xFF08;&#x4E00;&#x4E2A;&#x7528;&#x4E8E;Node.js&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x5219;&#x7528;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF09;&#x5F53;&#x6210;&#x81EA;&#x8EAB;&#x7684;&#x6A21;&#x5757;&#x76F4;&#x63A5;&#x5728;<code>dispatchRequest</code>&#x4E2D;&#x76F4;&#x63A5;&#x996E;&#x7528;&#xFF0C;&#x800C;&#x662F;&#x901A;&#x8FC7;&#x914D;&#x7F6E;&#x7684;&#x65B9;&#x6CD5;&#x5728;<code>default.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x9ED8;&#x8BA4;&#x5F15;&#x5165;&#x3002;&#x8FD9;&#x6837;&#x65E2;&#x4FDD;&#x8BC1;&#x4E86;&#x4E24;&#x4E2A;&#x6A21;&#x5757;&#x95F4;&#x7684;&#x4F4E;&#x8026;&#x5408;&#x6027;&#xFF0C;&#x540C;&#x65F6;&#x53C8;&#x80FD;&#x591F;&#x4E3A;&#x4ECA;&#x540E;&#x7528;&#x6237;&#x9700;&#x8981;&#x81EA;&#x5B9A;&#x4E49;&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x6A21;&#x5757;&#x4FDD;&#x7559;&#x4E86;&#x4F59;&#x5730;&#x3002;</p><h2 id="articleHeader12">&#x53D6;&#x6D88;HTTP&#x8BF7;&#x6C42;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;</h2><p>&#x5728;&#x53D6;&#x6D88;HTTP&#x8BF7;&#x6C42;&#x7684;&#x903B;&#x8F91;&#x4E2D;&#xFF0C;axios&#x5DE7;&#x5999;&#x7684;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E2A;Promise&#x6765;&#x4F5C;&#x4E3A;&#x89E6;&#x53D1;&#x5668;&#xFF0C;&#x5C06;resolve&#x51FD;&#x6570;&#x901A;&#x8FC7;callback&#x4E2D;&#x53C2;&#x6570;&#x7684;&#x5F62;&#x5F0F;&#x4F20;&#x9012;&#x5230;&#x4E86;&#x5916;&#x90E8;&#x3002;&#x8FD9;&#x6837;&#x65E2;&#x80FD;&#x591F;&#x4FDD;&#x8BC1;&#x5185;&#x90E8;&#x903B;&#x8F91;&#x7684;&#x8FDE;&#x8D2F;&#x6027;&#xFF0C;&#x4E5F;&#x80FD;&#x591F;&#x4FDD;&#x8BC1;&#x5728;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x76F4;&#x63A5;&#x8FDB;&#x884C;&#x76F8;&#x5173;&#x7C7B;&#x7684;&#x793A;&#x4F8B;&#x6570;&#x636E;&#x6539;&#x52A8;&#xFF0C;&#x6700;&#x5927;&#x7A0B;&#x5EA6;&#x4E0A;&#x907F;&#x514D;&#x4E86;&#x4FB5;&#x5165;&#x5176;&#x4ED6;&#x7684;&#x6A21;&#x5757;&#x3002;</p><h1 id="articleHeader13">&#x603B;&#x7ED3;</h1><p>&#x672C;&#x6587;&#x5BF9;axios&#x76F8;&#x5173;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x3001;&#x8BBE;&#x8BA1;&#x601D;&#x8DEF;&#x548C;&#x5B9E;&#x73B0;&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4E86;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#x3002;&#x8BFB;&#x8005;&#x80FD;&#x591F;&#x901A;&#x8FC7;&#x4E0A;&#x8FF0;&#x6587;&#x7AE0;&#xFF0C;&#x4E86;&#x89E3;axios&#x7684;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#xFF0C;&#x540C;&#x65F6;&#x80FD;&#x591F;&#x5728;axios&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5B66;&#x4E60;&#x5230;&#x5173;&#x4E8E;&#x6A21;&#x5757;&#x5C01;&#x88C5;&#x548C;&#x4EA4;&#x4E92;&#x7B49;&#x76F8;&#x5173;&#x7684;&#x7ECF;&#x9A8C;&#x3002;</p><p>&#x7531;&#x4E8E;&#x7BC7;&#x5E45;&#x539F;&#x56E0;&#xFF0C;&#x672C;&#x6587;&#x4EC5;&#x9488;&#x5BF9;axios&#x7684;&#x6838;&#x5FC3;&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x4E86;&#x5206;&#x89E3;&#x548C;&#x4ECB;&#x7ECD;&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x5176;&#x4ED6;&#x4EE3;&#x7801;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;<a href="https://github.com/axios/axios" rel="nofollow noreferrer" target="_blank">GitHub</a>&#x8FDB;&#x884C;&#x67E5;&#x770B;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x4EFB;&#x4F55;&#x7591;&#x95EE;&#x6216;&#x8005;&#x89C2;&#x70B9;&#xFF0C;&#x6B22;&#x8FCE;&#x968F;&#x65F6;&#x7559;&#x8A00;&#x8BA8;&#x8BBA;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何实现一个HTTP请求库——axios源码阅读与分析

## 原文链接
[https://segmentfault.com/a/1190000015747143](https://segmentfault.com/a/1190000015747143)


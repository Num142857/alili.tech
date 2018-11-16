---
title: Service Worker学习与实践
hidden: true
categories: [reprint]
slug: 71087eaf
date: 2018-11-03 02:30:13
---

{{< raw >}}
<h2 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;<code>Service Worker</code></h2><p><code>Service Worker</code>&#x672C;&#x8D28;&#x4E0A;&#x5145;&#x5F53;Web&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E0E;&#x6D4F;&#x89C8;&#x5668;&#x4E4B;&#x95F4;&#x7684;&#x4EE3;&#x7406;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x7F51;&#x7EDC;&#x53EF;&#x7528;&#x65F6;&#x4F5C;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x548C;&#x7F51;&#x7EDC;&#x95F4;&#x7684;&#x4EE3;&#x7406;&#x3002;&#x5B83;&#x4EEC;&#x65E8;&#x5728;&#xFF08;&#x9664;&#x5176;&#x4ED6;&#x4E4B;&#x5916;&#xFF09;&#x4F7F;&#x5F97;&#x80FD;&#x591F;&#x521B;&#x5EFA;&#x6709;&#x6548;&#x7684;&#x79BB;&#x7EBF;&#x4F53;&#x9A8C;&#xFF0C;&#x62E6;&#x622A;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5E76;&#x57FA;&#x4E8E;&#x7F51;&#x7EDC;&#x662F;&#x5426;&#x53EF;&#x7528;&#x4EE5;&#x53CA;&#x66F4;&#x65B0;&#x7684;&#x8D44;&#x6E90;&#x662F;&#x5426;&#x9A7B;&#x7559;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x6765;&#x91C7;&#x53D6;&#x9002;&#x5F53;&#x7684;&#x52A8;&#x4F5C;&#x3002;&#x4ED6;&#x4EEC;&#x8FD8;&#x5141;&#x8BB8;&#x8BBF;&#x95EE;&#x63A8;&#x9001;&#x901A;&#x77E5;&#x548C;&#x540E;&#x53F0;&#x540C;&#x6B65;<code>API</code>&#x3002;</p><ul><li><code>Service Worker</code>&#x7684;&#x672C;&#x8D28;&#x662F;&#x4E00;&#x4E2A;<code>Web Worker</code>&#xFF0C;&#x5B83;&#x72EC;&#x7ACB;&#x4E8E;<code>JavaScript</code>&#x4E3B;&#x7EBF;&#x7A0B;&#xFF0C;&#x56E0;&#x6B64;&#x5B83;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;<code>DOM</code>&#xFF0C;&#x4E5F;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;<code>window</code>&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;<code>Service Worker</code>&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;<code>navigator</code>&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x6D88;&#x606F;&#x4F20;&#x9012;&#x7684;&#x65B9;&#x5F0F;&#xFF08;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage" rel="nofollow noreferrer" target="_blank">postMessage</a>&#xFF09;&#x4E0E;<code>JavaScript</code>&#x4E3B;&#x7EBF;&#x7A0B;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#x3002;</li><li><code>Service Worker</code>&#x662F;&#x4E00;&#x4E2A;&#x7F51;&#x7EDC;&#x4EE3;&#x7406;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x63A7;&#x5236;<code>Web</code>&#x9875;&#x9762;&#x7684;&#x6240;&#x6709;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x3002;</li><li><code>Service Worker</code>&#x5177;&#x6709;&#x81EA;&#x8EAB;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF0C;&#x4F7F;&#x7528;&#x597D;<code>Service Worker</code>&#x7684;&#x5173;&#x952E;&#x662F;&#x7075;&#x6D3B;&#x63A7;&#x5236;&#x5176;&#x751F;&#x547D;&#x5468;&#x671F;&#x3002;</li></ul><h2 id="articleHeader1"><code>Service Worker</code>&#x7684;&#x4F5C;&#x7528;</h2><ul><li>&#x7528;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7F13;&#x5B58;</li><li>&#x5B9E;&#x73B0;&#x79BB;&#x7EBF;<code>Web APP</code></li><li>&#x6D88;&#x606F;&#x63A8;&#x9001;</li></ul><h2 id="articleHeader2"><code>Service Worker</code>&#x517C;&#x5BB9;&#x6027;</h2><p><code>Service Worker</code>&#x662F;&#x73B0;&#x4EE3;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4E00;&#x4E2A;&#x9AD8;&#x7EA7;&#x7279;&#x6027;&#xFF0C;&#x5B83;&#x4F9D;&#x8D56;&#x4E8E;<code>fetch API</code>&#x3001;<code>Cache Storage</code>&#x3001;<code>Promise</code>&#x7B49;&#xFF0C;&#x5176;&#x4E2D;&#xFF0C;<code>Cache</code>&#x63D0;&#x4F9B;&#x4E86;<code>Request / Response</code>&#x5BF9;&#x8C61;&#x5BF9;&#x7684;&#x5B58;&#x50A8;&#x673A;&#x5236;&#xFF0C;<code>Cache Storage</code>&#x5B58;&#x50A8;&#x591A;&#x4E2A;<code>Cache</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016446128?w=2526&amp;h=1028" src="https://static.alili.tech/img/remote/1460000016446128?w=2526&amp;h=1028" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">&#x793A;&#x4F8B;</h2><p>&#x5728;&#x4E86;&#x89E3;<code>Service Worker</code>&#x7684;&#x539F;&#x7406;&#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x6765;&#x770B;&#x4E00;&#x6BB5;<code>Service Worker</code>&#x7684;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.importScripts(&apos;./serviceworker-cache-polyfill.js&apos;);

var urlsToCache = [
  &apos;/&apos;,
  &apos;/index.js&apos;,
  &apos;/style.css&apos;,
  &apos;/favicon.ico&apos;,
];

var CACHE_NAME = &apos;counterxing&apos;;

self.addEventListener(&apos;install&apos;, function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener(&apos;fetch&apos;, function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});


self.addEventListener(&apos;activate&apos;, function(event) {
  var cacheWhitelist = [&apos;counterxing&apos;];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">self.importScripts(<span class="hljs-string">&apos;./serviceworker-cache-polyfill.js&apos;</span>);

<span class="hljs-keyword">var</span> urlsToCache = [
  <span class="hljs-string">&apos;/&apos;</span>,
  <span class="hljs-string">&apos;/index.js&apos;</span>,
  <span class="hljs-string">&apos;/style.css&apos;</span>,
  <span class="hljs-string">&apos;/favicon.ico&apos;</span>,
];

<span class="hljs-keyword">var</span> CACHE_NAME = <span class="hljs-string">&apos;counterxing&apos;</span>;

self.addEventListener(<span class="hljs-string">&apos;install&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cache</span>) </span>{
      <span class="hljs-keyword">return</span> cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener(<span class="hljs-string">&apos;fetch&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  event.respondWith(
    caches.match(event.request)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
      <span class="hljs-keyword">if</span> (response) {
        <span class="hljs-keyword">return</span> response;
      }
      <span class="hljs-keyword">return</span> fetch(event.request);
    })
  );
});


self.addEventListener(<span class="hljs-string">&apos;activate&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">var</span> cacheWhitelist = [<span class="hljs-string">&apos;counterxing&apos;</span>];

  event.waitUntil(
    caches.keys().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cacheNames</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(
        cacheNames.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cacheName</span>) </span>{
          <span class="hljs-keyword">if</span> (cacheWhitelist.indexOf(cacheName) === <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">return</span> caches.delete(cacheName);
          }
        })
      );
    })
  );
});
</code></pre><p>&#x4E0B;&#x9762;&#x5F00;&#x59CB;&#x9010;&#x6BB5;&#x9010;&#x6BB5;&#x5730;&#x5206;&#x6790;&#xFF0C;&#x63ED;&#x5F00;<code>Service Worker</code>&#x7684;&#x795E;&#x79D8;&#x9762;&#x7EB1;&#xFF1A;</p><h2 id="articleHeader4"><code>polyfill</code></h2><p>&#x9996;&#x5148;&#x770B;&#x7B2C;&#x4E00;&#x884C;&#xFF1A;<code>self.importScripts(&apos;./serviceworker-cache-polyfill.js&apos;);</code>&#xFF0C;&#x8FD9;&#x91CC;&#x5F15;&#x5165;&#x4E86;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Cache" rel="nofollow noreferrer" target="_blank">Cache API</a>&#x7684;&#x4E00;&#x4E2A;<a href="https://github.com/dominiccooney/cache-polyfill" rel="nofollow noreferrer" target="_blank">polyfill</a>&#xFF0C;&#x8FD9;&#x4E2A;<code>polyfill</code>&#x652F;&#x6301;&#x4F7F;&#x5F97;&#x5728;&#x8F83;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E0B;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>Cache Storage API</code>&#x3002;&#x60F3;&#x8981;&#x5B9E;&#x73B0;<code>Service Worker</code>&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x9700;&#x8981;&#x642D;&#x914D;<code>Cache API</code>&#x4EE3;&#x7406;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5230;&#x7F13;&#x5B58;&#x4E2D;&#x3002;</p><p>&#x5728;<code>Service Worker</code>&#x7EBF;&#x7A0B;&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;<code>importScripts</code>&#x5F15;&#x5165;<code>polyfill</code>&#x811A;&#x672C;&#xFF0C;&#x76EE;&#x7684;&#x662F;&#x5BF9;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x517C;&#x5BB9;&#x3002;</p><h2 id="articleHeader5"><code>Cache Resources List</code> And <code>Cache Name</code></h2><p>&#x4E4B;&#x540E;&#xFF0C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;<code>urlsToCache</code>&#x5217;&#x8868;&#x6765;&#x58F0;&#x660E;&#x9700;&#x8981;&#x7F13;&#x5B58;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x518D;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x53D8;&#x91CF;<code>CACHE_NAME</code>&#x6765;&#x786E;&#x5B9A;&#x5F53;&#x524D;&#x7F13;&#x5B58;&#x7684;<code>Cache Storage Name</code>&#xFF0C;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x6210;<code>Cache Storage</code>&#x662F;&#x4E00;&#x4E2A;<code>DB</code>&#xFF0C;&#x800C;<code>CACHE_NAME</code>&#x5219;&#x662F;<code>DB</code>&#x540D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var urlsToCache = [
  &apos;/&apos;,
  &apos;/index.js&apos;,
  &apos;/style.css&apos;,
  &apos;/favicon.ico&apos;,
];

var CACHE_NAME = &apos;counterxing&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> urlsToCache = [
  <span class="hljs-string">&apos;/&apos;</span>,
  <span class="hljs-string">&apos;/index.js&apos;</span>,
  <span class="hljs-string">&apos;/style.css&apos;</span>,
  <span class="hljs-string">&apos;/favicon.ico&apos;</span>,
];

<span class="hljs-keyword">var</span> CACHE_NAME = <span class="hljs-string">&apos;counterxing&apos;</span>;</code></pre><h2 id="articleHeader6"><code>Lifecycle</code></h2><p><code>Service Worker</code>&#x72EC;&#x7ACB;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;<code>JavaScript</code>&#x4E3B;&#x7EBF;&#x7A0B;&#xFF0C;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x72EC;&#x7ACB;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#x3002;</p><p>&#x5982;&#x679C;&#x9700;&#x8981;&#x5728;&#x7F51;&#x7AD9;&#x4E0A;&#x5B89;&#x88C5;<code>Service Worker</code>&#xFF0C;&#x5219;&#x9700;&#x8981;&#x5728;<code>JavaScript</code>&#x4E3B;&#x7EBF;&#x7A0B;&#x4E2D;&#x4F7F;&#x7528;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x5F15;&#x5165;<code>Service Worker</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (&apos;serviceWorker&apos; in navigator) {
  navigator.serviceWorker.register(&apos;/sw.js&apos;).then(function(registration) {
    console.log(&apos;&#x6210;&#x529F;&#x5B89;&#x88C5;&apos;, registration.scope);
  }).catch(function(err) {
    console.log(err);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;serviceWorker&apos;</span> <span class="hljs-keyword">in</span> navigator) {
  navigator.serviceWorker.register(<span class="hljs-string">&apos;/sw.js&apos;</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">registration</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6210;&#x529F;&#x5B89;&#x88C5;&apos;</span>, registration.scope);
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.log(err);
  });
}</code></pre><p>&#x6B64;&#x5904;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x6CE8;&#x610F;<code>sw.js</code>&#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x5728;&#x6211;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x5904;&#x4E8E;&#x5F53;&#x524D;&#x57DF;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#xFF0C;<code>Service Worker</code>&#x548C;&#x7F51;&#x7AD9;&#x662F;&#x540C;&#x6E90;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x4E3A;&#x5F53;&#x524D;&#x7F51;&#x7AD9;&#x7684;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#x505A;&#x4EE3;&#x7406;&#xFF0C;&#x5982;&#x679C;<code>Service Worker</code>&#x88AB;&#x6CE8;&#x518C;&#x5230;<code>/imaging/sw.js</code>&#x4E0B;&#xFF0C;&#x90A3;&#x53EA;&#x80FD;&#x4EE3;&#x7406;<code>/imaging</code>&#x4E0B;&#x7684;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x3002;</p><p>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>Chrome</code>&#x63A7;&#x5236;&#x53F0;&#xFF0C;&#x67E5;&#x770B;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;<code>Service Worker</code>&#x60C5;&#x51B5;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016446129" src="https://static.alili.tech/img/remote/1460000016446129" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;<code>Service Worker</code>&#x4F1A;&#x7ECF;&#x5386;&#x4EE5;&#x4E0B;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF1A;</p><ol><li>&#x4E0B;&#x8F7D;&#xFF08;<code>download</code>&#xFF09;</li><li>&#x5B89;&#x88C5;&#xFF08;<code>install</code>&#xFF09;</li><li>&#x6FC0;&#x6D3B;&#xFF08;<code>activate</code>&#xFF09;</li></ol><ul><li>&#x7528;&#x6237;&#x9996;&#x6B21;&#x8BBF;&#x95EE;<code>Service Worker</code>&#x63A7;&#x5236;&#x7684;&#x7F51;&#x7AD9;&#x6216;&#x9875;&#x9762;&#x65F6;&#xFF0C;<code>Service Worker</code>&#x4F1A;&#x7ACB;&#x523B;&#x88AB;&#x4E0B;&#x8F7D;&#x3002;&#x4E4B;&#x540E;&#x81F3;&#x5C11;&#x6BCF;<code>24</code>&#x5C0F;&#x65F6;&#x5B83;&#x4F1A;&#x88AB;&#x4E0B;&#x8F7D;&#x4E00;&#x6B21;&#x3002;&#x5B83;&#x53EF;&#x80FD;&#x88AB;&#x66F4;&#x9891;&#x7E41;&#x5730;&#x4E0B;&#x8F7D;&#xFF0C;&#x4E0D;&#x8FC7;&#x6BCF;<code>24</code>&#x5C0F;&#x65F6;&#x4E00;&#x5B9A;&#x4F1A;&#x88AB;&#x4E0B;&#x8F7D;&#x4E00;&#x6B21;&#xFF0C;&#x4EE5;&#x907F;&#x514D;&#x4E0D;&#x826F;&#x811A;&#x672C;&#x957F;&#x65F6;&#x95F4;&#x751F;&#x6548;&#x3002;</li><li>&#x5728;&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5F00;&#x59CB;&#x5B89;&#x88C5;<code>Service Worker</code>&#xFF0C;&#x5728;&#x5B89;&#x88C5;&#x9636;&#x6BB5;&#xFF0C;&#x901A;&#x5E38;&#x9700;&#x8981;&#x7F13;&#x5B58;&#x4E00;&#x4E9B;&#x6211;&#x4EEC;&#x9884;&#x5148;&#x58F0;&#x660E;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>urlsToCache</code>&#x9884;&#x5148;&#x58F0;&#x660E;&#x3002;</li><li>&#x5728;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x4F1A;&#x5F00;&#x59CB;&#x8FDB;&#x884C;&#x6FC0;&#x6D3B;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x5C1D;&#x8BD5;&#x4E0B;&#x8F7D;<code>Service Worker</code>&#x811A;&#x672C;&#x6587;&#x4EF6;&#xFF0C;&#x4E0B;&#x8F7D;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x4F1A;&#x4E0E;&#x524D;&#x4E00;&#x6B21;&#x5DF2;&#x7F13;&#x5B58;&#x7684;<code>Service Worker</code>&#x811A;&#x672C;&#x6587;&#x4EF6;&#x505A;&#x5BF9;&#x6BD4;&#xFF0C;&#x5982;&#x679C;&#x4E0E;&#x524D;&#x4E00;&#x6B21;&#x7684;<code>Service Worker</code>&#x811A;&#x672C;&#x6587;&#x4EF6;&#x4E0D;&#x540C;&#xFF0C;&#x8BC1;&#x660E;<code>Service Worker</code>&#x5DF2;&#x7ECF;&#x66F4;&#x65B0;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;<code>activate</code>&#x4E8B;&#x4EF6;&#x3002;&#x5B8C;&#x6210;&#x6FC0;&#x6D3B;&#x3002;</li></ul><p>&#x5982;&#x56FE;&#x6240;&#x793A;&#xFF0C;&#x4E3A;<code>Service Worker</code>&#x5927;&#x81F4;&#x7684;&#x751F;&#x547D;&#x5468;&#x671F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016446130?w=686&amp;h=953" src="https://static.alili.tech/img/remote/1460000016446130?w=686&amp;h=953" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader7"><code>install</code></h3><p>&#x5728;&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5C1D;&#x8BD5;&#x7F13;&#x5B58;&#x4E00;&#x4E9B;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener(&apos;install&apos;, function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">self.addEventListener(<span class="hljs-string">&apos;install&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cache</span>) </span>{
      <span class="hljs-keyword">return</span> cache.addAll(urlsToCache);
    })
  );
});</code></pre><p>&#x9996;&#x5148;&#xFF0C;<code>self.skipWaiting()</code>&#x6267;&#x884C;&#xFF0C;&#x544A;&#x77E5;&#x6D4F;&#x89C8;&#x5668;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#x7B49;&#x5F85;&#x9636;&#x6BB5;&#xFF0C;&#x6DD8;&#x6C70;&#x8FC7;&#x671F;&#x7684;<code>sw.js</code>&#x7684;<code>Service Worker</code>&#x811A;&#x672C;&#xFF0C;&#x76F4;&#x63A5;&#x5F00;&#x59CB;&#x5C1D;&#x8BD5;&#x6FC0;&#x6D3B;&#x65B0;&#x7684;<code>Service Worker</code>&#x3002;</p><p>&#x7136;&#x540E;&#x4F7F;&#x7528;<code>caches.open</code>&#x6253;&#x5F00;&#x4E00;&#x4E2A;<code>Cache</code>&#xFF0C;&#x6253;&#x5F00;&#x540E;&#xFF0C;&#x901A;&#x8FC7;<code>cache.addAll</code>&#x5C1D;&#x8BD5;&#x7F13;&#x5B58;&#x6211;&#x4EEC;&#x9884;&#x5148;&#x58F0;&#x660E;&#x7684;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x3002;</p><h3 id="articleHeader8">&#x76D1;&#x542C;<code>fetch</code>&#xFF0C;&#x4EE3;&#x7406;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;</h3><p>&#x9875;&#x9762;&#x7684;&#x6240;&#x6709;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x90FD;&#x4F1A;&#x901A;&#x8FC7;<code>Service Worker</code>&#x7684;<code>fetch</code>&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#xFF0C;<code>Service Worker</code>&#x901A;&#x8FC7;<code>caches.match</code>&#x5C1D;&#x8BD5;&#x4ECE;<code>Cache</code>&#x4E2D;&#x67E5;&#x627E;&#x7F13;&#x5B58;&#xFF0C;&#x7F13;&#x5B58;&#x5982;&#x679C;&#x547D;&#x4E2D;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#x4E2D;&#x7684;<code>response</code>&#xFF0C;&#x5426;&#x5219;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x771F;&#x5B9E;&#x7684;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener(&apos;fetch&apos;, function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">self.addEventListener(<span class="hljs-string">&apos;fetch&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  event.respondWith(
    caches.match(event.request)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
      <span class="hljs-keyword">if</span> (response) {
        <span class="hljs-keyword">return</span> response;
      }
      <span class="hljs-keyword">return</span> fetch(event.request);
    })
  );
});</code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5728;&#x8BF7;&#x6C42;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x518D;&#x5411;<code>Cache Storage</code>&#x4E2D;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x7F13;&#x5B58;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>cache.put</code>&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#xFF0C;&#x770B;&#x4EE5;&#x4E0B;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener(&apos;fetch&apos;, function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      // &#x7F13;&#x5B58;&#x547D;&#x4E2D;
      if (response) {
        return response;
      }

      // &#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x5FC5;&#x987B;&#x4F7F;&#x7528;clone&#x65B9;&#x6CD5;&#x514B;&#x9686;&#x8FD9;&#x4E2A;&#x8BF7;&#x6C42;
      // &#x539F;&#x56E0;&#x662F;response&#x662F;&#x4E00;&#x4E2A;Stream&#xFF0C;&#x4E3A;&#x4E86;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x8DDF;&#x7F13;&#x5B58;&#x90FD;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;response
      // &#x5FC5;&#x987B;&#x514B;&#x9686;&#x8FD9;&#x4E2A;response&#xFF0C;&#x4E00;&#x4EFD;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E00;&#x4EFD;&#x5230;&#x7F13;&#x5B58;&#x4E2D;&#x7F13;&#x5B58;&#x3002;
      // &#x53EA;&#x80FD;&#x88AB;&#x6D88;&#x8D39;&#x4E00;&#x6B21;&#xFF0C;&#x60F3;&#x8981;&#x518D;&#x6B21;&#x6D88;&#x8D39;&#xFF0C;&#x5FC5;&#x987B;clone&#x4E00;&#x6B21;
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          // &#x5FC5;&#x987B;&#x662F;&#x6709;&#x6548;&#x8BF7;&#x6C42;&#xFF0C;&#x5FC5;&#x987B;&#x662F;&#x540C;&#x6E90;&#x54CD;&#x5E94;&#xFF0C;&#x7B2C;&#x4E09;&#x65B9;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x53EF;&#x63A7;&#xFF0C;&#x6700;&#x597D;&#x4E0D;&#x8981;&#x7F13;&#x5B58;
          if (!response || response.status !== 200 || response.type !== &apos;basic&apos;) {
            return response;
          }

          // &#x6D88;&#x8D39;&#x8FC7;&#x4E00;&#x6B21;&#xFF0C;&#x53C8;&#x9700;&#x8981;&#x518D;&#x514B;&#x9686;&#x4E00;&#x6B21;
          var responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
          return response;
        }
      );
    })
  );
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">self.addEventListener(<span class="hljs-string">&apos;fetch&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  event.respondWith(
    caches.match(event.request)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
      <span class="hljs-comment">// &#x7F13;&#x5B58;&#x547D;&#x4E2D;</span>
      <span class="hljs-keyword">if</span> (response) {
        <span class="hljs-keyword">return</span> response;
      }

      <span class="hljs-comment">// &#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x5FC5;&#x987B;&#x4F7F;&#x7528;clone&#x65B9;&#x6CD5;&#x514B;&#x9686;&#x8FD9;&#x4E2A;&#x8BF7;&#x6C42;</span>
      <span class="hljs-comment">// &#x539F;&#x56E0;&#x662F;response&#x662F;&#x4E00;&#x4E2A;Stream&#xFF0C;&#x4E3A;&#x4E86;&#x8BA9;&#x6D4F;&#x89C8;&#x5668;&#x8DDF;&#x7F13;&#x5B58;&#x90FD;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;response</span>
      <span class="hljs-comment">// &#x5FC5;&#x987B;&#x514B;&#x9686;&#x8FD9;&#x4E2A;response&#xFF0C;&#x4E00;&#x4EFD;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E00;&#x4EFD;&#x5230;&#x7F13;&#x5B58;&#x4E2D;&#x7F13;&#x5B58;&#x3002;</span>
      <span class="hljs-comment">// &#x53EA;&#x80FD;&#x88AB;&#x6D88;&#x8D39;&#x4E00;&#x6B21;&#xFF0C;&#x60F3;&#x8981;&#x518D;&#x6B21;&#x6D88;&#x8D39;&#xFF0C;&#x5FC5;&#x987B;clone&#x4E00;&#x6B21;</span>
      <span class="hljs-keyword">var</span> fetchRequest = event.request.clone();

      <span class="hljs-keyword">return</span> fetch(fetchRequest).then(
        <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
          <span class="hljs-comment">// &#x5FC5;&#x987B;&#x662F;&#x6709;&#x6548;&#x8BF7;&#x6C42;&#xFF0C;&#x5FC5;&#x987B;&#x662F;&#x540C;&#x6E90;&#x54CD;&#x5E94;&#xFF0C;&#x7B2C;&#x4E09;&#x65B9;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x53EF;&#x63A7;&#xFF0C;&#x6700;&#x597D;&#x4E0D;&#x8981;&#x7F13;&#x5B58;</span>
          <span class="hljs-keyword">if</span> (!response || response.status !== <span class="hljs-number">200</span> || response.type !== <span class="hljs-string">&apos;basic&apos;</span>) {
            <span class="hljs-keyword">return</span> response;
          }

          <span class="hljs-comment">// &#x6D88;&#x8D39;&#x8FC7;&#x4E00;&#x6B21;&#xFF0C;&#x53C8;&#x9700;&#x8981;&#x518D;&#x514B;&#x9686;&#x4E00;&#x6B21;</span>
          <span class="hljs-keyword">var</span> responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cache</span>) </span>{
              cache.put(event.request, responseToCache);
            });
          <span class="hljs-keyword">return</span> response;
        }
      );
    })
  );
});</code></pre><blockquote>&#x5728;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x6CE8;&#x610F;&#x63A7;&#x5236;&#x7F13;&#x5B58;&#xFF0C;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x4E00;&#x822C;&#x662F;&#x4E0D;&#x63A8;&#x8350;&#x7F13;&#x5B58;&#x7684;&#x3002;&#x6240;&#x4EE5;&#x5728;&#x6211;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5728;&#x8FD9;&#x91CC;&#x505A;&#x52A8;&#x6001;&#x7684;&#x7F13;&#x5B58;&#x65B9;&#x6848;&#x3002;</blockquote><h3 id="articleHeader9"><code>activate</code></h3><p><code>Service Worker</code>&#x603B;&#x6709;&#x9700;&#x8981;&#x66F4;&#x65B0;&#x7684;&#x4E00;&#x5929;&#xFF0C;&#x968F;&#x7740;&#x7248;&#x672C;&#x8FED;&#x4EE3;&#xFF0C;&#x67D0;&#x4E00;&#x5929;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A;&#x65B0;&#x7248;&#x672C;&#x7684;&#x529F;&#x80FD;&#x53D1;&#x5E03;&#x4E0A;&#x7EBF;&#xFF0C;&#x6B64;&#x65F6;&#x9700;&#x8981;&#x6DD8;&#x6C70;&#x6389;&#x65E7;&#x7684;&#x7F13;&#x5B58;&#xFF0C;&#x65E7;&#x7684;<code>Service Worker</code>&#x548C;<code>Cache Storage</code>&#x5982;&#x4F55;&#x6DD8;&#x6C70;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener(&apos;activate&apos;, function(event) {
  var cacheWhitelist = [&apos;counterxing&apos;];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">self.addEventListener(<span class="hljs-string">&apos;activate&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">var</span> cacheWhitelist = [<span class="hljs-string">&apos;counterxing&apos;</span>];

  event.waitUntil(
    caches.keys().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cacheNames</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(
        cacheNames.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cacheName</span>) </span>{
          <span class="hljs-keyword">if</span> (cacheWhitelist.indexOf(cacheName) === <span class="hljs-number">-1</span>) {
            <span class="hljs-keyword">return</span> caches.delete(cacheName);
          }
        })
      );
    })
  );
});</code></pre><ol><li>&#x9996;&#x5148;&#x6709;&#x4E00;&#x4E2A;&#x767D;&#x540D;&#x5355;&#xFF0C;&#x767D;&#x540D;&#x5355;&#x4E2D;&#x7684;<code>Cache</code>&#x662F;&#x4E0D;&#x88AB;&#x6DD8;&#x6C70;&#x7684;&#x3002;</li><li>&#x4E4B;&#x540E;&#x901A;&#x8FC7;<code>caches.keys()</code>&#x62FF;&#x5230;&#x6240;&#x6709;&#x7684;<code>Cache Storage</code>&#xFF0C;&#x628A;&#x4E0D;&#x5728;&#x767D;&#x540D;&#x5355;&#x4E2D;&#x7684;<code>Cache</code>&#x6DD8;&#x6C70;&#x3002;</li><li>&#x6DD8;&#x6C70;&#x4F7F;&#x7528;<code>caches.delete()</code>&#x65B9;&#x6CD5;&#x3002;&#x5B83;&#x63A5;&#x6536;<code>cacheName</code>&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5220;&#x9664;&#x8BE5;<code>cacheName</code>&#x6240;&#x6709;&#x7F13;&#x5B58;&#x3002;</li></ol><h2 id="articleHeader10">sw-precache-webpack-plugin</h2><p><a href="https://github.com/goldhand/sw-precache-webpack-plugin" rel="nofollow noreferrer" target="_blank">sw-precache-webpack-plugin</a>&#x662F;&#x4E00;&#x4E2A;<code>webpack plugin</code>&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x914D;&#x7F6E;&#x7684;&#x65B9;&#x5F0F;&#x5728;<code>webpack</code>&#x6253;&#x5305;&#x65F6;&#x751F;&#x6210;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;<code>sw.js</code>&#x7684;<code>Service Worker</code>&#x811A;&#x672C;&#x3002;</p><p>&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x914D;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&apos;path&apos;);
var SWPrecacheWebpackPlugin = require(&apos;sw-precache-webpack-plugin&apos;);

const PUBLIC_PATH = &apos;https://www.my-project-name.com/&apos;;  // webpack needs the trailing slash for output.publicPath

module.exports = {

  entry: {
    main: path.resolve(__dirname, &apos;src/index&apos;),
  },

  output: {
    path: path.resolve(__dirname, &apos;src/bundles/&apos;),
    filename: &apos;[name]-[hash].js&apos;,
    publicPath: PUBLIC_PATH,
  },

  plugins: [
    new SWPrecacheWebpackPlugin(
      {
        cacheId: &apos;my-project-name&apos;,
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: &apos;service-worker.js&apos;,
        minify: true,
        navigateFallback: PUBLIC_PATH + &apos;index.html&apos;,
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }
    ),
  ],
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">var</span> SWPrecacheWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;sw-precache-webpack-plugin&apos;</span>);

<span class="hljs-keyword">const</span> PUBLIC_PATH = <span class="hljs-string">&apos;https://www.my-project-name.com/&apos;</span>;  <span class="hljs-comment">// webpack needs the trailing slash for output.publicPath</span>

<span class="hljs-built_in">module</span>.exports = {

  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">main</span>: path.resolve(__dirname, <span class="hljs-string">&apos;src/index&apos;</span>),
  },

  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;src/bundles/&apos;</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name]-[hash].js&apos;</span>,
    <span class="hljs-attr">publicPath</span>: PUBLIC_PATH,
  },

  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> SWPrecacheWebpackPlugin(
      {
        <span class="hljs-attr">cacheId</span>: <span class="hljs-string">&apos;my-project-name&apos;</span>,
        <span class="hljs-attr">dontCacheBustUrlsMatching</span>: <span class="hljs-regexp">/\.\w{8}\./</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;service-worker.js&apos;</span>,
        <span class="hljs-attr">minify</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">navigateFallback</span>: PUBLIC_PATH + <span class="hljs-string">&apos;index.html&apos;</span>,
        <span class="hljs-attr">staticFileGlobsIgnorePatterns</span>: [<span class="hljs-regexp">/\.map$/</span>, /asset-manifest\.json$/],
      }
    ),
  ],
}</code></pre><p>&#x5728;&#x6267;&#x884C;<code>webpack</code>&#x6253;&#x5305;&#x540E;&#xFF0C;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;<code>service-worker.js</code>&#x6587;&#x4EF6;&#xFF0C;&#x7528;&#x4E8E;&#x7F13;&#x5B58;<code>webpack</code>&#x6253;&#x5305;&#x540E;&#x7684;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x3002;</p><p>&#x4E00;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;<a href="https://github.com/goldhand/sw-precache-webpack-plugin/tree/master/examples" rel="nofollow noreferrer" target="_blank">&#x793A;&#x4F8B;</a>&#x3002;</p><h2 id="articleHeader11"><code>Service Worker Cache</code> VS <code>Http Cache</code></h2><p>&#x5BF9;&#x6BD4;&#x8D77;<code>Http Header</code>&#x7F13;&#x5B58;&#xFF0C;<code>Service Worker</code>&#x914D;&#x5408;<code>Cache Storage</code>&#x4E5F;&#x6709;&#x81EA;&#x5DF1;&#x7684;&#x4F18;&#x52BF;&#xFF1A;</p><ol><li>&#x7F13;&#x5B58;&#x4E0E;&#x66F4;&#x65B0;&#x5E76;&#x5B58;&#xFF1A;&#x6BCF;&#x6B21;&#x66F4;&#x65B0;&#x7248;&#x672C;&#xFF0C;&#x501F;&#x52A9;<code>Service Worker</code>&#x53EF;&#x4EE5;&#x7ACB;&#x9A6C;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x8FD4;&#x56DE;&#xFF0C;&#x4F46;&#x4E0E;&#x6B64;&#x540C;&#x65F6;&#x53EF;&#x4EE5;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#xFF0C;&#x6821;&#x9A8C;&#x662F;&#x5426;&#x6709;&#x65B0;&#x7248;&#x672C;&#x66F4;&#x65B0;&#x3002;</li><li>&#x65E0;&#x4FB5;&#x5165;&#x5F0F;&#xFF1A;<code>hash</code>&#x503C;&#x5B9E;&#x5728;&#x662F;&#x592A;&#x96BE;&#x770B;&#x4E86;&#x3002;</li><li>&#x4E0D;&#x6613;&#x88AB;&#x51B2;&#x6389;&#xFF1A;<code>Http</code>&#x7F13;&#x5B58;&#x5BB9;&#x6613;&#x88AB;&#x51B2;&#x6389;&#xFF0C;&#x4E5F;&#x5BB9;&#x6613;&#x8FC7;&#x671F;&#xFF0C;&#x800C;<code>Cache Storage</code>&#x5219;&#x4E0D;&#x5BB9;&#x6613;&#x88AB;&#x51B2;&#x6389;&#x3002;&#x4E5F;&#x6CA1;&#x6709;&#x8FC7;&#x671F;&#x65F6;&#x95F4;&#x7684;&#x8BF4;&#x6CD5;&#x3002;</li><li>&#x79BB;&#x7EBF;&#xFF1A;&#x501F;&#x52A9;<code>Service Worker</code>&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x79BB;&#x7EBF;&#x8BBF;&#x95EE;&#x5E94;&#x7528;&#x3002;</li></ol><p>&#x4F46;&#x662F;&#x7F3A;&#x70B9;&#x662F;&#xFF0C;&#x7531;&#x4E8E;<code>Service Worker</code>&#x4F9D;&#x8D56;&#x4E8E;<code>fetch API</code>&#x3001;&#x4F9D;&#x8D56;&#x4E8E;<code>Promise</code>&#x3001;<code>Cache Storage</code>&#x7B49;&#xFF0C;&#x517C;&#x5BB9;&#x6027;&#x4E0D;&#x592A;&#x597D;&#x3002;</p><h2 id="articleHeader12">&#x540E;&#x8BDD;</h2><p>&#x672C;&#x6587;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x603B;&#x7ED3;&#x4E86;<code>Service Worker</code>&#x7684;&#x57FA;&#x672C;&#x4F7F;&#x7528;&#x548C;&#x4F7F;&#x7528;<code>Service Worker</code>&#x505A;&#x5BA2;&#x6237;&#x7AEF;&#x7F13;&#x5B58;&#x7684;&#x7B80;&#x5355;&#x65B9;&#x5F0F;&#xFF0C;&#x7136;&#x800C;&#xFF0C;<code>Service Worker</code>&#x7684;&#x4F5C;&#x7528;&#x8FDC;&#x4E0D;&#x6B62;&#x4E8E;&#x6B64;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;&#x501F;&#x52A9;<code>Service Worker</code>&#x505A;&#x79BB;&#x7EBF;&#x5E94;&#x7528;&#x3001;&#x7528;&#x4E8E;&#x505A;&#x7F51;&#x7EDC;&#x5E94;&#x7528;&#x7684;&#x63A8;&#x9001;&#xFF08;&#x53EF;&#x53C2;&#x8003;<a href="https://developers.google.com/web/fundamentals/codelabs/push-notifications/" rel="nofollow noreferrer" target="_blank">push-notifications</a>&#xFF09;&#x7B49;&#x3002;</p><p>&#x751A;&#x81F3;&#x53EF;&#x4EE5;&#x501F;&#x52A9;<code>Service Worker</code>&#xFF0C;&#x5BF9;&#x63A5;&#x53E3;&#x8FDB;&#x884C;&#x7F13;&#x5B58;&#xFF0C;&#x5728;&#x6211;&#x6240;&#x5728;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;&#x5E76;&#x4E0D;&#x4F1A;&#x505A;&#x7684;&#x8FD9;&#x4E48;&#x590D;&#x6742;&#x3002;&#x4E0D;&#x8FC7;&#x505A;&#x63A5;&#x53E3;&#x7F13;&#x5B58;&#x7684;&#x597D;&#x5904;&#x662F;&#x652F;&#x6301;&#x79BB;&#x7EBF;&#x8BBF;&#x95EE;&#xFF0C;&#x5BF9;&#x79BB;&#x7EBF;&#x72B6;&#x6001;&#x4E0B;&#x4E5F;&#x80FD;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#x6211;&#x4EEC;&#x7684;<code>Web</code>&#x5E94;&#x7528;&#x3002;</p><p><code>Cache Storage</code>&#x548C;<code>Service Worker</code>&#x603B;&#x662F;&#x5206;&#x4E0D;&#x5F00;&#x7684;&#x3002;<code>Service Worker</code>&#x7684;&#x6700;&#x4F73;&#x7528;&#x6CD5;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x914D;&#x5408;<code>Cache Storage</code>&#x505A;&#x79BB;&#x7EBF;&#x7F13;&#x5B58;&#x3002;&#x501F;&#x52A9;&#x4E8E;<code>Service Worker</code>&#xFF0C;&#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x5B9E;&#x73B0;&#x5BF9;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x7684;&#x63A7;&#x5236;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x91C7;&#x53D6;&#x4E0D;&#x540C;&#x7684;&#x7B56;&#x7565;&#x3002;&#x4F8B;&#x5982;&#x5BF9;&#x4E8E;<code>Cache</code>&#x7684;&#x7B56;&#x7565;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x662F;&#x5B58;&#x5728;&#x591A;&#x79CD;&#x60C5;&#x51B5;&#x3002;&#x4F8B;&#x5982;&#x53EF;&#x4EE5;&#x4F18;&#x5148;&#x4F7F;&#x7528;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x5728;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#x5931;&#x8D25;&#x65F6;&#x518D;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x3001;&#x4EA6;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x4F7F;&#x7528;&#x7F13;&#x5B58;&#x548C;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x4E00;&#x65B9;&#x9762;&#x68C0;&#x67E5;&#x8BF7;&#x6C42;&#xFF0C;&#x4E00;&#x65B9;&#x9762;&#x6709;&#x68C0;&#x67E5;&#x7F13;&#x5B58;&#xFF0C;&#x7136;&#x540E;&#x770B;&#x4E24;&#x4E2A;&#x8C01;&#x5FEB;&#xFF0C;&#x5C31;&#x7528;&#x8C01;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Service Worker学习与实践

## 原文链接
[https://segmentfault.com/a/1190000016446125](https://segmentfault.com/a/1190000016446125)


---
title: '借助 workbox 将网站升级成 PWA' 
date: 2018-11-29 9:33:05
hidden: true
slug: c85bpkj84fe
categories: [reprint]
---

{{< raw >}}

                    
<p>PWA&#xFF08;Progressive Web Apps&#xFF09;&#x662F;&#x8C37;&#x6B4C;&#x8FD1;&#x51E0;&#x5E74;&#x4E00;&#x76F4;&#x5728;&#x63A8;&#x8FDB;&#x7684; web &#x5E94;&#x7528;&#x65B0;&#x6A21;&#x578B;&#x3002;PWA  &#x501F;&#x52A9; Service Worker &#x7F13;&#x5B58;&#x7F51;&#x7AD9;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x751A;&#x81F3;&#x662F;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x4F7F;&#x7F51;&#x7AD9;&#x5728;&#x79BB;&#x7EBF;&#x65F6;&#x4E5F;&#x80FD;&#x8BBF;&#x95EE;&#x3002;&#x5E76;&#x4E14;&#x6211;&#x4EEC;&#x80FD;&#x591F;&#x4E3A;&#x7F51;&#x7AD9;&#x6307;&#x5B9A;&#x4E00;&#x4E2A;&#x56FE;&#x6807;&#x6DFB;&#x52A0;&#x5728;&#x624B;&#x673A;&#x684C;&#x9762;&#xFF0C;&#x5B9E;&#x73B0;&#x70B9;&#x51FB;&#x684C;&#x9762;&#x56FE;&#x6807;&#x5373;&#x53EF;&#x8BBF;&#x95EE;&#x7F51;&#x7AD9;&#x3002;</p>
<h1 id="articleHeader0"><a href="https://developers.google.com/web/fundamentals/web-app-manifest/?hl=zh-cn" rel="nofollow noreferrer" target="_blank">Web App Manifest</a></h1>
<p><code>Web App Manifest</code> &#x662F;&#x4E00;&#x4E2A; <code>JSON</code> &#x6587;&#x4EF6;&#xFF0C;&#x5B83;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x7F51;&#x7AD9;&#x6DFB;&#x52A0;&#x5230;&#x684C;&#x9762;&#x7684;&#x56FE;&#x6807;&#x4EE5;&#x53CA;&#x4ECE;&#x684C;&#x9762;&#x56FE;&#x6807;&#x8FDB;&#x5165;&#x7F51;&#x7AD9;&#x65F6;&#x7684;&#x4E00;&#x7CFB;&#x5217;&#x884C;&#x4E3A;&#xFF0C;&#x5982;&#xFF1A;&#x542F;&#x52A8;&#x6837;&#x5F0F;&#xFF0C;&#x5168;&#x5C4F;&#x4E3B;&#x9898;&#x7B49;&#x3002;</p>
<p>&#x5148;&#x521B;&#x5EFA; <code>manifest.json</code>&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;blog-pwa&quot;,
  &quot;short_name&quot;: &quot;blog-pwa&quot;,
  &quot;icons&quot;: [
    {
      &quot;src&quot;: &quot;/img/icons/android-chrome-192x192.png&quot;,
      &quot;sizes&quot;: &quot;192x192&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    },
    {
      &quot;src&quot;: &quot;/img/icons/android-chrome-512x512.png&quot;,
      &quot;sizes&quot;: &quot;512x512&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    }
  ],
  &quot;start_url&quot;: &quot;/index.html&quot;,
  &quot;display&quot;: &quot;standalone&quot;,
  &quot;background_color&quot;: &quot;#000000&quot;,
  &quot;theme_color&quot;: &quot;#4DBA87&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">&quot;name&quot;</span>: <span class="hljs-string">&quot;blog-pwa&quot;</span>,
  <span class="hljs-attr">&quot;short_name&quot;</span>: <span class="hljs-string">&quot;blog-pwa&quot;</span>,
  <span class="hljs-attr">&quot;icons&quot;</span>: [
    {
      <span class="hljs-attr">&quot;src&quot;</span>: <span class="hljs-string">&quot;/img/icons/android-chrome-192x192.png&quot;</span>,
      <span class="hljs-attr">&quot;sizes&quot;</span>: <span class="hljs-string">&quot;192x192&quot;</span>,
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;image/png&quot;</span>
    },
    {
      <span class="hljs-attr">&quot;src&quot;</span>: <span class="hljs-string">&quot;/img/icons/android-chrome-512x512.png&quot;</span>,
      <span class="hljs-attr">&quot;sizes&quot;</span>: <span class="hljs-string">&quot;512x512&quot;</span>,
      <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;image/png&quot;</span>
    }
  ],
  <span class="hljs-attr">&quot;start_url&quot;</span>: <span class="hljs-string">&quot;/index.html&quot;</span>,
  <span class="hljs-attr">&quot;display&quot;</span>: <span class="hljs-string">&quot;standalone&quot;</span>,
  <span class="hljs-attr">&quot;background_color&quot;</span>: <span class="hljs-string">&quot;#000000&quot;</span>,
  <span class="hljs-attr">&quot;theme_color&quot;</span>: <span class="hljs-string">&quot;#4DBA87&quot;</span>
}</code></pre>
<p>&#x5C06;&#x6587;&#x4EF6;&#x5F15;&#x5165;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;link rel=manifest href=/manifest.json&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">manifest</span> <span class="hljs-attr">href</span>=<span class="hljs-string">/manifest.json</span>&gt;</span></code></pre>
<p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x4E0A;&#x770B;&#x6211;&#x4EEC;&#x7684;&#x914D;&#x7F6E;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbjfJ?w=1128&amp;h=1152" src="https://static.alili.tech/img/bVbbjfJ?w=1128&amp;h=1152" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p><code>icons</code> &#x5C5E;&#x6027;&#x5B9A;&#x4E49;&#x4E86;&#x6DFB;&#x52A0;&#x5230;&#x684C;&#x9762;&#x7684;&#x56FE;&#x6807;&#xFF0C; <code>display: standalone</code> &#x8868;&#x793A;&#x6211;&#x4EEC;&#x8981;&#x4ECE;&#x684C;&#x9762;&#x5168;&#x5C4F;&#x542F;&#x52A8;&#xFF0C;<code>theme_color&quot;: &quot;#4DBA87</code> &#x662F;&#x5168;&#x5C4F;&#x542F;&#x52A8;&#x65F6;&#x624B;&#x673A;&#x9876;&#x90E8;&#x72B6;&#x6001;&#x680F;&#x7684;&#x80CC;&#x666F;&#x8272;&#xFF0C;<code>background_color&quot;: &quot;#000000</code> &#x662F;&#x542F;&#x52A8;&#x9875;&#x7684;&#x80CC;&#x666F;&#x8272;&#xFF0C;&#x542F;&#x52A8;&#x9875;&#x76EE;&#x524D;&#x4E0D;&#x80FD;&#x5B9A;&#x5236;&#xFF0C;&#x9ED8;&#x8BA4;&#x7531; <code>background_color</code> &#x52A0; <code>icon</code> &#x52A0; <code>name</code> &#x7EC4;&#x5408;&#x800C;&#x6210;&#x3002;</p>
<p><code>Web App Manifest</code>&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x53EA;&#x8981;&#x7167;&#x7740;&#x6587;&#x6863;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x770B;&#x4E00;&#x904D;&#x5C31;&#x884C;&#x3002;</p>
<h1 id="articleHeader1"><a href="https://developers.google.com/web/fundamentals/primers/service-workers/?hl=zh-cn" rel="nofollow noreferrer" target="_blank">Service Worker</a></h1>
<p><code>Service Worker</code> &#x662F;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x540E;&#x53F0;&#x72EC;&#x7ACB;&#x4E8E;&#x7F51;&#x9875;&#x8FD0;&#x884C;&#x7684;&#x811A;&#x672C;&#x3002;&#x662F;&#x5B83;&#x8BA9; PWA &#x62E5;&#x6709;&#x6781;&#x5FEB;&#x7684;&#x8BBF;&#x95EE;&#x901F;&#x5EA6;&#x548C;&#x79BB;&#x7EBF;&#x8FD0;&#x884C;&#x80FD;&#x529B;&#x3002;</p>
<p>&#x90A3;&#x5B83;&#x662F;&#x5982;&#x4F55;&#x505A;&#x5230;&#x7684;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x4E00;&#x6B65;&#x6B65;&#x6765;&#x770B;&#x3002;</p>
<h2 id="articleHeader2">&#x6CE8;&#x518C; <code>Service Worker</code>
</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (&apos;serviceWorker&apos; in navigator) {
  navigator.serviceWorker
    .register(&apos;/service-worker.js&apos;)
    .then(registration =&gt; {
      console.log(
        &apos;ServiceWorker registration successful with scope: &apos;,
        registration.scope
      )
    })
    .catch(err =&gt; {
      console.log(&apos;ServiceWorker registration failed: &apos;, err)
    })
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;serviceWorker&apos;</span> <span class="hljs-keyword">in</span> navigator) {
  navigator.serviceWorker
    .register(<span class="hljs-string">&apos;/service-worker.js&apos;</span>)
    .then(<span class="hljs-function"><span class="hljs-params">registration</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(
        <span class="hljs-string">&apos;ServiceWorker registration successful with scope: &apos;</span>,
        registration.scope
      )
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;ServiceWorker registration failed: &apos;</span>, err)
    })
}</code></pre>
<p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;<code>Service Worker</code> &#x811A;&#x672C;&#x9664;&#x4E86;&#x57DF;&#x540D;&#x4E3A; <code>localhost</code> &#x65F6;&#x80FD;&#x8FD0;&#x884C;&#x5728; <code>http</code> &#x534F;&#x8BAE;&#x4E0B;&#x4EE5;&#x5916;&#xFF0C;&#x53EA;&#x80FD;&#x8FD0;&#x884C; <code>https</code> &#x534F;&#x8BAE;&#x4E0B;&#x3002;</p>
<h2 id="articleHeader3">&#x5B89;&#x88C5;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CACHE_NAME = &apos;cache-v1&apos;
const DATA_CACHE_NAME = &apos;data-cache-v1&apos;

const PRE_CACHE = [&apos;/index.html&apos;, &apos;/css/app.css&apos;, &apos;/js/app.js&apos;]

self.addEventListener(&apos;install&apos;, e =&gt; {
  console.log(&apos;[ServiceWorker] Install&apos;)
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =&gt; {
      return cache.addAll(PRE_CACHE)
    })
  )
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> CACHE_NAME = <span class="hljs-string">&apos;cache-v1&apos;</span>
<span class="hljs-keyword">const</span> DATA_CACHE_NAME = <span class="hljs-string">&apos;data-cache-v1&apos;</span>

<span class="hljs-keyword">const</span> PRE_CACHE = [<span class="hljs-string">&apos;/index.html&apos;</span>, <span class="hljs-string">&apos;/css/app.css&apos;</span>, <span class="hljs-string">&apos;/js/app.js&apos;</span>]

self.addEventListener(<span class="hljs-string">&apos;install&apos;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;[ServiceWorker] Install&apos;</span>)
  e.waitUntil(
    caches.open(CACHE_NAME).then(<span class="hljs-function"><span class="hljs-params">cache</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> cache.addAll(PRE_CACHE)
    })
  )
})</code></pre>
<p>&#x5728;&#x5B89;&#x88C5;&#x7684;&#x65F6;&#x5019;&#x9884;&#x7F13;&#x5B58;&#x7F51;&#x7AD9;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x4EFB;&#x4F55;&#x8D44;&#x6E90;&#x8DEF;&#x5F84;&#x51FA;&#x9519;&#x90FD;&#x4F1A;&#x9020;&#x6210; <code>Service Worker</code> &#x5B89;&#x88C5;&#x5931;&#x8D25;&#x3002;</p>
<h2 id="articleHeader4">&#x4EE3;&#x7406;&#x8BF7;&#x6C42;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener(&apos;fetch&apos;, e =&gt; {
  e.respondWith(
    caches.match(e.request).then(response =&gt; {
      if (response) {
        return response
      }

      const fetchRequest = e.request.clone()

      return fetch(fetchRequest).then(response =&gt; {
        // Check if we received a valid response
        if (!response || response.status !== 200) {
          return response
        }

        const responseToCache = response.clone()

        caches.open(DATA_CACHE_NAME).then(cache =&gt; {
          cache.put(e.request, responseToCache)
        })

        return response
      })
    })
  )
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs typescript"><code>self.addEventListener(<span class="hljs-string">&apos;fetch&apos;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  e.respondWith(
    caches.match(e.request).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (response) {
        <span class="hljs-keyword">return</span> response
      }

      <span class="hljs-keyword">const</span> fetchRequest = e.request.clone()

      <span class="hljs-keyword">return</span> fetch(fetchRequest).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-comment">// Check if we received a valid response</span>
        <span class="hljs-keyword">if</span> (!response || response.status !== <span class="hljs-number">200</span>) {
          <span class="hljs-keyword">return</span> response
        }

        <span class="hljs-keyword">const</span> responseToCache = response.clone()

        caches.open(DATA_CACHE_NAME).then(<span class="hljs-function"><span class="hljs-params">cache</span> =&gt;</span> {
          cache.put(e.request, responseToCache)
        })

        <span class="hljs-keyword">return</span> response
      })
    })
  )
})</code></pre>
<p>&#x5B89;&#x88C5;&#x6210;&#x529F;&#x540E;&#xFF0C;<code>Service Worker</code> &#x5C31;&#x53EF;&#x4EE5;&#x76D1;&#x542C;&#x7F51;&#x7AD9;&#x7684;&#x6240;&#x6709;&#x8BF7;&#x6C42;&#xFF0C;&#x5339;&#x914D;&#x5230;&#x7F13;&#x5B58;&#x65F6;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#xFF0C;&#x672A;&#x5339;&#x914D;&#x5230;&#x65F6;&#x8BF7;&#x6C42;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x6210;&#x529F;&#x8FD4;&#x56DE;&#x65F6;&#x6DFB;&#x52A0;&#x5230;&#x7F13;&#x5B58;&#x3002;</p>
<h2 id="articleHeader5">&#x66F4;&#x65B0;</h2>
<p>&#x73B0;&#x5728;&#x7F51;&#x7AD9;&#x7684; <code>Service Worker</code> &#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#x4E86;&#xFF0C;&#x90A3;&#x5982;&#x4F55;&#x66F4;&#x65B0;&#x5B83;&#x5462;&#xFF1F;</p>
<p>&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x8981;&#x4FEE;&#x6539; <code>Service Worker</code> &#x6587;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x66F4;&#x65B0;&#x5B83;&#x3002;&#x5F53;&#x6211;&#x4EEC;&#x6BCF;&#x6B21;&#x8BBF;&#x95EE;&#x7F51;&#x7AD9;&#x65F6;&#x90FD;&#x4F1A;&#x53BB;&#x4E0B;&#x8F7D;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5F53;&#x53D1;&#x73B0;&#x6587;&#x4EF6;&#x4E0D;&#x4E00;&#x81F4;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x5B89;&#x88C5;&#x8FD9;&#x4E2A;&#x65B0; <code>Service Worker</code> &#xFF0C;&#x5B89;&#x88C5;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x5B83;&#x5C06;&#x8FDB;&#x5165;&#x7B49;&#x5F85;&#x9636;&#x6BB5;&#x3002;&#x5F53;&#x6211;&#x4EEC;&#x5173;&#x95ED;&#x7A97;&#x53E3;&#x91CD;&#x65B0;&#x5BFC;&#x822A;&#x5230;&#x7F51;&#x7AD9;&#x65F6;&#xFF08;&#x5237;&#x65B0;&#x7F51;&#x9875;&#x4E0D;&#x884C;&#xFF09;&#xFF0C;&#x65B0; <code>Service Worker</code> &#x5C06;&#x5F00;&#x59CB;&#x63A7;&#x5236;&#x7F51;&#x7AD9;&#x3002;&#x65E7; <code>Service Worker</code> &#x7EC8;&#x6B62;&#x5DE5;&#x4F5C;&#x5E76;&#x89E6;&#x53D1; <code>activate</code> &#x4E8B;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="self.addEventListener(&apos;activate&apos;, e =&gt; {
  e.waitUntil(
    caches.keys().then(keyList =&gt; {
      return Promise.all(
        keyList.map(key =&gt; {
          if (key !== CACHE_NAME &amp;&amp; key !== DATA_CACHE_NAME) {
            console.log(&apos;[ServiceWorker] Removing old cache&apos;, key)
            return caches.delete(key)
          }
        })
      )
    })
  )
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs maxima"><code>self.addEventListener(&apos;<span class="hljs-built_in">activate</span>&apos;, e =&gt; {
  e.waitUntil(
    caches.keys().<span class="hljs-keyword">then</span>(keyList =&gt; {
      <span class="hljs-built_in">return</span> Promise.all(
        keyList.<span class="hljs-built_in">map</span>(<span class="hljs-built_in">key</span> =&gt; {
          <span class="hljs-keyword">if</span> (<span class="hljs-built_in">key</span> !== CACHE_NAME &amp;&amp; <span class="hljs-built_in">key</span> !== DATA_CACHE_NAME) {
            console.<span class="hljs-built_in">log</span>(&apos;[ServiceWorker] Removing old cache&apos;, <span class="hljs-built_in">key</span>)
            <span class="hljs-built_in">return</span> caches.<span class="hljs-built_in">delete</span>(<span class="hljs-built_in">key</span>)
          }
        })
      )
    })
  )
})</code></pre>
<p>&#x5728;&#x5176;&#x5378;&#x8F7D;&#x65F6;&#x4E00;&#x5B9A;&#x8981;&#x5220;&#x9664;&#x65E7;&#x7F13;&#x5B58;&#xFF0C;&#x4E0D;&#x7136;&#x6211;&#x4EEC;&#x7684;&#x7F51;&#x7AD9;&#x6C38;&#x8FDC;&#x65E0;&#x6CD5;&#x66F4;&#x65B0;&#x3002;</p>
<p>&#x4E0A;&#x9762;&#x53EA;&#x7B80;&#x5355;&#x8BB2;&#x4E86; <code>Service Worker</code> &#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x3002;&#x6211;&#x4EEC;&#x4F1A;&#x53D1;&#x73B0;&#x6709;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x8FDB;&#x4E00;&#x6B65;&#x89E3;&#x51B3;&#xFF1A;</p>
<ol>
<li>&#x9884;&#x7F13;&#x5B58;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x4FEE;&#x6539;&#x540E;&#x5728;&#x4E0B;&#x4E00;&#x6B21;&#x53D1;&#x7248;&#x672C;&#x65F6;&#x7684;&#x6587;&#x4EF6;&#x540D;&#x90FD;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x624B;&#x52A8;&#x5199;&#x6B7B;&#x592A;&#x4F4E;&#x6548;&#xFF0C;&#x6700;&#x597D;&#x6BCF;&#x6B21;&#x90FD;&#x81EA;&#x52A8;&#x751F;&#x6210;&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#x540D;&#x3002;</li>
<li>&#x7F13;&#x5B58;&#x8D44;&#x6E90;&#x662F;&#x4EE5;&#x786C;&#x7F16;&#x7801;&#x5B57;&#x7B26;&#x4E32;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;&#x6548;&#xFF0C;&#x8FD9;&#x6837;&#x6BCF;&#x6B21;&#x53D1;&#x7248;&#x672C;&#x90FD;&#x9700;&#x8981;&#x624B;&#x52A8;&#x4FEE;&#x6539;&#xFF0C;&#x624D;&#x80FD;&#x66F4;&#x65B0;&#x7F13;&#x5B58;&#x3002;&#x5E76;&#x4E14;&#x6BCF;&#x6B21;&#x90FD;&#x662F;&#x5168;&#x91CF;&#x66F4;&#x65B0;&#x3002;&#x80FD;&#x5426;&#x4EE5;&#x6587;&#x4EF6;&#x7684;&#x7C92;&#x5EA6;&#x8FDB;&#x884C;&#x8D44;&#x6E90;&#x7F13;&#x5B58;&#x5462;&#xFF1F;</li>
<li>&#x8BF7;&#x6C42;&#x4EE3;&#x7406;&#x6CA1;&#x6709;&#x533A;&#x5206;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x548C;&#x52A8;&#x6001;&#x63A5;&#x53E3;&#x3002;&#x5DF2;&#x7ECF;&#x7F13;&#x5B58;&#x7684;&#x52A8;&#x6001;&#x63A5;&#x53E3;&#x4E5F;&#x4F1A;&#x4E00;&#x76F4;&#x8FD4;&#x56DE;&#x7F13;&#x5B58;&#xFF0C;&#x65E0;&#x6CD5;&#x8BF7;&#x6C42;&#x65B0;&#x6570;&#x636E;&#x3002;</li>
</ol>
<p>&#x4E0A;&#x9762;&#x53EA;&#x5217;&#x51FA;&#x4E86;&#x4E09;&#x4E2A;&#x660E;&#x663E;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x95EE;&#x9898;&#x662F;&#x6CA1;&#x6709;&#x8003;&#x8651;&#x5230;&#x7684;&#x3002;&#x5982;&#x679C;&#x8BA9;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x4EC5;&#x662F;&#x5DE5;&#x4F5C;&#x91CF;&#x5F88;&#x5927;&#xFF0C;&#x800C;&#x4E14;&#x4E5F;&#x5F88;&#x96BE;&#x5199;&#x51FA;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x53EF;&#x7528;&#x7684; <code>Service Worker</code>&#x3002;</p>
<h1 id="articleHeader6"><a href="https://developers.google.com/web/tools/workbox" rel="nofollow noreferrer" target="_blank">workbox</a></h1>
<p>&#x65E2;&#x7136;&#x5982;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x6700;&#x597D;&#x662F;&#x7AD9;&#x5728;&#x5DE8;&#x4EBA;&#x7684;&#x80A9;&#x8180;&#x4E0A;&#xFF0C;&#x8FD9;&#x4E2A;&#x5DE8;&#x4EBA;&#x5C31;&#x662F;&#x8C37;&#x6B4C;&#x3002;workbox &#x662F;&#x7531;&#x8C37;&#x6B4C;&#x6D4F;&#x89C8;&#x5668;&#x56E2;&#x961F;&#x53D1;&#x5E03;&#xFF0C;&#x7528;&#x6765;&#x534F;&#x52A9;&#x521B;&#x5EFA; PWA &#x5E94;&#x7528;&#x7684; <code>JavaScript</code> &#x5E93;&#x3002;&#x5F53;&#x7136;&#x76F4;&#x63A5;&#x7528; <code>workbox</code> &#x8FD8;&#x662F;&#x592A;&#x590D;&#x6742;&#x4E86;&#xFF0C;&#x8C37;&#x6B4C;&#x8FD8;&#x5F88;&#x8D34;&#x5FC3;&#x7684;&#x53D1;&#x5E03;&#x4E86;&#x4E00;&#x4E2A; <code>webpack</code> &#x63D2;&#x4EF6;&#xFF0C;&#x80FD;&#x591F;&#x81EA;&#x52A8;&#x751F;&#x6210; <code>Service Worker</code> &#x548C; &#x9759;&#x6001;&#x8D44;&#x6E90;&#x5217;&#x8868; - <a href="https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin" rel="nofollow noreferrer" target="_blank">workbox-webpack-plugin</a>&#x3002;</p>
<p>&#x53EA;&#x9700;&#x7B80;&#x5355;&#x4E00;&#x6B65;&#x5C31;&#x80FD;&#x751F;&#x6210;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x53EF;&#x7528;&#x7684; <code>Service Worker</code> &#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { GenerateSW } = require(&apos;workbox-webpack-plugin&apos;)

new GenerateSW()" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> { GenerateSW } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;workbox-webpack-plugin&apos;</span>)

<span class="hljs-keyword">new</span> GenerateSW()</code></pre>
<p>&#x6253;&#x5305;&#x4E00;&#x4E0B;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbjuu?w=3028&amp;h=1318" src="https://static.alili.tech/img/bVbbjuu?w=3028&amp;h=1318" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p>&#x8FD8;&#x80FD;&#x8BF4;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x8C37;&#x6B4C;&#x5927;&#x6CD5;&#x597D;&#xFF01;&#x5F53;&#x7136;&#x8FD9;&#x53EA;&#x662F;&#x6700;&#x7B80;&#x5355;&#x7684;&#x53EF;&#x7528;&#x7248;&#x672C;&#xFF0C;&#x5176;&#x5B9E;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x6700;&#x4E25;&#x91CD;&#x7684;&#x95EE;&#x9898;&#x4E0D;&#x77E5;&#x9053;&#x6709;&#x6CA1;&#x4EBA;&#x53D1;&#x73B0;&#xFF0C;&#x90A3;&#x5C31;&#x662F; <code>importScripts</code> &#x5F15;&#x7528;&#x7684;&#x662F;&#x8C37;&#x6B4C;&#x57DF;&#x540D;&#x4E0B;&#x7684; cdn &#xFF0C;&#x8FD9;&#x8BA9;&#x6211;&#x4EEC;&#x5899;&#x5185;&#x7684;&#x7F51;&#x7AD9;&#x600E;&#x4E48;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x628A;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x89E3;&#x51B3;&#x5E76;&#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x589E;&#x5F3A; <code>Service Worker</code> &#x7684;&#x80FD;&#x529B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new GenerateSW({
  importWorkboxFrom: &apos;local&apos;,
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      // To match cross-origin requests, use a RegExp that matches
      // the start of the origin:
      urlPattern: new RegExp(&apos;^https://api&apos;),
      handler: &apos;staleWhileRevalidate&apos;,
      options: {
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [200]
        }
      }
    },
    {
      urlPattern: new RegExp(&apos;^https://cdn&apos;),
      // Apply a network-first strategy.
      handler: &apos;networkFirst&apos;,
      options: {
        // Fall back to the cache after 2 seconds.
        networkTimeoutSeconds: 2,
        cacheableResponse: {
          statuses: [200]
        }
      }
    }
  ]
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">GenerateSW</span>({
  <span class="hljs-attribute">importWorkboxFrom</span>: <span class="hljs-string">&apos;local&apos;</span>,
  <span class="hljs-attribute">skipWaiting</span>: true,
  <span class="hljs-attribute">clientsClaim</span>: true,
  <span class="hljs-attribute">runtimeCaching</span>: [
    {
      <span class="hljs-comment">// To match cross-origin requests, use a RegExp that matches</span>
      <span class="hljs-comment">// the start of the origin:</span>
      <span class="hljs-attribute">urlPattern</span>: new RegExp(<span class="hljs-string">&apos;^https://api&apos;</span>),
      <span class="hljs-attribute">handler</span>: <span class="hljs-string">&apos;staleWhileRevalidate&apos;</span>,
      <span class="hljs-attribute">options</span>: {
        <span class="hljs-comment">// Configure which responses are considered cacheable.</span>
        <span class="hljs-attribute">cacheableResponse</span>: {
          <span class="hljs-attribute">statuses</span>: [<span class="hljs-number">200</span>]
        }
      }
    },
    {
      <span class="hljs-attribute">urlPattern</span>: new RegExp(<span class="hljs-string">&apos;^https://cdn&apos;</span>),
      <span class="hljs-comment">// Apply a network-first strategy.</span>
      <span class="hljs-attribute">handler</span>: <span class="hljs-string">&apos;networkFirst&apos;</span>,
      <span class="hljs-attribute">options</span>: {
        <span class="hljs-comment">// Fall back to the cache after 2 seconds.</span>
        <span class="hljs-attribute">networkTimeoutSeconds</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attribute">cacheableResponse</span>: {
          <span class="hljs-attribute">statuses</span>: [<span class="hljs-number">200</span>]
        }
      }
    }
  ]
})
</code></pre>
<p>&#x9996;&#x5148; <code>importWorkboxFrom</code> &#x6211;&#x4EEC;&#x6307;&#x5B9A;&#x4ECE;&#x672C;&#x5730;&#x5F15;&#x5165;&#xFF0C;&#x8FD9;&#x6837;&#x63D2;&#x4EF6;&#x5C31;&#x4F1A;&#x5C06; <code>workbox</code> &#x6240;&#x6709;&#x6E90;&#x6587;&#x4EF6;&#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;&#xFF0C;&#x5899;&#x5185;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x798F;&#x97F3;&#x3002;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x8FC7;&#x65B0; <code>Service Worker</code> &#x5B89;&#x88C5;&#x6210;&#x529F;&#x540E;&#x9700;&#x8981;&#x8FDB;&#x5165;&#x7B49;&#x5F85;&#x9636;&#x6BB5;&#xFF0C;<code>skipWaiting: true</code> &#x5C06;&#x4F7F;&#x5176;&#x8DF3;&#x8FC7;&#x7B49;&#x5F85;&#xFF0C;&#x5B89;&#x88C5;&#x6210;&#x529F;&#x540E;&#x7ACB;&#x5373;&#x63A5;&#x7BA1;&#x7F51;&#x7AD9;&#xFF0C;&#x6CE8;&#x610F;&#x8FD9;&#x4E2A;&#x8981;&#x548C; <code>clientsClaim</code> &#x4E00;&#x8D77;&#x8BBE;&#x7F6E;&#x4E3A; <code>true</code>&#x3002;<code>runtimeCaching</code> &#x987E;&#x540D;&#x601D;&#x4E49;&#x662F;&#x914D;&#x7F6E;&#x8FD0;&#x884C;&#x65F6;&#x5982;&#x4F55;&#x7F13;&#x5B58;&#x8BF7;&#x6C42;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x53EA;&#x8BF4;&#x4E00;&#x70B9;&#xFF0C;&#x7F13;&#x5B58;&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x65F6; <code>urlPattern</code> &#x7684;&#x503C;&#x5FC5;&#x987B;&#x4E3A; <code>^</code> &#x5F00;&#x5934;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x5176;&#x5B83;&#x7684;&#x914D;&#x7F6E;&#x770B;&#x6587;&#x6863;&#x90FD;&#x80FD;&#x5F97;&#x5230;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#x3002;</p>
<p>&#x518D;&#x6253;&#x5305;&#x4E00;&#x6B21;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbjwz?w=2014&amp;h=1386" src="https://static.alili.tech/img/bVbbjwz?w=2014&amp;h=1386" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5C06;&#x6253;&#x5305;&#x597D;&#x7684;&#x4EE3;&#x7801;&#x90E8;&#x7F72;&#x5230;&#x7F51;&#x7AD9;&#x4E0A;&#x4E86;&#xFF0C;<a href="https://github.com/Hugo-seth/vue-pwa" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#x5728;&#x8FD9;</a>&#xFF0C;&#x6700;&#x540E;&#x518D;&#x4E0A;&#x51E0;&#x5F20;&#x56FE;&#xFF1A;</p>
<p><span class="img-wrap"><img data-src="/img/bVbbjwQ?w=3282&amp;h=1722" src="https://static.alili.tech/img/bVbbjwQ?w=3282&amp;h=1722" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000015067445?w=272&amp;h=480" src="https://static.alili.tech/img/remote/1460000015067445?w=272&amp;h=480" alt="&#x52A8;&#x56FE;" title="&#x52A8;&#x56FE;" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">&#x53C2;&#x8003;</h1>
<p><a href="https://developers.google.com/web/fundamentals/web-app-manifest/?hl=zh-cn" rel="nofollow noreferrer" target="_blank">Web App Manifest</a></p>
<p><a href="https://developers.google.com/web/fundamentals/primers/service-workers/?hl=zh-cn" rel="nofollow noreferrer" target="_blank">&#x670D;&#x52A1;&#x5DE5;&#x4F5C;&#x7EBF;&#x7A0B;&#xFF1A;&#x7B80;&#x4ECB;</a></p>
<p><a href="https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle" rel="nofollow noreferrer" target="_blank">&#x670D;&#x52A1;&#x5DE5;&#x4F5C;&#x7EBF;&#x7A0B;&#x751F;&#x547D;&#x5468;&#x671F;</a></p>
<p><a href="https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin" rel="nofollow noreferrer" target="_blank">workbox-webpack-plugin</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
借助 workbox 将网站升级成 PWA

## 原文链接
[https://segmentfault.com/a/1190000015050724](https://segmentfault.com/a/1190000015050724)


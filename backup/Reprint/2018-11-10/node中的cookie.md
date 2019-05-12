---
title: node中的cookie
hidden: true
categories: [reprint]
slug: '30726877'
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x9700;&#x8981;cookie</h2><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;<code>http</code>&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x534F;&#x8BAE;&#xFF0C;&#x65E0;&#x72B6;&#x6001;&#x662F;&#x4EC0;&#x4E48;&#x610F;&#x601D;&#x5462;&#xFF1F;<br>&#x6211;&#x6765;&#x4E3E;&#x4E00;&#x4E2A;&#x5C0F;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#x660E;&#xFF1A;&#x6BD4;&#x5982;&#x5C0F;&#x660E;&#x5728;&#x7F51;&#x4E0A;&#x8D2D;&#x7269;&#xFF0C;&#x4ED6;&#x6D4F;&#x89C8;&#x4E86;&#x591A;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x8D2D;&#x4E70;&#x4E86;&#x4E00;&#x4E9B;&#x7269;&#x54C1;&#xFF0C;&#x8FD9;&#x4E9B;&#x8BF7;&#x6C42;&#x5728;&#x591A;&#x6B21;&#x8FDE;&#x63A5;&#x4E2D;&#x5B8C;&#x6210;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x501F;&#x52A9;&#x989D;&#x5916;&#x7684;&#x624B;&#x6BB5;&#xFF0C;&#x90A3;&#x4E48;&#x670D;&#x52A1;&#x5668;&#x662F;&#x4E0D;&#x77E5;&#x9053;&#x4ED6;&#x5230;&#x5E95;&#x8D2D;&#x4E70;&#x4E86;&#x4EC0;&#x4E48;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x670D;&#x52A1;&#x5668;&#x538B;&#x6839;&#x5C31;&#x4E0D;&#x77E5;&#x9053;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x7684;&#x5230;&#x5E95;&#x662F;&#x4E0D;&#x662F;&#x5C0F;&#x660E;&#xFF0C;&#x9664;&#x975E;&#x5C0F;&#x660E;&#x6709;<code>&#x4E00;&#x4E2A;&#x6807;&#x8BC6;</code>&#x6765;&#x8BC1;&#x660E;&#x4ED6;&#x662F;&#x5C0F;&#x660E;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x7F51;&#x7AD9;&#x4E3A;&#x4E86;&#x8FA8;&#x522B;&#x7528;&#x6237;&#x8EAB;&#x4EFD;&#xFF0C;&#x8FDB;&#x884C; session &#x8DDF;&#x8E2A;&#xFF0C;cookie&#x51FA;&#x73B0;&#x4E86;&#x3002;</p><h2 id="articleHeader1">cookie&#x662F;&#x4EC0;&#x4E48;</h2><p>&#x7B80;&#x5355;&#x6765;&#x8BF4;&#xFF0C;cookie&#x5C31;&#x662F;&#x6807;&#x8BC6;&#x3002;<br>&#x4E25;&#x683C;&#x6765;&#x8BF4;&#xFF0C;cookie&#x662F;&#x4E00;&#x4E9B;&#x5B58;&#x50A8;&#x5728;<code>&#x5BA2;&#x6237;&#x7AEF;</code>&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x6BCF;&#x6B21;&#x8FDE;&#x63A5;&#x7684;&#x65F6;&#x5019;&#x7531;&#x6D4F;&#x89C8;&#x5668;&#x5411;&#x670D;&#x52A1;&#x5668;&#x9012;&#x4EA4;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x4E5F;&#x5411;&#x6D4F;&#x89C8;&#x5668;&#x53D1;&#x8D77;&#x5B58;&#x50A8; Cookie &#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x4F9D;&#x9760;&#x8FD9;&#x6837;&#x7684;&#x624B;&#x6BB5;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x53EF;&#x4EE5;&#x8BC6;&#x522B;&#x5BA2;&#x6237;&#x7AEF;&#x3002;<br>&#x5177;&#x4F53;&#x6765;&#x8BF4;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x9996;&#x6B21;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;<code>&#x552F;&#x4E00;&#x6807;&#x8BC6;&#x7B26;</code>&#x5E76;&#x53D1;&#x9001;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5C06;&#x8FD9;&#x4E2A;&#x552F;&#x4E00;&#x6807;&#x8BC6;&#x7B26;&#x5B58;&#x50A8;&#x5728; Cookie &#x4E2D;&#xFF0C;&#x4E4B;&#x540E;&#x6BCF;&#x6B21;&#x53D1;&#x8D77;&#x7684;&#x8BF7;&#x6C42;&#x4E2D;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x6D4F;&#x89C8;&#x5668;&#x90FD;&#x4F1A;&#x5411;&#x670D;&#x52A1;&#x5668;&#x4F20;&#x9001;&#x8FD9;&#x4E2A;&#x552F;&#x4E00;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x552F;&#x4E00;&#x6807;&#x8BC6;&#x7B26;&#x6765;&#x8BC6;&#x522B;&#x7528;&#x6237;&#x3002;</p><p>&#x8BF4;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x8D27;&#x5427;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgSkR?w=1118&amp;h=292" src="https://static.alili.tech/img/bVbgSkR?w=1118&amp;h=292" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x4E0A;&#x56FE;&#x4E2D;&#xFF0C;&#x5C31;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5B58;&#x7684;&#x4E00;&#x4E2A;cookie&#xFF0C;&#x4ED6;&#x7684;&#x540D;&#x5B57;&#x53EB;name&#xFF0C;&#x503C;&#x4E3A;abc&#x3002;</p><h2 id="articleHeader2">&#x5E38;&#x89C4;cookie</h2><p>&#x5149;&#x770B;&#x4E0D;&#x8FC7;&#x763E;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x7528;node&#x52A8;&#x624B;&#x6765;&#x505A;&#x4E00;&#x4E2A;&#x5E38;&#x89C4;cookie&#x5427;&#x3002;<br>&#x9996;&#x5148;&#xFF0C;&#x5B89;&#x88C5;express&#x6846;&#x67B6;&#x548C;cookieParser&#x4E2D;&#x95F4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i express --save
npm install cookie-parser --save
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>npm i <span class="hljs-built_in">express</span> --<span class="hljs-built_in">save</span>
npm install cookie-parser --<span class="hljs-built_in">save</span>
</code></pre><p>cookieParser&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x4E3B;&#x8981;&#x7528;&#x9014;&#x5982;&#x4E0B;&#xFF1A;</p><ol><li>&#x89E3;&#x6790;&#x6765;&#x81EA;&#x6D4F;&#x89C8;&#x5668;&#x7684;cookie&#xFF0C;&#x653E;&#x5230;req.cookies&#x4E2D;&#xFF1B;</li><li>&#x9488;&#x5BF9;&#x7B7E;&#x540D;cookie&#xFF0C;&#x5BF9;cookie&#x7B7E;&#x540D;&#x548C;&#x89E3;&#x7B7E;</li></ol><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;);
var cookieParser = require(&apos;cookie-parser&apos;);

var app = express();
app.use(cookieParser());

app.use(function (req, res) {
  if (req.url === &apos;/favicon.ico&apos;) {
    return
  }

  // &#x8BBE;&#x7F6E;&#x5E38;&#x89C4;cookie, &#x6709;&#x6548;&#x671F;&#x4E3A;20s, &#x5BA2;&#x6237;&#x7AEF;&#x811A;&#x672C;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE;&#x5B83;&#x7684;&#x503C;
  res.cookie(&apos;name&apos;, &apos;abc&apos;, { signed: false, maxAge: 20 * 1000, httpOnly: true });
  console.log(req.cookies, req.url, req.signedCookies);

  res.end(&apos;hello cookie&apos;);
})

app.listen(4000)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> cookieParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;cookie-parser&apos;</span>);

<span class="hljs-keyword">var</span> app = express();
app.<span class="hljs-keyword">use</span>(cookieParser());

app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">&apos;/favicon.ico&apos;</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5E38;&#x89C4;cookie, &#x6709;&#x6548;&#x671F;&#x4E3A;20s, &#x5BA2;&#x6237;&#x7AEF;&#x811A;&#x672C;&#x4E0D;&#x80FD;&#x8BBF;&#x95EE;&#x5B83;&#x7684;&#x503C;</span>
  res.cookie(<span class="hljs-string">&apos;name&apos;</span>, <span class="hljs-string">&apos;abc&apos;</span>, { signed: <span class="hljs-keyword">false</span>, maxAge: <span class="hljs-number">20</span> * <span class="hljs-number">1000</span>, httpOnly: <span class="hljs-keyword">true</span> });
  console.log(req.cookies, req.url, req.signedCookies);

  res.end(<span class="hljs-string">&apos;hello cookie&apos;</span>);
})

app.listen(<span class="hljs-number">4000</span>)</code></pre><p>&#x8FD0;&#x884C;&#x540E;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6253;&#x5F00; <code>http://localhost:4000/</code><br>&#x4EE5;chrome&#x4E3A;&#x4F8B;&#xFF0C;f12&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#x8C03;&#x8BD5;&#x5DE5;&#x5177;&#xFF0C;&#x5728;application&#x4E2D;&#x7684;cookies&#x4E2D;&#x4FBF;&#x80FD;&#x53D1;&#x73B0;&#x4F60;&#x5B9A;&#x4E49;&#x7684;cookie&#x3002;<br>req.cookies&#x548C;req.signedCookies&#x5C5E;&#x6027;&#x662F;&#x968F;http&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x8FC7;&#x6765;&#x7684;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;&#x7684;Cookie&#x7684;&#x89E3;&#x6790;&#x7ED3;&#x679C;&#x3002;<br>&#x5176;&#x4E2D;&#xFF0C;req.cookies&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x666E;&#x901A;cookie&#xFF0C;req.signedCookies&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x7B7E;&#x540D;cookie&#x3002;<br>&#x5982;&#x679C;&#x8BF7;&#x6C42;&#x4E2D;&#x6CA1;&#x6709;cookie&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x90FD;&#x662F;&#x7A7A;&#x7684;&#x3002;</p><h2 id="articleHeader3">&#x7B7E;&#x540D;cookie</h2><p>&#x7B7E;&#x540D;cookie&#x66F4;&#x9002;&#x5408;&#x654F;&#x611F;&#x6570;&#x636E;&#xFF0C;&#x56E0;&#x4E3A;&#x7528;&#x5B83;&#x53EF;&#x4EE5;&#x9A8C;&#x8BC1;cookie&#x6570;&#x636E;&#x7684;&#x5B8C;&#x6574;&#x6027;&#xFF0C;&#x6709;&#x52A9;&#x4E8E;&#x9632;&#x6B62;&#x4E2D;&#x95F4;&#x4EBA;&#x653B;&#x51FB;&#x3002;<br>&#x6709;&#x6548;&#x7684;&#x7B7E;&#x540D;cookie&#x653E;&#x5728;<code>req.signedCookies</code>&#x5BF9;&#x8C61;&#x4E2D;&#x3002;</p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;);
var cookieParser = require(&apos;cookie-parser&apos;);

var app = express();

// &#x8BBE;&#x7F6E;&#x5BC6;&#x94A5;&#xFF0C;&#x7528;&#x6765;&#x5BF9;cookie&#x7B7E;&#x540D;&#x548C;&#x89E3;&#x7B7E;, Express&#x53EF;&#x4EE5;&#x7531;&#x6B64;&#x786E;&#x5B9A;cookie&#x7684;&#x5185;&#x5BB9;&#x662F;&#x5426;&#x88AB;&#x7BE1;&#x6539;&#x8FC7;
app.use(cookieParser(&apos;a cool secret&apos;));

app.use(function (req, res) {
  if (req.url === &apos;/favicon.ico&apos;) {
    return
  }

  // &#x8BBE;&#x7F6E;&#x7B7E;&#x540D;cookie, &#x5E76;&#x4E14;&#x6709;&#x6548;&#x671F;&#x4E3A;1min
  res.cookie(&apos;name&apos;, &apos;efg&apos;, { signed: true, maxAge: 60 * 1000, httpOnly: true });
  console.log(req.cookies, req.url, req.signedCookies);

  res.end(&apos;signed cookie&apos;);
})
app.listen(4000)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> cookieParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;cookie-parser&apos;</span>);

<span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5BC6;&#x94A5;&#xFF0C;&#x7528;&#x6765;&#x5BF9;cookie&#x7B7E;&#x540D;&#x548C;&#x89E3;&#x7B7E;, Express&#x53EF;&#x4EE5;&#x7531;&#x6B64;&#x786E;&#x5B9A;cookie&#x7684;&#x5185;&#x5BB9;&#x662F;&#x5426;&#x88AB;&#x7BE1;&#x6539;&#x8FC7;</span>
app.<span class="hljs-keyword">use</span>(cookieParser(<span class="hljs-string">&apos;a cool secret&apos;</span>));

app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">&apos;/favicon.ico&apos;</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x7B7E;&#x540D;cookie, &#x5E76;&#x4E14;&#x6709;&#x6548;&#x671F;&#x4E3A;1min</span>
  res.cookie(<span class="hljs-string">&apos;name&apos;</span>, <span class="hljs-string">&apos;efg&apos;</span>, { signed: <span class="hljs-keyword">true</span>, maxAge: <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, httpOnly: <span class="hljs-keyword">true</span> });
  console.log(req.cookies, req.url, req.signedCookies);

  res.end(<span class="hljs-string">&apos;signed cookie&apos;</span>);
})
app.listen(<span class="hljs-number">4000</span>)</code></pre><p>&#x8FD0;&#x884C;&#x540E;&#xFF0C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x6253;&#x5F00; <code>http://localhost:4000/</code><br>&#x4EE5;chrome&#x4E3A;&#x4F8B;&#xFF0C;f12&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#x8C03;&#x8BD5;&#x5DE5;&#x5177;&#xFF0C;&#x5728;application&#x4E2D;&#x7684;cookies&#x4E2D;&#x4FBF;&#x80FD;&#x53D1;&#x73B0;&#x4F60;&#x5B9A;&#x4E49;&#x7684;&#x7B7E;&#x540D;cookie&#xFF0C;&#x683C;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;<code>s%3Aefg.7FJDuO2E9LMyby6%2Bo1fGQ3wkIHGB9v1CDVWod8NQVAo</code><br><code>.</code>&#x53F7;&#x5DE6;&#x8FB9;&#x662F;cookie&#x7684;&#x503C;&#xFF0C;&#x53F3;&#x8FB9;&#x662F;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x7528;SHA-1 HMAC&#x751F;&#x6210;&#x7684;&#x52A0;&#x5BC6;&#x54C8;&#x5E0C;&#x503C;&#x3002;<br>&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x7B7E;&#x540D;cookie&#x7684;&#x503C;&#x88AB;&#x7BE1;&#x6539;&#xFF0C;&#x90A3;&#x4E48;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#x5BF9;cookie&#x7684;&#x89E3;&#x7B7E;&#x4F1A;&#x5931;&#x8D25;&#xFF0C;&#x5728;node&#x4E2D;&#x8F93;&#x51FA;&#x7684;req.signedCookies&#x5C06;&#x4E3A;false&#x3002;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgSql?w=200&amp;h=21" src="https://static.alili.tech/img/bVbgSql?w=200&amp;h=21" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x800C;&#x5982;&#x679C;cookie&#x5B8C;&#x597D;&#x65E0;&#x635F;&#x5730;&#x4F20;&#x4E0A;&#x6765;&#xFF0C;&#x90A3;&#x4E48;&#x5C06;&#x4F1A;&#x88AB;&#x6B63;&#x786E;&#x89E3;&#x6790;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgSqu?w=195&amp;h=26" src="https://static.alili.tech/img/bVbgSqu?w=195&amp;h=26" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><p>&#x4F60;&#x53EF;&#x4EE5;&#x5728;cookie&#x4E2D;&#x5B58;&#x653E;&#x4EFB;&#x610F;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x672C;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x901A;&#x5E38;&#x662F;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x5B58;&#x653E;&#x4E00;&#x4E2A;<code>&#x4F1A;&#x8BDD;cookie</code>&#xFF0C;&#x8FD9;&#x6837;&#x4F60;&#x5C31;&#x80FD;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4FDD;&#x7559;&#x5B8C;&#x6574;&#x7684;&#x7528;&#x6237;&#x72B6;&#x6001;&#x3002;<br>&#x8FD9;&#x9879;&#x4F1A;&#x8BDD;&#x6280;&#x672F;&#x5C01;&#x88C5;&#x5728;session&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#xFF0C;&#x4E0B;&#x4E00;&#x7BC7;&#x6211;&#x5C06;&#x5BF9;<code>express-session&#x4E2D;&#x95F4;&#x4EF6;</code>&#x8FDB;&#x884C;&#x4ECB;&#x7ECD;&#x548C;&#x8BF4;&#x660E;&#xFF0C;&#x611F;&#x8C22;&#x60A8;&#x7684;&#x9605;&#x8BFB;&#xFF0C;&#x1F36A;&#x1F36A;&#x1F36A;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node中的cookie

## 原文链接
[https://segmentfault.com/a/1190000016376558](https://segmentfault.com/a/1190000016376558)


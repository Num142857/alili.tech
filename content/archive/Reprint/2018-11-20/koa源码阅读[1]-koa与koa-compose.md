---
title: 'koa源码阅读[1]-koa与koa-compose' 
date: 2018-11-20 2:30:10
hidden: true
slug: efkfww6909
categories: [reprint]
---

{{< raw >}}
<p>&#x63A5;&#x4E0A;&#x6B21;&#x6316;&#x7684;&#x5751;&#xFF0C;&#x5BF9;<code>koa2.x</code>&#x76F8;&#x5173;&#x7684;&#x6E90;&#x7801;&#x8FDB;&#x884C;&#x5206;&#x6790; <a href="https://segmentfault.com/a/1190000015724787">&#x7B2C;&#x4E00;&#x7BC7;</a>&#x3002;<br>&#x4E0D;&#x5F97;&#x4E0D;&#x8BF4;&#xFF0C;<code>koa</code>&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x8F7B;&#x91CF;&#x3001;&#x5F88;&#x4F18;&#x96C5;&#x7684;http&#x6846;&#x67B6;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x5728;2.x&#x4EE5;&#x540E;&#x79FB;&#x9664;&#x4E86;<code>co</code>&#x7684;&#x5F15;&#x5165;&#xFF0C;&#x4F7F;&#x5176;&#x4EE3;&#x7801;&#x53D8;&#x5F97;&#x66F4;&#x4E3A;&#x6E05;&#x6670;&#x3002;</p><p><code>express</code>&#x548C;<code>koa</code>&#x540C;&#x4E3A;&#x4E00;&#x6279;&#x4EBA;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#xFF0C;&#x4E0E;<code>express</code>&#x76F8;&#x6BD4;&#xFF0C;<code>koa</code>&#x663E;&#x5F97;&#x975E;&#x5E38;&#x7684;&#x8FF7;&#x4F60;&#x3002;<br>&#x56E0;&#x4E3A;<code>express</code>&#x662F;&#x4E00;&#x4E2A;&#x5927;&#x800C;&#x5168;&#x7684;<code>http</code>&#x6846;&#x67B6;&#xFF0C;&#x5185;&#x7F6E;&#x4E86;&#x7C7B;&#x4F3C;<code>router</code>&#x4E4B;&#x7C7B;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;<br>&#x800C;&#x5728;<code>koa</code>&#x4E2D;&#xFF0C;&#x5219;&#x5C06;&#x7C7B;&#x4F3C;&#x529F;&#x80FD;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5168;&#x90E8;&#x6458;&#x4E86;&#x51FA;&#x6765;&#xFF0C;&#x65E9;&#x671F;<code>koa</code>&#x91CC;&#x8FB9;&#x662F;&#x5185;&#x7F6E;&#x4E86;<code>koa-compose</code>&#x7684;&#xFF0C;&#x800C;&#x73B0;&#x5728;&#x4E5F;&#x662F;&#x5C06;&#x5176;&#x5206;&#x4E86;&#x51FA;&#x6765;&#x3002;<br><code>koa</code>&#x53EA;&#x4FDD;&#x7559;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x6574;&#x5408;&#xFF0C;<code>http</code>&#x8BF7;&#x6C42;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x529F;&#x80FD;&#x6027;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6846;&#x67B6;&#x6765;&#x5B58;&#x5728;&#xFF0C;&#x81EA;&#x8EAB;&#x4EC5;&#x6709;&#x5C11;&#x91CF;&#x7684;&#x903B;&#x8F91;&#x3002;<br><code>koa-compose</code>&#x5219;&#x662F;&#x4F5C;&#x4E3A;&#x6574;&#x5408;&#x4E2D;&#x95F4;&#x4EF6;&#x6700;&#x4E3A;&#x5173;&#x952E;&#x7684;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x3001;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x7684;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x5C06;&#x4E24;&#x8005;&#x653E;&#x5728;&#x4E00;&#x8D77;&#x6765;&#x770B;&#x3002;</p><h2 id="articleHeader0">koa&#x57FA;&#x672C;&#x7ED3;&#x6784;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; application.js
&#x251C;&#x2500;&#x2500; request.js
&#x251C;&#x2500;&#x2500; response.js
&#x2514;&#x2500;&#x2500; context.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">.
&#x251C;&#x2500;&#x2500; application.js
&#x251C;&#x2500;&#x2500; request.js
&#x251C;&#x2500;&#x2500; response.js
&#x2514;&#x2500;&#x2500; context.js</code></pre><p>&#x5173;&#x4E8E;<code>koa</code>&#x6574;&#x4E2A;&#x6846;&#x67B6;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x62C6;&#x5206;&#x4E3A;&#x4E86;&#x56DB;&#x4E2A;&#x6587;&#x4EF6;&#x3002;</p><p>&#x5C31;&#x8C61;&#x5728;&#x4E0A;&#x4E00;&#x7BC7;&#x7B14;&#x8BB0;&#x4E2D;&#x6A21;&#x62DF;&#x7684;&#x90A3;&#x6837;&#xFF0C;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7528;&#x6765;&#x6CE8;&#x518C;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x76D1;&#x542C;<code>http</code>&#x670D;&#x52A1;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;<code>application.js</code>&#x5728;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x3002;<br>&#x800C;&#x6846;&#x67B6;&#x7684;&#x610F;&#x4E49;&#x5462;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x6846;&#x67B6;&#x5185;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x6309;&#x7167;&#x6846;&#x67B6;&#x7684;&#x89C4;&#x77E9;&#x6765;&#x505A;&#x4E8B;&#x60C5;&#xFF0C;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x6846;&#x67B6;&#x4E5F;&#x4F1A;&#x63D0;&#x4F9B;&#x7ED9;&#x6211;&#x4EEC;&#x4E00;&#x4E9B;&#x66F4;&#x6613;&#x7528;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8BA9;&#x6211;&#x4EEC;&#x5B8C;&#x6210;&#x9700;&#x6C42;&#x3002;<br>&#x9488;&#x5BF9;<code>http.createServer</code>&#x56DE;&#x8C03;&#x7684;&#x4E24;&#x4E2A;&#x53C2;&#x6570;<code>request</code>&#x548C;<code>response</code>&#x8FDB;&#x884C;&#x7684;&#x4E00;&#x6B21;&#x5C01;&#x88C5;&#xFF0C;&#x7B80;&#x5316;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x64CD;&#x4F5C;&#x3002;<br>&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x5BF9;<code>Header</code>&#x7684;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x5728;&#x539F;&#x751F;<code>http</code>&#x6A21;&#x5757;&#x4E2D;&#x53EF;&#x80FD;&#x8981;&#x8FD9;&#x6837;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x83B7;&#x53D6;Content-Type
request.getHeader(&apos;Content-Type&apos;)

// &#x8BBE;&#x7F6E;Content-Type
response.setHeader(&apos;Content-Type&apos;, &apos;application/json&apos;)
response.setHeader(&apos;Content-Length&apos;, &apos;18&apos;)
// &#x6216;&#x8005;&#xFF0C;&#x5FFD;&#x7565;&#x524D;&#x8FB9;&#x7684;statusCode&#xFF0C;&#x8BBE;&#x7F6E;&#x591A;&#x4E2A;Header
response.writeHead(200, {
  &apos;Content-Type&apos;: &apos;application/json&apos;,
  &apos;Content-Length&apos;: &apos;18&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x83B7;&#x53D6;Content-Type</span>
request.getHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>)

<span class="hljs-comment">// &#x8BBE;&#x7F6E;Content-Type</span>
response.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;application/json&apos;</span>)
response.setHeader(<span class="hljs-string">&apos;Content-Length&apos;</span>, <span class="hljs-string">&apos;18&apos;</span>)
<span class="hljs-comment">// &#x6216;&#x8005;&#xFF0C;&#x5FFD;&#x7565;&#x524D;&#x8FB9;&#x7684;statusCode&#xFF0C;&#x8BBE;&#x7F6E;&#x591A;&#x4E2A;Header</span>
response.writeHead(<span class="hljs-number">200</span>, {
  <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;application/json&apos;</span>,
  <span class="hljs-string">&apos;Content-Length&apos;</span>: <span class="hljs-string">&apos;18&apos;</span>
})</code></pre><p>&#x800C;&#x5728;<code>koa</code>&#x4E2D;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x83B7;&#x53D6;Content-Type
context.request.get(&apos;Content-Type&apos;)

// &#x8BBE;&#x7F6E;Content-Type
context.response.set({
  &apos;Content-Type&apos;: &apos;application/json&apos;,
  &apos;Content-Length&apos;: &apos;18&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x83B7;&#x53D6;Content-Type</span>
context.request.get(<span class="hljs-string">&apos;Content-Type&apos;</span>)

<span class="hljs-comment">// &#x8BBE;&#x7F6E;Content-Type</span>
context.response.set({
  <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;application/json&apos;</span>,
  <span class="hljs-string">&apos;Content-Length&apos;</span>: <span class="hljs-string">&apos;18&apos;</span>
})</code></pre><p>&#x7B80;&#x5316;&#x4E86;&#x4E00;&#x4E9B;&#x9488;&#x5BF9;<code>request</code>&#x4E0E;<code>response</code>&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5C06;&#x8FD9;&#x4E9B;&#x5C01;&#x88C5;&#x5728;&#x4E86;<code>request.js</code>&#x548C;<code>response.js</code>&#x6587;&#x4EF6;&#x4E2D;&#x3002;<br>&#x4F46;&#x540C;&#x65F6;&#x8FD9;&#x4F1A;&#x5E26;&#x6765;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;&#x4E0A;&#x7684;&#x56F0;&#x6270;&#xFF0C;&#x8FD9;&#x6837;&#x5C01;&#x88C5;&#x4EE5;&#x540E;&#x5176;&#x5B9E;&#x83B7;&#x53D6;&#x6216;&#x8005;&#x8BBE;&#x7F6E;<code>header</code>&#x53D8;&#x5F97;&#x5C42;&#x7EA7;&#x66F4;&#x6DF1;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;<code>context</code>&#x627E;&#x5230;<code>request</code>&#x3001;<code>response</code>&#xFF0C;&#x7136;&#x540E;&#x624D;&#x80FD;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x3002;<br>&#x6240;&#x4EE5;&#xFF0C;<code>koa</code>&#x4F7F;&#x7528;&#x4E86;<a href="https://github.com/tj/node-delegates" rel="nofollow noreferrer" target="_blank">node-delegates</a>&#x6765;&#x8FDB;&#x4E00;&#x6B65;&#x7B80;&#x5316;&#x8FD9;&#x4E9B;&#x6B65;&#x9AA4;&#xFF0C;&#x5C06;<code>request.get</code>&#x3001;<code>response.set</code>&#x901A;&#x901A;&#x4EE3;&#x7406;&#x5230;<code>context</code>&#x4E0A;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x4EE3;&#x7406;&#x540E;&#x7684;&#x64CD;&#x4F5C;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.get(&apos;Content-Type&apos;)

// &#x8BBE;&#x7F6E;Content-Type
context.set({
  &apos;Content-Type&apos;: &apos;application/json&apos;,
  &apos;Content-Length&apos;: &apos;18&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">context.get(<span class="hljs-string">&apos;Content-Type&apos;</span>)

<span class="hljs-comment">// &#x8BBE;&#x7F6E;Content-Type</span>
context.set({
  <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;application/json&apos;</span>,
  <span class="hljs-string">&apos;Content-Length&apos;</span>: <span class="hljs-string">&apos;18&apos;</span>
})</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x53D8;&#x5F97;&#x5F88;&#x6E05;&#x6670;&#x4E86;&#xFF0C;&#x83B7;&#x53D6;<code>Header</code>&#xFF0C;&#x8BBE;&#x7F6E;<code>Header</code>&#xFF0C;<em>&#x518D;&#x4E5F;&#x4E0D;&#x4F1A;&#x62C5;&#x5FC3;&#x5199;&#x6210;<code>request.setHeader</code>&#x4E86;</em>&#xFF0C;&#x4E00;&#x6C14;&#x5475;&#x6210;&#xFF0C;&#x901A;&#x8FC7;<code>context.js</code>&#x6765;&#x6574;&#x5408;<code>request.js</code>&#x4E0E;<code>response.js</code>&#x7684;&#x884C;&#x4E3A;&#x3002;<br>&#x540C;&#x65F6;<code>context.js</code>&#x4E5F;&#x4F1A;&#x63D0;&#x4F9B;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#xFF0C;&#x4F8B;&#x5982;<code>Cookie</code>&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x7531;<code>application</code>&#x5F15;&#x5165;<code>context</code>&#xFF0C;<code>context</code>&#x4E2D;&#x53C8;&#x6574;&#x5408;&#x4E86;<code>request</code>&#x548C;<code>response</code>&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x56DB;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#x5DF2;&#x7ECF;&#x5F88;&#x6E05;&#x6670;&#x4E86;&#xFF1A;</p><table><thead><tr><th align="left">file</th><th align="left">desc</th></tr></thead><tbody><tr><td align="left">applicaiton</td><td align="left">&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x7BA1;&#x7406;&#x3001;<code>http.createServer</code>&#x7684;&#x56DE;&#x8C03;&#x5904;&#x7406;&#xFF0C;&#x751F;&#x6210;<code>Context</code>&#x4F5C;&#x4E3A;&#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5E76;&#x8C03;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;</td></tr><tr><td align="left">request</td><td align="left">&#x9488;&#x5BF9;<code>http.createServer -&gt; request</code>&#x529F;&#x80FD;&#x4E0A;&#x7684;&#x5C01;&#x88C5;</td></tr><tr><td align="left">response</td><td align="left">&#x9488;&#x5BF9;<code>http.createServer -&gt; response</code>&#x529F;&#x80FD;&#x4E0A;&#x7684;&#x5C01;&#x88C5;</td></tr><tr><td align="left">context</td><td align="left">&#x6574;&#x5408;<code>request</code>&#x4E0E;<code>response</code>&#x7684;&#x90E8;&#x5206;&#x529F;&#x80FD;&#xFF0C;&#x5E76;&#x63D0;&#x4F9B;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x529F;&#x80FD;</td></tr></tbody></table><p><em>&#x800C;&#x5728;&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x4E0A;&#xFF0C;&#x53EA;&#x6709;<code>application</code>&#x5BF9;&#x5916;&#x7684;<code>koa</code>&#x662F;&#x91C7;&#x7528;&#x7684;<code>Class</code>&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5176;&#x4ED6;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;&#x5747;&#x662F;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684;<code>Object</code>&#x3002;</em></p><h2 id="articleHeader1">&#x62FF;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x6D41;&#x7A0B;&#x6765;&#x89E3;&#x91CA;</h2><h3 id="articleHeader2">&#x521B;&#x5EFA;&#x670D;&#x52A1;</h3><p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>http</code>&#x670D;&#x52A1;&#xFF0C;&#x5728;<code>koa2.x</code>&#x4E2D;&#x521B;&#x5EFA;&#x670D;&#x52A1;&#x4E0E;<code>koa1.x</code>&#x7A0D;&#x5FAE;&#x6709;&#x4E9B;&#x533A;&#x522B;&#xFF0C;&#x8981;&#x6C42;&#x4F7F;&#x7528;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8FDB;&#x884C;&#x521B;&#x5EFA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = new Koa()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()</code></pre><p>&#x800C;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;<code>koa</code>&#x53EA;&#x505A;&#x4E86;&#x6709;&#x9650;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x521B;&#x5EFA;&#x4E86;&#x51E0;&#x4E2A;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x3002;<br>&#x5C06;&#x5F15;&#x5165;&#x7684;<code>context</code>&#x3001;<code>request</code>&#x4EE5;&#x53CA;<code>response</code>&#x901A;&#x8FC7;<code>Object.create</code>&#x62F7;&#x8D1D;&#x7684;&#x65B9;&#x5F0F;&#x653E;&#x5230;&#x5B9E;&#x4F8B;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.middleware = [] // &#x6700;&#x5173;&#x952E;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;

// &#x7528;&#x4E8E;&#x5728;&#x6536;&#x5230;&#x8BF7;&#x6C42;&#x540E;&#x521B;&#x5EFA;&#x4E0A;&#x4E0B;&#x6587;&#x4F7F;&#x7528;
this.context = Object.create(context)
this.request = Object.create(request)
this.response = Object.create(response)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.middleware = [] <span class="hljs-comment">// &#x6700;&#x5173;&#x952E;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;</span>

<span class="hljs-comment">// &#x7528;&#x4E8E;&#x5728;&#x6536;&#x5230;&#x8BF7;&#x6C42;&#x540E;&#x521B;&#x5EFA;&#x4E0A;&#x4E0B;&#x6587;&#x4F7F;&#x7528;</span>
<span class="hljs-keyword">this</span>.context = <span class="hljs-built_in">Object</span>.create(context)
<span class="hljs-keyword">this</span>.request = <span class="hljs-built_in">Object</span>.create(request)
<span class="hljs-keyword">this</span>.response = <span class="hljs-built_in">Object</span>.create(response)</code></pre><p>&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x8FDB;&#x884C;&#x6CE8;&#x518C;&#x4E2D;&#x95F4;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E86;&#xFF0C;&#x4E0A;&#x8FB9;&#x4E5F;&#x63D0;&#x5230;&#x4E86;&#xFF0C;<code>koa</code>&#x4EC5;&#x7528;&#x4F5C;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x6574;&#x5408;&#x4EE5;&#x53CA;&#x8BF7;&#x6C42;&#x7684;&#x76D1;&#x542C;&#x3002;<br>&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x50CF;<code>express</code>&#x90A3;&#x6837;&#x63D0;&#x4F9B;<code>router.get</code>&#x3001;<code>router.post</code>&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4EC5;&#x4EC5;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x63A5;&#x8FD1;<code>http.createServer</code>&#x7684;<code>use()</code>&#x3002;<br>&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x6B65;&#x9AA4;&#x5C31;&#x662F;&#x6CE8;&#x518C;&#x4E2D;&#x95F4;&#x4EF6;&#x5E76;&#x76D1;&#x542C;&#x4E00;&#x4E2A;&#x7AEF;&#x53E3;&#x53F7;&#x542F;&#x52A8;&#x670D;&#x52A1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const port = 8000

app.use(async (ctx, next) =&gt; {
  console.time(&apos;request&apos;)
  await next()
  console.timeEnd(&apos;request&apos;)
})
app.use(async (ctx, next) =&gt; {
  await next()
  ctx.body = ctx.body.toUpperCase()
})

app.use(ctx =&gt; {
  ctx.body = &apos;Hello World&apos;
})

app.use(ctx =&gt; {
  console.log(&apos;never output&apos;)
})

app.listen(port, () =&gt; console.log(`Server run as http://127.0.0.1:${port}`))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> port = <span class="hljs-number">8000</span>

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">&apos;request&apos;</span>)
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">&apos;request&apos;</span>)
})
app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">await</span> next()
  ctx.body = ctx.body.toUpperCase()
})

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">&apos;Hello World&apos;</span>
})

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;never output&apos;</span>)
})

app.listen(port, () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Server run as http://127.0.0.1:<span class="hljs-subst">${port}</span>`</span>))</code></pre><p>&#x5728;&#x7FFB;&#x770B;<code>application.js</code>&#x7684;&#x6E90;&#x7801;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x66B4;&#x9732;&#x7ED9;&#x5916;&#x90E8;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5E38;&#x7528;&#x7684;&#x57FA;&#x672C;&#x4E0A;&#x5C31;&#x662F;<code>use</code>&#x548C;<code>listen</code>&#x3002;<br>&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x52A0;&#x8F7D;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x76D1;&#x542C;&#x7AEF;&#x53E3;&#x5E76;&#x542F;&#x52A8;&#x670D;&#x52A1;&#x3002;</p><p>&#x800C;&#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x5B9E;&#x9645;&#x4E0A;&#x5E76;&#x6CA1;&#x6709;&#x8FC7;&#x591A;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5728;<code>use</code>&#x4E2D;&#x4EC5;&#x4EC5;&#x662F;&#x5224;&#x65AD;&#x4E86;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x662F;&#x5426;&#x4E3A;&#x4E00;&#x4E2A;<code>function</code>&#xFF0C;&#x4EE5;&#x53CA;&#x5728;2.x&#x7248;&#x672C;&#x9488;&#x5BF9;<code>Generator</code>&#x51FD;&#x6570;&#x7684;&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF0C;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;&#x4E86;<code>Promise</code>&#x5F62;&#x5F0F;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5E76;&#x5C06;&#x5176;<code>push</code>&#x5230;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x521B;&#x5EFA;&#x7684;<code>middleware</code>&#x6570;&#x7EC4;&#x4E2D;&#x3002;<br>&#x8FD9;&#x4E2A;&#x662F;&#x4ECE;<code>1.x</code>&#x8FC7;&#x6E21;&#x5230;<code>2.x</code>&#x7684;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#xFF0C;&#x5728;<code>3.x</code>&#x7248;&#x672C;&#x5C06;&#x76F4;&#x63A5;&#x79FB;&#x9664;<code>Generator</code>&#x7684;&#x652F;&#x6301;&#x3002;<br>&#x5176;&#x5B9E;&#x5728;<code>koa-convert</code>&#x5185;&#x90E8;&#x4E5F;&#x662F;&#x5F15;&#x7528;&#x4E86;<code>co</code>&#x548C;<code>koa-compose</code>&#x6765;&#x8FDB;&#x884C;&#x8F6C;&#x5316;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x5C31;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#x3002;</p><p>&#x800C;&#x5728;<code>listen</code>&#x4E2D;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x66F4;&#x7B80;&#x5355;&#x4E86;&#xFF0C;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x8C03;&#x7528;<code>http.createServer</code>&#x6765;&#x521B;&#x5EFA;&#x670D;&#x52A1;&#xFF0C;&#x5E76;&#x76D1;&#x542C;&#x5BF9;&#x5E94;&#x7684;&#x7AEF;&#x53E3;&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#x3002;<br>&#x6709;&#x4E00;&#x4E2A;&#x7EC6;&#x8282;&#x5728;&#x4E8E;&#xFF0C;<code>createServer</code>&#x4E2D;&#x4F20;&#x5165;&#x7684;&#x662F;<code>koa</code>&#x5B9E;&#x4F8B;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x8C03;&#x7528;&#x540E;&#x7684;&#x8FD4;&#x56DE;&#x503C;<code>callback</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x624D;&#x662F;&#x771F;&#x6B63;&#x7684;&#x56DE;&#x8C03;&#x5904;&#x7406;&#xFF0C;<code>listen</code>&#x53EA;&#x662F;<code>http</code>&#x6A21;&#x5757;&#x7684;&#x4E00;&#x4E2A;&#x5FEB;&#x6377;&#x65B9;&#x5F0F;&#x3002;<br>&#x8FD9;&#x4E2A;&#x662F;&#x4E3A;&#x4E86;&#x4E00;&#x4E9B;&#x7528;<code>socket.io</code>&#x3001;<code>https</code>&#x6216;&#x8005;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;<code>http</code>&#x6A21;&#x5757;&#x6765;&#x8FDB;&#x884C;&#x4F7F;&#x7528;&#x7684;&#x3002;<br>&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x53EA;&#x8981;&#x662F;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x4E0E;<code>http</code>&#x6A21;&#x5757;&#x4E00;&#x81F4;&#x7684;&#x884C;&#x4E3A;&#xFF0C;<code>koa</code>&#x90FD;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x63A5;&#x5165;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen(...args) {
  debug(&apos;listen&apos;)
  const server = http.createServer(this.callback())
  return server.listen(...args)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">listen(...args) {
  debug(<span class="hljs-string">&apos;listen&apos;</span>)
  <span class="hljs-keyword">const</span> server = http.createServer(<span class="hljs-keyword">this</span>.callback())
  <span class="hljs-keyword">return</span> server.listen(...args)
}</code></pre><h3 id="articleHeader3">&#x4F7F;&#x7528;koa-compose&#x5408;&#x5E76;&#x4E2D;&#x95F4;&#x4EF6;</h3><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5C31;&#x6765;&#x770B;&#x770B;<code>callback</code>&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="callback() {
  const fn = compose(this.middleware)

  if (!this.listenerCount(&apos;error&apos;)) this.on(&apos;error&apos;, this.onerror)

  const handleRequest = (req, res) =&gt; {
    const ctx = this.createContext(req, res)
    return this.handleRequest(ctx, fn)
  }

  return handleRequest
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">callback() {
  <span class="hljs-keyword">const</span> fn = compose(<span class="hljs-keyword">this</span>.middleware)

  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.listenerCount(<span class="hljs-string">&apos;error&apos;</span>)) <span class="hljs-keyword">this</span>.on(<span class="hljs-string">&apos;error&apos;</span>, <span class="hljs-keyword">this</span>.onerror)

  <span class="hljs-keyword">const</span> handleRequest = <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>.createContext(req, res)
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.handleRequest(ctx, fn)
  }

  <span class="hljs-keyword">return</span> handleRequest
}</code></pre><p>&#x5728;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x7684;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x5C31;&#x662F;&#x8981;&#x5904;&#x7406;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5C06;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x8F6C;&#x6362;&#x4E3A;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x683C;&#x5F0F;&#x7684;&#x3002;<br>&#x8FD9;&#x91CC;&#x5C31;&#x7528;&#x5230;&#x4E86;&#x6BD4;&#x8F83;&#x6838;&#x5FC3;&#x7684;<a href="https://github.com/koajs/compose" rel="nofollow noreferrer" target="_blank">koa-compose</a></p><p>&#x5176;&#x5B9E;&#x5B83;&#x7684;&#x529F;&#x80FD;&#x4E0A;&#x4E0E;<code>co</code>&#x7C7B;&#x4F3C;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x628A;<code>co</code>&#x5904;&#x7406;<code>Generator</code>&#x51FD;&#x6570;&#x90A3;&#x90E8;&#x5206;&#x903B;&#x8F91;&#x5168;&#x90E8;&#x53BB;&#x6389;&#x4E86;&#xFF0C;&#x672C;&#x8EAB;<code>co</code>&#x7684;&#x4EE3;&#x7801;&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x4E24;&#x767E;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x7CBE;&#x7B80;&#x540E;&#x7684;<code>koa-compose</code>&#x4EE3;&#x7801;&#x4EC5;&#x6709;48&#x884C;&#x3002;</p><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;<code>async</code>&#x51FD;&#x6570;&#x5B9E;&#x9645;&#x4E0A;&#x5265;&#x5F00;&#x5B83;&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x4EE5;&#x540E;&#x662F;&#x957F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function func () {
  return 123
}

// ==&gt;

function func () {
  return Promise.resolve(123)
}
// or
function func () {
  return new Promise(resolve =&gt; resolve(123))
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">123</span>
}

<span class="hljs-comment">// ==&gt;</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>)
}
<span class="hljs-comment">// or</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve(<span class="hljs-number">123</span>))
}</code></pre><p>&#x6240;&#x4EE5;&#x62FF;&#x4E0A;&#x8FF0;<code>use</code>&#x7684;&#x4EE3;&#x7801;&#x4E3E;&#x4F8B;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;<code>koa-compose</code>&#x62FF;&#x5230;&#x7684;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  function (ctx, next) {
    return new Promise(resolve =&gt; {
      console.time(&apos;request&apos;)
      next().then(() =&gt; {
        console.timeEnd(&apos;request&apos;)
        resolve()
      })
    })
  },
  function (ctx, next) {
    return new Promise(resolve =&gt; {
      next().then(() =&gt; {
        ctx.body = ctx.body.toUpperCase()
        resolve()
      })
    })
  },
  function (ctx, next) {
    return new Promise(resolve =&gt; {
      ctx.body = &apos;Hello World&apos;
      resolve()
    })
  },
  function (ctx, next) {
    return new Promise(resolve =&gt; {
      console.log(&apos;never output&apos;)
      resolve()
    })
  }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">[
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.time(<span class="hljs-string">&apos;request&apos;</span>)
      next().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">&apos;request&apos;</span>)
        resolve()
      })
    })
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      next().then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        ctx.body = ctx.body.toUpperCase()
        resolve()
      })
    })
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      ctx.body = <span class="hljs-string">&apos;Hello World&apos;</span>
      resolve()
    })
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;never output&apos;</span>)
      resolve()
    })
  }
]</code></pre><p>&#x5C31;&#x50CF;&#x5728;&#x7B2C;&#x56DB;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x8F93;&#x51FA;&#x8868;&#x793A;&#x7684;&#x90A3;&#x6837;&#xFF0C;&#x7B2C;&#x56DB;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x4E0D;&#x4F1A;&#x88AB;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x4E3A;&#x7B2C;&#x4E09;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x5E76;&#x6CA1;&#x6709;&#x8C03;&#x7528;<code>next</code>&#xFF0C;&#x6240;&#x4EE5;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x662F;&#x5F88;&#x6709;&#x610F;&#x601D;&#x7684;&#x4E00;&#x4EF6;&#x4E8B;&#x60C5;&#x3002;<br>&#x9996;&#x5148;&#x629B;&#x5F00;&#x4E0D;&#x53D8;&#x7684;<code>ctx</code>&#x4E0D;&#x8C08;&#xFF0C;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x7684;&#x5B9E;&#x73B0;&#x6838;&#x5FC3;&#x5728;&#x4E8E;<code>next</code>&#x7684;&#x5904;&#x7406;&#x3002;<br>&#x56E0;&#x4E3A;<code>next</code>&#x662F;&#x4F60;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x5C42;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x94A5;&#x5319;&#xFF0C;&#x53EA;&#x6709;&#x624B;&#x52A8;&#x89E6;&#x53D1;&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x5C42;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x4FDD;&#x8BC1;<code>next</code>&#x8981;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x8FDB;&#x884C;<code>resolve</code>&#xFF0C;&#x8FD4;&#x56DE;&#x5230;&#x4E0A;&#x4E00;&#x5C42;&#x4E2D;&#x95F4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function (context, next) {
  // last called middleware #
  let index = -1
  return dispatch(0)
  function dispatch (i) {
    if (i &lt;= index) return Promise.reject(new Error(&apos;next() called multiple times&apos;))
    index = i
    let fn = middleware[i]
    if (i === middleware.length) fn = next
    if (!fn) return Promise.resolve()
    try {
      return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
    } catch (err) {
      return Promise.reject(err)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context, next</span>) </span>{
  <span class="hljs-comment">// last called middleware #</span>
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
  <span class="hljs-keyword">return</span> dispatch(<span class="hljs-number">0</span>)
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span> (<span class="hljs-params">i</span>) </span>{
    <span class="hljs-keyword">if</span> (i &lt;= index) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;next() called multiple times&apos;</span>))
    index = i
    <span class="hljs-keyword">let</span> fn = middleware[i]
    <span class="hljs-keyword">if</span> (i === middleware.length) fn = next
    <span class="hljs-keyword">if</span> (!fn) <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve()
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(fn(context, dispatch.bind(<span class="hljs-literal">null</span>, i + <span class="hljs-number">1</span>)))
    } <span class="hljs-keyword">catch</span> (err) {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err)
    }
  }
}</code></pre><p>&#x6240;&#x4EE5;&#x660E;&#x786E;&#x4E86;&#x8FD9;&#x4E24;&#x70B9;&#x4EE5;&#x540E;&#xFF0C;&#x4E0A;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x4F1A;&#x53D8;&#x5F97;&#x5F88;&#x6E05;&#x6670;&#xFF1A;</p><ol><li>next&#x7528;&#x6765;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;</li><li>next&#x5728;&#x5F53;&#x524D;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#x4F1A;&#x89E6;&#x53D1;&#x56DE;&#x8C03;&#x901A;&#x77E5;&#x4E0A;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x800C;&#x5B8C;&#x6210;&#x7684;&#x524D;&#x63D0;&#x662F;&#x5185;&#x90E8;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x5B8C;&#x6210;(<code>resolved</code>)</li></ol><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5728;&#x8C03;&#x7528;<code>koa-compose</code>&#x4EE5;&#x540E;&#x5B9E;&#x9645;&#x4E0A;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x81EA;&#x6267;&#x884C;&#x51FD;&#x6570;&#x3002;<br>&#x5728;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7684;&#x5F00;&#x5934;&#x90E8;&#x5206;&#xFF0C;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x4E0B;&#x6807;&#x6765;&#x9632;&#x6B62;&#x5728;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x591A;&#x6B21;&#x8C03;&#x7528;<code>next</code>&#x3002;<br>&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x591A;&#x6B21;&#x8C03;&#x7528;<code>next</code>&#xFF0C;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x591A;&#x6B21;&#x6267;&#x884C;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x7834;&#x574F;&#x4E86;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x3002;</p><p>&#x5176;&#x6B21;&#x5C31;&#x662F;<code>compose</code>&#x5B9E;&#x9645;&#x4E0A;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x5728;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x5168;&#x90E8;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F5C;&#x7528;&#x4E0E;&#x8C03;&#x7528;<code>compose</code>&#x540E;&#x8FB9;&#x7684;<code>then</code>&#x5904;&#x7406;&#x6CA1;&#x6709;&#x592A;&#x5927;&#x533A;&#x522B;&#x3002;</p><p>&#x4EE5;&#x53CA;&#x4E0A;&#x8FB9;&#x63D0;&#x5230;&#x7684;&#xFF0C;<code>next</code>&#x662F;&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x94A5;&#x5319;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x8FD9;&#x4E00;&#x4E2A;&#x67EF;&#x91CC;&#x5316;&#x51FD;&#x6570;&#x7684;&#x5E94;&#x7528;&#x4E0A;&#x770B;&#x51FA;&#x6765;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(fn(context, dispatch.bind(null, i + 1)))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">Promise</span>.resolve(fn(context, dispatch.bind(<span class="hljs-literal">null</span>, i + <span class="hljs-number">1</span>)))</code></pre><p>&#x5C06;&#x81EA;&#x8EAB;&#x7ED1;&#x5B9A;&#x4E86;<code>index</code>&#x53C2;&#x6570;&#x540E;&#x4F20;&#x5165;&#x672C;&#x6B21;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4F5C;&#x4E3A;&#x8C03;&#x7528;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>next</code>&#xFF0C;&#x6548;&#x679C;&#x5C31;&#x50CF;&#x8C03;&#x7528;&#x4E86;<code>dispatch(1)</code>&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x7684;&#x5B9E;&#x73B0;&#x3002;<br>&#x800C;<code>fn</code>&#x7684;&#x8C03;&#x7528;&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;<code>async function</code>&#xFF0C;&#x90A3;&#x4E48;&#x5916;&#x5C42;&#x7684;<code>Promise.resolve</code>&#x4F1A;&#x7B49;&#x5230;&#x5185;&#x90E8;&#x7684;<code>async</code>&#x6267;&#x884C;<code>resolve</code>&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x89E6;&#x53D1;<code>resolve</code>&#xFF0C;&#x4F8B;&#x5982;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(new Promise(resolve =&gt; setTimeout(resolve, 500))).then(console.log) // 500ms&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x89E6;&#x53D1; console.log" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, <span class="hljs-number">500</span>))).then(<span class="hljs-built_in">console</span>.log) <span class="hljs-comment">// 500ms&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x89E6;&#x53D1; console.log</span></code></pre><p>P.S. &#x4E00;&#x4E2A;&#x4ECE;<code>koa1.x</code>&#x5207;&#x6362;&#x5230;<code>koa2.x</code>&#x7684;&#x6697;&#x5751;&#xFF0C;<code>co</code>&#x4F1A;&#x5BF9;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF0C;&#x4F7F;&#x7528;<code>Promise.all</code>&#x8FDB;&#x884C;&#x5305;&#x88C5;&#xFF0C;&#x4F46;&#x662F;<code>koa2.x</code>&#x6CA1;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x3002;<br>&#x6240;&#x4EE5;&#x5982;&#x679C;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x8981;&#x9488;&#x5BF9;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x624B;&#x52A8;&#x6DFB;&#x52A0;<code>Promise.all</code>&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x7B49;&#x8349;&#x6848;&#x4E2D;&#x7684;<code>await*</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// koa1.x
yield [Promise.resolve(1), Promise.resolve(2)]              // [1, 2]

// koa2.x
await [Promise.resolve(1), Promise.resolve(2)]              // [&lt;Promise&gt;, &lt;Promise&gt;]

// ==&gt;
await Promise.all([Promise.resolve(1), Promise.resolve(2)]) // [1, 2]
await* [Promise.resolve(1), Promise.resolve(2)]             // [1, 2]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// koa1.x</span>
<span class="hljs-keyword">yield</span> [<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>), <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>)]              <span class="hljs-comment">// [1, 2]</span>

<span class="hljs-comment">// koa2.x</span>
<span class="hljs-keyword">await</span> [<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>), <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>)]              <span class="hljs-comment">// [&lt;Promise&gt;, &lt;Promise&gt;]</span>

<span class="hljs-comment">// ==&gt;</span>
<span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>), <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>)]) <span class="hljs-comment">// [1, 2]</span>
<span class="hljs-keyword">await</span>* [<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">1</span>), <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">2</span>)]             <span class="hljs-comment">// [1, 2]</span></code></pre><h3 id="articleHeader4">&#x63A5;&#x6536;&#x8BF7;&#x6C42;&#xFF0C;&#x5904;&#x7406;&#x8FD4;&#x56DE;&#x503C;</h3><p>&#x7ECF;&#x8FC7;&#x4E0A;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E00;&#x4E2A;<code>koa</code>&#x670D;&#x52A1;&#x5DF2;&#x7ECF;&#x7B97;&#x662F;&#x8FD0;&#x884C;&#x8D77;&#x6765;&#x4E86;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;&#x8BBF;&#x95EE;&#x770B;&#x6548;&#x679C;&#x4E86;&#x3002;<br>&#x5728;&#x63A5;&#x6536;&#x5230;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x540E;&#xFF0C;<code>koa</code>&#x4F1A;&#x62FF;&#x4E4B;&#x524D;&#x63D0;&#x5230;&#x7684;<code>context</code>&#x4E0E;<code>request</code>&#x3001;<code>response</code>&#x6765;&#x521B;&#x5EFA;&#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x6240;&#x4F7F;&#x7528;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#x3002;<br>&#x5728;<code>koa1.x</code>&#x4E2D;&#xFF0C;&#x4E0A;&#x4E0B;&#x6587;&#x662F;&#x7ED1;&#x5B9A;&#x5728;<code>this</code>&#x4E0A;&#x7684;&#xFF0C;&#x800C;&#x5728;<code>koa2.x</code>&#x662F;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4F20;&#x5165;&#x8FDB;&#x6765;&#x7684;&#x3002;<br>&#x4E2A;&#x4EBA;&#x731C;&#x6D4B;&#x53EF;&#x80FD;&#x662F;&#x56E0;&#x4E3A;<code>Generator</code>&#x4E0D;&#x80FD;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x800C;<code>async</code>&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x5BFC;&#x81F4;&#x7684;&#x5427;:) <em>&#x7EAF;&#x5C5E;&#x4E2A;&#x4EBA;YY</em></p><p>&#x603B;&#x4E4B;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E0A;&#x8FB9;&#x63D0;&#x5230;&#x7684;&#x4E09;&#x4E2A;&#x6A21;&#x5757;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x6240;&#x9700;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x662F;&#x4E00;&#x901A;&#x513F;&#x8D4B;&#x503C;&#xFF0C;&#x4EE3;&#x7801;&#x5C31;&#x4E0D;&#x8D34;&#x4E86;&#xFF0C;&#x6CA1;&#x6709;&#x592A;&#x591A;&#x903B;&#x8F91;&#xFF0C;&#x5C31;&#x662F;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x7EC6;&#x8282;&#x6BD4;&#x8F83;&#x6709;&#x610F;&#x601D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request.response = response
response.request = request" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">request.response = response
response.request = request</code></pre><p>&#x8BA9;&#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x4EA7;&#x751F;&#x4E86;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#x5173;&#x7CFB;&#xFF0C;&#x65E2;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>request</code>&#x83B7;&#x53D6;&#x5230;<code>response</code>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>response</code>&#x83B7;&#x53D6;&#x5230;<code>request</code>&#x3002;<br>&#x800C;&#x4E14;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x9012;&#x5F52;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let obj = {}

obj.obj = obj

obj.obj.obj.obj === obj // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> obj = {}

obj.obj = obj

obj.obj.obj.obj === obj <span class="hljs-comment">// true</span></code></pre><p>&#x540C;&#x65F6;&#x5982;&#x4E0A;&#x6587;&#x63D0;&#x5230;&#x7684;&#xFF0C;&#x5728;<code>context</code>&#x521B;&#x5EFA;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5C06;&#x4E00;&#x5927;&#x6279;&#x7684;<code>request</code>&#x548C;<code>response</code>&#x7684;&#x5C5E;&#x6027;&#x3001;&#x65B9;&#x6CD5;&#x4EE3;&#x7406;&#x5230;&#x4E86;&#x81EA;&#x8EAB;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x7FFB;&#x770B;&#x6E90;&#x7801;&#xFF08;&#x770B;&#x7740;&#x6709;&#x70B9;&#x6655;&#xFF09;&#xFF1A;<a href="https://github.com/koajs/koa/blob/master/lib/context.js#L190" rel="nofollow noreferrer" target="_blank">koa.js | context.js</a><br>&#x8FD9;&#x4E2A;<a href="https://github.com/tj/node-delegates/blob/master/index.js" rel="nofollow noreferrer" target="_blank">delegate</a>&#x7684;&#x5B9E;&#x73B0;&#x4E5F;&#x7B97;&#x662F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x901A;&#x8FC7;&#x53D6;&#x51FA;&#x539F;&#x59CB;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x5B58;&#x4E00;&#x4E2A;&#x5F15;&#x7528;&#xFF0C;&#x5728;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x88AB;&#x89E6;&#x53D1;&#x65F6;&#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E00;&#x4E2A;&#x6C11;&#x95F4;&#x7248;&#x7684;<code>Proxy</code>&#x5427;&#xFF0C;&#x671F;&#x5F85;&#x540E;&#x7EED;&#x80FD;&#x591F;&#x4F7F;&#x7528;<code>Proxy</code>&#x4EE3;&#x66FF;&#x5B83;&#x3002;</p><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x5C06;&#x751F;&#x6210;&#x597D;&#x7684;<code>context</code>&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x5165;<code>koa-compose</code>&#x751F;&#x6210;&#x7684;&#x6D0B;&#x8471;&#x4E2D;&#x53BB;&#x3002;<br>&#x56E0;&#x4E3A;&#x65E0;&#x8BBA;&#x4F55;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x6D0B;&#x8471;&#x80AF;&#x5B9A;&#x4F1A;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x7684;&#xFF08;&#x51FA;&#x9519;&#x4E0E;&#x5426;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x5728;&#x6700;&#x540E;&#x6709;&#x4E00;&#x4E2A;<code>finished</code>&#x7684;&#x5904;&#x7406;&#xFF0C;&#x505A;&#x4E00;&#x4E9B;&#x7C7B;&#x4F3C;&#x5C06;<code>ctx.body</code>&#x8F6C;&#x6362;&#x4E3A;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x8F93;&#x51FA;&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p><code>koa</code>&#x4F7F;&#x7528;&#x4E86;&#x5927;&#x91CF;&#x7684;<code>get</code>&#x3001;<code>set</code>&#x8BBF;&#x95EE;&#x5668;&#x6765;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#xFF0C;&#x4F8B;&#x5982;&#x6700;&#x5E38;&#x7528;&#x7684;<code>ctx.body = &apos;XXX&apos;</code>&#xFF0C;&#x5B83;&#x662F;&#x6765;&#x81EA;<code>response</code>&#x7684;<code>set body</code>&#x3002;<br>&#x8FD9;&#x5E94;&#x8BE5;&#x662F;<code>request</code>&#x3001;<code>response</code>&#x4E2D;&#x903B;&#x8F91;&#x6700;&#x590D;&#x6742;&#x7684;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x4E86;&#x3002;<br>&#x91CC;&#x8FB9;&#x8981;&#x5904;&#x7406;&#x5F88;&#x591A;&#x4E1C;&#x897F;&#xFF0C;&#x4F8B;&#x5982;&#x5728;<code>body</code>&#x5185;&#x5BB9;&#x4E3A;&#x7A7A;&#x65F6;&#x5E2E;&#x52A9;&#x4F60;&#x4FEE;&#x6539;&#x8BF7;&#x6C42;&#x7684;<code>status code</code>&#x4E3A;204&#xFF0C;&#x5E76;&#x79FB;&#x9664;&#x65E0;&#x7528;&#x7684;<code>headers</code>&#x3002;<br>&#x4EE5;&#x53CA;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x624B;&#x52A8;&#x6307;&#x5B9A;<code>status code</code>&#xFF0C;&#x4F1A;&#x9ED8;&#x8BA4;&#x6307;&#x5B9A;&#x4E3A;<code>200</code>&#x3002;<br>&#x751A;&#x81F3;&#x8FD8;&#x4F1A;&#x6839;&#x636E;&#x5F53;&#x524D;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x6765;&#x5224;&#x65AD;<code>content-type</code>&#x5E94;&#x8BE5;&#x662F;<code>html</code>&#x8FD8;&#x662F;&#x666E;&#x901A;&#x7684;<code>text</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// string
if (&apos;string&apos; == typeof val) {
  if (setType) this.type = /^\s*&lt;/.test(val) ? &apos;html&apos; : &apos;text&apos;
  this.length = Buffer.byteLength(val)
  return
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// string</span>
<span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;string&apos;</span> == <span class="hljs-keyword">typeof</span> val) {
  <span class="hljs-keyword">if</span> (setType) <span class="hljs-keyword">this</span>.type = <span class="hljs-regexp">/^\s*&lt;/</span>.test(val) ? <span class="hljs-string">&apos;html&apos;</span> : <span class="hljs-string">&apos;text&apos;</span>
  <span class="hljs-keyword">this</span>.length = Buffer.byteLength(val)
  <span class="hljs-keyword">return</span>
}</code></pre><p>&#x4EE5;&#x53CA;&#x8FD8;&#x5305;&#x542B;&#x9488;&#x5BF9;&#x6D41;(<code>Stream</code>)&#x7684;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF0C;&#x4F8B;&#x5982;&#x5982;&#x679C;&#x8981;&#x7528;<code>koa</code>&#x5B9E;&#x73B0;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x4E0B;&#x8F7D;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;<code>ctx.body</code>&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#x7684;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x4E1C;&#x897F;&#x90FD;&#x5DF2;&#x7ECF;&#x5728;<code>response.js</code>&#x4E2D;&#x5E2E;&#x4F60;&#x5904;&#x7406;&#x597D;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stream
if (&apos;function&apos; == typeof val.pipe) {
  onFinish(this.res, destroy.bind(null, val))
  ensureErrorHandler(val, err =&gt; this.ctx.onerror(err))

  // overwriting
  if (null != original &amp;&amp; original != val) this.remove(&apos;Content-Length&apos;)

  if (setType) this.type = &apos;bin&apos;
  return
}

// &#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;
let stream = fs.createReadStream(&apos;package.json&apos;)
ctx.body = stream

// set body&#x4E2D;&#x7684;&#x5904;&#x7406;
onFinish(res, () =&gt; {
  destory(stream)
})

stream.pipe(res) // &#x4F7F;response&#x63A5;&#x6536;&#x6D41;&#x662F;&#x5728;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x5B8C;&#x5168;&#x6267;&#x884C;&#x5B8C;&#x4EE5;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x7684;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// stream</span>
<span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;function&apos;</span> == <span class="hljs-keyword">typeof</span> val.pipe) {
  onFinish(<span class="hljs-keyword">this</span>.res, destroy.bind(<span class="hljs-literal">null</span>, val))
  ensureErrorHandler(val, err =&gt; <span class="hljs-keyword">this</span>.ctx.onerror(err))

  <span class="hljs-comment">// overwriting</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-literal">null</span> != original &amp;&amp; original != val) <span class="hljs-keyword">this</span>.remove(<span class="hljs-string">&apos;Content-Length&apos;</span>)

  <span class="hljs-keyword">if</span> (setType) <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;bin&apos;</span>
  <span class="hljs-keyword">return</span>
}

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;</span>
<span class="hljs-keyword">let</span> stream = fs.createReadStream(<span class="hljs-string">&apos;package.json&apos;</span>)
ctx.body = stream

<span class="hljs-comment">// set body&#x4E2D;&#x7684;&#x5904;&#x7406;</span>
onFinish(res, () =&gt; {
  destory(stream)
})

stream.pipe(res) <span class="hljs-comment">// &#x4F7F;response&#x63A5;&#x6536;&#x6D41;&#x662F;&#x5728;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x5B8C;&#x5168;&#x6267;&#x884C;&#x5B8C;&#x4EE5;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x7684;</span></code></pre><p><em>onFinish&#x7528;&#x6765;&#x76D1;&#x542C;&#x6D41;&#x662F;&#x5426;&#x7ED3;&#x675F;&#x3001;destory&#x7528;&#x6765;&#x5173;&#x95ED;&#x6D41;</em></p><p>&#x5176;&#x4F59;&#x7684;&#x8BBF;&#x95EE;&#x5668;&#x57FA;&#x672C;&#x4E0A;&#x5C31;&#x662F;&#x4E00;&#x4E9B;&#x5E38;&#x89C1;&#x64CD;&#x4F5C;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x4F8B;&#x5982;&#x9488;&#x5BF9;<code>querystring</code>&#x7684;&#x5C01;&#x88C5;&#x3002;<br>&#x5728;&#x4F7F;&#x7528;&#x539F;&#x751F;<code>http</code>&#x6A21;&#x5757;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5904;&#x7406;URL&#x4E2D;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x662F;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x5F15;&#x5165;&#x989D;&#x5916;&#x7684;&#x5305;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x7684;&#xFF0C;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x662F;<code>querystring</code>&#x3002;<br><code>koa</code>&#x4E5F;&#x662F;&#x5728;&#x5185;&#x90E8;&#x5F15;&#x5165;&#x7684;&#x8BE5;&#x6A21;&#x5757;&#x3002;<br>&#x6240;&#x4EE5;&#x5BF9;&#x5916;&#x629B;&#x51FA;&#x7684;<code>query</code>&#x5927;&#x81F4;&#x662F;&#x8FD9;&#x4E2A;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get query() {
  let query = parse(this.req).query
  return qs.parse(query)
}

// use
let { id, name } = ctx.query // &#x56E0;&#x4E3A; get query&#x4E5F;&#x88AB;&#x4EE3;&#x7406;&#x5230;&#x4E86;context&#x4E0A;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5F15;&#x7528;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">get query() {
  <span class="hljs-keyword">let</span> query = parse(<span class="hljs-keyword">this</span>.req).query
  <span class="hljs-keyword">return</span> qs.parse(query)
}

<span class="hljs-comment">// use</span>
<span class="hljs-keyword">let</span> { id, name } = ctx.query <span class="hljs-comment">// &#x56E0;&#x4E3A; get query&#x4E5F;&#x88AB;&#x4EE3;&#x7406;&#x5230;&#x4E86;context&#x4E0A;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5F15;&#x7528;</span></code></pre><p><em>parse&#x4E3A;parseurl&#x5E93;&#xFF0C;&#x7528;&#x6765;&#x4ECE;request&#x4E2D;&#x63D0;&#x51FA;query&#x53C2;&#x6570;</em></p><p>&#x4EA6;&#x6216;&#x8005;&#x9488;&#x5BF9;<code>cookies</code>&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x4E5F;&#x662F;&#x5185;&#x7F6E;&#x4E86;&#x6700;&#x6D41;&#x884C;&#x7684;<code>cookies</code>&#x3002;<br>&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x89E6;&#x53D1;<code>get cookies</code>&#x65F6;&#x624D;&#x53BB;&#x5B9E;&#x4F8B;&#x5316;<code>Cookie</code>&#x5BF9;&#x8C61;&#xFF0C;&#x5C06;&#x8FD9;&#x4E9B;&#x7E41;&#x7410;&#x7684;&#x64CD;&#x4F5C;&#x6321;&#x5728;&#x7528;&#x6237;&#x770B;&#x4E0D;&#x5230;&#x7684;&#x5730;&#x65B9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get cookies() {
  if (!this[COOKIES]) {
    this[COOKIES] = new Cookies(this.req, this.res, {
      keys: this.app.keys,
      secure: this.request.secure
    })
  }
  return this[COOKIES]
}

set cookies(_cookies) {
  this[COOKIES] = _cookies
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">get cookies() {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>[COOKIES]) {
    <span class="hljs-keyword">this</span>[COOKIES] = <span class="hljs-keyword">new</span> Cookies(<span class="hljs-keyword">this</span>.req, <span class="hljs-keyword">this</span>.res, {
      <span class="hljs-attr">keys</span>: <span class="hljs-keyword">this</span>.app.keys,
      <span class="hljs-attr">secure</span>: <span class="hljs-keyword">this</span>.request.secure
    })
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[COOKIES]
}

set cookies(_cookies) {
  <span class="hljs-keyword">this</span>[COOKIES] = _cookies
}</code></pre><p>&#x6240;&#x4EE5;&#x5728;<code>koa</code>&#x4E2D;&#x4F7F;&#x7528;<code>Cookie</code>&#x5C31;&#x50CF;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.cookies.get(&apos;uid&apos;)

this.cookies.set(&apos;name&apos;, &apos;Niko&apos;)

// &#x5982;&#x679C;&#x4E0D;&#x60F3;&#x7528;cookies&#x6A21;&#x5757;&#xFF0C;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x8D4B;&#x503C;&#x4E3A;&#x81EA;&#x5DF1;&#x60F3;&#x7528;&#x7684;cookie
this.cookies = CustomeCookie

this.cookies.mget([&apos;uid&apos;, &apos;name&apos;])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.cookies.get(<span class="hljs-string">&apos;uid&apos;</span>)

<span class="hljs-keyword">this</span>.cookies.set(<span class="hljs-string">&apos;name&apos;</span>, <span class="hljs-string">&apos;Niko&apos;</span>)

<span class="hljs-comment">// &#x5982;&#x679C;&#x4E0D;&#x60F3;&#x7528;cookies&#x6A21;&#x5757;&#xFF0C;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x8D4B;&#x503C;&#x4E3A;&#x81EA;&#x5DF1;&#x60F3;&#x7528;&#x7684;cookie</span>
<span class="hljs-keyword">this</span>.cookies = CustomeCookie

<span class="hljs-keyword">this</span>.cookies.mget([<span class="hljs-string">&apos;uid&apos;</span>, <span class="hljs-string">&apos;name&apos;</span>])</code></pre><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x5728;<code>get cookies</code>&#x91CC;&#x8FB9;&#x6709;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;&#x53EF;&#x7528;&#x7684;Cookie&#x5B9E;&#x4F8B;&#xFF0C;&#x624D;&#x4F1A;&#x9ED8;&#x8BA4;&#x53BB;&#x5B9E;&#x4F8B;&#x5316;&#x3002;</p><h4>&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#x7684;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;</h4><p><code>koa</code>&#x7684;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x6D41;&#x7A0B;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x5148;&#x6267;&#x884C;&#x6D0B;&#x8471;&#x91CC;&#x8FB9;&#x7684;&#x6240;&#x6709;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5728;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x4EE5;&#x540E;&#xFF0C;&#x8FD8;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;<br>&#x8BE5;&#x56DE;&#x8C03;&#x7528;&#x6765;&#x6839;&#x636E;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x6240;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x6765;&#x51B3;&#x5B9A;&#x8FD4;&#x56DE;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x4EC0;&#x4E48;&#x6570;&#x636E;&#x3002;<br>&#x62FF;&#x5230;<code>ctx.body</code>&#x3001;<code>ctx.status</code>&#x8FD9;&#x4E9B;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;<br>&#x5305;&#x62EC;&#x524D;&#x8FB9;&#x63D0;&#x5230;&#x7684;&#x6D41;(<code>Stream</code>)&#x7684;&#x5904;&#x7406;&#x90FD;&#x5728;&#x8FD9;&#x91CC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (body instanceof Stream) return body.pipe(res) // &#x7B49;&#x5230;&#x8FD9;&#x91CC;&#x7ED3;&#x675F;&#x540E;&#x624D;&#x4F1A;&#x8C03;&#x7528;&#x6211;&#x4EEC;&#x4E0A;&#x8FB9;`set body`&#x4E2D;&#x5BF9;&#x5E94;&#x7684;`onFinish`&#x7684;&#x5904;&#x7406;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">if</span> (body <span class="hljs-keyword">instanceof</span> Stream) <span class="hljs-keyword">return</span> body.pipe(res) <span class="hljs-comment">// &#x7B49;&#x5230;&#x8FD9;&#x91CC;&#x7ED3;&#x675F;&#x540E;&#x624D;&#x4F1A;&#x8C03;&#x7528;&#x6211;&#x4EEC;&#x4E0A;&#x8FB9;`set body`&#x4E2D;&#x5BF9;&#x5E94;&#x7684;`onFinish`&#x7684;&#x5904;&#x7406;</span></code></pre><p>&#x540C;&#x65F6;&#x4E0A;&#x8FB9;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x5982;&#x679C;&#x4E3A;false&#x5219;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x5904;&#x7406;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!ctx.writable) return" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">if</span> (!ctx.writable) <span class="hljs-keyword">return</span></code></pre><p>&#x5176;&#x5B9E;&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;<code>response</code>&#x63D0;&#x4F9B;&#x7684;&#x4E00;&#x4E2A;&#x8BBF;&#x95EE;&#x5668;&#xFF0C;&#x8FD9;&#x91CC;&#x8FB9;&#x7528;&#x6765;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x8C03;&#x7528;&#x8FC7;<code>end</code>&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x8FD4;&#x56DE;&#x4E86;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x5DF2;&#x7ECF;&#x89E6;&#x53D1;&#x4E86;<code>response.end()</code>&#x4EE5;&#x540E;&#xFF0C;&#x5219;<code>response.finished</code>&#x4F1A;&#x88AB;&#x7F6E;&#x4E3A;<code>true</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F;&#x4E86;&#xFF0C;&#x540C;&#x65F6;&#x8BBF;&#x95EE;&#x5668;&#x4E2D;&#x8FD8;&#x5904;&#x7406;&#x4E86;&#x4E00;&#x4E2A;<code>bug</code>&#xFF0C;&#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4F9D;&#x7136;&#x6CA1;&#x6709;&#x5173;&#x95ED;&#x5957;&#x63A5;&#x5B57;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get writable() {
  // can&apos;t write any more after response finished
  if (this.res.finished) return false

  const socket = this.res.socket
  // There are already pending outgoing res, but still writable
  // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
  if (!socket) return true
  return socket.writable
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">get writable() {
  <span class="hljs-comment">// can&apos;t write any more after response finished</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.res.finished) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>

  <span class="hljs-keyword">const</span> socket = <span class="hljs-keyword">this</span>.res.socket
  <span class="hljs-comment">// There are already pending outgoing res, but still writable</span>
  <span class="hljs-comment">// https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486</span>
  <span class="hljs-keyword">if</span> (!socket) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  <span class="hljs-keyword">return</span> socket.writable
}</code></pre><p>&#x8FD9;&#x91CC;&#x5C31;&#x6709;&#x4E00;&#x4E2A;<code>koa</code>&#x4E0E;<code>express</code>&#x5BF9;&#x6BD4;&#x7684;&#x52A3;&#x52BF;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;<code>koa</code>&#x91C7;&#x7528;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#xFF0C;&#x5BF9;&#x4E8E;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4F7F;&#x7528;<code>ctx.body = &apos;XXX&apos;</code>&#x6765;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x6700;&#x7EC8;&#x8C03;&#x7528;<code>response.end</code>&#x65F6;&#x5728;&#x6D0B;&#x8471;&#x5168;&#x90E8;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0A;&#x8FB9;&#x6240;&#x63CF;&#x8FF0;&#x7684;&#x56DE;&#x8C03;&#x4E2D;&#xFF0C;&#x800C;<code>express</code>&#x5C31;&#x662F;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x5C31;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x63A7;&#x5236;&#x4F55;&#x65F6;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// express.js
router.get(&apos;/&apos;, function (req, res) {
  res.send(&apos;hello world&apos;)

  // &#x5728;&#x53D1;&#x9001;&#x6570;&#x636E;&#x540E;&#x505A;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x5904;&#x7406;
  appendLog()
})

// koa.js
app.use(ctx =&gt; {
  ctx.body = &apos;hello world&apos;

  // &#x7136;&#x800C;&#x4F9D;&#x7136;&#x53D1;&#x751F;&#x5728;&#x53D1;&#x9001;&#x6570;&#x636E;&#x4E4B;&#x524D;
  appendLog()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// express.js</span>
router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">&apos;hello world&apos;</span>)

  <span class="hljs-comment">// &#x5728;&#x53D1;&#x9001;&#x6570;&#x636E;&#x540E;&#x505A;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x5904;&#x7406;</span>
  appendLog()
})

<span class="hljs-comment">// koa.js</span>
app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">&apos;hello world&apos;</span>

  <span class="hljs-comment">// &#x7136;&#x800C;&#x4F9D;&#x7136;&#x53D1;&#x751F;&#x5728;&#x53D1;&#x9001;&#x6570;&#x636E;&#x4E4B;&#x524D;</span>
  appendLog()
})</code></pre><p>&#x4E0D;&#x8FC7;&#x597D;&#x5728;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x539F;&#x751F;&#x7684;<code>response</code>&#x5BF9;&#x8C61;&#x6765;&#x8FDB;&#x884C;&#x53D1;&#x9001;&#x6570;&#x636E;&#x7684;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x624B;&#x52A8;&#x8C03;&#x7528;&#x4E86;<code>response.end</code>&#x4EE5;&#x540E;(<code>response.finished === true</code>)&#xFF0C;&#x5C31;&#x610F;&#x5473;&#x7740;&#x6700;&#x7EC8;&#x7684;&#x56DE;&#x8C03;&#x4F1A;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#xFF0C;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x5904;&#x7406;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(ctx =&gt; {
  ctx.res.end(&apos;hello world&apos;)

  // &#x5728;&#x53D1;&#x9001;&#x6570;&#x636E;&#x540E;&#x505A;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x5904;&#x7406;
  appendLog()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.res.end(<span class="hljs-string">&apos;hello world&apos;</span>)

  <span class="hljs-comment">// &#x5728;&#x53D1;&#x9001;&#x6570;&#x636E;&#x540E;&#x505A;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x5904;&#x7406;</span>
  appendLog()
})</code></pre><h4>&#x5F02;&#x5E38;&#x5904;&#x7406;</h4><p>koa&#x7684;&#x6574;&#x4E2A;&#x8BF7;&#x6C42;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x8FD8;&#x662F;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x540E;&#x8FB9;&#x7684;&#x76D1;&#x542C;&#x4E0D;&#x4EC5;&#x4EC5;&#x6709;<code>resolve</code>&#xFF0C;&#x5BF9;<code>reject</code>&#x4E5F;&#x540C;&#x6837;&#x662F;&#x6709;&#x5904;&#x7406;&#x7684;&#x3002;<br>&#x671F;&#x95F4;&#x4EFB;&#x4F55;&#x4E00;&#x73AF;&#x51FA;bug&#x90FD;&#x4F1A;&#x5BFC;&#x81F4;&#x540E;&#x7EED;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4EE5;&#x53CA;&#x524D;&#x8FB9;&#x7B49;&#x5F85;&#x56DE;&#x8C03;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x7EC8;&#x6B62;&#xFF0C;&#x76F4;&#x63A5;&#x8DF3;&#x8F6C;&#x5230;&#x6700;&#x8FD1;&#x7684;&#x4E00;&#x4E2A;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x6A21;&#x5757;&#x3002;<br>&#x6240;&#x4EE5;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x7C7B;&#x4F3C;&#x63A5;&#x53E3;&#x8017;&#x65F6;&#x7EDF;&#x8BA1;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x5F97;&#x5728;<code>try-catch</code>&#x4E2D;&#x6267;&#x884C;<code>next</code>&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) =&gt; {
  try {
    await next()
  } catch (e) {
    console.error(e)
    ctx.body = &apos;error&apos; // &#x56E0;&#x4E3A;&#x5185;&#x90E8;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5E76;&#x6CA1;&#x6709;catch &#x6355;&#x83B7;&#x5F02;&#x5E38;&#xFF0C;&#x6240;&#x4EE5;&#x629B;&#x51FA;&#x5230;&#x4E86;&#x8FD9;&#x91CC;
  }
})

app.use(async (ctx, next) =&gt; {
  let startTime = new Date()
  try {
    await next()
  } finally {
    let endTime = new Date() // &#x629B;&#x51FA;&#x5F02;&#x5E38;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x5F71;&#x54CD;&#x8FD9;&#x91CC;&#x7684;&#x6B63;&#x5E38;&#x8F93;&#x51FA;
  }
})

app.use(ctx =&gt; Promise.reject(new Error(&apos;test&apos;)))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> next()
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">console</span>.error(e)
    ctx.body = <span class="hljs-string">&apos;error&apos;</span> <span class="hljs-comment">// &#x56E0;&#x4E3A;&#x5185;&#x90E8;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5E76;&#x6CA1;&#x6709;catch &#x6355;&#x83B7;&#x5F02;&#x5E38;&#xFF0C;&#x6240;&#x4EE5;&#x629B;&#x51FA;&#x5230;&#x4E86;&#x8FD9;&#x91CC;</span>
  }
})

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">let</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> next()
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-keyword">let</span> endTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() <span class="hljs-comment">// &#x629B;&#x51FA;&#x5F02;&#x5E38;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x5F71;&#x54CD;&#x8FD9;&#x91CC;&#x7684;&#x6B63;&#x5E38;&#x8F93;&#x51FA;</span>
  }
})

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;test&apos;</span>)))</code></pre><p>P.S. &#x5982;&#x679C;&#x5F02;&#x5E38;&#x88AB;&#x6355;&#x83B7;&#xFF0C;&#x5219;&#x4F1A;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x540E;&#x7EED;&#x7684;<code>response</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(async (ctx, next) =&gt; {
  try {
    throw new Error(&apos;test&apos;)
  } catch (e) {
    await next()
  }
})

app.use(ctx =&gt; {
  ctx.body = &apos;hello&apos;
})

// curl 127.0.0.1 
// &gt; hello" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;test&apos;</span>)
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-keyword">await</span> next()
  }
})

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">&apos;hello&apos;</span>
})

<span class="hljs-comment">// curl 127.0.0.1 </span>
<span class="hljs-comment">// &gt; hello</span></code></pre><p>&#x5982;&#x679C;&#x81EA;&#x5DF1;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6CA1;&#x6709;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#xFF0C;&#x5C31;&#x4F1A;&#x8D70;&#x5230;&#x9ED8;&#x8BA4;&#x7684;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x6A21;&#x5757;&#x4E2D;&#x3002;<br>&#x5728;&#x9ED8;&#x8BA4;&#x7684;&#x5F02;&#x5E38;&#x6A21;&#x5757;&#x4E2D;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x662F;&#x9488;&#x5BF9;statusCode&#x7684;&#x4E00;&#x4E9B;&#x5904;&#x7406;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E9B;&#x9ED8;&#x8BA4;&#x7684;&#x9519;&#x8BEF;&#x663E;&#x793A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const code = statuses[err.status]
const msg = err.expose ? err.message : code
this.status = err.status
this.length = Buffer.byteLength(msg)
this.res.end(msg)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> code = statuses[err.status]
<span class="hljs-keyword">const</span> msg = err.expose ? err.message : code
<span class="hljs-keyword">this</span>.status = err.status
<span class="hljs-keyword">this</span>.length = Buffer.byteLength(msg)
<span class="hljs-keyword">this</span>.res.end(msg)</code></pre><p><em>statuses&#x662F;&#x4E00;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#xFF0C;&#x5305;&#x62EC;&#x5404;&#x79CD;http code&#x7684;&#x4FE1;&#x606F;&#xFF1A; <a href="https://github.com/jshttp/statuses" rel="nofollow noreferrer" target="_blank">statuses</a></em><br>&#x5EFA;&#x8BAE;&#x5728;&#x6700;&#x5916;&#x5C42;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x90FD;&#x81EA;&#x5DF1;&#x505A;&#x5F02;&#x5E38;&#x5904;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;&#x9ED8;&#x8BA4;&#x7684;&#x9519;&#x8BEF;&#x63D0;&#x793A;&#x6709;&#x70B9;&#x513F;&#x592A;&#x96BE;&#x770B;&#x4E86;&#xFF08;&#x7EAF;&#x6587;&#x672C;&#xFF09;&#xFF0C;&#x81EA;&#x5DF1;&#x5904;&#x7406;&#x8DF3;&#x8F6C;&#x5230;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x9875;&#x9762;&#x4F1A;&#x597D;&#x4E00;&#x4E9B;&#xFF0C;&#x4EE5;&#x53CA;&#x907F;&#x514D;&#x4E00;&#x4E9B;&#x63A5;&#x53E3;&#x56E0;&#x4E3A;&#x9ED8;&#x8BA4;&#x7684;&#x5F02;&#x5E38;&#x4FE1;&#x606F;&#x5BFC;&#x81F4;&#x89E3;&#x6790;&#x5931;&#x8D25;&#x3002;</p><h4>redirect&#x7684;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h4><p>&#x5728;&#x539F;&#x751F;<code>http</code>&#x6A21;&#x5757;&#x4E2D;&#x8FDB;&#x884C;<code>302</code>&#x7684;&#x64CD;&#x4F5C;&#xFF08;&#x4FD7;&#x79F0;&#x91CD;&#x5B9A;&#x5411;&#xFF09;&#xFF0C;&#x9700;&#x8981;&#x8FD9;&#x4E48;&#x505A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.writeHead(302, {
  &apos;Location&apos;: &apos;redirect.html&apos;
})
response.end()
// or
response.statusCode = 302
response.setHeader(&apos;Location&apos;, &apos;redirect.html&apos;)
response.end()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">response.writeHead(<span class="hljs-number">302</span>, {
  <span class="hljs-string">&apos;Location&apos;</span>: <span class="hljs-string">&apos;redirect.html&apos;</span>
})
response.end()
<span class="hljs-comment">// or</span>
response.statusCode = <span class="hljs-number">302</span>
response.setHeader(<span class="hljs-string">&apos;Location&apos;</span>, <span class="hljs-string">&apos;redirect.html&apos;</span>)
response.end()</code></pre><p>&#x800C;&#x5728;<code>koa</code>&#x4E2D;&#x4E5F;&#x6709;<code>redirect</code>&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76F4;&#x63A5;&#x8C03;&#x7528;<code>redirect</code>&#x51FD;&#x6570;&#x6765;&#x5B8C;&#x6210;&#x91CD;&#x5B9A;&#x5411;&#xFF0C;&#x4F46;&#x662F;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x8C03;&#x7528;&#x5B8C;<code>redirect</code>&#x4E4B;&#x540E;&#x5E76;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x89E6;&#x53D1;<code>response.end()</code>&#xFF0C;&#x5B83;&#x4EC5;&#x4EC5;&#x662F;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;<code>statusCode</code>&#x53CA;<code>Location</code>&#x800C;&#x5DF2;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="redirect(url, alt) {
  // location
  if (&apos;back&apos; == url) url = this.ctx.get(&apos;Referrer&apos;) || alt || &apos;/&apos;
  this.set(&apos;Location&apos;, url)

  // status
  if (!statuses.redirect[this.status]) this.status = 302

  // html
  if (this.ctx.accepts(&apos;html&apos;)) {
    url = escape(url)
    this.type = &apos;text/html charset=utf-8&apos;
    this.body = `Redirecting to &lt;a href=&quot;${url}&quot;&gt;${url}&lt;/a&gt;.`
    return
  }

  // text
  this.type = &apos;text/plain charset=utf-8&apos;
  this.body = `Redirecting to ${url}.`
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">redirect(url, alt) {
  <span class="hljs-comment">// location</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;back&apos;</span> == url) url = <span class="hljs-keyword">this</span>.ctx.get(<span class="hljs-string">&apos;Referrer&apos;</span>) || alt || <span class="hljs-string">&apos;/&apos;</span>
  <span class="hljs-keyword">this</span>.set(<span class="hljs-string">&apos;Location&apos;</span>, url)

  <span class="hljs-comment">// status</span>
  <span class="hljs-keyword">if</span> (!statuses.redirect[<span class="hljs-keyword">this</span>.status]) <span class="hljs-keyword">this</span>.status = <span class="hljs-number">302</span>

  <span class="hljs-comment">// html</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.ctx.accepts(<span class="hljs-string">&apos;html&apos;</span>)) {
    url = <span class="hljs-built_in">escape</span>(url)
    <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;text/html charset=utf-8&apos;</span>
    <span class="hljs-keyword">this</span>.body = <span class="hljs-string">`Redirecting to &lt;a href=&quot;<span class="hljs-subst">${url}</span>&quot;&gt;<span class="hljs-subst">${url}</span>&lt;/a&gt;.`</span>
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// text</span>
  <span class="hljs-keyword">this</span>.type = <span class="hljs-string">&apos;text/plain charset=utf-8&apos;</span>
  <span class="hljs-keyword">this</span>.body = <span class="hljs-string">`Redirecting to <span class="hljs-subst">${url}</span>.`</span>
}</code></pre><p>&#x540E;&#x7EED;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x4F1A;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x5EFA;&#x8BAE;&#x5728;<code>redirect</code>&#x4E4B;&#x540E;&#x624B;&#x52A8;&#x7ED3;&#x675F;&#x5F53;&#x524D;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x76F4;&#x63A5;<code>return</code>&#xFF0C;&#x4E0D;&#x7136;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x540E;&#x7EED;&#x7684;<code>status</code>&#x3001;<code>body</code>&#x8D4B;&#x503C;&#x5F88;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x4E00;&#x4E9B;&#x8BE1;&#x5F02;&#x7684;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(ctx =&gt; {
  ctx.redirect(&apos;https://baidu.com&apos;)

  // &#x5EFA;&#x8BAE;&#x76F4;&#x63A5;return

  // &#x540E;&#x7EED;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x5728;&#x6267;&#x884C;
  ctx.body = &apos;hello world&apos;
  ctx.status = 200 // statusCode&#x7684;&#x6539;&#x53D8;&#x5BFC;&#x81F4;redirect&#x5931;&#x6548; 
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.redirect(<span class="hljs-string">&apos;https://baidu.com&apos;</span>)

  <span class="hljs-comment">// &#x5EFA;&#x8BAE;&#x76F4;&#x63A5;return</span>

  <span class="hljs-comment">// &#x540E;&#x7EED;&#x7684;&#x4EE3;&#x7801;&#x8FD8;&#x5728;&#x6267;&#x884C;</span>
  ctx.body = <span class="hljs-string">&apos;hello world&apos;</span>
  ctx.status = <span class="hljs-number">200</span> <span class="hljs-comment">// statusCode&#x7684;&#x6539;&#x53D8;&#x5BFC;&#x81F4;redirect&#x5931;&#x6548; </span>
})</code></pre><h2 id="articleHeader5">&#x5C0F;&#x8BB0;</h2><p><code>koa</code>&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x73A9;&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x5728;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;&#x4E5F;&#x53D1;&#x73B0;&#x4E86;&#x4E00;&#x4E9B;&#x5C0F;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x591A;&#x4EBA;&#x5408;&#x4F5C;&#x7EF4;&#x62A4;&#x4E00;&#x4EFD;&#x4EE3;&#x7801;&#xFF0C;&#x786E;&#x5B9E;&#x80FD;&#x591F;&#x770B;&#x51FA;&#x5404;&#x4EBA;&#x90FD;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x7F16;&#x7801;&#x98CE;&#x683C;&#xFF0C;&#x4F8B;&#x5982;<code>typeof val !== &apos;string&apos;</code>&#x548C;<code>&apos;number&apos; == typeof code</code>&#xFF0C;&#x5F88;&#x663E;&#x7136;&#x7684;&#x4E24;&#x79CD;&#x98CE;&#x683C;&#x3002;2333</li><li>delegate&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x5728;&#x5C5E;&#x6027;&#x7279;&#x522B;&#x591A;&#x7684;&#x65F6;&#x5019;&#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x597D;&#x770B;&#xFF0C;&#x4E00;&#x5927;&#x957F;&#x4E32;&#x7684;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x6362;&#x6210;&#x5FAA;&#x73AF;&#x4F1A;&#x66F4;&#x597D;&#x770B;&#x4E00;&#x4E0B;</li></ol><p>&#x4F46;&#x662F;&#xFF0C;<code>koa</code>&#x4F9D;&#x7136;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x68D2;&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x5F88;&#x9002;&#x5408;&#x9605;&#x8BFB;&#x6E90;&#x7801;&#x6765;&#x8FDB;&#x884C;&#x5B66;&#x4E60;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x4E00;&#x4E9B;&#x5C0F;&#x7EC6;&#x8282;&#xFF0C;&#x65E0;&#x4F24;&#x5927;&#x96C5;&#x3002;</p><p>&#x603B;&#x7ED3;&#x4E00;&#x4E0B;<code>koa</code>&#x4E0E;<code>koa-compose</code>&#x7684;&#x4F5C;&#x7528;&#xFF1A;</p><ul><li><code>koa</code> &#x6CE8;&#x518C;&#x4E2D;&#x95F4;&#x4EF6;&#x3001;&#x6CE8;&#x518C;<code>http</code>&#x670D;&#x52A1;&#x3001;&#x751F;&#x6210;&#x8BF7;&#x6C42;&#x4E0A;&#x4E0B;&#x6587;&#x8C03;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;&#x3001;&#x5904;&#x7406;&#x4E2D;&#x95F4;&#x4EF6;&#x5BF9;&#x4E0A;&#x4E0B;&#x6587;&#x5BF9;&#x8C61;&#x7684;&#x64CD;&#x4F5C;&#x3001;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x7ED3;&#x675F;&#x8BF7;&#x6C42;</li><li><code>koa-compose</code> &#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x96C6;&#x5408;&#x8F6C;&#x6362;&#x4E3A;&#x4E32;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x5E76;&#x63D0;&#x4F9B;&#x94A5;&#x5319;(<code>next</code>)&#x7528;&#x6765;&#x8DF3;&#x8F6C;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4EE5;&#x53CA;&#x76D1;&#x542C;<code>next</code>&#x83B7;&#x53D6;&#x5185;&#x90E8;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x7ED3;&#x675F;&#x7684;&#x901A;&#x77E5;</li></ul><h3 id="articleHeader6">&#x62DB;&#x4EBA;&#xFF0C;&#x62DB;&#x4EBA;</h3><p>&#x6211;&#x53F8;&#x73B0;&#x5728;&#x5927;&#x91CF;&#x62DB;&#x4EBA;&#x54AF;&#xFF0C;&#x524D;&#x7AEF;&#x3001;Node&#x65B9;&#x5411;&#x90FD;&#x6709;HC<br>&#x516C;&#x53F8;&#x540D;&#xFF1A;Blued&#xFF0C;&#x5750;&#x6807;&#x5E1D;&#x90FD;&#x671D;&#x9633;&#x53CC;&#x4E95;<br>&#x4E3B;&#x8981;&#x6280;&#x672F;&#x6808;&#x662F;React&#xFF0C;&#x4E5F;&#x4F1A;&#x6709;&#x673A;&#x4F1A;&#x73A9;ReactNative&#x548C;Electron<br>Node&#x65B9;&#x5411;8.x&#x7248;&#x672C;+koa &#x65B0;&#x9879;&#x76EE;&#x4F1A;&#x4EE5;TS&#x4E3A;&#x4E3B;<br>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x4EE5;&#x79C1;&#x804A;&#x6211;&#xFF0C;&#x6216;&#x8005;&#xFF1A;<br>email: jiashunming@blued.com<br>wechat: github_jiasm</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa源码阅读[1]-koa与koa-compose

## 原文链接
[https://segmentfault.com/a/1190000015810835](https://segmentfault.com/a/1190000015810835)


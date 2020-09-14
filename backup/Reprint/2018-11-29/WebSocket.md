---
title: 'WebSocket' 
date: 2018-11-29 9:33:05
hidden: true
slug: gogl0dsif8v
categories: [reprint]
---

{{< raw >}}

                    
<p>HTTP &#x534F;&#x8BAE;&#x6709;&#x4E00;&#x4E2A;&#x7F3A;&#x9677;&#xFF1A;&#x901A;&#x4FE1;&#x53EA;&#x80FD;&#x7531;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x8D77;&#x3002;<br>HTTP &#x534F;&#x8BAE;&#x505A;&#x4E0D;&#x5230;&#x670D;&#x52A1;&#x5668;&#x4E3B;&#x52A8;&#x5411;&#x5BA2;&#x6237;&#x7AEF;&#x63A8;&#x9001;&#x4FE1;&#x606F;&#x3002;(&#x8FD9;&#x79CD;&#x5355;&#x5411;&#x8BF7;&#x6C42;&#x7684;&#x7279;&#x70B9;&#xFF0C;&#x6CE8;&#x5B9A;&#x4E86;&#x5982;&#x679C;&#x670D;&#x52A1;&#x5668;&#x6709;&#x8FDE;&#x7EED;&#x7684;&#x72B6;&#x6001;&#x53D8;&#x5316;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x8981;&#x83B7;&#x77E5;&#x5C31;&#x975E;&#x5E38;&#x9EBB;&#x70E6;&#x3002;&#x6211;&#x4EEC;&#x53EA;&#x80FD;&#x4F7F;&#x7528;&#x201C;&#x8F6E;&#x8BE2;&#x201D;&#xFF1A;&#x6BCF;&#x9694;&#x4E00;&#x6BB5;&#x65F6;&#x5019;&#xFF0C;&#x5C31;&#x53D1;&#x51FA;&#x4E00;&#x4E2A;&#x8BE2;&#x95EE;&#xFF0C;&#x4E86;&#x89E3;&#x670D;&#x52A1;&#x5668;&#x6709;&#x6CA1;&#x6709;&#x65B0;&#x7684;&#x4FE1;&#x606F;&#x3002;<strong>&#x6700;&#x5178;&#x578B;&#x7684;&#x573A;&#x666F;&#x5C31;&#x662F;&#x804A;&#x5929;&#x5BA4;</strong>)&#x3002;</p>
<p>WebSocket &#x534F;&#x8BAE;&#x7684;&#x6700;&#x5927;&#x7279;&#x70B9;&#x5C31;&#x662F;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x53EF;&#x4EE5;&#x4E3B;&#x52A8;&#x5411;&#x5BA2;&#x6237;&#x7AEF;&#x63A8;&#x9001;&#x4FE1;&#x606F;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x4E5F;&#x53EF;&#x4EE5;&#x4E3B;&#x52A8;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x4FE1;&#x606F;&#xFF0C;&#x662F;&#x771F;&#x6B63;&#x7684;&#x53CC;&#x5411;&#x5E73;&#x7B49;&#x5BF9;&#x8BDD;&#xFF0C;&#x5C5E;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x63A8;&#x9001;&#x6280;&#x672F;&#x7684;&#x4E00;&#x79CD;&#x3002;</p>
<p>&#x5141;&#x8BB8;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4E0E;&#x5BA2;&#x6237;&#x7AEF;&#x8FDB;&#x884C;<strong>&#x5168;&#x53CC;&#x5DE5;</strong>&#xFF08;full-duplex&#xFF09;&#x7684;&#x901A;&#x4FE1;&#x3002;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF0C;HTTP &#x534F;&#x8BAE;&#x6709;&#x70B9;&#x50CF;&#x53D1;&#x7535;&#x5B50;&#x90AE;&#x4EF6;&#xFF0C;&#x53D1;&#x51FA;&#x540E;&#x5FC5;&#x987B;&#x7B49;&#x5F85;&#x5BF9;&#x65B9;&#x56DE;&#x4FE1;&#xFF1B;WebSocket &#x5219;&#x662F;&#x50CF;&#x6253;&#x7535;&#x8BDD;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x548C;&#x5BA2;&#x6237;&#x7AEF;&#x53EF;&#x4EE5;&#x540C;&#x65F6;&#x5411;&#x5BF9;&#x65B9;&#x53D1;&#x9001;&#x6570;&#x636E;&#xFF0C;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x5B58;&#x7740;&#x4E00;&#x6761;&#x6301;&#x7EED;&#x6253;&#x5F00;&#x7684;&#x6570;&#x636E;&#x901A;&#x9053;&#x3002;</p>
<p>&#x7279;&#x70B9;&#x5305;&#x62EC;&#xFF1A;<br>&#xFF08;1&#xFF09;&#x5EFA;&#x7ACB;&#x5728; TCP &#x534F;&#x8BAE;&#x4E4B;&#x4E0A;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x5B9E;&#x73B0;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x3002;<br>&#xFF08;2&#xFF09;&#x4E0E; HTTP &#x534F;&#x8BAE;&#x6709;&#x7740;&#x826F;&#x597D;&#x7684;&#x517C;&#x5BB9;&#x6027;&#x3002;&#x9ED8;&#x8BA4;&#x7AEF;&#x53E3;&#x4E5F;&#x662F;80&#x548C;443&#xFF0C;&#x5E76;&#x4E14;&#x63E1;&#x624B;&#x9636;&#x6BB5;&#x91C7;&#x7528; HTTP &#x534F;&#x8BAE;&#xFF0C;&#x56E0;&#x6B64;&#x63E1;&#x624B;&#x65F6;&#x4E0D;&#x5BB9;  &#x6613;&#x5C4F;&#x853D;&#xFF0C;&#x80FD;&#x901A;&#x8FC7;&#x5404;&#x79CD; HTTP &#x4EE3;&#x7406;&#x670D;&#x52A1;&#x5668;&#x3002;<br>&#xFF08;3&#xFF09;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x6BD4;&#x8F83;&#x8F7B;&#x91CF;&#xFF0C;&#x6027;&#x80FD;&#x5F00;&#x9500;&#x5C0F;&#xFF0C;&#x901A;&#x4FE1;&#x9AD8;&#x6548;&#x3002;<br>&#xFF08;4&#xFF09;&#x53EF;&#x4EE5;&#x53D1;&#x9001;&#x6587;&#x672C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x53D1;&#x9001;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x3002;<br>&#xFF08;5&#xFF09;&#x6CA1;&#x6709;&#x540C;&#x6E90;&#x9650;&#x5236;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x53EF;&#x4EE5;&#x4E0E;&#x4EFB;&#x610F;&#x670D;&#x52A1;&#x5668;&#x901A;&#x4FE1;&#xFF0C;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x53D6;&#x4EE3; Ajax&#x3002;<br>&#xFF08;6&#xFF09;&#x534F;&#x8BAE;&#x6807;&#x8BC6;&#x7B26;&#x662F;ws&#xFF08;&#x5982;&#x679C;&#x52A0;&#x5BC6;&#xFF0C;&#x5219;&#x4E3A;wss&#xFF0C;&#x5BF9;&#x5E94; HTTPS &#x534F;&#x8BAE;&#xFF09;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x7F51;&#x5740;&#x5C31;&#x662F; URL&#x3002;</p>
<h2 id="articleHeader0">WebSocket &#x63E1;&#x624B;</h2>
<p>&#x6D4F;&#x89C8;&#x5668;&#x53D1;&#x51FA;&#x7684; WebSocket &#x63E1;&#x624B;&#x8BF7;&#x6C42;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET / HTTP/1.1
Connection: Upgrade
Upgrade: websocket
Host: example.com
Origin: null
Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
Sec-WebSocket-Version: 13
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/</span> HTTP/1.1
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Host</span>: example.com
<span class="hljs-attribute">Origin</span>: null
<span class="hljs-attribute">Sec-WebSocket-Key</span>: sN9cRrP/n9NdMgdcy2VJFQ==
<span class="hljs-attribute">Sec-WebSocket-Version</span>: 13
</code></pre>
<p><strong>Upgrade</strong>&#x8868;&#x793A;&#x5C06;&#x901A;&#x4FE1;&#x534F;&#x8BAE;&#x4ECE;HTTP/1.1&#x8F6C;&#x5411;&#x8BE5;&#x5B57;&#x6BB5;&#x6307;&#x5B9A;&#x7684;&#x534F;&#x8BAE;<br><strong>Connection</strong>&#x5B57;&#x6BB5;&#x8868;&#x793A;&#x6D4F;&#x89C8;&#x5668;&#x901A;&#x77E5;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5982;&#x679C;&#x53EF;&#x4EE5;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x5347;&#x7EA7;&#x5230; WebSocket &#x534F;&#x8BAE;</p>
<p><strong>Origin</strong>&#x5B57;&#x6BB5;&#x7528;&#x4E8E;&#x63D0;&#x4F9B;&#x8BF7;&#x6C42;&#x53D1;&#x51FA;&#x7684;&#x57DF;&#x540D;&#xFF0C;&#x4F9B;&#x670D;&#x52A1;&#x5668;&#x9A8C;&#x8BC1;&#x662F;&#x5426;&#x8BB8;&#x53EF;&#x7684;&#x8303;&#x56F4;&#x5185;&#xFF08;&#x670D;&#x52A1;&#x5668;&#x4E5F;&#x53EF;&#x4EE5;&#x4E0D;&#x9A8C;&#x8BC1;&#xFF09;</p>
<p><strong>Sec-WebSocket-Key</strong>&#x5219;&#x662F;&#x7528;&#x4E8E;&#x63E1;&#x624B;&#x534F;&#x8BAE;&#x7684;&#x5BC6;&#x94A5;&#xFF0C;&#x662F; Base64 &#x7F16;&#x7801;&#x7684;16&#x5B57;&#x8282;&#x968F;&#x673A;&#x5B57;&#x7B26;&#x4E32;</p>
<p>&#x670D;&#x52A1;&#x5668;&#x7684; WebSocket &#x56DE;&#x5E94;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 Switching Protocols
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-Origin: null
Sec-WebSocket-Location: ws://example.com/
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code>HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">101</span> Switching Protocols
<span class="hljs-string">Connection:</span> Upgrade
<span class="hljs-string">Upgrade:</span> websocket
Sec-WebSocket-<span class="hljs-string">Accept:</span> fFBooB7FAkLlXgRSz0BT3v4hq5s=
Sec-WebSocket-<span class="hljs-string">Origin:</span> <span class="hljs-literal">null</span>
Sec-WebSocket-<span class="hljs-string">Location:</span> <span class="hljs-string">ws:</span><span class="hljs-comment">//example.com/</span>
</code></pre>
<p><strong>Connection</strong>&#x5B57;&#x6BB5;&#x901A;&#x77E5;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x9700;&#x8981;&#x6539;&#x53D8;&#x534F;&#x8BAE;</p>
<p><strong>Sec-WebSocket-Accept</strong>&#x5B57;&#x6BB5;&#x662F;&#x670D;&#x52A1;&#x5668;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x63D0;&#x4F9B;&#x7684;Sec-WebSocket-Key&#x5B57;&#x7B26;&#x4E32;&#x540E;&#x9762;&#xFF0C;&#x6DFB;&#x52A0;&#x201C;258EAFA5-E914-47DA-95CA-C5AB0DC85B11&#x201D;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53D6; SHA-1 &#x7684;&#x54C8;&#x5E0C;&#x503C;&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x5C06;&#x5BF9;&#x8FD9;&#x4E2A;&#x503C;&#x8FDB;&#x884C;&#x9A8C;&#x8BC1;&#xFF0C;&#x4EE5;&#x8BC1;&#x660E;&#x786E;&#x5B9E;&#x662F;&#x76EE;&#x6807;&#x670D;&#x52A1;&#x5668;&#x56DE;&#x5E94;&#x4E86; WebSocket &#x8BF7;&#x6C42;</p>
<p>S<strong>ec-WebSocket-Location</strong>&#x5B57;&#x6BB5;&#x8868;&#x793A;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#x7684; WebSocket &#x7F51;&#x5740;</p>
<p>&#x5B8C;&#x6210;&#x63E1;&#x624B;&#x4EE5;&#x540E;&#xFF0C;WebSocket &#x534F;&#x8BAE;&#x5C31;&#x5728; TCP &#x534F;&#x8BAE;&#x4E4B;&#x4E0A;&#xFF0C;&#x5F00;&#x59CB;&#x4F20;&#x9001;&#x6570;&#x636E;&#x3002;</p>
<h2 id="articleHeader1">&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x7B80;&#x5355;&#x793A;&#x4F8B;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ws = new WebSocket(&apos;wss://echo.websocket.org&apos;);

ws.onopen = function(evt) {
  console.log(&apos;Connection open ...&apos;);
  ws.send(&apos;Hello WebSockets!&apos;);
};

ws.onmessage = function(evt) {
  console.log(&apos;Received Message: &apos; + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log(&apos;Connection closed.&apos;);
};
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ws = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-string">&apos;wss://echo.websocket.org&apos;</span>);

ws.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Connection open ...&apos;</span>);
  ws.send(<span class="hljs-string">&apos;Hello WebSockets!&apos;</span>);
};

ws.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Received Message: &apos;</span> + evt.data);
  ws.close();
};

ws.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">evt</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Connection closed.&apos;</span>);
};
</code></pre>
<h2 id="articleHeader2">&#x5BA2;&#x6237;&#x7AEF; API</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#x548C;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;
&#x53D1;&#x9001;&#x6570;&#x636E;&#x548C;&#x63A5;&#x6536;&#x6570;&#x636E;
&#x5904;&#x7406;&#x9519;&#x8BEF;

WebSocket&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x65B0;&#x5EFA;WebSocket&#x5B9E;&#x4F8B;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs"><code>&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#x548C;&#x65AD;&#x5F00;&#x8FDE;&#x63A5;
&#x53D1;&#x9001;&#x6570;&#x636E;&#x548C;&#x63A5;&#x6536;&#x6570;&#x636E;
&#x5904;&#x7406;&#x9519;&#x8BEF;

WebSocket&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x65B0;&#x5EFA;WebSocket&#x5B9E;&#x4F8B;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ws = new WebSocket(&apos;ws://localhost:8080&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-type">WebSocket</span>(<span class="hljs-string">&apos;ws://localhost:8080&apos;</span>);
</code></pre>
<h2 id="articleHeader3">webSocket.readyState</h2>
<p>webSocket.readyState&#x5C5E;&#x6027;&#x8FD4;&#x56DE;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;&#x5F53;&#x524D;&#x72B6;&#x6001;&#xFF0C;&#x5171;&#x6709;&#x56DB;&#x79CD;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CONNECTING&#xFF1A;&#x503C;&#x4E3A;0&#xFF0C;&#x8868;&#x793A;&#x6B63;&#x5728;&#x8FDE;&#x63A5;&#x3002;
OPEN&#xFF1A;&#x503C;&#x4E3A;1&#xFF0C;&#x8868;&#x793A;&#x8FDE;&#x63A5;&#x6210;&#x529F;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x4FE1;&#x4E86;&#x3002;
CLOSING&#xFF1A;&#x503C;&#x4E3A;2&#xFF0C;&#x8868;&#x793A;&#x8FDE;&#x63A5;&#x6B63;&#x5728;&#x5173;&#x95ED;&#x3002;
CLOSED&#xFF1A;&#x503C;&#x4E3A;3&#xFF0C;&#x8868;&#x793A;&#x8FDE;&#x63A5;&#x5DF2;&#x7ECF;&#x5173;&#x95ED;&#xFF0C;&#x6216;&#x8005;&#x6253;&#x5F00;&#x8FDE;&#x63A5;&#x5931;&#x8D25;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lsl"><code>CONNECTING&#xFF1A;&#x503C;&#x4E3A;<span class="hljs-number">0</span>&#xFF0C;&#x8868;&#x793A;&#x6B63;&#x5728;&#x8FDE;&#x63A5;&#x3002;
OPEN&#xFF1A;&#x503C;&#x4E3A;<span class="hljs-number">1</span>&#xFF0C;&#x8868;&#x793A;&#x8FDE;&#x63A5;&#x6210;&#x529F;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x4FE1;&#x4E86;&#x3002;
CLOSING&#xFF1A;&#x503C;&#x4E3A;<span class="hljs-number">2</span>&#xFF0C;&#x8868;&#x793A;&#x8FDE;&#x63A5;&#x6B63;&#x5728;&#x5173;&#x95ED;&#x3002;
CLOSED&#xFF1A;&#x503C;&#x4E3A;<span class="hljs-number">3</span>&#xFF0C;&#x8868;&#x793A;&#x8FDE;&#x63A5;&#x5DF2;&#x7ECF;&#x5173;&#x95ED;&#xFF0C;&#x6216;&#x8005;&#x6253;&#x5F00;&#x8FDE;&#x63A5;&#x5931;&#x8D25;&#x3002;
</code></pre>
<p>&#x4F8B;&#x5B50;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">switch</span> (ws.readyState) {
  <span class="hljs-keyword">case</span> WebSocket.<span class="hljs-string">CONNECTING:</span>
    <span class="hljs-comment">// do something</span>
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> WebSocket.<span class="hljs-string">OPEN:</span>
    <span class="hljs-comment">// do something</span>
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> WebSocket.<span class="hljs-string">CLOSING:</span>
    <span class="hljs-comment">// do something</span>
    <span class="hljs-keyword">break</span>;
  <span class="hljs-keyword">case</span> WebSocket.<span class="hljs-string">CLOSED:</span>
    <span class="hljs-comment">// do something</span>
    <span class="hljs-keyword">break</span>;
<span class="hljs-symbol">  default:</span>
    <span class="hljs-comment">// this never happens</span>
    <span class="hljs-keyword">break</span>;
}
</code></pre>
<h2 id="articleHeader4">webSocket.onopen</h2>
<p>&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;onopen&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x8FDE;&#x63A5;&#x6210;&#x529F;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ws.onopen = function () {
  ws.send(&apos;Hello Server!&apos;);
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>ws.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  ws.send(<span class="hljs-string">&apos;Hello Server!&apos;</span>);
}
</code></pre>
<p>&#x5982;&#x679C;&#x8981;&#x6307;&#x5B9A;<strong>&#x591A;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;</strong>&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<strong>addEventListener</strong>&#x65B9;&#x6CD5;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ws.addEventListener(&apos;open&apos;, function (event) {
  ws.send(&apos;Hello Server!&apos;);
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>ws.addEventListener(<span class="hljs-string">&apos;open&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(event)</span> </span>{
  ws.send(<span class="hljs-string">&apos;Hello Server!&apos;</span>);
});
</code></pre>
<h2 id="articleHeader5">webSocket.onclose</h2>
<p>&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;onclose&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};

ws.addEventListener(&quot;close&quot;, function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs verilog"><code>ws<span class="hljs-variable">.onclose</span> = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">event</span>) {
  <span class="hljs-keyword">var</span> code = <span class="hljs-keyword">event</span><span class="hljs-variable">.code</span>;
  <span class="hljs-keyword">var</span> reason = <span class="hljs-keyword">event</span><span class="hljs-variable">.reason</span>;
  <span class="hljs-keyword">var</span> wasClean = <span class="hljs-keyword">event</span><span class="hljs-variable">.wasClean</span>;
  <span class="hljs-comment">// handle close event</span>
};

ws<span class="hljs-variable">.addEventListener</span>(<span class="hljs-string">&quot;close&quot;</span>, <span class="hljs-keyword">function</span>(<span class="hljs-keyword">event</span>) {
  <span class="hljs-keyword">var</span> code = <span class="hljs-keyword">event</span><span class="hljs-variable">.code</span>;
  <span class="hljs-keyword">var</span> reason = <span class="hljs-keyword">event</span><span class="hljs-variable">.reason</span>;
  <span class="hljs-keyword">var</span> wasClean = <span class="hljs-keyword">event</span><span class="hljs-variable">.wasClean</span>;
  <span class="hljs-comment">// handle close event</span>
});
</code></pre>
<h2 id="articleHeader6">webSocket.onmessage</h2>
<p>&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;onmessage&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x6536;&#x5230;&#x670D;&#x52A1;&#x5668;&#x6570;&#x636E;&#x540E;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ws.onmessage = function(event) {
  var data = event.data;
  // &#x5904;&#x7406;&#x6570;&#x636E;
};

ws.addEventListener(&quot;message&quot;, function(event) {
  var data = event.data;
  // &#x5904;&#x7406;&#x6570;&#x636E;
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>ws.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-keyword">var</span> data = event.data;
  <span class="hljs-comment">// &#x5904;&#x7406;&#x6570;&#x636E;</span>
};

ws.addEventListener(<span class="hljs-string">&quot;message&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-keyword">var</span> data = event.data;
  <span class="hljs-comment">// &#x5904;&#x7406;&#x6570;&#x636E;</span>
});
</code></pre>
<p><strong>&#x670D;&#x52A1;&#x5668;&#x6570;&#x636E;&#x53EF;&#x80FD;&#x662F;&#x6587;&#x672C;&#xFF0C;&#x4E5F;&#x53EF;&#x80FD;&#x662F;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#xFF08;blob&#x5BF9;&#x8C61;&#x6216;Arraybuffer&#x5BF9;&#x8C61;&#xFF09;</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ws.onmessage = function(event){
  if(typeOf event.data === String) {
    console.log(&quot;Received data string&quot;);
  }

  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log(&quot;Received arraybuffer&quot;);
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>ws.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
  <span class="hljs-keyword">if</span>(typeOf event.data === <span class="hljs-built_in">String</span>) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Received data string&quot;</span>);
  }

  <span class="hljs-keyword">if</span>(event.data <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">ArrayBuffer</span>){
    <span class="hljs-keyword">var</span> buffer = event.data;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Received arraybuffer&quot;</span>);
  }
}
</code></pre>
<p>&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<strong>binaryType</strong>&#x5C5E;&#x6027;&#xFF0C;&#x663E;&#x5F0F;&#x6307;&#x5B9A;&#x6536;&#x5230;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x7C7B;&#x578B;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/ &#x6536;&#x5230;&#x7684;&#x662F; blob &#x6570;&#x636E;
ws.binaryType = &quot;blob&quot;;
ws.onmessage = function(e) {
  console.log(e.data.size);
};

// &#x6536;&#x5230;&#x7684;&#x662F; ArrayBuffer &#x6570;&#x636E;
ws.binaryType = &quot;arraybuffer&quot;;
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs scilab"><code>/ &#x6536;&#x5230;&#x7684;&#x662F; blob &#x6570;&#x636E;
ws.binaryType = <span class="hljs-string">&quot;blob&quot;</span>;
ws.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> {</span>
  console.<span class="hljs-built_in">log</span>(e.data.<span class="hljs-built_in">size</span>);
};

<span class="hljs-comment">// &#x6536;&#x5230;&#x7684;&#x662F; ArrayBuffer &#x6570;&#x636E;</span>
ws.binaryType = <span class="hljs-string">&quot;arraybuffer&quot;</span>;
ws.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> {</span>
  console.<span class="hljs-built_in">log</span>(e.data.byteLength);
};</code></pre>
<h2 id="articleHeader7">webSocket.send()</h2>
<p>&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;send()&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x6570;&#x636E;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ws.send(&apos;your message&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs autoit"><code>ws.<span class="hljs-built_in">send</span>(<span class="hljs-string">&apos;your message&apos;</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>// Blob&#x5BF9;&#x8C61;&#x8868;&#x793A;&#x4E00;&#x4E2A;&#x4E0D;&#x53EF;&#x53D8;&#x7684;, &#x539F;&#x59CB;&#x6570;&#x636E;&#x7684;&#x7C7B;&#x4F3C;&#x6587;&#x4EF6;&#x5BF9;&#x8C61;&#x3002;Blob&#x8868;&#x793A;&#x7684;&#x6570;&#x636E;&#x4E0D;&#x4E00;&#x5B9A;&#x662F;&#x4E00;&#x4E2A;JavaScript&#x539F;&#x751F;&#x683C;&#x5F0F; blob&#x5BF9;&#x8C61;&#x672C;&#x8D28;&#x4E0A;&#x662F;js&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x91CC;&#x9762;&#x53EF;&#x4EE5;&#x50A8;&#x5B58;&#x5927;&#x91CF;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x7F16;&#x7801;&#x683C;&#x5F0F;&#x7684;&#x6570;&#x636E;&#x3002;</p>
<p>&#x53D1;&#x9001; Blob &#x5BF9;&#x8C61;&#x7684;&#x4F8B;&#x5B50;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var file = document
  .querySelector(&apos;input[type=&quot;file&quot;]&apos;)
  .files[0];
ws.send(file);
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">file</span> = document
  .querySelector(&apos;<span class="hljs-keyword">input</span>[<span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;file&quot;</span>]&apos;)
  .files[0];
ws.send(<span class="hljs-keyword">file</span>);
</code></pre>
<p>&#x53D1;&#x9001; ArrayBuffer &#x5BF9;&#x8C61;&#x7684;&#x4F8B;&#x5B50;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i &lt; img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// Sending canvas ImageData as ArrayBuffer</span>
<span class="hljs-keyword">var</span> img = canvas_context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">400</span>, <span class="hljs-number">320</span>);
<span class="hljs-keyword">var</span> binary = new Uint8Array(img.<span class="hljs-keyword">data</span>.length);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; img.<span class="hljs-keyword">data</span>.length; i++) {
  binary[i] = img.<span class="hljs-keyword">data</span>[i];
}
ws.send(binary.buffer);</code></pre>
<h2 id="articleHeader8">webSocket.bufferedAmount</h2>
<p>&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;bufferedAmount&#x5C5E;&#x6027;&#xFF0C;&#x8868;&#x793A;&#x8FD8;&#x6709;&#x591A;&#x5C11;&#x5B57;&#x8282;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x6CA1;&#x6709;&#x53D1;&#x9001;&#x51FA;&#x53BB;&#x3002;<strong>&#x5B83;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5224;&#x65AD;&#x53D1;&#x9001;&#x662F;&#x5426;&#x7ED3;&#x675F;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = new ArrayBuffer(10000000);
socket.send(data);

if (socket.bufferedAmount === 0) {
  // &#x53D1;&#x9001;&#x5B8C;&#x6BD5;
} else {
  // &#x53D1;&#x9001;&#x8FD8;&#x6CA1;&#x7ED3;&#x675F;
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">data</span> = <span class="hljs-literal">new</span> ArrayBuffer(<span class="hljs-number">10000000</span>);
socket.send(<span class="hljs-built_in">data</span>);

<span class="hljs-keyword">if</span> (socket.bufferedAmount === <span class="hljs-number">0</span>) {
  <span class="hljs-comment">// &#x53D1;&#x9001;&#x5B8C;&#x6BD5;</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// &#x53D1;&#x9001;&#x8FD8;&#x6CA1;&#x7ED3;&#x675F;</span>
}</code></pre>
<h2 id="articleHeader9">webSocket.onerror</h2>
<p>&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#x7684;<strong>onerror</strong>&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;<strong>&#x6307;&#x5B9A;&#x62A5;&#x9519;&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</strong>&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.onerror = function(event) {
  // handle error event
};

socket.addEventListener(&quot;error&quot;, function(event) {
  // handle error event
});
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs actionscript"><code>socket.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-comment">// handle error event</span>
};

socket.addEventListener(<span class="hljs-string">&quot;error&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-comment">// handle error event</span>
});
</code></pre>
<h2 id="articleHeader10">&#x901A;&#x8FC7;javaweb&#x5B9E;&#x73B0;&#x804A;&#x5929;&#x5BA4;&#x529F;&#x80FD;&#xFF1A;</h2>
<p><strong>WebSocketTest.java:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package me.gacl.websocket;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 * @ServerEndpoint &#x6CE8;&#x89E3;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x5C42;&#x6B21;&#x7684;&#x6CE8;&#x89E3;&#xFF0C;&#x5B83;&#x7684;&#x529F;&#x80FD;&#x4E3B;&#x8981;&#x662F;&#x5C06;&#x76EE;&#x524D;&#x7684;&#x7C7B;&#x5B9A;&#x4E49;&#x6210;&#x4E00;&#x4E2A;websocket&#x670D;&#x52A1;&#x5668;&#x7AEF;,
 * &#x6CE8;&#x89E3;&#x7684;&#x503C;&#x5C06;&#x88AB;&#x7528;&#x4E8E;&#x76D1;&#x542C;&#x7528;&#x6237;&#x8FDE;&#x63A5;&#x7684;&#x7EC8;&#x7AEF;&#x8BBF;&#x95EE;URL&#x5730;&#x5740;,&#x5BA2;&#x6237;&#x7AEF;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;URL&#x6765;&#x8FDE;&#x63A5;&#x5230;WebSocket&#x670D;&#x52A1;&#x5668;&#x7AEF;
 */
@ServerEndpoint(&quot;/websocket&quot;)
public class WebSocketTest {
    //&#x9759;&#x6001;&#x53D8;&#x91CF;&#xFF0C;&#x7528;&#x6765;&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x5728;&#x7EBF;&#x8FDE;&#x63A5;&#x6570;&#x3002;&#x5E94;&#x8BE5;&#x628A;&#x5B83;&#x8BBE;&#x8BA1;&#x6210;&#x7EBF;&#x7A0B;&#x5B89;&#x5168;&#x7684;&#x3002;
    private static int onlineCount = 0;

    //concurrent&#x5305;&#x7684;&#x7EBF;&#x7A0B;&#x5B89;&#x5168;Set&#xFF0C;&#x7528;&#x6765;&#x5B58;&#x653E;&#x6BCF;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x5BF9;&#x5E94;&#x7684;MyWebSocket&#x5BF9;&#x8C61;&#x3002;&#x82E5;&#x8981;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x7AEF;&#x4E0E;&#x5355;&#x4E00;&#x5BA2;&#x6237;&#x7AEF;&#x901A;&#x4FE1;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;Map&#x6765;&#x5B58;&#x653E;&#xFF0C;&#x5176;&#x4E2D;Key&#x53EF;&#x4EE5;&#x4E3A;&#x7528;&#x6237;&#x6807;&#x8BC6;
    private static CopyOnWriteArraySet&lt;WebSocketTest&gt; webSocketSet = new CopyOnWriteArraySet&lt;WebSocketTest&gt;();

    //&#x4E0E;&#x67D0;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8FDE;&#x63A5;&#x4F1A;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x5B83;&#x6765;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;
    private Session session;

    /**
     * &#x8FDE;&#x63A5;&#x5EFA;&#x7ACB;&#x6210;&#x529F;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;
     * @param session  &#x53EF;&#x9009;&#x7684;&#x53C2;&#x6570;&#x3002;session&#x4E3A;&#x4E0E;&#x67D0;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8FDE;&#x63A5;&#x4F1A;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x5B83;&#x6765;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;
     */
    @OnOpen
    public void onOpen(Session session){
        this.session = session;
        webSocketSet.add(this);     //&#x52A0;&#x5165;set&#x4E2D;
        addOnlineCount();           //&#x5728;&#x7EBF;&#x6570;&#x52A0;1
        System.out.println(&quot;&#x6709;&#x65B0;&#x8FDE;&#x63A5;&#x52A0;&#x5165;&#xFF01;&#x5F53;&#x524D;&#x5728;&#x7EBF;&#x4EBA;&#x6570;&#x4E3A;&quot; + getOnlineCount());
    }

    /**
     * &#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;
     */
    @OnClose
    public void onClose(){
        webSocketSet.remove(this);  //&#x4ECE;set&#x4E2D;&#x5220;&#x9664;
        subOnlineCount();           //&#x5728;&#x7EBF;&#x6570;&#x51CF;1
        System.out.println(&quot;&#x6709;&#x4E00;&#x8FDE;&#x63A5;&#x5173;&#x95ED;&#xFF01;&#x5F53;&#x524D;&#x5728;&#x7EBF;&#x4EBA;&#x6570;&#x4E3A;&quot; + getOnlineCount());
    }

    /**
     * &#x6536;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x6D88;&#x606F;&#x540E;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;
     * @param message &#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x8FC7;&#x6765;&#x7684;&#x6D88;&#x606F;
     * @param session &#x53EF;&#x9009;&#x7684;&#x53C2;&#x6570;
     */
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println(&quot;&#x6765;&#x81EA;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6D88;&#x606F;:&quot; + message);
        //&#x7FA4;&#x53D1;&#x6D88;&#x606F;
        for(WebSocketTest item: webSocketSet){
            try {
                item.sendMessage(message);
            } catch (IOException e) {
                e.printStackTrace();
                continue;
            }
        }
    }

    /**
     * &#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;&#x8C03;&#x7528;
     * @param session
     * @param error
     */
    @OnError
    public void onError(Session session, Throwable error){
        System.out.println(&quot;&#x53D1;&#x751F;&#x9519;&#x8BEF;&quot;);
        error.printStackTrace();
    }

    /**
     * &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0E;&#x4E0A;&#x9762;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x6CA1;&#x6709;&#x7528;&#x6CE8;&#x89E3;&#xFF0C;&#x662F;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x7684;&#x65B9;&#x6CD5;&#x3002;
     * @param message
     * @throws IOException
     */
    public void sendMessage(String message) throws IOException{
        this.session.getBasicRemote().sendText(message);
        //this.session.getAsyncRemote().sendText(message);
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketTest.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketTest.onlineCount--;
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">package</span> me.gacl.websocket;

<span class="hljs-keyword">import</span> java.io.IOException;
<span class="hljs-keyword">import</span> java.util.concurrent.CopyOnWriteArraySet;

<span class="hljs-keyword">import</span> javax.websocket.*;
<span class="hljs-keyword">import</span> javax.websocket.server.ServerEndpoint;

<span class="hljs-comment">/**
 * <span class="hljs-doctag">@ServerEndpoint</span> &#x6CE8;&#x89E3;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x5C42;&#x6B21;&#x7684;&#x6CE8;&#x89E3;&#xFF0C;&#x5B83;&#x7684;&#x529F;&#x80FD;&#x4E3B;&#x8981;&#x662F;&#x5C06;&#x76EE;&#x524D;&#x7684;&#x7C7B;&#x5B9A;&#x4E49;&#x6210;&#x4E00;&#x4E2A;websocket&#x670D;&#x52A1;&#x5668;&#x7AEF;,
 * &#x6CE8;&#x89E3;&#x7684;&#x503C;&#x5C06;&#x88AB;&#x7528;&#x4E8E;&#x76D1;&#x542C;&#x7528;&#x6237;&#x8FDE;&#x63A5;&#x7684;&#x7EC8;&#x7AEF;&#x8BBF;&#x95EE;URL&#x5730;&#x5740;,&#x5BA2;&#x6237;&#x7AEF;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;URL&#x6765;&#x8FDE;&#x63A5;&#x5230;WebSocket&#x670D;&#x52A1;&#x5668;&#x7AEF;
 */</span>
<span class="hljs-meta">@ServerEndpoint</span>(<span class="hljs-string">&quot;/websocket&quot;</span>)
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WebSocketTest</span> </span>{
    <span class="hljs-comment">//&#x9759;&#x6001;&#x53D8;&#x91CF;&#xFF0C;&#x7528;&#x6765;&#x8BB0;&#x5F55;&#x5F53;&#x524D;&#x5728;&#x7EBF;&#x8FDE;&#x63A5;&#x6570;&#x3002;&#x5E94;&#x8BE5;&#x628A;&#x5B83;&#x8BBE;&#x8BA1;&#x6210;&#x7EBF;&#x7A0B;&#x5B89;&#x5168;&#x7684;&#x3002;</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">int</span> onlineCount = <span class="hljs-number">0</span>;

    <span class="hljs-comment">//concurrent&#x5305;&#x7684;&#x7EBF;&#x7A0B;&#x5B89;&#x5168;Set&#xFF0C;&#x7528;&#x6765;&#x5B58;&#x653E;&#x6BCF;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x5BF9;&#x5E94;&#x7684;MyWebSocket&#x5BF9;&#x8C61;&#x3002;&#x82E5;&#x8981;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x7AEF;&#x4E0E;&#x5355;&#x4E00;&#x5BA2;&#x6237;&#x7AEF;&#x901A;&#x4FE1;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;Map&#x6765;&#x5B58;&#x653E;&#xFF0C;&#x5176;&#x4E2D;Key&#x53EF;&#x4EE5;&#x4E3A;&#x7528;&#x6237;&#x6807;&#x8BC6;</span>
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">static</span> CopyOnWriteArraySet&lt;WebSocketTest&gt; webSocketSet = <span class="hljs-keyword">new</span> CopyOnWriteArraySet&lt;WebSocketTest&gt;();

    <span class="hljs-comment">//&#x4E0E;&#x67D0;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8FDE;&#x63A5;&#x4F1A;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x5B83;&#x6765;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;</span>
    <span class="hljs-keyword">private</span> Session session;

    <span class="hljs-comment">/**
     * &#x8FDE;&#x63A5;&#x5EFA;&#x7ACB;&#x6210;&#x529F;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;
     * <span class="hljs-doctag">@param</span> session  &#x53EF;&#x9009;&#x7684;&#x53C2;&#x6570;&#x3002;session&#x4E3A;&#x4E0E;&#x67D0;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8FDE;&#x63A5;&#x4F1A;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x5B83;&#x6765;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;
     */</span>
    <span class="hljs-meta">@OnOpen</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onOpen</span><span class="hljs-params">(Session session)</span></span>{
        <span class="hljs-keyword">this</span>.session = session;
        webSocketSet.add(<span class="hljs-keyword">this</span>);     <span class="hljs-comment">//&#x52A0;&#x5165;set&#x4E2D;</span>
        addOnlineCount();           <span class="hljs-comment">//&#x5728;&#x7EBF;&#x6570;&#x52A0;1</span>
        System.out.println(<span class="hljs-string">&quot;&#x6709;&#x65B0;&#x8FDE;&#x63A5;&#x52A0;&#x5165;&#xFF01;&#x5F53;&#x524D;&#x5728;&#x7EBF;&#x4EBA;&#x6570;&#x4E3A;&quot;</span> + getOnlineCount());
    }

    <span class="hljs-comment">/**
     * &#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;
     */</span>
    <span class="hljs-meta">@OnClose</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onClose</span><span class="hljs-params">()</span></span>{
        webSocketSet.remove(<span class="hljs-keyword">this</span>);  <span class="hljs-comment">//&#x4ECE;set&#x4E2D;&#x5220;&#x9664;</span>
        subOnlineCount();           <span class="hljs-comment">//&#x5728;&#x7EBF;&#x6570;&#x51CF;1</span>
        System.out.println(<span class="hljs-string">&quot;&#x6709;&#x4E00;&#x8FDE;&#x63A5;&#x5173;&#x95ED;&#xFF01;&#x5F53;&#x524D;&#x5728;&#x7EBF;&#x4EBA;&#x6570;&#x4E3A;&quot;</span> + getOnlineCount());
    }

    <span class="hljs-comment">/**
     * &#x6536;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x6D88;&#x606F;&#x540E;&#x8C03;&#x7528;&#x7684;&#x65B9;&#x6CD5;
     * <span class="hljs-doctag">@param</span> message &#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x8FC7;&#x6765;&#x7684;&#x6D88;&#x606F;
     * <span class="hljs-doctag">@param</span> session &#x53EF;&#x9009;&#x7684;&#x53C2;&#x6570;
     */</span>
    <span class="hljs-meta">@OnMessage</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onMessage</span><span class="hljs-params">(String message, Session session)</span> </span>{
        System.out.println(<span class="hljs-string">&quot;&#x6765;&#x81EA;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6D88;&#x606F;:&quot;</span> + message);
        <span class="hljs-comment">//&#x7FA4;&#x53D1;&#x6D88;&#x606F;</span>
        <span class="hljs-keyword">for</span>(WebSocketTest item: webSocketSet){
            <span class="hljs-keyword">try</span> {
                item.sendMessage(message);
            } <span class="hljs-keyword">catch</span> (IOException e) {
                e.printStackTrace();
                <span class="hljs-keyword">continue</span>;
            }
        }
    }

    <span class="hljs-comment">/**
     * &#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;&#x8C03;&#x7528;
     * <span class="hljs-doctag">@param</span> session
     * <span class="hljs-doctag">@param</span> error
     */</span>
    <span class="hljs-meta">@OnError</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">onError</span><span class="hljs-params">(Session session, Throwable <span class="hljs-keyword">error</span>)</span></span>{
        System.out.println(<span class="hljs-string">&quot;&#x53D1;&#x751F;&#x9519;&#x8BEF;&quot;</span>);
        <span class="hljs-keyword">error</span>.printStackTrace();
    }

    <span class="hljs-comment">/**
     * &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0E;&#x4E0A;&#x9762;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x4E0D;&#x4E00;&#x6837;&#x3002;&#x6CA1;&#x6709;&#x7528;&#x6CE8;&#x89E3;&#xFF0C;&#x662F;&#x6839;&#x636E;&#x81EA;&#x5DF1;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x7684;&#x65B9;&#x6CD5;&#x3002;
     * <span class="hljs-doctag">@param</span> message
     * <span class="hljs-doctag">@throws</span> IOException
     */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">sendMessage</span><span class="hljs-params">(String message)</span> <span class="hljs-keyword">throws</span> IOException</span>{
        <span class="hljs-keyword">this</span>.session.getBasicRemote().sendText(message);
        <span class="hljs-comment">//this.session.getAsyncRemote().sendText(message);</span>
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">synchronized</span> <span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">getOnlineCount</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> onlineCount;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">synchronized</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">addOnlineCount</span><span class="hljs-params">()</span> </span>{
        WebSocketTest.onlineCount++;
    }

    <span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">synchronized</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">subOnlineCount</span><span class="hljs-params">()</span> </span>{
        WebSocketTest.onlineCount--;
    }
}
</code></pre>
<p><strong>pom.xml:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;dependencies&gt;
      &lt;dependency&gt;
        &lt;groupId&gt;javax&lt;/groupId&gt;
        &lt;artifactId&gt;javaee-api&lt;/artifactId&gt;
        &lt;version&gt;7.0&lt;/version&gt;
        &lt;scope&gt;provided&lt;/scope&gt;
      &lt;/dependency&gt;
  &lt;/dependencies&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">dependencies</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">dependency</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">groupId</span>&gt;</span>javax<span class="hljs-tag">&lt;/<span class="hljs-name">groupId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">artifactId</span>&gt;</span>javaee-api<span class="hljs-tag">&lt;/<span class="hljs-name">artifactId</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">version</span>&gt;</span>7.0<span class="hljs-tag">&lt;/<span class="hljs-name">version</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">scope</span>&gt;</span>provided<span class="hljs-tag">&lt;/<span class="hljs-name">scope</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">dependency</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">dependencies</span>&gt;</span></code></pre>
<p><strong>index.jsp:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;%@ page language=&quot;java&quot; pageEncoding=&quot;UTF-8&quot; %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Java&#x540E;&#x7AEF;WebSocket&#x7684;Tomcat&#x5B9E;&#x73B0;&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    Welcome&lt;br/&gt;&lt;input id=&quot;text&quot; type=&quot;text&quot;/&gt;
    &lt;button onclick=&quot;send()&quot;&gt;&#x53D1;&#x9001;&#x6D88;&#x606F;&lt;/button&gt;
    &lt;hr/&gt;
    &lt;button onclick=&quot;closeWebSocket()&quot;&gt;&#x5173;&#x95ED;WebSocket&#x8FDE;&#x63A5;&lt;/button&gt;
    &lt;hr/&gt;
    &lt;div id=&quot;message&quot;&gt;&lt;/div&gt;
&lt;/body&gt;

&lt;script type=&quot;text/javascript&quot;&gt;
    var websocket = null;
    //&#x5224;&#x65AD;&#x5F53;&#x524D;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x5426;&#x652F;&#x6301;WebSocket
    if (&apos;WebSocket&apos; in window) {
        websocket = new WebSocket(&quot;ws://localhost:8080/websocket&quot;);
    }
    else {
        alert(&apos;&#x5F53;&#x524D;&#x6D4F;&#x89C8;&#x5668; Not support websocket&apos;)
    }

    //&#x8FDE;&#x63A5;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;
    websocket.onerror = function () {
        setMessageInnerHTML(&quot;WebSocket&#x8FDE;&#x63A5;&#x53D1;&#x751F;&#x9519;&#x8BEF;&quot;);
    };

    //&#x8FDE;&#x63A5;&#x6210;&#x529F;&#x5EFA;&#x7ACB;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;
    websocket.onopen = function () {
        setMessageInnerHTML(&quot;WebSocket&#x8FDE;&#x63A5;&#x6210;&#x529F;&quot;);
    }

    //&#x63A5;&#x6536;&#x5230;&#x6D88;&#x606F;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;
    websocket.onmessage = function (event) {
        setMessageInnerHTML(event.data);
    }

    //&#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;
    websocket.onclose = function () {
        setMessageInnerHTML(&quot;WebSocket&#x8FDE;&#x63A5;&#x5173;&#x95ED;&quot;);
    }

    //&#x76D1;&#x542C;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x4E8B;&#x4EF6;&#xFF0C;&#x5F53;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x65F6;&#xFF0C;&#x4E3B;&#x52A8;&#x53BB;&#x5173;&#x95ED;websocket&#x8FDE;&#x63A5;&#xFF0C;&#x9632;&#x6B62;&#x8FDE;&#x63A5;&#x8FD8;&#x6CA1;&#x65AD;&#x5F00;&#x5C31;&#x5173;&#x95ED;&#x7A97;&#x53E3;&#xFF0C;server&#x7AEF;&#x4F1A;&#x629B;&#x5F02;&#x5E38;&#x3002;
    window.onbeforeunload = function () {
        closeWebSocket();
    }

    //&#x5C06;&#x6D88;&#x606F;&#x663E;&#x793A;&#x5728;&#x7F51;&#x9875;&#x4E0A;
    function setMessageInnerHTML(innerHTML) {
        document.getElementById(&apos;message&apos;).innerHTML += innerHTML + &apos;&lt;br/&gt;&apos;;
    }

    //&#x5173;&#x95ED;WebSocket&#x8FDE;&#x63A5;
    function closeWebSocket() {
        websocket.close();
    }

    //&#x53D1;&#x9001;&#x6D88;&#x606F;
    function send() {
        var message = document.getElementById(&apos;text&apos;).value;
        websocket.send(message);
    }
&lt;/script&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby">@ page language=<span class="hljs-string">&quot;java&quot;</span> pageEncoding=<span class="hljs-string">&quot;UTF-8&quot;</span> </span><span class="xml"><span class="hljs-tag">%&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Java&#x540E;&#x7AEF;WebSocket&#x7684;Tomcat&#x5B9E;&#x73B0;<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    Welcome<span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;send()&quot;</span>&gt;</span>&#x53D1;&#x9001;&#x6D88;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">&quot;closeWebSocket()&quot;</span>&gt;</span>&#x5173;&#x95ED;WebSocket&#x8FDE;&#x63A5;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;message&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> websocket = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">//&#x5224;&#x65AD;&#x5F53;&#x524D;&#x6D4F;&#x89C8;&#x5668;&#x662F;&#x5426;&#x652F;&#x6301;WebSocket</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-string">&apos;WebSocket&apos;</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>) {
        websocket = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-string">&quot;ws://localhost:8080/websocket&quot;</span>);
    }
    <span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">&apos;&#x5F53;&#x524D;&#x6D4F;&#x89C8;&#x5668; Not support websocket&apos;</span>)
    }

    <span class="hljs-comment">//&#x8FDE;&#x63A5;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;</span>
    websocket.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        setMessageInnerHTML(<span class="hljs-string">&quot;WebSocket&#x8FDE;&#x63A5;&#x53D1;&#x751F;&#x9519;&#x8BEF;&quot;</span>);
    };

    <span class="hljs-comment">//&#x8FDE;&#x63A5;&#x6210;&#x529F;&#x5EFA;&#x7ACB;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;</span>
    websocket.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        setMessageInnerHTML(<span class="hljs-string">&quot;WebSocket&#x8FDE;&#x63A5;&#x6210;&#x529F;&quot;</span>);
    }

    <span class="hljs-comment">//&#x63A5;&#x6536;&#x5230;&#x6D88;&#x606F;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;</span>
    websocket.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
        setMessageInnerHTML(event.data);
    }

    <span class="hljs-comment">//&#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x7684;&#x56DE;&#x8C03;&#x65B9;&#x6CD5;</span>
    websocket.onclose = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        setMessageInnerHTML(<span class="hljs-string">&quot;WebSocket&#x8FDE;&#x63A5;&#x5173;&#x95ED;&quot;</span>);
    }

    <span class="hljs-comment">//&#x76D1;&#x542C;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x4E8B;&#x4EF6;&#xFF0C;&#x5F53;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x65F6;&#xFF0C;&#x4E3B;&#x52A8;&#x53BB;&#x5173;&#x95ED;websocket&#x8FDE;&#x63A5;&#xFF0C;&#x9632;&#x6B62;&#x8FDE;&#x63A5;&#x8FD8;&#x6CA1;&#x65AD;&#x5F00;&#x5C31;&#x5173;&#x95ED;&#x7A97;&#x53E3;&#xFF0C;server&#x7AEF;&#x4F1A;&#x629B;&#x5F02;&#x5E38;&#x3002;</span>
    <span class="hljs-built_in">window</span>.onbeforeunload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        closeWebSocket();
    }

    <span class="hljs-comment">//&#x5C06;&#x6D88;&#x606F;&#x663E;&#x793A;&#x5728;&#x7F51;&#x9875;&#x4E0A;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setMessageInnerHTML</span>(<span class="hljs-params">innerHTML</span>) </span>{
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;message&apos;</span>).innerHTML += innerHTML + <span class="hljs-string">&apos;&lt;br/&gt;&apos;</span>;
    }

    <span class="hljs-comment">//&#x5173;&#x95ED;WebSocket&#x8FDE;&#x63A5;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">closeWebSocket</span>(<span class="hljs-params"></span>) </span>{
        websocket.close();
    }

    <span class="hljs-comment">//&#x53D1;&#x9001;&#x6D88;&#x606F;</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">send</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> message = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;text&apos;</span>).value;
        websocket.send(message);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebSocket

## 原文链接
[https://segmentfault.com/a/1190000015086572](https://segmentfault.com/a/1190000015086572)


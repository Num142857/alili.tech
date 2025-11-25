---
title: WebSocket探秘
hidden: true
categories: [reprint]
slug: d20fa6ee
date: 2018-10-25 14:16:25
---

{{< raw >}}
<h2 id="articleHeader0">&#x9996;&#x5148;</h2><p><strong>&#x957F;&#x8FDE;&#x63A5;</strong>&#xFF1A;&#x4E00;&#x4E2A;&#x8FDE;&#x63A5;&#x4E0A;&#x53EF;&#x4EE5;&#x8FDE;&#x7EED;&#x53D1;&#x9001;&#x591A;&#x4E2A;&#x6570;&#x636E;&#x5305;&#xFF0C;&#x5728;&#x8FDE;&#x63A5;&#x671F;&#x95F4;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6570;&#x636E;&#x5305;&#x53D1;&#x9001;&#xFF0C;&#x9700;&#x8981;&#x53CC;&#x65B9;&#x53D1;&#x94FE;&#x8DEF;&#x68C0;&#x67E5;&#x5305;&#x3002;</p><p><strong>TCP/IP</strong>&#xFF1A;TCP/IP&#x5C5E;&#x4E8E;&#x4F20;&#x8F93;&#x5C42;&#xFF0C;&#x4E3B;&#x8981;&#x89E3;&#x51B3;&#x6570;&#x636E;&#x5728;&#x7F51;&#x7EDC;&#x4E2D;&#x7684;&#x4F20;&#x8F93;&#x95EE;&#x9898;&#xFF0C;&#x53EA;&#x7BA1;&#x4F20;&#x8F93;&#x6570;&#x636E;&#x3002;&#x4F46;&#x662F;&#x90A3;&#x6837;&#x5BF9;&#x4F20;&#x8F93;&#x7684;&#x6570;&#x636E;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;&#x89C4;&#x8303;&#x7684;&#x5C01;&#x88C5;&#x3001;&#x89E3;&#x6790;&#x7B49;&#x5904;&#x7406;&#xFF0C;&#x4F7F;&#x5F97;&#x4F20;&#x8F93;&#x7684;&#x6570;&#x636E;&#x5C31;&#x5F88;&#x96BE;&#x8BC6;&#x522B;&#xFF0C;&#x6240;&#x4EE5;&#x624D;&#x6709;&#x4E86;&#x5E94;&#x7528;&#x5C42;&#x534F;&#x8BAE;&#x5BF9;&#x6570;&#x636E;&#x7684;&#x5C01;&#x88C5;&#x3001;&#x89E3;&#x6790;&#x7B49;&#xFF0C;&#x5982;HTTP&#x534F;&#x8BAE;&#x3002;</p><p><strong>HTTP</strong>&#xFF1A;HTTP&#x662F;&#x5E94;&#x7528;&#x5C42;&#x534F;&#x8BAE;&#xFF0C;&#x5C01;&#x88C5;&#x89E3;&#x6790;&#x4F20;&#x8F93;&#x7684;&#x6570;&#x636E;&#x3002;<br>&#x4ECE;HTTP1.1&#x5F00;&#x59CB;&#x5176;&#x5B9E;&#x5C31;&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x4E86;&#x957F;&#x8FDE;&#x63A5;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF7;&#x6C42;header&#x4E2D;&#x770B;&#x5230;&#x7684;Connection:Keep-alive&#x3002;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x957F;&#x8FDE;&#x63A5;&#x53EA;&#x662F;&#x8BF4;&#x4FDD;&#x6301;&#x4E86;&#xFF08;&#x670D;&#x52A1;&#x5668;&#x53EF;&#x4EE5;&#x544A;&#x8BC9;&#x5BA2;&#x6237;&#x7AEF;&#x4FDD;&#x6301;&#x65F6;&#x95F4;Keep-Alive:timeout=200;max=20;&#xFF09;&#x8FD9;&#x4E2A;TCP&#x901A;&#x9053;&#xFF0C;&#x76F4;&#x63A5;Request - Response&#xFF0C;&#x800C;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x8FDE;&#x63A5;&#x901A;&#x9053;&#xFF0C;&#x505A;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x3002;&#x4F46;&#x662F;HTTP&#x901A;&#x8BAF;&#x672C;&#x8EAB;&#x8FD8;&#x662F;Request - Response&#x3002;</p><p><strong>socket</strong>&#xFF1A;&#x4E0E;HTTP&#x4E0D;&#x4E00;&#x6837;&#xFF0C;socket&#x4E0D;&#x662F;&#x534F;&#x8BAE;&#xFF0C;&#x5B83;&#x662F;&#x5728;&#x7A0B;&#x5E8F;&#x5C42;&#x9762;&#x4E0A;&#x5BF9;&#x4F20;&#x8F93;&#x5C42;&#x534F;&#x8BAE;&#xFF08;&#x53EF;&#x4EE5;&#x4E3B;&#x8981;&#x7406;&#x89E3;&#x4E3A;TCP/IP&#xFF09;&#x7684;&#x63A5;&#x53E3;&#x5C01;&#x88C5;&#x3002;<br>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x4F20;&#x8F93;&#x5C42;&#x7684;&#x534F;&#x8BAE;&#xFF0C;&#x662F;&#x89E3;&#x51B3;&#x6570;&#x636E;&#x5728;&#x7F51;&#x7EDC;&#x4E2D;&#x4F20;&#x8F93;&#x7684;&#xFF0C;&#x90A3;&#x4E48;socket&#x5C31;&#x662F;&#x4F20;&#x8F93;&#x901A;&#x9053;&#x4E24;&#x7AEF;&#x7684;&#x63A5;&#x53E3;&#x3002;&#x6240;&#x4EE5;&#x5BF9;&#x4E8E;&#x524D;&#x7AEF;&#x800C;&#x8A00;&#xFF0C;socket&#x4E5F;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x7406;&#x89E3;&#x4E3A;&#x5BF9;TCP/IP&#x7684;&#x62BD;&#x8C61;&#x534F;&#x8BAE;&#x3002;</p><p><strong>WebSocket</strong>&#xFF1A;<br>WebSocket&#x662F;&#x5305;&#x88C5;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x5E94;&#x7528;&#x5C42;&#x534F;&#x8BAE;&#x4F5C;&#x4E3A;socket,&#x4ECE;&#x800C;&#x80FD;&#x591F;&#x8BA9;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x8FDC;&#x7A0B;&#x670D;&#x52A1;&#x7AEF;&#x901A;&#x8FC7;web&#x5EFA;&#x7ACB;&#x5168;&#x53CC;&#x5DE5;&#x901A;&#x4FE1;&#x3002;websocket&#x63D0;&#x4F9B;ws&#x548C;wss&#x4E24;&#x79CD;URL&#x65B9;&#x6848;&#x3002;<a href="https://tools.ietf.org/rfc/rfc6455.txt" rel="nofollow noreferrer" target="_blank">&#x534F;&#x8BAE;&#x82F1;&#x6587;&#x6587;&#x6863;</a>&#x548C;<a href="http://blog.csdn.net/stoneson/article/details/8063802" rel="nofollow noreferrer" target="_blank">&#x4E2D;&#x6587;&#x7FFB;&#x8BD1;</a></p><h2 id="articleHeader1">WebSocket API</h2><p>&#x4F7F;&#x7528;WebSocket&#x6784;&#x9020;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;WebSocket&#x8FDE;&#x63A5;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;websocket&#x5B9E;&#x4F8B;&#x3002;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5B9E;&#x4F8B;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E9B;&#x4E8B;&#x4EF6;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x7B80;&#x5386;&#x8FDE;&#x63A5;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x6709;&#x6D88;&#x606F;&#x88AB;&#x63A8;&#x8FC7;&#x6765;&#x4E86;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x4E86;&#xFF0C;&#x65F6;&#x5019;&#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;node&#x642D;&#x5EFA;&#x4E00;&#x4E2A;WebSocket&#x670D;&#x52A1;&#x5668;&#x6765;&#x770B;&#x770B;&#xFF0C;<a href="https://github.com/daipeng7/websocket" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;</a>&#x3002;&#x540C;&#x6837;&#x4E5F;&#x53EF;&#x4EE5;&#x8C03;&#x7528;<a href="http://demos.kaazing.com/echo/" rel="nofollow noreferrer" target="_blank">websocket.org</a>&#x7F51;&#x7AD9;&#x7684;demo&#x670D;&#x52A1;&#x5668;<a href="http://demos.kaazing.com/echo/" rel="nofollow noreferrer" target="_blank">http://demos.kaazing.com/echo/</a>&#x3002;</p><h3 id="articleHeader2">&#x4E8B;&#x4EF6;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x521B;&#x5EFA;WebSocket&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ws&#x548C;wss&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x9009;&#x586B;&#x81EA;&#x5B9A;&#x4E49;&#x534F;&#x8BAE;&#xFF0C;&#x5982;&#x679C;&#x591A;&#x534F;&#x8BAE;&#xFF0C;&#x53EF;&#x4EE5;&#x4EE5;&#x6570;&#x7EC4;&#x65B9;&#x5F0F;
var socket = new WebSocket(&apos;ws://demos.kaazing.com/echo&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-comment">//&#x521B;&#x5EFA;WebSocket&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ws&#x548C;wss&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x9009;&#x586B;&#x81EA;&#x5B9A;&#x4E49;&#x534F;&#x8BAE;&#xFF0C;&#x5982;&#x679C;&#x591A;&#x534F;&#x8BAE;&#xFF0C;&#x53EF;&#x4EE5;&#x4EE5;&#x6570;&#x7EC4;&#x65B9;&#x5F0F;</span>
<span class="hljs-keyword">var</span> socket = <span class="hljs-keyword">new</span> <span class="hljs-type">WebSocket</span>(<span class="hljs-string">&apos;ws://demos.kaazing.com/echo&apos;</span>);</code></pre><ul><li><p><strong>open</strong></p><p>&#x670D;&#x52A1;&#x5668;&#x76F8;&#x5E94;WebSocket&#x8FDE;&#x63A5;&#x8BF7;&#x6C42;&#x89E6;&#x53D1;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   socket.onopen = (event) =&gt; {
       socket.send(&apos;Hello Server!&apos;);
   };
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>   socket.onopen = <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
       socket.send(<span class="hljs-string">&apos;Hello Server!&apos;</span>);
   };
</code></pre></li><li><p><strong>message</strong></p><p>&#x670D;&#x52A1;&#x5668;&#x6709; &#x54CD;&#x5E94;&#x6570;&#x636E; &#x89E6;&#x53D1;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   socket.onmessage = (event) =&gt; {
       debugger;
       console.log(event.data);
   };
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>   socket.onmessage = <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
       <span class="hljs-keyword">debugger</span>;
       <span class="hljs-built_in">console</span>.log(event.data);
   };
</code></pre></li><li><p><strong>error</strong></p><p>&#x51FA;&#x9519;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x5E76;&#x4E14;&#x4F1A;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x3002;&#x8FD9;&#x65F6;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x8FDB;&#x884C;&#x6309;&#x9700;&#x5904;&#x7406;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   socket.onerror = (event) =&gt; {
       console.log(&apos;error&apos;);
   }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>   socket.onerror = <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;error&apos;</span>);
   }
</code></pre></li><li><p><strong>close</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x8FD9;&#x5728;&#x4E24;&#x7AEF;&#x90FD;&#x53EF;&#x4EE5;&#x5173;&#x95ED;&#x3002;&#x53E6;&#x5916;&#x5982;&#x679C;&#x8FDE;&#x63A5;&#x5931;&#x8D25;&#x4E5F;&#x662F;&#x4F1A;&#x89E6;&#x53D1;&#x7684;&#x3002;
  &#x9488;&#x5BF9;&#x5173;&#x95ED;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x4F1A;&#x505A;&#x4E00;&#x4E9B;&#x5F02;&#x5E38;&#x5904;&#x7406;,&#x5173;&#x4E8E;&#x5F02;&#x5E38;&#x53C2;&#x6570;&#xFF1A;

  1. socket.readyState  
          2 &#x6B63;&#x5728;&#x5173;&#x95ED;  3 &#x5DF2;&#x7ECF;&#x5173;&#x95ED;
  2. event.wasClean [Boolean]  
          true  &#x5BA2;&#x6237;&#x7AEF;&#x6216;&#x8005;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8C03;&#x7528;close&#x4E3B;&#x52A8;&#x5173;&#x95ED;
       false &#x53CD;&#x4E4B;
  3. event.code [Number] &#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x7684;&#x72B6;&#x6001;&#x7801;&#x3002;socket.close(code, reason)
  4. event.reason [String] 
          &#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x7684;&#x539F;&#x56E0;&#x3002;socket.close(code, reason)
          

       socket.onclose = (event) =&gt; {
           debugger;
       }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>  &#x8FDE;&#x63A5;&#x5173;&#x95ED;&#x65F6;&#x89E6;&#x53D1;&#xFF0C;&#x8FD9;&#x5728;&#x4E24;&#x7AEF;&#x90FD;&#x53EF;&#x4EE5;&#x5173;&#x95ED;&#x3002;&#x53E6;&#x5916;&#x5982;&#x679C;&#x8FDE;&#x63A5;&#x5931;&#x8D25;&#x4E5F;&#x662F;&#x4F1A;&#x89E6;&#x53D1;&#x7684;&#x3002;
  &#x9488;&#x5BF9;&#x5173;&#x95ED;&#x4E00;&#x822C;&#x6211;&#x4EEC;&#x4F1A;&#x505A;&#x4E00;&#x4E9B;&#x5F02;&#x5E38;&#x5904;&#x7406;,&#x5173;&#x4E8E;&#x5F02;&#x5E38;&#x53C2;&#x6570;&#xFF1A;

  <span class="hljs-number">1.</span> socket.readyState  
          <span class="hljs-number">2</span> &#x6B63;&#x5728;&#x5173;&#x95ED;  <span class="hljs-number">3</span> &#x5DF2;&#x7ECF;&#x5173;&#x95ED;
  <span class="hljs-number">2.</span> event.wasClean [<span class="hljs-built_in">Boolean</span>]  
          <span class="hljs-literal">true</span>  &#x5BA2;&#x6237;&#x7AEF;&#x6216;&#x8005;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8C03;&#x7528;close&#x4E3B;&#x52A8;&#x5173;&#x95ED;
       <span class="hljs-literal">false</span> &#x53CD;&#x4E4B;
  <span class="hljs-number">3.</span> event.code [<span class="hljs-built_in">Number</span>] &#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x7684;&#x72B6;&#x6001;&#x7801;&#x3002;socket.close(code, reason)
  <span class="hljs-number">4.</span> event.reason [<span class="hljs-built_in">String</span>] 
          &#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x7684;&#x539F;&#x56E0;&#x3002;socket.close(code, reason)
          

       socket.onclose = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
           <span class="hljs-keyword">debugger</span>;
       }
</code></pre></li></ul><h3 id="articleHeader3">&#x65B9;&#x6CD5;</h3><ul><li><p><strong>send</strong></p><p>send(data) &#x53D1;&#x9001;&#x65B9;&#x6CD5;<br>data &#x53EF;&#x4EE5;&#x662F;String/Blob/ArrayBuffer/ByteBuffer&#x7B49;</p><p>&#x9700;&#x8981;&#x6CE8;&#x610F;,&#x4F7F;&#x7528;send&#x53D1;&#x9001;&#x6570;&#x636E;&#xFF0C;&#x5FC5;&#x987B;&#x662F;&#x8FDE;&#x63A5;&#x5EFA;&#x7ACB;&#x4E4B;&#x540E;&#x3002;&#x4E00;&#x822C;&#x4F1A;&#x5728;onopen&#x4E8B;&#x4EF6;&#x89E6;&#x53D1;&#x540E;&#x53D1;&#x9001;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="socket.onopen = (event) =&gt; {
    socket.send(&apos;Hello Server!&apos;);
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>socket.onopen = <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
    socket.send(<span class="hljs-string">&apos;Hello Server!&apos;</span>);
};</code></pre><p>&#x5982;&#x679C;&#x662F;&#x9700;&#x8981;&#x53BB;&#x54CD;&#x5E94;&#x522B;&#x7684;&#x4E8B;&#x4EF6;&#x518D;&#x53D1;&#x9001;&#x6D88;&#x606F;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5C06;WebSocket&#x5B9E;&#x4F8B;socket&#x4EA4;&#x7ED9;&#x522B;&#x7684;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x53D1;&#x9001;&#x65F6;&#x4F60;&#x4E0D;&#x4E00;&#x5B9A;&#x77E5;&#x9053;socket&#x662F;&#x5426;&#x8FD8;&#x8FDE;&#x63A5;&#x7740;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x68C0;&#x67E5;readyState&#x5C5E;&#x6027;&#x7684;&#x503C;&#x662F;&#x5426;&#x7B49;&#x4E8E;OPEN&#x5E38;&#x91CF;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x67E5;&#x770B;socket&#x662F;&#x5426;&#x8FD8;&#x8FDE;&#x63A5;&#x7740;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="btn.onclick = function startSocket(){
    //&#x5224;&#x65AD;&#x662F;&#x5426;&#x8FDE;&#x63A5;&#x662F;&#x5426;&#x8FD8;&#x5B58;&#x5728;
    if(socket.readyState == WebSocket.OPEN){
        var message = document.getElementById(&quot;message&quot;).value;
        if(message != &quot;&quot;) socket.send(message);
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>btn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">startSocket</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//&#x5224;&#x65AD;&#x662F;&#x5426;&#x8FDE;&#x63A5;&#x662F;&#x5426;&#x8FD8;&#x5B58;&#x5728;</span>
    <span class="hljs-keyword">if</span>(socket.readyState == WebSocket.OPEN){
        <span class="hljs-keyword">var</span> message = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;message&quot;</span>).value;
        <span class="hljs-keyword">if</span>(message != <span class="hljs-string">&quot;&quot;</span>) socket.send(message);
    }
}
</code></pre></li><li><p><strong>close</strong></p><p>&#x4F7F;&#x7528;close([code[,reason]])&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x3002;code&#x548C;reason&#x5747;&#x4E3A;&#x9009;&#x586B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6B63;&#x5E38;&#x5173;&#x95ED;
socket.close(1000, &quot;closing normally&quot;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-comment">// &#x6B63;&#x5E38;&#x5173;&#x95ED;</span>
socket.<span class="hljs-built_in">close</span>(<span class="hljs-number">1000</span>, <span class="hljs-string">&quot;closing normally&quot;</span>);
</code></pre></li></ul><h3 id="articleHeader4">&#x5E38;&#x91CF;</h3><table><thead><tr><th>&#x5E38;&#x91CF;&#x540D;</th><th align="center">&#x503C;</th><th align="left">&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>CONNECTING</td><td align="center">0</td><td align="left">&#x8FDE;&#x63A5;&#x8FD8;&#x672A;&#x5F00;&#x542F;</td></tr><tr><td>OPEN</td><td align="center">1</td><td align="left">&#x8FDE;&#x63A5;&#x5F00;&#x542F;&#x53EF;&#x4EE5;&#x901A;&#x4FE1;</td></tr><tr><td>CLOSING</td><td align="center">2</td><td align="left">&#x8FDE;&#x63A5;&#x6B63;&#x5728;&#x5173;&#x95ED;&#x4E2D;</td></tr><tr><td>CLOSED</td><td align="center">3</td><td align="left">&#x8FDE;&#x63A5;&#x5DF2;&#x7ECF;&#x5173;&#x95ED;</td></tr></tbody></table><h3 id="articleHeader5">&#x5C5E;&#x6027;</h3><table><thead><tr><th>&#x5C5E;&#x6027;&#x540D;</th><th align="center">&#x503C;&#x7C7B;&#x578B;</th><th align="left">&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>binaryType</td><td align="center">String</td><td align="left">&#x8868;&#x793A;&#x8FDE;&#x63A5;&#x4F20;&#x8F93;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x9ED8;&#x8BA4;&#x4E3A;&quot;blob&quot;&#x3002;</td></tr><tr><td>bufferedAmount</td><td align="center">Number</td><td align="left">&#x53EA;&#x8BFB;&#x3002;&#x5982;&#x679C;&#x4F7F;&#x7528;send()&#x65B9;&#x6CD5;&#x53D1;&#x9001;&#x7684;&#x6570;&#x636E;&#x8FC7;&#x5927;&#xFF0C;&#x867D;&#x7136;send()&#x65B9;&#x6CD5;&#x4F1A;&#x9A6C;&#x4E0A;&#x6267;&#x884C;&#xFF0C;&#x4F46;&#x6570;&#x636E;&#x5E76;&#x4E0D;&#x662F;&#x9A6C;&#x4E0A;&#x4F20;&#x8F93;&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x7F13;&#x5B58;&#x5E94;&#x7528;&#x6D41;&#x51FA;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;bufferedAmount&#x5C5E;&#x6027;&#x68C0;&#x67E5;&#x5DF2;&#x7ECF;&#x8FDB;&#x5165;&#x961F;&#x5217;&#x4F46;&#x8FD8;&#x672A;&#x88AB;&#x4F20;&#x8F93;&#x7684;&#x6570;&#x636E;&#x5927;&#x5C0F;&#x3002;&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x7F51;&#x7EDC;&#x9971;&#x548C;&#x3002;</td></tr><tr><td>protocol</td><td align="center">String/Array</td><td align="left">&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;protocol&#x53C2;&#x6570;&#x8BA9;&#x670D;&#x52A1;&#x7AEF;&#x77E5;&#x9053;&#x5BA2;&#x6237;&#x7AEF;&#x4F7F;&#x7528;&#x7684;WebSocket&#x534F;&#x8BAE;&#x3002;&#x800C;&#x5728;&#x5B9E;&#x4F8B;socket&#x4E2D;&#x5C31;&#x662F;&#x8FDE;&#x63A5;&#x5EFA;&#x7ACB;&#x524D;&#x4E3A;&#x7A7A;&#xFF0C;&#x8FDE;&#x63A5;&#x5EFA;&#x7ACB;&#x540E;&#x4E3A;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x786E;&#x5B9A;&#x4E0B;&#x6765;&#x7684;&#x534F;&#x8BAE;&#x540D;&#x79F0;&#x3002;</td></tr><tr><td>readyState</td><td align="center">String</td><td align="left">&#x53EA;&#x8BFB;&#x3002;&#x8FDE;&#x63A5;&#x5F53;&#x524D;&#x72B6;&#x6001;&#xFF0C;&#x8FD9;&#x4E9B;&#x72B6;&#x6001;&#x662F;&#x4E0E;&#x5E38;&#x91CF;&#x76F8;&#x5BF9;&#x5E94;&#x7684;&#x3002;</td></tr><tr><td>extensions</td><td align="center">String</td><td align="left">&#x670D;&#x52A1;&#x5668;&#x9009;&#x62E9;&#x7684;&#x6269;&#x5C55;&#x3002;&#x76EE;&#x524D;&#xFF0C;&#x8FD9;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x901A;&#x8FC7;&#x8FDE;&#x63A5;&#x534F;&#x5546;&#x7684;&#x6269;&#x5C55;&#x5217;&#x8868;&#x3002;</td></tr></tbody></table><h2 id="articleHeader6">WebSocket&#x7B80;&#x5355;&#x5B9E;&#x73B0;</h2><p>WebSocket &#x534F;&#x8BAE;&#x6709;&#x4E24;&#x90E8;&#x5206;&#xFF1A;&#x63E1;&#x624B;&#x3001;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x3002;</p><p>&#x5176;&#x4E2D;&#xFF0C;&#x63E1;&#x624B;&#x65E0;&#x7591;&#x662F;&#x5173;&#x952E;&#xFF0C;&#x662F;&#x4E00;&#x5207;&#x7684;&#x5148;&#x51B3;&#x6761;&#x4EF6;&#x3002;</p><h3 id="articleHeader7">&#x63E1;&#x624B;</h3><ul><li><p><strong>&#x5BA2;&#x6237;&#x7AEF;&#x63E1;&#x624B;&#x8BF7;&#x6C42;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//&#x521B;&#x5EFA;WebSocket&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ws&#x548C;wss&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x9009;&#x586B;&#x81EA;&#x5B9A;&#x4E49;&#x534F;&#x8BAE;&#xFF0C;&#x5982;&#x679C;&#x591A;&#x534F;&#x8BAE;&#xFF0C;&#x53EF;&#x4EE5;&#x4EE5;&#x6570;&#x7EC4;&#x65B9;&#x5F0F;
var socket = new WebSocket(&apos;ws://localhost:8081&apos;, [protocol]);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>
<span class="hljs-comment">//&#x521B;&#x5EFA;WebSocket&#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;ws&#x548C;wss&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x9009;&#x586B;&#x81EA;&#x5B9A;&#x4E49;&#x534F;&#x8BAE;&#xFF0C;&#x5982;&#x679C;&#x591A;&#x534F;&#x8BAE;&#xFF0C;&#x53EF;&#x4EE5;&#x4EE5;&#x6570;&#x7EC4;&#x65B9;&#x5F0F;</span>
<span class="hljs-keyword">var</span> socket = <span class="hljs-keyword">new</span> <span class="hljs-type">WebSocket</span>(<span class="hljs-string">&apos;ws://localhost:8081&apos;</span>, [protocol]);
</code></pre><p>&#x51FA;&#x4E8E;WebSocket&#x7684;&#x4EA7;&#x751F;&#x539F;&#x56E0;&#x662F;&#x4E3A;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#x80FD;&#x5B9E;&#x73B0;&#x540C;&#x670D;&#x52A1;&#x5668;&#x7684;&#x5168;&#x53CC;&#x5DE5;&#x901A;&#x4FE1;&#x548C;HTTP&#x534F;&#x8BAE;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x7684;&#x5E7F;&#x6CDB;&#x8FD0;&#x7528;&#xFF08;&#x5F53;&#x7136;&#x4E5F;&#x4E0D;&#x5168;&#x662F;&#x4E3A;&#x4E86;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4F46;&#x662F;&#x4E3B;&#x8981;&#x8FD8;&#x662F;&#x9488;&#x5BF9;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#xFF09;&#x3002;&#x6240;&#x4EE5;WebSocket&#x7684;&#x63E1;&#x624B;&#x662F;HTTP&#x8BF7;&#x6C42;&#x7684;&#x5347;&#x7EA7;&#x3002;<br>WebSocket&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x5934;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
GET /chat HTTP/1.1   //&#x5FC5;&#x9700;&#x3002;
Host: server.example.com  // &#x5FC5;&#x9700;&#x3002;WebSocket&#x670D;&#x52A1;&#x5668;&#x4E3B;&#x673A;&#x540D;
Upgrade: websocket // &#x5FC5;&#x9700;&#x3002;&#x5E76;&#x4E14;&#x503C;&#x4E3A;&quot; websocket&quot;&#x3002;&#x6709;&#x4E2A;&#x7A7A;&#x683C;
Connection: Upgrade // &#x5FC5;&#x9700;&#x3002;&#x5E76;&#x4E14;&#x503C;&#x4E3A;&quot; Upgrade&quot;&#x3002;&#x6709;&#x4E2A;&#x7A7A;&#x683C;
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ== // &#x5FC5;&#x9700;&#x3002;&#x5176;&#x503C;&#x91C7;&#x7528;base64&#x7F16;&#x7801;&#x7684;&#x968F;&#x673A;16&#x5B57;&#x8282;&#x957F;&#x7684;&#x5B57;&#x7B26;&#x5E8F;&#x5217;&#x3002;
Origin: http://example.com //&#x6D4F;&#x89C8;&#x5668;&#x5FC5;&#x586B;&#x3002;&#x5934;&#x57DF;&#xFF08;RFC6454&#xFF09;&#x7528;&#x4E8E;&#x4FDD;&#x62A4;WebSocket&#x670D;&#x52A1;&#x5668;&#x4E0D;&#x88AB;&#x672A;&#x6388;&#x6743;&#x7684;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x811A;&#x672C;&#x8DE8;&#x6E90;&#x4F7F;&#x7528;WebSocket API&#x3002;
Sec-WebSocket-Protocol: chat, superchat //&#x9009;&#x586B;&#x3002;&#x53EF;&#x7528;&#x9009;&#x9879;&#x6709;&#x5B50;&#x534F;&#x8BAE;&#x9009;&#x62E9;&#x5668;&#x3002;
Sec-WebSocket-Version: 13 //&#x5FC5;&#x9700;&#x3002;&#x7248;&#x672C;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>
GET <span class="hljs-regexp">/chat HTTP/</span><span class="hljs-number">1.1</span>   <span class="hljs-comment">//&#x5FC5;&#x9700;&#x3002;</span>
<span class="hljs-string">Host:</span> server.example.com  <span class="hljs-comment">// &#x5FC5;&#x9700;&#x3002;WebSocket&#x670D;&#x52A1;&#x5668;&#x4E3B;&#x673A;&#x540D;</span>
<span class="hljs-string">Upgrade:</span> websocket <span class="hljs-comment">// &#x5FC5;&#x9700;&#x3002;&#x5E76;&#x4E14;&#x503C;&#x4E3A;&quot; websocket&quot;&#x3002;&#x6709;&#x4E2A;&#x7A7A;&#x683C;</span>
<span class="hljs-string">Connection:</span> Upgrade <span class="hljs-comment">// &#x5FC5;&#x9700;&#x3002;&#x5E76;&#x4E14;&#x503C;&#x4E3A;&quot; Upgrade&quot;&#x3002;&#x6709;&#x4E2A;&#x7A7A;&#x683C;</span>
Sec-WebSocket-<span class="hljs-string">Key:</span> dGhlIHNhbXBsZSBub25jZQ== <span class="hljs-comment">// &#x5FC5;&#x9700;&#x3002;&#x5176;&#x503C;&#x91C7;&#x7528;base64&#x7F16;&#x7801;&#x7684;&#x968F;&#x673A;16&#x5B57;&#x8282;&#x957F;&#x7684;&#x5B57;&#x7B26;&#x5E8F;&#x5217;&#x3002;</span>
<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//example.com //&#x6D4F;&#x89C8;&#x5668;&#x5FC5;&#x586B;&#x3002;&#x5934;&#x57DF;&#xFF08;RFC6454&#xFF09;&#x7528;&#x4E8E;&#x4FDD;&#x62A4;WebSocket&#x670D;&#x52A1;&#x5668;&#x4E0D;&#x88AB;&#x672A;&#x6388;&#x6743;&#x7684;&#x8FD0;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x811A;&#x672C;&#x8DE8;&#x6E90;&#x4F7F;&#x7528;WebSocket API&#x3002;</span>
Sec-WebSocket-<span class="hljs-string">Protocol:</span> chat, superchat <span class="hljs-comment">//&#x9009;&#x586B;&#x3002;&#x53EF;&#x7528;&#x9009;&#x9879;&#x6709;&#x5B50;&#x534F;&#x8BAE;&#x9009;&#x62E9;&#x5668;&#x3002;</span>
Sec-WebSocket-<span class="hljs-string">Version:</span> <span class="hljs-number">13</span> <span class="hljs-comment">//&#x5FC5;&#x9700;&#x3002;&#x7248;&#x672C;&#x3002;</span>
</code></pre><p>WebSocket&#x5BA2;&#x6237;&#x7AEF;&#x5C06;&#x4E0A;&#x8FF0;&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x5230;&#x670D;&#x52A1;&#x5668;&#x3002;&#x5982;&#x679C;&#x662F;&#x8C03;&#x7528;&#x6D4F;&#x89C8;&#x5668;&#x7684;WebSocket API,&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x81EA;&#x52A8;&#x5B8C;&#x6210;&#x5B8C;&#x6210;&#x4E0A;&#x8FF0;&#x8BF7;&#x6C42;&#x5934;&#x3002;</p></li><li><p><strong>&#x670D;&#x52A1;&#x7AEF;&#x63E1;&#x624B;&#x54CD;&#x5E94;</strong></p><p>&#x670D;&#x52A1;&#x5668;&#x5F97;&#x5411;&#x5BA2;&#x6237;&#x7AEF;&#x8BC1;&#x660E;&#x5B83;&#x63A5;&#x6536;&#x5230;&#x4E86;&#x5BA2;&#x6237;&#x7AEF;&#x7684;WebSocket&#x63E1;&#x624B;&#xFF0C;&#x4E3A;&#x4F7F;&#x670D;&#x52A1;&#x5668;&#x4E0D;&#x63A5;&#x53D7;&#x975E;WebSocket&#x8FDE;&#x63A5;&#xFF0C;&#x9632;&#x6B62;&#x653B;&#x51FB;&#x8005;&#x901A;&#x8FC7;XMLHttpRequest&#x53D1;&#x9001;&#x6216;&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x7CBE;&#x5FC3;&#x6784;&#x9020;&#x7684;&#x5305;&#x6765;&#x6B3A;&#x9A97;WebSocket&#x670D;&#x52A1;&#x5668;&#x3002;&#x670D;&#x52A1;&#x5668;&#x628A;&#x4E24;&#x5757;&#x4FE1;&#x606F;&#x5408;&#x5E76;&#x6765;&#x5F62;&#x6210;&#x54CD;&#x5E94;&#x3002;&#x7B2C;&#x4E00;&#x5757;&#x4FE1;&#x606F;&#x6765;&#x81EA;&#x5BA2;&#x6237;&#x7AEF;&#x63E1;&#x624B;&#x5934;&#x57DF;Sec-WebSocket-Key&#xFF0C;&#x5982;Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==&#x3002;<br>&#x5BF9;&#x4E8E;&#x8FD9;&#x4E2A;&#x5934;&#x57DF;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x53D6;&#x5934;&#x57DF;&#x7684;&#x503C;&#xFF08;&#x9700;&#x8981;&#x5148;&#x6D88;&#x9664;&#x7A7A;&#x767D;&#x7B26;&#xFF09;&#xFF0C;&#x4EE5;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5F62;&#x5F0F;&#x62FC;&#x63A5;&#x5168;&#x5C40;&#x552F;&#x4E00;&#x7684;&#xFF08;GUID&#xFF0C;[RFC4122]&#xFF09;&#x6807;&#x8BC6;&#xFF1A;258EAFA5-E914-47DA-95CA-C5AB0DC85B11&#xFF0C;&#x6B64;&#x503C;&#x4E0D;&#x5927;&#x53EF;&#x80FD;&#x88AB;&#x4E0D;&#x660E;&#x767D;WebSocket&#x534F;&#x8BAE;&#x7684;&#x7F51;&#x7EDC;&#x7EC8;&#x7AEF;&#x4F7F;&#x7528;&#x3002;&#x7136;&#x540E;&#x8FDB;&#x884C;SHA-1 hash&#xFF08;160&#x4F4D;&#xFF09;&#x7F16;&#x7801;&#xFF0C;&#x518D;&#x8FDB;&#x884C;base64&#x7F16;&#x7801;&#xFF0C;&#x5C06;&#x7ED3;&#x679C;&#x4F5C;&#x4E3A;&#x670D;&#x52A1;&#x5668;&#x7684;&#x63E1;&#x624B;&#x8FD4;&#x56DE;&#x3002;&#x5177;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&#x8BF7;&#x6C42;&#x5934;&#xFF1A;Sec-WebSocket-Key:dGhlIHNhbXBsZSBub25jZQ==

&#x53D6;&#x503C;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;&#x540E;&#x5F97;&#x5230;&#xFF1A;&quot;dGhlIHNhbXBsZSBub25jZQ==258EAFA5-E914-47DA-95CA-C5AB0DC85B11&quot;;

SHA-1&#x540E;&#x5F97;&#x5230;&#xFF1A; 0xb3 0x7a 0x4f 0x2c 0xc0 0x62 0x4f 0x16 0x90 0xf6 0x46 0x06 0xcf 0x38 0x59 0x45 0xb20xbe 0xc4 0xea

Base64&#x540E;&#x5F97;&#x5230;&#xFF1A; s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

&#x6700;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x503C;&#x4F5C;&#x4E3A;&#x54CD;&#x5E94;&#x5934;Sec-WebSocket-Accept &#x7684;&#x503C;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs x86asm"><code>
&#x8BF7;&#x6C42;&#x5934;&#xFF1A;Sec-WebSocket-Key:dGhlIHNhbXBsZSBub25jZQ==

&#x53D6;&#x503C;&#xFF0C;&#x5B57;&#x7B26;&#x4E32;&#x62FC;&#x63A5;&#x540E;&#x5F97;&#x5230;&#xFF1A;<span class="hljs-string">&quot;dGhlIHNhbXBsZSBub25jZQ==258EAFA5-E914-47DA-95CA-C5AB0DC85B11&quot;</span><span class="hljs-comment">;</span>

SHA-<span class="hljs-number">1</span>&#x540E;&#x5F97;&#x5230;&#xFF1A; <span class="hljs-number">0xb3</span> <span class="hljs-number">0x7a</span> <span class="hljs-number">0x4f</span> <span class="hljs-number">0x2c</span> <span class="hljs-number">0xc0</span> <span class="hljs-number">0x62</span> <span class="hljs-number">0x4f</span> <span class="hljs-number">0x16</span> <span class="hljs-number">0x90</span> <span class="hljs-number">0xf6</span> <span class="hljs-number">0x46</span> <span class="hljs-number">0x06</span> <span class="hljs-number">0xcf</span> <span class="hljs-number">0x38</span> <span class="hljs-number">0x59</span> <span class="hljs-number">0x45</span> 0xb20xbe <span class="hljs-number">0xc4</span> <span class="hljs-number">0xea</span>

Base64&#x540E;&#x5F97;&#x5230;&#xFF1A; s3pPLMBiTxaQ9kYGzzhZRbK+xOo=

&#x6700;&#x540E;&#x7684;&#x7ED3;&#x679C;&#x503C;&#x4F5C;&#x4E3A;&#x54CD;&#x5E94;&#x5934;Sec-WebSocket-Accept &#x7684;&#x503C;&#x3002;</code></pre><p>&#x6700;&#x7EC8;&#x5F62;&#x6210;WebSocket&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x63E1;&#x624B;&#x54CD;&#x5E94;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 Switching Protocols   //&#x5FC5;&#x9700;&#x3002;&#x54CD;&#x5E94;&#x5934;&#x3002;&#x72B6;&#x6001;&#x7801;&#x4E3A;101&#x3002;&#x4EFB;&#x4F55;&#x975E;101&#x7684;&#x54CD;&#x5E94;&#x90FD;&#x4E3A;&#x63E1;&#x624B;&#x672A;&#x5B8C;&#x6210;&#x3002;&#x4F46;&#x662F;HTTP&#x8BED;&#x4E49;&#x662F;&#x5B58;&#x5728;&#x7684;&#x3002;
Upgrade: websocket  // &#x5FC5;&#x9700;&#x3002;&#x5347;&#x7EA7;&#x7C7B;&#x578B;&#x3002;
Connection: Upgrade //&#x5FC5;&#x9700;&#x3002;&#x672C;&#x6B21;&#x8FDE;&#x63A5;&#x7C7B;&#x578B;&#x4E3A;&#x5347;&#x7EA7;&#x3002;
Sec-WebSocket-Accept:s3pPLMBiTxaQ9kYGzzhZRbK+xOo=  //&#x5FC5;&#x9700;&#x3002;&#x8868;&#x660E;&#x670D;&#x52A1;&#x5668;&#x662F;&#x5426;&#x613F;&#x610F;&#x63A5;&#x53D7;&#x8FDE;&#x63A5;&#x3002;&#x5982;&#x679C;&#x63A5;&#x53D7;&#xFF0C;&#x503C;&#x5C31;&#x5FC5;&#x987B;&#x662F;&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7B97;&#x6CD5;&#x5F97;&#x5230;&#x7684;&#x503C;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>HTTP<span class="hljs-regexp">/1.1 101 Switching Protocols   /</span>/&#x5FC5;&#x9700;&#x3002;&#x54CD;&#x5E94;&#x5934;&#x3002;&#x72B6;&#x6001;&#x7801;&#x4E3A;<span class="hljs-number">101</span>&#x3002;&#x4EFB;&#x4F55;&#x975E;<span class="hljs-number">101</span>&#x7684;&#x54CD;&#x5E94;&#x90FD;&#x4E3A;&#x63E1;&#x624B;&#x672A;&#x5B8C;&#x6210;&#x3002;&#x4F46;&#x662F;HTTP&#x8BED;&#x4E49;&#x662F;&#x5B58;&#x5728;&#x7684;&#x3002;
<span class="hljs-string">Upgrade:</span> websocket  <span class="hljs-comment">// &#x5FC5;&#x9700;&#x3002;&#x5347;&#x7EA7;&#x7C7B;&#x578B;&#x3002;</span>
<span class="hljs-string">Connection:</span> Upgrade <span class="hljs-comment">//&#x5FC5;&#x9700;&#x3002;&#x672C;&#x6B21;&#x8FDE;&#x63A5;&#x7C7B;&#x578B;&#x4E3A;&#x5347;&#x7EA7;&#x3002;</span>
Sec-WebSocket-<span class="hljs-string">Accept:</span>s3pPLMBiTxaQ9kYGzzhZRbK+xOo=  <span class="hljs-comment">//&#x5FC5;&#x9700;&#x3002;&#x8868;&#x660E;&#x670D;&#x52A1;&#x5668;&#x662F;&#x5426;&#x613F;&#x610F;&#x63A5;&#x53D7;&#x8FDE;&#x63A5;&#x3002;&#x5982;&#x679C;&#x63A5;&#x53D7;&#xFF0C;&#x503C;&#x5C31;&#x5FC5;&#x987B;&#x662F;&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7B97;&#x6CD5;&#x5F97;&#x5230;&#x7684;&#x503C;&#x3002;</span></code></pre><p>&#x5F53;&#x7136;&#x54CD;&#x5E94;&#x5934;&#x8FD8;&#x5B58;&#x5728;&#x4E00;&#x4E9B;&#x53EF;&#x9009;&#x5B57;&#x6BB5;&#x3002;&#x4E3B;&#x8981;&#x7684;&#x53EF;&#x9009;&#x5B57;&#x6BB5;&#x4E3A;Sec-WebSocket-Protocol&#xFF0C;&#x662F;&#x5BF9;&#x5BA2;&#x6237;&#x7AEF;&#x8BF7;&#x6C42;&#x4E2D;&#x6240;&#x63D0;&#x4F9B;&#x7684;Sec-WebSocket-Protocol&#x5B50;&#x534F;&#x8BAE;&#x7684;&#x9009;&#x62E9;&#x7ED3;&#x679C;&#x7684;&#x54CD;&#x5E94;&#x3002;&#x5F53;&#x7136;cookie&#x4EC0;&#x4E48;&#x7684;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//handshaking.js
const crypto = require(&apos;crypto&apos;);
    const cryptoKey = &apos;258EAFA5-E914-47DA-95CA-C5AB0DC85B11&apos;;
    
    // &#x8BA1;&#x7B97;&#x63E1;&#x624B;&#x54CD;&#x5E94;accept-key
    let challenge = (reqKey) =&gt; {
        reqKey += cryptoKey;
        // crypto.vetHashes()&#x53EF;&#x4EE5;&#x83B7;&#x5F97;&#x652F;&#x6301;&#x7684;hash&#x7B97;&#x6CD5;&#x6570;&#x7EC4;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x5F97;&#x5230;46&#x4E2A;
        reqKey = reqKey.replace(/\s/g,&quot;&quot;);
        // crypto.createHash(&apos;sha1&apos;).update(reqKey).digest()&#x5F97;&#x5230;&#x7684;&#x662F;&#x4E00;&#x4E2A;Uint8Array&#x7684;&#x52A0;&#x5BC6;&#x6570;&#x636E;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x5176;&#x8F6C;&#x4E3A;base64
        return crypto.createHash(&apos;sha1&apos;).update(reqKey).digest().toString(&apos;base64&apos;);
    }
    
    exports.handshaking = (req, socket, head) =&gt; {
        let _headers = req.headers,
            _key = _headers[&apos;sec-websocket-key&apos;],
            resHeaders = [],
            br = &quot;\r\n&quot;;
        resHeaders.push(
            &apos;HTTP/1.1 101 WebSocket Protocol Handshake is OK&apos;,
            &apos;Upgrade: websocket&apos;,
            &apos;Connection: Upgrade&apos;,
            &apos;Sec-WebSocket-Origin: &apos; + _headers.origin,
            &apos;Sec-WebSocket-Location: ws://&apos; + _headers.host + req.url,
        );
        let resAccept = challenge(_key);
        resHeaders.push(&apos;Sec-WebSocket-Accept: &apos;+ resAccept + br, head);
        socket.write(resHeaders.join(br), &apos;binary&apos;);
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//handshaking.js</span>
<span class="hljs-keyword">const</span> crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;crypto&apos;</span>);
    <span class="hljs-keyword">const</span> cryptoKey = <span class="hljs-string">&apos;258EAFA5-E914-47DA-95CA-C5AB0DC85B11&apos;</span>;
    
    <span class="hljs-comment">// &#x8BA1;&#x7B97;&#x63E1;&#x624B;&#x54CD;&#x5E94;accept-key</span>
    <span class="hljs-keyword">let</span> challenge = <span class="hljs-function">(<span class="hljs-params">reqKey</span>) =&gt;</span> {
        reqKey += cryptoKey;
        <span class="hljs-comment">// crypto.vetHashes()&#x53EF;&#x4EE5;&#x83B7;&#x5F97;&#x652F;&#x6301;&#x7684;hash&#x7B97;&#x6CD5;&#x6570;&#x7EC4;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x5F97;&#x5230;46&#x4E2A;</span>
        reqKey = reqKey.replace(<span class="hljs-regexp">/\s/g</span>,<span class="hljs-string">&quot;&quot;</span>);
        <span class="hljs-comment">// crypto.createHash(&apos;sha1&apos;).update(reqKey).digest()&#x5F97;&#x5230;&#x7684;&#x662F;&#x4E00;&#x4E2A;Uint8Array&#x7684;&#x52A0;&#x5BC6;&#x6570;&#x636E;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x5176;&#x8F6C;&#x4E3A;base64</span>
        <span class="hljs-keyword">return</span> crypto.createHash(<span class="hljs-string">&apos;sha1&apos;</span>).update(reqKey).digest().toString(<span class="hljs-string">&apos;base64&apos;</span>);
    }
    
    exports.handshaking = <span class="hljs-function">(<span class="hljs-params">req, socket, head</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> _headers = req.headers,
            _key = _headers[<span class="hljs-string">&apos;sec-websocket-key&apos;</span>],
            resHeaders = [],
            br = <span class="hljs-string">&quot;\r\n&quot;</span>;
        resHeaders.push(
            <span class="hljs-string">&apos;HTTP/1.1 101 WebSocket Protocol Handshake is OK&apos;</span>,
            <span class="hljs-string">&apos;Upgrade: websocket&apos;</span>,
            <span class="hljs-string">&apos;Connection: Upgrade&apos;</span>,
            <span class="hljs-string">&apos;Sec-WebSocket-Origin: &apos;</span> + _headers.origin,
            <span class="hljs-string">&apos;Sec-WebSocket-Location: ws://&apos;</span> + _headers.host + req.url,
        );
        <span class="hljs-keyword">let</span> resAccept = challenge(_key);
        resHeaders.push(<span class="hljs-string">&apos;Sec-WebSocket-Accept: &apos;</span>+ resAccept + br, head);
        socket.write(resHeaders.join(br), <span class="hljs-string">&apos;binary&apos;</span>);
    }
</code></pre></li><li><strong>&#x63E1;&#x624B;&#x5173;&#x95ED;</strong><p>&#x5173;&#x95ED;&#x63E1;&#x624B;&#x53EF;&#x7528;&#x4F7F;&#x7528;TCP&#x76F4;&#x63A5;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x5173;&#x95ED;&#x63E1;&#x624B;&#x3002;&#x4F46;&#x662F;TCP&#x5173;&#x95ED;&#x63E1;&#x624B;&#x4E0D;&#x603B;&#x662F;&#x7AEF;&#x5230;&#x7AEF;&#x53EF;&#x9760;&#x7684;&#xFF0C;&#x7279;&#x522B;&#x662F;&#x51FA;&#x73B0;&#x62E6;&#x622A;&#x4EE3;&#x7406;&#x548C;&#x5176;&#x4ED6;&#x7684;&#x4E2D;&#x95F4;&#x8BBE;&#x65BD;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x4EFB;&#x4F55;&#x4E00;&#x7AEF;&#x53D1;&#x9001;&#x5E26;&#x6709;&#x6307;&#x5B9A;&#x63A7;&#x5236;&#x5E8F;&#x53F7;&#xFF08;&#x6BD4;&#x5982;&#x8BF4;&#x72B6;&#x6001;&#x7801;1002,&#x534F;&#x8BAE;&#x9519;&#x8BEF;&#xFF09;&#x7684;&#x6570;&#x636E;&#x7684;&#x5E27;&#x6765;&#x5F00;&#x59CB;&#x5173;&#x95ED;&#x63E1;&#x624B;&#xFF0C;&#x5F53;&#x53E6;&#x4E00;&#x65B9;&#x63A5;&#x6536;&#x5230;&#x8FD9;&#x4E2A;&#x5173;&#x95ED;&#x5E27;&#xFF0C;&#x5C31;&#x5FC5;&#x987B;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x3002;</p></li></ul><h3 id="articleHeader8">&#x6570;&#x636E;&#x4F20;&#x8F93;</h3><p>&#x5728;WebSocket&#x534F;&#x8BAE;&#x4E2D;,&#x6570;&#x636E;&#x4F20;&#x8F93;&#x9636;&#x6BB5;&#x4F7F;&#x7528;frame&#xFF08;&#x6570;&#x636E;&#x5E27;&#xFF09;&#x8FDB;&#x884C;&#x901A;&#x4FE1;&#xFF0C;frame&#x5206;&#x4E0D;&#x540C;&#x7684;&#x7C7B;&#x578B;&#xFF0C;&#x4E3B;&#x8981;&#x6709;&#xFF1A;&#x6587;&#x672C;&#x6570;&#x636E;&#xFF0C;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x3002;&#x51FA;&#x4E8E;&#x5B89;&#x5168;&#x8003;&#x8651;&#x548C;&#x907F;&#x514D;&#x7F51;&#x7EDC;&#x622A;&#x83B7;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x7684;&#x6570;&#x636E;&#x5E27;&#x5FC5;&#x987B;&#x8FDB;&#x884C;&#x63A9;&#x7801;&#x5904;&#x7406;&#x540E;&#x624D;&#x80FD;&#x53D1;&#x9001;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x4E0D;&#x8BBA;&#x662F;&#x5426;&#x662F;&#x5728;TLS&#x5B89;&#x5168;&#x534F;&#x8BAE;&#x4E0A;&#x90FD;&#x8981;&#x8FDB;&#x884C;&#x63A9;&#x7801;&#x5904;&#x7406;&#x3002;&#x670D;&#x52A1;&#x5668;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6536;&#x5230;&#x63A9;&#x7801;&#x5904;&#x7406;&#x7684;&#x6570;&#x636E;&#x5E27;&#x65F6;&#x5E94;&#x8BE5;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#xFF0C;&#x53D1;&#x9001;&#x4E00;&#x4E2A;1002&#x7684;&#x72B6;&#x6001;&#x7801;&#x3002;&#x670D;&#x52A1;&#x5668;&#x4E0D;&#x80FD;&#x5C06;&#x53D1;&#x9001;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x63A9;&#x7801;&#x5904;&#x7406;&#xFF0C;&#x5982;&#x679C;&#x5BA2;&#x6237;&#x7AEF;&#x6536;&#x5230;&#x63A9;&#x7801;&#x5904;&#x7406;&#x7684;&#x6570;&#x636E;&#x5E27;&#x5FC5;&#x987B;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x3002;</p><p>&#x90A3;&#x6211;&#x4EEC;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x63A5;&#x6536;&#x5230;&#x7684;&#x6570;&#x636E;&#x5E27;&#x662F;&#x600E;&#x6837;&#x7684;&#x5462;&#xFF1F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012319853?w=483&amp;h=46" src="https://static.alili.tech/img/remote/1460000012319853?w=483&amp;h=46" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li><p><strong>&#x6570;&#x636E;&#x5E27;</strong></p><p>WebSocket&#x7684;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x662F;&#x8981;&#x9075;&#x5FAA;&#x7279;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;-&#x6570;&#x636E;&#x5E27;&#xFF08;frame&#xFF09;.</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012319854?w=766&amp;h=263" src="https://static.alili.tech/img/remote/1460000012319854?w=766&amp;h=263" alt="" title="" style="cursor:pointer"></span></p><p>&#x6BCF;&#x4E00;&#x5217;&#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x5B57;&#x8282;&#xFF0C;&#x4E00;&#x4E2A;&#x5B57;&#x8282;8&#x4F4D;&#xFF0C;&#x6BCF;&#x4E00;&#x4F4D;&#x53C8;&#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x3002;</p><p><strong>fin&#xFF1A;</strong> &#x6807;&#x8BC6;&#x8FD9;&#x4E00;&#x5E27;&#x6570;&#x636E;&#x662F;&#x5426;&#x662F;&#x8BE5;&#x5206;&#x5757;&#x7684;&#x6700;&#x540E;&#x4E00;&#x5E27;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1 &#x4E3A;&#x6700;&#x540E;&#x4E00;&#x5E27;
    0 &#x4E0D;&#x662F;&#x6700;&#x540E;&#x4E00;&#x5E27;&#x3002;&#x9700;&#x8981;&#x5206;&#x4E3A;&#x591A;&#x4E2A;&#x5E27;&#x4F20;&#x8F93;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>    <span class="hljs-number">1</span> &#x4E3A;&#x6700;&#x540E;&#x4E00;&#x5E27;
    <span class="hljs-number">0</span> &#x4E0D;&#x662F;&#x6700;&#x540E;&#x4E00;&#x5E27;&#x3002;&#x9700;&#x8981;&#x5206;&#x4E3A;&#x591A;&#x4E2A;&#x5E27;&#x4F20;&#x8F93;</code></pre><p><strong>rsv1-3&#xFF1A;</strong> &#x9ED8;&#x8BA4;&#x4E3A;0.&#x63A5;&#x6536;&#x534F;&#x5546;&#x6269;&#x5C55;&#x5B9A;&#x4E49;&#x4E3A;&#x975E;0&#x8BBE;&#x5B9A;&#x3002;<br><strong>opcode&#xFF1A;</strong> &#x64CD;&#x4F5C;&#x7801;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5B9A;&#x4E49;&#x4E86;&#x8BE5;&#x6570;&#x636E;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x4E3A;&#x5B9A;&#x4E49;&#x5185;&#x7684;&#x503C;&#x5219;&#x8FDE;&#x63A5;&#x4E2D;&#x65AD;&#x3002;&#x5360;&#x56DB;&#x4E2A;&#x4F4D;&#xFF0C;&#x53EF;&#x4EE5;&#x8868;&#x793A;0~15&#x7684;&#x5341;&#x8FDB;&#x5236;&#xFF0C;&#x6216;&#x8005;&#x4E00;&#x4E2A;&#x5341;&#x516D;&#x8FDB;&#x5236;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    %x0 &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x7EE7;&#x7EED;&#x5E27;
    %x1 &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x6587;&#x672C;&#x5E27;
    %x2 &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x5E27;
    %x3-7 &#x4E3A;&#x4EE5;&#x540E;&#x7684;&#x975E;&#x63A7;&#x5236;&#x5E27;&#x4FDD;&#x7559;
    %x8 &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x8FDE;&#x63A5;&#x5173;&#x95ED;
    %x9 &#x8868;&#x793A;&#x4E00;&#x4E2A;ping
    %x10 &#x8868;&#x793A;&#x4E00;&#x4E2A;pong
    %x11-15 &#x4E3A;&#x4EE5;&#x540E;&#x7684;&#x63A7;&#x5236;&#x5E27;&#x4FDD;&#x7559;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code><span class="hljs-tag">    
    %<span class="hljs-selector-tag">x0</span></span> &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x7EE7;&#x7EED;&#x5E27;
<span class="hljs-tag">    %<span class="hljs-selector-tag">x1</span></span> &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x6587;&#x672C;&#x5E27;
<span class="hljs-tag">    %<span class="hljs-selector-tag">x2</span></span> &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x4E8C;&#x8FDB;&#x5236;&#x5E27;
<span class="hljs-tag">    %<span class="hljs-selector-tag">x3</span></span>-7 &#x4E3A;&#x4EE5;&#x540E;&#x7684;&#x975E;&#x63A7;&#x5236;&#x5E27;&#x4FDD;&#x7559;
<span class="hljs-tag">    %<span class="hljs-selector-tag">x8</span></span> &#x8868;&#x793A;&#x4E00;&#x4E2A;&#x8FDE;&#x63A5;&#x5173;&#x95ED;
<span class="hljs-tag">    %<span class="hljs-selector-tag">x9</span></span> &#x8868;&#x793A;&#x4E00;&#x4E2A;ping
<span class="hljs-tag">    %<span class="hljs-selector-tag">x10</span></span> &#x8868;&#x793A;&#x4E00;&#x4E2A;pong
<span class="hljs-tag">    %<span class="hljs-selector-tag">x11</span></span>-15 &#x4E3A;&#x4EE5;&#x540E;&#x7684;&#x63A7;&#x5236;&#x5E27;&#x4FDD;&#x7559;</code></pre><p><strong>masked&#xFF1A;</strong> &#x5360;&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x8282;&#x7684;&#x4E00;&#x4F4D;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;masking-key&#x662F;&#x5426;&#x5B58;&#x5728;&#x3002;&#x5E76;&#x4E14;&#x4F7F;&#x7528;masking-key&#x63A9;&#x7801;&#x89E3;&#x6790;Payload data&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    1 &#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;&#x5230;&#x670D;&#x52A1;&#x7AEF;
    0 &#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;&#x5230;&#x5BA2;&#x6237;&#x7AEF;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>
    <span class="hljs-number">1</span> &#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;&#x5230;&#x670D;&#x52A1;&#x7AEF;
    <span class="hljs-number">0</span> &#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;&#x5230;&#x5BA2;&#x6237;&#x7AEF;
</code></pre><p><strong>payload length&#xFF1A;</strong> &#x8868;&#x793A;Payload data&#x7684;&#x603B;&#x957F;&#x5EA6;&#x3002;&#x5360;7&#x4F4D;&#xFF0C;&#x6216;&#x8005;7+2&#x4E2A;&#x5B57;&#x8282;&#x3001;&#x6216;&#x8005;7+8&#x4E2A;&#x5B57;&#x8282;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    0-125&#xFF0C;&#x5219;&#x662F;payload&#x7684;&#x771F;&#x5B9E;&#x957F;&#x5EA6;
    126&#xFF0C;&#x5219;&#x540E;&#x9762;2&#x4E2A;&#x5B57;&#x8282;&#x5F62;&#x6210;&#x7684;16&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x578B;&#x6570;&#x7684;&#x503C;&#x662F;payload&#x7684;&#x771F;&#x5B9E;&#x957F;&#x5EA6;&#xFF0C;125&lt;&#x6570;&#x636E;&#x957F;&#x5EA6;&lt;65535
    127&#xFF0C;&#x5219;&#x540E;&#x9762;8&#x4E2A;&#x5B57;&#x8282;&#x5F62;&#x6210;&#x7684;64&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x578B;&#x6570;&#x7684;&#x503C;&#x662F;payload&#x7684;&#x771F;&#x5B9E;&#x957F;&#x5EA6;&#xFF0C;&#x6570;&#x636E;&#x957F;&#x5EA6;&gt;65535
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>    <span class="hljs-number">0</span><span class="hljs-number">-125</span>&#xFF0C;&#x5219;&#x662F;payload&#x7684;&#x771F;&#x5B9E;&#x957F;&#x5EA6;
    <span class="hljs-number">126</span>&#xFF0C;&#x5219;&#x540E;&#x9762;<span class="hljs-number">2</span>&#x4E2A;&#x5B57;&#x8282;&#x5F62;&#x6210;&#x7684;<span class="hljs-number">16</span>&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x578B;&#x6570;&#x7684;&#x503C;&#x662F;payload&#x7684;&#x771F;&#x5B9E;&#x957F;&#x5EA6;&#xFF0C;<span class="hljs-number">125</span>&lt;&#x6570;&#x636E;&#x957F;&#x5EA6;&lt;<span class="hljs-number">65535</span>
    <span class="hljs-number">127</span>&#xFF0C;&#x5219;&#x540E;&#x9762;<span class="hljs-number">8</span>&#x4E2A;&#x5B57;&#x8282;&#x5F62;&#x6210;&#x7684;<span class="hljs-number">64</span>&#x4F4D;&#x65E0;&#x7B26;&#x53F7;&#x6574;&#x578B;&#x6570;&#x7684;&#x503C;&#x662F;payload&#x7684;&#x771F;&#x5B9E;&#x957F;&#x5EA6;&#xFF0C;&#x6570;&#x636E;&#x957F;&#x5EA6;&gt;<span class="hljs-number">65535</span>
</code></pre><p><strong>masking key&#xFF1A;</strong> 0&#x6216;4&#x5B57;&#x8282;&#xFF0C;&#x5F53;masked&#x4E3A;1&#x7684;&#x65F6;&#x5019;&#x624D;&#x5B58;&#x5728;&#xFF0C;&#x4E3A;4&#x4E2A;&#x5B57;&#x8282;&#xFF0C;&#x5426;&#x5219;&#x4E3A;0&#xFF0C;&#x7528;&#x4E8E;&#x5BF9;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x89E3;&#x5BC6;</p><p><strong>payload data&#xFF1A;</strong> &#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;masked&#x4E3A;1&#xFF0C;&#x8BE5;&#x6570;&#x636E;&#x4F1A;&#x88AB;&#x52A0;&#x5BC6;&#xFF0C;&#x8981;&#x901A;&#x8FC7;masking key&#x8FDB;&#x884C;&#x5F02;&#x6216;&#x8FD0;&#x7B97;&#x89E3;&#x5BC6;&#x624D;&#x80FD;&#x83B7;&#x53D6;&#x5230;&#x771F;&#x5B9E;&#x6570;&#x636E;&#x3002;</p></li><li><p><strong>&#x5173;&#x4E8E;&#x6570;&#x636E;&#x5E27;</strong></p><p>&#x56E0;&#x4E3A;WebSocket&#x670D;&#x52A1;&#x7AEF;&#x63A5;&#x6536;&#x5230;&#x7684;&#x6570;&#x636E;&#x6709;&#x53EF;&#x80FD;&#x662F;&#x8FDE;&#x7EED;&#x7684;&#x6570;&#x636E;&#x5E27;&#xFF0C;&#x4E00;&#x4E2A;message&#x53EF;&#x80FD;&#x5206;&#x4E3A;&#x591A;&#x4E2A;&#x5E27;&#x53D1;&#x9001;&#x3002;&#x4F46;&#x5982;&#x679C;&#x4F7F;&#x7528;fin&#x6765;&#x505A;&#x6D88;&#x606F;&#x8FB9;&#x754C;&#x662F;&#x6709;&#x95EE;&#x9898;&#x7684;&#x3002;</p><p>&#x6211;&#x53D1;&#x9001;&#x4E86;&#x4E00;&#x4E2A;27378&#x4E2A;&#x5B57;&#x8282;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x5171;&#x63A5;&#x6536;&#x5230;2&#x5E27;&#xFF0C;&#x4E24;&#x5E27;&#x7684;fin&#x90FD;&#x4E3A;1,&#x800C;&#x4E14;&#x6839;&#x636E;&#x89C4;&#x8303;&#x8BA1;&#x7B97;&#x51FA;&#x6765;&#x7684;&#x4E24;&#x5E27;&#x7684;payload data&#x7684;&#x957F;&#x5EA6;&#x4E3A;27372&#x5C11;&#x4E86;6&#x4E2A;&#x5B57;&#x8282;&#x3002;&#x8FD9;&#x7F3A;&#x5C11;&#x7684;6&#x4E2A;&#x5B57;&#x8282;&#x5176;&#x5B9E;&#x521A;&#x597D;&#x7B49;&#x4E8E;2&#x4E2A;&#x56FA;&#x6709;&#x5B57;&#x8282;&#x52A0;&#x4E0A;maskingKey&#x7684;4&#x4E2A;&#x5B57;&#x8282;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x7B2C;&#x4E8C;&#x5E27;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7EAF;&#x7CB9;&#x7684;&#x6570;&#x636E;&#x5E27;&#x3002;&#x8FD9;&#x53C8;&#x662F;&#x600E;&#x4E48;&#x56DE;&#x4E8B;&#x5462;&#xFF1F;&#xFF1F;</p><p>&#x4ECE;&#x7ED3;&#x679C;&#x63A8;&#x6D4B;&#x5B9E;&#x73B0;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x6536;&#x5230;&#x7684;&#x7B2C;2&#x5E27;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x4E0D;&#x662F;&#x5E27;&#x683C;&#x5F0F;&#xFF0C;&#x8BF4;&#x660E;&#x6570;&#x636E;&#x6CA1;&#x6709;&#x5148;&#x5206;&#x5E27;&#xFF08;&#x5206;&#x7247;&#xFF09;&#x540E;&#x518D;&#x53D1;&#x9001;&#x7684;&#x3002;&#x800C;&#x662F;&#x5C06;&#x4E00;&#x5E27;&#x5206;&#x5305;&#x540E;&#x53D1;&#x9001;&#x7684;&#x3002;</p><blockquote><p>&#x5206;&#x7247;</p><p>&#x5206;&#x7247;&#x7684;&#x4E3B;&#x8981;&#x76EE;&#x7684;&#x662F;&#x5141;&#x8BB8;&#x5F53;&#x6D88;&#x606F;&#x5F00;&#x59CB;&#x4F46;&#x4E0D;&#x5FC5;&#x7F13;&#x51B2;&#x8BE5;&#x6D88;&#x606F;&#x65F6;&#x53D1;&#x9001;&#x4E00;&#x4E2A;&#x672A;&#x77E5;&#x5927;&#x5C0F;&#x7684;&#x6D88;&#x606F;&#x3002;&#x5982;&#x679C;&#x6D88;&#x606F;&#x4E0D;&#x80FD;&#x88AB;&#x5206;&#x7247;&#xFF0C;&#x90A3;&#x4E48;&#x7AEF;&#x70B9;&#x5C06;&#x4E0D;&#x5F97;&#x4E0D;&#x7F13;&#x51B2;&#x6574;&#x4E2A;&#x6D88;&#x606F;&#x4EE5;&#x4FBF;&#x5728;&#x9996;&#x5B57;&#x8282;&#x53D1;&#x751F;&#x4E4B;&#x524D;&#x7EDF;&#x8BA1;&#x51FA;&#x5B83;&#x7684;&#x957F;&#x5EA6;&#x3002;&#x5BF9;&#x4E8E;&#x5206;&#x7247;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x6216;&#x4E2D;&#x95F4;&#x4EF6;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#x5408;&#x9002;&#x5927;&#x5C0F;&#x7684;&#x7F13;&#x51B2;&#xFF0C;&#x5F53;&#x7F13;&#x51B2;&#x6EE1;&#x65F6;&#xFF0C;&#x5199;&#x4E00;&#x4E2A;&#x7247;&#x6BB5;&#x5230;&#x7F51;&#x7EDC;&#x3002;</p></blockquote><p>&#x6211;&#x4EEC;27378&#x4E2A;&#x5B57;&#x8282;&#x7684;&#x6D88;&#x606F;&#x660E;&#x663E;&#x662F;&#x77E5;&#x9053;message&#x957F;&#x5EA6;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x7B97;&#x8FD9;&#x4E2A;message&#x5F88;&#x5927;&#xFF0C;&#x6839;&#x636E;&#x89C4;&#x8303;1&#x5E27;&#x7684;&#x6570;&#x636E;&#x957F;&#x5EA6;&#x7406;&#x8BBA;&#x4E0A;&#x662F;0&lt;&#x6570;&#x636E;&#x957F;&#x5EA6;&lt;65535&#x7684;&#xFF0C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x5E94;&#x8BE5;1&#x5E27;&#x641E;&#x5B9A;&#xFF0C;&#x4ED6;&#x4E5F;&#x53EA;&#x662F;&#x5F53;&#x505A;&#x4E00;&#x5E27;&#x6765;&#x53D1;&#x9001;&#xFF0C;&#x4F46;&#x662F;&#x7531;&#x4E8E;&#x4F20;&#x8F93;&#x9650;&#x5236;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E00;&#x4E2A;&#x5E27;&#xFF08;&#x6211;&#x4EEC;&#x6536;&#x5230;&#x7684;&#x50CF;&#x662F;&#x597D;&#x51E0;&#x5E27;&#x4E00;&#x6837;&#xFF09;&#x4F1A;&#x88AB;&#x62C6;&#x5206;&#x6210;&#x51E0;&#x5757;&#x53D1;&#x9001;&#xFF0C;&#x9664;&#x4E86;&#x7B2C;&#x4E00;&#x5757;&#x662F;&#x5E26;&#x6709;fin&#x3001;opcode&#x3001;masked&#x7B49;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x4E4B;&#x540E;&#x6536;&#x5230;&#x7684;&#x5757;&#x90FD;&#x662F;&#x7EAF;&#x7CB9;&#x7684;&#x6570;&#x636E;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x7B2C;&#x4E00;&#x5757;&#x7684;payload data &#x7684;&#x540E;&#x7EED;&#x90E8;&#x5206;&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C31;&#x662F;socket&#x7684;&#x5C06;WebSocket&#x5206;&#x597D;&#x7684;&#x4E00;&#x5E27;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x4E86;&#x5206;&#x5305;&#x53D1;&#x9001;&#x3002;&#x90A3;&#x4E48;&#x8FD9;&#x79CD;&#x4E00;&#x5E27;&#x88AB;socket&#x5206;&#x5305;&#x53D1;&#x9001;&#xFF0C;&#x5BFC;&#x81F4;&#x50CF;&#x662F;&#x5206;&#x5E27;&#xFF08;&#x5206;&#x7247;&#xFF09;&#x53D1;&#x9001;&#x7684;&#x60C5;&#x51B5;&#xFF08;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x672C;&#x5E94;&#x8BE5;&#x53EA;&#x5C31;&#x6536;&#x4E00;&#x5E27;&#xFF09;&#xFF0C;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x6211;&#x6682;&#x65F6;&#x8FD8;&#x6CA1;&#x6709;&#x60F3;&#x5230;&#x600E;&#x6837;&#x83B7;&#x53D6;&#x72B6;&#x6001;&#x6765;&#x5904;&#x7406;&#x3002;</p><p>&#x603B;&#x7ED3;&#xFF0C;&#x5BA2;&#x6237;&#x7AEF;&#x53D1;&#x9001;&#x6570;&#x636E;&#xFF0C;&#x5728;&#x5B9E;&#x73B0;&#x65F6;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x624B;&#x52A8;&#x8FDB;&#x884C;&#x5206;&#x5E27;&#xFF08;&#x5206;&#x7247;&#xFF09;,&#x4E0D;&#x7136;&#x5C31;&#x6309;&#x7167;&#x4E00;&#x5E27;&#x53D1;&#x9001;&#xFF0C;&#x5C0F;&#x6570;&#x636E;&#x91CF;&#x65E0;&#x6240;&#x8C13;&#xFF1B;&#x5982;&#x679C;&#x662F;&#x5927;&#x6570;&#x636E;&#x91CF;&#xFF0C;&#x5C31;&#x4F1A;&#x88AB;socket&#x81EA;&#x52A8;&#x5206;&#x5305;&#x53D1;&#x9001;&#x3002;&#x8FD9;&#x4E2A;&#x4E0E;WebSocket&#x534F;&#x8BAE;&#x89C4;&#x8303;&#x6240;&#x6807;&#x699C;&#x7684;&#x81EA;&#x52A8;&#x5206;&#x5E27;&#xFF08;&#x5206;&#x7247;&#xFF09;&#xFF0C;&#x5B58;&#x5728;&#x7684;&#x5DEE;&#x5F02;&#x5E94;&#x8BE5;&#x662F;&#x5404;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x5728;&#x5BF9;WebSocket&#x534F;&#x8BAE;&#x89C4;&#x8303;&#x7684;&#x5B9E;&#x73B0;&#x4E0A;&#x5077;&#x5DE5;&#x51CF;&#x6599;&#x6240;&#x9020;&#x6210;&#x7684;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x770B;&#x89C1;socket.io&#x7B49;&#x63D2;&#x4EF6;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x5BA2;&#x6237;&#x7AEF;&#x63A5;&#x53E3;&#xFF0C;&#x5E94;&#x8BE5;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x91CD;&#x65B0;&#x662F;&#x5B9E;&#x73B0;WebSocket&#x534F;&#x8BAE;&#x89C4;&#x8303;&#x3002;&#x4ECE;&#x539F;&#x7406;&#x51FA;&#x53D1;&#xFF0C;&#x6211;&#x4EEC;&#x63A5;&#x4E0B;&#x6765;&#x8FD8;&#x662F;&#x4EE5;&#x5C0F;&#x6570;&#x636E;&#x91CF;&#xFF08;&#x5355;&#x5E27;&#xFF09;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x4E3A;&#x4F8B;&#x4E86;&#x3002;</p></li><li><p><strong>&#x89E3;&#x6790;&#x6570;&#x636E;&#x5E27;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//dataHandler.js
// &#x6536;&#x96C6;&#x672C;&#x6B21;message&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;
getData(data, callback) {
    this.getState(data);
    // &#x5982;&#x679C;&#x72B6;&#x6001;&#x7801;&#x4E3A;8&#x8BF4;&#x660E;&#x8981;&#x5173;&#x95ED;&#x8FDE;&#x63A5;
    if(this.state.opcode == 8) {
        this.OPEN = false;
        this.closeSocket();
        return;
    }
    // &#x5982;&#x679C;&#x662F;&#x5FC3;&#x8DF3;pong,&#x56DE;&#x4E00;&#x4E2A;ping
    if(this.state.opcode == 10) {
        this.OPEN = true;
        this.pingTimes = 0;// &#x56DE;&#x4E86;pong&#x5C31;&#x5C06;&#x6B21;&#x6570;&#x6E05;&#x96F6;
        return;
    }
    // &#x6536;&#x96C6;&#x672C;&#x6B21;&#x6570;&#x636E;&#x6D41;&#x6570;&#x636E;
    this.dataList.push(this.state.payloadData);

    // &#x957F;&#x5EA6;&#x4E3A;0&#xFF0C;&#x8BF4;&#x660E;&#x5F53;&#x524D;&#x5E27;&#x4F4D;&#x6700;&#x540E;&#x4E00;&#x5E27;&#x3002;
    if(this.state.remains == 0){
        let buf = Buffer.concat(this.dataList, this.state.payloadLength);
        //&#x4F7F;&#x7528;&#x63A9;&#x7801;maskingKey&#x89E3;&#x6790;&#x6240;&#x6709;&#x6570;&#x636E;
        let result = this.parseData(buf);
        // &#x6570;&#x636E;&#x63A5;&#x6536;&#x5B8C;&#x6210;&#x540E;&#x56DE;&#x8C03;&#x56DE;&#x4E1A;&#x52A1;&#x51FD;&#x6570;
        callback(this.socket, result);
        //&#x91CD;&#x7F6E;&#x72B6;&#x6001;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;message&#x5DF2;&#x7ECF;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#x4E86;
        this.resetState();
    }else{
        this.state.index++;
    }
}

// &#x6536;&#x96C6;&#x672C;&#x6B21;message&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;
getData(data, callback) {
    this.getState(data);

    // &#x6536;&#x96C6;&#x672C;&#x6B21;&#x6570;&#x636E;&#x6D41;&#x6570;&#x636E;
    this.dataList.push(this.state.payloadData);

    // &#x957F;&#x5EA6;&#x4E3A;0&#xFF0C;&#x8BF4;&#x660E;&#x5F53;&#x524D;&#x5E27;&#x4F4D;&#x6700;&#x540E;&#x4E00;&#x5E27;&#x3002;
    if(this.state.remains == 0){
        let buf = Buffer.concat(this.dataList, this.state.payloadLength);
        //&#x4F7F;&#x7528;&#x63A9;&#x7801;maskingKey&#x89E3;&#x6790;&#x6240;&#x6709;&#x6570;&#x636E;
        let result = this.parseData(buf);
        // &#x6570;&#x636E;&#x63A5;&#x6536;&#x5B8C;&#x6210;&#x540E;&#x56DE;&#x8C03;&#x56DE;&#x4E1A;&#x52A1;&#x51FD;&#x6570;
        callback(this.socket, result);
        //&#x91CD;&#x7F6E;&#x72B6;&#x6001;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;message&#x5DF2;&#x7ECF;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#x4E86;
        this.resetState();
    }else{
        this.state.index++;
    }
}

// &#x89E3;&#x6790;&#x672C;&#x6B21;message&#x6240;&#x6709;&#x6570;&#x636E;
parseData(allData, callback){
    let len = allData.length,
        i = 0;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">//dataHandler.js</span>
<span class="hljs-comment">// &#x6536;&#x96C6;&#x672C;&#x6B21;message&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;</span>
getData(<span class="hljs-keyword">data</span>, callback) {
    <span class="hljs-keyword">this</span>.getState(<span class="hljs-keyword">data</span>);
    <span class="hljs-comment">// &#x5982;&#x679C;&#x72B6;&#x6001;&#x7801;&#x4E3A;8&#x8BF4;&#x660E;&#x8981;&#x5173;&#x95ED;&#x8FDE;&#x63A5;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.opcode == <span class="hljs-number">8</span>) {
        <span class="hljs-keyword">this</span>.OPEN = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.closeSocket();
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">// &#x5982;&#x679C;&#x662F;&#x5FC3;&#x8DF3;pong,&#x56DE;&#x4E00;&#x4E2A;ping</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.opcode == <span class="hljs-number">10</span>) {
        <span class="hljs-keyword">this</span>.OPEN = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">this</span>.pingTimes = <span class="hljs-number">0</span>;<span class="hljs-comment">// &#x56DE;&#x4E86;pong&#x5C31;&#x5C06;&#x6B21;&#x6570;&#x6E05;&#x96F6;</span>
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">// &#x6536;&#x96C6;&#x672C;&#x6B21;&#x6570;&#x636E;&#x6D41;&#x6570;&#x636E;</span>
    <span class="hljs-keyword">this</span>.dataList.push(<span class="hljs-keyword">this</span>.state.payloadData);

    <span class="hljs-comment">// &#x957F;&#x5EA6;&#x4E3A;0&#xFF0C;&#x8BF4;&#x660E;&#x5F53;&#x524D;&#x5E27;&#x4F4D;&#x6700;&#x540E;&#x4E00;&#x5E27;&#x3002;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.remains == <span class="hljs-number">0</span>){
        let buf = Buffer.concat(<span class="hljs-keyword">this</span>.dataList, <span class="hljs-keyword">this</span>.state.payloadLength);
        <span class="hljs-comment">//&#x4F7F;&#x7528;&#x63A9;&#x7801;maskingKey&#x89E3;&#x6790;&#x6240;&#x6709;&#x6570;&#x636E;</span>
        let result = <span class="hljs-keyword">this</span>.parseData(buf);
        <span class="hljs-comment">// &#x6570;&#x636E;&#x63A5;&#x6536;&#x5B8C;&#x6210;&#x540E;&#x56DE;&#x8C03;&#x56DE;&#x4E1A;&#x52A1;&#x51FD;&#x6570;</span>
        callback(<span class="hljs-keyword">this</span>.socket, result);
        <span class="hljs-comment">//&#x91CD;&#x7F6E;&#x72B6;&#x6001;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;message&#x5DF2;&#x7ECF;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#x4E86;</span>
        <span class="hljs-keyword">this</span>.resetState();
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.state.index++;
    }
}

<span class="hljs-comment">// &#x6536;&#x96C6;&#x672C;&#x6B21;message&#x7684;&#x6240;&#x6709;&#x6570;&#x636E;</span>
getData(<span class="hljs-keyword">data</span>, callback) {
    <span class="hljs-keyword">this</span>.getState(<span class="hljs-keyword">data</span>);

    <span class="hljs-comment">// &#x6536;&#x96C6;&#x672C;&#x6B21;&#x6570;&#x636E;&#x6D41;&#x6570;&#x636E;</span>
    <span class="hljs-keyword">this</span>.dataList.push(<span class="hljs-keyword">this</span>.state.payloadData);

    <span class="hljs-comment">// &#x957F;&#x5EA6;&#x4E3A;0&#xFF0C;&#x8BF4;&#x660E;&#x5F53;&#x524D;&#x5E27;&#x4F4D;&#x6700;&#x540E;&#x4E00;&#x5E27;&#x3002;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.remains == <span class="hljs-number">0</span>){
        let buf = Buffer.concat(<span class="hljs-keyword">this</span>.dataList, <span class="hljs-keyword">this</span>.state.payloadLength);
        <span class="hljs-comment">//&#x4F7F;&#x7528;&#x63A9;&#x7801;maskingKey&#x89E3;&#x6790;&#x6240;&#x6709;&#x6570;&#x636E;</span>
        let result = <span class="hljs-keyword">this</span>.parseData(buf);
        <span class="hljs-comment">// &#x6570;&#x636E;&#x63A5;&#x6536;&#x5B8C;&#x6210;&#x540E;&#x56DE;&#x8C03;&#x56DE;&#x4E1A;&#x52A1;&#x51FD;&#x6570;</span>
        callback(<span class="hljs-keyword">this</span>.socket, result);
        <span class="hljs-comment">//&#x91CD;&#x7F6E;&#x72B6;&#x6001;&#xFF0C;&#x8868;&#x793A;&#x5F53;&#x524D;message&#x5DF2;&#x7ECF;&#x89E3;&#x6790;&#x5B8C;&#x6210;&#x4E86;</span>
        <span class="hljs-keyword">this</span>.resetState();
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.state.index++;
    }
}

<span class="hljs-comment">// &#x89E3;&#x6790;&#x672C;&#x6B21;message&#x6240;&#x6709;&#x6570;&#x636E;</span>
parseData(allData, callback){
    let len = allData.length,
        i = <span class="hljs-number">0</span>;</code></pre></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        for(; i &lt; len; i++){
            allData[i] = allData[i] ^ this.state.maskingKey[ i % 4 ];// &#x5F02;&#x6216;&#x8FD0;&#x7B97;&#xFF0C;&#x4F7F;&#x7528;maskingKey&#x56DB;&#x4E2A;&#x5B57;&#x8282;&#x8F6E;&#x6D41;&#x8FDB;&#x884C;&#x8BA1;&#x7B97;
        }
        // &#x5224;&#x65AD;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x4E3A;&#x6587;&#x672C;&#x7C7B;&#x578B;
        if(this.state.opcode == 1) allData = allData.toString();

        return allData;
    }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>        <span class="hljs-keyword">for</span>(; i &lt; len; i++){
            allData[i] = allData[i] ^ <span class="hljs-keyword">this</span>.state.maskingKey[ i % <span class="hljs-number">4</span> ];<span class="hljs-comment">// &#x5F02;&#x6216;&#x8FD0;&#x7B97;&#xFF0C;&#x4F7F;&#x7528;maskingKey&#x56DB;&#x4E2A;&#x5B57;&#x8282;&#x8F6E;&#x6D41;&#x8FDB;&#x884C;&#x8BA1;&#x7B97;</span>
        }
        <span class="hljs-comment">// &#x5224;&#x65AD;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x4E3A;&#x6587;&#x672C;&#x7C7B;&#x578B;</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.state.opcode == <span class="hljs-number">1</span>) allData = allData.toString();

        <span class="hljs-keyword">return</span> allData;
    }
</code></pre><ul><li><p><strong>&#x7EC4;&#x88C5;&#x9700;&#x8981;&#x53D1;&#x9001;&#x7684;&#x6570;&#x636E;&#x5E27;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x7EC4;&#x88C5;&#x6570;&#x636E;&#x5E27;&#xFF0C;&#x53D1;&#x9001;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x63A9;&#x7801;&#x52A0;&#x5BC6;
createData(data){
    let dataType = Buffer.isBuffer(data);// &#x6570;&#x636E;&#x7C7B;&#x578B;
    let dataBuf, // &#x9700;&#x8981;&#x53D1;&#x9001;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;
        dataLength,// &#x6570;&#x636E;&#x771F;&#x5B9E;&#x957F;&#x5EA6;
        dataIndex = 2; // &#x6570;&#x636E;&#x7684;&#x8D77;&#x59CB;&#x957F;&#x5EA6;
    let frame; // &#x6570;&#x636E;&#x5E27;

    if(dataType) dataBuf = data;
    else dataBuf = Buffer.from(data); // &#x4E5F;&#x53EF;&#x4EE5;&#x4E0D;&#x505A;&#x7C7B;&#x578B;&#x5224;&#x65AD;&#xFF0C;&#x76F4;&#x63A5;Buffer.form(data)
    dataLength = dataBuf.byteLength; 
    
    // &#x8BA1;&#x7B97;payload data&#x5728;frame&#x4E2D;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;
    dataIndex = dataIndex + (dataLength &gt; 65535 ? 8 : (dataLength &gt; 125 ? 2 : 0));

    frame = new Buffer.alloc(dataIndex + dataLength);

    //&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x8282;,fin = 1,opcode = 1
    frame[0] = parseInt(10000001, 2);

    //&#x957F;&#x5EA6;&#x8D85;&#x8FC7;65535&#x7684;&#x5219;&#x7531;8&#x4E2A;&#x5B57;&#x8282;&#x8868;&#x793A;&#xFF0C;&#x56E0;&#x4E3A;4&#x4E2A;&#x5B57;&#x8282;&#x80FD;&#x8868;&#x8FBE;&#x7684;&#x957F;&#x5EA6;&#x4E3A;4294967295&#xFF0C;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x591F;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x76F4;&#x63A5;&#x5C06;&#x524D;&#x9762;4&#x4E2A;&#x5B57;&#x8282;&#x7F6E;0
    if(dataLength &gt; 65535){
        frame[1] = 127; //&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x8282;
        frame.writeUInt32BE(0, 2); 
        frame.writeUInt32BE(dataLength, 6);
    }else if(dataLength &gt; 125){
        frame[1] = 126;
        frame.writeUInt16BE(dataLength, 2);
    }else{
        frame[1] = dataLength;
    }

    // &#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6570;&#x636E;
    frame.write(dataBuf.toString(), dataIndex);

    return frame;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pony"><code>
<span class="hljs-comment">// &#x7EC4;&#x88C5;&#x6570;&#x636E;&#x5E27;&#xFF0C;&#x53D1;&#x9001;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x63A9;&#x7801;&#x52A0;&#x5BC6;</span>
createData(data){
    <span class="hljs-keyword">let</span> dataType = <span class="hljs-type">Buffer</span>.isBuffer(data);<span class="hljs-comment">// &#x6570;&#x636E;&#x7C7B;&#x578B;</span>
    <span class="hljs-keyword">let</span> dataBuf, <span class="hljs-comment">// &#x9700;&#x8981;&#x53D1;&#x9001;&#x7684;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;</span>
        dataLength,<span class="hljs-comment">// &#x6570;&#x636E;&#x771F;&#x5B9E;&#x957F;&#x5EA6;</span>
        dataIndex = <span class="hljs-number">2</span>; <span class="hljs-comment">// &#x6570;&#x636E;&#x7684;&#x8D77;&#x59CB;&#x957F;&#x5EA6;</span>
    <span class="hljs-keyword">let</span> frame; <span class="hljs-comment">// &#x6570;&#x636E;&#x5E27;</span>

    <span class="hljs-keyword">if</span>(dataType) dataBuf = data;
    <span class="hljs-keyword">else</span> dataBuf = <span class="hljs-type">Buffer</span>.from(data); <span class="hljs-comment">// &#x4E5F;&#x53EF;&#x4EE5;&#x4E0D;&#x505A;&#x7C7B;&#x578B;&#x5224;&#x65AD;&#xFF0C;&#x76F4;&#x63A5;Buffer.form(data)</span>
    dataLength = dataBuf.byteLength; 
    
    <span class="hljs-comment">// &#x8BA1;&#x7B97;payload data&#x5728;frame&#x4E2D;&#x7684;&#x8D77;&#x59CB;&#x4F4D;&#x7F6E;</span>
    dataIndex = dataIndex + (dataLength &gt; <span class="hljs-number">65535</span> ? <span class="hljs-number">8</span> : (dataLength &gt; <span class="hljs-number">125</span> ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span>));

    frame = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Buffer</span>.<span class="hljs-title">alloc</span>(dataIndex + dataLength);

    <span class="hljs-comment">//&#x7B2C;&#x4E00;&#x4E2A;&#x5B57;&#x8282;,fin = 1,opcode = 1</span>
    <span class="hljs-title">frame</span>[0] = <span class="hljs-title">parseInt</span>(<span class="hljs-number">10000001</span>, <span class="hljs-number">2</span>);

    <span class="hljs-comment">//&#x957F;&#x5EA6;&#x8D85;&#x8FC7;65535&#x7684;&#x5219;&#x7531;8&#x4E2A;&#x5B57;&#x8282;&#x8868;&#x793A;&#xFF0C;&#x56E0;&#x4E3A;4&#x4E2A;&#x5B57;&#x8282;&#x80FD;&#x8868;&#x8FBE;&#x7684;&#x957F;&#x5EA6;&#x4E3A;4294967295&#xFF0C;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x591F;&#x7528;&#xFF0C;&#x56E0;&#x6B64;&#x76F4;&#x63A5;&#x5C06;&#x524D;&#x9762;4&#x4E2A;&#x5B57;&#x8282;&#x7F6E;0</span>
    <span class="hljs-title">if</span>(dataLength &gt; <span class="hljs-number">65535</span>){
        <span class="hljs-title">frame</span>[1] = 127; <span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x4E2A;&#x5B57;&#x8282;</span>
        <span class="hljs-title">frame</span>.<span class="hljs-title">writeUInt32BE</span>(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>); 
        <span class="hljs-title">frame</span>.<span class="hljs-title">writeUInt32BE</span>(dataLength, <span class="hljs-number">6</span>);
    }<span class="hljs-title">else</span> <span class="hljs-title">if</span>(dataLength &gt; <span class="hljs-number">125</span>){
        <span class="hljs-title">frame</span>[1] = 126;
        <span class="hljs-title">frame</span>.<span class="hljs-title">writeUInt16BE</span>(dataLength, <span class="hljs-number">2</span>);
    }<span class="hljs-title">else</span>{
        <span class="hljs-title">frame</span>[1] = <span class="hljs-title">dataLength</span>;
    }

    <span class="hljs-comment">// &#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x9001;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6570;&#x636E;</span>
    <span class="hljs-title">frame</span>.<span class="hljs-title">write</span>(dataBuf.toString(), <span class="hljs-title">dataIndex</span>);

    <span class="hljs-title">return</span> <span class="hljs-title">frame</span>;
}
</span></code></pre></li><li><p><strong>&#x5FC3;&#x8DF3;&#x68C0;&#x6D4B;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5FC3;&#x8DF3;&#x68C0;&#x67E5;
sendCheckPing(){
    let _this = this;
    let timer = setTimeout(() =&gt; {
        clearTimeout(timer);
        if (_this.pingTimes &gt;= 3) {
            _this.closeSocket();
            return;
        }
        //&#x8BB0;&#x5F55;&#x5FC3;&#x8DF3;&#x6B21;&#x6570;
        _this.pingTimes++;
        if(_this.pingTimes == 100000) _this.pingTimes = 0;
        _this.sendCheckPing();
    }, 5000);
}
// &#x53D1;&#x9001;&#x5FC3;&#x8DF3;ping
sendPing() {
    let ping = Buffer.alloc(2);
    ping[0] = parseInt(10001001, 2);
    ping[1] = 0;
    this.writeData(ping);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ceylon"><code><span class="hljs-comment">// &#x5FC3;&#x8DF3;&#x68C0;&#x67E5;</span>
sendCheckPing(){
    <span class="hljs-keyword">let</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span> = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">let</span> timer = setTimeout(() =&gt; {
        clearTimeout(timer);
        <span class="hljs-keyword">if</span> (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>.pingTimes &gt;= <span class="hljs-number">3</span>) {
            <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.closeSocket();
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">//&#x8BB0;&#x5F55;&#x5FC3;&#x8DF3;&#x6B21;&#x6570;</span>
        <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.pingTimes++;
        <span class="hljs-keyword">if</span>(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>.pingTimes == <span class="hljs-number">100000</span>) <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.pingTimes = <span class="hljs-number">0</span>;
        <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.sendCheckPing();
    }, <span class="hljs-number">5000</span>);
}
<span class="hljs-comment">// &#x53D1;&#x9001;&#x5FC3;&#x8DF3;ping</span>
sendPing() {
    <span class="hljs-keyword">let</span> ping = Buffer.alloc(<span class="hljs-number">2</span>);
    ping[<span class="hljs-number">0</span>] = parseInt(<span class="hljs-number">10001001</span>, <span class="hljs-number">2</span>);
    ping[<span class="hljs-number">1</span>] = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.writeData(ping);
}
</code></pre></li></ul><h3 id="articleHeader9">&#x5173;&#x95ED;&#x8FDE;&#x63A5;</h3><p>&#x5BA2;&#x6237;&#x7AEF;&#x76F4;&#x63A5;&#x8C03;&#x7528;close&#x65B9;&#x6CD5;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;socket.end&#x65B9;&#x6CD5;&#x3002;</p><h2 id="articleHeader10">&#x6700;&#x540E;</h2><p>WebSocket&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x8BA9;&#x524D;&#x7AEF;&#x66F4;&#x52A0;&#x7684;&#x6709;&#x6240;&#x4F5C;&#x4E3A;&#xFF0C;&#x8FD9;&#x4E2A;&#x65E0;&#x7591;&#x662F;&#x4EE4;&#x4EBA;&#x6B23;&#x559C;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5176;&#x89C4;&#x8303;&#x4E2D;&#x7684;&#x5F88;&#x591A;&#x4E0D;&#x786E;&#x5B9A;&#x4E5F;&#x662F;&#x4EE4;&#x4EBA;&#x5F88;&#x60CB;&#x60DC;&#x7684;&#x3002;<br>&#x56E0;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;WebSocket&#x89C4;&#x8303;&#x7684;&#x4E0D;&#x5B8C;&#x5168;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD8;&#x6709;&#x5F88;&#x591A;&#x9700;&#x8981;&#x505A;&#x7684;&#x4F18;&#x5316;&#xFF0C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x53EA;&#x662F;&#x5B9E;&#x73B0;&#x4EE5;&#x4E00;&#x4E0B;WebSocket&#xFF0C;&#x5173;&#x4E8E;&#x671F;&#x95F4;&#x5F88;&#x591A;&#x7684;&#x5B89;&#x5168;&#x3001;&#x7A33;&#x5B9A;&#x7B49;&#x65B9;&#x9762;&#x7684;&#x9700;&#x8981;&#x5728;&#x5E94;&#x7528;&#x4E2D;&#x8FDB;&#x884C;&#x5145;&#x5B9E;&#x3002;&#x5F53;&#x7136;&#x662F;&#x7528;socket.io&#x8FD9;&#x79CD;&#x76F8;&#x5BF9;&#x6210;&#x719F;&#x7684;&#x63D2;&#x4EF6;&#x4E5F;&#x662F;&#x4E0D;&#x9519;&#x7684;&#x9009;&#x62E9;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebSocket探秘

## 原文链接
[https://segmentfault.com/a/1190000012319848](https://segmentfault.com/a/1190000012319848)


---
title: webSocket
hidden: true
categories: [reprint]
slug: 4562858f
date: 2018-11-06 02:30:12
---

{{< raw >}}
<h3 id="articleHeader0">webSocket&#x662F;&#x4EC0;&#x4E48;</h3><p>webSocket&#x662F;HTML5&#x65B0;&#x51FA;&#x7684;&#x4E00;&#x79CD;&#x534F;&#x8BAE;&#xFF0C;&#x5E95;&#x5C42;&#x662F;&#x57FA;&#x4E8E;TCP/IP&#x534F;&#x8BAE;&#x7684;&#x3002;&#x8DDF;http&#x6CA1;&#x6709;&#x5173;&#x7CFB;&#xFF0C;&#x53EA;&#x662F;&#x590D;&#x7528;&#x4E86;http&#x63E1;&#x624B;&#x901A;&#x9053;&#xFF0C;&#x7528;&#x6765;&#x5347;&#x7EA7;&#x534F;&#x8BAE;&#x3002;</p><h3 id="articleHeader1">webSocket&#x7684;&#x4F5C;&#x7528;</h3><p>&#x8F6E;&#x8BE2;&#xFF1A;&#x5BA2;&#x6237;&#x7AEF;&#x4EE5;&#x4E00;&#x5B9A;&#x7684;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#x5411;&#x670D;&#x52A1;&#x7AEF;&#x53D1;&#x51FA;&#x8BF7;&#x6C42;&#xFF0C;&#x4EE5;&#x9891;&#x7E41;&#x8BF7;&#x6C42;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4FDD;&#x6301;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x7684;&#x540C;&#x6B65;&#x3002;&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x6D4F;&#x89C8;&#x5668;&#x9700;&#x8981;&#x4E0D;&#x65AD;&#x7684;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x51FA;&#x8BF7;&#x6C42;&#xFF0C;&#x7136;&#x800C;HTTP&#x8BF7;&#x6C42;&#x53EF;&#x80FD;&#x5305;&#x542B;&#x8F83;&#x957F;&#x7684;&#x5934;&#x90E8;&#xFF0C;&#x5176;&#x4E2D;&#x771F;&#x6B63;&#x6709;&#x6548;&#x7684;&#x6570;&#x636E;&#x53EF;&#x80FD;&#x53EA;&#x662F;&#x5F88;&#x5C0F;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x663E;&#x7136;&#x8FD9;&#x6837;&#x4F1A;&#x6D6A;&#x8D39;&#x5F88;&#x591A;&#x7684;&#x5E26;&#x5BBD;&#x7B49;&#x8D44;&#x6E90;&#x3002;</li></ul><p>&#x957F;&#x8F6E;&#x8BE2;&#xFF1A;&#x6D4F;&#x89C8;&#x5668;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x5C06;&#x8BF7;&#x6C42;&#x4FDD;&#x6301;&#x6253;&#x5F00;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x3002;&#x5982;&#x679C;&#x5728;&#x8BE5;&#x65F6;&#x95F4;&#x6BB5;&#x5185;&#x6536;&#x5230;&#x901A;&#x77E5;&#xFF0C;&#x5219;&#x5C06;&#x5305;&#x542B;&#x8BE5;&#x6D88;&#x606F;&#x7684;&#x54CD;&#x5E94;&#x53D1;&#x9001;&#x5230;&#x5BA2;&#x6237;&#x7AEF;&#x3002;&#x5982;&#x679C;&#x5728;&#x8BBE;&#x5B9A;&#x7684;&#x65F6;&#x95F4;&#x6BB5;&#x5185;&#x672A;&#x6536;&#x5230;&#x901A;&#x77E5;&#xFF0C;&#x5219;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x54CD;&#x5E94;&#x4EE5;&#x7EC8;&#x6B62;&#x6253;&#x5F00;&#x7684;&#x8BF7;&#x6C42;&#x3002;&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x5F53;&#x5177;&#x6709;&#x8F83;&#x9AD8;&#x7684;&#x6D88;&#x606F;&#x91CF;&#x65F6;&#xFF0C;&#x957F;&#x8F6E;&#x8BE2;&#x4E0D;&#x4F1A;&#x63D0;&#x4F9B;&#x6BD4;&#x4F20;&#x7EDF;&#x8F6E;&#x8BE2;&#x66F4;&#x5927;&#x7684;&#x6027;&#x80FD;&#x6539;&#x8FDB;</li><li>&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x4F1A;&#x963B;&#x585E;&#x8BF7;&#x6C42;&#x76F4;&#x5230;&#x6709;&#x6570;&#x636E;&#x4F20;&#x9012;&#x6216;&#x8D85;&#x65F6;&#x624D;&#x8FD4;&#x56DE;</li></ul><p>&#x4F7F;&#x7528;webSocket&#x6D4F;&#x89C8;&#x5668;&#x548C;&#x670D;&#x52A1;&#x5668;&#x53EA;&#x9700;&#x8981;&#x5B8C;&#x6210;&#x4E00;&#x6B21;&#x63E1;&#x624B;&#xFF0C;&#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x5C31;&#x76F4;&#x63A5;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x6301;&#x4E45;&#x6027;&#x7684;&#x8FDE;&#x63A5;&#xFF0C;&#x5E76;&#x8FDB;&#x884C;&#x53CC;&#x5411;&#x6570;&#x636E;&#x4F20;&#x8F93;&#x3002;<br>&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x80FD;&#x66F4;&#x597D;&#x7684;&#x8282;&#x7701;&#x670D;&#x52A1;&#x5668;&#x8D44;&#x6E90;&#x548C;&#x5E26;&#x5BBD;</li><li>&#x652F;&#x6301;&#x53CC;&#x5411;&#x901A;&#x4FE1;&#xFF0C;&#x5B9E;&#x65F6;&#x6027;&#x66F4;&#x5F3A;</li><li>&#x53EF;&#x4EE5;&#x53D1;&#x9001;&#x6587;&#x672C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x53D1;&#x9001;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;</li></ul><h3 id="articleHeader2">webSocket&#x7684;&#x4F7F;&#x7528;</h3><p>&#x670D;&#x52A1;&#x7AEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = require(&apos;express&apos;)();
var WebSocket = require(&apos;ws&apos;);
var wss = new WebSocket.Server({ port: 8080 });
wss.on(&apos;connection&apos;, function connection(ws) {
    ws.on(&apos;message&apos;, function incoming(message) {
        console.log(message);
    });
    ws.send(&apos;the content from server&apos;);
});
app.listen(3000,() =&gt; {
    console.log(&apos;you are listening port 3000&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>)();
<span class="hljs-keyword">var</span> WebSocket = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;ws&apos;</span>);
<span class="hljs-keyword">var</span> wss = <span class="hljs-keyword">new</span> WebSocket.Server({ <span class="hljs-attr">port</span>: <span class="hljs-number">8080</span> });
wss.on(<span class="hljs-string">&apos;connection&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">connection</span>(<span class="hljs-params">ws</span>) </span>{
    ws.on(<span class="hljs-string">&apos;message&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incoming</span>(<span class="hljs-params">message</span>) </span>{
        <span class="hljs-built_in">console</span>.log(message);
    });
    ws.send(<span class="hljs-string">&apos;the content from server&apos;</span>);
});
app.listen(<span class="hljs-number">3000</span>,() =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;you are listening port 3000&apos;</span>);
});</code></pre><p>&#x5BA2;&#x6237;&#x7AEF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
    var ws = new WebSocket(&apos;ws://localhost:8080&apos;);
    ws.onopen = function () {
        ws.send(&apos;the request from client&apos;);
    };
    ws.onmessage = function (e) {
        console.log(&apos;from server: &apos; + e.data);
    };
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> ws = <span class="hljs-keyword">new</span> WebSocket(<span class="hljs-string">&apos;ws://localhost:8080&apos;</span>);
    ws.onopen = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        ws.send(<span class="hljs-string">&apos;the request from client&apos;</span>);
    };
    ws.onmessage = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;from server: &apos;</span> + e.data);
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><h3 id="articleHeader3">webSocket&#x5E94;&#x7528;&#x573A;&#x666F;</h3><p>&#x793E;&#x4EA4;&#x804A;&#x5929;&#x3001;&#x5F39;&#x5E55;&#x3001;&#x591A;&#x73A9;&#x5BB6;&#x6E38;&#x620F;&#x3001;&#x534F;&#x540C;&#x7F16;&#x8F91;&#x3001;&#x80A1;&#x7968;&#x57FA;&#x91D1;&#x5B9E;&#x65F6;&#x62A5;&#x4EF7;&#x3001;&#x4F53;&#x80B2;&#x5B9E;&#x51B5;&#x66F4;&#x65B0;&#x3001;&#x89C6;&#x9891;&#x4F1A;&#x8BAE;/&#x804A;&#x5929;&#x3001;&#x57FA;&#x4E8E;&#x4F4D;&#x7F6E;&#x7684;&#x5E94;&#x7528;&#x3001;&#x5728;&#x7EBF;&#x6559;&#x80B2;&#x3001;&#x667A;&#x80FD;&#x5BB6;&#x5C45;&#x7B49;&#x9700;&#x8981;&#x9AD8;&#x5B9E;&#x65F6;&#x7684;&#x573A;&#x666F;</p><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p><ul><li><a href="https://www.ibm.com/developerworks/cn/web/wa-lo-comet/" rel="nofollow noreferrer" target="_blank">Comet&#xFF1A;&#x57FA;&#x4E8E; HTTP &#x957F;&#x8FDE;&#x63A5;&#x7684;&#x201C;&#x670D;&#x52A1;&#x5668;&#x63A8;&#x201D;&#x6280;&#x672F;</a></li><li><a href="http://www.websocket.org/quantum.html" rel="nofollow noreferrer" target="_blank">Benefits of WebSocket</a></li><li><a href="https://juejin.im/post/5a4e6a43f265da3e303c4787" rel="nofollow noreferrer" target="_blank">WebSocket&#xFF1A;5&#x5206;&#x949F;&#x4ECE;&#x5165;&#x95E8;&#x5230;&#x7CBE;&#x901A;</a></li><li>&#x300A;web&#x6027;&#x80FD;&#x4F18;&#x5316;&#x6743;&#x5A01;&#x6307;&#x5357;&#x300B;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webSocket

## 原文链接
[https://segmentfault.com/a/1190000016594700](https://segmentfault.com/a/1190000016594700)


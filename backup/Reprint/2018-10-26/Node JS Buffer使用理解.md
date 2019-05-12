---
title: Node JS Buffer使用理解
hidden: true
categories: [reprint]
slug: e9fa7846
date: 2018-10-26 02:30:12
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/bVbfxbn?w=2001&amp;h=2502" src="https://static.alili.tech/img/bVbfxbn?w=2001&amp;h=2502" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>JavaScript &#x8D77;&#x521D;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x800C;&#x8BBE;&#x8BA1;&#xFF0C;&#x6CA1;&#x6709;&#x8BFB;&#x53D6;&#x6216;&#x64CD;&#x4F5C;&#x4E8C;&#x8FDB;&#x5236;&#x6570;&#x636E;&#x6D41;&#x7684;&#x673A;&#x5236;&#x3002;Buffer&#x7C7B;&#x7684;&#x5F15;&#x5165;&#xFF0C;&#x5219;&#x8BA9;NodeJS&#x62E5;&#x6709;&#x64CD;&#x4F5C;&#x6587;&#x4EF6;&#x6D41;&#x6216;&#x7F51;&#x7EDC;&#x4E8C;&#x8FDB;&#x5236;&#x6D41;&#x7684;&#x80FD;&#x529B;&#x3002;</p><h1 id="articleHeader0">Buffer&#x57FA;&#x672C;&#x6982;&#x5FF5;</h1><p>Buffer &#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5B58;&#x5206;&#x914D;&#x4E0D;&#x662F;&#x5728;V8&#x7684;&#x5806;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x800C;&#x662F;Node&#x5728;C++&#x5C42;&#x9762;&#x8FDB;&#x884C;&#x5185;&#x5B58;&#x7533;&#x8BF7;&#xFF0C;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x5355;&#x72EC;&#x5F00;&#x8F9F;&#x4E86;&#x4E00;&#x90E8;&#x5206;&#x7A7A;&#x95F4;&#xFF0C;&#x4F46;&#x662F;&#x4F7F;&#x7528;&#x65F6;&#x5206;&#x914D;&#x5185;&#x5B58;&#x5219;&#x662F;&#x7531;Node&#x5C42;&#x9762;&#x5B8C;&#x6210;&#x7684;&#xFF0C;&#x91CA;&#x653E;&#x4E5F;&#x662F;&#x7531;Node&#x4E2D;v8&#x7684;gc&#x673A;&#x5236;&#x81EA;&#x52A8;&#x63A7;&#x5236;&#x3002;Buffer&#x57FA;&#x672C;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x5728;&#x8D58;&#x8FF0;&#xFF0C;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x5F88;&#x8BE6;&#x7EC6;&#x3002;</p><h1 id="articleHeader1">Buffer&#x6027;&#x80FD;&#x5BF9;&#x6BD4;</h1><p>&#x901A;&#x5E38;&#xFF0C;&#x7F51;&#x7EDC;&#x4F20;&#x8F93;&#x4E2D;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x5C06;&#x6570;&#x636E;&#x8F6C;&#x6362;&#x4E3A;Buffer&#x3002;&#x4E0B;&#x9762;&#x505A;&#x4E00;&#x4E2A;&#x6027;&#x80FD;&#x5BF9;&#x6BD4;&#x5B9E;&#x9A8C;&#x3002;</p><h2 id="articleHeader2">1.&#x4F7F;&#x7528;&#x7EAF;&#x5B57;&#x7B26;&#x4E32;&#x8FD4;&#x56DE;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;);

let hello = &apos;&apos;
for (var i = 0; i &lt; 10240; i++) {
  hello += &quot;a&quot;;
}

console.log(`Hello&#xFF1A;${hello.length}`)
// hello = Buffer.from(hello);

http.createServer((req, res) =&gt; {
  res.writeHead(200);
  res.end(hello);
}).listen(8001);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>);

<span class="hljs-keyword">let</span> hello = <span class="hljs-string">&apos;&apos;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10240</span>; i++) {
  hello += <span class="hljs-string">&quot;a&quot;</span>;
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Hello&#xFF1A;<span class="hljs-subst">${hello.length}</span>`</span>)
<span class="hljs-comment">// hello = Buffer.from(hello);</span>

http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  res.writeHead(<span class="hljs-number">200</span>);
  res.end(hello);
}).listen(<span class="hljs-number">8001</span>);</code></pre><p>&#x4F7F;&#x7528;<code>ab -c 200 -t 100 http://127.0.0.1:8001/</code>&#x547D;&#x4EE4;&#x6765;&#x8FDB;&#x884C;&#x6027;&#x80FD;&#x6D4B;&#x8BD5;&#xFF0C;&#x53D1;&#x8D77;200&#x4E2A;&#x5E76;&#x53D1;&#x5BA2;&#x6237;&#x7AEF;<br><span class="img-wrap"><img data-src="/img/remote/1460000016056469?w=1140&amp;h=1234" src="https://static.alili.tech/img/remote/1460000016056469?w=1140&amp;h=1234" alt="string-200" title="string-200" style="cursor:pointer;display:inline"></span></p><p>&#x4F7F;&#x7528;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;QPS&#x53EF;&#x4EE5;&#x8FBE;&#x5230;4019.70&#xFF0C;&#x4F20;&#x8F93;&#x7387;&#x4E3A;40491.45KB&#x6BCF;&#x79D2;&#x3002;</p><h2 id="articleHeader3">2.&#x4F7F;&#x7528;Buffer&#x3002;&#x5C06;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x6362;&#x4E3A;Buffer&#x5BF9;&#x8C61;&#xFF0C;&#x518D;&#x53D1;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x3002;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const http = require(&apos;http&apos;);

let hello = &apos;&apos;
for (var i = 0; i &lt; 10240; i++) {
  hello += &quot;a&quot;;
}

console.log(`Hello&#xFF1A;${hello.length}`)
hello = Buffer.from(hello);

http.createServer((req, res) =&gt; {
  res.writeHead(200);
  res.end(hello);
}).listen(8001);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>);

<span class="hljs-keyword">let</span> hello = <span class="hljs-string">&apos;&apos;</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10240</span>; i++) {
  hello += <span class="hljs-string">&quot;a&quot;</span>;
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Hello&#xFF1A;<span class="hljs-subst">${hello.length}</span>`</span>)
hello = Buffer.from(hello);

http.createServer(<span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  res.writeHead(<span class="hljs-number">200</span>);
  res.end(hello);
}).listen(<span class="hljs-number">8001</span>);</code></pre><p>&#x53D6;&#x6D88;Buffer&#x8F6C;&#x6362;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x540C;&#x6837;&#x4F7F;&#x7528;<code>ab -c 200 -t 100 http://127.0.0.1:8001/</code>&#x6D4B;&#x8BD5;&#xFF0C;&#x540C;&#x6837;&#x53D1;&#x8D77;200&#x4E2A;&#x5E76;&#x53D1;&#x5BA2;&#x6237;&#x7AEF;&#x3002;<br><span class="img-wrap"><img data-src="/img/remote/1460000016056470?w=1122&amp;h=1224" src="https://static.alili.tech/img/remote/1460000016056470?w=1122&amp;h=1224" alt="buffer-200" title="buffer-200" style="cursor:pointer;display:inline"></span></p><p>&#x4F7F;&#x7528;Buffer&#xFF0C;QPS&#x8FBE;&#x5230;7130.05&#xFF0C;&#x4F20;&#x8F93;&#x7387;&#x4E3A;71822.74KB&#x6BCF;&#x79D2;&#x3002;<br>&#x6027;&#x80FD;&#x662F;&#x539F;&#x6765;&#x7684;177%&#xFF0C;&#x6781;&#x5927;&#x7684;&#x8282;&#x7701;&#x4E86;&#x670D;&#x52A1;&#x5668;&#x8D44;&#x6E90;&#x3002;<br>&#x4E0A;&#x9762;&#x8FD9;&#x4E2A;&#x5BF9;&#x6BD4;&#x793A;&#x4F8B;&#x53C2;&#x8003;&#x4E8E;&#x300A;&#x6DF1;&#x5165;&#x6D45;&#x51FA;Node JS&#x300B;&#x3002;</p><h2 id="articleHeader4">&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x6709;&#x8FD9;&#x4E48;&#x5927;&#x7684;&#x6027;&#x80FD;&#x63D0;&#x5347;&#x5462;&#xFF1F;</h2><p>&#x9053;&#x7406;&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5728;NodeJS&#x4E2D;&#xFF0C;&#x8FDB;&#x884C;http&#x4F20;&#x8F93;&#x65F6;&#xFF0C;&#x82E5;&#x8FD4;&#x56DE;&#x7684;&#x7C7B;&#x578B;&#x4E3A;<code>string</code>&#xFF0C;&#x5219;&#x4F1A;&#x5C06;<code>string</code>&#x7C7B;&#x578B;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8F6C;&#x6362;&#x4E3A;Buffer&#xFF0C;&#x901A;&#x8FC7;NodeJS&#x4E2D;&#x7684;Stream&#x6D41;&#xFF0C;&#x4E00;&#x70B9;&#x70B9;&#x7684;&#x8FD4;&#x56DE;&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;Buffer&#x7C7B;&#x578B;&#xFF0C;&#x5C31;&#x6CA1;&#x6709;&#x4E86;&#x8F6C;&#x6362;&#x64CD;&#x4F5C;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#xFF0C;&#x51CF;&#x5C11;&#x4E86;CPU&#x7684;&#x91CD;&#x590D;&#x4F7F;&#x7528;&#x7387;&#x3002;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#x903B;&#x8F91;&#x89C1;Node&#x6E90;&#x7801;<a href="https://github.com/nodejs/node/blob/v10.9.0/lib/_http_outgoing.js#L612" rel="nofollow noreferrer" target="_blank">https://github.com/nodejs/node/blob/v10.9.0/lib/_http_outgoing.js#L612</a></p><p>&#x5728;&#x4E0A;&#x9762;&#x6027;&#x80FD;&#x5BF9;&#x6BD4;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x8FD4;&#x56DE;<code>string</code>&#x65F6;&#xFF0C;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x90FD;&#x9700;&#x8981;&#x5C06;<code>string</code>&#x88C5;&#x6362;&#x6210;Buffer&#x8FD4;&#x56DE;&#xFF1B;&#x800C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;Buffer&#x65F6;&#xFF0C;&#x8FD9;&#x4E2A;Buffer&#x662F;&#x6211;&#x4EEC;&#x542F;&#x52A8;&#x670D;&#x52A1;&#x65F6;&#x5C31;&#x5B58;&#x653E;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x7684;&#xFF0C;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5185;&#x5B58;&#x4E2D;&#x7684;Buffer&#x5373;&#x53EF;&#xFF0C;&#x56E0;&#x6B64;Buffer&#x4F7F;&#x7528;&#x524D;&#x540E;QPS&#x63D0;&#x5347;&#x4E86;&#x5F88;&#x591A;&#x3002;</p><p>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5199;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x90E8;&#x5206;&#x8D44;&#x6E90;&#x53EF;&#x4EE5;&#x9884;&#x5148;&#x8F6C;&#x6362;&#x4E3A;Buffer&#x7C7B;&#x578B;&#xFF08;&#x5982;js&#x3001;css&#x7B49;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x6587;&#x4EF6;&#xFF09;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;buffer&#x7ED9;&#x5BA2;&#x6237;&#x7AEF;&#xFF0C;&#x518D;&#x6BD4;&#x5982;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x8F6C;&#x53D1;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x5C06;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x5185;&#x5BB9;&#x50A8;&#x5B58;&#x4E3A;Buffer&#x76F4;&#x63A5;&#x8F6C;&#x53D1;&#xFF0C;&#x907F;&#x514D;&#x989D;&#x5916;&#x7684;&#x8F6C;&#x6362;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p><ul><li><a href="http://nodejs.cn/api/buffer.html" rel="nofollow noreferrer" target="_blank">http://nodejs.cn/api/buffer.html</a></li><li><a href="https://book.douban.com/subject/25768396/" rel="nofollow noreferrer" target="_blank">https://book.douban.com/subje...</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node JS Buffer使用理解

## 原文链接
[https://segmentfault.com/a/1190000016056466](https://segmentfault.com/a/1190000016056466)


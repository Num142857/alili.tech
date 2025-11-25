---
title: 'Redis新手指南：在node中使用redis' 
date: 2018-11-18 3:32:07
hidden: true
slug: g4rgig2tv8g
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">Redis&#x7B80;&#x4ECB;</h2><p>Redis&#x662F;&#x4E00;&#x4E2A;&#x9AD8;&#x6027;&#x80FD;&#x7684;key-value&#x6570;&#x636E;&#x5E93;&#xFF0C;Redis&#x628A;&#x6570;&#x636E;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5E76;&#x5728;&#x78C1;&#x76D8;&#x4E2D;&#x8BB0;&#x5F55;&#x6570;&#x636E;&#x7684;&#x53D8;&#x5316;&#x3002;&#x56E0;&#x4E3A;&#x5C06;&#x6570;&#x636E;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x6570;&#x636E;&#x64CD;&#x4F5C;&#x975E;&#x5E38;&#x5FEB;&#x3002;</p><h2 id="articleHeader1">&#x5B89;&#x88C5;</h2><p>&#x4EE5;windows&#x73AF;&#x5883;&#x4E3A;&#x4F8B;&#xFF0C;&#x5148;&#x4E0B;&#x8F7D;windows&#x7248;&#x672C;&#x7684;redis&#xFF0C;&#x5730;&#x5740;&#x5982;&#x4E0B;&#xFF1A;<a href="https://github.com/MicrosoftArchive/redis/releases" rel="nofollow noreferrer" target="_blank">3.2.100</a><br>&#x4E0B;&#x8F7D;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x89E3;&#x538B;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x89E3;&#x538B;&#x5230;D:redis&#x76EE;&#x5F55;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/bVbeNS1?w=768&amp;h=278" src="https://static.alili.tech/img/bVbeNS1?w=768&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x5F00;&#x542F;&#x670D;&#x52A1;</h2><p>&#x6253;&#x5F00;&#x4E00;&#x4E2A; cmd &#x7A97;&#x53E3;&#xFF0C;&#x8FDB;&#x5165;&#x76EE;&#x5F55;&#x5230; D:redis&#xFF0C;&#x8FD0;&#x884C; redis-server.exe redis.windows.conf&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbeNTN?w=644&amp;h=373" src="https://static.alili.tech/img/bVbeNTN?w=644&amp;h=373" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x51FA;&#x73B0;&#x4E0A;&#x9762;&#x754C;&#x9762;&#xFF0C;&#x5219;redis&#x5DF2;&#x7ECF;&#x5728;&#x672C;&#x673A;&#x7AEF;&#x53E3;6379&#x542F;&#x52A8;&#x4E86;&#x670D;&#x52A1;&#xFF0C;&#x90A3;&#x4E48;&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x4FBF;&#x53EF;&#x4EE5;&#x7528;&#x5BA2;&#x6237;&#x7AEF;&#x8FDE;&#x63A5;&#x5230;redis&#x670D;&#x52A1;&#x7AEF;&#x4E86;&#x3002;</p><h2 id="articleHeader3">&#x5728;node&#x4E2D;&#x4F7F;&#x7528;redis</h2><p>&#x9996;&#x5148;&#xFF0C;&#x5B89;&#x88C5;&#x9A71;&#x52A8;&#xFF1A;<code>npm install redis</code></p><p>redis&#x652F;&#x6301;&#x591A;&#x79CD;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x5E38;&#x7528;&#x7684;&#x6709;&#x952E;/&#x503C;&#x5BF9;&#xFF0C;&#x54C8;&#x5E0C;&#x8868;&#xFF0C;&#x94FE;&#x8868;&#xFF0C;&#x96C6;&#x5408;&#x7B49;&#x3002;</p><h3 id="articleHeader4">&#x666E;&#x901A;&#x6570;&#x636E;</h3><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x5982;&#x4F55;&#x5B58;&#x50A8;&#x548C;&#x83B7;&#x53D6;&#x952E;/&#x503C;&#x5BF9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var redis = require(&apos;redis&apos;)

var client = redis.createClient(6379, &apos;127.0.0.1&apos;)
client.on(&apos;error&apos;, function (err) {
  console.log(&apos;Error &apos; + err);
});

// 1 &#x952E;&#x503C;&#x5BF9;
client.set(&apos;color&apos;, &apos;red&apos;, redis.print);
client.get(&apos;color&apos;, function(err, value) {
  if (err) throw err;
  console.log(&apos;Got: &apos; + value)
  client.quit();
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> redis = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;redis&apos;</span>)

<span class="hljs-keyword">var</span> client = redis.createClient(<span class="hljs-number">6379</span>, <span class="hljs-string">&apos;127.0.0.1&apos;</span>)
client.on(<span class="hljs-string">&apos;error&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Error &apos;</span> + err);
});

<span class="hljs-comment">// 1 &#x952E;&#x503C;&#x5BF9;</span>
client.set(<span class="hljs-string">&apos;color&apos;</span>, <span class="hljs-string">&apos;red&apos;</span>, redis.print);
client.get(<span class="hljs-string">&apos;color&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, value</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Got: &apos;</span> + value)
  client.quit();
})</code></pre><p>&#x8FD0;&#x884C;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/bVbeNU3?w=208&amp;h=82" src="https://static.alili.tech/img/bVbeNU3?w=208&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader5">&#x54C8;&#x5E0C;&#x8868;</h3><p>&#x54C8;&#x5E0C;&#x8868;&#x6709;&#x70B9;&#x7C7B;&#x4F3C;ES6&#x4E2D;&#x7684;Map&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.hmset(&apos;kitty&apos;, {
  &apos;age&apos;: &apos;2-year-old&apos;,
  &apos;sex&apos;: &apos;male&apos;
}, redis.print);
client.hget(&apos;kitty&apos;, &apos;age&apos;, function(err, value) {
  if (err) throw err;
  console.log(&apos;kitty is &apos; + value);
});

client.hkeys(&apos;kitty&apos;, function(err, keys) {
  if (err) throw err;
  keys.forEach(function(key, i) {
    console.log(key, i);
  });
  client.quit();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>client.hmset(<span class="hljs-string">&apos;kitty&apos;</span>, {
  <span class="hljs-string">&apos;age&apos;</span>: <span class="hljs-string">&apos;2-year-old&apos;</span>,
  <span class="hljs-string">&apos;sex&apos;</span>: <span class="hljs-string">&apos;male&apos;</span>
}, redis.print);
client.hget(<span class="hljs-string">&apos;kitty&apos;</span>, <span class="hljs-string">&apos;age&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, value</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;kitty is &apos;</span> + value);
});

client.hkeys(<span class="hljs-string">&apos;kitty&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, keys</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  keys.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, i</span>) </span>{
    <span class="hljs-built_in">console</span>.log(key, i);
  });
  client.quit();
});</code></pre><p>&#x8FD0;&#x884C;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeNVj?w=166&amp;h=99" src="https://static.alili.tech/img/bVbeNVj?w=166&amp;h=99" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader6">&#x94FE;&#x8868;</h3><p>Redis&#x94FE;&#x8868;&#x7C7B;&#x4F3C;JS&#x6570;&#x7EC4;&#xFF0C;lpush&#x5411;&#x94FE;&#x8868;&#x4E2D;&#x6DFB;&#x52A0;&#x503C;&#xFF0C;lrange&#x83B7;&#x53D6;&#x53C2;&#x6570;start&#x548C;end&#x8303;&#x56F4;&#x5185;&#x7684;&#x94FE;&#x8868;&#x5143;&#x7D20;, &#x53C2;&#x6570;end&#x4E3A;-1&#xFF0C;&#x8868;&#x660E;&#x5230;&#x94FE;&#x8868;&#x4E2D;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;<br>&#x6CE8;&#x610F;&#xFF1A;&#x968F;&#x7740;&#x94FE;&#x8868;&#x957F;&#x5EA6;&#x7684;&#x589E;&#x957F;&#xFF0C;&#x6570;&#x636E;&#x83B7;&#x53D6;&#x4E5F;&#x4F1A;&#x9010;&#x6E10;&#x53D8;&#x6162;&#xFF08;&#x5927;O&#x8868;&#x793A;&#x6CD5;&#x4E2D;&#x7684;O(n)&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.lpush(&apos;tasks&apos;, &apos;Paint the house red.&apos;, redis.print);
client.lpush(&apos;tasks&apos;, &apos;Paint the house green.&apos;, redis.print);
client.lrange(&apos;tasks&apos;, 0, -1, function(err, items) {
  if (err) throw err;
  items.forEach(function(item, i) {
    console.log(&apos; &apos; + item);
  });
  client.quit();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code>client.lpush(<span class="hljs-string">&apos;tasks&apos;</span>, <span class="hljs-string">&apos;Paint the house red.&apos;</span>, redis.<span class="hljs-keyword">print</span>);
client.lpush(<span class="hljs-string">&apos;tasks&apos;</span>, <span class="hljs-string">&apos;Paint the house green.&apos;</span>, redis.<span class="hljs-keyword">print</span>);
client.lrange(<span class="hljs-string">&apos;tasks&apos;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-1</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, items)</span> </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  items.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item, i)</span> </span>{
    console.log(<span class="hljs-string">&apos; &apos;</span> + item);
  });
  client.quit();
});</code></pre><p>&#x8FD0;&#x884C;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeNVq?w=214&amp;h=104" src="https://static.alili.tech/img/bVbeNVq?w=214&amp;h=104" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader7">&#x96C6;&#x5408;</h3><p>&#x7C7B;&#x4F3C;JS&#x4E2D;&#x7684;Set&#xFF0C;&#x96C6;&#x5408;&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x5FC5;&#x987B;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x5176;&#x6027;&#x80FD;: &#x5927;O&#x8868;&#x793A;&#x6CD5;&#x4E2D;&#x7684;O(1)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="client.sadd(&apos;ip&apos;, &apos;192.168.3.7&apos;, redis.print);
client.sadd(&apos;ip&apos;, &apos;192.168.3.7&apos;, redis.print);
client.sadd(&apos;ip&apos;, &apos;192.168.3.9&apos;, redis.print);
client.smembers(&apos;ip&apos;, function(err, members) {
  if (err) throw err;
  console.log(members);
  client.quit();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code>client.sadd(<span class="hljs-string">&apos;ip&apos;</span>, <span class="hljs-string">&apos;192.168.3.7&apos;</span>, redis.<span class="hljs-keyword">print</span>);
client.sadd(<span class="hljs-string">&apos;ip&apos;</span>, <span class="hljs-string">&apos;192.168.3.7&apos;</span>, redis.<span class="hljs-keyword">print</span>);
client.sadd(<span class="hljs-string">&apos;ip&apos;</span>, <span class="hljs-string">&apos;192.168.3.9&apos;</span>, redis.<span class="hljs-keyword">print</span>);
client.smembers(<span class="hljs-string">&apos;ip&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, members)</span> </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  console.log(members);
  client.quit();
});</code></pre><p>&#x8FD0;&#x884C;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeNVM?w=278&amp;h=98" src="https://static.alili.tech/img/bVbeNVM?w=278&amp;h=98" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader8">&#x4FE1;&#x9053;</h2><p>Redis&#x8D85;&#x8D8A;&#x4E86;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x7684;&#x4F20;&#x7EDF;&#x804C;&#x8D23;&#xFF0C;&#x5B83;&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4FE1;&#x9053;&#xFF0C;&#x4FE1;&#x9053;&#x662F;&#x6570;&#x636E;&#x4F20;&#x9012;&#x673A;&#x5236;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x53D1;&#x5E03;/&#x9884;&#x5B9A;&#x529F;&#x80FD;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var redis = require(&apos;redis&apos;)
var clientA = redis.createClient(6379, &apos;127.0.0.1&apos;)
var clientB = redis.createClient(6379, &apos;127.0.0.1&apos;)

clientA.on(&apos;message&apos;, function(channel, message) {
  console.log(&apos;Client A got message from channel %s: %s&apos;, channel, message);
});
clientA.on(&apos;subscribe&apos;, function(channel, count) {
  clientB.publish(&apos;main_chat_room&apos;, &apos;Hello world!&apos;);
});
clientA.subscribe(&apos;main_chat_room&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> redis = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;redis&apos;</span>)
<span class="hljs-keyword">var</span> clientA = redis.createClient(<span class="hljs-number">6379</span>, <span class="hljs-string">&apos;127.0.0.1&apos;</span>)
<span class="hljs-keyword">var</span> clientB = redis.createClient(<span class="hljs-number">6379</span>, <span class="hljs-string">&apos;127.0.0.1&apos;</span>)

clientA.on(<span class="hljs-string">&apos;message&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">channel, message</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Client A got message from channel %s: %s&apos;</span>, channel, message);
});
clientA.on(<span class="hljs-string">&apos;subscribe&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">channel, count</span>) </span>{
  clientB.publish(<span class="hljs-string">&apos;main_chat_room&apos;</span>, <span class="hljs-string">&apos;Hello world!&apos;</span>);
});
clientA.subscribe(<span class="hljs-string">&apos;main_chat_room&apos;</span>);</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;clientA&#x8BA2;&#x9605;&#x4E86;main_chat_room&#xFF0C;&#x8FD9;&#x65F6;clientA&#x6355;&#x83B7;&#x5230;&#x8BA2;&#x9605;&#x4E8B;&#x4EF6;&#xFF0C;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;clientB&#x5411;main_chat_room&#x53D1;&#x9001;&#x4E86;&#x4E00;&#x6761;&#x4FE1;&#x606F;Hello world!<br>clientA&#x63A5;&#x53D7;&#x5230;&#x4FE1;&#x606F;&#x540E;&#xFF0C;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x4E86;&#x76F8;&#x5173;&#x4FE1;&#x606F;&#x3002;<br>&#x8FD0;&#x884C;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeNXn?w=506&amp;h=26" src="https://static.alili.tech/img/bVbeNXn?w=506&amp;h=26" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader9">&#x5C0F;&#x7ED3;</h2><p>&#x672C;&#x7BC7;&#x53EA;&#x662F;&#x5BF9;Redis&#x8FDB;&#x884C;&#x4E86;&#x6700;&#x57FA;&#x672C;&#x4ECB;&#x7ECD;&#xFF0C;&#x60F3;&#x8981;&#x83B7;&#x5F97;&#x66F4;&#x591A;&#x4FE1;&#x606F;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF1A;<br><a href="https://redis.io/documentation" rel="nofollow noreferrer" target="_blank">redis documentation</a><br><a href="https://github.com/NodeRedis/node_redis" rel="nofollow noreferrer" target="_blank">node_redis</a><br><a href="https://book.douban.com/subject/26612779/" rel="nofollow noreferrer" target="_blank">Redis&#x5B9E;&#x6218;</a><br><a href="https://book.douban.com/subject/26971561/" rel="nofollow noreferrer" target="_blank">Redis&#x5F00;&#x53D1;&#x4E0E;&#x8FD0;&#x7EF4;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redis新手指南：在node中使用redis

## 原文链接
[https://segmentfault.com/a/1190000015882650](https://segmentfault.com/a/1190000015882650)


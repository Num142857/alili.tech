---
title: GraphQL 搭配 Koa 最佳入门实践
hidden: true
categories: [reprint]
slug: 10fc0af4
date: 2018-10-26 02:30:12
---

{{< raw >}}
<p>GraphQL&#x4E00;&#x79CD;&#x7528;&#x4E3A;&#x4F60; API &#x800C;&#x751F;&#x7684;&#x67E5;&#x8BE2;&#x8BED;&#x8A00;&#xFF0C;2018&#x5DF2;&#x7ECF;&#x5230;&#x6765;&#xFF0C;PWA&#x8FD8;&#x6CA1;&#x6709;&#x5927;&#x91CF;&#x6295;&#x5165;&#x751F;&#x4EA7;&#x5E94;&#x7528;&#x4E4B;&#x4E2D;&#x5C31;&#x5DF2;&#x7ECF;&#x706B;&#x8D77;&#x6765;&#x4E86;&#xFF0C;GraphQL&#x7684;&#x5E94;&#x7528;&#x6216;&#x8BB8;&#x4E5F;&#x4E0D;&#x4F1A;&#x592A;&#x8FDC;&#x4E86;&#x3002;&#x524D;&#x7AEF;&#x7684;&#x53D1;&#x5C55;&#x7684;&#x6700;&#x5927;&#x4E00;&#x4E2A;&#x7279;&#x70B9;&#x5C31;&#x662F;&#x53D8;&#x5316;&#x5FEB;&#xFF0C;&#x6709;&#x65F6;&#x5019;&#x5E94;&#x5BF9;&#x5404;&#x79CD;&#x9700;&#x6C42;&#x573A;&#x666F;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x4E0D;&#x5F97;&#x4E0D;&#x53BB;&#x5BF9;&#x63A5;&#x53E3;&#x5F00;&#x53D1;&#x5F88;&#x591A;&#x7248;&#x672C;&#x6216;&#x8005;&#x4FEE;&#x6539;&#x3002;&#x5404;&#x79CD;&#x4E1A;&#x52A1;&#x4F9D;&#x8D56;&#x5F3A;&#x5927;&#x7684;&#x57FA;&#x7840;&#x6570;&#x636E;&#x5E73;&#x53F0;&#x5FEB;&#x901F;&#x751F;&#x957F;&#xFF0C;&#x5982;&#x4F55;&#x9AD8;&#x6548;&#x5730;&#x4E3A;&#x5404;&#x79CD;&#x4E1A;&#x52A1;&#x63D0;&#x4F9B;&#x6570;&#x636E;&#x652F;&#x6301;&#xFF0C;&#x662F;&#x6240;&#x6709;&#x4EBA;&#x5173;&#x5FC3;&#x7684;&#x95EE;&#x9898;&#x3002;&#x800C;&#x4E14;&#x73B0;&#x5728;&#x524D;&#x7AEF;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x662F;&#x5C06;&#x89C6;&#x56FE;&#x7EC4;&#x4EF6;&#x5316;&#xFF0C;&#x5404;&#x4E2A;&#x4E1A;&#x52A1;&#x7EBF;&#x65E2;&#x53EF;&#x4EE5;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x4F7F;&#x7528;&#x8005;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x751F;&#x4EA7;&#x8005;&#xFF0C;&#x5982;&#x679C;&#x80FD;&#x591F;&#x5C06;&#x5176;&#x4E2D;&#x901A;&#x7528;&#x7684;&#x5185;&#x5BB9;&#x62BD;&#x53D6;&#x51FA;&#x6765;&#x63D0;&#x4F9B;&#x7ED9;&#x5404;&#x4E2A;&#x4E1A;&#x52A1;&#x65B9;&#x53CD;&#x590D;&#x4F7F;&#x7528;&#xFF0C;&#x5FC5;&#x7136;&#x80FD;&#x591F;&#x8282;&#x7701;&#x5B9D;&#x8D35;&#x7684;&#x5F00;&#x53D1;&#x65F6;&#x95F4;&#x548C;&#x5F00;&#x53D1;&#x4EBA;&#x529B;&#x3002;&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x524D;&#x7AEF;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x4E86;&#x8DE8;&#x4E1A;&#x52A1;&#x7684;&#x590D;&#x7528;&#xFF0C;&#x540E;&#x7AEF;&#x63A5;&#x53E3;&#x5982;&#x4F55;&#x76F8;&#x5E94;&#x5730;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x5462;&#xFF1F;GraphQL&#xFF0C;&#x5C31;&#x662F;&#x5E94;&#x5BF9;&#x590D;&#x6742;&#x573A;&#x666F;&#x7684;&#x4E00;&#x79CD;&#x65B0;&#x601D;&#x8DEF;&#x3002;</p><p>&#x5B98;&#x65B9;&#x89E3;&#x91CA;&#xFF1A;</p><blockquote>GraphQL &#x65E2;&#x662F;&#x4E00;&#x79CD;&#x7528;&#x4E8E; API &#x7684;&#x67E5;&#x8BE2;&#x8BED;&#x8A00;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x6EE1;&#x8DB3;&#x4F60;&#x6570;&#x636E;&#x67E5;&#x8BE2;&#x7684;&#x8FD0;&#x884C;&#x65F6;&#x3002; GraphQL &#x5BF9;&#x4F60;&#x7684; API &#x4E2D;&#x7684;&#x6570;&#x636E;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x5957;&#x6613;&#x4E8E;&#x7406;&#x89E3;&#x7684;&#x5B8C;&#x6574;&#x63CF;&#x8FF0;&#xFF0C;&#x4F7F;&#x5F97;&#x5BA2;&#x6237;&#x7AEF;&#x80FD;&#x591F;&#x51C6;&#x786E;&#x5730;&#x83B7;&#x5F97;&#x5B83;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x4E14;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5197;&#x4F59;&#xFF0C;&#x4E5F;&#x8BA9; API &#x66F4;&#x5BB9;&#x6613;&#x5730;&#x968F;&#x7740;&#x65F6;&#x95F4;&#x63A8;&#x79FB;&#x800C;&#x6F14;&#x8FDB;&#xFF0C;&#x8FD8;&#x80FD;&#x7528;&#x4E8E;&#x6784;&#x5EFA;&#x5F3A;&#x5927;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x3002;</blockquote><p>&#x4E0B;&#x9762;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;GraphQL&#x7684;&#x6709;&#x54EA;&#x4E9B;&#x597D;&#x5904;&#xFF1A;</p><ul><li>&#x8BF7;&#x6C42;&#x4F60;&#x6240;&#x8981;&#x7684;&#x6570;&#x636E;&#x4E0D;&#x591A;&#x4E0D;&#x5C11;</li><li>&#x83B7;&#x53D6;&#x591A;&#x4E2A;&#x8D44;&#x6E90;&#x53EA;&#x7528;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;</li><li>&#x81EA;&#x5B9A;&#x4E49;&#x63A5;&#x53E3;&#x6570;&#x636E;&#x7684;&#x5B57;&#x6BB5;</li><li>&#x5F3A;&#x5927;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;</li><li>API &#x6F14;&#x8FDB;&#x65E0;&#x9700;&#x5212;&#x5206;&#x7248;&#x672C;</li></ul><p>&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x5C06;&#x642D;&#x914D;koa&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;GraphQL&#x67E5;&#x8BE2;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x9010;&#x6B65;&#x4ECE;&#x7B80;&#x5355;kao&#x670D;&#x52A1;&#x5230;mongodb&#x7684;&#x6570;&#x636E;&#x63D2;&#x5165;&#x67E5;&#x8BE2;&#x518D;&#x5230;GraphQL&#x7684;&#x4F7F;&#x7528;&#xFF0C;<br>&#x8BA9;&#x5927;&#x5BB6;&#x5FEB;&#x901F;&#x770B;&#x5230;&#xFF1A;</p><ul><li>&#x642D;&#x5EFA;koa&#x642D;&#x5EFA;&#x4E00;&#x4E2A;&#x540E;&#x53F0;&#x9879;&#x76EE;</li><li>&#x540E;&#x53F0;&#x8DEF;&#x7531;&#x7B80;&#x5355;&#x5904;&#x7406;&#x65B9;&#x5F0F;</li><li>&#x5229;&#x7528;mongoose&#x7B80;&#x5355;&#x64CD;&#x4F5C;mongodb</li><li>&#x638C;&#x63E1;GraphQL&#x7684;&#x5165;&#x95E8;&#x59FF;&#x52BF;</li></ul><p>&#x9879;&#x76EE;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;</p><p>1&#x3001;&#x642D;&#x5EFA;GraphQL&#x5DE5;&#x5177;&#x67E5;&#x8BE2;&#x754C;&#x9762;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720322?w=1173&amp;h=855" src="https://static.alili.tech/img/remote/1460000012720322?w=1173&amp;h=855" alt="" title="" style="cursor:pointer"></span></p><p>2&#x3001;&#x524D;&#x7AEF;&#x7528;jq&#x53D1;&#x9001;ajax&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720323?w=962&amp;h=716" src="https://static.alili.tech/img/remote/1460000012720323?w=962&amp;h=716" alt="" title="" style="cursor:pointer"></span></p><p>&#x5165;&#x95E8;&#x9879;&#x76EE;&#x6211;&#x4EEC;&#x90FD;&#x5DF2;&#x7ECF;&#x662F;&#x9884;&#x89C8;&#x8FC7;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x52A8;&#x624B;&#x5F00;&#x53D1;&#x5427;&#xFF01;&#xFF01;&#xFF01;</p><h3 id="articleHeader0">lets do it</h3><p>&#x9996;&#x5148;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x5939;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>server.js</code>(node&#x670D;&#x52A1;)&#x3001;<code>config&#x6587;&#x4EF6;&#x5939;</code>&#x3001;<code>mongodb&#x6587;&#x4EF6;&#x5939;</code>&#x3001;<code>router&#x6587;&#x4EF6;&#x5939;</code>&#x3001;<code>controllers&#x6587;&#x4EF6;&#x5939;</code>&#x4EE5;&#x53CA;<code>public&#x6587;&#x4EF6;&#x5939;</code>(&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x653E;&#x524D;&#x7AEF;&#x9759;&#x6001;&#x6570;&#x636E;&#x5C55;&#x793A;&#x9875;&#x9762;)&#xFF0C;&#x597D;&#x5566;&#xFF0C;&#x9879;&#x76EE;&#x7684;&#x7ED3;&#x6784;&#x6211;&#x4EEC;&#x90FD;&#x5DF2;&#x7ECF;&#x5EFA;&#x7ACB;&#x597D;&#xFF0C;&#x4E0B;&#x9762;&#x5728;<code>server.js</code>&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x5199;&#x4E0A;</p><blockquote>server.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F15;&#x5165;&#x6A21;&#x5757;
import Koa from &apos;koa&apos;
import KoaStatic from &apos;koa-static&apos;
import Router from &apos;koa-router&apos;
import bodyParser from &apos;koa-bodyparser&apos;


const app = new Koa()
const router = new Router();

// &#x4F7F;&#x7528; bodyParser &#x548C; KoaStatic &#x4E2D;&#x95F4;&#x4EF6;
app.use(bodyParser());
app.use(KoaStatic(__dirname + &apos;/public&apos;));

// &#x8DEF;&#x7531;&#x8BBE;&#x7F6E;test
router.get(&apos;/test&apos;, (ctx, next) =&gt; {
  ctx.body=&quot;test page&quot;
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000);

console.log(&apos;graphQL server listen port: &apos; + 4000)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// &#x5F15;&#x5165;&#x6A21;&#x5757;</span>
<span class="hljs-keyword">import</span> Koa <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa&apos;</span>
<span class="hljs-keyword">import</span> KoaStatic <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-static&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-router&apos;</span>
<span class="hljs-keyword">import</span> bodyParser <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-bodyparser&apos;</span>


<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router();

<span class="hljs-comment">// &#x4F7F;&#x7528; bodyParser &#x548C; KoaStatic &#x4E2D;&#x95F4;&#x4EF6;</span>
app.use(bodyParser());
app.use(KoaStatic(__dirname + <span class="hljs-string">&apos;/public&apos;</span>));

<span class="hljs-comment">// &#x8DEF;&#x7531;&#x8BBE;&#x7F6E;test</span>
router.get(<span class="hljs-string">&apos;/test&apos;</span>, <span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  ctx.body=<span class="hljs-string">&quot;test page&quot;</span>
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(<span class="hljs-number">4000</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;graphQL server listen port: &apos;</span> + <span class="hljs-number">4000</span>)</code></pre><p>&#x5728;&#x547D;&#x4EE4;&#x884C;<code>npm install koa koa-static koa-router koa-bodyparser --save</code></p><p>&#x5B89;&#x88C5;&#x597D;&#x4E0A;&#x9762;&#x51E0;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;</p><p>&#x7136;&#x540E;&#x8FD0;&#x884C;<code>node server.js</code>&#xFF0C;&#x4E0D;&#x51FA;&#x4EC0;&#x4E48;&#x610F;&#x5916;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x62A5;&#x5982;&#x4E0B;&#x56FE;&#x7684;&#x4E00;&#x4E2A;error</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720324?w=1386&amp;h=472" src="https://static.alili.tech/img/remote/1460000012720324?w=1386&amp;h=472" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x539F;&#x56E0;&#x662F;&#x73B0;&#x5728;&#x7684;node&#x7248;&#x672C;&#x5E76;&#x6CA1;&#x6709;&#x652F;&#x6301;es6&#x7684;&#x6A21;&#x5757;&#x5F15;&#x5165;&#x65B9;&#x5F0F;&#x3002;</p><p>&#x653E;&#x5FC3; &#x6211;&#x4EEC;&#x7528;&#x795E;&#x5668;<code>babel-polyfill</code>&#x8F6C;&#x8BD1;&#x4E00;&#x4E0B;&#x5C31;&#x9614;&#x4EE5;&#x4E86;&#x3002;&#x8BE6;&#x7EC6;&#x7684;&#x8BF7;&#x770B;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;<a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;</a></p><p>&#x4E0B;&#x9762;&#x5728;&#x9879;&#x76EE;&#x6587;&#x4EF6;&#x5939;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>start.js</code>&#xFF0C;&#x7136;&#x540E;&#x5728;&#x91CC;&#x9762;&#x5199;&#x4E0A;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><blockquote>start.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&apos;babel-core/register&apos;)({
  &apos;presets&apos;: [
    &apos;stage-3&apos;,
    [&quot;latest-node&quot;, { &quot;target&quot;: &quot;current&quot; }]
  ]
})

require(&apos;babel-polyfill&apos;)
require(&apos;./server&apos;)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">&apos;babel-core/register&apos;</span>)</span><span class="hljs-params">({
  <span class="hljs-string">&apos;presets&apos;</span>: [
    <span class="hljs-string">&apos;stage-3&apos;</span>,
    [<span class="hljs-string">&quot;latest-node&quot;</span>, { <span class="hljs-string">&quot;target&quot;</span>: <span class="hljs-string">&quot;current&quot;</span> }]
  ]
})</span></span>

<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">&apos;babel-polyfill&apos;</span>)</span></span>
<span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">&apos;./server&apos;</span>)</span></span>
</code></pre><p>&#x7136;&#x540E; &#x5728;&#x547D;&#x4EE4;&#x884C;&#xFF0C;&#x8FD0;&#x884C;<code>npm install babel-core babel-polyfill babel-preset-latest-node babel-preset-stage-3 --save-dev</code>&#x5B89;&#x88C5;&#x51E0;&#x4E2A;&#x5F00;&#x53D1;&#x6A21;&#x5757;&#x3002;</p><p>&#x5B89;&#x88C5;&#x5B8C;&#x6BD5;&#x4E4B;&#x540E;&#xFF0C;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x8FD0;&#x884C; <code>node start.js</code>&#xFF0C;&#x4E4B;&#x540E;&#x4F60;&#x7684;node&#x670D;&#x52A1;&#x5B89;&#x9759;&#x7684;&#x8FD0;&#x884C;&#x8D77;&#x6765;&#x4E86;&#x3002;&#x7528;<a href="https://www.npmjs.com/package/koa-router" rel="nofollow noreferrer" target="_blank">koa-router</a>&#x4E2D;&#x95F4;&#x4EF6;&#x505A;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x8DEF;&#x7531;&#x6A21;&#x5757;&#x7684;&#x7BA1;&#x7406;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x5199;&#x5230;<code>router&#x6587;&#x4EF6;&#x5939;</code>&#x4E2D;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x3002;</p><p>&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x8F93;&#x5165;<code>localhost:4000/test</code>&#xFF0C;&#x4F60;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;node&#x670D;&#x52A1;&#x4F1A;&#x8FD4;&#x56DE;<code>test page</code>&#x6587;&#x5B57;&#x3002;&#x5982;&#x4E0B;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720325?w=1110&amp;h=402" src="https://static.alili.tech/img/remote/1460000012720325?w=1110&amp;h=402" alt="" title="" style="cursor:pointer"></span></p><p>yeah~~kao&#x670D;&#x52A1;&#x5668;&#x57FA;&#x672C;&#x642D;&#x5EFA;&#x597D;&#x4E4B;&#x540E;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x662F;&#xFF0C;&#x94FE;&#x63A5;<code>mongodb</code>&#x7136;&#x540E;&#x628A;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x5230;<code>mongodb</code>&#x6570;&#x636E;&#x5E93;&#x91CC;&#x9762;&#x5566;&#x3002;</p><h3 id="articleHeader1">&#x5B9E;&#x73B0;mongodb&#x7684;&#x57FA;&#x672C;&#x6570;&#x636E;&#x6A21;&#x578B;</h3><p>tip&#xFF1A;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9700;&#x8981;<code>mongodb</code>&#x5B58;&#x50A8;&#x6570;&#x636E;&#x4EE5;&#x53CA;&#x5229;&#x7528;<code>mongoose</code>&#x6A21;&#x5757;&#x64CD;&#x4F5C;<code>mongodb</code>&#x6570;&#x636E;&#x5E93;</p><ul><li>&#x5728;<code>mongodb&#x6587;&#x4EF6;&#x5939;</code>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>index.js</code>&#x548C; <code>schema&#x6587;&#x4EF6;&#x5939;</code>&#xFF0C; &#x5728; <code>schema&#x6587;&#x4EF6;&#x5939;</code>&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x9762;&#x65B0;&#x5EFA;<code>info.js</code>&#x548C;<code>student.js</code>&#x3002;</li><li>&#x5728;<code>config&#x6587;&#x4EF6;&#x5939;</code>&#x4E0B;&#x9762;&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;<code>index.js</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x662F;&#x653E;&#x4E00;&#x4E0B;&#x914D;&#x7F6E;&#x4EE3;&#x7801;&#x3002;</li></ul><p>&#x53C8;&#x4E00;&#x6CE2;&#x6587;&#x4EF6;&#x5EFA;&#x7ACB;&#x597D;&#x4E4B;&#x540E;&#xFF0C;&#x5148;&#x5728;<code>config/index.js</code>&#x4E0B;&#x5199;&#x4E0A;&#x94FE;&#x63A5;&#x6570;&#x636E;&#x5E93;&#x914D;&#x7F6E;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><blockquote>config/index.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  dbPath: &apos;mongodb://localhost/graphql&apos;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
  <span class="hljs-attribute">dbPath</span>: <span class="hljs-string">&apos;mongodb://localhost/graphql&apos;</span>
}
</code></pre><p>&#x7136;&#x540E;&#x5728;<code>mongodb/index.js</code>&#x4E0B;&#x5199;&#x4E0A;&#x94FE;&#x63A5;&#x6570;&#x636E;&#x5E93;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><blockquote>mongodb/index.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F15;&#x5165;mongoose&#x6A21;&#x5757;
import mongoose from &apos;mongoose&apos;
import config from &apos;../config&apos;

// &#x540C;&#x6B65;&#x5F15;&#x5165; info model&#x548C; studen model
require(&apos;./schema/info&apos;)
require(&apos;./schema/student&apos;)

// &#x94FE;&#x63A5;mongodb
export const database = () =&gt; {
  mongoose.set(&apos;debug&apos;, true)

  mongoose.connect(config.dbPath)

  mongoose.connection.on(&apos;disconnected&apos;, () =&gt; {
    mongoose.connect(config.dbPath)
  })
  mongoose.connection.on(&apos;error&apos;, err =&gt; {
    console.error(err)
  })

  mongoose.connection.on(&apos;open&apos;, async () =&gt; {
    console.log(&apos;Connected to MongoDB &apos;, config.dbPath)
  })
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// &#x5F15;&#x5165;mongoose&#x6A21;&#x5757;</span>
<span class="hljs-keyword">import</span> mongoose <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mongoose&apos;</span>
<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../config&apos;</span>

<span class="hljs-comment">// &#x540C;&#x6B65;&#x5F15;&#x5165; info model&#x548C; studen model</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./schema/info&apos;</span>)
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./schema/student&apos;</span>)

<span class="hljs-comment">// &#x94FE;&#x63A5;mongodb</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> database = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  mongoose.set(<span class="hljs-string">&apos;debug&apos;</span>, <span class="hljs-literal">true</span>)

  mongoose.connect(config.dbPath)

  mongoose.connection.on(<span class="hljs-string">&apos;disconnected&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    mongoose.connect(config.dbPath)
  })
  mongoose.connection.on(<span class="hljs-string">&apos;error&apos;</span>, <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.error(err)
  })

  mongoose.connection.on(<span class="hljs-string">&apos;open&apos;</span>, <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Connected to MongoDB &apos;</span>, config.dbPath)
  })
}
</code></pre><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x6211;&#x4EEC;&#x4EE3;&#x7801;&#x8FD8;&#x52A0;&#x8F7D;&#x4E86;<code>info.js</code>&#x548C; <code>studen.js</code>&#x8FD9;&#x4E24;&#x4E2A;&#x5206;&#x522B;&#x662F;&#x5B66;&#x751F;&#x7684;&#x9644;&#x52A0;&#x4FE1;&#x606F;&#x548C;&#x57FA;&#x672C;&#x4FE1;&#x606F;&#x7684;&#x6570;&#x636E;&#x6A21;&#x578B;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x5206;&#x6210;&#x4E24;&#x4E2A;&#x4FE1;&#x606F;&#x8868;&#xFF1F;&#x539F;&#x56E0;&#x662F;&#x987A;&#x4FBF;&#x7ED9;&#x5927;&#x5BB6;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x8054;&#x8868;&#x67E5;&#x8BE2;&#x7684;&#x57FA;&#x672C;&#x65B9;&#x6CD5;&#xFF08;&#x563F;&#x563F;~~~&#xFF09;</p><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5206;&#x522B;&#x5B8C;&#x6210;&#x8FD9;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x6A21;&#x578B;</p><blockquote>mongodb/schema/info.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5F15;&#x5165;mongoose
import mongoose from &apos;mongoose&apos;

// 
const Schema = mongoose.Schema

// &#x5B9E;&#x4F8B;InfoSchema
const InfoSchema = new Schema({
  hobby: [String],
  height: String,
  weight: Number,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
// &#x5728;&#x4FDD;&#x5B58;&#x6570;&#x636E;&#x4E4B;&#x524D;&#x8DDF;&#x65B0;&#x65E5;&#x671F;
InfoSchema.pre(&apos;save&apos;, function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})
// &#x5EFA;&#x7ACB;Info&#x6570;&#x636E;&#x6A21;&#x578B;
mongoose.model(&apos;Info&apos;, InfoSchema)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// &#x5F15;&#x5165;mongoose</span>
<span class="hljs-keyword">import</span> mongoose <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mongoose&apos;</span>

<span class="hljs-comment">// </span>
<span class="hljs-keyword">const</span> Schema = mongoose.Schema

<span class="hljs-comment">// &#x5B9E;&#x4F8B;InfoSchema</span>
<span class="hljs-keyword">const</span> InfoSchema = <span class="hljs-keyword">new</span> Schema({
  hobby: [<span class="hljs-built_in">String</span>],
  height: <span class="hljs-built_in">String</span>,
  weight: <span class="hljs-built_in">Number</span>,
  meta: {
    createdAt: {
      <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Date</span>,
      <span class="hljs-keyword">default</span>: <span class="hljs-built_in">Date</span>.now()
    },
    updatedAt: {
      <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Date</span>,
      <span class="hljs-keyword">default</span>: <span class="hljs-built_in">Date</span>.now()
    }
  }
})
<span class="hljs-comment">// &#x5728;&#x4FDD;&#x5B58;&#x6570;&#x636E;&#x4E4B;&#x524D;&#x8DDF;&#x65B0;&#x65E5;&#x671F;</span>
InfoSchema.pre(<span class="hljs-string">&apos;save&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">next</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isNew) {
    <span class="hljs-keyword">this</span>.meta.createdAt = <span class="hljs-keyword">this</span>.meta.updatedAt = <span class="hljs-built_in">Date</span>.now()
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.meta.updatedAt = <span class="hljs-built_in">Date</span>.now()
  }

  next()
})
<span class="hljs-comment">// &#x5EFA;&#x7ACB;Info&#x6570;&#x636E;&#x6A21;&#x578B;</span>
mongoose.model(<span class="hljs-string">&apos;Info&apos;</span>, InfoSchema)</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5C31;&#x662F;&#x5229;&#x7528;<code>mongoose</code>&#x5B9E;&#x73B0;&#x4E86;&#x5B66;&#x751F;&#x7684;&#x9644;&#x52A0;&#x4FE1;&#x606F;&#x7684;&#x6570;&#x636E;&#x6A21;&#x578B;&#xFF0C;&#x7528;&#x540C;&#x6837;&#x7684;&#x65B9;&#x6CD5;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;student&#x6570;&#x636E;&#x6A21;&#x578B;</p><blockquote>mongodb/schema/student.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import mongoose from &apos;mongoose&apos;

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId


const StudentSchema = new Schema({
  name: String,
  sex: String,
  age: Number,
  info: {
    type: ObjectId,
    ref: &apos;Info&apos;
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

StudentSchema.pre(&apos;save&apos;, function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }

  next()
})

mongoose.model(&apos;Student&apos;, StudentSchema)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> mongoose <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mongoose&apos;</span>

<span class="hljs-keyword">const</span> Schema = mongoose.Schema
<span class="hljs-keyword">const</span> ObjectId = Schema.Types.ObjectId


<span class="hljs-keyword">const</span> StudentSchema = <span class="hljs-keyword">new</span> Schema({
  name: <span class="hljs-built_in">String</span>,
  sex: <span class="hljs-built_in">String</span>,
  age: <span class="hljs-built_in">Number</span>,
  info: {
    <span class="hljs-keyword">type</span>: ObjectId,
    ref: <span class="hljs-string">&apos;Info&apos;</span>
  },
  meta: {
    createdAt: {
      <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Date</span>,
      <span class="hljs-keyword">default</span>: <span class="hljs-built_in">Date</span>.now()
    },
    updatedAt: {
      <span class="hljs-keyword">type</span>: <span class="hljs-built_in">Date</span>,
      <span class="hljs-keyword">default</span>: <span class="hljs-built_in">Date</span>.now()
    }
  }
})

StudentSchema.pre(<span class="hljs-string">&apos;save&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">next</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isNew) {
    <span class="hljs-keyword">this</span>.meta.createdAt = <span class="hljs-keyword">this</span>.meta.updatedAt = <span class="hljs-built_in">Date</span>.now()
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.meta.updatedAt = <span class="hljs-built_in">Date</span>.now()
  }

  next()
})

mongoose.model(<span class="hljs-string">&apos;Student&apos;</span>, StudentSchema)</code></pre><h3 id="articleHeader2">&#x5B9E;&#x73B0;&#x4FDD;&#x5B58;&#x6570;&#x636E;&#x7684;&#x63A7;&#x5236;&#x5668;</h3><p>&#x6570;&#x636E;&#x6A21;&#x578B;&#x90FD;&#x94FE;&#x63A5;&#x597D;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x5B58;&#x50A8;&#x6570;&#x636E;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E9B;&#x65B9;&#x6CD5;&#x90FD;&#x5199;&#x5728;&#x63A7;&#x5236;&#x5668;&#x91CC;&#x9762;&#x3002;&#x7136;&#x540E;&#x5728;controler&#x91CC;&#x9762;&#x65B0;&#x5EFA;<code>info.js</code>&#x548C;<code>student.js</code>&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5206;&#x522B;&#x5BF9;&#x8C61;&#xFF0C;&#x64CD;&#x4F5C;info&#x548C;student&#x6570;&#x636E;&#x7684;&#x63A7;&#x5236;&#x5668;&#xFF0C;&#x5206;&#x5F00;&#x5199;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x6A21;&#x5757;&#x5316;&#x7BA1;&#x7406;&#x3002;</p><ul><li>&#x5B9E;&#x73B0;info&#x6570;&#x636E;&#x4FE1;&#x606F;&#x7684;&#x4FDD;&#x5B58;&#xFF0C;&#x987A;&#x4FBF;&#x628A;&#x67E5;&#x8BE2;&#x4E5F;&#x5148;&#x5199;&#x4E0A;&#x53BB;&#xFF0C;&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;</li></ul><blockquote>controlers/info.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import mongoose from &apos;mongoose&apos;
const Info = mongoose.model(&apos;Info&apos;)

// &#x4FDD;&#x5B58;info&#x4FE1;&#x606F;
export const saveInfo = async (ctx, next) =&gt; {
  // &#x83B7;&#x53D6;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;
  const opts = ctx.request.body
  
  const info = new Info(opts)
  const saveInfo = await info.save() // &#x4FDD;&#x5B58;&#x6570;&#x636E;
  console.log(saveInfo)
  // &#x7B80;&#x5355;&#x5224;&#x65AD;&#x4E00;&#x4E0B; &#x662F;&#x5426;&#x4FDD;&#x5B58;&#x6210;&#x529F;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x7ED9;&#x524D;&#x7AEF;
  if (saveInfo) {
    ctx.body = {
      success: true,
      info: saveInfo
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// &#x83B7;&#x53D6;&#x6240;&#x6709;&#x7684;info&#x6570;&#x636E;
export const fetchInfo = async (ctx, next) =&gt; {
  const infos = await Info.find({}) // &#x6570;&#x636E;&#x67E5;&#x8BE2;

  if (infos.length) {
    ctx.body = {
      success: true,
      info: infos
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">import</span> mongoose from <span class="hljs-string">&apos;mongoose&apos;</span>
<span class="hljs-keyword">const</span> Info = mongoose.model(<span class="hljs-string">&apos;Info&apos;</span>)

<span class="hljs-comment">// &#x4FDD;&#x5B58;info&#x4FE1;&#x606F;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> saveInfo = <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">const</span> opts = ctx.request.body
  
  <span class="hljs-keyword">const</span> info = <span class="hljs-keyword">new</span> Info(opts)
  <span class="hljs-keyword">const</span> saveInfo = <span class="hljs-keyword">await</span> info.save() <span class="hljs-comment">// &#x4FDD;&#x5B58;&#x6570;&#x636E;</span>
  console.log(saveInfo)
  <span class="hljs-comment">// &#x7B80;&#x5355;&#x5224;&#x65AD;&#x4E00;&#x4E0B; &#x662F;&#x5426;&#x4FDD;&#x5B58;&#x6210;&#x529F;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x7ED9;&#x524D;&#x7AEF;</span>
  <span class="hljs-keyword">if</span> (saveInfo) {
    ctx.body = {
      success: <span class="hljs-keyword">true</span>,
      info: saveInfo
    }
  } <span class="hljs-keyword">else</span> {
    ctx.body = {
      success: <span class="hljs-keyword">false</span>
    }
  }
}

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x6240;&#x6709;&#x7684;info&#x6570;&#x636E;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchInfo = <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">const</span> infos = <span class="hljs-keyword">await</span> Info.find({}) <span class="hljs-comment">// &#x6570;&#x636E;&#x67E5;&#x8BE2;</span>

  <span class="hljs-keyword">if</span> (infos.length) {
    ctx.body = {
      success: <span class="hljs-keyword">true</span>,
      info: infos
    }
  } <span class="hljs-keyword">else</span> {
    ctx.body = {
      success: <span class="hljs-keyword">false</span>
    }
  }
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x662F;&#x524D;&#x7AEF;&#x7528;post&#xFF08;&#x8DEF;&#x7531;&#x4E0B;&#x9762;&#x4E00;&#x4F1A;&#x5728;&#x5199;&#xFF09;&#x8BF7;&#x6C42;&#x8FC7;&#x6765;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x4FDD;&#x5B58;&#x5230;mongodb&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x5728;&#x8FD4;&#x56DE;&#x7ED9;&#x524D;&#x7AEF;&#x4FDD;&#x5B58;&#x6210;&#x529F;&#x4E0E;&#x5426;&#x7684;&#x72B6;&#x6001;&#x3002;&#x4E5F;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x83B7;&#x53D6;&#x5168;&#x90E8;&#x9644;&#x52A0;&#x4FE1;&#x606F;&#x7684;&#x7684;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x7528;&#x540C;&#x6837;&#x7684;&#x9053;&#x7406;&#x5B9E;&#x73B0;studen&#x6570;&#x636E;&#x7684;&#x4FDD;&#x5B58;&#x4EE5;&#x53CA;&#x83B7;&#x53D6;&#x3002;</p><ul><li>&#x5B9E;&#x73B0;studen&#x6570;&#x636E;&#x7684;&#x4FDD;&#x5B58;&#x4EE5;&#x53CA;&#x83B7;&#x53D6;</li></ul><blockquote>controllers/sdudent.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import mongoose from &apos;mongoose&apos;
const Student = mongoose.model(&apos;Student&apos;)

// &#x4FDD;&#x5B58;&#x5B66;&#x751F;&#x6570;&#x636E;&#x7684;&#x65B9;&#x6CD5;
export const saveStudent = async (ctx, next) =&gt; {
  // &#x83B7;&#x53D6;&#x524D;&#x7AEF;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;
  const opts = ctx.request.body
  
  const student = new Student(opts)
  const saveStudent = await student.save() // &#x4FDD;&#x5B58;&#x6570;&#x636E;

  if (saveStudent) {
    ctx.body = {
      success: true,
      student: saveStudent
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// &#x67E5;&#x8BE2;&#x6240;&#x6709;&#x5B66;&#x751F;&#x7684;&#x6570;&#x636E;
export const fetchStudent = async (ctx, next) =&gt; {
  const students = await Student.find({})

  if (students.length) {
    ctx.body = {
      success: true,
      student: students
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}

// &#x67E5;&#x8BE2;&#x5B66;&#x751F;&#x7684;&#x6570;&#x636E;&#x4EE5;&#x53CA;&#x9644;&#x52A0;&#x6570;&#x636E;
export const fetchStudentDetail = async (ctx, next) =&gt; {

  // &#x5229;&#x7528;populate&#x6765;&#x67E5;&#x8BE2;&#x5173;&#x8054;info&#x7684;&#x6570;&#x636E;
  const students = await Student.find({}).populate({
    path: &apos;info&apos;,
    select: &apos;hobby height weight&apos;
  }).exec()

  if (students.length) {
    ctx.body = {
      success: true,
      student: students
    }
  } else {
    ctx.body = {
      success: false
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code><span class="hljs-keyword">import</span> mongoose from <span class="hljs-string">&apos;mongoose&apos;</span>
<span class="hljs-keyword">const</span> Student = mongoose.model(<span class="hljs-string">&apos;Student&apos;</span>)

<span class="hljs-comment">// &#x4FDD;&#x5B58;&#x5B66;&#x751F;&#x6570;&#x636E;&#x7684;&#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> saveStudent = <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x524D;&#x7AEF;&#x8BF7;&#x6C42;&#x7684;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">const</span> opts = ctx.request.body
  
  <span class="hljs-keyword">const</span> student = <span class="hljs-keyword">new</span> Student(opts)
  <span class="hljs-keyword">const</span> saveStudent = <span class="hljs-keyword">await</span> student.save() <span class="hljs-comment">// &#x4FDD;&#x5B58;&#x6570;&#x636E;</span>

  <span class="hljs-keyword">if</span> (saveStudent) {
    ctx.body = {
      success: <span class="hljs-keyword">true</span>,
      student: saveStudent
    }
  } <span class="hljs-keyword">else</span> {
    ctx.body = {
      success: <span class="hljs-keyword">false</span>
    }
  }
}

<span class="hljs-comment">// &#x67E5;&#x8BE2;&#x6240;&#x6709;&#x5B66;&#x751F;&#x7684;&#x6570;&#x636E;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchStudent = <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-keyword">const</span> students = <span class="hljs-keyword">await</span> Student.find({})

  <span class="hljs-keyword">if</span> (students.length) {
    ctx.body = {
      success: <span class="hljs-keyword">true</span>,
      student: students
    }
  } <span class="hljs-keyword">else</span> {
    ctx.body = {
      success: <span class="hljs-keyword">false</span>
    }
  }
}

<span class="hljs-comment">// &#x67E5;&#x8BE2;&#x5B66;&#x751F;&#x7684;&#x6570;&#x636E;&#x4EE5;&#x53CA;&#x9644;&#x52A0;&#x6570;&#x636E;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> fetchStudentDetail = <span class="hljs-keyword">async</span> (ctx, next) =&gt; {

  <span class="hljs-comment">// &#x5229;&#x7528;populate&#x6765;&#x67E5;&#x8BE2;&#x5173;&#x8054;info&#x7684;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">const</span> students = <span class="hljs-keyword">await</span> Student.find({}).populate({
    path: <span class="hljs-string">&apos;info&apos;</span>,
    select: <span class="hljs-string">&apos;hobby height weight&apos;</span>
  }).exec()

  <span class="hljs-keyword">if</span> (students.length) {
    ctx.body = {
      success: <span class="hljs-keyword">true</span>,
      student: students
    }
  } <span class="hljs-keyword">else</span> {
    ctx.body = {
      success: <span class="hljs-keyword">false</span>
    }
  }
}</code></pre><h3 id="articleHeader3">&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#xFF0C;&#x7ED9;&#x524D;&#x7AEF;&#x63D0;&#x4F9B;API&#x63A5;&#x53E3;</h3><p>&#x6570;&#x636E;&#x6A21;&#x578B;&#x548C;&#x63A7;&#x5236;&#x5668;&#x5728;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x90FD;&#x5DF2;&#x7ECF;&#x662F;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x5229;&#x7528;<code>koa-router</code>&#x8DEF;&#x7531;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x6765;&#x5B9E;&#x73B0;&#x8BF7;&#x6C42;&#x7684;&#x63A5;&#x53E3;&#x3002;&#x6211;&#x4EEC;&#x56DE;&#x5230;<code>server.js</code>&#xFF0C;&#x5728;&#x4E0A;&#x9762;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x3002;&#x5982;&#x4E0B;</p><blockquote>server.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Koa from &apos;koa&apos;
import KoaStatic from &apos;koa-static&apos;
import Router from &apos;koa-router&apos;
import bodyParser from &apos;koa-bodyparser&apos;

import {database} from &apos;./mongodb&apos; // &#x5F15;&#x5165;mongodb
import {saveInfo, fetchInfo} from &apos;./controllers/info&apos; // &#x5F15;&#x5165;info controller
import {saveStudent, fetchStudent, fetchStudentDetail} from &apos;./controllers/student&apos; // &#x5F15;&#x5165; student controller

database() // &#x94FE;&#x63A5;&#x6570;&#x636E;&#x5E93;&#x5E76;&#x4E14;&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x6A21;&#x578B;

const app = new Koa()
const router = new Router();

app.use(bodyParser());
app.use(KoaStatic(__dirname + &apos;/public&apos;));

router.get(&apos;/test&apos;, (ctx, next) =&gt; {
  ctx.body=&quot;test page&quot;
});

// &#x8BBE;&#x7F6E;&#x6BCF;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;&#x76F8;&#x5BF9;&#x7684;&#x63A7;&#x5236;&#x5668;
router.post(&apos;/saveinfo&apos;, saveInfo)
router.get(&apos;/info&apos;, fetchInfo)

router.post(&apos;/savestudent&apos;, saveStudent)
router.get(&apos;/student&apos;, fetchStudent)
router.get(&apos;/studentDetail&apos;, fetchStudentDetail)

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000);

console.log(&apos;graphQL server listen port: &apos; + 4000)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> Koa <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa&apos;</span>
<span class="hljs-keyword">import</span> KoaStatic <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-static&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-router&apos;</span>
<span class="hljs-keyword">import</span> bodyParser <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-bodyparser&apos;</span>

<span class="hljs-keyword">import</span> {database} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./mongodb&apos;</span> <span class="hljs-comment">// &#x5F15;&#x5165;mongodb</span>
<span class="hljs-keyword">import</span> {saveInfo, fetchInfo} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./controllers/info&apos;</span> <span class="hljs-comment">// &#x5F15;&#x5165;info controller</span>
<span class="hljs-keyword">import</span> {saveStudent, fetchStudent, fetchStudentDetail} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./controllers/student&apos;</span> <span class="hljs-comment">// &#x5F15;&#x5165; student controller</span>

database() <span class="hljs-comment">// &#x94FE;&#x63A5;&#x6570;&#x636E;&#x5E93;&#x5E76;&#x4E14;&#x521D;&#x59CB;&#x5316;&#x6570;&#x636E;&#x6A21;&#x578B;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router();

app.use(bodyParser());
app.use(KoaStatic(__dirname + <span class="hljs-string">&apos;/public&apos;</span>));

router.get(<span class="hljs-string">&apos;/test&apos;</span>, <span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  ctx.body=<span class="hljs-string">&quot;test page&quot;</span>
});

<span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x6BCF;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;&#x76F8;&#x5BF9;&#x7684;&#x63A7;&#x5236;&#x5668;</span>
router.post(<span class="hljs-string">&apos;/saveinfo&apos;</span>, saveInfo)
router.get(<span class="hljs-string">&apos;/info&apos;</span>, fetchInfo)

router.post(<span class="hljs-string">&apos;/savestudent&apos;</span>, saveStudent)
router.get(<span class="hljs-string">&apos;/student&apos;</span>, fetchStudent)
router.get(<span class="hljs-string">&apos;/studentDetail&apos;</span>, fetchStudentDetail)

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(<span class="hljs-number">4000</span>);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;graphQL server listen port: &apos;</span> + <span class="hljs-number">4000</span>)</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x662F;&#x505A;&#x4E86;&#xFF0C;&#x5F15;&#x5165;mongodb&#x8BBE;&#x7F6E;&#xFF0C;info&#x4EE5;&#x53CA;student&#x63A7;&#x5236;&#x5668;&#xFF0C;&#x7136;&#x540E;&#x94FE;&#x63A5;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x5E76;&#x4E14;&#x8BBE;&#x7F6E;&#x6BCF;&#x4E00;&#x4E2A;&#x8BBE;&#x7F6E;&#x6BCF;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x7684;&#x7684;&#x63A7;&#x5236;&#x5668;&#x3002;</p><p>&#x5B89;&#x88C5;&#x4E00;&#x4E0B;mongoose&#x6A21;&#x5757; <code>npm install mongoose --save</code></p><p>&#x7136;&#x540E;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x8FD0;&#x884C;<code>node start</code>&#xFF0C;&#x6211;&#x4EEC;&#x670D;&#x52A1;&#x5668;&#x8FD0;&#x884C;&#x4E4B;&#x540E;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x7ED9;info&#x548C;student&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x3002;&#x8FD9;&#x91CC;&#x662F;&#x901A;&#x8FC7;<code>postman</code>&#x7684;&#x8C37;&#x6B4C;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;&#x6765;&#x8BF7;&#x6C42;&#x7684;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720326?w=1696&amp;h=1626" src="https://static.alili.tech/img/remote/1460000012720326?w=1696&amp;h=1626" alt="" title="" style="cursor:pointer"></span></p><p>yeah~~~&#x4FDD;&#x5B58;&#x6210;&#x529F;&#xFF0C;&#x7EE7;&#x7EED;&#x6309;&#x7167;&#x6B65;&#x9AA4;&#x591A;&#x4FDD;&#x5B58;&#x51E0;&#x6761;&#xFF0C;&#x7136;&#x540E;&#x6309;&#x7167;&#x63A5;&#x53E3;&#x67E5;&#x8BE2;&#x4E00;&#x4E0B;&#x3002;&#x5982;&#x4E0B;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720327?w=1168&amp;h=1902" src="https://static.alili.tech/img/remote/1460000012720327?w=1168&amp;h=1902" alt="" title="" style="cursor:pointer"></span></p><p>&#x55EF;&#xFF0C;&#x5982;&#x56FE;&#x90FD;&#x5DF2;&#x7ECF;&#x67E5;&#x8BE2;&#x5230;&#x6211;&#x4EEC;&#x4FDD;&#x5B58;&#x7684;&#x5168;&#x90E8;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x4E14;&#x5168;&#x90E8;&#x8FD4;&#x56DE;&#x524D;&#x7AEF;&#x4E86;&#x3002;&#x4E0D;&#x9519;&#x4E0D;&#x9519;&#x3002;&#x4E0B;&#x9762;&#x7EE7;&#x7EED;&#x4FDD;&#x5B58;&#x5B66;&#x751F;&#x6570;&#x636E;&#x3002;</p><blockquote>tip: &#x5B66;&#x751F;&#x6570;&#x636E;&#x4FDD;&#x5B58;&#x7684;&#x65F6;&#x5019;&#x5173;&#x8054;&#x4E86;&#x4FE1;&#x606F;&#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#x54E6;&#x3002;&#x6240;&#x4EE5;&#x628A;id&#x5199;&#x4E0A;&#x53BB;&#x4E86;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000012720328?w=1192&amp;h=1586" src="https://static.alili.tech/img/remote/1460000012720328?w=1192&amp;h=1586" alt="" title="" style="cursor:pointer"></span></p><p>&#x540C;&#x6837;&#x7684;&#x4E00;&#x6CE2;&#x64CD;&#x4F5C;&#xFF0C;&#x6211;&#x4EEC;&#x591A;&#x4FDD;&#x5B58;&#x5B66;&#x751F;&#x51E0;&#x6761;&#x4FE1;&#x606F;&#xFF0C;&#x7136;&#x540E;&#x67E5;&#x8BE2;&#x5B66;&#x751F;&#x4FE1;&#x606F;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720329?w=1028&amp;h=1642" src="https://static.alili.tech/img/remote/1460000012720329?w=1028&amp;h=1642" alt="" title="" style="cursor:pointer"></span></p><p>&#x597D;&#x4E86; &#xFF0C;&#x6570;&#x636E;&#x6211;&#x4EEC;&#x90FD;&#x5DF2;&#x7ECF;&#x4FDD;&#x5B58;&#x597D;&#x4E86;&#xFF0C;&#x94FA;&#x57AB;&#x4E5F;&#x505A;&#x4E86;&#x4E00;&#x5927;&#x628A;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x8BA9;&#x6211;&#x4EEC;&#x771F;&#x6B63;&#x7684;&#x8FDB;&#x5165;&#xFF0C;GrapgQL&#x67E5;&#x8BE2;&#x7684;&#x9A9A;&#x64CD;&#x4F5C;&#x5427;~~~~</p><h3 id="articleHeader4">&#x91CD;&#x6784;&#x8DEF;&#x7531;&#xFF0C;&#x914D;&#x7F6E;GraphQL&#x67E5;&#x8BE2;&#x754C;&#x9762;</h3><p>&#x522B;&#x5FD8;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5EFA;&#x7ACB;&#x4E86;&#x4E00;&#x4E2A;<code>router&#x6587;&#x4EF6;&#x5939;</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x5C31;&#x662F;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x6211;&#x4EEC;&#x8DEF;&#x7531;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5206;&#x79BB;&#x4E86;&#x8DEF;&#x7531;&#x4E2A;&#x5E94;&#x7528;&#x670D;&#x52A1;&#x7684;&#x6A21;&#x5757;&#x3002;&#x5728;<code>router&#x6587;&#x4EF6;&#x5939;</code>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>index.js</code>&#x3002;&#x5E76;&#x4E14;&#x6539;&#x9020;&#x4E00;&#x4E0B;<code>server.js</code>&#x91CC;&#x9762;&#x7684;&#x8DEF;&#x7531;&#x5168;&#x90E8;&#x590D;&#x5236;&#x5230;<code>router/index.js</code>&#x3002;</p><p>&#x987A;&#x4FBF;&#x5728;&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;&#x6587;&#x4EF6;&#x4E2D;&#x52A0;&#x5165;&#xFF0C;<a href="https://www.npmjs.com/package/graphql-server-koa" rel="nofollow noreferrer" target="_blank">graphql-server-koa</a>&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x662F;koa&#x96C6;&#x6210;&#x7684;graphql&#x670D;&#x52A1;&#x5668;&#x6A21;&#x5757;&#x3002;graphql server&#x662F;&#x4E00;&#x4E2A;&#x793E;&#x533A;&#x7EF4;&#x62A4;&#x7684;&#x5F00;&#x6E90;graphql&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0E;&#x6240;&#x6709;&#x7684;node.js http&#x670D;&#x52A1;&#x5668;&#x6846;&#x67B6;&#x4E00;&#x8D77;&#x5DE5;&#x4F5C;&#xFF1A;express&#xFF0C;connect&#xFF0C;hapi&#xFF0C;koa&#x548C;restify&#x3002;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x67E5;&#x770B;&#x8BE6;&#x7EC6;&#x77E5;&#x8BC6;&#x70B9;&#x3002;</p><p>&#x52A0;&#x5165;<code>graphql-server-koa</code>&#x7684;&#x8DEF;&#x7531;&#x6587;&#x4EF6;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><blockquote>router/index.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import { graphqlKoa, graphiqlKoa } from &apos;graphql-server-koa&apos;
import {saveInfo, fetchInfo} from &apos;../controllers/info&apos;
import {saveStudent, fetchStudent, fetchStudentDetail} from &apos;../controllers/student&apos;


const router = require(&apos;koa-router&apos;)()

router.post(&apos;/saveinfo&apos;, saveInfo)
      .get(&apos;/info&apos;, fetchInfo)
      .post(&apos;/savestudent&apos;, saveStudent)
      .get(&apos;/student&apos;, fetchStudent)
      .get(&apos;/studentDetail&apos;, fetchStudentDetail)
      .get(&apos;/graphiql&apos;, async (ctx, next) =&gt; {
        await graphiqlKoa({endpointURL: &apos;/graphql&apos;})(ctx, next)
      })
module.exports = router
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>
<span class="hljs-keyword">import</span> { graphqlKoa, graphiqlKoa } from <span class="hljs-string">&apos;graphql-server-koa&apos;</span>
<span class="hljs-keyword">import</span> {saveInfo, fetchInfo} from <span class="hljs-string">&apos;../controllers/info&apos;</span>
<span class="hljs-keyword">import</span> {saveStudent, fetchStudent, fetchStudentDetail} from <span class="hljs-string">&apos;../controllers/student&apos;</span>


<span class="hljs-keyword">const</span> router = require(<span class="hljs-string">&apos;koa-router&apos;</span>)()

router.post(<span class="hljs-string">&apos;/saveinfo&apos;</span>, saveInfo)
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/info&apos;</span>, fetchInfo)
      .post(<span class="hljs-string">&apos;/savestudent&apos;</span>, saveStudent)
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/student&apos;</span>, fetchStudent)
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/studentDetail&apos;</span>, fetchStudentDetail)
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/graphiql&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">await</span> graphiqlKoa({endpointURL: <span class="hljs-string">&apos;/graphql&apos;</span>})(ctx, next)
      })
module.exports = router
</code></pre><p>&#x4E4B;&#x540E;&#x628A;<code>server.js</code>&#x7684;&#x8DEF;&#x7531;&#x4EE3;&#x7801;&#x53BB;&#x6389;&#x4E4B;&#x540E;&#x7684;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><blockquote>server.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import Koa from &apos;koa&apos;
import KoaStatic from &apos;koa-static&apos;
import Router from &apos;koa-router&apos;
import bodyParser from &apos;koa-bodyparser&apos;

import {database} from &apos;./mongodb&apos;

database()

const GraphqlRouter = require(&apos;./router&apos;)

const app = new Koa()
const router = new Router();

const port = 4000

app.use(bodyParser());
app.use(KoaStatic(__dirname + &apos;/public&apos;));

router.use(&apos;&apos;, GraphqlRouter.routes())

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port);

console.log(&apos;GraphQL-demo server listen port: &apos; + port)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-keyword">import</span> Koa <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa&apos;</span>
<span class="hljs-keyword">import</span> KoaStatic <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-static&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-router&apos;</span>
<span class="hljs-keyword">import</span> bodyParser <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;koa-bodyparser&apos;</span>

<span class="hljs-keyword">import</span> {database} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./mongodb&apos;</span>

database()

<span class="hljs-keyword">const</span> GraphqlRouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./router&apos;</span>)

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router();

<span class="hljs-keyword">const</span> port = <span class="hljs-number">4000</span>

app.use(bodyParser());
app.use(KoaStatic(__dirname + <span class="hljs-string">&apos;/public&apos;</span>));

router.use(<span class="hljs-string">&apos;&apos;</span>, GraphqlRouter.routes())

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;GraphQL-demo server listen port: &apos;</span> + port)
</code></pre><p>&#x6069;&#xFF0C;&#x5206;&#x79BB;&#x4E4B;&#x540E;&#x7B80;&#x6D01;&#xFF0C;&#x660E;&#x4E86;&#x4E86;&#x5F88;&#x591A;&#x3002;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x91CD;&#x65B0;&#x542F;&#x52A8;node&#x670D;&#x52A1;&#x3002;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5730;&#x5740;&#x680F;&#x8F93;&#x5165;<code>http://localhost:4000/graphiql</code>&#xFF0C;&#x5C31;&#x4F1A;&#x5F97;&#x5230;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x754C;&#x9762;&#x3002;&#x5982;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720330?w=2356&amp;h=1554" src="https://static.alili.tech/img/remote/1460000012720330?w=2356&amp;h=1554" alt="" title="" style="cursor:pointer"></span></p><p>&#x6CA1;&#x9519;&#xFF0C;&#x4EC0;&#x4E48;&#x90FD;&#x6CA1;&#x6709; &#x5C31;&#x662F;GraphQL&#x67E5;&#x8BE2;&#x670D;&#x52A1;&#x7684;&#x754C;&#x9762;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x628A;&#x8FD9;&#x4E2A;GraphQL&#x67E5;&#x8BE2;&#x670D;&#x52A1;&#x5B8C;&#x5584;&#x8D77;&#x6765;&#x3002;</p><h3 id="articleHeader5">&#x7F16;&#x5199;GraphQL Schema</h3><p>&#x770B;&#x4E00;&#x4E0B;&#x6211;&#x4EEC;&#x7B2C;&#x4E00;&#x5F20;&#x56FE;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4EC0;&#x4E48;&#x6570;&#x636E;&#xFF0C;&#x5728;GraphQL&#x67E5;&#x8BE2;&#x754C;&#x9762;&#x5C31;&#x7F16;&#x5199;&#x4EC0;&#x4E48;&#x5B57;&#x6BB5;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x67E5;&#x8BE2;&#x5230;&#x4E86;&#xFF0C;&#x800C;&#x540E;&#x7AEF;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x597D;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x3002;&#x8FD9;&#x5C31;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x597D;GraphQL Schema&#x3002;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5728;&#x6839;&#x76EE;&#x5F55;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>graphql&#x6587;&#x4EF6;&#x5939;</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x7528;&#x4E8E;&#x5B58;&#x653E;&#x7BA1;&#x7406;graphql&#x76F8;&#x5173;&#x7684;js&#x6587;&#x4EF6;&#x3002;&#x7136;&#x540E;&#x5728;<code>graphql&#x6587;&#x4EF6;&#x5939;</code>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>schema.js</code>&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7528;&#x5230;<a href="https://www.npmjs.com/package/graphql" rel="nofollow noreferrer" target="_blank">graphql</a>&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x5C31;&#x662F;&#x7528;javascript&#x53C2;&#x8003;&#x5B9E;&#x73B0;graphql&#x67E5;&#x8BE2;&#x3002;&#x5411;&#x9700;&#x8981;&#x8BE6;&#x7EC6;&#x5B66;&#x4E60;&#xFF0C;&#x8BF7;&#x4F7F;&#x52B2;&#x6233;&#x94FE;&#x63A5;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5148;&#x5199;&#x597D;<code>info</code>&#x7684;&#x67E5;&#x8BE2;&#x65B9;&#x6CD5;&#x3002;&#x7136;&#x540E;&#x5176;&#x4ED6;&#x90FD;&#x5DEE;&#x4E0D;&#x591A;&#x6EF4;&#x3002;</p><blockquote>graphql/schema.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x5F15;&#x5165;GraphQL&#x5404;&#x79CD;&#x65B9;&#x6CD5;&#x7C7B;&#x578B;

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType
} from &apos;graphql&apos;;

import mongoose from &apos;mongoose&apos;
const Info = mongoose.model(&apos;Info&apos;) // &#x5F15;&#x5165;Info&#x6A21;&#x5757;

// &#x5B9A;&#x4E49;&#x65E5;&#x671F;&#x65F6;&#x95F4; &#x7C7B;&#x578B;
const objType = new GraphQLObjectType({
  name: &apos;mete&apos;,
  fields: {
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
})

// &#x5B9A;&#x4E49;Info&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;
let InfoType = new GraphQLObjectType({
  name: &apos;Info&apos;,
  fields: {
    _id: {
      type: GraphQLID
    },
    height: {
      type: GraphQLString
    },
    weight: {
      type: GraphQLString
    },
    hobby: {
      type: new GraphQLList(GraphQLString)
    },
    meta: {
      type: objType
    }
  }
})

// &#x6279;&#x91CF;&#x67E5;&#x8BE2;
const infos = {
  type: new GraphQLList(InfoType),
  args: {},
  resolve (root, params, options) {
    return Info.find({}).exec() // &#x6570;&#x636E;&#x5E93;&#x67E5;&#x8BE2;
  }
}

// &#x6839;&#x636E;id&#x67E5;&#x8BE2;&#x5355;&#x6761;info&#x6570;&#x636E;

const info = {
  type: InfoType,
  // &#x4F20;&#x8FDB;&#x6765;&#x7684;&#x53C2;&#x6570;
  args: {
    id: {
      name: &apos;id&apos;,
      type: new GraphQLNonNull(GraphQLID) // &#x53C2;&#x6570;&#x4E0D;&#x4E3A;&#x7A7A;
    }
  },
  resolve (root, params, options) {
    return Info.findOne({_id: params.id}).exec() // &#x67E5;&#x8BE2;&#x5355;&#x6761;&#x6570;&#x636E;
  }
}

// &#x5BFC;&#x51FA;GraphQLSchema&#x6A21;&#x5757;

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: &apos;Queries&apos;,
    fields: {
      infos,
      info
    }
  })
})

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>
<span class="hljs-comment">// &#x5F15;&#x5165;GraphQL&#x5404;&#x79CD;&#x65B9;&#x6CD5;&#x7C7B;&#x578B;</span>

<span class="hljs-keyword">import</span> {
  graphql,
  <span class="hljs-type">GraphQLSchema</span>,
  <span class="hljs-type">GraphQLObjectType</span>,
  <span class="hljs-type">GraphQLString</span>,
  <span class="hljs-type">GraphQLID</span>,
  <span class="hljs-type">GraphQLList</span>,
  <span class="hljs-type">GraphQLNonNull</span>,
  isOutputType
} from <span class="hljs-symbol">&apos;graphq</span>l&apos;;

<span class="hljs-keyword">import</span> mongoose from <span class="hljs-symbol">&apos;mongoos</span>e&apos;
const <span class="hljs-type">Info</span> = mongoose.model(<span class="hljs-symbol">&apos;Inf</span>o&apos;) <span class="hljs-comment">// &#x5F15;&#x5165;Info&#x6A21;&#x5757;</span>

<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x65E5;&#x671F;&#x65F6;&#x95F4; &#x7C7B;&#x578B;</span>
const objType = <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
  name: <span class="hljs-symbol">&apos;met</span>e&apos;,
  fields: {
    createdAt: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    },
    updatedAt: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    }
  }
})

<span class="hljs-comment">// &#x5B9A;&#x4E49;Info&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;</span>
let <span class="hljs-type">InfoType</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
  name: <span class="hljs-symbol">&apos;Inf</span>o&apos;,
  fields: {
    _id: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLID</span>
    },
    height: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    },
    weight: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    },
    hobby: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLList</span>(<span class="hljs-type">GraphQLString</span>)
    },
    meta: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: objType
    }
  }
})

<span class="hljs-comment">// &#x6279;&#x91CF;&#x67E5;&#x8BE2;</span>
const infos = {
  <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLList</span>(<span class="hljs-type">InfoType</span>),
  args: {},
  resolve (root, params, options) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Info</span>.find({}).exec() <span class="hljs-comment">// &#x6570;&#x636E;&#x5E93;&#x67E5;&#x8BE2;</span>
  }
}

<span class="hljs-comment">// &#x6839;&#x636E;id&#x67E5;&#x8BE2;&#x5355;&#x6761;info&#x6570;&#x636E;</span>

const info = {
  <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">InfoType</span>,
  <span class="hljs-comment">// &#x4F20;&#x8FDB;&#x6765;&#x7684;&#x53C2;&#x6570;</span>
  args: {
    id: {
      name: <span class="hljs-symbol">&apos;i</span>d&apos;,
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLNonNull</span>(<span class="hljs-type">GraphQLID</span>) <span class="hljs-comment">// &#x53C2;&#x6570;&#x4E0D;&#x4E3A;&#x7A7A;</span>
    }
  },
  resolve (root, params, options) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Info</span>.findOne({_id: params.id}).exec() <span class="hljs-comment">// &#x67E5;&#x8BE2;&#x5355;&#x6761;&#x6570;&#x636E;</span>
  }
}

<span class="hljs-comment">// &#x5BFC;&#x51FA;GraphQLSchema&#x6A21;&#x5757;</span>

export <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLSchema</span>({
  query: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
    name: <span class="hljs-symbol">&apos;Querie</span>s&apos;,
    fields: {
      infos,
      info
    }
  })
})

</code></pre><p>&#x770B;&#x4EE3;&#x7801;&#x7684;&#x65F6;&#x5019;&#x5EFA;&#x8BAE;&#x4ECE;&#x4E0B;&#x5F80;&#x4E0A;&#x770B;~~~~&#xFF0C;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x6240;&#x8BF4;&#x7684;&#x5C31;&#x662F;&#xFF0C;&#x5EFA;&#x7ACB;info&#x548C;infos&#x7684;GraphQLSchema&#xFF0C;&#x7136;&#x540E;&#x5B9A;&#x4E49;&#x597D;&#x6570;&#x636E;&#x683C;&#x5F0F;&#xFF0C;&#x67E5;&#x8BE2;&#x5230;&#x6570;&#x636E;&#xFF0C;&#x6216;&#x8005;&#x6839;&#x636E;&#x53C2;&#x6570;&#x67E5;&#x8BE2;&#x5230;&#x5355;&#x6761;&#x6570;&#x636E;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x51FA;&#x53BB;&#x3002;</p><p>&#x5199;&#x597D;&#x4E86;info schema&#x4E4B;&#x540E; &#x6211;&#x4EEC;&#x5728;&#x914D;&#x7F6E;&#x4E00;&#x4E0B;&#x8DEF;&#x7531;&#xFF0C;&#x8FDB;&#x5165;<code>router/index.js</code>&#x91CC;&#x9762;&#xFF0C;&#x52A0;&#x5165;&#x4E0B;&#x9762;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#x3002;</p><blockquote>router/index.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import { graphqlKoa, graphiqlKoa } from &apos;graphql-server-koa&apos;
import {saveInfo, fetchInfo} from &apos;../controllers/info&apos;
import {saveStudent, fetchStudent, fetchStudentDetail} from &apos;../controllers/student&apos;

// &#x5F15;&#x5165;schema
import schema from &apos;../graphql/schema&apos;

const router = require(&apos;koa-router&apos;)()

router.post(&apos;/saveinfo&apos;, saveInfo)
      .get(&apos;/info&apos;, fetchInfo)
      .post(&apos;/savestudent&apos;, saveStudent)
      .get(&apos;/student&apos;, fetchStudent)
      .get(&apos;/studentDetail&apos;, fetchStudentDetail)




router.post(&apos;/graphql&apos;, async (ctx, next) =&gt; {
        await graphqlKoa({schema: schema})(ctx, next) // &#x4F7F;&#x7528;schema
      })
      .get(&apos;/graphql&apos;, async (ctx, next) =&gt; {
        await graphqlKoa({schema: schema})(ctx, next) // &#x4F7F;&#x7528;schema
      })
      .get(&apos;/graphiql&apos;, async (ctx, next) =&gt; {
        await graphiqlKoa({endpointURL: &apos;/graphql&apos;})(ctx, next) // &#x91CD;&#x5B9A;&#x5411;&#x5230;graphiql&#x8DEF;&#x7531;
      })
module.exports = router
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dart"><code>
<span class="hljs-keyword">import</span> { graphqlKoa, graphiqlKoa } from <span class="hljs-string">&apos;graphql-server-koa&apos;</span>
<span class="hljs-keyword">import</span> {saveInfo, fetchInfo} from <span class="hljs-string">&apos;../controllers/info&apos;</span>
<span class="hljs-keyword">import</span> {saveStudent, fetchStudent, fetchStudentDetail} from <span class="hljs-string">&apos;../controllers/student&apos;</span>

<span class="hljs-comment">// &#x5F15;&#x5165;schema</span>
<span class="hljs-keyword">import</span> schema from <span class="hljs-string">&apos;../graphql/schema&apos;</span>

<span class="hljs-keyword">const</span> router = require(<span class="hljs-string">&apos;koa-router&apos;</span>)()

router.post(<span class="hljs-string">&apos;/saveinfo&apos;</span>, saveInfo)
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/info&apos;</span>, fetchInfo)
      .post(<span class="hljs-string">&apos;/savestudent&apos;</span>, saveStudent)
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/student&apos;</span>, fetchStudent)
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/studentDetail&apos;</span>, fetchStudentDetail)




router.post(<span class="hljs-string">&apos;/graphql&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">await</span> graphqlKoa({schema: schema})(ctx, next) <span class="hljs-comment">// &#x4F7F;&#x7528;schema</span>
      })
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/graphql&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">await</span> graphqlKoa({schema: schema})(ctx, next) <span class="hljs-comment">// &#x4F7F;&#x7528;schema</span>
      })
      .<span class="hljs-keyword">get</span>(<span class="hljs-string">&apos;/graphiql&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
        <span class="hljs-keyword">await</span> graphiqlKoa({endpointURL: <span class="hljs-string">&apos;/graphql&apos;</span>})(ctx, next) <span class="hljs-comment">// &#x91CD;&#x5B9A;&#x5411;&#x5230;graphiql&#x8DEF;&#x7531;</span>
      })
module.exports = router
</code></pre><p>&#x8BE6;&#x7EC6;&#x8BF7;&#x770B;&#x6CE8;&#x91CA;&#xFF0C;&#x7136;&#x540E;&#x88AB;&#x5FD8;&#x8BB0;&#x5B89;&#x88C5;&#x597D;<code>npm install graphql-server-koa graphql --save</code>&#x8FD9;&#x4E24;&#x4E2A;&#x6A21;&#x5757;&#x3002;&#x5B89;&#x88C5;&#x5B8C;&#x6BD5;&#x4E4B;&#x540E;&#xFF0C;&#x91CD;&#x65B0;&#x8FD0;&#x884C;&#x670D;&#x52A1;&#x5668;&#x7684;<code>node start</code>&#xFF08;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;nodemon&#x6765;&#x542F;&#x52A8;&#x672C;&#x5730;node&#x670D;&#x52A1;&#xFF0C;&#x514D;&#x5F97;&#x6765;&#x56DE;&#x542F;&#x52A8;&#x3002;&#xFF09;</p><p>&#x7136;&#x540E;&#x5237;&#x65B0;<code>http://localhost:4000/graphiql</code>&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#x53F3;&#x8FB9;&#x4F1A;&#x6709;&#x67E5;&#x8BE2;&#x6587;&#x6863;&#xFF0C;&#x5728;&#x5DE6;&#x8FB9;&#x5199;&#x4E0A;&#x67E5;&#x8BE2;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#x4E0B;&#x56FE;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720331?w=3300&amp;h=1910" src="https://static.alili.tech/img/remote/1460000012720331?w=3300&amp;h=1910" alt="" title="" style="cursor:pointer"></span></p><h3 id="articleHeader6">&#x91CD;&#x6574;Graphql&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#xFF0C;&#x5B8C;&#x6210;&#x6240;&#x6709;&#x6570;&#x636E;&#x67E5;&#x8BE2;</h3><p>&#x73B0;&#x5728;&#x662F;&#x6211;&#x4EEC;&#x628A;schema&#x548C;type&#x90FD;&#x5199;&#x5230;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E0A;&#x9762;&#x4E86;&#x53BB;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x6570;&#x636E;&#x591A;&#x4E86;&#xFF0C;&#x5B57;&#x6BB5;&#x591A;&#x4E86;&#x53D8;&#x5F97;&#x7279;&#x522B;&#x4E0D;&#x597D;&#x7EF4;&#x62A4;&#x4EE5;&#x53CA;review&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5C31;&#x628A;&#x5B9A;&#x4E49;type&#x7684;&#x548C;schema&#x5206;&#x79BB;&#x5F00;&#x6765;&#xFF0C;&#x8BF4;&#x505A;&#x5C31;&#x505A;&#x3002;</p><p>&#x5728;<code>graphql&#x6587;&#x4EF6;&#x5939;</code>&#x65B0;&#x5EFA;<code>info.js</code>&#xFF0C;<code>studen.js</code>&#xFF0C;&#x6587;&#x4EF6;&#xFF0C;&#x5148;&#x628A;info type &#x5199;&#x5230;<code>info.js</code>&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><blockquote>graphql/info.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType
} from &apos;graphql&apos;;

import mongoose from &apos;mongoose&apos;
const Info = mongoose.model(&apos;Info&apos;)


const objType = new GraphQLObjectType({
  name: &apos;mete&apos;,
  fields: {
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
})

export let InfoType = new GraphQLObjectType({
  name: &apos;Info&apos;,
  fields: {
    _id: {
      type: GraphQLID
    },
    height: {
      type: GraphQLString
    },
    weight: {
      type: GraphQLString
    },
    hobby: {
      type: new GraphQLList(GraphQLString)
    },
    meta: {
      type: objType
    }
  }
})


export const infos = {
  type: new GraphQLList(InfoType),
  args: {},
  resolve (root, params, options) {
    return Info.find({}).exec()
  }
}


export const info = {
  type: InfoType,
  args: {
    id: {
      name: &apos;id&apos;,
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve (root, params, options) {
    return Info.findOne({
      _id: params.id
    }).exec()
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> {
  graphql,
  <span class="hljs-type">GraphQLSchema</span>,
  <span class="hljs-type">GraphQLObjectType</span>,
  <span class="hljs-type">GraphQLString</span>,
  <span class="hljs-type">GraphQLID</span>,
  <span class="hljs-type">GraphQLList</span>,
  <span class="hljs-type">GraphQLNonNull</span>,
  isOutputType
} from <span class="hljs-symbol">&apos;graphq</span>l&apos;;

<span class="hljs-keyword">import</span> mongoose from <span class="hljs-symbol">&apos;mongoos</span>e&apos;
const <span class="hljs-type">Info</span> = mongoose.model(<span class="hljs-symbol">&apos;Inf</span>o&apos;)


const objType = <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
  name: <span class="hljs-symbol">&apos;met</span>e&apos;,
  fields: {
    createdAt: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    },
    updatedAt: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    }
  }
})

export let <span class="hljs-type">InfoType</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLObjectType</span>({
  name: <span class="hljs-symbol">&apos;Inf</span>o&apos;,
  fields: {
    _id: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLID</span>
    },
    height: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    },
    weight: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">GraphQLString</span>
    },
    hobby: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLList</span>(<span class="hljs-type">GraphQLString</span>)
    },
    meta: {
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: objType
    }
  }
})


export const infos = {
  <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLList</span>(<span class="hljs-type">InfoType</span>),
  args: {},
  resolve (root, params, options) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Info</span>.find({}).exec()
  }
}


export const info = {
  <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-type">InfoType</span>,
  args: {
    id: {
      name: <span class="hljs-symbol">&apos;i</span>d&apos;,
      <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-keyword">new</span> <span class="hljs-type">GraphQLNonNull</span>(<span class="hljs-type">GraphQLID</span>)
    }
  },
  resolve (root, params, options) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Info</span>.findOne({
      _id: params.id
    }).exec()
  }
}
</code></pre><p>&#x5206;&#x79BB;&#x597D;info type &#x4E4B;&#x540E;&#xFF0C;&#x4E00;&#x9F13;&#x4F5C;&#x6C14;&#xFF0C;&#x6211;&#x4EEC;&#x987A;&#x4FBF;&#x628A;studen type &#x4E5F;&#x5B8C;&#x6210;&#x4E00;&#x4E0B;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF0C;&#x539F;&#x7406;&#x8DDF;info type &#x90FD;&#x662F;&#x76F8;&#x901A;&#x7684;&#xFF0C;</p><blockquote>graphql/student.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  GraphQLInt
} from &apos;graphql&apos;;

import mongoose from &apos;mongoose&apos;

import {InfoType} from &apos;./info&apos;
const Student = mongoose.model(&apos;Student&apos;)


let StudentType = new GraphQLObjectType({
  name: &apos;Student&apos;,
  fields: {
    _id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    sex: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    info: {
      type: InfoType
    }
  }
})


export const student = {
  type: new GraphQLList(StudentType),
  args: {},
  resolve (root, params, options) {
    return Student.find({}).populate({
      path: &apos;info&apos;,
      select: &apos;hobby height weight&apos;
    }).exec()
  }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code>
<span class="hljs-keyword">import</span> {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType,
  GraphQLInt
} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;graphql&apos;</span>;

<span class="hljs-keyword">import</span> mongoose <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mongoose&apos;</span>

<span class="hljs-keyword">import</span> {InfoType} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./info&apos;</span>
<span class="hljs-keyword">const</span> Student = mongoose.model(<span class="hljs-string">&apos;Student&apos;</span>)


<span class="hljs-keyword">let</span> StudentType = <span class="hljs-keyword">new</span> GraphQLObjectType({
  name: <span class="hljs-string">&apos;Student&apos;</span>,
  fields: {
    _id: {
      <span class="hljs-keyword">type</span>: GraphQLID
    },
    name: {
      <span class="hljs-keyword">type</span>: GraphQLString
    },
    sex: {
      <span class="hljs-keyword">type</span>: GraphQLString
    },
    age: {
      <span class="hljs-keyword">type</span>: GraphQLInt
    },
    info: {
      <span class="hljs-keyword">type</span>: InfoType
    }
  }
})


<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> student = {
  <span class="hljs-keyword">type</span>: <span class="hljs-keyword">new</span> GraphQLList(StudentType),
  args: {},
  resolve (root, params, options) {
    <span class="hljs-keyword">return</span> Student.find({}).populate({
      path: <span class="hljs-string">&apos;info&apos;</span>,
      select: <span class="hljs-string">&apos;hobby height weight&apos;</span>
    }).exec()
  }
}

</code></pre><blockquote>tips&#xFF1A; &#x4E0A;&#x9762;&#x56E0;&#x4E3A;&#x6709;&#x4E86;&#x8054;&#x8868;&#x67E5;&#x8BE2;&#xFF0C;&#x6240;&#x4EE5;&#x5F15;&#x7528;&#x4E86;<code>info.js</code></blockquote><p>&#x7136;&#x540E;&#x8C03;&#x6574;&#x4E00;&#x4E0B;<code>schema.js</code>&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import {
  GraphQLSchema,
  GraphQLObjectType
} from &apos;graphql&apos;;
// &#x5F15;&#x5165; type 
import {info, infos} from &apos;./info&apos;
import {student} from &apos;./student&apos;

// &#x5EFA;&#x7ACB; schema
export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: &apos;Queries&apos;,
    fields: {
      infos,
      info,
      student
    }
  })
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-keyword">import</span> {
  GraphQLSchema,
  GraphQLObjectType
} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;graphql&apos;</span>;
<span class="hljs-comment">// &#x5F15;&#x5165; type </span>
<span class="hljs-keyword">import</span> {info, infos} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./info&apos;</span>
<span class="hljs-keyword">import</span> {student} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./student&apos;</span>

<span class="hljs-comment">// &#x5EFA;&#x7ACB; schema</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> GraphQLSchema({
  <span class="hljs-attr">query</span>: <span class="hljs-keyword">new</span> GraphQLObjectType({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Queries&apos;</span>,
    <span class="hljs-attr">fields</span>: {
      infos,
      info,
      student
    }
  })
})
</code></pre><p>&#x770B;&#x5230;&#x4EE3;&#x7801;&#x662F;&#x5982;&#x6B64;&#x7684;&#x6E05;&#x65B0;&#x8131;&#x4FD7;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x6DF1;&#x611F;&#x6B23;&#x6170;&#x3002;&#x597D;&#x4E86;&#xFF0C;graophql&#x6570;&#x636E;&#x67E5;&#x8BE2;&#x90FD;&#x5DF2;&#x7ECF;&#x662F;&#x5927;&#x6982;&#x6BD4;&#x8F83;&#x5B8C;&#x5584;&#x4E86;&#x3002;<br>&#x8BFE;&#x7A0B;&#x7684;&#x6570;&#x636E;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x4E0B;&#xFF0C;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x5230;&#x6211;&#x7684;<a href="https://github.com/naihe138/GraphQL-demo" rel="nofollow noreferrer" target="_blank">github&#x9879;&#x76EE;</a>&#x91CC;&#x9762;copy&#x8FC7;&#x6765;&#x6211;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x91CD;&#x590D;&#x7684;&#x8BF4;&#x4E86;&#x3002;</p><p>&#x4E0B;&#x9762;&#x5199;&#x4E00;&#x4E0B;&#x524D;&#x7AEF;&#x63A5;&#x53E3;&#x662F;&#x600E;&#x4E48;&#x67E5;&#x8BE2;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x8BA9;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x6D4F;&#x89C8;&#x5668;&#x5C55;&#x793A;&#x5230;&#x9875;&#x9762;&#x7684;&#x3002;</p><h3 id="articleHeader7">&#x524D;&#x7AEF;&#x63A5;&#x53E3;&#x8C03;&#x7528;</h3><p>&#x5728;<code>public&#x6587;&#x4EF6;&#x5939;</code>&#x4E0B;&#x9762;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>index.html</code>&#xFF0C;<code>js&#x6587;&#x4EF6;&#x5939;</code>&#xFF0C;<code>css&#x6587;&#x4EF6;&#x5939;</code>&#xFF0C;&#x7136;&#x540E;&#x5728;<code>js&#x6587;&#x4EF6;&#x5939;</code>&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;<code>index.js</code>&#xFF0C; &#x5728;<code>css&#x6587;&#x4EF6;&#x5939;</code>&#x5EFA;&#x7ACB;&#x4E00;&#x4E2A;<code>index.css</code>&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><blockquote>public/index.html</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;title&gt;GraphQL-demo&lt;/title&gt;
  &lt;link rel=&quot;stylesheet&quot; href=&quot;./css/index.css&quot;&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1 class=&quot;app-title&quot;&gt;GraphQL-&#x524D;&#x7AEF;demo&lt;/h1&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;div class=&quot;course list&quot;&gt;
      &lt;h3&gt;&#x8BFE;&#x7A0B;&#x5217;&#x8868;&lt;/h3&gt;
      &lt;ul id=&quot;courseList&quot;&gt;
        &lt;li&gt;&#x6682;&#x65E0;&#x6570;&#x636E;....&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class=&quot;student list&quot;&gt;
      &lt;h3&gt;&#x73ED;&#x7EA7;&#x5B66;&#x751F;&#x5217;&#x8868;&lt;/h3&gt;
      &lt;ul id=&quot;studentList&quot;&gt;
        &lt;li&gt;&#x6682;&#x65E0;&#x6570;&#x636E;....&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;btnbox&quot;&gt;
    &lt;div class=&quot;btn&quot; id=&quot;btn1&quot;&gt;&#x70B9;&#x51FB;&#x5E38;&#x89C4;&#x83B7;&#x53D6;&#x8BFE;&#x7A0B;&#x5217;&#x8868;&lt;/div&gt;
    &lt;div class=&quot;btn&quot; id=&quot;btn2&quot;&gt;&#x70B9;&#x51FB;&#x5E38;&#x89C4;&#x83B7;&#x53D6;&#x73ED;&#x7EA7;&#x5B66;&#x751F;&#x5217;&#x8868;&lt;/div&gt;
    &lt;div class=&quot;btn&quot; id=&quot;btn3&quot;&gt;&#x70B9;&#x51FB;graphQL&#x4E00;&#x6B21;&#x83B7;&#x53D6;&#x6240;&#x6709;&#x6570;&#x636E;&#xFF0C;&#x95EE;&#x4F60;&#x6015;&#x4E0D;&#x6015;&#xFF1F;&lt;/div&gt;
  &lt;/div&gt;
  &lt;div class=&quot;toast&quot;&gt;&lt;/div&gt;
  &lt;script src=&quot;https://cdn.bootcss.com/jquery/1.10.2/jquery.js&quot;&gt;&lt;/script&gt;
  &lt;script src=&quot;./js/index.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>GraphQL-demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;./css/index.css&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;app-title&quot;</span>&gt;</span>GraphQL-&#x524D;&#x7AEF;demo<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;course list&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x8BFE;&#x7A0B;&#x5217;&#x8868;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;courseList&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x6682;&#x65E0;&#x6570;&#x636E;....<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;student list&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>&#x73ED;&#x7EA7;&#x5B66;&#x751F;&#x5217;&#x8868;<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;studentList&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>&#x6682;&#x65E0;&#x6570;&#x636E;....<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btnbox&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn1&quot;</span>&gt;</span>&#x70B9;&#x51FB;&#x5E38;&#x89C4;&#x83B7;&#x53D6;&#x8BFE;&#x7A0B;&#x5217;&#x8868;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn2&quot;</span>&gt;</span>&#x70B9;&#x51FB;&#x5E38;&#x89C4;&#x83B7;&#x53D6;&#x73ED;&#x7EA7;&#x5B66;&#x751F;&#x5217;&#x8868;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;btn&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;btn3&quot;</span>&gt;</span>&#x70B9;&#x51FB;graphQL&#x4E00;&#x6B21;&#x83B7;&#x53D6;&#x6240;&#x6709;&#x6570;&#x636E;&#xFF0C;&#x95EE;&#x4F60;&#x6015;&#x4E0D;&#x6015;&#xFF1F;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;toast&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/jquery/1.10.2/jquery.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./js/index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x770B;js&#x8BF7;&#x6C42;&#x65B9;&#x5F0F; &#x4EE3;&#x7801;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
window.onload = function () {

  $(&apos;#btn2&apos;).click(function() {
    $.ajax({
      url: &apos;/student&apos;,
      data: {},
      success:function (res){
        if (res.success) {
          renderStudent (res.data)
        }
      }
    })
  })

  $(&apos;#btn1&apos;).click(function() {
    $.ajax({
      url: &apos;/course&apos;,
      data: {},
      success:function (res){
        if (res.success) {
          renderCourse(res.data)
        }
      }
    })
  })

  function renderStudent (data) {
    var str = &apos;&apos;
    data.forEach(function(item) {
      str += &apos;&lt;li&gt;&#x59D3;&#x540D;&#xFF1A;&apos;+item.name+&apos;&#xFF0C;&#x6027;&#x522B;&#xFF1A;&apos;+item.sex+&apos;&#xFF0C;&#x5E74;&#x9F84;&#xFF1A;&apos;+item.age+&apos;&lt;/li&gt;&apos;
    })
    $(&apos;#studentList&apos;).html(str)
  }

  function renderCourse (data) {
    var str = &apos;&apos;
    data.forEach(function(item) {
      str += &apos;&lt;li&gt;&#x8BFE;&#x7A0B;&#xFF1A;&apos;+item.title+&apos;&#xFF0C;&#x7B80;&#x4ECB;&#xFF1A;&apos;+item.desc+&apos;&lt;/li&gt;&apos;
    })
    $(&apos;#courseList&apos;).html(str)
  }
  
  // &#x8BF7;&#x6C42;&#x770B;query&#x53C2;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x8DDF;&#x67E5;&#x8BE2;&#x754C;&#x9762;&#x7684;&#x53C2;&#x6570;&#x5DEE;&#x4E0D;&#x591A;

  $(&apos;#btn3&apos;).click(function() {
    $.ajax({
      url: &apos;/graphql&apos;,
      data: {
        query: `query{
          student{
            _id
            name
            sex
            age
          }
          course{
            title
            desc
          }
        }`
      },
      success:function (res){
        renderStudent (res.data.student)
        renderCourse (res.data.course)
      }
    })
  })
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

  $(<span class="hljs-string">&apos;#btn2&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $.ajax({
      <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;/student&apos;</span>,
      <span class="hljs-attr">data</span>: {},
      <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>)</span>{
        <span class="hljs-keyword">if</span> (res.success) {
          renderStudent (res.data)
        }
      }
    })
  })

  $(<span class="hljs-string">&apos;#btn1&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $.ajax({
      <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;/course&apos;</span>,
      <span class="hljs-attr">data</span>: {},
      <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>)</span>{
        <span class="hljs-keyword">if</span> (res.success) {
          renderCourse(res.data)
        }
      }
    })
  })

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderStudent</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&apos;&apos;</span>
    data.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
      str += <span class="hljs-string">&apos;&lt;li&gt;&#x59D3;&#x540D;&#xFF1A;&apos;</span>+item.name+<span class="hljs-string">&apos;&#xFF0C;&#x6027;&#x522B;&#xFF1A;&apos;</span>+item.sex+<span class="hljs-string">&apos;&#xFF0C;&#x5E74;&#x9F84;&#xFF1A;&apos;</span>+item.age+<span class="hljs-string">&apos;&lt;/li&gt;&apos;</span>
    })
    $(<span class="hljs-string">&apos;#studentList&apos;</span>).html(str)
  }

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderCourse</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">&apos;&apos;</span>
    data.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
      str += <span class="hljs-string">&apos;&lt;li&gt;&#x8BFE;&#x7A0B;&#xFF1A;&apos;</span>+item.title+<span class="hljs-string">&apos;&#xFF0C;&#x7B80;&#x4ECB;&#xFF1A;&apos;</span>+item.desc+<span class="hljs-string">&apos;&lt;/li&gt;&apos;</span>
    })
    $(<span class="hljs-string">&apos;#courseList&apos;</span>).html(str)
  }
  
  <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x770B;query&#x53C2;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF0C;&#x8DDF;&#x67E5;&#x8BE2;&#x754C;&#x9762;&#x7684;&#x53C2;&#x6570;&#x5DEE;&#x4E0D;&#x591A;</span>

  $(<span class="hljs-string">&apos;#btn3&apos;</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $.ajax({
      <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;/graphql&apos;</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">query</span>: <span class="hljs-string">`query{
          student{
            _id
            name
            sex
            age
          }
          course{
            title
            desc
          }
        }`</span>
      },
      <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>)</span>{
        renderStudent (res.data.student)
        renderCourse (res.data.course)
      }
    })
  })
}
</code></pre><p>css&#x7684;&#x4EE3;&#x7801; &#x6211;&#x5C31;&#x4E0D;&#x8D34;&#x51FA;&#x6765;&#x5566;&#x3002;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x53BB;&#x9879;&#x76EE;&#x76F4;&#x63A5;&#x62FF;&#x561B;&#x3002;</p><p>&#x6240;&#x6709;&#x4E1C;&#x897F;&#x90FD;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x91CD;&#x65B0;&#x542F;&#x52A8;node&#x670D;&#x52A1;&#xFF0C;&#x7136;&#x540E;&#x8BBF;&#x95EE;&#xFF0C;<code>http://localhost:4000/</code>&#x5C31;&#x4F1A;&#x770B;&#x5230;&#x5982;&#x4E0B;&#x754C;&#x9762;&#x3002;&#x754C;&#x9762;&#x4E11;&#xFF0C;&#x6CA1;&#x4EC0;&#x4E48;&#x8BBE;&#x8BA1;&#x7F8E;&#x5316;&#x7EC6;&#x80DE;&#xFF0C;&#x6C42;&#x8F7B;&#x55B7;~~~~</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012720323?w=962&amp;h=716" src="https://static.alili.tech/img/remote/1460000012720323?w=962&amp;h=716" alt="" title="" style="cursor:pointer"></span></p><p>&#x64CD;&#x4F5C;&#x70B9;&#x51FB;&#x4E4B;&#x540E;&#x5C31;&#x4F1A;&#x60F3;&#x7B2C;&#x4E8C;&#x5F20;&#x56FE;&#x4E00;&#x6837;&#x4E86;&#x3002;</p><p>&#x6240;&#x6709;&#x6548;&#x679C;&#x90FD;&#x51FA;&#x6765;&#x4E86;&#xFF0C;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4E5F;&#x5C31;&#x5230;&#x6B64;&#x7ED3;&#x675F;&#x4E86;&#x3002;</p><p>&#x9644;&#x4E0A;&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A; <a href="https://github.com/naihe138/GraphQL-demo" rel="nofollow noreferrer" target="_blank">https://github.com/naihe138/GraphQL-demo</a></p><p>ps&#xFF1A;&#x559C;&#x6B22;&#x7684;&#x8BDD;&#x4E22;&#x4E00;&#x4E2A;&#x5C0F;&#x661F;&#x661F;(star)&#x7ED9;&#x6211;&#x561B;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GraphQL 搭配 Koa 最佳入门实践

## 原文链接
[https://segmentfault.com/a/1190000012720317](https://segmentfault.com/a/1190000012720317)


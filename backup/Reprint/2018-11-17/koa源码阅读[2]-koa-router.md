---
title: 'koa源码阅读[2]-koa-router' 
date: 2018-11-17 14:34:54
hidden: true
slug: k1xtdpwyqls
categories: [reprint]
---

{{< raw >}}
<p>&#x7B2C;&#x4E09;&#x7BC7;&#xFF0C;&#x6709;&#x5173;koa&#x751F;&#x6001;&#x4E2D;&#x6BD4;&#x8F83;&#x91CD;&#x8981;&#x7684;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF1A;<a href="https://github.com/alexmingoia/koa-router" rel="nofollow noreferrer" target="_blank">koa-router</a></p><blockquote>&#x7B2C;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015724787">koa&#x6E90;&#x7801;&#x9605;&#x8BFB;-0</a><br>&#x7B2C;&#x4E8C;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015810835" target="_blank">koa&#x6E90;&#x7801;&#x9605;&#x8BFB;-1-koa&#x4E0E;koa-compose</a></blockquote><h2 id="articleHeader0">koa-router&#x662F;&#x4EC0;&#x4E48;</h2><p>&#x9996;&#x5148;&#xFF0C;&#x56E0;&#x4E3A;koa&#x662F;&#x4E00;&#x4E2A;&#x7BA1;&#x7406;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x5E73;&#x53F0;&#xFF0C;&#x800C;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x4F7F;&#x7528;<code>use</code>&#x6765;&#x6267;&#x884C;&#x3002;<br>&#x65E0;&#x8BBA;&#x662F;&#x4EC0;&#x4E48;&#x8BF7;&#x6C42;&#xFF0C;&#x90FD;&#x4F1A;&#x5C06;&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x4E00;&#x904D;&#xFF08;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x4E2D;&#x9014;&#x7ED3;&#x675F;&#x7684;&#x8BDD;&#xFF09;<br>&#x6240;&#x4EE5;&#xFF0C;&#x8FD9;&#x5C31;&#x4F1A;&#x8BA9;&#x5F00;&#x53D1;&#x8005;&#x5F88;&#x56F0;&#x6270;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x8DEF;&#x7531;&#x8BE5;&#x600E;&#x4E48;&#x5199;&#x903B;&#x8F91;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(ctx =&gt; {
  switch (ctx.url) {
    case &apos;/&apos;:
    case &apos;/index&apos;:
      ctx.body = &apos;index&apos;
      break
    case &apos;list&apos;:
      ctx.body = &apos;list&apos;
      break
    default:
      ctx.body = &apos;not found&apos;
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  <span class="hljs-keyword">switch</span> (ctx.url) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;/&apos;</span>:
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;/index&apos;</span>:
      ctx.body = <span class="hljs-string">&apos;index&apos;</span>
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;list&apos;</span>:
      ctx.body = <span class="hljs-string">&apos;list&apos;</span>
      <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">default</span>:
      ctx.body = <span class="hljs-string">&apos;not found&apos;</span>
  }
})</code></pre><p>&#x8BDA;&#x7136;&#xFF0C;&#x8FD9;&#x6837;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x5FC5;&#x7136;&#x4E0D;&#x9002;&#x7528;&#x4E8E;&#x5927;&#x578B;&#x9879;&#x76EE;&#xFF0C;&#x6570;&#x5341;&#x4E2A;&#x63A5;&#x53E3;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;<code>switch</code>&#x6765;&#x63A7;&#x5236;&#x672A;&#x514D;&#x592A;&#x7E41;&#x7410;&#x4E86;&#x3002;<br>&#x66F4;&#x4F55;&#x51B5;&#x8BF7;&#x6C42;&#x53EF;&#x80FD;&#x53EA;&#x652F;&#x6301;<code>get</code>&#x6216;&#x8005;<code>post</code>&#xFF0C;&#x4EE5;&#x53CA;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5E76;&#x4E0D;&#x80FD;&#x5F88;&#x597D;&#x7684;&#x652F;&#x6301;URL&#x4E2D;&#x5305;&#x542B;&#x53C2;&#x6570;&#x7684;&#x8BF7;&#x6C42;<code>/info/:uid</code>&#x3002;<br>&#x5728;<code>express</code>&#x4E2D;&#x662F;&#x4E0D;&#x4F1A;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x81EA;&#x8EAB;&#x5DF2;&#x7ECF;&#x63D0;&#x4F9B;&#x4E86;<code>get</code>&#x3001;<code>post</code>&#x7B49;&#x4E4B;&#x7C7B;&#x7684;&#x4E0E;<code>METHOD</code>&#x540C;&#x540D;&#x7684;&#x51FD;&#x6570;&#x7528;&#x6765;&#x6CE8;&#x518C;&#x56DE;&#x8C03;&#xFF1A;<br><em>express</em></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require(&apos;express&apos;)
const app = express()

app.get(&apos;/&apos;, function (req, res) {
  res.send(&apos;hi there.&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>)
<span class="hljs-keyword">const</span> app = express()

app.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">&apos;hi there.&apos;</span>)
})</code></pre><p>&#x4F46;&#x662F;<code>koa</code>&#x505A;&#x4E86;&#x5F88;&#x591A;&#x7684;&#x7CBE;&#x7B80;&#xFF0C;&#x5C06;&#x5F88;&#x591A;&#x903B;&#x8F91;&#x90FD;&#x62C6;&#x5206;&#x51FA;&#x6765;&#x4F5C;&#x4E3A;&#x72EC;&#x7ACB;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6765;&#x5B58;&#x5728;&#x3002;<br>&#x6240;&#x4EE5;&#x5BFC;&#x81F4;&#x5F88;&#x591A;<code>express</code>&#x9879;&#x76EE;&#x8FC1;&#x79FB;&#x4E3A;<code>koa</code>&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x989D;&#x5916;&#x7684;&#x5B89;&#x88C5;&#x4E00;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;<code>koa-router</code>&#x5E94;&#x8BE5;&#x8BF4;&#x662F;&#x6700;&#x5E38;&#x7528;&#x7684;&#x4E00;&#x4E2A;&#x3002;<br>&#x6240;&#x4EE5;&#x5728;<code>koa</code>&#x4E2D;&#x5219;&#x9700;&#x8981;&#x989D;&#x5916;&#x7684;&#x5B89;&#x88C5;<code>koa-router</code>&#x6765;&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x7684;&#x8DEF;&#x7531;&#x529F;&#x80FD;&#xFF1A;<br><em>koa</em></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;)
const Router = require(&apos;koa-router&apos;)

const app = new Koa()
const router = new Router()

router.get(&apos;/&apos;, async ctx =&gt; {
  ctx.body = &apos;hi there.&apos;
})

app.use(router.routes())
  .use(router.allowedMethods())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> ctx =&gt; {
  ctx.body = <span class="hljs-string">&apos;hi there.&apos;</span>
})

app.use(router.routes())
  .use(router.allowedMethods())</code></pre><p>&#x770B;&#x8D77;&#x6765;&#x4EE3;&#x7801;&#x786E;&#x5B9E;&#x591A;&#x4E86;&#x4E00;&#x4E9B;&#xFF0C;&#x6BD5;&#x7ADF;&#x5C06;&#x5F88;&#x591A;&#x903B;&#x8F91;&#x90FD;&#x4ECE;&#x6846;&#x67B6;&#x5185;&#x90E8;&#x8F6C;&#x79FB;&#x5230;&#x4E86;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x6765;&#x5904;&#x7406;&#x3002;<br>&#x4E5F;&#x7B97;&#x662F;&#x4E3A;&#x4E86;&#x4FDD;&#x6301;&#x4E00;&#x4E2A;&#x7B80;&#x7EC3;&#x7684;koa&#x6846;&#x67B6;&#x6240;&#x53D6;&#x820D;&#x7684;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#x5427;&#x3002;<br><em>koa-router&#x7684;&#x903B;&#x8F91;&#x786E;&#x5B9E;&#x8981;&#x6BD4;koa&#x7684;&#x590D;&#x6742;&#x4E00;&#x4E9B;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;koa&#x60F3;&#x8C61;&#x4E3A;&#x4E00;&#x4E2A;&#x5E02;&#x573A;&#xFF0C;&#x800C;koa-router&#x5219;&#x662F;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x644A;&#x4F4D;</em><br><em>koa&#x4EC5;&#x9700;&#x8981;&#x4FDD;&#x8BC1;&#x5E02;&#x573A;&#x7684;&#x7A33;&#x5B9A;&#x8FD0;&#x884C;&#xFF0C;&#x800C;&#x771F;&#x6B63;&#x548C;&#x987E;&#x5BA2;&#x6253;&#x4EA4;&#x9053;&#x7684;&#x786E;&#x662F;&#x5728;&#x91CC;&#x8FB9;&#x6446;&#x644A;&#x7684;koa-router</em></p><h2 id="articleHeader1">koa-router&#x7684;&#x5927;&#x81F4;&#x7ED3;&#x6784;</h2><p><code>koa-router</code>&#x7684;&#x7ED3;&#x6784;&#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x4E5F;&#x5C31;&#x5206;&#x4E86;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; layer.js
&#x2514;&#x2500;&#x2500; router.ja" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">.
&#x251C;&#x2500;&#x2500; layer.js
&#x2514;&#x2500;&#x2500; router.ja</code></pre><p><code>layer</code>&#x4E3B;&#x8981;&#x662F;&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x4FE1;&#x606F;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x4E3B;&#x8981;&#x8DEF;&#x57FA;&#x7531;<code>router</code>&#x63D0;&#x4F9B;&#xFF1A;</p><table><thead><tr><th align="left">File</th><th align="left">Description</th></tr></thead><tbody><tr><td align="left"><code>layer</code></td><td align="left">&#x4FE1;&#x606F;&#x5B58;&#x50A8;&#xFF1A;&#x8DEF;&#x5F84;&#x3001;METHOD&#x3001;&#x8DEF;&#x5F84;&#x5BF9;&#x5E94;&#x7684;&#x6B63;&#x5219;&#x5339;&#x914D;&#x3001;&#x8DEF;&#x5F84;&#x4E2D;&#x7684;&#x53C2;&#x6570;&#x3001;&#x8DEF;&#x5F84;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</td></tr><tr><td align="left"><code>router</code></td><td align="left">&#x4E3B;&#x8981;&#x903B;&#x8F91;&#xFF1A;&#x5BF9;&#x5916;&#x66B4;&#x9732;&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x7684;&#x51FD;&#x6570;&#x3001;&#x63D0;&#x4F9B;&#x5904;&#x7406;&#x8DEF;&#x7531;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x68C0;&#x67E5;&#x8BF7;&#x6C42;&#x7684;URL&#x5E76;&#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684;layer&#x4E2D;&#x7684;&#x8DEF;&#x7531;&#x5904;&#x7406;</td></tr></tbody></table><h2 id="articleHeader2">koa-router&#x7684;&#x8FD0;&#x884C;&#x6D41;&#x7A0B;</h2><p>&#x53EF;&#x4EE5;&#x62FF;&#x4E0A;&#x8FB9;&#x6240;&#x629B;&#x51FA;&#x7684;&#x57FA;&#x672C;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#x660E;<code>koa-router</code>&#x662F;&#x600E;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x6D41;&#x7A0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new Router() // &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;Router&#x5BF9;&#x8C61;

// &#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x7684;&#x76D1;&#x542C;
router.get(&apos;/&apos;, async ctx =&gt; {
  ctx.body = &apos;hi there.&apos;
})

app
  .use(router.routes()) // &#x5C06;&#x8BE5;Router&#x5BF9;&#x8C61;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6CE8;&#x518C;&#x5230;Koa&#x5B9E;&#x4F8B;&#x4E0A;&#xFF0C;&#x540E;&#x7EED;&#x8BF7;&#x6C42;&#x7684;&#x4E3B;&#x8981;&#x5904;&#x7406;&#x903B;&#x8F91;
  .use(router.allowedMethods()) // &#x6DFB;&#x52A0;&#x9488;&#x5BF9;OPTIONS&#x7684;&#x54CD;&#x5E94;&#x5904;&#x7406;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E9B;METHOD&#x4E0D;&#x652F;&#x6301;&#x7684;&#x5904;&#x7406;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router() <span class="hljs-comment">// &#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;Router&#x5BF9;&#x8C61;</span>

<span class="hljs-comment">// &#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x7684;&#x76D1;&#x542C;</span>
router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> ctx =&gt; {
  ctx.body = <span class="hljs-string">&apos;hi there.&apos;</span>
})

app
  .use(router.routes()) <span class="hljs-comment">// &#x5C06;&#x8BE5;Router&#x5BF9;&#x8C61;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6CE8;&#x518C;&#x5230;Koa&#x5B9E;&#x4F8B;&#x4E0A;&#xFF0C;&#x540E;&#x7EED;&#x8BF7;&#x6C42;&#x7684;&#x4E3B;&#x8981;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
  .use(router.allowedMethods()) <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x9488;&#x5BF9;OPTIONS&#x7684;&#x54CD;&#x5E94;&#x5904;&#x7406;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E9B;METHOD&#x4E0D;&#x652F;&#x6301;&#x7684;&#x5904;&#x7406;</span></code></pre><h3 id="articleHeader3">&#x521B;&#x5EFA;&#x5B9E;&#x4F8B;&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x4E8B;&#x60C5;</h3><p>&#x9996;&#x5148;&#xFF0C;&#x5728;<code>koa-router</code>&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#x53C2;&#x6570;&#x4F5C;&#x4E3A;&#x521D;&#x59CB;&#x5316;&#x7684;&#x914D;&#x7F6E;&#x4FE1;&#x606F;&#x7684;&#x3002;<br>&#x7136;&#x800C;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#x5728;<code>readme</code>&#x4E2D;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x88AB;&#x63CF;&#x8FF0;&#x4E3A;&#xFF1A;</p><table><thead><tr><th align="center">Param</th><th align="center">Type</th><th align="left">Description</th></tr></thead><tbody><tr><td align="center"><code>[opts]</code></td><td align="center"><code>Object</code></td><td align="left"></td></tr><tr><td align="center"><code>[opts.prefix]</code></td><td align="center"><code>String</code></td><td align="left">prefix router paths(&#x8DEF;&#x7531;&#x7684;&#x524D;&#x7F00;)</td></tr></tbody></table><p>&#x544A;&#x8BC9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>Router</code>&#x6CE8;&#x518C;&#x65F6;&#x7684;&#x524D;&#x7F00;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5982;&#x679C;&#x6309;&#x7167;&#x6A21;&#x5757;&#x5316;&#x5206;&#xFF0C;&#x53EF;&#x4EE5;&#x4E0D;&#x5FC5;&#x5728;&#x6BCF;&#x4E2A;&#x8DEF;&#x5F84;&#x5339;&#x914D;&#x7684;&#x524D;&#x7AEF;&#x90FD;&#x6DFB;&#x52A0;&#x5DE8;&#x957F;&#x7684;&#x524D;&#x7F00;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Router = require(&apos;koa-router&apos;)
const router = new Router({
  prefix: &apos;/my/awesome/prefix&apos;
})

router.get(&apos;/index&apos;, ctx =&gt; { ctx.body = &apos;pong!&apos; })

// curl /my/awesome/prefix/index =&gt; pong!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&apos;/my/awesome/prefix&apos;</span>
})

router.get(<span class="hljs-string">&apos;/index&apos;</span>, ctx =&gt; { ctx.body = <span class="hljs-string">&apos;pong!&apos;</span> })

<span class="hljs-comment">// curl /my/awesome/prefix/index =&gt; pong!</span></code></pre><p><em>P.S. &#x4E0D;&#x8FC7;&#x8981;&#x8BB0;&#x4F4F;&#xFF0C;&#x5982;&#x679C;<code>prefix</code>&#x4EE5;<code>/</code>&#x7ED3;&#x5C3E;&#xFF0C;&#x5219;&#x8DEF;&#x7531;&#x7684;&#x6CE8;&#x518C;&#x5C31;&#x53EF;&#x4EE5;&#x7701;&#x53BB;&#x524D;&#x7F00;&#x7684;<code>/</code>&#x4E86;&#xFF0C;&#x4E0D;&#x7136;&#x4F1A;&#x51FA;&#x73B0;<code>/</code>&#x91CD;&#x590D;&#x7684;&#x60C5;&#x51B5;</em></p><p>&#x5B9E;&#x4F8B;&#x5316;<code>Router</code>&#x65F6;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Router(opts) {
  if (!(this instanceof Router)) {
    return new Router(opts)
  }

  this.opts = opts || {}
  this.methods = this.opts.methods || [
    &apos;HEAD&apos;,
    &apos;OPTIONS&apos;,
    &apos;GET&apos;,
    &apos;PUT&apos;,
    &apos;PATCH&apos;,
    &apos;POST&apos;,
    &apos;DELETE&apos;
  ]

  this.params = {}
  this.stack = []
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Router</span>(<span class="hljs-params">opts</span>) </span>{
  <span class="hljs-keyword">if</span> (!(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Router)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router(opts)
  }

  <span class="hljs-keyword">this</span>.opts = opts || {}
  <span class="hljs-keyword">this</span>.methods = <span class="hljs-keyword">this</span>.opts.methods || [
    <span class="hljs-string">&apos;HEAD&apos;</span>,
    <span class="hljs-string">&apos;OPTIONS&apos;</span>,
    <span class="hljs-string">&apos;GET&apos;</span>,
    <span class="hljs-string">&apos;PUT&apos;</span>,
    <span class="hljs-string">&apos;PATCH&apos;</span>,
    <span class="hljs-string">&apos;POST&apos;</span>,
    <span class="hljs-string">&apos;DELETE&apos;</span>
  ]

  <span class="hljs-keyword">this</span>.params = {}
  <span class="hljs-keyword">this</span>.stack = []
}</code></pre><p>&#x53EF;&#x89C1;&#x7684;&#x53EA;&#x6709;&#x4E00;&#x4E2A;<code>methods</code>&#x7684;&#x8D4B;&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x67E5;&#x770B;&#x4E86;&#x5176;&#x4ED6;&#x6E90;&#x7801;&#x540E;&#xFF0C;&#x53D1;&#x73B0;&#x9664;&#x4E86;<code>prefix</code>&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x662F;&#x5B9E;&#x4F8B;&#x5316;&#x65F6;&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x592A;&#x6E05;&#x695A;&#x4E3A;&#x4EC0;&#x4E48;&#x6587;&#x6863;&#x4E2D;&#x6CA1;&#x6709;&#x63D0;&#x5230;&#xFF1A;</p><div class="table-wrap"><table><thead><tr><th align="center">Param</th><th align="center">Type</th><th align="left">Default</th><th align="left">Description</th></tr></thead><tbody><tr><td align="center"><code>sensitive</code></td><td align="center"><code>Boolean</code></td><td align="left"><code>false</code></td><td align="left">&#x662F;&#x5426;&#x4E25;&#x683C;&#x5339;&#x914D;&#x5927;&#x5C0F;&#x5199;</td></tr><tr><td align="center"><code>strict</code></td><td align="center"><code>Boolean</code></td><td align="left"><code>false</code></td><td align="left">&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;<code>false</code>&#x5219;&#x5339;&#x914D;&#x8DEF;&#x5F84;&#x540E;&#x8FB9;&#x7684;<code>/</code>&#x662F;&#x53EF;&#x9009;&#x7684;</td></tr><tr><td align="center"><code>methods</code></td><td align="center"><code>Array[String]</code></td><td align="left"><code>[&apos;HEAD&apos;,&apos;OPTIONS&apos;,&apos;GET&apos;,&apos;PUT&apos;,&apos;PATCH&apos;,&apos;POST&apos;,&apos;DELETE&apos;]</code></td><td align="left">&#x8BBE;&#x7F6E;&#x8DEF;&#x7531;&#x53EF;&#x4EE5;&#x652F;&#x6301;&#x7684;METHOD</td></tr><tr><td align="center"><code>routerPath</code></td><td align="center">String</td><td align="left"><code>null</code></td><td align="left"></td></tr></tbody></table></div><h4>sensitive</h4><p>&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;<code>sensitive</code>&#xFF0C;&#x5219;&#x4F1A;&#x4EE5;&#x66F4;&#x4E25;&#x683C;&#x7684;&#x5339;&#x914D;&#x89C4;&#x5219;&#x6765;&#x76D1;&#x542C;&#x8DEF;&#x7531;&#xFF0C;&#x4E0D;&#x4F1A;&#x5FFD;&#x7565;URL&#x4E2D;&#x7684;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x5B8C;&#x5168;&#x6309;&#x7167;&#x6CE8;&#x518C;&#x65F6;&#x7684;&#x6765;&#x5339;&#x914D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Router = require(&apos;koa-router&apos;)
const router = new Router({
  sensitive: true
})

router.get(&apos;/index&apos;, ctx =&gt; { ctx.body = &apos;pong!&apos; })

// curl /index =&gt; pong!
// curl /Index =&gt; 404" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">sensitive</span>: <span class="hljs-literal">true</span>
})

router.get(<span class="hljs-string">&apos;/index&apos;</span>, ctx =&gt; { ctx.body = <span class="hljs-string">&apos;pong!&apos;</span> })

<span class="hljs-comment">// curl /index =&gt; pong!</span>
<span class="hljs-comment">// curl /Index =&gt; 404</span></code></pre><h4>strict</h4><p><code>strict</code>&#x4E0E;<code>sensitive</code>&#x529F;&#x80FD;&#x7C7B;&#x4F3C;&#xFF0C;&#x4E5F;&#x662F;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x8BA9;&#x8DEF;&#x5F84;&#x7684;&#x5339;&#x914D;&#x53D8;&#x5F97;&#x66F4;&#x52A0;&#x4E25;&#x683C;&#xFF0C;&#x5728;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8DEF;&#x5F84;&#x7ED3;&#x5C3E;&#x5904;&#x7684;<code>/</code>&#x662F;&#x53EF;&#x9009;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x5F00;&#x542F;&#x8BE5;&#x53C2;&#x6570;&#x4EE5;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x65F6;&#x5C3E;&#x90E8;&#x6CA1;&#x6709;&#x6DFB;&#x52A0;<code>/</code>&#xFF0C;&#x5219;&#x5339;&#x914D;&#x7684;&#x8DEF;&#x7531;&#x4E5F;&#x4E00;&#x5B9A;&#x4E0D;&#x80FD;&#x591F;&#x6DFB;&#x52A0;<code>/</code>&#x7ED3;&#x5C3E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Router = require(&apos;koa-router&apos;)
const router = new Router({
  strict: true
})

router.get(&apos;/index&apos;, ctx =&gt; { ctx.body = &apos;pong!&apos; })

// curl /index  =&gt; pong!
// curl /Index  =&gt; pong!
// curl /index/ =&gt; 404" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span>
})

router.get(<span class="hljs-string">&apos;/index&apos;</span>, ctx =&gt; { ctx.body = <span class="hljs-string">&apos;pong!&apos;</span> })

<span class="hljs-comment">// curl /index  =&gt; pong!</span>
<span class="hljs-comment">// curl /Index  =&gt; pong!</span>
<span class="hljs-comment">// curl /index/ =&gt; 404</span></code></pre><h4>methods</h4><p><code>methods</code>&#x914D;&#x7F6E;&#x9879;&#x5B58;&#x5728;&#x7684;&#x610F;&#x4E49;&#x5728;&#x4E8E;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#x9700;&#x8981;&#x540C;&#x65F6;&#x652F;&#x6301;<code>GET</code>&#x548C;<code>POST</code>&#xFF0C;<code>router.get</code>&#x3001;<code>router.post</code>&#x8FD9;&#x6837;&#x7684;&#x5199;&#x6CD5;&#x5FC5;&#x7136;&#x662F;&#x4E11;&#x964B;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x60F3;&#x5230;&#x4F7F;&#x7528;<code>router.all</code>&#x6765;&#x7B80;&#x5316;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Router = require(&apos;koa-router&apos;)
const router = new Router()

router.all(&apos;/ping&apos;, ctx =&gt; { ctx.body = &apos;pong!&apos; })

// curl -X GET  /index  =&gt; pong!
// curl -X POST /index  =&gt; pong!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.all(<span class="hljs-string">&apos;/ping&apos;</span>, ctx =&gt; { ctx.body = <span class="hljs-string">&apos;pong!&apos;</span> })

<span class="hljs-comment">// curl -X GET  /index  =&gt; pong!</span>
<span class="hljs-comment">// curl -X POST /index  =&gt; pong!</span></code></pre><p>&#x8FD9;&#x7B80;&#x76F4;&#x662F;&#x592A;&#x5B8C;&#x7F8E;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x677E;&#x7684;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x518D;&#x591A;&#x5B9E;&#x9A8C;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;<code>methods</code>&#x4EE5;&#x540E;&#xFF0C;&#x5C34;&#x5C2C;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x53D1;&#x751F;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; curl -X DELETE /index  =&gt; pong!
&gt; curl -X PUT    /index  =&gt; pong!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&gt; curl -X DELETE /index  =&gt; pong!
&gt; curl -X PUT    /index  =&gt; pong!</code></pre><p>&#x8FD9;&#x663E;&#x7136;&#x4E0D;&#x662F;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x9884;&#x671F;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x57FA;&#x4E8E;&#x76EE;&#x524D;<code>koa-router</code>&#x9700;&#x8981;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#x6765;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x529F;&#x80FD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;)
const Router = require(&apos;router&apos;)

const app = new Koa()
// &#x4FEE;&#x6539;&#x5904;1
const methods = [&apos;GET&apos;, &apos;POST&apos;]
const router = new Router({
  methods
})

// &#x4FEE;&#x6539;&#x5904;2
router.all(&apos;/&apos;, async (ctx, next) =&gt; {
  // &#x7406;&#x60F3;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E9B;&#x5224;&#x65AD;&#x5E94;&#x8BE5;&#x4EA4;&#x7531;&#x4E2D;&#x95F4;&#x4EF6;&#x6765;&#x5B8C;&#x6210;
  if (!~methods.indexOf(ctx.method)) {
    return await next()
  }

  ctx.body = &apos;pong!&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;router&apos;</span>)

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-comment">// &#x4FEE;&#x6539;&#x5904;1</span>
<span class="hljs-keyword">const</span> methods = [<span class="hljs-string">&apos;GET&apos;</span>, <span class="hljs-string">&apos;POST&apos;</span>]
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  methods
})

<span class="hljs-comment">// &#x4FEE;&#x6539;&#x5904;2</span>
router.all(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-comment">// &#x7406;&#x60F3;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8FD9;&#x4E9B;&#x5224;&#x65AD;&#x5E94;&#x8BE5;&#x4EA4;&#x7531;&#x4E2D;&#x95F4;&#x4EF6;&#x6765;&#x5B8C;&#x6210;</span>
  <span class="hljs-keyword">if</span> (!~methods.indexOf(ctx.method)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> next()
  }

  ctx.body = <span class="hljs-string">&apos;pong!&apos;</span>
})</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x4E24;&#x5904;&#x4FEE;&#x6539;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x6240;&#x671F;&#x671B;&#x7684;&#x529F;&#x80FD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; curl -X GET    /index  =&gt; pong!
&gt; curl -X POST   /index  =&gt; pong!
&gt; curl -X DELETE /index  =&gt; Not Implemented
&gt; curl -X PUT    /index  =&gt; Not Implemented" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&gt; curl -X GET    /index  =&gt; pong!
&gt; curl -X POST   /index  =&gt; pong!
&gt; curl -X DELETE /index  =&gt; Not Implemented
&gt; curl -X PUT    /index  =&gt; Not Implemented</code></pre><p>&#x6211;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x8FD9;&#x662F;<code>allowedMethods</code>&#x5B9E;&#x73B0;&#x7684;&#x4E00;&#x4E2A;&#x903B;&#x8F91;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E5F;&#x8BB8;&#x662F;&#x6211;&#x6CA1;&#x6709;get&#x5230;&#x4F5C;&#x8005;&#x7684;&#x70B9;&#xFF0C;<code>allowedMethods</code>&#x4E2D;&#x6BD4;&#x8F83;&#x5173;&#x952E;&#x7684;&#x4E00;&#x4E9B;&#x6E90;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.allowedMethods = function (options) {
  options = options || {}
  let implemented = this.methods

  return function allowedMethods(ctx, next) {
    return next().then(function() {
      let allowed = {}

      // &#x5982;&#x679C;&#x8FDB;&#x884C;&#x4E86;ctx.body&#x8D4B;&#x503C;&#xFF0C;&#x5FC5;&#x7136;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x540E;&#x7EED;&#x7684;&#x903B;&#x8F91;
      // &#x6240;&#x4EE5;&#x5C31;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x5224;&#x65AD;
      if (!ctx.status || ctx.status === 404) {
        if (!~implemented.indexOf(ctx.method)) {
          if (options.throw) {
            let notImplementedThrowable
            if (typeof options.notImplemented === &apos;function&apos;) {
              notImplementedThrowable = options.notImplemented() // set whatever the user returns from their function
            } else {
              notImplementedThrowable = new HttpError.NotImplemented()
            }
            throw notImplementedThrowable
          } else {
            ctx.status = 501
            ctx.set(&apos;Allow&apos;, allowedArr.join(&apos;, &apos;))
          }
        } else if (allowedArr.length) {
          // ...
        }
      }
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.allowedMethods = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {}
  <span class="hljs-keyword">let</span> implemented = <span class="hljs-keyword">this</span>.methods

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">allowedMethods</span>(<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">return</span> next().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">let</span> allowed = {}

      <span class="hljs-comment">// &#x5982;&#x679C;&#x8FDB;&#x884C;&#x4E86;ctx.body&#x8D4B;&#x503C;&#xFF0C;&#x5FC5;&#x7136;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x540E;&#x7EED;&#x7684;&#x903B;&#x8F91;</span>
      <span class="hljs-comment">// &#x6240;&#x4EE5;&#x5C31;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x5224;&#x65AD;</span>
      <span class="hljs-keyword">if</span> (!ctx.status || ctx.status === <span class="hljs-number">404</span>) {
        <span class="hljs-keyword">if</span> (!~implemented.indexOf(ctx.method)) {
          <span class="hljs-keyword">if</span> (options.throw) {
            <span class="hljs-keyword">let</span> notImplementedThrowable
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options.notImplemented === <span class="hljs-string">&apos;function&apos;</span>) {
              notImplementedThrowable = options.notImplemented() <span class="hljs-comment">// set whatever the user returns from their function</span>
            } <span class="hljs-keyword">else</span> {
              notImplementedThrowable = <span class="hljs-keyword">new</span> HttpError.NotImplemented()
            }
            <span class="hljs-keyword">throw</span> notImplementedThrowable
          } <span class="hljs-keyword">else</span> {
            ctx.status = <span class="hljs-number">501</span>
            ctx.set(<span class="hljs-string">&apos;Allow&apos;</span>, allowedArr.join(<span class="hljs-string">&apos;, &apos;</span>))
          }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (allowedArr.length) {
          <span class="hljs-comment">// ...</span>
        }
      }
    })
  }
}</code></pre><p>&#x9996;&#x5148;&#xFF0C;<code>allowedMethods</code>&#x662F;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x540E;&#x7F6E;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5B58;&#x5728;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x5148;&#x8C03;&#x7528;&#x4E86;<code>next</code>&#xFF0C;&#x5176;&#x6B21;&#x624D;&#x662F;&#x9488;&#x5BF9;<code>METHOD</code>&#x7684;&#x5224;&#x65AD;&#xFF0C;&#x800C;&#x8FD9;&#x6837;&#x5E26;&#x6765;&#x7684;&#x4E00;&#x4E2A;&#x540E;&#x679C;&#x5C31;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x8DEF;&#x7531;&#x7684;&#x56DE;&#x8C03;&#x4E2D;&#x8FDB;&#x884C;&#x7C7B;&#x4F3C;<code>ctx.body = XXX</code>&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F1A;&#x4FEE;&#x6539;&#x672C;&#x6B21;&#x8BF7;&#x6C42;&#x7684;<code>status</code>&#x503C;&#x7684;&#xFF0C;&#x4F7F;&#x4E4B;&#x5E76;&#x4E0D;&#x4F1A;&#x6210;&#x4E3A;<code>404</code>&#xFF0C;&#x800C;&#x65E0;&#x6CD5;&#x6B63;&#x786E;&#x7684;&#x89E6;&#x53D1;<code>METHOD</code>&#x68C0;&#x67E5;&#x7684;&#x903B;&#x8F91;&#x3002;<br>&#x60F3;&#x8981;&#x6B63;&#x786E;&#x7684;&#x89E6;&#x53D1;<code>METHOD</code>&#x903B;&#x8F91;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x5728;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x4E2D;&#x624B;&#x52A8;&#x5224;&#x65AD;<code>ctx.method</code>&#x662F;&#x5426;&#x4E3A;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x8DF3;&#x8FC7;&#x5F53;&#x524D;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x6267;&#x884C;&#x3002;<br>&#x800C;&#x8FD9;&#x4E00;&#x5224;&#x65AD;&#x7684;&#x6B65;&#x9AA4;&#x5B9E;&#x9645;&#x4E0A;&#x4E0E;<code>allowedMethods</code>&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x7684;<code>!~implemented.indexOf(ctx.method)</code>&#x903B;&#x8F91;&#x5B8C;&#x5168;&#x662F;&#x91CD;&#x590D;&#x7684;&#xFF0C;&#x4E0D;&#x592A;&#x6E05;&#x695A;<code>koa-router</code>&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x8FD9;&#x4E48;&#x5904;&#x7406;&#x3002;</p><p><strong>&#x5F53;&#x7136;&#xFF0C;<code>allowedMethods</code>&#x662F;&#x4E0D;&#x80FD;&#x591F;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x524D;&#x7F6E;&#x4E2D;&#x95F4;&#x4EF6;&#x6765;&#x5B58;&#x5728;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x4E00;&#x4E2A;<code>Koa</code>&#x4E2D;&#x53EF;&#x80FD;&#x4F1A;&#x6302;&#x5728;&#x591A;&#x4E2A;<code>Router</code>&#xFF0C;<code>Router</code>&#x4E4B;&#x95F4;&#x7684;&#x914D;&#x7F6E;&#x53EF;&#x80FD;&#x4E0D;&#x5C3D;&#x76F8;&#x540C;&#xFF0C;&#x4E0D;&#x80FD;&#x4FDD;&#x8BC1;&#x6240;&#x6709;&#x7684;<code>Router</code>&#x90FD;&#x548C;&#x5F53;&#x524D;<code>Router</code>&#x53EF;&#x5904;&#x7406;&#x7684;<code>METHOD</code>&#x662F;&#x4E00;&#x6837;&#x7684;&#x3002;</strong><br>&#x6240;&#x4EE5;&#xFF0C;&#x4E2A;&#x4EBA;&#x611F;&#x89C9;<code>methods</code>&#x53C2;&#x6570;&#x7684;&#x5B58;&#x5728;&#x610F;&#x4E49;&#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x5927;&#x3002;&#x3002;</p><h4>routerPath</h4><p>&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x5B58;&#x5728;&#x3002;&#x3002;&#x611F;&#x89C9;&#x4F1A;&#x5BFC;&#x81F4;&#x4E00;&#x4E9B;&#x5F88;&#x8BE1;&#x5F02;&#x7684;&#x60C5;&#x51B5;&#x3002;<br>&#x8FD9;&#x5C31;&#x8981;&#x8BF4;&#x5230;&#x5728;&#x6CE8;&#x518C;&#x5B8C;&#x4E2D;&#x95F4;&#x4EF6;&#x4EE5;&#x540E;&#x7684;<code>router.routes()</code>&#x7684;&#x64CD;&#x4F5C;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.routes = Router.prototype.middleware = function () {
  let router = this
  let dispatch = function dispatch(ctx, next) {
    let path = router.opts.routerPath || ctx.routerPath || ctx.path
    let matched = router.match(path, ctx.method)
    // &#x5982;&#x679C;&#x5339;&#x914D;&#x5230;&#x5219;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;
    // &#x6267;&#x884C;&#x540E;&#x7EED;&#x64CD;&#x4F5C;
  }
  return dispatch
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.routes = Router.prototype.middleware = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> router = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">let</span> dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">let</span> path = router.opts.routerPath || ctx.routerPath || ctx.path
    <span class="hljs-keyword">let</span> matched = router.match(path, ctx.method)
    <span class="hljs-comment">// &#x5982;&#x679C;&#x5339;&#x914D;&#x5230;&#x5219;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</span>
    <span class="hljs-comment">// &#x6267;&#x884C;&#x540E;&#x7EED;&#x64CD;&#x4F5C;</span>
  }
  <span class="hljs-keyword">return</span> dispatch
}</code></pre><p>&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5B9E;&#x9645;&#x4E0A;&#x5411;<code>koa</code>&#x6CE8;&#x518C;&#x7684;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5728;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x53D1;&#x9001;&#x8FC7;&#x6765;&#x65F6;&#xFF0C;&#x90FD;&#x4F1A;&#x6267;&#x884C;<code>dispatch</code>&#xFF0C;&#x800C;&#x5728;<code>dispatch</code>&#x4E2D;&#x5224;&#x65AD;&#x662F;&#x5426;&#x547D;&#x4E2D;&#x67D0;&#x4E2A;<code>router</code>&#x65F6;&#xFF0C;&#x5219;&#x4F1A;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF1A;<code>router.opts.routerPath || ctx.routerPath || ctx.path</code>&#xFF0C;<code>router</code>&#x4EE3;&#x8868;&#x5F53;&#x524D;<code>Router</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;<code>Router</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5982;&#x679C;&#x586B;&#x5199;&#x4E86;<code>routerPath</code>&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x65E0;&#x8BBA;&#x4EFB;&#x4F55;&#x8BF7;&#x6C42;&#xFF0C;&#x90FD;&#x4F1A;&#x4F18;&#x5148;&#x4F7F;&#x7528;<code>routerPath</code>&#x6765;&#x4F5C;&#x4E3A;&#x8DEF;&#x7531;&#x68C0;&#x67E5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new Router({
  routerPath: &apos;/index&apos;
})

router.all(&apos;/index&apos;, async (ctx, next) =&gt; {
  ctx.body = &apos;pong!&apos;
})
app.use(router.routes())

app.listen(8888, _ =&gt; console.log(&apos;server run as http://127.0.0.1:8888&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routerPath</span>: <span class="hljs-string">&apos;/index&apos;</span>
})

router.all(<span class="hljs-string">&apos;/index&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;pong!&apos;</span>
})
app.use(router.routes())

app.listen(<span class="hljs-number">8888</span>, _ =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server run as http://127.0.0.1:8888&apos;</span>))</code></pre><p>&#x5982;&#x679C;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x65E0;&#x8BBA;&#x8BF7;&#x6C42;&#x4EC0;&#x4E48;URL&#xFF0C;&#x90FD;&#x4F1A;&#x8BA4;&#x4E3A;&#x662F;<code>/index</code>&#x6765;&#x8FDB;&#x884C;&#x5339;&#x914D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; curl http://127.0.0.1:8888
pong!
&gt; curl http://127.0.0.1:8888/index
pong!
&gt; curl http://127.0.0.1:8888/whatever/path
pong!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&gt; curl http://127.0.0.1:8888
pong!
&gt; curl http://127.0.0.1:8888/index
pong!
&gt; curl http://127.0.0.1:8888/whatever/path
pong!</code></pre><h4>&#x5DE7;&#x7528;routerPath&#x5B9E;&#x73B0;&#x8F6C;&#x53D1;&#x529F;&#x80FD;</h4><p>&#x540C;&#x6837;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x77ED;&#x8DEF;&#x8FD0;&#x7B97;&#x7B26;&#x4E00;&#x5171;&#x6709;&#x4E09;&#x4E2A;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x7684;<code>ctx</code>&#x5219;&#x662F;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x65E9;&#x4E8E;<code>routes</code>&#x6267;&#x884C;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#x6765;&#x4FEE;&#x6539;&#x8DEF;&#x7531;&#x5224;&#x65AD;&#x6240;&#x4F7F;&#x7528;&#x7684;<code>URL</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new Router()

router.all(&apos;/index&apos;, async (ctx, next) =&gt; {
  ctx.body = &apos;pong!&apos;
})

app.use((ctx, next) =&gt; {
  ctx.routerPath = &apos;/index&apos; // &#x624B;&#x52A8;&#x6539;&#x53D8;routerPath
  next()
})
app.use(router.routes())

app.listen(8888, _ =&gt; console.log(&apos;server run as http://127.0.0.1:8888&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.all(<span class="hljs-string">&apos;/index&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;pong!&apos;</span>
})

app.use(<span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  ctx.routerPath = <span class="hljs-string">&apos;/index&apos;</span> <span class="hljs-comment">// &#x624B;&#x52A8;&#x6539;&#x53D8;routerPath</span>
  next()
})
app.use(router.routes())

app.listen(<span class="hljs-number">8888</span>, _ =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server run as http://127.0.0.1:8888&apos;</span>))</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x4E5F;&#x80FD;&#x591F;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x6548;&#x679C;&#x3002;<br>&#x5B9E;&#x4F8B;&#x5316;&#x4E2D;&#x4F20;&#x5165;&#x7684;<code>routerPath</code>&#x8BA9;&#x4EBA;&#x6349;&#x6478;&#x4E0D;&#x900F;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x6539;&#x53D8;<code>routerPath</code>&#x7684;&#x8FD9;&#x4E2A;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x627E;&#x5230;&#x5408;&#x9002;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x7406;&#x89E3;&#x4E3A;&#x8F6C;&#x53D1;&#x7684;&#x4E00;&#x79CD;&#x5B9E;&#x73B0;&#xFF0C;&#x8F6C;&#x53D1;&#x7684;&#x8FC7;&#x7A0B;&#x662F;&#x5BF9;&#x5BA2;&#x6237;&#x7AEF;&#x4E0D;&#x53EF;&#x89C1;&#x7684;&#xFF0C;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x770B;&#x6765;&#x4F9D;&#x7136;&#x8BBF;&#x95EE;&#x7684;&#x662F;&#x6700;&#x521D;&#x7684;URL&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x6539;&#x53D8;<code>ctx.routerPath</code>&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x6613;&#x7684;&#x4F7F;&#x8DEF;&#x7531;&#x5339;&#x914D;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8F6C;&#x53D1;&#x7684;&#x5730;&#x65B9;&#x53BB;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8001;&#x7248;&#x672C;&#x7684;&#x767B;&#x5F55;&#x903B;&#x8F91;&#x5904;&#x7406;
router.post(&apos;/login&apos;, ctx =&gt; {
  ctx.body = &apos;old login logic!&apos;
})

// &#x65B0;&#x7248;&#x672C;&#x7684;&#x767B;&#x5F55;&#x5904;&#x7406;&#x903B;&#x8F91;
router.post(&apos;/login-v2&apos;, ctx =&gt; {
  ctx.body = &apos;new login logic!&apos;
})

app.use((ctx, next) =&gt; {
  if (ctx.path === &apos;/login&apos;) { // &#x5339;&#x914D;&#x5230;&#x65E7;&#x7248;&#x8BF7;&#x6C42;&#xFF0C;&#x8F6C;&#x53D1;&#x5230;&#x65B0;&#x7248;
    ctx.routerPath = &apos;/login-v2&apos; // &#x624B;&#x52A8;&#x6539;&#x53D8;routerPath
  }
  next()
})
app.use(router.routes())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x8001;&#x7248;&#x672C;&#x7684;&#x767B;&#x5F55;&#x903B;&#x8F91;&#x5904;&#x7406;</span>
router.post(<span class="hljs-string">&apos;/login&apos;</span>, ctx =&gt; {
  ctx.body = <span class="hljs-string">&apos;old login logic!&apos;</span>
})

<span class="hljs-comment">// &#x65B0;&#x7248;&#x672C;&#x7684;&#x767B;&#x5F55;&#x5904;&#x7406;&#x903B;&#x8F91;</span>
router.post(<span class="hljs-string">&apos;/login-v2&apos;</span>, ctx =&gt; {
  ctx.body = <span class="hljs-string">&apos;new login logic!&apos;</span>
})

app.use(<span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (ctx.path === <span class="hljs-string">&apos;/login&apos;</span>) { <span class="hljs-comment">// &#x5339;&#x914D;&#x5230;&#x65E7;&#x7248;&#x8BF7;&#x6C42;&#xFF0C;&#x8F6C;&#x53D1;&#x5230;&#x65B0;&#x7248;</span>
    ctx.routerPath = <span class="hljs-string">&apos;/login-v2&apos;</span> <span class="hljs-comment">// &#x624B;&#x52A8;&#x6539;&#x53D8;routerPath</span>
  }
  next()
})
app.use(router.routes())</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x6613;&#x7684;&#x8F6C;&#x53D1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; curl -X POST http://127.0.0.1:8888/login
new login logic!" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&gt; curl -X POST http://127.0.0.1:8888/login
new login logic!</code></pre><h3 id="articleHeader4">&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x7684;&#x76D1;&#x542C;</h3><p>&#x4E0A;&#x8FF0;&#x5168;&#x90E8;&#x662F;&#x5173;&#x4E8E;&#x5B9E;&#x4F8B;&#x5316;<code>Router</code>&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x6765;&#x8BF4;&#x4E00;&#x4E0B;&#x4F7F;&#x7528;&#x6700;&#x591A;&#x7684;&#xFF0C;&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x76F8;&#x5173;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6700;&#x719F;&#x6089;&#x7684;&#x5FC5;&#x7136;&#x5C31;&#x662F;<code>router.get</code>&#xFF0C;<code>router.post</code>&#x8FD9;&#x4E9B;&#x7684;&#x64CD;&#x4F5C;&#x4E86;&#x3002;<br>&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x8FD9;&#x4E9B;&#x4E5F;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x5FEB;&#x6377;&#x65B9;&#x5F0F;&#x7F62;&#x4E86;&#xFF0C;&#x5728;&#x5185;&#x90E8;&#x8C03;&#x7528;&#x4E86;&#x6765;&#x81EA;<code>Router</code>&#x7684;<code>register</code>&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.register = function (path, methods, middleware, opts) {
  opts = opts || {}

  let router = this
  let stack = this.stack

  // support array of paths
  if (Array.isArray(path)) {
    path.forEach(function (p) {
      router.register.call(router, p, methods, middleware, opts)
    })

    return this
  }

  // create route
  let route = new Layer(path, methods, middleware, {
    end: opts.end === false ? opts.end : true,
    name: opts.name,
    sensitive: opts.sensitive || this.opts.sensitive || false,
    strict: opts.strict || this.opts.strict || false,
    prefix: opts.prefix || this.opts.prefix || &apos;&apos;,
    ignoreCaptures: opts.ignoreCaptures
  })

  if (this.opts.prefix) {
    route.setPrefix(this.opts.prefix)
  }

  // add parameter middleware
  Object.keys(this.params).forEach(function (param) {
    route.param(param, this.params[param])
  }, this)

  stack.push(route)

  return route
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.register = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path, methods, middleware, opts</span>) </span>{
  opts = opts || {}

  <span class="hljs-keyword">let</span> router = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">let</span> stack = <span class="hljs-keyword">this</span>.stack

  <span class="hljs-comment">// support array of paths</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray(path)) {
    path.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">p</span>) </span>{
      router.register.call(router, p, methods, middleware, opts)
    })

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }

  <span class="hljs-comment">// create route</span>
  <span class="hljs-keyword">let</span> route = <span class="hljs-keyword">new</span> Layer(path, methods, middleware, {
    <span class="hljs-attr">end</span>: opts.end === <span class="hljs-literal">false</span> ? opts.end : <span class="hljs-literal">true</span>,
    <span class="hljs-attr">name</span>: opts.name,
    <span class="hljs-attr">sensitive</span>: opts.sensitive || <span class="hljs-keyword">this</span>.opts.sensitive || <span class="hljs-literal">false</span>,
    <span class="hljs-attr">strict</span>: opts.strict || <span class="hljs-keyword">this</span>.opts.strict || <span class="hljs-literal">false</span>,
    <span class="hljs-attr">prefix</span>: opts.prefix || <span class="hljs-keyword">this</span>.opts.prefix || <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-attr">ignoreCaptures</span>: opts.ignoreCaptures
  })

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.opts.prefix) {
    route.setPrefix(<span class="hljs-keyword">this</span>.opts.prefix)
  }

  <span class="hljs-comment">// add parameter middleware</span>
  <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.params).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">param</span>) </span>{
    route.param(param, <span class="hljs-keyword">this</span>.params[param])
  }, <span class="hljs-keyword">this</span>)

  stack.push(route)

  <span class="hljs-keyword">return</span> route
}</code></pre><p><em>&#x8BE5;&#x65B9;&#x6CD5;&#x5728;&#x6CE8;&#x91CA;&#x4E2D;&#x6807;&#x4E3A;&#x4E86; private &#x4F46;&#x662F;&#x5176;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x5404;&#x79CD;&#x5730;&#x65B9;&#x90FD;&#x6CA1;&#x6709;&#x4F53;&#x73B0;&#x51FA;&#x6765;&#xFF0C;&#x9B3C;&#x77E5;&#x9053;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x7559;&#x7740;&#x90A3;&#x4E9B;&#x53C2;&#x6570;&#xFF0C;&#x4F46;&#x65E2;&#x7136;&#x5B58;&#x5728;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x4ED6;&#x662F;&#x5E72;&#x4EC0;&#x4E48;&#x7684;</em><br>&#x8FD9;&#x4E2A;&#x662F;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x7684;&#x57FA;&#x7840;&#x65B9;&#x6CD5;&#xFF0C;&#x51FD;&#x6570;&#x7B7E;&#x540D;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;</p><table><thead><tr><th align="left">Param</th><th align="left">Type</th><th align="left">Default</th><th align="left">Description</th></tr></thead><tbody><tr><td align="left"><code>path</code></td><td align="left"><code>String</code>/<code>Array[String]</code></td><td align="left">-</td><td align="left">&#x4E00;&#x4E2A;&#x6216;&#x8005;&#x591A;&#x4E2A;&#x7684;&#x8DEF;&#x5F84;</td></tr><tr><td align="left"><code>methods</code></td><td align="left"><code>Array[String]</code></td><td align="left">-</td><td align="left">&#x8BE5;&#x8DEF;&#x7531;&#x9700;&#x8981;&#x76D1;&#x542C;&#x54EA;&#x51E0;&#x4E2A;<code>METHOD</code></td></tr><tr><td align="left"><code>middleware</code></td><td align="left"><code>Function</code>/<code>Array[Function]</code></td><td align="left">-</td><td align="left">&#x7531;&#x51FD;&#x6570;&#x7EC4;&#x6210;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6570;&#x7EC4;&#xFF0C;&#x8DEF;&#x7531;&#x5B9E;&#x9645;&#x8C03;&#x7528;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</td></tr><tr><td align="left"><code>opts</code></td><td align="left"><code>Object</code></td><td align="left"><code>{}</code></td><td align="left">&#x4E00;&#x4E9B;&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x65F6;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;&#xFF0C;&#x4E0A;&#x8FB9;&#x63D0;&#x5230;&#x7684;<code>strict</code>&#x3001;<code>sensitive</code>&#x548C;<code>prefix</code>&#x5728;&#x8FD9;&#x91CC;&#x90FD;&#x6709;&#x4F53;&#x73B0;</td></tr></tbody></table><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x51FD;&#x6570;&#x5927;&#x81F4;&#x5C31;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x6D41;&#x7A0B;&#xFF1A;</p><ol><li>&#x68C0;&#x67E5;<code>path</code>&#x662F;&#x5426;&#x4E3A;&#x6570;&#x7EC4;&#xFF0C;&#x5982;&#x679C;&#x662F;&#xFF0C;&#x904D;&#x5386;<code>item</code>&#x8FDB;&#x884C;&#x8C03;&#x7528;&#x81EA;&#x8EAB;</li><li>&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;<code>Layer</code>&#x5BF9;&#x8C61;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x521D;&#x59CB;&#x5316;&#x53C2;&#x6570;</li><li>&#x8BBE;&#x7F6E;&#x9488;&#x5BF9;&#x67D0;&#x4E9B;&#x53C2;&#x6570;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5904;&#x7406;&#xFF08;&#x5982;&#x679C;&#x6709;&#x7684;&#x8BDD;&#xFF09;</li><li>&#x5C06;&#x5B9E;&#x4F8B;&#x5316;&#x540E;&#x7684;&#x5BF9;&#x8C61;&#x653E;&#x5165;<code>stack</code>&#x4E2D;&#x5B58;&#x50A8;</li></ol><p>&#x6240;&#x4EE5;&#x5728;&#x4ECB;&#x7ECD;&#x8FD9;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x4E4B;&#x524D;&#xFF0C;&#x7B80;&#x5355;&#x7684;&#x63CF;&#x8FF0;&#x4E00;&#x4E0B;<code>Layer</code>&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;&#x5F88;&#x6709;&#x5FC5;&#x8981;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Layer(path, methods, middleware, opts) {
  this.opts = opts || {}
  this.name = this.opts.name || null
  this.methods = []
  this.paramNames = []
  this.stack = Array.isArray(middleware) ? middleware : [middleware]

  methods.forEach(function(method) {
    var l = this.methods.push(method.toUpperCase());
    if (this.methods[l-1] === &apos;GET&apos;) {
      this.methods.unshift(&apos;HEAD&apos;)
    }
  }, this)

  // ensure middleware is a function
  this.stack.forEach(function(fn) {
    var type = (typeof fn)
    if (type !== &apos;function&apos;) {
      throw new Error(
        methods.toString() + &quot; `&quot; + (this.opts.name || path) +&quot;`: `middleware` &quot;
        + &quot;must be a function, not `&quot; + type + &quot;`&quot;
      )
    }
  }, this)

  this.path = path
  this.regexp = pathToRegExp(path, this.paramNames, this.opts)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Layer</span>(<span class="hljs-params">path, methods, middleware, opts</span>) </span>{
  <span class="hljs-keyword">this</span>.opts = opts || {}
  <span class="hljs-keyword">this</span>.name = <span class="hljs-keyword">this</span>.opts.name || <span class="hljs-literal">null</span>
  <span class="hljs-keyword">this</span>.methods = []
  <span class="hljs-keyword">this</span>.paramNames = []
  <span class="hljs-keyword">this</span>.stack = <span class="hljs-built_in">Array</span>.isArray(middleware) ? middleware : [middleware]

  methods.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method</span>) </span>{
    <span class="hljs-keyword">var</span> l = <span class="hljs-keyword">this</span>.methods.push(method.toUpperCase());
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.methods[l<span class="hljs-number">-1</span>] === <span class="hljs-string">&apos;GET&apos;</span>) {
      <span class="hljs-keyword">this</span>.methods.unshift(<span class="hljs-string">&apos;HEAD&apos;</span>)
    }
  }, <span class="hljs-keyword">this</span>)

  <span class="hljs-comment">// ensure middleware is a function</span>
  <span class="hljs-keyword">this</span>.stack.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">var</span> type = (<span class="hljs-keyword">typeof</span> fn)
    <span class="hljs-keyword">if</span> (type !== <span class="hljs-string">&apos;function&apos;</span>) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
        methods.toString() + <span class="hljs-string">&quot; `&quot;</span> + (<span class="hljs-keyword">this</span>.opts.name || path) +<span class="hljs-string">&quot;`: `middleware` &quot;</span>
        + <span class="hljs-string">&quot;must be a function, not `&quot;</span> + type + <span class="hljs-string">&quot;`&quot;</span>
      )
    }
  }, <span class="hljs-keyword">this</span>)

  <span class="hljs-keyword">this</span>.path = path
  <span class="hljs-keyword">this</span>.regexp = pathToRegExp(path, <span class="hljs-keyword">this</span>.paramNames, <span class="hljs-keyword">this</span>.opts)
}</code></pre><p>layer&#x662F;&#x8D1F;&#x8D23;&#x5B58;&#x50A8;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x7684;&#x4FE1;&#x606F;&#x7684;&#xFF0C;&#x6BCF;&#x6B21;&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x65F6;&#x7684;URL&#xFF0C;URL&#x751F;&#x6210;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x8BE5;URL&#x4E2D;&#x5B58;&#x5728;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4EE5;&#x53CA;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x7EDF;&#x7EDF;&#x4EA4;&#x7531;<code>Layer</code>&#x6765;&#x5B58;&#x50A8;&#xFF0C;&#x91CD;&#x70B9;&#x9700;&#x8981;&#x5173;&#x6CE8;&#x7684;&#x662F;&#x5B9E;&#x4F8B;&#x5316;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x90A3;&#x51E0;&#x4E2A;&#x6570;&#x7EC4;&#x53C2;&#x6570;&#xFF1A;</p><ul><li>methods</li><li>paramNames</li><li>stack</li></ul><p><code>methods</code>&#x5B58;&#x50A8;&#x7684;&#x662F;&#x8BE5;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x5BF9;&#x5E94;&#x7684;&#x6709;&#x6548;<code>METHOD</code>&#xFF0C;&#x5E76;&#x4F1A;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x9488;&#x5BF9;<code>METHOD</code>&#x8FDB;&#x884C;&#x5927;&#x5C0F;&#x5199;&#x7684;&#x8F6C;&#x6362;&#x3002;<br><code>paramNames</code>&#x56E0;&#x4E3A;&#x7528;&#x7684;&#x63D2;&#x4EF6;&#x95EE;&#x9898;&#xFF0C;&#x770B;&#x8D77;&#x6765;&#x4E0D;&#x90A3;&#x4E48;&#x6E05;&#x6670;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5728;<code>pathToRegExp</code>&#x5185;&#x90E8;&#x4F1A;&#x5BF9;<code>paramNames</code>&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x8FDB;&#x884C;<code>push</code>&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x4E48;&#x770B;&#x53EF;&#x80FD;&#x4F1A;&#x8212;&#x670D;&#x4E00;&#x4E9B;<code>pathToRegExp(path, &amp;this.paramNames, this.opts)</code>&#xFF0C;&#x5728;&#x62FC;&#x63A5;<code>hash</code>&#x7ED3;&#x6784;&#x7684;&#x8DEF;&#x5F84;&#x53C2;&#x6570;&#x65F6;&#x4F1A;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;<br><code>stack</code>&#x5B58;&#x50A8;&#x7684;&#x662F;&#x8BE5;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;<code>router.middleware</code>&#x90E8;&#x5206;&#x903B;&#x8F91;&#x4F1A;&#x4F9D;&#x8D56;&#x4E8E;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;</p><h4>path</h4><p>&#x5728;&#x51FD;&#x6570;&#x5934;&#x90E8;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x652F;&#x6301;&#x591A;&#x8DEF;&#x5F84;&#x7684;&#x540C;&#x65F6;&#x6CE8;&#x518C;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x7B2C;&#x4E00;&#x4E2A;<code>path</code>&#x53C2;&#x6570;&#x4E3A;&#x6570;&#x7EC4;&#x540E;&#xFF0C;&#x5219;&#x4F1A;&#x904D;&#x5386;<code>path</code>&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#x81EA;&#x8EAB;&#x3002;<br>&#x6240;&#x4EE5;&#x9488;&#x5BF9;&#x591A;&#x4E2A;<code>URL</code>&#x7684;&#x76F8;&#x540C;&#x8DEF;&#x7531;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x6765;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register([&apos;/&apos;, [&apos;/path1&apos;, [&apos;/path2&apos;, &apos;path3&apos;]]], [&apos;GET&apos;], ctx =&gt; {
  ctx.body = &apos;hi there.&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.register([<span class="hljs-string">&apos;/&apos;</span>, [<span class="hljs-string">&apos;/path1&apos;</span>, [<span class="hljs-string">&apos;/path2&apos;</span>, <span class="hljs-string">&apos;path3&apos;</span>]]], [<span class="hljs-string">&apos;GET&apos;</span>], ctx =&gt; {
  ctx.body = <span class="hljs-string">&apos;hi there.&apos;</span>
})</code></pre><p>&#x8FD9;&#x6837;&#x5B8C;&#x5168;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x8BBE;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; curl http://127.0.0.1:8888/
hi there.
&gt; curl http://127.0.0.1:8888/path1
hi there.
&gt; curl http://127.0.0.1:8888/path3
hi there." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">&gt; curl http://127.0.0.1:8888/
hi there.
&gt; curl http://127.0.0.1:8888/path1
hi there.
&gt; curl http://127.0.0.1:8888/path3
hi there.</code></pre><h4>methods</h4><p>&#x800C;&#x5173;&#x4E8E;<code>methods</code>&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x9ED8;&#x8BA4;&#x8BA4;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5373;&#x4F7F;&#x662F;&#x53EA;&#x76D1;&#x542C;&#x4E00;&#x4E2A;<code>METHOD</code>&#x4E5F;&#x9700;&#x8981;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x7A7A;&#x6570;&#x7EC4;&#x7684;&#x8BDD;&#xFF0C;&#x5373;&#x4F7F;<code>URL</code>&#x5339;&#x914D;&#xFF0C;&#x4E5F;&#x4F1A;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#xFF0C;&#x6267;&#x884C;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x5728;&#x540E;&#x7EED;&#x7684;<code>router.routes</code>&#x4E2D;&#x4F1A;&#x63D0;&#x5230;</p><h4>middleware</h4><p><code>middleware</code>&#x5219;&#x662F;&#x4E00;&#x6B21;&#x8DEF;&#x7531;&#x771F;&#x6B63;&#x6267;&#x884C;&#x7684;&#x4E8B;&#x60C5;&#x4E86;&#xFF0C;&#x4F9D;&#x65E7;&#x662F;&#x7B26;&#x5408;<code>koa</code>&#x6807;&#x51C6;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x6709;&#x591A;&#x4E2A;&#xFF0C;&#x6309;&#x7167;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x6267;&#x884C;&#x3002;<br>&#x8FD9;&#x4E5F;&#x662F;<code>koa-router</code>&#x4E2D;&#x6700;&#x91CD;&#x8981;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x80FD;&#x591F;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x4E00;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#x53EA;&#x5728;&#x7279;&#x5B9A;&#x7684;<code>URL</code>&#x65F6;&#x6267;&#x884C;&#x3002;<br>&#x8FD9;&#x91CC;&#x5199;&#x5165;&#x7684;&#x591A;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x90FD;&#x662F;&#x9488;&#x5BF9;&#x8BE5;<code>URL</code>&#x751F;&#x6548;&#x7684;&#x3002;</p><p><em>P.S. &#x5728;<code>koa-router</code>&#x4E2D;&#xFF0C;&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x53EB;&#x505A;<code>router.use</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x4F1A;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;<code>router</code>&#x5B9E;&#x4F8B;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</em></p><h4>opts</h4><p><code>opts</code>&#x5219;&#x662F;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x8DEF;&#x7531;&#x751F;&#x6210;&#x7684;&#x914D;&#x7F6E;&#x89C4;&#x5219;&#x7684;&#xFF0C;&#x5305;&#x62EC;&#x5982;&#x4E0B;&#x51E0;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x53C2;&#x6570;&#xFF1A;</p><table><thead><tr><th align="left">Param</th><th align="left">Type</th><th align="left">Default</th><th align="left">Description</th></tr></thead><tbody><tr><td align="left"><code>name</code></td><td align="left"><code>String</code></td><td align="left">-</td><td align="left">&#x8BBE;&#x7F6E;&#x8BE5;&#x8DEF;&#x7531;&#x6240;&#x5BF9;&#x5E94;&#x7684;<code>name</code>&#xFF0C;&#x547D;&#x540D;<code>router</code></td></tr><tr><td align="left"><code>prefix</code></td><td align="left"><code>String</code></td><td align="left">-</td><td align="left">__&#x975E;&#x5E38;&#x9E21;&#x808B;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5B8C;&#x5168;&#x6CA1;&#x6709;&#x5375;&#x7528;__&#xFF0C;&#x770B;&#x4F3C;&#x4F1A;&#x8BBE;&#x7F6E;&#x8DEF;&#x7531;&#x7684;&#x524D;&#x7F00;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x6CA1;&#x6709;&#x4E00;&#x70B9;&#x513F;&#x7528;</td></tr><tr><td align="left"><code>sensitive</code></td><td align="left"><code>Boolean</code></td><td align="left"><code>false</code></td><td align="left">&#x662F;&#x5426;&#x4E25;&#x683C;&#x5339;&#x914D;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x8986;&#x76D6;&#x5B9E;&#x4F8B;&#x5316;<code>Router</code>&#x4E2D;&#x7684;&#x914D;&#x7F6E;</td></tr><tr><td align="left"><code>strict</code></td><td align="left"><code>Boolean</code></td><td align="left"><code>false</code></td><td align="left">&#x662F;&#x5426;&#x4E25;&#x683C;&#x5339;&#x914D;&#x5927;&#x5C0F;&#x5199;&#xFF0C;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A;<code>false</code>&#x5219;&#x5339;&#x914D;&#x8DEF;&#x5F84;&#x540E;&#x8FB9;&#x7684;<code>/</code>&#x662F;&#x53EF;&#x9009;&#x7684;</td></tr><tr><td align="left"><code>end</code></td><td align="left"><code>Boolean</code></td><td align="left"><code>true</code></td><td align="left">&#x8DEF;&#x5F84;&#x5339;&#x914D;&#x662F;&#x5426;&#x4E3A;&#x5B8C;&#x6574;URL&#x7684;&#x7ED3;&#x5C3E;</td></tr><tr><td align="left"><code>ignoreCaptures</code></td><td align="left"><code>Boolean</code></td><td align="left">-</td><td align="left">&#x662F;&#x5426;&#x5FFD;&#x7565;&#x8DEF;&#x7531;&#x5339;&#x914D;&#x6B63;&#x5219;&#x7ED3;&#x679C;&#x4E2D;&#x7684;&#x6355;&#x83B7;&#x7EC4;</td></tr></tbody></table><h5>name</h5><p>&#x9996;&#x5148;&#x662F;<code>name</code>&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x4E8E;&#x8FD9;&#x51E0;&#x4E2A;&#x5730;&#x65B9;&#xFF1A;</p><ol><li>&#x629B;&#x51FA;&#x5F02;&#x5E38;&#x65F6;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x5B9A;&#x4F4D;</li><li>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>router.url(&lt;name&gt;)</code>&#x3001;<code>router.route(&lt;name&gt;)</code>&#x83B7;&#x53D6;&#x5230;&#x5BF9;&#x5E94;&#x7684;<code>router</code>&#x4FE1;&#x606F;</li><li>&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x7684;&#x65F6;&#x5019;&#xFF0C;<code>name</code>&#x4F1A;&#x88AB;&#x585E;&#x5230;<code>ctx.routerName</code>&#x4E2D;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register(&apos;/test1&apos;, [&apos;GET&apos;], _ =&gt; {}, {
  name: &apos;module&apos;
})

router.register(&apos;/test2&apos;, [&apos;GET&apos;], _ =&gt; {}, {
  name: &apos;module&apos;
})

console.log(router.url(&apos;module&apos;) === &apos;/test1&apos;) // true

try {
  router.register(&apos;/test2&apos;, [&apos;GET&apos;], null, {
    name: &apos;error-module&apos;
  })
} catch (e) {
  console.error(e) // Error: GET `error-module`: `middleware` must be a function, not `object`
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.register(<span class="hljs-string">&apos;/test1&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], _ =&gt; {}, {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;module&apos;</span>
})

router.register(<span class="hljs-string">&apos;/test2&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], _ =&gt; {}, {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;module&apos;</span>
})

<span class="hljs-built_in">console</span>.log(router.url(<span class="hljs-string">&apos;module&apos;</span>) === <span class="hljs-string">&apos;/test1&apos;</span>) <span class="hljs-comment">// true</span>

<span class="hljs-keyword">try</span> {
  router.register(<span class="hljs-string">&apos;/test2&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], <span class="hljs-literal">null</span>, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;error-module&apos;</span>
  })
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-built_in">console</span>.error(e) <span class="hljs-comment">// Error: GET `error-module`: `middleware` must be a function, not `object`</span>
}</code></pre><p>&#x5982;&#x679C;&#x591A;&#x4E2A;<code>router</code>&#x4F7F;&#x7528;&#x76F8;&#x540C;&#x7684;&#x547D;&#x540D;&#xFF0C;&#x5219;&#x901A;&#x8FC7;<code>router.url</code>&#x8C03;&#x7528;&#x8FD4;&#x56DE;&#x6700;&#x5148;&#x6CE8;&#x518C;&#x7684;&#x90A3;&#x4E00;&#x4E2A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// route&#x7528;&#x6765;&#x83B7;&#x53D6;&#x547D;&#x540D;&#x8DEF;&#x7531;
Router.prototype.route = function (name) {
  var routes = this.stack

  for (var len = routes.length, i=0; i&lt;len; i++) {
    if (routes[i].name &amp;&amp; routes[i].name === name) {
      return routes[i] // &#x5339;&#x914D;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x5C31;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E86;
    }
  }

  return false
}

// url&#x83B7;&#x53D6;&#x8BE5;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;URL&#xFF0C;&#x5E76;&#x4F7F;&#x7528;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x6765;&#x751F;&#x6210;&#x771F;&#x5B9E;&#x7684;URL
Router.prototype.url = function (name, params) {
  var route = this.route(name)

  if (route) {
    var args = Array.prototype.slice.call(arguments, 1)
    return route.url.apply(route, args)
  }

  return new Error(&apos;No route found for name: &apos; + name)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// route&#x7528;&#x6765;&#x83B7;&#x53D6;&#x547D;&#x540D;&#x8DEF;&#x7531;</span>
Router.prototype.route = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">var</span> routes = <span class="hljs-keyword">this</span>.stack

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> len = routes.length, i=<span class="hljs-number">0</span>; i&lt;len; i++) {
    <span class="hljs-keyword">if</span> (routes[i].name &amp;&amp; routes[i].name === name) {
      <span class="hljs-keyword">return</span> routes[i] <span class="hljs-comment">// &#x5339;&#x914D;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x5C31;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E86;</span>
    }
  }

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}

<span class="hljs-comment">// url&#x83B7;&#x53D6;&#x8BE5;&#x8DEF;&#x7531;&#x5BF9;&#x5E94;&#x7684;URL&#xFF0C;&#x5E76;&#x4F7F;&#x7528;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x6765;&#x751F;&#x6210;&#x771F;&#x5B9E;&#x7684;URL</span>
Router.prototype.url = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, params</span>) </span>{
  <span class="hljs-keyword">var</span> route = <span class="hljs-keyword">this</span>.route(name)

  <span class="hljs-keyword">if</span> (route) {
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>)
    <span class="hljs-keyword">return</span> route.url.apply(route, args)
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;No route found for name: &apos;</span> + name)
}</code></pre><h5>&#x8DD1;&#x9898;&#x8BF4;&#x4E0B;router.url&#x7684;&#x90A3;&#x4E9B;&#x4E8B;&#x513F;</h5><p>&#x5982;&#x679C;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x60F3;&#x8981;&#x9488;&#x5BF9;&#x67D0;&#x4E9B;<code>URL</code>&#x8FDB;&#x884C;&#x8DF3;&#x8F6C;&#xFF0C;&#x4F7F;&#x7528;<code>router.url</code>&#x6765;&#x751F;&#x6210;<code>path</code>&#x5219;&#x662F;&#x4E00;&#x4E2A;&#x4E0D;&#x9519;&#x7684;&#x9009;&#x62E9;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register(
  &apos;/list/:id&apos;, [&apos;GET&apos;], ctx =&gt; {
    ctx.body = `Hi ${ctx.params.id}, query: ${ctx.querystring}`
  }, {
    name: &apos;list&apos;
  }
)

router.register(&apos;/&apos;, [&apos;GET&apos;], ctx =&gt; {
  // /list/1?name=Niko
  ctx.redirect(
    router.url(&apos;list&apos;, { id: 1 }, { query: { name: &apos;Niko&apos; } })
  )
})

// curl -L http://127.0.0.1:8888 =&gt; Hi 1, query: name=Niko" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.register(
  <span class="hljs-string">&apos;/list/:id&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], ctx =&gt; {
    ctx.body = <span class="hljs-string">`Hi <span class="hljs-subst">${ctx.params.id}</span>, query: <span class="hljs-subst">${ctx.querystring}</span>`</span>
  }, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;list&apos;</span>
  }
)

router.register(<span class="hljs-string">&apos;/&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], ctx =&gt; {
  <span class="hljs-comment">// /list/1?name=Niko</span>
  ctx.redirect(
    router.url(<span class="hljs-string">&apos;list&apos;</span>, { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span> }, { <span class="hljs-attr">query</span>: { <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span> } })
  )
})

<span class="hljs-comment">// curl -L http://127.0.0.1:8888 =&gt; Hi 1, query: name=Niko</span></code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>router.url</code>&#x5B9E;&#x9645;&#x4E0A;&#x8C03;&#x7528;&#x7684;&#x662F;<code>Layer</code>&#x5B9E;&#x4F8B;&#x7684;<code>url</code>&#x65B9;&#x6CD5;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x6765;&#x5904;&#x7406;&#x751F;&#x6210;&#x65F6;&#x4F20;&#x5165;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x3002;<br>&#x6E90;&#x7801;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/alexmingoia/koa-router/blob/master/lib/layer.js#L116" rel="nofollow noreferrer" target="_blank">layer.js#L116</a><br>&#x51FD;&#x6570;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<code>params</code>&#x548C;<code>options</code>&#xFF0C;&#x56E0;&#x4E3A;&#x672C;&#x8EAB;<code>Layer</code>&#x5B9E;&#x4F8B;&#x662F;&#x5B58;&#x50A8;&#x4E86;&#x5BF9;&#x5E94;&#x7684;<code>path</code>&#x4E4B;&#x7C7B;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x6240;&#x4EE5;<code>params</code>&#x5C31;&#x662F;&#x5B58;&#x50A8;&#x7684;&#x5728;&#x8DEF;&#x5F84;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x7684;&#x66FF;&#x6362;&#xFF0C;<code>options</code>&#x5728;&#x76EE;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x4EC5;&#x4EC5;&#x5B58;&#x5728;&#x4E00;&#x4E2A;<code>query</code>&#x5B57;&#x6BB5;&#xFF0C;&#x7528;&#x6765;&#x62FC;&#x63A5;<code>search</code>&#x540E;&#x8FB9;&#x7684;&#x6570;&#x636E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Layer = require(&apos;koa-router/lib/layer&apos;)
const layer = new Layer(&apos;/list/:id/info/:name&apos;, [], [_ =&gt; {}])

console.log(layer.url({ id: 123, name: &apos;Niko&apos; }))
console.log(layer.url([123, &apos;Niko&apos;]))
console.log(layer.url(123, &apos;Niko&apos;))
console.log(
  layer.url(123, &apos;Niko&apos;, {
    query: {
      arg1: 1,
      arg2: 2
    }
  })
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Layer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router/lib/layer&apos;</span>)
<span class="hljs-keyword">const</span> layer = <span class="hljs-keyword">new</span> Layer(<span class="hljs-string">&apos;/list/:id/info/:name&apos;</span>, [], [<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {}])

<span class="hljs-built_in">console</span>.log(layer.url({ <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span> }))
<span class="hljs-built_in">console</span>.log(layer.url([<span class="hljs-number">123</span>, <span class="hljs-string">&apos;Niko&apos;</span>]))
<span class="hljs-built_in">console</span>.log(layer.url(<span class="hljs-number">123</span>, <span class="hljs-string">&apos;Niko&apos;</span>))
<span class="hljs-built_in">console</span>.log(
  layer.url(<span class="hljs-number">123</span>, <span class="hljs-string">&apos;Niko&apos;</span>, {
    <span class="hljs-attr">query</span>: {
      <span class="hljs-attr">arg1</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">arg2</span>: <span class="hljs-number">2</span>
    }
  })
)</code></pre><p>&#x4E0A;&#x8FF0;&#x7684;&#x8C03;&#x7528;&#x65B9;&#x5F0F;&#x90FD;&#x662F;&#x6709;&#x6548;&#x7684;&#xFF0C;&#x5728;&#x6E90;&#x7801;&#x4E2D;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x9996;&#x5148;&#x662F;&#x9488;&#x5BF9;&#x591A;&#x53C2;&#x6570;&#x7684;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;<code>params</code>&#x4E0D;&#x662F;&#x4E00;&#x4E2A;<code>object</code>&#xFF0C;&#x5219;&#x4F1A;&#x8BA4;&#x4E3A;&#x662F;&#x901A;&#x8FC7;<code>layer.url(&#x53C2;&#x6570;, &#x53C2;&#x6570;, &#x53C2;&#x6570;, opts)</code>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x8C03;&#x7528;&#x7684;&#x3002;<br>&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;<code>layer.url([&#x53C2;&#x6570;, &#x53C2;&#x6570;], opts)</code>&#x5F62;&#x5F0F;&#x7684;&#x3002;<br>&#x8FD9;&#x65F6;&#x5019;&#x7684;&#x903B;&#x8F91;&#x4EC5;&#x9700;&#x8981;&#x5904;&#x7406;&#x4E09;&#x79CD;&#x60C5;&#x51B5;&#x4E86;&#xFF1A;</p><ol><li>&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#x7684;&#x53C2;&#x6570;&#x66FF;&#x6362;</li><li><code>hash</code>&#x5F62;&#x5F0F;&#x7684;&#x53C2;&#x6570;&#x66FF;&#x6362;</li><li>&#x65E0;&#x53C2;&#x6570;</li></ol><p>&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x66FF;&#x6362;&#x6307;&#x7684;&#x662F;&#xFF0C;&#x4E00;&#x4E2A;<code>URL</code>&#x4F1A;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;<a href="https://www.npmjs.com/package/path-to-regexp" rel="nofollow noreferrer" target="_blank">&#x7B2C;&#x4E09;&#x65B9;&#x7684;&#x5E93;</a>&#x7528;&#x6765;&#x5904;&#x7406;&#x94FE;&#x63A5;&#x4E2D;&#x7684;&#x53C2;&#x6570;&#x90E8;&#x5206;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>/:XXX</code>&#x7684;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x7136;&#x540E;&#x4F20;&#x5165;&#x4E00;&#x4E2A;<code>hash</code>&#x5B9E;&#x73B0;&#x7C7B;&#x4F3C;&#x6A21;&#x7248;&#x66FF;&#x6362;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x8BA4;&#x4E3A;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;
let hash = { id: 123, name: &apos;Niko&apos; }
&apos;/list/:id/:name&apos;.replace(/(?:\/:)(\w+)/g, (_, $1) =&gt; `/${hash[$1]}`)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7684;&#x8BA4;&#x4E3A;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</span>
<span class="hljs-keyword">let</span> hash = { <span class="hljs-attr">id</span>: <span class="hljs-number">123</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span> }
<span class="hljs-string">&apos;/list/:id/:name&apos;</span>.replace(<span class="hljs-regexp">/(?:\/:)(\w+)/g</span>, (_, $<span class="hljs-number">1</span>) =&gt; <span class="hljs-string">`/<span class="hljs-subst">${hash[$<span class="hljs-number">1</span>]}</span>`</span>)</code></pre><p>&#x7136;&#x540E;<code>layer.url</code>&#x7684;&#x5904;&#x7406;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x5C06;&#x5404;&#x79CD;&#x53C2;&#x6570;&#x751F;&#x6210;&#x7C7B;&#x4F3C;<code>hash</code>&#x8FD9;&#x6837;&#x7684;&#x7ED3;&#x6784;&#xFF0C;&#x6700;&#x7EC8;&#x66FF;&#x6362;<code>hash</code>&#x83B7;&#x53D6;&#x5B8C;&#x6574;&#x7684;<code>URL</code>&#x3002;</p><h5>prefix</h5><p>&#x4E0A;&#x8FB9;&#x5B9E;&#x4F8B;&#x5316;<code>Layer</code>&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x770B;&#x4F3C;&#x662F;<code>opts.prefix</code>&#x7684;&#x6743;&#x91CD;&#x66F4;&#x9AD8;&#xFF0C;&#x4F46;&#x662F;&#x7D27;&#x63A5;&#x7740;&#x5728;&#x4E0B;&#x8FB9;&#x5C31;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x5224;&#x65AD;&#x903B;&#x8F91;&#x8FDB;&#x884C;&#x8C03;&#x7528;<code>setPrefix</code>&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#xFF0C;&#x5728;&#x7FFB;&#x904D;&#x4E86;&#x6574;&#x4E2A;&#x7684;&#x6E90;&#x7801;&#x540E;&#x53D1;&#x73B0;&#xFF0C;&#x8FD9;&#x6837;&#x552F;&#x4E00;&#x7684;&#x4E00;&#x4E2A;&#x533A;&#x522B;&#x5C31;&#x5728;&#x4E8E;&#xFF0C;&#x4F1A;&#x6709;&#x4E00;&#x6761;<code>debug</code>&#x5E94;&#x7528;&#x7684;&#x662F;&#x6CE8;&#x518C;<code>router</code>&#x65F6;&#x4F20;&#x5165;&#x7684;<code>prefix</code>&#xFF0C;&#x800C;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x90FD;&#x4F1A;&#x88AB;&#x5B9E;&#x4F8B;&#x5316;<code>Router</code>&#x65F6;&#x7684;<code>prefix</code>&#x6240;&#x8986;&#x76D6;&#x3002;</p><p>&#x800C;&#x4E14;&#x5982;&#x679C;&#x60F3;&#x8981;&#x8DEF;&#x7531;&#x6B63;&#x786E;&#x7684;&#x5E94;&#x7528;<code>prefix</code>&#xFF0C;&#x5219;&#x9700;&#x8981;&#x8C03;&#x7528;<code>setPrefix</code>&#xFF0C;&#x56E0;&#x4E3A;&#x5728;<code>Layer</code>&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x5173;&#x4E8E;<code>path</code>&#x7684;&#x5B58;&#x50A8;&#x5C31;&#x662F;&#x6765;&#x81EA;&#x8FDC;&#x4F20;&#x5165;&#x7684;<code>path</code>&#x53C2;&#x6570;&#x3002;<br>&#x800C;&#x5E94;&#x7528;<code>prefix</code>&#x524D;&#x7F00;&#x5219;&#x9700;&#x8981;&#x624B;&#x52A8;&#x89E6;&#x53D1;<code>setPrefix</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Layer&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x64CD;&#x4F5C;
function Layer(path, methods, middleware, opts) {
  // &#x7701;&#x7565;&#x4E0D;&#x76F8;&#x5E72;&#x64CD;&#x4F5C;
  this.path = path
  this.regexp = pathToRegExp(path, this.paramNames, this.opts)
}

// &#x53EA;&#x6709;&#x8C03;&#x7528;setPrefix&#x624D;&#x4F1A;&#x5E94;&#x7528;&#x524D;&#x7F00;
Layer.prototype.setPrefix = function (prefix) {
  if (this.path) {
    this.path = prefix + this.path
    this.paramNames = []
    this.regexp = pathToRegExp(this.path, this.paramNames, this.opts)
  }

  return this
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Layer&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x64CD;&#x4F5C;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Layer</span>(<span class="hljs-params">path, methods, middleware, opts</span>) </span>{
  <span class="hljs-comment">// &#x7701;&#x7565;&#x4E0D;&#x76F8;&#x5E72;&#x64CD;&#x4F5C;</span>
  <span class="hljs-keyword">this</span>.path = path
  <span class="hljs-keyword">this</span>.regexp = pathToRegExp(path, <span class="hljs-keyword">this</span>.paramNames, <span class="hljs-keyword">this</span>.opts)
}

<span class="hljs-comment">// &#x53EA;&#x6709;&#x8C03;&#x7528;setPrefix&#x624D;&#x4F1A;&#x5E94;&#x7528;&#x524D;&#x7F00;</span>
Layer.prototype.setPrefix = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">prefix</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.path) {
    <span class="hljs-keyword">this</span>.path = prefix + <span class="hljs-keyword">this</span>.path
    <span class="hljs-keyword">this</span>.paramNames = []
    <span class="hljs-keyword">this</span>.regexp = pathToRegExp(<span class="hljs-keyword">this</span>.path, <span class="hljs-keyword">this</span>.paramNames, <span class="hljs-keyword">this</span>.opts)
  }

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre><p>&#x8FD9;&#x4E2A;&#x5728;&#x66B4;&#x9732;&#x7ED9;&#x4F7F;&#x7528;&#x8005;&#x7684;&#x51E0;&#x4E2A;&#x65B9;&#x6CD5;&#x4E2D;&#x90FD;&#x6709;&#x4F53;&#x73B0;&#xFF0C;&#x7C7B;&#x4F3C;&#x7684;<code>get</code>&#x3001;<code>set</code>&#x4EE5;&#x53CA;<code>use</code>&#x3002;<br>&#x5F53;&#x7136;&#x5728;&#x6587;&#x6863;&#x4E2D;&#x4E5F;&#x63D0;&#x4F9B;&#x4E86;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x6240;&#x6709;<code>router</code>&#x524D;&#x7F00;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;<code>router.prefix</code>&#xFF1A;<br>&#x6587;&#x6863;&#x4E2D;&#x5C31;&#x8FD9;&#x6837;&#x7B80;&#x5355;&#x7684;&#x544A;&#x8BC9;&#x4F60;&#x53EF;&#x4EE5;&#x8BBE;&#x7F6E;&#x524D;&#x7F00;&#xFF0C;<code>prefix</code>&#x5728;&#x5185;&#x90E8;&#x4F1A;&#x5FAA;&#x73AF;&#x8C03;&#x7528;&#x6240;&#x6709;&#x7684;<code>layer.setPrefix</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.prefix(&apos;/things/:thing_id&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">router.prefix(<span class="hljs-string">&apos;/things/:thing_id&apos;</span>)</code></pre><p>&#x4F46;&#x662F;&#x5728;&#x7FFB;&#x770B;&#x4E86;<code>layer.setPrefix</code>&#x6E90;&#x7801;&#x540E;&#x624D;&#x53D1;&#x73B0;&#x8FD9;&#x91CC;&#x5176;&#x5B9E;&#x662F;&#x542B;&#x6709;&#x4E00;&#x4E2A;&#x6697;&#x5751;&#x7684;&#x3002;<br>&#x56E0;&#x4E3A;<code>setPrefix</code>&#x7684;&#x5B9E;&#x73B0;&#x662F;&#x62FF;&#x5230;<code>prefix</code>&#x53C2;&#x6570;&#xFF0C;&#x62FC;&#x63A5;&#x5230;&#x5F53;&#x524D;<code>path</code>&#x7684;&#x5934;&#x90E8;&#x3002;<br>&#x8FD9;&#x6837;&#x5C31;&#x4F1A;&#x5E26;&#x6765;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x591A;&#x6B21;&#x8C03;&#x7528;<code>setPrefix</code>&#x4F1A;&#x5BFC;&#x81F4;&#x591A;&#x6B21;<code>prefix</code>&#x53E0;&#x52A0;&#xFF0C;&#x800C;&#x975E;&#x66FF;&#x6362;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register(&apos;/index&apos;, [&apos;GET&apos;], ctx =&gt; {
  ctx.body = &apos;hi there.&apos;
})

router.prefix(&apos;/path1&apos;)
router.prefix(&apos;/path2&apos;)

// &gt; curl http://127.0.0.1:8888/path2/path1/index
// hi there." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.register(<span class="hljs-string">&apos;/index&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], ctx =&gt; {
  ctx.body = <span class="hljs-string">&apos;hi there.&apos;</span>
})

router.prefix(<span class="hljs-string">&apos;/path1&apos;</span>)
router.prefix(<span class="hljs-string">&apos;/path2&apos;</span>)

<span class="hljs-comment">// &gt; curl http://127.0.0.1:8888/path2/path1/index</span>
<span class="hljs-comment">// hi there.</span></code></pre><blockquote><strong>prefix&#x65B9;&#x6CD5;&#x4F1A;&#x53E0;&#x52A0;&#x524D;&#x7F00;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8986;&#x76D6;&#x524D;&#x7F00;</strong></blockquote><h5>sensitive&#x4E0E;strict</h5><p>&#x8FD9;&#x4FE9;&#x53C2;&#x6570;&#x6CA1;&#x5565;&#x597D;&#x8BF4;&#x7684;&#xFF0C;&#x5C31;&#x662F;&#x4F1A;&#x8986;&#x76D6;&#x5B9E;&#x4F8B;&#x5316;<code>Router</code>&#x65F6;&#x6240;&#x4F20;&#x9012;&#x7684;&#x90A3;&#x4FE9;&#x53C2;&#x6570;&#xFF0C;&#x6548;&#x679C;&#x90FD;&#x4E00;&#x81F4;&#x3002;</p><h5>end</h5><p><code>end</code>&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x6709;&#x8DA3;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x5728;<code>koa-router</code>&#x4E2D;&#x5F15;&#x7528;&#x7684;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x4E2D;&#x6709;&#x4F53;&#x73B0;&#x5230;&#xFF0C;<a href="https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L337" rel="nofollow noreferrer" target="_blank">path-to-regexp</a>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (end) {
  if (!strict) route += &apos;(?:&apos; + delimiter + &apos;)?&apos;

  route += endsWith === &apos;$&apos; ? &apos;$&apos; : &apos;(?=&apos; + endsWith + &apos;)&apos;
} else {
  if (!strict) route += &apos;(?:&apos; + delimiter + &apos;(?=&apos; + endsWith + &apos;))?&apos;
  if (!isEndDelimited) route += &apos;(?=&apos; + delimiter + &apos;|&apos; + endsWith + &apos;)&apos;
}

return new RegExp(&apos;^&apos; + route, flags(options))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (end) {
  <span class="hljs-keyword">if</span> (!strict) route += <span class="hljs-string">&apos;(?:&apos;</span> + delimiter + <span class="hljs-string">&apos;)?&apos;</span>

  route += endsWith === <span class="hljs-string">&apos;$&apos;</span> ? <span class="hljs-string">&apos;$&apos;</span> : <span class="hljs-string">&apos;(?=&apos;</span> + endsWith + <span class="hljs-string">&apos;)&apos;</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">if</span> (!strict) route += <span class="hljs-string">&apos;(?:&apos;</span> + delimiter + <span class="hljs-string">&apos;(?=&apos;</span> + endsWith + <span class="hljs-string">&apos;))?&apos;</span>
  <span class="hljs-keyword">if</span> (!isEndDelimited) route += <span class="hljs-string">&apos;(?=&apos;</span> + delimiter + <span class="hljs-string">&apos;|&apos;</span> + endsWith + <span class="hljs-string">&apos;)&apos;</span>
}

<span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;^&apos;</span> + route, flags(options))</code></pre><p><code>endWith</code>&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5730;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x6B63;&#x5219;&#x4E2D;&#x7684;<code>$</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5339;&#x914D;&#x7684;&#x7ED3;&#x5C3E;&#x3002;<br>&#x770B;&#x4EE3;&#x7801;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5927;&#x81F4;&#x5C31;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;<code>end: true</code>&#xFF0C;&#x5219;&#x65E0;&#x8BBA;&#x4EFB;&#x4F55;&#x60C5;&#x51B5;&#x90FD;&#x4F1A;&#x5728;&#x6700;&#x540E;&#x6DFB;&#x52A0;<code>$</code>&#x8868;&#x793A;&#x5339;&#x914D;&#x7684;&#x7ED3;&#x5C3E;&#x3002;<br>&#x800C;&#x5982;&#x679C;<code>end: false</code>&#xFF0C;&#x5219;&#x53EA;&#x6709;&#x5728;&#x540C;&#x65F6;&#x8BBE;&#x7F6E;&#x4E86;<code>strict: false</code>&#x6216;&#x8005;<code>isEndDelimited: false</code>&#x65F6;&#x624D;&#x4F1A;&#x89E6;&#x53D1;&#x3002;<br>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x6765;&#x5B9E;&#x73B0;URL&#x7684;&#x6A21;&#x7CCA;&#x5339;&#x914D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register(
  &apos;/list&apos;, [&apos;GET&apos;], ctx =&gt; {
    ctx.body = &apos;hi there.&apos;
  }, {
    end: false,
    strict: true
  }
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.register(
  <span class="hljs-string">&apos;/list&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], ctx =&gt; {
    ctx.body = <span class="hljs-string">&apos;hi there.&apos;</span>
  }, {
    <span class="hljs-attr">end</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span>
  }
)</code></pre><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x6700;&#x540E;&#x751F;&#x6210;&#x7684;&#x7528;&#x4E8E;&#x5339;&#x914D;&#x8DEF;&#x7531;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;&#x5927;&#x6982;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/^\/list(?=\/|$)/i

// &#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0B;&#x8FF0;&#x4EE3;&#x7801;&#x83B7;&#x53D6;&#x5230;&#x6B63;&#x5219;
require(&apos;path-to-regexp&apos;).tokensToRegExp(&apos;/list/&apos;, {end: false, strict: true})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">/^\/list(?=\/|$)/i

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0B;&#x8FF0;&#x4EE3;&#x7801;&#x83B7;&#x53D6;&#x5230;&#x6B63;&#x5219;</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path-to-regexp&apos;</span>).tokensToRegExp(<span class="hljs-string">&apos;/list/&apos;</span>, {<span class="hljs-attr">end</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">strict</span>: <span class="hljs-literal">true</span>})</code></pre><p>&#x7ED3;&#x5C3E;&#x7684;<code>$</code>&#x662F;&#x53EF;&#x9009;&#x7684;&#xFF0C;&#x8FD9;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x53D1;&#x9001;&#x4EFB;&#x4F55;&#x5F00;&#x5934;&#x4E3A;<code>/list</code>&#x7684;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x88AB;&#x8FD9;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x6240;&#x83B7;&#x53D6;&#x5230;&#x3002;</p><h5>ignoreCaptures</h5><p><code>ignoreCaptures</code>&#x53C2;&#x6570;&#x7528;&#x6765;&#x8BBE;&#x7F6E;&#x662F;&#x5426;&#x9700;&#x8981;&#x8FD4;&#x56DE;<code>URL</code>&#x4E2D;&#x5339;&#x914D;&#x7684;&#x8DEF;&#x5F84;&#x53C2;&#x6570;&#x7ED9;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x800C;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;<code>ignoreCaptures</code>&#x4EE5;&#x540E;&#x8FD9;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x5C31;&#x4F1A;&#x53D8;&#x4E3A;&#x7A7A;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register(&apos;/list/:id&apos;, [&apos;GET&apos;], ctx =&gt; {
  console.log(ctx.captures, ctx.params)
  // [&apos;1&apos;], { id: &apos;1&apos; }
})

// &gt; curl /list/1

router.register(&apos;/list/:id&apos;, [&apos;GET&apos;], ctx =&gt; {
  console.log(ctx.captures, ctx.params)
  // [ ], {  }
}, {
  ignoreCaptures: true
})
// &gt; curl /list/1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.register(<span class="hljs-string">&apos;/list/:id&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], ctx =&gt; {
  <span class="hljs-built_in">console</span>.log(ctx.captures, ctx.params)
  <span class="hljs-comment">// [&apos;1&apos;], { id: &apos;1&apos; }</span>
})

<span class="hljs-comment">// &gt; curl /list/1</span>

router.register(<span class="hljs-string">&apos;/list/:id&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], ctx =&gt; {
  <span class="hljs-built_in">console</span>.log(ctx.captures, ctx.params)
  <span class="hljs-comment">// [ ], {  }</span>
}, {
  <span class="hljs-attr">ignoreCaptures</span>: <span class="hljs-literal">true</span>
})
<span class="hljs-comment">// &gt; curl /list/1</span></code></pre><p>&#x8FD9;&#x4E2A;&#x662F;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x671F;&#x95F4;&#x8C03;&#x7528;&#x4E86;&#x6765;&#x81EA;<code>layer</code>&#x7684;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x7684;&#x3002;<br>&#x9996;&#x5148;&#x8C03;&#x7528;<code>captures</code>&#x83B7;&#x53D6;&#x6240;&#x6709;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;<code>ignoreCaptures</code>&#x5219;&#x4F1A;&#x5BFC;&#x81F4;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x7A7A;&#x6570;&#x7EC4;&#x3002;<br>&#x7136;&#x540E;&#x8C03;&#x7528;<code>params</code>&#x5C06;&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x65F6;&#x6240;&#x751F;&#x6210;&#x7684;&#x6240;&#x6709;&#x53C2;&#x6570;&#x4EE5;&#x53CA;&#x53C2;&#x6570;&#x4EEC;&#x5B9E;&#x9645;&#x7684;&#x503C;&#x4F20;&#x4E86;&#x8FDB;&#x53BB;&#xFF0C;&#x7136;&#x540E;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;<code>hash</code>&#x6CE8;&#x5165;&#x5230;<code>ctx</code>&#x5BF9;&#x8C61;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x903B;&#x8F91;
ctx.captures = layer.captures(path, ctx.captures)
ctx.params = layer.params(path, ctx.captures, ctx.params)
ctx.routerName = layer.name
return next()
// &#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x903B;&#x8F91; end

// layer&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;
Layer.prototype.captures = function (path) {
  if (this.opts.ignoreCaptures) return []
  return path.match(this.regexp).slice(1)
}

Layer.prototype.params = function (path, captures, existingParams) {
  var params = existingParams || {}

  for (var len = captures.length, i=0; i&lt;len; i++) {
    if (this.paramNames[i]) {
      var c = captures[i]
      params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c
    }
  }

  return params
}

// &#x6240;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;
// [18, &apos;Niko&apos;] + [&apos;age&apos;, &apos;name&apos;]
// =&gt;
// { age: 18, name: &apos;Niko&apos; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x903B;&#x8F91;</span>
ctx.captures = layer.captures(path, ctx.captures)
ctx.params = layer.params(path, ctx.captures, ctx.params)
ctx.routerName = layer.name
<span class="hljs-keyword">return</span> next()
<span class="hljs-comment">// &#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x903B;&#x8F91; end</span>

<span class="hljs-comment">// layer&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;</span>
Layer.prototype.captures = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.opts.ignoreCaptures) <span class="hljs-keyword">return</span> []
  <span class="hljs-keyword">return</span> path.match(<span class="hljs-keyword">this</span>.regexp).slice(<span class="hljs-number">1</span>)
}

Layer.prototype.params = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path, captures, existingParams</span>) </span>{
  <span class="hljs-keyword">var</span> params = existingParams || {}

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> len = captures.length, i=<span class="hljs-number">0</span>; i&lt;len; i++) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.paramNames[i]) {
      <span class="hljs-keyword">var</span> c = captures[i]
      params[<span class="hljs-keyword">this</span>.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c
    }
  }

  <span class="hljs-keyword">return</span> params
}

<span class="hljs-comment">// &#x6240;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5927;&#x81F4;&#x5982;&#x4E0B;&#xFF1A;</span>
<span class="hljs-comment">// [18, &apos;Niko&apos;] + [&apos;age&apos;, &apos;name&apos;]</span>
<span class="hljs-comment">// =&gt;</span>
<span class="hljs-comment">// { age: 18, name: &apos;Niko&apos; }</span></code></pre><h4>router.param&#x7684;&#x4F5C;&#x7528;</h4><p>&#x4E0A;&#x8FF0;&#x662F;&#x5173;&#x4E8E;&#x6CE8;&#x518C;&#x8DEF;&#x7531;&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x63CF;&#x8FF0;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5728;<code>register</code>&#x4E2D;&#x5B9E;&#x4F8B;&#x5316;<code>Layer</code>&#x5BF9;&#x8C61;&#x540E;&#x5E76;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x5C06;&#x5176;&#x653E;&#x5165;<code>stack</code>&#x4E2D;&#xFF0C;&#x800C;&#x662F;&#x6267;&#x884C;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x64CD;&#x4F5C;&#x4EE5;&#x540E;&#x624D;&#x5C06;&#x5176;&#x63A8;&#x5165;<code>stack</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(this.params).forEach(function (param) {
  route.param(param, this.params[param])
}, this)

stack.push(route) // &#x88C5;&#x8F7D;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.params).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">param</span>) </span>{
  route.param(param, <span class="hljs-keyword">this</span>.params[param])
}, <span class="hljs-keyword">this</span>)

stack.push(route) <span class="hljs-comment">// &#x88C5;&#x8F7D;</span></code></pre><p>&#x8FD9;&#x91CC;&#x662F;&#x7528;&#x4F5C;&#x6DFB;&#x52A0;&#x9488;&#x5BF9;&#x67D0;&#x4E2A;<code>URL</code>&#x53C2;&#x6570;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5904;&#x7406;&#x7684;&#xFF0C;&#x4E0E;<code>router.param</code>&#x4E24;&#x8005;&#x5173;&#x8054;&#x6027;&#x5F88;&#x5F3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.param = function (param, middleware) {
  this.params[param] = middleware
  this.stack.forEach(function (route) {
    route.param(param, middleware)
  })
  return this
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.param = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">param, middleware</span>) </span>{
  <span class="hljs-keyword">this</span>.params[param] = middleware
  <span class="hljs-keyword">this</span>.stack.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">route</span>) </span>{
    route.param(param, middleware)
  })
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
}</code></pre><p>&#x4E24;&#x8005;&#x64CD;&#x4F5C;&#x7C7B;&#x4F3C;&#xFF0C;&#x524D;&#x8005;&#x7528;&#x4E8E;&#x5BF9;&#x65B0;&#x589E;&#x7684;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x6DFB;&#x52A0;&#x6240;&#x6709;&#x7684;<code>param</code>&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x800C;&#x540E;&#x8005;&#x7528;&#x4E8E;&#x9488;&#x5BF9;&#x73B0;&#x6709;&#x7684;&#x6240;&#x6709;&#x8DEF;&#x7531;&#x6DFB;&#x52A0;<code>param</code>&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x56E0;&#x4E3A;&#x5728;<code>router.param</code>&#x4E2D;&#x6709;&#x7740;<code>this.params[param] = XXX</code>&#x7684;&#x8D4B;&#x503C;&#x64CD;&#x4F5C;&#x3002;<br>&#x8FD9;&#x6837;&#x5728;&#x540E;&#x7EED;&#x7684;&#x65B0;&#x589E;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x4E2D;&#xFF0C;&#x76F4;&#x63A5;&#x5FAA;&#x73AF;<code>this.params</code>&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4E86;&#x3002;</p><p><code>router.param</code>&#x7684;&#x64CD;&#x4F5C;&#x5728;&#x6587;&#x6863;&#x4E2D;&#x4E5F;&#x6709;&#x4ECB;&#x7ECD;&#xFF0C;<a href="https://github.com/alexmingoia/koa-router/blob/master/README.md#routerparamparam-middleware--router" rel="nofollow noreferrer" target="_blank">&#x6587;&#x6863;&#x5730;&#x5740;</a><br>&#x5927;&#x81F4;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x505A;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x6821;&#x9A8C;&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0D;&#x8FC7;&#x56E0;&#x4E3A;&#x5728;<code>layer.param</code>&#x4E2D;&#x6709;&#x4E86;&#x4E00;&#x4E9B;<a href="https://github.com/alexmingoia/koa-router/blob/master/lib/layer.js#L197" rel="nofollow noreferrer" target="_blank">&#x7279;&#x6B8A;&#x7684;&#x5904;&#x7406;</a>&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E0D;&#x5FC5;&#x62C5;&#x5FC3;<code>param</code>&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;<code>layer</code>&#x4F1A;&#x4FDD;&#x8BC1;<code>param</code>&#x4E00;&#x5B9A;&#x662F;&#x65E9;&#x4E8E;&#x4F9D;&#x8D56;&#x8FD9;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.register(&apos;/list/:id&apos;, [&apos;GET&apos;], (ctx, next) =&gt; {
  ctx.body = `hello: ${ctx.name}`
})

router.param(&apos;id&apos;, (param, ctx, next) =&gt; {
  console.log(`got id: ${param}`)
  ctx.name = &apos;Niko&apos;
  next()
})

router.param(&apos;id&apos;, (param, ctx, next) =&gt; {
  console.log(&apos;param2&apos;)
  next()
})


// &gt; curl /list/1
// got id: 1
// param2
// hello: Niko" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.register(<span class="hljs-string">&apos;/list/:id&apos;</span>, [<span class="hljs-string">&apos;GET&apos;</span>], (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">`hello: <span class="hljs-subst">${ctx.name}</span>`</span>
})

router.param(<span class="hljs-string">&apos;id&apos;</span>, (param, ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`got id: <span class="hljs-subst">${param}</span>`</span>)
  ctx.name = <span class="hljs-string">&apos;Niko&apos;</span>
  next()
})

router.param(<span class="hljs-string">&apos;id&apos;</span>, (param, ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;param2&apos;</span>)
  next()
})


<span class="hljs-comment">// &gt; curl /list/1</span>
<span class="hljs-comment">// got id: 1</span>
<span class="hljs-comment">// param2</span>
<span class="hljs-comment">// hello: Niko</span></code></pre><h4>&#x6700;&#x5E38;&#x7528;&#x7684;get/post&#x4E4B;&#x7C7B;&#x7684;&#x5FEB;&#x6377;&#x65B9;&#x5F0F;</h4><p>&#x4EE5;&#x53CA;&#x8BF4;&#x5B8C;&#x4E86;&#x4E0A;&#x8FB9;&#x7684;&#x57FA;&#x7840;&#x65B9;&#x6CD5;<code>register</code>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6765;&#x770B;&#x4E0B;&#x66B4;&#x9732;&#x7ED9;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x51E0;&#x4E2A;<code>router.verb</code>&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// get|put|post|patch|delete|del
// &#x5FAA;&#x73AF;&#x6CE8;&#x518C;&#x591A;&#x4E2A;METHOD&#x7684;&#x5FEB;&#x6377;&#x65B9;&#x5F0F;
methods.forEach(function (method) {
  Router.prototype[method] = function (name, path, middleware) {
    let middleware

    if (typeof path === &apos;string&apos; || path instanceof RegExp) {
      middleware = Array.prototype.slice.call(arguments, 2)
    } else {
      middleware = Array.prototype.slice.call(arguments, 1)
      path = name
      name = null
    }

    this.register(path, [method], middleware, {
      name: name
    })

    return this
  }
})

Router.prototype.del = Router.prototype[&apos;delete&apos;] // &#x4EE5;&#x53CA;&#x6700;&#x540E;&#x7684;&#x4E00;&#x4E2A;&#x522B;&#x540D;&#x5904;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;del&#x5E76;&#x4E0D;&#x662F;&#x6709;&#x6548;&#x7684;METHOD" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// get|put|post|patch|delete|del</span>
<span class="hljs-comment">// &#x5FAA;&#x73AF;&#x6CE8;&#x518C;&#x591A;&#x4E2A;METHOD&#x7684;&#x5FEB;&#x6377;&#x65B9;&#x5F0F;</span>
methods.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method</span>) </span>{
  Router.prototype[method] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">name, path, middleware</span>) </span>{
    <span class="hljs-keyword">let</span> middleware

    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> path === <span class="hljs-string">&apos;string&apos;</span> || path <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">RegExp</span>) {
      middleware = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">2</span>)
    } <span class="hljs-keyword">else</span> {
      middleware = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>, <span class="hljs-number">1</span>)
      path = name
      name = <span class="hljs-literal">null</span>
    }

    <span class="hljs-keyword">this</span>.register(path, [method], middleware, {
      <span class="hljs-attr">name</span>: name
    })

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
  }
})

Router.prototype.del = Router.prototype[<span class="hljs-string">&apos;delete&apos;</span>] <span class="hljs-comment">// &#x4EE5;&#x53CA;&#x6700;&#x540E;&#x7684;&#x4E00;&#x4E2A;&#x522B;&#x540D;&#x5904;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;del&#x5E76;&#x4E0D;&#x662F;&#x6709;&#x6548;&#x7684;METHOD</span></code></pre><p>&#x4EE4;&#x4EBA;&#x5931;&#x671B;&#x7684;&#x662F;&#xFF0C;<code>verb</code>&#x65B9;&#x6CD5;&#x5C06;&#x5927;&#x91CF;&#x7684;<code>opts</code>&#x53C2;&#x6570;&#x90FD;&#x780D;&#x6389;&#x4E86;&#xFF0C;&#x9ED8;&#x8BA4;&#x53EA;&#x7559;&#x4E0B;&#x4E86;&#x4E00;&#x4E2A;<code>name</code>&#x5B57;&#x6BB5;&#x3002;<br>&#x53EA;&#x662F;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x5904;&#x7406;&#x4E86;&#x4E00;&#x4E0B;&#x547D;&#x540D;<code>name</code>&#x8DEF;&#x7531;&#x76F8;&#x5173;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;&#x8C03;&#x7528;<code>register</code>&#x5B8C;&#x6210;&#x64CD;&#x4F5C;&#x3002;</p><h4>router.use-Router&#x5185;&#x90E8;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</h4><p>&#x4EE5;&#x53CA;&#x4E0A;&#x6587;&#x4E2D;&#x4E5F;&#x63D0;&#x5230;&#x7684;<code>router.use</code>&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4F7F;&#x7528;<code>use</code>&#x6CE8;&#x518C;&#x4E2D;&#x95F4;&#x4EF6;&#x5206;&#x4E3A;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p><ol><li>&#x666E;&#x901A;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;</li><li>&#x5C06;&#x73B0;&#x6709;&#x7684;<code>router</code>&#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x4E2D;&#x95F4;&#x4EF6;&#x4F20;&#x5165;</li></ol><h5>&#x666E;&#x901A;&#x7684;use</h5><p>&#x8FD9;&#x91CC;&#x662F;<code>use</code>&#x65B9;&#x6CD5;&#x7684;&#x5173;&#x952E;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.use = function () {
  var router = this
  middleware.forEach(function (m) {
    if (m.router) { // &#x8FD9;&#x91CC;&#x662F;&#x901A;&#x8FC7;`router.routes()`&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;
      m.router.stack.forEach(function (nestedLayer) {
        if (path) nestedLayer.setPrefix(path)
        if (router.opts.prefix) nestedLayer.setPrefix(router.opts.prefix) // &#x8C03;&#x7528;`use`&#x7684;Router&#x5B9E;&#x4F8B;&#x7684;`prefix`
        router.stack.push(nestedLayer)
      })

      if (router.params) {
        Object.keys(router.params).forEach(function (key) {
          m.router.param(key, router.params[key])
        })
      }
    } else { // &#x666E;&#x901A;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6CE8;&#x518C;
      router.register(path || &apos;(.*)&apos;, [], m, { end: false, ignoreCaptures: !hasPath })
    }
  })
}

// &#x5728;routes&#x65B9;&#x6CD5;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x6B65;&#x64CD;&#x4F5C;
Router.prototype.routes = Router.prototype.middleware = function () {
  function dispatch() {
    // ...
  }

  dispatch.router = this // &#x5C06;router&#x5B9E;&#x4F8B;&#x8D4B;&#x503C;&#x7ED9;&#x4E86;&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;

  return dispatch
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.use = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">this</span>
  middleware.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">m</span>) </span>{
    <span class="hljs-keyword">if</span> (m.router) { <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x901A;&#x8FC7;`router.routes()`&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;</span>
      m.router.stack.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">nestedLayer</span>) </span>{
        <span class="hljs-keyword">if</span> (path) nestedLayer.setPrefix(path)
        <span class="hljs-keyword">if</span> (router.opts.prefix) nestedLayer.setPrefix(router.opts.prefix) <span class="hljs-comment">// &#x8C03;&#x7528;`use`&#x7684;Router&#x5B9E;&#x4F8B;&#x7684;`prefix`</span>
        router.stack.push(nestedLayer)
      })

      <span class="hljs-keyword">if</span> (router.params) {
        <span class="hljs-built_in">Object</span>.keys(router.params).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
          m.router.param(key, router.params[key])
        })
      }
    } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// &#x666E;&#x901A;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6CE8;&#x518C;</span>
      router.register(path || <span class="hljs-string">&apos;(.*)&apos;</span>, [], m, { <span class="hljs-attr">end</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">ignoreCaptures</span>: !hasPath })
    }
  })
}

<span class="hljs-comment">// &#x5728;routes&#x65B9;&#x6CD5;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x6B65;&#x64CD;&#x4F5C;</span>
Router.prototype.routes = Router.prototype.middleware = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  }

  dispatch.router = <span class="hljs-keyword">this</span> <span class="hljs-comment">// &#x5C06;router&#x5B9E;&#x4F8B;&#x8D4B;&#x503C;&#x7ED9;&#x4E86;&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;</span>

  <span class="hljs-keyword">return</span> dispatch
}</code></pre><p>&#x7B2C;&#x4E00;&#x79CD;&#x662F;&#x6BD4;&#x8F83;&#x5E38;&#x89C4;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x53EF;&#x9009;&#x7684;<code>path</code>&#xFF0C;&#x6765;&#x8FDB;&#x884C;&#x6CE8;&#x518C;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x4E0D;&#x8FC7;&#x6709;&#x4E00;&#x70B9;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;<code>.use(&apos;path&apos;)</code>&#x8FD9;&#x6837;&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x4E2D;&#x95F4;&#x4EF6;&#x4E0D;&#x80FD;&#x72EC;&#x7ACB;&#x5B58;&#x5728;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x4E0E;&#x4E4B;&#x8DEF;&#x5F84;&#x76F8;&#x5339;&#x914D;&#x7684;&#x8DEF;&#x7531;&#x76D1;&#x542C;&#x5B58;&#x5728;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.use(&apos;/list&apos;, ctx =&gt; {
  // &#x5982;&#x679C;&#x53EA;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x65E0;&#x8BBA;&#x5982;&#x4F55;&#x4E5F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x7684;
})

// &#x5FC5;&#x987B;&#x8981;&#x5B58;&#x5728;&#x76F8;&#x540C;&#x8DEF;&#x5F84;&#x7684;`register`&#x56DE;&#x8C03;
router.get(&apos;/list&apos;, ctx =&gt; { })

app.use(router.routes())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.use(<span class="hljs-string">&apos;/list&apos;</span>, ctx =&gt; {
  <span class="hljs-comment">// &#x5982;&#x679C;&#x53EA;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x65E0;&#x8BBA;&#x5982;&#x4F55;&#x4E5F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x7684;</span>
})

<span class="hljs-comment">// &#x5FC5;&#x987B;&#x8981;&#x5B58;&#x5728;&#x76F8;&#x540C;&#x8DEF;&#x5F84;&#x7684;`register`&#x56DE;&#x8C03;</span>
router.get(<span class="hljs-string">&apos;/list&apos;</span>, ctx =&gt; { })

app.use(router.routes())</code></pre><p>&#x539F;&#x56E0;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><ol><li><code>.use</code>&#x548C;<code>.get</code>&#x90FD;&#x662F;&#x57FA;&#x4E8E;<code>.register</code>&#x6765;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x4F46;&#x662F;<code>.use</code>&#x5728;<code>methods</code>&#x53C2;&#x6570;&#x4E2D;&#x4F20;&#x9012;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x7A7A;&#x6570;&#x7EC4;</li><li>&#x5728;&#x4E00;&#x4E2A;&#x8DEF;&#x5F84;&#x88AB;&#x5339;&#x914D;&#x5230;&#x65F6;&#xFF0C;&#x4F1A;&#x5C06;&#x6240;&#x6709;&#x5339;&#x914D;&#x5230;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x7136;&#x540E;&#x68C0;&#x67E5;&#x5BF9;&#x5E94;&#x7684;<code>methods</code>&#xFF0C;&#x5982;&#x679C;<code>length !== 0</code>&#x5219;&#x4F1A;&#x5BF9;&#x5F53;&#x524D;&#x5339;&#x914D;&#x7EC4;&#x6807;&#x8BB0;&#x4E00;&#x4E2A;<code>flag</code></li><li>&#x5728;&#x6267;&#x884C;&#x4E2D;&#x95F4;&#x4EF6;&#x4E4B;&#x524D;&#x4F1A;&#x5148;&#x5224;&#x65AD;&#x6709;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;<code>flag</code>&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5219;&#x8BF4;&#x660E;&#x8BE5;&#x8DEF;&#x5F84;&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x90FD;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;<code>METHOD</code>&#xFF0C;&#x5219;&#x4F1A;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#x8FDB;&#x5165;&#x5176;&#x4ED6;&#x6D41;&#x7A0B;&#xFF08;<em>&#x6BD4;&#x5982;allowedMethod</em>&#xFF09;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.match = function (path, method) {
  var layers = this.stack
  var layer
  var matched = {
    path: [],
    pathAndMethod: [],
    route: false
  }

  for (var len = layers.length, i = 0; i &lt; len; i++) {
    layer = layers[i]

    if (layer.match(path)) {
      matched.path.push(layer)

      if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
        matched.pathAndMethod.push(layer)

        // &#x53EA;&#x6709;&#x5728;&#x53D1;&#x73B0;&#x4E0D;&#x4E3A;&#x7A7A;&#x7684;`methods`&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x8BBE;&#x7F6E;`flag`
        if (layer.methods.length) matched.route = true
      }
    }
  }

  return matched
}

// &#x4EE5;&#x53CA;&#x5728;`routes`&#x4E2D;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;
Router.prototype.routes = Router.prototype.middleware = function () {
  function dispatch(ctx, next) {

    // &#x5982;&#x679C;&#x6CA1;&#x6709;`flag`&#xFF0C;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;
    if (!matched.route) return next()
  }

  return dispatch
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.match = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path, method</span>) </span>{
  <span class="hljs-keyword">var</span> layers = <span class="hljs-keyword">this</span>.stack
  <span class="hljs-keyword">var</span> layer
  <span class="hljs-keyword">var</span> matched = {
    <span class="hljs-attr">path</span>: [],
    <span class="hljs-attr">pathAndMethod</span>: [],
    <span class="hljs-attr">route</span>: <span class="hljs-literal">false</span>
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> len = layers.length, i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    layer = layers[i]

    <span class="hljs-keyword">if</span> (layer.match(path)) {
      matched.path.push(layer)

      <span class="hljs-keyword">if</span> (layer.methods.length === <span class="hljs-number">0</span> || ~layer.methods.indexOf(method)) {
        matched.pathAndMethod.push(layer)

        <span class="hljs-comment">// &#x53EA;&#x6709;&#x5728;&#x53D1;&#x73B0;&#x4E0D;&#x4E3A;&#x7A7A;&#x7684;`methods`&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x8BBE;&#x7F6E;`flag`</span>
        <span class="hljs-keyword">if</span> (layer.methods.length) matched.route = <span class="hljs-literal">true</span>
      }
    }
  }

  <span class="hljs-keyword">return</span> matched
}

<span class="hljs-comment">// &#x4EE5;&#x53CA;&#x5728;`routes`&#x4E2D;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;</span>
Router.prototype.routes = Router.prototype.middleware = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">ctx, next</span>) </span>{

    <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;`flag`&#xFF0C;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;</span>
    <span class="hljs-keyword">if</span> (!matched.route) <span class="hljs-keyword">return</span> next()
  }

  <span class="hljs-keyword">return</span> dispatch
}</code></pre><h5>&#x5C06;&#x5176;&#x4ED6;router&#x5B9E;&#x4F8B;&#x4F20;&#x9012;&#x8FDB;&#x6765;</h5><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x5982;&#x679C;&#x9009;&#x62E9;&#x4E86;<code>router.routes()</code>&#x6765;&#x65B9;&#x5F0F;&#x6765;&#x590D;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4F1A;&#x904D;&#x5386;&#x8BE5;&#x5B9E;&#x4F8B;&#x7684;&#x6240;&#x6709;&#x8DEF;&#x7531;&#xFF0C;&#x7136;&#x540E;&#x8BBE;&#x7F6E;<code>prefix</code>&#x3002;<br>&#x5E76;&#x5C06;&#x4FEE;&#x6539;&#x5B8C;&#x7684;<code>layer</code>&#x63A8;&#x51FA;&#x5230;&#x5F53;&#x524D;&#x7684;<code>router</code>&#x4E2D;&#x3002;<br>&#x90A3;&#x4E48;&#x73B0;&#x5728;&#x5C31;&#x8981;&#x6CE8;&#x610F;&#x4E86;&#xFF0C;&#x5728;&#x4E0A;&#x8FB9;&#x5176;&#x5B9E;&#x5DF2;&#x7ECF;&#x63D0;&#x5230;&#x4E86;&#xFF0C;<code>Layer</code>&#x7684;<code>setPrefix</code>&#x662F;&#x62FC;&#x63A5;&#x7684;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8986;&#x76D6;&#x7684;&#x3002;<br>&#x800C;<code>use</code>&#x662F;&#x4F1A;&#x64CD;&#x4F5C;<code>layer</code>&#x5BF9;&#x8C61;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x6837;&#x7684;&#x7528;&#x6CD5;&#x4F1A;&#x5BFC;&#x81F4;&#x4E4B;&#x524D;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x8DEF;&#x5F84;&#x4E5F;&#x88AB;&#x4FEE;&#x6539;&#x3002;<br>&#x800C;&#x4E14;&#x5982;&#x679C;&#x4F20;&#x5165;<code>use</code>&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5DF2;&#x7ECF;&#x6CE8;&#x518C;&#x5728;&#x4E86;<code>koa</code>&#x4E2D;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x76F8;&#x540C;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4F1A;&#x6267;&#x884C;&#x4E24;&#x6B21;(<em>&#x5982;&#x679C;&#x6709;&#x8C03;&#x7528;<code>next</code>&#x7684;&#x8BDD;</em>)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const middlewareRouter = new Router()
const routerPage1 = new Router({
  prefix: &apos;/page1&apos;
})

const routerPage2 = new Router({
  prefix: &apos;/page2&apos;
})

middlewareRouter.get(&apos;/list/:id&apos;, async (ctx, next) =&gt; {
  console.log(&apos;trigger middleware&apos;)
  ctx.body = `hi there.`
  await next()
})

routerPage1.use(middlewareRouter.routes())
routerPage2.use(middlewareRouter.routes())

app.use(middlewareRouter.routes())
app.use(routerPage1.routes())
app.use(routerPage2.routes())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> middlewareRouter = <span class="hljs-keyword">new</span> Router()
<span class="hljs-keyword">const</span> routerPage1 = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&apos;/page1&apos;</span>
})

<span class="hljs-keyword">const</span> routerPage2 = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&apos;/page2&apos;</span>
})

middlewareRouter.get(<span class="hljs-string">&apos;/list/:id&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;trigger middleware&apos;</span>)
  ctx.body = <span class="hljs-string">`hi there.`</span>
  <span class="hljs-keyword">await</span> next()
})

routerPage1.use(middlewareRouter.routes())
routerPage2.use(middlewareRouter.routes())

app.use(middlewareRouter.routes())
app.use(routerPage1.routes())
app.use(routerPage2.routes())</code></pre><p>&#x5C31;&#x50CF;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F1A;&#x6709;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x6700;&#x7EC8;&#x6709;&#x6548;&#x7684;&#x8BBF;&#x95EE;&#x8DEF;&#x5F84;&#x4E3A;<code>/page2/page1/list/1</code>&#xFF0C;&#x56E0;&#x4E3A;<code>prefix</code>&#x4F1A;&#x62FC;&#x63A5;&#x800C;&#x975E;&#x8986;&#x76D6;</li><li>&#x5F53;&#x6211;&#x4EEC;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x8C03;&#x7528;<code>next</code>&#x4EE5;&#x540E;&#xFF0C;<code>console.log</code>&#x4F1A;&#x8FDE;&#x7EED;&#x8F93;&#x51FA;&#x4E09;&#x6B21;&#xFF0C;&#x56E0;&#x4E3A;&#x6240;&#x6709;&#x7684;<code>routes</code>&#x90FD;&#x662F;&#x52A8;&#x6001;&#x7684;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;<code>prefix</code>&#x90FD;&#x88AB;&#x4FEE;&#x6539;&#x4E3A;&#x4E86;<code>/page2/page1</code></li></ol><p><strong>&#x4E00;&#x5B9A;&#x8981;&#x5C0F;&#x5FC3;&#x4F7F;&#x7528;&#xFF0C;&#x4E0D;&#x8981;&#x8BA4;&#x4E3A;&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#x7684;&#x590D;&#x7528;</strong></p><h3 id="articleHeader5">&#x8BF7;&#x6C42;&#x7684;&#x5904;&#x7406;</h3><p>&#x4EE5;&#x53CA;&#xFF0C;&#x7EC8;&#x4E8E;&#x6765;&#x5230;&#x4E86;&#x6700;&#x540E;&#x4E00;&#x6B65;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x6765;&#x4E86;&#x4EE5;&#x540E;&#xFF0C;<code>Router</code>&#x662F;&#x600E;&#x6837;&#x5904;&#x7406;&#x7684;&#x3002;<br>&#x4E00;&#x4E2A;<code>Router</code>&#x5B9E;&#x4F8B;&#x53EF;&#x4EE5;&#x629B;&#x51FA;&#x4E24;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x6CE8;&#x518C;&#x5230;<code>koa</code>&#x4E0A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(router.routes())
app.use(router.allowedMethods())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">app.use(router.routes())
app.use(router.allowedMethods())</code></pre><p><code>routes</code>&#x8D1F;&#x8D23;&#x4E3B;&#x8981;&#x7684;&#x903B;&#x8F91;&#x3002;<br><code>allowedMethods</code>&#x8D1F;&#x8D23;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x540E;&#x7F6E;&#x7684;<code>METHOD</code>&#x68C0;&#x67E5;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;</p><p><code>allowedMethods</code>&#x6CA1;&#x4EC0;&#x4E48;&#x597D;&#x8BF4;&#x7684;&#xFF0C;&#x5C31;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x7684;<code>method</code>&#x8FDB;&#x884C;&#x7684;&#x4E00;&#x4E9B;&#x6821;&#x9A8C;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#x3002;<br>&#x800C;&#x4E0A;&#x8FB9;&#x4ECB;&#x7ECD;&#x7684;&#x5F88;&#x591A;&#x65B9;&#x6CD5;&#x5176;&#x5B9E;&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x6700;&#x7EC8;&#x7684;<code>routes</code>&#x670D;&#x52A1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.routes = Router.prototype.middleware = function () {
  var router = this

  var dispatch = function dispatch(ctx, next) {
    var path = router.opts.routerPath || ctx.routerPath || ctx.path
    var matched = router.match(path, ctx.method)
    var layerChain, layer, i

    if (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path)
    } else {
      ctx.matched = matched.path
    }

    ctx.router = router

    if (!matched.route) return next()

    var matchedLayers = matched.pathAndMethod
    var mostSpecificLayer = matchedLayers[matchedLayers.length - 1]
    ctx._matchedRoute = mostSpecificLayer.path
    if (mostSpecificLayer.name) {
      ctx._matchedRouteName = mostSpecificLayer.name
    }

    layerChain = matchedLayers.reduce(function(memo, layer) {
      memo.push(function(ctx, next) {
        ctx.captures = layer.captures(path, ctx.captures)
        ctx.params = layer.params(path, ctx.captures, ctx.params)
        ctx.routerName = layer.name
        return next()
      })
      return memo.concat(layer.stack)
    }, [])

    return compose(layerChain)(ctx, next)
  };

  dispatch.router = this

  return dispatch
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.routes = Router.prototype.middleware = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> router = <span class="hljs-keyword">this</span>

  <span class="hljs-keyword">var</span> dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dispatch</span>(<span class="hljs-params">ctx, next</span>) </span>{
    <span class="hljs-keyword">var</span> path = router.opts.routerPath || ctx.routerPath || ctx.path
    <span class="hljs-keyword">var</span> matched = router.match(path, ctx.method)
    <span class="hljs-keyword">var</span> layerChain, layer, i

    <span class="hljs-keyword">if</span> (ctx.matched) {
      ctx.matched.push.apply(ctx.matched, matched.path)
    } <span class="hljs-keyword">else</span> {
      ctx.matched = matched.path
    }

    ctx.router = router

    <span class="hljs-keyword">if</span> (!matched.route) <span class="hljs-keyword">return</span> next()

    <span class="hljs-keyword">var</span> matchedLayers = matched.pathAndMethod
    <span class="hljs-keyword">var</span> mostSpecificLayer = matchedLayers[matchedLayers.length - <span class="hljs-number">1</span>]
    ctx._matchedRoute = mostSpecificLayer.path
    <span class="hljs-keyword">if</span> (mostSpecificLayer.name) {
      ctx._matchedRouteName = mostSpecificLayer.name
    }

    layerChain = matchedLayers.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">memo, layer</span>) </span>{
      memo.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ctx, next</span>) </span>{
        ctx.captures = layer.captures(path, ctx.captures)
        ctx.params = layer.params(path, ctx.captures, ctx.params)
        ctx.routerName = layer.name
        <span class="hljs-keyword">return</span> next()
      })
      <span class="hljs-keyword">return</span> memo.concat(layer.stack)
    }, [])

    <span class="hljs-keyword">return</span> compose(layerChain)(ctx, next)
  };

  dispatch.router = <span class="hljs-keyword">this</span>

  <span class="hljs-keyword">return</span> dispatch
}</code></pre><p>&#x9996;&#x5148;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>koa-router</code>&#x540C;&#x65F6;&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x522B;&#x540D;<code>middleware</code>&#x6765;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x529F;&#x80FD;&#x3002;<br>&#x4EE5;&#x53CA;&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x6700;&#x7EC8;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x624D;&#x662F;&#x771F;&#x6B63;&#x88AB;&#x6302;&#x5728;&#x5230;<code>koa</code>&#x4E0A;&#x7684;&#x3002;<br><code>koa</code>&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x662F;&#x7EAF;&#x7CB9;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4E0D;&#x7BA1;&#x4EC0;&#x4E48;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x6240;&#x5305;&#x542B;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br><strong>&#x6240;&#x4EE5;&#x4E0D;&#x5EFA;&#x8BAE;&#x4E3A;&#x4E86;&#x4F7F;&#x7528;<code>prefix</code>&#x800C;&#x521B;&#x5EFA;&#x591A;&#x4E2A;<code>Router</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x5728;<code>koa</code>&#x4E0A;&#x6302;&#x8F7D;&#x591A;&#x4E2A;<code>dispatch</code>&#x7528;&#x6765;&#x68C0;&#x67E5;URL&#x662F;&#x5426;&#x7B26;&#x5408;&#x89C4;&#x5219;</strong></p><p>&#x8FDB;&#x5165;&#x4E2D;&#x95F4;&#x4EF6;&#x4EE5;&#x540E;&#x4F1A;&#x8FDB;&#x884C;URL&#x7684;&#x5224;&#x65AD;&#xFF0C;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x4E0A;&#x8FB9;&#x63D0;&#x5230;&#x7684;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x505A;<code>foraward</code>&#x5B9E;&#x73B0;&#x7684;&#x5730;&#x65B9;&#x3002;<br>&#x5339;&#x914D;&#x8C03;&#x7528;&#x7684;&#x662F;<code>router.match</code>&#x65B9;&#x6CD5;&#xFF0C;&#x867D;&#x8BF4;&#x770B;&#x4F3C;&#x8D4B;&#x503C;&#x662F;<code>matched.path</code>&#xFF0C;&#x800C;&#x5B9E;&#x9645;&#x4E0A;&#x5728;<code>match</code>&#x65B9;&#x6CD5;&#x7684;&#x5B9E;&#x73B0;&#x4E2D;&#xFF0C;&#x91CC;&#x8FB9;&#x5168;&#x90E8;&#x662F;&#x5339;&#x914D;&#x5230;&#x7684;<code>Layer</code>&#x5B9E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Router.prototype.match = function (path, method) {
  var layers = this.stack // &#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x83B7;&#x53D6;&#x7684;Router&#x5B9E;&#x4F8B;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;layer&#x5BF9;&#x8C61;
  var layer
  var matched = {
    path: [],
    pathAndMethod: [],
    route: false
  }

  for (var len = layers.length, i = 0; i &lt; len; i++) {
    layer = layers[i]

    if (layer.match(path)) { // &#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6B63;&#x5219;&#x5339;&#x914D;
      matched.path.push(layer)

      if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
        // &#x5C06;&#x6709;&#x6548;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x63A8;&#x5165;
        matched.pathAndMethod.push(layer)

        // &#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;METHOD
        if (layer.methods.length) matched.route = true
      }
    }
  }

  return matched
}

// &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6B63;&#x5219;&#x5339;&#x914D;
Layer.prototype.match = function (path) {
  return this.regexp.test(path)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">Router.prototype.match = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path, method</span>) </span>{
  <span class="hljs-keyword">var</span> layers = <span class="hljs-keyword">this</span>.stack <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x5C31;&#x662F;&#x83B7;&#x53D6;&#x7684;Router&#x5B9E;&#x4F8B;&#x4E2D;&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;layer&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">var</span> layer
  <span class="hljs-keyword">var</span> matched = {
    <span class="hljs-attr">path</span>: [],
    <span class="hljs-attr">pathAndMethod</span>: [],
    <span class="hljs-attr">route</span>: <span class="hljs-literal">false</span>
  }

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> len = layers.length, i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    layer = layers[i]

    <span class="hljs-keyword">if</span> (layer.match(path)) { <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6B63;&#x5219;&#x5339;&#x914D;</span>
      matched.path.push(layer)

      <span class="hljs-keyword">if</span> (layer.methods.length === <span class="hljs-number">0</span> || ~layer.methods.indexOf(method)) {
        <span class="hljs-comment">// &#x5C06;&#x6709;&#x6548;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x63A8;&#x5165;</span>
        matched.pathAndMethod.push(layer)

        <span class="hljs-comment">// &#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;METHOD</span>
        <span class="hljs-keyword">if</span> (layer.methods.length) matched.route = <span class="hljs-literal">true</span>
      }
    }
  }

  <span class="hljs-keyword">return</span> matched
}

<span class="hljs-comment">// &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x6B63;&#x5219;&#x5339;&#x914D;</span>
Layer.prototype.match = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.regexp.test(path)
}</code></pre><p>&#x800C;&#x4E4B;&#x6240;&#x4EE5;&#x4F1A;&#x5B58;&#x5728;&#x8BF4;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;<code>ctx.matched</code>&#x6765;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x5BF9;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x8D4B;&#x503C;&#x3002;<br>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;&#x4E0A;&#x8FB9;&#x4E5F;&#x63D0;&#x5230;&#x8FC7;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;<code>koa</code>&#x5B9E;&#x4F8B;&#x53EF;&#x80FD;&#x4F1A;&#x6CE8;&#x518C;&#x591A;&#x4E2A;<code>koa-router</code>&#x5B9E;&#x4F8B;&#x3002;<br>&#x8FD9;&#x5C31;&#x5BFC;&#x81F4;&#x4E00;&#x4E2A;<code>router</code>&#x5B9E;&#x4F8B;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x540E;&#x7EED;&#x53EF;&#x80FD;&#x8FD8;&#x4F1A;&#x6709;&#x5176;&#x4ED6;&#x7684;<code>router</code>&#x5B9E;&#x4F8B;&#x4E5F;&#x547D;&#x4E2D;&#x4E86;&#x67D0;&#x4E2A;<code>URL</code>&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x4F1A;&#x4FDD;&#x8BC1;<code>matched</code>&#x59CB;&#x7EC8;&#x662F;&#x5728;&#x7D2F;&#x52A0;&#x7684;&#xFF0C;&#x800C;&#x975E;&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;&#x8986;&#x76D6;&#x3002;</p><blockquote><strong><code>path</code>&#x4E0E;<code>pathAndMethod</code>&#x90FD;&#x662F;<code>match</code>&#x8FD4;&#x56DE;&#x7684;&#x4E24;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x4E24;&#x8005;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;<code>path</code>&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x5339;&#x914D;URL&#x6210;&#x529F;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x800C;<code>pathAndMethod</code>&#x5219;&#x662F;&#x5339;&#x914D;URL&#x4E14;&#x5339;&#x914D;&#x5230;METHOD&#x7684;&#x6570;&#x636E;</strong></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router1 = new Router()
const router2 = new Router()

router1.post(&apos;/&apos;, _ =&gt; {})

router1.get(&apos;/&apos;, async (ctx, next) =&gt; {
  ctx.redirectBody = &apos;hi&apos;
  console.log(`trigger router1, matched length: ${ctx.matched.length}`)
  await next()
})

router2.get(&apos;/&apos;, async (ctx, next) =&gt; {
  ctx.redirectBody = &apos;hi&apos;
  console.log(`trigger router2, matched length: ${ctx.matched.length}`)
  await next()
})

app.use(router1.routes())
app.use(router2.routes())

// &gt;  curl http://127.0.0.1:8888/
// =&gt; trigger router1, matched length: 2
// =&gt; trigger router2, matched length: 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router1 = <span class="hljs-keyword">new</span> Router()
<span class="hljs-keyword">const</span> router2 = <span class="hljs-keyword">new</span> Router()

router1.post(<span class="hljs-string">&apos;/&apos;</span>, _ =&gt; {})

router1.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.redirectBody = <span class="hljs-string">&apos;hi&apos;</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`trigger router1, matched length: <span class="hljs-subst">${ctx.matched.length}</span>`</span>)
  <span class="hljs-keyword">await</span> next()
})

router2.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.redirectBody = <span class="hljs-string">&apos;hi&apos;</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`trigger router2, matched length: <span class="hljs-subst">${ctx.matched.length}</span>`</span>)
  <span class="hljs-keyword">await</span> next()
})

app.use(router1.routes())
app.use(router2.routes())

<span class="hljs-comment">// &gt;  curl http://127.0.0.1:8888/</span>
<span class="hljs-comment">// =&gt; trigger router1, matched length: 2</span>
<span class="hljs-comment">// =&gt; trigger router2, matched length: 3</span></code></pre><p>&#x5173;&#x4E8E;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x5728;<code>koa-router</code>&#x4E2D;&#x4E5F;&#x4F7F;&#x7528;&#x4E86;<code>koa-compose</code>&#x6765;&#x5408;&#x5E76;&#x6D0B;&#x8471;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matchedLayers = matched.pathAndMethod

layerChain = matchedLayers.reduce(function(memo, layer) {
  memo.push(function(ctx, next) {
    ctx.captures = layer.captures(path, ctx.captures)
    ctx.params = layer.params(path, ctx.captures, ctx.params)
    ctx.routerName = layer.name
    return next()
  })
  return memo.concat(layer.stack)
}, [])

return compose(layerChain)(ctx, next)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> matchedLayers = matched.pathAndMethod

layerChain = matchedLayers.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">memo, layer</span>) </span>{
  memo.push(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ctx, next</span>) </span>{
    ctx.captures = layer.captures(path, ctx.captures)
    ctx.params = layer.params(path, ctx.captures, ctx.params)
    ctx.routerName = layer.name
    <span class="hljs-keyword">return</span> next()
  })
  <span class="hljs-keyword">return</span> memo.concat(layer.stack)
}, [])

<span class="hljs-keyword">return</span> compose(layerChain)(ctx, next)</code></pre><p>&#x8FD9;&#x5768;&#x4EE3;&#x7801;&#x4F1A;&#x5728;&#x6240;&#x6709;&#x5339;&#x914D;&#x5230;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4E4B;&#x524D;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>ctx</code>&#x5C5E;&#x6027;&#x8D4B;&#x503C;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x64CD;&#x4F5C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;<code>reduce</code>&#x7684;&#x6267;&#x884C;&#x4F1A;&#x8BA9;&#x6D0B;&#x8471;&#x6A21;&#x578B;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x51FD;&#x6570;&#x6570;&#x91CF;&#x81F3;&#x5C11;<code>X2</code>&#x3002;<br><strong>layer&#x4E2D;&#x53EF;&#x80FD;&#x5305;&#x542B;&#x591A;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4E0D;&#x8981;&#x5FD8;&#x4E86;<code>middleware</code>&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x5728;<code>reduce</code>&#x4E2D;&#x4F7F;&#x7528;<code>concat</code>&#x800C;&#x975E;<code>push</code></strong><br>&#x56E0;&#x4E3A;&#x8981;&#x5728;&#x6BCF;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x6267;&#x884C;&#x4E4B;&#x524D;&#xFF0C;&#x4FEE;&#x6539;<code>ctx</code>&#x4E3A;&#x672C;&#x6B21;&#x4E2D;&#x95F4;&#x4EF6;&#x89E6;&#x53D1;&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x4FE1;&#x606F;&#x3002;<br>&#x5305;&#x62EC;&#x5339;&#x914D;&#x5230;&#x7684;URL&#x53C2;&#x6570;&#xFF0C;&#x4EE5;&#x53CA;&#x5F53;&#x524D;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;<code>name</code>&#x4E4B;&#x7C7B;&#x7684;&#x4FE1;&#x606F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  layer1[0], // &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1
  layer1[1], // &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;2
  layer2[0]  // &#x7B2C;&#x4E8C;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1
]

// =&gt;

[
  (ctx, next) =&gt; {
    ctx.params = layer1.params // &#x7B2C;&#x4E00;&#x4E2A;register&#x5BF9;&#x5E94;&#x4FE1;&#x606F;&#x7684;&#x8D4B;&#x503C;  
    return next()
  },
  layer1[0], // &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1
  layer1[1], // &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;2
  (ctx, next) =&gt; {
    ctx.params = layer2.params // &#x7B2C;&#x4E8C;&#x4E2A;register&#x5BF9;&#x5E94;&#x4FE1;&#x606F;&#x7684;&#x8D4B;&#x503C;  
    return next()
  },
  layer2[0]  // &#x7B2C;&#x4E8C;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">[
  layer1[<span class="hljs-number">0</span>], <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1</span>
  layer1[<span class="hljs-number">1</span>], <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;2</span>
  layer2[<span class="hljs-number">0</span>]  <span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1</span>
]

<span class="hljs-comment">// =&gt;</span>

[
  <span class="hljs-function">(<span class="hljs-params">ctx, next</span>) =&gt;</span> {
    ctx.params = layer1.params <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;register&#x5BF9;&#x5E94;&#x4FE1;&#x606F;&#x7684;&#x8D4B;&#x503C;  </span>
    <span class="hljs-keyword">return</span> next()
  },
  layer1[<span class="hljs-number">0</span>], <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1</span>
  layer1[<span class="hljs-number">1</span>], <span class="hljs-comment">// &#x7B2C;&#x4E00;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;2</span>
  (ctx, next) =&gt; {
    ctx.params = layer2.params <span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x4E2A;register&#x5BF9;&#x5E94;&#x4FE1;&#x606F;&#x7684;&#x8D4B;&#x503C;  </span>
    <span class="hljs-keyword">return</span> next()
  },
  layer2[<span class="hljs-number">0</span>]  <span class="hljs-comment">// &#x7B2C;&#x4E8C;&#x4E2A;register&#x4E2D;&#x5BF9;&#x5E94;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;1</span>
]</code></pre><p>&#x5728;<code>routes</code>&#x6700;&#x540E;&#xFF0C;&#x4F1A;&#x8C03;&#x7528;<code>koa-compose</code>&#x6765;&#x5408;&#x5E76;<code>reduce</code>&#x6240;&#x751F;&#x6210;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x6570;&#x7EC4;&#xFF0C;&#x4EE5;&#x53CA;&#x7528;&#x5230;&#x4E86;&#x4E4B;&#x524D;&#x5728;<code>koa-compose</code>&#x4E2D;&#x63D0;&#x5230;&#x4E86;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53EF;&#x9009;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x505A;&#x6D0B;&#x8471;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#x6700;&#x7EC8;&#x7684;&#x56DE;&#x8C03;&#x5904;&#x7406;&#x3002;</p><hr><h2 id="articleHeader6">&#x5C0F;&#x8BB0;</h2><p>&#x81F3;&#x6B64;&#xFF0C;<code>koa-router</code>&#x7684;&#x4F7F;&#x547D;&#x5C31;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x8DEF;&#x7531;&#x7684;&#x6CE8;&#x518C;&#xFF0C;&#x4EE5;&#x53CA;&#x8DEF;&#x7531;&#x7684;&#x76D1;&#x542C;&#x5904;&#x7406;&#x3002;<br>&#x5728;&#x9605;&#x8BFB;<code>koa-router</code>&#x7684;&#x6E90;&#x7801;&#x8FC7;&#x7A0B;&#x4E2D;&#x611F;&#x5230;&#x5F88;&#x8FF7;&#x60D1;&#xFF1A;</p><ul><li>&#x660E;&#x660E;&#x4EE3;&#x7801;&#x4E2D;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x5728;&#x6587;&#x6863;&#x4E2D;&#x5C31;&#x6CA1;&#x6709;&#x4F53;&#x73B0;&#x51FA;&#x6765;&#x5462;&#x3002;</li><li>&#x5982;&#x679C;&#x6587;&#x6863;&#x4E2D;&#x4E0D;&#x5199;&#x660E;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x6765;&#x7528;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x8981;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x6709;&#x5BF9;&#x5E94;&#x7684;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;</li></ul><p>&#x4E24;&#x4E2A;&#x6700;&#x7B80;&#x5355;&#x7684;&#x4E3E;&#x8BC1;&#xFF1A;</p><ol><li>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4FEE;&#x6539;<code>ctx.routerPath</code>&#x6765;&#x5B9E;&#x73B0;<code>forward</code>&#x529F;&#x80FD;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x6587;&#x6863;&#x4E2D;&#x4E0D;&#x4F1A;&#x544A;&#x8BC9;&#x4F60;</li><li>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>router.register(path, [&apos;GET&apos;, &apos;POST&apos;])</code>&#x6765;&#x5FEB;&#x901F;&#x7684;&#x76D1;&#x542C;&#x591A;&#x4E2A;<code>METHOD</code>&#xFF0C;&#x4F46;&#x662F;<code>register</code>&#x88AB;&#x6807;&#x8BB0;&#x4E3A;&#x4E86;<code>@private</code></li></ol><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p><ul><li><a href="https://github.com/alexmingoia/koa-router/blob/master/README.md" rel="nofollow noreferrer" target="_blank">koa-router | docs</a></li><li><a href="https://github.com/pillarjs/path-to-regexp/blob/master/Readme.md" rel="nofollow noreferrer" target="_blank">path-to-regexp | docs</a></li></ul><p>&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x5728;&#x4ED3;&#x5E93;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;&#xFF1A;<a href="https://github.com/jiasm/notebook/blob/master/labs/demo/node/learning-koa-router" rel="nofollow noreferrer" target="_blank">learning-koa-router</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa源码阅读[2]-koa-router

## 原文链接
[https://segmentfault.com/a/1190000015946606](https://segmentfault.com/a/1190000015946606)


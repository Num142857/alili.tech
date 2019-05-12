---
title: 'koa源码阅读[3]-koa-send与它的衍生(static)'
hidden: true
categories: [reprint]
slug: d1dd4ab0
date: 2018-11-15 02:30:08
---

{{< raw >}}
<p><code>koa</code>&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x7684;&#x7B2C;&#x56DB;&#x7BC7;&#xFF0C;&#x6D89;&#x53CA;&#x5230;&#x5411;&#x63A5;&#x53E3;&#x8BF7;&#x6C42;&#x65B9;&#x63D0;&#x4F9B;&#x6587;&#x4EF6;&#x6570;&#x636E;&#x3002;</p><blockquote>&#x7B2C;&#x4E00;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015724787">koa&#x6E90;&#x7801;&#x9605;&#x8BFB;-0</a><br>&#x7B2C;&#x4E8C;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015810835">koa&#x6E90;&#x7801;&#x9605;&#x8BFB;-1-koa&#x4E0E;koa-compose</a><br>&#x7B2C;&#x4E09;&#x7BC7;&#xFF1A;<a href="https://segmentfault.com/a/1190000015946606">koa&#x6E90;&#x7801;&#x9605;&#x8BFB;-2-koa-router</a></blockquote><p>&#x5904;&#x7406;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x662F;&#x4E00;&#x4E2A;&#x7E41;&#x7410;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x56E0;&#x4E3A;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x90FD;&#x662F;&#x6765;&#x81EA;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x80AF;&#x5B9A;&#x4E0D;&#x80FD;&#x653E;&#x5F00;&#x6240;&#x6709;&#x6743;&#x9650;&#x8BA9;&#x63A5;&#x53E3;&#x6765;&#x8BFB;&#x53D6;&#x3002;<br>&#x5404;&#x79CD;&#x8DEF;&#x5F84;&#x7684;&#x6821;&#x9A8C;&#xFF0C;&#x6743;&#x9650;&#x7684;&#x5339;&#x914D;&#xFF0C;&#x90FD;&#x662F;&#x9700;&#x8981;&#x8003;&#x8651;&#x5230;&#x7684;&#x5730;&#x65B9;&#x3002;<br>&#x800C;<code>koa-send</code>&#x548C;<code>koa-static</code>&#x5C31;&#x662F;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x8FD9;&#x4E9B;&#x7E41;&#x7410;&#x4E8B;&#x60C5;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br><code>koa-send</code>&#x662F;<code>koa-static</code>&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;<code>NPM</code>&#x7684;&#x754C;&#x9762;&#x4E0A;&#x770B;&#x5230;&#xFF0C;<code>static</code>&#x7684;<code>dependencies</code>&#x4E2D;&#x5305;&#x542B;&#x4E86;<code>koa-send</code>&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbfQgh?w=1238&amp;h=500" src="https://static.alili.tech/img/bVbfQgh?w=1238&amp;h=500" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p><code>koa-send</code>&#x4E3B;&#x8981;&#x662F;&#x7528;&#x4E8E;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x5904;&#x7406;&#x9759;&#x6001;&#x6587;&#x4EF6;&#xFF0C;&#x4E0E;<code>koa-router</code>&#x4E4B;&#x7C7B;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x5B83;&#x5E76;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6CE8;&#x5165;&#x5230;<code>app.use</code>&#x4E2D;&#x7684;&#x3002;<br>&#x800C;&#x662F;&#x5728;&#x67D0;&#x4E9B;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x4F20;&#x5165;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x7684;<code>Context</code>&#x53CA;&#x6587;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x7136;&#x540E;&#x5B9E;&#x73B0;&#x529F;&#x80FD;&#x3002;</p><p><em><a href="https://github.com/koajs/send" rel="nofollow noreferrer">koa-send&#x7684;GitHub&#x5730;&#x5740;</a></em></p><h2>&#x539F;&#x751F;&#x7684;&#x6587;&#x4EF6;&#x8BFB;&#x53D6;&#x3001;&#x4F20;&#x8F93;&#x65B9;&#x5F0F;</h2><p>&#x5728;<code>Node</code>&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;&#x539F;&#x751F;&#x7684;<code>fs</code>&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x6570;&#x636E;&#x4F20;&#x8F93;&#xFF0C;&#x5927;&#x81F4;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><pre><code class="javascript">const fs      = require(&apos;fs&apos;)
const Koa     = require(&apos;koa&apos;)
const Router  = require(&apos;koa-router&apos;)

const app     = new Koa()
const router  = new Router()
const file    = &apos;./test.log&apos;
const port    = 12306

router.get(&apos;/log&apos;, ctx =&gt; {
  const data = fs.readFileSync(file).toString()
  ctx.body = data
})

app.use(router.routes())
app.listen(port, () =&gt; console.log(`Server run as http://127.0.0.1:${port}`))</code></pre><p><em>&#x6216;&#x8005;&#x7528;<code>createReadStream</code>&#x4EE3;&#x66FF;<code>readFileSync</code>&#x4E5F;&#x662F;&#x53EF;&#x884C;&#x7684;&#xFF0C;&#x533A;&#x522B;&#x4F1A;&#x5728;&#x4E0B;&#x8FB9;&#x63D0;&#x5230;</em></p><p>&#x8FD9;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x793A;&#x4F8B;&#x4EC5;&#x9488;&#x5BF9;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8981;&#x8BFB;&#x53D6;&#x7684;&#x6587;&#x4EF6;&#x662F;&#x6709;&#x5F88;&#x591A;&#x4E2A;&#xFF0C;&#x751A;&#x81F3;&#x4E8E;&#x53EF;&#x80FD;&#x662F;&#x901A;&#x8FC7;&#x63A5;&#x53E3;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#x5F88;&#x96BE;&#x4FDD;&#x8BC1;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E00;&#x5B9A;&#x662F;&#x771F;&#x5B9E;&#x5B58;&#x5728;&#x7684;&#xFF0C;&#x800C;&#x4E14;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x8FD8;&#x9700;&#x8981;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x6743;&#x9650;&#x8BBE;&#x7F6E;&#xFF0C;&#x9632;&#x6B62;&#x4E00;&#x4E9B;&#x654F;&#x611F;&#x6587;&#x4EF6;&#x88AB;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x3002;</p><pre><code class="javascript">router.get(&apos;/file&apos;, ctx =&gt; {
  const { fileName } = ctx.query
  const path = path.resolve(&apos;./XXX&apos;, fileName)
  // &#x8FC7;&#x6EE4;&#x9690;&#x85CF;&#x6587;&#x4EF6;
  if (path.startsWith(&apos;.&apos;)) {
    ctx.status = 404
    return
  }

  // &#x5224;&#x65AD;&#x6587;&#x4EF6;&#x662F;&#x5426;&#x5B58;&#x5728;
  if (!fs.existsSync(path)) {
    ctx.status = 404
    return
  }

  // balabala

  const rs = fs.createReadStream(path)
  ctx.body = rs // koa&#x505A;&#x4E86;&#x9488;&#x5BF9;stream&#x7C7B;&#x578B;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x8BE6;&#x60C5;&#x53EF;&#x4EE5;&#x770B;&#x4E4B;&#x524D;&#x7684;koa&#x7BC7;
})</code></pre><p>&#x6DFB;&#x52A0;&#x4E86;&#x5404;&#x79CD;&#x903B;&#x8F91;&#x5224;&#x65AD;&#x4EE5;&#x540E;&#xFF0C;&#x8BFB;&#x53D6;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x5C31;&#x53D8;&#x5F97;&#x5B89;&#x5168;&#x4E0D;&#x5C11;&#xFF0C;&#x53EF;&#x662F;&#x8FD9;&#x4E5F;&#x53EA;&#x662F;&#x5728;&#x4E00;&#x4E2A;<code>router</code>&#x4E2D;&#x505A;&#x7684;&#x5904;&#x7406;&#x3002;<br>&#x5982;&#x679C;&#x6709;&#x591A;&#x4E2A;&#x63A5;&#x53E3;&#x90FD;&#x4F1A;&#x8FDB;&#x884C;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;&#x8BFB;&#x53D6;&#xFF0C;&#x52BF;&#x5FC5;&#x4F1A;&#x5B58;&#x5728;&#x5927;&#x91CF;&#x7684;&#x91CD;&#x590D;&#x903B;&#x8F91;&#xFF0C;&#x6240;&#x4EE5;&#x5C06;&#x5176;&#x63D0;&#x70BC;&#x4E3A;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x51FD;&#x6570;&#x5C06;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x9009;&#x62E9;&#x3002;</p><h2>koa-send&#x7684;&#x65B9;&#x5F0F;</h2><p>&#x8FD9;&#x5C31;&#x662F;<code>koa-send</code>&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x4E86;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x5C01;&#x88C5;&#x975E;&#x5E38;&#x5B8C;&#x5584;&#x7684;&#x5904;&#x7406;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x8FD9;&#x91CC;&#x662F;&#x4E24;&#x4E2A;&#x6700;&#x57FA;&#x7840;&#x7684;&#x4F7F;&#x7528;&#x4F8B;&#x5B50;&#xFF1A;</p><pre><code class="javascript">const path = require(&apos;path&apos;)
const send = require(&apos;koa-send&apos;)

// &#x9488;&#x5BF9;&#x67D0;&#x4E2A;&#x8DEF;&#x5F84;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#x83B7;&#x53D6;
router.get(&apos;/file&apos;, async ctx =&gt; {
  await send(ctx, ctx.query.path, {
    root: path.resolve(__dirname, &apos;./public&apos;)
  })
})

// &#x9488;&#x5BF9;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x83B7;&#x53D6;
router.get(&apos;/index&apos;, async ctx =&gt; {
  await send(ctx, &apos;./public/index.log&apos;)
})</code></pre><p>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;<code>simple-send.js</code>&#x4E3A;&#x6267;&#x884C;&#x6587;&#x4EF6;&#xFF1A;</p><pre><code class="bash">.
&#x251C;&#x2500;&#x2500; public
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; a.log
&#x2502;&#xA0;&#xA0; &#x251C;&#x2500;&#x2500; b.log
&#x2502;&#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index.log
&#x2514;&#x2500;&#x2500; simple-send.js</code></pre><p>&#x4F7F;&#x7528;<code>/file?path=XXX</code>&#x5C31;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x6613;&#x7684;&#x8BBF;&#x95EE;&#x5230;<code>public</code>&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#x3002;<br>&#x4EE5;&#x53CA;&#x8BBF;&#x95EE;<code>/index</code>&#x5C31;&#x53EF;&#x4EE5;&#x62FF;&#x5230;<code>/public/index.log</code>&#x6587;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><h2>koa-send&#x63D0;&#x4F9B;&#x7684;&#x529F;&#x80FD;</h2><p><code>koa-send</code>&#x63D0;&#x4F9B;&#x4E86;&#x5F88;&#x591A;&#x4FBF;&#x6C11;&#x7684;&#x9009;&#x9879;&#xFF0C;&#x9664;&#x53BB;&#x5E38;&#x7528;&#x7684;<code>root</code>&#x4EE5;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x5927;&#x6982;&#x5C0F;&#x5341;&#x4E2A;&#x7684;&#x9009;&#x9879;&#x53EF;&#x4F9B;&#x4F7F;&#x7528;&#xFF1A;</p><table><thead><tr><th align="center">options</th><th align="center">type</th><th align="center">default</th><th align="left">desc</th></tr></thead><tbody><tr><td align="center"><code>maxage</code></td><td align="center"><code>Number</code></td><td align="center"><code>0</code></td><td align="left">&#x8BBE;&#x7F6E;&#x6D4F;&#x89C8;&#x5668;&#x53EF;&#x4EE5;&#x7F13;&#x5B58;&#x7684;&#x6BEB;&#x79D2;&#x6570;&lt;br/&gt;&#x5BF9;&#x5E94;&#x7684;<code>Header</code>: <code>Cache-Control: max-age=XXX</code></td></tr><tr><td align="center"><code>immutable</code></td><td align="center"><code>Boolean</code></td><td align="center"><code>false</code></td><td align="left">&#x901A;&#x77E5;&#x6D4F;&#x89C8;&#x5668;&#x8BE5;URL&#x5BF9;&#x5E94;&#x7684;&#x8D44;&#x6E90;&#x4E0D;&#x53EF;&#x53D8;&#xFF0C;&#x53EF;&#x4EE5;&#x65E0;&#x9650;&#x671F;&#x7684;&#x7F13;&#x5B58;&lt;br/&gt;&#x5BF9;&#x5E94;&#x7684;<code>Header</code>: <code>Cache-Control: max-age=XXX, immutable</code></td></tr><tr><td align="center"><code>hidden</code></td><td align="center"><code>Boolean</code></td><td align="center"><code>false</code></td><td align="left">&#x662F;&#x5426;&#x652F;&#x6301;&#x9690;&#x85CF;&#x6587;&#x4EF6;&#x7684;&#x8BFB;&#x53D6;&lt;br/&gt;<code>.</code>&#x5F00;&#x5934;&#x7684;&#x6587;&#x4EF6;&#x88AB;&#x79F0;&#x4E3A;&#x9690;&#x85CF;&#x6587;&#x4EF6;</td></tr><tr><td align="center"><code>root</code></td><td align="center"><code>String</code></td><td align="center">-</td><td align="left">&#x8BBE;&#x7F6E;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x7684;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x4EFB;&#x4F55;&#x8BE5;&#x76EE;&#x5F55;&#x4E4B;&#x5916;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x662F;&#x7981;&#x6B62;&#x8BBF;&#x95EE;&#x7684;&#x3002;</td></tr><tr><td align="center"><code>index</code></td><td align="center"><code>String</code></td><td align="center">-</td><td align="left">&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x7684;&#x6587;&#x4EF6;&#x540D;&#xFF0C;&#x5728;&#x8BBF;&#x95EE;&#x76EE;&#x5F55;&#x7684;&#x65F6;&#x5019;&#x751F;&#x6548;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;&#x62FC;&#x63A5;&#x5230;&#x8DEF;&#x5F84;&#x540E;&#x8FB9; <strong>(&#x6B64;&#x5904;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x5F69;&#x86CB;)</strong></td></tr><tr><td align="center"><code>gzip</code></td><td align="center"><code>Boolean</code></td><td align="center"><code>true</code></td><td align="left">&#x5982;&#x679C;&#x8BBF;&#x95EE;&#x63A5;&#x53E3;&#x7684;&#x5BA2;&#x6237;&#x7AEF;&#x652F;&#x6301;<code>gzip</code>&#xFF0C;&#x5E76;&#x4E14;&#x5B58;&#x5728;<code>.gz</code>&#x540E;&#x7F00;&#x7684;&#x540C;&#x540D;&#x6587;&#x4EF6;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x4F20;&#x9012;<code>.gz</code>&#x6587;&#x4EF6;</td></tr><tr><td align="center"><code>brotli</code></td><td align="center"><code>Boolean</code></td><td align="center"><code>true</code></td><td align="left">&#x903B;&#x8F91;&#x540C;&#x4E0A;&#xFF0C;&#x5982;&#x679C;&#x652F;&#x6301;<code>brotli</code>&#x4E14;&#x5B58;&#x5728;<code>.br</code>&#x540E;&#x7F00;&#x7684;&#x540C;&#x540D;&#x6587;&#x4EF6;</td></tr><tr><td align="center"><code>format</code></td><td align="center"><code>Boolean</code></td><td align="center"><code>true</code></td><td align="left">&#x5F00;&#x542F;&#x4EE5;&#x540E;&#x4E0D;&#x4F1A;&#x5F3A;&#x8981;&#x6C42;&#x8DEF;&#x5F84;&#x7ED3;&#x5C3E;&#x7684;<code>/</code>&#xFF0C;<code>/path</code>&#x548C;<code>/path/</code>&#x8868;&#x793A;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x8DEF;&#x5F84; <strong>(&#x4EC5;&#x5728;<code>path</code>&#x662F;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x751F;&#x6548;)</strong></td></tr><tr><td align="center"><code>extensions</code></td><td align="center"><code>Array</code></td><td align="center"><code>false</code></td><td align="left">&#x5982;&#x679C;&#x4F20;&#x9012;&#x4E86;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x4F1A;&#x5C1D;&#x8BD5;&#x5C06;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;<code>item</code>&#x4F5C;&#x4E3A;&#x6587;&#x4EF6;&#x7684;&#x540E;&#x7F00;&#x8FDB;&#x884C;&#x5339;&#x914D;&#xFF0C;&#x5339;&#x914D;&#x5230;&#x54EA;&#x4E2A;&#x5C31;&#x8BFB;&#x53D6;&#x54EA;&#x4E2A;&#x6587;&#x4EF6;</td></tr><tr><td align="center"><code>setHeaders</code></td><td align="center"><code>Function</code></td><td align="center">-</td><td align="left">&#x7528;&#x6765;&#x624B;&#x52A8;&#x6307;&#x5B9A;&#x4E00;&#x4E9B;<code>Headers</code>&#xFF0C;&#x610F;&#x4E49;&#x4E0D;&#x5927;</td></tr></tbody></table><h3>&#x53C2;&#x6570;&#x4EEC;&#x7684;&#x5177;&#x4F53;&#x8868;&#x73B0;</h3><p>&#x6709;&#x4E9B;&#x53C2;&#x6570;&#x7684;&#x642D;&#x914D;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x795E;&#x5947;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x6709;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x4F1A;&#x5F71;&#x54CD;&#x5230;<code>Header</code>&#xFF0C;&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x662F;&#x7528;&#x6765;&#x4F18;&#x5316;&#x6027;&#x80FD;&#x7684;&#xFF0C;&#x7C7B;&#x4F3C;<code>gzip</code>&#x548C;<code>brotli</code>&#x7684;&#x9009;&#x9879;&#x3002;</p><p><code>koa-send</code>&#x7684;&#x4E3B;&#x8981;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x5206;&#x4E3A;&#x8FD9;&#x51E0;&#x5757;&#xFF1A;</p><ol><li><code>path</code>&#x8DEF;&#x5F84;&#x6709;&#x6548;&#x6027;&#x7684;&#x68C0;&#x67E5;</li><li><code>gzip</code>&#x7B49;&#x538B;&#x7F29;&#x903B;&#x8F91;&#x7684;&#x5E94;&#x7528;</li><li>&#x6587;&#x4EF6;&#x540E;&#x7F00;&#x3001;&#x9ED8;&#x8BA4;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x7684;&#x5339;&#x914D;</li><li>&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x6570;&#x636E;</li></ol><p>&#x5728;&#x51FD;&#x6570;&#x7684;&#x5F00;&#x5934;&#x90E8;&#x5206;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x903B;&#x8F91;&#xFF1A;</p><pre><code class="javascript">const resolvePath = require(&apos;resolve-path&apos;)
const {
  parse
} = require(&apos;path&apos;)

async function send (ctx, path. opts = {}) {
  const trailingSlash = path[path.length - 1] === &apos;/&apos;
  const index = opts.index

  // &#x6B64;&#x5904;&#x7701;&#x7565;&#x5404;&#x79CD;&#x53C2;&#x6570;&#x7684;&#x521D;&#x59CB;&#x503C;&#x8BBE;&#x7F6E;

  path = path.substr(parse(path).root.length)

  // ...

  // normalize path
  path = decode(path) // &#x5185;&#x90E8;&#x8C03;&#x7528;&#x7684;&#x662F;`decodeURIComponent`
  // &#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x8F6C;&#x4E49;&#x7684;&#x8DEF;&#x5F84;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x6B63;&#x5E38;&#x4F7F;&#x7528;&#x7684;

  if (index &amp;&amp; trailingSlash) path += index

  path = resolvePath(root, path)

  // hidden file support, ignore
  if (!hidden &amp;&amp; isHidden(root, path)) return
}

function isHidden (root, path) {
  path = path.substr(root.length).split(sep)
  for (let i = 0; i &lt; path.length; i++) {
    if (path[i][0] === &apos;.&apos;) return true
  }
  return false
}</code></pre><h3>&#x8DEF;&#x5F84;&#x68C0;&#x67E5;</h3><p>&#x9996;&#x5148;&#x662F;&#x5224;&#x65AD;&#x4F20;&#x5165;&#x7684;<code>path</code>&#x662F;&#x5426;&#x4E3A;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#xFF0C;_(&#x7ED3;&#x5C3E;&#x4E3A;<code>/</code>&#x4F1A;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;)_&#x3002;<br>&#x5982;&#x679C;&#x662F;&#x76EE;&#x5F55;&#xFF0C;&#x5E76;&#x4E14;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;<code>index</code>&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x4F1A;&#x5C06;<code>index</code>&#x62FC;&#x63A5;&#x5230;<code>path</code>&#x540E;&#x8FB9;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x5927;&#x6982;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><pre><code class="javascript">send(ctx, &apos;./public/&apos;, {
  index: &apos;index.js&apos;
})

// ./public/index.js</code></pre><p><a href="https://www.npmjs.com/package/resolve-path" rel="nofollow noreferrer">resolve-path</a> &#x662F;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x5904;&#x7406;&#x8DEF;&#x5F84;&#x7684;&#x5305;&#xFF0C;&#x7528;&#x6765;&#x5E2E;&#x52A9;&#x8FC7;&#x6EE4;&#x4E00;&#x4E9B;&#x5F02;&#x5E38;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x7C7B;&#x4F3C;<code>path//file</code>&#x3001;<code>/etc/XXX</code> &#x8FD9;&#x6837;&#x7684;&#x6076;&#x610F;&#x8DEF;&#x5F84;&#xFF0C;&#x5E76;&#x4E14;&#x4F1A;&#x8FD4;&#x56DE;&#x5904;&#x7406;&#x540E;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x3002;</p><p><code>isHidden</code>&#x7528;&#x6765;&#x5224;&#x65AD;&#x662F;&#x5426;&#x9700;&#x8981;&#x8FC7;&#x6EE4;&#x9690;&#x85CF;&#x6587;&#x4EF6;&#x3002;<br>&#x56E0;&#x4E3A;&#x4F46;&#x51E1;&#x662F;<code>.</code>&#x5F00;&#x5934;&#x7684;&#x6587;&#x4EF6;&#x90FD;&#x4F1A;&#x88AB;&#x8BA4;&#x4E3A;&#x9690;&#x85CF;&#x6587;&#x4EF6;&#xFF0C;&#x540C;&#x7406;&#x76EE;&#x5F55;&#x4F7F;&#x7528;<code>.</code>&#x5F00;&#x5934;&#x4E5F;&#x4F1A;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x9690;&#x85CF;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x6709;&#x4E86;<code>isHidden</code>&#x51FD;&#x6570;&#x7684;&#x5B9E;&#x73B0;&#x3002;</p><p><em>&#x5176;&#x5B9E;&#x6211;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x8FD9;&#x4E2A;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x6B63;&#x5219;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x7684;&#x95EE;&#x9898;&#x3002;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x8981;&#x5206;&#x5272;&#x4E3A;&#x6570;&#x7EC4;&#x5462;&#xFF1F;</em></p><pre><code class="javascript">function isHidden (root, path) {
  path = path.substr(root.length)

  return new RegExp(`${sep}\\.`).test(path)
}</code></pre><p><em>&#x5DF2;&#x7ECF;&#x7ED9;&#x793E;&#x533A;&#x63D0;&#x4EA4;&#x4E86;<code>PR</code>&#x3002;</em></p><h3>&#x538B;&#x7F29;&#x7684;&#x5F00;&#x542F;&#x4E0E;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x5904;&#x7406;</h3><p>&#x5728;&#x4E0A;&#x8FB9;&#x7684;&#x8FD9;&#x4E00;&#x5768;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5B8C;&#x4EE5;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5F97;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;_(&#x5982;&#x679C;&#x662F;&#x65E0;&#x6548;&#x8DEF;&#x5F84;&#xFF0C;<code>resolvePath</code>&#x4F1A;&#x76F4;&#x63A5;&#x629B;&#x51FA;&#x5F02;&#x5E38;)_<br>&#x63A5;&#x4E0B;&#x6765;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x6709;&#x53EF;&#x7528;&#x7684;&#x538B;&#x7F29;&#x6587;&#x4EF6;&#x4F7F;&#x7528;&#xFF0C;&#x6B64;&#x5904;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x903B;&#x8F91;&#xFF0C;&#x5C31;&#x662F;&#x7B80;&#x5355;&#x7684;<code>exists</code>&#x64CD;&#x4F5C;&#xFF0C;&#x4EE5;&#x53CA;<code>Content-Encoding</code>&#x7684;&#x4FEE;&#x6539; _(&#x7528;&#x4E8E;&#x5F00;&#x542F;&#x538B;&#x7F29;)_&#x3002;</p><p><strong>&#x540E;&#x7F00;&#x7684;&#x5339;&#x914D;&#xFF1A;</strong></p><pre><code class="javascript">if (extensions &amp;&amp; !/\.[^/]*$/.exec(path)) {
  const list = [].concat(extensions)
  for (let i = 0; i &lt; list.length; i++) {
    let ext = list[i]
    if (typeof ext !== &apos;string&apos;) {
      throw new TypeError(&apos;option extensions must be array of strings or false&apos;)
    }
    if (!/^\./.exec(ext)) ext = &apos;.&apos; + ext
    if (await fs.exists(path + ext)) {
      path = path + ext
      break
    }
  }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD9;&#x91CC;&#x7684;&#x904D;&#x5386;&#x662F;&#x5B8C;&#x5168;&#x6309;&#x7167;&#x6211;&#x4EEC;&#x8C03;&#x7528;<code>send</code>&#x662F;&#x4F20;&#x5165;&#x7684;&#x987A;&#x5E8F;&#x6765;&#x8D70;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x8FD8;&#x505A;&#x4E86;<code>.</code>&#x7B26;&#x53F7;&#x7684;&#x517C;&#x5BB9;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x8FD9;&#x6837;&#x7684;&#x8C03;&#x7528;&#x90FD;&#x662F;&#x6709;&#x6548;&#x7684;&#xFF1A;</p><pre><code class="javascript">await send(ctx, &apos;path&apos;, {
  extensions: [&apos;.js&apos;, &apos;ts&apos;, &apos;.tsx&apos;]
})</code></pre><p>&#x5982;&#x679C;&#x5728;&#x6DFB;&#x52A0;&#x4E86;&#x540E;&#x7F00;&#x4EE5;&#x540E;&#x80FD;&#x591F;&#x5339;&#x914D;&#x5230;&#x771F;&#x5B9E;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x8BA4;&#x4E3A;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x7136;&#x540E;&#x8FDB;&#x884C;&#x4E86;<code>break</code>&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6587;&#x6863;&#x4E2D;&#x6240;&#x8BF4;&#x7684;&#xFF1A;<code>First found is served.</code>&#x3002;</p><p>&#x5728;&#x7ED3;&#x675F;&#x8FD9;&#x90E8;&#x5206;&#x64CD;&#x4F5C;&#x4EE5;&#x540E;&#x4F1A;&#x8FDB;&#x884C;&#x76EE;&#x5F55;&#x7684;&#x68C0;&#x6D4B;&#xFF0C;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x8DEF;&#x5F84;&#x662F;&#x5426;&#x4E3A;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#xFF1A;</p><pre><code class="javascript">let stats
try {
  stats = await fs.stat(path)

  if (stats.isDirectory()) {
    if (format &amp;&amp; index) {
      path += &apos;/&apos; + index
      stats = await fs.stat(path)
    } else {
      return
    }
  }
} catch (err) {
  const notfound = [&apos;ENOENT&apos;, &apos;ENAMETOOLONG&apos;, &apos;ENOTDIR&apos;]
  if (notfound.includes(err.code)) {
    throw createError(404, err)
  }
  err.status = 500
  throw err
}</code></pre><h4>&#x4E00;&#x4E2A;&#x5C0F;&#x5F69;&#x86CB;</h4><p>&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x4E00;&#x4E2A;&#x5F88;&#x6709;&#x610F;&#x601D;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x5F53;&#x524D;&#x8DEF;&#x5F84;&#x662F;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#x4EE5;&#x540E;&#xFF0C;&#x5E76;&#x4E14;&#x660E;&#x786E;&#x6307;&#x5B9A;&#x4E86;<code>format</code>&#xFF0C;&#x90A3;&#x4E48;&#x8FD8;&#x4F1A;&#x518D;&#x5C1D;&#x8BD5;&#x62FC;&#x63A5;&#x4E00;&#x6B21;<code>index</code>&#x3002;<br>&#x8FD9;&#x5C31;&#x662F;&#x4E0A;&#x8FB9;&#x6240;&#x8BF4;&#x7684;&#x90A3;&#x4E2A;&#x5F69;&#x86CB;&#x4E86;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x7684;<code>public</code>&#x8DEF;&#x5F84;&#x7ED3;&#x6784;&#x957F;&#x5F97;&#x50CF;&#x8FD9;&#x6837;&#x7684;&#x65F6;&#x5019;&#xFF1A;</p><pre><code class="bash">&#x2514;&#x2500;&#x2500; public
 &#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index
 &#xA0;&#xA0;  &#xA0;&#xA0; &#x2514;&#x2500;&#x2500; index # &#x5B9E;&#x9645;&#x7684;&#x6587;&#x4EF6; hello</code></pre><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x5F0F;&#x83B7;&#x53D6;&#x5230;&#x6700;&#x5E95;&#x5C42;&#x7684;&#x6587;&#x4EF6;&#x6570;&#x636E;&#xFF1A;</p><pre><code class="javascript">router.get(&apos;/surprises&apos;, async ctx =&gt; {
  await send(ctx, &apos;/&apos;, {
    root: &apos;./public&apos;,
    index: &apos;index&apos;
  })
})

// &gt; curl http://127.0.0.1:12306/surprises
// hello</code></pre><p>&#x8FD9;&#x91CC;&#x5C31;&#x7528;&#x5230;&#x4E86;&#x4E0A;&#x8FB9;&#x7684;&#x51E0;&#x4E2A;&#x903B;&#x8F91;&#x5904;&#x7406;&#xFF0C;&#x9996;&#x5148;&#x662F;<code>trailingSlash</code>&#x7684;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;&#x4EE5;<code>/</code>&#x7ED3;&#x5C3E;&#x4F1A;&#x62FC;&#x63A5;<code>index</code>&#xFF0C;&#x4EE5;&#x53CA;&#x5982;&#x679C;&#x5F53;&#x524D;<code>path</code>&#x5339;&#x914D;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x76EE;&#x5F55;&#x4EE5;&#x540E;&#xFF0C;&#x53C8;&#x4F1A;&#x62FC;&#x63A5;&#x4E00;&#x6B21;<code>index</code>&#x3002;<br>&#x6240;&#x4EE5;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;<code>/</code>&#x52A0;&#x4E0A;<code>index</code>&#x7684;&#x53C2;&#x6570;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x83B7;&#x53D6;&#x5230;<code>/index/index</code>&#x3002;<br><em>&#x4E00;&#x4E2A;&#x5C0F;&#x5C0F;&#x7684;&#x5F69;&#x86CB;&#xFF0C;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x5E94;&#x8BE5;&#x5F88;&#x5C11;&#x4F1A;&#x8FD9;&#x4E48;&#x73A9;</em></p><h3>&#x6700;&#x7EC8;&#x7684;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x64CD;&#x4F5C;</h3><p>&#x6700;&#x540E;&#x7EC8;&#x4E8E;&#x6765;&#x5230;&#x4E86;&#x6587;&#x4EF6;&#x8BFB;&#x53D6;&#x7684;&#x903B;&#x8F91;&#x5904;&#x7406;&#xFF0C;&#x9996;&#x5148;&#x5C31;&#x662F;&#x8C03;&#x7528;<code>setHeaders</code>&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><p>&#x56E0;&#x4E3A;&#x7ECF;&#x8FC7;&#x4E0A;&#x8FB9;&#x7684;&#x5C42;&#x5C42;&#x7B5B;&#x9009;&#xFF0C;&#x8FD9;&#x91CC;&#x62FF;&#x5230;&#x7684;<code>path</code>&#x548C;&#x4F60;&#x8C03;&#x7528;<code>send</code>&#x65F6;&#x4F20;&#x5165;&#x7684;<code>path</code>&#x4E0D;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x8DEF;&#x5F84;&#x3002;<br>&#x4E0D;&#x8FC7;&#x5012;&#x4E5F;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x5FC5;&#x987B;&#x5728;<code>setHeaders</code>&#x51FD;&#x6570;&#x4E2D;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5728;&#x51FD;&#x6570;&#x7ED3;&#x675F;&#x65F6;&#xFF0C;&#x5C06;&#x5B9E;&#x9645;&#x7684;<code>path</code>&#x8FD4;&#x56DE;&#x4E86;&#x51FA;&#x6765;&#x3002;<br>&#x6211;&#x4EEC;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x5728;<code>send</code>&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;&#xFF0C;&#x81F3;&#x4E8E;&#x5B98;&#x65B9;<code>readme</code>&#x4E2D;&#x6240;&#x5199;&#x7684;<code>and doing it after is too late because the headers are already sent.</code>&#x3002;<br>&#x8FD9;&#x4E2A;&#x4E0D;&#x9700;&#x8981;&#x62C5;&#x5FC3;&#xFF0C;&#x56E0;&#x4E3A;<code>koa</code>&#x7684;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x90FD;&#x662F;&#x653E;&#x5230;<code>ctx.body</code>&#x4E2D;&#x7684;&#xFF0C;&#x800C;<code>body</code>&#x7684;&#x89E3;&#x6790;&#x662F;&#x5728;&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x5168;&#x90E8;&#x6267;&#x884C;&#x5B8C;&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x8FDB;&#x884C;&#x5904;&#x7406;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x6240;&#x6709;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x90FD;&#x6267;&#x884C;&#x5B8C;&#x4EE5;&#x540E;&#x624D;&#x4F1A;&#x5F00;&#x59CB;&#x53D1;&#x9001;<code>http</code>&#x8BF7;&#x6C42;&#x4F53;&#xFF0C;&#x5728;&#x6B64;&#x4E4B;&#x524D;&#x8BBE;&#x7F6E;<code>Header</code>&#x90FD;&#x662F;&#x6709;&#x6548;&#x7684;&#x3002;</p><pre><code class="javascript">if (setHeaders) setHeaders(ctx.res, path, stats)

// stream
ctx.set(&apos;Content-Length&apos;, stats.size)
if (!ctx.response.get(&apos;Last-Modified&apos;)) ctx.set(&apos;Last-Modified&apos;, stats.mtime.toUTCString())
if (!ctx.response.get(&apos;Cache-Control&apos;)) {
  const directives = [&apos;max-age=&apos; + (maxage / 1000 | 0)]
  if (immutable) {
    directives.push(&apos;immutable&apos;)
  }
  ctx.set(&apos;Cache-Control&apos;, directives.join(&apos;,&apos;))
}
if (!ctx.type) ctx.type = type(path, encodingExt) // &#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x53D6;&#x51FA;&#x6587;&#x4EF6;&#x540E;&#x7F00;
ctx.body = fs.createReadStream(path)

return path</code></pre><p>&#x4EE5;&#x53CA;&#x5305;&#x62EC;&#x4E0A;&#x8FB9;&#x7684;<code>maxage</code>&#x548C;<code>immutable</code>&#x90FD;&#x662F;&#x5728;&#x8FD9;&#x91CC;&#x751F;&#x6548;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5982;&#x679C;<code>Cache-Control</code>&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x503C;&#x4E86;&#xFF0C;<code>koa-send</code>&#x662F;&#x4E0D;&#x4F1A;&#x53BB;&#x8986;&#x76D6;&#x7684;&#x3002;</p><h4>&#x4F7F;&#x7528;Stream&#x4E0E;&#x4F7F;&#x7528;readFile&#x7684;&#x533A;&#x522B;</h4><p>&#x5728;&#x6700;&#x540E;&#x7ED9;<code>body</code>&#x8D4B;&#x503C;&#x7684;&#x4F4D;&#x7F6E;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x662F;&#x4F7F;&#x7528;&#x7684;<code>Stream</code>&#x800C;&#x5E76;&#x975E;&#x662F;<code>readFile</code>&#xFF0C;&#x4F7F;&#x7528;<code>Stream</code>&#x8FDB;&#x884C;&#x4F20;&#x8F93;&#x80FD;&#x5E26;&#x6765;&#x81F3;&#x5C11;&#x4E24;&#x4E2A;&#x597D;&#x5904;&#xFF1A;</p><ol><li>&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5927;&#x6587;&#x4EF6;&#xFF0C;&#x5728;&#x8BFB;&#x53D6;&#x5B8C;&#x6210;&#x540E;&#x4F1A;&#x4E34;&#x65F6;&#x5B58;&#x653E;&#x5230;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5E76;&#x4E14;<code>toString</code>&#x662F;&#x6709;&#x957F;&#x5EA6;&#x9650;&#x5236;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x5DE8;&#x5927;&#x7684;&#x6587;&#x4EF6;&#xFF0C;<code>toString</code>&#x8C03;&#x7528;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#x7684;&#x3002;</li><li>&#x91C7;&#x7528;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x8FDB;&#x884C;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#xFF0C;&#x662F;&#x8981;&#x5728;&#x5168;&#x90E8;&#x7684;&#x6570;&#x636E;&#x90FD;&#x8BFB;&#x53D6;&#x5B8C;&#x6210;&#x540E;&#x518D;&#x8FD4;&#x56DE;&#x7ED9;&#x63A5;&#x53E3;&#x8C03;&#x7528;&#x65B9;&#xFF0C;&#x5728;&#x8BFB;&#x53D6;&#x6570;&#x636E;&#x7684;&#x671F;&#x95F4;&#xFF0C;&#x63A5;&#x53E3;&#x90FD;&#x662F;&#x5904;&#x4E8E;<code>Wait</code>&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x3002;</li></ol><p>&#x53EF;&#x4EE5;&#x505A;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;Demo&#xFF1A;</p><pre><code class="javascript">const http      = require(&apos;http&apos;)
const fs        = require(&apos;fs&apos;)
const filePath  = &apos;./test.log&apos;
  
http.createServer((req, res) =&gt; {
  if (req.url === &apos;/&apos;) {
    res.end(&apos;&lt;html&gt;&lt;/html&gt;&apos;)
  } else if (req.url === &apos;/sync&apos;) {
    const data = fs.readFileSync(filePath).toString()

    res.end(data)
  } else if (req.url === &apos;/pipe&apos;) {
    const rs = fs.createReadStream(filePath)

    rs.pipe(res)
  } else {
    res.end(&apos;404&apos;)
  }
}).listen(12306, () =&gt; console.log(&apos;server run as http://127.0.0.1:12306&apos;))</code></pre><p>&#x9996;&#x5148;&#x8BBF;&#x95EE;&#x9996;&#x9875;<code>http://127.0.0.1:12306/</code>&#x8FDB;&#x5165;&#x4E00;&#x4E2A;&#x7A7A;&#x7684;&#x9875;&#x9762; _(&#x4E3B;&#x8981;&#x662F;&#x61D2;&#x5F97;&#x641E;<code>CORS</code>&#x4E86;)_&#xFF0C;&#x7136;&#x540E;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x8C03;&#x7528;&#x4E24;&#x4E2A;<code>fetch</code>&#x5C31;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x8FD9;&#x6837;&#x7684;&#x5BF9;&#x6BD4;&#x7ED3;&#x679C;&#x4E86;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfQgf?w=2078&amp;h=1424" src="https://static.alili.tech/img/bVbfQgf?w=2078&amp;h=1424" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span><br><span class="img-wrap"><img data-src="/img/bVbfQgg?w=2078&amp;h=1424" src="https://static.alili.tech/img/bVbfQgg?w=2078&amp;h=1424" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x5728;&#x4E0B;&#x884C;&#x4F20;&#x8F93;&#x7684;&#x65F6;&#x95F4;&#x76F8;&#x5DEE;&#x65E0;&#x51E0;&#x7684;&#x540C;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;<code>readFileSync</code>&#x7684;&#x65B9;&#x5F0F;&#x4F1A;&#x589E;&#x52A0;&#x4E00;&#x5B9A;&#x65F6;&#x95F4;&#x7684;<code>Waiting</code>&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;&#x65F6;&#x95F4;&#x5C31;&#x662F;&#x670D;&#x52A1;&#x5668;&#x5728;&#x8FDB;&#x884C;&#x6587;&#x4EF6;&#x7684;&#x8BFB;&#x53D6;&#xFF0C;&#x65F6;&#x95F4;&#x957F;&#x77ED;&#x53D6;&#x51B3;&#x4E8E;&#x8BFB;&#x53D6;&#x7684;&#x6587;&#x4EF6;&#x5927;&#x5C0F;&#xFF0C;&#x4EE5;&#x53CA;&#x673A;&#x5668;&#x7684;&#x6027;&#x80FD;&#x3002;</p><h2>koa-static</h2><p><code>koa-static</code>&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;<code>koa-send</code>&#x7684;&#x6D45;&#x5C01;&#x88C5;&#x3002;<br>&#x56E0;&#x4E3A;&#x901A;&#x8FC7;&#x4E0A;&#x8FB9;&#x7684;&#x5B9E;&#x4F8B;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>send</code>&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x5728;&#x4E2D;&#x95F4;&#x4EF6;&#x4E2D;&#x8C03;&#x7528;&#x624D;&#x884C;&#x3002;<br>&#x624B;&#x52A8;&#x6307;&#x5B9A;<code>send</code>&#x5BF9;&#x5E94;&#x7684;<code>path</code>&#x4E4B;&#x7C7B;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8FD9;&#x4E9B;&#x4E5F;&#x662F;&#x5C5E;&#x4E8E;&#x91CD;&#x590D;&#x6027;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6240;&#x4EE5;<code>koa-static</code>&#x5C06;&#x8FD9;&#x4E9B;&#x903B;&#x8F91;&#x8FDB;&#x884C;&#x4E86;&#x4E00;&#x6B21;&#x5C01;&#x88C5;&#x3002;<br>&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76F4;&#x63A5;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x6765;&#x5B8C;&#x6210;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;&#x5904;&#x7406;&#xFF0C;&#x800C;&#x4E0D;&#x518D;&#x9700;&#x8981;&#x5173;&#x5FC3;&#x53C2;&#x6570;&#x7684;&#x8BFB;&#x53D6;&#x4E4B;&#x7C7B;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><pre><code class="javascript">const Koa = require(&apos;koa&apos;)
const app = new Koa()
app.use(require(&apos;koa-static&apos;)(root, opts))</code></pre><p><code>opts</code>&#x662F;&#x900F;&#x4F20;&#x5230;<code>koa-send</code>&#x4E2D;&#x7684;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x4F1A;&#x4F7F;&#x7528;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;<code>root</code>&#x6765;&#x8986;&#x76D6;<code>opts</code>&#x4E2D;&#x7684;<code>root</code>&#x3002;<br>&#x5E76;&#x4E14;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;&#x7EC6;&#x8282;&#x5316;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><ul><li>&#x9ED8;&#x8BA4;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>index.html</code></li></ul><pre><code class="javascript">if (opts.index !== false) opts.index = opts.index || &apos;index.html&apos;</code></pre><ul><li>&#x9ED8;&#x8BA4;&#x53EA;&#x9488;&#x5BF9;<code>HEAD</code>&#x548C;<code>GET</code>&#x4E24;&#x79CD;<code>METHOD</code></li></ul><pre><code class="javascript">if (ctx.method === &apos;HEAD&apos; || ctx.method === &apos;GET&apos;) {
  // ...
}</code></pre><ul><li>&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;<code>defer</code>&#x9009;&#x9879;&#x6765;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x5148;&#x6267;&#x884C;&#x5176;&#x4ED6;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;</li></ul><p>&#x5982;&#x679C;<code>defer</code>&#x4E3A;<code>false</code>&#xFF0C;&#x5219;&#x4F1A;&#x5148;&#x6267;&#x884C;<code>send</code>&#xFF0C;&#x4F18;&#x5148;&#x5339;&#x914D;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x3002;<br>&#x5426;&#x5219;&#x5219;&#x4F1A;&#x7B49;&#x5230;&#x5176;&#x4F59;&#x4E2D;&#x95F4;&#x4EF6;&#x5148;&#x6267;&#x884C;&#xFF0C;&#x786E;&#x5B9A;&#x5176;&#x4ED6;&#x4E2D;&#x95F4;&#x4EF6;&#x6CA1;&#x6709;&#x5904;&#x7406;&#x8BE5;&#x8BF7;&#x6C42;&#x624D;&#x4F1A;&#x53BB;&#x5BFB;&#x627E;&#x5BF9;&#x5E94;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x3002;<br>&#x53EA;&#x9700;&#x6307;&#x5B9A;<code>root</code>&#xFF0C;&#x5269;&#x4E0B;&#x7684;&#x5DE5;&#x4F5C;&#x4EA4;&#x7ED9;<code>koa-static</code>&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x65E0;&#x9700;&#x5173;&#x5FC3;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x5904;&#x7406;&#x4E86;&#x3002;</p><h2>&#x5C0F;&#x7ED3;</h2><p><code>koa-send</code>&#x4E0E;<code>koa-static</code>&#x7B97;&#x662F;&#x4E24;&#x4E2A;&#x975E;&#x5E38;&#x8F7B;&#x91CF;&#x7EA7;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x4E86;&#x3002;<br>&#x672C;&#x8EAB;&#x6CA1;&#x6709;&#x592A;&#x590D;&#x6742;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5C31;&#x662F;&#x4E00;&#x4E9B;&#x91CD;&#x590D;&#x7684;&#x903B;&#x8F91;&#x88AB;&#x63D0;&#x70BC;&#x6210;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x4E0D;&#x8FC7;&#x786E;&#x5B9E;&#x80FD;&#x591F;&#x51CF;&#x5C11;&#x5F88;&#x591A;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4EFB;&#x52A1;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x4EBA;&#x66F4;&#x4E13;&#x6CE8;&#x7684;&#x5173;&#x6CE8;&#x4E1A;&#x52A1;&#xFF0C;&#x800C;&#x975E;&#x8FD9;&#x4E9B;&#x8FB9;&#x8FB9;&#x89D2;&#x89D2;&#x7684;&#x529F;&#x80FD;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa源码阅读[3]-koa-send与它的衍生(static)

## 原文链接
[https://segmentfault.com/a/1190000016129808](https://segmentfault.com/a/1190000016129808)


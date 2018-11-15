---
title: 10分钟让你成为全栈工程师-koa快速入门
reprint: true
categories: reprint
abbrlink: b91d9f4d
date: 2018-11-03 10:03:44
---

{{% raw %}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x968F;&#x7740;&#x6280;&#x672F;&#x7684;&#x4E0D;&#x65AD;&#x53D1;&#x5C55;&#xFF0C;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#x4E5F;&#x88AB;&#x8D4B;&#x4E88;&#x4E86;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x7684;&#x804C;&#x8D23;&#x3002;&#x4E0D;&#x518D;&#x662F;&#x4ECE;&#x524D;&#x53EA;&#x9700;&#x8981;&#x5207;&#x4E2A;&#x56FE;&#xFF0C;&#x52A0;&#x4E2A;css&#x6837;&#x5F0F;&#x5C31;&#x80FD;&#x5B8C;&#x6210;&#x4EFB;&#x52A1;&#x7684;&#x5207;&#x56FE;&#x4ED4;&#x4E86;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x767B;&#x5F55;&#x6CE8;&#x518C;&#xFF0C;&#x80FD;&#x8BA9;&#x4F60;&#x5FEB;&#x901F;&#x4E0A;&#x624B;&#xFF0C;&#x6210;&#x4E3A;&#x4E00;&#x4E2A;&#x2018;&#x5C0F;&#x5168;&#x6808;&#x5DE5;&#x7A0B;&#x5E08;&#x2019;&#xFF0C;here we go &#xFF01;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726034" src="https://static.alili.tech/img/remote/1460000016726034" alt="15371488705139" title="15371488705139" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">koa&#x5FEB;&#x901F;&#x5F00;&#x59CB;</h2><h3 id="articleHeader2">&#x5B89;&#x88C5;</h3><ul><li>&#x56E0;&#x4E3A;node.js v7.6.x&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x652F;&#x6301;async/await&#x8BED;&#x6CD5;&#xFF0C;&#x6240;&#x4EE5;&#x8BF7;&#x4FDD;&#x8BC1;node&#x7684;&#x7248;&#x672C;&#x5728;7.6&#x4EE5;&#x4E0A;</li><li><p>&#x63A8;&#x8350;&#x4E00;&#x4E2A;node&#x7684;&#x591A;&#x7248;&#x672C;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#xFF1A;nvm&#x3002;&#x5982;&#x4F55;&#x5B89;&#x88C5;&#x8FD9;&#x91CC;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#xFF0C;&#x7F51;&#x4E0A;&#x7684;&#x6559;&#x7A0B;&#x6709;&#x5F88;&#x591A;</p><ul><li><a href="https://github.com/creationix/nvm" rel="nofollow noreferrer" target="_blank">https://github.com/creationix...</a></li></ul></li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// &#x521D;&#x59CB;&#x5316;package.json
npm init

// &#x5B89;&#x88C5;koa2 
npm install koa
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;package.json</span>
npm init

<span class="hljs-comment">// &#x5B89;&#x88C5;koa2 </span>
npm install koa
</code></pre><h3 id="articleHeader3">&#x4E00;&#x4E2A;hello world</h3><p>&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;index.js&#xFF0C;&#x6572;&#x4E0A;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//index.js

const Koa = require(&apos;koa&apos;)
const app = new Koa()

app.use( async (ctx, next) =&gt; {
  ctx.response.body = &apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x662F;&#x5185;&#x5730;&#x5434;&#x5F66;&#x7956;&apos;
})

app.listen(3333, ()=&gt;{
  console.log(&apos;server is running at http://localhost:3333&apos;)
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">//index.js</span>

<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

app.use( <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.response.body = <span class="hljs-string">&apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x662F;&#x5185;&#x5730;&#x5434;&#x5F66;&#x7956;&apos;</span>
})

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server is running at http://localhost:3333&apos;</span>)
})
</code></pre><p>&#x5728;&#x6211;&#x4EEC;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x6572;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node index.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js</code></pre><p>&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x5566;:</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726035" src="https://static.alili.tech/img/remote/1460000016726035" alt="15371507388772" title="15371507388772" style="cursor:pointer"></span></p><h2 id="articleHeader4">&#x51E0;&#x4E2A;&#x6838;&#x5FC3;&#x6982;&#x5FF5;</h2><h3 id="articleHeader5">&#x4E2D;&#x95F4;&#x4EF6;&#x597D;&#x57FA;&#x53CB;ctx&#x548C;next</h3><p>&#x5728;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;app.use&#x540E;&#x9762;&#x4F7F;&#x7528;&#x4E86;2&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<strong>ctx</strong>&#x548C;<strong>next</strong>&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E00;&#x4E2A;&#x8FD9;&#x54E5;&#x4FE9;&#x5230;&#x5E95;&#x5E72;&#x561B;&#x7684;</p><h4>ctx</h4><p>ctx&#x4F5C;&#x4E3A;&#x4E0A;&#x4E0B;&#x6587;&#x4F7F;&#x7528;&#xFF0C;Koa&#x5C06; node &#x7684; <strong>request</strong>, <strong>response</strong> &#x5BF9;&#x8C61;&#x5C01;&#x88C5;&#x8FDB;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x5BF9;&#x8C61;&#x3002;&#x5373;<strong>ctx.request</strong> &#x3001; <strong>ctx.response</strong>&#x3002;Koa &#x5185;&#x90E8;&#x53C8;&#x5BF9;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x7684;&#x5C5E;&#x6027;&#x6216;&#x8005;&#x65B9;&#x6CD5;&#x505A;&#x4E86;&#x4EE3;&#x7406;&#x64CD;&#x4F5C;&#xFF0C;&#x4F7F;&#x5F97;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7; ctx &#x83B7;&#x53D6;&#x3002;&#x6BD4;&#x5982;&#xFF0C;<strong>ctx.request.url</strong> &#x53EF;&#x4EE5;&#x5199;&#x6210; <strong>ctx.url</strong>&#x3002;</p><h4>next</h4><p>next &#x53C2;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06;&#x5904;&#x7406;&#x7684;&#x63A7;&#x5236;&#x6743;&#x8F6C;&#x4EA4;&#x7ED9;&#x4E0B;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726036" src="https://static.alili.tech/img/remote/1460000016726036" alt="15371520197565" title="15371520197565" style="cursor:pointer;display:inline"></span></p><p>&#x7ECF;&#x5178;&#x7684;&#x6D0B;&#x8471;&#x56FE;&#x6982;&#x5FF5;&#x80FD;&#x5F88;&#x597D;&#x7684;&#x89E3;&#x91CA;next&#x7684;&#x6267;&#x884C;&#xFF0C;&#x8BF7;&#x6C42;&#x4ECE;&#x6700;&#x5916;&#x5C42;&#x8FDB;&#x53BB;&#xFF0C;&#x53C8;&#x4ECE;&#x6700;&#x91CC;&#x5C42;&#x51FA;&#x6765;&#x3002;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;)
const app = new Koa()

app.use(async (ctx, next)=&gt;{
  let startTime = new Date().getTime()
  await next()
  let endTime = new Date().getTime()
  console.log(`&#x6B64;&#x6B21;&#x7684;&#x54CD;&#x5E94;&#x65F6;&#x95F4;&#x4E3A;&#xFF1A;${endTime - startTime}ms`)
})

app.use(async (ctx, next) =&gt; {
  console.log(&apos;111, &#x7136;&#x540E;doSomething&apos;)
  await next()
  console.log(&apos;111 end&apos;)
})

app.use(async (ctx, next) =&gt; {
  console.log(&apos;222, &#x7136;&#x540E;doSomething&apos;)
  await next()
  console.log(&apos;222 end&apos;)
})

app.use(async (ctx, next) =&gt; {
  console.log(&apos;333, &#x7136;&#x540E;doSomething&apos;)
  await next()
  console.log(&apos;333 end&apos;)
})

app.listen(3333, ()=&gt;{
  console.log(&apos;server is running at http://localhost:3333&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()

app.use(<span class="hljs-keyword">async</span> (ctx, next)=&gt;{
  <span class="hljs-keyword">let</span> startTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-keyword">let</span> endTime = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`&#x6B64;&#x6B21;&#x7684;&#x54CD;&#x5E94;&#x65F6;&#x95F4;&#x4E3A;&#xFF1A;<span class="hljs-subst">${endTime - startTime}</span>ms`</span>)
})

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;111, &#x7136;&#x540E;doSomething&apos;</span>)
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;111 end&apos;</span>)
})

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;222, &#x7136;&#x540E;doSomething&apos;</span>)
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;222 end&apos;</span>)
})

app.use(<span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;333, &#x7136;&#x540E;doSomething&apos;</span>)
  <span class="hljs-keyword">await</span> next()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;333 end&apos;</span>)
})

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server is running at http://localhost:3333&apos;</span>)
})</code></pre><p>&#x770B;&#x4E00;&#x4E0B;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726037" src="https://static.alili.tech/img/remote/1460000016726037" alt="15371528106452" title="15371528106452" style="cursor:pointer"></span></p><p>&#x5982;&#x679C;&#x5C06;<strong>&#x2018;222&#x2019;</strong>&#x51FD;&#x6570;&#x7684;next()&#x53BB;&#x6389;&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x53D1;&#x751F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726038" src="https://static.alili.tech/img/remote/1460000016726038" alt="15371529369320" title="15371529369320" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x540E;&#x9762;&#x7684;<strong>&#x2018;333&#x2019;</strong>&#x4E2D;&#x95F4;&#x4EF6;&#x76F4;&#x63A5;&#x4E0D;&#x6267;&#x884C;&#x4E86;&#x3002;&#x6240;&#x4EE5;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x987A;&#x5E8F;&#x5BF9;next&#x7684;&#x6267;&#x884C;&#x6709;&#x5F88;&#x5927;&#x7684;&#x5F71;&#x54CD;</p><h3 id="articleHeader6">&#x8DEF;&#x7531; koa-router</h3><p>&#x6211;&#x4EEC;&#x5E38;&#x7528;koa-router&#x6765;&#x5904;&#x7406;URL</p><p>&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i koa-router --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">npm i koa-router --save</code></pre><p>&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;)
const app = new Koa()
const Router = require(&apos;koa-router&apos;)

const router = new Router()

router.get(&apos;/&apos;, async (ctx, next) =&gt; {
  ctx.body = &apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;index&#x9875;&apos;
})

router.get(&apos;/user&apos;, async (ctx, next) =&gt; {
  ctx.body = &apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;user&#x9875;&apos;
})

router.get(&apos;/error&apos;, async (ctx, next) =&gt; {
  ctx.body = &apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;error&#x9875;&apos;
})

app.use(router.routes())

app.listen(3333, ()=&gt;{
  console.log(&apos;server is running at http://localhost:3333&apos;)
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;index&#x9875;&apos;</span>
})

router.get(<span class="hljs-string">&apos;/user&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;user&#x9875;&apos;</span>
})

router.get(<span class="hljs-string">&apos;/error&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;error&#x9875;&apos;</span>
})

app.use(router.routes())

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server is running at http://localhost:3333&apos;</span>)
})
</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000016726039" src="https://static.alili.tech/img/remote/1460000016726039" alt="15371540305250" title="15371540305250" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726040" src="https://static.alili.tech/img/remote/1460000016726040" alt="15371540448439" title="15371540448439" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726041" src="https://static.alili.tech/img/remote/1460000016726041" alt="15371540585094" title="15371540585094" style="cursor:pointer;display:inline"></span></p><p>koa-router&#x4E5F;&#x652F;&#x6301;&#x5D4C;&#x5957;&#x5199;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x603B;&#x8DEF;&#x7531;&#x88C5;&#x8F7D;&#x6240;&#x6709;&#x5B50;&#x8DEF;&#x7531;&#xFF0C;&#x4E5F;&#x975E;&#x5E38;&#x7684;&#x65B9;&#x4FBF;&#x3002;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;)
const app = new Koa()
const Router = require(&apos;koa-router&apos;)

// &#x5B50;&#x8DEF;&#x7531;1
let oneRouter = new Router()

oneRouter.get(&apos;/&apos;, async (ctx, next) =&gt; {
  ctx.body = &apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;oneRouter&#x9875;&apos;
})

// &#x5B50;&#x8DEF;&#x7531;2
let twoRouter = new Router()

twoRouter.get(&apos;/&apos;, async (ctx, next) =&gt; {
  ctx.body = &apos;&#x4F60;&#x597D;, &#x6211;&#x8FD9;&#x91CC;&#x662F;twoRouter&#x9875;&apos;
}).get(&apos;/home&apos;, async (ctx , next) =&gt; {
  ctx.body = &apos;&#x4F60;&#x597D;, &#x6211;&#x8FD9;&#x91CC;&#x662F;home&#x9875;&apos;
})

// &#x88C5;&#x8F7D;&#x6240;&#x6709;&#x5B50;&#x8DEF;&#x7531;
let indexRouter = new Router()

indexRouter.use(&apos;/one&apos;,oneRouter.routes(), oneRouter.allowedMethods())
indexRouter.use(&apos;/two&apos;,twoRouter.routes(), twoRouter.allowedMethods())

app
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())

app.listen(3333, ()=&gt;{
  console.log(&apos;server is running at http://localhost:3333&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)

<span class="hljs-comment">// &#x5B50;&#x8DEF;&#x7531;1</span>
<span class="hljs-keyword">let</span> oneRouter = <span class="hljs-keyword">new</span> Router()

oneRouter.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;&#x4F60;&#x597D;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x662F;oneRouter&#x9875;&apos;</span>
})

<span class="hljs-comment">// &#x5B50;&#x8DEF;&#x7531;2</span>
<span class="hljs-keyword">let</span> twoRouter = <span class="hljs-keyword">new</span> Router()

twoRouter.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;&#x4F60;&#x597D;, &#x6211;&#x8FD9;&#x91CC;&#x662F;twoRouter&#x9875;&apos;</span>
}).get(<span class="hljs-string">&apos;/home&apos;</span>, <span class="hljs-keyword">async</span> (ctx , next) =&gt; {
  ctx.body = <span class="hljs-string">&apos;&#x4F60;&#x597D;, &#x6211;&#x8FD9;&#x91CC;&#x662F;home&#x9875;&apos;</span>
})

<span class="hljs-comment">// &#x88C5;&#x8F7D;&#x6240;&#x6709;&#x5B50;&#x8DEF;&#x7531;</span>
<span class="hljs-keyword">let</span> indexRouter = <span class="hljs-keyword">new</span> Router()

indexRouter.use(<span class="hljs-string">&apos;/one&apos;</span>,oneRouter.routes(), oneRouter.allowedMethods())
indexRouter.use(<span class="hljs-string">&apos;/two&apos;</span>,twoRouter.routes(), twoRouter.allowedMethods())

app
  .use(indexRouter.routes())
  .use(indexRouter.allowedMethods())

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server is running at http://localhost:3333&apos;</span>)
})</code></pre><p>&#x770B;&#x4E00;&#x4E0B;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726042" src="https://static.alili.tech/img/remote/1460000016726042" alt="15371560100616" title="15371560100616" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726043" src="https://static.alili.tech/img/remote/1460000016726043" alt="15371560354693" title="15371560354693" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726044" src="https://static.alili.tech/img/remote/1460000016726044" alt="15371560521654" title="15371560521654" style="cursor:pointer"></span></p><h3 id="articleHeader7">&#x83B7;&#x53D6;&#x8BF7;&#x6C42;&#x6570;&#x636E;</h3><p>koa-router&#x63D0;&#x4F9B;&#x4E86;&#x5E38;&#x89C1;&#x7684; .get .put .post .del &#x63A5;&#x53E3;&#x6765;&#x5904;&#x7406;&#x5404;&#x79CD;&#x9700;&#x6C42;&#x3002;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x6211;&#x4EEC;&#x7528;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#x7684;&#x662F;get&#x548C;post&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;<strong>get</strong>&#x4F8B;&#x5B50;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&apos;koa&apos;)
const app = new Koa()
const Router = require(&apos;koa-router&apos;)
const router = new Router()

router.get(&apos;/data&apos;, async (ctx , next)=&gt; {
  let url = ctx.url

  // &#x4ECE;ctx&#x7684;request&#x4E2D;&#x62FF;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;
  let data = ctx.request.query
  let dataQueryString = ctx.request.querystring

  ctx.body = {
    url,
    data,
    dataQueryString
  }
})

app.use(router.routes())

app.listen(3333, ()=&gt;{
  console.log(&apos;server is running at http://localhost:3333&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa&apos;</span>)
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-router&apos;</span>)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router()

router.get(<span class="hljs-string">&apos;/data&apos;</span>, <span class="hljs-keyword">async</span> (ctx , next)=&gt; {
  <span class="hljs-keyword">let</span> url = ctx.url

  <span class="hljs-comment">// &#x4ECE;ctx&#x7684;request&#x4E2D;&#x62FF;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">let</span> data = ctx.request.query
  <span class="hljs-keyword">let</span> dataQueryString = ctx.request.querystring

  ctx.body = {
    url,
    data,
    dataQueryString
  }
})

app.use(router.routes())

app.listen(<span class="hljs-number">3333</span>, ()=&gt;{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;server is running at http://localhost:3333&apos;</span>)
})</code></pre><p>&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x91CC;&#x8F93;&#x5165;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3333/data?user=wuyanzu&amp;id=123456 ,&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726045" src="https://static.alili.tech/img/remote/1460000016726045" alt="15371636443212" title="15371636443212" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x533A;&#x522B;&#xFF0C;<code>.query</code>&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;<code>.querystring</code>&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8FD9;&#x4E2A;&#x5F88;&#x597D;&#x7406;&#x89E3;&#x3002;&#xFF08;chrome&#x63D2;&#x4EF6;&#x663E;&#x793A;&#x6210;json&#x683C;&#x5F0F;&#xFF09;</p><p>&#x5982;&#x679C;&#x9075;&#x4ECE; RESTful &#x89C4;&#x8303;,&#x6BD4;&#x5982;&#x8BF7;&#x6C42;&#x8981;&#x4EE5; &apos;/user/:id&apos;&#x7684;&#x65B9;&#x5F0F;&#x53D1;&#x51FA;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x83B7;&#x53D6;&#x5230;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;</p><p>&#x6DFB;&#x52A0;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get(&apos;/data/:id&apos;, async (ctx, next) =&gt; {

  // &#x4E5F;&#x4ECE;ctx&#x4E2D;&#x62FF;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4E0D;&#x8FC7;&#x4F7F;&#x7528;&#x7684;&#x662F;params&#x5BF9;&#x8C61;
  let data = ctx.params

  ctx.body = data
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">&apos;/data/:id&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {

  <span class="hljs-comment">// &#x4E5F;&#x4ECE;ctx&#x4E2D;&#x62FF;&#x5230;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4E0D;&#x8FC7;&#x4F7F;&#x7528;&#x7684;&#x662F;params&#x5BF9;&#x8C61;</span>
  <span class="hljs-keyword">let</span> data = ctx.params

  ctx.body = data
})</code></pre><p>&#x6D4F;&#x89C8;&#x5668;&#x8FD0;&#x884C; <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3333/data/4396 &#x770B;&#x5230;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726046" src="https://static.alili.tech/img/remote/1460000016726046" alt="15371643392037" title="15371643392037" style="cursor:pointer"></span></p><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x770B;&#x770B;<strong>post</strong>&#x7684;&#x4F8B;&#x5B50;</p><p>&#x6211;&#x4EEC;&#x5E38;&#x7528;&#x7684;&#x8BF7;&#x6C42;post&#xFF0C;&#x5B83;&#x7684;&#x6570;&#x636E;&#x662F;&#x653E;&#x5728;body&#x5F53;&#x4E2D;&#x7684;&#x3002;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x63A8;&#x8350;&#x4E00;&#x4E2A;&#x975E;&#x5E38;&#x5E38;&#x7528;&#x4E14;&#x597D;&#x7528;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;-<code>koa-bodyparser</code></p><p>&#x9996;&#x5148;&#x5B89;&#x88C5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i koa-bodyparser --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">npm i koa-bodyparser --save</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5728;&#x521A;&#x624D;&#x7684;&#x4EE3;&#x7801;&#x91CC;&#x6DFB;&#x52A0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.get(&apos;/post&apos;, async (ctx, next) =&gt; {
    // &#x6A21;&#x62DF;&#x4E00;&#x6BB5;&#x63D0;&#x4EA4;&#x9875;&#x9762;
  let html = `    
    &lt;form action=&quot;/post/result&quot; method=&quot;post&quot;&gt;
        &lt;p&gt;&#x4F60;&#x957F;&#x7684;&#x6700;&#x50CF;&#x54EA;&#x4F4D;&#x660E;&#x661F;&lt;/p&gt;
        &lt;input name=&quot;name&quot; type=&quot;text&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x540D;&#x5B57;&#xFF1A;&quot;/&gt; 
        &lt;br/&gt;
        &lt;p&gt;&#x8F93;&#x5165;&#x4E00;&#x6BB5;&#x4F60;&#x77E5;&#x9053;&#x7684;&#x8F66;&#x724C;&#x53F7;&lt;/p&gt;
        &lt;input name=&quot;num&quot; type=&quot;text&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x8F66;&#x724C;&#x53F7;&#xFF1A;&quot;/&gt;
        &lt;br/&gt; 
        &lt;button&gt;&#x786E;&#x5B9A;&#x4E0D;&#x6539;&#x4E86;&#x54E6;&lt;/button&gt;
     &lt;/form&gt; `
  ctx.body = html
})

router.post(&apos;/post/result&apos;, async (ctx, next) =&gt; {
  // &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;ctx&#x7684;request.body&#x62FF;&#x5230;&#x63D0;&#x4EA4;&#x4E0A;&#x6765;&#x7684;&#x6570;&#x636E;
  let {name, num} = ctx.request.body

  if (name &amp;&amp; num) {
    ctx.body = `hello&#xFF0C;&#x4F60;&#x6700;&#x50CF;&#x7684;&#x660E;&#x661F;&#x662F;:${name},ch&#x4F60;&#x77E5;&#x9053;&#x7684;&#x8F66;&#x724C;&#x53F7;&#x662F;:${num}`
  } else {
    ctx.body = &apos;&#x554A;&#x54E6;~&#x4F60;&#x586B;&#x5199;&#x7684;&#x4FE1;&#x606F;&#x6709;&#x8BEF;&apos;
  }

})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.get(<span class="hljs-string">&apos;/post&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
    <span class="hljs-comment">// &#x6A21;&#x62DF;&#x4E00;&#x6BB5;&#x63D0;&#x4EA4;&#x9875;&#x9762;</span>
  <span class="hljs-keyword">let</span> html = <span class="hljs-string">`    
    &lt;form action=&quot;/post/result&quot; method=&quot;post&quot;&gt;
        &lt;p&gt;&#x4F60;&#x957F;&#x7684;&#x6700;&#x50CF;&#x54EA;&#x4F4D;&#x660E;&#x661F;&lt;/p&gt;
        &lt;input name=&quot;name&quot; type=&quot;text&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x540D;&#x5B57;&#xFF1A;&quot;/&gt; 
        &lt;br/&gt;
        &lt;p&gt;&#x8F93;&#x5165;&#x4E00;&#x6BB5;&#x4F60;&#x77E5;&#x9053;&#x7684;&#x8F66;&#x724C;&#x53F7;&lt;/p&gt;
        &lt;input name=&quot;num&quot; type=&quot;text&quot; placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x8F66;&#x724C;&#x53F7;&#xFF1A;&quot;/&gt;
        &lt;br/&gt; 
        &lt;button&gt;&#x786E;&#x5B9A;&#x4E0D;&#x6539;&#x4E86;&#x54E6;&lt;/button&gt;
     &lt;/form&gt; `</span>
  ctx.body = html
})

router.post(<span class="hljs-string">&apos;/post/result&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-comment">// &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;ctx&#x7684;request.body&#x62FF;&#x5230;&#x63D0;&#x4EA4;&#x4E0A;&#x6765;&#x7684;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">let</span> {name, num} = ctx.request.body

  <span class="hljs-keyword">if</span> (name &amp;&amp; num) {
    ctx.body = <span class="hljs-string">`hello&#xFF0C;&#x4F60;&#x6700;&#x50CF;&#x7684;&#x660E;&#x661F;&#x662F;:<span class="hljs-subst">${name}</span>,ch&#x4F60;&#x77E5;&#x9053;&#x7684;&#x8F66;&#x724C;&#x53F7;&#x662F;:<span class="hljs-subst">${num}</span>`</span>
  } <span class="hljs-keyword">else</span> {
    ctx.body = <span class="hljs-string">&apos;&#x554A;&#x54E6;~&#x4F60;&#x586B;&#x5199;&#x7684;&#x4FE1;&#x606F;&#x6709;&#x8BEF;&apos;</span>
  }

})</code></pre><p>&#x770B;&#x4E00;&#x4E0B;&#x8FD0;&#x884C;&#x7ED3;&#x679C;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016726047?w=380&amp;h=297" src="https://static.alili.tech/img/remote/1460000016726047?w=380&amp;h=297" alt="2018-09-17 14 26 24" title="2018-09-17 14 26 24" style="cursor:pointer"></span></p><h3 id="articleHeader8">cache</h3><p>koa&#x64CD;&#x4F5C;cookie&#x662F;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#x7684;&#xFF0C;&#x4E5F;&#x662F;&#x4ECE;&#x4E0A;&#x4E0B;&#x6587;ctx&#x4E2D;&#x83B7;&#x53D6;&#x3002;</p><ul><li>ctx.cookies.get(name, [options]) &#x8BFB;&#x53D6;&#x4E0A;&#x4E0B;&#x6587;&#x8BF7;&#x6C42;&#x4E2D;&#x7684;cookie</li><li>ctx.cookies.set(name, value, [options]) &#x5728;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x5199;&#x5165;cookie</li></ul><p>&#x5728;&#x6211;&#x4EEC;&#x521A;&#x624D;&#x7684;post&#x8BF7;&#x6C42;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x52A0;&#x5165;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.post(&apos;/post/result&apos;, async (ctx, next) =&gt; {
  // &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;ctx&#x7684;request.body&#x62FF;&#x5230;&#x63D0;&#x4EA4;&#x4E0A;&#x6765;&#x7684;&#x6570;&#x636E;
  let {name, num} = ctx.request.body

  if (name &amp;&amp; num) {
    ctx.body = `hello&#xFF0C;&#x4F60;&#x6700;&#x50CF;&#x7684;&#x660E;&#x661F;&#x662F;:${name},ch&#x4F60;&#x77E5;&#x9053;&#x7684;&#x8F66;&#x724C;&#x53F7;&#x662F;:${num}`
    ctx.cookies.set(
      &apos;xunleiCode&apos;,num,
      {
        domain: &apos;localhost&apos;,  // &#x5199;cookie&#x6240;&#x5728;&#x7684;&#x57DF;&#x540D;
        path: &apos;/post/result&apos;,       // &#x5199;cookie&#x6240;&#x5728;&#x7684;&#x8DEF;&#x5F84;
        maxAge: 10 * 60 * 1000, // cookie&#x6709;&#x6548;&#x65F6;&#x957F;
        expires: new Date(&apos;2018-09-17&apos;),  // cookie&#x5931;&#x6548;&#x65F6;&#x95F4;
        httpOnly: false,  // &#x662F;&#x5426;&#x53EA;&#x7528;&#x4E8E;http&#x8BF7;&#x6C42;&#x4E2D;&#x83B7;&#x53D6;
        overwrite: false  // &#x662F;&#x5426;&#x5141;&#x8BB8;&#x91CD;&#x5199;
      }
    )
  } else {
    ctx.body = &apos;&#x554A;&#x54E6;~&#x4F60;&#x586B;&#x5199;&#x7684;&#x4FE1;&#x606F;&#x6709;&#x8BEF;&apos;
  }

})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">router.post(<span class="hljs-string">&apos;/post/result&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  <span class="hljs-comment">// &#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4ECE;ctx&#x7684;request.body&#x62FF;&#x5230;&#x63D0;&#x4EA4;&#x4E0A;&#x6765;&#x7684;&#x6570;&#x636E;</span>
  <span class="hljs-keyword">let</span> {name, num} = ctx.request.body

  <span class="hljs-keyword">if</span> (name &amp;&amp; num) {
    ctx.body = <span class="hljs-string">`hello&#xFF0C;&#x4F60;&#x6700;&#x50CF;&#x7684;&#x660E;&#x661F;&#x662F;:<span class="hljs-subst">${name}</span>,ch&#x4F60;&#x77E5;&#x9053;&#x7684;&#x8F66;&#x724C;&#x53F7;&#x662F;:<span class="hljs-subst">${num}</span>`</span>
    ctx.cookies.set(
      <span class="hljs-string">&apos;xunleiCode&apos;</span>,num,
      {
        <span class="hljs-attr">domain</span>: <span class="hljs-string">&apos;localhost&apos;</span>,  <span class="hljs-comment">// &#x5199;cookie&#x6240;&#x5728;&#x7684;&#x57DF;&#x540D;</span>
        path: <span class="hljs-string">&apos;/post/result&apos;</span>,       <span class="hljs-comment">// &#x5199;cookie&#x6240;&#x5728;&#x7684;&#x8DEF;&#x5F84;</span>
        maxAge: <span class="hljs-number">10</span> * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span>, <span class="hljs-comment">// cookie&#x6709;&#x6548;&#x65F6;&#x957F;</span>
        expires: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">&apos;2018-09-17&apos;</span>),  <span class="hljs-comment">// cookie&#x5931;&#x6548;&#x65F6;&#x95F4;</span>
        httpOnly: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// &#x662F;&#x5426;&#x53EA;&#x7528;&#x4E8E;http&#x8BF7;&#x6C42;&#x4E2D;&#x83B7;&#x53D6;</span>
        overwrite: <span class="hljs-literal">false</span>  <span class="hljs-comment">// &#x662F;&#x5426;&#x5141;&#x8BB8;&#x91CD;&#x5199;</span>
      }
    )
  } <span class="hljs-keyword">else</span> {
    ctx.body = <span class="hljs-string">&apos;&#x554A;&#x54E6;~&#x4F60;&#x586B;&#x5199;&#x7684;&#x4FE1;&#x606F;&#x6709;&#x8BEF;&apos;</span>
  }

})</code></pre><p>&#x770B;&#x4E00;&#x4E0B;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000016726048" src="https://static.alili.tech/img/remote/1460000016726048" alt="15371681204265" title="15371681204265" style="cursor:pointer"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016726049" src="https://static.alili.tech/img/remote/1460000016726049" alt="15371681313023" title="15371681313023" style="cursor:pointer"></span></p><p>koa&#x64CD;&#x4F5C;session&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x7528;&#x5230;koa-session&#xFF0C;&#x1F330;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const session = require(&apos;koa-session&apos;)

app.keys = [&apos;some secret hurr&apos;];
const CONFIG = {
  key: &apos;koa:sess&apos;,   //cookie key (default is koa:sess)
  maxAge: 86400000,  // cookie&#x7684;&#x8FC7;&#x671F;&#x65F6;&#x95F4; maxAge in ms (default is 1 days)
  overwrite: true,  //&#x662F;&#x5426;&#x53EF;&#x4EE5;overwrite    (&#x9ED8;&#x8BA4;default true)
  httpOnly: true, //cookie&#x662F;&#x5426;&#x53EA;&#x6709;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE; httpOnly or not (default true)
  signed: true,   //&#x7B7E;&#x540D;&#x9ED8;&#x8BA4;true
  rolling: false,  //&#x5728;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x65F6;&#x5F3A;&#x884C;&#x8BBE;&#x7F6E;cookie&#xFF0C;&#x8FD9;&#x5C06;&#x91CD;&#x7F6E;cookie&#x8FC7;&#x671F;&#x65F6;&#x95F4;&#xFF08;&#x9ED8;&#x8BA4;&#xFF1A;false&#xFF09;
  renew: false,  //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">const</span> session = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;koa-session&apos;</span>)

app.keys = [<span class="hljs-string">&apos;some secret hurr&apos;</span>];
<span class="hljs-keyword">const</span> CONFIG = {
  <span class="hljs-attr">key</span>: <span class="hljs-string">&apos;koa:sess&apos;</span>,   <span class="hljs-comment">//cookie key (default is koa:sess)</span>
  maxAge: <span class="hljs-number">86400000</span>,  <span class="hljs-comment">// cookie&#x7684;&#x8FC7;&#x671F;&#x65F6;&#x95F4; maxAge in ms (default is 1 days)</span>
  overwrite: <span class="hljs-literal">true</span>,  <span class="hljs-comment">//&#x662F;&#x5426;&#x53EF;&#x4EE5;overwrite    (&#x9ED8;&#x8BA4;default true)</span>
  httpOnly: <span class="hljs-literal">true</span>, <span class="hljs-comment">//cookie&#x662F;&#x5426;&#x53EA;&#x6709;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE; httpOnly or not (default true)</span>
  signed: <span class="hljs-literal">true</span>,   <span class="hljs-comment">//&#x7B7E;&#x540D;&#x9ED8;&#x8BA4;true</span>
  rolling: <span class="hljs-literal">false</span>,  <span class="hljs-comment">//&#x5728;&#x6BCF;&#x6B21;&#x8BF7;&#x6C42;&#x65F6;&#x5F3A;&#x884C;&#x8BBE;&#x7F6E;cookie&#xFF0C;&#x8FD9;&#x5C06;&#x91CD;&#x7F6E;cookie&#x8FC7;&#x671F;&#x65F6;&#x95F4;&#xFF08;&#x9ED8;&#x8BA4;&#xFF1A;false&#xFF09;</span>
  renew: <span class="hljs-literal">false</span>,  <span class="hljs-comment">//(boolean) renew session when session is nearly expired,</span>
};
app.use(session(CONFIG, app));
</code></pre><h3 id="articleHeader9">&#x5C0F;&#x7ED3;</h3><p>&#x5728;&#x6D89;&#x53CA;&#x5230;&#x81EA;&#x5DF1;&#x6CA1;&#x6709;&#x63A5;&#x89E6;&#x8FC7;&#x7684;&#x9886;&#x57DF;&#x65F6;&#xFF0C;&#x6211;&#x4E00;&#x76F4;&#x63A8;&#x5D07;&#x5148;&#x770B;&#x770B;&#x8981;&#x600E;&#x4E48;&#x73A9;&#xFF0C;&#x7B49;&#x81EA;&#x5DF1;&#x4F1A;&#x73A9;&#x4E86;&#x4EE5;&#x540E;&#xFF0C;&#x518D;&#x770B;&#x770B;&#x201C;&#x7A76;&#x7ADF;&#x201D;&#x600E;&#x4E48;&#x73A9;&#x3002;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x548C;&#x63CF;&#x8FF0;&#xFF0C;&#x5DF2;&#x7ECF;&#x5BF9;koa&#x53CA;node&#x6709;&#x4E00;&#x4E2A;&#x521D;&#x6B65;&#x7684;&#x5370;&#x8C61;&#x548C;&#x6982;&#x5FF5;&#x3002;&#x4E0B;&#x7BC7;&#x6587;&#x7AE0;&#x6211;&#x4EEC;&#x4F1A;&#x6709;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x62C6;&#x5206;&#xFF0C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#xFF0C;&#x8BB0;&#x5F55;&#x65E5;&#x5FD7;&#xFF0C;&#x7BA1;&#x7406;&#x89C4;&#x8303;&#x7B49;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x5171;&#x540C;&#x6210;&#x957F;&#xFF01;</p><h2 id="articleHeader10">&#x5E7F;&#x800C;&#x544A;&#x4E4B;</h2><p>&#x672C;&#x6587;&#x53D1;&#x5E03;&#x4E8E;<a href="https://github.com/BooheeFE/weekly" rel="nofollow noreferrer" target="_blank">&#x8584;&#x8377;&#x524D;&#x7AEF;&#x5468;&#x520A;</a>&#xFF0C;&#x6B22;&#x8FCE;Watch &amp; Star &#x2605;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;</p><h3 id="articleHeader11">&#x6B22;&#x8FCE;&#x8BA8;&#x8BBA;&#xFF0C;&#x70B9;&#x4E2A;&#x8D5E;&#x518D;&#x8D70;&#x5427; &#xFF61;&#x25D5;&#x203F;&#x25D5;&#xFF61; &#xFF5E;</h3>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
10分钟让你成为全栈工程师-koa快速入门

## 原文链接
[https://segmentfault.com/a/1190000016726031](https://segmentfault.com/a/1190000016726031)


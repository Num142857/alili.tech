---
title: Egg.js学习
hidden: true
categories: reprint
slug: a45dec63
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h3 id="articleHeader0">egg.js&#x662F;&#x4EC0;&#x4E48;</h3><blockquote>&#x662F;&#x4E00;&#x4E2A;node.js&#x7684;&#x540E;&#x53F0;web&#x6846;&#x67B6;&#xFF0C;&#x7C7B;&#x4F3C;&#x7684;&#x8FD8;&#x6709;express&#xFF0C;koa</blockquote><p>&#x4F18;&#x52BF;&#xFF1A;<strong>&#x89C4;&#x8303;</strong>&#x3001;<strong>&#x63D2;&#x4EF6;&#x673A;&#x5236;</strong><br>Egg.js&#x7EA6;&#x5B9A;&#x4E86;&#x4E00;&#x5957;&#x4EE3;&#x7801;&#x76EE;&#x5F55;&#x7ED3;&#x6784;<br>&#xFF08;&#x914D;&#x7F6E;config&#x3001;&#x8DEF;&#x7531;router&#x3001;&#x6269;&#x5C55;extend&#x3001;&#x4E2D;&#x95F4;&#x4EF6;middleware&#x3001;&#x63A7;&#x5236;&#x5668;controller&#xFF09;<br>&#x89C4;&#x8303;&#x7684;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x5F97;&#x4E0D;&#x540C;&#x56E2;&#x961F;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x4F7F;&#x7528;&#x6846;&#x67B6;&#x5199;&#x51FA;&#x6765;&#x7684;&#x4EE3;&#x7801;&#x98CE;&#x683C;&#x4F1A;&#x66F4;&#x4E00;&#x81F4;&#xFF0C;&#x63A5;&#x624B;&#x6210;&#x672C;&#x4E5F;&#x4F1A;&#x66F4;&#x4F4E;&#x3002;</p><h3 id="articleHeader1">&#x4F7F;&#x7528;&#x573A;&#x666F;</h3><p>BFF&#x5C42;&#xFF08;&#x524D;&#x540E;&#x7AEF;&#x4E4B;&#x95F4;&#x7684;&#x4E2D;&#x95F4;&#x5C42;&#xFF09;&#x3001;&#x5168;&#x6808;&#x3001;SSR&#xFF08;&#x670D;&#x52A1;&#x7AEF;&#x6E32;&#x67D3;&#xFF09;</p><h3 id="articleHeader2">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h3><blockquote>&#x6846;&#x67B6;&#x7EA6;&#x5B9A;&#x7684;&#x76EE;&#x5F55;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app/router.js &#x7528;&#x4E8E;&#x914D;&#x7F6E;URL&#x8DEF;&#x7531;&#x89C4;&#x5219;
app/contorller/** &#x7528;&#x4E8E;&#x89E3;&#x6790;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#xFF0C;&#x5904;&#x7406;&#x540E;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;&#x7ED3;&#x679C;
app/service/** &#x7528;&#x4E8E;&#x7F16;&#x5199;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5C42; &#x3010;&#x53EF;&#x9009;&#x3011;
app/middleware/** &#x7528;&#x4E8E;&#x7F16;&#x5199;&#x4E2D;&#x95F4;&#x4EF6; &#x3010;&#x53EF;&#x9009;&#x3011;
app/service/** &#x7528;&#x4E8E;&#x6846;&#x67B6;&#x7684;&#x6269;&#x5C55; &#x3010;&#x53EF;&#x9009;&#x3011;
...
&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x76EE;&#x5F55;
app/view/** &#x7528;&#x4E8E;&#x9632;&#x6B62;&#x6A21;&#x677F;&#x6587;&#x4EF6;  &#x3010;&#x53EF;&#x9009;&#x3011;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>app/router.js &#x7528;&#x4E8E;&#x914D;&#x7F6E;URL&#x8DEF;&#x7531;&#x89C4;&#x5219;
app<span class="hljs-regexp">/contorller/</span>** &#x7528;&#x4E8E;&#x89E3;&#x6790;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#xFF0C;&#x5904;&#x7406;&#x540E;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;&#x7ED3;&#x679C;
app<span class="hljs-regexp">/service/</span>** &#x7528;&#x4E8E;&#x7F16;&#x5199;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5C42; &#x3010;&#x53EF;&#x9009;&#x3011;
app<span class="hljs-regexp">/middleware/</span>** &#x7528;&#x4E8E;&#x7F16;&#x5199;&#x4E2D;&#x95F4;&#x4EF6; &#x3010;&#x53EF;&#x9009;&#x3011;
app<span class="hljs-regexp">/service/</span>** &#x7528;&#x4E8E;&#x6846;&#x67B6;&#x7684;&#x6269;&#x5C55; &#x3010;&#x53EF;&#x9009;&#x3011;
...
&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x76EE;&#x5F55;
app<span class="hljs-regexp">/view/</span>** &#x7528;&#x4E8E;&#x9632;&#x6B62;&#x6A21;&#x677F;&#x6587;&#x4EF6;  &#x3010;&#x53EF;&#x9009;&#x3011;
</code></pre><h3 id="articleHeader3">&#x52A0;&#x8F7D;&#x987A;&#x5E8F;</h3><blockquote>Egg &#x5C06;&#x5E94;&#x7528;&#x3001;&#x6846;&#x67B6;&#x548C;&#x63D2;&#x4EF6;&#x90FD;&#x79F0;&#x4E3A;&#x52A0;&#x8F7D;&#x5355;&#x5143;&#xFF08;loadUnit&#xFF09;;</blockquote><p>&#x5728;&#x52A0;&#x8F7D;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;Egg&#x4F1A;&#x904D;&#x5386;&#x6240;&#x6709;&#x7684;&#x52A0;&#x8F7D;&#x5355;&#x5143;&#xFF0C;&#x52A0;&#x8F7D;&#x65F6;&#x6709;&#x4E00;&#x70B9;&#x7684;&#x4F18;&#x5148;&#x7EA7;<br>&#xB7; &#x63D2;&#x4EF6; =&gt; &#x6846;&#x67B6; =&gt; &#x5E94;&#x7528;&#x4F9D;&#x6B21;&#x52A0;&#x8F7D;<br>&#xB7; &#x4F9D;&#x8D56;&#x65B9;&#x5148;&#x52A0;&#x8F7D;<br>&#xB7; &#x6846;&#x67B6;&#x6309;&#x7EE7;&#x627F;&#x987A;&#x5E8F;&#x52A0;&#x8F7D;&#xFF0C;&#x8D8A;&#x5E95;&#x5C42;&#x8D8A;&#x5148;&#x52A0;&#x8F7D;</p><p>&#x5982;&#x6709;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x5E94;&#x7528;&#x914D;&#x7F6E;&#x4E86;&#x5982;&#x4E0B;&#x4F9D;&#x8D56;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app
| &#x251C;&#x2500;&#x2500; plugin2 (&#x4F9D;&#x8D56; plugin3)
| &#x2514;&#x2500;&#x2500; plugin3
&#x2514;&#x2500;&#x2500; framework1
    | &#x2514;&#x2500;&#x2500; plugin1
    &#x2514;&#x2500;&#x2500; egg" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code>app
| &#x251C;&#x2500;&#x2500; plugi<span class="hljs-symbol">n2</span> <span class="hljs-comment">(&#x4F9D;&#x8D56; plugin3)</span>
| &#x2514;&#x2500;&#x2500; plugi<span class="hljs-symbol">n3</span>
&#x2514;&#x2500;&#x2500; framework<span class="hljs-number">1</span>
    | &#x2514;&#x2500;&#x2500; plugi<span class="hljs-symbol">n1</span>
    &#x2514;&#x2500;&#x2500; egg</code></pre><p>&#x6700;&#x7EC8;&#x7684;&#x52A0;&#x8F7D;&#x987A;&#x5E8F;&#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="=&gt; plugin1
=&gt; plugin3
=&gt; plugin2
=&gt; egg
=&gt; framework1
=&gt; app
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs excel"><code>=&gt; plugin1
=&gt; plugin3
=&gt; plugin2
=&gt; egg
=&gt; framework1
=&gt; app
</code></pre><blockquote>&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x987A;&#x5E8F;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package.json =&gt; config =&gt; app/extend =&gt; app.js =&gt; app/service =&gt; app/middleware =&gt; app/controller =&gt; app/router.js
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>package.json =&gt; <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> app/<span class="hljs-function"><span class="hljs-params">extend</span> =&gt;</span> app.js =&gt; app/<span class="hljs-function"><span class="hljs-params">service</span> =&gt;</span> app/<span class="hljs-function"><span class="hljs-params">middleware</span> =&gt;</span> app/<span class="hljs-function"><span class="hljs-params">controller</span> =&gt;</span> app/router.js
</code></pre><h3 id="articleHeader4">router</h3><blockquote>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x914D;&#x7F6E;&#x8DEF;&#x7531;<br>&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x5728;&#x5B9E;&#x9645;&#x7684;&#x5F00;&#x53D1;&#x4E2D;&#x4F1A;&#x4F7F;&#x7528;&#x5F88;&#x591A;&#x8DEF;&#x7531;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5C06;&#x8DEF;&#x7531;&#x6539;&#x6210;&#x5206;&#x7EA7;&#x7684;<br>&#x5728;app&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;router&#x6587;&#x4EF6;&#x5939;&#x7528;&#x6765;&#x5B58;&#x653E;&#x8DEF;&#x7531;&#x6587;&#x4EF6;home.js</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app/router/home.js
&apos;use strict&apos;

module exports = app =&gt; {
    const { home } = app.controller //&#x83B7;&#x53D6;controller&#x4E0B;&#x7684;home.js
    app.get(&apos;/&apos;,home.index);
    app.get(&apos;/home/param&apos;,home.getParam);
    app.get(&apos;/home/postParam&apos;,home.postParam);
}

// app/router.js
&apos;use strict&apos;
const RouteHome = require(&apos;./router/home&apos;);
module.exports = {
    const {router, controller} = app;
    RouteHome(app);
}

//app/controller/home.js

&apos;use strict&apos;

const Controller = require(&apos;egg&apos;).Controller;

class HomeController extends Controller {
    async index() {
        await this.ctx.render(&apos;/index&apos;,{name:&apos;egg&apos;});
    }
    async getParam() {
        let id = await this.ctx.query.id;
        this.ctx.body = id;
    }
    async postParam(){
        let id =  await this.ctx.request.body.id; //&#x83B7;&#x53D6;post&#x53C2;&#x6570;
        this.ctx.body = id;
    }
}
module exports = HomeController;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//app/router/home.js</span>
<span class="hljs-meta">&apos;use strict&apos;</span>

<span class="hljs-built_in">module</span> exports = <span class="hljs-function"><span class="hljs-params">app</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> { home } = app.controller <span class="hljs-comment">//&#x83B7;&#x53D6;controller&#x4E0B;&#x7684;home.js</span>
    app.get(<span class="hljs-string">&apos;/&apos;</span>,home.index);
    app.get(<span class="hljs-string">&apos;/home/param&apos;</span>,home.getParam);
    app.get(<span class="hljs-string">&apos;/home/postParam&apos;</span>,home.postParam);
}

<span class="hljs-comment">// app/router.js</span>
<span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> RouteHome = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./router/home&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">const</span> {router, controller} = app;
    RouteHome(app);
}

<span class="hljs-comment">//app/controller/home.js</span>
<span class="hljs-meta">
&apos;use strict&apos;</span>

<span class="hljs-keyword">const</span> Controller = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Controller;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HomeController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
    <span class="hljs-keyword">async</span> index() {
        <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.ctx.render(<span class="hljs-string">&apos;/index&apos;</span>,{<span class="hljs-attr">name</span>:<span class="hljs-string">&apos;egg&apos;</span>});
    }
    <span class="hljs-keyword">async</span> getParam() {
        <span class="hljs-keyword">let</span> id = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.ctx.query.id;
        <span class="hljs-keyword">this</span>.ctx.body = id;
    }
    <span class="hljs-keyword">async</span> postParam(){
        <span class="hljs-keyword">let</span> id =  <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.ctx.request.body.id; <span class="hljs-comment">//&#x83B7;&#x53D6;post&#x53C2;&#x6570;</span>
        <span class="hljs-keyword">this</span>.ctx.body = id;
    }
}
<span class="hljs-built_in">module</span> exports = HomeController;
</code></pre><h3 id="articleHeader5">controller</h3><blockquote>&#x6211;&#x4EEC;&#x901A;&#x8FC7; Router &#x5C06;&#x7528;&#x6237;&#x7684;&#x8BF7;&#x6C42;&#x57FA;&#x4E8E; method &#x548C; URL &#x5206;&#x53D1;&#x5230;&#x4E86;&#x5BF9;&#x5E94;&#x7684; Controller &#x4E0A;&#xFF0C; Controller <strong>&#x8D1F;&#x8D23;&#x89E3;&#x6790;&#x7528;&#x6237;&#x7684;&#x8F93;&#x5165;&#xFF0C;&#x5904;&#x7406;&#x540E;&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;&#x7ED3;&#x679C;</strong><br>&#x6846;&#x67B6;&#x63A8;&#x8350; Controller &#x5C42;&#x4E3B;&#x8981;&#x5BF9;&#x7528;&#x6237;&#x7684;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF08;&#x6821;&#x9A8C;&#x3001;&#x8F6C;&#x6362;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684; service &#x65B9;&#x6CD5;&#x5904;&#x7406;&#x4E1A;&#x52A1;&#xFF0C;&#x5F97;&#x5230;&#x4E1A;&#x52A1;&#x7ED3;&#x679C;&#x540E;&#x5C01;&#x88C5;&#x5E76;&#x8FD4;&#x56DE;</blockquote><ul><li>&#x6240;&#x6709;&#x7684; Controller &#x6587;&#x4EF6;&#x90FD;&#x5FC5;&#x987B;&#x653E;&#x5728; app/controller &#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x53EF;&#x4EE5;&#x652F;&#x6301;&#x591A;&#x7EA7;&#x76EE;&#x5F55;</li><li>&#x8BBF;&#x95EE;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76EE;&#x5F55;&#x540D;&#x7EA7;&#x8054;&#x8BBF;&#x95EE;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5728;app/controller&#x76EE;&#x5F55;&#x4E0B; &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;controller
&apos;use strict&apos;

const Controller = required(&apos;egg&apos;).Controller;

class CustomerController extends Controller {
    async customIndex() {
        //ctx.body &#x662F; ctx.response.body &#x7684;&#x7B80;&#x5199;&#xFF0C;&#x4E0D;&#x8981;&#x548C; ctx.request.body &#x6DF7;&#x6DC6;&#x4E86;
        this.ctx.body = &apos;this is my controller&apos;;
    }
}
module.exports = CustomController;

//&#x5728;router.js&#x4E2D;&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#xFF08;&#x8BBF;&#x95EE;&#x65F6;&#x8BF7;&#x6C42;&#x7684;&#x8DEF;&#x5F84;&#xFF09;

&apos;use strict&apos;

module.exports = app =&gt; {
    //&#x76F8;&#x5F53;&#x4E8E;&#x62FF;&#x5230;app&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;router&#x548C;controller
    const {router, controller} = app;
    router.get(&apos;/&apos;, controller.home.index);
    router.get(&apos;/custom&apos;,controller.customerController.customIndex);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5728;app/controller&#x76EE;&#x5F55;&#x4E0B; &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;controller</span>
<span class="hljs-meta">&apos;use strict&apos;</span>

<span class="hljs-keyword">const</span> Controller = required(<span class="hljs-string">&apos;egg&apos;</span>).Controller;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomerController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
    <span class="hljs-keyword">async</span> customIndex() {
        <span class="hljs-comment">//ctx.body &#x662F; ctx.response.body &#x7684;&#x7B80;&#x5199;&#xFF0C;&#x4E0D;&#x8981;&#x548C; ctx.request.body &#x6DF7;&#x6DC6;&#x4E86;</span>
        <span class="hljs-keyword">this</span>.ctx.body = <span class="hljs-string">&apos;this is my controller&apos;</span>;
    }
}
<span class="hljs-built_in">module</span>.exports = CustomController;

<span class="hljs-comment">//&#x5728;router.js&#x4E2D;&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#xFF08;&#x8BBF;&#x95EE;&#x65F6;&#x8BF7;&#x6C42;&#x7684;&#x8DEF;&#x5F84;&#xFF09;</span>
<span class="hljs-meta">
&apos;use strict&apos;</span>

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">app</span> =&gt;</span> {
    <span class="hljs-comment">//&#x76F8;&#x5F53;&#x4E8E;&#x62FF;&#x5230;app&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;router&#x548C;controller</span>
    <span class="hljs-keyword">const</span> {router, controller} = app;
    router.get(<span class="hljs-string">&apos;/&apos;</span>, controller.home.index);
    router.get(<span class="hljs-string">&apos;/custom&apos;</span>,controller.customerController.customIndex);
}</code></pre><blockquote>&#x5B9A;&#x4E49;&#x7684; Controller &#x7C7B;&#xFF0C;&#x4F1A;&#x5728;&#x6BCF;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x8BBF;&#x95EE;&#x5230; server &#x65F6;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5168;&#x65B0;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x800C;&#x9879;&#x76EE;&#x4E2D;&#x7684; Controller &#x7C7B;&#x7EE7;&#x627F;&#x4E8E; egg.Controller&#xFF0C;&#x4F1A;&#x6709;&#x4E0B;&#x9762;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#x6302;&#x5728; this &#x4E0A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- this.ctx &#x6846;&#x67B6;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x5904;&#x7406;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x7684;&#x5404;&#x79CD;&#x4FBF;&#x6377;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
- this.app &#x6846;&#x67B6;&#x63D0;&#x4F9B;&#x7684;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x548C;&#x65B9;&#x6CD5;
- this.service &#x8BBF;&#x95EE;&#x62BD;&#x8C61;&#x51FA;&#x7684;&#x4E1A;&#x52A1;&#x5C42; &#x76F8;&#x5F53;&#x4E8E; this.ctx.service
- this.config &#x8FD0;&#x884C;&#x7684;&#x914D;&#x7F6E;&#x9879;
- this.logger &#x65E5;&#x5FD7;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>- this<span class="hljs-selector-class">.ctx</span> &#x6846;&#x67B6;&#x5C01;&#x88C5;&#x597D;&#x7684;&#x5904;&#x7406;&#x5F53;&#x524D;&#x8BF7;&#x6C42;&#x7684;&#x5404;&#x79CD;&#x4FBF;&#x6377;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
- this<span class="hljs-selector-class">.app</span> &#x6846;&#x67B6;&#x63D0;&#x4F9B;&#x7684;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x548C;&#x65B9;&#x6CD5;
- this<span class="hljs-selector-class">.service</span> &#x8BBF;&#x95EE;&#x62BD;&#x8C61;&#x51FA;&#x7684;&#x4E1A;&#x52A1;&#x5C42; &#x76F8;&#x5F53;&#x4E8E; this<span class="hljs-selector-class">.ctx</span><span class="hljs-selector-class">.service</span>
- this<span class="hljs-selector-class">.config</span> &#x8FD0;&#x884C;&#x7684;&#x914D;&#x7F6E;&#x9879;
- this<span class="hljs-selector-class">.logger</span> &#x65E5;&#x5FD7;
</code></pre><h3 id="articleHeader6">service</h3><blockquote>&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x5C42;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
&apos;use strict&apos;;
const Service = require(&apos;egg&apos;).Service;
class customService extends Service {
    async show(zc, hh) { //&#x5F02;&#x6B65;&#x9632;&#x963B;&#x585E;
        return zc + &quot; and &quot; + hh;
    }
}
module.exports = UserService;

//controller&#x4EE3;&#x7801;
&apos;use strict&apos;;

const Controller = require(&apos;egg&apos;).Controller;

class CustomController extends Controller {
  async custonIndex() {
    let str = await this.ctx.service.customService.show(&apos;zc&apos;,&apos;hh&apos;);
    //&#x8FD9;&#x91CC;&#x4F7F;&#x7528;await&#x6765;&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;
    this.ctx.body = &apos;this is my controller&apos;+str;
  }
}

module.exports = CustomController;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">
&apos;use strict&apos;</span>;
<span class="hljs-keyword">const</span> Service = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Service;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">customService</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Service</span> </span>{
    <span class="hljs-keyword">async</span> show(zc, hh) { <span class="hljs-comment">//&#x5F02;&#x6B65;&#x9632;&#x963B;&#x585E;</span>
        <span class="hljs-keyword">return</span> zc + <span class="hljs-string">&quot; and &quot;</span> + hh;
    }
}
<span class="hljs-built_in">module</span>.exports = UserService;

<span class="hljs-comment">//controller&#x4EE3;&#x7801;</span>
<span class="hljs-meta">&apos;use strict&apos;</span>;

<span class="hljs-keyword">const</span> Controller = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Controller;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
  <span class="hljs-keyword">async</span> custonIndex() {
    <span class="hljs-keyword">let</span> str = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.ctx.service.customService.show(<span class="hljs-string">&apos;zc&apos;</span>,<span class="hljs-string">&apos;hh&apos;</span>);
    <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x4F7F;&#x7528;await&#x6765;&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;</span>
    <span class="hljs-keyword">this</span>.ctx.body = <span class="hljs-string">&apos;this is my controller&apos;</span>+str;
  }
}

<span class="hljs-built_in">module</span>.exports = CustomController;</code></pre><blockquote>&#x4E00;&#x4E2A;&#x66F4;&#x5B8C;&#x6574;&#x7684;&#x6817;&#x5B50;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app/router.js
module.exports = app =&gt; {
  app.router.get(&apos;/user/:id&apos;, app.controller.user.info);
};

// app/controller/user.js
const Controller = require(&apos;egg&apos;).Controller;
class UserController extends Controller {
  async info() {
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}
module.exports = UserController;

// app/service/user.js
const Service = require(&apos;egg&apos;).Service;
class UserService extends Service {
  // &#x9ED8;&#x8BA4;&#x4E0D;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;
  // constructor(ctx) {
  //   super(ctx); &#x5982;&#x679C;&#x9700;&#x8981;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x505A;&#x4E00;&#x4E9B;&#x5904;&#x7406;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x6709;&#x8FD9;&#x53E5;&#x8BDD;&#xFF0C;&#x624D;&#x80FD;&#x4FDD;&#x8BC1;&#x540E;&#x9762; `this.ctx`&#x7684;&#x4F7F;&#x7528;&#x3002;
  //   // &#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7; this.ctx &#x83B7;&#x53D6; ctx &#x4E86;
  //   // &#x8FD8;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7; this.app &#x83B7;&#x53D6; app &#x4E86;
  // }
  async find(uid) {
    // &#x5047;&#x5982; &#x6211;&#x4EEC;&#x62FF;&#x5230;&#x7528;&#x6237; id &#x4ECE;&#x6570;&#x636E;&#x5E93;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;
    const user = await this.ctx.db.query(&apos;select * from user where uid = ?&apos;, uid);

    // &#x5047;&#x5B9A;&#x8FD9;&#x91CC;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x590D;&#x6742;&#x7684;&#x8BA1;&#x7B97;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x9700;&#x8981;&#x7684;&#x4FE1;&#x606F;&#x3002;
    const picture = await this.getPicture(uid);

    return {
      name: user.user_name,
      age: user.age,
      picture,
    };
  }

  async getPicture(uid) {
    const result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: &apos;json&apos; });
    return result.data;
  }
}
module.exports = UserService;

// curl http://127.0.0.1:7001/user/1234     
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// app/router.js</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">app</span> =&gt;</span> {
  app.router.get(<span class="hljs-string">&apos;/user/:id&apos;</span>, app.controller.user.info);
};

<span class="hljs-comment">// app/controller/user.js</span>
<span class="hljs-keyword">const</span> Controller = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Controller;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
  <span class="hljs-keyword">async</span> info() {
    <span class="hljs-keyword">const</span> userId = ctx.params.id;
    <span class="hljs-keyword">const</span> userInfo = <span class="hljs-keyword">await</span> ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}
<span class="hljs-built_in">module</span>.exports = UserController;

<span class="hljs-comment">// app/service/user.js</span>
<span class="hljs-keyword">const</span> Service = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Service;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UserService</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Service</span> </span>{
  <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E0D;&#x9700;&#x8981;&#x63D0;&#x4F9B;&#x6784;&#x9020;&#x51FD;&#x6570;&#x3002;</span>
  <span class="hljs-comment">// constructor(ctx) {</span>
  <span class="hljs-comment">//   super(ctx); &#x5982;&#x679C;&#x9700;&#x8981;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x505A;&#x4E00;&#x4E9B;&#x5904;&#x7406;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x6709;&#x8FD9;&#x53E5;&#x8BDD;&#xFF0C;&#x624D;&#x80FD;&#x4FDD;&#x8BC1;&#x540E;&#x9762; `this.ctx`&#x7684;&#x4F7F;&#x7528;&#x3002;</span>
  <span class="hljs-comment">//   // &#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7; this.ctx &#x83B7;&#x53D6; ctx &#x4E86;</span>
  <span class="hljs-comment">//   // &#x8FD8;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7; this.app &#x83B7;&#x53D6; app &#x4E86;</span>
  <span class="hljs-comment">// }</span>
  <span class="hljs-keyword">async</span> find(uid) {
    <span class="hljs-comment">// &#x5047;&#x5982; &#x6211;&#x4EEC;&#x62FF;&#x5230;&#x7528;&#x6237; id &#x4ECE;&#x6570;&#x636E;&#x5E93;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;</span>
    <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.ctx.db.query(<span class="hljs-string">&apos;select * from user where uid = ?&apos;</span>, uid);

    <span class="hljs-comment">// &#x5047;&#x5B9A;&#x8FD9;&#x91CC;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x590D;&#x6742;&#x7684;&#x8BA1;&#x7B97;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x9700;&#x8981;&#x7684;&#x4FE1;&#x606F;&#x3002;</span>
    <span class="hljs-keyword">const</span> picture = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getPicture(uid);

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">name</span>: user.user_name,
      <span class="hljs-attr">age</span>: user.age,
      picture,
    };
  }

  <span class="hljs-keyword">async</span> getPicture(uid) {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.ctx.curl(<span class="hljs-string">`http://photoserver/uid=<span class="hljs-subst">${uid}</span>`</span>, { <span class="hljs-attr">dataType</span>: <span class="hljs-string">&apos;json&apos;</span> });
    <span class="hljs-keyword">return</span> result.data;
  }
}
<span class="hljs-built_in">module</span>.exports = UserService;

<span class="hljs-comment">// curl http://127.0.0.1:7001/user/1234     </span>
</code></pre><h3 id="articleHeader7">helper</h3><blockquote>app/extend&#x6587;&#x4EF6;&#x5939;&#x91CC;&#x9762;&#x5B58;&#x653E;&#x5DE5;&#x5177;&#x7C7B;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

   //app/extend/getName.js  
   &apos;use strict&apos; 
module.exports = {
    getUserName(id) {
        return list.find(i=&gt;i.id===id).name;
    }
}

//app/extend/helper.js
&apos;use strict&apos; 

const getName = require(&apos;./getName&apos;);
module.exports = {
    showName() {
        return getName.getUserName(&apos;2221&apos;);
    }
}

//controller&#x5F15;&#x7528;helper
&apos;use strict&apos; 

const Controller = require(&apos;egg&apos;).Controller;
class CustomController extends Controller {
    async customIndex() {
        ////this.ctx.helper&#x62FF;&#x5230;helper&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#x4E5F;&#x5C31;&#x662F;&#x8FDB;&#x5165;helper.js&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;
        this.ctx.body = this.ctx.helper.showName();
    }
}
module.exports = CustomController;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="javascript">   <span class="hljs-comment">//app/extend/getName.js  </span>
<span class="hljs-meta">   &apos;use strict&apos;</span> 
<span class="hljs-built_in">module</span>.exports = {
    getUserName(id) {
        <span class="hljs-keyword">return</span> list.find(<span class="hljs-function"><span class="hljs-params">i</span>=&gt;</span>i.id===id).name;
    }
}

<span class="hljs-comment">//app/extend/helper.js</span>
<span class="hljs-meta">&apos;use strict&apos;</span> 

<span class="hljs-keyword">const</span> getName = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./getName&apos;</span>);
<span class="hljs-built_in">module</span>.exports = {
    showName() {
        <span class="hljs-keyword">return</span> getName.getUserName(<span class="hljs-string">&apos;2221&apos;</span>);
    }
}

<span class="hljs-comment">//controller&#x5F15;&#x7528;helper</span>
<span class="hljs-meta">&apos;use strict&apos;</span> 

<span class="hljs-keyword">const</span> Controller = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Controller;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
    <span class="hljs-keyword">async</span> customIndex() {
        <span class="hljs-comment">////this.ctx.helper&#x62FF;&#x5230;helper&#x5185;&#x7F6E;&#x5BF9;&#x8C61;&#x4E5F;&#x5C31;&#x662F;&#x8FDB;&#x5165;helper.js&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;</span>
        <span class="hljs-keyword">this</span>.ctx.body = <span class="hljs-keyword">this</span>.ctx.helper.showName();
    }
}
<span class="hljs-built_in">module</span>.exports = CustomController;
</span></code></pre><h3 id="articleHeader8">&#x9875;&#x9762;&#x6E32;&#x67D3;</h3><blockquote>egg.js&#x4F7F;&#x7528;&#x7684;&#x662F;nunjucks&#x9875;&#x9762;&#x6A21;&#x677F;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5728;config/plugin.js&#x91CC;&#x9762;&#x6DFB;&#x52A0;

&apos;use strict&apos;

 exports.nunjucks = {
        enable: true,
        package: &apos;egg-view-nunjucks&apos;
 }

 //config/config/default.js &#x6DFB;&#x52A0;
 
 &apos;use strict&apos;
 ...
 module.exports = app =&gt; {
     ...
     config.view = {
         mapping: {
             &apos;.html&apos;: &apos;nunjucks&apos;
         },
         root: path.join(appInfo.baseDir, &apos;app/view&apos;)
     }
     ...
     return config&#xFF1B;
 }
 
 //app/routes/sign.js
   
   &apos;use strict&apos;;
   
    module.exports = (router, controller) =&gt; {
        router.get(&apos;/sign/modifyPassword&apos;, controller.sign.modifyPassword);
    };

 //app/controller/sign.js
 
 &apos;use strict&apos;;

  const Controller = require(&apos;egg&apos;).Controller;
    
  class SignController extends Controller {
        async modifyPassword() {
            const { ctx } = this;
            //&#x6E32;&#x67D3;view/sign/modifyPassword.html
            await ctx.render(&apos;sign/modifyPassword.html&apos;);
        }
   }
    
   module.exports = SignController;

   


















" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x5728;config/plugin.js&#x91CC;&#x9762;&#x6DFB;&#x52A0;</span>
<span class="hljs-meta">
&apos;use strict&apos;</span>

 exports.nunjucks = {
        <span class="hljs-attr">enable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">package</span>: <span class="hljs-string">&apos;egg-view-nunjucks&apos;</span>
 }

 <span class="hljs-comment">//config/config/default.js &#x6DFB;&#x52A0;</span>
<span class="hljs-meta"> 
 &apos;use strict&apos;</span>
 ...
 module.exports = <span class="hljs-function"><span class="hljs-params">app</span> =&gt;</span> {
     ...
     config.view = {
         <span class="hljs-attr">mapping</span>: {
             <span class="hljs-string">&apos;.html&apos;</span>: <span class="hljs-string">&apos;nunjucks&apos;</span>
         },
         <span class="hljs-attr">root</span>: path.join(appInfo.baseDir, <span class="hljs-string">&apos;app/view&apos;</span>)
     }
     ...
     return config&#xFF1B;
 }
 
 <span class="hljs-comment">//app/routes/sign.js</span>
<span class="hljs-meta">   
   &apos;use strict&apos;</span>;
   
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-function">(<span class="hljs-params">router, controller</span>) =&gt;</span> {
        router.get(<span class="hljs-string">&apos;/sign/modifyPassword&apos;</span>, controller.sign.modifyPassword);
    };

 <span class="hljs-comment">//app/controller/sign.js</span>
<span class="hljs-meta"> 
 &apos;use strict&apos;</span>;

  <span class="hljs-keyword">const</span> Controller = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;egg&apos;</span>).Controller;
    
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SignController</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Controller</span> </span>{
        <span class="hljs-keyword">async</span> modifyPassword() {
            <span class="hljs-keyword">const</span> { ctx } = <span class="hljs-keyword">this</span>;
            <span class="hljs-comment">//&#x6E32;&#x67D3;view/sign/modifyPassword.html</span>
            <span class="hljs-keyword">await</span> ctx.render(<span class="hljs-string">&apos;sign/modifyPassword.html&apos;</span>);
        }
   }
    
   <span class="hljs-built_in">module</span>.exports = SignController;

   


















</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Egg.js学习

## 原文链接
[https://segmentfault.com/a/1190000016378796](https://segmentfault.com/a/1190000016378796)


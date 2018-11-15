---
title: Vue全家桶+Socket.io+Koa2打造一个智能聊天室 接口已开放
hidden: true
categories: reprint
slug: 7fd30818
date: 2018-10-24 08:17:54
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue.js+Socket.io+Koa2&#x6253;&#x9020;&#x4E00;&#x4E2A;&#x667A;&#x80FD;&#x804A;&#x5929;&#x5BA4;</h1>
<p>Vue.js&#x5168;&#x5BB6;&#x6876;+Socket.io+Express/Koa2 &#x6253;&#x9020;&#x7684;&#x4E00;&#x4E2A;&#x667A;&#x80FD;&#x804A;&#x5929;&#x5BA4;&#x3002;<br>&#x5DF2;&#x7ECF;&#x5F00;&#x6E90;&#x5566;&#xFF01;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x5B66;&#x4E60;&#xFF0C;&#x667A;&#x80FD;&#x673A;&#x5668;&#x4EBA;&#x3001;IP&#x5B9A;&#x4F4D;&#x63A5;&#x53E3;&#x4E5F;&#x5F00;&#x653E;&#x4E86;&#xFF01;&#x63A5;&#x53E3;&#x8BF7;&#x5728;&#x6E90;&#x7801;&#x4E2D;&#x67E5;&#x770B;?</p>
<blockquote><p>&#xA0;&#xA0;&#xA0;QQ&#x7FA4;&#x91CC;&#x9762;&#x7684;&#x667A;&#x80FD;&#x673A;&#x5668;&#x4EBA;&#x5F88;&#x706B;&#xFF0C;&#x4E8E;&#x662F;&#x7528;Vue.js+Socket.io+Koa2&#x6253;&#x9020;&#x4E86;&#x4E00;&#x4E2A;&#x667A;&#x80FD;&#x804A;&#x5929;&#x5BA4;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;IP&#x5B9A;&#x4F4D;&#x3001;&#x5728;&#x7EBF;&#x7FA4;&#x804A;&#xFF0C;&#x52A0;&#x5165;&#x4E86;Emoji&#x8868;&#x60C5;?&#xFF0C;&#x4EE5;&#x53CA;&#x63A5;&#x5165;&#x4E86;&#x667A;&#x80FD;&#x673A;&#x5668;&#x4EBA;?</p></blockquote>
<h2 id="articleHeader1">&#x524D;&#x8A00;</h2>
<p>&#x8BDD;&#x8BF4;&#x6700;&#x8FD1;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x5708;&#x4E5F;&#x6709;&#x6D3E;&#x7CFB;&#x4E4B;&#x4E89;&#x4E86;&#xFF0C;&#x662F;&#x597D;&#x4E8B;&#x8FD8;&#x662F;&#x574F;&#x4E8B;&#xFF1F;&#x841D;&#x535C;&#x9752;&#x83DC;&#x5404;&#x6709;&#x6240;&#x7231;&#xFF0C;&#x672C;&#x9879;&#x76EE;&#x91C7;&#x7528;&#x7684;&#x662F;Vue.js&#x505A;&#x524D;&#x7AEF;&#x9875;&#x9762;&#x5C55;&#x793A;&#xFF0C;&#x5927;&#x5BB6;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x6362;&#x6210;&#x81EA;&#x5DF1;&#x522B;&#x7684;&#x559C;&#x6B22;&#x7684;&#xFF0C;React&#x3001;Angular&#x7B49;&#x7B49;&#xFF0C;&#x6BCF;&#x4E2A;&#x6846;&#x67B6;&#x90FD;&#x6709;&#x53EF;&#x53D6;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8FD9;&#x91CC;&#x4E0D;&#x591A;&#x8BF4;?&#x4E0B;&#x9762;&#x626F;&#x5230;&#x6B63;&#x9898;&#x4E0A;?</p>
<h2 id="articleHeader2">&#x9884;&#x89C8;</h2>
<p>&#x5728;&#x7EBF;&#x9884;&#x89C8;&#x5730;&#x5740;&#xFF1A;? <a href="https://microzz.com/vue-chat/" rel="nofollow noreferrer" target="_blank">https://microzz.com/vue-chat/</a></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009368581?w=724&amp;h=1473" del-src="https://static.alili.tech/img/remote/1460000009368581?w=724&amp;h=1473" alt="Vue.js+Socket.io &#x667A;&#x80FD;&#x804A;&#x5929;&#x5BA4; microzz.com" title="Vue.js+Socket.io &#x667A;&#x80FD;&#x804A;&#x5929;&#x5BA4; microzz.com" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/remote/1460000009368582?w=724&amp;h=1473" del-src="https://static.alili.tech/img/remote/1460000009368581?w=724&amp;h=1473" alt="Vue.js+Socket.io &#x667A;&#x80FD;&#x804A;&#x5929;&#x5BA4; microzz.com" title="Vue.js+Socket.io &#x667A;&#x80FD;&#x804A;&#x5929;&#x5BA4; microzz.com" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">&#x6E90;&#x4EE3;&#x7801;</h2>
<p>&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x5F00;&#x6E90;&#xFF1A; ?<a href="https://github.com/microzz/vue-chat" rel="nofollow noreferrer" target="_blank">https://github.com/microzz/vu...</a><br> &#x6B22;&#x8FCE;star&#x548C;&#x63D0;&#x51FA;&#x5B9D;&#x8D35;&#x610F;&#x89C1;?</p>
<h2 id="articleHeader4">&#x6280;&#x672F;&#x6808;</h2>
<ul>
<li><p><strong>Vue2.0</strong>&#xFF1A;&#x524D;&#x7AEF;&#x9875;&#x9762;&#x5C55;&#x793A;&#x3002;</p></li>
<li><p><strong>Socket.io</strong>&#xFF1A;&#x5B9E;&#x73B0;&#x5B9E;&#x65F6;&#x901A;&#x4FE1;</p></li>
<li><p><strong>Vuex</strong>&#xFF1A;Vuex&#xFF0C;&#x5B9E;&#x73B0;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x72B6;&#x6001;&#x5171;&#x4EAB;</p></li>
<li><p><strong>vue-router</strong>&#xFF1A;&#x9875;&#x9762;&#x8DEF;&#x7531;&#x5207;&#x6362;</p></li>
<li><p><strong>axios</strong>&#xFF1A;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; <code>Promise</code> &#x7684; HTTP &#x5E93;&#xFF0C;&#x5411;&#x540E;&#x7AEF;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x3002;</p></li>
<li><p><strong>Express</strong>&#x3001;<strong>Koa2</strong>&#xFF1A;&#x56E0;&#x4E3A;vue-cli&#x751F;&#x6210;&#x7684;&#x9879;&#x76EE;&#x662F;&#x57FA;&#x4E8E;<strong>express</strong>&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x6211;&#x4F7F;&#x7528;&#x7684;&#x662F;&#x5B83;&#xFF0C;&#x4F46;&#x662F;&#x771F;&#x6B63;&#x4E0A;&#x7EBF;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x6211;&#x6362;&#x6210;&#x4E86;<strong>Koa2</strong>&#x3002;</p></li>
<li><p><strong>Moment.js</strong>&#xFF1A;&#x4E00;&#x4E2A;&#x65F6;&#x95F4;&#x5904;&#x7406;&#x7684;&#x5E93;&#xFF0C;&#x65B9;&#x4FBF;&#x5BF9;&#x65F6;&#x95F4;&#x8FDB;&#x884C;&#x683C;&#x5F0F;&#x5316;&#x6210;&#x9700;&#x8981;&#x7684;&#x683C;&#x5F0F;&#x3002;</p></li>
<li><p><strong>ES6</strong>&#x3001;<strong>ES7</strong>&#xFF1A;&#x91C7;&#x7528;ES6&#x8BED;&#x6CD5;&#xFF0C;&#x8FD9;&#x662F;&#x4EE5;&#x540E;&#x7684;&#x8D8B;&#x52BF;&#x3002;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;Promise&#x7B49;&#x7B49;&#x8BED;&#x6CD5;&#x5F88;&#x597D;&#x7528;&#x3002;</p></li>
<li><p><strong>localStorage</strong>&#xFF1A;&#x4FDD;&#x5B58;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x4EE5;&#x53CA;&#x804A;&#x5929;&#x8BB0;&#x5F55;&#x3002;</p></li>
<li><p><strong>Webpack</strong>&#xFF1A;vue-cli&#x81EA;&#x5E26;Webpack&#xFF0C;&#x4F46;&#x662F;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x6539;&#x9020;&#x4E00;&#x4E0B;&#xFF0C;&#x6BD4;&#x5982;&#x8981;&#x5BF9;&#x9700;&#x8981;&#x5B89;&#x88C5;sass&#x76F8;&#x5173;loader&#xFF0C;vue-cli&#x5DF2;&#x7ECF;&#x914D;&#x7F6E;&#x597D;&#x4E86;webpack&#xFF0C;&#x4F60;&#x53EA;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x4F9D;&#x8D56;&#x5C31;&#x53EF;&#x4EE5;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x65F6;&#x5019;&#x53EA;&#x9700;&#x8981;<code>&lt;style lang=&quot;scss&quot;&gt;&lt;/style&gt;</code>&#x3002;</p></li>
<li><p><strong>SASS</strong>(<strong>SCSS</strong>)&#xFF1A;&#x7528;SCSS&#x505A;CSS&#x9884;&#x5904;&#x7406;&#x8BED;&#x8A00;&#xFF0C;&#x6709;&#x4E9B;&#x5730;&#x65B9;&#x5F88;&#x65B9;&#x4FBF;&#xFF0C;&#x4E2A;&#x4EBA;&#x5F88;&#x559C;&#x6B22;&#x7528;&#x3002;(&#x8BE6;&#x770B;?<a href="https://microzz.com/2017/03/18/sass/" rel="nofollow noreferrer" target="_blank">SASS&#x7528;&#x6CD5;&#x6307;&#x5357;</a>)</p></li>
<li><p><strong>flex</strong>&#xFF1A;flex&#x5F39;&#x6027;&#x5E03;&#x5C40;&#xFF0C;<strong>&#x7B80;&#x5355;</strong>&#x9002;&#x914D;&#x624B;&#x673A;&#x3001;PC&#x7AEF;&#x3002;</p></li>
<li><p><strong>CSS3</strong>&#xFF1A;CSS3&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#x53CA;&#x6837;&#x5F0F;&#x3002;</p></li>
</ul>
<h2 id="articleHeader5">&#x5206;&#x6790;</h2>
<h3 id="articleHeader6">Socket.io</h3>
<p>&#x901A;&#x8FC7;Express/Koa&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x505A;:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Server (app.js)

var app = require(&apos;express&apos;)();
var server = require(&apos;http&apos;).Server(app);
var io = require(&apos;socket.io&apos;)(server);

server.listen(80);

app.get(&apos;/&apos;, function (req, res) {
  res.sendfile(__dirname + &apos;/index.html&apos;);
});

io.on(&apos;connection&apos;, function (socket) {
  socket.emit(&apos;news&apos;, { hello: &apos;world&apos; });
  socket.on(&apos;my other event&apos;, function (data) {
    console.log(data);
  });
});" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Server (app.js)</span>

<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>)();
<span class="hljs-keyword">var</span> server = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>).Server(app);
<span class="hljs-keyword">var</span> io = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;socket.io&apos;</span>)(server);

server.listen(<span class="hljs-number">80</span>);

app.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  res.sendfile(__dirname + <span class="hljs-string">&apos;/index.html&apos;</span>);
});

io.on(<span class="hljs-string">&apos;connection&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">socket</span>) </span>{
  socket.emit(<span class="hljs-string">&apos;news&apos;</span>, { <span class="hljs-attr">hello</span>: <span class="hljs-string">&apos;world&apos;</span> });
  socket.on(<span class="hljs-string">&apos;my other event&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
  });
});</code></pre>
<p>&#x5BA2;&#x6237;&#x7AEF;&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Client (index.html)

&lt;script src=&quot;/socket.io/socket.io.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
  var socket = io.connect(&apos;http://localhost&apos;);
  socket.on(&apos;news&apos;, function (data) {
    console.log(data);
    socket.emit(&apos;my other event&apos;, { my: &apos;data&apos; });
  });
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Client (index.html)</span>

&lt;script src=<span class="hljs-string">&quot;/socket.io/socket.io.js&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>
&lt;script&gt;
  <span class="hljs-keyword">var</span> socket = io.connect(<span class="hljs-string">&apos;http://localhost&apos;</span>);
  socket.on(<span class="hljs-string">&apos;news&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(data);
    socket.emit(<span class="hljs-string">&apos;my other event&apos;</span>, { <span class="hljs-attr">my</span>: <span class="hljs-string">&apos;data&apos;</span> });
  });
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>&#x4E0D;&#x7BA1;&#x662F;&#x670D;&#x52A1;&#x5668;&#x8FD8;&#x662F;&#x5BA2;&#x6237;&#x7AEF;&#x90FD;&#x6709; <code>emit</code> &#x548C; <code>on</code> &#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4; socket.io &#x7684;&#x6838;&#x5FC3;&#x5C31;&#x662F;&#x8FD9;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#x4E86;&#xFF0C;&#x901A;&#x8FC7; <code>emit</code> &#x548C; <code>on</code> &#x53EF;&#x4EE5;&#x8F7B;&#x677E;&#x5730;&#x5B9E;&#x73B0;&#x670D;&#x52A1;&#x5668;&#x4E0E;&#x5BA2;&#x6237;&#x7AEF;&#x4E4B;&#x95F4;&#x7684;&#x53CC;&#x5411;&#x901A;&#x4FE1;&#x3002;</p>
<p><code>emit</code> &#xFF1A;&#x7528;&#x6765;&#x53D1;&#x5C04;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x6216;&#x8005;&#x8BF4;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x4E8B;&#x4EF6;&#x540D;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x8981;&#x53D1;&#x9001;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF08;&#x4E00;&#x822C;&#x7701;&#x7565;&#xFF0C;&#x5982;&#x9700;&#x5BF9;&#x65B9;&#x63A5;&#x53D7;&#x5230;&#x4FE1;&#x606F;&#x540E;&#x7ACB;&#x5373;&#x5F97;&#x5230;&#x786E;&#x8BA4;&#x65F6;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x7528;&#x5230;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF09;&#x3002;<br><code>on</code> &#xFF1A;&#x7528;&#x6765;&#x76D1;&#x542C;&#x4E00;&#x4E2A; emit &#x53D1;&#x5C04;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x8981;&#x76D1;&#x542C;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7528;&#x6765;&#x63A5;&#x6536;&#x5BF9;&#x65B9;&#x53D1;&#x6765;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8BE5;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x82E5;&#x6709;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5219;&#x4E3A;&#x8981;&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#x3002;<br>socket.io &#x63D0;&#x4F9B;&#x4E86;&#x4E09;&#x79CD;&#x9ED8;&#x8BA4;&#x7684;&#x4E8B;&#x4EF6;&#xFF08;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x5668;&#x90FD;&#x6709;&#xFF09;&#xFF1A;<code>connect</code> &#x3001;<code>message</code> &#x3001;<code>disconnect</code> &#x3002;&#x5F53;&#x4E0E;&#x5BF9;&#x65B9;&#x5EFA;&#x7ACB;&#x8FDE;&#x63A5;&#x540E;&#x81EA;&#x52A8;&#x89E6;&#x53D1; <code>connect</code> &#x4E8B;&#x4EF6;&#xFF0C;&#x5F53;&#x6536;&#x5230;&#x5BF9;&#x65B9;&#x53D1;&#x6765;&#x7684;&#x6570;&#x636E;&#x540E;&#x89E6;&#x53D1; <code>message</code> &#x4E8B;&#x4EF6;&#xFF08;&#x901A;&#x5E38;&#x4E3A; <code>socket.send()</code> &#x89E6;&#x53D1;&#xFF09;&#xFF0C;&#x5F53;&#x5BF9;&#x65B9;&#x5173;&#x95ED;&#x8FDE;&#x63A5;&#x540E;&#x89E6;&#x53D1; <code>disconnect</code> &#x4E8B;&#x4EF6;&#x3002;</p>
<p>&#x6B64;&#x5916;&#xFF0C;socket.io &#x8FD8;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#xFF0C;&#x6BD5;&#x7ADF;&#x4EE5;&#x4E0A;&#x4E09;&#x79CD;&#x4E8B;&#x4EF6;&#x5E94;&#x7528;&#x8303;&#x56F4;&#x6709;&#x9650;&#xFF0C;&#x6B63;&#x662F;&#x901A;&#x8FC7;&#x8FD9;&#x4E9B;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E8B;&#x4EF6;&#x624D;&#x5B9E;&#x73B0;&#x4E86;&#x4E30;&#x5BCC;&#x591A;&#x5F69;&#x7684;&#x901A;&#x4FE1;&#x3002;</p>
<p>&#x6700;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5728;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x533A;&#x5206;&#x4EE5;&#x4E0B;&#x4E09;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p>
<p><code>socket.emit()</code> &#xFF1A;&#x5411;&#x5EFA;&#x7ACB;&#x8BE5;&#x8FDE;&#x63A5;&#x7684;&#x5BA2;&#x6237;&#x7AEF;&#x5E7F;&#x64AD;<br><code>socket.broadcast.emit()</code> &#xFF1A;&#x5411;&#x9664;&#x53BB;&#x5EFA;&#x7ACB;&#x8BE5;&#x8FDE;&#x63A5;&#x7684;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x6240;&#x6709;&#x5BA2;&#x6237;&#x7AEF;&#x5E7F;&#x64AD;<br><code>io.sockets.emit()</code> &#xFF1A;&#x5411;&#x6240;&#x6709;&#x5BA2;&#x6237;&#x7AEF;&#x5E7F;&#x64AD;&#xFF0C;&#x7B49;&#x540C;&#x4E8E;&#x4E0A;&#x9762;&#x4E24;&#x4E2A;&#x7684;&#x548C;</p>
<h2 id="articleHeader7">Vue.js</h2>
<p>&#x5728;Vue&#x7684;&#x65B9;&#x9762;&#x5C31;&#x6BD4;&#x8F83;&#x5E38;&#x89C4;&#x4E86;&#xFF0C;Vue&#x5168;&#x5BB6;&#x6876;&#xFF1A;Vue2.0+Vuex+axios+vue-router,&#x6211;GitHub&#x7684;&#x6709;&#x51E0;&#x4E2A;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#x53EF;&#x4EE5;&#x53C2;&#x8003;?<a href="https://github.com/microzz" rel="nofollow noreferrer" target="_blank">https://github.com/microzz</a></p>
<h2 id="articleHeader8">&#x603B;&#x7ED3;</h2>
<ol><li><p>&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x591A;&#x4E86;&#x7528;Vuex&#x7BA1;&#x7406;&#x5F88;&#x65B9;&#x4FBF;&#xFF0C;&#x5F15;&#x7528; Redux &#x7684;&#x4F5C;&#x8005; Dan Abramov &#x7684;&#x8BDD;&#x8BF4;&#x5C31;&#x662F;&#xFF1A;</p></li></ol>
<blockquote><p>Flux &#x67B6;&#x6784;&#x5C31;&#x50CF;&#x773C;&#x955C;&#xFF1A;&#x60A8;&#x81EA;&#x4F1A;&#x77E5;&#x9053;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x9700;&#x8981;&#x5B83;&#x3002;</p></blockquote>
<ol>
<li><p>&#x4E8B;&#x5148;&#x4E00;&#x5B9A;&#x8981;&#x5148;&#x60F3;&#x597D;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x7EC4;&#x6210;&#xFF0C;&#x600E;&#x6837;&#x53BB;&#x5206;&#x7EC4;&#x4EF6;&#x5F00;&#x53D1;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x4F1A;&#x4E8B;&#x534A;&#x529F;&#x500D;&#x3002;</p></li>
<li><p>Moment.js&#x5728;Vue&#x4E2D;&#x7528;ES6&#x7684;&#x65B9;&#x5F0F;&#x5F15;&#x5165;&#x4F1A;&#x6709;&#x95EE;&#x9898;&#xFF0C;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x5728;main.js&#x5C1D;&#x8BD5;&#x8FD9;&#x6837;<code>import moment from &apos;moment&apos;</code> <code>Vue.prototype.moment = moment;</code>&#x7ED9;Vue&#x7684;&#x539F;&#x578B;&#x4E0A;&#x6DFB;&#x52A0;moment&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x5728;Vue&#x7684;&#x5B9E;&#x4F8B;&#x4E2D;&#x968F;&#x610F;&#x4F7F;&#x7528;&#x5B83;&#x4E86;&#x3002;</p></li>
<li><p>get&#x65B9;&#x5F0F;&#x901A;&#x8FC7;URL&#x4F20;&#x53C2;&#x6700;&#x597D;&#x4F7F;&#x7528;<code>encodeURI</code>&#x5BF9;&#x53C2;&#x6570;&#x8FDB;&#x884C;&#x7F16;&#x7801;</p></li>
<li><p>&#x4E00;&#x5B9A;&#x8981;&#x5904;&#x7406;&#x597D;&#x90A3;&#x4E9B;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x5426;&#x5219;&#x4F1A;&#x5E26;&#x6765;&#x5404;&#x79CD;&#x95EE;&#x9898;&#x3002;&#x5F00;&#x53D1;&#x9636;&#x6BB5;&#x4F7F;&#x7528;&#x7684;&#x662F;<code>Promise</code>&#xFF0C;&#x4E0A;&#x7EBF;&#x65F6;&#x5019;&#x4F7F;&#x7528;&#x4E86;ES7&#x7684;<code>Async</code>+<code>Promise</code>&#x7684;&#x7EC4;&#x5408;&#xFF0C;&#x8BA9;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x66F4;&#x52A0;&#x5408;&#x7406;&#x3002;</p></li>
</ol>
<h2 id="articleHeader9">About</h2>
<p>&#x5173;&#x4E8E;&#x6211;&#xFF1A;?<a href="https://microzz.com/about/" rel="nofollow noreferrer" target="_blank">https://microzz.com/about/</a></p>
<p>GitHub&#xFF1A;? <a href="https://github.com/microzz" rel="nofollow noreferrer" target="_blank">https://github.com/microzz</a></p>
<p>E-mail: ? <a href="mailto:zhaohui@microzz.com">zhaohui@microzz.com</a></p>
<p>&#x4E2A;&#x4EBA;&#x7F51;&#x7AD9;&#xFF1A; ?<a href="https://microzz.com/" rel="nofollow noreferrer" target="_blank">https://microzz.com/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶+Socket.io+Koa2打造一个智能聊天室 接口已开放

## 原文链接
[https://segmentfault.com/a/1190000009369312](https://segmentfault.com/a/1190000009369312)


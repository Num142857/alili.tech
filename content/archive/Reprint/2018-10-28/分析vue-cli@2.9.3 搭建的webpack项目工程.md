---
title: 分析vue-cli@2.9.3 搭建的webpack项目工程
hidden: true
categories: reprint
slug: eba15795
date: 2018-10-28 02:30:10
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><blockquote>&#x5DF2;&#x7ECF;&#x6709;&#x5F88;&#x591A;&#x5206;&#x6790;<code>Vue-cli</code>&#x642D;&#x5EFA;&#x5DE5;&#x7A0B;&#x7684;&#x6587;&#x7AE0;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x81EA;&#x5DF1;&#x8FD8;&#x8981;&#x5199;&#x4E00;&#x904D;&#x5462;&#x3002;&#x5B66;&#x4E60;&#x5C31;&#x597D;&#x6BD4;&#x662F;&#x5EA7;&#x5927;&#x5C71;&#xFF0C;&#x4EBA;&#x4EEC;&#x6CBF;&#x7740;&#x4E0D;&#x540C;&#x7684;&#x8DEF;&#x767B;&#x5C71;&#xFF0C;&#x5206;&#x4EAB;&#x7740;&#x81EA;&#x5DF1;&#x770B;&#x5230;&#x7684;&#x98CE;&#x666F;&#x3002;&#x4F60;&#x4E0D;&#x4E00;&#x5B9A;&#x80FD;&#x770B;&#x5230;&#x522B;&#x4EBA;&#x770B;&#x5230;&#x7684;&#x98CE;&#x666F;&#xFF0C;&#x4F53;&#x4F1A;&#x5230;&#x522B;&#x4EBA;&#x7684;&#x5FC3;&#x60C5;&#x3002;&#x53EA;&#x6709;&#x81EA;&#x5DF1;&#x53BB;&#x767B;&#x5C71;&#xFF0C;&#x624D;&#x80FD;&#x770B;&#x5230;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x98CE;&#x666F;&#xFF0C;&#x4F53;&#x4F1A;&#x624D;&#x66F4;&#x52A0;&#x6DF1;&#x523B;&#x3002;</blockquote><p><strong>&#x9879;&#x76EE;&#x653E;&#x5728;&#x7B14;&#x8005;&#x7684;<code>github</code>&#x4E0A;&#xFF0C;<a href="https://github.com/lxchuan12/analyse-vue-cli" rel="nofollow noreferrer" target="_blank">&#x5206;&#x6790;vue-cli@2.9.3 &#x642D;&#x5EFA;&#x7684;webpack&#x9879;&#x76EE;&#x5DE5;&#x7A0B;</a>&#x3002;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x514B;&#x9686;&#x4E0B;&#x8F7D;&#xFF0C;&#x6216;&#x8005;&#x5728;&#x7EBF;&#x67E5;&#x770B;&#x3002;&#x540C;&#x65F6;&#x4E5F;&#x6C42;&#x4E2A;<code>star</code> <code>^_^</code>&#xFF0C;&#x4E5F;&#x662F;&#x5BF9;&#x7B14;&#x8005;&#x7684;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x548C;&#x652F;&#x6301;&#x3002;</strong></p><p>&#x6B63;&#x6587;&#x4ECE;&#x8FD9;&#x91CC;&#x5F00;&#x59CB;&#xFF5E;</p><h3 id="articleHeader1">&#x4F7F;&#x7528;<code>vue-cli</code>&#x521D;&#x59CB;&#x5316;<code>webpack</code>&#x5DE5;&#x7A0B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// # &#x5B89;&#x88C5;
npm install -g vue-cli
// &#x5B89;&#x88C5;&#x5B8C;&#x540E;vue&#x547D;&#x4EE4;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x4E86;vue&#x3001;vue-init&#x3001;vue-list&#x51E0;&#x4E2A;&#x547D;&#x4EE4;

// # ubuntu &#x7CFB;&#x7EDF;&#x4E0B;
// [vue-cli@2.9.3] link /usr/local/bin/vue@ -&gt; /usr/local/lib/node_modules/vue-cli/bin/vue
// [vue-cli@2.9.3] link /usr/local/bin/vue-init@ -&gt; /usr/local/lib/node_modules/vue-cli/bin/vue-init
// [vue-cli@2.9.3] link /usr/local/bin/vue-list@ -&gt; /usr/local/lib/node_modules/vue-cli/bin/vue-list

vue list
// &#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x6709;browserify&#x3001;browserify-simple&#x3001;pwa&#x3001;simple&#x3001;webpack&#x3001;webpack-simple&#x51E0;&#x79CD;&#x6A21;&#x677F;&#x53EF;&#x9009;&#xFF0C;&#x8FD9;&#x91CC;&#x9009;&#x7528;webpack&#x3002;

// # &#x4F7F;&#x7528; vue init
vue init &lt;template-name&gt; &lt;project-name&gt;

// # &#x4F8B;&#x5B50;
vue init webpack analyse-vue-cli" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code>/<span class="hljs-regexp">/ # &#x5B89;&#x88C5;
npm install -g vue-cli
/</span><span class="hljs-regexp">/ &#x5B89;&#x88C5;&#x5B8C;&#x540E;vue&#x547D;&#x4EE4;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x4E86;vue&#x3001;vue-init&#x3001;vue-list&#x51E0;&#x4E2A;&#x547D;&#x4EE4;

/</span><span class="hljs-regexp">/ # ubuntu &#x7CFB;&#x7EDF;&#x4E0B;
/</span><span class="hljs-regexp">/ [vue-cli@2.9.3] link /usr</span><span class="hljs-regexp">/local/bin</span><span class="hljs-regexp">/vue@ -&gt; /usr</span><span class="hljs-regexp">/local/lib</span><span class="hljs-regexp">/node_modules/vue</span>-cli/bin/vue
/<span class="hljs-regexp">/ [vue-cli@2.9.3] link /usr</span><span class="hljs-regexp">/local/bin</span><span class="hljs-regexp">/vue-init@ -&gt; /usr</span><span class="hljs-regexp">/local/lib</span><span class="hljs-regexp">/node_modules/vue</span>-cli/bin/vue-init
/<span class="hljs-regexp">/ [vue-cli@2.9.3] link /usr</span><span class="hljs-regexp">/local/bin</span><span class="hljs-regexp">/vue-list@ -&gt; /usr</span><span class="hljs-regexp">/local/lib</span><span class="hljs-regexp">/node_modules/vue</span>-cli/bin/vue-list

vue list
/<span class="hljs-regexp">/ &#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x6709;browserify&#x3001;browserify-simple&#x3001;pwa&#x3001;simple&#x3001;webpack&#x3001;webpack-simple&#x51E0;&#x79CD;&#x6A21;&#x677F;&#x53EF;&#x9009;&#xFF0C;&#x8FD9;&#x91CC;&#x9009;&#x7528;webpack&#x3002;

/</span><span class="hljs-regexp">/ # &#x4F7F;&#x7528; vue init
vue init &lt;template-name&gt; &lt;project-name&gt;

/</span><span class="hljs-regexp">/ # &#x4F8B;&#x5B50;
vue init webpack analyse-vue-cli</span></code></pre><p>&#x66F4;&#x591A;<code>vue-cli</code>&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;<a href="https://juejin.im/post/5a7b1b86f265da4e8f049081" rel="nofollow noreferrer" target="_blank">vue-cli&#x662F;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;</a>&#xFF0C;&#x6216;&#x8005;&#x5206;&#x6790;Vue-cli&#x6E90;&#x7801;&#x67E5;&#x770B;&#x8FD9;&#x7BC7;<a href="https://segmentfault.com/a/1190000013975247">&#x8D70;&#x8FDB;Vue-cli&#x6E90;&#x7801;&#xFF0C;&#x81EA;&#x5DF1;&#x52A8;&#x624B;&#x642D;&#x5EFA;&#x524D;&#x7AEF;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;</a>&#xFF0C;&#x518D;&#x6216;&#x8005;&#x76F4;&#x63A5;&#x67E5;&#x770B;<a href="https://github.com/vuejs/vue-cli/tree/master" rel="nofollow noreferrer" target="_blank">vue-cli github&#x4ED3;&#x5E93;&#x6E90;&#x7801;</a></p><p>&#x5982;&#x679C;&#x5BF9;<code>webpack</code>&#x8FD8;&#x4E0D;&#x662F;&#x5F88;&#x4E86;&#x89E3;&#xFF0C;&#x53EF;&#x4EE5;&#x67E5;&#x770B;<a href="https://webpack.docschina.org/concepts/" rel="nofollow noreferrer" target="_blank">webpack&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x6982;&#x5FF5;</a>&#xFF0C;&#x867D;&#x7136;&#x662F;&#x6700;&#x65B0;&#x7248;&#x672C;&#x7684;&#xFF0C;&#x4F46;&#x6982;&#x5FF5;&#x90FD;&#x662F;&#x5DEE;&#x4E0D;&#x591A;&#x7684;&#x3002;</p><h3 id="articleHeader2"><code>package.json</code></h3><p>&#x5206;&#x6790;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x4E00;&#x822C;&#x4ECE;<code>package.json</code>&#x7684;&#x547D;&#x4EE4;&#x5165;&#x53E3;<code>scripts</code>&#x5F00;&#x59CB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  // dev webpack-dev-server --inline &#x6A21;&#x5F0F; --progress &#x663E;&#x793A;&#x8FDB;&#x5EA6; --config &#x6307;&#x5B9A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF08;&#x9ED8;&#x8BA4;&#x662F;webpack.config.js&#xFF09;
  &quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;,
  &quot;start&quot;: &quot;npm run dev&quot;,
  // jest&#x6D4B;&#x8BD5;
  &quot;unit&quot;: &quot;jest --config test/unit/jest.conf.js --coverage&quot;,
  // e2e&#x6D4B;&#x8BD5;
  &quot;e2e&quot;: &quot;node test/e2e/runner.js&quot;,
  // &#x8FD0;&#x884C;jest&#x6D4B;&#x8BD5;&#x548C;e2e&#x6D4B;&#x8BD5;
  &quot;test&quot;: &quot;npm run unit &amp;&amp; npm run e2e&quot;,
  // eslint --ext &#x6307;&#x5B9A;&#x6269;&#x5C55;&#x540D;&#x548C;&#x76F8;&#x5E94;&#x7684;&#x6587;&#x4EF6;
  &quot;lint&quot;: &quot;eslint --ext .js,.vue src test/unit test/e2e/specs&quot;,
  // node &#x6267;&#x884C;build/build.js&#x6587;&#x4EF6;
  &quot;build&quot;: &quot;node build/build.js&quot;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-comment">// dev webpack-dev-server --inline &#x6A21;&#x5F0F; --progress &#x663E;&#x793A;&#x8FDB;&#x5EA6; --config &#x6307;&#x5B9A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF08;&#x9ED8;&#x8BA4;&#x662F;webpack.config.js&#xFF09;</span>
  <span class="hljs-string">&quot;dev&quot;</span>: <span class="hljs-string">&quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;</span>,
  <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;npm run dev&quot;</span>,
  <span class="hljs-comment">// jest&#x6D4B;&#x8BD5;</span>
  <span class="hljs-string">&quot;unit&quot;</span>: <span class="hljs-string">&quot;jest --config test/unit/jest.conf.js --coverage&quot;</span>,
  <span class="hljs-comment">// e2e&#x6D4B;&#x8BD5;</span>
  <span class="hljs-string">&quot;e2e&quot;</span>: <span class="hljs-string">&quot;node test/e2e/runner.js&quot;</span>,
  <span class="hljs-comment">// &#x8FD0;&#x884C;jest&#x6D4B;&#x8BD5;&#x548C;e2e&#x6D4B;&#x8BD5;</span>
  <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;npm run unit &amp;&amp; npm run e2e&quot;</span>,
  <span class="hljs-comment">// eslint --ext &#x6307;&#x5B9A;&#x6269;&#x5C55;&#x540D;&#x548C;&#x76F8;&#x5E94;&#x7684;&#x6587;&#x4EF6;</span>
  <span class="hljs-string">&quot;lint&quot;</span>: <span class="hljs-string">&quot;eslint --ext .js,.vue src test/unit test/e2e/specs&quot;</span>,
  <span class="hljs-comment">// node &#x6267;&#x884C;build/build.js&#x6587;&#x4EF6;</span>
  <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;node build/build.js&quot;</span>
},</code></pre><p><code>Npm Script</code> &#x5E95;&#x5C42;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#x662F;&#x901A;&#x8FC7;&#x8C03;&#x7528; <code>Shell</code> &#x53BB;&#x8FD0;&#x884C;&#x811A;&#x672C;&#x547D;&#x4EE4;&#x3002;<code>npm run start</code>&#x7B49;&#x540C;&#x4E8E;&#x8FD0;&#x884C;<code>npm run dev</code>&#x3002;</p><p><code>Npm Script</code> &#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x529F;&#x80FD;&#x662F;&#x80FD;&#x8FD0;&#x884C;&#x5B89;&#x88C5;&#x5230;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x91CC;&#x7684; <code>node_modules</code> &#x91CC;&#x7684;&#x53EF;&#x6267;&#x884C;&#x6A21;&#x5757;&#x3002;</p><p>&#x4F8B;&#x5982;&#x5728;&#x901A;&#x8FC7;&#x547D;&#x4EE4;<code>npm i -D webpack-dev-server</code>&#x5C06;<code>webpack-dev-server</code>&#x5B89;&#x88C5;&#x5230;&#x9879;&#x76EE;&#x540E;&#xFF0C;&#x662F;&#x65E0;&#x6CD5;&#x76F4;&#x63A5;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x901A;&#x8FC7;&#x547D;&#x4EE4; <code>webpack-dev-server</code> &#x53BB;&#x6267;&#x884C; <code>webpack-dev-server</code> &#x6784;&#x5EFA;&#x7684;&#xFF0C;&#x800C;&#x662F;&#x8981;&#x901A;&#x8FC7;&#x547D;&#x4EE4; <code>./node_modules/.bin/webpack-dev-server</code> &#x53BB;&#x6267;&#x884C;&#x3002;</p><p><code>Npm Script</code> &#x80FD;&#x65B9;&#x4FBF;&#x7684;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5728; <code>scripts</code> &#x5B57;&#x6BB5;&#x91CC;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs brainfuck"><code style="word-break:break-word;white-space:initial"><span class="hljs-comment">&quot;dev&quot;:</span> <span class="hljs-comment">&quot;webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">build/webpack</span><span class="hljs-string">.</span><span class="hljs-comment">dev</span><span class="hljs-string">.</span><span class="hljs-comment">conf</span><span class="hljs-string">.</span><span class="hljs-comment">js&quot;</span></code></pre><p><code>Npm Script</code> &#x4F1A;&#x5148;&#x53BB;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x4E0B;&#x7684; <code>node_modules</code> &#x4E2D;&#x5BFB;&#x627E;&#x6709;&#x6CA1;&#x6709;&#x53EF;&#x6267;&#x884C;&#x7684; <code>webpack-dev-server</code> &#x6587;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5C31;&#x4F7F;&#x7528;&#x672C;&#x5730;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5C31;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x7684;&#x3002; &#x6240;&#x4EE5;&#x73B0;&#x5728;&#x6267;&#x884C; <code>webpack-dev-server</code> &#x542F;&#x52A8;&#x670D;&#x52A1;&#x65F6;&#x53EA;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x6267;&#x884C; <code>npm run dev</code> &#x53BB;&#x5B9E;&#x73B0;&#x3002;</p><blockquote>&#x518D;&#x6765;&#x770B;&#x4E0B; npm run dev<br><code>webpack-dev-server</code> &#x5176;&#x5B9E;&#x662F;&#x4E00;&#x4E2A;<code>node.js</code>&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#xFF0C;&#x5B83;&#x662F;&#x901A;&#x8FC7;<code>JavaScript</code>&#x5F00;&#x53D1;&#x7684;&#x3002;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x6267;&#x884C;<code>npm run dev</code>&#x547D;&#x4EE4;&#x7B49;&#x540C;&#x4E8E;&#x6267;&#x884C;<code>node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --progress --config build/webpack.dev.conf.js</code>&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x8BD5;&#x8BD5;&#x3002;</blockquote><p>&#x66F4;&#x591A;<code>package.json</code>&#x7684;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x53EF;&#x4EE5;&#x67E5;&#x770B;<a href="http://javascript.ruanyifeng.com/nodejs/packagejson.html" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;&#x6587;&#x7AE0; package.json&#x6587;&#x4EF6;</a></p><p><code>npm run dev</code>&#x6307;&#x5B9A;&#x4E86;<code>build/webpack.dev.conf.js</code>&#x914D;&#x7F6E;&#x53BB;&#x542F;&#x52A8;&#x670D;&#x52A1;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E0B;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x505A;&#x4E86;&#x4EC0;&#x4E48;&#x3002;</p><h3 id="articleHeader3"><code>build/webpack.dev.conf.js</code> <code>webpack</code>&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x914D;&#x7F6E;</h3><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x505A;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;<br>1&#x3001;&#x5F15;&#x5165;&#x5404;&#x79CD;&#x4F9D;&#x8D56;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x5F15;&#x5165;&#x4E86;<code>config</code>&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x914D;&#x7F6E;&#xFF0C;&#x548C;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x51FD;&#x6570;<code>build/utils.js</code>&#xFF0C;<br>2&#x3001;&#x5408;&#x5E76;<code>build/webpack.base.conf.js</code>&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;<br>3&#x3001;&#x914D;&#x7F6E;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E00;&#x4E9B;<code>devServer</code>&#xFF0C;<code>plugin</code>&#x7B49;&#x914D;&#x7F6E;&#xFF0C;<br>4&#x3001;&#x6700;&#x540E;&#x5BFC;&#x51FA;&#x4E86;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x6839;&#x636E;&#x914D;&#x7F6E;&#x7684;&#x7AEF;&#x53E3;&#xFF0C;&#x5BFB;&#x627E;&#x53EF;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#x6765;&#x542F;&#x52A8;&#x670D;&#x52A1;&#x3002;</p><p>&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x770B;<code>build/webpack.dev.conf.js</code>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x6CE8;&#x91CA;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
// &#x5F15;&#x5165;&#x5DE5;&#x5177;&#x51FD;&#x6570;
const utils = require(&apos;./utils&apos;)
// &#x5F15;&#x5165;webpack
const webpack = require(&apos;webpack&apos;)
// &#x5F15;&#x5165;config/index.js&#x914D;&#x7F6E;
const config = require(&apos;../config&apos;)
// &#x5408;&#x5E76;webpack&#x914D;&#x7F6E;
const merge = require(&apos;webpack-merge&apos;)
const path = require(&apos;path&apos;)
// &#x57FA;&#x672C;&#x914D;&#x7F6E;
const baseWebpackConfig = require(&apos;./webpack.base.conf&apos;)
// &#x62F7;&#x8D1D;&#x63D2;&#x4EF6;
const CopyWebpackPlugin = require(&apos;copy-webpack-plugin&apos;)
// &#x751F;&#x6210;html&#x7684;&#x63D2;&#x4EF6;
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
// &#x53CB;&#x597D;&#x63D0;&#x793A;&#x7684;&#x63D2;&#x4EF6; https://github.com/geowarin/friendly-errors-webpack-plugin
const FriendlyErrorsPlugin = require(&apos;friendly-errors-webpack-plugin&apos;)
// &#x67E5;&#x627E;&#x53EF;&#x7528;&#x7AEF;&#x53E3; // github&#x4ED3;&#x5E93; https://github.com/indexzero/node-portfinder
const portfinder = require(&apos;portfinder&apos;)


// process&#x6A21;&#x5757;&#x7528;&#x6765;&#x4E0E;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x4E92;&#x52A8;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5168;&#x5C40;&#x53D8;&#x91CF;process&#x8BBF;&#x95EE;&#xFF0C;&#x4E0D;&#x5FC5;&#x4F7F;&#x7528;require&#x547D;&#x4EE4;&#x52A0;&#x8F7D;&#x3002;&#x5B83;&#x662F;&#x4E00;&#x4E2A;EventEmitter&#x5BF9;&#x8C61;&#x7684;&#x5B9E;&#x4F8B;&#x3002;

// &#x540E;&#x9762;&#x6709;&#x4E9B;process&#x6A21;&#x5757;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x7EDF;&#x4E00;&#x5217;&#x4E3E;&#x4E0B;&#x3002;
// &#x66F4;&#x591A;&#x67E5;&#x770B;&#x8FD9;&#x7BC7;&#x962E;&#x4E00;&#x5CF0;&#x7684;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0; http://javascript.ruanyifeng.com/nodejs/process.html

// process&#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x4E00;&#x7CFB;&#x5217;&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;&#x8FD4;&#x56DE;&#x7CFB;&#x7EDF;&#x4FE1;&#x606F;&#x3002;
// process.pid&#xFF1A;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x7684;&#x8FDB;&#x7A0B;&#x53F7;&#x3002;
// process.version&#xFF1A;Node&#x7684;&#x7248;&#x672C;&#xFF0C;&#x6BD4;&#x5982;v0.10.18&#x3002;
// process.platform&#xFF1A;&#x5F53;&#x524D;&#x7CFB;&#x7EDF;&#x5E73;&#x53F0;&#xFF0C;&#x6BD4;&#x5982;Linux&#x3002;
// process.title&#xFF1A;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;&#x201C;node&#x201D;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x8BE5;&#x503C;&#x3002;
// process.argv&#xFF1A;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570;&#x6570;&#x7EC4;&#x3002;
// process.env&#xFF1A;&#x6307;&#x5411;&#x5F53;&#x524D;shell&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x6BD4;&#x5982;process.env.HOME&#x3002;
// process.execPath&#xFF1A;&#x8FD0;&#x884C;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x7684;&#x53EF;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x3002;
// process.stdout&#xFF1A;&#x6307;&#x5411;&#x6807;&#x51C6;&#x8F93;&#x51FA;&#x3002;
// process.stdin&#xFF1A;&#x6307;&#x5411;&#x6807;&#x51C6;&#x8F93;&#x5165;&#x3002;
// process.stderr&#xFF1A;&#x6307;&#x5411;&#x6807;&#x51C6;&#x9519;&#x8BEF;&#x3002;

// process&#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x4EE5;&#x4E0B;&#x65B9;&#x6CD5;&#xFF1A;
// process.exit()&#xFF1A;&#x9000;&#x51FA;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x3002;
// process.cwd()&#xFF1A;&#x8FD4;&#x56DE;&#x8FD0;&#x884C;&#x5F53;&#x524D;&#x811A;&#x672C;&#x7684;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#x7684;&#x8DEF;&#x5F84;&#x3002;_
// process.chdir()&#xFF1A;&#x6539;&#x53D8;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#x3002;
// process.nextTick()&#xFF1A;&#x5C06;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x653E;&#x5728;&#x4E0B;&#x6B21;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x7684;&#x9876;&#x90E8;&#x3002;

// host
const HOST = process.env.HOST
// &#x7AEF;&#x53E3;
const PORT = process.env.PORT &amp;&amp; Number(process.env.PORT)

// &#x5408;&#x5E76;&#x57FA;&#x672C;&#x7684;webpack&#x914D;&#x7F6E;
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // cssSourceMap&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;true
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  // &#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x662F;cheap-module-eval-source-map&#x9009;&#x9879;&#x66F4;&#x5FEB;
  // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;cheap-module-eval-source-map
  // &#x66F4;&#x591A;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/configuration/devtool/#devtool
  // &#x82F1;&#x6587; https://webpack.js.org/configuration/devtool/#development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // &#x914D;&#x7F6E;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x65E5;&#x5FD7;&#x7B49;&#x7EA7;&#xFF0C;&#x8FD9;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x4F60;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x63A7;&#x5236;&#x53F0;&#x91CC;&#x770B;&#x5230;&#x7684;&#x65E5;&#x5FD7;&#x5185;&#x5BB9;&#x3002;
    // clientLogLevel &#x662F;&#x679A;&#x4E3E;&#x7C7B;&#x578B;&#xFF0C;&#x53EF;&#x53D6;&#x5982;&#x4E0B;&#x4E4B;&#x4E00;&#x7684;&#x503C; none | error | warning | info&#x3002;
    // &#x9ED8;&#x8BA4;&#x4E3A; info &#x7EA7;&#x522B;&#xFF0C;&#x5373;&#x8F93;&#x51FA;&#x6240;&#x6709;&#x7C7B;&#x578B;&#x7684;&#x65E5;&#x5FD7;&#xFF0C;&#x8BBE;&#x7F6E;&#x6210; none &#x53EF;&#x4EE5;&#x4E0D;&#x8F93;&#x51FA;&#x4EFB;&#x4F55;&#x65E5;&#x5FD7;&#x3002;
    clientLogLevel: &apos;warning&apos;,
    // historyApiFallback boolean object &#x7528;&#x4E8E;&#x65B9;&#x4FBF;&#x7684;&#x5F00;&#x53D1;&#x4F7F;&#x7528;&#x4E86; HTML5 History API &#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#x3002;
    // &#x53EF;&#x4EE5;&#x7B80;&#x5355;true &#x6216;&#x8005; &#x4EFB;&#x610F;&#x7684; 404 &#x54CD;&#x5E94;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x4E3A; index.html &#x9875;&#x9762;&#x3002;
    historyApiFallback: {
      rewrites: [
        // config.dev.assetsPublicPath &#x8FD9;&#x91CC;&#x662F; /
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, &apos;index.html&apos;) },
      ],
    },
    // &#x5F00;&#x542F;&#x70ED;&#x66F4;&#x65B0;
    hot: true,
    // contentBase &#x914D;&#x7F6E; DevServer HTTP &#x670D;&#x52A1;&#x5668;&#x7684;&#x6587;&#x4EF6;&#x6839;&#x76EE;&#x5F55;&#x3002;
    // &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x4E3A;&#x5F53;&#x524D;&#x6267;&#x884C;&#x76EE;&#x5F55;&#xFF0C;&#x901A;&#x5E38;&#x662F;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x6240;&#x6709;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x4F60;&#x4E0D;&#x5FC5;&#x8BBE;&#x7F6E;&#x5B83;&#xFF0C;&#x9664;&#x975E;&#x4F60;&#x6709;&#x989D;&#x5916;&#x7684;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x88AB; DevServer &#x670D;&#x52A1;&#x3002;
    contentBase: false, // since we use CopyWebpackPlugin.
    // compress &#x914D;&#x7F6E;&#x662F;&#x5426;&#x542F;&#x7528; gzip &#x538B;&#x7F29;&#x3002;boolean &#x4E3A;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; false&#x3002;
    compress: true,
    // host
    // &#x4F8B;&#x5982;&#x4F60;&#x60F3;&#x8981;&#x5C40;&#x57DF;&#x7F51;&#x4E2D;&#x7684;&#x5176;&#x5B83;&#x8BBE;&#x5907;&#x8BBF;&#x95EE;&#x4F60;&#x672C;&#x5730;&#x7684;&#x670D;&#x52A1;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x542F;&#x52A8; DevServer &#x65F6;&#x5E26;&#x4E0A; --host 0.0.0.0
    // &#x6216;&#x8005;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x4E3A; 0.0.0.0
    // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;localhost
    host: HOST || config.dev.host,
    // &#x7AEF;&#x53E3;&#x53F7; &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;8080
    port: PORT || config.dev.port,
    // &#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;&#x4E0D;&#x6253;&#x5F00;false
    open: config.dev.autoOpenBrowser,
    // &#x662F;&#x5426;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4EE5;&#x906E;&#x7F69;&#x5F62;&#x5F0F;&#x663E;&#x793A;&#x62A5;&#x9519;&#x4FE1;&#x606F; &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;true
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
      // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F; /
    publicPath: config.dev.assetsPublicPath,
    // &#x4EE3;&#x7406; &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;&#x7A7A;{},&#x6709;&#x9700;&#x8981;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x914D;&#x7F6E;
    proxy: config.dev.proxyTable,
    // &#x542F;&#x7528; quiet &#x540E;&#xFF0C;&#x9664;&#x4E86;&#x521D;&#x59CB;&#x542F;&#x52A8;&#x4FE1;&#x606F;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x4F55;&#x5185;&#x5BB9;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5370;&#x5230;&#x63A7;&#x5236;&#x53F0;&#x3002;&#x8FD9;&#x4E5F;&#x610F;&#x5473;&#x7740;&#x6765;&#x81EA; webpack &#x7684;&#x9519;&#x8BEF;&#x6216;&#x8B66;&#x544A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x4E0D;&#x53EF;&#x89C1;&#x3002;
    // &#x5F00;&#x542F;&#x540E;&#x4E00;&#x822C;&#x975E;&#x5E38;&#x5E72;&#x51C0;&#x53EA;&#x6709;&#x7C7B;&#x4F3C;&#x7684;&#x63D0;&#x793A; Your application is running here: http://localhost:8080
    quiet: true, // necessary for FriendlyErrorsPlugin
    // webpack-dev-middleware
    // watch: false,
    // &#x542F;&#x7528; Watch &#x6A21;&#x5F0F;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5728;&#x521D;&#x59CB;&#x6784;&#x5EFA;&#x4E4B;&#x540E;&#xFF0C;webpack &#x5C06;&#x7EE7;&#x7EED;&#x76D1;&#x542C;&#x4EFB;&#x4F55;&#x5DF2;&#x89E3;&#x6790;&#x6587;&#x4EF6;&#x7684;&#x66F4;&#x6539;&#x3002;Watch &#x6A21;&#x5F0F;&#x9ED8;&#x8BA4;&#x5173;&#x95ED;&#x3002;
    // webpack-dev-server &#x548C; webpack-dev-middleware &#x91CC; Watch &#x6A21;&#x5F0F;&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x3002;
    // Watch &#x6A21;&#x5F0F;&#x7684;&#x9009;&#x9879;
    watchOptions: {
      // &#x6216;&#x8005;&#x6307;&#x5B9A;&#x6BEB;&#x79D2;&#x4E3A;&#x5355;&#x4F4D;&#x8FDB;&#x884C;&#x8F6E;&#x8BE2;&#x3002;
      // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x4E3A;false
      poll: config.dev.poll,
    }
    // &#x66F4;&#x591A;&#x67E5;&#x770B;&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/configuration/watch/#src/components/Sidebar/Sidebar.jsx
  },
  plugins: [
    // &#x5B9A;&#x4E49;&#x4E3A;&#x5F00;&#x53D1;&#x73AF;&#x5883;
    new webpack.DefinePlugin({
      // &#x8FD9;&#x91CC;&#x662F; { NODE_ENV: &apos;&quot;development&quot;&apos; }
      &apos;process.env&apos;: require(&apos;../config/dev.env&apos;)
    }),
    // &#x70ED;&#x66F4;&#x65B0;&#x63D2;&#x4EF6;
    new webpack.HotModuleReplacementPlugin(),
    // &#x70ED;&#x66F4;&#x65B0;&#x65F6;&#x663E;&#x793A;&#x5177;&#x4F53;&#x7684;&#x6A21;&#x5757;&#x8DEF;&#x5F84;
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // &#x5728;&#x7F16;&#x8BD1;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x65F6;&#xFF0C;&#x4F7F;&#x7528; NoEmitOnErrorsPlugin &#x6765;&#x8DF3;&#x8FC7;&#x8F93;&#x51FA;&#x9636;&#x6BB5;&#x3002;
    new webpack.NoEmitOnErrorsPlugin(),
    // github&#x4ED3;&#x5E93; https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: &apos;index.html&apos;,
      template: &apos;index.html&apos;,
      // inject &#x9ED8;&#x8BA4;&#x503C; true&#xFF0C;script&#x6807;&#x7B7E;&#x4F4D;&#x4E8E;html&#x6587;&#x4EF6;&#x7684; body &#x5E95;&#x90E8;
      // body &#x901A;true, header, script &#x6807;&#x7B7E;&#x4F4D;&#x4E8E; head &#x6807;&#x7B7E;&#x5185;
      // false &#x4E0D;&#x63D2;&#x5165;&#x751F;&#x6210;&#x7684; js &#x6587;&#x4EF6;&#xFF0C;&#x53EA;&#x662F;&#x5355;&#x7EAF;&#x7684;&#x751F;&#x6210;&#x4E00;&#x4E2A; html &#x6587;&#x4EF6;
      inject: true
    }),
    // copy custom static assets
    // &#x628A;static&#x8D44;&#x6E90;&#x590D;&#x5236;&#x5230;&#x76F8;&#x5E94;&#x76EE;&#x5F55;&#x3002;
    new CopyWebpackPlugin([
      {
        // &#x8FD9;&#x91CC;&#x662F; static
        from: path.resolve(__dirname, &apos;../static&apos;),
        // &#x8FD9;&#x91CC;&#x662F; static
        to: config.dev.assetsSubDirectory,
        // &#x5FFD;&#x7565;.&#x5F00;&#x5934;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x7684;.gitkeep&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x6307;&#x7A7A;&#x6587;&#x4EF6;&#x5939;&#x4E5F;&#x63D0;&#x4EA4;&#x5230;git
        ignore: [&apos;.*&apos;]
      }
    ])
  ]
})
// &#x5BFC;&#x51FA;&#x4E00;&#x4E2A;promise
module.exports = new Promise((resolve, reject) =&gt; {
  // process.env.PORT &#x53EF;&#x4EE5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x6307;&#x5B9A;&#x7AEF;&#x53E3;&#x53F7;&#xFF0C;&#x6BD4;&#x5982;PORT=2000 npm run dev&#xFF0C;&#x90A3;&#x8BBF;&#x95EE;&#x5C31;&#x662F;http://localhost:2000
  // config.dev.port &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F; 8080
  portfinder.basePort = process.env.PORT || config.dev.port
  // &#x4EE5;&#x914D;&#x7F6E;&#x7684;&#x7AEF;&#x53E3;&#x4E3A;&#x57FA;&#x51C6;&#xFF0C;&#x5BFB;&#x627E;&#x53EF;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x5982;&#x679C;8080&#x5360;&#x7528;&#xFF0C;&#x90A3;&#x5C31;8081,&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;
  // github&#x4ED3;&#x5E93; https://github.com/indexzero/node-portfinder
  portfinder.getPort((err, port) =&gt; {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        // notifyOnErrors &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F; true
        // onErrors &#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x51FA;&#x9519;&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x7CFB;&#x7EDF;&#x539F;&#x751F;&#x7684;&#x901A;&#x77E5;
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-comment">// &#x5F15;&#x5165;&#x5DE5;&#x5177;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;webpack</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;config/index.js&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-comment">// &#x5408;&#x5E76;webpack&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-comment">// &#x57FA;&#x672C;&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.conf&apos;</span>)
<span class="hljs-comment">// &#x62F7;&#x8D1D;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;copy-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x751F;&#x6210;html&#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x53CB;&#x597D;&#x63D0;&#x793A;&#x7684;&#x63D2;&#x4EF6; https://github.com/geowarin/friendly-errors-webpack-plugin</span>
<span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;friendly-errors-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x67E5;&#x627E;&#x53EF;&#x7528;&#x7AEF;&#x53E3; // github&#x4ED3;&#x5E93; https://github.com/indexzero/node-portfinder</span>
<span class="hljs-keyword">const</span> portfinder = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;portfinder&apos;</span>)


<span class="hljs-comment">// process&#x6A21;&#x5757;&#x7528;&#x6765;&#x4E0E;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x4E92;&#x52A8;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5168;&#x5C40;&#x53D8;&#x91CF;process&#x8BBF;&#x95EE;&#xFF0C;&#x4E0D;&#x5FC5;&#x4F7F;&#x7528;require&#x547D;&#x4EE4;&#x52A0;&#x8F7D;&#x3002;&#x5B83;&#x662F;&#x4E00;&#x4E2A;EventEmitter&#x5BF9;&#x8C61;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</span>

<span class="hljs-comment">// &#x540E;&#x9762;&#x6709;&#x4E9B;process&#x6A21;&#x5757;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x7EDF;&#x4E00;&#x5217;&#x4E3E;&#x4E0B;&#x3002;</span>
<span class="hljs-comment">// &#x66F4;&#x591A;&#x67E5;&#x770B;&#x8FD9;&#x7BC7;&#x962E;&#x4E00;&#x5CF0;&#x7684;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0; http://javascript.ruanyifeng.com/nodejs/process.html</span>

<span class="hljs-comment">// process&#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x4E00;&#x7CFB;&#x5217;&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;&#x8FD4;&#x56DE;&#x7CFB;&#x7EDF;&#x4FE1;&#x606F;&#x3002;</span>
<span class="hljs-comment">// process.pid&#xFF1A;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x7684;&#x8FDB;&#x7A0B;&#x53F7;&#x3002;</span>
<span class="hljs-comment">// process.version&#xFF1A;Node&#x7684;&#x7248;&#x672C;&#xFF0C;&#x6BD4;&#x5982;v0.10.18&#x3002;</span>
<span class="hljs-comment">// process.platform&#xFF1A;&#x5F53;&#x524D;&#x7CFB;&#x7EDF;&#x5E73;&#x53F0;&#xFF0C;&#x6BD4;&#x5982;Linux&#x3002;</span>
<span class="hljs-comment">// process.title&#xFF1A;&#x9ED8;&#x8BA4;&#x503C;&#x4E3A;&#x201C;node&#x201D;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x5B9A;&#x4E49;&#x8BE5;&#x503C;&#x3002;</span>
<span class="hljs-comment">// process.argv&#xFF1A;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x7684;&#x547D;&#x4EE4;&#x884C;&#x53C2;&#x6570;&#x6570;&#x7EC4;&#x3002;</span>
<span class="hljs-comment">// process.env&#xFF1A;&#x6307;&#x5411;&#x5F53;&#x524D;shell&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x6BD4;&#x5982;process.env.HOME&#x3002;</span>
<span class="hljs-comment">// process.execPath&#xFF1A;&#x8FD0;&#x884C;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x7684;&#x53EF;&#x6267;&#x884C;&#x6587;&#x4EF6;&#x7684;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x3002;</span>
<span class="hljs-comment">// process.stdout&#xFF1A;&#x6307;&#x5411;&#x6807;&#x51C6;&#x8F93;&#x51FA;&#x3002;</span>
<span class="hljs-comment">// process.stdin&#xFF1A;&#x6307;&#x5411;&#x6807;&#x51C6;&#x8F93;&#x5165;&#x3002;</span>
<span class="hljs-comment">// process.stderr&#xFF1A;&#x6307;&#x5411;&#x6807;&#x51C6;&#x9519;&#x8BEF;&#x3002;</span>

<span class="hljs-comment">// process&#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x4EE5;&#x4E0B;&#x65B9;&#x6CD5;&#xFF1A;</span>
<span class="hljs-comment">// process.exit()&#xFF1A;&#x9000;&#x51FA;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x3002;</span>
<span class="hljs-comment">// process.cwd()&#xFF1A;&#x8FD4;&#x56DE;&#x8FD0;&#x884C;&#x5F53;&#x524D;&#x811A;&#x672C;&#x7684;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#x7684;&#x8DEF;&#x5F84;&#x3002;_</span>
<span class="hljs-comment">// process.chdir()&#xFF1A;&#x6539;&#x53D8;&#x5DE5;&#x4F5C;&#x76EE;&#x5F55;&#x3002;</span>
<span class="hljs-comment">// process.nextTick()&#xFF1A;&#x5C06;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x653E;&#x5728;&#x4E0B;&#x6B21;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x7684;&#x9876;&#x90E8;&#x3002;</span>

<span class="hljs-comment">// host</span>
<span class="hljs-keyword">const</span> HOST = process.env.HOST
<span class="hljs-comment">// &#x7AEF;&#x53E3;</span>
<span class="hljs-keyword">const</span> PORT = process.env.PORT &amp;&amp; <span class="hljs-built_in">Number</span>(process.env.PORT)

<span class="hljs-comment">// &#x5408;&#x5E76;&#x57FA;&#x672C;&#x7684;webpack&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> devWebpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// cssSourceMap&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;true</span>
    rules: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap, <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span> })
  },
  <span class="hljs-comment">// cheap-module-eval-source-map is faster for development</span>
  <span class="hljs-comment">// &#x5728;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x662F;cheap-module-eval-source-map&#x9009;&#x9879;&#x66F4;&#x5FEB;</span>
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;cheap-module-eval-source-map</span>
  <span class="hljs-comment">// &#x66F4;&#x591A;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/configuration/devtool/#devtool</span>
  <span class="hljs-comment">// &#x82F1;&#x6587; https://webpack.js.org/configuration/devtool/#development</span>
  devtool: config.dev.devtool,

  <span class="hljs-comment">// these devServer options should be customized in /config/index.js</span>
  devServer: {
    <span class="hljs-comment">// &#x914D;&#x7F6E;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x65E5;&#x5FD7;&#x7B49;&#x7EA7;&#xFF0C;&#x8FD9;&#x4F1A;&#x5F71;&#x54CD;&#x5230;&#x4F60;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5F00;&#x53D1;&#x8005;&#x5DE5;&#x5177;&#x63A7;&#x5236;&#x53F0;&#x91CC;&#x770B;&#x5230;&#x7684;&#x65E5;&#x5FD7;&#x5185;&#x5BB9;&#x3002;</span>
    <span class="hljs-comment">// clientLogLevel &#x662F;&#x679A;&#x4E3E;&#x7C7B;&#x578B;&#xFF0C;&#x53EF;&#x53D6;&#x5982;&#x4E0B;&#x4E4B;&#x4E00;&#x7684;&#x503C; none | error | warning | info&#x3002;</span>
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A; info &#x7EA7;&#x522B;&#xFF0C;&#x5373;&#x8F93;&#x51FA;&#x6240;&#x6709;&#x7C7B;&#x578B;&#x7684;&#x65E5;&#x5FD7;&#xFF0C;&#x8BBE;&#x7F6E;&#x6210; none &#x53EF;&#x4EE5;&#x4E0D;&#x8F93;&#x51FA;&#x4EFB;&#x4F55;&#x65E5;&#x5FD7;&#x3002;</span>
    clientLogLevel: <span class="hljs-string">&apos;warning&apos;</span>,
    <span class="hljs-comment">// historyApiFallback boolean object &#x7528;&#x4E8E;&#x65B9;&#x4FBF;&#x7684;&#x5F00;&#x53D1;&#x4F7F;&#x7528;&#x4E86; HTML5 History API &#x7684;&#x5355;&#x9875;&#x5E94;&#x7528;&#x3002;</span>
    <span class="hljs-comment">// &#x53EF;&#x4EE5;&#x7B80;&#x5355;true &#x6216;&#x8005; &#x4EFB;&#x610F;&#x7684; 404 &#x54CD;&#x5E94;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x4E3A; index.html &#x9875;&#x9762;&#x3002;</span>
    historyApiFallback: {
      <span class="hljs-attr">rewrites</span>: [
        <span class="hljs-comment">// config.dev.assetsPublicPath &#x8FD9;&#x91CC;&#x662F; /</span>
        { <span class="hljs-attr">from</span>: <span class="hljs-regexp">/.*/</span>, <span class="hljs-attr">to</span>: path.posix.join(config.dev.assetsPublicPath, <span class="hljs-string">&apos;index.html&apos;</span>) },
      ],
    },
    <span class="hljs-comment">// &#x5F00;&#x542F;&#x70ED;&#x66F4;&#x65B0;</span>
    hot: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// contentBase &#x914D;&#x7F6E; DevServer HTTP &#x670D;&#x52A1;&#x5668;&#x7684;&#x6587;&#x4EF6;&#x6839;&#x76EE;&#x5F55;&#x3002;</span>
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#x4E3A;&#x5F53;&#x524D;&#x6267;&#x884C;&#x76EE;&#x5F55;&#xFF0C;&#x901A;&#x5E38;&#x662F;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#xFF0C;&#x6240;&#x6709;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x4F60;&#x4E0D;&#x5FC5;&#x8BBE;&#x7F6E;&#x5B83;&#xFF0C;&#x9664;&#x975E;&#x4F60;&#x6709;&#x989D;&#x5916;&#x7684;&#x6587;&#x4EF6;&#x9700;&#x8981;&#x88AB; DevServer &#x670D;&#x52A1;&#x3002;</span>
    contentBase: <span class="hljs-literal">false</span>, <span class="hljs-comment">// since we use CopyWebpackPlugin.</span>
    <span class="hljs-comment">// compress &#x914D;&#x7F6E;&#x662F;&#x5426;&#x542F;&#x7528; gzip &#x538B;&#x7F29;&#x3002;boolean &#x4E3A;&#x7C7B;&#x578B;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A; false&#x3002;</span>
    compress: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// host</span>
    <span class="hljs-comment">// &#x4F8B;&#x5982;&#x4F60;&#x60F3;&#x8981;&#x5C40;&#x57DF;&#x7F51;&#x4E2D;&#x7684;&#x5176;&#x5B83;&#x8BBE;&#x5907;&#x8BBF;&#x95EE;&#x4F60;&#x672C;&#x5730;&#x7684;&#x670D;&#x52A1;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x542F;&#x52A8; DevServer &#x65F6;&#x5E26;&#x4E0A; --host 0.0.0.0</span>
    <span class="hljs-comment">// &#x6216;&#x8005;&#x76F4;&#x63A5;&#x8BBE;&#x7F6E;&#x4E3A; 0.0.0.0</span>
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;localhost</span>
    host: HOST || config.dev.host,
    <span class="hljs-comment">// &#x7AEF;&#x53E3;&#x53F7; &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;8080</span>
    port: PORT || config.dev.port,
    <span class="hljs-comment">// &#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;&#x4E0D;&#x6253;&#x5F00;false</span>
    open: config.dev.autoOpenBrowser,
    <span class="hljs-comment">// &#x662F;&#x5426;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4EE5;&#x906E;&#x7F69;&#x5F62;&#x5F0F;&#x663E;&#x793A;&#x62A5;&#x9519;&#x4FE1;&#x606F; &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;true</span>
    overlay: config.dev.errorOverlay
      ? { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span> }
      : <span class="hljs-literal">false</span>,
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F; /</span>
    publicPath: config.dev.assetsPublicPath,
    <span class="hljs-comment">// &#x4EE3;&#x7406; &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x7684;&#x662F;&#x7A7A;{},&#x6709;&#x9700;&#x8981;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x914D;&#x7F6E;</span>
    proxy: config.dev.proxyTable,
    <span class="hljs-comment">// &#x542F;&#x7528; quiet &#x540E;&#xFF0C;&#x9664;&#x4E86;&#x521D;&#x59CB;&#x542F;&#x52A8;&#x4FE1;&#x606F;&#x4E4B;&#x5916;&#x7684;&#x4EFB;&#x4F55;&#x5185;&#x5BB9;&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x6253;&#x5370;&#x5230;&#x63A7;&#x5236;&#x53F0;&#x3002;&#x8FD9;&#x4E5F;&#x610F;&#x5473;&#x7740;&#x6765;&#x81EA; webpack &#x7684;&#x9519;&#x8BEF;&#x6216;&#x8B66;&#x544A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x4E0D;&#x53EF;&#x89C1;&#x3002;</span>
    <span class="hljs-comment">// &#x5F00;&#x542F;&#x540E;&#x4E00;&#x822C;&#x975E;&#x5E38;&#x5E72;&#x51C0;&#x53EA;&#x6709;&#x7C7B;&#x4F3C;&#x7684;&#x63D0;&#x793A; Your application is running here: http://localhost:8080</span>
    quiet: <span class="hljs-literal">true</span>, <span class="hljs-comment">// necessary for FriendlyErrorsPlugin</span>
    <span class="hljs-comment">// webpack-dev-middleware</span>
    <span class="hljs-comment">// watch: false,</span>
    <span class="hljs-comment">// &#x542F;&#x7528; Watch &#x6A21;&#x5F0F;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x5728;&#x521D;&#x59CB;&#x6784;&#x5EFA;&#x4E4B;&#x540E;&#xFF0C;webpack &#x5C06;&#x7EE7;&#x7EED;&#x76D1;&#x542C;&#x4EFB;&#x4F55;&#x5DF2;&#x89E3;&#x6790;&#x6587;&#x4EF6;&#x7684;&#x66F4;&#x6539;&#x3002;Watch &#x6A21;&#x5F0F;&#x9ED8;&#x8BA4;&#x5173;&#x95ED;&#x3002;</span>
    <span class="hljs-comment">// webpack-dev-server &#x548C; webpack-dev-middleware &#x91CC; Watch &#x6A21;&#x5F0F;&#x9ED8;&#x8BA4;&#x5F00;&#x542F;&#x3002;</span>
    <span class="hljs-comment">// Watch &#x6A21;&#x5F0F;&#x7684;&#x9009;&#x9879;</span>
    watchOptions: {
      <span class="hljs-comment">// &#x6216;&#x8005;&#x6307;&#x5B9A;&#x6BEB;&#x79D2;&#x4E3A;&#x5355;&#x4F4D;&#x8FDB;&#x884C;&#x8F6E;&#x8BE2;&#x3002;</span>
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x4E3A;false</span>
      poll: config.dev.poll,
    }
    <span class="hljs-comment">// &#x66F4;&#x591A;&#x67E5;&#x770B;&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/configuration/watch/#src/components/Sidebar/Sidebar.jsx</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E3A;&#x5F00;&#x53D1;&#x73AF;&#x5883;</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; { NODE_ENV: &apos;&quot;development&quot;&apos; }</span>
      <span class="hljs-string">&apos;process.env&apos;</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config/dev.env&apos;</span>)
    }),
    <span class="hljs-comment">// &#x70ED;&#x66F4;&#x65B0;&#x63D2;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-comment">// &#x70ED;&#x66F4;&#x65B0;&#x65F6;&#x663E;&#x793A;&#x5177;&#x4F53;&#x7684;&#x6A21;&#x5757;&#x8DEF;&#x5F84;</span>
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(), <span class="hljs-comment">// HMR shows correct file names in console on update.</span>
    <span class="hljs-comment">// &#x5728;&#x7F16;&#x8BD1;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x65F6;&#xFF0C;&#x4F7F;&#x7528; NoEmitOnErrorsPlugin &#x6765;&#x8DF3;&#x8FC7;&#x8F93;&#x51FA;&#x9636;&#x6BB5;&#x3002;</span>
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// github&#x4ED3;&#x5E93; https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;index.html&apos;</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;index.html&apos;</span>,
      <span class="hljs-comment">// inject &#x9ED8;&#x8BA4;&#x503C; true&#xFF0C;script&#x6807;&#x7B7E;&#x4F4D;&#x4E8E;html&#x6587;&#x4EF6;&#x7684; body &#x5E95;&#x90E8;</span>
      <span class="hljs-comment">// body &#x901A;true, header, script &#x6807;&#x7B7E;&#x4F4D;&#x4E8E; head &#x6807;&#x7B7E;&#x5185;</span>
      <span class="hljs-comment">// false &#x4E0D;&#x63D2;&#x5165;&#x751F;&#x6210;&#x7684; js &#x6587;&#x4EF6;&#xFF0C;&#x53EA;&#x662F;&#x5355;&#x7EAF;&#x7684;&#x751F;&#x6210;&#x4E00;&#x4E2A; html &#x6587;&#x4EF6;</span>
      inject: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-comment">// &#x628A;static&#x8D44;&#x6E90;&#x590D;&#x5236;&#x5230;&#x76F8;&#x5E94;&#x76EE;&#x5F55;&#x3002;</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; static</span>
        <span class="hljs-keyword">from</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../static&apos;</span>),
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; static</span>
        to: config.dev.assetsSubDirectory,
        <span class="hljs-comment">// &#x5FFD;&#x7565;.&#x5F00;&#x5934;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x7684;.gitkeep&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x6307;&#x7A7A;&#x6587;&#x4EF6;&#x5939;&#x4E5F;&#x63D0;&#x4EA4;&#x5230;git</span>
        ignore: [<span class="hljs-string">&apos;.*&apos;</span>]
      }
    ])
  ]
})
<span class="hljs-comment">// &#x5BFC;&#x51FA;&#x4E00;&#x4E2A;promise</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-comment">// process.env.PORT &#x53EF;&#x4EE5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x6307;&#x5B9A;&#x7AEF;&#x53E3;&#x53F7;&#xFF0C;&#x6BD4;&#x5982;PORT=2000 npm run dev&#xFF0C;&#x90A3;&#x8BBF;&#x95EE;&#x5C31;&#x662F;http://localhost:2000</span>
  <span class="hljs-comment">// config.dev.port &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F; 8080</span>
  portfinder.basePort = process.env.PORT || config.dev.port
  <span class="hljs-comment">// &#x4EE5;&#x914D;&#x7F6E;&#x7684;&#x7AEF;&#x53E3;&#x4E3A;&#x57FA;&#x51C6;&#xFF0C;&#x5BFB;&#x627E;&#x53EF;&#x7528;&#x7684;&#x7AEF;&#x53E3;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x5982;&#x679C;8080&#x5360;&#x7528;&#xFF0C;&#x90A3;&#x5C31;8081,&#x4EE5;&#x6B64;&#x7C7B;&#x63A8;</span>
  <span class="hljs-comment">// github&#x4ED3;&#x5E93; https://github.com/indexzero/node-portfinder</span>
  portfinder.getPort(<span class="hljs-function">(<span class="hljs-params">err, port</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
      reject(err)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// publish the new Port, necessary for e2e tests</span>
      process.env.PORT = port
      <span class="hljs-comment">// add port to devServer config</span>
      devWebpackConfig.devServer.port = port

      <span class="hljs-comment">// Add FriendlyErrorsPlugin</span>
      devWebpackConfig.plugins.push(<span class="hljs-keyword">new</span> FriendlyErrorsPlugin({
        <span class="hljs-attr">compilationSuccessInfo</span>: {
          <span class="hljs-attr">messages</span>: [<span class="hljs-string">`Your application is running here: http://<span class="hljs-subst">${devWebpackConfig.devServer.host}</span>:<span class="hljs-subst">${port}</span>`</span>],
        },
        <span class="hljs-comment">// notifyOnErrors &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F; true</span>
        <span class="hljs-comment">// onErrors &#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x51FA;&#x9519;&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF0C;&#x7CFB;&#x7EDF;&#x539F;&#x751F;&#x7684;&#x901A;&#x77E5;</span>
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : <span class="hljs-literal">undefined</span>
      }))

      resolve(devWebpackConfig)
    }
  })
})</code></pre><h3 id="articleHeader4"><code>build/utils.js</code> &#x5DE5;&#x5177;&#x51FD;&#x6570;</h3><p>&#x4E0A;&#x6587;<code>build/webpack.dev.conf.js</code>&#x63D0;&#x5230;&#x5F15;&#x5165;&#x4E86;<code>build/utils.js</code>&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x3002;<br>&#x8BE5;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x5199;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#xFF1A;<br>1&#x3001;<code>assetsPath</code>&#x8FD4;&#x56DE;&#x8F93;&#x51FA;&#x8DEF;&#x5F84;&#xFF0C;<br>2&#x3001;<code>cssLoaders</code>&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;<code>css-loader</code>&#x914D;&#x7F6E;&#xFF0C;<br>3&#x3001;<code>styleLoaders</code>&#x8FD4;&#x56DE;&#x76F8;&#x5E94;&#x7684;&#x5904;&#x7406;&#x6837;&#x5F0F;&#x7684;&#x914D;&#x7F6E;&#xFF0C;<br>4&#x3001;<code>createNotifierCallback</code>&#x521B;&#x5EFA;&#x542F;&#x52A8;&#x670D;&#x52A1;&#x65F6;&#x51FA;&#x9519;&#x65F6;&#x63D0;&#x793A;&#x4FE1;&#x606F;&#x56DE;&#x8C03;&#x3002;</p><p>&#x5177;&#x4F53;&#x914D;&#x7F6E;&#x53EF;&#x4EE5;&#x770B;&#x8BE5;&#x6587;&#x4EF6;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
const path = require(&apos;path&apos;)
// &#x5F15;&#x5165;&#x914D;&#x7F6E;&#x6587;&#x4EF6;config/index.js
const config = require(&apos;../config&apos;)
// &#x63D0;&#x53D6;css&#x7684;&#x63D2;&#x4EF6;
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
// &#x5F15;&#x5165;package.json&#x914D;&#x7F6E;
const packageConfig = require(&apos;../package.json&apos;)
// &#x8FD4;&#x56DE;&#x8DEF;&#x5F84;
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === &apos;production&apos;
    // &#x4E8C;&#x7EA7;&#x76EE;&#x5F55; &#x8FD9;&#x91CC;&#x662F; static
    ? config.build.assetsSubDirectory
    // &#x4E8C;&#x7EA7;&#x76EE;&#x5F55; &#x8FD9;&#x91CC;&#x662F; static
    : config.dev.assetsSubDirectory

  // &#x751F;&#x6210;&#x8DE8;&#x5E73;&#x53F0;&#x517C;&#x5BB9;&#x7684;&#x8DEF;&#x5F84;
  // &#x66F4;&#x591A;&#x67E5;&#x770B;Node API&#x94FE;&#x63A5;&#xFF1A;https://nodejs.org/api/path.html#path_path_posix
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  // &#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;options&#x5BF9;&#x8C61;
  // {
  //   // sourceMap&#x8FD9;&#x91CC;&#x662F;true
  //   sourceMap: true,
  //   // &#x662F;&#x5426;&#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;
  //   extract: true,
  //   // &#x662F;&#x5426;&#x4F7F;&#x7528;postcss
  //   usePostCSS: true
  // }
  options = options || {}

  const cssLoader = {
    loader: &apos;css-loader&apos;,
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: &apos;postcss-loader&apos;,
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  // &#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;loader&#x914D;&#x7F6E;
  function generateLoaders (loader, loaderOptions) {
    // &#x662F;&#x5426;&#x4F7F;&#x7528;usePostCSS&#xFF0C;&#x6765;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x91C7;&#x7528;postcssLoader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + &apos;-loader&apos;,
        // &#x5408;&#x5E76; loaderOptions &#x751F;&#x6210;options
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // &#x5982;&#x679C;&#x63D0;&#x53D6;&#x4F7F;&#x7528;ExtractTextPlugin&#x63D2;&#x4EF6;&#x63D0;&#x53D6;
      // &#x66F4;&#x591A;&#x914D;&#x7F6E; &#x770B;&#x63D2;&#x4EF6;&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/plugins/extract-text-webpack-plugin/
      return ExtractTextPlugin.extract({
        // &#x6307;&#x9700;&#x8981;&#x4EC0;&#x4E48;&#x6837;&#x7684;loader&#x53BB;&#x7F16;&#x8BD1;&#x6587;&#x4EF6;
        // loader &#x88AB;&#x7528;&#x4E8E;&#x5C06;&#x8D44;&#x6E90;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x4E2A; CSS &#x5BFC;&#x51FA;&#x6A21;&#x5757; (&#x5FC5;&#x586B;)
        use: loaders,
        // loader&#xFF08;&#x4F8B;&#x5982; &apos;style-loader&apos;&#xFF09;&#x5E94;&#x7528;&#x4E8E;&#x5F53; CSS &#x6CA1;&#x6709;&#x88AB;&#x63D0;&#x53D6;(&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684; chunk&#xFF0C;&#x5F53; allChunks: false)
        fallback: &apos;vue-style-loader&apos;
      })
    } else {
      return [&apos;vue-style-loader&apos;].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders(&apos;less&apos;),
    // sass indentedSyntax &#x8BED;&#x6CD5;&#x7F29;&#x8FDB;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E0B;&#x65B9;&#x683C;&#x5F0F;
    // #main
    //   color: blue
    //   font-size: 0.3em
    sass: generateLoaders(&apos;sass&apos;, { indentedSyntax: true }),
    scss: generateLoaders(&apos;sass&apos;),
    stylus: generateLoaders(&apos;stylus&apos;),
    styl: generateLoaders(&apos;stylus&apos;)
  }
}

// Generate loaders for standalone style files (outside of .vue)
// &#x6700;&#x7EC8;&#x4F1A;&#x8FD4;&#x56DE;webpack css&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;
exports.styleLoaders = function (options) {
  // {
  //   // sourceMap&#x8FD9;&#x91CC;&#x662F;true
  //   sourceMap: true,
  //   // &#x662F;&#x5426;&#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;
  //   extract: true,
  //   // &#x662F;&#x5426;&#x4F7F;&#x7528;postcss
  //   usePostCSS: true
  // }
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp(&apos;\\.&apos; + extension + &apos;$&apos;),
      use: loader
    })
  }

  return output
}

// npm run dev &#x51FA;&#x9519;&#x65F6;&#xFF0C; FriendlyErrorsPlugin&#x63D2;&#x4EF6; &#x914D;&#x7F6E; onErrors&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;
exports.createNotifierCallback = () =&gt; {
  // &apos;node-notifier&apos;&#x662F;&#x4E00;&#x4E2A;&#x8DE8;&#x5E73;&#x53F0;&#x7CFB;&#x7EDF;&#x901A;&#x77E5;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5F53;&#x9047;&#x5230;&#x9519;&#x8BEF;&#x65F6;&#xFF0C;&#x5B83;&#x80FD;&#x7528;&#x7CFB;&#x7EDF;&#x539F;&#x751F;&#x7684;&#x63A8;&#x9001;&#x65B9;&#x5F0F;&#x7ED9;&#x4F60;&#x63A8;&#x9001;&#x4FE1;&#x606F;
  const notifier = require(&apos;node-notifier&apos;)

  return (severity, errors) =&gt; {
    if (severity !== &apos;error&apos;) return

    const error = errors[0]
    const filename = error.file &amp;&amp; error.file.split(&apos;!&apos;).pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + &apos;: &apos; + error.name,
      subtitle: filename || &apos;&apos;,
      icon: path.join(__dirname, &apos;logo.png&apos;)
    })
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;&#x914D;&#x7F6E;&#x6587;&#x4EF6;config/index.js</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-comment">// &#x63D0;&#x53D6;css&#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;package.json&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../package.json&apos;</span>)
<span class="hljs-comment">// &#x8FD4;&#x56DE;&#x8DEF;&#x5F84;</span>
exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">const</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
    <span class="hljs-comment">// &#x4E8C;&#x7EA7;&#x76EE;&#x5F55; &#x8FD9;&#x91CC;&#x662F; static</span>
    ? config.build.assetsSubDirectory
    <span class="hljs-comment">// &#x4E8C;&#x7EA7;&#x76EE;&#x5F55; &#x8FD9;&#x91CC;&#x662F; static</span>
    : config.dev.assetsSubDirectory

  <span class="hljs-comment">// &#x751F;&#x6210;&#x8DE8;&#x5E73;&#x53F0;&#x517C;&#x5BB9;&#x7684;&#x8DEF;&#x5F84;</span>
  <span class="hljs-comment">// &#x66F4;&#x591A;&#x67E5;&#x770B;Node API&#x94FE;&#x63A5;&#xFF1A;https://nodejs.org/api/path.html#path_path_posix</span>
  <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-comment">// &#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x8FDB;&#x6765;&#x7684;options&#x5BF9;&#x8C61;</span>
  <span class="hljs-comment">// {</span>
  <span class="hljs-comment">//   // sourceMap&#x8FD9;&#x91CC;&#x662F;true</span>
  <span class="hljs-comment">//   sourceMap: true,</span>
  <span class="hljs-comment">//   // &#x662F;&#x5426;&#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;</span>
  <span class="hljs-comment">//   extract: true,</span>
  <span class="hljs-comment">//   // &#x662F;&#x5426;&#x4F7F;&#x7528;postcss</span>
  <span class="hljs-comment">//   usePostCSS: true</span>
  <span class="hljs-comment">// }</span>
  options = options || {}

  <span class="hljs-keyword">const</span> cssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;css-loader&apos;</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">sourceMap</span>: options.sourceMap
    }
  }

  <span class="hljs-keyword">const</span> postcssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;postcss-loader&apos;</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">sourceMap</span>: options.sourceMap
    }
  }

  <span class="hljs-comment">// generate loader string to be used with extract text plugin</span>
  <span class="hljs-comment">// &#x521B;&#x5EFA;&#x5BF9;&#x5E94;&#x7684;loader&#x914D;&#x7F6E;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{
    <span class="hljs-comment">// &#x662F;&#x5426;&#x4F7F;&#x7528;usePostCSS&#xFF0C;&#x6765;&#x51B3;&#x5B9A;&#x662F;&#x5426;&#x91C7;&#x7528;postcssLoader</span>
    <span class="hljs-keyword">const</span> loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    <span class="hljs-keyword">if</span> (loader) {
      loaders.push({
        <span class="hljs-attr">loader</span>: loader + <span class="hljs-string">&apos;-loader&apos;</span>,
        <span class="hljs-comment">// &#x5408;&#x5E76; loaderOptions &#x751F;&#x6210;options</span>
        options: <span class="hljs-built_in">Object</span>.assign({}, loaderOptions, {
          <span class="hljs-attr">sourceMap</span>: options.sourceMap
        })
      })
    }

    <span class="hljs-comment">// Extract CSS when that option is specified</span>
    <span class="hljs-comment">// (which is the case during production build)</span>
    <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-comment">// &#x5982;&#x679C;&#x63D0;&#x53D6;&#x4F7F;&#x7528;ExtractTextPlugin&#x63D2;&#x4EF6;&#x63D0;&#x53D6;</span>
      <span class="hljs-comment">// &#x66F4;&#x591A;&#x914D;&#x7F6E; &#x770B;&#x63D2;&#x4EF6;&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/plugins/extract-text-webpack-plugin/</span>
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        <span class="hljs-comment">// &#x6307;&#x9700;&#x8981;&#x4EC0;&#x4E48;&#x6837;&#x7684;loader&#x53BB;&#x7F16;&#x8BD1;&#x6587;&#x4EF6;</span>
        <span class="hljs-comment">// loader &#x88AB;&#x7528;&#x4E8E;&#x5C06;&#x8D44;&#x6E90;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x4E2A; CSS &#x5BFC;&#x51FA;&#x6A21;&#x5757; (&#x5FC5;&#x586B;)</span>
        use: loaders,
        <span class="hljs-comment">// loader&#xFF08;&#x4F8B;&#x5982; &apos;style-loader&apos;&#xFF09;&#x5E94;&#x7528;&#x4E8E;&#x5F53; CSS &#x6CA1;&#x6709;&#x88AB;&#x63D0;&#x53D6;(&#x4E5F;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684; chunk&#xFF0C;&#x5F53; allChunks: false)</span>
        fallback: <span class="hljs-string">&apos;vue-style-loader&apos;</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">&apos;vue-style-loader&apos;</span>].concat(loaders)
    }
  }

  <span class="hljs-comment">// https://vue-loader.vuejs.org/en/configurations/extract-css.html</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">css</span>: generateLoaders(),
    <span class="hljs-attr">postcss</span>: generateLoaders(),
    <span class="hljs-attr">less</span>: generateLoaders(<span class="hljs-string">&apos;less&apos;</span>),
    <span class="hljs-comment">// sass indentedSyntax &#x8BED;&#x6CD5;&#x7F29;&#x8FDB;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E0B;&#x65B9;&#x683C;&#x5F0F;</span>
    <span class="hljs-comment">// #main</span>
    <span class="hljs-comment">//   color: blue</span>
    <span class="hljs-comment">//   font-size: 0.3em</span>
    sass: generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>, { <span class="hljs-attr">indentedSyntax</span>: <span class="hljs-literal">true</span> }),
    <span class="hljs-attr">scss</span>: generateLoaders(<span class="hljs-string">&apos;sass&apos;</span>),
    <span class="hljs-attr">stylus</span>: generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>),
    <span class="hljs-attr">styl</span>: generateLoaders(<span class="hljs-string">&apos;stylus&apos;</span>)
  }
}

<span class="hljs-comment">// Generate loaders for standalone style files (outside of .vue)</span>
<span class="hljs-comment">// &#x6700;&#x7EC8;&#x4F1A;&#x8FD4;&#x56DE;webpack css&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;</span>
exports.styleLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-comment">// {</span>
  <span class="hljs-comment">//   // sourceMap&#x8FD9;&#x91CC;&#x662F;true</span>
  <span class="hljs-comment">//   sourceMap: true,</span>
  <span class="hljs-comment">//   // &#x662F;&#x5426;&#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;</span>
  <span class="hljs-comment">//   extract: true,</span>
  <span class="hljs-comment">//   // &#x662F;&#x5426;&#x4F7F;&#x7528;postcss</span>
  <span class="hljs-comment">//   usePostCSS: true</span>
  <span class="hljs-comment">// }</span>
  <span class="hljs-keyword">const</span> output = []
  <span class="hljs-keyword">const</span> loaders = exports.cssLoaders(options)

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> extension <span class="hljs-keyword">in</span> loaders) {
    <span class="hljs-keyword">const</span> loader = loaders[extension]
    output.push({
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">&apos;\\.&apos;</span> + extension + <span class="hljs-string">&apos;$&apos;</span>),
      <span class="hljs-attr">use</span>: loader
    })
  }

  <span class="hljs-keyword">return</span> output
}

<span class="hljs-comment">// npm run dev &#x51FA;&#x9519;&#x65F6;&#xFF0C; FriendlyErrorsPlugin&#x63D2;&#x4EF6; &#x914D;&#x7F6E; onErrors&#x8F93;&#x51FA;&#x9519;&#x8BEF;&#x4FE1;&#x606F;</span>
exports.createNotifierCallback = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// &apos;node-notifier&apos;&#x662F;&#x4E00;&#x4E2A;&#x8DE8;&#x5E73;&#x53F0;&#x7CFB;&#x7EDF;&#x901A;&#x77E5;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5F53;&#x9047;&#x5230;&#x9519;&#x8BEF;&#x65F6;&#xFF0C;&#x5B83;&#x80FD;&#x7528;&#x7CFB;&#x7EDF;&#x539F;&#x751F;&#x7684;&#x63A8;&#x9001;&#x65B9;&#x5F0F;&#x7ED9;&#x4F60;&#x63A8;&#x9001;&#x4FE1;&#x606F;</span>
  <span class="hljs-keyword">const</span> notifier = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;node-notifier&apos;</span>)

  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">severity, errors</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (severity !== <span class="hljs-string">&apos;error&apos;</span>) <span class="hljs-keyword">return</span>

    <span class="hljs-keyword">const</span> error = errors[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">const</span> filename = error.file &amp;&amp; error.file.split(<span class="hljs-string">&apos;!&apos;</span>).pop()

    notifier.notify({
      <span class="hljs-attr">title</span>: packageConfig.name,
      <span class="hljs-attr">message</span>: severity + <span class="hljs-string">&apos;: &apos;</span> + error.name,
      <span class="hljs-attr">subtitle</span>: filename || <span class="hljs-string">&apos;&apos;</span>,
      <span class="hljs-attr">icon</span>: path.join(__dirname, <span class="hljs-string">&apos;logo.png&apos;</span>)
    })
  }
}
</code></pre><h3 id="articleHeader5"><code>build/webpack.base.conf.js</code> <code>webpack</code>&#x57FA;&#x672C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</h3><p>&#x4E0A;&#x6587;<code>build/webpack.dev.conf.js</code>&#x63D0;&#x5230;&#x5F15;&#x5165;&#x4E86;<code>build/webpack.base.conf.js</code>&#x8FD9;&#x4E2A;<code>webpack</code>&#x57FA;&#x672C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;<br>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x505A;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;<br>1&#x3001;&#x5F15;&#x5165;&#x5404;&#x79CD;&#x63D2;&#x4EF6;&#x3001;&#x914D;&#x7F6E;&#x7B49;&#xFF0C;&#x5176;&#x4E2D;&#x5F15;&#x5165;&#x4E86;<code>build/vue-loader.conf.js</code>&#x76F8;&#x5173;&#x914D;&#x7F6E;&#xFF0C;<br>2&#x3001;&#x521B;&#x5EFA;<code>eslint</code>&#x89C4;&#x5219;&#x914D;&#x7F6E;&#xFF0C;&#x9ED8;&#x8BA4;&#x542F;&#x7528;&#xFF0C;<br>3&#x3001;&#x5BFC;&#x51FA;<code>webpack</code>&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4E2D;&#x5305;&#x542B;<code>context</code>&#xFF0C;&#x5165;&#x53E3;<code>entry</code>&#xFF0C;&#x8F93;&#x51FA;<code>output</code>&#xFF0C;<code>resolve</code>&#xFF0C;<code>module</code>&#x4E0B;&#x7684;<code>rules</code>&#xFF08;&#x5904;&#x7406;&#x5BF9;&#x5E94;&#x6587;&#x4EF6;&#x7684;&#x89C4;&#x5219;&#xFF09;&#xFF0C;&#x548C;<code>node</code>&#x76F8;&#x5173;&#x7684;&#x914D;&#x7F6E;&#x7B49;&#x3002;</p><p>&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x770B;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4F7F;&#x7528;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x66F4;&#x591A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x67E5;&#x770B;
// [&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;es&#x6807;&#x51C6;&#x5165;&#x95E8;](http://es6.ruanyifeng.com/?search=%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F&amp;x=0&amp;y=0#docs/function#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)
&apos;use strict&apos;
const path = require(&apos;path&apos;)
// &#x5F15;&#x5165;&#x5DE5;&#x5177;&#x51FD;&#x6570;
const utils = require(&apos;./utils&apos;)
// &#x5F15;&#x5165;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;config/index.js&#x6587;&#x4EF6;
const config = require(&apos;../config&apos;)
// &#x5F15;&#x5165;vue-loader&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;
const vueLoaderConfig = require(&apos;./vue-loader.conf&apos;)
// &#x5B9A;&#x4E49;&#x83B7;&#x53D6;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x51FD;&#x6570;
function resolve (dir) {
  return path.join(__dirname, &apos;..&apos;, dir)
}
// &#x521B;&#x5EFA;eslint&#x914D;&#x7F6E;
const createLintingRule = () =&gt; ({
  test: /\.(js|vue)$/,
  loader: &apos;eslint-loader&apos;,
  // &#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x524D;&#x7F6E;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x9009;&#x9879;&#x662F;post&#x662F;&#x540E;&#x7F6E;
  // &#x628A; eslint-loader &#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x653E;&#x5230;&#x6700;&#x524D;&#x9762;&#xFF0C;&#x9632;&#x6B62;&#x5176;&#x5B83; Loader &#x628A;&#x5904;&#x7406;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4EA4;&#x7ED9; eslint-loader &#x53BB;&#x68C0;&#x67E5;
  enforce: &apos;pre&apos;,
  // &#x5305;&#x542B;&#x6587;&#x4EF6;&#x5939;
  include: [resolve(&apos;src&apos;), resolve(&apos;test&apos;)],
  options: {
    // &#x4F7F;&#x7528;&#x53CB;&#x597D;&#x7684;eslint&#x63D0;&#x793A;&#x63D2;&#x4EF6;
    formatter: require(&apos;eslint-friendly-formatter&apos;),
    // eslint&#x62A5;&#x9519;&#x63D0;&#x793A;&#x662F;&#x5426;&#x663E;&#x793A;&#x4EE5;&#x906E;&#x7F69;&#x5F62;&#x5F0F;&#x663E;&#x793A;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;
    // &#x8FD9;&#x91CC;showEslintErrorsInOverlay&#x914D;&#x7F6E;&#x662F;false
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // &#x8FD0;&#x884C;&#x73AF;&#x5883;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x5C31;&#x662F;&#x5B9E;&#x9645;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;
  context: path.resolve(__dirname, &apos;../&apos;),
  // &#x5165;&#x53E3;
  entry: {
    app: &apos;./src/main.js&apos;
  },
  // &#x8F93;&#x51FA;
  output: {
    // &#x8DEF;&#x5F84; &#x8FD9;&#x91CC;&#x662F;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684;dist
    path: config.build.assetsRoot,
    // &#x6587;&#x4EF6;&#x540D;
    filename: &apos;[name].js&apos;,
    publicPath: process.env.NODE_ENV === &apos;production&apos;
      // &#x8FD9;&#x91CC;&#x662F; /&#xFF0C;&#x4F46;&#x8981;&#x4E0A;&#x4F20;&#x5230;github pages&#x7B49;&#x4F1A;&#x8DEF;&#x5F84;&#x4E0D;&#x5BF9;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E3A;./
      ? config.build.assetsPublicPath
      // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F; /
      : config.dev.assetsPublicPath
  },
  // Webpack &#x5728;&#x542F;&#x52A8;&#x540E;&#x4F1A;&#x4ECE;&#x914D;&#x7F6E;&#x7684;&#x5165;&#x53E3;&#x6A21;&#x5757;&#x51FA;&#x53D1;&#x627E;&#x51FA;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#xFF0C;Resolve &#x914D;&#x7F6E; Webpack &#x5982;&#x4F55;&#x5BFB;&#x627E;&#x6A21;&#x5757;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x3002;
  resolve: {
    // &#x914D;&#x7F6E;&#x4E86;&#x8FD9;&#x4E2A;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x6269;&#x5C55;&#x540D;&#x53EF;&#x4EE5;&#x7701;&#x7565;
    extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
    alias: {
      // &#x7ED9;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x952E;&#x540E;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0; $&#xFF0C;&#x4EE5;&#x8868;&#x793A;&#x7CBE;&#x51C6;&#x5339;&#x914D; node_modules/vue/dist/vue.esm.js
      // &#x5F15;&#x7528; import Vue from &apos;vue&apos;&#x5C31;&#x662F;&#x5F15;&#x5165;&#x7684;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x6700;&#x540E;export default Vue &#x5BFC;&#x51FA;&#x7684;Vue;
      // &#x6240;&#x4EE5;&#x8FD9;&#x53E5;&#x53EF;&#x4EE5;&#x4EE5;&#x4EFB;&#x610F;&#x5927;&#x5199;&#x5B57;&#x6BCD;&#x547D;&#x540D; &#x6BD4;&#x5982;&#xFF1A;import V from &apos;vue&apos;
      &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;,
      // src&#x522B;&#x540D; &#x6BD4;&#x5982; &#xFF1A;&#x5F15;&#x5165;import HelloWorld from &apos;@/components/HelloWorld&apos;
      &apos;@&apos;: resolve(&apos;src&apos;),
    }
  },
  // &#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x7684;&#x8F6C;&#x6362;&#x89C4;&#x5219;
  module: {
    rules: [
      // &#x662F;&#x5426;&#x4F7F;&#x7528;eslint &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;true
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        // vue-loader&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://vue-loader-v14.vuejs.org/zh-cn/
        loader: &apos;vue-loader&apos;,
        options: vueLoaderConfig
      },
      {
        // js&#x6587;&#x4EF6;&#x4F7F;&#x7528;babel-loader&#x8F6C;&#x6362;
        test: /\.js$/,
        loader: &apos;babel-loader&apos;,
        include: [resolve(&apos;src&apos;), resolve(&apos;test&apos;), resolve(&apos;node_modules/webpack-dev-server/client&apos;)]
      },
      {
        // &#x56FE;&#x7247;&#x6587;&#x4EF6;&#x4F7F;&#x7528;url-loader&#x8F6C;&#x6362;
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: &apos;url-loader&apos;,
        options: {
          // &#x9650;&#x5236;&#x5927;&#x5C0F;10000B(bytes)&#x4EE5;&#x5185;&#xFF0C;&#x8F6C;&#x6210;base64&#x7F16;&#x7801;&#x7684;dataURL&#x5B57;&#x7B26;&#x4E32;
          limit: 10000,
          // &#x8F93;&#x51FA;&#x8DEF;&#x5F84; img/&#x540D;&#x79F0;.7&#x4F4D;hash.&#x6269;&#x5C55;&#x540D;
          name: utils.assetsPath(&apos;img/[name].[hash:7].[ext]&apos;)
        }
      },
      {
        // &#x89C6;&#x9891;&#x6587;&#x4EF6;&#x4F7F;&#x7528;url-loader&#x8F6C;&#x6362;
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: &apos;url-loader&apos;,
        options: {
          limit: 10000,
          name: utils.assetsPath(&apos;media/[name].[hash:7].[ext]&apos;)
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: &apos;url-loader&apos;,
        options: {
          limit: 10000,
          name: utils.assetsPath(&apos;fonts/[name].[hash:7].[ext]&apos;)
        }
      }
    ]
  },
  // &#x8FD9;&#x91CC;&#x7684;node&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4E2D;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x90FD;&#x662F; Node.js &#x5168;&#x5C40;&#x53D8;&#x91CF;&#x6216;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x6BCF;&#x4E2A; value &#x662F;&#x4EE5;&#x4E0B;&#x5176;&#x4E2D;&#x4E4B;&#x4E00;
  // empty &#x63D0;&#x4F9B;&#x7A7A;&#x5BF9;&#x8C61;&#x3002;
  // false &#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x63D0;&#x4F9B;&#x3002;
  // &#x66F4;&#x591A;&#x67E5;&#x770B; &#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/configuration/node/
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it&apos;s native).
    // &#x9632;&#x6B62;webpack&#x6CE8;&#x5165;&#x4E00;&#x4E9B;polyfill &#x56E0;&#x4E3A;Vue&#x5DF2;&#x7ECF;&#x5305;&#x542B;&#x4E86;&#x8FD9;&#x4E9B;&#x3002;
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: &apos;empty&apos;,
    fs: &apos;empty&apos;,
    net: &apos;empty&apos;,
    tls: &apos;empty&apos;,
    child_process: &apos;empty&apos;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4F7F;&#x7528;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x66F4;&#x591A;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x67E5;&#x770B;</span>
<span class="hljs-comment">// [&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;es&#x6807;&#x51C6;&#x5165;&#x95E8;](http://es6.ruanyifeng.com/?search=%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F&amp;x=0&amp;y=0#docs/function#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)</span>
<span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;&#x5DE5;&#x5177;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;config/index.js&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;vue-loader&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">const</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./vue-loader.conf&apos;</span>)
<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x83B7;&#x53D6;&#x7EDD;&#x5BF9;&#x8DEF;&#x5F84;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">&apos;..&apos;</span>, dir)
}
<span class="hljs-comment">// &#x521B;&#x5EFA;eslint&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> createLintingRule = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|vue)$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;eslint-loader&apos;</span>,
  <span class="hljs-comment">// &#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x524D;&#x7F6E;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x9009;&#x9879;&#x662F;post&#x662F;&#x540E;&#x7F6E;</span>
  <span class="hljs-comment">// &#x628A; eslint-loader &#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x653E;&#x5230;&#x6700;&#x524D;&#x9762;&#xFF0C;&#x9632;&#x6B62;&#x5176;&#x5B83; Loader &#x628A;&#x5904;&#x7406;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4EA4;&#x7ED9; eslint-loader &#x53BB;&#x68C0;&#x67E5;</span>
  enforce: <span class="hljs-string">&apos;pre&apos;</span>,
  <span class="hljs-comment">// &#x5305;&#x542B;&#x6587;&#x4EF6;&#x5939;</span>
  include: [resolve(<span class="hljs-string">&apos;src&apos;</span>), resolve(<span class="hljs-string">&apos;test&apos;</span>)],
  <span class="hljs-attr">options</span>: {
    <span class="hljs-comment">// &#x4F7F;&#x7528;&#x53CB;&#x597D;&#x7684;eslint&#x63D0;&#x793A;&#x63D2;&#x4EF6;</span>
    formatter: <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;eslint-friendly-formatter&apos;</span>),
    <span class="hljs-comment">// eslint&#x62A5;&#x9519;&#x63D0;&#x793A;&#x662F;&#x5426;&#x663E;&#x793A;&#x4EE5;&#x906E;&#x7F69;&#x5F62;&#x5F0F;&#x663E;&#x793A;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;</span>
    <span class="hljs-comment">// &#x8FD9;&#x91CC;showEslintErrorsInOverlay&#x914D;&#x7F6E;&#x662F;false</span>
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// &#x8FD0;&#x884C;&#x73AF;&#x5883;&#x7684;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x5C31;&#x662F;&#x5B9E;&#x9645;&#x7684;&#x76EE;&#x5F55;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;</span>
  context: path.resolve(__dirname, <span class="hljs-string">&apos;../&apos;</span>),
  <span class="hljs-comment">// &#x5165;&#x53E3;</span>
  entry: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">&apos;./src/main.js&apos;</span>
  },
  <span class="hljs-comment">// &#x8F93;&#x51FA;</span>
  output: {
    <span class="hljs-comment">// &#x8DEF;&#x5F84; &#x8FD9;&#x91CC;&#x662F;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684;dist</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// &#x6587;&#x4EF6;&#x540D;</span>
    filename: <span class="hljs-string">&apos;[name].js&apos;</span>,
    <span class="hljs-attr">publicPath</span>: process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; /&#xFF0C;&#x4F46;&#x8981;&#x4E0A;&#x4F20;&#x5230;github pages&#x7B49;&#x4F1A;&#x8DEF;&#x5F84;&#x4E0D;&#x5BF9;&#xFF0C;&#x9700;&#x8981;&#x4FEE;&#x6539;&#x4E3A;./</span>
      ? config.build.assetsPublicPath
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F; /</span>
      : config.dev.assetsPublicPath
  },
  <span class="hljs-comment">// Webpack &#x5728;&#x542F;&#x52A8;&#x540E;&#x4F1A;&#x4ECE;&#x914D;&#x7F6E;&#x7684;&#x5165;&#x53E3;&#x6A21;&#x5757;&#x51FA;&#x53D1;&#x627E;&#x51FA;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x7684;&#x6A21;&#x5757;&#xFF0C;Resolve &#x914D;&#x7F6E; Webpack &#x5982;&#x4F55;&#x5BFB;&#x627E;&#x6A21;&#x5757;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x3002;</span>
  resolve: {
    <span class="hljs-comment">// &#x914D;&#x7F6E;&#x4E86;&#x8FD9;&#x4E2A;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x6269;&#x5C55;&#x540D;&#x53EF;&#x4EE5;&#x7701;&#x7565;</span>
    extensions: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-comment">// &#x7ED9;&#x5B9A;&#x5BF9;&#x8C61;&#x7684;&#x952E;&#x540E;&#x7684;&#x672B;&#x5C3E;&#x6DFB;&#x52A0; $&#xFF0C;&#x4EE5;&#x8868;&#x793A;&#x7CBE;&#x51C6;&#x5339;&#x914D; node_modules/vue/dist/vue.esm.js</span>
      <span class="hljs-comment">// &#x5F15;&#x7528; import Vue from &apos;vue&apos;&#x5C31;&#x662F;&#x5F15;&#x5165;&#x7684;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x6700;&#x540E;export default Vue &#x5BFC;&#x51FA;&#x7684;Vue;</span>
      <span class="hljs-comment">// &#x6240;&#x4EE5;&#x8FD9;&#x53E5;&#x53EF;&#x4EE5;&#x4EE5;&#x4EFB;&#x610F;&#x5927;&#x5199;&#x5B57;&#x6BCD;&#x547D;&#x540D; &#x6BD4;&#x5982;&#xFF1A;import V from &apos;vue&apos;</span>
      <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>,
      <span class="hljs-comment">// src&#x522B;&#x540D; &#x6BD4;&#x5982; &#xFF1A;&#x5F15;&#x5165;import HelloWorld from &apos;@/components/HelloWorld&apos;</span>
      <span class="hljs-string">&apos;@&apos;</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>),
    }
  },
  <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x7684;&#x8F6C;&#x6362;&#x89C4;&#x5219;</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      <span class="hljs-comment">// &#x662F;&#x5426;&#x4F7F;&#x7528;eslint &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;true</span>
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-comment">// vue-loader&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://vue-loader-v14.vuejs.org/zh-cn/</span>
        loader: <span class="hljs-string">&apos;vue-loader&apos;</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
      },
      {
        <span class="hljs-comment">// js&#x6587;&#x4EF6;&#x4F7F;&#x7528;babel-loader&#x8F6C;&#x6362;</span>
        test: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;babel-loader&apos;</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">&apos;src&apos;</span>), resolve(<span class="hljs-string">&apos;test&apos;</span>), resolve(<span class="hljs-string">&apos;node_modules/webpack-dev-server/client&apos;</span>)]
      },
      {
        <span class="hljs-comment">// &#x56FE;&#x7247;&#x6587;&#x4EF6;&#x4F7F;&#x7528;url-loader&#x8F6C;&#x6362;</span>
        test: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;url-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// &#x9650;&#x5236;&#x5927;&#x5C0F;10000B(bytes)&#x4EE5;&#x5185;&#xFF0C;&#x8F6C;&#x6210;base64&#x7F16;&#x7801;&#x7684;dataURL&#x5B57;&#x7B26;&#x4E32;</span>
          limit: <span class="hljs-number">10000</span>,
          <span class="hljs-comment">// &#x8F93;&#x51FA;&#x8DEF;&#x5F84; img/&#x540D;&#x79F0;.7&#x4F4D;hash.&#x6269;&#x5C55;&#x540D;</span>
          name: utils.assetsPath(<span class="hljs-string">&apos;img/[name].[hash:7].[ext]&apos;</span>)
        }
      },
      {
        <span class="hljs-comment">// &#x89C6;&#x9891;&#x6587;&#x4EF6;&#x4F7F;&#x7528;url-loader&#x8F6C;&#x6362;</span>
        test: <span class="hljs-regexp">/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;url-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">&apos;media/[name].[hash:7].[ext]&apos;</span>)
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">&apos;url-loader&apos;</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">&apos;fonts/[name].[hash:7].[ext]&apos;</span>)
        }
      }
    ]
  },
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;node&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4E2D;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x90FD;&#x662F; Node.js &#x5168;&#x5C40;&#x53D8;&#x91CF;&#x6216;&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x6BCF;&#x4E2A; value &#x662F;&#x4EE5;&#x4E0B;&#x5176;&#x4E2D;&#x4E4B;&#x4E00;</span>
  <span class="hljs-comment">// empty &#x63D0;&#x4F9B;&#x7A7A;&#x5BF9;&#x8C61;&#x3002;</span>
  <span class="hljs-comment">// false &#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x63D0;&#x4F9B;&#x3002;</span>
  <span class="hljs-comment">// &#x66F4;&#x591A;&#x67E5;&#x770B; &#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://webpack.docschina.org/configuration/node/</span>
  node: {
    <span class="hljs-comment">// prevent webpack from injecting useless setImmediate polyfill because Vue</span>
    <span class="hljs-comment">// source contains it (although only uses it if it&apos;s native).</span>
    <span class="hljs-comment">// &#x9632;&#x6B62;webpack&#x6CE8;&#x5165;&#x4E00;&#x4E9B;polyfill &#x56E0;&#x4E3A;Vue&#x5DF2;&#x7ECF;&#x5305;&#x542B;&#x4E86;&#x8FD9;&#x4E9B;&#x3002;</span>
    setImmediate: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// prevent webpack from injecting mocks to Node native modules</span>
    <span class="hljs-comment">// that does not make sense for the client</span>
    dgram: <span class="hljs-string">&apos;empty&apos;</span>,
    <span class="hljs-attr">fs</span>: <span class="hljs-string">&apos;empty&apos;</span>,
    <span class="hljs-attr">net</span>: <span class="hljs-string">&apos;empty&apos;</span>,
    <span class="hljs-attr">tls</span>: <span class="hljs-string">&apos;empty&apos;</span>,
    <span class="hljs-attr">child_process</span>: <span class="hljs-string">&apos;empty&apos;</span>
  }
}</code></pre><h3 id="articleHeader6"><code>build/vue-loader.conf.js</code> <code>vue-loader</code>&#x914D;&#x7F6E;&#x6587;&#x4EF6;</h3><p>&#x4E0A;&#x6587;<code>build/webpack.dev.conf.js</code>&#x63D0;&#x5230;&#x5F15;&#x5165;&#x4E86;<code>build/vue-loader.conf.js</code>&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x5BFC;&#x51FA;&#x4E86;&#x4E00;&#x4EFD;<code>Vue-loader</code>&#x7684;&#x914D;&#x7F6E;&#xFF0C;<br>&#x4E3B;&#x8981;&#x6709;&#xFF1A;<code>loaders</code>&#xFF0C;<code>cssSourceMap</code>&#xFF0C;<code>cacheBusting</code>&#xFF0C;<code>transformToRequire</code>&#x3002;</p><p>&#x5177;&#x4F53;&#x770B;&#x8BE5;&#x6587;&#x4EF6;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
const utils = require(&apos;./utils&apos;)
const config = require(&apos;../config&apos;)
const isProduction = process.env.NODE_ENV === &apos;production&apos;
const sourceMapEnabled = isProduction
  // &#x8FD9;&#x91CC;&#x662F;true
  ? config.build.productionSourceMap
  // &#x8FD9;&#x91CC;&#x662F;true
  : config.dev.cssSourceMap
// &#x66F4;&#x591A;&#x914D;&#x7F6E; &#x53EF;&#x4EE5;&#x67E5;&#x770B;vue-loader&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://vue-loader-v14.vuejs.org/zh-cn/
module.exports = {
  // cssLoaders &#x751F;&#x6210;&#x76F8;&#x5E94;loader&#x914D;&#x7F6E;&#xFF0C;&#x5177;&#x4F53;&#x770B;utils&#x6587;&#x4EF6;&#x4E2D;&#x7684;cssLoader
  loaders: utils.cssLoaders({
    // &#x662F;&#x5426;&#x5F00;&#x542F;sourceMap&#xFF0C;&#x4FBF;&#x4E8E;&#x8C03;&#x8BD5;
    sourceMap: sourceMapEnabled,
    // &#x662F;&#x5426;&#x63D0;&#x53D6;vue&#x5355;&#x6587;&#x4EF6;&#x7684;css
    extract: isProduction
  }),
  // &#x662F;&#x5426;&#x5F00;&#x542F;cssSourceMap&#xFF0C;&#x4FBF;&#x4E8E;&#x8C03;&#x8BD5;
  cssSourceMap: sourceMapEnabled,
  // &#x8FD9;&#x91CC;&#x662F;true
  // &#x7F13;&#x5B58;&#x7834;&#x574F;&#xFF0C;&#x8FDB;&#x884C;sourceMap debug&#x65F6;&#xFF0C;&#x8BBE;&#x7F6E;&#x6210;false&#x5F88;&#x6709;&#x5E2E;&#x52A9;&#x3002;
  cacheBusting: config.dev.cacheBusting,
  // vue&#x5355;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x56FE;&#x7247;&#x7B49;&#x8D44;&#x6E90;&#x5F15;&#x7528;&#x8F6C;&#x6210;require&#x7684;&#x5F62;&#x5F0F;&#x3002;&#x4EE5;&#x4FBF;&#x76EE;&#x6807;&#x8D44;&#x6E90;&#x53EF;&#x4EE5;&#x7531; webpack &#x5904;&#x7406;&#x3002;
  transformToRequire: {
    video: [&apos;src&apos;, &apos;poster&apos;],
    source: &apos;src&apos;,
    img: &apos;src&apos;,
    // &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4F1A;&#x8F6C;&#x6362; &lt;img&gt; &#x6807;&#x7B7E;&#x4E0A;&#x7684; src &#x5C5E;&#x6027;&#x548C; SVG &#x7684; &lt;image&gt; &#x6807;&#x7B7E;&#x4E0A;&#x7684; xlink&#xFF1A;href &#x5C5E;&#x6027;&#x3002;
    image: &apos;xlink:href&apos;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-keyword">const</span> isProduction = process.env.NODE_ENV === <span class="hljs-string">&apos;production&apos;</span>
<span class="hljs-keyword">const</span> sourceMapEnabled = isProduction
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;true</span>
  ? config.build.productionSourceMap
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;true</span>
  : config.dev.cssSourceMap
<span class="hljs-comment">// &#x66F4;&#x591A;&#x914D;&#x7F6E; &#x53EF;&#x4EE5;&#x67E5;&#x770B;vue-loader&#x4E2D;&#x6587;&#x6587;&#x6863;&#xFF1A;https://vue-loader-v14.vuejs.org/zh-cn/</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// cssLoaders &#x751F;&#x6210;&#x76F8;&#x5E94;loader&#x914D;&#x7F6E;&#xFF0C;&#x5177;&#x4F53;&#x770B;utils&#x6587;&#x4EF6;&#x4E2D;&#x7684;cssLoader</span>
  loaders: utils.cssLoaders({
    <span class="hljs-comment">// &#x662F;&#x5426;&#x5F00;&#x542F;sourceMap&#xFF0C;&#x4FBF;&#x4E8E;&#x8C03;&#x8BD5;</span>
    sourceMap: sourceMapEnabled,
    <span class="hljs-comment">// &#x662F;&#x5426;&#x63D0;&#x53D6;vue&#x5355;&#x6587;&#x4EF6;&#x7684;css</span>
    extract: isProduction
  }),
  <span class="hljs-comment">// &#x662F;&#x5426;&#x5F00;&#x542F;cssSourceMap&#xFF0C;&#x4FBF;&#x4E8E;&#x8C03;&#x8BD5;</span>
  cssSourceMap: sourceMapEnabled,
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;true</span>
  <span class="hljs-comment">// &#x7F13;&#x5B58;&#x7834;&#x574F;&#xFF0C;&#x8FDB;&#x884C;sourceMap debug&#x65F6;&#xFF0C;&#x8BBE;&#x7F6E;&#x6210;false&#x5F88;&#x6709;&#x5E2E;&#x52A9;&#x3002;</span>
  cacheBusting: config.dev.cacheBusting,
  <span class="hljs-comment">// vue&#x5355;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x56FE;&#x7247;&#x7B49;&#x8D44;&#x6E90;&#x5F15;&#x7528;&#x8F6C;&#x6210;require&#x7684;&#x5F62;&#x5F0F;&#x3002;&#x4EE5;&#x4FBF;&#x76EE;&#x6807;&#x8D44;&#x6E90;&#x53EF;&#x4EE5;&#x7531; webpack &#x5904;&#x7406;&#x3002;</span>
  transformToRequire: {
    <span class="hljs-attr">video</span>: [<span class="hljs-string">&apos;src&apos;</span>, <span class="hljs-string">&apos;poster&apos;</span>],
    <span class="hljs-attr">source</span>: <span class="hljs-string">&apos;src&apos;</span>,
    <span class="hljs-attr">img</span>: <span class="hljs-string">&apos;src&apos;</span>,
    <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x914D;&#x7F6E;&#x4F1A;&#x8F6C;&#x6362; &lt;img&gt; &#x6807;&#x7B7E;&#x4E0A;&#x7684; src &#x5C5E;&#x6027;&#x548C; SVG &#x7684; &lt;image&gt; &#x6807;&#x7B7E;&#x4E0A;&#x7684; xlink&#xFF1A;href &#x5C5E;&#x6027;&#x3002;</span>
    image: <span class="hljs-string">&apos;xlink:href&apos;</span>
  }
}
</code></pre><p>&#x770B;&#x5B8C;&#x4E86;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x76F8;&#x5E94;&#x914D;&#x7F6E;&#xFF0C;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x7684;&#x76F8;&#x5173;&#x914D;&#x7F6E;&#x5C31;&#x4E32;&#x8D77;&#x6765;&#x4E86;&#x3002;<br>&#x5176;&#x4E2D;<code>config/</code>&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x7B14;&#x8005;&#x90FD;&#x5DF2;&#x7ECF;&#x6CE8;&#x91CA;&#x5728;<code>build/</code>&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x6240;&#x4EE5;&#x5C31;&#x4E0D;&#x5355;&#x72EC;&#x8BF4;&#x660E;&#x4E86;&#x3002;</p><p>&#x90A3;&#x56DE;&#x8FC7;&#x5934;&#x6765;&#x770B;&#xFF0C;<code>package.json</code>&#x7684;<code>scripts</code>&#x4E2D;&#x7684;<code>npm run build</code>&#x914D;&#x7F6E;&#xFF0C;<code>node build/build.js</code>&#xFF0C;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x7528;<code>node</code>&#x53BB;&#x6267;&#x884C;<code>build/build.js</code>&#x6587;&#x4EF6;&#x3002;</p><h3 id="articleHeader7"><code>build/build.js</code> <code>npm run build</code> &#x6307;&#x5B9A;&#x6267;&#x884C;&#x7684;&#x6587;&#x4EF6;</h3><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x505A;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;<br>1&#x3001;&#x5F15;&#x5165;<code>build/check-versions</code>&#x6587;&#x4EF6;&#xFF0C;&#x68C0;&#x67E5;<code>node</code>&#x548C;<code>npm</code>&#x7684;&#x7248;&#x672C;&#xFF0C;<br>2&#x3001;&#x5F15;&#x5165;&#x76F8;&#x5173;&#x63D2;&#x4EF6;&#x548C;&#x914D;&#x7F6E;&#xFF0C;&#x5176;&#x4E2D;&#x5F15;&#x5165;&#x4E86;<code>webpack</code>&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7684;&#x914D;&#x7F6E;<code>build/webpack.prod.conf.js</code>&#xFF0C;<br>3&#x3001;&#x5148;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;<code>loading</code>&#xFF0C;&#x5220;&#x9664;<code>dist</code>&#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x5F00;&#x59CB;&#x6784;&#x5EFA;&#xFF0C;&#x6784;&#x5EFA;&#x5931;&#x8D25;&#x548C;&#x6784;&#x5EFA;&#x6210;&#x529F;&#x90FD;&#x7ED9;&#x51FA;&#x76F8;&#x5E94;&#x7684;&#x63D0;&#x793A;&#x4FE1;&#x606F;&#x3002;</p><p>&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x76F8;&#x5E94;&#x7684;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
// &#x68C0;&#x67E5;node npm&#x7684;&#x7248;&#x672C;
require(&apos;./check-versions&apos;)()

process.env.NODE_ENV = &apos;production&apos;
// &#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x7684;loading
const ora = require(&apos;ora&apos;)
// &#x5220;&#x9664;&#x6587;&#x4EF6;&#x6216;&#x6587;&#x4EF6;&#x5939;
const rm = require(&apos;rimraf&apos;)
// &#x8DEF;&#x5F84;&#x76F8;&#x5173;
const path = require(&apos;path&apos;)
// &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x6837;&#x5F0F; chalk &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/chalk/chalk
const chalk = require(&apos;chalk&apos;)
// &#x5F15;&#x5165;webpack
const webpack = require(&apos;webpack&apos;)
// &#x5F15;&#x5165;config/index.js
const config = require(&apos;../config&apos;)
// &#x5F15;&#x5165; &#x751F;&#x4EA7;&#x73AF;&#x5883;webpack&#x914D;&#x7F6E;
const webpackConfig = require(&apos;./webpack.prod.conf&apos;)

// &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x5F00;&#x59CB;&#x6784;&#x5EFA;loading
const spinner = ora(&apos;building for production...&apos;)
spinner.start()

// &#x5220;&#x9664;&#x539F;&#x6709;&#x6784;&#x5EFA;&#x8F93;&#x51FA;&#x7684;&#x76EE;&#x5F55;&#x6587;&#x4EF6; &#x8FD9;&#x91CC;&#x662F;dist &#x548C; static
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  // &#x5982;&#x679C;&#x51FA;&#x9519;&#xFF0C;&#x629B;&#x51FA;&#x9519;&#x8BEF;
  if (err) throw err
  webpack(webpackConfig, (err, stats) =&gt; {
    // &#x5173;&#x95ED; &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x5F00;&#x59CB;&#x6784;&#x5EFA;loading
    spinner.stop()
    // &#x5982;&#x679C;&#x51FA;&#x9519;&#xFF0C;&#x629B;&#x51FA;&#x9519;&#x8BEF;
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + &apos;\n\n&apos;)

    // &#x5982;&#x679C;&#x6709;&#x9519;&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x6784;&#x5EFA;&#x5931;&#x8D25;
    if (stats.hasErrors()) {
      console.log(chalk.red(&apos;  Build failed with errors.\n&apos;))
      process.exit(1)
    }

    // &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x6784;&#x5EFA;&#x6210;&#x529F;&#x76F8;&#x5173;&#x4FE1;&#x606F;
    console.log(chalk.cyan(&apos;  Build complete.\n&apos;))
    console.log(chalk.yellow(
      &apos;  Tip: built files are meant to be served over an HTTP server.\n&apos; +
      &apos;  Opening index.html over file:// won\&apos;t work.\n&apos;
    ))
  })
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-comment">// &#x68C0;&#x67E5;node npm&#x7684;&#x7248;&#x672C;</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./check-versions&apos;</span>)()

process.env.NODE_ENV = <span class="hljs-string">&apos;production&apos;</span>
<span class="hljs-comment">// &#x547D;&#x4EE4;&#x884C;&#x4E2D;&#x7684;loading</span>
<span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;ora&apos;</span>)
<span class="hljs-comment">// &#x5220;&#x9664;&#x6587;&#x4EF6;&#x6216;&#x6587;&#x4EF6;&#x5939;</span>
<span class="hljs-keyword">const</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;rimraf&apos;</span>)
<span class="hljs-comment">// &#x8DEF;&#x5F84;&#x76F8;&#x5173;</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-comment">// &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x6837;&#x5F0F; chalk &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/chalk/chalk</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;chalk&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;webpack</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;config/index.js</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165; &#x751F;&#x4EA7;&#x73AF;&#x5883;webpack&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.prod.conf&apos;</span>)

<span class="hljs-comment">// &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x5F00;&#x59CB;&#x6784;&#x5EFA;loading</span>
<span class="hljs-keyword">const</span> spinner = ora(<span class="hljs-string">&apos;building for production...&apos;</span>)
spinner.start()

<span class="hljs-comment">// &#x5220;&#x9664;&#x539F;&#x6709;&#x6784;&#x5EFA;&#x8F93;&#x51FA;&#x7684;&#x76EE;&#x5F55;&#x6587;&#x4EF6; &#x8FD9;&#x91CC;&#x662F;dist &#x548C; static</span>
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  <span class="hljs-comment">// &#x5982;&#x679C;&#x51FA;&#x9519;&#xFF0C;&#x629B;&#x51FA;&#x9519;&#x8BEF;</span>
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  webpack(webpackConfig, (err, stats) =&gt; {
    <span class="hljs-comment">// &#x5173;&#x95ED; &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x5F00;&#x59CB;&#x6784;&#x5EFA;loading</span>
    spinner.stop()
    <span class="hljs-comment">// &#x5982;&#x679C;&#x51FA;&#x9519;&#xFF0C;&#x629B;&#x51FA;&#x9519;&#x8BEF;</span>
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    process.stdout.write(stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// If you are using ts-loader, setting this to true will make TypeScript errors show up during build.</span>
      chunks: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
    }) + <span class="hljs-string">&apos;\n\n&apos;</span>)

    <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;&#x9519;&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x6784;&#x5EFA;&#x5931;&#x8D25;</span>
    <span class="hljs-keyword">if</span> (stats.hasErrors()) {
      <span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">&apos;  Build failed with errors.\n&apos;</span>))
      process.exit(<span class="hljs-number">1</span>)
    }

    <span class="hljs-comment">// &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x6784;&#x5EFA;&#x6210;&#x529F;&#x76F8;&#x5173;&#x4FE1;&#x606F;</span>
    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">&apos;  Build complete.\n&apos;</span>))
    <span class="hljs-built_in">console</span>.log(chalk.yellow(
      <span class="hljs-string">&apos;  Tip: built files are meant to be served over an HTTP server.\n&apos;</span> +
      <span class="hljs-string">&apos;  Opening index.html over file:// won\&apos;t work.\n&apos;</span>
    ))
  })
})
</code></pre><h3 id="articleHeader8"><code>build/check-versions</code> &#x68C0;&#x67E5;<code>node</code>&#x548C;<code>npm</code>&#x7248;&#x672C;</h3><p>&#x4E0A;&#x6587;&#x63D0;&#x5230;<code>build/check-versions</code> &#x68C0;&#x67E5;<code>node</code>&#x548C;<code>npm</code>&#x7248;&#x672C;&#xFF0C;<br>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x5F15;&#x5165;&#x4E86;&#x4E00;&#x4E9B;&#x63D2;&#x4EF6;&#x548C;&#x914D;&#x7F6E;&#xFF0C;&#x6700;&#x540E;&#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x7248;&#x672C;&#x4E0D;&#x7B26;&#x5408;&#x9884;&#x671F;&#x5C31;&#x8F93;&#x51FA;&#x8B66;&#x544A;&#x3002;</p><p>&#x5177;&#x4F53;&#x67E5;&#x770B;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
// &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x6837;&#x5F0F; chalk &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/chalk/chalk
const chalk = require(&apos;chalk&apos;)
// &#x8BED;&#x4E49;&#x5316;&#x63A7;&#x5236;&#x7248;&#x672C;&#x7684;&#x63D2;&#x4EF6; &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/npm/node-semver
const semver = require(&apos;semver&apos;)
// package.json&#x914D;&#x7F6E;
const packageConfig = require(&apos;../package.json&apos;)
// shell &#x811A;&#x672C; Unix shell commands for Node.js &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/shelljs/shelljs
const shell = require(&apos;shelljs&apos;)

function exec (cmd) {
  return require(&apos;child_process&apos;).execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: &apos;node&apos;,
    currentVersion: semver.clean(process.version),
    // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;&quot;node&quot;: &quot;&gt;= 6.0.0&quot;,
    versionRequirement: packageConfig.engines.node
  }
]
// &#x9700;&#x8981;&#x4F7F;&#x7528;npm
if (shell.which(&apos;npm&apos;)) {
  versionRequirements.push({
    name: &apos;npm&apos;,
    currentVersion: exec(&apos;npm --version&apos;),
    // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;&quot;npm&quot;: &quot;&gt;= 3.0.0&quot;
    versionRequirement: packageConfig.engines.npm
  })
}
// &#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x68C0;&#x67E5;&#x7248;&#x672C;&#x7684;&#x51FD;&#x6570;
module.exports = function () {
  const warnings = []

  for (let i = 0; i &lt; versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    // &#x5F53;&#x524D;&#x7248;&#x672C;&#x4E0D;&#x5927;&#x4E8E;&#x6240;&#x9700;&#x7248;&#x672C;
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + &apos;: &apos; +
        chalk.red(mod.currentVersion) + &apos; should be &apos; +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  // &#x5982;&#x679C;&#x6709;&#x8B66;&#x544A;&#xFF0C;&#x5168;&#x90E8;&#x8F93;&#x51FA;&#x5230;&#x63A7;&#x5236;&#x53F0;
  if (warnings.length) {
    console.log(&apos;&apos;)
    console.log(chalk.yellow(&apos;To use this template, you must update following to modules:&apos;))
    console.log()

    for (let i = 0; i &lt; warnings.length; i++) {
      const warning = warnings[i]
      console.log(&apos;  &apos; + warning)
    }

    console.log()
    process.exit(1)
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-comment">// &#x63A7;&#x5236;&#x53F0;&#x8F93;&#x5165;&#x6837;&#x5F0F; chalk &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/chalk/chalk</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;chalk&apos;</span>)
<span class="hljs-comment">// &#x8BED;&#x4E49;&#x5316;&#x63A7;&#x5236;&#x7248;&#x672C;&#x7684;&#x63D2;&#x4EF6; &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/npm/node-semver</span>
<span class="hljs-keyword">const</span> semver = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;semver&apos;</span>)
<span class="hljs-comment">// package.json&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../package.json&apos;</span>)
<span class="hljs-comment">// shell &#x811A;&#x672C; Unix shell commands for Node.js &#x66F4;&#x591A;&#x67E5;&#x770B;&#xFF1A;https://github.com/shelljs/shelljs</span>
<span class="hljs-keyword">const</span> shell = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;shelljs&apos;</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exec</span> (<span class="hljs-params">cmd</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;child_process&apos;</span>).execSync(cmd).toString().trim()
}

<span class="hljs-keyword">const</span> versionRequirements = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;node&apos;</span>,
    <span class="hljs-attr">currentVersion</span>: semver.clean(process.version),
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;&quot;node&quot;: &quot;&gt;= 6.0.0&quot;,</span>
    versionRequirement: packageConfig.engines.node
  }
]
<span class="hljs-comment">// &#x9700;&#x8981;&#x4F7F;&#x7528;npm</span>
<span class="hljs-keyword">if</span> (shell.which(<span class="hljs-string">&apos;npm&apos;</span>)) {
  versionRequirements.push({
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;npm&apos;</span>,
    <span class="hljs-attr">currentVersion</span>: exec(<span class="hljs-string">&apos;npm --version&apos;</span>),
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;&quot;npm&quot;: &quot;&gt;= 3.0.0&quot;</span>
    versionRequirement: packageConfig.engines.npm
  })
}
<span class="hljs-comment">// &#x5BFC;&#x51FA;&#x4E00;&#x4E2A;&#x68C0;&#x67E5;&#x7248;&#x672C;&#x7684;&#x51FD;&#x6570;</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> warnings = []

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; versionRequirements.length; i++) {
    <span class="hljs-keyword">const</span> mod = versionRequirements[i]

    <span class="hljs-comment">// &#x5F53;&#x524D;&#x7248;&#x672C;&#x4E0D;&#x5927;&#x4E8E;&#x6240;&#x9700;&#x7248;&#x672C;</span>
    <span class="hljs-keyword">if</span> (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + <span class="hljs-string">&apos;: &apos;</span> +
        chalk.red(mod.currentVersion) + <span class="hljs-string">&apos; should be &apos;</span> +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;&#x8B66;&#x544A;&#xFF0C;&#x5168;&#x90E8;&#x8F93;&#x51FA;&#x5230;&#x63A7;&#x5236;&#x53F0;</span>
  <span class="hljs-keyword">if</span> (warnings.length) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&apos;</span>)
    <span class="hljs-built_in">console</span>.log(chalk.yellow(<span class="hljs-string">&apos;To use this template, you must update following to modules:&apos;</span>))
    <span class="hljs-built_in">console</span>.log()

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; warnings.length; i++) {
      <span class="hljs-keyword">const</span> warning = warnings[i]
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;  &apos;</span> + warning)
    }

    <span class="hljs-built_in">console</span>.log()
    process.exit(<span class="hljs-number">1</span>)
  }
}
</code></pre><h3 id="articleHeader9"><code>build/webpack.prod.conf.js</code> <code>webpack</code>&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x914D;&#x7F6E;</h3><p>&#x4E0A;&#x6587;<code>build/build.js</code>&#x63D0;&#x5230;&#xFF0C;&#x5F15;&#x5165;&#x4E86;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x3002;<br>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x505A;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;<br>1&#x3001;&#x5F15;&#x5165;&#x4E00;&#x4E9B;&#x63D2;&#x4EF6;&#x548C;&#x914D;&#x7F6E;&#xFF0C;&#x5176;&#x4E2D;&#x5F15;&#x5165;&#x4E86;<code>build/webpack.base.conf.js</code> <code>webpack</code>&#x57FA;&#x672C;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;<br>2&#x3001;&#x7528;<code>DefinePlugin</code>&#x5B9A;&#x4E49;&#x73AF;&#x5883;&#xFF0C;<br>3&#x3001;&#x5408;&#x5E76;&#x57FA;&#x672C;&#x914D;&#x7F6E;&#xFF0C;&#x5B9A;&#x4E49;&#x81EA;&#x5DF1;&#x7684;&#x914D;&#x7F6E;<code>webpackConfig</code>&#xFF0C;&#x914D;&#x7F6E;&#x4E86;&#x4E00;&#x4E9B;<code>modules</code>&#x4E0B;&#x7684;<code>rules</code>&#xFF0C;<code>devtools</code>&#x914D;&#x7F6E;&#xFF0C;<code>output</code>&#x8F93;&#x51FA;&#x914D;&#x7F6E;&#xFF0C;&#x4E00;&#x4E9B;&#x5904;&#x7406;<code>js</code>&#x3001;&#x63D0;&#x53D6;<code>css</code>&#x3001;&#x538B;&#x7F29;<code>css</code>&#x3001;&#x8F93;&#x51FA;<code>html</code>&#x63D2;&#x4EF6;&#x3001;&#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;&#x7B49;&#x7684;<br><code>plugins</code>&#xFF0C;<br>4&#x3001;&#x5982;&#x679C;&#x542F;&#x7528;<code>gzip</code>&#xFF0C;&#x518D;&#x4F7F;&#x7528;&#x76F8;&#x5E94;&#x7684;&#x63D2;&#x4EF6;&#x5904;&#x7406;&#xFF0C;<br>5&#x3001;&#x5982;&#x679C;&#x542F;&#x7528;&#x4E86;&#x5206;&#x6790;&#x6253;&#x5305;&#x540E;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x5219;&#x7528;<code>webpack-bundle-analyzer</code>&#xFF0C;<br>6&#x3001;&#x6700;&#x540E;&#x5BFC;&#x51FA;&#x8FD9;&#x4EFD;&#x914D;&#x7F6E;&#x3002;</p><p>&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x914D;&#x7F6E;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&apos;use strict&apos;
// &#x5F15;&#x5165;node&#x8DEF;&#x5F84;&#x76F8;&#x5173;
const path = require(&apos;path&apos;)
// &#x5F15;&#x5165;utils&#x5DE5;&#x5177;&#x51FD;&#x6570;
const utils = require(&apos;./utils&apos;)
// &#x5F15;&#x5165;webpack
const webpack = require(&apos;webpack&apos;)
// &#x5F15;&#x5165;config/index.js&#x914D;&#x7F6E;&#x6587;&#x4EF6;
const config = require(&apos;../config&apos;)
// &#x5408;&#x5E76;webpack&#x914D;&#x7F6E;&#x7684;&#x63D2;&#x4EF6;
const merge = require(&apos;webpack-merge&apos;)
// &#x57FA;&#x672C;&#x7684;webpack&#x914D;&#x7F6E;
const baseWebpackConfig = require(&apos;./webpack.base.conf&apos;)
// &#x62F7;&#x8D1D;&#x6587;&#x4EF6;&#x548C;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x63D2;&#x4EF6;
const CopyWebpackPlugin = require(&apos;copy-webpack-plugin&apos;)
// &#x538B;&#x7F29;&#x5904;&#x7406;HTML&#x7684;&#x63D2;&#x4EF6;
const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;)
const ExtractTextPlugin = require(&apos;extract-text-webpack-plugin&apos;)
// &#x538B;&#x7F29;&#x5904;&#x7406;css&#x7684;&#x63D2;&#x4EF6;
const OptimizeCSSPlugin = require(&apos;optimize-css-assets-webpack-plugin&apos;)
// &#x538B;&#x7F29;&#x5904;&#x7406;js&#x7684;&#x63D2;&#x4EF6;
const UglifyJsPlugin = require(&apos;uglifyjs-webpack-plugin&apos;)

// &#x7528;DefinePlugin&#x5B9A;&#x4E49;&#x73AF;&#x5883;
const env = process.env.NODE_ENV === &apos;testing&apos;
  // &#x8FD9;&#x91CC;&#x662F; { NODE_ENV: &apos;&quot;testing&quot;&apos; }
  ? require(&apos;../config/test.env&apos;)
  // &#x8FD9;&#x91CC;&#x662F; { NODE_ENV: &apos;&quot;production&quot;&apos; }
  : require(&apos;../config/prod.env&apos;)
// &#x5408;&#x5E76;&#x57FA;&#x672C;webpack&#x914D;&#x7F6E;
const webpackConfig = merge(baseWebpackConfig, {
  module: {
    // &#x901A;&#x8FC7;styleLoaders&#x51FD;&#x6570;&#x751F;&#x6210;&#x6837;&#x5F0F;&#x7684;&#x4E00;&#x4E9B;&#x89C4;&#x5219;
    rules: utils.styleLoaders({
      // sourceMap&#x8FD9;&#x91CC;&#x662F;true
      sourceMap: config.build.productionSourceMap,
      // &#x662F;&#x5426;&#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;
      extract: true,
      // &#x662F;&#x5426;&#x4F7F;&#x7528;postcss
      usePostCSS: true
    })
  },
  // &#x914D;&#x7F6E;&#x4F7F;&#x7528;sourceMap true &#x8FD9;&#x91CC;&#x662F; #source-map
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    // &#x8FD9;&#x91CC;&#x662F;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684;dist
    path: config.build.assetsRoot,
    // &#x6587;&#x4EF6;&#x540D;&#x79F0; chunkhash
    filename: utils.assetsPath(&apos;js/[name].[chunkhash].js&apos;),
    // chunks&#x540D;&#x79F0; chunkhash
    chunkFilename: utils.assetsPath(&apos;js/[id].[chunkhash].js&apos;)
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // &#x5B9A;&#x4E49;&#x5177;&#x4F53;&#x662F;&#x4EC0;&#x4E48;&#x73AF;&#x5883;
    new webpack.DefinePlugin({
      &apos;process.env&apos;: env
    }),
    // &#x538B;&#x7F29;js&#x63D2;&#x4EF6;
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          // &#x8B66;&#x544A;
          warnings: false
          // &#x6784;&#x5EFA;&#x540E;&#x7684;&#x6587;&#x4EF6; &#x5E38;&#x7528;&#x7684;&#x914D;&#x7F6E;&#x8FD8;&#x6709;&#x8FD9;&#x4E9B;
          // &#x53BB;&#x9664;console.log &#x9ED8;&#x8BA4;&#x4E3A;false&#x3002;  &#x4F20;&#x5165;true&#x4F1A;&#x4E22;&#x5F03;&#x5BF9;console&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x3002;
          // drop_console: true,
          // &#x53BB;&#x9664;debugger
          // drop_debugger: true,
          // &#x9ED8;&#x8BA4;&#x4E3A;null. &#x4F60;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x540D;&#x79F0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x800C;UglifyJs&#x5C06;&#x4F1A;&#x5047;&#x5B9A;&#x90A3;&#x4E9B;&#x51FD;&#x6570;&#x4E0D;&#x4F1A;&#x4EA7;&#x751F;&#x526F;&#x4F5C;&#x7528;&#x3002;
          // pure_funcs: [ &apos;console.log&apos;, &apos;console.log.apply&apos; ],
        }
      },
      // &#x662F;&#x5426;&#x5F00;&#x542F;sourceMap &#x8FD9;&#x91CC;&#x662F;true
      sourceMap: config.build.productionSourceMap,
      // &#x5E73;&#x884C;&#x5904;&#x7406;&#xFF08;&#x540C;&#x65F6;&#x5904;&#x7406;&#xFF09;&#x52A0;&#x5FEB;&#x901F;&#x5EA6;
      parallel: true
    }),
    // extract css into its own file
    // &#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;
    new ExtractTextPlugin({
      // &#x63D0;&#x53D6;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x540D; &#x4F7F;&#x7528;&#x5185;&#x5BB9;hash contenthash
      filename: utils.assetsPath(&apos;css/[name].[contenthash].css&apos;),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It&apos;s currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it&apos;s `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      // allChunks &#x9ED8;&#x8BA4;&#x662F;false,true&#x6307;&#x63D0;&#x53D6;&#x6240;&#x6709;chunks&#x5305;&#x62EC;&#x52A8;&#x6001;&#x5F15;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x3002;
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;true
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      // &#x8F93;&#x51FA;html&#x540D;&#x79F0;
      filename: process.env.NODE_ENV === &apos;testing&apos;
        ? &apos;index.html&apos;
        // &#x8FD9;&#x91CC;&#x662F; &#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684;dist/index.html
        : config.build.index,
      // &#x4F7F;&#x7528;&#x54EA;&#x4E2A;&#x6A21;&#x677F;
      template: &apos;index.html&apos;,
      // inject &#x9ED8;&#x8BA4;&#x503C; true&#xFF0C;script&#x6807;&#x7B7E;&#x4F4D;&#x4E8E;html&#x6587;&#x4EF6;&#x7684; body &#x5E95;&#x90E8;
      // body &#x901A;true, header, script &#x6807;&#x7B7E;&#x4F4D;&#x4E8E; head &#x6807;&#x7B7E;&#x5185;
      // false &#x4E0D;&#x63D2;&#x5165;&#x751F;&#x6210;&#x7684; js &#x6587;&#x4EF6;&#xFF0C;&#x53EA;&#x662F;&#x5355;&#x7EAF;&#x7684;&#x751F;&#x6210;&#x4E00;&#x4E2A; html &#x6587;&#x4EF6;
      inject: true,
      // &#x538B;&#x7F29;
      minify: {
        // &#x5220;&#x9664;&#x6CE8;&#x91CA;
        removeComments: true,
        // &#x5220;&#x9664;&#x7A7A;&#x683C;&#x548C;&#x6362;&#x884C;
        collapseWhitespace: true,
        // &#x5220;&#x9664;html&#x6807;&#x7B7E;&#x4E2D;&#x5C5E;&#x6027;&#x7684;&#x53CC;&#x5F15;&#x53F7;
        removeAttributeQuotes: true
        // &#x66F4;&#x591A;&#x914D;&#x7F6E;&#x67E5;&#x770B;html-minifier&#x63D2;&#x4EF6;
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // &#x5728;chunk&#x88AB;&#x63D2;&#x5165;&#x5230;html&#x4E4B;&#x524D;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x5B83;&#x4EEC;&#x7684;&#x6392;&#x5E8F;&#x3002;&#x5141;&#x8BB8;&#x7684;&#x503C; &#x2018;none&#x2019; | &#x2018;auto&#x2019; | &#x2018;dependency&#x2019; | {function} &#x9ED8;&#x8BA4;&#x4E3A;&#x2018;auto&#x2019;.
      // dependency &#x4F9D;&#x8D56;&#xFF08;&#x4ECE;&#x5C5E;&#xFF09;
      chunksSortMode: &apos;dependency&apos;
    }),
    // keep module.id stable when vendor modules does not change
    // &#x6839;&#x636E;&#x4EE3;&#x7801;&#x5185;&#x5BB9;&#x751F;&#x6210;&#x666E;&#x901A;&#x6A21;&#x5757;&#x7684;id&#xFF0C;&#x786E;&#x4FDD;&#x6E90;&#x7801;&#x4E0D;&#x53D8;&#xFF0C;moduleID&#x4E0D;&#x53D8;&#x3002;
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    // &#x5F00;&#x542F;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347; webpack3&#x65B0;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x8BA9;&#x4EE3;&#x7801;&#x6587;&#x4EF6;&#x66F4;&#x5C0F;&#x3001;&#x8FD0;&#x884C;&#x7684;&#x66F4;&#x5FEB;
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // &#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;
    new webpack.optimize.CommonsChunkPlugin({
      name: &apos;vendor&apos;,
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, &apos;../node_modules&apos;)
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // &#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;
    new webpack.optimize.CommonsChunkPlugin({
      // &#x628A;&#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;&#x653E;&#x5230; manifest &#x4E2D;
      name: &apos;manifest&apos;,
      // &#x4F20;&#x5165; `Infinity` &#x4F1A;&#x9A6C;&#x4E0A;&#x751F;&#x6210; &#x516C;&#x5171;chunk&#xFF0C;&#x4F46;&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x6A21;&#x5757;&#x3002;
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // &#x63D0;&#x53D6;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;
    new webpack.optimize.CommonsChunkPlugin({
      name: &apos;app&apos;,
      // &#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A; `true`&#xFF0C;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x7684;  &#x516C;&#x5171;chunk &#x4F1A;&#x4F5C;&#x4E3A; `options.name` &#x7684;&#x5B50;&#x6A21;&#x5757;&#xFF0C;&#x548C; `options.chunks` &#x7684;&#x5144;&#x5F1F;&#x6A21;&#x5757;&#x88AB;&#x521B;&#x5EFA;&#x3002;
      // &#x5B83;&#x4F1A;&#x4E0E; `options.chunks` &#x5E76;&#x884C;&#x88AB;&#x52A0;&#x8F7D;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x63D0;&#x4F9B;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x800C;&#x4E0D;&#x662F; `true` &#x6765;&#x5BF9;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x66F4;&#x6362;&#x540D;&#x79F0;&#x3002;
      async: &apos;vendor-async&apos;,
      // &#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A; `true`&#xFF0C;&#x6240;&#x6709;  &#x516C;&#x5171;chunk &#x7684;&#x5B50;&#x6A21;&#x5757;&#x90FD;&#x4F1A;&#x88AB;&#x9009;&#x62E9;
      children: true,
      // &#x6700;&#x5C0F;3&#x4E2A;&#xFF0C;&#x5305;&#x542B;3&#xFF0C;chunk&#x7684;&#x65F6;&#x5019;&#x63D0;&#x53D6;
      minChunks: 3
    }),

    // copy custom static assets
    // &#x628A;static&#x8D44;&#x6E90;&#x590D;&#x5236;&#x5230;&#x76F8;&#x5E94;&#x76EE;&#x5F55;&#x3002;
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, &apos;../static&apos;),
        // &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;static
        to: config.build.assetsSubDirectory,
        // &#x5FFD;&#x7565;.&#x5F00;&#x5934;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x7684;.gitkeep&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x6307;&#x7A7A;&#x6587;&#x4EF6;&#x5939;&#x4E5F;&#x63D0;&#x4EA4;&#x5230;git
        ignore: [&apos;.*&apos;]
      }
    ])
  ]
})
// &#x5982;&#x679C;&#x5F00;&#x59CB;gzip&#x538B;&#x7F29;&#xFF0C;&#x4F7F;&#x7528;compression-webpack-plugin&#x63D2;&#x4EF6;&#x5904;&#x7406;&#x3002;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;false
// &#x9700;&#x8981;&#x4F7F;&#x7528;&#x662F;&#x9700;&#x8981;&#x5B89;&#x88C5; npm i compression-webpack-plugin -D
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require(&apos;compression-webpack-plugin&apos;)

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      // asset&#xFF1A; &#x76EE;&#x6807;&#x8D44;&#x6E90;&#x540D;&#x79F0;&#x3002; [file] &#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x539F;&#x59CB;&#x8D44;&#x6E90;&#x3002;
      // [path] &#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x539F;&#x59CB;&#x8D44;&#x6E90;&#x7684;&#x8DEF;&#x5F84;&#xFF0C; [query] &#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x67E5;&#x8BE2;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; &quot;[path].gz[query]&quot;&#x3002;
      asset: &apos;[path].gz[query]&apos;,
      // algorithm&#xFF1A; &#x53EF;&#x4EE5;&#x662F; function(buf, callback) &#x6216;&#x8005;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x5BF9;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#x6765;&#x8BF4;&#x4F9D;&#x7167; zlib &#x7684;&#x7B97;&#x6CD5;(&#x6216;&#x8005; zopfli &#x7684;&#x7B97;&#x6CD5;)&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; &quot;gzip&quot;&#x3002;
      algorithm: &apos;gzip&apos;,
      // test&#xFF1A; &#x6240;&#x6709;&#x5339;&#x914D;&#x8BE5;&#x6B63;&#x5219;&#x7684;&#x8D44;&#x6E90;&#x90FD;&#x4F1A;&#x88AB;&#x5904;&#x7406;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#x3002;
      // config.build.productionGzipExtensions &#x8FD9;&#x91CC;&#x662F;[&apos;js&apos;, &apos;css&apos;]
      test: new RegExp(
        &apos;\\.(&apos; +
        config.build.productionGzipExtensions.join(&apos;|&apos;) +
        &apos;)$&apos;
      ),
      // threshold&#xFF1A; &#x53EA;&#x6709;&#x5927;&#x5C0F;&#x5927;&#x4E8E;&#x8BE5;&#x503C;&#x7684;&#x8D44;&#x6E90;&#x4F1A;&#x88AB;&#x5904;&#x7406;&#x3002;&#x5355;&#x4F4D;&#x662F; bytes&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 0&#x3002;
      threshold: 10240,
      // minRatio&#xFF1A; &#x53EA;&#x6709;&#x538B;&#x7F29;&#x7387;&#x5C0F;&#x4E8E;&#x8FD9;&#x4E2A;&#x503C;&#x7684;&#x8D44;&#x6E90;&#x624D;&#x4F1A;&#x88AB;&#x5904;&#x7406;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 0.8&#x3002;
      minRatio: 0.8
    })
  )
}

// &#x8F93;&#x51FA;&#x5206;&#x6790;&#x7684;&#x63D2;&#x4EF6; &#x8FD0;&#x884C;npm run build --report
// config.build.bundleAnalyzerReport&#x8FD9;&#x91CC;&#x662F; process.env.npm_config_report
// build&#x7ED3;&#x675F;&#x540E;&#x4F1A;&#x81EA;&#x5B9A;&#x6253;&#x5F00; http://127.0.0.1:8888 &#x94FE;&#x63A5;
if (config.build.bundleAnalyzerReport) {
  // &#x66F4;&#x591A;&#x67E5;&#x770B;&#x94FE;&#x63A5;&#x5730;&#x5740;&#xFF1A;https://www.npmjs.com/package/webpack-bundle-analyzer
  const BundleAnalyzerPlugin = require(&apos;webpack-bundle-analyzer&apos;).BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}
// &#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x7684;&#x7F51;&#x7AD9; http://webpack.github.io/analyse/#home
// &#x8FD0;&#x884C;&#x7C7B;&#x4F3C; webpack --profile --json &gt; stats.json &#x547D;&#x4EE4;
// &#x628A;&#x751F;&#x6210;&#x7684;&#x6784;&#x5EFA;&#x4FE1;&#x606F;stats.json&#x4E0A;&#x4F20;&#x5373;&#x53EF;


// &#x6700;&#x7EC8;&#x5BFC;&#x51FA; webpackConfig
module.exports = webpackConfig
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-meta">&apos;use strict&apos;</span>
<span class="hljs-comment">// &#x5F15;&#x5165;node&#x8DEF;&#x5F84;&#x76F8;&#x5173;</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;utils&#x5DE5;&#x5177;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./utils&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;webpack</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack&apos;</span>)
<span class="hljs-comment">// &#x5F15;&#x5165;config/index.js&#x914D;&#x7F6E;&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config&apos;</span>)
<span class="hljs-comment">// &#x5408;&#x5E76;webpack&#x914D;&#x7F6E;&#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-merge&apos;</span>)
<span class="hljs-comment">// &#x57FA;&#x672C;&#x7684;webpack&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./webpack.base.conf&apos;</span>)
<span class="hljs-comment">// &#x62F7;&#x8D1D;&#x6587;&#x4EF6;&#x548C;&#x6587;&#x4EF6;&#x5939;&#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;copy-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x538B;&#x7F29;&#x5904;&#x7406;HTML&#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>)
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;extract-text-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x538B;&#x7F29;&#x5904;&#x7406;css&#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;optimize-css-assets-webpack-plugin&apos;</span>)
<span class="hljs-comment">// &#x538B;&#x7F29;&#x5904;&#x7406;js&#x7684;&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;uglifyjs-webpack-plugin&apos;</span>)

<span class="hljs-comment">// &#x7528;DefinePlugin&#x5B9A;&#x4E49;&#x73AF;&#x5883;</span>
<span class="hljs-keyword">const</span> env = process.env.NODE_ENV === <span class="hljs-string">&apos;testing&apos;</span>
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; { NODE_ENV: &apos;&quot;testing&quot;&apos; }</span>
  ? <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config/test.env&apos;</span>)
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; { NODE_ENV: &apos;&quot;production&quot;&apos; }</span>
  : <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../config/prod.env&apos;</span>)
<span class="hljs-comment">// &#x5408;&#x5E76;&#x57FA;&#x672C;webpack&#x914D;&#x7F6E;</span>
<span class="hljs-keyword">const</span> webpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// &#x901A;&#x8FC7;styleLoaders&#x51FD;&#x6570;&#x751F;&#x6210;&#x6837;&#x5F0F;&#x7684;&#x4E00;&#x4E9B;&#x89C4;&#x5219;</span>
    rules: utils.styleLoaders({
      <span class="hljs-comment">// sourceMap&#x8FD9;&#x91CC;&#x662F;true</span>
      sourceMap: config.build.productionSourceMap,
      <span class="hljs-comment">// &#x662F;&#x5426;&#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;</span>
      extract: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// &#x662F;&#x5426;&#x4F7F;&#x7528;postcss</span>
      usePostCSS: <span class="hljs-literal">true</span>
    })
  },
  <span class="hljs-comment">// &#x914D;&#x7F6E;&#x4F7F;&#x7528;sourceMap true &#x8FD9;&#x91CC;&#x662F; #source-map</span>
  devtool: config.build.productionSourceMap ? config.build.devtool : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684;dist</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// &#x6587;&#x4EF6;&#x540D;&#x79F0; chunkhash</span>
    filename: utils.assetsPath(<span class="hljs-string">&apos;js/[name].[chunkhash].js&apos;</span>),
    <span class="hljs-comment">// chunks&#x540D;&#x79F0; chunkhash</span>
    chunkFilename: utils.assetsPath(<span class="hljs-string">&apos;js/[id].[chunkhash].js&apos;</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// http://vuejs.github.io/vue-loader/en/workflow/production.html</span>
    <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x5177;&#x4F53;&#x662F;&#x4EC0;&#x4E48;&#x73AF;&#x5883;</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">&apos;process.env&apos;</span>: env
    }),
    <span class="hljs-comment">// &#x538B;&#x7F29;js&#x63D2;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> UglifyJsPlugin({
      <span class="hljs-attr">uglifyOptions</span>: {
        <span class="hljs-attr">compress</span>: {
          <span class="hljs-comment">// &#x8B66;&#x544A;</span>
          warnings: <span class="hljs-literal">false</span>
          <span class="hljs-comment">// &#x6784;&#x5EFA;&#x540E;&#x7684;&#x6587;&#x4EF6; &#x5E38;&#x7528;&#x7684;&#x914D;&#x7F6E;&#x8FD8;&#x6709;&#x8FD9;&#x4E9B;</span>
          <span class="hljs-comment">// &#x53BB;&#x9664;console.log &#x9ED8;&#x8BA4;&#x4E3A;false&#x3002;  &#x4F20;&#x5165;true&#x4F1A;&#x4E22;&#x5F03;&#x5BF9;console&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x3002;</span>
          <span class="hljs-comment">// drop_console: true,</span>
          <span class="hljs-comment">// &#x53BB;&#x9664;debugger</span>
          <span class="hljs-comment">// drop_debugger: true,</span>
          <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x4E3A;null. &#x4F60;&#x53EF;&#x4EE5;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x540D;&#x79F0;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x800C;UglifyJs&#x5C06;&#x4F1A;&#x5047;&#x5B9A;&#x90A3;&#x4E9B;&#x51FD;&#x6570;&#x4E0D;&#x4F1A;&#x4EA7;&#x751F;&#x526F;&#x4F5C;&#x7528;&#x3002;</span>
          <span class="hljs-comment">// pure_funcs: [ &apos;console.log&apos;, &apos;console.log.apply&apos; ],</span>
        }
      },
      <span class="hljs-comment">// &#x662F;&#x5426;&#x5F00;&#x542F;sourceMap &#x8FD9;&#x91CC;&#x662F;true</span>
      sourceMap: config.build.productionSourceMap,
      <span class="hljs-comment">// &#x5E73;&#x884C;&#x5904;&#x7406;&#xFF08;&#x540C;&#x65F6;&#x5904;&#x7406;&#xFF09;&#x52A0;&#x5FEB;&#x901F;&#x5EA6;</span>
      parallel: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// extract css into its own file</span>
    <span class="hljs-comment">// &#x63D0;&#x53D6;css&#x5230;&#x5355;&#x72EC;&#x7684;css&#x6587;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      <span class="hljs-comment">// &#x63D0;&#x53D6;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x540D; &#x4F7F;&#x7528;&#x5185;&#x5BB9;hash contenthash</span>
      filename: utils.assetsPath(<span class="hljs-string">&apos;css/[name].[contenthash].css&apos;</span>),
      <span class="hljs-comment">// Setting the following option to `false` will not extract CSS from codesplit chunks.</span>
      <span class="hljs-comment">// Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.</span>
      <span class="hljs-comment">// It&apos;s currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it&apos;s `false`,</span>
      <span class="hljs-comment">// increasing file size: https://github.com/vuejs-templates/webpack/issues/1110</span>
      <span class="hljs-comment">// allChunks &#x9ED8;&#x8BA4;&#x662F;false,true&#x6307;&#x63D0;&#x53D6;&#x6240;&#x6709;chunks&#x5305;&#x62EC;&#x52A8;&#x6001;&#x5F15;&#x5165;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</span>
      allChunks: <span class="hljs-literal">true</span>,
    }),
    <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
    <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
      <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;true</span>
      cssProcessorOptions: config.build.productionSourceMap
        ? { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">map</span>: { <span class="hljs-attr">inline</span>: <span class="hljs-literal">false</span> } }
        : { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span> }
    }),
    <span class="hljs-comment">// generate dist index.html with correct asset hash for caching.</span>
    <span class="hljs-comment">// you can customize output by editing /index.html</span>
    <span class="hljs-comment">// see https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-comment">// &#x8F93;&#x51FA;html&#x540D;&#x79F0;</span>
      filename: process.env.NODE_ENV === <span class="hljs-string">&apos;testing&apos;</span>
        ? <span class="hljs-string">&apos;index.html&apos;</span>
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x662F; &#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x7684;dist/index.html</span>
        : config.build.index,
      <span class="hljs-comment">// &#x4F7F;&#x7528;&#x54EA;&#x4E2A;&#x6A21;&#x677F;</span>
      template: <span class="hljs-string">&apos;index.html&apos;</span>,
      <span class="hljs-comment">// inject &#x9ED8;&#x8BA4;&#x503C; true&#xFF0C;script&#x6807;&#x7B7E;&#x4F4D;&#x4E8E;html&#x6587;&#x4EF6;&#x7684; body &#x5E95;&#x90E8;</span>
      <span class="hljs-comment">// body &#x901A;true, header, script &#x6807;&#x7B7E;&#x4F4D;&#x4E8E; head &#x6807;&#x7B7E;&#x5185;</span>
      <span class="hljs-comment">// false &#x4E0D;&#x63D2;&#x5165;&#x751F;&#x6210;&#x7684; js &#x6587;&#x4EF6;&#xFF0C;&#x53EA;&#x662F;&#x5355;&#x7EAF;&#x7684;&#x751F;&#x6210;&#x4E00;&#x4E2A; html &#x6587;&#x4EF6;</span>
      inject: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// &#x538B;&#x7F29;</span>
      minify: {
        <span class="hljs-comment">// &#x5220;&#x9664;&#x6CE8;&#x91CA;</span>
        removeComments: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">// &#x5220;&#x9664;&#x7A7A;&#x683C;&#x548C;&#x6362;&#x884C;</span>
        collapseWhitespace: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">// &#x5220;&#x9664;html&#x6807;&#x7B7E;&#x4E2D;&#x5C5E;&#x6027;&#x7684;&#x53CC;&#x5F15;&#x53F7;</span>
        removeAttributeQuotes: <span class="hljs-literal">true</span>
        <span class="hljs-comment">// &#x66F4;&#x591A;&#x914D;&#x7F6E;&#x67E5;&#x770B;html-minifier&#x63D2;&#x4EF6;</span>
        <span class="hljs-comment">// more options:</span>
        <span class="hljs-comment">// https://github.com/kangax/html-minifier#options-quick-reference</span>
      },
      <span class="hljs-comment">// necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
      <span class="hljs-comment">// &#x5728;chunk&#x88AB;&#x63D2;&#x5165;&#x5230;html&#x4E4B;&#x524D;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x5B83;&#x4EEC;&#x7684;&#x6392;&#x5E8F;&#x3002;&#x5141;&#x8BB8;&#x7684;&#x503C; &#x2018;none&#x2019; | &#x2018;auto&#x2019; | &#x2018;dependency&#x2019; | {function} &#x9ED8;&#x8BA4;&#x4E3A;&#x2018;auto&#x2019;.</span>
      <span class="hljs-comment">// dependency &#x4F9D;&#x8D56;&#xFF08;&#x4ECE;&#x5C5E;&#xFF09;</span>
      chunksSortMode: <span class="hljs-string">&apos;dependency&apos;</span>
    }),
    <span class="hljs-comment">// keep module.id stable when vendor modules does not change</span>
    <span class="hljs-comment">// &#x6839;&#x636E;&#x4EE3;&#x7801;&#x5185;&#x5BB9;&#x751F;&#x6210;&#x666E;&#x901A;&#x6A21;&#x5757;&#x7684;id&#xFF0C;&#x786E;&#x4FDD;&#x6E90;&#x7801;&#x4E0D;&#x53D8;&#xFF0C;moduleID&#x4E0D;&#x53D8;&#x3002;</span>
    <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),
    <span class="hljs-comment">// enable scope hoisting</span>
    <span class="hljs-comment">// &#x5F00;&#x542F;&#x4F5C;&#x7528;&#x57DF;&#x63D0;&#x5347; webpack3&#x65B0;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x8BA9;&#x4EE3;&#x7801;&#x6587;&#x4EF6;&#x66F4;&#x5C0F;&#x3001;&#x8FD0;&#x884C;&#x7684;&#x66F4;&#x5FEB;</span>
    <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),
    <span class="hljs-comment">// split vendor js into its own file</span>
    <span class="hljs-comment">// &#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;vendor&apos;</span>,
      minChunks (<span class="hljs-built_in">module</span>) {
        <span class="hljs-comment">// any required modules inside node_modules are extracted to vendor</span>
        <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">&apos;../node_modules&apos;</span>)
          ) === <span class="hljs-number">0</span>
        )
      }
    }),
    <span class="hljs-comment">// extract webpack runtime and module manifest to its own file in order to</span>
    <span class="hljs-comment">// prevent vendor hash from being updated whenever app bundle is updated</span>
    <span class="hljs-comment">// &#x63D0;&#x53D6;&#x516C;&#x5171;&#x4EE3;&#x7801;</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-comment">// &#x628A;&#x516C;&#x5171;&#x7684;&#x90E8;&#x5206;&#x653E;&#x5230; manifest &#x4E2D;</span>
      name: <span class="hljs-string">&apos;manifest&apos;</span>,
      <span class="hljs-comment">// &#x4F20;&#x5165; `Infinity` &#x4F1A;&#x9A6C;&#x4E0A;&#x751F;&#x6210; &#x516C;&#x5171;chunk&#xFF0C;&#x4F46;&#x91CC;&#x9762;&#x6CA1;&#x6709;&#x6A21;&#x5757;&#x3002;</span>
      minChunks: <span class="hljs-literal">Infinity</span>
    }),
    <span class="hljs-comment">// This instance extracts shared chunks from code splitted chunks and bundles them</span>
    <span class="hljs-comment">// in a separate chunk, similar to the vendor chunk</span>
    <span class="hljs-comment">// see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk</span>
    <span class="hljs-comment">// &#x63D0;&#x53D6;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;app&apos;</span>,
      <span class="hljs-comment">// &#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A; `true`&#xFF0C;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x7684;  &#x516C;&#x5171;chunk &#x4F1A;&#x4F5C;&#x4E3A; `options.name` &#x7684;&#x5B50;&#x6A21;&#x5757;&#xFF0C;&#x548C; `options.chunks` &#x7684;&#x5144;&#x5F1F;&#x6A21;&#x5757;&#x88AB;&#x521B;&#x5EFA;&#x3002;</span>
      <span class="hljs-comment">// &#x5B83;&#x4F1A;&#x4E0E; `options.chunks` &#x5E76;&#x884C;&#x88AB;&#x52A0;&#x8F7D;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x63D0;&#x4F9B;&#x60F3;&#x8981;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x800C;&#x4E0D;&#x662F; `true` &#x6765;&#x5BF9;&#x8F93;&#x51FA;&#x7684;&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x66F4;&#x6362;&#x540D;&#x79F0;&#x3002;</span>
      <span class="hljs-keyword">async</span>: <span class="hljs-string">&apos;vendor-async&apos;</span>,
      <span class="hljs-comment">// &#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E3A; `true`&#xFF0C;&#x6240;&#x6709;  &#x516C;&#x5171;chunk &#x7684;&#x5B50;&#x6A21;&#x5757;&#x90FD;&#x4F1A;&#x88AB;&#x9009;&#x62E9;</span>
      children: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// &#x6700;&#x5C0F;3&#x4E2A;&#xFF0C;&#x5305;&#x542B;3&#xFF0C;chunk&#x7684;&#x65F6;&#x5019;&#x63D0;&#x53D6;</span>
      minChunks: <span class="hljs-number">3</span>
    }),

    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-comment">// &#x628A;static&#x8D44;&#x6E90;&#x590D;&#x5236;&#x5230;&#x76F8;&#x5E94;&#x76EE;&#x5F55;&#x3002;</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../static&apos;</span>),
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;static</span>
        to: config.build.assetsSubDirectory,
        <span class="hljs-comment">// &#x5FFD;&#x7565;.&#x5F00;&#x5934;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x6BD4;&#x5982;&#x8FD9;&#x91CC;&#x7684;.gitkeep&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x6307;&#x7A7A;&#x6587;&#x4EF6;&#x5939;&#x4E5F;&#x63D0;&#x4EA4;&#x5230;git</span>
        ignore: [<span class="hljs-string">&apos;.*&apos;</span>]
      }
    ])
  ]
})
<span class="hljs-comment">// &#x5982;&#x679C;&#x5F00;&#x59CB;gzip&#x538B;&#x7F29;&#xFF0C;&#x4F7F;&#x7528;compression-webpack-plugin&#x63D2;&#x4EF6;&#x5904;&#x7406;&#x3002;&#x8FD9;&#x91CC;&#x914D;&#x7F6E;&#x662F;false</span>
<span class="hljs-comment">// &#x9700;&#x8981;&#x4F7F;&#x7528;&#x662F;&#x9700;&#x8981;&#x5B89;&#x88C5; npm i compression-webpack-plugin -D</span>
<span class="hljs-keyword">if</span> (config.build.productionGzip) {
  <span class="hljs-keyword">const</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;compression-webpack-plugin&apos;</span>)

  webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      <span class="hljs-comment">// asset&#xFF1A; &#x76EE;&#x6807;&#x8D44;&#x6E90;&#x540D;&#x79F0;&#x3002; [file] &#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x539F;&#x59CB;&#x8D44;&#x6E90;&#x3002;</span>
      <span class="hljs-comment">// [path] &#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x539F;&#x59CB;&#x8D44;&#x6E90;&#x7684;&#x8DEF;&#x5F84;&#xFF0C; [query] &#x4F1A;&#x88AB;&#x66FF;&#x6362;&#x6210;&#x67E5;&#x8BE2;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; &quot;[path].gz[query]&quot;&#x3002;</span>
      asset: <span class="hljs-string">&apos;[path].gz[query]&apos;</span>,
      <span class="hljs-comment">// algorithm&#xFF1A; &#x53EF;&#x4EE5;&#x662F; function(buf, callback) &#x6216;&#x8005;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x5BF9;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#x6765;&#x8BF4;&#x4F9D;&#x7167; zlib &#x7684;&#x7B97;&#x6CD5;(&#x6216;&#x8005; zopfli &#x7684;&#x7B97;&#x6CD5;)&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; &quot;gzip&quot;&#x3002;</span>
      algorithm: <span class="hljs-string">&apos;gzip&apos;</span>,
      <span class="hljs-comment">// test&#xFF1A; &#x6240;&#x6709;&#x5339;&#x914D;&#x8BE5;&#x6B63;&#x5219;&#x7684;&#x8D44;&#x6E90;&#x90FD;&#x4F1A;&#x88AB;&#x5904;&#x7406;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F;&#x5168;&#x90E8;&#x8D44;&#x6E90;&#x3002;</span>
      <span class="hljs-comment">// config.build.productionGzipExtensions &#x8FD9;&#x91CC;&#x662F;[&apos;js&apos;, &apos;css&apos;]</span>
      test: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(
        <span class="hljs-string">&apos;\\.(&apos;</span> +
        config.build.productionGzipExtensions.join(<span class="hljs-string">&apos;|&apos;</span>) +
        <span class="hljs-string">&apos;)$&apos;</span>
      ),
      <span class="hljs-comment">// threshold&#xFF1A; &#x53EA;&#x6709;&#x5927;&#x5C0F;&#x5927;&#x4E8E;&#x8BE5;&#x503C;&#x7684;&#x8D44;&#x6E90;&#x4F1A;&#x88AB;&#x5904;&#x7406;&#x3002;&#x5355;&#x4F4D;&#x662F; bytes&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 0&#x3002;</span>
      threshold: <span class="hljs-number">10240</span>,
      <span class="hljs-comment">// minRatio&#xFF1A; &#x53EA;&#x6709;&#x538B;&#x7F29;&#x7387;&#x5C0F;&#x4E8E;&#x8FD9;&#x4E2A;&#x503C;&#x7684;&#x8D44;&#x6E90;&#x624D;&#x4F1A;&#x88AB;&#x5904;&#x7406;&#x3002;&#x9ED8;&#x8BA4;&#x503C;&#x662F; 0.8&#x3002;</span>
      minRatio: <span class="hljs-number">0.8</span>
    })
  )
}

<span class="hljs-comment">// &#x8F93;&#x51FA;&#x5206;&#x6790;&#x7684;&#x63D2;&#x4EF6; &#x8FD0;&#x884C;npm run build --report</span>
<span class="hljs-comment">// config.build.bundleAnalyzerReport&#x8FD9;&#x91CC;&#x662F; process.env.npm_config_report</span>
<span class="hljs-comment">// build&#x7ED3;&#x675F;&#x540E;&#x4F1A;&#x81EA;&#x5B9A;&#x6253;&#x5F00; http://127.0.0.1:8888 &#x94FE;&#x63A5;</span>
<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-comment">// &#x66F4;&#x591A;&#x67E5;&#x770B;&#x94FE;&#x63A5;&#x5730;&#x5740;&#xFF1A;https://www.npmjs.com/package/webpack-bundle-analyzer</span>
  <span class="hljs-keyword">const</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-bundle-analyzer&apos;</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}
<span class="hljs-comment">// &#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x7684;&#x7F51;&#x7AD9; http://webpack.github.io/analyse/#home</span>
<span class="hljs-comment">// &#x8FD0;&#x884C;&#x7C7B;&#x4F3C; webpack --profile --json &gt; stats.json &#x547D;&#x4EE4;</span>
<span class="hljs-comment">// &#x628A;&#x751F;&#x6210;&#x7684;&#x6784;&#x5EFA;&#x4FE1;&#x606F;stats.json&#x4E0A;&#x4F20;&#x5373;&#x53EF;</span>


<span class="hljs-comment">// &#x6700;&#x7EC8;&#x5BFC;&#x51FA; webpackConfig</span>
<span class="hljs-built_in">module</span>.exports = webpackConfig
</code></pre><p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5206;&#x6790;&#x5B8C;&#x4E86;<code>package.json</code>&#x4E2D;&#x7684;<code>npm run dev</code>&#x548C;<code>npm run build</code>&#x4E24;&#x4E2A;&#x547D;&#x4EE4;&#x3002;&#x6D4B;&#x8BD5;&#x76F8;&#x5173;&#x7684;&#x7C7B;&#x4F3C;&#x5C31;&#x7565;&#x8FC7;&#x5427;&#x3002;</p><p><code>npm run lint</code>&#xFF0C;<code>.eslintrc.js</code>&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x4E0D;&#x591A;&#xFF0C;&#x66F4;&#x591A;&#x53EF;&#x4EE5;&#x67E5;&#x770B;<a href="https://eslint.org/" rel="nofollow noreferrer" target="_blank">eslint&#x82F1;&#x6587;&#x6587;&#x6863;</a>&#x6216;<a href="http://eslint.cn/" rel="nofollow noreferrer" target="_blank"><code>eslint</code>&#x4E2D;&#x6587;&#x5B98;&#x7F51;</a>&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x7565;&#x8FC7;&#x5427;&#x3002;&#x4E0D;&#x8FC7;&#x63D0;&#x4E00;&#x4E0B;&#xFF0C;&#x628A;<code>eslint</code>&#x6574;&#x5408;&#x5230;<code>git</code>&#x5DE5;&#x4F5C;&#x6D41;&#x3002;&#x53EF;&#x4EE5;&#x5B89;&#x88C5;<code>husky</code>&#xFF0C;<code>npm i husky -S</code>&#x3002;&#x5B89;&#x88C5;&#x540E;&#xFF0C;&#x914D;&#x7F6E;<code>package.json</code>&#x7684;<code>scripts</code>&#x4E2D;&#xFF0C;&#x914D;&#x7F6E;<code>precommit</code>&#xFF0C;&#x5177;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;lint&quot;: &quot;eslint --ext .js,.vue src test/unit test/e2e/specs&quot;,
  &quot;precommit&quot;: &quot;npm run lint&quot;,
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;scripts&quot;</span>: {
  <span class="hljs-string">&quot;lint&quot;</span>: <span class="hljs-string">&quot;eslint --ext .js,.vue src test/unit test/e2e/specs&quot;</span>,
  <span class="hljs-string">&quot;precommit&quot;</span>: <span class="hljs-string">&quot;npm run lint&quot;</span>,
},</code></pre><p>&#x914D;&#x7F6E;&#x597D;&#x540E;&#xFF0C;&#x6BCF;&#x6B21;<code>git commit -m</code>&#x63D0;&#x4EA4;&#x4F1A;&#x68C0;&#x67E5;&#x4EE3;&#x7801;&#x662F;&#x5426;&#x901A;&#x8FC7;<code>eslint</code>&#x6821;&#x9A8C;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x6821;&#x9A8C;&#x901A;&#x8FC7;&#x5219;&#x63D0;&#x4EA4;&#x5931;&#x8D25;&#x3002;&#x8FD8;&#x53EF;&#x4EE5;&#x914D;&#x7F6E;<code>prepush</code>&#x3002;<code>husky</code>&#x4E0D;&#x65AD;&#x5728;&#x66F4;&#x65B0;&#xFF0C;&#x73B0;&#x5728;&#x53EF;&#x80FD;&#x4E0E;&#x539F;&#x5148;&#x7684;&#x914D;&#x7F6E;&#x4E0D;&#x592A;&#x76F8;&#x540C;&#x4E86;&#xFF0C;&#x5177;&#x4F53;&#x67E5;&#x770B;<a href="https://github.com/typicode/husky" rel="nofollow noreferrer" target="_blank">husky github&#x4ED3;&#x5E93;</a>&#x3002;&#x539F;&#x7406;&#x5C31;&#x662F;<code>git-hooks</code>,<code>pre-commit</code>&#x7684;&#x94A9;&#x5B50;&#x3002;&#x5BF9;<code>shell</code>&#x811A;&#x672C;&#x719F;&#x6089;&#x7684;&#x540C;&#x5B66;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x5199;&#x4E00;&#x4EFD;<code>pre-commit</code>&#x3002;&#x590D;&#x5236;&#x5230;&#x9879;&#x76EE;&#x7684;<code>.git/hooks/pre-commit</code>&#x4E2D;&#x3002;&#x4E0D;&#x9700;&#x8981;&#x4F9D;&#x8D56;<code>husky</code>&#x5305;&#x3002;&#x6211;&#x53F8;&#x5C31;&#x662F;&#x7528;&#x7684;<code>shell</code>&#x811A;&#x672C;&#x3002;</p><p>&#x6700;&#x540E;&#x63D0;&#x4E00;&#x4E0B;<code>.babelrc</code>&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x3002;</p><h3 id="articleHeader10"><code>.babelrc</code> <code>babel</code>&#x76F8;&#x5173;&#x914D;&#x7F6E;</h3><p>&#x914D;&#x7F6E;&#x4E86;&#x4E00;&#x4E9B;&#x8F6C;&#x7801;&#x89C4;&#x5219;&#x3002;&#x8FD9;&#x91CC;&#x9644;&#x4E0A;&#x4E24;&#x4E2A;&#x94FE;&#x63A5;&#xFF1A;<a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank"><code>babel</code>&#x82F1;&#x6587;&#x5B98;&#x7F51;</a>&#x548C;<a href="https://babel.bootcss.com/" rel="nofollow noreferrer" target="_blank"><code>babel</code>&#x7684;&#x4E2D;&#x6587;&#x5B98;&#x7F51;</a>&#x3002;</p><p>&#x5177;&#x4F53;&#x770B;&#x6587;&#x4EF6;&#x4E2D;&#x7684;&#x914D;&#x7F6E;&#x6CE8;&#x91CA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  // presets&#x6307;&#x660E;&#x8F6C;&#x7801;&#x7684;&#x89C4;&#x5219;
  &quot;presets&quot;: [
    // env&#x9879;&#x662F;&#x501F;&#x52A9;&#x63D2;&#x4EF6;babel-preset-env&#xFF0C;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x8BF4;&#x7684;&#x662F;babel&#x5BF9;es6,es7,es8&#x8FDB;&#x884C;&#x8F6C;&#x7801;&#xFF0C;&#x5E76;&#x4E14;&#x8BBE;&#x7F6E;amd,commonjs&#x8FD9;&#x6837;&#x7684;&#x6A21;&#x5757;&#x5316;&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x8FDB;&#x884C;&#x8F6C;&#x7801;
    [&quot;env&quot;, {
      &quot;modules&quot;: false,
      &quot;targets&quot;: {
        &quot;browsers&quot;: [&quot;&gt; 1%&quot;, &quot;last 2 versions&quot;, &quot;not ie &lt;= 8&quot;]
      }
    }],
    &quot;stage-2&quot;
  ],
  // plugins &#x5C5E;&#x6027;&#x544A;&#x8BC9; Babel &#x8981;&#x4F7F;&#x7528;&#x54EA;&#x4E9B;&#x63D2;&#x4EF6;&#xFF0C;&#x63D2;&#x4EF6;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x5982;&#x4F55;&#x8F6C;&#x6362;&#x4EE3;&#x7801;&#x3002;
  // transform-vue-jsx &#x8868;&#x660E;&#x53EF;&#x4EE5;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;jsx&#x8BED;&#x6CD5;&#xFF0C;&#x4F1A;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x8F6C;&#x6362;
  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;, &quot;transform-runtime&quot;],
  // &#x5728;&#x7279;&#x5B9A;&#x7684;&#x73AF;&#x5883;&#x4E2D;&#x6240;&#x6267;&#x884C;&#x7684;&#x8F6C;&#x7801;&#x89C4;&#x5219;&#xFF0C;&#x5F53;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x662F;&#x4E0B;&#x9762;&#x7684;test&#x5C31;&#x4F1A;&#x8986;&#x76D6;&#x4E0A;&#x9762;&#x7684;&#x8BBE;&#x7F6E;
  &quot;env&quot;: {
    // test &#x662F;&#x63D0;&#x524D;&#x8BBE;&#x7F6E;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;BABEL_ENV&#x5219;&#x4F7F;&#x7528;NODE_ENV&#xFF0C;&#x5982;&#x679C;&#x90FD;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x5C31;&#x662F;development
    &quot;test&quot;: {
      &quot;presets&quot;: [&quot;env&quot;, &quot;stage-2&quot;],
      &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;, &quot;transform-es2015-modules-commonjs&quot;, &quot;dynamic-import-node&quot;]
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clojure"><code>{
  // presets&#x6307;&#x660E;&#x8F6C;&#x7801;&#x7684;&#x89C4;&#x5219;
  <span class="hljs-string">&quot;presets&quot;</span>: [
    // env&#x9879;&#x662F;&#x501F;&#x52A9;&#x63D2;&#x4EF6;babel-preset-env&#xFF0C;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x8BF4;&#x7684;&#x662F;babel&#x5BF9;es6,es7,es8&#x8FDB;&#x884C;&#x8F6C;&#x7801;&#xFF0C;&#x5E76;&#x4E14;&#x8BBE;&#x7F6E;amd,commonjs&#x8FD9;&#x6837;&#x7684;&#x6A21;&#x5757;&#x5316;&#x6587;&#x4EF6;&#xFF0C;&#x4E0D;&#x8FDB;&#x884C;&#x8F6C;&#x7801;
    [<span class="hljs-string">&quot;env&quot;</span>, {
      <span class="hljs-string">&quot;modules&quot;</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-string">&quot;targets&quot;</span>: {
        <span class="hljs-string">&quot;browsers&quot;</span>: [<span class="hljs-string">&quot;&gt; 1%&quot;</span>, <span class="hljs-string">&quot;last 2 versions&quot;</span>, <span class="hljs-string">&quot;not ie &lt;= 8&quot;</span>]
      }
    }],
    <span class="hljs-string">&quot;stage-2&quot;</span>
  ],
  // plugins &#x5C5E;&#x6027;&#x544A;&#x8BC9; Babel &#x8981;&#x4F7F;&#x7528;&#x54EA;&#x4E9B;&#x63D2;&#x4EF6;&#xFF0C;&#x63D2;&#x4EF6;&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x5982;&#x4F55;&#x8F6C;&#x6362;&#x4EE3;&#x7801;&#x3002;
  // transform-vue-jsx &#x8868;&#x660E;&#x53EF;&#x4EE5;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;jsx&#x8BED;&#x6CD5;&#xFF0C;&#x4F1A;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x8F6C;&#x6362;
  <span class="hljs-string">&quot;plugins&quot;</span>: [<span class="hljs-string">&quot;transform-vue-jsx&quot;</span>, <span class="hljs-string">&quot;transform-runtime&quot;</span>],
  // &#x5728;&#x7279;&#x5B9A;&#x7684;&#x73AF;&#x5883;&#x4E2D;&#x6240;&#x6267;&#x884C;&#x7684;&#x8F6C;&#x7801;&#x89C4;&#x5219;&#xFF0C;&#x5F53;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x662F;&#x4E0B;&#x9762;&#x7684;test&#x5C31;&#x4F1A;&#x8986;&#x76D6;&#x4E0A;&#x9762;&#x7684;&#x8BBE;&#x7F6E;
  <span class="hljs-string">&quot;env&quot;</span>: {
    // test &#x662F;&#x63D0;&#x524D;&#x8BBE;&#x7F6E;&#x7684;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;BABEL_ENV&#x5219;&#x4F7F;&#x7528;NODE_ENV&#xFF0C;&#x5982;&#x679C;&#x90FD;&#x6CA1;&#x6709;&#x8BBE;&#x7F6E;&#x9ED8;&#x8BA4;&#x5C31;&#x662F;development
    <span class="hljs-string">&quot;test&quot;</span>: {
      <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;env&quot;</span>, <span class="hljs-string">&quot;stage-2&quot;</span>],
      <span class="hljs-string">&quot;plugins&quot;</span>: [<span class="hljs-string">&quot;transform-vue-jsx&quot;</span>, <span class="hljs-string">&quot;transform-es2015-modules-commonjs&quot;</span>, <span class="hljs-string">&quot;dynamic-import-node&quot;</span>]
    }
  }
}</code></pre><p>&#x6587;&#x4EF6;&#x4E2D;<code>presets</code>&#x4E2D;&#x6709;&#x914D;&#x7F6E;<code>env</code>&#x548C;<code>stage-2</code>&#xFF0C;&#x53EF;&#x80FD;&#x4E0D;&#x77E5;&#x9053;&#x662F;&#x4EC0;&#x4E48;&#x3002;&#x8FD9;&#x91CC;&#x5F15;&#x7528;<a href="http://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-1%E4%BD%BF%E7%94%A8ES6%E8%AF%AD%E8%A8%80.html" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;&#x6D45;&#x51FA;webpack</a>&#x4E66;&#x4E2D;&#xFF0C;&#x7B2C;&#x4E09;&#x7AE0;&#xFF0C;<code>3-1</code>&#x4F7F;&#x7528;<code>ES6</code>&#x8BED;&#x8A00; &#x5C0F;&#x8282;&#x7684;&#x4E00;&#x6BB5;&#xFF0C;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#x3002;</p><blockquote><code>presets</code> &#x5C5E;&#x6027;&#x544A;&#x8BC9; <code>Babel</code> &#x8981;&#x8F6C;&#x6362;&#x7684;&#x6E90;&#x7801;&#x4F7F;&#x7528;&#x4E86;&#x54EA;&#x4E9B;&#x65B0;&#x7684;&#x8BED;&#x6CD5;&#x7279;&#x6027;&#xFF0C;&#x4E00;&#x4E2A; Presets &#x5BF9;&#x4E00;&#x7EC4;&#x65B0;&#x8BED;&#x6CD5;&#x7279;&#x6027;&#x63D0;&#x4F9B;&#x652F;&#x6301;&#xFF0C;&#x591A;&#x4E2A; <code>Presets</code> &#x53EF;&#x4EE5;&#x53E0;&#x52A0;&#x3002; <code>Presets</code> &#x5176;&#x5B9E;&#x662F;&#x4E00;&#x7EC4; <code>Plugins</code> &#x7684;&#x96C6;&#x5408;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A; <code>Plugin</code> &#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x8BED;&#x6CD5;&#x7684;&#x8F6C;&#x6362;&#x5DE5;&#x4F5C;&#x3002;<code>Presets</code> &#x662F;&#x6309;&#x7167; <code>ECMAScript</code> &#x8349;&#x6848;&#x6765;&#x7EC4;&#x7EC7;&#x7684;&#xFF0C;&#x901A;&#x5E38;&#x53EF;&#x4EE5;&#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x4E09;&#x5927;&#x7C7B;&#xFF08;&#x4E66;&#x4E2D;&#x5C31;&#x662F;&#x8BF4;&#x4E09;&#x5927;&#x7C7B;&#xFF0C;&#x6211;&#x53D1;&#x73B0;&#x5C31;&#x4E24;&#x70B9;~~~&#xFF09;&#xFF1A;<br>1&#x3001;&#x5DF2;&#x7ECF;&#x88AB;&#x5199;&#x5165; ECMAScript &#x6807;&#x51C6;&#x91CC;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x7531;&#x4E8E;&#x4E4B;&#x524D;&#x6BCF;&#x5E74;&#x90FD;&#x6709;&#x65B0;&#x7279;&#x6027;&#x88AB;&#x52A0;&#x5165;&#x5230;&#x6807;&#x51C6;&#x91CC;&#xFF0C;&#x6240;&#x4EE5;&#x53C8;&#x53EF;&#x7EC6;&#x5206;&#x4E3A;&#xFF1A;<br>es2015 &#x5305;&#x542B;&#x5728;2015&#x91CC;&#x52A0;&#x5165;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF1B;<br>es2016 &#x5305;&#x542B;&#x5728;2016&#x91CC;&#x52A0;&#x5165;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF1B;<br>es2017 &#x5305;&#x542B;&#x5728;2017&#x91CC;&#x52A0;&#x5165;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF1B;<br>es2017 &#x5305;&#x542B;&#x5728;2017&#x91CC;&#x52A0;&#x5165;&#x7684;&#x65B0;&#x7279;&#x6027;&#xFF1B;<br>env &#x5305;&#x542B;&#x5F53;&#x524D;&#x6240;&#x6709; ECMAScript &#x6807;&#x51C6;&#x91CC;&#x7684;&#x6700;&#x65B0;&#x7279;&#x6027;&#x3002;<br>2&#x3001;&#x88AB;&#x793E;&#x533A;&#x63D0;&#x51FA;&#x6765;&#x7684;&#x4F46;&#x8FD8;&#x672A;&#x88AB;&#x5199;&#x5165; <code>ECMAScript</code> &#x6807;&#x51C6;&#x91CC;&#x7279;&#x6027;&#xFF0C;&#x8FD9;&#x5176;&#x4E2D;&#x53C8;&#x5206;&#x4E3A;&#x4EE5;&#x4E0B;&#x56DB;&#x79CD;&#xFF1A;<br><code>stage0</code> &#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7F8E;&#x597D;&#x6FC0;&#x8FDB;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x6709; <code>Babel</code> &#x63D2;&#x4EF6;&#x5B9E;&#x73B0;&#x4E86;&#x5BF9;&#x8FD9;&#x4E9B;&#x7279;&#x6027;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x786E;&#x5B9A;&#x662F;&#x5426;&#x4F1A;&#x88AB;&#x5B9A;&#x4E3A;&#x6807;&#x51C6;&#xFF1B;<br><code>stage1</code> &#x503C;&#x5F97;&#x88AB;&#x7EB3;&#x5165;&#x6807;&#x51C6;&#x7684;&#x7279;&#x6027;&#xFF1B;<br><code>stage2</code> &#x8BE5;&#x7279;&#x6027;&#x89C4;&#x8303;&#x5DF2;&#x7ECF;&#x88AB;&#x8D77;&#x8349;&#xFF0C;&#x5C06;&#x4F1A;&#x88AB;&#x7EB3;&#x5165;&#x6807;&#x51C6;&#x91CC;&#xFF1B;<br><code>stage3</code> &#x8BE5;&#x7279;&#x6027;&#x89C4;&#x8303;&#x5DF2;&#x7ECF;&#x5B9A;&#x7A3F;&#xFF0C;&#x5404;&#x5927;&#x6D4F;&#x89C8;&#x5668;&#x5382;&#x5546;&#x548C; `` &#x793E;&#x533A;&#x5F00;&#x59CB;&#x7740;&#x624B;&#x5B9E;&#x73B0;&#xFF1B;<br><code>stage4</code> &#x5728;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x4E00;&#x5E74;&#x5C06;&#x4F1A;&#x52A0;&#x5165;&#x5230;&#x6807;&#x51C6;&#x91CC;&#x53BB;&#x3002;</blockquote><p>&#x81F3;&#x6B64;&#xFF0C;&#x5C31;&#x7B97;&#x76F8;&#x5BF9;&#x5B8C;&#x6574;&#x7684;&#x5206;&#x6790;&#x5B8C;&#x4E86;<code>Vue-cli</code>(&#x7248;&#x672C;<code>v2.9.3</code>)&#x642D;&#x5EFA;&#x7684;<code>webpack</code>&#x9879;&#x76EE;&#x5DE5;&#x7A0B;&#x3002;&#x5E0C;&#x671B;&#x5BF9;&#x5927;&#x5BB6;&#x6709;&#x6240;&#x5E2E;&#x52A9;&#x3002;<br><strong>&#x9879;&#x76EE;&#x653E;&#x5728;&#x7B14;&#x8005;&#x7684;<code>github</code>&#x4E0A;&#xFF0C;<a href="https://github.com/lxchuan12/analyse-vue-cli" rel="nofollow noreferrer" target="_blank">&#x5206;&#x6790;vue-cli@2.9.3 &#x642D;&#x5EFA;&#x7684;webpack&#x9879;&#x76EE;&#x5DE5;&#x7A0B;</a>&#x3002;&#x65B9;&#x4FBF;&#x5927;&#x5BB6;&#x514B;&#x9686;&#x4E0B;&#x8F7D;&#xFF0C;&#x6216;&#x8005;&#x5728;&#x7EBF;&#x67E5;&#x770B;&#x3002;&#x540C;&#x65F6;&#x4E5F;&#x6C42;&#x4E2A;<code>star</code> <code>^_^</code>&#xFF0C;&#x4E5F;&#x662F;&#x5BF9;&#x7B14;&#x8005;&#x7684;&#x4E00;&#x79CD;&#x9F13;&#x52B1;&#x548C;&#x652F;&#x6301;&#x3002;</strong><br>&#x7B14;&#x8005;&#x77E5;&#x8BC6;&#x80FD;&#x529B;&#x6709;&#x9650;&#xFF0C;&#x6587;&#x7AE0;&#x6709;&#x4EC0;&#x4E48;&#x4E0D;&#x59A5;&#x4E4B;&#x5904;&#xFF0C;&#x6B22;&#x8FCE;&#x6307;&#x51FA;~</p><h3 id="articleHeader11">&#x5173;&#x4E8E;</h3><p>&#x4F5C;&#x8005;&#xFF1A;&#x5E38;&#x4EE5;<strong>&#x8F69;&#x8F95;Rowboat</strong>&#x4E3A;&#x540D;&#x6DF7;&#x8FF9;&#x4E8E;&#x6C5F;&#x6E56;&#x3002;&#x524D;&#x7AEF;&#x8DEF;&#x4E0A; | PPT&#x7231;&#x597D;&#x8005; | &#x6240;&#x77E5;&#x751A;&#x5C11;&#xFF0C;&#x552F;&#x5584;&#x5B66;&#x3002;<br><a href="https://lxchuan12.github.io/" rel="nofollow noreferrer" target="_blank">&#x4E2A;&#x4EBA;&#x535A;&#x5BA2;</a><br><a href="https://segmentfault.com/u/lxchuan12">segmentfault&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;</a><br><a href="https://juejin.im/user/57974dc55bbb500063f522fd/posts" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;</a><br><a href="https://www.zhihu.com/people/lxchuan12/activities" rel="nofollow noreferrer" target="_blank">&#x77E5;&#x4E4E;</a><br><a href="https://github.com/lxchuan12" rel="nofollow noreferrer" target="_blank">github</a></p><h3 id="articleHeader12">&#x5C0F;&#x7ED3;</h3><p>1&#x3001;&#x5206;&#x6790;&#x8FD9;&#x4E9B;&#xFF0C;&#x9010;&#x884C;&#x6CE8;&#x91CA;&#xFF0C;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x65F6;&#x95F4;&#x7684;&#x3002;&#x5176;&#x4E2D;&#x6709;&#x4E9B;&#x4E0D;&#x662F;&#x5F88;&#x660E;&#x767D;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x53CA;&#x65F6;&#x67E5;&#x9605;&#x76F8;&#x5E94;&#x7684;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x548C;&#x63D2;&#x4EF6;&#x6587;&#x6863;&#xFF08;&#x5EFA;&#x8BAE;&#x770B;&#x82F1;&#x6587;&#x6587;&#x6863;&#x548C;&#x6700;&#x65B0;&#x7684;&#x6587;&#x6863;&#xFF09;&#xFF0C;&#x4E0D;&#x8FC7;&#x6587;&#x6863;&#x6CA1;&#x5199;&#x660E;&#x767D;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x53EF;&#x4EE5;&#x591A;&#x641C;&#x7D22;&#x4E00;&#x4E9B;&#x522B;&#x4EBA;&#x7684;&#x535A;&#x5BA2;&#x6587;&#x7AE0;&#xFF0C;&#x76F8;&#x5BF9;&#x6BD4;&#x8F83;&#x6E05;&#x6670;&#x660E;&#x4E86;&#x3002;<br>2&#x3001;&#x524D;&#x7AEF;&#x53D1;&#x5C55;&#x592A;&#x5FEB;&#xFF0C;&#x8FD9;&#x4E2A;<code>Vue-cli@2.9.3</code> <code>webpack</code>&#x7248;&#x672C;&#x8FD8;&#x662F;<code>v3.x</code>&#xFF0C;webpack&#x73B0;&#x5728;&#x5B98;&#x65B9;&#x7248;&#x672C;&#x5DF2;&#x7ECF;&#x662F;<code>v4.12.0</code>&#xFF0C;&#x76F8;&#x4FE1;&#x4E0D;&#x4E45;&#x540E;&#xFF0C;<code>Vue-cli</code>&#x4E5F;&#x5C06;&#x53D1;&#x5E03;&#x652F;&#x6301;<code>webpack v4.x</code>&#x7684;&#x7248;&#x672C;&#xFF0C;<code>v3.0.0</code>&#x5DF2;&#x7ECF;&#x662F;<code>beta.16</code>&#x4E86;&#x3002;<br>3&#x3001;&#x540E;&#x7EED;&#x6709;&#x4F59;&#x529B;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x7EE7;&#x7EED;&#x5206;&#x6790;&#x65B0;&#x7248;&#x7684;<code>vue-cli</code>&#x6784;&#x5EFA;&#x7684;<code>webpack</code>&#x9879;&#x76EE;&#x5DE5;&#x7A0B;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
分析vue-cli@2.9.3 搭建的webpack项目工程

## 原文链接
[https://segmentfault.com/a/1190000015252698](https://segmentfault.com/a/1190000015252698)


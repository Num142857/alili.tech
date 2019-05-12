---
title: 'Node.js process模块解读' 
date: 2018-11-29 9:33:05
hidden: true
slug: k9srnmbz8k
categories: [reprint]
---

{{< raw >}}

                    
<p>process&#x5B58;&#x5728;&#x4E8E;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E0A;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x4F7F;&#x7528;require()&#x52A0;&#x8F7D;&#x5373;&#x53EF;&#x4F7F;&#x7528;&#xFF0C;process&#x6A21;&#x5757;&#x4E3B;&#x8981;&#x505A;&#x4E24;&#x65B9;&#x9762;&#x7684;&#x4E8B;&#x60C5;</p>
<ul>
<li>&#x8BFB;&#xFF1A;&#x83B7;&#x53D6;&#x8FDB;&#x7A0B;&#x4FE1;&#x606F;&#xFF08;&#x8D44;&#x6E90;&#x4F7F;&#x7528;&#x3001;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x3001;&#x8FD0;&#x884C;&#x72B6;&#x6001;&#xFF09;</li>
<li>&#x5199;&#xFF1A;&#x6267;&#x884C;&#x8FDB;&#x7A0B;&#x64CD;&#x4F5C;&#xFF08;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x3001;&#x8C03;&#x5EA6;&#x4EFB;&#x52A1;&#x3001;&#x53D1;&#x51FA;&#x8B66;&#x544A;&#xFF09;</li>
</ul>
<h3 id="articleHeader0">&#x8D44;&#x6E90;&#x4F7F;&#x7528;</h3>
<p>&#x8D44;&#x6E90;&#x4F7F;&#x7528;&#x6307;&#x8FD0;&#x884C;&#x6B64;&#x8FDB;&#x7A0B;&#x6240;&#x6D88;&#x8017;&#x7684;&#x673A;&#x5668;&#x8D44;&#x6E90;&#x3002;&#x4F8B;&#x5982;&#x5185;&#x5B58;&#x3001;cpu</p>
<h4>&#x5185;&#x5B58;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.memoryUsage())

{ rss: 21848064,
  heapTotal: 7159808,
  heapUsed: 4431688,
  external: 8224 
 }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.memoryUsage</span>())

{ <span class="hljs-attribute">rss</span>: <span class="hljs-number">21848064</span>,
  heapTotal: <span class="hljs-number">7159808</span>,
  heapUsed: <span class="hljs-number">4431688</span>,
  external: <span class="hljs-number">8224</span> 
 }</code></pre>
<p>rss(&#x5E38;&#x9A7B;&#x5185;&#x5B58;)&#x7684;&#x7EC4;&#x6210;&#x89C1;&#x4E0B;&#x56FE;<br><span class="img-wrap"><img data-src="/img/bVbbxKL?w=768&amp;h=432" src="https://static.alili.tech/img/bVbbxKL?w=768&amp;h=432" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer;"></span></p>
<p>code segment&#x5BF9;&#x5E94;&#x5F53;&#x524D;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;</p>
<p>external&#x5BF9;&#x5E94;&#x7684;&#x662F;C++&#x5BF9;&#x8C61;&#xFF08;&#x4E0E;V8&#x7BA1;&#x7406;&#x7684;JS&#x5BF9;&#x8C61;&#x7ED1;&#x5B9A;&#xFF09;&#x7684;&#x5360;&#x7528;&#x7684;&#x5185;&#x5B58;&#xFF0C;&#x6BD4;&#x5982;Buffer&#x7684;&#x4F7F;&#x7528;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Buffer.allocUnsafe(1024 * 1024 * 1000);
console.log(process.memoryUsage());

{ rss: 22052864,
  heapTotal: 6635520,
  heapUsed: 4161376,
  external: 1048584224 }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Buffer</span><span class="hljs-selector-class">.allocUnsafe</span>(1024 * 1024 * 1000);
<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.memoryUsage</span>());

{ <span class="hljs-attribute">rss</span>: <span class="hljs-number">22052864</span>,
  heapTotal: <span class="hljs-number">6635520</span>,
  heapUsed: <span class="hljs-number">4161376</span>,
  external: <span class="hljs-number">1048584224</span> }</code></pre>
<h4>cpu</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const startUsage = process.cpuUsage();
console.log(startUsage);

const now = Date.now();
while (Date.now() - now &lt; 500);

console.log(process.cpuUsage());
console.log(process.cpuUsage(startUsage)); //&#x76F8;&#x5BF9;&#x65F6;&#x95F4;

// { user: 59459, system: 18966 }
// { user: 558135, system: 22312 }
// { user: 498432, system: 3333 }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> startUsage = process.cpuUsage();
<span class="hljs-built_in">console</span>.log(startUsage);

<span class="hljs-keyword">const</span> now = <span class="hljs-built_in">Date</span>.now();
<span class="hljs-keyword">while</span> (<span class="hljs-built_in">Date</span>.now() - now &lt; <span class="hljs-number">500</span>);

<span class="hljs-built_in">console</span>.log(process.cpuUsage());
<span class="hljs-built_in">console</span>.log(process.cpuUsage(startUsage)); <span class="hljs-comment">//&#x76F8;&#x5BF9;&#x65F6;&#x95F4;</span>

<span class="hljs-comment">// { user: 59459, system: 18966 }</span>
<span class="hljs-comment">// { user: 558135, system: 22312 }</span>
<span class="hljs-comment">// { user: 498432, system: 3333 }</span></code></pre>
<p>user&#x5BF9;&#x5E94;&#x7528;&#x6237;&#x65F6;&#x95F4;&#xFF0C;system&#x4EE3;&#x8868;&#x7CFB;&#x7EDF;&#x65F6;&#x95F4;</p>
<h3 id="articleHeader1">&#x8FD0;&#x884C;&#x73AF;&#x5883;</h3>
<p>&#x8FD0;&#x884C;&#x73AF;&#x5883;&#x6307;&#x6B64;&#x8FDB;&#x7A0B;&#x8FD0;&#x884C;&#x7684;&#x5BBF;&#x4E3B;&#x73AF;&#x5883;&#x5305;&#x62EC;&#x8FD0;&#x884C;&#x76EE;&#x5F55;&#x3001;node&#x73AF;&#x5883;&#x3001;CPU&#x67B6;&#x6784;&#x3001;&#x7528;&#x6237;&#x73AF;&#x5883;&#x3001;&#x7CFB;&#x7EDF;&#x5E73;&#x53F0;</p>
<h4>&#x8FD0;&#x884C;&#x76EE;&#x5F55;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(`Current directory: ${process.cwd()}`);

// Current directory: /Users/xxxx/workspace/learn/node-basic/process" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs awk"><code>console.log(`Current directory: <span class="hljs-variable">${process.cwd()}</span>`);

<span class="hljs-regexp">//</span> Current directory: <span class="hljs-regexp">/Users/</span>xxxx<span class="hljs-regexp">/workspace/</span>learn<span class="hljs-regexp">/node-basic/</span>process</code></pre>
<h4>node&#x73AF;&#x5883;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.version)

// v9.1.0" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">process</span>.<span class="hljs-built_in">version</span>)
<span class="hljs-comment">
// v9.1.0</span></code></pre>
<p>&#x5982;&#x679C;&#x4E0D;&#x4EC5;&#x4EC5;&#x5E0C;&#x671B;&#x83B7;&#x5F97;node&#x7684;&#x7248;&#x672C;&#x4FE1;&#x606F;&#xFF0C;&#x8FD8;&#x5E0C;&#x671B;v8&#x3001;zlib&#x3001;libuv&#x7248;&#x672C;&#x7B49;&#x4FE1;&#x606F;&#x7684;&#x8BDD;&#x5C31;&#x9700;&#x8981;&#x4F7F;&#x7528;process.versions&#x4E86;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.versions);
{ http_parser: &apos;2.7.0&apos;,
  node: &apos;9.1.0&apos;,
  v8: &apos;6.2.414.32-node.8&apos;,
  uv: &apos;1.15.0&apos;,
  zlib: &apos;1.2.11&apos;,
  ares: &apos;1.13.0&apos;,
  modules: &apos;59&apos;,
  nghttp2: &apos;1.25.0&apos;,
  openssl: &apos;1.0.2m&apos;,
  icu: &apos;59.1&apos;,
  unicode: &apos;9.0&apos;,
  cldr: &apos;31.0.1&apos;,
  tz: &apos;2017b&apos; }" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(process.versions);
{ <span class="hljs-attribute">http_parser</span>: <span class="hljs-string">&apos;2.7.0&apos;</span>,
  <span class="hljs-attribute">node</span>: <span class="hljs-string">&apos;9.1.0&apos;</span>,
  <span class="hljs-attribute">v8</span>: <span class="hljs-string">&apos;6.2.414.32-node.8&apos;</span>,
  <span class="hljs-attribute">uv</span>: <span class="hljs-string">&apos;1.15.0&apos;</span>,
  <span class="hljs-attribute">zlib</span>: <span class="hljs-string">&apos;1.2.11&apos;</span>,
  <span class="hljs-attribute">ares</span>: <span class="hljs-string">&apos;1.13.0&apos;</span>,
  <span class="hljs-attribute">modules</span>: <span class="hljs-string">&apos;59&apos;</span>,
  <span class="hljs-attribute">nghttp2</span>: <span class="hljs-string">&apos;1.25.0&apos;</span>,
  <span class="hljs-attribute">openssl</span>: <span class="hljs-string">&apos;1.0.2m&apos;</span>,
  <span class="hljs-attribute">icu</span>: <span class="hljs-string">&apos;59.1&apos;</span>,
  <span class="hljs-attribute">unicode</span>: <span class="hljs-string">&apos;9.0&apos;</span>,
  <span class="hljs-attribute">cldr</span>: <span class="hljs-string">&apos;31.0.1&apos;</span>,
  <span class="hljs-attribute">tz</span>: <span class="hljs-string">&apos;2017b&apos;</span> }</code></pre>
<h4>cpu&#x67B6;&#x6784;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(`This processor architecture is ${process.arch}`);

// This processor architecture is x64" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">`This processor architecture is <span class="hljs-subst">${process.arch}</span>`</span>);

<span class="hljs-comment">// This processor architecture is x64</span></code></pre>
<p>&#x652F;&#x6301;&#x7684;&#x503C;&#x5305;&#x62EC;&#xFF1A;<code>&apos;arm&apos;</code>, <code>&apos;arm64&apos;</code>, <code>&apos;ia32&apos;</code>, <code>&apos;mips&apos;</code>, <code>&apos;mipsel&apos;</code>, <code>&apos;ppc&apos;</code>, <code>&apos;ppc64&apos;</code>, <code>&apos;s390&apos;</code>, <code>&apos;s390x&apos;</code>, <code>&apos;x32&apos;</code> <code>&apos;x64&apos;</code></p>
<h4>&#x7528;&#x6237;&#x73AF;&#x5883;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.env.NODE_ENV); // dev

NODE_ENV=dev node b.js
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs crmsh"><code>console.log(process.env.NODE_ENV); // dev

<span class="hljs-attr">NODE_ENV=</span>dev <span class="hljs-keyword">node</span> <span class="hljs-title">b</span>.js
</code></pre>
<p>&#x9664;&#x4E86;&#x542F;&#x52A8;&#x65F6;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x4FE1;&#x606F;&#x4E4B;&#x5916;&#xFF0C;process.env&#x8FD8;&#x53EF;&#x4EE5;&#x83B7;&#x5F97;&#x5176;&#x4ED6;&#x7684;&#x7528;&#x6237;&#x73AF;&#x5883;&#x4FE1;&#x606F;&#xFF08;&#x6BD4;&#x5982;PATH&#x3001;SHELL&#x3001;HOME&#x7B49;&#xFF09;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x6253;&#x5370;&#x4E00;&#x4E0B;&#x8BD5;&#x8BD5;</p>
<h4>&#x7CFB;&#x7EDF;&#x5E73;&#x53F0;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(`This platform is ${process.platform}`);

This platform is darwin" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs delphi"><code>console.log(`This <span class="hljs-keyword">platform</span> <span class="hljs-keyword">is</span> $<span class="hljs-comment">{process.platform}</span>`);

This <span class="hljs-keyword">platform</span> <span class="hljs-keyword">is</span> darwin</code></pre>
<p>&#x652F;&#x6301;&#x7684;&#x7CFB;&#x7EDF;&#x5E73;&#x53F0;&#x5305;&#x62EC;&#xFF1A;<code>&apos;aix&apos;</code> <code>&apos;darwin&apos;</code> <code>&apos;freebsd&apos;</code> <code>&apos;linux&apos;</code> <code>&apos;openbsd&apos;</code> <code>&apos;sunos&apos;</code> <code>&apos;win32&apos;</code></p>
<p>android&#x76EE;&#x524D;&#x8FD8;&#x5904;&#x4E8E;&#x8BD5;&#x9A8C;&#x9636;&#x6BB5;</p>
<h3 id="articleHeader2">&#x8FD0;&#x884C;&#x72B6;&#x6001;</h3>
<p>&#x8FD0;&#x884C;&#x72B6;&#x6001;&#x6307;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x7684;&#x8FD0;&#x884C;&#x76F8;&#x5173;&#x7684;&#x4FE1;&#x606F;&#x5305;&#x62EC;&#x542F;&#x52A8;&#x53C2;&#x6570;&#x3001;&#x6267;&#x884C;&#x76EE;&#x5F55;&#x3001;&#x4E3B;&#x6587;&#x4EF6;&#x3001;PID&#x4FE1;&#x606F;&#x3001;&#x8FD0;&#x884C;&#x65F6;&#x95F4;</p>
<h4>&#x542F;&#x52A8;&#x53C2;&#x6570;</h4>
<p>&#x83B7;&#x53D6;&#x542F;&#x52A8;&#x53C2;&#x6570;&#x6709;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;execArgv&#x83B7;&#x53D6;Node.js&#x7684;&#x547D;&#x4EE4;&#x884C;&#x9009;&#x9879;&#xFF08;&#x89C1;<a href="https://nodejs.org/api/cli.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x7F51;&#x6587;&#x6863;</a>&#xFF09;</p>
<p>argv&#x83B7;&#x53D6;&#x975E;&#x547D;&#x4EE4;&#x884C;&#x9009;&#x9879;&#x7684;&#x4FE1;&#x606F;&#xFF0C;argv0&#x5219;&#x83B7;&#x53D6;argv[0]&#x7684;&#x503C;&#xFF08;&#x7565;&#x6709;&#x5DEE;&#x5F02;)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.argv)
console.log(process.argv0)
console.log(process.execArgv)

node --harmony  b.js foo=bar --version

// &#x8F93;&#x51FA;&#x7ED3;&#x679C;
[ &apos;/Users/xiji/.nvm/versions/node/v9.1.0/bin/node&apos;,
  &apos;/Users/xiji/workspace/learn/node-basic/process/b.js&apos;,
  &apos;foo=bar&apos;,
  &apos;--version&apos; ]
node
[ &apos;--harmony&apos; ]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs crmsh"><code>console.log(process.argv)
console.log(process.argv0)
console.log(process.execArgv)

<span class="hljs-keyword">node</span> <span class="hljs-title">--harmony</span>  b.js <span class="hljs-attr">foo=</span>bar --<span class="hljs-keyword">version</span>

// &#x8F93;&#x51FA;&#x7ED3;&#x679C;
[ &apos;/Users/xiji/.nvm/versions/<span class="hljs-keyword">node</span><span class="hljs-title">/v9</span>.<span class="hljs-number">1.0</span>/bin/<span class="hljs-keyword">node</span><span class="hljs-title">&apos;,
  &apos;/Users</span>/xiji/workspace/learn/<span class="hljs-keyword">node</span><span class="hljs-title">-basic</span>/process/b.js&apos;,
  &apos;<span class="hljs-attr">foo=</span>bar&apos;,
  &apos;--<span class="hljs-keyword">version</span>&apos; ]
<span class="hljs-keyword">node</span>
<span class="hljs-title">[ &apos;--harmony</span>&apos; ]</code></pre>
<h4>&#x6267;&#x884C;&#x76EE;&#x5F55;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(process.execPath);

// /Users/xxxx/.nvm/versions/node/v9.1.0/bin/node" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs crmsh"><code>console.log(process.execPath);

// /Users/xxxx/.nvm/versions/<span class="hljs-keyword">node</span><span class="hljs-title">/v9</span>.<span class="hljs-number">1.0</span>/bin/<span class="hljs-keyword">node</span></code><span class="hljs-title"></span></pre>
<h4>&#x8FD0;&#x884C;&#x65F6;&#x95F4;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();
while(new Date() - date &lt; 500) {}
console.log(process.uptime()); // 0.569" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">date</span> = <span class="hljs-literal">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">while</span>(<span class="hljs-literal">new</span> <span class="hljs-built_in">Date</span>() - <span class="hljs-built_in">date</span> &lt; <span class="hljs-number">500</span>) {}
console.<span class="hljs-keyword">log</span>(process.uptime()); <span class="hljs-comment">// 0.569</span></code></pre>
<h4>&#x4E3B;&#x6587;&#x4EF6;</h4>
<p>&#x9664;&#x4E86;require.main&#x4E4B;&#x5916;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;process.mainModule&#x6765;&#x5224;&#x65AD;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x662F;&#x5426;&#x662F;&#x4E3B;&#x6587;&#x4EF6;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a.js
console.log(`module A: ${process.mainModule === module}`);

//b.js
require(&apos;./a&apos;);
console.log(`module B: ${process.mainModule === module}`);

node b.js
// &#x8F93;&#x51FA;
module A: false
module B: true" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//a.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`module A: <span class="hljs-subst">${process.mainModule === <span class="hljs-built_in">module</span>}</span>`</span>);

<span class="hljs-comment">//b.js</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./a&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">`module B: <span class="hljs-subst">${process.mainModule === <span class="hljs-built_in">module</span>}</span>`</span>);

node b.js
<span class="hljs-comment">// &#x8F93;&#x51FA;</span>
<span class="hljs-built_in">module</span> A: <span class="hljs-literal">false</span>
<span class="hljs-built_in">module</span> B: <span class="hljs-literal">true</span></code></pre>
<p>PID&#x4FE1;&#x606F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(`This process is pid ${process.pid}`); //This process is pid 12554" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-string">`This process is pid <span class="hljs-subst">${process.pid}</span>`</span>); <span class="hljs-comment">//This process is pid 12554</span></code></pre>
<h3 id="articleHeader3">&#x76D1;&#x542C;&#x4E8B;&#x4EF6;</h3>
<p>process&#x662F;EventEmiiter&#x7684;&#x5B9E;&#x4F8B;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;process.on(&apos;eventName&apos;, () =&gt; {})&#x6765;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x3002;<br>&#x5E38;&#x7528;&#x7684;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;&#x5206;&#x4E24;&#x79CD;&#xFF1A;</p>
<ul>
<li>&#x8FDB;&#x7A0B;&#x72B6;&#x6001; &#x6BD4;&#x5982;&#xFF1A;beforeExit&#x3001;exit&#x3001;uncaughtException&#x3001;message</li>
<li>&#x4FE1;&#x53F7;&#x4E8B;&#x4EF6; &#x6BD4;&#x5982;&#xFF1A;SIGTERM&#x3001;SIGKILL&#x3001;SIGUSR1</li>
</ul>
<p>beforeExit&#x4E0E;exit&#x7684;&#x533A;&#x522B;&#x6709;&#x4E24;&#x65B9;&#x9762;&#xFF1A;</p>
<ul>
<li>beforeExit&#x91CC;&#x9762;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x3001;exit&#x53EA;&#x80FD;&#x662F;&#x540C;&#x6B65;&#x4EE3;&#x7801;</li>
<li>&#x624B;&#x52A8;&#x8C03;&#x7528;process.exit()&#x6216;&#x8005;&#x89E6;&#x53D1;uncaptException&#x5BFC;&#x81F4;&#x8FDB;&#x7A0B;&#x9000;&#x51FA;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;beforeExit&#x4E8B;&#x4EF6;&#x3001;exit&#x4E8B;&#x4EF6;&#x4F1A;&#x89E6;&#x53D1;&#x3002;</li>
</ul>
<p>&#x56E0;&#x6B64;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;console&#x90FD;&#x4E0D;&#x4F1A;&#x88AB;&#x6267;&#x884C;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.on(&apos;beforeExit&apos;, function(code) {
  console.log(&apos;before exit: &apos;+ code);
});
process.on(&apos;exit&apos;, function(code) {
  setTimeout(function() {
    console.log(&apos;exit: &apos; + code);
  }, 0);
});
a.b();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>process.on(<span class="hljs-string">&apos;beforeExit&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;before exit: &apos;</span>+ code);
});
process.on(<span class="hljs-string">&apos;exit&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">code</span>) </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;exit: &apos;</span> + code);
  }, <span class="hljs-number">0</span>);
});
a.b();</code></pre>
<p>&#x5F53;&#x5F02;&#x5E38;&#x4E00;&#x76F4;&#x6CA1;&#x6709;&#x88AB;&#x6355;&#x83B7;&#x5904;&#x7406;&#x7684;&#x8BDD;&#xFF0C;&#x6700;&#x540E;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;&apos;uncaughtException&apos;&#x4E8B;&#x4EF6;&#x3002;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;Node.js&#x4F1A;&#x6253;&#x5370;&#x5806;&#x6808;&#x4FE1;&#x606F;&#x5230;stderr&#x7136;&#x540E;&#x9000;&#x51FA;&#x8FDB;&#x7A0B;&#x3002;&#x4E0D;&#x8981;&#x8BD5;&#x56FE;&#x963B;&#x6B62;uncaughtException&#x9000;&#x51FA;&#x8FDB;&#x7A0B;&#xFF0C;&#x56E0;&#x6B64;&#x6B64;&#x65F6;&#x7A0B;&#x5E8F;&#x7684;&#x72B6;&#x6001;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x4E0D;&#x7A33;&#x5B9A;&#x4E86;&#xFF0C;&#x5EFA;&#x8BAE;&#x7684;&#x65B9;&#x5F0F;&#x662F;&#x53CA;&#x65F6;&#x6355;&#x83B7;&#x5904;&#x7406;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x9519;&#x8BEF;&#xFF0C;uncaughtException&#x91CC;&#x9762;&#x53EA;&#x505A;&#x4E00;&#x4E9B;&#x6E05;&#x7406;&#x5DE5;&#x4F5C;&#x3002;</p>
<p><strong>&#x6CE8;&#x610F;&#xFF1A;node&#x7684;9.3&#x7248;&#x672C;&#x589E;&#x52A0;&#x4E86;process.setUncaughtExceptionCaptureCallback&#x65B9;&#x6CD5;</strong> </p>
<p>&#x5F53;process.setUncaughtExceptionCaptureCallback(fn)&#x6307;&#x5B9A;&#x4E86;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x7684;&#x65F6;&#x5019;&#xFF0C;uncaughtException&#x4E8B;&#x4EF6;&#x5C06;&#x4F1A;&#x4E0D;&#x518D;&#x88AB;&#x89E6;&#x53D1;&#x3002;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.on(&apos;uncaughtException&apos;, function() {
  console.log(&apos;uncaught listener&apos;);
});

process.setUncaughtExceptionCaptureCallback(function() {
  console.log(&apos;uncaught fn&apos;);
});

a.b();
// uncaught fn" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code>process.on(<span class="hljs-string">&apos;uncaughtException&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;uncaught listener&apos;</span>);
});

process.setUncaughtExceptionCaptureCallback(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;uncaught fn&apos;</span>);
});

a.b();
<span class="hljs-comment">// uncaught fn</span></code></pre>
<p>message&#x9002;&#x7528;&#x4E8E;&#x7236;&#x5B50;&#x8FDB;&#x7A0B;&#x4E4B;&#x95F4;&#x53D1;&#x9001;&#x6D88;&#x606F;&#xFF0C;&#x5173;&#x4E8E;&#x5982;&#x4F55;&#x521B;&#x5EFA;&#x7236;&#x5B50;&#x8FDB;&#x7A0B;&#x4F1A;&#x653E;&#x5728;child_process&#x6A21;&#x5757;&#x4E2D;&#x8FDB;&#x884C;&#x3002;</p>
<p>SIGTERM&#x4FE1;&#x53F7;&#x867D;&#x7136;&#x4E5F;&#x662F;&#x7528;&#x4E8E;&#x8BF7;&#x6C42;&#x7EC8;&#x6B62;Node.js&#x8FDB;&#x7A0B;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x4E0E;SIGKILL&#x6709;&#x6240;&#x4E0D;&#x540C;&#xFF0C;&#x8FDB;&#x7A0B;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x54CD;&#x5E94;&#x8FD8;&#x662F;&#x5FFD;&#x7565;&#x6B64;&#x4FE1;&#x53F7;&#x3002;<br>SIGTERM&#x4F1A;&#x4EE5;&#x4E00;&#x79CD;&#x53CB;&#x597D;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x7ED3;&#x675F;&#x8FDB;&#x7A0B;&#xFF0C;&#x5728;&#x8FDB;&#x7A0B;&#x7ED3;&#x675F;&#x4E4B;&#x524D;&#x5148;&#x91CA;&#x653E;&#x5DF2;&#x5206;&#x914D;&#x7684;&#x8D44;&#x6E90;&#xFF08;&#x6BD4;&#x5982;&#x6570;&#x636E;&#x5E93;&#x8FDE;&#x63A5;&#xFF09;&#xFF0C;&#x56E0;&#x6B64;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x88AB;&#x79F0;&#x4E3A;&#x4F18;&#x96C5;&#x5173;&#x95ED;(graceful shutdown)<br>&#x5177;&#x4F53;&#x7684;&#x6267;&#x884C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p>
<ul>
<li>&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x88AB;&#x901A;&#x77E5;&#x9700;&#x8981;&#x5173;&#x95ED;&#xFF08;&#x63A5;&#x6536;&#x5230;SIGTERM&#x4FE1;&#x53F7;&#xFF09;</li>
<li>&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x901A;&#x77E5;&#x8D1F;&#x8F7D;&#x5747;&#x8861;&#x4E0D;&#x518D;&#x63A5;&#x6536;&#x65B0;&#x7684;&#x8BF7;&#x6C42;</li>
<li>&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5B8C;&#x6210;&#x6B63;&#x5728;&#x8FDB;&#x884C;&#x4E2D;&#x7684;&#x8BF7;&#x6C42;</li>
<li>&#x91CA;&#x653E;&#x8D44;&#x6E90;&#xFF08;&#x4F8B;&#x5982;&#x6570;&#x636E;&#x5E93;&#x8FDE;&#x63A5;&#xFF09;</li>
<li>&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6B63;&#x5E38;&#x9000;&#x51FA;&#xFF0C;&#x9000;&#x51FA;&#x72B6;&#x6001;&#x7801;&#x4E3A;0</li>
</ul>
<p>SIGUSR1<br>Node.js&#x5F53;&#x63A5;&#x6536;&#x5230;SIGUSR1&#x4FE1;&#x53F7;&#x65F6;&#x4F1A;&#x542F;&#x52A8;&#x5185;&#x7F6E;&#x7684;&#x8C03;&#x8BD5;&#x5668;&#xFF0C;&#x5F53;&#x6267;&#x884C;&#x4E0B;&#x5217;&#x64CD;&#x4F5C;&#x65F6;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="kill -USR1 PID_OF_THE_NODE_JS_PROCESS" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">kill</span> -USR1 PID_OF_THE_NODE_JS_PROCESS</code></pre>
<p>&#x53EF;&#x4EE5;&#x770B;&#x5230;node.js&#x4F1A;&#x542F;&#x52A8;&#x8C03;&#x8BD5;&#x5668;&#x4EE3;&#x7406;&#xFF0C;&#x7AEF;&#x53E3;&#x662F;9229</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server is listening 8089
Debugger listening on ws://127.0.0.1:9229/7ef98ccb-02fa-451a-8954-4706bd74105f
For help, see: https://nodejs.org/en/docs/inspector" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs vim"><code>server <span class="hljs-keyword">is</span> listening <span class="hljs-number">8089</span>
Debugger listening <span class="hljs-keyword">on</span> <span class="hljs-keyword">w</span><span class="hljs-variable">s:</span>//<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">9229</span>/<span class="hljs-number">7</span>ef98ccb-<span class="hljs-number">02</span>fa-<span class="hljs-number">451</span><span class="hljs-keyword">a</span>-<span class="hljs-number">8954</span>-<span class="hljs-number">4706</span>bd74105f
For <span class="hljs-keyword">help</span>, see: http<span class="hljs-variable">s:</span>//nodejs.org/<span class="hljs-keyword">en</span>/docs/inspector</code></pre>
<p>&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x670D;&#x52A1;&#x542F;&#x52A8;&#x65F6;&#x4F7F;&#x7528;--inspect &#x6765;&#x542F;&#x52A8;&#x8C03;&#x8BD5;&#x4EE3;&#x7406;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node --inspect index.js" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">--inspect</span> index.js</code></pre>
<h3 id="articleHeader4">&#x8C03;&#x5EA6;&#x4EFB;&#x52A1;</h3>
<p>process.nextTick(fn)</p>
<p>&#x901A;&#x8FC7;process.nextTick&#x8C03;&#x5EA6;&#x7684;&#x4EFB;&#x52A1;&#x662F;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#xFF0C;EventLoop&#x662F;&#x5206;&#x9636;&#x6BB5;&#x7684;&#xFF0C;&#x6BCF;&#x4E2A;&#x9636;&#x6BB5;&#x6267;&#x884C;&#x7279;&#x5B9A;&#x7684;&#x4EFB;&#x52A1;&#xFF0C;&#x800C;nextTick&#x7684;&#x4EFB;&#x52A1;&#x5728;&#x9636;&#x6BB5;&#x5207;&#x6362;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4F1A;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x6B64;nextTick&#x4F1A;&#x6BD4;setTimeout(fn, 0)&#x66F4;&#x5FEB;&#x7684;&#x6267;&#x884C;&#xFF0C;&#x5173;&#x4E8E;EventLoop&#x89C1;&#x4E0B;&#x56FE;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x505A;&#x8FDB;&#x4E00;&#x6B65;&#x8BE6;&#x7EC6;&#x7684;&#x8BB2;&#x89E3;<br><span class="img-wrap"><img data-src="/img/bVbbxKP?w=951&amp;h=526" src="https://static.alili.tech/img/bVbbxKP?w=951&amp;h=526" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">&#x53D1;&#x51FA;&#x8B66;&#x544A;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.emitWarning(&apos;Something warning happened!&apos;, {
  code: &apos;MY_WARNING&apos;,
  type: &apos;XXXX&apos;
});

// (node:14771) [MY_WARNING] XXXX: Something warning happened!" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.emitWarning</span>(<span class="hljs-string">&apos;Something warning happened!&apos;</span>, {
  <span class="hljs-attribute">code</span>: <span class="hljs-string">&apos;MY_WARNING&apos;</span>,
  <span class="hljs-attribute">type</span>: <span class="hljs-string">&apos;XXXX&apos;</span>
});

<span class="hljs-comment">// (node:14771) [MY_WARNING] X<span class="hljs-doctag">XXX:</span> Something warning happened!</span></code></pre>
<p>&#x5F53;type&#x4E3A;DeprecationWarning&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x547D;&#x4EE4;&#x884C;&#x9009;&#x9879;&#x65BD;&#x52A0;&#x5F71;&#x54CD;</p>
<ul>
<li>
<code>--throw-deprecation</code>  &#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;</li>
<li>
<code>--no-deprecation</code>  &#x4E0D;&#x8F93;&#x51FA;DeprecationWarning</li>
<li>
<code>--trace-deprecation</code> &#x6253;&#x5370;&#x8BE6;&#x7EC6;&#x5806;&#x6808;&#x4FE1;&#x606F;</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.emitWarning(&apos;Something warning happened!&apos;, {
  type: &apos;DeprecationWarning&apos;
});
console.log(4);

node --throw-deprecation index.js
node --no-deprecation index.js
node --trace-deprecation index.js" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs crmsh"><code>process.emitWarning(&apos;Something warning happened!&apos;, {
  <span class="hljs-keyword">type</span>: &apos;DeprecationWarning&apos;
});
console.log(<span class="hljs-number">4</span>);

<span class="hljs-keyword">node</span> <span class="hljs-title">--throw-deprecation</span> index.js
<span class="hljs-keyword">node</span> <span class="hljs-title">--no-deprecation</span> index.js
<span class="hljs-keyword">node</span> <span class="hljs-title">--trace-deprecation</span> index.js</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js process模块解读

## 原文链接
[https://segmentfault.com/a/1190000015105353](https://segmentfault.com/a/1190000015105353)


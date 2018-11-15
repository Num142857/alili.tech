---
title: nodejs源码—初始化
hidden: true
categories: reprint
slug: 29ea3dcb
date: 2018-11-02 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x6982;&#x8FF0;</h2><p>&#x76F8;&#x4FE1;&#x5F88;&#x591A;&#x7684;&#x4EBA;&#xFF0C;&#x6BCF;&#x5929;&#x5728;&#x7EC8;&#x7AEF;&#x4E0D;&#x6B62;&#x4E00;&#x904D;&#x7684;&#x6267;&#x884C;&#x7740;<code>node</code>&#x8FD9;&#x6761;&#x547D;&#x4EE4;&#xFF0C;&#x5BF9;&#x4E8E;&#x5F88;&#x591A;&#x4EBA;&#x6765;&#x8BF4;&#xFF0C;&#x5B83;&#x5C31;&#x50CF;&#x4E00;&#x4E2A;&#x9ED1;&#x76D2;&#xFF0C;&#x5E76;&#x4E0D;&#x77E5;&#x9053;&#x80CC;&#x540E;&#x5230;&#x5E95;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF0C;&#x672C;&#x6587;&#x5C06;&#x4F1A;&#x4E3A;&#x5927;&#x5BB6;&#x63ED;&#x5F00;&#x8FD9;&#x4E2A;&#x795E;&#x79D8;&#x7684;&#x9762;&#x7EB1;&#xFF0C;&#x7531;&#x4E8E;&#x672C;&#x4EBA;&#x6C34;&#x5E73;&#x6709;&#x9650;&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x662F;&#x8BB2;&#x4E00;&#x4E2A;&#x5927;&#x6982;&#x5176;&#xFF0C;&#x4E3B;&#x8981;&#x5173;&#x6CE8;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;<code>node</code>&#x6A21;&#x5757;&#x7684;&#x521D;&#x59CB;&#x5316;&#xFF0C;<code>event loop</code>&#x548C;<code>v8</code>&#x7684;&#x90E8;&#x5206;&#x57FA;&#x672C;&#x6CA1;&#x6709;&#x6DF1;&#x5165;&#xFF0C;&#x8FD9;&#x4E9B;&#x90E8;&#x5206;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x4E00;&#x4E0B;&#x6211;&#x4EE5;&#x540E;&#x7684;&#x6587;&#x7AE0;&#x3002;&#xFF08;&#x63D0;&#x793A;&#x672C;&#x6587;&#x975E;&#x5E38;&#x7684;&#x957F;&#xFF0C;&#x5E0C;&#x671B;&#x5927;&#x5BB6;&#x4E0D;&#x8981;&#x770B;&#x70E6;~&#xFF09;</p><h2 id="articleHeader1">node&#x662F;&#x4EC0;&#x4E48;&#xFF1F;</h2><p>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5F88;&#x591A;&#x4EBA;&#x90FD;&#x4F1A;&#x56DE;&#x7B54;&#x5C31;&#x662F;<code>v8</code> + <code>libuv</code>&#xFF0C;&#x4F46;&#x662F;&#x9664;&#x4E86;&#x8FD9;&#x4E2A;&#x4E24;&#x4E2A;&#x5E93;&#x4EE5;&#x5916;<code>node</code>&#x8FD8;&#x4F9D;&#x8D56;&#x8BB8;&#x591A;&#x4F18;&#x79C0;&#x7684;&#x5F00;&#x6E90;&#x5E93;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>process.versions</code>&#x6765;&#x770B;&#x4E00;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbghPH?w=528&amp;h=500" src="https://static.alili.tech/img/bVbghPH?w=528&amp;h=500" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><ul><li><code>http_parser</code>&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x89E3;&#x6790;http&#x6570;&#x636E;&#x5305;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x5E93;&#x7684;&#x4F5C;&#x8005;&#x4E5F;&#x662F;<code>ry</code>&#xFF0C;&#x4E00;&#x4E2A;&#x7EAF;<code>c</code>&#x7684;&#x5E93;&#xFF0C;&#x65E0;&#x4EFB;&#x4F55;&#x4F9D;&#x8D56;</li><li><code>v8</code>&#x8FD9;&#x4E2A;&#x5927;&#x5BB6;&#x5C31;&#x975E;&#x5E38;&#x719F;&#x6089;&#x4E86;&#xFF0C;&#x4E00;&#x4E2A;&#x4F18;&#x79C0;&#x7684;<code>js</code>&#x5F15;&#x64CE;</li><li><code>uv</code>&#x8FD9;&#x4E2A;&#x5C31;&#x662F;<code>ry</code>&#x5B9E;&#x73B0;&#x7684;<code>libuv</code>&#xFF0C;&#x5176;&#x5C01;&#x88C5;&#x4E86;<code>libev</code>&#x548C;<code>IOCP</code>&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x8DE8;&#x5E73;&#x53F0;&#xFF0C;<code>node</code>&#x4E2D;&#x7684;<code>i/o</code>&#x5C31;&#x662F;&#x5B83;&#xFF0C;&#x5C3D;&#x7BA1;<code>js</code>&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x4F46;&#x662F;<code>libuv</code>&#x5E76;&#x4E0D;&#x662F;&#xFF0C;&#x5176;&#x6709;&#x4E00;&#x4E2A;&#x7EBF;&#x7A0B;&#x6C60;&#x6765;&#x5904;&#x7406;&#x8FD9;&#x4E9B;<code>i/o</code>&#x64CD;&#x4F5C;&#x3002;</li><li><code>zlib</code>&#x4E3B;&#x8981;&#x6765;&#x5904;&#x7406;&#x538B;&#x7F29;&#x64CD;&#x4F5C;&#xFF0C;&#x8BF8;&#x5982;&#x719F;&#x6089;&#x7684;<code>gzip</code>&#x64CD;&#x4F5C;</li><li><code>ares</code>&#x662F;<code>c-ares</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x5E93;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x89E3;&#x6790;<code>dns</code>&#xFF0C;&#x5176;&#x4E5F;&#x662F;&#x5F02;&#x6B65;&#x7684;</li><li><code>modules</code>&#x5C31;&#x662F;<code>node</code>&#x7684;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#xFF0C;&#x5176;&#x9075;&#x5FAA;&#x7684;&#x89C4;&#x8303;&#x4E3A;<code>commonjs</code>&#xFF0C;&#x4E0D;&#x8FC7;<code>node</code>&#x4E5F;&#x652F;&#x6301;&#x4E86;<code>ES</code>&#x6A21;&#x5757;&#xFF0C;&#x4E0D;&#x8FC7;&#x9700;&#x8981;&#x52A0;&#x4E0A;&#x53C2;&#x6570;&#x5E76;&#x4E14;&#x6587;&#x4EF6;&#x540D;&#x540E;&#x7F00;&#x9700;&#x8981;&#x4E3A;<code>mjs</code>&#xFF0C;&#x901A;&#x8FC7;&#x6E90;&#x7801;&#x770B;&#xFF0C;<code>node</code>&#x5C06;<code>ES</code>&#x6A21;&#x5757;&#x7684;&#x540D;&#x79F0;&#x4F5C;&#x4E3A;&#x4E86;&#x4E00;&#x79CD;<code>url</code>&#x6765;&#x770B;&#x5F85;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x53C2;&#x89C1;<a href="https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js#L602" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></li><li><code>nghttp2</code>&#x5982;&#x5176;&#x540D;&#x5B57;&#x4E00;&#x6837;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;<code>http2</code>&#x7684;&#x5E93;</li><li><code>napi</code>&#x662F;&#x5728;<code>node8</code>&#x51FA;&#x73B0;&#xFF0C;<code>node10</code>&#x7A33;&#x5B9A;&#x4E0B;&#x6765;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x7ED9;&#x7F16;&#x5199;<code>node</code>&#x539F;&#x751F;&#x6A21;&#x5757;&#x66F4;&#x597D;&#x7684;&#x4F53;&#x9A8C;&#xFF08;&#x7EC8;&#x4E8E;&#x4E0D;&#x7528;&#x5728;&#x4F9D;&#x8D56;&#x4E8E;<code>nan</code>&#xFF0C;&#x6BCF;&#x6B21;&#x66F4;&#x6362;<code>node</code>&#x7248;&#x672C;&#x8FD8;&#x8981;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x4E00;&#x6B21;&#x4E86;&#xFF09;</li><li><code>openssl</code>&#x975E;&#x5E38;&#x8457;&#x540D;&#x7684;&#x5E93;&#xFF0C;<code>tls</code>&#x6A21;&#x5757;&#x4F9D;&#x8D56;&#x4E8E;&#x8FD9;&#x4E2A;&#x5E93;&#xFF0C;&#x5F53;&#x7136;&#x8FD8;&#x5305;&#x62EC;<code>https</code></li><li><code>icu</code>&#x5C31;&#x662F;<code>small-icu</code>&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x4E8E;&#x89E3;&#x51B3;&#x8DE8;&#x5E73;&#x53F0;&#x7684;&#x7F16;&#x7801;&#x95EE;&#x9898;&#xFF0C;<code>versions</code>&#x5BF9;&#x8C61;&#x4E2D;&#x7684;<code>unicode</code>&#xFF0C;<code>cldr</code>&#xFF0C;<code>tz</code>&#x4E5F;&#x6E90;&#x81EA;<code>icu</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x7684;&#x5B9A;&#x4E49;&#x53EF;&#x4EE5;&#x53C2;&#x89C1;<a href="https://github.com/nodejs/node/blob/master/lib/internal/bootstrap/node.js#L566" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a></li></ul><p>&#x4ECE;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x7684;&#x662F;<code>process</code>&#x5BF9;&#x8C61;&#x5728;<code>node</code>&#x4E2D;&#x975E;&#x5E38;&#x7684;&#x91CD;&#x8981;&#xFF0C;<strong>&#x4E2A;&#x4EBA;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x5176;&#x5B9E;<code>node</code>&#x4E0E;&#x6D4F;&#x89C8;&#x5668;&#x7AEF;&#x6700;&#x4E3B;&#x8981;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x5C31;&#x5728;&#x4E8E;&#x8FD9;&#x4E2A;<code>process</code>&#x5BF9;&#x8C61;</strong></p><p>&#x6CE8;&#xFF1A;<code>node</code>&#x53EA;&#x662F;&#x7528;<code>v8</code>&#x6765;&#x8FDB;&#x884C;<code>js</code>&#x7684;&#x89E3;&#x6790;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4E00;&#x5B9A;&#x975E;&#x8981;&#x4F9D;&#x8D56;<code>v8</code>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x5F15;&#x64CE;&#x6765;&#x4EE3;&#x66FF;&#xFF0C;&#x6BD4;&#x5982;&#x5229;&#x7528;&#x5FAE;&#x8F6F;&#x7684;<code>ChakraCore</code>&#xFF0C;&#x5BF9;&#x5E94;&#x7684;<a href="https://github.com/nodejs/node-chakracore" rel="nofollow noreferrer" target="_blank">node&#x4ED3;&#x5E93;</a></p><h2 id="articleHeader2">node&#x521D;&#x59CB;&#x5316;</h2><p>&#x7ECF;&#x8FC7;&#x4E0A;&#x9762;&#x7684;&#x4E00;&#x901A;&#x5206;&#x6790;&#xFF0C;&#x5BF9;<code>node</code>&#x7684;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x6709;&#x4E86;&#x4E00;&#x5B9A;&#x7684;&#x4E86;&#x89E3;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x8FDB;&#x5165;&#x6B63;&#x9898;&#xFF0C;&#x770B;&#x4E00;&#x4E0B;<code>node</code>&#x7684;&#x521D;&#x59CB;&#x5316;&#x8FC7;&#x7A0B;&#xFF1A;</p><h3 id="articleHeader3">&#x6316;&#x5751;</h3><p><code>node_main.cc</code>&#x4E3A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7684;&#x662F;&#x9664;&#x4E86;&#x8C03;&#x7528;&#x4E86;<code>node::Start</code>&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x505A;&#x4E86;&#x4E24;&#x4EF6;&#x4E8B;&#x60C5;&#xFF1A;</p><h4>NODE_SHARED_MODE&#x5FFD;&#x7565;SIGPIPE&#x4FE1;&#x53F7;</h4><p><code>SIGPIPE</code>&#x4FE1;&#x53F7;&#x51FA;&#x73B0;&#x7684;&#x60C5;&#x51B5;&#x4E00;&#x822C;&#x5728;<code>socket</code>&#x6536;&#x5230;<code>RST packet</code>&#x4E4B;&#x540E;&#xFF0C;&#x6254;&#x5411;&#x8FD9;&#x4E2A;<code>socket</code>&#x5199;&#x6570;&#x636E;&#x65F6;&#x4EA7;&#x751F;&#xFF0C;&#x7B80;&#x5355;&#x6765;&#x8BF4;&#x5C31;&#x662F;<code>client</code>&#x60F3;<code>server</code>&#x53D1;&#x8BF7;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x65F6;&#x5019;<code>client</code>&#x5DF2;&#x7ECF;&#x6302;&#x6389;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x4F1A;&#x4EA7;&#x751F;<code>SIGPIPE</code>&#x4FE1;&#x53F7;&#xFF0C;&#x4EA7;&#x751F;&#x8FD9;&#x4E2A;&#x4FE1;&#x53F7;&#x4F1A;&#x4F7F;<code>server</code>&#x7AEF;&#x6302;&#x6389;&#xFF0C;&#x5176;&#x5B9E;<code>node::PlatformInit</code>&#x4E2D;&#x4E5F;&#x505A;&#x4E86;&#x8FD9;&#x79CD;&#x64CD;&#x4F5C;&#xFF0C;&#x4E0D;&#x8FC7;&#x53EA;&#x662F;&#x9488;&#x5BF9;<code>non-shared lib build</code></p><h4>&#x6539;&#x53D8;&#x7F13;&#x51B2;&#x884C;&#x4E3A;</h4><p><code>stdout</code>&#x7684;&#x9ED8;&#x8BA4;&#x7F13;&#x51B2;&#x884C;&#x4E3A;&#x4E3A;<code>_IOLBF</code>&#xFF08;&#x884C;&#x7F13;&#x51B2;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x8FD9;&#x79CD;&#x6765;&#x8BF4;&#x4EA4;&#x4E92;&#x6027;&#x4F1A;&#x975E;&#x5E38;&#x7684;&#x5DEE;&#xFF0C;&#x6240;&#x4EE5;&#x5C06;&#x5176;&#x6539;&#x4E3A;<code>_IONBF</code>&#xFF08;&#x4E0D;&#x7F13;&#x51B2;&#xFF09;</p><h3 id="articleHeader4">&#x63A2;&#x7D22;</h3><p><code>node.cc</code>&#x6587;&#x4EF6;&#x4E2D;&#x603B;&#x5171;&#x6709;&#x4E09;&#x4E2A;<code>Start</code>&#x51FD;&#x6570;&#xFF0C;&#x5148;&#x4ECE;<code>node_main.cc</code>&#x4E2D;&#x6389;&#x7684;&#x8FD9;&#x4E2A;<code>Start</code>&#x51FD;&#x6570;&#x5F00;&#x59CB;&#x770B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="int Start(int argc, char** argv) {
  // &#x9000;&#x51FA;&#x4E4B;&#x524D;&#x7EC8;&#x6B62;libuv&#x7684;&#x7EC8;&#x7AEF;&#x884C;&#x4E3A;,&#x4E3A;&#x6B63;&#x5E38;&#x9000;&#x51FA;&#x7684;&#x60C5;&#x51B5;
  atexit([] () { uv_tty_reset_mode(); });
  // &#x9488;&#x5BF9;&#x5E73;&#x53F0;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;
  PlatformInit();
  // ...
  Init(&amp;argc, const_cast&lt;const char**&gt;(argv), &amp;exec_argc, &amp;exec_argv);
  // ...
  v8_platform.Initialize(v8_thread_pool_size);
  // &#x719F;&#x6089;&#x7684;v8&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;
  V8::Initialize();
  // ..
  const int exit_code =
    Start(uv_default_loop(), argc, argv, exec_argc, exec_argv);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">int</span> <span class="hljs-title">Start</span><span class="hljs-params">(<span class="hljs-keyword">int</span> argc, <span class="hljs-keyword">char</span>** argv)</span> </span>{
  <span class="hljs-comment">// &#x9000;&#x51FA;&#x4E4B;&#x524D;&#x7EC8;&#x6B62;libuv&#x7684;&#x7EC8;&#x7AEF;&#x884C;&#x4E3A;,&#x4E3A;&#x6B63;&#x5E38;&#x9000;&#x51FA;&#x7684;&#x60C5;&#x51B5;</span>
  atexit([] () { uv_tty_reset_mode(); });
  <span class="hljs-comment">// &#x9488;&#x5BF9;&#x5E73;&#x53F0;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;</span>
  PlatformInit();
  <span class="hljs-comment">// ...</span>
  Init(&amp;argc, <span class="hljs-keyword">const_cast</span>&lt;<span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>**&gt;(argv), &amp;exec_argc, &amp;exec_argv);
  <span class="hljs-comment">// ...</span>
  v8_platform.Initialize(v8_thread_pool_size);
  <span class="hljs-comment">// &#x719F;&#x6089;&#x7684;v8&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;</span>
  V8::Initialize();
  <span class="hljs-comment">// ..</span>
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">int</span> exit_code =
    Start(uv_default_loop(), argc, argv, exec_argc, exec_argv);
}</code></pre><p>&#x4E0A;&#x9762;&#x51FD;&#x6570;&#x53EA;&#x4FDD;&#x7559;&#x4E86;&#x4E00;&#x4E9B;&#x5173;&#x952E;&#x4E0D;&#x8D70;&#xFF0C;&#x5148;&#x6765;&#x770B;&#x770B;<code>PlatformInit</code></p><h4>PlatfromInit</h4><p><code>unix</code>&#x4E2D;&#x5C06;&#x4E00;&#x5207;&#x90FD;&#x770B;&#x4F5C;&#x6587;&#x4EF6;&#xFF0C;&#x8FDB;&#x7A0B;&#x542F;&#x52A8;&#x65F6;&#x4F1A;&#x9ED8;&#x8BA4;&#x6253;&#x5F00;&#x4E09;&#x4E2A;<code>i/o</code>&#x8BBE;&#x5907;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;<code>stdin stdout stderr</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x4F1A;&#x5206;&#x914D;<code>0 1 2</code>&#x4E09;&#x4E2A;&#x63CF;&#x8FF0;&#x7B26;&#x51FA;&#x53BB;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;&#x5E38;&#x91CF;&#x4E3A;<code>STDIN_FILENO STDOUT_FILENO STDERR_FILENO</code>&#xFF0C;&#x800C;<code>windows</code>&#x4E2D;&#x6CA1;&#x6709;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;&#x7684;&#x8FD9;&#x4E2A;&#x6982;&#x5FF5;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x53E5;&#x67C4;&#xFF0C;<code>PlatformInit</code>&#x9996;&#x5148;&#x662F;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x5C06;&#x8FD9;&#x4E2A;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;&#x5DF2;&#x7ECF;&#x5206;&#x914D;&#x51FA;&#x53BB;&#xFF0C;&#x82E5;&#x6CA1;&#x6709;&#xFF0C;&#x5219;&#x5229;&#x7528;<code>open(&quot;/dev/null&quot;, O_RDWR)</code>&#x5206;&#x914D;&#x51FA;&#x53BB;&#xFF0C;&#x5BF9;&#x4E8E;<code>windows</code>&#x505A;&#x4E86;&#x540C;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x5206;&#x914D;&#x53E5;&#x67C4;&#x51FA;&#x53BB;&#xFF0C;&#x800C;&#x4E14;<code>windows</code>&#x53EA;&#x505A;&#x4E86;&#x8FD9;&#x4E00;&#x4E2A;&#x64CD;&#x4F5C;&#xFF1B;&#x5BF9;&#x4E8E;<code>unix</code>&#x6765;&#x8BF4;&#x8FD8;&#x4F1A;&#x9488;&#x5BF9;<code>SIGINT</code>&#xFF08;&#x7528;&#x6237;&#x8C03;&#x7528;Ctrl-C&#x65F6;&#x53D1;&#x51FA;&#xFF09;&#x548C;<code>SIGTERM</code>&#xFF08;<code>SIGTERM</code>&#x4E0E;<code>SIGKILL</code>&#x7C7B;&#x4F3C;,&#x4F46;&#x662F;&#x4E0D;&#x540C;&#x7684;&#x662F;&#x8BE5;&#x4FE1;&#x53F7;&#x53EF;&#x4EE5;&#x88AB;&#x963B;&#x585E;&#x548C;&#x5904;&#x7406;,&#x8981;&#x6C42;&#x7A0B;&#x5E8F;&#x81EA;&#x5DF1;&#x9000;&#x51FA;&#xFF09;&#x4FE1;&#x53F7;&#x6765;&#x505A;&#x4E00;&#x4E9B;&#x7279;&#x6B8A;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x4E2A;&#x5904;&#x7406;&#x4E0E;&#x6B63;&#x5E38;&#x9000;&#x51FA;&#x65F6;&#x4E00;&#x6837;&#xFF1B;&#x53E6;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;&#x4E0B;&#x9762;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  struct rlimit lim;
  // soft limit &#x4E0D;&#x7B49;&#x4E8E; hard limit, &#x610F;&#x5473;&#x7740;&#x53EF;&#x4EE5;&#x589E;&#x52A0;
  if (getrlimit(RLIMIT_NOFILE, &amp;lim) == 0 &amp;&amp; lim.rlim_cur != lim.rlim_max) {
    // Do a binary search for the limit.
    rlim_t min = lim.rlim_cur;
    rlim_t max = 1 &lt;&lt; 20;
    // But if there&apos;s a defined upper bound, don&apos;t search, just set it.
    if (lim.rlim_max != RLIM_INFINITY) {
      min = lim.rlim_max;
      max = lim.rlim_max;
    }
    do {
      lim.rlim_cur = min + (max - min) / 2;
      // &#x5BF9;&#x4E8E;mac&#x6765;&#x8BF4; hard limit &#x4E3A;unlimited
      // &#x4F46;&#x662F;&#x5185;&#x6838;&#x6709;&#x9650;&#x5236;&#x6700;&#x5927;&#x7684;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;,&#x8D85;&#x8FC7;&#x8FD9;&#x4E2A;&#x9650;&#x5236;&#x5219;&#x8BBE;&#x7F6E;&#x5931;&#x8D25;
      if (setrlimit(RLIMIT_NOFILE, &amp;lim)) {
        max = lim.rlim_cur;
      } else {
        min = lim.rlim_cur;
      }
    } while (min + 1 &lt; max);
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>  <span class="hljs-keyword">struct</span> rlimit lim;
  <span class="hljs-comment">// soft limit &#x4E0D;&#x7B49;&#x4E8E; hard limit, &#x610F;&#x5473;&#x7740;&#x53EF;&#x4EE5;&#x589E;&#x52A0;</span>
  <span class="hljs-built_in">if</span> (getrlimit(RLIMIT_NOFILE, &amp;lim) == <span class="hljs-number">0</span> &amp;&amp; lim.rlim_cur != lim.rlim_max) {
    <span class="hljs-comment">// Do a binary search for the limit.</span>
    rlim_t <span class="hljs-built_in">min</span> = lim.rlim_cur;
    rlim_t <span class="hljs-built_in">max</span> = <span class="hljs-number">1</span> &lt;&lt; <span class="hljs-number">20</span>;
    <span class="hljs-comment">// But if there&apos;s a defined upper bound, don&apos;t search, just set it.</span>
    <span class="hljs-built_in">if</span> (lim.rlim_max != RLIM_INFINITY) {
      <span class="hljs-built_in">min</span> = lim.rlim_max;
      <span class="hljs-built_in">max</span> = lim.rlim_max;
    }
    <span class="hljs-built_in">do</span> {
      lim.rlim_cur = <span class="hljs-built_in">min</span> + (<span class="hljs-built_in">max</span> - <span class="hljs-built_in">min</span>) / <span class="hljs-number">2</span>;
      <span class="hljs-comment">// &#x5BF9;&#x4E8E;mac&#x6765;&#x8BF4; hard limit &#x4E3A;unlimited</span>
      <span class="hljs-comment">// &#x4F46;&#x662F;&#x5185;&#x6838;&#x6709;&#x9650;&#x5236;&#x6700;&#x5927;&#x7684;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;,&#x8D85;&#x8FC7;&#x8FD9;&#x4E2A;&#x9650;&#x5236;&#x5219;&#x8BBE;&#x7F6E;&#x5931;&#x8D25;</span>
      <span class="hljs-built_in">if</span> (setrlimit(RLIMIT_NOFILE, &amp;lim)) {
        <span class="hljs-built_in">max</span> = lim.rlim_cur;
      } <span class="hljs-built_in">else</span> {
        <span class="hljs-built_in">min</span> = lim.rlim_cur;
      }
    } <span class="hljs-built_in">while</span> (<span class="hljs-built_in">min</span> + <span class="hljs-number">1</span> &lt; <span class="hljs-built_in">max</span>);
  }</code></pre><p>&#x8FD9;&#x4E2A;&#x4EF6;&#x4E8B;&#x60C5;&#x4E5F;&#x5C31;&#x662F;&#x63D0;&#x9AD8;&#x4E00;&#x4E2A;&#x8FDB;&#x7A0B;&#x5141;&#x8BB8;&#x6253;&#x5F00;&#x7684;&#x6700;&#x5927;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;&#xFF0C;&#x4F46;&#x662F;&#x5728;<code>mac</code>&#x4E0A;&#x975E;&#x5E38;&#x7684;&#x5947;&#x602A;&#xFF0C;&#x6267;&#x884C;<code>ulimit -H -n</code>&#x5F97;&#x5230;<code>hard limit</code>&#x662F;<code>unlimited</code>&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x8BA4;&#x4E3A;<code>mac</code>&#x4E0A;&#x7684;&#x6700;&#x5927;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;&#x4F1A;&#x88AB;&#x8BBE;&#x7F6E;&#x4E3A;<code>1 &lt;&lt; 20</code>&#xFF0C;&#x4F46;&#x662F;&#x6700;&#x540E;&#x7ECF;&#x8FC7;&#x5B9E;&#x9A8C;&#x53D1;&#x73B0;&#x6700;&#x5927;&#x53EA;&#x80FD;&#x4E3A;<code>24576</code>&#xFF0C;&#x975E;&#x5E38;&#x7684;&#x8BE1;&#x5F02;&#xFF0C;&#x6700;&#x540E;&#x7ECF;&#x8FC7;&#x4E00;&#x987F;&#x641C;&#x7D22;&#xFF0C;&#x67E5;&#x5230;&#x4E86;&#x539F;&#x6765;<code>mac</code>&#x7684;&#x5185;&#x6838;&#x5BF9;&#x80FD;&#x6253;&#x5F00;&#x7684;&#x6587;&#x4EF6;&#x63CF;&#x8FF0;&#x7B26;&#x4E5F;&#x6709;&#x9650;&#x5236;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;<code>sysctl -A | grep kern.maxfiles</code>&#x8FDB;&#x884C;&#x67E5;&#x770B;&#xFF0C;&#x679C;&#x7136;&#x8FD9;&#x4E2A;&#x6570;&#x5B57;&#x5C31;&#x662F;<code>24576</code><br><span class="img-wrap"><img data-src="/img/bVbgh57?w=2340&amp;h=236" src="https://static.alili.tech/img/bVbgh57?w=2340&amp;h=236" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h4>Init</h4><p><code>Init</code>&#x51FD;&#x6570;&#x8C03;&#x7528;&#x4E86;<code>RegisterBuiltinModules</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// node.cc
void RegisterBuiltinModules() {
#define V(modname) _register_##modname();
  NODE_BUILTIN_MODULES(V)
#undef V
}

// node_internals.h
#define NODE_BUILTIN_MODULES(V)                                               \
  NODE_BUILTIN_STANDARD_MODULES(V)                                            \
  NODE_BUILTIN_OPENSSL_MODULES(V)                                             \
  NODE_BUILTIN_ICU_MODULES(V)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-comment">// node.cc</span>
<span class="hljs-selector-tag">void</span> <span class="hljs-selector-tag">RegisterBuiltinModules</span>() {
<span class="hljs-selector-id">#define</span> <span class="hljs-selector-tag">V</span>(modname) <span class="hljs-selector-tag">_register_</span>#<span class="hljs-selector-id">#modname</span>();
  <span class="hljs-selector-tag">NODE_BUILTIN_MODULES</span>(V)
<span class="hljs-selector-id">#undef</span> <span class="hljs-selector-tag">V</span>
}

<span class="hljs-comment">// node_internals.h</span>
<span class="hljs-selector-id">#define</span> <span class="hljs-selector-tag">NODE_BUILTIN_MODULES</span>(V)                                               \
  <span class="hljs-selector-tag">NODE_BUILTIN_STANDARD_MODULES</span>(V)                                            \
  <span class="hljs-selector-tag">NODE_BUILTIN_OPENSSL_MODULES</span>(V)                                             \
  <span class="hljs-selector-tag">NODE_BUILTIN_ICU_MODULES</span>(V)</code></pre><p>&#x4ECE;&#x540D;&#x5B57;&#x4E5F;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x4E0A;&#x9762;&#x7684;&#x8FC7;&#x7A0B;&#x662F;&#x8FDB;&#x884C;<code>c++</code>&#x6A21;&#x5757;&#x7684;&#x521D;&#x59CB;&#x5316;&#xFF0C;<code>node</code>&#x5229;&#x7528;&#x4E86;&#x4E00;&#x4E9B;&#x5B8F;&#x5B9A;&#x4E49;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x4E3B;&#x8981;&#x5173;&#x6CE8;<code>NODE_BUILTIN_STANDARD_MODULES</code>&#x8FD9;&#x4E2A;&#x5B8F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#define NODE_BUILTIN_STANDARD_MODULES(V)                                      \
    V(async_wrap)                                                             \
    V(buffer)
    ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-id">#define</span> <span class="hljs-selector-tag">NODE_BUILTIN_STANDARD_MODULES</span>(V)                                      \
    <span class="hljs-selector-tag">V</span>(async_wrap)                                                             \
    <span class="hljs-selector-tag">V</span>(buffer)
    ...</code></pre><p>&#x7ED3;&#x5408;&#x4E0A;&#x9762;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;&#x53EF;&#x4EE5;&#x5F97;&#x51FA;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x5927;&#x6982;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void RegisterBuiltinModules() {
  _register_async_wrap();
  _register_buffer();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">void</span> <span class="hljs-selector-tag">RegisterBuiltinModules</span>() {
  <span class="hljs-selector-tag">_register_async_wrap</span>();
  <span class="hljs-selector-tag">_register_buffer</span>();
}</code></pre><p>&#x800C;&#x8FD9;&#x4E9B;<code>_register</code>&#x53C8;&#x662F;&#x4ECE;&#x54EA;&#x91CC;&#x6765;&#x7684;&#x5462;&#xFF1F;&#x4EE5;<code>buffer</code>&#x6765;&#x8BF4;&#xFF0C;&#x5BF9;&#x5E94;<code>c++</code>&#x6587;&#x4EF6;&#x4E3A;<code>src/node_buffer.cc</code>&#xFF0C;&#x6765;&#x770B;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x6700;&#x540E;&#x4E00;&#x884C;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6A21;&#x5757;&#x7684;&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NODE_BUILTIN_MODULE_CONTEXT_AWARE(buffer, node::Buffer::Initialize)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial">NODE_BUILTIN_MODULE_CONTEXT_AWARE(buffer, <span class="hljs-keyword">node</span><span class="hljs-title">::Buffer</span>::Initialize)</code></pre><p>&#x8FD9;&#x4E2A;&#x5B8F;&#x5B58;&#x5728;&#x4E8E;<code>node_internals.h</code>&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#define NODE_MODULE_CONTEXT_AWARE_CPP(modname, regfunc, priv, flags)
  static node::node_module _module = {
    NODE_MODULE_VERSION,                                                      
    flags,                                                                    
    nullptr,                                                                  
    __FILE__,                                                                  
    nullptr,                                                                   
    (node::addon_context_register_func) (regfunc),// &#x66B4;&#x9732;&#x7ED9;js&#x4F7F;&#x7528;&#x7684;&#x6A21;&#x5757;&#x7684;&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;
    NODE_STRINGIFY(modname),                                                 
    priv,                                                                     
    nullptr                                                                   
  };                                                                          
  void _register_ ## modname() {                                              
    node_module_register(&amp;_module);                                           
  }


#define NODE_BUILTIN_MODULE_CONTEXT_AWARE(modname, regfunc)                   
  NODE_MODULE_CONTEXT_AWARE_CPP(modname, regfunc, nullptr, NM_F_BUILTIN)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> NODE_MODULE_CONTEXT_AWARE_CPP(modname, regfunc, priv, flags)</span>
  <span class="hljs-keyword">static</span> node::node_module _module = {
    NODE_MODULE_VERSION,                                                      
    flags,                                                                    
    <span class="hljs-literal">nullptr</span>,                                                                  
    __FILE__,                                                                  
    <span class="hljs-literal">nullptr</span>,                                                                   
    (node::addon_context_register_func) (regfunc),<span class="hljs-comment">// &#x66B4;&#x9732;&#x7ED9;js&#x4F7F;&#x7528;&#x7684;&#x6A21;&#x5757;&#x7684;&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;</span>
    NODE_STRINGIFY(modname),                                                 
    priv,                                                                     
    <span class="hljs-literal">nullptr</span>                                                                   
  };                                                                          
  <span class="hljs-keyword">void</span> _register_ #<span class="hljs-meta"># modname() {                                              </span>
    node_module_register(&amp;_module);                                           
  }


<span class="hljs-meta">#<span class="hljs-meta-keyword">define</span> NODE_BUILTIN_MODULE_CONTEXT_AWARE(modname, regfunc)                   </span>
  NODE_MODULE_CONTEXT_AWARE_CPP(modname, regfunc, <span class="hljs-literal">nullptr</span>, NM_F_BUILTIN)</code></pre><p>&#x53D1;&#x73B0;&#x8C03;&#x7528;&#x7684;<code>_register_buffer</code>&#x5B9E;&#x8D28;&#x4E0A;&#x8C03;&#x7528;&#x7684;&#x662F;<code>node_module_register(&amp;_module)</code>&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;<code>c++</code>&#x6A21;&#x5757;&#x5BF9;&#x5E94;&#x7684;&#x4E3A;&#x4E00;&#x4E2A;<code>node_module</code>&#x7ED3;&#x6784;&#x4F53;&#xFF0C;&#x518D;&#x6765;&#x770B;&#x770B;<code>node_module_register</code>&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="extern &quot;C&quot; void node_module_register(void* m) {
  struct node_module* mp = reinterpret_cast&lt;struct node_module*&gt;(m);

  if (mp-&gt;nm_flags &amp; NM_F_BUILTIN) {
    mp-&gt;nm_link = modlist_builtin;
    modlist_builtin = mp;
  }
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-keyword">extern</span> <span class="hljs-string">&quot;C&quot;</span> <span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">node_module_register</span><span class="hljs-params">(<span class="hljs-keyword">void</span>* m)</span> </span>{
  <span class="hljs-keyword">struct</span> node_module* mp = <span class="hljs-keyword">reinterpret_cast</span>&lt;<span class="hljs-keyword">struct</span> node_module*&gt;(m);

  <span class="hljs-keyword">if</span> (mp-&gt;nm_flags &amp; NM_F_BUILTIN) {
    mp-&gt;nm_link = modlist_builtin;
    modlist_builtin = mp;
  }
  ...
}</code></pre><p>&#x7531;&#x6B64;&#x53EF;&#x4EE5;&#x89C1;&#xFF0C;<code>c++</code>&#x6A21;&#x5757;&#x88AB;&#x5B58;&#x50A8;&#x5728;&#x4E86;&#x4E00;&#x4E2A;&#x94FE;&#x8868;&#x4E2D;&#xFF0C;&#x540E;&#x9762;<code>process.binding()</code>&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x5728;&#x8FD9;&#x4E2A;&#x94FE;&#x8868;&#x4E2D;&#x67E5;&#x627E;&#x5BF9;&#x5E94;<code>c++</code>&#x6A21;&#x5757;&#xFF0C;<code>node_module</code>&#x662F;&#x94FE;&#x8868;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x8282;&#x70B9;&#xFF0C;&#x9664;&#x6B64;&#x4E4B;&#x5916;<code>Init</code>&#x8FD8;&#x521D;&#x59CB;&#x5316;&#x4E86;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;&#xFF0C;&#x8FD9;&#x4E9B;&#x53D8;&#x91CF;&#x57FA;&#x672C;&#x4E0A;&#x90FD;&#x662F;&#x53D6;&#x51B3;&#x4E8E;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x7528;<code>getenv</code>&#x83B7;&#x5F97;&#x5373;&#x53EF;</p><h4>v8&#x521D;&#x59CB;&#x5316;</h4><p>&#x5230;&#x6267;&#x884C;&#x5B8C;<code>Init</code>&#x4E3A;&#x6B62;&#xFF0C;&#x8FD8;&#x6CA1;&#x6709;&#x6D89;&#x53CA;&#x7684;<code>js</code>&#x4E0E;<code>c++</code>&#x7684;&#x4EA4;&#x4E92;&#xFF0C;&#x5728;&#x5C06;&#x4E00;&#x4E9B;&#x73AF;&#x5883;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#xFF0C;&#x5C31;&#x8981;&#x5F00;&#x59CB;&#x7528;<code>v8</code>&#x8FD9;&#x4E2A;&#x5927;&#x6740;&#x5668;&#x4E86;&#xFF0C;<code>v8_platform</code>&#x662F;&#x4E00;&#x4E2A;&#x7ED3;&#x6784;&#x4F53;&#xFF0C;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;<code>node</code>&#x5BF9;&#x4E8E;<code>v8</code>&#x7684;<code>v8::platform</code>&#x4E00;&#x4E2A;&#x5C01;&#x88C5;&#xFF0C;&#x7D27;&#x63A5;&#x7740;&#x7684;&#x5C31;&#x662F;&#x5BF9;<code>v8</code>&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x81EA;&#x6B64;&#x5F00;&#x59CB;&#x5177;&#x5907;&#x4E86;&#x4E0E;<code>js</code>&#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x521D;&#x59CB;&#x5316;<code>v8</code>&#x4E4B;&#x540E;&#xFF0C;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;<code>libuv</code>&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x5C31;&#x8FDB;&#x5165;&#x4E86;&#x4E0B;&#x4E00;&#x4E2A;<code>Start</code>&#x51FD;&#x6570;</p><h4>&#x7B2C;&#x4E8C;&#x4E2A;Start&#x51FD;&#x6570;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inline int Start(uv_loop_t* event_loop,
                 int argc, const char* const* argv,
                 int exec_argc, const char* const* exec_argv) {
  std::unique_ptr&lt;ArrayBufferAllocator, decltype(&amp;FreeArrayBufferAllocator)&gt;
      allocator(CreateArrayBufferAllocator(), &amp;FreeArrayBufferAllocator);
  Isolate* const isolate = NewIsolate(allocator.get());
  // ...
  {
    Locker locker(isolate);
    Isolate::Scope isolate_scope(isolate);
    HandleScope handle_scope(isolate);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">inline</span> <span class="hljs-keyword">int</span> <span class="hljs-title">Start</span><span class="hljs-params">(<span class="hljs-keyword">uv_loop_t</span>* event_loop,
                 <span class="hljs-keyword">int</span> argc, <span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>* <span class="hljs-keyword">const</span>* argv,
                 <span class="hljs-keyword">int</span> exec_argc, <span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>* <span class="hljs-keyword">const</span>* exec_argv)</span> </span>{
  <span class="hljs-built_in">std</span>::<span class="hljs-built_in">unique_ptr</span>&lt;ArrayBufferAllocator, <span class="hljs-keyword">decltype</span>(&amp;FreeArrayBufferAllocator)&gt;
      allocator(CreateArrayBufferAllocator(), &amp;FreeArrayBufferAllocator);
  Isolate* <span class="hljs-keyword">const</span> isolate = NewIsolate(allocator.get());
  <span class="hljs-comment">// ...</span>
  {
    <span class="hljs-function">Locker <span class="hljs-title">locker</span><span class="hljs-params">(isolate)</span></span>;
    Isolate::<span class="hljs-function">Scope <span class="hljs-title">isolate_scope</span><span class="hljs-params">(isolate)</span></span>;
    <span class="hljs-function">HandleScope <span class="hljs-title">handle_scope</span><span class="hljs-params">(isolate)</span></span>;
  }
}</code></pre><p>&#x9996;&#x5148;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;<code>v8</code>&#x7684;<code>Isolate</code>&#xFF08;&#x9694;&#x79BB;&#xFF09;&#xFF0C;&#x9694;&#x79BB;&#x5728;<code>v8</code>&#x4E2D;&#x975E;&#x5E38;&#x5E38;&#x89C1;&#xFF0C;&#x4EFF;&#x4F5B;&#x548C;&#x8FDB;&#x7A0B;&#x4E00;&#x6837;&#xFF0C;&#x4E0D;&#x540C;&#x9694;&#x79BB;&#x4E0D;&#x5171;&#x4EAB;&#x8D44;&#x6E90;&#xFF0C;&#x6709;&#x7740;&#x81EA;&#x5DF1;&#x5F97;&#x5806;&#x6808;&#xFF0C;&#x4F46;&#x662F;&#x6B63;&#x662F;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x539F;&#x56E0;&#x5728;&#x591A;&#x7EBF;&#x7A0B;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8981;&#x662F;&#x5BF9;&#x6BCF;&#x4E00;&#x4E2A;&#x7EBF;&#x7A0B;&#x90FD;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9694;&#x79BB;&#x7684;&#x8BDD;&#xFF0C;&#x90A3;&#x4E48;&#x5F00;&#x9500;&#x4F1A;&#x975E;&#x5E38;&#x7684;&#x5927;&#xFF08;&#x53EF;&#x559C;&#x53EF;&#x8D3A;&#x7684;&#x662F;<code>node</code>&#x6709;&#x4E86;<code>worker_threads</code>&#xFF09;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x501F;&#x52A9;<code>Locker</code>&#x6765;&#x8FDB;&#x884C;&#x540C;&#x6B65;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x4FDD;&#x8BC1;&#x4E86;&#x4E00;&#x4E2A;<code>Isolate</code>&#x540C;&#x4E00;&#x65F6;&#x523B;&#x53EA;&#x80FD;&#x88AB;&#x4E00;&#x4E2A;&#x7EBF;&#x7A0B;&#x4F7F;&#x7528;&#xFF1B;&#x4E0B;&#x9762;&#x4E24;&#x884C;&#x5C31;&#x662F;<code>v8</code>&#x7684;&#x5E38;&#x89C4;&#x5957;&#x8DEF;&#xFF0C;&#x4E0B;&#x4E00;&#x6B65;&#x4E00;&#x822C;&#x5C31;&#x662F;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>Context</code>&#xFF08;&#x6700;&#x7B80;&#x5316;&#x7684;&#x4E00;&#x4E2A;&#x6D41;&#x7A0B;&#x53EF;&#x4EE5;&#x53C2;&#x89C1;<code>v8</code>&#x7684;<a href="https://chromium.googlesource.com/v8/v8/+/master/samples/hello-world.cc" rel="nofollow noreferrer" target="_blank">hello world</a>&#xFF09;&#xFF0C;<code>HandleScope</code>&#x53EB;&#x505A;&#x53E5;&#x67C4;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x662F;&#x653E;&#x5728;&#x51FD;&#x6570;&#x7684;&#x5F00;&#x5934;&#xFF0C;&#x6765;&#x7BA1;&#x7406;&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x7684;&#x4E00;&#x4E9B;&#x53E5;&#x67C4;&#xFF08;&#x6C34;&#x5E73;&#x6709;&#x9650;&#xFF0C;&#x6682;&#x65F6;&#x4E0D;&#x6DF1;&#x7A76;&#xFF0C;&#x5148;&#x6316;&#x4E2A;&#x5751;&#xFF09;&#xFF1B;&#x7B2C;&#x4E8C;&#x4E2A;<code>Start</code>&#x7684;&#x4E3B;&#x8981;&#x6D41;&#x7A0B;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x4F1A;&#x8FDB;&#x5165;&#x6700;&#x540E;&#x4E00;&#x4E2A;<code>Start</code>&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x975E;&#x5E38;&#x7684;&#x5173;&#x952E;&#xFF0C;&#x4F1A;&#x63ED;&#x5F00;&#x6240;&#x6709;&#x7684;&#x8C1C;&#x9898;</p><h3 id="articleHeader5">&#x89E3;&#x5F00;&#x8C1C;&#x9898;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="inline int Start(Isolate* isolate, IsolateData* isolate_data,
                 int argc, const char* const* argv,
                 int exec_argc, const char* const* exec_argv) {
  HandleScope handle_scope(isolate);
  // &#x5E38;&#x89C4;&#x5957;&#x8DEF;
  Local&lt;Context&gt; context = NewContext(isolate);
  Context::Scope context_scope(context);
  Environment env(isolate_data, context, v8_platform.GetTracingAgentWriter());
  env.Start(argc, argv, exec_argc, exec_argv, v8_is_profiling);
  // ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs java"><code><span class="hljs-function">inline <span class="hljs-keyword">int</span> <span class="hljs-title">Start</span><span class="hljs-params">(Isolate* isolate, IsolateData* isolate_data,
                 <span class="hljs-keyword">int</span> argc, <span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>* <span class="hljs-keyword">const</span>* argv,
                 <span class="hljs-keyword">int</span> exec_argc, <span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>* <span class="hljs-keyword">const</span>* exec_argv)</span> </span>{
  <span class="hljs-function">HandleScope <span class="hljs-title">handle_scope</span><span class="hljs-params">(isolate)</span></span>;
  <span class="hljs-comment">// &#x5E38;&#x89C4;&#x5957;&#x8DEF;</span>
  Local&lt;Context&gt; context = NewContext(isolate);
  Context::<span class="hljs-function">Scope <span class="hljs-title">context_scope</span><span class="hljs-params">(context)</span></span>;
  <span class="hljs-function">Environment <span class="hljs-title">env</span><span class="hljs-params">(isolate_data, context, v8_platform.GetTracingAgentWriter()</span>)</span>;
  env.Start(argc, argv, exec_argc, exec_argv, v8_is_profiling);
  <span class="hljs-comment">// ...</span></code></pre><p>&#x53EF;&#x4EE5;&#x89C1;&#x5230;<code>v8</code>&#x7684;&#x5E38;&#x89C1;&#x5957;&#x8DEF;&#xFF0C;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0A;&#x4E0B;&#x6587;&#x5C31;&#x662F;<code>js</code>&#x7684;&#x6267;&#x884C;&#x73AF;&#x5883;&#xFF0C;<code>Context::Scope</code>&#x662F;&#x7528;&#x6765;&#x7BA1;&#x7406;&#x8FD9;&#x4E2A;<code>Context</code>&#xFF0C;<code>Environment</code>&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;<code>node</code>&#x7684;&#x8FD0;&#x884C;&#x73AF;&#x5883;&#xFF0C;&#x8BB0;&#x5F55;&#x4E86;<code>isolate,event loop</code>&#x7B49;&#xFF0C;<code>Start</code>&#x7684;&#x8FC7;&#x7A0B;&#x4E3B;&#x8981;&#x662F;&#x505A;&#x4E86;&#x4E00;&#x4E9B;<code>libuv</code>&#x7684;&#x521D;&#x59CB;&#x5316;&#x4EE5;&#x53CA;<code>process</code>&#x5BF9;&#x8C61;&#x7684;&#x5B9A;&#x4E49;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  auto process_template = FunctionTemplate::New(isolate());
  process_template-&gt;SetClassName(FIXED_ONE_BYTE_STRING(isolate(), &quot;process&quot;));

  auto process_object =
      process_template-&gt;GetFunction()-&gt;NewInstance(context()).ToLocalChecked();
  set_process_object(process_object);

  SetupProcessObject(this, argc, argv, exec_argc, exec_argv);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>  auto process_template = FunctionTemplate::New(isolate())<span class="hljs-comment">;</span>
  process_template-&gt;SetClassName(FIXED_ONE_BYTE_STRING(isolate(), <span class="hljs-string">&quot;process&quot;</span>))<span class="hljs-comment">;</span>

  auto process_object =
      process_template-&gt;GetFunction()-&gt;NewInstance(<span class="hljs-built_in">context</span>()).ToLocalChecked()<span class="hljs-comment">;</span>
  set_process_object(process_object)<span class="hljs-comment">;</span>

  SetupProcessObject(this, argc, argv, exec_argc, exec_argv)<span class="hljs-comment">;</span></code></pre><p><code>SetupProcessObject</code>&#x751F;&#x6210;&#x4E86;&#x4E00;&#x4E2A;<code>c++</code>&#x5C42;&#x9762;&#x4E0A;&#x7684;<code>process</code>&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;&#x5DF2;&#x7ECF;&#x57FA;&#x672C;&#x4E0A;&#x548C;&#x5E73;&#x65F6;<code>node</code>&#x4E2D;&#x7684;<code>process</code>&#x5BF9;&#x8C61;&#x4E00;&#x81F4;&#xFF0C;&#x4F46;&#x662F;&#x8FD8;&#x4F1A;&#x6709;&#x4E00;&#x4E9B;&#x51FA;&#x5165;&#xFF0C;&#x6BD4;&#x5982;&#x6CA1;&#x6709;<code>binding</code>&#x7B49;&#xFF0C;&#x5B8C;&#x6210;&#x4E86;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E4B;&#x540E;&#x5C31;&#x5F00;&#x59CB;&#x4E86;<code>LoadEnvironment</code></p><h4>LoadEnvironment</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Local&lt;String&gt; loaders_name =
    FIXED_ONE_BYTE_STRING(env-&gt;isolate(), &quot;internal/bootstrap/loaders.js&quot;);
MaybeLocal&lt;Function&gt; loaders_bootstrapper =
    GetBootstrapper(env, LoadersBootstrapperSource(env), loaders_name);
Local&lt;String&gt; node_name =
    FIXED_ONE_BYTE_STRING(env-&gt;isolate(), &quot;internal/bootstrap/node.js&quot;);
MaybeLocal&lt;Function&gt; node_bootstrapper =
    GetBootstrapper(env, NodeBootstrapperSource(env), node_name);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>Local&lt;String&gt; loaders_name =
    FIXED_ONE_BYTE_STRING(<span class="hljs-name">env-&gt;isolate</span>(), <span class="hljs-string">&quot;internal/bootstrap/loaders.js&quot;</span>)<span class="hljs-comment">;</span>
MaybeLocal&lt;Function&gt; loaders_bootstrapper =
    GetBootstrapper(<span class="hljs-name">env</span>, LoadersBootstrapperSource(<span class="hljs-name">env</span>), loaders_name)<span class="hljs-comment">;</span>
Local&lt;String&gt; node_name =
    FIXED_ONE_BYTE_STRING(<span class="hljs-name">env-&gt;isolate</span>(), <span class="hljs-string">&quot;internal/bootstrap/node.js&quot;</span>)<span class="hljs-comment">;</span>
MaybeLocal&lt;Function&gt; node_bootstrapper =
    GetBootstrapper(<span class="hljs-name">env</span>, NodeBootstrapperSource(<span class="hljs-name">env</span>), node_name)<span class="hljs-comment">;</span></code></pre><p>&#x5148;&#x5C06;<code>lib/internal/bootstrap</code>&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x7684;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x8BFB;&#x8FDB;&#x6765;&#xFF0C;&#x7136;&#x540E;&#x5229;&#x7528;<code>GetBootstrapper</code>&#x6765;&#x6267;&#x884C;<code>js</code>&#x4EE3;&#x7801;&#x5206;&#x522B;&#x5F97;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E00;&#x6B65;&#x6B65;&#x6765;&#x770B;&#xFF0C;&#x5148;&#x770B;&#x770B;<code>GetBootstrapper</code>&#x4E3A;&#x4EC0;&#x4E48;&#x53EF;&#x4EE5;&#x6267;&#x884C;<code>js</code>&#x4EE3;&#x7801;&#xFF0C;&#x67E5;&#x770B;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x4E3B;&#x8981;&#x662F;&#x56E0;&#x4E3A;<code>ExecuteString</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MaybeLocal&lt;v8::Script&gt; script =
    v8::Script::Compile(env-&gt;context(), source, &amp;origin);
...
MaybeLocal&lt;Value&gt; result = script.ToLocalChecked()-&gt;Run(env-&gt;context());" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>MaybeLocal&lt;v8::Script&gt; script =
    v8::Script::Compile(env-&gt;context(), source, &amp;origin);
...
MaybeLocal&lt;Value&gt; result = script.ToLocalChecked()-&gt;Run(env-&gt;context());</code></pre><p>&#x8FD9;&#x4E2A;&#x4E3B;&#x8981;&#x5229;&#x7528;&#x4E86;<code>v8</code>&#x7684;&#x80FD;&#x529B;&#xFF0C;&#x5BF9;<code>js</code>&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x4E86;&#x89E3;&#x6790;&#x548C;&#x6267;&#x884C;&#xFF0C;&#x6253;&#x5F00;<code>loaders.js</code>&#x770B;&#x770B;&#x5176;&#x53C2;&#x6570;&#xFF0C;&#x9700;&#x8981;&#x4E94;&#x4E2A;&#xFF0C;&#x6361;&#x4E24;&#x4E2A;&#x6700;&#x91CD;&#x8981;&#x7684;&#x6765;&#x8BF4;&#xFF0C;&#x5206;&#x522B;&#x662F;<code>process</code>&#x548C;<code>getBinding</code>&#xFF0C;&#x8FD9;&#x91CC;&#x9762;&#x5F80;&#x540E;&#x7EE7;&#x7EED;&#x770B;<code>LoadEnvironment</code>&#x53D1;&#x73B0;<code>process</code>&#x5BF9;&#x8C61;&#x5C31;&#x662F;&#x521A;&#x521A;&#x751F;&#x6210;&#x7684;&#xFF0C;&#x800C;<code>getBinding</code>&#x662F;&#x51FD;&#x6570;<code>GetBinding</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node_module* mod = get_builtin_module(*module_v);
Local&lt;Object&gt; exports;
if (mod != nullptr) {
  exports = InitModule(env, mod, module);
} else if (!strcmp(*module_v, &quot;constants&quot;)) {
  exports = Object::New(env-&gt;isolate());
  CHECK(exports-&gt;SetPrototype(env-&gt;context(),
                              Null(env-&gt;isolate())).FromJust());
  DefineConstants(env-&gt;isolate(), exports);
} else if (!strcmp(*module_v, &quot;natives&quot;)) { // NativeModule _source
  exports = Object::New(env-&gt;isolate());
  DefineJavaScript(env, exports);
} else {
  return ThrowIfNoSuchModule(env, *module_v);
}

args.GetReturnValue().Set(exports);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>node_module* <span class="hljs-built_in">mod</span> = get_builtin_module(*module_v);
Local&lt;Object&gt; exports;
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">mod</span> != nullptr) {
  exports = InitModule(env, <span class="hljs-built_in">mod</span>, module);
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!strcmp(*module_v, <span class="hljs-string">&quot;constants&quot;</span>)) {
  <span class="hljs-function"><span class="hljs-title">exports</span> = Object::New(env-&gt;</span>isolate());
  CHECK(<span class="hljs-function"><span class="hljs-title">exports</span>-&gt;</span>S<span class="hljs-function"><span class="hljs-title">etPrototype</span>(env-&gt;</span>context(),
                              N<span class="hljs-function"><span class="hljs-title">ull</span>(env-&gt;</span>isolate())).FromJust());
  D<span class="hljs-function"><span class="hljs-title">efineConstants</span>(env-&gt;</span>isolate(), exports);
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!strcmp(*module_v, <span class="hljs-string">&quot;natives&quot;</span>)) { <span class="hljs-comment">// NativeModule _source</span>
  <span class="hljs-function"><span class="hljs-title">exports</span> = Object::New(env-&gt;</span>isolate());
  DefineJavaScript(env, exports);
} <span class="hljs-keyword">else</span> {
  return ThrowIfNoSuchModule(env, *module_v);
}

args.GetReturnValue().Set(exports);</code></pre><p>&#x5176;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x6839;&#x636E;&#x4F20;&#x53C2;&#x6765;&#x521D;&#x59CB;&#x5316;&#x6307;&#x5B9A;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5F53;&#x7136;&#x4E5F;&#x6709;&#x6BD4;&#x8F83;&#x7279;&#x6B8A;&#x7684;&#x4E24;&#x4E2A;&#x5206;&#x522B;&#x662F;<code>constants</code>&#x548C;<code>natives</code>&#xFF08;&#x540E;&#x9762;&#x518D;&#x770B;&#xFF09;&#xFF0C;<code>get_builtin_module</code>&#x8C03;&#x7528;&#x7684;&#x5C31;&#x662F;<code>FindModule</code>&#xFF0C;&#x8FD8;&#x8BB0;&#x5F97;&#x4E4B;&#x524D;&#x5728;<code>Init</code>&#x8FC7;&#x7A0B;&#x4E2D;&#x5C06;&#x6A21;&#x5757;&#x90FD;&#x6CE8;&#x518C;&#x5230;&#x7684;&#x94FE;&#x8868;&#x5417;&#xFF1F;<code>FindModule</code>&#x5C31;&#x662F;&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x94FE;&#x8868;&#x627E;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="struct node_module* mp;
for (mp = list; mp != nullptr; mp = mp-&gt;nm_link) {
  if (strcmp(mp-&gt;nm_modname, name) == 0)
    break;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cpp"><code><span class="hljs-keyword">struct</span> node_module* mp;
<span class="hljs-keyword">for</span> (mp = <span class="hljs-built_in">list</span>; mp != <span class="hljs-literal">nullptr</span>; mp = mp-&gt;nm_link) {
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">strcmp</span>(mp-&gt;nm_modname, name) == <span class="hljs-number">0</span>)
    <span class="hljs-keyword">break</span>;
}</code></pre><p><code>InitModule</code>&#x5C31;&#x662F;&#x8C03;&#x7528;&#x4E4B;&#x524D;&#x6CE8;&#x518C;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x7684;&#x521D;&#x59CB;&#x5316;&#x51FD;&#x6570;&#xFF0C;&#x8FD8;&#x4EE5;<code>buffer</code>&#x770B;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x662F;&#x6267;&#x884C;<code>node::Buffer::Initialize</code>&#x51FD;&#x6570;&#xFF0C;&#x6253;&#x5F00;&#x7740;&#x51FD;&#x6570;&#x6765;&#x770B;&#x548C;&#x5E73;&#x65F6;&#x5199;addon&#x7684;&#x65B9;&#x5F0F;&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x4F1A;&#x66B4;&#x9732;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x51FA;&#x6765;&#x4F9B;<code>js</code>&#x8C03;&#x7528;&#xFF1B;<code>LoadEnvironment</code>&#x4E0B;&#x9762;&#x5C31;&#x662F;&#x5C06;<code>process, GetBinding</code>&#x7B49;&#x4F5C;&#x4E3A;&#x4F20;&#x5165;&#x4F20;&#x7ED9;&#x4E0A;&#x9762;&#x751F;&#x6210;&#x597D;&#x7684;&#x51FD;&#x6570;&#x5E76;&#x4E14;&#x5229;&#x7528;<code>v8</code>&#x6765;&#x6267;&#x884C;&#xFF0C;&#x6765;&#x5230;&#x4E86;&#x5927;&#x5BB6;&#x719F;&#x6089;&#x7684;&#x9886;&#x57DF;&#xFF0C;&#x6765;&#x770B;&#x770B;<code>loaders.js</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleLoadList = [];
ObjectDefineProperty(process, &apos;moduleLoadList&apos;, {
  value: moduleLoadList,
  configurable: true,
  enumerable: true,
  writable: false
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">moduleLoadList</span> <span class="hljs-string">=</span> <span class="hljs-string">[];</span>
<span class="hljs-string">ObjectDefineProperty(process,</span> <span class="hljs-string">&apos;moduleLoadList&apos;</span><span class="hljs-string">,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  value:</span> <span class="hljs-string">moduleLoadList,</span>
<span class="hljs-attr">  configurable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  enumerable:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">  writable:</span> <span class="hljs-literal">false</span>
<span class="hljs-string">});</span></code></pre><p>&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x7684;Module&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;<code>node</code>&#x901A;&#x8FC7;<code>process.moduleLoadList</code>&#x6765;&#x770B;&#x770B;&#x52A0;&#x8F7D;&#x4E86;&#x591A;&#x5C11;&#x7684;&#x539F;&#x751F;&#x6A21;&#x5757;&#x8FDB;&#x6765;</p><h4>process.binding</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.binding = function binding(module) {
  module = String(module);
  let mod = bindingObj[module];
  if (typeof mod !== &apos;object&apos;) {
    mod = bindingObj[module] = getBinding(module);
    moduleLoadList.push(`Binding ${module}`);
  }
  return mod;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>process.binding = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">binding</span>(<span class="hljs-params">module</span>) </span>{
  <span class="hljs-built_in">module</span> = <span class="hljs-built_in">String</span>(<span class="hljs-built_in">module</span>);
  <span class="hljs-keyword">let</span> mod = bindingObj[<span class="hljs-built_in">module</span>];
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> mod !== <span class="hljs-string">&apos;object&apos;</span>) {
    mod = bindingObj[<span class="hljs-built_in">module</span>] = getBinding(<span class="hljs-built_in">module</span>);
    moduleLoadList.push(<span class="hljs-string">`Binding <span class="hljs-subst">${<span class="hljs-built_in">module</span>}</span>`</span>);
  }
  <span class="hljs-keyword">return</span> mod;
};</code></pre><p>&#x7EC8;&#x4E8E;&#x5230;&#x4E86;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x7FFB;&#x770B;<code>lib</code>&#x4E2D;&#x7684;<code>js</code>&#x6587;&#x4EF6;&#xFF0C;&#x6709;&#x7740;&#x975E;&#x5E38;&#x591A;&#x7684;&#x8FD9;&#x79CD;&#x8C03;&#x7528;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x5BF9;<code>GetBinding</code>&#x505A;&#x4E86;&#x4E00;&#x4E2A;<code>js</code>&#x5C42;&#x9762;&#x7684;&#x5C01;&#x88C5;&#xFF0C;&#x505A;&#x7684;&#x65E0;&#x975E;&#x662F;&#x67E5;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x662F;&#x5426;&#x5DF2;&#x7ECF;&#x52A0;&#x8F7D;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x662F;&#x7684;&#x8BDD;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x56DE;&#x53BB;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x6B21;&#x521D;&#x59CB;&#x5316;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5229;&#x7528;<code>prcoess.binding</code>&#x52A0;&#x8F7D;&#x4E86;&#x5BF9;&#x5E94;&#x7684;<code>c++</code>&#x6A21;&#x5757;&#xFF08;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x4E00;&#x4E0B;<code>process.binding(&apos;buffer&apos;)</code>&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53BB;<code>node_buffer.cc</code>&#x4E2D;&#x770B;&#x770B;&#xFF09;&#x7EE7;&#x7EED;&#x5411;&#x4E0B;&#x770B;&#xFF0C;&#x4F1A;&#x53D1;&#x73B0;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;<code>class</code>&#x5C31;&#x662F;<code>NativeModule</code>&#xFF0C;&#x53D1;&#x73B0;&#x5176;&#x6709;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x5C5E;&#x6027;&#xFF1A;</p><h4>&#x52A0;&#x8F7D;js</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NativeModule._source = getBinding(&apos;natives&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code style="word-break:break-word;white-space:initial">NativeModule.<span class="hljs-variable">_source</span> = getBinding(<span class="hljs-string">&apos;natives&apos;</span>);</code></pre><p>&#x8FD4;&#x56DE;&#x5230;<code>GetBinding</code>&#x51FD;&#x6570;&#xFF0C;&#x770B;&#x5230;&#x7684;&#x662F;&#x4E00;&#x4E2A;<code>if</code>&#x5206;&#x652F;&#x5C31;&#x662F;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports = Object::New(env-&gt;isolate());
DefineJavaScript(env, exports);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs delphi"><code><span class="hljs-keyword">exports</span> = <span class="hljs-keyword">Object</span>::New(env-&gt;isolate());
DefineJavaScript(env, <span class="hljs-keyword">exports</span>);</code></pre><p>&#x6765;&#x770B;&#x770B;<code>DefineJavaScript</code>&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#x6837;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x53D1;&#x73B0;&#x53EA;&#x80FD;&#x5728;&#x5934;&#x6587;&#x4EF6;&#xFF08;<code>node_javascript.h</code>&#xFF09;&#x91CC;&#x9762;&#x627E;&#x5230;&#xFF0C;&#x4F46;&#x662F;&#x6839;&#x672C;&#x627E;&#x4E0D;&#x5230;&#x5177;&#x4F53;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x662F;&#x4E2A;&#x4EC0;&#x4E48;&#x9B3C;&#xFF1F;&#xFF1F;&#xFF1F;&#x53BB;&#x7FFB;&#x4E00;&#x4E0B;<code>node.gyp</code>&#x6587;&#x4EF6;&#x53D1;&#x73B0;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x7528;<code>js2c.py</code>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x751F;&#x6210;&#x7684;&#xFF0C;&#x53BB;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;<code>python</code>&#x6587;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x8BB8;&#x591A;&#x7684;&#x4EE3;&#x7801;&#x6A21;&#x677F;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x90FD;&#x662F;&#x7528;<code>Render</code>&#x8FD4;&#x56DE;&#x7684;&#xFF0C;<code>data</code>&#x53C2;&#x6570;&#x5C31;&#x662F;<code>js</code>&#x6587;&#x4EF6;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x88AB;&#x8F6C;&#x6362;&#x4E3A;<code>c++</code>&#x4E2D;&#x7684;<code>byte</code>&#x6570;&#x7EC4;&#xFF0C;&#x540C;&#x65F6;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x90FD;&#x662F;&#x90A3;&#x4E9B;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x8FD8;&#x662F;&#x5728;<code>node.gyp</code>&#x4E2D;&#xFF0C;&#x5C31;&#x662F;<code>library_files</code>&#x6570;&#x7EC4;&#xFF0C;&#x53D1;&#x73B0;&#x5305;&#x542B;&#x4E86;<code>lib</code>&#x4E0B;&#x7684;&#x6240;&#x6709;&#x7684;&#x6587;&#x4EF6;&#x548C;&#x4E00;&#x4E9B;<code>dep</code>&#x4E0B;&#x7684;<code>js</code>&#x6587;&#x4EF6;&#xFF0C;<code>DefineJavaScript</code>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x505A;&#x7684;&#x5C31;&#x662F;&#x5C06;&#x5F85;&#x6267;&#x884C;&#x7684;<code>js</code>&#x4EE3;&#x7801;&#x6CE8;&#x518C;&#x4E0B;&#xFF0C;&#x6240;&#x4EE5;<code>NativeModule._source</code>&#x4E2D;&#x5B58;&#x50A8;&#x7684;&#x662F;&#x4E00;&#x4E9B;&#x5F85;&#x6267;&#x884C;&#x7684;<code>js</code>&#x4EE3;&#x7801;&#xFF0C;&#x6765;&#x770B;&#x4E00;&#x4E0B;<code>NativeModule.require</code>&#xFF1A;</p><h4>NativeModule</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cached = NativeModule.getCached(id);
if (cached &amp;&amp; (cached.loaded || cached.loading)) {
  return cached.exports;
}
moduleLoadList.push(`NativeModule ${id}`);

const nativeModule = new NativeModule(id);

nativeModule.cache();
nativeModule.compile();

return nativeModule.exports;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code>const <span class="hljs-keyword">cached </span>= NativeModule.getCached(id)<span class="hljs-comment">;</span>
if (<span class="hljs-keyword">cached </span>&amp;&amp; (<span class="hljs-keyword">cached.loaded </span><span class="hljs-title">||</span> <span class="hljs-keyword">cached.loading)) </span>{
  return <span class="hljs-keyword">cached.exports;
</span>}
moduleLoadList.push(`NativeModule ${id}`)<span class="hljs-comment">;</span>

const nativeModule = new NativeModule(id)<span class="hljs-comment">;</span>

nativeModule.<span class="hljs-keyword">cache();
</span>nativeModule.compile()<span class="hljs-comment">;</span>

return nativeModule.exports<span class="hljs-comment">;</span></code></pre><p>&#x53EF;&#x4EE5;&#x53D1;&#x73B0;<code>NativeModule</code>&#x4E5F;&#x6709;&#x7740;&#x7F13;&#x5B58;&#x7684;&#x7B56;&#x7565;&#xFF0C;<code>require</code>&#x5148;&#x628A;&#x5176;&#x653E;&#x5230;<code>_cache</code>&#x4E2D;&#x518D;&#x6B21;<code>require</code>&#x5C31;&#x4E0D;&#x4F1A;&#x50CF;&#x7B2C;&#x4E00;&#x6B21;&#x90A3;&#x6837;&#x6267;&#x884C;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;&#x7528;&#x7F13;&#x5B58;&#x4E2D;&#x6267;&#x884C;&#x597D;&#x7684;&#xFF0C;&#x540E;&#x9762;&#x8BF4;&#x7684;<code>Module</code>&#x4E0E;&#x5176;&#x540C;&#x7406;&#xFF0C;&#x770B;&#x4E00;&#x4E0B;<code>compile</code>&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let source = NativeModule.getSource(this.id);
source = NativeModule.wrap(source);

NativeModule.wrap = function(script) {
  return NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
};
NativeModule.wrapper = [
  &apos;(function (exports, require, module, process) {&apos;,
  &apos;\n});&apos;
];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code><span class="hljs-built_in">let</span> <span class="hljs-built_in">source</span> = NativeModule.getSource(this.id);
<span class="hljs-built_in">source</span> = NativeModule.wrap(<span class="hljs-built_in">source</span>);

NativeModule.wrap = <span class="hljs-keyword">function</span>(script) {
  <span class="hljs-built_in">return</span> NativeModule.wrapper[0] + script + NativeModule.wrapper[1];
};
NativeModule.wrapper = [
  <span class="hljs-string">&apos;(function (exports, require, module, process) {&apos;</span>,
  <span class="hljs-string">&apos;\n});&apos;</span>
];</code></pre><p>&#x9996;&#x5148;&#x4ECE;<code>_source</code>&#x4E2D;&#x53D6;&#x51FA;&#x76F8;&#x5E94;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x7136;&#x540E;&#x5BF9;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x5305;&#x88F9;&#x6210;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6267;&#x884C;&#x51FD;&#x6570;&#x7528;&#x7684;&#x662F;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const script = new ContextifyScript(
  source, this.filename, 0, 0,
  codeCache[this.id], false, undefined
);

this.script = script;
const fn = script.runInThisContext(-1, true, false);
const requireFn = this.id.startsWith(&apos;internal/deps/&apos;) ?
  NativeModule.requireForDeps :
  NativeModule.require;
fn(this.exports, requireFn, this, process);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>const script = new ContextifyScript(
  source, <span class="hljs-keyword">this</span>.filename, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>,
  codeCache[<span class="hljs-keyword">this</span>.id], <span class="hljs-literal">false</span>, undefined
);

<span class="hljs-keyword">this</span>.script = script;
const fn = script.runInThisContext(<span class="hljs-number">-1</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>);
const requireFn = <span class="hljs-keyword">this</span>.id.startsWith(<span class="hljs-string">&apos;internal/deps/&apos;</span>) ?
  NativeModule.requireForDeps :
  NativeModule.require;
fn(<span class="hljs-keyword">this</span>.exports, requireFn, <span class="hljs-keyword">this</span>, process);</code></pre><p>&#x672C;&#x8D28;&#x4E0A;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x4E86;<code>vm</code>&#x7F16;&#x8BD1;&#x81EA;&#x5987;&#x4EA7;&#x5F97;&#x5230;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x7ED9;&#x5176;&#x4F20;&#x5165;&#x4E86;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x5E76;&#x6267;&#x884C;&#xFF0C;<code>this.exports</code>&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;<code>require</code>&#x533A;&#x5206;&#x4E86;&#x4E00;&#x4E0B;&#x662F;&#x5426;&#x52A0;&#x8F7D;<code>node</code>&#x4F9D;&#x8D56;&#x7684;<code>js</code>&#x6587;&#x4EF6;&#xFF0C;<code>this</code>&#x4E5F;&#x5C31;&#x662F;&#x53C2;&#x6570;<code>module</code>&#xFF0C;&#x8FD9;&#x4E5F;&#x8BF4;&#x660E;&#x4E86;&#x4E24;&#x8005;&#x7684;&#x5173;&#x7CFB;&#xFF0C;<code>exports</code>&#x5C31;&#x662F;<code>module</code>&#x7684;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4E5F;&#x89E3;&#x91CA;&#x4E86;&#x4E3A;&#x4EC0;&#x4E48;<code>exports.xx</code>&#x4E4B;&#x540E;&#x518D;&#x6307;&#x5B9A;<code>module.exports = yy</code>&#x4F1A;&#x5C06;<code>xx</code>&#x5FFD;&#x7565;&#x6389;&#xFF0C;&#x8FD8;&#x8BB0;&#x5F97;<code>LoadEnvironment</code>&#x5417;&#xFF1F;<code>bootstrap/loaders.js</code>&#x6267;&#x884C;&#x5B8C;&#x4E4B;&#x540E;&#x6267;&#x884C;&#x4E86;<code>bootstrap/node.js</code>&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x662F;<code>node</code>&#x771F;&#x6B63;&#x7684;&#x5165;&#x53E3;&#xFF0C;&#x6BD4;&#x5982;&#x5B9A;&#x4E49;&#x4E86;<code>global</code>&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6BD4;&#x5982;<code>console setTimeout</code>&#x7B49;&#xFF0C;&#x7531;&#x4E8E;&#x7BC7;&#x5E45;&#x6709;&#x9650;&#xFF0C;&#x6765;&#x6311;&#x4E00;&#x4E2A;&#x6700;&#x5E38;&#x7528;&#x7684;&#x573A;&#x666F;&#xFF0C;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x4E2A;&#x662F;&#x4EC0;&#x4E48;&#x4E00;&#x56DE;&#x4E8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else if (process.argv[1] &amp;&amp; process.argv[1] !== &apos;-&apos;) {
  const path = NativeModule.require(&apos;path&apos;);
  process.argv[1] = path.resolve(process.argv[1]);

  const CJSModule = NativeModule.require(&apos;internal/modules/cjs/loader&apos;);
  ...
  CJSModule.runMain();
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-built_in">else</span> <span class="hljs-built_in">if</span> (<span class="hljs-built_in">process</span>.argv[<span class="hljs-number">1</span>] &amp;&amp; <span class="hljs-built_in">process</span>.argv[<span class="hljs-number">1</span>] !== <span class="hljs-string">&apos;-&apos;</span>) {
  <span class="hljs-keyword">const</span> path = NativeModule.require(<span class="hljs-string">&apos;path&apos;</span>);
  <span class="hljs-built_in">process</span>.argv[<span class="hljs-number">1</span>] = path.resolve(<span class="hljs-built_in">process</span>.argv[<span class="hljs-number">1</span>]);

  <span class="hljs-keyword">const</span> CJSModule = NativeModule.require(<span class="hljs-string">&apos;internal/modules/cjs/loader&apos;</span>);
  ...
  CJSModule.runMain();
}</code></pre><p>&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x719F;&#x6089;&#x7684;<code>node index.js</code>&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7684;&#x5BF9;&#x4E8E;&#x5F00;&#x53D1;&#x8005;&#x81EA;&#x5DF1;&#x7684;<code>js</code>&#x6765;&#x8BF4;&#xFF0C;&#x5728;<code>node</code>&#x4E2D;&#x5BF9;&#x5E94;&#x7684;<code>class</code>&#x662F;<code>Module</code>&#xFF0C;&#x76F8;&#x4FE1;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5927;&#x5BB6;&#x5F88;&#x591A;&#x4EBA;&#x90FD;&#x4E86;&#x89E3;&#xFF0C;&#x4E0E;<code>NativeModule</code>&#x76F8;&#x7C7B;&#x4F3C;&#xFF0C;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x9700;&#x8981;&#x8FDB;&#x884C;&#x8DEF;&#x5F84;&#x7684;&#x89E3;&#x6790;&#x548C;&#x6A21;&#x5757;&#x7684;&#x67E5;&#x627E;&#x7B49;&#xFF0C;&#x6765;&#x5927;&#x81F4;&#x7684;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5148;&#x4ECE;&#x4E0A;&#x9762;&#x8C03;&#x7528;&#x7684;<code>runMain</code>&#x6765;&#x770B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (experimentalModules) {
  // ...
} else {
  Module._load(process.argv[1], null, true);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-keyword">if</span> (experimentalModules) {
  <span class="hljs-comment">// ...</span>
} <span class="hljs-keyword">else</span> {
  Module._load(process.argv[<span class="hljs-number">1</span>], <span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>);
}</code></pre><h4>Module</h4><p><code>node</code>&#x4E2D;&#x5F00;&#x542F;<code>--experimental-modules</code>&#x53EF;&#x4EE5;&#x52A0;&#x8F7D;<code>es</code>&#x6A21;&#x5757;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53EF;&#x4EE5;&#x4E0D;&#x7528;<code>babel</code>&#x8F6C;&#x4E49;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>import/export</code>&#x5566;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0D;&#x662F;&#x91CD;&#x70B9;&#xFF0C;&#x91CD;&#x70B9;&#x6765;&#x770B;&#x666E;&#x901A;&#x7684;<code>commonnjs</code>&#x6A21;&#x5757;&#xFF0C;<code>process.argv[1]</code>&#x4E00;&#x822C;&#x5C31;&#x662F;&#x8981;&#x6267;&#x884C;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4E0B;&#x9762;&#x770B;&#x770B;<code>Module._load</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Module._load = function(request, parent, isMain) {
  if (parent) {
    debug(&apos;Module._load REQUEST %s parent: %s&apos;, request, parent.id);
  }
  // &#x67E5;&#x627E;&#x6587;&#x4EF6;&#x5177;&#x4F53;&#x4F4D;&#x7F6E;
  var filename = Module._resolveFilename(request, parent, isMain);

  // &#x5B58;&#x5728;&#x7F13;&#x5B58;&#xFF0C;&#x5219;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x6B21;&#x6267;&#x884C;
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    updateChildren(parent, cachedModule, true);
    return cachedModule.exports;
  }

  // &#x52A0;&#x8F7D;node&#x539F;&#x751F;&#x6A21;&#x5757;&#xFF0C;&#x539F;&#x751F;&#x6A21;&#x5757;&#x4E0D;&#x9700;&#x8981;&#x7F13;&#x5B58;&#xFF0C;&#x56E0;&#x4E3A;NativeModule&#x4E2D;&#x4E5F;&#x5B58;&#x5728;&#x7F13;&#x5B58;
  if (NativeModule.nonInternalExists(filename)) {
    debug(&apos;load native module %s&apos;, request);
    return NativeModule.require(filename);
  }

  // &#x52A0;&#x8F7D;&#x5E76;&#x6267;&#x884C;&#x4E00;&#x4E2A;&#x6A21;&#x5757;
  var module = new Module(filename, parent);

  if (isMain) {
    process.mainModule = module;
    module.id = &apos;.&apos;;
  }

  Module._cache[filename] = module;

  // &#x8C03;&#x7528;load&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x52A0;&#x8F7D;
  tryModuleLoad(module, filename);

  return module.exports;
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code>Module._load = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, parent, isMain</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">parent</span>) {
    debug(<span class="hljs-string">&apos;Module._load REQUEST %s parent: %s&apos;</span>, request, <span class="hljs-built_in">parent</span>.id);
  }
  <span class="hljs-comment">// &#x67E5;&#x627E;&#x6587;&#x4EF6;&#x5177;&#x4F53;&#x4F4D;&#x7F6E;</span>
  <span class="hljs-built_in">var</span> filename = Module._resolveFilename(request, <span class="hljs-built_in">parent</span>, isMain);

  <span class="hljs-comment">// &#x5B58;&#x5728;&#x7F13;&#x5B58;&#xFF0C;&#x5219;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x6B21;&#x6267;&#x884C;</span>
  <span class="hljs-built_in">var</span> cachedModule = Module._cache[filename];
  <span class="hljs-keyword">if</span> (cachedModule) {
    updateChildren(<span class="hljs-built_in">parent</span>, cachedModule, <span class="hljs-literal">true</span>);
    <span class="hljs-keyword">return</span> cachedModule.exports;
  }

  <span class="hljs-comment">// &#x52A0;&#x8F7D;node&#x539F;&#x751F;&#x6A21;&#x5757;&#xFF0C;&#x539F;&#x751F;&#x6A21;&#x5757;&#x4E0D;&#x9700;&#x8981;&#x7F13;&#x5B58;&#xFF0C;&#x56E0;&#x4E3A;NativeModule&#x4E2D;&#x4E5F;&#x5B58;&#x5728;&#x7F13;&#x5B58;</span>
  <span class="hljs-keyword">if</span> (NativeModule.nonInternalExists(filename)) {
    debug(<span class="hljs-string">&apos;load native module %s&apos;</span>, request);
    <span class="hljs-keyword">return</span> NativeModule.require(filename);
  }

  <span class="hljs-comment">// &#x52A0;&#x8F7D;&#x5E76;&#x6267;&#x884C;&#x4E00;&#x4E2A;&#x6A21;&#x5757;</span>
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">module</span> = <span class="hljs-keyword">new</span> Module(filename, <span class="hljs-built_in">parent</span>);

  <span class="hljs-keyword">if</span> (isMain) {
    process.mainModule = <span class="hljs-built_in">module</span>;
    <span class="hljs-built_in">module</span>.id = <span class="hljs-string">&apos;.&apos;</span>;
  }

  Module._cache[filename] = <span class="hljs-built_in">module</span>;

  <span class="hljs-comment">// &#x8C03;&#x7528;load&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x52A0;&#x8F7D;</span>
  tryModuleLoad(<span class="hljs-built_in">module</span>, filename);

  <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.exports;
};</code></pre><p>&#x8FD9;&#x91CC;&#x770B;&#x6BCF;&#x4E00;&#x4E2A;<code>Module</code>&#x6709;&#x4E00;&#x4E2A;<code>parent</code>&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5047;&#x5982;<code>a.js</code>&#x4E2D;&#x5F15;&#x5165;&#x4E86;<code>b.js</code>&#xFF0C;&#x90A3;&#x4E48;<code>Module b</code>&#x7684;<code>parent</code>&#x5C31;&#x662F;<code>Module a</code>&#xFF0C;&#x5229;&#x7528;<code>resolveFilename</code>&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x6587;&#x4EF6;&#x5177;&#x4F53;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x800C;&#x540E;&#x8C03;&#x7528;<code>load</code>&#x51FD;&#x6570;&#x6765;&#x52A0;&#x8F7D;&#x6587;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7684;&#x662F;&#x533A;&#x5206;&#x4E86;&#x51E0;&#x79CD;&#x7C7B;&#x578B;&#xFF0C;&#x5206;&#x522B;&#x662F;<code>.js .json .node</code>&#xFF0C;&#x5BF9;&#x5E94;&#x7684;<code>.js</code>&#x662F;&#x8BFB;&#x6587;&#x4EF6;&#x7136;&#x540E;&#x6267;&#x884C;&#xFF0C;<code>.json</code>&#x662F;&#x76F4;&#x63A5;&#x8BFB;&#x6587;&#x4EF6;&#x540E;<code>JSON.parse</code>&#x4E00;&#x4E0B;&#xFF0C;<code>.node</code>&#x662F;&#x8C03;&#x7528;<code>dlopen</code>&#xFF0C;<code>Module.compile</code>&#x4E8E;<code>NativeModule.compile</code>&#x76F8;&#x7C7B;&#x4F3C;&#x90FD;&#x662F;&#x60F3;&#x5305;&#x88F9;&#x4E00;&#x5C42;&#x6210;&#x4E3A;&#x51FD;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;&#x4E86;<code>vm</code>&#x7F16;&#x8BD1;&#x5F97;&#x5230;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6700;&#x540E;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x6765;&#x6267;&#x884C;&#xFF0C;&#x5BF9;&#x4E8E;<code>Module</code>&#x6765;&#x8BF4;&#xFF0C;&#x5305;&#x88F9;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Module.wrapper = [
  &apos;(function (exports, require, module, __filename, __dirname) { &apos;,
  &apos;\n});&apos;
];" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code>Module.wrapper = [
  &apos;(<span class="hljs-keyword">function</span> <span class="hljs-title"></span>(exports, require, module, __filename, __dirname) { &apos;,
  &apos;\n});&apos;
];</code></pre><p>&#x6267;&#x884C;&#x5B8C;&#x4E0A;&#x8FF0;&#x8FC7;&#x7A0B;&#x540E;&#xFF0C;&#x524D;&#x671F;&#x5DE5;&#x4F5C;&#x5C31;&#x5DF2;&#x7ECF;&#x505A;&#x5F97;&#x6BD4;&#x8F83;&#x5145;&#x5206;&#x4E86;&#xFF0C;&#x518D;&#x6B21;&#x56DE;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;<code>Start</code>&#x51FD;&#x6570;&#x6765;&#x770B;&#xFF0C;&#x4ECE;&#x4EE3;&#x7801;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x5F00;&#x59CB;&#x4E86;<code>node</code>&#x7684;<code>event loop</code>&#xFF0C;&#x8FD9;&#x5C31;&#x662F;<code>node</code>&#x7684;&#x521D;&#x59CB;&#x5316;&#x8FC7;&#x7A0B;&#xFF0C;&#x5173;&#x4E8E;<code>event loop</code>&#x9700;&#x8981;&#x5BF9;<code>libuv</code>&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x4E86;&#x89E3;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;<code>node</code>&#x771F;&#x6B63;&#x79BB;&#x4E0D;&#x5F00;&#x7684;&#x662F;<code>libuv</code>&#xFF0C;&#x5177;&#x4F53;&#x8FD9;&#x65B9;&#x9762;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x53EF;&#x4EE5;&#x7EE7;&#x7EED;&#x5173;&#x6CE8;&#x6211;&#x540E;&#x9762;&#x7684;&#x6587;&#x7AE0;</p><h2 id="articleHeader6">&#x603B;&#x7ED3;</h2><p>&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#xFF0C;&#x4EE5;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x7F13;&#x5B58;&#x7684;&#x60C5;&#x51B5;&#x5F00;&#x770B;&#xFF1A;<code>require(&apos;fs&apos;)</code>&#xFF0C;&#x5148;&#x662F;&#x8C03;&#x7528;&#x4E86;<code>Module.require</code>&#xFF0C;&#x800C;&#x540E;&#x53D1;&#x73B0;&#x4E3A;&#x539F;&#x751F;&#x6A21;&#x5757;&#xFF0C;&#x4E8E;&#x662F;&#x8C03;&#x7528;<code>NativeModule.require</code>&#xFF0C;&#x4ECE;<code>NativeModule._source</code>&#x5C06;<code>lib/fs</code>&#x7684;&#x5185;&#x5BB9;&#x62FF;&#x51FA;&#x6765;&#x5305;&#x88F9;&#x4E00;&#x4E0B;&#x7136;&#x540E;&#x6267;&#x884C;&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x7B2C;&#x4E00;&#x884C;&#x5C31;&#x53EF;&#x4EE5;&#x770B;&#x5230;<code>process.binding</code>&#xFF0C;&#x8FD9;&#x4E2A;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x52A0;&#x8F7D;&#x539F;&#x751F;&#x7684;<code>c++</code>&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x5728;&#x521D;&#x59CB;&#x5316;&#x7684;&#x65F6;&#x5019;&#x5C06;&#x5176;&#x6CE8;&#x518C;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x94FE;&#x8868;&#x4E2D;&#xFF0C;&#x52A0;&#x8F7D;&#x7684;&#x8FC7;&#x7A0B;&#x5C31;&#x662F;&#x5C06;&#x5176;&#x62FF;&#x51FA;&#x6765;&#x7136;&#x540E;&#x6267;&#x884C;</p><p>&#x4EE5;&#x4E0A;&#x5185;&#x5BB9;&#x5982;&#x679C;&#x6709;&#x9519;&#x8BEF;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8FD8;&#x8BF7;&#x5927;&#x4F6C;&#x6307;&#x51FA;&#xFF0C;&#x4E07;&#x5206;&#x611F;&#x6FC0;&#xFF0C;&#x53E6;&#x5916;&#x4E00;&#x4EF6;&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;&#xFF1A;<strong>&#x6211;&#x6240;&#x5728;&#x56E2;&#x961F;&#x4E5F;&#x5728;&#x62DB;&#x4EBA;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x5C06;&#x7B80;&#x5386;&#x53D1;&#x81F3;zhoupeng.1996@bytedance.com</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
nodejs源码—初始化

## 原文链接
[https://segmentfault.com/a/1190000016318567](https://segmentfault.com/a/1190000016318567)


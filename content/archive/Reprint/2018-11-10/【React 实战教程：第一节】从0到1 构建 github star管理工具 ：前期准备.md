---
title: 【React 实战教程：第一节】从0到1 构建 github star管理工具 ：前期准备
hidden: true
categories: reprint
slug: 1d9dfc45
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5728;&#x65E5;&#x5E38;&#x4F7F;&#x7528;github&#x4E2D;&#xFF0C;&#x9664;&#x4E86;&#x5229;&#x7528;git&#x8FDB;&#x884C;&#x9879;&#x76EE;&#x7248;&#x672C;&#x63A7;&#x5236;&#x4E4B;&#x5916;&#xFF0C;&#x6700;&#x591A;&#x7684;&#x7528;&#x5904;&#x5C31;&#x662F;&#x6E38;&#x89C8;&#x5404;&#x5F0F;&#x7684;&#x9879;&#x76EE;&#xFF0C;&#x5728;&#x770B;&#x5230;&#x4E00;&#x4E9B;&#x6709;&#x8DA3;&#x6216;&#x8005;&#x6709;&#x7528;&#x7684;&#x9879;&#x76EE;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x5C31;&#x4F1A;&#x987A;&#x624B;star&#xFF0C;&#x76EE;&#x7684;&#x662F;&#x65E5;&#x540E;&#x518D;&#x770B;&#x3002;&#x4F46;&#x662F;&#x5F53;&#x6211;&#x4EEC;star&#x4E86;&#x8BB8;&#x591A;&#x9879;&#x76EE;&#x4E4B;&#x540E;&#xFF0C;&#x56DE;&#x8FC7;&#x5934;&#x60F3;&#x627E;&#x4E00;&#x4E2A;&#x7684;&#x9879;&#x76EE;&#x5C31;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x5F88;&#x96BE;&#x5728;&#x77ED;&#x65F6;&#x95F4;&#x5185;&#x627E;&#x5230;&#x5B83;&#xFF0C;&#x5B98;&#x65B9;&#x4E5F;&#x5E76;&#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#x5F88;&#x597D;&#x7684;&#x7BA1;&#x7406;&#x6211;&#x4EEC;&#x7684;star&#x9879;&#x76EE;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x5E02;&#x9762;&#x4E0A;&#x4E5F;&#x51FA;&#x73B0;&#x4E86;&#x4E00;&#x4E9B;&#x5BF9;star&#x8FDB;&#x884C;&#x7BA1;&#x7406;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4; <a href="https://app.astralapp.com/auth" rel="nofollow noreferrer" target="_blank">astralapp</a>&#xFF0C;Star Order&#x7B49;&#x7B49;&#xFF0C;&#x5176;&#x5B9E;github&#x7684;&#x63A5;&#x53E3;api&#x90FD;&#x662F;&#x5F00;&#x653E;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x5C5E;&#x4E8E;&#x81EA;&#x5DF1;&#x7684;&#x9879;&#x76EE;&#x7BA1;&#x7406;&#x5DE5;&#x5177;&#x3002;&#x516C;&#x53F8;&#x7684;&#x524D;&#x7AEF;&#x6280;&#x672F;&#x6808;&#x662F;React&#xFF0C;&#x800C;&#x7B14;&#x8005;&#x4E4B;&#x524D;&#x4F7F;&#x7528;&#x7684;&#x662F;Vue&#xFF0C;&#x56E0;&#x6B64;&#x6B63;&#x597D;&#x60F3;&#x5229;&#x7528;github&#x7684;open api &#x81EA;&#x5DF1;&#x6784;&#x5EFA;&#x4E2A;react&#x7684;github star&#x7BA1;&#x7406;&#x9879;&#x76EE;&#x6765;&#x52A0;&#x6DF1;react&#x7684;&#x4F7F;&#x7528;&#x3002;&#x800C;&#x5927;&#x4F53;&#x529F;&#x80FD;&#x6211;&#x4EEC;&#x5C31;&#x6A21;&#x4EFF;astralapp&#x3002;</p><h2 id="articleHeader1">github open api</h2><p>&#x5B98;&#x65B9;&#x6587;&#x6863;&#x6709;v3&#x548C;v4&#xFF0C;2&#x4E2A;&#x7248;&#x672C;&#xFF0C;v3&#x662F;Restful&#xFF0C;v4&#x662F;GraphQL&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x662F;v3&#x7248;</p><h3 id="articleHeader2">v3</h3><p>&#x4F7F;&#x7528;&#x7684;&#x662F;restful &#x534F;&#x8BAE;</p><p>&#x670D;&#x52A1;&#x5668;&#x5730;&#x5740;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://api.github.com" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code style="word-break:break-word;white-space:initial"><span class="hljs-symbol">https:</span><span class="hljs-comment">//api.github.com</span></code></pre><p>&#x5728;&#x65E0;token&#x60C5;&#x51B5;&#x4E0B;&#x4F7F;&#x7528;github&#x7684;api&#xFF0C;&#x6BCF;&#x5206;&#x949F;&#x9650;&#x5236;&#x662F;60&#x6B21;&#x8BF7;&#x6C42;&#xFF0C;&#x8003;&#x8651;&#x5230;&#x60F3;&#x5B8C;&#x6574;&#x7684;&#x4F7F;&#x7528;github&#x7684;api&#xFF0C;&#x56E0;&#x6B64;&#x9009;&#x62E9;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;<a href="https://github.com/settings/applications/new" rel="nofollow noreferrer" target="_blank">web application</a>&#xFF0C;&#x6388;&#x6743;OAuth&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x6D41;&#x7A0B;&#x53EF;&#x4EE5;&#x53C2;&#x7167;<a href="https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#authorizing-oauth-apps" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x3002;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x5C31;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x6D41;&#x7A0B;&#x3002;</p><h3 id="articleHeader3">&#x6388;&#x6743;OAuth2.0 &#x7684;&#x6D41;&#x7A0B;</h3><p>github OAuth&#x7684;&#x6388;&#x6743;&#x6A21;&#x5F0F;&#x4E3A;&#x6388;&#x6743;&#x7801;&#x6A21;&#x5F0F;&#xFF0C;&#x5BF9;OAuth&#x4E0D;&#x4E86;&#x89E3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x5177;&#x4F53;&#x770B;&#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;<a href="http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html" rel="nofollow noreferrer" target="_blank">&#x7406;&#x89E3;OAuth 2.0</a></p><p>&#x8981;&#x505A;&#x7684;&#x6D41;&#x7A0B;&#x4E3B;&#x8981;&#x5206;&#x4E3A;3&#x6B65;</p><ul><li>&#x83B7;&#x53D6;code</li><li>&#x901A;&#x8FC7;code&#x83B7;&#x53D6;token</li><li>&#x5728;&#x8BF7;&#x6C42;&#x65F6;&#x643A;&#x5E26;token</li></ul><h4>&#x83B7;&#x53D6;code</h4><p>&#x9996;&#x5148;&#x9700;&#x8981;&#x8DF3;&#x8F6C;&#x5230;&#x8FD9;&#x4E2A;&#x5730;&#x5740;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://github.com/login/oauth/authorize" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code class="shell" style="word-break:break-word;white-space:initial">https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/login/</span>oauth<span class="hljs-regexp">/authorize</span></code></pre><p>&#x9700;&#x8981;&#x6709;&#x4EE5;&#x4E0B;&#x53C2;&#x6570;</p><table><thead><tr><th>&#x53C2;&#x6570;&#x540D;</th><th>&#x7C7B;&#x578B;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>client_id</td><td>string</td><td>&#x5FC5;&#x9009; client_id&#x662F;&#x5728;&#x6CE8;&#x518C;github application&#x540E;&#x53EF;&#x4EE5;&#x770B;&#x5230;</td></tr><tr><td>redirect_uri</td><td>string</td><td>&#x53EF;&#x9009; &#x6388;&#x6743;&#x6210;&#x529F;&#x540E;&#x8DF3;&#x8F6C;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x8FD9;&#x4E2A;&#x8DF3;&#x8F6C;&#x5730;&#x5740;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x540E;&#x53F0;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;</td></tr><tr><td>scope</td><td>string</td><td>&#x53EF;&#x9009; &#x6743;&#x9650;&#x8303;&#x56F4;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x6743;&#x9650;&#x53EF;&#x4EE5;&#x53C2;&#x7167;&#xFF0C;&#x5177;&#x4F53;&#x4F20;&#x503C;&#x683C;&#x5F0F;&#x4EE5;&#x53CA;&#x9700;&#x8981;&#x54EA;&#x4E9B;&#x8303;&#x56F4;&#x53EF;&#x4EE5;&#x53C2;&#x7167;<a href="https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a></td></tr><tr><td>allow_signup</td><td>string</td><td>&#x53EF;&#x9009; &#x662F;&#x5426;&#x5141;&#x8BB8;&#x4E3A;&#x6CE8;&#x518C;&#x7684;&#x7528;&#x6237;&#x6CE8;&#x518C;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;true</td></tr></tbody></table><p>&#x8DF3;&#x8F6C;&#x81F3;&#x76EE;&#x6807;&#x5730;&#x5740;&#x540E;&#xFF0C;&#x4F1A;&#x6709;&#x4E2A;&#x6388;&#x6743;&#x754C;&#x9762;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x6388;&#x6743;&#x4E4B;&#x540E;&#x4F1A;&#x91CD;&#x65B0;&#x8DF3;&#x8F6C;&#x5230;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x8BBE;&#x5B9A;&#x7684;<code>redirect_uri</code>&#x5E76;&#x643A;&#x5E26;&#x4E00;&#x4E2A;code&#xFF0C;&#x5C31;&#x50CF;&#x8FD9;&#x6837;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;redirect_url&gt;?code=1928596028123" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code style="word-break:break-word;white-space:initial">&lt;redirect_url&gt;?<span class="hljs-meta">code</span><span class="hljs-number">=1928596028123</span></code></pre><h4>&#x901A;&#x8FC7;code&#x83B7;&#x53D6;token</h4><p>&#x5728;&#x83B7;&#x53D6;code&#x4E4B;&#x540E;&#xFF0C;&#x8BF7;&#x6C42;&#x7528;&#x4E8E;&#x83B7;&#x53D6;token</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST https://github.com/login/oauth/access_token" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code class="shell" style="word-break:break-word;white-space:initial">POST https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/login/</span>oauth<span class="hljs-regexp">/access_token</span></code></pre><table><thead><tr><th>&#x53C2;&#x6570;&#x540D;</th><th>&#x7C7B;&#x578B;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>client_id</td><td>string</td><td>&#x5FC5;&#x586B; client_id&#x662F;&#x5728;&#x6CE8;&#x518C;github application&#x540E;&#x53EF;&#x4EE5;&#x770B;&#x5230; &#x5FC5;&#x586B;</td></tr><tr><td>client_secret</td><td>string</td><td>&#x5FC5;&#x586B; &#x8BE5;&#x53C2;&#x6570;&#x662F;&#x5728;&#x540C;<code>client_id</code>&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x662F;&#x5728;&#x6CE8;&#x518C;<code>application</code>&#x540E;&#x53EF;&#x4EE5;&#x770B;&#x5230;</td></tr><tr><td>code</td><td>string</td><td>&#x5FC5;&#x586B; &#x901A;&#x8FC7;&#x7B2C;&#x4E00;&#x6B65;&#x83B7;&#x53D6;</td></tr><tr><td>redirect_uri</td><td>string</td><td>&#x53EF;&#x9009;</td></tr><tr><td>state</td><td>string</td><td>&#x53EF;&#x9009; &#x968F;&#x673A;&#x6570;</td></tr></tbody></table><p>token&#x7684;&#x9ED8;&#x8BA4;&#x8FD4;&#x56DE;&#x683C;&#x5F0F;&#x4E3A;&#x5B57;&#x7B26;&#x4E32;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&amp;token_type=bearer" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs llvm"><code style="word-break:break-word;white-space:initial">access_token=e<span class="hljs-number">72e16</span><span class="hljs-keyword">c</span><span class="hljs-number">7e42</span>f<span class="hljs-number">292</span><span class="hljs-keyword">c</span><span class="hljs-number">6912e7710</span><span class="hljs-keyword">c</span><span class="hljs-number">838347</span>ae<span class="hljs-number">178</span>b<span class="hljs-number">4</span>a&amp;token_type=bearer</code></pre><p>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x66F4;&#x6539;&#x5934;&#x90E8;&#x63A5;&#x53D7;&#x683C;&#x5F0F;&#x8FDB;&#x884C;&#x8FD4;&#x56DE;&#x683C;&#x5F0F;&#x53D8;&#x66F4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Accept: application/json
{&quot;access_token&quot;:&quot;e72e16c7e42f292c6912e7710c838347ae178b4a&quot;, &quot;scope&quot;:&quot;repo,gist&quot;, &quot;token_type&quot;:&quot;bearer&quot;}

Accept: application/xml
&lt;OAuth&gt;
  &lt;token_type&gt;bearer&lt;/token_type&gt;
  &lt;scope&gt;repo,gist&lt;/scope&gt;
  &lt;access_token&gt;e72e16c7e42f292c6912e7710c838347ae178b4a&lt;/access_token&gt;
&lt;/OAuth&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">Accept: application/json
{&quot;access_token&quot;:&quot;e72e16c7e42f292c6912e7710c838347ae178b4a&quot;, &quot;scope&quot;:&quot;repo,gist&quot;, &quot;token_type&quot;:&quot;bearer&quot;}

Accept: application/xml
<span class="hljs-tag">&lt;<span class="hljs-name">OAuth</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">token_type</span>&gt;</span>bearer<span class="hljs-tag">&lt;/<span class="hljs-name">token_type</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">scope</span>&gt;</span>repo,gist<span class="hljs-tag">&lt;/<span class="hljs-name">scope</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">access_token</span>&gt;</span>e72e16c7e42f292c6912e7710c838347ae178b4a<span class="hljs-tag">&lt;/<span class="hljs-name">access_token</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">OAuth</span>&gt;</span></code></pre><h4>&#x5728;&#x8BF7;&#x6C42;&#x65F6;&#x643A;&#x5E26;token</h4><p>&#x643A;&#x5E26;token&#x6709;2&#x79CD;&#x65B9;&#x5F0F; &#x4E00;&#x79CD;&#x662F;&#x6C38;&#x8FDC;&#x8DDF;&#x5728;url&#x7684;&#x540E;&#x9762;&#x4F5C;&#x4E3A;params</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET https://api.github.com/user?access_token=..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code class="shell" style="word-break:break-word;white-space:initial">GET <span class="hljs-string">https:</span><span class="hljs-comment">//api.github.com/user?access_token=...</span></code></pre><p>&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x662F;&#x653E;&#x5728;&#x8BF7;&#x6C42;&#x5934;&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Authorization: token &#x83B7;&#x53D6;&#x5230;&#x7684;token" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code class="shell" style="word-break:break-word;white-space:initial">Authorization: <span class="hljs-built_in">token</span> &#x83B7;&#x53D6;&#x5230;&#x7684;<span class="hljs-built_in">token</span></code></pre><h3 id="articleHeader4">&#x63A5;&#x53E3;&#x8BF7;&#x6C42;</h3><p>&#x5728;&#x9879;&#x76EE;&#x91CC;&#x8FD0;&#x7528;&#x5230;&#x7684;github &#x63A5;&#x53E3; &#x76EE;&#x524D;&#x6709;&#x4E09;&#x4E2A;</p><ul><li>&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;</li><li>&#x5F53;&#x524D;&#x7528;&#x6237;star&#x7684;&#x9879;&#x76EE;</li><li>&#x83B7;&#x53D6;&#x9879;&#x76EE;Readme&#x63A5;&#x53E3;</li></ul><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x8FD9;&#x4E9B;&#x63A5;&#x53E3;&#x7531;&#x4E8E;&#x670D;&#x52A1;&#x7AEF;&#x5B9E;&#x73B0;&#x4E86;CORS&#xFF0C;&#x56E0;&#x6B64;&#x662F;&#x4E0D;&#x5B58;&#x5728;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#xFF0C;&#x4F46;&#x662F;&#xFF0C;&#x8003;&#x8651;&#x5230;&#x672C;&#x8EAB;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x7684;&#x529F;&#x80FD;&#x60C5;&#x51B5;&#xFF0C;&#x4E4B;&#x540E;&#x6211;&#x4EEC;&#x4F1A;&#x81EA;&#x5DF1;&#x5EFA;&#x7ACB;&#x670D;&#x52A1;&#x7AEF;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x3002;</p><h4><a href="https://developer.github.com/v3/users/#get-the-authenticated-user" rel="nofollow noreferrer" target="_blank">&#x7528;&#x6237;&#x4FE1;&#x606F;&#x63A5;&#x53E3;</a></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET https://api.github.com/user" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code class="shell" style="word-break:break-word;white-space:initial">GET <span class="hljs-string">https:</span><span class="hljs-comment">//api.github.com/user</span></code></pre><h4><a href="https://developer.github.com/v3/activity/starring/#list-repositories-being-starred" rel="nofollow noreferrer" target="_blank">&#x5F53;&#x524D;&#x7528;&#x6237;star&#x7684;&#x9879;&#x76EE;</a></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET https://api.github.com/user/starred" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code class="shell" style="word-break:break-word;white-space:initial">GET https:<span class="hljs-regexp">//</span>api.github.com<span class="hljs-regexp">/user/</span>starred</code></pre><p>&#x53EF;&#x9009;&#x7684;&#x8BF7;&#x6C42;&#x53C2;&#x6570;</p><table><thead><tr><th>&#x53C2;&#x6570;&#x540D;</th><th>&#x7C7B;&#x578B;</th><th>&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>page</td><td>string</td><td></td></tr><tr><td>sort</td><td>string</td><td>&#x6392;&#x5E8F;&#x6761;&#x4EF6; &#x6709;2&#x79CD;<code>created</code> <code>updated</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;<code>created</code></td></tr><tr><td>direction</td><td>string</td><td>&#x5347;&#x5E8F;&#x8FD8;&#x662F;&#x5012;&#x5E8F; <code>asc</code> <code>desc</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;``desc</td></tr></tbody></table><h4>&#x83B7;&#x53D6;&#x4ED3;&#x5E93;Readme&#x63A5;&#x53E3;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET https://api.github.com/repos/:username/:repo/readme" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs elixir"><code class="shell" style="word-break:break-word;white-space:initial">GET <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/api.github.com/repos</span><span class="hljs-regexp">/:username/</span><span class="hljs-symbol">:repo/readme</span></code></pre><p>&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x63A5;&#x53E3;&#xFF0C;github&#x63D0;&#x4F9B;&#x4E86;&#x5934;&#x90E8;&#x7C7B;&#x578B;&#x7684;&#x9009;&#x62E9;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#xFF0C;&#x6BD4;&#x5982;raw&#x7B49;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x7684;<a href="https://developer.github.com/v3/repos/contents/#custom-media-types" rel="nofollow noreferrer" target="_blank">Custom media types</a></p><p>&#x5728;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7684;&#x662F;html&#x683C;&#x5F0F;&#xFF0C;&#x56E0;&#x6B64; &#x6211;&#x4EEC;&#x5728;&#x5934;&#x90E8;&#x5F53;&#x4E2D;&#x8BBE;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;Accept&quot;: &quot;application/vnd.github.v3.html&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs 1c"><code style="word-break:break-word;white-space:initial"><span class="hljs-string">&quot;Accept&quot;</span>: <span class="hljs-string">&quot;application/vnd.github.v3.html&quot;</span></code></pre><p>&#x8FD9;&#x6837;ReadMe&#x8FD4;&#x56DE;&#x7684;&#x662F;html&#x4EE3;&#x7801;&#xFF0C;&#x6211;&#x4EEC;&#x6839;&#x636E;html&#x4EE3;&#x7801;&#x76F4;&#x63A5;&#x663E;&#x793A;&#x5373;&#x53EF;&#x3002;</p><h2 id="articleHeader5">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; config  // webpack&#x76F8;&#x5173;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; public  // &#x516C;&#x7528;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; scripts // &#x811A;&#x672C;&#x6587;&#x4EF6; build,start,test&#x6587;&#x4EF6;&#x90FD;&#x5728;&#x91CC;&#x9762;
&#x251C;&#x2500;&#x2500; src
    &#x251C;&#x2500;&#x2500; assets  // &#x81EA;&#x5DF1;&#x653E;&#x7F6E;&#x7684;&#x8D44;&#x6E90;&#x6587;&#x4EF6;
    &#x251C;&#x2500;&#x2500; components  // &#x516C;&#x7528;&#x7EC4;&#x4EF6;
    &#x251C;&#x2500;&#x2500; pages   // &#x9875;&#x9762;&#x6587;&#x4EF6;
    &#x251C;&#x2500;&#x2500; utils   // &#x516C;&#x7528;&#x65B9;&#x6CD5;&#x6587;
    App.css
    App.scss
    App.jsx
    index.css
    index.js
    logo.svg    
    reset.css   // &#x91CD;&#x7F6E;&#x6837;&#x5F0F;
    variable.css
    variable.scss   // &#x516C;&#x7528;&#x53D8;&#x91CF;&#x6587;&#x4EF6;
&#x251C;&#x2500;&#x2500; package.json
&#x251C;&#x2500;&#x2500; .editorconfig   // &#x7F16;&#x8F91;&#x5668;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; .gitignore // git &#x5FFD;&#x7565;&#x6587;&#x4EF6;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="shell">&#x251C;&#x2500;&#x2500; config  <span class="hljs-comment">// webpack&#x76F8;&#x5173;&#x6587;&#x4EF6;</span>
&#x251C;&#x2500;&#x2500; public  <span class="hljs-comment">// &#x516C;&#x7528;&#x6587;&#x4EF6;</span>
&#x251C;&#x2500;&#x2500; scripts <span class="hljs-comment">// &#x811A;&#x672C;&#x6587;&#x4EF6; build,start,test&#x6587;&#x4EF6;&#x90FD;&#x5728;&#x91CC;&#x9762;</span>
&#x251C;&#x2500;&#x2500; src
    &#x251C;&#x2500;&#x2500; assets  <span class="hljs-comment">// &#x81EA;&#x5DF1;&#x653E;&#x7F6E;&#x7684;&#x8D44;&#x6E90;&#x6587;&#x4EF6;</span>
    &#x251C;&#x2500;&#x2500; components  <span class="hljs-comment">// &#x516C;&#x7528;&#x7EC4;&#x4EF6;</span>
    &#x251C;&#x2500;&#x2500; pages   <span class="hljs-comment">// &#x9875;&#x9762;&#x6587;&#x4EF6;</span>
    &#x251C;&#x2500;&#x2500; utils   <span class="hljs-comment">// &#x516C;&#x7528;&#x65B9;&#x6CD5;&#x6587;</span>
    App<span class="hljs-selector-class">.css</span>
    App<span class="hljs-selector-class">.scss</span>
    App<span class="hljs-selector-class">.jsx</span>
    index<span class="hljs-selector-class">.css</span>
    index<span class="hljs-selector-class">.js</span>
    logo<span class="hljs-selector-class">.svg</span>    
    reset<span class="hljs-selector-class">.css</span>   <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x6837;&#x5F0F;</span>
    variable<span class="hljs-selector-class">.css</span>
    variable<span class="hljs-selector-class">.scss</span>   <span class="hljs-comment">// &#x516C;&#x7528;&#x53D8;&#x91CF;&#x6587;&#x4EF6;</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.editorconfig</span>   <span class="hljs-comment">// &#x7F16;&#x8F91;&#x5668;&#x914D;&#x7F6E;</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.gitignore</span> <span class="hljs-comment">// git &#x5FFD;&#x7565;&#x6587;&#x4EF6;</span></code></pre><h2 id="articleHeader6">&#x6784;&#x5EFA;</h2><h3 id="articleHeader7">create-react-app</h3><p>&#x6784;&#x5EFA;React&#x9879;&#x76EE;&#x9996;&#x5148;&#x7B2C;&#x4E00;&#x4E2A;&#x60F3;&#x5230;&#x7684;&#x662F;&#x7528;&#x811A;&#x624B;&#x67B6;&#x5DE5;&#x5177;&#xFF0C;Vue&#x5F53;&#x4E2D;&#x6709;Vue-cli&#xFF0C;&#x81EA;&#x5E26;webpack&#xFF0C;vue-router&#xFF0C;vuex&#xFF0C;&#x800C;React&#x5BF9;&#x5E94;&#x7684;&#x662F;<a href="https://github.com/facebook/create-react-app" rel="nofollow noreferrer" target="_blank">create-react-app</a></p><p>&#x5F53;&#x6211;&#x4EEC;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#x9879;&#x76EE;&#x4E4B;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x53D1;&#x73B0;webpack&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x627E;&#x4E0D;&#x5230;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x8FD0;&#x884C;&#x4EE5;&#x4E0B;&#x547D;&#x4EE4;&#x5C06;wepack&#x914D;&#x7F6E;&#x663E;&#x793A;&#x51FA;&#x6765;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run eject" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">run</span><span class="bash"> eject</span></code></pre><h3 id="articleHeader8">scss</h3><p>&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x53C2;&#x7167;&#x7684;&#x662F;<code>create-react-app</code>&#x4E2D;&#x7684;&#x8BF4;&#x660E;<a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc" rel="nofollow noreferrer" target="_blank">adding-a-css-preprocessor-sass-less-etc</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save node-sass-chokidar" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save node-sass-chokidar</code></pre><p>&#x8FD8;&#x9700;&#x8981;&#x88C5; <code>webpack watch</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   &quot;scripts&quot;: {
+    &quot;build-css&quot;: &quot;node-sass-chokidar src/ -o src/&quot;,
+    &quot;watch-css&quot;: &quot;npm run build-css &amp;&amp; node-sass-chokidar src/ -o src/ --watch --recursive&quot;,
     &quot;start&quot;: &quot;react-scripts start&quot;,
     &quot;build&quot;: &quot;react-scripts build&quot;,
     &quot;test&quot;: &quot;react-scripts test --env=jsdom&quot;," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">   <span class="hljs-string">&quot;scripts&quot;</span>: {
+    <span class="hljs-string">&quot;build-css&quot;</span>: <span class="hljs-string">&quot;node-sass-chokidar src/ -o src/&quot;</span>,
+    <span class="hljs-string">&quot;watch-css&quot;</span>: <span class="hljs-string">&quot;npm run build-css &amp;&amp; node-sass-chokidar src/ -o src/ --watch --recursive&quot;</span>,
     <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;react-scripts start&quot;</span>,
     <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;react-scripts build&quot;</span>,
     <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;react-scripts test --env=jsdom&quot;</span>,</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save npm-run-all" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install --save npm-run-all</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;scripts&quot;: {
     &quot;build-css&quot;: &quot;node-sass-chokidar src/ -o src/&quot;,
     &quot;watch-css&quot;: &quot;npm run build-css &amp;&amp; node-sass-chokidar src/ -o src/ --watch --recursive&quot;,
-    &quot;start&quot;: &quot;react-scripts start&quot;,
-    &quot;build&quot;: &quot;react-scripts build&quot;,
+    &quot;start-js&quot;: &quot;react-scripts start&quot;,
+    &quot;start&quot;: &quot;npm-run-all -p watch-css start-js&quot;,
+    &quot;build-js&quot;: &quot;react-scripts build&quot;,
+    &quot;build&quot;: &quot;npm-run-all build-css build-js&quot;,
     &quot;test&quot;: &quot;react-scripts test --env=jsdom&quot;,
     &quot;eject&quot;: &quot;react-scripts eject&quot;
   }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash"> <span class="hljs-string">&quot;scripts&quot;</span>: {
     <span class="hljs-string">&quot;build-css&quot;</span>: <span class="hljs-string">&quot;node-sass-chokidar src/ -o src/&quot;</span>,
     <span class="hljs-string">&quot;watch-css&quot;</span>: <span class="hljs-string">&quot;npm run build-css &amp;&amp; node-sass-chokidar src/ -o src/ --watch --recursive&quot;</span>,
-    <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;react-scripts start&quot;</span>,
-    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;react-scripts build&quot;</span>,
+    <span class="hljs-string">&quot;start-js&quot;</span>: <span class="hljs-string">&quot;react-scripts start&quot;</span>,
+    <span class="hljs-string">&quot;start&quot;</span>: <span class="hljs-string">&quot;npm-run-all -p watch-css start-js&quot;</span>,
+    <span class="hljs-string">&quot;build-js&quot;</span>: <span class="hljs-string">&quot;react-scripts build&quot;</span>,
+    <span class="hljs-string">&quot;build&quot;</span>: <span class="hljs-string">&quot;npm-run-all build-css build-js&quot;</span>,
     <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;react-scripts test --env=jsdom&quot;</span>,
     <span class="hljs-string">&quot;eject&quot;</span>: <span class="hljs-string">&quot;react-scripts eject&quot;</span>
   }</code></pre><p>&#x5B89;&#x88C5;&#x597D;&#x8FD9;&#x4E9B;&#x5305;&#x4E4B;&#x540E;&#xFF0C;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;scss&#x6587;&#x4EF6;&#x4F1A;&#x81EA;&#x52A8;&#x751F;&#x6210;css&#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5F15;&#x7528;&#x65F6;&#x76F4;&#x63A5;&#x5F15;&#x7528;css&#x6587;&#x4EF6;&#x5373;&#x53EF;&#x3002;</p><p>&#x53E6;&#x5916;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x662F;&#x53C2;&#x7167;medium&#x7684;&#x4E00;&#x7BC7;&#x6587;&#x7AE0;<a href="https://medium.com/@kswanie21/css-modules-sass-in-create-react-app-37c3152de9" rel="nofollow noreferrer" target="_blank">CSS Modules &amp; Sass in Create React App</a>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i sass-loader node-sass --save or yarn add sass-loader node-sass" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code style="word-break:break-word;white-space:initial">npm i sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --save <span class="hljs-keyword">or</span> yarn add sass-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span></code></pre><p>&#x968F;&#x540E;&#x66F4;&#x6539;<code>webpack.config.dev.js</code>&#x6587;&#x4EF6;&#x7684;&#x914D;&#x7F6E;<br><span class="img-wrap"><img data-src="/img/remote/1460000016388071?w=800&amp;h=1003" src="https://static.alili.tech/img/remote/1460000016388071?w=800&amp;h=1003" alt="" title="" style="cursor:pointer;display:inline"></span><br>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;<code>loaders</code>&#x7528;<code>use</code>&#x4EE3;&#x66FF;&#xFF0C;&#x968F;&#x540E;&#x5728;file-loader&#x589E;&#x52A0;scss&#x6587;&#x4EF6;&#x683C;&#x5F0F;&#x7684;&#x5339;&#x914D;<br><span class="img-wrap"><img data-src="/img/remote/1460000016388072?w=400&amp;h=335" src="https://static.alili.tech/img/remote/1460000016388072?w=400&amp;h=335" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader9">&#x8DE8;&#x57DF;&#x95EE;&#x9898;</h3><p>&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;webpack&#x81EA;&#x5E26;&#x7684;proxy&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;&#x6216;&#x8005;&#x901A;&#x8FC7;ngix&#x8FDB;&#x884C;&#x4EE3;&#x7406;</p><p>&#x5982;&#x679C;&#x662F;webpack&#x914D;&#x7F6E;&#x9700;&#x8981;&#x5728;package.json&#x5F53;&#x4E2D;&#x8FDB;&#x884C;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;proxy&quot;: {
    &quot;/user&quot;: {
      &quot;target&quot;: &quot;https://api.github.com&quot;,
      &quot;changeOrigin&quot;: true
    },
    &quot;/user/star&quot;: {
      &quot;target&quot;: &quot;https://api.github.com&quot;,
      &quot;changeOrigin&quot;: true
    },
    &quot;/login&quot;: {
      &quot;target&quot;: &quot;https://github.com&quot;,
      &quot;changeOrigin&quot;: true
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json"><span class="hljs-string">&quot;proxy&quot;</span>: {
    <span class="hljs-attr">&quot;/user&quot;</span>: {
      <span class="hljs-attr">&quot;target&quot;</span>: <span class="hljs-string">&quot;https://api.github.com&quot;</span>,
      <span class="hljs-attr">&quot;changeOrigin&quot;</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">&quot;/user/star&quot;</span>: {
      <span class="hljs-attr">&quot;target&quot;</span>: <span class="hljs-string">&quot;https://api.github.com&quot;</span>,
      <span class="hljs-attr">&quot;changeOrigin&quot;</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-attr">&quot;/login&quot;</span>: {
      <span class="hljs-attr">&quot;target&quot;</span>: <span class="hljs-string">&quot;https://github.com&quot;</span>,
      <span class="hljs-attr">&quot;changeOrigin&quot;</span>: <span class="hljs-literal">true</span>
    }
}</code></pre><h3 id="articleHeader10">svg</h3><p>&#x76EE;&#x524D;&#x4F7F;&#x7528;&#x4E86;<a href="https://github.com/jhamlet/svg-react-loader" rel="nofollow noreferrer" target="_blank">svg-react-loader</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" /* eslint-disable */
 // &#x4E3B;&#x8981;&#x662F;&#x8FD9;&#x91CC; eslint&#x4F1A;&#x62A5;&#x9519;
import Refresh from &apos;-!svg-react-loader!../../assets/img/refresh.svg&apos;;
/* eslint-enable */

class StarFilter extends Component {
  constructor(props) {
    super(props);
require.resolve(&apos;svg-react-loader&apos;);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      &lt;div className=&quot;star-filter&quot;&gt;
        &lt;div className=&quot;title-container&quot;&gt;
          &lt;h3 class=&quot;title-gray-dark&quot;&gt;STARS&lt;/h3&gt;
          &lt;!--&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;--&gt;
          &lt;Refresh className=&quot;icon-refresh text-grey&quot; /&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    );
  }
}

export default StarFilter;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="jsx"> <span class="hljs-comment">/* eslint-disable */</span>
 <span class="hljs-comment">// &#x4E3B;&#x8981;&#x662F;&#x8FD9;&#x91CC; eslint&#x4F1A;&#x62A5;&#x9519;</span>
<span class="hljs-keyword">import</span> Refresh <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;-!svg-react-loader!../../assets/img/refresh.svg&apos;</span>;
<span class="hljs-comment">/* eslint-enable */</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">StarFilter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
<span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;svg-react-loader&apos;</span>);
    <span class="hljs-keyword">this</span>.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;star-filter&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;title-container&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;title-gray-dark&quot;</span>&gt;</span>STARS<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
          <span class="hljs-comment">&lt;!--&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E86;--&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Refresh</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;icon-refresh text-grey&quot;</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

export default StarFilter;
</span></code></pre><h4>&#x989C;&#x8272;</h4><p>&#x6539;&#x53D8;&#x989C;&#x8272;&#x8981;&#x4F7F;&#x7528;<code>fill</code>&#x5C5E;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".icon-refresh {
  width: 20px;
  height: 20px;
  fill: #606f7b;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.icon-refresh</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">fill</span>: <span class="hljs-number">#606f7b</span>;
}</code></pre><h4>&#x6CE8;&#x610F;</h4><ul><li>&#x56FE;&#x7247;&#x4E2D;&#x81EA;&#x5E26;&#x7684;p-id&#x5143;&#x7D20;&#x5728;react&#x4E2D;&#x4F1A;&#x81EA;&#x52A8;&#x53D8;&#x6210;pId&#xFF0C;&#x968F;&#x540E;&#x4F1A;&#x88AB;react&#x8F93;&#x51FA;&#x8B66;&#x544A;&#x65E5;&#x5FD7;&#xFF0C;&#x5EFA;&#x8BAE;&#x628A;pid &#x5C5E;&#x6027;&#x5220;&#x9664;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E0D;&#x5F71;&#x54CD;&#x663E;&#x793A;</li><li>&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x5728;iconfont&#x4E0A;&#x4E0B;&#x8F7D;svg&#x56FE;&#x7247;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E9B;svg&#x56FE;&#x7247;&#x5185;&#x90E8;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x4E86;&#x989C;&#x8272;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x8BA9;&#x6211;&#x4EEC;&#x6837;&#x5F0F;&#x5F53;&#x4E2D;&#x7684;&#x989C;&#x8272;&#x8D77;&#x4F5C;&#x7528;&#xFF0C;&#x5EFA;&#x8BAE;&#x5728;&#x4E0B;&#x8F7D;&#x5B8C;svg&#x540E;&#xFF0C;&#x68C0;&#x67E5;&#x4E0B;&#x9ED8;&#x8BA4;&#x7684;<code>fill</code>&#x5C5E;&#x6027;&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x8BF7;&#x5148;&#x5220;&#x9664;</li></ul><h3 id="articleHeader11">&#x5F15;&#x7528;&#x672C;&#x5730;&#x56FE;&#x7247;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import NoSelectedImg from &apos;../../assets/img/not-selected.svg&apos;;

class ResInfo extends Component {
 // ..&#x6B64;&#x5904;&#x7701;&#x7565;
  render() {
    &lt;img
      alt=&quot;no-selected&quot;
      src={NoSelectedImg}
      className=&quot;img-no-selected&quot;
    /&gt;

  }
}

export default ResInfo;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> <span class="hljs-type">NoSelectedImg</span> from &apos;../../assets/img/not-selected.svg&apos;;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ResInfo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
 <span class="hljs-comment">// ..&#x6B64;&#x5904;&#x7701;&#x7565;</span>
  render() {
    &lt;img
      alt=<span class="hljs-string">&quot;no-selected&quot;</span>
      src={<span class="hljs-type">NoSelectedImg</span>}
      className=<span class="hljs-string">&quot;img-no-selected&quot;</span>
    /&gt;

  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">ResInfo</span>;</code></pre><p>&#x7B2C;&#x4E8C;&#x79CD;&#x65B9;&#x6CD5;&#x662F;&#x7528;<code>require</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;img src={require(&apos;../../assets/img/status-spinner.svg&apos;)} alt=&quot;fetch&quot; width=&quot;16&quot; height=&quot;16&quot;/&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="jsx" style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">img</span> src={require(<span class="hljs-string">&apos;../../assets/img/status-spinner.svg&apos;</span>)} alt=<span class="hljs-string">&quot;fetch&quot;</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">&quot;16&quot;</span> height=<span class="hljs-string">&quot;16&quot;</span>/&gt;</code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x5982;&#x679C;&#x662F;&#x8981;&#x5728;<code>img</code>&#x6807;&#x7B7E;&#x4E2D;&#x4F7F;&#x7528;svg&#x56FE;&#x7247;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5728;webpack&#x5F53;&#x4E2D;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;&#x5728;<code>webpack.config.dev.js</code>&#x548C;<code>webpack.config.prod.js</code>&#x5F53;&#x4E2D;&#x5927;&#x81F4;&#x5728;133&#x884C;&#x5DE6;&#x53F3;&#x7684;<code>urlLoader</code>&#x589E;&#x52A0;svg&#x6587;&#x4EF6;&#x7684;&#x5339;&#x914D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
    loader: require.resolve(&apos;url-loader&apos;),
    options: {
    limit: 10000,
    name: &apos;static/media/[name].[hash:8].[ext]&apos;,
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-attr">test</span>: [<span class="hljs-regexp">/\.bmp$/</span>, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
    <span class="hljs-attr">loader</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">&apos;url-loader&apos;</span>),
    <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;static/media/[name].[hash:8].[ext]&apos;</span>,
}</code></pre><h2 id="articleHeader12">&#x8DEF;&#x7531;</h2><p>&#x4F7F;&#x7528;<code>react-router-dom</code>&#x8FDB;&#x884C;&#x8DEF;&#x7531;&#x7684;&#x7BA1;&#x7406;&#xFF0C;&#x548C;<code>Vue-router</code>&#x4E00;&#x6837;&#xFF0C;&#x9700;&#x8981;&#x5BF9;&#x8981;&#x7528;&#x5230;&#x7684;&#x8DEF;&#x7531;&#x7EA7;&#x522B;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x6CE8;&#x518C;&#x3002;&#x76F4;&#x63A5;&#x5C06;&#x7EC4;&#x4EF6;&#x5199;&#x5728;<code>router</code>&#x5185;&#x90E8;&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    return (
      &lt;div className=&quot;App&quot;&gt;
        &lt;BrowserRouter basename=&quot;/&quot;&gt;
          &lt;div&gt;
            &lt;Route exact path=&quot;/&quot; component={Auth} /&gt;
            &lt;Route path=&quot;/auth&quot; component={Auth} /&gt;
            &lt;Route path=&quot;/star&quot; component={Star} /&gt;
          &lt;/div&gt;
        &lt;/BrowserRouter&gt;
      &lt;/div&gt;
    )
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="jsx">render() {
    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;App&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span> <span class="hljs-attr">basename</span>=<span class="hljs-string">&quot;/&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Auth}</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/auth&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Auth}</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/star&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Star}</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }</code></pre><p><code>Router</code>&#x4E2D;&#x6709;<code>BrowserRouter</code>,<code>HashRouter</code>&#x7B49;&#xFF0C;&#x800C;&#x8FD9;2&#x79CD;&#x7C7B;&#x4F3C;&#x4E8E;<code>Vue-router</code>&#x4E2D;&#x7684;<code>history</code>&#x548C;<code>hash</code>&#x6A21;&#x5F0F;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x5728;&#x6211;&#x4EEC;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x5F53;&#x4E2D;&#x5FC5;&#x987B;&#x4F7F;&#x7528;<code>BrowserRouter</code>&#xFF0C;&#x5982;&#x679C;&#x4F7F;&#x7528;<code>HashRouter</code>&#x5728;github &#x6388;&#x6743;&#x91CD;&#x5B9A;&#x5411;&#x56DE;&#x6211;&#x4EEC;&#x9875;&#x9762;&#x65F6;&#x4F1A;&#x51FA;&#x73B0;&#x95EE;&#x9898;&#x3002;&#x4F1A;&#x51FA;&#x73B0;code&#x4E0D;&#x5728;&#x5C3E;&#x90E8;&#x7684;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Redirect } from &apos;react-router-dom&apos;

class Auth extends Component {

 //&#x7701;&#x7565;...

  render() {
    // &#x5982;&#x679C;isTokenError&#x4E3A;true&#x76F4;&#x63A5;&#x8DF3;&#x8F6C;&#x81F3;&#x9996;&#x9875;
    if (this.state.isTokenError) {
      return (
        &lt;Redirect to=&quot;/&quot;/&gt;
      )
    }
    // &#x5982;&#x679C;hasCode&#x6709;&#x503C;&#x5219;&#x8DF3;&#x8F6C;&#x81F3;star
    if (this.state.hasCode) {
      return (
        &lt;Redirect to=&quot;/star&quot; /&gt;
      )
    }
    return (
      &lt;div className=&quot;Auth&quot;&gt;
        &lt;Button className=&quot;btn-auth&quot; onClick={this.onClickAuth}&gt;
          &#x70B9;&#x51FB;&#x6388;&#x6743;
        &lt;/Button&gt;
      &lt;/div&gt;
    )
  }
}

export default Auth
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code class="jsx"><span class="hljs-keyword">import</span> { <span class="hljs-type">Redirect</span> } from <span class="hljs-symbol">&apos;react</span>-router-dom&apos;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Auth</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

 <span class="hljs-comment">//&#x7701;&#x7565;...</span>

  render() {
    <span class="hljs-comment">// &#x5982;&#x679C;isTokenError&#x4E3A;true&#x76F4;&#x63A5;&#x8DF3;&#x8F6C;&#x81F3;&#x9996;&#x9875;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.isTokenError) {
      <span class="hljs-keyword">return</span> (
        &lt;<span class="hljs-type">Redirect</span> to=<span class="hljs-string">&quot;/&quot;</span>/&gt;
      )
    }
    <span class="hljs-comment">// &#x5982;&#x679C;hasCode&#x6709;&#x503C;&#x5219;&#x8DF3;&#x8F6C;&#x81F3;star</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.hasCode) {
      <span class="hljs-keyword">return</span> (
        &lt;<span class="hljs-type">Redirect</span> to=<span class="hljs-string">&quot;/star&quot;</span> /&gt;
      )
    }
    <span class="hljs-keyword">return</span> (
      &lt;div className=<span class="hljs-string">&quot;Auth&quot;</span>&gt;
        &lt;<span class="hljs-type">Button</span> className=<span class="hljs-string">&quot;btn-auth&quot;</span> onClick={<span class="hljs-keyword">this</span>.onClickAuth}&gt;
          &#x70B9;&#x51FB;&#x6388;&#x6743;
        &lt;/<span class="hljs-type">Button</span>&gt;
      &lt;/div&gt;
    )
  }
}

export <span class="hljs-keyword">default</span> <span class="hljs-type">Auth</span>
</code></pre><p>&#x540C;&#x65F6;&#x5B83;&#x4E5F;&#x652F;&#x6301;api&#x7684;&#x8DF3;&#x8F6C;&#xFF0C;&#x5F53;&#x7EC4;&#x4EF6;&#x653E;&#x7F6E;&#x5728;<code>router</code>&#x4E2D;&#xFF0C;&#x7EC4;&#x4EF6;props&#x5185;&#x7F6E;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;<code>histroy</code>&#x5C5E;&#x6027;&#xFF0C;&#x5373;<code>this.props.history</code>&#xFF0C;&#x4F7F;&#x7528;&#x5B83;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;<code>push</code>,<code>replace</code>&#x7B49;&#x8DF3;&#x8F6C;&#x4E86;&#x529F;&#x80FD;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  /**
   * &#x8FD4;&#x56DE;&#x9996;&#x9875;
   */
  go2home() {
    this.props.history.replace(&apos;/auth&apos;);
  }

  /**
   * &#x524D;&#x5F80;star&#x754C;&#x9762;
   */
  go2star() {
    this.props.history.push(&apos;/star&apos;);
  } " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code class="jsx">  <span class="hljs-comment">/**
   * &#x8FD4;&#x56DE;&#x9996;&#x9875;
   */</span>
  g<span class="hljs-meta">o2</span>home<span class="hljs-comment">()</span> {
    this.props.history.replace<span class="hljs-comment">(&apos;/auth&apos;)</span>;
  }

  <span class="hljs-comment">/**
   * &#x524D;&#x5F80;star&#x754C;&#x9762;
   */</span>
  g<span class="hljs-meta">o2</span>star<span class="hljs-comment">()</span> {
    this.props.history.push<span class="hljs-comment">(&apos;/star&apos;)</span>;
  } </code></pre><h2 id="articleHeader13">&#x603B;&#x7ED3;</h2><p>&#x6211;&#x4EEC;&#x5927;&#x81F4;&#x4E86;&#x89E3;&#x4E86;&#x9879;&#x76EE;&#x7684;&#x6982;&#x51B5;&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x7684;&#x8FC7;&#x7A0B;&#x5F53;&#x4E2D;&#xFF0C;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x662F;&#x5341;&#x5206;&#x91CD;&#x8981;&#x7684;&#xFF0C;&#x5305;&#x62EC;githubApi&#x7684;&#x4F7F;&#x7528;&#xFF0C;SCSS&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#x7B49;&#x7B49;&#xFF0C;&#x90FD;&#x80FD;&#x4ECE;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x5F53;&#x4E2D;&#x5F97;&#x5230;&#x89E3;&#x7B54;&#x3002;&#x540C;&#x65F6;github&#x63D0;&#x4F9B;&#x7684;api&#x4E5F;&#x662F;&#x5341;&#x5206;&#x4E30;&#x5BCC;&#x7684;&#xFF0C;&#x57FA;&#x672C;&#x56CA;&#x62EC;&#x4E86;&#x6240;&#x6709;github&#x7684;&#x57FA;&#x7840;&#x529F;&#x80FD;&#xFF0C;&#x5728;&#x4E0A;&#x8FF0;&#x6587;&#x7AE0;&#x5F53;&#x4E2D;&#x53EA;&#x662F;&#x5C55;&#x793A;&#x4E86;&#x5B83;&#x6781;&#x5C11;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x66F4;&#x591A;&#x7684;&#x529F;&#x80FD;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x6765;&#x53D1;&#x6398;&#x3002;&#x5728;&#x63A5;&#x4E0B;&#x6765;&#x7684;&#x6587;&#x7AE0;&#x5F53;&#x4E2D;&#xFF0C;&#x4F1A;&#x4E3A;&#x5927;&#x5BB6;&#x5E26;&#x6765;&#x670D;&#x52A1;&#x7AEF;&#x5F00;&#x53D1;&#x7BC7;&#xFF0C;&#x4F7F;&#x7528;node&#x8FDB;&#x884C;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x6570;&#x636E;&#x5E93;&#x7684;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;&#x3002;&#x9879;&#x76EE;&#x5730;&#x5740;&#x53EF;&#x4EE5;<a href="https://github.com/Baifann/react-github-star-manager" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x6211;</a>&#xFF0C;&#x9879;&#x76EE;&#x8FD8;&#x5728;&#x521D;&#x671F;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x5C31;&#x4E0D;&#x8981;&#x6765;star&#x4E86;=.=&#x3002;</p><h2 id="articleHeader14">&#x53C2;&#x8003;</h2><ul><li><a href="https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development" rel="nofollow noreferrer" target="_blank">create-react-app</a></li><li><a href="https://developer.github.com/v3/" rel="nofollow noreferrer" target="_blank">github open api&#x63A5;&#x53E3;&#x6587;&#x6863;</a></li><li><a href="https://reacttraining.com/react-router/web/guides/philosophy" rel="nofollow noreferrer" target="_blank">REACT TRAINING / REACT ROUTER</a></li><li><a href="https://www.jianshu.com/p/cf477a7eb48f" rel="nofollow noreferrer" target="_blank">&#x5728;create-react-app&#x521B;&#x5EFA;&#x7684;&#x5E94;&#x7528;&#x4E2D;&#x914D;&#x7F6E;Sass</a></li></ul><h2 id="articleHeader15">&#x5E7F;&#x800C;&#x544A;&#x4E4B;</h2><p>&#x672C;&#x6587;&#x53D1;&#x5E03;&#x4E8E;<a href="https://github.com/BooheeFE/weekly" rel="nofollow noreferrer" target="_blank">&#x8584;&#x8377;&#x524D;&#x7AEF;&#x5468;&#x520A;</a>&#xFF0C;&#x6B22;&#x8FCE;Watch &amp; Star &#x2605;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x3002;</p><h3 id="articleHeader16">&#x6B22;&#x8FCE;&#x8BA8;&#x8BBA;&#xFF0C;&#x70B9;&#x4E2A;&#x8D5E;&#x518D;&#x8D70;&#x5427; &#xFF61;&#x25D5;&#x203F;&#x25D5;&#xFF61; &#xFF5E;</h3>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【React 实战教程：第一节】从0到1 构建 github star管理工具 ：前期准备

## 原文链接
[https://segmentfault.com/a/1190000016388068](https://segmentfault.com/a/1190000016388068)


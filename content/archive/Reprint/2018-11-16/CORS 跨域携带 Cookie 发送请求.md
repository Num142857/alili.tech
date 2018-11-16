---
title: 'CORS 跨域携带 Cookie 发送请求' 
date: 2018-11-16 2:30:06
hidden: true
slug: nh5d5ddjtjs
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x95EE;&#x9898;</h1><p>&#x5F53;&#x5728; a.com &#x8FDB;&#x884C;&#x8BBF;&#x95EE;&#x65F6;&#xFF0C;&#x5982;&#x4F55;&#x5411; b.com &#x643A;&#x5E26; b.com &#x7684; cookie &#x53D1;&#x9001;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#xFF1F;</p><h1 id="articleHeader1">&#x60C5;&#x5883;</h1><p>a.com &#x662F;&#x4E00;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#x7F51;&#x7AD9;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x8BBF;&#x95EE; b.com &#x7684;&#x63A5;&#x53E3;&#x6765;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x7684;&#x4E00;&#x4E9B;&#x4FE1;&#x606F;&#x3002;&#x8FD9;&#x65F6;&#x5019;&#xFF0C;b.com &#x4E0A;&#x7684;&#x7528;&#x6237;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#x4E86;&#x3002;</p><h1 id="articleHeader2">&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;</h1><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;&#x5728;&#x53D1;&#x9001;&#x8DE8;&#x57DF;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x540E;&#x7AEF;&#x8BBE;&#x7F6E;&#x4E00;&#x4E9B;&#x8BF7;&#x6C42;&#x5934;&#xFF0C;&#x5426;&#x5219;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x4F1A;&#x5141;&#x8BB8;&#x5BA2;&#x6237;&#x7AEF;&#x8DE8;&#x57DF;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin: a.com
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>Access-Control-Allow-Origin: <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.com</span>
</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;a.com &#x4FBF;&#x53EF;&#x4EE5;&#x8C03;&#x7528; b.com &#x7684;&#x63A5;&#x53E3;&#x4E86;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x6837;&#x8C03;&#x7528;&#x8FC7;&#x53BB;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;b.com &#x4F1A;&#x8FD4;&#x56DE;&#x7528;&#x6237;&#x672A;&#x767B;&#x5F55;&#x3002;<strong>&#x539F;&#x56E0;&#x662F; b.com &#x7684; cookie &#x6CA1;&#x6709;&#x53D1;&#x9001;&#x8FC7;&#x53BB;&#x3002;</strong></p><h1 id="articleHeader3">&#x8DE8;&#x57DF;&#x643A;&#x5E26; Cookie</h1><p>&#x8FD9;&#x65F6;&#x5019;&#x9700;&#x8981;&#x540E;&#x7AEF;&#x6DFB;&#x52A0;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x5934;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Credentials: true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-attr">Access-Control-Allow-Credentials:</span> <span class="hljs-literal">true</span>
</code></pre><p>&#x524D;&#x7AEF;&#x5728;&#x53D1;&#x9001;&#x8BF7;&#x6C42;&#x65F6;&#x4E5F;&#x9700;&#x8981;&#x8BBE;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr = new XMLHttpRequest();
xhr.withCredentials= true;  //&#x5173;&#x952E;&#x53E5;
xhr.open(&quot;GET&quot;, url);
xhr.send();
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs accesslog"><code>xhr = new XMLHttpRequest();
xhr.withCredentials= true;  //&#x5173;&#x952E;&#x53E5;
xhr.open(<span class="hljs-string">&quot;<span class="hljs-keyword">GET</span>&quot;</span>, url);
xhr.send();
</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x540E;&#x7AEF;&#x5C31;&#x53EF;&#x4EE5;&#x63A5;&#x6536;&#x5230;&#x524D;&#x7AEF;&#x643A;&#x5E26;&#x7684; Cookie &#x4E86;&#x3002;</p><h1 id="articleHeader4">&#x603B;&#x7ED3;</h1><p>&#x7EFC;&#x4E0A;&#x6240;&#x8FF0;&#xFF0C;&#x524D;&#x7AEF;&#x9700;&#x8981;&#x5728;&#x53D1;&#x9001; XMLHttpRequest &#x7684;&#x65F6;&#x5019;&#x52A0;&#x4E0A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.withCredentials= true;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>xhr.<span class="hljs-attr">withCredentials=</span> <span class="hljs-literal">true</span>;
</code></pre><p>&#x540E;&#x7AEF;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#x8BF7;&#x6C42;&#x5934;&#xFF08;&#x8868;&#x793A;&#x4F60;&#x4FE1;&#x4EFB; a.com &#x5E76;&#x5141;&#x8BB8; a.com &#x5E26;&#x4E0A;&#x4F60;&#x7684;&#x51ED;&#x636E;&#xFF09;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin: a.com //&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x6362;&#x6210;&#x76F8;&#x5E94;&#x7684;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x7684;&#x57DF;&#x540D;
Access-Control-Allow-Credentials: true
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>Access-Control-Allow-Origin: <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.com</span> <span class="hljs-comment">//&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x6362;&#x6210;&#x76F8;&#x5E94;&#x7684;&#x53D1;&#x8D77;&#x8BF7;&#x6C42;&#x7684;&#x57DF;&#x540D;</span>
Access-Control-Allow-Credentials: true
</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CORS 跨域携带 Cookie 发送请求

## 原文链接
[https://segmentfault.com/a/1190000016032594](https://segmentfault.com/a/1190000016032594)


---
title: '关于deno出世时所发生了什么' 
date: 2018-11-29 9:27:39
hidden: true
slug: r4dgv12dole
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">&#x5173;&#x6CE8;&#x70B9;</h3>
<p>&#x8FD1;&#x65E5;&#xFF0C;Node &#x4E4B;&#x7236; Ryan Dahl &#x53D1;&#x5E03;&#x65B0;&#x7684;&#x5F00;&#x6E90;&#x9879;&#x76EE; deno&#xFF0C;&#x4ECE;&#x5B98;&#x65B9;&#x4ECB;&#x7ECD;&#x6765;&#x770B;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x5B83;&#x662F;&#x4E0B;&#x4E00;&#x4EE3; Node&#xFF08;&#x5176;&#x76EE;&#x6807;&#x4E0D;&#x662F;&#x53D6;&#x4EE3; Node.js&#xFF09;&#xFF0C;&#x4F7F;&#x7528; Go &#x8BED;&#x8A00;&#x4EE3;&#x66FF; C++ &#x91CD;&#x65B0;&#x7F16;&#x5199;&#x8DE8;&#x5E73;&#x53F0;&#x5E95;&#x5C42;&#x5185;&#x6838;&#x9A71;&#x52A8;&#xFF0C;&#x4E0A;&#x5C42;&#x4ECD;&#x7136;&#x4F7F;&#x7528; V8 &#x5F15;&#x64CE;&#xFF0C;&#x6700;&#x7EC8;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5B89;&#x5168;&#x7684; TypeScript &#x8FD0;&#x884C;&#x65F6;&#x3002;&#x5B83;&#x7684;&#x7279;&#x6027;&#x5305;&#x62EC;&#xFF1A;     </p>
<p>&#x652F;&#x6301; TypeScript 2.8 &#x5F00;&#x7BB1;&#x5373;&#x7528;&#xFF1B;   <br>&#x65E0; package.json&#xFF0C;&#x65E0; npm&#xFF0C;&#x4E0D;&#x8FFD;&#x6C42;&#x517C;&#x5BB9; Node&#xFF1B;    <br>&#x901A;&#x8FC7; URL &#x65B9;&#x5F0F;&#x5F15;&#x5165;&#x4F9D;&#x8D56;&#x800C;&#x975E;&#x901A;&#x8FC7;&#x672C;&#x5730;&#x6A21;&#x5757;&#xFF0C;&#x5E76;&#x5728;&#x7B2C;&#x4E00;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x65F6;&#x5019;&#x8FDB;&#x884C;&#x52A0;&#x8F7D;&#x548C;&#x7F13;&#x5B58;&#xFF0C;&#x5E76;&#x4EC5;&#x5728;&#x4EE3;&#x7801;&#x4F7F;&#x7528; --reload &#x8FD0;&#x884C;&#xFF0C;&#x4F9D;&#x8D56;&#x624D;&#x4F1A;&#x66F4;&#x65B0;&#xFF1B;   <br>&#x7B49;&#x7B49;&#x2026;&#x2026;   <br>&#x8FD9;&#x51E0;&#x4E2A;&#x7279;&#x6027;&#xFF0C;&#x6709;&#x597D;&#x51E0;&#x4E2A;&#x90FD;&#x662F;&#x9488;&#x5BF9;&#x76EE;&#x524D; Node &#x7684;&#x75DB;&#x70B9;&#x800C;&#x6765;&#x7684;&#x3002;  </p>
<p><span class="img-wrap"><img data-src="/img/bVbbL0m?w=1083&amp;h=394" src="https://static.alili.tech/img/bVbbL0m?w=1083&amp;h=394" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p><strong>&#x4E09;&#x70B9;</strong></p>
<ul>
<li>deno &#x548C; nodejs &#x7684;&#x5173;&#x7CFB;&#xFF1F;</li>
<li>github&#x4E0A;deno&#x7684;Issues&#x7684;&#x4E2D;&#x6587;&#x63D0;&#x4EA4;&#x5230;&#x5E95;&#x662F;&#x5565;&#xFF1F;</li>
<li>deno &#x7684;api&#x548C;&#x5E94;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x672A;&#x6765;&#x53C8;&#x6765;&#xFF1F;</li>
</ul>
<h3 id="articleHeader1">&#x81F3;&#x4E8E; deno &#x548C; nodejs &#x7684;&#x5173;&#x7CFB;</h3>
<p><a href="https://cnodejs.org/topic/5b0f9ba357137f22415c47b5" rel="nofollow noreferrer" target="_blank">&#x91CD;&#x5927;&#x6D88;&#x606F;&#xFF1A;NodeJs&#x4E4B;&#x7236;&#x53D1;&#x5E03;&#x4E0B;&#x4E00;&#x4EE3;Node--Deno</a></p>
<p>justjavac &#x8FDE;&#x51FA;&#x51E0;&#x7BC7;&#x6587;&#x7AE0;&#x5BF9;&#x6BD4;&#x8BF4;&#x660E;:  <br><a href="http://www.sohu.com/a/233928605_609397" rel="nofollow noreferrer" target="_blank">Deno &#x5E76;&#x4E0D;&#x662F;&#x4E0B;&#x4E00;&#x4EE3; Node.js</a>       <br><a href="https://zhuanlan.zhihu.com/p/37550198" rel="nofollow noreferrer" target="_blank">deno issue &#x4E8B;&#x4EF6;&#x4E2D;&#x7684;&#x90A3;&#x4E9B;&quot;&#x4F5C;&#x6076;&#x8005;&quot;&#x4EEC;&#xFF0C;&#x524D;&#x7AEF;&#x9ED1;&#x540D;&#x5355;&#x53C8;&#x591A;&#x4E86;&#x4E00;&#x6279;&#x4EBA;</a> </p>
<p><a href="https://www.zhihu.com/question/279208326" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x8BC4;&#x4EF7;ry(Ryan Dahl)&#x7684;&#x65B0;&#x9879;&#x76EE;deno?</a></p>
<p><a href="https://juejin.im/entry/5b0f972f518825156e4b65d7" rel="nofollow noreferrer" target="_blank">Node&#x4E4B;&#x7236;ry&#x53D1;&#x5E03;&#x65B0;&#x9879;&#x76EE;deno&#xFF1A;&#x4E0B;&#x4E00;&#x4EE3;Node</a></p>
<h3 id="articleHeader2">github&#x4E0A;deno&#x7684;Issues&#x7684;&#x4E2D;&#x6587;&#x63D0;&#x4EA4;&#x5230;&#x5E95;&#x662F;&#x5565;&#xFF1F;</h3>
<p><a href="https://www.v2ex.com/t/459295" rel="nofollow noreferrer" target="_blank">Nodejs &#x4E4B;&#x7236;&#x65B0;&#x51FA;&#x7684; deno &#x9879;&#x76EE; Issues &#x533A;&#x57DF;&#x88AB;&#x6EE5;&#x7528;</a></p>
<h3 id="articleHeader3">deno &#x7684;api&#x548C;&#x5E94;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x672A;&#x6765;&#x53C8;&#x6765;&#xFF1F;</h3>
<p><a href="https://zhuanlan.zhihu.com/p/37569396" rel="nofollow noreferrer" target="_blank">&#x5FEB;&#x901F;&#x4E86;&#x89E3; deno &#x76EE;&#x524D;&#x7684; API</a></p>
<p>deno/TODO.txt (<a href="https://github.com/ry/deno/blob/master/TODO.txt)" rel="nofollow noreferrer" target="_blank">https://github.com/ry/deno/bl...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- Fix v8_source_maps.ts so that we don&apos;t get random segfaults.

- Add os.statSync and os.tempDir- both are needed for the writeFileSync test in
  tests.ts

- Top-level await.

- Add ability to open TCP sockets and listen for connections.

- Add ability to receive HTTP connections (using net/http to parse)
  should try to use the same Request/Response types as fetch().

- Publish deno_testing to npm as a standalone module.

- Use mksnapshot instead of go-bindata." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs fsharp"><code>- Fix v8_source_maps.ts so that we don&apos;t get random segfaults.

- Add os.statSync <span class="hljs-keyword">and</span> os.tempDir- both are needed <span class="hljs-keyword">for</span> the writeFileSync test <span class="hljs-keyword">in</span>
  tests.ts

- Top-level await.

- Add ability <span class="hljs-keyword">to</span> <span class="hljs-keyword">open</span> TCP sockets <span class="hljs-keyword">and</span> listen <span class="hljs-keyword">for</span> connections.

- Add ability <span class="hljs-keyword">to</span> receive HTTP connections (using net/http <span class="hljs-keyword">to</span> parse)
  should <span class="hljs-keyword">try</span> <span class="hljs-keyword">to</span> <span class="hljs-keyword">use</span> the same Request/Response types <span class="hljs-keyword">as</span> fetch().

- Publish deno_testing <span class="hljs-keyword">to</span> npm <span class="hljs-keyword">as</span> a standalone <span class="hljs-keyword">module</span>.

- Use mksnapshot instead <span class="hljs-keyword">of</span> go-bindata.</code></pre>
<h2 id="articleHeader4">&#x5176;&#x5B83;</h2>
<ul><li><a>Episode 8: Interview with Ryan Dahl, Creator of Node.js</a></li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于deno出世时所发生了什么

## 原文链接
[https://segmentfault.com/a/1190000015159190](https://segmentfault.com/a/1190000015159190)


---
title: 关于如何在部署环境修改process.env & 本地测试
reprint: true
categories: reprint
abbrlink: 4abce9bf
date: 2018-11-06 02:30:12
---

{{% raw %}}
<h1 id="articleHeader0">&#x524D;&#x8A00;</h1><p>&#x6700;&#x8FD1;&#x5728;&#x641E;&#x4E00;&#x4E9B;&#x76D1;&#x63A7;&#x7684;&#x4E1C;&#x897F;&#xFF0C; &#x9700;&#x8981;<code>&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#x4E0A;&#x62A5;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x5730;&#x5740;</code>&#xFF0C;&#x4E2D;&#x95F4;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x7B80;&#x5355;&#x603B;&#x7ED3;&#x5206;&#x4EAB;&#x4E0B;&#x3002;</p><h2 id="articleHeader1">&#x5173;&#x4E8E;process.env</h2><p>&#x5047;&#x5982;&#x4F60;&#x5BF9;process.env &#x76F8;&#x5173;&#x7684;&#x6982;&#x5FF5;&#x8FD8;&#x4E0D;&#x719F;&#x6089;&#xFF0C; &#x8BF7;&#x79FB;&#x6B65;&#xFF1A;<br><a href="https://segmentfault.com/a/1190000011683741">Node&#x73AF;&#x5883;&#x53D8;&#x91CF; process.env &#x7684;&#x90A3;&#x4E9B;&#x4E8B;&#x513F;</a> , &#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x603B;&#x7ED3;&#x7684;&#x6BD4;&#x8F83;&#x597D;&#x3002;</p><p>webpack &#x5728;&#x6784;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#xFF0C; &#x53EF;&#x4EE5;&#x4E3A;process.env &#x8D4B;&#x503C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = &apos;development&apos;;
process.env.NODE_ENV = &apos;development&apos;;


// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = &apos;production&apos;;
process.env.NODE_ENV = &apos;production&apos;;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>
<span class="hljs-comment">// Do this as the first thing so that any code reading it knows the right env.</span>
<span class="hljs-built_in">process</span>.env.BABEL_ENV = <span class="hljs-string">&apos;development&apos;</span>;
<span class="hljs-built_in">process</span>.env.NODE_ENV = <span class="hljs-string">&apos;development&apos;</span>;


<span class="hljs-comment">// Do this as the first thing so that any code reading it knows the right env.</span>
<span class="hljs-built_in">process</span>.env.BABEL_ENV = <span class="hljs-string">&apos;production&apos;</span>;
<span class="hljs-built_in">process</span>.env.NODE_ENV = <span class="hljs-string">&apos;production&apos;</span>;
</code></pre><blockquote>process &#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x4E2A; global &#xFF08;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF09;&#xFF0C;&#x63D0;&#x4F9B;&#x6709;&#x5173;&#x4FE1;&#x606F;&#xFF0C;&#x63A7;&#x5236;&#x5F53;&#x524D; Node.js &#x8FDB;&#x7A0B;&#x3002;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x5BF9;&#x4E8E; Node.js &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x59CB;&#x7EC8;&#x662F;&#x53EF;&#x7528;&#x7684;&#xFF0C;&#x6545;&#x65E0;&#x9700;&#x4F7F;&#x7528; require()&#x3002;</blockquote><p>&#x5047;&#x5982;&#x4F60;&#x9700;&#x8981;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x90E8;&#x7F72;&#x73AF;&#x5883;&#x505A;&#x4E00;&#x4E9B;&#x533A;&#x5206;&#xFF0C; &#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
if (process.env.env === &quot;test&quot;) {
  BASE_API_1 = &apos;xxx
} else if (process.env.env === &quot;uat&quot;) {
  BASE_API_1 = &apos;xxx
} else if (process.env.env === &quot;staging&quot;) {
  BASE_API_1 = &apos;xxx
} else if (process.env.env === &quot;live&quot;) {
  BASE_API_1 = &apos;xxx&apos;
} else {
  BASE_API_1 = &apos;xxx&apos;;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nix"><code>
<span class="hljs-keyword">if</span> (process.env.<span class="hljs-attr">env</span> === <span class="hljs-string">&quot;test&quot;</span>) {
  <span class="hljs-attr">BASE_API_1</span> = &apos;xxx
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.<span class="hljs-attr">env</span> === <span class="hljs-string">&quot;uat&quot;</span>) {
  <span class="hljs-attr">BASE_API_1</span> = &apos;xxx
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.<span class="hljs-attr">env</span> === <span class="hljs-string">&quot;staging&quot;</span>) {
  <span class="hljs-attr">BASE_API_1</span> = &apos;xxx
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (process.env.<span class="hljs-attr">env</span> === <span class="hljs-string">&quot;live&quot;</span>) {
  <span class="hljs-attr">BASE_API_1</span> = &apos;xxx&apos;
} <span class="hljs-keyword">else</span> {
  <span class="hljs-attr">BASE_API_1</span> = &apos;xxx&apos;;
}
</code></pre><p>&#x6BD4;&#x5982;&#x7528;&#x7684;&#x662F;jenkins, &#x6784;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x81EA;&#x52A8;&#x7ED9;&#x73AF;&#x5883;&#x53D8;&#x91CF;&#x52A0;&#x4E00;&#x4E2A;env &#x5C5E;&#x6027;&#xFF0C; &#x4E5F;&#x5C31;&#x662F;&#x4E0A;&#x9762;&#x770B;&#x5230;&#x7684;env.env, &#x4E0D;&#x540C;&#x7684;&#x73AF;&#x5883;&#x4F1A;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x503C;&#xFF0C; &#x6BD4;&#x5982; <code>uat, staging, live</code>;</p><p>&#x672C;&#x5730;&#x6784;&#x5EFA;&#x7684;&#x65F6;&#x5019;&#xFF0C; &#x662F;&#x53D6;&#x4E0D;&#x5230;&#x8FD9;&#x4E2A;&#x503C;&#x7684;&#xFF0C; &#x56E0;&#x4E3A;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x73AF;&#x5883;&#x3002; &#x4F46;&#x662F;&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x624B;&#x52A8;&#x6765;&#x8D4B;&#x503C;&#xFF0C; &#x6BD4;&#x5982;&#x7ED9;env.env &#x8D4B;&#x503C;&#x4E3A;&apos;test&apos;, &#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x7EC8;&#x7AEF;&#x6267;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="env=test yarn start
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ini"><code><span class="hljs-attr">env</span>=test yarn start
</code></pre><p>&#x968F;&#x4FBF;&#x6253;&#x5370;&#x4E00;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
console.log(process.env.env);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>
<span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-selector-tag">process</span><span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.env</span>);
</code></pre><p><span class="img-wrap"><img data-src="/img/bVbhHUf?w=82&amp;h=41" src="https://static.alili.tech/img/bVbhHUf?w=82&amp;h=41" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x4E86; :)</p><p>&#x5E0C;&#x671B;&#x5BF9;&#x5927;&#x5BB6;&#x6709;&#x6240;&#x542F;&#x53D1;&#xFF0C; &#x8C22;&#x8C22;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于如何在部署环境修改process.env & 本地测试

## 原文链接
[https://segmentfault.com/a/1190000016574361](https://segmentfault.com/a/1190000016574361)


---
title: '[vuejs 踩坑实战系列] keep-alive 被 beforeRouteEnter 骗了'
hidden: true
categories: [reprint]
slug: '17897695'
date: 2018-11-07 02:30:16
---

{{< raw >}}
<p>&#x5927;&#x5BB6;&#x4E2D;&#x79CB;&#x5047;&#x671F;&#x5FEB;&#x4E50;&#xFF0C;&#x5047;&#x671F;&#x5206;&#x4EAB;&#x4E00;&#x4E9B;&#x5B9E;&#x6218;&#x6587;&#x7AE0;&#x7ED9;&#x5927;&#x5BB6;&#xFF0C;<code>&#x539F;&#x521B;&#x4E0D;&#x6613;&#xFF0C;&#x6B22;&#x8FCE;&#x8F6C;&#x53D1;&#xFF0C;&#x4E00;&#x8D77;&#x5B66;&#x4E60;</code></p><hr><p>&#x73B0;&#x5728;&#x5927;&#x5BB6;&#x57FA;&#x672C;&#x90FD;&#x5728;<code>&#x5355;&#x9875;&#x5E94;&#x7528;</code>&#x91CC;&#x9762;&#x4F7F;&#x7528;&#x4E86; <code>keep-alive</code> &#x6765;<code>&#x7F13;&#x5B58;&#x4E0D;&#x6D3B;&#x52A8;&#x7684;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x9500;&#x6BC1;&#x5B83;&#x4EEC;</code>&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x8FD8;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x5B98;&#x65B9;&#x7684;&#x4ECB;&#x7ECD;&#xFF08;&#x5982;&#x679C;&#x5927;&#x5BB6;&#x9700;&#x8981;&#x4E00;&#x4E9B;&#x65B0;&#x624B;&#x5165;&#x95E8;&#x7684;&#x6587;&#x7AE0;&#x53EF;&#x4EE5;&#x7559;&#x8A00;&#x54C8;&#xFF09;&#xFF1A;<a href="https://cn.vuejs.org/v2/api/#keep-alive" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/api/#...</a></p><p>&#x7528;&#x6CD5;&#x5F88;&#x7B80;&#x5355;&#xFF1A;&#x4E3B;&#x8981;&#x662F;<code>&#x5305;&#x88F9;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;keep-alive&gt;
  ...
&lt;/keep-alive&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code>&lt;<span class="hljs-meta">keep</span>-alive&gt;
  ...
&lt;/<span class="hljs-meta">keep</span>-alive&gt;</code></pre><p>&#x4F7F;&#x7528;&#x573A;&#x666F;&#xFF1A;</p><blockquote>&#x548C;<code>&#x5355;&#x9875;&#x5E94;&#x7528;</code>&#x73AF;&#x5883;&#x914D;&#x5408;&#x4F7F;&#x7528;&#x7684;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;keep-alive&gt;
   &lt;router-view v-if=&quot;$route.meta.keepAlive&quot;&gt;&lt;/router-view&gt;
&lt;/keep-alive&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">keep</span>-alive&gt;
   &lt;router-<span class="hljs-keyword">view</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;$route.meta.keepAlive&quot;</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;/<span class="hljs-keyword">keep</span>-alive&gt;</code></pre><hr><p>&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;<code>&#x5E38;&#x8BC6;</code>&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x8FD8;&#x6CA1;&#x6709;&#x4F7F;&#x7528; keep-alive &#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x8BB0;&#x4E0B;&#x6765;&#xFF1A;</p><p>1&#x3001;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x7B2C;&#x4E00;&#x6B21;&#x7684;<code>&#x751F;&#x547D;&#x5468;&#x671F;</code>&#xFF1A;</p><blockquote>mounted ==&gt; activated</blockquote><p>2&#x3001;&#x5207;&#x6362;&#x8DEF;&#x7531;&#x518D;&#x6B21;&#x8FDB;&#x6765;&#x53EA;&#x4F1A;&#x89E6;&#x53D1; <code>activated</code></p><p>3&#x3001;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; router &#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570; <code>beforeRouteEnter</code> &#x6765;&#x505A;&#x4E00;&#x4E9B;&#x8F85;&#x52A9;&#x5224;&#x65AD;</p><p>&#x5177;&#x4F53;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x5B98;&#x65B9;&#x7684;&#x8FD9;&#x4E2A;&#x7684;&#x6587;&#x6863;&#xFF1A;<a href="https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E8%B7%AF%E7%94%B1%E7%8B%AC%E4%BA%AB%E7%9A%84%E5%AE%88%E5%8D%AB" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh/g...</a></p><blockquote>&#x4E0D;&#x80FD;&#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B; <code>this</code></blockquote><p>&#x6BD4;&#x5982;&#x4F60;&#x8981;&#x8BBE;&#x7F6E; data &#x91CC;&#x9762;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x62B1;&#x6B49;&#xFF0C;&#x8FD9;&#x91CC;&#x64CD;&#x4F5C;&#x4E0D;&#x4E86;&#xFF0C;<code>&#x90A3;&#x5982;&#x4F55;&#x505A;&#x5462;&#xFF1F;</code></p><p>&#x5F88;&#x591A;&#x719F;&#x6089;&#x7684;&#x4EBA;&#x4F1A;&#x60F3;&#x5230; <code>next</code> &#x64CD;&#x4F5C; <code>vm &#x5BF9;&#x8C61;</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeRouteEnter (to, from, next) {
  next(vm =&gt; {
    // &#x901A;&#x8FC7; `vm` &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>beforeRouteEnter (<span class="hljs-keyword">to</span>, from, <span class="hljs-keyword">next</span>) {
  <span class="hljs-keyword">next</span>(<span class="hljs-keyword">vm</span> =&gt; {
    // &#x901A;&#x8FC7; `<span class="hljs-keyword">vm</span>` &#x8BBF;&#x95EE;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;
  })
}</code></pre><p>&#x662F;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>from.name</code> &#x6765;&#x505A;&#x4E00;&#x4E9B;&#x5224;&#x65AD;&#xFF0C;&#x6BD4;&#x5982;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF1A;</p><blockquote>&#x9700;&#x6C42;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5224;&#x65AD;&#x4E00;&#x4E0B;&#x4ECE;<code>&#x7279;&#x5B9A;&#x8DEF;&#x7531;</code>&#x5207;&#x6362;&#x8FC7;&#x6765;&#xFF0C;&#x505A;&#x4E00;&#x4E2A;&#x5224;&#x65AD;&#x8D4B;&#x503C;&#x7ED9; data &#x7684; isFromTester</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="beforeRouteEnter (to, from, next) {
  console.log(to, from);
  if (from.name == &apos;Tester&apos;) {
    next(vm =&gt; {
      vm.isFromTester = true
    })
  } else {
    next(vm =&gt; {
      vm.isFromTester = false
    })
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>beforeRouteEnter (to, <span class="hljs-keyword">from</span>, next) {
  <span class="hljs-built_in">console</span>.log(to, <span class="hljs-keyword">from</span>);
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">from</span>.name == <span class="hljs-string">&apos;Tester&apos;</span>) {
    next(<span class="hljs-function"><span class="hljs-params">vm</span> =&gt;</span> {
      vm.isFromTester = <span class="hljs-literal">true</span>
    })
  } <span class="hljs-keyword">else</span> {
    next(<span class="hljs-function"><span class="hljs-params">vm</span> =&gt;</span> {
      vm.isFromTester = <span class="hljs-literal">false</span>
    })
  }
}</code></pre><p>&#x7136;&#x540E;&#x4F60;&#x5C31;&#x53EF;&#x4EE5;&#x5728; activated &#x751F;&#x547D;&#x5468;&#x671F;&#x76F4;&#x63A5;&#x5224;&#x65AD;&#x5566;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="activated () {
  if (this.isFromTester) {
    //...
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gcode"><code>activated <span class="hljs-comment">()</span> {
  <span class="hljs-keyword">if</span> <span class="hljs-comment">(this.isFromTester)</span> {
    <span class="hljs-comment">//...</span>
  }
}</code></pre><p>&#x5927;&#x529F;&#x544A;&#x6210;&#x5566;</p><blockquote>&#x62B1;&#x6B49;&#xFF0C;&#x8FD9;&#x91CC;&#x7684; activated &#x4E0D;&#x4F1A;&#x90A3;&#x4E48;&#x53CA;&#x65F6;&#x5730;&#x66F4;&#x65B0; isFromTester&#xFF0C;&#x6240;&#x4EE5;<code>&#x7B2C;&#x4E00;&#x6B21;&#x4F60;&#x83B7;&#x53D6;&#x7684;&#x4E0D;&#x662F; true</code>&#xFF0C;&#x7B2C;&#x4E8C;&#x6B21;&#x662F;&#x53EF;&#x4EE5;&#x7684;</blockquote><p>&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x8981;&#x6765;&#x5228;&#x6839;&#x95EE;&#x5E95;&#x4E86;&#xFF0C;&#x5230;&#x5E95;&#x4E3A;&#x5565;&#x4E0D;&#x662F;&#x53CA;&#x65F6;&#x66F4;&#x65B0;&#x7684;&#x5462;&#xFF1F;</p><p>&#x6709;&#x6CA1;&#x6709;&#x4EBA;&#x60F3;&#x5230;&#x4E86; vue &#x91CC;&#x9762;&#x4E00;&#x4E2A;&#x5F88;&#x5E38;&#x89C1;&#x7684; <code>nextTick</code> &#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#xFF1F;</p><p>&#x662F;&#x6EF4;&#xFF0C;&#x5C31;&#x662F;&#x5B83;&#xFF0C;&#x5B83;&#x9A97;&#x4E86; activated&#xFF0C;&#x771F;&#x76F8;&#x5728;&#x8FD9;&#x91CC;&#xFF1A;&#xFF08;&#x6211;&#x4EEC;&#x7701;&#x53BB;&#x4E86;&#x5F88;&#x591A;&#x8DEF;&#x7531;&#x4E8B;&#x4EF6;&#x91CC;&#x9762;&#x81EA;&#x5DF1;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#x548C; vue activated &#x7684; hook &#x7684;&#x89E6;&#x53D1;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/bVbhmX3?w=1050&amp;h=606" src="https://static.alili.tech/img/bVbhmX3?w=1050&amp;h=606" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[vuejs 踩坑实战系列] keep-alive 被 beforeRouteEnter 骗了

## 原文链接
[https://segmentfault.com/a/1190000016493658](https://segmentfault.com/a/1190000016493658)


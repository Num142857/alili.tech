---
title: '利用Storage Event实现页面间通信' 
date: 2018-11-21 2:30:10
hidden: true
slug: loytf8cuscn
categories: [reprint]
---

{{< raw >}}
<p>&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#x89E6;&#x53D1;window.onstorage&#x5FC5;&#x987B;&#x6EE1;&#x8DB3;&#x4EE5;&#x4E0B;&#x4E24;&#x4E2A;&#x6761;&#x4EF6;&#xFF1A;</p><ol><li>&#x901A;&#x8FC7;localStorage.setItem&#x6216;sessionStorage.setItem&#x4FDD;&#x5B58;&#xFF08;&#x66F4;&#x65B0;&#xFF09;&#x67D0;&#x4E2A;storage</li><li>&#x4FDD;&#x5B58;&#xFF08;&#x66F4;&#x65B0;&#xFF09;&#x8FD9;&#x4E2A;storage&#x65F6;&#xFF0C;&#x5B83;&#x7684;&#x65B0;&#x503C;&#x5FC5;&#x987B;&#x4E0E;&#x4E4B;&#x524D;&#x7684;&#x503C;&#x4E0D;&#x540C;</li></ol><p>&#x4E0A;&#x9762;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x6761;&#x4EF6;&#xFF0C;&#x7B80;&#x5355;&#x6765;&#x8BB2;&#x5C31;&#x662F;&#xFF1A;&#x8981;&#x4E48;&#x662F;storage&#x7684;&#x521D;&#x59CB;&#x5316;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x5B58;&#x5728;&#x7684;storage&#xFF0C;&#x5176;&#x503C;&#x4E3A;null&#xFF1B;&#x8981;&#x4E48;&#x5C31;&#x662F;&#x5BF9;&#x5DF2;&#x6709;storage&#x7684;&#x66F4;&#x65B0;</p><p>&#x4E3E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521D;&#x59CB;&#x5316;storage
window.localStorage.setItem(&apos;a&apos;, 123);

// &#x6CE8;&#x518C;onstorage&#x4E8B;&#x4EF6;
window.onstorage = (e) =&gt; {
  console.log(e);
};

// &#x66F4;&#x65B0;storage
window.localStorage.setItem(&apos;a&apos;, 123);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;storage</span>
<span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-number">123</span>);

<span class="hljs-comment">// &#x6CE8;&#x518C;onstorage&#x4E8B;&#x4EF6;</span>
<span class="hljs-built_in">window</span>.onstorage = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(e);
};

<span class="hljs-comment">// &#x66F4;&#x65B0;storage</span>
<span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-number">123</span>);</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x6700;&#x540E;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x5E76;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;onstorage&#x4E8B;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;a&#x7684;&#x503C;&#x5E76;&#x6CA1;&#x6709;&#x53D8;&#x5316;&#xFF0C;&#x524D;&#x540E;&#x90FD;&#x662F;123&#xFF0C;&#x6240;&#x4EE5;&#x6D4F;&#x89C8;&#x5668;&#x5224;&#x5B9A;&#x8FD9;&#x6B21;&#x66F4;&#x65B0;&#x662F;&#x65E0;&#x6548;&#x7684;</p><p>&#x7531;&#x4E8E;onstorage&#x4E8B;&#x4EF6;&#x662F;&#x6D4F;&#x89C8;&#x5668;&#x89E6;&#x53D1;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x6253;&#x5F00;&#x4E86;&#x591A;&#x4E2A;<strong>&#x76F8;&#x540C;&#x57DF;&#x540D;</strong>&#x4E0B;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5E76;&#x5728;&#x5176;&#x4E2D;&#x4EFB;&#x4E00;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x6267;&#x884C;window.localStorage.setItem&#x65B9;&#x6CD5;&#xFF08;&#x8FD8;&#x8981;&#x4FDD;&#x8BC1;&#x6EE1;&#x8DB3;&#x6587;&#x7AE0;&#x5F00;&#x5934;&#x63D0;&#x5230;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x6761;&#x4EF6;&#xFF09;&#xFF0C;&#x90A3;&#x4E48;&#x5176;&#x4ED6;&#x9875;&#x9762;&#x5982;&#x679C;&#x76D1;&#x542C;&#x4E86;onstorage&#x4E8B;&#x4EF6;&#xFF0C;&#x5219;&#x8FD9;&#x4E9B;&#x9875;&#x9762;&#x4E2D;&#x7684;onstorage&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#x90FD;&#x4F1A;&#x88AB;&#x6267;&#x884C;</p><p>&#x4E3E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// http://www.example.com/a.html
&lt;script&gt;
// &#x6CE8;&#x518C;onstorage&#x4E8B;&#x4EF6;
window.onstorage = (e) =&gt; {
  console.log(e);
};
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// http://www.example.com/a.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// &#x6CE8;&#x518C;onstorage&#x4E8B;&#x4EF6;</span>
<span class="hljs-built_in">window</span>.onstorage = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(e);
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// http://www.example.com/b.html
&lt;script&gt;
// &#x6CE8;&#x518C;onstorage&#x4E8B;&#x4EF6;
window.onstorage = (e) =&gt; {
  console.log(e);
};
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// http://www.example.com/b.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// &#x6CE8;&#x518C;onstorage&#x4E8B;&#x4EF6;</span>
<span class="hljs-built_in">window</span>.onstorage = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(e);
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// http://www.example.com/c.html
&lt;script&gt;
// &#x89E6;&#x53D1;onstorage&#x4E8B;&#x4EF6;
window.localStorage.setItem(&apos;a&apos;, new Date().getTime());
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">// http://www.example.com/c.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// &#x89E6;&#x53D1;onstorage&#x4E8B;&#x4EF6;</span>
<span class="hljs-built_in">window</span>.localStorage.setItem(<span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime());
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x53EA;&#x8981;&#x4FDD;&#x8BC1;c&#x9875;&#x9762;&#x5728;a&#x548C;b&#x9875;&#x9762;&#x4E4B;&#x540E;&#x6253;&#x5F00;&#xFF08;&#x54EA;&#x6015;&#x4E09;&#x4E2A;&#x9875;&#x9762;&#x4E0D;&#x5728;&#x540C;&#x4E00;&#x6D4F;&#x89C8;&#x5668;&#x7A97;&#x53E3;&#xFF0C;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x533A;&#x522B;&#x7A97;&#x53E3;&#x4E0E;tab&#x9875;&#x7684;&#x533A;&#x522B;&#xFF09;&#xFF0C;&#x90A3;&#x4E48;a&#x548C;b&#x9875;&#x9762;&#x4E2D;&#x7684;onstorage&#x4E8B;&#x4EF6;&#x90FD;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x5982;&#x4F55;&#x5229;&#x7528;storage event&#x5B9E;&#x73B0;&#x4E86;&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x901A;&#x4FE1;&#x5BF9;&#x4E8E;&#x6211;&#x4EEC;&#x6709;&#x4F55;&#x7528;&#x9014;&#x5462;&#xFF1F;<br>&#x5176;&#x5B9E;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x77E5;&#x9053;&#x662F;&#x54EA;&#x4E2A;storage&#x7684;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x89E6;&#x53D1;&#x4E86;onstorage&#x4E8B;&#x4EF6;&#x5C31;&#x8DB3;&#x591F;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5982;&#x4F55;&#x77E5;&#x9053;&#x5462;&#xFF1F;onstorage&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#x548C;&#x5176;&#x4ED6;&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x63A5;&#x6536;&#x4E00;&#x4E2A;event&#x5BF9;&#x8C61;&#x53C2;&#x6570;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E2D;&#x6709;3&#x4E2A;&#x6709;&#x7528;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5B83;&#x4EEC;&#x5206;&#x522B;&#x662F;&#xFF1A;</p><ol><li>key &#x88AB;&#x521D;&#x59CB;&#x5316;&#x6216;&#x66F4;&#x65B0;&#x7684;storage&#x7684;&#x952E;&#x540D;</li><li>oldValue &#x88AB;&#x521D;&#x59CB;&#x5316;&#x6216;&#x66F4;&#x65B0;&#x7684;storage&#x4E4B;&#x524D;&#x7684;&#x503C;</li><li>newValue &#x88AB;&#x521D;&#x59CB;&#x5316;&#x6216;&#x66F4;&#x65B0;&#x7684;storage&#x4E4B;&#x540E;&#x7684;&#x503C;</li></ol><p>&#x7ED3;&#x5408;&#x8FD9;3&#x4E2A;&#x5173;&#x952E;&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x9875;&#x9762;&#x95F4;&#x7684;&#x6570;&#x636E;&#x540C;&#x6B65;</p><p>&#x6700;&#x540E;&#x63D0;&#x4E00;&#x4E0B;localStorage&#x4E0E;sessionStorage&#x7684;&#x533A;&#x522B;</p><blockquote>localStorage &#x91CC;&#x9762;&#x5B58;&#x50A8;&#x7684;&#x6570;&#x636E;&#x6CA1;&#x6709;&#x8FC7;&#x671F;&#x65F6;&#x95F4;&#x8BBE;&#x7F6E;&#xFF0C;&#x800C;&#x5B58;&#x50A8;&#x5728; sessionStorage &#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#x5728;&#x9875;&#x9762;&#x4F1A;&#x8BDD;&#x7ED3;&#x675F;&#x65F6;&#x4F1A;&#x88AB;&#x6E05;&#x9664;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用Storage Event实现页面间通信

## 原文链接
[https://segmentfault.com/a/1190000015738484](https://segmentfault.com/a/1190000015738484)


---
title: 前端进阶（10） - webpack 之外的另一种选择：parcel
hidden: true
categories: reprint
slug: b94dd8ab
date: 2018-11-09 02:30:06
---

{{< raw >}}
<h1 id="articleHeader0">webpack &#x4E4B;&#x5916;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x9009;&#x62E9;&#xFF1A;parcel</h1><p>&#x4E4B;&#x524D;&#x6709;&#x5199;&#x8FC7;&#x4E00;&#x7BC7; <a href="https://github.com/senntyou/blogs/blob/master/advanced/6.md" rel="nofollow noreferrer" target="_blank">webpack &#x4E4B;&#x5916;&#x7684;&#x53E6;&#x4E00;&#x79CD;&#x9009;&#x62E9;&#xFF1A;rollup</a>&#xFF0C;&#x8FD9;&#x6B21;&#x7B97;&#x662F;&#x59CA;&#x59B9;&#x7BC7;&#xFF0C;&#x4ECB;&#x7ECD;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x5DE5;&#x5177; <a href="https://github.com/parcel-bundler/parcel" rel="nofollow noreferrer" target="_blank">parcel</a>.</p><p>&#x73B0;&#x5728;&#x524D;&#x7AEF;&#x6253;&#x5305;&#x57FA;&#x672C;&#x4E0A;&#x90FD;&#x4F1A;&#x7528; <a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>&#xFF0C;&#x4F46;&#x7ECF;&#x5E38;&#x4F7F;&#x7528; <code>webpack</code> &#x7684;&#x5F00;&#x53D1;&#x8005;&#x57FA;&#x672C;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x4F53;&#x4F1A;&#xFF1A;&#x914D;&#x7F6E;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x6709;&#x5F88;&#x591A;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x66F4;&#x65B0;&#x9700;&#x8981;&#x5230;&#x5904;&#x6539;&#x914D;&#x7F6E;&#x3002;</p><p><a href="https://github.com/parcel-bundler/parcel" rel="nofollow noreferrer" target="_blank">parcel</a> &#x4FBF;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684;&#x9009;&#x62E9;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E0D;&#x559C;&#x6B22;&#x914D;&#x7F6E;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x5C24;&#x5176;&#x53CB;&#x597D;&#xFF0C;&#x56E0;&#x4E3A; <a href="https://github.com/parcel-bundler/parcel" rel="nofollow noreferrer" target="_blank">parcel</a> &#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x4EC5;&#x6709;&#x7684;&#x5C11;&#x91CF;&#x914D;&#x7F6E;&#x9879;&#x4E5F;&#x662F;&#x4ECE;&#x547D;&#x4EE4;&#x884C;&#x8F93;&#x5165;&#x3002;&#x53E6;&#x5916; <code>parcel</code> &#x4F1A;&#x81EA;&#x52A8;&#x8BC6;&#x522B;&#x5B89;&#x88C5;&#x5728; <code>package.json</code> &#x4E2D;&#x7684; <code>parcel</code> &#x63D2;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x5BFC;&#x5165;&#xFF0C;&#x800C;&#x65E0;&#x9700;&#x624B;&#x52A8;&#x914D;&#x7F6E;&#x3002;</p><h2 id="articleHeader1">1. parcel</h2><h3 id="articleHeader2">1.1 &#x5B89;&#x88C5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x5168;&#x5C40;
npm install -g parcel-bundler

# &#x672C;&#x5730;
npm install --save-dev parcel-bundler" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code><span class="hljs-comment"># &#x5168;&#x5C40;</span>
npm <span class="hljs-keyword">install </span>-g parcel-<span class="hljs-keyword">bundler
</span>
<span class="hljs-comment"># &#x672C;&#x5730;</span>
npm <span class="hljs-keyword">install </span>--save-dev parcel-<span class="hljs-keyword">bundler</span></code></pre><h3 id="articleHeader3">1.2 &#x5F00;&#x53D1;</h3><p><code>parcel</code> &#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;&#x7684;&#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#xFF0C;&#x4F46;&#x4E00;&#x822C;&#x662F;&#x4EE5; HTML &#x6216; JavaScript &#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#x3002;</p><p>&#x5F53;&#x4EE5;&#x4E00;&#x4E2A; html &#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x5728; html &#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x58F0;&#x660E;&#x591A;&#x4E2A; js &#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x58F0;&#x660E;&#x591A;&#x4E2A; css &#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x52A0;&#x8F7D;&#x5176;&#x4ED6;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF08;&#x5982;&#x56FE;&#x7247;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;zh-CN&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;title&gt;Title&lt;/title&gt;
  &lt;link rel=&quot;stylesheet&quot; href=&quot;./index.css&quot;&gt;   &lt;!-- css &#x5165;&#x53E3;&#x6587;&#x4EF6; --&gt;
  &lt;link rel=&quot;stylesheet&quot; href=&quot;./index2.css&quot;&gt;  &lt;!-- css &#x5165;&#x53E3;&#x6587;&#x4EF6; 2 --&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;img src=&quot;./images/background.jpg&quot;&gt;            &lt;!-- &#x52A0;&#x8F7D;&#x56FE;&#x7247; --&gt;
&lt;script src=&quot;./index.js&quot;&gt;&lt;/script&gt;             &lt;!-- js &#x5165;&#x53E3;&#x6587;&#x4EF6; --&gt;
&lt;script src=&quot;./index2.js&quot;&gt;&lt;/script&gt;            &lt;!-- js &#x5165;&#x53E3;&#x6587;&#x4EF6; 2 --&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;zh-CN&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;./index.css&quot;</span>&gt;</span>   <span class="hljs-comment">&lt;!-- css &#x5165;&#x53E3;&#x6587;&#x4EF6; --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&quot;stylesheet&quot;</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;./index2.css&quot;</span>&gt;</span>  <span class="hljs-comment">&lt;!-- css &#x5165;&#x53E3;&#x6587;&#x4EF6; 2 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./images/background.jpg&quot;</span>&gt;</span>            <span class="hljs-comment">&lt;!-- &#x52A0;&#x8F7D;&#x56FE;&#x7247; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>             <span class="hljs-comment">&lt;!-- js &#x5165;&#x53E3;&#x6587;&#x4EF6; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./index2.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>            <span class="hljs-comment">&lt;!-- js &#x5165;&#x53E3;&#x6587;&#x4EF6; 2 --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x4F46;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x53EA;&#x6709;&#x4E00;&#x4E2A; js &#x5165;&#x53E3;&#xFF0C;css &#x4F7F;&#x7528; js &#x6765;&#x52A0;&#x8F7D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;zh-CN&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;title&gt;Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script src=&quot;./index.js&quot;&gt;&lt;/script&gt;             &lt;!-- js &#x5165;&#x53E3;&#x6587;&#x4EF6; --&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;zh-CN&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./index.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>             <span class="hljs-comment">&lt;!-- js &#x5165;&#x53E3;&#x6587;&#x4EF6; --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8FD0;&#x884C;&#x5F00;&#x53D1;&#x547D;&#x4EE4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parcel path/to/target.html" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs llvm"><code style="word-break:break-word;white-space:initial">parcel path/<span class="hljs-keyword">to</span>/<span class="hljs-keyword">target</span>.html</code></pre><p>&#x6253;&#x5305;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parcel build path/to/target.html" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs n1ql"><code style="word-break:break-word;white-space:initial">parcel <span class="hljs-keyword">build</span> <span class="hljs-keyword">path</span>/<span class="hljs-keyword">to</span>/target.html</code></pre><p>&#x4EE5;&#x4E00;&#x4E2A; js &#x6587;&#x4EF6;&#x4F5C;&#x4E3A;&#x5165;&#x53E3;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x4E5F;&#x662F;&#x7C7B;&#x4F3C;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#x5B98;&#x65B9;&#x6587;&#x6863; <a href="https://parceljs.org/" rel="nofollow noreferrer" target="_blank">https://parceljs.org/</a>&#x3002;</p><h2 id="articleHeader4">2. parcel vs webpack</h2><p>&#x4E0E; <code>webpack</code> &#x76F8;&#x6BD4;&#xFF0C;&#x96F6;&#x914D;&#x7F6E;&#x662F; <code>parcel</code> &#x6700;&#x5927;&#x7684;&#x7279;&#x70B9;&#x4E0E;&#x4F18;&#x52BF;&#xFF0C;&#x4F46; <code>parcel</code> &#x6CA1;&#x6709; <code>webpack</code> &#x529F;&#x80FD;&#x5F3A;&#x5927;&#xFF0C;&#x4E5F;&#x7F3A;&#x5C11;&#x4E86;&#x4E9B;&#x7075;&#x6D3B;&#x6027;&#x3002;</p><h2 id="articleHeader5">3. &#x540E;&#x7EED;</h2><p>&#x66F4;&#x591A;&#x535A;&#x5BA2;&#xFF0C;&#x67E5;&#x770B; <a href="https://github.com/senntyou/blogs" rel="nofollow noreferrer" target="_blank">https://github.com/senntyou/blogs</a></p><p>&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/senntyou" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x4E88;&#x4E4B; (@senntyou)</a></p><p>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A;&#x81EA;&#x7531;&#x8F6C;&#x8F7D;-&#x975E;&#x5546;&#x7528;-&#x975E;&#x884D;&#x751F;-&#x4FDD;&#x6301;&#x7F72;&#x540D;&#xFF08;<a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">&#x521B;&#x610F;&#x5171;&#x4EAB;3.0&#x8BB8;&#x53EF;&#x8BC1;</a>&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端进阶（10） - webpack 之外的另一种选择：parcel

## 原文链接
[https://segmentfault.com/a/1190000016409719](https://segmentfault.com/a/1190000016409719)


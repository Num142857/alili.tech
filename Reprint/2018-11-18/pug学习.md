---
title: 'pug学习' 
date: 2018-11-18 2:30:10
hidden: true
slug: 1h0iyouvt0x
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">pug&#x5B66;&#x4E60;</h2><p>jade(pug)<br>&#x7531;&#x4E8E;&#x5546;&#x6807;&#x7248;&#x6743;&#x95EE;&#x9898;&#xFF0C;jade&#x5DF2;&#x7ECF;&#x6539;&#x540D;&#x4E3A;Pug&#x3002;<br>Pug &#x662F;&#x4E00;&#x4E2A;&#x9AD8;&#x6027;&#x80FD;&#x7684;&#x6A21;&#x677F;&#x5F15;&#x64CE;&#xFF0C;&#x5B83;&#x662F;&#x7528; JavaScript &#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x4F9B; Node &#x4F7F;&#x7528;,&#x5F53;&#x7136;&#x8FD8;&#x652F;&#x6301;&#x5176;&#x4ED6;&#x8BED;&#x8A00;&#x3002;</p><p>&#x6587;&#x4EF6;&#x540E;&#x7F00;&#x540D;&#x4E3A;.pug(.jade)</p><h3 id="articleHeader1">pug&#x4F18;&#x70B9;</h3><ul><li>&#x53EF;&#x8BFB;&#x6027;&#x9AD8;</li><li>&#x7075;&#x6D3B;&#x7684;&#x7F29;&#x8FDB;</li><li>&#x5757;&#x5C55;&#x5F00;</li><li>&#x4EE3;&#x7801;&#x9ED8;&#x8BA4;&#x7ECF;&#x8FC7;&#x7F16;&#x7801;&#x5904;&#x7406;(&#x8F6C;&#x4E49;),&#x5B89;&#x5168;&#x6027;&#x9AD8;</li><li>&#x8FD0;&#x884C;&#x65F6;&#x548C;&#x7F16;&#x8BD1;&#x65F6;&#x4E0A;&#x4E0B;&#x6587;&#x9519;&#x8BEF;&#x62A5;&#x544A;</li><li>&#x652F;&#x6301;&#x547D;&#x4EE4;&#x884C;&#x7F16;&#x8BD1;</li><li>&#x652F;&#x6301;html5&#x6A21;&#x5F0F;</li><li>&#x5728;&#x5185;&#x5B58;&#x4E2D;&#x7F13;&#x5B58;(&#x53EF;&#x9009;)</li><li>&#x539F;&#x751F;&#x652F;&#x6301; Express</li><li>&#x5408;&#x5E76;&#x52A8;&#x6001;&#x548C;&#x9759;&#x6001;&#x6807;&#x7B7E;&#x7C7B;</li><li>&#x8FC7;&#x6EE4;&#x5668;</li></ul><h3 id="articleHeader2">&#x5B89;&#x88C5;</h3><p>npm&#x5B89;&#x88C5; &#x5EFA;&#x8BAE;&#x5B89;&#x88C5;&#x4E2A;nrm&#x6765;&#x8FDB;&#x884C;&#x6E90;&#x7BA1;&#x7406;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install pug -g
npm install pug-cli -g" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> pug -g
npm <span class="hljs-keyword">install</span> pug-cli -g</code></pre><h3 id="articleHeader3">&#x6D4B;&#x8BD5;demo</h3><p>&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#x7F16;&#x5199;&#x4EE3;&#x7801;,&#x6700;&#x597D;&#x628A;&#x7F16;&#x8BD1;&#x5668;&#x7684;tab&#x8BBE;&#x7F6E;:2.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.jade

doctype html
html
  head
    title jade test
  body
    h2 jade study" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-comment">// index.jade</span>

doctype <span class="hljs-selector-tag">html</span>
<span class="hljs-selector-tag">html</span>
  head
    title jade test
  <span class="hljs-selector-tag">body</span>
    <span class="hljs-selector-tag">h2</span> jade study</code></pre><p><strong>&#x7C97;&#x66B4;&#x7684;&#x7F16;&#x8BD1;&#x65B9;&#x6CD5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.html
&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;title&gt;jade test&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;h2&gt;jade study    &lt;/h2&gt;&lt;/body&gt;&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// index.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>jade test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>jade study    <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x53D1;&#x73B0;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x4E0D;&#x5177;&#x5907;&#x53EF;&#x8BFB;&#x6027;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pug -- help
 Options:
     -P, --pretty           compile pretty HTML output ## &#x8F93;&#x51FA;&#x6F02;&#x4EAE;&#x7ED3;&#x6784;&#x7684;HTML
    -D, --no-debug         compile without debugging (smaller functions) ## &#x4E0D;&#x5E26;&#x8C03;&#x8BD5;&#x7684;&#x7F16;&#x8BD1;
    -w, --watch            watch files for changes and automatically re-render ## &#x5BF9;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x53D8;&#x52A8;&#x4FDD;&#x6301;&#x76D1;&#x63A7;
    -E, --extension &lt;ext&gt;  specify the output file extension ## &#x6307;&#x5B9A;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x6269;&#x5C55;&#x540D;
    -s, --silent           do not output logs ## &#x4E0D;&#x8F93;&#x51FA;&#x65E5;&#x5FD7;
// &#x91CD;&#x65B0;&#x7F16;&#x8BD1;
pug -P index.jade
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;jade test&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h2&gt;jade study    &lt;/h2&gt;
  &lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>pug -- help
 Options:
     -P, --pretty           compile pretty HTML output ## &#x8F93;&#x51FA;&#x6F02;&#x4EAE;&#x7ED3;&#x6784;&#x7684;HTML
    -D, --no-debug         compile without debugging (smaller functions) ## &#x4E0D;&#x5E26;&#x8C03;&#x8BD5;&#x7684;&#x7F16;&#x8BD1;
    -w, --watch            watch files for changes and automatically re-render ## &#x5BF9;&#x67D0;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x53D8;&#x52A8;&#x4FDD;&#x6301;&#x76D1;&#x63A7;
    -E, --extension <span class="hljs-tag">&lt;<span class="hljs-name">ext</span>&gt;</span>  specify the output file extension ## &#x6307;&#x5B9A;&#x8F93;&#x51FA;&#x6587;&#x4EF6;&#x6269;&#x5C55;&#x540D;
    -s, --silent           do not output logs ## &#x4E0D;&#x8F93;&#x51FA;&#x65E5;&#x5FD7;
// &#x91CD;&#x65B0;&#x7F16;&#x8BD1;
pug -P index.jade
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>jade test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>jade study    <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p><strong>&#x81EA;&#x52A8;&#x7F16;&#x8BD1;</strong><br>&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x5B66;&#x4E60;,&#x8FD9;&#x91CC;&#x53EA;&#x8981;&#x8BBE;&#x7F6E;-w -P .&#x5F00;&#x53D1;&#x4E2D;&#x901A;&#x8FC7;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x6765;&#x8FDB;&#x884C;&#x81EA;&#x52A8;&#x7F16;&#x8BD1;.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pug pug -o . -w -P" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs nginx"><code style="word-break:break-word;white-space:initial"><span class="hljs-attribute">pug</span> pug -o . -w -P</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
pug学习

## 原文链接
[https://segmentfault.com/a/1190000015905507](https://segmentfault.com/a/1190000015905507)


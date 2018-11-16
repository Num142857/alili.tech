---
title: React Router V4 精讲
hidden: true
categories: [reprint]
slug: 90bfdcf6
date: 2018-11-09 02:30:05
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x548C;&#x540E;&#x7AEF;&#x8DEF;&#x7531;</h2><h4>1)&#x540E;&#x7AEF;&#x8DEF;&#x7531;</h4><p>&#x591A;&#x9875;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x4E00;&#x4E2A;URL&#x5BF9;&#x5E94;&#x4E00;&#x4E2A;HTML&#x9875;&#x9762;&#xFF0C;&#x4E00;&#x4E2A;Web&#x5E94;&#x7528;&#x5305;&#x542B;&#x5F88;&#x591A;HTML&#x9875;&#x9762;&#xFF0C;&#x5728;&#x591A;&#x9875;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x9875;&#x9762;&#x8DEF;&#x7531;&#x63A7;&#x5236;&#x7531;&#x670D;&#x52A1;&#x5668;&#x7AEF;&#x8D1F;&#x8D23;&#xFF0C;&#x8FD9;&#x79CD;&#x8DEF;&#x7531;&#x65B9;&#x5F0F;&#x79F0;&#x4E3A;&#x540E;&#x7AEF;&#x8DEF;&#x7531;&#x3002;</p><p>&#x591A;&#x9875;&#x5E94;&#x7528;&#x4E2D;,&#x6BCF;&#x6B21;&#x9875;&#x9762;&#x5207;&#x6362;&#x90FD;&#x9700;&#x8981;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;&#xFF0C;&#x9875;&#x9762;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x4E5F;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#xFF0C;&#x5B58;&#x5728;&#x4E00;&#x5B9A;&#x7684;&#x6D6A;&#x8D39;&#x3002;&#x800C;&#x4E14;&#xFF0C;&#x9875;&#x9762;&#x7684;&#x6574;&#x4F53;&#x5237;&#x65B0;&#x5BF9;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#x4E5F;&#x6709;&#x5F71;&#x54CD;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x540C;&#x9875;&#x9762;&#x95F4;&#x5F80;&#x5F80;&#x5B58;&#x5728;&#x5171;&#x540C;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x4F8B;&#x5982;&#x5BFC;&#x822A;&#x680F;&#x3001;&#x4FA7;&#x8FB9;&#x680F;&#x7B49;&#xFF0C;&#x9875;&#x9762;&#x6574;&#x4F53;&#x5237;&#x65B0;&#x4E5F;&#x4F1A;&#x5BFC;&#x81F4;&#x5171;&#x7528;&#x90E8;&#x5206;&#x7684;&#x5237;&#x65B0;&#x3002;</p><h4>2)&#x524D;&#x7AEF;&#x8DEF;&#x7531;</h4><p>&#x5728;&#x5355;&#x9762;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;URL&#x53D1;&#x751F;&#x5E76;&#x4E0D;&#x4F1A;&#x5411;&#x670D;&#x52A1;&#x5668;&#x53D1;&#x9001;&#x65B0;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x6240;&#x4EE5;&#x201C;&#x903B;&#x8F91;&#x9875;&#x9762;&#x201D;&#x7684;&#x8DEF;&#x7531;&#x53EA;&#x80FD;&#x7531;&#x524D;&#x7AEF;&#x8D1F;&#x8D23;&#xFF0C;&#x8FD9;&#x79CD;&#x8DEF;&#x7531;&#x65B9;&#x5F0F;&#x79F0;&#x4E3A;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x3002;</p><blockquote>&#x76EE;&#x524D;&#xFF0C;&#x56FD;&#x5185;&#x7684;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x5927;&#x591A;&#x5BF9;&#x5355;&#x9875;&#x5E94;&#x7528;&#x7684;SEO&#x652F;&#x6301;&#x7684;&#x4E0D;&#x597D;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x5BF9;&#x4E8E; SEO &#x975E;&#x5E38;&#x770B;&#x91CD;&#x7684; Web<br>&#x5E94;&#x7528;(&#x4F8B;&#x5982;&#xFF0C;&#x4F01;&#x4E1A;&#x5B98;&#x65B9;&#x7F51;&#x7AD9;&#xFF0C;&#x7535;&#x5546;&#x7F51;&#x7AD9;&#x7B49;)&#xFF0C;&#x4E00;&#x822C;&#x8FD8;&#x662F;&#x4F1A;&#x9009;&#x62E9;&#x91C7;&#x7528;&#x591A;&#x9875;&#x9762;&#x5E94;&#x7528;&#x3002;React &#x4E5F;&#x5E76;&#x975E;&#x53EA;&#x80FD;&#x7528;&#x4E8E;&#x5F00;&#x53D1;&#x5355;&#x9875;&#x9762;&#x5E94;&#x7528;&#x3002;</blockquote><h2 id="articleHeader1">&#x4E8C;&#x3001;React Router &#x5B89;&#x88C5;</h2><p>&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x7684; React Router &#x7684;&#x5927;&#x7248;&#x672C;&#x53F7;&#x662F; v4, &#x8FD9;&#x4E5F;&#x662F;&#x76EE;&#x524D;&#x6700;&#x65B0;&#x7248;&#x672C;&#x3002;</p><p>React Router &#x5305;&#x542B;3&#x4E2A;&#x5E93;, react-router&#x3001;react-router-dom&#x3001;&#x548C; react-router-native&#x3002;react-router &#x63D0;&#x4F9B;&#x6700;&#x57FA;&#x672C;&#x7684;&#x8DEF;&#x7531;&#x529F;&#x80FD;&#xFF0C;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x5B89;&#x88C5; react-router,&#x800C;&#x662F;&#x6839;&#x636E;&#x5E94;&#x7528;&#x8FD0;&#x884C;&#x7684;&#x73AF;&#x5883;&#x9009;&#x62E9;&#x5B89;&#x88C5; react-router-dom(&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F7F;&#x7528;)&#x6216; react-router-native(&#x5728; react-native&#x4E2D;&#x4F7F;&#x7528;)&#x3002;react-router-dom &#x548C; react-router-native &#x90FD;&#x4F9D;&#x8D56; react-router,&#x6240;&#x4EE5;&#x5728;&#x5B89;&#x88C5;&#x65F6;&#xFF0C; react-router &#x4E5F;&#x4F1A;&#x81EA;&#x52A8;&#x5B89;&#x88C5;&#x3002;<br>&#x521B;&#x5EFA; Web&#x5E94;&#x7528;&#xFF0C;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react-router-dom
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> react-router-dom
</code></pre><p>&#x521B;&#x5EFA; navtive &#x5E94;&#x7528;&#xFF0C;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install react-router-native
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code> <span class="hljs-built_in">npm</span> install react-router-<span class="hljs-keyword">native</span>
</code></pre><h2 id="articleHeader2">&#x4E09;&#x3001;&#x8DEF;&#x7531;&#x5668;</h2><p>React Router &#x901A;&#x8FC7; Router &#x548C; Route &#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#x5B8C;&#x6210;&#x8DEF;&#x7531;&#x529F;&#x80FD;&#x3002;Router &#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x6210;&#x8DEF;&#x7531;&#x5668;&#xFF0C;&#x4E00;&#x4E2A;&#x5E94;&#x7528;&#x4E2D;&#x9700;&#x8981;&#x4E00;&#x4E2A; Router &#x5B9E;&#x4F8B;&#xFF0C;&#x6240;&#x6709;&#x8DCC;&#x5E45;&#x914D;&#x7F6E;&#x7EC4;&#x4EF6; Route &#x90FD;&#x5B9A;&#x4E49;&#x4E3A; Router &#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;&#x5728; Web&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x4F1A;&#x4F7F;&#x7528;&#x5BF9; Router &#x8FDB;&#x884C;&#x5305;&#x88C5;&#x7684; BrowserRouter &#x6216; HashRouter &#x4E24;&#x4E2A;&#x7EC4;&#x4EF6; BrowserRouter&#x4F7F;&#x7528; HTML5 &#x7684; history API&#xFF08;pushState&#x3001;replaceState&#x7B49;&#xFF09;&#x5B9E;&#x73B0;&#x5E94;&#x7528;&#x7684; UI &#x548C; URL &#x7684;&#x540C;&#x6B65;&#x3002;HashRouter &#x4F7F;&#x7528; URL &#x7684; hash &#x5B9E;&#x73B0;&#x5E94;&#x7528;&#x7684; UI &#x548C; URL &#x540C;&#x6B65;&#x3002;</p><h4>BrowserRouter &#x521B;&#x5EFA;&#x7684; URL &#x5F62;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://example.com/some/path" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code style="word-break:break-word;white-space:initial">http:<span class="hljs-regexp">//</span>example.com<span class="hljs-regexp">/some/</span>path</code></pre><h4>HashRouter &#x521B;&#x5EFA;&#x7684; URL &#x5F62;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" http://example.com/#/some/path
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code> <span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/example.com/</span><span class="hljs-comment">#/some/path</span>
</code></pre><p>&#x4F7F;&#x7528; BrowserRouter &#x65F6;&#xFF0C;&#x4E00;&#x822C;&#x8FD8;&#x9700;&#x8981;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x8FDB;&#x884C;&#x914D;&#x7F6E;&#xFF0C;&#x8BA9;&#x670D;&#x52A1;&#x5668;&#x80FD;&#x6B63;&#x786E;&#x5730;&#x5904;&#x7406;&#x6240;&#x6709;&#x53EF;&#x80FD;&#x7684;URL&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#x53D1;&#x751F; <a href="http://example.com/some/path" rel="nofollow noreferrer" target="_blank">http://example.com/some/path</a> &#x548C; <a href="http://example.com/some/path2" rel="nofollow noreferrer" target="_blank">http://example.com/some/path2</a> &#x4E24;&#x4E2A;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x9700;&#x8981;&#x80FD;&#x8FD4;&#x56DE;&#x6B63;&#x786E;&#x7684; HTML &#x9875;&#x9762;&#xFF08;&#x4E5F;&#x5C31;&#x662F;&#x5355;&#x9875;&#x9762;&#x5E94;&#x7528;&#x4E2D;&#x552F;&#x4E00;&#x7684; HTML &#x9875;&#x9762;&#xFF09;</p><p>HashRouter &#x5219;&#x4E0D;&#x5B58;&#x5728;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x56E0;&#x4E3A; hash &#x90E8;&#x5206;&#x7684;&#x5185;&#x5BB9;&#x4F1A;&#x88AB;&#x670D;&#x52A1;&#x5668;&#x81EA;&#x52A8;&#x5FFD;&#x7565;&#xFF0C;&#x771F;&#x6B63;&#x6709;&#x6548;&#x7684;&#x4FE1;&#x606F;&#x662F; hash &#x524D;&#x7AEF;&#x7684;&#x90E8;&#x5206;&#xFF0C;&#x800C;&#x5BF9;&#x4E8E;&#x5355;&#x9875;&#x5E94;&#x7528;&#x6765;&#x8BF4;&#xFF0C;&#x8FD9;&#x90E8;&#x5206;&#x662F;&#x56FA;&#x5B9A;&#x7684;&#x3002;</p><p>Router &#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; history &#x5BF9;&#x8C61;&#xFF0C;history &#x7528;&#x6765;&#x8DDF;&#x8E2A; URL, &#x5F53;URL &#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C; Router,&#x7684;&#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x4F1A;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x3002;React Router &#x4E2D;&#x63D0;&#x4F9B;&#x7684;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; context &#x83B7;&#x53D6; history &#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E5F;&#x9690;&#x542B;&#x8BF4;&#x660E;&#x4E86; React Router &#x4E2D;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x5FC5;&#x987B;&#x4F5C;&#x4E3A; Router &#x7EC4;&#x4EF6;&#x540E;&#x4EE3;&#x4F7F;&#x7528;&#x3002;&#x4F46; Router &#x4E2D;&#x53EA;&#x80FD;&#x552F;&#x4E00;&#x7684;&#x4E00;&#x4E2A;&#x5B50;&#x5143;&#x7D20;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6B63;&#x786E;
ReactDOM.render(
  (
  &lt;BrowserRouter&gt;
    &lt;App /&gt;
  &lt;/BrowserRouter&gt;),
  document.getElementById(&apos;root&apos;)
)
//&#x9519;&#x8BEF;&#xFF0C;Router &#x4E2D;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5B50;&#x5143;&#x7D20;
ReactDOM.render(
  (
    &lt;BrowserRouter&gt;
      &lt;App1 /&gt;
      &lt;App2 /&gt;
    &lt;/BrowserRouter&gt;),
  document.getElementById(&apos;root&apos;)
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x6B63;&#x786E;</span>
ReactDOM.render(
  (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span>),
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>)
)
<span class="hljs-comment">//&#x9519;&#x8BEF;&#xFF0C;Router &#x4E2D;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#x5B50;&#x5143;&#x7D20;</span>
ReactDOM.render(
  (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">App1</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">App2</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span>),
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;root&apos;</span>)
)</code></pre><h2 id="articleHeader3">&#x56DB;&#x3001;&#x8DEF;&#x7531;&#x5668;</h2><p>Route &#x662F; React Router&#x4E2D;&#x7528;&#x4E8E;&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#x4FE1;&#x606F;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E5F;&#x662F; React Router &#x4E2D;&#x4F7F;&#x7528;&#x9891;&#x7387;&#x6700;&#x9AD8;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x6BCF;&#x5F53;&#x6709;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x6839;&#x636E; URL &#x51B3;&#x5B9A;&#x662F;&#x5426;&#x6E32;&#x67D3;&#x65F6;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; Route&#x3002;</p><h4>1) path</h4><p>&#x6BCF;&#x4E2A; Route &#x90FD;&#x9700;&#x8981;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; path &#x5C5E;&#x6027;&#xFF0C;&#x5F53;&#x4F7F;&#x7528; BrowserRouter &#x65F6;&#xFF0C;path &#x7528;&#x6765;&#x63CF;&#x8FF0;&#x8FD9;&#x4E2A;Router&#x5339;&#x914D;&#x7684; URL &#x7684;pathname;&#x5F53;&#x4F7F;&#x7528; HashRouter&#x65F6;&#xFF0C;path &#x7528;&#x6765;&#x63CF;&#x8FF0;&#x8FD9;&#x4E2A; Route &#x5339;&#x914D;&#x7684; URL &#x7684; hash&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x4F7F;&#x7528; BrowserRouter &#x65F6;&#xFF0C;&lt;Route path=&apos;&apos;foo&apos; /&gt; &#x4F1A;&#x5339;&#x914D;&#x4E00;&#x4E2A; pathname &#x4EE5; foo &#x5F00;&#x59CB;&#x7684; URL &#xFF08;&#x5982;: <a href="http://example.com/foo" rel="nofollow noreferrer" target="_blank">http://example.com/foo</a>&#xFF09;&#x3002;&#x5F53; URL &#x5339;&#x914D;&#x4E00;&#x4E2A; Route &#x65F6;&#xFF0C;&#x8FD9;&#x4E2A; Route &#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x5C31;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x3002;</p><h4>2)match</h4><p>&#x5F53; URL &#x548C; Route&#x5339;&#x914D;&#x65F6;&#xFF0C;Route &#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; match &#x5BF9;&#x8C61;&#x4F5C;&#x4E3A; props &#x4E2D;&#x7684;&#x4E00;&#x4E2A; &#x5C5E;&#x6027;&#x4F20;&#x9012;&#x7ED9;&#x88AB;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x5305;&#x542B;&#x4EE5;&#x4E0B;4&#x4E2A;&#x5C5E;&#x6027;&#x3002;</p><p>&#xFF08;1&#xFF09;params: Route&#x7684; path &#x53EF;&#x4EE5;&#x5305;&#x542B;&#x53C2;&#x6570;&#xFF0C;&#x4F8B;&#x5982; &lt;Route path=&quot;/foo/:id&quot; &#x5305;&#x542B;&#x4E00;&#x4E2A;&#x53C2;&#x6570; id&#x3002;params&#x5C31;&#x662F;&#x7528;&#x4E8E;&#x4ECE;&#x5339;&#x914D;&#x7684; URL &#x4E2D;&#x89E3;&#x6790;&#x51FA; path &#x4E2D;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4F8B;&#x5982;&#xFF0C;&#x5F53; URL = &apos;<a href="http://example.ocm/foo/1" rel="nofollow noreferrer" target="_blank">http://example.ocm/foo/1</a>&apos; &#x65F6;&#xFF0C;params= {id: 1}&#x3002;</p><p>&#xFF08;2&#xFF09;isExact: &#x662F;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5F53; URL &#x5B8C;&#x5168;&#x5339;&#x65F6;&#xFF0C;&#x503C;&#x4E3A; true; &#x5F53; URL &#x90E8;&#x5206;&#x5339;&#x914D;&#x65F6;&#xFF0C;&#x503C;&#x4E3A; false.&#x4F8B;&#x5982;&#xFF0C;&#x5F53; path=&apos;/foo&apos;&#x3001;URL=&quot;http://example.com/foo&quot; &#x65F6;&#xFF0C;&#x662F;&#x5B8C;&#x5168;&#x5339;&#x914D;; &#x5F53; URL=&quot;http://example.com/foo/1&quot; &#x65F6;&#xFF0C;&#x662F;&#x90E8;&#x5206;&#x5339;&#x914D;&#x3002;</p><p>&#xFF08;3&#xFF09;path: Route &#x7684; path &#x5C5E;&#x6027;&#xFF0C;&#x6784;&#x5EFA;&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#x65F6;&#x4F1A;&#x4F7F;&#x7528;&#x5230;&#x3002;</p><p>&#xFF08;4&#xFF09;url: URL &#x7684;&#x5339;&#x914D;&#x7684;&#x65B9;&#x5F0F;</p><h4>3)Route &#x6E32;&#x67D3;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;</h4><p>&#xFF08;1&#xFF09;component</p><p>component &#x7684;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5F53; URL &#x548C; Route &#x5339;&#x914D;&#x65F6;&#xFF0C;Component&#x5C5E;&#x6027;&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x5C31;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Route path=&apos;/foo&apos; component={Foo} &gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/foo&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Foo}</span> &gt;</span>
</code></pre><p>&#x5F53; URL = &quot;http://example.com/foo&quot; &#x65F6;&#xFF0C;Foo&#x7EC4;&#x4EF6;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x3002;</p><p>(2) render<br>render &#x7684;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; React &#x5143;&#x7D20;&#x3002;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x65B9;&#x4FBF;&#x5730;&#x4E3A;&#x5F85;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x989D;&#x5916;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Route path=&apos;/foo&apos; render={(props) =&gt; {
  &lt;Foo {...props} data={extraProps} /&gt;
}}&gt;
&lt;/Route&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/foo&apos;</span> <span class="hljs-attr">render</span>=<span class="hljs-string">{(props)</span> =&gt;</span> {
  <span class="hljs-tag">&lt;<span class="hljs-name">Foo</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">data</span>=<span class="hljs-string">{extraProps}</span> /&gt;</span>
}}&gt;
<span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span></code></pre><p>Foo &#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x4E86;&#x4E00;&#x4E2A;&#x989D;&#x5916;&#x7684; data &#x5C5E;&#x6027;&#x3002;</p><p>&#xFF08;3&#xFF09;children<br>children &#x7684;&#x503C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x8981;&#x6E32;&#x67D3;&#x7684; React &#x5143;&#x7D20;&#x3002; &#x4E0E;&#x524D;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x4E0D;&#x540C;&#x4E4B;&#x5904;&#x662F;&#xFF0C;&#x65E0;&#x8BBA;&#x662F;&#x5426;&#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C; children &#x8FD4;&#x56DE;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5F53;&#x5339;&#x914D;&#x4E0D;&#x6210;&#x529F;&#x65F6;&#xFF0C;match &#x5C5E;&#x6027;&#x4E3A; null&#x3002;&#x4F8B;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Route path=&apos;/foo&apos; render={(props) =&gt; {
  &lt;div className={props.match ? &apos;active&apos;: &apos;&apos;}&gt;
    &lt;Foo {...props} data={extraProps} /&gt;
  &lt;/div&gt;
}}&gt;
&lt;/Route&gt;    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/foo&apos;</span> <span class="hljs-attr">render</span>=<span class="hljs-string">{(props)</span> =&gt;</span> {
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{props.match</span> ? &apos;<span class="hljs-attr">active</span>&apos;<span class="hljs-attr">:</span> &apos;&apos;}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Foo</span> {<span class="hljs-attr">...props</span>} <span class="hljs-attr">data</span>=<span class="hljs-string">{extraProps}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
}}&gt;
<span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>    </code></pre><p>&#x5982;&#x679C; Route &#x5339;&#x914D;&#x5F53;&#x524D; URL&#xFF0C;&#x5F85;&#x6E32;&#x67D3;&#x5143;&#x7D20;&#x7684;&#x6839;&#x8282;&#x70B9; div &#x7684; class &#x5C06;&#x8BBE;&#x7F6E;&#x6210; active.</p><h4>4&#xFF09;Switch &#x548C; exact</h4><p>&#x5F53;URL &#x548C;&#x591A;&#x4E2A; Route &#x5339;&#x914D;&#x65F6;&#xFF0C;&#x8FD9;&#x4E9B; Route &#x90FD;&#x4F1A;&#x6267;&#x884C;&#x6E32;&#x67D3;&#x64CD;&#x4F5C;&#x3002;&#x5982;&#x679C;&#x53EA;&#x60F3;&#x8BA9;&#x7B2C;&#x4E00;&#x4E2A;&#x5339;&#x914D;&#x7684; Route &#x6C89;&#x6D78;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x628A;&#x8FD9;&#x4E9B; Route &#x5305;&#x5230;&#x4E00;&#x4E2A; Switch &#x7EC4;&#x4EF6;&#x4E2D;&#x3002;&#x5982;&#x679C;&#x60F3;&#x8BA9; URL &#x548C; Route &#x5B8C;&#x5168;&#x5339;&#x914D;&#x65F6;&#xFF0C;Route&#x624D;&#x6E32;&#x67D3;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; Route &#x7684; exact &#x5C5E;&#x6027;&#x3002;Switch &#x548C; exact &#x5E38;&#x5E38;&#x8054;&#x5408;&#x4F7F;&#x7528;&#xFF0C;&#x7528;&#x4E8E;&#x5E94;&#x7528;&#x9996;&#x9875;&#x7684;&#x5BFC;&#x822A;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Router&gt;
 &lt;Switch&gt;
    &lt;Route exact path=&apos;/&apos; component={Home}/&gt;
    &lt;Route exact path=&apos;/posts&apos; component={Posts} /&gt;
    &lt;Route exact path=&apos;/:user&apos; component={User} /&gt;
  &lt;/Switch&gt;
&lt;/Router&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}/</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/posts&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Posts}</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/:user&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{User}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></code></pre><p>&#x5982;&#x679C;&#x4E0D;&#x4F7F;&#x7528; Switch,&#x5F53; URL &#x7684; pathname &#x4E3A; &quot;/posts&quot; &#x65F6;&#xFF0C;&lt;Route path=&apos;/posts&apos; /&gt; &#x548C; &lt;Route path=&apos;:user&apos; /&gt; &#x90FD;&#x4F1A;&#x88AB;&#x5339;&#x914D;&#xFF0C;&#x4F46;&#x663E;&#x7136;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x5E0C;&#x671B; &lt;Route path=&apos;:user&apos; /&gt; &#x88AB;&#x5339;&#x914D;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4E5F;&#x6CA1;&#x6709;&#x7528;&#x6237;&#x540D;&#x4E3A; posts &#x7684;&#x7528;&#x6237;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x4F7F;&#x7528; exact&#xFF0C; &quot;/&quot; &quot;/posts&quot; &quot;/user1&quot;&#x7B49;&#x51E0;&#x4E4E;&#x6240;&#x6709; URL &#x90FD;&#x4F1A;&#x5339;&#x914D;&#x7B2C;&#x4E00;&#x4E2A; Route,&#x53C8;&#x56E0;&#x4E3A;Switch &#x7684;&#x5B58;&#x5728;&#xFF0C;&#x540E;&#x9762;&#x7684;&#x4E24;&#x4E2A; Route&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x88AB;&#x5339;&#x914D;&#x3002;&#x4F7F;&#x7528; exact,&#x4FDD;&#x8BC1; &#x53EA;&#x6709;&#x5F53; URL &#x7684; pathname &#x4E3A; &apos;/&apos;&#x65F6;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;Route&#x624D;&#x4F1A;&#x5339;&#x914D;&#x3002;</p><h4>5&#xFF09;&#x5D4C;&#x5957;&#x8DEF;&#x7531;</h4><p>&#x5D4C;&#x5957;&#x8DEF;&#x7531;&#x662F;&#x6307;&#x5728;Route &#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x5B9A;&#x4E49;&#x65B0;&#x7684; Route&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5728;&#x4E0A;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x5728; Posts &#x7EC4;&#x4EF6;&#x5185;&#x518D;&#x5B9A;&#x4E49;&#x4E24;&#x4E2A; Route:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Posts = ({match}) =&gt; {
  return (
    &lt;div&gt;
      {/* &#x8FD9;&#x91CC; match.url &#x7B49;&#x4E8E; /posts */}
      &lt;Route path={`${match.url}/:id`} component={PostDetail} /&gt;
      &lt;Route exact path={match.url} component={PostList} /&gt;
    &lt;/div&gt;
  )
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">const Posts = (</span><span class="hljs-template-variable">{match}</span><span class="xml">) =&gt; </span><span class="hljs-template-variable">{
  return (
    &lt;div&gt;
      {/* &#x8FD9;&#x91CC; match.url &#x7B49;&#x4E8E; /posts */}</span><span class="xml">
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=</span></span><span class="hljs-template-variable">{`${match.url}</span><span class="xml"><span class="hljs-tag">/<span class="hljs-attr">:id</span>`} <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{PostDetail}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=</span></span><span class="hljs-template-variable">{match.url}</span><span class="xml"><span class="hljs-tag"> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{PostList}</span><span class="xml"><span class="hljs-tag"> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  )
}
</span></code></pre><h2 id="articleHeader4">&#x4E94;&#x3001;&#x94FE;&#x63A5;</h2><p>Link &#x662F; React Router&#x63D0;&#x4F9B;&#x7684;&#x94FE;&#x63A5;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E00;&#x4E2A; Link &#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x4E86;&#x5F53;&#x70B9;&#x51FB;&#x8BE5; Link &#x65F6;&#xFF0C;&#x9875;&#x9762;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x8DEF;&#x7531;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Navigation = () =&gt; {
  &lt;header&gt;
    &lt;nav&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;Link to=&apos;/&apos;&gt;Home&lt;/Link&gt;&lt;/li&gt;
        &lt;li&gt;&lt;Link to=&apos;/posts&apos;&gt;Posts&lt;/Link&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/nav&gt;
  &lt;/header&gt;
}    
   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>const Navigation = () =&gt; {
  <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&apos;/&apos;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&apos;/posts&apos;</span>&gt;</span>Posts<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
}    
   </code></pre><p>Link &#x4F7F;&#x7528; to &#x5C5E;&#x6027;&#x58F0;&#x660E;&#x8981;&#x5BFC;&#x822A;&#x5230;&#x7684;URL&#x5730;&#x5740;&#x3002;to &#x53EF;&#x4EE5;&#x662F; string &#x6216; object &#x7C7B;&#x578B;&#xFF0C;&#x5F53; to &#x4E3A; object &#x7C7B;&#x578B;&#x65F6;&#xFF0C;&#x53EF;&#x4EE5;&#x5305;&#x542B; pathname&#x3001;search&#x3001;hash&#x3001;state &#x56DB;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4F8B;&#x5982;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Link to={{
  pathname: &apos;/posts&apos;,
  search: &apos;?sort=name&apos;,
  hash:&apos;#the-hash&apos;,
  state: { fromHome: true}
}}&gt;
&lt;/Link&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>={{
  pathname: <span class="hljs-string">&apos;/posts&apos;</span>,
  search: <span class="hljs-string">&apos;?sort=name&apos;</span>,
  hash:<span class="hljs-string">&apos;#the-hash&apos;</span>,
  state: { fromHome: <span class="hljs-literal">true</span>}
}}&gt;
&lt;/<span class="hljs-keyword">Link</span>&gt;
</code></pre><p>&#x9664;&#x4E86;&#x4F7F;&#x7528;Link&#x5916;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; history &#x5BF9;&#x8C61;&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x5BFC;&#x822A;&#x3002;history &#x4E2D;&#x6700;&#x5E38;&#x7528;&#x7684;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x662F; push(path,[state]) &#x548C; replace(path,[state]),push&#x4F1A;&#x5411;&#x6D4F;&#x89C8;&#x5668;&#x8BB0;&#x5F55;&#x4E2D;&#x65B0;&#x589E;&#x4E00;&#x6761;&#x8BB0;&#x5F55;&#xFF0C;replace &#x4F1A;&#x7528;&#x65B0;&#x8BB0;&#x5F55;&#x66FF;&#x6362;&#x8BB0;&#x5F55;&#x3002;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="history.push(&apos;/posts&apos;);
history.replace(&apos;/posts&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">history</span><span class="hljs-selector-class">.push</span>(<span class="hljs-string">&apos;/posts&apos;</span>);
<span class="hljs-selector-tag">history</span><span class="hljs-selector-class">.replace</span>(<span class="hljs-string">&apos;/posts&apos;</span>);
</code></pre><h2 id="articleHeader5">&#x516D;&#x3001;&#x8DEF;&#x7531;&#x8BBE;&#x8BA1;</h2><p>&#x8DEF;&#x7531;&#x8BBE;&#x8BA1;&#x7684;&#x8FC7;&#x7A0B;&#x53EF;&#x4EE5;&#x5206;&#x4E3A;&#x4E24;&#x6B65;&#xFF1A;</p><ol><li>&#x4E3A;&#x6BCF;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x5B9A;&#x4E49;&#x6709;&#x8BED;&#x4E49;&#x7684;&#x8DEF;&#x7531;&#x540D;&#x79F0;(path)</li><li>&#x7EC4;&#x7EC7; Route &#x7ED3;&#x6784;&#x5C42;&#x6B21;</li></ol><h4>1&#xFF09;&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x540D;&#x79F0;</h4><p>&#x6211;&#x4EEC;&#x6709;&#x4E09;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x6309;&#x7167;&#x9875;&#x9762;&#x529F;&#x80FD;&#x4E0D;&#x96BE;&#x5B9A;&#x4E49;&#x51FA;&#x5982;&#x4E0B;&#x7684;&#x8DEF;&#x7531;&#x540D;&#x79F0;&#xFF1A;</p><ul><li>&#x767B;&#x5F55;&#x9875;&#xFF1A; /login</li><li>&#x5E16;&#x5B50;&#x5217;&#x8868;&#x9875;: /posts</li><li>&#x5E16;&#x5B50;&#x8BE6;&#x60C5;&#x9875;: /posts/:id(id&#x4EE3;&#x8868;&#x5E16;&#x5B50;&#x7684;ID)</li></ul><p>&#x4F46;&#x662F;&#x8FD9;&#x4E9B;&#x8FD8;&#x4E0D;&#x591F;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x8003;&#x8651;&#x6253;&#x5F00;&#x5E94;&#x7528;&#x65F6;&#x7684;&#x9ED8;&#x8BA4;&#x9875;&#x9762;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6839;&#x8DEF;&#x5F84;&quot;/&quot;&#x5BF9;&#x5E94;&#x7684;&#x9875;&#x9762;&#x3002;&#x7ED3;&#x5408;&#x4E1A;&#x52A1;&#x573A;&#x666F;&#xFF0C;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x4F5C;&#x4E3A;&#x5E94;&#x7528;&#x7684;&#x9ED8;&#x8BA4;&#x9875;&#x9762;&#x4E3A;&#x5408;&#x9002;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x5BF9;&#x5E94;&#x4E24;&#x4E2A;&#x8DEF;&#x7531;&#x540D;&#x79F0;: &apos;/posts&apos;&#x548C; &apos;/&apos;</p><h4>2&#xFF09;&#x7EC4;&#x7EC7; Route &#x7ED3;&#x6784;&#x5C42;&#x6B21;</h4><p>React Router 4&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x4E00;&#x4E2A;&#x5730;&#x65B9;&#x96C6;&#x4E2D;&#x58F0;&#x660E;&#x5E94;&#x7528;&#x9700;&#x8981;&#x7684;&#x6240;&#x6709; Route, Route&#x5B9E;&#x9645;&#x4E0A;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x7684; React &#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x610F;&#x5730;&#x65B9;&#x4F7F;&#x7528;&#x5B83;&#xFF08;&#x524D;&#x63D0;&#x662F;&#xFF0C;Route&#x5FC5;&#x987B;&#x662F; Router &#x7684;&#x5B50;&#x8282;&#x70B9;&#xFF09;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x7075;&#x6D3B;&#x6027;&#x4E5F;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x589E;&#x52A0;&#x4E86;&#x7EC4;&#x7EC7; Route &#x7ED3;&#x6784;&#x5C42;&#x6B21;&#x7684;&#x96BE;&#x5EA6;&#x3002;<br>&#x6211;&#x4EEC;&#x5148;&#x8003;&#x8651;&#x7B2C;&#x4E00;&#x5C42;&#x7EA7;&#x7684;&#x8DEF;&#x7531;&#x3002;&#x767B;&#x5F55;&#x9875;&#x548C;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x9875;(&#x9996;&#x9875;)&#x5E94;&#x8BE5;&#x5C5E;&#x4E8E;&#x7B2C;&#x4E00;&#x5C42;&#x7EA7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Router&gt;
  &lt;Switch&gt;
    &lt;Route exact path=&quot;/&quot; component={Home}&gt;&lt;/Route&gt;
    &lt;Route exact path=&quot;/login&quot; component={Login}&gt;&lt;/Route&gt;
    &lt;Route exact path=&quot;/posts&quot; component={Home}&gt;&lt;/Route&gt;
  &lt;/Switch&gt;
&lt;/Router&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/login&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Login}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/posts&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
</code></pre><p>&#x7B2C;&#x4E00;&#x4E2A;Route &#x4F7F;&#x7528;&#x4E86; exact &#x5C5E;&#x6027;&#xFF0C;&#x4FDD;&#x8BC1;&#x53EA;&#x6709;&#x5F53;&#x8BBF;&#x95EE;&#x6839;&#x8DEF;&#x5F84;&#x65F6;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A; Route &#x624D;&#x4F1A;&#x5339;&#x914D;&#x6210;&#x529F;&#x3002;Home &#x662F;&#x9996;&#x9875;&#x5BF9;&#x5E94;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; &quot;/posts&quot; &#x548C; &#x201C;/&#x201D; &#x4E24;&#x4E2A;&#x8DEF;&#x5F84;&#x8BBF;&#x95EE;&#x9996;&#x9875;&#x3002;&#x6CE8;&#x610F;&#xFF0C;&#x8FD9;&#x91CC;&#x5E76;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x6E32;&#x67D3;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x7EC4;&#x4EF6;&#xFF0C;&#x771F;&#x6B63;&#x6E32;&#x67D3;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#x5728; Home &#x7EC4;&#x4EF6;&#x5185;&#xFF0C;&#x901A;&#x8FC7;&#x7B2C;&#x4E8C;&#x5C42;&#x7EA7;&#x7684;&#x8DEF;&#x7531;&#x5904;&#x7406;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x7EC4;&#x4EF6;&#x548C;&#x5E16;&#x5B50;&#x8BE6;&#x60C5;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#xFF0C;components/Home.js &#x7684;&#x4E3B;&#x8981;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Home extends Component {
  /**&#x7701;&#x7565;&#x5176;&#x4F59;&#x4EE3;&#x7801; */
  render() {
    const {match, location } = this.props;
    const { username } = this.state;
    return(
      &lt;div&gt;
        &lt;Header
          username = {username}
          onLogout={this.handleLogout}
          location = {location}
        &gt;
        &lt;/Header&gt;
        {/* &#x5E16;&#x5B50;&#x5217;&#x8868;&#x8DEF;&#x7531;&#x914D;&#x7F6E; */}
        &lt;Route
          path = {match.url}
          exact
          render={props =&gt; &lt;PostList username={username} {...this.props}&gt;&lt;/PostList&gt;}
        &gt;&lt;/Route&gt;
      &lt;/div&gt;
    )
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">/**&#x7701;&#x7565;&#x5176;&#x4F59;&#x4EE3;&#x7801; */</span>
  render() {
    <span class="hljs-keyword">const</span> {match, location } = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> { username } = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span>(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span>
          <span class="hljs-attr">username</span> = <span class="hljs-string">{username}</span>
          <span class="hljs-attr">onLogout</span>=<span class="hljs-string">{this.handleLogout}</span>
          <span class="hljs-attr">location</span> = <span class="hljs-string">{location}</span>
        &gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Header</span>&gt;</span>
        {/* &#x5E16;&#x5B50;&#x5217;&#x8868;&#x8DEF;&#x7531;&#x914D;&#x7F6E; */}
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>
          <span class="hljs-attr">path</span> = <span class="hljs-string">{match.url}</span>
          <span class="hljs-attr">exact</span>
          <span class="hljs-attr">render</span>=<span class="hljs-string">{props</span> =&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">PostList</span> <span class="hljs-attr">username</span>=<span class="hljs-string">{username}</span> {<span class="hljs-attr">...this.props</span>}&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">PostList</span>&gt;</span>}
        &gt;<span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}
</code></pre><p>Home&#x7684;render&#x5185;&#x5B9A;&#x4E49;&#x4E86;&#x4E24;&#x4E2A; Route,&#x5206;&#x522B;&#x7528;&#x4E8E;&#x6E32;&#x67D3;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x548C;&#x5E16;&#x5B50;&#x8BE6;&#x60C5;&#x3002;PostList &#x662F;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x7EC4;&#x4EF6;&#xFF0C;Post&#x662F;&#x5E16;&#x5B50;&#x8BE6;&#x60C5;&#x7EC4;&#x4EF6;&#xFF0C;&#x4EE3;&#x7801;&#x4F7F;&#x7528;Router &#x7684;render&#x5C5E;&#x6027;&#x6E32;&#x67D3;&#x8FD9;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x9700;&#x8981;&#x63A5;&#x6536;&#x989D;&#x5916;&#x7684; username &#x5C5E;&#x6027;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x65E0;&#x8BBA;&#x8BBF;&#x95EE;&#x662F;&#x5E16;&#x5B50;&#x5217;&#x8868;&#x9875;&#x9762;&#x8FD8;&#x662F;&#x5E16;&#x5B50;&#x8BE6;&#x60C5;&#x9875;&#x9762;&#xFF0C;&#x90FD;&#x4F1A;&#x5171;&#x7528;&#x76F8;&#x540C; Header &#x7EC4;&#x4EF6;&#x3002;</p><h2 id="articleHeader6">&#x4E03;&#x3001;&#x4EE3;&#x7801;&#x5206;&#x7247;</h2><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5F53;&#x5728;&#x9879;&#x76EE;&#x6839;&#x8DEF;&#x5F84;&#x4E0B;&#x6267;&#x884C; npm run build &#x65F6; ,create-react-app&#x5185;&#x90E8;&#x4F7F;&#x7528; webpack&#x5C06; src&#x8DEF;&#x5F84;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x4EE3;&#x7801;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A; JS &#x6587;&#x4EF6;&#x548C;&#x4E00;&#x4E2A; Css &#x6587;&#x4EF6;&#x3002;</p><p>&#x5F53;&#x9879;&#x76EE;&#x4EE3;&#x7801;&#x91CF;&#x4E0D;&#x591A;&#x65F6;&#xFF0C;&#x628A;&#x6240;&#x6709;&#x4EE3;&#x7801;&#x6253;&#x5305;&#x5230;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x505A;&#x6CD5;&#x5E76;&#x4E0D;&#x4F1A;&#x6709;&#x4EC0;&#x4E48;&#x5F71;&#x54CD;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x5927;&#x578B;&#x5E94;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x628A;&#x6240;&#x6709;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x6253;&#x5305;&#x5230;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x663E;&#x7136;&#x5C31;&#x4E0D;&#x5408;&#x9002;&#x4E86;&#x3002;</p><p>create-react-app &#x652F;&#x6301;&#x901A;&#x8FC7;&#x52A8;&#x6001; import() &#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x5206;&#x7247;&#x3002;import()&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x8DEF;&#x5F84;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x7136;&#x540E;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; Promise &#x5BF9;&#x8C61;&#xFF0C; Promise &#x5BF9;&#x8C61;&#x7684;&#x503C;&#x5C31;&#x662F;&#x5F85;&#x5BFC;&#x5165;&#x7684;&#x6A21;&#x5757;&#x5BF9;&#x8C61;&#x3002;&#x4F8B;&#x5982;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// moduleA.js

const moduleA = &apos;Hello&apos;
export { moduleA };

// App.js

import React, { Component } from &apos;react&apos;;

class App extends Component {
  handleClick = () =&gt; {
    // &#x4F7F;&#x7528;import &#x52A8;&#x6001;&#x5BFC;&#x5165; moduleA.js
    import(&apos;./moduleA&apos;)
      .then(({moduleA}) =&gt; {
        // &#x4F7F;&#x7528;moduleA
      })
      .catch(err=&gt; {
        //&#x5904;&#x7406;&#x9519;&#x8BEF;
      })
  };
  render() {
    return(
      &lt;div&gt;
        &lt;button onClick={this.handleClick}&gt;&#x52A0;&#x8F7D; moduleA&lt;/button&gt;
      &lt;/div&gt;
    )
  }
}

export default App;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// moduleA.js</span>

<span class="hljs-keyword">const</span> moduleA = <span class="hljs-string">&apos;Hello&apos;</span>
<span class="hljs-keyword">export</span> { moduleA };

<span class="hljs-comment">// App.js</span>

<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  handleClick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// &#x4F7F;&#x7528;import &#x52A8;&#x6001;&#x5BFC;&#x5165; moduleA.js</span>
    <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./moduleA&apos;</span>)
      .then(<span class="hljs-function">(<span class="hljs-params">{moduleA}</span>) =&gt;</span> {
        <span class="hljs-comment">// &#x4F7F;&#x7528;moduleA</span>
      })
      .catch(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span> {
        <span class="hljs-comment">//&#x5904;&#x7406;&#x9519;&#x8BEF;</span>
      })
  };
  render() {
    <span class="hljs-keyword">return</span>(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>&#x52A0;&#x8F7D; moduleA<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;
</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4F1A;&#x5C06; moduleA.js &#x548C;&#x5B83;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x7684;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x5355;&#x72EC;&#x6253;&#x5305;&#x5230;&#x4E00;&#x4E2A;chunk&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x7528;&#x6237;&#x70B9;&#x51FB;&#x52A0;&#x8F7D;&#x6309;&#x94AE;&#xFF0C;&#x624D;&#x5F00;&#x59CB;&#x52A0;&#x8F7D;&#x8FD9;&#x4E2A; chunk &#x6587;&#x4EF6;&#x3002;<br>&#x5F53;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528; React Router &#x662F;&#xFF0C;&#x4E00;&#x822C;&#x4F1A;&#x6839;&#x636E;&#x8DEF;&#x7531;&#x4FE1;&#x606F;&#x5C06;&#x9879;&#x76EE;&#x4EE3;&#x7801;&#x5206;&#x7247;&#xFF0C;&#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x4F9D;&#x8D56;&#x7684;&#x4EE3;&#x7801;&#x5355;&#x72EC;&#x6253;&#x5305;&#x6210;&#x4E00;&#x4E2A;chunk&#x6587;&#x4EF6;&#x3002;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x7EDF;&#x4E00;&#x5904;&#x7406;&#x8FD9;&#x4E2A;&#x903B;&#x8F91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
// importComponent &#x662F;&#x4F7F;&#x7528; import()&#x7684;&#x51FD;&#x6570;
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        component:  null //&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#x7EC4;&#x4EF6;
      }
    }
    componentDidMount() {
      importComponent().then((mod) =&gt; {
        this.setState({
          // &#x540C;&#x65F6;&#x517C;&#x5BB9; ES6 &#x548C; CommonJS &#x7684;&#x6A21;&#x5757;
          component: mod.default ? mod.default : mod;
        });
      })
    }
    render() {
      // &#x6E32;&#x67D3;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;
      const C = this.state.component;
      return C ? &lt;C {...this.props}&gt;&lt;/C&gt; : null
    }
  }

  return AsyncComponent;
}  
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-comment">// importComponent &#x662F;&#x4F7F;&#x7528; import()&#x7684;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncComponent</span>(<span class="hljs-params">importComponent</span>) </span>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AsyncComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
      <span class="hljs-keyword">super</span>(props);
      <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">component</span>:  <span class="hljs-literal">null</span> <span class="hljs-comment">//&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#x7EC4;&#x4EF6;</span>
      }
    }
    componentDidMount() {
      importComponent().then(<span class="hljs-function">(<span class="hljs-params">mod</span>) =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
          <span class="hljs-comment">// &#x540C;&#x65F6;&#x517C;&#x5BB9; ES6 &#x548C; CommonJS &#x7684;&#x6A21;&#x5757;</span>
          component: mod.default ? mod.default : mod;
        });
      })
    }
    render() {
      <span class="hljs-comment">// &#x6E32;&#x67D3;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;</span>
      <span class="hljs-keyword">const</span> C = <span class="hljs-keyword">this</span>.state.component;
      <span class="hljs-keyword">return</span> C ? <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">C</span> {<span class="hljs-attr">...this.props</span>}&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">C</span>&gt;</span></span> : <span class="hljs-literal">null</span>
    }
  }

  <span class="hljs-keyword">return</span> AsyncComponent;
}  
</code></pre><p>asyncComponent&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570; importComponent, importComponent &#x5185;&#x901A;&#x8FC7;import()&#x8BED;&#x6CD5;&#x52A8;&#x6001;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x3002;&#x5728;AsyncComponent&#x88AB;&#x6302;&#x8F7D;&#x540E;&#xFF0C;importComponent&#x5C31;&#x4F1A;&#x9634;&#x8C03;&#x7528;&#xFF0C;&#x8FDB;&#x800C;&#x89E6;&#x53D1;&#x52A8;&#x6001;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684;&#x52A8;&#x4F5C;&#x3002;<br>&#x4E0B;&#x9762;&#x5229;&#x7528; asyncComponent &#x5BF9;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x8FDB;&#x884C;&#x6539;&#x9020;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from &apos;react&apos;;
import { ReactDOM, BrowserRouter as Router, Switch, Route } from &apos;react-dom&apos;;
import asyncComponent from &apos;./asyncComponent&apos;
//&#x901A;&#x8FC7;asyncComponent &#x5BFC;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x521B;&#x5EFA;&#x4EE3;&#x7801;&#x5206;&#x7247;&#x70B9;
const AsyncHome = asyncComponent(() =&gt; import(&quot;./components/Home&quot;))
const AsyncLogin = asyncComponent(() =&gt; import(&quot;./components/Login&quot;))

class App extends component {
  render() {
    return(
      &lt;Router&gt;
        &lt;Switch&gt;
          &lt;Route exact path=&quot;/&quot; component={AsyncHome}&gt;&lt;/Route&gt;
          &lt;Route exact path=&quot;/login&quot; component={AsyncLogin}&gt;&lt;/Route&gt;
          &lt;Route exact path=&quot;/posts&quot; component={AsyncHome}&gt;&lt;/Route&gt;
        &lt;/Switch&gt;
      &lt;/Router&gt;
    )
  }
}

export default App;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> { ReactDOM, BrowserRouter <span class="hljs-keyword">as</span> Router, Switch, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-dom&apos;</span>;
<span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./asyncComponent&apos;</span>
<span class="hljs-comment">//&#x901A;&#x8FC7;asyncComponent &#x5BFC;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x521B;&#x5EFA;&#x4EE3;&#x7801;&#x5206;&#x7247;&#x70B9;</span>
<span class="hljs-keyword">const</span> AsyncHome = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./components/Home&quot;</span>))
<span class="hljs-keyword">const</span> AsyncLogin = asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&quot;./components/Login&quot;</span>))

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span>(
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AsyncHome}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/login&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AsyncLogin}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/posts&quot;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{AsyncHome}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span></span>
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;
</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x8DEF;&#x7531;&#x5339;&#x914D;&#x65F6;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x624D;&#x4F1A;&#x88AB;&#x5BFC;&#x5165;&#xFF0C;&#x5B9E;&#x73B0;&#x6309;&#x9700;&#x52A0;&#x8F7D;&#x7684;&#x6548;&#x679C;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6253;&#x5305;&#x540E;&#x6CA1;&#x6709;&#x5355;&#x72EC;&#x7684;CSS&#x6587;&#x4EF6;&#x4E86;&#x3002;&#x8FD9;&#x662F;&#x56E0;&#x4E3A; CSS&#x6837;&#x5B50;&#x88AB;&#x6253;&#x5305;&#x5230;&#x5404;&#x4E2A; chunk &#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5F53; chunk&#x6587;&#x4EF6;&#x88AB;&#x52A0;&#x8F7D;&#x6267;&#x884C;&#x65F6;&#xFF0C;&#x4F1A;&#x6709;&#x52A8;&#x6001;&#x628A; CSS &#x6837;&#x5F0F;&#x63D2;&#x5165;&#x9875;&#x9762;&#x4E2D;&#x3002;&#x5982;&#x679C;&#x5E0C;&#x671B;&#x628A; chunk &#x4E2D;&#x7684; css&#x6253;&#x5305;&#x5230;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x4FEE;&#x6539; webpack &#x4F7F;&#x7528;&#x7684; ExtractTextPlugin &#x63D2;&#x4EF6;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x4F46; create-react-app &#x5E76;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x628A; webpack &#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x66B4;&#x9732;&#x7ED9;&#x7528;&#x6237;&#xFF0C;&#x4E3A;&#x4E86;&#x4FEE;&#x6539;&#x76F8;&#x5E94;&#x914D;&#x7F6E;<br>&#xFF0C;&#x9700;&#x8981;&#x5C06; create-react-app &#x7BA1;&#x7406;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x201C;&#x5F39;&#x5C04;&#x201D;&#x51FA;&#x6765;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x6839;&#x8DEF;&#x5F84;&#x4E0B;&#x6267;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run eject
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> eject
</span></code></pre><p>&#x9879;&#x76EE;&#x4E2D;&#x4F1A;&#x591A;&#x51FA;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF1A;config&#x548C; scripts,scrips&#x4E2D;&#x5305;&#x542B;&#x9879;&#x76EE;&#x542F;&#x52A8;&#x3001;&#x7F16;&#x8BD1;&#x548C;&#x6D4B;&#x8BD5;&#x7684;&#x811A;&#x672C;&#xFF0C;config &#x4E2D;&#x5305;&#x542B;&#x9879;&#x76EE;&#x4F7F;&#x7528;&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;<br>webpack&#x914D;&#x7F6E;&#x6587;&#x4EF6; &#x5C31;&#x5728;&#x8FD9;&#x4E2A;&#x8DEF;&#x5F84;&#x4E0B;&#xFF0C;&#x6253;&#x5305; webpack.config.prod.js &#x627E;&#x5230;&#x914D;&#x7F6E; ExtractTextPlugin &#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6DFB;&#x52A0; allChunks:true &#x8FD9;&#x9879;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new ExtractTextPlugin({
  filename: cssFilename,
  allChunks: true
})

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">ExtractTextPlugin</span>({
  <span class="hljs-attribute">filename</span>: cssFilename,
  allChunks: true
})

</code></pre><p>&#x7136;&#x540E;&#x91CD;&#x65B0;&#x7F16;&#x8BD1;&#x9879;&#x76EE;&#xFF0C;&#x5404;&#x4E2A;chunk &#x6587;&#x4EF6; &#x4F7F;&#x7528;&#x7684; CSS &#x6837;&#x5F0F; &#x53C8;&#x4F1A;&#x7EDF;&#x4E00;&#x6253;&#x5305;&#x5230; main.css &#x4E2D;&#x3002;</p><p><a href="#">&#x4EE5;&#x4E0A;&#x4E3B;&#x8981;&#x53C2;&#x8003; &#x300A;React &#x8FDB;&#x9636;&#x4E4B;&#x8DEF;&#x300B;&#x8FD9;&#x672C;&#x4E66;</a></p><blockquote>&#x613F;&#x4F60;&#x6210;&#x4E3A;&#x7EC8;&#x8EAB;&#x5B66;&#x4E60;&#x8005;</blockquote><p>&#x60F3;&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x751F;&#x6D3B;&#x4E0D;&#x4E3A;&#x4EBA;&#x77E5;&#x7684;&#x4E00;&#x9762;&#xFF0C;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x6211;&#x7684;&#x5927;&#x8FC1;&#x4E16;&#x754C;&#x5662;</p><p><span class="img-wrap"><img data-src="/img/bVbg32a?w=258&amp;h=258" src="https://static.alili.tech/img/bVbg32a?w=258&amp;h=258" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Router V4 精讲

## 原文链接
[https://segmentfault.com/a/1190000016421036](https://segmentfault.com/a/1190000016421036)


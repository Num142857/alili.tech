---
title: 看完离编写高性能的JavaScript又近了一步
hidden: true
categories: [reprint]
slug: 3a522bf2
date: 2018-10-31 02:30:10
---

{{< raw >}}
<p>&#x526F;&#x6807;&#x9898;&#xFF1A;<a href="https://github.com/zhansingsong/js-leakage-patterns" rel="nofollow noreferrer" target="_blank">&#x5E38;&#x89C1;&#x7684;JavaScript&#x5185;&#x5B58;&#x6CC4;&#x9732;</a></p><blockquote>&#x8FD9;&#x662F;&#x5173;&#x4E8E;JavaScript&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x76F8;&#x5173;&#x7684;&#x5E8F;&#x5217;&#x6587;&#x7AE0;&#x4E2D;&#x4E00;&#x7BC7;&#x3002;&#x7531;&#x4E8E;&#x65F6;&#x95F4;&#x6709;&#x9650;&#x66F4;&#x65B0;&#x8FDB;&#x5EA6;&#x4F1A;&#x6709;&#x70B9;&#x6162;&#xFF0C;&#x4F46;&#x4F1A;&#x6301;&#x7EED;&#x66F4;&#x65B0;&#x7684;&#x3002;&#x81EA;&#x5DF1;&#x4E5F;&#x5728;&#x5B66;&#x4E60;&#x4E2D;&#xFF0C;&#x96BE;&#x514D;&#x5BF9;&#x67D0;&#x4E9B;&#x77E5;&#x8BC6;&#x70B9;&#x7684;&#x7406;&#x89E3;&#x4E0D;&#x662F;&#x5F88;&#x6B63;&#x786E;&#xFF0C;&#x6240;&#x4EE5;&#x624D;&#x5C06;&#x6587;&#x7AE0;&#x653E;&#x7F6E;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/README.md" rel="nofollow noreferrer" target="_blank">github</a>&#x4E0A;&#xFF0C;&#x4E00;&#x662F;&#x60F3;&#x4E0E;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#xFF0C;&#x4E8C;&#x662F;&#x65B9;&#x4FBF;&#x6301;&#x7EED;&#x66F4;&#x65B0;&#xFF0C;&#x4E09;&#x662F;&#x4FBF;&#x4E8E;&#x5B9E;&#x65F6;&#x4FEE;&#x6B63;&#x9519;&#x8BEF;&#x70B9;&#x3002;&#x4E5F;&#x5E0C;&#x671B;&#x770B;&#x672C;&#x6587;&#x7684;&#x5404;&#x4F4D;&#x540C;&#x5B66;&#x80FD;&#x591A;&#x63D0;issues&#xFF0C;&#x6211;&#x4F1A;&#x6839;&#x636E;&#x63D0;&#x7684;&#x610F;&#x89C1;&#x4E0D;&#x65AD;&#x5B8C;&#x5584;&#x6587;&#x7AE0;&#x3002;&#x6700;&#x540E;&#x5E0C;&#x671B;&#x5404;&#x4F4D;&#x80FD;&#x4ECE;&#x6587;&#x7AE0;&#x4E2D;&#x6709;&#x6240;&#x6536;&#x83B7;-----&gt;? enjoy reading, enjoy life ?</blockquote><h3 id="articleHeader0"><a href="https://github.com/zhansingsong/js-leakage-patterns" rel="nofollow noreferrer" target="_blank"><span style="font-weight:400">&#x270F;</span>&#xFE0F;&#x6700;&#x65B0;&#x5185;&#x5BB9;&#x8BF7;&#x4EE5;github&#x4E0A;&#x7684;&#x4E3A;&#x51C6;<span style="font-weight:400">&#x2757;</span>&#xFE0F;</a></h3><h3 id="articleHeader1">&#x5E8F;&#x5217;&#x6587;&#x7AE0;&#x94FE;&#x63A5;</h3><ul><li><a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/JavaScript%E5%86%85%E5%AD%98%E9%82%A3%E7%82%B9%E4%BA%8B/JavaScript%E5%86%85%E5%AD%98%E9%82%A3%E7%82%B9%E4%BA%8B.md" rel="nofollow noreferrer" target="_blank">JavaScript&#x5185;&#x5B58;&#x90A3;&#x70B9;&#x4E8B;</a></li><li><a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/%E5%B8%B8%E8%A7%81%E7%9A%84JavaScript%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2/%E5%B8%B8%E8%A7%81%E7%9A%84JavaScript%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2.md" rel="nofollow noreferrer" target="_blank">&#x5E38;&#x89C1;&#x7684;JavaScript&#x5185;&#x5B58;&#x6CC4;&#x9732;</a></li><li><a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/IE%3C8%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8%E5%AF%BC%E8%87%B4%E7%9A%84%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2/IE%3C8%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8%E5%AF%BC%E8%87%B4%E7%9A%84%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2.md" rel="nofollow noreferrer" target="_blank">IE&lt;8&#x5FAA;&#x73AF;&#x5F15;&#x7528;&#x5BFC;&#x81F4;&#x7684;&#x5185;&#x5B58;&#x6CC4;&#x9732;</a></li><li><a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BjQuery.cache/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BjQuery.cache.md" rel="nofollow noreferrer" target="_blank">&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x4E4B;jQuery.cache</a></li><li><a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BListeners/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BListeners.md" rel="nofollow noreferrer" target="_blank">&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x4E4B;Listeners</a></li><li><a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/requestAnimationFrame/requestAnimationFrame.md" rel="nofollow noreferrer" target="_blank">requestAnimationFrame</a></li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000012283259?w=1080&amp;h=810" src="https://static.alili.tech/img/remote/1460000012283259?w=1080&amp;h=810" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x4EC0;&#x4E48;&#x662F;&#x5185;&#x5B58;&#x6CC4;&#x9732;</h2><blockquote><strong>&#x5185;&#x5B58;&#x6CC4;&#x6F0F;</strong>&#x6307;&#x7531;&#x4E8E;&#x758F;&#x5FFD;&#x6216;&#x9519;&#x8BEF;&#x9020;&#x6210;&#x7A0B;&#x5E8F;&#x672A;&#x80FD;&#x91CA;&#x653E;&#x5DF2;&#x7ECF;&#x4E0D;&#x518D;&#x4F7F;&#x7528;&#x7684;&#x5185;&#x5B58;&#x3002;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x5E76;&#x975E;&#x6307;&#x5185;&#x5B58;&#x5728;&#x7269;&#x7406;&#x4E0A;&#x7684;&#x6D88;&#x5931;&#xFF0C;&#x800C;&#x662F;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5206;&#x914D;&#x67D0;&#x6BB5;&#x5185;&#x5B58;&#x540E;&#xFF0C;&#x7531;&#x4E8E;&#x8BBE;&#x8BA1;&#x9519;&#x8BEF;&#xFF0C;&#x5BFC;&#x81F4;&#x5728;&#x91CA;&#x653E;&#x8BE5;&#x6BB5;&#x5185;&#x5B58;&#x4E4B;&#x524D;&#x5C31;&#x5931;&#x53BB;&#x4E86;&#x5BF9;&#x8BE5;&#x6BB5;&#x5185;&#x5B58;&#x7684;&#x63A7;&#x5236;&#xFF0C;&#x4ECE;&#x800C;&#x9020;&#x6210;&#x4E86;&#x5185;&#x5B58;&#x7684;&#x6D6A;&#x8D39;&#x3002;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#x53EA;&#x80FD;&#x7531;&#x83B7;&#x5F97;&#x7A0B;&#x5E8F;&#x6E90;&#x4EE3;&#x7801;&#x7684;&#x7A0B;&#x5E8F;&#x5458;&#x624D;&#x80FD;&#x5206;&#x6790;&#x51FA;&#x6765;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x6709;&#x4E0D;&#x5C11;&#x4EBA;&#x4E60;&#x60EF;&#x4E8E;&#x628A;&#x4EFB;&#x4F55;&#x4E0D;&#x9700;&#x8981;&#x7684;&#x5185;&#x5B58;&#x4F7F;&#x7528;&#x7684;&#x589E;&#x52A0;&#x63CF;&#x8FF0;&#x4E3A;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#xFF0C;&#x5373;&#x4F7F;&#x4E25;&#x683C;&#x610F;&#x4E49;&#x4E0A;&#x6765;&#x8BF4;&#x8FD9;&#x662F;&#x4E0D;&#x51C6;&#x786E;&#x7684;&#x3002;&#x2014;&#x2014;&#x2014;&#x2014;<a href="https://zh.wikipedia.org/wiki/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F" rel="nofollow noreferrer" target="_blank">wikipedia</a></blockquote><p><strong><span style="font-weight:400">&#x26A0;</span>&#xFE0F;&#x6CE8;&#xFF1A;&#x4E0B;&#x6587;&#x4E2D;&#x6807;&#x6CE8;&#x7684;CG&#x662F;Chrome&#x6D4F;&#x89C8;&#x5668;&#x4E2D;Devtools&#x7684;&#x3010;Collect garbage&#x3011;&#x6309;&#x94AE;&#x7F29;&#x5199;&#xFF0C;&#x8868;&#x793A;&#x56DE;&#x6536;&#x5783;&#x573E;&#x64CD;&#x4F5C;&#x3002;</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012334689?w=793&amp;h=106" src="https://static.alili.tech/img/remote/1460000012334689?w=793&amp;h=106" alt="cg" title="cg" style="cursor:pointer"></span></p><h2 id="articleHeader3">&#x610F;&#x5916;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;</h2><p>JavaScript&#x5BF9;&#x672A;&#x58F0;&#x660E;&#x53D8;&#x91CF;&#x7684;&#x5904;&#x7406;&#x65B9;&#x5F0F;&#xFF1A;&#x5728;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E0A;&#x521B;&#x5EFA;&#x8BE5;&#x53D8;&#x91CF;&#x7684;&#x5F15;&#x7528;(&#x5373;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x4E0D;&#x662F;&#x53D8;&#x91CF;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x80FD;&#x901A;&#x8FC7;<code>delete</code>&#x5220;&#x9664;)&#x3002;&#x5982;&#x679C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#xFF0C;&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x5C31;&#x662F;<strong>window</strong>&#x5BF9;&#x8C61;&#x3002;</p><p>&#x5982;&#x679C;&#x672A;&#x58F0;&#x660E;&#x7684;&#x53D8;&#x91CF;&#x7F13;&#x5B58;&#x5927;&#x91CF;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x53EA;&#x6709;&#x5728;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x6216;&#x91CD;&#x65B0;&#x5237;&#x65B0;&#x9875;&#x9762;&#x65F6;&#x624D;&#x80FD;&#x88AB;&#x91CA;&#x653E;&#x3002;&#x8FD9;&#x6837;&#x4F1A;&#x9020;&#x6210;&#x610F;&#x5916;&#x7684;&#x5185;&#x5B58;&#x6CC4;&#x6F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    bar = &quot;this is a hidden global variable with a large of data&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    bar = <span class="hljs-string">&quot;this is a hidden global variable with a large of data&quot;</span>;
}</code></pre><p>&#x7B49;&#x540C;&#x4E8E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    window.bar = &quot;this is an explicit global variable with a large of data&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-built_in">window</span>.bar = <span class="hljs-string">&quot;this is an explicit global variable with a large of data&quot;</span>;
}</code></pre><p>&#x53E6;&#x5916;&#xFF0C;&#x901A;&#x8FC7;<strong>this</strong>&#x521B;&#x5EFA;&#x610F;&#x5916;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    this.variable = &quot;potential accidental global&quot;;
}

// &#x5F53;&#x5728;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x8C03;&#x7528;foo&#x51FD;&#x6570;&#xFF0C;&#x6B64;&#x65F6;this&#x6307;&#x5411;&#x7684;&#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;(window)&#xFF0C;&#x800C;&#x4E0D;&#x662F;&apos;undefined&apos;
foo();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.variable = <span class="hljs-string">&quot;potential accidental global&quot;</span>;
}

<span class="hljs-comment">// &#x5F53;&#x5728;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x8C03;&#x7528;foo&#x51FD;&#x6570;&#xFF0C;&#x6B64;&#x65F6;this&#x6307;&#x5411;&#x7684;&#x662F;&#x5168;&#x5C40;&#x5BF9;&#x8C61;(window)&#xFF0C;&#x800C;&#x4E0D;&#x662F;&apos;undefined&apos;</span>
foo();</code></pre><h3 id="articleHeader4">&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF1A;</h3><p>&#x5728;JavaScript&#x6587;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0;<code>&apos;use strict&apos;</code>&#xFF0C;&#x5F00;&#x542F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x53EF;&#x4EE5;&#x6709;&#x6548;&#x5730;&#x907F;&#x514D;&#x4E0A;&#x8FF0;&#x95EE;&#x9898;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    &quot;use strict&quot; // &#x5728;foo&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x5F00;&#x542F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;
    bar = &quot;this is an explicit global variable with a large of data&quot;;// &#x62A5;&#x9519;&#xFF1A;&#x56E0;&#x4E3A;bar&#x8FD8;&#x6CA1;&#x6709;&#x88AB;&#x58F0;&#x660E;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
<span class="hljs-meta">    &quot;use strict&quot;</span> <span class="hljs-comment">// &#x5728;foo&#x51FD;&#x6570;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x5F00;&#x542F;&#x4E25;&#x683C;&#x6A21;&#x5F0F;</span>
    bar = <span class="hljs-string">&quot;this is an explicit global variable with a large of data&quot;</span>;<span class="hljs-comment">// &#x62A5;&#x9519;&#xFF1A;&#x56E0;&#x4E3A;bar&#x8FD8;&#x6CA1;&#x6709;&#x88AB;&#x58F0;&#x660E;</span>
}</code></pre><p>&#x5982;&#x679C;&#x9700;&#x8981;&#x5728;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x4F7F;&#x7528;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x53EF;&#x4EE5;&#x50CF;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#x6240;&#x793A;&#xFF0C;&#x5728;<strong>window</strong>&#x4E0A;&#x660E;&#x786E;&#x58F0;&#x660E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg) {
    window.bar = &quot;this is a explicit global variable with a large of data&quot;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>) </span>{
    <span class="hljs-built_in">window</span>.bar = <span class="hljs-string">&quot;this is a explicit global variable with a large of data&quot;</span>;
}</code></pre><p>&#x8FD9;&#x6837;&#x4E0D;&#x4EC5;&#x53EF;&#x8BFB;&#x6027;&#x9AD8;&#xFF0C;&#x800C;&#x4E14;&#x540E;&#x671F;&#x7EF4;&#x62A4;&#x4E5F;&#x65B9;&#x4FBF;</p><blockquote>&#x8C08;&#x5230;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x90A3;&#x4E9B;&#x7528;&#x6765;&#x4E34;&#x65F6;&#x5B58;&#x50A8;&#x5927;&#x91CF;&#x6570;&#x636E;&#x7684;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#xFF0C;&#x786E;&#x4FDD;&#x5728;&#x5904;&#x7406;&#x5B8C;&#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x540E;&#x5C06;&#x5176;&#x8BBE;&#x7F6E;&#x4E3A;null&#x6216;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#x3002;&#x5168;&#x5C40;&#x53D8;&#x91CF;&#x4E5F;&#x5E38;&#x7528;&#x6765;&#x505A;cache&#xFF0C;&#x4E00;&#x822C;cache&#x90FD;&#x662F;&#x4E3A;&#x4E86;&#x6027;&#x80FD;&#x4F18;&#x5316;&#x624D;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x4E3A;&#x4E86;&#x6027;&#x80FD;&#xFF0C;&#x6700;&#x597D;&#x5BF9;cache&#x7684;&#x5927;&#x5C0F;&#x505A;&#x4E2A;&#x4E0A;&#x9650;&#x9650;&#x5236;&#x3002;&#x56E0;&#x4E3A;cache&#x662F;&#x4E0D;&#x80FD;&#x88AB;&#x56DE;&#x6536;&#x7684;&#xFF0C;&#x8D8A;&#x9AD8;cache&#x4F1A;&#x5BFC;&#x81F4;&#x8D8A;&#x9AD8;&#x7684;&#x5185;&#x5B58;&#x6D88;&#x8017;&#x3002;</blockquote><h2 id="articleHeader5">console.log</h2><p><code>console.log</code>&#xFF1A;&#x5411;web&#x5F00;&#x53D1;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x4E00;&#x6761;&#x6D88;&#x606F;&#xFF0C;&#x5E38;&#x7528;&#x6765;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#x8C03;&#x8BD5;&#x5206;&#x6790;&#x3002;&#x6709;&#x65F6;&#x5728;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x6253;&#x5370;&#x4E00;&#x4E9B;&#x5BF9;&#x8C61;&#x4FE1;&#x606F;&#xFF0C;&#x4F46;&#x53D1;&#x5E03;&#x65F6;&#x5374;&#x5FD8;&#x8BB0;&#x53BB;&#x6389;<code>console.log</code>&#x8BED;&#x53E5;&#xFF0C;&#x8FD9;&#x53EF;&#x80FD;&#x9020;&#x6210;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x3002;</p><p>&#x5728;&#x4F20;&#x9012;&#x7ED9;<code>console.log</code>&#x7684;&#x5BF9;&#x8C61;&#x662F;&#x4E0D;&#x80FD;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536; &#x267B;&#xFE0F;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x4E4B;&#x540E;&#x9700;&#x8981;&#x5728;&#x5F00;&#x53D1;&#x5DE5;&#x5177;&#x80FD;&#x67E5;&#x770B;&#x5BF9;&#x8C61;&#x4FE1;&#x606F;&#x3002;&#x6240;&#x4EE5;&#x6700;&#x597D;&#x4E0D;&#x8981;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E2D;<code>console.log</code>&#x4EFB;&#x4F55;&#x5BF9;&#x8C61;&#x3002;</p><h3 id="articleHeader6">&#x5B9E;&#x4F8B;------&gt;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/demos/log.html" rel="nofollow noreferrer" target="_blank">demos/log.html</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;Leaker&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;input type=&quot;button&quot; value=&quot;click&quot;&gt;
  &lt;script&gt;
    !function () {
      function Leaker() {
        this.init();
      };
      Leaker.prototype = {
        init: function () {
          this.name = (Array(100000)).join(&apos;*&apos;);
          console.log(&quot;Leaking an object %o: %o&quot;, (new Date()), this);// this&#x5BF9;&#x8C61;&#x4E0D;&#x80FD;&#x88AB;&#x56DE;&#x6536;
        },

        destroy: function () {
          // do something....
        }
      };
      document.querySelector(&apos;input&apos;).addEventListener(&apos;click&apos;, function () {
        new Leaker();
      }, false);
    }()
  &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Leaker<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;click&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    !<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Leaker</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.init();
      };
      Leaker.prototype = {
        <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.name = (<span class="hljs-built_in">Array</span>(<span class="hljs-number">100000</span>)).join(<span class="hljs-string">&apos;*&apos;</span>);
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Leaking an object %o: %o&quot;</span>, (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()), <span class="hljs-keyword">this</span>);<span class="hljs-comment">// this&#x5BF9;&#x8C61;&#x4E0D;&#x80FD;&#x88AB;&#x56DE;&#x6536;</span>
        },

        <span class="hljs-attr">destroy</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">// do something....</span>
        }
      };
      <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;input&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">new</span> Leaker();
      }, <span class="hljs-literal">false</span>);
    }()
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8FD9;&#x91CC;&#x7ED3;&#x5408;Chrome&#x7684;Devtools&#x2013;&gt;Performance&#x505A;&#x4E00;&#x4E9B;&#x5206;&#x6790;&#xFF0C;&#x64CD;&#x4F5C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong><span style="font-weight:400">&#x26A0;</span>&#xFE0F;&#x6CE8;&#xFF1A;&#x6700;&#x597D;&#x5728;&#x9690;&#x85CF;&#x7A97;&#x53E3;&#x4E2D;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x5DE5;&#x4F5C;&#xFF0C;&#x907F;&#x514D;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;&#x5F71;&#x54CD;&#x5206;&#x6790;&#x7ED3;&#x679C;</strong></p><ol><li>&#x5F00;&#x542F;&#x3010;Performance&#x3011;&#x9879;&#x7684;&#x8BB0;&#x5F55;</li><li>&#x6267;&#x884C;&#x4E00;&#x6B21;CG&#xFF0C;&#x521B;&#x5EFA;&#x57FA;&#x51C6;&#x53C2;&#x8003;&#x7EBF;</li><li>&#x8FDE;&#x7EED;&#x5355;&#x51FB;&#x3010;click&#x3011;&#x6309;&#x94AE;&#x4E09;&#x6B21;&#xFF0C;&#x65B0;&#x5EFA;&#x4E09;&#x4E2A;Leaker&#x5BF9;&#x8C61;</li><li>&#x6267;&#x884C;&#x4E00;&#x6B21;CG</li><li>&#x505C;&#x6B62;&#x8BB0;&#x5F55;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000012283260?w=1732&amp;h=1284" src="https://static.alili.tech/img/remote/1460000012283260?w=1732&amp;h=1284" alt="" title="" style="cursor:pointer"></span></p><p>&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#x3010;JS Heap&#x3011;&#x7EBF;&#x6700;&#x540E;&#x6CA1;&#x6709;&#x964D;&#x56DE;&#x5230;&#x57FA;&#x51C6;&#x53C2;&#x8003;&#x7EBF;&#x7684;&#x4F4D;&#x7F6E;&#xFF0C;&#x663E;&#x7136;&#x5B58;&#x5728;&#x6CA1;&#x6709;&#x88AB;&#x56DE;&#x6536;&#x7684;&#x5185;&#x5B58;&#x3002;&#x5982;&#x679C;&#x5C06;&#x4EE3;&#x7801;&#x4FEE;&#x6539;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    !function () {
      function Leaker() {
        this.init();
      };
      Leaker.prototype = {
        init: function () {
          this.name = (Array(100000)).join(&apos;*&apos;);
        },

        destroy: function () {
          // do something....
        }
      };
      document.querySelector(&apos;input&apos;).addEventListener(&apos;click&apos;, function () {
        new Leaker();
      }, false);
    }()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    !<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Leaker</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.init();
      };
      Leaker.prototype = {
        <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">this</span>.name = (<span class="hljs-built_in">Array</span>(<span class="hljs-number">100000</span>)).join(<span class="hljs-string">&apos;*&apos;</span>);
        },

        <span class="hljs-attr">destroy</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-comment">// do something....</span>
        }
      };
      <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;input&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">new</span> Leaker();
      }, <span class="hljs-literal">false</span>);
    }()</code></pre><p>&#x53BB;&#x6389;<code>console.log(&quot;Leaking an object %o: %o&quot;, (new Date()), this);</code>&#x8BED;&#x53E5;&#x3002;&#x91CD;&#x590D;&#x4E0A;&#x8FF0;&#x7684;&#x64CD;&#x4F5C;&#x6B65;&#x9AA4;&#xFF0C;&#x5206;&#x6790;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283261?w=1738&amp;h=1224" src="https://static.alili.tech/img/remote/1460000012283261?w=1738&amp;h=1224" alt="" title="" style="cursor:pointer"></span></p><p>&#x4ECE;&#x5BF9;&#x6BD4;&#x5206;&#x6790;&#x7ED3;&#x679C;&#x53EF;&#x77E5;&#xFF0C;<code>console.log</code>&#x6253;&#x5370;&#x7684;&#x5BF9;&#x8C61;&#x662F;&#x4E0D;&#x4F1A;&#x88AB;&#x5783;&#x573E;&#x56DE;&#x6536;&#x5668;&#x56DE;&#x6536;&#x7684;&#x3002;&#x56E0;&#x6B64;&#x6700;&#x597D;&#x4E0D;&#x8981;&#x5728;&#x9875;&#x9762;&#x4E2D;<code>console.log</code>&#x4EFB;&#x4F55;&#x5927;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x80FD;&#x4F1A;&#x5F71;&#x54CD;&#x9875;&#x9762;&#x7684;&#x6574;&#x4F53;&#x6027;&#x80FD;&#xFF0C;&#x7279;&#x522B;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x4E2D;&#x3002;&#x9664;&#x4E86;<code>console.log</code>&#x5916;&#xFF0C;&#x53E6;&#x5916;&#x8FD8;&#x6709;<code>console.dir</code>&#x3001;<code>console.error</code>&#x3001;<code>console.warn</code>&#x7B49;&#x90FD;&#x5B58;&#x5728;&#x7C7B;&#x4F3C;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x4E9B;&#x7EC6;&#x8282;&#x9700;&#x8981;&#x7279;&#x522B;&#x7684;&#x5173;&#x6CE8;&#x3002;</p><h2 id="articleHeader7">closures(&#x95ED;&#x5305;)</h2><p>&#x5F53;&#x4E00;&#x4E2A;&#x51FD;&#x6570;A&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5185;&#x8054;&#x51FD;&#x6570;B&#xFF0C;&#x5373;&#x4F7F;&#x51FD;&#x6570;A&#x6267;&#x884C;&#x5B8C;&#xFF0C;&#x51FD;&#x6570;B&#x4E5F;&#x80FD;&#x8BBF;&#x95EE;&#x51FD;&#x6570;A&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x8FD9;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x95ED;&#x5305;&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&#x2014;&#x672C;&#x8D28;&#x4E0A;&#x95ED;&#x5305;&#x662F;&#x5C06;&#x51FD;&#x6570;&#x5185;&#x90E8;&#x548C;&#x5916;&#x90E8;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#x7684;&#x4E00;&#x5EA7;&#x6865;&#x6881;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(message) {
    function closure() {
        console.log(message)
    };
    return closure;
}

// &#x4F7F;&#x7528;
var bar = foo(&quot;hello closure!&quot;);
bar()// &#x8FD4;&#x56DE; &apos;hello closure!&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">message</span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">closure</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(message)
    };
    <span class="hljs-keyword">return</span> closure;
}

<span class="hljs-comment">// &#x4F7F;&#x7528;</span>
<span class="hljs-keyword">var</span> bar = foo(<span class="hljs-string">&quot;hello closure!&quot;</span>);
bar()<span class="hljs-comment">// &#x8FD4;&#x56DE; &apos;hello closure!&apos;</span></code></pre><p>&#x5728;&#x51FD;&#x6570;foo&#x5185;&#x521B;&#x5EFA;&#x7684;&#x51FD;&#x6570;closure&#x5BF9;&#x8C61;&#x662F;&#x4E0D;&#x80FD;&#x88AB;&#x56DE;&#x6536;&#x6389;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x88AB;&#x5168;&#x5C40;&#x53D8;&#x91CF;bar&#x5F15;&#x7528;&#xFF0C;&#x5904;&#x4E8E;&#x4E00;&#x76F4;&#x53EF;&#x8BBF;&#x95EE;&#x72B6;&#x6001;&#x3002;&#x901A;&#x8FC7;&#x6267;&#x884C;<code>bar()</code>&#x53EF;&#x4EE5;&#x6253;&#x5370;&#x51FA;<code>hello closure!</code>&#x3002;&#x5982;&#x679C;&#x60F3;&#x91CA;&#x653E;&#x6389;&#x53EF;&#x4EE5;&#x5C06;<code>bar = null</code>&#x5373;&#x53EF;&#x3002;</p><p><strong>&#x7531;&#x4E8E;&#x95ED;&#x5305;&#x4F1A;&#x643A;&#x5E26;&#x5305;&#x542B;&#x5B83;&#x7684;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x56E0;&#x6B64;&#x4F1A;&#x6BD4;&#x5176;&#x4ED6;&#x51FD;&#x6570;&#x5360;&#x7528;&#x66F4;&#x591A;&#x7684;&#x5185;&#x5B58;&#x3002;&#x8FC7;&#x5EA6;&#x4F7F;&#x7528;&#x95ED;&#x5305;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x5360;&#x7528;&#x8FC7;&#x591A;&#x3002;</strong></p><h3 id="articleHeader8">&#x5B9E;&#x4F8B;------&gt;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/demos/closures.html" rel="nofollow noreferrer" target="_blank">demos/closures.html</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;

&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;Closure&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;p&gt;&#x4E0D;&#x65AD;&#x5355;&#x51FB;&#x3010;click&#x3011;&#x6309;&#x94AE;&lt;/p&gt;
  &lt;button id=&quot;click_button&quot;&gt;Click&lt;/button&gt;
  &lt;script&gt;
    function f() {
      var str = Array(10000).join(&apos;#&apos;);
      var foo = {
        name: &apos;foo&apos;
      }
      function unused() {
        var message = &apos;it is only a test message&apos;;
        str = &apos;unused: &apos; + str;
      }
      function getData() {
        return &apos;data&apos;;
      }
      return getData;
    }

    var list = [];
    
    document.querySelector(&apos;#click_button&apos;).addEventListener(&apos;click&apos;, function () {
      list.push(f());
    }, false);
  &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Closure<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x4E0D;&#x65AD;&#x5355;&#x51FB;&#x3010;click&#x3011;&#x6309;&#x94AE;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;click_button&quot;</span>&gt;</span>Click<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> str = <span class="hljs-built_in">Array</span>(<span class="hljs-number">10000</span>).join(<span class="hljs-string">&apos;#&apos;</span>);
      <span class="hljs-keyword">var</span> foo = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;foo&apos;</span>
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unused</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> message = <span class="hljs-string">&apos;it is only a test message&apos;</span>;
        str = <span class="hljs-string">&apos;unused: &apos;</span> + str;
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getData</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;data&apos;</span>;
      }
      <span class="hljs-keyword">return</span> getData;
    }

    <span class="hljs-keyword">var</span> list = [];
    
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#click_button&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      list.push(f());
    }, <span class="hljs-literal">false</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8FD9;&#x91CC;&#x7ED3;&#x5408;Chrome&#x7684;Devtools-&gt;Memory&#x5DE5;&#x5177;&#x8FDB;&#x884C;&#x5206;&#x6790;&#xFF0C;&#x64CD;&#x4F5C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong><span style="font-weight:400">&#x26A0;</span>&#xFE0F;&#x6CE8;&#xFF1A;&#x6700;&#x597D;&#x5728;&#x9690;&#x85CF;&#x7A97;&#x53E3;&#x4E2D;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x5DE5;&#x4F5C;&#xFF0C;&#x907F;&#x514D;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;&#x5F71;&#x54CD;&#x5206;&#x6790;&#x7ED3;&#x679C;</strong></p><ol><li>&#x9009;&#x4E2D;&#x3010;Record allocation timeline&#x3011;&#x9009;&#x9879;</li><li>&#x6267;&#x884C;&#x4E00;&#x6B21;CG</li><li>&#x5355;&#x51FB;&#x3010;start&#x3011;&#x6309;&#x94AE;&#x5F00;&#x59CB;&#x8BB0;&#x5F55;&#x5806;&#x5206;&#x6790;</li><li>&#x8FDE;&#x7EED;&#x5355;&#x51FB;&#x3010;click&#x3011;&#x6309;&#x94AE;&#x5341;&#x591A;&#x6B21;</li><li>&#x505C;&#x6B62;&#x8BB0;&#x5F55;&#x5806;&#x5206;&#x6790;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000012283262?w=1772&amp;h=1098" src="https://static.alili.tech/img/remote/1460000012283262?w=1772&amp;h=1098" alt="closure" title="closure" style="cursor:pointer"></span></p><p>&#x4E0A;&#x56FE;&#x4E2D;&#x84DD;&#x8272;&#x67F1;&#x5F62;&#x6761;&#x8868;&#x793A;&#x968F;&#x7740;&#x65F6;&#x95F4;&#x65B0;&#x5206;&#x914D;&#x7684;&#x5185;&#x5B58;&#x3002;&#x9009;&#x4E2D;&#x5176;&#x4E2D;&#x67D0;&#x6761;&#x84DD;&#x8272;&#x67F1;&#x5F62;&#x6761;&#xFF0C;&#x8FC7;&#x6EE4;&#x51FA;&#x5BF9;&#x5E94;&#x65B0;&#x5206;&#x914D;&#x7684;&#x5BF9;&#x8C61;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283263?w=1232&amp;h=764" src="https://static.alili.tech/img/remote/1460000012283263?w=1232&amp;h=764" alt="closure" title="closure" style="cursor:pointer;display:inline"></span></p><p>&#x67E5;&#x770B;&#x5BF9;&#x8C61;&#x7684;&#x8BE6;&#x7EC6;&#x4FE1;&#x606F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283264?w=1016&amp;h=752" src="https://static.alili.tech/img/remote/1460000012283264?w=1016&amp;h=752" alt="closure" title="closure" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x56FE;&#x53EF;&#x77E5;&#xFF0C;&#x5728;&#x8FD4;&#x56DE;&#x7684;&#x95ED;&#x5305;&#x4F5C;&#x7528;&#x94FE;(Scopes)&#x4E2D;&#x643A;&#x5E26;&#x6709;&#x5B83;&#x6240;&#x5728;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#xFF0C;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#x8FD8;&#x5305;&#x542B;&#x4E00;&#x4E2A;str&#x5B57;&#x6BB5;&#x3002;&#x800C;str&#x5B57;&#x6BB5;&#x5E76;&#x6CA1;&#x6709;&#x5728;&#x8FD4;&#x56DE;getData()&#x4E2D;&#x4F7F;&#x7528;&#x8FC7;&#x3002;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x5B58;&#x5728;&#x5728;&#x4F5C;&#x7528;&#x57DF;&#x4E2D;&#xFF0C;&#x6309;&#x7406;&#x5E94;&#x8BE5;&#x88AB;GC&#x56DE;&#x6536;&#x6389;&#xFF0C; why<img src="https://static.alili.techundefined" class="emoji" alt="question" title="question"></p><p>&#x539F;&#x56E0;&#x662F;&#x5728;&#x76F8;&#x540C;&#x4F5C;&#x7528;&#x57DF;&#x5185;&#x521B;&#x5EFA;&#x7684;&#x591A;&#x4E2A;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x5BF9;&#x8C61;&#x662F;&#x5171;&#x4EAB;&#x540C;&#x4E00;&#x4E2A;<a href="http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/" rel="nofollow noreferrer" target="_blank">&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#xFF08;variable object&#xFF09;</a>&#x3002;&#x5982;&#x679C;&#x521B;&#x5EFA;&#x7684;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x6CA1;&#x6709;&#x88AB;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#xFF0C;&#x4E0D;&#x7BA1;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x662F;&#x5426;&#x5F15;&#x7528;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x7684;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x6267;&#x884C;&#x5B8C;&#xFF0C;&#x5BF9;&#x5E94;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x4FBF;&#x4F1A;&#x88AB;&#x9500;&#x6BC1;&#x3002;&#x53CD;&#x4E4B;&#xFF0C;&#x5982;&#x679C;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x4E2D;&#x5B58;&#x5728;&#x6709;&#x5BF9;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x53D8;&#x91CF;&#x6216;&#x51FD;&#x6570;&#x7684;&#x8BBF;&#x95EE;&#xFF08;&#x53EF;&#x4EE5;&#x4E0D;&#x662F;&#x88AB;&#x5F15;&#x7528;&#x7684;&#x5185;&#x90E8;&#x51FD;&#x6570;&#xFF09;&#xFF0C;&#x5E76;&#x4E14;&#x5B58;&#x5728;&#x67D0;&#x4E2A;&#x6216;&#x591A;&#x4E2A;&#x5185;&#x90E8;&#x51FD;&#x6570;&#x88AB;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4F1A;&#x5F62;&#x6210;&#x95ED;&#x5305;&#xFF0C;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x5C31;&#x4F1A;&#x5B58;&#x5728;&#x4E8E;&#x95ED;&#x5305;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x4E2D;&#x3002;&#x8FD9;&#x6837;&#x786E;&#x4FDD;&#x4E86;&#x95ED;&#x5305;&#x51FD;&#x6570;&#x6709;&#x6743;&#x8BBF;&#x95EE;&#x5916;&#x90E8;&#x51FD;&#x6570;&#x7684;&#x6240;&#x6709;&#x53D8;&#x91CF;&#x548C;&#x51FD;&#x6570;&#x3002;&#x4E86;&#x89E3;&#x4E86;&#x95EE;&#x9898;&#x4EA7;&#x751F;&#x7684;&#x539F;&#x56E0;&#xFF0C;&#x4FBF;&#x53EF;&#x4EE5;&#x5BF9;&#x75C7;&#x4E0B;&#x836F;&#x4E86;&#x3002;&#x5BF9;&#x4EE3;&#x7801;&#x505A;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function f() {
      var str = Array(10000).join(&apos;#&apos;);
      var foo = {
        name: &apos;foo&apos;
      }
      function unused() {
        var message = &apos;it is only a test message&apos;;
        // str = &apos;unused: &apos; + str; //&#x5220;&#x9664;&#x8BE5;&#x6761;&#x8BED;&#x53E5;
      }
      function getData() {
        return &apos;data&apos;;
      }
      return getData;
    }

    var list = [];
    
    document.querySelector(&apos;#click_button&apos;).addEventListener(&apos;click&apos;, function () {
      list.push(f());
    }, false);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> str = <span class="hljs-built_in">Array</span>(<span class="hljs-number">10000</span>).join(<span class="hljs-string">&apos;#&apos;</span>);
      <span class="hljs-keyword">var</span> foo = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;foo&apos;</span>
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unused</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> message = <span class="hljs-string">&apos;it is only a test message&apos;</span>;
        <span class="hljs-comment">// str = &apos;unused: &apos; + str; //&#x5220;&#x9664;&#x8BE5;&#x6761;&#x8BED;&#x53E5;</span>
      }
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getData</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;data&apos;</span>;
      }
      <span class="hljs-keyword">return</span> getData;
    }

    <span class="hljs-keyword">var</span> list = [];
    
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#click_button&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      list.push(f());
    }, <span class="hljs-literal">false</span>);</code></pre><p>getData()&#x548C;unused()&#x5185;&#x90E8;&#x51FD;&#x6570;&#x5171;&#x4EAB;f&#x51FD;&#x6570;&#x5BF9;&#x5E94;&#x7684;&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A;unused()&#x5185;&#x90E8;&#x51FD;&#x6570;&#x8BBF;&#x95EE;&#x4E86;f&#x4F5C;&#x7528;&#x57DF;&#x5185;str&#x53D8;&#x91CF;&#xFF0C;&#x6240;&#x4EE5;str&#x5B57;&#x6BB5;&#x5B58;&#x5728;&#x4E8E;f&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x4E2D;&#x3002;&#x52A0;&#x4E0A;getData()&#x5185;&#x90E8;&#x51FD;&#x6570;&#x88AB;&#x8FD4;&#x56DE;&#xFF0C;&#x88AB;&#x5176;&#x4ED6;&#x5BF9;&#x8C61;&#x5F15;&#x7528;&#xFF0C;&#x5F62;&#x6210;&#x4E86;&#x95ED;&#x5305;&#xFF0C;&#x56E0;&#x6B64;&#x5BF9;&#x5E94;&#x7684;f&#x53D8;&#x91CF;&#x5BF9;&#x8C61;&#x5B58;&#x5728;&#x4E8E;&#x95ED;&#x5305;&#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x94FE;&#x4E2D;&#x3002;&#x8FD9;&#x91CC;&#x53EA;&#x8981;&#x5C06;&#x51FD;&#x6570;unused&#x4E2D;<code>str = &apos;unused: &apos; + str;</code>&#x8BED;&#x53E5;&#x5220;&#x9664;&#x4FBF;&#x53EF;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283265?w=1780&amp;h=938" src="https://static.alili.tech/img/remote/1460000012283265?w=1780&amp;h=938" alt="closure" title="closure" style="cursor:pointer"></span></p><p>&#x67E5;&#x770B;&#x4E00;&#x4E0B;&#x95ED;&#x5305;&#x4FE1;&#x606F;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283266?w=1230&amp;h=904" src="https://static.alili.tech/img/remote/1460000012283266?w=1230&amp;h=904" alt="closure" title="closure" style="cursor:pointer"></span></p><h2 id="articleHeader9">DOM&#x6CC4;&#x9732;</h2><p>&#x5728;JavaScript&#x4E2D;&#xFF0C;DOM&#x64CD;&#x4F5C;&#x662F;&#x975E;&#x5E38;&#x8017;&#x65F6;&#x7684;&#x3002;&#x56E0;&#x4E3A;JavaScript/ECMAScript&#x5F15;&#x64CE;&#x72EC;&#x7ACB;&#x4E8E;&#x6E32;&#x67D3;&#x5F15;&#x64CE;&#xFF0C;&#x800C;DOM&#x662F;&#x4F4D;&#x4E8E;&#x6E32;&#x67D3;&#x5F15;&#x64CE;&#xFF0C;&#x76F8;&#x4E92;&#x8BBF;&#x95EE;&#x9700;&#x8981;&#x6D88;&#x8017;&#x4E00;&#x5B9A;&#x7684;&#x8D44;&#x6E90;&#x3002;&#x5982;Chrome&#x6D4F;&#x89C8;&#x5668;&#x4E2D;DOM&#x4F4D;&#x4E8E;WebCore&#xFF0C;&#x800C;JavaScript/ECMAScript&#x4F4D;&#x4E8E;V8&#x4E2D;&#x3002;&#x5047;&#x5982;&#x5C06;JavaScript/ECMAScript&#x3001;DOM&#x5206;&#x522B;&#x60F3;&#x8C61;&#x6210;&#x4E24;&#x5EA7;&#x5B64;&#x5C9B;&#xFF0C;&#x4E24;&#x5C9B;&#x4E4B;&#x95F4;&#x901A;&#x8FC7;&#x4E00;&#x5EA7;&#x6536;&#x8D39;&#x6865;&#x8FDE;&#x63A5;&#xFF0C;&#x8FC7;&#x6865;&#x9700;&#x8981;&#x4EA4;&#x7EB3;&#x4E00;&#x5B9A;&#x201C;&#x8FC7;&#x6865;&#x8D39;&#x201D;&#x3002;JavaScript/ECMAScript&#x6BCF;&#x6B21;&#x8BBF;&#x95EE;DOM&#x65F6;&#xFF0C;&#x90FD;&#x9700;&#x8981;&#x4EA4;&#x7EB3;&#x201C;&#x8FC7;&#x6865;&#x8D39;&#x201D;&#x3002;&#x56E0;&#x6B64;&#x8BBF;&#x95EE;DOM&#x6B21;&#x6570;&#x8D8A;&#x591A;&#xFF0C;&#x8D39;&#x7528;&#x8D8A;&#x9AD8;&#xFF0C;&#x9875;&#x9762;&#x6027;&#x80FD;&#x5C31;&#x4F1A;&#x53D7;&#x5230;&#x5F88;&#x5927;&#x5F71;&#x54CD;&#x3002;<a href="http://www.phpied.com/dom-access-optimization/" rel="nofollow noreferrer" target="_blank">&#x4E86;&#x89E3;&#x66F4;&#x591A;&#x2139;&#xFE0F;</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283267?w=630&amp;h=69" src="https://static.alili.tech/img/remote/1460000012283267?w=630&amp;h=69" alt="" title="" style="cursor:pointer"></span></p><p>&#x4E3A;&#x4E86;&#x51CF;&#x5C11;DOM&#x8BBF;&#x95EE;&#x6B21;&#x6570;&#xFF0C;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5F53;&#x9700;&#x8981;&#x591A;&#x6B21;&#x8BBF;&#x95EE;&#x540C;&#x4E00;&#x4E2A;DOM&#x65B9;&#x6CD5;&#x6216;&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x4F1A;&#x5C06;DOM&#x5F15;&#x7528;&#x7F13;&#x5B58;&#x5230;&#x4E00;&#x4E2A;&#x5C40;&#x90E8;&#x53D8;&#x91CF;&#x4E2D;&#x3002;<strong>&#x4F46;&#x5982;&#x679C;&#x5728;&#x6267;&#x884C;&#x67D0;&#x4E9B;&#x5220;&#x9664;&#x3001;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x540E;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5FD8;&#x8BB0;&#x91CA;&#x653E;&#x6389;&#x4EE3;&#x7801;&#x4E2D;&#x5BF9;&#x5E94;&#x7684;DOM&#x5F15;&#x7528;&#xFF0C;&#x8FD9;&#x6837;&#x4F1A;&#x9020;&#x6210;DOM&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x3002;</strong></p><h3 id="articleHeader10">&#x5B9E;&#x4F8B;------&gt;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/demos/dom.html" rel="nofollow noreferrer" target="_blank">demos/dom.html</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;Dom-Leakage&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;input type=&quot;button&quot; value=&quot;add&quot; class=&quot;add&quot;&gt;
  &lt;input type=&quot;button&quot; value=&quot;remove&quot; class=&quot;remove&quot; style=&quot;display:none;&quot;&gt;

  &lt;div class=&quot;container&quot;&gt;
    &lt;pre class=&quot;wrapper&quot;&gt;&lt;/pre&gt;
  &lt;/div&gt;
  &lt;script&gt;
    // &#x56E0;&#x4E3A;&#x8981;&#x591A;&#x6B21;&#x7528;&#x5230;pre.wrapper&#x3001;div.container&#x3001;input.remove&#x3001;input.add&#x8282;&#x70B9;&#xFF0C;&#x5C06;&#x5176;&#x7F13;&#x5B58;&#x5230;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x4E2D;
    var wrapper = document.querySelector(&apos;.wrapper&apos;);
    var container = document.querySelector(&apos;.container&apos;);
    var removeBtn = document.querySelector(&apos;.remove&apos;);
    var addBtn = document.querySelector(&apos;.add&apos;);
    var counter = 0;
    var once = true;
    // &#x65B9;&#x6CD5;
    var hide = function(target){
      target.style.display = &apos;none&apos;;
    }
    var show = function(target){
      target.style.display = &apos;inline-block&apos;;
    }
    // &#x56DE;&#x8C03;&#x51FD;&#x6570;
    var removeCallback = function(){
      removeBtn.removeEventListener(&apos;click&apos;, removeCallback, false);
      addBtn.removeEventListener(&apos;click&apos;, addCallback, false);
      hide(addBtn);
      hide(removeBtn);
      container.removeChild(wrapper);
    }
    var addCallback = function(){
      wrapper.appendChild(document.createTextNode(&apos;\t&apos; + ++counter + &apos;&#xFF1A;a new line text\n&apos;));
      // &#x663E;&#x793A;&#x5220;&#x9664;&#x64CD;&#x4F5C;&#x6309;&#x94AE;
      if(once){
        show(removeBtn);
        once = false;
      }
    }
    // &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;
    removeBtn.addEventListener(&apos;click&apos;, removeCallback, false);
    addBtn.addEventListener(&apos;click&apos;, addCallback, false);
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Dom-Leakage<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;add&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;add&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;remove&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;remove&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;display:none;&quot;</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">pre</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;wrapper&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// &#x56E0;&#x4E3A;&#x8981;&#x591A;&#x6B21;&#x7528;&#x5230;pre.wrapper&#x3001;div.container&#x3001;input.remove&#x3001;input.add&#x8282;&#x70B9;&#xFF0C;&#x5C06;&#x5176;&#x7F13;&#x5B58;&#x5230;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x4E2D;</span>
    <span class="hljs-keyword">var</span> wrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.wrapper&apos;</span>);
    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.container&apos;</span>);
    <span class="hljs-keyword">var</span> removeBtn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.remove&apos;</span>);
    <span class="hljs-keyword">var</span> addBtn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.add&apos;</span>);
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> once = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">// &#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">var</span> hide = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
      target.style.display = <span class="hljs-string">&apos;none&apos;</span>;
    }
    <span class="hljs-keyword">var</span> show = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
      target.style.display = <span class="hljs-string">&apos;inline-block&apos;</span>;
    }
    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">var</span> removeCallback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      removeBtn.removeEventListener(<span class="hljs-string">&apos;click&apos;</span>, removeCallback, <span class="hljs-literal">false</span>);
      addBtn.removeEventListener(<span class="hljs-string">&apos;click&apos;</span>, addCallback, <span class="hljs-literal">false</span>);
      hide(addBtn);
      hide(removeBtn);
      container.removeChild(wrapper);
    }
    <span class="hljs-keyword">var</span> addCallback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      wrapper.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">&apos;\t&apos;</span> + ++counter + <span class="hljs-string">&apos;&#xFF1A;a new line text\n&apos;</span>));
      <span class="hljs-comment">// &#x663E;&#x793A;&#x5220;&#x9664;&#x64CD;&#x4F5C;&#x6309;&#x94AE;</span>
      <span class="hljs-keyword">if</span>(once){
        show(removeBtn);
        once = <span class="hljs-literal">false</span>;
      }
    }
    <span class="hljs-comment">// &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;</span>
    removeBtn.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, removeCallback, <span class="hljs-literal">false</span>);
    addBtn.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, addCallback, <span class="hljs-literal">false</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x8FD9;&#x91CC;&#x7ED3;&#x5408;Chrome&#x6D4F;&#x89C8;&#x5668;&#x7684;Devtools&#x2013;&gt;Performance&#x505A;&#x4E00;&#x4E9B;&#x5206;&#x6790;&#xFF0C;&#x64CD;&#x4F5C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong><span style="font-weight:400">&#x26A0;</span>&#xFE0F;&#x6CE8;&#xFF1A;&#x6700;&#x597D;&#x5728;&#x9690;&#x85CF;&#x7A97;&#x53E3;&#x4E2D;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x5DE5;&#x4F5C;&#xFF0C;&#x907F;&#x514D;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;&#x5F71;&#x54CD;&#x5206;&#x6790;&#x7ED3;&#x679C;</strong></p><ol><li>&#x5F00;&#x542F;&#x3010;Performance&#x3011;&#x9879;&#x7684;&#x8BB0;&#x5F55;</li><li>&#x6267;&#x884C;&#x4E00;&#x6B21;CG&#xFF0C;&#x521B;&#x5EFA;&#x57FA;&#x51C6;&#x53C2;&#x8003;&#x7EBF;</li><li>&#x8FDE;&#x7EED;&#x5355;&#x51FB;&#x3010;add&#x3011;&#x6309;&#x94AE;6&#x6B21;&#xFF0C;&#x589E;&#x52A0;6&#x4E2A;&#x6587;&#x672C;&#x8282;&#x70B9;&#x5230;pre&#x5143;&#x7D20;&#x4E2D;</li><li>&#x5355;&#x51FB;&#x3010;remove&#x3011;&#x6309;&#x94AE;&#xFF0C;&#x5220;&#x9664;&#x521A;&#x589E;&#x52A0;6&#x4E2A;&#x6587;&#x672C;&#x8282;&#x70B9;&#x548C;pre&#x5143;&#x5143;&#x7D20;</li><li>&#x6267;&#x884C;&#x4E00;&#x6B21;CG</li><li>&#x505C;&#x6B62;&#x8BB0;&#x5F55;&#x5806;&#x5206;&#x6790;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000012283268?w=889&amp;h=641" src="https://static.alili.tech/img/remote/1460000012283268?w=889&amp;h=641" alt="dom" title="dom" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x5206;&#x6790;&#x7ED3;&#x679C;&#x56FE;&#x53EF;&#x77E5;&#xFF0C;&#x867D;&#x7136;6&#x6B21;add&#x64CD;&#x4F5C;&#x589E;&#x52A0;6&#x4E2A;Node&#xFF0C;&#x4F46;&#x662F;remove&#x64CD;&#x4F5C;&#x5E76;&#x6CA1;&#x6709;&#x8BA9;Nodes&#x8282;&#x70B9;&#x6570;&#x4E0B;&#x964D;&#xFF0C;&#x5373;remove&#x64CD;&#x4F5C;&#x5931;&#x8D25;&#x3002;&#x5C3D;&#x7BA1;&#x8FD8;&#x4E3B;&#x52A8;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x6B21;CG&#x64CD;&#x4F5C;&#xFF0C;Nodes&#x66F2;&#x7EBF;&#x4E5F;&#x6CA1;&#x6709;&#x4E0B;&#x964D;&#x3002;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x65AD;&#x5B9A;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x4E86;&#xFF01;&#x90A3;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x5982;&#x4F55;&#x53BB;&#x67E5;&#x627E;&#x95EE;&#x9898;&#x7684;&#x539F;&#x56E0;&#x5462;&#xFF1F;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;Chrome&#x6D4F;&#x89C8;&#x5668;&#x7684;Devtools&#x2013;&gt;Memory&#x8FDB;&#x884C;&#x8BCA;&#x65AD;&#x5206;&#x6790;&#xFF0C;&#x6267;&#x884C;&#x5982;&#x4E0B;&#x64CD;&#x4F5C;&#x6B65;&#x9AA4;&#xFF1A;</p><p><strong><span style="font-weight:400">&#x26A0;</span>&#xFE0F;&#x6CE8;&#xFF1A;&#x6700;&#x597D;&#x5728;&#x9690;&#x85CF;&#x7A97;&#x53E3;&#x4E2D;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x5DE5;&#x4F5C;&#xFF0C;&#x907F;&#x514D;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;&#x5F71;&#x54CD;&#x5206;&#x6790;&#x7ED3;&#x679C;</strong></p><ol><li>&#x9009;&#x4E2D;&#x3010;Take heap snapshot&#x3011;&#x9009;&#x9879;</li><li>&#x8FDE;&#x7EED;&#x5355;&#x51FB;&#x3010;add&#x3011;&#x6309;&#x94AE;6&#x6B21;&#xFF0C;&#x589E;&#x52A0;6&#x4E2A;&#x6587;&#x672C;&#x8282;&#x70B9;&#x5230;pre&#x5143;&#x7D20;&#x4E2D;</li><li>&#x5355;&#x51FB;&#x3010;Take snapshot&#x3011;&#x6309;&#x94AE;&#xFF0C;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x5806;&#x5FEB;&#x7167;</li><li>&#x5355;&#x51FB;&#x3010;remove&#x3011;&#x6309;&#x94AE;&#xFF0C;&#x5220;&#x9664;&#x521A;&#x589E;&#x52A0;6&#x4E2A;&#x6587;&#x672C;&#x8282;&#x70B9;&#x548C;pre&#x5143;&#x5143;&#x7D20;</li><li>&#x5355;&#x51FB;&#x3010;Take snapshot&#x3011;&#x6309;&#x94AE;&#xFF0C;&#x6267;&#x884C;&#x4E00;&#x6B21;&#x5806;&#x5FEB;&#x7167;</li><li>&#x9009;&#x4E2D;&#x751F;&#x6210;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x5FEB;&#x7167;&#x62A5;&#x544A;&#xFF0C;&#x5E76;&#x5C06;&#x89C6;&#x56FE;&#x7531;&quot;Summary&quot;&#x5207;&#x6362;&#x5230;&quot;Comparison&quot;&#x5BF9;&#x6BD4;&#x6A21;&#x5F0F;&#xFF0C;&#x5728;[class filter]&#x8FC7;&#x6EE4;&#x8F93;&#x5165;&#x6846;&#x4E2D;&#x8F93;&#x5165;&#x5173;&#x952E;&#x5B57;&#xFF1A;<strong>Detached</strong></li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000012283269?w=907&amp;h=518" src="https://static.alili.tech/img/remote/1460000012283269?w=907&amp;h=518" alt="dom" title="dom" style="cursor:pointer"></span></p><p>&#x4ECE;&#x5206;&#x6790;&#x7ED3;&#x679C;&#x56FE;&#x53EF;&#x77E5;&#xFF0C;&#x5BFC;&#x81F4;&#x6574;&#x4E2A;pre&#x5143;&#x7D20;&#x548C;6&#x4E2A;&#x6587;&#x672C;&#x8282;&#x70B9;&#x65E0;&#x6CD5;&#x522B;&#x56DE;&#x6536;&#x7684;&#x539F;&#x56E0;&#x662F;&#xFF1A;&#x4EE3;&#x7801;&#x4E2D;&#x5B58;&#x5728;&#x5168;&#x5C40;&#x53D8;&#x91CF;<code>wrapper</code>&#x5BF9;pre&#x5143;&#x7D20;&#x7684;&#x5F15;&#x7528;&#x3002;&#x77E5;&#x9053;&#x4E86;&#x4EA7;&#x751F;&#x7684;&#x95EE;&#x9898;&#x539F;&#x56E0;&#xFF0C;&#x4FBF;&#x53EF;&#x5BF9;&#x75C7;&#x4E0B;&#x836F;&#x4E86;&#x3002;&#x5BF9;&#x4EE3;&#x7801;&#x505A;&#x5982;&#x4E0B;&#x5C31;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // &#x56E0;&#x4E3A;&#x8981;&#x591A;&#x6B21;&#x7528;&#x5230;pre.wrapper&#x3001;div.container&#x3001;input.remove&#x3001;input.add&#x8282;&#x70B9;&#xFF0C;&#x5C06;&#x5176;&#x7F13;&#x5B58;&#x5230;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x4E2D;
    var wrapper = document.querySelector(&apos;.wrapper&apos;);
    var container = document.querySelector(&apos;.container&apos;);
    var removeBtn = document.querySelector(&apos;.remove&apos;);
    var addBtn = document.querySelector(&apos;.add&apos;);
    var counter = 0;
    var once = true;
    // &#x65B9;&#x6CD5;
    var hide = function(target){
      target.style.display = &apos;none&apos;;
    }
    var show = function(target){
      target.style.display = &apos;inline-block&apos;;
    }
    // &#x56DE;&#x8C03;&#x51FD;&#x6570;
    var removeCallback = function(){
      removeBtn.removeEventListener(&apos;click&apos;, removeCallback, false);
      addBtn.removeEventListener(&apos;click&apos;, addCallback, false);
      hide(addBtn);
      hide(removeBtn);
      container.removeChild(wrapper);
     
      wrapper = null;//&#x5728;&#x6267;&#x884C;&#x5220;&#x9664;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x5C06;wrapper&#x5BF9;pre&#x8282;&#x70B9;&#x7684;&#x5F15;&#x7528;&#x91CA;&#x653E;&#x6389;
    }
    var addCallback = function(){
      wrapper.appendChild(document.createTextNode(&apos;\t&apos; + ++counter + &apos;&#xFF1A;a new line text\n&apos;));
      // &#x663E;&#x793A;&#x5220;&#x9664;&#x64CD;&#x4F5C;&#x6309;&#x94AE;
      if(once){
        show(removeBtn);
        once = false;
      }
    }
    // &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;
    removeBtn.addEventListener(&apos;click&apos;, removeCallback, false);
    addBtn.addEventListener(&apos;click&apos;, addCallback, false);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-comment">// &#x56E0;&#x4E3A;&#x8981;&#x591A;&#x6B21;&#x7528;&#x5230;pre.wrapper&#x3001;div.container&#x3001;input.remove&#x3001;input.add&#x8282;&#x70B9;&#xFF0C;&#x5C06;&#x5176;&#x7F13;&#x5B58;&#x5230;&#x672C;&#x5730;&#x53D8;&#x91CF;&#x4E2D;</span>
    <span class="hljs-keyword">var</span> wrapper = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.wrapper&apos;</span>);
    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.container&apos;</span>);
    <span class="hljs-keyword">var</span> removeBtn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.remove&apos;</span>);
    <span class="hljs-keyword">var</span> addBtn = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.add&apos;</span>);
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> once = <span class="hljs-literal">true</span>;
    <span class="hljs-comment">// &#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">var</span> hide = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
      target.style.display = <span class="hljs-string">&apos;none&apos;</span>;
    }
    <span class="hljs-keyword">var</span> show = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
      target.style.display = <span class="hljs-string">&apos;inline-block&apos;</span>;
    }
    <span class="hljs-comment">// &#x56DE;&#x8C03;&#x51FD;&#x6570;</span>
    <span class="hljs-keyword">var</span> removeCallback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      removeBtn.removeEventListener(<span class="hljs-string">&apos;click&apos;</span>, removeCallback, <span class="hljs-literal">false</span>);
      addBtn.removeEventListener(<span class="hljs-string">&apos;click&apos;</span>, addCallback, <span class="hljs-literal">false</span>);
      hide(addBtn);
      hide(removeBtn);
      container.removeChild(wrapper);
     
      wrapper = <span class="hljs-literal">null</span>;<span class="hljs-comment">//&#x5728;&#x6267;&#x884C;&#x5220;&#x9664;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x5C06;wrapper&#x5BF9;pre&#x8282;&#x70B9;&#x7684;&#x5F15;&#x7528;&#x91CA;&#x653E;&#x6389;</span>
    }
    <span class="hljs-keyword">var</span> addCallback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      wrapper.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-string">&apos;\t&apos;</span> + ++counter + <span class="hljs-string">&apos;&#xFF1A;a new line text\n&apos;</span>));
      <span class="hljs-comment">// &#x663E;&#x793A;&#x5220;&#x9664;&#x64CD;&#x4F5C;&#x6309;&#x94AE;</span>
      <span class="hljs-keyword">if</span>(once){
        show(removeBtn);
        once = <span class="hljs-literal">false</span>;
      }
    }
    <span class="hljs-comment">// &#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;</span>
    removeBtn.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, removeCallback, <span class="hljs-literal">false</span>);
    addBtn.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, addCallback, <span class="hljs-literal">false</span>);</code></pre><p>&#x5728;&#x6267;&#x884C;&#x5220;&#x9664;&#x64CD;&#x4F5C;&#x65F6;&#xFF0C;&#x5C06;wrapper&#x5BF9;pre&#x8282;&#x70B9;&#x7684;&#x5F15;&#x7528;&#x91CA;&#x653E;&#x6389;&#xFF0C;&#x5373;&#x5728;&#x5220;&#x9664;&#x903B;&#x8F91;&#x4E2D;&#x589E;&#x52A0;<code>wrapper = null;</code>&#x8BED;&#x53E5;&#x3002;&#x518D;&#x6B21;&#x5728;Devtools&#x2013;&gt;Performance&#x4E2D;&#x91CD;&#x590D;&#x4E0A;&#x8FF0;&#x64CD;&#x4F5C;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283270?w=899&amp;h=358" src="https://static.alili.tech/img/remote/1460000012283270?w=899&amp;h=358" alt="dom" title="dom" style="cursor:pointer"></span></p><h3 id="articleHeader11">&#x5C0F;&#x8BD5;&#x725B;&#x5200;------&gt;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/demos/dom_practice.html" rel="nofollow noreferrer" target="_blank">demos/dom_practice.html</a></h3><p>&#x518D;&#x6765;&#x770B;&#x770B;&#x7F51;&#x4E0A;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;Practice&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div id=&quot;refA&quot;&gt;&lt;ul&gt;&lt;li&gt;&lt;a href=&quot;#&quot;&gt;&lt;/a&gt;&lt;/li&gt;&lt;li&gt;&lt;a href=&quot;#&quot;&gt;&lt;/a&gt;&lt;/li&gt;&lt;li&gt;&lt;a href=&quot;#&quot; id=&quot;refB&quot;&gt;&lt;/a&gt;&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;
  &lt;div&gt;&lt;/div&gt;
  &lt;div&gt;&lt;/div&gt;

  &lt;script&gt;
    var refA = document.getElementById(&apos;refA&apos;);
    var refB = document.getElementById(&apos;refB&apos;);
    document.body.removeChild(refA);

    // #refA&#x4E0D;&#x80FD;GC&#x56DE;&#x6536;&#xFF0C;&#x56E0;&#x4E3A;&#x5B58;&#x5728;&#x53D8;&#x91CF;refA&#x5BF9;&#x5B83;&#x7684;&#x5F15;&#x7528;&#x3002;&#x5C06;&#x5176;&#x5BF9;#refA&#x5F15;&#x7528;&#x91CA;&#x653E;&#xFF0C;&#x4F46;&#x8FD8;&#x662F;&#x65E0;&#x6CD5;&#x56DE;&#x6536;#refA&#x3002;
    refA = null;

    // &#x8FD8;&#x5B58;&#x5728;&#x53D8;&#x91CF;refB&#x5BF9;#refA&#x7684;&#x95F4;&#x63A5;&#x5F15;&#x7528;(refB&#x5F15;&#x7528;&#x4E86;#refB&#xFF0C;&#x800C;#refB&#x5C5E;&#x4E8E;#refA)&#x3002;&#x5C06;&#x53D8;&#x91CF;refB&#x5BF9;#refB&#x7684;&#x5F15;&#x7528;&#x91CA;&#x653E;&#xFF0C;#refA&#x5C31;&#x53EF;&#x4EE5;&#x88AB;GC&#x56DE;&#x6536;&#x3002;
    refB = null;
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Practice<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;refA&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;refB&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> refA = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;refA&apos;</span>);
    <span class="hljs-keyword">var</span> refB = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;refB&apos;</span>);
    <span class="hljs-built_in">document</span>.body.removeChild(refA);

    <span class="hljs-comment">// #refA&#x4E0D;&#x80FD;GC&#x56DE;&#x6536;&#xFF0C;&#x56E0;&#x4E3A;&#x5B58;&#x5728;&#x53D8;&#x91CF;refA&#x5BF9;&#x5B83;&#x7684;&#x5F15;&#x7528;&#x3002;&#x5C06;&#x5176;&#x5BF9;#refA&#x5F15;&#x7528;&#x91CA;&#x653E;&#xFF0C;&#x4F46;&#x8FD8;&#x662F;&#x65E0;&#x6CD5;&#x56DE;&#x6536;#refA&#x3002;</span>
    refA = <span class="hljs-literal">null</span>;

    <span class="hljs-comment">// &#x8FD8;&#x5B58;&#x5728;&#x53D8;&#x91CF;refB&#x5BF9;#refA&#x7684;&#x95F4;&#x63A5;&#x5F15;&#x7528;(refB&#x5F15;&#x7528;&#x4E86;#refB&#xFF0C;&#x800C;#refB&#x5C5E;&#x4E8E;#refA)&#x3002;&#x5C06;&#x53D8;&#x91CF;refB&#x5BF9;#refB&#x7684;&#x5F15;&#x7528;&#x91CA;&#x653E;&#xFF0C;#refA&#x5C31;&#x53EF;&#x4EE5;&#x88AB;GC&#x56DE;&#x6536;&#x3002;</span>
    refB = <span class="hljs-literal">null</span>;
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x6F14;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283271?w=480&amp;h=286" src="https://static.alili.tech/img/remote/1460000012283271?w=480&amp;h=286" alt="" title="" style="cursor:pointer"></span></p><p>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;Chrome&#x7684;Devtools&#x5DE5;&#x5177;&#xFF0C;&#x9A8C;&#x8BC1;&#x4E00;&#x4E0B;&#x5206;&#x6790;&#x7ED3;&#x679C;&#xFF0C;&#x5B9E;&#x8DF5;&#x5F88;&#x91CD;&#x8981;~~~<img src="https://static.alili.techundefined" class="emoji" alt="high_brightness" title="high_brightness"></p><h2 id="articleHeader12">timers</h2><p>&#x5728;JavaScript&#x5E38;&#x7528;<code>setInterval()</code>&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x52A8;&#x753B;&#x6548;&#x679C;&#x3002;&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x94FE;&#x5F0F;<code>setTimeout()</code>&#x8C03;&#x7528;&#x6A21;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function() {
  // do something. . . .
  setTimeout(arguments.callee, interval);
}, interval);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// do something. . . .</span>
  setTimeout(<span class="hljs-built_in">arguments</span>.callee, interval);
}, interval);</code></pre><p>&#x5982;&#x679C;&#x5728;&#x4E0D;&#x9700;&#x8981;<code>setInterval()</code>&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x901A;&#x8FC7;<code>clearInterval()</code>&#x65B9;&#x6CD5;&#x79FB;&#x9664;&#xFF0C;&#x90A3;&#x4E48;<code>setInterval()</code>&#x4F1A;&#x4E0D;&#x505C;&#x5730;&#x8C03;&#x7528;&#x51FD;&#x6570;&#xFF0C;&#x76F4;&#x5230;&#x8C03;&#x7528;<code>clearInterval()</code>&#x6216;&#x7A97;&#x53E3;&#x5173;&#x95ED;&#x3002;&#x5982;&#x679C;&#x94FE;&#x5F0F;<code>setTimeout()</code>&#x8C03;&#x7528;&#x6A21;&#x5F0F;&#x6CA1;&#x6709;&#x7ED9;&#x51FA;&#x7EC8;&#x6B62;&#x903B;&#x8F91;&#xFF0C;&#x4E5F;&#x4F1A;&#x4E00;&#x76F4;&#x8FD0;&#x884C;&#x4E0B;&#x53BB;&#x3002;&#x56E0;&#x6B64;&#x518D;&#x4E0D;&#x9700;&#x8981;&#x91CD;&#x590D;&#x5B9A;&#x65F6;&#x5668;&#x65F6;&#xFF0C;&#x786E;&#x4FDD;&#x5BF9;&#x5B9A;&#x65F6;&#x5668;&#x8FDB;&#x884C;&#x6E05;&#x9664;&#xFF0C;&#x907F;&#x514D;&#x5360;&#x7528;&#x7CFB;&#x7EDF;&#x8D44;&#x6E90;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x5728;&#x4F7F;&#x7528;<code>setInterval()</code>&#x548C;<code>setTimeout()</code>&#x6765;&#x5B9E;&#x73B0;&#x52A8;&#x753B;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x786E;&#x4FDD;&#x5B9A;&#x65F6;&#x5668;&#x6309;&#x7167;&#x6307;&#x5B9A;&#x7684;&#x65F6;&#x95F4;&#x95F4;&#x9694;&#x6765;&#x6267;&#x884C;&#x52A8;&#x753B;&#x3002;&#x4E3A;&#x4E86;&#x80FD;&#x5728;JavaScript&#x4E2D;&#x521B;&#x5EFA;&#x51FA;&#x5E73;&#x6ED1;&#x6D41;&#x7545;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4E3A;JavaScript&#x52A8;&#x753B;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x65B0;API-requestAnimationFrame()&#x3002;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/requestAnimationFrame/requestAnimationFrame.md" rel="nofollow noreferrer" target="_blank">&#x5173;&#x4E8E;setInterval&#x3001;setTimeout&#x4E0E;requestAnimationFrame&#x5B9E;&#x73B0;&#x52A8;&#x753B;&#x4E0A;&#x7684;&#x533A;&#x522B;&#x27B9;&#x731B;&#x51FB;?</a></p><h3 id="articleHeader13">&#x5B9E;&#x4F8B;------&gt;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/demos/timers.html" rel="nofollow noreferrer" target="_blank">demos/timers.html</a></h3><p>&#x5982;&#x4E0B;&#x901A;&#x8FC7;<code>setInterval()</code>&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;clock&#x7684;&#x5C0F;&#x5B9E;&#x4F8B;&#xFF0C;&#x4E0D;&#x8FC7;&#x4EE3;&#x7801;&#x5B58;&#x5728;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x5148;&#x5C1D;&#x8BD5;&#x627E;&#x4E00;&#x4E0B;&#x95EE;&#x9898;&#x7684;&#x6240;&#x5728;<del>~</del>?<br>&#x64CD;&#x4F5C;&#xFF1A;</p><ul><li>&#x5355;&#x51FB;&#x3010;start&#x3011;&#x6309;&#x94AE;&#x5F00;&#x59CB;clock&#xFF0C;&#x540C;&#x65F6;web&#x5F00;&#x53D1;&#x63A7;&#x5236;&#x53F0;&#x4F1A;&#x6253;&#x5370;&#x5B9E;&#x65F6;&#x4FE1;&#x606F;</li><li>&#x5355;&#x51FB;&#x3010;stop&#x3011;&#x6309;&#x94AE;&#x505C;&#x6B62;clock&#xFF0C;&#x540C;&#x65F6;web&#x5F00;&#x53D1;&#x63A7;&#x5236;&#x53F0;&#x4F1A;&#x8F93;&#x51FA;&#x505C;&#x6B62;&#x4FE1;&#x606F;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;setInterval&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;input type=&quot;button&quot; value=&quot;start&quot; class=&quot;start&quot;&gt;
  &lt;input type=&quot;button&quot; value=&quot;stop&quot; class=&quot;stop&quot;&gt;

  &lt;script&gt;
    var counter = 0;
    var clock = {
      start: function () {
        setInterval(this.step.bind(null, ++counter), 1000);
      },
      step: function (flag) {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        console.log(&quot;%d-----&gt; %d:%d:%d&quot;, flag, h, m, s);
      }
    }
    document.querySelector(&apos;.start&apos;).addEventListener(&apos;click&apos;, clock.start.bind(clock), false);
    document.querySelector(&apos;.stop&apos;).addEventListener(&apos;click&apos;, function () {
      console.log(&apos;----&gt; stop &lt;----&apos;);
      clock = null;
    }, false);
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>setInterval<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;start&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;start&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;button&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;stop&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;stop&quot;</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> clock = {
      <span class="hljs-attr">start</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        setInterval(<span class="hljs-keyword">this</span>.step.bind(<span class="hljs-literal">null</span>, ++counter), <span class="hljs-number">1000</span>);
      },
      <span class="hljs-attr">step</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">flag</span>) </span>{
        <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">var</span> h = date.getHours();
        <span class="hljs-keyword">var</span> m = date.getMinutes();
        <span class="hljs-keyword">var</span> s = date.getSeconds();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%d-----&gt; %d:%d:%d&quot;</span>, flag, h, m, s);
      }
    }
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.start&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, clock.start.bind(clock), <span class="hljs-literal">false</span>);
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.stop&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;----&gt; stop &lt;----&apos;</span>);
      clock = <span class="hljs-literal">null</span>;
    }, <span class="hljs-literal">false</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x5B58;&#x5728;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><ol><li>&#x5982;&#x679C;&#x4E0D;&#x65AD;&#x7684;&#x5355;&#x51FB;&#x3010;start&#x3011;&#x6309;&#x94AE;&#xFF0C;&#x4F1A;&#x65AD;&#x751F;&#x6210;&#x65B0;&#x7684;clock&#x3002;</li><li>&#x5355;&#x51FB;&#x3010;stop&#x3011;&#x6309;&#x94AE;&#x4E0D;&#x80FD;&#x505C;&#x6B62;clock&#x3002;</li></ol><p>&#x8F93;&#x51FA;&#x7ED3;&#x679C;:</p><p><span class="img-wrap"><img data-src="/img/remote/1460000012283272?w=650&amp;h=300" src="https://static.alili.tech/img/remote/1460000012283272?w=650&amp;h=300" alt="" title="" style="cursor:pointer"></span></p><p>&#x9488;&#x5BF9;&#x66B4;&#x9732;&#x51FA;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5BF9;&#x4EE3;&#x7801;&#x505A;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var counter = 0;
    var clock = {
      timer: null,
      start: function () {
        // &#x89E3;&#x51B3;&#x7B2C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;
        if (this.timer) {
          clearInterval(this.timer);
        }
        this.timer = setInterval(this.step.bind(null, ++counter), 1000);
      },
      step: function (flag) {
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        console.log(&quot;%d-----&gt; %d:%d:%d&quot;, flag, h, m, s);
      },
      // &#x89E3;&#x51B3;&#x7B2C;&#x4E8C;&#x4E2A;&#x95EE;&#x9898;
      destroy: function () {
        console.log(&apos;----&gt; stop &lt;----&apos;);
        clearInterval(this.timer);
        node = null;
        counter = void(0);
      }
    }
    document.querySelector(&apos;.start&apos;).addEventListener(&apos;click&apos;, clock.start.bind(clock), false);
    document.querySelector(&apos;.stop&apos;).addEventListener(&apos;click&apos;, clock.destroy.bind(clock), false);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> clock = {
      <span class="hljs-attr">timer</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">start</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// &#x89E3;&#x51B3;&#x7B2C;&#x4E00;&#x4E2A;&#x95EE;&#x9898;</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.timer) {
          clearInterval(<span class="hljs-keyword">this</span>.timer);
        }
        <span class="hljs-keyword">this</span>.timer = setInterval(<span class="hljs-keyword">this</span>.step.bind(<span class="hljs-literal">null</span>, ++counter), <span class="hljs-number">1000</span>);
      },
      <span class="hljs-attr">step</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">flag</span>) </span>{
        <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
        <span class="hljs-keyword">var</span> h = date.getHours();
        <span class="hljs-keyword">var</span> m = date.getMinutes();
        <span class="hljs-keyword">var</span> s = date.getSeconds();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;%d-----&gt; %d:%d:%d&quot;</span>, flag, h, m, s);
      },
      <span class="hljs-comment">// &#x89E3;&#x51B3;&#x7B2C;&#x4E8C;&#x4E2A;&#x95EE;&#x9898;</span>
      destroy: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;----&gt; stop &lt;----&apos;</span>);
        clearInterval(<span class="hljs-keyword">this</span>.timer);
        node = <span class="hljs-literal">null</span>;
        counter = <span class="hljs-keyword">void</span>(<span class="hljs-number">0</span>);
      }
    }
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.start&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, clock.start.bind(clock), <span class="hljs-literal">false</span>);
    <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.stop&apos;</span>).addEventListener(<span class="hljs-string">&apos;click&apos;</span>, clock.destroy.bind(clock), <span class="hljs-literal">false</span>);</code></pre><h2 id="articleHeader14">EventListener</h2><p>&#x505A;&#x79FB;&#x52A8;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x5BF9;&#x4E0D;&#x540C;&#x8BBE;&#x5907;&#x5C3A;&#x5BF8;&#x505A;&#x9002;&#x914D;&#x3002;&#x5982;&#x5728;&#x5F00;&#x53D1;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x6709;&#x65F6;&#x9700;&#x8981;&#x8003;&#x8651;&#x5904;&#x7406;&#x6A2A;&#x7AD6;&#x5C4F;&#x9002;&#x914D;&#x95EE;&#x9898;&#x3002;&#x4E00;&#x822C;&#x505A;&#x6CD5;&#xFF0C;&#x5728;&#x6A2A;&#x7AD6;&#x5C4F;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x5C06;&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x540E;&#x518D;&#x91CD;&#x65B0;&#x751F;&#x6210;&#x3002;&#x800C;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F1A;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x76F8;&#x5173;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x9500;&#x6BC1;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x5C06;&#x7EC4;&#x4EF6;&#x7684;&#x4E8B;&#x4EF6;&#x89E3;&#x7ED1;&#xFF0C;&#x5728;&#x6A2A;&#x7AD6;&#x5C4F;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x5C31;&#x4F1A;&#x4E0D;&#x65AD;&#x5730;&#x5BF9;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x3002;&#x8FD9;&#x6837;&#x4F1A;&#x5BFC;&#x81F4;&#x4E00;&#x4E9B;&#x5F02;&#x5E38;&#xFF0C;&#x751A;&#x81F3;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x5D29;&#x6389;&#x3002;</p><h3 id="articleHeader15">&#x5B9E;&#x4F8B;------&gt;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/demos/callbacks.html" rel="nofollow noreferrer" target="_blank">demos/callbacks.html</a></h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
  &lt;meta charset=&quot;UTF-8&quot;&gt;
  &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
  &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;&gt;
  &lt;title&gt;callbacks&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;div class=&quot;container&quot;&gt;&lt;/div&gt;
  &lt;script&gt;
    var container = document.querySelector(&apos;.container&apos;);
    var counter = 0;
    var createHtml = function (n, counter) {
      var template = `${(new Array(n)).join(`&lt;div&gt;${counter}: this is a new data &lt;input type=&quot;button&quot; value=&quot;remove&quot;&gt;&lt;/div&gt;`)}`
      container.innerHTML = template;
    }
   
    var resizeCallback = function (init) {
      createHtml(10, ++counter);
      // &#x4E8B;&#x4EF6;&#x59D4;&#x6258;
      container.addEventListener(&apos;click&apos;, function (event){
        var target = event.target;
          if(target.tagName === &apos;INPUT&apos;){
              container.removeChild(target.parentElement)
          }
      }, false);   
    }
    window.addEventListener(&apos;resize&apos;, resizeCallback, false);
    resizeCallback(true);
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>callbacks<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;container&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.container&apos;</span>);
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> createHtml = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">n, counter</span>) </span>{
      <span class="hljs-keyword">var</span> template = <span class="hljs-string">`<span class="hljs-subst">${(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(n)).join(<span class="hljs-string">`&lt;div&gt;<span class="hljs-subst">${counter}</span>: this is a new data &lt;input type=&quot;button&quot; value=&quot;remove&quot;&gt;&lt;/div&gt;`</span>)}</span>`</span>
      container.innerHTML = template;
    }
   
    <span class="hljs-keyword">var</span> resizeCallback = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">init</span>) </span>{
      createHtml(<span class="hljs-number">10</span>, ++counter);
      <span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x59D4;&#x6258;</span>
      container.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>)</span>{
        <span class="hljs-keyword">var</span> target = event.target;
          <span class="hljs-keyword">if</span>(target.tagName === <span class="hljs-string">&apos;INPUT&apos;</span>){
              container.removeChild(target.parentElement)
          }
      }, <span class="hljs-literal">false</span>);   
    }
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;resize&apos;</span>, resizeCallback, <span class="hljs-literal">false</span>);
    resizeCallback(<span class="hljs-literal">true</span>);
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre><p>&#x9875;&#x9762;&#x662F;&#x5B58;&#x5728;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x8FD9;&#x91CC;&#x7ED3;&#x5408;Devtools&#x2013;&gt;Performance&#x5206;&#x6790;&#x4E00;&#x4E0B;&#x95EE;&#x9898;&#x6240;&#x5728;&#xFF0C;&#x64CD;&#x4F5C;&#x6B65;&#x9AA4;&#x5982;&#x4E0B;&#xFF1A;</p><p><strong><span style="font-weight:400">&#x26A0;</span>&#xFE0F;&#x6CE8;&#xFF1A;&#x6700;&#x597D;&#x5728;&#x9690;&#x85CF;&#x7A97;&#x53E3;&#x4E2D;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x5DE5;&#x4F5C;&#xFF0C;&#x907F;&#x514D;&#x6D4F;&#x89C8;&#x5668;&#x63D2;&#x4EF6;&#x5F71;&#x54CD;&#x5206;&#x6790;&#x7ED3;&#x679C;</strong></p><ol><li>&#x5F00;&#x542F;Performance&#x9879;&#x7684;&#x8BB0;&#x5F55;</li><li>&#x6267;&#x884C;&#x4E00;&#x6B21;CG&#xFF0C;&#x521B;&#x5EFA;&#x57FA;&#x51C6;&#x53C2;&#x8003;&#x7EBF;</li><li>&#x5BF9;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x8FDB;&#x884C;&#x8C03;&#x6574;</li><li>&#x6267;&#x884C;&#x4E00;&#x6B21;CG</li><li>&#x505C;&#x6B62;&#x8BB0;&#x5F55;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000012283273?w=902&amp;h=620" src="https://static.alili.tech/img/remote/1460000012283273?w=902&amp;h=620" alt="callbacks" title="callbacks" style="cursor:pointer"></span></p><p>&#x5982;&#x5206;&#x6790;&#x7ED3;&#x679C;&#x6240;&#x793A;&#xFF0C;&#x5728;&#x7A97;&#x53E3;&#x5927;&#x5C0F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x4F1A;&#x4E0D;&#x65AD;&#x5730;&#x5BF9;<code>container</code>&#x6DFB;&#x52A0;&#x4EE3;&#x7406;&#x4E8B;&#x4EF6;&#x3002;</p><p>&#x540C;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x8282;&#x70B9;&#x6CE8;&#x518C;&#x4E86;&#x591A;&#x4E2A;&#x76F8;&#x540C;&#x7684;EventListener&#xFF0C;&#x90A3;&#x4E48;&#x91CD;&#x590D;&#x7684;&#x5B9E;&#x4F8B;&#x4F1A;&#x88AB;&#x629B;&#x5F03;&#x3002;&#x8FD9;&#x4E48;&#x505A;&#x4E0D;&#x4F1A;&#x8BA9;&#x5F97;EventListener&#x88AB;&#x91CD;&#x590D;&#x8C03;&#x7528;&#xFF0C;&#x4E5F;&#x4E0D;&#x9700;&#x8981;&#x7528;removeEventListener&#x624B;&#x52A8;&#x6E05;&#x9664;&#x591A;&#x4F59;&#x7684;EventListener&#xFF0C;&#x56E0;&#x4E3A;&#x91CD;&#x590D;&#x7684;&#x90FD;&#x88AB;&#x81EA;&#x52A8;&#x629B;&#x5F03;&#x4E86;&#x3002;&#x800C;&#x8FD9;&#x6761;&#x89C4;&#x5219;&#x53EA;&#x662F;&#x9488;&#x5BF9;&#x4E8E;&#x547D;&#x540D;&#x51FD;&#x6570;&#x3002;<a href="https://triangle717.wordpress.com/2015/12/14/js-avoid-duplicate-listeners/" rel="nofollow noreferrer" target="_blank">&#x5BF9;&#x4E8E;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x5C06;&#x5176;&#x770B;&#x505A;&#x4E0D;&#x540C;&#x7684;EventListener</a>&#xFF0C;&#x6240;&#x4EE5;&#x53EA;&#x8981;&#x5C06;&#x533F;&#x540D;&#x7684;EventListener&#xFF0C;&#x547D;&#x540D;&#x4E00;&#x4E0B;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var container = document.querySelector(&apos;.container&apos;);
    var counter = 0;
    var createHtml = function (n, counter) {
      var template = `${(new Array(n)).join(`&lt;div&gt;${counter}: this is a new data &lt;input type=&quot;button&quot; value=&quot;remove&quot;&gt;&lt;/div&gt;`)}`
      container.innerHTML = template;
    }
    // 
    var clickCallback = function (event) {
      var target = event.target;
      if (target.tagName === &apos;INPUT&apos;) {
        container.removeChild(target.parentElement)
      }
    }
    var resizeCallback = function (init) {
      createHtml(10, ++counter);
      // &#x4E8B;&#x4EF6;&#x59D4;&#x6258;
      container.addEventListener(&apos;click&apos;, clickCallback, false);
    }
    window.addEventListener(&apos;resize&apos;, resizeCallback, false);
    resizeCallback(true);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">    <span class="hljs-keyword">var</span> container = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;.container&apos;</span>);
    <span class="hljs-keyword">var</span> counter = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> createHtml = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">n, counter</span>) </span>{
      <span class="hljs-keyword">var</span> template = <span class="hljs-string">`<span class="hljs-subst">${(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(n)).join(<span class="hljs-string">`&lt;div&gt;<span class="hljs-subst">${counter}</span>: this is a new data &lt;input type=&quot;button&quot; value=&quot;remove&quot;&gt;&lt;/div&gt;`</span>)}</span>`</span>
      container.innerHTML = template;
    }
    <span class="hljs-comment">// </span>
    <span class="hljs-keyword">var</span> clickCallback = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">var</span> target = event.target;
      <span class="hljs-keyword">if</span> (target.tagName === <span class="hljs-string">&apos;INPUT&apos;</span>) {
        container.removeChild(target.parentElement)
      }
    }
    <span class="hljs-keyword">var</span> resizeCallback = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">init</span>) </span>{
      createHtml(<span class="hljs-number">10</span>, ++counter);
      <span class="hljs-comment">// &#x4E8B;&#x4EF6;&#x59D4;&#x6258;</span>
      container.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, clickCallback, <span class="hljs-literal">false</span>);
    }
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;resize&apos;</span>, resizeCallback, <span class="hljs-literal">false</span>);
    resizeCallback(<span class="hljs-literal">true</span>);</code></pre><p>&#x5728;Devtools&#x2013;&gt;Performance&#x4E2D;&#x518D;&#x91CD;&#x590D;&#x4E0A;&#x8FF0;&#x64CD;&#x4F5C;&#xFF0C;&#x5206;&#x6790;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000012283274?w=653&amp;h=615" src="https://static.alili.tech/img/remote/1460000012283274?w=653&amp;h=615" alt="callback" title="callback" style="cursor:pointer"></span></p><p>&#x5728;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x5F00;&#x53D1;&#x8005;&#x5F88;&#x5C11;&#x5173;&#x6CE8;&#x4E8B;&#x4EF6;&#x89E3;&#x7ED1;&#xFF0C;&#x56E0;&#x4E3A;&#x6D4F;&#x89C8;&#x5668;&#x5DF2;&#x7ECF;&#x4E3A;&#x6211;&#x4EEC;&#x5904;&#x7406;&#x5F97;&#x5F88;&#x597D;&#x4E86;&#x3002;&#x4E0D;&#x8FC7;&#x5728;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x7279;&#x522B;&#x6CE8;&#x610F;&#xFF0C;&#x56E0;&#x4E3A;&#x4E00;&#x822C;&#x7B2C;&#x4E09;&#x65B9;&#x5E93;&#x90FD;&#x5B9E;&#x73B0;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5728;&#x9700;&#x8981;&#x9500;&#x6BC1;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x8C03;&#x7528;&#x6240;&#x89E3;&#x7ED1;&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x53EF;&#x80FD;&#x9020;&#x6210;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x6570;&#x91CF;&#x7684;&#x4E0D;&#x65AD;&#x589E;&#x52A0;&#x3002;&#x5982;&#x4E0B;&#x94FE;&#x63A5;&#x662F;&#x6211;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;jquery&#xFF0C;&#x9047;&#x89C1;&#x5230;&#x7C7B;&#x4F3C;&#x95EE;&#x9898;&#xFF1A;<a href="https://github.com/zhansingsong/js-leakage-patterns/blob/master/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BListeners/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BListeners.md" rel="nofollow noreferrer" target="_blank">jQuery&#x4E2D;&#x5FD8;&#x8BB0;&#x89E3;&#x7ED1;&#x6CE8;&#x518C;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x9020;&#x6210;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x27B9;&#x731B;&#x51FB;?</a></p><h2 id="articleHeader16">&#x603B;&#x7ED3;</h2><p>&#x672C;&#x6587;&#x4E3B;&#x8981;&#x4ECB;&#x7ECD;&#x4E86;&#x51E0;&#x79CD;&#x5E38;&#x89C1;&#x7684;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x3002;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#xFF0C;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x7279;&#x522B;&#x7559;&#x610F;&#x4E00;&#x4E0B;&#x672C;&#x6587;&#x6240;&#x6D89;&#x53CA;&#x5230;&#x7684;&#x51E0;&#x79CD;&#x5185;&#x5B58;&#x6CC4;&#x9732;&#x95EE;&#x9898;&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x4E9B;&#x968F;&#x65F6;&#x53EF;&#x80FD;&#x53D1;&#x751F;&#x5728;&#x6211;&#x4EEC;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5BF9;&#x5B83;&#x4EEC;&#x4E0D;&#x4E86;&#x89E3;&#x662F;&#x5F88;&#x96BE;&#x53D1;&#x73B0;&#x5B83;&#x4EEC;&#x7684;&#x5B58;&#x5728;&#x3002;&#x53EF;&#x80FD;&#x5728;&#x5B83;&#x4EEC;&#x5C06;&#x95EE;&#x9898;&#x5F71;&#x54CD;&#x7A0B;&#x5EA6;&#x653E;&#x5927;&#x65F6;&#xFF0C;&#x624D;&#x4F1A;&#x5F15;&#x8D77;&#x6211;&#x4EEC;&#x7684;&#x5173;&#x6CE8;&#x3002;&#x4E0D;&#x8FC7;&#x90A3;&#x65F6;&#x53EF;&#x80FD;&#x5C31;&#x665A;&#x4E86;&#xFF0C;&#x56E0;&#x4E3A;&#x4EA7;&#x54C1;&#x53EF;&#x80FD;&#x5DF2;&#x7ECF;&#x4E0A;&#x7EBF;&#xFF0C;&#x63A5;&#x7740;&#x5C31;&#x4F1A;&#x4E25;&#x91CD;&#x5F71;&#x54CD;&#x4EA7;&#x54C1;&#x7684;&#x8D28;&#x91CF;&#x548C;&#x7528;&#x6237;&#x4F53;&#x9A8C;&#xFF0C;&#x751A;&#x81F3;&#x53EF;&#x80FD;&#x8BA9;&#x6211;&#x4EEC;&#x627F;&#x53D7;&#x5927;&#x91CF;&#x7528;&#x6237;&#x6D41;&#x5931;&#x7684;&#x635F;&#x5931;&#x3002;&#x4F5C;&#x4E3A;&#x5F00;&#x53D1;&#x7684;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x628A;&#x597D;&#x8FD9;&#x4E2A;&#x5173;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x5F00;&#x53D1;&#x7684;&#x4EA7;&#x54C1;&#x5E26;&#x7ED9;&#x7528;&#x6237;&#x6700;&#x597D;&#x7684;&#x4F53;&#x9A8C;&#x3002;</p><h2 id="articleHeader17">&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;</h2><ul><li><a href="https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156" rel="nofollow noreferrer" target="_blank">An interesting kind of JavaScript memory leak</a></li><li><a href="http://isaacschlueter.com/2006/10/msie-memory-leaks/trackback/index.html" rel="nofollow noreferrer" target="_blank">Memory Leaks in Microsoft Internet Explorer</a></li><li><a href="https://stackoverflow.com/questions/12996129/memory-leak-when-logging-complex-objects" rel="nofollow noreferrer" target="_blank">Memory leak when logging complex objects</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
看完离编写高性能的JavaScript又近了一步

## 原文链接
[https://segmentfault.com/a/1190000012283254](https://segmentfault.com/a/1190000012283254)


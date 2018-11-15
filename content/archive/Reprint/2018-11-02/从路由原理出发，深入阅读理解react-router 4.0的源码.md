---
title: 从路由原理出发，深入阅读理解react-router 4.0的源码
reprint: true
categories: reprint
abbrlink: f0b90797
date: 2018-11-02 02:30:12
---

{{% raw %}}
<hr><p>&#x2002;&#x2002;react-router&#x7B49;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#x539F;&#x7406;&#x5927;&#x81F4;&#x76F8;&#x540C;&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x65E0;&#x5237;&#x65B0;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x5207;&#x6362;&#x663E;&#x793A;&#x4E0D;&#x540C;&#x7684;&#x9875;&#x9762;&#x3002;&#x8DEF;&#x7531;&#x7684;&#x672C;&#x8D28;&#x5C31;&#x662F;&#x9875;&#x9762;&#x7684;URL&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x9875;&#x9762;&#x7684;&#x663E;&#x793A;&#x7ED3;&#x679C;&#x53EF;&#x4EE5;&#x6839;&#x636E;URL&#x7684;&#x53D8;&#x5316;&#x800C;&#x53D8;&#x5316;&#xFF0C;&#x4F46;&#x662F;&#x9875;&#x9762;&#x4E0D;&#x4F1A;&#x5237;&#x65B0;&#x3002;&#x901A;&#x8FC7;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x5355;&#x9875;(SPA)&#x5E94;&#x7528;,&#x672C;&#x6587;&#x9996;&#x5148;&#x4ECE;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#x539F;&#x7406;&#x51FA;&#x53D1;&#xFF0C;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E86;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x539F;&#x7406;&#x7684;&#x53D8;&#x8FC1;&#x3002;&#x63A5;&#x7740;&#x4ECE;react-router4.0&#x7684;&#x6E90;&#x7801;&#x51FA;&#x53D1;&#xFF0C;&#x6DF1;&#x5165;&#x7406;&#x89E3;react-router4.0&#x662F;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#x3002;</p><blockquote><ul><li>&#x901A;&#x8FC7;Hash&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;</li><li>&#x901A;&#x8FC7;H5&#x7684;history&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;</li><li>React-router4.0&#x7684;&#x4F7F;&#x7528;</li><li>React-router4.0&#x6E90;&#x7801;&#x5206;&#x6790;</li></ul></blockquote><hr><p>&#x539F;&#x6587;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x5728;&#x6211;&#x7684;&#x535A;&#x5BA2;&#x4E2D;&#xFF1A;<a href="https://github.com/forthealllight/blog/issues/26" rel="nofollow noreferrer" target="_blank">https://github.com/forthealll...</a></p><p>&#x5982;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x60A8;&#x7684;star&#x662F;&#x5BF9;&#x6211;&#x6700;&#x597D;&#x7684;&#x9F13;&#x52B1;&#xFF5E;</p><h2 id="articleHeader0">&#x4E00;&#x3001;&#x901A;&#x8FC7;Hash&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;</h2><h3 id="articleHeader1">1&#x3001;hash&#x7684;&#x539F;&#x7406;</h3><p>&#x2002;&#x2002;&#x65E9;&#x671F;&#x7684;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x662F;&#x901A;&#x8FC7;hash&#x6765;&#x5B9E;&#x73B0;&#x7684;&#xFF1A;</p><p><strong><em>&#x6539;&#x53D8;url&#x7684;hash&#x503C;&#x662F;&#x4E0D;&#x4F1A;&#x5237;&#x65B0;&#x9875;&#x9762;&#x7684;&#x3002;</em></strong></p><p>&#x2002;&#x2002;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;hash&#x6765;&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x65E0;&#x5237;&#x65B0;&#x7684;&#x6548;&#x679C;&#x3002;hash&#x5C5E;&#x6027;&#x4F4D;&#x4E8E;location&#x5BF9;&#x8C61;&#x4E2D;&#xFF0C;&#x5728;&#x5F53;&#x524D;&#x9875;&#x9762;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.location.hash=&apos;edit&apos;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>window<span class="hljs-selector-class">.location</span><span class="hljs-selector-class">.hash</span>=<span class="hljs-string">&apos;edit&apos;</span>
</code></pre><p>&#x6765;&#x5B9E;&#x73B0;&#x6539;&#x53D8;&#x5F53;&#x524D;url&#x7684;hash&#x503C;&#x3002;&#x6267;&#x884C;&#x4E0A;&#x8FF0;&#x7684;hash&#x8D4B;&#x503C;&#x540E;&#xFF0C;&#x9875;&#x9762;&#x7684;url&#x53D1;&#x751F;&#x6539;&#x53D8;&#x3002;</p><p>&#x8D4B;&#x503C;&#x524D;&#xFF1A;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000<br>&#x8D4B;&#x503C;&#x540E;&#xFF1A;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/#edit</p><p>&#x5728;url&#x4E2D;&#x591A;&#x4E86;&#x4EE5;#&#x7ED3;&#x5C3E;&#x7684;hash&#x503C;&#xFF0C;&#x4F46;&#x662F;&#x8D4B;&#x503C;&#x524D;&#x540E;&#x867D;&#x7136;&#x9875;&#x9762;&#x7684;hash&#x503C;&#x6539;&#x53D8;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x5B8C;&#x6574;&#x7684;url&#x53D1;&#x751F;&#x4E86;&#x6539;&#x53D8;&#xFF0C;&#x4F46;&#x662F;&#x9875;&#x9762;&#x662F;&#x4E0D;&#x4F1A;&#x5237;&#x65B0;&#x7684;&#x3002;&#x6B64;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;hashchange&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x76D1;&#x542C;hash&#x7684;&#x53D8;&#x5316;,&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0B;&#x9762;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x76D1;&#x542C;hash&#x7684;&#x53D8;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onhashchange=function(event){
   console.log(event);
}
window.addEventListener(&apos;hashchange&apos;,function(event){
   console.log(event);
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onhashchange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
   <span class="hljs-built_in">console</span>.log(event);
}
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">&apos;hashchange&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
   <span class="hljs-built_in">console</span>.log(event);
})
</code></pre><p>&#x5F53;hash&#x503C;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x8F93;&#x51FA;&#x4E00;&#x4E2A;HashChangeEvent&#x3002;&#x8BE5;HashChangeEvent&#x7684;&#x5177;&#x4F53;&#x503C;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{isTrusted: true, oldURL: &quot;http://localhost:3000/&quot;, newURL:   &quot;http://localhost:3000/#teg&quot;, type: &quot;hashchange&quot;.....}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>{<span class="hljs-string">isTrusted:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">oldURL:</span> <span class="hljs-string">&quot;http://localhost:3000/&quot;</span>, <span class="hljs-string">newURL:</span>   <span class="hljs-string">&quot;http://localhost:3000/#teg&quot;</span>, <span class="hljs-string">type:</span> <span class="hljs-string">&quot;hashchange&quot;</span>.....}

</code></pre><p>&#x2002;&#x2002;&#x6709;&#x4E86;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E14;&#x6539;&#x53D8;hash&#x9875;&#x9762;&#x4E0D;&#x5237;&#x65B0;&#xFF0C;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x6267;&#x884C;&#x6211;&#x4EEC;&#x5C55;&#x793A;&#x548C;&#x9690;&#x85CF;&#x4E0D;&#x540C;UI&#x663E;&#x793A;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x4ECE;&#x800C;&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x3002;</p><p>&#x6B64;&#x5916;&#xFF0C;&#x9664;&#x4E86;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;window.location.hash&#x6765;&#x6539;&#x53D8;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;hash&#x503C;&#x5916;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;html&#x7684;a&#x6807;&#x7B7E;&#x6765;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;a href=&quot;#edit&quot;&gt;edit&lt;/a&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;#edit&quot;</span>&gt;</span>edit<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
</code></pre><h3 id="articleHeader2">2&#x3001;hash&#x7684;&#x7F3A;&#x70B9;</h3><p>hash&#x7684;&#x517C;&#x5BB9;&#x6027;&#x8F83;&#x597D;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x65E9;&#x671F;&#x7684;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x4E2D;&#x5927;&#x91CF;&#x7684;&#x91C7;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x4F7F;&#x7528;hash&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x7F3A;&#x70B9;&#x3002;</p><ul><li>&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x5BF9;&#x5E26;&#x6709;hash&#x7684;&#x9875;&#x9762;&#x4E0D;&#x53CB;&#x597D;</li><li>&#x5E26;&#x6709;hash&#x7684;&#x9875;&#x9762;&#x5185;&#x96BE;&#x4EE5;&#x8FFD;&#x8E2A;&#x7528;&#x6237;&#x884C;&#x4E3A;</li></ul><h2 id="articleHeader3">&#x4E8C;&#x3001;&#x901A;&#x8FC7;history&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;</h2><p>HTML5&#x7684;History&#x63A5;&#x53E3;&#xFF0C;History&#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x4E2A;&#x5E95;&#x5C42;&#x63A5;&#x53E3;&#xFF0C;&#x4E0D;&#x7EE7;&#x627F;&#x4E8E;&#x4EFB;&#x4F55;&#x7684;&#x63A5;&#x53E3;&#x3002;History&#x63A5;&#x53E3;&#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x64CD;&#x4F5C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#x8BB0;&#x5F55;&#x3002;</p><h3 id="articleHeader4">(1)History&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</h3><p>History&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;</p><p>History&#x7684;&#x5C5E;&#x6027;&#xFF1A;</p><ul><li>History.length: &#x8FD4;&#x56DE;&#x5728;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#x4E2D;&#x6709;&#x591A;&#x5C11;&#x6761;&#x8BB0;&#x5F55;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x5F53;&#x524D;&#x4F1A;&#x8BDD;&#x9875;&#x9762;&#x3002;&#x6B64;&#x5916;&#x5982;&#x679C;&#x6253;&#x5F00;&#x4E00;&#x4E2A;&#x65B0;&#x7684;Tab&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;length&#x7684;&#x503C;&#x4E3A;1</li><li>History.state:</li></ul><p>&#x4FDD;&#x5B58;&#x4E86;&#x4F1A;&#x51FA;&#x53D1;popState&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6240;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x5C5E;&#x6027;&#x5BF9;&#x8C61;&#xFF08;&#x540E;&#x9762;&#x4F1A;&#x5728;pushState&#x548C;replaceState&#x65B9;&#x6CD5;&#x4E2D;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#xFF09;</p><p>History&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li>History.back(): &#x8FD4;&#x56DE;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#x4E2D;&#x7684;&#x4E0A;&#x4E00;&#x9875;&#xFF0C;&#x8DDF;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x56DE;&#x9000;&#x6309;&#x94AE;&#x529F;&#x80FD;&#x76F8;&#x540C;</li><li>History.forward():&#x6307;&#x5411;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#x4E2D;&#x7684;&#x4E0B;&#x4E00;&#x9875;&#xFF0C;&#x8DDF;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x524D;&#x8FDB;&#x6309;&#x94AE;&#x76F8;&#x540C;</li><li>History.go(): &#x53EF;&#x4EE5;&#x8DF3;&#x8F6C;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#x4E2D;&#x7684;&#x6307;&#x5B9A;&#x7684;&#x67D0;&#x4E00;&#x4E2A;&#x8BB0;&#x5F55;&#x9875;</li><li>History.pushState():pushState&#x53EF;&#x4EE5;&#x5C06;&#x7ED9;&#x5B9A;&#x7684;&#x6570;&#x636E;&#x538B;&#x5165;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#x6808;&#x4E2D;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x63A5;&#x6536;3&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5BF9;&#x8C61;&#xFF0C;title&#x548C;&#x4E00;&#x4E32;url&#x3002;pushState&#x540E;&#x4F1A;&#x6539;&#x53D8;&#x5F53;&#x524D;&#x9875;&#x9762;url&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x4F1A;&#x4F34;&#x968F;&#x7740;&#x5237;&#x65B0;</li><li>History.replaceState():replaceState&#x5C06;&#x5F53;&#x524D;&#x7684;&#x4F1A;&#x8BDD;&#x9875;&#x9762;&#x7684;url&#x66FF;&#x6362;&#x6210;&#x6307;&#x5B9A;&#x7684;&#x6570;&#x636E;&#xFF0C;replaceState&#x540E;&#x4E5F;&#x4F1A;&#x6539;&#x53D8;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;url&#xFF0C;&#x4F46;&#x662F;&#x4E5F;&#x4E0D;&#x4F1A;&#x5237;&#x65B0;&#x9875;&#x9762;&#x3002;</li></ul><p>&#x4E0A;&#x9762;&#x7684;&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;pushState&#x548C;repalce&#x7684;&#x76F8;&#x540C;&#x70B9;&#xFF1A;</p><p><strong><em>&#x5C31;&#x662F;&#x90FD;&#x4F1A;&#x6539;&#x53D8;&#x5F53;&#x524D;&#x9875;&#x9762;&#x663E;&#x793A;&#x7684;url&#xFF0C;&#x4F46;&#x90FD;&#x4E0D;&#x4F1A;&#x5237;&#x65B0;&#x9875;&#x9762;&#x3002;</em></strong></p><p>&#x4E0D;&#x540C;&#x70B9;&#xFF1A;</p><p><strong><em>pushState&#x662F;&#x538B;&#x5165;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#x6808;&#x4E2D;&#xFF0C;&#x4F1A;&#x4F7F;&#x5F97;History.length&#x52A0;1&#xFF0C;&#x800C;replaceState&#x662F;&#x66FF;&#x6362;&#x5F53;&#x524D;&#x7684;&#x8FD9;&#x6761;&#x4F1A;&#x8BDD;&#x5386;&#x53F2;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x4F1A;&#x589E;&#x52A0;History.length.</em></strong></p><h3 id="articleHeader5">(2)BOM&#x5BF9;&#x8C61;history</h3><p>history&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x7684;BOM&#x5BF9;&#x8C61;&#x6A21;&#x578B;&#x4E2D;&#x7684;&#x91CD;&#x8981;&#x5C5E;&#x6027;&#xFF0C;history&#x5B8C;&#x5168;&#x7EE7;&#x627F;&#x4E86;History&#x63A5;&#x53E3;&#xFF0C;&#x56E0;&#x6B64;&#x62E5;&#x6709;History&#x4E2D;&#x7684;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x6765;&#x770B;&#x770B;history.length&#x5C5E;&#x6027;&#x4EE5;&#x53CA;history.pushState&#x3001;history.replaceState&#x65B9;&#x6CD5;&#x3002;</p><ul><li>history.pushState(stateObj,title,url) or history.replaceState(stateObj,title,url)</li></ul><p>pushState&#x548C;replaceState&#x63A5;&#x53D7;3&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5206;&#x522B;&#x4E3A;state&#x5BF9;&#x8C61;&#xFF0C;title&#x6807;&#x9898;&#xFF0C;&#x6539;&#x53D8;&#x7684;url&#x3002;</p><p>window.history.pushState({foo:&apos;bar&apos;}, &quot;page 2&quot;, &quot;bar.html&quot;);</p><p>&#x6B64;&#x65F6;&#xFF0C;&#x5F53;&#x524D;&#x7684;url&#x53D8;&#x4E3A;&#xFF1A;</p><p>&#x6267;&#x884C;&#x4E0A;&#x8FF0;&#x65B9;&#x6CD5;&#x524D;&#xFF1A;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000<br>&#x6267;&#x884C;&#x4E0A;&#x8FF0;&#x65B9;&#x6CD5;&#x540E;&#xFF1A;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/bar.html</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8F93;&#x51FA;window.history.state:</p><p>console.log(window.history.state);<br>// {foo:&apos;bar&apos;}</p><p>window.history.state&#x5C31;&#x662F;&#x6211;&#x4EEC;pushState&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x53C2;&#x6570;&#x3002;</p><ul><li>history.replaceState()&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x6539;&#x53D8;hitroy&#x7684;&#x957F;&#x5EA6;<p>console.log(window.history.length);<br>window.history.replaceState({foo:&apos;bar&apos;}, &quot;page 2&quot;, &quot;bar.html&quot;);<br>console.log(window.history.length);</p></li></ul><p>&#x4E0A;&#x8FF0;&#x524D;&#x540E;&#x4E24;&#x6B21;&#x8F93;&#x51FA;&#x7684;window.history.length&#x662F;&#x76F8;&#x7B49;&#x7684;&#x3002;</p><p>&#x6B64;&#x5916;&#x3002;</p><p>&#x6BCF;&#x6B21;&#x89E6;&#x53D1;history.back()&#x6216;&#x8005;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x540E;&#x9000;&#x6309;&#x94AE;&#x7B49;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x4E2A;popstate&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x5728;&#x540E;&#x9000;&#x6216;&#x8005;&#x524D;&#x8FDB;&#x7684;&#x65F6;&#x5019;&#x53D1;&#x751F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onpopstate=function(event){

}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onpopstate=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{

}
</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;<br>history.pushState&#x548C;history.replaceState&#x65B9;&#x6CD5;&#x5E76;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;popstate&#x4E8B;&#x4EF6;&#x3002;</p><p><strong><em>&#x5982;&#x679C;&#x7528;history&#x505A;&#x4E3A;&#x8DEF;&#x7531;&#x7684;&#x57FA;&#x7840;&#xFF0C;&#x90A3;&#x4E48;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x662F;history.pushState&#x548C;history.replaceState,&#x5728;&#x4E0D;&#x5237;&#x65B0;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x53EF;&#x4EE5;&#x6539;&#x53D8;url&#x7684;&#x5730;&#x5740;&#xFF0C;&#x4E14;&#x5982;&#x679C;&#x9875;&#x9762;&#x53D1;&#x751F;&#x56DE;&#x9000;back&#x6216;&#x8005;forward&#x65F6;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;popstate&#x4E8B;&#x4EF6;&#x3002;</em></strong></p><p>hisory&#x4E3A;&#x4F9D;&#x636E;&#x6765;&#x5B9E;&#x73B0;&#x8DEF;&#x7531;&#x7684;&#x4F18;&#x70B9;&#xFF1A;</p><ul><li>&#x5BF9;&#x641C;&#x7D22;&#x5F15;&#x64CE;&#x53CB;&#x597D;</li><li>&#x65B9;&#x4FBF;&#x7EDF;&#x8BA1;&#x7528;&#x6237;&#x884C;&#x4E3A;</li></ul><p>&#x7F3A;&#x70B9;&#xFF1A;</p><ul><li>&#x517C;&#x5BB9;&#x6027;&#x4E0D;&#x5982;hash</li><li>&#x9700;&#x8981;&#x540E;&#x7AEF;&#x505A;&#x76F8;&#x5E94;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x5426;&#x5219;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x5B50;&#x9875;&#x9762;&#x4F1A;&#x51FA;&#x73B0;404&#x9519;&#x8BEF;</li></ul><h2 id="articleHeader6">&#x4E09;&#x3001;React-router4.0&#x7684;&#x4F7F;&#x7528;</h2><p>&#x4E86;&#x89E3;&#x4E86;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x5B9E;&#x73B0;&#x7684;&#x539F;&#x7406;&#x4E4B;&#x540E;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;React-router4.0&#x3002;&#x5728;React-router4.0&#x7684;&#x4EE3;&#x7801;&#x5E93;&#x4E2D;&#xFF0C;&#x6839;&#x636E;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x5305;&#x542B;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x5305;&#xFF1A;</p><ul><li>react-router : react-router4.0&#x7684;&#x6838;&#x5FC3;&#x4EE3;&#x7801;</li><li>react-router-dom : &#x6784;&#x5EFA;&#x7F51;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x5B58;&#x5728;DOM&#x5BF9;&#x8C61;&#x573A;&#x666F;&#x4E0B;&#x7684;&#x6838;&#x5FC3;&#x5305;</li><li>react-router-native : &#x9002;&#x7528;&#x4E8E;&#x6784;&#x5EFA;react-native&#x5E94;&#x7528;</li><li>react-router-config : &#x914D;&#x7F6E;&#x9759;&#x6001;&#x8DEF;&#x7531;</li><li>react-router-redux : &#x7ED3;&#x5408;redux&#x6765;&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#xFF0C;&#x5DF2;&#x5E9F;&#x5F03;&#xFF0C;&#x4E0D;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x3002;</li></ul><p>&#x5728;react-router4.0&#x4E2D;&#xFF0C;&#x9075;&#x5FAA;Just Component&#x7684;&#x8BBE;&#x8BA1;&#x7406;&#x5FF5;&#xFF1A;</p><p><strong><em>&#x6240;&#x63D0;&#x4F9B;&#x7684;API&#x90FD;&#x662F;&#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#x7ED9;&#x51FA;&#x3002;</em></strong></p><p>&#x6BD4;&#x5982;BrowserRouter&#x3001;Router&#x3001;Link&#x3001;Switch&#x7B49;API&#x90FD;&#x662F;&#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#x6765;&#x4F7F;&#x7528;&#x3002;</p><h3 id="articleHeader7">1&#x3001;React-router-dom&#x5E38;&#x7528;&#x7684;&#x7EC4;&#x4EF6;API</h3><p>&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x4EE5;React-router4.0&#x4E2D;&#x7684;React-router-dom&#x5305;&#x6765;&#x4ECB;&#x7ECD;&#x5E38;&#x7528;&#x7684;BrowserRouter&#x3001;HashRouter&#x3001;Link&#x548C;Router&#x7B49;&#x3002;</p><h4>(1) &lt;BrowserRouter&gt;</h4><p>&#x7528;&lt;BrowserRouter&gt; &#x7EC4;&#x4EF6;&#x5305;&#x88F9;&#x6574;&#x4E2A;App&#x7CFB;&#x7EDF;&#x540E;&#xFF0C;&#x5C31;&#x662F;&#x901A;&#x8FC7;html5&#x7684;history&#x6765;&#x5B9E;&#x73B0;&#x65E0;&#x5237;&#x65B0;&#x6761;&#x4EF6;&#x4E0B;&#x7684;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x3002;</p><p>&lt;BrowserRouter&gt;&#x7EC4;&#x4EF6;&#x5177;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;</p><ul><li><p>basename: string &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x662F;&#x4E3A;&#x5F53;&#x524D;&#x7684;url&#x518D;&#x589E;&#x52A0;&#x540D;&#x4E3A;basename&#x7684;&#x503C;&#x7684;&#x5B50;&#x76EE;&#x5F55;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;BrowserRouter basename=&quot;test&quot;/&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code> &lt;<span class="hljs-keyword">BrowserRouter </span><span class="hljs-keyword">basename=&quot;test&quot;/&gt;
</span></code></pre></li></ul><p>&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;basename&#x5C5E;&#x6027;&#xFF0C;&#x90A3;&#x4E48;&#x6B64;&#x65F6;&#x7684;&#xFF1A;</p><p><a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000 &#x548C; <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/test &#x8868;&#x793A;&#x7684;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x5730;&#x5740;&#xFF0C;&#x6E32;&#x67D3;&#x7684;&#x5185;&#x5BB9;&#x76F8;&#x540C;&#x3002;</p><ul><li>getUserConfirmation: func &#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x7528;&#x4E8E;&#x786E;&#x8BA4;&#x5BFC;&#x822A;&#x7684;&#x529F;&#x80FD;&#x3002;&#x9ED8;&#x8BA4;&#x4F7F;&#x7528;window.confirm</li><li>forceRefresh: bool &#x9ED8;&#x8BA4;&#x4E3A;false&#xFF0C;&#x8868;&#x793A;&#x6539;&#x53D8;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x9875;&#x9762;&#x4E0D;&#x4F1A;&#x91CD;&#x65B0;&#x5237;&#x65B0;&#xFF0C;&#x5982;&#x679C;&#x5F53;&#x524D;&#x6D4F;&#x89C8;&#x5668;&#x4E0D;&#x652F;&#x6301;history&#xFF0C;&#x90A3;&#x4E48;&#x5F53;forceRefresh&#x8BBE;&#x7F6E;&#x4E3A;true&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6B64;&#x65F6;&#x6BCF;&#x6B21;&#x53BB;&#x6539;&#x53D8;url&#x90FD;&#x4F1A;&#x91CD;&#x65B0;&#x5237;&#x65B0;&#x6574;&#x4E2A;&#x9875;&#x9762;&#x3002;</li><li>keyLength: number &#x8868;&#x793A;location&#x7684;key&#x5C5E;&#x6027;&#x7684;&#x957F;&#x5EA6;&#xFF0C;&#x5728;react-router&#x4E2D;&#x6BCF;&#x4E2A;url&#x4E0B;&#x90FD;&#x6709;&#x4E3A;&#x4E00;&#x4E2A;location&#x4E0E;&#x5176;&#x5BF9;&#x5E94;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x4E00;&#x4E2A;url&#x7684;location&#x7684;key&#x503C;&#x90FD;&#x4E0D;&#x76F8;&#x540C;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E00;&#x822C;&#x90FD;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x8BBE;&#x7F6E;&#x7684;&#x610F;&#x4E49;&#x4E0D;&#x5927;&#x3002;</li><li>children: node children&#x7684;&#x5C5E;&#x6027;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;ReactNode&#x8282;&#x70B9;&#xFF0C;&#x8868;&#x793A;&#x552F;&#x4E00;&#x6E32;&#x67D3;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x3002;</li></ul><p>&#x4E0E;&lt;BrowserRouter&gt;&#x5BF9;&#x5E94;&#x7684;&#x662F;&lt;HashRouter&gt;,&lt;HashRouter&gt;&#x4F7F;&#x7528;url&#x4E2D;&#x7684;hash&#x5C5E;&#x6027;&#x6765;&#x4FDD;&#x8BC1;&#x4E0D;&#x91CD;&#x65B0;&#x5237;&#x65B0;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x540C;&#x65F6;&#x6E32;&#x67D3;&#x9875;&#x9762;&#x3002;</p><h4>(2) &lt;Route&gt;</h4><p>&lt;Route&gt; &#x7EC4;&#x4EF6;&#x5341;&#x5206;&#x91CD;&#x8981;&#xFF0C;&lt;Route&gt; &#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;&#x5339;&#x914D;&#x76F8;&#x5E94;&#x7684;location&#x4E2D;&#x7684;&#x5730;&#x5740;&#xFF0C;&#x5339;&#x914D;&#x6210;&#x529F;&#x540E;&#x6E32;&#x67D3;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x770B;&lt;Route&gt;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#x3002;</p><p>&#x9996;&#x5148;&#x6765;&#x770B;&#x5982;&#x4F55;&#x6267;&#x884C;&#x5339;&#x914D;&#xFF0C;&#x51B3;&#x5B9A;&lt;Route&gt;&#x5730;&#x5740;&#x5339;&#x914D;&#x7684;&#x5C5E;&#x6027;&#xFF1A;</p><ul><li>path&#xFF1A;&#x5F53;location&#x4E2D;&#x7684;url&#x6539;&#x53D8;&#x540E;&#xFF0C;&#x4F1A;&#x4E0E;Route&#x4E2D;&#x7684;path&#x5C5E;&#x6027;&#x505A;&#x5339;&#x914D;&#xFF0C;path&#x51B3;&#x5B9A;&#x4E86;&#x4E0E;&#x8DEF;&#x7531;&#x6216;&#x8005;url&#x76F8;&#x5173;&#x7684;&#x6E32;&#x67D3;&#x6548;&#x679C;&#x3002;</li><li>exact: &#x5982;&#x679C;&#x6709;exact&#xFF0C;&#x53EA;&#x6709;url&#x5730;&#x5740;&#x5B8C;&#x5168;&#x4E0E;path&#x76F8;&#x540C;&#xFF0C;&#x624D;&#x4F1A;&#x5339;&#x914D;&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;exact&#x5C5E;&#x6027;&#xFF0C;url&#x7684;&#x5730;&#x5740;&#x4E0D;&#x5B8C;&#x5168;&#x76F8;&#x540C;&#xFF0C;&#x4E5F;&#x4F1A;&#x5339;&#x914D;&#x3002;</li></ul><p>&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF0C;&#x5F53;exact&#x4E0D;&#x8BBE;&#x7F6E;&#x65F6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Route  path=&apos;/home&apos; component={Home}/&gt; 
&lt;Route  path=&apos;/home/first&apos; component={First}/&gt; 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Route</span>  <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/home&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}/</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">Route</span>  <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/home/first&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{First}/</span>&gt;</span> 
</code></pre><p>&#x6B64;&#x65F6;url&#x5730;&#x5740;&#x4E3A;&#xFF1A;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/home/first &#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x4EC5;&#x4EC5;&#x4F1A;&#x5339;&#x914D;&#x5230; path=&apos;/home/first&apos;&#x65F6;&#x7684;&#x7EC4;&#x4EF6;First,&#x540C;&#x65F6;&#x8FD8;&#x4F1A;&#x5339;&#x914D;&#x5230;path=&apos;home&apos;&#x65F6;&#x5019;&#x7684;Router&#x3002;</p><p>&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;exact&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;Route  path=&apos;/home&apos; component={Home}/&gt; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"> <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>  <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/home&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}/</span>&gt;</span> </code></pre><p>&#x53EA;&#x6709;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/home/first &#x4E0D;&#x4F1A;&#x5339;&#x914D;Home&#x7EC4;&#x4EF6;&#xFF0C;&#x53EA;&#x6709;url&#x5730;&#x5740;&#x5B8C;&#x5168;&#x4E0E;path&#x76F8;&#x540C;&#xFF0C;&#x53EA;&#x6709;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/home&#x624D;&#x80FD;&#x5339;&#x914D;Home&#x7EC4;&#x4EF6;&#x6210;&#x529F;&#x3002;</p><ul><li>strict &#xFF1A;&#x4E0E;exact&#x4E0D;&#x540C;&#xFF0C;strict&#x5C5E;&#x6027;&#x4EC5;&#x4EC5;&#x662F;&#x5BF9;exact&#x5C5E;&#x6027;&#x7684;&#x4E00;&#x4E2A;&#x8865;&#x5145;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E86;strict&#x5C5E;&#x6027;&#x540E;&#xFF0C;&#x4E25;&#x683C;&#x9650;&#x5236;&#x4E86;&#x4F46;&#x659C;&#x7EBF;&#x201C;&#xFF0F;&#x201D;&#x3002;</li></ul><p>&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;,&#x5F53;&#x4E0D;&#x8BBE;&#x7F6E;strict&#x7684;&#x65F6;&#x5019;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;Route  path=&apos;/home/&apos; component={Home}/&gt; 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code> <span class="hljs-tag">&lt;<span class="hljs-name">Route</span>  <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/home/&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}/</span>&gt;</span> 
</code></pre><p>&#x6B64;&#x65F6;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/home &#x548C; <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/home/<br>&#x90FD;&#x80FD;&#x5339;&#x914D;&#x5230;&#x7EC4;&#x4EF6;Home&#x3002;&#x5339;&#x914D;&#x5BF9;&#x4E8E;&#x659C;&#x7EBF;&#x201C;/&#x201D;&#x6BD4;&#x8F83;&#x5BBD;&#x677E;&#x3002;&#x5982;&#x679C;&#x8BBE;&#x7F6E;&#x4E86;strict&#x5C5E;&#x6027;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Route  path=&apos;/home/&apos; component={Home}/&gt; " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">Route</span>  <span class="hljs-attr">path</span>=<span class="hljs-string">&apos;/home/&apos;</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Home}/</span>&gt;</span> </code></pre><p>&#x90A3;&#x4E48;&#x6B64;&#x65F6;&#x4E25;&#x683C;&#x5339;&#x914D;&#x659C;&#x7EBF;&#x662F;&#x5426;&#x5B58;&#x5728;&#xFF0C;<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:3000/home &#x5C06;&#x65E0;&#x6CD5;&#x5339;&#x914D;&#x5230;Home&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x5F53;Route&#x7EC4;&#x4EF6;&#x4E0E;&#x67D0;&#x4E00;url&#x5339;&#x914D;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x5C31;&#x4F1A;&#x7EE7;&#x7EED;&#x53BB;&#x6E32;&#x67D3;&#x3002;&#x90A3;&#x4E48;&#x4EC0;&#x4E48;&#x5C5E;&#x6027;&#x51B3;&#x5B9A;&#x53BB;&#x6E32;&#x67D3;&#x54EA;&#x4E2A;&#x7EC4;&#x4EF6;&#x6216;&#x8005;&#x6837;&#x5F0F;&#x5462;&#xFF0C;Route&#x7684;component&#x3001;render&#x3001;children&#x51B3;&#x5B9A;&#x6E32;&#x67D3;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><ul><li>component&#xFF1A;&#x8BE5;&#x5C5E;&#x6027;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;React&#x7EC4;&#x4EF6;&#xFF0C;&#x5F53;url&#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C;&#x5C31;&#x4F1A;&#x6E32;&#x67D3;&#x8BE5;&#x7EC4;&#x4EF6;</li><li>render&#xFF1A;func &#x8BE5;&#x5C5E;&#x6027;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;React Element&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5F53;url&#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C;&#x6E32;&#x67D3;&#x8986;&#x8BE5;&#x8FD4;&#x56DE;&#x7684;&#x5143;&#x7D20;</li><li>children&#xFF1A;&#x4E0E;render&#x76F8;&#x4F3C;&#xFF0C;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;React Element&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x540C;&#x70B9;&#x662F;&#xFF0C;&#x65E0;&#x8BBA;url&#x4E0E;&#x5F53;&#x524D;&#x7684;Route&#x7684;path&#x5339;&#x914D;&#x4E0E;&#x5426;&#xFF0C;children&#x7684;&#x5185;&#x5BB9;&#x59CB;&#x7EC8;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x3002;</li></ul><p>&#x5E76;&#x4E14;&#x8FD9;3&#x4E2A;&#x5C5E;&#x6027;&#x6240;&#x63A5;&#x53D7;&#x7684;&#x65B9;&#x6CD5;&#x6216;&#x8005;&#x7EC4;&#x4EF6;&#xFF0C;&#x90FD;&#x4F1A;&#x6709;location&#xFF0C;match&#x548C;history&#x8FD9;3&#x4E2A;&#x53C2;&#x6570;&#x3002;&#x5982;&#x679C;&#x7EC4;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x7EC4;&#x4EF6;&#x7684;props&#x4E2D;&#x4F1A;&#x5B58;&#x5728;&#x4ECE;Link&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;location&#xFF0C;match&#x4EE5;&#x53CA;history&#x3002;</p><h4>(3) &lt;Link&gt;</h4><p>&lt;Route&gt;&#x5B9A;&#x4E49;&#x4E86;&#x5339;&#x914D;&#x89C4;&#x5219;&#x548C;&#x6E32;&#x67D3;&#x89C4;&#x5219;&#xFF0C;&#x800C;&lt;Link&gt; &#x51B3;&#x5B9A;&#x7684;&#x662F;&#x5982;&#x4F55;&#x5728;&#x9875;&#x9762;&#x5185;&#x6539;&#x53D8;url&#xFF0C;&#x4ECE;&#x800C;&#x4E0E;&#x76F8;&#x5E94;&#x7684;&lt;Route&gt;&#x5339;&#x914D;&#x3002;&lt;Link&gt;&#x7C7B;&#x4F3C;&#x4E8E;html&#x4E2D;&#x7684;a&#x6807;&#x7B7E;&#xFF0C;&#x6B64;&#x5916;&lt;Link&gt;&#x5728;&#x6539;&#x53D8;url&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x5C06;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;&#x4F20;&#x9012;&#x7ED9;&#x5339;&#x914D;&#x6210;&#x529F;&#x7684;Route&#xFF0C;&#x4F9B;&#x76F8;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x4F7F;&#x7528;&#x3002;</p><ul><li>to: string</li></ul><p>to&#x5C5E;&#x6027;&#x7684;&#x503C;&#x53EF;&#x4EE5;&#x4E3A;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x8DDF;html&#x4E2D;&#x7684;a&#x6807;&#x7B7E;&#x7684;href&#x4E00;&#x6837;&#xFF0C;&#x5373;&#x4F7F;to&#x5C5E;&#x6027;&#x7684;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF0C;&#x70B9;&#x51FB;Link&#x6807;&#x7B7E;&#x8DF3;&#x8F6C;&#x4ECE;&#x800C;&#x5339;&#x914D;&#x76F8;&#x5E94;path&#x7684;Route&#xFF0C;&#x4E5F;&#x4F1A;&#x5C06;history&#xFF0C;location&#xFF0C;match&#x8FD9;3&#x4E2A;&#x5BF9;&#x8C61;&#x4F20;&#x9012;&#x7ED9;Route&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x7684;props&#x4E2D;&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Link to=&apos;/home&apos;&gt;Home&lt;/Link&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>&lt;<span class="hljs-keyword">Link</span> <span class="hljs-keyword">to</span>=<span class="hljs-string">&apos;/home&apos;</span>&gt;Home&lt;/<span class="hljs-keyword">Link</span>&gt;
</code></pre><p>&#x5982;&#x4E0A;&#x6240;&#x793A;&#xFF0C;&#x5F53;to&#x63A5;&#x53D7;&#x4E00;&#x4E2A;string&#xFF0C;&#x8DF3;&#x8F6C;&#x5230;url&#x4E3A;&apos;/home&apos;&#x6240;&#x5339;&#x914D;&#x7684;Route&#xFF0C;&#x5E76;&#x6E32;&#x67D3;&#x5176;&#x5173;&#x8054;&#x7684;&#x7EC4;&#x4EF6;&#x5185;&#x63A5;&#x53D7;3&#x4E2A;&#x5BF9;&#x8C61;history&#xFF0C;location&#xFF0C;match&#x3002;<br>&#x8FD9;3&#x4E2A;&#x5BF9;&#x8C61;&#x4F1A;&#x5728;&#x4E0B;&#x4E00;&#x5C0F;&#x8282;&#x4F1A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x3002;</p><ul><li>to: object</li></ul><p>to&#x5C5E;&#x6027;&#x7684;&#x503C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x4E00;&#x4E0B;&#x51E0;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;pathname&#x3001;seacth&#x3001;hash&#x548C;state&#xFF0C;&#x5176;&#x4E2D;&#x524D;3&#x4E2A;&#x53C2;&#x6570;&#x4E0E;&#x5982;&#x4F55;&#x6539;&#x53D8;url&#x6709;&#x5173;&#xFF0C;&#x6700;&#x540E;&#x4E00;&#x4E2A;state&#x53C2;&#x6570;&#x662F;&#x7ED9;&#x76F8;&#x5E94;&#x7684;&#x6539;&#x53D8;url&#x65F6;&#xFF0C;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x53C2;&#x6570;&#x3002;</p><p>&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;Link to={{pathname:&apos;/home&apos;,search:&apos;?sort=name&apos;,hash:&apos;#edit&apos;,state:{a:1}}}&gt;Home&lt;/Link&gt;
 " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code> &lt;Link <span class="hljs-keyword">to</span>={{pathname:<span class="hljs-string">&apos;/home&apos;</span>,search:<span class="hljs-string">&apos;?sort=name&apos;</span>,hash:<span class="hljs-string">&apos;#edit&apos;</span>,state:{a:<span class="hljs-number">1</span>}}}&gt;Home&lt;/Link&gt;
 </code></pre><p>&#x5728;&#x4E0A;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;to&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x70B9;&#x51FB;Link&#x6807;&#x7B7E;&#x8DF3;&#x8F6C;&#x540E;&#xFF0C;&#x6539;&#x53D8;&#x540E;&#x7684;url&#x4E3A;&#xFF1A;&apos;/home?sort=name#edit&apos;&#x3002; &#x4F46;&#x662F;&#x5728;&#x4E0E;&#x76F8;&#x5E94;&#x7684;Route&#x5339;&#x914D;&#x65F6;&#xFF0C;&#x53EA;&#x5339;&#x914D;path&#x4E3A;&apos;/home&apos;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&apos;/home?sort=name#edit&apos;&#x3002;&#x5728;&apos;/home&apos;&#x540E;&#x6240;&#x5E26;&#x7684;&#x53C2;&#x6570;&#x4E0D;&#x4F5C;&#x4E3A;&#x5339;&#x914D;&#x6807;&#x51C6;&#xFF0C;&#x4EC5;&#x4EC5;&#x662F;&#x505A;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x5230;&#x6240;&#x5339;&#x914D;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x6B64;&#x5916;&#xFF0C;state={a:1}&#x4E5F;&#x540C;&#x6837;&#x505A;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x5230;&#x65B0;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x3002;</p><h4>(4) React-router&#x4E2D;&#x4F20;&#x9012;&#x7ED9;&#x7EC4;&#x4EF6;props&#x7684;history&#x5BF9;&#x8C61;</h4><p>&#x4ECB;&#x7ECD;&#x4E86; &lt;BrowserRouter&gt; &#x3001; &lt;Route&gt; &#x548C; &lt;Link&gt; &#x4E4B;&#x540E;&#xFF0C;&#x4F7F;&#x7528;&#x8FD9;3&#x4E2A;&#x7EC4;&#x4EF6;API&#x5C31;&#x53EF;&#x4EE5;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;React-router&#x5E94;&#x7528;&#x3002;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E4B;&#x524D;&#x8BF4;&#xFF0C;&#x6BCF;&#x5F53;&#x70B9;&#x51FB;Link&#x6807;&#x7B7E;&#x8DF3;&#x8F6C;&#x6216;&#x8005;&#x5728;js&#x4E2D;&#x4F7F;&#x7528;React-router&#x7684;&#x65B9;&#x6CD5;&#x8DF3;&#x8F6C;&#xFF0C;&#x4ECE;&#x5F53;&#x524D;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x8FDB;&#x5165;&#x65B0;&#x7EC4;&#x4EF6;&#x3002;&#x5728;&#x65B0;&#x7EC4;&#x4EF6;&#x88AB;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x4ECE;&#x65E7;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x53C2;&#x6570;&#x3002;</p><p>&#x6211;&#x4EEC;&#x524D;&#x9762;&#x63D0;&#x5230;&#xFF0C;Route&#x5339;&#x914D;&#x5230;&#x76F8;&#x5E94;&#x7684;&#x6539;&#x53D8;&#x540E;&#x7684;url&#xFF0C;&#x4F1A;&#x6E32;&#x67D3;&#x65B0;&#x7EC4;&#x4EF6;&#xFF0C;&#x8BE5;&#x65B0;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;props&#x4E2D;&#x6709;history&#x3001;location&#x3001;match3&#x4E2A;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#xFF0C;&#x5176;&#x4E2D;hisotry&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x6700;&#x4E3A;&#x5173;&#x952E;&#x3002;</p><p>&#x540C;&#x6837;&#x4EE5;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x8BF4;&#x660E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;Link to={{pathname:&apos;/home&apos;,search:&apos;?sort=name&apos;,hash:&apos;#edit&apos;,state:{a:1}}}&gt;Home&lt;/Link&gt;

&lt;Route exact path=&apos;/home&apos; component={Home}/&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>&lt;Link <span class="hljs-keyword">to</span>={{pathname:<span class="hljs-string">&apos;/home&apos;</span>,search:<span class="hljs-string">&apos;?sort=name&apos;</span>,hash:<span class="hljs-string">&apos;#edit&apos;</span>,state:{a:<span class="hljs-number">1</span>}}}&gt;Home&lt;/Link&gt;

&lt;Route exact path=<span class="hljs-string">&apos;/home&apos;</span> component={Home}/&gt;

</code></pre><p>&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x4E86;&lt;BrowserRouter&gt;&#xFF0C;&#x8BE5;&#x7EC4;&#x4EF6;&#x5229;&#x7528;&#x4E86;window.history&#x5BF9;&#x8C61;&#xFF0C;&#x5F53;&#x70B9;&#x51FB;Link&#x6807;&#x7B7E;&#x8DF3;&#x8F6C;&#x540E;&#xFF0C;&#x4F1A;&#x6E32;&#x67D3;&#x65B0;&#x7684;&#x7EC4;&#x4EF6;Home&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;Home&#x7EC4;&#x4EF6;&#x4E2D;&#x8F93;&#x51FA;props&#x4E2D;&#x7684;history&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// props&#x4E2D;&#x7684;history
action: &quot;PUSH&quot;
block: &#x192; block()
createHref: &#x192; createHref(location)
go: &#x192; go(n)
goBack: &#x192; goBack()
goForward: &#x192; goForward()
length: 12
listen: &#x192; listen(listener)
location: {pathname: &quot;/home&quot;, search: &quot;?sort=name&quot;, hash: &quot;#edit&quot;, state: {&#x2026;}, key: &quot;uxs9r5&quot;}
push: &#x192; push(path, state)
replace: &#x192; replace(path, state)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-comment">// props&#x4E2D;&#x7684;history</span>
<span class="hljs-string">action:</span> <span class="hljs-string">&quot;PUSH&quot;</span>
<span class="hljs-string">block:</span> &#x192; block()
<span class="hljs-string">createHref:</span> &#x192; createHref(location)
<span class="hljs-string">go:</span> &#x192; go(n)
<span class="hljs-string">goBack:</span> &#x192; goBack()
<span class="hljs-string">goForward:</span> &#x192; goForward()
<span class="hljs-string">length:</span> <span class="hljs-number">12</span>
<span class="hljs-string">listen:</span> &#x192; listen(listener)
<span class="hljs-string">location:</span> {<span class="hljs-string">pathname:</span> <span class="hljs-string">&quot;/home&quot;</span>, <span class="hljs-string">search:</span> <span class="hljs-string">&quot;?sort=name&quot;</span>, <span class="hljs-string">hash:</span> <span class="hljs-string">&quot;#edit&quot;</span>, <span class="hljs-string">state:</span> {&#x2026;}, <span class="hljs-string">key:</span> <span class="hljs-string">&quot;uxs9r5&quot;</span>}
<span class="hljs-string">push:</span> &#x192; push(path, state)
<span class="hljs-string">replace:</span> &#x192; replace(path, state)
</code></pre><p>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x5C5E;&#x6027;&#x660E;&#x7EC6;&#x4E2D;&#xFF1A;</p><ul><li>push:f &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5728;js&#x4E2D;&#x6539;&#x53D8;url&#xFF0C;&#x4E4B;&#x524D;&#x5728;Link&#x7EC4;&#x4EF6;&#x4E2D;&#x53EF;&#x4EE5;&#x7C7B;&#x4F3C;&#x4E8E;HTML&#x6807;&#x7B7E;&#x7684;&#x5F62;&#x5F0F;&#x6539;&#x53D8;url&#x3002;push&#x65B9;&#x6CD5;&#x6620;&#x5C04;&#x4E8E;window.history&#x4E2D;&#x7684;pushState&#x65B9;&#x6CD5;&#x3002;</li><li>replace: f &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E5F;&#x662F;&#x7528;&#x4E8E;&#x5728;js&#x4E2D;&#x6539;&#x53D8;url&#xFF0C;replace&#x65B9;&#x6CD5;&#x6620;&#x5C04;&#x4E8E;window.history&#x4E2D;&#x7684;replaceState&#x65B9;&#x6CD5;&#x3002;</li><li>block&#xFF1A;f &#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x4E5F;&#x5F88;&#x6709;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#x5F53;&#x7528;&#x6237;&#x79BB;&#x5F00;&#x5F53;&#x524D;&#x9875;&#x9762;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7ED9;&#x7528;&#x6237;&#x4E00;&#x4E2A;&#x6587;&#x5B57;&#x63D0;&#x793A;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x91C7;&#x7528;history.block(&quot;&#x4F60;&#x786E;&#x5B9A;&#x8981;&#x79BB;&#x5F00;&#x5F53;&#x524D;&#x9875;&#x5417;&#xFF1F;&quot;)&#x8FD9;&#x6837;&#x7684;&#x63D0;&#x793A;&#x3002;</li><li>go / goBack / goForward</li></ul><p>&#x5728;&#x7EC4;&#x4EF6;props&#x4E2D;history&#x7684;go&#x3001;goBack&#x3001;goForward&#x65B9;&#x6CD5;&#xFF0C;&#x5206;&#x522B;window.history.go&#x3001;window.history.back&#x3001;window.history.forward&#x5BF9;&#x5E94;&#x3002;</p><ul><li>action: &quot;PUSH&quot; || &quot;POP&quot;</li></ul><p>action&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x5DE6;&#x53F3;&#x5F88;&#x5927;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x901A;&#x8FC7;Link&#x6807;&#x7B7E;&#x6216;&#x8005;&#x5728;js&#x4E2D;&#x901A;&#x8FC7;this.props.push&#x65B9;&#x6CD5;&#x6765;&#x6539;&#x53D8;&#x5F53;&#x524D;&#x7684;url&#xFF0C;&#x90A3;&#x4E48;&#x5728;&#x65B0;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;action&#x5C31;&#x662F;&quot;PUSH&quot;,&#x5426;&#x5219;&#x5C31;&#x662F;&quot;POP&quot;.</p><p>action&#x5C5E;&#x6027;&#x5F88;&#x6709;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x5728;&#x505A;&#x7FFB;&#x9875;&#x52A8;&#x753B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x524D;&#x8FDB;&#x7684;&#x52A8;&#x753B;&#x662F;SlideIn&#xFF0C;&#x540E;&#x9000;&#x7684;&#x52A8;&#x753B;&#x662F;SlideOut&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;action&#x6765;&#x5224;&#x65AD;&#x91C7;&#x7528;&#x4F55;&#x79CD;&#x52A8;&#x753B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function newComponent (props)=&gt;{
   return (
     &lt;ReactCSSTransitionGroup
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={200}
          transitionName={props.history.action===&apos;PUSH&apos;?&apos;SlideIn&apos;:&apos;SlideOut&apos;}
         &gt;
           &lt;Component {...props}/&gt;
    &lt;/ReactCSSTransitionGroup&gt;
   )
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">newComponent</span> (<span class="hljs-params">props</span>)=&gt;</span>{
   <span class="hljs-keyword">return</span> (
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ReactCSSTransitionGroup</span>
          <span class="hljs-attr">transitionAppear</span>=<span class="hljs-string">{true}</span>
          <span class="hljs-attr">transitionAppearTimeout</span>=<span class="hljs-string">{600}</span>
          <span class="hljs-attr">transitionEnterTimeout</span>=<span class="hljs-string">{600}</span>
          <span class="hljs-attr">transitionLeaveTimeout</span>=<span class="hljs-string">{200}</span>
          <span class="hljs-attr">transitionName</span>=<span class="hljs-string">{props.history.action</span>===<span class="hljs-string">&apos;PUSH&apos;</span>?&apos;<span class="hljs-attr">SlideIn</span>&apos;<span class="hljs-attr">:</span>&apos;<span class="hljs-attr">SlideOut</span>&apos;}
         &gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">Component</span> {<span class="hljs-attr">...props</span>}/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ReactCSSTransitionGroup</span>&gt;</span>
   )
}
</span></code></pre><ul><li>location:object</li></ul><p>&#x5728;&#x65B0;&#x7EC4;&#x4EF6;&#x7684;location&#x5C5E;&#x6027;&#x4E2D;&#xFF0C;&#x5C31;&#x8BB0;&#x5F55;&#x4E86;&#x4ECE;&#x5C31;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x6B64;&#x65F6;&#x7684;location&#x7684;&#x503C;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    hash: &quot;#edit&quot;
    key: &quot;uxs9r5&quot;
    pathname: &quot;/home&quot;
    search: &quot;?sort=name&quot;
    state: {a:1}
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>    <span class="hljs-attribute">hash</span>: <span class="hljs-string">&quot;#edit&quot;</span>
    <span class="hljs-attribute">key</span>: <span class="hljs-string">&quot;uxs9r5&quot;</span>
    <span class="hljs-attribute">pathname</span>: <span class="hljs-string">&quot;/home&quot;</span>
    <span class="hljs-attribute">search</span>: <span class="hljs-string">&quot;?sort=name&quot;</span>
    <span class="hljs-attribute">state</span>: {<span class="hljs-attribute">a</span>:<span class="hljs-number">1</span>}
    </code></pre><p>&#x9664;&#x4E86;key&#x8FD9;&#x4E2A;&#x7528;&#x4F5C;&#x552F;&#x4E00;&#x8868;&#x793A;&#x5916;&#xFF0C;&#x5176;&#x4ED6;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x662F;&#x6211;&#x4EEC;&#x4ECE;&#x4E0A;&#x4E00;&#x4E2A;Link&#x6807;&#x7B7E;&#x4E2D;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x53C2;&#x6570;&#x3002;</p><h2 id="articleHeader8">&#x56DB;&#x3001;React-router4.0&#x6E90;&#x7801;&#x5206;&#x6790;</h2><p>&#x5728;&#x7B2C;&#x4E09;&#x8282;&#x4E2D;&#x6211;&#x4EEC;&#x4ECB;&#x7ECD;&#x4E86;React-router&#x7684;&#x5927;&#x81F4;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF0C;&#x8BFB;&#x4E00;&#x8BFB;React-router4.0&#x7684;&#x6E90;&#x7801;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x5206;&#x6790;&#x4E00;&#x4E0B;React-router4.0&#x4E2D;&#x662F;&#x5982;&#x4F55;&#x6839;&#x636E;window.history&#x6765;&#x5B9E;&#x73B0;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x8BBE;&#x8BA1;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x4E3A;BrowserRouter&#x3001;Router&#x3001;Route&#x548C;Link</p><h3 id="articleHeader9">1&#x3001;React-router&#x4E2D;&#x7684;history</h3><p>&#x4ECE;&#x4E0A;&#x4E00;&#x8282;&#x7684;&#x4ECB;&#x7ECD;&#x4E2D;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#xFF0C;&#x70B9;&#x51FB;Link&#x6807;&#x7B7E;&#x4F20;&#x9012;&#x7ED9;&#x65B0;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x7684;props&#x4E2D;&#x6709;&#x4E00;&#x4E2A;history&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x5185;&#x5BB9;&#x5F88;&#x4E30;&#x5BCC;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;action&#x3001;goBack&#x3001;go&#x3001;location&#x3001;push&#x548C;replace&#x65B9;&#x6CD5;&#x7B49;&#x3002;</p><p>React-router&#x6784;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;History&#x7C7B;&#xFF0C;&#x7528;&#x4E8E;&#x5728;window.history&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x6784;&#x5EFA;&#x5C5E;&#x6027;&#x66F4;&#x4E3A;&#x4E30;&#x5BCC;&#x7684;&#x5B9E;&#x4F8B;&#x3002;&#x8BE5;History&#x7C7B;&#x5B9E;&#x4F8B;&#x5316;&#x540E;&#x5177;&#x6709;action&#x3001;goBack&#x3001;location&#x7B49;&#x7B49;&#x65B9;&#x6CD5;&#x3002;</p><p>React-router&#x4E2D;&#x5C06;&#x8FD9;&#x4E2A;&#x65B0;&#x7684;History&#x7C7B;&#x7684;&#x6784;&#x5EFA;&#x65B9;&#x6CD5;&#xFF0C;&#x72EC;&#x7ACB;&#x6210;&#x4E00;&#x4E2A;node&#x5305;&#xFF0C;&#x5305;&#x540D;&#x4E3A;history&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install history -s 
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code>npm install <span class="hljs-built_in">history</span> <span class="hljs-_">-s</span> 
</code></pre><p>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E0A;&#x8FF0;&#x65B9;&#x6CD5;&#x6765;&#x5F15;&#x5165;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x4E2A;History&#x7C7B;&#x7684;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createBrowserHistory = (props = {}) =&gt; {
    const globalHistory = window.history;
    ......
    //&#x9ED8;&#x8BA4;props&#x4E2D;&#x5C5E;&#x6027;&#x7684;&#x503C;
    const {
      forceRefresh = false,
      getUserConfirmation = getConfirmation,
      keyLength = 6,
      basename = &apos;&apos;,
    } = props;
    const history = {
        length: globalHistory.length,
        action: &quot;POP&quot;,
        location: initialLocation,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        block,
        listen
    };                                         ---- (1)
    const basename = props.basename;   
    const canUseHistory = supportsHistory();   ----&#xFF08;2)
            
    const createKey = () =&gt;Math.random().toString(36).substr(2, keyLength);    ----&#xFF08;3&#xFF09;
    
    const transitionManager = createTransitionManager();  ----&#xFF08;4&#xFF09;
    const setState = nextState =&gt; {
        Object.assign(history, nextState);
    
        history.length = globalHistory.length;
    
        transitionManager.notifyListeners(history.location, history.action);
    };                                      ----&#xFF08;5&#xFF09;
    
    const handlePopState = event =&gt; {
        handlePop(getDOMLocation(event.state));
    };
    const handlePop = location =&gt; {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      const action = &quot;POP&quot;;
      
      transitionManager.confirmTransitionTo(
            location,
            action,
            getUserConfirmation,
            ok =&gt; {
              if (ok) {
                setState({ action, location });
              } else {
                revertPop(location);
              }
            }
          );
        }
    };                                    ------&#xFF08;6&#xFF09;
    const initialLocation = getDOMLocation(getHistoryState());
    let allKeys = [initialLocation.key]; ------&#xFF08;7&#xFF09;
    
  
    // &#x4E0E;pop&#x76F8;&#x5BF9;&#x5E94;&#xFF0C;&#x7C7B;&#x4F3C;&#x7684;push&#x548C;replace&#x65B9;&#x6CD5;
    const push ... replace ...            ------(8)
    
    return history                        ------ &#xFF08;9&#xFF09;
    
}


" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> createBrowserHistory = <span class="hljs-function">(<span class="hljs-params">props = {}</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> globalHistory = <span class="hljs-built_in">window</span>.history;
    ......
    <span class="hljs-comment">//&#x9ED8;&#x8BA4;props&#x4E2D;&#x5C5E;&#x6027;&#x7684;&#x503C;</span>
    <span class="hljs-keyword">const</span> {
      forceRefresh = <span class="hljs-literal">false</span>,
      getUserConfirmation = getConfirmation,
      keyLength = <span class="hljs-number">6</span>,
      basename = <span class="hljs-string">&apos;&apos;</span>,
    } = props;
    <span class="hljs-keyword">const</span> history = {
        length: globalHistory.length,
        action: <span class="hljs-string">&quot;POP&quot;</span>,
        location: initialLocation,
        createHref,
        push,
        replace,
        go,
        goBack,
        goForward,
        block,
        listen
    };                                         ---- (<span class="hljs-number">1</span>)
    <span class="hljs-keyword">const</span> basename = props.basename;   
    <span class="hljs-keyword">const</span> canUseHistory = supportsHistory();   ----&#xFF08;<span class="hljs-number">2</span>)
            
    <span class="hljs-keyword">const</span> createKey = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span><span class="hljs-built_in">Math</span>.random().toString(<span class="hljs-number">36</span>).substr(<span class="hljs-number">2</span>, keyLength);    ----&#xFF08;<span class="hljs-number">3</span>&#xFF09;
    
    <span class="hljs-keyword">const</span> transitionManager = createTransitionManager();  ----&#xFF08;<span class="hljs-number">4</span>&#xFF09;
    <span class="hljs-keyword">const</span> setState = <span class="hljs-function"><span class="hljs-params">nextState</span> =&gt;</span> {
        <span class="hljs-built_in">Object</span>.assign(history, nextState);
    
        history.length = globalHistory.length;
    
        transitionManager.notifyListeners(history.location, history.action);
    };                                      ----&#xFF08;<span class="hljs-number">5</span>&#xFF09;
    
    <span class="hljs-keyword">const</span> handlePopState = <span class="hljs-function"><span class="hljs-params">event</span> =&gt;</span> {
        handlePop(getDOMLocation(event.state));
    };
    <span class="hljs-keyword">const</span> handlePop = <span class="hljs-function"><span class="hljs-params">location</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (forceNextPop) {
      forceNextPop = <span class="hljs-literal">false</span>;
      setState();
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">const</span> action = <span class="hljs-string">&quot;POP&quot;</span>;
      
      transitionManager.confirmTransitionTo(
            location,
            action,
            getUserConfirmation,
            <span class="hljs-function"><span class="hljs-params">ok</span> =&gt;</span> {
              <span class="hljs-keyword">if</span> (ok) {
                setState({ action, location });
              } <span class="hljs-keyword">else</span> {
                revertPop(location);
              }
            }
          );
        }
    };                                    ------&#xFF08;<span class="hljs-number">6</span>&#xFF09;
    <span class="hljs-keyword">const</span> initialLocation = getDOMLocation(getHistoryState());
    <span class="hljs-keyword">let</span> allKeys = [initialLocation.key]; ------&#xFF08;<span class="hljs-number">7</span>&#xFF09;
    
  
    <span class="hljs-comment">// &#x4E0E;pop&#x76F8;&#x5BF9;&#x5E94;&#xFF0C;&#x7C7B;&#x4F3C;&#x7684;push&#x548C;replace&#x65B9;&#x6CD5;</span>
    <span class="hljs-keyword">const</span> push ... replace ...            ------(<span class="hljs-number">8</span>)
    
    <span class="hljs-keyword">return</span> history                        ------ &#xFF08;<span class="hljs-number">9</span>&#xFF09;
    
}


</code></pre><ul><li>(1) &#x4E2D;&#x6307;&#x660E;&#x4E86;&#x65B0;&#x7684;&#x6784;&#x5EFA;&#x65B9;&#x6CD5;History&#x6240;&#x8FD4;&#x56DE;&#x7684;history&#x5BF9;&#x8C61;&#x4E2D;&#x6240;&#x5177;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x3002;</li><li>(2)&#x4E2D;&#x7684;supportsHistory&#x7684;&#x65B9;&#x6CD5;&#x5224;&#x65AD;&#x5F53;&#x524D;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x5BF9;&#x4E8E;window.history&#x7684;&#x517C;&#x5BB9;&#x6027;&#xFF0C;&#x5177;&#x4F53;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    export const supportsHistory = () =&gt; {
      const ua = window.navigator.userAgent;
    
      if (
        (ua.indexOf(&quot;Android 2.&quot;) !== -1 || ua.indexOf(&quot;Android 4.0&quot;) !== -1) &amp;&amp;
        ua.indexOf(&quot;Mobile Safari&quot;) !== -1 &amp;&amp;
        ua.indexOf(&quot;Chrome&quot;) === -1 &amp;&amp;
        ua.indexOf(&quot;Windows Phone&quot;) === -1
      )
        return false;
    
      return window.history &amp;&amp; &quot;pushState&quot; in window.history;
    };
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>    <span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> supportsHistory = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> ua = <span class="hljs-built_in">window</span>.navigator.userAgent;
    
      <span class="hljs-keyword">if</span> (
        (ua.indexOf(<span class="hljs-string">&quot;Android 2.&quot;</span>) !== <span class="hljs-number">-1</span> || ua.indexOf(<span class="hljs-string">&quot;Android 4.0&quot;</span>) !== <span class="hljs-number">-1</span>) &amp;&amp;
        ua.indexOf(<span class="hljs-string">&quot;Mobile Safari&quot;</span>) !== <span class="hljs-number">-1</span> &amp;&amp;
        ua.indexOf(<span class="hljs-string">&quot;Chrome&quot;</span>) === <span class="hljs-number">-1</span> &amp;&amp;
        ua.indexOf(<span class="hljs-string">&quot;Windows Phone&quot;</span>) === <span class="hljs-number">-1</span>
      )
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">window</span>.history &amp;&amp; <span class="hljs-string">&quot;pushState&quot;</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>.history;
    };
</code></pre><p>&#x4ECE;&#x4E0A;&#x8FF0;&#x5224;&#x522B;&#x5F0F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;window.history&#x5728;chrome&#x3001;mobile safari&#x548C;windows phone&#x4E0B;&#x662F;&#x7EDD;&#x5BF9;&#x652F;&#x6301;&#x7684;&#xFF0C;&#x4F46;&#x4E0D;&#x652F;&#x6301;&#x5B89;&#x5353;2.x&#x4EE5;&#x53CA;&#x5B89;&#x5353;4.0</p><ul><li>(3)&#x4E2D;&#x7528;&#x4E8E;&#x521B;&#x5EFA;&#x4E0E;history&#x4E2D;&#x6BCF;&#x4E00;&#x4E2A;url&#x8BB0;&#x5F55;&#x76F8;&#x5173;&#x8054;&#x7684;&#x6307;&#x5B9A;&#x4F4D;&#x6570;&#x7684;&#x552F;&#x4E00;&#x6807;&#x8BC6;key, &#x9ED8;&#x8BA4;&#x7684;keyLength&#x4E3A;6&#x4F4D;</li><li><p>(4)&#x4E2D; createTransitionManager&#x65B9;&#x6CD5;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x96C6;&#x6210;&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x8C61;&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x5173;&#x4E8E;history&#x5730;&#x5740;&#x6216;&#x8005;&#x5BF9;&#x8C61;&#x6539;&#x53D8;&#x65F6;&#x5019;&#x7684;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x7B49;&#xFF0C;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     const createTransitionManager = () =&gt; {
         const setPrompt = nextPrompt =&gt; {
           
         };
   
         const confirmTransitionTo = (
           location,
           action,
           getUserConfirmation,
           callback
         ) =&gt; {
            if (typeof getUserConfirmation === &quot;function&quot;) {
                 getUserConfirmation(result, callback);
               } else {
                 callback(true);
               }
             } 
         };
         
         
         let listeners = [];
         const appendListener = fn =&gt; {
           let isActive = true;
       
           const listener = (...args) =&gt; {
             if (isActive) fn(...args);
           };
       
           listeners.push(listener);
       
           return () =&gt; {
             isActive = false;
             listeners = listeners.filter(item =&gt; item !== listener);
           };
         };
       
         const notifyListeners = (...args) =&gt; {
           listeners.forEach(listener =&gt; listener(...args));
         };
       
         return {
           setPrompt,
           confirmTransitionTo,
           appendListener,
           notifyListeners
         };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>     <span class="hljs-keyword">const</span> createTransitionManager = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
         <span class="hljs-keyword">const</span> setPrompt = <span class="hljs-function"><span class="hljs-params">nextPrompt</span> =&gt;</span> {
           
         };
   
         <span class="hljs-keyword">const</span> confirmTransitionTo = (
           location,
           action,
           getUserConfirmation,
           callback
         ) =&gt; {
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> getUserConfirmation === <span class="hljs-string">&quot;function&quot;</span>) {
                 getUserConfirmation(result, callback);
               } <span class="hljs-keyword">else</span> {
                 callback(<span class="hljs-literal">true</span>);
               }
             } 
         };
         
         
         <span class="hljs-keyword">let</span> listeners = [];
         <span class="hljs-keyword">const</span> appendListener = <span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> {
           <span class="hljs-keyword">let</span> isActive = <span class="hljs-literal">true</span>;
       
           <span class="hljs-keyword">const</span> listener = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
             <span class="hljs-keyword">if</span> (isActive) fn(...args);
           };
       
           listeners.push(listener);
       
           <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
             isActive = <span class="hljs-literal">false</span>;
             listeners = listeners.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item !== listener);
           };
         };
       
         <span class="hljs-keyword">const</span> notifyListeners = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
           listeners.forEach(<span class="hljs-function"><span class="hljs-params">listener</span> =&gt;</span> listener(...args));
         };
       
         <span class="hljs-keyword">return</span> {
           setPrompt,
           confirmTransitionTo,
           appendListener,
           notifyListeners
         };</code></pre></li></ul><p>};</p><p>setPrompt&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;url&#x8DF3;&#x8F6C;&#x65F6;&#x5F39;&#x51FA;&#x7684;&#x6587;&#x5B57;&#x63D0;&#x793A;&#xFF0C;confirmTransaction&#x51FD;&#x6570;&#xFF0C;&#x4F1A;&#x5C06;&#x5F53;&#x524D;&#x751F;&#x6210;&#x65B0;&#x7684;history&#x5BF9;&#x8C61;&#x4E2D;&#x7684;location&#xFF0C;action&#xFF0C;callback&#x7B49;&#x53C2;&#x6570;&#xFF0C;&#x4F5C;&#x7528;&#x5C31;&#x662F;&#x5728;&#x56DE;&#x8C03;&#x7684;callback&#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x6839;&#x636E;&#x8981;&#x6C42;&#xFF0C;&#x6539;&#x53D8;&#x4F20;&#x5165;&#x7684;location&#x548C;action&#x5BF9;&#x8C61;&#x3002;</p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x6709;&#x4E00;&#x4E2A;listeners&#x6570;&#x7EC4;&#xFF0C;&#x4FDD;&#x5B58;&#x4E86;&#x4E00;&#x7CFB;&#x5217;&#x4E0E;url&#x76F8;&#x5173;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x6570;&#x7EC4;&#xFF0C;&#x901A;&#x8FC7;&#x63A5;&#x4E0B;&#x6765;&#x7684;appendListener&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5F80;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x589E;&#x52A0;&#x4E8B;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7;notifyListeners&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x904D;&#x5386;&#x6267;&#x884C;listeners&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x3002;</p><ul><li>(5) setState&#x65B9;&#x6CD5;&#xFF0C;&#x53D1;&#x751F;&#x5728;history&#x7684;url&#x6216;&#x8005;history&#x7684;action&#x53D1;&#x751F;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6B64;&#x65B9;&#x6CD5;&#x4F1A;&#x66F4;&#x65B0;history&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x540C;&#x65F6;&#x4F1A;&#x89E6;&#x53D1;notifyListeners&#x65B9;&#x6CD5;&#xFF0C;&#x4F20;&#x5165;&#x5F53;&#x524D;&#x7684;history.location&#x548C;history.action&#x3002;&#x904D;&#x5386;&#x5E76;&#x6267;&#x884C;&#x6240;&#x6709;&#x76D1;&#x542C;url&#x6539;&#x53D8;&#x7684;&#x4E8B;&#x4EF6;&#x6570;&#x7EC4;listeners&#x3002;</li><li>(6)&#x8FD9;&#x4E2A;getDOMLocation&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x6839;&#x636E;&#x5F53;&#x524D;&#x5728;window.state&#x4E2D;&#x7684;&#x503C;&#xFF0C;&#x751F;&#x6210;&#x65B0;history&#x7684;location&#x5C5E;&#x6027;&#x5BF9;&#x8C61;&#xFF0C;allKeys&#x8FD9;&#x662F;&#x59CB;&#x7EC8;&#x4FDD;&#x6301;&#x4E86;&#x5728;url&#x6539;&#x53D8;&#x65F6;&#x5019;&#x7684;&#x5386;&#x53F2;url&#x76F8;&#x5173;&#x8054;&#x7684;key&#xFF0C;&#x4FDD;&#x5B58;&#x5728;&#x5168;&#x5C40;&#xFF0C;allKeys&#x5728;&#x6267;&#x884C;&#x751F;&#x201C;POP&#x201D;&#x6216;&#x8005;&#x201C;PUSH&#x201D;&#x3001;&#x201C;Repalce&#x201D;&#x7B49;&#x4F1A;&#x6539;&#x53D8;url&#x7684;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x4F1A;&#x4FDD;&#x6301;&#x4E00;&#x4E2A;&#x5B9E;&#x65F6;&#x7684;&#x66F4;&#x65B0;&#x3002;</li><li>(7) handlePop&#x65B9;&#x6CD5;&#xFF0C;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x201C;POP&#x201D;&#x4E8B;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x5728;window.history&#x4E2D;&#x70B9;&#x51FB;&#x540E;&#x9000;&#x7B49;&#x4F1A;&#x89E6;&#x53D1;&#x201C;POP&#x201D;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FD9;&#x91CC;&#x4E5F;&#x662F;&#x4E00;&#x6837;&#xFF0C;&#x6267;&#x884C;action&#x4E3A;&#x201C;POP&#x201D;&#xFF0C;&#x5F53;&#x540E;&#x9000;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;&#x8BE5;&#x51FD;&#x6570;&#x3002;</li><li>(8)&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x4E0E;pop&#x65B9;&#x6CD5;&#x7C7B;&#x4F3C;&#x7684;&#xFF0C;push&#x548C;replace&#x65B9;&#x6CD5;&#xFF0C;push&#x65B9;&#x6CD5;&#x540C;&#x6837;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5C31;&#x662F;&#x6267;&#x884C;action&#x4E3A;&#x201C;PUSH&#x201D;&#xFF08;&#x201C;REPLACE&#x201D;&#xFF09;&#xFF0C;&#x8BE5;&#x53D8;allKeys&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x503C;&#xFF0C;&#x552F;&#x4E00;&#x4E0D;&#x540C;&#x7684;&#x662F;actio&#x4E3A;&#x201C;PUSH&#x201D;&#x7684;&#x65B9;&#x6CD5;push&#x662F;&#x5F80;allKeys&#x6570;&#x7EC4;&#x4E2D;&#x6DFB;&#x52A0;&#xFF0C;&#x800C;action&#x4E3A;&#x201C;REPLACE&#x201D;&#x7684;&#x65B9;&#x6CD5;replace&#x5219;&#x662F;&#x66FF;&#x6362;&#x6389;&#x5F53;&#x524D;&#x7684;&#x5143;&#x7D20;&#x3002;</li><li>(9)&#x8FD4;&#x56DE;&#x8FD9;&#x4E2A;&#x65B0;&#x751F;&#x6210;&#x7684;history&#x5BF9;&#x8C61;&#x3002;</li></ul><h3 id="articleHeader10">2&#x3001;React-router&#x4E2D;Link&#x7EC4;&#x4EF6;</h3><p>&#x5176;&#x5B9E;&#x6700;&#x96BE;&#x5F04;&#x61C2;&#x7684;&#x662F;React-router&#x4E2D;&#x5982;&#x4F55;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;history&#x5DE5;&#x5382;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x7B2C;&#x4E00;&#x5C0F;&#x8282;&#x4E2D;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x8BE6;&#x7EC6;&#x7684;&#x4ECB;&#x7ECD;&#x4E86;history&#x751F;&#x6210;&#x51FD;&#x6570;createBrowserHistory&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x63A5;&#x7740;&#x6765;&#x770B;Link&#x7EC4;&#x4EF6;&#x5C31;&#x5F88;&#x5BB9;&#x6613;&#x4E86;&#x3002;</p><p>&#x9996;&#x5148;Link&#x7EC4;&#x4EF6;&#x7C7B;&#x4F3C;&#x4E8E;HTML&#x4E2D;&#x7684;a&#x6807;&#x7B7E;&#xFF0C;&#x76EE;&#x7684;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x53BB;&#x4E3B;&#x52A8;&#x89E6;&#x53D1;&#x6539;&#x53D8;url&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E3B;&#x52A8;&#x6539;&#x53D8;url&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4ECE;&#x4E0A;&#x8FF0;&#x7684;history&#x7684;&#x4ECB;&#x7ECD;&#x4E2D;&#x53EF;&#x77E5;&#x4E3A;push&#x548C;replace&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x6B64;Link&#x7EC4;&#x4EF6;&#x7684;&#x6E90;&#x7801;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Link extends React.Component {

    
   handleClick = event =&gt; {
   ...

     const { history } = this.context.router;
     const { replace, to } = this.props;
     if (replace) {
       history.replace(replace);
     } else {
      history.push(to);
     }
   }
  };
  render(){
    const { replace, to, innerRef, ...props } = this.props;
     &lt;a {...props} onClick={this.handleClick}/&gt;
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Link</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{

    
   handleClick = event =&gt; {
   ...

     const { history } = <span class="hljs-keyword">this</span>.context.router;
     const { replace, to } = <span class="hljs-keyword">this</span>.props;
     <span class="hljs-keyword">if</span> (replace) {
       history.replace(replace);
     } <span class="hljs-keyword">else</span> {
      history.push(to);
     }
   }
  };
  render(){
    const { replace, to, innerRef, ...props } = <span class="hljs-keyword">this</span>.props;
     &lt;a {...props} onClick={<span class="hljs-keyword">this</span>.handleClick}/&gt;
  }
}
</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4ECE;React&#x7684;context API&#x5168;&#x5C40;&#x5BF9;&#x8C61;&#x4E2D;&#x62FF;&#x5230;history&#xFF0C;&#x7136;&#x540E;&#x5982;&#x679C;&#x4F20;&#x9012;&#x7ED9;Link&#x7EC4;&#x4EF6;&#x7684;&#x5C5E;&#x6027;&#x4E2D;&#x6709;replace&#x4E3A;true&#xFF0C;&#x5219;&#x6267;&#x884C;history.replace(to),to &#x662F;&#x4E00;&#x4E2A;&#x5305;&#x542B;pathname&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x9012;&#x7ED9;Link&#x7EC4;&#x4EF6;&#x7684;replace&#x5C5E;&#x6027;&#x4E3A;false&#xFF0C;&#x5219;&#x6267;&#x884C;history.push(to)&#x65B9;&#x6CD5;&#x3002;</p><h3 id="articleHeader11">3&#x3001;React-router&#x4E2D;Route&#x7EC4;&#x4EF6;</h3><p>Route&#x7EC4;&#x4EF6;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5176;props&#x4E2D;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x6700;&#x4E3B;&#x8981;&#x7684;&#x5C5E;&#x6027;path&#xFF0C;Route&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x53EA;&#x6709;&#x4E00;&#x4EF6;&#xFF1A;</p><p><strong><em>&#x5F53;url&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;path&#x5C5E;&#x6027;&#x4E0E;&#x6539;&#x53D8;&#x540E;&#x7684;url&#x505A;&#x5BF9;&#x6BD4;&#xFF0C;&#x5982;&#x679C;&#x5339;&#x914D;&#x6210;&#x529F;&#xFF0C;&#x5219;&#x6E32;&#x67D3;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;componet&#x6216;&#x8005;children&#x5C5E;&#x6027;&#x6240;&#x8D4B;&#x503C;&#x7684;&#x90A3;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;</em></strong></p><p>&#x5177;&#x4F53;&#x6E90;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Route extends React.Component {


  ....
  constructor(){
  
  
  }
  render() {
    const { match } = this.state;
    const { children, component, render } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const props = { match, location, history, staticContext };

    if (component) return match ? React.createElement(component, props) : null;

    if (render) return match ? render(props) : null;

    if (typeof children === &quot;function&quot;) return children(props);

    if (children &amp;&amp; !isEmptyChildren(children))
      return React.Children.only(children);

    return null;
  }

}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Route</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{


  ....
  constructor(){
  
  
  }
  render() {
    const { <span class="hljs-keyword">match</span> } = <span class="hljs-keyword">this</span>.state;
    const { children, component, render } = <span class="hljs-keyword">this</span>.props;
    const { history, route, staticContext } = <span class="hljs-keyword">this</span>.context.router;
    const location = <span class="hljs-keyword">this</span>.props.location || route.location;
    const props = { <span class="hljs-keyword">match</span>, location, history, staticContext };

    <span class="hljs-keyword">if</span> (component) <span class="hljs-keyword">return</span> <span class="hljs-keyword">match</span> ? <span class="hljs-type">React</span>.createElement(component, props) : <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">if</span> (render) <span class="hljs-keyword">return</span> <span class="hljs-keyword">match</span> ? render(props) : <span class="hljs-literal">null</span>;

    <span class="hljs-keyword">if</span> (typeof children === <span class="hljs-string">&quot;function&quot;</span>) <span class="hljs-keyword">return</span> children(props);

    <span class="hljs-keyword">if</span> (children &amp;&amp; !isEmptyChildren(children))
      <span class="hljs-keyword">return</span> <span class="hljs-type">React</span>.<span class="hljs-type">Children</span>.only(children);

    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

}
</code></pre><p>state&#x4E2D;&#x7684;match&#x5C31;&#x662F;&#x662F;&#x5426;&#x5339;&#x914D;&#x7684;&#x6807;&#x8BB0;&#xFF0C;&#x5982;&#x679C;&#x5339;&#x914D;&#x5F53;&#x524D;&#x7684;Route&#x7684;path&#xFF0C;&#x90A3;&#x4E48;&#x6839;&#x636E;&#x4F18;&#x5148;&#x7EA7;&#x987A;&#x5E8F;component&#x5C5E;&#x6027;&#x3001;render&#x5C5E;&#x6027;&#x548C;children&#x5C5E;&#x6027;&#x6765;&#x6E32;&#x67D3;&#x5176;&#x6240;&#x6307;&#x5411;&#x7684;React&#x7EC4;&#x4EF6;&#x3002;</p><h3 id="articleHeader12">4&#x3001;React-router&#x4E2D;Router&#x7EC4;&#x4EF6;</h3><p>Router&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x662F;BrowserRouter&#x3001;HashRouter&#x7B49;&#x7EC4;&#x4EF6;&#x7684;&#x5E95;&#x5C42;&#x7EC4;&#x4EF6;&#x3002;&#x8BE5;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;&#x5305;&#x542B;&#x5339;&#x914D;&#x89C4;&#x5219;match&#x51FD;&#x6570;&#xFF0C;&#x4EE5;&#x53CA;&#x4F7F;&#x7528;&#x4E86;&#x65B0;history&#x4E2D;&#x7684;listener&#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x76D1;&#x542C;url&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x4ECE;&#x800C;&#xFF0C;&#x5F53;url&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x66F4;&#x6539;Router&#x4E0B;&#x4E0D;&#x540C;path&#x7EC4;&#x4EF6;&#x7684;isMatch&#x7ED3;&#x679C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Router extends React.Component {
    componentWillMount() {
        const { children, history } = this.props
        
        //&#x8C03;&#x7528;history.listen&#x76D1;&#x542C;&#x65B9;&#x6CD5;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x79FB;&#x9664;&#x76D1;&#x542C;&#x7684;&#x51FD;&#x6570;
        
        this.unlisten = history.listen(() =&gt; {
          this.setState({
            match: this.computeMatch(history.location.pathname)
          });
        });
    }
    componentWillUnmount() {
      this.unlisten();
    }
    render() {
    
    }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Router</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    componentWillMount() {
        const { children, history } = <span class="hljs-keyword">this</span>.props
        
        <span class="hljs-comment">//&#x8C03;&#x7528;history.listen&#x76D1;&#x542C;&#x65B9;&#x6CD5;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x51FD;&#x6570;&#x662F;&#x4E00;&#x4E2A;&#x79FB;&#x9664;&#x76D1;&#x542C;&#x7684;&#x51FD;&#x6570;</span>
        
        <span class="hljs-keyword">this</span>.unlisten = history.listen(() =&gt; {
          <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-keyword">match</span>: <span class="hljs-keyword">this</span>.computeMatch(history.location.pathname)
          });
        });
    }
    componentWillUnmount() {
      <span class="hljs-keyword">this</span>.unlisten();
    }
    render() {
    
    }
}
</code></pre><p>&#x4E0A;&#x8FF0;&#x9996;&#x5148;&#x5728;&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;&#x524D;&#x8C03;&#x7528;&#x4E86;listener&#x76D1;&#x542C;&#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x76D1;&#x542C;url&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x5B9E;&#x65F6;&#x7684;&#x66F4;&#x65B0;isMatch&#x7684;&#x7ED3;&#x679C;&#x3002;</p><h3 id="articleHeader13">5&#x3001;&#x603B;&#x7ED3;</h3><p>&#x672C;&#x6587;&#x4ECE;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x7684;&#x539F;&#x7406;&#x51FA;&#x53D1;&#xFF0C;&#x5148;&#x540E;&#x4ECB;&#x7ECD;&#x4E86;&#x4E24;&#x79CD;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x5E38;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x63A5;&#x7740;&#x4ECB;&#x7ECD;&#x4E86;React-router&#x7684;&#x57FA;&#x672C;&#x7EC4;&#x4EF6;API&#x4EE5;&#x53CA;&#x7528;&#x6CD5;&#xFF0C;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x4E86;React-router&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x65B0;&#x6784;&#x5EFA;&#x7684;history&#x5BF9;&#x8C61;&#xFF0C;&#x6700;&#x540E;&#x7ED3;&#x5408;React-router&#x7684;API&#x9605;&#x8BFB;&#x4E86;&#x4E00;&#x4E0B;React-router&#x7684;&#x6E90;&#x7801;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从路由原理出发，深入阅读理解react-router 4.0的源码

## 原文链接
[https://segmentfault.com/a/1190000016435538](https://segmentfault.com/a/1190000016435538)


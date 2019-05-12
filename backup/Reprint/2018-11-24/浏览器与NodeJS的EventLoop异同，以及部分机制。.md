---
title: '浏览器与NodeJS的EventLoop异同，以及部分机制。' 
date: 2018-11-24 2:30:10
hidden: true
slug: 0r82peyqxekc
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0"><strong>&#x6D4F;&#x89C8;&#x5668;&#x4E0E;NodeJS&#x7684;EventLoop&#x5F02;&#x540C;&#xFF0C;&#x4EE5;&#x53CA;&#x90E8;&#x5206;&#x673A;&#x5236;</strong></h2><hr><p>PS&#xFF1A;&#x6709;&#x4EBA;&#x5BF9;promise&#x90E8;&#x5206;&#x8FF7;&#x60D1;&#xFF0C;Promise&#x672C;&#x8EAB;&#x6784;&#x9020;&#x51FD;&#x6570;&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF0C;<strong>.then</strong>&#x662F;&#x5F02;&#x6B65;&#x3002;---- 2018/7/6 22&#xFF1A;35&#x4FEE;&#x6539;</p><hr><p>javascript &#x662F;&#x4E00;&#x95E8;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#x811A;&#x672C;&#x8BED;&#x8A00;&#xFF0C;&#x867D;&#x7136;&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x4F46;&#x662F;&#x6709;&#x5F88;&#x591A;&#x5F02;&#x6B65;&#x7684;API&#x6765;&#x5E2E;&#x52A9;&#x5F00;&#x53D1;&#x8005;&#x89E3;&#x51B3;&#x7EBF;&#x7A0B;&#x7684;&#x963B;&#x585E;&#x95EE;&#x9898;&#x3002;&#x6BD4;&#x5982;&#xFF1A;onClick &#x6CE8;&#x518C;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3001;&#x5FC5;&#x4E0D;&#x53EF;&#x5C11;&#x7684;ajax&#x7B49;&#x7B49;...&#x4F46;&#x662F; javascript &#x8FD0;&#x884C;&#x73AF;&#x5883;&#x662F;&#x5982;&#x4F55;&#x505A;&#x5230;&#x5355;&#x7EBF;&#x7A0B;&#x5374;&#x53C8;&#x4E0D;&#x662F;&#x4E00;&#x76F4;&#x963B;&#x585E;&#x7EBF;&#x7A0B;&#x7B49;&#x5F85;&#x5404;&#x79CD;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#x624D;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x64CD;&#x4F5C;&#x7684;&#x5462;&#xFF1F;<br>&#x7B54;&#x6848;&#x5C31;&#x662F;&#xFF1A; <strong>event loop</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.event loop &#x7684;&#x89C4;&#x8303;&#x662F;&#x5728;HTML5&#x4E2D;&#x89C4;&#x5B9A;&#x7684;&#x3002;
2.event loop &#x662F; javascript &#x8FD0;&#x884C;&#x73AF;&#x5883;(&#x624B;&#x52A8;&#x52A0;&#x7C97;) &#x7684;&#x673A;&#x5236;&#x3002;
3.&#x6D4F;&#x89C8;&#x5668;&#x5B9E;&#x73B0;&#x7684;event loop &#x4E0E; NodeJS &#x5B9E;&#x73B0;&#x7684;event loop &#x662F;&#x6709;&#x5F02;&#x540C;&#x7684;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vbnet"><code><span class="hljs-number">1.</span><span class="hljs-keyword">event</span> <span class="hljs-keyword">loop</span> &#x7684;&#x89C4;&#x8303;&#x662F;&#x5728;HTML5&#x4E2D;&#x89C4;&#x5B9A;&#x7684;&#x3002;
<span class="hljs-number">2.</span><span class="hljs-keyword">event</span> <span class="hljs-keyword">loop</span> &#x662F; javascript &#x8FD0;&#x884C;&#x73AF;&#x5883;(&#x624B;&#x52A8;&#x52A0;&#x7C97;) &#x7684;&#x673A;&#x5236;&#x3002;
<span class="hljs-number">3.</span>&#x6D4F;&#x89C8;&#x5668;&#x5B9E;&#x73B0;&#x7684;<span class="hljs-keyword">event</span> <span class="hljs-keyword">loop</span> &#x4E0E; NodeJS &#x5B9E;&#x73B0;&#x7684;<span class="hljs-keyword">event</span> <span class="hljs-keyword">loop</span> &#x662F;&#x6709;&#x5F02;&#x540C;&#x7684;&#x3002;
</code></pre><blockquote>HTML5 &#x4E2D;&#x5B9A;&#x4E49; event loop &#x89C4;&#x8303;&#x94FE;&#x63A5; <a href="https://www.w3.org/TR/html5/webappapis.html#event-loops" rel="nofollow noreferrer" target="_blank">https://www.w3.org/TR/html5/w...</a></blockquote><hr><hr><p><strong>&#x4E00; &#x6D4F;&#x89C8;&#x5668;&#x7684;event loop</strong></p><p><strong>1.&#x7B80;&#x5355;&#x4E86;&#x89E3;</strong></p><p>event loop &#x5373;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#xFF0C;&#x5B83;&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;&#x7ED3;&#x6784;&#x5462;&#xFF1F; &#x962E;&#x4E00;&#x5CF0;&#x8001;&#x5E08;&#x7684;&#x535A;&#x5BA2;&#x6709;&#x4E00;&#x5F20;&#x56FE;&#xFF0C;&#x867D;&#x7136;&#x5F88;&#x76F4;&#x767D;&#x3001;&#x660E;&#x4E86;&#x4F46;&#x662F;&#x5C11;&#x4E86;&#x4E00;&#x4E9B;&#x4E1C;&#x897F;&#x4E0D;&#x80FD;&#x5168;&#x9762;&#x7684;&#x5C06; event loop &#x6574;&#x4F53;&#x5FAA;&#x73AF;&#x673A;&#x5236;&#x5C55;&#x793A;&#x51FA;&#x6765;&#x3002;&#x5148;&#x6765;&#x770B;&#x56FE;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVpGls" src="https://static.alili.tech/img/bVpGls" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><strong><em>&#x56FE;&#x7247;&#x975E;&#x7B14;&#x8005;&#x539F;&#x521B;&#xFF0C;&#x6765;&#x81EA;&#x962E;&#x4E00;&#x5CF0;&#x535A;&#x5BA2;&#xFF0C;&#x5728;&#x6B64;&#x8BF4;&#x660E;&#xFF0C;&#x4FB5;&#x5220;&#x3002;</em></strong></p><p>&#x4ECE;&#x56FE;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F97;&#x5230;&#x4FE1;&#x606F;&#x662F;&#xFF1A;</p><blockquote>1.javascript &#x5F15;&#x64CE;&#x6267;&#x884C; javascript &#x662F;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x53EA;&#x6709;&#x4E00;&#x4E2A; stack &#x91CC;&#x9762;&#x6709;&#x5404;&#x79CD;&#x6B63;&#x5728;&#x6267;&#x884C;&#x3001;&#x7B49;&#x5F85;&#x6267;&#x884C;&#x7684;&#x4E8B;&#x4EF6;&#x3002;<br>2.&#x6709;&#x4E00;&#x4E9B; webAPI &#x5C06;&#x6267;&#x884C;&#x65F6;&#x4EA7;&#x751F;&#x7684; callback &#x653E;&#x5165;&#x4E00;&#x4E2A;&#x961F;&#x5217;&#xFF0C;&#x5373; &#x201C;&#x4E8B;&#x4EF6;&#x961F;&#x5217;&#x201D;&#x3002;<br>3.&#x5728;event loop &#x5FAA;&#x73AF;&#x4E2D;&#x4E0D;&#x505C;&#x7684;&#x5C06;&#x201C;&#x4E8B;&#x4EF6;&#x961F;&#x5217;&#x201D;&#x91CC;&#x7B49;&#x5F85;&#x6267;&#x884C;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x63A8;&#x5165; javascript &#x6267;&#x884C;&#x6808;&#x3002;</blockquote><p>&#x8FD9;&#x5C31;&#x662F;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x7B80;&#x5316;&#x7684;&#x673A;&#x5236;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8BF4;&#x7B80;&#x5316;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x5728;&#x5FAA;&#x73AF;&#x4E2D;&#x8FD8;&#x505A;&#x4E86;&#x5F88;&#x591A;&#x6CA1;&#x6709;&#x63D0;&#x53CA;&#x7684;&#x64CD;&#x4F5C;&#x3001;&#x89C4;&#x5219;&#x3002;</p><p>&#x6211;&#x5C31;&#x4E0D;&#x4E3E;&#x6817;&#x5B50;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x8981;&#x6253;&#x4E2A;&#x6BD4;&#x65B9;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbdoVX?w=189&amp;h=198" src="https://static.alili.tech/img/bVbdoVX?w=189&amp;h=198" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbdoV4?w=199&amp;h=200" src="https://static.alili.tech/img/bVbdoV4?w=199&amp;h=200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5C31;&#x8BF4;&#x4E00;&#x4E2A;&#x8001;&#x751F;&#x5E38;&#x8C08;&#x7684;&#x95EE;&#x9898; (&#x6587;&#x7AE0;&#x7F16;&#x8F91;&#x4E0D;&#x4FBF;&#xFF0C;&#x76F4;&#x63A5;&#x4E00;&#x884C;&#x4E86;&#xFF0C;&#x6362;&#x884C;&#x515A;&#x4F60;&#x5012;&#x662F;&#x6765;&#x6253;&#x6211;&#x554A;&#xFF01;)</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(e=&gt;{ console.log(1) },0);

new Promise((res,rej)=&gt;{ res() }).then(e=&gt;{ console.log(2) });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>) },<span class="hljs-number">0</span>);

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">res,rej</span>)=&gt;</span>{ res() }).then(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>) });</code></pre><p>&#x540C;&#x6837;&#x90FD;&#x662F; javascript &#x4E2D;&#x63D0;&#x4F9B;&#x7684;&#x5F02;&#x6B65;API&#xFF0C;&#x540C;&#x6837;&#x90FD;&#x662F;&#x76F4;&#x63A5;&#x6267;&#x884C;( &#x5F00;&#x53D1;&#x8005;&#x6240;&#x5E0C;&#x671B;&#x7684;&#xFF0C;&#x867D;&#x7136;&#x4F1A;&#x56E0;&#x4E3A;&#x963B;&#x585E;&#x5BFC;&#x81F4;&#x5EF6;&#x65F6;&#xFF0C;&#x9632;&#x6B62;&#x6760;&#x7CBE; )&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x8BBA;&#x8FD9;&#x4FE9;&#x884C;&#x4EE3;&#x7801;&#x8C01;&#x4E0A;&#x3001;&#x8C01;&#x4E0B;&#xFF0C;&#x8F93;&#x51FA;&#x90FD;&#x4F1A;&#x662F; <strong>2 1</strong>&#x3002;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x6D89;&#x53CA; event loop &#x4E2D; <strong>macro task</strong> &#x4E0E; <strong>micro task</strong> &#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x3001;&#x89C4;&#x5219;&#x3002;</p><hr><p><strong>2.&#x6574;&#x4F53;&#x6D41;&#x7A0B;</strong><br>&#x56DE;&#x5230;&#x521A;&#x624D;&#x8BF4;&#x90A3;&#x5F20;&#x6D41;&#x7A0B;&#x56FE;&#x4E0D;&#x591F;&#x5B8C;&#x5584;&#x7684;&#x95EE;&#x9898;&#x4E0A;&#xFF0C;&#x73B0;&#x5728;&#x6765;&#x4E00;&#x5F20;&#x5B8C;&#x6574;&#x7684;&#x3001;&#x5168;&#x9762;&#x7684; event loop &#x6D41;&#x7A0B;&#x56FE;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbdo4P?w=436&amp;h=529" src="https://static.alili.tech/img/bVbdo4P?w=436&amp;h=529" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p><strong><em>&#x56FE;&#x7247;&#x975E;&#x7B14;&#x8005;&#x539F;&#x521B;&#xFF0C;&#x6765;secrets of javascript ninja&#xFF0C;&#x5728;&#x6B64;&#x8BF4;&#x660E;&#xFF0C;&#x4FB5;&#x5220;&#x3002;</em></strong></p><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A; event loop &#x5B8C;&#x6574;&#x7684;&#x6D41;&#x7A0B;&#x56FE;&#xFF0C;&#x4ECE;&#x56FE;&#x4E2D;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x4E86;&#x8BB8;&#x591A;&#x521A;&#x624D;&#x672A;&#x63D0;&#x53CA;&#x7684;&#x540D;&#x8BCD;&#xFF0C;&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#x7684;&#x68B3;&#x7406;&#x4E00;&#x904D; (&#x4ECE;&#x4E0A;&#x81F3;&#x4E0B;)&#xFF1A;</p><blockquote>1.&#x8BFB;&#x53D6; Macrotask queue &#x4E2D;&#x4EFB;&#x52A1;&#x3002;&#x6709;&#x4FE9;&#x79CD;&#x60C5;&#x51B5;</blockquote><ul><li>&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x7A7A;&#xFF0C;&#x5411;&#x4E0B;&#x6267;&#x884C;</li><li>&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x5C06;&#x6700;&#x5148;&#x8FDB;&#x5165;&#x7684;<strong>&#x4E00;&#x4E2A;</strong>&#xFF08;&#x624B;&#x52A8;+&#x6587;&#x7AE0;&#x52A0;&#x7C97;&#xFF09;&#x4EFB;&#x52A1;&#x63A8;&#x5165; javascript &#x6267;&#x884C;&#x6808;&#xFF0C;&#x5411;&#x4E0B;&#x6267;&#x884C;</li></ul><blockquote>2.&#x8BFB;&#x53D6; Microtask queue &#x4E2D;&#x4EFB;&#x52A1;&#x3002;&#x6709;&#x4FE9;&#x79CD;&#x60C5;&#x51B5;</blockquote><ul><li>&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x7A7A;&#xFF0C;&#x5411;&#x4E0B;&#x6267;&#x884C;</li><li>&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x5C06;&#x6700;&#x5148;&#x8FDB;&#x5165;&#x7684;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#x63A8;&#x5165; javascript &#x6267;&#x884C;&#x6808;&#xFF0C;&#x5E76;&#x4E14;<strong>&#x518D;&#x6B21;&#x91CD;&#x590D;&#x6B64;&#x64CD;&#x4F5C;</strong>&#xFF08;&#x624B;&#x52A8;+&#x6587;&#x7AE0;&#x52A0;&#x7C97;&#xFF09;&#xFF0C;&#x76F4;&#x5230; Microtask queue &#x4E3A;&#x7A7A;&#x3002;&#x76F4;&#x767D;&#x7684;&#x8BF4;&#xFF1A;<strong>&#x5C06;&#x6B64;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x6309;&#x7167;&#x5148;&#x540E;&#x987A;&#x5E8F;&#x5C06;&#x6240;&#x6709;&#x4EFB;&#x52A1;&#x63A8;&#x5165;javascript &#x6267;&#x884C;&#x6808;&#xFF0C;&#x5411;&#x4E0B;&#x6267;&#x884C;</strong></li></ul><blockquote>3.&#x6839;&#x636E;<strong>&#x672C;&#x6B21;&#x5FAA;&#x73AF;&#x8017;&#x65F6;</strong>&#xFF08;&#x624B;&#x52A8;+&#x6587;&#x7AE0;&#x52A0;&#x7C97;&#xFF09;&#x5224;&#x65AD;&#x662F;&#x5426;<strong>&#x9700;&#x8981;</strong>&#x3001;&#x662F;&#x5426;<strong>&#x53EF;&#x4EE5;</strong>&#x66F4;&#x65B0;UI &#x3010; &#x540E;&#x9762;&#x4F1A;&#x63D0;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x5FAA;&#x73AF;&#x65F6;&#x95F4;&#x95EE;&#x9898; &#x3011;</blockquote><ul><li>&#x4E0D;&#x9700;&#x8981;&#xFF0C;&#x91CD;&#x590D;&#x7B2C;&#x4E00;&#x6B65;</li><li>&#x9700;&#x8981;&#xFF0C;&#x5411;&#x4E0B;&#x6267;&#x884C;</li></ul><blockquote>4.&#x66F4;&#x65B0;UI&#xFF0C;UI rendering&#xFF0C;&#x540C;&#x65F6;&#x963B;&#x585E; javascript &#x6267;&#x884C;&#x3002;&#x5E76;&#x4E14;&#x7EE7;&#x7EED;&#x91CD;&#x590D;&#x7B2C;&#x4E00;&#x6B65;&#x3002;</blockquote><p>&#x4EE5;&#x4E0A;&#x4FBF;&#x662F;&#x4E00;&#x6574;&#x4E2A; event loop &#x6D41;&#x7A0B;&#xFF0C;&#x4ECE;&#x6D41;&#x7A0B;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6709;&#x4FE9;&#x4E2A;&#x201C;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x201D;&#xFF0C;&#x8FD9;&#x4FE9;&#x4E2A;&#x961F;&#x5217;&#x5B9E;&#x4F8B;&#x5316;&#x5230; javascript &#x4E2D;&#x7684;API &#x4FBF;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Macrotask queue --&gt; setTimeout || setInterval || javascript&#x4EE3;&#x7801;

Microtask queue --&gt; Promise.then()
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>Macrotask queue --&gt; setTimeout |<span class="hljs-type">| setInterval</span> |<span class="hljs-type">| javascript</span>&#x4EE3;&#x7801;

Microtask queue --&gt; Promise.<span class="hljs-keyword">then</span>()
</code></pre><p>&#x81F3;&#x6B64;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684; event loop &#x6D41;&#x7A0B;&#x4FBF;&#x5B8C;&#x5168;&#x8BF4;&#x5B8C;&#x4E86;&#x3002;</p><p><strong>3.&#x5B9E;&#x4F8B;&#x89E3;&#x6790;</strong><br>&#x4EC0;&#x4E48;&#x9B3C;&#xFF1F;&#x8FD9;&#x4E48;&#x590D;&#x6742;&#xFF1F; &#x5F04;&#x61C2;&#xFF1F;&#x4E0D;&#x5B58;&#x5728;&#x7684;<br><span class="img-wrap"><img data-src="/img/bVbdplw?w=640&amp;h=650" src="https://static.alili.tech/img/bVbdplw?w=640&amp;h=650" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x73B0;&#x5728;&#x56DE;&#x5230;&#x521A;&#x624D;&#x63D0;&#x5230;&#x7684; &#x201C;&#x8001;&#x751F;&#x5E38;&#x8C08;&#x7684;&#x95EE;&#x9898;&#x201D; &#x4ECE;&#x5B9E;&#x4F8B;&#x7684;&#x89D2;&#x5EA6;&#x6765;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x95EE;&#x9898;&#x3002;&#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x8FD9;&#x4E2A; javascript &#x6587;&#x4EF6;&#x53EB;&#x505A; &quot;main.js&quot;<br>&quot;main.js&quot;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#xFF08;+ &#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x8BB0;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+1 console.log(1);

+2 setTimeout(e=&gt;{ console.log(2); },0)

+3 setTimeout(e=&gt;{ console.log(3); },0)

+4 new Promise((resolve,reject)=&gt;{ console.log(4); resolve();})
.then(e=&gt;{ console.log(5); })

+5 setTimeout(e=&gt;{ console.log(6);

  +6 new Promise((resolve,reject)=&gt;{ console.log(7); resolve(); })
     .then(e=&gt;{ console.log(8);})
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>+<span class="hljs-number">1</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);

+<span class="hljs-number">2</span> setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>); },<span class="hljs-number">0</span>)

+<span class="hljs-number">3</span> setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>); },<span class="hljs-number">0</span>)

+<span class="hljs-number">4</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>); resolve();})
.then(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>); })

+<span class="hljs-number">5</span> setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>);

  +<span class="hljs-number">6</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">7</span>); resolve(); })
     .then(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">8</span>);})
})</code></pre><p>&#x90A3;&#x4E48;&#x8FD9;&#x4E2A;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x662F;&#x600E;&#x6837;&#x5462;&#xFF1F;&#x4ECE;&#x5934;&#x5E26;&#x5C3E;&#x68B3;&#x7406;&#x4E00;&#x904D;&#xFF08;&#x8BCD;&#x7A77;&#xFF0C;&#x5168;&#x6587;&#x53EA;&#x8981;&#x662F;&#x6D41;&#x7A0B;&#x7EDF;&#x4E00;&#x662F;&#x201C;&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#x68B3;&#x7406;&#x4E00;&#x904D;&#x201D;&#xFF09;</p><blockquote><strong>macrotask:</strong> javascript &#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x6709;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x3002;&#x8F93;&#x51FA;&#xFF1A;<strong>1 4</strong>&#x3002;&#x6CE8;&#x518C; +4 &#x5230; microtask&#x3002; &#x6CE8;&#x518C;+2 +3 +5 &#x5230; macrotask&#x3002;<br><strong>microtask: </strong>&#x6267;&#x884C; +4 &#x8F93;&#x51FA;&#xFF1A;<strong>5</strong>&#x3002;</blockquote><blockquote><strong>macrotask:</strong> &#x6267;&#x884C; +2&#x3002; &#x8F93;&#x51FA; <strong>2</strong>&#x3002;<br><strong>microtask: </strong>&#x65E0;</blockquote><blockquote><strong>macrotask:</strong> &#x6267;&#x884C; +3&#x3002; &#x8F93;&#x51FA; <strong>3</strong>&#x3002;<br><strong>microtask: </strong>&#x65E0;</blockquote><blockquote><strong>macrotask:</strong> &#x6267;&#x884C; +5&#x3002; &#x8F93;&#x51FA; <strong>6 7</strong>&#x3002; &#x6CE8;&#x518C; +6 &#x5230; microtask&#x3002;<br><strong>microtask: </strong>&#x8F93;&#x51FA; <strong>8</strong>&#x3002;</blockquote><p>&#x6240;&#x4EE5;&#x603B;&#x4F53;&#x8F93;&#x51FA;&#x7684;&#x987A;&#x5E8F;&#x4E3A;&#xFF1A;<strong>1 4 5 2 3 6 7 8</strong></p><p>&#x5982;&#x679C;&#x8FD9;&#x4E2A;&#x8F93;&#x51FA;&#x4E0E;&#x4F60;&#x6240;&#x60F3;&#x76F8;&#x540C;&#xFF0C;&#x90A3;&#x4E48;&#x57FA;&#x672C;&#x5C31;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x4E86;&#x3002;<br>&#x90A3;&#x4E48;&#x5982;&#x679C;&#x4E0D;&#x5BF9;&#x6216;&#x8005;&#x6709;&#x95EE;&#x9898;&#x600E;&#x4E48;&#x529E;&#xFF1F;<br><span class="img-wrap"><img data-src="/img/bVbdpsf?w=400&amp;h=400" src="https://static.alili.tech/img/bVbdpsf?w=400&amp;h=400" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>PS&#xFF1A; &#x524D;&#x9762;&#x63D0;&#x5230; &#x3010;<strong>&#x672C;&#x6B21;&#x5FAA;&#x73AF;&#x8017;&#x65F6;</strong>&#x3011;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4E5F;&#x4E0D;&#x662F;&#x975E;&#x5E38;&#x6E05;&#x695A;&#xFF0C;&#x671B;&#x5927;&#x725B;&#x6307;&#x70B9;&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x4E00;&#x822C;&#x6E32;&#x67D3;&#x9875;&#x9762;60/S&#xFF0C;&#x4EE5;&#x8FBE;&#x5230;&#x6BCF;&#x79D2;60&#x5E27;&#xFF08;60 fps&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x5927;&#x6982;16ms&#x4E00;&#x6B21;&#xFF0C;&#x65E2;&#x7136;&#x6709;&#x4E86;&#x65F6;&#x95F4;&#x6211;&#x4EEC;&#x4E0D;&#x7ECF;&#x5C31;&#x4F1A;&#x95EE;&#xFF1F;&#x524D;&#x9762;&#x7684;&#x4EFB;&#x52A1;&#x5904;&#x7406;&#x803D;&#x8BEF;&#x4E86;&#x5219;&#x4E48;&#x529E;&#xFF1F;&#x56E0;&#x4E3A;javascript&#x7EBF;&#x7A0B;&#x4E0E;UI&#x7EBF;&#x7A0B;&#x4E92;&#x65A5;&#xFF0C;&#x67D0;&#x4E9B;&#x4EFB;&#x52A1;&#x5BFC;&#x81F4; javascript&#x5F15;&#x64CE; &#x5751;&#x4E86;&#x961F;&#x53CB;&#xFF0C;&#x81EA;&#x7136;&#x800C;&#x7136;&#x6CA1;&#x6CD5;&#x5728;16ms&#x7684;&#x8282;&#x70B9;&#x4E0A;&#x5230;&#x8FBE;&#x8FD9;&#x4E00;&#x6B65;&#xFF0C;&#x4ECE;secrets of javascript ninja&#x4E2D;&#x4E86;&#x89E3;&#x5230;&#xFF0C;&#x4E00;&#x822C;&#x4F1A;&#x6452;&#x5F03;&#x8FD9;&#x6B21;&#x6E32;&#x67D3;&#xFF0C;&#x7B49;&#x5F85;&#x4E0B;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x3002;&#xFF08; &#x5982;&#x6709;&#x95EE;&#x9898;&#x8BF7;&#x6307;&#x6B63;&#xFF01; &#xFF09;</p><p>&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684; event loop &#x5230;&#x6B64;&#x7ED3;&#x675F;&#xFF0C;&#x4E0B;&#x9762;&#x8BF4;&#x8BF4; NodeJS &#x7684; event loop</p><hr><hr><p><strong>&#x4E8C; NodeJS&#x7684;event loop</strong></p><p>NodeJS &#x7684; event loop &#x4E5F;&#x662F;&#x6709; <strong>Macrotask queue &#x4E0E; Microtask queue</strong> &#x7684;&#x3002;&#x53EA;&#x4E0D;&#x8FC7; NodeJS &#x7684;&#x7565;&#x6709;&#x4E0D;&#x540C;&#x3002;&#x90A3;&#x4E48;&#x4E3B;&#x8981;&#x8BF4;&#x8BF4;&#x4E0D;&#x540C;&#x5728;&#x54EA;&#x91CC;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="NodeJS&#x4E2D; Macrotask queue &#x4E0E; Microtask queue &#x5B9E;&#x4F8B;&#x5316;&#x5230;API&#x4E3A;&#xFF1A;

Macrotask queue --&gt; script(&#x4E3B;&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;)&#xFF0C;setImmediate, I/O&#xFF0C;setTimeout, setInterval

Microtask queue --&gt; process.nextTick, Promise
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code><span class="hljs-built_in">NodeJS</span>&#x4E2D; Macrotask queue &#x4E0E; Microtask queue &#x5B9E;&#x4F8B;&#x5316;&#x5230;API&#x4E3A;&#xFF1A;

M<span class="hljs-function"><span class="hljs-title">acrotask</span> queue --&gt;</span> script(&#x4E3B;&#x7A0B;&#x5E8F;&#x4EE3;&#x7801;)&#xFF0C;setImmediate, I/O&#xFF0C;setTimeout, setInterval

M<span class="hljs-function"><span class="hljs-title">icrotask</span> queue --&gt;</span> process.nextTick, Promise
</code></pre><hr><p><strong>1.Macrotask queue &#x4E0D;&#x540C;&#x4E4B;&#x5904;</strong></p><p>&#x4E0A;&#x9762;&#x8BF4;&#x5230;&#x4E86;&#x6D4F;&#x89C8;&#x5668; event loop &#x7684; Macrotask queue &#x5728;&#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x4E2D;&#x53EA;&#x4F1A;&#x8BFB;&#x53D6;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;,NodeJS &#x4E2D; Macrotask queue &#x4F1A;&#x4E00;&#x6B21;&#x6027;&#x8BFB;&#x53D6;&#x5B8C;&#x6BD5;&#xFF08; <strong>&#x540C;&#x9636;&#x6BB5;&#x7684;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x8BF4;&#x5230;Macrotask queue &#x5206;&#x4E3A; 6&#x4E2A;&#x9636;&#x6BB5;</strong> &#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5411;&#x4E0B;&#x8BFB;&#x53D6;Microtask&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6CE8;&#x610F;&#xFF1A; &#x8FD9;&#x4E00;&#x6761;&#x4E0E; NodeJS&#x7248;&#x672C;&#x6709;&#x5F88;&#x5927;&#x5173;&#x7CFB;&#xFF0C;&#x5728;&#x770B; &#x6DF1;&#x5165;&#x6D45;&#x51FA;NodeJS &#x8FD9;&#x4E00;&#x672C;&#x4E66;&#x65F6;&#xFF08; &#x770B;&#x7684;&#x7248;&#x672C;&#x5F88;&#x65E7;&#xFF0C;&#x4E0D;&#x77E5;&#x662F;&#x5426;&#x6709;&#x4FEE;&#x8BA2;&#x7248;&#xFF0C;&#x5982;&#x6709;&#x8BF7;&#x544A;&#x77E5;&#x3002; &#xFF09;&#xFF0C;&#x63D0;&#x5230;&#x7684; setImmediate &#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x53EA;&#x4F1A;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x5E76;&#x4E14;&#x7ED9;&#x51FA;&#x7684;&#x793A;&#x4F8B;&#x5728; v8.9.1 &#x7248;&#x672C;&#x8DD1;&#x65F6;&#x5DF2;&#x4E0D;&#x7B26;&#x5408;&#x4E66;&#x4E2D;&#x6240;&#x5199;&#x3002;&#x4E66;&#x4E2D;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF08;+ &#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x8BB0;&#xFF0C;&#x539F;&#x6587;&#x4E2D;&#x6CA1;&#x6709;&#xFF09;&#xFF1A;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code style="word-break:break-word;white-space:initial">&#x6CE8;&#x610F;&#xFF1A; &#x8FD9;&#x4E00;&#x6761;&#x4E0E; <span class="hljs-selector-tag">NodeJS</span>&#x7248;&#x672C;&#x6709;&#x5F88;&#x5927;&#x5173;&#x7CFB;&#xFF0C;&#x5728;&#x770B; &#x6DF1;&#x5165;&#x6D45;&#x51FA;<span class="hljs-selector-tag">NodeJS</span> &#x8FD9;&#x4E00;&#x672C;&#x4E66;&#x65F6;&#xFF08; &#x770B;&#x7684;&#x7248;&#x672C;&#x5F88;&#x65E7;&#xFF0C;&#x4E0D;&#x77E5;&#x662F;&#x5426;&#x6709;&#x4FEE;&#x8BA2;&#x7248;&#xFF0C;&#x5982;&#x6709;&#x8BF7;&#x544A;&#x77E5;&#x3002; &#xFF09;&#xFF0C;&#x63D0;&#x5230;&#x7684; <span class="hljs-selector-tag">setImmediate</span> &#x6BCF;&#x6B21;&#x5FAA;&#x73AF;&#x53EA;&#x4F1A;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x5E76;&#x4E14;&#x7ED9;&#x51FA;&#x7684;&#x793A;&#x4F8B;&#x5728; <span class="hljs-selector-tag">v8</span><span class="hljs-selector-class">.9</span><span class="hljs-selector-class">.1</span> &#x7248;&#x672C;&#x8DD1;&#x65F6;&#x5DF2;&#x4E0D;&#x7B26;&#x5408;&#x4E66;&#x4E2D;&#x6240;&#x5199;&#x3002;&#x4E66;&#x4E2D;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF08;+ &#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x6807;&#x8BB0;&#xFF0C;&#x539F;&#x6587;&#x4E2D;&#x6CA1;&#x6709;&#xFF09;&#xFF1A;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

+1 process.nextTick(function () {
       console.log(&apos;nextTick&#x6267;&#x884C;1&apos;);
   });

+2 process.nextTick(function () {
       console.log(&apos;nextTick&#x6267;&#x884C;2&apos;);
   });

+3 setImmediate(function () {
       console.log(&apos;setImmediate&#x10FD;&#x6267;&#x884C;1&apos;);

    +4 process.nextTick(function () {
           console.log(&apos;&#x5F3A;&#x52BF;&#x63D2;&#x5165;&apos;);
       });
   });

+5 setImmediate(function () {
       console.log(&apos;setImmediate&#x10FD;&#x6267;&#x884C;2&apos;);
   });

+6 console.log(&apos;&#x6B63;&#x5E38;&#x6267;&#x884C;&apos;);

&#x6B63;&#x5E38;&#x6267;&#x884C;
nextTick&#x6267;&#x884C;1
nextTick&#x6267;&#x884C;2
setImmediate&#x6267;&#x884C;1
&#x5F3A;&#x52BF;&#x63D2;&#x5165;
setImmediate&#x10FD;&#x6267;&#x884C;2
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs http"><code>

<span class="javascript">+<span class="hljs-number">1</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;nextTick&#x6267;&#x884C;1&apos;</span>);
   });

+<span class="hljs-number">2</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;nextTick&#x6267;&#x884C;2&apos;</span>);
   });

+<span class="hljs-number">3</span> setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setImmediate&#x10FD;&#x6267;&#x884C;1&apos;</span>);

    +<span class="hljs-number">4</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
           <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5F3A;&#x52BF;&#x63D2;&#x5165;&apos;</span>);
       });
   });

+<span class="hljs-number">5</span> setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
       <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setImmediate&#x10FD;&#x6267;&#x884C;2&apos;</span>);
   });

+<span class="hljs-number">6</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6B63;&#x5E38;&#x6267;&#x884C;&apos;</span>);

&#x6B63;&#x5E38;&#x6267;&#x884C;
nextTick&#x6267;&#x884C;<span class="hljs-number">1</span>
nextTick&#x6267;&#x884C;<span class="hljs-number">2</span>
setImmediate&#x6267;&#x884C;<span class="hljs-number">1</span>
&#x5F3A;&#x52BF;&#x63D2;&#x5165;
setImmediate&#x10FD;&#x6267;&#x884C;<span class="hljs-number">2</span>
</span></code></pre><p>&#x5728; v8.9.1 &#x4E2D;&#x622A;&#x56FE;&#x5982;&#x4E0B;<br><span class="img-wrap"><img data-src="/img/bVbdpEp?w=450&amp;h=235" src="https://static.alili.tech/img/bVbdpEp?w=450&amp;h=235" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4ECE;&#x56FE;&#x7247;&#x4E2D;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x81F3;&#x5C11;&#x5728; v8.9.1 &#x7248;&#x672C;&#x4E2D; Macrotask queue &#x4F1A;&#x76F4;&#x63A5;&#x5168;&#x90E8;&#x6267;&#x884C;&#x3002;&#x6309;&#x7167;&#x60EF;&#x4F8B;<strong>&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#x7684;&#x68B3;&#x7406;&#x4E00;&#x904D;</strong>&#xFF1A;</p><blockquote><strong>macrotask:</strong> javascript &#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x6709;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x3002;&#x8F93;&#x51FA;&#xFF1A;<strong>&#x6B63;&#x5E38;&#x6267;&#x884C;</strong>&#x3002;&#x6CE8;&#x518C; +3 +5 &#x5230; Macrotask&#x3002;&#x6267;&#x884C;process.nextTick()&#xFF0C;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#xFF1A;<strong>&#x6B63;&#x5E38;&#x6267;&#x884C;&#xFF0C; nextTick&#x6267;&#x884C;1&#xFF0C; nextTick&#x6267;&#x884C;2&#x3002;</strong><br>**microtask: &#x65E0;</blockquote><blockquote><strong>macrotask:</strong> &#x6267;&#x884C; +3 +5&#x3002; &#x8F93;&#x51FA;&#xFF1A;<strong>setImmediate&#x6267;&#x884C;1&#xFF0C; setImmediate&#x10FD;&#x6267;&#x884C;2&#x3002;</strong> &#x6267;&#x884C;process.nextTick()&#xFF0C;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#xFF1A;<strong>setImmediate&#x6267;&#x884C;1&#xFF0C; setImmediate&#x10FD;&#x6267;&#x884C;2&#xFF0C;&#x5F3A;&#x52BF;&#x63D2;&#x5165;&#x3002;</strong><br><strong>microtask: </strong>&#x65E0;</blockquote><p>&#x6240;&#x4EE5;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x4E3A;&#xFF1A;<strong>&#x6B63;&#x5E38;&#x6267;&#x884C;&#xFF0C; nextTick&#x6267;&#x884C;1&#xFF0C; nextTick&#x6267;&#x884C;2&#xFF0C;setImmediate&#x6267;&#x884C;1&#xFF0C; setImmediate&#x10FD;&#x6267;&#x884C;2&#xFF0C;&#x5F3A;&#x52BF;&#x63D2;&#x5165;&#x3002;</strong></p><hr><p><strong>2.process.nextTick(),setImmediates&#xFF0C;&#x4EE5;&#x53CA;event loop&#x7684;6&#x4E2A;&#x9636;&#x6BB5;</strong></p><p>NodeJS &#x4E2D; <strong>Macrotask queue</strong>&#x4F1A;&#x5206;&#x4E3A; 6 &#x4E2A;&#x9636;&#x6BB5;&#xFF0C;&#x6BCF;&#x4E2A;&#x9636;&#x6BB5;&#x7684;&#x4F5C;&#x7528;&#x5982;&#x4E0B;&#xFF08;<strong>process.nextTick()</strong>&#x5728;6&#x4E2A;&#x9636;&#x6BB5;&#x7ED3;&#x675F;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="timers&#xFF1A;&#x6267;&#x884C;setTimeout() &#x548C; setInterval()&#x4E2D;&#x5230;&#x671F;&#x7684;callback&#x3002;

I/O callbacks&#xFF1A;&#x4E0A;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x4E2D;&#x6709;&#x5C11;&#x6570;&#x7684;I/Ocallback&#x4F1A;&#x88AB;&#x5EF6;&#x8FDF;&#x5230;&#x8FD9;&#x4E00;&#x8F6E;&#x7684;&#x8FD9;&#x4E00;&#x9636;&#x6BB5;&#x6267;&#x884C;

idle, prepare&#xFF1A;&#x4EC5;&#x5185;&#x90E8;&#x4F7F;&#x7528;

poll&#xFF1A;&#x6700;&#x4E3A;&#x91CD;&#x8981;&#x7684;&#x9636;&#x6BB5;&#xFF0C;&#x6267;&#x884C;I/O callback&#xFF0C;&#x5728;&#x9002;&#x5F53;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x4F1A;&#x963B;&#x585E;&#x5728;&#x8FD9;&#x4E2A;&#x9636;&#x6BB5;

check&#xFF1A;&#x6267;&#x884C;setImmediate&#x7684;callback

close callbacks&#xFF1A;&#x6267;&#x884C;close&#x4E8B;&#x4EF6;&#x7684;callback&#xFF0C;&#x4F8B;&#x5982;socket.on(&quot;close&quot;,func)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mathematica"><code>timers&#xFF1A;&#x6267;&#x884C;setTimeout() &#x548C; setInterval()&#x4E2D;&#x5230;&#x671F;&#x7684;callback&#x3002;

<span class="hljs-keyword">I</span>/<span class="hljs-keyword">O</span> callbacks&#xFF1A;&#x4E0A;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#x4E2D;&#x6709;&#x5C11;&#x6570;&#x7684;<span class="hljs-keyword">I</span>/Ocallback&#x4F1A;&#x88AB;&#x5EF6;&#x8FDF;&#x5230;&#x8FD9;&#x4E00;&#x8F6E;&#x7684;&#x8FD9;&#x4E00;&#x9636;&#x6BB5;&#x6267;&#x884C;

idle, prepare&#xFF1A;&#x4EC5;&#x5185;&#x90E8;&#x4F7F;&#x7528;

poll&#xFF1A;&#x6700;&#x4E3A;&#x91CD;&#x8981;&#x7684;&#x9636;&#x6BB5;&#xFF0C;&#x6267;&#x884C;<span class="hljs-keyword">I</span>/<span class="hljs-keyword">O</span> callback&#xFF0C;&#x5728;&#x9002;&#x5F53;&#x7684;&#x6761;&#x4EF6;&#x4E0B;&#x4F1A;&#x963B;&#x585E;&#x5728;&#x8FD9;&#x4E2A;&#x9636;&#x6BB5;

check&#xFF1A;&#x6267;&#x884C;setImmediate&#x7684;callback

close callbacks&#xFF1A;&#x6267;&#x884C;close&#x4E8B;&#x4EF6;&#x7684;callback&#xFF0C;&#x4F8B;&#x5982;socket.on(<span class="hljs-string">&quot;close&quot;</span>,func)
</code></pre><blockquote>&#x6CE8;&#xFF1A;&#x6B64;6&#x4E2A;&#x9636;&#x6BB5;&#x975E;&#x7B14;&#x8005;&#x539F;&#x521B;&#x6765;&#x81EA; <a href="https://cnodejs.org/topic/5a9108d78d6e16e56bb80882" rel="nofollow noreferrer" target="_blank">https://cnodejs.org/topic/5a9...</a>&#xFF0C;&#x6587;&#x7AE0;&#x4ECE;&#x5E95;&#x5C42;C&#x4EE3;&#x7801;&#x5206;&#x6790;NodeJS event loop&#x3002;&#x8FD9;&#x91CC;&#x505A;&#x53EA;&#x505A;&#x7B80;&#x5355;&#x6574;&#x5408;&#x3002;&#x4FB5;&#x5220;&#x3002;</blockquote><p>&#x5728;&#x4E86;&#x89E3;&#x4E86;&#x8FD9;&#x516D;&#x4E2A;&#x9636;&#x6BB5;&#x540E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53D1;&#x73B0;&#x5B9A;&#x65F6;&#x5668;&#x7CFB;&#x5217;&#x5728;NodeJS event loop&#x4E2D; Macrotask queue &#x8BFB;&#x53D6;&#x987A;&#x5E8F;&#x4E3A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. setTimeout(fun,0) setInterval(fun,0) 
2. setImmediate
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crystal"><code><span class="hljs-number">1</span>. setTimeout(<span class="hljs-function"><span class="hljs-keyword">fun</span>,0) <span class="hljs-title">setInterval</span></span>(<span class="hljs-function"><span class="hljs-keyword">fun</span>,0) 
2. <span class="hljs-title">setImmediate</span></span>
</code></pre><p>&#x7A7A;&#x53E3;&#x65E0;&#x51ED;&#xFF0C;&#x5728;&#x5B9E;&#x4F8B;&#x4E2D;&#x4E86;&#x89E3;&#x3002;&#x7684;&#x4EE3;&#x7801;&#x5949;&#x4E0A;&#xFF08; &#x4EE3;&#x7801;&#x8F83;&#x957F;&#xFF0C;&#x5206;&#x4E3A;&#x4E09;&#x6BB5;&#xFF0C;&#x65B9;&#x4FBF;&#x9605;&#x8BFB;&#xFF0C;&#x907F;&#x514D;&#x6EDA;&#x52A8;&#x3002; &#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
+1 process.nextTick(function(){
    console.log(&quot;1&quot;);
});
+2 process.nextTick(function(){
    console.log(&quot;2&quot;);
    +3 setImmediate(function(){
        console.log(&quot;3&quot;);
    });
    +4 process.nextTick(function(){
        console.log(&quot;4&quot;);
    });
});

+5 setImmediate(function(){
    console.log(&quot;5&quot;);
    +6 process.nextTick(function(){
        console.log(&quot;6&quot;);
    });
    +7 setImmediate(function(){
        console.log(&quot;7&quot;);
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>
+<span class="hljs-number">1</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;1&quot;</span>);
});
+<span class="hljs-number">2</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;2&quot;</span>);
    +<span class="hljs-number">3</span> setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;3&quot;</span>);
    });
    +<span class="hljs-number">4</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;4&quot;</span>);
    });
});

+<span class="hljs-number">5</span> setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;5&quot;</span>);
    +<span class="hljs-number">6</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;6&quot;</span>);
    });
    +<span class="hljs-number">7</span> setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;7&quot;</span>);
    });
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+8 setTimeout(e=&gt;{
    console.log(8);
    +9 new Promise((resolve,reject)=&gt;{
        console.log(8+&quot;promise&quot;);
        resolve();
    }).then(e=&gt;{
        console.log(8+&quot;promise+then&quot;);
    })
},0)

+10 setTimeout(e=&gt;{ console.log(9); },0)

+11 setImmediate(function(){
    console.log(&quot;10&quot;);
    +12 process.nextTick(function(){
        console.log(&quot;11&quot;);
    });
    +13 process.nextTick(function(){
        console.log(&quot;12&quot;);
    });
    +14 setImmediate(function(){
        console.log(&quot;13&quot;);
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>+<span class="hljs-number">8</span> setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">8</span>);
    +<span class="hljs-number">9</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">8</span>+<span class="hljs-string">&quot;promise&quot;</span>);
        resolve();
    }).then(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">8</span>+<span class="hljs-string">&quot;promise+then&quot;</span>);
    })
},<span class="hljs-number">0</span>)

+<span class="hljs-number">10</span> setTimeout(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">9</span>); },<span class="hljs-number">0</span>)

+<span class="hljs-number">11</span> setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;10&quot;</span>);
    +<span class="hljs-number">12</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;11&quot;</span>);
    });
    +<span class="hljs-number">13</span> process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;12&quot;</span>);
    });
    +<span class="hljs-number">14</span> setImmediate(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;13&quot;</span>);
    });
});</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(&quot;14&quot;);

+15 new Promise((resolve,reject)=&gt;{
    console.log(15);
    resolve();
}).then(e=&gt;{
    console.log(16);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;14&quot;</span>);

+<span class="hljs-number">15</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">15</span>);
    resolve();
}).then(<span class="hljs-function"><span class="hljs-params">e</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">16</span>);
})</code></pre><p>&#x8FD9;&#x4E48;&#x590D;&#x6742;&#x7684;&#x5F02;&#x6B65;&#x5D4C;&#x5957;&#x5728;&#x4E00;&#x8D77;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x5934;&#x75BC;&#x5462;&#xFF1F;<br><strong>&#x6211;&#xFF01;&#x4E0D;&#xFF01;&#x770B;&#xFF01;&#x4E86;&#xFF01;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbdpNl?w=580&amp;h=580" src="https://static.alili.tech/img/bVbdpNl?w=580&amp;h=580" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x6700;&#x540E;&#x4E00;&#x904D;&#x68B3;&#x7406;&#xFF0C;&#x6700;&#x591A;&#x3001;&#x6700;&#x5168;&#x7684;&#x4E00;&#x6B21;&#x68B3;&#x7406;&#x3002;&#x81EA;&#x53E4;&#x4EE5;&#x6765;<strong>&#x4ECE;&#x5934;&#x5230;&#x5C3E;&#x7684;&#x68B3;&#x7406;&#x4E00;&#x904D;</strong></p><blockquote><strong>macrotask:</strong> javascript &#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x6709;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x3002;&#x8F93;&#x51FA;&#xFF1A;<strong>14</strong>&#x3002;&#x6267;&#x884C;process.nextTick()&#xFF0C;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#xFF1A;<strong>14&#xFF0C;15&#xFF0C; 1&#xFF0C; 2&#xFF0C; 4&#x3002;</strong> &#x6CE8;&#x518C; +3 +5 +8 +11 &#x5230; Macrotask&#x3002; &#x6CE8;&#x518C; +15 &#x5230; Microtask&#x3002;<br><strong>microtask: </strong>&#x6267;&#x884C; +15 &#x8F93;&#x51FA; 16</blockquote><blockquote><strong>macrotask:</strong> &#x6267;&#x884C; +8 +10 &#x8F93;&#x51FA; <strong>8&#xFF0C; 8promise&#xFF0C; 9&#x3002;</strong> &#x6CE8;&#x518C; +9 &#x5230; Microtask&#x3002;<br><strong>microtask: </strong>&#x6267;&#x884C; +9 &#x8F93;&#x51FA; <strong>8promise+then</strong></blockquote><blockquote><strong>macrotask:</strong> &#x6267;&#x884C; +5 +11 +3 &#x8F93;&#x51FA; 5&#xFF0C; 10&#xFF0C; 3&#x3002; &#x6CE8;&#x518C; +7 +14 &#x5230; <strong>macrotask</strong>&#x3002;&#x6267;&#x884C;process.nextTick()&#xFF0C;&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#xFF1A;<strong>5 10 3 6 11 12&#x3002;</strong><br><strong>microtask:</strong> &#x65E0;</blockquote><blockquote><strong>macrotask:</strong> &#x6267;&#x884C; +7 +14&#x3002; &#x8F93;&#x51FA;&#xFF1A;<strong>7&#xFF0C;13</strong><br><strong>microtask:</strong> &#x65E0;</blockquote><p>&#x7531;&#x6B64;&#x6700;&#x4E2D;&#x5168;&#x90E8;&#x7684;&#x8F93;&#x51FA;&#x4E3A;&#xFF1A;<strong>14&#xFF0C;15&#xFF0C;1&#xFF0C;2&#xFF0C;4&#xFF0C;8&#xFF0C;8promise&#xFF0C;9&#xFF0C;8promise+then&#xFF0C;5&#xFF0C;10&#xFF0C;3&#xFF0C;6&#xFF0C;11&#xFF0C;12&#xFF0C;7&#xFF0C;13</strong></p><hr><hr><p><strong>&#x4E09; &#x7ED3;&#x675F;</strong></p><p>&#x5230;&#x6B64;&#x7ED3;&#x675F;&#x4E86;&#x3002;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x3001;NodeJS &#x7684; event loop &#x5DF2;&#x5168;&#x90E8;&#x5206;&#x6790;&#x5B8C;&#x6210;&#xFF0C;&#x8FC7;&#x7A0B;&#x4E2D;&#x5F15;&#x7528;&#xFF1A;&#x962E;&#x4E00;&#x5CF0;&#x535A;&#x5BA2;&#xFF0C;&#x77E5;&#x4E4E;&#xFF0C;CSDN&#x90E8;&#x5206;&#x6587;&#x7AE0;&#x5185;&#x5BB9;&#xFF0C;&#x4FB5;&#x5220;&#x3002;</p><p>&#x6700;&#x8FD1;&#x5728;&#x4E86;&#x89E3;&#x90E8;&#x5206;&#x5E95;&#x5C42;&#x77E5;&#x8BC6;&#xFF0C;&#x6536;&#x83B7;&#x9887;&#x4E30;&#x3002;&#x5176;&#x4E2D;&#x5305;&#x62EC; for of.... &#x7B49;&#x7B49;&#x5404;&#x79CD;&#x5947;&#x5947;&#x602A;&#x602A;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6709;&#x65F6;&#x95F4;&#x518D;&#x5199;&#x5427;&#x3002;</p><p><strong>&#x6700;&#x540E;&#xFF0C;&#x672C;&#x4EBA;&#x83DC;&#x9E1F;&#xFF0C;&#x5982;&#x6709;&#x4E0D;&#x5BF9;&#x3001;&#x4E0D;&#x5B9E;&#x3001;&#x8BEF;&#x5BFC;&#x7B49;&#x9519;&#x8BEF;&#x3001;&#x95EE;&#x9898;&#xFF0C;&#x6B22;&#x8FCE;&#x8BC4;&#x8BBA;&#x533A;&#x6307;&#x6B63;&#x3002;</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浏览器与NodeJS的EventLoop异同，以及部分机制。

## 原文链接
[https://segmentfault.com/a/1190000015552098](https://segmentfault.com/a/1190000015552098)


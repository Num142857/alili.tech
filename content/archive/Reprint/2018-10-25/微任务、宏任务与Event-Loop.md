---
title: 微任务、宏任务与Event-Loop
hidden: true
categories: reprint
slug: 4570d5dc
date: 2018-10-25 09:08:15
---

{{< raw >}}
<p>&#x9996;&#x5148;&#xFF0C;JavaScript&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x7EBF;&#x7A0B;&#x7684;&#x811A;&#x672C;&#x8BED;&#x8A00;&#x3002;<br>&#x6240;&#x4EE5;&#x5C31;&#x662F;&#x8BF4;&#x5728;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x5FC5;&#x7136;&#x4E0D;&#x4F1A;&#x5B58;&#x5728;&#x540C;&#x65F6;&#x6267;&#x884C;&#x7684;&#x53E6;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x50CF;&#x4F7F;&#x7528;<code>alert()</code>&#x4EE5;&#x540E;&#x8FDB;&#x884C;&#x75AF;&#x72C2;<code>console.log</code>&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x5173;&#x95ED;&#x5F39;&#x6846;&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x662F;&#x4E0D;&#x4F1A;&#x663E;&#x793A;&#x51FA;&#x4E00;&#x6761;<code>log</code>&#x4FE1;&#x606F;&#x7684;&#x3002;<br>&#x4EA6;&#x6216;&#x8005;&#x6709;&#x4E9B;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x4E86;&#x5927;&#x91CF;&#x8BA1;&#x7B97;&#xFF0C;&#x6BD4;&#x65B9;&#x8BF4;&#x5728;&#x524D;&#x7AEF;&#x66B4;&#x529B;&#x7834;&#x89E3;&#x5BC6;&#x7801;&#x4E4B;&#x7C7B;&#x7684;&#x9B3C;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x540E;&#x7EED;&#x4EE3;&#x7801;&#x4E00;&#x76F4;&#x5728;&#x7B49;&#x5F85;&#xFF0C;&#x9875;&#x9762;&#x5904;&#x4E8E;&#x5047;&#x6B7B;&#x72B6;&#x6001;&#xFF0C;&#x56E0;&#x4E3A;&#x524D;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x5B8C;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5982;&#x679C;&#x5168;&#x90E8;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x540C;&#x6B65;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x8FD9;&#x4F1A;&#x5F15;&#x53D1;&#x5F88;&#x4E25;&#x91CD;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6BD4;&#x65B9;&#x8BF4;&#x6211;&#x4EEC;&#x8981;&#x4ECE;&#x8FDC;&#x7AEF;&#x83B7;&#x53D6;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#xFF0C;&#x96BE;&#x9053;&#x8981;&#x4E00;&#x76F4;&#x5FAA;&#x73AF;&#x4EE3;&#x7801;&#x53BB;&#x5224;&#x65AD;&#x662F;&#x5426;&#x62FF;&#x5230;&#x4E86;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x4E48;&#xFF1F;_&#x5C31;&#x50CF;&#x53BB;&#x996D;&#x5E97;&#x70B9;&#x9910;&#xFF0C;&#x80AF;&#x5B9A;&#x4E0D;&#x80FD;&#x8BF4;&#x70B9;&#x5B8C;&#x4E86;&#x4EE5;&#x540E;&#x5C31;&#x53BB;&#x540E;&#x53A8;&#x50AC;&#x7740;&#x4EBA;&#x7092;&#x83DC;&#x7684;&#xFF0C;&#x4F1A;&#x88AB;&#x63CD;&#x7684;&#x3002;_<br>&#x4E8E;&#x662F;&#x5C31;&#x6709;&#x4E86;&#x5F02;&#x6B65;&#x4E8B;&#x4EF6;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x53D1;&#x4E00;&#x4E2A;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x6211;&#x4EEC;&#x544A;&#x8BC9;&#x4E3B;&#x7A0B;&#x5E8F;&#x7B49;&#x5230;&#x63A5;&#x6536;&#x5230;&#x6570;&#x636E;&#x540E;&#x901A;&#x77E5;&#x6211;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x53BB;&#x505A;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x60C5;&#x4E86;&#x3002;<br>&#x7136;&#x540E;&#x5728;&#x5F02;&#x6B65;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x4F1A;&#x901A;&#x77E5;&#x5230;&#x6211;&#x4EEC;&#xFF0C;&#x4F46;&#x662F;&#x6B64;&#x65F6;&#x53EF;&#x80FD;&#x7A0B;&#x5E8F;&#x6B63;&#x5728;&#x505A;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6240;&#x4EE5;&#x5373;&#x4F7F;&#x5F02;&#x6B65;&#x5B8C;&#x6210;&#x4E86;&#x4E5F;&#x9700;&#x8981;&#x5728;&#x4E00;&#x65C1;&#x7B49;&#x5F85;&#xFF0C;&#x7B49;&#x5230;&#x7A0B;&#x5E8F;&#x7A7A;&#x95F2;&#x4E0B;&#x6765;&#x624D;&#x6709;&#x65F6;&#x95F4;&#x53BB;&#x770B;&#x54EA;&#x4E9B;&#x5F02;&#x6B65;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x53BB;&#x6267;&#x884C;&#x3002;<br><em>&#x6BD4;&#x5982;&#x8BF4;&#x6253;&#x4E86;&#x4E2A;&#x8F66;&#xFF0C;&#x5982;&#x679C;&#x53F8;&#x673A;&#x5148;&#x5230;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x624B;&#x5934;&#x8FD8;&#x6709;&#x70B9;&#x513F;&#x4E8B;&#x60C5;&#x8981;&#x5904;&#x7406;&#xFF0C;&#x8FD9;&#x65F6;&#x53F8;&#x673A;&#x662F;&#x4E0D;&#x53EF;&#x80FD;&#x81EA;&#x5DF1;&#x5148;&#x5F00;&#x7740;&#x8F66;&#x8D70;&#x7684;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x7B49;&#x5230;&#x4F60;&#x5904;&#x7406;&#x5B8C;&#x4E8B;&#x60C5;&#x4E0A;&#x4E86;&#x8F66;&#x624D;&#x80FD;&#x8D70;&#x3002;</em></p><p><span class="img-wrap"><img data-src="/img/bVbfoeu?w=650&amp;h=405" src="https://static.alili.tech/img/bVbfoeu?w=650&amp;h=405" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">&#x5FAE;&#x4EFB;&#x52A1;&#x4E0E;&#x5B8F;&#x4EFB;&#x52A1;&#x7684;&#x533A;&#x522B;</h2><p>&#x8FD9;&#x4E2A;&#x5C31;&#x50CF;&#x53BB;&#x94F6;&#x884C;&#x529E;&#x4E1A;&#x52A1;&#x4E00;&#x6837;&#xFF0C;&#x5148;&#x8981;&#x53D6;&#x53F7;&#x8FDB;&#x884C;&#x6392;&#x53F7;&#x3002;<br>&#x4E00;&#x822C;&#x4E0A;&#x8FB9;&#x90FD;&#x4F1A;&#x5370;&#x7740;&#x7C7B;&#x4F3C;&#xFF1A;&#x201C;&#x60A8;&#x7684;&#x53F7;&#x7801;&#x4E3A;XX&#xFF0C;&#x524D;&#x8FB9;&#x8FD8;&#x6709;XX&#x4EBA;&#x3002;&#x201D;&#x4E4B;&#x7C7B;&#x7684;&#x5B57;&#x6837;&#x3002;</p><p>&#x56E0;&#x4E3A;&#x67DC;&#x5458;&#x540C;&#x65F6;&#x804C;&#x80FD;&#x5904;&#x7406;&#x4E00;&#x4E2A;&#x6765;&#x529E;&#x7406;&#x4E1A;&#x52A1;&#x7684;&#x5BA2;&#x6237;&#xFF0C;&#x8FD9;&#x65F6;&#x6BCF;&#x4E00;&#x4E2A;&#x6765;&#x529E;&#x7406;&#x4E1A;&#x52A1;&#x7684;&#x4EBA;&#x5C31;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x94F6;&#x884C;&#x67DC;&#x5458;&#x7684;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x6765;&#x5B58;&#x5728;&#x7684;&#xFF0C;&#x5F53;&#x67DC;&#x5458;&#x5904;&#x7406;&#x5B8C;&#x5F53;&#x524D;&#x5BA2;&#x6237;&#x7684;&#x95EE;&#x9898;&#x4EE5;&#x540E;&#xFF0C;&#x9009;&#x62E9;&#x63A5;&#x5F85;&#x4E0B;&#x4E00;&#x4F4D;&#xFF0C;&#x5E7F;&#x64AD;&#x62A5;&#x53F7;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x4E0B;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x7684;&#x5F00;&#x59CB;&#x3002;<br>&#x6240;&#x4EE5;&#x591A;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x5408;&#x5728;&#x4E00;&#x8D77;&#x5C31;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x8BF4;&#x6709;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x5728;&#x8FD9;&#xFF0C;&#x91CC;&#x8FB9;&#x662F;&#x5F53;&#x524D;&#x94F6;&#x884C;&#x4E2D;&#x6240;&#x6709;&#x6392;&#x53F7;&#x7684;&#x5BA2;&#x6237;&#x3002;<br><strong>&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E2D;&#x7684;&#x90FD;&#x662F;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x8BF4;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x5C31;&#x4F1A;&#x88AB;&#x653E;&#x5728;&#x8FD9;&#x4E2A;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x5C31;&#x50CF;&#x5728;&#x94F6;&#x884C;&#x4E2D;&#x6392;&#x53F7;&#xFF0C;&#x5982;&#x679C;&#x53EB;&#x5230;&#x4F60;&#x7684;&#x65F6;&#x5019;&#x4F60;&#x4E0D;&#x5728;&#xFF0C;&#x90A3;&#x4E48;&#x4F60;&#x5F53;&#x524D;&#x7684;&#x53F7;&#x724C;&#x5C31;&#x4F5C;&#x5E9F;&#x4E86;&#xFF0C;&#x67DC;&#x5458;&#x4F1A;&#x9009;&#x62E9;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#x8FDB;&#x884C;&#x4E0B;&#x4E00;&#x4E2A;&#x5BA2;&#x6237;&#x7684;&#x4E1A;&#x52A1;&#x5904;&#x7406;&#xFF0C;&#x7B49;&#x4F60;&#x56DE;&#x6765;&#x4EE5;&#x540E;&#x8FD8;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x53D6;&#x53F7;</strong></p><p>&#x800C;&#x4E14;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x5728;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x662F;&#x53EF;&#x4EE5;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x5FAE;&#x4EFB;&#x52A1;&#x7684;&#xFF0C;&#x5C31;&#x50CF;&#x5728;&#x67DC;&#x53F0;&#x529E;&#x7406;&#x4E1A;&#x52A1;&#xFF0C;&#x4F60;&#x524D;&#x8FB9;&#x7684;&#x4E00;&#x4F4D;&#x8001;&#x5927;&#x7237;&#x53EF;&#x80FD;&#x5728;&#x5B58;&#x6B3E;&#xFF0C;&#x5728;&#x5B58;&#x6B3E;&#x8FD9;&#x4E2A;&#x4E1A;&#x52A1;&#x529E;&#x7406;&#x5B8C;&#x4EE5;&#x540E;&#xFF0C;&#x67DC;&#x5458;&#x4F1A;&#x95EE;&#x8001;&#x5927;&#x7237;&#x8FD8;&#x6709;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x9700;&#x8981;&#x529E;&#x7406;&#x7684;&#x4E1A;&#x52A1;&#xFF0C;&#x8FD9;&#x65F6;&#x8001;&#x5927;&#x7237;&#x60F3;&#x4E86;&#x4E00;&#x4E0B;&#xFF1A;&#x201C;&#x6700;&#x8FD1;P2P&#x7206;&#x96F7;&#x6709;&#x70B9;&#x513F;&#x591A;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x8981;&#x9009;&#x62E9;&#x7A33;&#x4E00;&#x4E9B;&#x7684;&#x7406;&#x8D22;&#x5462;&#x201D;&#xFF0C;&#x7136;&#x540E;&#x544A;&#x8BC9;&#x67DC;&#x5458;&#x8BF4;&#xFF0C;&#x8981;&#x529E;&#x4E00;&#x4E9B;&#x7406;&#x8D22;&#x7684;&#x4E1A;&#x52A1;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x67DC;&#x5458;&#x80AF;&#x5B9A;&#x4E0D;&#x80FD;&#x544A;&#x8BC9;&#x8001;&#x5927;&#x7237;&#x8BF4;&#xFF1A;&#x201C;&#x60A8;&#x518D;&#x4E0A;&#x540E;&#x8FB9;&#x53D6;&#x4E2A;&#x53F7;&#x53BB;&#xFF0C;&#x91CD;&#x65B0;&#x6392;&#x961F;&#x201D;&#x3002;<br>&#x6240;&#x4EE5;&#x672C;&#x6765;&#x5FEB;&#x8F6E;&#x5230;&#x4F60;&#x6765;&#x529E;&#x7406;&#x4E1A;&#x52A1;&#xFF0C;&#x4F1A;&#x56E0;&#x4E3A;&#x8001;&#x5927;&#x7237;&#x4E34;&#x65F6;&#x6DFB;&#x52A0;&#x7684;&#x201C;<strong>&#x7406;&#x8D22;&#x4E1A;&#x52A1;</strong>&#x201D;&#x800C;&#x5F80;&#x540E;&#x63A8;&#x3002;<br>&#x4E5F;&#x8BB8;&#x8001;&#x5927;&#x7237;&#x5728;&#x529E;&#x5B8C;&#x7406;&#x8D22;&#x4EE5;&#x540E;&#x8FD8;&#x60F3; <strong>&#x518D;&#x529E;&#x4E00;&#x4E2A;&#x4FE1;&#x7528;&#x5361;</strong>&#xFF1F;&#x6216;&#x8005; <strong>&#x518D;&#x4E70;&#x70B9;&#x513F;&#x7EAA;&#x5FF5;&#x5E01;</strong>&#xFF1F;<br>&#x65E0;&#x8BBA;&#x662F;&#x4EC0;&#x4E48;&#x9700;&#x6C42;&#xFF0C;&#x53EA;&#x8981;&#x662F;&#x67DC;&#x5458;&#x80FD;&#x591F;&#x5E2E;&#x5979;&#x529E;&#x7406;&#x7684;&#xFF0C;&#x90FD;&#x4F1A;&#x5728;&#x5904;&#x7406;&#x4F60;&#x7684;&#x4E1A;&#x52A1;&#x4E4B;&#x524D;&#x6765;&#x505A;&#x8FD9;&#x4E9B;&#x4E8B;&#x60C5;&#xFF0C;&#x8FD9;&#x4E9B;&#x90FD;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x5FAE;&#x4EFB;&#x52A1;&#x3002;</p><p>&#x8FD9;&#x5C31;&#x8BF4;&#x660E;&#xFF1A;<del>&#x4F60;&#x5927;&#x7237;&#x6C38;&#x8FDC;&#x662F;&#x4F60;&#x5927;&#x7237;</del><br><strong>&#x5728;&#x5F53;&#x524D;&#x7684;&#x5FAE;&#x4EFB;&#x52A1;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x65F6;&#xFF0C;&#x662F;&#x4E0D;&#x4F1A;&#x6267;&#x884C;&#x4E0B;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x7684;&#x3002;</strong></p><p>&#x6240;&#x4EE5;&#x5C31;&#x6709;&#x4E86;&#x90A3;&#x4E2A;&#x7ECF;&#x5E38;&#x5728;&#x9762;&#x8BD5;&#x9898;&#x3001;&#x5404;&#x79CD;&#x535A;&#x5BA2;&#x4E2D;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(_ =&gt; console.log(4))

new Promise(resolve =&gt; {
  resolve()
  console.log(1)
}).then(_ =&gt; {
  console.log(3)
})

console.log(2)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>))

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
  resolve()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
}).then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)</code></pre><p><code>setTimeout</code>&#x5C31;&#x662F;&#x4F5C;&#x4E3A;&#x5B8F;&#x4EFB;&#x52A1;&#x6765;&#x5B58;&#x5728;&#x7684;&#xFF0C;&#x800C;<code>Promise.then</code>&#x5219;&#x662F;&#x5177;&#x6709;&#x4EE3;&#x8868;&#x6027;&#x7684;&#x5FAE;&#x4EFB;&#x52A1;&#xFF0C;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x5C31;&#x662F;&#x6309;&#x7167;&#x5E8F;&#x53F7;&#x6765;&#x8F93;&#x51FA;&#x7684;&#x3002;</p><p><strong>&#x6240;&#x6709;&#x4F1A;&#x8FDB;&#x5165;&#x7684;&#x5F02;&#x6B65;&#x90FD;&#x662F;&#x6307;&#x7684;&#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#x4E2D;&#x7684;&#x90A3;&#x90E8;&#x5206;&#x4EE3;&#x7801;</strong><br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;<code>new Promise</code>&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x6240;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x540C;&#x6B65;&#x8FDB;&#x884C;&#x7684;&#xFF0C;&#x800C;<code>then</code>&#x4E2D;&#x6CE8;&#x518C;&#x7684;&#x56DE;&#x8C03;&#x624D;&#x662F;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x7684;&#x3002;<br>&#x5728;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5B8C;&#x6210;&#x540E;&#x624D;&#x56DE;&#x53BB;&#x68C0;&#x67E5;&#x662F;&#x5426;&#x6709;&#x5F02;&#x6B65;&#x4EFB;&#x52A1;&#x5B8C;&#x6210;&#xFF0C;&#x5E76;&#x6267;&#x884C;&#x5BF9;&#x5E94;&#x7684;&#x56DE;&#x8C03;&#xFF0C;&#x800C;&#x5FAE;&#x4EFB;&#x52A1;&#x53C8;&#x4F1A;&#x5728;&#x5B8F;&#x4EFB;&#x52A1;&#x4E4B;&#x524D;&#x6267;&#x884C;&#x3002;<br>&#x6240;&#x4EE5;&#x5C31;&#x5F97;&#x5230;&#x4E86;&#x4E0A;&#x8FF0;&#x7684;&#x8F93;&#x51FA;&#x7ED3;&#x8BBA;<code>1&#x3001;2&#x3001;3&#x3001;4</code>&#x3002;</p><p><em>+&#x90E8;&#x5206;&#x8868;&#x793A;&#x540C;&#x6B65;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;</em></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="+setTimeout(_ =&gt; {
-  console.log(4)
+})

+new Promise(resolve =&gt; {
+  resolve()
+  console.log(1)
+}).then(_ =&gt; {
-  console.log(3)
+})

+console.log(2)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="diff hljs"><code class="diff"><span class="hljs-addition">+setTimeout(_ =&gt; {</span>
<span class="hljs-deletion">-  console.log(4)</span>
<span class="hljs-addition">+})</span>

<span class="hljs-addition">+new Promise(resolve =&gt; {</span>
<span class="hljs-addition">+  resolve()</span>
<span class="hljs-addition">+  console.log(1)</span>
<span class="hljs-addition">+}).then(_ =&gt; {</span>
<span class="hljs-deletion">-  console.log(3)</span>
<span class="hljs-addition">+})</span>

<span class="hljs-addition">+console.log(2)</span></code></pre><p>&#x672C;&#x6765;<code>setTimeout</code>&#x5DF2;&#x7ECF;&#x5148;&#x8BBE;&#x7F6E;&#x4E86;&#x5B9A;&#x65F6;&#x5668;&#xFF08;&#x76F8;&#x5F53;&#x4E8E;&#x53D6;&#x53F7;&#xFF09;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x5F53;&#x524D;&#x8FDB;&#x7A0B;&#x4E2D;&#x53C8;&#x6DFB;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;<code>Promise</code>&#x7684;&#x5904;&#x7406;&#xFF08;&#x4E34;&#x65F6;&#x6DFB;&#x52A0;&#x4E1A;&#x52A1;&#xFF09;&#x3002;</p><p>&#x6240;&#x4EE5;&#x8FDB;&#x9636;&#x7684;&#xFF0C;&#x5373;&#x4FBF;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x5728;<code>Promise</code>&#x4E2D;&#x5B9E;&#x4F8B;&#x5316;<code>Promise</code>&#xFF0C;&#x5176;&#x8F93;&#x51FA;&#x4F9D;&#x7136;&#x4F1A;&#x65E9;&#x4E8E;<code>setTimeout</code>&#x7684;&#x5B8F;&#x4EFB;&#x52A1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(_ =&gt; console.log(4))

new Promise(resolve =&gt; {
  resolve()
  console.log(1)
}).then(_ =&gt; {
  console.log(3)
  Promise.resolve().then(_ =&gt; {
    console.log(&apos;before timeout&apos;)
  }).then(_ =&gt; {
    Promise.resolve().then(_ =&gt; {
      console.log(&apos;also before timeout&apos;)
    })
  })
})

console.log(2)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>))

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
  resolve()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
}).then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;before timeout&apos;</span>)
  }).then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
    <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;also before timeout&apos;</span>)
    })
  })
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)</code></pre><p>&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x4E0B;&#x5F88;&#x5C11;&#x4F1A;&#x6709;&#x7B80;&#x5355;&#x7684;&#x8FD9;&#x4E48;&#x8C03;&#x7528;<code>Promise</code>&#x7684;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x5728;&#x91CC;&#x8FB9;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x6BD4;&#x5982;<code>fetch</code>&#x3001;<code>fs.readFile</code>&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#x3002;<br>&#x800C;&#x8FD9;&#x4E9B;&#x5176;&#x5B9E;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x6CE8;&#x518C;&#x4E86;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x800C;&#x975E;&#x662F;&#x5FAE;&#x4EFB;&#x52A1;&#x3002;</p><p><em>P.S. &#x5728;<a href="https://promisesaplus.com/#notes" rel="nofollow noreferrer" target="_blank">Promise/A+&#x7684;&#x89C4;&#x8303;</a>&#x4E2D;&#xFF0C;<code>Promise</code>&#x7684;&#x5B9E;&#x73B0;&#x53EF;&#x4EE5;&#x662F;&#x5FAE;&#x4EFB;&#x52A1;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x4F46;&#x662F;&#x666E;&#x904D;&#x7684;&#x5171;&#x8BC6;&#x8868;&#x793A;(&#x81F3;&#x5C11;<code>Chrome</code>&#x662F;&#x8FD9;&#x4E48;&#x505A;&#x7684;)&#xFF0C;<code>Promise</code>&#x5E94;&#x8BE5;&#x662F;&#x5C5E;&#x4E8E;&#x5FAE;&#x4EFB;&#x52A1;&#x9635;&#x8425;&#x7684;</em></p><p>&#x6240;&#x4EE5;&#xFF0C;&#x660E;&#x767D;&#x54EA;&#x4E9B;&#x64CD;&#x4F5C;&#x662F;&#x5B8F;&#x4EFB;&#x52A1;&#x3001;&#x54EA;&#x4E9B;&#x662F;&#x5FAE;&#x4EFB;&#x52A1;&#x5C31;&#x53D8;&#x5F97;&#x5F88;&#x5173;&#x952E;&#xFF0C;&#x8FD9;&#x662F;&#x76EE;&#x524D;&#x4E1A;&#x754C;&#x6BD4;&#x8F83;&#x6D41;&#x884C;&#x7684;&#x8BF4;&#x6CD5;&#xFF1A;</p><h3 id="articleHeader1">&#x5B8F;&#x4EFB;&#x52A1;</h3><table><thead><tr><th align="left">#</th><th align="center">&#x6D4F;&#x89C8;&#x5668;</th><th align="center">Node</th></tr></thead><tbody><tr><td align="left"><code>I/O</code></td><td align="center">&#x2705;</td><td align="center">&#x2705;</td></tr><tr><td align="left"><code>setTimeout</code></td><td align="center">&#x2705;</td><td align="center">&#x2705;</td></tr><tr><td align="left"><code>setInterval</code></td><td align="center">&#x2705;</td><td align="center">&#x2705;</td></tr><tr><td align="left"><code>setImmediate</code></td><td align="center">&#x274C;</td><td align="center">&#x2705;</td></tr><tr><td align="left"><code>requestAnimationFrame</code></td><td align="center">&#x2705;</td><td align="center">&#x274C;</td></tr></tbody></table><p><em>&#x6709;&#x4E9B;&#x5730;&#x65B9;&#x4F1A;&#x5217;&#x51FA;&#x6765;<code>UI Rendering</code>&#xFF0C;&#x8BF4;&#x8FD9;&#x4E2A;&#x4E5F;&#x662F;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x53EF;&#x662F;&#x5728;&#x8BFB;&#x4E86;<a href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model" rel="nofollow noreferrer" target="_blank">HTML&#x89C4;&#x8303;&#x6587;&#x6863;</a>&#x4EE5;&#x540E;&#xFF0C;&#x53D1;&#x73B0;&#x8FD9;&#x5F88;&#x663E;&#x7136;&#x662F;&#x548C;&#x5FAE;&#x4EFB;&#x52A1;&#x5E73;&#x884C;&#x7684;&#x4E00;&#x4E2A;&#x64CD;&#x4F5C;&#x6B65;&#x9AA4;</em><br><em><code>requestAnimationFrame</code>&#x59D1;&#x4E14;&#x4E5F;&#x7B97;&#x662F;&#x5B8F;&#x4EFB;&#x52A1;&#x5427;&#xFF0C;<code>requestAnimationFrame</code>&#x5728;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame" rel="nofollow noreferrer" target="_blank">MDN&#x7684;&#x5B9A;&#x4E49;</a>&#x4E3A;&#xFF0C;&#x4E0B;&#x6B21;&#x9875;&#x9762;&#x91CD;&#x7ED8;&#x524D;&#x6240;&#x6267;&#x884C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x800C;&#x91CD;&#x7ED8;&#x4E5F;&#x662F;&#x4F5C;&#x4E3A;&#x5B8F;&#x4EFB;&#x52A1;&#x7684;&#x4E00;&#x4E2A;&#x6B65;&#x9AA4;&#x6765;&#x5B58;&#x5728;&#x7684;&#xFF0C;&#x4E14;&#x8BE5;&#x6B65;&#x9AA4;&#x665A;&#x4E8E;&#x5FAE;&#x4EFB;&#x52A1;&#x7684;&#x6267;&#x884C;</em></p><h3 id="articleHeader2">&#x5FAE;&#x4EFB;&#x52A1;</h3><table><thead><tr><th align="left">#</th><th align="center">&#x6D4F;&#x89C8;&#x5668;</th><th align="center">Node</th></tr></thead><tbody><tr><td align="left"><code>process.nextTick</code></td><td align="center">&#x274C;</td><td align="center">&#x2705;</td></tr><tr><td align="left"><code>MutationObserver</code></td><td align="center">&#x2705;</td><td align="center">&#x274C;</td></tr><tr><td align="left"><code>Promise.then catch finally</code></td><td align="center">&#x2705;</td><td align="center">&#x2705;</td></tr></tbody></table><h2 id="articleHeader3">Event-Loop&#x662F;&#x4E2A;&#x5565;</h2><p>&#x4E0A;&#x8FB9;&#x4E00;&#x76F4;&#x5728;&#x8BA8;&#x8BBA; &#x5B8F;&#x4EFB;&#x52A1;&#x3001;&#x5FAE;&#x4EFB;&#x52A1;&#xFF0C;&#x5404;&#x79CD;&#x4EFB;&#x52A1;&#x7684;&#x6267;&#x884C;&#x3002;<br>&#x4F46;&#x662F;&#x56DE;&#x5230;&#x73B0;&#x5B9E;&#xFF0C;<code>JavaScript</code>&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x8FDB;&#x7A0B;&#x7684;&#x8BED;&#x8A00;&#xFF0C;&#x540C;&#x4E00;&#x65F6;&#x95F4;&#x4E0D;&#x80FD;&#x5904;&#x7406;&#x591A;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x6240;&#x4EE5;&#x4F55;&#x65F6;&#x6267;&#x884C;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x4F55;&#x65F6;&#x6267;&#x884C;&#x5FAE;&#x4EFB;&#x52A1;&#xFF1F;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x5224;&#x65AD;&#x903B;&#x8F91;&#x5B58;&#x5728;&#x3002;</p><p>&#x6BCF;&#x529E;&#x7406;&#x5B8C;&#x4E00;&#x4E2A;&#x4E1A;&#x52A1;&#xFF0C;&#x67DC;&#x5458;&#x5C31;&#x4F1A;&#x95EE;&#x5F53;&#x524D;&#x7684;&#x5BA2;&#x6237;&#xFF0C;&#x662F;&#x5426;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x9700;&#x8981;&#x529E;&#x7406;&#x7684;&#x4E1A;&#x52A1;&#x3002;_<strong>&#xFF08;&#x68C0;&#x67E5;&#x8FD8;&#x6709;&#x6CA1;&#x6709;&#x5FAE;&#x4EFB;&#x52A1;&#x9700;&#x8981;&#x5904;&#x7406;&#xFF09;</strong>_<br>&#x800C;&#x5BA2;&#x6237;&#x660E;&#x786E;&#x544A;&#x77E5;&#x8BF4;&#x6CA1;&#x6709;&#x4E8B;&#x60C5;&#x4EE5;&#x540E;&#xFF0C;&#x67DC;&#x5458;&#x5C31;&#x53BB;&#x67E5;&#x770B;&#x540E;&#x8FB9;&#x8FD8;&#x6709;&#x6CA1;&#x6709;&#x7B49;&#x7740;&#x529E;&#x7406;&#x4E1A;&#x52A1;&#x7684;&#x4EBA;&#x3002;_<strong>&#xFF08;&#x7ED3;&#x675F;&#x672C;&#x6B21;&#x5B8F;&#x4EFB;&#x52A1;&#x3001;&#x68C0;&#x67E5;&#x8FD8;&#x6709;&#x6CA1;&#x6709;&#x5B8F;&#x4EFB;&#x52A1;&#x9700;&#x8981;&#x5904;&#x7406;&#xFF09;</strong>_<br>&#x8FD9;&#x4E2A;&#x68C0;&#x67E5;&#x7684;&#x8FC7;&#x7A0B;&#x662F;&#x6301;&#x7EED;&#x8FDB;&#x884C;&#x7684;&#xFF0C;&#x6BCF;&#x5B8C;&#x6210;&#x4E00;&#x4E2A;&#x4EFB;&#x52A1;&#x90FD;&#x4F1A;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x800C;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x5C31;&#x88AB;&#x79F0;&#x4E3A;<code>Event Loop</code>&#x3002;_(&#x8FD9;&#x662F;&#x4E2A;&#x975E;&#x5E38;&#x7B80;&#x6613;&#x7684;&#x63CF;&#x8FF0;&#x4E86;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4F1A;&#x590D;&#x6742;&#x5F88;&#x591A;)_</p><p>&#x800C;&#x4E14;&#x5C31;&#x5982;&#x540C;&#x4E0A;&#x8FB9;&#x6240;&#x8BF4;&#x7684;&#xFF0C;&#x4E00;&#x4E2A;&#x67DC;&#x5458;&#x540C;&#x4E00;&#x65F6;&#x95F4;&#x53EA;&#x80FD;&#x5904;&#x7406;&#x4E00;&#x4EF6;&#x4E8B;&#x60C5;&#xFF0C;&#x5373;&#x4FBF;&#x8FD9;&#x4E9B;&#x4E8B;&#x60C5;&#x662F;&#x4E00;&#x4E2A;&#x5BA2;&#x6237;&#x6240;&#x63D0;&#x51FA;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x5FAE;&#x4EFB;&#x52A1;&#x4E5F;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x961F;&#x5217;&#xFF0C;&#x5927;&#x81F4;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x903B;&#x8F91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const macroTaskList = [
  [&apos;task1&apos;],
  [&apos;task2&apos;, &apos;task3&apos;],
  [&apos;task4&apos;],
]

for (let macroIndex = 0; macroIndex &lt; macroTaskList.length; macroIndex++) {
  const microTaskList = macroTaskList[macroIndex]
  
  for (let microIndex = 0; microIndex &lt; microTaskList.length; microIndex++) {
    const microTask = microTaskList[microIndex]

    // &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5FAE;&#x4EFB;&#x52A1;
    if (microIndex === 1) microTaskList.push(&apos;special micro task&apos;)
    
    // &#x6267;&#x884C;&#x4EFB;&#x52A1;
    console.log(microTask)
  }

  // &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;
  if (macroIndex === 2) macroTaskList.push([&apos;special macro task&apos;])
}

// &gt; task1
// &gt; task2
// &gt; task3
// &gt; special micro task
// &gt; task4
// &gt; special macro task" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> macroTaskList = [
  [<span class="hljs-string">&apos;task1&apos;</span>],
  [<span class="hljs-string">&apos;task2&apos;</span>, <span class="hljs-string">&apos;task3&apos;</span>],
  [<span class="hljs-string">&apos;task4&apos;</span>],
]

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> macroIndex = <span class="hljs-number">0</span>; macroIndex &lt; macroTaskList.length; macroIndex++) {
  <span class="hljs-keyword">const</span> microTaskList = macroTaskList[macroIndex]
  
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> microIndex = <span class="hljs-number">0</span>; microIndex &lt; microTaskList.length; microIndex++) {
    <span class="hljs-keyword">const</span> microTask = microTaskList[microIndex]

    <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5FAE;&#x4EFB;&#x52A1;</span>
    <span class="hljs-keyword">if</span> (microIndex === <span class="hljs-number">1</span>) microTaskList.push(<span class="hljs-string">&apos;special micro task&apos;</span>)
    
    <span class="hljs-comment">// &#x6267;&#x884C;&#x4EFB;&#x52A1;</span>
    <span class="hljs-built_in">console</span>.log(microTask)
  }

  <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;</span>
  <span class="hljs-keyword">if</span> (macroIndex === <span class="hljs-number">2</span>) macroTaskList.push([<span class="hljs-string">&apos;special macro task&apos;</span>])
}

<span class="hljs-comment">// &gt; task1</span>
<span class="hljs-comment">// &gt; task2</span>
<span class="hljs-comment">// &gt; task3</span>
<span class="hljs-comment">// &gt; special micro task</span>
<span class="hljs-comment">// &gt; task4</span>
<span class="hljs-comment">// &gt; special macro task</span></code></pre><p><em>&#x4E4B;&#x6240;&#x4EE5;&#x4F7F;&#x7528;&#x4E24;&#x4E2A;<code>for</code>&#x5FAA;&#x73AF;&#x6765;&#x8868;&#x793A;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x5728;&#x5FAA;&#x73AF;&#x5185;&#x90E8;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x8FDB;&#x884C;<code>push</code>&#x4E4B;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#xFF08;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x4EFB;&#x52A1;&#xFF09;&#xFF0C;&#x4ECE;&#x800C;&#x4F7F;&#x8FED;&#x4EE3;&#x7684;&#x6B21;&#x6570;&#x52A8;&#x6001;&#x7684;&#x589E;&#x52A0;&#x3002;</em></p><p>&#x4EE5;&#x53CA;&#x8FD8;&#x8981;&#x660E;&#x786E;&#x7684;&#x662F;&#xFF0C;<code>Event Loop</code>&#x53EA;&#x662F;&#x8D1F;&#x8D23;&#x544A;&#x8BC9;&#x4F60;&#x8BE5;&#x6267;&#x884C;&#x90A3;&#x4E9B;&#x4EFB;&#x52A1;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x54EA;&#x4E9B;&#x56DE;&#x8C03;&#x88AB;&#x89E6;&#x53D1;&#x4E86;&#xFF0C;&#x771F;&#x6B63;&#x7684;&#x903B;&#x8F91;&#x8FD8;&#x662F;&#x5728;&#x8FDB;&#x7A0B;&#x4E2D;&#x6267;&#x884C;&#x7684;&#x3002;</p><h2 id="articleHeader4">&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;&#x8868;&#x73B0;</h2><p>&#x5728;&#x4E0A;&#x8FB9;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x660E;&#x4E86;&#x4E24;&#x79CD;&#x4EFB;&#x52A1;&#x7684;&#x5DEE;&#x522B;&#xFF0C;&#x4EE5;&#x53CA;<code>Event Loop</code>&#x7684;&#x4F5C;&#x7528;&#xFF0C;&#x90A3;&#x4E48;&#x5728;&#x771F;&#x5B9E;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x662F;&#x4EC0;&#x4E48;&#x8868;&#x73B0;&#x5462;&#xFF1F;<br>&#x9996;&#x5148;&#x8981;&#x660E;&#x786E;&#x7684;&#x4E00;&#x70B9;&#x662F;&#xFF0C;&#x5B8F;&#x4EFB;&#x52A1;&#x5FC5;&#x7136;&#x662F;&#x5728;&#x5FAE;&#x4EFB;&#x52A1;&#x4E4B;&#x540E;&#x624D;&#x6267;&#x884C;&#x7684;&#xFF08;&#x56E0;&#x4E3A;&#x5FAE;&#x4EFB;&#x52A1;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5B8F;&#x4EFB;&#x52A1;&#x7684;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x6B65;&#x9AA4;&#xFF09;</p><p><code>I/O</code>&#x8FD9;&#x4E00;&#x9879;&#x611F;&#x89C9;&#x6709;&#x70B9;&#x513F;&#x7B3C;&#x7EDF;&#xFF0C;&#x6709;&#x592A;&#x591A;&#x7684;&#x4E1C;&#x897F;&#x90FD;&#x53EF;&#x4EE5;&#x79F0;&#x4E4B;&#x4E3A;<code>I/O</code>&#xFF0C;&#x70B9;&#x51FB;&#x4E00;&#x6B21;<code>button</code>&#xFF0C;&#x4E0A;&#x4F20;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x4E0E;&#x7A0B;&#x5E8F;&#x4EA7;&#x751F;&#x4EA4;&#x4E92;&#x7684;&#x8FD9;&#x4E9B;&#x90FD;&#x53EF;&#x4EE5;&#x79F0;&#x4E4B;&#x4E3A;<code>I/O</code>&#x3002;</p><p>&#x5047;&#x8BBE;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E9B;<code>DOM</code>&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;style&gt;
  #outer {
    padding: 20px;
    background: #616161;
  }

  #inner {
    width: 100px;
    height: 100px;
    background: #757575;
  }
&lt;/style&gt;
&lt;div id=&quot;outer&quot;&gt;
  &lt;div id=&quot;inner&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  <span class="hljs-selector-id">#outer</span> {
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#616161</span>;
  }

  <span class="hljs-selector-id">#inner</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#757575</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;outer&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;inner&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const $inner = document.querySelector(&apos;#inner&apos;)
const $outer = document.querySelector(&apos;#outer&apos;)

function handler () {
  console.log(&apos;click&apos;) // &#x76F4;&#x63A5;&#x8F93;&#x51FA;

  Promise.resolve().then(_ =&gt; console.log(&apos;promise&apos;)) // &#x6CE8;&#x518C;&#x5FAE;&#x4EFB;&#x52A1;

  setTimeout(_ =&gt; console.log(&apos;timeout&apos;)) // &#x6CE8;&#x518C;&#x5B8F;&#x4EFB;&#x52A1;

  requestAnimationFrame(_ =&gt; console.log(&apos;animationFrame&apos;)) // &#x6CE8;&#x518C;&#x5B8F;&#x4EFB;&#x52A1;

  $outer.setAttribute(&apos;data-random&apos;, Math.random()) // DOM&#x5C5E;&#x6027;&#x4FEE;&#x6539;&#xFF0C;&#x89E6;&#x53D1;&#x5FAE;&#x4EFB;&#x52A1;
}

new MutationObserver(_ =&gt; {
  console.log(&apos;observer&apos;)
}).observe($outer, {
  attributes: true
})

$inner.addEventListener(&apos;click&apos;, handler)
$outer.addEventListener(&apos;click&apos;, handler)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> $inner = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#inner&apos;</span>)
<span class="hljs-keyword">const</span> $outer = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">&apos;#outer&apos;</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;click&apos;</span>) <span class="hljs-comment">// &#x76F4;&#x63A5;&#x8F93;&#x51FA;</span>

  <span class="hljs-built_in">Promise</span>.resolve().then(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;promise&apos;</span>)) <span class="hljs-comment">// &#x6CE8;&#x518C;&#x5FAE;&#x4EFB;&#x52A1;</span>

  setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;timeout&apos;</span>)) <span class="hljs-comment">// &#x6CE8;&#x518C;&#x5B8F;&#x4EFB;&#x52A1;</span>

  requestAnimationFrame(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;animationFrame&apos;</span>)) <span class="hljs-comment">// &#x6CE8;&#x518C;&#x5B8F;&#x4EFB;&#x52A1;</span>

  $outer.setAttribute(<span class="hljs-string">&apos;data-random&apos;</span>, <span class="hljs-built_in">Math</span>.random()) <span class="hljs-comment">// DOM&#x5C5E;&#x6027;&#x4FEE;&#x6539;&#xFF0C;&#x89E6;&#x53D1;&#x5FAE;&#x4EFB;&#x52A1;</span>
}

<span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;observer&apos;</span>)
}).observe($outer, {
  <span class="hljs-attr">attributes</span>: <span class="hljs-literal">true</span>
})

$inner.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, handler)
$outer.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, handler)</code></pre><p>&#x5982;&#x679C;&#x70B9;&#x51FB;<code>#inner</code>&#xFF0C;&#x5176;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E00;&#x5B9A;&#x662F;&#xFF1A;<code>click</code> -&gt; <code>promise</code> -&gt; <code>observer</code> -&gt; <code>click</code> -&gt; <code>promise</code> -&gt; <code>observer</code> -&gt; <code>animationFrame</code> -&gt; <code>animationFrame</code> -&gt; <code>timeout</code> -&gt; <code>timeout</code>&#x3002;</p><p>&#x56E0;&#x4E3A;&#x4E00;&#x6B21;<code>I/O</code>&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5728;&#x8FD9;&#x6B21;&#x4EFB;&#x52A1;&#x4E2D;&#x4F1A;&#x53BB;&#x89E6;&#x53D1;<code>handler</code>&#x3002;<br>&#x6309;&#x7167;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x6CE8;&#x91CA;&#xFF0C;&#x5728;&#x540C;&#x6B65;&#x7684;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x5B8C;&#x4EE5;&#x540E;&#xFF0C;&#x8FD9;&#x65F6;&#x5C31;&#x4F1A;&#x53BB;&#x67E5;&#x770B;&#x662F;&#x5426;&#x6709;&#x5FAE;&#x4EFB;&#x52A1;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#xFF0C;&#x7136;&#x540E;&#x53D1;&#x73B0;&#x4E86;<code>Promise</code>&#x548C;<code>MutationObserver</code>&#x4E24;&#x4E2A;&#x5FAE;&#x4EFB;&#x52A1;&#xFF0C;&#x9042;&#x6267;&#x884C;&#x4E4B;&#x3002;<br>&#x56E0;&#x4E3A;<code>click</code>&#x4E8B;&#x4EF6;&#x4F1A;&#x5192;&#x6CE1;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x5E94;&#x7684;&#x8FD9;&#x6B21;<code>I/O</code>&#x4F1A;&#x89E6;&#x53D1;&#x4E24;&#x6B21;<code>handler</code>&#x51FD;&#x6570;(_&#x4E00;&#x6B21;&#x5728;<code>inner</code>&#x3001;&#x4E00;&#x6B21;&#x5728;<code>outer</code>_)&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x4F18;&#x5148;&#x6267;&#x884C;&#x5192;&#x6CE1;&#x7684;&#x4E8B;&#x4EF6;(_&#x65E9;&#x4E8E;&#x5176;&#x4ED6;&#x7684;&#x5B8F;&#x4EFB;&#x52A1;_)&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4F1A;&#x91CD;&#x590D;&#x4E0A;&#x8FF0;&#x7684;&#x903B;&#x8F91;&#x3002;<br>&#x5728;&#x6267;&#x884C;&#x5B8C;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x4E0E;&#x5FAE;&#x4EFB;&#x52A1;&#x4EE5;&#x540E;&#xFF0C;&#x8FD9;&#x65F6;&#x7EE7;&#x7EED;&#x5411;&#x540E;&#x67E5;&#x627E;&#x6709;&#x6728;&#x6709;&#x5B8F;&#x4EFB;&#x52A1;&#x3002;<br>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x4E00;&#x70B9;&#x662F;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x89E6;&#x53D1;&#x4E86;<code>setAttribute</code>&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x4FEE;&#x6539;&#x4E86;<code>DOM</code>&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4F1A;&#x5BFC;&#x81F4;&#x9875;&#x9762;&#x7684;&#x91CD;&#x7ED8;&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;<code>set</code>&#x7684;&#x64CD;&#x4F5C;&#x662F;&#x540C;&#x6B65;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;<code>requestAnimationFrame</code>&#x7684;&#x56DE;&#x8C03;&#x4F1A;&#x65E9;&#x4E8E;<code>setTimeout</code>&#x6240;&#x6267;&#x884C;&#x3002;</p><h3 id="articleHeader5">&#x4E00;&#x4E9B;&#x5C0F;&#x60CA;&#x559C;</h3><p>&#x4F7F;&#x7528;&#x4E0A;&#x8FF0;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#xFF0C;&#x5982;&#x679C;&#x5C06;&#x624B;&#x52A8;&#x70B9;&#x51FB;<code>DOM</code>&#x5143;&#x7D20;&#x7684;&#x89E6;&#x53D1;&#x65B9;&#x5F0F;&#x53D8;&#x4E3A;<code>$inner.click()</code>&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x5F97;&#x5230;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x7ED3;&#x679C;&#x3002;<br>&#x5728;<code>Chrome</code>&#x4E0B;&#x7684;&#x8F93;&#x51FA;&#x987A;&#x5E8F;&#x5927;&#x81F4;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;<br><code>click</code> -&gt; <code>click</code> -&gt; <code>promise</code> -&gt; <code>observer</code> -&gt; <code>promise</code> -&gt; <code>animationFrame</code> -&gt; <code>animationFrame</code> -&gt; <code>timeout</code> -&gt; <code>timeout</code>&#x3002;</p><p>&#x4E0E;&#x6211;&#x4EEC;&#x624B;&#x52A8;&#x89E6;&#x53D1;<code>click</code>&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x539F;&#x56E0;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x56E0;&#x4E3A;&#x5E76;&#x4E0D;&#x662F;&#x7528;&#x6237;&#x901A;&#x8FC7;&#x70B9;&#x51FB;&#x5143;&#x7D20;&#x5B9E;&#x73B0;&#x7684;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x800C;&#x662F;&#x7C7B;&#x4F3C;<code>dispatchEvent</code>&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x5E76;&#x4E0D;&#x80FD;&#x7B97;&#x662F;&#x4E00;&#x4E2A;&#x6709;&#x6548;&#x7684;<code>I/O</code>&#xFF0C;&#x5728;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x6B21;<code>handler</code>&#x56DE;&#x8C03;&#x6CE8;&#x518C;&#x4E86;&#x5FAE;&#x4EFB;&#x52A1;&#x3001;&#x6CE8;&#x518C;&#x4E86;&#x5B8F;&#x4EFB;&#x52A1;&#x4EE5;&#x540E;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5916;&#x8FB9;&#x7684;<code>$inner.click()</code>&#x5E76;&#x6CA1;&#x6709;&#x6267;&#x884C;&#x5B8C;&#x3002;<br>&#x6240;&#x4EE5;&#x5728;&#x5FAE;&#x4EFB;&#x52A1;&#x6267;&#x884C;&#x4E4B;&#x524D;&#xFF0C;&#x8FD8;&#x8981;&#x7EE7;&#x7EED;&#x5192;&#x6CE1;&#x6267;&#x884C;&#x4E0B;&#x4E00;&#x6B21;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x89E6;&#x53D1;&#x4E86;&#x7B2C;&#x4E8C;&#x6B21;&#x7684;<code>handler</code>&#x3002;<br>&#x6240;&#x4EE5;&#x8F93;&#x51FA;&#x4E86;&#x7B2C;&#x4E8C;&#x6B21;<code>click</code>&#xFF0C;&#x7B49;&#x5230;&#x8FD9;&#x4E24;&#x6B21;<code>handler</code>&#x90FD;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x624D;&#x4F1A;&#x53BB;&#x68C0;&#x67E5;&#x6709;&#x6CA1;&#x6709;&#x5FAE;&#x4EFB;&#x52A1;&#x3001;&#x6709;&#x6CA1;&#x6709;&#x5B8F;&#x4EFB;&#x52A1;&#x3002;</p><p>&#x4E24;&#x70B9;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#xFF1A;</p><ol><li><code>.click()</code>&#x7684;&#x8FD9;&#x79CD;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x662F;&#x7C7B;&#x4F3C;<code>dispatchEvent</code>&#xFF0C;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x540C;&#x6B65;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.addEventListener(&apos;click&apos;, _ =&gt; console.log(&apos;click&apos;))

document.body.click()
document.body.dispatchEvent(new Event(&apos;click&apos;))
console.log(&apos;done&apos;)

// &gt; click
// &gt; click
// &gt; done" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">&apos;click&apos;</span>, _ =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;click&apos;</span>))

<span class="hljs-built_in">document</span>.body.click()
<span class="hljs-built_in">document</span>.body.dispatchEvent(<span class="hljs-keyword">new</span> Event(<span class="hljs-string">&apos;click&apos;</span>))
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;done&apos;</span>)

<span class="hljs-comment">// &gt; click</span>
<span class="hljs-comment">// &gt; click</span>
<span class="hljs-comment">// &gt; done</span></code></pre><ol><li><code>MutationObserver</code>&#x7684;&#x76D1;&#x542C;&#x4E0D;&#x4F1A;&#x8BF4;&#x540C;&#x65F6;&#x89E6;&#x53D1;&#x591A;&#x6B21;&#xFF0C;&#x591A;&#x6B21;&#x4FEE;&#x6539;&#x53EA;&#x4F1A;&#x6709;&#x4E00;&#x6B21;&#x56DE;&#x8C03;&#x88AB;&#x89E6;&#x53D1;&#x3002;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new MutationObserver(_ =&gt; {
  console.log(&apos;observer&apos;)
  // &#x5982;&#x679C;&#x5728;&#x8FD9;&#x8F93;&#x51FA;DOM&#x7684;data-random&#x5C5E;&#x6027;&#xFF0C;&#x5FC5;&#x7136;&#x662F;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x7684;&#x503C;&#xFF0C;&#x4E0D;&#x89E3;&#x91CA;&#x4E86;
}).observe(document.body, {
  attributes: true
})

document.body.setAttribute(&apos;data-random&apos;, Math.random())
document.body.setAttribute(&apos;data-random&apos;, Math.random())
document.body.setAttribute(&apos;data-random&apos;, Math.random())

// &#x53EA;&#x4F1A;&#x8F93;&#x51FA;&#x4E00;&#x6B21; ovserver" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> MutationObserver(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;observer&apos;</span>)
  <span class="hljs-comment">// &#x5982;&#x679C;&#x5728;&#x8FD9;&#x8F93;&#x51FA;DOM&#x7684;data-random&#x5C5E;&#x6027;&#xFF0C;&#x5FC5;&#x7136;&#x662F;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x7684;&#x503C;&#xFF0C;&#x4E0D;&#x89E3;&#x91CA;&#x4E86;</span>
}).observe(<span class="hljs-built_in">document</span>.body, {
  <span class="hljs-attr">attributes</span>: <span class="hljs-literal">true</span>
})

<span class="hljs-built_in">document</span>.body.setAttribute(<span class="hljs-string">&apos;data-random&apos;</span>, <span class="hljs-built_in">Math</span>.random())
<span class="hljs-built_in">document</span>.body.setAttribute(<span class="hljs-string">&apos;data-random&apos;</span>, <span class="hljs-built_in">Math</span>.random())
<span class="hljs-built_in">document</span>.body.setAttribute(<span class="hljs-string">&apos;data-random&apos;</span>, <span class="hljs-built_in">Math</span>.random())

<span class="hljs-comment">// &#x53EA;&#x4F1A;&#x8F93;&#x51FA;&#x4E00;&#x6B21; ovserver</span></code></pre><p><em>&#x8FD9;&#x5C31;&#x50CF;&#x53BB;&#x996D;&#x5E97;&#x70B9;&#x9910;&#xFF0C;&#x670D;&#x52A1;&#x5458;&#x558A;&#x4E86;&#x4E09;&#x6B21;&#xFF0C;XX&#x53F7;&#x7684;&#x725B;&#x8089;&#x9762;&#xFF0C;&#x4E0D;&#x4EE3;&#x8868;&#x5979;&#x4F1A;&#x7ED9;&#x4F60;&#x4E09;&#x7897;&#x725B;&#x8089;&#x9762;&#x3002;</em><br><em>&#x4E0A;&#x8FF0;&#x89C2;&#x70B9;&#x53C2;&#x9605;&#x81EA;<a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/#level-1-bossfight" rel="nofollow noreferrer" target="_blank">Tasks, microtasks, queues and schedules</a>&#xFF0C;&#x6587;&#x4E2D;&#x6709;&#x52A8;&#x753B;&#x7248;&#x7684;&#x8BB2;&#x89E3;</em></p><h2 id="articleHeader6">&#x5728;Node&#x4E2D;&#x7684;&#x8868;&#x73B0;</h2><p>Node&#x4E5F;&#x662F;&#x5355;&#x7EBF;&#x7A0B;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x5904;&#x7406;<code>Event Loop</code>&#x4E0A;&#x4E0E;&#x6D4F;&#x89C8;&#x5668;&#x7A0D;&#x5FAE;&#x6709;&#x4E9B;&#x4E0D;&#x540C;&#xFF0C;&#x8FD9;&#x91CC;&#x662F;<a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#event-loop-explained" rel="nofollow noreferrer" target="_blank">Node&#x5B98;&#x65B9;&#x6587;&#x6863;</a>&#x7684;&#x5730;&#x5740;&#x3002;</p><p>&#x5C31;&#x5355;&#x4ECE;API&#x5C42;&#x9762;&#x4E0A;&#x6765;&#x7406;&#x89E3;&#xFF0C;Node&#x65B0;&#x589E;&#x4E86;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x4F7F;&#x7528;&#xFF1A;&#x5FAE;&#x4EFB;&#x52A1;&#x7684;<code>process.nextTick</code>&#x4EE5;&#x53CA;&#x5B8F;&#x4EFB;&#x52A1;&#x7684;<code>setImmediate</code>&#x3002;</p><h3 id="articleHeader7">setImmediate&#x4E0E;setTimeout&#x7684;&#x533A;&#x522B;</h3><p>&#x5728;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x5B9A;&#x4E49;&#xFF0C;<code>setImmediate</code>&#x4E3A;&#x4E00;&#x6B21;<code>Event Loop</code>&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#x8C03;&#x7528;&#x3002;<br><code>setTimeout</code>&#x5219;&#x662F;&#x901A;&#x8FC7;&#x8BA1;&#x7B97;&#x4E00;&#x4E2A;&#x5EF6;&#x8FDF;&#x65F6;&#x95F4;&#x540E;&#x8FDB;&#x884C;&#x6267;&#x884C;&#x3002;</p><p>&#x4F46;&#x662F;&#x540C;&#x65F6;&#x8FD8;&#x63D0;&#x5230;&#x4E86;&#x5982;&#x679C;&#x5728;&#x4E3B;&#x8FDB;&#x7A0B;&#x4E2D;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x8FD9;&#x4E24;&#x4E2A;&#x64CD;&#x4F5C;&#xFF0C;&#x5F88;&#x96BE;&#x4FDD;&#x8BC1;&#x54EA;&#x4E2A;&#x4F1A;&#x5148;&#x89E6;&#x53D1;&#x3002;<br>&#x56E0;&#x4E3A;&#x5982;&#x679C;&#x4E3B;&#x8FDB;&#x7A0B;&#x4E2D;&#x5148;&#x6CE8;&#x518C;&#x4E86;&#x4E24;&#x4E2A;&#x4EFB;&#x52A1;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;&#x7684;&#x4EE3;&#x7801;&#x8017;&#x65F6;&#x8D85;&#x8FC7;<code>XXs</code>&#xFF0C;&#x800C;&#x8FD9;&#x65F6;&#x5B9A;&#x65F6;&#x5668;&#x5DF2;&#x7ECF;&#x5904;&#x4E8E;&#x53EF;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x7684;&#x72B6;&#x6001;&#x4E86;&#x3002;<br>&#x6240;&#x4EE5;&#x4F1A;&#x5148;&#x6267;&#x884C;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x800C;&#x6267;&#x884C;&#x5B8C;&#x5B9A;&#x65F6;&#x5668;&#x4EE5;&#x540E;&#x624D;&#x662F;&#x7ED3;&#x675F;&#x4E86;&#x4E00;&#x6B21;<code>Event Loop</code>&#xFF0C;&#x8FD9;&#x65F6;&#x624D;&#x4F1A;&#x6267;&#x884C;<code>setImmediate</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(_ =&gt; console.log(&apos;setTimeout&apos;))
setImmediate(_ =&gt; console.log(&apos;setImmediate&apos;))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setTimeout&apos;</span>))
setImmediate(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setImmediate&apos;</span>))</code></pre><p>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x81EA;&#x5DF1;&#x8BD5;&#x9A8C;&#x4E00;&#x4E0B;&#xFF0C;&#x6267;&#x884C;&#x591A;&#x6B21;&#x771F;&#x7684;&#x4F1A;&#x5F97;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x7ED3;&#x679C;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbfoeo?w=510&amp;h=854" src="https://static.alili.tech/img/bVbfoeo?w=510&amp;h=854" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4F46;&#x662F;&#x5982;&#x679C;&#x540E;&#x7EED;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#x4EE5;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;<code>setTimeout</code>&#x4E00;&#x5B9A;&#x4F1A;&#x5728;<code>setImmediate</code>&#x4E4B;&#x524D;&#x89E6;&#x53D1;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(_ =&gt; console.log(&apos;setTimeout&apos;))
setImmediate(_ =&gt; console.log(&apos;setImmediate&apos;))

let countdown = 1e9

while(countdown--) { } // &#x6211;&#x4EEC;&#x786E;&#x4FDD;&#x8FD9;&#x4E2A;&#x5FAA;&#x73AF;&#x7684;&#x6267;&#x884C;&#x901F;&#x5EA6;&#x4F1A;&#x8D85;&#x8FC7;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x5012;&#x8BA1;&#x65F6;&#xFF0C;&#x5BFC;&#x81F4;&#x8FD9;&#x8F6E;&#x5FAA;&#x73AF;&#x6CA1;&#x6709;&#x7ED3;&#x675F;&#x65F6;&#xFF0C;setTimeout&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x5148;&#x6267;&#x884C;`setTimeout`&#x518D;&#x7ED3;&#x675F;&#x8FD9;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5F00;&#x59CB;&#x6267;&#x884C;`setImmediate`" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setTimeout&apos;</span>))
setImmediate(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;setImmediate&apos;</span>))

<span class="hljs-keyword">let</span> countdown = <span class="hljs-number">1e9</span>

<span class="hljs-keyword">while</span>(countdown--) { } <span class="hljs-comment">// &#x6211;&#x4EEC;&#x786E;&#x4FDD;&#x8FD9;&#x4E2A;&#x5FAA;&#x73AF;&#x7684;&#x6267;&#x884C;&#x901F;&#x5EA6;&#x4F1A;&#x8D85;&#x8FC7;&#x5B9A;&#x65F6;&#x5668;&#x7684;&#x5012;&#x8BA1;&#x65F6;&#xFF0C;&#x5BFC;&#x81F4;&#x8FD9;&#x8F6E;&#x5FAA;&#x73AF;&#x6CA1;&#x6709;&#x7ED3;&#x675F;&#x65F6;&#xFF0C;setTimeout&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x5148;&#x6267;&#x884C;`setTimeout`&#x518D;&#x7ED3;&#x675F;&#x8FD9;&#x4E00;&#x8F6E;&#x5FAA;&#x73AF;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x5F00;&#x59CB;&#x6267;&#x884C;`setImmediate`</span></code></pre><p>&#x5982;&#x679C;&#x5728;&#x53E6;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x4E2D;&#xFF0C;&#x5FC5;&#x7136;&#x662F;<code>setImmediate</code>&#x5148;&#x6267;&#x884C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&apos;fs&apos;).readFile(__dirname, _ =&gt; {
  setTimeout(_ =&gt; console.log(&apos;timeout&apos;))
  setImmediate(_ =&gt; console.log(&apos;immediate&apos;))
})

// &#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x8BBE;&#x7F6E;&#x4E86;&#x5EF6;&#x8FDF;&#x7684;setTimeout&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x6548;&#x679C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>).readFile(__dirname, _ =&gt; {
  setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;timeout&apos;</span>))
  setImmediate(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;immediate&apos;</span>))
})

<span class="hljs-comment">// &#x5982;&#x679C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x8BBE;&#x7F6E;&#x4E86;&#x5EF6;&#x8FDF;&#x7684;setTimeout&#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x6548;&#x679C;</span></code></pre><h3 id="articleHeader8">process.nextTick</h3><p>&#x5C31;&#x50CF;&#x4E0A;&#x8FB9;&#x8BF4;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x4E8E;<code>Promise</code>&#x548C;<code>MutationObserver</code>&#x7684;&#x5FAE;&#x4EFB;&#x52A1;&#x5B9E;&#x73B0;&#xFF0C;&#x5728;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x63D2;&#x5165;<code>nextTick</code>&#xFF0C;&#x5E76;&#x4E14;&#x4F1A;&#x4FDD;&#x8BC1;&#x5728;&#x4E0B;&#x4E00;&#x4E2A;&#x5B8F;&#x4EFB;&#x52A1;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#x6240;&#x6267;&#x884C;&#x3002;</p><p>&#x5728;&#x4F7F;&#x7528;&#x65B9;&#x9762;&#x7684;&#x4E00;&#x4E2A;&#x6700;&#x5E38;&#x89C1;&#x7684;&#x4F8B;&#x5B50;&#x5C31;&#x662F;&#x4E00;&#x4E9B;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#x7C7B;&#x7684;&#x64CD;&#x4F5C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lib extends require(&apos;events&apos;).EventEmitter {
  constructor () {
    super()

    this.emit(&apos;init&apos;)
  }
}

const lib = new Lib()

lib.on(&apos;init&apos;, _ =&gt; {
  // &#x8FD9;&#x91CC;&#x5C06;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x6267;&#x884C;
  console.log(&apos;init!&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lib</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">require</span>(&apos;<span class="hljs-title">events</span>&apos;).<span class="hljs-title">EventEmitter</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">super</span>()

    <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">&apos;init&apos;</span>)
  }
}

<span class="hljs-keyword">const</span> lib = <span class="hljs-keyword">new</span> Lib()

lib.on(<span class="hljs-string">&apos;init&apos;</span>, _ =&gt; {
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C06;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x6267;&#x884C;</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;init!&apos;</span>)
})</code></pre><p>&#x56E0;&#x4E3A;&#x4E0A;&#x8FF0;&#x7684;&#x4EE3;&#x7801;&#x5728;&#x5B9E;&#x4F8B;&#x5316;<code>Lib</code>&#x5BF9;&#x8C61;&#x65F6;&#x662F;&#x540C;&#x6B65;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x5B8C;&#x6210;&#x4EE5;&#x540E;&#x5C31;&#x7ACB;&#x9A6C;&#x53D1;&#x9001;&#x4E86;<code>init</code>&#x4E8B;&#x4EF6;&#x3002;<br>&#x800C;&#x8FD9;&#x65F6;&#x5728;&#x5916;&#x5C42;&#x7684;&#x4E3B;&#x7A0B;&#x5E8F;&#x8FD8;&#x6CA1;&#x6709;&#x5F00;&#x59CB;&#x6267;&#x884C;&#x5230;<code>lib.on(&apos;init&apos;)</code>&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x7684;&#x8FD9;&#x4E00;&#x6B65;&#x3002;<br>&#x6240;&#x4EE5;&#x4F1A;&#x5BFC;&#x81F4;&#x53D1;&#x9001;&#x4E8B;&#x4EF6;&#x65F6;&#x6CA1;&#x6709;&#x56DE;&#x8C03;&#xFF0C;&#x56DE;&#x8C03;&#x6CE8;&#x518C;&#x540E;&#x4E8B;&#x4EF6;&#x4E0D;&#x4F1A;&#x518D;&#x6B21;&#x53D1;&#x9001;&#x3002;</p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x677E;&#x7684;&#x4F7F;&#x7528;<code>process.nextTick</code>&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Lib extends require(&apos;events&apos;).EventEmitter {
  constructor () {
    super()

    process.nextTick(_ =&gt; {
      this.emit(&apos;init&apos;)
    })

    // &#x540C;&#x7406;&#x4F7F;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x5FAE;&#x4EFB;&#x52A1;
    // &#x6BD4;&#x5982;Promise.resolve().then(_ =&gt; this.emit(&apos;init&apos;))
    // &#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x6548;&#x679C;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Lib</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">require</span>(&apos;<span class="hljs-title">events</span>&apos;).<span class="hljs-title">EventEmitter</span> </span>{
  <span class="hljs-keyword">constructor</span> () {
    <span class="hljs-keyword">super</span>()

    process.nextTick(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">&apos;init&apos;</span>)
    })

    <span class="hljs-comment">// &#x540C;&#x7406;&#x4F7F;&#x7528;&#x5176;&#x4ED6;&#x7684;&#x5FAE;&#x4EFB;&#x52A1;</span>
    <span class="hljs-comment">// &#x6BD4;&#x5982;Promise.resolve().then(_ =&gt; this.emit(&apos;init&apos;))</span>
    <span class="hljs-comment">// &#x4E5F;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x7684;&#x6548;&#x679C;</span>
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x4F1A;&#x5728;&#x4E3B;&#x8FDB;&#x7A0B;&#x7684;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x5B8C;&#x6BD5;&#x540E;&#xFF0C;&#x7A0B;&#x5E8F;&#x7A7A;&#x95F2;&#x65F6;&#x89E6;&#x53D1;<code>Event Loop</code>&#x6D41;&#x7A0B;&#x67E5;&#x627E;&#x6709;&#x6CA1;&#x6709;&#x5FAE;&#x4EFB;&#x52A1;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x53D1;&#x9001;<code>init</code>&#x4E8B;&#x4EF6;&#x3002;</p><p><em>&#x5173;&#x4E8E;&#x6709;&#x4E9B;&#x6587;&#x7AE0;&#x4E2D;&#x63D0;&#x5230;&#x7684;&#xFF0C;&#x5FAA;&#x73AF;&#x8C03;&#x7528;<code>process.nextTick</code>&#x4F1A;&#x5BFC;&#x81F4;&#x62A5;&#x8B66;&#xFF0C;&#x540E;&#x7EED;&#x7684;&#x4EE3;&#x7801;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x88AB;&#x6267;&#x884C;&#xFF0C;&#x8FD9;&#x662F;&#x5BF9;&#x7684;&#xFF0C;&#x53C2;&#x89C1;&#x4E0A;&#x8FB9;&#x4F7F;&#x7528;&#x7684;&#x53CC;&#x91CD;&#x5FAA;&#x73AF;&#x5B9E;&#x73B0;&#x7684;<code>loop</code>&#x5373;&#x53EF;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x5728;&#x6BCF;&#x6B21;<code>for</code>&#x5FAA;&#x73AF;&#x6267;&#x884C;&#x4E2D;&#x90FD;&#x5BF9;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x4E86;<code>push</code>&#x64CD;&#x4F5C;&#xFF0C;&#x8FD9;&#x6837;&#x5FAA;&#x73AF;&#x6C38;&#x8FDC;&#x4E5F;&#x4E0D;&#x4F1A;&#x7ED3;&#x675F;</em></p><h2 id="articleHeader9">&#x591A;&#x63D0;&#x4E00;&#x5634;async/await&#x51FD;&#x6570;</h2><p>&#x56E0;&#x4E3A;&#xFF0C;<code>async/await</code>&#x672C;&#x8D28;&#x4E0A;&#x8FD8;&#x662F;&#x57FA;&#x4E8E;<code>Promise</code>&#x7684;&#x4E00;&#x4E9B;&#x5C01;&#x88C5;&#xFF0C;&#x800C;<code>Promise</code>&#x662F;&#x5C5E;&#x4E8E;&#x5FAE;&#x4EFB;&#x52A1;&#x7684;&#x4E00;&#x79CD;&#x3002;&#x6240;&#x4EE5;&#x5728;&#x4F7F;&#x7528;<code>await</code>&#x5173;&#x952E;&#x5B57;&#x4E0E;<code>Promise.then</code>&#x6548;&#x679C;&#x7C7B;&#x4F3C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(_ =&gt; console.log(4))

async function main() {
  console.log(1)
  await Promise.resolve()
  console.log(3)
}

main()

console.log(2)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">setTimeout(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>))

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.resolve()
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>)
}

main()

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>)</code></pre><p><strong>async&#x51FD;&#x6570;&#x5728;await&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x540C;&#x6B65;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;await&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7801;&#x5C5E;&#x4E8E;<code>new Promise</code>&#x65F6;&#x4F20;&#x5165;&#x7684;&#x4EE3;&#x7801;&#xFF0C;await&#x4E4B;&#x540E;&#x7684;&#x6240;&#x6709;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x5728;<code>Promise.then</code>&#x4E2D;&#x7684;&#x56DE;&#x8C03;</strong></p><h2 id="articleHeader10">&#x5C0F;&#x8282;</h2><p>JavaScript&#x7684;&#x4EE3;&#x7801;&#x8FD0;&#x884C;&#x673A;&#x5236;&#x5728;&#x7F51;&#x4E0A;&#x6709;&#x597D;&#x591A;&#x6587;&#x7AE0;&#x90FD;&#x5199;&#xFF0C;&#x672C;&#x4EBA;&#x9053;&#x884C;&#x592A;&#x6D45;&#xFF0C;&#x53EA;&#x80FD;&#x7B80;&#x5355;&#x7684;&#x8BF4;&#x4E00;&#x4E0B;&#x81EA;&#x5DF1;&#x5BF9;&#x5176;&#x7684;&#x7406;&#x89E3;&#x3002;<br>&#x5E76;&#x6CA1;&#x6709;&#x53BB;&#x751F;&#x62A0;&#x6587;&#x6863;&#xFF0C;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x7684;&#x5217;&#x51FA;&#x6765;&#xFF0C;&#x50CF;&#x4EC0;&#x4E48;&#x67E5;&#x770B;&#x5F53;&#x524D;&#x6808;&#x3001;&#x6267;&#x884C;&#x9009;&#x4E2D;&#x7684;&#x4EFB;&#x52A1;&#x961F;&#x5217;&#xFF0C;&#x5404;&#x79CD;balabala&#x3002;<br>&#x611F;&#x89C9;&#x5BF9;&#x5B9E;&#x9645;&#x5199;&#x4EE3;&#x7801;&#x6CA1;&#x6709;&#x592A;&#x5927;&#x5E2E;&#x52A9;&#xFF0C;&#x4E0D;&#x5982;&#x7B80;&#x5355;&#x7684;&#x5165;&#x4E2A;&#x95E8;&#xFF0C;&#x626B;&#x4E2A;&#x76F2;&#xFF0C;&#x5927;&#x81F4;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;&#x8FD9;&#x662F;&#x4E2A;&#x4EC0;&#x4E48;&#x4E1C;&#x897F;&#x5C31;&#x597D;&#x4E86;&#x3002;</p><p>&#x63A8;&#x8350;&#x51E0;&#x7BC7;&#x53C2;&#x9605;&#x7684;&#x6587;&#x7AE0;&#xFF1A;</p><ul><li><a href="https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules" rel="nofollow noreferrer" target="_blank">tasks-microtasks-queues-and-schedules</a></li><li><a href="https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40" rel="nofollow noreferrer" target="_blank">understanding-js-the-event-loop</a></li><li><a href="https://www.oschina.net/translate/understanding-process-next-tick" rel="nofollow noreferrer" target="_blank">&#x7406;&#x89E3;Node.js&#x91CC;&#x7684;process.nextTick()</a></li><li><a href="https://html.spec.whatwg.org/multipage/webappapis.html" rel="nofollow noreferrer" target="_blank">&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;EventLoop&#x8BF4;&#x660E;&#x6587;&#x6863;</a></li><li><a href="https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick" rel="nofollow noreferrer" target="_blank">Node&#x4E2D;&#x7684;EventLoop&#x8BF4;&#x660E;&#x6587;&#x6863;</a></li><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame" rel="nofollow noreferrer" target="_blank">requestAnimationFrame | MDN</a></li><li><a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver" rel="nofollow noreferrer" target="_blank">MutationObserver | MDN</a></li></ul><h3 id="articleHeader11">One more things</h3><p>Blued&#x524D;&#x7AEF;/Node&#x56E2;&#x961F;&#x62DB;&#x4EBA;&#x3002;&#x3002;&#x521D;&#x4E2D;&#x9AD8;&#x90FD;&#x6709;HC<br>&#x5750;&#x6807;&#x5E1D;&#x90FD;&#x671D;&#x9633;&#x53CC;&#x4E95;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x8BF7;&#x8054;&#x7CFB;&#x6211;&#xFF1A;<br>wechat&#xFF1A; github_jiasm<br>mail&#xFF1A; jiashunming@blued.com</p><p>&#x6B22;&#x8FCE;&#x7838;&#x7B80;&#x5386;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微任务、宏任务与Event-Loop

## 原文链接
[https://segmentfault.com/a/1190000016022069](https://segmentfault.com/a/1190000016022069)


---
title: Promise到底解决了什么问题？
hidden: true
categories: reprint
slug: 5de28baf
date: 2018-10-27 02:30:16
---

{{< raw >}}
<p>&#x6211;&#x7684;github&#x535A;&#x5BA2; <a href="https://github.com/zhuanyongxigua/blog" rel="nofollow noreferrer" target="_blank">https://github.com/zhuanyongxigua/blog</a></p><p>&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;Promise&#x89E3;&#x51B3;&#x4E86;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x7684;&#x95EE;&#x9898;&#x3002;&#x8BF4;&#x5230;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#xFF0C;&#x5F88;&#x5BB9;&#x6613;&#x60F3;&#x5230;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;<strong>&#x5BB9;&#x6613;&#x8BA9;&#x4EBA;&#x4EA7;&#x751F;&#x8BEF;&#x89E3;&#x7684;&#x56FE;&#x7247;</strong>&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016608986?w=721&amp;h=420" src="https://static.alili.tech/img/remote/1460000016608986?w=721&amp;h=420" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><strong>&#x53EF;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x5230;&#x5E95;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&#x5B83;&#x5230;&#x5E95;&#x54EA;&#x91CC;&#x6709;&#x95EE;&#x9898;</strong>&#xFF1F;&#x662F;&#x56E0;&#x4E3A;&#x5D4C;&#x5957;&#x4E0D;&#x597D;&#x770B;&#x8FD8;&#x662F;&#x8BFB;&#x8D77;&#x6765;&#x4E0D;&#x65B9;&#x4FBF;&#xFF1F;</p><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x8981;&#x60F3;&#x60F3;&#xFF0C;<strong>&#x5D4C;&#x5957;&#x5230;&#x5E95;&#x54EA;&#x91CC;&#x6709;&#x95EE;&#x9898;&#xFF1F;</strong></p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function a() {
  function b() {
    function c() {
      function d() {}
      d();
    }
    c();
  }
  b();
}
a();" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">c</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">d</span>(<span class="hljs-params"></span>) </span>{}
      d();
    }
    c();
  }
  b();
}
a();</code></pre><p>&#x8FD9;&#x4E5F;&#x662F;&#x5D4C;&#x5957;&#xFF0C;&#x867D;&#x7136;&#x597D;&#x50CF;&#x4E0D;&#x662F;&#x7279;&#x522B;&#x7F8E;&#x89C2;&#xFF0C;&#x53EF;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x4F1A;&#x89C9;&#x5F97;&#x8FD9;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x5427;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x7ECF;&#x5E38;&#x4F1A;&#x5199;&#x51FA;&#x7C7B;&#x4F3C;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><p>&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x7684;&#x5D4C;&#x5957;&#x7684;&#x95EE;&#x9898;&#x4EC5;&#x4EC5;&#x662F;&#x7F29;&#x8FDB;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x800C;&#x7F29;&#x8FDB;&#x9664;&#x4E86;&#x4F1A;&#x8BA9;&#x4EE3;&#x7801;&#x53D8;&#x5BBD;&#x53EF;&#x80FD;&#x4F1A;&#x9020;&#x6210;&#x8BFB;&#x4EE3;&#x7801;&#x7684;&#x4E00;&#x70B9;&#x4E0D;&#x65B9;&#x4FBF;&#x4E4B;&#x5916;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5176;&#x4ED6;&#x7684;&#x95EE;&#x9898;&#x3002;&#x5982;&#x679C;&#x4EC5;&#x4EC5;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x53EB;&#x201C;&#x7F29;&#x8FDB;&#x5730;&#x72F1;&#x201D;&#x6216;&#x201C;&#x5D4C;&#x5957;&#x5730;&#x72F1;&#x201D;&#xFF1F;</p><p><strong>&#x628A;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x5B8C;&#x5168;&#x7406;&#x89E3;&#x6210;&#x7F29;&#x8FDB;&#x7684;&#x95EE;&#x9898;&#x662F;&#x5E38;&#x89C1;&#x7684;&#x5BF9;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x7684;&#x8BEF;&#x89E3;</strong>&#x3002;&#x8981;&#x56DE;&#x5230;&#x201C;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x201D;&#x8FD9;&#x4E2A;&#x8BCD;&#x8BED;&#x4E0A;&#x9762;&#x6765;&#xFF0C;&#x5B83;&#x7684;&#x91CD;&#x70B9;&#x5C31;&#x5728;&#x4E8E;&#x201C;&#x56DE;&#x8C03;&#x201D;&#xFF0C;&#x800C;&#x201C;&#x56DE;&#x8C03;&#x201D;&#x5728;JS&#x4E2D;&#x5E94;&#x7528;&#x6700;&#x591A;&#x7684;&#x573A;&#x666F;&#x5F53;&#x7136;&#x5C31;&#x662F;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x4E86;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x201C;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x201D;&#x6240;&#x8BF4;&#x7684;&#x5D4C;&#x5957;&#x5176;&#x5B9E;&#x662F;&#x6307;<strong>&#x5F02;&#x6B65;&#x7684;&#x5D4C;&#x5957;</strong>&#x3002;&#x5B83;&#x5E26;&#x6765;&#x4E86;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x53EF;&#x8BFB;&#x6027;&#x7684;&#x95EE;&#x9898;&#x548C;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader0">&#x53EF;&#x8BFB;&#x6027;&#x7684;&#x95EE;&#x9898;</h3><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5728;&#x7F51;&#x4E0A;&#x968F;&#x4FBF;&#x641C;&#x7D22;&#x7684;&#x5173;&#x4E8E;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x7684;&#x9762;&#x8BD5;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i &lt; 5; i++) {
  setTimeout(function() {
    console.log(new Date, i);
  }, 1000);
}

console.log(new Date, i);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>, i);
  }, <span class="hljs-number">1000</span>);
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>, i);</code></pre><p>&#x7B54;&#x6848;&#x662F;&#x4EC0;&#x4E48;&#x5927;&#x5BB6;&#x81EA;&#x5DF1;&#x60F3;&#x5427;&#xFF0C;&#x8FD9;&#x4E0D;&#x662F;&#x91CD;&#x70B9;&#x3002;&#x91CD;&#x70B9;&#x662F;&#xFF0C;&#x4F60;&#x8981;&#x60F3;&#x4E00;&#x4F1A;&#x513F;&#x5427;&#xFF1F;</p><p>&#x4E00;&#x4E2A;&#x6574;&#x6D01;&#x7684;&#x56DE;&#x8C03;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen( &quot;click&quot;, function handler( evt){ 
  setTimeout( function request(){ 
    ajax( &quot;http:// some. url. 1&quot;, function response( text){ 
      if (text == &quot;hello&quot;) { 
        handler(); 
      } else if (text == &quot;world&quot;) { 
        request(); 
      } 
    }); 
  }, 500); 
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">listen( <span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params"> evt</span>)</span>{ 
  setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params"></span>)</span>{ 
    ajax( <span class="hljs-string">&quot;http:// some. url. 1&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">response</span>(<span class="hljs-params"> text</span>)</span>{ 
      <span class="hljs-keyword">if</span> (text == <span class="hljs-string">&quot;hello&quot;</span>) { 
        handler(); 
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (text == <span class="hljs-string">&quot;world&quot;</span>) { 
        request(); 
      } 
    }); 
  }, <span class="hljs-number">500</span>); 
});</code></pre><p>&#x5982;&#x679C;&#x5F02;&#x6B65;&#x7684;&#x5D4C;&#x5957;&#x90FD;&#x662F;&#x8FD9;&#x6837;&#x5E72;&#x51C0;&#x6574;&#x6D01;&#xFF0C;&#x90A3;&#x201C;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x201D;&#x7ED9;&#x7A0B;&#x5E8F;&#x733F;&#x5E26;&#x6765;&#x7684;&#x4F24;&#x5BB3;&#x9A6C;&#x4E0A;&#x5C31;&#x4F1A;&#x51CF;&#x5C11;&#x5F88;&#x591A;&#x3002;</p><p>&#x53EF;&#x6211;&#x4EEC;&#x5B9E;&#x9645;&#x5728;&#x5199;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x771F;&#x5B9E;&#x7684;&#x60C5;&#x51B5;&#x5E94;&#x8BE5;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen( &quot;click&quot;, function handler(evt){ 
  doSomething1();
  doSomething2();
  doSomething3();
  doSomething4();
  setTimeout( function request(){ 
    doSomething8();
    doSomething9();
    doSomething10();
    ajax( &quot;http:// some. url. 1&quot;, function response( text){ 
      if (text == &quot;hello&quot;) { 
        handler(); 
      } else if (text == &quot;world&quot;) { 
        request(); 
      } 
    }); 
    doSomething11();
    doSomething12();
    doSomething13();
  }, 500); 
  doSomething5();
  doSomething6();
  doSomething7();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">listen( <span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params">evt</span>)</span>{ 
  doSomething1();
  doSomething2();
  doSomething3();
  doSomething4();
  setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params"></span>)</span>{ 
    doSomething8();
    doSomething9();
    doSomething10();
    ajax( <span class="hljs-string">&quot;http:// some. url. 1&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">response</span>(<span class="hljs-params"> text</span>)</span>{ 
      <span class="hljs-keyword">if</span> (text == <span class="hljs-string">&quot;hello&quot;</span>) { 
        handler(); 
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (text == <span class="hljs-string">&quot;world&quot;</span>) { 
        request(); 
      } 
    }); 
    doSomething11();
    doSomething12();
    doSomething13();
  }, <span class="hljs-number">500</span>); 
  doSomething5();
  doSomething6();
  doSomething7();
});</code></pre><p>&#x8FD9;&#x4E9B;&#x201C;doSomething&#x201D;&#x6709;&#x4E9B;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x6709;&#x4E9B;&#x662F;&#x540C;&#x6B65;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x8BFB;&#x8D77;&#x6765;&#x4F1A;&#x975E;&#x5E38;&#x7684;&#x5403;&#x529B;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x8981;&#x4E0D;&#x505C;&#x7684;&#x601D;&#x8003;&#x4ED6;&#x4EEC;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x5E76;&#x4E14;&#x8FD8;&#x8981;&#x8BB0;&#x5728;&#x8111;&#x888B;&#x91CC;&#x9762;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x5F02;&#x6B65;&#x7684;&#x5D4C;&#x5957;&#x5E26;&#x6765;&#x7684;&#x53EF;&#x8BFB;&#x6027;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5B83;&#x662F;&#x7531;&#x5F02;&#x6B65;&#x7684;&#x8FD0;&#x884C;&#x673A;&#x5236;&#x5F15;&#x8D77;&#x7684;&#x3002;</p><h3 id="articleHeader1">&#x4FE1;&#x4EFB;&#x95EE;&#x9898;</h3><p>&#x8FD9;&#x91CC;&#x4E3B;&#x8981;&#x7528;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x8BA8;&#x8BBA;&#x3002;&#x6211;&#x4EEC;&#x5728;&#x505A;AJAX&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E00;&#x822C;&#x90FD;&#x4F1A;&#x4F7F;&#x7528;&#x4E00;&#x4E9B;&#x7B2C;&#x4E09;&#x65B9;&#x7684;&#x5DE5;&#x5177;&#x5E93;&#xFF08;&#x5373;&#x4FBF;&#x662F;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x7684;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x4E00;&#x5B9A;&#x7A0B;&#x5EA6;&#x4E0A;&#x7406;&#x89E3;&#x6210;&#x7B2C;&#x4E09;&#x65B9;&#x7684;&#xFF09;&#xFF0C;&#x8FD9;&#x5C31;&#x4F1A;&#x5E26;&#x6765;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x8FD9;&#x4E9B;&#x5DE5;&#x5177;&#x5E93;&#x662F;&#x5426;&#x767E;&#x5206;&#x767E;&#x7684;&#x53EF;&#x9760;&#xFF1F;</p><p>&#x4E00;&#x4E2A;&#x6765;&#x81EA;<a href="https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&amp;%20performance/README.md#you-dont-know-js-async--performance" rel="nofollow noreferrer" target="_blank">&#x300A;YDKJS&#x300B;</a>&#x7684;&#x4F8B;&#x5B50;&#xFF1A;&#x4E00;&#x4E2A;&#x7A0B;&#x5E8F;&#x5458;&#x5F00;&#x53D1;&#x4E86;&#x4E00;&#x4E2A;&#x4ED8;&#x6B3E;&#x7684;&#x7CFB;&#x7EDF;&#xFF0C;&#x5B83;&#x826F;&#x597D;&#x7684;&#x8FD0;&#x884C;&#x4E86;&#x5F88;&#x957F;&#x65F6;&#x95F4;&#x3002;&#x7A81;&#x7136;&#x6709;&#x4E00;&#x5929;&#xFF0C;&#x4E00;&#x4E2A;&#x5BA2;&#x6237;&#x5728;&#x4ED8;&#x6B3E;&#x7684;&#x65F6;&#x5019;&#x4FE1;&#x7528;&#x5361;&#x88AB;&#x8FDE;&#x7EED;&#x5237;&#x4E86;&#x4E94;&#x6B21;&#x3002;&#x8FD9;&#x540D;&#x7A0B;&#x5E8F;&#x5458;&#x5728;&#x8C03;&#x67E5;&#x4E86;&#x4EE5;&#x540E;&#x53D1;&#x73B0;&#xFF0C;&#x4E00;&#x4E2A;&#x7B2C;&#x4E09;&#x65B9;&#x7684;&#x5DE5;&#x5177;&#x5E93;&#x56E0;&#x4E3A;&#x67D0;&#x4E9B;&#x539F;&#x56E0;&#x628A;&#x4ED8;&#x6B3E;&#x56DE;&#x8C03;&#x6267;&#x884C;&#x4E86;&#x4E94;&#x6B21;&#x3002;&#x5728;&#x4E0E;&#x7B2C;&#x4E09;&#x65B9;&#x56E2;&#x961F;&#x6C9F;&#x901A;&#x4E4B;&#x540E;&#x95EE;&#x9898;&#x5F97;&#x5230;&#x4E86;&#x89E3;&#x51B3;&#x3002;</p><p>&#x6545;&#x4E8B;&#x8BB2;&#x5B8C;&#x4E86;&#xFF0C;&#x53EF;&#x95EE;&#x9898;&#x771F;&#x7684;&#x89E3;&#x51B3;&#x4E86;&#x5417;&#xFF1F;&#x662F;&#x5426;&#x8FD8;&#x80FD;&#x591F;&#x5145;&#x5206;&#x7684;&#x4FE1;&#x4EFB;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x5E93;&#xFF1F;&#x4FE1;&#x4EFB;&#x4F9D;&#x7136;&#x8981;&#x6709;&#xFF0C;&#x53EF;&#x5B8C;&#x5584;&#x5FC5;&#x8981;&#x7684;&#x68C0;&#x67E5;&#x548C;&#x9519;&#x8BEF;&#x5904;&#x7406;&#x52BF;&#x5728;&#x5FC5;&#x884C;&#x3002;&#x5F53;&#x6211;&#x4EEC;&#x89E3;&#x51B3;&#x4E86;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x7531;&#x4E8E;&#x5B83;&#x7684;&#x542F;&#x53D1;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x4F1A;&#x8054;&#x60F3;&#x5230;&#x5176;&#x4ED6;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6BD4;&#x5982;&#x6CA1;&#x6709;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x3002;</p><p>&#x518D;&#x7EE7;&#x7EED;&#x60F3;&#xFF0C;&#x4F60;&#x4F1A;&#x53D1;&#x73B0;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#x8FD8;&#x8981;&#x597D;&#x591A;&#x597D;&#x591A;&#x3002;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><ul><li>&#x56DE;&#x8C03;&#x8FC7;&#x65E9;&#xFF08;&#x4E00;&#x822C;&#x662F;&#x5F02;&#x6B65;&#x88AB;&#x540C;&#x6B65;&#x8C03;&#x7528;&#xFF09;&#xFF1B;</li><li>&#x56DE;&#x8C03;&#x8FC7;&#x665A;&#x6216;&#x6CA1;&#x6709;&#x56DE;&#x8C03;&#xFF1B;</li><li>&#x56DE;&#x8C03;&#x6B21;&#x6570;&#x8FC7;&#x591A;&#xFF1B;</li><li>&#x7B49;&#x7B49;</li></ul><p>&#x52A0;&#x4E0A;&#x4E86;&#x8FD9;&#x4E9B;&#x68C0;&#x67E5;&#xFF0C;&#x5F3A;&#x58EE;&#x4E4B;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x80FD;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="listen( &quot;click&quot;, function handler( evt){ 
  check1();
  doSomething1();
  setTimeout( function request(){ 
    check2();
    doSomething3();
    ajax( &quot;http:// some. url. 1&quot;, function response( text){ 
      if (text == &quot;hello&quot;) { 
        handler(); 
      } else if (text == &quot;world&quot;) { 
        request(); 
      } 
    }); 
    doSomething4();
  }, 500); 
  doSomething2();
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">listen( <span class="hljs-string">&quot;click&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handler</span>(<span class="hljs-params"> evt</span>)</span>{ 
  check1();
  doSomething1();
  setTimeout( <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params"></span>)</span>{ 
    check2();
    doSomething3();
    ajax( <span class="hljs-string">&quot;http:// some. url. 1&quot;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">response</span>(<span class="hljs-params"> text</span>)</span>{ 
      <span class="hljs-keyword">if</span> (text == <span class="hljs-string">&quot;hello&quot;</span>) { 
        handler(); 
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (text == <span class="hljs-string">&quot;world&quot;</span>) { 
        request(); 
      } 
    }); 
    doSomething4();
  }, <span class="hljs-number">500</span>); 
  doSomething2();
});</code></pre><p>&#x6211;&#x4EEC;&#x90FD;&#x6E05;&#x695A;&#x7684;&#x77E5;&#x9053;&#xFF0C;&#x5B9E;&#x9645;&#x7684;<code>check</code>&#x8981;&#x6BD4;&#x8FD9;&#x91CC;&#x770B;&#x8D77;&#x6765;&#x7684;&#x590D;&#x6742;&#x7684;&#x591A;&#xFF0C;&#x800C;&#x4E14;&#x5F88;&#x591A;&#x5F88;&#x96BE;&#x590D;&#x7528;&#x3002;&#x8FD9;&#x4E0D;&#x4F46;&#x4F7F;&#x4EE3;&#x7801;&#x53D8;&#x5F97;&#x81C3;&#x80BF;&#x4E0D;&#x582A;&#xFF0C;&#x8FD8;&#x8FDB;&#x4E00;&#x6B65;&#x52A0;&#x5267;&#x4E86;&#x53EF;&#x8BFB;&#x6027;&#x7684;&#x95EE;&#x9898;&#x3002;</p><p>&#x867D;&#x7136;&#x8FD9;&#x4E9B;&#x9519;&#x8BEF;&#x51FA;&#x73B0;&#x7684;&#x6982;&#x7387;&#x4E0D;&#x5927;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x4F9D;&#x7136;&#x5FC5;&#x987B;&#x8981;&#x5904;&#x7406;&#x3002;</p><p>&#x8FD9;&#x5C31;&#x662F;&#x5F02;&#x6B65;&#x5D4C;&#x5957;&#x5E26;&#x6765;&#x7684;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#xFF0C;&#x5B83;&#x7684;&#x95EE;&#x9898;&#x7684;&#x6839;&#x6E90;&#x5728;&#x4E8E;<strong>&#x63A7;&#x5236;&#x53CD;&#x8F6C;</strong>&#x3002;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x5728;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x5E94;&#x7528;&#x662F;&#x4F9D;&#x8D56;&#x6CE8;&#x5165;&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x6A21;&#x5757;&#x95F4;&#x7684;&#x89E3;&#x8026;&#x3002;&#x800C;&#x5728;&#x56DE;&#x8C03;&#x4E2D;&#xFF0C;&#x5B83;&#x5C31;&#x663E;&#x5F97;&#x6CA1;&#x6709;&#x90A3;&#x4E48;&#x5584;&#x826F;&#x4E86;&#xFF0C;&#x63A7;&#x5236;&#x6743;&#x88AB;&#x4EA4;&#x7ED9;&#x4E86;&#x7B2C;&#x4E09;&#x65B9;&#xFF0C;&#x7531;&#x7B2C;&#x4E09;&#x65B9;&#x51B3;&#x5B9A;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x8C03;&#x7528;&#x56DE;&#x8C03;&#x3002;</p><h4>&#x4E00;&#x4E9B;&#x89E3;&#x51B3;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#x7684;&#x5C1D;&#x8BD5;</h4><p><strong>&#x52A0;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x9519;&#x8BEF;&#x7684;&#x56DE;&#x8C03;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function success(data) { 
  console. log(data); 
} 
function failure(err) { 
  console. error( err ); 
} 
ajax( &quot;http:// some. url. 1&quot;, success, failure );" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span>(<span class="hljs-params">data</span>) </span>{ 
  <span class="hljs-built_in">console</span>. log(data); 
} 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">failure</span>(<span class="hljs-params">err</span>) </span>{ 
  <span class="hljs-built_in">console</span>. error( err ); 
} 
ajax( <span class="hljs-string">&quot;http:// some. url. 1&quot;</span>, success, failure );</code></pre><p><strong>nodejs&#x7684;error-first</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function response(err, data) { 
  if (err) { 
    console. error( err ); 
  } 
  else { 
    console. log( data ); 
  } 
} 
ajax( &quot;http:// some. url. 1&quot;, response );" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">response</span>(<span class="hljs-params">err, data</span>) </span>{ 
  <span class="hljs-keyword">if</span> (err) { 
    <span class="hljs-built_in">console</span>. error( err ); 
  } 
  <span class="hljs-keyword">else</span> { 
    <span class="hljs-built_in">console</span>. log( data ); 
  } 
} 
ajax( <span class="hljs-string">&quot;http:// some. url. 1&quot;</span>, response );</code></pre><p>&#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x89E3;&#x51B3;&#x4E86;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x51CF;&#x5C11;&#x4E86;&#x4E00;&#x4E9B;&#x5DE5;&#x4F5C;&#x91CF;&#xFF0C; &#x4F46;&#x662F;&#x4F9D;&#x7136;&#x6CA1;&#x6709;&#x5F7B;&#x5E95;&#x89E3;&#x51B3;&#x95EE;&#x9898;&#x3002;&#x9996;&#x5148;&#x5B83;&#x4EEC;&#x7684;&#x53EF;&#x590D;&#x7528;&#x6027;&#x4F9D;&#x7136;&#x4E0D;&#x5F3A;&#xFF0C;&#x5176;&#x6B21;&#xFF0C;&#x5982;&#x56DE;&#x8C03;&#x88AB;&#x591A;&#x6B21;&#x8C03;&#x7528;&#x7684;&#x95EE;&#x9898;&#x4F9D;&#x7136;&#x65E0;&#x6CD5;&#x89E3;&#x51B3;&#x3002;</p><h2 id="articleHeader2">Promise&#x5982;&#x4F55;&#x89E3;&#x51B3;&#x8FD9;&#x4E24;&#x4E2A;&#x95EE;&#x9898;</h2><p>Promise&#x5DF2;&#x7ECF;&#x662F;&#x539F;&#x751F;&#x652F;&#x6301;&#x7684;API&#x4E86;&#xFF0C;&#x5B83;&#x5DF2;&#x7ECF;&#x88AB;&#x52A0;&#x5230;&#x4E86;JS&#x7684;&#x89C4;&#x8303;&#x91CC;&#x9762;&#xFF0C;&#x5728;&#x5404;&#x5927;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x7684;&#x8FD0;&#x884C;&#x673A;&#x5236;&#x662F;&#x76F8;&#x540C;&#x7684;&#x3002;&#x8FD9;&#x6837;&#x5C31;&#x4FDD;&#x8BC1;&#x4E86;&#x5B83;&#x7684;&#x53EF;&#x9760;&#x3002;</p><h3 id="articleHeader3">&#x5982;&#x4F55;&#x89E3;&#x51B3;&#x53EF;&#x8BFB;&#x6027;&#x7684;&#x95EE;&#x9898;</h3><p>&#x8FD9;&#x4E00;&#x70B9;&#x4E0D;&#x7528;&#x591A;&#x8BF4;&#xFF0C;&#x7528;&#x8FC7;Promise&#x7684;&#x4EBA;&#x5F88;&#x5BB9;&#x6613;&#x660E;&#x767D;&#x3002;Promise&#x7684;&#x5E94;&#x7528;&#x76F8;&#x5F53;&#x4E8E;&#x7ED9;&#x4E86;&#x4F60;&#x4E00;&#x5F20;&#x53EF;&#x4EE5;&#x628A;&#x89E3;&#x9898;&#x601D;&#x8DEF;&#x6E05;&#x6670;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#x7684;&#x8349;&#x7A3F;&#x7EB8;&#xFF0C;&#x4F60;&#x4E0D;&#x5728;&#x9700;&#x8981;&#x7528;&#x8111;&#x5B50;&#x53BB;&#x8BB0;&#x5FC6;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x3002;</p><h3 id="articleHeader4">&#x5982;&#x4F55;&#x89E3;&#x51B3;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;</h3><p>Promise&#x5E76;&#x6CA1;&#x6709;&#x53D6;&#x6D88;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#xFF0C;&#x800C;&#x662F;&#x628A;&#x53CD;&#x8F6C;&#x51FA;&#x53BB;&#x7684;&#x63A7;&#x5236;&#x518D;&#x53CD;&#x8F6C;&#x4E00;&#x6B21;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x53CD;&#x8F6C;&#x4E86;&#x63A7;&#x5236;&#x53CD;&#x8F6C;&#x3002;</p><p>&#x8FD9;&#x79CD;&#x673A;&#x5236;&#x6709;&#x70B9;&#x50CF;&#x4E8B;&#x4EF6;&#x7684;&#x89E6;&#x53D1;&#x3002;&#x5B83;&#x4E0E;&#x666E;&#x901A;&#x7684;&#x56DE;&#x8C03;&#x7684;&#x65B9;&#x5F0F;&#x7684;&#x533A;&#x522B;&#x5728;&#x4E8E;&#xFF0C;&#x666E;&#x901A;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x56DE;&#x8C03;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x7684;&#x64CD;&#x4F5C;&#x76F4;&#x63A5;&#x5199;&#x5728;&#x4E86;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x91CC;&#x9762;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x64CD;&#x4F5C;&#x7684;&#x8C03;&#x7528;&#x7531;&#x7B2C;&#x4E09;&#x65B9;&#x63A7;&#x5236;&#x3002;&#x5728;Promise&#x7684;&#x65B9;&#x5F0F;&#x4E2D;&#xFF0C;&#x56DE;&#x8C03;&#x53EA;&#x8D1F;&#x8D23;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x7684;&#x901A;&#x77E5;&#xFF0C;&#x800C;&#x56DE;&#x8C03;&#x6210;&#x529F;&#x4E4B;&#x540E;&#x7684;&#x64CD;&#x4F5C;&#x653E;&#x5728;&#x4E86;then&#x7684;&#x56DE;&#x8C03;&#x91CC;&#x9762;&#xFF0C;&#x7531;Promise&#x7CBE;&#x786E;&#x63A7;&#x5236;&#x3002;</p><p>Promise&#x6709;&#x8FD9;&#x4E9B;&#x7279;&#x5F81;&#xFF1A;&#x53EA;&#x80FD;&#x51B3;&#x8BAE;&#x4E00;&#x6B21;&#xFF0C;&#x51B3;&#x8BAE;&#x503C;&#x53EA;&#x80FD;&#x6709;&#x4E00;&#x4E2A;&#xFF0C;&#x51B3;&#x8BAE;&#x4E4B;&#x540E;&#x65E0;&#x6CD5;&#x6539;&#x53D8;&#x3002;&#x4EFB;&#x4F55;then&#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x4E5F;&#x53EA;&#x4F1A;&#x88AB;&#x8C03;&#x7528;&#x4E00;&#x6B21;&#x3002;Promise&#x7684;&#x7279;&#x5F81;&#x4FDD;&#x8BC1;&#x4E86;Promise&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x4FE1;&#x4EFB;&#x95EE;&#x9898;&#x3002;</p><p><strong>&#x5BF9;&#x4E8E;&#x56DE;&#x8C03;&#x8FC7;&#x65E9;&#x7684;&#x95EE;&#x9898;</strong>&#xFF0C;&#x7531;&#x4E8E;Promise&#x53EA;&#x80FD;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x5F02;&#x6B65;&#x7684;&#x540C;&#x6B65;&#x8C03;&#x7528;&#x3002;&#x5373;&#x4FBF;&#x662F;&#x5728;&#x51B3;&#x8BAE;&#x4E4B;&#x524D;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4E5F;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x4F1A;&#x4EA7;&#x751F;&#x540C;&#x6B65;&#xFF08;&#x8C03;&#x7528;&#x8FC7;&#x65E9;&#xFF09;&#x7684;&#x56F0;&#x6270;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = new Promise((resolve, reject) =&gt; {
  var b = 1 + c;  // ReferenceError: c is not defined&#xFF0C;&#x9519;&#x8BEF;&#x4F1A;&#x5728;&#x4E0B;&#x9762;&#x7684;a&#x6253;&#x5370;&#x51FA;&#x6765;&#x4E4B;&#x540E;&#x62A5;&#x51FA;&#x3002;
  resolve(true);
})
console.log(1, a);
a.then(res =&gt; {
  console.log(2, res);
})
.catch(err =&gt; {
  console.log(err);
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-keyword">var</span> b = <span class="hljs-number">1</span> + c;  <span class="hljs-comment">// ReferenceError: c is not defined&#xFF0C;&#x9519;&#x8BEF;&#x4F1A;&#x5728;&#x4E0B;&#x9762;&#x7684;a&#x6253;&#x5370;&#x51FA;&#x6765;&#x4E4B;&#x540E;&#x62A5;&#x51FA;&#x3002;</span>
  resolve(<span class="hljs-literal">true</span>);
})
<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>, a);
a.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>, res);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(err);
})</code></pre><p><strong>&#x5BF9;&#x4E8E;&#x56DE;&#x8C03;&#x8FC7;&#x665A;&#x6216;&#x6CA1;&#x6709;&#x8C03;&#x7528;&#x7684;&#x95EE;&#x9898;</strong>&#xFF0C;Promise&#x672C;&#x8EAB;&#x4E0D;&#x4F1A;&#x56DE;&#x8C03;&#x8FC7;&#x665A;&#xFF0C;&#x53EA;&#x8981;&#x51B3;&#x8BAE;&#x4E86;&#xFF0C;&#x5B83;&#x5C31;&#x4F1A;&#x6309;&#x7167;&#x89C4;&#x5B9A;&#x8FD0;&#x884C;&#x3002;&#x81F3;&#x4E8E;&#x670D;&#x52A1;&#x5668;&#x6216;&#x8005;&#x7F51;&#x7EDC;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;Promise&#x80FD;&#x89E3;&#x51B3;&#x7684;&#xFF0C;&#x4E00;&#x822C;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4F1A;&#x4F7F;&#x7528;Promise&#x7684;&#x7ADE;&#x6001;API<code>Promise.race</code>&#x52A0;&#x4E00;&#x4E2A;&#x8D85;&#x65F6;&#x7684;&#x65F6;&#x95F4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function timeoutPromise(delay) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(&quot;Timeout!&quot;);
    }, delay);
  });
}

Promise.race([doSomething(), timeoutPromise(3000)])
.then(...)
.catch(...);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeoutPromise</span>(<span class="hljs-params">delay</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      reject(<span class="hljs-string">&quot;Timeout!&quot;</span>);
    }, delay);
  });
}

<span class="hljs-built_in">Promise</span>.race([doSomething(), timeoutPromise(<span class="hljs-number">3000</span>)])
.then(...)
.catch(...);</code></pre><p><strong>&#x5BF9;&#x4E8E;&#x56DE;&#x8C03;&#x6B21;&#x6570;&#x592A;&#x5C11;&#x6216;&#x592A;&#x591A;&#x7684;&#x95EE;&#x9898;</strong>&#xFF0C;&#x7531;&#x4E8E;Promise&#x53EA;&#x80FD;&#x88AB;&#x51B3;&#x8BAE;&#x4E00;&#x6B21;&#xFF0C;&#x4E14;&#x51B3;&#x8BAE;&#x4E4B;&#x540E;&#x65E0;&#x6CD5;&#x6539;&#x53D8;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x5373;&#x4FBF;&#x662F;&#x591A;&#x6B21;&#x56DE;&#x8C03;&#xFF0C;&#x4E5F;&#x4E0D;&#x4F1A;&#x5F71;&#x54CD;&#x7ED3;&#x679C;&#xFF0C;&#x51B3;&#x8BAE;&#x4E4B;&#x540E;&#x7684;&#x8C03;&#x7528;&#x90FD;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#x3002;</p><p>&#x53C2;&#x8003;&#x8D44;&#x6599;&#xFF1A;</p><ul><li><a href="https://github.com/getify/You-Dont-Know-JS/blob/master/async%20&amp;%20performance/README.md#you-dont-know-js-async--performance" rel="nofollow noreferrer" target="_blank">You Don&apos;t Know JS: Async &amp; Performance</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Promise到底解决了什么问题？

## 原文链接
[https://segmentfault.com/a/1190000016273587](https://segmentfault.com/a/1190000016273587)


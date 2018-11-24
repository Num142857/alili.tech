---
title: 'ES6精华：Promise' 
date: 2018-11-25 2:30:08
hidden: true
slug: 1gdniq6bvo4
categories: [reprint]
---

{{< raw >}}
<p><code>Promise</code>&#x662F;&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E4B;&#x4E00;&#xFF0C;&#x76F8;&#x6BD4;&#x4F20;&#x7EDF;&#x7684;&#x56DE;&#x8C03;&#x548C;&#x4E8B;&#x4EF6;&#x673A;&#x5236;&#x66F4;&#x4E3A;&#x5408;&#x7406;&#x548C;&#x5F3A;&#x5927;&#x3002;</p><h2 id="articleHeader0">1 &#x573A;&#x666F;&#x4E3E;&#x4F8B;</h2><p>&#x67D0;&#x5929;&#xFF0C;&#x7A81;&#x53D1;&#x5947;&#x60F3;&#xFF0C;&#x53D1;&#x4E86;&#x5C01;&#x90AE;&#x4EF6;&#x7ED9;&#x6728;&#x5320;&#x5E08;&#x5085;&#xFF0C;&#x5B9A;&#x5236;&#x4E00;&#x4E2A;&#x5982;&#x6B64;&#x8FD9;&#x822C;&#x7684;&#x5BB6;&#x5177;&#x3002;<br>&#x6728;&#x5320;&#x6709;&#x6C42;&#x5FC5;&#x5E94;&#xFF0C;&#x5373;&#x662F;&#x8BF4;&#xFF0C;&#x90AE;&#x4EF6;&#x4E00;&#x65E6;&#x53D1;&#x51FA;&#x5C31;&#x5F97;&#x5230;&#x4E86;&#x4ED6;&#x7684;&#x627F;&#x8BFA;(<code>Promise</code>)&#xFF1A;&#x5728;&#x4E0B;&#x4E00;&#x5B9A;&#x5C3D;&#x529B;&#x3002;</p><p>&#x90AE;&#x4EF6;&#x4E2D;&#x89C4;&#x5B9A;&#x597D;&#x4E86;&#x7ED3;&#x679C;&#x7684;&#x901A;&#x77E5;&#x65B9;&#x5F0F;&#xFF1A;<br>&#x6210;&#x529F;&#x4E86;&#xFF0C;&#x76F4;&#x63A5;&#x5C06;&#x5BB6;&#x5177;(<code>res</code>)&#x90AE;&#x9012;(<code>resolve</code>)&#x8FC7;&#x6765;&#x3002;<br>&#x5931;&#x8D25;&#x4E86;&#xFF0C;&#x76F4;&#x63A5;&#x5C06;&#x5931;&#x8D25;&#x7684;&#x4FE1;&#x606F;(<code>err</code>)&#x53D1;&#x90AE;&#x4EF6;(<code>reject</code>)&#x8FC7;&#x6765;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let P = new Promise((resolve, reject) =&gt; {
  if (/*&#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;*/) {
    resolve(&apos;&#x5BB6;&#x5177;&apos;); // &#x6210;&#x529F;&#xFF0C;&#x76F4;&#x63A5;&#x90AE;&#x9012;&#x5BB6;&#x5177;&#x3002;
  } else {
    reject(&apos;&#x5931;&#x8D25;&#x7684;&#x539F;&#x56E0;&apos;); // &#x5931;&#x8D25;&#xFF0C;&#x53D1;&#x90AE;&#x4EF6;&#x544A;&#x77E5;&#x5931;&#x8D25;&#x539F;&#x56E0;&#x3002;
  }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> P = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-comment">/*&#x6700;&#x7EC8;&#x7684;&#x7ED3;&#x679C;*/</span>) {
    resolve(<span class="hljs-string">&apos;&#x5BB6;&#x5177;&apos;</span>); <span class="hljs-comment">// &#x6210;&#x529F;&#xFF0C;&#x76F4;&#x63A5;&#x90AE;&#x9012;&#x5BB6;&#x5177;&#x3002;</span>
  } <span class="hljs-keyword">else</span> {
    reject(<span class="hljs-string">&apos;&#x5931;&#x8D25;&#x7684;&#x539F;&#x56E0;&apos;</span>); <span class="hljs-comment">// &#x5931;&#x8D25;&#xFF0C;&#x53D1;&#x90AE;&#x4EF6;&#x544A;&#x77E5;&#x5931;&#x8D25;&#x539F;&#x56E0;&#x3002;</span>
  }
});</code></pre><p>&#x90AE;&#x4EF6;&#x53D1;&#x51FA;&#x7B49;&#x4EF7;&#x4E8E;&#x5F97;&#x5230;&#x6728;&#x5320;&#x7684;&#x627F;&#x8BFA;<code>P</code>&#xFF0C;&#x4E4B;&#x540E;&#xFF0C;&#x80FD;&#x505A;&#x7684;&#x53EA;&#x6709;&#x7B49;&#x5F85;(<code>then</code>)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="P.then(res =&gt; {
  console.log(&apos;&#x6210;&#x529F;&#xFF0C;&#x6536;&#x5230;&#x5BB6;&#x5177;&#x3002;&#x6B64;&#x523B;&#x5FC3;&#x60C5;&#xFF1A;&#x5F00;&#x5FC3;&#x3002;&apos;);
}, err =&gt; {
  console.log(&apos;&#x5931;&#x8D25;&#xFF0C;&#x6536;&#x5230;&#x539F;&#x56E0;&#x3002;&#x6B64;&#x523B;&#x5FC3;&#x60C5;&#xFF1A;&#x5931;&#x843D;&#x3002;&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">P.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6210;&#x529F;&#xFF0C;&#x6536;&#x5230;&#x5BB6;&#x5177;&#x3002;&#x6B64;&#x523B;&#x5FC3;&#x60C5;&#xFF1A;&#x5F00;&#x5FC3;&#x3002;&apos;</span>);
}, err =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x5931;&#x8D25;&#xFF0C;&#x6536;&#x5230;&#x539F;&#x56E0;&#x3002;&#x6B64;&#x523B;&#x5FC3;&#x60C5;&#xFF1A;&#x5931;&#x843D;&#x3002;&apos;</span>);
});</code></pre><h2 id="articleHeader1">2 &#x884C;&#x4E3A;&#x7279;&#x5F81;</h2><h3 id="articleHeader2">2.1 &#x72B6;&#x6001;</h3><p>&#x6BCF;&#x4E2A;<code>Promise</code>&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;&#xFF1A;&#x8FDB;&#x884C;&#x4E2D;(<code>pending</code>)&#x3001;&#x5DF2;&#x6210;&#x529F;(<code>resolved</code>)&#x548C;&#x5DF2;&#x5931;&#x8D25;(<code>rejected</code>)&#x3002;<br>&#x521B;&#x5EFA;&#x5373;&#x8FDB;&#x5165;<code>pending</code>&#x72B6;&#x6001;&#xFF0C;&#x5728;&#x4F20;&#x5165;&#x65B9;&#x6CD5;&#x4E2D;&#x4E00;&#x65E6;&#x8C03;&#x7528;&#x4E86;<code>resolve/reject</code>&#x65B9;&#x6CD5;&#xFF0C;&#x6700;&#x7EC8;&#x72B6;&#x6001;&#x4FBF;&#x53D8;&#x6210;<code>resolved/rejected</code>&#x3002;<br>&#x4E00;&#x65E6;&#x53D8;&#x6210;&#x7ED3;&#x679C;&#x72B6;&#x6001;&#xFF0C;&#x5373;&#x66F4;&#x6539;&#x6210;<code>resolved/rejected</code>&#xFF0C;&#x72B6;&#x6001;&#x4FBF;&#x88AB;&#x51B7;&#x51BB;&#xFF0C;&#x4E0D;&#x80FD;&#x518D;&#x88AB;&#x66F4;&#x6539;&#x3002;</p><p><strong>&#x72B6;&#x6001;&#x5BB9;&#x5668;</strong><br><code>Promise</code>&#x5B9E;&#x8D28;&#x662F;&#x4E2A;&#x72B6;&#x6001;&#x5BB9;&#x5668;&#x3002;<br>&#x5F97;&#x5230;&#x7ED3;&#x679C;&#x72B6;&#x6001;&#x540E;&#xFF0C;&#x4EFB;&#x4F55;&#x65F6;&#x5019;&#x90FD;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x6B64;&#x72B6;&#x6001;&#x3002;<br>&#x8FD9;&#x4E0E;&#x4E8B;&#x4EF6;&#x8BA2;&#x9605;&#x901A;&#x77E5;&#x4E0D;&#x540C;&#xFF0C;&#x5982;&#x679C;&#x8BA2;&#x9605;&#x53D1;&#x751F;&#x5728;&#x901A;&#x77E5;&#x4E4B;&#x540E;&#xFF0C;&#x8BA2;&#x9605;&#x662F;&#x4E0D;&#x8D77;&#x4F5C;&#x7528;&#x7684;&#x3002;</p><p><strong>&#x72B6;&#x6001;&#x4E0D;&#x53EF;&#x63A7;</strong><br>&#x4E00;&#x65E6;&#x521B;&#x5EFA;<code>Promise</code>&#xFF0C;&#x4FBF;&#x4F1A;&#x7ACB;&#x523B;&#x6267;&#x884C;&#xFF0C;&#x65E0;&#x6CD5;&#x53D6;&#x6D88;&#x3002;<br>&#x5904;&#x4E8E;<code>pending</code>&#x72B6;&#x6001;&#x65F6;&#xFF0C;&#x65E0;&#x6CD5;&#x5F97;&#x77E5;&#x8FDB;&#x7A0B;&#x5177;&#x4F53;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x6BD4;&#x5982;&#x5B8C;&#x6210;&#x767E;&#x5206;&#x6BD4;&#xFF08;&#x867D;&#x7136;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x8BBE;&#x7F6E;&#x56DE;&#x8C03;&#x8FDB;&#x884C;&#x901A;&#x77E5;&#xFF09;&#x3002;</p><p><strong>&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;</strong><br>&#x6210;&#x529F;&#x7684;&#x72B6;&#x6001;&#x53EA;&#x80FD;&#x7531;<code>resolve</code>&#x65B9;&#x6CD5;&#x8F6C;&#x6210;&#x3002;<br>&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#x53EF;&#x4EE5;&#x7531;<code>reject</code>&#x65B9;&#x6CD5;&#x8F6C;&#x6210;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7531;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x95F4;&#x63A5;&#x8F6C;&#x6210;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E09;&#x8005;&#x90FD;&#x4F1A;&#x6B63;&#x5E38;&#x7684;&#x6253;&#x5370;&#x51FA;&#x5931;&#x8D25;&#x7684;&#x4FE1;&#x606F;&#x3002;

new Promise((resolve, reject) =&gt; {
  reject(&apos;error&apos;);
}).catch(console.log); // error

new Promise((resolve, reject) =&gt; {
  a;
}).catch(console.log); // ReferenceError: a is not defined

new Promise((resolve, reject) =&gt; {
  throw &apos;error&apos;;
}).catch(console.log); // Error: error" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E09;&#x8005;&#x90FD;&#x4F1A;&#x6B63;&#x5E38;&#x7684;&#x6253;&#x5370;&#x51FA;&#x5931;&#x8D25;&#x7684;&#x4FE1;&#x606F;&#x3002;

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  reject(<span class="hljs-string">&apos;error&apos;</span>);
}).catch(<span class="hljs-built_in">console</span>.log); <span class="hljs-comment">// error</span>

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  a;
}).catch(<span class="hljs-built_in">console</span>.log); <span class="hljs-comment">// ReferenceError: a is not defined</span>

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-string">&apos;error&apos;</span>;
}).catch(<span class="hljs-built_in">console</span>.log); <span class="hljs-comment">// Error: error</span></code></pre><p><strong>&#x9519;&#x8BEF;&#x7684;&#x62A5;&#x544A;&#x673A;&#x5236;</strong><br>&#x5982;&#x679C;&#x5931;&#x8D25;&#x72B6;&#x6001;&#x6CA1;&#x6709;&#x63A5;&#x6536;&#x5931;&#x8D25;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x63A5;&#x6536;&#xFF0C;<code>Promise</code>&#x4F1A;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#x3002;<br>&#x8FD9;&#x91CC;&#x7684;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF0C;&#x4EC5;&#x4EC5;&#x662F;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x663E;&#x793A;&#x4E4B;&#x7C7B;&#x7684;&#x63D0;&#x793A;&#xFF0C;&#x4E0D;&#x4F1A;&#x7EC8;&#x6B62;&#x7A0B;&#x5E8F;&#x7684;&#x8FDB;&#x7A0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5148;&#x6253;&#x5370;&#x51FA; &apos;err&apos; &#xFF0C;&#x518D;&#x62A5;&#x9519;&#x3002;

new Promise((resolve, reject) =&gt; {
  reject();
});

new Promise((resolve, reject) =&gt; {
  reject(&apos;err&apos;);
}).then(() =&gt; {}, console.log);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5148;&#x6253;&#x5370;&#x51FA; <span class="hljs-string">&apos;err&apos;</span> &#xFF0C;&#x518D;&#x62A5;&#x9519;&#x3002;

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  reject();
});

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  reject(<span class="hljs-string">&apos;err&apos;</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}, <span class="hljs-built_in">console</span>.log);</code></pre><p>&#x4E00;&#x65E6;<code>Promise</code>&#x8BBE;&#x7F6E;&#x4E86;&#x5931;&#x8D25;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5373;&#x4FBF;&#x662F;&#x4EE3;&#x7801;&#x6267;&#x884C;&#x9519;&#x8BEF;&#xFF0C;&#x4E5F;&#x4F1A;&#x81EA;&#x884C;&#x6D88;&#x5316;&#xFF0C;&#x4E0D;&#x5916;&#x62A5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x867D;&#x7136; a &#x672A;&#x88AB;&#x5B9A;&#x4E49;&#xFF0C;&#x4F46;&#x5168;&#x7A0B;&#x5B89;&#x9759;&#xFF0C;&#x65E0;&#x69FD;&#x70B9;&#x3002;

new Promise((resolve, reject) =&gt; {
  a;
}).then(() =&gt; {}, () =&gt; {});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x867D;&#x7136; a &#x672A;&#x88AB;&#x5B9A;&#x4E49;&#xFF0C;&#x4F46;&#x5168;&#x7A0B;&#x5B89;&#x9759;&#xFF0C;&#x65E0;&#x69FD;&#x70B9;&#x3002;

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  a;
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}, () =&gt; {});</code></pre><h3 id="articleHeader3">2.2 &#x6267;&#x884C;&#x987A;&#x5E8F;</h3><p><strong>&#x4F20;&#x5165;&#x65B9;&#x6CD5;</strong><br>&#x521B;&#x5EFA;<code>Promise</code>&#x7684;&#x540C;&#x65F6;&#x4E5F;&#x4F1A;&#x6267;&#x884C;&#x4F20;&#x5165;&#x65B9;&#x6CD5;&#x3002;<br>&#x4F20;&#x5165;&#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x56E0;&#x4E3A;&#x8C03;&#x7528;&#x4E86;<code>resolve/reject</code>&#x4FBF;&#x7EC8;&#x6B62;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x66F4;&#x4F18;&#x7684;&#x65B9;&#x5F0F;&#x662F;<code>retrun resolve/reject</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6253;&#x5370;&#x51FA; 1 2 &#x3002;

new Promise((resolve, reject) =&gt; {
  console.log(1);
  resolve();
  console.log(2);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x6253;&#x5370;&#x51FA; <span class="hljs-number">1</span> <span class="hljs-number">2</span> &#x3002;

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  resolve();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
});</code></pre><p><strong>&#x56DE;&#x8C03;&#x65B9;&#x6CD5;</strong><br>&#x7ACB;&#x5373;&#x5F97;&#x5230;&#x7ED3;&#x679C;&#x7684;<code>Promise</code>&#xFF0C;&#x5176;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F9D;&#x7136;&#x4F1A;&#x665A;&#x4E8E;&#x672C;&#x8F6E;&#x4E8B;&#x4EF6;&#x6267;&#x884C;&#x3002;<br>&#x8FD9;&#x79CD;&#x540E;&#x6267;&#x884C;&#x4E0D;&#x540C;&#x4E8E;<code>setTimeout</code>&#x7684;&#x5C06;&#x6267;&#x884C;&#x51FD;&#x6570;<code>push</code>&#x5230;&#x6267;&#x884C;&#x6808;&#xFF0C;&#x800C;&#x662F;&#x5C06;&#x6267;&#x884C;&#x51FD;&#x6570;&#x653E;&#x5230;&#x672C;&#x8F6E;&#x7684;&#x672B;&#x5C3E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;1 2 3 4 5 6 &#x3002;

console.log(1);

let p = new Promise((resolve, reject) =&gt; {
  console.log(2);
  resolve();
});

setTimeout(() =&gt; {
  console.log(5);
});

p.then(function() {
  console.log(4);
});

setTimeout(() =&gt; {
  console.log(6);
});

console.log(3);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5F97;&#x5230;&#x7684;&#x7ED3;&#x679C;&#x662F;&#xFF1A;<span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">3</span> <span class="hljs-number">4</span> <span class="hljs-number">5</span> <span class="hljs-number">6</span> &#x3002;

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);

<span class="hljs-keyword">let</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  resolve();
});

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);
});

p.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);
});

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-number">6</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);</code></pre><h3 id="articleHeader4">2.3 &#x7ED3;&#x679C;&#x53C2;&#x6570;</h3><p>&#x4F20;&#x5165;<code>reject</code>&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;<code>Error</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x8868;&#x793A;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#x3002;<br>&#x4F20;&#x5165;<code>resolve</code>&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x4E00;&#x822C;&#x662F;&#x76F8;&#x5E94;&#x7684;<code>JSON</code>&#x6570;&#x636E;&#x7B49;&#xFF0C;&#x8868;&#x793A;&#x5F97;&#x5230;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x4F20;&#x5165;<code>resolve</code>&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x662F;&#x53E6;&#x4E00;&#x4E2A;<code>Promise</code>&#x5B9E;&#x4F8B;&#x3002;<br>&#x8FD9;&#x65F6;&#xFF0C;&#x53EA;&#x6709;&#x5F53;&#x5185;&#x5C42;&#x7684;<code>Promise</code>&#x7ED3;&#x675F;&#x540E;&#xFF0C;&#x5916;&#x5C42;&#x7684;<code>Promise</code>&#x624D;&#x4F1A;&#x7ED3;&#x675F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8FC7;&#x4E24;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA; 2000 &#x3002;

new Promise((resolve, reject) =&gt; {
  resolve(createPromise());
}).then(console.log);

function createPromise() {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      resolve(2000);
    }, 2000);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x8FC7;&#x4E24;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA; <span class="hljs-number">2000</span> &#x3002;

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  resolve(createPromise());
}).then(<span class="hljs-built_in">console</span>.log);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPromise</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve(<span class="hljs-number">2000</span>);
    }, <span class="hljs-number">2000</span>);
  });
}</code></pre><p>&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x5185;&#x5C42;&#x5931;&#x8D25;&#xFF0C;&#x5E76;&#x4E0D;&#x7B49;&#x4E8E;&#x4F20;&#x9012;<code>Error</code>&#x5B9E;&#x4F8B;&#x7ED9;<code>resolve</code>&#x4E0D;&#x540C;&#x3002;<br>&#x524D;&#x8005;&#x662F;&#x5185;&#x5C42;<code>Promise</code>&#x629B;&#x51FA;&#x4E86;&#x9519;&#x8BEF;&#x5C06;&#x88AB;&#x5916;&#x5C42;&#x6355;&#x83B7;&#xFF0C;&#x540E;&#x8005;&#x4EC5;&#x4EC5;&#x662F;&#x53C2;&#x6570;&#x4E3A;&#x4E00;&#x4E2A;<code>Error</code>&#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5185;&#x5C42;&#x5931;&#x8D25;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x88AB;&#x5916;&#x5C42;&#x6355;&#x83B7;&#x3002;&#x8FC7;&#x4E24;&#x79D2;&#xFF0C;&#x6253;&#x5370;&#x51FA; &apos;2&apos; 2000 &#x3002;

new Promise((resolve, reject) =&gt; {
  resolve(createPromise());
}).then(res =&gt; {
  console.log(&apos;1&apos;, res);
}, err =&gt; {
  console.log(&apos;2&apos;, err);
});

function createPromise() {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; {
      reject(2000);
    }, 2000);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5185;&#x5C42;&#x5931;&#x8D25;&#x7684;&#x4FE1;&#x606F;&#xFF0C;&#x88AB;&#x5916;&#x5C42;&#x6355;&#x83B7;&#x3002;&#x8FC7;&#x4E24;&#x79D2;&#xFF0C;&#x6253;&#x5370;&#x51FA; <span class="hljs-string">&apos;2&apos;</span> <span class="hljs-number">2000</span> &#x3002;

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  resolve(createPromise());
}).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;1&apos;</span>, res);
}, err =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;2&apos;</span>, err);
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPromise</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      reject(<span class="hljs-number">2000</span>);
    }, <span class="hljs-number">2000</span>);
  });
}</code></pre><h2 id="articleHeader5">3 &#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;</h2><h3 id="articleHeader6">3.1 then()</h3><p>&#x8BE5;&#x65B9;&#x6CD5;&#x53EF;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#xFF0C;&#x5206;&#x522B;&#x5BF9;&#x5E94;&#x6210;&#x529F;/&#x5931;&#x8D25;&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;<br>&#x8BE5;&#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>Promise</code>&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x94FE;&#x5F0F;&#xFF08;<code>.then.then...</code>&#xFF09;&#x7684;&#x539F;&#x56E0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let p1 = new Promise(resolve =&gt; resolve(2000));
let p2 = p1.then(() =&gt; {}, () =&gt; {});
console.log(p1 === p2); // false" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve(<span class="hljs-number">2000</span>));
<span class="hljs-keyword">let</span> p2 = p1.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}, () =&gt; {});
<span class="hljs-built_in">console</span>.log(p1 === p2); <span class="hljs-comment">// false</span></code></pre><p><strong>return</strong><br>&#x94FE;&#x5F0F;&#x4E2D;&#xFF0C;&#x540E;&#x8005;&#x7684;&#x72B6;&#x6001;&#x53D6;&#x51B3;&#x4E8E;&#x524D;&#x8005;&#xFF08;&#x6210;&#x529F;/&#x5931;&#x8D25;&#xFF09;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#xFF08;<code>return</code>&#xFF09;&#x7684;&#x7ED3;&#x679C;&#x3002;<br>&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8FD4;&#x56DE;&#xFF0C;&#x76F8;&#x5F53;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6210;&#x529F;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x503C;&#x4E3A;<code>undefined</code>&#x3002;<br>&#x5982;&#x679C;&#x8FD4;&#x56DE;&#x4E3A;<code>Promise</code>&#x5BF9;&#x8C61;&#xFF0C;&#x540E;&#x8005;&#x7684;&#x72B6;&#x6001;&#x7531;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;&#x6700;&#x7EC8;&#x72B6;&#x6001;&#x51B3;&#x5B9A;&#x3002;<br>&#x5982;&#x679C;&#x8FD4;&#x56DE;&#x4E3A;&#x975E;<code>Promise</code>&#x5BF9;&#x8C61;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x76F8;&#x5F53;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x6210;&#x529F;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x503C;&#x4E3A;&#x6B64;&#x6570;&#x636E;&#x3002;<br>&#x5982;&#x679C;&#x524D;&#x8005;&#x6267;&#x884C;&#x65F6;&#x629B;&#x51FA;&#x4E86;&#x9519;&#x8BEF;&#xFF0C;&#x76F8;&#x5F53;&#x662F;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5931;&#x8D25;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x503C;&#x4E3A;&#x6B64;&#x9519;&#x8BEF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;
1 res 2000
2 res undefined
3 res 3000
4 err 4000

new Promise(resolve =&gt; resolve(2000))
.then(res =&gt; {
  console.log(&apos;1 res&apos;, res);
})
.then(res =&gt; {
  console.log(&apos;2 res&apos;, res);
  return 3000;
})
.then(res =&gt; {
  console.log(&apos;3 res&apos;, res);
  return new Promise((resolve, reject) =&gt; {
    reject(4000);
  });
})
.then(console.log, err =&gt; {
  console.log(&apos;4 err&apos;, err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;
<span class="hljs-number">1</span> res <span class="hljs-number">2000</span>
<span class="hljs-number">2</span> res <span class="hljs-literal">undefined</span>
<span class="hljs-number">3</span> res <span class="hljs-number">3000</span>
<span class="hljs-number">4</span> err <span class="hljs-number">4000</span>

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve(<span class="hljs-number">2000</span>))
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;1 res&apos;</span>, res);
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;2 res&apos;</span>, res);
  <span class="hljs-keyword">return</span> <span class="hljs-number">3000</span>;
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;3 res&apos;</span>, res);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    reject(<span class="hljs-number">4000</span>);
  });
})
.then(<span class="hljs-built_in">console</span>.log, err =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;4 err&apos;</span>, err);
});</code></pre><p><strong>&#x72B6;&#x6001;&#x7684;&#x4F20;&#x9012;</strong><br>&#x5728;&#x94FE;&#x5F0F;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x524D;&#x8005;&#x7684;&#x72B6;&#x6001;&#x6CA1;&#x6709;&#x88AB;&#x540E;&#x8005;&#x6355;&#x83B7;&#xFF0C;&#x4F1A;&#x4E00;&#x76F4;&#xFF08;&#x50CF;&#xFF09;&#x5192;&#x6CE1;&#x5230;&#x88AB;&#x6355;&#x83B7;&#x4E3A;&#x6B62;&#x3002;<br>&#x72B6;&#x6001;&#x88AB;&#x6355;&#x83B7;&#x540E;&#x4FBF;&#x6D88;&#x5931;&#xFF0C;&#x8FD9;&#x4E4B;&#x540E;&#x7684;&#x7684;&#x72B6;&#x6001;&#x7531;&#x5F53;&#x524D;<code>then</code>&#x8FD4;&#x56DE;&#x7684;&#x72B6;&#x6001;&#x51B3;&#x5B9A;&#xFF0C;&#x4E4B;&#x540E;&#x91CD;&#x590D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;
2 res 2000
3 res 3000

new Promise(resolve =&gt; resolve(2000))
.then(null, err =&gt; {
    console.log(&apos;1 err&apos;, err);
})
.then(res =&gt; {
  console.log(&apos;2 res&apos;, res);
  return 3000;
})
.then(res =&gt; {
  console.log(&apos;3 res&apos;, res);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4F9D;&#x6B21;&#x6253;&#x5370;&#x51FA;&#xFF1A;
<span class="hljs-number">2</span> res <span class="hljs-number">2000</span>
<span class="hljs-number">3</span> res <span class="hljs-number">3000</span>

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve(<span class="hljs-number">2000</span>))
.then(<span class="hljs-literal">null</span>, err =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;1 err&apos;</span>, err);
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;2 res&apos;</span>, res);
  <span class="hljs-keyword">return</span> <span class="hljs-number">3000</span>;
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;3 res&apos;</span>, res);
});</code></pre><h3 id="articleHeader7">3.2 catch()</h3><p>&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x7B49;&#x4EF7;&#x4E8E;&#xFF1A;<code>.then(null, callback)</code>&#x3002;<br>&#x5176;&#x8868;&#x73B0;&#x4E0E;<code>then</code>&#x4E00;&#x81F4;&#xFF0C;&#x6BD4;&#x5982;&#x8FD4;&#x56DE;&#x65B0;&#x7684;<code>Promise</code>&#xFF0C;&#x72B6;&#x6001;&#x7684;&#x7EE7;&#x627F;&#x548C;&#x4F20;&#x9012;&#x7B49;&#x7B49;&#x3002;</p><p>&#x4E00;&#x822C;&#x63A8;&#x8350;&#x4F7F;&#x7528;<code>catch</code>&#x800C;&#x4E0D;&#x662F;<code>then</code>&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x65B9;&#x6CD5;&#x63A5;&#x6536;&#x9519;&#x8BEF;&#x3002;<br>&#x56E0;&#x4E3A;<code>catch</code>&#x53EF;&#x4EE5;&#x6355;&#x83B7;<code>then</code>&#x81EA;&#x8EAB;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4E5F;&#x66F4;&#x63A5;&#x8FD1;&#x540C;&#x6B65;&#x7684;&#x5199;&#x6CD5;&#xFF08;<code>try/catch</code>&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise(() =&gt; {})
.then(() =&gt; {
  ...
})
.catch(() =&gt; {
  ...
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {})
.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  ...
})
.catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  ...
});</code></pre><h3 id="articleHeader8">3.3 finally()</h3><p>&#x7528;&#x4E8E;<code>Promise</code>&#x5904;&#x7406;&#x7ED3;&#x675F;&#x540E;&#x7684;&#x6536;&#x5C3E;&#x5DE5;&#x4F5C;&#x3002;<br>&#x4F20;&#x5165;&#x5176;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E0D;&#x4F1A;&#x63A5;&#x53D7;&#x4EFB;&#x4F55;&#x53C2;&#x6570;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x6CA1;&#x6709;&#x529E;&#x6CD5;&#x77E5;&#x9053;<code>Promise</code>&#x7684;&#x7ED3;&#x679C;&#x3002;<br>&#x8FD9;&#x4E5F;&#x6B63;&#x8868;&#x660E;&#xFF0C;<code>finally</code>&#x91CC;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x4E0E;&#x72B6;&#x6001;&#x65E0;&#x5173;&#xFF0C;&#x4E0D;&#x4F9D;&#x8D56;<code>Promise</code>&#x7684;&#x5904;&#x7406;&#x7ED3;&#x679C;&#x3002;</p><p>&#x5176;&#x672C;&#x8D28;&#x548C;<code>catch</code>&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x662F;<code>then</code>&#x65B9;&#x6CD5;&#x7684;&#x53D8;&#x79CD;&#x3002;<br>&#x4E0D;&#x8FC7;&#x5176;&#x4EC5;&#x4EC5;&#x662F;&#x72B6;&#x6001;&#x7684;&#x4F20;&#x9012;&#x8005;&#xFF0C;&#x53EA;&#x4F1A;&#x8FD4;&#x56DE;&#x539F;&#x72B6;&#x6001;&#xFF0C;&#x4E0D;&#x4F1A;&#x63A5;&#x6536;&#x72B6;&#x6001;&#x548C;&#x521B;&#x5EFA;&#x65B0;&#x7684;&#x72B6;&#x6001;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p.finally(() =&gt; {
  // codes...
});

--- &#x7B49;&#x4EF7;&#x4E8E;

p.then(res =&gt; {
  // codes...
  return res; // &#x5C06;&#x539F;&#x6210;&#x529F;&#x72B6;&#x6001;&#x8FD4;&#x56DE;
}, err =&gt; {
  // codes...
  throw err; // &#x5C06;&#x539F;&#x5931;&#x8D25;&#x72B6;&#x6001;&#x8FD4;&#x56DE;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">p.finally(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// codes...</span>
});

--- &#x7B49;&#x4EF7;&#x4E8E;

p.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-comment">// codes...</span>
  <span class="hljs-keyword">return</span> res; <span class="hljs-comment">// &#x5C06;&#x539F;&#x6210;&#x529F;&#x72B6;&#x6001;&#x8FD4;&#x56DE;</span>
}, err =&gt; {
  <span class="hljs-comment">// codes...</span>
  <span class="hljs-keyword">throw</span> err; <span class="hljs-comment">// &#x5C06;&#x539F;&#x5931;&#x8D25;&#x72B6;&#x6001;&#x8FD4;&#x56DE;</span>
});</code></pre><p><strong>&#x793A;&#x4F8B;</strong><br>&#x5728;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x663E;&#x793A;&#x52A0;&#x8F7D;&#x56FE;&#x6848;&#xFF0C;&#x8BF7;&#x6C42;&#x5B8C;&#x6210;&#x540E;&#x65E0;&#x8BBA;&#x7ED3;&#x679C;&#x90FD;&#x8981;&#x9690;&#x85CF;&#x6B64;&#x56FE;&#x6848;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E00;&#x822C;&#xFF0C;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684; Promise &#x7684;&#x7ED3;&#x6784;&#x4F1A;&#x5982;&#x4E0B;&#x3002;

showLoading = true;

new Promise((resolve, reject) =&gt; {
  // &#x8BF7;&#x6C42;...
})
.then(res =&gt; {
  // &#x6210;&#x529F;&#x5904;&#x7406;...
})
.catch(err =&gt; {
  // &#x5931;&#x8D25;&#x5904;&#x7406;...
})
.finally(() =&gt; {
  // &#x91CD;&#x7F6E;&#x4E00;&#x4E9B;&#x72B6;&#x6001;...
  showLoading = false;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E00;&#x822C;&#xFF0C;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684; <span class="hljs-built_in">Promise</span> &#x7684;&#x7ED3;&#x6784;&#x4F1A;&#x5982;&#x4E0B;&#x3002;

showLoading = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-comment">// &#x8BF7;&#x6C42;...</span>
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-comment">// &#x6210;&#x529F;&#x5904;&#x7406;...</span>
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-comment">// &#x5931;&#x8D25;&#x5904;&#x7406;...</span>
})
.finally(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// &#x91CD;&#x7F6E;&#x4E00;&#x4E9B;&#x72B6;&#x6001;...</span>
  showLoading = <span class="hljs-literal">false</span>;
});</code></pre><h2 id="articleHeader9">4 &#x9759;&#x6001;&#x65B9;&#x6CD5;</h2><h3 id="articleHeader10">4.1 resolve()</h3><p>&#x6B64;&#x65B9;&#x6CD5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x4E3A;<code>resolved</code>&#xFF0C;&#x503C;&#x4E3A;&#x5176;&#x53C2;&#x6570;&#x7684;<code>Promise</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(res);
--- &#x7B49;&#x4EF7;&#x4E8E;
new Promise(resolve =&gt; resolve(res));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.resolve(res);
--- &#x7B49;&#x4EF7;&#x4E8E;
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> resolve(res));</code></pre><h3 id="articleHeader11">4.2 reject()</h3><p>&#x6B64;&#x65B9;&#x6CD5;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x4E3A;<code>rejected</code>&#xFF0C;&#x503C;&#x4E3A;&#x5176;&#x53C2;&#x6570;&#x7684;<code>Promise</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.reject(res);
--- &#x7B49;&#x4EF7;&#x4E8E;
new Promise((resolve, reject) =&gt; reject(res));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.reject(res);
--- &#x7B49;&#x4EF7;&#x4E8E;
<span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> reject(res));</code></pre><h3 id="articleHeader12">4.3 all()</h3><p>&#x6B64;&#x65B9;&#x6CD5;&#x7528;&#x4E8E;&#x5C06;&#x591A;&#x4E2A;<code>Promise</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x5305;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>Promise</code>&#x5B9E;&#x4F8B;&#x3002;<br>&#x5176;&#x53C2;&#x6570;&#x4E3A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x6BCF;&#x4E00;&#x9879;&#x5E94;&#x4E3A;<code>Promise</code>&#x5B9E;&#x4F8B;&#xFF08;&#x4E0D;&#x662F;&#x5219;&#x4F1A;&#x4F7F;&#x7528;<code>Promise.resolve</code>&#x8FDB;&#x884C;&#x8F6C;&#x5316;&#xFF09;&#x3002;</p><p>&#x65B0;<code>Promise</code>&#x7684;&#x72B6;&#x6001;&#x53D6;&#x51B3;&#x4E8E;&#x4F20;&#x5165;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x7684;&#x6700;&#x7EC8;&#x72B6;&#x6001;&#x3002;<br>&#x5982;&#x679C;&#x6709;&#x4E00;&#x9879;&#x72B6;&#x6001;&#x53D8;&#x6210;<code>rejected</code>&#xFF0C;&#x65B0;&#x5B9E;&#x4F8B;&#x5219;&#x4E3A;<code>rejected</code>&#xFF0C;&#x503C;&#x4E3A;&#x8BE5;&#x9879;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x3002;<br>&#x5982;&#x679C;&#x5168;&#x90E8;&#x9879;&#x90FD;&#x53D8;&#x6210;&#x4E86;<code>resolved</code>&#xFF0C;&#x65B0;&#x5B9E;&#x4F8B;&#x5219;&#x4E3A;<code>resolved</code>&#xFF0C;&#x503C;&#x4E3A;&#x5305;&#x542B;&#x6BCF;&#x4E00;&#x9879;&#x8FD4;&#x56DE;&#x503C;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E09;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[1, 2, 3]&#x3002;

let pArr = [1, 2, 3].map(createPromise);

Promise.all(pArr).then(console.log);

function createPromise(num) {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; { resolve(num) }, num * 1000);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E09;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]&#x3002;

<span class="hljs-keyword">let</span> pArr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(createPromise);

<span class="hljs-built_in">Promise</span>.all(pArr).then(<span class="hljs-built_in">console</span>.log);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPromise</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { resolve(num) }, num * <span class="hljs-number">1000</span>);
  });
}</code></pre><h3 id="articleHeader13">4.4 race()</h3><p>&#x6B64;&#x65B9;&#x6CD5;&#x4E0E;<code>all()</code>&#x57FA;&#x672C;&#x76F8;&#x540C;&#xFF0C;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;<code>Promise</code>&#x6570;&#x7EC4;&#x3002;<br>&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;&#x65B0;<code>Promise</code>&#x7684;&#x6700;&#x7EC8;&#x72B6;&#x6001;&#x662F;&#x7531;&#x6570;&#x7EC4;&#x4E2D;&#x7B2C;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x7684;&#x9879;&#xFF08;&#x6210;&#x529F;&#x6216;&#x5931;&#x8D25;&#xFF09;&#x51B3;&#x5B9A;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA; 1 &#x3002;

let pArr = [1, 2, 3].map(createPromise);

Promise.race(pArr).then(console.log);

function createPromise(num) {
  return new Promise((resolve, reject) =&gt; {
    setTimeout(() =&gt; { resolve(num) }, num * 1000);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA; <span class="hljs-number">1</span> &#x3002;

<span class="hljs-keyword">let</span> pArr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>].map(createPromise);

<span class="hljs-built_in">Promise</span>.race(pArr).then(<span class="hljs-built_in">console</span>.log);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPromise</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { resolve(num) }, num * <span class="hljs-number">1000</span>);
  });
}</code></pre><h2 id="articleHeader14">5 &#x6DF7;&#x5408;&#x5B9E;&#x6218;</h2><p>&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x6709;&#x65F6;&#x9700;&#x8981;&#x5904;&#x7406;&#x591A;&#x4E2A;&#x76F8;&#x4E92;&#x5173;&#x8054;&#x7684;&#x5F02;&#x6B65;&#x811A;&#x672C;&#xFF08;&#x591A;&#x4E3A;&#x6570;&#x636E;&#x8BF7;&#x6C42;&#xFF09;&#x3002;<br><code>ES6</code>&#x4E4B;&#x540E;<code>async</code>&#x51FD;&#x6570;&#x5E94;&#x8BE5;&#x662F;&#x6700;&#x7075;&#x6D3B;&#x65B9;&#x4FBF;&#x7684;&#x9014;&#x5F84;&#xFF0C;<code>Promise</code>&#x5728;&#x5176;&#x4E2D;&#x626E;&#x6F14;&#x57FA;&#x77F3;&#x7684;&#x89D2;&#x8272;&#x3002;<br>&#x4E0D;&#x8FC7;&#x5728;&#x8FD9;&#x4E00;&#x5C0F;&#x8282;&#xFF0C;&#x4F9D;&#x65E7;&#x4F1A;&#x4EE5;<code>Promise</code>&#x4F5C;&#x4E3A;&#x4E3B;&#x8981;&#x7684;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x8FDB;&#x884C;&#x5206;&#x6790;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x662F;&#x4E0B;&#x9762;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#x5171;&#x540C;&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x521B;&#x5EFA;&#x5F02;&#x6B65;&#x3002;
function createPromise(name) {
  return new Promise(resolve =&gt; {
    setTimeout(() =&gt; resolve({
      [name]: `Data form ${name}`
    }), 1000);
  });
}

// &#x5F02;&#x6B65; A, B, C&#x3002;
function A(param) {
  return createPromise(&apos;A&apos;);
}
function B(param) {
  return createPromise(&apos;B&apos;);
}
function C(param) {
  return createPromise(&apos;C&apos;);
}

// &#x5E76;&#x53D1;&#x5904;&#x7406;&#x591A;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x3002;
function dealIndependentRequests(qArr, callback) {
  return new Promise((resolve, reject) =&gt; {
    let done = false;
    let resData = [];
    let leftNum = qArr.length;

    qArr.forEach((q, i) =&gt; {
      Promise.resolve(q).then(res =&gt; {
        !done &amp;&amp; dealRequest(res, i, true);
      }).catch(err =&gt; {
        !done &amp;&amp; dealRequest(err, i, false);
      });
    });

    function dealRequest(res, index, isSuccess) {
      if (callback) {
        done = callback(resData, res, index, isSuccess);
      } else {
        resData[index] = {
          res: res,
          isSuccess: isSuccess
        };
      }

      if ( done || !(--leftNum) ) resolve(resData);
    }
  }); 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// &#x521B;&#x5EFA;&#x5F02;&#x6B65;&#x3002;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPromise</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> resolve({
      [name]: <span class="hljs-string">`Data form <span class="hljs-subst">${name}</span>`</span>
    }), <span class="hljs-number">1000</span>);
  });
}

<span class="hljs-comment">// &#x5F02;&#x6B65; A, B, C&#x3002;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">param</span>) </span>{
  <span class="hljs-keyword">return</span> createPromise(<span class="hljs-string">&apos;A&apos;</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span>(<span class="hljs-params">param</span>) </span>{
  <span class="hljs-keyword">return</span> createPromise(<span class="hljs-string">&apos;B&apos;</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span>(<span class="hljs-params">param</span>) </span>{
  <span class="hljs-keyword">return</span> createPromise(<span class="hljs-string">&apos;C&apos;</span>);
}

<span class="hljs-comment">// &#x5E76;&#x53D1;&#x5904;&#x7406;&#x591A;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x3002;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dealIndependentRequests</span>(<span class="hljs-params">qArr, callback</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> done = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">let</span> resData = [];
    <span class="hljs-keyword">let</span> leftNum = qArr.length;

    qArr.forEach(<span class="hljs-function">(<span class="hljs-params">q, i</span>) =&gt;</span> {
      <span class="hljs-built_in">Promise</span>.resolve(q).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        !done &amp;&amp; dealRequest(res, i, <span class="hljs-literal">true</span>);
      }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        !done &amp;&amp; dealRequest(err, i, <span class="hljs-literal">false</span>);
      });
    });

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dealRequest</span>(<span class="hljs-params">res, index, isSuccess</span>) </span>{
      <span class="hljs-keyword">if</span> (callback) {
        done = callback(resData, res, index, isSuccess);
      } <span class="hljs-keyword">else</span> {
        resData[index] = {
          <span class="hljs-attr">res</span>: res,
          <span class="hljs-attr">isSuccess</span>: isSuccess
        };
      }

      <span class="hljs-keyword">if</span> ( done || !(--leftNum) ) resolve(resData);
    }
  }); 
}</code></pre><h3 id="articleHeader15">5.1</h3><p><strong>5.1.1</strong><br>&#x6709;&#x4E09;&#x4E2A;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7684;&#x5F02;&#x6B65;&#xFF1A;A, B, C&#x3002;<br>&#x6700;&#x7EC8;&#x7684;&#x6570;&#x636E;&#x5FC5;&#x987B;&#x540C;&#x65F6;&#x7ED3;&#x5408;&#x4E09;&#x8005;&#x7684;&#x6570;&#x636E;&#x8BA1;&#x7B97;&#x5F97;&#x51FA;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8981;&#x6C42;&#xFF0C;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>Promise.all</code>&#x8FDB;&#x884C;&#x5E76;&#x53D1;&#x8BF7;&#x6C42;&#xFF0C;&#x7B49;&#x5230;&#x6240;&#x6709;&#x4FE1;&#x606F;&#x5230;&#x9F50;&#x540E;&#x7ED3;&#x675F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5927;&#x6982;&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;Get all data: [{...}, {...}, {...}]&#x3002;

Promise.all([A(), B(), C()])
.then(res =&gt; {
  console.log(`Get all data:`, res);
})
.catch(err =&gt; {
  console.error(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5927;&#x6982;&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;Get all data: [{...}, {...}, {...}]&#x3002;

<span class="hljs-built_in">Promise</span>.all([A(), B(), C()])
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Get all data:`</span>, res);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.error(err);
});</code></pre><p><strong>5.1.2</strong><br>&#x6709;&#x4E09;&#x4E2A;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7684;&#x5F02;&#x6B65;&#xFF1A;A, B, C&#x3002;<br>&#x6700;&#x7EC8;&#x7684;&#x6570;&#x636E;&#x5FC5;&#x987B;&#x540C;&#x65F6;&#x7ED3;&#x5408;A, B&#x7684;&#x6570;&#x636E;&#x8BA1;&#x7B97;&#x5F97;&#x51FA;&#xFF0C;C&#x53EA;&#x662F;&#x4FEE;&#x9970;&#x6570;&#x636E;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8981;&#x6C42;&#xFF0C;&#x4F7F;&#x7528;<code>Promise.all</code>&#x5E76;&#x53D1;A, B&#x8BF7;&#x6C42;&#xFF0C;&#x6210;&#x529F;&#x540E;&#x518D;&#x53D1;C&#x3002;<br>&#x5982;&#x679C;&#x524D;&#x8005;&#x6210;&#x529F;&#xFF0C;&#x518D;&#x770B;C&#x662F;&#x5426;&#x6210;&#x529F;&#xFF0C;&#x4E4B;&#x540E;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x65B9;&#x5F0F;&#x5904;&#x7406;&#x5F97;&#x5230;&#x6700;&#x7EC8;&#x6570;&#x636E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5927;&#x6982;&#x4E24;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[{&#x2026;}, {&#x2026;}] {C: &quot;Data form C&quot;}&#x3002;

Promise.all([A(), B()])
.then(res =&gt; {
  C().then(c =&gt; {
    console.log(res, c);
  })
  .catch(err =&gt; {
    console.log(res);
  });
})
.catch(err =&gt; {
  console.error(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5927;&#x6982;&#x4E24;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[{&#x2026;}, {&#x2026;}] {<span class="hljs-attr">C</span>: <span class="hljs-string">&quot;Data form C&quot;</span>}&#x3002;

<span class="hljs-built_in">Promise</span>.all([A(), B()])
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  C().then(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res, c);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res);
  });
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.error(err);
});</code></pre><p><strong>5.1.3</strong><br>&#x6709;&#x4E09;&#x4E2A;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7684;&#x5F02;&#x6B65;&#xFF1A;A, B, C&#x3002;<br>&#x6700;&#x7EC8;&#x7684;&#x6570;&#x636E;&#x5FC5;&#x987B;&#x57FA;&#x4E8E;&#x7ED3;&#x5408;A&#x7684;&#x6570;&#x636E;&#x8BA1;&#x7B97;&#x5F97;&#x51FA;&#xFF0C;B, C&#x8D77;&#x72EC;&#x7ACB;&#x7684;&#x4FEE;&#x9970;&#x4F5C;&#x7528;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8981;&#x6C42;&#xFF0C;&#x4E0E;&#x4E0A;&#x9762;&#x7684;&#x5904;&#x7406;&#x57FA;&#x672C;&#x76F8;&#x540C;&#x3002;<br>&#x4E0D;&#x8FC7;&#x8981;&#x5728;A&#x7684;&#x56DE;&#x8C03;&#x91CC;&#x540C;&#x65F6;&#x8BF7;&#x6C42;B, C&#xFF0C;&#x5E76;&#x4F7F;&#x7528;&#x72B6;&#x6001;&#x63A7;&#x5236;&#x53D8;&#x91CF;&#x63A7;&#x5236;&#x7A0B;&#x5E8F;&#x7684;&#x8FDB;&#x7A0B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5927;&#x6982;&#x4E24;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;End {A: &quot;Data form A&quot;} [{&#x2026;}, {&#x2026;}]&#x3002;

A()
.then(res =&gt; {
  dealIndependentRequests([B(), C()])
  .then(subs =&gt; {
    console.log(&apos;End&apos;, res, subs);
  })
  .catch(err =&gt; {
    console.log(&apos;End&apos;, res);
  });
})
.catch(err =&gt; {
  console.error(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5927;&#x6982;&#x4E24;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;End {<span class="hljs-attr">A</span>: <span class="hljs-string">&quot;Data form A&quot;</span>} [{&#x2026;}, {&#x2026;}]&#x3002;

A()
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  dealIndependentRequests([B(), C()])
  .then(<span class="hljs-function"><span class="hljs-params">subs</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;End&apos;</span>, res, subs);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;End&apos;</span>, res);
  });
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.error(err);
});</code></pre><h3 id="articleHeader16">5.2</h3><p><strong>5.2.1</strong><br>&#x6709;&#x4E09;&#x4E2A;&#x8BF7;&#x6C42;&#x5F02;&#x6B65;&#xFF1A;A, B, C&#x3002;<br>B&#x7684;&#x8BF7;&#x6C42;&#x9700;&#x8981;&#x53D1;&#x9001;A&#x4E2D;&#x7684;a&#x4FE1;&#x606F;&#x3002;<br>C&#x7684;&#x8BF7;&#x6C42;&#x9700;&#x8981;&#x53D1;&#x9001;B&#x4E2D;&#x7684;b&#x4FE1;&#x606F;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8981;&#x6C42;&#xFF0C;&#x5FC5;&#x987B;&#x9010;&#x6B65;&#x8BF7;&#x6C42;A, B, C&#xFF0C;&#x800C;&#x4E14;&#x524D;&#x4E24;&#x8005;&#x4EFB;&#x4E00;&#x51FA;&#x9519;&#x5219;&#x505C;&#x6B62;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5927;&#x6982;&#x4E09;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;End {C: &quot;Data form C&quot;}&#x3002;

A()
.then(res =&gt; {
  return B(res.a);
})
.then(res =&gt; {
  return C(res.b);  
})
.then(res =&gt; {
  console.log(&apos;End&apos;, res);
})
.catch(err =&gt; {
  console.log(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5927;&#x6982;&#x4E09;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;End {<span class="hljs-attr">C</span>: <span class="hljs-string">&quot;Data form C&quot;</span>}&#x3002;

A()
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> B(res.a);
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> C(res.b);  
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;End&apos;</span>, res);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(err);
});</code></pre><p><strong>5.2.2</strong><br>&#x6709;&#x4E09;&#x4E2A;&#x8BF7;&#x6C42;&#x5F02;&#x6B65;&#xFF1A;A, B, C&#x3002;<br>B&#x7684;&#x8BF7;&#x6C42;&#x9700;&#x8981;&#x53D1;&#x9001;A&#x4E2D;&#x7684;a&#x4FE1;&#x606F;&#xFF0C;&#x5373;&#x4FBF;A&#x5931;&#x8D25;&#x4E5F;&#x9700;&#x8981;&#x53D1;&#x9001;&#x3002;<br>C&#x7684;&#x8BF7;&#x6C42;&#x9700;&#x8981;&#x53D1;&#x9001;B&#x4E2D;&#x7684;b&#x4FE1;&#x606F;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8981;&#x6C42;&#xFF0C;&#x4E0E;&#x524D;&#x8005;&#x57FA;&#x672C;&#x76F8;&#x540C;&#xFF0C;&#x53EA;&#x662F;&#x5373;&#x4FBF;A&#x5931;&#x8D25;&#x4E86;&#x4E5F;&#x4F1A;&#x7EE7;&#x7EED;&#x8BF7;&#x6C42;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5927;&#x6982;&#x4E09;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;End {C: &quot;Data form C&quot;}&#x3002;

A()
.then(res =&gt; {
  return B(res.a);
})
.catch(err =&gt; {
  return B();
})
.then(res =&gt; {
  return C(res.b);  
})
.then(res =&gt; {
  console.log(&apos;End&apos;, res);
})
.catch(err =&gt; {
  console.log(err);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5927;&#x6982;&#x4E09;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;End {<span class="hljs-attr">C</span>: <span class="hljs-string">&quot;Data form C&quot;</span>}&#x3002;

A()
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> B(res.a);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> B();
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> C(res.b);  
})
.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;End&apos;</span>, res);
})
.catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(err);
});</code></pre><h3 id="articleHeader17">5.3</h3><p><strong>5.3.1</strong><br>&#x6709;&#x4E09;&#x4E2A;&#x8BF7;&#x6C42;&#x5F02;&#x6B65;&#xFF1A;A, B, C&#x3002;<br>&#x9700;&#x8981;&#x627E;&#x51FA;&#x6240;&#x6709;&#x5F02;&#x6B65;&#x7ED3;&#x679C;&#x4E2D;&#xFF0C;&#x5305;&#x542B;&#x67D0;&#x503C;&#x7684;&#x7ED3;&#x679C;&#x7684;&#x96C6;&#x5408;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8981;&#x6C42;&#xFF0C;&#x5E76;&#x53D1;&#x8BF7;&#x6C42;&#x6240;&#x6709;&#x6570;&#x636E;&#xFF0C;&#x4E00;&#x4E00;&#x9A8C;&#x8BC1;&#x8FD4;&#x56DE;&#x7B26;&#x5408;&#x7684;&#x7ED3;&#x679C;&#x96C6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5927;&#x6982;&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[{B: &quot;Data form B&quot;}]

dealIndependentRequests([A(), B(), C()], (data, res) =&gt; {
  if (res.B) data.push(res);
  return false;
})
.then(console.log)
.catch(console.log);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5927;&#x6982;&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[{<span class="hljs-attr">B</span>: <span class="hljs-string">&quot;Data form B&quot;</span>}]

dealIndependentRequests([A(), B(), C()], (data, res) =&gt; {
  <span class="hljs-keyword">if</span> (res.B) data.push(res);
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
})
.then(<span class="hljs-built_in">console</span>.log)
.catch(<span class="hljs-built_in">console</span>.log);</code></pre><p><strong>5.3.2</strong><br>&#x6709;&#x4E09;&#x4E2A;&#x8BF7;&#x6C42;&#x5F02;&#x6B65;&#xFF1A;A, B, C&#x3002;<br>&#x53EA;&#x9700;&#x8981;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x67D0;&#x503C;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x8981;&#x6C42;&#xFF0C;&#x8FD8;&#x662F;&#x4F7F;&#x7528;&#x5E76;&#x53D1;&#x8BF7;&#x6C42;&#x3002;<br>&#x6709;&#x4EFB;&#x4E00;&#x8BF7;&#x6C42;&#x7B26;&#x5408;&#x9884;&#x671F;&#x65F6;&#xFF0C;&#x7ED3;&#x675F;&#x5E76;&#x8FD4;&#x56DE;&#xFF08;&#x6682;&#x4E0D;&#x6D89;&#x53CA;&#x53D6;&#x6D88;&#x8BF7;&#x6C42;&#x64CD;&#x4F5C;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x5927;&#x6982;&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[{B: &quot;Data form B&quot;}]

dealIndependentRequests([A(), B(), C()], (data, res) =&gt; {
  if (res.B) return data.push(res);
  return false;
})
.then(console.log)
.catch(console.log);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">&#x5927;&#x6982;&#x4E00;&#x79D2;&#x540E;&#xFF0C;&#x6253;&#x5370;&#x51FA;&#xFF1A;[{<span class="hljs-attr">B</span>: <span class="hljs-string">&quot;Data form B&quot;</span>}]

dealIndependentRequests([A(), B(), C()], (data, res) =&gt; {
  <span class="hljs-keyword">if</span> (res.B) <span class="hljs-keyword">return</span> data.push(res);
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
})
.then(<span class="hljs-built_in">console</span>.log)
.catch(<span class="hljs-built_in">console</span>.log);</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6精华：Promise

## 原文链接
[https://segmentfault.com/a/1190000015423360](https://segmentfault.com/a/1190000015423360)


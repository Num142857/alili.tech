---
title: 学习 Promise，掌握未来世界 JS 异步编程基础
hidden: true
categories: reprint
slug: 3d036679
date: 2018-11-03 10:03:44
---

{{< raw >}}
<blockquote>&#x5176;&#x5B9E;&#x60F3;&#x5199; Promise &#x7684;&#x4F7F;&#x7528;&#x5DF2;&#x7ECF;&#x5F88;&#x957F;&#x65F6;&#x95F4;&#x4E86;&#x3002;&#x4E00;&#x4E2A;&#x662F;&#x5728;&#x5B9E;&#x9645;&#x7F16;&#x7801;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x7ECF;&#x5E38;&#x7528;&#x5230;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x786E;&#x5B9E;&#x6709;&#x65F6;&#x5019;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x5728;&#x4F7F;&#x7528;&#x65F6;&#x4E5F;&#x4F1A;&#x9047;&#x5230;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#x3002;<br>Promise &#x4E5F;&#x786E;&#x5B9E;&#x662F; ES6 &#x4E2D; &#x5BF9;&#x4E8E;&#x5199; JS &#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x6709;&#x7740;&#x771F;&#x6B63;&#x6700;&#x5927;&#x5F71;&#x54CD;&#x7684; API &#x7279;&#x6027;&#x4E4B;&#x4E00;&#x3002;<br>&#x672C;&#x6587;&#x662F;&#x5B9E;&#x9645;&#x4F7F;&#x7528;&#x4F7F;&#x7528;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#x603B;&#x7ED3;<br>&#x770B;&#x4E00;&#x4E0B;&#x6587;&#x4EF6;&#x521B;&#x5EFA;&#x65F6;&#x95F4; 2017-10-09&#xFF0C;&#x62D6;&#x5EF6;&#x75C7;&#x771F;&#x662F;&#x592A;&#x53EF;&#x6015;&#x4E86;&#x3002;&#x3002;&#x3002;&#x8FD8;&#x662F;&#x5F97;&#x589E;&#x5F3A;&#x6267;&#x884C;&#x529B;&#x554A;&#xFF01;&#x4E0D;&#x5FD8;&#x521D;&#x5FC3;&#xFF0C;&#x52A0;&#x6CB9;&#x5427;&#xFF01;<br><a href="https://blog.guowenfh.com/" rel="nofollow noreferrer" target="_blank">&#x535A;&#x5BA2;&#x539F;&#x5740;</a></blockquote><h2 id="articleHeader0">&#x524D;&#x8A00; &amp;&amp; &#x57FA;&#x7840;&#x6982;&#x5FF5;</h2><p>Promise &#x662F;&#x89E3;&#x51B3; JS &#x5F02;&#x6B65;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x6848;&#xFF0C;&#x76F8;&#x6BD4;&#x4F20;&#x7EDF;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;Promise &#x80FD;&#x89E3;&#x51B3;&#x591A;&#x4E2A;&#x56DE;&#x8C03;&#x4E25;&#x91CD;&#x5D4C;&#x5957;&#x7684;&#x95EE;&#x9898;&#x3002;</p><p>Promise &#x5BF9;&#x8C61;&#x4EE3;&#x8868;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x6709;&#x4E09;&#x79CD;&#x72B6;&#x6001;: <code>pending&#x3001;fulfilled &#x6216; rejected</code> &#xFF0C;&#x72B6;&#x6001;&#x7684;&#x8F6C;&#x53D8;&#x53EA;&#x80FD;&#x662F; <code>pending -&gt; fulfilled</code> &#x6216;&#x8005; <code>pending -&gt; rejected</code> &#xFF0C;&#x4E14;<strong>&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x4E00;&#x65E6;&#x53D1;&#x751F;&#x5C31;&#x4E0D;&#x53EF;&#x9006;&#x8F6C;</strong>&#x3002;</p><p>&lt;!-- more --&gt;</p><blockquote><p>&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x8BB2;&#x89E3; Promise &#x5B9E;&#x9645;&#x4E0A;&#x9700;&#x8981;&#x5206;&#x6210;&#x4E24;&#x4E2A;&#x90E8;&#x5206;</p><ol><li>&#x5BF9;&#x4E8E; Promise &#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4F7F;&#x7528;&#x8BF4;&#x660E;&#x3002;</li><li>Promise &#x539F;&#x578B;&#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x3002;</li></ol></blockquote><h2 id="articleHeader1">Promise &#x6784;&#x9020;&#x51FD;&#x6570;</h2><p>ES6 &#x89C4;&#x5B9A;&#xFF0C;Promise &#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x6765;&#x751F;&#x6210; Promise &#x5B9E;&#x4F8B;&#x3002;</p><p>Promise &#x6784;&#x9020;&#x51FD;&#x6570;&#x63A5;&#x53D7;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x7684;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#x5206;&#x522B;&#x662F; resolve &#x548C; reject &#x3002;&#x5B83;&#x4EEC;&#x662F;&#x4E24;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x7531; JavaScript &#x5F15;&#x64CE;&#x63D0;&#x4F9B;&#xFF0C;&#x4E0D;&#x7528;&#x81EA;&#x5DF1;&#x90E8;&#x7F72;&#x3002;</p><p>resolve &#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5C06; Promise &#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4ECE;&#x201C;&#x672A;&#x5B8C;&#x6210;&#x201D;&#x53D8;&#x4E3A;&#x201C;&#x6210;&#x529F;&#x201D;&#xFF08;&#x5373;&#x4ECE; pending &#x53D8;&#x4E3A; fulfilled &#xFF09;&#xFF0C;&#x5728;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x5E76;&#x5C06;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x51FA;&#x53BB;&#xFF1B;<br>reject &#x51FD;&#x6570;&#x7684;&#x4F5C;&#x7528;&#x662F;&#xFF0C;&#x5C06; Promise &#x5BF9;&#x8C61;&#x7684;&#x72B6;&#x6001;&#x4ECE;&#x201C;&#x672A;&#x5B8C;&#x6210;&#x201D;&#x53D8;&#x4E3A;&#x201C;&#x5931;&#x8D25;&#x201D;&#xFF08;&#x5373;&#x4ECE; pending &#x53D8;&#x4E3A; rejected &#xFF09;&#xFF0C;&#x5728;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x5931;&#x8D25;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x5E76;&#x5C06;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x62A5;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x51FA;&#x53BB;&#x3002;</p><p>&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x521B;&#x9020;&#x4E86;&#x4E00;&#x4E2A; Promise &#x5B9E;&#x4F8B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function request() {
  return new Promise((resolve, reject) =&gt; {
    /* &#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F; */
    setTimeout(() =&gt; {
      resolve(&quot;success&quot;);
    }, 1000);
    // &#x53D6;&#x6D88;&#x6CE8;&#x91CA;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x4F53;&#x73B0;&#xFF0C;Promise &#x7684;&#x72B6;&#x6001;&#x4E00;&#x65E6;&#x53D8;&#x66F4;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x53D8;&#x5316;&#x7684;&#x7279;&#x6027;
    // reject(&apos;error&apos;);
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-comment">/* &#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x6210;&#x529F; */</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve(<span class="hljs-string">&quot;success&quot;</span>);
    }, <span class="hljs-number">1000</span>);
    <span class="hljs-comment">// &#x53D6;&#x6D88;&#x6CE8;&#x91CA;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x4F53;&#x73B0;&#xFF0C;Promise &#x7684;&#x72B6;&#x6001;&#x4E00;&#x65E6;&#x53D8;&#x66F4;&#x5C31;&#x4E0D;&#x4F1A;&#x518D;&#x53D8;&#x5316;&#x7684;&#x7279;&#x6027;</span>
    <span class="hljs-comment">// reject(&apos;error&apos;);</span>
  });
}</code></pre><p>&#x63A5;&#x6536;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request()
  .then(result =&gt; {
    console.info(result);
  })
  .catch(error =&gt; {
    console.info(error);
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">request()
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(error);
  });</code></pre><p>&#x4E0A;&#x8FF0; <code>new Promise()</code> &#x4E4B;&#x540E;&#xFF0C;&#x9664;&#x53BB;&#x7528; catch &#x53BB;&#x6355;&#x83B7;&#x9519;&#x8BEF;&#x4E4B;&#x5916;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x7528; <code>then</code> &#x65B9;&#x6CD5;&#x6307;&#x5B9A; <code>resolve</code> &#x548C; <code>reject</code> &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;<br>&#x4E5F;&#x80FD;&#x8FBE;&#x5230;&#x6355;&#x83B7;&#x9519;&#x8BEF;&#x7684;&#x76EE;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="request().then(
  result =&gt; {
    console.info(result);
  },
  error =&gt; {
    console.info(error);
  }
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">request().then(
  <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result);
  },
  error =&gt; {
    <span class="hljs-built_in">console</span>.info(error);
  }
);</code></pre><p>&#x539F;&#x578B;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;</p><h3 id="articleHeader2"><code>Promise.prototype.then()</code></h3><blockquote>p.then(onFulfilled, onRejected);</blockquote><p>then &#x65B9;&#x6CD5; &#x662F;&#x5B9A;&#x4E49;&#x5728; <code>Promise.prototype</code> &#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E00;&#x6837;&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<code>fulfilled</code> &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x548C; <code>rejected</code> &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x65F6;&#x53EF;&#x9009;&#x7684;&#x3002;</p><p>&#x4E24;&#x4E2A;&#x5173;&#x952E;&#x70B9;&#xFF1A;</p><ol><li>then &#x65B9;&#x6CD5;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684; <code>Promise</code> &#x5B9E;&#x4F8B;&#xFF0C;&#x6240;&#x4EE5;&#x5BF9;&#x4E8E;&#x8C03;&#x7528;&#x8005;&#x800C;&#x8A00;&#xFF0C;&#x62FF;&#x5230;&#x4E00;&#x4E2A; <code>Promise</code> &#x5BF9;&#x8C61;&#xFF0C;&#x8C03;&#x7528; <code>then</code> &#x540E;&#x4ECD;&#x7136;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; <code>Promise</code> &#xFF0C;&#x800C;&#x5B83;&#x7684;&#x884C;&#x4E3A;&#x4E0E; then &#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x6709;&#x5173;&#x3002;&#x5982;&#x4E0B;&#xFF1A;</li></ol><ul><li>&#x5982;&#x679C; then &#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x90A3;&#x4E48; then &#x8FD4;&#x56DE;&#x7684; Promise &#x5C06;&#x4F1A;&#x6210;&#x4E3A;&#x63A5;&#x53D7;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x8FD4;&#x56DE;&#x7684;&#x503C;&#x4F5C;&#x4E3A;&#x63A5;&#x53D7;&#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x503C;&#x3002;</li><li>&#x5982;&#x679C; then &#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;&#x90A3;&#x4E48; then &#x8FD4;&#x56DE;&#x7684; Promise &#x5C06;&#x4F1A;&#x6210;&#x4E3A;&#x62D2;&#x7EDD;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;&#x4F5C;&#x4E3A;&#x62D2;&#x7EDD;&#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x503C;&#x3002;</li><li>&#x5982;&#x679C; then &#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5DF2;&#x7ECF;&#x662F;&#x63A5;&#x53D7;&#x72B6;&#x6001;&#x7684; Promise&#xFF0C;&#x90A3;&#x4E48; then &#x8FD4;&#x56DE;&#x7684; Promise &#x4E5F;&#x4F1A;&#x6210;&#x4E3A;&#x63A5;&#x53D7;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x90A3;&#x4E2A; Promise &#x7684;&#x63A5;&#x53D7;&#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x503C;&#x4F5C;&#x4E3A;&#x8BE5;&#x88AB;&#x8FD4;&#x56DE;&#x7684; Promise &#x7684;&#x63A5;&#x53D7;&#x72B6;&#x6001;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x503C;&#x3002;</li><li>&#x5982;&#x679C; then &#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5DF2;&#x7ECF;&#x662F;&#x62D2;&#x7EDD;&#x72B6;&#x6001;&#x7684; Promise&#xFF0C;&#x90A3;&#x4E48; then &#x8FD4;&#x56DE;&#x7684; Promise &#x4E5F;&#x4F1A;&#x6210;&#x4E3A;&#x62D2;&#x7EDD;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x90A3;&#x4E2A; Promise &#x7684;&#x62D2;&#x7EDD;&#x72B6;&#x6001;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x503C;&#x4F5C;&#x4E3A;&#x8BE5;&#x88AB;&#x8FD4;&#x56DE;&#x7684; Promise &#x7684;&#x62D2;&#x7EDD;&#x72B6;&#x6001;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x503C;&#x3002;</li><li>&#x5982;&#x679C; then &#x4E2D;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x672A;&#x5B9A;&#x72B6;&#x6001;&#xFF08;pending&#xFF09;&#x7684; Promise&#xFF0C;&#x90A3;&#x4E48; then &#x8FD4;&#x56DE; Promise &#x7684;&#x72B6;&#x6001;&#x4E5F;&#x662F;&#x672A;&#x5B9A;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x7684;&#x7EC8;&#x6001;&#x4E0E;&#x90A3;&#x4E2A; Promise &#x7684;&#x7EC8;&#x6001;&#x76F8;&#x540C;&#xFF1B;&#x540C;&#x65F6;&#xFF0C;&#x5B83;&#x53D8;&#x4E3A;&#x7EC8;&#x6001;&#x65F6;&#x8C03;&#x7528;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x53C2;&#x6570;&#x4E0E;&#x90A3;&#x4E2A; Promise &#x53D8;&#x4E3A;&#x7EC8;&#x6001;&#x65F6;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x662F;&#x76F8;&#x540C;&#x7684;&#x3002;</li></ul><ol><li>&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x3002;&#x628A;&#x5D4C;&#x5957;&#x56DE;&#x8C03;&#x7684;&#x4EE3;&#x7801;&#x683C;&#x5F0F;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x79CD;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#x7EB5;&#x5411;&#x6A21;&#x5F0F;&#x3002;</li></ol><p>&#x6BD4;&#x5982;&#x8BF4;&#x56DE;&#x8C03;&#x5F62;&#x5F0F;: &#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x5730;&#x72F1;&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a(a1 =&gt; {
  b(a1, b1 =&gt; {
    c(b1, c1 =&gt; {
      d(c1, d1 =&gt; {
        console.log(d1);
      });
    });
  });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">a(<span class="hljs-function"><span class="hljs-params">a1</span> =&gt;</span> {
  b(a1, b1 =&gt; {
    c(b1, c1 =&gt; {
      d(c1, d1 =&gt; {
        <span class="hljs-built_in">console</span>.log(d1);
      });
    });
  });
});</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x6A2A;&#x5411;&#x6269;&#x5C55;&#x53EF;&#x4EE5;&#x4FEE;&#x6539;&#x6210;(a,b,c,d)&#x5747;&#x4E3A;&#x8FD4;&#x56DE; Promise &#x7684;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a()
  .then(b)
  .then(c)
  .then(d)
  .then(d1 =&gt; {
    console.log(d1);
  });
//===== &#x53EF;&#x80FD;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x5E76;&#x4E0D;&#x592A;&#x597D;&#x770B; ===&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x66F4;&#x76F4;&#x89C2;
a()
  .then(a1 =&gt; b(a1))
  .then(b1 =&gt; c(b1))
  .then(c1 =&gt; d(c1))
  .then(d1 =&gt; {
    console.log(d1);
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">a()
  .then(b)
  .then(c)
  .then(d)
  .then(<span class="hljs-function"><span class="hljs-params">d1</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(d1);
  });
<span class="hljs-comment">//===== &#x53EF;&#x80FD;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x5E76;&#x4E0D;&#x592A;&#x597D;&#x770B; ===&#x4E0B;&#x9762;&#x8FD9;&#x6837;&#x66F4;&#x76F4;&#x89C2;</span>
a()
  .then(<span class="hljs-function"><span class="hljs-params">a1</span> =&gt;</span> b(a1))
  .then(<span class="hljs-function"><span class="hljs-params">b1</span> =&gt;</span> c(b1))
  .then(<span class="hljs-function"><span class="hljs-params">c1</span> =&gt;</span> d(c1))
  .then(<span class="hljs-function"><span class="hljs-params">d1</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(d1);
  });</code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x7EB5;&#x5411;&#x7ED3;&#x6784;&#xFF0C;&#x770B;&#x4E0A;&#x53BB;&#x6E05;&#x723D;&#x591A;&#x4E86;&#x3002;</p><h3 id="articleHeader3"><code>Promise.prototype.catch()</code></h3><p>&#x9664;&#x4E86; <code>then()</code> &#xFF0C;&#x5728; <code>Promise.prototype</code> &#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x8FD8;&#x6709; <code>catch()</code> &#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x62D2;&#x7EDD;&#x7684;&#x60C5;&#x51B5;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#x3002;</p><p>&#x5176;&#x5B9E; &#x5B83;&#x7684;&#x884C;&#x4E3A;&#x4E0E;&#x8C03;&#x7528; <code>Promise.prototype.then(undefined, onRejected)</code> &#x76F8;&#x540C;&#x3002; (&#x4E8B;&#x5B9E;&#x4E0A;, calling <code>obj.catch(onRejected)</code> &#x5185;&#x90E8; calls <code>obj.then(undefined, onRejected))</code>.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1.
request().then(
  result =&gt; {
    console.info(result);
  },
  error =&gt; {
    console.info(error);
  }
);

// 2.
request()
  .then(result =&gt; {
    console.info(result);
  })
  .catch(error =&gt; {
    console.info(error);
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1.</span>
request().then(
  <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result);
  },
  error =&gt; {
    <span class="hljs-built_in">console</span>.info(error);
  }
);

<span class="hljs-comment">// 2.</span>
request()
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(result);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(error);
  });</code></pre><p>&#x5982;&#x4E0A;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x5728;&#x4F7F;&#x7528;&#xFF0C;&#x4E0E;&#x7ED3;&#x679C;&#x57FA;&#x672C;&#x4E0A;&#x662F;&#x7B49;&#x4EF7;&#x7684;&#xFF0C;&#x4F46;&#x662F; &#x4ECD;&#x7136;&#x63A8;&#x8350;&#x7B2C;&#x4E8C;&#x79CD;&#x5199;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4F1A;&#x7ED9;&#x51FA;&#x539F;&#x56E0;:</p><ol><li>&#x5728; Promise &#x94FE;&#x4E2D; <code>Promise.prototype.then(undefined, onRejected)</code>&#xFF0C;<code>onRejected</code> &#x65B9;&#x6CD5;&#x65E0;&#x6CD5;&#x6355;&#x83B7;&#x5F53;&#x524D; Promise &#x629B;&#x51FA;&#x7684;&#x9519;&#x8BEF;,&#x800C;&#x540E;&#x7EED;&#x7684; .catch &#x53EF;&#x4EE5;&#x6355;&#x83B7;&#x4E4B;&#x524D;&#x7684;&#x9519;&#x8BEF;&#x3002;</li><li>&#x4EE3;&#x7801;&#x5197;&#x4F59;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(&quot;reject&quot;);
  }, 1000);
})
  .then(
    result =&gt; {
      console.log(result + &quot;1&quot;);
      throw Error(result + &quot;1&quot;); // &#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;
    },
    error =&gt; {
      console.log(error + &quot;:1&quot;); // &#x4E0D;&#x4F1A;&#x8D70;&#x5230;&#x8FD9;&#x91CC;
    }
  )
  .then(
    result =&gt; {
      console.log(result + &quot;2&quot;);
      return Promise.resolve(result + &quot;2&quot;);
    },
    error =&gt; {
      console.log(error + &quot;:2&quot;);
    }
  );
// reject1, Error: reject1:2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-string">&quot;reject&quot;</span>);
  }, <span class="hljs-number">1000</span>);
})
  .then(
    <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(result + <span class="hljs-string">&quot;1&quot;</span>);
      <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(result + <span class="hljs-string">&quot;1&quot;</span>); <span class="hljs-comment">// &#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;</span>
    },
    error =&gt; {
      <span class="hljs-built_in">console</span>.log(error + <span class="hljs-string">&quot;:1&quot;</span>); <span class="hljs-comment">// &#x4E0D;&#x4F1A;&#x8D70;&#x5230;&#x8FD9;&#x91CC;</span>
    }
  )
  .then(
    <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(result + <span class="hljs-string">&quot;2&quot;</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(result + <span class="hljs-string">&quot;2&quot;</span>);
    },
    error =&gt; {
      <span class="hljs-built_in">console</span>.log(error + <span class="hljs-string">&quot;:2&quot;</span>);
    }
  );
<span class="hljs-comment">// reject1, Error: reject1:2</span></code></pre><p>&#x5982;&#x679C;&#x4F7F;&#x7528; <code>.catch</code> &#x65B9;&#x6CD5;&#xFF0C;&#x4EE3;&#x7801;&#x4F1A;&#x7B80;&#x5316;&#x5F88;&#x591A;&#xFF0C;<strong>&#x8FD9;&#x6837;&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x5EF6;&#x957F;&#x4E86; Promise &#x94FE;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(&quot;reject&quot;);
  }, 1000);
})
  .then(result =&gt; {
    console.log(result + &quot;1&quot;);
    throw Error(result + &quot;1&quot;); // &#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;
  })
  .then(result =&gt; {
    console.log(result + &quot;2&quot;);
    return Promise.resolve(result + &quot;2&quot;);
  })
  .catch(err =&gt; {
    console.log(err);
  });
// reject1, Error: reject1:2" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-string">&quot;reject&quot;</span>);
  }, <span class="hljs-number">1000</span>);
})
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(result + <span class="hljs-string">&quot;1&quot;</span>);
    <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(result + <span class="hljs-string">&quot;1&quot;</span>); <span class="hljs-comment">// &#x629B;&#x51FA;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;</span>
  })
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(result + <span class="hljs-string">&quot;2&quot;</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(result + <span class="hljs-string">&quot;2&quot;</span>);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err);
  });
<span class="hljs-comment">// reject1, Error: reject1:2</span></code></pre><h3 id="articleHeader4"><code>Promise.prototype.finally()</code></h3><p><strong>&#x6682;&#x672A;&#x5B8C;&#x5168;&#x6210;&#x4E3A;&#x6807;&#x51C6;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x5904;&#x4E8E;&#xFF1A;Stage 4</strong></p><p><code>finally()</code> &#x65B9;&#x6CD5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A; <code>Promise</code>&#xFF0C;&#x5728;&#x6267;&#x884C; <code>then()</code> &#x548C; <code>catch()</code> &#x540E;&#xFF0C;&#x90FD;&#x4F1A;&#x6267;&#x884C;<code>finally</code>&#x6307;&#x5B9A;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;&#xFF08;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x65E0;&#x53C2;&#x6570;&#xFF0C;&#x4EC5;&#x4EC5;&#x4EE3;&#x8868; Promise &#x7684;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F;</p><p>&#x7B49;&#x540C;&#x4E8E;&#x4F7F;&#x7528; <code>.then</code> + <code>.catch</code> &#x5EF6;&#x957F;&#x4E86;&#x539F;&#x6709;&#x7684; Promise &#x94FE;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x907F;&#x514D;&#x540C;&#x6837;&#x7684;&#x8BED;&#x53E5;&#x9700;&#x8981;&#x5728; <code>then()</code> &#x548C; <code>catch()</code> &#x4E2D;&#x5404;&#x5199;&#x4E00;&#x6B21;&#x7684;&#x60C5;&#x51B5;&#x3002;</p><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally" rel="nofollow noreferrer" target="_blank">mdn-Promise-finally</a></p><h2 id="articleHeader5">Promise &#x5BF9;&#x8C61;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;</h2><h3 id="articleHeader6"><code>Promise.all()</code> &#x7528;&#x6765;&#x5904;&#x7406; Promise &#x7684;&#x5E76;&#x53D1;</h3><p><code>Promise.all</code> &#x4F1A;&#x5C06;&#x591A;&#x4E2A; <code>Promise</code> &#x5B9E;&#x4F8B;&#x5C01;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684; <code>Promise</code> &#x5B9E;&#x4F8B;&#xFF0C;&#x65B0;&#x7684; promise &#x7684;&#x72B6;&#x6001;&#x53D6;&#x51B3;&#x4E8E;&#x591A;&#x4E2A; <code>Promise</code> &#x5B9E;&#x4F8B;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x53EA;&#x6709;&#x5728;&#x5168;&#x4F53; <code>Promise</code> &#x90FD;&#x4E3A; <code>fulfilled</code> &#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x65B0;&#x7684;&#x5B9E;&#x4F8B;&#x624D;&#x4F1A;&#x53D8;&#x6210; <code>fulfilled</code> &#x72B6;&#x6001;&#x3002;&#xFF1B;&#x5982;&#x679C;&#x53C2;&#x6570;&#x4E2D; <code>Promise</code> &#x6709;&#x4E00;&#x4E2A;&#x5931;&#x8D25;&#xFF08;<code>rejected</code>&#xFF09;&#xFF0C;&#x6B64;&#x5B9E;&#x4F8B;&#x56DE;&#x8C03;&#x5931;&#x8D25;&#xFF08;<code>rejecte</code>&#xFF09;&#xFF0C;&#x5931;&#x8D25;&#x539F;&#x56E0;&#x7684;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x5931;&#x8D25; <code>Promise</code> &#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.all([
  new Promise(resolve =&gt; {
    setTimeout(resolve, 1000, &quot;p1&quot;);
  }),
  new Promise(resolve =&gt; {
    setTimeout(resolve, 2000, &quot;p2&quot;);
  }),
  new Promise(resolve =&gt; {
    setTimeout(resolve, 3000, &quot;p3&quot;);
  })
])
  .then(result =&gt; {
    console.info(&quot;then&quot;, result);
  })
  .catch(error =&gt; {
    console.info(&quot;catch&quot;, error);
  });
// [p1,p2,p3]

Promise.all([
  new Promise(resolve =&gt; {
    setTimeout(resolve, 1000, &quot;p1&quot;);
  }),
  new Promise(resolve =&gt; {
    setTimeout(resolve, 2000, &quot;p2&quot;);
  }),
  Promise.reject(&quot;p3 error&quot;)
])
  .then(result =&gt; {
    console.info(&quot;then&quot;, result);
  })
  .catch(error =&gt; {
    console.info(&quot;catch&quot;, error);
  });
// p3 error" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.all([
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-string">&quot;p1&quot;</span>);
  }),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, <span class="hljs-number">2000</span>, <span class="hljs-string">&quot;p2&quot;</span>);
  }),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, <span class="hljs-number">3000</span>, <span class="hljs-string">&quot;p3&quot;</span>);
  })
])
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">&quot;then&quot;</span>, result);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">&quot;catch&quot;</span>, error);
  });
<span class="hljs-comment">// [p1,p2,p3]</span>

<span class="hljs-built_in">Promise</span>.all([
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-string">&quot;p1&quot;</span>);
  }),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
    setTimeout(resolve, <span class="hljs-number">2000</span>, <span class="hljs-string">&quot;p2&quot;</span>);
  }),
  <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">&quot;p3 error&quot;</span>)
])
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">&quot;then&quot;</span>, result);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">&quot;catch&quot;</span>, error);
  });
<span class="hljs-comment">// p3 error</span></code></pre><p>&#x83B7;&#x53D6; cnode &#x793E;&#x533A;&#x7684; &#x7CBE;&#x534E;&#x8D34;&#x7684;&#x524D;&#x5341;&#x6761;&#x5185;&#x5BB9;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(&quot;https://cnodejs.org/api/v1/topics?tab=good&amp;limit=10&quot;)
  .then(res =&gt; res.json())
  .then(res =&gt; {
    const fetchList = res.data.map(item =&gt; {
      return fetch(`https://cnodejs.org/api/v1/topic/${item.id}`)
        .then(res =&gt; res.json())
        .then(res =&gt; res.data);
    });
    Promise.all(fetchList).then(list =&gt; {
      console.log(list);
    });
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">fetch(<span class="hljs-string">&quot;https://cnodejs.org/api/v1/topics?tab=good&amp;limit=10&quot;</span>)
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> fetchList = res.data.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">`https://cnodejs.org/api/v1/topic/<span class="hljs-subst">${item.id}</span>`</span>)
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
        .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.data);
    });
    <span class="hljs-built_in">Promise</span>.all(fetchList).then(<span class="hljs-function"><span class="hljs-params">list</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(list);
    });
  });</code></pre><h3 id="articleHeader7"><code>Promise.race()</code> &#x7ADE;&#x6001;&#x6267;&#x884C;</h3><p><code>Promise.race</code> &#x4E5F;&#x4F1A;&#x5C06;&#x591A;&#x4E2A; <code>Promise</code> &#x5B9E;&#x4F8B;&#x5C01;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>Promise</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x65B0;&#x7684; <code>Promise</code> &#x7684;&#x72B6;&#x6001;&#x53D6;&#x51B3;&#x4E8E;&#x6700;&#x5148;&#x6539;&#x53D8;&#x72B6;&#x6001;&#x7684; <code>Promise</code> &#x5B9E;&#x4F8B;&#x7684;&#x72B6;&#x6001;&#x3002;</p><p>&#x5728;&#x524D;&#x7AEF;&#x6700;&#x5178;&#x578B;&#x7684;&#x4E00;&#x4E2A;&#x7528;&#x6CD5;&#x662F;&#x4E3A; fetch api &#x6A21;&#x62DF;&#x8BF7;&#x6C42;&#x8D85;&#x65F6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.race([
  fetch(&quot;https://cnodejs.org/api/v1/topics?tab=good&amp;limit=10&quot;).then(res =&gt;
    res.json()
  ),
  new Promise((resolve, reject) =&gt; {
    setTimeout(reject, 1, &quot;error&quot;);
  })
])
  .then(result =&gt; {
    console.info(&quot;then&quot;, result);
  })
  .catch(error =&gt; {
    console.info(&quot;catch&quot;, error); // &#x8FDB;&#x5165;&#x8FD9;&#x91CC;
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.race([
  fetch(<span class="hljs-string">&quot;https://cnodejs.org/api/v1/topics?tab=good&amp;limit=10&quot;</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span>
    res.json()
  ),
  <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(reject, <span class="hljs-number">1</span>, <span class="hljs-string">&quot;error&quot;</span>);
  })
])
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">&quot;then&quot;</span>, result);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">&quot;catch&quot;</span>, error); <span class="hljs-comment">// &#x8FDB;&#x5165;&#x8FD9;&#x91CC;</span>
  });</code></pre><p>&#x4E0A;&#x8FF0;&#x4F8B;&#x5B50;&#x4E2D;&#x53EA;&#x8981;&#x8BF7;&#x6C42; &#x672A;&#x5728; 1 &#x6BEB;&#x79D2;&#x5185;&#x7ED3;&#x675F;&#x5C31;&#x4F1A;&#x8FDB;&#x5165; <code>.catch()</code> &#x65B9;&#x6CD5;&#x4E2D;&#xFF0C;&#x867D;&#x7136;&#x4E0D;&#x80FD;&#x5C06;&#x8BF7;&#x6C42;&#x53D6;&#x6D88;&#xFF0C;&#x4F46;&#x662F;&#x8D85;&#x65F6;&#x6A21;&#x62DF;&#x5374;&#x6210;&#x529F;&#x4E86;</p><h3 id="articleHeader8"><code>Promise.resolve(value)</code> &amp;&amp; <code>Promise.reject(reason)</code></h3><p>&#x8FD9;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x90FD;&#x80FD;&#x7528;&#x6765;&#x521B;&#x5EFA;&#x5E76;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Promise , &#x533A;&#x522B;&#x662F; <code>Promise.resolve(value)</code> &#x643A;&#x5E26;&#x8FDB;&#x65B0;&#x7684; Promise &#x72B6;&#x6001;&#x662F; <code>fulfilled</code>&#x3002;&#x800C; <code>Promise.reject(reason)</code> &#x5E26;&#x6765;&#x7684; <code>rejected</code></p><p>&#x6709;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x7B80;&#x5316;&#x4E00;&#x4E9B;&#x521B;&#x5EFA; Promise &#x7684;&#x64CD;&#x4F5C;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sleep = (time = 0) =&gt; new Promise(resolve =&gt; setTimeout(resolve, time));
// &#x8FD9;&#x91CC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; &#x7761;&#x7720;&#xFF0C;&#x5E76;&#x4E14;&#x6253;&#x5370;&#x7684;&#x94FE;
Promise.resolve()
  .then(() =&gt; {
    console.log(1);
  })
  .then(() =&gt; sleep(1000))
  .then(() =&gt; {
    console.log(2);
  })
  .then(() =&gt; sleep(2000))
  .then(() =&gt; {
    console.log(3);
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sleep = <span class="hljs-function">(<span class="hljs-params">time = <span class="hljs-number">0</span></span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, time));
<span class="hljs-comment">// &#x8FD9;&#x91CC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; &#x7761;&#x7720;&#xFF0C;&#x5E76;&#x4E14;&#x6253;&#x5370;&#x7684;&#x94FE;</span>
<span class="hljs-built_in">Promise</span>.resolve()
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  })
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> sleep(<span class="hljs-number">1000</span>))
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  })
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> sleep(<span class="hljs-number">2000</span>))
  .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);
  });</code></pre><p>&#x6709;&#x65F6;&#x4E5F;&#x7528;&#x6765; &#x624B;&#x52A8;&#x6539;&#x53D8; Promise &#x94FE;&#x4E2D;&#x7684;&#x8FD4;&#x56DE;&#x72B6;&#x6001; &#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x6837;&#x5B9E;&#x9645;&#x4E0A;&#x548C; &#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x6216;&#x8005;&#x662F; &#x4F7F;&#x7528; throw Error &#x6765;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x9519;&#x8BEF;&#xFF0C;&#x5E76;&#x65E0;&#x533A;&#x522B;&#x3002;&#x5230;&#x5E95;&#x8981;&#x600E;&#x4E48;&#x7528; &#x5C31;&#x770B;&#x4E2A;&#x4EBA;&#x559C;&#x597D;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(&quot;resolve&quot;); // 1.
  }, 1000);
})
  .then(result =&gt; {
    return Promise.reject(&quot;reject1&quot;); // 2.
  })
  .then(
    result =&gt; {
      return Promise.resolve(result + &quot;2&quot;);
    },
    err =&gt; {
      return Promise.resolve(err); // 3.
    }
  )
  .then(res =&gt; {
    console.log(res); // 4.
  })
  .catch(err =&gt; {
    console.log(err + &quot;err&quot;);
  });
// reject1" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-string">&quot;resolve&quot;</span>); <span class="hljs-comment">// 1.</span>
  }, <span class="hljs-number">1000</span>);
})
  .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">&quot;reject1&quot;</span>); <span class="hljs-comment">// 2.</span>
  })
  .then(
    <span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(result + <span class="hljs-string">&quot;2&quot;</span>);
    },
    err =&gt; {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(err); <span class="hljs-comment">// 3.</span>
    }
  )
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(res); <span class="hljs-comment">// 4.</span>
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err + <span class="hljs-string">&quot;err&quot;</span>);
  });
<span class="hljs-comment">// reject1</span></code></pre><h2 id="articleHeader9">&#x51E0;&#x4E2A;&#x4F8B;&#x5B50;</h2><p>&#x4E0B;&#x9762;&#x6765;&#x770B;&#x51E0;&#x4E2A;&#x4F8B;&#x5B50;:</p><p>&#x5173;&#x4E8E;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF0C;&#x5177;&#x4F53;&#x53EF;&#x641C;&#x7D22;&#xFF0C;js &#x5FAA;&#x73AF;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Promise((resolve, reject) =&gt; {
  console.log(&quot;step 1&quot;);
  resolve();
  console.log(&quot;step 2&quot;);
}).then(() =&gt; {
  console.log(&quot;step 3&quot;);
});
console.log(&quot;step 4&quot;);

// step 1, step 2, step 4 , step 3" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;step 1&quot;</span>);
  resolve();
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;step 2&quot;</span>);
}).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;step 3&quot;</span>);
});
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;step 4&quot;</span>);

<span class="hljs-comment">// step 1, step 2, step 4 , step 3</span></code></pre><p>&#x5728;&#x4F7F;&#x7528; Promise &#x6784;&#x9020;&#x51FD;&#x6570;&#x6784;&#x9020; &#x4E00;&#x4E2A; Promise &#x65F6;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x5C31;&#x4F1A;&#x7ACB;&#x5373;&#x6267;&#x884C;&#xFF0C;&#x800C; <code>Promise.then</code> &#x4E2D;&#x7684;&#x51FD;&#x6570;&#x662F;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x7684;&#x3002;</p><p>&#x5173;&#x4E8E;&#x72B6;&#x6001;&#x4E0D;&#x53EF;&#x53D8;&#x66F4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let start;
const p = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    start = Date.now();
    console.log(&quot;once&quot;);
    resolve(&quot;success&quot;);
  }, 1000);
});
p.then(res =&gt; {
  console.log(res, Date.now() - start);
});
p.then(res =&gt; {
  console.log(res, Date.now() - start);
});
p.then(res =&gt; {
  console.log(res, Date.now() - start);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> start;
<span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    start = <span class="hljs-built_in">Date</span>.now();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;once&quot;</span>);
    resolve(<span class="hljs-string">&quot;success&quot;</span>);
  }, <span class="hljs-number">1000</span>);
});
p.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(res, <span class="hljs-built_in">Date</span>.now() - start);
});
p.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(res, <span class="hljs-built_in">Date</span>.now() - start);
});
p.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(res, <span class="hljs-built_in">Date</span>.now() - start);
});</code></pre><p><code>Promise</code> &#x6784;&#x9020;&#x51FD;&#x6570;&#x53EA;&#x6267;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x5185;&#x90E8;&#x72B6;&#x6001;&#x4E00;&#x65E6;&#x6539;&#x53D8;&#xFF0C;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x540E;&#x7EED;&#x4E0D;&#x8BBA;&#x8C03;&#x7528;&#x591A;&#x5C11;&#x6B21;<code>then()</code>&#x90FD;&#x53EA;&#x62FF;&#x5230;&#x90A3;&#x4E48;&#x4E00;&#x4E2A;&#x7ED3;&#x679C;&#x3002;</p><p>&#x5173;&#x4E8E;&#x597D;&#x50CF;&#x72B6;&#x6001;&#x53EF;&#x4EE5;&#x53D8;&#x66F4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const p1 = new Promise((resolve, reject) =&gt; {
  setTimeout(() =&gt; {
    resolve(&quot;success&quot;);
  }, 1000);
});

const p2 = p1.then((resolve, reject) =&gt; {
  throw new Error(&quot;error&quot;);
});

console.log(&quot;p1&quot;, p1);
console.log(&quot;p2&quot;, p2);

setTimeout(() =&gt; {
  console.log(&quot;p1&quot;, p1);
  console.log(&quot;p2&quot;, p2);
}, 2000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> p1 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    resolve(<span class="hljs-string">&quot;success&quot;</span>);
  }, <span class="hljs-number">1000</span>);
});

<span class="hljs-keyword">const</span> p2 = p1.then(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;error&quot;</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;p1&quot;</span>, p1);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;p2&quot;</span>, p2);

setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;p1&quot;</span>, p1);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;p2&quot;</span>, p2);
}, <span class="hljs-number">2000</span>);</code></pre><p>&#x89C2;&#x5BDF;&#x8FD9;&#x4E00;&#x6B21;&#x7684;&#x6253;&#x5370;<br>&#x7B2C;&#x4E00;&#x6B21;&#x6253;&#x5370;&#x51FA;&#x4E24;&#x4E2A; <code>Promise</code> &#x7684;&#x65F6;&#x5019;&#x90FD;&#x662F; <code>pending</code> &#xFF0C;&#x56E0;&#x4E3A; p2 &#x662F;&#x57FA;&#x4E8E; p1 &#x7684;&#x7ED3;&#x679C;&#xFF0C;p1 &#x6B63;&#x5728; pending &#xFF0C;&#x7ACB;&#x5373;&#x6253;&#x5370;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x80AF;&#x5B9A;&#x662F; pending ;&#x7B2C;&#x4E8C;&#x6B21;&#x6253;&#x5370;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x56E0;&#x4E3A; p1 &#x7684;&#x72B6;&#x6001;&#x4E3A; resolved &#xFF0C;p2 &#x4E3A; rejected &#xFF0C;&#x8FD9;&#x4E2A;&#x5E76;&#x4E0D;&#x662F;&#x5DF2;&#x7ECF;&#x4E3A; fulfilled &#x72B6;&#x6001;&#x6539;&#x53D8;&#x4E3A; rejected &#xFF0C;&#x800C;&#x662F; p2 &#x662F;&#x4E00;&#x4E2A;&#x65B0;&#x7684; Promise &#x5B9E;&#x4F8B;&#xFF0C;<code>then()</code> &#x8FD4;&#x56DE;&#x65B0;&#x7684; Promise &#x5B9E;&#x4F8B;&#x3002;</p><p>&#x5173;&#x4E8E;&#x900F;&#x4F20;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(11)
  .then(1)
  .then(2)
  .then(3)
  .then(res =&gt; {
    console.info(&quot;res&quot;, res);
  });
//   11" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">11</span>)
  .then(<span class="hljs-number">1</span>)
  .then(<span class="hljs-number">2</span>)
  .then(<span class="hljs-number">3</span>)
  .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">&quot;res&quot;</span>, res);
  });
<span class="hljs-comment">//   11</span></code></pre><p>&#x7ED9; then &#x65B9;&#x6CD5;&#x4F20;&#x9012;&#x4E86;&#x4E00;&#x4E2A;&#x975E;&#x51FD;&#x6570;&#x7684;&#x503C;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; <code>then(null)</code>&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x7A7F;&#x900F;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x5C31;&#x662F;&#x76F4;&#x63A5;&#x8FC7;&#x6389;&#x4E86;&#x8FD9;&#x4E2A; then() &#xFF0C;&#x76F4;&#x5230;&#x7B26;&#x5408;&#x89C4;&#x8303;&#x7684; then() &#x4E3A;&#x6B62;&#x3002;</p><h2 id="articleHeader10">Promise &#x7684;&#x4E32;&#x884C;&#x8C03;&#x7528;</h2><p>&#x4F7F;&#x7528; Array.reduce &#x65B9;&#x6CD5;&#x4E32;&#x884C;&#x6267;&#x884C; Promise</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sleep = (time = 0) =&gt; new Promise(resolve =&gt; setTimeout(resolve, time));
[1000, 2000, 3000, 4000].reduce((Promise, item, index) =&gt; {
  return Promise.then(res =&gt; {
    console.log(index + 1);
    return sleep(item);
  });
}, Promise.resolve());
// &#x5728;&#x5206;&#x522B;&#x7684;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#x540E;&#x8F93;&#x51FA; 1&#xFF0C;2&#xFF0C;3&#xFF0C;4" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> sleep = <span class="hljs-function">(<span class="hljs-params">time = <span class="hljs-number">0</span></span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout(resolve, time));
[<span class="hljs-number">1000</span>, <span class="hljs-number">2000</span>, <span class="hljs-number">3000</span>, <span class="hljs-number">4000</span>].reduce(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-built_in">Promise</span>, item, index</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(index + <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> sleep(item);
  });
}, <span class="hljs-built_in">Promise</span>.resolve());
<span class="hljs-comment">// &#x5728;&#x5206;&#x522B;&#x7684;&#x7B49;&#x5F85;&#x65F6;&#x95F4;&#x540E;&#x8F93;&#x51FA; 1&#xFF0C;2&#xFF0C;3&#xFF0C;4</span></code></pre><p>&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x5230;&#x8FD9;&#x91CC;&#x5C31;&#x57FA;&#x672C;&#x4E0A;&#x7ED3;&#x675F;&#x4E86;&#xFF0C;&#x76F8;&#x4FE1; &#x5982;&#x679C;&#x80FD;&#x7406;&#x89E3;&#x4E0A;&#x9762;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x8BDD;&#x3002;&#x5E94;&#x8BE5;&#x4F1A;&#x8BA9;&#x5DE5;&#x4F5C;&#x66F4;&#x9AD8;&#x6548;&#x5427;&#xFF0C;&#x5BF9;&#x4E8E;&#x65B0;&#x7684;&#x5F02;&#x6B65;&#x4F7F;&#x7528;&#x5E94;&#x8BE5;&#x4E5F;&#x4F1A;&#x66F4;&#x52A0;&#x7684;&#x5F97;&#x5FC3;&#x5E94;&#x624B;&#x3002;Promise &#x7684;&#x4F7F;&#x7528;&#x76F8;&#x5BF9;&#x7B80;&#x5355;&#xFF0C;&#x53EF;&#x80FD;&#x540E;&#x7EED;&#x518D;&#x51FA;&#x4E00;&#x7BC7;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; Promise &#x5427;</p><p>&#x90A3;&#x4E9B;&#x6536;&#x96C6;&#x7684; Promise &#x7684;&#x4F18;&#x8D28;&#x6587;&#x7AE0;&#x3002;</p><ul><li><a href="http://bluebirdjs.com/docs/getting-started.html" rel="nofollow noreferrer" target="_blank">bluebird &#x662F;&#x4E00;&#x4E2A;&#x62D3;&#x5C55; Promise &#x65B9;&#x6CD5;&#x7684;&#x5E93;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x975E;&#x5E38;&#x591A;&#x7684;&#x5B9E;&#x7528;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x63A8;&#x8350;</a></li><li>[[&#x601D;&#x7EF4;&#x5BFC;&#x56FE;] Promise - &#x300A;&#x4F60;&#x4E0D;&#x77E5;&#x9053;&#x7684; JavaScript&#x300B;- &#x4E2D;&#x5377; - &#x7B2C;&#x4E8C;&#x90E8;&#x5206;](<a href="https://zhuanlan.zhihu.com/p/25266255)" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></li><li>[[&#x8BD1;] &#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; ES6 Promise &#x6307;&#x5357;](<a href="https://zhuanlan.zhihu.com/p/37535594)" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></li><li><a href="http://es6.ruanyifeng.com/#docs/promise" rel="nofollow noreferrer" target="_blank">&#x962E;&#x4E00;&#x5CF0;-ES6 &#x5165;&#x95E8; Promise &#x5BF9;&#x8C61;</a></li><li><a href="https://juejin.im/post/5abfdfb5f265da237a4d2708" rel="nofollow noreferrer" target="_blank">Promise &#x4E0D;&#x591F;&#x4E2D;&#x7ACB;</a></li><li><a href="https://zhuanlan.zhihu.com/p/35082528" rel="nofollow noreferrer" target="_blank">WHY &#x201C;PROMISES ARE NOT NEUTRAL ENOUGH&#x201D; IS NOT NEUTRAL ENOUGH</a></li><li><a href="https://zhuanlan.zhihu.com/p/34093535" rel="nofollow noreferrer" target="_blank">&#x3010;&#x8BD1;&#x3011;&#x5173;&#x4E8E; Promise &#x7684; 9 &#x4E2A;&#x63D0;&#x793A;</a></li><li><a href="https://zhuanlan.zhihu.com/p/30797777" rel="nofollow noreferrer" target="_blank">Promise &#x5FC5;&#x77E5;&#x5FC5;&#x4F1A;&#xFF08;&#x5341;&#x9053;&#x9898;&#xFF09;</a></li><li><a href="https://www.inoreader.com/article/3a9c6e7ec0b4336e-event-loop" rel="nofollow noreferrer" target="_blank">Event Loop &#x5FC5;&#x77E5;&#x5FC5;&#x4F1A;&#xFF08;&#x516D;&#x9053;&#x9898;&#xFF09;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习 Promise，掌握未来世界 JS 异步编程基础

## 原文链接
[https://segmentfault.com/a/1190000016713032](https://segmentfault.com/a/1190000016713032)


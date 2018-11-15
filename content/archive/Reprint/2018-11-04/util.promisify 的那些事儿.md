---
title: util.promisify 的那些事儿
reprint: true
categories: reprint
abbrlink: d243dbaa
date: 2018-11-04 02:30:10
---

{{% raw %}}
<p><code>util.promisify</code>&#x662F;&#x5728;<code>node.js 8.x</code>&#x7248;&#x672C;&#x4E2D;&#x65B0;&#x589E;&#x7684;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#xFF0C;&#x7528;&#x4E8E;&#x5C06;&#x8001;&#x5F0F;&#x7684;<code>Error first callback</code>&#x8F6C;&#x6362;&#x4E3A;<code>Promise</code>&#x5BF9;&#x8C61;&#xFF0C;&#x8BA9;&#x8001;&#x9879;&#x76EE;&#x6539;&#x9020;&#x53D8;&#x5F97;&#x66F4;&#x4E3A;&#x8F7B;&#x677E;&#x3002;</p><p>&#x5728;&#x5B98;&#x65B9;&#x63A8;&#x51FA;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x4E4B;&#x524D;&#xFF0C;&#x6C11;&#x95F4;&#x5DF2;&#x7ECF;&#x6709;&#x5F88;&#x591A;&#x7C7B;&#x4F3C;&#x7684;&#x5DE5;&#x5177;&#x4E86;&#xFF0C;&#x6BD4;&#x5982;<a href="https://www.npmjs.com/package/es6-promisify" rel="nofollow noreferrer" target="_blank">es6-promisify</a>&#x3001;<a href="https://www.npmjs.com/package/thenify" rel="nofollow noreferrer" target="_blank">thenify</a>&#x3001;<a href="http://bluebirdjs.com/docs/api/promise.promisify.html" rel="nofollow noreferrer" target="_blank">bluebird.promisify</a>&#x3002;</p><p>&#x4EE5;&#x53CA;&#x5F88;&#x591A;&#x5176;&#x4ED6;&#x4F18;&#x79C0;&#x7684;&#x5DE5;&#x5177;&#xFF0C;&#x90FD;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x5728;&#x5904;&#x7406;&#x8001;&#x9879;&#x76EE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E0D;&#x5FC5;&#x8D39;&#x795E;&#x5C06;&#x5404;&#x79CD;&#x4EE3;&#x7801;&#x4F7F;&#x7528;<code>Promise</code>&#x518D;&#x91CD;&#x65B0;&#x5B9E;&#x73B0;&#x4E00;&#x904D;&#x3002;</p><h2 id="articleHeader0">&#x5DE5;&#x5177;&#x5B9E;&#x73B0;&#x7684;&#x5927;&#x81F4;&#x601D;&#x8DEF;</h2><p>&#x9996;&#x5148;&#x8981;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#x8FD9;&#x79CD;&#x5DE5;&#x5177;&#x5927;&#x81F4;&#x7684;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;<code>Node</code>&#x4E2D;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x6709;&#x4E00;&#x4E2A;&#x7EA6;&#x5B9A;&#xFF1A;<code>Error first</code>&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E00;&#x5B9A;&#x8981;&#x662F;<code>Error</code>&#x5BF9;&#x8C61;&#xFF0C;&#x5176;&#x4F59;&#x53C2;&#x6570;&#x624D;&#x662F;&#x6B63;&#x786E;&#x65F6;&#x7684;&#x6570;&#x636E;&#x3002;</p><p>&#x77E5;&#x9053;&#x4E86;&#x8FD9;&#x6837;&#x7684;&#x89C4;&#x5F8B;&#x4EE5;&#x540E;&#xFF0C;&#x5DE5;&#x5177;&#x5C31;&#x5F88;&#x597D;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x5728;&#x5339;&#x914D;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x6709;&#x503C;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x89E6;&#x53D1;<code>reject</code>&#xFF0C;&#x5176;&#x4F59;&#x60C5;&#x51B5;&#x89E6;&#x53D1;<code>resolve</code>&#xFF0C;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function util (func) {
  return (...arg) =&gt; new Promise((resolve, reject) =&gt; {
    func(...arg, (err, arg) =&gt; {
      if (err) reject(err)
      else resolve(arg)
    })
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">util</span> (<span class="hljs-params">func</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...arg</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    func(...arg, (err, arg) =&gt; {
      <span class="hljs-keyword">if</span> (err) reject(err)
      <span class="hljs-keyword">else</span> resolve(arg)
    })
  })
}</code></pre><ol><li>&#x8C03;&#x7528;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#xFF0C;&#x533F;&#x540D;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x539F;&#x51FD;&#x6570;&#x7684;&#x53C2;&#x6570;&#x3002;</li><li>&#x533F;&#x540D;&#x51FD;&#x6570;&#x88AB;&#x8C03;&#x7528;&#x540E;&#x6839;&#x636E;&#x8FD9;&#x4E9B;&#x53C2;&#x6570;&#x6765;&#x8C03;&#x7528;&#x771F;&#x5B9E;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x540C;&#x65F6;&#x62FC;&#x63A5;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x5904;&#x7406;&#x7ED3;&#x679C;&#x7684;<code>callback</code>&#x3002;</li><li>&#x68C0;&#x6D4B;&#x5230;<code>err</code>&#x6709;&#x503C;&#xFF0C;&#x89E6;&#x53D1;<code>reject</code>&#xFF0C;&#x5176;&#x4ED6;&#x60C5;&#x51B5;&#x89E6;&#x53D1;<code>resolve</code></li></ol><p><strong>resolve &#x53EA;&#x80FD;&#x4F20;&#x5165;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6240;&#x4EE5;<code>callback</code>&#x4E2D;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x4F7F;&#x7528;<code>...arg</code>&#x83B7;&#x53D6;&#x6240;&#x6709;&#x7684;&#x8FD4;&#x56DE;&#x503C;</strong></p><h2 id="articleHeader1">&#x5E38;&#x89C4;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</h2><blockquote>&#x62FF;&#x4E00;&#x4E2A;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x793A;&#x4F8B;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { promisify } = require(&apos;util&apos;)
const fs = require(&apos;fs&apos;)

const statAsync = promisify(fs.stat)

statAsync(&apos;.&apos;).then(stats =&gt; {
  // &#x62FF;&#x5230;&#x4E86;&#x6B63;&#x786E;&#x7684;&#x6570;&#x636E;
}, err =&gt; {
  // &#x51FA;&#x73B0;&#x4E86;&#x5F02;&#x5E38;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { promisify } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-keyword">const</span> statAsync = promisify(fs.stat)

statAsync(<span class="hljs-string">&apos;.&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">stats</span> =&gt;</span> {
  <span class="hljs-comment">// &#x62FF;&#x5230;&#x4E86;&#x6B63;&#x786E;&#x7684;&#x6570;&#x636E;</span>
}, err =&gt; {
  <span class="hljs-comment">// &#x51FA;&#x73B0;&#x4E86;&#x5F02;&#x5E38;</span>
})</code></pre><p>&#x4EE5;&#x53CA;&#x56E0;&#x4E3A;&#x662F;<code>Promise</code>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<code>await</code>&#x6765;&#x8FDB;&#x4E00;&#x6B65;&#x7B80;&#x5316;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { promisify } = require(&apos;util&apos;)
const fs = require(&apos;fs&apos;)

const statAsync = promisify(fs.stat)

// &#x5047;&#x8BBE;&#x5728; async &#x51FD;&#x6570;&#x4E2D;
try {
  const stats = await statAsync(&apos;.&apos;)
  // &#x62FF;&#x5230;&#x6B63;&#x786E;&#x7ED3;&#x679C;
} catch (e) {
  // &#x51FA;&#x73B0;&#x5F02;&#x5E38;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { promisify } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-keyword">const</span> statAsync = promisify(fs.stat)

<span class="hljs-comment">// &#x5047;&#x8BBE;&#x5728; async &#x51FD;&#x6570;&#x4E2D;</span>
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> stats = <span class="hljs-keyword">await</span> statAsync(<span class="hljs-string">&apos;.&apos;</span>)
  <span class="hljs-comment">// &#x62FF;&#x5230;&#x6B63;&#x786E;&#x7ED3;&#x679C;</span>
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-comment">// &#x51FA;&#x73B0;&#x5F02;&#x5E38;</span>
}</code></pre><p>&#x7528;&#x6CD5;&#x4E0E;&#x5176;&#x4ED6;&#x5DE5;&#x5177;&#x5E76;&#x6CA1;&#x6709;&#x592A;&#x5927;&#x7684;&#x533A;&#x522B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x8F7B;&#x6613;&#x7684;&#x5C06;&#x56DE;&#x8C03;&#x8F6C;&#x6362;&#x4E3A;<code>Promise</code>&#xFF0C;&#x7136;&#x540E;&#x5E94;&#x7528;&#x4E8E;&#x65B0;&#x7684;&#x9879;&#x76EE;&#x4E2D;&#x3002;</p><h2 id="articleHeader2">&#x81EA;&#x5B9A;&#x4E49;&#x7684; Promise &#x5316;</h2><p>&#x6709;&#x90A3;&#x4E48;&#x4E00;&#x4E9B;&#x573A;&#x666F;&#xFF0C;&#x662F;&#x4E0D;&#x80FD;&#x591F;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>promisify</code>&#x6765;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x7684;&#xFF0C;&#x6709;&#x5927;&#x6982;&#x8FD9;&#x4E48;&#x4E24;&#x79CD;&#x60C5;&#x51B5;&#xFF1A;</p><ol><li>&#x6CA1;&#x6709;&#x9075;&#x5FAA;<code>Error first callback</code>&#x7EA6;&#x5B9A;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li><li>&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;</li></ol><p>&#x9996;&#x5148;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x9075;&#x5FAA;&#x6211;&#x4EEC;&#x7684;&#x7EA6;&#x5B9A;&#xFF0C;&#x5F88;&#x53EF;&#x80FD;&#x5BFC;&#x81F4;<code>reject</code>&#x7684;&#x8BEF;&#x5224;&#xFF0C;&#x5F97;&#x4E0D;&#x5230;&#x6B63;&#x786E;&#x7684;&#x53CD;&#x9988;&#x3002;<br>&#x800C;&#x7B2C;&#x4E8C;&#x9879;&#x5462;&#xFF0C;&#x5219;&#x662F;&#x56E0;&#x4E3A;<code>Promise.resolve</code>&#x53EA;&#x80FD;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x591A;&#x4F59;&#x7684;&#x53C2;&#x6570;&#x4F1A;&#x88AB;&#x5FFD;&#x7565;&#x3002;</p><p>&#x6240;&#x4EE5;&#x4E3A;&#x4E86;&#x5B9E;&#x73B0;&#x6B63;&#x786E;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x9700;&#x8981;&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x5BF9;&#x5E94;&#x7684;<code>Promise</code>&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E86;&#x4EE5;&#x540E;&#x5E76;&#x4E0D;&#x80FD;&#x591F;&#x786E;&#x4FDD;&#x4F7F;&#x7528;&#x65B9;&#x4E0D;&#x4F1A;&#x9488;&#x5BF9;&#x4F60;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;<code>promisify</code>&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;<code>util.promisify</code>&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;<code>Symbol</code>&#x7C7B;&#x578B;&#x7684;<code>key</code>&#xFF0C;<code>util.promisify.custom</code>&#x3002;</p><p><code>Symbol</code>&#x7C7B;&#x578B;&#x7684;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x90FD;&#x6709;&#x4E86;&#x89E3;&#xFF0C;&#x662F;&#x4E00;&#x4E2A;&#x552F;&#x4E00;&#x7684;&#x503C;&#xFF0C;&#x8FD9;&#x91CC;&#x662F;<code>util.prosimify</code>&#x7528;&#x6765;&#x6307;&#x5B9A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;<code>Promise</code>&#x5316;&#x7684;&#x7ED3;&#x679C;&#x7684;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { promisify } = require(&apos;util&apos;)
// &#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x56DE;&#x8C03;&#x7248;&#x672C;&#x7684;&#x51FD;&#x6570;
const obj = {
  getData (callback) {
    callback(null, &apos;Niko&apos;, 18) // &#x8FD4;&#x56DE;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x59D3;&#x540D;&#x548C;&#x5E74;&#x9F84;
  }
}

// &#x8FD9;&#x65F6;&#x4F7F;&#x7528;promisify&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x884C;&#x7684;
// &#x56E0;&#x4E3A;Promise.resolve&#x53EA;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x4F1A;&#x5F97;&#x5230; Niko

promisify(obj.getData)().then(console.log) // Niko

// &#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4F7F;&#x7528; promisify.custom &#x6765;&#x81EA;&#x5B9A;&#x4E49;&#x5904;&#x7406;&#x65B9;&#x5F0F;

obj.getData[promisify.custom] = async () =&gt; ({ name: &apos;Niko&apos;, age: 18 })

// &#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x66F2;&#x7EBF;&#x6551;&#x56FD;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x65E0;&#x8BBA;&#x5982;&#x4F55; Promise &#x4E0D;&#x4F1A;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x8FC7;&#x6765;&#x7684;
promisify(obj.getData)().then(console.log) // { name: &apos;Niko&apos;, age: 18 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { promisify } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>)
<span class="hljs-comment">// &#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x56DE;&#x8C03;&#x7248;&#x672C;&#x7684;&#x51FD;&#x6570;</span>
<span class="hljs-keyword">const</span> obj = {
  getData (callback) {
    callback(<span class="hljs-literal">null</span>, <span class="hljs-string">&apos;Niko&apos;</span>, <span class="hljs-number">18</span>) <span class="hljs-comment">// &#x8FD4;&#x56DE;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x59D3;&#x540D;&#x548C;&#x5E74;&#x9F84;</span>
  }
}

<span class="hljs-comment">// &#x8FD9;&#x65F6;&#x4F7F;&#x7528;promisify&#x80AF;&#x5B9A;&#x662F;&#x4E0D;&#x884C;&#x7684;</span>
<span class="hljs-comment">// &#x56E0;&#x4E3A;Promise.resolve&#x53EA;&#x63A5;&#x6536;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x4F1A;&#x5F97;&#x5230; Niko</span>

promisify(obj.getData)().then(<span class="hljs-built_in">console</span>.log) <span class="hljs-comment">// Niko</span>

<span class="hljs-comment">// &#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4F7F;&#x7528; promisify.custom &#x6765;&#x81EA;&#x5B9A;&#x4E49;&#x5904;&#x7406;&#x65B9;&#x5F0F;</span>

obj.getData[promisify.custom] = <span class="hljs-keyword">async</span> () =&gt; ({ <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span> })

<span class="hljs-comment">// &#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x66F2;&#x7EBF;&#x6551;&#x56FD;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x65E0;&#x8BBA;&#x5982;&#x4F55; Promise &#x4E0D;&#x4F1A;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x8FC7;&#x6765;&#x7684;</span>
promisify(obj.getData)().then(<span class="hljs-built_in">console</span>.log) <span class="hljs-comment">// { name: &apos;Niko&apos;, age: 18 }</span></code></pre><p><del><em>&#x5173;&#x4E8E;<code>Promise</code>&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x80FD;<code>resolve</code>&#x591A;&#x4E2A;&#x503C;&#xFF0C;&#x6211;&#x6709;&#x4E00;&#x4E2A;&#x5927;&#x80C6;&#x7684;&#x60F3;&#x6CD5;&#xFF0C;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#x7ECF;&#x8FC7;&#x8003;&#x8BC1;&#xFF0C;&#x5F3A;&#x884C;&#x89E3;&#x91CA;&#x7684;&#x7406;&#x7531;&#xFF1A;&#x5982;&#x679C;&#x80FD;<code>resolve</code>&#x591A;&#x4E2A;&#x503C;&#xFF0C;&#x4F60;&#x8BA9;<code>async</code>&#x51FD;&#x6570;&#x600E;&#x4E48;<code>return</code>&#xFF08;&#x5F53;&#x4E2A;&#x4E50;&#x5B50;&#x770B;&#x8FD9;&#x53E5;&#x8BDD;&#x5C31;&#x597D;&#xFF0C;&#x4E0D;&#x8981;&#x5F53;&#x771F;&#xFF09;</em></del><br><em>&#x4E0D;&#x8FC7;&#x5E94;&#x8BE5;&#x786E;&#x5B9E;&#x8DDF;<code>return</code>&#x6709;&#x5173;&#xFF0C;&#x56E0;&#x4E3A;<code>Promise</code>&#x662F;&#x53EF;&#x4EE5;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x7684;&#xFF0C;&#x6BCF;&#x4E2A;<code>Promise</code>&#x4E2D;&#x6267;&#x884C;<code>then</code>&#x4EE5;&#x540E;&#x90FD;&#x4F1A;&#x5C06;&#x5176;&#x8FD4;&#x56DE;&#x503C;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x65B0;&#x7684;<code>Promise</code>&#x5BF9;&#x8C61;<code>resolve</code>&#x7684;&#x503C;&#xFF0C;&#x5728;<code>JavaScript</code>&#x4E2D;&#x5E76;&#x6CA1;&#x6709;&#x529E;&#x6CD5;<code>return</code>&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x5373;&#x4FBF;&#x7B2C;&#x4E00;&#x4E2A;<code>Promise</code>&#x53EF;&#x4EE5;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x53EA;&#x8981;&#x7ECF;&#x8FC7;<code>return</code>&#x7684;&#x5904;&#x7406;&#x5C31;&#x4F1A;&#x4E22;&#x5931;</em></p><p>&#x5728;&#x4F7F;&#x7528;&#x4E0A;&#x5C31;&#x662F;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x9488;&#x5BF9;&#x53EF;&#x80FD;&#x4F1A;&#x88AB;&#x8C03;&#x7528;<code>promisify</code>&#x7684;&#x51FD;&#x6570;&#x4E0A;&#x6DFB;&#x52A0;<code>promisify.custom</code>&#x5BF9;&#x5E94;&#x7684;&#x5904;&#x7406;&#x5373;&#x53EF;&#x3002;<br>&#x5F53;&#x540E;&#x7EED;&#x4EE3;&#x7801;&#x8C03;&#x7528;<code>promisify</code>&#x65F6;&#x5C31;&#x4F1A;&#x8FDB;&#x884C;&#x5224;&#x65AD;&#xFF1A;</p><ol><li><p>&#x5982;&#x679C;&#x76EE;&#x6807;&#x51FD;&#x6570;&#x5B58;&#x5728;<code>promisify.custom</code>&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x4F1A;&#x5224;&#x65AD;&#x5176;&#x7C7B;&#x578B;&#xFF1A;</p><ol><li>&#x5982;&#x679C;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x629B;&#x51FA;&#x5F02;&#x5E38;</li><li>&#x5982;&#x679C;&#x662F;&#x53EF;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5176;&#x5BF9;&#x5E94;&#x7684;&#x51FD;&#x6570;</li></ol></li><li>&#x5982;&#x679C;&#x76EE;&#x6807;&#x51FD;&#x6570;&#x4E0D;&#x5B58;&#x5728;&#x5BF9;&#x5E94;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6309;&#x7167;<code>Error first callback</code>&#x7684;&#x7EA6;&#x5B9A;&#x751F;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x5904;&#x7406;&#x51FD;&#x6570;&#x7136;&#x540E;&#x8FD4;&#x56DE;</li></ol><p>&#x6DFB;&#x52A0;&#x4E86;&#x8FD9;&#x4E2A;<code>custom</code>&#x5C5E;&#x6027;&#x4EE5;&#x540E;&#xFF0C;&#x5C31;&#x4E0D;&#x7528;&#x518D;&#x62C5;&#x5FC3;&#x4F7F;&#x7528;&#x65B9;&#x9488;&#x5BF9;&#x4F60;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;<code>promisify</code>&#x4E86;&#x3002;<br>&#x800C;&#x4E14;&#x53EF;&#x4EE5;&#x9A8C;&#x8BC1;&#xFF0C;&#x8D4B;&#x503C;&#x7ED9;<code>custom</code>&#x7684;&#x51FD;&#x6570;&#x4E0E;<code>promisify</code>&#x8FD4;&#x56DE;&#x7684;&#x51FD;&#x6570;&#x5730;&#x5740;&#x662F;&#x4E00;&#x5904;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj.getData[promisify.custom] = async () =&gt; ({ name: &apos;Niko&apos;, age: 18 })

// &#x4E0A;&#x8FB9;&#x7684;&#x8D4B;&#x503C;&#x4E3A; async &#x51FD;&#x6570;&#x4E5F;&#x53EF;&#x4EE5;&#x6539;&#x4E3A;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x8981;&#x4FDD;&#x8BC1;&#x8FD9;&#x4E2A;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE; Promise &#x5B9E;&#x4F8B;&#x5373;&#x53EF;
// &#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x4E0E;&#x4E0A;&#x8FB9;&#x7684; async &#x90FD;&#x662F;&#x5B8C;&#x5168;&#x76F8;&#x7B49;&#x7684;

obj.getData[promisify.custom] = () =&gt; Promise.resolve({ name: &apos;Niko&apos;, age: 18 })
obj.getData[promisify.custom] = () =&gt; new Promise(resolve({ name: &apos;Niko&apos;, age: 18 }))

console.log(obj.getData[promisify.custom] === promisify(obj.getData)) // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">obj.getData[promisify.custom] = <span class="hljs-keyword">async</span> () =&gt; ({ <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span> })

<span class="hljs-comment">// &#x4E0A;&#x8FB9;&#x7684;&#x8D4B;&#x503C;&#x4E3A; async &#x51FD;&#x6570;&#x4E5F;&#x53EF;&#x4EE5;&#x6539;&#x4E3A;&#x666E;&#x901A;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x8981;&#x4FDD;&#x8BC1;&#x8FD9;&#x4E2A;&#x666E;&#x901A;&#x51FD;&#x6570;&#x4F1A;&#x8FD4;&#x56DE; Promise &#x5B9E;&#x4F8B;&#x5373;&#x53EF;</span>
<span class="hljs-comment">// &#x8FD9;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x4E0E;&#x4E0A;&#x8FB9;&#x7684; async &#x90FD;&#x662F;&#x5B8C;&#x5168;&#x76F8;&#x7B49;&#x7684;</span>

obj.getData[promisify.custom] = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve({ <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span> })
obj.getData[promisify.custom] = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(resolve({ <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span> }))

<span class="hljs-built_in">console</span>.log(obj.getData[promisify.custom] === promisify(obj.getData)) <span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader3">&#x4E00;&#x4E9B;&#x5185;&#x7F6E;&#x7684; custom &#x5904;&#x7406;</h3><p>&#x5728;&#x4E00;&#x4E9B;&#x5185;&#x7F6E;&#x5305;&#x4E2D;&#xFF0C;&#x4E5F;&#x80FD;&#x591F;&#x627E;&#x5230;<code>promisify.custom</code>&#x7684;&#x8E2A;&#x8FF9;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x6700;&#x5E38;&#x7528;&#x7684;<code>child_process.exec</code>&#x5C31;&#x5185;&#x7F6E;&#x4E86;<code>promisify.custom</code>&#x7684;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { exec } = require(&apos;child_process&apos;)
const { promisify } = require(&apos;util&apos;)

console.log(typeof exec[promisify.custom]) // function" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> { exec } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;child_process&apos;</span>)
<span class="hljs-keyword">const</span> { promisify } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;util&apos;</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> exec[promisify.custom]) <span class="hljs-comment">// function</span></code></pre><p>&#x56E0;&#x4E3A;&#x5C31;&#x50CF;&#x524D;&#x8FB9;&#x793A;&#x4F8B;&#x4E2D;&#x6240;&#x63D0;&#x5230;&#x7684;&#x66F2;&#x7EBF;&#x6551;&#x56FD;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x5B98;&#x65B9;&#x7684;&#x505A;&#x6CD5;&#x4E5F;&#x662F;&#x5C06;&#x51FD;&#x6570;&#x7B7E;&#x540D;&#x4E2D;&#x7684;&#x53C2;&#x6570;&#x540D;&#x4F5C;&#x4E3A;<code>key</code>&#xFF0C;&#x5C06;&#x5176;&#x6240;&#x6709;&#x53C2;&#x6570;&#x5B58;&#x653E;&#x5230;&#x4E00;&#x4E2A;<code>Object</code>&#x5BF9;&#x8C61;&#x4E2D;&#x8FDB;&#x884C;&#x8FD4;&#x56DE;&#xFF0C;&#x6BD4;&#x5982;<code>child_process.exec</code>&#x7684;&#x8FD4;&#x56DE;&#x503C;&#x629B;&#x5F00;<code>error</code>&#x4EE5;&#x5916;&#x4F1A;&#x5305;&#x542B;&#x4E24;&#x4E2A;&#xFF0C;<code>stdout</code>&#x548C;<code>stderr</code>&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x547D;&#x4EE4;&#x6267;&#x884C;&#x540E;&#x7684;&#x6B63;&#x786E;&#x8F93;&#x51FA;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x547D;&#x4EE4;&#x6267;&#x884C;&#x540E;&#x7684;&#x9519;&#x8BEF;&#x8F93;&#x51FA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promisify(exec)(&apos;ls&apos;).then(console.log)
// -&gt; { stdout: &apos;XXX&apos;, stderr: &apos;&apos; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">promisify(exec)(<span class="hljs-string">&apos;ls&apos;</span>).then(<span class="hljs-built_in">console</span>.log)
<span class="hljs-comment">// -&gt; { stdout: &apos;XXX&apos;, stderr: &apos;&apos; }</span></code></pre><p>&#x6216;&#x8005;&#x6211;&#x4EEC;&#x6545;&#x610F;&#x8F93;&#x5165;&#x4E00;&#x4E9B;&#x9519;&#x8BEF;&#x7684;&#x547D;&#x4EE4;&#xFF0C;&#x5F53;&#x7136;&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x53EA;&#x80FD;&#x5728;<code>catch</code>&#x6A21;&#x5757;&#x4E0B;&#x624D;&#x80FD;&#x591F;&#x6355;&#x6349;&#x5230;&#xFF0C;&#x4E00;&#x822C;&#x547D;&#x4EE4;&#x6B63;&#x5E38;&#x6267;&#x884C;<code>stderr</code>&#x90FD;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;&#x7A7A;&#x5B57;&#x7B26;&#x4E32;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="promisify(exec)(&apos;lss&apos;).then(console.log, console.error)
// -&gt; { ..., stdout: &apos;&apos;, stderr: &apos;lss: command not found&apos; }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">promisify(exec)(<span class="hljs-string">&apos;lss&apos;</span>).then(<span class="hljs-built_in">console</span>.log, <span class="hljs-built_in">console</span>.error)
<span class="hljs-comment">// -&gt; { ..., stdout: &apos;&apos;, stderr: &apos;lss: command not found&apos; }</span></code></pre><p>&#x5305;&#x62EC;&#x50CF;<code>setTimeout</code>&#x3001;<code>setImmediate</code>&#x4E5F;&#x90FD;&#x5B9E;&#x73B0;&#x4E86;&#x5BF9;&#x5E94;&#x7684;<code>promisify.custom</code>&#x3002;<br>&#x4E4B;&#x524D;&#x4E3A;&#x4E86;&#x5B9E;&#x73B0;<code>sleep</code>&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x8FD8;&#x624B;&#x52A8;&#x4F7F;&#x7528;<code>Promise</code>&#x5C01;&#x88C5;&#x4E86;<code>setTimeout</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const sleep = promisify(setTimeout)

console.log(new Date())

await sleep(1000)

console.log(new Date())" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> sleep = promisify(setTimeout)

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>())

<span class="hljs-keyword">await</span> sleep(<span class="hljs-number">1000</span>)

<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>())</code></pre><h2 id="articleHeader4">&#x5185;&#x7F6E;&#x7684; promisify &#x8F6C;&#x6362;&#x540E;&#x51FD;&#x6570;</h2><p>&#x5982;&#x679C;&#x4F60;&#x7684;<code>Node</code>&#x7248;&#x672C;&#x4F7F;&#x7528;<code>10.x</code>&#x4EE5;&#x4E0A;&#x7684;&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x4ECE;&#x5F88;&#x591A;&#x5185;&#x7F6E;&#x7684;&#x6A21;&#x5757;&#x4E2D;&#x627E;&#x5230;&#x7C7B;&#x4F3C;<code>.promises</code>&#x7684;&#x5B50;&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x91CC;&#x8FB9;&#x5305;&#x542B;&#x4E86;&#x8BE5;&#x6A21;&#x5757;&#x4E2D;&#x5E38;&#x7528;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;<code>Promise</code>&#x7248;&#x672C;&#xFF08;&#x90FD;&#x662F;<code>async</code>&#x51FD;&#x6570;&#xFF09;&#xFF0C;&#x65E0;&#x9700;&#x518D;&#x624B;&#x52A8;&#x8FDB;&#x884C;<code>promisify</code>&#x8F6C;&#x6362;&#x4E86;&#x3002;</p><p>&#x800C;&#x4E14;&#x6211;&#x672C;&#x4EBA;&#x89C9;&#x5F97;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x597D;&#x7684;&#x6307;&#x5F15;&#x65B9;&#x5411;&#xFF0C;&#x56E0;&#x4E3A;&#x4E4B;&#x524D;&#x7684;&#x5DE5;&#x5177;&#x5B9E;&#x73B0;&#xFF0C;&#x6709;&#x7684;&#x9009;&#x62E9;&#x76F4;&#x63A5;&#x8986;&#x76D6;&#x539F;&#x6709;&#x51FD;&#x6570;&#xFF0C;&#x6709;&#x7684;&#x5219;&#x662F;&#x5728;&#x539F;&#x6709;&#x51FD;&#x6570;&#x540D;&#x540E;&#x8FB9;&#x589E;&#x52A0;<code>Async</code>&#x8FDB;&#x884C;&#x533A;&#x5206;&#xFF0C;&#x5B98;&#x65B9;&#x7684;&#x8FD9;&#x79CD;&#x5728;&#x6A21;&#x5757;&#x4E2D;&#x5355;&#x72EC;&#x5F15;&#x5165;&#x4E00;&#x4E2A;&#x5B50;&#x6A21;&#x5757;&#xFF0C;&#x5728;&#x91CC;&#x8FB9;&#x5B9E;&#x73B0;<code>Promise</code>&#x7248;&#x672C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x5176;&#x5B9E;&#x8FD9;&#x4E2A;&#x5728;&#x4F7F;&#x7528;&#x4E0A;&#x662F;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#xFF0C;&#x5C31;&#x62FF;<code>fs</code>&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x4E3E;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E4B;&#x524D;&#x5F15;&#x5165;&#x4E00;&#x4E9B; fs &#x76F8;&#x5173;&#x7684; API &#x662F;&#x8FD9;&#x6837;&#x505A;&#x7684;
const { readFile, stat } = require(&apos;fs&apos;)

// &#x800C;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x6539;&#x4E3A;
const { readFile, stat } = require(&apos;fs&apos;).promises
// &#x6216;&#x8005;
const { promises: { readFile, stat } } = require(&apos;fs&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x4E4B;&#x524D;&#x5F15;&#x5165;&#x4E00;&#x4E9B; fs &#x76F8;&#x5173;&#x7684; API &#x662F;&#x8FD9;&#x6837;&#x505A;&#x7684;</span>
<span class="hljs-keyword">const</span> { readFile, stat } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-comment">// &#x800C;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x6539;&#x4E3A;</span>
<span class="hljs-keyword">const</span> { readFile, stat } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>).promises
<span class="hljs-comment">// &#x6216;&#x8005;</span>
<span class="hljs-keyword">const</span> { <span class="hljs-attr">promises</span>: { readFile, stat } } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)</code></pre><p>&#x540E;&#x8FB9;&#x8981;&#x505A;&#x7684;&#x5C31;&#x662F;&#x5C06;&#x8C03;&#x7528;<code>promisify</code>&#x76F8;&#x5173;&#x7684;&#x4EE3;&#x7801;&#x5220;&#x6389;&#x5373;&#x53EF;&#xFF0C;&#x5BF9;&#x4E8E;&#x5176;&#x4ED6;&#x4F7F;&#x7528;<code>API</code>&#x7684;&#x4EE3;&#x7801;&#x6765;&#x8BB2;&#xFF0C;&#x8FD9;&#x4E2A;&#x6539;&#x52A8;&#x662F;&#x65E0;&#x611F;&#x77E5;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#x5982;&#x679C;&#x4F60;&#x7684;<code>node</code>&#x7248;&#x672C;&#x591F;&#x9AD8;&#x7684;&#x8BDD;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x4F7F;&#x7528;&#x5185;&#x7F6E;&#x6A21;&#x5757;&#x4E4B;&#x524D;&#x5148;&#x53BB;&#x7FFB;&#x770B;&#x6587;&#x6863;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x5BF9;&#x5E94;&#x7684;<code>promises</code>&#x652F;&#x6301;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x5B9E;&#x73B0;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x3002;</p><h2 id="articleHeader5">promisify &#x7684;&#x4E00;&#x4E9B;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</h2><ol><li>&#x4E00;&#x5B9A;&#x8981;&#x7B26;&#x5408;<code>Error first callback</code>&#x7684;&#x7EA6;&#x5B9A;</li><li>&#x4E0D;&#x80FD;&#x8FD4;&#x56DE;&#x591A;&#x4E2A;&#x53C2;&#x6570;</li><li>&#x6CE8;&#x610F;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x7684;&#x51FD;&#x6570;&#x662F;&#x5426;&#x5305;&#x542B;<code>this</code>&#x7684;&#x5F15;&#x7528;</li></ol><p>&#x524D;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x4F7F;&#x7528;&#x524D;&#x8FB9;&#x63D0;&#x5230;&#x7684;<code>promisify.custom</code>&#x90FD;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x6389;&#x3002;<br>&#x4F46;&#x662F;&#x7B2C;&#x4E09;&#x9879;&#x53EF;&#x80FD;&#x4F1A;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x88AB;&#x6211;&#x4EEC;&#x6240;&#x5FFD;&#x89C6;&#xFF0C;&#x8FD9;&#x5E76;&#x4E0D;&#x662F;<code>promisify</code>&#x72EC;&#x6709;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5C31;&#x4E00;&#x4E2A;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
  name: &apos;Niko&apos;,
  getName () {
    return this.name
  }
}

obj.getName() // Niko

const func = obj.getName

func() // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>,
  getName () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.name
  }
}

obj.getName() <span class="hljs-comment">// Niko</span>

<span class="hljs-keyword">const</span> func = obj.getName

func() <span class="hljs-comment">// undefined</span></code></pre><p>&#x7C7B;&#x4F3C;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x8FDB;&#x884C;<code>Promise</code>&#x8F6C;&#x6362;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x662F;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x80FD;&#x4F1A;&#x5BFC;&#x81F4;&#x751F;&#x6210;&#x540E;&#x7684;&#x51FD;&#x6570;<code>this</code>&#x6307;&#x5411;&#x51FA;&#x73B0;&#x95EE;&#x9898;&#x3002;<br>&#x4FEE;&#x590D;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#x6709;&#x4E24;&#x79CD;&#x9014;&#x5F84;&#xFF1A;</p><ol><li>&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x662F;&#x63A8;&#x8350;&#x7684;&#x505A;&#x6CD5;</li><li>&#x5728;&#x8C03;&#x7528;<code>promisify</code>&#x4E4B;&#x524D;&#x4F7F;&#x7528;<code>bind</code>&#x7ED1;&#x5B9A;&#x5BF9;&#x5E94;&#x7684;<code>this</code></li></ol><p>&#x4E0D;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#x4E5F;&#x662F;&#x5EFA;&#x7ACB;&#x5728;<code>promisify</code>&#x8F6C;&#x6362;&#x540E;&#x7684;&#x51FD;&#x6570;&#x88AB;&#x8D4B;&#x503C;&#x7ED9;&#x5176;&#x4ED6;&#x53D8;&#x91CF;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x53D1;&#x751F;&#x3002;<br>&#x5982;&#x679C;&#x662F;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x90A3;&#x4E48;&#x5B8C;&#x5168;&#x4E0D;&#x5FC5;&#x62C5;&#x5FC3;<code>this</code>&#x6307;&#x5411;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = {
  name: &apos;Niko&apos;,
  getName (callback) {
    callback(null, this.name)
  }
}

// &#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x62C5;&#x5FC3; this &#x6307;&#x5411;&#x95EE;&#x9898;&#x7684;
obj.XXX = promisify(obj.getName)

// &#x5982;&#x679C;&#x8D4B;&#x503C;&#x7ED9;&#x4E86;&#x5176;&#x4ED6;&#x53D8;&#x91CF;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x91CC;&#x5C31;&#x9700;&#x8981;&#x6CE8;&#x610F; this &#x7684;&#x6307;&#x5411;&#x4E86;
const func = promisify(obj.getName) // &#x9519;&#x8BEF;&#x7684; this" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> obj = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;Niko&apos;</span>,
  getName (callback) {
    callback(<span class="hljs-literal">null</span>, <span class="hljs-keyword">this</span>.name)
  }
}

<span class="hljs-comment">// &#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x662F;&#x4E0D;&#x9700;&#x8981;&#x62C5;&#x5FC3; this &#x6307;&#x5411;&#x95EE;&#x9898;&#x7684;</span>
obj.XXX = promisify(obj.getName)

<span class="hljs-comment">// &#x5982;&#x679C;&#x8D4B;&#x503C;&#x7ED9;&#x4E86;&#x5176;&#x4ED6;&#x53D8;&#x91CF;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x91CC;&#x5C31;&#x9700;&#x8981;&#x6CE8;&#x610F; this &#x7684;&#x6307;&#x5411;&#x4E86;</span>
<span class="hljs-keyword">const</span> func = promisify(obj.getName) <span class="hljs-comment">// &#x9519;&#x8BEF;&#x7684; this</span></code></pre><h2 id="articleHeader6">&#x5C0F;&#x7ED3;</h2><p>&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;<code>Promise</code>&#x4F5C;&#x4E3A;&#x5F53;&#x4EE3;<code>javaScript</code>&#x5F02;&#x6B65;&#x7F16;&#x7A0B;&#x4E2D;&#x6700;&#x6838;&#x5FC3;&#x7684;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x4E86;&#x89E3;&#x5982;&#x4F55;&#x5C06;&#x8001;&#x65E7;&#x4EE3;&#x7801;&#x8F6C;&#x6362;&#x4E3A;<code>Promise</code>&#x662F;&#x4E00;&#x4EF6;&#x5F88;&#x6709;&#x610F;&#x601D;&#x7684;&#x4E8B;&#x513F;&#x3002;<br>&#x800C;&#x6211;&#x53BB;&#x4E86;&#x89E3;&#x5B98;&#x65B9;&#x7684;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x5728;&#x641C;&#x7D22;<code>Redis</code>&#x76F8;&#x5173;&#x7684;<code>Promise</code>&#x7248;&#x672C;&#x65F6;&#x770B;&#x5230;&#x4E86;&#x8FD9;&#x4E2A;<a href="https://github.com/mjackson/then-redis" rel="nofollow noreferrer" target="_blank">readme</a>&#xFF1A;</p><blockquote>This package is no longer maintained. node_redis now includes support for promises in core, so this is no longer needed.</blockquote><p>&#x7136;&#x540E;&#x8DF3;&#x5230;&#x4E86;<code>node_redis</code>&#x91CC;&#x8FB9;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#xFF0C;&#x91CC;&#x8FB9;&#x63D0;&#x5230;&#x4E86;<code>util.promisify</code>&#xFF0C;&#x9042;&#x6293;&#x8FC7;&#x6765;&#x7814;&#x7A76;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x611F;&#x89C9;&#x8FD8;&#x633A;&#x6709;&#x610F;&#x601D;&#xFF0C;&#x603B;&#x7ED3;&#x4E86;&#x4E0B;&#x5206;&#x4EAB;&#x7ED9;&#x5927;&#x5BB6;&#x3002;</p><h3 id="articleHeader7">&#x53C2;&#x8003;&#x8D44;&#x6599;</h3><ul><li><a href="https://nodejs.org/api/util.html#util_util_promisify_original" rel="nofollow noreferrer" target="_blank">util.promisify</a></li><li><a href="https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback" rel="nofollow noreferrer" target="_blank">child_process.exec</a></li><li><a href="https://nodejs.org/api/fs.html#fs_fs_promises_api" rel="nofollow noreferrer" target="_blank">fs.promises</a></li></ul>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
util.promisify 的那些事儿

## 原文链接
[https://segmentfault.com/a/1190000016720505](https://segmentfault.com/a/1190000016720505)


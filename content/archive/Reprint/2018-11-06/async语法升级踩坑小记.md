---
title: async语法升级踩坑小记
hidden: true
categories: [reprint]
slug: '31485486'
date: 2018-11-06 15:28:31
---

{{< raw >}}
<blockquote>&#x4ECE;&#x4ECA;&#x5E74;&#x8FC7;&#x5B8C;&#x5E74;&#x56DE;&#x6765;&#xFF0C;&#x4E09;&#x6708;&#x4EFD;&#x5F00;&#x59CB;&#xFF0C;&#x5C31;&#x4E00;&#x76F4;&#x5728;&#x505A;&#x91CD;&#x6784;&#x76F8;&#x5173;&#x7684;&#x4E8B;&#x60C5;&#x3002;<br>&#x5C31;&#x5728;&#x4ECA;&#x5929;&#x521A;&#x521A;&#x4E0A;&#x7EBF;&#x4E86;&#x6700;&#x65B0;&#x4E00;&#x6B21;&#x7684;&#x91CD;&#x6784;&#x4EE3;&#x7801;&#xFF0C;&#x5E0C;&#x671B;&#x9AD8;&#x5CF0;&#x671F;&#x5B89;&#x597D;&#xFF0C;&#x63A5;&#x8FD1;&#x534A;&#x5E74;&#x7684;Node.js&#x4EE3;&#x7801;&#x91CD;&#x6784;&#x3002;<br>&#x5305;&#x542B;&#x4ECE;<code>callback</code>+<code>async.waterfall</code>&#x5230;<code>generator</code>+<code>co</code>&#xFF0C;&#x7EDF;&#x7EDF;&#x5347;&#x7EA7;&#x4E3A;&#x4E86;<code>async</code>&#xFF0C;&#x8FD8;&#x987A;&#x5E26;&#x63A8;&#x52A8;&#x4E86;<code>TypeScript</code>&#x5728;&#x6211;&#x53F8;&#x7684;&#x4F7F;&#x7528;&#x3002;<br>&#x8FD9;&#x4E9B;&#x65E5;&#x5B50;&#x4E5F;&#x8E29;&#x4E86;&#x4E0D;&#x5C11;&#x5751;&#xFF0C;&#x4E5F;&#x603B;&#x7ED3;&#x4E86;&#x4E00;&#x4E9B;&#x5C0F;&#x5C0F;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6848;&#xFF0C;&#x8FDB;&#x884C;&#x7CBE;&#x7B80;&#x540E;&#x5C06;&#x4E00;&#x4E9B;&#x6BD4;&#x8F83;&#x5173;&#x952E;&#x7684;&#x70B9;&#xFF0C;&#x62FF;&#x51FA;&#x6765;&#x5206;&#x4EAB;&#x7ED9;&#x5927;&#x5BB6;&#xFF0C;&#x5E0C;&#x671B;&#x6709;&#x540C;&#x6837;&#x5728;&#x505A;&#x91CD;&#x6784;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x4EEC;&#x53EF;&#x4EE5;&#x7ED5;&#x8FC7;&#x8FD9;&#x4E9B;&#x3002;</blockquote><h2 id="articleHeader0">&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x5347;&#x7EA7;</h2><p>&#x9996;&#x5148;&#x8FD8;&#x662F;&#x8981;&#x8C08;&#x8C08;&#x6539;&#x4EE3;&#x7801;&#x7684;&#x7406;&#x7531;&#xFF0C;&#x6BD5;&#x7ADF;&#x91CD;&#x6784;&#x80AF;&#x5B9A;&#x662F;&#x8981;&#x6709;&#x5408;&#x7406;&#x7684;&#x7406;&#x7531;&#x7684;&#x3002;<br>&#x5982;&#x679C;&#x5355;&#x7EAF;&#x60F3;&#x770B;&#x5347;&#x7EA7;&#x76F8;&#x5173;&#x4E8B;&#x9879;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x9009;&#x62E9;&#x8DF3;&#x8FC7;&#x8FD9;&#x90E8;&#x5206;&#x3002;</p><h3 id="articleHeader1">Callback</h3><p>&#x4ECE;&#x6700;&#x539F;&#x59CB;&#x7684;&#x5F00;&#x59CB;&#x8BF4;&#x8D77;&#xFF0C;&#x671F;&#x95F4;&#x786E;&#x5B9E;&#x9047;&#x5230;&#x4E86;&#x51E0;&#x4E2A;&#x5E74;&#x4EE3;&#x4E45;&#x8FDC;&#x7684;&#x9879;&#x76EE;&#xFF0C;<code>Node 0.x</code>&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x666E;&#x901A;<code>callback</code>&#xFF0C;&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x4F1A;&#x5E94;&#x7528;&#x4E0A;<a href="https://www.npmjs.com/package/async" rel="nofollow noreferrer" target="_blank">async.waterfall</a>&#x8FD9;&#x6837;&#x5728;&#x5F53;&#x5E74;&#x770B;&#x8D77;&#x6765;&#x5F88;&#x4F18;&#x79C0;&#x7684;&#x5DE5;&#x5177;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x666E;&#x901A;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8C03;&#x7528;
var fs = require(&apos;fs&apos;)

fs.readFile(&apos;test1.txt&apos;, function (err, data1) {
  if (err) return console.error(err)


  fs.readFile(&apos;test2.txt&apos;, function (err, data2) {
    if (err) return console.error(err)

    // &#x6267;&#x884C;&#x540E;&#x7EED;&#x903B;&#x8F91;
    console.log(data1.toString() + data2.toString())
    // ...
  })
})

// &#x4F7F;&#x7528;&#x4E86;async&#x4EE5;&#x540E;&#x7684;&#x590D;&#x6742;&#x903B;&#x8F91;
var async = require(&apos;fs&apos;)

async.waterfall([
  function (callback) {
    fs.readFile(&apos;test1.txt&apos;, function (err, data) {
      if (err) callback(err)

      callback(null, data.toString())
    })
  },
  function (result, callback) {
    fs.readFile(&apos;test2.txt&apos;, function (err, data) {
      if (err) callback(err)

      callback(null, result + data.toString())
    })
  }
], function (err, result) {
  if (err) return console.error(err)

  // &#x83B7;&#x53D6;&#x5230;&#x6B63;&#x786E;&#x7684;&#x7ED3;&#x679C;
  console.log(result) // &#x8F93;&#x51FA;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x62FC;&#x63A5;&#x540E;&#x7684;&#x5185;&#x5BB9;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x666E;&#x901A;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8C03;&#x7528;</span>
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

fs.readFile(<span class="hljs-string">&apos;test1.txt&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data1</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err)


  fs.readFile(<span class="hljs-string">&apos;test2.txt&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data2</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err)

    <span class="hljs-comment">// &#x6267;&#x884C;&#x540E;&#x7EED;&#x903B;&#x8F91;</span>
    <span class="hljs-built_in">console</span>.log(data1.toString() + data2.toString())
    <span class="hljs-comment">// ...</span>
  })
})

<span class="hljs-comment">// &#x4F7F;&#x7528;&#x4E86;async&#x4EE5;&#x540E;&#x7684;&#x590D;&#x6742;&#x903B;&#x8F91;</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">async</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)

<span class="hljs-keyword">async</span>.waterfall([
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
    fs.readFile(<span class="hljs-string">&apos;test1.txt&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{
      <span class="hljs-keyword">if</span> (err) callback(err)

      callback(<span class="hljs-literal">null</span>, data.toString())
    })
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result, callback</span>) </span>{
    fs.readFile(<span class="hljs-string">&apos;test2.txt&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, data</span>) </span>{
      <span class="hljs-keyword">if</span> (err) callback(err)

      callback(<span class="hljs-literal">null</span>, result + data.toString())
    })
  }
], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.error(err)

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5230;&#x6B63;&#x786E;&#x7684;&#x7ED3;&#x679C;</span>
  <span class="hljs-built_in">console</span>.log(result) <span class="hljs-comment">// &#x8F93;&#x51FA;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x62FC;&#x63A5;&#x540E;&#x7684;&#x5185;&#x5BB9;</span>
})</code></pre><p>&#x867D;&#x8BF4;<code>async.waterfall</code>&#x89E3;&#x51B3;&#x4E86;<code>callback hell</code>&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x4E0D;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x524D;&#x8FB9;&#x6709;&#x4E8C;&#x4E09;&#x5341;&#x4E2A;&#x7A7A;&#x683C;&#x7684;&#x7F29;&#x8FDB;&#x3002;<br>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#x5728;&#x67D0;&#x4E9B;&#x60C5;&#x51B5;&#x4E0B;&#x4F1A;&#x8BA9;&#x4EE3;&#x7801;&#x53D8;&#x5F97;&#x5F88;&#x8BE1;&#x5F02;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x5F88;&#x96BE;&#x5728;&#x67D0;&#x4E2A;&#x51FD;&#x6570;&#x4E2D;&#x9009;&#x62E9;&#x4E0B;&#x4E00;&#x4E2A;&#x5E94;&#x8BE5;&#x6267;&#x884C;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x662F;&#x53EA;&#x80FD;&#x6309;&#x7167;&#x987A;&#x5E8F;&#x6267;&#x884C;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981;&#x8FDB;&#x884C;&#x8DF3;&#x8FC7;&#xFF0C;&#x53EF;&#x80FD;&#x5C31;&#x8981;&#x5728;&#x4E2D;&#x9014;&#x7684;&#x51FD;&#x6570;&#x4E2D;&#x8FDB;&#x884C;&#x989D;&#x5916;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async.waterfall([
  function (callback) {
    if (XXX) {
      callback(null, null, null, true)
    } else {
      callback(null, data1, data2)
    }
  },
  function (data1, data2, isPass, callback) {
    if (isPass) {
      callback(null, null, null, isPass)
    } else {
      callback(null, data1 + data2)
    }
  }
])" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span>.waterfall([
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
    <span class="hljs-keyword">if</span> (XXX) {
      callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">true</span>)
    } <span class="hljs-keyword">else</span> {
      callback(<span class="hljs-literal">null</span>, data1, data2)
    }
  },
  <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data1, data2, isPass, callback</span>) </span>{
    <span class="hljs-keyword">if</span> (isPass) {
      callback(<span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, <span class="hljs-literal">null</span>, isPass)
    } <span class="hljs-keyword">else</span> {
      callback(<span class="hljs-literal">null</span>, data1 + data2)
    }
  }
])</code></pre><p>&#x6240;&#x4EE5;&#x5F88;&#x53EF;&#x80FD;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x53D8;&#x6210;&#x8FD9;&#x6837;&#xFF0C;&#x91CC;&#x8FB9;&#x5B58;&#x5728;&#x5927;&#x91CF;&#x7684;&#x4E0D;&#x53EF;&#x8BFB;&#x7684;&#x51FD;&#x6570;&#x8C03;&#x7528;&#xFF0C;&#x90A3;&#x6EE1;&#x5C4F;&#x5145;&#x65A5;&#x7684;<code>null</code>&#x5360;&#x4F4D;&#x7B26;&#x3002;</p><p>&#x6240;&#x4EE5;<code>callback</code>&#x8FD9;&#x79CD;&#x5F62;&#x5F0F;&#x7684;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x8FDB;&#x884C;&#x4FEE;&#x6539;&#xFF0C; __&#x8FD9;&#x5C5E;&#x4E8E;&#x96BE;&#x4EE5;&#x7EF4;&#x62A4;&#x7684;&#x4EE3;&#x7801;__&#x3002;</p><h3 id="articleHeader2">Generator</h3><p>&#x5B9E;&#x9645;&#x4E0A;<code>generator</code>&#x662F;&#x4F9D;&#x6258;&#x4E8E;<code>co</code>&#x4EE5;&#x53CA;&#x7C7B;&#x4F3C;&#x7684;&#x5DE5;&#x5177;&#x6765;&#x5B9E;&#x73B0;&#x7684;&#x5C06;&#x5176;&#x8F6C;&#x6362;&#x4E3A;<code>Promise</code>&#xFF0C;&#x4ECE;&#x7F16;&#x8F91;&#x5668;&#x4E2D;&#x770B;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x8BFB;&#x6027;&#x5DF2;&#x7ECF;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x95EE;&#x9898;&#x5728;&#x4E8E;&#x4ED6;&#x59CB;&#x7EC8;&#x662F;&#x9700;&#x8981;&#x989D;&#x5916;&#x5F15;&#x5165;<code>co</code>&#x6765;&#x5E2E;&#x5FD9;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;<code>generator</code>&#x672C;&#x8EAB;&#x5E76;&#x4E0D;&#x5177;&#x5907;&#x5E2E;&#x4F60;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x7684;&#x529F;&#x80FD;&#x3002;<br><em>&#x4E0D;&#x8981;&#x518D;&#x8BF4;&#x4EC0;&#x4E48;async/await&#x662F;generator&#x7684;&#x8BED;&#x6CD5;&#x7CD6;&#x4E86;</em></p><p>&#x56E0;&#x4E3A;&#x6211;&#x53F8;<code>Node</code>&#x7248;&#x672C;&#x5DF2;&#x7ECF;&#x7EDF;&#x4E00;&#x5347;&#x7EA7;&#x5230;&#x4E86;<code>8.11.x</code>&#xFF0C;&#x6240;&#x4EE5;<code>async/await</code>&#x8BED;&#x6CD5;&#x5DF2;&#x7ECF;&#x53EF;&#x7528;&#x3002;<br>&#x8FD9;&#x5C31;&#x50CF;&#x5982;&#x679C;<code>document.querySelectorAll</code>&#x3001;<code>fetch</code>&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x6EE1;&#x8DB3;&#x9700;&#x6C42;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x8981;&#x5F15;&#x5165;<code>jQuery</code>&#x5462;&#x3002;</p><p>&#x6240;&#x4EE5;&#xFF0C;&#x5C06;<code>generator</code>&#x51FD;&#x6570;&#x6539;&#x9020;&#x4E3A;<code>async/await</code>&#x51FD;&#x6570;&#x4E5F;&#x662F;&#x52BF;&#x5728;&#x5FC5;&#x884C;&#x3002;</p><h2 id="articleHeader3">&#x671F;&#x95F4;&#x9047;&#x5230;&#x7684;&#x5751;</h2><p>&#x5C06;<code>callback</code>&#x7684;&#x5347;&#x7EA7;&#x4E3A;<code>async</code>/<code>await</code>&#x5176;&#x5B9E;&#x5E76;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5751;&#xFF0C;&#x53CD;&#x5012;&#x662F;&#x5728;<code>generator</code> + <code>co</code> &#x90A3;&#x91CC;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E9B;&#x95EE;&#x9898;&#xFF1A;</p><h3 id="articleHeader4">&#x6570;&#x7EC4;&#x6267;&#x884C;&#x7684;&#x95EE;&#x9898;</h3><p>&#x5728;<code>co</code>&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x5927;&#x5BB6;&#x5E94;&#x8BE5;&#x90FD;&#x89C1;&#x5230;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const results = yield list.map(function * (item) {
  return yield getData(item)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">yield</span> list.map(<span class="hljs-function"><span class="hljs-keyword">function</span> * (<span class="hljs-params">item</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> getData(item)
})</code></pre><p>&#x5728;&#x5FAA;&#x73AF;&#x4E2D;&#x53D1;&#x8D77;&#x4E00;&#x4E9B;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x6709;&#x4E9B;&#x4EBA;&#x4F1A;&#x544A;&#x8BC9;&#x4F60;&#xFF0C;&#x4ECE;<code>yield</code>&#x6539;&#x4E3A;<code>async</code>/<code>await</code>&#x4EC5;&#x4EC5;&#x66FF;&#x6362;&#x5173;&#x952E;&#x5B57;&#x5C31;&#x597D;&#x4E86;&#x3002;</p><p>&#x90A3;&#x4E48;&#x606D;&#x559C;&#x4F60;&#x5F97;&#x5230;&#x7684;<code>results</code>&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x7531;<code>Promise</code>&#x5B9E;&#x4F8B;&#x7EC4;&#x6210;&#x7684;&#x6570;&#x7EC4;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const results = await list.map(async item =&gt; {
  return await getData(item)
})

console.log(results) // [Promise, Promise, Promise, ...]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> list.map(<span class="hljs-keyword">async</span> item =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> getData(item)
})

<span class="hljs-built_in">console</span>.log(results) <span class="hljs-comment">// [Promise, Promise, Promise, ...]</span></code></pre><p>&#x56E0;&#x4E3A;<code>async</code>&#x5E76;&#x4E0D;&#x4F1A;&#x5224;&#x65AD;&#x4F60;&#x540E;&#x8FB9;&#x7684;&#x662F;&#x4E0D;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF08;&#x8FD9;&#x4E2A;&#x662F;&#x5728;<code>co</code>&#x4E2D;&#x6709;&#x989D;&#x5916;&#x7684;&#x5904;&#x7406;&#xFF09;&#x800C;&#x4EC5;&#x4EC5;&#x68C0;&#x67E5;&#x8868;&#x8FBE;&#x5F0F;&#x662F;&#x5426;&#x4E3A;&#x4E00;&#x4E2A;<code>Promise</code>&#x5B9E;&#x4F8B;&#x3002;<br>&#x6240;&#x4EE5;&#x6B63;&#x786E;&#x7684;&#x505A;&#x6CD5;&#x662F;&#xFF0C;&#x6DFB;&#x52A0;&#x4E00;&#x5C42;<code>Promise.all</code>&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#x7B49;&#x65B0;&#x7684;&#x8BED;&#x6CD5;<code>await*</code>&#xFF0C;<code>Node.js 10.x</code>&#x8C8C;&#x4F3C;&#x8FD8;&#x4E0D;&#x652F;&#x6301;&#x3002;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5173;&#x4E8E;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6848;&#x5728;&#x4E0B;&#x8FB9;&#x7684;&#x5EFA;&#x8BAE;&#x4E2D;&#x6709;&#x63D0;&#x5230;
const results = await Promise.all(list.map(async item =&gt; {
  return await getData(item)
}))

console.log(results) // [1, 2, 3, ...]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5173;&#x4E8E;&#x8FD9;&#x6BB5;&#x4EE3;&#x7801;&#x7684;&#x4F18;&#x5316;&#x65B9;&#x6848;&#x5728;&#x4E0B;&#x8FB9;&#x7684;&#x5EFA;&#x8BAE;&#x4E2D;&#x6709;&#x63D0;&#x5230;</span>
<span class="hljs-keyword">const</span> results = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(list.map(<span class="hljs-keyword">async</span> item =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> getData(item)
}))

<span class="hljs-built_in">console</span>.log(results) <span class="hljs-comment">// [1, 2, 3, ...]</span></code></pre><h3 id="articleHeader5">await / yield &#x6267;&#x884C;&#x987A;&#x5E8F;&#x7684;&#x5DEE;&#x5F02;</h3><p>&#x8FD9;&#x4E2A;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x9047;&#x5230;&#x7684;&#x6982;&#x7387;&#x4E0D;&#x5927;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x771F;&#x7684;&#x9047;&#x5230;&#x4E86;&#x800C;&#x683D;&#x4E86;&#x8FDB;&#x53BB;&#x5C31;&#x6B32;&#x54ED;&#x65E0;&#x6CEA;&#x4E86;&#x3002;</p><p>&#x9996;&#x5148;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x5728;&#x6267;&#x884C;&#x4E0A;&#x662F;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield 123 // 123

await 123 // 123" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">yield</span> <span class="hljs-number">123</span> <span class="hljs-comment">// 123</span>

<span class="hljs-keyword">await</span> <span class="hljs-number">123</span> <span class="hljs-comment">// 123</span></code></pre><p>&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x4E5F;&#x662F;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield Promise.resolve(123) // 123

await Promise.resolve(123) // 123" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">yield</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>) <span class="hljs-comment">// 123</span>

<span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>) <span class="hljs-comment">// 123</span></code></pre><p>&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x95EE;&#x9898;&#x5C31;&#x6765;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yield true ? Promise.resolve(123) : Promise.resolve(233) // 123

await true ? Promise.resolve(123) : Promise.resolve(233) // Promise&lt;123&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">yield</span> <span class="hljs-literal">true</span> ? <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>) : <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">233</span>) <span class="hljs-comment">// 123</span>

<span class="hljs-keyword">await</span> <span class="hljs-literal">true</span> ? <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>) : <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">233</span>) <span class="hljs-comment">// Promise&lt;123&gt;</span></code></pre><p>&#x4ECE;&#x5B57;&#x9762;&#x4E0A;&#x6211;&#x4EEC;&#x5176;&#x5B9E;&#x662F;&#x60F3;&#x8981;&#x5F97;&#x5230;<code>yield</code>&#x90A3;&#x6837;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x7ED3;&#x679C;&#x5374;&#x5F97;&#x5230;&#x4E86;&#x4E00;&#x4E2A;<code>Promise</code>&#x5B9E;&#x4F8B;&#x3002;<br>&#x8FD9;&#x4E2A;&#x662F;&#x56E0;&#x4E3A;<code>yield</code>&#x3001;<code>await</code>&#x4E24;&#x4E2A;&#x5173;&#x952E;&#x5B57;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E0D;&#x540C;&#x6240;&#x5BFC;&#x81F4;&#x7684;&#x3002;</p><p>&#x5728;MDN&#x7684;&#x6587;&#x6863;&#x4E2D;&#x53EF;&#x4EE5;&#x627E;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x8BF4;&#x660E;&#xFF1A;<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table" rel="nofollow noreferrer" target="_blank">MDN | Operator precedence</a></p><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;<code>yield</code>&#x7684;&#x6743;&#x91CD;&#x975E;&#x5E38;&#x4F4E;&#xFF0C;&#x4EC5;&#x9AD8;&#x4E8E;<code>return</code>&#xFF0C;&#x6240;&#x4EE5;&#x4ECE;&#x5B57;&#x9762;&#x4E0A;&#x770B;&#xFF0C;&#x8FD9;&#x4E2A;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x5F88;&#x7B26;&#x5408;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x3002;<br>&#x800C;<code>await</code>&#x5173;&#x952E;&#x5B57;&#x7684;&#x6743;&#x91CD;&#x8981;&#x9AD8;&#x5F88;&#x591A;&#xFF0C;&#x751A;&#x81F3;&#x9AD8;&#x4E8E;&#x6700;&#x666E;&#x901A;&#x7684;&#x56DB;&#x5219;&#x8FD0;&#x7B97;&#xFF0C;&#x6240;&#x4EE5;&#x5FC5;&#x7136;&#x4E5F;&#x662F;&#x9AD8;&#x4E8E;&#x4E09;&#x5143;&#x8FD0;&#x7B97;&#x7B26;&#x7684;&#x3002;</p><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;<code>await</code>&#x7248;&#x672C;&#x7684;&#x5B9E;&#x9645;&#x6267;&#x884C;&#x662F;&#x8FD9;&#x6837;&#x5B50;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(await true) ? Promise.resolve(123) : Promise.resolve(233) // Promise&lt;123&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">(<span class="hljs-keyword">await</span> <span class="hljs-literal">true</span>) ? <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>) : <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">233</span>) <span class="hljs-comment">// Promise&lt;123&gt;</span></code></pre><p>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x83B7;&#x53D6;&#x9884;&#x671F;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x6DFB;&#x52A0;<code>()</code>&#x6765;&#x544A;&#x77E5;&#x89E3;&#x91CA;&#x5668;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;&#x4E86;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await (true ? Promise.resolve(123) : Promise.resolve(233)) // 123" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">await</span> (<span class="hljs-literal">true</span> ? <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>) : <span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">233</span>)) <span class="hljs-comment">// 123</span></code></pre><h3 id="articleHeader6">&#x4E00;&#x5B9A;&#x4E0D;&#x8981;&#x6F0F;&#x5199; await &#x5173;&#x952E;&#x5B57;</h3><p>&#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x7B97;&#x4E0D;&#x4E0A;&#x5347;&#x7EA7;&#x65F6;&#x7684;&#x5751;&#xFF0C;&#x5728;&#x4F7F;&#x7528;<code>co</code>&#x65F6;&#x4E5F;&#x4F1A;&#x9047;&#x5230;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x4E25;&#x91CD;&#xFF0C;&#x800C;&#x4E14;&#x5F88;&#x5BB9;&#x6613;&#x51FA;&#x73B0;&#x7684;&#x95EE;&#x9898;&#x3002;</p><p>&#x5982;&#x679C;&#x6709;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x7684;&#x64CD;&#x4F5C;&#x7528;&#x6765;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x544A;&#x8BC9;&#x6211;&#x4EEC;&#x4ED6;&#x662F;&#x5426;&#x4E3A;&#x7BA1;&#x7406;&#x5458;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x5199;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function isAdmin (id) {
  if (id === 123) return true

  return false
}

if (await isAdmin(1)) {
  // &#x7BA1;&#x7406;&#x5458;&#x7684;&#x64CD;&#x4F5C;
} else {
  // &#x666E;&#x901A;&#x7528;&#x6237;&#x7684;&#x64CD;&#x4F5C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isAdmin</span> (<span class="hljs-params">id</span>) </span>{
  <span class="hljs-keyword">if</span> (id === <span class="hljs-number">123</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>

  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}

<span class="hljs-keyword">if</span> (<span class="hljs-keyword">await</span> isAdmin(<span class="hljs-number">1</span>)) {
  <span class="hljs-comment">// &#x7BA1;&#x7406;&#x5458;&#x7684;&#x64CD;&#x4F5C;</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// &#x666E;&#x901A;&#x7528;&#x6237;&#x7684;&#x64CD;&#x4F5C;</span>
}</code></pre><p>&#x56E0;&#x4E3A;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;&#x63A5;&#x8FD1;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#xFF0C;&#x6240;&#x4EE5;&#x9057;&#x6F0F;&#x5173;&#x952E;&#x5B57;&#x662F;&#x5F88;&#x6709;&#x53EF;&#x80FD;&#x51FA;&#x73B0;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (isAdmin(1)) {
  // &#x7BA1;&#x7406;&#x5458;&#x7684;&#x64CD;&#x4F5C;
} else {
  // &#x666E;&#x901A;&#x7528;&#x6237;&#x7684;&#x64CD;&#x4F5C;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (isAdmin(<span class="hljs-number">1</span>)) {
  <span class="hljs-comment">// &#x7BA1;&#x7406;&#x5458;&#x7684;&#x64CD;&#x4F5C;</span>
} <span class="hljs-keyword">else</span> {
  <span class="hljs-comment">// &#x666E;&#x901A;&#x7528;&#x6237;&#x7684;&#x64CD;&#x4F5C;</span>
}</code></pre><p>&#x56E0;&#x4E3A;<code>async</code>&#x51FD;&#x6570;&#x7684;&#x8C03;&#x7528;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;<code>Promise</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x5F97;&#x76CA;&#x4E8E;&#x6211;&#x5F3A;&#x5927;&#x7684;&#x5F31;&#x7C7B;&#x578B;&#x811A;&#x672C;&#x8BED;&#x8A00;&#xFF0C;<code>Promise</code>&#x5B9E;&#x4F8B;&#x662F;&#x4E00;&#x4E2A;<code>Object</code>&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4E0D;&#x4E3A;&#x7A7A;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4F1A;&#x8F6C;&#x6362;&#x4E3A;<code>true</code>&#xFF0C;&#x90A3;&#x4E48;&#x6240;&#x6709;&#x8C03;&#x7528;&#x7684;&#x60C5;&#x51B5;&#x90FD;&#x4F1A;&#x8FDB;&#x5165;<code>if</code>&#x5757;&#x3002;</p><p>&#x90A3;&#x4E48;&#x89E3;&#x51B3;&#x8FD9;&#x6837;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x7A33;&#x59A5;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5F3A;&#x5236;&#x5224;&#x65AD;&#x7C7B;&#x578B;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x7684;&#x4F7F;&#x7528;<code>if else</code>&#xFF0C;&#x4F7F;&#x7528;&#x7C7B;&#x4F3C;<code>(a === 1)</code>&#x3001;<code>(a === true)</code>&#x8FD9;&#x6837;&#x7684;&#x64CD;&#x4F5C;&#x3002;_eslint&#x3001;ts &#x4E4B;&#x7C7B;&#x7684;&#x90FD;&#x5F88;&#x96BE;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;_</p><h2 id="articleHeader7">&#x4E00;&#x4E9B;&#x5EFA;&#x8BAE;</h2><h3 id="articleHeader8">&#x4F55;&#x65F6;&#x5E94;&#x8BE5;&#x7528; async &#xFF0C;&#x4F55;&#x65F6;&#x5E94;&#x8BE5;&#x76F4;&#x63A5;&#x7528; Promise</h3><p>&#x9996;&#x5148;&#xFF0C;<code>async</code>&#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x8FD4;&#x56DE;&#x503C;&#x5C31;&#x662F;&#x4E00;&#x4E2A;<code>Promise</code>&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x5730;&#x7406;&#x89E3;&#x4E3A;<code>async</code>&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;<code>Promise</code>&#x7684;&#x5305;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetchData () {
  return Promise().resolve(123)
}

// ==&gt;

async function fetchData () {
  return 123
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>().resolve(<span class="hljs-number">123</span>)
}

<span class="hljs-comment">// ==&gt;</span>

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchData</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">123</span>
}</code></pre><p>&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x8BF4;<code>await</code>&#x540E;&#x8FB9;&#x662F;&#x4E00;&#x4E2A;<code>Promise</code>&#x7684;&#x5B9E;&#x4F8B;&#x3002;<br>&#x800C;&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x975E;<code>Promise</code>&#x5B9E;&#x4F8B;&#x5219;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x5F71;&#x54CD;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x3002;</p><p>&#x5728;&#x9488;&#x5BF9;&#x4E00;&#x4E9B;&#x8001;&#x65E7;&#x7684;<code>callback</code>&#x51FD;&#x6570;&#xFF0C;&#x5F53;&#x524D;&#x7248;&#x672C;&#x7684;<code>Node</code>&#x5DF2;&#x7ECF;&#x63D0;&#x4F9B;&#x4E86;&#x5B98;&#x65B9;&#x7684;&#x8F6C;&#x6362;&#x5DE5;&#x5177;<a href="https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original" rel="nofollow noreferrer" target="_blank">util.promisify</a>&#xFF0C;&#x7528;&#x6765;&#x5C06;&#x7B26;&#x5408;<code>Error-first callback</code>&#x89C4;&#x5219;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x8F6C;&#x6362;&#x4E3A;<code>Promise</code>&#x5B9E;&#x4F8B;&#xFF1A;</p><p>&#x800C;&#x4E00;&#x4E9B;&#x6CA1;&#x6709;&#x9075;&#x5B88;&#x8FD9;&#x6837;&#x89C4;&#x5219;&#x7684;&#xFF0C;&#x6216;&#x8005;&#x6211;&#x4EEC;&#x8981;&#x81EA;&#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x884C;&#x4E3A;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x4F1A;&#x5C1D;&#x8BD5;&#x624B;&#x52A8;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x7684;&#x5C01;&#x88C5;&#x3002;<br>&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#x4E00;&#x822C;&#x4F1A;&#x91C7;&#x7528;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>Promise</code>&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x65B9;&#x4FBF;&#x7684;&#x63A7;&#x5236;&#x4F55;&#x65F6;&#x5E94;&#x8BE5;<code>reject</code>&#xFF0C;&#x4F55;&#x65F6;&#x5E94;&#x8BE5;<code>resolve</code>&#x3002;</p><p>&#x4F46;&#x662F;&#x5982;&#x679C;&#x9047;&#x5230;&#x4E86;&#x5728;&#x56DE;&#x8C03;&#x6267;&#x884C;&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#x9700;&#x8981;&#x53D1;&#x8D77;&#x5176;&#x4ED6;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#xFF0C;&#x96BE;&#x9053;&#x5C31;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;<code>Promise</code>&#x5BFC;&#x81F4;&#x6211;&#x4EEC;&#x5728;&#x5185;&#x90E8;&#x4E5F;&#x8981;&#x4F7F;&#x7528;<code>.then</code>&#x6765;&#x5904;&#x7406;&#x4E48;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getList () {
  return new Promise((resolve, reject) =&gt; {
    oldMethod((err, data) =&gt; {
      fetch(data.url).then(res =&gt; res.json()).then(data =&gt; {
        resolve(data)
      })
    })
  })
}

await getList()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getList</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    oldMethod(<span class="hljs-function">(<span class="hljs-params">err, data</span>) =&gt;</span> {
      fetch(data.url).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json()).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
        resolve(data)
      })
    })
  })
}

<span class="hljs-keyword">await</span> getList()</code></pre><p>&#x4F46;&#x4E0A;&#x8FB9;&#x7684;&#x4EE3;&#x7801;&#x4E5F;&#x592A;&#x4E11;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5173;&#x4E8E;&#x4E0A;&#x8FF0;&#x95EE;&#x9898;&#xFF0C;&#x80AF;&#x5B9A;&#x662F;&#x6709;&#x66F4;&#x6E05;&#x6670;&#x7684;&#x5199;&#x6CD5;&#x7684;&#xFF0C;&#x4E0D;&#x8981;&#x9650;&#x5236;&#x81EA;&#x5DF1;&#x7684;&#x601D;&#x7EF4;&#x3002;<br>__<code>async</code>&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x666E;&#x901A;&#x51FD;&#x6570;__&#xFF0C;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x653E;&#x5728;&#x4EFB;&#x4F55;&#x51FD;&#x6570;&#x6267;&#x884C;&#x7684;&#x5730;&#x65B9;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5173;&#x4E8E;&#x4E0A;&#x8FF0;&#x7684;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x8FD9;&#x6837;&#x7684;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getList () {
  return new Promise((resolve, reject) =&gt; {
    oldMethod(async (err, data) =&gt; {
      const res = await fetch(data.url)
      const data = await res.json()

      resolve(data)
    })
  })
}

await getList()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getList</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    oldMethod(<span class="hljs-keyword">async</span> (err, data) =&gt; {
      <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(data.url)
      <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> res.json()

      resolve(data)
    })
  })
}

<span class="hljs-keyword">await</span> getList()</code></pre><p>&#x8FD9;&#x5B8C;&#x5168;&#x662F;&#x4E00;&#x4E2A;&#x53EF;&#x884C;&#x7684;&#x65B9;&#x6848;&#xFF0C;&#x5BF9;&#x4E8E;<code>oldMethod</code>&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x6309;&#x7167;&#x7EA6;&#x5B9A;&#x8C03;&#x7528;&#x4E86;&#x4F20;&#x5165;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x5BF9;&#x4E8E;<code>async</code>&#x533F;&#x540D;&#x51FD;&#x6570;&#x6765;&#x8BF4;&#xFF0C;&#x4E5F;&#x6B63;&#x786E;&#x7684;&#x6267;&#x884C;&#x4E86;&#x81EA;&#x5DF1;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5E76;&#x5728;&#x5176;&#x5185;&#x90E8;&#x89E6;&#x53D1;&#x4E86;&#x5916;&#x5C42;&#x7684;<code>resolve</code>&#xFF0C;&#x5B9E;&#x73B0;&#x4E86;&#x5B8C;&#x6574;&#x7684;&#x6D41;&#x7A0B;&#x3002;</p><p><em>&#x4EE3;&#x7801;&#x53D8;&#x5F97;&#x6E05;&#x6670;&#x5F88;&#x591A;&#xFF0C;&#x903B;&#x8F91;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x4FEE;&#x6539;&#x3002;</em></p><h3 id="articleHeader9">&#x5408;&#x7406;&#x7684;&#x51CF;&#x5C11; await &#x5173;&#x952E;&#x5B57;</h3><p><code>await</code>&#x53EA;&#x80FD;&#x5728;<code>async</code>&#x51FD;&#x6570;&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;<code>await</code>&#x540E;&#x8FB9;&#x53EF;&#x4EE5;&#x8DDF;&#x4E00;&#x4E2A;<code>Promise</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x8FD9;&#x4E2A;&#x662F;&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;&#x7684;&#x3002;<br>&#x4F46;&#x662F;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x6709;&#x4E9B;<code>await</code>&#x5176;&#x5B9E;&#x5E76;&#x6CA1;&#x6709;&#x5B58;&#x5728;&#x7684;&#x5FC5;&#x8981;&#x3002;</p><p>&#x9996;&#x5148;&#x6709;&#x4E00;&#x4E2A;&#x6211;&#x9762;&#x8BD5;&#x65F6;&#x5019;&#x7ECF;&#x5E38;&#x4F1A;&#x95EE;&#x7684;&#x9898;&#x76EE;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Promise.resolve(Promise.resolve(123)).then(console.log) // ?" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-built_in">Promise</span>.resolve(<span class="hljs-number">123</span>)).then(<span class="hljs-built_in">console</span>.log) <span class="hljs-comment">// ?</span></code></pre><p>&#x6700;&#x7EC8;&#x8F93;&#x51FA;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#x3002;</p><p>&#x8FD9;&#x5C31;&#x8981;&#x8BF4;&#x5230;<code>resolve</code>&#x7684;&#x6267;&#x884C;&#x65B9;&#x5F0F;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x5165;&#x7684;&#x662F;&#x4E00;&#x4E2A;<code>Promise</code>&#x5B9E;&#x4F8B;&#xFF0C;&#x4EA6;&#x6216;&#x8005;&#x662F;&#x4E00;&#x4E2A;<code>thenable</code>&#x5BF9;&#x8C61;&#xFF08;_&#x7B80;&#x5355;&#x7684;&#x7406;&#x89E3;&#x4E3A;&#x652F;&#x6301;<code>.then((resolve, reject) =&gt; {})</code>&#x8C03;&#x7528;&#x7684;&#x5BF9;&#x8C61;_&#xFF09;&#xFF0C;&#x90A3;&#x4E48;<code>resolve</code>&#x5B9E;&#x9645;&#x8FD4;&#x56DE;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x5185;&#x90E8;&#x6267;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4E0A;&#x8FF0;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x76F4;&#x63A5;&#x8F93;&#x51FA;<code>123</code>&#xFF0C;&#x54EA;&#x6015;&#x518D;&#x591A;&#x5D4C;&#x5957;&#x51E0;&#x5C42;&#x90FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#x7ED3;&#x679C;&#x3002;</p><p>&#x901A;&#x8FC7;&#x4E0A;&#x8FB9;&#x6240;&#x8BF4;&#x7684;&#xFF0C;&#x4E0D;&#x77E5;&#x5927;&#x5BB6;&#x662F;&#x5426;&#x7406;&#x89E3;&#x4E86; <em>&#x5408;&#x7406;&#x7684;&#x51CF;&#x5C11; await &#x5173;&#x952E;&#x5B57;</em> &#x8FD9;&#x53E5;&#x8BDD;&#x7684;&#x610F;&#x601D;&#x3002;</p><p>&#x7ED3;&#x5408;&#x7740;&#x524D;&#x8FB9;&#x63D0;&#x5230;&#x7684;&#x5728;<code>async</code>&#x51FD;&#x6570;&#x4E2D;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x662F;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;<code>Promise.resolve</code>/<code>Promise.reject</code>&#x7684;&#x8FC7;&#x7A0B;&#x3002;<br>&#x800C;<code>await</code>&#x5C31;&#x662F;&#x7C7B;&#x4F3C;&#x76D1;&#x542C;<code>then</code>&#x7684;&#x52A8;&#x4F5C;&#x3002;</p><p>&#x6240;&#x4EE5;&#x50CF;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const imgList = []

async function getImage (url) {
  const res = await fetch(url)

  return await res.blob()
}

await Promise.all(imgList.map(async url =&gt; await getImage(url)))

// ==&gt;

async function getImage (url) {
  const res = fetch(url)

  return res.blob()
}

await Promise.all(imgList.map(url =&gt; getImage(url)))" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> imgList = []

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getImage</span> (<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> fetch(url)

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> res.blob()
}

<span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(imgList.map(<span class="hljs-keyword">async</span> url =&gt; <span class="hljs-keyword">await</span> getImage(url)))

<span class="hljs-comment">// ==&gt;</span>

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getImage</span> (<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">const</span> res = fetch(url)

  <span class="hljs-keyword">return</span> res.blob()
}

<span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(imgList.map(<span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span> getImage(url)))</code></pre><p>&#x4E0A;&#x4E0B;&#x4E24;&#x79CD;&#x65B9;&#x6848;&#x6548;&#x679C;&#x5B8C;&#x5168;&#x76F8;&#x540C;&#x3002;</p><h3 id="articleHeader10">Express &#x4E0E; koa &#x7684;&#x5347;&#x7EA7;</h3><p>&#x9996;&#x5148;&#xFF0C;<code>Express</code>&#x662F;&#x901A;&#x8FC7;&#x8C03;&#x7528;<code>response.send</code>&#x6765;&#x5B8C;&#x6210;&#x8BF7;&#x6C42;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x7684;&#x3002;<br>&#x6240;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<code>async</code>&#x5173;&#x952E;&#x5B57;&#x66FF;&#x6362;&#x539F;&#x6709;&#x7684;&#x666E;&#x901A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5373;&#x53EF;&#x3002;</p><p>&#x800C;<code>Koa</code>&#x4E5F;&#x5E76;&#x4E0D;&#x662F;&#x8BF4;&#x4F60;&#x5FC5;&#x987B;&#x8981;&#x5347;&#x7EA7;&#x5230;<code>2.x</code>&#x624D;&#x80FD;&#x591F;&#x4F7F;&#x7528;<code>async</code>&#x51FD;&#x6570;&#x3002;<br>&#x5728;<code>Koa1.x</code>&#x4E2D;&#x63A8;&#x8350;&#x7684;&#x662F;<code>generator</code>&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;&#x5176;&#x5185;&#x90E8;&#x662F;&#x8C03;&#x7528;&#x4E86;<code>co</code>&#x6765;&#x5E2E;&#x5FD9;&#x505A;&#x8F6C;&#x6362;&#x7684;&#x3002;<br>&#x800C;&#x770B;&#x8FC7;<code>co</code>&#x6E90;&#x7801;&#x7684;&#x5C0F;&#x4F19;&#x4F34;&#x4E00;&#x5B9A;&#x77E5;&#x9053;&#xFF0C;&#x91CC;&#x8FB9;&#x540C;&#x65F6;&#x5B58;&#x5728;&#x5BF9;&#x4E8E;<code>Promise</code>&#x7684;&#x5904;&#x7406;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4F20;&#x5165;&#x4E00;&#x4E2A;<code>async</code>&#x51FD;&#x6570;&#x5B8C;&#x5168;&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#x3002;</p><p>&#x4F46;&#x662F;<code>1.x</code>&#x7684;&#x8BF7;&#x6C42;&#x4E0A;&#x4E0B;&#x6587;&#x4F7F;&#x7528;&#x7684;&#x662F;<code>this</code>&#xFF0C;&#x800C;<code>2.x</code>&#x5219;&#x662F;&#x4F7F;&#x7528;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;<code>context</code>&#x3002;<br>&#x6240;&#x4EE5;&#x5728;&#x5347;&#x7EA7;&#x4E2D;&#x8FD9;&#x91CC;&#x53EF;&#x80FD;&#x662F;&#x552F;&#x4E00;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x5730;&#x65B9;&#xFF0C;__&#x5728;<code>1.x</code>&#x4E0D;&#x8981;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6765;&#x6CE8;&#x518C;&#x4E2D;&#x95F4;&#x4EF6;__&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// express
express.get(&apos;/&apos;, async (req, res) =&gt; {
  res.send({
    code: 200
  })
})

// koa1.x
router.get(&apos;/&apos;, async function (next) {
  this.body = {
    code: 200
  }
})

// koa2.x
router.get(&apos;/&apos;, async (ctx, next) =&gt; {
  ctx.body = {
    code: 200
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// express</span>
express.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (req, res) =&gt; {
  res.send({
    <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>
  })
})

<span class="hljs-comment">// koa1.x</span>
router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">next</span>) </span>{
  <span class="hljs-keyword">this</span>.body = {
    <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>
  }
})

<span class="hljs-comment">// koa2.x</span>
router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-keyword">async</span> (ctx, next) =&gt; {
  ctx.body = {
    <span class="hljs-attr">code</span>: <span class="hljs-number">200</span>
  }
})</code></pre><h2 id="articleHeader11">&#x5C0F;&#x7ED3;</h2><p>&#x91CD;&#x6784;&#x9879;&#x76EE;&#x662F;&#x4E00;&#x4EF6;&#x5F88;&#x6709;&#x610F;&#x601D;&#x7684;&#x4E8B;&#x513F;&#xFF0C;&#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x4E00;&#x4E9B;&#x6CE8;&#x91CA;&#x6587;&#x6863;&#x90FD;&#x5F88;&#x7F3A;&#x5931;&#x7684;&#x9879;&#x76EE;&#x6765;&#x8BF4;&#xFF0C;&#x91CD;&#x6784;&#x5219;&#x662F;&#x4E00;&#x4EF6;&#x75DB;&#x82E6;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x56E0;&#x4E3A;&#x4F60;&#x9700;&#x8981;&#x4ECE;&#x4EE3;&#x7801;&#x4E2D;&#x83B7;&#x53D6;&#x903B;&#x8F91;&#xFF0C;&#x800C;&#x4F5C;&#x4E3A;&#x52A8;&#x6001;&#x811A;&#x672C;&#x8BED;&#x8A00;&#x7684;<code>JavaScript</code>&#xFF0C;&#x5176;&#x5728;&#x5927;&#x578B;&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x5E76;&#x4E0D;&#x662F;&#x5F88;&#x9AD8;&#x3002;<br>&#x6240;&#x4EE5;&#x5982;&#x679C;&#x6761;&#x4EF6;&#x5141;&#x8BB8;&#xFF0C;&#x8FD8;&#x662F;&#x5EFA;&#x8BAE;&#x9009;&#x62E9;<code>TypeScript</code>&#x4E4B;&#x7C7B;&#x7684;&#x5DE5;&#x5177;&#x6765;&#x5E2E;&#x52A9;&#x66F4;&#x597D;&#x7684;&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
async语法升级踩坑小记

## 原文链接
[https://segmentfault.com/a/1190000016544414](https://segmentfault.com/a/1190000016544414)


---
title: 'mongoDB初阶系列二：node中的增删改查' 
date: 2018-11-20 2:30:10
hidden: true
slug: ig42ank46t
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x4E0A;&#x4E00;&#x7BC7;&#x4E2D;&#xFF08;<a href="https://segmentfault.com/a/1190000015768430">mongoDB&#x521D;&#x9636;&#x7CFB;&#x5217;&#x4E00;&#xFF1A;&#x7528;&#x6237;&#x548C;&#x6743;&#x9650;</a>&#xFF09;&#x4ECB;&#x7ECD;&#x4E86;&#x7528;&#x6237;&#x548C;&#x6743;&#x9650;&#xFF0C;&#x8FD9;&#x4E00;&#x7BC7;&#x5C06;&#x4ECB;&#x7ECD;&#x5982;&#x4F55;&#x5728;node&#x4E2D;&#x8FDB;&#x884C;&#x589E;&#x5220;&#x6539;&#x67E5;&#x3002;</p><h2 id="articleHeader1">&#x51C6;&#x5907;</h2><p>&#x9996;&#x5148;&#xFF0C;&#x8981;&#x5728;node&#x4E2D;&#x4F7F;&#x7528;mongoDB&#xFF0C;&#x9700;&#x8981;&#x5B89;&#x88C5;MongoDB Driver&#xFF0C;&#x547D;&#x4EE4;&#x5982;&#x4E0B;&#xFF1A;<code>npm install mongodb --save</code><br>github&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/mongodb/node-mongodb-native" rel="nofollow noreferrer" target="_blank">node-mongodb-native</a></p><p>&#x540C;&#x65F6;&#xFF0C;&#x8BB0;&#x5F97;&#x5F00;&#x542F;mongoDB&#x670D;&#x52A1;&#x3002;</p><h2 id="articleHeader2">&#x589E;</h2><p>&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x5C06;&#x5728;&#x6570;&#x636E;&#x5E93;demodb&#x4E2D;tasks&#x96C6;&#x5408;&#x91CC;&#x9762;&#x63D2;&#x5165;&#x4E86;&#x4E00;&#x6761;&#x6587;&#x6863;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x4E86;&#x8BE5;&#x6587;&#x6863;&#x7684;id&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MongoClient = require(&apos;mongodb&apos;).MongoClient

const assert = require(&apos;assert&apos;)
const url = &apos;mongodb://localhost:27017&apos;
const dbName = &apos;demodb&apos;

// &#x589E;
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log(&quot;Connected successfully to server&quot;)

  const db = client.db(dbName)
  var tasks = db.collection(&apos;tasks&apos;) // &#x6CA1;&#x6709;&#x5219;&#x521B;&#x5EFA;
  tasks.insertOne(
    {
      &quot;project&quot;: &quot;task1&quot;,
      &quot;description&quot;: &quot;task1 description.&quot;
    },
    {safe: true},
    function(err, documents) {
      if (err) throw err;
      console.log(documents.insertedId);
    }
  );

  client.close()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> MongoClient = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;mongodb&apos;</span>).MongoClient

<span class="hljs-keyword">const</span> assert = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;assert&apos;</span>)
<span class="hljs-keyword">const</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">&apos;mongodb://localhost:27017&apos;</span>
<span class="hljs-keyword">const</span> dbName = <span class="hljs-string">&apos;demodb&apos;</span>

<span class="hljs-comment">// &#x589E;</span>
MongoClient.connect(<span class="hljs-built_in">url</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, client</span>) </span>{
  assert.equal(<span class="hljs-literal">null</span>, err)
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;Connected successfully to server&quot;</span>)

  <span class="hljs-keyword">const</span> db = client.db(dbName)
  <span class="hljs-built_in">var</span> tasks = db.collection(<span class="hljs-string">&apos;tasks&apos;</span>) <span class="hljs-comment">// &#x6CA1;&#x6709;&#x5219;&#x521B;&#x5EFA;</span>
  tasks.insertOne(
    {
      <span class="hljs-string">&quot;project&quot;</span>: <span class="hljs-string">&quot;task1&quot;</span>,
      <span class="hljs-string">&quot;description&quot;</span>: <span class="hljs-string">&quot;task1 description.&quot;</span>
    },
    {<span class="hljs-attribute">safe</span>: <span class="hljs-literal">true</span>},
    <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, documents</span>) </span>{
      <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
      <span class="hljs-built_in">console</span>.log(documents.insertedId);
    }
  );

  client.close()
})</code></pre><p>&#x8FD0;&#x884C;&#x7A0B;&#x5E8F;&#xFF0C;&#x53D1;&#x73B0;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x4E86;&#x5982;&#x4E0B;&#x7ED3;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Connected successfully to server
5b59d53ae3d895184824586b" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vbscript"><code>Connected successfully <span class="hljs-keyword">to</span> <span class="hljs-built_in">server</span>
<span class="hljs-number">5</span>b59d53ae3d895184824586b</code></pre><p>&#x8FD9;&#x4E2A;&#x8FD4;&#x56DE;&#x7684;<code>5b59d53ae3d895184824586b</code>&#x662F;MongoDB&#x7684;&#x6587;&#x6863;&#x6807;&#x8BC6;&#x7B26;&#xFF0C;&#x5B83;&#x662F;&#x552F;&#x4E00;&#x7684;&#xFF0C;&#x5B83;&#x7684;&#x672C;&#x8D28;&#x662F;&#x4E8C;&#x8FDB;&#x5236;JSON&#xFF08;&#x5373;BSON&#xFF09;,BSON&#x662F;MongoDB&#x7528;&#x6765;&#x4EA4;&#x6362;&#x6570;&#x636E;&#x7684;&#x4E3B;&#x8981;&#x6570;&#x636E;&#x683C;&#x5F0F;&#xFF0C;MongoDB&#x670D;&#x52A1;&#x5668;&#x7528;&#x5B83;&#x4EE3;&#x66FF;JSON&#x4EA4;&#x6362;&#x6570;&#x636E;&#x3002;&#x5927;&#x591A;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5B83;&#x66F4;&#x8282;&#x7701;&#x7A7A;&#x95F4;&#xFF0C;&#x89E3;&#x6790;&#x8D77;&#x6765;&#x4E5F;&#x66F4;&#x5FEB;&#x3002;<br>&#x58F0;&#x660E;&#x7684;{safe: true}&#x8868;&#x660E;&#xFF0C;&#x7B49;&#x6570;&#x636E;&#x5E93;&#x64CD;&#x4F5C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#xFF0C;&#x624D;&#x6267;&#x884C;&#x56DE;&#x8C03;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><p><strong>&#x6CE8;&#x610F;</strong>&#xFF1A;&#x8FD9;&#x91CC;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#xFF0C;&#x6CA1;&#x6709;&#x5F00;&#x542F;&#x6388;&#x6743;&#x6A21;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#xFF0C;&#x5728;&#x767B;&#x5F55;url&#x4E2D;&#x4E0D;&#x9700;&#x8981;&#x7528;&#x6237;&#x540D;&#x548C;&#x5BC6;&#x7801;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x767B;&#x5F55;&#x968F;&#x4FBF;&#x8FDB;&#x884C;&#x589E;&#x5220;&#x6539;&#x67E5;&#x3002;&#x4F46;&#x5728;&#x4EA7;&#x54C1;&#x73AF;&#x5883;&#x8BF7;&#x8BB0;&#x5F97;&#x52A1;&#x5FC5;&#x5F00;&#x542F;&#x6388;&#x6743;&#x6A21;&#x5F0F;&#x3002;</p><h2 id="articleHeader3">&#x5220;</h2><p>&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x5C06;&#x5728;&#x6570;&#x636E;&#x5E93;demodb&#x4E2D;tasks&#x96C6;&#x5408;&#x627E;&#x5230;project&#x4E3A;task1&#x7684;&#x8FD9;&#x6761;&#x6587;&#x6863;&#xFF0C;&#x5E76;&#x5220;&#x9664;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5220;
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log(&quot;Connected successfully to server&quot;)

  const db = client.db(dbName)
  var tasks = db.collection(&apos;tasks&apos;)
  tasks.deleteOne(
    {
      &quot;project&quot;: &quot;task1&quot;
    },
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log(&quot;Removed the document&quot;);
    }
  );

  client.close()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// &#x5220;</span>
MongoClient.connect(url, function(<span class="hljs-keyword">err</span>, client) {
  <span class="hljs-keyword">assert</span>.equal(null, <span class="hljs-keyword">err</span>)
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&quot;Connected successfully to server&quot;</span>)

  <span class="hljs-keyword">const</span> <span class="hljs-keyword">db</span> = client.<span class="hljs-keyword">db</span>(dbName)
  <span class="hljs-keyword">var</span> tasks = <span class="hljs-keyword">db</span>.collection(&apos;tasks&apos;)
  tasks.deleteOne(
    {
      <span class="hljs-string">&quot;project&quot;</span>: <span class="hljs-string">&quot;task1&quot;</span>
    },
    function(<span class="hljs-keyword">err</span>, result) {
      <span class="hljs-keyword">assert</span>.equal(<span class="hljs-keyword">err</span>, null);
      <span class="hljs-keyword">assert</span>.equal(1, result.result.<span class="hljs-keyword">n</span>);
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&quot;Removed the document&quot;</span>);
    }
  );

  client.<span class="hljs-keyword">close</span>()
})</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x5982;&#x679C;tasks&#x96C6;&#x5408;&#x4E2D;&#x6709;&#x591A;&#x6761;project&#x4E3A;task1&#x7684;&#x6587;&#x6863;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;&#x4E5F;&#x53EA;&#x4F1A;&#x5220;&#x9664;&#x627E;&#x5230;&#x7684;&#x7B2C;&#x4E00;&#x5929;&#x6587;&#x6863;&#x3002;</p><h2 id="articleHeader4">&#x6539;</h2><p>&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x5C06;&#x5728;&#x6570;&#x636E;&#x5E93;demodb&#x4E2D;tasks&#x96C6;&#x5408;&#x627E;&#x5230;project&#x4E3A;task1&#x7684;&#x8FD9;&#x6761;&#x6587;&#x6863;&#xFF0C;&#x5E76;&#x66F4;&#x65B0;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6539;
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log(&quot;Connected successfully to server&quot;)

  const db = client.db(dbName)
  var tasks = db.collection(&apos;tasks&apos;)
  tasks.updateOne(
    {
      &quot;project&quot;: &quot;task1&quot;
    },
    { $set: { &quot;project&quot; : &quot;task999&quot; } },
    {safe: true},
    function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log(&quot;Updated the document&quot;);
    }
  );

  client.close()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// &#x6539;</span>
MongoClient.connect(url, function(<span class="hljs-keyword">err</span>, client) {
  <span class="hljs-keyword">assert</span>.equal(null, <span class="hljs-keyword">err</span>)
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&quot;Connected successfully to server&quot;</span>)

  <span class="hljs-keyword">const</span> <span class="hljs-keyword">db</span> = client.<span class="hljs-keyword">db</span>(dbName)
  <span class="hljs-keyword">var</span> tasks = <span class="hljs-keyword">db</span>.collection(&apos;tasks&apos;)
  tasks.updateOne(
    {
      <span class="hljs-string">&quot;project&quot;</span>: <span class="hljs-string">&quot;task1&quot;</span>
    },
    { <span class="hljs-variable">$set</span>: { <span class="hljs-string">&quot;project&quot;</span> : <span class="hljs-string">&quot;task999&quot;</span> } },
    {safe: true},
    function(<span class="hljs-keyword">err</span>, result) {
      <span class="hljs-keyword">assert</span>.equal(<span class="hljs-keyword">err</span>, null);
      <span class="hljs-keyword">assert</span>.equal(1, result.result.<span class="hljs-keyword">n</span>);
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&quot;Updated the document&quot;</span>);
    }
  );

  client.<span class="hljs-keyword">close</span>()
})</code></pre><p>&#x6CE8;&#x610F;&#xFF1A;&#x5982;&#x679C;&#x5728;tasks&#x96C6;&#x5408;&#x6CA1;&#x6709;&#x627E;&#x5230;project&#x4E3A;task1&#x7684;&#x6587;&#x6863;&#xFF0C;&#x7A0B;&#x5E8F;&#x5C06;&#x4F1A;&#x629B;&#x51FA;&#x65AD;&#x8A00;&#x9519;&#x8BEF;&#xFF0C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVben4O?w=328&amp;h=104" src="https://static.alili.tech/img/bVben4O?w=328&amp;h=104" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader5">&#x67E5;</h2><p>&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x5C06;&#x5728;&#x6570;&#x636E;&#x5E93;demodb&#x4E2D;tasks&#x96C6;&#x5408;&#x627E;&#x5230;&#x6240;&#x6709;&#x6587;&#x6863;&#xFF0C;&#x5E76;&#x6253;&#x5370;&#x5230;&#x63A7;&#x5236;&#x53F0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x67E5;
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err)
  console.log(&quot;Connected successfully to server&quot;)

  const db = client.db(dbName)
  var tasks = db.collection(&apos;tasks&apos;)
  tasks.find().toArray((err, docs) =&gt; {
    console.log(docs)
    assert.equal(null, err) // err &#x4E0D;&#x7B49;&#x4E8E;null, &#x5219;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;err
    // assert.equal(3, docs.length) // &#x8BB0;&#x5F55;&#x4E0D;&#x7B49;&#x4E8E;3&#x6761;, &#x5219;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x8BB0;&#x5F55;&#x6761;&#x6570;
  })
  client.close()
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// &#x67E5;</span>
MongoClient.connect(url, function(<span class="hljs-keyword">err</span>, client) {
  <span class="hljs-keyword">assert</span>.equal(null, <span class="hljs-keyword">err</span>)
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&quot;Connected successfully to server&quot;</span>)

  <span class="hljs-keyword">const</span> <span class="hljs-keyword">db</span> = client.<span class="hljs-keyword">db</span>(dbName)
  <span class="hljs-keyword">var</span> tasks = <span class="hljs-keyword">db</span>.collection(&apos;tasks&apos;)
  tasks.find().toArray((<span class="hljs-keyword">err</span>, docs) =&gt; {
    console.<span class="hljs-built_in">log</span>(docs)
    <span class="hljs-keyword">assert</span>.equal(null, <span class="hljs-keyword">err</span>) <span class="hljs-comment">// err &#x4E0D;&#x7B49;&#x4E8E;null, &#x5219;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;err</span>
    <span class="hljs-comment">// assert.equal(3, docs.length) // &#x8BB0;&#x5F55;&#x4E0D;&#x7B49;&#x4E8E;3&#x6761;, &#x5219;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x8BB0;&#x5F55;&#x6761;&#x6570;</span>
  })
  client.<span class="hljs-keyword">close</span>()
})</code></pre><p>find()&#x65B9;&#x6CD5;&#x627E;&#x5230;&#x6240;&#x6709;&#x6587;&#x6863;&#xFF0C;toArray()&#x5C06;&#x7ED3;&#x679C;&#x8F6C;&#x6362;&#x6210;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#xFF0C;&#x8FD0;&#x884C;&#x7A0B;&#x5E8F;&#xFF0C;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVben5p?w=347&amp;h=186" src="https://static.alili.tech/img/bVben5p?w=347&amp;h=186" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader6">&#x5C0F;&#x7ED3;</h2><p>&#x867D;&#x7136;&#x4E0A;&#x9762;&#x56DB;&#x4E2A;&#x5C0F;&#x7A0B;&#x5E8F;&#x7565;&#x663E;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x662F;&#x4E0D;&#x79EF;&#x8DEC;&#x6B65;&#xFF0C;&#x65E0;&#x4EE5;&#x81F3;&#x5343;&#x91CC;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x771F;&#x7684;&#x638C;&#x63E1;&#x4E86;&#x57FA;&#x672C;&#x7684;&#x589E;&#x5220;&#x6539;&#x67E5;&#xFF0C;&#x90A3;&#x4E48;&#xFF0C;&#x638C;&#x63E1;&#x590D;&#x6742;&#x7684;&#x5E94;&#x7528;&#x4E5F;&#x53EA;&#x662F;&#x65F6;&#x95F4;&#x95EE;&#x9898;&#x4E86;&#x3002;<br>&#x8FD9;&#x662F;mongo&#x521D;&#x9636;&#x7CFB;&#x5217;&#x7684;&#x7B2C;&#x4E8C;&#x7BC7;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x8FD8;&#x6709;&#x7B2C;&#x4E09;&#x7BC7;&#xFF0C;&#x501F;&#x52A9;mongoose&#xFF0C;&#x66F4;&#x4F18;&#x96C5;&#x5730;&#x64CD;&#x4F5C;&#x6570;&#x636E;&#x3002;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mongoDB初阶系列二：node中的增删改查

## 原文链接
[https://segmentfault.com/a/1190000015783314](https://segmentfault.com/a/1190000015783314)


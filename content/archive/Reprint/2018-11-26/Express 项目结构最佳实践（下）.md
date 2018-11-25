---
title: 'Express 项目结构最佳实践（下）' 
date: 2018-11-26 2:30:10
hidden: true
slug: boracad61n
categories: [reprint]
---

{{< raw >}}
<p>Models &#x662F;&#x4F60;&#x4E0E;&#x4F60;&#x7684;&#x6570;&#x636E;&#x5E93;&#x4EA4;&#x4E92;&#x7684;&#x4E00;&#x4E9B;&#x6587;&#x4EF6;&#x3002;&#x5B83;&#x4EEC;&#x5305;&#x542B;&#x4E86;&#x4F60;&#x5904;&#x7406;&#x4F60;&#x7684;&#x6570;&#x636E;&#x7684;&#x6240;&#x6709;&#x65B9;&#x6CD5;&#x548C;&#x529F;&#x80FD;&#x3002;&#x5B83;&#x4EEC;&#x4E0D;&#x4EC5;&#x4EC5;&#x5305;&#x542B;&#x4E86;&#x521B;&#x5EFA;&#x3001;&#x8BFB;&#x53D6;&#x3001;&#x66F4;&#x65B0;&#x548C;&#x5220;&#x9664;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD8;&#x5305;&#x542B;&#x4E86;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x4E00;&#x4E2A; car model&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x6709;&#x4E00;&#x4E2A; mountTyres &#x65B9;&#x6CD5;&#x3002;</p><p>&#x5728;&#x4F60;&#x7684;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#xFF0C;&#x9488;&#x5BF9;&#x6BCF;&#x79CD;&#x7C7B;&#x578B;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x4F60;&#x5E94;&#x8BE5;&#x521B;&#x5EFA;&#x81F3;&#x5C11;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6709; users &#x548C; comments&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x6709; user model &#x548C; comment model&#x3002;&#x6709;&#x65F6;&#x5019;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A; model &#x6587;&#x4EF6;&#x5F88;&#x5927;&#xFF0C;&#x66F4;&#x597D;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x57FA;&#x4E8E;&#x5185;&#x90E8;&#x7684;&#x903B;&#x8F91;&#x5C06;&#x8FD9;&#x4E2A; model &#x6587;&#x4EF6;&#x5206;&#x6210;&#x597D;&#x51E0;&#x4E2A;&#x6587;&#x4EF6;&#x3002;</p><p>&#x4F60;&#x5E94;&#x8BE5;&#x8BA9;&#x4F60;&#x7684; models &#x72EC;&#x7ACB;&#x4E8E;&#x5916;&#x90E8;&#x3002;models &#x4E4B;&#x95F4;&#x4E0D;&#x5E94;&#x8BE5;&#x76F8;&#x4E92;&#x5F15;&#x7528;&#x3002;&#x5B83;&#x4EEC;&#x4E0D;&#x9700;&#x8981;&#x77E5;&#x9053;&#x54EA;&#x4E2A; controller &#x8C03;&#x7528;&#x5B83;&#x4EEC;&#x3002;&#x5B83;&#x4EEC;&#x6C38;&#x8FDC;&#x4E0D;&#x8981;&#x63A5;&#x6536; request &#x6216; reponse &#x5BF9;&#x8C61;&#xFF0C;&#x5B83;&#x4EEC;&#x6C38;&#x8FDC;&#x4E0D;&#x8981;&#x8FD4;&#x56DE; http &#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x4EEC;&#x5E94;&#x8BE5;&#x8FD4;&#x56DE; model &#x7684;&#x9519;&#x8BEF;&#x3002;</p><p>&#x6240;&#x6709;&#x7684;&#x8FD9;&#x4E9B;&#x5C06;&#x4F1A;&#x4F7F;&#x4F60;&#x7684; models &#x66F4;&#x597D;&#x7EF4;&#x62A4;&#x3002;&#x56E0;&#x4E3A;&#x5B83;&#x4EEC;&#x662F;&#x72EC;&#x7ACB;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x5F88;&#x597D;&#x5730;&#x6D4B;&#x8BD5;&#x5B83;&#x4EEC;&#x3002;Models &#x53EF;&#x4EE5;&#x79FB;&#x52A8;&#x5230;&#x4EFB;&#x4F55;&#x9700;&#x8981;&#x7528;&#x5230;&#x5B83;&#x7684;&#x5730;&#x65B9;&#x3002;&#x6539;&#x53D8;&#x4E00;&#x4E2A; model&#xFF0C;&#x4E0D;&#x4F1A;&#x5E94;&#x8BE5;&#x5176;&#x4ED6;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x662F;&#x72EC;&#x7ACB;&#x7684;&#x3002;</p><p>&#x57FA;&#x4E8E;&#x4E0A;&#x9762;&#x63D0;&#x7684;&#x7684;&#x70B9;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x6211;&#x4EEC;&#x4F8B;&#x5B50;&#x4E2D;&#x7684; model&#x3002;&#x4E0B;&#x9762;&#x662F; comment model&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var db = require(&apos;../db&apos;)

// Create new comment in your database and return its id
// &#x5728;&#x4F60;&#x7684;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x521B;&#x5EFA;&#x4E00;&#x6761;&#x65B0;&#x7684; comment 
exports.create = function(user, text, cb) {
  var comment = {
    user: user,
    text: text,
    date: new Date().toString()
  }

  db.save(comment, cb)
}

// Get a particular comment
exports.get = function(id, cb) {
  db.fetch({id:id}, function(err, docs) {
    if (err) return cb(err)
    cb(null, docs[0])
  })
}

// Get all comments
exports.all = function(cb) {
  db.fetch({}, cb)
}

// Get all comments by a particular user
exports.allByUser = function(user, cb) {
  db.fetch({user: user}, cb)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code>var db = require(&apos;../db&apos;)

// <span class="hljs-keyword">Create</span> <span class="hljs-keyword">new</span> <span class="hljs-keyword">comment</span> <span class="hljs-keyword">in</span> your <span class="hljs-keyword">database</span> <span class="hljs-keyword">and</span> <span class="hljs-keyword">return</span> its <span class="hljs-keyword">id</span>
// &#x5728;&#x4F60;&#x7684;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x521B;&#x5EFA;&#x4E00;&#x6761;&#x65B0;&#x7684; <span class="hljs-keyword">comment</span> 
exports.create = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">user</span>, <span class="hljs-built_in">text</span>, cb) {
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">comment</span> = {
    <span class="hljs-keyword">user</span>: <span class="hljs-keyword">user</span>,
    <span class="hljs-built_in">text</span>: <span class="hljs-built_in">text</span>,
    <span class="hljs-built_in">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toString()
  }

  db.save(<span class="hljs-keyword">comment</span>, cb)
}

// <span class="hljs-keyword">Get</span> a particular <span class="hljs-keyword">comment</span>
exports.get = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">id</span>, cb) {
  db.fetch({<span class="hljs-keyword">id</span>:<span class="hljs-keyword">id</span>}, <span class="hljs-keyword">function</span>(err, docs) {
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(err)
    cb(<span class="hljs-literal">null</span>, docs[<span class="hljs-number">0</span>])
  })
}

// <span class="hljs-keyword">Get</span> all comments
exports.all = <span class="hljs-keyword">function</span>(cb) {
  db.fetch({}, cb)
}

// <span class="hljs-keyword">Get</span> all comments <span class="hljs-keyword">by</span> a particular <span class="hljs-keyword">user</span>
exports.allByUser = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">user</span>, cb) {
  db.fetch({<span class="hljs-keyword">user</span>: <span class="hljs-keyword">user</span>}, cb)
}</code></pre><p>user model &#x6CA1;&#x6709;&#x5305;&#x542B;&#x8FDB;&#x6765;&#x3002;comment model &#x4E0D;&#x5173;&#x5FC3;&#x5B83;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x5B83;&#x4EC5;&#x4EC5;&#x5173;&#x5FC3;&#x5B83;&#x600E;&#x4E48;&#x5B58;&#x50A8;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var db = require(&apos;../db&apos;)
  , crypto = require(&apos;crypto&apos;)

hash = function(password) {
  return crypto.createHash(&apos;sha1&apos;).update(password).digest(&apos;base64&apos;)
}

exports.create = function(name, email, password, cb) {
  var user = {
    name: name,
    email: email,
    password: hash(password),
  }

  db.save(user, cb)
}

exports.get = function(id, cb) {
  db.fetch({id:id}, function(err, docs) {
    if (err) return cb(err)
    cb(null, docs[0])
  })
}

exports.authenticate = function(email, password) {
  db.fetch({email:email}, function(err, docs) {
    if (err) return cb(err)
    if (docs.length === 0) return cb()

    user = docs[0]

    if (user.password === hash(password)) {
      cb(null, docs[0])
    } else {
      cb()
    }
  })
}

exports.changePassword = function(id, password, cb) {
  db.update({id:id}, {password: hash(password)}, function(err, affected) {
    if (err) return cb(err)
    cb(null, affected &gt; 0)
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> db = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../db&apos;</span>)
  , crypto = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;crypto&apos;</span>)

hash = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">password</span>) </span>{
  <span class="hljs-keyword">return</span> crypto.createHash(<span class="hljs-string">&apos;sha1&apos;</span>).update(password).digest(<span class="hljs-string">&apos;base64&apos;</span>)
}

exports.create = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, email, password, cb</span>) </span>{
  <span class="hljs-keyword">var</span> user = {
    <span class="hljs-attr">name</span>: name,
    <span class="hljs-attr">email</span>: email,
    <span class="hljs-attr">password</span>: hash(password),
  }

  db.save(user, cb)
}

exports.get = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id, cb</span>) </span>{
  db.fetch({<span class="hljs-attr">id</span>:id}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, docs</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(err)
    cb(<span class="hljs-literal">null</span>, docs[<span class="hljs-number">0</span>])
  })
}

exports.authenticate = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">email, password</span>) </span>{
  db.fetch({<span class="hljs-attr">email</span>:email}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, docs</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(err)
    <span class="hljs-keyword">if</span> (docs.length === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> cb()

    user = docs[<span class="hljs-number">0</span>]

    <span class="hljs-keyword">if</span> (user.password === hash(password)) {
      cb(<span class="hljs-literal">null</span>, docs[<span class="hljs-number">0</span>])
    } <span class="hljs-keyword">else</span> {
      cb()
    }
  })
}

exports.changePassword = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id, password, cb</span>) </span>{
  db.update({<span class="hljs-attr">id</span>:id}, {<span class="hljs-attr">password</span>: hash(password)}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, affected</span>) </span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">return</span> cb(err)
    cb(<span class="hljs-literal">null</span>, affected &gt; <span class="hljs-number">0</span>)
  })
}</code></pre><p>&#x9664;&#x4E86;&#x521B;&#x5EFA;&#x548C;&#x7BA1;&#x7406;&#x7528;&#x6237;&#x6240;&#x9700;&#x8981;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x5916;&#xFF0C;&#x90A3;&#x8FD8;&#x6709;&#x7528;&#x4E8E;&#x7528;&#x6237;&#x8EAB;&#x4EFD;&#x9A8C;&#x8BC1;&#x548C;&#x5BC6;&#x7801;&#x7BA1;&#x7406;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x518D;&#x4E00;&#x6B21;&#x7684;&#xFF0C;&#x8FD9;&#x4E2A; model &#x4E0D;&#x77E5;&#x9053;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x5176;&#x4ED6;&#x7684; model&#x3001;controller &#x6216;&#x8005;&#x5E94;&#x7528;&#x7684;&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x3002;</p><h2 id="articleHeader0">Views</h2><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x5305;&#x542B;&#x4E86;&#x4F60;&#x5E94;&#x7528;&#x6240;&#x6709;&#x9700;&#x8981;&#x6E32;&#x67D3;&#x7684;&#x6A21;&#x677F;&#x3002;&#x901A;&#x5E38;&#xFF0C;&#x56E2;&#x961F;&#x4E2D;&#x7684;&#x8BBE;&#x8BA1;&#x5E08;&#x4F1A;&#x5728;&#x8FD9;&#x91CC;&#x5DE5;&#x4F5C;&#x3002;</p><p>&#x4F60;&#x60F3;&#x6BCF;&#x4E00;&#x4E2A; controllers &#x6240;&#x5BF9;&#x5E94;&#x7684;&#x6A21;&#x677F;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x5B50;&#x6587;&#x4EF6;&#x5939;&#x3002;&#x8FD9;&#x6837;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x5C06;&#x4F1A;&#x4E3A;&#x76F8;&#x540C;&#x7684;&#x4EFB;&#x52A1;&#x7EC4;&#x5408;&#x6A21;&#x677F;&#x3002;</p><p>&#x9009;&#x62E9;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x8BED;&#x8A00;&#x4F1A;&#x8BA9;&#x4EBA;&#x56F0;&#x60D1;&#xFF0C;&#x56E0;&#x4E3A;&#x6709;&#x5F88;&#x591A;&#x7684;&#x9009;&#x62E9;&#x3002;&#x6211;&#x4EEC;&#x6700;&#x559C;&#x6B22;&#x7684;&#x6A21;&#x677F;&#x8BED;&#x8A00;&#xFF0C;&#x662F; Jade &#x548C; Mustache&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x76F4;&#x5728;&#x7528;&#x3002;Jade &#x5F88;&#x9002;&#x5408;&#x751F;&#x6210; html &#x9875;&#x9762;&#x3002;&#x5B83;&#x4F7F;&#x5F97;&#x5199; html &#x6807;&#x7B7E;&#x66F4;&#x77ED;&#x548C;&#x66F4;&#x52A0;&#x53EF;&#x8BFB;&#x3002;&#x9488;&#x5BF9;&#x4E8E;&#x6761;&#x4EF6;&#x548C;&#x8FED;&#x4EE3;&#xFF0C;&#x5B83;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; JavaScript&#x3002;Mustache &#x5728;&#x53E6;&#x5916;&#x4E00;&#x65B9;&#x9762;&#xFF0C;&#x4E13;&#x6CE8;&#x4E8E;&#x6E32;&#x67D3;&#x5404;&#x79CD;&#x5404;&#x6837;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x5C3D;&#x53EF;&#x80FD;&#x5C11;&#x7684;&#x903B;&#x8F91;&#x8FD0;&#x7B97;&#x7B26;&#x5E76;&#x4E14;&#x5904;&#x7406;&#x6570;&#x636E;&#x7684;&#x65B9;&#x6CD5;&#x5F88;&#x5C11;&#x3002;&#x8FD9;&#x4F7F;&#x5F97;&#x5B83;&#x975E;&#x5E38;&#x9002;&#x5408;&#x7F16;&#x5199;&#x975E;&#x5E38;&#x5E72;&#x51C0;&#x7684;&#x6A21;&#x677F;&#xFF0C;&#x8FD9;&#x4E9B;&#x6A21;&#x677F;&#x4E13;&#x6CE8;&#x4E8E;&#x663E;&#x793A;&#x4F60;&#x7684;&#x6570;&#x636E;&#x800C;&#x4E0D;&#x662F;&#x5904;&#x7406;&#x6570;&#x636E;&#x3002;</p><p>&#x5199;&#x597D;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#x662F;&#x907F;&#x514D;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x505A;&#x4EFB;&#x4F55;&#x5904;&#x7406;&#x3002;&#x5982;&#x679C;&#x4F60;&#x7684;&#x6570;&#x636E;&#x9700;&#x8981;&#x5728;&#x663E;&#x793A;&#x4E4B;&#x524D;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;&#x5728;&#x4F60;&#x7684; controller &#x4E2D;&#x5904;&#x7406;&#x3002;&#x4E5F;&#x8981;&#x907F;&#x514D;&#x6DFB;&#x52A0;&#x592A;&#x591A;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x8FD9;&#x4E2A;&#x903B;&#x8F91;&#x53EF;&#x4EE5;&#x88AB;&#x79FB;&#x81F3; controller&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="doctype html
html
  head
    title Your comment web app
  body
    h1 Welcome and leave your comment
    each comment in comments
      article.Comment
        .Comment-date= comment.date
        .Comment-text= comment.text" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>doctype <span class="hljs-selector-tag">html</span>
<span class="hljs-selector-tag">html</span>
  head
    title Your comment web app
  <span class="hljs-selector-tag">body</span>
    <span class="hljs-selector-tag">h1</span> Welcome and leave your comment
    each comment <span class="hljs-keyword">in</span> comments
      <span class="hljs-selector-tag">article</span><span class="hljs-selector-class">.Comment</span>
        .Comment-date= comment<span class="hljs-selector-class">.date</span>
        .Comment-text= comment.text</code></pre><p>&#x5982;&#x4F60;&#x6240;&#x89C1;&#xFF0C;&#x5728;&#x6E32;&#x67D3;&#x8FD9;&#x4E2A;&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x6570;&#x636E;&#x9884;&#x8BA1;&#x5DF2;&#x7ECF;&#x88AB;&#x5904;&#x7406;&#x597D;&#x4E86;&#x3002;</p><h2 id="articleHeader1">Controllers</h2><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x4F60;&#x5C06;&#x4F1A;&#x5B9A;&#x4E49;&#x4F60;&#x5E94;&#x7528;&#x6240;&#x6709;&#x7684;&#x8DEF;&#x7531;&#x5728;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x3002;&#x4F60;&#x7684; controllers &#x5C06;&#x4F1A;&#x5904;&#x7406; web &#x8BF7;&#x6C42;&#xFF0C;&#x5C06;&#x6A21;&#x677F;&#x63D0;&#x4F9B;&#x7ED9;&#x7528;&#x6237;&#xFF0C;&#x5E76;&#x4E14;&#x548C;&#x4F60;&#x7684; models &#x8FDB;&#x884C;&#x4EA4;&#x4E92;&#xFF0C;&#x4EE5;&#x5904;&#x7406;&#x548C;&#x68C0;&#x7D22;&#x6570;&#x636E;&#x3002;&#x8FD9;&#x662F;&#x80F6;&#x6C34;&#xFF0C;&#x80FD;&#x591F;&#x8FDE;&#x63A5;&#x548C;&#x63A7;&#x5236;&#x4F60;&#x7684; web &#x5E94;&#x7528;&#x3002;</p><p>&#x901A;&#x5E38;&#xFF0C;&#x5BF9;&#x4E8E;&#x4F60;&#x5E94;&#x7528;&#x4E2D;&#x7684;&#x6BCF;&#x4E00;&#x4E2A;&#x903B;&#x8F91;&#x90E8;&#x5206;&#xFF0C;&#x4F60;&#x81F3;&#x5C11;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x3002;&#x4F8B;&#x5982;&#xFF0C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5904;&#x7406;&#x8BC4;&#x8BBA;&#xFF0C;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5904;&#x7406;&#x5173;&#x4E8E;&#x7528;&#x6237;&#x7684;&#x8BF7;&#x6C42;&#x7B49;&#x7B49;&#x3002;&#x6765;&#x81EA;&#x540C;&#x4E00;&#x4E2A; controller &#x7684;&#x6240;&#x6709;&#x8DEF;&#x7531;&#x90FD;&#x6709;&#x76F8;&#x540C;&#x7684;&#x524D;&#x7F00;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x597D;&#x7684;&#x5B9E;&#x8DF5;&#x3002;&#x4F8B;&#x5982; /comments/all &#x548C; /comments/new&#x3002;</p><p>&#x6709;&#x65F6;&#x5019;&#x5F88;&#x96BE;&#x51B3;&#x5B9A;&#x4EC0;&#x4E48;&#x5E94;&#x8BE5;&#x8FDB;&#x5165; controller&#xFF0C;&#x4EC0;&#x4E48;&#x5E94;&#x8BE5;&#x8FDB;&#x5165; model&#x3002;&#x4E00;&#x4E2A;&#x6700;&#x597D;&#x7684;&#x5B9E;&#x8DF5;&#x662F;&#x5E94;&#x8BE5;&#x6C38;&#x8FDC;&#x4E0D;&#x4F1A;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x6570;&#x636E;&#x5E93;&#x3002;&#x5B83;&#x6C38;&#x8FDC;&#x4E0D;&#x5E94;&#x8BE5;&#x8C03;&#x7528; write,update,fetch &#x8FD9;&#x4E9B;&#x6570;&#x636E;&#x5E93;&#x63D0;&#x4F9B;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;&#x5E94;&#x8BE5;&#x4F9D;&#x9760; model &#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x4F8B;&#x5982;&#x5982;&#x679C;&#x4F60;&#x6709;&#x4E00;&#x4E2A; car model&#xFF0C;&#x4F60;&#x60F3;&#x8981;&#x628A; 4 &#x4E2A;&#x8F6E;&#x5B50;&#x5B89;&#x88C5;&#x5230;&#x8FD9;&#x4E2A; car &#x4E0A;&#xFF0C;controller &#x4E0D;&#x4F1A;&#x8C03;&#x7528; db.update(id, { wheels: 4 })&#xFF0C;&#x800C;&#x662F;&#x4F1A;&#x8C03;&#x7528;&#x50CF; car.mountwheels(id, 4) &#x8FD9;&#x6837;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x8D1F;&#x8D23;&#x8BC4;&#x8BBA;&#x7684; controller&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;)
  , router = express.Router()
  , Comment = require(&apos;../models/comment&apos;)
  , auth = require(&apos;../middlewares/auth&apos;)

router.post(&apos;/&apos;, auth, function(req, res) {
  user = req.user.id
  text = req.body.text

  Comment.create(user, text, function (err, comment) {
    res.redirect(&apos;/&apos;)
  })
})

router.get(&apos;/:id&apos;, function(req, res) {
  Comment.get(req.params.id, function (err, comment) {
    res.render(&apos;comments/comment&apos;, {comment: comment})
  })
})

module.exports = router" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>)
  , router = express.Router()
  , Comment = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../models/comment&apos;</span>)
  , auth = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../middlewares/auth&apos;</span>)

router.post(<span class="hljs-string">&apos;/&apos;</span>, auth, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  user = req.user.id
  text = req.body.text

  Comment.create(user, text, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, comment</span>) </span>{
    res.redirect(<span class="hljs-string">&apos;/&apos;</span>)
  })
})

router.get(<span class="hljs-string">&apos;/:id&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  Comment.get(req.params.id, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, comment</span>) </span>{
    res.render(<span class="hljs-string">&apos;comments/comment&apos;</span>, {<span class="hljs-attr">comment</span>: comment})
  })
})

<span class="hljs-built_in">module</span>.exports = router</code></pre><p>&#x5728; controller &#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x4E5F;&#x6709;&#x4E00;&#x4E2A; index.js &#x6587;&#x4EF6;&#x5939;&#x3002;&#x5B83;&#x7684;&#x76EE;&#x7684;&#x662F;&#x52A0;&#x8F7D;&#x6240;&#x6709;&#x5176;&#x4ED6;&#x7684; controllers&#xFF0C;&#x548C;&#x53EF;&#x80FD;&#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x6CA1;&#x6709;&#x76F8;&#x540C;&#x524D;&#x7F00;&#x7684;&#x8DEF;&#x5F84;&#xFF0C;&#x4F8B;&#x5982; home &#x9875;&#x9762;&#x8DEF;&#x7531;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;)
  , router = express.Router()
  , Comment = require(&apos;../models/comment&apos;)

router.use(&apos;/comments&apos;, require(&apos;./comments&apos;))
router.use(&apos;/users&apos;, require(&apos;./users&apos;))

// &#x4E0E; comments &#x548C; users &#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;home &#x9875;&#x9762;&#x4E0D;&#x9700;&#x8981;&#x524D;&#x7F00;&#xFF08;comments &#x6216; users&#xFF09;
router.get(&apos;/&apos;, function(req, res) {
  Comments.all(function(err, comments) {
    res.render(&apos;index&apos;, {comments: comments})
  })
})

module.exports = router" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>)
  , router = express.Router()
  , Comment = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;../models/comment&apos;</span>)

router.<span class="hljs-keyword">use</span>(<span class="hljs-string">&apos;/comments&apos;</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;./comments&apos;</span>))
router.<span class="hljs-keyword">use</span>(<span class="hljs-string">&apos;/users&apos;</span>, <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;./users&apos;</span>))

<span class="hljs-comment">// &#x4E0E; comments &#x548C; users &#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;home &#x9875;&#x9762;&#x4E0D;&#x9700;&#x8981;&#x524D;&#x7F00;&#xFF08;comments &#x6216; users&#xFF09;</span>
router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
  Comments.all(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, comments)</span> </span>{
    res.render(<span class="hljs-string">&apos;index&apos;</span>, {comments: comments})
  })
})

module.exports = router</code></pre><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5C06;&#x4F1A;&#x5904;&#x7406;&#x4F60;&#x6240;&#x6709;&#x7684;&#x8DEF;&#x7531;&#x3002;&#x4F60;&#x7684;&#x5E94;&#x7528;&#x5728;&#x542F;&#x52A8;&#x7684;&#x5FC5;&#x987B;&#x52A0;&#x8F7D;&#x7684;&#x552F;&#x4E00;&#x7684;&#x8DEF;&#x7531;&#x5668;&#x3002;</p><h2 id="articleHeader2">Middlewares</h2><p>&#x5728;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#xFF0C;&#x4F60;&#x5C06;&#x4F1A;&#x5B58;&#x50A8;&#x6240;&#x6709;&#x4F60; Express &#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x76EE;&#x7684;&#x662F;&#x4E3A;&#x4E86;&#x63D0;&#x53D6;&#x5E38;&#x89C1;&#x7684; controller &#x4EE3;&#x7801;&#xFF0C;&#x5B83;&#x5C06;&#x4F1A;&#x5728;&#x591A;&#x4E2A;&#x8BF7;&#x6C42;&#x4E2D;&#x6267;&#x884C;&#xFF0C;&#x5E76;&#x4E14;&#x901A;&#x5E38;&#x4F1A;&#x4FEE;&#x6539; &#x8BF7;&#x6C42;/&#x54CD;&#x5E94; &#x5BF9;&#x8C61;&#x3002;</p><p>&#x5C31;&#x50CF;&#x4E00;&#x4E2A; controller&#xFF0C;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x6C38;&#x8FDC;&#x4E0D;&#x5E94;&#x8BE5;&#x8BBF;&#x95EE;&#x6570;&#x636E;&#x5E93;&#xFF0C;&#x76F8;&#x53CD;&#xFF0C;&#x5BF9;&#x4E8E;&#x5B83;&#x8981;&#x5B8C;&#x6210;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x4EFB;&#x52A1;&#xFF0C;&#x5B83;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x4F60;&#x7684; models&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A; users &#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x6765;&#x81EA; middlewares/users.js &#x6587;&#x4EF6;&#x3002;&#x5B83;&#x7684;&#x76EE;&#x7684;&#x662F;&#x52A0;&#x8F7D;&#x53D1;&#x51FA;&#x8BF7;&#x6C42;&#x7684;&#x7528;&#x6237;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="User = require(&apos;../models/user&apos;)

module.exports = function(req, res, next) {
  if (req.session &amp;&amp; req.session.user) {
    User.get(req.session.user, function(err, user) {
      if (user) {
        req.user = user
      } else {
        delete req.user
        delete req.session.user
      }

      next()
    })
  } else {
    next()
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>User = require(<span class="hljs-string">&apos;../models/user&apos;</span>)

module<span class="hljs-selector-class">.exports</span> = function(req, res, next) {
  <span class="hljs-keyword">if</span> (req<span class="hljs-selector-class">.session</span> &amp;&amp; req<span class="hljs-selector-class">.session</span><span class="hljs-selector-class">.user</span>) {
    User.get(req<span class="hljs-selector-class">.session</span><span class="hljs-selector-class">.user</span>, function(err, user) {
      <span class="hljs-keyword">if</span> (user) {
        req<span class="hljs-selector-class">.user</span> = user
      } <span class="hljs-keyword">else</span> {
        delete req<span class="hljs-selector-class">.user</span>
        delete req<span class="hljs-selector-class">.session</span><span class="hljs-selector-class">.user</span>
      }

      next()
    })
  } <span class="hljs-keyword">else</span> {
    next()
  }
}</code></pre><p>&#x8FD9;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x4F7F;&#x7528; user model&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x8BBF;&#x95EE;&#x6570;&#x636E;&#x5E93;&#x3002;</p><p>&#x4E0B;&#x4E00;&#x6B65;&#xFF0C;authorization &#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5F53;&#x4F60;&#x60F3;&#x8981;&#x963B;&#x6B62;&#x6CA1;&#x6709;&#x6743;&#x9650;&#x8BBF;&#x95EE;&#x76F8;&#x540C;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(req, res, next) {
  if (req.user) {
    next()
  } else {
    res.status(401).end()
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs fortran"><code><span class="hljs-keyword">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span></span> {
  <span class="hljs-keyword">if</span> (req.user) {
    next()
  } <span class="hljs-keyword">else</span> {
    res.<span class="hljs-keyword">status</span>(<span class="hljs-number">401</span>).<span class="hljs-keyword">end</span>()
  }
}</code></pre><p>&#x5B83;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x5916;&#x90E8;&#x7684;&#x4F9D;&#x8D56;&#x3002;&#x5982;&#x679C;&#x4F60;&#x770B;&#x770B;&#x4E0A;&#x9762;&#x7684; controllers &#x6587;&#x4EF6;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#x5982;&#x4F55;&#x5B83;&#x662F;&#x5982;&#x4F55;&#x5E94;&#x7528;&#x7684;&#x3002;</p><h2 id="articleHeader3">Helpers</h2><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x5305;&#x542B;&#x5B9E;&#x7528;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x4E9B;&#x4EE3;&#x7801;&#x88AB;&#x7528;&#x5728;&#x591A;&#x4E2A; models&#xFF0C;middlewares &#x6216;&#x8005; controllers &#x4E2D;&#xFF0C;&#x4F46;&#x662F; helpers &#x4E0D;&#x5C5E;&#x4E8E; models&#xFF0C;middlewares &#x6216; controllers &#x7684;&#x8303;&#x7574;&#x3002;&#x901A;&#x5E38;&#xFF0C;&#x4F60;&#x5BF9;&#x4E0D;&#x540C;&#x7684;&#x5E38;&#x89C1;&#x4EFB;&#x52A1;&#xFF0C;&#x4F1A;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x6587;&#x4EF6;&#x3002;</p><p>&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#x5C31;&#x662F; helper &#x6587;&#x4EF6;&#x63D0;&#x4F9B;&#x4E00;&#x4E9B;&#x65B9;&#x6CD5;&#x6765;&#x7BA1;&#x7406;&#x65E5;&#x671F;&#x548C;&#x65F6;&#x95F4;&#x3002;</p><h2 id="articleHeader4">Public</h2><p>&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x4EF6;&#x53EA;&#x662F;&#x63D0;&#x4F9B;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x3002;&#x901A;&#x5E38;&#xFF0C;&#x5B83;&#x4F1A;&#x6709;&#x5B50;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x50CF; css&#xFF0C;libs&#xFF0C;img &#x7528;&#x4E8E; css &#x6837;&#x5F0F;&#xFF0C;&#x56FE;&#x7247;&#x548C; JavaScript &#x5E93;&#x5C31;&#x50CF; jQuery&#x3002;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5939;&#x80FD;&#x591F;&#x63D0;&#x4F9B;&#x670D;&#x52A1;&#x7684;&#x6700;&#x597D;&#x5B9E;&#x8DF5;&#x4E0D;&#x662F;&#x901A;&#x8FC7;&#x4F60;&#x7684;&#x5E94;&#x7528;&#xFF0C;&#x800C;&#x662F;&#x901A;&#x8FC7;&#x4E00;&#x4E2A; Nginx &#x6216;&#x8005; Apache &#x670D;&#x52A1;&#xFF0C;&#x5B83;&#x4EEC;&#x6BD4;&#x8D77; Node &#x5728;&#x9759;&#x6001;&#x6587;&#x4EF6;&#x7684;&#x670D;&#x52A1;&#x66F4;&#x597D;&#x3002;</p><h2 id="articleHeader5">Tests</h2><p>&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x90FD;&#x9700;&#x8981;&#x6D4B;&#x8BD5;&#xFF0C;&#x5E76;&#x4E14;&#x4F60;&#x9700;&#x8981;&#x5C06;&#x6240;&#x6709;&#x7684;&#x6D4B;&#x8BD5;&#x805A;&#x96C6;&#x5230;&#x4E00;&#x8D77;&#x3002;&#x4E3A;&#x4E86;&#x5E2E;&#x52A9;&#x7BA1;&#x7406;&#x5B83;&#x4EEC;&#xFF0C;&#x4F60;&#x5C06;&#x5B83;&#x4EEC;&#x5206;&#x79BB;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x5B50;&#x6587;&#x4EF6;&#x4E2D;&#x3002;</p><ul><li>controllers</li><li>helpers</li><li>models</li><li>middlewares</li><li>integration</li><li>ui</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Express 项目结构最佳实践（下）

## 原文链接
[https://segmentfault.com/a/1190000015367777](https://segmentfault.com/a/1190000015367777)


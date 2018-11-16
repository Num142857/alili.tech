---
title: node中的session
hidden: true
categories: [reprint]
slug: ba4e67f4
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5728;&#x4E0A;&#x4E00;&#x7BC7;&#x4E2D;<a href="https://segmentfault.com/a/1190000016376558">node&#x4E2D;&#x7684;cookie</a>&#xFF0C;&#x5BF9;cookie&#x8FDB;&#x884C;&#x4E86;&#x76F8;&#x5173;&#x4ECB;&#x7ECD;&#xFF0C;&#x672C;&#x7BC7;&#x5C06;&#x7EE7;&#x7EED;&#x524D;&#x884C;&#xFF0C;&#x5BF9;session&#x8FDB;&#x884C;&#x8BF4;&#x660E;&#x3002;</p><h2 id="articleHeader1">session&#x662F;&#x4EC0;&#x4E48;</h2><p>session&#x4E0D;&#x5C31;&#x662F;&#x4F1A;&#x8BDD;&#x561B;&#xFF0C;&#x90A3;&#x4EC0;&#x4E48;&#x662F;&#x4F1A;&#x8BDD;&#x5462;&#xFF1F;<br>&#x4F1A;&#x8BDD;&#x662F;&#x4E00;&#x4E2A;&#x6BD4;&#x8FDE;&#x63A5;&#x7C92;&#x5EA6;&#x66F4;&#x5927;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x4E00;&#x6B21;<code>&#x4F1A;&#x8BDD;</code>&#x53EF;&#x80FD;&#x5305;&#x542B;&#x591A;&#x6B21;<code>&#x8FDE;&#x63A5;</code>&#xFF0C;&#x6BCF;&#x6B21;&#x8FDE;&#x63A5;&#x90FD;&#x88AB;&#x8BA4;&#x4E3A;&#x662F;&#x4F1A;&#x8BDD;&#x7684;&#x4E00;&#x6B21;&#x64CD;&#x4F5C;&#x3002;<br>&#x5F53;&#x7528;&#x6237;&#x5728;Web&#x9875;&#x9762;&#x4E4B;&#x95F4;&#x8DF3;&#x8F6C;&#x65F6;&#xFF0C;&#x5B58;&#x50A8;&#x5728; Session &#x5BF9;&#x8C61;&#x4E2D;&#x7684;&#x53D8;&#x91CF;&#x5C06;&#x4E0D;&#x4F1A;&#x4E22;&#x5931;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x6574;&#x4E2A;&#x7528;&#x6237;&#x4F1A;&#x8BDD;&#x4E2D;&#x4E00;&#x76F4;&#x5B58;&#x5728;&#x4E0B;&#x53BB;&#x3002;<br>&#x5F53;&#x7528;&#x6237;&#x8BF7;&#x6C42;&#x6765;&#x81EA;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684; Web &#x9875;&#x9762;&#x65F6;&#xFF0C;&#x5982;&#x679C;&#x8BE5;&#x7528;&#x6237;&#x8FD8;&#x6CA1;&#x6709;&#x4F1A;&#x8BDD;&#xFF0C;&#x5219; Web &#x670D;&#x52A1;&#x5668;&#x5C06;&#x81EA;&#x52A8;&#x521B;&#x5EFA;&#x4E00;&#x4E2A; Session &#x5BF9;&#x8C61;&#x3002;&#x5F53;&#x4F1A;&#x8BDD;&#x8FC7;&#x671F;&#x6216;&#x88AB;&#x653E;&#x5F03;&#x540E;&#xFF0C;&#x670D;&#x52A1;&#x5668;&#x5C06;&#x7EC8;&#x6B62;&#x8BE5;&#x4F1A;&#x8BDD;&#x3002;</p><p>&#x8BF4;&#x4E86;&#x8FD9;&#x4E48;&#x591A;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x8FD9;&#x8D27;&#x5427;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgSv2?w=333&amp;h=182" src="https://static.alili.tech/img/bVbgSv2?w=333&amp;h=182" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x539F;&#x6765;session&#x4E2D;&#x95F4;&#x4EF6;&#x751F;&#x6210;&#x7684;session&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x91CC;&#x9762;&#x5305;&#x542B;&#x4E86;cookie&#x4FE1;&#x606F;&#x3002;</p><h2 id="articleHeader2">node&#x4E2D;&#x7684;session</h2><p>&#x9996;&#x5148;&#xFF0C;&#x5B89;&#x88C5;express&#x6846;&#x67B6;&#xFF0C;cookieParser&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;express-session&#x4E2D;&#x95F4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i express --save
npm i cookie-parser --save
npm i express-session --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> express --save
npm <span class="hljs-selector-tag">i</span> cookie-parser --save
npm <span class="hljs-selector-tag">i</span> express-session --save</code></pre><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;Express&#x4F1A;&#x8BDD;&#x4E2D;&#x95F4;&#x4EF6;&#x662F;&#x628A;session&#x4FE1;&#x606F;&#x5B58;&#x50A8;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x4E14;&#x9700;&#x8981;&#x7528;<code>&#x7B7E;&#x540D;cookie</code>&#xFF0C;&#x6240;&#x4EE5;&#x5728;&#x4F7F;cookieParser()&#x65F6;&#x5F97;&#x7ED9;&#x5B83;&#x4F20;&#x7ED9;&#x4E00;&#x4E2A;<code>&#x79D8;&#x94A5;</code>&#x3002;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x79D8;&#x94A5;&#xFF0C;&#x5219;&#x4F1A;&#x63D0;&#x9192; <code>Error: secret option required for sessions</code></p><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;);
var cookieParser = require(&apos;cookie-parser&apos;);
var session = require(&apos;express-session&apos;);

var app = express()
app.use(cookieParser())

const hour = 1000 * 60 * 60;
var sessionOpts = {
  // &#x8BBE;&#x7F6E;&#x5BC6;&#x94A5;
  secret: &apos;a cool secret&apos;,
  // Forces the session to be saved back to the session store
  resave: true,
  // Forces a session that is &quot;uninitialized&quot; to be saved to the store.
  saveUninitialized: true,
  // &#x8BBE;&#x7F6E;&#x4F1A;&#x8BDD;cookie&#x540D;, &#x9ED8;&#x8BA4;&#x662F;connect.sid
  key: &apos;myapp_sid&apos;,
  // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
  cookie: { maxAge: hour * 2, secure: false }
}
app.use(session(sessionOpts))

app.use(function(req, res, next) {
  if (req.url === &apos;/favicon.ico&apos;) {
    return
  }

  // &#x540C;&#x4E00;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x800C;&#x8A00;&#xFF0C;req&#x662F;&#x540C;&#x4E00;&#x4E2A;
  var sess = req.session;
  console.log(sess)

  if (sess.views) {
    sess.views++;
  } else {
    sess.views = 1;
  }
  res.setHeader(&apos;Content-Type&apos;, &apos;text/html&apos;);
  res.write(&apos;&lt;p&gt;views: &apos; + sess.views + &apos;&lt;/p&gt;&apos;);
  res.end();
});

app.listen(4000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> cookieParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;cookie-parser&apos;</span>);
<span class="hljs-keyword">var</span> session = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express-session&apos;</span>);

<span class="hljs-keyword">var</span> app = express()
app.<span class="hljs-keyword">use</span>(cookieParser())

<span class="hljs-keyword">const</span> hour = <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>;
<span class="hljs-keyword">var</span> sessionOpts = {
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5BC6;&#x94A5;</span>
  secret: <span class="hljs-string">&apos;a cool secret&apos;</span>,
  <span class="hljs-comment">// Forces the session to be saved back to the session store</span>
  resave: <span class="hljs-keyword">true</span>,
  <span class="hljs-comment">// Forces a session that is &quot;uninitialized&quot; to be saved to the store.</span>
  saveUninitialized: <span class="hljs-keyword">true</span>,
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4F1A;&#x8BDD;cookie&#x540D;, &#x9ED8;&#x8BA4;&#x662F;connect.sid</span>
  key: <span class="hljs-string">&apos;myapp_sid&apos;</span>,
  <span class="hljs-comment">// If secure is set to true, and you access your site over HTTP, the cookie will not be set.</span>
  cookie: { maxAge: hour * <span class="hljs-number">2</span>, secure: <span class="hljs-keyword">false</span> }
}
app.<span class="hljs-keyword">use</span>(session(sessionOpts))

app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span> </span>{
  <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">&apos;/favicon.ico&apos;</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// &#x540C;&#x4E00;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x800C;&#x8A00;&#xFF0C;req&#x662F;&#x540C;&#x4E00;&#x4E2A;</span>
  <span class="hljs-keyword">var</span> sess = req.session;
  console.log(sess)

  <span class="hljs-keyword">if</span> (sess.views) {
    sess.views++;
  } <span class="hljs-keyword">else</span> {
    sess.views = <span class="hljs-number">1</span>;
  }
  res.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/html&apos;</span>);
  res.write(<span class="hljs-string">&apos;&lt;p&gt;views: &apos;</span> + sess.views + <span class="hljs-string">&apos;&lt;/p&gt;&apos;</span>);
  res.end();
});

app.listen(<span class="hljs-number">4000</span>);</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;<code>&#x9875;&#x9762;&#x6D4F;&#x89C8;&#x8BA1;&#x6570;</code>&#x529F;&#x80FD;&#x3002;<br>&#x8FD0;&#x884C;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x6253;&#x5F00;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x4E0D;&#x65AD;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x89C2;&#x5BDF;node&#x7A0B;&#x5E8F;&#x4E2D;&#x6253;&#x5370;&#x7684;sess&#x503C;&#x3002;<br>&#x6211;&#x4EEC;&#x53D1;&#x73B0;&#xFF0C;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x5237;&#x65B0;&#x9875;&#x9762;&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x4E0A;&#x6253;&#x5370;&#x7684;&#x662F;&#x540C;&#x4E00;&#x4E2A;session&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x5176;&#x4E2D;&#x7684;views&#x7684;&#x503C;&#x53D8;&#x4E86;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x591A;&#x6B21;http&#x8FDE;&#x63A5;&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x4F1A;&#x8BDD;&#x3002;</p><h2 id="articleHeader3">session&#x5B58;&#x5165;redis</h2><p>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;Express&#x4F1A;&#x8BDD;&#x4E2D;&#x95F4;&#x4EF6;&#x662F;&#x628A;session&#x4FE1;&#x606F;&#x5B58;&#x50A8;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x4F46;&#x5728;&#x5F00;&#x53D1;&#x548C;&#x751F;&#x4EA7;&#x671F;&#x95F4;&#xFF0C;&#x6700;&#x597D;&#x6709;&#x4E00;&#x4E2A;&#x6301;&#x4E45;&#x5316;&#x7684;&#x3001;&#x53EF;&#x6269;&#x5C55;&#x7684;&#x6570;&#x636E;&#x5B58;&#x653E;&#x4F60;&#x7684;&#x4F1A;&#x8BDD;&#x6570;&#x636E;&#x3002;express&#x793E;&#x533A;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x4E86;&#x51E0;&#x4E2A;&#x4F7F;&#x7528;&#x6570;&#x636E;&#x5E93;&#x7684;&#x4F1A;&#x8BDD;&#x5B58;&#x50A8;&#xFF0C;&#x5305;&#x62EC;MongoDB&#x3001;Redis&#x3001;Memcached&#x3001;PostgreSQL&#x4EE5;&#x53CA;&#x5176;&#x4ED6;&#x6570;&#x636E;&#x5E93;&#x3002;&#x4F46;&#x4F4E;&#x5EF6;&#x8FDF;&#x7684;<code>&#x952E;/&#x503C;&#x5B58;&#x50A8;</code>&#x6700;&#x9002;&#x5408;&#x8FD9;&#x79CD;&#x6613;&#x5931;&#x6027;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5148;&#x7528;redis&#x6765;&#x5B58;&#x50A8;session&#x4FE1;&#x606F;&#x3002;</p><p>&#x9996;&#x5148;&#xFF0C;&#x5B89;&#x88C5;connect-redis&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i connect-redis --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> connect-redis --save</code></pre><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;);
var cookieParser = require(&apos;cookie-parser&apos;);
var session = require(&apos;express-session&apos;);

var RedisStore = require(&apos;connect-redis&apos;)(session);

var app = express()
app.use(cookieParser())

var options = {
  host: &apos;127.0.0.1&apos;,
  port: 6379,
  db: 1, // Database index to use. Defaults to Redis&apos;s default (0).
  prefix: &apos;ID:&apos; // Key prefix defaulting to &quot;sess:&quot;
  // pass: &apos;aaa&apos; // Password for Redis authentication
}

const hour = 1000 * 60 * 60;
var sessionOpts = {
  store: new RedisStore(options),
  // &#x8BBE;&#x7F6E;&#x5BC6;&#x94A5;
  secret: &apos;a cool secret&apos;,
  // Forces the session to be saved back to the session store
  resave: true,
  // Forces a session that is &quot;uninitialized&quot; to be saved to the store.
  saveUninitialized: true,
  // &#x8BBE;&#x7F6E;&#x4F1A;&#x8BDD;cookie&#x540D;
  key: &apos;myapp_sid&apos;,
  // If secure is set to true, and you access your site over HTTP, the cookie will not be set.
  cookie: { maxAge: hour * 8, secure: false }
}
app.use(session(sessionOpts)) // &#x5982;&#x679C;&#x6CA1;&#x6709;secret&#xFF0C;&#x4F1A;&#x63D0;&#x9192; Error: secret option required for sessions

app.use(function(req, res, next) {
  if (req.url === &apos;/favicon.ico&apos;) {
    return
  }

  var sess = req.session;
  var id = req.sessionID; // session ID, &#x53EA;&#x8BFB;
  console.log(sess, id);

  if (sess.views) {
    sess.views++; // &#x5982;&#x679C;&#x653E;&#x5728;res.end()&#x540E;&#xFF0C;&#x4E0D;&#x4F1A;&#x81EA;&#x589E;
    res.setHeader(&apos;Content-Type&apos;, &apos;text/html&apos;);
    res.write(&apos;&lt;p&gt;views: &apos; + sess.views + &apos;&lt;/p&gt;&apos;);
    res.write(&apos;&lt;p&gt;expires in: &apos; + (sess.cookie.maxAge / 1000) + &apos;s&lt;/p&gt;&apos;);
    res.end();
  } else {
    sess.views = 1;
    res.end(&apos;welcome to the session demo. refresh!&apos;);
  }
});

app.listen(4000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> cookieParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;cookie-parser&apos;</span>);
<span class="hljs-keyword">var</span> session = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express-session&apos;</span>);

<span class="hljs-keyword">var</span> RedisStore = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;connect-redis&apos;</span>)(session);

<span class="hljs-keyword">var</span> app = express()
app.<span class="hljs-keyword">use</span>(cookieParser())

<span class="hljs-keyword">var</span> options = {
  host: <span class="hljs-string">&apos;127.0.0.1&apos;</span>,
  port: <span class="hljs-number">6379</span>,
  db: <span class="hljs-number">1</span>, <span class="hljs-comment">// Database index to use. Defaults to Redis&apos;s default (0).</span>
  prefix: <span class="hljs-string">&apos;ID:&apos;</span> <span class="hljs-comment">// Key prefix defaulting to &quot;sess:&quot;</span>
  <span class="hljs-comment">// pass: &apos;aaa&apos; // Password for Redis authentication</span>
}

<span class="hljs-keyword">const</span> hour = <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>;
<span class="hljs-keyword">var</span> sessionOpts = {
  store: <span class="hljs-keyword">new</span> RedisStore(options),
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x5BC6;&#x94A5;</span>
  secret: <span class="hljs-string">&apos;a cool secret&apos;</span>,
  <span class="hljs-comment">// Forces the session to be saved back to the session store</span>
  resave: <span class="hljs-keyword">true</span>,
  <span class="hljs-comment">// Forces a session that is &quot;uninitialized&quot; to be saved to the store.</span>
  saveUninitialized: <span class="hljs-keyword">true</span>,
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4F1A;&#x8BDD;cookie&#x540D;</span>
  key: <span class="hljs-string">&apos;myapp_sid&apos;</span>,
  <span class="hljs-comment">// If secure is set to true, and you access your site over HTTP, the cookie will not be set.</span>
  cookie: { maxAge: hour * <span class="hljs-number">8</span>, secure: <span class="hljs-keyword">false</span> }
}
app.<span class="hljs-keyword">use</span>(session(sessionOpts)) <span class="hljs-comment">// &#x5982;&#x679C;&#x6CA1;&#x6709;secret&#xFF0C;&#x4F1A;&#x63D0;&#x9192; Error: secret option required for sessions</span>

app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span> </span>{
  <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">&apos;/favicon.ico&apos;</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-keyword">var</span> sess = req.session;
  <span class="hljs-keyword">var</span> id = req.sessionID; <span class="hljs-comment">// session ID, &#x53EA;&#x8BFB;</span>
  console.log(sess, id);

  <span class="hljs-keyword">if</span> (sess.views) {
    sess.views++; <span class="hljs-comment">// &#x5982;&#x679C;&#x653E;&#x5728;res.end()&#x540E;&#xFF0C;&#x4E0D;&#x4F1A;&#x81EA;&#x589E;</span>
    res.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/html&apos;</span>);
    res.write(<span class="hljs-string">&apos;&lt;p&gt;views: &apos;</span> + sess.views + <span class="hljs-string">&apos;&lt;/p&gt;&apos;</span>);
    res.write(<span class="hljs-string">&apos;&lt;p&gt;expires in: &apos;</span> + (sess.cookie.maxAge / <span class="hljs-number">1000</span>) + <span class="hljs-string">&apos;s&lt;/p&gt;&apos;</span>);
    res.end();
  } <span class="hljs-keyword">else</span> {
    sess.views = <span class="hljs-number">1</span>;
    res.end(<span class="hljs-string">&apos;welcome to the session demo. refresh!&apos;</span>);
  }
});

app.listen(<span class="hljs-number">4000</span>);</code></pre><p>&#x4E0A;&#x9762;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF0C;&#x5C06;&#x4F1A;&#x8BDD;&#x4FE1;&#x606F;&#x5B58;&#x5165;&#x4E86;redis&#x7684;db1&#x6570;&#x636E;&#x5E93;&#x4E2D;&#xFF0C;&#x8FD0;&#x884C;&#x540E;&#xFF0C;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbgSA0?w=411&amp;h=246" src="https://static.alili.tech/img/bVbgSA0?w=411&amp;h=246" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader4">session&#x5B58;&#x5165;mongoDb</h2><p>&#x9996;&#x5148;&#xFF0C;&#x5F97;&#x5B89;&#x88C5;connect-mongo&#x6A21;&#x5757;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i connect-mongo --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> connect-mongo --save</code></pre><p>&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;);
var cookieParser = require(&apos;cookie-parser&apos;);
var session = require(&apos;express-session&apos;);

var MongoStore = require(&apos;connect-mongo&apos;)(session);
const hour = 1000 * 60 * 60

var app = express()
app.use(cookieParser())
app.use(session({
  secret: &apos;a cool secret&apos;,
  key: &apos;mongo_sid&apos;,
  cookie: { maxAge: hour * 8, secure: false },
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: &apos;mongodb://@localhost:27017/demodb&apos;
  })
}));

app.use(function(req, res, next) {
  if (req.url === &apos;/favicon.ico&apos;) {
    return
  }

  var sess = req.session;
  var id = req.sessionID; // session ID, &#x53EA;&#x8BFB;
  console.log(sess, id);

  if (sess.views) {
    sess.views++;
  } else {
    sess.views = 1;
  }

  res.setHeader(&apos;Content-Type&apos;, &apos;text/html&apos;);
  res.write(&apos;&lt;p&gt;views: &apos; + sess.views + &apos;&lt;/p&gt;&apos;);
  res.write(&apos;&lt;p&gt;expires in: &apos; + (sess.cookie.maxAge / 1000) + &apos;s&lt;/p&gt;&apos;);
  res.write(&apos;&lt;p&gt;httpOnly: &apos; + sess.cookie.httpOnly + &apos;&lt;/p&gt;&apos;);
  res.write(&apos;&lt;p&gt;path: &apos; + sess.cookie.path + &apos;&lt;/p&gt;&apos;);
  res.write(&apos;&lt;p&gt;secure: &apos; + sess.cookie.secure + &apos;&lt;/p&gt;&apos;);
  res.end();
});

app.listen(4000);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> cookieParser = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;cookie-parser&apos;</span>);
<span class="hljs-keyword">var</span> session = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;express-session&apos;</span>);

<span class="hljs-keyword">var</span> MongoStore = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;connect-mongo&apos;</span>)(session);
<span class="hljs-keyword">const</span> hour = <span class="hljs-number">1000</span> * <span class="hljs-number">60</span> * <span class="hljs-number">60</span>

<span class="hljs-keyword">var</span> app = express()
app.<span class="hljs-keyword">use</span>(cookieParser())
app.<span class="hljs-keyword">use</span>(session({
  secret: <span class="hljs-string">&apos;a cool secret&apos;</span>,
  key: <span class="hljs-string">&apos;mongo_sid&apos;</span>,
  cookie: { maxAge: hour * <span class="hljs-number">8</span>, secure: <span class="hljs-keyword">false</span> },
  resave: <span class="hljs-keyword">true</span>,
  saveUninitialized: <span class="hljs-keyword">true</span>,
  store: <span class="hljs-keyword">new</span> MongoStore({
    url: <span class="hljs-string">&apos;mongodb://@localhost:27017/demodb&apos;</span>
  })
}));

app.<span class="hljs-keyword">use</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res, next)</span> </span>{
  <span class="hljs-keyword">if</span> (req.url === <span class="hljs-string">&apos;/favicon.ico&apos;</span>) {
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-keyword">var</span> sess = req.session;
  <span class="hljs-keyword">var</span> id = req.sessionID; <span class="hljs-comment">// session ID, &#x53EA;&#x8BFB;</span>
  console.log(sess, id);

  <span class="hljs-keyword">if</span> (sess.views) {
    sess.views++;
  } <span class="hljs-keyword">else</span> {
    sess.views = <span class="hljs-number">1</span>;
  }

  res.setHeader(<span class="hljs-string">&apos;Content-Type&apos;</span>, <span class="hljs-string">&apos;text/html&apos;</span>);
  res.write(<span class="hljs-string">&apos;&lt;p&gt;views: &apos;</span> + sess.views + <span class="hljs-string">&apos;&lt;/p&gt;&apos;</span>);
  res.write(<span class="hljs-string">&apos;&lt;p&gt;expires in: &apos;</span> + (sess.cookie.maxAge / <span class="hljs-number">1000</span>) + <span class="hljs-string">&apos;s&lt;/p&gt;&apos;</span>);
  res.write(<span class="hljs-string">&apos;&lt;p&gt;httpOnly: &apos;</span> + sess.cookie.httpOnly + <span class="hljs-string">&apos;&lt;/p&gt;&apos;</span>);
  res.write(<span class="hljs-string">&apos;&lt;p&gt;path: &apos;</span> + sess.cookie.path + <span class="hljs-string">&apos;&lt;/p&gt;&apos;</span>);
  res.write(<span class="hljs-string">&apos;&lt;p&gt;secure: &apos;</span> + sess.cookie.secure + <span class="hljs-string">&apos;&lt;/p&gt;&apos;</span>);
  res.end();
});

app.listen(<span class="hljs-number">4000</span>);</code></pre><p>&#x8FD0;&#x884C;&#x540E;&#xFF0C;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#x9875;&#x9762;&#xFF0C;&#x5728;demodb&#x6570;&#x636E;&#x5E93;&#x4E2D;&#x7684;sessions&#x96C6;&#x5408;&#x4E2D;&#x53D1;&#x73B0;&#x5DF2;&#x7ECF;&#x5B58;&#x5165;&#x4E86;&#x5982;&#x4E0B;session&#x4FE1;&#x606F;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbgUb4?w=530&amp;h=54" src="https://static.alili.tech/img/bVbgUb4?w=530&amp;h=54" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x4EBA;&#x95EE;&#xFF1A;&#x7ED3;&#x679C;&#x662F;&#x770B;&#x5230;&#x4E86;&#xFF0C;&#x4F46;&#x8FD9;&#x8FC7;&#x7A0B;&#x4E2D;&#x5230;&#x5E95;&#x53D1;&#x751F;&#x4E86;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;<br>&#x5176;&#x5B9E;&#xFF0C;&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#x53D1;&#x8D77;&#x7B2C;&#x4E00;&#x6B21;&#x8BF7;&#x6C42;&#x65F6;&#xFF0C;session&#x4E2D;&#x95F4;&#x4EF6;&#x4F1A;&#x751F;&#x6210;&#x4E00;&#x4E2A;<code>session&#x5BF9;&#x8C61;</code>&#xFF08;&#x5176;&#x4E2D;&#x5305;&#x542B;cookie&#x4FE1;&#x606F;&#xFF09;&#xFF0C;&#x8FD9;&#x4E2A;session&#x5BF9;&#x8C61;&#x4F1A;&#x5B58;&#x5165;mongoDb&#x6570;&#x636E;&#x5E93;&#x4E2D;&#xFF0C;&#x540C;&#x65F6;&#xFF0C;&#x8BF7;&#x6C42;&#x8FD4;&#x56DE;&#x65F6;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5BA2;&#x6237;&#x7AEF;&#x4F1A;&#x81EA;&#x52A8;&#x5C06;&#x8FD9;&#x4E2A;session&#x5BF9;&#x8C61;&#x4E2D;&#x7684;cookie&#x4FDD;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x6CE8;&#x610F;&#x54E6;&#xFF0C;&#x6D4F;&#x89C8;&#x5668;&#x5B58;&#x7684;&#x53EF;&#x662F;cookie&#xFF0C;&#x800C;&#x4E0D;&#x662F;session&#x5BF9;&#x8C61;&#x3002;<br>&#x8FD9;&#x4E2A;cookie&#x6709;&#x4E00;&#x4E2A;&#x8FC7;&#x671F;&#x65F6;&#x95F4;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#x8BBE;&#x7F6E;&#x7684;&#x662F;8&#x5C0F;&#x65F6;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;8&#x5C0F;&#x65F6;&#x540E;&#xFF0C;&#x8FD9;&#x4E2A;cookie&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x4E2D;&#x4F1A;&#x81EA;&#x52A8;&#x6D88;&#x5931;&#x3002;</p><h2 id="articleHeader5">&#x6700;&#x540E;</h2><p>&#x73B0;&#x5728;&#xFF0C;&#x4F60;&#x5F04;&#x6E05;&#x695A;session&#x548C;cookie&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x4E86;&#x5417;&#xFF1F;&#x4E0B;&#x4E00;&#x7BC7;&#x6211;&#x5C06;&#x5BF9;<code>node&#x4E2D;&#x7684;&#x5BC6;&#x7801;&#x5B89;&#x5168;</code>&#x8FDB;&#x884C;&#x4ECB;&#x7ECD;&#xFF0C;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#x54E6;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node中的session

## 原文链接
[https://segmentfault.com/a/1190000016390062](https://segmentfault.com/a/1190000016390062)


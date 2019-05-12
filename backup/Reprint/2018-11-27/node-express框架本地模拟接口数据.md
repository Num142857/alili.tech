---
title: 'node-express框架本地模拟接口数据' 
date: 2018-11-27 2:30:12
hidden: true
slug: 5we7m8cwh4k
categories: [reprint]
---

{{< raw >}}
<p>GitHub&#x9879;&#x76EE;&#x5730;&#x5740;&#xFF1A;<a>git@github.com:zhangying2345/simuLocDataVue.git</a></p><h2 id="articleHeader0">&#x80CC;&#x666F;&#x77E5;&#x8BC6;</h2><h2 id="articleHeader1">&#x7B80;&#x5355;&#x7684;express&#x8DEF;&#x7531;</h2><p>&#x8DEF;&#x7531;&#x662F;&#x6307;&#x5982;&#x4F55;&#x5B9A;&#x4E49;&#x5E94;&#x7528;&#x7684;&#x7AEF;&#x70B9;&#xFF08;URIs&#xFF09;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x54CD;&#x5E94;&#x5BA2;&#x6237;&#x7AEF;&#x7684;&#x8BF7;&#x6C42;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5339;&#x914D;&#x6839;&#x8DEF;&#x5F84;&#x7684;&#x8BF7;&#x6C42;
app.get(&apos;/&apos;, function (req, res) {
  res.send(&apos;root&apos;);
});

// &#x5339;&#x914D; /about &#x8DEF;&#x5F84;&#x7684;&#x8BF7;&#x6C42;
app.get(&apos;/about&apos;, function (req, res) {
  res.send(&apos;about&apos;);
});

// &#x5339;&#x914D; /random.text &#x8DEF;&#x5F84;&#x7684;&#x8BF7;&#x6C42;
app.get(&apos;/random.text&apos;, function (req, res) {
  res.send(&apos;random.text&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x5339;&#x914D;&#x6839;&#x8DEF;&#x5F84;&#x7684;&#x8BF7;&#x6C42;</span>
app.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  res.send(<span class="hljs-string">&apos;root&apos;</span>);
});

<span class="hljs-comment">// &#x5339;&#x914D; /about &#x8DEF;&#x5F84;&#x7684;&#x8BF7;&#x6C42;</span>
app.get(<span class="hljs-string">&apos;/about&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  res.send(<span class="hljs-string">&apos;about&apos;</span>);
});

<span class="hljs-comment">// &#x5339;&#x914D; /random.text &#x8DEF;&#x5F84;&#x7684;&#x8BF7;&#x6C42;</span>
app.get(<span class="hljs-string">&apos;/random.text&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(req, res)</span> </span>{
  res.send(<span class="hljs-string">&apos;random.text&apos;</span>);
});</code></pre><p>&#x4ECE;&#x672C;&#x8D28;&#x4E0A;&#x6765;&#x8BF4;&#xFF0C;&#x4E00;&#x4E2A; Express &#x5E94;&#x7528;&#x5C31;&#x662F;&#x5728;&#x8C03;&#x7528;&#x5404;&#x79CD;&#x4E2D;&#x95F4;&#x4EF6;&#x3002;<br>&#x4E2D;&#x95F4;&#x4EF6;&#xFF08;Middleware&#xFF09; &#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x8BF7;&#x6C42;&#x5BF9;&#x8C61;&#xFF08;request object (req)&#xFF09;, &#x54CD;&#x5E94;&#x5BF9;&#x8C61;&#xFF08;response object (res)&#xFF09;, &#x548C; web &#x5E94;&#x7528;&#x4E2D;&#x5904;&#x4E8E;&#x8BF7;&#x6C42;-&#x54CD;&#x5E94;&#x5FAA;&#x73AF;&#x6D41;&#x7A0B;&#x4E2D;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4E00;&#x822C;&#x88AB;&#x547D;&#x540D;&#x4E3A; next &#x7684;&#x53D8;&#x91CF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = express();

// &#x6CA1;&#x6709;&#x6302;&#x8F7D;&#x8DEF;&#x5F84;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5E94;&#x7528;&#x7684;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8BE5;&#x4E2D;&#x95F4;&#x4EF6;
app.use(function (req, res, next) {
  console.log(&apos;Time:&apos;, Date.now());
  next();
});

// &#x6302;&#x8F7D;&#x81F3; /user/:id &#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4EFB;&#x4F55;&#x6307;&#x5411; /user/:id &#x7684;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x5B83;
app.use(&apos;/user/:id&apos;, function (req, res, next) {
  console.log(&apos;Request Type:&apos;, req.method);
  next();
});

// &#x8DEF;&#x7531;&#x548C;&#x53E5;&#x67C4;&#x51FD;&#x6570;(&#x4E2D;&#x95F4;&#x4EF6;&#x7CFB;&#x7EDF;)&#xFF0C;&#x5904;&#x7406;&#x6307;&#x5411; /user/:id &#x7684; GET &#x8BF7;&#x6C42;
app.get(&apos;/user/:id&apos;, function (req, res, next) {
  res.send(&apos;USER&apos;);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> app = express();

<span class="hljs-comment">// &#x6CA1;&#x6709;&#x6302;&#x8F7D;&#x8DEF;&#x5F84;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5E94;&#x7528;&#x7684;&#x6BCF;&#x4E2A;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x8BE5;&#x4E2D;&#x95F4;&#x4EF6;</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Time:&apos;</span>, <span class="hljs-built_in">Date</span>.now());
  next();
});

<span class="hljs-comment">// &#x6302;&#x8F7D;&#x81F3; /user/:id &#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x4EFB;&#x4F55;&#x6307;&#x5411; /user/:id &#x7684;&#x8BF7;&#x6C42;&#x90FD;&#x4F1A;&#x6267;&#x884C;&#x5B83;</span>
app.use(<span class="hljs-string">&apos;/user/:id&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Request Type:&apos;</span>, req.method);
  next();
});

<span class="hljs-comment">// &#x8DEF;&#x7531;&#x548C;&#x53E5;&#x67C4;&#x51FD;&#x6570;(&#x4E2D;&#x95F4;&#x4EF6;&#x7CFB;&#x7EDF;)&#xFF0C;&#x5904;&#x7406;&#x6307;&#x5411; /user/:id &#x7684; GET &#x8BF7;&#x6C42;</span>
app.get(<span class="hljs-string">&apos;/user/:id&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  res.send(<span class="hljs-string">&apos;USER&apos;</span>);
});</code></pre><h2 id="articleHeader2">express.Router</h2><p>&#x53EF;&#x4F7F;&#x7528; express.Router &#x7C7B;&#x521B;&#x5EFA;&#x6A21;&#x5757;&#x5316;&#x3001;&#x53EF;&#x6302;&#x8F7D;&#x7684;&#x8DEF;&#x7531;&#x53E5;&#x67C4;&#x3002;Router &#x5B9E;&#x4F8B;&#x662F;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;&#x548C;&#x8DEF;&#x7531;&#x7CFB;&#x7EDF;&#xFF0C;&#x56E0;&#x6B64;&#x5E38;&#x79F0;&#x5176;&#x4E3A;&#x4E00;&#x4E2A; &#x201C;mini-app&#x201D;&#x3002;</p><p>&#x4E0B;&#x9762;&#x7684;&#x5B9E;&#x4F8B;&#x7A0B;&#x5E8F;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x6A21;&#x5757;&#xFF0C;&#x5E76;&#x52A0;&#x8F7D;&#x4E86;&#x4E00;&#x4E2A;&#x4E2D;&#x95F4;&#x4EF6;&#xFF0C;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E9B;&#x8DEF;&#x7531;&#xFF0C;&#x5E76;&#x4E14;&#x5C06;&#x5B83;&#x4EEC;&#x6302;&#x8F7D;&#x81F3;&#x5E94;&#x7528;&#x7684;&#x8DEF;&#x5F84;&#x4E0A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var express = require(&apos;express&apos;);
var router = express.Router();

// &#x8BE5;&#x8DEF;&#x7531;&#x4F7F;&#x7528;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;
router.use(function timeLog(req, res, next) {
  console.log(&apos;Time: &apos;, Date.now());
  next();
});
// &#x5B9A;&#x4E49;&#x7F51;&#x7AD9;&#x4E3B;&#x9875;&#x7684;&#x8DEF;&#x7531;
router.get(&apos;/&apos;, function(req, res) {
  res.send(&apos;Birds home page&apos;);
});
// &#x5B9A;&#x4E49; about &#x9875;&#x9762;&#x7684;&#x8DEF;&#x7531;
router.get(&apos;/about&apos;, function(req, res) {
  res.send(&apos;About birds&apos;);
});

module.exports = router;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>);
<span class="hljs-keyword">var</span> router = express.Router();

<span class="hljs-comment">// &#x8BE5;&#x8DEF;&#x7531;&#x4F7F;&#x7528;&#x7684;&#x4E2D;&#x95F4;&#x4EF6;</span>
router.use(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeLog</span>(<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Time: &apos;</span>, <span class="hljs-built_in">Date</span>.now());
  next();
});
<span class="hljs-comment">// &#x5B9A;&#x4E49;&#x7F51;&#x7AD9;&#x4E3B;&#x9875;&#x7684;&#x8DEF;&#x7531;</span>
router.get(<span class="hljs-string">&apos;/&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">&apos;Birds home page&apos;</span>);
});
<span class="hljs-comment">// &#x5B9A;&#x4E49; about &#x9875;&#x9762;&#x7684;&#x8DEF;&#x7531;</span>
router.get(<span class="hljs-string">&apos;/about&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  res.send(<span class="hljs-string">&apos;About birds&apos;</span>);
});

<span class="hljs-built_in">module</span>.exports = router;</code></pre><p>&#x7136;&#x540E;&#x5728;&#x5E94;&#x7528;&#x4E2D;&#x52A0;&#x8F7D;&#x8DEF;&#x7531;&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var birds = require(&apos;./birds&apos;);
...
app.use(&apos;/birds&apos;, birds);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> birds = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;./birds&apos;</span>);
<span class="hljs-params">...</span>
app.use(<span class="hljs-string">&apos;/birds&apos;</span>, birds);</code></pre><p>&#x5E94;&#x7528;&#x5373;&#x53EF;&#x5904;&#x7406;&#x53D1;&#x81EA; /birds &#x548C; /birds/about &#x7684;&#x8BF7;&#x6C42;&#xFF0C;&#x5E76;&#x4E14;&#x8C03;&#x7528;&#x4E3A;&#x8BE5;&#x8DEF;&#x7531;&#x6307;&#x5B9A;&#x7684; timeLog &#x4E2D;&#x95F4;&#x4EF6;&#x3002;</p><h2 id="articleHeader3">webpack-dev-server</h2><p>webpack-dev-server &#x4E3A;&#x4F60;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; web &#x670D;&#x52A1;&#x5668;&#xFF0C;&#x5E76;&#x4E14;&#x80FD;&#x591F;&#x5B9E;&#x65F6;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;(live reloading)&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&apos;path&apos;);
  const HtmlWebpackPlugin = require(&apos;html-webpack-plugin&apos;);
  const CleanWebpackPlugin = require(&apos;clean-webpack-plugin&apos;);

  module.exports = {
    entry: {
      app: &apos;./src/index.js&apos;,
      print: &apos;./src/print.js&apos;
    },
    devtool: &apos;inline-source-map&apos;,
 +   devServer: {
 +     contentBase: &apos;./dist&apos;
 +   },
    plugins: [
      new CleanWebpackPlugin([&apos;dist&apos;]),
      new HtmlWebpackPlugin({
        title: &apos;Development&apos;
      })
    ],
    output: {
      filename: &apos;[name].bundle.js&apos;,
      path: path.resolve(__dirname, &apos;dist&apos;)
    }
  };" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
  <span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;html-webpack-plugin&apos;</span>);
  <span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;clean-webpack-plugin&apos;</span>);

  <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: {
      <span class="hljs-attr">app</span>: <span class="hljs-string">&apos;./src/index.js&apos;</span>,
      <span class="hljs-attr">print</span>: <span class="hljs-string">&apos;./src/print.js&apos;</span>
    },
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">&apos;inline-source-map&apos;</span>,
 +   devServer: {
 +     contentBase: <span class="hljs-string">&apos;./dist&apos;</span>
 +   },
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">&apos;dist&apos;</span>]),
      <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;Development&apos;</span>
      })
    ],
    <span class="hljs-attr">output</span>: {
      <span class="hljs-attr">filename</span>: <span class="hljs-string">&apos;[name].bundle.js&apos;</span>,
      <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">&apos;dist&apos;</span>)
    }
  };</code></pre><p>&#x4EE5;&#x4E0A;&#x914D;&#x7F6E;&#x544A;&#x77E5; webpack-dev-server&#xFF0C;&#x5728; localhost:8080 &#x4E0B;&#x5EFA;&#x7ACB;&#x670D;&#x52A1;&#xFF0C;&#x5C06; dist &#x76EE;&#x5F55;&#x4E0B;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x4F5C;&#x4E3A;&#x53EF;&#x8BBF;&#x95EE;&#x6587;&#x4EF6;&#x3002;<strong>&#x7C7B;&#x4F3C;&#x4E8E;&#x901A;&#x8FC7; Express &#x5185;&#x7F6E;&#x7684; express.static &#x6258;&#x7BA1;&#x9759;&#x6001;&#x6587;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;&#x56FE;&#x7247;&#x3001;CSS&#x3001;JavaScript &#x6587;&#x4EF6;&#x7B49;&#xFF0C;</strong>&#x901A;&#x8FC7;&#x6587;&#x4EF6;&#x8DEF;&#x5F84;&#x5C31;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x6587;&#x4EF6;&#x4E86;&#x3002;</p><ul><li>devServer.before</li></ul><p>&#x63D0;&#x4F9B;&#x5728;&#x670D;&#x52A1;&#x5668;&#x5185;&#x90E8;&#x7684;&#x6240;&#x6709;&#x5176;&#x4ED6;&#x4E2D;&#x95F4;&#x4EF6;&#x4E4B;&#x524D;&#x6267;&#x884C;&#x5B9A;&#x5236;&#x4E2D;&#x95F4;&#x4EF6;&#x7684;&#x529F;&#x80FD;&#x3002; &#x8FD9;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x81EA;&#x5B9A;&#x4E49;&#x5904;&#x7406;&#x7A0B;&#x5E8F;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  app.get(&apos;/some/path&apos;, function(req, res) {
    res.json({ custom: &apos;response&apos; });
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>  app.get(<span class="hljs-string">&apos;/some/path&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
    res.json({ custom: <span class="hljs-string">&apos;response&apos;</span> });
  });
}</code></pre><h2 id="articleHeader4">webpack-dev-middleware</h2><p>webpack-dev-middleware &#x662F;&#x4E00;&#x4E2A;&#x5BB9;&#x5668;(wrapper)&#xFF0C;&#x5B83;&#x53EF;&#x4EE5;&#x628A; webpack &#x5904;&#x7406;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x4F20;&#x9012;&#x7ED9;&#x4E00;&#x4E2A;&#x670D;&#x52A1;&#x5668;(server)&#x3002; webpack-dev-server &#x5728;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x4E86;&#x5B83;&#x3002;</p><h2 id="articleHeader5">&#x6A21;&#x62DF;&#x6570;&#x636E;&#x57FA;&#x672C;&#x539F;&#x7406;</h2><ol><li>&#x8BFB;&#x53D6;&#x672C;&#x5730;&#x6240;&#x6709;json&#x6587;&#x4EF6;&#x7684;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;</li><li>require&#x8FD9;&#x4E9B;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#x8BFB;&#x53D6;&#x6587;&#x4EF6;&#x5185;&#x5BB9;</li><li>&#x628A;&#x8BFB;&#x53D6;&#x5230;&#x7684;&#x5185;&#x5BB9;&#x5168;&#x90E8;&#x653E;&#x5230;&#x4E00;&#x4E2A;json&#x6587;&#x4EF6;&#x4E2D;</li><li>&#x5BF9;&#x6BCF;&#x4E2A;&#x672C;&#x6587;&#x4EF6;&#x4E2D;&#x7684;url&#x8DEF;&#x5F84;&#x8BBE;&#x7F6E;express&#x7684;&#x8DEF;&#x7531;&#x76D1;&#x542C;</li><li>&#x76D1;&#x542C;&#x5230;&#x7684;&#x6BCF;&#x4E2A;&#x8DEF;&#x5F84;&#x91C7;&#x7528;res.send&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x7ED3;&#x679C;&#x662F;&#x901A;&#x8FC7;url&#x5BF9;&#x5E94;&#x7684;key&#x53BB;&#x5F80;&#x6B65;&#x9AA4;3&#x7684;json&#x6587;&#x4EF6;&#x4E2D;&#x53BB;&#x53D6;&#x5BF9;&#x5E94;&#x7684;&#x5BF9;&#x8C61;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var glob = require(&apos;glob&apos;);
const express = require(&apos;express&apos;)
const app = express()
var apiRoutes = express.Router()
var appData = require(&apos;../data/config&apos;)
var getApi= appData[&apos;get&apos;];//&#x6240;&#x6709;&#x7684;get&#x8BF7;&#x6C42;
console.log(&apos;-----&apos;,getApi);
var postApi= appData[&apos;post&apos;];//&#x6240;&#x6709;&#x7684;post&#x8BF7;&#x6C42;

//&#x67E5;&#x627E;&#x6240;&#x6709;&#x7684;json&#x6587;&#x4EF6;
var entryJS = {};
/*https://www.mgenware.com/blog/?p=2716---&#x4F7F;&#x7528;&#x7279;&#x6B8A;&#x7684;**&#x6765;&#x9012;&#x5F52;&#x8FD4;&#x56DE;&#x6240;&#x6709;&#x5B50;&#x76EE;&#x5F55;&#x5185;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;&#x9ED8;&#x8BA4;node-glob&#x53EA;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x7EA7;&#x5B50;&#x76EE;&#x5F55;&#x4E0B;&#x5F97;&#x5185;&#x5BB9;&#x3002;*/
let jsonFilesList = glob.sync(&apos;./data/**/*.json&apos;);
console.log(&apos;jsonFilesList-----&apos;,jsonFilesList);
/*&#x83B7;&#x53D6;&#x6240;&#x6709;json&#x6587;&#x4EF6;&#x7684;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#xFF08;&#x76F8;&#x5BF9;&#x4E8E;&#x672C;&#x6587;&#x4EF6;)&#xFF09;&#xFF09;*/
entryJS = jsonFilesList.reduce(function (prev, curr) {
  console.log(&apos;curr------&apos;,curr);
  console.log(&apos;curr.slice(7)------&apos;,curr.slice(7));
  console.log(&apos;prev[curr.slice(7)---------&apos;,prev[curr.slice(7)]);
  prev[curr.slice(7)] = &apos;.&apos;+curr;
  console.log(&apos;prev---&apos;,prev);
  return prev;
}, {});

//&#x5408;&#x5E76;&#x6240;&#x6709;&#x7684;json&#x6587;&#x4EF6;&#x5230;&#x4E00;&#x4E2A;json&#x4E2D;
let jsonData={};
for (var i in entryJS){
  console.log(&apos;entryJS-----&apos;,entryJS);
  let data = require(entryJS[i]);
  jsonData = Object.assign(jsonData, data);
  console.log(&apos;jsonData-----&gt;&apos;,jsonData);
}
console.log(&apos;jsonData--All---&gt;&apos;,jsonData);
app.use(&apos;/&apos;, apiRoutes)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;glob&apos;</span>);
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;express&apos;</span>)
<span class="hljs-keyword">const</span> app = express()
<span class="hljs-keyword">var</span> apiRoutes = express.Router()
<span class="hljs-keyword">var</span> appData = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../data/config&apos;</span>)
<span class="hljs-keyword">var</span> getApi= appData[<span class="hljs-string">&apos;get&apos;</span>];<span class="hljs-comment">//&#x6240;&#x6709;&#x7684;get&#x8BF7;&#x6C42;</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;-----&apos;</span>,getApi);
<span class="hljs-keyword">var</span> postApi= appData[<span class="hljs-string">&apos;post&apos;</span>];<span class="hljs-comment">//&#x6240;&#x6709;&#x7684;post&#x8BF7;&#x6C42;</span>

<span class="hljs-comment">//&#x67E5;&#x627E;&#x6240;&#x6709;&#x7684;json&#x6587;&#x4EF6;</span>
<span class="hljs-keyword">var</span> entryJS = {};
<span class="hljs-comment">/*https://www.mgenware.com/blog/?p=2716---&#x4F7F;&#x7528;&#x7279;&#x6B8A;&#x7684;**&#x6765;&#x9012;&#x5F52;&#x8FD4;&#x56DE;&#x6240;&#x6709;&#x5B50;&#x76EE;&#x5F55;&#x5185;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;&#x9ED8;&#x8BA4;node-glob&#x53EA;&#x4F1A;&#x8FD4;&#x56DE;&#x4E00;&#x7EA7;&#x5B50;&#x76EE;&#x5F55;&#x4E0B;&#x5F97;&#x5185;&#x5BB9;&#x3002;*/</span>
<span class="hljs-keyword">let</span> jsonFilesList = glob.sync(<span class="hljs-string">&apos;./data/**/*.json&apos;</span>);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;jsonFilesList-----&apos;</span>,jsonFilesList);
<span class="hljs-comment">/*&#x83B7;&#x53D6;&#x6240;&#x6709;json&#x6587;&#x4EF6;&#x7684;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;&#xFF08;&#x76F8;&#x5BF9;&#x4E8E;&#x672C;&#x6587;&#x4EF6;)&#xFF09;&#xFF09;*/</span>
entryJS = jsonFilesList.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">prev, curr</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;curr------&apos;</span>,curr);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;curr.slice(7)------&apos;</span>,curr.slice(<span class="hljs-number">7</span>));
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;prev[curr.slice(7)---------&apos;</span>,prev[curr.slice(<span class="hljs-number">7</span>)]);
  prev[curr.slice(<span class="hljs-number">7</span>)] = <span class="hljs-string">&apos;.&apos;</span>+curr;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;prev---&apos;</span>,prev);
  <span class="hljs-keyword">return</span> prev;
}, {});

<span class="hljs-comment">//&#x5408;&#x5E76;&#x6240;&#x6709;&#x7684;json&#x6587;&#x4EF6;&#x5230;&#x4E00;&#x4E2A;json&#x4E2D;</span>
<span class="hljs-keyword">let</span> jsonData={};
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> entryJS){
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;entryJS-----&apos;</span>,entryJS);
  <span class="hljs-keyword">let</span> data = <span class="hljs-built_in">require</span>(entryJS[i]);
  jsonData = <span class="hljs-built_in">Object</span>.assign(jsonData, data);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;jsonData-----&gt;&apos;</span>,jsonData);
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;jsonData--All---&gt;&apos;</span>,jsonData);
app.use(<span class="hljs-string">&apos;/&apos;</span>, apiRoutes)</code></pre><p>&#x7136;&#x540E;&#x5728;devServer&#x4E2D;&#x6DFB;&#x52A0;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="before (app) {
      //get//
      for(var i = 0;i &lt; getApi.length; i++){
        console.log(&apos;getApi-------&gt;&apos;,getApi);
        var getData = jsonData[getApi[i].key];
        console.log(&apos;getData-----&gt;&apos;,getData);
        app.get(getApi[i].url, function (req, res) {
          res.json(getData);
        });
      }
      //post
      /*for(var i = 0;i &lt; postApi.length; i++){
        var postData = jsonData[postApi[i].key];
        app.post(postApi[i].url,function (req, res) {
          res.json(postData);
        });
      }*/
    }
    ////////////////////////////" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs livescript"><code>before (app) {
      <span class="hljs-regexp">//get//</span>
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i &lt; getApi.length; i++){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;getApi-------&gt;&apos;</span>,getApi);
        <span class="hljs-keyword">var</span> getData = jsonData[getApi[i].key];
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;getData-----&gt;&apos;</span>,getData);
        app.get(getApi[i].url, <span class="hljs-keyword">function</span> (req, res) {
          res.json(getData);
        });
      }
      <span class="hljs-regexp">//post
      /*for(var i = 0;i &lt; postApi.length; i++){
        var postData = jsonData[postApi[i].key];
        app.post(postApi[i].url,function (req, res) {
          res.json(postData);
        });
      }*/
    }
    //</span><span class="hljs-regexp">////</span><span class="hljs-regexp">////</span><span class="hljs-regexp">////</span><span class="hljs-regexp">////</span><span class="hljs-regexp">////</span><span class="hljs-regexp">////</span><span class="hljs-regexp">//</span></code></pre><p>config.js&#x4E2D;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let data={
  &quot;get&quot;:[
    {
      &apos;url&apos;:&apos;/api/goods&apos;,
      &apos;key&apos;:&apos;goods&apos;
    },
    {
      &apos;url&apos;:&apos;/api/sells&apos;,
      &apos;key&apos;:&apos;sells&apos;
    }
  ],
  &quot;post&quot;:[{
    &apos;url&apos;:&apos;api/sell&apos;,
    &apos;key&apos;:&apos;sells&apos;
  }]
}
module.exports = data;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">let</span> data={
  <span class="hljs-string">&quot;get&quot;</span>:[
    {
      <span class="hljs-string">&apos;url&apos;</span>:<span class="hljs-string">&apos;/api/goods&apos;</span>,
      <span class="hljs-string">&apos;key&apos;</span>:<span class="hljs-string">&apos;goods&apos;</span>
    },
    {
      <span class="hljs-string">&apos;url&apos;</span>:<span class="hljs-string">&apos;/api/sells&apos;</span>,
      <span class="hljs-string">&apos;key&apos;</span>:<span class="hljs-string">&apos;sells&apos;</span>
    }
  ],
  <span class="hljs-string">&quot;post&quot;</span>:[{
    <span class="hljs-string">&apos;url&apos;</span>:<span class="hljs-string">&apos;api/sell&apos;</span>,
    <span class="hljs-string">&apos;key&apos;</span>:<span class="hljs-string">&apos;sells&apos;</span>
  }]
}
module.exports = data;</code></pre><p>&#x5C31;&#x53EF;&#x4EE5;&#x6A21;&#x62DF;&#x672C;&#x5730;&#x6570;&#x636E;&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node-express框架本地模拟接口数据

## 原文链接
[https://segmentfault.com/a/1190000015350367](https://segmentfault.com/a/1190000015350367)


---
title: 'koa中webpack热加载&&NODE_ENV配置' 
date: 2019-02-11 2:30:49
hidden: true
slug: 1hjj6y1f2v3
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://demozhan.com/2016/04/18/koa%E4%B8%ADwebpack%E7%83%AD%E5%8A%A0%E8%BD%BD-NODE-ENV%E9%85%8D%E7%BD%AE/" rel="nofollow noreferrer" target="_blank">原文地址</a></p>
<h2 id="articleHeader0">背景</h2>
<blockquote><p>目前在用koa+react+redux搭建一个微信后台，需要用到webpack热加载的方式方便进行开发，同时参考redux官方例子的配置方式，发现<code>process.env.NODE_ENV</code>一直是undefined，所以有了这篇文章。</p></blockquote>
<p>本文主要介绍express以及koa中webpack热加载的实现方式，同时解决<code>process.env.NODE_ENV</code>传递的问题。</p>
<h2 id="articleHeader1">express热加载</h2>
<p>通过引入webpack热加载的中间件即可，如下所示</p>
<p>server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> webpackDevMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)
<span class="hljs-keyword">var</span> webpackHotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>)
<span class="hljs-keyword">var</span> compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">publicPath</span>: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))</code></pre>
<p>在<code>webpack.config.js</code>中引入热加载插件，添加entry入口，以及publicPath</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'cheap-module-eval-source-map'</span>,
  <span class="hljs-attr">entry</span>: [
    <span class="hljs-string">'webpack-hot-middleware/client'</span>,
    <span class="hljs-string">'./index'</span>
  ],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/static/'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin(),
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  ],
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loaders</span>: [ <span class="hljs-string">'babel'</span> ],
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">include</span>: __dirname
      }
    ]
  }
}</code></pre>
<p>完成以上文件的修改即可实现启动node服务器实现热加载</p>
<h2 id="articleHeader2">koa中实现热加载</h2>
<blockquote><p>在koa中如果直接使用express的加载方式，会造成每次触发请求以及返回请求都会重新打包。</p></blockquote>
<p>解决办法：直接使用<code>koa-webpack-dev-middleware</code>以及<code>koa-webpack-dev-middleware</code>，当然阅读这两个中间件源码可以发现它们的加载方式实际上还是和express差不多，只是在执行中间件的时候就已经完成了热加载的过程，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var expressMiddleware = require('webpack-dev-middleware');

function middleware(doIt, req, res) {
  var originalEnd = res.end;

  return function (done) {
    res.end = function () {
      originalEnd.apply(this, arguments);
      done(null, 0);
    };
    doIt(req, res, function () {
      done(null, 1);
    })
  }
}
module.exports = function (compiler, option) {
  var doIt = expressMiddleware(compiler, option);
  return function*(next) {
    var ctx = this;
    var req = this.req;
    var runNext = yield middleware(doIt, req, {
      end: function (content) {
        ctx.body = content;
      },
      setHeader: function () {
        ctx.set.apply(ctx, arguments);
      }
    });
    if (runNext) {
      yield *next;
    }
  };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> expressMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">middleware</span>(<span class="hljs-params">doIt, req, res</span>) </span>{
  <span class="hljs-keyword">var</span> originalEnd = res.end;

  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">done</span>) </span>{
    res.end = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      originalEnd.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
      done(<span class="hljs-literal">null</span>, <span class="hljs-number">0</span>);
    };
    doIt(req, res, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      done(<span class="hljs-literal">null</span>, <span class="hljs-number">1</span>);
    })
  }
}
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compiler, option</span>) </span>{
  <span class="hljs-keyword">var</span> doIt = expressMiddleware(compiler, option);
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params">next</span>) </span>{
    <span class="hljs-keyword">var</span> ctx = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> req = <span class="hljs-keyword">this</span>.req;
    <span class="hljs-keyword">var</span> runNext = <span class="hljs-keyword">yield</span> middleware(doIt, req, {
      <span class="hljs-attr">end</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">content</span>) </span>{
        ctx.body = content;
      },
      <span class="hljs-attr">setHeader</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        ctx.set.apply(ctx, <span class="hljs-built_in">arguments</span>);
      }
    });
    <span class="hljs-keyword">if</span> (runNext) {
      <span class="hljs-keyword">yield</span> *next;
    }
  };
};</code></pre>
<p>在koa中的使用方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var webpackDevMiddleware = require('koa-webpack-dev-middleware');
var webpackHotMiddleware = require('koa-webpack-hot-middleware');
var config = require('./webpack.config')
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> webpackDevMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-dev-middleware'</span>);
<span class="hljs-keyword">var</span> webpackHotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-hot-middleware'</span>);
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>)
<span class="hljs-keyword">var</span> compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">publicPath</span>: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));</code></pre>
<h2 id="articleHeader3">react中 <code>process.env.NODE_ENV</code> undefined</h2>
<blockquote><p>这个问题实际上是因为react或者前端本省并不可能获取到<code>process.env.NODE_ENV</code>，只能通过后台传递参数到前端才可以。</p></blockquote>
<p>解决方法：在webpack中有一个插件可以解决这个问题</p>
<p>webpack.config.js(列出部分代码)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var env = process.env.NODE_ENV;
var config = {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> env = process.env.NODE_ENV;
<span class="hljs-keyword">var</span> config = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin(),
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin(),
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(env)
    })
  ],
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa中webpack热加载&&NODE_ENV配置

## 原文链接
[https://segmentfault.com/a/1190000004968387](https://segmentfault.com/a/1190000004968387)


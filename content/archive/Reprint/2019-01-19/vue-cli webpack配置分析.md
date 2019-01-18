---
title: 'vue-cli webpack配置分析' 
date: 2019-01-19 2:30:09
hidden: true
slug: h64oeqws778
categories: [reprint]
---

{{< raw >}}

                    
<p>相信vue使用者对<code>vue-cli</code>都不会陌生，甚至可以说，很熟悉了，但对其<code>webpack</code>的配置可能知之甚少吧。</p>
<p>过完年回来后，我接手了公司的新项目。新项目是一个spa。很自然，我就想到了vue-cli脚手架了，当时研究一下它的webpack配置。于是，就有了其他的内容。</p>
<p>今天这篇文章，是在原来的基础上，增加了一些新版本的内容，但实质上变化不大。</p>
<h2 id="articleHeader0">说明</h2>
<p>此仓库为<code>vue-cli webpack</code>的配置分析，其实只是在源码中加上注释而已。大家查看详细分析，可以从后面提到的入口文件开始查看。</p>
<p>分析不包括<code>check-versions.js</code>文件，因为<code>check-versions.js</code>是检测<code>npm</code>和<code>node</code>版本，不涉及<code>webpack</code>，所以就没有对<code>check-versions.js</code>进行分析。同时，也不包括测试部分的代码，该分析只是针对开发和生产环境的<code>webpack</code>配置进行分析。</p>
<h2 id="articleHeader1">vue-cli 版本</h2>
<p>2.8.1</p>
<h2 id="articleHeader2">入口</h2>
<p>从<code>package.json</code>可以看到开发和生产环境的入口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
  }</code></pre>
<h2 id="articleHeader3">开发环境</h2>
<p>开发环境的入口文件是 <a href="https://github.com/chenBright/vue-cli-webpack-analysis/blob/master/build/dev-server.js" rel="nofollow noreferrer" target="_blank">build/dev-server.js</a>。</p>
<h3 id="articleHeader4">dev-server.js</h3>
<p>该文件中，使用express作为后端框架，结合一些关于webpack的中间件，搭建了一个开发环境。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 配置文件
var config = require('../config')
// 如果 Node 的环境无法判断当前是 dev / product 环境
// 使用 config.dev.env.NODE_ENV 作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// 可以强制打开浏览器并跳转到指定 url 的插件
// https://github.com/sindresorhus/opn
var opn = require('opn')
// node自带的文件路径工具
var path = require('path')
// express框架
var express = require('express')
var webpack = require('webpack')
// 测试环境，使用的配置与生产环境的配置一样
// 非测试环境，即为开发环境，因为此文件只有测试环境和开发环境使用
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
// 生产环境配置文件
  ? require('./webpack.prod.conf')
  // 开发环境配置文件
  : require('./webpack.dev.conf')

// 端口号为命令行输入的PORT参数或者配置文件中的默认值
var port = process.env.PORT || config.dev.port
// 配置文件中 是否自动打开浏览器
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// 配置文件中 http代理配置
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// 启动 express 服务
var app = express()
// 启动 webpack 编译
var compiler = webpack(webpackConfig)

// 可以将编译后的文件暂存到内存中的插件
// https://github.com/webpack/webpack-dev-middleware
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  // 公共路径，与webpack的publicPath一样
  publicPath: webpackConfig.output.publicPath,
  // 不打印
  quiet: true
})

// Hot-reload 热重载插件
// https://github.com/glenjamin/webpack-hot-middleware
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// 当tml-webpack-plugin template更改之后，强制刷新浏览器
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  // 如果options的数据类型为string，则表示只设置了url，
  // 所以需要将url设置为对象中的 target的值
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 使用 connect-history-api-fallback 匹配资源
// 如果不匹配就可以重定向到指定地址
// https://github.com/bripkens/connect-history-api-fallback
app.use(require('connect-history-api-fallback')())

// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)

// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 静态文件服务
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

// 编译成功后打印网址信息
devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // 如果配置了自动打开浏览器，且不是测试环境，则自动打开浏览器并跳到我们的开发地址
  if (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 配置文件</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// 如果 Node 的环境无法判断当前是 dev / product 环境</span>
<span class="hljs-comment">// 使用 config.dev.env.NODE_ENV 作为当前的环境</span>
<span class="hljs-keyword">if</span> (!process.env.NODE_ENV) {
  process.env.NODE_ENV = <span class="hljs-built_in">JSON</span>.parse(config.dev.env.NODE_ENV)
}

<span class="hljs-comment">// 可以强制打开浏览器并跳转到指定 url 的插件</span>
<span class="hljs-comment">// https://github.com/sindresorhus/opn</span>
<span class="hljs-keyword">var</span> opn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'opn'</span>)
<span class="hljs-comment">// node自带的文件路径工具</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// express框架</span>
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-comment">// 测试环境，使用的配置与生产环境的配置一样</span>
<span class="hljs-comment">// 非测试环境，即为开发环境，因为此文件只有测试环境和开发环境使用</span>
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)
<span class="hljs-keyword">var</span> webpackConfig = process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
<span class="hljs-comment">// 生产环境配置文件</span>
  ? <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)
  <span class="hljs-comment">// 开发环境配置文件</span>
  : <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.dev.conf'</span>)

<span class="hljs-comment">// 端口号为命令行输入的PORT参数或者配置文件中的默认值</span>
<span class="hljs-keyword">var</span> port = process.env.PORT || config.dev.port
<span class="hljs-comment">// 配置文件中 是否自动打开浏览器</span>
<span class="hljs-keyword">var</span> autoOpenBrowser = !!config.dev.autoOpenBrowser
<span class="hljs-comment">// 配置文件中 http代理配置</span>
<span class="hljs-comment">// https://github.com/chimurai/http-proxy-middleware</span>
<span class="hljs-keyword">var</span> proxyTable = config.dev.proxyTable

<span class="hljs-comment">// 启动 express 服务</span>
<span class="hljs-keyword">var</span> app = express()
<span class="hljs-comment">// 启动 webpack 编译</span>
<span class="hljs-keyword">var</span> compiler = webpack(webpackConfig)

<span class="hljs-comment">// 可以将编译后的文件暂存到内存中的插件</span>
<span class="hljs-comment">// https://github.com/webpack/webpack-dev-middleware</span>
<span class="hljs-keyword">var</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)(compiler, {
  <span class="hljs-comment">// 公共路径，与webpack的publicPath一样</span>
  publicPath: webpackConfig.output.publicPath,
  <span class="hljs-comment">// 不打印</span>
  quiet: <span class="hljs-literal">true</span>
})

<span class="hljs-comment">// Hot-reload 热重载插件</span>
<span class="hljs-comment">// https://github.com/glenjamin/webpack-hot-middleware</span>
<span class="hljs-keyword">var</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)(compiler, {
  <span class="hljs-attr">log</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
})
<span class="hljs-comment">// 当tml-webpack-plugin template更改之后，强制刷新浏览器</span>
compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compilation</span>) </span>{
  compilation.plugin(<span class="hljs-string">'html-webpack-plugin-after-emit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data, cb</span>) </span>{
    hotMiddleware.publish({ <span class="hljs-attr">action</span>: <span class="hljs-string">'reload'</span> })
    cb()
  })
})

<span class="hljs-comment">// 将 proxyTable 中的请求配置挂在到启动的 express 服务上</span>
<span class="hljs-built_in">Object</span>.keys(proxyTable).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
  <span class="hljs-keyword">var</span> options = proxyTable[context]
  <span class="hljs-comment">// 如果options的数据类型为string，则表示只设置了url，</span>
  <span class="hljs-comment">// 所以需要将url设置为对象中的 target的值</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options === <span class="hljs-string">'string'</span>) {
    options = { <span class="hljs-attr">target</span>: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

<span class="hljs-comment">// 使用 connect-history-api-fallback 匹配资源</span>
<span class="hljs-comment">// 如果不匹配就可以重定向到指定地址</span>
<span class="hljs-comment">// https://github.com/bripkens/connect-history-api-fallback</span>
app.use(<span class="hljs-built_in">require</span>(<span class="hljs-string">'connect-history-api-fallback'</span>)())

<span class="hljs-comment">// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上</span>
app.use(devMiddleware)

<span class="hljs-comment">// 将 Hot-reload 挂在到 express 服务上</span>
app.use(hotMiddleware)

<span class="hljs-comment">// 拼接 static 文件夹的静态资源路径</span>
<span class="hljs-keyword">var</span> staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
<span class="hljs-comment">// 静态文件服务</span>
app.use(staticPath, express.static(<span class="hljs-string">'./static'</span>))

<span class="hljs-keyword">var</span> uri = <span class="hljs-string">'http://localhost:'</span> + port

<span class="hljs-comment">// 编译成功后打印网址信息</span>
devMiddleware.waitUntilValid(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt; Listening at '</span> + uri + <span class="hljs-string">'\n'</span>)
})

<span class="hljs-built_in">module</span>.exports = app.listen(port, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-built_in">console</span>.log(err)
    <span class="hljs-keyword">return</span>
  }

  <span class="hljs-comment">// 如果配置了自动打开浏览器，且不是测试环境，则自动打开浏览器并跳到我们的开发地址</span>
  <span class="hljs-keyword">if</span> (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== <span class="hljs-string">'testing'</span>) {
    opn(uri)
  }
})
</code></pre>
<h3 id="articleHeader5">webpack.dev.conf.js</h3>
<p><code>dev-server.js</code>中使用了<code>webpack.dev.conf.js</code>文件，该文件是开发环境中webpack的配置入口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 工具函数集合
var utils = require('./utils')
var webpack = require('webpack')
  // 配置文件
var config = require('../config')
  // webpack 配置合并插件
var merge = require('webpack-merge')
  // webpac基本配置
var baseWebpackConfig = require('./webpack.base.conf')
  // 自动生成 html 并且注入到 .html 文件中的插件
  // https://github.com/ampedandwired/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
  // webpack错误信息提示插件
  // https://github.com/geowarin/friendly-errors-webpack-plugin
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 将 Hol-reload 热重载的客户端代码添加到 webpack.base.conf 的 对应 entry 中，一起打包
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    // styleLoaders
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // 最新的配置为 cheap-module-eval-source-map，虽然 cheap-module-eval-source-map更快，但它的定位不准确
  // 所以，换成 eval-source-map
  devtool: '#eval-source-map',
  plugins: [
    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    // 此处，插入适当的环境
    // https://webpack.js.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // webpack错误信息提示插件
    new FriendlyErrorsPlugin()
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 工具函数集合</span>
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
  <span class="hljs-comment">// 配置文件</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
  <span class="hljs-comment">// webpack 配置合并插件</span>
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
  <span class="hljs-comment">// webpac基本配置</span>
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
  <span class="hljs-comment">// 自动生成 html 并且注入到 .html 文件中的插件</span>
  <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
  <span class="hljs-comment">// webpack错误信息提示插件</span>
  <span class="hljs-comment">// https://github.com/geowarin/friendly-errors-webpack-plugin</span>
<span class="hljs-keyword">var</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)

<span class="hljs-comment">// 将 Hol-reload 热重载的客户端代码添加到 webpack.base.conf 的 对应 entry 中，一起打包</span>
<span class="hljs-built_in">Object</span>.keys(baseWebpackConfig.entry).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  baseWebpackConfig.entry[name] = [<span class="hljs-string">'./build/dev-client'</span>].concat(baseWebpackConfig.entry[name])
})

<span class="hljs-built_in">module</span>.exports = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// styleLoaders</span>
    rules: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap })
  },
  <span class="hljs-comment">// 最新的配置为 cheap-module-eval-source-map，虽然 cheap-module-eval-source-map更快，但它的定位不准确</span>
  <span class="hljs-comment">// 所以，换成 eval-source-map</span>
  devtool: <span class="hljs-string">'#eval-source-map'</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串</span>
    <span class="hljs-comment">// 此处，插入适当的环境</span>
    <span class="hljs-comment">// https://webpack.js.org/plugins/define-plugin/</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: config.dev.env
    }),
    <span class="hljs-comment">// HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件</span>
    <span class="hljs-comment">// https://github.com/glenjamin/webpack-hot-middleware#installation--usage</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// 将 index.html 作为入口，注入 html 代码后生成 index.html文件</span>
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// webpack错误信息提示插件</span>
    <span class="hljs-keyword">new</span> FriendlyErrorsPlugin()
  ]
})</code></pre>
<h3 id="articleHeader6">webpack.base.conf.js</h3>
<p>在<code>webpack.dev.conf.js</code>中出现<code>webpack.base.conf.js</code>，这个文件是开发环境和生产环境，甚至测试环境，这些环境的公共webpack配置。可以说，这个文件相当重要。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// node自带的文件路径工具
var path = require('path')
// 工具函数集合
var utils = require('./utils')
  // 配置文件
var config = require('../config')
  // 工具函数集合
var vueLoaderConfig = require('./vue-loader.conf')

/**
 * 获得绝对路径
 * @method resolve
 * @param  {String} dir 相对于本文件的路径
 * @return {String}     绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    // 编译输出的静态资源根路径
    path: config.build.assetsRoot,
    // 编译输出的文件名
    filename: '[name].js',
    // 正式发布环境下编译输出的上线路径的根路径
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    // 自动补全的扩展名
    extensions: ['.js', '.vue', '.json'],
    // 路径别名
    alias: {
      // 例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [{
        // 审查 js 和 vue 文件
        // https://github.com/MoOx/eslint-loader
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        // 表示预先处理
        enforce: &quot;pre&quot;,
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        // 处理 vue文件
        // https://github.com/vuejs/vue-loader
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        // 编译 js
        // https://github.com/babel/babel-loader
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        // 处理图片文件
        // https://github.com/webpack-contrib/url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 处理字体文件
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// node自带的文件路径工具</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 工具函数集合</span>
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
  <span class="hljs-comment">// 配置文件</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
  <span class="hljs-comment">// 工具函数集合</span>
<span class="hljs-keyword">var</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)

<span class="hljs-comment">/**
 * 获得绝对路径
 * @method resolve
 * @param  {String} dir 相对于本文件的路径
 * @return {String}     绝对路径
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/main.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-comment">// 编译输出的静态资源根路径</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// 编译输出的文件名</span>
    filename: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-comment">// 正式发布环境下编译输出的上线路径的根路径</span>
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// 自动补全的扩展名</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-comment">// 路径别名</span>
    alias: {
      <span class="hljs-comment">// 例如 import Vue from 'vue'，会自动到 'vue/dist/vue.common.js'中寻找</span>
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
    }
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [{
        <span class="hljs-comment">// 审查 js 和 vue 文件</span>
        <span class="hljs-comment">// https://github.com/MoOx/eslint-loader</span>
        test: <span class="hljs-regexp">/\.(js|vue)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>,
        <span class="hljs-comment">// 表示预先处理</span>
        enforce: <span class="hljs-string">"pre"</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>)
        }
      },
      {
        <span class="hljs-comment">// 处理 vue文件</span>
        <span class="hljs-comment">// https://github.com/vuejs/vue-loader</span>
        test: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
      },
      {
        <span class="hljs-comment">// 编译 js</span>
        <span class="hljs-comment">// https://github.com/babel/babel-loader</span>
        test: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)]
      },
      {
        <span class="hljs-comment">// 处理图片文件</span>
        <span class="hljs-comment">// https://github.com/webpack-contrib/url-loader</span>
        test: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
      },
      {
        <span class="hljs-comment">// 处理字体文件</span>
        test: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  }
}</code></pre>
<h3 id="articleHeader7">config/index.js</h3>
<p>该文件在很多文件中都用到，是主要的配置文件，包含静态文件的路径、是否开启sourceMap等。其中，分为两个部分<code>dev</code>（开发环境的配置）和<code>build</code>（生产环境的配置）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 详情见文档：https://vuejs-templates.github.io/webpack/env.html
var path = require('path')

module.exports = {
  // production 生产环境
  build: {
    // 构建环境
    env: require('./prod.env'),
    // 构建输出的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // 构建输出的静态资源路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 构建输出的二级目录
    assetsSubDirectory: 'static',
    // 构建发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // 是否开启 cssSourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认关闭 gzip，因为很多流行的静态资源主机，例如 Surge、Netlify，已经为所有静态资源开启gzip
    productionGzip: false,
    // 需要使用 gzip 压缩的文件扩展名
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 运行“build”命令行时，加上一个参数，可以在构建完成后参看包分析报告
    // true为开启，false为关闭
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // dev 开发环境
  dev: {
    // 构建环境
    env: require('./dev.env'),
    // 端口号
    port: 3333,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsPublicPath: '/',
    // proxyTable 代理的接口（可跨域）
    // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 默认情况下，关闭 CSS Sourcemaps，因为使用相对路径会报错。
    // CSS-Loader README：https://github.com/webpack/css-loader#sourcemaps
    cssSourceMap: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 详情见文档：https://vuejs-templates.github.io/webpack/env.html</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// production 生产环境</span>
  build: {
    <span class="hljs-comment">// 构建环境</span>
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-comment">// 构建输出的index.html文件</span>
    index: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    <span class="hljs-comment">// 构建输出的静态资源路径</span>
    assetsRoot: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    <span class="hljs-comment">// 构建输出的二级目录</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">// 构建发布的根目录，可配置为资源服务器域名或 CDN 域名</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    <span class="hljs-comment">// 是否开启 cssSourceMap</span>
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// Gzip off by default as many popular static hosts such as</span>
    <span class="hljs-comment">// Surge or Netlify already gzip all static assets for you.</span>
    <span class="hljs-comment">// Before setting to `true`, make sure to:</span>
    <span class="hljs-comment">// npm install --save-dev compression-webpack-plugin</span>
    <span class="hljs-comment">// 默认关闭 gzip，因为很多流行的静态资源主机，例如 Surge、Netlify，已经为所有静态资源开启gzip</span>
    productionGzip: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// 需要使用 gzip 压缩的文件扩展名</span>
    productionGzipExtensions: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    <span class="hljs-comment">// Run the build command with an extra argument to</span>
    <span class="hljs-comment">// View the bundle analyzer report after build finishes:</span>
    <span class="hljs-comment">// `npm run build --report`</span>
    <span class="hljs-comment">// Set to `true` or `false` to always turn it on or off</span>
    <span class="hljs-comment">// 运行“build”命令行时，加上一个参数，可以在构建完成后参看包分析报告</span>
    <span class="hljs-comment">// true为开启，false为关闭</span>
    bundleAnalyzerReport: process.env.npm_config_report
  },
  <span class="hljs-comment">// dev 开发环境</span>
  dev: {
    <span class="hljs-comment">// 构建环境</span>
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
    <span class="hljs-comment">// 端口号</span>
    port: <span class="hljs-number">3333</span>,
    <span class="hljs-comment">// 是否自动打开浏览器</span>
    autoOpenBrowser: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    <span class="hljs-comment">// proxyTable 代理的接口（可跨域）</span>
    <span class="hljs-comment">// 使用方法：https://vuejs-templates.github.io/webpack/proxy.html</span>
    proxyTable: {},
    <span class="hljs-comment">// CSS Sourcemaps off by default because relative paths are "buggy"</span>
    <span class="hljs-comment">// with this option, according to the CSS-Loader README</span>
    <span class="hljs-comment">// (https://github.com/webpack/css-loader#sourcemaps)</span>
    <span class="hljs-comment">// In our experience, they generally work as expected,</span>
    <span class="hljs-comment">// just be aware of this issue when enabling this option.</span>
    <span class="hljs-comment">// 默认情况下，关闭 CSS Sourcemaps，因为使用相对路径会报错。</span>
    <span class="hljs-comment">// CSS-Loader README：https://github.com/webpack/css-loader#sourcemaps</span>
    cssSourceMap: <span class="hljs-literal">false</span>
  }
}</code></pre>
<h3 id="articleHeader8">utils.js</h3>
<p><code>utils.js</code>也是一个被使用频率的文件，这个文件包含了三个工具函数：</p>
<ul>
<li><p>生成静态资源的路径</p></li>
<li><p>生成 ExtractTextPlugin对象或loader字符串</p></li>
<li><p>生成 style-loader的配置</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// node自带的文件路径工具
var path = require('path')
// 配置文件
var config = require('../config')
// 提取css的插件
// https://github.com/webpack-contrib/extract-text-webpack-plugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * 生成静态资源的路径
 * @method assertsPath
 * @param  {String}    _path 相对于静态资源文件夹的文件路径
 * @return {String}          静态资源完整路径
 */
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
    //  path.posix.join与path.join一样，不过总是以 posix 兼容的方式交互
  return path.posix.join(assetsSubDirectory, _path)
}

/**
 * 生成处理css的loaders配置
 * @method cssLoaders
 * @param  {Object}   options 生成配置
 *                            option = {
 *                              // 是否开启 sourceMap
 *                              sourceMap: true,
 *                              // 是否提取css
 *                              extract: true
 *                            }
 * @return {Object}           处理css的loaders配置对象
 */
exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }
  /**
   * 生成 ExtractTextPlugin对象或loader字符串
   * @method generateLoaders
   * @param  {Array}        loaders loader名称数组
   * @return {String|Object}        ExtractTextPlugin对象或loader字符串
   */
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        // 例如，sass?indentedSyntax
        // 在?号前加上“-loader”
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // extract为true时，提取css
    // 生产环境中，默认为true
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

/**
 * 生成 style-loader的配置
 * style-loader文档：https://github.com/webpack/style-loader
 * @method styleLoaders
 * @param  {Object}     options 生成配置
 *                              option = {
 *                                // 是否开启 sourceMap
 *                                sourceMap: true,
 *                                // 是否提取css
 *                                extract: true
 *                              }
 * @return {Array}              style-loader的配置
 */
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// node自带的文件路径工具</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 配置文件</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// 提取css的插件</span>
<span class="hljs-comment">// https://github.com/webpack-contrib/extract-text-webpack-plugin</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)

<span class="hljs-comment">/**
 * 生成静态资源的路径
 * @method assertsPath
 * @param  {String}    _path 相对于静态资源文件夹的文件路径
 * @return {String}          静态资源完整路径
 */</span>
exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">var</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">'production'</span>
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
    <span class="hljs-comment">//  path.posix.join与path.join一样，不过总是以 posix 兼容的方式交互</span>
  <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

<span class="hljs-comment">/**
 * 生成处理css的loaders配置
 * @method cssLoaders
 * @param  {Object}   options 生成配置
 *                            option = {
 *                              // 是否开启 sourceMap
 *                              sourceMap: true,
 *                              // 是否提取css
 *                              extract: true
 *                            }
 * @return {Object}           处理css的loaders配置对象
 */</span>
exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {}

  <span class="hljs-keyword">var</span> cssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">minimize</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span>,
      <span class="hljs-attr">sourceMap</span>: options.sourceMap
    }
  }
  <span class="hljs-comment">/**
   * 生成 ExtractTextPlugin对象或loader字符串
   * @method generateLoaders
   * @param  {Array}        loaders loader名称数组
   * @return {String|Object}        ExtractTextPlugin对象或loader字符串
   */</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{
    <span class="hljs-keyword">var</span> loaders = [cssLoader]
    <span class="hljs-keyword">if</span> (loader) {
      loaders.push({
        <span class="hljs-comment">// 例如，sass?indentedSyntax</span>
        <span class="hljs-comment">// 在?号前加上“-loader”</span>
        loader: loader + <span class="hljs-string">'-loader'</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-built_in">Object</span>.assign({}, loaderOptions, {
          <span class="hljs-attr">sourceMap</span>: options.sourceMap
        })
      })
    }

    <span class="hljs-comment">// extract为true时，提取css</span>
    <span class="hljs-comment">// 生产环境中，默认为true</span>
    <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        <span class="hljs-attr">use</span>: loaders,
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">'vue-style-loader'</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }
  }

  <span class="hljs-comment">// http://vuejs.github.io/vue-loader/en/configurations/extract-css.html</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">css</span>: generateLoaders(),
    <span class="hljs-attr">postcss</span>: generateLoaders(),
    <span class="hljs-attr">less</span>: generateLoaders(<span class="hljs-string">'less'</span>),
    <span class="hljs-attr">sass</span>: generateLoaders(<span class="hljs-string">'sass'</span>, { <span class="hljs-attr">indentedSyntax</span>: <span class="hljs-literal">true</span> }),
    <span class="hljs-attr">scss</span>: generateLoaders(<span class="hljs-string">'sass'</span>),
    <span class="hljs-attr">stylus</span>: generateLoaders(<span class="hljs-string">'stylus'</span>),
    <span class="hljs-attr">styl</span>: generateLoaders(<span class="hljs-string">'stylus'</span>)
  }
}

<span class="hljs-comment">/**
 * 生成 style-loader的配置
 * style-loader文档：https://github.com/webpack/style-loader
 * @method styleLoaders
 * @param  {Object}     options 生成配置
 *                              option = {
 *                                // 是否开启 sourceMap
 *                                sourceMap: true,
 *                                // 是否提取css
 *                                extract: true
 *                              }
 * @return {Array}              style-loader的配置
 */</span>
exports.styleLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">var</span> output = []
  <span class="hljs-keyword">var</span> loaders = exports.cssLoaders(options)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> extension <span class="hljs-keyword">in</span> loaders) {
    <span class="hljs-keyword">var</span> loader = loaders[extension]
    output.push({
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'\\.'</span> + extension + <span class="hljs-string">'$'</span>),
      <span class="hljs-attr">use</span>: loader
    })
  }
  <span class="hljs-keyword">return</span> output
}</code></pre>
<h2 id="articleHeader9">生产环境</h2>
<p>开发环境的入口文件是<a href="https://github.com/chenBright/vue-cli-webpack-analysis/blob/master/build/build.js" rel="nofollow noreferrer" target="_blank"><code>build/build.js </code></a>。</p>
<h3 id="articleHeader10">build.js</h3>
<p>该文件，为构建打包文件，会将源码进行构建（编译、压缩等）后打包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置当前环境为生产环境
process.env.NODE_ENV = 'production'

// loading 插件
// https://github.com/sindresorhus/ora
var ora = require('ora')
// 可以在 node 中执行`rm -rf`的工具
// https://github.com/isaacs/rimraf
var rm = require('rimraf')
// node自带的文件路径工具
var path = require('path')
// 在终端输出带颜色的文字
// https://github.com/chalk/chalk
var chalk = require('chalk')
var webpack = require('webpack')
// 配置文件
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

// 在终端显示loading效果，并输出提示
var spinner = ora('building for production...')
spinner.start()

// 删除这个文件夹 （递归删除）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 构建
  webpack(webpackConfig, function (err, stats) {
    // 构建成功

    // 停止 loading动画
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    // 打印提示
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 设置当前环境为生产环境</span>
process.env.NODE_ENV = <span class="hljs-string">'production'</span>

<span class="hljs-comment">// loading 插件</span>
<span class="hljs-comment">// https://github.com/sindresorhus/ora</span>
<span class="hljs-keyword">var</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ora'</span>)
<span class="hljs-comment">// 可以在 node 中执行`rm -rf`的工具</span>
<span class="hljs-comment">// https://github.com/isaacs/rimraf</span>
<span class="hljs-keyword">var</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-comment">// node自带的文件路径工具</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 在终端输出带颜色的文字</span>
<span class="hljs-comment">// https://github.com/chalk/chalk</span>
<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-comment">// 配置文件</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)

<span class="hljs-comment">// 在终端显示loading效果，并输出提示</span>
<span class="hljs-keyword">var</span> spinner = ora(<span class="hljs-string">'building for production...'</span>)
spinner.start()

<span class="hljs-comment">// 删除这个文件夹 （递归删除）</span>
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  <span class="hljs-comment">// 构建</span>
  webpack(webpackConfig, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, stats</span>) </span>{
    <span class="hljs-comment">// 构建成功</span>

    <span class="hljs-comment">// 停止 loading动画</span>
    spinner.stop()
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    process.stdout.write(stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
    }) + <span class="hljs-string">'\n\n'</span>)

    <span class="hljs-comment">// 打印提示</span>
    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">'  Build complete.\n'</span>))
    <span class="hljs-built_in">console</span>.log(chalk.yellow(
      <span class="hljs-string">'  Tip: built files are meant to be served over an HTTP server.\n'</span> +
      <span class="hljs-string">'  Opening index.html over file:// won\'t work.\n'</span>
    ))
  })
})</code></pre>
<h3 id="articleHeader11">webpack.prod.conf</h3>
<p>该文件，为生产环境中webpack的配置入口。同时，它也依赖于前面提到的<code>webpack.base.conf.js</code>、<code>utils.js</code>和<code>config/index.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// node自带的文件路径工具
var path = require('path')
// 工具函数集合
var utils = require('./utils')
var webpack = require('webpack')
// 配置文件
var config = require('../config')
// webpack 配置合并插件
var merge = require('webpack-merge')
// webpack 基本配置
var baseWebpackConfig = require('./webpack.base.conf')
// webpack 复制文件和文件夹的插件
// https://github.com/kevlened/copy-webpack-plugin
var CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成 html 并且注入到 .html 文件中的插件
// https://github.com/ampedandwired/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css的插件
// https://github.com/webpack-contrib/extract-text-webpack-plugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// webpack 优化压缩和优化 css 的插件
// https://github.com/NMFR/optimize-css-assets-webpack-plugin
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 如果当前环境为测试环境，则使用测试环境
// 否则，使用生产环境
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    // styleLoaders
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  // 是否开启 sourceMap
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    // 编译输出的静态资源根路径
    path: config.build.assetsRoot,
    // 编译输出的文件名
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
    // 此处，插入适当的环境
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // 压缩 js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // 提取 css
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // 压缩提取出来的 css
    // 可以删除来自不同组件的冗余代码
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // 更多选项 https://github.com/kangax/html-minifier#options-quick-reference
      },
      // 必须通过 CommonsChunkPlugin一致地处理多个 chunks
      chunksSortMode: 'dependency'
    }),
    // 分割公共 js 到独立的文件
    // https://webpack.js.org/guides/code-splitting-libraries/#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // node_modules中的任何所需模块都提取到vendor
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // 将webpack runtime 和模块清单 提取到独立的文件，以防止当 app包更新时导致公共 jsd hash也更新
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // 复制静态资源
    // https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// 开启 gzip 的情况时，给 webpack plugins添加 compression-webpack-plugin 插件
if (config.build.productionGzip) {
    // webpack 压缩插件
    // https://github.com/webpack-contrib/compression-webpack-plugin
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  // 向webpackconfig.plugins中加入下方的插件
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

// 开启包分析的情况时， 给 webpack plugins添加 webpack-bundle-analyzer 插件
if (config.build.bundleAnalyzerReport) {
  // https://github.com/th0r/webpack-bundle-analyzer
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// node自带的文件路径工具</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 工具函数集合</span>
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-comment">// 配置文件</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// webpack 配置合并插件</span>
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-comment">// webpack 基本配置</span>
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-comment">// webpack 复制文件和文件夹的插件</span>
<span class="hljs-comment">// https://github.com/kevlened/copy-webpack-plugin</span>
<span class="hljs-keyword">var</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-comment">// 自动生成 html 并且注入到 .html 文件中的插件</span>
<span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">// 提取css的插件</span>
<span class="hljs-comment">// https://github.com/webpack-contrib/extract-text-webpack-plugin</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-comment">// webpack 优化压缩和优化 css 的插件</span>
<span class="hljs-comment">// https://github.com/NMFR/optimize-css-assets-webpack-plugin</span>
<span class="hljs-keyword">var</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)

<span class="hljs-comment">// 如果当前环境为测试环境，则使用测试环境</span>
<span class="hljs-comment">// 否则，使用生产环境</span>
<span class="hljs-keyword">var</span> env = process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
  ? <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/test.env'</span>)
  : config.build.env

<span class="hljs-keyword">var</span> webpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// styleLoaders</span>
    rules: utils.styleLoaders({
      <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
      <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span>
    })
  },
  <span class="hljs-comment">// 是否开启 sourceMap</span>
  devtool: config.build.productionSourceMap ? <span class="hljs-string">'#source-map'</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-comment">// 编译输出的静态资源根路径</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// 编译输出的文件名</span>
    filename: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    <span class="hljs-comment">// 没有指定输出名的文件输出的文件名</span>
    chunkFilename: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串</span>
    <span class="hljs-comment">// 此处，插入适当的环境</span>
    <span class="hljs-comment">// http://vuejs.github.io/vue-loader/en/workflow/production.html</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-comment">// 压缩 js</span>
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      },
      <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// 提取 css</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>)
    }),
    <span class="hljs-comment">// 压缩提取出来的 css</span>
    <span class="hljs-comment">// 可以删除来自不同组件的冗余代码</span>
    <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
    <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin(),
    <span class="hljs-comment">// 将 index.html 作为入口，注入 html 代码后生成 index.html文件</span>
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
        ? <span class="hljs-string">'index.html'</span>
        : config.build.index,
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">minify</span>: {
        <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
        <span class="hljs-comment">// 更多选项 https://github.com/kangax/html-minifier#options-quick-reference</span>
      },
      <span class="hljs-comment">// 必须通过 CommonsChunkPlugin一致地处理多个 chunks</span>
      chunksSortMode: <span class="hljs-string">'dependency'</span>
    }),
    <span class="hljs-comment">// 分割公共 js 到独立的文件</span>
    <span class="hljs-comment">// https://webpack.js.org/guides/code-splitting-libraries/#commonschunkplugin</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, count</span>) </span>{
        <span class="hljs-comment">// node_modules中的任何所需模块都提取到vendor</span>
        <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
          ) === <span class="hljs-number">0</span>
        )
      }
    }),
    <span class="hljs-comment">// 将webpack runtime 和模块清单 提取到独立的文件，以防止当 app包更新时导致公共 jsd hash也更新</span>
    <span class="hljs-comment">// extract webpack runtime and module manifest to its own file in order to</span>
    <span class="hljs-comment">// prevent vendor hash from being updated whenever app bundle is updated</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'vendor'</span>]
    }),
    <span class="hljs-comment">// 复制静态资源</span>
    <span class="hljs-comment">// https://github.com/kevlened/copy-webpack-plugin</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]
      }
    ])
  ]
})

<span class="hljs-comment">// 开启 gzip 的情况时，给 webpack plugins添加 compression-webpack-plugin 插件</span>
<span class="hljs-keyword">if</span> (config.build.productionGzip) {
    <span class="hljs-comment">// webpack 压缩插件</span>
    <span class="hljs-comment">// https://github.com/webpack-contrib/compression-webpack-plugin</span>
  <span class="hljs-keyword">var</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>)

  <span class="hljs-comment">// 向webpackconfig.plugins中加入下方的插件</span>
  webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      <span class="hljs-attr">asset</span>: <span class="hljs-string">'[path].gz[query]'</span>,
      <span class="hljs-attr">algorithm</span>: <span class="hljs-string">'gzip'</span>,
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(
        <span class="hljs-string">'\\.('</span> +
        config.build.productionGzipExtensions.join(<span class="hljs-string">'|'</span>) +
        <span class="hljs-string">')$'</span>
      ),
      <span class="hljs-attr">threshold</span>: <span class="hljs-number">10240</span>,
      <span class="hljs-attr">minRatio</span>: <span class="hljs-number">0.8</span>
    })
  )
}

<span class="hljs-comment">// 开启包分析的情况时， 给 webpack plugins添加 webpack-bundle-analyzer 插件</span>
<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-comment">// https://github.com/th0r/webpack-bundle-analyzer</span>
  <span class="hljs-keyword">var</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}

<span class="hljs-built_in">module</span>.exports = webpackConfig</code></pre>
<h2 id="articleHeader12">其他</h2>
<p>如果你觉得在segmentfault的代码阅读体验不好，你可以到我github上将代码clone下来看。</p>
<p><a href="https://github.com/chenBright/vue-cli-webpack-analysis" rel="nofollow noreferrer" target="_blank">vue-cli-webpack-analysis</a></p>
<h2 id="articleHeader13">总结</h2>
<p>这次研究webpack配置的时候，我自己跟着源码敲了一遍（很笨的方法），然后，在github和webpack官网上查使用到的插件的作用和用法。经过这一次折腾，加深对webpack的认识。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli webpack配置分析

## 原文链接
[https://segmentfault.com/a/1190000008644830](https://segmentfault.com/a/1190000008644830)


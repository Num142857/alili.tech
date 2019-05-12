---
title: 'vue+vuecli+webapck2项目配置文件详解' 
date: 2018-12-09 2:30:08
hidden: true
slug: s1ir7xcr9ja
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.文件结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─build
│   ├─build.js
│   ├─check-versions.js
│   ├─dev-client.js
│   ├─dev-server.js
│   ├─utils.js
│   ├─vue-loader.conf.js
│   ├─webpack.base.conf.js
│   ├─webpack.dev.conf.js
│   ├─webpack.prod.conf.js
│   └─webpack.test.conf.js
├─config
│   ├─dev.env.js
│   ├─index.js
│   ├─prod.env.js
│   └─test.env.js
├─...
└─package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├─build
│   ├─build<span class="hljs-selector-class">.js</span>
│   ├─check-versions<span class="hljs-selector-class">.js</span>
│   ├─dev-client<span class="hljs-selector-class">.js</span>
│   ├─dev-server<span class="hljs-selector-class">.js</span>
│   ├─utils<span class="hljs-selector-class">.js</span>
│   ├─vue-loader<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│   ├─webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│   ├─webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│   ├─webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│   └─webpack<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
├─config
│   ├─dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
│   ├─index<span class="hljs-selector-class">.js</span>
│   ├─prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
│   └─test<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
├─...
└─package.json</code></pre>
<h2 id="articleHeader1">2.package.json文件</h2>
<p>package.json里面的scripts字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;,
    &quot;unit&quot;: &quot;cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run&quot;,
    &quot;e2e&quot;: &quot;node test/e2e/runner.js&quot;,
    &quot;test&quot;: &quot;npm run unit &amp;&amp; npm run e2e&quot;,
    &quot;lint&quot;: &quot;eslint --ext .js,.vue src test/unit/specs test/e2e/specs&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>,
    <span class="hljs-string">"unit"</span>: <span class="hljs-string">"cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run"</span>,
    <span class="hljs-string">"e2e"</span>: <span class="hljs-string">"node test/e2e/runner.js"</span>,
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"npm run unit &amp;&amp; npm run e2e"</span>,
    <span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint --ext .js,.vue src test/unit/specs test/e2e/specs"</span>
  }</code></pre>
<p>运行<code>”npm run dev”</code>：执行<code>build/dev-server.js</code>文件<br>运行<code>”npm run build”</code>：执行<code>build/build.js</code>文件</p>
<h2 id="articleHeader2">3.build文件夹分析</h2>
<h3 id="articleHeader3">build/dev-server.js</h3>
<p>该文件主要作用：</p>
<ul>
<li>检查node和npm的版本、引入相关插件和配置</li>
<li>webpack对源码进行编译打包并返回compiler对象</li>
<li>创建express服务器</li>
<li>配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）</li>
<li>挂载代理服务和中间件</li>
<li>配置静态资源</li>
<li>启动服务器监听特定端口（8080）</li>
<li>自动打开浏览器并打开特定网址（localhost:8080）</li>
</ul>
<blockquote>说明： <code>express</code>服务器提供静态文件服务，不过它还使用了<code>http-proxy-middleware</code>，一个http请求代理的中间件。前端开发过程中需要使用到后台的API的话，可以通过配置<code>proxyTable</code>来将相应的后台请求代理到专用的API服务器。</blockquote>
<p>代码详细注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 检查NodeJS和npm的版本
require('./check-versions')()

// 获取基本配置
var config = require('../config')
// 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的dev环境配置作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// opn是一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
// http-proxy-middleware是一个express中间件，用于将http请求代理到其他服务器
// 例：localhost:8080/api/xxx  -->  localhost:3000/api/xxx
// 这里使用该插件可以将前端开发中涉及到的请求代理到提供服务的后台服务器上，方便与服务器对接
var proxyMiddleware = require('http-proxy-middleware')
// 开发环境下的webpack配置
var webpackConfig = require('./webpack.dev.conf')

// dev-server 监听的端口，如果没有在命令行传入端口号，则使用config.dev.port设置的端口，例如8080
var port = process.env.PORT || config.dev.port
// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// HTTP代理表，指定规则，将某些API请求代理到相应的服务器
var proxyTable = config.dev.proxyTable
// 创建express服务器
var app = express()
// webpack根据配置开始编译打包源码并返回compiler对象
var compiler = webpack(webpackConfig)
// webpack-dev-middleware将webpack编译打包后得到的产品文件存放在内存中而没有写进磁盘
// 将这个中间件挂到express上使用之后即可提供这些编译后的产品文件服务
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath, // 设置访问路径为webpack配置中的output里面所对应的路径
  quiet: true // 设置为true，使其不要在控制台输出日志
})
// webpack-hot-middleware，用于实现热重载功能的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false, // 关闭控制台的日志输出
  heartbeat: 2000 // 发送心跳包的频率
})
// webpack(重新)编译打包完成后并将js、css等文件inject到html文件之后，通过热重载中间件强制页面刷新
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 根据 proxyTable 中的代理请求配置来设置express服务器的http代理规则
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  // 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
// 重定向不存在的URL，用于支持SPA（单页应用）
// 例如使用vue-router并开启了history模式
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 挂载webpack-dev-middleware中间件，提供webpack编译打包后的产品文件服务
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 挂载热重载中间件
app.use(hotMiddleware)

// serve pure static assets
// 提供static文件夹上的静态文件服务
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// 访问链接
var uri = 'http://localhost:' + port

// 创建promise，在应用服务启动之后resolve
// 便于外部文件require了这个dev-server之后的代码编写
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
// webpack-dev-middleware等待webpack完成所有编译打包之后输出提示语到控制台，表明服务正式启动
// 服务正式启动才自动打开浏览器进入页面
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

// 启动express服务器并监听相应的端口
var server = app.listen(port)

// 暴露本模块的功能给外部使用，例如下面这种用法
// var devServer = require('./build/dev-server')
// devServer.ready.then(() => {...})
// if (...) { devServer.close() }
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 检查NodeJS和npm的版本</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./check-versions'</span>)()

<span class="hljs-comment">// 获取基本配置</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的dev环境配置作为当前的环境</span>
<span class="hljs-keyword">if</span> (!process.env.NODE_ENV) {
  process.env.NODE_ENV = <span class="hljs-built_in">JSON</span>.parse(config.dev.env.NODE_ENV)
}

<span class="hljs-comment">// opn是一个可以调用默认软件打开网址、图片、文件等内容的插件</span>
<span class="hljs-comment">// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080</span>
<span class="hljs-keyword">var</span> opn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'opn'</span>)
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-comment">// http-proxy-middleware是一个express中间件，用于将http请求代理到其他服务器</span>
<span class="hljs-comment">// 例：localhost:8080/api/xxx  --&gt;  localhost:3000/api/xxx</span>
<span class="hljs-comment">// 这里使用该插件可以将前端开发中涉及到的请求代理到提供服务的后台服务器上，方便与服务器对接</span>
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)
<span class="hljs-comment">// 开发环境下的webpack配置</span>
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.dev.conf'</span>)

<span class="hljs-comment">// dev-server 监听的端口，如果没有在命令行传入端口号，则使用config.dev.port设置的端口，例如8080</span>
<span class="hljs-keyword">var</span> port = process.env.PORT || config.dev.port
<span class="hljs-comment">// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false</span>
<span class="hljs-keyword">var</span> autoOpenBrowser = !!config.dev.autoOpenBrowser
<span class="hljs-comment">// HTTP代理表，指定规则，将某些API请求代理到相应的服务器</span>
<span class="hljs-keyword">var</span> proxyTable = config.dev.proxyTable
<span class="hljs-comment">// 创建express服务器</span>
<span class="hljs-keyword">var</span> app = express()
<span class="hljs-comment">// webpack根据配置开始编译打包源码并返回compiler对象</span>
<span class="hljs-keyword">var</span> compiler = webpack(webpackConfig)
<span class="hljs-comment">// webpack-dev-middleware将webpack编译打包后得到的产品文件存放在内存中而没有写进磁盘</span>
<span class="hljs-comment">// 将这个中间件挂到express上使用之后即可提供这些编译后的产品文件服务</span>
<span class="hljs-keyword">var</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)(compiler, {
  <span class="hljs-attr">publicPath</span>: webpackConfig.output.publicPath, <span class="hljs-comment">// 设置访问路径为webpack配置中的output里面所对应的路径</span>
  quiet: <span class="hljs-literal">true</span> <span class="hljs-comment">// 设置为true，使其不要在控制台输出日志</span>
})
<span class="hljs-comment">// webpack-hot-middleware，用于实现热重载功能的中间件</span>
<span class="hljs-keyword">var</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)(compiler, {
  <span class="hljs-attr">log</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 关闭控制台的日志输出</span>
  heartbeat: <span class="hljs-number">2000</span> <span class="hljs-comment">// 发送心跳包的频率</span>
})
<span class="hljs-comment">// webpack(重新)编译打包完成后并将js、css等文件inject到html文件之后，通过热重载中间件强制页面刷新</span>
compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compilation</span>) </span>{
  compilation.plugin(<span class="hljs-string">'html-webpack-plugin-after-emit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data, cb</span>) </span>{
    hotMiddleware.publish({ <span class="hljs-attr">action</span>: <span class="hljs-string">'reload'</span> })
    cb()
  })
})

<span class="hljs-comment">// 根据 proxyTable 中的代理请求配置来设置express服务器的http代理规则</span>
<span class="hljs-built_in">Object</span>.keys(proxyTable).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
  <span class="hljs-keyword">var</span> options = proxyTable[context]
  <span class="hljs-comment">// 格式化options，例如将'www.example.com'变成{ target: 'www.example.com' }</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options === <span class="hljs-string">'string'</span>) {
    options = { <span class="hljs-attr">target</span>: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

<span class="hljs-comment">// handle fallback for HTML5 history API</span>
<span class="hljs-comment">// 重定向不存在的URL，用于支持SPA（单页应用）</span>
<span class="hljs-comment">// 例如使用vue-router并开启了history模式</span>
app.use(<span class="hljs-built_in">require</span>(<span class="hljs-string">'connect-history-api-fallback'</span>)())

<span class="hljs-comment">// serve webpack bundle output</span>
<span class="hljs-comment">// 挂载webpack-dev-middleware中间件，提供webpack编译打包后的产品文件服务</span>
app.use(devMiddleware)

<span class="hljs-comment">// enable hot-reload and state-preserving</span>
<span class="hljs-comment">// compilation error display</span>
<span class="hljs-comment">// 挂载热重载中间件</span>
app.use(hotMiddleware)

<span class="hljs-comment">// serve pure static assets</span>
<span class="hljs-comment">// 提供static文件夹上的静态文件服务</span>
<span class="hljs-keyword">var</span> staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static(<span class="hljs-string">'./static'</span>))

<span class="hljs-comment">// 访问链接</span>
<span class="hljs-keyword">var</span> uri = <span class="hljs-string">'http://localhost:'</span> + port

<span class="hljs-comment">// 创建promise，在应用服务启动之后resolve</span>
<span class="hljs-comment">// 便于外部文件require了这个dev-server之后的代码编写</span>
<span class="hljs-keyword">var</span> _resolve
<span class="hljs-keyword">var</span> readyPromise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
  _resolve = resolve
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt; Starting dev server...'</span>)
<span class="hljs-comment">// webpack-dev-middleware等待webpack完成所有编译打包之后输出提示语到控制台，表明服务正式启动</span>
<span class="hljs-comment">// 服务正式启动才自动打开浏览器进入页面</span>
devMiddleware.waitUntilValid(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt; Listening at '</span> + uri + <span class="hljs-string">'\n'</span>)
  <span class="hljs-comment">// when env is testing, don't need open it</span>
  <span class="hljs-keyword">if</span> (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== <span class="hljs-string">'testing'</span>) {
    opn(uri)
  }
  _resolve()
})

<span class="hljs-comment">// 启动express服务器并监听相应的端口</span>
<span class="hljs-keyword">var</span> server = app.listen(port)

<span class="hljs-comment">// 暴露本模块的功能给外部使用，例如下面这种用法</span>
<span class="hljs-comment">// var devServer = require('./build/dev-server')</span>
<span class="hljs-comment">// devServer.ready.then(() =&gt; {...})</span>
<span class="hljs-comment">// if (...) { devServer.close() }</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">ready</span>: readyPromise,
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    server.close()
  }
}</code></pre>
<h3 id="articleHeader4">build/webpack.base.conf.js</h3>
<p>主要作用：</p>
<ul>
<li>配置webpack编译入口</li>
<li>配置webpack输出路径和命名规则</li>
<li>配置模块resolve规则</li>
<li>配置不同类型模块的处理规则</li>
</ul>
<blockquote>说明： 这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面另行配置。</blockquote>
<p>代码详细注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // webpack入口文件
  entry: {
    app: './src/main.js'
  },
  // webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 模块resolve的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    symlinks: false
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      {// 对src和test文件夹下的.js和.vue文件使用eslint-loader进行代码规范检查
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {// 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {// 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {// 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {// 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)

<span class="hljs-comment">// 获取绝对路径</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// webpack入口文件</span>
  entry: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/main.js'</span>
  },
  <span class="hljs-comment">// webpack输出路径和命名规则</span>
  output: {
    <span class="hljs-comment">// webpack输出的目标文件夹路径（例如：/dist）</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// webpack输出bundle文件命名格式</span>
    filename: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-comment">// webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）</span>
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  <span class="hljs-comment">// 模块resolve的规则</span>
  resolve: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-comment">// 别名，方便引用模块，例如有了别名之后，</span>
    <span class="hljs-comment">// import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'</span>
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
    },
    <span class="hljs-attr">symlinks</span>: <span class="hljs-literal">false</span>
  },
  <span class="hljs-comment">// 不同类型模块的处理规则</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {<span class="hljs-comment">// 对src和test文件夹下的.js和.vue文件使用eslint-loader进行代码规范检查</span>
        test: <span class="hljs-regexp">/\.(js|vue)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>,
        <span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>)
        }
      },
      {<span class="hljs-comment">// 对所有.vue文件使用vue-loader进行编译</span>
        test: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
      },
      {<span class="hljs-comment">// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5</span>
        test: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)]
      },
      {<span class="hljs-comment">// 对图片资源文件使用url-loader</span>
        test: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// 小于10K的图片转成base64编码的dataURL字符串写到代码中</span>
          limit: <span class="hljs-number">10000</span>,
          <span class="hljs-comment">// 其他的图片转移到静态资源文件夹</span>
          name: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
      },
      {<span class="hljs-comment">// 对多媒体资源文件使用url-loader</span>
        test: <span class="hljs-regexp">/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// 小于10K的资源转成base64编码的dataURL字符串写到代码中</span>
          limit: <span class="hljs-number">10000</span>,
          <span class="hljs-comment">// 其他的资源转移到静态资源文件夹</span>
          name: utils.assetsPath(<span class="hljs-string">'media/[name].[hash:7].[ext]'</span>)
        }
      },
      {<span class="hljs-comment">// 对字体资源文件使用url-loader</span>
        test: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// 小于10K的资源转成base64编码的dataURL字符串写到代码中</span>
          limit: <span class="hljs-number">10000</span>,
          <span class="hljs-comment">// 其他的资源转移到静态资源文件夹</span>
          name: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  }
}</code></pre>
<h3 id="articleHeader5">build/webpack.dev.conf.js</h3>
<p>主要作用：</p>
<ul>
<li>将webpack的热重载客户端代码添加到每个entry对应的应用</li>
<li>合并基础的webpack配置</li>
<li>配置样式文件的处理规则，styleLoaders</li>
<li>配置Source Maps</li>
<li>配置webpack插件</li>
</ul>
<p>详细代码注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
// webpack-merge是一个可以合并数组和对象的插件
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中
// 即自动在index.html里面加上<link>和<script>标签引用webpack打包后的文件
var HtmlWebpackPlugin = require('html-webpack-plugin')
// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
// 给每个入口页面(应用)加上dev-client，用于跟dev-server的热重载插件通信，实现热更新
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    // 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders
    // 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // 使用这种source-map更快
  devtool: '#cheap-module-eval-source-map',
  // webpack插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // 开启webpack热更新功能
    new webpack.HotModuleReplacementPlugin(),
    // webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // 自动将依赖注入html模板，并输出最终的html文件到目标文件夹
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> utils = require(<span class="hljs-string">'./utils'</span>)
<span class="hljs-selector-tag">var</span> webpack = require(<span class="hljs-string">'webpack'</span>)
<span class="hljs-selector-tag">var</span> config = require(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// webpack-merge是一个可以合并数组和对象的插件</span>
<span class="hljs-selector-tag">var</span> merge = require(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-selector-tag">var</span> baseWebpackConfig = require(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-comment">// html-webpack-plugin用于将webpack编译打包后的产品文件注入到html模板中</span>
<span class="hljs-comment">// 即自动在index.html里面加上&lt;link&gt;和&lt;script&gt;标签引用webpack打包后的文件</span>
<span class="hljs-selector-tag">var</span> HtmlWebpackPlugin = require(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">// friendly-errors-webpack-plugin用于更友好地输出webpack的警告、错误等信息</span>
<span class="hljs-selector-tag">var</span> FriendlyErrorsPlugin = require(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)

<span class="hljs-comment">// add hot-reload related code to entry chunks</span>
<span class="hljs-comment">// 给每个入口页面(应用)加上dev-client，用于跟dev-server的热重载插件通信，实现热更新</span>
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name] = [<span class="hljs-string">'./build/dev-client'</span>].concat(baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name])
})

module<span class="hljs-selector-class">.exports</span> = merge(baseWebpackConfig, {
  module: {
    <span class="hljs-comment">// 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders</span>
    <span class="hljs-comment">// 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader</span>
    rules: utils.styleLoaders({ sourceMap: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.cssSourceMap</span> })
  },
  <span class="hljs-comment">// cheap-module-eval-source-map is faster for development</span>
  <span class="hljs-comment">// 使用这种source-map更快</span>
  devtool: <span class="hljs-string">'#cheap-module-eval-source-map'</span>,
  <span class="hljs-comment">// webpack插件</span>
  plugins: [
    new webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.env</span>
    }),
    <span class="hljs-comment">// 开启webpack热更新功能</span>
    new webpack.HotModuleReplacementPlugin(),
    <span class="hljs-comment">// webpack编译过程中出错的时候跳过报错阶段，不会阻塞编译，在编译结束后报错</span>
    new webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// 自动将依赖注入html模板，并输出最终的html文件到目标文件夹</span>
    new HtmlWebpackPlugin({
      filename: <span class="hljs-string">'index.html'</span>,
      template: <span class="hljs-string">'index.html'</span>,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})</code></pre>
<h3 id="articleHeader6">build/webpack.prod.conf.js</h3>
<p>主要作用：</p>
<ul>
<li>合并基础的webpack配置</li>
<li>配置样式文件的处理规则，styleLoaders</li>
<li>配置webpack的输出</li>
<li>配置webpack插件</li>
<li>gzip模式下的webpack插件配置</li>
<li>webpack-bundle分析</li>
</ul>
<blockquote>说明： webpack插件里面多了丑化压缩代码以及抽离css文件等插件。</blockquote>
<p>详细代码注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
/* copy-webpack-plugin，用于将static中的静态文件复制到产品文件夹dist */
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
/* optimize-css-assets-webpack-plugin，用于优化和最小化css资源  */
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    /* 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders */
    /* 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader */
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  /* 是否使用source-map */
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  /* webpack输出路径和命名规则 */
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  /* webpack插件 */
  plugins: [
    /* http://vuejs.github.io/vue-loader/en/workflow/production.html */
    new webpack.DefinePlugin({
      'process.env': env
    }),
    /* 丑化压缩JS代码 */
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    /* extract css into its own file */
    /* 将css提取到单独的文件 */
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    /* Compress extracted CSS. We are using this plugin so that possible */
    /* duplicated CSS from different components can be deduped. */
    /* 优化、最小化css代码，如果只简单使用extract-text-plugin可能会造成css重复 */
    /* 具体原因可以看npm上面optimize-css-assets-webpack-plugin的介绍 */
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    /* generate dist index.html with correct asset hash for caching. */
    /* you can customize output by editing /index.html */
    /* see https://github.com/ampedandwired/html-webpack-plugin */
    /* 将产品文件的引用注入到index.html */
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        /* 删除index.html中的注释 */
        removeComments: true,
        /* 删除index.html中的空格 */
        collapseWhitespace: true,
        /* 删除各种html标签属性值的双引号 */
        removeAttributeQuotes: true
        /* more options: */
        /* https://github.com/kangax/html-minifier#options-quick-reference */
      },
      /* necessary to consistently work with multiple chunks via CommonsChunkPlugin */
      /* 注入依赖的时候按照依赖先后顺序进行注入，比如，需要先注入vendor.js，再注入app.js */
      chunksSortMode: 'dependency'
    }),
    /* keep module.id stable when vender modules does not change */
    new webpack.HashedModuleIdsPlugin(),
    /* split vendor js into its own file */
    /* 将所有从node_modules中引入的js提取到vendor.js，即抽取库文件 */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        /* any required modules inside node_modules are extracted to vendor */
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    /* extract webpack runtime and module manifest to its own file in order to */
    /* prevent vendor hash from being updated whenever app bundle is updated */
    /* 从vendor中提取出manifest，原因如上 */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    /* copy custom static assets */
    /* 将static文件夹里面的静态资源复制到dist/static */
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

/* 如果开启了产品gzip压缩，则利用插件将构建后的产品文件进行压缩 */
if (config.build.productionGzip) {
  /* 一个用于压缩的webpack插件 */
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      /* 压缩算法 */
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

/* 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告 */
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-comment">/* copy-webpack-plugin，用于将static中的静态文件复制到产品文件夹dist */</span>
<span class="hljs-keyword">var</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-comment">/* optimize-css-assets-webpack-plugin，用于优化和最小化css资源  */</span>
<span class="hljs-keyword">var</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)

<span class="hljs-keyword">var</span> env = config.build.env

<span class="hljs-keyword">var</span> webpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-keyword">module</span>: {
    <span class="hljs-comment">/* 样式文件的处理规则，对css/sass/scss等不同内容使用相应的styleLoaders */</span>
    <span class="hljs-comment">/* 由utils配置出各种类型的预处理语言所需要使用的loader，例如sass需要使用sass-loader */</span>
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: <span class="hljs-literal">true</span>
    })
  },
  <span class="hljs-comment">/* 是否使用source-map */</span>
  devtool: config.build.productionSourceMap ? <span class="hljs-string">'#source-map'</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-comment">/* webpack输出路径和命名规则 */</span>
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    chunkFilename: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  <span class="hljs-comment">/* webpack插件 */</span>
  plugins: [
    <span class="hljs-comment">/* http://vuejs.github.io/vue-loader/en/workflow/production.html */</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-comment">/* 丑化压缩JS代码 */</span>
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: <span class="hljs-literal">false</span>
      },
      sourceMap: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">/* extract css into its own file */</span>
    <span class="hljs-comment">/* 将css提取到单独的文件 */</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      filename: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>)
    }),
    <span class="hljs-comment">/* Compress extracted CSS. We are using this plugin so that possible */</span>
    <span class="hljs-comment">/* duplicated CSS from different components can be deduped. */</span>
    <span class="hljs-comment">/* 优化、最小化css代码，如果只简单使用extract-text-plugin可能会造成css重复 */</span>
    <span class="hljs-comment">/* 具体原因可以看npm上面optimize-css-assets-webpack-plugin的介绍 */</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: <span class="hljs-literal">true</span>
      }
    }),
    <span class="hljs-comment">/* generate dist index.html with correct asset hash for caching. */</span>
    <span class="hljs-comment">/* you can customize output by editing /index.html */</span>
    <span class="hljs-comment">/* see https://github.com/ampedandwired/html-webpack-plugin */</span>
    <span class="hljs-comment">/* 将产品文件的引用注入到index.html */</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: config.build.index,
      template: <span class="hljs-string">'index.html'</span>,
      inject: <span class="hljs-literal">true</span>,
      minify: {
        <span class="hljs-comment">/* 删除index.html中的注释 */</span>
        removeComments: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">/* 删除index.html中的空格 */</span>
        collapseWhitespace: <span class="hljs-literal">true</span>,
        <span class="hljs-comment">/* 删除各种html标签属性值的双引号 */</span>
        removeAttributeQuotes: <span class="hljs-literal">true</span>
        <span class="hljs-comment">/* more options: */</span>
        <span class="hljs-comment">/* https://github.com/kangax/html-minifier#options-quick-reference */</span>
      },
      <span class="hljs-comment">/* necessary to consistently work with multiple chunks via CommonsChunkPlugin */</span>
      <span class="hljs-comment">/* 注入依赖的时候按照依赖先后顺序进行注入，比如，需要先注入vendor.js，再注入app.js */</span>
      chunksSortMode: <span class="hljs-string">'dependency'</span>
    }),
    <span class="hljs-comment">/* keep module.id stable when vender modules does not change */</span>
    <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),
    <span class="hljs-comment">/* split vendor js into its own file */</span>
    <span class="hljs-comment">/* 将所有从node_modules中引入的js提取到vendor.js，即抽取库文件 */</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      name: <span class="hljs-string">'vendor'</span>,
      minChunks: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-built_in">module</span>, count</span>) </span>{
        <span class="hljs-comment">/* any required modules inside node_modules are extracted to vendor */</span>
        <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
          ) === <span class="hljs-number">0</span>
        )
      }
    }),
    <span class="hljs-comment">/* extract webpack runtime and module manifest to its own file in order to */</span>
    <span class="hljs-comment">/* prevent vendor hash from being updated whenever app bundle is updated */</span>
    <span class="hljs-comment">/* 从vendor中提取出manifest，原因如上 */</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      name: <span class="hljs-string">'manifest'</span>,
      chunks: [<span class="hljs-string">'vendor'</span>]
    }),
    <span class="hljs-comment">/* copy custom static assets */</span>
    <span class="hljs-comment">/* 将static文件夹里面的静态资源复制到dist/static */</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-keyword">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        to: config.build.assetsSubDirectory,
        ignore: [<span class="hljs-string">'.*'</span>]
      }
    ])
  ]
})

<span class="hljs-comment">/* 如果开启了产品gzip压缩，则利用插件将构建后的产品文件进行压缩 */</span>
<span class="hljs-keyword">if</span> (config.build.productionGzip) {
  <span class="hljs-comment">/* 一个用于压缩的webpack插件 */</span>
  <span class="hljs-keyword">var</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>)

  webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      asset: <span class="hljs-string">'[path].gz[query]'</span>,
      <span class="hljs-comment">/* 压缩算法 */</span>
      algorithm: <span class="hljs-string">'gzip'</span>,
      test: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(
        <span class="hljs-string">'\\.('</span> +
        config.build.productionGzipExtensions.join(<span class="hljs-string">'|'</span>) +
        <span class="hljs-string">')$'</span>
      ),
      threshold: <span class="hljs-number">10240</span>,
      minRatio: <span class="hljs-number">0.8</span>
    })
  )
}

<span class="hljs-comment">/* 如果启动了report，则通过插件给出webpack构建打包后的产品文件分析报告 */</span>
<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-keyword">var</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}

<span class="hljs-built_in">module</span>.exports = webpackConfig</code></pre>
<h3 id="articleHeader7">build/utils.js</h3>
<p><code>utils</code>提供工具函数，包括生成处理各种样式语言的<code>loader</code>，获取资源文件存放路径的工具函数。</p>
<ul>
<li>计算资源文件存放路径</li>
<li>生成<code>cssLoaders</code>用于加载.vue文件中的样式</li>
<li>生成<code>styleLoaders</code>用于加载不在.vue文件中的单独存在的样式文件</li>
</ul>
<p>详细代码注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var config = require('../config')
// extract-text-webpack-plugin可以提取bundle中的特定文本，将提取后的文本单独存放到另外的文件
// 这里用来提取css样式
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 资源文件的存放路径
exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// 生成css、sass、scss等各种用来编写样式的语言所对应的loader配置
exports.cssLoaders = function (options) {
  options = options || {}
  // css-loader配置
  var cssLoader = {
    loader: 'css-loader',
    options: {
      // 是否最小化
      minimize: process.env.NODE_ENV === 'production',
      // 是否使用source-map
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  // 生成各种loader配置，并且配置了extract-text-pulgin
  function generateLoaders (loader, loaderOptions) {
    // 默认是css-loader
    var loaders = [cssLoader]
    // 如果非css，则增加一个处理预编译语言的loader并设好相关配置属性
    // 例如generateLoaders('less')，这里就会push一个less-loader
    // less-loader先将less编译成css，然后再由css-loader去处理css
    // 其他sass、scss等语言也是一样的过程
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // 配置extract-text-plugin提取样式
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      // 无需提取样式则简单使用vue-style-loader配合各种样式loader去处理<style>里面的样式
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // 得到各种不同处理样式的语言所对应的loader
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

// Generate loaders for standalone style files (outside of .vue)
// 生成处理单独的.css、.sass、.scss等样式文件的规则
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
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// extract-text-webpack-plugin可以提取bundle中的特定文本，将提取后的文本单独存放到另外的文件</span>
<span class="hljs-comment">// 这里用来提取css样式</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)

<span class="hljs-comment">// 资源文件的存放路径</span>
exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">var</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">'production'</span>
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

<span class="hljs-comment">// 生成css、sass、scss等各种用来编写样式的语言所对应的loader配置</span>
exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {}
  <span class="hljs-comment">// css-loader配置</span>
  <span class="hljs-keyword">var</span> cssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-comment">// 是否最小化</span>
      minimize: process.env.NODE_ENV === <span class="hljs-string">'production'</span>,
      <span class="hljs-comment">// 是否使用source-map</span>
      sourceMap: options.sourceMap
    }
  }

  <span class="hljs-comment">// generate loader string to be used with extract text plugin</span>
  <span class="hljs-comment">// 生成各种loader配置，并且配置了extract-text-pulgin</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{
    <span class="hljs-comment">// 默认是css-loader</span>
    <span class="hljs-keyword">var</span> loaders = [cssLoader]
    <span class="hljs-comment">// 如果非css，则增加一个处理预编译语言的loader并设好相关配置属性</span>
    <span class="hljs-comment">// 例如generateLoaders('less')，这里就会push一个less-loader</span>
    <span class="hljs-comment">// less-loader先将less编译成css，然后再由css-loader去处理css</span>
    <span class="hljs-comment">// 其他sass、scss等语言也是一样的过程</span>
    <span class="hljs-keyword">if</span> (loader) {
      loaders.push({
        <span class="hljs-attr">loader</span>: loader + <span class="hljs-string">'-loader'</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-built_in">Object</span>.assign({}, loaderOptions, {
          <span class="hljs-attr">sourceMap</span>: options.sourceMap
        })
      })
    }

    <span class="hljs-comment">// Extract CSS when that option is specified</span>
    <span class="hljs-comment">// (which is the case during production build)</span>
    <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-comment">// 配置extract-text-plugin提取样式</span>
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        <span class="hljs-attr">use</span>: loaders,
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">'vue-style-loader'</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// 无需提取样式则简单使用vue-style-loader配合各种样式loader去处理&lt;style&gt;里面的样式</span>
      <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }
  }

  <span class="hljs-comment">// https://vue-loader.vuejs.org/en/configurations/extract-css.html</span>
  <span class="hljs-comment">// 得到各种不同处理样式的语言所对应的loader</span>
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

<span class="hljs-comment">// Generate loaders for standalone style files (outside of .vue)</span>
<span class="hljs-comment">// 生成处理单独的.css、.sass、.scss等样式文件的规则</span>
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
<h3 id="articleHeader8">build/vue-loader.conf.js</h3>
<p>vue-loader.conf的配置比较简单，详细代码注释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // 处理.vue文件中的样式
  loaders: utils.cssLoaders({
    // 是否打开source-map
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    // 是否提取样式到单独的文件
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    })
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> isProduction = process.env.NODE_ENV === <span class="hljs-string">'production'</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 处理.vue文件中的样式</span>
  loaders: utils.cssLoaders({
    <span class="hljs-comment">// 是否打开source-map</span>
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    <span class="hljs-comment">// 是否提取样式到单独的文件</span>
    extract: isProduction
  }),
  <span class="hljs-attr">postcss</span>: [
    <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)({
      <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'iOS &gt;= 7'</span>, <span class="hljs-string">'Android &gt;= 4.1'</span>]
    })
  ]
}</code></pre>
<h3 id="articleHeader9">build/dev-client.js</h3>
<p><code>dev-client.js</code>里面主要写了浏览器端代码，用于实现<code>webpack</code>的热更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* eslint-disable */
// 实现浏览器端的EventSource，用于跟服务器双向通信
// webpack热重载客户端跟dev-server上的热重载插件之间需要进行双向通信
// 服务端webpack重新编译后，会向客户端推送信息，告诉客户端进行更新
require('eventsource-polyfill')
// webpack热重载客户端
var hotClient = require('webpack-hot-middleware/client?noInfo=true&amp;reload=true')

// 客户端收到更新动作，执行页面刷新
hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* eslint-disable */</span>
<span class="hljs-comment">// 实现浏览器端的EventSource，用于跟服务器双向通信</span>
<span class="hljs-comment">// webpack热重载客户端跟dev-server上的热重载插件之间需要进行双向通信</span>
<span class="hljs-comment">// 服务端webpack重新编译后，会向客户端推送信息，告诉客户端进行更新</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'eventsource-polyfill'</span>)
<span class="hljs-comment">// webpack热重载客户端</span>
<span class="hljs-keyword">var</span> hotClient = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware/client?noInfo=true&amp;reload=true'</span>)

<span class="hljs-comment">// 客户端收到更新动作，执行页面刷新</span>
hotClient.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">if</span> (event.action === <span class="hljs-string">'reload'</span>) {
    <span class="hljs-built_in">window</span>.location.reload()
  }
})</code></pre>
<h3 id="articleHeader10">build/build.js</h3>
<p>执行”<code>npm run build</code>”的时候首先执行的是<code>build/build.js</code>文件，主要作用：</p>
<ul>
<li>loading动画</li>
<li>删除目标文件夹</li>
<li>执行webpack构建</li>
<li>输出信息</li>
</ul>
<p>详细代码解释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 检查NodeJS和npm的版本
require('./check-versions')()

process.env.NODE_ENV = 'production'

// ora，一个可以在终端显示spinner的插件
var ora = require('ora')
// rm，用于删除文件或文件夹的插件
var rm = require('rimraf')
var path = require('path')
// chalk，用于在控制台输出带颜色字体的插件
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start() // 开启loading动画

// 首先将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件
// 删除完成后才开始webpack构建打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 检查NodeJS和npm的版本</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./check-versions'</span>)()

process.env.NODE_ENV = <span class="hljs-string">'production'</span>

<span class="hljs-comment">// ora，一个可以在终端显示spinner的插件</span>
<span class="hljs-keyword">var</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ora'</span>)
<span class="hljs-comment">// rm，用于删除文件或文件夹的插件</span>
<span class="hljs-keyword">var</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// chalk，用于在控制台输出带颜色字体的插件</span>
<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)

<span class="hljs-keyword">var</span> spinner = ora(<span class="hljs-string">'building for production...'</span>)
spinner.start() <span class="hljs-comment">// 开启loading动画</span>

<span class="hljs-comment">// 首先将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件</span>
<span class="hljs-comment">// 删除完成后才开始webpack构建打包</span>
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  <span class="hljs-comment">// 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序</span>
  webpack(webpackConfig, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, stats</span>) </span>{
    spinner.stop()
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    process.stdout.write(stats.toString({
      colors: <span class="hljs-literal">true</span>,
      modules: <span class="hljs-literal">false</span>,
      children: <span class="hljs-literal">false</span>,
      chunks: <span class="hljs-literal">false</span>,
      chunkModules: <span class="hljs-literal">false</span>
    }) + <span class="hljs-string">'\n\n'</span>)

    <span class="hljs-keyword">if</span> (stats.hasErrors()) {
      <span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">'  Build failed with errors.\n'</span>))
      process.exit(<span class="hljs-number">1</span>)
    }

    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">'  Build complete.\n'</span>))
    <span class="hljs-built_in">console</span>.log(chalk.yellow(
      <span class="hljs-string">'  Tip: built files are meant to be served over an HTTP server.\n'</span> +
      <span class="hljs-string">'  Opening index.html over file:// won\'t work.\n'</span>
    ))
  })
})</code></pre>
<h3 id="articleHeader11">build/check-versions.js</h3>
<p><code>check-version.js</code>完成对node和npm的版本检测,详细代码解释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// chalk, 用于在控制台输出带颜色字体的插件
var chalk = require('chalk')
// semver, 语义化版本检查插件（The semantic version parser used by npm）
var semver = require('semver')
var packageConfig = require('../package.json')
// shelljs, 执行Unix命令行的插件
var shell = require('shelljs')
// 开辟子进程执行指令cmd并返回结果
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

// node和npm版本需求
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  var warnings = []
  // 依次判断版本是否符合要求
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  // 如果有警告则将其输出到控制台
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// chalk, 用于在控制台输出带颜色字体的插件</span>
<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-comment">// semver, 语义化版本检查插件（The semantic version parser used by npm）</span>
<span class="hljs-keyword">var</span> semver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'semver'</span>)
<span class="hljs-keyword">var</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)
<span class="hljs-comment">// shelljs, 执行Unix命令行的插件</span>
<span class="hljs-keyword">var</span> shell = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shelljs'</span>)
<span class="hljs-comment">// 开辟子进程执行指令cmd并返回结果</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exec</span> (<span class="hljs-params">cmd</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).execSync(cmd).toString().trim()
}

<span class="hljs-comment">// node和npm版本需求</span>
<span class="hljs-keyword">var</span> versionRequirements = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'node'</span>,
    <span class="hljs-attr">currentVersion</span>: semver.clean(process.version),
    <span class="hljs-attr">versionRequirement</span>: packageConfig.engines.node
  }
]

<span class="hljs-keyword">if</span> (shell.which(<span class="hljs-string">'npm'</span>)) {
  versionRequirements.push({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'npm'</span>,
    <span class="hljs-attr">currentVersion</span>: exec(<span class="hljs-string">'npm --version'</span>),
    <span class="hljs-attr">versionRequirement</span>: packageConfig.engines.npm
  })
}

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> warnings = []
  <span class="hljs-comment">// 依次判断版本是否符合要求</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; versionRequirements.length; i++) {
    <span class="hljs-keyword">var</span> mod = versionRequirements[i]
    <span class="hljs-keyword">if</span> (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + <span class="hljs-string">': '</span> +
        chalk.red(mod.currentVersion) + <span class="hljs-string">' should be '</span> +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  <span class="hljs-comment">// 如果有警告则将其输出到控制台</span>
  <span class="hljs-keyword">if</span> (warnings.length) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">''</span>)
    <span class="hljs-built_in">console</span>.log(chalk.yellow(<span class="hljs-string">'To use this template, you must update following to modules:'</span>))
    <span class="hljs-built_in">console</span>.log()
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; warnings.length; i++) {
      <span class="hljs-keyword">var</span> warning = warnings[i]
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  '</span> + warning)
    }
    <span class="hljs-built_in">console</span>.log()
    process.exit(<span class="hljs-number">1</span>)
  }
}</code></pre>
<h2 id="articleHeader12">4.config文件夹分析</h2>
<h3 id="articleHeader13">config/index.js</h3>
<p>这里面描述了开发和构建两种环境下的配置，前面的build文件夹下也有不少文件引用了index.js里面的配置。详细代码注释如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  // 构建产品时使用的配置
  build: {
    // 环境变量
    env: require('./prod.env'),
    // html入口文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // 产品文件的存放路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    assetsSubDirectory: 'static',
    // 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置
    // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: '/',
    // 是否使用source-map
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 是否开启gzip压缩
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 是否展示webpack构建打包之后的分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 开发过程中使用的配置
  dev: {
    // 环境变量
    env: require('./dev.env'),
    // dev-server监听的端口
    port: 8080,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 静态资源文件夹
    assetsSubDirectory: 'static',
    // 发布路径
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 是否开启 cssSourceMap
    cssSourceMap: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// see http://vuejs-templates.github.io/webpack for documentation.</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 构建产品时使用的配置</span>
  build: {
    <span class="hljs-comment">// 环境变量</span>
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-comment">// html入口文件</span>
    index: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    <span class="hljs-comment">// 产品文件的存放路径</span>
    assetsRoot: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    <span class="hljs-comment">// 二级目录，存放静态资源文件的目录，位于dist文件夹下</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">// 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置</span>
    <span class="hljs-comment">// 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    <span class="hljs-comment">// 是否使用source-map</span>
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// Gzip off by default as many popular static hosts such as</span>
    <span class="hljs-comment">// Surge or Netlify already gzip all static assets for you.</span>
    <span class="hljs-comment">// Before setting to `true`, make sure to:</span>
    <span class="hljs-comment">// npm install --save-dev compression-webpack-plugin</span>
    <span class="hljs-comment">// 是否开启gzip压缩</span>
    productionGzip: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩</span>
    productionGzipExtensions: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    <span class="hljs-comment">// Run the build command with an extra argument to</span>
    <span class="hljs-comment">// View the bundle analyzer report after build finishes:</span>
    <span class="hljs-comment">// `npm run build --report`</span>
    <span class="hljs-comment">// Set to `true` or `false` to always turn it on or off</span>
    <span class="hljs-comment">// 是否展示webpack构建打包之后的分析报告</span>
    bundleAnalyzerReport: process.env.npm_config_report
  },
  <span class="hljs-comment">// 开发过程中使用的配置</span>
  dev: {
    <span class="hljs-comment">// 环境变量</span>
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
    <span class="hljs-comment">// dev-server监听的端口</span>
    port: <span class="hljs-number">8080</span>,
    <span class="hljs-comment">// 是否自动打开浏览器</span>
    autoOpenBrowser: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 静态资源文件夹</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">// 发布路径</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    <span class="hljs-comment">// 代理配置表，在这里可以配置特定的请求代理到对应的API接口</span>
    <span class="hljs-comment">// 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'</span>
    proxyTable: {},
    <span class="hljs-comment">// CSS Sourcemaps off by default because relative paths are "buggy"</span>
    <span class="hljs-comment">// with this option, according to the CSS-Loader README</span>
    <span class="hljs-comment">// (https://github.com/webpack/css-loader#sourcemaps)</span>
    <span class="hljs-comment">// In our experience, they generally work as expected,</span>
    <span class="hljs-comment">// just be aware of this issue when enabling this option.</span>
    <span class="hljs-comment">// 是否开启 cssSourceMap</span>
    cssSourceMap: <span class="hljs-literal">false</span>
  }
}</code></pre>
<h3 id="articleHeader14">config/dev.env.js、config/prod.env.js和config/test.env.js</h3>
<p>这三个文件就简单设置了环境变量。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+vuecli+webapck2项目配置文件详解

## 原文链接
[https://segmentfault.com/a/1190000013883633](https://segmentfault.com/a/1190000013883633)


---
title: 'Vue-cli创建vue项目以及配置文件梳理' 
date: 2019-01-04 2:30:10
hidden: true
slug: nepzadtsr8p
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">介绍</h1>
<p>vue-cli是vue提供构建单页应用的脚手架。它能够帮助开发者快速的创建vue项目。这篇文章主要介绍如何使用vue-cli，以及它创建的vue项目结构。还有就是对于build目录下的配置文件进行一些梳理总结。</p>
<h1 id="articleHeader1">安装vue-cli</h1>
<p>安装vue-cli十分简单，执行下面的命令即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
<p>之后可以通过<code>vue list</code>来查看可以使用哪些模板<br><span class="img-wrap"><img data-src="/img/bVSSXu?w=1374&amp;h=326" src="https://static.alili.tech/img/bVSSXu?w=1374&amp;h=326" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">创建vue项目</h1>
<p>通过vue-cli创建一个vue项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack <your project>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>vue init webpack <span class="hljs-tag">&lt;<span class="hljs-name">your</span> <span class="hljs-attr">project</span>&gt;</span>
</code></pre>
<p>之后进入你的项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd <your project>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">cd <span class="hljs-tag">&lt;<span class="hljs-name">your</span> <span class="hljs-attr">project</span>&gt;</span></code></pre>
<p>通过npm安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span>
</code></pre>
<p>启动项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>之后我们就看到项目启动了<br><span class="img-wrap"><img data-src="/img/bVSS0S?w=1936&amp;h=1186" src="https://static.alili.tech/img/bVSS0S?w=1936&amp;h=1186" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>打包项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> build
</span></code></pre>
<h1 id="articleHeader3">vue项目结构</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build --------------------------------- webpack相关配置文件
│   ├── build.js --------------------------webpack打包配置文件
│   ├── check-versions.js ------------------------------ 检查npm,nodejs版本
│   ├── dev-client.js ---------------------------------- 设置环境
│   ├── dev-server.js ---------------------------------- 创建express服务器，配置中间件，启动可热重载的服务器，用于开发项目
│   ├── utils.js --------------------------------------- 配置资源路径，配置css加载器
│   ├── vue-loader.conf.js ----------------------------- 配置css加载器等
│   ├── webpack.base.conf.js --------------------------- webpack基本配置
│   ├── webpack.dev.conf.js ---------------------------- 用于开发的webpack设置
│   ├── webpack.prod.conf.js --------------------------- 用于打包的webpack设置
├── config ---------------------------------- 配置文件
├── node_modules ---------------------------- 存放依赖的目录
├── src ------------------------------------- 源码
│   ├── assets ------------------------------ 静态文件
│   ├── components -------------------------- 组件 
│   ├── main.js ----------------------------- 主js
│   ├── App.vue ----------------------------- 项目入口组件
│   ├── router ------------------------------ 路由
├── package.json ---------------------------- node配置文件
├── .babelrc--------------------------------- babel配置文件
├── .editorconfig---------------------------- 编辑器配置
├── .gitignore------------------------------- 配置git可忽略的文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── build --------------------------------- webpack相关配置文件
│   ├── build<span class="hljs-selector-class">.js</span> --------------------------webpack打包配置文件
│   ├── check-versions<span class="hljs-selector-class">.js</span> ------------------------------ 检查npm,nodejs版本
│   ├── dev-client<span class="hljs-selector-class">.js</span> ---------------------------------- 设置环境
│   ├── dev-server<span class="hljs-selector-class">.js</span> ---------------------------------- 创建express服务器，配置中间件，启动可热重载的服务器，用于开发项目
│   ├── utils<span class="hljs-selector-class">.js</span> --------------------------------------- 配置资源路径，配置css加载器
│   ├── vue-loader<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> ----------------------------- 配置css加载器等
│   ├── webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> --------------------------- webpack基本配置
│   ├── webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> ---------------------------- 用于开发的webpack设置
│   ├── webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> --------------------------- 用于打包的webpack设置
├── config ---------------------------------- 配置文件
├── node_modules ---------------------------- 存放依赖的目录
├── src ------------------------------------- 源码
│   ├── assets ------------------------------ 静态文件
│   ├── components -------------------------- 组件 
│   ├── main<span class="hljs-selector-class">.js</span> ----------------------------- 主js
│   ├── App<span class="hljs-selector-class">.vue</span> ----------------------------- 项目入口组件
│   ├── router ------------------------------ 路由
├── package<span class="hljs-selector-class">.json</span> ---------------------------- node配置文件
├── <span class="hljs-selector-class">.babelrc---------------------------------</span> babel配置文件
├── <span class="hljs-selector-class">.editorconfig----------------------------</span> 编辑器配置
├── <span class="hljs-selector-class">.gitignore-------------------------------</span> 配置git可忽略的文件
</code></pre>
<h1 id="articleHeader4">主要的配置文件</h1>
<p>首选来看一下<code>package.json</code>里面<code>scripts</code>字段，看一下在执行<code>npm run dev</code> 和<code>npm run build</code>时做了什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &quot;name&quot;: &quot;wheelsfactory&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;轮子工厂--一个分享优秀的vue,angular组件的网站 http://www.wheelsfactory.cn&quot;,
  &quot;scripts&quot;: {
        &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
        &quot;start&quot;: &quot;node build/dev-server.js&quot;,
        &quot;build&quot;: &quot;node build/build.js&quot;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code> <span class="hljs-string">"name"</span>: <span class="hljs-string">"wheelsfactory"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"轮子工厂--一个分享优秀的vue,angular组件的网站 http://www.wheelsfactory.cn"</span>,
  <span class="hljs-string">"scripts"</span>: {
        <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
        <span class="hljs-string">"start"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
        <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
  }
</code></pre>
<p>当我们执行<code>npm run dev</code>时，首选执行的是<code>dev-server.js</code><br>当我们执行<code>npm run build</code>时，首选执行的是<code>build.js</code></p>
<h2 id="articleHeader5">dev-server.js</h2>
<ul>
<li>引入配置文件</li>
<li>引入相关插件</li>
<li>创建express实例</li>
<li>配置webpack-dev-middleware和webpack-hot-middleware</li>
<li>配置静态资源路径，并挂到express服务上</li>
<li>启动服务器，并判断是否自动打开默认浏览器</li>
<li>监听端口</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./check-versions')()
//引入相关配置
var config = require('../config')
// 检查Node的环境变量，如果没有则使用配置文件中设置的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
 
//opn -- A better node-open. Opens stuff like websites, files, executables. Cross-platform.
//这里用来打开默认浏览器，打开dev-server监听的端口
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
//express中间件，用于http请求代理到其他服务器
var proxyMiddleware = require('http-proxy-middleware')
//判断当前环境，选择导入的webpack配置
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
//默认的dev-server的监听端口
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
//是否自动打开浏览器，默认是false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//定义http代理到你的自定义的API后端
var proxyTable = config.dev.proxyTable
//创建express实例
var app = express()
// 根据webpack的config创建Compiler对象
var compiler = webpack(webpackConfig)

//使用compiler相应的文件进行编译和绑定，编译后的内容将存放在内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
//用于实现热重载
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
//当html-webpack-plugin提交页面之后，使用热重载强制页面重载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
//在express上使用代理表中的配置
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
//一个解决单页的重定向错误的插件
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 使用devMiddleware，webpack编译后的文件将挂到express服务器上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 使用热重载中间件
app.use(hotMiddleware)

// serve pure static assets
//配置静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
//将静态文件挂到express服务器上
app.use(staticPath, express.static('./static'))
//设置应用的url
var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
//devMiddleware valid之后，启动服务
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  //如果设置为自动打开浏览器，通过opn打开uri
  if (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})
//监听配置的端口
var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">'./check-versions'</span>)()
<span class="hljs-comment">//引入相关配置</span>
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// 检查Node的环境变量，如果没有则使用配置文件中设置的环境</span>
<span class="hljs-keyword">if</span> (!process.env.NODE_ENV) {
  process.env.NODE_ENV = <span class="hljs-built_in">JSON</span>.parse(config.dev.env.NODE_ENV)
}
 
<span class="hljs-comment">//opn -- A better node-open. Opens stuff like websites, files, executables. Cross-platform.</span>
<span class="hljs-comment">//这里用来打开默认浏览器，打开dev-server监听的端口</span>
<span class="hljs-keyword">var</span> opn = <span class="hljs-built_in">require</span>(<span class="hljs-string">'opn'</span>)
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-comment">//express中间件，用于http请求代理到其他服务器</span>
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)
<span class="hljs-comment">//判断当前环境，选择导入的webpack配置</span>
<span class="hljs-keyword">var</span> webpackConfig = process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
  ? <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)
  : <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.dev.conf'</span>)

<span class="hljs-comment">// default port where dev server listens for incoming traffic</span>
<span class="hljs-comment">//默认的dev-server的监听端口</span>
<span class="hljs-keyword">var</span> port = process.env.PORT || config.dev.port
<span class="hljs-comment">// automatically open browser, if not set will be false</span>
<span class="hljs-comment">//是否自动打开浏览器，默认是false</span>
<span class="hljs-keyword">var</span> autoOpenBrowser = !!config.dev.autoOpenBrowser
<span class="hljs-comment">// Define HTTP proxies to your custom API backend</span>
<span class="hljs-comment">// https://github.com/chimurai/http-proxy-middleware</span>
<span class="hljs-comment">//定义http代理到你的自定义的API后端</span>
<span class="hljs-keyword">var</span> proxyTable = config.dev.proxyTable
<span class="hljs-comment">//创建express实例</span>
<span class="hljs-keyword">var</span> app = express()
<span class="hljs-comment">// 根据webpack的config创建Compiler对象</span>
<span class="hljs-keyword">var</span> compiler = webpack(webpackConfig)

<span class="hljs-comment">//使用compiler相应的文件进行编译和绑定，编译后的内容将存放在内存中</span>
<span class="hljs-keyword">var</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)(compiler, {
  <span class="hljs-attr">publicPath</span>: webpackConfig.output.publicPath,
  <span class="hljs-attr">quiet</span>: <span class="hljs-literal">true</span>
})
<span class="hljs-comment">//用于实现热重载</span>
<span class="hljs-keyword">var</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)(compiler, {
  <span class="hljs-attr">log</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">heartbeat</span>: <span class="hljs-number">2000</span>
})
<span class="hljs-comment">// force page reload when html-webpack-plugin template changes</span>
<span class="hljs-comment">//当html-webpack-plugin提交页面之后，使用热重载强制页面重载</span>
compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compilation</span>) </span>{
  compilation.plugin(<span class="hljs-string">'html-webpack-plugin-after-emit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data, cb</span>) </span>{
    hotMiddleware.publish({ <span class="hljs-attr">action</span>: <span class="hljs-string">'reload'</span> })
    cb()
  })
})

<span class="hljs-comment">// proxy api requests</span>
<span class="hljs-comment">//在express上使用代理表中的配置</span>
<span class="hljs-built_in">Object</span>.keys(proxyTable).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">context</span>) </span>{
  <span class="hljs-keyword">var</span> options = proxyTable[context]
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> options === <span class="hljs-string">'string'</span>) {
    options = { <span class="hljs-attr">target</span>: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

<span class="hljs-comment">// handle fallback for HTML5 history API</span>
<span class="hljs-comment">//一个解决单页的重定向错误的插件</span>
app.use(<span class="hljs-built_in">require</span>(<span class="hljs-string">'connect-history-api-fallback'</span>)())

<span class="hljs-comment">// serve webpack bundle output</span>
<span class="hljs-comment">// 使用devMiddleware，webpack编译后的文件将挂到express服务器上</span>
app.use(devMiddleware)

<span class="hljs-comment">// enable hot-reload and state-preserving</span>
<span class="hljs-comment">// compilation error display</span>
<span class="hljs-comment">// 使用热重载中间件</span>
app.use(hotMiddleware)

<span class="hljs-comment">// serve pure static assets</span>
<span class="hljs-comment">//配置静态资源路径</span>
<span class="hljs-keyword">var</span> staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
<span class="hljs-comment">//将静态文件挂到express服务器上</span>
app.use(staticPath, express.static(<span class="hljs-string">'./static'</span>))
<span class="hljs-comment">//设置应用的url</span>
<span class="hljs-keyword">var</span> uri = <span class="hljs-string">'http://localhost:'</span> + port

<span class="hljs-keyword">var</span> _resolve
<span class="hljs-keyword">var</span> readyPromise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
  _resolve = resolve
})

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt; Starting dev server...'</span>)
<span class="hljs-comment">//devMiddleware valid之后，启动服务</span>
devMiddleware.waitUntilValid(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'&gt; Listening at '</span> + uri + <span class="hljs-string">'\n'</span>)
  <span class="hljs-comment">// when env is testing, don't need open it</span>
  <span class="hljs-comment">//如果设置为自动打开浏览器，通过opn打开uri</span>
  <span class="hljs-keyword">if</span> (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== <span class="hljs-string">'testing'</span>) {
    opn(uri)
  }
  _resolve()
})
<span class="hljs-comment">//监听配置的端口</span>
<span class="hljs-keyword">var</span> server = app.listen(port)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">ready</span>: readyPromise,
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    server.close()
  }
}
</code></pre>
<h2 id="articleHeader6">webpack.base.conf.js</h2>
<ul>
<li>配置编译入口和输出路径</li>
<li>模块resolve的规则</li>
<li>配置不同类型模块的处理规则</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
//绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  //webpack的入口文件
  entry: {
    app: './src/main.js'
  },
  output: {
     //webpack输出文件的路径
    path: config.build.assetsRoot,
    //输出的文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //模块resolve的规则
  resolve: {
    //resolve的后缀名
    extensions: ['.js', '.vue', '.json'],
    //配置路径别名，比如import Vue from 'vue/dist/vue.common.js'--> import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  //配置不同类型模块的处理规则
  module: {
    rules: [
    // src和test文件夹下的.js和.vue文件使用eslint-loader
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      //所有的.vue文件使用vue-loader
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      //src和test下的.js文件使用babel-loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      //所有的图片文件使用url-loader
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      //所有的音频文件使用url-loader
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      //所有的字体文件使用url-loader
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)
<span class="hljs-comment">//绝对路径</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//webpack的入口文件</span>
  entry: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/main.js'</span>
  },
  <span class="hljs-attr">output</span>: {
     <span class="hljs-comment">//webpack输出文件的路径</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">//输出的文件命名格式</span>
    filename: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-comment">// webpack编译输出的发布路径</span>
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  <span class="hljs-comment">//模块resolve的规则</span>
  resolve: {
    <span class="hljs-comment">//resolve的后缀名</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-comment">//配置路径别名，比如import Vue from 'vue/dist/vue.common.js'--&gt; import Vue from 'vue'</span>
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>)
    }
  },
  <span class="hljs-comment">//配置不同类型模块的处理规则</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
    <span class="hljs-comment">// src和test文件夹下的.js和.vue文件使用eslint-loader</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|vue)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>,
        <span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>)
        }
      },
      <span class="hljs-comment">//所有的.vue文件使用vue-loader</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
      },
      <span class="hljs-comment">//src和test下的.js文件使用babel-loader</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)]
      },
      <span class="hljs-comment">//所有的图片文件使用url-loader</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
      },
      <span class="hljs-comment">//所有的音频文件使用url-loader</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'media/[name].[hash:7].[ext]'</span>)
        }
      },
      <span class="hljs-comment">//所有的字体文件使用url-loader</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  }
}
</code></pre>
<h2 id="articleHeader7">webpack.dev.conf.js</h2>
<ul>
<li>合并基础的webpack配置</li>
<li>使用styleLoaders</li>
<li>配置Source Maps</li>
<li>配置webpack插件</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
//生成html文件并自动注入依赖文件的插件， script &amp; link
var HtmlWebpackPlugin = require('html-webpack-plugin')
//一个输出webpack警告，错误的插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
//添加热重载相关的代码到entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
//合并webpack.base.conf
module.exports = merge(baseWebpackConfig, {
  module: {
    //使用styleLoaders处理样式文件
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  //配置Source Maps

  devtool: '#cheap-module-eval-source-map',
  //配置webpack插件
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
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
<span class="hljs-selector-tag">var</span> merge = require(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-selector-tag">var</span> baseWebpackConfig = require(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-comment">//生成html文件并自动注入依赖文件的插件， script &amp; link</span>
<span class="hljs-selector-tag">var</span> HtmlWebpackPlugin = require(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">//一个输出webpack警告，错误的插件</span>
<span class="hljs-selector-tag">var</span> FriendlyErrorsPlugin = require(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)

<span class="hljs-comment">// add hot-reload related code to entry chunks</span>
<span class="hljs-comment">//添加热重载相关的代码到entry chunks</span>
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name] = [<span class="hljs-string">'./build/dev-client'</span>].concat(baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name])
})
<span class="hljs-comment">//合并webpack.base.conf</span>
module<span class="hljs-selector-class">.exports</span> = merge(baseWebpackConfig, {
  module: {
    <span class="hljs-comment">//使用styleLoaders处理样式文件</span>
    rules: utils.styleLoaders({ sourceMap: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.cssSourceMap</span> })
  },
  <span class="hljs-comment">// cheap-module-eval-source-map is faster for development</span>
  <span class="hljs-comment">//配置Source Maps</span>

  devtool: <span class="hljs-string">'#cheap-module-eval-source-map'</span>,
  <span class="hljs-comment">//配置webpack插件</span>
  plugins: [
    new webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.env</span>
    }),
    <span class="hljs-comment">// https://github.com/glenjamin/webpack-hot-middleware#installation--usage</span>
    new webpack.HotModuleReplacementPlugin(),
    <span class="hljs-comment">//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。</span>
    new webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    new HtmlWebpackPlugin({
      filename: <span class="hljs-string">'index.html'</span>,
      template: <span class="hljs-string">'index.html'</span>,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})</code></pre>
<p>** 配置Source Maps</p>
<ul>
<li>source-map  在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source<br>  map，但是它会减慢打包文件的构建速度；</li>
<li>cheap-module-source-map<br>  在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；</li>
<li>eval-source-map 使用eval打包源文件模块，在同一个文件中生成干净的完整的source<br>  map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；</li>
<li>cheap-module-eval-source-map  这是在打包文件时最快的生成source map的方法，生成的Source<br>  Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；</li>
</ul>
<h2 id="articleHeader8">build.js</h2>
<ul>
<li>webpack编译</li>
<li>输出信息</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./check-versions')()
process.env.NODE_ENV = 'production'
//控制台loading动画
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
// 高亮控制台输出的插件
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
//在控制台输出building for production...
var spinner = ora('building for production...')
//开始loading动画
spinner.start()
//获取输出文件路径
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  //webpack编译  
  webpack(webpackConfig, function (err, stats) {
    //停止loading动画
    spinner.stop()
    //如果错误抛出错误
    if (err) throw err
    //完成输出相关信息 
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'./check-versions'</span>)</span><span class="hljs-params">()</span></span>
process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> = <span class="hljs-string">'production'</span>
<span class="hljs-comment">//控制台loading动画</span>
<span class="hljs-selector-tag">var</span> ora = require(<span class="hljs-string">'ora'</span>)
<span class="hljs-selector-tag">var</span> rm = require(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-selector-tag">var</span> path = require(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 高亮控制台输出的插件</span>
<span class="hljs-selector-tag">var</span> chalk = require(<span class="hljs-string">'chalk'</span>)
<span class="hljs-selector-tag">var</span> webpack = require(<span class="hljs-string">'webpack'</span>)
<span class="hljs-selector-tag">var</span> config = require(<span class="hljs-string">'../config'</span>)
<span class="hljs-selector-tag">var</span> webpackConfig = require(<span class="hljs-string">'./webpack.prod.conf'</span>)
<span class="hljs-comment">//在控制台输出building for production...</span>
<span class="hljs-selector-tag">var</span> spinner = ora(<span class="hljs-string">'building for production...'</span>)
<span class="hljs-comment">//开始loading动画</span>
spinner.start()
<span class="hljs-comment">//获取输出文件路径</span>
<span class="hljs-function"><span class="hljs-title">rm</span><span class="hljs-params">(path.join(config.build.assetsRoot, config.build.assetsSubDirectory)</span></span>, err =&gt; {
  <span class="hljs-keyword">if</span> (err) throw err
  <span class="hljs-comment">//webpack编译  </span>
  webpack(webpackConfig, function (err, stats) {
    <span class="hljs-comment">//停止loading动画</span>
    spinner.stop()
    <span class="hljs-comment">//如果错误抛出错误</span>
    <span class="hljs-keyword">if</span> (err) throw err
    <span class="hljs-comment">//完成输出相关信息 </span>
    process<span class="hljs-selector-class">.stdout</span><span class="hljs-selector-class">.write</span>(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + <span class="hljs-string">'\n\n'</span>)

    console.log(chalk.cyan(<span class="hljs-string">'  Build complete.\n'</span>))
    console.log(chalk.yellow(
      <span class="hljs-string">'  Tip: built files are meant to be served over an HTTP server.\n'</span> +
      <span class="hljs-string">'  Opening index.html over file:// won\'t work.\n'</span>
    ))
  })
})
</code></pre>
<h2 id="articleHeader9">webpack.prod.conf.js</h2>
<ul>
<li>合并基础的webpack配置</li>
<li>配置webpack的输出</li>
<li>配置webpack插件</li>
<li>配置gzip模式</li>
<li>配置webpack-bundle-analyzer，分析打包后生成的文件结构</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 抽取css，js文件,与webpack输出的bundle分离
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env
//合并webpack.base.conf
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    //配置输出路径
    path: config.build.assetsRoot,
    //输出的文件命名格式
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    //未指定文件名的文件的文件名格式
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  //相关插件
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    //压缩js插件
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    //从bundle中抽取css文件
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    //压缩抽取的css文件
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    //用于生成dist/index.html，加入hash用于缓存。hash不改变不进行更新
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
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    //分离第三方js到单独的文件中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})
// 配置gzip模式
if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

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
//配置webpack-bundle-analyzer，分析打包后生成的文件结构
if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">var</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">// 抽取css，js文件,与webpack输出的bundle分离</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)

<span class="hljs-keyword">var</span> env = process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
  ? <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/test.env'</span>)
  : config.build.env
<span class="hljs-comment">//合并webpack.base.conf</span>
<span class="hljs-keyword">var</span> webpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-keyword">module</span>: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: <span class="hljs-literal">true</span>
    })
  },
  devtool: config.build.productionSourceMap ? <span class="hljs-string">'#source-map'</span> : <span class="hljs-literal">false</span>,
  output: {
    <span class="hljs-comment">//配置输出路径</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">//输出的文件命名格式</span>
    filename: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    <span class="hljs-comment">//未指定文件名的文件的文件名格式</span>
    chunkFilename: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  <span class="hljs-comment">//相关插件</span>
  plugins: [
    <span class="hljs-comment">// http://vuejs.github.io/vue-loader/en/workflow/production.html</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-comment">//压缩js插件</span>
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: <span class="hljs-literal">false</span>
      },
      sourceMap: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// extract css into its own file</span>
    <span class="hljs-comment">//从bundle中抽取css文件</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      filename: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>)
    }),
    <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
    <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
    <span class="hljs-comment">//压缩抽取的css文件</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: <span class="hljs-literal">true</span>
      }
    }),
    <span class="hljs-comment">// generate dist index.html with correct asset hash for caching.</span>
    <span class="hljs-comment">// you can customize output by editing /index.html</span>
    <span class="hljs-comment">// see https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">//用于生成dist/index.html，加入hash用于缓存。hash不改变不进行更新</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
        ? <span class="hljs-string">'index.html'</span>
        : config.build.index,
      template: <span class="hljs-string">'index.html'</span>,
      inject: <span class="hljs-literal">true</span>,
      minify: {
        removeComments: <span class="hljs-literal">true</span>,
        collapseWhitespace: <span class="hljs-literal">true</span>,
        removeAttributeQuotes: <span class="hljs-literal">true</span>
        <span class="hljs-comment">// more options:</span>
        <span class="hljs-comment">// https://github.com/kangax/html-minifier#options-quick-reference</span>
      },
      <span class="hljs-comment">// necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
      chunksSortMode: <span class="hljs-string">'dependency'</span>
    }),
    <span class="hljs-comment">// split vendor js into its own file</span>
    <span class="hljs-comment">//分离第三方js到单独的文件中</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      name: <span class="hljs-string">'vendor'</span>,
      minChunks: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"><span class="hljs-built_in">module</span>, count</span>) </span>{
        <span class="hljs-comment">// any required modules inside node_modules are extracted to vendor</span>
        <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
          ) === <span class="hljs-number">0</span>
        )
      }
    }),
    <span class="hljs-comment">// extract webpack runtime and module manifest to its own file in order to</span>
    <span class="hljs-comment">// prevent vendor hash from being updated whenever app bundle is updated</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      name: <span class="hljs-string">'manifest'</span>,
      chunks: [<span class="hljs-string">'vendor'</span>]
    }),
    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-keyword">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        to: config.build.assetsSubDirectory,
        ignore: [<span class="hljs-string">'.*'</span>]
      }
    ])
  ]
})
<span class="hljs-comment">// 配置gzip模式</span>
<span class="hljs-keyword">if</span> (config.build.productionGzip) {
  <span class="hljs-keyword">var</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>)

  webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      asset: <span class="hljs-string">'[path].gz[query]'</span>,
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
<span class="hljs-comment">//配置webpack-bundle-analyzer，分析打包后生成的文件结构</span>
<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-keyword">var</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}

<span class="hljs-built_in">module</span>.exports = webpackConfig
</code></pre>
<h2 id="articleHeader10">config/index.js</h2>
<p>最后是config中的index.js文件，它都配置了什么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')

module.exports = {
    //打包时使用的配置
  build: {
    //webpack的环境
    env: require('./prod.env'),
    //输入的index.html的路径
    index: path.resolve(__dirname, '../dist/index.html'),
    //输出的目标文件夹路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    //输出的子文件夹路径
    assetsSubDirectory: 'static',
    //发布路径
    assetsPublicPath: '/',
    //是否使用SourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 是否开启Gzip
    productionGzip: false,
    //Gzip的压缩文件类型
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  //开发时使用的配置
  dev: {
    //webpack环境
    env: require('./dev.env'),
    //端口
    port: 8080,
    //是否自动打开浏览器
    autoOpenBrowser: true,
    //输出的子文件夹路径
    assetsSubDirectory: 'static',
    //发布路径
    assetsPublicPath: '/',
    //配置代理表
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-comment">//打包时使用的配置</span>
  build: {
    <span class="hljs-comment">//webpack的环境</span>
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-comment">//输入的index.html的路径</span>
    index: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    <span class="hljs-comment">//输出的目标文件夹路径</span>
    assetsRoot: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    <span class="hljs-comment">//输出的子文件夹路径</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">//发布路径</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    <span class="hljs-comment">//是否使用SourceMap</span>
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// Gzip off by default as many popular static hosts such as</span>
    <span class="hljs-comment">// Surge or Netlify already gzip all static assets for you.</span>
    <span class="hljs-comment">// Before setting to `true`, make sure to:</span>
    <span class="hljs-comment">// npm install --save-dev compression-webpack-plugin</span>
    <span class="hljs-comment">// 是否开启Gzip</span>
    productionGzip: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">//Gzip的压缩文件类型</span>
    productionGzipExtensions: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    <span class="hljs-comment">// Run the build command with an extra argument to</span>
    <span class="hljs-comment">// View the bundle analyzer report after build finishes:</span>
    <span class="hljs-comment">// `npm run build --report`</span>
    <span class="hljs-comment">// Set to `true` or `false` to always turn it on or off</span>
    bundleAnalyzerReport: process.env.npm_config_report
  },
  <span class="hljs-comment">//开发时使用的配置</span>
  dev: {
    <span class="hljs-comment">//webpack环境</span>
    env: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
    <span class="hljs-comment">//端口</span>
    port: <span class="hljs-number">8080</span>,
    <span class="hljs-comment">//是否自动打开浏览器</span>
    autoOpenBrowser: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">//输出的子文件夹路径</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">//发布路径</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    <span class="hljs-comment">//配置代理表</span>
    proxyTable: {},
    <span class="hljs-comment">// CSS Sourcemaps off by default because relative paths are "buggy"</span>
    <span class="hljs-comment">// with this option, according to the CSS-Loader README</span>
    <span class="hljs-comment">// (https://github.com/webpack/css-loader#sourcemaps)</span>
    <span class="hljs-comment">// In our experience, they generally work as expected,</span>
    <span class="hljs-comment">// just be aware of this issue when enabling this option.</span>
    cssSourceMap: <span class="hljs-literal">false</span>
  }
}
</code></pre>
<h1 id="articleHeader11">总结</h1>
<p>vue-cli给创建vue项目提供了很大的便利。但是同时大量的第三方库的使用，会让打包后的js变的很大，所以还是要熟悉配置,熟悉第三方插件的使用，才可以开发更高效的开发web应用。这里把vue-cli的一些相关内容给自己做一个总结，便于以后查阅。也是希望对其他开发者有帮助。有不足之处请指正。<br>最后推荐一下<a href="http://www.wheelsfactory.cn/" rel="nofollow noreferrer" target="_blank">轮子工厂</a>--一个分享优秀的vue,angular组件的网站</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-cli创建vue项目以及配置文件梳理

## 原文链接
[https://segmentfault.com/a/1190000010659925](https://segmentfault.com/a/1190000010659925)


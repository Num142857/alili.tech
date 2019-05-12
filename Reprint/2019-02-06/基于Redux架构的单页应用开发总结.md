---
title: '基于Redux架构的单页应用开发总结' 
date: 2019-02-06 2:30:09
hidden: true
slug: kttlr3zcdkk
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">系统架构介绍</h1>
<p>本项目开发基于 <code>React</code> + <code>Redux</code> + <code>React-Route</code> 框架，利用 <code>webpack</code> 进行模块化构建，前端编写语言是 JavaScript ES6，利用 <code>babel</code>进行转换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--- project
        |--- build                    // 项目打包编译目录
        |--- src                      // 项目开发的源代码
            |--- actions              // redux的动作
            |--- components           // redux的组件
            |--- containers           // redux的容器  
            |--- images               // 静态图片
            |--- mixins               // 通用的函数库
            |--- reducers             // redux的store操作
            |--- configureStore.js    // redux的store映射
            |--- index.js             // 页面入口
            |--- routes.js            // 路由配置
        |--- index.html               // 入口文件
        |--- .babelrc                 // babel配置
        |--- main.js                  // webkit打包的壳子
        |--- package.json             // 包信息
        |--- webpack.config.js        // webpack配置文件
        |--- readme.md           " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|--- project</span>
        <span class="hljs-string">|--- build                    // 项目打包编译目录</span>
        <span class="hljs-string">|--- src                      // 项目开发的源代码</span>
            <span class="hljs-string">|--- actions              // redux的动作</span>
            <span class="hljs-string">|--- components           // redux的组件</span>
            <span class="hljs-string">|--- containers           // redux的容器  </span>
            <span class="hljs-string">|--- images               // 静态图片</span>
            <span class="hljs-string">|--- mixins               // 通用的函数库</span>
            <span class="hljs-string">|--- reducers             // redux的store操作</span>
            <span class="hljs-string">|--- configureStore.js    // redux的store映射</span>
            <span class="hljs-string">|--- index.js             // 页面入口</span>
            <span class="hljs-string">|--- routes.js            // 路由配置</span>
        <span class="hljs-string">|--- index.html               // 入口文件</span>
        <span class="hljs-string">|--- .babelrc                 // babel配置</span>
        <span class="hljs-string">|--- main.js                  // webkit打包的壳子</span>
        <span class="hljs-string">|--- package.json             // 包信息</span>
        <span class="hljs-string">|--- webpack.config.js        // webpack配置文件</span>
        <span class="hljs-string">|--- readme.md           </span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;babel-polyfill&quot;: &quot;^6.7.4&quot;,
    &quot;base-64&quot;: &quot;^0.1.0&quot;,
    &quot;immutable&quot;: &quot;^3.7.6&quot;,
    &quot;isomorphic-fetch&quot;: &quot;^2.2.1&quot;,
    &quot;moment&quot;: &quot;^2.13.0&quot;,
    &quot;normalizr&quot;: &quot;^2.0.1&quot;,
    &quot;react&quot;: &quot;^0.14.8&quot;,
    &quot;react-datetimepicker&quot;: &quot;^2.0.0&quot;,
    &quot;react-dom&quot;: &quot;^0.14.8&quot;,
    &quot;react-redux&quot;: &quot;^4.4.1&quot;,
    &quot;react-redux-spinner&quot;: &quot;^0.4.0&quot;,
    &quot;react-router&quot;: &quot;^2.0.1&quot;,
    &quot;react-router-redux&quot;: &quot;^4.0.1&quot;,
    &quot;redux&quot;: &quot;^3.3.1&quot;,
    &quot;redux-immutablejs&quot;: &quot;0.0.8&quot;,
    &quot;redux-logger&quot;: &quot;^2.6.1&quot;,
    &quot;redux-thunk&quot;: &quot;^2.0.1&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.7.5&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.4&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.6.0&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.5.0&quot;,
    &quot;babel-preset-stage-1&quot;: &quot;^6.5.0&quot;,
    &quot;css-loader&quot;: &quot;^0.23.1&quot;,
    &quot;file-loader&quot;: &quot;^0.8.5&quot;,
    &quot;img-loader&quot;: &quot;^1.2.2&quot;,
    &quot;less&quot;: &quot;^2.6.1&quot;,
    &quot;less-loader&quot;: &quot;^2.2.3&quot;,
    &quot;mocha&quot;: &quot;^2.4.5&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;url-loader&quot;: &quot;^0.5.7&quot;,
    &quot;webpack&quot;: &quot;^1.12.14&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"babel-polyfill"</span>: <span class="hljs-string">"^6.7.4"</span>,
    <span class="hljs-string">"base-64"</span>: <span class="hljs-string">"^0.1.0"</span>,
    <span class="hljs-string">"immutable"</span>: <span class="hljs-string">"^3.7.6"</span>,
    <span class="hljs-string">"isomorphic-fetch"</span>: <span class="hljs-string">"^2.2.1"</span>,
    <span class="hljs-string">"moment"</span>: <span class="hljs-string">"^2.13.0"</span>,
    <span class="hljs-string">"normalizr"</span>: <span class="hljs-string">"^2.0.1"</span>,
    <span class="hljs-string">"react"</span>: <span class="hljs-string">"^0.14.8"</span>,
    <span class="hljs-string">"react-datetimepicker"</span>: <span class="hljs-string">"^2.0.0"</span>,
    <span class="hljs-string">"react-dom"</span>: <span class="hljs-string">"^0.14.8"</span>,
    <span class="hljs-string">"react-redux"</span>: <span class="hljs-string">"^4.4.1"</span>,
    <span class="hljs-string">"react-redux-spinner"</span>: <span class="hljs-string">"^0.4.0"</span>,
    <span class="hljs-string">"react-router"</span>: <span class="hljs-string">"^2.0.1"</span>,
    <span class="hljs-string">"react-router-redux"</span>: <span class="hljs-string">"^4.0.1"</span>,
    <span class="hljs-string">"redux"</span>: <span class="hljs-string">"^3.3.1"</span>,
    <span class="hljs-string">"redux-immutablejs"</span>: <span class="hljs-string">"0.0.8"</span>,
    <span class="hljs-string">"redux-logger"</span>: <span class="hljs-string">"^2.6.1"</span>,
    <span class="hljs-string">"redux-thunk"</span>: <span class="hljs-string">"^2.0.1"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.7.5"</span>,
    <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^6.2.4"</span>,
    <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.6.0"</span>,
    <span class="hljs-string">"babel-preset-react"</span>: <span class="hljs-string">"^6.5.0"</span>,
    <span class="hljs-string">"babel-preset-stage-1"</span>: <span class="hljs-string">"^6.5.0"</span>,
    <span class="hljs-string">"css-loader"</span>: <span class="hljs-string">"^0.23.1"</span>,
    <span class="hljs-string">"file-loader"</span>: <span class="hljs-string">"^0.8.5"</span>,
    <span class="hljs-string">"img-loader"</span>: <span class="hljs-string">"^1.2.2"</span>,
    <span class="hljs-string">"less"</span>: <span class="hljs-string">"^2.6.1"</span>,
    <span class="hljs-string">"less-loader"</span>: <span class="hljs-string">"^2.2.3"</span>,
    <span class="hljs-string">"mocha"</span>: <span class="hljs-string">"^2.4.5"</span>,
    <span class="hljs-string">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-string">"url-loader"</span>: <span class="hljs-string">"^0.5.7"</span>,
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^1.12.14"</span>
  }</code></pre>
<h2 id="articleHeader1">webpack配置</h2>
<p>也算是实际体验了一把webpack，不得不说，论<code>React</code>最佳搭档，非此货莫属！真的很强大，很好用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');   // 引入webpack模块
var path = require('path');         // 引入node的path模块
var nodeModulesPath = path.join(__dirname, '/node_modules');  // 设置node_modules目录

module.exports = {
    // 配置入口（此处定义了双入口）
    entry: {
        bundle: './src/index',
        vendor: ['react', 'react-dom', 'redux']
    },
    // 配置输出目录
    output: {
        path: path.join(__dirname, '/build'),
        publicPath: &quot;/assets/&quot;,
        filename: 'bundle.js'
    },
    module: {
        noParse: [
            path.join(nodeModulesPath, '/react/dist/react.min'),
            path.join(nodeModulesPath, '/react-dom/dist/react-dom.min'),
            path.join(nodeModulesPath, '/redux/dist/redux.min'),
        ],
        // 加载器
        loaders: [
            // less加载器
            { test: /\.less$/, loader: 'style!css!less' },
            // babel加载器
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            // 图片加载器（图片超过8k会自动转base64格式）
            { test: /\.(gif|jpg|png)$/, loader: &quot;url?limit=8192&amp;name=images/[name].[hash].[ext]&quot;},
            // 加载icon字体文件
            { test: /\.(woff|svg|eot|ttf)$/, loader: 'url?limit=50000&amp;name=fonts/[name].[hash].[ext]'}
        ]
    },
    // 外部依赖（不会打包到bundle.js里）
    externals: { 
        'citys': 'Citys'
    },
    // 插件
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),  // 版本上线时开启
        new webpack.DefinePlugin({
            // 定义生产环境
            &quot;process.env&quot;: {
                NODE_ENV: JSON.stringify(&quot;production&quot;)
            }
        }),
        //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }), // 版本上线时开启
        // 公共部分会被抽离到vendor.js里
        new webpack.optimize.CommonsChunkPlugin('vendor',  'vendor.js'),
        // 比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
        new webpack.optimize.OccurenceOrderPlugin(),
        // 允许错误不打断程序
        new webpack.NoErrorsPlugin()
    ],
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var webpack = require(<span class="hljs-string">'webpack'</span>);   <span class="hljs-comment">// 引入webpack模块</span>
var path = require(<span class="hljs-string">'path'</span>);         <span class="hljs-comment">// 引入node的path模块</span>
var nodeModulesPath = path.join(__dirname, <span class="hljs-string">'/node_modules'</span>);  <span class="hljs-comment">// 设置node_modules目录</span>

module.exports = {
    <span class="hljs-comment">// 配置入口（此处定义了双入口）</span>
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        bundle:</span> <span class="hljs-string">'./src/index'</span>,
<span class="hljs-symbol">        vendor:</span> [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>, <span class="hljs-string">'redux'</span>]
    },
    <span class="hljs-comment">// 配置输出目录</span>
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        path:</span> path.join(__dirname, <span class="hljs-string">'/build'</span>),
<span class="hljs-symbol">        publicPath:</span> <span class="hljs-string">"/assets/"</span>,
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">'bundle.js'</span>
    },
<span class="hljs-symbol">    module:</span> {
<span class="hljs-symbol">        noParse:</span> [
            path.join(nodeModulesPath, <span class="hljs-string">'/react/dist/react.min'</span>),
            path.join(nodeModulesPath, <span class="hljs-string">'/react-dom/dist/react-dom.min'</span>),
            path.join(nodeModulesPath, <span class="hljs-string">'/redux/dist/redux.min'</span>),
        ],
        <span class="hljs-comment">// 加载器</span>
<span class="hljs-symbol">        loaders:</span> [
            <span class="hljs-comment">// less加载器</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.less$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'style!css!less'</span> },
            <span class="hljs-comment">// babel加载器</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-string">exclude:</span> <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'babel-loader'</span> },
            <span class="hljs-comment">// 图片加载器（图片超过8k会自动转base64格式）</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.(gif|jpg|png)$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">"url?limit=8192&amp;name=images/[name].[hash].[ext]"</span>},
            <span class="hljs-comment">// 加载icon字体文件</span>
            { <span class="hljs-string">test:</span> <span class="hljs-regexp">/\.(woff|svg|eot|ttf)$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'url?limit=50000&amp;name=fonts/[name].[hash].[ext]'</span>}
        ]
    },
    <span class="hljs-comment">// 外部依赖（不会打包到bundle.js里）</span>
<span class="hljs-symbol">    externals:</span> { 
        <span class="hljs-string">'citys'</span>: <span class="hljs-string">'Citys'</span>
    },
    <span class="hljs-comment">// 插件</span>
<span class="hljs-symbol">    plugins:</span> [
        <span class="hljs-comment">//new webpack.HotModuleReplacementPlugin(),  // 版本上线时开启</span>
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-comment">// 定义生产环境</span>
            <span class="hljs-string">"process.env"</span>: {
<span class="hljs-symbol">                NODE_ENV:</span> JSON.stringify(<span class="hljs-string">"production"</span>)
            }
        }),
        <span class="hljs-comment">//new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }), // 版本上线时开启</span>
        <span class="hljs-comment">// 公共部分会被抽离到vendor.js里</span>
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'vendor'</span>,  <span class="hljs-string">'vendor.js'</span>),
        <span class="hljs-comment">// 比对id的使用频率和分布来得出最短的id分配给使用频率高的模块</span>
        <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin(),
        <span class="hljs-comment">// 允许错误不打断程序</span>
        <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin()
    ],
};</code></pre>
<h2 id="articleHeader2">
<a href="http://webpack.github.io/docs/optimization.html" rel="nofollow noreferrer" target="_blank">延伸</a>－Webpack性能优化</h2>
<h3 id="articleHeader3">最小化</h3>
<p>为了瘦身你的js（还有你的css，如果你用到css-loader的话）webpack支持一个简单的配置项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.UglifyJsPlugin()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.UglifyJsPlugin</span>()</code></pre>
<p>这是一种简单而有效的方法来优化你的webapp。而webpack还提供了modules 和 chunks ids 来区分他们俩。利用下面的配置项，webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.OccurenceOrderPlugin()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.OccurenceOrderPlugin</span>()</code></pre>
<p>入口文件对于文件大小有较高的优先级（入口文件压缩优化率尽量的好）</p>
<h3 id="articleHeader4">去重</h3>
<p>如果你使用了一些有着很酷的依赖树的库，那么它可能存在一些文件是重复的。webpack可以找到这些文件并去重。这保证了重复的代码不被大包到bundle文件里面去，取而代之的是运行时请求一个封装的函数。不会影响语义</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.DedupePlugin()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.DedupePlugin</span>()</code></pre>
<p>这个功能可能会增加入口模块的一些花销</p>
<h3 id="articleHeader5">对于chunks的优化</h3>
<p>当coding的时候，你可能已经添加了许多分割点来按需加载。但编译完了之后你发现有太多细小的模块造成了很大的HTTP损耗。幸运的是Webpack可以处理这个问题，你可以做下面两件事情来合并一些请求：</p>
<ul><li><p>Limit the maximum chunk count with</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.LimitChunkCountPlugin({maxChunks: 15})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.LimitChunkCountPlugin</span>({<span class="hljs-attribute">maxChunks</span>: <span class="hljs-number">15</span>})</code></pre>
<ul><li><p>Limit the minimum chunk size with</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.MinChunkSizePlugin</span>({<span class="hljs-attribute">minChunkSize</span>: <span class="hljs-number">10000</span>})</code></pre>
<p>Webpack通过合并来管理这些异步加载的模块(合并更多的时候发生在当前这个chunk有复用的地方)。文件只要在入口页面加载的时候没有被引入，那么就不会被合并到chunk里面去。</p>
<h3 id="articleHeader6">单页</h3>
<p>Webpack 是为单页应用量身定做的 你可以把app拆成很多chunk，这些chunk由路由来加载。入口模块仅仅包含路由和一些库，没有别的内容。这么做在用户通过导航浏览表现很好，但是初始化页面加载的时候你需要2个网络请求：一个是请求路由，一个是加载当前内容。</p>
<p>如果你利用HTML5的HistoryAPI 来让URL影响当前内容页的话。你的服务器可以知道那个内容页面将被客户端请求。为了节约请求数，服务端可以把要请求的内容模块放到响应头里面：以script标签的形式来添加，浏览器将并行的加载这俩请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;entry-chunk.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>
<script src=&quot;3.chunk.js&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"entry-chunk.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"3.chunk.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>你可以从build stas里面提取出chunk的filename （stats-webpack-plugin ）</p>
<h3 id="articleHeader7">多页</h3>
<p>当编译一个多页面的app时，你想要在页面之间共享一些代码。这在webpack看来很简单的：只需要和多个入口文件一起编译就好</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack p1=./page1 p2=./page2 p3=./page3 [name].entry-chunk.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">webpack</span> <span class="hljs-built_in">p1</span>=./page1 <span class="hljs-built_in">p2</span>=./page2 <span class="hljs-built_in">p3</span>=./page3 [name].entry-chunk.js</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        p3: &quot;./page3&quot;
    },
    output: {
        filename: &quot;[name].entry.chunk.js&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        p3:</span> <span class="hljs-string">"./page3"</span>
    },
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].entry.chunk.js"</span>
    }
}</code></pre>
<p>由上面可以产出多个入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p1.entry.chunk.js, p2.entry.chunk.js and p3.entry.chunk.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">p1<span class="hljs-selector-class">.entry</span><span class="hljs-selector-class">.chunk</span><span class="hljs-selector-class">.js</span>, p2<span class="hljs-selector-class">.entry</span><span class="hljs-selector-class">.chunk</span><span class="hljs-selector-class">.js</span> and p3<span class="hljs-selector-class">.entry</span><span class="hljs-selector-class">.chunk</span><span class="hljs-selector-class">.js</span></code></pre>
<p>但是可以增加一个chunk来共享她们中的一些代码。 如果你的chunks有一些公用的modules，那我推荐一个很酷的插件CommonsChunkPlugin，它能辨别共用模块并把他们放倒一个文件里面去。你需要在你的页面里添加两个script标签来分别引入入口文件和共用模块文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        p3: &quot;./page3&quot;
    },
    output: {
        filename: &quot;[name].entry.chunk.js&quot;
    },
    plugins: [
        new CommonsChunkPlugin(&quot;commons.chunk.js&quot;)
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var CommonsChunkPlugin = require(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        p3:</span> <span class="hljs-string">"./page3"</span>
    },
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].entry.chunk.js"</span>
    },
<span class="hljs-symbol">    plugins:</span> [
        new CommonsChunkPlugin(<span class="hljs-string">"commons.chunk.js"</span>)
    ]
}</code></pre>
<p>由上面可以产出入口文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p1.entry.chunk.js, p2.entry.chunk.js and p3.entry.chunk.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">p1<span class="hljs-selector-class">.entry</span><span class="hljs-selector-class">.chunk</span><span class="hljs-selector-class">.js</span>, p2<span class="hljs-selector-class">.entry</span><span class="hljs-selector-class">.chunk</span><span class="hljs-selector-class">.js</span> and p3<span class="hljs-selector-class">.entry</span><span class="hljs-selector-class">.chunk</span><span class="hljs-selector-class">.js</span></code></pre>
<p>和共用文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commons.chunk.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">commons<span class="hljs-selector-class">.chunk</span><span class="hljs-selector-class">.js</span></code></pre>
<p>在页面中要首先加载 commons.chunk.js 在加载xx.entry.chunk.js 你可以出实话很多个commons chunks ，通过选择不同的入口文件。并且你可以堆叠使用这些commons chunks。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        p3: &quot;./page3&quot;,
        ap1: &quot;./admin/page1&quot;,
        ap2: &quot;./admin/page2&quot;
    },
    output: {
        filename: &quot;[name].js&quot;
    },
    plugins: [
        new CommonsChunkPlugin(&quot;admin-commons.js&quot;, [&quot;ap1&quot;, &quot;ap2&quot;]),
        new CommonsChunkPlugin(&quot;commons.js&quot;, [&quot;p1&quot;, &quot;p2&quot;, &quot;admin-commons.js&quot;])
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var CommonsChunkPlugin = require(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        p3:</span> <span class="hljs-string">"./page3"</span>,
<span class="hljs-symbol">        ap1:</span> <span class="hljs-string">"./admin/page1"</span>,
<span class="hljs-symbol">        ap2:</span> <span class="hljs-string">"./admin/page2"</span>
    },
<span class="hljs-symbol">    output:</span> {
<span class="hljs-symbol">        filename:</span> <span class="hljs-string">"[name].js"</span>
    },
<span class="hljs-symbol">    plugins:</span> [
        new CommonsChunkPlugin(<span class="hljs-string">"admin-commons.js"</span>, [<span class="hljs-string">"ap1"</span>, <span class="hljs-string">"ap2"</span>]),
        new CommonsChunkPlugin(<span class="hljs-string">"commons.js"</span>, [<span class="hljs-string">"p1"</span>, <span class="hljs-string">"p2"</span>, <span class="hljs-string">"admin-commons.js"</span>])
    ]
};</code></pre>
<p>输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="page1.html: commons.js, p1.js
page2.html: commons.js, p2.js
page3.html: p3.js
admin-page1.html: commons.js, admin-commons.js, ap1.js
admin-page2.html: commons.js, admin-commons.js, ap2.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>page1<span class="hljs-selector-class">.html</span>: commons<span class="hljs-selector-class">.js</span>, p1<span class="hljs-selector-class">.js</span>
page2<span class="hljs-selector-class">.html</span>: commons<span class="hljs-selector-class">.js</span>, p2<span class="hljs-selector-class">.js</span>
page3<span class="hljs-selector-class">.html</span>: p3<span class="hljs-selector-class">.js</span>
admin-page1<span class="hljs-selector-class">.html</span>: commons<span class="hljs-selector-class">.js</span>, admin-commons<span class="hljs-selector-class">.js</span>, ap1<span class="hljs-selector-class">.js</span>
admin-page2<span class="hljs-selector-class">.html</span>: commons<span class="hljs-selector-class">.js</span>, admin-commons<span class="hljs-selector-class">.js</span>, ap2.js</code></pre>
<p>另外你可以将多个共用文件打包到一个共用文件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CommonsChunkPlugin = require(&quot;webpack/lib/optimize/CommonsChunkPlugin&quot;);
module.exports = {
    entry: {
        p1: &quot;./page1&quot;,
        p2: &quot;./page2&quot;,
        commons: &quot;./entry-for-the-commons-chunk&quot;
    },
    plugins: [
        new CommonsChunkPlugin(&quot;commons&quot;, &quot;commons.js&quot;)
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var CommonsChunkPlugin = require(<span class="hljs-string">"webpack/lib/optimize/CommonsChunkPlugin"</span>);
module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        p1:</span> <span class="hljs-string">"./page1"</span>,
<span class="hljs-symbol">        p2:</span> <span class="hljs-string">"./page2"</span>,
<span class="hljs-symbol">        commons:</span> <span class="hljs-string">"./entry-for-the-commons-chunk"</span>
    },
<span class="hljs-symbol">    plugins:</span> [
        new CommonsChunkPlugin(<span class="hljs-string">"commons"</span>, <span class="hljs-string">"commons.js"</span>)
    ]
};</code></pre>
<h1 id="articleHeader8">关于less的组织</h1>
<p>作为一个后端出身的前端工程师，写简单的css实在没有那种代码可配置和结构化的快感。所以引入less是个不错的选择，无论是针对代码后期的管理，还是提高代码的复用能力。</p>
<h2 id="articleHeader9"><code>global.less</code></h2>
<p>这个是全局都可以调用的方法库，我习惯把 项目的配色、各种字号、用于引入混出的方法等写在这里，其他<code>container</code>页面通过<code>@import</code>方式引入它，就可以使用里面的东西。不过定义它时要注意以下两点：</p>
<ul>
<li><p>第一，这个less里只能存放变量和方法，less编译时会忽略它们，只在调用它们的地方才编译成css。所以为了防止代码重复，请不要在这里直接定义样式，而是用一个方法把它们包起来，表示一个用途。</p></li>
<li><p>第二，这个less里的方法如果是针对某些具体标签定义样式的，只能初始化一次，建议在单页的入口<code>container</code>里做，这样好维护。比如<code>reset()</code>（页面标签样式初始化），这个方法放在入口<code>container</code>的 <code>login.less</code>里调用且全局只调用一次。</p></li>
</ul>
<p>下面是我的<code>global.less</code> 常用的一些模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc 一些全局的less
 * @createDate 2016-05-16
 * @author Jafeney <692270687@qq.com>
 **/

// 全局配色
@g-color-active: #ff634d;  //活跃状态的背景色（橘红色）
@g-color-info: #53b2ea;    //一般用途的背景色（浅蓝色）
@g-color-primary: #459df5; //主要用途的背景色 (深蓝色)
@g-color-warning: #f7cec8; //用于提示的背景色 (橘红色较浅)
@g-color-success: #98cf07; //成功状态的背景色 (绿色)
@g-color-fail: #c21f16;    //失败状态的背景色 (红色)
@g-color-danger: #ff634d;  //用于警示的背景色 (橘红色)
@g-color-light: #fde2e1;   //高饱合度淡色的背景色(橘红)

// 全局尺寸
@g-text-default: 14px;
@g-text-sm: 12px;
@g-text-lg: 18px;

// 全局使用的自定义icon（这样写的好处是webpack打包时自动转base64）
@g-icon-logo: url(&quot;../images/logo.png&quot;);
@g-icon-logoBlack: url(&quot;../images/logoBlack.png&quot;);
@g-icon-phone: url(&quot;../images/phone.png&quot;);
@g-icon-message: url(&quot;../images/message.png&quot;);
@g-icon-help: url(&quot;../images/help.png&quot;);
@g-icon-down: url(&quot;../images/down.png&quot;);
@g-icon-top: url(&quot;../images/top.png&quot;);
@g-icon-home: url(&quot;../images/home.png&quot;);
@g-icon-order: url(&quot;../images/order.png&quot;);
@g-icon-cart: url(&quot;../images/cart.png&quot;);
@g-icon-source: url(&quot;../images/source.png&quot;);
@g-icon-business: url(&quot;../images/business.png&quot;);
@g-icon-finance: url(&quot;../images/finance.png&quot;);
@g-icon-account: url(&quot;../images/account.png&quot;);
// ....

// 背景色
@g-color-grey1: #2a2f33;   //黑色
@g-color-grey2: #363b3f;   //深灰色
@g-color-grey3: #e5e5e5;   //灰色
@g-color-grey4: #efefef;   //浅灰色
@g-color-grey5: #f9f9f9;   //很浅
@g-color-grey6: #ffffff;   //白色

// 全局边框
@g-border-default: #e6eaed;
@g-border-active: #53b2ea;
@g-border-light: #f7dfde;

// 常用的border-box盒子模型
.border-box() {
    box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}

// 模拟按钮效果
.btn() {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;

    &amp;:hover {
        opacity: .8;
    }

    &amp;.disabled {
        &amp;:hover {
            opacity: 1;
            cursor: not-allowed;
        }
    }
}

// 超出部分处理
.text-overflow() {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
}

// reset styles
.reset() {
// ....
}

// 一些原子class
.atom() {
    .cp {
        cursor: pointer;
    }
    .ml-5 {
        margin-left: 5px;
    }
    .mr-5 {
        margin-right: 5px;
    }
    .ml-5p {
        margin-left: 5%;
    }
    .mr-5p {
        margin-right: 5%;
    }
    .mt-5 {
        margin-top: 5px;
    }

    .txt-center {
        text-align: center;
    }
    .txt-left {
        text-align: left;
    }
    .txt-right {
        text-align: right;
    }
    .fr {
        float: right;
    }
    .fl {
        float: left;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">/**
 * @desc 一些全局的less
 * @createDate 2016-05-16
 * @author Jafeney &lt;692270687@qq.com&gt;
 **/</span>

<span class="hljs-comment">// 全局配色</span>
<span class="hljs-variable">@g-color-active:</span> <span class="hljs-number">#ff634d</span>;  <span class="hljs-comment">//活跃状态的背景色（橘红色）</span>
<span class="hljs-variable">@g-color-info:</span> <span class="hljs-number">#53b2ea</span>;    <span class="hljs-comment">//一般用途的背景色（浅蓝色）</span>
<span class="hljs-variable">@g-color-primary:</span> <span class="hljs-number">#459df5</span>; <span class="hljs-comment">//主要用途的背景色 (深蓝色)</span>
<span class="hljs-variable">@g-color-warning:</span> <span class="hljs-number">#f7cec8</span>; <span class="hljs-comment">//用于提示的背景色 (橘红色较浅)</span>
<span class="hljs-variable">@g-color-success:</span> <span class="hljs-number">#98cf07</span>; <span class="hljs-comment">//成功状态的背景色 (绿色)</span>
<span class="hljs-variable">@g-color-fail:</span> <span class="hljs-number">#c21f16</span>;    <span class="hljs-comment">//失败状态的背景色 (红色)</span>
<span class="hljs-variable">@g-color-danger:</span> <span class="hljs-number">#ff634d</span>;  <span class="hljs-comment">//用于警示的背景色 (橘红色)</span>
<span class="hljs-variable">@g-color-light:</span> <span class="hljs-number">#fde2e1</span>;   <span class="hljs-comment">//高饱合度淡色的背景色(橘红)</span>

<span class="hljs-comment">// 全局尺寸</span>
<span class="hljs-variable">@g-text-default:</span> <span class="hljs-number">14px</span>;
<span class="hljs-variable">@g-text-sm:</span> <span class="hljs-number">12px</span>;
<span class="hljs-variable">@g-text-lg:</span> <span class="hljs-number">18px</span>;

<span class="hljs-comment">// 全局使用的自定义icon（这样写的好处是webpack打包时自动转base64）</span>
<span class="hljs-variable">@g-icon-logo:</span> url(<span class="hljs-string">"../images/logo.png"</span>);
<span class="hljs-variable">@g-icon-logoBlack:</span> url(<span class="hljs-string">"../images/logoBlack.png"</span>);
<span class="hljs-variable">@g-icon-phone:</span> url(<span class="hljs-string">"../images/phone.png"</span>);
<span class="hljs-variable">@g-icon-message:</span> url(<span class="hljs-string">"../images/message.png"</span>);
<span class="hljs-variable">@g-icon-help:</span> url(<span class="hljs-string">"../images/help.png"</span>);
<span class="hljs-variable">@g-icon-down:</span> url(<span class="hljs-string">"../images/down.png"</span>);
<span class="hljs-variable">@g-icon-top:</span> url(<span class="hljs-string">"../images/top.png"</span>);
<span class="hljs-variable">@g-icon-home:</span> url(<span class="hljs-string">"../images/home.png"</span>);
<span class="hljs-variable">@g-icon-order:</span> url(<span class="hljs-string">"../images/order.png"</span>);
<span class="hljs-variable">@g-icon-cart:</span> url(<span class="hljs-string">"../images/cart.png"</span>);
<span class="hljs-variable">@g-icon-source:</span> url(<span class="hljs-string">"../images/source.png"</span>);
<span class="hljs-variable">@g-icon-business:</span> url(<span class="hljs-string">"../images/business.png"</span>);
<span class="hljs-variable">@g-icon-finance:</span> url(<span class="hljs-string">"../images/finance.png"</span>);
<span class="hljs-variable">@g-icon-account:</span> url(<span class="hljs-string">"../images/account.png"</span>);
<span class="hljs-comment">// ....</span>

<span class="hljs-comment">// 背景色</span>
<span class="hljs-variable">@g-color-grey1:</span> <span class="hljs-number">#2a2f33</span>;   <span class="hljs-comment">//黑色</span>
<span class="hljs-variable">@g-color-grey2:</span> <span class="hljs-number">#363b3f</span>;   <span class="hljs-comment">//深灰色</span>
<span class="hljs-variable">@g-color-grey3:</span> <span class="hljs-number">#e5e5e5</span>;   <span class="hljs-comment">//灰色</span>
<span class="hljs-variable">@g-color-grey4:</span> <span class="hljs-number">#efefef</span>;   <span class="hljs-comment">//浅灰色</span>
<span class="hljs-variable">@g-color-grey5:</span> <span class="hljs-number">#f9f9f9</span>;   <span class="hljs-comment">//很浅</span>
<span class="hljs-variable">@g-color-grey6:</span> <span class="hljs-number">#ffffff</span>;   <span class="hljs-comment">//白色</span>

<span class="hljs-comment">// 全局边框</span>
<span class="hljs-variable">@g-border-default:</span> <span class="hljs-number">#e6eaed</span>;
<span class="hljs-variable">@g-border-active:</span> <span class="hljs-number">#53b2ea</span>;
<span class="hljs-variable">@g-border-light:</span> <span class="hljs-number">#f7dfde</span>;

<span class="hljs-comment">// 常用的border-box盒子模型</span>
<span class="hljs-selector-class">.border-box</span>() {
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">-ms-box-sizing</span>: border-box;
    <span class="hljs-attribute">-moz-box-sizing</span>: border-box;
    <span class="hljs-attribute">-o-box-sizing</span>: border-box;
    <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
}

<span class="hljs-comment">// 模拟按钮效果</span>
<span class="hljs-selector-class">.btn</span>() {
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">-webkit-user-select</span>: none;
    <span class="hljs-attribute">-moz-user-select</span>: none;
    <span class="hljs-attribute">-ms-user-select</span>: none;
    <span class="hljs-attribute">-o-user-select</span>: none;

    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">8</span>;
    }

    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.disabled</span> {
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">cursor</span>: not-allowed;
        }
    }
}

<span class="hljs-comment">// 超出部分处理</span>
<span class="hljs-selector-class">.text-overflow</span>() {
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">text-overflow</span>: ellipsis;
    <span class="hljs-attribute">-o-text-overflow</span>: ellipsis;
    <span class="hljs-attribute">-webkit-text-overflow</span>: ellipsis;
    <span class="hljs-attribute">-moz-text-overflow</span>: ellipsis;
    <span class="hljs-attribute">white-space</span>: nowrap;
}

<span class="hljs-comment">// reset styles</span>
<span class="hljs-selector-class">.reset</span>() {
<span class="hljs-comment">// ....</span>
}

<span class="hljs-comment">// 一些原子class</span>
<span class="hljs-selector-class">.atom</span>() {
    <span class="hljs-selector-class">.cp</span> {
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    <span class="hljs-selector-class">.ml-5</span> {
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-class">.mr-5</span> {
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
    }
    <span class="hljs-selector-class">.ml-5p</span> {
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">5%</span>;
    }
    <span class="hljs-selector-class">.mr-5p</span> {
        <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5%</span>;
    }
    <span class="hljs-selector-class">.mt-5</span> {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">5px</span>;
    }

    <span class="hljs-selector-class">.txt-center</span> {
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-class">.txt-left</span> {
        <span class="hljs-attribute">text-align</span>: left;
    }
    <span class="hljs-selector-class">.txt-right</span> {
        <span class="hljs-attribute">text-align</span>: right;
    }
    <span class="hljs-selector-class">.fr</span> {
        <span class="hljs-attribute">float</span>: right;
    }
    <span class="hljs-selector-class">.fl</span> {
        <span class="hljs-attribute">float</span>: left;
    }
}</code></pre>
<h2 id="articleHeader10">
<code>component</code>的less</h2>
<p>为了降低组件的耦合性，每个组件的less必须单独写，样式跟着组件走，一个组件一个less，不要有其他依赖，保证组件的高移植能力。<br>而且组件应该针对用途提供几套样式方案，比如<code>button</code>组件，我们可以针对颜色提供不同的样式，以样式组合的方式提供给外部使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 下面的变量可以针对不同的需求进行配置
@color-primary: #459df5; 
@color-warning: #f7cec8; 
@color-success: #98cf07; 
@color-fail: #c21f16;    

.btn {
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    display: inline-block;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -o-box-sizing: border-box;
    text-align: center;
    
    // 鼠标放上时
    &amp;:hover {
        opacity: .8;
    }
    
    // 按钮不可用时
    &amp;.disabled {
        &amp;:hover {
            opacity: 1;
            cursor: not-allowed;
        }
    }
    
    // 填充式按钮
    &amp;.full {
        color: #fff;
        &amp;.primary {
            background-color:  @color-primary;
            border: 1px solid @color-primary;
        }
        // ....
    }

    // 边框式按钮 
    &amp;.border {
       background-color:  #fff;
       &amp;.primary {
            color: @color-primary;
            border: 1px solid @color-primary;
        }
        // ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 下面的变量可以针对不同的需求进行配置</span>
<span class="hljs-variable">@color-primary:</span> <span class="hljs-number">#459df5</span>; 
<span class="hljs-variable">@color-warning:</span> <span class="hljs-number">#f7cec8</span>; 
<span class="hljs-variable">@color-success:</span> <span class="hljs-number">#98cf07</span>; 
<span class="hljs-variable">@color-fail:</span> <span class="hljs-number">#c21f16</span>;    

<span class="hljs-selector-class">.btn</span> {
    <span class="hljs-attribute">cursor</span>: pointer;
    <span class="hljs-attribute">user-select</span>: none;
    <span class="hljs-attribute">-webkit-user-select</span>: none;
    <span class="hljs-attribute">-moz-user-select</span>: none;
    <span class="hljs-attribute">-ms-user-select</span>: none;
    <span class="hljs-attribute">-o-user-select</span>: none;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">-webkit-box-sizing</span>: border-box;
    <span class="hljs-attribute">-ms-box-sizing</span>: border-box;
    <span class="hljs-attribute">-moz-box-sizing</span>: border-box;
    <span class="hljs-attribute">-o-box-sizing</span>: border-box;
    <span class="hljs-attribute">text-align</span>: center;
    
    <span class="hljs-comment">// 鼠标放上时</span>
    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">opacity</span>: .<span class="hljs-number">8</span>;
    }
    
    <span class="hljs-comment">// 按钮不可用时</span>
    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.disabled</span> {
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-pseudo">:hover</span> {
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">cursor</span>: not-allowed;
        }
    }
    
    <span class="hljs-comment">// 填充式按钮</span>
    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.full</span> {
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.primary</span> {
            <span class="hljs-attribute">background-color</span>:  <span class="hljs-variable">@color-primary</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-variable">@color-primary</span>;
        }
        <span class="hljs-comment">// ....</span>
    }

    <span class="hljs-comment">// 边框式按钮 </span>
    <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.border</span> {
       <span class="hljs-attribute">background-color</span>:  <span class="hljs-number">#fff</span>;
       <span class="hljs-selector-tag">&amp;</span><span class="hljs-selector-class">.primary</span> {
            <span class="hljs-attribute">color</span>: <span class="hljs-variable">@color-primary</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-variable">@color-primary</span>;
        }
        <span class="hljs-comment">// ...</span>
    }
}</code></pre>
<h2 id="articleHeader11">
<code>container</code>的less</h2>
<p>同上，每个<code>container</code>一个less文件，可以复用的模块尽量封装成<code>component</code>，而不是偷懒复制几行样式过来，这样虽然方便一时，但随着项目的迭代，后期的冗余代码会多得超出你的想象。<br>如果遵循组件化的设计思想，你会发现<code>container</code>里其实只有一些布局和尺寸定义相关的代码，非常容易维护。</p>
<blockquote><p>这是大型项目的设计要领，除此之外就是大局观的培养，这点尤为重要，项目一拿来不要马上就动手写页面，而是应该多花些时间在代码的设计上，把全局的东西剥离出来，越细越好；把可复用的模块设计成组件，思考组件的拓展性和不同的用途，记住—— 结构上尽量减少依赖关系，保持组件的独立性，而用途上多考虑功能的聚合，即所谓的低耦合高聚合。</p></blockquote>
<p>不过实际项目不可能每个组件都是独立存在的，有时我们为了进一步减少代码量，会把一些常用的组件整合成一个大组件来使用，即复合组件。所以每个项目实际上存在一级组件（独立）和二级组件（复合）。一级组件可以随意迁移，而二级组件是针对实际场景而生的，两者并没有好坏之分，一切都为了高效地生产代码，存在即合理。</p>
<h1 id="articleHeader12">关于React的组织</h1>
<p>本项目的React代码都用JavaScript的ES6风格编写，代码非常地优雅，而且语言自身支持模块化，再也不用依赖<code>Browserify</code>、<code>RequireJS</code>等工具了，非常爽。如果你不会ES6，建议去翻一翻阮一峰老师的<a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">《ES6标准入门》</a></p>
<h2 id="articleHeader13">入口</h2>
<p>入口模块<code>index.js</code>放在<code>src</code>的根目录，是外部调用的入口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { render } from 'react-dom'
// 引入redux
import { Provider } from 'react-redux'
// 引入router
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import configureStore from './configureStore'

const store = configureStore(hashHistory)  // 路由的store
const history = syncHistoryWithStore(hashHistory, store) // 路由的历史纪录（会写入到浏览器的历史纪录）

render(
  (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  ), document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>
<span class="hljs-comment">// 引入redux</span>
<span class="hljs-keyword">import</span> { Provider } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>
<span class="hljs-comment">// 引入router</span>
<span class="hljs-keyword">import</span> { Router, hashHistory } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>
<span class="hljs-keyword">import</span> { syncHistoryWithStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-redux'</span>
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes'</span>
<span class="hljs-keyword">import</span> configureStore <span class="hljs-keyword">from</span> <span class="hljs-string">'./configureStore'</span>

<span class="hljs-keyword">const</span> store = configureStore(hashHistory)  <span class="hljs-comment">// 路由的store</span>
<span class="hljs-keyword">const</span> history = syncHistoryWithStore(hashHistory, store) <span class="hljs-comment">// 路由的历史纪录（会写入到浏览器的历史纪录）</span>

render(
  (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> <span class="hljs-attr">history</span>=<span class="hljs-string">{history}</span> <span class="hljs-attr">routes</span>=<span class="hljs-string">{routes}</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span>
  ), document.getElementById('root')
)</span></code></pre>
<h2 id="articleHeader14">路由</h2>
<p>这里主要应用了<code>react-route</code>组件来制作哈希路由，使用方式很简单，和ReactNative里的Navigator组件类似。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import { Route } from 'react-router'

import Manager from './containers/manager'

import Login from './containers/Login/'
import Register from './containers/Register/'
import Password from './containers/Password/'
import Dashboard from './containers/Dashboard/'

const routes = (
  <Route>
    <Route path=&quot;&quot; component={Manager}>                                // 主容器
        <Route path=&quot;/&quot; component={Dashboard} />                       // 仪表盘
        // .... 各模块的container
    </Route>
    <Route path=&quot;login&quot; component={Login} />                           // 登录
    <Route path=&quot;register&quot; component={Register} />                     // 注册
    <Route path=&quot;password&quot; component={Password} />                     // 找回密码
  </Route>
)

export default routes
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>

<span class="hljs-keyword">import</span> Manager <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/manager'</span>

<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Login/'</span>
<span class="hljs-keyword">import</span> Register <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Register/'</span>
<span class="hljs-keyword">import</span> Password <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Password/'</span>
<span class="hljs-keyword">import</span> Dashboard <span class="hljs-keyword">from</span> <span class="hljs-string">'./containers/Dashboard/'</span>

const routes = (
  &lt;Route&gt;
    &lt;Route path=<span class="hljs-string">""</span> component={Manager}&gt;                                <span class="hljs-comment">// 主容器</span>
        &lt;Route path=<span class="hljs-string">"/"</span> component={Dashboard} /&gt;                       <span class="hljs-comment">// 仪表盘</span>
        <span class="hljs-comment">// .... 各模块的container</span>
    &lt;/Route&gt;
    &lt;Route path=<span class="hljs-string">"login"</span> component={Login} /&gt;                           <span class="hljs-comment">// 登录</span>
    &lt;Route path=<span class="hljs-string">"register"</span> component={Register} /&gt;                     <span class="hljs-comment">// 注册</span>
    &lt;Route path=<span class="hljs-string">"password"</span> component={Password} /&gt;                     <span class="hljs-comment">// 找回密码</span>
  &lt;/Route&gt;
)

<span class="hljs-keyword">export</span> default routes
</code></pre>
<h2 id="articleHeader15">了解action、store、reducer</h2>
<p>从调用关系来看如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.dispatch(action) --> reducer(state, action) --> final state" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">store.dispatch(action) --&gt; reducer(<span class="hljs-keyword">state</span>, action) --&gt; final <span class="hljs-keyword">state</span></code></pre>
<p>来个实际的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducer方法, 传入的参数有两个
// state: 当前的state
// action: 当前触发的行为, {type: 'xx'}
// 返回值: 新的state
var reducer = function(state, action){
    switch (action.type) {
        case 'add_todo':
            return state.concat(action.text);
        default:
            return state;
    }
};

// 创建store, 传入两个参数
// 参数1: reducer 用来修改state
// 参数2(可选): [], 默认的state值,如果不传, 则为undefined
var store = redux.createStore(reducer, []);

// 通过 store.getState() 可以获取当前store的状态(state)
// 默认的值是 createStore 传入的第二个参数
console.log('state is: ' + store.getState());  // state is:

// 通过 store.dispatch(action) 来达到修改 state 的目的
// 注意: 在redux里,唯一能够修改state的方法,就是通过 store.dispatch(action)
store.dispatch({type: 'add_todo', text: '读书'});
// 打印出修改后的state
console.log('state is: ' + store.getState());  // state is: 读书

store.dispatch({type: 'add_todo', text: '写作'});
console.log('state is: ' + store.getState());  // state is: 读书,写作" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// reducer方法, 传入的参数有两个
// <span class="hljs-keyword">state</span>: 当前的<span class="hljs-keyword">state</span>
// action: 当前触发的行为, {type: 'xx'}
// 返回值: 新的<span class="hljs-keyword">state</span>
var reducer = function(<span class="hljs-keyword">state</span>, action){
    switch (action.type) {
        case 'add_todo':
            return <span class="hljs-keyword">state</span>.concat(action.text);
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
};

// 创建store, 传入两个参数
// 参数<span class="hljs-number">1</span>: reducer 用来修改<span class="hljs-keyword">state</span>
// 参数<span class="hljs-number">2</span>(可选): [], 默认的<span class="hljs-keyword">state</span>值,如果不传, 则为undefined
var store = redux.createStore(reducer, []);

// 通过 store.getState() 可以获取当前store的状态(<span class="hljs-keyword">state</span>)
// 默认的值是 createStore 传入的第二个参数
console.<span class="hljs-keyword">log</span>('<span class="hljs-keyword">state</span> is: ' + store.getState());  // <span class="hljs-keyword">state</span> is:

// 通过 store.dispatch(action) 来达到修改 <span class="hljs-keyword">state</span> 的目的
// 注意: 在redux里,唯一能够修改<span class="hljs-keyword">state</span>的方法,就是通过 store.dispatch(action)
store.dispatch({type: 'add_todo', text: '读书'});
// 打印出修改后的<span class="hljs-keyword">state</span>
console.<span class="hljs-keyword">log</span>('<span class="hljs-keyword">state</span> is: ' + store.getState());  // <span class="hljs-keyword">state</span> is: 读书

store.dispatch({type: 'add_todo', text: '写作'});
console.<span class="hljs-keyword">log</span>('<span class="hljs-keyword">state</span> is: ' + store.getState());  // <span class="hljs-keyword">state</span> is: 读书,写作</code></pre>
<h3 id="articleHeader16">store、reducer、action关联</h3>
<p>store：对flux有了解的同学应该有所了解，store在这里代表的是数据模型，内部维护了一个state变量，用例描述应用的状态。store有两个核心方法，分别是getState、dispatch。前者用来获取store的状态（state），后者用来修改store的状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建store, 传入两个参数
// 参数1: reducer 用来修改state
// 参数2(可选): [], 默认的state值,如果不传, 则为undefined
var store = redux.createStore(reducer, []);

// 通过 store.getState() 可以获取当前store的状态(state)
// 默认的值是 createStore 传入的第二个参数
console.log('state is: ' + store.getState());  // state is:

// 通过 store.dispatch(action) 来达到修改 state 的目的
// 注意: 在redux里,唯一能够修改state的方法,就是通过 store.dispatch(action)
store.dispatch({type: 'add_todo', text: '读书'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 创建store, 传入两个参数
// 参数<span class="hljs-number">1</span>: reducer 用来修改<span class="hljs-keyword">state</span>
// 参数<span class="hljs-number">2</span>(可选): [], 默认的<span class="hljs-keyword">state</span>值,如果不传, 则为undefined
var store = redux.createStore(reducer, []);

// 通过 store.getState() 可以获取当前store的状态(<span class="hljs-keyword">state</span>)
// 默认的值是 createStore 传入的第二个参数
console.<span class="hljs-keyword">log</span>('<span class="hljs-keyword">state</span> is: ' + store.getState());  // <span class="hljs-keyword">state</span> is:

// 通过 store.dispatch(action) 来达到修改 <span class="hljs-keyword">state</span> 的目的
// 注意: 在redux里,唯一能够修改<span class="hljs-keyword">state</span>的方法,就是通过 store.dispatch(action)
store.dispatch({type: 'add_todo', text: '读书'});</code></pre>
<p>action：对行为（如用户行为）的抽象，在redux里是一个普通的js对象。redux对action的约定比较弱，除了一点，action必须有一个type字段来标识这个行为的类型。所以，下面的都是合法的action</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{type:'add_todo', text:'读书'}
{type:'add_todo', text:'写作'}
{type:'add_todo', text:'睡觉', time:'晚上'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{<span class="hljs-attribute">type</span>:<span class="hljs-string">'add_todo'</span>, text:<span class="hljs-string">'读书'</span>}
{<span class="hljs-attribute">type</span>:<span class="hljs-string">'add_todo'</span>, text:<span class="hljs-string">'写作'</span>}
{<span class="hljs-attribute">type</span>:<span class="hljs-string">'add_todo'</span>, text:<span class="hljs-string">'睡觉'</span>, time:<span class="hljs-string">'晚上'</span>}</code></pre>
<p>reducer：一个普通的函数，用来修改store的状态。传入两个参数 state、action。其中，state为当前的状态（可通过store.getState()获得），而action为当前触发的行为（通过store.dispatch(action)调用触发）。reducer(state, action) 返回的值，就是store最新的state值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// reducer方法, 传入的参数有两个
// state: 当前的state
// action: 当前触发的行为, {type: 'xx'}
// 返回值: 新的state
var reducer = function(state, action){
    switch (action.type) {
        case 'add_todo':
            return state.concat(action.text);
        default:
            return state;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// reducer方法, 传入的参数有两个
// <span class="hljs-keyword">state</span>: 当前的<span class="hljs-keyword">state</span>
// action: 当前触发的行为, {type: 'xx'}
// 返回值: 新的<span class="hljs-keyword">state</span>
var reducer = function(<span class="hljs-keyword">state</span>, action){
    switch (action.type) {
        case 'add_todo':
            return <span class="hljs-keyword">state</span>.concat(action.text);
        <span class="hljs-keyword">default</span>:
            return <span class="hljs-keyword">state</span>;
    }
}</code></pre>
<h1 id="articleHeader17">React式编程思维</h1>
<p>在没有遁入React之前，我是一个DOM操作控，不论是<code>jQuery</code>还是<code>zepto</code>，我在页面交互的实现上用的最多的就是DOM操作，把复杂的交互一步一步通过选择器和事件委托绑定到document上，然后逐个连贯起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).on('event', 'element', function(e){
    e.preventDefault();
    var that = this;
    var parent = $(this).parent();
    var siblings = $(this).siblings();
    var children = $(this).children();
    // .....
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>$(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'event'</span>, <span class="hljs-string">'element'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    e.preventDefault();
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> parent = $(<span class="hljs-keyword">this</span>).parent();
    <span class="hljs-keyword">var</span> siblings = $(<span class="hljs-keyword">this</span>).siblings();
    <span class="hljs-keyword">var</span> children = $(<span class="hljs-keyword">this</span>).children();
    <span class="hljs-comment">// .....</span>
});</code></pre>
<p>这是<code>jQuery</code>式的编程思维，<code>React</code>和它截然不同。<code>React</code>的设计是基于组件化的，每个组件通过生命周期维护统一的<code>state</code>，<code>state</code>改变，组件便<code>update</code>，重新触发<code>render</code>，即重新渲染页面。而这个过程操作的其实是内存里的<code>虚拟DOM</code>，而不是真正的DOM节点，加上其内部的差异更新算法，所以性能上比传统的DOM操作要好。</p>
<p><strong>举个简单的例子：</strong></p>
<p>现在要实现一个模态组件，如果用jQuery式的编程思维，很习惯这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc 全局模态窗口
 **/
var $ = window.$;
var modal = {
    confirm: function(opts) {
        var title = opts.title || '提示',
            content = opts.content || '提示内容',
            callback = opts.callback;
        var newNode = [
            '<div class=&quot;mask&quot; id=&quot;J_mask&quot;>',
                '<div class=&quot;modal-box&quot;>',
                    '<h2>',
                        title,
                    '</h2>',
                    '<p>',
                        content,
                    '</p>',
                    '<div class=&quot;mask-btns&quot;>',
                        '<span id=&quot;J_cancel&quot;>取消</span>',
                        '<span id=&quot;J_confirm&quot;>确定</span>',
                    '</div>',
                '</div>',
            '</div>',
        ].join('');
        $('#J_mask').remove();
        $('body').append(newNode);

        $('#J_cancel').on('click', function() {
            $('#J_mask').remove();
        });

        $('#J_confirm').on('click', function() {
            if (typeof callback === 'function') {
                callback();
            }
            $('#J_mask').remove();
        });
    }
};
module.exports = modal;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @desc 全局模态窗口
 **/</span>
<span class="hljs-keyword">var</span> $ = <span class="hljs-built_in">window</span>.$;
<span class="hljs-keyword">var</span> modal = {
    <span class="hljs-attr">confirm</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">opts</span>) </span>{
        <span class="hljs-keyword">var</span> title = opts.title || <span class="hljs-string">'提示'</span>,
            content = opts.content || <span class="hljs-string">'提示内容'</span>,
            callback = opts.callback;
        <span class="hljs-keyword">var</span> newNode = [
            <span class="hljs-string">'&lt;div class="mask" id="J_mask"&gt;'</span>,
                <span class="hljs-string">'&lt;div class="modal-box"&gt;'</span>,
                    <span class="hljs-string">'&lt;h2&gt;'</span>,
                        title,
                    <span class="hljs-string">'&lt;/h2&gt;'</span>,
                    <span class="hljs-string">'&lt;p&gt;'</span>,
                        content,
                    <span class="hljs-string">'&lt;/p&gt;'</span>,
                    <span class="hljs-string">'&lt;div class="mask-btns"&gt;'</span>,
                        <span class="hljs-string">'&lt;span id="J_cancel"&gt;取消&lt;/span&gt;'</span>,
                        <span class="hljs-string">'&lt;span id="J_confirm"&gt;确定&lt;/span&gt;'</span>,
                    <span class="hljs-string">'&lt;/div&gt;'</span>,
                <span class="hljs-string">'&lt;/div&gt;'</span>,
            <span class="hljs-string">'&lt;/div&gt;'</span>,
        ].join(<span class="hljs-string">''</span>);
        $(<span class="hljs-string">'#J_mask'</span>).remove();
        $(<span class="hljs-string">'body'</span>).append(newNode);

        $(<span class="hljs-string">'#J_cancel'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#J_mask'</span>).remove();
        });

        $(<span class="hljs-string">'#J_confirm'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> callback === <span class="hljs-string">'function'</span>) {
                callback();
            }
            $(<span class="hljs-string">'#J_mask'</span>).remove();
        });
    }
};
<span class="hljs-built_in">module</span>.exports = modal;</code></pre>
<p>然后在页面的JavaScript里通过选择器触发模态和传递参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Modal = require('modal');
var $ = window.$;
var app = (function() {
    var init = function() {
        eventBind();
    };
    var eventBind = function() {
        $(document).on('click', '#btnShowModal', function() {
            Modal.confirm({
                title: '提示',
                content: '你好！世界',
                callback: function() {
                    console.log('Hello World');
                }
            });
        });
    };
    init();
})(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Modal = <span class="hljs-built_in">require</span>(<span class="hljs-string">'modal'</span>);
<span class="hljs-keyword">var</span> $ = <span class="hljs-built_in">window</span>.$;
<span class="hljs-keyword">var</span> app = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        eventBind();
    };
    <span class="hljs-keyword">var</span> eventBind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-built_in">document</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-string">'#btnShowModal'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            Modal.confirm({
                <span class="hljs-attr">title</span>: <span class="hljs-string">'提示'</span>,
                <span class="hljs-attr">content</span>: <span class="hljs-string">'你好！世界'</span>,
                <span class="hljs-attr">callback</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Hello World'</span>);
                }
            });
        });
    };
    init();
})(); </code></pre>
<p>如果采用<code>React</code>式的编程思维，它应该是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc 全局模态组件 Component
 * @author Jafeney
 * @createDate 2016-05-17
 * */
import React, { Component } from 'react'
import './index.less'

class Modal extends Component {
    constructor() {
        super()
        this.state = {
            jsMask: 'mask hidden'
        }
    }
    show() {
        this.setState({
            jsMask: 'mask'
        })
    }
    close() {
        this.setState({
            jsMask: 'mask hidden'
        })
    }
    confirm() {
        this.props.onConfirm &amp;&amp; this.props.onConfirm()
    }
     render() {
         return (
             <div className={this.state.jsMask}>
                <div className=&quot;modal-box&quot; style={this.props.style}>
                    <div className=&quot;header&quot;>
                        <h3>{ this.props.title }</h3>
                        <span className=&quot;icon-remove closed-mask&quot; onClick={()=>this.close()}></span>
                    </div>
                    <div className=&quot;content&quot;>
                        { this.props.children }
                    </div>
                    <div className=&quot;mask-btns&quot;>
                        <span className=&quot;btn-full-danger&quot; onClick={()=>this.confirm()}>{ this.props.confirmText || '确定' }</span>
                        { this.props.showCancel &amp;&amp; (<span className=&quot;btn-border-danger&quot; onClick={()=>this.close()}>取消</span>) }
                    </div>
                </div>
             </div>
         );
     }
}
export default Modal" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @desc 全局模态组件 Component
 * @author Jafeney
 * @createDate 2016-05-17
 * */</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./index.less'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Modal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>()
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">jsMask</span>: <span class="hljs-string">'mask hidden'</span>
        }
    }
    show() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">jsMask</span>: <span class="hljs-string">'mask'</span>
        })
    }
    close() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">jsMask</span>: <span class="hljs-string">'mask hidden'</span>
        })
    }
    confirm() {
        <span class="hljs-keyword">this</span>.props.onConfirm &amp;&amp; <span class="hljs-keyword">this</span>.props.onConfirm()
    }
     render() {
         <span class="hljs-keyword">return</span> (
             <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{this.state.jsMask}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"modal-box"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{this.props.style}</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"header"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{ this.props.title }<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"icon-remove closed-mask"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>this.close()}&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"content"</span>&gt;</span>
                        { this.props.children }
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"mask-btns"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn-full-danger"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>this.confirm()}&gt;{ this.props.confirmText || '确定' }<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        { this.props.showCancel &amp;&amp; (<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"btn-border-danger"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>this.close()}&gt;取消<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>) }
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
         );
     }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Modal</code></pre>
<p>然后在<code>container</code>的<code>render()</code>函数里通过标签的方式引入，并通过点击触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {React, component} from 'react'; 
import Modal from 'Modal';

class App extends Component {
    render() {
       <div>
            <button onClick = {()=> {this.refs.modal.show()"}}"
            <Modal title={&quot;提示&quot;} 
                   style="{{"width: 420, height: 200"}}"
                   ref={(ref)=> this.modal = ref} 
                   onConfirm={()=>this.onModalConfirm()}>
                   <p className=&quot;tips&quot;>Hello world!</p>
            </Modal>
       </div>
    }
}

export default App" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {React, component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>; 
<span class="hljs-keyword">import</span> Modal <span class="hljs-keyword">from</span> <span class="hljs-string">'Modal'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
       &lt;div&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span> = <span class="hljs-string">{()</span>=&gt;</span> {this.refs.modal.show()"}}"
            <span class="hljs-tag">&lt;<span class="hljs-name">Modal</span> <span class="hljs-attr">title</span>=<span class="hljs-string">{</span>"提示"} 
                   <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"width:</span> <span class="hljs-attr">420</span>, <span class="hljs-attr">height:</span> <span class="hljs-attr">200</span>"}}"
                   <span class="hljs-attr">ref</span>=<span class="hljs-string">{(ref)</span>=&gt;</span> this.modal = ref} 
                   onConfirm={()=&gt;this.onModalConfirm()}&gt;
                   <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"tips"</span>&gt;</span>Hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Modal</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App</code></pre>
<p>你会发现，上面的代码并没有刻意地操作某个DOM元素的样式，而是通过改变组件的<code>state</code>去触发自身的渲染函数。换句话说，我们不需要写繁琐的DOM操作，而是靠改变组件的<code>state</code>控制组件的交互和各种变化。这种思维方式的好处等你熟悉<code>React</code>之后自然会明白，可以大大地减少后期的代码量。</p>
<h1 id="articleHeader18">优化渲染</h1>
<p>前面提到组件的<code>state</code>改变即触发<code>render()</code>，<code>React</code>内部虽然做了一些算法上的优化，但是我们可以结合<code>Immutable</code>做进一步的渲染优化，让页面更新渲染速度变得更快。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc PureRender 优化渲染
 **/

import React, { Component } from 'react'
import Immutable from 'immutable';

export default {
    // 深度比较
    deepCompare: (self, nextProps, nextState) => {
        return !Immutable.is(self.props, nextProps) || !Immutable.is(self.state, nextState)
     },
    // 阻止没必要的渲染
    loadDetection: (reducers=[])=> {
        for (let r of reducers) {
            if (!r.get('preload')) return (<div />)
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @desc PureRender 优化渲染
 **/</span>

<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> Immutable <span class="hljs-keyword">from</span> <span class="hljs-string">'immutable'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// 深度比较</span>
    deepCompare: <span class="hljs-function">(<span class="hljs-params">self, nextProps, nextState</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> !Immutable.is(self.props, nextProps) || !Immutable.is(self.state, nextState)
     },
    <span class="hljs-comment">// 阻止没必要的渲染</span>
    loadDetection: <span class="hljs-function">(<span class="hljs-params">reducers=[]</span>)=&gt;</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> r <span class="hljs-keyword">of</span> reducers) {
            <span class="hljs-keyword">if</span> (!r.get(<span class="hljs-string">'preload'</span>)) <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span>)
        }
    }
}
</span></code></pre>
<p>这样我们在<code>container</code>的<code>render()</code>函数里就可以调用它进行渲染优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import PureRenderMixin from '../../mixins/PureRender';

class App extends Component { 
    render() {
        let { actions, account, accountLogs, bankBind } = this.props；
        // 数据导入检测
        let error = PureRenderMixin.loadDetection([account, accountLogs, bankBind])
        // 如果和上次没有差异就阻止组件重新渲染
        if (error) return error   
        return (
            <div>
                // something ...
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'
<span class="hljs-keyword">import</span> <span class="hljs-type">PureRenderMixin</span> from '../../mixins/<span class="hljs-type">PureRender</span>';

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{ 
    render() {
        let { actions, account, accountLogs, bankBind } = <span class="hljs-keyword">this</span>.props；
        <span class="hljs-comment">// 数据导入检测</span>
        let error = <span class="hljs-type">PureRenderMixin</span>.loadDetection([account, accountLogs, bankBind])
        <span class="hljs-comment">// 如果和上次没有差异就阻止组件重新渲染</span>
        <span class="hljs-keyword">if</span> (error) <span class="hljs-keyword">return</span> error   
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                <span class="hljs-comment">// something ...</span>
            &lt;/div&gt;
        );
    }
}</code></pre>
<h1 id="articleHeader19">全局模块的处理</h1>
<p>其实<code>Redux</code>最大的作用就是有效减少代码量，把繁琐的操作通过 <code>action ----&gt;  reducer ----&gt; store </code> 进行抽象，最后维护统一的<code>state</code>。对于页面的全局模块，简单地封装成<code>mixin</code>来调用还是不够的，比如全局的<code>request</code>模块，下面介绍如何用<code>Redux</code>进行改造。</p>
<p>首先在<code>types.js</code>里进行声明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// request
export const REQUEST_PEDDING = 'REQUEST_PEDDING';
export const REQUEST_DONE = 'REQUEST_DONE';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_CLEAN = 'REQUEST_CLEAN';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// request</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> REQUEST_PEDDING = <span class="hljs-string">'REQUEST_PEDDING'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> REQUEST_DONE = <span class="hljs-string">'REQUEST_DONE'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> REQUEST_ERROR = <span class="hljs-string">'REQUEST_ERROR'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> REQUEST_CLEAN = <span class="hljs-string">'REQUEST_CLEAN'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> REQUEST_SUCCESS = <span class="hljs-string">'REQUEST_SUCCESS'</span>;</code></pre>
<p>然后编写<code>action</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc 网络请求模块的actions
 **/

// fetch 需要使用 Promise 的 polyfill
import {
  pendingTask, // The action key for modifying loading state
  begin, // The action value if a &quot;long&quot; running task begun
  end // The action value if a &quot;long&quot; running task ended
} from 'react-redux-spinner';
import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import Immutable from 'immutable'
import * as CONFIG from './config';   //请求的配置文件
import * as TYPES from './types';

export function request(route, params, dispatch, success=null, error=null, { method='GET', headers={}, body=null } = {}) {
  dispatch({type: TYPES.REQUEST_PEDDING, [ pendingTask ]: begin})
  // 处理query
  const p = params ? '?' + Object.entries(params).map( (i)=> `${i[0]}=${encodeURI(i[1])}` ).join('&amp;') : ''
  const uri = `${ CONFIG.API_URI }${ route }${ p }`
  let data = {method: method, headers: headers}
  if (method!='GET') data.body = body
  fetch(uri, data)
    .then((response) => {
      dispatch({type: TYPES.REQUEST_DONE, [ pendingTask ]: end})
      return response.json()
    })
    .then((data) => {
      if (String(data.code) == '0') {
        if (method !== 'GET' ) dispatch({type: TYPES.REQUEST_SUCCESS});
        success &amp;&amp; success(data);
      } else {
        console.log(data.error)
        dispatch({type: TYPES.REQUEST_ERROR, ...data})
        error &amp;&amp; error(data)
      }
    })
    .catch((error) => {
        console.warn(error)
    })
}

export function requestClean() {
  return { type: TYPES.REQUEST_CLEAN }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @desc 网络请求模块的actions
 **/</span>

<span class="hljs-comment">// fetch 需要使用 Promise 的 polyfill</span>
<span class="hljs-keyword">import</span> {
  pendingTask, <span class="hljs-comment">// The action key for modifying loading state</span>
  begin, <span class="hljs-comment">// The action value if a "long" running task begun</span>
  end <span class="hljs-comment">// The action value if a "long" running task ended</span>
} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux-spinner'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>
<span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">'isomorphic-fetch'</span>
<span class="hljs-keyword">import</span> Immutable <span class="hljs-keyword">from</span> <span class="hljs-string">'immutable'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> CONFIG <span class="hljs-keyword">from</span> <span class="hljs-string">'./config'</span>;   <span class="hljs-comment">//请求的配置文件</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> TYPES <span class="hljs-keyword">from</span> <span class="hljs-string">'./types'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">route, params, dispatch, success=null, error=null, { method=<span class="hljs-string">'GET'</span>, headers={}, body=null } = {}</span>) </span>{
  dispatch({<span class="hljs-attr">type</span>: TYPES.REQUEST_PEDDING, [ pendingTask ]: begin})
  <span class="hljs-comment">// 处理query</span>
  <span class="hljs-keyword">const</span> p = params ? <span class="hljs-string">'?'</span> + <span class="hljs-built_in">Object</span>.entries(params).map( <span class="hljs-function">(<span class="hljs-params">i</span>)=&gt;</span> <span class="hljs-string">`<span class="hljs-subst">${i[<span class="hljs-number">0</span>]}</span>=<span class="hljs-subst">${<span class="hljs-built_in">encodeURI</span>(i[<span class="hljs-number">1</span>])}</span>`</span> ).join(<span class="hljs-string">'&amp;'</span>) : <span class="hljs-string">''</span>
  <span class="hljs-keyword">const</span> uri = <span class="hljs-string">`<span class="hljs-subst">${ CONFIG.API_URI }</span><span class="hljs-subst">${ route }</span><span class="hljs-subst">${ p }</span>`</span>
  <span class="hljs-keyword">let</span> data = {<span class="hljs-attr">method</span>: method, <span class="hljs-attr">headers</span>: headers}
  <span class="hljs-keyword">if</span> (method!=<span class="hljs-string">'GET'</span>) data.body = body
  fetch(uri, data)
    .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span> {
      dispatch({<span class="hljs-attr">type</span>: TYPES.REQUEST_DONE, [ pendingTask ]: end})
      <span class="hljs-keyword">return</span> response.json()
    })
    .then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">String</span>(data.code) == <span class="hljs-string">'0'</span>) {
        <span class="hljs-keyword">if</span> (method !== <span class="hljs-string">'GET'</span> ) dispatch({<span class="hljs-attr">type</span>: TYPES.REQUEST_SUCCESS});
        success &amp;&amp; success(data);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(data.error)
        dispatch({<span class="hljs-attr">type</span>: TYPES.REQUEST_ERROR, ...data})
        error &amp;&amp; error(data)
      }
    })
    .catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.warn(error)
    })
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requestClean</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> { <span class="hljs-attr">type</span>: TYPES.REQUEST_CLEAN }
}
</code></pre>
<p>然后编写对应的<code>reducer</code>操作<code>state</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Immutable from 'immutable';
import * as TYPES from '../actions/types';
import { createReducer } from 'redux-immutablejs'

export default createReducer(Immutable.fromJS({status: null, error: null}), {
  [TYPES.REQUEST_ERROR]: (state, action) => {
    return state.merge({
        status: 'error',
        code: action.code,
        error: Immutable.fromJS(action.error),
    })
  },
  [TYPES.REQUEST_CLEAN]: (state, action) => {
    return state.merge({
        status: null,
        error: null,
    })
  },
  [TYPES.REQUEST_SUCCESS]: (state, action) => {
    return state.merge({
        status: 'success',
        error: null,
    })
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Immutable <span class="hljs-keyword">from</span> 'immutable';
import * as TYPES <span class="hljs-keyword">from</span> '../actions/types';
import { createReducer } <span class="hljs-keyword">from</span> 'redux-immutablejs'

export <span class="hljs-keyword">default</span> createReducer(Immutable.<span class="hljs-keyword">from</span>JS({status: null, error: null}), {
  [TYPES.REQUEST_ERROR]: (<span class="hljs-keyword">state</span>, action) =&gt; {
    return <span class="hljs-keyword">state</span>.merge({
        status: 'error',
        code: action.code,
        error: Immutable.<span class="hljs-keyword">from</span>JS(action.error),
    })
  },
  [TYPES.REQUEST_CLEAN]: (<span class="hljs-keyword">state</span>, action) =&gt; {
    return <span class="hljs-keyword">state</span>.merge({
        status: null,
        error: null,
    })
  },
  [TYPES.REQUEST_SUCCESS]: (<span class="hljs-keyword">state</span>, action) =&gt; {
    return <span class="hljs-keyword">state</span>.merge({
        status: 'success',
        error: null,
    })
  }
})</code></pre>
<p>然后在<code>reducers</code>的<code>index.js</code>里对外暴露接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export request from './request'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> request <span class="hljs-keyword">from</span> <span class="hljs-string">'./request'</span></code></pre>
<p>为什么要做这一步呢？因为我们需要在<code>configureStore.js</code>里利用<code>combineReducers</code>对所有的<code>reducer</code>进行进一步的结合处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as reducers from './reducers'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'

export default function configureStore(history, initialState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
    pendingTasks: pendingTasksReducer,
  })
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history) 
      )
    )
  )
  return store
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { createStore, combineReducers, compose, applyMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> thunkMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-thunk'</span>
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'redux-logger'</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> reducers <span class="hljs-keyword">from</span> <span class="hljs-string">'./reducers'</span>
<span class="hljs-keyword">import</span> { routerReducer, routerMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-redux'</span>
<span class="hljs-keyword">import</span> { pendingTasksReducer } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux-spinner'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">configureStore</span>(<span class="hljs-params">history, initialState</span>) </span>{
  <span class="hljs-keyword">const</span> reducer = combineReducers({
    ...reducers,
    <span class="hljs-attr">routing</span>: routerReducer,
    <span class="hljs-attr">pendingTasks</span>: pendingTasksReducer,
  })
  <span class="hljs-keyword">const</span> store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(history) 
      )
    )
  )
  <span class="hljs-keyword">return</span> store
}
</code></pre>
<p>接下来就可以在<code>container</code>里使用了，比如登录模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @desc 登录模块 container
 * @createDate 2016-05-16
 * @author Jafeney<692270687@qq.com>
 **/
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { login } from '../../actions/user'
import { requestClean } from '../../actions/request'
import CheckUserMixin from '../../mixins/CheckUser'
import PureRenderMixin from '../../mixins/PureRender'
import '../style.less';

class Login extends Component {
    constructor() {
        super()
    }
    shouldComponentUpdate(nextProps, nextState) {
        // 如果已经登录不触发深度比较
        if (nextProps.user.getIn(['login', 'status'])=='logged') {
            this.toMain()
            return true
        }
        return PureRenderMixin.deepCompare(this, nextProps, nextState)
    }
    // 检查登录态
    componentDidMount() {
        let { user } = this.props;
        if (CheckUserMixin.isLogged(user)) this.toMain()
    }
    // 初始化页面
    toMain() {
        this.props.actions.replace('/')
        this.props.actions.requestClean()
    }
    // 执行登录
    login() {
        const userName = this.refs['J_username'].value, password = this.refs['J_password'].value
        if (userName &amp;&amp; password) {
            this.props.actions.login({username: userName, password: password})
        }
    }
    // 绑定回车事件
    onEnter(event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e &amp;&amp; e.keyCode==13) { // enter 键
             this.login()
        }
    }
    render() {
        let { user } = this.props
        return (
            <div className=&quot;wrapper&quot; onKeyPress={()=>this.onEnter()}>
                <div className=&quot;containers&quot;>
                    <div className=&quot;logo&quot;></div>
                    <div className=&quot;content&quot;>
                        <div className=&quot;header&quot;>会员登录</div>
                        <div className=&quot;mainer&quot;>
                            <div className=&quot;input-group&quot;>
                                <input ref=&quot;J_username&quot; type=&quot;text&quot; placeholder=&quot;手机号码&quot; className=&quot;input&quot; />
                                <label className=&quot;check-info&quot; ref=&quot;J_username-check&quot;></label>
                            </div>
                            <div className=&quot;input-group&quot;>
                                <input ref=&quot;J_password&quot; type=&quot;password&quot; placeholder=&quot;登录密码&quot; className=&quot;input&quot; />
                                <label className=&quot;check-info&quot; ref=&quot;J_password-check&quot;></label>
                            </div>
                            <div className=&quot;input-group&quot;>
                                <span ref=&quot;J_login&quot; onClick={()=>this.login()} className=&quot;login-btn&quot;>登录</span>
                                <span className=&quot;login-info&quot;>
                                    <a ref=&quot;J_register&quot; href=&quot;#/register&quot; className=&quot;register&quot;>免费注册</a> |
                                    <a ref=&quot;J_forget&quot; href=&quot;#/password&quot; className=&quot;forget&quot;>忘记密码 ?</a>
                                </span>
                            </div>
                            <div className=&quot;form-error&quot;>
                                { user.getIn(['login', 'error', 'message']) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// 下面是redux的核心方法
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ login, requestClean, replace }, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * <span class="hljs-doctag">@desc</span> 登录模块 container
 * <span class="hljs-doctag">@createDate</span> 2016-05-16
 * <span class="hljs-doctag">@author</span> Jafeney&lt;692270687<span class="hljs-doctag">@qq</span>.com&gt;
 **/</span>
<span class="hljs-keyword">import</span> React, { Component } from <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { bindActionCreators } from <span class="hljs-string">'redux'</span>
<span class="hljs-keyword">import</span> { connect } from <span class="hljs-string">'react-redux'</span>
<span class="hljs-keyword">import</span> { replace } from <span class="hljs-string">'react-router-redux'</span>
<span class="hljs-keyword">import</span> { login } from <span class="hljs-string">'../../actions/user'</span>
<span class="hljs-keyword">import</span> { requestClean } from <span class="hljs-string">'../../actions/request'</span>
<span class="hljs-keyword">import</span> CheckUserMixin from <span class="hljs-string">'../../mixins/CheckUser'</span>
<span class="hljs-keyword">import</span> PureRenderMixin from <span class="hljs-string">'../../mixins/PureRender'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'../style.less'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Login</span> <span class="hljs-title">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>()
    }
    shouldComponentUpdate(nextProps, nextState) {
        <span class="hljs-comment">// 如果已经登录不触发深度比较</span>
        <span class="hljs-keyword">if</span> (nextProps.user.getIn([<span class="hljs-string">'login'</span>, <span class="hljs-string">'status'</span>])==<span class="hljs-string">'logged'</span>) {
            <span class="hljs-keyword">this</span>.toMain()
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
        <span class="hljs-keyword">return</span> PureRenderMixin.deepCompare(<span class="hljs-keyword">this</span>, nextProps, nextState)
    }
    <span class="hljs-comment">// 检查登录态</span>
    componentDidMount() {
        let { user } = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">if</span> (CheckUserMixin.isLogged(user)) <span class="hljs-keyword">this</span>.toMain()
    }
    <span class="hljs-comment">// 初始化页面</span>
    toMain() {
        <span class="hljs-keyword">this</span>.props.actions.replace(<span class="hljs-string">'/'</span>)
        <span class="hljs-keyword">this</span>.props.actions.requestClean()
    }
    <span class="hljs-comment">// 执行登录</span>
    login() {
        const userName = <span class="hljs-keyword">this</span>.refs[<span class="hljs-string">'J_username'</span>].value, password = <span class="hljs-keyword">this</span>.refs[<span class="hljs-string">'J_password'</span>].value
        <span class="hljs-keyword">if</span> (userName &amp;&amp; password) {
            <span class="hljs-keyword">this</span>.props.actions.login({username: userName, password: password})
        }
    }
    <span class="hljs-comment">// 绑定回车事件</span>
    onEnter(event) {
        <span class="hljs-keyword">var</span> e = event || window.event || arguments.callee.caller.arguments[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">if</span>(e &amp;&amp; e.keyCode==<span class="hljs-number">13</span>) { <span class="hljs-comment">// enter 键</span>
             <span class="hljs-keyword">this</span>.login()
        }
    }
    render() {
        let { user } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">"wrapper"</span> onKeyPress={()=&gt;<span class="hljs-keyword">this</span>.onEnter()}&gt;
                &lt;div className=<span class="hljs-string">"containers"</span>&gt;
                    &lt;div className=<span class="hljs-string">"logo"</span>&gt;&lt;/div&gt;
                    &lt;div className=<span class="hljs-string">"content"</span>&gt;
                        &lt;div className=<span class="hljs-string">"header"</span>&gt;会员登录&lt;/div&gt;
                        &lt;div className=<span class="hljs-string">"mainer"</span>&gt;
                            &lt;div className=<span class="hljs-string">"input-group"</span>&gt;
                                &lt;input ref=<span class="hljs-string">"J_username"</span> type=<span class="hljs-string">"text"</span> placeholder=<span class="hljs-string">"手机号码"</span> className=<span class="hljs-string">"input"</span> /&gt;
                                &lt;label className=<span class="hljs-string">"check-info"</span> ref=<span class="hljs-string">"J_username-check"</span>&gt;&lt;/label&gt;
                            &lt;/div&gt;
                            &lt;div className=<span class="hljs-string">"input-group"</span>&gt;
                                &lt;input ref=<span class="hljs-string">"J_password"</span> type=<span class="hljs-string">"password"</span> placeholder=<span class="hljs-string">"登录密码"</span> className=<span class="hljs-string">"input"</span> /&gt;
                                &lt;label className=<span class="hljs-string">"check-info"</span> ref=<span class="hljs-string">"J_password-check"</span>&gt;&lt;/label&gt;
                            &lt;/div&gt;
                            &lt;div className=<span class="hljs-string">"input-group"</span>&gt;
                                &lt;span ref=<span class="hljs-string">"J_login"</span> onClick={()=&gt;<span class="hljs-keyword">this</span>.login()} className=<span class="hljs-string">"login-btn"</span>&gt;登录&lt;/span&gt;
                                &lt;span className=<span class="hljs-string">"login-info"</span>&gt;
                                    &lt;a ref=<span class="hljs-string">"J_register"</span> href=<span class="hljs-string">"#/register"</span> className=<span class="hljs-string">"register"</span>&gt;免费注册&lt;/a&gt; |
                                    &lt;a ref=<span class="hljs-string">"J_forget"</span> href=<span class="hljs-string">"#/password"</span> className=<span class="hljs-string">"forget"</span>&gt;忘记密码 ?&lt;/a&gt;
                                &lt;/span&gt;
                            &lt;/div&gt;
                            &lt;div className=<span class="hljs-string">"form-error"</span>&gt;
                                { user.getIn([<span class="hljs-string">'login'</span>, <span class="hljs-string">'error'</span>, <span class="hljs-string">'message'</span>]) }
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        )
    }
}

<span class="hljs-comment">// 下面是redux的核心方法</span>
function mapStateToProps(state) {
    <span class="hljs-keyword">return</span> {
        user: state.user
    }
}
function mapDispatchToProps(dispatch) {
    <span class="hljs-keyword">return</span> { actions: bindActionCreators({ login, requestClean, replace }, dispatch) }
}
export <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(Login)</code></pre>
<blockquote><p>注意：通过以上方式，在组件内部<code>actions</code>里挂载的方法就可以通过<code>this.props</code>取得了。</p></blockquote>
<h1 id="articleHeader20">参考</h1>
<ul>
<li><p><a href="https://zhuanlan.zhihu.com/p/20914387" rel="nofollow noreferrer" target="_blank">《webpack 性能优化》</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004208610">《Redux系列01：从一个简单例子了解action、store、reducer》</a></p></li>
</ul>
<hr>
<p>@欢迎关注我的 <a href="https://github.com/Jafeney" rel="nofollow noreferrer" target="_blank"><code>github</code></a> 和 <a href="http://jafeney.com" rel="nofollow noreferrer" target="_blank">个人博客 －Jafeney</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Redux架构的单页应用开发总结

## 原文链接
[https://segmentfault.com/a/1190000006067018](https://segmentfault.com/a/1190000006067018)


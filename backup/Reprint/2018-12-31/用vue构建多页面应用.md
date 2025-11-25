---
title: '用vue构建多页面应用' 
date: 2018-12-31 2:30:29
hidden: true
slug: 94rak13xwr
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在研究使用vue做出来一些东西，但都是SPA的单页面应用，但实际工作中，单页面并不一定符合业务需求，所以这篇我就来说说怎么开发多页面的Vue应用，以及在这个过程会遇到的问题。</p>
<p>这是我放在GitHub上的项目，里面有整个配置文件，可以参看一下：<a href="https://github.com/JaneSu/multiple-vue-page" rel="nofollow noreferrer" target="_blank">multiple-vue-page</a></p>
<h1 id="articleHeader0">准备工作</h1>
<p>在本地用<code>vue-cli</code>新建一个项目，这个步骤vue的官网上有，我就不再说了。</p>
<p>这里有一个地方需要改一下，在执行<code>npm install</code>命令之前，在<code>package.json</code>里添加一个依赖,后面会用到。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011265011" src="https://static.alili.tech/img/remote/1460000011265011" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">修改webpack配置</h1>
<p>这里展示一下我的项目目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── README.md
├── build
│&nbsp;&nbsp; ├── build.js
│&nbsp;&nbsp; ├── check-versions.js
│&nbsp;&nbsp; ├── dev-client.js
│&nbsp;&nbsp; ├── dev-server.js
│&nbsp;&nbsp; ├── utils.js
│&nbsp;&nbsp; ├── vue-loader.conf.js
│&nbsp;&nbsp; ├── webpack.base.conf.js
│&nbsp;&nbsp; ├── webpack.dev.conf.js
│&nbsp;&nbsp; └── webpack.prod.conf.js
├── config
│&nbsp;&nbsp; ├── dev.env.js
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; └── prod.env.js
├── package.json
├── src
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Hello.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── cell.vue
│&nbsp;&nbsp; └── pages
│&nbsp;&nbsp;     ├── cell
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell.html
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── cell.vue
│&nbsp;&nbsp;     └── index
│&nbsp;&nbsp;         ├── index.html
│&nbsp;&nbsp;         ├── index.js
│&nbsp;&nbsp;         ├── index.vue
│&nbsp;&nbsp;         └── router
│&nbsp;&nbsp;             └── index.js
└── static" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── README<span class="hljs-selector-class">.md</span>
├── build
│&nbsp;&nbsp; ├── build<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── check-versions<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── dev-client<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── dev-server<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── utils<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── vue-loader<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
├── config
│&nbsp;&nbsp; ├── dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; └── prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
├── package<span class="hljs-selector-class">.json</span>
├── src
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo<span class="hljs-selector-class">.png</span>
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Hello<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── cell<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; └── pages
│&nbsp;&nbsp;     ├── cell
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── cell<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp;     └── index
│&nbsp;&nbsp;         ├── index<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp;         ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;         ├── index<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp;         └── router
│&nbsp;&nbsp;             └── index<span class="hljs-selector-class">.js</span>
└── static</code></pre>
<p>在这一步里我们需要改动的文件都在<code>build</code>文件下，分别是：</p>
<ul>
<li>utils.js</li>
<li>webpack.base.conf.js</li>
<li>webpack.dev.conf.js</li>
<li>webpack.prod.conf.js</li>
</ul>
<p>我就按照顺序放出完整的文件内容，然后在做修改或添加的位置用注释符标注出来：</p>
<h2 id="articleHeader2">utils.js文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// utils.js文件

var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    var cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: process.env.NODE_ENV === 'production',
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader]
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
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
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
}

/* 这里是添加的部分 ---------------------------- 开始 */

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
var glob = require('glob')
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/pages')
// 用于做相应的merge处理
var merge = require('webpack-merge')


//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
    var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
    })
    return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
    let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
    let arr = []
    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            // 模板来源
            template: filePath,
            // 文件名称
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}
/* 这里是添加的部分 ---------------------------- 结束 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// utils.js文件</span>

<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)

exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_path</span>) </span>{
    <span class="hljs-keyword">var</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">'production'</span> ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
    options = options || {}

    <span class="hljs-keyword">var</span> cssLoader = {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
        <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">minimize</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span>,
            <span class="hljs-attr">sourceMap</span>: options.sourceMap
        }
    }

    <span class="hljs-comment">// generate loader string to be used with extract text plugin</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span>(<span class="hljs-params">loader, loaderOptions</span>) </span>{
        <span class="hljs-keyword">var</span> loaders = [cssLoader]
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
            <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
                <span class="hljs-attr">use</span>: loaders,
                <span class="hljs-attr">fallback</span>: <span class="hljs-string">'vue-style-loader'</span>
            })
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
        }
    }

    <span class="hljs-comment">// https://vue-loader.vuejs.org/en/configurations/extract-css.html</span>
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
}

<span class="hljs-comment">/* 这里是添加的部分 ---------------------------- 开始 */</span>

<span class="hljs-comment">// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件</span>
<span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>)
<span class="hljs-comment">// 页面模板</span>
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹</span>
<span class="hljs-keyword">var</span> PAGE_PATH = path.resolve(__dirname, <span class="hljs-string">'../src/pages'</span>)
<span class="hljs-comment">// 用于做相应的merge处理</span>
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)


<span class="hljs-comment">//多入口配置</span>
<span class="hljs-comment">// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在</span>
<span class="hljs-comment">// 那么就作为入口处理</span>
exports.entries = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> entryFiles = glob.sync(PAGE_PATH + <span class="hljs-string">'/*/*.js'</span>)
    <span class="hljs-keyword">var</span> map = {}
    entryFiles.forEach(<span class="hljs-function">(<span class="hljs-params">filePath</span>) =&gt;</span> {
        <span class="hljs-keyword">var</span> filename = filePath.substring(filePath.lastIndexOf(<span class="hljs-string">'\/'</span>) + <span class="hljs-number">1</span>, filePath.lastIndexOf(<span class="hljs-string">'.'</span>))
        map[filename] = filePath
    })
    <span class="hljs-keyword">return</span> map
}

<span class="hljs-comment">//多页面输出配置</span>
<span class="hljs-comment">// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中</span>
exports.htmlPlugin = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> entryHtml = glob.sync(PAGE_PATH + <span class="hljs-string">'/*/*.html'</span>)
    <span class="hljs-keyword">let</span> arr = []
    entryHtml.forEach(<span class="hljs-function">(<span class="hljs-params">filePath</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> filename = filePath.substring(filePath.lastIndexOf(<span class="hljs-string">'\/'</span>) + <span class="hljs-number">1</span>, filePath.lastIndexOf(<span class="hljs-string">'.'</span>))
        <span class="hljs-keyword">let</span> conf = {
            <span class="hljs-comment">// 模板来源</span>
            template: filePath,
            <span class="hljs-comment">// 文件名称</span>
            filename: filename + <span class="hljs-string">'.html'</span>,
            <span class="hljs-comment">// 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本</span>
            chunks: [<span class="hljs-string">'manifest'</span>, <span class="hljs-string">'vendor'</span>, filename],
            <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
        }
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
            conf = merge(conf, {
                <span class="hljs-attr">minify</span>: {
                    <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
                },
                <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">'dependency'</span>
            })
        }
        arr.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf))
    })
    <span class="hljs-keyword">return</span> arr
}
<span class="hljs-comment">/* 这里是添加的部分 ---------------------------- 结束 */</span></code></pre>
<h2 id="articleHeader3">webpack.base.conf.js 文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.base.conf.js 文件

var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  /* 修改部分 ---------------- 开始 */
  entry: utils.entries(),
  /* 修改部分 ---------------- 结束 */
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'pages': resolve('src/pages'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
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
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.base.conf.js 文件</span>

<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">/* 修改部分 ---------------- 开始 */</span>
  entry: utils.entries(),
  <span class="hljs-comment">/* 修改部分 ---------------- 结束 */</span>
  output: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-attr">publicPath</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
      <span class="hljs-string">'pages'</span>: resolve(<span class="hljs-string">'src/pages'</span>),
      <span class="hljs-string">'components'</span>: resolve(<span class="hljs-string">'src/components'</span>)
    }
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [{
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
      <span class="hljs-attr">options</span>: vueLoaderConfig
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
      <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)]
    },
    {
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
      <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
      <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
        <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
      }
    },
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
}</code></pre>
<h2 id="articleHeader4">webpack.dev.conf.js 文件</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /* 注释这个区域的文件 ------------- 开始 */
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    /* 注释这个区域的文件 ------------- 结束 */
    new FriendlyErrorsPlugin()

    /* 添加 .concat(utils.htmlPlugin()) ------------------ */
  ].concat(utils.htmlPlugin())
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="javasctipt"><span class="hljs-selector-tag">var</span> utils = require(<span class="hljs-string">'./utils'</span>)
<span class="hljs-selector-tag">var</span> webpack = require(<span class="hljs-string">'webpack'</span>)
<span class="hljs-selector-tag">var</span> config = require(<span class="hljs-string">'../config'</span>)
<span class="hljs-selector-tag">var</span> merge = require(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-selector-tag">var</span> baseWebpackConfig = require(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-selector-tag">var</span> HtmlWebpackPlugin = require(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-selector-tag">var</span> FriendlyErrorsPlugin = require(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)

<span class="hljs-comment">// add hot-reload related code to entry chunks</span>
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name] = [<span class="hljs-string">'./build/dev-client'</span>].concat(baseWebpackConfig<span class="hljs-selector-class">.entry</span>[name])
})

module<span class="hljs-selector-class">.exports</span> = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.cssSourceMap</span> })
  },
  <span class="hljs-comment">// cheap-module-eval-source-map is faster for development</span>
  devtool: <span class="hljs-string">'#cheap-module-eval-source-map'</span>,
  plugins: [
    new webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: config<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.env</span>
    }),
    <span class="hljs-comment">// https://github.com/glenjamin/webpack-hot-middleware#installation--usage</span>
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">/* 注释这个区域的文件 ------------- 开始 */</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   filename: 'index.html',</span>
    <span class="hljs-comment">//   template: 'index.html',</span>
    <span class="hljs-comment">//   inject: true</span>
    <span class="hljs-comment">// }),</span>
    <span class="hljs-comment">/* 注释这个区域的文件 ------------- 结束 */</span>
    new FriendlyErrorsPlugin()

    <span class="hljs-comment">/* 添加 .concat(utils.htmlPlugin()) ------------------ */</span>
  ].concat(utils.htmlPlugin())
})</code></pre>
<h2 id="articleHeader5">webpack.prod.conf.js 文件</h2>
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
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin

    /* 注释这个区域的内容 ---------------------- 开始 */
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    /* 注释这个区域的内容 ---------------------- 结束 */

    // split vendor js into its own file
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
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }])
    /* 该位置添加 .concat(utils.htmlPlugin()) ------------------- */
  ].concat(utils.htmlPlugin())
})

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

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">var</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)

<span class="hljs-keyword">var</span> env = config.build.env

<span class="hljs-keyword">var</span> webpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: utils.styleLoaders({
      <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
      <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span>
    })
  },
  <span class="hljs-attr">devtool</span>: config.build.productionSourceMap ? <span class="hljs-string">'#source-map'</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,
    <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    <span class="hljs-attr">chunkFilename</span>: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// http://vuejs.github.io/vue-loader/en/workflow/production.html</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      },
      <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// extract css into its own file</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>)
    }),
    <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
    <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
      <span class="hljs-attr">cssProcessorOptions</span>: {
        <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span>
      }
    }),
    <span class="hljs-comment">// generate dist index.html with correct asset hash for caching.</span>
    <span class="hljs-comment">// you can customize output by editing /index.html</span>
    <span class="hljs-comment">// see https://github.com/ampedandwired/html-webpack-plugin</span>

    <span class="hljs-comment">/* 注释这个区域的内容 ---------------------- 开始 */</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   filename: config.build.index,</span>
    <span class="hljs-comment">//   template: 'index.html',</span>
    <span class="hljs-comment">//   inject: true,</span>
    <span class="hljs-comment">//   minify: {</span>
    <span class="hljs-comment">//     removeComments: true,</span>
    <span class="hljs-comment">//     collapseWhitespace: true,</span>
    <span class="hljs-comment">//     removeAttributeQuotes: true</span>
    <span class="hljs-comment">//     // more options:</span>
    <span class="hljs-comment">//     // https://github.com/kangax/html-minifier#options-quick-reference</span>
    <span class="hljs-comment">//   },</span>
    <span class="hljs-comment">//   // necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
    <span class="hljs-comment">//   chunksSortMode: 'dependency'</span>
    <span class="hljs-comment">// }),</span>
    <span class="hljs-comment">/* 注释这个区域的内容 ---------------------- 结束 */</span>

    <span class="hljs-comment">// split vendor js into its own file</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">module, count</span>) </span>{
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
      <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>,
      <span class="hljs-attr">chunks</span>: [<span class="hljs-string">'vendor'</span>]
    }),
    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([{
      <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
      <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
      <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]
    }])
    <span class="hljs-comment">/* 该位置添加 .concat(utils.htmlPlugin()) ------------------- */</span>
  ].concat(utils.htmlPlugin())
})

<span class="hljs-keyword">if</span> (config.build.productionGzip) {
  <span class="hljs-keyword">var</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>)

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

<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-keyword">var</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}

<span class="hljs-built_in">module</span>.exports = webpackConfig</code></pre>
<p>至此，webpack的配置就结束了。</p>
<p>但是还没完啦，下面继续。</p>
<h1 id="articleHeader6">文件结构</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── src
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Hello.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── cell.vue
│&nbsp;&nbsp; └── pages
│&nbsp;&nbsp;     ├── cell
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell.html
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell.js
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── cell.vue
│&nbsp;&nbsp;     └── index
│&nbsp;&nbsp;         ├── index.html
│&nbsp;&nbsp;         ├── index.js
│&nbsp;&nbsp;         ├── index.vue
│&nbsp;&nbsp;         └── router
│&nbsp;&nbsp;             └── index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── src
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo<span class="hljs-selector-class">.png</span>
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Hello<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── cell<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; └── pages
│&nbsp;&nbsp;     ├── cell
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── cell<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── cell<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp;     └── index
│&nbsp;&nbsp;         ├── index<span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp;         ├── index<span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp;         ├── index<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp;         └── router
│&nbsp;&nbsp;             └── index.js</code></pre>
<p><code>src</code>就是我所使用的工程文件了，<code>assets</code>,<code>components</code>,<code>pages</code>分别是静态资源文件、组件文件、页面文件。</p>
<p>前两个就不多说，主要是页面文件里，我目前是按照项目的模块分的文件夹，你也可以按照你自己的需求调整。然后在每个模块里又有三个内容：vue文件，js文件和html文件。这三个文件的作用就相当于做spa单页面应用时，根目录的<code>index.html</code>页面模板，src文件下的<code>main.js</code>和<code>app.vue</code>的功能。</p>
<p>原先，入口文件只有一个main.js,但现在由于是多页面，因此入口页面多了，我目前就是两个：index和cell，之后如果打包，就会在<code>dist</code>文件下生成两个HTML文件：<code>index.html</code>和<code>cell.html</code>(可以参考一下单页面应用时，打包只会生成一个index.html,区别在这里)。</p>
<p>cell文件下的三个文件，就是一般模式的配置，参考index的就可以，但并不完全相同。</p>
<h1 id="articleHeader7">特别注意的地方</h1>
<h2 id="articleHeader8">cell.js</h2>
<p>在这个文件里，按照写法，应该是这样的吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'Vue'
import cell from './cell.vue'

new Vue({
    el:'#app'，// 这里参考cell.html和cell.vue的根节点id，保持三者一致
    teleplate：'<cell/>',
    components:{ cell }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'Vue'</span>
<span class="hljs-keyword">import</span> cell <span class="hljs-keyword">from</span> <span class="hljs-string">'./cell.vue'</span>

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>:<span class="hljs-string">'#app'</span>，<span class="hljs-comment">// 这里参考cell.html和cell.vue的根节点id，保持三者一致</span>
    teleplate：<span class="hljs-string">'&lt;cell/&gt;'</span>,
    <span class="hljs-attr">components</span>:{ cell }
})</code></pre>
<p>这个配置在运行时（npm run dev）会报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
(found in <Root>)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>[Vue warn]: You are using the runtime-only <span class="hljs-keyword">build</span> of Vue <span class="hljs-keyword">where</span> the template compiler <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> available. Either pre-compile the templates <span class="hljs-keyword">into</span> render functions, <span class="hljs-keyword">or</span> <span class="hljs-keyword">use</span> the compiler-included <span class="hljs-keyword">build</span>.
(found <span class="hljs-keyword">in</span> &lt;Root&gt;)</code></pre>
<p>网上的解释是这样的：</p>
<blockquote><p>运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。运行时构建比独立构建要轻量30%，只有 17.14 Kb min+gzip大小。</p></blockquote>
<p>上面一段是官方api中的解释。就是说，如果我们想使用template，我们不能直接在客户端使用npm install之后的vue。</p>
<p>也给出了相应的修改方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: { alias: { 'vue': 'vue/dist/vue.js' } }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">resolve</span>: { <span class="hljs-attribute">alias</span>: { <span class="hljs-string">'vue'</span>: <span class="hljs-string">'vue/dist/vue.js'</span> } }</code></pre>
<p>这里是修改<code>package.json</code>的resolve下的vue的配置，很多人反应这样修改之后就好了，但是我按照这个方法修改之后依然报错。然后我就想到上面提到的<code>render</code>函数，因此我的修改是针对<code>cell.js</code>文件的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'Vue'
import cell from './cell.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(cell)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'Vue'</span>
<span class="hljs-keyword">import</span> cell <span class="hljs-keyword">from</span> <span class="hljs-string">'./cell.vue'</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(cell)
})
</code></pre>
<p>这里面我用<code>render</code>函数取代了组件的写法，在运行就没问题了。</p>
<h2 id="articleHeader9">页面跳转</h2>
<p>既然是多页面，肯定涉及页面之间的互相跳转，就按照我这个项目举例，从index.html文件点击a标签跳转到cell.html。</p>
<p>我最开始写的是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!-- index.html -->
<a href='../cell/cell.html'></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'../cell/cell.html'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>但这样写，不论是在开发环境还是最后测试，都会报404，找不到这个页面。</p>
<p>改成这样既可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <!-- index.html -->
<a href='cell.html'></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'cell.html'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>这样他就会自己找<code>cell.html</code>这个文件。</p>
<h2 id="articleHeader10">打包后的资源路径</h2>
<p>执行<code>npm run build</code>之后，打开相应的html文件你是看不到任何东西的，查看原因是找不到相应的js文件和css文件。</p>
<p>这时候的文件结构是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── dist
│&nbsp;&nbsp; ├── js
│&nbsp;&nbsp; ├── css
│&nbsp;&nbsp; ├── index.html
│&nbsp;&nbsp; └── cell.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>├── <span class="hljs-selector-tag">dist</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">js</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">css</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">cell</span><span class="hljs-selector-class">.html</span></code></pre>
<p>查看index.html文件之后会发现资源的引用路径是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/dist/js.........
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>/dist/js.........
</code></pre>
<p>这样，如果你的dist文件不是在根目录下的，就根本找不到资源。</p>
<p>方法当然也有啦，如果你不嫌麻烦，就一个文件一个文件的修改路径咯，或者像我一样偷懒，修改<code>config</code>下的<code>index.js</code>文件。具体的做法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">build: {
    <span class="hljs-attr">env</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>),
    <span class="hljs-attr">index</span>: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
    <span class="hljs-attr">assetsRoot</span>: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
    <span class="hljs-attr">assetsPublicPath</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">productionSourceMap</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// Gzip off by default as many popular static hosts such as</span>
    <span class="hljs-comment">// Surge or Netlify already gzip all static assets for you.</span>
    <span class="hljs-comment">// Before setting to `true`, make sure to:</span>
    <span class="hljs-comment">// npm install --save-dev compression-webpack-plugin</span>
    productionGzip: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">productionGzipExtensions</span>: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    <span class="hljs-comment">// Run the build command with an extra argument to</span>
    <span class="hljs-comment">// View the bundle analyzer report after build finishes:</span>
    <span class="hljs-comment">// `npm run build --report`</span>
    <span class="hljs-comment">// Set to `true` or `false` to always turn it on or off</span>
    bundleAnalyzerReport: process.env.npm_config_report
  },
</code></pre>
<p>将这里面的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assetsPublicPath: '/',
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">assetsPublicPath:</span> <span class="hljs-string">'/'</span>,
</code></pre>
<p>改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="assetsPublicPath: './',
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">assetsPublicPath:</span> <span class="hljs-string">'./'</span>,
</code></pre>
<p>酱紫，配置文件资源的时候找到的就是相对路径下的资源了，在重新<code>npm run build</code>看看吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue构建多页面应用

## 原文链接
[https://segmentfault.com/a/1190000011265006](https://segmentfault.com/a/1190000011265006)


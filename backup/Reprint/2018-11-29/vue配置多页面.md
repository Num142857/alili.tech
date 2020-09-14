---
title: 'vue配置多页面' 
date: 2018-11-29 9:34:56
hidden: true
slug: ql2v7ch48j
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>1.安装环境</strong></p>
<ol>
<li>安装node.js 并添加入环境变量PATH</li>
<li>安装淘宝NPM镜像<br>   $ npm install -g cnpm --registry=<a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a>
</li>
<li>
<p>安装webpack</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack -g 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> webpack -g 
</code></pre>
</li>
<li>
<p>安装vue-cli脚手架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span> </code></pre>
</li>
<li>创建项目模板 vue init wepack vue-multipage-demo</li>
<li>cmd进入到要放项目的文件夹</li>
<li>安装 cnpm install</li>
</ol>
<p><strong>2.目录结构调整</strong>  <br><span class="img-wrap"><img data-src="/img/bVbaVeq?w=239&amp;h=535" src="https://static.alili.tech/img/bVbaVeq?w=239&amp;h=535" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVbaVeu?w=264&amp;h=601" src="https://static.alili.tech/img/bVbaVeu?w=264&amp;h=601" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3.配置文件修改</strong></p>
<ol>
<li>添加依赖 glob （返回目录中的所有子文件）    <br>   npm install glob</li>
<li>
<p>修改build文件夹中的utils.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//新增代码
var glob = require('glob');
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/pages');
// 用于做相应的merge处理
var merge = require('webpack-merge');


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
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//新增代码</span>
<span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>);
<span class="hljs-comment">// 页面模板</span>
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-comment">// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹</span>
<span class="hljs-keyword">var</span> PAGE_PATH = path.resolve(__dirname, <span class="hljs-string">'../src/pages'</span>);
<span class="hljs-comment">// 用于做相应的merge处理</span>
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>);


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
}</code></pre>
</li>
<li>
<p>修改webpack.base.conf.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
//注释代码开始
  // entry: {
  //   app: './src/main.js'
  // },
//注释代码结束
//新增代码开始
  entry: utils.entries(),
//新增代码结束
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
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
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
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
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-keyword">const</span> createLintingRule = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  test: <span class="hljs-regexp">/\.(js|vue)$/</span>,
  loader: <span class="hljs-string">'eslint-loader'</span>,
  enforce: <span class="hljs-string">'pre'</span>,
  include: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
  options: {
    formatter: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

<span class="hljs-built_in">module</span>.exports = {
  context: path.resolve(__dirname, <span class="hljs-string">'../'</span>),
<span class="hljs-comment">//注释代码开始</span>
  <span class="hljs-comment">// entry: {</span>
  <span class="hljs-comment">//   app: './src/main.js'</span>
  <span class="hljs-comment">// },</span>
<span class="hljs-comment">//注释代码结束</span>
<span class="hljs-comment">//新增代码开始</span>
  entry: utils.entries(),
<span class="hljs-comment">//新增代码结束</span>
  output: {
    path: config.build.assetsRoot,
    filename: <span class="hljs-string">'[name].js'</span>,
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
    }
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue-loader'</span>,
        options: vueLoaderConfig
      },
      {
        test: <span class="hljs-regexp">/\.js$/</span>,
        loader: <span class="hljs-string">'babel-loader'</span>,
        include: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>), resolve(<span class="hljs-string">'node_modules/webpack-dev-server/client'</span>)]
      },
      {
        test: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">10000</span>,
          name: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
      },
      {
        test: <span class="hljs-regexp">/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/</span>,
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">10000</span>,
          name: utils.assetsPath(<span class="hljs-string">'media/[name].[hash:7].[ext]'</span>)
        }
      },
      {
        test: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        loader: <span class="hljs-string">'url-loader'</span>,
        options: {
          limit: <span class="hljs-number">10000</span>,
          name: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  },
  node: {
    <span class="hljs-comment">// prevent webpack from injecting useless setImmediate polyfill because Vue</span>
    <span class="hljs-comment">// source contains it (although only uses it if it's native).</span>
    setImmediate: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// prevent webpack from injecting mocks to Node native modules</span>
    <span class="hljs-comment">// that does not make sense for the client</span>
    dgram: <span class="hljs-string">'empty'</span>,
    fs: <span class="hljs-string">'empty'</span>,
    net: <span class="hljs-string">'empty'</span>,
    tls: <span class="hljs-string">'empty'</span>,
    child_process: <span class="hljs-string">'empty'</span>
  }
}</code></pre>
</li>
<li>
<p>修改webpack.dev.conf.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //多页面输出配置
    //注释代码开始
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: 'index.html',
        //   inject: true
        // }),
    //注释代码结束
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
   //新增代码开始
  ].concat(utils.htmlPlugin())
  //新增代码结束
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>  plugins: <span class="hljs-type"></span>[
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: <span class="hljs-type">require</span>(<span class="hljs-string">'../config/dev.env'</span>)
    }),
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.NamedModulesPlugin(), <span class="hljs-comment">// HMR shows correct file names in console on update.</span>
    <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">//多页面输出配置</span>
    <span class="hljs-comment">//注释代码开始</span>
        <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
        <span class="hljs-comment">//   filename: 'index.html',</span>
        <span class="hljs-comment">//   template: 'index.html',</span>
        <span class="hljs-comment">//   inject: true</span>
        <span class="hljs-comment">// }),</span>
    <span class="hljs-comment">//注释代码结束</span>
    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-keyword">new</span> <span class="hljs-type">CopyWebpackPlugin</span>([
      {
        from: <span class="hljs-type">path</span>.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        to: <span class="hljs-type">config</span>.dev.assetsSubDirectory,
        ignore: <span class="hljs-type"></span>[<span class="hljs-string">'.*'</span>]
      }
    ])
   <span class="hljs-comment">//新增代码开始</span>
  ].concat(utils.htmlPlugin())
  <span class="hljs-comment">//新增代码结束</span>
})
</code></pre>
</li>
<li>
<p>修改webpack.prod.conf.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="         'use strict'
    const path = require('path')
    const utils = require('./utils')
    const webpack = require('webpack')
    const config = require('../config')
    const merge = require('webpack-merge')
    const baseWebpackConfig = require('./webpack.base.conf')
    const CopyWebpackPlugin = require('copy-webpack-plugin')
    
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const ExtractTextPlugin = require('extract-text-webpack-plugin')
    const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
    const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
    
    const env = process.env.NODE_ENV === 'testing'
      ? require('../config/test.env')
      : require('../config/prod.env')
    
    const webpackConfig = merge(baseWebpackConfig, {
      module: {
        rules: utils.styleLoaders({
          sourceMap: config.build.productionSourceMap,
          extract: true,
          usePostCSS: true
        })
      },
      devtool: config.build.productionSourceMap ? config.build.devtool : false,
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
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false
            }
          },
          sourceMap: config.build.productionSourceMap,
          parallel: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
          filename: utils.assetsPath('css/[name].[contenthash].css'),
          // Setting the following option to `false` will not extract CSS from codesplit chunks.
          // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
          // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
          // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
          allChunks: true,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
          cssProcessorOptions: config.build.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        //注释代码开始
        // new HtmlWebpackPlugin({
        //   filename: process.env.NODE_ENV === 'testing'
        //     ? 'index.html'
        //     : config.build.index,
        //   template: 'index.html',
        //   inject: true,
        //   minify: {
        //     removeComments: true,
        //     collapseWhitespace: true,
        //     removeAttributeQuotes: true
        //     // more options:
        //     // https://github.com/kangax/html-minifier#options-quick-reference
        //   },
          // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        //   chunksSortMode: 'dependency'
        // }),
        //注释代码结束
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks (module) {
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
          minChunks: Infinity
        }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
          name: 'app',
          async: 'vendor-async',
          children: true,
          minChunks: 3
        }),
    
        // copy custom static assets
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
          }
        ])
      //修改代码开始  
      ].concat(utils.htmlPlugin())
      //修改代码结束
    })
    
    if (config.build.productionGzip) {
      const CompressionWebpackPlugin = require('compression-webpack-plugin')
    
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
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      webpackConfig.plugins.push(new BundleAnalyzerPlugin())
    }
    
    module.exports = webpackConfig
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">         'use strict'</span>
    <span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
    <span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
    <span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
    <span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
    <span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
    <span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
    <span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
    
    <span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
    <span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
    <span class="hljs-keyword">const</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)
    <span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>)
    
    <span class="hljs-keyword">const</span> env = process.env.NODE_ENV === <span class="hljs-string">'testing'</span>
      ? <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/test.env'</span>)
      : <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/prod.env'</span>)
    
    <span class="hljs-keyword">const</span> webpackConfig = merge(baseWebpackConfig, {
      <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: utils.styleLoaders({
          <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
          <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span>
        })
      },
      <span class="hljs-attr">devtool</span>: config.build.productionSourceMap ? config.build.devtool : <span class="hljs-literal">false</span>,
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
        <span class="hljs-keyword">new</span> UglifyJsPlugin({
          <span class="hljs-attr">uglifyOptions</span>: {
            <span class="hljs-attr">compress</span>: {
              <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
            }
          },
          <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
          <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>
        }),
        <span class="hljs-comment">// extract css into its own file</span>
        <span class="hljs-keyword">new</span> ExtractTextPlugin({
          <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>),
          <span class="hljs-comment">// Setting the following option to `false` will not extract CSS from codesplit chunks.</span>
          <span class="hljs-comment">// Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.</span>
          <span class="hljs-comment">// It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, </span>
          <span class="hljs-comment">// increasing file size: https://github.com/vuejs-templates/webpack/issues/1110</span>
          allChunks: <span class="hljs-literal">true</span>,
        }),
        <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
        <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
        <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
          <span class="hljs-attr">cssProcessorOptions</span>: config.build.productionSourceMap
            ? { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">map</span>: { <span class="hljs-attr">inline</span>: <span class="hljs-literal">false</span> } }
            : { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span> }
        }),
        <span class="hljs-comment">// generate dist index.html with correct asset hash for caching.</span>
        <span class="hljs-comment">// you can customize output by editing /index.html</span>
        <span class="hljs-comment">// see https://github.com/ampedandwired/html-webpack-plugin</span>
        <span class="hljs-comment">//注释代码开始</span>
        <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
        <span class="hljs-comment">//   filename: process.env.NODE_ENV === 'testing'</span>
        <span class="hljs-comment">//     ? 'index.html'</span>
        <span class="hljs-comment">//     : config.build.index,</span>
        <span class="hljs-comment">//   template: 'index.html',</span>
        <span class="hljs-comment">//   inject: true,</span>
        <span class="hljs-comment">//   minify: {</span>
        <span class="hljs-comment">//     removeComments: true,</span>
        <span class="hljs-comment">//     collapseWhitespace: true,</span>
        <span class="hljs-comment">//     removeAttributeQuotes: true</span>
        <span class="hljs-comment">//     // more options:</span>
        <span class="hljs-comment">//     // https://github.com/kangax/html-minifier#options-quick-reference</span>
        <span class="hljs-comment">//   },</span>
          <span class="hljs-comment">// necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
        <span class="hljs-comment">//   chunksSortMode: 'dependency'</span>
        <span class="hljs-comment">// }),</span>
        <span class="hljs-comment">//注释代码结束</span>
        <span class="hljs-comment">// keep module.id stable when vendor modules does not change</span>
        <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),
        <span class="hljs-comment">// enable scope hoisting</span>
        <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),
        <span class="hljs-comment">// split vendor js into its own file</span>
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
          <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
          minChunks (<span class="hljs-built_in">module</span>) {
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
          <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
        }),
        <span class="hljs-comment">// This instance extracts shared chunks from code splitted chunks and bundles them</span>
        <span class="hljs-comment">// in a separate chunk, similar to the vendor chunk</span>
        <span class="hljs-comment">// see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk</span>
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
          <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
          <span class="hljs-attr">async</span>: <span class="hljs-string">'vendor-async'</span>,
          <span class="hljs-attr">children</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">minChunks</span>: <span class="hljs-number">3</span>
        }),
    
        <span class="hljs-comment">// copy custom static assets</span>
        <span class="hljs-keyword">new</span> CopyWebpackPlugin([
          {
            <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
            <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
            <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]
          }
        ])
      <span class="hljs-comment">//修改代码开始  </span>
      ].concat(utils.htmlPlugin())
      <span class="hljs-comment">//修改代码结束</span>
    })
    
    <span class="hljs-keyword">if</span> (config.build.productionGzip) {
      <span class="hljs-keyword">const</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>)
    
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
      <span class="hljs-keyword">const</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
      webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
    }
    
    <span class="hljs-built_in">module</span>.exports = webpackConfig
</code></pre>
</li>
</ol>
<p><strong>多页面的配置完成 cnpm run dev</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue配置多页面

## 原文链接
[https://segmentfault.com/a/1190000014957399](https://segmentfault.com/a/1190000014957399)


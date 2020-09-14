---
title: 'vue-cli单页应用改成多页应用配置' 
date: 2019-01-08 2:30:11
hidden: true
slug: 1cd0snvo5v8
categories: [reprint]
---

{{< raw >}}

                    
<h4>git地址</h4>
<p><a href="https://github.com/dawnyu/vue-cli-multipage.git" rel="nofollow noreferrer" target="_blank"><code>https://github.com/dawnyu/vue-cli-multipage.git</code></a></p>
<h3 id="articleHeader0">前言</h3>
<p>从接触vue开始用的是vue-cli直接搭建单页应用，参考配合着vue-router开发起来简直爽到吊炸天，但是由于项目越来越复杂了，单页用起来可能有点力不从心，能不能弄成多页面呢，查了相关资料得到的结论是完全可以的，能多页面多入口，并且可以使用组件，还引入jQuery，这简直完美了，这个demo是从我已经改造完成的项目中摘出来的，现在演示下怎么把基于vue2的vue-cli单页模板改造成多页面,并且多入口的项目。&lt;!--more--&gt;</p>
<h3 id="articleHeader1">技术栈</h3>
<ul>
<li><p><strong>vue: 2.0.1</strong></p></li>
<li><p><strong>vue-resource：1.0.3</strong></p></li>
<li><p><strong>vue-router：2.0.0</strong></p></li>
<li><p><strong>webpack：1.13.2</strong></p></li>
<li><p><strong>gulp：3.9.1</strong></p></li>
<li><p><strong>ES6</strong></p></li>
</ul>
<h3 id="articleHeader2">运行</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/dawnyu/vue-cli-multipage.git
npm install 
npm run build
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git clone https://github.com/dawnyu/vue-cli-multipage.git
npm install 
npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<h3 id="articleHeader3">改造后的目录</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010168331" src="https://static.alili.tech/img/remote/1460000010168331" alt="" title="" style="cursor: pointer; display: inline;"></span><br>可以多目录生成目标文件</p>
<p>公共的js和样式图标放到assets文件夹即可</p>
<h3 id="articleHeader4">修改点</h3>
<p><strong>build/utils.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var config = require('../config')
var glob = require('glob')
  // 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function(_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}
    // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function(loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&amp;'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}
//增加获取多入口的方法 注意 这个参数是个数组
exports.getEntry = function(globPaths) {
  var entries = {},
    basename, tmp, pathname;
  for (globPath of globPaths) {
    glob.sync(globPath).forEach(function(entry) {
      basename = path.basename(entry, path.extname(entry));
      tmp = entry.split('/').splice(-3);
      pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
      entries[pathname] = entry;
    });
  }
  console.log(entries);
  return entries;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>)
  <span class="hljs-comment">// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)

exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">var</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">'production'</span> ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory
  <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
  options = options || {}
    <span class="hljs-comment">// generate loader string to be used with extract text plugin</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span>(<span class="hljs-params">loaders</span>) </span>{
    <span class="hljs-keyword">var</span> sourceLoader = loaders.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">loader</span>) </span>{
      <span class="hljs-keyword">var</span> extraParamChar
      <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\?/</span>.test(loader)) {
        loader = loader.replace(<span class="hljs-regexp">/\?/</span>, <span class="hljs-string">'-loader?'</span>)
        extraParamChar = <span class="hljs-string">'&amp;'</span>
      } <span class="hljs-keyword">else</span> {
        loader = loader + <span class="hljs-string">'-loader'</span>
        extraParamChar = <span class="hljs-string">'?'</span>
      }
      <span class="hljs-keyword">return</span> loader + (options.sourceMap ? extraParamChar + <span class="hljs-string">'sourceMap'</span> : <span class="hljs-string">''</span>)
    }).join(<span class="hljs-string">'!'</span>)

    <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract(<span class="hljs-string">'vue-style-loader'</span>, sourceLoader)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>, sourceLoader].join(<span class="hljs-string">'!'</span>)
    }
  }

  <span class="hljs-comment">// http://vuejs.github.io/vue-loader/configurations/extract-css.html</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">css</span>: generateLoaders([<span class="hljs-string">'css'</span>]),
    <span class="hljs-attr">postcss</span>: generateLoaders([<span class="hljs-string">'css'</span>]),
    <span class="hljs-attr">less</span>: generateLoaders([<span class="hljs-string">'css'</span>, <span class="hljs-string">'less'</span>]),
    <span class="hljs-attr">sass</span>: generateLoaders([<span class="hljs-string">'css'</span>, <span class="hljs-string">'sass?indentedSyntax'</span>]),
    <span class="hljs-attr">scss</span>: generateLoaders([<span class="hljs-string">'css'</span>, <span class="hljs-string">'sass'</span>]),
    <span class="hljs-attr">stylus</span>: generateLoaders([<span class="hljs-string">'css'</span>, <span class="hljs-string">'stylus'</span>]),
    <span class="hljs-attr">styl</span>: generateLoaders([<span class="hljs-string">'css'</span>, <span class="hljs-string">'stylus'</span>])
  }
}

<span class="hljs-comment">// Generate loaders for standalone style files (outside of .vue)</span>
exports.styleLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">var</span> output = []
  <span class="hljs-keyword">var</span> loaders = exports.cssLoaders(options)
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> extension <span class="hljs-keyword">in</span> loaders) {
    <span class="hljs-keyword">var</span> loader = loaders[extension]
    output.push({
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'\\.'</span> + extension + <span class="hljs-string">'$'</span>),
      <span class="hljs-attr">loader</span>: loader
    })
  }
  <span class="hljs-keyword">return</span> output
}
<span class="hljs-comment">//增加获取多入口的方法 注意 这个参数是个数组</span>
exports.getEntry = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">globPaths</span>) </span>{
  <span class="hljs-keyword">var</span> entries = {},
    basename, tmp, pathname;
  <span class="hljs-keyword">for</span> (globPath <span class="hljs-keyword">of</span> globPaths) {
    glob.sync(globPath).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">entry</span>) </span>{
      basename = path.basename(entry, path.extname(entry));
      tmp = entry.split(<span class="hljs-string">'/'</span>).splice(<span class="hljs-number">-3</span>);
      pathname = tmp.splice(<span class="hljs-number">0</span>, <span class="hljs-number">1</span>) + <span class="hljs-string">'/'</span> + basename; <span class="hljs-comment">// 正确输出js和html的路径</span>
      entries[pathname] = entry;
    });
  }
  <span class="hljs-built_in">console</span>.log(entries);
  <span class="hljs-keyword">return</span> entries;
}</code></pre>
<p><strong>webpack.base.conf.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../') ///——driname当前目录
var chunks = Object.keys(utils.getEntry(['./src/module/**/*.js', './src/m/**/*.js']));
// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: utils.getEntry(['./src/module/**/*.js', './src/m/**/*.js']),//传入需要打包的入口，我这里是pc端和手机端入口打到一个包里
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, //根名称可配置
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'jquery': 'jquery'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 30000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('static/build.js'),
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks, // chunks是需要提取的模块
      minChunks: chunks.length
    }),
    // 配置提取出的样式文件
    new ExtractTextPlugin('css/[name].css'),
    //引入jqury
    new webpack.ProvidePlugin({
      $: &quot;jquery&quot;,
      jQuery: &quot;jquery&quot;
    })
  ],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> projectRoot = path.resolve(__dirname, <span class="hljs-string">'../'</span>) <span class="hljs-comment">///——driname当前目录</span>
<span class="hljs-keyword">var</span> chunks = <span class="hljs-built_in">Object</span>.keys(utils.getEntry([<span class="hljs-string">'./src/module/**/*.js'</span>, <span class="hljs-string">'./src/m/**/*.js'</span>]));
<span class="hljs-comment">// 将样式提取到单独的css文件中，而不是打包到js文件或使用style标签插入在head标签中</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: utils.getEntry([<span class="hljs-string">'./src/module/**/*.js'</span>, <span class="hljs-string">'./src/m/**/*.js'</span>]),<span class="hljs-comment">//传入需要打包的入口，我这里是pc端和手机端入口打到一个包里</span>
  output: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,
    <span class="hljs-attr">publicPath</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? config.build.assetsPublicPath : config.dev.assetsPublicPath, <span class="hljs-comment">//根名称可配置</span>
    filename: <span class="hljs-string">'[name].js'</span>
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>],
    <span class="hljs-attr">fallback</span>: [path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)],
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">'src'</span>: path.resolve(__dirname, <span class="hljs-string">'../src'</span>),
      <span class="hljs-string">'assets'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/assets'</span>),
      <span class="hljs-string">'components'</span>: path.resolve(__dirname, <span class="hljs-string">'../src/components'</span>),
      <span class="hljs-string">'jquery'</span>: <span class="hljs-string">'jquery'</span>
    }
  },
  <span class="hljs-attr">resolveLoader</span>: {
    <span class="hljs-attr">fallback</span>: [path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)]
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [{
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">include</span>: projectRoot,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.json$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'json'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">30000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
        }
      }
    ]
  },
  <span class="hljs-attr">eslint</span>: {
    <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>)
  },
  <span class="hljs-attr">vue</span>: {
    <span class="hljs-attr">loaders</span>: utils.cssLoaders(),
    <span class="hljs-attr">postcss</span>: [
      <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)({
        <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 2 versions'</span>]
      })
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// new webpack.optimize.CommonsChunkPlugin('static/build.js'),</span>
    <span class="hljs-comment">// 提取公共模块</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendors'</span>, <span class="hljs-comment">// 公共模块的名称</span>
      chunks: chunks, <span class="hljs-comment">// chunks是需要提取的模块</span>
      minChunks: chunks.length
    }),
    <span class="hljs-comment">// 配置提取出的样式文件</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'css/[name].css'</span>),
    <span class="hljs-comment">//引入jqury</span>
    <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
      <span class="hljs-attr">$</span>: <span class="hljs-string">"jquery"</span>,
      <span class="hljs-attr">jQuery</span>: <span class="hljs-string">"jquery"</span>
    })
  ],
}</code></pre>
<p><strong>webpack.dev.conf.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
  // add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // })
  ]
})

var pages = utils.getEntry(['./src/module/**/*.html', './src/m/**/*.html']);


for (var pathname in pages) {


  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    favicon: './src/assets/images/wechat.png',
    inject: true // js插入位置

  };


  if (pathname in module.exports.entry) {
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
  <span class="hljs-comment">// add hot-reload related code to entry chunks</span>
<span class="hljs-built_in">Object</span>.keys(baseWebpackConfig.entry).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>) </span>{
  baseWebpackConfig.entry[name] = [<span class="hljs-string">'./build/dev-client'</span>].concat(baseWebpackConfig.entry[name])
})

<span class="hljs-built_in">module</span>.exports = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap })
  },
  <span class="hljs-comment">// eval-source-map is faster for development</span>
  devtool: <span class="hljs-string">'#eval-source-map'</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: config.dev.env
    }),
    <span class="hljs-comment">// https://github.com/glenjamin/webpack-hot-middleware#installation--usage</span>
    <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin(),
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NoErrorsPlugin(),
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   filename: 'index.html',</span>
    <span class="hljs-comment">//   template: 'index.html',</span>
    <span class="hljs-comment">//   inject: true</span>
    <span class="hljs-comment">// })</span>
  ]
})

<span class="hljs-keyword">var</span> pages = utils.getEntry([<span class="hljs-string">'./src/module/**/*.html'</span>, <span class="hljs-string">'./src/m/**/*.html'</span>]);


<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> pathname <span class="hljs-keyword">in</span> pages) {


  <span class="hljs-comment">// 配置生成的html文件，定义路径等</span>
  <span class="hljs-keyword">var</span> conf = {
    <span class="hljs-attr">filename</span>: pathname + <span class="hljs-string">'.html'</span>,
    <span class="hljs-attr">template</span>: pages[pathname], <span class="hljs-comment">// 模板路径</span>
    favicon: <span class="hljs-string">'./src/assets/images/wechat.png'</span>,
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// js插入位置</span>

  };


  <span class="hljs-keyword">if</span> (pathname <span class="hljs-keyword">in</span> <span class="hljs-built_in">module</span>.exports.entry) {
    conf.chunks = [<span class="hljs-string">'vendors'</span>, pathname];
    conf.hash = <span class="hljs-literal">true</span>;
  }

  <span class="hljs-built_in">module</span>.exports.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf));
}</code></pre>
<p><strong>webpack.prod.conf.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'testing' ?
  require('../config/test.env') :
  config.build.env

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: process.env.NODE_ENV === 'testing' ?
    //     'index.html' : config.build.index,
    //   template: 'index.html',
    //   favicon: './src/assets/images/tjd.ico',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //       // more options:
    //       // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module, count) {
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
    })
  ]
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

var pages = utils.getEntry(['./src/module/**/*.html', './src/m/**/*.html']);

for (var pathname in pages) {


  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    favicon: './src/assets/images/wechat.png',
    inject: true // js插入位置

  };
  if (pathname in pages) {
    conf.chunks = ['vendors', pathname];
    conf.hash = true;
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">var</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">var</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">var</span> env = process.env.NODE_ENV === <span class="hljs-string">'testing'</span> ?
  <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/test.env'</span>) :
  config.build.env

<span class="hljs-built_in">module</span>.exports = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap, <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span> })
  },
  <span class="hljs-attr">devtool</span>: config.build.productionSourceMap ? <span class="hljs-string">'#source-map'</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,
    <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    <span class="hljs-attr">chunkFilename</span>: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  <span class="hljs-attr">vue</span>: {
    <span class="hljs-attr">loaders</span>: utils.cssLoaders({
      <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
      <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span>
    })
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// http://vuejs.github.io/vue-loader/workflow/production.html</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">drop_debugger</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">drop_console</span>: <span class="hljs-literal">true</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.OccurenceOrderPlugin(),
    <span class="hljs-comment">// extract css into its own file</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin(utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>)),
    <span class="hljs-comment">// generate dist index.html with correct asset hash for caching.</span>
    <span class="hljs-comment">// you can customize output by editing /index.html</span>
    <span class="hljs-comment">// see https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   filename: process.env.NODE_ENV === 'testing' ?</span>
    <span class="hljs-comment">//     'index.html' : config.build.index,</span>
    <span class="hljs-comment">//   template: 'index.html',</span>
    <span class="hljs-comment">//   favicon: './src/assets/images/tjd.ico',</span>
    <span class="hljs-comment">//   inject: true,</span>
    <span class="hljs-comment">//   minify: {</span>
    <span class="hljs-comment">//     removeComments: true,</span>
    <span class="hljs-comment">//     collapseWhitespace: true,</span>
    <span class="hljs-comment">//     removeAttributeQuotes: true</span>
    <span class="hljs-comment">//       // more options:</span>
    <span class="hljs-comment">//       // https://github.com/kangax/html-minifier#options-quick-reference</span>
    <span class="hljs-comment">//   },</span>
    <span class="hljs-comment">//   // necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
    <span class="hljs-comment">//   chunksSortMode: 'dependency'</span>
    <span class="hljs-comment">// }),</span>
    <span class="hljs-comment">// split vendor js into its own file</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, count</span>) </span>{
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
    })
  ]
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

<span class="hljs-keyword">var</span> pages = utils.getEntry([<span class="hljs-string">'./src/module/**/*.html'</span>, <span class="hljs-string">'./src/m/**/*.html'</span>]);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> pathname <span class="hljs-keyword">in</span> pages) {


  <span class="hljs-comment">// 配置生成的html文件，定义路径等</span>
  <span class="hljs-keyword">var</span> conf = {
    <span class="hljs-attr">filename</span>: pathname + <span class="hljs-string">'.html'</span>,
    <span class="hljs-attr">template</span>: pages[pathname], <span class="hljs-comment">// 模板路径</span>
    favicon: <span class="hljs-string">'./src/assets/images/wechat.png'</span>,
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// js插入位置</span>

  };
  <span class="hljs-keyword">if</span> (pathname <span class="hljs-keyword">in</span> pages) {
    conf.chunks = [<span class="hljs-string">'vendors'</span>, pathname];
    conf.hash = <span class="hljs-literal">true</span>;
  }

  <span class="hljs-built_in">module</span>.exports.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(conf));
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli单页应用改成多页应用配置

## 原文链接
[https://segmentfault.com/a/1190000010168326](https://segmentfault.com/a/1190000010168326)


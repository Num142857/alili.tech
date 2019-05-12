---
title: 'React系列---Webpack环境搭建（一）手动搭建' 
date: 2019-01-11 2:30:08
hidden: true
slug: d4fw85tjl2h
categories: [reprint]
---

{{< raw >}}

                    
<p>React系列---Webpack环境搭建（一）手动搭建<br><a href="https://segmentfault.com/a/1190000009952845">React系列---Webpack环境搭建（二）不同环境不同配置</a><br><a href="https://segmentfault.com/a/1190000010003262" target="_blank">React系列---Webpack环境搭建（三）打包性能优化</a></p>
<p><span class="img-wrap"><img data-src="/img/bVPVRp?w=1920&amp;h=960" src="https://static.alili.tech/img/bVPVRp?w=1920&amp;h=960" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">工程初始化</h1>
<p>确保已经安装了node，npm包管理工具会随node一起安装。</p>
<p>可用以下方式安装依赖包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装到全局环境
npm install 依赖包[@版本号] -g 
# 安装到当前环境并添加到package.json的dependencies部分
npm install 依赖包[@版本号] --save
# 安装到当前环境并添加到package.json的devDependencies部分
npm install 依赖包[@版本号] --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code><span class="hljs-comment"># 安装到全局环境</span>
npm <span class="hljs-keyword">install</span> 依赖包[@版本号] -g 
<span class="hljs-comment"># 安装到当前环境并添加到package.json的dependencies部分</span>
npm <span class="hljs-keyword">install</span> 依赖包[@版本号] --save
<span class="hljs-comment"># 安装到当前环境并添加到package.json的devDependencies部分</span>
npm <span class="hljs-keyword">install</span> 依赖包[@版本号] --save-dev</code></pre>
<p>创建react-webpack-demo目录并进入：</p>
<p>生成package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init --yes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init --<span class="hljs-literal">yes</span></code></pre>
<h1 id="articleHeader1">安装webpack</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>安装webpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-dev-server --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>webpack-dev-server是一个基于Express框架的Node.js服务器。它还提供了一个客户端的运行环境，会被注入到页面代码中执行，并通过Socket.IO与服务器通信。<br>服务器端的每次改动与重新构建都会被通知到页面上。还提供了如模块替换这样强大的功能。</p>
<h1 id="articleHeader2">安装Babel</h1>
<p>安装babel-core核心模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-core --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-core </span>--save-dev</code></pre>
<p>安装babel的ES6和React语法包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-preset-es2015 babel-preset-react --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-preset-react </span>--save-dev</code></pre>
<h1 id="articleHeader3">配置Babel</h1>
<p>根目录下配置.babelrc</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;presets&quot;: [&quot;es2015&quot;, &quot;react&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
    <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"react"</span>]
}</code></pre>
<h1 id="articleHeader4">安装ESLint</h1>
<p>安装ESLint loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint@3.19.0 --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">npm</span> <span class="hljs-selector-tag">install</span> <span class="hljs-selector-tag">eslint</span>@<span class="hljs-keyword">3</span>.<span class="hljs-keyword">19</span>.<span class="hljs-keyword">0</span> --save-dev</code></pre>
<p>安装ESLint的第三方配置规则eslint-config-airbnb</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint-config-airbnb --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;">npm install eslint-<span class="hljs-built_in">config</span>-airbnb <span class="hljs-comment">--save-dev</span></code></pre>
<p>eslint-config-airbnb需要以下3个插件支持：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> eslint-<span class="hljs-keyword">plugin</span>-<span class="hljs-keyword">import</span> eslint-<span class="hljs-keyword">plugin</span>-react eslint-<span class="hljs-keyword">plugin</span>-jsx-a11y <span class="hljs-comment">--save-dev</span></code></pre>
<h1 id="articleHeader5">配置ESLint</h1>
<p>根目录下配置.eslintrc.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  &quot;parserOptions&quot;: {
    &quot;ecmaVersion&quot;: 7, // ECMAScript版本，7为ES7
    &quot;sourceType&quot;: &quot;module&quot;, //默认script，如果代码是ECMAScript模块，设置为module
    &quot;ecmaFeatures&quot;: { // 使用额外的语言特性
        &quot;jsx&quot;: true // 启用JSX
    }
  },
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  // 避免访问未定义的环境变量而发出告警
  &quot;env&quot;: {
    &quot;es6&quot;: true,
    &quot;node&quot;: true,
    &quot;browser&quot;: true,
  },
  // 脚本在执行期间访问的额外的全局变量
  // 避免访问未定义的环境变量而发出告警
  &quot;globals&quot;: {
    &quot;document&quot;: true,
    &quot;navigator&quot;: true,
    &quot;window&quot;:true,
    &quot;node&quot;:true
  },
  // 继承第三方校验规则eslint-config-airbnb
  &quot;extends&quot;: &quot;airbnb&quot;,
  // eslint-config-airbnb包括了以下3个插件
  &quot;plugins&quot;: [
    &quot;react&quot;,
    &quot;jsx-a11y&quot;,
    &quot;import&quot;
  ],
  // 定制自己的规则
  &quot;rules&quot;: {
    &quot;comma-dangle&quot;: [&quot;error&quot;, &quot;never&quot;], // 要求或禁止末尾逗号：不允许逗号
    &quot;indent&quot;: [&quot;error&quot;, 4], // JavaScript代码强制使用一致的缩进：4格缩进
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-string">"parserOptions"</span>: {
    <span class="hljs-string">"ecmaVersion"</span>: <span class="hljs-number">7</span>, <span class="hljs-comment">// ECMAScript版本，7为ES7</span>
    <span class="hljs-string">"sourceType"</span>: <span class="hljs-string">"module"</span>, <span class="hljs-comment">//默认script，如果代码是ECMAScript模块，设置为module</span>
    <span class="hljs-string">"ecmaFeatures"</span>: { <span class="hljs-comment">// 使用额外的语言特性</span>
        <span class="hljs-string">"jsx"</span>: <span class="hljs-keyword">true</span> <span class="hljs-comment">// 启用JSX</span>
    }
  },
  <span class="hljs-comment">// 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量</span>
  <span class="hljs-comment">// 避免访问未定义的环境变量而发出告警</span>
  <span class="hljs-string">"env"</span>: {
    <span class="hljs-string">"es6"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"node"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"browser"</span>: <span class="hljs-keyword">true</span>,
  },
  <span class="hljs-comment">// 脚本在执行期间访问的额外的全局变量</span>
  <span class="hljs-comment">// 避免访问未定义的环境变量而发出告警</span>
  <span class="hljs-string">"globals"</span>: {
    <span class="hljs-string">"document"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"navigator"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"window"</span>:<span class="hljs-keyword">true</span>,
    <span class="hljs-string">"node"</span>:<span class="hljs-keyword">true</span>
  },
  <span class="hljs-comment">// 继承第三方校验规则eslint-config-airbnb</span>
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"airbnb"</span>,
  <span class="hljs-comment">// eslint-config-airbnb包括了以下3个插件</span>
  <span class="hljs-string">"plugins"</span>: [
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"jsx-a11y"</span>,
    <span class="hljs-string">"import"</span>
  ],
  <span class="hljs-comment">// 定制自己的规则</span>
  <span class="hljs-string">"rules"</span>: {
    <span class="hljs-string">"comma-dangle"</span>: [<span class="hljs-string">"error"</span>, <span class="hljs-string">"never"</span>], <span class="hljs-comment">// 要求或禁止末尾逗号：不允许逗号</span>
    <span class="hljs-string">"indent"</span>: [<span class="hljs-string">"error"</span>, <span class="hljs-number">4</span>], <span class="hljs-comment">// JavaScript代码强制使用一致的缩进：4格缩进</span>
  }
};</code></pre>
<h1 id="articleHeader6">安装webpack loader</h1>
<p>Webpack有一个不可不说的优点，它把所有的文件都可以当做模块处理，包括你的JavaScript代码，也包括CSS和fonts以及图片等等等，只有通过合适的loaders，它们都可以被当做模块被处理。<br>Webpack 默认只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。</p>
<p>安装eslint-loader整合eslint：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install eslint-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>安装babel-loader整合babel：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-loader </span>--save-dev</code></pre>
<p>安装style-loader css-loader等，转换对应类型文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install style-loader css-loader less-loader sass-loader file-loader url-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader css-loader <span class="hljs-keyword">less</span>-loader sass-loader <span class="hljs-keyword">file</span>-loader <span class="hljs-keyword">url</span>-loader <span class="hljs-comment">--save-dev</span></code></pre>
<p>css-loader 用于打包css文件<br>style-loader 用于将编译完成的css插入html中<br>less-loader 是将less文件编译成css<br>sass-loader 是将sass文件编译成css<br>file-loader 用于打包文件<br>url-loadder 用于打包图片</p>
<p>webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。<br>url-loader是对file-loader的上层封装。一般限制小图片直接转成 base64 可以用 url-loader，其他情况都用 file-loader。</p>
<h1 id="articleHeader7">安装webpack plugin</h1>
<p>与loader专注于处理资源内容不同，plugin功能更广更强大。plugin可以实现那些loader实现不了或者不适合在loader实现的功能，比如自动生成项目的HTML页面、向构建过程中注入环境变量等。</p>
<p>安装html-webpack-plugin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install html-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> html-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev</span></code></pre>
<p>安装uglifyjs-webpack-plugin，用于JS代码压缩</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install uglifyjs-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> uglifyjs-webpack-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev</span></code></pre>
<h1 id="articleHeader8">配置webpack</h1>
<p>根目录配置webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
module.exports = {
    entry: {
        index: path.resolve(SRC_PATH, 'index.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: 'js/[name].[hash:5].js'
    },
    // 开启dev source map
    devtool: 'eval-source-map',
    // 开启 webpack dev server
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
        //progress: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
        //root: APP_PATH
    },
    module: {
        // 配置preLoaders, 将eslint添加进去
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint-loader'],
                include: SRC_PATH,
                enforce: 'pre'
            }, {
                test: /\.jsx?$/,
                loaders: ['babel-loader'],
                include: SRC_PATH,
                exclude: path.resolve(ROOT_PATH, 'node_modules')
            }
        ]
    },
    // 配置plugin
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '&quot;development&quot;'
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
        }),
        new HtmlwebpackPlugin({
            title: 'react-webpack-demo',
            filename: 'index.html',
            template: path.resolve(SRC_PATH, 'templates', 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeAttributeQuotes: true
            }
        })
    ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">path</span> <span class="hljs-string">=</span> <span class="hljs-string">require('path');</span>
<span class="hljs-string">var</span> <span class="hljs-string">webpack</span> <span class="hljs-string">=</span> <span class="hljs-string">require('webpack');</span>
<span class="hljs-string">var</span> <span class="hljs-string">HtmlwebpackPlugin</span> <span class="hljs-string">=</span> <span class="hljs-string">require('html-webpack-plugin');</span>

<span class="hljs-string">var</span> <span class="hljs-string">ROOT_PATH</span> <span class="hljs-string">=</span> <span class="hljs-string">path.resolve(__dirname);</span>
<span class="hljs-string">var</span> <span class="hljs-string">SRC_PATH</span> <span class="hljs-string">=</span> <span class="hljs-string">path.resolve(ROOT_PATH,</span> <span class="hljs-string">'src'</span><span class="hljs-string">);</span>
<span class="hljs-string">var</span> <span class="hljs-string">BUILD_PATH</span> <span class="hljs-string">=</span> <span class="hljs-string">path.resolve(ROOT_PATH,</span> <span class="hljs-string">'dist'</span><span class="hljs-string">);</span>
<span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    entry:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        index:</span> <span class="hljs-string">path.resolve(SRC_PATH,</span> <span class="hljs-string">'index.jsx'</span><span class="hljs-string">)</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    output:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">BUILD_PATH,</span>
<span class="hljs-attr">        filename:</span> <span class="hljs-string">'js/[name].[hash:5].js'</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">//</span> <span class="hljs-string">开启dev</span> <span class="hljs-string">source</span> <span class="hljs-string">map</span>
<span class="hljs-attr">    devtool:</span> <span class="hljs-string">'eval-source-map'</span><span class="hljs-string">,</span>
    <span class="hljs-string">//</span> <span class="hljs-string">开启</span> <span class="hljs-string">webpack</span> <span class="hljs-string">dev</span> <span class="hljs-string">server</span>
<span class="hljs-attr">    devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        historyApiFallback:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        hot:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        inline:</span> <span class="hljs-literal">true</span>
        <span class="hljs-string">//progress:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    resolve:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        extensions:</span> <span class="hljs-string">['.js',</span> <span class="hljs-string">'.jsx'</span><span class="hljs-string">]</span>
        <span class="hljs-string">//root:</span> <span class="hljs-string">APP_PATH</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    module:</span> <span class="hljs-string">{</span>
        <span class="hljs-string">//</span> <span class="hljs-string">配置preLoaders,</span> <span class="hljs-string">将eslint添加进去</span>
<span class="hljs-attr">        loaders:</span> <span class="hljs-string">[</span>
            <span class="hljs-string">{</span>
<span class="hljs-attr">                test:</span> <span class="hljs-string">/\.jsx?$/,</span>
<span class="hljs-attr">                loaders:</span> <span class="hljs-string">['eslint-loader'],</span>
<span class="hljs-attr">                include:</span> <span class="hljs-string">SRC_PATH,</span>
<span class="hljs-attr">                enforce:</span> <span class="hljs-string">'pre'</span>
            <span class="hljs-string">},</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                test:</span> <span class="hljs-string">/\.jsx?$/,</span>
<span class="hljs-attr">                loaders:</span> <span class="hljs-string">['babel-loader'],</span>
<span class="hljs-attr">                include:</span> <span class="hljs-string">SRC_PATH,</span>
<span class="hljs-attr">                exclude:</span> <span class="hljs-string">path.resolve(ROOT_PATH,</span> <span class="hljs-string">'node_modules'</span><span class="hljs-string">)</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
    <span class="hljs-string">//</span> <span class="hljs-string">配置plugin</span>
<span class="hljs-attr">    plugins:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">new</span> <span class="hljs-string">webpack.DefinePlugin({</span>
            <span class="hljs-string">'process.env.NODE_ENV'</span><span class="hljs-string">:</span> <span class="hljs-string">'"development"'</span>
        <span class="hljs-string">}),</span>
        <span class="hljs-string">new</span> <span class="hljs-string">webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-attr">            sourceMap:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
        <span class="hljs-string">}),</span>
        <span class="hljs-string">new</span> <span class="hljs-string">HtmlwebpackPlugin({</span>
<span class="hljs-attr">            title:</span> <span class="hljs-string">'react-webpack-demo'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            filename:</span> <span class="hljs-string">'index.html'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            template:</span> <span class="hljs-string">path.resolve(SRC_PATH,</span> <span class="hljs-string">'templates'</span><span class="hljs-string">,</span> <span class="hljs-string">'index.html'</span><span class="hljs-string">),</span>
<span class="hljs-attr">            minify:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                removeComments:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                collapseWhitespace:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                removeRedundantAttributes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                removeScriptTypeAttributes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                removeStyleLinkTypeAttributes:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">                removeAttributeQuotes:</span> <span class="hljs-literal">true</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">})</span>
    <span class="hljs-string">]</span>
<span class="hljs-string">};</span></code></pre>
<p>上面的配置把app文件夹的app.jsx作为入口，用配置好的babel-loader处理它，在Babel处理前先用ESLint检查代码格式，最后使用HtmlwebpackPlugin在build文件夹中生成处理后的HTML文件。我们还添加了一个resolve的参数，把JSX扩展名添加进去，从而支持JS中import加载JSX扩展名的脚本。</p>
<h1 id="articleHeader9">安装核心功能包</h1>
<p>安装React依赖包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react react-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> react react-dom <span class="hljs-comment">--save</span></code></pre>
<p>安装react-redux依赖包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux  --save
npm install redux-actions  --save
npm install react-redux  --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> redux  <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> redux-actions  <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> react-redux  <span class="hljs-comment">--save</span></code></pre>
<p>安装react-router依赖包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react-router  --save
npm install react-router-redux  --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> react-router  <span class="hljs-comment">--save</span>
npm <span class="hljs-keyword">install</span> react-router-redux  <span class="hljs-comment">--save</span></code></pre>
<p>安装redux调试工具包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install redux-devtools  --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install redux-devtools  --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h1 id="articleHeader10">创建项目入口模块</h1>
<p>根目录下创建src目录：</p>
<p>新建/src/index.jsx：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function Index() {
    return (
      <div className=&quot;container&quot;>
        <h1>Hello React!</h1>
      </div>
    );
}

ReactDOM.render(<Index />, document.getElementById('root'));

export default Index;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Index</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Index</span> /&gt;</span>, document.getElementById('root'));

export default Index;
</span></code></pre>
<h1 id="articleHeader11">创建渲染页面</h1>
<p>创建/scr/templates/index.html：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div id=&quot;root&quot;></div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.title </span><span class="xml"><span class="hljs-tag">%&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h1 id="articleHeader12">运行程序</h1>
<p>在package.json中添加自定义命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack&quot;,
    &quot;dev&quot;: &quot;webpack-dev-server --hot&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>,
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --hot"</span>
}</code></pre>
<p>运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>webpack-dev-server会新建一个基于Express的服务器，打开浏览器<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a></p>
<p>开发中可能还依赖各种中间件和第三方工具。具体用到时再安装吧。</p>
<p>代码：<a href="https://github.com/zhutx/react-webpack-demo" rel="nofollow noreferrer" target="_blank">https://github.com/zhutx/reac...</a></p>
<hr>
<p>React系列---Webpack环境搭建（一）手动搭建<br><a href="https://segmentfault.com/a/1190000009952845">React系列---Webpack环境搭建（二）不同环境不同配置</a><br><a href="https://segmentfault.com/a/1190000010003262" target="_blank">React系列---Webpack环境搭建（三）打包性能优化</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列---Webpack环境搭建（一）手动搭建

## 原文链接
[https://segmentfault.com/a/1190000009902941](https://segmentfault.com/a/1190000009902941)


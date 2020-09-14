---
title: 'Webpack配置从零到一' 
date: 2019-02-10 2:30:42
hidden: true
slug: mf9x8f1nrt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Webpack配置从零到一</h2>
<blockquote><p>这不算是初学者的入门文章，也不能算是高端用户的进阶。这只是我自己在配置Webpack过程中收集整理的一些资料，以及自己常用的整个配置流程。因为有时候老是忘了某个东西是怎么配置的，所以记录下来用于速查和备忘。</p></blockquote>
<h3 id="articleHeader1">setup</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm init
$ npm install webpack --save-dev # 全局安装依赖
# or
$ npm install webpack-dev-server --save-dev # 安装webpack调试工具" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm init
$ npm install webpack --save-dev <span class="hljs-comment"># 全局安装依赖</span>
<span class="hljs-comment"># or</span>
$ npm install webpack-dev-server --save-dev <span class="hljs-comment"># 安装webpack调试工具</span></code></pre>
<h3 id="articleHeader2">basic config</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/webpack.config.js
const webpack = require('webpack');

// 配置目录
// 因为我们的webpack.config.js文件不在项目根目录下，所以需要一个路径的配置
const path = require('path');
const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
const ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
const MODULES_PATH = path.join(ROOT_PATH, './node_modules'); // node包目录
const BUILD_PATH = path.join(ROOT_PATH, './public/assets'); // 最后输出放置公共资源的目录

module.exports = {
  context: path.join(__dirname, '../'), // 设置webpack配置中指向的默认目录为项目根目录
  entry: {
    index: './public/pages/index.js',
    public: './public/pages/public.js'
  },
  output: {
    path: BUILD_PATH, // 设置输出目录
    filename: '[name].bundle.js', // 输出文件名
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee'] // 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀
  },
  module: {
    loaders: [
      // loader 扔在这里
    ]
  },
  plugins: [
    // 插件扔在这里
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/webpack.config.js</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-comment">// 配置目录</span>
<span class="hljs-comment">// 因为我们的webpack.config.js文件不在项目根目录下，所以需要一个路径的配置</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> CURRENT_PATH = path.resolve(__dirname); <span class="hljs-comment">// 获取到当前目录</span>
<span class="hljs-keyword">const</span> ROOT_PATH = path.join(__dirname, <span class="hljs-string">'../'</span>); <span class="hljs-comment">// 项目根目录</span>
<span class="hljs-keyword">const</span> MODULES_PATH = path.join(ROOT_PATH, <span class="hljs-string">'./node_modules'</span>); <span class="hljs-comment">// node包目录</span>
<span class="hljs-keyword">const</span> BUILD_PATH = path.join(ROOT_PATH, <span class="hljs-string">'./public/assets'</span>); <span class="hljs-comment">// 最后输出放置公共资源的目录</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">context</span>: path.join(__dirname, <span class="hljs-string">'../'</span>), <span class="hljs-comment">// 设置webpack配置中指向的默认目录为项目根目录</span>
  entry: {
    <span class="hljs-attr">index</span>: <span class="hljs-string">'./public/pages/index.js'</span>,
    <span class="hljs-attr">public</span>: <span class="hljs-string">'./public/pages/public.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: BUILD_PATH, <span class="hljs-comment">// 设置输出目录</span>
    filename: <span class="hljs-string">'[name].bundle.js'</span>, <span class="hljs-comment">// 输出文件名</span>
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.jsx'</span>, <span class="hljs-string">'.coffee'</span>] <span class="hljs-comment">// 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀</span>
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-comment">// loader 扔在这里</span>
    ]
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// 插件扔在这里</span>
  ]
}</code></pre>
<h3 id="articleHeader3">loaders</h3>
<blockquote><p>没有loader怎么活！￣へ￣</p></blockquote>
<h4>install css/less/style loader</h4>
<p>scss-loader的配置同理less，个人比较常用less</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install less --save-dev # install less

$ npm install css-loader style-loader --save-dev # install style-loader, css-loader

$ npm install less less-loader --save-dev # 基于style-loader,css-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install less --save-dev <span class="hljs-comment"># install less</span>

$ npm install css-loader style-loader --save-dev <span class="hljs-comment"># install style-loader, css-loader</span>

$ npm install less less-loader --save-dev <span class="hljs-comment"># 基于style-loader,css-loader</span></code></pre>
<h4>install url loader</h4>
<blockquote><p>用来处理图片和字体文件</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install file-loader --save-dev
$ npm install url-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install file-loader --save-dev
$ npm install url-loader --save-dev</code></pre>
<h4>install babel loader</h4>
<blockquote><p>不能写ES6的js不叫js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install babel-loader babel-core babel-preset-es2015 --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install babel-loader babel-core babel-preset-es2015 --save-dev</code></pre>
<h4>config loaders</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/webpack.config.js

module.exports = {
  module: {
    loaders: [
      // style &amp; css &amp; less loader
      { test: /\.css$/, loader: &quot;style-loader!css-loader&quot;},
      { test: /\.less$/, loader: &quot;style-loader!css-loader!less-loader&quot;)},
      // babel loader
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader'],
        query: {
          presets: ['es2015']
          // 如果安装了React的话
          // presets: ['react', 'es2015']
        }
      },
      // image &amp; font
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192&amp;name=[name].[ext]'},
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=8192&amp;name=[name].[ext]'},
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/webpack.config.js</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [
      <span class="hljs-comment">// style &amp; css &amp; less loader</span>
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader!css-loader"</span>},
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader!css-loader!less-loader"</span>)},
      <span class="hljs-comment">// babel loader</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules|bower_components)/</span>,
        <span class="hljs-attr">loader</span>: [<span class="hljs-string">'babel-loader'</span>],
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>]
          <span class="hljs-comment">// 如果安装了React的话</span>
          <span class="hljs-comment">// presets: ['react', 'es2015']</span>
        }
      },
      <span class="hljs-comment">// image &amp; font</span>
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff|woff2|eot|ttf|otf)$/i</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=8192&amp;name=[name].[ext]'</span>},
      { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(jpe?g|png|gif|svg)$/i</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=8192&amp;name=[name].[ext]'</span>},
    ]
  }
}</code></pre>
<h3 id="articleHeader4">plugin</h3>
<h4>
<code>ExtractTextPlugin</code>分离CSS</h4>
<blockquote>
<p>行内插入一坨CSS是万恶之源 </p>
<p>-- 我瞎扯的</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install ExtractTextPlugin
$ npm install extract-text-webpack-plugin --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install ExtractTextPlugin</span>
$ npm install extract-text-webpack-plugin --save-dev</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/webpack.config.js

const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);

module: {
  loaders: [
    // 把之前的style&amp;css&amp;less loader改为
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
    { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
  ]
},
plugins: [
  // 分离css
  new ExtractTextPlugin('[name].bundle.css', {
    allChunks: true
  }),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/webpack.config.js</span>

<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [
    <span class="hljs-comment">// 把之前的style&amp;css&amp;less loader改为</span>
    { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: ExtractTextPlugin.extract(<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>)},
    { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>, <span class="hljs-attr">loader</span>: ExtractTextPlugin.extract(<span class="hljs-string">'style'</span>, <span class="hljs-string">'css!less'</span>) },
  ]
},
<span class="hljs-attr">plugins</span>: [
  <span class="hljs-comment">// 分离css</span>
  <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].bundle.css'</span>, {
    <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>
  }),
]</code></pre>
<h4>设置<code>jQuery</code>全局变量</h4>
<p><code>jQuery</code>很老土？好吧我还真有点同意你。。但无疑在一定程度上它还是很方便的。我把<code>jQuery</code>设置成全局变量，这样的话有时候就能偷懒用下它了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install jquery --save-dev

# 安装 expose-loader
$ sudo npm install expose-loader --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install jquery --save-dev

<span class="hljs-comment"># 安装 expose-loader</span>
$ sudo npm install expose-loader --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/webpack.config.js

module: {
  loaders: [
    // expose-loader将需要的变量从依赖包中暴露出来
    { test: require.resolve(&quot;jquery&quot;), loader: &quot;expose?$! expose?jQuery&quot; }
  ]
},
plugins: [
  // 把jquery作为全局变量插入到所有的代码中
  // 然后就可以直接在页面中使用jQuery了
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/webpack.config.js</span>

<span class="hljs-built_in">module</span>: {
  <span class="hljs-attr">loaders</span>: [
    <span class="hljs-comment">// expose-loader将需要的变量从依赖包中暴露出来</span>
    { <span class="hljs-attr">test</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">"jquery"</span>), <span class="hljs-attr">loader</span>: <span class="hljs-string">"expose?$! expose?jQuery"</span> }
  ]
},
<span class="hljs-attr">plugins</span>: [
  <span class="hljs-comment">// 把jquery作为全局变量插入到所有的代码中</span>
  <span class="hljs-comment">// 然后就可以直接在页面中使用jQuery了</span>
  <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
    <span class="hljs-attr">$</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-attr">jQuery</span>: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-string">'window.jQuery'</span>: <span class="hljs-string">'jquery'</span>
  }),
]</code></pre>
<h4>
<code>CommonsChunkPlugin</code>抽取公共资源</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/webpack.config.js

entry: {
  jquery: ['jquery']
},
plugins: [
  // public sources
  new webpack.optimize.CommonsChunkPlugin({
    // 与 entry 中的 jquery 对应
    name: 'jquery',
    // 输出的公共资源名称
    filename: 'common.bundle.js',
    // 对所有entry实行这个规则
    minChunks: Infinity
  }),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/webpack.config.js</span>

entry: {
  <span class="hljs-attr">jquery</span>: [<span class="hljs-string">'jquery'</span>]
},
<span class="hljs-attr">plugins</span>: [
  <span class="hljs-comment">// public sources</span>
  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-comment">// 与 entry 中的 jquery 对应</span>
    name: <span class="hljs-string">'jquery'</span>,
    <span class="hljs-comment">// 输出的公共资源名称</span>
    filename: <span class="hljs-string">'common.bundle.js'</span>,
    <span class="hljs-comment">// 对所有entry实行这个规则</span>
    minChunks: <span class="hljs-literal">Infinity</span>
  }),
]</code></pre>
<h4>
<code>UglifyJsPlugin</code>代码压缩混淆</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/webpack.config.js

plugins: [
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require']
      //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
    },
    compress: {
      warnings: false
    }
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/webpack.config.js</span>

plugins: [
  <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
    <span class="hljs-attr">mangle</span>: {
      <span class="hljs-attr">except</span>: [<span class="hljs-string">'$super'</span>, <span class="hljs-string">'$'</span>, <span class="hljs-string">'exports'</span>, <span class="hljs-string">'require'</span>]
      <span class="hljs-comment">//以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆</span>
    },
    <span class="hljs-attr">compress</span>: {
      <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
    }
  })
]</code></pre>
<h3 id="articleHeader5">我要用 React!</h3>
<p>React + Webpack在我心里是个标配，自己也很喜欢React+Redux+Webpack那一套，所以怎么少得了它。</p>
<h4>install</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# react
$ npm install react --save
$ npm install react-dom --save

# 喜欢redux?
$ npm install --save redux # redux
$ npm install --save react-redux # 和react配合
$ npm install --save redux-thunk # middleware

# 如果已经装了babel可以忽略下面这条
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev

# 但是要用React的话一定记得安装下面这个
$ npm install babel-preset-react --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># react</span>
$ npm install react --save
$ npm install react-dom --save

<span class="hljs-comment"># 喜欢redux?</span>
$ npm install --save redux <span class="hljs-comment"># redux</span>
$ npm install --save react-redux <span class="hljs-comment"># 和react配合</span>
$ npm install --save redux-thunk <span class="hljs-comment"># middleware</span>

<span class="hljs-comment"># 如果已经装了babel可以忽略下面这条</span>
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev

<span class="hljs-comment"># 但是要用React的话一定记得安装下面这个</span>
$ npm install babel-preset-react --save-dev</code></pre>
<h4>config</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loaders: [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: ['babel-loader'],
    query: {
      presets: ['react', 'es2015']
    }
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">loaders: [
  {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jsx?$/</span>,
    <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/(node_modules|bower_components)/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'babel-loader'</span>],
    <span class="hljs-attr">query</span>: {
      <span class="hljs-attr">presets</span>: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'es2015'</span>]
    }
  }
]</code></pre>
<h4>bug ?</h4>
<p>在最新的React(V15)里，如果你按照上面的配置正常使用的话，应该会出现如下的警告：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Warning: It looks like you're using a minified copy of the development build of React. When deploying React apps to production, make sure to use the production build which skips development warnings and is faster. See https://fb.me/react-minification for more details." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code class="ja" style="word-break: break-word; white-space: initial;"><span class="hljs-literal">Warning</span>: It looks like you<span class="hljs-symbol">'re</span> using a minified copy <span class="hljs-keyword">of</span> the development build <span class="hljs-keyword">of</span> React. <span class="hljs-keyword">When</span> deploying React apps <span class="hljs-keyword">to</span> production, make sure <span class="hljs-keyword">to</span> <span class="hljs-keyword">use</span> the production build which skips development warnings <span class="hljs-keyword">and</span> <span class="hljs-keyword">is</span> faster. See https://fb.me/react-minification <span class="hljs-keyword">for</span> more details.</code></pre>
<p>我记得以前的版本没有这个警告啊？我在开发环境压缩它了？那把<code>UglifyJsPlugin</code>拿走试试。。结果还是一样。</p>
<p>最后在<a href="https://github.com/facebook/react/issues/6479" rel="nofollow noreferrer" target="_blank">github React-issue</a>找到了目前的解决方案：</p>
<p>在Webpack的plugins里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({
  &quot;process.env&quot;: { 
     NODE_ENV: JSON.stringify(&quot;production&quot;) 
   }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.DefinePlugin({
  <span class="hljs-string">"process.env"</span>: { 
     <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">"production"</span>) 
   }
})</code></pre>
<p>然后就没问题了==</p>
<h3 id="articleHeader6">end</h3>
<p>如果真的要玩的话，webpack可以有非常多的玩法（看看它插件就知道了）。但webpack终究是一个工具，所以也就没有特别深入探究它，知道怎么用，够用就好了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack配置从零到一

## 原文链接
[https://segmentfault.com/a/1190000005110967](https://segmentfault.com/a/1190000005110967)


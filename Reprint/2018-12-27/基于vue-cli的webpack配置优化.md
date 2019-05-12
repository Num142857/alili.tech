---
title: '基于vue-cli的webpack配置优化' 
date: 2018-12-27 2:30:13
hidden: true
slug: hlqngruevbg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">基于<code>vue-cli</code>优化的<code>webpack</code>配置</h1>
<p>大概分为以下几点</p>
<ul>
<li>通过 <code>externals</code> 配置来提取常用库，引用外链</li>
<li>配置<code>CommonsChunkPlugin</code>提取公用代码 （<code>vue-cli</code>已做）</li>
<li>善用<code>alias</code>（<code>vue-cli</code>配置了一部分）</li>
<li>启用<code>DllPlugin</code>和<code>DllReferencePlugin</code>预编译库文件</li>
<li>
<code>happypack</code>开启多核构建项目</li>
<li>将<code>webpack-parallel-uglify-plugin</code>来替换<code>webpack</code>本身的<code>UglifyJS</code>来进行代码压缩混淆</li>
<li>升级<code>webpack</code>至3.x版本开启<code>Scope Hoisting</code>
</li>
</ul>
<h3 id="articleHeader1">externals</h3>
<blockquote>
<p>文档地址 <a href="https://doc.webpack-china.org/configuration/externals/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p>防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)。</p>
</blockquote>
<h3 id="articleHeader2">CommonsChunkPlugin</h3>
<blockquote>
<p>文档地址 <a href="https://doc.webpack-china.org/plugins/commons-chunk-plugin/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p>CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，这个文件包括多个入口 chunk 的公共模块。通过将公共模块拆出来，最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。</p>
</blockquote>
<h3 id="articleHeader3">resolve.alias</h3>
<blockquote>
<p>文档地址 <a href="https://doc.webpack-china.org/configuration/resolve/#resolve-alias" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p>创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：</p>
</blockquote>
<h3 id="articleHeader4">DllPlugin和DllReferencePlugin</h3>
<blockquote>
<p>文档地址 <a href="https://doc.webpack-china.org/plugins/dll-plugin/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p>Dll打包以后是独立存在的，只要其包含的库没有增减、升级，hash也不会变化，因此线上的dll代码不需要随着版本发布频繁更新。使用Dll打包的基本上都是独立库文件，这类文件有一个特性就是变化不大。，只要包含的库没有升级， 增减，就不需要重新打包。这样也提高了构建速度。</p>
<p>一般是用于打包阶段</p>
</blockquote>
<ol><li>在<code>build</code>文件夹下新建<code>webpack.dll.conf.js</code>文件</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var config = require('../config');
var env = config.build.env;

module.exports = {
  entry: {
    libs: [
      'babel-polyfill',
      'vue/dist/vue.esm.js',
      'vue-router',
      'vuex',
      'element-ui',
      'echarts',
      'mockjs',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../libs'),
    filename: '[name].[chunkhash:7].js',
    library: '[name]_library',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../libs/[name]-mainfest.json'),
      name: '[name]_library',
      context: __dirname, // 执行的上下文环境，对之后DllReferencePlugin有用
    }),
    new ExtractTextPlugin('[name].[contenthash:7].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './libs',
    }),
    new CleanWebpackPlugin(['libs'], {
      root: path.join(__dirname, '../'), // 绝对路径
      verbose: true,
      dry: false,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> AssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assets-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>);
<span class="hljs-keyword">var</span> env = config.build.env;

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">libs</span>: [
      <span class="hljs-string">'babel-polyfill'</span>,
      <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'vue-router'</span>,
      <span class="hljs-string">'vuex'</span>,
      <span class="hljs-string">'element-ui'</span>,
      <span class="hljs-string">'echarts'</span>,
      <span class="hljs-string">'mockjs'</span>,
    ],
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'../libs'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash:7].js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]_library'</span>,
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env,
    }),
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'../libs/[name]-mainfest.json'</span>),
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_library'</span>,
      <span class="hljs-attr">context</span>: __dirname, <span class="hljs-comment">// 执行的上下文环境，对之后DllReferencePlugin有用</span>
    }),
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].[contenthash:7].css'</span>),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
      },
    }),
    <span class="hljs-keyword">new</span> AssetsPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle-config.json'</span>,
      <span class="hljs-attr">path</span>: <span class="hljs-string">'./libs'</span>,
    }),
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'libs'</span>], {
      <span class="hljs-attr">root</span>: path.join(__dirname, <span class="hljs-string">'../'</span>), <span class="hljs-comment">// 绝对路径</span>
      verbose: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">dry</span>: <span class="hljs-literal">false</span>,
    }),
  ],
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
      },
    ],
  },
};</code></pre>
<ol><li>在<code>build</code>文件夹下新建<code>build-dll.js</code>文件</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(&quot;path&quot;);
var webpack = require(&quot;webpack&quot;);
var dllConfig = require(&quot;./webpack.dll.conf&quot;);
var chalk = require(&quot;chalk&quot;);
var rm = require(&quot;rimraf&quot;);
var ora = require(&quot;ora&quot;);

var spinner = ora({
  color: &quot;green&quot;,
  text: &quot;building for Dll...&quot;
});
spinner.start();
rm(path.resolve(__dirname, &quot;../libs&quot;), err => {
  if (err) throw err;
  webpack(dllConfig, function(err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + &quot;\n\n&quot;
    );
    console.log(chalk.cyan(&quot; build dll succeed !.\n&quot;));
  });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);
<span class="hljs-keyword">var</span> dllConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"./webpack.dll.conf"</span>);
<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">"chalk"</span>);
<span class="hljs-keyword">var</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">"rimraf"</span>);
<span class="hljs-keyword">var</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">"ora"</span>);

<span class="hljs-keyword">var</span> spinner = ora({
  <span class="hljs-attr">color</span>: <span class="hljs-string">"green"</span>,
  <span class="hljs-attr">text</span>: <span class="hljs-string">"building for Dll..."</span>
});
spinner.start();
rm(path.resolve(__dirname, <span class="hljs-string">"../libs"</span>), err =&gt; {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
  webpack(dllConfig, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, stats</span>) </span>{
    spinner.stop();
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
    process.stdout.write(
      stats.toString({
        <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
      }) + <span class="hljs-string">"\n\n"</span>
    );
    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">" build dll succeed !.\n"</span>));
  });
});
</code></pre>
<ol><li>修改<code>webpack.prod.conf.js</code>文件</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bundleConfig = require(&quot;../libs/bundle-config.json&quot;);
...
...
plugins: [
  // 增加DllReferencePlugin配置
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(&quot;../libs/libs-mainfest.json&quot;) // 指向生成的manifest.json
  }),
  ...
  ...
  new HtmlWebpackPlugin({
    ...
    // 增加两个变量
    libJsName: bundleConfig.libs.js,
    libCssName: bundleConfig.libs.css,
  }),
  ...
  ...
  // 增加一个静态文件目录
   new CopyWebpackPlugin([
     ...
     ...
    {
      from: path.resolve(__dirname, &quot;../libs&quot;),
      to: config.build.assetsSubDirectory,
      ignore: [&quot;*.json&quot;]
    }
  ])
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> bundleConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../libs/bundle-config.json"</span>);
...
...
plugins: [
  <span class="hljs-comment">// 增加DllReferencePlugin配置</span>
  <span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
    <span class="hljs-attr">context</span>: __dirname,
    <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">"../libs/libs-mainfest.json"</span>) <span class="hljs-comment">// 指向生成的manifest.json</span>
  }),
  ...
  ...
  new HtmlWebpackPlugin({
    ...
    <span class="hljs-comment">// 增加两个变量</span>
    libJsName: bundleConfig.libs.js,
    <span class="hljs-attr">libCssName</span>: bundleConfig.libs.css,
  }),
  ...
  ...
  <span class="hljs-comment">// 增加一个静态文件目录</span>
   <span class="hljs-keyword">new</span> CopyWebpackPlugin([
     ...
     ...
    {
      <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">"../libs"</span>),
      <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
      <span class="hljs-attr">ignore</span>: [<span class="hljs-string">"*.json"</span>]
    }
  ])
]</code></pre>
<ol><li>修改模版文件<code>index.html</code>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<body>
  <div id=&quot;app&quot;></div>
  <!-- built files will be auto injected -->
  <% if (htmlWebpackPlugin.options.libCssName){ %>
    <link rel=&quot;stylesheet&quot; href=&quot;./static/<%= htmlWebpackPlugin.options.libCssName %>&quot;>
  <% } %>

  <% if (htmlWebpackPlugin.options.libJsName){ %>
      <script src=&quot;./static/<%= htmlWebpackPlugin.options.libJsName %>&quot;></script>
  <% } %>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erb"><code class="ejs"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">if</span> (htmlWebpackPlugin.options.libCssName){ </span><span class="xml"><span class="hljs-tag">%&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./static/&lt;%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.libCssName </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> } </span><span class="xml"><span class="hljs-tag">%&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> <span class="hljs-keyword">if</span> (htmlWebpackPlugin.options.libJsName){ </span><span class="xml"><span class="hljs-tag">%&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./static/&lt;%=</span></span></span><span class="ruby"> htmlWebpackPlugin.options.libJsName </span><span class="xml"><span class="hljs-tag"><span class="hljs-string">%&gt;"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">%</span></span></span><span class="ruby"> } </span><span class="xml"><span class="hljs-tag">%&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span></code></pre>
<ol><li>修改<code>package.json</code>，增加<code>scripts</code>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  // 增加
  &quot;dll&quot;: &quot;node build/build-dll.js&quot;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: {
  // 增加
  <span class="hljs-attr">"dll"</span>: <span class="hljs-string">"node build/build-dll.js"</span>
},</code></pre>
<ol><li>
<code>npm run dll</code>先执行预编译，然后在打包项目文件，如果引入的类库文件没有变更就不再需要再次执行预编译</li></ol>
<h3 id="articleHeader5">happypack</h3>
<blockquote>
<p>文档地址 <a href="https://github.com/amireh/happypack" rel="nofollow noreferrer" target="_blank">https://github.com/amireh/hap...</a></p>
<p>一般node.js是单线程执行编译，而happypack则是启动node的多线程进行构建，大大提高了构建速度。</p>
<p>在插件中new一个新的happypack进程出来，然后再使用使用loader的地方替换成对应的id</p>
</blockquote>
<ol><li>修改<code>webpack.base.conf.js</code>文件</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var HappyPack = require('happypack');
var os = require('os');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
...
...
// 增加plugins
 plugins: [
  new HappyPack({
    id: 'happy-babel-js',
    loaders: ['babel-loader?cacheDirectory=true'],
    threadPool: happyThreadPool,
  })
]
...
...
// 修改对应loader
{
  test: /\.js$/,
  loader: 'happypack/loader?id=happy-babel-js',
  include: [resolve('src'), resolve('test')],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> HappyPack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'happypack'</span>);
<span class="hljs-keyword">var</span> os = <span class="hljs-built_in">require</span>(<span class="hljs-string">'os'</span>);
<span class="hljs-keyword">var</span> happyThreadPool = HappyPack.ThreadPool({ <span class="hljs-attr">size</span>: os.cpus().length });
...
...
<span class="hljs-comment">// 增加plugins</span>
 plugins: [
  <span class="hljs-keyword">new</span> HappyPack({
    <span class="hljs-attr">id</span>: <span class="hljs-string">'happy-babel-js'</span>,
    <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'babel-loader?cacheDirectory=true'</span>],
    <span class="hljs-attr">threadPool</span>: happyThreadPool,
  })
]
...
...
<span class="hljs-comment">// 修改对应loader</span>
{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'happypack/loader?id=happy-babel-js'</span>,
  <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
}</code></pre>
<h3 id="articleHeader6">webpack-parallel-uglify-plugin</h3>
<blockquote>
<p>文档地址 <a href="https://github.com/gdborton/webpack-parallel-uglify-plugin" rel="nofollow noreferrer" target="_blank">https://github.com/gdborton/w...</a></p>
<p><code>webpack</code>提供的<code>UglifyJS</code>插件由于采用单线程压缩，速度很慢 ,<br><code>webpack-parallel-uglify-plugin</code>插件可以并行运行<code>UglifyJS</code>插件，这可以有效减少构建时间。</p>
</blockquote>
<ol><li>修改<code>webpack.prod.conf.js</code>文件</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
...
...
// 删掉webpack提供的UglifyJS插件
// new webpack.optimize.UglifyJsPlugin({
//   compress: {
//     warnings: false,
//     drop_console: true
//   },
//   sourceMap: true
// }),
// 增加 webpack-parallel-uglify-plugin来替换
new ParallelUglifyPlugin({
  cacheDir: '.cache/',
  uglifyJS:{
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> ParallelUglifyPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-parallel-uglify-plugin'</span>);
...
...
<span class="hljs-comment">// 删掉webpack提供的UglifyJS插件</span>
<span class="hljs-comment">// new webpack.optimize.UglifyJsPlugin({</span>
<span class="hljs-comment">//   compress: {</span>
<span class="hljs-comment">//     warnings: false,</span>
<span class="hljs-comment">//     drop_console: true</span>
<span class="hljs-comment">//   },</span>
<span class="hljs-comment">//   sourceMap: true</span>
<span class="hljs-comment">// }),</span>
<span class="hljs-comment">// 增加 webpack-parallel-uglify-plugin来替换</span>
<span class="hljs-keyword">new</span> ParallelUglifyPlugin({
  <span class="hljs-attr">cacheDir</span>: <span class="hljs-string">'.cache/'</span>,
  <span class="hljs-attr">uglifyJS</span>:{
    <span class="hljs-attr">output</span>: {
      <span class="hljs-attr">comments</span>: <span class="hljs-literal">false</span>
    },
    <span class="hljs-attr">compress</span>: {
      <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
    }
  }
}),</code></pre>
<h3 id="articleHeader7">webpack 3</h3>
<blockquote>
<p>webpack3新特性一览 <a href="https://juejin.im/entry/5971483951882552681c4a30" rel="nofollow noreferrer" target="_blank">https://juejin.im/entry/59714...</a></p>
<p>webpack 3.x 提供了一个新的功能：Scope Hoisting，又译作“作用域提升”。只需在配置文件中添加一个新的插件，就可以让 Webpack 打包出来的代码文件更小、运行的更快。</p>
</blockquote>
<ol><li>修改<code>webpack.prod.conf.js</code>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
...
plugins: [
  // 往plugins添加一个配置
  // ps 只针对es6的模块化有效
  new webpack.optimize.ModuleConcatenationPlugin(),
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
...
plugins: [
  <span class="hljs-comment">// 往plugins添加一个配置</span>
  <span class="hljs-comment">// ps 只针对es6的模块化有效</span>
  <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),
]</code></pre>
<p>ps：配置文件详情请点击 <a href="https://github.com/liaoyinglong/vue-template" rel="nofollow noreferrer" target="_blank">https://github.com/liaoyinglo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue-cli的webpack配置优化

## 原文链接
[https://segmentfault.com/a/1190000011721918](https://segmentfault.com/a/1190000011721918)


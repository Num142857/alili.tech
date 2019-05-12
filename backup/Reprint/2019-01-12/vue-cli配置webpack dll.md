---
title: 'vue-cli配置webpack dll' 
date: 2019-01-12 2:30:24
hidden: true
slug: igjd4hdyuz9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">问题</h2>
<p>在前端项目中，我们希望第三方库（<code>vendors</code>）和自己写的代码可以分开打包，<code>vue-cli</code>也帮我们配好了<code>webpack</code>的<code>CommonsChunkPlugin</code>，但是在使用<code>vue-cli</code>的打包的过程中有一些痛点。</p>
<h3 id="articleHeader1">一、<code>verdors</code>缓存失效</h3>
<p>改变了app.js的一点儿代码，<code>verdors</code>打包的<code>chunkhash</code>就会改变,导致每次发布，<code>vendors</code>的缓存都会失效。这样增加了用户的流量消耗和首屏加载时间。</p>
<h3 id="articleHeader2">二、项目打包时间过长</h3>
<p>在公司的台式机打包一次要花费30s，在个人笔记本上则需要花费40s之多。</p>
<p>为了解决上述问题，在网上查找资料后，找到使用 <code>webpack dll</code>这个方案。</p>
<h2 id="articleHeader3">解决过程</h2>
<h3 id="articleHeader4">　一、编写dll配置文件</h3>
<p>先贴上我的<code>webpack.dll.conf.js</code>配置代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path              = require('path');
var webpack           = require('webpack');
var config            = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin'); // 提取css
var AssetsPlugin = require('assets-webpack-plugin'); // 生成文件名，配合HtmlWebpackPlugin增加打包后dll的缓存
module.exports        = {
  entry: {
    libs: [
      'vue-infinite-scroll',
      'vue-cookie',
      'jquery',
      'iscroll',
      'weui.js',
      'video.js',
      'babel-polyfill',
      'resetcss',
      'font-awesome/css/font-awesome.min.css',
      'video.js/dist/video-js.min.css',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].[chunkhash:7].js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../public/[name]-mainfest.json'),
      name: '[name]_library',
      context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
    }),
    new ExtractTextPlugin('[name].[contenthash:7].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    }),
    new AssetsPlugin({
      filename: 'bundle-config.json',
      path: './public'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: &quot;style-loader&quot;,
          use: &quot;css-loader&quot;
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path              = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> webpack           = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> config            = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>); <span class="hljs-comment">// 提取css</span>
<span class="hljs-keyword">var</span> AssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assets-webpack-plugin'</span>); <span class="hljs-comment">// 生成文件名，配合HtmlWebpackPlugin增加打包后dll的缓存</span>
<span class="hljs-built_in">module</span>.exports        = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">libs</span>: [
      <span class="hljs-string">'vue-infinite-scroll'</span>,
      <span class="hljs-string">'vue-cookie'</span>,
      <span class="hljs-string">'jquery'</span>,
      <span class="hljs-string">'iscroll'</span>,
      <span class="hljs-string">'weui.js'</span>,
      <span class="hljs-string">'video.js'</span>,
      <span class="hljs-string">'babel-polyfill'</span>,
      <span class="hljs-string">'resetcss'</span>,
      <span class="hljs-string">'font-awesome/css/font-awesome.min.css'</span>,
      <span class="hljs-string">'video.js/dist/video-js.min.css'</span>,
    ]
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'../public'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].[chunkhash:7].js'</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]_library'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'../public/[name]-mainfest.json'</span>),
      <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_library'</span>,
      <span class="hljs-attr">context</span>: __dirname <span class="hljs-comment">// 执行的上下文环境，对之后DllReferencePlugin有用</span>
    }),
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'[name].[contenthash:7].css'</span>),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      },
    }),
    <span class="hljs-keyword">new</span> AssetsPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle-config.json'</span>,
      <span class="hljs-attr">path</span>: <span class="hljs-string">'./public'</span>
    }),
  ],
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: ExtractTextPlugin.extract({
          <span class="hljs-attr">fallback</span>: <span class="hljs-string">"style-loader"</span>,
          <span class="hljs-attr">use</span>: <span class="hljs-string">"css-loader"</span>
        })
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'img/[name].[hash:7].[ext]'</span>
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">query</span>: {
          <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>
        }
      }
    ]
  },
}</code></pre>
<ul>
<li>1、<code>entry</code>配置需要dll打包的库</li>
<li>2、<code>module</code>配置处理对应文件类型的loader</li>
<li>
<p>3、增加 <code>webpack.DllPlugin</code>插件</p>
<ul>
<li>1、path:生成<code>mainfest.json</code>文件的绝对路径。<code>mainfest.json</code>里面的内容为所有被打包到dll.js文件模块id的映射。</li>
<li>2、<code>name</code>：<code>webpack</code>打包时mainfest.json包含的库的暴露出来的函数名名</li>
<li>3、<code>contenxt</code>(可选):引入<code>manifest</code>文件的<code>context</code>，默认为<code>webpack</code>的<code>context</code>
</li>
</ul>
</li>
</ul>
<h3 id="articleHeader5">二、修改webpack.base.conf.js</h3>
<p>在<code>webpack.base.conf.js</code>的<code>plugins</code>增加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../public/libs-mainfest.json') // 指向生成的manifest.json
    })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.DllReferencePlugin({
      <span class="hljs-attr">context</span>: __dirname,
      <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../public/libs-mainfest.json'</span>) <span class="hljs-comment">// 指向生成的manifest.json</span>
    }),</code></pre>
<p>注：上面提到通过<code>AssetsPlugin</code>和<code>HtmlWebpackPlugin</code>给打包的dll.js各dll.css增加缓存机制</p>
<p><code>AssetsPlugin</code>生成的<code>bundle-config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{&quot;libs&quot;:{&quot;js&quot;:&quot;libs.f7d8ef0.js&quot;,&quot;css&quot;:&quot;libs.e2245d7.css&quot;"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
{<span class="hljs-string">"libs"</span>:{<span class="hljs-string">"js"</span>:<span class="hljs-string">"libs.f7d8ef0.js"</span>,<span class="hljs-string">"css"</span>:<span class="hljs-string">"libs.e2245d7.css"</span>"}}"</code></pre>
<p><code>webpack.dev.conf.js</code>文件增加以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bundleConfig = require(&quot;../public/bundle-config.json&quot;)
new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      libJsName:bundleConfig.libs.js, 
      libCssName:bundleConfig.libs.css,
      env:config.dev.env,

    })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> bundleConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../public/bundle-config.json"</span>)
<span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">libJsName</span>:bundleConfig.libs.js, 
      <span class="hljs-attr">libCssName</span>:bundleConfig.libs.css,
      <span class="hljs-attr">env</span>:config.dev.env,

    }),</code></pre>
<p>在<code>index.html</code>引入生成的dll.js,dll.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <link rel=&quot;stylesheet&quot; href=&quot;./public/<%= htmlWebpackPlugin.options.libCssName %>&quot;>
  <script src=&quot;./public/<%= htmlWebpackPlugin.options.libJsName %>&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./public/&lt;%= htmlWebpackPlugin.options.libCssName %&gt;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./public/&lt;%= htmlWebpackPlugin.options.libJsName %&gt;"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上面为开发环境的配置，生产环境对应修改就可以了。</p>
<ul><li>增加<code>build.dll.js</code>文件，</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path              = require('path');
var utils             = require('./utils')

var webpack           = require('webpack');
var config            = require('../config')
var utils             = require('./utils')
var dllConfig         = require('./webpack.dll.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin      = require('assets-webpack-plugin');

var chalk = require('chalk')
var rm                = require('rimraf')
var ora = require('ora')
var spinner = ora({
  color: 'green',
  text: '正为生产环境打包dll包，耐心点，不然自动关机。。。'
})
spinner.start()
rm(path.resolve(__dirname, '../public'),  err => {
  if (err) throw err
  webpack(dllConfig,function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

    console.log(chalk.cyan('  dll打包完成.\n'))
  })
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> path              = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> utils             = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)

<span class="hljs-keyword">var</span> webpack           = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> config            = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">var</span> utils             = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">var</span> dllConfig         = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.dll.conf'</span>);
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> AssetsPlugin      = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assets-webpack-plugin'</span>);

<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">var</span> rm                = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-keyword">var</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ora'</span>)
<span class="hljs-keyword">var</span> spinner = ora({
  <span class="hljs-attr">color</span>: <span class="hljs-string">'green'</span>,
  <span class="hljs-attr">text</span>: <span class="hljs-string">'正为生产环境打包dll包，耐心点，不然自动关机。。。'</span>
})
spinner.start()
rm(path.resolve(__dirname, <span class="hljs-string">'../public'</span>),  err =&gt; {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  webpack(dllConfig,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, stats</span>) </span>{
    spinner.stop()
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    process.stdout.write(stats.toString({
          <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
        }) + <span class="hljs-string">'\n\n'</span>)

    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">'  dll打包完成.\n'</span>))
  })
});
</code></pre>
<ul><li>然后在<code>package.json</code> <code>script</code>中加上<code>"build:dll": "node build/buildDll.js"</code>
</li></ul>
<blockquote><p>注：开发和生产环境都要首先使用 webpack运行<code>webpack.dll.conf.js</code>生成<code>dll.js, dll.css, mainfest.json</code>文件，每次改变库文件也都需要重新执行一遍。</p></blockquote>
<h3 id="articleHeader6">三、对比结果</h3>
<p>优化前笔记本上打包时间为4000ms，<br>优化后笔记本打包时间为1800ms，同时也增加了这些库的缓存。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli配置webpack dll

## 原文链接
[https://segmentfault.com/a/1190000009799021](https://segmentfault.com/a/1190000009799021)


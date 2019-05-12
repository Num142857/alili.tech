---
title: 'vue项目升级webpack4指南' 
date: 2018-12-04 2:30:05
hidden: true
slug: weh19nhnrb
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>所用vue-cli版本为2.9.3, 非最新的3.0+版本, 包管理工具为yarn</blockquote>
<h3>初始化项目</h3>
<pre><code>vue init webpack my-project
cd my-project
yarn install</code></pre>
<p>脚手架项目webpack版本为3.6.0</p>
<h3>升级webpack等devdependencies</h3>
<pre><code>yarn upgrade webpack@4.6.0
yarn add webpack-dev-server webpack-cli -D</code></pre>
<p>光升级这写是不够的, 此时运行项目会报一些奇奇怪怪的错误, 比如<br><code>TypeError: compilation.mainTemplate.applyPluginsWaterfall is not a function</code><br>查看错误信息上下文,</p>
<pre><code>/workspace/my-project/node_modules/html-webpack-plugin/lib/compiler.js:81
        var outputName = compilation.mainTemplate.applyPluginsWaterfall('asset-path', outputOptions.filename, {
TypeError: compilation.mainTemplate.applyPluginsWaterfall is not a function</code></pre>
<p>应该是相关插件版本不对, 比如这个错误就是<code>html-webpack-plugin</code>未升级版本导致</p>
<p>继续升级相关plugin</p>
<p>需要升级的相关plugin如下:</p>
<pre><code>html-webpakc-plugin
vue-loader</code></pre>
<p>其他未涉及的, 也尽可能升级到新的版本.</p>
<h3>修改webpack等相关配置文件</h3>
<p>指定webpack.dev.conf.j和webpack.prod.conf.js 的mode 为<code>development</code>和<code>production</code>, 否则会有警告信息⚠️<br><code>The 'mode' option has not been set, webpack will fallback to 'production' for this value.</code></p>
<p>此时项目已经能在dev-server下顺利运行.<br>删除多余配置项: <code>webpack.DefinePlugin</code>已不再需要, 在开发模式下, process.env.NODE_ENV 自动被设置为'development', 生成模式下则是<code>production</code><br>其他环境变量推荐使用<code>cross-env</code>在命令里设置, 如果需要也可以保留.</p>
<pre><code>cross-env cross-env NODE_ENV=test yarn test</code></pre>
<p>其他插件修改:<br><code>NoEmitOnErrorsPlugin</code> 废弃，使用<code>optimization.noEmitOnErrors</code>替代，在生产环境中默认开启<br><code>ModuleConcatenationPlugin</code> 废弃，使用<code>optimization.concatenateModules</code>替代，在生产环境默认开启该插件。<br><code>NamedModulesPlugin</code> 废弃，使用<code>optimization.namedModules</code>替代，在生产环境默认开启。<br><code>uglifyjs-webpack-plugin</code>升级到了v1.0版本, 默认开启缓存和并行功能。<br><code>CommonsChunkPlugin</code> 被删除</p>
<p>在配置文件中删除废弃的插件, 至此, 开发模式改造完毕</p>
<h4>生产模式改造</h4>
<p>应为<code>CommonsChunkPlugin</code>被删除, 改为内置的api, 首先删除<code>webpack.prod.conf.js</code>相关配置(CommonsChunkPlugin和UglifyJsPlugin), 新增项optimization,</p>
<pre><code> optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap,
        uglifyOptions: {
          warnings: false
        }
      }),
      new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    ],
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }</code></pre>
<p><code>extract-text-webpack-plugin</code>已不再被推荐使用, webpack4 推荐使用新的插件<code>mini-css-extract-plugin</code></p>
<pre><code>yarn add mini-css-extract-plugin  -D</code></pre>
<p>修改配置文件</p>
<pre><code>// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

...
plugins: [
    ...
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css'),
    //   allChunks: true,
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css'  // use contenthash *
    }),
]</code></pre>
<p>再修改build/utils文件中extract css的设置</p>
<pre><code>// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
...
    if (options.extract) {
      // return ExtractTextPlugin.extract({
      //   use: loaders,
      //   fallback: 'vue-style-loader'
      // })
      // MiniCssExtractPlugin.loader,
      return [MiniCssExtractPlugin.loader].concat(loaders)
    } else {
      return ['vue-style-loader'].concat(loaders)
    }</code></pre>
<p><code>yarn build</code>已经能够正常打包, 经过测试, 打包5万行代码的一个项目, webpack4比3快20s左右</p>
<p>经过修改的demo项目<a href="https://github.com/Youzhigang/vue-webpack4-demo" rel="nofollow noreferrer">github地址</a><br>补充: 如果打包的时候出现</p>
<pre><code>WARNING in asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
This can impact web performance.</code></pre>
<p>在webpack中增加配置即可</p>
<pre><code>performance: {
  hints: false
}</code></pre>
<h3>tips</h3>
<p>新版的webpack devserver 如果不指定host, 只能通过localhost访问, 通过ip不能访问, 修改方法很简单, 指明host为 '0.0.0.0'就可以</p>
<pre><code>...
 host: '0.0.0.0', // can be overwritten by process.env.HOST
 port: 8080
...
</code></pre>
<h3>问题</h3>
<p>如果build或者dev时候出现, html-webpack-plugin报错的情况, 请升级该插件, <a href="https://github.com/jantimon/html-webpack-plugin/issues/991" rel="nofollow noreferrer">相关issue</a></p>
<pre><code>yarn add html-webpack-plugin@next -D</code></pre>
<p>如果报chunksSortMode相关的错误, 请删除<code>chunksSortMode: 'dependency'</code>之后再尝试build</p>
<p>还是建议升级<code>html-webpack-plugin@next</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目升级webpack4指南

## 原文链接
[https://segmentfault.com/a/1190000014516899](https://segmentfault.com/a/1190000014516899)


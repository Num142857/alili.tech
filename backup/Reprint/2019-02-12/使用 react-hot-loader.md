---
title: '使用 react-hot-loader' 
date: 2019-02-12 2:30:12
hidden: true
slug: pkj3ujnwnjq
categories: [reprint]
---

{{< raw >}}

                    
<p>经过 <a href="/u/assassin">@assassin_cike</a> 提醒有这样一个loader，今天试了一下真的非常好用。</p>
<p>hot loader 是干嘛的呢？引用官网的一句话就是</p>
<blockquote><p>React Hot Loader is a plugin for Webpack that allows instantaneous live refresh without losing state while editing React components.</p></blockquote>
<p>简单的讲，就是使用 react 编写代码时，能让修改的部分自动刷新。但这和自动刷新网页是不同的，因为 hot-loader 并不会刷新网页，而仅仅是替换你修改的部分，也就是上面所说的 <code>without losing state</code>。</p>
<p>用一张图来感受一下：</p>
<p><span class="img-wrap"><img data-src="/img/bVtIqa" src="https://static.alili.tech/img/bVtIqa" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h1 id="articleHeader0">使用</h1>
<p>其实官方（<a href="http://gaearon.github.io/react-hot-loader/getstarted/" rel="nofollow noreferrer" target="_blank">点这里</a>）已经介绍的很清楚了，只是可能一些小细节得自己找一下，我在这里就记录一下具体的使用流程吧。</p>
<h2 id="articleHeader1">安装</h2>
<p>首先是安装 react-hot-loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev react-hot-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> react-hot-loader</code></pre>
<p>另外 hot-loader 是基于 webpack-dev-server，所以还得安装 webpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> webpack-<span class="hljs-built_in">dev</span>-server</code></pre>
<h2 id="articleHeader2">配置</h2>
<h3 id="articleHeader3">配置 <code>webpack-dev-server</code>
</h3>
<p>使用 react-hot-loader 时，首先还是要让 webpack-dev-server 打开。</p>
<p>在根目录新建 <code>server.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> WebpackDevServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-dev-server'</span>);
<span class="hljs-keyword">var</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>);

<span class="hljs-keyword">new</span> WebpackDevServer(webpack(config), {
  <span class="hljs-attr">publicPath</span>: config.output.publicPath,
  <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>
}).listen(<span class="hljs-number">3000</span>, <span class="hljs-string">'localhost'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">console</span>.log(err);
  }

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Listening at http://localhost:3000/'</span>)
});</code></pre>
<h3 id="articleHeader4">配置 <code>webpack.config.js</code>
</h3>
<p>然后在 webpack 的配置文件里添加 react-hot-loader。</p>
<p>打开 <code>webpack.config.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');

module.exports = {
  // 修改 entry
  entry: [
    // 写在入口文件之前
    &quot;webpack-dev-server/client?http://0.0.0.0:3000&quot;,
    &quot;webpack/hot/only-dev-server&quot;,
    // 这里是你的入口文件
    &quot;./src/app.js&quot;,
  ],
  output: {
    path: __dirname,
    filename: &quot;build/js/bundle.js&quot;,
    publicPath: &quot;/build&quot;
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面
        loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
      }
    ]
  },
  // 添加插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 修改 entry</span>
  entry: [
    <span class="hljs-comment">// 写在入口文件之前</span>
    <span class="hljs-string">"webpack-dev-server/client?http://0.0.0.0:3000"</span>,
    <span class="hljs-string">"webpack/hot/only-dev-server"</span>,
    <span class="hljs-comment">// 这里是你的入口文件</span>
    <span class="hljs-string">"./src/app.js"</span>,
  ],
  output: {
    path: __dirname,
    filename: <span class="hljs-string">"build/js/bundle.js"</span>,
    publicPath: <span class="hljs-string">"/build"</span>
  },
  <span class="hljs-keyword">module</span>: {
    loaders: [
      {
        test: <span class="hljs-regexp">/\.jsx?$/</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-comment">// 在这里添加 react-hot，注意这里使用的是loaders，所以不能用 query，应该把presets参数写在 babel 的后面</span>
        loaders: [<span class="hljs-string">'react-hot'</span>, <span class="hljs-string">'babel?presets[]=react,presets[]=es2015'</span>]
      }
    ]
  },
  <span class="hljs-comment">// 添加插件</span>
  plugins: [
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  ]</code></pre>
<h2 id="articleHeader5">使用</h2>
<p>首先运行 <code>server.js</code>（当然你可以在 package.json 里面配置，使用 npm start 运行）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js</code></pre>
<p>然后照常使用 webpack</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --display-error-details --progress --colors --watch" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">webpack</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">display</span><span class="hljs-literal">-</span><span class="hljs-comment">error</span><span class="hljs-literal">-</span><span class="hljs-comment">details</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">watch</span></code></pre>
<h1 id="articleHeader6">问题</h1>
<p>发现每次修改后目录下就多了一堆 <code>xxxx.hot-update.js</code> 和 <code>xxxx.hot-update.json</code>，正在想咋弄。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 react-hot-loader

## 原文链接
[https://segmentfault.com/a/1190000004660311](https://segmentfault.com/a/1190000004660311)


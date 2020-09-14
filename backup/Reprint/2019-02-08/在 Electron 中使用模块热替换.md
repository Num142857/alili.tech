---
title: '在 Electron 中使用模块热替换' 
date: 2019-02-08 2:30:41
hidden: true
slug: kcortozdf4
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000006770611" src="https://static.alili.tech/img/remote/1460000006770611" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>Electron</code> + <code>React</code> + <code>Webpack</code> 这个组合开发桌面应用还是挺爽的。</p>
<p>如果再搭上 <code>Webpack</code> 的 <a href="http://webpack.github.io/docs/hot-module-replacement.html" rel="nofollow noreferrer" target="_blank">Hot Module Replacement</a> 那简直完美，不用刷新就搞定。</p>
<p>关于 <code>HMR</code> 的演示可以看 Dan Abramov 的演讲视频 <a href="https://www.youtube.com/watch?v=xsSnOQynTHs" rel="nofollow noreferrer" target="_blank">Hot Reloading with Time Travel</a>。</p>
<p>在 <code>Electron</code> 中使用 <code>HMR</code> 碰到的问题是打开的文件是本地的，<code>host</code> 就变成了 <code>file://</code>，</p>
<p>所以监听到变化之后，<code>Webpack</code> 尝试更新模块时，就查找不到 <code>hot-update.json</code> ，然后 <code>Webpack</code> 无法更新模块...</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005747529" src="https://static.alili.tech/img/remote/1460000005747529" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>当时这个问题搞疯了我，花了很长时间，所以这篇就是为了记录下当时的坑。</p>
<p>上图出现的情况，当时用的配置就是使用的比较官方的方式, 使用 <code>webpack-dev-server</code> 和 <code>react-hot-loader</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import path from 'path'
import webpack from 'webpack'

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">'path'</span>
<span class="hljs-keyword">import</span> webpack <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack'</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'eval'</span>,
  <span class="hljs-attr">entry</span>: [
    <span class="hljs-string">'webpack-dev-server/client?http://localhost:3000'</span>,
    <span class="hljs-string">'webpack/hot/only-dev-server'</span>,
    <span class="hljs-string">'./src/index'</span>
  ],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/static/'</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  ],
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">loaders</span>: [{
      <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
      <span class="hljs-attr">loaders</span>: [<span class="hljs-string">'react-hot'</span>, <span class="hljs-string">'babel'</span>],
      <span class="hljs-attr">include</span>: path.join(__dirname, <span class="hljs-string">'src'</span>)
    }]
  }
}</code></pre>
<p>然后换成 <a href="https://github.com/gaearon/react-hot-loader/pull/240" rel="nofollow noreferrer" target="_blank">React Hot Loader 3</a> 试了一下，果然不出所料，还是没能成功。</p>
<p>原本以为问题就是出在 <code>webpack-dev-server</code> 上，所以就把精力集中在替换 <code>webpack-dev-server</code> 上了。</p>
<p>然后用 <code>express</code> + <code>webpack-dev-middleware</code> + <code>webpack-hot-middleware</code> 自己搭建服务。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from './webpack.config.dev'

const app = express()
const compiler = webpack(config)
const PORT = 3000

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: false,
  reload: true,
  stats: {
    colors: true
  }
}))

// hot
app.use(webpackHotMiddleware(compiler))

app.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Listening at http://localhost:${PORT}`)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>

<span class="hljs-keyword">import</span> express <span class="hljs-keyword">from</span> <span class="hljs-string">'express'</span>
<span class="hljs-keyword">import</span> webpack <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack'</span>
<span class="hljs-keyword">import</span> webpackDevMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack-dev-middleware'</span>
<span class="hljs-keyword">import</span> webpackHotMiddleware <span class="hljs-keyword">from</span> <span class="hljs-string">'webpack-hot-middleware'</span>

<span class="hljs-keyword">import</span> config <span class="hljs-keyword">from</span> <span class="hljs-string">'./webpack.config.dev'</span>

<span class="hljs-keyword">const</span> app = express()
<span class="hljs-keyword">const</span> compiler = webpack(config)
<span class="hljs-keyword">const</span> PORT = <span class="hljs-number">3000</span>

app.use(webpackDevMiddleware(compiler, {
  <span class="hljs-attr">publicPath</span>: config.output.publicPath,
  <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">reload</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">stats</span>: {
    <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>
  }
}))

<span class="hljs-comment">// hot</span>
app.use(webpackHotMiddleware(compiler))

app.listen(PORT, <span class="hljs-string">'localhost'</span>, (err) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-built_in">console</span>.error(err)
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Listening at http://localhost:<span class="hljs-subst">${PORT}</span>`</span>)
})
</code></pre>
<p>然而还是不行, 最后研究了这个仓库的<a href="https://github.com/chentsulin/electron-react-boilerplate/blob/master/webpack.config.development.js" rel="nofollow noreferrer" target="_blank">配置</a>，<br>发现还有这样的一个配置 <code>target: 'electron-renderer'</code>，然而官方文档上却没有说明。</p>
<p>Note: <code>target: 'electron-renderer'</code> 属性是在 <code>Webpack</code> <code>v1.12.15</code> 版本中加入的 <a href="https://github.com/webpack/webpack/pull/2181" rel="nofollow noreferrer" target="_blank">make <code>electron-main</code> and <code>electron-renderer</code> targets works in 1.x</a>。</p>
<p>为了避免更多人步我后尘，就去给 <code>Webpack</code> 文档增加了说明 <a href="https://github.com/webpack/docs/wiki/configuration/_compare/135c3a8e13bc72ee5e9aede3571e1e5060188390" rel="nofollow noreferrer" target="_blank">Compare: configuration</a>。</p>
<p>这时候热替换的问题也就解决了，这个过程还能从提交历史中看到 <a href="https://github.com/xwartz/PupaFM/commits/master/dev-server.js" rel="nofollow noreferrer" target="_blank">PupaFM</a>。</p>
<p>But...</p>
<p>当后来有时间再回顾这个问题的时候，一直在想第一种方式应该能解决才对啊，<br>所以在第一种方式的配置上加了 <code>target: 'electron-renderer'</code>，然而并没有什么软用...</p>
<p>最后再一次查看了一遍 <code>Webpack</code> 的文档，仔细的看了 <code>output.publicPath</code> 这个配置。</p>
<h4>output.publicPath</h4>
<blockquote><p>The <code>publicPath</code> specifies the public URL address of the output files when referenced in a browser.</p></blockquote>
<p>For loaders that embed <code>&lt;script&gt;</code> or <code>&lt;link&gt;</code> tags or reference assets like images, <br><code>publicPath</code> is used as the href or url() to the file when it’s different then their location on disk (as specified by path). <br> This can be helpful when you want to host some or all output files on a different domain or on a CDN. <br> The Webpack Dev Server also takes a hint from <code>publicPath</code> using it to determine where to serve the output files from. <br> As with path you can use the [hash] substitution for a better caching profile.</p>
<p>那我是不是只要把相对路径改成绝对地址，就可以监听到文件的更新了。</p>
<p>只要这样就好了嘛 <code>publicPath: 'http://localhost:3000/static/'</code>...</p>
<p>然后写了个 demo ，具体代码可参考 <a href="https://github.com/xwartz/electron-hot-boilerplate" rel="nofollow noreferrer" target="_blank">Electron React Hot Boilerplate</a>。</p>
<p>果然...</p>
<p>还是需要好好阅读完文档啊，虽然 <code>Webpack</code> 的文档也略坑。</p>
<p>原文链接 <a href="http://xwartz.github.io/pupa/2016/06/electron-with-hmr/" rel="nofollow noreferrer" target="_blank">http://xwartz.github.io/pupa/2016/06/electron-with-hmr/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Electron 中使用模块热替换

## 原文链接
[https://segmentfault.com/a/1190000005747526](https://segmentfault.com/a/1190000005747526)


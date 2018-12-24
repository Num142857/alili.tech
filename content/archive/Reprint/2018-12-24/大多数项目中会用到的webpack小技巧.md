---
title: '大多数项目中会用到的webpack小技巧' 
date: 2018-12-24 2:30:06
hidden: true
slug: tnv9l76twq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/rstacruz/webpack-tricks" rel="nofollow noreferrer" target="_blank">原文地址</a>  <br>本文是作者对自己所学的webpack技巧的总结，在没有指定特殊情况下适用于webpack 3.0版本。</p></blockquote>
<h2 id="articleHeader0">进度汇报</h2>
<p>使用<code>webpack --progress --colors</code>这样可以让编译的输出内容带有进度和颜色。</p>
<h2 id="articleHeader1">压缩</h2>
<p>在生产环境中构建项目时，使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack -p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">webpack -p</span></code></pre>
<p>这行代码在webpack 2中还会自动设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.env.NODE_ENV === 'production'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">process</span>.env.NODE_ENV === <span class="hljs-string">'production'</span></code></pre>
<h2 id="articleHeader2">复数文件打包</h2>
<p>通过设置output属性为<code>[name].js</code>来导出复数包。下面的例子将会生成<code>a.js</code>和<code>b.js</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    a: './a',
    b: './b'
  },
  output: { filename: '[name].js' }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">a</span>: <span class="hljs-string">'./a'</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-string">'./b'</span>
  },
  <span class="hljs-attr">output</span>: { <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span> }
}</code></pre>
<p>担心会重复打包？使用 <a href="https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin" rel="nofollow noreferrer" target="_blank">CommonsChunkPlugin</a> 来把通用部分移入一个新的输出文件中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [ new webpack.optimize.CommonsChunkPlugin('init.js') ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">plugins: [ <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'init.js'</span>) ]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src='init.js'></script>
<script src='a.js'></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'init.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'a.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader3">分离app文件与第三方库文件</h2>
<p>使用CommonsChunkPlugin将第三方代码移动到vendor.js中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack')

module.exports = {
  entry: {
    app: './app.js',
    vendor: ['jquery', 'underscore', ...]
  },

  output: {
    filename: '[name].js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor')
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./app.js'</span>,
    <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'jquery'</span>, <span class="hljs-string">'underscore'</span>, ...]
  },

  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
  },

  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'vendor'</span>)
  ]
}</code></pre>
<p>让我们来看看，CommonsChunkPlugin是怎么起作用的:</p>
<ul>
<li>我们指定了一个叫vendor的入口，并且它加载了jquery等第三方库。</li>
<li>CommonsChunkPlugin识别到这些第三方库在app.js中出现重复，便将app.js中的第三方库都移除。</li>
<li>在vendor.js中，CommonsChunkPlugin还加入了webpack的运行时间。</li>
</ul>
<blockquote><p>参考链接：<a href="https://webpack.github.io/docs/code-splitting.html#split-app-and-vendor-code" rel="nofollow noreferrer" target="_blank">Code splitting</a></p></blockquote>
<h2 id="articleHeader4">资源映射 （webpack 1）</h2>
<p>最好的资源映射选项是<code>cheap-module-eval-source-map</code>。当使用chrome/firefox的开发者工具时，它会显示原始资源文件。另一方面，它比<code>source-map</code> 和 <code>eval-source-map</code>更快。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只在webpack 1中有效
const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  debug: DEBUG ? true : false,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 只在webpack 1中有效</span>
<span class="hljs-keyword">const</span> DEBUG = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">debug</span>: DEBUG ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">devtool</span>: DEBUG ? <span class="hljs-string">'cheap-module-eval-source-map'</span> : <span class="hljs-string">'hidden-source-map'</span>
}</code></pre>
<p>你的文件在chrome开发者工具中显示为<code>webpack:///foo.js?a93h</code>。如果我们希望文件名显示得更清晰呢，比如说<code>webpack:///path/to/foo.js</code>？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">output: {
    <span class="hljs-attr">devtoolModuleFilenameTemplate</span>: <span class="hljs-string">'webpack:///[absolute-resource-path]'</span>
}</code></pre>
<blockquote><p>参考链接: <a href="https://webpack.github.io/docs/configuration.html#devtool" rel="nofollow noreferrer" target="_blank">devtool documentation</a></p></blockquote>
<h2 id="articleHeader5">资源映射（webpack 2-3）</h2>
<p>在webpack 2-3版本中，最好的资源映射选项是<code>cheap-module-source-map</code>，因为cheap-module-eval-source-map策略已经不能在chrome/firefox中显示正确的路径。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: DEBUG ? 'cheap-module-source-map' : 'hidden-source-map'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> DEBUG = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: DEBUG ? <span class="hljs-string">'cheap-module-source-map'</span> : <span class="hljs-string">'hidden-source-map'</span>
}</code></pre>
<p>如果你正在使用<a href="https://www.npmjs.com/package/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>，可以用<code>'source-map'</code>替代，否则css的资源映射会不起作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 只有当你使用extract-text-webpack-plugin时
module.exports = {
  devtool: DEBUG ? 'source-map' : 'hidden-source-map'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 只有当你使用extract-text-webpack-plugin时</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: DEBUG ? <span class="hljs-string">'source-map'</span> : <span class="hljs-string">'hidden-source-map'</span>
}</code></pre>
<p>同样的， 想要 <code>webpack:///path/to/foo.js</code>这样清晰的路径，我们可以写成下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">output: {
  <span class="hljs-attr">devtoolModuleFilenameTemplate</span>: <span class="hljs-string">'webpack:///[absolute-resource-path]'</span>
}</code></pre>
<blockquote><p>参考链接: <a href="https://webpack.js.org/configuration/devtool/#devtool" rel="nofollow noreferrer" target="_blank">devtool documentation</a></p></blockquote>
<h2 id="articleHeader6">输出css文件</h2>
<p>这是一个复杂的过程，你可以在<a>这里找到答案</a>。（译者注：这篇指南目前还没有翻译。）</p>
<h2 id="articleHeader7">开发模式</h2>
<p>你想要某些配置只存在于开发环境中吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const DEBUG = process.env.NODE_ENV !== 'production'

// Webpack 1
module.exports = {
  debug: DEBUG ? true : false,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map'
}

// Webpack 2
module.exports = {
  devtool: DEBUG ? 'cheap-module-source-map' : 'hidden-source-map'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> DEBUG = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>

<span class="hljs-comment">// Webpack 1</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">debug</span>: DEBUG ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">devtool</span>: DEBUG ? <span class="hljs-string">'cheap-module-eval-source-map'</span> : <span class="hljs-string">'hidden-source-map'</span>
}

<span class="hljs-comment">// Webpack 2</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">devtool</span>: DEBUG ? <span class="hljs-string">'cheap-module-source-map'</span> : <span class="hljs-string">'hidden-source-map'</span>
}</code></pre>
<p>在webpack 1中，打包你的项目资源时，通过 <code>env NODE_ENV=production webpack -p</code> 来调用webpack命令。<br>而在webpack 2中，只要webpack -p就可以了，因为webpack自动帮你设置了<code>NODE_ENV</code>。</p>
<h2 id="articleHeader8">分析包的大小</h2>
<p>你想知道资源包中有哪些“重量级”依赖吗？使用<code>webpack-bundle-size-analyzer</code>吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ yarn global add webpack-bundle-size-analyzer

$ ./node_modules/.bin/webpack --json | webpack-bundle-size-analyzer
jquery: 260.93 KB (37.1%)
moment: 137.34 KB (19.5%)
parsleyjs: 87.88 KB (12.5%)
bootstrap-sass: 68.07 KB (9.68%)
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$ yarn global add webpack-bundle-size-analyzer

$ ./node_modules/.bin/webpack --json | webpack-bundle-size-analyzer
jquery: <span class="hljs-number">260.93</span> KB (<span class="hljs-number">37.1</span>%)
moment: <span class="hljs-number">137.34</span> KB (<span class="hljs-number">19.5</span>%)
parsleyjs: <span class="hljs-number">87.88</span> KB (<span class="hljs-number">12.5</span>%)
bootstrap-sass: <span class="hljs-number">68.07</span> KB (<span class="hljs-number">9.68</span>%)
...</code></pre>
<p>如果你正在生成资源映射，你也可以使用source-map-explorer，它能够独立于webpack工作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ yarn global add source-map-explorer

$ source-map-explorer bundle.min.js bundle.min.js.map" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$ yarn global add source-map-explorer

$ source-map-explorer bundle.min.js bundle.min.js.map</code></pre>
<blockquote><p>参考链接:   <br><a href="https://github.com/robertknight/webpack-bundle-size-analyzer" rel="nofollow noreferrer" target="_blank">webpack-bundle-size-analyzer</a>  <br><a href="https://www.npmjs.com/package/source-map-explorer" rel="nofollow noreferrer" target="_blank">source-map-explorer</a></p></blockquote>
<h2 id="articleHeader9">更小的react项目</h2>
<p>react会默认生成一些开发工具，而在生产环境中你并不需要它们。使用EnvironmentPlugin来让他们人道毁灭吧。这大概会节约30kb左右的空间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new webpack.EnvironmentPlugin({
    NODE_ENV: 'development'
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  <span class="hljs-keyword">new</span> webpack.EnvironmentPlugin({
    <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'development'</span>
  })
]</code></pre>
<p>在webpack 1中，使用<code>env NODE_ENV=production webpack -p</code>命令启动webpack来打包资源。而在webpack 2中，只要<code>webpack -p</code>就可以了，理由略。</p>
<blockquote><p>参考链接: <a href="https://webpack.js.org/plugins/environment-plugin/" rel="nofollow noreferrer" target="_blank">EnvironmentPlugin documentation</a></p></blockquote>
<h2 id="articleHeader10">更小的Lodash</h2>
<p><a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank">Lodash</a> 非常有用，但是我们通常用到的只是其功能中的沧海一粟。 <a href="https://github.com/lodash/lodash-webpack-plugin" rel="nofollow noreferrer" target="_blank">lodash-webpack-plugin</a> 可以使用<a href="https://lodash.com/docs#noop" rel="nofollow noreferrer" target="_blank">noop</a>, <a href="https://lodash.com/docs#identity" rel="nofollow noreferrer" target="_blank">identity</a>或其他更简化的选项来替换 <a href="https://github.com/lodash/lodash-webpack-plugin#feature-sets" rel="nofollow noreferrer" target="_blank">feature sets</a>，来帮助你减少lodash占用的空间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const config = {
  plugins: [
    new LodashModuleReplacementPlugin({
      path: true,
      flattening: true
    })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> LodashModuleReplacementPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'lodash-webpack-plugin'</span>);

<span class="hljs-keyword">const</span> config = {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> LodashModuleReplacementPlugin({
      <span class="hljs-attr">path</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">flattening</span>: <span class="hljs-literal">true</span>
    })
  ]
};</code></pre>
<p>这种方法可以帮助你省下至少10kb。如果你的项目中lodash的比重很高，那你节省的资源会更多。</p>
<h2 id="articleHeader11">引入文件夹中所有文件</h2>
<p>你是不是曾经尝试过下面的代码却发现不起作用？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./behaviors/*')  /* 看似很正确 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">'./behaviors/*'</span>)  <span class="hljs-comment">/* 看似很正确 */</span></code></pre>
<p>事实上，你应该使用require.context。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// http://stackoverflow.com/a/30652110/873870
function requireAll (r) { r.keys().forEach(r) }

requireAll(require.context('./behaviors/', true, /\.js$/))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// http://stackoverflow.com/a/30652110/873870</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">requireAll</span> (<span class="hljs-params">r</span>) </span>{ r.keys().forEach(r) }

requireAll(<span class="hljs-built_in">require</span>.context(<span class="hljs-string">'./behaviors/'</span>, <span class="hljs-literal">true</span>, /\.js$/))</code></pre>
<blockquote><p>参考链接: <a href="http://webpack.github.io/docs/context.html#require-context" rel="nofollow noreferrer" target="_blank">require.context</a></p></blockquote>
<h2 id="articleHeader12">清除extract-text-webpack-plugin日志</h2>
<p>如果你在使用<a href="https://www.npmjs.com/package/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>时看过下面的调试日志：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Child extract-text-webpack-plugin:
        + 2 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules
Child extract-text-webpack-plugin:
        + 2 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>Child extract-<span class="hljs-built_in">text</span>-webpack-plugin:
        + <span class="hljs-number">2</span> hidden modules
Child extract-<span class="hljs-built_in">text</span>-webpack-plugin:
        + <span class="hljs-number">2</span> hidden modules
Child extract-<span class="hljs-built_in">text</span>-webpack-plugin:
        + <span class="hljs-number">2</span> hidden modules</code></pre>
<p>你可以使用<code>stats: { children: false }</code>来关闭它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* webpack.config.js */
stats: {
  children: false,
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* webpack.config.js */</span>
stats: {
  <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
},</code></pre>
<blockquote><p>参考链接: <a href="https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/35" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin#35</a></p></blockquote>
<h2 id="articleHeader13">总结</h2>
<p>以上就是<a href="https://github.com/rstacruz" rel="nofollow noreferrer" target="_blank">rstacruz</a>总结的13条关于webpack的建议，这几乎是所有项目都用得到的Webpack配置技巧吧~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
大多数项目中会用到的webpack小技巧

## 原文链接
[https://segmentfault.com/a/1190000012244661](https://segmentfault.com/a/1190000012244661)


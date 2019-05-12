---
title: 'Webpack 配置详解（含 4）——关注细节' 
date: 2018-12-02 2:30:15
hidden: true
slug: 6jfk4pnht1a
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p><a href="https://github.com/toBeTheLight/vue-webpack4-learning/tree/master" rel="nofollow noreferrer" target="_blank">源代码</a></p>
<p>熟悉 webpack 与 webpack4 配置。</p>
<p>webpack4 相对于 3 的最主要的区别是所谓的<code>零配置</code>，但是为了满足我们的项目需求还是要自己进行配置，不过我们可以使用一些 webpack 的预设值。同时 webpack 也拆成了两部分，webpack 和 webpack-cli，都需要本地安装。 </p>
<p>我们通过实现一个 vue 的开发模板（vue init webpack 模板，其实跟 vue 关系不太大）来进行一次体验。在配置过程中会尽量使用 webpack4 的相关内容。</p>
<p>本文<strong>不做</strong> webpack 配置的<strong>完整介绍</strong>，着重介绍配置过程中需要注意的地方。查看代码注释阅读效果更佳，完整配置与详细注释可见源代码。配置位于 build 文件夹下。</p>
<p><strong>与版本 4 相关的章节会添加符号 ④</strong>。</p>
<p>需要注意的一点是，我们的 webpack 代码是运行在node环境下的，这部分代码可以使用 node api，但是我们的业务代码（src下）是无法使用 node api 的。</p>
<h1 id="articleHeader1">基本公用配置</h1>
<p>由于 webpack 配置中的如 context，entry（chunk入口），output（输出）和 module.rules 中 loaders 的配置在开发模式和生产模式基本都是公用的，所以我们提取到 <code>webpack.base.js</code> 文件内，供复用。其中 output 部分如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="output: {
  
  path: path.resolve(__dirname, '../dist/'), // 资源文件输出时写入的路径
  filename: 'static/js/[name].[chunkhash].js', // 使用 chunkhash 加入文件名做文件更新和缓存处理
  chunkFilename: 'static/js/[name].[chunkhash].js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">output: {
  
  <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'../dist/'</span>), <span class="hljs-comment">// 资源文件输出时写入的路径</span>
  filename: <span class="hljs-string">'static/js/[name].[chunkhash].js'</span>, <span class="hljs-comment">// 使用 chunkhash 加入文件名做文件更新和缓存处理</span>
  chunkFilename: <span class="hljs-string">'static/js/[name].[chunkhash].js'</span>
}</code></pre>
<p>需要注意的有：</p>
<h2 id="articleHeader2">文件名 hash</h2>
<p>hash 是用在文件输出的名字中的，如 <code>[name].[hash].js</code>，总的来说，webpack 提供了三种 hash：</p>
<ol>
<li>
<code>[hash]</code>：此次打包的所有内容的 hash。</li>
<li>
<code>[chunkhash]</code>：每一个 chunk 都根据自身的内容计算而来。</li>
<li>
<code>[contenthash]</code>：由 css 提取插件提供，根据自身内容计算得来。</li>
</ol>
<p>三种 hash 的使用，我们在优化部分再讲，先优先使用 <code>[chunkhash]</code>。</p>
<h2 id="articleHeader3">loader 优先级</h2>
<p>loader 优先级需要注意两点，</p>
<ol>
<li>
<p>同 test 配置内优先级：在同一个 test 下配置多个 loader ，<a href="https://webpack.js.org/concepts/loaders/#loader-features" rel="nofollow noreferrer" target="_blank">优先处理的 loader 放在配置数组的后面</a>，如对 less 处理，则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.less$/,
  use: [
    'style-loader', 
    'css-loader', 
    'postcss-loader', 
    'less-loader'
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
  <span class="hljs-attr">use</span>: [
    <span class="hljs-string">'style-loader'</span>, 
    <span class="hljs-string">'css-loader'</span>, 
    <span class="hljs-string">'postcss-loader'</span>, 
    <span class="hljs-string">'less-loader'</span>
  ]
}</code></pre>
</li>
<li>
<p>不同 test 内优先级：如对 js 文件的处理需要两个 test 分别配置，使用 <code>eslint-loader</code> 和 <code>babel-loader</code> ，但是又不能配置在一个配置对象内，可使用 <a href="https://webpack.js.org/configuration/module/#rule-enforce" rel="nofollow noreferrer" target="_blank">enforce: 'pre'</a> 强调优先级，由 <code>eslint-loader</code> 优先处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
},
{
  test: /\.js$/,
  loader: 'babel-loader'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|vue)$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>,
  <span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
},
{
  <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
  <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>
}</code></pre>
</li>
</ol>
<h2 id="articleHeader4">css 预处理器配置</h2>
<p>我们以 less 文件的 loader 配置 <code>['vue-style-loader', 'css-loader', 'postcss-loader', 'less-loader']</code>，使用 <code>@import url(demo.less)</code>为例:</p>
<ol>
<li>less-loader 先处理 less 语法</li>
<li>postcss-loader 进行前缀添加等其他处理</li>
<li>css-loader 将内容引入 @import 所在的 css 文件内</li>
<li>vue-style-loader 将生成 style 标签，将 css 内容插入 HTML</li>
</ol>
<p><em>vue-style-loader 功能类似 style-loader</em></p>
<p>但是由于 vue 中的单文件组件，又分为两种情况：</p>
<ul>
<li>
<p>.vue 文件内的 style：  <br><code>vue-loader</code> 会对 .vue 单文件组件进行处理，对 .vue 单文件组件内的各种 lang="type" 我们可以在 <code>vue-loader</code> 的 options <a href="https://vue-loader-v14.vuejs.org/zh-cn/options.html#loaders" rel="nofollow noreferrer" target="_blank">配置不同的 loader</a>，由于 <code>vue-loader</code> 内置了 <code>postcss</code> 对 css 进行处理，所以此处我们不需要再配置 <code>postcss-loader</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    loaders: {
      less: ['// xxx-loaders'],
      scss: ['// xxx-loaders'],
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
  tes<span class="hljs-variable">t:</span> /\.vue$/,
  loader: <span class="hljs-string">'vue-loader'</span>,
  option<span class="hljs-variable">s:</span> {
    loader<span class="hljs-variable">s:</span> {
      les<span class="hljs-variable">s:</span> [<span class="hljs-string">'// xxx-loaders'</span>],
      <span class="hljs-keyword">scs</span><span class="hljs-variable">s:</span> [<span class="hljs-string">'// xxx-loaders'</span>],
    }
  }
}</code></pre>
</li>
<li>js 直接引入中引入样式文件：  <br>如 main.js 中 <code>import 'demo.less'</code>，这种方式引入的样式文件，在 <code>vue-loader</code> 处理范围置之外，所以仍然需要配置 <code>postcss-loader</code>。</li>
</ul>
<p>由于这种差异我们将 对 css 预处理器文件的配置封装为函数，由 <code>usePostCss</code> 参数生成对应配置，将文件放入 <code>utils.js</code> 文件内，将 <code>vue-loader</code> 配置放在 <code>vue-loader.js</code> 文件内。</p>
<p>也就是对 css 预处理器的配置我们需要在 <code>vue-loader</code> 内和 <code>webpack</code> 内配置两遍。</p>
<p><em>写这篇 README.md 期间 vue-loader 发布了 v15 版，需要配合插件使用，不用再进行两遍配置</em></p>
<h2 id="articleHeader5">postcss-loader</h2>
<p><a href="https://www.npmjs.com/package/postcss-loader" rel="nofollow noreferrer" target="_blank">postcss-loader</a> 是一个强大的 css 处理工具，我们将 postcss 的配置拆分出去，新建 <code>postcss.config.js</code> 配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: {
    // 处理 @import
    'postcss-import': {},
    // 处理 css 中 url
    'postcss-url': {},
    // 自动前缀
    'autoprefixer': {
      &quot;browsers&quot;: [
        &quot;> 1%&quot;,
        &quot;last 2 versions&quot;
      ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">plugins</span>: {
    <span class="hljs-comment">// 处理 @import</span>
    <span class="hljs-string">'postcss-import'</span>: {},
    <span class="hljs-comment">// 处理 css 中 url</span>
    <span class="hljs-string">'postcss-url'</span>: {},
    <span class="hljs-comment">// 自动前缀</span>
    <span class="hljs-string">'autoprefixer'</span>: {
      <span class="hljs-string">"browsers"</span>: [
        <span class="hljs-string">"&gt; 1%"</span>,
        <span class="hljs-string">"last 2 versions"</span>
      ]
    }
  }
}</code></pre>
<p>除了注释中列出的需要的功能插件，我们还可能会用到 <code>nextcss</code>（新的css语法的处理），<code>px2rem/px-to-viewport</code> 移动端适配相关的插件。</p>
<h2 id="articleHeader6">babel-loader</h2>
<p>我们使用 babel 编译浏览器不能识别的 js、类 js 语法，如转义 ES6+、JSX等。同样将 <a href="https://www.npmjs.com/package/babel-loader" rel="nofollow noreferrer" target="_blank">babel-loader</a> 的配置拆分出去，需要创建 <code>.babelrc</code> 并配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [
      /* *
       *  babel-preset-env
       *  可以根据配置的目标运行环境自动启用需要的 babel 插件。
       */
      &quot;env&quot;, {
        &quot;modules&quot;: false, // 关闭 babel 对 es module 的处理
        &quot;targets&quot;: { // 目标运行环境
          &quot;browsers&quot;: [&quot;> 1%&quot;, &quot;last 2 versions&quot;, &quot;not ie <= 8&quot;]
        }
      }
    ]
  ],
  &quot;plugins&quot;: [
    &quot;syntax-dynamic-import&quot; // 异步加载语法编译插件
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"presets"</span>: [
    [
      <span class="hljs-comment">/* *
       *  babel-preset-env
       *  可以根据配置的目标运行环境自动启用需要的 babel 插件。
       */</span>
      <span class="hljs-string">"env"</span>, {
        <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 关闭 babel 对 es module 的处理</span>
        <span class="hljs-string">"targets"</span>: { <span class="hljs-comment">// 目标运行环境</span>
          <span class="hljs-string">"browsers"</span>: [<span class="hljs-string">"&gt; 1%"</span>, <span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"not ie &lt;= 8"</span>]
        }
      }
    ]
  ],
  <span class="hljs-string">"plugins"</span>: [
    <span class="hljs-string">"syntax-dynamic-import"</span> <span class="hljs-comment">// 异步加载语法编译插件</span>
  ]
}</code></pre>
<h2 id="articleHeader7">媒体资源 loader</h2>
<p>我们还需要对图片、视频、字体等文件进行 loader 配置，以字体文件为例子，主要用到的是 <a href="https://www.npmjs.com/package/url-loader" rel="nofollow noreferrer" target="_blank">url-loader</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  /**
   * 末尾 \?.* 匹配带 ? 资源路径
   * 我们引入的第三方 css 字体样式对字体的引用路径中可能带查询字符串的版本信息
   */
  test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
  /**
   * url-loader
   * 会配合 webpack 对资源引入路径进行复写，如将 css 提取成独立文件，可能出现 404 错误可查看 提取 js 中的 css 部分解决
   * 会以 webpack 的输出路径为基本路径，以 name 配置进行具体输出
   * limit 单位为 byte，小于这个大小的文件会编译为 base64 写进 js 或 html
   */
  loader: 'url-loader',
  options: {
    limit: 10000,
    name: 'static/fonts/[name].[hash:7].[ext]',
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-comment">/**
   * 末尾 \?.* 匹配带 ? 资源路径
   * 我们引入的第三方 css 字体样式对字体的引用路径中可能带查询字符串的版本信息
   */</span>
  test: <span class="hljs-regexp">/\.(woff2|woff|eot|ttf|otf)(\?.*)?$/</span>,
  <span class="hljs-comment">/**
   * url-loader
   * 会配合 webpack 对资源引入路径进行复写，如将 css 提取成独立文件，可能出现 404 错误可查看 提取 js 中的 css 部分解决
   * 会以 webpack 的输出路径为基本路径，以 name 配置进行具体输出
   * limit 单位为 byte，小于这个大小的文件会编译为 base64 写进 js 或 html
   */</span>
  loader: <span class="hljs-string">'url-loader'</span>,
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'static/fonts/[name].[hash:7].[ext]'</span>,
  }
}</code></pre>
<h2 id="articleHeader8">静态文件拷贝</h2>
<p>直接引用（绝对路径）和代码执行时确定的资源路径应该是以静态文件存在的，这些资源文件不会经过 webpack 编译处理，所以我们将它们放在独立的文件夹（如 static）中，并在代码打包后拷贝到我们的输出目录，我们使用 <a href="https://www.npmjs.com/package/copy-webpack-plugin" rel="nofollow noreferrer" target="_blank">copy-webpack-plugin</a> 自动完成这个工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CopyWebpackPlugin = require('copy-webpack-plugin')

// 在开发模式下，会将文件写入内存
new CopyWebpackPlugin([
  {
    from: path.resolve(__dirname, '../static'),
    to: 'static',
    ignore: ['.*']
  }
])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)

<span class="hljs-comment">// 在开发模式下，会将文件写入内存</span>
<span class="hljs-keyword">new</span> CopyWebpackPlugin([
  {
    <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
    <span class="hljs-attr">to</span>: <span class="hljs-string">'static'</span>,
    <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]
  }
])</code></pre>
<p><em>此插件在拷贝文件过多时会崩溃，不知道解决了没有。</em></p>
<h1 id="articleHeader9">生产模式 production</h1>
<p>我们先进行生产模式的配置。</p>
<h2 id="articleHeader10">添加 script 脚本命令</h2>
<p>在 package.json 下添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;build&quot;: &quot;node build/build.js&quot;`
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>`
}</code></pre>
<p>那么使用 <code>npm run build</code> 命令就可执行 <code>node build/build.js</code>，我们不直接使用 <code>webpack webpack.prod.config.js</code> 命令去执行配置文件，而是在 build.js 中，做一些文件删除的处理，再启动 webpack。</p>
<h2 id="articleHeader11">创建 build.js 逻辑</h2>
<p>主要是两个工作，引入 <code>rimraf</code> 模块删除 webpack 下之前产生的指定文件，启动 webpack，并在不同阶段给出不同的提示信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在第一行设置当前为 生产环境
process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const rm = require('rimraf')
const webpackConfig = require('./webpack.prod')
// 删除 webpack 输出目录下的内容，也可只删除子文件如 static 等
rm(webpackConfig.output.path, err => {
  // webpack 按照生产模式配置启动
  webpack(webpackConfig, (err, stats) => {
    // 输出一些状态信息
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在第一行设置当前为 生产环境</span>
process.env.NODE_ENV = <span class="hljs-string">'production'</span>

<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-keyword">const</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod'</span>)
<span class="hljs-comment">// 删除 webpack 输出目录下的内容，也可只删除子文件如 static 等</span>
rm(webpackConfig.output.path, err =&gt; {
  <span class="hljs-comment">// webpack 按照生产模式配置启动</span>
  webpack(webpackConfig, (err, stats) =&gt; {
    <span class="hljs-comment">// 输出一些状态信息</span>
  })
}</code></pre>
<p><em>更多细节见源代码注释</em>。</p>
<h2 id="articleHeader12">生产模式配置文件</h2>
<p>新建 <code>webpack.prod.js</code> 文件，使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const merge = require('webpack-merge') // 专用合并 webpack 配置的包
const webpackBaseConfig = require('./webpack.base')
module.exports = merge(webpackBaseConfig, {
  // 生产模式配置
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>) <span class="hljs-comment">// 专用合并 webpack 配置的包</span>
<span class="hljs-keyword">const</span> webpackBaseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base'</span>)
<span class="hljs-built_in">module</span>.exports = merge(webpackBaseConfig, {
  <span class="hljs-comment">// 生产模式配置</span>
})</code></pre>
<p>合并基本配置和生产模式独有配置，然后我们开始进行生产模式下的 webpack 的配置信息的填写。</p>
<h2 id="articleHeader13">④ mode 预设</h2>
<p>这是 webpack4 的新 api ，有三个预设值：<code>development</code>，<code>production</code>，<code>none</code>，我们在生产模式选用<code>mode: 'production'</code>，webpack4在此配置下<a href="https://webpack.js.org/concepts/mode/#usage" rel="nofollow noreferrer" target="_blank">默认启用</a>了：</p>
<ul><li>
<p>插件</p>
<ul>
<li>FlagDependencyUsagePlugin：应该是删除无用代码的，其他插件依赖</li>
<li>FlagIncludedChunksPlugin：应该是删除无用代码的，其他插件依赖</li>
<li>ModuleConcatenationPlugin：作用域提升 webpack3的scope hosting</li>
<li>NoEmitOnErrorsPlugin：遇到错误代码不跳出</li>
<li>OccurrenceOrderPlugin</li>
<li>SideEffectsFlagPlugin</li>
<li>UglifyJsPlugin：js代码压缩</li>
<li>process.env.NODE_ENV 的值设为 production</li>
</ul>
</li></ul>
<p>所以这些默认启用的内容我们不需要再配置。</p>
<p>最后一点设置 <code>process.env.NODE_ENV 的值设为 production</code> 其实是使用 DefinePlugin 插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.DefinePlugin({
  &quot;process.env.NODE_ENV&quot;: JSON.stringify(&quot;production&quot;) 
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> webpack.DefinePlugin({
  <span class="hljs-string">"process.env.NODE_ENV"</span>: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">"production"</span>) 
})</code></pre>
<p>从而我们可以在业务代码中通过 <code>process.env.NODE_ENV</code>，如进行判断，使用开发接口还是线上接口。如果我们需要在 webpack 中判断当前环境，还需要单独的设置 <code>process.env.NODE_ENV = 'production'</code>，这也是我们在 <code>build.js</code> 中第一行做的事情。</p>
<h2 id="articleHeader14">添加 webpack 打出的 bundles 到 HTML 文件</h2>
<ul>
<li>我们使用 webpack 配置入口时只能配置 js 文件作为入口，webpack 打出的 bundles 并不能自动与我们项目的 HTML 文件发生关联。</li>
<li>需要我们手动添加<code>&lt;script src="./bundles.js"&gt;&lt;/script&gt;</code>（还可能包括后面提取出来的 css 文件）到 HTML 文件。</li>
<li>我们可以使用 <a href="https://www.npmjs.com/package/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a> 插件自动完成这个工作。</li>
<li>当仅使用 webpack 对 js 进行打包，而没有 HTML文件需求时，不需要这一步。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlWebpackPlugin = require('html-webpack-plugin')
plugins: [
  new HtmlWebpackPlugin({
    filename: path.join(__dirname, '../dist/index.html'),// 文件写入路径
    template: path.join(__dirname, '../src/index.html'),// 模板文件路径
    inject: true // js 等 bundles 插入 html 的位置 head/body等
  })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
plugins: [
  <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">filename</span>: path.join(__dirname, <span class="hljs-string">'../dist/index.html'</span>),<span class="hljs-comment">// 文件写入路径</span>
    template: path.join(__dirname, <span class="hljs-string">'../src/index.html'</span>),<span class="hljs-comment">// 模板文件路径</span>
    inject: <span class="hljs-literal">true</span> <span class="hljs-comment">// js 等 bundles 插入 html 的位置 head/body等</span>
  })
]</code></pre>
<p>如果不对 HtmlWebpackPlugin 进行配置，则其会创建一个 HTML 文件，其中 <code>filename</code> 在开发模式下还是比较重要的。</p>
<h2 id="articleHeader15">④ 提取 js 中的 css 部分到单独的文件</h2>
<p>使用过 webpack3 的同学应该对 <a href="https://www.npmjs.com/package/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a> 插件（以旧插件代称）比较熟悉，为了尝试webpack4，我并不想使用这个插件的 <code>@next</code> 版本，所以选择了新的替代插件 <a href="https://www.npmjs.com/package/mini-css-extract-plugin" rel="nofollow noreferrer" target="_blank">mini-css-extract-plugin</a>（以新插件代称）。  <br>与旧插件相同，同样需要在 webpack 的 loader 部分和 plugin 部分都进行配置，不同的是新插件提供了单独的 loader，在 loader 部分与旧插件的配置方式不太相同。配置如下：</p>
<ul>
<li>
<p>loader 部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MiniCssExtractPlugin = require(&quot;mini-css-extract-plugin&quot;)
// 
[
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      // (segmentfault 这儿的多行注释渲染有点问题 😰，改成单行注释形式)
      // 复写 css 文件中资源路径
      // webpack3.x 配置在 extract-text-webpack-plugin 插件中
      // 因为 css 文件中的外链是相对与 css 的，
      // 我们抽离的 css 文件在可能会单独放在 css 文件夹内
      // 引用其他如 img/a.png 会寻址错误
      // 这种情况下所以单独需要配置 publicPath，复写其中资源的路径
      //
      publicPath: '../' 
    }
  },
  {
    loader: 'css-loader',
    options: {}
  },
  {
    loader: 'less-loader',
    options: {}
  }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> MiniCssExtractPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mini-css-extract-plugin"</span>)
<span class="hljs-comment">// </span>
[
  {
    <span class="hljs-attr">loader</span>: MiniCssExtractPlugin.loader,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-comment">// (segmentfault 这儿的多行注释渲染有点问题 😰，改成单行注释形式)</span>
      <span class="hljs-comment">// 复写 css 文件中资源路径</span>
      <span class="hljs-comment">// webpack3.x 配置在 extract-text-webpack-plugin 插件中</span>
      <span class="hljs-comment">// 因为 css 文件中的外链是相对与 css 的，</span>
      <span class="hljs-comment">// 我们抽离的 css 文件在可能会单独放在 css 文件夹内</span>
      <span class="hljs-comment">// 引用其他如 img/a.png 会寻址错误</span>
      <span class="hljs-comment">// 这种情况下所以单独需要配置 publicPath，复写其中资源的路径</span>
      <span class="hljs-comment">//</span>
      publicPath: <span class="hljs-string">'../'</span> 
    }
  },
  {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
    <span class="hljs-attr">options</span>: {}
  },
  {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'less-loader'</span>,
    <span class="hljs-attr">options</span>: {}
  }
]</code></pre>
</li>
<li>
<p>plugin 部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new MiniCssExtractPlugin({
  // 输出到单独的 css 文件夹下
  filename: &quot;static/css/[name].[chunkhash].css&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> MiniCssExtractPlugin({
  <span class="hljs-comment">// 输出到单独的 css 文件夹下</span>
  filename: <span class="hljs-string">"static/css/[name].[chunkhash].css"</span>
})</code></pre>
</li>
</ul>
<p>可以看到这个 loader 也配置在了 css 预处理器部分，在前面我们已经把 css 预处理器的配置提取到了 utils.js 文件的函数内，所以这里也是，我们使用 <code>extract</code> 参数决定是否需要提取。</p>
<p>回忆一下，之前使用的 <code>style-loader</code> 或 <code>vue-style-loader</code> 的作用，它们会创建标签将 css 的内容直接插入到 HTML中。而提取成独立的 css 文件之后，插入到 HTML 的工作由 <code>html-webpack-plugin</code> 插件完成，两者职责的这部分职责是重复的，所以我们需要使用 <code>extract</code> 参数做类似如下处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (options.extract) {
  return [MiniCssExtractPlugin.loader, ...otherLoaders]
} else {
  return ['vue-style-loader', ...otherLoaders]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (options.extract) {
  <span class="hljs-keyword">return</span> [MiniCssExtractPlugin.loader, ...otherLoaders]
} <span class="hljs-keyword">else</span> {
  <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>, ...otherLoaders]
}</code></pre>
<h2 id="articleHeader16">④ 拆分 js 代码</h2>
<p>这是 webpack 配置中很重要的一个环节，影响到我们使用浏览器缓存的合理性，影响页面资源的加载速度，将 js 进行合理拆分，可以有效减小我们每次更新代码影响到的文件范围。  <br>使用过 webpack3 的同学一定清楚，我们一般会提取出这么几个文件 <code>manifest.js</code>（webpack 运行时，即webpack解析其他bundle的代码等）、<code>vendor.js</code>（node_modules内的库）、app.js（真正的项目业务代码）。在 webpack3 中我们使用 <code>webpack.optimize.CommonsChunkPlugin</code>插件进行提取，webpack4 中我们可以直接使用 <a href="https://webpack.js.org/plugins/split-chunks-plugin/" rel="nofollow noreferrer" target="_blank">optimization</a> 配置项进行配置（当然仍可使用插件配置）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 优化部分包括代码拆分
 * 且运行时（manifest）的代码拆分提取为了独立的 runtimeChunk 配置 
 */
optimization: {
  splitChunks: {
    chunks: &quot;all&quot;,
    cacheGroups: {
      // 提取 node_modules 中代码
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: &quot;vendors&quot;,
        chunks: &quot;all&quot;
      },
      commons: {
        // async 设置提取异步代码中的公用代码
        chunks: &quot;async&quot;
        name: 'commons-async',
        /**
         * minSize 默认为 30000
         * 想要使代码拆分真的按照我们的设置来
         * 需要减小 minSize
         */
        minSize: 0,
        // 至少为两个 chunks 的公用代码
        minChunks: 2
      }
    }
  },
  /**
   * 对应原来的 minchunks: Infinity
   * 提取 webpack 运行时代码
   * 直接置为 true 或设置 name
   */
  runtimeChunk: {
    name: 'manifest'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 优化部分包括代码拆分
 * 且运行时（manifest）的代码拆分提取为了独立的 runtimeChunk 配置 
 */</span>
optimization: {
  <span class="hljs-attr">splitChunks</span>: {
    <span class="hljs-attr">chunks</span>: <span class="hljs-string">"all"</span>,
    <span class="hljs-attr">cacheGroups</span>: {
      <span class="hljs-comment">// 提取 node_modules 中代码</span>
      vendors: {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/[\\/]node_modules[\\/]/</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">"vendors"</span>,
        <span class="hljs-attr">chunks</span>: <span class="hljs-string">"all"</span>
      },
      <span class="hljs-attr">commons</span>: {
        <span class="hljs-comment">// async 设置提取异步代码中的公用代码</span>
        chunks: <span class="hljs-string">"async"</span>
        name: <span class="hljs-string">'commons-async'</span>,
        <span class="hljs-comment">/**
         * minSize 默认为 30000
         * 想要使代码拆分真的按照我们的设置来
         * 需要减小 minSize
         */</span>
        minSize: <span class="hljs-number">0</span>,
        <span class="hljs-comment">// 至少为两个 chunks 的公用代码</span>
        minChunks: <span class="hljs-number">2</span>
      }
    }
  },
  <span class="hljs-comment">/**
   * 对应原来的 minchunks: Infinity
   * 提取 webpack 运行时代码
   * 直接置为 true 或设置 name
   */</span>
  runtimeChunk: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>
  }
}</code></pre>
<p>也可将不会变的开发依赖配置到单独的entry中，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  app: 'index.js',
  vendor2: ['vue', 'vue-router', 'axios']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry: {
  <span class="hljs-attr">app</span>: <span class="hljs-string">'index.js'</span>,
  <span class="hljs-attr">vendor2</span>: [<span class="hljs-string">'vue'</span>, <span class="hljs-string">'vue-router'</span>, <span class="hljs-string">'axios'</span>]
}</code></pre>
<h1 id="articleHeader17">开发模式 development</h1>
<p>开发模式与生产模式的不同是，在开发时会频繁运行代码，所以很多东西在开发模式是不推荐配置的，如css文件提取，代码压缩等。所以针对一些写入公共配置文件，但是开发模式不需要的功能，我们需要做类似修改：<code>process.env.NODE_ENV === 'production' ? true : false</code>，如 css 预处理中是否需要配置提取 loader <code>MiniCssExtractPlugin.loader</code>。此外还有一些是只配置在生产模式下的，如 <code>MiniCssExtractPlugin</code> 和 js 代码拆分优化。</p>
<p>开发模式我们需要一个<a href="https://webpack.js.org/configuration/dev-server/#devserver" rel="nofollow noreferrer" target="_blank">开发服务</a>，帮我们完成实时更新、接口代理等功能。我们使用 <code>webpack-dev-server</code>。需要 npm 安装。</p>
<h2 id="articleHeader18">添加 script 脚本命令</h2>
<p>同样，在 package.json 下添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
  &quot;dev&quot;: &quot;webpack-dev-server --config ./build/webpack.dev.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
  <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --config ./build/webpack.dev.js"</span>
}</code></pre>
<p>使用 <code>--config</code> 指定配置文件，由于命令直接调用 webpack-dev-server 运行，所以我们直接写配置就好，可以不像生产模式一样去编写调用逻辑。</p>
<h2 id="articleHeader19">开发模式配置文件</h2>
<p>新建 <code>webpack.dev.js</code> 文件，同样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在第一行设置当前环境为开发环境
process.env.NODE_ENV = 'development'
const merge = require('webpack-merge') // 专用合并webpack配置的包
const webpackBaseConfig = require('./webpack.base')
module.exports = merge(webpackBaseConfig, {
  // 开发模式配置
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在第一行设置当前环境为开发环境</span>
process.env.NODE_ENV = <span class="hljs-string">'development'</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>) <span class="hljs-comment">// 专用合并webpack配置的包</span>
<span class="hljs-keyword">const</span> webpackBaseConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base'</span>)
<span class="hljs-built_in">module</span>.exports = merge(webpackBaseConfig, {
  <span class="hljs-comment">// 开发模式配置</span>
})</code></pre>
<h2 id="articleHeader20">④ mode 预设</h2>
<p>同样，在开发模式下我们可以将 <code>mode</code> 配置为 <code>development</code>，同样<a href="https://webpack.js.org/concepts/mode/#usage" rel="nofollow noreferrer" target="_blank">默认启用</a>了一些功能：</p>
<ul>
<li>
<p>插件</p>
<ul>
<li>NamedChunksPlugin：使用 entry 名做 chunk 标识</li>
<li>NamedModulesPlugin：使用模块的相对路径非自增 id 做模块标识</li>
</ul>
</li>
<li>process.env.NODE_ENV 的值设为 development</li>
</ul>
<h2 id="articleHeader21">开发服务配置 devServer</h2>
<p><a href="https://webpack.js.org/configuration/dev-server/#devserver" rel="nofollow noreferrer" target="_blank">文档</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: {
  clientLogLevel: 'warning',
  inline: true,
  // 启动热更新
  hot: true,
  // 在页面上全屏输出报错信息
  overlay: {
    warnings: true,
    errors: true
  },
  // 显示 webpack 构建进度
  progress: true,
  // dev-server 服务路径
  contentBase: false,
  compress: true,
  host: 'localhost',
  port: '8080',
  // 自动打开浏览器
  open: true,
  // 可以进行接口代理配置
  proxy： xxx,
  // 跟 friendly-errors-webpack-plugin 插件配合
  quiet: true,
  publicPath: '/'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">devServer: {
  <span class="hljs-attr">clientLogLevel</span>: <span class="hljs-string">'warning'</span>,
  <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// 启动热更新</span>
  hot: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// 在页面上全屏输出报错信息</span>
  overlay: {
    <span class="hljs-attr">warnings</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-comment">// 显示 webpack 构建进度</span>
  progress: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// dev-server 服务路径</span>
  contentBase: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">compress</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">host</span>: <span class="hljs-string">'localhost'</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-string">'8080'</span>,
  <span class="hljs-comment">// 自动打开浏览器</span>
  open: <span class="hljs-literal">true</span>,
  <span class="hljs-comment">// 可以进行接口代理配置</span>
  proxy： xxx,
  <span class="hljs-comment">// 跟 friendly-errors-webpack-plugin 插件配合</span>
  quiet: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/'</span>
}</code></pre>
<h2 id="articleHeader22">其他插件</h2>
<p>devServer 使用热更新 hot 时需要使用插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new webpack.HotModuleReplacementPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
]</code></pre>
<p>优化 webpack 输出信息，需要配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
plugins: [
  new FriendlyErrorsPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)
plugins: [
  <span class="hljs-keyword">new</span> FriendlyErrorsPlugin()
]</code></pre>
<h2 id="articleHeader23">注意事项</h2>
<ul>
<li>
<p>热更新：在使用热更新时，我们的 chunk 名中不能使用 <code>[hash]</code> 做标识，文件名变化无法热更新，所以需要将原来配置在公共配置中的 output 中的文件名配置分别写入生产和开发模式配置中，开发模式去掉 <code>[hash]</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="filename: 'static/[name].js', 
chunkFilename: 'static/[id].js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">filename:</span> <span class="hljs-string">'static/[name].js'</span>, 
<span class="hljs-string">chunkFilename:</span> <span class="hljs-string">'static/[id].js'</span></code></pre>
</li>
<li>
<p>HtmlWebpackPlugin：在生产模式下，我们将 html 文件写入到 dist 下，但是在开发模式下，并没有实际的写入过程，且 <code>devServer</code> 启动后的服务内容与 <code>contentBase</code> 有关，两者需要一致，所以我们将 <code>HtmlWebpackPlugin</code> 的配置也分为 生产和开发模式，开发模式下使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new HtmlWebpackPlugin({
  filename: 'index.html', // 文件写入路径，前面的路径与 devServer 中 contentBase 对应
  template: path.resolve(__dirname, '../src/index.html'),// 模板文件路径
  inject: true
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
  <span class="hljs-attribute">filename</span>: <span class="hljs-string">'index.html'</span>, // 文件写入路径，前面的路径与 devServer 中 contentBase 对应
  template: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../src/index.html'</span>),// 模板文件路径
  inject: true
})</code></pre>
</li>
</ul>
<h1 id="articleHeader24">优化</h1>
<h2 id="articleHeader25">配置提取</h2>
<ul>
<li>开发模式和生产模式的一些功能启用，如 css 是否提取。</li>
<li>路径配置，如文件输出路径和文件名、output 中的 publicPath（代码 output 中只配置了 <a href="https://webpack.js.org/configuration/output/#output-path" rel="nofollow noreferrer" target="_blank">path</a>，没配置 <a href="https://webpack.js.org/configuration/output/#output-publicpath" rel="nofollow noreferrer" target="_blank">publicPath</a>，将这部分路径的 static 写到了各个资源的输出name中，可参考<a href="https://juejin.im/post/5ae9ae5e518825672f19b094?utm_source=gold_browser_extension" rel="nofollow noreferrer" target="_blank">Webpack中publicPath详解</a>）、服务配置如端口等。</li>
</ul>
<p>我们可以提取到独立的 config 文件中（本代码没做）。</p>
<h2 id="articleHeader26">拆分 js 代码</h2>
<p>在生产模式的 <code>拆分 js 代码</code> 部分我们已经讲了如何拆分，那么为了更好的分析我们的拆分是否合理，我们可以配置一个 bundle 组成分析的插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BundleAnalyzer = require('webpack-bundle-analyzer')
plugins: [
  new BundleAnalyzer.BundleAnalyzerPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> BundleAnalyzer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>)
plugins: [
  <span class="hljs-keyword">new</span> BundleAnalyzer.BundleAnalyzerPlugin()
]</code></pre>
<h2 id="articleHeader27">hash 固化</h2>
<p>我们使用文件名中的 hash 变化来进行资源文件的更新，那么合理利用缓存时，就要求我们合理的拆分文件，在内容更新时最小限度的影响文件名中的 hash。这里就用到了<code>[hash]</code>，<code>[chunkhash]</code>，<code>[contenthash]</code>。然而 webpack 对 hash 的默认处理并不尽如人意，这一部分的优化可以参考<a href="https://github.com/pigcan/blog/issues/9" rel="nofollow noreferrer" target="_blank">基于 webpack 的持久化缓存方案</a></p>
<h1 id="articleHeader28">多页面</h1>
<p>多页面配置代码位于 <a href="https://github.com/toBeTheLight/vue-webpack4-learning/tree/muilt-pages" rel="nofollow noreferrer" target="_blank">muilt-pages 分支</a>。我们只需做少量修改，以目前有 entry 页和 index 页为例。</p>
<h2 id="articleHeader29">entry 改动</h2>
<p>将两个页面的 js 入口都配置在 <code>webpack</code> 的 <code>entry</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
  /**
    * 入口，chunkname: 路径
    * 多入口可配置多个
    */
  main: './src/main.js',
  entry: './src/entry.js'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry: {
  <span class="hljs-comment">/**
    * 入口，chunkname: 路径
    * 多入口可配置多个
    */</span>
  main: <span class="hljs-string">'./src/main.js'</span>,
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/entry.js'</span>
}</code></pre>
<p>也可以自己设置项目结构，使用 node api 动态读取的方式获取目前的多页面入口。</p>
<h2 id="articleHeader30">HtmlWebpackPlugin 改动</h2>
<p>需按照页面个数配置多个 <code>HtmlWebpackPlugin</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new HtmlWebpackPlugin({
  filename: path.join(__dirname, '../dist/main.html'),// 文件写入路径
  template: path.join(__dirname, '../src/index.html'),// 模板文件路径
  inject: true, // 插入位置
  chunks: ['manifest', 'vendors', 'common', 'main']
}),
new HtmlWebpackPlugin({
  filename: path.join(__dirname, '../dist/entry.html'),// 文件写入路径
  template: path.join(__dirname, '../src/index.html'),// 模板文件路径
  inject: true, // 插入位置
  chunks: ['manifest', 'vendors', 'common', 'entry']
})," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> HtmlWebpackPlugin({
  <span class="hljs-attr">filename</span>: path.join(__dirname, <span class="hljs-string">'../dist/main.html'</span>),<span class="hljs-comment">// 文件写入路径</span>
  template: path.join(__dirname, <span class="hljs-string">'../src/index.html'</span>),<span class="hljs-comment">// 模板文件路径</span>
  inject: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 插入位置</span>
  chunks: [<span class="hljs-string">'manifest'</span>, <span class="hljs-string">'vendors'</span>, <span class="hljs-string">'common'</span>, <span class="hljs-string">'main'</span>]
}),
<span class="hljs-keyword">new</span> HtmlWebpackPlugin({
  <span class="hljs-attr">filename</span>: path.join(__dirname, <span class="hljs-string">'../dist/entry.html'</span>),<span class="hljs-comment">// 文件写入路径</span>
  template: path.join(__dirname, <span class="hljs-string">'../src/index.html'</span>),<span class="hljs-comment">// 模板文件路径</span>
  inject: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 插入位置</span>
  chunks: [<span class="hljs-string">'manifest'</span>, <span class="hljs-string">'vendors'</span>, <span class="hljs-string">'common'</span>, <span class="hljs-string">'entry'</span>]
}),</code></pre>
<p>其中需手动指定每个页面的插入的 chunks（同步的），否则会将其他页面的文件也一同插入当前页面。</p>
<h2 id="articleHeader31">④ 公共js提取</h2>
<p>在单页面下，一般不存在提取非异步 js 文件的公共代码（非 node_modules）的问题，在多页面下我们的页面间可能会公用 api、配置等文件，此时可以增加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'common': {
  // initial 设置提取同步代码中的公用代码
  chunks: 'initial',
  // test: 'xxxx', 也可使用 test 选择提取哪些 chunks 里的代码
  name: 'common',
  minSize: 0,
  minChunks: 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-string">'common'</span>: {
  <span class="hljs-comment">// initial 设置提取同步代码中的公用代码</span>
  chunks: <span class="hljs-string">'initial'</span>,
  <span class="hljs-comment">// test: 'xxxx', 也可使用 test 选择提取哪些 chunks 里的代码</span>
  name: <span class="hljs-string">'common'</span>,
  <span class="hljs-attr">minSize</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">minChunks</span>: <span class="hljs-number">2</span>
}</code></pre>
<p>提取同步代码中的公用代码</p>
<h1 id="articleHeader32">参考</h1>
<ol>
<li><a href="https://github.com/pigcan/blog/issues/9" rel="nofollow noreferrer" target="_blank">基于 webpack 的持久化缓存方案</a></li>
<li><a href="https://github.com/webpack/webpack/issues" rel="nofollow noreferrer" target="_blank">webpack issues</a></li>
<li><a href="https://github.com/vuejs-templates/webpack/issues" rel="nofollow noreferrer" target="_blank">vuejs-templates/webpack/issues</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 配置详解（含 4）——关注细节

## 原文链接
[https://segmentfault.com/a/1190000014685887](https://segmentfault.com/a/1190000014685887)


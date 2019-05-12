---
title: '记一次使用 vue-admin-template 的优化历程' 
date: 2018-11-30 2:30:12
hidden: true
slug: xeytlqifn5h
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://blog.leungjz.top/articles/2018/05/15/1536724524187.html" rel="nofollow noreferrer" target="_blank">本文原文</a></p>
<h2 id="articleHeader0">前言</h2>
<p>公司有好几个项目都有后台管理系统，为了方便开发，所以选择了 vue 中比较火的 <a href="http://panjiachen.github.io/vueAdmin-template" rel="nofollow noreferrer" target="_blank">后台模板</a> 作为基础模板进行开发。但是，开始用的时候，作者并没有对此进行优化，到项目上线的时候，才发现，打包出来的文件都十分之大，就一个 vendor 就有 770k 的体积（下图是基础模板，什么都没加打包后的文件信息）：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887828?w=1520&amp;h=550" src="https://static.alili.tech/img/remote/1460000014887828?w=1520&amp;h=550" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>通过 <code>webpack-bundle-analyzer</code> 进行分析可得，体积主要来源于 <a href="http://element.eleme.io/#/zh-CN" rel="nofollow noreferrer" target="_blank">饿了么UI</a>（体积为 500k），因为没对其进行部分引入拆分组件，导致 webpack 把整个组件库都打包进去了。其次就是 vue 本身，体积也达到了 80k 之大。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887829?w=2048&amp;h=1162" src="https://static.alili.tech/img/remote/1460000014887829?w=2048&amp;h=1162" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>所以，对其进行打包优化，是一件刻不容缓的事情。</p>
<h2 id="articleHeader1">优化</h2>
<p>优化主要目的有：</p>
<ol>
<li>加快资源加载速度，减少用户等待的时间和首页白屏时间，提高用户体验。</li>
<li>加快打包速度，不要将时间浪费在等待打包上。</li>
</ol>
<p>解决第一个问题，很多人都会想到资源文件放在 CDN 上就好了，没错，这次我们就是通过 CDN 来解决加载问题。</p>
<h3 id="articleHeader2">CDN - 提高加载速度</h3>
<p>像 vue， element ui 这些比较成熟的框架/组件库，一般都有免费、高速、公共的 cdn 供开发者使用，鉴于大部分用户均在国内，所以这次使用了 <a href="http://www.bootcdn.cn/" rel="nofollow noreferrer" target="_blank">bootcdn</a> 这个库。该库热门资源比较齐全，各个版本都有，而且国内访问速度很快，简直是开发者的福音。</p>
<p>在 <code>index.html</code> 中引入 vue 和 饿了么组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0&quot;>
    <title>vue-admin-template</title>
    <!-- 同时也要引入对应版本的 css -->
    <link href=&quot;https://cdn.bootcss.com/element-ui/2.3.2/theme-chalk/index.css&quot; rel=&quot;stylesheet&quot;>
  </head>
  <body>
    <div id=&quot;app&quot;></div>
    <!-- built files will be auto injected -->
    <!-- 先引入 Vue -->
    <script src=&quot;https://cdn.bootcss.com/vue/2.4.2/vue.min.js&quot;></script>
    <!-- 引入组件库 -->
    <script src=&quot;https://cdn.bootcss.com/element-ui/2.3.2/index.js&quot;></script>
    <script src=&quot;https://cdn.bootcss.com/element-ui/2.3.2/locale/zh-CN.min.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-admin-template<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 同时也要引入对应版本的 css --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/element-ui/2.3.2/theme-chalk/index.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
    <span class="hljs-comment">&lt;!-- 先引入 Vue --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/vue/2.4.2/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 引入组件库 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/element-ui/2.3.2/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/element-ui/2.3.2/locale/zh-CN.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>因为依赖是从外部引入的，所以需要告知 webpack 在打包时，依赖的来源。</p>
<p>修改 <code>webpack.base.conf.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  externals: {
    vue: 'Vue',
    'element-ui':'ELEMENT'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
  ...
  externals: {
    <span class="hljs-attr">vue</span>: <span class="hljs-string">'Vue'</span>,
    <span class="hljs-string">'element-ui'</span>:<span class="hljs-string">'ELEMENT'</span>
  }
}</code></pre>
<p>再一次打包，确实能极大的压缩了打包的体积，从 700k 骤减至 130k：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887830?w=2048&amp;h=1160" src="https://static.alili.tech/img/remote/1460000014887830?w=2048&amp;h=1160" alt="" title="" style="cursor: pointer;"></span></p>
<p>但是随之而来的就有问题了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014887831?w=458&amp;h=228" src="https://static.alili.tech/img/remote/1460000014887831?w=458&amp;h=228" alt="" title="" style="cursor: pointer;"></span></p>
<p>明明我在本地开发，但是由于引入了线上的生产版本的 vue 文件，因此 vue-dev-tools 就不能进行调试。</p>
<p>因此，我们需要再次调整一下 webpack 的配置，<code>webpack.base.conf.js</code>，而且 webpack 注入的 js 总是在最后面的，因此，我们需要 <a href="https://github.com/jharris4/html-webpack-include-assets-plugin" rel="nofollow noreferrer" target="_blank"><code>html-webpack-include-assets-plugin</code></a> 帮忙在注入 <code>app.js</code> 后，再注入相对应的组件库 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const externals = {
  // 因为打包时，还没注入，所以这里要去掉。
  // 'element-ui':'ELEMENT'
}
// 生产环境中使用生产环境的 vue
// 开发环境继续使用本地 node_modules 中的 vue
if (process.env.NODE_ENV === 'production') {
  externals['vue'] = 'Vue'
  // 如发现打包时依旧将 element-ui 打包进入 vendor，可以在打包时将其加入外部依赖。
  externals['element-ui'] = 'ELEMENT'
}
// 生产环境默认注入 vue 
// 开发环境中不注入
const defaultJS = process.env.NODE_ENV === 'production' ? [{ path: 'https://cdn.bootcss.com/vue/2.4.2/vue.min.js', type: 'js' }] : []
const plugins = [
  new HtmlWebpackIncludeAssetsPlugin({
      assets: defaultJS.concat([
        { path: 'https://cdn.bootcss.com/element-ui/2.3.2/index.js', type: 'js' },
        { path: 'https://cdn.bootcss.com/element-ui/2.3.2/locale/zh-CN.min.js', type: 'js' },
      ]),
      // 是否在 webpack 注入的 js 文件后新增？true 为 append, false 为 prepend。
      // 生产环境中，这些 js 应该先加载。
      append: process.env.NODE_ENV !== 'production',
      publicPath: '',
    })
]

module.exports = {
  ...
  externals,
  plugins,
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HtmlWebpackIncludeAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-include-assets-plugin'</span>)

<span class="hljs-keyword">const</span> externals = {
  <span class="hljs-comment">// 因为打包时，还没注入，所以这里要去掉。</span>
  <span class="hljs-comment">// 'element-ui':'ELEMENT'</span>
}
<span class="hljs-comment">// 生产环境中使用生产环境的 vue</span>
<span class="hljs-comment">// 开发环境继续使用本地 node_modules 中的 vue</span>
<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
  externals[<span class="hljs-string">'vue'</span>] = <span class="hljs-string">'Vue'</span>
  <span class="hljs-comment">// 如发现打包时依旧将 element-ui 打包进入 vendor，可以在打包时将其加入外部依赖。</span>
  externals[<span class="hljs-string">'element-ui'</span>] = <span class="hljs-string">'ELEMENT'</span>
}
<span class="hljs-comment">// 生产环境默认注入 vue </span>
<span class="hljs-comment">// 开发环境中不注入</span>
<span class="hljs-keyword">const</span> defaultJS = process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? [{ <span class="hljs-attr">path</span>: <span class="hljs-string">'https://cdn.bootcss.com/vue/2.4.2/vue.min.js'</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'js'</span> }] : []
<span class="hljs-keyword">const</span> plugins = [
  <span class="hljs-keyword">new</span> HtmlWebpackIncludeAssetsPlugin({
      <span class="hljs-attr">assets</span>: defaultJS.concat([
        { <span class="hljs-attr">path</span>: <span class="hljs-string">'https://cdn.bootcss.com/element-ui/2.3.2/index.js'</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'js'</span> },
        { <span class="hljs-attr">path</span>: <span class="hljs-string">'https://cdn.bootcss.com/element-ui/2.3.2/locale/zh-CN.min.js'</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">'js'</span> },
      ]),
      <span class="hljs-comment">// 是否在 webpack 注入的 js 文件后新增？true 为 append, false 为 prepend。</span>
      <span class="hljs-comment">// 生产环境中，这些 js 应该先加载。</span>
      append: process.env.NODE_ENV !== <span class="hljs-string">'production'</span>,
      <span class="hljs-attr">publicPath</span>: <span class="hljs-string">''</span>,
    })
]

<span class="hljs-built_in">module</span>.exports = {
  ...
  externals,
  plugins,
  ...
}</code></pre>
<p>OK，这时候，既能兼顾打包后的体积大小，也能在开发模式中使用 vue-dev-tool 进行调试。</p>
<h3 id="articleHeader3">DLL - 提高打包速度</h3>
<p>经常打包的前端会发现，很多时候，我们为了修复某些bug（如 promise 在 ie Safari 下的 bug），而新引入了一个 polyfill，然而，打包完后发现，vendor 的 hash 值变了，而整个 vendor 只新加了一个 <code>es6-promise</code> 的依赖，但是付出的代价就是，需要抛弃之前打包好的 vendor，用户重新访问时，需要再一次拉取一个全新的 vendor，这个代价就有点大了。</p>
<p>这时候，使用 <a href="https://cloud.tencent.com/developer/section/1477558" rel="nofollow noreferrer" target="_blank">dllPlugin</a> 打包就有优势了。它可以将一些基础依赖模块统一先打包起来，当正式打包时，则可以略过这些模块，不再重复打包进去 vendor，提高打包速度的同时也能减少 vendor 的体积。</p>
<p>如，后台管理系统基础模块基本有以下几个：</p>
<ul>
<li>axios： ajax 请求。</li>
<li>vuex： 全局状态管理。</li>
<li>js-cookie： 前端处理 cookie。</li>
<li>vue-router： 路由管理。</li>
</ul>
<p>这四个基础模块几乎是必须的，那么可以先提取出来。</p>
<h5>step 1 打包基础模块</h5>
<p>先在 <code>build</code> 文件夹下新建一个用于打包 dll 的配置文件 <code>webpack.dll.conf.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const webpack = require('webpack');
const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const vendor = [
    // 'vue/dist/vue.runtime.esm.js', // 由于 vue 在生产环境中使用的是 cdn 引入，所以也无需提前打包进 dll
    // 'raven-js', // 前端监控，若无此需求，可以忽略。
    'es6-promise', // 修复 promise 中某些 bug。
    'vue-router',
    'js-cookie',
    'axios',
    'vuex',
];

const webpackConfig = {
    context: __dirname,
    output: {
        path: path.join(__dirname, '../static/js/'),
        filename: '[name].dll.js',
        library: '[name]_[hash]',
    },
    entry: {
        vendor
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            path: path.join(__dirname, '.', '[name]-manifest.json'),
            name: '[name]_[hash]',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            sourceMap: true,
            // parallel: true
        })
    ],
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    }
};

module.exports = webpackConfig
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-keyword">const</span> vendor = [
    <span class="hljs-comment">// 'vue/dist/vue.runtime.esm.js', // 由于 vue 在生产环境中使用的是 cdn 引入，所以也无需提前打包进 dll</span>
    <span class="hljs-comment">// 'raven-js', // 前端监控，若无此需求，可以忽略。</span>
    <span class="hljs-string">'es6-promise'</span>, <span class="hljs-comment">// 修复 promise 中某些 bug。</span>
    <span class="hljs-string">'vue-router'</span>,
    <span class="hljs-string">'js-cookie'</span>,
    <span class="hljs-string">'axios'</span>,
    <span class="hljs-string">'vuex'</span>,
];

<span class="hljs-keyword">const</span> webpackConfig = {
    <span class="hljs-attr">context</span>: __dirname,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'../static/js/'</span>),
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].dll.js'</span>,
        <span class="hljs-attr">library</span>: <span class="hljs-string">'[name]_[hash]'</span>,
    },
    <span class="hljs-attr">entry</span>: {
        vendor
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.DllPlugin({
            <span class="hljs-attr">context</span>: __dirname,
            <span class="hljs-attr">path</span>: path.join(__dirname, <span class="hljs-string">'.'</span>, <span class="hljs-string">'[name]-manifest.json'</span>),
            <span class="hljs-attr">name</span>: <span class="hljs-string">'[name]_[hash]'</span>,
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            <span class="hljs-attr">compress</span>: {
              <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
            },
            <span class="hljs-attr">sourceMap</span>: <span class="hljs-literal">true</span>,
            <span class="hljs-comment">// parallel: true</span>
        })
    ],
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">rules</span>: [{
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
                <span class="hljs-attr">options</span>: vueLoaderConfig
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
                <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>), resolve(<span class="hljs-string">'node_modules/webpack-dev-server/client'</span>)]
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
                <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
                    <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
                }
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
                <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
                    <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'media/[name].[hash:7].[ext]'</span>)
                }
            },
            {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(woff2?|eot|ttf|otf)(\?.*)?$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
                <span class="hljs-attr">options</span>: {
                    <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
                    <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>)
                }
            }
        ]
    }
};

<span class="hljs-built_in">module</span>.exports = webpackConfig
</code></pre>
<p>然后在 <code>package.json</code> 中加入一条命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;scripts&quot;: {
        ...
        &quot;build:dll&quot;: &quot;webpack --config build/webpack.dll.conf.js&quot;,
        ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">"scripts"</span>: {
        ...
        <span class="hljs-attr">"build:dll"</span>: <span class="hljs-string">"webpack --config build/webpack.dll.conf.js"</span>,
        ...
    }
}</code></pre>
<p>执行 <code>yarn build:dll</code> 或者 <code>npm run build:dll</code> 即可完成打包 dll。执行完成后：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn build:dll
yarn run v1.5.1
$ webpack --config build/webpack.dll.conf.js
Hash: f6894dff019b2e0734af
Version: webpack 3.10.0
Time: 1295ms
         Asset     Size  Chunks             Chunk Names
vendor.dll.js  62.6 kB       0  [emitted]  vendor
   [8] dll vendor 12 bytes {0} [built]
    + 32 hidden modules
✨  Done in 1.89s." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">yarn build:dll
yarn run v1.5.1
$ webpack --config build/webpack.dll.conf.js
Hash: f6894dff019b2e0734af
Version: webpack 3.10.0
Time: 1295ms
         Asset     Size  Chunks             Chunk Names
vendor.dll.js  62.6 kB       0  [emitted]  vendor
   [8] dll vendor 12 bytes {0} [built]
    + 32 hidden modules
✨  Done <span class="hljs-keyword">in</span> 1.89s.</code></pre>
<p>同时，可以在 <code>build</code> 目录下，找到各个模块对应关系文件 <code>vendors-manifest.json</code> 和 <code>static/js</code> 下的 <code>vendor.dll.js</code>。</p>
<h5>step 2 页面中引入 vendor</h5>
<p>打包后的 dll 文件需要手动在 <code>index.html</code> 引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;></div>
<!-- built files will be auto injected -->
<script src=&quot;static/js/vendors.dll.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"static/js/vendors.dll.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h5>step 3 告诉 webpack 使用 dllPlugin 进行打包</h5>
<p>修改 <code>build/webpack.prod.conf.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    plugins: [
        ...
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./vendor-manifest.json')
        }),
        ...
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">plugins</span>: [
        ...
        new webpack.DllReferencePlugin({
            <span class="hljs-attr">context</span>: __dirname,
            <span class="hljs-attr">manifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vendor-manifest.json'</span>)
        }),
        ...
    ]
}</code></pre>
<p>再次打包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ yarn build:report
yarn run v1.5.1
$ npm_config_report=true node build/build.js
Hash: b4ff51852866ed865cfd
Version: webpack 3.10.0
Time: 6532ms
                                              Asset       Size  Chunks             Chunk Names
         static/js/manifest.42b9584a653aec2b9c5e.js     1.5 kB       5  [emitted]  manifest
                         static/img/404.a57b6f3.png    98.1 kB          [emitted]
                static/js/1.9e4133a25808e2101dd3.js       1 kB       1  [emitted]
                static/js/2.2a8a8e01c51473fab882.js    4.34 kB       2  [emitted]
           static/js/vendor.c7b076ef3341d4711402.js    39.4 kB       3  [emitted]  vendor
              static/js/app.6d52c7a5bf1bacb5cc85.js    21.4 kB       4  [emitted]  app
                static/js/0.cbc645864aab28ae8055.js    15.3 kB       0  [emitted]
static/css/app.1b30f8eba210e245a5f96d7bf0d6fb6c.css     7.6 kB       4  [emitted]  app
                                        favicon.ico    67.6 kB          [emitted]
                                         index.html  986 bytes          [emitted]
                            static/js/vendor.dll.js    62.6 kB          [emitted]

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won't work." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ yarn build:report
yarn run v1.5.1
$ npm_config_report=<span class="hljs-literal">true</span> node build/build.js
Hash: b4ff51852866ed865cfd
Version: webpack 3.10.0
Time: 6532ms
                                              Asset       Size  Chunks             Chunk Names
         static/js/manifest.42b9584a653aec2b9c5e.js     1.5 kB       5  [emitted]  manifest
                         static/img/404.a57b6f3.png    98.1 kB          [emitted]
                static/js/1.9e4133a25808e2101dd3.js       1 kB       1  [emitted]
                static/js/2.2a8a8e01c51473fab882.js    4.34 kB       2  [emitted]
           static/js/vendor.c7b076ef3341d4711402.js    39.4 kB       3  [emitted]  vendor
              static/js/app.6d52c7a5bf1bacb5cc85.js    21.4 kB       4  [emitted]  app
                static/js/0.cbc645864aab28ae8055.js    15.3 kB       0  [emitted]
static/css/app.1b30f8eba210e245a5f96d7bf0d6fb6c.css     7.6 kB       4  [emitted]  app
                                        favicon.ico    67.6 kB          [emitted]
                                         index.html  986 bytes          [emitted]
                            static/js/vendor.dll.js    62.6 kB          [emitted]

  Build complete.

  Tip: built files are meant to be served over an HTTP server.
  Opening index.html over file:// won<span class="hljs-string">'t work.</span></code></pre>
<p>发现 vendor 现在只有 40k 的体积，减少了一半的体积，而且打包速度也快了 2s，而相对于最开始的基础模板，打包速度快了 12s，这是很让人欣慰。</p>
<h2 id="articleHeader4">后记</h2>
<p>使用了 cdn 和 dll 打包后，无论是打包速度还是页面加载的速度都有很大的提升。因此将此次优化记录下来，并传上了 <a href="https://github.com/JZLeung/vueAdmin-template/tree/cdn" rel="nofollow noreferrer" target="_blank">GitHub</a> 中。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
记一次使用 vue-admin-template 的优化历程

## 原文链接
[https://segmentfault.com/a/1190000014887823](https://segmentfault.com/a/1190000014887823)


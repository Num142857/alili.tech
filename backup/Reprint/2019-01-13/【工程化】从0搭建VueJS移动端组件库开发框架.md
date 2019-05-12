---
title: '【工程化】从0搭建VueJS移动端组件库开发框架' 
date: 2019-01-13 2:30:11
hidden: true
slug: 23ecsdyryk7j
categories: [reprint]
---

{{< raw >}}

                    
<p>之前发表过一篇<a href="https://segmentfault.com/a/1190000009295452">《Vue-Donut——专用于构建Vue的UI组件库的开发框架》</a>，仅仅是对框架一个粗略的介绍，并没有针对里面的实现方式进行详细说明。</p>
<p>最近参与维护公司内部的一个针对移动端的UI组件库，该组件库缺乏文档和严格的文件组织结构。<code>Vue-Donut</code>的功能比较简单，并不能方便地创建针对移动端UI组件库的文档和预览。在参考了<code>mint-ui</code>等业界内成熟的方案之后，我在<code>Vue-Donut</code>的基础上进行了拓展，最后搭建出了一个非常方便且自动化的开发框架。</p>
<p>由于觉得开发的过程非常有意思，也想记录一下自己的开发思路，因此决定好好地写一篇文章作为记录分享。</p>
<p>项目地址：<a href="https://github.com/jrainlau/vue-donut/tree/mobile" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/v...</a></p>
<h1 id="articleHeader0">1. 功能分析</h1>
<p>首先我们来规划一下这个框架的最终目的是什么：</p>
<p><span class="img-wrap"><img data-src="/img/bVOEqW?w=1544&amp;h=1056" src="https://static.alili.tech/img/bVOEqW?w=1544&amp;h=1056" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如图所示，通过该框架可以生成一个文档页面。这个页面分为三个部分：导航、文档、预览。</p>
<ol>
<li><p>导航：通过导航切换不同组件的文档和预览。</p></li>
<li><p>文档：该类型组件所对应的文档，以markdown形式书写。</p></li>
<li><p>预览：该类型组件所对应的预览页面。</p></li>
</ol>
<p>为了让组件的开发和文档的维护更加高效，我们希望这个框架可以更加自动化。如果我们只要开不同组件的预览的页面及其对应的说明文档<code>README</code>，框架就能自动帮我们生成对应的导航和HTML内容，岂不妙哉？除此之外，当我们已经把所有的UI组件都开发好了，统统放在<code>/components</code>目录下，如果能够通过框架进行一键构建打包，最后产出一个npm包，那么别人使用这套UI组件库也会变得非常简单。带着这个想法，我们来分析一下我们可能需要用到的关键技术。</p>
<h1 id="articleHeader1">2. 技术分析</h1>
<ul>
<li><p>使用webpack2作为框架核心：使用方便，高度可定制。同时webpack2文档已经相当齐全，生态圈繁荣，社区活跃，遇到的坑基本上都可以在google和stackoverflow找到。</p></li>
<li><p>预览页面以<code>iframe</code>的形式插入到文档页面中：维护组件库的时候只需要聚焦于组件的开发和预览页面的组织，无需分心维护导航和文档，实现了解耦。因此意味着这是一个基于Vue.js的<strong>多页应用</strong>。</p></li>
<li><p>自动生成导航：使用<code>vue-router</code>进行页面切换。每当新建一个预览页面，就会自动在页面上生成对应的导航，并自动维护导航和路由的关系。因此，我们需要一套机制去监听文件结构的变化。</p></li>
<li><p>自动生成文档：一个预览页面对应一份文档，所以文档理应以<code>README.md</code>的形式存放在对应的预览页面文件夹内。我们需要一个能够把<code>README.md</code>直接转化成html内容的办法。</p></li>
<li><p>开发者模式：通过一条命令，启动一个<code>webpack-dev-server</code>，提供热更新和自动刷新功能。</p></li>
<li><p>构建打包模式：通过一条命令，自动把<code>/components</code>目录下的所有资源打包成一个npm包。</p></li>
<li><p>页面构建模式：通过一条命令，生成能够直接部署使用的静态资源文件。</p></li>
</ul>
<p>通过对技术的梳理，我们脑海里面已经有了一个印象，接下来就是一步一步地进行开发了。</p>
<h1 id="articleHeader2">3. 梳理框架目录结构</h1>
<p>一个好的目录结构，能够极大地方便我们接下来的工作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── index.html  // 文档页的入口html
├── view.html  // 预览页的入口html
├── package.json  // 依赖声明、npm script命令
├── src
│&nbsp;&nbsp; ├── document  // 文档页目录
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc-app.vue  // 文档页入口.vue文件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc-entry.js  // 文档页入口.js文件
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc-router.js  // 文档页路由配置
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc_comps  // 文档页组件
│&nbsp;&nbsp; │&nbsp;&nbsp; └── static  // 文档页静态资源
│&nbsp;&nbsp; └── view  // 预览页目录
│&nbsp;&nbsp;     ├── assets  // 预览页静态资源
│&nbsp;&nbsp;     ├── components // UI组件库
│&nbsp;&nbsp;     ├── pages // 存放不同的预览页
│&nbsp;&nbsp;     ├── view-app.vue // 预览页入口.vue文件
│&nbsp;&nbsp;     ├── view-entry.js  // 预览页入口.js文件
│&nbsp;&nbsp;     └── view-router.js  // 预览页路由配置
└── webpack
    ├── webpack.base.config.js // webpack通用配置 
    ├── webpack.build.config.js  // UI库构建打包配置
    ├── webpack.dev.config.js  // 开发模式配置
    └── webpack.doc.config.js  // 静态资源构建配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── index<span class="hljs-selector-class">.html</span>  <span class="hljs-comment">// 文档页的入口html</span>
├── view<span class="hljs-selector-class">.html</span>  <span class="hljs-comment">// 预览页的入口html</span>
├── package<span class="hljs-selector-class">.json</span>  <span class="hljs-comment">// 依赖声明、npm script命令</span>
├── src
│&nbsp;&nbsp; ├── document  <span class="hljs-comment">// 文档页目录</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc-app<span class="hljs-selector-class">.vue</span>  <span class="hljs-comment">// 文档页入口.vue文件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc-entry<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// 文档页入口.js文件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc-router<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// 文档页路由配置</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── doc_comps  <span class="hljs-comment">// 文档页组件</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── static  <span class="hljs-comment">// 文档页静态资源</span>
│&nbsp;&nbsp; └── view  <span class="hljs-comment">// 预览页目录</span>
│&nbsp;&nbsp;     ├── assets  <span class="hljs-comment">// 预览页静态资源</span>
│&nbsp;&nbsp;     ├── components <span class="hljs-comment">// UI组件库</span>
│&nbsp;&nbsp;     ├── pages <span class="hljs-comment">// 存放不同的预览页</span>
│&nbsp;&nbsp;     ├── view-app<span class="hljs-selector-class">.vue</span> <span class="hljs-comment">// 预览页入口.vue文件</span>
│&nbsp;&nbsp;     ├── view-entry<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// 预览页入口.js文件</span>
│&nbsp;&nbsp;     └── view-router<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// 预览页路由配置</span>
└── webpack
    ├── webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span> <span class="hljs-comment">// webpack通用配置 </span>
    ├── webpack<span class="hljs-selector-class">.build</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// UI库构建打包配置</span>
    ├── webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// 开发模式配置</span>
    └── webpack<span class="hljs-selector-class">.doc</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>  <span class="hljs-comment">// 静态资源构建配置</span></code></pre>
<p>可以看到，目录结构并不复杂，接下来我们首先对webpack进行配置，以便我们能够把项目跑起来。</p>
<h1 id="articleHeader3">4. webapck配置</h1>
<h3 id="articleHeader4">4.1 基础配置</h3>
<p>进入到<code>/webpack</code>目录，新建一个<code>webpack.base.config.js</code>文件，其内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { join } = require('path')
const hljs = require('highlight.js')

// 配置markdown解析、以便高亮显示markdown中的代码块
const markdown = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang &amp;&amp; hljs.getLanguage(lang)) {
      try {
        return '<pre class=&quot;hljs&quot;><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class=&quot;hljs&quot;><code>' + markdown.utils.escapeHtml(str) + '</code></pre>';
  }
})

const resolve = dir => join(__dirname, '..', dir)

module.exports = {
  // 只配置输出路径
  output: {
    filename: 'js/[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },

  // 配置不同的loader以便资源加载
  // eslint是标配，建议加上
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      // vue-markdown-loader能够把.md文件直接转化成vue组件
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: markdown
      }
    ]
  },
  resolve: {
    // 该项配置能够在加载资源的时候省略后缀名
    extensions: ['.js', '.vue', '.json', '.css', '.less'],
    modules: [resolve('src'), 'node_modules'],
    // 配置路径别名
    alias: {
      '~src': resolve('src'),
      '~components': resolve('src/view/components'),
      '~pages': resolve('src/view/pages'),
      '~assets': resolve('src/view/assets'),
      '~store': resolve('src/store'),
      '~static': resolve('src/document/static'),
      '~docComps': resolve('src/document/doc_comps')
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> { join } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> hljs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'highlight.js'</span>)

<span class="hljs-comment">// 配置markdown解析、以便高亮显示markdown中的代码块</span>
<span class="hljs-keyword">const</span> markdown = <span class="hljs-built_in">require</span>(<span class="hljs-string">'markdown-it'</span>)({
  <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">str, lang</span>) </span>{
    <span class="hljs-keyword">if</span> (lang &amp;&amp; hljs.getLanguage(lang)) {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;pre class="hljs"&gt;&lt;code&gt;'</span> +
               hljs.highlight(lang, str, <span class="hljs-literal">true</span>).value +
               <span class="hljs-string">'&lt;/code&gt;&lt;/pre&gt;'</span>;
      } <span class="hljs-keyword">catch</span> (__) {}
    }

    <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;pre class="hljs"&gt;&lt;code&gt;'</span> + markdown.utils.escapeHtml(str) + <span class="hljs-string">'&lt;/code&gt;&lt;/pre&gt;'</span>;
  }
})

<span class="hljs-keyword">const</span> resolve = <span class="hljs-function"><span class="hljs-params">dir</span> =&gt;</span> join(__dirname, <span class="hljs-string">'..'</span>, dir)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 只配置输出路径</span>
  output: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'js/[name].js'</span>,
    <span class="hljs-attr">path</span>: resolve(<span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/'</span>
  },

  <span class="hljs-comment">// 配置不同的loader以便资源加载</span>
  <span class="hljs-comment">// eslint是标配，建议加上</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-attr">use</span>: [
          <span class="hljs-string">'babel-loader'</span>,
          <span class="hljs-string">'eslint-loader'</span>
        ]
      },
      {
        <span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif|svg)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'style-loader'</span>
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>
        }]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
        <span class="hljs-attr">use</span>: [{
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'style-loader'</span> <span class="hljs-comment">// creates style nodes from JS strings</span>
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span> <span class="hljs-comment">// translates CSS into CommonJS</span>
        }, {
          <span class="hljs-attr">loader</span>: <span class="hljs-string">'less-loader'</span> <span class="hljs-comment">// compiles Less to CSS</span>
        }]
      },
      <span class="hljs-comment">// vue-markdown-loader能够把.md文件直接转化成vue组件</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.md$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-markdown-loader'</span>,
        <span class="hljs-attr">options</span>: markdown
      }
    ]
  },
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-comment">// 该项配置能够在加载资源的时候省略后缀名</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.css'</span>, <span class="hljs-string">'.less'</span>],
    <span class="hljs-attr">modules</span>: [resolve(<span class="hljs-string">'src'</span>), <span class="hljs-string">'node_modules'</span>],
    <span class="hljs-comment">// 配置路径别名</span>
    alias: {
      <span class="hljs-string">'~src'</span>: resolve(<span class="hljs-string">'src'</span>),
      <span class="hljs-string">'~components'</span>: resolve(<span class="hljs-string">'src/view/components'</span>),
      <span class="hljs-string">'~pages'</span>: resolve(<span class="hljs-string">'src/view/pages'</span>),
      <span class="hljs-string">'~assets'</span>: resolve(<span class="hljs-string">'src/view/assets'</span>),
      <span class="hljs-string">'~store'</span>: resolve(<span class="hljs-string">'src/store'</span>),
      <span class="hljs-string">'~static'</span>: resolve(<span class="hljs-string">'src/document/static'</span>),
      <span class="hljs-string">'~docComps'</span>: resolve(<span class="hljs-string">'src/document/doc_comps'</span>)
    }
  }
}
</code></pre>
<h3 id="articleHeader5">4.2 开发模式配置</h3>
<p>基础配置好了，我们就可以开始开发模式的配置了。在当前目录下，新建一个<code>webpack.dev.config.js</code>文件，并写入如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { join } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const basicConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = dir => join(__dirname, '..', dir)

module.exports = merge(basicConfig, {
  // 由于是多页应用，所以应该有2个入口文件
  entry: {
    app: './src/document/doc-entry.js',
    view: './src/view/view-entry.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  devtool: 'inline-source-map',

  // webpack-dev-server配置
  devServer: {
    contentBase: resolve('/'),
    compress: true,
    hot: true,
    inline: true,
    publicPath: '/',
    stats: 'minimal'
  },
  plugins: [
    // 热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    
    // 把生成的js注入到入口html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      filename: 'view.html',
      template: 'view.html',
      inject: true,
      chunks: ['view']
    })
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> { join } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> basicConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)

<span class="hljs-keyword">const</span> resolve = <span class="hljs-function"><span class="hljs-params">dir</span> =&gt;</span> join(__dirname, <span class="hljs-string">'..'</span>, dir)

<span class="hljs-built_in">module</span>.exports = merge(basicConfig, {
  <span class="hljs-comment">// 由于是多页应用，所以应该有2个入口文件</span>
  entry: {
    app: <span class="hljs-string">'./src/document/doc-entry.js'</span>,
    view: <span class="hljs-string">'./src/view/view-entry.js'</span>
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue-loader'</span>
      }
    ]
  },
  devtool: <span class="hljs-string">'inline-source-map'</span>,

  <span class="hljs-comment">// webpack-dev-server配置</span>
  devServer: {
    contentBase: resolve(<span class="hljs-string">'/'</span>),
    compress: <span class="hljs-literal">true</span>,
    hot: <span class="hljs-literal">true</span>,
    inline: <span class="hljs-literal">true</span>,
    publicPath: <span class="hljs-string">'/'</span>,
    stats: <span class="hljs-string">'minimal'</span>
  },
  plugins: [
    <span class="hljs-comment">// 热更新插件</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(),
    
    <span class="hljs-comment">// 把生成的js注入到入口html文件</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: <span class="hljs-string">'index.html'</span>,
      template: <span class="hljs-string">'index.html'</span>,
      inject: <span class="hljs-literal">true</span>,
      chunks: [<span class="hljs-string">'app'</span>]
    }),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: <span class="hljs-string">'view.html'</span>,
      template: <span class="hljs-string">'view.html'</span>,
      inject: <span class="hljs-literal">true</span>,
      chunks: [<span class="hljs-string">'view'</span>]
    })
  ]
})
</code></pre>
<p>非常简单的配置，值得注意的是因为多页应用的缘故，入口文件和<code>HtmlWebpackPlugin</code>都要写多份。</p>
<h3 id="articleHeader6">4.3 构件打包配置</h3>
<p>接下来，还有把UI组件库构建打包成npm包的配置。新建一个名为<code>webpack.build.config.js</code>的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { join } = require('path')
const merge = require('webpack-merge')
const basicConfig = require('./webpack.base.config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = dir => join(__dirname, '..', dir)

module.exports = merge(basicConfig, {
  // 入口文件
  entry: {
    app: './src/view/components/index.js'
  },
  devtool: 'source-map',
  // 输出位置为dist目录，名字自定义，输出格式为umd格式
  output: {
    path: resolve('dist'),
    filename: 'index.js',
    library: 'my-project',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 每一次打包都把上一次的清空
    new CleanWebpackPlugin(['dist'], {
      root: resolve('./')
    }),
    // 把静态资源复制出去，以便实现UI换肤等功能
    new CopyWebpackPlugin([
      { from: 'src/view/assets', to: 'assets' }
    ])
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> { join } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> basicConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config'</span>)
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)

<span class="hljs-keyword">const</span> resolve = <span class="hljs-function"><span class="hljs-params">dir</span> =&gt;</span> join(__dirname, <span class="hljs-string">'..'</span>, dir)

<span class="hljs-built_in">module</span>.exports = merge(basicConfig, {
  <span class="hljs-comment">// 入口文件</span>
  entry: {
    app: <span class="hljs-string">'./src/view/components/index.js'</span>
  },
  devtool: <span class="hljs-string">'source-map'</span>,
  <span class="hljs-comment">// 输出位置为dist目录，名字自定义，输出格式为umd格式</span>
  output: {
    path: resolve(<span class="hljs-string">'dist'</span>),
    filename: <span class="hljs-string">'index.js'</span>,
    library: <span class="hljs-string">'my-project'</span>,
    libraryTarget: <span class="hljs-string">'umd'</span>
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue-loader'</span>
      }
    ]
  },
  plugins: [
    <span class="hljs-comment">// 每一次打包都把上一次的清空</span>
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'dist'</span>], {
      root: resolve(<span class="hljs-string">'./'</span>)
    }),
    <span class="hljs-comment">// 把静态资源复制出去，以便实现UI换肤等功能</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      { <span class="hljs-keyword">from</span>: <span class="hljs-string">'src/view/assets'</span>, to: <span class="hljs-string">'assets'</span> }
    ])
  ]
})
</code></pre>
<h3 id="articleHeader7">4.4 一键生成文档配置</h3>
<p>最后，我们一起来配置一键生成文档网站的<code>webpack.doc.config.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { join } = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const basicConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const resolve = dir => join(__dirname, '..', dir)

module.exports = merge(basicConfig, {
  // 类似开发者模式，两个入口文件，多了一个公共依赖包vendor
  // 以`js/`开头能够自动输出到`js`目录下
  entry: {
    'js/app': './src/document/doc-entry.js',
    'js/view': './src/view/view-entry.js',
    'js/vendor': [
      'vue',
      'vue-router'
    ]
  },
  devtool: 'source-map',

  // 输出文件加hash
  output: {
    path: resolve('docs'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: ['css-loader']
            }),
            less: ExtractTextPlugin.extract({
              use: ['css-loader', 'less-loader']
            })
          }
        }
      }
    ]
  },
  plugins: [
    // 提取css文件并指定其输出位置和命名
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:8].css',
      allChunks: true
    }),
    
    // 抽离公共依赖
    new webpack.optimize.CommonsChunkPlugin({
      names: ['js/vendor', 'js/manifest']
    }),
    
    // 把构建出的静态资源注入到多个入口html中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['js/vendor', 'js/manifest', 'js/app'],
      chunksSortMode: 'dependency'
    }),
    new HtmlWebpackPlugin({
      filename: 'view.html',
      template: 'view.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: ['js/vendor', 'js/manifest', 'js/view'],
      chunksSortMode: 'dependency'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CleanWebpackPlugin(['docs'], {
      root: resolve('./')
    })
  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> { join } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> basicConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>)

<span class="hljs-keyword">const</span> resolve = <span class="hljs-function"><span class="hljs-params">dir</span> =&gt;</span> join(__dirname, <span class="hljs-string">'..'</span>, dir)

<span class="hljs-built_in">module</span>.exports = merge(basicConfig, {
  <span class="hljs-comment">// 类似开发者模式，两个入口文件，多了一个公共依赖包vendor</span>
  <span class="hljs-comment">// 以`js/`开头能够自动输出到`js`目录下</span>
  entry: {
    <span class="hljs-string">'js/app'</span>: <span class="hljs-string">'./src/document/doc-entry.js'</span>,
    <span class="hljs-string">'js/view'</span>: <span class="hljs-string">'./src/view/view-entry.js'</span>,
    <span class="hljs-string">'js/vendor'</span>: [
      <span class="hljs-string">'vue'</span>,
      <span class="hljs-string">'vue-router'</span>
    ]
  },
  devtool: <span class="hljs-string">'source-map'</span>,

  <span class="hljs-comment">// 输出文件加hash</span>
  output: {
    path: resolve(<span class="hljs-string">'docs'</span>),
    filename: <span class="hljs-string">'[name].[chunkhash:8].js'</span>,
    chunkFilename: <span class="hljs-string">'js/[name].[chunkhash:8].js'</span>
  },
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue-loader'</span>,
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: [<span class="hljs-string">'css-loader'</span>]
            }),
            less: ExtractTextPlugin.extract({
              use: [<span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'less-loader'</span>]
            })
          }
        }
      }
    ]
  },
  plugins: [
    <span class="hljs-comment">// 提取css文件并指定其输出位置和命名</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      filename: <span class="hljs-string">'css/[name].[contenthash:8].css'</span>,
      allChunks: <span class="hljs-literal">true</span>
    }),
    
    <span class="hljs-comment">// 抽离公共依赖</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      names: [<span class="hljs-string">'js/vendor'</span>, <span class="hljs-string">'js/manifest'</span>]
    }),
    
    <span class="hljs-comment">// 把构建出的静态资源注入到多个入口html中</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: <span class="hljs-string">'index.html'</span>,
      template: <span class="hljs-string">'index.html'</span>,
      inject: <span class="hljs-literal">true</span>,
      minify: {
        removeComments: <span class="hljs-literal">true</span>,
        collapseWhitespace: <span class="hljs-literal">true</span>,
        removeAttributeQuotes: <span class="hljs-literal">true</span>
      },
      chunks: [<span class="hljs-string">'js/vendor'</span>, <span class="hljs-string">'js/manifest'</span>, <span class="hljs-string">'js/app'</span>],
      chunksSortMode: <span class="hljs-string">'dependency'</span>
    }),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      filename: <span class="hljs-string">'view.html'</span>,
      template: <span class="hljs-string">'view.html'</span>,
      inject: <span class="hljs-literal">true</span>,
      minify: {
        removeComments: <span class="hljs-literal">true</span>,
        collapseWhitespace: <span class="hljs-literal">true</span>,
        removeAttributeQuotes: <span class="hljs-literal">true</span>
      },
      chunks: [<span class="hljs-string">'js/vendor'</span>, <span class="hljs-string">'js/manifest'</span>, <span class="hljs-string">'js/view'</span>],
      chunksSortMode: <span class="hljs-string">'dependency'</span>
    }),
    <span class="hljs-keyword">new</span> webpack.LoaderOptionsPlugin({
      minimize: <span class="hljs-literal">true</span>,
      debug: <span class="hljs-literal">false</span>
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.OccurrenceOrderPlugin(),
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'docs'</span>], {
      root: resolve(<span class="hljs-string">'./'</span>)
    })
  ]
})
</code></pre>
<p>通过上面这个配置，最终会产出一个<code>index.html</code>和一个<code>view.html</code>，以及各自所需的css和js文件。直接部署到静态服务器上即可进行访问。</p>
<p>多说一句，webpack的配置乍一看上去好像很复杂，但实际上是相当简单，webpack2的官方文档也挺完善且易读，推荐对webpack2不熟悉的朋友花点时间认真阅读一下文档。</p>
<p>至此，我们已经把<code>/webpack</code>目录下的相关配置都弄好了，框架的基础骨架已经搭建完毕，接下来开始对业务逻辑进行开发。</p>
<h1 id="articleHeader8">5. 业务逻辑开发</h1>
<p>在根目录下新建两个入口文件<code>index.html</code>和<code>view.html</code>，分别添加一个<code>&lt;div id="app"&gt;&lt;/div&gt;</code>和<code>&lt;div id="view"&gt;&lt;/div&gt;</code>标签。</p>
<p>进入<code>/src</code>目录，新建<code>/document</code>和<code>/view</code>目录，按照前文目录结构所示新建需要的目录和文件。</p>
<p>具体的内容可以看<a href="https://github.com/jrainlau/vue-donut/tree/mobile/template/src" rel="nofollow noreferrer" target="_blank">这里</a>，简单来说就是初始化<code>vue</code>应用，请暂时忽略<code>router.js</code>当中的这一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routeList.forEach((route) => {
  routes.splice(1, 0, {
    path: `/${route}`,
    component: resolve => require([`~pages/${route}/index`], resolve)
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>routeList.forEach(<span class="hljs-function">(<span class="hljs-params">route</span>) =&gt;</span> {
  routes.splice(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">`/<span class="hljs-subst">${route}</span>`</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">`~pages/<span class="hljs-subst">${route}</span>/index`</span>], resolve)
  });
});</code></pre>
<p>这个是监听目录变化自动管理导航相关的功能，会在后面详细介绍。</p>
<p>逻辑很简单。<code>/document</code>和<code>/view</code>分别属于<code>文档</code>和<code>预览</code>两个应用，其中<code>预览</code>以<code>iframe</code>的形式内嵌到<code>文档</code>应用页面内，相关的操作其实都是在<code>文档</code>当中进行。当点击导航的时候，<code>文档</code>应用会自动加载<code>/view/pages/</code>下相关预览页文件夹的<code>README.md</code>文件，同时修改<code>iframe</code>的链接，实现内容的同步切换。</p>
<p>接下来，我们一起来研究一下如何监听文件目录变化，自动维护<code>router</code>导航。</p>
<h1 id="articleHeader9">6. 自动维护<code>router</code>导航</h1>
<p>如果你有用过<a href="https://nuxtjs.org/" rel="nofollow noreferrer" target="_blank">Nuxt</a>，一定对其自动维护<code>router</code>的功能不会陌生。如果没有用过也没关系，我们自己来实现这个功能！</p>
<p>使用<code>vue-router</code>的同学可能都经历过这么一个痛点，每当新建页面，都要往<code>router.js</code>的数组里面添加一个声明，最终<code>router.js</code>很可能会变成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const route = [
  { path: '/a', component: resolve => require(['a'], resolve) },
  { path: '/b', component: resolve => require(['b'], resolve) },
  { path: '/c', component: resolve => require(['c'], resolve) },
  { path: '/d', component: resolve => require(['d'], resolve) },
  { path: '/e', component: resolve => require(['e'], resolve) },
  { path: '/f', component: resolve => require(['f'], resolve) },
  ...
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> route = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/a'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'a'</span>], resolve) },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/b'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'b'</span>], resolve) },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/c'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'c'</span>], resolve) },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/d'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'d'</span>], resolve) },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/e'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'e'</span>], resolve) },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/f'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'f'</span>], resolve) },
  ...
]</code></pre>
<p>很烦，对不对？如果可以自动维护就好了。首先我们要做一个约定，约定好不同的“页面”应该如何组织。</p>
<p>在<code>/src/view/pages</code>目录下，每新建一个“页面”，我们就要新建一个和该页面同名的文件夹，往里添加文档<code>README.md</code>和入口<code>index.vue</code>，效果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└── view
    └── pages
        ├── 页面A
        │   ├── index.vue
        │   └── README.md
        ├── 页面B
        │   ├── index.vue
        │   └── README.md
        ├── 页面C
        │   ├── index.vue
        │   └── README.md
        └── 页面D
            ├── index.vue
            └── README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>└── view
    └── pages
        ├── 页面A
        │   ├── index<span class="hljs-selector-class">.vue</span>
        │   └── README<span class="hljs-selector-class">.md</span>
        ├── 页面B
        │   ├── index<span class="hljs-selector-class">.vue</span>
        │   └── README<span class="hljs-selector-class">.md</span>
        ├── 页面C
        │   ├── index<span class="hljs-selector-class">.vue</span>
        │   └── README<span class="hljs-selector-class">.md</span>
        └── 页面D
            ├── index<span class="hljs-selector-class">.vue</span>
            └── README.md</code></pre>
<p>约定好了文件的组织方式，接下来我们需要用到一个工具去负责监听和处理。这里我们使用了<a href="https://github.com/paulmillr/chokidar" rel="nofollow noreferrer" target="_blank">chokidar</a>来实现。</p>
<p>在<code>/webpack</code>目录下新建一个<code>watcher.js</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('Watching dirs...');
const { resolve } = require('path')
const chokidar = require('chokidar')
const fs = require('fs')
const routeList = []

const watcher = chokidar.watch(resolve(__dirname, '../src/view/pages'), {
  ignored: /(^|[\/\\])\../
})

watcher
  // 监听目录添加
  .on('addDir', (path) => {
    let routeName = path.split('/').pop()
    if (routeName !== 'pages' &amp;&amp; routeName !== 'index') {
      routeList.push(`'${routeName}'`)
      fs.writeFileSync(resolve(__dirname, '../src/route-list.js'), `module.exports = [${routeList}]`)
    }
  })
  // 监听目录变化（删除、重命名）
  .on('unlinkDir', (path) => {
    let routeName = path.split('/').pop()
    const itemIndex = routeList.findIndex((val) => {
      return val === `'${routeName}'`
    })
    routeList.splice(itemIndex, 1)
    fs.writeFileSync(resolve(__dirname, '../src/route-list.js'), `module.exports = [${routeList}]`)
  })

module.exports = watcher
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Watching dirs...'</span>);
<span class="hljs-keyword">const</span> { resolve } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> chokidar = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chokidar'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> routeList = []

<span class="hljs-keyword">const</span> watcher = chokidar.watch(resolve(__dirname, <span class="hljs-string">'../src/view/pages'</span>), {
  ignored: <span class="hljs-regexp">/(^|[\/\\])\../</span>
})

watcher
  <span class="hljs-comment">// 监听目录添加</span>
  .on(<span class="hljs-string">'addDir'</span>, <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> routeName = path.split(<span class="hljs-string">'/'</span>).pop()
    <span class="hljs-keyword">if</span> (routeName !== <span class="hljs-string">'pages'</span> &amp;&amp; routeName !== <span class="hljs-string">'index'</span>) {
      routeList.push(<span class="hljs-string">`'<span class="hljs-subst">${routeName}</span>'`</span>)
      fs.writeFileSync(resolve(__dirname, <span class="hljs-string">'../src/route-list.js'</span>), <span class="hljs-string">`module.exports = [<span class="hljs-subst">${routeList}</span>]`</span>)
    }
  })
  <span class="hljs-comment">// 监听目录变化（删除、重命名）</span>
  .on(<span class="hljs-string">'unlinkDir'</span>, <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> routeName = path.split(<span class="hljs-string">'/'</span>).pop()
    <span class="hljs-keyword">const</span> itemIndex = routeList.findIndex(<span class="hljs-function">(<span class="hljs-params">val</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> val === <span class="hljs-string">`'<span class="hljs-subst">${routeName}</span>'`</span>
    })
    routeList.splice(itemIndex, <span class="hljs-number">1</span>)
    fs.writeFileSync(resolve(__dirname, <span class="hljs-string">'../src/route-list.js'</span>), <span class="hljs-string">`module.exports = [<span class="hljs-subst">${routeList}</span>]`</span>)
  })

<span class="hljs-built_in">module</span>.exports = watcher
</code></pre>
<p>这里面主要做了3件事：监听目录变化、维护目录名列表、把列表写入文件。当开启<code>watcher</code>后，可以在<code>/src</code>底下看到一个<code>route-list.js</code>文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = ['页面A','页面B','页面C','页面D']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = [<span class="hljs-string">'页面A'</span>,<span class="hljs-string">'页面B'</span>,<span class="hljs-string">'页面C'</span>,<span class="hljs-string">'页面D'</span>]</code></pre>
<p>然后我们就可以愉快地使用了……</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// view-router.js

import routeList from '../route-list.js';

const routes = [
  { path: '/', component: resolve => require(['~pages/index'], resolve) },
  { path: '*', component: resolve => require(['~pages/index'], resolve) },
];

routeList.forEach((route) => {
  routes.splice(1, 0, {
    path: `/${route}`,
    component: resolve => require([`~pages/${route}/index`], resolve)
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// view-router.js</span>

<span class="hljs-keyword">import</span> routeList <span class="hljs-keyword">from</span> <span class="hljs-string">'../route-list.js'</span>;

<span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'~pages/index'</span>], resolve) },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'~pages/index'</span>], resolve) },
];

routeList.forEach(<span class="hljs-function">(<span class="hljs-params">route</span>) =&gt;</span> {
  routes.splice(<span class="hljs-number">1</span>, <span class="hljs-number">0</span>, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">`/<span class="hljs-subst">${route}</span>`</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">`~pages/<span class="hljs-subst">${route}</span>/index`</span>], resolve)
  });
});</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// doc-router.js

import routeList from '../route-list.js';

const routes = [
  { path: '/', component: resolve => require(['~pages/index/README.md'], resolve) }
];

routeList.forEach((route) => {
  routes.push({
    path: `/${route}`,
    component: resolve => require([`~pages/${route}/README.md`], resolve)
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// doc-router.js</span>

<span class="hljs-keyword">import</span> routeList <span class="hljs-keyword">from</span> <span class="hljs-string">'../route-list.js'</span>;

<span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'~pages/index/README.md'</span>], resolve) }
];

routeList.forEach(<span class="hljs-function">(<span class="hljs-params">route</span>) =&gt;</span> {
  routes.push({
    <span class="hljs-attr">path</span>: <span class="hljs-string">`/<span class="hljs-subst">${route}</span>`</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">`~pages/<span class="hljs-subst">${route}</span>/README.md`</span>], resolve)
  });
});</code></pre>
<p>同理，在页面的导航组件里面，我们也加载这个<code>route-list.js</code>文件，实现导航内容的自动更新。</p>
<p>放个视频，大家可以感受一下（SF竟然不允许内嵌视频，不科学）：<br><a href="https://v.qq.com/x/page/a0510lzpimz.html" rel="nofollow noreferrer" target="_blank">https://v.qq.com/x/page/a0510...</a></p>
<h1 id="articleHeader10">7. UI库文件组织约定</h1>
<p>这个框架的根本目的，其实是为了UI库的开发。那么我们也应该对UI库的文件组织进行约定。</p>
<p>进入<code>/src/view/components</code>目录，我们的整个UI库就放在这里面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="└── components
    ├── index.js // 入口文件
    ├── 组件A
    │   ├── index.vue
    ├── 组件B
    │   ├── index.vue
    ├── 组件C
    │   ├── index.vue
    └── 组件D
        └── index.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>└── components
    ├── index<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 入口文件</span>
    ├── 组件A
    │   ├── index<span class="hljs-selector-class">.vue</span>
    ├── 组件B
    │   ├── index<span class="hljs-selector-class">.vue</span>
    ├── 组件C
    │   ├── index<span class="hljs-selector-class">.vue</span>
    └── 组件D
        └── index.vue</code></pre>
<p>当中的<code>index.js</code>，将会以<a href="https://vuejs.org/v2/guide/plugins.html#ad" rel="nofollow noreferrer" target="_blank">vue plugin</a>的方式编写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MyHeader from './组件A'
import MyContent from './组件B'
import MyFooter from './组件C'

const install = (Vue) => {
  Vue.component('my-header', MyHeader)
  Vue.component('my-content', MyContent)
  Vue.component('my-footer', MyFooter)
}

export {
  MyHeader,
  MyContent,
  MyFooter
}

export default install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> MyHeader <span class="hljs-keyword">from</span> <span class="hljs-string">'./组件A'</span>
<span class="hljs-keyword">import</span> MyContent <span class="hljs-keyword">from</span> <span class="hljs-string">'./组件B'</span>
<span class="hljs-keyword">import</span> MyFooter <span class="hljs-keyword">from</span> <span class="hljs-string">'./组件C'</span>

const install = <span class="hljs-function"><span class="hljs-params">(Vue)</span> =&gt;</span> {
  Vue.component(<span class="hljs-string">'my-header'</span>, MyHeader)
  Vue.component(<span class="hljs-string">'my-content'</span>, MyContent)
  Vue.component(<span class="hljs-string">'my-footer'</span>, MyFooter)
}

<span class="hljs-keyword">export</span> {
  MyHeader,
  MyContent,
  MyFooter
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> install
</code></pre>
<p>这样，就能够在入口<code>.js</code>文件中以<code>Vue.use(UILibrary)</code>的形式对UI库进行引用了。</p>
<p>扩展一下，考虑到UI可能有“换肤”的功能，那么我们可以在<code>/src/view</code>目录下新建一个<code>/assets</code>目录，专门存放样式相关的文件，这个目录最终也会被打包到<code>/dist</code>目录下，在使用的时候引入相应样式文件即可。</p>
<h1 id="articleHeader11">8. 构建运行命令</h1>
<p>前面做了那么多，最终我们希望能够通过简单的<code>npm script</code>命令就把整个框架运行起来，应该怎么做呢？</p>
<p>还记得在<code>/webpack</code>目录下的三个<code>config.js</code>文件吗？它们就是框架跑通的关键，但是我们并不打算直接运行它们，而是在其之上封装一下。</p>
<p>在<code>/webpack</code>目录下新建一个<code>dev.js</code>文件，内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('./watcher.js')
module.exports = require('./webpack.dev.config.js')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">require</span><span class="hljs-params">(<span class="hljs-string">'./watcher.js'</span>)</span></span>
module<span class="hljs-selector-class">.exports</span> = require(<span class="hljs-string">'./webpack.dev.config.js'</span>)
</code></pre>
<p>同样的，分别新建<code>build.js</code>和<code>doc.js</code>文件，分别引入<code>webpack.build.config.js</code>和<code>webpack.doc.config.js</code>即可。</p>
<p>为什么要这么做呢？因为webpack运行的时候会读取<code>config.js</code>文件，如果我们希望在webpack工作之前先进行一些预处理，那么这种做法就非常方便了，比如这里添加的监听目录文件变化的功能。如果将来有什么扩展，也可以通过类似的方式进行。</p>
<p>接下来就是在<code>package.json</code>里面定义我们的<code>npm script</code>了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;: &quot;node_modules/.bin/webpack-dev-server --config webpack/dev.js&quot;,
&quot;doc&quot;: &quot;node_modules/.bin/webpack -p --config webpack/doc.js --progress --profile --colors&quot;,
&quot;build&quot;: &quot;node_modules/.bin/webpack -p --config webpack/build.js --progress --profile --colors&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">"dev":</span> <span class="hljs-comment">"node_modules/</span><span class="hljs-string">.</span><span class="hljs-comment">bin/webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack/dev</span><span class="hljs-string">.</span><span class="hljs-comment">js"</span><span class="hljs-string">,</span>
<span class="hljs-comment">"doc":</span> <span class="hljs-comment">"node_modules/</span><span class="hljs-string">.</span><span class="hljs-comment">bin/webpack</span> <span class="hljs-literal">-</span><span class="hljs-comment">p</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack/doc</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">profile</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors"</span><span class="hljs-string">,</span>
<span class="hljs-comment">"build":</span> <span class="hljs-comment">"node_modules/</span><span class="hljs-string">.</span><span class="hljs-comment">bin/webpack</span> <span class="hljs-literal">-</span><span class="hljs-comment">p</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config</span> <span class="hljs-comment">webpack/build</span><span class="hljs-string">.</span><span class="hljs-comment">js</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">profile</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors"</span></code></pre>
<p>值得注意的是，在生产模式下，需要加<code>-p</code>才能充分启动webpack2的<code>tree-shaking</code>功能。</p>
<p>在根目录下通过<code>npm run 命令</code>的方式测试一下是否已经跑起来了呢？</p>
<h1 id="articleHeader12">9. 后续工作</h1>
<ul>
<li><p>添加单元测试</p></li>
<li><p>加入PWA功能</p></li>
</ul>
<h1 id="articleHeader13">10. 尾声</h1>
<p>本文篇幅较长，能够看到这里的估计已经有点晕了吧。很久都没有写文章了，终于被我攒了个大招发出来，特别爽。搭建开发框架的过程是一个不断尝试，不断google和stackoverflow的过程。在这个过程中，大到对架构设计，小到对文件组织、工具使用，都有了更进一步的理解。</p>
<p>这个框架的运作模式，其实也是参考了很多业界内的方案，更多的是想要“偷懒”。能让机器自动帮忙搞的，绝对不自己手动搞，这才是技术进步的动力嘛。</p>
<p>该项目已经被改装成<code>vue-cli</code>的模板，通过<code>vue init jrainlau/vue-donut#mobile</code>即可使用，欢迎尝试，期待反馈和PR，谢谢大家~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【工程化】从0搭建VueJS移动端组件库开发框架

## 原文链接
[https://segmentfault.com/a/1190000009660650](https://segmentfault.com/a/1190000009660650)


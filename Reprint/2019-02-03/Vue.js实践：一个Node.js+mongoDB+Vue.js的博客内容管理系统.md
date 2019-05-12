---
title: 'Vue.js实践：一个Node.js+mongoDB+Vue.js的博客内容管理系统' 
date: 2019-02-03 2:30:40
hidden: true
slug: aweotn3vwpj
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">项目来源</h3>
<p>以前曾用过WordPress搭建自己的博客网站，但感觉WordPress很是臃肿。所以一直想自己写一个博客内容管理器。</p>
<p>正好近日看完了Vue各个插件的文档，就用着Vue尝试写了这个简约的博客内容管理器（CMS）。</p>
<h3 id="articleHeader1">嗯，我想完成的功能：</h3>
<ul>
<li><p>一个基本的博客内容管理器功能，如后台登陆，发布并管理文章等</p></li>
<li><p>支持<code>markdown</code>语法实时编辑</p></li>
<li><p>支持代码高亮</p></li>
<li><p>管理博客页面的链接</p></li>
<li><p>博客页面对移动端适配优化</p></li>
<li><p>账户管理(修改密码)</p></li>
</ul>
<h4><a href="http://115.28.90.175/" rel="nofollow noreferrer" target="_blank">Demo</a></h4>
<p>登陆后台按钮在页面最下方“站长登陆”，可以以游客身份登入后台系统。</p>
<h4><a href="https://github.com/ycwalker/CMS-of-Blog" rel="nofollow noreferrer" target="_blank">源码</a></h4>
<h3 id="articleHeader2">用到的技术和实现思路：</h3>
<h4>前端：Vue全家桶</h4>
<ul>
<li><p>Vue.js</p></li>
<li><p>Vue-Cli</p></li>
<li><p>Vue-Resource</p></li>
<li><p>Vue-Router</p></li>
<li><p>Vuex</p></li>
</ul>
<h4>后端：Node</h4>
<ul>
<li><p>Node.js</p></li>
<li><p>mongoDB (mongoose)</p></li>
<li><p>Express</p></li>
</ul>
<h4>工具和语言</h4>
<ul>
<li><p>Webpack</p></li>
<li><p>ES6</p></li>
<li><p>SASS</p></li>
</ul>
<h4>整体思路：</h4>
<ul>
<li><p><code>Node</code>服务端不做路由切换，这部分交给<code>Vue-Router</code>完成</p></li>
<li><p><code>Node</code>服务端只用来接收请求，查询数据库并用来返回值</p></li>
</ul>
<p>所以这样做前后端几乎完全解耦，只要约定好restful数据接口，和数据存取格式就OK啦。</p>
<p>后端我用了<code>mongoDB</code>做数据库，并在<code>Express</code>中通过<code>mongoose</code>操作mongoDB，省去了复杂的命令行，通过Javascript操作无疑方便了很多。</p>
<h4>Vue的各个插件：</h4>
<ul>
<li><p><code>vue-cli</code>:官方的脚手架，用来初始化项目</p></li>
<li><p><code>vue-resource</code>：可以看作一个<code>Ajax</code>库，通过在跟组件引入，可以方便的注入子组件。子组件以<code>this.$http</code>调用</p></li>
<li><p><code>vue-router</code>：官方的路由工具，用来切换子组件，是用来做SPA应用的关键</p></li>
<li><p><code>vuex</code>：规范组件中数据流动，主要用于异步的<code>http</code>请求后数据的刷新。通过官方的<code>vue-devtools</code>可以无缝对接</p></li>
</ul>
<h3 id="articleHeader3">文件目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  .babelrc           babel配置
│  .editorconfig
│  .eslintignore  
│  .eslintrc.js       eslintrc配置
│  .gitignore
│  index.html         入口页面
│  package.json
│  README.md
│  setup.html         初始化账户页面
│  webpack.config.js  webpack配置
│
├─dist                打包生成
│     
├─server              服务端
│      api.js         Restful接口
│      db.js          数据库
│      index.js
│      init.json      初始数据
│
└─src
    │  main.js        项目入口
    │  setup.js       初始化账户
    │
    ├─assets          外部引用文件
    │  ├─css
    │  ├─fonts
    │  ├─img
    │  └─js         
    │
    ├─components      vue组件
    │  ├─back         博客控制台组件
    │  ├─front        博客页面组件
    │  └─share        公共组件
    │
    ├─router          路由
    │
    ├─store           vuex文件
    │
    └─style           全局样式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>│  <span class="hljs-selector-class">.babelrc</span>           babel配置
│  <span class="hljs-selector-class">.editorconfig</span>
│  <span class="hljs-selector-class">.eslintignore</span>  
│  <span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span>       eslintrc配置
│  <span class="hljs-selector-class">.gitignore</span>
│  index<span class="hljs-selector-class">.html</span>         入口页面
│  package<span class="hljs-selector-class">.json</span>
│  README<span class="hljs-selector-class">.md</span>
│  setup<span class="hljs-selector-class">.html</span>         初始化账户页面
│  webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>  webpack配置
│
├─dist                打包生成
│     
├─server              服务端
│      api<span class="hljs-selector-class">.js</span>         Restful接口
│      db<span class="hljs-selector-class">.js</span>          数据库
│      index<span class="hljs-selector-class">.js</span>
│      init<span class="hljs-selector-class">.json</span>      初始数据
│
└─src
    │  main<span class="hljs-selector-class">.js</span>        项目入口
    │  setup<span class="hljs-selector-class">.js</span>       初始化账户
    │
    ├─assets          外部引用文件
    │  ├─css
    │  ├─fonts
    │  ├─<span class="hljs-selector-tag">img</span>
    │  └─js         
    │
    ├─components      vue组件
    │  ├─back         博客控制台组件
    │  ├─front        博客页面组件
    │  └─share        公共组件
    │
    ├─router          路由
    │
    ├─store           vuex文件
    │
    └─style           全局样式
</code></pre>
<p>前端的文件统一放到了<code>src</code>目录下，有两个入口文件，分别是<code>main.js</code>和<code>setup.js</code>，有过<code>WordPress</code>经验应该知道，第一次进入博客是需要设置用户名密码和数据库的，这里的<code>setup.js</code>就是第一次登入时的页面脚本，而<code>main.js</code>则是剩余所有文件的入口</p>
<h4><code>main.js</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue          from 'vue'
import VueResource  from 'vue-resource'
import {mapState}   from 'vuex'

//三个顶级组件，博客主页和控制台共享
import Spinner      from './components/share/Spinner.vue'
import Toast        from './components/share/Toast.vue'
import MyCanvas     from './components/share/MyCanvas.vue'

import store        from './store'
import router       from './router'

import './style/index.scss'

Vue.use(VueResource)

new Vue({
  router,
  store,
  components: {Spinner, Toast, MyCanvas},
  computed: mapState(['isLoading', 'isToasting'])
}).$mount('#CMS2')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue          <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueResource  <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
<span class="hljs-keyword">import</span> {mapState}   <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-comment">//三个顶级组件，博客主页和控制台共享</span>
<span class="hljs-keyword">import</span> Spinner      <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/share/Spinner.vue'</span>
<span class="hljs-keyword">import</span> Toast        <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/share/Toast.vue'</span>
<span class="hljs-keyword">import</span> MyCanvas     <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/share/MyCanvas.vue'</span>

<span class="hljs-keyword">import</span> store        <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> router       <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./style/index.scss'</span>

Vue.use(VueResource)

<span class="hljs-keyword">new</span> Vue({
  router,
  store,
  <span class="hljs-attr">components</span>: {Spinner, Toast, MyCanvas},
  <span class="hljs-attr">computed</span>: mapState([<span class="hljs-string">'isLoading'</span>, <span class="hljs-string">'isToasting'</span>])
}).$mount(<span class="hljs-string">'#CMS2'</span>)</code></pre>
<p>而后所有页面分割成一个单一的<code>vue</code>组件，放在<code>components</code>中，通过入口文件<code>main.js</code>，由<code>webpack</code>打包生成，生成的文件放在<code>dist</code>文件夹下。</p>
<p>后端文件放在<code>server</code>文件夹内，这就是基于<code>Express</code>的<code>node</code>服务器，在<code>server</code>文件夹内执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node index" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">index</span></code></pre>
<p>就可以启动<code>Node</code>服务器，默认侦听<code>3000</code>端口。</p>
<h3 id="articleHeader4">&nbsp;关于 Webpack</h3>
<p>Webpack的配置文件主体是有<code>vue-cli</code>生成的，但为了配合后端自动刷新、支持<code>Sass</code>和生成独立的<code>css</code>文件，稍微修改了一下：</p>
<h4><code>webpack.config.js</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//萃取css文件，在此命名
const extractCSSFromVue = new ExtractTextPlugin('styles.css')
const extractCSSFromSASS = new ExtractTextPlugin('index.css')

module.exports = {
  entry: {
    main: './src/main.js',
    setup: './src/setup.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue',
        //使用postcss处理加工后的scss文件
        options: {
          preserveWhitespace: false,
          postcss: [
            require('autoprefixer')({
              browsers: ['last 3 versions']
            })
          ],
          loaders: {
            sass: extractCSSFromVue.extract({
              loader: 'css!sass!',
              fallbackLoader: 'vue-style-loader'
            })
          }
        }
      },
      {
        test: /\.scss$/,
        loader: extractCSSFromSASS.extract(['css', 'sass'])
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      //字体文件
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&amp;mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
      //取出css生成独立文件
    extractCSSFromVue,
    extractCSSFromSASS,
    new CopyWebpackPlugin([
      {from: './src/assets/img', to: './'}
    ])
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  //服务器代理，便于开发时所有http请求转到node的3000端口，而不是前端的8080端口
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000/'
      }
    }
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '&quot;production&quot;'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-comment">//萃取css文件，在此命名</span>
<span class="hljs-keyword">const</span> extractCSSFromVue = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'styles.css'</span>)
<span class="hljs-keyword">const</span> extractCSSFromSASS = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'index.css'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">main</span>: <span class="hljs-string">'./src/main.js'</span>,
    <span class="hljs-attr">setup</span>: <span class="hljs-string">'./src/setup.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),
    <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
  },
  <span class="hljs-attr">resolveLoader</span>: {
    <span class="hljs-attr">moduleExtensions</span>: [<span class="hljs-string">'-loader'</span>]
  },
  <span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue'</span>,
        <span class="hljs-comment">//使用postcss处理加工后的scss文件</span>
        options: {
          <span class="hljs-attr">preserveWhitespace</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">postcss</span>: [
            <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)({
              <span class="hljs-attr">browsers</span>: [<span class="hljs-string">'last 3 versions'</span>]
            })
          ],
          <span class="hljs-attr">loaders</span>: {
            <span class="hljs-attr">sass</span>: extractCSSFromVue.extract({
              <span class="hljs-attr">loader</span>: <span class="hljs-string">'css!sass!'</span>,
              <span class="hljs-attr">fallbackLoader</span>: <span class="hljs-string">'vue-style-loader'</span>
            })
          }
        }
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
        <span class="hljs-attr">loader</span>: extractCSSFromSASS.extract([<span class="hljs-string">'css'</span>, <span class="hljs-string">'sass'</span>])
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif|svg)$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'file'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">'[name].[ext]?[hash]'</span>
        }
      },
      <span class="hljs-comment">//字体文件</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader?limit=10000&amp;mimetype=application/font-woff'</span>
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'file-loader'</span>
      }
    ]
  },
  <span class="hljs-attr">plugins</span>: [
      <span class="hljs-comment">//取出css生成独立文件</span>
    extractCSSFromVue,
    extractCSSFromSASS,
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {<span class="hljs-attr">from</span>: <span class="hljs-string">'./src/assets/img'</span>, <span class="hljs-attr">to</span>: <span class="hljs-string">'./'</span>}
    ])
  ],
  <span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">alias</span>: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue'</span>
    }
  },
  <span class="hljs-comment">//服务器代理，便于开发时所有http请求转到node的3000端口，而不是前端的8080端口</span>
  devServer: {
    <span class="hljs-attr">historyApiFallback</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">noInfo</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">proxy</span>: {
      <span class="hljs-string">'/'</span>: {
        <span class="hljs-attr">target</span>: <span class="hljs-string">'http://localhost:3000/'</span>
      }
    }
  },
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#eval-source-map'</span>
}

<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
  <span class="hljs-built_in">module</span>.exports.devtool = <span class="hljs-string">'#source-map'</span>
  <span class="hljs-built_in">module</span>.exports.plugins = (<span class="hljs-built_in">module</span>.exports.plugins || []).concat([
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: {
        <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"production"'</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
      }
    }),
    <span class="hljs-keyword">new</span> webpack.LoaderOptionsPlugin({
      <span class="hljs-attr">minimize</span>: <span class="hljs-literal">true</span>
    })
  ])
}</code></pre>
<p>运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<p>后，node端开启了3000端口，接着运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>打开webpack在8080端口服务器，具有动态加载的功能，并且所有的http请求会代理到3000端口</p>
<h3 id="articleHeader5">关于Vue-Router</h3>
<p>因为写的是但也应用（SPA），服务器不负责路由，所以路由方面交给<code>Vue-Router</code>来控制。</p>
<h4><code>router.js</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue      from 'vue'
import Router   from 'vue-router'
//博客页面
import Archive  from '../components/front/Archive.vue'
import Article  from '../components/front/Article.vue'
//控制台页面
import Console  from '../components/back/Console.vue'
import Login    from '../components/back/Login.vue'
import Articles from '../components/back/Articles.vue'
import Editor   from '../components/back/Editor.vue'
import Links    from '../components/back/Links.vue'
import Account  from '../components/back/Account.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/archive', name: 'archive', component: Archive},
    {path: '/article', name: 'article', component: Article},
    {path: '/', component: Login},
    {
      path: '/console',
      component: Console,
      children: [
        {path: '', component: Articles},
        {path: 'articles', name: 'articles', component: Articles},
        {path: 'editor', name: 'editor', component: Editor},
        {path: 'links', name: 'links', component: Links},
        {path: 'account', name: 'account', component: Account}
      ]
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue      <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router   <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-comment">//博客页面</span>
<span class="hljs-keyword">import</span> Archive  <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/front/Archive.vue'</span>
<span class="hljs-keyword">import</span> Article  <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/front/Article.vue'</span>
<span class="hljs-comment">//控制台页面</span>
<span class="hljs-keyword">import</span> Console  <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/back/Console.vue'</span>
<span class="hljs-keyword">import</span> Login    <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/back/Login.vue'</span>
<span class="hljs-keyword">import</span> Articles <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/back/Articles.vue'</span>
<span class="hljs-keyword">import</span> Editor   <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/back/Editor.vue'</span>
<span class="hljs-keyword">import</span> Links    <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/back/Links.vue'</span>
<span class="hljs-keyword">import</span> Account  <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/back/Account.vue'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">routes</span>: [
    {<span class="hljs-attr">path</span>: <span class="hljs-string">'/archive'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'archive'</span>, <span class="hljs-attr">component</span>: Archive},
    {<span class="hljs-attr">path</span>: <span class="hljs-string">'/article'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'article'</span>, <span class="hljs-attr">component</span>: Article},
    {<span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: Login},
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/console'</span>,
      <span class="hljs-attr">component</span>: Console,
      <span class="hljs-attr">children</span>: [
        {<span class="hljs-attr">path</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">component</span>: Articles},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'articles'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'articles'</span>, <span class="hljs-attr">component</span>: Articles},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'editor'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'editor'</span>, <span class="hljs-attr">component</span>: Editor},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'links'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'links'</span>, <span class="hljs-attr">component</span>: Links},
        {<span class="hljs-attr">path</span>: <span class="hljs-string">'account'</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">'account'</span>, <span class="hljs-attr">component</span>: Account}
      ]
    }
  ]
})</code></pre>
<h3 id="articleHeader6">文档首页 &nbsp;</h3>
<h4>
<code>index.html</code> &nbsp;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>
    <title>cms2simple</title>
    <link rel=&quot;stylesheet&quot; href=&quot;dist/index.css&quot;>
    <link rel=&quot;stylesheet&quot; href=&quot;dist/styles.css&quot;>
  </head>
  <body>
    <div id=&quot;CMS2&quot; style=&quot;height: 100%&quot;>
      <my-canvas></my-canvas>
      <spinner v-show=&quot;isLoading&quot;></spinner>
      <Toast v-show=&quot;isToasting&quot;></Toast>
      <router-view ></router-view>
    </div>
    <script src=&quot;/dist/main.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>cms2simple<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"dist/index.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"dist/styles.css"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"CMS2"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height: 100%"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">my-canvas</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-canvas</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">spinner</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isLoading"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">spinner</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Toast</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"isToasting"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Toast</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/dist/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>可以看到路由控制在<code>body</code>元素下的<code>router-view</code>中。前面的<code>spinner</code>，<code>toast</code>元素分别是等待效果（转圈圈）的弹出层和信息的弹出层，和背景样式的切换。</p>
<h3 id="articleHeader7">关于后端</h3>
<p>后端是用<code>node.js</code>作为服务器的，使用了<code>express</code>框架。</p>
<p>其中代码非常简单:</p>
<h4><code>index.js</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./db')
const resolve = file => path.resolve(__dirname, file)
const api = require('./api')
const app = express()

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000))
app.use(favicon(resolve('../dist/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/dist', express.static(resolve('../dist')))
app.use(api)

app.post('/api/setup', function (req, res) {
  new db.User(req.body)
    .save()
    .then(() => {
      res.status(200).end()
      db.initialized = true
    })
    .catch(() => res.status(500).end())
})

app.get('*', function (req, res) {
  const fileName = db.initialized ? 'index.html' : 'setup.html'
  const html = fs.readFileSync(resolve('../' + fileName), 'utf-8')
  res.send(html)
})

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> favicon = <span class="hljs-built_in">require</span>(<span class="hljs-string">'serve-favicon'</span>)
<span class="hljs-keyword">const</span> bodyParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>)
<span class="hljs-keyword">const</span> cookieParser = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cookie-parser'</span>)
<span class="hljs-keyword">const</span> db = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./db'</span>)
<span class="hljs-keyword">const</span> resolve = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> path.resolve(__dirname, file)
<span class="hljs-keyword">const</span> api = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./api'</span>)
<span class="hljs-keyword">const</span> app = express()

<span class="hljs-comment">// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer</span>

app.set(<span class="hljs-string">'port'</span>, (process.env.port || <span class="hljs-number">3000</span>))
app.use(favicon(resolve(<span class="hljs-string">'../dist/favicon.ico'</span>)))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({<span class="hljs-attr">extended</span>: <span class="hljs-literal">false</span>}))
app.use(cookieParser())
app.use(<span class="hljs-string">'/dist'</span>, express.static(resolve(<span class="hljs-string">'../dist'</span>)))
app.use(api)

app.post(<span class="hljs-string">'/api/setup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">new</span> db.User(req.body)
    .save()
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      res.status(<span class="hljs-number">200</span>).end()
      db.initialized = <span class="hljs-literal">true</span>
    })
    .catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> res.status(<span class="hljs-number">500</span>).end())
})

app.get(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">const</span> fileName = db.initialized ? <span class="hljs-string">'index.html'</span> : <span class="hljs-string">'setup.html'</span>
  <span class="hljs-keyword">const</span> html = fs.readFileSync(resolve(<span class="hljs-string">'../'</span> + fileName), <span class="hljs-string">'utf-8'</span>)
  res.send(html)
})

app.listen(app.get(<span class="hljs-string">'port'</span>), <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Visit http://localhost:'</span> + app.get(<span class="hljs-string">'port'</span>))
})</code></pre>
<p>服务器做的事情很简单，毕竟路由在前端。在接受请求的时候判断一下数据库是否初始化，如果初始化就转向主页，否则转向<code>setup.html</code>，之所以没有直接<code>sendfile</code>是因为考虑到之后添加服务端渲染（虽然主页并没有啥值得渲染的，因为很简单）</p>
<p><code>express</code>框架中使用了<code>mongoose</code>来连接<code>mongoDB</code>数据库，在接收请求时做对应的<code>curd</code>操作，比如这就是在接收保存文章时对应的操作：</p>
<h4><code>api.js</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.post('/api/saveArticle', (req, res) => {
  const id = req.body._id
  const article = {
    title: req.body.title,
    date: req.body.date,
    content: req.body.content
  }
  if (id) {
    db.Article.findByIdAndUpdate(id, article, fn)
  } else {
    new db.Article(article).save()
  }
  res.status(200).end()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">router.post(<span class="hljs-string">'/api/saveArticle'</span>, (req, res) =&gt; {
  <span class="hljs-keyword">const</span> id = req.body._id
  <span class="hljs-keyword">const</span> article = {
    <span class="hljs-attr">title</span>: req.body.title,
    <span class="hljs-attr">date</span>: req.body.date,
    <span class="hljs-attr">content</span>: req.body.content
  }
  <span class="hljs-keyword">if</span> (id) {
    db.Article.findByIdAndUpdate(id, article, fn)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">new</span> db.Article(article).save()
  }
  res.status(<span class="hljs-number">200</span>).end()
})</code></pre>
<h3 id="articleHeader8">后记</h3>
<p>当然还有很多没提及的地方，最早写这个博客管理器的时候用的还是<code>vue 1.x</code>，后来用<code>2.0</code>改写后文档一直没改，所以最近更新了一下，避免误解。</p>
<p>其实整个管理器最复杂的地方时<code>vuex</code>异步数据视图的部分，不过这一部能讲的太多，就不在这里展开了，可以看官方文档后，参考源代码的注释。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js实践：一个Node.js+mongoDB+Vue.js的博客内容管理系统

## 原文链接
[https://segmentfault.com/a/1190000006939687](https://segmentfault.com/a/1190000006939687)


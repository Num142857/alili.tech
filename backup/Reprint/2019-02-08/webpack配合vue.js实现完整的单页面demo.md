---
title: 'webpack配合vue.js实现完整的单页面demo' 
date: 2019-02-08 2:30:41
hidden: true
slug: wr1uzqk9r6e
categories: [reprint]
---

{{< raw >}}

                    
<p>本篇文章主要是我在开发前研究了webpack+vue.js的单页面应用，因为需要用到node的npm，所以确保安装了node，建议官网安装最新的稳定版本。并且在项目中需要加载一些npm包，由于npm的服务器在国外，可能我们下载的过程会比较慢，所以建议用阿里的镜像cnpm安装，10分钟实时更新一次npm的镜像。具体的下载配置参考阿里的cnpm官网。<b>本文章只是和大家探讨怎么利用webpack配合vue.js做一个单页面应用，具体关于vue里面的内容怎么写并不在本篇文章的介绍范围。</b>具体请参考官方文档，里面做了详细的vue的语法介绍.</p>
<h3 id="articleHeader0">建议阅读前准备内容</h3>
<ul>
<li><p>阅读过webpack文档</p></li>
<li><p>阅读过<a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">vue-router</a>文档</p></li>
<li><p>知道什么叫<a href="https://github.com/xufei/blog/issues/5" rel="nofollow noreferrer" target="_blank">单页面应用</a></p></li>
</ul>
<h3 id="articleHeader1">1. 定义我们demo的基本目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── README.md           
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── vue         // 组件
│   |    ├──home.vue
│   |    ├──blog.vue
│   |    ├──about.vue
│   |    ├──topic.vue
│   ├── components     // 各种组件
│   ├── views          // css文件
│   ├── scss               //scss文件
│   └── main.js        // Webpack 预编译入口
└── webpack.js  // Webpack 配置文件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>├── README.md           
├── index.html         <span class="hljs-comment">// 项目入口文件</span>
├── package.json       <span class="hljs-comment">// 项目配置文件</span>
├── src                <span class="hljs-comment">// 生产目录</span>
│   ├── vue         <span class="hljs-comment">// 组件</span>
│   <span class="hljs-string">|    ├──home.vue</span>
│   <span class="hljs-string">|    ├──blog.vue</span>
│   <span class="hljs-string">|    ├──about.vue</span>
│   <span class="hljs-string">|    ├──topic.vue</span>
│   ├── components     <span class="hljs-comment">// 各种组件</span>
│   ├── views          <span class="hljs-comment">// css文件</span>
│   ├── scss               <span class="hljs-comment">//scss文件</span>
│   └── main.js        <span class="hljs-comment">// Webpack 预编译入口</span>
└── webpack.js  <span class="hljs-comment">// Webpack 配置文件</span>
</code></pre>
<h3 id="articleHeader2">2. 配置一下我们的webpack.js文件</h3>
<p>在介绍怎么配置之前你需要掌握一个命令 <code>npm install &lt;模块&gt; --save-dev</code>这个命令的意思是这个命名的意思是我们安装了这个包并且把它的基本信息写入目录的package.json文件。还有一个命令是我们直接运行cnpm install会自动下载package.json里面写入的包.</p>
<p>在webpack的配置文件我们需要用到四个npm的模块分别是：<code>path</code>，<code>webpack</code>，<code>extract-text-webpack-plugin</code>,<code>vue-loader</code>记得先下载包在用<b>require</b>命令引入进来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//node的路径模块
var path=require('path');
//我们是webpack当然要引入这个
var webpack = require('webpack');
//这个是构建页面资源的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//因为我们是vue.js的应用，把各个组件当做一个页面.vue后缀，所以引入这个可以编译這些文件
var vue = require(&quot;vue-loader&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//node的路径模块</span>
<span class="hljs-keyword">var</span> path=<span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-comment">//我们是webpack当然要引入这个</span>
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-comment">//这个是构建页面资源的插件</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-comment">//因为我们是vue.js的应用，把各个组件当做一个页面.vue后缀，所以引入这个可以编译這些文件</span>
<span class="hljs-keyword">var</span> vue = <span class="hljs-built_in">require</span>(<span class="hljs-string">"vue-loader"</span>);
</code></pre>
<p>好了，我们已经把需要的模块引入进来了，接下来我们定义一些接下来要用到的一些文件夹路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//__dirname是node里面的一个变量，指向的是当前文件夹目录
var ROOT_PATH = path.resolve(__dirname);
//这个我们的文件入口，等下我们就会从main.js这个文件作为入口
var APP_PATH = path.resolve(ROOT_PATH, 'src/main.js');
//这个是文件打包出来的输出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//__dirname是node里面的一个变量，指向的是当前文件夹目录</span>
<span class="hljs-keyword">var</span> ROOT_PATH = path.resolve(__dirname);
<span class="hljs-comment">//这个我们的文件入口，等下我们就会从main.js这个文件作为入口</span>
<span class="hljs-keyword">var</span> APP_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'src/main.js'</span>);
<span class="hljs-comment">//这个是文件打包出来的输出路径</span>
<span class="hljs-keyword">var</span> BUILD_PATH = path.resolve(ROOT_PATH, <span class="hljs-string">'build'</span>);
</code></pre>
<p>基本的文件路径我们已经定义好了，接下来我们要用到<code>extract-text-webpack-plugin</code>这个插件了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var plugins = [
  //提公用js到common.js文件中
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  //将样式统一发布到style.css中
  new ExtractTextPlugin(&quot;style.css&quot;),
 // 使用 ProvidePlugin 加载使用率高的依赖库
  new webpack.ProvidePlugin({
    $: 'webpack-zepto'
  })
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> plugins = [
  <span class="hljs-comment">//提公用js到common.js文件中</span>
  <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>),
  <span class="hljs-comment">//将样式统一发布到style.css中</span>
  <span class="hljs-keyword">new</span> <span class="hljs-type">ExtractTextPlugin</span>(<span class="hljs-string">"style.css"</span>),
 <span class="hljs-comment">// 使用 ProvidePlugin 加载使用率高的依赖库</span>
  <span class="hljs-keyword">new</span> <span class="hljs-type">webpack</span>.ProvidePlugin({
    $: <span class="hljs-type"></span>'webpack-zepto<span class="hljs-string">'
  })
];</span></code></pre>
<p>接下来是webpack的重点了<b>loader</b>，webpack的思想是把每个静态资源文件当做一个模块加载，我们需要做一些配置，在这里我们需要用到编译css，sass模块，多以我们还需要安装'css-loader','style-loader','node-sass','md5'</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
     //文件的入口，还可以写成多数组的形式，具体自己扩展
     entry:[APP_PATH],
     //输出
     output:{
         //输出路径
         path: BUILD_PATH，
         //打包的js命名
         filename：build.js'
         // 指向异步加载的路径
         publicPath : __dirname + '/build/',
         // 非主文件的命名规则，加缓存用到md5
         chunkFilename: '[id].build.js?[chunkhash]'
     },
     module: {
         loaders: [
              {
                test: /\.vue$/,
                loader: 'vue',
              },
              {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, 'css-loader')
              },
              {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader&quot;)
              },
              {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
              }
         ]
    },
  //这个特别说明下，vue提倡把一个组件当做一个页面，所以可能在一个页面写html，style，javascript，也可以引入和写scss文件
  vue: {
    css: ExtractTextPlugin.extract(&quot;css&quot;),
    sass: ExtractTextPlugin.extract(&quot;css!sass-loader&quot;)
  },
  plugins: plugins
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
     <span class="hljs-string">//文件的入口，还可以写成多数组的形式，具体自己扩展</span>
<span class="hljs-attr">     entry:</span><span class="hljs-string">[APP_PATH],</span>
     <span class="hljs-string">//输出</span>
<span class="hljs-attr">     output:</span><span class="hljs-string">{</span>
         <span class="hljs-string">//输出路径</span>
<span class="hljs-attr">         path:</span> <span class="hljs-string">BUILD_PATH，</span>
         <span class="hljs-string">//打包的js命名</span>
         <span class="hljs-string">filename：build.js'</span>
         <span class="hljs-string">//</span> <span class="hljs-string">指向异步加载的路径</span>
         <span class="hljs-string">publicPath</span> <span class="hljs-string">:</span> <span class="hljs-string">__dirname</span> <span class="hljs-string">+</span> <span class="hljs-string">'/build/'</span><span class="hljs-string">,</span>
         <span class="hljs-string">//</span> <span class="hljs-string">非主文件的命名规则，加缓存用到md5</span>
<span class="hljs-attr">         chunkFilename:</span> <span class="hljs-string">'[id].build.js?[chunkhash]'</span>
     <span class="hljs-string">},</span>
<span class="hljs-attr">     module:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">         loaders:</span> <span class="hljs-string">[</span>
              <span class="hljs-string">{</span>
<span class="hljs-attr">                test:</span> <span class="hljs-string">/\.vue$/,</span>
<span class="hljs-attr">                loader:</span> <span class="hljs-string">'vue'</span><span class="hljs-string">,</span>
              <span class="hljs-string">},</span>
              <span class="hljs-string">{</span>
<span class="hljs-attr">                test:</span> <span class="hljs-string">/\.scss$/,</span>
<span class="hljs-attr">                loader:</span> <span class="hljs-string">ExtractTextPlugin.extract("style-loader",</span> <span class="hljs-string">'css-loader'</span><span class="hljs-string">)</span>
              <span class="hljs-string">},</span>
              <span class="hljs-string">{</span>
<span class="hljs-attr">                test:</span> <span class="hljs-string">/\.css$/,</span>
<span class="hljs-attr">                loader:</span> <span class="hljs-string">ExtractTextPlugin.extract("style-loader",</span> <span class="hljs-string">"css-loader"</span><span class="hljs-string">)</span>
              <span class="hljs-string">},</span>
              <span class="hljs-string">{</span>
<span class="hljs-attr">                test:</span> <span class="hljs-string">/\.(png|jpg)$/,</span>
<span class="hljs-attr">                loader:</span> <span class="hljs-string">'url?limit=40000'</span>
              <span class="hljs-string">}</span>
         <span class="hljs-string">]</span>
    <span class="hljs-string">},</span>
  <span class="hljs-string">//这个特别说明下，vue提倡把一个组件当做一个页面，所以可能在一个页面写html，style，javascript，也可以引入和写scss文件</span>
<span class="hljs-attr">  vue:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    css:</span> <span class="hljs-string">ExtractTextPlugin.extract("css"),</span>
<span class="hljs-attr">    sass:</span> <span class="hljs-string">ExtractTextPlugin.extract("css!sass-loader")</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  plugins:</span> <span class="hljs-string">plugins</span>
<span class="hljs-string">}</span>
</code></pre>
<h3 id="articleHeader3">3. 配置我们的入口文件main.js</h3>
<p>这里我们需要三个npm模块，vue，vue-router，vue-resource三个模块，我们依次安装然后在引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//vue的应用当然要引，等下要用它来注册
var Vue = require('vue')
//这个是路由，spa应用必要哦
var VueRouter = require('vue-router');
//这个是类似ajax请求,肯定要拉去数据啦，所以也下载吧
var VueResource = require('vue-resource');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//vue的应用当然要引，等下要用它来注册</span>
<span class="hljs-keyword">var</span> Vue = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue'</span>)
<span class="hljs-comment">//这个是路由，spa应用必要哦</span>
<span class="hljs-keyword">var</span> VueRouter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-router'</span>);
<span class="hljs-comment">//这个是类似ajax请求,肯定要拉去数据啦，所以也下载吧</span>
<span class="hljs-keyword">var</span> VueResource = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-resource'</span>);
</code></pre>
<p>在vue里面声明并注册个空组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(VueRouter);
Vue.use(VueResource);
var app = Vue.extend({});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>Vue.<span class="hljs-keyword">use</span>(VueRouter);
Vue.<span class="hljs-keyword">use</span>(VueResource);
<span class="hljs-keyword">var</span> <span class="hljs-keyword">app</span> = Vue.extend({});</code></pre>
<p>实例化VueRounter</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new VueRouter({
    // 当hashbang的值为true时，所有的路径都会被格式化已#!开头，
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">router</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">VueRouter({</span>
    <span class="hljs-string">//</span> <span class="hljs-string">当hashbang的值为true时，所有的路径都会被格式化已#!开头，</span>
<span class="hljs-attr">    hashbang:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    history:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">    saveScrollPosition:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">    transitionOnLoad:</span> <span class="hljs-literal">true</span>
<span class="hljs-string">});</span>
</code></pre>
<p>接下来写下我们的路由路径，也可以单独把路由写在一个文件，我们这边只是个demo所以写一起了，不打紧，关于这块路由的写法可以具体参考下vue-router的文档<a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">http://router.vuejs.org/zh-cn...</a>，将的很详细。</p>
<p>这里有必要将一下，webpack提供了异步加载功能，配合vue-router的路由使用，当哪个组件需要渲染是，会加载它依赖的组件，并且异步加载进来。是不是很棒。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.map({
     '/':{                    //首页
        component: function (resolve) {
           require(['./vue/home.vue'],resolve)
         }
    },
    '/home':{
        name : 'home',                    //首页
        component: function (resolve) {
           require(['./vue/home.vue'],resolve)
         }
    },
    '/blog':{
         name : 'blog',               //博客列表
        component: function (resolve) {
           require(['./vue/blog.vue'],resolve)
         }
    },
    '/blog/topic':{
         name : 'topic',
         //文章详情
         component: function (resolve) {
           require(['./vue/topic.vue'],resolve)
         }
    },
    '/about':{
         name : 'about',
         //关于
         component: function (resolve) {
           require(['./vue/about.vue'],resolve)
         }
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>router.map({
     <span class="hljs-string">'/'</span>:{                    <span class="hljs-comment">//首页</span>
        component: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
           <span class="hljs-built_in">require</span>([<span class="hljs-string">'./vue/home.vue'</span>],resolve)
         }
    },
    <span class="hljs-string">'/home'</span>:{
        <span class="hljs-attr">name</span> : <span class="hljs-string">'home'</span>,                    <span class="hljs-comment">//首页</span>
        component: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
           <span class="hljs-built_in">require</span>([<span class="hljs-string">'./vue/home.vue'</span>],resolve)
         }
    },
    <span class="hljs-string">'/blog'</span>:{
         <span class="hljs-attr">name</span> : <span class="hljs-string">'blog'</span>,               <span class="hljs-comment">//博客列表</span>
        component: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
           <span class="hljs-built_in">require</span>([<span class="hljs-string">'./vue/blog.vue'</span>],resolve)
         }
    },
    <span class="hljs-string">'/blog/topic'</span>:{
         <span class="hljs-attr">name</span> : <span class="hljs-string">'topic'</span>,
         <span class="hljs-comment">//文章详情</span>
         component: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
           <span class="hljs-built_in">require</span>([<span class="hljs-string">'./vue/topic.vue'</span>],resolve)
         }
    },
    <span class="hljs-string">'/about'</span>:{
         <span class="hljs-attr">name</span> : <span class="hljs-string">'about'</span>,
         <span class="hljs-comment">//关于</span>
         component: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
           <span class="hljs-built_in">require</span>([<span class="hljs-string">'./vue/about.vue'</span>],resolve)
         }
    }
})
</code></pre>
<p>再加句代码，测试访问路由访问是否成功</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.afterEach(function (transition) {
  console.log('成功浏览到: ' + transition.to.path)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>router.afterEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">transition</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'成功浏览到: '</span> + transition.to.path)
})
</code></pre>
<p>最后我们注册下vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.start(app, &quot;#app&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>router.<span class="hljs-literal">start</span>(app, <span class="hljs-string">"#app"</span>);
</code></pre>
<h3 id="articleHeader4">4. 填充下index.html文件的结构</h3>
<p><b>&lt;router-view&gt;</b> 用于渲染匹配的组件，它基于 Vue 的动态组件系统。我们的index.html结构是这样子的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
     <meta charset=&quot;UTF-8&quot;>
     <title>个人站</title>
     <link rel=&quot;stylesheet&quot; href=&quot;./build/style.css&quot;>
</head>
<body>
     <div id=&quot;app&quot;>    
        <router-view></router-view>
    </div>
    <script src=&quot;./build/common.js&quot;></script>
    <script src=&quot;./build/build.js&quot;></script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>个人站<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"./build/style.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>    
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./build/common.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./build/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h3 id="articleHeader5">5. 怎么写一个组件</h3>
<p>关于组件，vue提倡一个模块写一个具体的组件比如列表组件可以list.vue，然后根据路由加载具体的组件，组件之间也可以相互的引用，具体参考vue文档。</p>
<p>为了方便我们测试，我们以home为例，其他组件也类似，方便等下测试，等项目能完整跑起来你在自己去添加组件里面的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
     <div>home</div>
</template>
<script>
     // js
</script>
<style>
     /*style*/
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>home<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
     <span class="hljs-comment">// js</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
     <span class="hljs-comment">/*style*/</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h3 id="articleHeader6">6. 运行webpack</h3>
<p>关于一个单页面的大体的框架我们已经搭建好了，现在直接运行webpack就能把文件载出来了。然后打开index.html直接测试就好了。更详细的demo已经提交到github上了 <a href="https://github.com/cwsjoker/webpack-vue-spa-demo/tree/master" rel="nofollow noreferrer" target="_blank">demo</a>,还有本人使用webpack+vue+es6+sass的技术栈重构的<a href="https://github.com/cwsjoker/Cnode-vue-spa" rel="nofollow noreferrer" target="_blank">Cnode中文网</a>单页面应用，感兴趣的可以围观下，欢迎star。</p>
<h3 id="articleHeader7">7.开发模式</h3>
<p>在实际开发过程中我们肯定不是每一次修改保存，然后在运行一下webpack命令，那样就太麻烦了，所以我们用到了热替换，webpack-dev-server这个包，安装好这个包后在pack.json加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server --hot --inline&quot;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --hot --inline"</span>
}
</code></pre>
<p>并且把webpack.config.js这前我们配置好的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 指向异步加载的路径
 publicPath : __dirname + '/build/';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 指向异步加载的路径</span>
 <span class="hljs-string">publicPath :</span> __dirname + <span class="hljs-string">'/build/'</span>;</code></pre>
<p>替换为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 指向异步加载的路径
 publicPath : '/build/';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 指向异步加载的路径</span>
 <span class="hljs-string">publicPath :</span> <span class="hljs-string">'/build/'</span>;</code></pre>
<p>为什么这样做呢？因为我们这前用webpack是把组件异步加载在本地上，而我们用了热替换后是地址委托到了<a href="http://localhost:8080/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/</a>端口了，所以要去掉__dirname(指向本地根目录),一切准备完毕了，接下来直接运行npm start，然后打开<a href="http://localhost:8080/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/</a>就可以访问，试着修改内容保存可以看看页面实时的在刷新，是不是省了很多的开发时间呢！</p>
<h3 id="articleHeader8">关于vue-cli</h3>
<p>vue.js的原作者为了方便我们做项目前期花费时间配置這些自动化构建工具，出了一个vue-cli的脚手架，可以自动生成项目的一系列基本配置。vue-cli的github地址为<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs/vue-cli</a>，感兴趣的童鞋可以去了解下。</p>
<h3 id="articleHeader9">关于vue2.0</h3>
<p>2.0已经出来了，相信以后大家也要慢慢跟上2.0的版本了，2.0在1.0的基础上构建这边有一点点和1.0的区别，听我讲来。<br>在评论里有位同学说2.0已经不支持1.0的路由方式了，恩，的确是，这里我把2.0的路由方式重新写了下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
const Home = resolve => {
    require.ensure(['./vue/home.vue'], () => {
        resolve(require('./vue/home.vue'));
    });
};
const List = resolve => {
    require.ensure(['./vue/list.vue'], () => {
        resolve(require('./vue/list.vue'));
    });
};
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },{
        path: '/list',
        name: 'list',
        component: List
    },{
        path: '*',
        component: Home
    }];
const router = new VueRouter({
    mode: 'history',
    routes
});
new Vue({
    router
}).$mount('#app');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">var</span> Vue = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue'</span>);
<span class="hljs-keyword">var</span> VueRouter = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-router'</span>);
Vue.<span class="hljs-keyword">use</span>(VueRouter);
<span class="hljs-keyword">const</span> Home = resolve =&gt; {
    <span class="hljs-keyword">require</span>.ensure([<span class="hljs-string">'./vue/home.vue'</span>], () =&gt; {
        resolve(<span class="hljs-keyword">require</span>(<span class="hljs-string">'./vue/home.vue'</span>));
    });
};
<span class="hljs-keyword">const</span> <span class="hljs-keyword">List</span> = resolve =&gt; {
    <span class="hljs-keyword">require</span>.ensure([<span class="hljs-string">'./vue/list.vue'</span>], () =&gt; {
        resolve(<span class="hljs-keyword">require</span>(<span class="hljs-string">'./vue/list.vue'</span>));
    });
};
<span class="hljs-keyword">const</span> routes = [{
        path: <span class="hljs-string">'/'</span>,
        name: <span class="hljs-string">'home'</span>,
        component: Home
    },{
        path: <span class="hljs-string">'/list'</span>,
        name: <span class="hljs-string">'list'</span>,
        component: <span class="hljs-keyword">List</span>
    },{
        path: <span class="hljs-string">'*'</span>,
        component: Home
    }];
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
    mode: <span class="hljs-string">'history'</span>,
    routes
});
<span class="hljs-keyword">new</span> Vue({
    router
}).$mount(<span class="hljs-string">'#app'</span>);</code></pre>
<p>更多有关于路由的问题请参考<a href="http://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router2.0中文文档</a>。<br>还有一点问题是如果是用webpack构建项目的时候，要在webpack.confing.js的配置文件加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">alias</span>: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.js'</span>
    }
 }</code></pre>
<p>因为vue2.0有两种构建模式，默认情况下运行构建，但是不能解析单文件的template模板，所以要使用独立构建。具体可以参考<a href="https://vuefe.cn/guide/installation.html" rel="nofollow noreferrer" target="_blank">vue2.0中文文档</a>，其他一些关于语法的改变看下2.0的文档就行了，还有vuex不被2.0影响，可以兼容。</p>
<h4>寄语：</h4>
<p>觉得本篇文章对你有帮助的话可以关注我一下，后期会出一些关于基于vue.js开发单页面开发心得，谢谢！<br>代码已上传在<a href="https://github.com/cwsjoker" rel="nofollow noreferrer" target="_blank">github</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack配合vue.js实现完整的单页面demo

## 原文链接
[https://segmentfault.com/a/1190000005768273](https://segmentfault.com/a/1190000005768273)


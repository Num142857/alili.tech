---
title: '手动搭建vue+node单页面（一）' 
date: 2018-12-05 2:30:09
hidden: true
slug: uophfsb3p3l
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>这里提供手动搭建vue单页面开发生产环境，并使用node写后台代码，仅供小白参考；<br>代码虽然没多少，但牵扯的知识很多，需要逐个研究；</blockquote>
<p>后续内容《手动搭建vue+node单页面（二）》<br><a href="https://segmentfault.com/a/1190000014384817?utm_source=channel-newest">https://segmentfault.com/a/11...</a></p>
<p>项目地址：<a href="https://github.com/liubingyang/vue-spa" rel="nofollow noreferrer" target="_blank">https://github.com/liubingyan...</a></p>
<p>内容提要：vue2,webpack,express,router,jsonp，这一章会从0到开发环境，生产环境的搭建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="思路：
先实现webpack单页面的demo
->
然后实现express服务下的开发环境
->
再实现开发·生产环境的切换
->
最后做业务相关的页面和后端开发
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>思路：
先实现webpack单页面的demo
-<span class="ruby">&gt;
</span>然后实现express服务下的开发环境
-<span class="ruby">&gt;
</span>再实现开发·生产环境的切换
-<span class="ruby">&gt;
</span>最后做业务相关的页面和后端开发
</code></pre>
<blockquote>一、创建项目：</blockquote>
<p>1.初始化项目:在桌面新建文件夹test,在test目录下命令行输入npm init -y;<br>2.test下创建src文件夹（前端所有代码）；<br>build文件夹(打包相关的webpack配置文件)；<br>service文件夹(存放后端代码)；<br>data文件夹(存放json数据)；<br>server.js(node服务)</p>
<p><span class="img-wrap"><img data-src="/img/bV8kQu?w=279&amp;h=182" src="https://static.alili.tech/img/bV8kQu?w=279&amp;h=182" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>二、下面我们先做单页面,先不管服务的事情</blockquote>
<p>在src目录中创建views(存放所有.vue组件)，router(存放前端路由配置),store(存放vuex配置),man.js(单页面入口文件),app.vue（单页面首页组件）,test下创建index.html作为载体。</p>
<p><span class="img-wrap"><img data-src="/img/bV8kTl?w=208&amp;h=285" src="https://static.alili.tech/img/bV8kTl?w=208&amp;h=285" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>接下来要做几件事完成单页面demo：<br>  （1）编写入口文件main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
const Vue from 'vue'
const App from './app'

new Vue({
  el:'#app',
  render:h=>h(App)
})

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">const</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">const</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>:<span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>:<span class="hljs-function"><span class="hljs-params">h</span>=&gt;</span>h(App)
})

</code></pre>
<p>（2）单页面主体app.vue;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.vue
<template>
<div>
    "{{"msg"}}"
</div>
</template>
<script>
export default{
    data(){
        return  {
            msg:'this is my app!'
        }
    }
}
</script>
<style lang='less'>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//app.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
        <span class="hljs-keyword">return</span>  {
            <span class="hljs-attr">msg</span>:<span class="hljs-string">'this is my app!'</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">'less'</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>(3)接下来是配置文件：在build文件夹中创建webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
const path = require('path')
module.exports = {
mode:'development',//webpack4新加的，不写会报黄
entry: {
    main: path.resolve(__dirname, '../src/main.js')
},
output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: 'http://localhost:3000/',
    filename: '[name].js'
},
module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                'less': [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        }
    }, 
    {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },]
},
resolve: {
alias: {//开发环境使用vue.esm.js',官网有说明
        'vue$': 'vue/dist/vue.esm.js'
    },
    //reuqire加载文件会自动为以下后缀的文件（如：./app.vue可以写成./app了）
    extensions: ['*', '.js', '.vue', '.json']
  },
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//webpack.config.js</span>
const path = require(<span class="hljs-string">'path'</span>)
module.exports = {
<span class="hljs-string">mode:</span><span class="hljs-string">'development'</span>,<span class="hljs-comment">//webpack4新加的，不写会报黄</span>
<span class="hljs-string">entry:</span> {
<span class="hljs-symbol">    main:</span> path.resolve(__dirname, <span class="hljs-string">'../src/main.js'</span>)
},
<span class="hljs-string">output:</span> {
<span class="hljs-symbol">    path:</span> path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
<span class="hljs-symbol">    publicPath:</span> <span class="hljs-string">'http://localhost:3000/'</span>,
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">'[name].js'</span>
},
<span class="hljs-string">module:</span> {
<span class="hljs-symbol">    rules:</span> [{
<span class="hljs-symbol">        test:</span> <span class="hljs-regexp">/\.vue$/</span>,
<span class="hljs-symbol">        loader:</span> <span class="hljs-string">'vue-loader'</span>,
<span class="hljs-symbol">        options:</span> {
<span class="hljs-symbol">            loaders:</span> {
                <span class="hljs-string">'less'</span>: [
                    <span class="hljs-string">'vue-style-loader'</span>,
                    <span class="hljs-string">'css-loader'</span>,
                    <span class="hljs-string">'less-loader'</span>
                ]
            }
        }
    }, 
    {
<span class="hljs-symbol">    test:</span> <span class="hljs-regexp">/\.js$/</span>,
<span class="hljs-symbol">    loader:</span> <span class="hljs-string">'babel-loader'</span>,
<span class="hljs-symbol">    exclude:</span> <span class="hljs-regexp">/node_modules/</span>
  },]
},
<span class="hljs-string">resolve:</span> {
<span class="hljs-string">alias:</span> {<span class="hljs-comment">//开发环境使用vue.esm.js',官网有说明</span>
        <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>
    },
    <span class="hljs-comment">//reuqire加载文件会自动为以下后缀的文件（如：./app.vue可以写成./app了）</span>
<span class="hljs-symbol">    extensions:</span> [<span class="hljs-string">'*'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>]
  },
}
</code></pre>
<p>接下来就是要启动项目了，不过要先安装各种插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue
vue-loader
webpack
css-laoder
sass-loader
vue-style-loader
babel-loader
````" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>vue
vue-loader
webpack
css-laoder
sass-loader
vue-style-loader
babel-loader
````</code></pre>
<p>不全，缺什么根据提示慢慢装</p>
<p>应为最终我们启动项目是用server.js启动，所以在这里我们这样写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server.js
const webpack=require('webpack')
const webpackConfig=require('./build/webpack.config')

webpack(webpackConfig,function(err,stats){
if(err) throw err
//输出打包信息（不用在意这些细节）
 process.stdout.write(stats.toString({
     colors: true,
     modules: false,
     children: false,
     chunks: false,
     chunkModules: false
 }) + '\n\n')
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//server.js</span>
<span class="hljs-keyword">const</span> webpack=<span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> webpackConfig=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./build/webpack.config'</span>)

webpack(webpackConfig,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,stats</span>)</span>{
<span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> err
<span class="hljs-comment">//输出打包信息（不用在意这些细节）</span>
 process.stdout.write(stats.toString({
     <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
     <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
     <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>,
     <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
     <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
 }) + <span class="hljs-string">'\n\n'</span>)
})
</code></pre>
<p>然后执行打包(在test目录下)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span> <span class="hljs-title">server</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8lH0?w=437&amp;h=180" src="https://static.alili.tech/img/bV8lH0?w=437&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>爆红就好好看看是语法错误还是少插件，一会儿就能解决。</p>
<p>看下效果，忘记，index.html要先写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html
<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <title></title>
</head>
<body>
    <div id='app'></div>
</body>
</html>
<script type=&quot;text/javascript&quot; src=&quot;./dist/main.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//index.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'app'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>打开index.html看看效果。</p>
<p><span class="img-wrap"><img data-src="/img/bV8lM3?w=738&amp;h=115" src="https://static.alili.tech/img/bV8lM3?w=738&amp;h=115" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>三、开始实现express启服和热加载</blockquote>
<p>接下来用express启服，同时实现webpack的热加载和server.js的热加载；</p>
<p>1.修改配置server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//server.js
const webpack=require('webpack')
const webpackConfig=require('./build/webpack.config')
//dev和hot用来实现前端的热加载
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express=require('express')
const path=require('path')

const app=express()

const compiler = webpack(webpackConfig)//删除了打印的回调函数，加上的话这里会执行两遍打包，不晓得为啥

app.use(webpackDevMiddleware(compiler,{
    // public path should be the same with webpack config
    //在项目中这样的路径都会配置到统一的文件中
    publicPath: 'http://localhost:3000/',
    noInfo: true,
    stats: {
        colors: true
    }
}))

app.use(webpackHotMiddleware(compiler))

app.listen(3000,function(){
    console.log('App  is now running on port 3000!');
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//server.js</span>
<span class="hljs-keyword">const</span> webpack=<span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> webpackConfig=<span class="hljs-keyword">require</span>(<span class="hljs-string">'./build/webpack.config'</span>)
<span class="hljs-comment">//dev和hot用来实现前端的热加载</span>
<span class="hljs-keyword">const</span> webpackDevMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)
<span class="hljs-keyword">const</span> webpackHotMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)
<span class="hljs-keyword">const</span> express=<span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> path=<span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">const</span> app=express()

<span class="hljs-keyword">const</span> compiler = webpack(webpackConfig)<span class="hljs-comment">//删除了打印的回调函数，加上的话这里会执行两遍打包，不晓得为啥</span>

app.<span class="hljs-keyword">use</span>(webpackDevMiddleware(compiler,{
    <span class="hljs-comment">// public path should be the same with webpack config</span>
    <span class="hljs-comment">//在项目中这样的路径都会配置到统一的文件中</span>
    publicPath: <span class="hljs-string">'http://localhost:3000/'</span>,
    noInfo: <span class="hljs-keyword">true</span>,
    stats: {
        colors: <span class="hljs-keyword">true</span>
    }
}))

app.<span class="hljs-keyword">use</span>(webpackHotMiddleware(compiler))

app.listen(<span class="hljs-number">3000</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    console.log(<span class="hljs-string">'App  is now running on port 3000!'</span>);
})
</code></pre>
<p>2.修改两个地方：webpack配置和index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
   // webpack.config.js
const path = require('path')
const webpack=require('webpack')
const htmlPlugin=require('html-webpack-plugin')
//增加页面热加载字段，添加到entry中（固定写法）
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

module.exports = {
    mode: 'development',
    entry: {
    //就是这样写就对 了
            main: [path.resolve(__dirname, '../src/main.js'),hotMiddlewareScript]
        },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'http://localhost:3000/',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': [
                        'vue-style-loader',
                        'css-loader',
                        'less-loader'
                    ]
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    //新增html插件，生成main.js的同时生成index.html
    plugins:[
        new htmlPlugin({
            template:'index.html'
        }),
        //热加载需要使用这个插件才起作用
        new webpack.HotModuleReplacementPlugin(),
    ]
}                " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>
   <span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> webpack=<span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> htmlPlugin=<span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">//增加页面热加载字段，添加到entry中（固定写法）</span>
<span class="hljs-keyword">const</span> hotMiddlewareScript = <span class="hljs-string">'webpack-hot-middleware/client?reload=true'</span>

<span class="hljs-built_in">module</span>.exports = {
    mode: <span class="hljs-string">'development'</span>,
    entry: {
    <span class="hljs-comment">//就是这样写就对 了</span>
            main: [path.resolve(__dirname, <span class="hljs-string">'../src/main.js'</span>),hotMiddlewareScript]
        },
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
        publicPath: <span class="hljs-string">'http://localhost:3000/'</span>,
        filename: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-keyword">module</span>: {
        rules: [{
            test: <span class="hljs-regexp">/\.vue$/</span>,
            loader: <span class="hljs-string">'vue-loader'</span>,
            options: {
                loaders: {
                    <span class="hljs-string">'scss'</span>: [
                        <span class="hljs-string">'vue-style-loader'</span>,
                        <span class="hljs-string">'css-loader'</span>,
                        <span class="hljs-string">'less-loader'</span>
                    ]
                }
            }
        }, {
            test: <span class="hljs-regexp">/\.js$/</span>,
            loader: <span class="hljs-string">'babel-loader'</span>,
            exclude: <span class="hljs-regexp">/node_modules/</span>
        }, ]
    },
    resolve: {
        alias: {
            <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>
        },
        extensions: [<span class="hljs-string">'*'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>]
    },
    <span class="hljs-comment">//新增html插件，生成main.js的同时生成index.html</span>
    plugins:[
        <span class="hljs-keyword">new</span> htmlPlugin({
            template:<span class="hljs-string">'index.html'</span>
        }),
        <span class="hljs-comment">//热加载需要使用这个插件才起作用</span>
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    ]
}                </code></pre>
<p><strong>然后index.html改动就是删除自己写的script标签就好。</strong></p>
<p>3.启动项目之前全局安装一个插件：(前端有了热加载，这个是为了后端的热加载，修改服务或者打包配置文件不用手动重启服务。)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm i supervisor -g
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> npm <span class="hljs-selector-tag">i</span> supervisor -g
 </code></pre>
<p>然后修改package.json中的scripts</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//package.json
&quot;scripts&quot;: {
&quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
 //这句话是说：监控（-w）后定义的文件或者文件夹 -e表示-w监控的文件夹中的js文件发生变化时重启server.js
&quot;start&quot;: &quot;supervisor -w server,build,server.js -e js server&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//package.json</span>
<span class="hljs-string">"scripts"</span>: {
<span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>,
 <span class="hljs-comment">//这句话是说：监控（-w）后定义的文件或者文件夹 -e表示-w监控的文件夹中的js文件发生变化时重启server.js</span>
<span class="hljs-string">"start"</span>: <span class="hljs-string">"supervisor -w server,build,server.js -e js server"</span></code></pre>
<p>},</p>
<p>4.接下来激动人心的时刻，启动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> start
</span></code></pre>
<p>打开localhost:3000</p>
<p><span class="img-wrap"><img data-src="/img/bV8mHg?w=473&amp;h=283" src="https://static.alili.tech/img/bV8mHg?w=473&amp;h=283" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>按下f12看看有没有报错，当当当当，没有报错，现在已经完成了一个简单但功能完善的开发环境；</p>
<blockquote>四、署下生产环境</blockquote>
<p>部署生产环境我们要做几件事：<br>1.build新建config.js，配置一些通用设置；<br>2.build新建webpack.config.dev.js，区分开发模式和生产模式的配置，其实可以写在一个文件中，弊端就是代码太长，而且开发模式require()的组件比较多，生产模式没必要加载，所以分开；<br>3.修改server.js，webpack.js和package.json文件;</p>
<p>我们先修改package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//通过设置node环境中process.ENV属性，来告诉webpack和server应该运行在哪个环境，cross-env NODE_ENV就是用来设置process.ENV的；
//package.json
&quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;start&quot;: &quot;supervisor -w server,build,server.js -e js,html server&quot;,
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development supervisor -w server,build,server.js -e js,html server&quot;,
    &quot;pro&quot;: &quot;cross-env NODE_ENV=production node server&quot;
},
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//通过设置node环境中process.ENV属性，来告诉webpack和server应该运行在哪个环境，cross-env NODE_ENV就是用来设置process.ENV的；</span>
<span class="hljs-comment">//package.json</span>
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"supervisor -w server,build,server.js -e js,html server"</span>,
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development supervisor -w server,build,server.js -e js,html server"</span>,
    <span class="hljs-string">"pro"</span>: <span class="hljs-string">"cross-env NODE_ENV=production node server"</span>
},
</code></pre>
<p>cross-env需要安装下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i cross-env -save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>npm <span class="hljs-built_in">i</span> <span class="hljs-built_in">cross</span>-env -save
</code></pre>
<p>再运行开发环境就用npm run dev ,生产就用npm run pro</p>
<p>接下来在build文件夹下创建并配置config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//config.js
//简单配置够用就好，完整的配置可以到vue全家桶中学习
const path=require('path')

let isdev=process.env.NODE_ENV=='development'?true:false

let config={
    isdev:isdev,
    publicPath:'http://localhost:3000/',
    port:'3000'
}

module.exports=config
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//config.js</span>
<span class="hljs-comment">//简单配置够用就好，完整的配置可以到vue全家桶中学习</span>
<span class="hljs-keyword">const</span> path=<span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-keyword">let</span> isdev=process.env.NODE_ENV==<span class="hljs-string">'development'</span>?<span class="hljs-literal">true</span>:<span class="hljs-literal">false</span>

<span class="hljs-keyword">let</span> config={
    <span class="hljs-attr">isdev</span>:isdev,
    <span class="hljs-attr">publicPath</span>:<span class="hljs-string">'http://localhost:3000/'</span>,
    <span class="hljs-attr">port</span>:<span class="hljs-string">'3000'</span>
}

<span class="hljs-built_in">module</span>.exports=config
</code></pre>
<p>在build下创建并编辑webpack.dev.config.js(把之前的webpack.config.js复制一下)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//webpack.config.dev.js(只展示不同的地方)
//....
//新增通用配置文件
const config = require('./config')
//....
output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.publicPath,//就是修改了输出的公网路径为配置文件中的路径
    filename: '[name].js'
},
plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //删除html模板(后面会解释)
        //new htmlPlugin({
        //        template:'index.html'
        //    }),
    ]
//....

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>
<span class="hljs-comment">//webpack.config.dev.js(只展示不同的地方)</span>
<span class="hljs-comment">//....</span>
<span class="hljs-comment">//新增通用配置文件</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = require(<span class="hljs-string">'./config'</span>)
<span class="hljs-comment">//....</span>
output: {
    path: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    publicPath: <span class="hljs-built_in">config</span>.publicPath,<span class="hljs-comment">//就是修改了输出的公网路径为配置文件中的路径</span>
    filename: <span class="hljs-string">'[name].js'</span>
},
plugins: [
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
        <span class="hljs-comment">//删除html模板(后面会解释)</span>
        <span class="hljs-comment">//new htmlPlugin({</span>
        <span class="hljs-comment">//        template:'index.html'</span>
        <span class="hljs-comment">//    }),</span>
    ]
<span class="hljs-comment">//....</span>

</code></pre>
<p>接下来修改webpack.config.js为生产环境配置(同样只列出不同的地方)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js

const config = require('./config')
//删除热加载
//const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
//新增文件清除插件
const cleanWebpackPlugin = require('clean-webpack-plugin')
    //....
    entry: {
        main:path.resolve(__dirname, '../src/main.js')//取消热加载
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: config.publicPath,
        filename: '[name].js'
    },
    //....
   resolve: {
        alias: {
            'vue$': 'vue/dist/vue.min.js'//生产使用压缩的vue文件
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        //删除热加载
        //new webpack.HotModuleReplacementPlugin(),
        //删除html模板（后面会解释)
        //new htmlPlugin({
        //        template:'index.html'
        //    }),
        //增加dist删除选项
        new cleanWebpackPlugin(['dist'], {
            &quot;root&quot;: path.resolve(__dirname, '../'),
        })
    ]
    //....
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//webpack.config.js</span>

<span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = require(<span class="hljs-string">'./config'</span>)
<span class="hljs-comment">//删除热加载</span>
<span class="hljs-comment">//const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'</span>
<span class="hljs-comment">//新增文件清除插件</span>
<span class="hljs-keyword">const</span> cleanWebpackPlugin = require(<span class="hljs-string">'clean-webpack-plugin'</span>)
    <span class="hljs-comment">//....</span>
    entry: {
        main:path.resolve(__dirname, <span class="hljs-string">'../src/main.js'</span>)<span class="hljs-comment">//取消热加载</span>
    },
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
        publicPath: <span class="hljs-built_in">config</span>.publicPath,
        filename: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-comment">//....</span>
   resolve: {
        alias: {
            <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.min.js'</span><span class="hljs-comment">//生产使用压缩的vue文件</span>
        },
        extensions: [<span class="hljs-string">'*'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>]
    },
    plugins: [
        <span class="hljs-comment">//删除热加载</span>
        <span class="hljs-comment">//new webpack.HotModuleReplacementPlugin(),</span>
        <span class="hljs-comment">//删除html模板（后面会解释)</span>
        <span class="hljs-comment">//new htmlPlugin({</span>
        <span class="hljs-comment">//        template:'index.html'</span>
        <span class="hljs-comment">//    }),</span>
        <span class="hljs-comment">//增加dist删除选项</span>
        <span class="hljs-keyword">new</span> cleanWebpackPlugin([<span class="hljs-string">'dist'</span>], {
            <span class="hljs-string">"root"</span>: path.resolve(__dirname, <span class="hljs-string">'../'</span>),
        })
    ]
    <span class="hljs-comment">//....</span>
</code></pre>
<p>最后修改server文件，觉得长可以试着分成开发生产两个文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//server.js
const webpack = require('webpack')
const webpackConfig = require('./build/webpack.config')
const webpackDevConfig = require('./build/webpack.config.dev')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const path = require('path')
//新增config和swig插件
const config = require('./build/config')
const swig = require('swig')
const app = express()

//swig一款js模板引擎，是服务端向客户端返回html的一种方式，swig只是众多引擎中的一种；
//这里通过node向页面返回html，而不是直接访问dist中的index.html，所以到这里已经把webpack中的html模板删掉了；
//如果使用webpack使用html插件，在切换生产和开发需要手动修改html的script;
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './'));

app.get('/', function(req, res) {
    res.type('text/html');
    res.render('index');
});

if (config.isdev) {
    console.log('server运行在开发环境')
    const compiler = webpack(webpackDevConfig)

    app.use(webpackDevMiddleware(compiler, {
        // public path should be the same with webpack config
        publicPath: 'http://localhost:3000/',
        stats: {
            colors: true
        }
    }))


    app.use(webpackHotMiddleware(compiler))

} else {
    console.log('server运行在生产环境')

    webpack(webpackConfig, function(err, stats) {
        if (err) throw err
        //输出打包信息（这里又可以用了）
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
        app.use(express.static(path.resolve(__dirname, './dist')))

    })
}
app.listen(config.port, function() {
    console.log('App  is now running on port 3000!');
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>
<span class="hljs-comment">//server.js</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> webpackConfig = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./build/webpack.config'</span>)
<span class="hljs-keyword">const</span> webpackDevConfig = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./build/webpack.config.dev'</span>)
<span class="hljs-keyword">const</span> webpackDevMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-dev-middleware'</span>)
<span class="hljs-keyword">const</span> webpackHotMiddleware = <span class="hljs-keyword">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)
<span class="hljs-keyword">const</span> express = <span class="hljs-keyword">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-keyword">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">//新增config和swig插件</span>
<span class="hljs-keyword">const</span> config = <span class="hljs-keyword">require</span>(<span class="hljs-string">'./build/config'</span>)
<span class="hljs-keyword">const</span> swig = <span class="hljs-keyword">require</span>(<span class="hljs-string">'swig'</span>)
<span class="hljs-keyword">const</span> app = express()

<span class="hljs-comment">//swig一款js模板引擎，是服务端向客户端返回html的一种方式，swig只是众多引擎中的一种；</span>
<span class="hljs-comment">//这里通过node向页面返回html，而不是直接访问dist中的index.html，所以到这里已经把webpack中的html模板删掉了；</span>
<span class="hljs-comment">//如果使用webpack使用html插件，在切换生产和开发需要手动修改html的script;</span>
app.engine(<span class="hljs-string">'html'</span>, swig.renderFile);
app.set(<span class="hljs-string">'view engine'</span>, <span class="hljs-string">'html'</span>);
app.set(<span class="hljs-string">'views'</span>, path.resolve(__dirname, <span class="hljs-string">'./'</span>));

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
    res.type(<span class="hljs-string">'text/html'</span>);
    res.render(<span class="hljs-string">'index'</span>);
});

<span class="hljs-keyword">if</span> (config.isdev) {
    console.log(<span class="hljs-string">'server运行在开发环境'</span>)
    <span class="hljs-keyword">const</span> compiler = webpack(webpackDevConfig)

    app.<span class="hljs-keyword">use</span>(webpackDevMiddleware(compiler, {
        <span class="hljs-comment">// public path should be the same with webpack config</span>
        publicPath: <span class="hljs-string">'http://localhost:3000/'</span>,
        stats: {
            colors: <span class="hljs-keyword">true</span>
        }
    }))


    app.<span class="hljs-keyword">use</span>(webpackHotMiddleware(compiler))

} <span class="hljs-keyword">else</span> {
    console.log(<span class="hljs-string">'server运行在生产环境'</span>)

    webpack(webpackConfig, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(err, stats)</span> </span>{
        <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
        <span class="hljs-comment">//输出打包信息（这里又可以用了）</span>
        process.stdout.write(stats.toString({
            colors: <span class="hljs-keyword">true</span>,
            modules: <span class="hljs-keyword">false</span>,
            children: <span class="hljs-keyword">false</span>,
            chunks: <span class="hljs-keyword">false</span>,
            chunkModules: <span class="hljs-keyword">false</span>
        }) + <span class="hljs-string">'\n\n'</span>)
        app.<span class="hljs-keyword">use</span>(express.<span class="hljs-keyword">static</span>(path.resolve(__dirname, <span class="hljs-string">'./dist'</span>)))

    })
}
app.listen(config.port, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    console.log(<span class="hljs-string">'App  is now running on port 3000!'</span>);
})
</code></pre>
<p>运行之前先装下swig插件，同时修改下index.html,手写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html
<script type=&quot;text/javascript&quot; src=&quot;main.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//index.html
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>到目前为止的目录结构：<br><span class="img-wrap"><img data-src="/img/bV8r1w?w=228&amp;h=485" src="https://static.alili.tech/img/bV8r1w?w=228&amp;h=485" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>环境搭建完成了，业务代码及后端逻辑下篇再讲；<br>《手动搭建vue+node单页面（二）》<br><a href="https://segmentfault.com/a/1190000014384817?utm_source=channel-newest">https://segmentfault.com/a/11...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手动搭建vue+node单页面（一）

## 原文链接
[https://segmentfault.com/a/1190000014368466](https://segmentfault.com/a/1190000014368466)


---
title: 'webpack+vue+vueRouter模块化构建完整项目实例超详细步骤（附截图、代码、入门篇）' 
date: 2019-01-19 2:30:10
hidden: true
slug: tm4iop2q2gc
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>&gt;开始</strong>（确认已经安装node环境和npm包管理工具）</p>
<p>1、新建项目文件名为vuedemo</p>
<p>2、<code>npm init -y</code> 初始化项目</p>
<p><span class="img-wrap"><img data-src="/img/bVKfw6?w=332&amp;h=209" src="https://static.alili.tech/img/bVKfw6?w=332&amp;h=209" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>&gt;安装项目依赖</strong></p>
<p>3、<code>npm install --save vue</code> 默认安装最新版vue</p>
<p>4、<code>npm install --save-dev webpack webpack-dev-server</code> 安装webpack，webpack-dev-server（是一个小型的Node.js Express服务器）</p>
<p>*拓展：npm install 在安装 npm 包时，有两种命令参数可以把它们的信息写入 package.json 文件，一个是npm install --save另一个是 npm install --save-dev，他们表面上的区别是--save 会把依赖包名称添加到 package.json 文件 dependencies 键下，--save-dev 则添加到 package.json 文件 devDependencies 键下，<br>--save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。*</p>
<p><span class="img-wrap"><img data-src="/img/bVKfDd?w=331&amp;h=251" src="https://static.alili.tech/img/bVKfDd?w=331&amp;h=251" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>5、<code>npm install --save-dev babel-core babel-loader babel-preset-es2015</code> 安装babel，babel的作用是将es6的语法编译成浏览器认识的语法es5</p>
<p><span class="img-wrap"><img data-src="/img/bVKfEO?w=399&amp;h=238" src="https://static.alili.tech/img/bVKfEO?w=399&amp;h=238" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>6、<code>npm install --save-dev vue-loader vue-template-compiler</code> 用来解析vue的组件，.vue后缀的文件</p>
<p>7、<code>npm install --save-dev css-loader style-loader</code> 用来解析css</p>
<p><em>拓展：css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(…)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。</em></p>
<p>8、<code>npm install --save-dev url-loader file-loader</code> 用于打包文件和图片</p>
<p>9、<code>npm install --save-dev sass-loader node-sass</code> 用于编译sass</p>
<p>10、<code>npm install --save-dev vue-router</code> 安装路由</p>
<p><strong>&gt;编辑项目目录以及添加代码</strong></p>
<p>11、文件目录如下；</p>
<p><span class="img-wrap"><img data-src="/img/bVKf1k?w=321&amp;h=530" src="https://static.alili.tech/img/bVKf1k?w=321&amp;h=530" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>//dist文件是后面执行webpack指令生产的，不用管；</p>
<p>//webpack.config.js 配置文件，本身也是一个标准的Commonjs规范的模块；</p>
<p>//routes.js文件放路由配置文件；</p>
<p>//index.html首页入口文件</p>
<p>//App.vue是项目入口文件。</p>
<p>//main.js这是项目的核心文件。全局的配置都在这个文件里面配置。</p>
<p>//commponents目录里面放了公共组件header文件。</p>
<p>//views文件放详情页面；</p>
<p><strong>&gt;代码</strong><br>//webpack.config.js<br>*注释：<br>test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须） <br><strong>loader：</strong>loader的名称（必须） <br>include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；*</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',//值可以是字符串、数组或对象
    output: {
        path: path.resolve(__dirname, './dist'),//Webpack结果存储
        publicPath: '/dist/',//懵懂，懵逼，//然而“publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
            //自己加的
            ,
            {
                test: /\.css$/,
                loader: &quot;style-loader!css-loader&quot;
            }
            ,
            {
                test: /\.scss$/,
                loader: &quot;style-loader!css-loader!sass-loader!&quot;
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    devServer: {//webpack-dev-server配置
        historyApiFallback: true,//不跳转
        noInfo: true,
        inline: true//实时刷新
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '&quot;production&quot;'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)

<span class="hljs-built_in">module</span>.exports = {
    entry: <span class="hljs-string">'./src/main.js'</span>,<span class="hljs-comment">//值可以是字符串、数组或对象</span>
    output: {
        path: path.resolve(__dirname, <span class="hljs-string">'./dist'</span>),<span class="hljs-comment">//Webpack结果存储</span>
        publicPath: <span class="hljs-string">'/dist/'</span>,<span class="hljs-comment">//懵懂，懵逼，//然而“publicPath”项则被许多Webpack的插件用于在生产模式和开发模式下下更新内嵌到css、html，img文件里的url值</span>
        filename: <span class="hljs-string">'build.js'</span>
    },
    <span class="hljs-keyword">module</span>: {
        rules: [
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">'vue-loader'</span>,
                options: {
                    loaders: {
                    }
                    <span class="hljs-comment">// other vue-loader options go here</span>
                }
            },
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                loader: <span class="hljs-string">'babel-loader'</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>
            },
            {
                test: <span class="hljs-regexp">/\.(png|jpg|gif|svg)$/</span>,
                loader: <span class="hljs-string">'file-loader'</span>,
                options: {
                    name: <span class="hljs-string">'[name].[ext]?[hash]'</span>
                }
            }
            <span class="hljs-comment">//自己加的</span>
            ,
            {
                test: <span class="hljs-regexp">/\.css$/</span>,
                loader: <span class="hljs-string">"style-loader!css-loader"</span>
            }
            ,
            {
                test: <span class="hljs-regexp">/\.scss$/</span>,
                loader: <span class="hljs-string">"style-loader!css-loader!sass-loader!"</span>
            }
        ]
    },
    resolve: {
        alias: {
            <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>
        }
    },
    devServer: {<span class="hljs-comment">//webpack-dev-server配置</span>
        historyApiFallback: <span class="hljs-literal">true</span>,<span class="hljs-comment">//不跳转</span>
        noInfo: <span class="hljs-literal">true</span>,
        inline: <span class="hljs-literal">true</span><span class="hljs-comment">//实时刷新</span>
    },
    performance: {
        hints: <span class="hljs-literal">false</span>
    },
    devtool: <span class="hljs-string">'#eval-source-map'</span>
}

<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
    <span class="hljs-built_in">module</span>.exports.devtool = <span class="hljs-string">'#source-map'</span>
    <span class="hljs-comment">// http://vue-loader.vuejs.org/en/workflow/production.html</span>
    <span class="hljs-built_in">module</span>.exports.plugins = (<span class="hljs-built_in">module</span>.exports.plugins || []).concat([
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env'</span>: {
                NODE_ENV: <span class="hljs-string">'"production"'</span>
            }
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            sourceMap: <span class="hljs-literal">true</span>,
            compress: {
                warnings: <span class="hljs-literal">false</span>
            }
        }),
        <span class="hljs-keyword">new</span> webpack.LoaderOptionsPlugin({
            minimize: <span class="hljs-literal">true</span>
        })
    ])
}

</code></pre>
<p>//routes.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引用模板
import Vue from 'vue';
import Router from 'vue-router';
import indexPage from './components/header.vue'
import homePage from './views/home.vue'
import aboutPage from './views/about.vue'

Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            component:homePage
        },
        {
            path:'/about',
            component:aboutPage
        }
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 引用模板</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-keyword">import</span> indexPage <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/header.vue'</span>
<span class="hljs-keyword">import</span> homePage <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/home.vue'</span>
<span class="hljs-keyword">import</span> aboutPage <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/about.vue'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">routes</span>:[
        {
            <span class="hljs-attr">path</span>:<span class="hljs-string">'/'</span>,
            <span class="hljs-attr">component</span>:homePage
        },
        {
            <span class="hljs-attr">path</span>:<span class="hljs-string">'/about'</span>,
            <span class="hljs-attr">component</span>:aboutPage
        }
    ]
})</code></pre>
<p>//index.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<body>
    <div id=&quot;appIndex&quot;>

    </div>
    <script src=&quot;./dist/build.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"appIndex"</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>//App.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--App.vue是项目入口文件。-->
<template>
    <div id=&quot;app&quot;>
        <header-tab></header-tab>
        <h2>"{{"msg"}}"</h2>
        <div class=&quot;nav-box&quot;>
            <p class=&quot;nav-list&quot;>
                <router-link class=&quot;nav-item&quot; to=&quot;/&quot;>首页</router-link>
                <router-link class=&quot;nav-item&quot; to=&quot;/about&quot;>关于</router-link>
            </p>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeaderTab from './components/header.vue';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    HeaderTab
  }
}
</script>

<style lang=&quot;sass&quot;>
   /*这里sass编译正常*/
    $redColor:#f00;
    h2{
        color:$redColor;
    }
    #app {
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        text-align: left;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-comment">&lt;!--App.vue是项目入口文件。--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header-tab</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">header-tab</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-box"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-list"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-item"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-item"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>关于<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> HeaderTab <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/header.vue'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>
    }
  },
  <span class="hljs-attr">components</span>:{
    HeaderTab
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="undefined">
   /*这里sass编译正常*/
    $redColor:#f00;
    h2{
        color:$redColor;
    }
    #app {
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        text-align: left;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>//main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js这是项目的核心文件。全局的配置都在这个文件里面配置
import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'

import './assets/styles/base.css'
//import './assets/sass/reset.sass'//报错暂时不用sass
Vue.config.debug = true;//开启错误提示

new Vue({
        router,
        el: '#appIndex',
        render: h => h(App)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//main.js这是项目的核心文件。全局的配置都在这个文件里面配置</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./routes.js'</span>

<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/styles/base.css'</span>
<span class="hljs-comment">//import './assets/sass/reset.sass'//报错暂时不用sass</span>
Vue.config.debug = <span class="hljs-literal">true</span>;<span class="hljs-comment">//开启错误提示</span>

<span class="hljs-keyword">new</span> Vue({
        router,
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#appIndex'</span>,
        <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})
</code></pre>
<p>//commponents</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h1>共同header</h1>
        <img src=&quot;../assets/imgs/logo.png&quot;>
    </div>
</template>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>共同header<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/imgs/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

</code></pre>
<p><em>注意：别忘了添加图片</em></p>
<p>//views文件放详情页面；</p>
<p>about.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//about.vue
<template>
    <div>about</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//about.vue</span>
<span class="hljs-params">&lt;template&gt;</span>
    <span class="hljs-params">&lt;div&gt;</span>about<span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span></code></pre>
<p>home.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.vue
<template>
    <div>
        <ol>
            <li v-for=&quot;todo in todos&quot;>
                "{{" todo.text "}}"
            </li>
        </ol>
        <button @click=&quot;eClick()&quot;>事件</button>
    </div>
</template>

<script>
export default {
  name: 'indexP',
  data () {
    return {
       todos: [
          { text: 'Learn JavaScript' },
          { text: 'Learn Vue' },
          { text: 'Build something awesome' }
        ]
    }
  },
  methods:{
    eClick(){
        console.log(9999);
    }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//index.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ol</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"todo in todos"</span>&gt;</span>
                </span><span class="hljs-template-variable">"{{" todo.text "}}"</span><span class="xml">
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"eClick()"</span>&gt;</span>事件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'indexP'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
       <span class="hljs-attr">todos</span>: [
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn JavaScript'</span> },
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'Learn Vue'</span> },
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'Build something awesome'</span> }
        ]
    }
  },
  <span class="hljs-attr">methods</span>:{
    eClick(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-number">9999</span>);
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>//base.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1{
    color: #999;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">h1</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
}</code></pre>
<p>//reset.sass(这个屏蔽起来先，有报错，，)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//$redColor:#f00;
//h2{
//  color:$redColor;
//}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span><span class="hljs-variable">$redColor</span>:<span class="hljs-comment">#f00;</span>
<span class="hljs-regexp">//</span>h2{
<span class="hljs-regexp">//</span>  color:<span class="hljs-variable">$redColor</span>;
<span class="hljs-regexp">//</span>}</code></pre>
<p><strong>&gt;项目跑起来</strong></p>
<p>执行指令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">webpack</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVKf7z?w=534&amp;h=151" src="https://static.alili.tech/img/bVKf7z?w=534&amp;h=151" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>执行webpack-dev-server：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVKf8a?w=417&amp;h=89" src="https://static.alili.tech/img/bVKf8a?w=417&amp;h=89" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>浏览器打开生成的链接：如我这里是<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8083</p>
<p>首页详情页效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVKi9f?w=591&amp;h=603" src="https://static.alili.tech/img/bVKi9f?w=591&amp;h=603" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>关于详情页效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVKi9m?w=516&amp;h=521" src="https://static.alili.tech/img/bVKi9m?w=516&amp;h=521" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>ok，希望小伙伴们可以一次跑通项目流程<br>补充：<br><strong>把webpack和webpack-dev-server命令转成npm命令</strong></p>
<p>安装 across-env:npm install cross-env --save-dev</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install cross-env --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-built_in">cross</span>-env --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>package.json 文件添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --hot&quot;,
&quot;build&quot;: &quot;webpack&quot;


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development webpack-dev-server --open --hot"</span>,
<span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>


</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVKh8g?w=661&amp;h=169" src="https://static.alili.tech/img/bVKh8g?w=661&amp;h=169" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>ok，执行npm指令npm run dev,浏览器打开新窗口（相当于把npm的dev命令指向webpack-dev-server命令）；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>执行npm run build(相当于把npm的build指令指向webpack命令)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build




" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> build
</span>



</code></pre>
<p>遇到的问题：</p>
<p>1、外部引入.sass文件报错，&lt;style lang="sass"&gt;&lt;/style&gt;里面的sass语法编译正常；（上面我屏蔽了sass）<br>以上结尾。</p>
<p><strong>==================2018/01笔记===============================</strong><br><strong>vue-cli搭建vue项目流程</strong></p>
<p>1、下载安装node环境和npm包管理工具；(node -v;npm -v检查版本)；<br>2、npm install -g vue-cli;使用npm全局安装vue-cli；(vue -V)(1.在安装vue-cli时，已经自带安装webpack。)<br>3、vue init webpack projectname；生成项目模板（1.webpack是模板名称，这里我们需要使用webpack的打包功能，所以使用webpack；2.projectname是项目名称）<br>4、cd projectname<br>5、npm run dev<br>6、npm run bulid<br><strong>注意：文件目录路径不能有中文，会报错</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue+vueRouter模块化构建完整项目实例超详细步骤（附截图、代码、入门篇）

## 原文链接
[https://segmentfault.com/a/1190000008602934](https://segmentfault.com/a/1190000008602934)


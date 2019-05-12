---
title: 'webpack+vue+vueRouter模块化构建完整项目实例详细步骤-入门篇' 
date: 2019-01-05 2:30:10
hidden: true
slug: vq1vfmv2if
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">新建项目</h2>
<p>开始（确认已经安装node环境和npm包管理工具）</p>
<p>1、新建项目文件名为start_vuedemo</p>
<p>2、<code>npm init -y</code> 初始化项目，我的win7系统，工程在d盘的vue_test_project文件夹下的名为<code>start_vuedemo</code>的工程文件夹</p>
<p>如图所示：<br><span class="img-wrap"><img data-src="/img/bVStM3?w=549&amp;h=309" src="https://static.alili.tech/img/bVStM3?w=549&amp;h=309" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在该工程下自动生成一个<code>package.json</code>文件。</p>
<h2 id="articleHeader1">安装项目依赖</h2>
<p>3、<code>npm install --save vue</code> 默认安装最新版vue</p>
<p>4、<code>npm install --save-dev webpack webpack-dev-server 安装webpack，webpack-dev-server</code>（是一个小型的Node.js Express服务器）</p>
<blockquote><p>注：npm install 在安装 npm 包时，有两种命令参数可以把它们的信息写入 package.json 文件，一个是npm install --save另一个是 npm install --save-dev，他们表面上的区别是--save 会把依赖包名称添加到 package.json 文件 dependencies 键下，--save-dev 则添加到 package.json 文件 devDependencies 键下，<br>--save-dev 是你开发时候依赖的东西，--save 是你发布之后还依赖的东西。</p></blockquote>
<p>如下所示，在package.json文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.4.2&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^3.4.1&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.6.1&quot;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.4.2"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^3.4.1"</span>,
    <span class="hljs-string">"webpack-dev-server"</span>: <span class="hljs-string">"^2.6.1"</span>
  }
</code></pre>
<p>5、<code>npm install --save-dev babel-core babel-loader babel-preset-es2015</code> 安装babel，babel的作用是将es6的语法编译成浏览器认识的语法es5</p>
<p>这时，package.json部分增加代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.4.2&quot;
  },
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.25.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.1.1&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.24.1&quot;,
    &quot;webpack&quot;: &quot;^3.4.1&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.6.1&quot;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.4.2"</span>
  },
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.25.0"</span>,
    <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^7.1.1"</span>,
    <span class="hljs-string">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.24.1"</span>,
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^3.4.1"</span>,
    <span class="hljs-string">"webpack-dev-server"</span>: <span class="hljs-string">"^2.6.1"</span>
  }
</code></pre>
<p>6、<code>npm install --save-dev vue-loader vue-template-compiler</code> 用来解析vue的组件，.vue后缀的文件</p>
<p>7、<code>npm install --save-dev css-loader style-loader</code> 用来解析css</p>
<blockquote><p>拓展：css-loader 和 style-loader，二者处理的任务不同，css-loader使你能够使用类似@import 和 url(…)的方法实现 require()的功能,style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。</p></blockquote>
<p>8、<code>npm install --save-dev url-loader file-loader</code> 用于打包文件和图片</p>
<p>9、<code>npm install --save-dev sass-loader node-sass</code> 用于编译sass</p>
<p>10、<code>npm install --save-dev vue-router</code> 安装路由</p>
<h2 id="articleHeader2">编辑项目目录以及添加代码</h2>
<h3 id="articleHeader3">项目结构</h3>
<p>如图所示：<br><span class="img-wrap"><img data-src="/img/bVStNU?w=263&amp;h=442" src="https://static.alili.tech/img/bVStNU?w=263&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>结构说明：</p>
<ul>
<li>dist文件是后面执行webpack指令生产的，不用管；</li>
<li>webpack.config.js 配置文件，本身也是一个标准的Commonjs规范的模块；</li>
<li>routes.js文件放路由配置文件；</li>
<li>index.html首页入口文件</li>
<li>App.vue是项目入口文件。</li>
<li>main.js这是项目的核心文件。全局的配置都在这个文件里面配置。</li>
<li>commponents目录里面放了公共组件header文件。</li>
<li>views文件放详情页面；</li>
</ul>
<h4>webpack.config.js</h4>
<p>在项目根路径下新建webpack.config.js 配置文件，本身也是一个标准的Commonjs规范的模块；</p>
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
}" title="" data-original-title="复制"></span>
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
}</code></pre>
<p>解释：</p>
<ul>
<li>test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须） 。</li>
<li>loader：loader的名称（必须） 。</li>
<li>include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）。</li>
</ul>
<h4>routes.js</h4>
<p>下面的内容没有特殊说明，都是在根路径下新建的一个src文件夹，然后内容放置于src文件夹下面。</p>
<p>routes.js文件放路由配置文件，代码如下：</p>
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
<h4>新建一个index.html</h4>
<p>在根目录下新建一个index.html,这个index.html也即是首页入口文件，代码如下：</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title></title>
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
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"appIndex"</span>&gt;</span>

        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>说明下：引用的这个js是通过webpack指令生成的dist/build.js文件。这儿先引用吧</p>
<h4>App.vue</h4>
<p>在新建项目入口文件App.vue，当然也是在src文件夹下，代码如下：</p>
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

<style lang=&quot;scss&quot;>
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

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
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
<h4>main.js</h4>
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
<h4>commponents下的header.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h1>共同header</h1>
        <img src=&quot;../assets/images/logo.png&quot;>
    </div>
</template>
<style>
    @import '../assets/sass/common.scss'
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>共同header<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../assets/images/logo.png"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    @<span class="hljs-keyword">import</span> <span class="hljs-string">'../assets/sass/common.scss'</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>注意：这儿自己手动放一张logo图片到images文件夹下面。</p>
<h4>views文件放详情页面</h4>
<h5>about.vue</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//about.vue
<template>
    <div>about</div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">//about.vue</span>
<span class="hljs-params">&lt;template&gt;</span>
    <span class="hljs-params">&lt;div&gt;</span>about<span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span>
</code></pre>
<h5>home.vue</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
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
          { text: '首页第一段文本' },
          { text: '首页第二段文本' },
          { text: '首页第三段文本' }
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
<style scoped>
    ol{width:200px;margin:20px auto;}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
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
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'首页第一段文本'</span> },
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'首页第二段文本'</span> },
          { <span class="hljs-attr">text</span>: <span class="hljs-string">'首页第三段文本'</span> }
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
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">ol</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;<span class="hljs-attribute">margin</span>:<span class="hljs-number">20px</span> auto;}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<h4>css样式添加</h4>
<h5>base.css</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1{
    color: #999;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">h1</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#999</span>;
}
</code></pre>
<h5>reset.scss</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$redColor:#f00;
h2{
    color:$redColor;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-variable">$redColor</span>:<span class="hljs-number">#f00</span>;
<span class="hljs-selector-tag">h2</span>{
    <span class="hljs-attribute">color</span>:<span class="hljs-variable">$redColor</span>;
}
</code></pre>
<h2 id="articleHeader4">运行项目</h2>
<p>执行指令：<code>webpack</code><br><span class="img-wrap"><img data-src="/img/bVStPu?w=644&amp;h=260" src="https://static.alili.tech/img/bVStPu?w=644&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>执行webpack-dev-server：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>webpack-dev-<span class="hljs-keyword">server</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVStPD?w=555&amp;h=90" src="https://static.alili.tech/img/bVStPD?w=555&amp;h=90" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>浏览器打开生成的链接：<a href="http://localhost:8080/#/" rel="nofollow noreferrer" target="_blank">http://localhost:8080/#/</a></p>
<p>效果如图所示：<br><span class="img-wrap"><img data-src="/img/bVStPI?w=598&amp;h=506" src="https://static.alili.tech/img/bVStPI?w=598&amp;h=506" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>到这儿项目就运行起来了。</p>
<h2 id="articleHeader5">参考地址</h2>
<p><a href="https://segmentfault.com/a/1190000008602934">webpack+vue+vueRouter模块化构建完整项目实例超详细步骤（附截图、代码、入门篇）</a></p>
<p>其中参考地址里面是有一些问题的，比如sass的文件后缀为.sass的文件需要严格按照该后缀的格式写样式，不能有{}与；等。再一个就是在main.js中引入.sass文件是会报错的，最后的解决办法就是放到比如header.vue这样的vue文件中，以如下方法引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    @import '../assets/sass/reset.scss'
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    @<span class="hljs-keyword">import</span> <span class="hljs-string">'../assets/sass/reset.scss'</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue+vueRouter模块化构建完整项目实例详细步骤-入门篇

## 原文链接
[https://segmentfault.com/a/1190000010562062](https://segmentfault.com/a/1190000010562062)


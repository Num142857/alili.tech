---
title: 'webpack+vue项目实战（一,搭建运行环境和相关配置）' 
date: 2019-01-10 2:30:08
hidden: true
slug: w4ohgibs72o
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>现在正在开发一个公司的后台管理项目，项目是一个单页面应用。功能上就是管理销售订单的各个环节，包括物流管理，回款管理，订单管理等等的功能。这些就不多说了。项目是，基于<code>webpack3,vue2.2.6,element2.2.9</code>。js语法是使用es6,还有使用到的一些资源比如，<code>vue-router,vue-resource,webpack-dev-server</code>等。运行环境是<code>node6.10.0</code>,<code>npm3.10.10</code>，其它版本的小小伙伴要注意版本兼容的问题喔！</p>
<h2 id="articleHeader1">2.package.json</h2>
<p>好了，首页在创建项目目录（admin），下面进行项目的第一步，搭建环境。搭建环境的第一步，就是创建<code>package.json</code>，我现在就是简单粗暴的创建发-从之前的项目拷贝一个这样的文件，然后再改一下，代码就是下面这样。大家也可以<code>$ npm init</code>生成这个文件，然后再安装相关的依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;admin&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;后台管理系统&quot;,
  &quot;dependencies&quot;: {},
  &quot;devDependencies&quot;: {
    &quot;babel-cli&quot;: &quot;^6.10.1&quot;,
    &quot;babel-core&quot;: &quot;^6.14.0&quot;,
    &quot;babel-loader&quot;: &quot;^7.0.0&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.9.0&quot;,
    &quot;babel-preset-stage-0&quot;: &quot;^6.5.0&quot;,
    &quot;babel-register&quot;: &quot;^6.18.0&quot;,
    &quot;browser-sync&quot;: &quot;^2.18.2&quot;,
    &quot;css-loader&quot;: &quot;^0.25.0&quot;,
    &quot;ejs-compiled-loader&quot;: &quot;^2.1.1&quot;,
    &quot;element-ui&quot;: &quot;1.2.9&quot;,
    &quot;extract-text-webpack-plugin&quot;: &quot;^1.0.1&quot;,
    &quot;file-loader&quot;: &quot;^0.9.0&quot;,
    &quot;glob&quot;: &quot;^7.0.6&quot;,
    &quot;gulp&quot;: &quot;^3.9.1&quot;,
    &quot;gulp-file-include&quot;: &quot;^1.0.0&quot;,
    &quot;html-loader&quot;: &quot;^0.4.3&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^2.28.0&quot;,
    &quot;node-sass&quot;: &quot;^3.7.0&quot;,
    &quot;raw-loader&quot;: &quot;^0.5.1&quot;,
    &quot;sass-loader&quot;: &quot;^4.0.2&quot;,
    &quot;scss-loader&quot;: &quot;0.0.1&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;tween.js&quot;: &quot;^16.6.0&quot;,
    &quot;url-loader&quot;: &quot;^0.5.7&quot;,
    &quot;vue&quot;: &quot;2.2.6&quot;,
    &quot;vue-loader&quot;: &quot;^10.0.2&quot;,
    &quot;vue-resource&quot;: &quot;^1.0.3&quot;,
    &quot;vue-router&quot;: &quot;^2.4.0&quot;,
    &quot;vue-style-loader&quot;: &quot;^1.0.0&quot;,
    &quot;vue-template-compiler&quot;: &quot;2.2.6&quot;,
    &quot;vuex&quot;: &quot;^2.0.0&quot;,
    &quot;webpack&quot;: &quot;^3.0.0&quot;,
    &quot;webpack-dev-server&quot;: &quot;^2.4.5&quot;
  },
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;dev&quot;: &quot;webpack-dev-server --hot --inline&quot;
  },
  &quot;author&quot;: &quot;chen&quot;,
  &quot;license&quot;: &quot;ISC&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"admin"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"后台管理系统"</span>,
  <span class="hljs-attr">"dependencies"</span>: {},
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-cli"</span>: <span class="hljs-string">"^6.10.1"</span>,
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.14.0"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^7.0.0"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-preset-stage-0"</span>: <span class="hljs-string">"^6.5.0"</span>,
    <span class="hljs-attr">"babel-register"</span>: <span class="hljs-string">"^6.18.0"</span>,
    <span class="hljs-attr">"browser-sync"</span>: <span class="hljs-string">"^2.18.2"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.25.0"</span>,
    <span class="hljs-attr">"ejs-compiled-loader"</span>: <span class="hljs-string">"^2.1.1"</span>,
    <span class="hljs-attr">"element-ui"</span>: <span class="hljs-string">"1.2.9"</span>,
    <span class="hljs-attr">"extract-text-webpack-plugin"</span>: <span class="hljs-string">"^1.0.1"</span>,
    <span class="hljs-attr">"file-loader"</span>: <span class="hljs-string">"^0.9.0"</span>,
    <span class="hljs-attr">"glob"</span>: <span class="hljs-string">"^7.0.6"</span>,
    <span class="hljs-attr">"gulp"</span>: <span class="hljs-string">"^3.9.1"</span>,
    <span class="hljs-attr">"gulp-file-include"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-attr">"html-loader"</span>: <span class="hljs-string">"^0.4.3"</span>,
    <span class="hljs-attr">"html-webpack-plugin"</span>: <span class="hljs-string">"^2.28.0"</span>,
    <span class="hljs-attr">"node-sass"</span>: <span class="hljs-string">"^3.7.0"</span>,
    <span class="hljs-attr">"raw-loader"</span>: <span class="hljs-string">"^0.5.1"</span>,
    <span class="hljs-attr">"sass-loader"</span>: <span class="hljs-string">"^4.0.2"</span>,
    <span class="hljs-attr">"scss-loader"</span>: <span class="hljs-string">"0.0.1"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-attr">"tween.js"</span>: <span class="hljs-string">"^16.6.0"</span>,
    <span class="hljs-attr">"url-loader"</span>: <span class="hljs-string">"^0.5.7"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"2.2.6"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^10.0.2"</span>,
    <span class="hljs-attr">"vue-resource"</span>: <span class="hljs-string">"^1.0.3"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^2.4.0"</span>,
    <span class="hljs-attr">"vue-style-loader"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-attr">"vue-template-compiler"</span>: <span class="hljs-string">"2.2.6"</span>,
    <span class="hljs-attr">"vuex"</span>: <span class="hljs-string">"^2.0.0"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^3.0.0"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^2.4.5"</span>
  },
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --hot --inline"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"chen"</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>
}</code></pre>
<p>有了上面的配置，在命令行输入<code>$ npm install</code>就可以安装相关的依赖了！</p>
<blockquote><p>(<code>vue，vue-template-compiler，element-ui</code>这几个配置的版本号前面是没有<code>^</code>，这是因为项目上，我不需要再更新这些资源了，因为之前试过，因为版本更新了的问题，导致element显示不正常，所以，就固定住了这几个的版本！还有一个就是，这个是一个<code>json</code>文件，不能在这里写注释喔！否则会报错！)</p></blockquote>
<p>安装完了之后，项目目录应该是这样的。<br><span class="img-wrap"><img data-src="/img/bVQbH0?w=711&amp;h=251" src="https://static.alili.tech/img/bVQbH0?w=711&amp;h=251" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote><p>.idea是我用webStorm编辑器开发，自动生成的文件<br>node_modules是安装之后生成的node模块文件，<br>.npmrc是使用淘宝的镜像的文件，内容如下</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registry = http://registry.npm.taobao.org
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>registry = http://registry.npm.taobao.org
<span class="hljs-attr">sass_binary_site=</span>https://npm.taobao.org/mirrors/<span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>/
</code></pre>
<h2 id="articleHeader2">3.webpack.config.babel.js</h2>
<p>配置完了package.json之后，下面写<code>webpack</code>的配置文件（<code>webpack.config.babel.js</code>）了。</p>
<blockquote><p><code>webpack.config.babel.js</code>，这样命名是想让webpack在编译的时候自动识别es6的语法，现在貌似不需要这样命名了，之前用webpack1.x的时候貌似是需要的</p></blockquote>
<p><code>webpack</code>的配置，之前说过，也写过文章，这里就当简单复习一下，我就不一块块的说了，直接在代码那里写上注释。代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let path = require('path');
let webpack = require('webpack');
/*
 html-webpack-plugin插件，webpack中生成HTML的插件，
 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
let HtmlWebpackPlugin = require('html-webpack-plugin');
/*
 webpack插件，提取公共模块
 */
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let config = {
    //入口文件配置
    entry: {
        index: path.resolve(__dirname, 'src/js/page/index.js'),
        vendors: ['vue', 'vue-router','vue-resource','vuex','element-ui','element-ui/lib/theme-default/index.css'] // 需要进行单独打包的文件
    },
    //出口文件配置
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/dist/',                //模板、样式、脚本、图片等资源对应的server上的路径
        filename: 'js/[name].js',            //每个页面对应的主js的生成配置
        chunkFilename: 'js/[name].asyncChunk.js?'+new Date().getTime() //chunk生成的配置
    },
    module: {
        //加载器
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang=&quot;scss&quot;>
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang=&quot;sass&quot;>
                    }
                }
            },
            {
                test: /\.html$/,
                loader: &quot;raw-loader&quot;
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: &quot;babel-loader&quot;,
                options: {
                    presets: [&quot;es2015&quot;,&quot;stage-0&quot;],
                    plugins: ['syntax-dynamic-import']
                }
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&amp;name=images/[hash].[ext]'
            }
        ]
    },
    //插件
    plugins: [
        //webpack3.0的范围提升
        new webpack.optimize.ModuleConcatenationPlugin(),
        //打包生成html文件，并且将js文件引入进来
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'dist/html/index.html'), //生成的html存放路径，相对于path
            template: path.resolve(__dirname, 'src/html/index.html'), //ejs模板路径,前面最好加上loader用于处理
            inject: 'body',  //js插入的位置，true/'head'/'body'/false
            hash: true
        }),
        //提取功能模块
        new CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            minChunks: 2, //公共模块被使用的最小次数。配置为2，也就是同一个模块只有被2个以外的页面同时引用时才会被提取出来作为common chunks
            // children:true  //如果为true,那么公共组件的所有子依赖都将被选择进来
        }),
    ],
    //使用webpack-dev-server，启动热刷新插件
    devServer: {
        contentBase: path.join(__dirname, &quot;/&quot;),
        host: 'localhost',  //建议写IP地址，开发时候电脑的ip地址。localhost我不知道是幻觉还是怎样，有时候热刷新不灵敏
        port: 9090, //默认9090
        inline: true, //可以监控js变化
        hot: true//热启动
    },
    //搜索路径变量
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions:['.js','.scss','.vue','.json']// 可以不加后缀, 直接使用 import xx from 'xx' 的语法
    }
};
module.exports = config;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">let</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-comment">/*
 html-webpack-plugin插件，webpack中生成HTML的插件，
 具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */</span>
<span class="hljs-keyword">let</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-comment">/*
 webpack插件，提取公共模块
 */</span>
<span class="hljs-keyword">let</span> CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
<span class="hljs-keyword">let</span> config = {
    <span class="hljs-comment">//入口文件配置</span>
    entry: {
        index: path.resolve(__dirname, <span class="hljs-string">'src/js/page/index.js'</span>),
        vendors: [<span class="hljs-string">'vue'</span>, <span class="hljs-string">'vue-router'</span>,<span class="hljs-string">'vue-resource'</span>,<span class="hljs-string">'vuex'</span>,<span class="hljs-string">'element-ui'</span>,<span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>] <span class="hljs-comment">// 需要进行单独打包的文件</span>
    },
    <span class="hljs-comment">//出口文件配置</span>
    output: {
        path: path.join(__dirname, <span class="hljs-string">'dist'</span>), <span class="hljs-comment">//输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它</span>
        publicPath: <span class="hljs-string">'/dist/'</span>,                <span class="hljs-comment">//模板、样式、脚本、图片等资源对应的server上的路径</span>
        filename: <span class="hljs-string">'js/[name].js'</span>,            <span class="hljs-comment">//每个页面对应的主js的生成配置</span>
        chunkFilename: <span class="hljs-string">'js/[name].asyncChunk.js?'</span>+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() <span class="hljs-comment">//chunk生成的配置</span>
    },
    <span class="hljs-keyword">module</span>: {
        <span class="hljs-comment">//加载器</span>
        rules: [
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">'vue-loader'</span>,
                options: {
                    loaders: {
                        scss: <span class="hljs-string">'vue-style-loader!css-loader!sass-loader'</span>, <span class="hljs-comment">// &lt;style lang="scss"&gt;</span>
                        sass: <span class="hljs-string">'vue-style-loader!css-loader!sass-loader?indentedSyntax'</span> <span class="hljs-comment">// &lt;style lang="sass"&gt;</span>
                    }
                }
            },
            {
                test: <span class="hljs-regexp">/\.html$/</span>,
                loader: <span class="hljs-string">"raw-loader"</span>
            },
            {
                test: <span class="hljs-regexp">/\.css$/</span>,
                loader: <span class="hljs-string">'style-loader!css-loader'</span>
            },
            {
                test: <span class="hljs-regexp">/\.js$/</span>,
                exclude: <span class="hljs-regexp">/node_modules/</span>,
                loader: <span class="hljs-string">"babel-loader"</span>,
                options: {
                    presets: [<span class="hljs-string">"es2015"</span>,<span class="hljs-string">"stage-0"</span>],
                    plugins: [<span class="hljs-string">'syntax-dynamic-import'</span>]
                }
            },
            {
                test: <span class="hljs-regexp">/\.scss$/</span>,
                loader: <span class="hljs-string">'style-loader!css-loader!sass-loader'</span>
            },
            {
                test: <span class="hljs-regexp">/\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/</span>,
                loader: <span class="hljs-string">'file-loader'</span>
            },
            {
                <span class="hljs-comment">//图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求</span>
                <span class="hljs-comment">//如下配置，将小于8192byte的图片转成base64码</span>
                test: <span class="hljs-regexp">/\.(png|jpg|gif)$/</span>,
                loader: <span class="hljs-string">'url-loader?limit=8192&amp;name=images/[hash].[ext]'</span>
            }
        ]
    },
    <span class="hljs-comment">//插件</span>
    plugins: [
        <span class="hljs-comment">//webpack3.0的范围提升</span>
        <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),
        <span class="hljs-comment">//打包生成html文件，并且将js文件引入进来</span>
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            filename: path.resolve(__dirname, <span class="hljs-string">'dist/html/index.html'</span>), <span class="hljs-comment">//生成的html存放路径，相对于path</span>
            template: path.resolve(__dirname, <span class="hljs-string">'src/html/index.html'</span>), <span class="hljs-comment">//ejs模板路径,前面最好加上loader用于处理</span>
            inject: <span class="hljs-string">'body'</span>,  <span class="hljs-comment">//js插入的位置，true/'head'/'body'/false</span>
            hash: <span class="hljs-literal">true</span>
        }),
        <span class="hljs-comment">//提取功能模块</span>
        <span class="hljs-keyword">new</span> CommonsChunkPlugin({
            name: <span class="hljs-string">'vendors'</span>, <span class="hljs-comment">// 将公共模块提取，生成名为`vendors`的chunk</span>
            minChunks: <span class="hljs-number">2</span>, <span class="hljs-comment">//公共模块被使用的最小次数。配置为2，也就是同一个模块只有被2个以外的页面同时引用时才会被提取出来作为common chunks</span>
            <span class="hljs-comment">// children:true  //如果为true,那么公共组件的所有子依赖都将被选择进来</span>
        }),
    ],
    <span class="hljs-comment">//使用webpack-dev-server，启动热刷新插件</span>
    devServer: {
        contentBase: path.join(__dirname, <span class="hljs-string">"/"</span>),
        host: <span class="hljs-string">'localhost'</span>,  <span class="hljs-comment">//建议写IP地址，开发时候电脑的ip地址。localhost我不知道是幻觉还是怎样，有时候热刷新不灵敏</span>
        port: <span class="hljs-number">9090</span>, <span class="hljs-comment">//默认9090</span>
        inline: <span class="hljs-literal">true</span>, <span class="hljs-comment">//可以监控js变化</span>
        hot: <span class="hljs-literal">true</span><span class="hljs-comment">//热启动</span>
    },
    <span class="hljs-comment">//搜索路径变量</span>
    resolve: {
        alias: {
            vue: <span class="hljs-string">'vue/dist/vue.js'</span>
        },
        extensions:[<span class="hljs-string">'.js'</span>,<span class="hljs-string">'.scss'</span>,<span class="hljs-string">'.vue'</span>,<span class="hljs-string">'.json'</span>]<span class="hljs-comment">// 可以不加后缀, 直接使用 import xx from 'xx' 的语法</span>
    }
};
<span class="hljs-built_in">module</span>.exports = config;
</code></pre>
<h2 id="articleHeader3">4.vue-router</h2>
<p>写好package.json和webpack的配置之后，接下来就是路由(vue-router)了。这一步应该说是准备步骤，为下一步做准备的，方便测试。<br>1.首页创建一个配置路由的文件以及一个基本的组件文件（方便测试），welcome.vue（这个组件文件只有一张图片，样式也很简单），创建完了之后，目录是这样的。大家要注意这个目录的文件。</p>
<p><span class="img-wrap"><img data-src="/img/bVQbRG?w=696&amp;h=194" src="https://static.alili.tech/img/bVQbRG?w=696&amp;h=194" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVQbRC?w=737&amp;h=176" src="https://static.alili.tech/img/bVQbRC?w=737&amp;h=176" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>附上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;welcome-wrap&quot;>
        <img src=&quot;http://i1.buimg.com/1949/43ab520761604482.jpg&quot; alt=&quot;&quot;>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                name:'welcome'
            }
        }
    }
</script>
<style lang=&quot;scss&quot; scoped>
    .welcome-wrap{
        height: 100%;
        width: 100%;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .hd{
            font-size: 30px;
            text-align: center;
        }
        .bd{

        }
    }
</style>
<style lang=&quot;scss&quot;>
    .welcome-steps{
        .el-step__line-inner{
            height: 100% !important;
        }
    }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"welcome-wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://i1.buimg.com/1949/43ab520761604482.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
        data(){
            <span class="hljs-keyword">return</span>{
                <span class="hljs-attr">name</span>:<span class="hljs-string">'welcome'</span>
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">
    .welcome-wrap{
        height: 100%;
        width: 100%;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .hd{
            font-size: 30px;
            text-align: center;
        }
        .bd{

        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="undefined">
    .welcome-steps{
        .el-step__line-inner{
            height: 100% !important;
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQbRy?w=873&amp;h=203" src="https://static.alili.tech/img/bVQbRy?w=873&amp;h=203" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>附上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import welcomeComponent from './../components/admin_base/welcome.vue';

//路由控制
let snavRouter = [
    {
        path: '/',
        redirect: '/index?pos=0'
    },
    {
        path: '/index',
        component: welcomeComponent
    }
];
export {snavRouter}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> welcomeComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./../components/admin_base/welcome.vue'</span>;

<span class="hljs-comment">//路由控制</span>
<span class="hljs-keyword">let</span> snavRouter = [
    {
        path: <span class="hljs-string">'/'</span>,
        redirect: <span class="hljs-string">'/index?pos=0'</span>
    },
    {
        path: <span class="hljs-string">'/index'</span>,
        component: welcomeComponent
    }
];
<span class="hljs-keyword">export</span> {snavRouter}</code></pre>
<h2 id="articleHeader4">5.index.js和index.html</h2>
<p>接下来就配置入口文件，和入口文件的模板了。<br>入口文件，index.js<br><span class="img-wrap"><img data-src="/img/bVQbTD?w=684&amp;h=178" src="https://static.alili.tech/img/bVQbTD?w=684&amp;h=178" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;../../html/index.html&quot;);
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//使用router
Vue.use(VueRouter);
//使用resource
Vue.use(VueResource);
//使用ElementUI
Vue.use(ElementUI);
//引入router配置
import {snavRouter} from './../router/router';
//实例化router
const router = new VueRouter({
    routes: snavRouter
});
/**
 * @description 启动App
 * @returns "{{"name: string"}}"
 * @constructor
 */
    //App启动
let App = new Vue({
    el: '#App',
    data(){
        return {
            'name': 'index'
        }
    },
    router: router,
    mounted(){
    },
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">"../../html/index.html"</span>);
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span>
<span class="hljs-comment">//使用router</span>
Vue.use(VueRouter);
<span class="hljs-comment">//使用resource</span>
Vue.use(VueResource);
<span class="hljs-comment">//使用ElementUI</span>
Vue.use(ElementUI);
<span class="hljs-comment">//引入router配置</span>
<span class="hljs-keyword">import</span> {snavRouter} <span class="hljs-keyword">from</span> <span class="hljs-string">'./../router/router'</span>;
<span class="hljs-comment">//实例化router</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span>: snavRouter
});
<span class="hljs-comment">/**
 * @description 启动App
 * @returns "{{"name: string"}}"
 * @constructor
 */</span>
    <span class="hljs-comment">//App启动</span>
<span class="hljs-keyword">let</span> App = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#App'</span>,
    data(){
        <span class="hljs-keyword">return</span> {
            <span class="hljs-string">'name'</span>: <span class="hljs-string">'index'</span>
        }
    },
    <span class="hljs-attr">router</span>: router,
    mounted(){
    },
});
</code></pre>
<p>入口文件模板，index.html</p>
<p><span class="img-wrap"><img data-src="/img/bVQbTK?w=624&amp;h=208" src="https://static.alili.tech/img/bVQbTK?w=624&amp;h=208" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;utf-8&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=2.0&quot;>
    <title></title>
    <link rel=&quot;shortcut icon&quot; href=&quot;/favicon.ico&quot;>
</head>
<body>
<div class=&quot;zyl-admin-wrap&quot; id=&quot;App&quot;>
    <div class=&quot;zyl-admin-hd&quot;>
    </div>
    <div class=&quot;zyl-admin-bd&quot;>
        <div class=&quot;zyl-admin-snav&quot;>
        </div>
        <div class=&quot;zyl-admin-content&quot;>
            <div class=&quot;wrapper&quot;>
                <!-- 路由出口 -->
                <!-- 路由匹配到的组件将渲染在这里 -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=2.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"shortcut icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/favicon.ico"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zyl-admin-wrap"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"App"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zyl-admin-hd"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zyl-admin-bd"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zyl-admin-snav"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"zyl-admin-content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 路由出口 --&gt;</span>
                <span class="hljs-comment">&lt;!-- 路由匹配到的组件将渲染在这里 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>把改弄的都弄好了之后。先跑一下，证明一下自己的配置是不是正确的！，<code>npm run dev</code></p>
<blockquote>
<p>之前在package.json已经写好了，<code>npm run dev</code><br>相当于执行dev对应的命令行，在命令行输入<code>webpack-dev-server --hot --inline</code>是一样的效果！</p>
<p><span class="img-wrap"><img data-src="/img/bVQbWf?w=612&amp;h=91" src="https://static.alili.tech/img/bVQbWf?w=612&amp;h=91" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
</blockquote>
<p>在浏览器输入‘<a href="http://localhost:9090/dist/html/index.html" rel="nofollow noreferrer" target="_blank">http://localhost:9090/dist/ht...</a>’<br>运行结果成功的跑起来了！但是，大家有没有发现，在浏览器的地址栏，出现的是‘<a href="http://localhost:9090/dist/html/index.html#/index?pos=0" rel="nofollow noreferrer" target="_blank">http://localhost:9090/dist/ht...</a>’。结果是正常的，因为前面我们配置了路由，并且使用了路由！至于在地址上后面我为什么加上pos参数，下一章会说到！</p>
<p><span class="img-wrap"><img data-src="/img/bVQbWJ?w=918&amp;h=644" src="https://static.alili.tech/img/bVQbWJ?w=918&amp;h=644" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>路由（vue-router）。大概原理就是，在浏览器地址栏输入‘<a href="http://localhost:9090/dist/html/index.html" rel="nofollow noreferrer" target="_blank">http://localhost:9090/dist/ht...</a>’，路由（vue-router）就匹配到了<code>(path: '/')</code>。然后，重定向到了<code>(redirect: '/index?pos=0')</code>，重定向又匹配到了<code>(path: '/index')</code>，然后就加载了组件，加载了这个组件<code>(component: welcomeComponent)</code>，就会在<code>index.html</code>的<code>&lt;router-view&gt;&lt;/router-view&gt;</code>里面输出这个组件的内容，（相关的知识，可以到网上参考<a href="https://router.vuejs.org/zh-cn/essentials/getting-started.html" rel="nofollow noreferrer" target="_blank">vue-router</a>）。这个组件<code>(component: welcomeComponent)</code>，就是我们之前编写的<code>welcome.vue</code>。可能说的有点乱，大家注意整理下，理清思路。</p>
<p><span class="img-wrap"><img data-src="/img/bVQf4U?w=918&amp;h=721" src="https://static.alili.tech/img/bVQf4U?w=918&amp;h=721" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">6.未完待遇</h2>
<p>今天就先到这里了，这个系列往后会有几篇文章继续介绍，毕竟这篇文章只是介绍了基础的一个项目的搭建和配置。以及把项目跑起来！vue-router和element还没有写到。大家也放心好了，文章不会让大家等太久的。<br>最后，如果大家发现我哪里写错了，或者是哪里写得不好，欢迎指点下。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+vue项目实战（一,搭建运行环境和相关配置）

## 原文链接
[https://segmentfault.com/a/1190000010025189](https://segmentfault.com/a/1190000010025189)


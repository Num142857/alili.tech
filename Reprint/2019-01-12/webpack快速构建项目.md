---
title: 'webpack快速构建项目' 
date: 2019-01-12 2:30:24
hidden: true
slug: wl7lvjszh1i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1.前(fei)言(hua)</h1>
<p>webpack是什么我在这里就不多说了，实在不知道的可以直接在去搜一下，都一大堆答案。关于用webpack怎么构建项目，方法也是多种多样，五花八门。今天，我就写下我平常构建项目的方式，这个方式我觉得比较便捷和简单粗暴，如果有什么要指出的，也欢迎大家评论，毕竟我也只是一个前端新人。</p>
<h1 id="articleHeader1">2.步骤</h1>
<h4>第一步，在目录建个文件夹</h4>
<p><span class="img-wrap"><img data-src="/img/bVPfe0?w=764&amp;h=345" src="https://static.alili.tech/img/bVPfe0?w=764&amp;h=345" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>为了方便，我在编辑器打开这个目录了</p>
<h4>第二步，创建package.json配置文件</h4>
<p>输入命令行  <code>$  npm init</code><br>依次输入，</p>
<p><span class="img-wrap"><img data-src="/img/bVPffQ?w=437&amp;h=263" src="https://static.alili.tech/img/bVPffQ?w=437&amp;h=263" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>从上往下就是，项目名称，迭代版本，项目说明，主入口文件，封装的可执行命令，作者的一些信息，源协议名称。<br>这应该就是最简单的配置文件了。</p>
<h4>第三步，安装webpack依赖</h4>
<p>如果之前没全局安装过webpack，就先安装一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack -g
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>$ npm <span class="hljs-keyword">install</span> webpack -g
</code></pre>
<p>然后安装项目依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>$ npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>
</code></pre>
<p>然后就会看到package.json里面多了一行</p>
<p><span class="img-wrap"><img data-src="/img/bVPfhV?w=602&amp;h=326" src="https://static.alili.tech/img/bVPfhV?w=602&amp;h=326" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>这就说明安装成功了。</p>
<h4>第四步，创建并配置webpack.config.js</h4>
<p>创建webpack.config.js之前，先创建一个index.js和index.html,一个为入口文件，一个为普通的html文件<br>完了之后，目录就应该是这样的</p>
<p><span class="img-wrap"><img data-src="/img/bVPfoN?w=439&amp;h=230" src="https://static.alili.tech/img/bVPfoN?w=439&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>在index.js里面写上这行测试用途的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.write(&quot;hello world&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>document.write(<span class="hljs-string">"hello world"</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>之后，创建一个webpack.config.js，代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let path = require('path');
let webpack = require('webpack');
module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        filename: &quot;bundle.js&quot;
    },
    module: {
        rules: [

        ]
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">let</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-built_in">module</span>.exports = {
    entry: <span class="hljs-string">'./index.js'</span>,
    output: {
        path: path.join(__dirname, <span class="hljs-string">'dist'</span>), <span class="hljs-comment">//输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它</span>
        filename: <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-keyword">module</span>: {
        rules: [

        ]
    }
};
</code></pre>
<p>这个也应该是最基础的webpack.config.js了<br>然后执行 <code>$ webpack</code><br>这个命令就是打包输出，执行完了之后，会看到，文件夹上多了一个dist文件夹，里面有个bundle.js，这个就是打包输出之后的文件夹和文件。需要的就是这些。</p>
<h4>第五步，测试结果</h4>
<p>在index.html引入之前输出的bundle.js。</p>
<p><span class="img-wrap"><img data-src="/img/bVPfp8?w=566&amp;h=313" src="https://static.alili.tech/img/bVPfp8?w=566&amp;h=313" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>最后，在随便一个浏览器，打开index.html</p>
<p><span class="img-wrap"><img data-src="/img/bVPfqi?w=432&amp;h=168" src="https://static.alili.tech/img/bVPfqi?w=432&amp;h=168" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>大功告成！上面这里写了很多，但实际上操作起来就是分分钟的事情，当然这是最简单的从零开始。</p>
<h1 id="articleHeader2">3.简单粗暴的搭建</h1>
<p>如果真要最简单的构建项目，更简单的方法是，直接从别的项目拷贝package.json这个配置文件，然后执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span></code></pre>
<p>完了之后，在里面应该有配置的的，就都安装完成了，附上一段我常用的配置<br>package.json</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;test3&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;测试版&quot;,
  &quot;dependencies&quot;: {},
  &quot;devDependencies&quot;: {
    &quot;babel-cli&quot;: &quot;^6.10.1&quot;,
    &quot;babel-core&quot;: &quot;^6.14.0&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.5&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.9.0&quot;,
    &quot;babel-preset-stage-0&quot;: &quot;^6.5.0&quot;,
    &quot;babel-register&quot;: &quot;^6.18.0&quot;,
    &quot;browser-sync&quot;: &quot;^2.18.2&quot;,
    &quot;css-loader&quot;: &quot;^0.25.0&quot;,
    &quot;ejs-compiled-loader&quot;: &quot;^2.1.1&quot;,
    &quot;element-ui&quot;: &quot;^1.2.5&quot;,
    &quot;extract-text-webpack-plugin&quot;: &quot;^1.0.1&quot;,
    &quot;file-loader&quot;: &quot;^0.9.0&quot;,
    &quot;glob&quot;: &quot;^7.0.6&quot;,
    &quot;gulp&quot;: &quot;^3.9.1&quot;,
    &quot;gulp-file-include&quot;: &quot;^1.0.0&quot;,
    &quot;html-loader&quot;: &quot;^0.4.3&quot;,
    &quot;html-webpack-plugin&quot;: &quot;^2.22.0&quot;,
    &quot;iview&quot;: &quot;^2.0.0-rc.5&quot;,
    &quot;node-sass&quot;: &quot;^3.7.0&quot;,
    &quot;raw-loader&quot;: &quot;^0.5.1&quot;,
    &quot;sass-loader&quot;: &quot;^4.0.2&quot;,
    &quot;scss-loader&quot;: &quot;0.0.1&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;url-loader&quot;: &quot;^0.5.7&quot;,
    &quot;vue&quot;: &quot;^2.2.6&quot;,
    &quot;vue-loader&quot;: &quot;^10.0.2&quot;,
    &quot;vue-resource&quot;: &quot;^1.0.3&quot;,
    &quot;vue-router&quot;: &quot;^2.4.0&quot;,
    &quot;vue-style-loader&quot;: &quot;^1.0.0&quot;,
    &quot;vue-template-compiler&quot;: &quot;^2.2.1&quot;,
    &quot;vuex&quot;: &quot;^2.0.0&quot;,
    &quot;webpack&quot;: &quot;^1.13.2&quot;,
    &quot;webpack-dev-server&quot;: &quot;^1.15.1&quot;
  },
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;dev&quot;: &quot;webpack-dev-server --hot --inline&quot;
  },
  &quot;author&quot;: &quot;chen&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"test3"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">"测试版"</span>,
  <span class="hljs-attr">"dependencies"</span>: {},
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-cli"</span>: <span class="hljs-string">"^6.10.1"</span>,
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.14.0"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^6.2.5"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.9.0"</span>,
    <span class="hljs-attr">"babel-preset-stage-0"</span>: <span class="hljs-string">"^6.5.0"</span>,
    <span class="hljs-attr">"babel-register"</span>: <span class="hljs-string">"^6.18.0"</span>,
    <span class="hljs-attr">"browser-sync"</span>: <span class="hljs-string">"^2.18.2"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.25.0"</span>,
    <span class="hljs-attr">"ejs-compiled-loader"</span>: <span class="hljs-string">"^2.1.1"</span>,
    <span class="hljs-attr">"element-ui"</span>: <span class="hljs-string">"^1.2.5"</span>,
    <span class="hljs-attr">"extract-text-webpack-plugin"</span>: <span class="hljs-string">"^1.0.1"</span>,
    <span class="hljs-attr">"file-loader"</span>: <span class="hljs-string">"^0.9.0"</span>,
    <span class="hljs-attr">"glob"</span>: <span class="hljs-string">"^7.0.6"</span>,
    <span class="hljs-attr">"gulp"</span>: <span class="hljs-string">"^3.9.1"</span>,
    <span class="hljs-attr">"gulp-file-include"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-attr">"html-loader"</span>: <span class="hljs-string">"^0.4.3"</span>,
    <span class="hljs-attr">"html-webpack-plugin"</span>: <span class="hljs-string">"^2.22.0"</span>,
    <span class="hljs-attr">"iview"</span>: <span class="hljs-string">"^2.0.0-rc.5"</span>,
    <span class="hljs-attr">"node-sass"</span>: <span class="hljs-string">"^3.7.0"</span>,
    <span class="hljs-attr">"raw-loader"</span>: <span class="hljs-string">"^0.5.1"</span>,
    <span class="hljs-attr">"sass-loader"</span>: <span class="hljs-string">"^4.0.2"</span>,
    <span class="hljs-attr">"scss-loader"</span>: <span class="hljs-string">"0.0.1"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-attr">"url-loader"</span>: <span class="hljs-string">"^0.5.7"</span>,
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.2.6"</span>,
    <span class="hljs-attr">"vue-loader"</span>: <span class="hljs-string">"^10.0.2"</span>,
    <span class="hljs-attr">"vue-resource"</span>: <span class="hljs-string">"^1.0.3"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^2.4.0"</span>,
    <span class="hljs-attr">"vue-style-loader"</span>: <span class="hljs-string">"^1.0.0"</span>,
    <span class="hljs-attr">"vue-template-compiler"</span>: <span class="hljs-string">"^2.2.1"</span>,
    <span class="hljs-attr">"vuex"</span>: <span class="hljs-string">"^2.0.0"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.2"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.15.1"</span>
  },
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --hot --inline"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">"chen"</span>
}</code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let path = require('path');
let webpack = require('webpack');
let serverHost = &quot;localhost&quot;;
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/dist/',
        filename: &quot;bundle.js&quot;
    },
    //加载器
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: &quot;vue-loader&quot;
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
                loader: &quot;babel-loader&quot;
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
    vue: {
        loaders: {
            scss: ['vue-style-loader', 'css', 'sass'].join('!')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:&quot;test3&quot;,
            filename:&quot;./dist/index.html&quot;,//输出html文件，打包时插入js,不用自己手动引入
            inject: 'body',  //js插入的位置，true/'head'/'body'/false
            hash: true
        }),
    ],
    //使用webpack-dev-server
    devServer: {
        contentBase: './',
        host: serverHost,
        port: 9090, //默认9090
        inline: true, //可以监控js变化
        hot: true//热启动
    },
    //使用vue2.x的一个配置
    resolve: {
        alias: {vue: 'vue/dist/vue.js'}
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">let</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">let</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">let</span> serverHost = <span class="hljs-string">"localhost"</span>;
<span class="hljs-keyword">let</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-built_in">module</span>.exports = {
    entry: <span class="hljs-string">'./src/index.js'</span>,
    output: {
        path: path.join(__dirname, <span class="hljs-string">'dist'</span>), <span class="hljs-comment">//输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它</span>
        publicPath: <span class="hljs-string">'/dist/'</span>,
        filename: <span class="hljs-string">"bundle.js"</span>
    },
    <span class="hljs-comment">//加载器</span>
    <span class="hljs-keyword">module</span>: {
        loaders: [
            {
                test: <span class="hljs-regexp">/\.vue$/</span>,
                loader: <span class="hljs-string">"vue-loader"</span>
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
                loader: <span class="hljs-string">"babel-loader"</span>
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
    vue: {
        loaders: {
            scss: [<span class="hljs-string">'vue-style-loader'</span>, <span class="hljs-string">'css'</span>, <span class="hljs-string">'sass'</span>].join(<span class="hljs-string">'!'</span>)
        }
    },
    plugins: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            title:<span class="hljs-string">"test3"</span>,
            filename:<span class="hljs-string">"./dist/index.html"</span>,<span class="hljs-comment">//输出html文件，打包时插入js,不用自己手动引入</span>
            inject: <span class="hljs-string">'body'</span>,  <span class="hljs-comment">//js插入的位置，true/'head'/'body'/false</span>
            hash: <span class="hljs-literal">true</span>
        }),
    ],
    <span class="hljs-comment">//使用webpack-dev-server</span>
    devServer: {
        contentBase: <span class="hljs-string">'./'</span>,
        host: serverHost,
        port: <span class="hljs-number">9090</span>, <span class="hljs-comment">//默认9090</span>
        inline: <span class="hljs-literal">true</span>, <span class="hljs-comment">//可以监控js变化</span>
        hot: <span class="hljs-literal">true</span><span class="hljs-comment">//热启动</span>
    },
    <span class="hljs-comment">//使用vue2.x的一个配置</span>
    resolve: {
        alias: {vue: <span class="hljs-string">'vue/dist/vue.js'</span>}
    }
};
</code></pre>
<p>大家执行<code>$ webpack</code>就知道大概的区别了。在运行dist里面的index.html，就知道区别了</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack快速构建项目

## 原文链接
[https://segmentfault.com/a/1190000009791973](https://segmentfault.com/a/1190000009791973)


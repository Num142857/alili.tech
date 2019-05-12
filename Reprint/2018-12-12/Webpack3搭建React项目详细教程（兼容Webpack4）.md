---
title: 'Webpack3搭建React项目详细教程（兼容Webpack4）' 
date: 2018-12-12 2:30:10
hidden: true
slug: uowgx7eb5am
categories: [reprint]
---

{{< raw >}}

                    
<p>源码地址：<a href="https://github.com/remmlqw/webpack-demo" rel="nofollow noreferrer" target="_blank">https://github.com/remmlqw/we...</a><br>注意：本文是从 Webpack3 搭建 兼容 Webpack4</p>
<blockquote><h3 id="articleHeader0">新建项目</h3></blockquote>
<p>1、新建一个文件夹</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init</code></pre>
<p>一直回车，最后yes，生成package.json</p>
<p>2、文件夹中新建以下文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src                            --源码
index.html                     --入口首页
webpack.config.js              --webpack开发环境配置
webpack.production.config.js   --webpack生产环境配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>src                            --源码
index<span class="hljs-selector-class">.html</span>                     --入口首页
webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>              --webpack开发环境配置
webpack<span class="hljs-selector-class">.production</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>   --webpack生产环境配置</code></pre>
<blockquote><h3 id="articleHeader1">下载依赖包</h3></blockquote>
<p>先下载几个基本的包，后续还会用到其他包。</p>
<p>打包工具<br><strong>webpack</strong>  </p>
<p>辅助开发的服务器(该服务器能热加载代码，自动刷新页面，代理服务器解决前端开发时跨域问题)                <br><strong>webpack-dev-server</strong> </p>
<p>在webpack 3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。所以还要安装：<br><strong>webpack-cli</strong> <br>注：这里除了本地安装外，还需全局安装 <code>npm i webpack-cli -g</code></p>
<p>react用到es6语法，所以要安装es6转码器babel相关的包<br><strong>babel-core</strong><br><strong>babel-loader</strong><br><strong>babel-preset-env</strong><br><strong>babel-preset-react</strong></p>
<p>webpack需要处理样式文件打包的处理器<br><strong>css-loader</strong><br><strong>style-loader</strong><br><strong>less-loader</strong></p>
<p>webpack需要处理图片文件打包的处理器<br><strong>file-loader</strong><br><strong>url-loader</strong></p>
<p>以上包的下载使用 <code>npm i XXX --save-dev</code><br>--save-dev 是写入开发环境的依赖</p>
<hr>
<p>react项目的两个基础包<br><strong>react</strong><br><strong>react-dom</strong></p>
<p>这两个包下载使用 <code>npm i XXX --save</code><br>--save 是写入生产环境的依赖</p>
<blockquote><h3 id="articleHeader2">package.json中的scripts</h3></blockquote>
<p>在package.json中的scripts加上两个key</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;start&quot;: &quot;cross-env NODE_ENV=dev webpack-dev-server --inline --progress --colors --mode development&quot;,
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --config ./webpack.production.config.js --progress --colors --mode production&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"cross-env NODE_ENV=dev webpack-dev-server --inline --progress --colors --mode development"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --config ./webpack.production.config.js --progress --colors --mode production"</span>
  },</code></pre>
<p>这里需要安装的一个包 <code>npm i cross-env --save-dev</code><br><strong>有何用？</strong><br>windows不支持 <code>NODE_ENV=development</code> 的设置方式，这个包能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。<code>cross-env</code> 让这一切变得简单，不同平台使用唯一指令，无需担心跨平台问题。</p>
<p><code>--progress</code> 显示打包过程中的进度<br><code>--colors</code> 打包信息带有颜色显示<br><code>--inline</code> 自动刷新的配置<br><code>--mode development/production</code> webpack 4引入了生产和开发模式，自动根据开发和生产两种模式进行优化</p>
<p><code>webpack --config ./webpack.production.config.js</code><br>这个命令是制定webpack的配置文件，因为默认的是<code>webpack.config.js</code>，而这里是打包命令，应该使用<code>webpack.production.config.js</code>。</p>
<blockquote><h3 id="articleHeader3">开发环境配置 --webpack.config.js</h3></blockquote>
<p>先上完整代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path=require('path');
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

// 配置文件的内容需要通过module.exports暴露
module.exports = {
  // 配置需要打包的入口文件，值可以是字符串、数组、对象。
  // 1. 字符串： entry： './entry'
  // 2. 字符串： entry：[ './entry1','entry2'] (多入口)
  // 3. 对象：   entry： {alert/index': path.resolve(pagesDir, `./alert/index/page`)}
  // 多入口书写的形式应为object，因为object,的key在webpack里相当于此入口的name,
  entry : './src/js/index.js',
  output : {
    // 输出文件配置，output 输出有自己的一套规则，常用的参数基本就是这三个
    // path: 表示生成文件的根目录 需要一个**绝对路径** path仅仅告诉Webpack结果存储在哪里
    path : path.resolve(__dirname,'dist'),
    // filename 属性表示的是如何命名出来的入口文件
    filename : './js/bundle.js'
  },
  resolve: {
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['*', '.js', '.json', '.less','.jsx'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      '@components': path.resolve(__dirname,'src/js/components')
    }
  },
  module : {
    // 这里就是Loader，通过Loader，webpack能够针对每一种特定的资源做出相应的处理
    // 1.test参数用来指示当前配置项针对哪些资源，该值应是一个条件值(condition)。
    // 2.exclude参数用来剔除掉需要忽略的资源，该值应是一个条件值(condition)。
    // 3.include参数用来表示本loader配置仅针对哪些目录/文件，该值应是一个条件值(condition)。
    // 而include参数则用来指示目录；注意同时使用这两者的时候，实际上是and的关系。
    // 4.use参数，用来指示用哪个或哪些loader来处理目标资源。
    rules : [
      {
        test: /\.(js|jsx)$/,
        use : {
          loader : &quot;babel-loader&quot;,
          options : {
            presets : ['env','react']
          }
        },
        exclude : /node_modules/
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use : [{loader : &quot;style-loader&quot;},{loader : &quot;css-loader&quot;},{loader : &quot;less-loader&quot;}]
      },
      {
        test : /\.css$/,
        use : [{loader : &quot;style-loader&quot;},{loader : &quot;css-loader&quot;}]
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)$/i,
        use : {
          loader : 'url-loader',
          options : {
            limit : '8192'
          }
        }
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: '8192'
          }
        }
      }
    ]
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/index.html'
    }),

    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),

  ],
  //我们在这里对webpack-dev-server进行配置
  devServer: {
    contentBase:&quot;./&quot;,// 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；
    historyApiFallback:true,//当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
    inline:true,//用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效
    hot:true,// 启动webpack热模块替换特性,这里是个坑
    port:8080,//配置服务端口号
    host:'localhost',//服务器的IP地址，可以使用IP也可以使用localhost
    compress:true,//服务端压缩是否开启
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const path=require(<span class="hljs-string">'path'</span>);
const webpack = require(<span class="hljs-string">'webpack'</span>)
var HtmlWebpackPlugin = require(<span class="hljs-string">'html-webpack-plugin'</span>);
var OpenBrowserPlugin = require(<span class="hljs-string">'open-browser-webpack-plugin'</span>);

<span class="hljs-comment">// 配置文件的内容需要通过module.exports暴露</span>
module.exports = {
  <span class="hljs-comment">// 配置需要打包的入口文件，值可以是字符串、数组、对象。</span>
  <span class="hljs-comment">// 1. 字符串： entry： './entry'</span>
  <span class="hljs-comment">// 2. 字符串： entry：[ './entry1','entry2'] (多入口)</span>
  <span class="hljs-comment">// 3. 对象：   entry： {alert/index': path.resolve(pagesDir, `./alert/index/page`)}</span>
  <span class="hljs-comment">// 多入口书写的形式应为object，因为object,的key在webpack里相当于此入口的name,</span>
  <span class="hljs-string">entry :</span> <span class="hljs-string">'./src/js/index.js'</span>,
  <span class="hljs-string">output :</span> {
    <span class="hljs-comment">// 输出文件配置，output 输出有自己的一套规则，常用的参数基本就是这三个</span>
    <span class="hljs-comment">// path: 表示生成文件的根目录 需要一个**绝对路径** path仅仅告诉Webpack结果存储在哪里</span>
    <span class="hljs-string">path :</span> path.resolve(__dirname,<span class="hljs-string">'dist'</span>),
    <span class="hljs-comment">// filename 属性表示的是如何命名出来的入口文件</span>
    <span class="hljs-string">filename :</span> <span class="hljs-string">'./js/bundle.js'</span>
  },
<span class="hljs-symbol">  resolve:</span> {
    <span class="hljs-comment">//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名</span>
<span class="hljs-symbol">    extensions:</span> [<span class="hljs-string">'*'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.less'</span>,<span class="hljs-string">'.jsx'</span>],
    <span class="hljs-comment">//模块别名定义，方便后续直接引用别名，无须多写长长的地址</span>
<span class="hljs-symbol">    alias:</span> {
      <span class="hljs-string">'@components'</span>: path.resolve(__dirname,<span class="hljs-string">'src/js/components'</span>)
    }
  },
  <span class="hljs-string">module :</span> {
    <span class="hljs-comment">// 这里就是Loader，通过Loader，webpack能够针对每一种特定的资源做出相应的处理</span>
    <span class="hljs-comment">// 1.test参数用来指示当前配置项针对哪些资源，该值应是一个条件值(condition)。</span>
    <span class="hljs-comment">// 2.exclude参数用来剔除掉需要忽略的资源，该值应是一个条件值(condition)。</span>
    <span class="hljs-comment">// 3.include参数用来表示本loader配置仅针对哪些目录/文件，该值应是一个条件值(condition)。</span>
    <span class="hljs-comment">// 而include参数则用来指示目录；注意同时使用这两者的时候，实际上是and的关系。</span>
    <span class="hljs-comment">// 4.use参数，用来指示用哪个或哪些loader来处理目标资源。</span>
    <span class="hljs-string">rules :</span> [
      {
<span class="hljs-symbol">        test:</span> <span class="hljs-regexp">/\.(js|jsx)$/</span>,
        <span class="hljs-string">use :</span> {
          <span class="hljs-string">loader :</span> <span class="hljs-string">"babel-loader"</span>,
          <span class="hljs-string">options :</span> {
            <span class="hljs-string">presets :</span> [<span class="hljs-string">'env'</span>,<span class="hljs-string">'react'</span>]
          }
        },
        <span class="hljs-string">exclude :</span> <span class="hljs-regexp">/node_modules/</span>
      },
      {
<span class="hljs-symbol">        test:</span> <span class="hljs-regexp">/\.less$/</span>,
<span class="hljs-symbol">        exclude:</span> <span class="hljs-regexp">/node_modules/</span>,
        <span class="hljs-string">use :</span> [{<span class="hljs-string">loader :</span> <span class="hljs-string">"style-loader"</span>},{<span class="hljs-string">loader :</span> <span class="hljs-string">"css-loader"</span>},{<span class="hljs-string">loader :</span> <span class="hljs-string">"less-loader"</span>}]
      },
      {
        <span class="hljs-string">test :</span> <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-string">use :</span> [{<span class="hljs-string">loader :</span> <span class="hljs-string">"style-loader"</span>},{<span class="hljs-string">loader :</span> <span class="hljs-string">"css-loader"</span>}]
      },
      {
<span class="hljs-symbol">        test:</span> <span class="hljs-regexp">/\.(png|gif|jpg|jpeg|bmp)$/</span>i,
        <span class="hljs-string">use :</span> {
          <span class="hljs-string">loader :</span> <span class="hljs-string">'url-loader'</span>,
          <span class="hljs-string">options :</span> {
            <span class="hljs-string">limit :</span> <span class="hljs-string">'8192'</span>
          }
        }
      },
      {
<span class="hljs-symbol">        test:</span> <span class="hljs-regexp">/\.(woff|woff2|svg|ttf|eot)($|\?)/</span>i,
<span class="hljs-symbol">        use:</span> {
<span class="hljs-symbol">          loader:</span> <span class="hljs-string">'url-loader'</span>,
<span class="hljs-symbol">          options:</span> {
<span class="hljs-symbol">            limit:</span> <span class="hljs-string">'8192'</span>
          }
        }
      }
    ]
  },
<span class="hljs-symbol">  plugins:</span> [
    <span class="hljs-comment">// html 模板插件</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
<span class="hljs-symbol">        template:</span> __dirname + <span class="hljs-string">'/index.html'</span>
    }),

    <span class="hljs-comment">// 热加载插件</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),

    <span class="hljs-comment">// 打开浏览器</span>
    <span class="hljs-keyword">new</span> OpenBrowserPlugin({
<span class="hljs-symbol">      url:</span> <span class="hljs-string">'http://localhost:8080'</span>
    }),

    <span class="hljs-comment">// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
<span class="hljs-symbol">      __DEV__:</span> JSON.stringify(JSON.parse((process.env.NODE_ENV == <span class="hljs-string">'dev'</span>) || <span class="hljs-string">'false'</span>))
    }),

  ],
  <span class="hljs-comment">//我们在这里对webpack-dev-server进行配置</span>
<span class="hljs-symbol">  devServer:</span> {
<span class="hljs-symbol">    contentBase:</span><span class="hljs-string">"./"</span>,<span class="hljs-comment">// 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；</span>
<span class="hljs-symbol">    historyApiFallback:</span><span class="hljs-literal">true</span>,<span class="hljs-comment">//当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；</span>
<span class="hljs-symbol">    inline:</span><span class="hljs-literal">true</span>,<span class="hljs-comment">//用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效</span>
<span class="hljs-symbol">    hot:</span><span class="hljs-literal">true</span>,<span class="hljs-comment">// 启动webpack热模块替换特性,这里是个坑</span>
<span class="hljs-symbol">    port:</span><span class="hljs-number">8080</span>,<span class="hljs-comment">//配置服务端口号</span>
<span class="hljs-symbol">    host:</span><span class="hljs-string">'localhost'</span>,<span class="hljs-comment">//服务器的IP地址，可以使用IP也可以使用localhost</span>
<span class="hljs-symbol">    compress:</span><span class="hljs-literal">true</span>,<span class="hljs-comment">//服务端压缩是否开启</span>
  }
}
</code></pre>
<p>相关参数配置的说明已经写在代码的注释里。</p>
<p>这里对于上面使用的插件我在做一下说明：</p>
<p><code>html-webpack-plugin</code> ：html-webpack-plugin可以根据你设置的模板，在每次运行后生成对应的模板文件，同时所依赖的CSS/JS也都会被引入，如果CSS/JS中含有hash值，则html-webpack-plugin生成的模板文件也会引入正确版本的CSS/JS文件。详细介绍<a href="https://www.npmjs.com/package/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p>
<p><code>webpack.HotModuleReplacementPlugin</code>：模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：<br>保留在完全重新加载页面时丢失的应用程序状态。<br>只更新变更内容，以节省宝贵的开发时间。<br>调整样式更加快速 ，几乎相当于在浏览器调试器中更改样式。<br>详细介绍<a href="https://doc.webpack-china.org/plugins/hot-module-replacement-plugin/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p><code>open-browser-webpack-plugin</code> ： 则在webpack 启动成功后会打开浏览器。详细介绍<a href="https://www.npmjs.com/package/open-browser-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p>
<p><code>webpack.DefinePlugin</code> ： 可在业务 js 代码中使用 <strong>DEV</strong> 判断是否是dev模式。详细介绍<a href="https://doc.webpack-china.org/plugins/define-plugin/" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p>比如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(__DEV__) {
    console.log(&quot;现在是开发环境&quot;);
}
else {
    console.log(&quot;现在是生产环境&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-keyword">if</span>(<span class="hljs-variable">__DEV__</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"现在是开发环境"</span>);
}
<span class="hljs-keyword">else</span> {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">"现在是生产环境"</span>);
}</code></pre>
<p>这里需要额外安装的包：<br><strong>html-webpack-plugin</strong><br><strong>open-browser-webpack-plugin</strong></p>
<blockquote><h3 id="articleHeader4">生产环境配置 --webpack.production.config.js</h3></blockquote>
<p>同样的，先上完整代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/js/index.js'),
    // 将 第三方依赖 单独打包
    vendor: ['react', 'react-dom']
  },
  output: {
    path: __dirname + &quot;/dist&quot;,
    // filename 属性表示的是如何命名出来的入口文件，规则是一下三种：
    // [name] 指代入口文件的name，也就是上面提到的entry参数的key，因此，我们可以在name里利用/，即可达到控制文件目录结构的效果。
    // [hash]，指代本次编译的一个hash版本，值得注意的是，只要是在同一次编译过程中生成的文件，这个[hash].js
    //的值就是一样的；在缓存的层面来说，相当于一次全量的替换。
    filename: &quot;js/[name].[chunkhash:8].js&quot;,
    // publicPath 参数表示的是一个URL 路径（指向生成文件的跟目录），用于生成css/js/图片/字体文件
    // 等资源的路径以确保网页能正确地加载到这些资源.
    // “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值.
    // 例如，在localhost（即本地开发模式）里的css文件中边你可能用“./test.png”这样的url来加载图片，
    // 但是在生产模式下“test.png”文件可能会定位到CDN上并且你的Node.js服务器可能是运行在HeroKu上边的。
    // 这就意味着在生产环境你必须手动更新所有文件里的url为CDN的路径。
    //开发环境：Server和图片都是在localhost（域名）下
    //.image {
    // background-image: url('./test.png');
    //}
    // 生产环境：Server部署下HeroKu但是图片在CDN上
    //.image {
    //  background-image: url('https://someCDN/test.png');
    //}
    publicPath: './'
  },

  resolve: {
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['*', '.js', '.json', '.less','.jsx'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      '@components': path.resolve(__dirname,'src/js/components')
    }
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: &quot;babel-loader&quot;,
          options: {
            presets: ['env', 'react']
          }
        }
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        })
      }, {
        test: /\.css$/,
        // exclude: /node_modules/, 删掉次行  不然打包会报错  因为antd.css 在node_modules中
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }, {
        test: /\.(png|gif|jpg|jpeg|bmp)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: '8192',
            outputPath: 'images/',
            publicPath : '/images'
          }
        }
      }, {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: '8192',
            outputPath: 'font/'
          }
        }
      }
    ]
  },
  plugins: [
    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin(&quot;Copyright by 765745342@qq.com&quot;),

    // html 模板插件
    new HtmlWebpackPlugin({
      template: __dirname + '/index.html'
    }),

    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),

    // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        //supresses warnings, usually from module minification
        warnings: false
      }
    }),

    // 分离CSS和JS文件
    new ExtractTextPlugin('css/[name].[chunkhash:8].css'),

    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'js/[name].[chunkhash:8].js'}),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ]
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">var</span> autoprefixer = <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>);
<span class="hljs-keyword">var</span> OptimizeCssAssetsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  entry: {
    app: path.resolve(__dirname, <span class="hljs-string">'./src/js/index.js'</span>),
    <span class="hljs-comment">// 将 第三方依赖 单独打包</span>
    vendor: [<span class="hljs-string">'react'</span>, <span class="hljs-string">'react-dom'</span>]
  },
  output: {
    path: __dirname + <span class="hljs-string">"/dist"</span>,
    <span class="hljs-comment">// filename 属性表示的是如何命名出来的入口文件，规则是一下三种：</span>
    <span class="hljs-comment">// [name] 指代入口文件的name，也就是上面提到的entry参数的key，因此，我们可以在name里利用/，即可达到控制文件目录结构的效果。</span>
    <span class="hljs-comment">// [hash]，指代本次编译的一个hash版本，值得注意的是，只要是在同一次编译过程中生成的文件，这个[hash].js</span>
    <span class="hljs-comment">//的值就是一样的；在缓存的层面来说，相当于一次全量的替换。</span>
    filename: <span class="hljs-string">"js/[name].[chunkhash:8].js"</span>,
    <span class="hljs-comment">// publicPath 参数表示的是一个URL 路径（指向生成文件的跟目录），用于生成css/js/图片/字体文件</span>
    <span class="hljs-comment">// 等资源的路径以确保网页能正确地加载到这些资源.</span>
    <span class="hljs-comment">// “publicPath”项则被许多Webpack的插件用于在生产模式下更新内嵌到css、html文件里的url值.</span>
    <span class="hljs-comment">// 例如，在localhost（即本地开发模式）里的css文件中边你可能用“./test.png”这样的url来加载图片，</span>
    <span class="hljs-comment">// 但是在生产模式下“test.png”文件可能会定位到CDN上并且你的Node.js服务器可能是运行在HeroKu上边的。</span>
    <span class="hljs-comment">// 这就意味着在生产环境你必须手动更新所有文件里的url为CDN的路径。</span>
    <span class="hljs-comment">//开发环境：Server和图片都是在localhost（域名）下</span>
    <span class="hljs-comment">//.image {</span>
    <span class="hljs-comment">// background-image: url('./test.png');</span>
    <span class="hljs-comment">//}</span>
    <span class="hljs-comment">// 生产环境：Server部署下HeroKu但是图片在CDN上</span>
    <span class="hljs-comment">//.image {</span>
    <span class="hljs-comment">//  background-image: url('https://someCDN/test.png');</span>
    <span class="hljs-comment">//}</span>
    publicPath: <span class="hljs-string">'./'</span>
  },

  resolve: {
    <span class="hljs-comment">//自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名</span>
    extensions: [<span class="hljs-string">'*'</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.json'</span>, <span class="hljs-string">'.less'</span>,<span class="hljs-string">'.jsx'</span>],
    <span class="hljs-comment">//模块别名定义，方便后续直接引用别名，无须多写长长的地址</span>
    alias: {
      <span class="hljs-string">'@components'</span>: path.resolve(__dirname,<span class="hljs-string">'src/js/components'</span>)
    }
  },

  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.(js|jsx)$/</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        use: {
          loader: <span class="hljs-string">"babel-loader"</span>,
          options: {
            presets: [<span class="hljs-string">'env'</span>, <span class="hljs-string">'react'</span>]
          }
        }
      }, {
        test: <span class="hljs-regexp">/\.less$/</span>,
        exclude: <span class="hljs-regexp">/node_modules/</span>,
        use: ExtractTextPlugin.extract({
          fallback: <span class="hljs-string">'style-loader'</span>,
          use: [<span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'postcss-loader'</span>, <span class="hljs-string">'less-loader'</span>]
        })
      }, {
        test: <span class="hljs-regexp">/\.css$/</span>,
        <span class="hljs-comment">// exclude: /node_modules/, 删掉次行  不然打包会报错  因为antd.css 在node_modules中</span>
        use: ExtractTextPlugin.extract({
          fallback: <span class="hljs-string">'style-loader'</span>,
          use: [<span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'postcss-loader'</span>]
        })
      }, {
        test: <span class="hljs-regexp">/\.(png|gif|jpg|jpeg|bmp)$/i</span>,
        use: {
          loader: <span class="hljs-string">'url-loader'</span>,
          options: {
            limit: <span class="hljs-string">'8192'</span>,
            outputPath: <span class="hljs-string">'images/'</span>,
            publicPath : <span class="hljs-string">'/images'</span>
          }
        }
      }, {
        test: <span class="hljs-regexp">/\.(woff|woff2|svg|ttf|eot)($|\?)/i</span>,
        use: {
          loader: <span class="hljs-string">'url-loader'</span>,
          options: {
            limit: <span class="hljs-string">'8192'</span>,
            outputPath: <span class="hljs-string">'font/'</span>
          }
        }
      }
    ]
  },
  plugins: [
    <span class="hljs-comment">// webpack 内置的 banner-plugin</span>
    <span class="hljs-keyword">new</span> webpack.BannerPlugin(<span class="hljs-string">"Copyright by 765745342@qq.com"</span>),

    <span class="hljs-comment">// html 模板插件</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      template: __dirname + <span class="hljs-string">'/index.html'</span>
    }),

    <span class="hljs-comment">// 定义为生产环境，编译 React 时压缩到最小</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: {
        <span class="hljs-string">'NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV)
      }
    }),

    <span class="hljs-comment">// 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID</span>
    <span class="hljs-keyword">new</span> webpack.optimize.OccurrenceOrderPlugin(),

    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
      compress: {
        <span class="hljs-comment">//supresses warnings, usually from module minification</span>
        warnings: <span class="hljs-literal">false</span>
      }
    }),

    <span class="hljs-comment">// 分离CSS和JS文件</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'css/[name].[chunkhash:8].css'</span>),

    <span class="hljs-comment">// 提供公共代码</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({name: <span class="hljs-string">'vendor'</span>, filename: <span class="hljs-string">'js/[name].[chunkhash:8].js'</span>}),

    <span class="hljs-comment">// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      __DEV__: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-built_in">JSON</span>.parse((process.env.NODE_ENV == <span class="hljs-string">'dev'</span>) || <span class="hljs-string">'false'</span>))
    }),
    <span class="hljs-keyword">new</span> OptimizeCssAssetsPlugin({
      assetNameRegExp: <span class="hljs-regexp">/\.css$/g</span>,
      cssProcessor: <span class="hljs-built_in">require</span>(<span class="hljs-string">'cssnano'</span>),
      cssProcessorOptions: { discardComments: {removeAll: <span class="hljs-literal">true</span> } },
      canPrint: <span class="hljs-literal">true</span>
    })
  ]
}

</code></pre>
<p>有些地方和 <code>webpack.config.js</code> 的配置是一样的我就不做说明了。</p>
<p><code>extract-text-webpack-plugin</code> ： 开发环境下，css 代码是放在整个打包出来的那个 bundle.js 文件中的，发布环境下当然不能混淆在一起。该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象。详细介绍<a href="https://www.npmjs.com/package/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p>
<p><code>webpack.optimize.CommonsChunkPlugin</code> ： 将第三方依赖单独打包。即将 node_modules 文件夹中的代码打包为 vendor.js 将我们自己写的业务代码打包为 app.js。这样有助于缓存，因为在项目维护过程中，第三方依赖不经常变化，而业务代码会经常变化。详细介绍<a href="https://doc.webpack-china.org/plugins/commons-chunk-plugin" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p><code>webpack.optimize.UglifyJsPlugin</code> ： 压缩你的JS代码。详细介绍<a href="https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p><code>optimize-css-assets-webpack-plugin</code> ： CSS代码压缩。详细介绍<a href="https://www.npmjs.com/package/optimize-css-assets-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p>
<p><code>autoprefixer</code> ： Autoprefixer是一个后处理程序，你可以同Sass，Stylus或LESS等预处理器共通使用。它适用于普通的CSS，而你无需关心要为哪些浏览器加前缀，只需全新关注于实现，并使用W3C最新的规范。详细介绍<a href="https://www.npmjs.com/package/autoprefixer" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a><br>这是一个自动给你加上css浏览器前缀，比如<br>你只需写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a {
    display: flex;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">display</span>: flex;
}</code></pre>
<p>这个插件自动给你添加厂商前缀：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">display</span>: -webkit-flex;
    <span class="hljs-attribute">display</span>: -ms-flexbox;
    <span class="hljs-attribute">display</span>: flex;
}</code></pre>
<p>这个插件请注意，你需要下载 <code>postcss-loader</code><br>并且新建文件<code>postcss.config.js</code><br>文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  plugins: {
    'autoprefixer': {browsers: 'last 5 version'}
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>module.exports = {
  plugins: {
    <span class="hljs-string">'autoprefixer'</span>: {browsers: <span class="hljs-string">'last 5 version'</span>}
  }
}
</code></pre>
<p>这里需要额外安装的包：<br><strong>postcss-loader</strong><br><strong>extract-text-webpack-plugin</strong><br><strong>optimize-css-assets-webpack-plugin</strong></p>
<blockquote><h3 id="articleHeader5">启动项目</h3></blockquote>
<p><code>npm start</code></p>
<blockquote><h3 id="articleHeader6">打包项目</h3></blockquote>
<p><code>npm run build</code></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack3搭建React项目详细教程（兼容Webpack4）

## 原文链接
[https://segmentfault.com/a/1190000013413360](https://segmentfault.com/a/1190000013413360)


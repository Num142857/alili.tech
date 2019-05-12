---
title: 'vue-cli脚手架中webpack配置基础文件详解' 
date: 2018-12-01 2:30:12
hidden: true
slug: bmsz1r08vwf
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、前言</h1>
<p>vue-cli是构建vue单页应用的脚手架，输入一串指定的命令行从而自动生成vue.js+wepack的项目模板。这其中webpack发挥了很大的作用，它使得我们的代码模块化，引入一些插件帮我们完善功能可以将文件打包压缩，图片转base64等。后期对项目的配置使得我们对于脚手架自动生成的代码的理解更为重要，接下来我将基于webpack3.6.0版本结合文档将文件各个击破，纯干料。<br>重点章节点击查看：<a href="https://segmentfault.com/a/1190000014804826#articleHeader2">package.json</a>；<a href="https://segmentfault.com/a/1190000014804826#articleHeader10" target="_blank">config/index.js</a>；<a href="https://segmentfault.com/a/1190000014804826#articleHeader16">webpack.base.conf.js</a>；<a href="https://segmentfault.com/a/1190000014804826#articleHeader17" target="_blank">webpack.dev.conf.js</a>；<a href="https://segmentfault.com/a/1190000014804826#articleHeader18">webpack.prod.conf.js</a></p>
<h1 id="articleHeader1">二、主体结构</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─build 
├─config 
├─dist
├─node_modules
├─src
│ ├─assets
│ ├─components
│ ├─router
│ ├─App.vue
│ ├─main.js
├─static
├─.babelrc
├─.editorconfig
├─.gitignore
├─.postcssrc.js
├─index.html
├─package-lock.json
├─package.json
└─README.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├─build 
├─config 
├─dist
├─node_modules
├─src
│ ├─assets
│ ├─components
│ ├─router
│ ├─App<span class="hljs-selector-class">.vue</span>
│ ├─main<span class="hljs-selector-class">.js</span>
├─static
├─<span class="hljs-selector-class">.babelrc</span>
├─<span class="hljs-selector-class">.editorconfig</span>
├─<span class="hljs-selector-class">.gitignore</span>
├─<span class="hljs-selector-class">.postcssrc</span><span class="hljs-selector-class">.js</span>
├─index<span class="hljs-selector-class">.html</span>
├─package-lock<span class="hljs-selector-class">.json</span>
├─package<span class="hljs-selector-class">.json</span>
└─README.md</code></pre>
<h2 id="articleHeader2">1、 <strong>package.json</strong>
</h2>
<p>项目作为一个大家庭，每个文件都各司其职。package.json来制定名单，需要哪些npm包来参与到项目中来，npm install命令根据这个配置文件增减来管理本地的安装包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
//从name到private都是package的配置信息，也就是我们在脚手架搭建中输入的项目描述
  &quot;name&quot;: &quot;shop&quot;,//项目名称：不能以.(点)或者_（下划线）开头，不能包含大写字母，具有明确的的含义与现有项目名字不重复
  &quot;version&quot;: &quot;1.0.0&quot;,//项目版本号：遵循“大版本.次要版本.小版本”
  &quot;description&quot;: &quot;A Vue.js project&quot;,//项目描述
  &quot;author&quot;: &quot;qietuniu&quot;,//作者名字
  &quot;private&quot;: true,//是否私有
  //scripts中的子项即是我们在控制台运行的脚本的缩写
  &quot;scripts&quot;: {
   //①webpack-dev-server:启动了http服务器，实现实时编译;
   //inline模式会在webpack.config.js入口配置中新增webpack-dev-server/client?http://localhost:8080/的入口,使得我们访问路径为localhost:8080/index.html（相应的还有另外一种模式Iframe）;
   //progress:显示打包的进度
    &quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;,  
    &quot;start&quot;: &quot;npm run dev&quot;,//与npm run dev相同，直接运行开发环境
    &quot;build&quot;: &quot;node build/build.js&quot;//使用node运行build文件
  },
  //②dependencies(项目依赖库):在安装时使用--save则写入到dependencies
  &quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.5.2&quot;,//vue.js
    &quot;vue-router&quot;: &quot;^3.0.1&quot;//vue的路由插件
  },
  //和devDependencies（开发依赖库）：在安装时使用--save-dev将写入到devDependencies
  &quot;devDependencies&quot;: {
    &quot;autoprefixer&quot;: &quot;^7.1.2&quot;,//autoprefixer作为postcss插件用来解析CSS补充前缀，例如 display: flex会补充为display:-webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex。
    //babel:以下几个babel开头的都是针对es6解析的插件。用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本
    &quot;babel-core&quot;: &quot;^6.22.1&quot;,//babel的核心，把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。
    &quot;babel-helper-vue-jsx-merge-props&quot;: &quot;^2.0.3&quot;,//预制babel-template函数，提供给vue,jsx等使用
    &quot;babel-loader&quot;: &quot;^7.1.1&quot;,//使项目运行使用Babel和webpack来传输js文件，使用babel-core提供的api进行转译
    &quot;babel-plugin-syntax-jsx&quot;: &quot;^6.18.0&quot;,//支持jsx
    &quot;babel-plugin-transform-runtime&quot;: &quot;^6.22.0&quot;,//避免编译输出中的重复，直接编译到build环境中
    &quot;babel-plugin-transform-vue-jsx&quot;: &quot;^3.5.0&quot;,//babel转译过程中使用到的插件，避免重复
    &quot;babel-preset-env&quot;: &quot;^1.3.2&quot;,//转为es5，transform阶段使用到的插件之一
    &quot;babel-preset-stage-2&quot;: &quot;^6.22.0&quot;,//ECMAScript第二阶段的规范
    &quot;chalk&quot;: &quot;^2.0.1&quot;,//用来在命令行输出不同颜色文字
    &quot;copy-webpack-plugin&quot;: &quot;^4.0.1&quot;,//拷贝资源和文件
    &quot;css-loader&quot;: &quot;^0.28.0&quot;,//webpack先用css-loader加载器去解析后缀为css的文件，再使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里
    &quot;extract-text-webpack-plugin&quot;: &quot;^3.0.0&quot;,//将一个以上的包里面的文本提取到单独文件中
    &quot;file-loader&quot;: &quot;^1.1.4&quot;,//③打包压缩文件，与url-loader用法类似
    &quot;friendly-errors-webpack-plugin&quot;: &quot;^1.6.1&quot;,//识别某些类别的WebPACK错误和清理，聚合和优先排序，以提供更好的开发经验
    &quot;html-webpack-plugin&quot;: &quot;^2.30.1&quot;,//简化了HTML文件的创建，引入了外部资源，创建html的入口文件，可通过此项进行多页面的配置
    &quot;node-notifier&quot;: &quot;^5.1.2&quot;,//支持使用node发送跨平台的本地通知
    &quot;optimize-css-assets-webpack-plugin&quot;: &quot;^3.2.0&quot;,//压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
    &quot;ora&quot;: &quot;^1.2.0&quot;,//加载（loading）的插件
    &quot;portfinder&quot;: &quot;^1.0.13&quot;,//查看进程端口
    &quot;postcss-import&quot;: &quot;^11.0.0&quot;,//可以消耗本地文件、节点模块或web_modules
    &quot;postcss-loader&quot;: &quot;^2.0.8&quot;,//用来兼容css的插件
    &quot;postcss-url&quot;: &quot;^7.2.1&quot;,//URL上重新定位、内联或复制
    &quot;rimraf&quot;: &quot;^2.6.0&quot;,//节点的UNIX命令RM—RF,强制删除文件或者目录的命令
    &quot;semver&quot;: &quot;^5.3.0&quot;,//用来对特定的版本号做判断的
    &quot;shelljs&quot;: &quot;^0.7.6&quot;,//使用它来消除shell脚本在UNIX上的依赖性，同时仍然保留其熟悉和强大的命令，即可执行Unix系统命令
    &quot;uglifyjs-webpack-plugin&quot;: &quot;^1.1.1&quot;,//压缩js文件
    &quot;url-loader&quot;: &quot;^0.5.8&quot;,//压缩文件，可将图片转化为base64
    &quot;vue-loader&quot;: &quot;^13.3.0&quot;,//VUE单文件组件的WebPACK加载器
    &quot;vue-style-loader&quot;: &quot;^3.0.1&quot;,//类似于样式加载程序，您可以在CSS加载器之后将其链接，以将CSS动态地注入到文档中作为样式标签
    &quot;vue-template-compiler&quot;: &quot;^2.5.2&quot;,//这个包可以用来预编译VUE模板到渲染函数，以避免运行时编译开销和CSP限制
    &quot;webpack&quot;: &quot;^3.6.0&quot;,//打包工具
    &quot;webpack-bundle-analyzer&quot;: &quot;^2.9.0&quot;,//可视化webpack输出文件的大小
    &quot;webpack-dev-server&quot;: &quot;^2.9.1&quot;,//提供一个提供实时重载的开发服务器
    &quot;webpack-merge&quot;: &quot;^4.1.0&quot;//它将数组和合并对象创建一个新对象。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值封装在函数中
  },
  //engines是引擎，指定node和npm版本
  &quot;engines&quot;: {
    &quot;node&quot;: &quot;>= 6.0.0&quot;,
    &quot;npm&quot;: &quot;>= 3.0.0&quot;
  },
  //限制了浏览器或者客户端需要什么版本才可运行
  &quot;browserslist&quot;: [
    &quot;> 1%&quot;,
    &quot;last 2 versions&quot;,
    &quot;not ie <= 8&quot;
  ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
<span class="hljs-comment">//从name到private都是package的配置信息，也就是我们在脚手架搭建中输入的项目描述</span>
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"shop"</span>,<span class="hljs-comment">//项目名称：不能以.(点)或者_（下划线）开头，不能包含大写字母，具有明确的的含义与现有项目名字不重复</span>
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,<span class="hljs-comment">//项目版本号：遵循“大版本.次要版本.小版本”</span>
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"A Vue.js project"</span>,<span class="hljs-comment">//项目描述</span>
  <span class="hljs-string">"author"</span>: <span class="hljs-string">"qietuniu"</span>,<span class="hljs-comment">//作者名字</span>
  <span class="hljs-string">"private"</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//是否私有</span>
  <span class="hljs-comment">//scripts中的子项即是我们在控制台运行的脚本的缩写</span>
  <span class="hljs-string">"scripts"</span>: {
   <span class="hljs-comment">//①webpack-dev-server:启动了http服务器，实现实时编译;</span>
   <span class="hljs-comment">//inline模式会在webpack.config.js入口配置中新增webpack-dev-server/client?http://localhost:8080/的入口,使得我们访问路径为localhost:8080/index.html（相应的还有另外一种模式Iframe）;</span>
   <span class="hljs-comment">//progress:显示打包的进度</span>
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"</span>,  
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,<span class="hljs-comment">//与npm run dev相同，直接运行开发环境</span>
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span><span class="hljs-comment">//使用node运行build文件</span>
  },
  <span class="hljs-comment">//②dependencies(项目依赖库):在安装时使用--save则写入到dependencies</span>
  <span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-string">"vue"</span>: <span class="hljs-string">"^2.5.2"</span>,<span class="hljs-comment">//vue.js</span>
    <span class="hljs-string">"vue-router"</span>: <span class="hljs-string">"^3.0.1"</span><span class="hljs-comment">//vue的路由插件</span>
  },
  <span class="hljs-comment">//和devDependencies（开发依赖库）：在安装时使用--save-dev将写入到devDependencies</span>
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"autoprefixer"</span>: <span class="hljs-string">"^7.1.2"</span>,<span class="hljs-comment">//autoprefixer作为postcss插件用来解析CSS补充前缀，例如 display: flex会补充为display:-webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex。</span>
    <span class="hljs-comment">//babel:以下几个babel开头的都是针对es6解析的插件。用最新标准编写的 JavaScript 代码向下编译成可以在今天随处可用的版本</span>
    <span class="hljs-string">"babel-core"</span>: <span class="hljs-string">"^6.22.1"</span>,<span class="hljs-comment">//babel的核心，把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。</span>
    <span class="hljs-string">"babel-helper-vue-jsx-merge-props"</span>: <span class="hljs-string">"^2.0.3"</span>,<span class="hljs-comment">//预制babel-template函数，提供给vue,jsx等使用</span>
    <span class="hljs-string">"babel-loader"</span>: <span class="hljs-string">"^7.1.1"</span>,<span class="hljs-comment">//使项目运行使用Babel和webpack来传输js文件，使用babel-core提供的api进行转译</span>
    <span class="hljs-string">"babel-plugin-syntax-jsx"</span>: <span class="hljs-string">"^6.18.0"</span>,<span class="hljs-comment">//支持jsx</span>
    <span class="hljs-string">"babel-plugin-transform-runtime"</span>: <span class="hljs-string">"^6.22.0"</span>,<span class="hljs-comment">//避免编译输出中的重复，直接编译到build环境中</span>
    <span class="hljs-string">"babel-plugin-transform-vue-jsx"</span>: <span class="hljs-string">"^3.5.0"</span>,<span class="hljs-comment">//babel转译过程中使用到的插件，避免重复</span>
    <span class="hljs-string">"babel-preset-env"</span>: <span class="hljs-string">"^1.3.2"</span>,<span class="hljs-comment">//转为es5，transform阶段使用到的插件之一</span>
    <span class="hljs-string">"babel-preset-stage-2"</span>: <span class="hljs-string">"^6.22.0"</span>,<span class="hljs-comment">//ECMAScript第二阶段的规范</span>
    <span class="hljs-string">"chalk"</span>: <span class="hljs-string">"^2.0.1"</span>,<span class="hljs-comment">//用来在命令行输出不同颜色文字</span>
    <span class="hljs-string">"copy-webpack-plugin"</span>: <span class="hljs-string">"^4.0.1"</span>,<span class="hljs-comment">//拷贝资源和文件</span>
    <span class="hljs-string">"css-loader"</span>: <span class="hljs-string">"^0.28.0"</span>,<span class="hljs-comment">//webpack先用css-loader加载器去解析后缀为css的文件，再使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里</span>
    <span class="hljs-string">"extract-text-webpack-plugin"</span>: <span class="hljs-string">"^3.0.0"</span>,<span class="hljs-comment">//将一个以上的包里面的文本提取到单独文件中</span>
    <span class="hljs-string">"file-loader"</span>: <span class="hljs-string">"^1.1.4"</span>,<span class="hljs-comment">//③打包压缩文件，与url-loader用法类似</span>
    <span class="hljs-string">"friendly-errors-webpack-plugin"</span>: <span class="hljs-string">"^1.6.1"</span>,<span class="hljs-comment">//识别某些类别的WebPACK错误和清理，聚合和优先排序，以提供更好的开发经验</span>
    <span class="hljs-string">"html-webpack-plugin"</span>: <span class="hljs-string">"^2.30.1"</span>,<span class="hljs-comment">//简化了HTML文件的创建，引入了外部资源，创建html的入口文件，可通过此项进行多页面的配置</span>
    <span class="hljs-string">"node-notifier"</span>: <span class="hljs-string">"^5.1.2"</span>,<span class="hljs-comment">//支持使用node发送跨平台的本地通知</span>
    <span class="hljs-string">"optimize-css-assets-webpack-plugin"</span>: <span class="hljs-string">"^3.2.0"</span>,<span class="hljs-comment">//压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)</span>
    <span class="hljs-string">"ora"</span>: <span class="hljs-string">"^1.2.0"</span>,<span class="hljs-comment">//加载（loading）的插件</span>
    <span class="hljs-string">"portfinder"</span>: <span class="hljs-string">"^1.0.13"</span>,<span class="hljs-comment">//查看进程端口</span>
    <span class="hljs-string">"postcss-import"</span>: <span class="hljs-string">"^11.0.0"</span>,<span class="hljs-comment">//可以消耗本地文件、节点模块或web_modules</span>
    <span class="hljs-string">"postcss-loader"</span>: <span class="hljs-string">"^2.0.8"</span>,<span class="hljs-comment">//用来兼容css的插件</span>
    <span class="hljs-string">"postcss-url"</span>: <span class="hljs-string">"^7.2.1"</span>,<span class="hljs-comment">//URL上重新定位、内联或复制</span>
    <span class="hljs-string">"rimraf"</span>: <span class="hljs-string">"^2.6.0"</span>,<span class="hljs-comment">//节点的UNIX命令RM—RF,强制删除文件或者目录的命令</span>
    <span class="hljs-string">"semver"</span>: <span class="hljs-string">"^5.3.0"</span>,<span class="hljs-comment">//用来对特定的版本号做判断的</span>
    <span class="hljs-string">"shelljs"</span>: <span class="hljs-string">"^0.7.6"</span>,<span class="hljs-comment">//使用它来消除shell脚本在UNIX上的依赖性，同时仍然保留其熟悉和强大的命令，即可执行Unix系统命令</span>
    <span class="hljs-string">"uglifyjs-webpack-plugin"</span>: <span class="hljs-string">"^1.1.1"</span>,<span class="hljs-comment">//压缩js文件</span>
    <span class="hljs-string">"url-loader"</span>: <span class="hljs-string">"^0.5.8"</span>,<span class="hljs-comment">//压缩文件，可将图片转化为base64</span>
    <span class="hljs-string">"vue-loader"</span>: <span class="hljs-string">"^13.3.0"</span>,<span class="hljs-comment">//VUE单文件组件的WebPACK加载器</span>
    <span class="hljs-string">"vue-style-loader"</span>: <span class="hljs-string">"^3.0.1"</span>,<span class="hljs-comment">//类似于样式加载程序，您可以在CSS加载器之后将其链接，以将CSS动态地注入到文档中作为样式标签</span>
    <span class="hljs-string">"vue-template-compiler"</span>: <span class="hljs-string">"^2.5.2"</span>,<span class="hljs-comment">//这个包可以用来预编译VUE模板到渲染函数，以避免运行时编译开销和CSP限制</span>
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^3.6.0"</span>,<span class="hljs-comment">//打包工具</span>
    <span class="hljs-string">"webpack-bundle-analyzer"</span>: <span class="hljs-string">"^2.9.0"</span>,<span class="hljs-comment">//可视化webpack输出文件的大小</span>
    <span class="hljs-string">"webpack-dev-server"</span>: <span class="hljs-string">"^2.9.1"</span>,<span class="hljs-comment">//提供一个提供实时重载的开发服务器</span>
    <span class="hljs-string">"webpack-merge"</span>: <span class="hljs-string">"^4.1.0"</span><span class="hljs-comment">//它将数组和合并对象创建一个新对象。如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值封装在函数中</span>
  },
  <span class="hljs-comment">//engines是引擎，指定node和npm版本</span>
  <span class="hljs-string">"engines"</span>: {
    <span class="hljs-string">"node"</span>: <span class="hljs-string">"&gt;= 6.0.0"</span>,
    <span class="hljs-string">"npm"</span>: <span class="hljs-string">"&gt;= 3.0.0"</span>
  },
  <span class="hljs-comment">//限制了浏览器或者客户端需要什么版本才可运行</span>
  <span class="hljs-string">"browserslist"</span>: [
    <span class="hljs-string">"&gt; 1%"</span>,
    <span class="hljs-string">"last 2 versions"</span>,
    <span class="hljs-string">"not ie &lt;= 8"</span>
  ]
}
</code></pre>
<p>注释：<br>①、<a href="https://webpack.js.org/configuration/dev-server/#devserver" rel="nofollow noreferrer" target="_blank">点这里→webpack运行时的配置文档传送门</a></p>
<p>②、<strong>devDependencies和dependencies的区别</strong>： devDependencies里面的插件只用于开发环境，不用于生产环境，即辅助作用，打包的时候需要，打包完成就不需要了。而dependencies是需要发布到生产环境的，自始至终都在。比如wepack等只是在开发中使用的包就写入到devDependencies，而像vue这种项目全程依赖的包要写入到dependencies<br><a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">点这里→更多安装包文档搜索页传送门</a> </p>
<p>③、<strong>file-loader和url-loader的区别</strong>：以图片为例，file-loader可对图片进行压缩，但是还是通过文件路径进行引入，当http请求增多时会降低页面性能，而url-loader通过设定limit参数，小于limit字节的图片会被转成base64的文件，大于limit字节的将进行图片压缩的操作。总而言之，url-loader是file-loader的上层封装。<br><a href="https://blog.csdn.net/qq_38652603/article/details/73835153" rel="nofollow noreferrer" target="_blank">点这里→file-loader 和 url-loader详解</a><br><a href="https://www.npmjs.com/package/file-loader" rel="nofollow noreferrer" target="_blank">点这里→file-loader文档传送门</a><br><a href="https://www.npmjs.com/package/url-loader" rel="nofollow noreferrer" target="_blank">点这里→url-loader文档传送门</a></p>
<h2 id="articleHeader3">2、<strong>.postcssrc.js</strong>
</h2>
<p>.postcssrc.js文件其实是postcss-loader包的一个配置，在webpack的旧版本可以直接在webpack.config.js中配置，现版本中postcss的文档示例独立出.postcssrc.js，里面写进去需要使用到的插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  &quot;plugins&quot;: {
    &quot;postcss-import&quot;: {},//①
    &quot;postcss-url&quot;: {},//②
    &quot;autoprefixer&quot;: {}//③
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-string">"plugins"</span>: {
    <span class="hljs-string">"postcss-import"</span>: {},<span class="hljs-comment">//①</span>
    <span class="hljs-string">"postcss-url"</span>: {},<span class="hljs-comment">//②</span>
    <span class="hljs-string">"autoprefixer"</span>: {}<span class="hljs-comment">//③</span>
  }
}</code></pre>
<p>注释：<br>①、<a href="https://www.npmjs.com/package/postcss-import" rel="nofollow noreferrer" target="_blank">点这里→postcss-import文档传送门</a><br>②、<a href="https://www.npmjs.com/package/postcss-url" rel="nofollow noreferrer" target="_blank">点这里→postcss-url文档传送门</a><br>③、<a href="https://www.npmjs.com/package/autoprefixer" rel="nofollow noreferrer" target="_blank">点这里→autoprefixer文档传送门</a></p>
<h2 id="articleHeader4">3、 <strong>.babelrc</strong>
</h2>
<p>该文件是es6解析的一个配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
//制定转码的规则
  &quot;presets&quot;: [
  //env是使用babel-preset-env插件将js进行转码成es5，并且设置不转码的AMD,COMMONJS的模块文件，制定浏览器的兼容
    [&quot;env&quot;, {
      &quot;modules&quot;: false,
      &quot;targets&quot;: {
        &quot;browsers&quot;: [&quot;> 1%&quot;, &quot;last 2 versions&quot;, &quot;not ie <= 8&quot;]
      }
    }],
    &quot;stage-2&quot;
  ],
  
  &quot;plugins&quot;: [&quot;transform-vue-jsx&quot;, &quot;transform-runtime&quot;]//①
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
//制定转码的规则
  <span class="hljs-string">"presets"</span>: [
  //env是使用babel-preset-env插件将js进行转码成es5，并且设置不转码的AMD,COMMONJS的模块文件，制定浏览器的兼容
    [<span class="hljs-string">"env"</span>, {
      <span class="hljs-string">"modules"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-string">"targets"</span>: {
        <span class="hljs-string">"browsers"</span>: [<span class="hljs-string">"&gt; 1%"</span>, <span class="hljs-string">"last 2 versions"</span>, <span class="hljs-string">"not ie &lt;= 8"</span>]
      }
    }],
    <span class="hljs-string">"stage-2"</span>
  ],
  
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-vue-jsx"</span>, <span class="hljs-string">"transform-runtime"</span>]//①
}</code></pre>
<p>注释：<br>①、<a href="https://www.npmjs.com/package/transform-vue-jsx" rel="nofollow noreferrer" target="_blank">点这里→transform-vue-jsx文档传送门</a><br><a href="https://www.npmjs.com/package/transform-runtime" rel="nofollow noreferrer" target="_blank">点这里→transform-runtime文档传送门</a></p>
<h2 id="articleHeader5">4、src内文件</h2>
<p>我们开发的代码都存放在src目录下，根据需要我们通常会再建一些文件夹。比如pages的文件夹，用来存放页面让components文件夹专门做好组件的工作；api文件夹，来封装请求的参数和方法；store文件夹，使用vuex来作为vue的状态管理工具，我也常叫它作前端的数据库等。</p>
<hr>
<p>①、assets文件：脚手架自动会放入一个图片在里面作为初始页面的logo。平常我们使用的时候会在里面建立js，css，img，fonts等文件夹，作为静态资源调用</p>
<p>②、components文件夹：用来存放组件，合理地使用组件可以高效地实现复用等功能，从而更好地开发项目。一般情况下比如创建头部组件的时候，我们会新建一个header的文件夹，然后再新建一个header.vue的文件</p>
<p>③、router文件夹：该文件夹下有一个叫index.js文件，用于实现页面的路由跳转，具体使用请<a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">点击→vue-router传送门</a></p>
<p>④、App.vue：作为我们的主组件，可通过使用&lt;router-view/&gt;开放入口让其他的页面组件得以显示。</p>
<p>⑤、main.js：作为我们的入口文件，主要作用是初始化vue实例并使用需要的插件，小型项目省略router时可放在该处</p>
<p>注释：具体vue的用法可查看<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue官方中文文档传送门</a></p>
<h2 id="articleHeader6">5、其他文件</h2>
<p>①、.editorconfig：编辑器的配置文件</p>
<p>②、.gitignore：忽略git提交的一个文件，配置之后提交时将不会加载忽略的文件</p>
<p>③、index.html：页面入口，经过编译之后的代码将插入到这来。</p>
<p>④、package.lock.json：锁定安装时的包的版本号，并且需要上传到git，以保证其他人在npm install时大家的依赖能保证一致</p>
<p>⑤、README.md：可此填写项目介绍</p>
<p>⑥、node_modules：根据package.json安装时候生成的的依赖（安装包）</p>
<h1 id="articleHeader7">三、config文件夹</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─config 
│ ├─dev.env.js 
│ ├─index.js 
│ ├─prod.env.js " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├─config 
│ ├─dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span> 
│ ├─index<span class="hljs-selector-class">.js</span> 
│ ├─prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span> </code></pre>
<h2 id="articleHeader8">1、config/dev.env.js</h2>
<p>config内的文件其实是服务于build的，大部分是定义一个变量export出去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'//采用严格模式
const merge = require('webpack-merge')//①
const prodEnv = require('./prod.env')
//webpack-merge提供了一个合并函数，它将数组和合并对象创建一个新对象。
//如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值封装在函数中.这边将dev和prod进行合并
module.exports = merge(prodEnv, {
  NODE_ENV: '&quot;development&quot;'
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span><span class="hljs-comment">//采用严格模式</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)<span class="hljs-comment">//①</span>
<span class="hljs-keyword">const</span> prodEnv = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./prod.env'</span>)
<span class="hljs-comment">//webpack-merge提供了一个合并函数，它将数组和合并对象创建一个新对象。</span>
<span class="hljs-comment">//如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值封装在函数中.这边将dev和prod进行合并</span>
<span class="hljs-built_in">module</span>.exports = merge(prodEnv, {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"development"'</span>
})
</code></pre>
<p>注释：①、<a href="https://www.npmjs.com/package/webpack-merge" rel="nofollow noreferrer" target="_blank">点这里→webpack-merge文档传送门</a></p>
<h2 id="articleHeader9">2、config/prod.env.js</h2>
<p>当开发是调取dev.env.js的开发环境配置，发布时调用prod.env.js的生产环境配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
module.exports = {
  NODE_ENV: '&quot;production&quot;'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">NODE_ENV</span>: <span class="hljs-string">'"production"'</span>
}</code></pre>
<h2 id="articleHeader10">3、config/index.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const path = require('path')

module.exports = {
  dev: {
    // 开发环境下面的配置
    assetsSubDirectory: 'static',//子目录，一般存放css,js,image等文件
    assetsPublicPath: '/',//根目录
    proxyTable: {},//可利用该属性解决跨域的问题
    host: 'localhost', // 地址
    port: 8080, //端口号设置，端口号占用出现问题可在此处修改
    autoOpenBrowser: false,//是否在编译（输入命令行npm run dev）后打开http://localhost:8080/页面，以前配置为true，近些版本改为false，个人偏向习惯自动打开页面
    errorOverlay: true,//浏览器错误提示
    notifyOnErrors: true,//跨平台错误提示
    poll: false, //使用文件系统(file system)获取文件改动的通知devServer.watchOptions
    devtool: 'cheap-module-eval-source-map',//增加调试，该属性为原始源代码（仅限行）不可在生产环境中使用
    cacheBusting: true,//使缓存失效
    cssSourceMap: true//代码压缩后进行调bug定位将非常困难，于是引入sourcemap记录压缩前后的位置信息记录，当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试
  },

  build: {
  // 生产环境下面的配置
    index: path.resolve(__dirname, '../dist/index.html'),//index编译后生成的位置和名字，根据需要改变后缀，比如index.php
    assetsRoot: path.resolve(__dirname, '../dist'),//编译后存放生成环境代码的位置
    assetsSubDirectory: 'static',//js,css,images存放文件夹名
    assetsPublicPath: '/',//发布的根目录，通常本地打包dist后打开文件会报错，此处修改为./。如果是上线的文件，可根据文件存放位置进行更改路径
    productionSourceMap: true,
    devtool: '#source-map',//①
    //unit的gzip命令用来压缩文件，gzip模式下需要压缩的文件的扩展名有js和css
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">dev</span>: {
    <span class="hljs-comment">// 开发环境下面的配置</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,<span class="hljs-comment">//子目录，一般存放css,js,image等文件</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,<span class="hljs-comment">//根目录</span>
    proxyTable: {},<span class="hljs-comment">//可利用该属性解决跨域的问题</span>
    host: <span class="hljs-string">'localhost'</span>, <span class="hljs-comment">// 地址</span>
    port: <span class="hljs-number">8080</span>, <span class="hljs-comment">//端口号设置，端口号占用出现问题可在此处修改</span>
    autoOpenBrowser: <span class="hljs-literal">false</span>,<span class="hljs-comment">//是否在编译（输入命令行npm run dev）后打开http://localhost:8080/页面，以前配置为true，近些版本改为false，个人偏向习惯自动打开页面</span>
    errorOverlay: <span class="hljs-literal">true</span>,<span class="hljs-comment">//浏览器错误提示</span>
    notifyOnErrors: <span class="hljs-literal">true</span>,<span class="hljs-comment">//跨平台错误提示</span>
    poll: <span class="hljs-literal">false</span>, <span class="hljs-comment">//使用文件系统(file system)获取文件改动的通知devServer.watchOptions</span>
    devtool: <span class="hljs-string">'cheap-module-eval-source-map'</span>,<span class="hljs-comment">//增加调试，该属性为原始源代码（仅限行）不可在生产环境中使用</span>
    cacheBusting: <span class="hljs-literal">true</span>,<span class="hljs-comment">//使缓存失效</span>
    cssSourceMap: <span class="hljs-literal">true</span><span class="hljs-comment">//代码压缩后进行调bug定位将非常困难，于是引入sourcemap记录压缩前后的位置信息记录，当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试</span>
  },

  <span class="hljs-attr">build</span>: {
  <span class="hljs-comment">// 生产环境下面的配置</span>
    index: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),<span class="hljs-comment">//index编译后生成的位置和名字，根据需要改变后缀，比如index.php</span>
    assetsRoot: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),<span class="hljs-comment">//编译后存放生成环境代码的位置</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,<span class="hljs-comment">//js,css,images存放文件夹名</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,<span class="hljs-comment">//发布的根目录，通常本地打包dist后打开文件会报错，此处修改为./。如果是上线的文件，可根据文件存放位置进行更改路径</span>
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#source-map'</span>,<span class="hljs-comment">//①</span>
    <span class="hljs-comment">//unit的gzip命令用来压缩文件，gzip模式下需要压缩的文件的扩展名有js和css</span>
    productionGzip: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">productionGzipExtensions</span>: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],
    <span class="hljs-attr">bundleAnalyzerReport</span>: process.env.npm_config_report
  }
}
</code></pre>
<p>注释：<a href="https://doc.webpack-china.org/configuration/devtool" rel="nofollow noreferrer" target="_blank">①点击→devtool文档传送门</a></p>
<h1 id="articleHeader11">四、build文件夹</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─build 
│ ├─build.js 
│ ├─check-versions.js 
│ ├─utils.js 
│ ├─vue-loader.conf.js 
│ ├─webpack.base.conf.js 
│ ├─webpack.dev.conf.js 
│ ├─webpack.prod.conf.js " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├─build 
│ ├─build<span class="hljs-selector-class">.js</span> 
│ ├─check-versions<span class="hljs-selector-class">.js</span> 
│ ├─utils<span class="hljs-selector-class">.js</span> 
│ ├─vue-loader<span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> 
│ ├─webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> 
│ ├─webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> 
│ ├─webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> </code></pre>
<h2 id="articleHeader12">1、build/build.js</h2>
<p>该文件作用，即构建生产版本。package.json中的scripts的build就是node build/build.js，输入命令行npm run build对该文件进行编译生成生产环境的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
require('./check-versions')()//check-versions：调用检查版本的文件。加（）代表直接调用该函数
process.env.NODE_ENV = 'production'//设置当前是生产环境
//下面定义常量引入插件
const ora = require('ora')//①加载动画
const rm = require('rimraf')//②删除文件
const path = require('path')
const chalk = require('chalk')//③对文案输出的一个彩色设置
const webpack = require('webpack')
const config = require('../config')//默认读取下面的index.js文件
const webpackConfig = require('./webpack.prod.conf')
//调用start的方法实现加载动画，优化用户体验
const spinner = ora('building for production...')
spinner.start()
//先删除dist文件再生成新文件，因为有时候会使用hash来命名，删除整个文件可避免冗余
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./check-versions'</span>)()<span class="hljs-comment">//check-versions：调用检查版本的文件。加（）代表直接调用该函数</span>
process.env.NODE_ENV = <span class="hljs-string">'production'</span><span class="hljs-comment">//设置当前是生产环境</span>
<span class="hljs-comment">//下面定义常量引入插件</span>
<span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ora'</span>)<span class="hljs-comment">//①加载动画</span>
<span class="hljs-keyword">const</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)<span class="hljs-comment">//②删除文件</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)<span class="hljs-comment">//③对文案输出的一个彩色设置</span>
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)<span class="hljs-comment">//默认读取下面的index.js文件</span>
<span class="hljs-keyword">const</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)
<span class="hljs-comment">//调用start的方法实现加载动画，优化用户体验</span>
<span class="hljs-keyword">const</span> spinner = ora(<span class="hljs-string">'building for production...'</span>)
spinner.start()
<span class="hljs-comment">//先删除dist文件再生成新文件，因为有时候会使用hash来命名，删除整个文件可避免冗余</span>
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  webpack(webpackConfig, (err, stats) =&gt; {
    spinner.stop()
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
    process.stdout.write(stats.toString({
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// If you are using ts-loader, setting this to true will make TypeScript errors show up during build.</span>
      chunks: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>
    }) + <span class="hljs-string">'\n\n'</span>)

    <span class="hljs-keyword">if</span> (stats.hasErrors()) {
      process.exit(<span class="hljs-number">1</span>)
    }

    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">'  Build complete.\n'</span>))
    <span class="hljs-built_in">console</span>.log(chalk.yellow(
      <span class="hljs-string">'  Tip: built files are meant to be served over an HTTP server.\n'</span> +
      <span class="hljs-string">'  Opening index.html over file:// won\'t work.\n'</span>
    ))
  })
})</code></pre>
<p>注释：<br>①、<a href="https://www.npmjs.com/package/ora" rel="nofollow noreferrer" target="_blank">点这里→ora文档传送门</a><br>②、<a href="https://www.npmjs.com/package/chalk" rel="nofollow noreferrer" target="_blank">点这里→chalk文档传送门</a><br>③、<a href="https://www.npmjs.com/package/rimraf" rel="nofollow noreferrer" target="_blank">点这里→rimraf文档传送门</a></p>
<h2 id="articleHeader13">2、build/check-version.js</h2>
<p>该文件用于检测node和npm的版本，实现版本依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const chalk = require('chalk')
const semver = require('semver')//①对版本进行检查
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec (cmd) {
//返回通过child_process模块的新建子进程，执行 Unix 系统命令后转成没有空格的字符串
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),//使用semver格式化版本
    versionRequirement: packageConfig.engines.node//获取package.json中设置的node版本
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),// 自动调用npm --version命令，并且把参数返回给exec函数，从而获取纯净的版本号
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []
  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
    //上面这个判断就是如果版本号不符合package.json文件中指定的版本号，就执行下面错误提示的代码
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">const</span> semver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'semver'</span>)<span class="hljs-comment">//①对版本进行检查</span>
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)
<span class="hljs-keyword">const</span> shell = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shelljs'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exec</span> (<span class="hljs-params">cmd</span>) </span>{
<span class="hljs-comment">//返回通过child_process模块的新建子进程，执行 Unix 系统命令后转成没有空格的字符串</span>
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).execSync(cmd).toString().trim()
}

<span class="hljs-keyword">const</span> versionRequirements = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'node'</span>,
    <span class="hljs-attr">currentVersion</span>: semver.clean(process.version),<span class="hljs-comment">//使用semver格式化版本</span>
    versionRequirement: packageConfig.engines.node<span class="hljs-comment">//获取package.json中设置的node版本</span>
  }
]

<span class="hljs-keyword">if</span> (shell.which(<span class="hljs-string">'npm'</span>)) {
  versionRequirements.push({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'npm'</span>,
    <span class="hljs-attr">currentVersion</span>: exec(<span class="hljs-string">'npm --version'</span>),<span class="hljs-comment">// 自动调用npm --version命令，并且把参数返回给exec函数，从而获取纯净的版本号</span>
    versionRequirement: packageConfig.engines.npm
  })
}

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> warnings = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; versionRequirements.length; i++) {
    <span class="hljs-keyword">const</span> mod = versionRequirements[i]

    <span class="hljs-keyword">if</span> (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
    <span class="hljs-comment">//上面这个判断就是如果版本号不符合package.json文件中指定的版本号，就执行下面错误提示的代码</span>
      warnings.push(mod.name + <span class="hljs-string">': '</span> +
        chalk.red(mod.currentVersion) + <span class="hljs-string">' should be '</span> +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  <span class="hljs-keyword">if</span> (warnings.length) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">''</span>)
    <span class="hljs-built_in">console</span>.log(chalk.yellow(<span class="hljs-string">'To use this template, you must update following to modules:'</span>))
    <span class="hljs-built_in">console</span>.log()

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; warnings.length; i++) {
      <span class="hljs-keyword">const</span> warning = warnings[i]
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'  '</span> + warning)
    }

    <span class="hljs-built_in">console</span>.log()
    process.exit(<span class="hljs-number">1</span>)
  }
}
</code></pre>
<p>注释：<br>①、<a href="https://www.npmjs.com/package/chalk" rel="nofollow noreferrer" target="_blank">点这里→chalk文档传送门</a><br><a href="https://www.npmjs.com/package/semver" rel="nofollow noreferrer" target="_blank">点这里→semver文档传送门</a></p>
<h2 id="articleHeader14">3、build/utils.js</h2>
<p>utils是工具的意思，是一个用来处理css的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
//导出文件的位置，根据环境判断开发环境和生产环境，为config文件中index.js文件中定义的build.assetsSubDirectory或dev.assetsSubDirectory
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
//Node.js path 模块提供了一些用于处理文件路径的小工具①
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
//使用了css-loader和postcssLoader，通过options.usePostCSS属性来判断是否使用postcssLoader中压缩等方法
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        //Object.assign是es6语法的浅复制，后两者合并后复制完成赋值
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    
    if (options.extract) {
    //ExtractTextPlugin可提取出文本，代表首先使用上面处理的loaders，当未能正确引入时使用vue-style-loader
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
    //返回vue-style-loader连接loaders的最终值
      return ['vue-style-loader'].concat(loaders)
    }
  }
  return {
    css: generateLoaders(),//需要css-loader 和 vue-style-loader
    postcss: generateLoaders(),//需要css-loader和postcssLoader  和 vue-style-loader
    less: generateLoaders('less'),//需要less-loader 和 vue-style-loader
    sass: generateLoaders('sass', { indentedSyntax: true }),//需要sass-loader 和 vue-style-loader
    scss: generateLoaders('sass'),//需要sass-loader 和 vue-style-loader
    stylus: generateLoaders('stylus'),//需要stylus-loader 和 vue-style-loader
    styl: generateLoaders('stylus')//需要stylus-loader 和 vue-style-loader
  }
}
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
    //将各种css,less,sass等综合在一起得出结果输出output
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
//发送跨平台通知系统
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return
//当报错时输出错误信息的标题，错误信息详情，副标题以及图标
    const error = errors[0]
    const filename = error.file &amp;&amp; error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)
<span class="hljs-comment">//导出文件的位置，根据环境判断开发环境和生产环境，为config文件中index.js文件中定义的build.assetsSubDirectory或dev.assetsSubDirectory</span>
exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">const</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">'production'</span>
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
<span class="hljs-comment">//Node.js path 模块提供了一些用于处理文件路径的小工具①</span>
  <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {}
<span class="hljs-comment">//使用了css-loader和postcssLoader，通过options.usePostCSS属性来判断是否使用postcssLoader中压缩等方法</span>
  <span class="hljs-keyword">const</span> cssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'css-loader'</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">sourceMap</span>: options.sourceMap
    }
  }

  <span class="hljs-keyword">const</span> postcssLoader = {
    <span class="hljs-attr">loader</span>: <span class="hljs-string">'postcss-loader'</span>,
    <span class="hljs-attr">options</span>: {
      <span class="hljs-attr">sourceMap</span>: options.sourceMap
    }
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{
    <span class="hljs-keyword">const</span> loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    <span class="hljs-keyword">if</span> (loader) {
      loaders.push({
        <span class="hljs-attr">loader</span>: loader + <span class="hljs-string">'-loader'</span>,
        <span class="hljs-comment">//Object.assign是es6语法的浅复制，后两者合并后复制完成赋值</span>
        options: <span class="hljs-built_in">Object</span>.assign({}, loaderOptions, {
          <span class="hljs-attr">sourceMap</span>: options.sourceMap
        })
      })
    }
    
    <span class="hljs-keyword">if</span> (options.extract) {
    <span class="hljs-comment">//ExtractTextPlugin可提取出文本，代表首先使用上面处理的loaders，当未能正确引入时使用vue-style-loader</span>
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        <span class="hljs-attr">use</span>: loaders,
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">'vue-style-loader'</span>
      })
    } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">//返回vue-style-loader连接loaders的最终值</span>
      <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }
  }
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">css</span>: generateLoaders(),<span class="hljs-comment">//需要css-loader 和 vue-style-loader</span>
    postcss: generateLoaders(),<span class="hljs-comment">//需要css-loader和postcssLoader  和 vue-style-loader</span>
    less: generateLoaders(<span class="hljs-string">'less'</span>),<span class="hljs-comment">//需要less-loader 和 vue-style-loader</span>
    sass: generateLoaders(<span class="hljs-string">'sass'</span>, { <span class="hljs-attr">indentedSyntax</span>: <span class="hljs-literal">true</span> }),<span class="hljs-comment">//需要sass-loader 和 vue-style-loader</span>
    scss: generateLoaders(<span class="hljs-string">'sass'</span>),<span class="hljs-comment">//需要sass-loader 和 vue-style-loader</span>
    stylus: generateLoaders(<span class="hljs-string">'stylus'</span>),<span class="hljs-comment">//需要stylus-loader 和 vue-style-loader</span>
    styl: generateLoaders(<span class="hljs-string">'stylus'</span>)<span class="hljs-comment">//需要stylus-loader 和 vue-style-loader</span>
  }
}
exports.styleLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">const</span> output = []
  <span class="hljs-keyword">const</span> loaders = exports.cssLoaders(options)
    <span class="hljs-comment">//将各种css,less,sass等综合在一起得出结果输出output</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> extension <span class="hljs-keyword">in</span> loaders) {
    <span class="hljs-keyword">const</span> loader = loaders[extension]
    output.push({
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'\\.'</span> + extension + <span class="hljs-string">'$'</span>),
      <span class="hljs-attr">use</span>: loader
    })
  }

  <span class="hljs-keyword">return</span> output
}

exports.createNotifierCallback = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
<span class="hljs-comment">//发送跨平台通知系统</span>
  <span class="hljs-keyword">const</span> notifier = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-notifier'</span>)

  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">severity, errors</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (severity !== <span class="hljs-string">'error'</span>) <span class="hljs-keyword">return</span>
<span class="hljs-comment">//当报错时输出错误信息的标题，错误信息详情，副标题以及图标</span>
    <span class="hljs-keyword">const</span> error = errors[<span class="hljs-number">0</span>]
    <span class="hljs-keyword">const</span> filename = error.file &amp;&amp; error.file.split(<span class="hljs-string">'!'</span>).pop()

    notifier.notify({
      <span class="hljs-attr">title</span>: packageConfig.name,
      <span class="hljs-attr">message</span>: severity + <span class="hljs-string">': '</span> + error.name,
      <span class="hljs-attr">subtitle</span>: filename || <span class="hljs-string">''</span>,
      <span class="hljs-attr">icon</span>: path.join(__dirname, <span class="hljs-string">'logo.png'</span>)
    })
  }
}
</code></pre>
<p>注释：<br>①、path.posix：提供对路径方法的POSIX（可移植性操作系统接口）特定实现的访问，即可跨平台，区别于win32。<br>path.join：用于连接路径，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是""<br><a href="https://nodejs.org/api/path.html#path_path_posix" rel="nofollow noreferrer" target="_blank">点击→path用法传送门</a></p>
<h2 id="articleHeader15">4、vue-loader.conf.js</h2>
<p>该文件的主要作用就是处理.vue文件，解析这个文件中的每个语言块（template、script、style),转换成js可用的js模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap
//处理项目中的css文件，生产环境和测试环境默认是打开sourceMap，而extract中的提取样式到单独文件只有在生产环境中才需要
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
   // 在模版编译过程中，编译器可以将某些属性，如 src 路径，转换为require调用，以便目标资源可以由 webpack 处理.
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> isProduction = process.env.NODE_ENV === <span class="hljs-string">'production'</span>
<span class="hljs-keyword">const</span> sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap
<span class="hljs-comment">//处理项目中的css文件，生产环境和测试环境默认是打开sourceMap，而extract中的提取样式到单独文件只有在生产环境中才需要</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">loaders</span>: utils.cssLoaders({
    <span class="hljs-attr">sourceMap</span>: sourceMapEnabled,
    <span class="hljs-attr">extract</span>: isProduction
  }),
  <span class="hljs-attr">cssSourceMap</span>: sourceMapEnabled,
  <span class="hljs-attr">cacheBusting</span>: config.dev.cacheBusting,
   <span class="hljs-comment">// 在模版编译过程中，编译器可以将某些属性，如 src 路径，转换为require调用，以便目标资源可以由 webpack 处理.</span>
  transformToRequire: {
    <span class="hljs-attr">video</span>: [<span class="hljs-string">'src'</span>, <span class="hljs-string">'poster'</span>],
    <span class="hljs-attr">source</span>: <span class="hljs-string">'src'</span>,
    <span class="hljs-attr">img</span>: <span class="hljs-string">'src'</span>,
    <span class="hljs-attr">image</span>: <span class="hljs-string">'xlink:href'</span>
  }
}
</code></pre>
<h2 id="articleHeader16">5、webpack.base.conf.js</h2>
<p>webpack.base.conf.js是开发和生产共同使用提出来的基础配置文件，主要实现配制入口，配置输出环境，配置模块resolve和插件等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
//拼接出绝对路径
  return path.join(__dirname, '..', dir)
}
module.exports = {
//path.join将路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃
//path.join('/a', '/b') // 'a/b',path.resolve('/a', '/b') // '/b'
  context: path.resolve(__dirname, '../'),
  //配置入口，默认为单页面所以只有app一个入口
  entry: {
    app: './src/main.js'
  },
  //配置出口，默认是/dist作为目标文件夹的路径
  output: {
    path: config.build.assetsRoot,//路径
    filename: '[name].js',//文件名
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath//公共存放路径
  },
  resolve: {
  //自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
    extensions: ['.js', '.vue', '.json'],
    //创建路径的别名，比如增加'components': resolve('src/components')等
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  //使用插件配置相应文件的处理方法
  module: {
    rules: [
    //使用vue-loader将vue文件转化成js的模块①
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      //js文件需要通过babel-loader进行编译成es5文件以及压缩等操作②
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      //图片、音像、字体都使用url-loader进行处理，超过10000会编译成base64③
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
  },
  //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 
  node: 
    setImmediate: false,
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">dir</span>) </span>{
<span class="hljs-comment">//拼接出绝对路径</span>
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}
<span class="hljs-built_in">module</span>.exports = {
<span class="hljs-comment">//path.join将路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃</span>
<span class="hljs-comment">//path.join('/a', '/b') // 'a/b',path.resolve('/a', '/b') // '/b'</span>
  context: path.resolve(__dirname, <span class="hljs-string">'../'</span>),
  <span class="hljs-comment">//配置入口，默认为单页面所以只有app一个入口</span>
  entry: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/main.js'</span>
  },
  <span class="hljs-comment">//配置出口，默认是/dist作为目标文件夹的路径</span>
  output: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,<span class="hljs-comment">//路径</span>
    filename: <span class="hljs-string">'[name].js'</span>,<span class="hljs-comment">//文件名</span>
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath<span class="hljs-comment">//公共存放路径</span>
  },
  <span class="hljs-attr">resolve</span>: {
  <span class="hljs-comment">//自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-comment">//创建路径的别名，比如增加'components': resolve('src/components')等</span>
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
    }
  },
  <span class="hljs-comment">//使用插件配置相应文件的处理方法</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
    <span class="hljs-comment">//使用vue-loader将vue文件转化成js的模块①</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
      },
      <span class="hljs-comment">//js文件需要通过babel-loader进行编译成es5文件以及压缩等操作②</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>), resolve(<span class="hljs-string">'node_modules/webpack-dev-server/client'</span>)]
      },
      <span class="hljs-comment">//图片、音像、字体都使用url-loader进行处理，超过10000会编译成base64③</span>
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
  },
  <span class="hljs-comment">//以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 </span>
  node: 
    setImmediate: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">dgram</span>: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">fs</span>: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">net</span>: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">tls</span>: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">child_process</span>: <span class="hljs-string">'empty'</span>
  }
}
</code></pre>
<p>注释：<br>①、<a href="https://vue-loader.vuejs.org/" rel="nofollow noreferrer" target="_blank">点击→vue-loader文档传送门</a><br>②、<a href="https://www.npmjs.com/package/babel-loader" rel="nofollow noreferrer" target="_blank">点击→babel-loader文档传送门</a></p>
<h2 id="articleHeader17">6、webpack.dev.conf.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
//通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//美化webpack的错误信息和日志的插件①
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')// 查看空闲端口位置，默认情况下搜索8000这个端口②
const HOST = process.env.HOST//③processs为node的一个全局对象获取当前程序的环境变量，即host
const PORT = process.env.PORT &amp;&amp; Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
  //规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },

  devtool: config.dev.devtool,  //增强调试，上文有提及
  //此处的配置都是在config的index.js中设定好了
  devServer: {//④
    clientLogLevel: 'warning',//控制台显示的选项有none, error, warning 或者 info
    //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,//热加载
    contentBase: false,
    compress: true,//压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,//调试时自动打开浏览器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,// warning 和 error 都要显示
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,//接口代理
    quiet: true, //控制台是否禁止打印警告和错误,若用FriendlyErrorsPlugin 此处为 true
    watchOptions: {
      poll: config.dev.poll,//// 文件系统检测改动
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),//⑤模块热替换插件，修改模块时不需要刷新页面
    new webpack.NamedModulesPlugin(), // 显示文件的正确名字
    new webpack.NoEmitOnErrorsPlugin(),//当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中
    // https://github.com/ampedandwired/html-webpack-plugin
    // 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去⑥
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([//复制插件
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']//忽略.*的文件
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  //查找端口号
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
    //端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      //友好地输出信息
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">//通过webpack-merge实现webpack.dev.conf.js对wepack.base.config.js的继承</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">//美化webpack的错误信息和日志的插件①</span>
<span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> portfinder = <span class="hljs-built_in">require</span>(<span class="hljs-string">'portfinder'</span>)<span class="hljs-comment">// 查看空闲端口位置，默认情况下搜索8000这个端口②</span>
<span class="hljs-keyword">const</span> HOST = process.env.HOST<span class="hljs-comment">//③processs为node的一个全局对象获取当前程序的环境变量，即host</span>
<span class="hljs-keyword">const</span> PORT = process.env.PORT &amp;&amp; <span class="hljs-built_in">Number</span>(process.env.PORT)

<span class="hljs-keyword">const</span> devWebpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
  <span class="hljs-comment">//规则是工具utils中处理出来的styleLoaders，生成了css，less,postcss等规则</span>
    rules: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap, <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span> })
  },

  <span class="hljs-attr">devtool</span>: config.dev.devtool,  <span class="hljs-comment">//增强调试，上文有提及</span>
  <span class="hljs-comment">//此处的配置都是在config的index.js中设定好了</span>
  devServer: {<span class="hljs-comment">//④</span>
    clientLogLevel: <span class="hljs-string">'warning'</span>,<span class="hljs-comment">//控制台显示的选项有none, error, warning 或者 info</span>
    <span class="hljs-comment">//当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html</span>
    historyApiFallback: {
      <span class="hljs-attr">rewrites</span>: [
        { <span class="hljs-attr">from</span>: <span class="hljs-regexp">/.*/</span>, <span class="hljs-attr">to</span>: path.posix.join(config.dev.assetsPublicPath, <span class="hljs-string">'index.html'</span>) },
      ],
    },
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//热加载</span>
    contentBase: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">compress</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//压缩</span>
    host: HOST || config.dev.host,
    <span class="hljs-attr">port</span>: PORT || config.dev.port,
    <span class="hljs-attr">open</span>: config.dev.autoOpenBrowser,<span class="hljs-comment">//调试时自动打开浏览器</span>
    overlay: config.dev.errorOverlay
      ? { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span> }
      : <span class="hljs-literal">false</span>,<span class="hljs-comment">// warning 和 error 都要显示</span>
    publicPath: config.dev.assetsPublicPath,
    <span class="hljs-attr">proxy</span>: config.dev.proxyTable,<span class="hljs-comment">//接口代理</span>
    quiet: <span class="hljs-literal">true</span>, <span class="hljs-comment">//控制台是否禁止打印警告和错误,若用FriendlyErrorsPlugin 此处为 true</span>
    watchOptions: {
      <span class="hljs-attr">poll</span>: config.dev.poll,<span class="hljs-comment">//// 文件系统检测改动</span>
    }
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/dev.env'</span>)
    }),
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),<span class="hljs-comment">//⑤模块热替换插件，修改模块时不需要刷新页面</span>
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(), <span class="hljs-comment">// 显示文件的正确名字</span>
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),<span class="hljs-comment">//当webpack编译错误的时候，来中端打包进程，防止错误代码打包到文件中</span>
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-comment">// 该插件可自动生成一个 html5 文件或使用模板文件将编译好的代码注入进去⑥</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([<span class="hljs-comment">//复制插件</span>
      {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-attr">to</span>: config.dev.assetsSubDirectory,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]<span class="hljs-comment">//忽略.*的文件</span>
      }
    ])
  ]
})

<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  portfinder.basePort = process.env.PORT || config.dev.port
  <span class="hljs-comment">//查找端口号</span>
  portfinder.getPort(<span class="hljs-function">(<span class="hljs-params">err, port</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
      reject(err)
    } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">//端口被占用时就重新设置evn和devServer的端口</span>
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      <span class="hljs-comment">//友好地输出信息</span>
      devWebpackConfig.plugins.push(<span class="hljs-keyword">new</span> FriendlyErrorsPlugin({
        <span class="hljs-attr">compilationSuccessInfo</span>: {
          <span class="hljs-attr">messages</span>: [<span class="hljs-string">`Your application is running here: http://<span class="hljs-subst">${devWebpackConfig.devServer.host}</span>:<span class="hljs-subst">${port}</span>`</span>],
        },
        <span class="hljs-attr">onErrors</span>: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : <span class="hljs-literal">undefined</span>
      }))
      resolve(devWebpackConfig)
    }
  })
})
</code></pre>
<p>注释：<br>①、<a href="https://www.npmjs.com/package/friendly-errors-webpack-plugin" rel="nofollow noreferrer" target="_blank">点击→friendly-errors-webpack-plugin文档传送门</a><br>②、<a href="http://javascript.ruanyifeng.com/nodejs/process.html#toc0" rel="nofollow noreferrer" target="_blank">点击→process文档传送门</a><br>③、<a href="https://www.npmjs.com/package/babel-loader" rel="nofollow noreferrer" target="_blank">点击→babel-loader文档传送门</a><br>④、<a href="https://doc.webpack-china.org/configuration/devtool" rel="nofollow noreferrer" target="_blank">点击→devtool文档传送门</a><br>⑤、<a href="https://doc.webpack-china.org/guides/hot-module-replacement/" rel="nofollow noreferrer" target="_blank">点击→webpack的HotModuleReplacementPlugin文档传送门</a><br>⑥、<a href="https://www.npmjs.com/package/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">点击→html-webpack-plugin文档传送门</a></p>
<h2 id="articleHeader18">7、webpack.prod.conf.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
  //调用utils.styleLoaders的方法
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,//开启调试的模式。默认为true
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {//压缩
          warnings: false//警告：true保留警告，false不保留
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new ExtractTextPlugin({//抽取文本。比如打包之后的index页面有style插入，就是这个插件抽取出来的，减少请求
      filename: utils.assetsPath('css/[name].[contenthash].css'),  
      allChunks: true,
    }),
    
    new OptimizeCSSPlugin({//优化css的插件
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
   
    new HtmlWebpackPlugin({//html打包
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {//压缩
        removeComments: true,//删除注释
        collapseWhitespace: true,//删除空格
        removeAttributeQuotes: true//删除属性的引号   
      },
     
      chunksSortMode: 'dependency'//模块排序，按照我们需要的顺序排序
    }),
   
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({//抽取公共的模块
      name: 'vendor',
      minChunks (module) {   
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    new CopyWebpackPlugin([//复制，比如打包完之后需要把打包的文件复制到dist里面
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>)

<span class="hljs-keyword">const</span> env = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/prod.env'</span>)

<span class="hljs-keyword">const</span> webpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
  <span class="hljs-comment">//调用utils.styleLoaders的方法</span>
    rules: utils.styleLoaders({
      <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,<span class="hljs-comment">//开启调试的模式。默认为true</span>
      extract: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span>
    })
  },
  <span class="hljs-attr">devtool</span>: config.build.productionSourceMap ? config.build.devtool : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,
    <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    <span class="hljs-attr">chunkFilename</span>: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-keyword">new</span> UglifyJsPlugin({
      <span class="hljs-attr">uglifyOptions</span>: {
        <span class="hljs-attr">compress</span>: {<span class="hljs-comment">//压缩</span>
          warnings: <span class="hljs-literal">false</span><span class="hljs-comment">//警告：true保留警告，false不保留</span>
        }
      },
      <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
      <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-keyword">new</span> ExtractTextPlugin({<span class="hljs-comment">//抽取文本。比如打包之后的index页面有style插入，就是这个插件抽取出来的，减少请求</span>
      filename: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>),  
      <span class="hljs-attr">allChunks</span>: <span class="hljs-literal">true</span>,
    }),
    
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({<span class="hljs-comment">//优化css的插件</span>
      cssProcessorOptions: config.build.productionSourceMap
        ? { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">map</span>: { <span class="hljs-attr">inline</span>: <span class="hljs-literal">false</span> } }
        : { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span> }
    }),
   
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({<span class="hljs-comment">//html打包</span>
      filename: config.build.index,
      <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
      <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">minify</span>: {<span class="hljs-comment">//压缩</span>
        removeComments: <span class="hljs-literal">true</span>,<span class="hljs-comment">//删除注释</span>
        collapseWhitespace: <span class="hljs-literal">true</span>,<span class="hljs-comment">//删除空格</span>
        removeAttributeQuotes: <span class="hljs-literal">true</span><span class="hljs-comment">//删除属性的引号   </span>
      },
     
      <span class="hljs-attr">chunksSortMode</span>: <span class="hljs-string">'dependency'</span><span class="hljs-comment">//模块排序，按照我们需要的顺序排序</span>
    }),
   
    <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),
    <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({<span class="hljs-comment">//抽取公共的模块</span>
      name: <span class="hljs-string">'vendor'</span>,
      minChunks (<span class="hljs-built_in">module</span>) {   
        <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
          ) === <span class="hljs-number">0</span>
        )
      }
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
      <span class="hljs-attr">async</span>: <span class="hljs-string">'vendor-async'</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-number">3</span>
    }),
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([<span class="hljs-comment">//复制，比如打包完之后需要把打包的文件复制到dist里面</span>
      {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]
      }
    ])
  ]
})

<span class="hljs-keyword">if</span> (config.build.productionGzip) {
  <span class="hljs-keyword">const</span> CompressionWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'compression-webpack-plugin'</span>)

  webpackConfig.plugins.push(
    <span class="hljs-keyword">new</span> CompressionWebpackPlugin({
      <span class="hljs-attr">asset</span>: <span class="hljs-string">'[path].gz[query]'</span>,
      <span class="hljs-attr">algorithm</span>: <span class="hljs-string">'gzip'</span>,
      <span class="hljs-attr">test</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(
        <span class="hljs-string">'\\.('</span> +
        config.build.productionGzipExtensions.join(<span class="hljs-string">'|'</span>) +
        <span class="hljs-string">')$'</span>
      ),
      <span class="hljs-attr">threshold</span>: <span class="hljs-number">10240</span>,
      <span class="hljs-attr">minRatio</span>: <span class="hljs-number">0.8</span>
    })
  )
}

<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-keyword">const</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}

<span class="hljs-built_in">module</span>.exports = webpackConfig
</code></pre>
<p>注释：<a href="https://blog.csdn.net/Mr_YanYan/article/details/79233188" rel="nofollow noreferrer" target="_blank">webpack.prod.conf.js详细内容 </a></p>
<h1 id="articleHeader19">五、结语</h1>
<p>第一篇博文总在想要写点什么，就根据自己的经验加查了下文档写了这么一篇工具类的文章，由于有些插件有些用法会重复，所以按照文章先后，写过用法或者给过链接的插件，在后面的文章就省略了，有时间的建议从头开始，如果单独看某章节的话遇到不懂的语法或插件可全文查找，也可以点击<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">更多安装包传送门</a>进行查找阅读。本文将vue本身自带的英文注释删除了，但英文注释非常有用可以仔细阅读，希望对大家学习vue和webpack都有所帮助。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="尊重原创，如需转载请注明出处！

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>尊重原创，如需转载请注明出处！

</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli脚手架中webpack配置基础文件详解

## 原文链接
[https://segmentfault.com/a/1190000014804826](https://segmentfault.com/a/1190000014804826)


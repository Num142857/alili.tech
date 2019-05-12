---
title: 'vue-cli (vue2.5.2&webpack3.6.0) 配置文件全注释' 
date: 2018-12-15 2:30:11
hidden: true
slug: g3ap57dm1hs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue-cli 配置文件注释</h2>
<blockquote><ul>
<li>新的项目组同事整了一个webpack3.*的脚手架</li>
<li>(先前自己弄了一个2.0的脚手架)里面的配置项摸索了一遍,就想看看3.*在配置文件上面update了什么</li>
<li>工作闲时花了一点时间将配置文件中都加上了注释,相信看了就和我一样从不那么太懂到有那么一点懂了. ^^</li>
<li>平时用的blog写这种文章十分不友好,所以记录在这边顺便和大家一起学习(时不时会update一些修正项在最后面)</li>
<li>如果有需要的朋友可以上我的github下载,里面还有旧的2.0版本的脚手架.<a href="https://github.com/superfff" rel="nofollow noreferrer" target="_blank">github链接</a>
</li>
</ul></blockquote>
<hr>
<h3 id="articleHeader1">基础准备</h3>
<blockquote><ul>
<li>node v7.10.0</li>
<li>vue v2.8.2</li>
</ul></blockquote>
<ol>
<li>vue init webpack 项目名字</li>
<li>各种下一步,(没啥用eslint 没使用测试的那个模块)</li>
<li>生成的目录如下<span class="img-wrap"><img data-src="/img/bV2Q3o?w=221&amp;h=282" src="https://static.alili.tech/img/bV2Q3o?w=221&amp;h=282" alt="脚手架文件目录" title="脚手架文件目录" style="cursor: pointer; display: inline;"></span>
</li>
</ol>
<hr>
<h3 id="articleHeader2">基础配置文件(webpack.base.conf.js)</h3>
<blockquote>这里的文件是公用的一些基础配置项</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
// 基础配置文件

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

// 定义的路径拼接方法(join直接的拼接, path.resolve等于在终端输入路径)
function resolve (dir) {
  // http://nodejs.cn/api/path.html#path_path_join_paths
  return path.join(__dirname, '..', dir)
}

const entries = utils.getEntry('./src/module/*/*.js');

/*
    __dirname 指的是当前你这个当前文件在 硬盘文件夹全路径 
    例如这个base.conf.js文件是在 build文件夹里
    那么 __dirname = /硬盘路径/build
*/

module.exports = {
  // 基础目录，绝对路径，用于从配置中解析入口起点
  context: path.resolve(__dirname, '../'),
  /*
    起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。

    如果是多入口的情况
    entry: {
      home: &quot;./home.js&quot;,
      about: &quot;./about.js&quot;,
      contact: &quot;./contact.js&quot;
    }

    入口对象的key值是结合dev.conf.js中的HtmlWebpackPlugin 作为url访问的路径
    例如
    entry: {
      home: &quot;./home.js&quot;
    }
    访问路径:localhost:port/home.html

    entry: {
      fgh/home: './home.js'
    }
    访问路径:localhost:port/fgh/home.html

  */
  entry: entries,
  // 输出
  output: {
    // 编译输出的静态资源根路径
    path: config.build.assetsRoot,
    // 此选项决定了每个输出 bundle 的名称。 
    // [name]是指入口名称 [id]是指chunk id [hash]是指构建完的hash [chunkhash]是指每个内容的hash
    filename: '[name].js',
    // 正式发布环境下编译输出的上线路径的根路径
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 选项能设置模块如何被解析
  resolve: {
    // 自动补全对应模块的后缀
    extensions: ['.js', '.vue', '.json'],
    // 路径别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  /*
    https://doc.webpack-china.org/plugins/provide-plugin/#src/components/Sidebar/Sidebar.jsx
    ProvidePlugin 可以全局加载模块,例如下面如果想全局加载一个jq
  */
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: 'jquery'  
  //   })
  // ],
  
  // 各种loader的配置
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      /*
        关于.babelrc的配置 
        部分可参考
        https://segmentfault.com/a/1190000008159877
        https://babeljs.cn/docs/plugins/preset-env/
        https://doc.webpack-china.org/loaders/babel-loader/

        1.babel-preset-env 是指动态的require浏览器所缺的转换babel插件.
        这个动态是通过文件里面的配置,
        &quot;env&quot;, {
          //是否将模块编译为 amd cmd commonjs等
          &quot;modules&quot;: false,
          &quot;targets&quot;: {
            //指浏览器最新的2个版本 或者safari大于7的版本 >5%是指 市场率超过5%的浏览器
            &quot;browsers&quot;: [&quot;last 2 versions&quot;, &quot;safari >= 7&quot;]
          }
        }
        如果用了env 没有加任何配置的话 那么默认与 babel-preset-latest一样

        2.babel-preset-stage 有4个版本
        Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。
        Stage 1 - 提案: 初步尝试。
        Stage 2 - 初稿: 完成初步规范。
        Stage 3 - 候选: 完成规范和浏览器初步实现。
        Stage 4(隐藏版本表示已经完成 将会在新的一版所发布) 等同于es2015 es2016...

        3.在plugin中有 babel-plugin-transform-runtime 是动态的模块加载所需的转换模块
        因为如文档所说
        Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此。
        例如： Promise、Set、Map 等新增对象，Object.assign、Object.entries等静态方法。

        --说到runtime就会提到babel-polyfill
        (babel-polyfill 的做法是将全局对象通通污染一遍)

        babel-runtime 更像是分散的 polyfill 模块，只会在模块里单独引入需要用到的api, 不会影响全局,
        例子: 在模块中 import Promise from 'babel-runtime/core/promise'

        但是每个模块单独这样引入也是麻烦, 所以可以通过配置babel-plugin-transform-runtime来简单操作

        --- 有一个小细节大家注意
        api中说到, babel-plugin-transform-runtime默认是和babel-runtime捆绑出现, 前面是开发依赖,后面是生产依赖.
        但是vue-cli构造出来的项目中,package.json里面并没有在生产依赖中出现babel-runtime??

        后面请教了人,
        原来在node_module中 babel-plugin-transform-runtime这个包里面的package.json里面已经把babel-runtime加入了生产.
        所以当install的时候会自动将一连串的东西都装上!!

        4.还有一个缩短build的构造时间, 在下面的babel-loader里面去 exclude掉整个 node_modules的文件夹. 可以缩短1半时间..
      */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 限制300kb以下的图片均变为base64. 不然如果使用background-image 打包之后会找不到资源 (limit是按照字节来)
          limit: 307200,
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
  /*
    https://doc.webpack-china.org/configuration/node/#node
    每个属性都是 Node.js 全局变量或模块的名称
    true：提供 polyfill。
    false: 什么都不提供。
    &quot;empty&quot;：提供空对象。
  */
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-comment">// 基础配置文件</span>

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)

<span class="hljs-comment">// 定义的路径拼接方法(join直接的拼接, path.resolve等于在终端输入路径)</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">dir</span>) </span>{
  <span class="hljs-comment">// http://nodejs.cn/api/path.html#path_path_join_paths</span>
  <span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-keyword">const</span> entries = utils.getEntry(<span class="hljs-string">'./src/module/*/*.js'</span>);

<span class="hljs-comment">/*
    __dirname 指的是当前你这个当前文件在 硬盘文件夹全路径 
    例如这个base.conf.js文件是在 build文件夹里
    那么 __dirname = /硬盘路径/build
*/</span>

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// 基础目录，绝对路径，用于从配置中解析入口起点</span>
  context: path.resolve(__dirname, <span class="hljs-string">'../'</span>),
  <span class="hljs-comment">/*
    起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。

    如果是多入口的情况
    entry: {
      home: "./home.js",
      about: "./about.js",
      contact: "./contact.js"
    }

    入口对象的key值是结合dev.conf.js中的HtmlWebpackPlugin 作为url访问的路径
    例如
    entry: {
      home: "./home.js"
    }
    访问路径:localhost:port/home.html

    entry: {
      fgh/home: './home.js'
    }
    访问路径:localhost:port/fgh/home.html

  */</span>
  entry: entries,
  <span class="hljs-comment">// 输出</span>
  output: {
    <span class="hljs-comment">// 编译输出的静态资源根路径</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// 此选项决定了每个输出 bundle 的名称。 </span>
    <span class="hljs-comment">// [name]是指入口名称 [id]是指chunk id [hash]是指构建完的hash [chunkhash]是指每个内容的hash</span>
    filename: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-comment">// 正式发布环境下编译输出的上线路径的根路径</span>
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  <span class="hljs-comment">// 选项能设置模块如何被解析</span>
  resolve: {
    <span class="hljs-comment">// 自动补全对应模块的后缀</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-comment">// 路径别名</span>
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
    }
  },
  <span class="hljs-comment">/*
    https://doc.webpack-china.org/plugins/provide-plugin/#src/components/Sidebar/Sidebar.jsx
    ProvidePlugin 可以全局加载模块,例如下面如果想全局加载一个jq
  */</span>
  <span class="hljs-comment">// plugins: [</span>
  <span class="hljs-comment">//   new webpack.ProvidePlugin({</span>
  <span class="hljs-comment">//     $: 'jquery'  </span>
  <span class="hljs-comment">//   })</span>
  <span class="hljs-comment">// ],</span>
  
  <span class="hljs-comment">// 各种loader的配置</span>
  <span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
      },
      <span class="hljs-comment">/*
        关于.babelrc的配置 
        部分可参考
        https://segmentfault.com/a/1190000008159877
        https://babeljs.cn/docs/plugins/preset-env/
        https://doc.webpack-china.org/loaders/babel-loader/

        1.babel-preset-env 是指动态的require浏览器所缺的转换babel插件.
        这个动态是通过文件里面的配置,
        "env", {
          //是否将模块编译为 amd cmd commonjs等
          "modules": false,
          "targets": {
            //指浏览器最新的2个版本 或者safari大于7的版本 &gt;5%是指 市场率超过5%的浏览器
            "browsers": ["last 2 versions", "safari &gt;= 7"]
          }
        }
        如果用了env 没有加任何配置的话 那么默认与 babel-preset-latest一样

        2.babel-preset-stage 有4个版本
        Stage 0 - 稻草人: 只是一个想法，可能是 babel 插件。
        Stage 1 - 提案: 初步尝试。
        Stage 2 - 初稿: 完成初步规范。
        Stage 3 - 候选: 完成规范和浏览器初步实现。
        Stage 4(隐藏版本表示已经完成 将会在新的一版所发布) 等同于es2015 es2016...

        3.在plugin中有 babel-plugin-transform-runtime 是动态的模块加载所需的转换模块
        因为如文档所说
        Babel 几乎可以编译所有时新的 JavaScript 语法，但对于 APIs 来说却并非如此。
        例如： Promise、Set、Map 等新增对象，Object.assign、Object.entries等静态方法。

        --说到runtime就会提到babel-polyfill
        (babel-polyfill 的做法是将全局对象通通污染一遍)

        babel-runtime 更像是分散的 polyfill 模块，只会在模块里单独引入需要用到的api, 不会影响全局,
        例子: 在模块中 import Promise from 'babel-runtime/core/promise'

        但是每个模块单独这样引入也是麻烦, 所以可以通过配置babel-plugin-transform-runtime来简单操作

        --- 有一个小细节大家注意
        api中说到, babel-plugin-transform-runtime默认是和babel-runtime捆绑出现, 前面是开发依赖,后面是生产依赖.
        但是vue-cli构造出来的项目中,package.json里面并没有在生产依赖中出现babel-runtime??

        后面请教了人,
        原来在node_module中 babel-plugin-transform-runtime这个包里面的package.json里面已经把babel-runtime加入了生产.
        所以当install的时候会自动将一连串的东西都装上!!

        4.还有一个缩短build的构造时间, 在下面的babel-loader里面去 exclude掉整个 node_modules的文件夹. 可以缩短1半时间..
      */</span>
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>), resolve(<span class="hljs-string">'node_modules/webpack-dev-server/client'</span>)]
      },
      {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
          <span class="hljs-comment">// 限制300kb以下的图片均变为base64. 不然如果使用background-image 打包之后会找不到资源 (limit是按照字节来)</span>
          limit: <span class="hljs-number">307200</span>,
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
  <span class="hljs-comment">/*
    https://doc.webpack-china.org/configuration/node/#node
    每个属性都是 Node.js 全局变量或模块的名称
    true：提供 polyfill。
    false: 什么都不提供。
    "empty"：提供空对象。
  */</span>
  node: {
    <span class="hljs-comment">// prevent webpack from injecting useless setImmediate polyfill because Vue</span>
    <span class="hljs-comment">// source contains it (although only uses it if it's native).</span>
    setImmediate: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// prevent webpack from injecting mocks to Node native modules</span>
    <span class="hljs-comment">// that does not make sense for the client</span>
    dgram: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">fs</span>: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">net</span>: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">tls</span>: <span class="hljs-string">'empty'</span>,
    <span class="hljs-attr">child_process</span>: <span class="hljs-string">'empty'</span>
  }
}
</code></pre>
<hr>
<h3 id="articleHeader3">开发环境(webpack.dev.conf.js)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
// 开发模式配置文件

// 引入工具集合的文件
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// 合并插件类似object.assign合并公共部分
const merge = require('webpack-merge')
// node的path工具函数
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
// webpack 复制文件和文件夹的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成 html 并且注入到 .html 文件中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 自动检索下一个可用端口
const portfinder = require('portfinder')

/*
  http://nodejs.cn/api/process.html#process_process_env
  process.env 是在node环境中 返回一个包含用户环境信息的对象。

  ------
  这里的p.e属性是node环境原生的,与下面用webpack.d*去定义出来不同,
  要改变里面的值可参考 ./build.js
  直接
  process.env.NODE_ENV = 'production'
  ------

*/

// 获取在process.env 定义的host和port
const HOST = process.env.HOST
const PORT = process.env.PORT &amp;&amp; Number(process.env.PORT)

// 多页面html路径集合
const pages = utils.getEntry('./src/module/*/*.html');

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    // css-loader的加工
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  
  // 检测开发环境下是否生成source map(并且生成的模式是怎么样)
  devtool: config.dev.devtool,

  /*
    https://doc.webpack-china.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx
    webpack-dev-server 的配置

    package.json中
    &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;
    --progess 将运行进度输出到控制台。即npm run dev 显示module 的loading
    --inline  应用程序启用内联模式(inline mode)。
              这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
    (--inline = false 关闭这种模式 那么将不会出现修改代码后实时刷新)
  */
  devServer: {
    // 开发过程中,可配置控制台显示的内容
    clientLogLevel: 'warning',
    // History API 当遇到 404 响应时会被替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    /*
      启用 webpack 的模块热替换特性

      api提到,打开了这个选项 webpack会自动加载HMR的相关内容(HotModuleReplacement),所以不需要额外的配置.

      --------
      与旧版的vue-cli+webpack2.0的 dev-middleware结合hot-middleware 实现类似的功能
      如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，
      请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。
      --------

    */
    hot: true,
    // 告诉服务器从哪里提供内容。
    contentBase: false, // since we use CopyWebpackPlugin.
    // 一切服务都启用gzip 压缩
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // 是否自动打开浏览器
    // openPage这个属性可以配置默认打开浏览器的页面
    open: config.dev.autoOpenBrowser,
    // 是否全屏弹窗的形式显示编译过程中的错误
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    // 指的是url的访问路径前缀
    publicPath: config.dev.assetsPublicPath,
    // 代理
    proxy: config.dev.proxyTable,
    // 除了初始启动信息之外的任何内容都不会被打印到控制台
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 与监视文件相关的控制选项。
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    /*
      https://doc.webpack-china.org/plugins/define-plugin/
      允许在环境中产生一个全局变量, 例如下面'process.env', 就等于隔壁文件夹 dev.env.js export出来的内容
      具体的规则看上方api

      但是以下定义的变量在配置文件中去引用会报错,只允许在服务中编写的代码中使用
    */
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    /*
      模块热替换(Hot Module Replacement 或 HMR)

      当上面的 devServer中 hot:true时, 这个模块必须存在,不然webpack会报错.
      这个模块结合上面的hot是用于,
      检测到页面更新,在不刷新页面的情况下替换内容,
      如果hot: true与这个模块均不存在, 则跟旧版本的 dev-middleware/hot-*一样,修改即会刷新
    */
    new webpack.HotModuleReplacementPlugin(),

    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.

    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    new webpack.NoEmitOnErrorsPlugin(),
    
    /*
      https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
      该插件将为你生成一个HTML5文件

      配置项文档
      https://github.com/jantimon/html-webpack-plugin#configuration

      会结合base.conf.js设置中的 入口文件和输出文件,
      将内容根据输出filename.生成js文件 script到当前的html种
    */
    // new HtmlWebpackPlugin({
    //   // 生成html的名称
    //   filename: 'index.html',
    //   // 生成html所需的模板路径
    //   template: 'index.html',
      
    //     这个配置项指js文件插入的位置 

    //     选项: true body head false
    //     true和body相同,插入body最后
    //     head 插入head里面
      
    //   inject: true
    // }),

    /*
      https://doc.webpack-china.org/plugins/copy-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
      这个插件是用于复制文件和文件夹,在这里是将静态文件夹的内容拷贝一份在开发环境中

      new CopyWebpackPlugin([patterns], options)
      A pattern looks like: { from: 'source', to: 'dest' }
    */
    new CopyWebpackPlugin([
      {
        // 拷贝的路径
        from: path.resolve(__dirname, '../static'),
        // 访问的路径
        to: config.dev.assetsSubDirectory,
        // 忽略拷贝的内容(具体的文件名或模糊的路径)
        ignore: ['.*']
      }
    ])
  ]
})

for(let pathName in pages){
  /*
    https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
  */
  let options = {
    filename: `${pathName}.html`,
    template: pages[pathName],
    inject: true,
    // 指定当前的html插入的模块(如果不设定会将所有页面的js都插入, - -)
    chunks: [pathName]
  }

  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(options))
}


module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  // 使用插件去判断当前端口是否可用
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        // 添加终端提示内容
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-comment">// 开发模式配置文件</span>

<span class="hljs-comment">// 引入工具集合的文件</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// 合并插件类似object.assign合并公共部分</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-comment">// node的path工具函数</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-comment">// webpack 复制文件和文件夹的插件</span>
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-comment">// 自动生成 html 并且注入到 .html 文件中的插件</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)
<span class="hljs-comment">// 自动检索下一个可用端口</span>
<span class="hljs-keyword">const</span> portfinder = <span class="hljs-built_in">require</span>(<span class="hljs-string">'portfinder'</span>)

<span class="hljs-comment">/*
  http://nodejs.cn/api/process.html#process_process_env
  process.env 是在node环境中 返回一个包含用户环境信息的对象。

  ------
  这里的p.e属性是node环境原生的,与下面用webpack.d*去定义出来不同,
  要改变里面的值可参考 ./build.js
  直接
  process.env.NODE_ENV = 'production'
  ------

*/</span>

<span class="hljs-comment">// 获取在process.env 定义的host和port</span>
<span class="hljs-keyword">const</span> HOST = process.env.HOST
<span class="hljs-keyword">const</span> PORT = process.env.PORT &amp;&amp; <span class="hljs-built_in">Number</span>(process.env.PORT)

<span class="hljs-comment">// 多页面html路径集合</span>
<span class="hljs-keyword">const</span> pages = utils.getEntry(<span class="hljs-string">'./src/module/*/*.html'</span>);

<span class="hljs-keyword">const</span> devWebpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// css-loader的加工</span>
    rules: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap, <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span> })
  },
  
  <span class="hljs-comment">// 检测开发环境下是否生成source map(并且生成的模式是怎么样)</span>
  devtool: config.dev.devtool,

  <span class="hljs-comment">/*
    https://doc.webpack-china.org/configuration/dev-server/#src/components/Sidebar/Sidebar.jsx
    webpack-dev-server 的配置

    package.json中
    "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"
    --progess 将运行进度输出到控制台。即npm run dev 显示module 的loading
    --inline  应用程序启用内联模式(inline mode)。
              这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台
    (--inline = false 关闭这种模式 那么将不会出现修改代码后实时刷新)
  */</span>
  devServer: {
    <span class="hljs-comment">// 开发过程中,可配置控制台显示的内容</span>
    clientLogLevel: <span class="hljs-string">'warning'</span>,
    <span class="hljs-comment">// History API 当遇到 404 响应时会被替代为 index.html</span>
    historyApiFallback: {
      <span class="hljs-attr">rewrites</span>: [
        { <span class="hljs-attr">from</span>: <span class="hljs-regexp">/.*/</span>, <span class="hljs-attr">to</span>: path.posix.join(config.dev.assetsPublicPath, <span class="hljs-string">'index.html'</span>) },
      ],
    },
    <span class="hljs-comment">/*
      启用 webpack 的模块热替换特性

      api提到,打开了这个选项 webpack会自动加载HMR的相关内容(HotModuleReplacement),所以不需要额外的配置.

      --------
      与旧版的vue-cli+webpack2.0的 dev-middleware结合hot-middleware 实现类似的功能
      如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，
      请使用 webpack-hot-middleware package 包，以在你的自定义服务或应用程序上启用 HMR。
      --------

    */</span>
    hot: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 告诉服务器从哪里提供内容。</span>
    contentBase: <span class="hljs-literal">false</span>, <span class="hljs-comment">// since we use CopyWebpackPlugin.</span>
    <span class="hljs-comment">// 一切服务都启用gzip 压缩</span>
    compress: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">host</span>: HOST || config.dev.host,
    <span class="hljs-attr">port</span>: PORT || config.dev.port,
    <span class="hljs-comment">// 是否自动打开浏览器</span>
    <span class="hljs-comment">// openPage这个属性可以配置默认打开浏览器的页面</span>
    open: config.dev.autoOpenBrowser,
    <span class="hljs-comment">// 是否全屏弹窗的形式显示编译过程中的错误</span>
    overlay: config.dev.errorOverlay
      ? { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span> }
      : <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// 指的是url的访问路径前缀</span>
    publicPath: config.dev.assetsPublicPath,
    <span class="hljs-comment">// 代理</span>
    proxy: config.dev.proxyTable,
    <span class="hljs-comment">// 除了初始启动信息之外的任何内容都不会被打印到控制台</span>
    quiet: <span class="hljs-literal">true</span>, <span class="hljs-comment">// necessary for FriendlyErrorsPlugin</span>
    <span class="hljs-comment">// 与监视文件相关的控制选项。</span>
    watchOptions: {
      <span class="hljs-attr">poll</span>: config.dev.poll,
    }
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">/*
      https://doc.webpack-china.org/plugins/define-plugin/
      允许在环境中产生一个全局变量, 例如下面'process.env', 就等于隔壁文件夹 dev.env.js export出来的内容
      具体的规则看上方api

      但是以下定义的变量在配置文件中去引用会报错,只允许在服务中编写的代码中使用
    */</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/dev.env'</span>)
    }),

    <span class="hljs-comment">/*
      模块热替换(Hot Module Replacement 或 HMR)

      当上面的 devServer中 hot:true时, 这个模块必须存在,不然webpack会报错.
      这个模块结合上面的hot是用于,
      检测到页面更新,在不刷新页面的情况下替换内容,
      如果hot: true与这个模块均不存在, 则跟旧版本的 dev-middleware/hot-*一样,修改即会刷新
    */</span>
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),

    <span class="hljs-comment">// 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。</span>
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(), <span class="hljs-comment">// HMR shows correct file names in console on update.</span>

    <span class="hljs-comment">// 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。</span>
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),
    
    <span class="hljs-comment">/*
      https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
      该插件将为你生成一个HTML5文件

      配置项文档
      https://github.com/jantimon/html-webpack-plugin#configuration

      会结合base.conf.js设置中的 入口文件和输出文件,
      将内容根据输出filename.生成js文件 script到当前的html种
    */</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   // 生成html的名称</span>
    <span class="hljs-comment">//   filename: 'index.html',</span>
    <span class="hljs-comment">//   // 生成html所需的模板路径</span>
    <span class="hljs-comment">//   template: 'index.html',</span>
      
    <span class="hljs-comment">//     这个配置项指js文件插入的位置 </span>

    <span class="hljs-comment">//     选项: true body head false</span>
    <span class="hljs-comment">//     true和body相同,插入body最后</span>
    <span class="hljs-comment">//     head 插入head里面</span>
      
    <span class="hljs-comment">//   inject: true</span>
    <span class="hljs-comment">// }),</span>

    <span class="hljs-comment">/*
      https://doc.webpack-china.org/plugins/copy-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
      这个插件是用于复制文件和文件夹,在这里是将静态文件夹的内容拷贝一份在开发环境中

      new CopyWebpackPlugin([patterns], options)
      A pattern looks like: { from: 'source', to: 'dest' }
    */</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-comment">// 拷贝的路径</span>
        <span class="hljs-keyword">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-comment">// 访问的路径</span>
        to: config.dev.assetsSubDirectory,
        <span class="hljs-comment">// 忽略拷贝的内容(具体的文件名或模糊的路径)</span>
        ignore: [<span class="hljs-string">'.*'</span>]
      }
    ])
  ]
})

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> pathName <span class="hljs-keyword">in</span> pages){
  <span class="hljs-comment">/*
    https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
  */</span>
  <span class="hljs-keyword">let</span> options = {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">`<span class="hljs-subst">${pathName}</span>.html`</span>,
    <span class="hljs-attr">template</span>: pages[pathName],
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 指定当前的html插入的模块(如果不设定会将所有页面的js都插入, - -)</span>
    chunks: [pathName]
  }

  devWebpackConfig.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(options))
}


<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
  portfinder.basePort = process.env.PORT || config.dev.port
  <span class="hljs-comment">// 使用插件去判断当前端口是否可用</span>
  portfinder.getPort(<span class="hljs-function">(<span class="hljs-params">err, port</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
      reject(err)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// publish the new Port, necessary for e2e tests</span>
      process.env.PORT = port
      <span class="hljs-comment">// add port to devServer config</span>
      devWebpackConfig.devServer.port = port

      devWebpackConfig.plugins.push(<span class="hljs-keyword">new</span> FriendlyErrorsPlugin({
        <span class="hljs-comment">// 添加终端提示内容</span>
        compilationSuccessInfo: {
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
<h3 id="articleHeader4">生成环境</h3>
<h4>webpack.prod.conf.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
// 生产环境配置文件

const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
// 基础设置配置文件
const baseWebpackConfig = require('./webpack.base.conf')
// webpack 复制文件和文件夹的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成 html 并且注入到 .html 文件中的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 整合css的工具 https://github.com/webpack-contrib/extract-text-webpack-plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 压缩提取出的css 并解决ExtractTextPlugin分离出的重复问题
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')

// 多页面html路径集合
const pages = utils.getEntry('./src/module/*/*.html');

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    /*
      在utils.js已经配置好相关对extractTextPlugin的css抽取配置.通过extract: true即可触发

      如果要触发这个 extract 需要在plugins里面注册一下
    */
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  // 检测生产环境下是否生成source map(并且生成的模式是怎么样)
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 指的是通过CommonsChunkPlugin提取出来模块的命名规则
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // 定义全局变量
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
    new UglifyJsPlugin({
      // 压缩uglify的配置
      uglifyOptions: {
        compress: {
          // 压缩后删除没有用到的代码时不输出警告
          warnings: false
        }
      },
      // 是否使用sourcemap做关联
      sourceMap: config.build.productionSourceMap,
      // 压缩代码中是否使用多进程进行构建
      parallel: true
    }),
    
    // 将每个模块的css提取到一个文件里面
    new ExtractTextPlugin({
      // 提取出来的文件名称
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 删除重复的css内容
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin

    /*
      https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
    */
    // new HtmlWebpackPlugin({
    //   // 生成html的名称
    //   filename: config.build.index,
    //   template: 'index.html',
    //   // 这个配置项指js文件插入的位置 
    //   inject: true,
    //   // 额外的精简配置项
    //   minify: {
    //     // 删去html中的注释项
    //     removeComments: true,
    //     // 折叠html中的空白字符
    //     collapseWhitespace: true,
    //     // 删去不必要的属性
    //     removeAttributeQuotes: true
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   // 控制生成的js插入位置的顺序(可以结合chunks进行选择)
    //   chunksSortMode: 'dependency'
    // }),

    // keep module.id stable when vendor modules does not change
    // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id
    new webpack.HashedModuleIdsPlugin(),

    // enable scope hoisting
    /*
      https://doc.webpack-china.org/plugins/module-concatenation-plugin/#src/components/Sidebar/Sidebar.jsx
      webpack3.0 新特性,
      从原本的每个bundle模块打包成多个单独闭包去调用,
      变为现在的在一个大闭包里面去调用各个模块,
      提升了效率
    */
    new webpack.optimize.ModuleConcatenationPlugin(),

    // split vendor js into its own file
    /*
      提取公共模块(将公共的import模块 提取到一个文件中.)
      https://doc.webpack-china.org/plugins/commons-chunk-plugin
      
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // 模块被抽离出来至vendor文件中的判断
      minChunks (module) {
        /*
          一般来讲这里的module会返回整个项目所用到的组件库包,和import的东西
          然后通过这个函数去控制一下哪一些放入vendor的文件

          可以通过具体的数值或者Boolean值来控制抽取的颗粒度.
          返回true, 是会将所有的import模块都提取,
          返回false,是将重复的提取出来,
          具体的数值,就会作为调用模块的次数 来提取,
        */
        return (
          module.resource &amp;&amp;
          /\.js$/.test(module.resource) &amp;&amp;
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    /*
      https://doc.webpack-china.org/concepts/manifest/
      当编译器(compiler)开始执行、解析和映射应用程序时，设置好的 /src文件夹就会被打散
      但会保留所有模块的详细要点。这个数据集合称为 &quot;Manifest&quot;
      当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。

      如果不提取manifest的数据,每次build打包 上面vendor文件的hash值也会被改变,导致如果发版本,
      未改变vendor的代码因为hash改变 缓存也会被干掉
    */
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      // 传入 `Infinity` 会马上生成 公共独立文件
      minChunks: Infinity
    }),
    
    /*
      https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
      通过children和async属性,
      将那种又被父组件和子组件一起公用的模块抽取出来,
    */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'app',
    //   // (创建一个异步 公共chunk)
    //   async: 'vendor-async',
    //   children: true,
    //   // (在提取之前需要至少三个子 chunk 共享这个模块)
    //   minChunks: 3
    // }),

    /*
      https://doc.webpack-china.org/plugins/copy-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
      这个插件是用于复制文件和文件夹,在这里是将静态文件夹的内容拷贝一份在开发环境中

      new CopyWebpackPlugin([patterns], options)
      A pattern looks like: { from: 'source', to: 'dest' }
    */
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        // 忽略拷贝的内容(具体的文件名或模糊的路径)
        ignore: ['tpl/*'] //不打包模板文件夹
      }
    ])
  ]
})

// gzip压缩
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

// bundle分析
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

for(let pathName in pages){
  /*
    https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
  */
  let options = {// 生成html的名称
    filename: `${pathName}.html`,
    template: pages[pathName],
    // 这个配置项指js文件插入的位置 
    inject: true,
    // 额外的精简配置项
    minify: {
      // 删去html中的注释项
      removeComments: true,
      // 折叠html中的空白字符
      collapseWhitespace: true,
      // 删去不必要的属性
      removeAttributeQuotes: true
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // 控制生成的js插入位置的顺序(可以结合chunks进行选择)
    chunksSortMode: 'dependency'
  }

  //判断处理的路径是否在入口配置里
  if(pathName in webpackConfig.entry){
    options.chunks = ['manifest', 'vendor', pathName];
    // 加上hash值进行缓存处理
    options.hash = true;
  }

  webpackConfig.plugins.push(new HtmlWebpackPlugin(options))
}

module.exports = webpackConfig
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-comment">// 生产环境配置文件</span>

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-comment">// 基础设置配置文件</span>
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-comment">// webpack 复制文件和文件夹的插件</span>
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-comment">// 自动生成 html 并且注入到 .html 文件中的插件</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">// 整合css的工具 https://github.com/webpack-contrib/extract-text-webpack-plugin</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-comment">// 压缩提取出的css 并解决ExtractTextPlugin分离出的重复问题</span>
<span class="hljs-keyword">const</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)
<span class="hljs-comment">// 压缩代码</span>
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>)

<span class="hljs-keyword">const</span> env = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/prod.env'</span>)

<span class="hljs-comment">// 多页面html路径集合</span>
<span class="hljs-keyword">const</span> pages = utils.getEntry(<span class="hljs-string">'./src/module/*/*.html'</span>);

<span class="hljs-keyword">const</span> webpackConfig = merge(baseWebpackConfig, {
  <span class="hljs-attr">module</span>: {
    <span class="hljs-comment">/*
      在utils.js已经配置好相关对extractTextPlugin的css抽取配置.通过extract: true即可触发

      如果要触发这个 extract 需要在plugins里面注册一下
    */</span>
    rules: utils.styleLoaders({
      <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
      <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span>
    })
  },
  <span class="hljs-comment">// 检测生产环境下是否生成source map(并且生成的模式是怎么样)</span>
  devtool: config.build.productionSourceMap ? config.build.devtool : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: config.build.assetsRoot,
    <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    <span class="hljs-comment">// 指的是通过CommonsChunkPlugin提取出来模块的命名规则</span>
    chunkFilename: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-comment">// http://vuejs.github.io/vue-loader/en/workflow/production.html</span>
    <span class="hljs-comment">// 定义全局变量</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env'</span>: env
    }),

    <span class="hljs-comment">// https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/#src/components/Sidebar/Sidebar.jsx</span>
    <span class="hljs-keyword">new</span> UglifyJsPlugin({
      <span class="hljs-comment">// 压缩uglify的配置</span>
      uglifyOptions: {
        <span class="hljs-attr">compress</span>: {
          <span class="hljs-comment">// 压缩后删除没有用到的代码时不输出警告</span>
          warnings: <span class="hljs-literal">false</span>
        }
      },
      <span class="hljs-comment">// 是否使用sourcemap做关联</span>
      sourceMap: config.build.productionSourceMap,
      <span class="hljs-comment">// 压缩代码中是否使用多进程进行构建</span>
      parallel: <span class="hljs-literal">true</span>
    }),
    
    <span class="hljs-comment">// 将每个模块的css提取到一个文件里面</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
      <span class="hljs-comment">// 提取出来的文件名称</span>
      filename: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>),
      <span class="hljs-comment">// Setting the following option to `false` will not extract CSS from codesplit chunks.</span>
      <span class="hljs-comment">// Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.</span>
      <span class="hljs-comment">// It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, </span>
      <span class="hljs-comment">// increasing file size: https://github.com/vuejs-templates/webpack/issues/1110</span>
      allChunks: <span class="hljs-literal">true</span>,
    }),

    <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
    <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
    <span class="hljs-comment">// 删除重复的css内容</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
      <span class="hljs-attr">cssProcessorOptions</span>: config.build.productionSourceMap
        ? { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">map</span>: { <span class="hljs-attr">inline</span>: <span class="hljs-literal">false</span> } }
        : { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span> }
    }),
    <span class="hljs-comment">// generate dist index.html with correct asset hash for caching.</span>
    <span class="hljs-comment">// you can customize output by editing /index.html</span>
    <span class="hljs-comment">// see https://github.com/ampedandwired/html-webpack-plugin</span>

    <span class="hljs-comment">/*
      https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
    */</span>
    <span class="hljs-comment">// new HtmlWebpackPlugin({</span>
    <span class="hljs-comment">//   // 生成html的名称</span>
    <span class="hljs-comment">//   filename: config.build.index,</span>
    <span class="hljs-comment">//   template: 'index.html',</span>
    <span class="hljs-comment">//   // 这个配置项指js文件插入的位置 </span>
    <span class="hljs-comment">//   inject: true,</span>
    <span class="hljs-comment">//   // 额外的精简配置项</span>
    <span class="hljs-comment">//   minify: {</span>
    <span class="hljs-comment">//     // 删去html中的注释项</span>
    <span class="hljs-comment">//     removeComments: true,</span>
    <span class="hljs-comment">//     // 折叠html中的空白字符</span>
    <span class="hljs-comment">//     collapseWhitespace: true,</span>
    <span class="hljs-comment">//     // 删去不必要的属性</span>
    <span class="hljs-comment">//     removeAttributeQuotes: true</span>
    <span class="hljs-comment">//     // https://github.com/kangax/html-minifier#options-quick-reference</span>
    <span class="hljs-comment">//   },</span>
    <span class="hljs-comment">//   // necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
    <span class="hljs-comment">//   // 控制生成的js插入位置的顺序(可以结合chunks进行选择)</span>
    <span class="hljs-comment">//   chunksSortMode: 'dependency'</span>
    <span class="hljs-comment">// }),</span>

    <span class="hljs-comment">// keep module.id stable when vendor modules does not change</span>
    <span class="hljs-comment">// 该插件会根据模块的相对路径生成一个四位数的hash作为模块id</span>
    <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),

    <span class="hljs-comment">// enable scope hoisting</span>
    <span class="hljs-comment">/*
      https://doc.webpack-china.org/plugins/module-concatenation-plugin/#src/components/Sidebar/Sidebar.jsx
      webpack3.0 新特性,
      从原本的每个bundle模块打包成多个单独闭包去调用,
      变为现在的在一个大闭包里面去调用各个模块,
      提升了效率
    */</span>
    <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),

    <span class="hljs-comment">// split vendor js into its own file</span>
    <span class="hljs-comment">/*
      提取公共模块(将公共的import模块 提取到一个文件中.)
      https://doc.webpack-china.org/plugins/commons-chunk-plugin
      
    */</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
      <span class="hljs-comment">// 模块被抽离出来至vendor文件中的判断</span>
      minChunks (<span class="hljs-built_in">module</span>) {
        <span class="hljs-comment">/*
          一般来讲这里的module会返回整个项目所用到的组件库包,和import的东西
          然后通过这个函数去控制一下哪一些放入vendor的文件

          可以通过具体的数值或者Boolean值来控制抽取的颗粒度.
          返回true, 是会将所有的import模块都提取,
          返回false,是将重复的提取出来,
          具体的数值,就会作为调用模块的次数 来提取,
        */</span>
        <span class="hljs-keyword">return</span> (
          <span class="hljs-built_in">module</span>.resource &amp;&amp;
          <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
          <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
          ) === <span class="hljs-number">0</span>
        )
      }
    }),
    <span class="hljs-comment">/*
      https://doc.webpack-china.org/concepts/manifest/
      当编译器(compiler)开始执行、解析和映射应用程序时，设置好的 /src文件夹就会被打散
      但会保留所有模块的详细要点。这个数据集合称为 "Manifest"
      当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。

      如果不提取manifest的数据,每次build打包 上面vendor文件的hash值也会被改变,导致如果发版本,
      未改变vendor的代码因为hash改变 缓存也会被干掉
    */</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>,
      <span class="hljs-comment">// 传入 `Infinity` 会马上生成 公共独立文件</span>
      minChunks: <span class="hljs-literal">Infinity</span>
    }),
    
    <span class="hljs-comment">/*
      https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
      通过children和async属性,
      将那种又被父组件和子组件一起公用的模块抽取出来,
    */</span>
    <span class="hljs-comment">// new webpack.optimize.CommonsChunkPlugin({</span>
    <span class="hljs-comment">//   name: 'app',</span>
    <span class="hljs-comment">//   // (创建一个异步 公共chunk)</span>
    <span class="hljs-comment">//   async: 'vendor-async',</span>
    <span class="hljs-comment">//   children: true,</span>
    <span class="hljs-comment">//   // (在提取之前需要至少三个子 chunk 共享这个模块)</span>
    <span class="hljs-comment">//   minChunks: 3</span>
    <span class="hljs-comment">// }),</span>

    <span class="hljs-comment">/*
      https://doc.webpack-china.org/plugins/copy-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
      这个插件是用于复制文件和文件夹,在这里是将静态文件夹的内容拷贝一份在开发环境中

      new CopyWebpackPlugin([patterns], options)
      A pattern looks like: { from: 'source', to: 'dest' }
    */</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
      {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
        <span class="hljs-comment">// 忽略拷贝的内容(具体的文件名或模糊的路径)</span>
        ignore: [<span class="hljs-string">'tpl/*'</span>] <span class="hljs-comment">//不打包模板文件夹</span>
      }
    ])
  ]
})

<span class="hljs-comment">// gzip压缩</span>
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

<span class="hljs-comment">// bundle分析</span>
<span class="hljs-keyword">if</span> (config.build.bundleAnalyzerReport) {
  <span class="hljs-keyword">const</span> BundleAnalyzerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-bundle-analyzer'</span>).BundleAnalyzerPlugin
  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> BundleAnalyzerPlugin())
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> pathName <span class="hljs-keyword">in</span> pages){
  <span class="hljs-comment">/*
    https://doc.webpack-china.org/plugins/html-webpack-plugin/#src/components/Sidebar/Sidebar.jsx
  */</span>
  <span class="hljs-keyword">let</span> options = {<span class="hljs-comment">// 生成html的名称</span>
    filename: <span class="hljs-string">`<span class="hljs-subst">${pathName}</span>.html`</span>,
    <span class="hljs-attr">template</span>: pages[pathName],
    <span class="hljs-comment">// 这个配置项指js文件插入的位置 </span>
    inject: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 额外的精简配置项</span>
    minify: {
      <span class="hljs-comment">// 删去html中的注释项</span>
      removeComments: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// 折叠html中的空白字符</span>
      collapseWhitespace: <span class="hljs-literal">true</span>,
      <span class="hljs-comment">// 删去不必要的属性</span>
      removeAttributeQuotes: <span class="hljs-literal">true</span>
      <span class="hljs-comment">// https://github.com/kangax/html-minifier#options-quick-reference</span>
    },
    <span class="hljs-comment">// 控制生成的js插入位置的顺序(可以结合chunks进行选择)</span>
    chunksSortMode: <span class="hljs-string">'dependency'</span>
  }

  <span class="hljs-comment">//判断处理的路径是否在入口配置里</span>
  <span class="hljs-keyword">if</span>(pathName <span class="hljs-keyword">in</span> webpackConfig.entry){
    options.chunks = [<span class="hljs-string">'manifest'</span>, <span class="hljs-string">'vendor'</span>, pathName];
    <span class="hljs-comment">// 加上hash值进行缓存处理</span>
    options.hash = <span class="hljs-literal">true</span>;
  }

  webpackConfig.plugins.push(<span class="hljs-keyword">new</span> HtmlWebpackPlugin(options))
}

<span class="hljs-built_in">module</span>.exports = webpackConfig
</code></pre>
<h4>build.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
require('./check-versions')()

// 在process.env加入生产标识
process.env.NODE_ENV = 'production'

// loading的插件 https://github.com/sindresorhus/ora
const ora = require('ora')
// 可以在 node 中执行`rm -rf`的工具
// https://github.com/isaacs/rimraf
const rm = require('rimraf')
const path = require('path')

// 在终端输出带颜色的文字
// https://github.com/chalk/chalk
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
//生产配置文件
const webpackConfig = require('./webpack.prod.conf')

// 实例化ora loading的插件
const spinner = ora('building for production...')
spinner.start()

// 删除这个文件夹 （递归删除）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    // 构建成功
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
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 终端打印
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./check-versions'</span>)()

<span class="hljs-comment">// 在process.env加入生产标识</span>
process.env.NODE_ENV = <span class="hljs-string">'production'</span>

<span class="hljs-comment">// loading的插件 https://github.com/sindresorhus/ora</span>
<span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ora'</span>)
<span class="hljs-comment">// 可以在 node 中执行`rm -rf`的工具</span>
<span class="hljs-comment">// https://github.com/isaacs/rimraf</span>
<span class="hljs-keyword">const</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-comment">// 在终端输出带颜色的文字</span>
<span class="hljs-comment">// https://github.com/chalk/chalk</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">//生产配置文件</span>
<span class="hljs-keyword">const</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)

<span class="hljs-comment">// 实例化ora loading的插件</span>
<span class="hljs-keyword">const</span> spinner = ora(<span class="hljs-string">'building for production...'</span>)
spinner.start()

<span class="hljs-comment">// 删除这个文件夹 （递归删除）</span>
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err
  webpack(webpackConfig, (err, stats) =&gt; {
    <span class="hljs-comment">// 构建成功</span>
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
      <span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">'  Build failed with errors.\n'</span>))
      process.exit(<span class="hljs-number">1</span>)
    }

    <span class="hljs-comment">// 终端打印</span>
    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">'  Build complete.\n'</span>))
    <span class="hljs-built_in">console</span>.log(chalk.yellow(
      <span class="hljs-string">'  Tip: built files are meant to be served over an HTTP server.\n'</span> +
      <span class="hljs-string">'  Opening index.html over file:// won\'t work.\n'</span>
    ))
  })
})
</code></pre>
<h3 id="articleHeader5">其他文件</h3>
<blockquote><ul>
<li>vue-loader.conf.js 配置vue-loader的内容</li>
<li>check-versions.js 顾名思义检查版本的文件</li>
</ul></blockquote>
<h4>公共方法文件(utils.js)</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
const path = require('path')
const config = require('../config')
// 打包css方法
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// 匹配文件夹路径组件 https://www.cnblogs.com/waitforyou/p/7044171.html
const glob = require('glob')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

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

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // 判断是否使用postcss
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    /*
      https://www.npmjs.com/package/extract-text-webpack-plugin
      下面这一块的配置是指,是否需要使用extract这个插件,将css整体抽取出来.

      其他俩属性看一下api,
      有一个关键的配置属性.
      publicPath   这个属性是指,改写css中资源引用的路径.

      --
      如果不配置这个属性,部分例如background-image对本地文件夹图片url的引用.抽取后会导致路径出错
    */
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../../'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

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
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

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

// 多页面模式的路径返回方法
exports.getEntry = function (globPath) {
  var entries = {},       //路径集合
      basename = '',      //路径的标识
      key = '',           //路径的key值
      tmp;                //处理数组

  //可以获得传入path路径下的所有文件(返回数组)
  glob.sync(globPath).forEach(function (item) {
    /*
      http://nodejs.cn/api/path.html

      path.basename(path[, ext]) 是用于返回路径的最后部分

      path.basename('/foo/bar/baz/asdf/quux.html');
      // 返回: 'quux.html'

      path.basename('/foo/bar/baz/asdf/quux.html', '.html');
      // 返回: 'quux'

      -------
      path.extname(path) 方法返回 path 的扩展名
      path.extname('index.html');
      // 返回: '.html'
    */
    basename = path.basename(item, path.extname(item));
    tmp = item.split('/').splice(2);    //默认进来的地址是 ./src/页面文件夹/***  从src后面那个开始处理
    key = tmp.shift() + '/' + basename; //获取存放页面的文件夹名称 (拼接成 页面文件夹/对应页面的格式)
    entries[key] = item;
  })

  return entries;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// 打包css方法</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)
<span class="hljs-comment">// 匹配文件夹路径组件 https://www.cnblogs.com/waitforyou/p/7044171.html</span>
<span class="hljs-keyword">const</span> glob = <span class="hljs-built_in">require</span>(<span class="hljs-string">'glob'</span>)

exports.assetsPath = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">_path</span>) </span>{
  <span class="hljs-keyword">const</span> assetsSubDirectory = process.env.NODE_ENV === <span class="hljs-string">'production'</span>
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  <span class="hljs-keyword">return</span> path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  options = options || {}

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

  <span class="hljs-comment">// generate loader string to be used with extract text plugin</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateLoaders</span> (<span class="hljs-params">loader, loaderOptions</span>) </span>{
    <span class="hljs-comment">// 判断是否使用postcss</span>
    <span class="hljs-keyword">const</span> loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    <span class="hljs-keyword">if</span> (loader) {
      loaders.push({
        <span class="hljs-attr">loader</span>: loader + <span class="hljs-string">'-loader'</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-built_in">Object</span>.assign({}, loaderOptions, {
          <span class="hljs-attr">sourceMap</span>: options.sourceMap
        })
      })
    }

    <span class="hljs-comment">// Extract CSS when that option is specified</span>
    <span class="hljs-comment">// (which is the case during production build)</span>
    <span class="hljs-comment">/*
      https://www.npmjs.com/package/extract-text-webpack-plugin
      下面这一块的配置是指,是否需要使用extract这个插件,将css整体抽取出来.

      其他俩属性看一下api,
      有一个关键的配置属性.
      publicPath   这个属性是指,改写css中资源引用的路径.

      --
      如果不配置这个属性,部分例如background-image对本地文件夹图片url的引用.抽取后会导致路径出错
    */</span>
    <span class="hljs-keyword">if</span> (options.extract) {
      <span class="hljs-keyword">return</span> ExtractTextPlugin.extract({
        <span class="hljs-attr">use</span>: loaders,
        <span class="hljs-attr">fallback</span>: <span class="hljs-string">'vue-style-loader'</span>,
        <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'../../../'</span>
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-string">'vue-style-loader'</span>].concat(loaders)
    }
  }

  <span class="hljs-comment">// https://vue-loader.vuejs.org/en/configurations/extract-css.html</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">css</span>: generateLoaders(),
    <span class="hljs-attr">postcss</span>: generateLoaders(),
    <span class="hljs-attr">less</span>: generateLoaders(<span class="hljs-string">'less'</span>),
    <span class="hljs-attr">sass</span>: generateLoaders(<span class="hljs-string">'sass'</span>, { <span class="hljs-attr">indentedSyntax</span>: <span class="hljs-literal">true</span> }),
    <span class="hljs-attr">scss</span>: generateLoaders(<span class="hljs-string">'sass'</span>),
    <span class="hljs-attr">stylus</span>: generateLoaders(<span class="hljs-string">'stylus'</span>),
    <span class="hljs-attr">styl</span>: generateLoaders(<span class="hljs-string">'stylus'</span>)
  }
}

<span class="hljs-comment">// Generate loaders for standalone style files (outside of .vue)</span>
exports.styleLoaders = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">const</span> output = []
  <span class="hljs-keyword">const</span> loaders = exports.cssLoaders(options)

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
  <span class="hljs-keyword">const</span> notifier = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-notifier'</span>)

  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">severity, errors</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (severity !== <span class="hljs-string">'error'</span>) <span class="hljs-keyword">return</span>

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

<span class="hljs-comment">// 多页面模式的路径返回方法</span>
exports.getEntry = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">globPath</span>) </span>{
  <span class="hljs-keyword">var</span> entries = {},       <span class="hljs-comment">//路径集合</span>
      basename = <span class="hljs-string">''</span>,      <span class="hljs-comment">//路径的标识</span>
      key = <span class="hljs-string">''</span>,           <span class="hljs-comment">//路径的key值</span>
      tmp;                <span class="hljs-comment">//处理数组</span>

  <span class="hljs-comment">//可以获得传入path路径下的所有文件(返回数组)</span>
  glob.sync(globPath).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    <span class="hljs-comment">/*
      http://nodejs.cn/api/path.html

      path.basename(path[, ext]) 是用于返回路径的最后部分

      path.basename('/foo/bar/baz/asdf/quux.html');
      // 返回: 'quux.html'

      path.basename('/foo/bar/baz/asdf/quux.html', '.html');
      // 返回: 'quux'

      -------
      path.extname(path) 方法返回 path 的扩展名
      path.extname('index.html');
      // 返回: '.html'
    */</span>
    basename = path.basename(item, path.extname(item));
    tmp = item.split(<span class="hljs-string">'/'</span>).splice(<span class="hljs-number">2</span>);    <span class="hljs-comment">//默认进来的地址是 ./src/页面文件夹/***  从src后面那个开始处理</span>
    key = tmp.shift() + <span class="hljs-string">'/'</span> + basename; <span class="hljs-comment">//获取存放页面的文件夹名称 (拼接成 页面文件夹/对应页面的格式)</span>
    entries[key] = item;
  })

  <span class="hljs-keyword">return</span> entries;
}
</code></pre>
<h3 id="articleHeader6">config文件夹</h3>
<blockquote>一些被提取了出来的配置标识项, dev.env.js标识开发环境 prod.env.js生产环境(不过其实我不知道这2个有什么用 - -)</blockquote>
<h4>index.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
// 配置项
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: { // 开发环境

    // 静态文件夹路径
    assetsSubDirectory: 'static',
    // 编译后资源访问的路径
    assetsPublicPath: '/',
    // 代理
    proxyTable: {
        /*
            param:
            *:   表示挂代理时,识别的请求前缀
            url: 表示代理的地址
            例如
            '/api': {
                target: 'http://www.baidu.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                } //=> localhost:8000/api => http://www.baidu.com/api
            }

            代理的proxy格式可以参照以下github
            https://github.com/chimurai/http-proxy-middleware
        */
    },

    // Various Dev Server settings
    // 解决了原本仅为localhost 不能使用ip地址开发的问题
    host: '0.0.0.0',
    // 端口
    port: 8080,
    // 是否自动打开浏览器标识
    autoOpenBrowser: false,
    // webpack-dev-server中 是否全屏弹窗的形式显示编译过程中的错误标识
    errorOverlay: true,
    // 配合 friendly-errors-webpack-plugin
    notifyOnErrors: true,
    // dev-server 与监视文件相关的控制选项标识
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
     /*
        这里是关于代码的 sourcemap 模式的选择
        可参考以下各种类型 https://segmentfault.com/a/1190000008315937
        几个类型的关键字
        cheap
        eval
        module
    */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    // 指的是缓存破坏,but找不到api
    cacheBusting: false,
    /*
        是否开启 CSS 的 source maps,
        开启的话将在head头部的style中加入 source map的相关信息
    */
    cssSourceMap: false
  },

  build: { //生产环境
    // index模板文件
    index: path.resolve(__dirname, '../dist/index.html'),

    // 路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // 资源引用的路径(需要注意)
    assetsPublicPath: '../',

    /**
     * Source Maps
     */

    // 是否开启source map的标识
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // gzip压缩
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>
<span class="hljs-comment">// 配置项</span>
<span class="hljs-comment">// Template version: 1.3.1</span>
<span class="hljs-comment">// see http://vuejs-templates.github.io/webpack for documentation.</span>

<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">dev</span>: { <span class="hljs-comment">// 开发环境</span>

    <span class="hljs-comment">// 静态文件夹路径</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">// 编译后资源访问的路径</span>
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    <span class="hljs-comment">// 代理</span>
    proxyTable: {
        <span class="hljs-comment">/*
            param:
            *:   表示挂代理时,识别的请求前缀
            url: 表示代理的地址
            例如
            '/api': {
                target: 'http://www.baidu.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                } //=&gt; localhost:8000/api =&gt; http://www.baidu.com/api
            }

            代理的proxy格式可以参照以下github
            https://github.com/chimurai/http-proxy-middleware
        */</span>
    },

    <span class="hljs-comment">// Various Dev Server settings</span>
    <span class="hljs-comment">// 解决了原本仅为localhost 不能使用ip地址开发的问题</span>
    host: <span class="hljs-string">'0.0.0.0'</span>,
    <span class="hljs-comment">// 端口</span>
    port: <span class="hljs-number">8080</span>,
    <span class="hljs-comment">// 是否自动打开浏览器标识</span>
    autoOpenBrowser: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">// webpack-dev-server中 是否全屏弹窗的形式显示编译过程中的错误标识</span>
    errorOverlay: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// 配合 friendly-errors-webpack-plugin</span>
    notifyOnErrors: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// dev-server 与监视文件相关的控制选项标识</span>
    poll: <span class="hljs-literal">false</span>, <span class="hljs-comment">// https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-</span>

    
     <span class="hljs-comment">/*
        这里是关于代码的 sourcemap 模式的选择
        可参考以下各种类型 https://segmentfault.com/a/1190000008315937
        几个类型的关键字
        cheap
        eval
        module
    */</span>

    <span class="hljs-comment">// https://webpack.js.org/configuration/devtool/#development</span>
    devtool: <span class="hljs-string">'cheap-module-eval-source-map'</span>,

    <span class="hljs-comment">// If you have problems debugging vue-files in devtools,</span>
    <span class="hljs-comment">// set this to false - it *may* help</span>
    <span class="hljs-comment">// https://vue-loader.vuejs.org/en/options.html#cachebusting</span>
    <span class="hljs-comment">// 指的是缓存破坏,but找不到api</span>
    cacheBusting: <span class="hljs-literal">false</span>,
    <span class="hljs-comment">/*
        是否开启 CSS 的 source maps,
        开启的话将在head头部的style中加入 source map的相关信息
    */</span>
    cssSourceMap: <span class="hljs-literal">false</span>
  },

  <span class="hljs-attr">build</span>: { <span class="hljs-comment">//生产环境</span>
    <span class="hljs-comment">// index模板文件</span>
    index: path.resolve(__dirname, <span class="hljs-string">'../dist/index.html'</span>),

    <span class="hljs-comment">// 路径</span>
    assetsRoot: path.resolve(__dirname, <span class="hljs-string">'../dist'</span>),
    <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
    <span class="hljs-comment">// 资源引用的路径(需要注意)</span>
    assetsPublicPath: <span class="hljs-string">'../'</span>,

    <span class="hljs-comment">/**
     * Source Maps
     */</span>

    <span class="hljs-comment">// 是否开启source map的标识</span>
    productionSourceMap: <span class="hljs-literal">true</span>,
    <span class="hljs-comment">// https://webpack.js.org/configuration/devtool/#production</span>
    devtool: <span class="hljs-string">'#source-map'</span>,

    <span class="hljs-comment">// Gzip off by default as many popular static hosts such as</span>
    <span class="hljs-comment">// Surge or Netlify already gzip all static assets for you.</span>
    <span class="hljs-comment">// Before setting to `true`, make sure to:</span>
    <span class="hljs-comment">// npm install --save-dev compression-webpack-plugin</span>
    <span class="hljs-comment">// gzip压缩</span>
    productionGzip: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">productionGzipExtensions</span>: [<span class="hljs-string">'js'</span>, <span class="hljs-string">'css'</span>],

    <span class="hljs-comment">// Run the build command with an extra argument to</span>
    <span class="hljs-comment">// View the bundle analyzer report after build finishes:</span>
    <span class="hljs-comment">// `npm run build --report`</span>
    <span class="hljs-comment">// Set to `true` or `false` to always turn it on or off</span>
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
</code></pre>
<h3 id="articleHeader7">总结</h3>
<ul>
<li>目前这个版本的注释我改造了一下改成了多页面模式,(原来写的不合适,修改一下, 如果需要用<strong>spa的模式</strong>请麻烦重新拉个包,配置文件一样的,不过在config中生产的配置项目assetsPublicPath要改为'./' 不过有一些不改也可以,具体看发包后情况)</li>
<li>
<p>整理完2.0和3.0的配置内容,我发现了3.0用了以下一些不同的东西:</p>
<ol>
<li>我发现3.0用了一直宣传的ModuleConcatenationPlugin.</li>
<li>2.*在开发过程热加载和预编译用的是 express+dev-middleware+hot-middleware(热加载时会刷新页面)</li>
<li>3.*在开发过程热加载和预编译直接就用回了 webpack-dev-server(似乎热加载不刷新页面了直接覆盖掉)</li>
</ol>
</li>
<li>刚刚升级3.0用的脚手架有一个问题.就是wepback-dev-server是2.9.7版本,这个版本client里面的代码用了es6.导致一些旧版本的ios(我自己是ios9.3.5)直接傻哔了,最近拉下来的升级到2.11.0了而且在base.conf.js中babel-loader加了对应的include</li>
<li>其他文件例如 .babelrc是用于babel的配置文件/.postcssrc.js是postcss的一系列配置内容</li>
<li>0129 18点,下班的moment我在assets加入了公共的配置项,拉下来就能直接搞了.(大家互相学习咯) ^^</li>
<li>0208 更新webpack打包完导致静态引用路径错误的问题:<br> 1.因为在开发环境中,将静态文件夹通过CopyWebpackPlugin插件复制到了(config.dev.assetsSubDirectory)的文件夹路径中,所以使用下面2种方式在开发环境中去引用都可以<br><span class="img-wrap"><img data-src="/img/bV3Ab2?w=451&amp;h=52" src="https://static.alili.tech/img/bV3Ab2?w=451&amp;h=52" alt="路径图片" title="路径图片" style="cursor: pointer;"></span><p>那么问题就来了build打包完之后,目录结构是这样.<br><span class="img-wrap"><img data-src="/img/bV3Ao4?w=633&amp;h=331" src="https://static.alili.tech/img/bV3Ao4?w=633&amp;h=331" alt="打包完目录结构图" title="打包完目录结构图" style="cursor: pointer;"></span></p>
<p>那么使用上面 /static这种标识在根目录的static就会找不到资源了.所以建议使用../../的方式,或者到base.conf.js中配置alias使用.这样去使用.<br><span class="img-wrap"><img data-src="/img/bV3A6g?w=394&amp;h=194" src="https://static.alili.tech/img/bV3A6g?w=394&amp;h=194" alt="静态资源调用" title="静态资源调用" style="cursor: pointer;"></span></p>
</li>
<li>0324 更新如何解决之前发现build后,使用background-image路径报错的问题.<br> 最开始发现,直接npm build的时候,在css中使用的资源路径<strong>(主要是图片资源)</strong>引用会报错.<br> 因为build完文件夹都会被重新处理摆放,</li>
</ul>
<hr>
<p>因为在base.conf.js中,用url-loader对图片进行了处理:<br><span class="img-wrap"><img data-src="/img/bV3A7E?w=702&amp;h=164" src="https://static.alili.tech/img/bV3A7E?w=702&amp;h=164" alt="url-loader配置" title="url-loader配置" style="cursor: pointer;"></span></p>
<ol>
<li>未超过limit的字节数将打包成dataURL的格式,</li>
<li>超过了会放到static/img的文件夹</li>
</ol>
<p>build打包完文件位置与开发不同,导致了css路径就会有问题...</p>
<p>后面研究了一下build时会触发的库,发现是使用了extract-text-webpack-plugin将css都抽取到了一起.看了一下api里面有一个配置项<strong>publicPath</strong>.调整一下到正确的引用即可解决这个问题.<br><span class="img-wrap"><img data-src="/img/bV6Jgv?w=735&amp;h=259" src="https://static.alili.tech/img/bV6Jgv?w=735&amp;h=259" alt="extract配置项" title="extract配置项" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli (vue2.5.2&webpack3.6.0) 配置文件全注释

## 原文链接
[https://segmentfault.com/a/1190000013036057](https://segmentfault.com/a/1190000013036057)


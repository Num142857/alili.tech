---
title: 'vue-cli#4.7项目结构分析' 
date: 2018-12-01 2:30:12
hidden: true
slug: mkurq8d2du
categories: [reprint]
---

{{< raw >}}

                    
<h3>前言</h3>
<p>使用过 vue 进行项目开发的同学，一定知道或者使用过 vue-cli 脚手架，他能够很好的搭建项目结构和工程，让我们能够把足够的精力放在业务开发上。也正是因为这样，很多时候我们会因为项目工期短等原因来不及或则不会刻意去了解项目工程配置，我们今天不去介绍脚手架的使用，我们去了解下脚手架为我们创建好的打包工程是怎么做的。</p>
<h3>项目结构</h3>
<p><code></code></p>
<pre><code>    ├── build --------------------------------- webpack相关配置文件
    │   ├── build.js --------------------------webpack打包配置文件
    │   ├── check-versions.js ------------------------------ 检查npm,nodejs版本
    │   ├── logo.png ---------------------------------- 项目 logo
    │   ├── utils.js --------------------------------------- 配置资源路径，配置css加载器
    │   ├── vue-loader.conf.js ----------------------------- 配置css加载器等
    │   ├── webpack.base.conf.js --------------------------- webpack基本配置
    │   ├── webpack.dev.conf.js ---------------------------- 用于开发的webpack设置
    │   ├── webpack.prod.conf.js --------------------------- 用于打包的webpack设置
    ├── config ---------------------------------- 配置文件
           ├── index.js ------------------------------ 开发和生产环境配置文件
    ├── node_modules ---------------------------- 存放依赖的目录
    ├── src ------------------------------------- 源码
    │   ├── assets ------------------------------ 静态文件
    │   ├── components -------------------------- 组件
    │   ├── main.js ----------------------------- 主js
    │   ├── App.vue ----------------------------- 项目入口组件
    │   ├── router ------------------------------ 路由
    ├── package.json ---------------------------- node配置文件
    ├── .babelrc--------------------------------- babel配置文件
    ├── .editorconfig---------------------------- 编辑器配置
    ├── .gitignore------------------------------- 配置git可忽略的文件
</code></pre>
<p></p>
<h3>webpack配置划重点</h3>
<blockquote>在看项目配置文件之前，我们先了解下 webpack 几个常用的工具和插件，如果你已经十分熟悉，你可以跳过这一小节，直接去看，配置文件解析</blockquote>
<h4>1. path模块</h4>
<p>path 是 node.js 中的一个模块，用于处理目录的对象，提高开发效</p>
<pre><code>常用方法：
path.join(): 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix 系统是 ”/“，Windows系统是 ”\“
path.resolve() 用于将相对路径转为绝对路径

常使用的文件路径
__dirname: 总是返回被执行的 js 所在文件夹的绝对路径
__filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径


</code></pre>
<h4>2.process</h4>
<p>process对象是Node的一个全局对象，提供当前Node进程的信息。</p>
<pre><code>process 对象提供一系列属性，用于返回系统信息
process.argv：返回当前进程的命令行参数数组。
process.env：返回一个对象，成员为当前Shell的环境变量，比如process.env.HOME
process.pid：当前进程的进程号

</code></pre>
<h4>3.Source map</h4>
<p>简单说，<a href="http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html" rel="nofollow noreferrer">Source map</a>就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。有了它，出错的时候，debug 工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。<a href="https://juejin.im/post/58293502a0bb9f005767ba2f" rel="nofollow noreferrer">webpack 的 devtool里有 7种 SourceMap 模式</a></p>
<table>
<thead><tr>
<th>模式</th>
<th>解释</th>
</tr></thead>
<tbody>
<tr>
<td>eval</td>
<td>每个 module 会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL</td>
</tr>
<tr>
<td>source-map</td>
<td>生成一个 SourceMap 文件.</td>
</tr>
<tr>
<td>hidden-source-map</td>
<td>和 source-map 一样，但不会在 bundle 末尾追加注释.</td>
</tr>
<tr>
<td>inline-source-map</td>
<td>生成一个 DataUrl 形式的 SourceMap 文件.</td>
</tr>
<tr>
<td>eval-source-map</td>
<td>每个 module 会通过 eval() 来执行，并且生成一个 DataUrl 形式的 SourceMap .</td>
</tr>
<tr>
<td>cheap-source-map</td>
<td>生成一个没有列信息（column-mappings）的 SourceMaps 文件，不包含 loader 的 sourcemap（譬如 babel 的 sourcemap）</td>
</tr>
<tr>
<td>cheap-module-source-map</td>
<td>生成一个没有列信息（column-mappings）的 SourceMaps 文件，同时 loader 的 sourcemap 也被简化为只包含对应行的。</td>
</tr>
</tbody>
</table>
<h4>4. webpack-merge</h4>
<p>开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。通用的配置部分，我们抽象出一个公共文件，通过 <a href="https://doc.webpack-china.org/guides/production/" rel="nofollow noreferrer">webpack-merge</a> 工具的“通用”配置，我们不必在环境特定的配置中重复代码。</p>
<h4>5. ExtractTextWebpackPlugin</h4>
<p><a href="https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/" rel="nofollow noreferrer">ExtractTextWebpackPlugin</a> 插件通常用来做样式文件的分离，被分离的文件不会被内嵌到  JS bundle 中，而会被放到一个单独的文件中，在样式文件比较大的时候，能够提前样式的加载,配置示例如下</p>
<pre><code>const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
   module: {
      rules: [
      {
         test: /\.css$/,
         use: ExtractTextPlugin.extract({
         fallback: "style-loader",
         use: "css-loader"
      })
   }]
},
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ]
}

</code></pre>
<p>它会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。 如果你的样式文件大小较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。</p>
<h4>6.html-webpack-plugin</h4>
<p>如果你有多个 webpack 入口点， 他们都会在生成的HTML文件中的 script 标签内。如果你有任何 CSS assets 在 webpack 的输出中（例如， 利用ExtractTextPlugin提取CSS）， 那么这些将被包含在HTML head中的&lt;link&gt;标签内。通常在开发中，我们为了避免 CDN 和浏览器的缓存通常会个输出文件 bundle.js 加上一个hash 值例如 <code>[hash].bundle.js</code>，使用 <a href="https://doc.webpack-china.org/plugins/html-webpack-plugin/" rel="nofollow noreferrer">html-webpack-plugin</a> 能够在创建新的 html 文件的时候将我们把带有哈希值的 bundle.js 引用到 html 文件.</p>
<h4>7.optimize-css-assets-webpack-plugin</h4>
<p>用来优化从脚本里提炼出来的 css ，配置示例如下</p>
<pre><code>var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
};
</code></pre>
<h4>8.CopyWebpackPlugin</h4>
<p><a href="https://doc.webpack-china.org/plugins/copy-webpack-plugin/" rel="nofollow noreferrer">CopyWebpackPlugin</a>从插件名称上我们不难看出他的作用，通常用来拷贝资源，对项目文件进行归类整合</p>
<h4>9.friendly-errors-webpack-plugin</h4>
<p><a href="https://www.npmjs.com/package/friendly-errors-webpack-plugin" rel="nofollow noreferrer">friendly-errors-webpack-plugin</a>能够更好在终端看到webapck运行的警告和错误，提高开发体验</p>
<h4>10.UglifyjsWebpackPlugin</h4>
<p><a href="https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/" rel="nofollow noreferrer">UglifyjsWebpackPlugin</a>用来压缩 js 代码</p>
<h4>11.开发中 Server(DevServer)</h4>
<p>webpack 项目服务，我们通常会在开发阶段用来配置项目的热刷新，服务压缩，项目代理等，常用的几个配置参数介绍如下</p>
<pre><code>const config = require('../config')

// config 文件里做了用户自定的服务参数配置

devServer: {
    clientLogLevel: 'warning',  // 在开发攻击的控制台中显示信息，便于开发调试，你可以将参数配置成 "none" 来进行关闭
     historyApiFallback: { // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        rewrites: [
           { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
        ],
     },
     hot: true,   //启用项目的热刷新，即模块热替换特性
     contentBase: false,   // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。这里禁用，因为配置了 CopyWebpackPlugin 的使用
     compress: true,
     host: HOST || config.dev.host,   //指定使用一个域名。默认是 localhost
     port: PORT || config.dev.port,   //指定要监听请求的端口号：
     open: config.dev.autoOpenBrowser, //open 参数配置，如果配置成 true ，项目启动后会自动打开浏览器
     overlay: config.dev.errorOverlay   //当有错误或则警告的时候在页面上显示一个全屏的遮罩提示
         ? { warnings: false, errors: true }
         : false,
     publicPath: config.dev.assetsPublicPath, //此路径下的打包文件可在浏览器中访问
     proxy: config.dev.proxyTable,           //代理API的请求
     quiet: true,       //启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台,特别是使用了 FriendlyErrorsPlugin 插件的时候
     watchOptions: {   //与监视文件相关的控制选项。是否使用轮询
           poll: config.dev.poll,
     }
},


</code></pre>
<h3>配置文件解析</h3>
<blockquote>通过了解了上面的配置，我们应该对 webpack 的常用插件和工具有了一定了解，我们来看下 vue-cli 脚手架给我们生成的配置情况</blockquote>
<h4>config.js</h4>
<p>'use strict'</p>
<p>const path = require('path') // 引用项目的 path 模块</p>
<p>module.exports = {<br>  dev: {</p>
<pre><code>// 路径配置
assetsSubDirectory: 'static',
assetsPublicPath: '/',
proxyTable: {},

// 各种开发服务配置
host: 'localhost', // 开发环境域名 可以被 node 全局变量process.env.HOST 重写
port: 8080, //配置开发服务端口，可以被 node 全局变量 process.env.PORT 重写, 需要使用未被占用的端口
autoOpenBrowser: false, //服务启动是否自动代开浏览器
errorOverlay: true,   //是否在发生错误的时候，在页面整屏增加一个错误遮罩
notifyOnErrors: true,  //是否通知错误 ，在我们的项目配置中和 friendly-errors-webpack-plugin 结合使用
poll: false, // 服务监听是否轮询操作

// 配饰是否使用 Eslint Loader 进行语法检测
// 如果使用，在开发构建阶段，会对你的代码会进行检测
// 检测出来的警告和错误会白展示在开发工具的控制台

useEslint: true,  //进行语法检测

// 配置是否将 eslint 语法检测的警告和错误展示在页面整屏的遮罩上

showEslintErrorsInOverlay: false,  // 语法检测的警告和错误不展示在遮罩上

/**
 * Source Maps
 */

// https://webpack.js.org/configuration/devtool/#development
// 在上面的介绍中，我们知道 source map 是用来将我们构建后被转化的代码对应构建前的代码，便于 debug
// cheap-module-eval-source-map 和我们介绍的 cheap-module-source-map 很类似，但是 SourceMap 会被作为数据添加到包中
devtool: 'cheap-module-eval-source-map',

// 如果你的开发工具不能进行 vue-files 的 debug ，可以将以下设置设置成 false

cacheBusting: true,

cssSourceMap: true</code></pre>
<p>},</p>
<p>build: {</p>
<pre><code>// index.html 文件模板
index: path.resolve(__dirname, '../dist/index.html'),

// 打包路径配置
assetsRoot: path.resolve(__dirname, '../dist'),
assetsSubDirectory: 'static',
assetsPublicPath: '/',

/**
 * Source Maps
 */

//生产环境 source map 配置

productionSourceMap: true,
devtool: '#source-map',

// 因为很多的主流服务都会 通过 gzip 压缩过你的所有静态资源，我们的配置默认不开启 gzip
// 如果要设置成开启,请先确保已经安装好 compression-webpack-plugin 插件
productionGzip: false,
productionGzipExtensions: ['js', 'css'],

// 启动 build 命令的时候，额外添加一个参数，打包后会自动生成一个分析报告文件，例如 npm run build --report ，可以通过配置 true ，false 来关闭
bundleAnalyzerReport: process.env.npm_config_report</code></pre>
<p>}<br>}</p>
<h4>check-versions.js</h4>
<p>这个文件主要是用来检测当前环境中的node和npm版本和我们需要的是否一致的。</p>
<pre><code>'use strict'
const chalk = require('chalk')  // 改变命令行中的字体颜色，大致这样用chalk.blue('Hello world')
const semver = require('semver')  //是用来对特定的版本号做判断的

const packageConfig = require('../package.json')  // 项目 npm 配置文件，获取依赖及版本信息，requrie返回的就是json对象
const shell = require('shelljs') //用来执行Unix系统命令，调用系统命令更加方便

//把cmd这个参数传递的值转化成前后没有空格的字符串，也就是版本号
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}


const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),  // 提取进程版本信息转化成规定格式，也就是 '  =v1.2.3  ' -&gt; '1.2.3' 这种功能
    versionRequirement: packageConfig.engines.node // package.json 的 node 的版本信息
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),   //当前的版本信息
    versionRequirement: packageConfig.engines.npm //package.json 的 node 的版本信息
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i &lt; versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    // 如果当前版本号不符合 package.json 要求的版本号，红色表示当前版本信息，绿色表示要求的版本信息，添加到 warnings 待输出
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  //输出版本号不相符的提示 warnings
  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i &lt; warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}



</code></pre>
<h4>build.js</h4>
<pre><code>'use strict'

//打包前判断当先开发环境的 node 和 npm 版本和 package.json 要求的时候一样
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')  // 在用户打包的时候能够让用户知道正在进行，一个加载中的样式，转啊转
const rm = require('rimraf') //这个模块是用来清除之前的打的包，因为在vue-cli中每次打包会生成不同的hash
const path = require('path') //node 路径模块，便于我们操作文件路径
const chalk = require('chalk') //带颜色的输出模块，能在控制台中输出不同的样色
const webpack = require('webpack') //webpack 不解释
const config = require('../config') // 项目中的配置文件，👆上面已经进行了配置介绍
const webpackConfig = require('./webpack.prod.conf') // 生产环境的配置文件


const spinner = ora('building for production...')// 实例一个打包加载中实例
spinner.start() //开始转圈，营造一个正在打包的场景

// 删除上一次打包的文件，删除成功，开始按照生产环境配置进行打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err =&gt; {
  if (err) throw err


    //开始打包，打包结束停止 spinner 转圈，有报错则在控制台输出
  webpack(webpackConfig, (err, stats) =&gt; {
    spinner.stop()
    if (err) throw err

    // node 环境里的输出配置，process.stdout.write 你可以理解成 js 里的 console
    process.stdout.write(stats.toString({
      colors: true, //让打包的时候有颜色。
      modules: false,  //去掉内置模块信息
      children: false, // 去掉子模块,如果你使用了 ts-loader，设置成 true 会在打包构建阶段展示错误信息
      chunks: false, // 增加包信息（设置为 false 能允许较少的冗长输出）
      chunkModules: false //去除包里内置模块的信息
    }) + '\n\n')


     //打包出错在控制台输出 Build failed with errors ，退出打包程序
    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    //打包成功则输出 Build complete 结束打包
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

</code></pre>
<h4>webpack.base.conf.js</h4>
<pre><code>'use strict'
const path = require('path')  // node 路径模块
const utils = require('./utils') //node 内部常用的工具类，其中包括：格式化字符串、对象的序列化、实现对象继承等常用方法
const config = require('../config') //👆上面我们介绍的，项目配置文件
const vueLoaderConfig = require('./vue-loader.conf') //👆 上面我们介绍的 vue 加载器配置文件

//返回当前配置文件位置是 build ，该方法放回 build/../dir 的相对路基
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// eslint 语法检测配置
const createLintingRule = () =&gt; ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

// webpack 通用配置内容
module.exports = {
  context: path.resolve(__dirname, '../'),  // 上下文，基础目录，用于从配置中解析入口起点和 loader
  entry: {
    app: './src/main.js'  //起点或是应用程序的起点入口。从这个起点开始，应用程序启动执行。如果传递一个数组，那么数组的每一项都会执行。
  },
  output: {
    path: config.build.assetsRoot,   //输出 bundle 的路径
    filename: '[name].js',          //输出 bundle 的名称
    publicPath: process.env.NODE_ENV === 'production' // 指定资源文件引用的目录，例如图片
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'], //配置模块如何解析,
    alias: {                              // 创建应用的别名，
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },</code></pre>
<p>module: {</p>
<pre><code>rules: [
  //判断配置中是否要是用 eslint 语法检测，如果使用，就将 createLintingRule 配置对象返回
  ...(config.dev.useEslint ? [createLintingRule()] : []),

 //👇是一些比较常用的加载器，及配置，不做详细介绍了
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
  },
  {
    test: /\.(css | scss)$/,
    loader: 'style-loader!css-loader!!sass-loader'
  },
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
]</code></pre>
<p>},<br>  node: {</p>
<pre><code>//防止因为 vue 资源本身就自带的 无用的 node 注入，浏览器兼容处理
setImmediate: false,
dgram: 'empty',
fs: 'empty',
net: 'empty',
tls: 'empty',
child_process: 'empty'</code></pre>
<p>}<br>}</p>
<h4>webpack.dev.conf.js</h4>
<pre><code>'use strict'
const utils = require('./utils')  //node 工具模块
const webpack = require('webpack') //webpack 不解释
const config = require('../config')//👆提到的配置文件
const merge = require('webpack-merge') // merge 工具，用来合并生产和开发环境通用的基础 webpack 配置
const path = require('path')            //node 的路径模块
const baseWebpackConfig = require('./webpack.base.conf') //生产和开发环境通用的基础 webpack 配置
const CopyWebpackPlugin = require('copy-webpack-plugin') //拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin')  //动态生成 html 插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin') //友好的错误输出插件
const portfinder = require('portfinder') //能够获取一个可用的随机端口号

const HOST = process.env.HOST   //node 全局环境变量的主机
const PORT = process.env.PORT &amp;&amp; Number(process.env.PORT)   //node 全局环境变量的端口

//合并基础配置加载器的配置部分
const devWebpackConfig = merge(baseWebpackConfig, {

  module: {
    // 为 .vue 文件意外的独立样式文件配置加载器
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },

  // cheap-module-eval-source-map 在开发环境中很快
  devtool: config.dev.devtool,

  // 开发服务配置，👆 已经细讲过，顺便回顾一下
  devServer: {
     clientLogLevel: 'warning',  // 在开发攻击的控制台中显示信息，便于开发调试，你可以将参数配置成 "none" 来进行关闭
     historyApiFallback: { // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        rewrites: [
           { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
        ],
     },
     hot: true,   //启用项目的热刷新，即模块热替换特性
     contentBase: false,   // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。这里禁用，因为配置了 CopyWebpackPlugin 的使用
     compress: true,
     host: HOST || config.dev.host,   //指定使用一个域名。默认是 localhost
     port: PORT || config.dev.port,   //指定要监听请求的端口号：
     open: config.dev.autoOpenBrowser, //open 参数配置，如果配置成 true ，项目启动后会自动打开浏览器
     overlay: config.dev.errorOverlay   //当有错误或则警告的时候在页面上显示一个全屏的遮罩提示
           ? { warnings: false, errors: true }
           : false,
     publicPath: config.dev.assetsPublicPath, //此路径下的打包文件可在浏览器中访问
     proxy: config.dev.proxyTable,           //代理API的请求
     quiet: true,       //启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台,特别是使用了 FriendlyErrorsPlugin 插件的时候
     watchOptions: {   //与监视文件相关的控制选项。是否使用轮询
           poll: config.dev.poll,
     }
   },

  plugins: [
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(), //启用热替换模块(Hot Module Replacement)，也被称为 HMR
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
    new webpack.NoEmitOnErrorsPlugin(), 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段

    //HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),


    // 拷贝自定义的静态资源文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// 实例一个异步对象，执行 devWebpackConfig 配置编译
module.exports = new Promise((resolve, reject) =&gt; {
  portfinder.basePort = process.env.PORT || config.dev.port  //设置基础端口
  portfinder.getPort((err, port) =&gt; {获取端口，输出构建新
    if (err) {
      reject(err)
    } else {
      // 如果进行 e2e 测试，需要发布新端口
      process.env.PORT = port

      // 更新 devServer 的端口
      devWebpackConfig.devServer.port = port

      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

       //执行打包配置文件
      resolve(devWebpackConfig)
    }
  })
})


</code></pre>
<h4>webpack.prod.conf.js</h4>
<pre><code>'use strict'
const path = require('path') // node 路径模块
const utils = require('./utils') //小工具函数
const webpack = require('webpack') // webpack 不解释
const config = require('../config')//👆提到的配置文件
const merge = require('webpack-merge') // merge 工具，用来合并生产和开发环境通用的基础 webpack 配置
const baseWebpackConfig = require('./webpack.base.conf')//产和开发环境通用的基础 webpack 配置
const CopyWebpackPlugin = require('copy-webpack-plugin') //拷贝插件
const HtmlWebpackPlugin = require('html-webpack-plugin')  //动态生成 html 插件
const ExtractTextPlugin = require('extract-text-webpack-plugin')//用来做文件分离的插件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')//优化提炼出来的css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')// 压缩 js 文件插件

//生产环境配置
const env = require('../config/prod.env')

//合并基础配置加载器的配置部分
const webpackConfig = merge(baseWebpackConfig, {
//为独立分离出来的样式配置加载器和source，map
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  //配置线上的 source map 便于排查问题
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  //配置输出，路径，文件名
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // DefinePlugin 允许创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
    new webpack.DefinePlugin({
      'process.env': env
    }),

    // 使用 UglifyJsPlugin 插件对 js 进行压缩
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      //配置插件的source map
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // 提取 css 到单独的文件，分离文件异步加载，提高加载速度
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),

      //如果把 allChunks 参数设置陈 false ，就不会把css 从代码块中分离出来
      //代码块加载的时候 css 会被 styles-loader 动态的加载
      allChunks: true,
    }),

    //使用这个插件，从不同的组件中复制脱离出来，进行 css 压缩
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),

    //自动生成 html 文件，通常 index.html 文件都会带一个哈希值来清除缓存
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },

      chunksSortMode: 'dependency'
    }),
    //该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 渲染模块没有变化的时候，id 不会变。
    new webpack.HashedModuleIdsPlugin(),

    // 提升或者预编译所有模块到一个闭包中，提升你的代码在浏览器中的执行速度。
    new webpack.optimize.ModuleConcatenationPlugin(),

    // 分离渲染的js 到独立的文件中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        //被引用到的包会从 node_modules 中提取出来
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

    // 拷贝自定义的静态资源文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

//判断如果配置了生产环境压缩，是则使用插件进行压缩
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

//是否要生成代码打包分析报告
if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig


</code></pre>
<h3>扩展</h3>
<p>👆这篇文章详细的介绍了脚手架项目的 webpack 配置，但是只是 webpack 的一部分，还有很多内容值得我们去探究，如果你还感兴趣，可以阅读下面这些文章。也欢迎随时与我进行交流，微信号：646321933</p>
<p><a href="https://doc.webpack-china.org/guides/production/" rel="nofollow noreferrer">webpack指南 </a></p>
<p><a href="https://doc.webpack-china.org/concepts/" rel="nofollow noreferrer">webpack文档</a></p>
<p><a href="https://doc.webpack-china.org/configuration" rel="nofollow noreferrer">webpack配置 </a></p>
<p><a href="https://juejin.im/post/5a31d210f265da431a43330e" rel="nofollow noreferrer">自己动手实现一个脚手架</a></p>
<p><a href="https://doc.webpack-china.org/plugins" rel="nofollow noreferrer">webpack 官方插件集合介绍文档 </a></p>
<p><a href="https://segmentfault.com/a/1190000007441374">《 使用vue-cli脚手架创建新项目》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli#4.7项目结构分析

## 原文链接
[https://segmentfault.com/a/1190000014828384](https://segmentfault.com/a/1190000014828384)


---
title: 'Spring Boot+Vue从零开始搭建系统（二）：项目前端_Vuejs目录结构描述' 
date: 2018-12-07 2:30:09
hidden: true
slug: wtx947i3hcn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>前言</strong></h2>
<p>构建vue项目的开发环境配置，官方提供了脚手架工具vue-cli来快速构建一个开发环境，初始化一个vue项目操作命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装node.js，内含npm，Node.js官网：https://nodejs.org/en/ 。

// 设置npm镜像cnpm命令行工具
npm install -g cnpm --registry=https://registry.npm.taobao.org 

// 全局安装 vue-cli
cnpm install -g vue-cli

// 先创建并进入vue项目目录
cd W:\Workspaces\git_repositories\javalsj-blog-vue

// 创建一个基于 webpack 模板的新项目
vue init webpack javalsj-blog-vue

// 先进入vue项目目录下再安装该项目的依赖
cd W:\Workspaces\git_repositories\javalsj-blog-vue\javalsj-blog-vue

// 初始化安装项目
cnpm install

// 运行项目
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 安装node.js，内含npm，Node.js官网：https://nodejs.org/en/ 。</span>

<span class="hljs-comment">// 设置npm镜像cnpm命令行工具</span>
npm install -<span class="hljs-keyword">g</span> cnpm --registry=https:<span class="hljs-comment">//registry.npm.taobao.org </span>

<span class="hljs-comment">// 全局安装 vue-cli</span>
cnpm install -<span class="hljs-keyword">g</span> vue-<span class="hljs-keyword">cli</span>

<span class="hljs-comment">// 先创建并进入vue项目目录</span>
<span class="hljs-keyword">cd</span> W:\Workspaces\git_repositories\javalsj-blog-vue

<span class="hljs-comment">// 创建一个基于 webpack 模板的新项目</span>
vue init webpack javalsj-blog-vue

<span class="hljs-comment">// 先进入vue项目目录下再安装该项目的依赖</span>
<span class="hljs-keyword">cd</span> W:\Workspaces\git_repositories\javalsj-blog-vue\javalsj-blog-vue

<span class="hljs-comment">// 初始化安装项目</span>
cnpm install

<span class="hljs-comment">// 运行项目</span>
npm <span class="hljs-keyword">run</span> dev</code></pre>
<p>打开项目文件目录，如下：<br><span class="img-wrap"><img data-src="/img/bV7GxQ?w=1920&amp;h=1048" src="https://static.alili.tech/img/bV7GxQ?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>下面介绍项目初始目录结构信息，只是了解一下就行。</p>
<hr>
<h2 id="articleHeader1"><strong>vue-cli项目结构大纲</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- dev-client.js                // 热重载相关
|   |-- dev-server.js                // 构建本地服务器
|   |-- utils.js                     // 构建工具相关
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量
|-- src                              // 源码目录
|   |-- components                   // vue公共组件
|   |-- store                        // vuex的状态管理
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                         // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">-- build                            // 项目构建(webpack)相关代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- build.js                     // 生产环境构建代码
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- check-version.js             // 检查node、npm等版本
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev-client.js                // 热重载相关
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev-server.js                // 构建本地服务器
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- utils.js                     // 构建工具相关
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.base.conf.js         // webpack基础配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.dev.conf.js          // webpack开发环境配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- webpack.prod.conf.js         // webpack生产环境配置
</span>|<span class="hljs-string">-- config                           // 项目开发环境配置
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- dev.env.js                   // 开发环境变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- index.js                     // 项目一些配置变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- prod.env.js                  // 生产环境变量
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- test.env.js                  // 测试环境变量
</span>|<span class="hljs-string">-- src                              // 源码目录
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- components                   // vue公共组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- store                        // vuex的状态管理
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- App.vue                      // 页面入口文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- main.js                      // 程序入口文件，加载各种公共组件
</span>|<span class="hljs-string">-- static                           // 静态文件，比如一些图片，json数据等
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- data                         // 群聊分析得到的数据用于数据可视化
</span>|<span class="hljs-string">-- .babelrc                         // ES6语法编译配置
</span>|<span class="hljs-string">-- .editorconfig                    // 定义代码格式
</span>|<span class="hljs-string">-- .gitignore                       // git上传需要忽略的文件格式
</span>|<span class="hljs-string">-- README.md                        // 项目说明
</span>|<span class="hljs-string">-- favicon.ico 
</span>|<span class="hljs-string">-- index.html                       // 入口页面
</span>|<span class="hljs-string">-- package.json                     // 项目基本信息

</span></code></pre>
<hr>
<h2 id="articleHeader2"><strong>vue-cli项目结构配置文件详细描述</strong></h2>
<h3 id="articleHeader3"><strong><code>package.json</code></strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里包含开发运行，项目打包，单元测试等命令，测试的东西先放一边，看dev和build命令。运行”npm run dev”的时候执行的是build/dev-server.js文件，运行”npm run build”的时候执行的是build/build.js文件，我们可以从这两个文件开始进行代码阅读分析。

```
&quot;scripts&quot;: {
&quot;dev&quot;: &quot;webpack-dev-server --inline --progress --config build/webpack.dev.conf.js&quot;,
&quot;start&quot;: &quot;npm run dev&quot;,
&quot;lint&quot;: &quot;eslint --ext .js,.vue src&quot;,
&quot;build&quot;: &quot;node build/build.js&quot;
},
```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>这里包含开发运行，项目打包，单元测试等命令，测试的东西先放一边，看dev和build命令。运行”npm run dev”的时候执行的是build/dev-server.js文件，运行”npm run build”的时候执行的是build/build.js文件，我们可以从这两个文件开始进行代码阅读分析。

```
<span class="hljs-string">"scripts"</span>: {
<span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --inline --progress --config build/webpack.dev.conf.js"</span>,
<span class="hljs-string">"start"</span>: <span class="hljs-string">"npm run dev"</span>,
<span class="hljs-string">"lint"</span>: <span class="hljs-string">"eslint --ext .js,.vue src"</span>,
<span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
},
```
</code></pre>
<h3 id="articleHeader4"><strong>build文件夹分析</strong></h3>
<h4><strong><code>build/build.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
这里包含了：
loading动画；
删除目标文件夹；
执行webpack构建；
输出信息；
webpack编译之后会输出到配置里面指定的目标文件夹；删除目标文件夹之后再创建是为了去除旧的内容，以免产生不可预测的影响。

```
'use strict'
// 检查NodeJS和npm的版本。
require('./check-versions')()

process.env.NODE_ENV = 'production'

// ora插件，实现node.js命令行环境的loading效果和显示各种状态的图标等。
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
// 用于在控制台输出带颜色字体的插件。
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// rimraf插件，每次启动编译或者打包之前，先把整个dist文件夹删除，然后再重新生成dist。
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
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
    ))
})
})
```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
这里包含了：
loading动画；
删除目标文件夹；
执行webpack构建；
输出信息；
webpack编译之后会输出到配置里面指定的目标文件夹；删除目标文件夹之后再创建是为了去除旧的内容，以免产生不可预测的影响。

```<span class="javascript"><span class="hljs-meta">
'use strict'</span>
<span class="hljs-comment">// 检查NodeJS和npm的版本。</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./check-versions'</span>)()

process.env.NODE_ENV = <span class="hljs-string">'production'</span>

<span class="hljs-comment">// ora插件，实现node.js命令行环境的loading效果和显示各种状态的图标等。</span>
<span class="hljs-keyword">const</span> ora = <span class="hljs-built_in">require</span>(<span class="hljs-string">'ora'</span>)
<span class="hljs-keyword">const</span> rm = <span class="hljs-built_in">require</span>(<span class="hljs-string">'rimraf'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-comment">// 用于在控制台输出带颜色字体的插件。</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.prod.conf'</span>)

<span class="hljs-keyword">const</span> spinner = ora(<span class="hljs-string">'building for production...'</span>)
spinner.start()

<span class="hljs-comment">// rimraf插件，每次启动编译或者打包之前，先把整个dist文件夹删除，然后再重新生成dist。</span>
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
    <span class="hljs-built_in">console</span>.log(chalk.red(<span class="hljs-string">'  Build failed with errors.\n'</span>))
    process.exit(<span class="hljs-number">1</span>)
    }

    <span class="hljs-built_in">console</span>.log(chalk.cyan(<span class="hljs-string">'  Build complete.\n'</span>))
    <span class="hljs-built_in">console</span>.log(chalk.yellow(
    <span class="hljs-string">'  Tip: built files are meant to be served over an HTTP server.\n'</span> +
    <span class="hljs-string">'  Opening index.html over file:// won\'t work.\n'</span>
    ))
})
})
</span>```
</code></pre>
<h4><strong><code>build/check-versions.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里完成对node和npm的版本检测。

```
'use strict'
// 用于在控制台输出带颜色字体的插件。
const chalk = require('chalk')
// 语义化版本检查插件。
const semver = require('semver')
// 引入package.json。
const packageConfig = require('../package.json')
const shell = require('shelljs')
// 开辟子进程执行指令cmd并返回结果。
function exec (cmd) {
return require('child_process').execSync(cmd).toString().trim()
}
// node和npm版本需求。
const versionRequirements = [
{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
}
]

if (shell.which('npm')) {
versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
})
}

module.exports = function () {
const warnings = []
// 依次判断版本是否符合要求。
for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
    warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
    )
    }
}
// 如果有警告则将其输出到控制台。
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
```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>这里完成对node和<span class="hljs-built_in">npm</span>的版本检测。

```<span class="javascript"><span class="hljs-meta">
'use strict'</span>
<span class="hljs-comment">// 用于在控制台输出带颜色字体的插件。</span>
<span class="hljs-keyword">const</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-comment">// 语义化版本检查插件。</span>
<span class="hljs-keyword">const</span> semver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'semver'</span>)
<span class="hljs-comment">// 引入package.json。</span>
<span class="hljs-keyword">const</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)
<span class="hljs-keyword">const</span> shell = <span class="hljs-built_in">require</span>(<span class="hljs-string">'shelljs'</span>)
<span class="hljs-comment">// 开辟子进程执行指令cmd并返回结果。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">exec</span> (<span class="hljs-params">cmd</span>) </span>{
<span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>).execSync(cmd).toString().trim()
}
<span class="hljs-comment">// node和npm版本需求。</span>
<span class="hljs-keyword">const</span> versionRequirements = [
{
    <span class="hljs-attr">name</span>: <span class="hljs-string">'node'</span>,
    <span class="hljs-attr">currentVersion</span>: semver.clean(process.version),
    <span class="hljs-attr">versionRequirement</span>: packageConfig.engines.node
}
]

<span class="hljs-keyword">if</span> (shell.which(<span class="hljs-string">'npm'</span>)) {
versionRequirements.push({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'npm'</span>,
    <span class="hljs-attr">currentVersion</span>: exec(<span class="hljs-string">'npm --version'</span>),
    <span class="hljs-attr">versionRequirement</span>: packageConfig.engines.npm
})
}

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-keyword">const</span> warnings = []
<span class="hljs-comment">// 依次判断版本是否符合要求。</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; versionRequirements.length; i++) {
    <span class="hljs-keyword">const</span> mod = versionRequirements[i]

    <span class="hljs-keyword">if</span> (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
    warnings.push(mod.name + <span class="hljs-string">': '</span> +
        chalk.red(mod.currentVersion) + <span class="hljs-string">' should be '</span> +
        chalk.green(mod.versionRequirement)
    )
    }
}
<span class="hljs-comment">// 如果有警告则将其输出到控制台。</span>
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
</span>```
</code></pre>
<h4><strong><code>build/utils.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里提供工具函数，包括生成处理各种样式语言的loader，获取资源文件存放路径的工具函数。
配置静态资源路径；
生成cssLoaders用于加载.vue文件中的样式；
生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>这里提供工具函数，包括生成处理各种样式语言的<span class="hljs-selector-tag">loader</span>，获取资源文件存放路径的工具函数。
配置静态资源路径；
生成<span class="hljs-selector-tag">cssLoaders</span>用于加载<span class="hljs-selector-class">.vue</span>文件中的样式；
生成<span class="hljs-selector-tag">styleLoaders</span>用于加载不在<span class="hljs-selector-class">.vue</span>文件中的单独存在的样式文件。
</code></pre>
<h4><strong><code>build/vue-loader.conf.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里负责处理.vue文件中的样式，配置css加载器以及编译css之后自动添加前缀。

```
'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
? config.build.productionSourceMap
: config.dev.cssSourceMap

module.exports = {
// css加载器。
loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
}),
cssSourceMap: sourceMapEnabled,
cacheBusting: config.dev.cacheBusting,
// 让vue-loader知道需要对video的src属性的内容转换为模块。
transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
}
}

```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>这里负责处理.vue文件中的样式，配置css加载器以及编译css之后自动添加前缀。

```<span class="javascript"><span class="hljs-meta">
'use strict'</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> isProduction = process.env.NODE_ENV === <span class="hljs-string">'production'</span>
<span class="hljs-keyword">const</span> sourceMapEnabled = isProduction
? config.build.productionSourceMap
: config.dev.cssSourceMap

<span class="hljs-built_in">module</span>.exports = {
<span class="hljs-comment">// css加载器。</span>
loaders: utils.cssLoaders({
    <span class="hljs-attr">sourceMap</span>: sourceMapEnabled,
    <span class="hljs-attr">extract</span>: isProduction
}),
<span class="hljs-attr">cssSourceMap</span>: sourceMapEnabled,
<span class="hljs-attr">cacheBusting</span>: config.dev.cacheBusting,
<span class="hljs-comment">// 让vue-loader知道需要对video的src属性的内容转换为模块。</span>
transformToRequire: {
    <span class="hljs-attr">video</span>: [<span class="hljs-string">'src'</span>, <span class="hljs-string">'poster'</span>],
    <span class="hljs-attr">source</span>: <span class="hljs-string">'src'</span>,
    <span class="hljs-attr">img</span>: <span class="hljs-string">'src'</span>,
    <span class="hljs-attr">image</span>: <span class="hljs-string">'xlink:href'</span>
}
}

</span>```
</code></pre>
<h4><strong><code>build/webpack.base.conf.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面另行配置。从代码中看到，dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）。而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里先看webpack.base.conf.js。
webpack.base.conf.js主要完成下面的操作：
配置webpack编译入口；
配置webpack输出路径和命名规则；
配置模块resolve规则；
配置不同类型模块的处理规则。

```
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
// 给出正确的绝对路径。
function resolve (dir) {
return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
test: /\.(js|vue)$/,
loader: 'eslint-loader',
enforce: 'pre',
include: [resolve('src'), resolve('test')],
options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
}
})

module.exports = {
context: path.resolve(__dirname, '../'),
entry: {
    // 配置webpack编译入口。
    app: './src/main.js'
},
// 配置webpack输出路径和命名规则。
output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式。
    filename: '[name].js',
    // webpack编译输出的发布路径。
    publicPath: process.env.NODE_ENV === 'production'
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath
},
// 配置模块resolve的规则。
resolve: {
    // 自动resolve的扩展名。
    extensions: ['.js', '.vue', '.json'],
    // 创建路径别名，有了别名之后引用模块更方便，例如：import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'。
    alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': resolve('src'),
    }
},
// 配置不同类型模块的处理规则。
module: {
    rules: [
    ...(config.dev.useEslint ? [createLintingRule()] : []),
    // 对所有.vue文件使用vue-loader
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
    },
    // 对src和test文件夹下的.js文件使用babel-loader。
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
    },
    // 对图片资源文件使用url-loader，name指明了输出的命名规则。
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
    },
    // 对媒体资源文件使用url-loader，name指明了输出的命名规则。
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
    },
    // 对字体资源文件使用url-loader，name指明了输出的命名规则。
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

```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>这里这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在<span class="hljs-built_in">module</span>.rules里面另行配置。从代码中看到，dev-server使用的webpack配置来自build/webpack.dev.conf.js文件（测试环境下使用的是build/webpack.prod.conf.js，这里暂时不考虑测试环境）。而build/webpack.dev.conf.js中又引用了webpack.base.conf.js，所以这里先看webpack.base.conf.js。
webpack.base.conf.js主要完成下面的操作：
配置webpack编译入口；
配置webpack输出路径和命名规则；
配置模块resolve规则；
配置不同类型模块的处理规则。

```<span class="javascript"><span class="hljs-meta">
'use strict'</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> vueLoaderConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./vue-loader.conf'</span>)
<span class="hljs-comment">// 给出正确的绝对路径。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resolve</span> (<span class="hljs-params">dir</span>) </span>{
<span class="hljs-keyword">return</span> path.join(__dirname, <span class="hljs-string">'..'</span>, dir)
}

<span class="hljs-keyword">const</span> createLintingRule = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
<span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(js|vue)$/</span>,
<span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>,
<span class="hljs-attr">enforce</span>: <span class="hljs-string">'pre'</span>,
<span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
<span class="hljs-attr">options</span>: {
    <span class="hljs-attr">formatter</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>),
    <span class="hljs-attr">emitWarning</span>: !config.dev.showEslintErrorsInOverlay
}
})

<span class="hljs-built_in">module</span>.exports = {
<span class="hljs-attr">context</span>: path.resolve(__dirname, <span class="hljs-string">'../'</span>),
<span class="hljs-attr">entry</span>: {
    <span class="hljs-comment">// 配置webpack编译入口。</span>
    app: <span class="hljs-string">'./src/main.js'</span>
},
<span class="hljs-comment">// 配置webpack输出路径和命名规则。</span>
output: {
    <span class="hljs-comment">// webpack输出的目标文件夹路径（例如：/dist）</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// webpack输出bundle文件命名格式。</span>
    filename: <span class="hljs-string">'[name].js'</span>,
    <span class="hljs-comment">// webpack编译输出的发布路径。</span>
    publicPath: process.env.NODE_ENV === <span class="hljs-string">'production'</span>
    ? config.build.assetsPublicPath
    : config.dev.assetsPublicPath
},
<span class="hljs-comment">// 配置模块resolve的规则。</span>
resolve: {
    <span class="hljs-comment">// 自动resolve的扩展名。</span>
    extensions: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    <span class="hljs-comment">// 创建路径别名，有了别名之后引用模块更方便，例如：import Vue from 'vue/dist/vue.esm.js'可以写成 import Vue from 'vue'。</span>
    alias: {
    <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
    <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>),
    }
},
<span class="hljs-comment">// 配置不同类型模块的处理规则。</span>
<span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>: [
    ...(config.dev.useEslint ? [createLintingRule()] : []),
    <span class="hljs-comment">// 对所有.vue文件使用vue-loader</span>
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        <span class="hljs-attr">options</span>: vueLoaderConfig
    },
    <span class="hljs-comment">// 对src和test文件夹下的.js文件使用babel-loader。</span>
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">include</span>: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>), resolve(<span class="hljs-string">'node_modules/webpack-dev-server/client'</span>)]
    },
    <span class="hljs-comment">// 对图片资源文件使用url-loader，name指明了输出的命名规则。</span>
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpe?g|gif|svg)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
        <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'img/[name].[hash:7].[ext]'</span>)
        }
    },
    <span class="hljs-comment">// 对媒体资源文件使用url-loader，name指明了输出的命名规则。</span>
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">limit</span>: <span class="hljs-number">10000</span>,
        <span class="hljs-attr">name</span>: utils.assetsPath(<span class="hljs-string">'media/[name].[hash:7].[ext]'</span>)
        }
    },
    <span class="hljs-comment">// 对字体资源文件使用url-loader，name指明了输出的命名规则。</span>
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
<span class="hljs-attr">node</span>: {
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

</span>```
</code></pre>
<h4><strong><code>build/webpack.dev.conf.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里面在webpack.base.conf的基础上增加完善了开发环境下面的配置，主要完成下面操作：
将webpack的热重载客户端代码添加到每个entry对应的应用；
合并基础的webpack配置；
配置样式文件的处理规则，styleLoaders；
配置Source Maps；
配置webpack插件。

```
'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
// 一个可以合并数组和对象的插件。
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件。
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 用于更友好地输出webpack的警告、错误等信息。
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT &amp;&amp; Number(process.env.PORT)
// 合并基础的webpack配置。
const devWebpackConfig = merge(baseWebpackConfig, {
module: {
    // 配置样式文件的处理规则，使用styleLoaders。
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
},

// 配置Source Maps。在开发中使用cheap-module-eval-source-map更快
devtool: config.dev.devtool。

devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
    rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    // dev-server 监听的端口，默认为config.dev.port设置的端口，即8080。
    port: PORT || config.dev.port,
    // 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false。
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
    ? { warnings: false, errors: true }
    : false,
    publicPath: config.dev.assetsPublicPath,
    // 定义 HTTP 代理表，代理到 API 服务器。
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
    poll: config.dev.poll,
    }
},
// 配置webpack插件。
plugins: [
    new webpack.DefinePlugin({
    'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    // 页面中的报错不会阻塞，但是会在编译结束后报错。
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
    }
    ])
]
})

module.exports = new Promise((resolve, reject) => {
portfinder.basePort = process.env.PORT || config.dev.port
portfinder.getPort((err, port) => {
    if (err) {
    reject(err)
    } else {
    process.env.PORT = port
    devWebpackConfig.devServer.port = port

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

```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>这里面在webpack.base.conf的基础上增加完善了开发环境下面的配置，主要完成下面操作：
将webpack的热重载客户端代码添加到每个entry对应的应用；
合并基础的webpack配置；
配置样式文件的处理规则，styleLoaders；
配置Source Maps；
配置webpack插件。

```<span class="javascript"><span class="hljs-meta">
'use strict'</span>
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-comment">// 一个可以合并数组和对象的插件。</span>
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-comment">// 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件。</span>
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">// 用于更友好地输出webpack的警告、错误等信息。</span>
<span class="hljs-keyword">const</span> FriendlyErrorsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'friendly-errors-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> portfinder = <span class="hljs-built_in">require</span>(<span class="hljs-string">'portfinder'</span>)

<span class="hljs-keyword">const</span> HOST = process.env.HOST
<span class="hljs-keyword">const</span> PORT = process.env.PORT &amp;&amp; <span class="hljs-built_in">Number</span>(process.env.PORT)
<span class="hljs-comment">// 合并基础的webpack配置。</span>
<span class="hljs-keyword">const</span> devWebpackConfig = merge(baseWebpackConfig, {
<span class="hljs-attr">module</span>: {
    <span class="hljs-comment">// 配置样式文件的处理规则，使用styleLoaders。</span>
    rules: utils.styleLoaders({ <span class="hljs-attr">sourceMap</span>: config.dev.cssSourceMap, <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span> })
},

<span class="hljs-comment">// 配置Source Maps。在开发中使用cheap-module-eval-source-map更快</span>
devtool: config.dev.devtool。

devServer: {
    <span class="hljs-attr">clientLogLevel</span>: <span class="hljs-string">'warning'</span>,
    <span class="hljs-attr">historyApiFallback</span>: {
    <span class="hljs-attr">rewrites</span>: [
        { <span class="hljs-attr">from</span>: <span class="hljs-regexp">/.*/</span>, <span class="hljs-attr">to</span>: path.posix.join(config.dev.assetsPublicPath, <span class="hljs-string">'index.html'</span>) },
    ],
    },
    <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">contentBase</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">compress</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">host</span>: HOST || config.dev.host,
    <span class="hljs-comment">// dev-server 监听的端口，默认为config.dev.port设置的端口，即8080。</span>
    port: PORT || config.dev.port,
    <span class="hljs-comment">// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false。</span>
    open: config.dev.autoOpenBrowser,
    <span class="hljs-attr">overlay</span>: config.dev.errorOverlay
    ? { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">errors</span>: <span class="hljs-literal">true</span> }
    : <span class="hljs-literal">false</span>,
    <span class="hljs-attr">publicPath</span>: config.dev.assetsPublicPath,
    <span class="hljs-comment">// 定义 HTTP 代理表，代理到 API 服务器。</span>
    proxy: config.dev.proxyTable,
    <span class="hljs-attr">quiet</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// necessary for FriendlyErrorsPlugin</span>
    watchOptions: {
    <span class="hljs-attr">poll</span>: config.dev.poll,
    }
},
<span class="hljs-comment">// 配置webpack插件。</span>
plugins: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-string">'process.env'</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/dev.env'</span>)
    }),
    <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin(),
    <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(), <span class="hljs-comment">// HMR shows correct file names in console on update.</span>
    <span class="hljs-comment">// 页面中的报错不会阻塞，但是会在编译结束后报错。</span>
    <span class="hljs-keyword">new</span> webpack.NoEmitOnErrorsPlugin(),
    <span class="hljs-comment">// https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.html'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
    {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-attr">to</span>: config.dev.assetsSubDirectory,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]
    }
    ])
]
})

<span class="hljs-built_in">module</span>.exports = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
portfinder.basePort = process.env.PORT || config.dev.port
portfinder.getPort(<span class="hljs-function">(<span class="hljs-params">err, port</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
    reject(err)
    } <span class="hljs-keyword">else</span> {
    process.env.PORT = port
    devWebpackConfig.devServer.port = port

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

</span>```
</code></pre>
<h4><strong><code>build/webpack.prod.conf.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="这里是构建的时候用到的webpack配置来自webpack.prod.conf.js，该配置同样是在webpack.base.conf基础上的进一步完善。主要完成下面操作：
合并基础的webpack配置；
配置样式文件的处理规则，styleLoaders；
配置webpack的输出；
配置webpack插件；
gzip模式下的webpack插件配置；
webpack-bundle分析。

```
'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 用于从webpack生成的bundle中提取文本到特定文件中的插件，可以抽取出css，js文件将其与webpack输出的bundle分离。
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const env = require('../config/prod.env')
// 合并基础的webpack配置。
const webpackConfig = merge(baseWebpackConfig, {
module: {
    rules: utils.styleLoaders({
    sourceMap: config.build.productionSourceMap,
    extract: true,
    usePostCSS: true
    })
},
devtool: config.build.productionSourceMap ? config.build.devtool : false,
// 配置webpack的输出。
output: {
    // 编译输出目录。
    path: config.build.assetsRoot,
    // 编译输出文件名格式。
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    // 没有指定输出名的文件输出的文件名格式。
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
},
// 配置webpack插件。
plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
    'process.env': env
    }),
    // 丑化压缩代码
    new UglifyJsPlugin({
    uglifyOptions: {
        compress: {
        warnings: false
        }
    },
    sourceMap: config.build.productionSourceMap,
    parallel: true
    }),
    // 抽离css文件。
    new ExtractTextPlugin({
    filename: utils.assetsPath('css/[name].[contenthash].css'),
    // Setting the following option to `false` will not extract CSS from codesplit chunks.
    // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
    // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
    // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
    allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
    cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
    filename: config.build.index,
    template: 'index.html',
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
        module.resource &amp;&amp;
        /\.js$/.test(module.resource) &amp;&amp;
        module.resource.indexOf(
            path.join(__dirname, '../node_modules')
        ) === 0
        )
    }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
    name: 'app',
    async: 'vendor-async',
    children: true,
    minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
    }
    ])
]
})
// gzip模式下需要引入compression插件进行压缩。
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

```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>这里是构建的时候用到的webpack配置来自webpack.prod.conf.js，该配置同样是在webpack.base.conf基础上的进一步完善。主要完成下面操作：
合并基础的webpack配置；
配置样式文件的处理规则，styleLoaders；
配置webpack的输出；
配置webpack插件；
gzip模式下的webpack插件配置；
webpack-bundle分析。

```<span class="javascript"><span class="hljs-meta">
'use strict'</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>)
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config'</span>)
<span class="hljs-keyword">const</span> merge = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-keyword">const</span> baseWebpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.conf'</span>)
<span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>)
<span class="hljs-comment">// 用于从webpack生成的bundle中提取文本到特定文件中的插件，可以抽取出css，js文件将其与webpack输出的bundle分离。</span>
<span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> OptimizeCSSPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'optimize-css-assets-webpack-plugin'</span>)
<span class="hljs-keyword">const</span> UglifyJsPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>)

<span class="hljs-keyword">const</span> env = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/prod.env'</span>)
<span class="hljs-comment">// 合并基础的webpack配置。</span>
<span class="hljs-keyword">const</span> webpackConfig = merge(baseWebpackConfig, {
<span class="hljs-attr">module</span>: {
    <span class="hljs-attr">rules</span>: utils.styleLoaders({
    <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
    <span class="hljs-attr">extract</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">usePostCSS</span>: <span class="hljs-literal">true</span>
    })
},
<span class="hljs-attr">devtool</span>: config.build.productionSourceMap ? config.build.devtool : <span class="hljs-literal">false</span>,
<span class="hljs-comment">// 配置webpack的输出。</span>
output: {
    <span class="hljs-comment">// 编译输出目录。</span>
    path: config.build.assetsRoot,
    <span class="hljs-comment">// 编译输出文件名格式。</span>
    filename: utils.assetsPath(<span class="hljs-string">'js/[name].[chunkhash].js'</span>),
    <span class="hljs-comment">// 没有指定输出名的文件输出的文件名格式。</span>
    chunkFilename: utils.assetsPath(<span class="hljs-string">'js/[id].[chunkhash].js'</span>)
},
<span class="hljs-comment">// 配置webpack插件。</span>
plugins: [
    <span class="hljs-comment">// http://vuejs.github.io/vue-loader/en/workflow/production.html</span>
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
    <span class="hljs-string">'process.env'</span>: env
    }),
    <span class="hljs-comment">// 丑化压缩代码</span>
    <span class="hljs-keyword">new</span> UglifyJsPlugin({
    <span class="hljs-attr">uglifyOptions</span>: {
        <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>
        }
    },
    <span class="hljs-attr">sourceMap</span>: config.build.productionSourceMap,
    <span class="hljs-attr">parallel</span>: <span class="hljs-literal">true</span>
    }),
    <span class="hljs-comment">// 抽离css文件。</span>
    <span class="hljs-keyword">new</span> ExtractTextPlugin({
    <span class="hljs-attr">filename</span>: utils.assetsPath(<span class="hljs-string">'css/[name].[contenthash].css'</span>),
    <span class="hljs-comment">// Setting the following option to `false` will not extract CSS from codesplit chunks.</span>
    <span class="hljs-comment">// Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.</span>
    <span class="hljs-comment">// It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, </span>
    <span class="hljs-comment">// increasing file size: https://github.com/vuejs-templates/webpack/issues/1110</span>
    allChunks: <span class="hljs-literal">true</span>,
    }),
    <span class="hljs-comment">// Compress extracted CSS. We are using this plugin so that possible</span>
    <span class="hljs-comment">// duplicated CSS from different components can be deduped.</span>
    <span class="hljs-keyword">new</span> OptimizeCSSPlugin({
    <span class="hljs-attr">cssProcessorOptions</span>: config.build.productionSourceMap
        ? { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">map</span>: { <span class="hljs-attr">inline</span>: <span class="hljs-literal">false</span> } }
        : { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span> }
    }),
    <span class="hljs-comment">// generate dist index.html with correct asset hash for caching.</span>
    <span class="hljs-comment">// you can customize output by editing /index.html</span>
    <span class="hljs-comment">// see https://github.com/ampedandwired/html-webpack-plugin</span>
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
    <span class="hljs-attr">filename</span>: config.build.index,
    <span class="hljs-attr">template</span>: <span class="hljs-string">'index.html'</span>,
    <span class="hljs-attr">inject</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">minify</span>: {
        <span class="hljs-attr">removeComments</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">collapseWhitespace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">removeAttributeQuotes</span>: <span class="hljs-literal">true</span>
        <span class="hljs-comment">// more options:</span>
        <span class="hljs-comment">// https://github.com/kangax/html-minifier#options-quick-reference</span>
    },
    <span class="hljs-comment">// necessary to consistently work with multiple chunks via CommonsChunkPlugin</span>
    chunksSortMode: <span class="hljs-string">'dependency'</span>
    }),
    <span class="hljs-comment">// keep module.id stable when vendor modules does not change</span>
    <span class="hljs-keyword">new</span> webpack.HashedModuleIdsPlugin(),
    <span class="hljs-comment">// enable scope hoisting</span>
    <span class="hljs-keyword">new</span> webpack.optimize.ModuleConcatenationPlugin(),
    <span class="hljs-comment">// split vendor js into its own file</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'vendor'</span>,
    minChunks (<span class="hljs-built_in">module</span>) {
        <span class="hljs-comment">// any required modules inside node_modules are extracted to vendor</span>
        <span class="hljs-keyword">return</span> (
        <span class="hljs-built_in">module</span>.resource &amp;&amp;
        <span class="hljs-regexp">/\.js$/</span>.test(<span class="hljs-built_in">module</span>.resource) &amp;&amp;
        <span class="hljs-built_in">module</span>.resource.indexOf(
            path.join(__dirname, <span class="hljs-string">'../node_modules'</span>)
        ) === <span class="hljs-number">0</span>
        )
    }
    }),
    <span class="hljs-comment">// extract webpack runtime and module manifest to its own file in order to</span>
    <span class="hljs-comment">// prevent vendor hash from being updated whenever app bundle is updated</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-literal">Infinity</span>
    }),
    <span class="hljs-comment">// This instance extracts shared chunks from code splitted chunks and bundles them</span>
    <span class="hljs-comment">// in a separate chunk, similar to the vendor chunk</span>
    <span class="hljs-comment">// see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
    <span class="hljs-attr">async</span>: <span class="hljs-string">'vendor-async'</span>,
    <span class="hljs-attr">children</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">minChunks</span>: <span class="hljs-number">3</span>
    }),

    <span class="hljs-comment">// copy custom static assets</span>
    <span class="hljs-keyword">new</span> CopyWebpackPlugin([
    {
        <span class="hljs-attr">from</span>: path.resolve(__dirname, <span class="hljs-string">'../static'</span>),
        <span class="hljs-attr">to</span>: config.build.assetsSubDirectory,
        <span class="hljs-attr">ignore</span>: [<span class="hljs-string">'.*'</span>]
    }
    ])
]
})
<span class="hljs-comment">// gzip模式下需要引入compression插件进行压缩。</span>
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

</span>```
</code></pre>
<h4><strong><code>build/dev-server.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="检查node和npm的版本、引入相关插件和配置
webpack对源码进行编译打包并返回compiler对象
创建express服务器
配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
挂载代理服务和中间件
配置静态资源
启动服务器监听特定端口（8080）
自动打开浏览器并打开特定网址（localhost:8080）
说明： express服务器提供静态文件服务，不过它还使用了http-proxy-middleware，一个http请求代理的中间件。前端开发过程中需要使用到后台的API的话，可以通过配置proxyTable来将相应的后台请求代理到专用的API服务器。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>检查<span class="hljs-keyword">node</span><span class="hljs-title">和npm</span>的版本、引入相关插件和配置
webpack对源码进行编译打包并返回compiler对象
创建express服务器
配置开发中间件（webpack-dev-middleware）和热重载中间件（webpack-hot-middleware）
挂载代理服务和中间件
配置静态资源
启动服务器监听特定端口（<span class="hljs-number">8080</span>）
自动打开浏览器并打开特定网址（localhost:<span class="hljs-number">8080</span>）
说明： express服务器提供静态文件服务，不过它还使用了http-proxy-middleware，一个http请求代理的中间件。前端开发过程中需要使用到后台的API的话，可以通过配置proxyTable来将相应的后台请求代理到专用的API服务器。
</code></pre>
<h4><strong><code>build/dev-client.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
dev-client.js里面主要写了浏览器端代码，用于实现webpack的热更新（实现浏览器端的EventSource，用于跟服务器双向通信webpack热重载客户端跟dev-server上的热重载插件之间需要进行双向通信, 服务端webpack重新编译后，会向客户端推送信息，告诉客户端进行更新）。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>
dev-<span class="hljs-keyword">client</span>.js里面主要写了浏览器端代码，用于实现webpack的热更新（实现浏览器端的EventSource，用于跟服务器双向通信webpack热重载客户端跟dev-<span class="hljs-keyword">server</span>上的热重载插件之间需要进行双向通信, 服务端webpack重新编译后，会向客户端推送信息，告诉客户端进行更新）。
</code></pre>
<h3 id="articleHeader5"><strong>config文件夹分析</strong></h3>
<h4><strong><code>config/dev.env.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
设置了开发环境变量。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>
设置了开发环境变量。
</code></pre>
<h4><strong><code>config/prod.env.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="设置了生产环境变量。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>设置了生产环境变量。
</code></pre>
<h4><strong><code>config/index.js</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
描述了开发和构建两种环境下的配置，前面的build文件夹下也有不少文件引用了index.js里面的配置。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs n1ql"><code>
描述了开发和构建两种环境下的配置，前面的<span class="hljs-keyword">build</span>文件夹下也有不少文件引用了<span class="hljs-keyword">index</span>.js里面的配置。</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require(‘path‘)
module.exports = {
  // 构建产品时使用的配置
  build: {
    // 环境变量
    env: require(‘./prod.env‘),
    // html入口文件
    index: path.resolve(__dirname, ‘../dist/index.html‘),
    // 产品文件的存放路径
    assetsRoot: path.resolve(__dirname, ‘../dist‘),
    // 二级目录，存放静态资源文件的目录，位于dist文件夹下
    assetsSubDirectory: ‘static‘,
    // 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置
    // 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径
    assetsPublicPath: ‘/‘,
    // 是否使用source-map
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 是否开启gzip压缩
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩
    productionGzipExtensions: [‘js‘, ‘css‘],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 是否展示webpack构建打包之后的分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 开发过程中使用的配置
  dev: {
    // 环境变量
    env: require(‘./dev.env‘),
    // dev-server监听的端口
    port: 8080,
    // 是否自动打开浏览器
    autoOpenBrowser: true,
    // 静态资源文件夹
    assetsSubDirectory: ‘static‘,
    // 发布路径
    assetsPublicPath: ‘/‘,
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将‘localhost:8080/api/xxx‘代理到‘www.example.com/api/xxx‘
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are &quot;buggy&quot;
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 是否开启 cssSourceMap
    cssSourceMap: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>var path = require(‘path‘)
module.exports = {
  <span class="hljs-comment">// 构建产品时使用的配置</span>
<span class="hljs-symbol">  build:</span> {
    <span class="hljs-comment">// 环境变量</span>
<span class="hljs-symbol">    env:</span> require(‘./prod.env‘),
    <span class="hljs-comment">// html入口文件</span>
<span class="hljs-symbol">    index:</span> path.resolve(__dirname, ‘..<span class="hljs-meta-keyword">/dist/</span>index.html‘),
    <span class="hljs-comment">// 产品文件的存放路径</span>
<span class="hljs-symbol">    assetsRoot:</span> path.resolve(__dirname, ‘../dist‘),
    <span class="hljs-comment">// 二级目录，存放静态资源文件的目录，位于dist文件夹下</span>
<span class="hljs-symbol">    assetsSubDirectory:</span> ‘static‘,
    <span class="hljs-comment">// 发布路径，如果构建后的产品文件有用于发布CDN或者放到其他域名的服务器，可以在这里进行设置</span>
    <span class="hljs-comment">// 设置之后构建的产品文件在注入到index.html中的时候就会带上这里的发布路径</span>
<span class="hljs-symbol">    assetsPublicPath:</span> ‘/‘,
    <span class="hljs-comment">// 是否使用source-map</span>
<span class="hljs-symbol">    productionSourceMap:</span> true,
    <span class="hljs-comment">// Gzip off by default as many popular static hosts such as</span>
    <span class="hljs-comment">// Surge or Netlify already gzip all static assets for you.</span>
    <span class="hljs-comment">// Before setting to `true`, make sure to:</span>
    <span class="hljs-comment">// npm install --save-dev compression-webpack-plugin</span>
    <span class="hljs-comment">// 是否开启gzip压缩</span>
<span class="hljs-symbol">    productionGzip:</span> false,
    <span class="hljs-comment">// gzip模式下需要压缩的文件的扩展名，设置js、css之后就只会对js和css文件进行压缩</span>
<span class="hljs-symbol">    productionGzipExtensions:</span> [‘js‘, ‘css‘],
    <span class="hljs-comment">// Run the build command with an extra argument to</span>
    <span class="hljs-comment">// View the bundle analyzer report after build finishes:</span>
    <span class="hljs-comment">// `npm run build --report`</span>
    <span class="hljs-comment">// Set to `true` or `false` to always turn it on or off</span>
    <span class="hljs-comment">// 是否展示webpack构建打包之后的分析报告</span>
<span class="hljs-symbol">    bundleAnalyzerReport:</span> process.env.npm_config_report
  },
  <span class="hljs-comment">// 开发过程中使用的配置</span>
<span class="hljs-symbol">  dev:</span> {
    <span class="hljs-comment">// 环境变量</span>
<span class="hljs-symbol">    env:</span> require(‘./dev.env‘),
    <span class="hljs-comment">// dev-server监听的端口</span>
<span class="hljs-symbol">    port:</span> <span class="hljs-number">8080</span>,
    <span class="hljs-comment">// 是否自动打开浏览器</span>
<span class="hljs-symbol">    autoOpenBrowser:</span> true,
    <span class="hljs-comment">// 静态资源文件夹</span>
<span class="hljs-symbol">    assetsSubDirectory:</span> ‘static‘,
    <span class="hljs-comment">// 发布路径</span>
<span class="hljs-symbol">    assetsPublicPath:</span> ‘/‘,
    <span class="hljs-comment">// 代理配置表，在这里可以配置特定的请求代理到对应的API接口</span>
    <span class="hljs-comment">// 例如将‘localhost:8080/api/xxx‘代理到‘www.example.com/api/xxx‘</span>
<span class="hljs-symbol">    proxyTable:</span> {},
    <span class="hljs-comment">// CSS Sourcemaps off by default because relative paths are "buggy"</span>
    <span class="hljs-comment">// with this option, according to the CSS-Loader README</span>
    <span class="hljs-comment">// (https://github.com/webpack/css-loader#sourcemaps)</span>
    <span class="hljs-comment">// In our experience, they generally work as expected,</span>
    <span class="hljs-comment">// just be aware of this issue when enabling this option.</span>
    <span class="hljs-comment">// 是否开启 cssSourceMap</span>
<span class="hljs-symbol">    cssSourceMap:</span> false
  }
}</code></pre>
<h2 id="articleHeader6"><strong>总结</strong></h2>
<p>本文主要介绍了vue-cli脚手架工具构建出项目结构目录文件的相关描述信息，仅作了解使用，自身先有个印象，有助于后续运行项目发生问题较好排查些。</p>
<p><span class="img-wrap"><img data-src="/img/bV7KlN?w=570&amp;h=782" src="https://static.alili.tech/img/bV7KlN?w=570&amp;h=782" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Spring Boot+Vue从零开始搭建系统（二）：项目前端_Vuejs目录结构描述

## 原文链接
[https://segmentfault.com/a/1190000014200466](https://segmentfault.com/a/1190000014200466)


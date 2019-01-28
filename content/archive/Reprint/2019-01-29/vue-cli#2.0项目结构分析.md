---
title: 'vue-cli#2.0项目结构分析' 
date: 2019-01-29 2:30:10
hidden: true
slug: z14tf17g8w
categories: [reprint]
---

{{< raw >}}

                    
<p>接触过vue的同学应该都知道，用vue-cli开发vue的项目十分方便，它可以帮你快速构建一个具有强大构建能力的Vue.js项目。今天不谈什么是vue-cli，而是来说说用vue-cli构建的项目结构是什么样的并分析部分文件。这里以我之前写的一个小项目为参考，项目是用vue-cli的webpack模板构建的，项目地址：<a href="https://github.com/hieeyh/tong2-family" rel="nofollow noreferrer" target="_blank">https://github.com/hieeyh/tong2-family</a>。</p>
<h1 id="articleHeader0">项目结构</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
|-- build                            // 项目构建(webpack)相关代码
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
|   |-- components                     // vue公共组件
|   |-- store                          // vuex的状态管理
|   |-- App.vue                        // 页面入口文件
|   |-- main.js                        // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|   |-- data                           // 群聊分析得到的数据用于数据可视化
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- README.md                        // 项目说明
|-- favicon.ico 
|-- index.html                       // 入口页面
|-- package.json                     // 项目基本信息
." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>.
|<span class="hljs-string">-- build                            // 项目构建(webpack)相关代码
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
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- components                     // vue公共组件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- store                          // vuex的状态管理
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- App.vue                        // 页面入口文件
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- main.js                        // 程序入口文件，加载各种公共组件
</span>|<span class="hljs-string">-- static                           // 静态文件，比如一些图片，json数据等
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">-- data                           // 群聊分析得到的数据用于数据可视化
</span>|<span class="hljs-string">-- .babelrc                         // ES6语法编译配置
</span>|<span class="hljs-string">-- .editorconfig                    // 定义代码格式
</span>|<span class="hljs-string">-- .gitignore                       // git上传需要忽略的文件格式
</span>|<span class="hljs-string">-- README.md                        // 项目说明
</span>|<span class="hljs-string">-- favicon.ico 
</span>|<span class="hljs-string">-- index.html                       // 入口页面
</span>|<span class="hljs-string">-- package.json                     // 项目基本信息
.</span></code></pre>
<h1 id="articleHeader1">package.json</h1>
<p>package.json文件是项目根目录下的一个文件，定义该项目开发所需要的各种模块以及一些项目配置信息（如项目名称、版本、描述、作者等）。</p>
<h2 id="articleHeader2">scripts字段</h2>
<p>package.json文件里有一个scripts字段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;node build/dev-server.js&quot;,
    &quot;build&quot;: &quot;node build/build.js&quot;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"node build/dev-server.js"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"node build/build.js"</span>
  }</code></pre>
<p>在开发环境下，在命令行中运行<code>npm run dev</code>就相当于在执行<code>node build/dev-server.js</code>。所以script字段是用来指定npm相关命令的缩写的。</p>
<h2 id="articleHeader3">dependencies字段和devDependencies字段</h2>
<p>dependencies字段指定了项目运行时所依赖的模块，devDependencies字段指定了项目开发时所依赖的模块。在命令行中运行npm install命令，会自动安装dependencies和devDependencies字段中的模块。     <br>package.json还有很多配置相关项，想进一步了解package.json的可参考：<a href="https://docs.npmjs.com/files/package.json" rel="nofollow noreferrer" target="_blank">https://docs.npmjs.com/files/package.json</a></p>
<h1 id="articleHeader4">webpack配置相关</h1>
<p>上面说到在命令行中<code>npm run dev</code>就相当于在执行<code>node build/dev-server.js</code>，想必dev-server.js这个文件是十分重要的，它是在开发环境下构建时第一个要运行的文件。掘金上已经有一篇对vue-cli#2.0 webpack配置的分析文章，里面详细讲解了webpack相关配置文件的每行代码的意思，我只做一些补充。链接在此（一定要自习阅读，收获会很大）：<a href="https://gold.xitu.io/post/584e48b2ac502e006c74a120" rel="nofollow noreferrer" target="_blank">https://gold.xitu.io/post/584e48b2ac502e006c74a120</a>。</p>
<h2 id="articleHeader5">dev-server.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
...
// http-proxy可以实现转发所有请求代理到后端真实API地址，以实现前后端开发完全分离
// 在config/index.js中可以对proxyTable想进行配置
var proxyMiddleware = require('http-proxy-middleware')
...
...
// 热加载要使用webpack-dev-middleware在没有webpack-dev-server的时候进行热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler)
// 当html-webpack-plugin模板改变是强制进行页面重新加载
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
...
<span class="hljs-comment">// http-proxy可以实现转发所有请求代理到后端真实API地址，以实现前后端开发完全分离</span>
<span class="hljs-comment">// 在config/index.js中可以对proxyTable想进行配置</span>
<span class="hljs-keyword">var</span> proxyMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>)
...
...
<span class="hljs-comment">// 热加载要使用webpack-dev-middleware在没有webpack-dev-server的时候进行热加载</span>
<span class="hljs-keyword">var</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack-hot-middleware'</span>)(compiler)
<span class="hljs-comment">// 当html-webpack-plugin模板改变是强制进行页面重新加载</span>
compiler.plugin(<span class="hljs-string">'compilation'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">compilation</span>) </span>{
  compilation.plugin(<span class="hljs-string">'html-webpack-plugin-after-emit'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data, cb</span>) </span>{
    hotMiddleware.publish({ <span class="hljs-attr">action</span>: <span class="hljs-string">'reload'</span> })
    cb()
  })
})</code></pre>
<h2 id="articleHeader6">webpack.base.conf.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
...
module.export = {
    // 编译入口文件
    entry: {},
    // 编译输出路径
    output: {},
    // 一些解决方案配置
    resolve: {},
    resolveLoader: {},
    module: {
        // 各种不同类型文件加载器配置
        loaders: {
        ...
        ...
        // js文件用babel转码
        {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            // 哪些文件不需要转码
            exclude: /node_modules/
        },
        ...
        ...
        }
    },
    // vue文件一些相关配置
    vue: {}
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...
...
module.export = {
    <span class="hljs-comment">// 编译入口文件</span>
    entry: {},
    <span class="hljs-comment">// 编译输出路径</span>
    output: {},
    <span class="hljs-comment">// 一些解决方案配置</span>
    resolve: {},
    <span class="hljs-attr">resolveLoader</span>: {},
    <span class="hljs-attr">module</span>: {
        <span class="hljs-comment">// 各种不同类型文件加载器配置</span>
        loaders: {
        ...
        ...
        <span class="hljs-comment">// js文件用babel转码</span>
        {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
            <span class="hljs-attr">include</span>: projectRoot,
            <span class="hljs-comment">// 哪些文件不需要转码</span>
            exclude: <span class="hljs-regexp">/node_modules/</span>
        },
        ...
        ...
        }
    },
    <span class="hljs-comment">// vue文件一些相关配置</span>
    vue: {}
} </code></pre>
<h2 id="articleHeader7">check-version.js</h2>
<p>这个文件主要是用来检测当前环境中的node和npm版本和我们需要的是否一致的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 加载语义化版本测试库
var semver = require('semver')
// 定制控制台日志的输入样式
var chalk = require('chalk')
// 引入package.json文件
var packageConfig = require('../package.json')
var exec = function (cmd) {
  return require('child_process')
    .execSync(cmd).toString().trim()
}
// 定义node和npm版本需求所组成的数组
var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
  {
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  }
]
module.exports = function () {
  var warnings = []
  // 依次判断版本是否符合要求
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 加载语义化版本测试库</span>
<span class="hljs-keyword">var</span> semver = <span class="hljs-built_in">require</span>(<span class="hljs-string">'semver'</span>)
<span class="hljs-comment">// 定制控制台日志的输入样式</span>
<span class="hljs-keyword">var</span> chalk = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chalk'</span>)
<span class="hljs-comment">// 引入package.json文件</span>
<span class="hljs-keyword">var</span> packageConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>)
<span class="hljs-keyword">var</span> exec = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cmd</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'child_process'</span>)
    .execSync(cmd).toString().trim()
}
<span class="hljs-comment">// 定义node和npm版本需求所组成的数组</span>
<span class="hljs-keyword">var</span> versionRequirements = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'node'</span>,
    <span class="hljs-attr">currentVersion</span>: semver.clean(process.version),
    <span class="hljs-attr">versionRequirement</span>: packageConfig.engines.node
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'npm'</span>,
    <span class="hljs-attr">currentVersion</span>: exec(<span class="hljs-string">'npm --version'</span>),
    <span class="hljs-attr">versionRequirement</span>: packageConfig.engines.npm
  }
]
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> warnings = []
  <span class="hljs-comment">// 依次判断版本是否符合要求</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; versionRequirements.length; i++) {
    <span class="hljs-keyword">var</span> mod = versionRequirements[i]
    <span class="hljs-keyword">if</span> (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + <span class="hljs-string">': '</span> +
        chalk.red(mod.currentVersion) + <span class="hljs-string">' should be '</span> +
        chalk.green(mod.versionRequirement)
      )
    }
  }
  ...
}</code></pre>
<p>想把webpack完全搞懂还是需要费很大功夫的，我感觉自己也只是入了一个门而已，要想深入了解webpack还是要去官网看说明文档。</p>
<ol>
<li><p><a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">http://webpack.github.io/docs/</a></p></li>
<li><p><a href="https://webpack.js.org/configuration/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/configuration/</a></p></li>
</ol>
<h1 id="articleHeader8">.babelrc</h1>
<p>Babel解释器的配置文件，存放在根目录下。Babel是一个转码器，项目里需要用它将ES6代码转为ES5代码。这里有一篇阮一峰老师写的相关文章供参考：<a href="http://www.ruanyifeng.com/blog/2016/01/babel.html" rel="nofollow noreferrer" target="_blank">Babel 入门教程</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 设定转码规则
  &quot;presets&quot;: [&quot;es2015&quot;, &quot;stage-2&quot;],
  // 转码的一些插件
  &quot;plugins&quot;: [&quot;transform-runtime&quot;],
  &quot;comments&quot;: false " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// 设定转码规则</span>
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>, <span class="hljs-string">"stage-2"</span>],
  <span class="hljs-comment">// 转码的一些插件</span>
  <span class="hljs-string">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>],
  <span class="hljs-string">"comments"</span>: <span class="hljs-literal">false</span> </code></pre>
<h1 id="articleHeader9">.editorconfig</h1>
<p>该文件定义项目的编码规范，编辑器的行为会与.editorconfig 文件中定义的一致，并且其优先级比编辑器自身的设置要高，这在多人合作开发项目时十分有用而且必要。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="root = true

[*]    // 对所有文件应用下面的规则
charset = utf-8                    // 编码规则用utf-8
indent_style = space               // 缩进用空格
indent_size = 2                    // 缩进数量为2个空格
end_of_line = lf                   // 换行符格式
insert_final_newline = true        // 是否在文件的最后插入一个空行
trim_trailing_whitespace = true    // 是否删除行尾的空格" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>root = <span class="hljs-literal">true</span>

[*]    <span class="hljs-comment">// 对所有文件应用下面的规则</span>
charset = utf<span class="hljs-number">-8</span>                    <span class="hljs-comment">// 编码规则用utf-8</span>
indent_style = space               <span class="hljs-comment">// 缩进用空格</span>
indent_size = <span class="hljs-number">2</span>                    <span class="hljs-comment">// 缩进数量为2个空格</span>
end_of_line = lf                   <span class="hljs-comment">// 换行符格式</span>
insert_final_new<span class="hljs-type">line</span> = <span class="hljs-literal">true</span>        <span class="hljs-comment">// 是否在文件的最后插入一个空行</span>
trim_trailing_whitespace = <span class="hljs-literal">true</span>    <span class="hljs-comment">// 是否删除行尾的空格</span></code></pre>
<p>了解更多请参考官方配置文档<a href="http://editorconfig.org/" rel="nofollow noreferrer" target="_blank">http://editorconfig.org/</a></p>
<p>接触vue并不久，很多东西也不是特别清楚，文章里有什么问题欢迎指出。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli#2.0项目结构分析

## 原文链接
[https://segmentfault.com/a/1190000007880723](https://segmentfault.com/a/1190000007880723)


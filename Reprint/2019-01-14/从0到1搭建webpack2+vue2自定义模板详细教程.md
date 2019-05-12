---
title: '从0到1搭建webpack2+vue2自定义模板详细教程' 
date: 2019-01-14 2:30:07
hidden: true
slug: l6l4d7r31jc
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>webpack2和vue2已经不是新鲜东西了，满大街的文章在讲解webpack和vue，但是很多内容写的不是很详细，对于很多个性化配置还是需要自己过一遍文档。Vue官方提供了多个<a href="https://github.com/vuejs-templates" rel="nofollow noreferrer" target="_blank">vue-templates</a>，基于vue-cli用官方的<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">webpack</a>模板居多，不过对于很多人来说，官方的webpack模板的配置还是过于复杂，对于我们了解细节实现不是很好，所以想自己从零开始搭建一个模板工程，也顺便重新认识一下webpack和vue工程化的细节。</p>
<h2 id="articleHeader1">webpack 核心概念</h2>
<blockquote><p>Webpack 是当下最热门的前端资源模块化管理和打包工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009454175?w=1059&amp;h=453" src="https://static.alili.tech/img/remote/1460000009454175?w=1059&amp;h=453" alt="" title="" style="cursor: pointer;"></span></p>
<p>官方网站：<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/</a></p>
<h3 id="articleHeader2">安装</h3>
<p>在开始前，先要确认你已经安装<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">Node.js</a>的最新版本。使用 Node.js 最新的 LTS 版本，是理想的起步。使用旧版本，你可能遇到各种问题，因为它们可能缺少 webpack 功能或缺少相关 package 包。</p>
<p>本地局部安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 latest release
npm install --save-dev webpack
# 简写模式
npm install -D webpack
# 安装特定版本
npm install --save-dev webpack@<version> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code><span class="hljs-comment"># 安装 latest release</span>
npm <span class="hljs-keyword">install</span> --save-dev webpack
<span class="hljs-comment"># 简写模式</span>
npm <span class="hljs-keyword">install</span> -D webpack
<span class="hljs-comment"># 安装特定版本</span>
npm <span class="hljs-keyword">install</span> --save-dev webpack@&lt;version&gt; </code></pre>
<p>全局安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g webpack</code></pre>
<p>注意：不推荐全局安装 webpack。这会锁定 webpack 到指定版本，并且在使用不同的 webpack 版本的项目中可能会导致构建失败。但是全局安装可以在命令行调用 webpack 命令。</p>
<p>【补充】npm install 安装模块参数说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-g, --global 全局安装（global）
-S, --save 安装包信息将加入到dependencies（生产阶段的依赖）
-D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它
-O, --save-optional 安装包信息将加入到optionalDependencies（可选阶段的依赖）
-E, --save-exact 精确安装指定模块版本" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">g, --global 全局安装（global）
</span>-<span class="ruby">S, --save 安装包信息将加入到dependencies（生产阶段的依赖）
</span>-<span class="ruby">D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它
</span>-<span class="ruby">O, --save-optional 安装包信息将加入到optionalDependencies（可选阶段的依赖）
</span>-<span class="ruby">E, --save-exact 精确安装指定模块版本</span></code></pre>
<p>npm 相关的更多命令参考这篇文章：<a href="https://zhaomenghuan.github.io/2016/11/15/npm%20%E5%B8%B8%E7%94%A8%E5%91%BD%E4%BB%A4%E8%AF%A6%E8%A7%A3/" rel="nofollow noreferrer" target="_blank">npm 常用命令详解</a></p>
<p>然后在根目录下创建一个 <code>webpack.config.js</code> 文件后，你可以通过配置定义webpack的相关操作。</p>
<h3 id="articleHeader3">入口(Entry)</h3>
<blockquote><p>入口起点告诉 webpack 从哪里开始，并遵循着依赖关系图表知道要打包什么。可以将您应用程序的入口起点认为是根上下文(contextual root)或 app 第一个启动文件。</p></blockquote>
<p><strong>单个入口（简写）语法：</strong><br>用法：<code>entry: string|Array&lt;string&gt;</code></p>
<p>webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: './src/main.js'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: <span class="hljs-string">'./src/main.js'</span>
};</code></pre>
<p><strong>对象语法：</strong><br>用法：<code>entry: {[entryChunkName: string]: string|Array&lt;string&gt;}</code></p>
<p>webpack.config.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  entry: {
    app: './src/main.js',
    vendor: ['vue']
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: {
    app: <span class="hljs-string">'./src/main.js'</span>,
    vendor: [<span class="hljs-string">'vue'</span>]
  }
};</code></pre>
<p>这里我们将vue作为库vendor打包，业务逻辑代码作为app打包，实现了多个入口，同时也可以将多个页面分开打包。</p>
<p>多页面应用程序通常使用对象语法构建。对象语法是<strong>“可扩展的 webpack 配置”</strong>，可重用并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点(concern)从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如<a href="https://github.com/survivejs/webpack-merge" rel="nofollow noreferrer" target="_blank">webpack-merge</a>）将它们合并。</p>
<p>注：vue-cli 生成的模板中build文件夹下有四个配置文件：</p>
<ul>
<li><p><a href="https://github.com/vuejs-templates/webpack/blob/master/template/build/webpack.base.conf.js" rel="nofollow noreferrer" target="_blank">webpack.base.conf.js</a>：基本配置</p></li>
<li><p><a href="https://github.com/vuejs-templates/webpack/blob/master/template/build/webpack.dev.conf.js" rel="nofollow noreferrer" target="_blank">webpack.dev.conf.js</a>：开发阶段配置</p></li>
<li><p><a href="https://github.com/vuejs-templates/webpack/blob/master/template/build/webpack.prod.conf.js" rel="nofollow noreferrer" target="_blank">webpack.prod.conf.js</a>：准生产阶段配置</p></li>
<li><p><a href="https://github.com/vuejs-templates/webpack/blob/master/template/build/webpack.test.conf.js" rel="nofollow noreferrer" target="_blank">webpack.test.conf.js</a>：测试配置</p></li>
</ul>
<p>后三个文件通过webpack-merge插件合并了基本配置，将不同环境下的配置拆分多个文件，这样更加方便管理。</p>
<h3 id="articleHeader4">出口(Output)</h3>
<blockquote><p>将所有的资源(assets)归拢在一起后，还需要告诉 webpack 在哪里打包应用程序。webpack 的 output 属性描述了如何处理归拢在一起的代码(bundled code)。output 选项控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个输出配置。</p></blockquote>
<p>在 webpack 中配置output 属性的最低要求是，将它的值设置为一个对象，包括以下两点：</p>
<ul>
<li><p><a href="https://doc.webpack-china.org/concepts/output/#output-filename" rel="nofollow noreferrer" target="_blank">output.filename</a>：编译文件的文件名；</p></li>
<li><p><a href="https://doc.webpack-china.org/concepts/output/#output-path" rel="nofollow noreferrer" target="_blank">output.path</a>对应一个<strong>绝对路径</strong>，此路径是你希望一次性打包的目录。</p></li>
</ul>
<p><strong>单个入口：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')  //__dirname + '/build'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: <span class="hljs-string">'./src/app.js'</span>,
  output: {
    filename: <span class="hljs-string">'bundle.js'</span>,
    path: path.resolve(__dirname, <span class="hljs-string">'build'</span>)  <span class="hljs-comment">//__dirname + '/build'</span>
  }
}</code></pre>
<p><strong>多个入口：</strong><br>如果你的配置创建了多个 "chunk"（例如使用多个入口起点或使用类似CommonsChunkPlugin 的插件），你应该使用以下的替换方式来确保每个文件名都不重复。</p>
<ul>
<li><p>[name] 被 chunk 的 name 替换。</p></li>
<li><p>[hash] 被 compilation 生命周期的 hash 替换。</p></li>
<li><p>[chunkhash] 被 chunk 的 hash 替换。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path');
module.exports = {
  entry: {
    app: './src/main.js',
    vendor: ['vue']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  }
}

// 写入到硬盘：./build/app.js, ./build/vendor.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  entry: {
    app: <span class="hljs-string">'./src/main.js'</span>,
    vendor: [<span class="hljs-string">'vue'</span>]
  },
  output: {
    filename: <span class="hljs-string">'[name].js'</span>,
    path: path.resolve(__dirname, <span class="hljs-string">'build'</span>)
  }
}

<span class="hljs-comment">// 写入到硬盘：./build/app.js, ./build/vendor.js</span></code></pre>
<h3 id="articleHeader5">加载器(Loaders)</h3>
<blockquote><p>loader 用于对模块的源代码进行转换。loader 可以使你在 require() 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。loader 甚至允许你在 JavaScript 中 require() CSS文件！</p></blockquote>
<p>在你的应用程序中，有三种方式使用 loader：</p>
<ul>
<li><p><a href="https://doc.webpack-china.org/concepts/loaders/#-webpack-config-js" rel="nofollow noreferrer" target="_blank">通过webpack.config.js配置</a></p></li>
<li><p><a href="https://doc.webpack-china.org/concepts/loaders/#-require" rel="nofollow noreferrer" target="_blank">使用 require 语句中显示使用</a></p></li>
<li><p><a href="https://doc.webpack-china.org/concepts/loaders/#-cli" rel="nofollow noreferrer" target="_blank">通过 webpack CLI</a></p></li>
</ul>
<p>这里我们主要说明一下使用webpack.config.js配置，使用loader需要在module的rules下配置相应的规则，以css-loader的<strong>webpack.config.js</strong>为例说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = { 
    module: { 
        rules: [
            {test: /\.css$/, use: 'css-loader'}
        ]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> { 
    <span class="hljs-function"><span class="hljs-keyword">module</span>: {</span> 
        rules: [
            {test: /\.css$/, <span class="hljs-keyword">use</span>: 'css-loader'}
        ]
    }
};</code></pre>
<p>这三种配置方式等效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{test: /\.css$/, use: 'css-loader'}
{test: /\.css$/, loader: 'css-loader'，options: { modules: true "}}"
{test: /\.css$/, use: {
    loader: 'css-loader',
    options: {
      modules: true
    }
"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>{<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-string">use:</span> <span class="hljs-string">'css-loader'</span>}
{<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-string">loader:</span> <span class="hljs-string">'css-loader'</span>，<span class="hljs-string">options:</span> { <span class="hljs-string">modules:</span> <span class="hljs-literal">true</span> "}}"
{<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-string">use:</span> {
<span class="hljs-symbol">    loader:</span> <span class="hljs-string">'css-loader'</span>,
<span class="hljs-symbol">    options:</span> {
<span class="hljs-symbol">      modules:</span> <span class="hljs-literal">true</span>
    }
"}}"</code></pre>
<p>注：loader/query可以和options可以在同一级使用，但是不要使用use和options在同一级使用。</p>
<h4>CSS样式分离</h4>
<p>为了用 webpack 对 CSS 文件进行打包，你可以像<a href="https://doc.webpack-china.org/concepts/modules" rel="nofollow noreferrer" target="_blank">其它模块</a>一样将 CSS 引入到你的 JavaScript 代码中，同时用css-loader(像 JS 模块一样输出 CSS)，也可以选择使用ExtractTextWebpackPlugin(将打好包的 CSS 提出出来并输出成 CSS 文件)。</p>
<p>引入 CSS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'bootstrap/dist/css/bootstrap.css';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'bootstrap/dist/css/bootstrap.css';</span></code></pre>
<p>安装css-loader和style-loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev css-loader style-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev css-loader <span class="hljs-built_in">style</span>-loader</code></pre>
<p>在 webpack.config.js 中配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>: {
        rules: [{
            test: <span class="hljs-regexp">/\.css$/</span>,
            use: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
        }]
    }
}</code></pre>
<h4>资源路径处理</h4>
<p>因为.png等图片文件不是一个 JavaScript 文件，你需要配置 Webpack 使用<a href="https://github.com/webpack/file-loader" rel="nofollow noreferrer" target="_blank">file-loader</a>或者<a href="https://github.com/webpack/url-loader" rel="nofollow noreferrer" target="_blank">url-loader</a>去处理它们。使用它们的好处：</p>
<ul>
<li><p>file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理你的图片文件，可以使用相对路径而不用担心布署时URL问题。使用正确的配置，Webpack 将会在打包输出中自动重写文件路径为正确的URL。</p></li>
<li><p>url-loader 允许你有条件将文件转换为内联的 base-64 URL（当文件小于给定的阈值），这会减少小文件的 HTTP 请求。如果文件大于该阈值，会自动的交给 file-loader 处理。</p></li>
</ul>
<p>安装 file-loader 和 url-loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev file-loader url-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-keyword">save</span>-dev <span class="hljs-keyword">file</span>-loader url-loader</code></pre>
<p>配置说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'img/[name]_[hash:7].[ext]'
    }
},
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: <span class="hljs-string">'url-loader'</span>,
    options: {
        limit: <span class="hljs-number">10000</span>,
        name: <span class="hljs-string">'img/[name]_[hash:7].[ext]'</span>
    }
},
{
    <span class="hljs-attribute">test</span>: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: <span class="hljs-string">'url-loader'</span>,
    options: {
        limit: <span class="hljs-number">10000</span>,
        name: <span class="hljs-string">'fonts/[name].[hash:7].[ext]'</span>
    }
}</code></pre>
<h3 id="articleHeader6">插件(Plugins)</h3>
<blockquote><p>由于 loader 仅在每个文件的基础上执行转换，而插件(plugins)最常用于（但不限于）在打包模块的“compilation”和“chunk”生命周期执行操作和自定义功能<a href="https://doc.webpack-china.org/concepts/plugins" rel="nofollow noreferrer" target="_blank">（查看更多）</a>。webpack 的插件系统<a href="https://doc.webpack-china.org/api/plugins" rel="nofollow noreferrer" target="_blank">极其强大和可定制化</a>。</p></blockquote>
<p>想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，你需要使用 new 创建实例来调用它。</p>
<h4>生产环境构建</h4>
<p>对于Vue生产环境构建过程中压缩应用代码和使用<a href="https://cn.vuejs.org/v2/guide/deployment.html#" rel="nofollow noreferrer" target="_blank">Vue.js 指南 - 删除警告</a>去除 Vue.js 中的警告，这里我们参考vue-loader文档中的配置说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (process.env.NODE_ENV === 'production') {
    // http://vue-loader.vuejs.org/zh-cn/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '&quot;production&quot;'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
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
      </div><pre class="hljs java"><code><span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
    <span class="hljs-comment">// http://vue-loader.vuejs.org/zh-cn/workflow/production.html</span>
    <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>.plugins = (<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span>.plugins || []).concat([
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env'</span>: {
                NODE_ENV: <span class="hljs-string">'"production"'</span>
            }
        }),
        <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({
            sourceMap: <span class="hljs-keyword">false</span>,
            compress: {
                warnings: <span class="hljs-keyword">false</span>
            }
        }),
        <span class="hljs-keyword">new</span> webpack.LoaderOptionsPlugin({
            minimize: <span class="hljs-keyword">true</span>
        })
    ])
}</code></pre>
<p>显然我们不想在开发过程中使用这些配置，所以这里我们需要使用环境变量动态构建，我们也可以使用两个分开的 Webpack 配置文件，一个用于开发环境，一个用于生产环境，类似于vue-cli中使用 webpack-merge 合并配置的方式。</p>
<p>可以使用 Node.js 模块的标准方式：在运行 webpack 时设置环境变量，并且使用 Node.js 的<a href="https://nodejs.org/api/process.html#process_process_env" rel="nofollow noreferrer" target="_blank">process.env</a>来引用变量。NODE_ENV变量通常被视为事实标准（查看<a href="https://dzone.com/articles/what-you-should-know-about-node-env" rel="nofollow noreferrer" target="_blank">这里</a>）。使用<a href="https://www.npmjs.com/package/cross-env" rel="nofollow noreferrer" target="_blank">cross-env</a>包来跨平台设置(cross-platform-set)环境变量。</p>
<p>安装cross-env：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev cross-env" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> <span class="hljs-built_in">cross</span>-env</code></pre>
<p>设置package.json中的scripts字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;cross-env NODE_ENV=development webpack-dev-server --open --hot&quot;,
    &quot;build&quot;: &quot;cross-env NODE_ENV=production webpack --progress --hide-modules&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"cross-env NODE_ENV=development webpack-dev-server --open --hot"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"cross-env NODE_ENV=production webpack --progress --hide-modules"</span>
}</code></pre>
<p>这里我们使用了cross-env插件，cross-env使得你可以使用单个命令，而无需担心为平台正确设置或使用环境变量。</p>
<h4>模块热替换</h4>
<blockquote><p>模块热替换功能会在应用程序运行过程中替换、添加或删除<a href="https://doc.webpack-china.org/concepts/modules/" rel="nofollow noreferrer" target="_blank">模块</a>，而无需重新加载页面。这使得你可以在独立模块变更后，无需刷新整个页面，就可以更新这些模块，极大地加速了开发时间。</p></blockquote>
<p>这里我们使用webpack-dev-server插件，webpack-dev-server 为你提供了一个服务器和实时重载（live reloading）功能。webpack-dev-server是一个小型的node.js Express服务器,它使用webpack-dev-middleware中间件来为通过webpack打包生成的资源文件提供Web服务。它还有一个通过Socket.IO连接着webpack-dev-server服务器的小型运行时程序。webpack-dev-server发送关于编译状态的消息到客户端，客户端根据消息作出响应。</p>
<p>安装 webpack-dev-server：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> webpack-<span class="hljs-built_in">dev</span>-server</code></pre>
<p>安装完成之后，你应该可以使用 webpack-dev-server 了，方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --open" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">webpack-dev-server <span class="hljs-comment">--open</span></code></pre>
<p>上述命令应该自动在浏览器中打开 <a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>。</p>
<p><strong>webpack.config.js</strong>配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    ...
    devServer: {
        historyApiFallback: true, // 任意的 404 响应都替代为 index.html
        hot: true, // 启用 webpack 的模块热替换特性
        inline: true // 启用内联模式
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
    <span class="hljs-string">...</span>
<span class="hljs-attr">    devServer:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        historyApiFallback:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">任意的</span> <span class="hljs-number">404</span> <span class="hljs-string">响应都替代为</span> <span class="hljs-string">index.html</span>
<span class="hljs-attr">        hot:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-string">//</span> <span class="hljs-string">启用</span> <span class="hljs-string">webpack</span> <span class="hljs-string">的模块热替换特性</span>
<span class="hljs-attr">        inline:</span> <span class="hljs-literal">true</span> <span class="hljs-string">//</span> <span class="hljs-string">启用内联模式</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    plugins:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">new</span> <span class="hljs-string">webpack.HotModuleReplacementPlugin()</span>
    <span class="hljs-string">]</span>
    <span class="hljs-string">...</span>
<span class="hljs-string">}</span></code></pre>
<p>更多的配置说明可以看文档：<a href="https://doc.webpack-china.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">DevServer</a></p>
<h4>动态生成 html 文件</h4>
<p>该插件将为你生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包，也就是我们不需要手动通过script去引入打包生成的js，特别是如果我们生成的文件名是动态变化的，使用这个插件就可以轻松的解决，只需添加插件到您的webpack配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> HtmlWebpackPlugin = require(<span class="hljs-string">'html-webpack-plugin'</span>);

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    ...
    plugins: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            filename: <span class="hljs-string">'index.html'</span>,
            template: <span class="hljs-string">'index.html'</span>,
            inject: <span class="hljs-keyword">true</span>
        })
    ]
    ...
}</code></pre>
<h4>提取 CSS 文件</h4>
<p><code>extract-text-webpack-plugin</code>是一个 可以将<code> *.vue</code> 文件内的 &lt;style&gt; 提取，以及JavaScript 中导入的 CSS 提取为单个 CSS 文件。配置文档具体见这里：<a href="https://github.com/webpack-contrib/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>。</p>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev extract-text-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev extract-<span class="hljs-built_in">text</span>-webpack-plugin</code></pre>
<p>配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: &quot;style-loader&quot;,
          use: &quot;css-loader&quot;
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(&quot;styles.css&quot;),
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const ExtractTextPlugin = require(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

module.exports = {
<span class="hljs-symbol">  module:</span> {
<span class="hljs-symbol">    rules:</span> [
      {
<span class="hljs-symbol">        test:</span> /\.css$/,
<span class="hljs-symbol">        use:</span> ExtractTextPlugin.extract({
<span class="hljs-symbol">          fallback:</span> <span class="hljs-string">"style-loader"</span>,
<span class="hljs-symbol">          use:</span> <span class="hljs-string">"css-loader"</span>
        })
      }
    ]
  },
<span class="hljs-symbol">  plugins:</span> [
    new ExtractTextPlugin(<span class="hljs-string">"styles.css"</span>),
  ]
}</code></pre>
<p>同时支持我们可以配置生成多个css文件，这样我们可以将业务逻辑代码和引用的样式组件库分离。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      },
      {
        test: /\.less$/i,
        use: extractLESS.extract([ 'css-loader', 'less-loader' ])
      },
    ]
  },
  plugins: [
    extractCSS,
    extractLESS
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);

<span class="hljs-comment">// Create multiple instances</span>
<span class="hljs-keyword">const</span> extractCSS = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'stylesheets/[name]-one.css'</span>);
<span class="hljs-keyword">const</span> extractLESS = <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">'stylesheets/[name]-two.css'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.css$/</span>,
        use: extractCSS.extract([ <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'postcss-loader'</span> ])
      },
      {
        test: <span class="hljs-regexp">/\.less$/i</span>,
        use: extractLESS.extract([ <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'less-loader'</span> ])
      },
    ]
  },
  plugins: [
    extractCSS,
    extractLESS
  ]
};</code></pre>
<h4>clean-webpack-plugin</h4>
<p>在编译前，删除之前编译结果目录或文件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev clean-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> clean-webpack-plugin</code></pre>
<p>配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
    new CleanWebpackPlugin(['dist'])
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span> [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'dist'</span>])
]</code></pre>
<p>这样当我们在构建的时候可以自动删除之前编译的代码。</p>
<h3 id="articleHeader7">解析(Resolve)</h3>
<p>这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@': path.join(__dirname, 'src')
  },
  extensions: ['.js', '.json', '.vue', '.css']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
  <span class="hljs-attribute">alias</span>: {
    <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
    <span class="hljs-string">'@'</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">'src'</span>)
  },
  <span class="hljs-selector-tag">extensions</span>: <span class="hljs-selector-attr">['.js', '.json', '.vue', '.css']</span>
}</code></pre>
<p>我们使用最多的就是别名（alias）和自动解析确定的扩展（extensions），例如上面的@可以代替项目中src的路径，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import tab from '@/components/tab.vue'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">import <span class="hljs-literal">tab</span> <span class="hljs-keyword">from</span> '@/components/<span class="hljs-literal">tab</span>.vue'</code></pre>
<p>我们引用src/components目录下的tab.vue组件，不需要通过<code>../</code>之类的计算文件相对路径。这里的extensions可以让我们在引入模块时不带扩展：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import tab from '@/components/tab'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">import <span class="hljs-literal">tab</span> <span class="hljs-keyword">from</span> '@/components/<span class="hljs-literal">tab</span>'</code></pre>
<p>至此我们已经学习了我们项目devDependencies依赖中常用的模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack 
css-loader / style-loader
file-loader / url-loader 
cross-env 
webpack-dev-server 
html-webpack-plugin 
extract-text-webpack-plugin
clean-webpack-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>webpack 
css-loader / style-loader
<span class="hljs-keyword">file</span>-loader / url-loader 
<span class="hljs-keyword">cross</span>-env 
webpack-dev-server 
html-webpack-<span class="hljs-keyword">plugin</span> 
extract-text-webpack-<span class="hljs-keyword">plugin</span>
clean-webpack-<span class="hljs-keyword">plugin</span></code></pre>
<p>这里我们只说明了css、图片、html模板资源webpack相关的加载器和插件，对于js相关的内容丝毫没有提到，显然这是不合乎情理的。之所以要把js单独拿出来是因为js相关的内容很重要，独立出来详细去归纳一下更合适。</p>
<hr>
<h2 id="articleHeader8">webpack 中如何使用 es6 ~ es8?</h2>
<p>作为一个前端，相信 es6 几乎是无人不知，很多人也一定知道可以使用Babel做语法转换，但是对于Babel有哪一些版本，每个版本支持的es6语法有哪一些应该不是所有人都清楚的，这就是这部分内容要写的意义。毕竟如果我们的插件只用到了es6中的没一些新特性，为此将整个包引入就有点不太合适，另外为了更好的用上新特性，我们至少要明白有哪一些新特性吧。</p>
<h3 id="articleHeader9">ECMAScript 标准建立的过程</h3>
<p>ECMAScript 和 JavaScript 的关系在此不再赘述，建议阅读一下阮一峰老师的<a href="http://es6.ruanyifeng.com/#docs/intro" rel="nofollow noreferrer" target="_blank">《ECMAScript 6简介》</a>，我们需要了解的是<strong>从ECMAScript 2016开始，ECMAScript将进入每年发布一次新标准的阶段</strong>。制定ECMAScript 标准的组织是<strong>ECMAScript TC39</strong>，<a href="http://www.ecma-international.org/memento/TC39.htm" rel="nofollow noreferrer" target="_blank">TC39</a>（ECMA技术委员为39）是推动JavaScript发展的委员会。 它的成员是都是企业（主要是浏览器厂商）。TC39会<a href="http://www.ecma-international.org/memento/TC39-M.htm" rel="nofollow noreferrer" target="_blank">定期的开会</a>， 会议的主要成员时是成员公司的代表，以及受邀请的专家。</p>
<p>一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。</p>
<ul>
<li><p>Stage 0 - Strawman（展示阶段）</p></li>
<li><p>Stage 1 - Proposal（征求意见阶段）</p></li>
<li><p>Stage 2 - Draft（草案阶段）</p></li>
<li><p>Stage 3 - Candidate（候选人阶段）</p></li>
<li><p>Stage 4 - Finished（定案阶段）</p></li>
</ul>
<p>建议看一下alinode 团队的<a href="http://alinode.aliyun.com/blog/22" rel="nofollow noreferrer" target="_blank">图说ECMAScript新标准（一）</a>就可以大致了解整个过程。</p>
<h3 id="articleHeader10">安装 Babel</h3>
<p>Babel 现在的官网提供了一个可以根据你的工具提示下载合适的包，具体见这里：<a href="http://babeljs.io/docs/setup/" rel="nofollow noreferrer" target="_blank">Using Babel</a>。</p>
<p>如果你想要在命令行使用Babel，你可以安装babel-cli，但是全局的安装babel-cli不是一个好的选择，因为这样限定了你Babel的版本；如果你需要在一个Node项目中使用Babel，你可以使用babel-core。</p>
<p>我们这里自然选择webpack构建我们的工程，下载方案如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-loader babel-core" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span>--save-dev <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-core</span></code></pre>
<p>然后我们需要在项目根目录下建立<code>.babelrc</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [],
  &quot;plugins&quot;: []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [],
  <span class="hljs-attr">"plugins"</span>: []
}</code></pre>
<p>注：在window下无法通过 右键=&gt;新建 命令来创建以点开头的文件和文件夹，我们可以通过下面的命令生成<code>.babelrc</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="type NUL > .babelrc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">type</span> <span class="hljs-type">NUL </span>&gt; .babelrc</code></pre>
<p>Linux和Mac下可以通过touch命令生成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch .babelrc" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">touch</span> <span class="hljs-selector-class">.babelrc</span></code></pre>
<h3 id="articleHeader11">Babel 预设(presets)</h3>
<p>Babel是一个编译器。 在高层次上，它有3个阶段，它运行代码：解析，转换和生成（像许多其他编译器）。默认情况下，Babel 6并没有携带任何转换器，因此如果对你的代码使用Babel的话，它将会原文输出你的代码，不会有任何的改变。因此你需要根据你需要完成的任务来单独安装相应的插件。</p>
<p>你可以通过安装<strong>插件（plugins）或预设（presets，也就是一组插件）</strong>来指示 Babel 去做什么事情。Babel 提供了多个版本的官方预设：</p>
<ul>
<li><p><a href="http://babeljs.io/docs/plugins/preset-env/" rel="nofollow noreferrer" target="_blank">env</a></p></li>
<li><p><a href="http://babeljs.io/docs/plugins/preset-es2015/" rel="nofollow noreferrer" target="_blank">es2015</a></p></li>
<li><p><a href="http://babeljs.io/docs/plugins/preset-es2016/" rel="nofollow noreferrer" target="_blank">es2016</a></p></li>
<li><p><a href="http://babeljs.io/docs/plugins/preset-es2017/" rel="nofollow noreferrer" target="_blank">es2017</a></p></li>
<li><p><a href="http://babeljs.io/docs/plugins/preset-latest/" rel="nofollow noreferrer" target="_blank">latest (deprecated in favor of env)</a></p></li>
</ul>
<h4>babel-preset-env</h4>
<p><strong>babel-preset-env</strong>可以根据你配置的选项，自动添加一些其他的转换器，来满足你当前的装换需求。.babelrc文件新增了options选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;env&quot;, options]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"env"</span>, options]
}</code></pre>
<p>具体的配置内容：</p>
<ul>
<li><p>targets.node 支持到哪个版本的 node</p></li>
<li><p>targets.browsers 支持到哪个版本的浏览器</p></li>
<li><p>loose 启动宽松模式，配合 webpack 的 loader 使用</p></li>
<li><p>modules 使用何种模块加载机制</p></li>
<li><p>debug 开启调试模式</p></li>
<li><p>include 包含哪些文件</p></li>
<li><p>exclude 排除哪些文件</p></li>
<li><p>useBuiltIns 是否对 babel-polyfill 进行分解，只引入所需的部分</p></li>
</ul>
<h4>babel-preset-es2015</h4>
<p>es2015(ES6)相关方法转译使用的插件，具体见<a href="http://babeljs.io/docs/plugins/preset-es2015/" rel="nofollow noreferrer" target="_blank">文档</a>。</p>
<ul>
<li><p>check-es2015-constants // 检验const常量是否被重新赋值</p></li>
<li><p>transform-es2015-arrow-functions // 编译箭头函数</p></li>
<li><p>transform-es2015-block-scoped-functions // 函数声明在作用域内</p></li>
<li><p>transform-es2015-block-scoping // 编译const和let</p></li>
<li><p>transform-es2015-classes // 编译class</p></li>
<li><p>transform-es2015-computed-properties // 编译计算对象属性</p></li>
<li><p>transform-es2015-destructuring // 编译解构赋值</p></li>
<li><p>transform-es2015-duplicate-keys // 编译对象中重复的key，其实是转换成计算对象属性</p></li>
<li><p>transform-es2015-for-of // 编译for...of</p></li>
<li><p>transform-es2015-function-name // 将function.name语义应用于所有的function</p></li>
<li><p>transform-es2015-literals // 编译整数(8进制/16进制)和unicode</p></li>
<li><p>transform-es2015-modules-commonjs // 将modules编译成commonjs</p></li>
<li><p>transform-es2015-object-super // 编译super</p></li>
<li><p>transform-es2015-parameters // 编译参数，包括默认参数，不定参数和解构参数</p></li>
<li><p>transform-es2015-shorthand-properties // 编译属性缩写</p></li>
<li><p>transform-es2015-spread // 编译展开运算符</p></li>
<li><p>transform-es2015-sticky-regex // 正则添加sticky属性</p></li>
<li><p>transform-es2015-template-literals // 编译模版字符串</p></li>
<li><p>transform-es2015-typeof-symbol // 编译Symbol类型</p></li>
<li><p>transform-es2015-unicode-regex // 正则添加unicode模式</p></li>
<li><p>transform-regenerator // 编译generator函数</p></li>
</ul>
<h4>babel-preset-es2016</h4>
<p>es2016(ES7)相关方法转译使用的插件，具体见<a href="http://babeljs.io/docs/plugins/preset-es2016/" rel="nofollow noreferrer" target="_blank">文档</a>。</p>
<ul><li><p>transform-exponentiation-operator // 编译幂运算符</p></li></ul>
<h4>babel-preset-es2017</h4>
<p>es2017(ES8)相关方法转译使用的插件，具体见<a href="http://babeljs.io/docs/plugins/preset-es2017/" rel="nofollow noreferrer" target="_blank">文档</a>。</p>
<ul>
<li><p>syntax-trailing-function-commas // function最后一个参数允许使用逗号</p></li>
<li><p>transform-async-to-generator // 把async函数转化成generator函数</p></li>
</ul>
<h4>babel-preset-latest</h4>
<p>latest是一个特殊的presets，包括了es2015，es2016，es2017的插件，不过已经废弃，使用babel-preset-env代替，具体见<a href="http://babeljs.io/docs/plugins/preset-latest/" rel="nofollow noreferrer" target="_blank">文档</a>。</p>
<h4>stage-x(stage-0/1/2/3/4)</h4>
<p>stage-x预设中的任何转换都是尚未被批准为发布Javascript的语言（如ES6 / ES2015）的更改。</p>
<p>stage-x和上面的es2015等有些类似，但是它是按照JavaScript的提案阶段区分的，一共有5个阶段。而数字越小，阶段越靠后，存在依赖关系。也就是说stage-0是包括stage-1的，以此类推。</p>
<p><strong>babel-preset-stage-4：</strong></p>
<p>stage-4的插件：</p>
<ul>
<li><p><a href="http://babeljs.io/docs/plugins/syntax-trailing-function-commas/" rel="nofollow noreferrer" target="_blank">syntax-trailing-function-commas</a>  // function最后一个参数允许使用逗号（ES8已经存在）</p></li>
<li><p><a href="http://babeljs.io/docs/plugins/transform-async-to-generator/" rel="nofollow noreferrer" target="_blank">transform-async-to-generator</a> // 把async函数转化成generator函数（ES8已经存在）</p></li>
<li><p><a href="http://babeljs.io/docs/plugins/transform-exponentiation-operator/" rel="nofollow noreferrer" target="_blank">transform-exponentiation-operator</a> // 编译幂运算符（ES7已经存在）</p></li>
</ul>
<p><strong>babel-preset-stage-3：</strong></p>
<p>除了stage-4的内容，还包括以下插件：</p>
<ul>
<li><p><a href="http://babeljs.io/docs/plugins/transform-object-rest-spread/" rel="nofollow noreferrer" target="_blank">transform-object-rest-spread</a> // 编译对象的解构赋值和不定参数</p></li>
<li><p><a href="http://babeljs.io/docs/plugins/transform-async-generator-functions/" rel="nofollow noreferrer" target="_blank">transform-async-generator-functions</a> // 将async generator function和for await编译为es2015的generator。</p></li>
</ul>
<p><strong>babel-preset-stage-2：</strong></p>
<p>除了stage-3的内容，还包括以下插件：</p>
<ul>
<li><p><a href="http://babeljs.io/docs/plugins/syntax-dynamic-import/" rel="nofollow noreferrer" target="_blank">syntax-dynamic-import</a> // 动态加载模块</p></li>
<li><p><a href="http://babeljs.io/docs/plugins/transform-class-properties/" rel="nofollow noreferrer" target="_blank">transform-class-properties</a>  // 编译静态属性(es2015)和属性初始化语法声明的属性(es2016)。</p></li>
<li><p><del><a href="http://babeljs.io/docs/plugins/transform-decorators/" rel="nofollow noreferrer" target="_blank">transform-decorators</a></del>已禁用的等待提案更新（可以在此期间使用旧版转换）</p></li>
</ul>
<p><strong>babel-preset-stage-1：</strong></p>
<p>除了stage-2的内容，还包括以下插件：</p>
<ul>
<li><p><a href="http://babeljs.io/docs/plugins/transform-class-constructor-call/" rel="nofollow noreferrer" target="_blank">transform-class-constructor-call</a>(弃用)  // 编译class中的constructor，在Babel7中会被移除</p></li>
<li><p><a href="http://babeljs.io/docs/plugins/transform-export-extensions/" rel="nofollow noreferrer" target="_blank">transform-export-extensions</a> // 编译额外的export语法，如export * as ns from "mod";细节可以看<a href="https://github.com/leebyron/ecmascript-more-export-from" rel="nofollow noreferrer" target="_blank">这个</a>。</p></li>
</ul>
<p><strong>babel-preset-stage-0：</strong></p>
<p>除了stage-1的内容，还包括以下插件：</p>
<ul>
<li><p><a href="http://babeljs.io/docs/plugins/transform-do-expressions/" rel="nofollow noreferrer" target="_blank">transform-do-expressions</a>  // 编译do表达式</p></li>
<li><p><a href="http://babeljs.io/docs/plugins/transform-function-bind/" rel="nofollow noreferrer" target="_blank">transform-function-bind</a>  // 编译bind运算符，即<code>::</code></p></li>
</ul>
<p>为了方便，我们暂时引用 <strong>babel-preset-env</strong> 和<strong>babel-preset-stage-2</strong>这两个预设。为了启用预设，必须在.babelrc文件中定义预设的相关配置，这里参考vue-cli 模板中的<a href="https://github.com/vuejs-templates/webpack/blob/master/template/.babelrc" rel="nofollow noreferrer" target="_blank">配置</a>。<br>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npminstall --save-dev babel-preset-env babel-preset-stage-2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npminstall --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-preset-env babel-preset-stage<span class="hljs-number">-2</span></code></pre>
<p>.babelrc配置说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;env&quot;, { 
      &quot;modules&quot;: false 
    }],
    &quot;stage-2&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, { 
      <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span> 
    }],
    <span class="hljs-string">"stage-2"</span>
  ]
}</code></pre>
<h3 id="articleHeader12">Babel 插件(plugins)</h3>
<p>我们看一下预设的构成就知道，其实就是plugins的组合。如果你不采用presets，完全可以单独引入某个功能，比如以下的设置就会引入编译箭头函数的功能，在.babelrc文件中进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [&quot;transform-es2015-arrow-functions&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-es2015-arrow-functions"</span>]
}</code></pre>
<h4>babel-polyfill 与 babel-runtime</h4>
<p>Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如 Object.assign）都不会转码。</p>
<p>举例来说，ES6在 Array 对象上新增了 Array.from 方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用 babel-polyfill ，为当前环境提供一个垫片。babel-polyfill 是对浏览器缺失API的支持。</p>
<p>babel-runtime 是为了减少重复代码而生的。 babel生成的代码，可能会用到一些_extend()， classCallCheck() 之类的工具函数，默认情况下，这些工具函数的代码会包含在编译后的文件中。如果存在多个文件，那每个文件都有可能含有一份重复的代码。babel-runtime插件能够将这些工具函数的代码转换成require语句，指向为对babel-runtime的引用，如<code>require('babel-runtime/helpers/classCallCheck')</code>. 这样， classCallCheck的代码就不需要在每个文件中都存在了。</p>
<p>启用插件 babel-plugin-transform-runtime 后，Babel 就会使用 babel-runtime 下的工具函数。除此之外，babel 还为源代码的非实例方法（Object.assign，实例方法是类似这样的 "foobar".includes("foo")）和 babel-runtime/helps 下的工具函数自动引用了 polyfill。这样可以避免污染全局命名空间，非常适合于 JavaScript 库和工具包的实现。</p>
<p>总结：</p>
<ul>
<li><p>具体项目还是需要使用 babel-polyfill，只使用 babel-runtime 的话，实例方法不能正常工作（例如 "foobar".includes("foo")）；</p></li>
<li><p>JavaScript 库和工具可以使用 babel-runtime，在实际项目中使用这些库和工具，需要该项目本身提供 polyfill。</p></li>
<li><p>transform-runtime只会对es6的语法进行转换，而不会对新api进行转换。如果需要转换新api，就要引入babel-polyfill。</p></li>
</ul>
<p><strong>安装插件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-plugin-transform-runtime" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-dev babel-plugin-<span class="hljs-built_in">transform</span>-runtime</code></pre>
<p>.babelrc 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;plugins&quot;: [&quot;transform-runtime&quot;, options]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>, options]
}</code></pre>
<p>options主要有以下设置项：</p>
<ul>
<li><p>helpers: boolean，默认true，使用babel的helper函数；</p></li>
<li><p>polyfill: boolean，默认true，使用babel的polyfill，但是不能完全取代babel-polyfill；</p></li>
<li><p>regenerator: boolean，默认true，使用babel的regenerator；</p></li>
<li><p>moduleName: string，默认babel-runtime，使用对应module处理。</p></li>
</ul>
<p>注：默认moduleName为babel-runtime，这里我们可以不必显式的下载babel-runtime，因为babel-plugin-transform-runtime依赖于babel-runtime。</p>
<h4>babel-register</h4>
<p>babel-register 模块改写 require 命令，为它加上一个钩子。此后，每当使用 require 加载 .js 、 .jsx 、 .es 和 .es6 后缀名的文件，就会先用Babel进行转码。引入babel-register，这样后面的文件就可以用 import 代替require，import的优点在于可以引入所需方法或者变量，而不需要加载整个模块，提高了性能。</p>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev babel-register" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-register</code></pre>
<p>这部分我们又介绍了下面几个模块的安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel-loader
babel-core
babel-preset-env 
babel-preset-stage-2 
babel-plugin-transform-runtime
babel-register" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">babel-loader
</span><span class="hljs-keyword">babel-core
</span><span class="hljs-keyword">babel-preset-env </span>
<span class="hljs-keyword">babel-preset-stage-2 </span>
<span class="hljs-keyword">babel-plugin-transform-runtime
</span><span class="hljs-keyword">babel-register</span></code></pre>
<hr>
<h2 id="articleHeader13">webpack 中如何使用 vue?</h2>
<p>既然本文的目标是vue的自定义模板工程，那么自然这里需要单独介绍一下webpack中vue相关的插件。</p>
<h3 id="articleHeader14">Vue2文件比较</h3>
<p>npm 安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save vue</span></code></pre>
<p>vue2 经过 2.2 版本升级后, 文件变成 8 个:</p>
<table>
<thead><tr>
<th colspan="2" align="center">UMD</th>
<th align="center">CommonJS</th>
<th align="center">ES Module</th>
</tr></thead>
<tbody>
<tr>
<td align="center">独立构建</td>
<td align="center">vue.js</td>
<td align="center">vue.common.js</td>
<td>vue.esm.js</td>
</tr>
<tr>
<td align="center">运行构建</td>
<td align="center">vue.runtime.js</td>
<td align="center">vue.runtime.common.js</td>
<td>vue.runtime.esm.js</td>
</tr>
</tbody>
</table>
<p>vue.min.js 和 vue.runtime.min.js 都是对应的压缩版。</p>
<ul><li><p>AMD:异步模块规范</p></li></ul>
<ol><li><p>没有单独提供 AMD 模块的版本，但是UMD版本中进行了包装，可以直接用作 AMD 模块，使用方法如下：</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="define([&quot;Vue&quot;],function(Vue) {
    function myFn() {
        ...
    }
    return myFn;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>define([<span class="hljs-string">"Vue"</span>],<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(Vue)</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFn</span><span class="hljs-params">()</span> </span>{
        ...
    }
    <span class="hljs-keyword">return</span> myFn;
});</code></pre>
<ul><li><p>CommonJS:<br>node中常用的模块规范，通过require引入模块，module.exports导出模块。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
function Vue$3() {
   ...
}
...
module.exports = Vue$3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code>...
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue</span>$3<span class="hljs-params">()</span> {</span>
   ...
}
...
<span class="hljs-function"><span class="hljs-keyword">module</span>.<span class="hljs-title">exports</span> =</span> Vue$<span class="hljs-number">3</span>;</code></pre>
<ul><li><p>UMD: 通用模块规范<br>兼容了AMD和CommonJS，同时还支持老式的“全局”变量规范：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function (global, factory) {
    typeof exports === 'object' &amp;&amp; typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' &amp;&amp; define.amd ? define(factory) :
    (global.Vue = factory());
}(this, (function () { 'use strict';
    ...
    function Vue$3() {
        ...
    }
    ...
    return Vue$3;
})));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span> (<span class="hljs-name">global</span>, factory) {
    typeof exports === <span class="hljs-symbol">'object</span>' &amp;&amp; typeof module !== <span class="hljs-symbol">'undefined</span>' ? module.exports = factory() :
    typeof define === <span class="hljs-symbol">'function</span>' &amp;&amp; define.amd ? define(<span class="hljs-name">factory</span>) :
    (<span class="hljs-name">global.Vue</span> = factory())<span class="hljs-comment">;</span>
}(<span class="hljs-name">this</span>, (<span class="hljs-name">function</span> () { <span class="hljs-symbol">'use</span> strict'<span class="hljs-comment">;</span>
    ...
    function Vue$3() {
        ...
    }
    ...
    return Vue$3<span class="hljs-comment">;</span>
})))<span class="hljs-comment">;</span></code></pre>
<ul><li><p>ES Module<br>ES6在语言标准的层面上，实现的模块功能。模块功能主要由两个命令构成：export和import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
function Vue$3() {
   ...
}
export default Vue$3;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>...
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Vue$3</span>(<span class="hljs-params"></span>) </span>{
   ...
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue$<span class="hljs-number">3</span>;</code></pre>
<p><strong>总结：</strong></p>
<ul>
<li><p>vue.js 和 vue.runtime.js 可以用于直接 CDN 引用；</p></li>
<li><p>vue.common.js和vue.runtime.common.js可以使用Webpack1 / Browserify 打包构建；</p></li>
<li><p>vue.esm.js和vue.runtime.esm.js可以使用Webpack2 / rollup 打包构建。</p></li>
</ul>
<p>vue有两种构建方式，独立构建和运行时构建。它们的区别独立构建前者包含模板编译器而运行构建不包含。模板编译器的职责是将模板字符串编译为纯 JavaScript 的渲染函数。如果你想要在组件中使用 template 选项，你就需要编译器。</p>
<ul>
<li><p>独立构建包含模板编译器并支持 template 选项。 它也依赖于浏览器的接口的存在，所以你不能使用它来为服务器端渲染。</p></li>
<li><p>运行时构建不包含模板编译器，因此不支持 template 选项，只能用 render 选项，但即使使用运行时构建，在单文件组件中也依然可以写模板，因为单文件组件的模板会在构建时预编译为 render 函数。运行时构建比独立构建要轻量30%，只有 17.14 Kb min+gzip大小。</p></li>
</ul>
<p>独立构建方式可以这样使用template选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
new Vue({
  template: `
    <div id=&quot;app&quot;>
      <h1>Basic</h1>
    </div>
  `
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">new</span> Vue({
  template: `<span class="javascript">
    &lt;div id=<span class="hljs-string">"app"</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Basic<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/div&gt;
  </span></span>`
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>这里我们使用ES Module规范，默认 NPM 包导出的是运行时构建。为了使用独立构建，在 webpack 配置中添加下面的别名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  alias: {
    'vue$': 'vue/dist/vue.esm.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">resolve</span>: {
  <span class="hljs-attribute">alias</span>: {
    <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>
  }
}</code></pre>
<h3 id="articleHeader15">vue-loader</h3>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev vue-loader vue-template-compiler" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> vue-loader vue-template-compiler</code></pre>
<p>vue-loader 依赖于 vue-template-compiler。</p>
<p>vue-loader 是一个 Webpack 的 loader，可以将用下面这个格式编写的 Vue 组件转换为 JavaScript 模块。这里有一些 vue-loader 提供的很酷的特性：</p>
<ul>
<li><p>ES2015 默认支持;</p></li>
<li><p>允许对 Vue 组件的组成部分使用其它 Webpack loaders，比如对 <code>&lt;style&gt;</code> 使用 SASS 和对 <code>&lt;template&gt;</code> 使用 Jade；</p></li>
<li><p>.vue 文件中允许自定义节点，然后使用自定义的 loader 处理他们；</p></li>
<li><p>把<code>&lt;style&gt; </code>和 <code>&lt;template&gt;</code> 中的静态资源当作模块来对待，并使用 Webpack loaders 进行处理；</p></li>
<li><p>对每个组件模拟出 CSS 作用域；</p></li>
<li><p>支持开发期组件的热重载。</p></li>
</ul>
<p>简而言之，编写 Vue.js 应用程序时，组合使用 Webpack 和 vue-loader 能带来一个现代，灵活并且非常强大的前端工作流程。</p>
<p>在 Webpack 中，所有的预处理器需要匹配对应的 loader。 vue-loader 允许你使用其它 Webpack loaders 处理 Vue 组件的某一部分。它会根据 lang 属性自动推断出要使用的 loaders。</p>
<p>上述我们提到extract-text-webpack-plugin插件提取css，这里说明一下.vue中style标签之间的样式提取的办法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' // <- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装
            })
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(&quot;app.css&quot;)
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-keyword">module</span>: {
    rules: [
      {
        test: <span class="hljs-regexp">/\.vue$/</span>,
        loader: <span class="hljs-string">'vue-loader'</span>,
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: <span class="hljs-string">'css-loader'</span>,
              fallback: <span class="hljs-string">'vue-style-loader'</span> <span class="hljs-comment">// &lt;- 这是vue-loader的依赖，所以如果使用npm3，则不需要显式安装</span>
            })
          }
        }
      }
    ]
  },
  plugins: [
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"app.css"</span>)
  ]
}</code></pre>
<h3 id="articleHeader16">pug 模板</h3>
<p>用过模板的都知道，熟悉了模板写起来快多了，大名鼎鼎的jade恐怕无人不知吧。pug是什么鬼？第一次听到的时候我也好奇了，然后查了一下才知道，Pug原名不叫Pug，原来是大名鼎鼎的jade，后来由于商标的原因，改为Pug，哈巴狗。以下是官方解释：</p>
<blockquote><p>it has been revealed to us that "Jade" is a registered trademark, and as a result a rename is needed. After some discussion among the maintainers, "Pug" has been chosen as the new name for this project.</p></blockquote>
<p>简单看了看还是原来jade熟悉的语法规则，果断在这个模板工程里面用上。</p>
<p>vue-loader里面对于模版的处理方式略有不同，因为大多数 Webpack 模版处理器（比如 pug-loader）会返回模版处理函数，而不是编译的 HTML 字符串，我们使用原始的 pug 替代 pug-loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install pug --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install pug --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;pug&quot;>
div
  h1 Hello world!
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;template lang=<span class="hljs-string">"pug"</span>&gt;
<span class="hljs-selector-tag">div</span>
  <span class="hljs-selector-tag">h1</span> Hello world!
&lt;/template&gt;</code></pre>
<blockquote><p>重要: 如果你使用 vue-loader@&lt;8.2.0， 你还需要安装 <code>template-html-loader</code>。</p></blockquote>
<h3 id="articleHeader17">PostCSS</h3>
<p>安装vue-loader的时候默认安装了postcss，由vue-loader处理的 CSS 输出，都是通过PostCSS进行作用域重写，你还可以为 PostCSS 添加自定义插件，例如<a href="https://github.com/postcss/autoprefixer" rel="nofollow noreferrer" target="_blank">autoprefixer</a>或者<a href="http://cssnext.io/" rel="nofollow noreferrer" target="_blank">CSSNext</a>。</p>
<p>在 webpack 工程中使用 postcss，我们需要下载 postcss-loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev postcss-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> postcss-loader</code></pre>
<h4>cssnext</h4>
<blockquote><p>cssnext 是一个 CSS transpiler，允许你使用最新的 CSS 语法。cssnext 把&nbsp;<a href="http://www.xanthir.com/b4Ko0" rel="nofollow noreferrer" target="_blank">新 CSS 规范</a>转换成兼容性更强的 CSS，所以不需要等待各种浏览器支持。</p></blockquote>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev postcss-cssnext" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> postcss-cssnext</code></pre>
<p>postcss.config.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    plugins: [
        require('postcss-cssnext')
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">module</span>.exports = {
    plugins: [
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'postcss-cssnext'</span>)
    ]
}</code></pre>
<p>webpack.config.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    module: {
        loaders: [
            {
                test:   /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>: {
        loaders: [
            {
                test:   <span class="hljs-regexp">/\.css$/</span>,
                use: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'postcss-loader'</span>]
            }
        ]
    }
}</code></pre>
<p>cssnext 依赖了autoprefixer，所以我们无需显式下载autoprefixer。更多关于postcss的插件可以看这里：<a href="https://github.com/postcss/postcss#plugins" rel="nofollow noreferrer" target="_blank">postcss plugins</a>。</p>
<p>这一部分我们学习了这些依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue
vue-loader 
vue-template-compiler
pug
postcss-loader
postcss-cssnext" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code>vue
vue-loader 
vue-<span class="hljs-keyword">template</span>-compiler
pug
postcss-loader
postcss-cssnext</code></pre>
<hr>
<h2 id="articleHeader18">webpack2 开启 eslint 校验</h2>
<p>规范自己的代码从ESlint开始。ESlint和webpack集成，在babel编译代码开始前，进行代码规范检测。这里我们使用<a href="https://github.com/feross/standard/blob/master/docs/RULES-zhcn.md" rel="nofollow noreferrer" target="_blank">javascript-style-standard</a>风格的校验。</p>
<p>主要依赖的几个包：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="eslint —— 基础包
eslint-loader —— webpack loader
babel-eslint —— 校验babel
eslint-plugin-html —— 提取并检验你的 .vue 文件中的 JavaScript
eslint-friendly-formatter —— 生成美化的报告格式

# javascript-style-standard 依赖的包
eslint-config-standard
eslint-plugin-import
eslint-plugin-node
eslint-plugin-promise
eslint-plugin-standard" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>eslint —— 基础包
eslint-loader —— webpack loader
babel-eslint —— 校验babel
eslint-plugin-html —— 提取并检验你的 .vue 文件中的 JavaScript
eslint-friendly-formatter —— 生成美化的报告格式

<span class="hljs-comment"># javascript-style-standard 依赖的包</span>
eslint-config-standard
eslint-plugin-import
eslint-plugin-<span class="hljs-keyword">node</span>
<span class="hljs-title">eslint-plugin-promise</span>
eslint-plugin-standard</code></pre>
<p>安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev eslint eslint-loader babel-eslint eslint-plugin-html eslint-friendly-formatter eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-node eslint-plugin-promise eslint-plugin-standard" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm install --<span class="hljs-keyword">save</span>-dev eslint eslint-loader babel-eslint eslint-<span class="hljs-keyword">plugin</span>-html eslint-friendly-formatter eslint-config-standard eslint-<span class="hljs-keyword">plugin</span>-import eslint-<span class="hljs-keyword">plugin</span>-node eslint-<span class="hljs-keyword">plugin</span>-node eslint-<span class="hljs-keyword">plugin</span>-promise eslint-<span class="hljs-keyword">plugin</span>-standard</code></pre>
<p>关于eslint的配置方式，比较多元化，具体可以看<a href="http://eslint.cn/docs/user-guide/configuring" rel="nofollow noreferrer" target="_blank">配置文档</a>：</p>
<ul>
<li><p>js注释</p></li>
<li><p>.eslintrc.*文件</p></li>
<li><p>package.json里面配置eslintConfig字段</p></li>
</ul>
<p>安装eslint-loader之后，我们可以在webpack配置中使用eslint加载器。webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
module: {
  loaders: [
    {
         test: /\.vue|js$/,
         enforce: 'pre',
         include: path.resolve(__dirname, 'src'),
         exclude: /node_modules/,
         use: [{
             loader: 'eslint-loader',
             options: {
                 formatter: require('eslint-friendly-formatter')
             }
         }]
    }
  ]
},
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>...
<span class="hljs-selector-tag">module</span>: {
  <span class="hljs-attribute">loaders</span>: [
    {
         test: /\.vue|js$/,
         enforce: <span class="hljs-string">'pre'</span>,
         include: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'src'</span>),
         exclude: /node_modules/,
         use: [{
             loader: <span class="hljs-string">'eslint-loader'</span>,
             options: {
                 formatter: <span class="hljs-built_in">require</span>(<span class="hljs-string">'eslint-friendly-formatter'</span>)
             }
         }]
    }
  ]
},
...</code></pre>
<p>此外，我们既可以在webpack配置文件中指定检测规则，也可以遵循最佳实践在一个专门的文件中指定检测规则，我们就采用后面的方式。<br>在根目录下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="touch .eslintrc.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">touch <span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span></code></pre>
<p>.eslintrc.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>module.exports = {
  roo<span class="hljs-variable">t:</span> true,
  parser: <span class="hljs-string">'babel-eslint'</span>,
  parserOption<span class="hljs-variable">s:</span> {
    sourceType: <span class="hljs-string">'module'</span>
  },
  <span class="hljs-keyword">en</span><span class="hljs-variable">v:</span> {
    browser: true
  },
  <span class="hljs-built_in">extend</span><span class="hljs-variable">s:</span> <span class="hljs-string">'standard'</span>,
  // required <span class="hljs-keyword">to</span> lint *.vue <span class="hljs-keyword">files</span>
  plugin<span class="hljs-variable">s:</span> [
    <span class="hljs-string">'html'</span>
  ],
  // <span class="hljs-built_in">add</span> your custom rules here
  rule<span class="hljs-variable">s:</span> {
    // allow paren-less arrow functions
    <span class="hljs-string">'arrow-parens'</span>: <span class="hljs-number">0</span>,
    // allow async-await
    <span class="hljs-string">'generator-star-spacing'</span>: <span class="hljs-number">0</span>,
    // allow debugger during development
    <span class="hljs-string">'no-debugger'</span>: process.env.NODE_ENV === <span class="hljs-string">'production'</span> ? <span class="hljs-number">2</span> : <span class="hljs-number">0</span>
  }
}</code></pre>
<p>这部份我们主要学习了一下eslint相关插件的含义和配置方法。</p>
<h2 id="articleHeader19">创建属于你的模板</h2>
<p>如果你对官方的模板不感兴趣，你可以自己fork下来然后进行修改（或者重新写一个），然后用 vue-cli 来调用。因为 vue-cli 可以直接拉取 git源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init username/repo my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">vue init username/repo <span class="hljs-keyword">my</span>-project</code></pre>
<p>这里我们参考vue-cli的模板工程自己写一个模板工程，主要是需要通过meta.*（js,json）进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  &quot;helpers&quot;: {
    &quot;if_or&quot;: function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  &quot;prompts&quot;: {
    &quot;name&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;required&quot;: true,
      &quot;message&quot;: &quot;Project name&quot;
    },
    &quot;version&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;required&quot;: false,
      &quot;message&quot;: &quot;Project version&quot;,
      &quot;default&quot;: &quot;1.0.0&quot;
    },
    &quot;description&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;required&quot;: false,
      &quot;message&quot;: &quot;Project description&quot;,
      &quot;default&quot;: &quot;A Vue.js project&quot;
    },
    &quot;author&quot;: {
      &quot;type&quot;: &quot;string&quot;,
      &quot;message&quot;: &quot;Author&quot;
    },
    &quot;router&quot;: {
      &quot;type&quot;: &quot;confirm&quot;,
      &quot;message&quot;: &quot;Install vue-router?&quot;
    },
    &quot;vuex&quot;: {
      &quot;type&quot;: &quot;confirm&quot;,
      &quot;message&quot;: &quot;Install vuex?&quot;
    }
  },
  &quot;completeMessage&quot;: &quot;To get started:\n\n  "{{"^inPlace"}}"cd "{{"destDirName"}}"\n  "{{"/inPlace"}}"npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/zhaomenghuan/vue-webpack-template&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-string">"helpers"</span>: {
    <span class="hljs-string">"if_or"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">v1, v2, options</span>) </span>{
      <span class="hljs-keyword">if</span> (v1 || v2) {
        <span class="hljs-keyword">return</span> options.fn(<span class="hljs-keyword">this</span>);
      }

      <span class="hljs-keyword">return</span> options.inverse(<span class="hljs-keyword">this</span>);
    }
  },
  <span class="hljs-string">"prompts"</span>: {
    <span class="hljs-string">"name"</span>: {
      <span class="hljs-string">"type"</span>: <span class="hljs-string">"string"</span>,
      <span class="hljs-string">"required"</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-string">"message"</span>: <span class="hljs-string">"Project name"</span>
    },
    <span class="hljs-string">"version"</span>: {
      <span class="hljs-string">"type"</span>: <span class="hljs-string">"string"</span>,
      <span class="hljs-string">"required"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-string">"message"</span>: <span class="hljs-string">"Project version"</span>,
      <span class="hljs-string">"default"</span>: <span class="hljs-string">"1.0.0"</span>
    },
    <span class="hljs-string">"description"</span>: {
      <span class="hljs-string">"type"</span>: <span class="hljs-string">"string"</span>,
      <span class="hljs-string">"required"</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-string">"message"</span>: <span class="hljs-string">"Project description"</span>,
      <span class="hljs-string">"default"</span>: <span class="hljs-string">"A Vue.js project"</span>
    },
    <span class="hljs-string">"author"</span>: {
      <span class="hljs-string">"type"</span>: <span class="hljs-string">"string"</span>,
      <span class="hljs-string">"message"</span>: <span class="hljs-string">"Author"</span>
    },
    <span class="hljs-string">"router"</span>: {
      <span class="hljs-string">"type"</span>: <span class="hljs-string">"confirm"</span>,
      <span class="hljs-string">"message"</span>: <span class="hljs-string">"Install vue-router?"</span>
    },
    <span class="hljs-string">"vuex"</span>: {
      <span class="hljs-string">"type"</span>: <span class="hljs-string">"confirm"</span>,
      <span class="hljs-string">"message"</span>: <span class="hljs-string">"Install vuex?"</span>
    }
  },
  <span class="hljs-string">"completeMessage"</span>: <span class="hljs-string">"To get started:\n\n  "{{"^inPlace"}}"cd "{{"destDirName"}}"\n  "{{"/inPlace"}}"npm install\n  npm run dev\n\nDocumentation can be found at https://github.com/zhaomenghuan/vue-webpack-template"</span>
};</code></pre>
<p>这里我们就是采用最简单的方式，对于vue-router、vuex的配置每个人习惯不一样，所以不写在模板工程里面。</p>
<p>然后使用vue-cli使用这个模板创建工程，没有安装vue-cli的执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --global vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> install --<span class="hljs-built_in">global</span> vue-cli</code></pre>
<p>然后创建工程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 创建一个基于 webpack 模板的新项目
vue init zhaomenghuan/vue-webpack-template my-project
# 安装依赖，走你
cd my-project
npm install
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-comment"># 创建一个基于 webpack 模板的新项目</span>
vue init zhaomenghuan/vue-webpack-template <span class="hljs-keyword">my</span>-project
<span class="hljs-comment"># 安装依赖，走你</span>
cd <span class="hljs-keyword">my</span>-project
npm install
npm <span class="hljs-built_in">run</span> dev</code></pre>
<blockquote><p>这里按照国际惯例安利一下本文的模板工程：<strong><a href="https://github.com/zhaomenghuan/vue-webpack-template" rel="nofollow noreferrer" target="_blank">vue-webpack-template</a></strong></p></blockquote>
<h2 id="articleHeader20">参考</h2>
<p><a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">webpack官方文档</a><br><a href="http://babeljs.io" rel="nofollow noreferrer" target="_blank">babel官方文档</a><br><a href="http://vue-loader.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-loader中文文档</a><br><a href="http://exploringjs.com/" rel="nofollow noreferrer" target="_blank">JavaScript books by Dr. Axel Rauschmayer</a><br><a href="http://wwsun.github.io/posts/new-in-es2016.html" rel="nofollow noreferrer" target="_blank">ES7新特性及ECMAScript标准的制定流程</a><br><a href="https://zhuanlan.zhihu.com/p/24224107" rel="nofollow noreferrer" target="_blank">如何写好.babelrc？Babel的presets和plugins配置解析</a><br><a href="https://segmentfault.com/q/1010000005596587">babel的polyfill和runtime的区别</a><br><a href="https://segmentfault.com/a/1190000008575829" target="_blank">webpack2集成eslint</a></p>
<p><span class="img-wrap"><img data-src="/img/bVMMoV?w=612&amp;h=384" src="https://static.alili.tech/img/bVMMoV?w=612&amp;h=384" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<blockquote><p>近期在segmentfault讲堂开设了一场关于<strong><a href="https://segmentfault.com/l/1500000009542402?r=bPqXdU">html5+ App开发工程化实践之路</a></strong>的讲座，欢迎前来围观：<a href="https://segmentfault.com/l/1500000009542402?r=bPqXdU" target="_blank">https://segmentfault.com/l/15...</a>。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从0到1搭建webpack2+vue2自定义模板详细教程

## 原文链接
[https://segmentfault.com/a/1190000009454172](https://segmentfault.com/a/1190000009454172)


---
title: '精益 React 学习指南 （Lean React）- 2.2 webpack' 
date: 2019-02-09 2:30:59
hidden: true
slug: jr7z99n3ttl
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">2.2 webpack</h1>
<p><span class="img-wrap"><img data-src="/img/bVxIfN" src="https://static.alili.tech/img/bVxIfN" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这一节中我们将系统的讲解 webpack ，包括：</p>
<ul>
<li>
<p>webpack 介绍</p>
<ul>
<li><p>webpack 是什么</p></li>
<li><p>为什么引入新的打包工具</p></li>
<li><p>webpack 核心思想</p></li>
</ul>
</li>
<li><p>webpack 安装</p></li>
<li>
<p>webpack 使用</p>
<ul>
<li><p>命令行调用</p></li>
<li><p>配置文件</p></li>
</ul>
</li>
<li>
<p>webpack 配置参数</p>
<ul>
<li><p>entry 和 output</p></li>
<li><p>单一入口</p></li>
<li><p>多个入口</p></li>
<li><p>多个打包目标</p></li>
</ul>
</li>
<li><p>webpack 支持 Jsx 和 Es6</p></li>
<li>
<p>webpack loaders</p>
<ul>
<li><p>loader 定义</p></li>
<li><p>loader 功能</p></li>
<li><p>loader 配置</p></li>
<li><p>使用 loader</p></li>
</ul>
</li>
<li><p>webpack 开发环境与生产环境</p></li>
<li><p>webpack 分割 vendor 代码和应用业务代码</p></li>
<li>
<p>webpack develop server</p>
<ul>
<li><p>安装 webpack-dev-server</p></li>
<li><p>启动 webpack-dev-server</p></li>
<li><p>代码监控</p></li>
<li><p>自动刷新</p></li>
<li><p>热加载 （hot module replacement)</p></li>
<li><p>在 webpack.config.js 中配置 webpack develop server</p></li>
</ul>
</li>
</ul>
<h2 id="articleHeader1">2.2.1 webpack 介绍</h2>
<h3 id="articleHeader2">webpack 是什么</h3>
<blockquote><p>webpack is a module bundler. webpack takes modules with dependencies and generates static assets representing those modules</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVxIk7" src="https://static.alili.tech/img/bVxIk7" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>webpack 是一个模块打包工具，输入为包含依赖关系的模块集，输出为打包合并的前端静态资源。在上一节的前端工程化中，已经介绍过，webpack 是同时支持 AMD 和 CommonJs 的模块定义方式，不仅如此，webpack 可以将任何前端资源视为模块，如 css，图片，文本。</p>
<h3 id="articleHeader3">为什么要引入新的打包工具</h3>
<p>在 webpack 出现之前，已经有了一些打包工具，如 Browserify, 那为什么不优化这些工具，而是重复造轮子？ </p>
<p><span class="img-wrap"><img data-src="/img/bVxImy" src="https://static.alili.tech/img/bVxImy" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>webpack 之前的打包工具工具功能单一，只能完成特定的任务，然而 web 前端工程是复杂的，一个 webapp 对于业务代码的要求可能有：</p>
<ol>
<li><p>代码可以分块，实现按需加载</p></li>
<li><p>首屏加载时间要尽量减少</p></li>
<li><p>需要集成一些第三方库</p></li>
</ol>
<p>对于模块打包工具，单一的支持 CommonJs 的打包在大型项目中是不够用的，为了满足一个大型项目的前端需求，那么一个打包工具应该包含一些这些功能：</p>
<ol>
<li><p>支持多个 bundler 输出 -&gt; 解决代码分块问题</p></li>
<li><p>异步加载 -&gt; 按需加载，优化首屏加载时间</p></li>
<li><p>可定制化 -&gt; 可以集成第三方库，可以定制化打包过程</p></li>
<li><p>其他资源也可以定义为模块</p></li>
</ol>
<p>webpack 的出现正式为了解决这些问题，在 webpack 中，提供了一下这些功能：</p>
<ol>
<li><p><strong>代码分块：</strong> webpack 有两种类型的模块依赖，一种是同步的，一种是异步的。在打包的过程中可以将代码输出为代码块（chunk），代码块可以实现按需加载。 异步加载的代码块通过分割点（spliting point）来确定。</p></li>
<li><p><strong>Loaders：</strong> Webpack 本身只会处理 Javascript，为了实现将其他资源也定义为模块，并转化为 Javascript， Webpack 定义 loaders , 不同的 loader 可以将对应的资源转化为 Javascript 模块。</p></li>
<li><p><strong>智能的模块解析：</strong> webpack 可以很容易将第三方库转化为模块集成到项目代码中，模块的依赖可以用表达式的方式（这在其他打包工具中是没有支持的），这种模块依赖叫做动态模块依赖。</p></li>
<li><p><strong>插件系统：</strong> webpack 的可定制化在于其插件系统，其本身的很多功能也是通过插件的方式实现，插件系统形成了 webpack 的生态，是的可以使用很多开源的第三方插件。</p></li>
</ol>
<h3 id="articleHeader4">webpack 核心思想</h3>
<p>webpack 的三个核心：</p>
<ol>
<li><p><strong>万物皆模块：</strong>在 webpack 的世界中，除了 Javascript，其他任何资源都可以当做模块的方式引用</p></li>
<li><p><strong>按需加载：</strong> webapp 的优化关键在于代码体积，当应用体积增大，实现代码的按需加载是刚需，这也是 webpack 出现的根本原因</p></li>
<li><p><strong>可定制化：</strong> 任何一个工具都不可能解决所有问题，提供解决方案才是最可行的，webpack 基于可定制化的理念构建，通过插件系统，配置文件，可以实现大型项目的定制需求。</p></li>
</ol>
<h2 id="articleHeader5">2.2.2 安装配置</h2>
<h3 id="articleHeader6">第一步：Node.js</h3>
<p>webpack 是 Node 实现，首先需要到 <a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">http://nodejs.org/</a> 下载安装最新版本的 Node.js</p>
<h3 id="articleHeader7">第二步：webpack-cli</h3>
<p>Node.js 安装好过后，打开命令行终端，通过 npm 命令安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// -g 参数表示全局安装
$ npm install webpack -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code class="shell"><span class="hljs-comment">// -g 参数表示全局安装</span>
$ npm install webpack -g</code></pre>
<h3 id="articleHeader8">第三步：新建空前端项目</h3>
<p>为了使用 webpack，先新建一个空前端项目，创建一个目录，目录结构如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── index.html      // 入口 HTML  
├── dist            // dist 目录放置编译过后的文件文件
└── src             // src 目录放置源文件
    └── index.js    // 入口 js " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">.
├── index<span class="hljs-selector-class">.html</span>      <span class="hljs-comment">// 入口 HTML  </span>
├── dist            <span class="hljs-comment">// dist 目录放置编译过后的文件文件</span>
└── src             <span class="hljs-comment">// src 目录放置源文件</span>
    └── index<span class="hljs-selector-class">.js</span>    <span class="hljs-comment">// 入口 js </span></code></pre>
<p>其中 html 内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <title>Hello React!</title>
</head>
<body>
  <div id=&quot;AppRoot&quot;></div>
  <script src=&quot;dist/index.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Hello React!<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"AppRoot"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>index.js 内容为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert('hello world webpack');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;">alert('hello world webpack');</code></pre>
<h3 id="articleHeader9">第四步：在项目中安装 webpack</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 初始化 package.json,  根据提示填写 package.json 的相关信息
$ npm init

// 下载 webpack 依赖 
// --save-dev 表示将依赖添加到 package.json 中的 'devDependencies' 对象中
$  npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code class="shell">
<span class="hljs-comment">// 初始化 package.json,  根据提示填写 package.json 的相关信息</span>
$ npm init

<span class="hljs-comment">// 下载 webpack 依赖 </span>
<span class="hljs-comment">// --save-dev 表示将依赖添加到 package.json 中的 'devDependencies' 对象中</span>
$  npm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h3 id="articleHeader10">* 第五步：Develop Server 工具 （可选）</h3>
<p>dev server 可以实现一个基于 node + express 的前端 server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install webpack-dev-server --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm install webpack-<span class="hljs-built_in">dev</span>-server --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h2 id="articleHeader11">2.2.3 webpack 使用</h2>
<h3 id="articleHeader12">命令行调用</h3>
<p>在之前创建的目录下执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack src/index.js dist/index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code class="shell" style="word-break: break-word; white-space: initial;">$ webpack src/<span class="hljs-keyword">index</span>.js dist/<span class="hljs-keyword">index</span>.js</code></pre>
<p>执行成功过后会出现如下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hash: 9a8e7e83864a07c0842f
Version: webpack 1.13.1
Time: 37ms
   Asset     Size  Chunks             Chunk Names
index.js  1.42 kB       0  [emitted]  main
   [0] ./src/index.js 29 bytes {0} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code class="shell">Hash: 9a8e7e83864a07c0842f
Version: webpack 1.13.1
<span class="hljs-keyword">Time:</span> 37ms
   Asset     Size  Chunks             Chunk Names
index.js  1.42 kB       0  [emitted]  main
   [0] ./src/index.js 29 bytes {0} [built]</code></pre>
<p>可以查看 dist/index.js 的编译结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/ (function(modules) { // webpackBootstrap
//           .......... UMD 定义内容
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {
    // index.js 的内容被打包进来
    alert('hello world webpack');

/***/ }
/******/ ]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/******/</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">modules</span>) </span>{ <span class="hljs-comment">// webpackBootstrap</span>
<span class="hljs-comment">//           .......... UMD 定义内容</span>
<span class="hljs-comment">/******/</span> })
<span class="hljs-comment">/************************************************************************/</span>
<span class="hljs-comment">/******/</span> ([
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-comment">// index.js 的内容被打包进来</span>
    alert(<span class="hljs-string">'hello world webpack'</span>);

<span class="hljs-comment">/***/</span> }
<span class="hljs-comment">/******/</span> ]);</code></pre>
<p>在浏览器中打开 index.html ：</p>
<p><span class="img-wrap"><img data-src="/img/bVxHxx" src="https://static.alili.tech/img/bVxHxx" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">配置文件</h3>
<p>以命令执行的方式需要填写很长的参数，所以 webpack 提供了通过配置的方式执行，在项目目录下创建 webpack.config.js 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack')
module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/index.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.js'</span>
  }
}</code></pre>
<p>执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>webpack</code></pre>
<p>会和通过命令执行有同样的输出</p>
<h2 id="articleHeader14">2.2.4 webpack 配置</h2>
<h3 id="articleHeader15">entry 和 output</h3>
<p>webpack 的配置中主要的两个配置 key 是，entry 和 output。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: [String | Array | Object], // 入口模块
    output: {
        path: String,      // 输出路径
        filename: String   // 输出名称或名称 pattern
        publicPath: String // 指定静态资源的位置
        ...                // 其他配置
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">entry</span>: [<span class="hljs-built_in">String</span> | <span class="hljs-built_in">Array</span> | <span class="hljs-built_in">Object</span>], <span class="hljs-comment">// 入口模块</span>
    output: {
        <span class="hljs-attr">path</span>: <span class="hljs-built_in">String</span>,      <span class="hljs-comment">// 输出路径</span>
        filename: <span class="hljs-built_in">String</span>   <span class="hljs-comment">// 输出名称或名称 pattern</span>
        publicPath: <span class="hljs-built_in">String</span> <span class="hljs-comment">// 指定静态资源的位置</span>
        ...                <span class="hljs-comment">// 其他配置</span>
    }
}</code></pre>
<h3 id="articleHeader16">单一入口</h3>
<p>如果只有一个入口文件，可以有如下几种配置方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一种 String 
{
  entry: './src/index.js',
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}

// 第二种 Array 
{
  entry: ['./src/index.js'],
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}

// 第三种 Object
{
  entry: {
    index: './src/index.js',
  },
  output: {
    path: './dist/',
    filename: 'index.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 第一种 String </span>
{
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/index.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.js'</span>
  }
}

<span class="hljs-comment">// 第二种 Array </span>
{
  <span class="hljs-attr">entry</span>: [<span class="hljs-string">'./src/index.js'</span>],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.js'</span>
  }
}

<span class="hljs-comment">// 第三种 Object</span>
{
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">index</span>: <span class="hljs-string">'./src/index.js'</span>,
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'index.js'</span>
  }
}</code></pre>
<h3 id="articleHeader17">多个入口文件</h3>
<p>当存在多个入口时 ，可以使用 Array 的方式，比如依赖第三方库 bootstrap ，最终 bootstrap 会被追加到打包好的 index.js 中，数组中的最后一个会被 export。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  entry: ['./src/index.js', './vendor/bootstrap.min.js'],
  output: {
    path: './dist',
    filename: &quot;index.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">entry</span>: [<span class="hljs-string">'./src/index.js'</span>, <span class="hljs-string">'./vendor/bootstrap.min.js'</span>],
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"index.js"</span>
  }
}</code></pre>
<p>最终的输出结果如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    __webpack_require__(1);

    // export 最后一个
    module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

    alert('hello world webpack');

/***/ },
/* 2 */
/***/ function(module, exports) {
    // bootstrap 的内容被追加到模块中
    console.log('bootstrap file');


/***/ }
/******/ ])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/******/</span> ([
<span class="hljs-comment">/* 0 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports, __webpack_require__</span>) </span>{

    __webpack_require__(<span class="hljs-number">1</span>);

    <span class="hljs-comment">// export 最后一个</span>
    <span class="hljs-built_in">module</span>.exports = __webpack_require__(<span class="hljs-number">2</span>);


<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 1 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{

    alert(<span class="hljs-string">'hello world webpack'</span>);

<span class="hljs-comment">/***/</span> },
<span class="hljs-comment">/* 2 */</span>
<span class="hljs-comment">/***/</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">module, exports</span>) </span>{
    <span class="hljs-comment">// bootstrap 的内容被追加到模块中</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bootstrap file'</span>);


<span class="hljs-comment">/***/</span> }
<span class="hljs-comment">/******/</span> ])</code></pre>
<h3 id="articleHeader18">多个打包目标</h3>
<p>上面的例子中都是打包出一个 index.js 文件，如果项目有多个页面，那么需要打包出多个文件，webpack 可以用对象的方式配置多个打包文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  entry: {
    index: './src/index.js',
    a: './src/a.js'
  },
  output: {
    path: './dist/',
    filename: '[name].js' 
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">index</span>: <span class="hljs-string">'./src/index.js'</span>,
    <span class="hljs-attr">a</span>: <span class="hljs-string">'./src/a.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span> 
  }
}</code></pre>
<p>最终会打包出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── a.js
└── index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">.
├── <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.js</span>
└── index.js</code></pre>
<p><strong>文件名称 pattern</strong></p>
<ul>
<li><p><code>[name]</code> entry 对应的名称</p></li>
<li><p><code>[hash]</code> webpack 命令执行结果显示的 Hash 值</p></li>
<li><p><code>[chunkhash]</code> chunk 的 hash</p></li>
</ul>
<p>为了让编译的结果名称是唯一的，可以利用 hash 。</p>
<h2 id="articleHeader19">2.2.5 webpack 支持 Jsx</h2>
<p>现在我们已经可以使用 webpack 来打包基于 CommonJs 的 Javascript 模块了，但是还没法解析 JSX 语法和 Es6 语法。下面我们将利用 Babel 让 webpack 能够解析 Es6 和 Babel</p>
<h3 id="articleHeader20">第一步：npm install 依赖模块</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// babel 相关的模块
$ npm install babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-polyfill --save-dev

// react 相关的模块
$ npm install react react-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code class="shell">// <span class="hljs-keyword">babel </span>相关的模块
$ npm install <span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-preset-es2015 </span><span class="hljs-keyword">babel-preset-stage-0 </span><span class="hljs-keyword">babel-preset-react </span><span class="hljs-keyword">babel-polyfill </span>--save-dev

// react 相关的模块
$ npm install react react-dom --save</code></pre>
<h3 id="articleHeader21">第二步：webpack.config.js 中添加 babel loader 配置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">index</span>: <span class="hljs-string">'./src/index.js'</span>,
        <span class="hljs-attr">a</span>: <span class="hljs-string">'./src/a.js'</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
            <span class="hljs-attr">query</span>: {
                <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'stage-0'</span>, <span class="hljs-string">'react'</span>]
            }
        }]
    }
}</code></pre>
<h3 id="articleHeader22">第三步: 修改 index.js 为 React 的语法</h3>
<p>src/index.js 内容改为:</p>
<blockquote><p>Es6 的知识在后面的章节中讲解，目前我们暂时以 Es5 的方式来写，但是配置已经支持了 Es6 的编译，熟悉 Es6 的读者也可以直接写 Es6</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过 require 的方式依赖 React，ReactDOM
var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
  render: function render() {
    return <div>Hello {this.props.name}</div>;
  }
});

ReactDOM.render(
  <Hello name=&quot;World&quot; />,
  document.getElementById('AppRoot')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">// 通过 require 的方式依赖 React，ReactDOM
var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
  render: function render() {
    return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>;
  }
});

ReactDOM.render(
  <span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"World"</span> /&gt;</span>,
  document.getElementById('AppRoot')
);</code></pre>
<h3 id="articleHeader23">第四步：运行 webpack</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>webpack</code></pre>
<p>执行结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hash: ae2a037c191c18195b6a
Version: webpack 1.13.1
Time: 1016ms
   Asset     Size  Chunks             Chunk Names
    a.js  1.42 kB       0  [emitted]  a
index.js   700 kB       1  [emitted]  index
    + 169 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code class="shell">Hash: ae2a037c191c18195b6a
Version: webpack 1.13.1
<span class="hljs-keyword">Time:</span> 1016ms
   Asset     Size  Chunks             Chunk Names
    a.js  1.42 kB       0  [emitted]  a
index.js   700 kB       1  [emitted]  index
    + 169 hidden modules</code></pre>
<p>浏览器中打开 index.html 会显示 <strong>Hello World</strong></p>
<h2 id="articleHeader24">2.2.6 webpack loaders</h2>
<p>在配置 JSX 的过程中，使用到了 loader， 前面已经介绍过 webpack 的核心功能包含 loader，通过 loader 可以将任意资源转化为 javascript 模块。</p>
<h3 id="articleHeader25">loader 定义</h3>
<blockquote><p>Loaders are transformations that are applied on a resource file of your app.<br>(Loaders 是应用中源码文件的编译转换器)</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVydVK" src="https://static.alili.tech/img/bVydVK" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>也就是说在 webpack 中，通过 loader 可以实现 JSX 、Es6、CoffeeScript 等的转换，</p>
<h3 id="articleHeader26">loader 功能</h3>
<ol>
<li><p>loader 管道：在同一种类型的源文件上，可以同时执行多个 loader ， loader 的执行方式可以类似管道的方式，管道执行的方向为从右到左。</p></li>
<li><p>loader 可以支持同步和异步</p></li>
<li><p>loader 可以接收配置参数</p></li>
<li><p>loader 可以通过正则表达式或者文件后缀指定特定类型的源文件</p></li>
<li><p>插件可以提供给 loader 更多功能</p></li>
<li><p>loader 除了做文件转换以外，还可以创建额外的文件</p></li>
</ol>
<h3 id="articleHeader27">loader 配置</h3>
<p>新增 loader 可以在 webpack.config.js 的 <code>module.loaders</code> 数组中新增一个 loader 配置。</p>
<p>一个 loader 的配置为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // 通过扩展名称和正则表达式来匹配资源文件
    test: String ,          
    // 匹配到的资源会应用 loader， loader 可以为 string 也可以为数组
    loader: String | Array
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-comment">// 通过扩展名称和正则表达式来匹配资源文件</span>
    test: <span class="hljs-built_in">String</span> ,          
    <span class="hljs-comment">// 匹配到的资源会应用 loader， loader 可以为 string 也可以为数组</span>
    loader: <span class="hljs-built_in">String</span> | <span class="hljs-built_in">Array</span>
}</code></pre>
<p>感叹号和数组可以定义 loader 管道:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    module: {
        loaders: [
            { test: /\.jade$/, loader: &quot;jade&quot; },
            // => .jade 文件应用  &quot;jade&quot; loader  

            { test: /\.css$/, loader: &quot;style!css&quot; },
            { test: /\.css$/, loaders: [&quot;style&quot;, &quot;css&quot;] },
            // => .css 文件应用  &quot;style&quot; 和 &quot;css&quot; loader  
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.jade$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">"jade"</span> },
            <span class="hljs-comment">// =&gt; .jade 文件应用  "jade" loader  </span>

            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loader</span>: <span class="hljs-string">"style!css"</span> },
            { <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-attr">loaders</span>: [<span class="hljs-string">"style"</span>, <span class="hljs-string">"css"</span>] },
            <span class="hljs-comment">// =&gt; .css 文件应用  "style" 和 "css" loader  </span>
        ]
    }
}</code></pre>
<p>loader 可以配置参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    module: {
        loaders: [
            // => url-loader 配置  mimetype=image/png 参数
            { 
                test: /\.png$/, 
                loader: &quot;url-loader?mimetype=image/png&quot; 
            }, {
                test: /\.png$/,
                loader: &quot;url-loader&quot;,
                query: { mimetype: &quot;image/png&quot; }
            }

        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [
            <span class="hljs-comment">// =&gt; url-loader 配置  mimetype=image/png 参数</span>
            { 
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.png$/</span>, 
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"url-loader?mimetype=image/png"</span> 
            }, {
                <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.png$/</span>,
                <span class="hljs-attr">loader</span>: <span class="hljs-string">"url-loader"</span>,
                <span class="hljs-attr">query</span>: { <span class="hljs-attr">mimetype</span>: <span class="hljs-string">"image/png"</span> }
            }

        ]
    }
}</code></pre>
<h3 id="articleHeader28">使用 loader</h3>
<h4>第一步: 安装</h4>
<p>loader 和 webpack 一样都是 Node.js 实现，发布到 npm 当中，需要使用 loader 的时候，只需要</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install xx-loader --save-dev

// eg css loader
$ npm install css-loader style-loader --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code class="shell">$ npm install xx-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>

<span class="hljs-comment">// eg css loader</span>
$ npm install css-loader style-loader --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<h4>第二步：修改配置</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        index: './src/index.js',
        a: './src/a.js'
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.css$/, 
            loader: &quot;style-loader!css-loader&quot; 
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">index</span>: <span class="hljs-string">'./src/index.js'</span>,
        <span class="hljs-attr">a</span>: <span class="hljs-string">'./src/a.js'</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
            <span class="hljs-attr">query</span>: {
                <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'stage-0'</span>, <span class="hljs-string">'react'</span>]
            }
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, 
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader!css-loader"</span> 
        }]
    }
}</code></pre>
<h4>第三步：使用</h4>
<p>前面我们已经使用过 jsx loader 了， loader 的使用方式有多种</p>
<ol>
<li><p>在配置文件中配置</p></li>
<li><p>显示的通过 require 调用</p></li>
<li><p>命令行调用</p></li>
</ol>
<blockquote><p>显示的调用 require 会增加模块的耦合度，应尽量避免这种方式</p></blockquote>
<p>以 css-loader 为例子，在项目 src 下面创建一个 css</p>
<p>src/style.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
    background: red;
    color: white;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">background</span>: red;
    <span class="hljs-attribute">color</span>: white;
}</code></pre>
<p>修改 webpack 配置 entry 添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
    index: ['./src/index.js', './src/style.css']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">entry: {
    <span class="hljs-attr">index</span>: [<span class="hljs-string">'./src/index.js'</span>, <span class="hljs-string">'./src/style.css'</span>]
}</code></pre>
<p>执行 webpack 命令然后打开 index.html 会看到页面背景被改为红色。</p>
<p>最终的编译结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="....
function(module, exports, __webpack_require__) {
    exports = module.exports = __webpack_require__(171)();
    exports.push([module.id, &quot;\nbody {\n background: red;\n color: white;\n}\n&quot;, &quot;&quot;]);
}
...." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">....
function(<span class="hljs-built_in">module</span>, exports, __webpack_require__) {
    exports = <span class="hljs-built_in">module</span>.exports = __webpack_require__(<span class="hljs-number">171</span>)();
    exports.push([<span class="hljs-built_in">module</span>.id, <span class="hljs-string">"\nbody {\n background: red;\n color: white;\n}\n"</span>, <span class="hljs-string">""</span>]);
}
....</code></pre>
<p>可以看到 css 被转化为了 javascript, 在页面中并非调用 <code>&lt;link rel="stylesheet" href=""&gt;</code> 的方式， 而是使用 inline 的 <code>&lt;style&gt;.....&lt;/style&gt;</code> </p>
<p>另外一种方法是直接 require， 修改 src/index.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var css = require(&quot;css!./style.css&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> css = <span class="hljs-built_in">require</span>(<span class="hljs-string">"css!./style.css"</span>);</code></pre>
<p>编译结果相同。</p>
<h2 id="articleHeader29">2.2.7 webpack 开发环境与生产环境</h2>
<p>前端开发环境通常分为两种，开发环境和生成环境，在开发环境中，可能我们需要日志输出，sourcemap ，错误报告等功能，在生成环境中，需要做代码压缩，hash 值生成。两种环境在其他的一些配置上也可能不同。 </p>
<p>所以为了区分，我们可以创建两个文件：</p>
<ul>
<li><p>webpack.config.js      // 开发环境</p></li>
<li><p>webpack.config.prod.js // 生产环境</p></li>
</ul>
<p>生产环境 build 用如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --config webpack.config.prod.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell" style="word-break: break-word; white-space: initial;">webpack --config webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.js</span></code></pre>
<p>在本章深入 webpack 小节中会更多的介绍生产环境中的优化</p>
<h2 id="articleHeader30">2.2.8 webpack 插件</h2>
<p>webpack 提供插件机制，可以对每次 build 的结果进行处理。配置 plugin 的方法为在 webpack.config.js 中添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
   new BellOnBundlerErrorPlugin()
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">plugins</span>: [
   <span class="hljs-keyword">new</span> BellOnBundlerErrorPlugin()
  ]
}</code></pre>
<p>plugin 也是一个 npm 模块，安装一个 plugin ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install bell-on-bundler-error-plugin --save-dev " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> bell-<span class="hljs-keyword">on</span>-bundler-<span class="hljs-keyword">error</span>-<span class="hljs-keyword">plugin</span> <span class="hljs-comment">--save-dev </span></code></pre>
<h2 id="articleHeader31">2.2.9 webpack 分割 vendor 代码和应用业务代码</h2>
<p>在上面的 jsx 配置中，我们将 React 和 ReactDOM 一起打包进了项目代码。为了实现业务代码和第三方代码的分离，我们可以利用 <br>CommonsChunkPlugin 插件.</p>
<p>修改 webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    entry: {
        index: './src/index.js',
        a: './src/a.js',
        // 第三方包
        vendor: [
          'react',
          'react-dom'
        ]
    },
    output: {
        path: './dist/',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.css$/, 
            loader: &quot;style-loader!css-loader&quot; 
        }]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */&quot;vendor&quot;, /* filename= */&quot;vendor.bundle.js&quot;)
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">entry</span>: {
        <span class="hljs-attr">index</span>: <span class="hljs-string">'./src/index.js'</span>,
        <span class="hljs-attr">a</span>: <span class="hljs-string">'./src/a.js'</span>,
        <span class="hljs-comment">// 第三方包</span>
        vendor: [
          <span class="hljs-string">'react'</span>,
          <span class="hljs-string">'react-dom'</span>
        ]
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>
    },
    <span class="hljs-attr">module</span>: {
        <span class="hljs-attr">loaders</span>: [{
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel'</span>,
            <span class="hljs-attr">query</span>: {
                <span class="hljs-attr">presets</span>: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'stage-0'</span>, <span class="hljs-string">'react'</span>]
            }
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>, 
            <span class="hljs-attr">loader</span>: <span class="hljs-string">"style-loader!css-loader"</span> 
        }]
    },
    <span class="hljs-attr">plugins</span>: [
      <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-comment">/* chunkName= */</span><span class="hljs-string">"vendor"</span>, <span class="hljs-comment">/* filename= */</span><span class="hljs-string">"vendor.bundle.js"</span>)
    ]
}</code></pre>
<p>执行 webpack 命令，输出日志：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hash: f1256dc00b9d4bde8f7f
Version: webpack 1.13.1
Time: 1459ms
           Asset       Size  Chunks             Chunk Names
            a.js  109 bytes       0  [emitted]  a
        index.js    10.9 kB       1  [emitted]  index
vendor.bundle.js     702 kB       2  [emitted]  vendor
   [0] multi vendor 40 bytes {2} [built]
   [0] multi index 40 bytes {1} [built]
    + 173 hidden modules" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell"><span class="hljs-symbol">Hash:</span> f1256dc<span class="hljs-number">00b</span>9d<span class="hljs-number">4b</span>de<span class="hljs-number">8f</span><span class="hljs-number">7f</span>
<span class="hljs-symbol">Version:</span> webpack <span class="hljs-number">1</span>.<span class="hljs-number">13</span>.<span class="hljs-number">1</span>
<span class="hljs-symbol">Time:</span> <span class="hljs-number">1459</span>ms
           Asset       Size  <span class="hljs-keyword">Chunks </span>            Chunk Names
            a.<span class="hljs-keyword">js </span> <span class="hljs-number">109</span> <span class="hljs-keyword">bytes </span>      <span class="hljs-number">0</span>  [emitted]  a
        index.<span class="hljs-keyword">js </span>   <span class="hljs-number">10</span>.<span class="hljs-number">9</span> kB       <span class="hljs-number">1</span>  [emitted]  index
vendor.<span class="hljs-keyword">bundle.js </span>    <span class="hljs-number">702</span> kB       <span class="hljs-number">2</span>  [emitted]  vendor
   [<span class="hljs-number">0</span>] <span class="hljs-keyword">multi </span>vendor <span class="hljs-number">40</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">2</span>} [<span class="hljs-keyword">built]
</span>   [<span class="hljs-number">0</span>] <span class="hljs-keyword">multi </span>index <span class="hljs-number">40</span> <span class="hljs-keyword">bytes </span>{<span class="hljs-number">1</span>} [<span class="hljs-keyword">built]
</span>    + <span class="hljs-number">173</span> hidden modules</code></pre>
<p>index.js 体积变小了，多出了 vendor.bundle.js</p>
<h2 id="articleHeader32">2.2.10 webpack develop server</h2>
<p>在前端开发的过程中，通常需要启动一个服务器，把开发打包好的前端代码放在服务器上，通过访问服务器访问并测试（因为可以有些情况需要 ajax 请求）。 webpack 提供了一个机遇 <strong>node.js Express</strong> 的服务器 - <strong>webpack-dev-server</strong> 来帮助我们简化服务器的搭建，并提供服务器资源访问的一些简单配置。</p>
<h3 id="articleHeader33">安装 webpack-dev-server</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install  webpack-dev-server -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="shell" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span>  webpack-dev-<span class="hljs-keyword">server</span> -g</code></pre>
<h3 id="articleHeader34">启动 webpack-dev-server</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --content-base ./" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code class="shell" style="word-break: break-word; white-space: initial;">$ webpack-dev-server <span class="hljs-comment">--content-base ./</span></code></pre>
<p><code>--content-base ./</code> 参数表示将当前目录作为 server 根目录。 命令启动过后，会在 8080 端口启动一个 http 服务，通过访问 <code>http://localhost:8080/index.html</code> 可以访问 index.html 内容。 </p>
<p>如果访问提示报错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught ReferenceError: webpackJsonp is not defined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Uncaught <span class="hljs-built_in">ReferenceError</span>: webpackJsonp is not defined</code></pre>
<p>原因是 html 中没有引用 <code>vendor.bundle.js</code>, 修改 html ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- vendor 必须先于 index.js -->
<script src=&quot;dist/vendor.bundle.js&quot;></script>
<script src=&quot;dist/index.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- vendor 必须先于 index.js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/vendor.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/index.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>修改 index.html 过后可以看到正确结果</p>
<h3 id="articleHeader35">代码监控</h3>
<p>webpack-dev-server 除了提供 server 服务以外， 还会监控源文件的修改，如果源文件改变了，会调用 webpack 重新打包</p>
<p>修改 style.css 中的内容为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body {
 background: whitesmoke;
 color: #333;
 font-size: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span> {
 <span class="hljs-attribute">background</span>: whitesmoke;
 <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
 <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<p>可以看到输出以下日志：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  [168] ./~/react/lib/renderSubtreeIntoContainer.js 466 bytes {2} [built]
webpack: bundle is now VALID.
webpack: bundle is now INVALID.
Hash: cc7d7720b1a0fcbef972
Version: webpack 1.13.0
Time: 76ms
chunk    {0} a.js (a) 32 bytes {2}
     + 1 hidden modules
chunk    {1} index.js (index) 10.3 kB {2}
  [170] ./~/css-loader!./src/style.css 230 bytes {1} [built]
     + 5 hidden modules
chunk    {2} vendor.bundle.js (vendor) 665 kB
     + 168 hidden modules
webpack: bundle is now VALID." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">  [<span class="hljs-number">168</span>] ./~/react/lib/renderSubtreeIntoContainer<span class="hljs-selector-class">.js</span> <span class="hljs-number">466</span> bytes {<span class="hljs-number">2</span>} [built]
webpack: bundle is now VALID.
webpack: bundle is now INVALID.
Hash: cc7d7720b1a0fcbef972
Version: webpack <span class="hljs-number">1.13</span>.<span class="hljs-number">0</span>
Time: <span class="hljs-number">76ms</span>
chunk    {<span class="hljs-number">0</span>} <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.js</span> (a) <span class="hljs-number">32</span> bytes {<span class="hljs-number">2</span>}
     + <span class="hljs-number">1</span> hidden modules
chunk    {<span class="hljs-number">1</span>} index<span class="hljs-selector-class">.js</span> (index) <span class="hljs-number">10.3</span> kB {<span class="hljs-number">2</span>}
  [<span class="hljs-number">170</span>] ./~/css-loader!./src/style<span class="hljs-selector-class">.css</span> <span class="hljs-number">230</span> bytes {<span class="hljs-number">1</span>} [built]
     + <span class="hljs-number">5</span> hidden modules
chunk    {<span class="hljs-number">2</span>} vendor<span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span> (vendor) <span class="hljs-number">665</span> kB
     + <span class="hljs-number">168</span> hidden modules
webpack: bundle is now VALID.</code></pre>
<p>这个时候说明代码已经修改了，但是这个时候刷新浏览器过后，背景是没有改变的，原因是 webpack-dev-server 的打包结果是放在内存的，查看 dist/index.js 的内容实际上是没有改变的，那如何访问内存中的打包内容呢？</p>
<p>修改 webpack.config.js 的 output.publicPath:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  output: {
      path: './dist/',
      filename: '[name].js',
      publicPath: '/dist' 
      // webpack-dev-server 启动目录是  `/`, `/dist` 目录是打包的目标目录相对于启动目录的路径
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  output: {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/'</span>,
      <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].js'</span>,
      <span class="hljs-attr">publicPath</span>: <span class="hljs-string">'/dist'</span> 
      <span class="hljs-comment">// webpack-dev-server 启动目录是  `/`, `/dist` 目录是打包的目标目录相对于启动目录的路径</span>
  },</code></pre>
<p>重新启动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ ctrl + c 结束进程
$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>ctrl + c 结束进程
<span class="hljs-variable">$ </span>webpack-dev-server</code></pre>
<p>修改 style.css 再刷新页面，修改的内容会反映出来。</p>
<h3 id="articleHeader36">自动刷新</h3>
<p>上面的配置已经能做到自动监控代码，每次修改完代码，刷新浏览器就可以看到最新结果，但是 webpack-dev-server 还提供了自动刷新功能，有两种模式。</p>
<p><strong>Iframe 模式</strong></p>
<p>修改访问的路径： <code>http://localhost:8080/index.html</code> -&gt; <code>http://localhost:8080/webpack-dev-server/index.html</code> 。这个时候每次修改代码，打包完成过后都会自动刷新页面。</p>
<ul>
<li><p>不需要额外配置，只用修改路径</p></li>
<li><p>应用被嵌入了一个 iframe 内部，页面顶部可以展示打包进度信息</p></li>
<li><p>因为 iframe 的关系，如果应用有多个页面，无法看到当前应用的 url 信息</p></li>
</ul>
<p><strong>inline 模式</strong></p>
<p>启动 webpack-dev-server 的时候添加 <code>--inline</code> 参数</p>
<ul>
<li><p>需要添加 <code>--inline</code> 配置参数</p></li>
<li><p>没有顶部信息提示条，提示信息在控制台中展现</p></li>
</ul>
<h3 id="articleHeader37">热加载 （hot module replacement)</h3>
<p>webpack-dev-server 还提供了模块热加载的方式，在不刷新浏览器的条件下，应用最新的代码更新，启动 webpack-dev-server 的时候添加 <code>--inline --hot</code> 参数就可以体验。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server --inline --hot" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code class="shell" style="word-break: break-word; white-space: initial;"><span class="hljs-comment">$</span> <span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span></code></pre>
<p>修改代码在浏览器控制台中会看到这样的日志输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[HMR] Waiting for update signal from WDS...
vendor.bundle.js:670 [WDS] Hot Module Replacement enabled.
2vendor.bundle.js:673 [WDS] App updated. Recompiling...
vendor.bundle.js:738 [WDS] App hot update...
vendor.bundle.js:8152 [HMR] Checking for updates on the server...
vendor.bundle.js:8186 [HMR] Updated modules:
vendor.bundle.js:8188 [HMR]  - 245
vendor.bundle.js:8138 [HMR] App is up to date." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code class="log"><span class="hljs-selector-attr">[HMR]</span> <span class="hljs-selector-tag">Waiting</span> <span class="hljs-selector-tag">for</span> <span class="hljs-selector-tag">update</span> <span class="hljs-selector-tag">signal</span> <span class="hljs-selector-tag">from</span> <span class="hljs-selector-tag">WDS</span>...
<span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:670</span> <span class="hljs-selector-attr">[WDS]</span> <span class="hljs-selector-tag">Hot</span> <span class="hljs-selector-tag">Module</span> <span class="hljs-selector-tag">Replacement</span> <span class="hljs-selector-tag">enabled</span>.
2<span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:673</span> <span class="hljs-selector-attr">[WDS]</span> <span class="hljs-selector-tag">App</span> <span class="hljs-selector-tag">updated</span>. <span class="hljs-selector-tag">Recompiling</span>...
<span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:738</span> <span class="hljs-selector-attr">[WDS]</span> <span class="hljs-selector-tag">App</span> <span class="hljs-selector-tag">hot</span> <span class="hljs-selector-tag">update</span>...
<span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:8152</span> <span class="hljs-selector-attr">[HMR]</span> <span class="hljs-selector-tag">Checking</span> <span class="hljs-selector-tag">for</span> <span class="hljs-selector-tag">updates</span> <span class="hljs-selector-tag">on</span> <span class="hljs-selector-tag">the</span> <span class="hljs-selector-tag">server</span>...
<span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:8186</span> <span class="hljs-selector-attr">[HMR]</span> <span class="hljs-selector-tag">Updated</span> <span class="hljs-selector-tag">modules</span>:
<span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:8188</span> <span class="hljs-selector-attr">[HMR]</span>  <span class="hljs-selector-tag">-</span> 245
<span class="hljs-selector-tag">vendor</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-pseudo">:8138</span> <span class="hljs-selector-attr">[HMR]</span> <span class="hljs-selector-tag">App</span> <span class="hljs-selector-tag">is</span> <span class="hljs-selector-tag">up</span> <span class="hljs-selector-tag">to</span> <span class="hljs-selector-tag">date</span>.</code></pre>
<h3 id="articleHeader38">在 webpack.config.js 中配置 webpack develop server</h3>
<p>修改 webpack.config.js 添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new webpack.optimize.CommonsChunkPlugin(
    /* chunkName= */&quot;vendor&quot;, 
    /* filename= */&quot;vendor.bundle.js&quot;, Infinity),
  // 需要手动添加 HotModuleReplacementPlugin , 命令行的方式会自动添加
  new webpack.HotModuleReplacementPlugin()
],
devServer: {
  hot: true,
  inline: true
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plugins: [
  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(
    <span class="hljs-comment">/* chunkName= */</span><span class="hljs-string">"vendor"</span>, 
    <span class="hljs-comment">/* filename= */</span><span class="hljs-string">"vendor.bundle.js"</span>, <span class="hljs-literal">Infinity</span>),
  <span class="hljs-comment">// 需要手动添加 HotModuleReplacementPlugin , 命令行的方式会自动添加</span>
  <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
],
<span class="hljs-attr">devServer</span>: {
  <span class="hljs-attr">hot</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>
}</code></pre>
<p>不加参数直接执行 webpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ webpack-dev-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code class="shell" style="word-break: break-word; white-space: initial;">$ webpack-dev-<span class="hljs-keyword">server</span></code></pre>
<p>webpack-dev-server 还提供了其他的一些功能， 如：</p>
<ol>
<li><p>配置 proxy</p></li>
<li><p>访问 node.js API</p></li>
<li><p>和现有的 node 服务集成</p></li>
</ol>
<p>基于这些功能可以实现很多自定义的功能。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 2.2 webpack

## 原文链接
[https://segmentfault.com/a/1190000005612506](https://segmentfault.com/a/1190000005612506)


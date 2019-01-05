---
title: 'vue-cli “从入门到放弃”' 
date: 2019-01-06 2:30:10
hidden: true
slug: xkdpxu4ls9e
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>主要作用：目录结构、本地调试、代码部署、热加载、单元测试</p></blockquote>
<p>在如今前端技术飞速发展的时代，angular.js、vue.js 和 react.js 作为前端框架已经呈现出了三国鼎立的局面。作为国人若你不知道 vue，小生表示可以理解，如果作为中国的前端猿不知道 vue，小生表示很遗憾。而 vue-cli 作为官方推荐的快速构建 vue 项目的脚手架，你应该学会使用，本文将介绍如何使用 vue-cli。</p>
<blockquote><p>在使用vue-cli前，希望你具备以下条件：</p></blockquote>
<ul>
<li><p>扎实的 JavaScript / HTML / CSS 基本功</p></li>
<li><p>通读官方教程 (guide) 的基础篇</p></li>
</ul>
<p>这里我就不再赘述什么是 Vue.js 了，请需要了解的同学前往：</p>
<ul>
<li><p><a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vuejs.org／中文文档</a></p></li>
<li><p><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">GitHub</a></p></li>
</ul>
<p>查看相关资源信息。</p>
<h3 id="articleHeader0">安装</h3>
<ul>
<li>
<p>检查是否安装 node.js, 如果没有请根据您的系统安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node -v
v8.00" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="shell"><span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
v8.<span class="hljs-number">00</span></code></pre>
</li>
<li>
<p>全局安装 vue-cli</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code class="shell" style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
</li>
<li>
<p>vue-cli 的命令行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  命令:
  
  init        从模板中创建项目
  list        列出所有的官方模板
  build       构建项目
  help [cmd]  展示[cmd]命令的帮助信息" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code class="shell">  命令:
  
  init        从模板中创建项目
  list        列出所有的官方模板
  build       构建项目
  <span class="hljs-built_in">help</span> [<span class="hljs-built_in">cmd</span>]  展示[<span class="hljs-built_in">cmd</span>]命令的帮助信息</code></pre>
</li>
<li>
<p>使用vue list 查看所有模板</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可用的官方模板:

★  browserify - 功能齐全的 Browserify + vueify 配置， 具备 hot-reload, linting &amp; unit testing。
★  browserify-simple - 简单的 Browserify + vueify 配置，便于快速构建。
★  pwa - 基于 webpack 的 PWA 模板。
★  simple - 基于单html文件的最简单的vue配置模板。
★  webpack - 功能齐全的 Webpack + vue-loader 配置 hot reload, linting, testing &amp; css extraction。
★  webpack-simple - 简单的 Webpack + vue-loader 配置，便于快速构建。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>可用的官方模板:

★  <span class="hljs-keyword">browserify </span>- 功能齐全的 <span class="hljs-keyword">Browserify </span>+ vueify 配置， 具备 hot-reload, linting &amp; unit testing。
★  <span class="hljs-keyword">browserify-simple </span>- 简单的 <span class="hljs-keyword">Browserify </span>+ vueify 配置，便于快速构建。
★  pwa - 基于 webpack 的 PWA 模板。
★  simple - 基于单html文件的最简单的vue配置模板。
★  webpack - 功能齐全的 Webpack + vue-loader 配置 hot reload, linting, testing &amp; css <span class="hljs-keyword">extraction。
</span>★  webpack-simple - 简单的 Webpack + vue-loader 配置，便于快速构建。</code></pre>
</li>
<li>
<p>使用vue init创建基于webpack模板的项目（目前使用最多）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack <项目名>

* Project name (demo) 项目名称，不能大写和中文，直接回车，使用默认名称
* Project description (A Vue.js project) 项目描述，也可直接点击回车，使用默认值
* Author 项目作者，使用默认名字
* Install vue-router? (Y/n) 是否安装vue-router，这是官方的路由，大多数情况下都使用
* Use ESLint to lint your code? (Y/n) 是否使用ESLint管理代码，ESLint是个代码风格管理工具，是用来统一代码风格的，并不会影响整体的运行，这也是为了团队开发，一般项目中都会使用
* Pick an ESLint preset 选择一个ESLint预设, 编写vue项目时的代码风格, 选择默认Standard即可
* Setup unit tests with Karma + Mocha? (Y/n) 是否安装单元测试，选择安装
* Setup e2e tests with Nightwatch? (Y/n) 是否安装e2e测试 ，选择安装" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>vue init webpack &lt;项目名&gt;

<span class="hljs-bullet">* </span>Project name (demo) 项目名称，不能大写和中文，直接回车，使用默认名称
<span class="hljs-bullet">* </span>Project description (A Vue.js project) 项目描述，也可直接点击回车，使用默认值
<span class="hljs-bullet">* </span>Author 项目作者，使用默认名字
<span class="hljs-bullet">* </span>Install vue-router? (Y/n) 是否安装vue-router，这是官方的路由，大多数情况下都使用
<span class="hljs-bullet">* </span>Use ESLint to lint your code? (Y/n) 是否使用ESLint管理代码，ESLint是个代码风格管理工具，是用来统一代码风格的，并不会影响整体的运行，这也是为了团队开发，一般项目中都会使用
<span class="hljs-bullet">* </span>Pick an ESLint preset 选择一个ESLint预设, 编写vue项目时的代码风格, 选择默认Standard即可
<span class="hljs-bullet">* </span>Setup unit tests with Karma + Mocha? (Y/n) 是否安装单元测试，选择安装
<span class="hljs-bullet">* </span>Setup e2e tests with Nightwatch? (Y/n) 是否安装e2e测试 ，选择安装</code></pre>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010460708" src="https://static.alili.tech/img/remote/1460000010460708" alt="构建流程" title="构建流程" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">项目结构</h3>
<ul><li><p>cd 到 demo 目录下，发现如下的项目结构</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010461496" src="https://static.alili.tech/img/remote/1460000010461496" alt="dir" title="dir" style="cursor: pointer; display: inline;"></span></p>
<ul><li>
<p>文件说明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-- build                     目录放的是构建脚本（包括构建时要用到的webpack 配置）
-- config                    配置脚本（vue项目启动时需要的配置，开发模式和生产模式）
-- node_modules              通过npm install 安装的项目依赖包
-- src                       项目源码目录
     -- assets                 项目模块资源文件包括：图片，css（会被webpack处理）
     -- components             项目相关的vue组件，便于重用
     -- router                 项目的路由定义
        App.vue                页面入口文件
        main.js                项目的入口文件，挂在vue实例，加载路由，中间件等公共组件
-- static                    页面需要引入的外部的纯静态资源(会直接拷贝到dist/static/里面)
-- test                      项目测试
     -- e2e                    模拟用户行为的测试
     -- unit                   单元测试
.babelrc                     ES6语法编译配置,把我们ES2105的代码通过它编译成ES5的
.editorconfig                编辑器配置，定义代码格式
.eslintignore                忽略语法检查的目录文件配置
.eslintrc.js                 eslint的配置文件
.gitignore                   配置Git仓库的忽略项
.postcssrc.js                postcss的配置
index.html                   项目入口模板文件
package.json                 项目基本信息，运行脚本和相关依赖
README.md                    项目介绍及开发指南
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>-- build                     目录放的是构建脚本（包括构建时要用到的webpack 配置）
-- config                    配置脚本（vue项目启动时需要的配置，开发模式和生产模式）
-- node_modules              通过npm install 安装的项目依赖包
-- src                       项目源码目录
     -- assets                 项目模块资源文件包括：图片，css（会被webpack处理）
     -- components             项目相关的vue组件，便于重用
     -- router                 项目的路由定义
        App<span class="hljs-selector-class">.vue</span>                页面入口文件
        main<span class="hljs-selector-class">.js</span>                项目的入口文件，挂在vue实例，加载路由，中间件等公共组件
-- static                    页面需要引入的外部的纯静态资源(会直接拷贝到dist/static/里面)
-- test                      项目测试
     -- e2e                    模拟用户行为的测试
     -- unit                   单元测试
<span class="hljs-selector-class">.babelrc</span>                     ES6语法编译配置,把我们ES2105的代码通过它编译成ES5的
<span class="hljs-selector-class">.editorconfig</span>                编辑器配置，定义代码格式
<span class="hljs-selector-class">.eslintignore</span>                忽略语法检查的目录文件配置
<span class="hljs-selector-class">.eslintrc</span><span class="hljs-selector-class">.js</span>                 eslint的配置文件
<span class="hljs-selector-class">.gitignore</span>                   配置Git仓库的忽略项
<span class="hljs-selector-class">.postcssrc</span><span class="hljs-selector-class">.js</span>                postcss的配置
index<span class="hljs-selector-class">.html</span>                   项目入口模板文件
package<span class="hljs-selector-class">.json</span>                 项目基本信息，运行脚本和相关依赖
README<span class="hljs-selector-class">.md</span>                    项目介绍及开发指南
</code></pre>
</li></ul>
<h3 id="articleHeader2">项目构建</h3>
<ul>
<li>
<p>首先安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
</li>
<li>
<p>开发模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="shell" style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
</li>
</ul>
<p>服务开启成功后，浏览器打开：<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>（默认服务启动的是8080端口，如果你想另起端口，可以修改 config/index.js 文件的 port）<br><span class="img-wrap"><img data-src="/img/remote/1460000010460710" src="https://static.alili.tech/img/remote/1460000010460710" alt="demo" title="demo" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>生产环境</p></li></ul>
<p>首先需要打包 <code> npm run build </code>，打包完成后会在项目下生成 dist 文件夹，我们只需要将此文件夹部署到web服务器上即可。</p>
<h3 id="articleHeader3">小结</h3>
<p>如果您坚持到了这一步，恭喜您，您至少没有放弃。整个项目虽然很简单地一气呵成了，但是其中涉及到的技术点还有待我们去探索，革命尚未成功，同志仍需努力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-cli “从入门到放弃”

## 原文链接
[https://segmentfault.com/a/1190000010460705](https://segmentfault.com/a/1190000010460705)


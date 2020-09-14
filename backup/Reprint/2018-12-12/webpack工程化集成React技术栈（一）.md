---
title: 'webpack工程化集成React技术栈（一）' 
date: 2018-12-12 2:30:10
hidden: true
slug: hyxrnqnpq9o
categories: [reprint]
---

{{< raw >}}

                    
<p>项目开始前，我们先聊一聊关于项目的一些说明。该项目起始于2017年初，当时公司主要技术栈为gulp+angular，鉴于react的火热的生态，在公司决定研发bss管理系统时选用react开发，目的也是为react native打下基础，以解决后期公司大前端技术栈的逐步成熟。（当时没有选择vue开发的主要原因是weex生态还不够特别成熟），既然决定换新，项目的构建也跟着一起换，从gulp转向火热的webpack，持续大半年的更新迭代，我们将构建模块逐步从项目中抽离出来，把构建模块作为npm包单独管理，完成和项目代码解耦，于是就有了后面我们要说的<a href="https://www.npmjs.com/package/wci-build" rel="nofollow noreferrer" target="_blank">wci-build</a>构建模块包和<a href="https://www.npmjs.com/package/wci-cli" rel="nofollow noreferrer" target="_blank">wci-cli</a>项目脚手架。</p>
<h2 id="articleHeader0">我们要做什么</h2>
<h4>技术栈</h4>
<p>项目采用前后端分离的形式，后端选用Maven+SpringClould全家桶开发，前端选用webpack+react全家桶开发，前后端全部采用包管理工具完全解决项目依赖管理的难题，版本管理采用git，前后端通过json交互，swgger管理接口文档，接口全部遵循restful规范。由于本文面向社区开放，故本文中不涉及公司业务层的代码，本文全部代码均为最新编写，我们以一个旅游管理系统的三个模块为大家演示项目（登陆登出、用户模块、景点模块）。为了快速开展，本文涉及的后端代码直接采用Java的SSM框架搭建，源码也将为大家奉上。朋友们也可以使用mock模拟接口数据。后期我们在演示nodejs+espress时将接口代码全部转为node形式。</p>
<h4>准备</h4>
<p>因本文不是讲解基础，故大家在敲代码前，还需要具备一定的前端基础，部分如下</p>
<ol>
<li>html、css、javascript基础知识</li>
<li>es6基础知识</li>
<li>react基础知识</li>
<li>了解什么是webpack、babel、redux、react-router、nodejs、npm</li>
<li>熟悉蚂蚁金服ant design</li>
<li>熟悉less基本使用</li>
</ol>
<h4>解决什么问题</h4>
<p>本项目集成了最新的react16、react-router4、redux，同时可以选择性集成antd|antd mobile，在解决繁琐的架构配置工作外，还解决了以下问题</p>
<h5>通用问题</h5>
<ol>
<li>支持开发效率更高的ES6编写代码。</li>
<li>拆分开发、测试、生产环境，完成从开发到上线的所有工作。</li>
<li>开发环境包含热替换，本地IP、端口可配置，接口可配置，微服务模块可配置</li>
<li>测试环境包含代码压缩、合并、css抽离、公共组件抽离、代码添加hash、测试版本后缀</li>
<li>生产环境包含代码压缩、合并、css抽离、公共组件抽离、代码添加hash、生产版本后缀（和测试代码完全一样，只缺少测试版本号）</li>
<li>支持自定义添加webpack loader</li>
</ol>
<h5>其他问题</h5>
<ol>
<li>目前大型项目后端多采用微服务架构，API接口在开发、测试、生产环境下来回切换，需要频繁修改代码。解决方案：通过配置文件的方式统一配置项目模块接口</li>
<li>项目模块在分拆开发的过程中css命名冲突，导致代码维护性较差。解决方案：构建工具预加载css时自动化添加hash，使css代码模块化</li>
<li>不同开发人员，不同的代码习惯造成项目代码难以维护。解决方案：在代码编写、构建、版本管理三个方向加入代码规范校验（airbnb规范）</li>
<li>在同时开发多个系统的时候，构建业务模块在不同的项目都存在，当需要修改配置或者优化构建方案的时候，需要修改多个项目的配置。解决方案：抽离构建模块，采用npm形式依赖。</li>
</ol>
<h4>还有什么问题要解决</h4>
<p>虽然经过大半年迭代，但我们还需要在实际项目开发中支持更多的个性化需求</p>
<ol>
<li>cdn自动化</li>
<li>更加完善的持续集成</li>
<li>单元测试，包括代码，交互测试</li>
<li>mock数据，实现前后端真正0接触</li>
<li>...</li>
</ol>
<h4>希望</h4>
<p>大家在开发过程中遇到任何问题，希望可以给我们留言，我们会不断优化项目。未来，我们还会加入mobx、rxjs、immutablejs、GraphQL等，也希望在和大家的探讨中，持续进步。</p>
<h2 id="articleHeader1">项目准备</h2>
<p>本项目基础环境必须依赖<a href="http://nodejs.cn/" rel="nofollow noreferrer" target="_blank">nodejs</a>和<a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm</a>,未安装的朋友可以去官网自行安装，安装教程这里不详细说明，安装完成后使用如下命令，查看是否安装成功。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node -v
npm -v" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code><span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>
npm -v</code></pre>
<h4>初始化项目</h4>
<p>本项目我们使用<a href="https://www.npmjs.com/package/wci-cli" rel="nofollow noreferrer" target="_blank">wci-cli</a>脚手架初始化项目</p>
<ul><li>全局安装wci-cli</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g wci-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g wci-<span class="hljs-keyword">cli</span></code></pre>
<ul><li>创建项目</li></ul>
<p>wci-cli 脚手架可以创建三种项目，分别是1.纯净的react项目 2.包含antd的react项目 3.包含antd-mobile的react项目，命令如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wci new myapp" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">wci <span class="hljs-keyword">new</span> myapp</code></pre>
<p>执行命令后，命令行会提示是否需要安装antd以及选择antd类型，即可完成项目初始化，如下</p>
<p><span class="img-wrap"><img data-src="http://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-100027@2x.png" src="https://static.alili.techhttp://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-100027@2x.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>项目目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myapp
├── app // 项目业务代码
│   ├── assets // 静态文件目录（图片、字体等）
│   ├── script // js代码目录
│   │   ├── actions // redux action目录
│   │   ├── componets // react 无状态组件目录
│   │   ├── containers // react 业务代码
│   │   ├── reducers // redux reducer目录
│   │   ├── util // 工具包目录
│   │   │   ├── theme.js // antd自定义样式文件
│   │   ├── Home.js // 首页
│   │   ├── home.less // 首页样式
│   ├── styles // 全局样式目录
│   ├── index.js // 项目入口文件
│   ├── index.tpl.html // 项目html模版
├── node_modules // 依赖包目录
├── .babelrc // babel配置文件
├── .eslintrc // eslint代码校验配置文件
├── .gitignore
├── package.json
├── README.md
├── wci.json // wci项目配置文件（主要配置一些开发、测试、生产环境的信息）
└── webpack.js // webpack自定义配置文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>myapp
├── app <span class="hljs-comment">// 项目业务代码</span>
│   ├── assets <span class="hljs-comment">// 静态文件目录（图片、字体等）</span>
│   ├── script <span class="hljs-comment">// js代码目录</span>
│   │   ├── actions <span class="hljs-comment">// redux action目录</span>
│   │   ├── componets <span class="hljs-comment">// react 无状态组件目录</span>
│   │   ├── containers <span class="hljs-comment">// react 业务代码</span>
│   │   ├── reducers <span class="hljs-comment">// redux reducer目录</span>
│   │   ├── util <span class="hljs-comment">// 工具包目录</span>
│   │   │   ├── theme<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// antd自定义样式文件</span>
│   │   ├── Home<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 首页</span>
│   │   ├── home<span class="hljs-selector-class">.less</span> <span class="hljs-comment">// 首页样式</span>
│   ├── styles <span class="hljs-comment">// 全局样式目录</span>
│   ├── index<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 项目入口文件</span>
│   ├── index<span class="hljs-selector-class">.tpl</span><span class="hljs-selector-class">.html</span> <span class="hljs-comment">// 项目html模版</span>
├── node_modules <span class="hljs-comment">// 依赖包目录</span>
├── <span class="hljs-selector-class">.babelrc</span> <span class="hljs-comment">// babel配置文件</span>
├── <span class="hljs-selector-class">.eslintrc</span> <span class="hljs-comment">// eslint代码校验配置文件</span>
├── <span class="hljs-selector-class">.gitignore</span>
├── package<span class="hljs-selector-class">.json</span>
├── README<span class="hljs-selector-class">.md</span>
├── wci<span class="hljs-selector-class">.json</span> <span class="hljs-comment">// wci项目配置文件（主要配置一些开发、测试、生产环境的信息）</span>
└── webpack<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// webpack自定义配置文件</span></code></pre>
<p>执行如下命令，运行开发环境</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd myapp
npm run start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>cd myapp
npm <span class="hljs-keyword">run</span><span class="bash"> start</span></code></pre>
<p><span class="img-wrap"><img data-src="http://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-100339@2x.png" src="https://static.alili.techhttp://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-100339@2x.png" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="http://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-100436@2x.png" src="https://static.alili.techhttp://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-100436@2x.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>如上图，我们的项目已经跑起来了...</p>
<ul><li>测试、发布</li></ul>
<p>因我们需要保证测试代码和生产代码必须保持一致，所有在实际项目中，我们可以运行如下命令构建代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run test // 测试环境打包
npm run dist // 生产环境打包" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> <span class="hljs-built_in">test</span> // 测试环境打包
</span>npm <span class="hljs-keyword">run</span><span class="bash"> dist // 生产环境打包</span></code></pre>
<p>测试代码<br><span class="img-wrap"><img data-src="http://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-103612@2xtest.png" src="https://static.alili.techhttp://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-103612@2xtest.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>生产代码<br><span class="img-wrap"><img data-src="http://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-103524@2xdist.png" src="https://static.alili.techhttp://7xr3o7.com1.z0.glb.clouddn.com/QQ20180225-103524@2xdist.png" alt="" title="" style="cursor: pointer;"></span></p>
<p>到这里，我们已经完成项目前期开发的所有准备工作，接下来，我们一起开始撸代码吧</p>
<blockquote>项目结束后，我会为大家奉上两篇彩蛋，分别是 1. 一步步搭建webpack前端构建工具并抽成npm单独模块 2. 一步步构建自己的npm开发包并且以一个真实例子演示（开发一个命令行生成文件夹结构的小工具）</blockquote>
<h2 id="articleHeader2">还要说一点</h2>
<p>正式开始撸代码前，还要针对项目具体说明，包括项目代码目录介绍，前后端分离项目需要注意哪些问题，前后端如何鉴权等...</p>
<h4>都是干什么的</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myapp
├── app // 项目业务代码
│   ├── assets // 静态文件目录（图片、字体等）
│   ├── script // js代码目录
│   │   ├── actions // redux action目录
│   │   ├── componets // react 无状态组件目录
│   │   ├── containers // react 业务代码
│   │   ├── reducers // redux reducer目录
│   │   ├── util // 工具包目录
│   │   │   ├── theme.js // antd自定义样式文件
│   │   ├── Home.js // 首页
│   │   ├── home.less // 首页样式
│   ├── styles // 全局样式目录
│   ├── index.js // 项目入口文件
│   ├── index.tpl.html // 项目html模版
├── node_modules // 依赖包目录
├── .babelrc // babel配置文件
├── .eslintrc // eslint代码校验配置文件
├── .gitignore
├── package.json
├── README.md
├── wci.json // wci项目配置文件（主要配置一些开发、测试、生产环境的信息）
└── webpack.js // webpack自定义配置文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>myapp
├── app <span class="hljs-comment">// 项目业务代码</span>
│   ├── assets <span class="hljs-comment">// 静态文件目录（图片、字体等）</span>
│   ├── script <span class="hljs-comment">// js代码目录</span>
│   │   ├── actions <span class="hljs-comment">// redux action目录</span>
│   │   ├── componets <span class="hljs-comment">// react 无状态组件目录</span>
│   │   ├── containers <span class="hljs-comment">// react 业务代码</span>
│   │   ├── reducers <span class="hljs-comment">// redux reducer目录</span>
│   │   ├── util <span class="hljs-comment">// 工具包目录</span>
│   │   │   ├── theme<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// antd自定义样式文件</span>
│   │   ├── Home<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 首页</span>
│   │   ├── home<span class="hljs-selector-class">.less</span> <span class="hljs-comment">// 首页样式</span>
│   ├── styles <span class="hljs-comment">// 全局样式目录</span>
│   ├── index<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 项目入口文件</span>
│   ├── index<span class="hljs-selector-class">.tpl</span><span class="hljs-selector-class">.html</span> <span class="hljs-comment">// 项目html模版</span>
├── node_modules <span class="hljs-comment">// 依赖包目录</span>
├── <span class="hljs-selector-class">.babelrc</span> <span class="hljs-comment">// babel配置文件</span>
├── <span class="hljs-selector-class">.eslintrc</span> <span class="hljs-comment">// eslint代码校验配置文件</span>
├── <span class="hljs-selector-class">.gitignore</span>
├── package<span class="hljs-selector-class">.json</span>
├── README<span class="hljs-selector-class">.md</span>
├── wci<span class="hljs-selector-class">.json</span> <span class="hljs-comment">// wci项目配置文件（主要配置一些开发、测试、生产环境的信息）</span>
└── webpack<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// webpack自定义配置文件</span></code></pre>
<p>以上是代码的全部目录，下面我们根据功能依次介绍：</p>
<ul><li>node_modules、.gitignore、package.json、README.md</li></ul>
<blockquote>node_modules: npm依赖包目录，开发者可以不用管，只要知道我们项目里所有的依赖都下载在这个文件夹下<br>.gitignore：git需要忽略的文件<br>package.json：npm最主要的文件，里面写满了我们依赖包的结构和一些项目信息<br>README.md：github的说明文件</blockquote>
<ul><li>.babelrc、.eslintrc</li></ul>
<blockquote>.babelrc：babel配置文件，可以配置部分自定义babel插件（例如本项目里antd自定义主题和javascript@语法糖就在这里配置）<br>.eslintrc：eslint配置文件，可以自定义配置eslint规则，详细规则可以去官网<a href="http://eslint.cn/" rel="nofollow noreferrer" target="_blank">eslint</a>查看</blockquote>
<p>说明：这两个模块本该配置在wci-build构建工具里，但考虑到项目的灵活性，所有抽离出来放在项目根目录</p>
<ul><li>webpack.js</li></ul>
<blockquote>webpack.js：webpack loader个性化的配置文件，可以自定义添加webpack loader</blockquote>
<ul><li>wci.json</li></ul>
<blockquote>wci.json：项目的配置文件，可以自定义配置项目</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;index&quot;: &quot;app/index.js&quot;, // 项目入口文件
  &quot;hostname&quot;: &quot;127.0.0.1&quot;, // 开发环境IP地址（可以配置域名通过本地host转发）
  &quot;name&quot;: &quot;wci-antd-app&quot;, // 项目名称（显示在浏览器title里的名字）
  &quot;libs&quot;: [ // 项目的公共包，后续可以自行添加
    &quot;react&quot;,
    &quot;react-dom&quot;,
    &quot;axios&quot;,
    &quot;classnames&quot;,
    &quot;prop-types&quot;,
    &quot;react-redux&quot;,
    &quot;react-router-dom&quot;,
    &quot;redux&quot;,
    &quot;redux-thunk&quot;
  ],
  &quot;dev&quot;: { // 开发环境配置
    &quot;port&quot;: 8031, // 开发环境端口
    &quot;src&quot;: &quot;app&quot;, // 开发环境监听目录
    &quot;api&quot;: &quot;&quot;, // 开发环境后端接口地址
    &quot;module&quot;: {}, // 开发环境的模块包
    &quot;is_eslint&quot;: false // 开发环境是否开启eslint校验
  },
  &quot;test&quot;: { // 测试环境配置
    &quot;module&quot;: {}, // 测试环境的模块包
    &quot;api&quot;: &quot;&quot; // 测试环境后端接口地址
  },
  &quot;prod&quot;: { // 生产环境配置
    &quot;module&quot;: {}, // 生产环境的模块包
    &quot;api&quot;: &quot;&quot; // 生产环境后端接口地址
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>{
  <span class="hljs-string">"index"</span>: <span class="hljs-string">"app/index.js"</span>, <span class="hljs-comment">// 项目入口文件</span>
  <span class="hljs-string">"hostname"</span>: <span class="hljs-string">"127.0.0.1"</span>, <span class="hljs-comment">// 开发环境IP地址（可以配置域名通过本地host转发）</span>
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"wci-antd-app"</span>, <span class="hljs-comment">// 项目名称（显示在浏览器title里的名字）</span>
  <span class="hljs-string">"libs"</span>: [ <span class="hljs-comment">// 项目的公共包，后续可以自行添加</span>
    <span class="hljs-string">"react"</span>,
    <span class="hljs-string">"react-dom"</span>,
    <span class="hljs-string">"axios"</span>,
    <span class="hljs-string">"classnames"</span>,
    <span class="hljs-string">"prop-types"</span>,
    <span class="hljs-string">"react-redux"</span>,
    <span class="hljs-string">"react-router-dom"</span>,
    <span class="hljs-string">"redux"</span>,
    <span class="hljs-string">"redux-thunk"</span>
  ],
  <span class="hljs-string">"dev"</span>: { <span class="hljs-comment">// 开发环境配置</span>
    <span class="hljs-string">"port"</span>: <span class="hljs-number">8031</span>, <span class="hljs-comment">// 开发环境端口</span>
    <span class="hljs-string">"src"</span>: <span class="hljs-string">"app"</span>, <span class="hljs-comment">// 开发环境监听目录</span>
    <span class="hljs-string">"api"</span>: <span class="hljs-string">""</span>, <span class="hljs-comment">// 开发环境后端接口地址</span>
    <span class="hljs-string">"module"</span>: {}, <span class="hljs-comment">// 开发环境的模块包</span>
    <span class="hljs-string">"is_eslint"</span>: <span class="hljs-literal">false</span> <span class="hljs-comment">// 开发环境是否开启eslint校验</span>
  },
  <span class="hljs-string">"test"</span>: { <span class="hljs-comment">// 测试环境配置</span>
    <span class="hljs-string">"module"</span>: {}, <span class="hljs-comment">// 测试环境的模块包</span>
    <span class="hljs-string">"api"</span>: <span class="hljs-string">""</span> <span class="hljs-comment">// 测试环境后端接口地址</span>
  },
  <span class="hljs-string">"prod"</span>: { <span class="hljs-comment">// 生产环境配置</span>
    <span class="hljs-string">"module"</span>: {}, <span class="hljs-comment">// 生产环境的模块包</span>
    <span class="hljs-string">"api"</span>: <span class="hljs-string">""</span> <span class="hljs-comment">// 生产环境后端接口地址</span>
  }
}</code></pre>
<ul><li>app</li></ul>
<blockquote>项目目录</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── app // 项目业务代码
│   ├── assets // 静态文件目录（图片、字体等）
│   ├── script // js代码目录
│   │   ├── actions // redux action目录
│   │   ├── componets // react 无状态组件目录
│   │   ├── containers // react 业务代码
│   │   ├── reducers // redux reducer目录
│   │   ├── util // 工具包目录
│   │   │   ├── theme.js // antd自定义样式文件
│   │   ├── Home.js // 首页
│   │   ├── home.less // 首页样式
│   ├── styles // 全局样式目录
│   ├── index.js // 项目入口文件
│   ├── index.tpl.html // 项目html模版" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── app <span class="hljs-comment">// 项目业务代码</span>
│   ├── assets <span class="hljs-comment">// 静态文件目录（图片、字体等）</span>
│   ├── script <span class="hljs-comment">// js代码目录</span>
│   │   ├── actions <span class="hljs-comment">// redux action目录</span>
│   │   ├── componets <span class="hljs-comment">// react 无状态组件目录</span>
│   │   ├── containers <span class="hljs-comment">// react 业务代码</span>
│   │   ├── reducers <span class="hljs-comment">// redux reducer目录</span>
│   │   ├── util <span class="hljs-comment">// 工具包目录</span>
│   │   │   ├── theme<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// antd自定义样式文件</span>
│   │   ├── Home<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 首页</span>
│   │   ├── home<span class="hljs-selector-class">.less</span> <span class="hljs-comment">// 首页样式</span>
│   ├── styles <span class="hljs-comment">// 全局样式目录</span>
│   ├── index<span class="hljs-selector-class">.js</span> <span class="hljs-comment">// 项目入口文件</span>
│   ├── index<span class="hljs-selector-class">.tpl</span><span class="hljs-selector-class">.html</span> <span class="hljs-comment">// 项目html模版</span></code></pre>
<p>如上，因为react遵循组件化开发，故我们的业务代码全部写在<code>containers</code>目录下，并且模块的样式文件、高阶组件写在相对的模块下，如图<br><span class="img-wrap"><img data-src="http://7xr3o7.com1.z0.glb.clouddn.com/QQ20180226-172133@2x.png" src="https://static.alili.techhttp://7xr3o7.com1.z0.glb.clouddn.com/QQ20180226-172133@2x.png" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>styles</code>目录用于存放项目全局的样式文件，例如全局样式的变量文件等...</p>
<h4>其他</h4>
<h5>版本管理：</h5>
<p>推荐使用<a href="https://segmentfault.com/a/1190000002918123">gitflow</a>来进行版本的管理，这里不做详细描述</p>
<h5>前后端分离跨域：</h5>
<p>一旦项目采用前后端分离，跨域是所有项目里不可避免的问题，目前跨域的解决方案主要有三种</p>
<ol>
<li>采用jsonp方式（只支持GET请求）</li>
<li>采用cors方式</li>
<li>采用node中间件方式（需要单独部署nodejs服务）</li>
</ol>
<p>我们这里采用方式2</p>
<blockquote>java代码</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="response.addHeader(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
response.addHeader(&quot;Access-Control-Allow-Credentials&quot;, &quot;true&quot;);
response.addHeader(&quot;Access-Control-Allow-Headers&quot;,&quot;Content-Type,Content-Token,Content-User,X-Requested-With&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">response</span><span class="hljs-selector-class">.addHeader</span>(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>);
<span class="hljs-selector-tag">response</span><span class="hljs-selector-class">.addHeader</span>(<span class="hljs-string">"Access-Control-Allow-Credentials"</span>, <span class="hljs-string">"true"</span>);
<span class="hljs-selector-tag">response</span><span class="hljs-selector-class">.addHeader</span>(<span class="hljs-string">"Access-Control-Allow-Headers"</span>,<span class="hljs-string">"Content-Type,Content-Token,Content-User,X-Requested-With"</span>);</code></pre>
<blockquote>nodejs 代码</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.header(&quot;Access-Control-Allow-Origin&quot;, &quot;*&quot;);
res.header(&quot;Access-Control-Allow-Headers&quot;,&quot;Content-Type,Content-Token,Content-User,X-Requested-With&quot;);
res.header(&quot;Access-Control-Allow-Methods&quot;,&quot;PUT,POST,GET,DELETE,OPTIONS&quot;);
res.header(&quot;X-Powered-By&quot;,' 3.2.1')
res.header(&quot;Content-Type&quot;, &quot;application/json;charset=utf-8&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>res.header(<span class="hljs-string">"Access-Control-Allow-Origin"</span>, <span class="hljs-string">"*"</span>);
res.header(<span class="hljs-string">"Access-Control-Allow-Headers"</span>,<span class="hljs-string">"Content-Type,Content-Token,Content-User,X-Requested-With"</span>);
res.header(<span class="hljs-string">"Access-Control-Allow-Methods"</span>,<span class="hljs-string">"<span class="hljs-keyword">PUT</span>,<span class="hljs-keyword">POST</span>,<span class="hljs-keyword">GET</span>,<span class="hljs-keyword">DELETE</span>,<span class="hljs-keyword">OPTIONS</span>"</span>);
res.header(<span class="hljs-string">"X-Powered-By"</span>,' <span class="hljs-number">3</span>.<span class="hljs-number">2</span>.<span class="hljs-number">1</span>')
res.header(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/json;charset=utf-8"</span>);</code></pre>
<p>这种方式还可以自定义请求头的认证信息</p>
<p>不明白的朋友可以去看阮一峰大神的<a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">这篇</a>文章</p>
<p><em>未完待续 更新于2018-02-26</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack工程化集成React技术栈（一）

## 原文链接
[https://segmentfault.com/a/1190000013372300](https://segmentfault.com/a/1190000013372300)


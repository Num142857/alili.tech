---
title: '基于 Webpack 3 的 Vue.js 工程项目脚手架' 
date: 2019-01-08 2:30:11
hidden: true
slug: sk2uyjkf9h
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/wxyyxc1992/create-webpack-app/tree/master/vue" rel="nofollow noreferrer" target="_blank">基于 Webpack 3 的 Vue.js 工程项目脚手架</a>从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices" rel="nofollow noreferrer" target="_blank">  Web 前端入门与工程实践</a>，是笔者基于兄弟项目<a href="https://github.com/wxyyxc1992/create-webpack-app/tree/master/react" rel="nofollow noreferrer" target="_blank"> React 脚手架</a>改造而来，二者在 Webpack 配置层面差异不大。更多关于 Vue.js 或者前端开发相关的资料链接可以参考<a href="https://parg.co/byL" rel="nofollow noreferrer" target="_blank">Vue.js 学习与实践资料索引</a>，<a href="https://parg.co/bau" rel="nofollow noreferrer" target="_blank"> Vue.js 与前端工程化实践</a>系列文章以及<a href="https://parg.co/bVs" rel="nofollow noreferrer" target="_blank"> Webpack 学习与资料索引</a>，对于其中浅薄的工程化的思考可以参考<a href="https://zhuanlan.zhihu.com/p/24575395" rel="nofollow noreferrer" target="_blank"> 2016-我的前端之路:工具化与工程化</a>。</p></blockquote>
<h1 id="articleHeader0">基于 Webpack 3 的 Vue.js 工程项目脚手架</h1>
<p><a href="https://github.com/wxyyxc1992/create-webpack-app" rel="nofollow noreferrer" target="_blank"> create-webpack-app </a>是笔者对于日常工作中的基于 React/Vue.js 技术栈与实践的沉淀，dev-config/* 与 package.json 构成了基础的脚手架，支持最新的开发流程与默认的生产环境优化；模板项目包含特性如下：</p>
<ul>
<li><p>技术栈支持：使用 ES6/ES7 语法、允许使用 CSS Modules、SCSS、Less 并且使用 PostCSS 进行自动 Polyfill、支持使用 styled-component 进行 CSS-in-JS 样式控制、使用 Flow 作为静态类型检测工具、使用 Jest 作为默认的测试框架</p></li>
<li><p>开发环境：使用 WebpackDevServer 部署开发服务器、使用 React Hot Loader 进行组件热加载、使用 Babel 进行代码转换、使用 ESLint 进行代码检测、使用 DllPlugin 作为开发环境下公共代码提取工具以优化编译速度</p></li>
<li><p>生产环境：使用 CommonChunksPlugin 作为生产环境下公共代码提取工具、使用 Prepack &amp; prepack-webpack-plugin 进行代码优化、使用 offline-plugin 添加简单的 PWA 特性增强</p></li>
<li><p>部署方式：支持独立部署（Hash 方式切换路由）、支持服务端部署、支持服务端渲染</p></li>
</ul>
<p>本部分即是针对 Vue.js 项目的脚手架，我们可以直接拷贝该项目来展示部分开发模式或者作为模板项目使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 下载本项目
git clone https://github.com/wxyyxc1992/create-webpack-app

# 可以使用 yarn install &amp; npm start 直接运行本项目
# 仅保留 dev-config、package.json、src/client.js、src/ssr_server.js
mkdir /path/to/your/project

# 拷贝必须的启动文件
cp -r vue/dev-config/ /path/to/your/project
cp vue/package.json /path/to/your/project
cp vue/src/client.js /path/to/your/project/src/

# 安装运行依赖
cd /path/to/your/project

yarn install / npm install

# 有时候需要安装 better-npm-run
npm install better-npm-run -g

# 启动项目
npm start

# 编译为纯客户端部署模式，即单个 HTML 页面
npm run build

# 进行依赖升级检查
npm run update" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 下载本项目</span>
git <span class="hljs-built_in">clone</span> https://github.com/wxyyxc1992/create-webpack-app

<span class="hljs-comment"># 可以使用 yarn install &amp; npm start 直接运行本项目</span>
<span class="hljs-comment"># 仅保留 dev-config、package.json、src/client.js、src/ssr_server.js</span>
mkdir /path/to/your/project

<span class="hljs-comment"># 拷贝必须的启动文件</span>
cp -r vue/dev-config/ /path/to/your/project
cp vue/package.json /path/to/your/project
cp vue/src/client.js /path/to/your/project/src/

<span class="hljs-comment"># 安装运行依赖</span>
<span class="hljs-built_in">cd</span> /path/to/your/project

yarn install / npm install

<span class="hljs-comment"># 有时候需要安装 better-npm-run</span>
npm install better-npm-run -g

<span class="hljs-comment"># 启动项目</span>
npm start

<span class="hljs-comment"># 编译为纯客户端部署模式，即单个 HTML 页面</span>
npm run build

<span class="hljs-comment"># 进行依赖升级检查</span>
npm run update</code></pre>
<ul>
<li><p>开发环境下的操作面板：<br><span class="img-wrap"><img data-src="/img/remote/1460000010240923" src="https://static.alili.tech/img/remote/1460000010240923" alt="" title="" style="cursor: pointer;"></span></p></li>
<li><p>编译之后的包体分析：<br><span class="img-wrap"><img data-src="/img/remote/1460000010240924" src="https://static.alili.tech/img/remote/1460000010240924" alt="" title="" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
<p>本模板相较于官方的 <a href="https://github.com/vuejs-templates/webpack-simple/blob/master/template/package.json" rel="nofollow noreferrer" target="_blank">webpack-simple</a> 功能稍微复杂，并且引入了完整的 Flow、Jest 等技术栈配置，同时优化了 Webpack 的构建性能。</p>
<blockquote><p>!Important! 项目尚未支持 SSR</p></blockquote>
<h1 id="articleHeader1">基础配置</h1>
<p>create-webpack-app 默认的应用配置位于 dev-config/apps.config.js 文件中，该文件也是 dev-config/ 文件夹下唯一与应用业务相关的文件；该文件定义了不同应用中的需要配置的应用相关信息。create-webpack-app 定位为单项目多应用的模板，因此我们可以在<code>apps</code> 键下配置项目设计的应用入口；在打包时会自动将多个应用并行编译并且提取出所有公共的代码。每个应用需要提供唯一编号、入口文件地址、模板页面、是否编译等信息；接下来 devServer 则是定义了当前正在开发的应用入口，ssrServer 定义了打包时需要使用的渲染服务器入口，其会在执行 <code>npm run build:ssr</code> 时调用，<code>proxy</code> 与 <code>api</code> 则定义了后端服务器信息，开发者可以根据业务需求自行使用。典型的 apps.config.js 文件配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
module.exports = {
  //基本的应用配置信息
  apps: [
    //HelloWorld
    {
      id: &quot;pwa&quot;,
      src: &quot;./pwa/client.js&quot;,
      indexPage: defaultIndexPage,
      compiled: true
    }
  ],

  //开发入口配置
  devServer: {
    appEntrySrc: &quot;./pwa/client.js&quot;, //当前待调试的APP的入口文件
    port: 3000 //监听的Server端口
  },

  //用于服务端渲染的Server路径
  ssrServer: {
    serverEntrySrc: &quot;./pwa/ssr_server.js&quot;
  },

  //依赖项配置
  proxy: {
    //后端服务器地址 http://your.backend/
    &quot;/api/*&quot;: &quot;http://localhost:3001&quot;
  },

  //后端 api 配置，这样配置可以避免将测试服务器端口暴露出去
  api: {
    dev: {},
    prod: {}
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">//基本的应用配置信息</span>
  apps: [
    <span class="hljs-comment">//HelloWorld</span>
    {
      <span class="hljs-attr">id</span>: <span class="hljs-string">"pwa"</span>,
      <span class="hljs-attr">src</span>: <span class="hljs-string">"./pwa/client.js"</span>,
      <span class="hljs-attr">indexPage</span>: defaultIndexPage,
      <span class="hljs-attr">compiled</span>: <span class="hljs-literal">true</span>
    }
  ],

  <span class="hljs-comment">//开发入口配置</span>
  devServer: {
    <span class="hljs-attr">appEntrySrc</span>: <span class="hljs-string">"./pwa/client.js"</span>, <span class="hljs-comment">//当前待调试的APP的入口文件</span>
    port: <span class="hljs-number">3000</span> <span class="hljs-comment">//监听的Server端口</span>
  },

  <span class="hljs-comment">//用于服务端渲染的Server路径</span>
  ssrServer: {
    <span class="hljs-attr">serverEntrySrc</span>: <span class="hljs-string">"./pwa/ssr_server.js"</span>
  },

  <span class="hljs-comment">//依赖项配置</span>
  proxy: {
    <span class="hljs-comment">//后端服务器地址 http://your.backend/</span>
    <span class="hljs-string">"/api/*"</span>: <span class="hljs-string">"http://localhost:3001"</span>
  },

  <span class="hljs-comment">//后端 api 配置，这样配置可以避免将测试服务器端口暴露出去</span>
  api: {
    <span class="hljs-attr">dev</span>: {},
    <span class="hljs-attr">prod</span>: {}
  }
};</code></pre>
<p>应用入口文件则遵循官方的单文件组件范式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import App from './application/App.vue';

new Vue({
  el: '#root',
  render: h => h(App)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./application/App.vue'</span>;

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#root'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});</code></pre>
<h2 id="articleHeader2">脚本编译与热加载</h2>
<p>在 dev-config/webpack/loaders.js 文件中定义了模板所需要的加载器，默认支持 js、jsx、vue、ts、tsx、css、scss、less、json 以及各种资源文件等常见格式。当我们执行 <code>npm start</code> 命令时，会自动启动dev-config/server/devServer.js 文件中定义的 Webpack 开发服务器，该服务器会使用 dev-config/webpack.config.js 文件进行配置项生成。值得一提的是，WebpackDevServer 中的 contentBase 设置为了 <code>path.join(__dirname, "../../public")</code>，也就是将 /public 目录作为开发服务器的默认根目录。热加载配置包括以下步骤：</p>
<ul><li><p>开发时应用入口设置：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  entry = [
    `webpack-dev-server/client?http://0.0.0.0:${appsConfig.devServer.port}`,
    &quot;webpack/hot/only-dev-server&quot;,
    require(&quot;./apps.config.js&quot;).devServer.appEntrySrc
  ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>  entry = [
    `webpack-dev-<span class="hljs-keyword">server</span>/<span class="hljs-keyword">client</span>?http:<span class="hljs-comment">//0.0.0.0:${appsConfig.devServer.port}`,</span>
    <span class="hljs-string">"webpack/hot/only-dev-server"</span>,
    require(<span class="hljs-string">"./apps.config.js"</span>).devServer.appEntrySrc
  ];</code></pre>
<ul><li><p>Babel 配置，默认的 Babel 文件位于 dev-config/tool/.babelrc：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ...
  &quot;plugins&quot;: [
  ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  ...
  <span class="hljs-string">"plugins"</span>: [
  ...</code></pre>
<h2 id="articleHeader3">样式处理</h2>
<p>create-webpack-app 支持 SCSS、CSS Modules 以及 styled-components 这三种样式定义方式。</p>
<h1 id="articleHeader4">Webpack 性能优化</h1>
<h2 id="articleHeader5">公共代码分割</h2>
<p>create-webpack-app 使用了 CommonsChunkPlugin 进行代码分割，默认在 dev-config/webpack/plugins.js 文件中定义了对于 node_modules 中依赖文件的自动抽取：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  new webpack.optimize.CommonsChunkPlugin({
    name: &quot;vendor&quot;,
    filename: &quot;vendor.bundle.js&quot;,
    minChunks: ({ resource }) =>
      resource &amp;&amp;
      resource.indexOf(&quot;node_modules&quot;) >= 0 &amp;&amp;
      resource.match(/\.(js|less|scss)$/)
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>  <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
    name: <span class="hljs-string">"vendor"</span>,
    filename: <span class="hljs-string">"vendor.bundle.js"</span>,
    minChunks: <span class="hljs-function"><span class="hljs-params">({ resource })</span> =&gt;</span>
      resource &amp;&amp;
      resource.indexOf(<span class="hljs-string">"node_modules"</span>) &gt;= <span class="hljs-number">0</span> &amp;&amp;
      resource.match(<span class="hljs-regexp">/\.(js|less|scss)$/</span>)
  })</code></pre>
<p>该插件会自动生成 vendor.bundle.js 文件，我们需要在应用入口文件之前引用它；开发者也可以自定义 CommonsChunkPlugin 插件以自定义需要提取的公共代码。</p>
<h2 id="articleHeader6">构建性能优化</h2>
<p>随着项目复杂度与体量的增加，我们发现初始化编译与增量编译的速度都有所下降，为了提升构建性能首先我们要做的就是保持 Webpack 版本的更新速度；此外，create-webpack-app 还默认启动了 DllPlugin 在开发状态下将所有的依赖提取为 dll 文件以提高增量编译的速度。因为考虑到灵活性，即随时有可能增减依赖的情况，create-webpack-app 目前设置的是每次使用 <code>npm start</code> 的时候都会重新生成 dll 文件；如果是已经稳定的项目可以考虑仅生成一次依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require(&quot;path&quot;);
const pkg = require(&quot;../package.json&quot;);
const webpack = require(&quot;webpack&quot;);

let dllConfig = {
  name: &quot;vendor&quot;,
  entry: Object.keys(pkg.dependencies),
  output: {
    path: path.resolve(__dirname, &quot;../public/dll&quot;),
    filename: &quot;vendor.bundle.js&quot;,
    library: &quot;vendor_[hash]&quot;
  },
  plugins: [
    new webpack.DllPlugin({
      name: &quot;vendor_[hash]&quot;,
      path: path.resolve(__dirname, &quot;../public/dll/manifest.json&quot;)
    })
  ]
};

module.exports = dllConfig;

// 在 public/index.html 文件中需要引入该依赖
// index.html
<script src=&quot;dll/vendor.bundle.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">const</span> pkg = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../package.json"</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>);

<span class="hljs-keyword">let</span> dllConfig = {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"vendor"</span>,
  <span class="hljs-attr">entry</span>: <span class="hljs-built_in">Object</span>.keys(pkg.dependencies),
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">"../public/dll"</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">"vendor.bundle.js"</span>,
    <span class="hljs-attr">library</span>: <span class="hljs-string">"vendor_[hash]"</span>
  },
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DllPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">"vendor_[hash]"</span>,
      <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">"../public/dll/manifest.json"</span>)
    })
  ]
};

<span class="hljs-built_in">module</span>.exports = dllConfig;

<span class="hljs-comment">// 在 public/index.html 文件中需要引入该依赖</span>
<span class="hljs-comment">// index.html</span>
&lt;script src=<span class="hljs-string">"dll/vendor.bundle.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader7">代码编译优化</h2>
<p>create-webpack-app 中也内置了其他的编译之后的代码性能优化插件，首先是利用 Webpack 3 的 Scope Hositing 特性来优化生成的模块；这一点需要使用 ModuleConcatenationPlugin 插件。此外，还使用了 PrepackWebpackPlugin 对于打包生成的文件进行过滤与重构；不过需要注意的是 PrepackWebpackPlugin 会较大地降低编译速度，因此也是可以根据实际的项目情况选用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 使用 Scope Hositing 特性
  new webpack.optimize.ModuleConcatenationPlugin(),

  // 使用 Prepack 优化包体大小
  // 暂时存在 Bug,等待修复
  // 使用前 21 - 425
  // 使用后 21 - 433
  new PrepackWebpackPlugin({
    mathRandomSeed: &quot;0&quot;
  })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  <span class="hljs-comment">// 使用 Scope Hositing 特性</span>
  new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.ModuleConcatenationPlugin</span>(),

  <span class="hljs-comment">// 使用 Prepack 优化包体大小</span>
  <span class="hljs-comment">// 暂时存在 Bug,等待修复</span>
  <span class="hljs-comment">// 使用前 21 - 425</span>
  <span class="hljs-comment">// 使用后 21 - 433</span>
  new PrepackWebpackPlugin({
    mathRandomSeed: <span class="hljs-string">"0"</span>
  }),</code></pre>
<h2 id="articleHeader8">PWA</h2>
<p>create-webpack-app 中只是简单地使用了 <a href="https://github.com/NekR/offline-plugin" rel="nofollow noreferrer" target="_blank">Offline Plugin</a>，其配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js example

var OfflinePlugin = require('offline-plugin');

module.exports = {
  // ...

  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin()
  ]
  // ...
}

// render.js
require('offline-plugin/runtime').install();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js example</span>

<span class="hljs-keyword">var</span> OfflinePlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'offline-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// ...</span>

  plugins: [
    <span class="hljs-comment">// ... other plugins</span>
    <span class="hljs-comment">// it's always better if OfflinePlugin is the last plugin added</span>
    <span class="hljs-keyword">new</span> OfflinePlugin()
  ]
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// render.js</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'offline-plugin/runtime'</span>).install();</code></pre>
<p>观察网络面板中的资源请求情况，我们可以看到脚本等已经被缓存在了本地：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010161499" src="https://static.alili.tech/img/remote/1460000010161499" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader9">设计模式</h1>
<h2 id="articleHeader10">JavaScript 优先</h2>
<blockquote><p>本小节仅代表本人个人意见，请多多指点</p></blockquote>
<p>官方文档中介绍的单文件组件（Single File Component）包含了 template、script、style 这三个部分，笔者感觉算是典型的前端项目三要素。不过笔者习惯的开发模式是以 JavaScript 为中心，即 JavaScript 文件单独可测试，而不是和样式以及标签混合在一起（JSX 本质上也是 JavaScript）。因此在该模板中，笔者是将标签、样式与脚本分到了三个文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.js
// @flow

export default {
  name: &quot;app&quot;,
  data() {
    return {
      msg: &quot;Vue.js &amp; Webpack App Boilerplate by 王下邀月熊&quot;
    };
  }
};

// App.scss
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

// App.vue
<template>
    <div id=&quot;app&quot;>
        <img src=&quot;../../public/assets/logo.png&quot;>
        <h1>"{{" msg "}}"</h1>
        <h2>Essential Links</h2>
        <ul>
            <li><a href=&quot;https://vuejs.org&quot; target=&quot;_blank&quot;>Core Docs</a></li>
            <li><a href=&quot;https://forum.vuejs.org&quot; target=&quot;_blank&quot;>Forum</a></li>
            <li><a href=&quot;https://gitter.im/vuejs/vue&quot; target=&quot;_blank&quot;>Gitter Chat</a></li>
            <li><a href=&quot;https://twitter.com/vuejs&quot; target=&quot;_blank&quot;>Twitter</a></li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li><a href=&quot;http://router.vuejs.org/&quot; target=&quot;_blank&quot;>vue-router</a></li>
            <li><a href=&quot;http://vuex.vuejs.org/&quot; target=&quot;_blank&quot;>vuex</a></li>
            <li><a href=&quot;http://vue-loader.vuejs.org/&quot; target=&quot;_blank&quot;>vue-loader</a></li>
            <li><a href=&quot;https://github.com/vuejs/awesome-vue&quot; target=&quot;_blank&quot;>awesome-vue</a></li>
        </ul>
    </div>
</template>

<script>
  import App from './App.js';
  export default App;
</script>

<style lang=&quot;scss&quot;>
    @import &quot;App&quot;;
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// App.js
// @flow

export default {
  name: "app",
  data() {
    return {
      msg: "Vue.js &amp; Webpack App Boilerplate by 王下邀月熊"
    };
  }
};

// App.scss
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

// App.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../public/assets/logo.png"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Essential Links<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://vuejs.org"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>Core Docs<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://forum.vuejs.org"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>Forum<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://gitter.im/vuejs/vue"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>Gitter Chat<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://twitter.com/vuejs"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>Twitter<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Ecosystem<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://router.vuejs.org/"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>vue-router<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://vuex.vuejs.org/"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>vuex<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://vue-loader.vuejs.org/"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>vue-loader<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://github.com/vuejs/awesome-vue"</span> <span class="hljs-attr">target</span>=<span class="hljs-string">"_blank"</span>&gt;</span>awesome-vue<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.js'</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"scss"</span>&gt;</span><span class="css">
    @<span class="hljs-keyword">import</span> <span class="hljs-string">"App"</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>笔者个人感觉这种模式更符合单一职责原则，对于复杂的组件能够提高代码可读性；同时将 JavaScript 代码独立出来也能更加方便地进行单元测试与类型检测等操作。</p>
<h2 id="articleHeader11">代码风格</h2>
<p>详细的 JavaScript 编程样式指南已经迁移到了<a href="https://parg.co/bIX" rel="nofollow noreferrer" target="_blank"> Web 项目开发风格指南</a>与<a href="https://parg.co/bvM" rel="nofollow noreferrer" target="_blank"> JavaScript 编程样式指南</a>，涵盖了基本原则阐述、代码风格、代码格式化与语法检测、项目架构等几个部分。不过本部分建议是类似于 Create React APP 配置提交时自动进行格式化，首先需要安装如下依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save husky lint-staged prettier
// or
yarn add husky lint-staged prettier" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save husky lint-staged prettier</span>
// <span class="hljs-keyword">or</span>
yarn <span class="hljs-keyword">add</span> husky lint-staged prettier</code></pre>
<p>然后在 package.json 中添加 Hook：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;lint-staged&quot;,
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"lint-staged"</span>,
    ...</code></pre>
<p>同时添加 lint-staged 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    // ...
  },
+ &quot;lint-staged&quot;: {
+   &quot;{src,stories}/**/*.{js,jsx,json,css}&quot;: [
+     &quot;prettier --single-quote --write&quot;,
+     &quot;git add&quot;
+   ]
+ },
  &quot;scripts&quot;: {" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>  <span class="hljs-string">"dependencies"</span>: {
    // ...
  },
+ <span class="hljs-string">"lint-staged"</span>: {
+   <span class="hljs-string">"{src,stories}/**/*.{js,jsx,json,css}"</span>: [
+     <span class="hljs-string">"prettier --single-quote --write"</span>,
+     <span class="hljs-string">"git add"</span>
+   ]
+ },
  <span class="hljs-string">"scripts"</span>: {</code></pre>
<p>这样当我们提交代码时就会自动使用 Prettier 优化代码，不过需要注意的是这种配置仅作用于根目录下；如果某个仓库中包含了多个应用配置，那么我们还需要在根目录下单独配置脚本。我们也可以使用 <code>./node_modules/.bin/prettier --single-quote --write "src/**/*.{js,jsx}"</code> 来手动进行项目文件的格式化。另外因为模板项目时放置在了子文件下，如果使用者希望使用该特性需要手动地在 package.json 中添加 <code>"precommit": "lint-staged"</code> 这个配置。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 Webpack 3 的 Vue.js 工程项目脚手架

## 原文链接
[https://segmentfault.com/a/1190000010240918](https://segmentfault.com/a/1190000010240918)


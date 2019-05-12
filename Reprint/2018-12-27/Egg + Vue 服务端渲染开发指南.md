---
title: 'Egg + Vue 服务端渲染开发指南' 
date: 2018-12-27 2:30:12
hidden: true
slug: 903ptrzzua
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 项目初始化</h2>
<h3 id="articleHeader1">1.1 通过 <a href="http://hubcarl.github.io/easywebpack/webpack/cli/" rel="nofollow noreferrer" target="_blank">easywebpack-cli</a> 脚手架初始化</h3>
<ol>
<li>安装脚手架 <code>npm install easywebpack-cli -g</code> 命令行，然后就可以使用 <code>easywebpack</code> 或 <code>easy</code> 命令</li>
<li>命令行运行 <code>easywebpack init</code>
</li>
<li>选择 egg+vue server side render boilerplate 初始化骨架项目</li>
<li>安装依赖 <code>npm install</code>
</li>
</ol>
<h3 id="articleHeader2">1.2 通过骨架项目初始化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/hubcarl/egg-vue-webpack-boilerplate.git
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">git <span class="hljs-built_in">clone</span> https://github.com/hubcarl/egg-vue-webpack-boilerplate.git
npm install</code></pre>
<p>初始化的项目提供多页面和SPA(vue-router/axios)服务端渲染实例，可以直接运行。</p>
<h2 id="articleHeader3">2. 项目运行</h2>
<h3 id="articleHeader4">2.1 本地运行</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<p>npm start 做了如下三件事情</p>
<ul>
<li>启动 egg 应用</li>
<li>启动 Webpack 构建, 文件不落地磁盘，构建的文件都在内存里面(只在本地启动, 发布模式是提前构建好文件到磁盘)</li>
<li>构建会同时启动两个 Webpack 构建服务, 客户端js构建端口9000, 服务端端口9001</li>
<li>构建完成，Egg应用正式可用，自动打开浏览器</li>
</ul>
<h3 id="articleHeader5">2.2 发布模式</h3>
<ul><li>构建文件落地磁盘</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build 或 easywebpack build prod" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">npm</span> run <span class="hljs-keyword">build </span>或 easywebpack <span class="hljs-keyword">build </span>prod</code></pre>
<ol>
<li>启动 Webpack 构建，文件落地磁盘</li>
<li>服务端构建的文件放到 <code>app/view</code> 目录</li>
<li>客户端构建的文件放到 <code>public</code> 目录</li>
<li>生成的 <code>buildConfig.json</code> 和 <code>manifest.json</code> 放到 <code>config</code> 目录</li>
<li>构建的文件都是gitignore的，部署时请注意把这些文件打包进去</li>
</ol>
<ul><li>运行</li></ul>
<p>启动应用前， 请设置 <code>EGG_SERVER_ENV</code> 环境变量，测试环境设置 <code>test</code>， 正式环境设置 <code>prod</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> start</code></pre>
<h2 id="articleHeader6">3. 项目构建</h2>
<ul>
<li>通过 <code>easywebpack-cli</code> 统一构建，支持 dev，test，prod 模式构建</li>
<li>
<code>easywebpack-cli</code> 通过项目根目录下的 <code>webpack.config.js</code> 配置文件构造出 Webpack 实际的配置文件，配置项请见 <a href="http://hubcarl.github.io/easywebpack/webpack/config/" rel="nofollow noreferrer" target="_blank">webpack.config.js</a>
</li>
<li>获取 Webpack 实际的配置文件, <a href="https://github.com/hubcarl/egg-webpack" rel="nofollow noreferrer" target="_blank">egg-webpack</a> 会使用到该功能。构建会根据 <code>webpackConfigList.length</code> 启动对应个数的 Webpack 编译实例，这里会同时启动两个 Webpack 构建服务, 客户端jsbundle构建，端口9000, 服务端jsbundle构建端口9001。默认端口为9000, 端口依次递增。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// config/config.local.js 本地 npm start 使用
const EasyWebpack = require('easywebpack-vue');
exports.webpack = {
  webpackConfigList:EasyWebpack.getWebpackConfig()
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// config/config.local.js 本地 npm start 使用</span>
<span class="hljs-keyword">const</span> EasyWebpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'easywebpack-vue'</span>);
exports.webpack = {
  <span class="hljs-attr">webpackConfigList</span>:EasyWebpack.getWebpackConfig()
};</code></pre>
<ul><li>该项目中，<code>app/web/page</code> 目录中所有 .vue 文件当作 Webpack 构建入口是采用 app/web/framework/vue/entry 的 client-loader.js 和 server-loader.js 模板实现的，这个需要结合 <code>webpack.config.js</code> 下的 entry.loader 使用。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: {
   include: ['app/web/page', { 'app/app': 'app/web/page/app/app.js?loader=false' }],
   exclude: ['app/web/page/[a-z]+/component', 'app/web/page/app'],
   loader: { // 如果没有配置loader模板，默认使用 .js 文件作为构建入口
      client: 'app/web/framework/vue/entry/client-loader.js',
      server: 'app/web/framework/vue/entry/server-loader.js',
   }    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">entry: {
   <span class="hljs-attr">include</span>: [<span class="hljs-string">'app/web/page'</span>, { <span class="hljs-string">'app/app'</span>: <span class="hljs-string">'app/web/page/app/app.js?loader=false'</span> }],
   <span class="hljs-attr">exclude</span>: [<span class="hljs-string">'app/web/page/[a-z]+/component'</span>, <span class="hljs-string">'app/web/page/app'</span>],
   <span class="hljs-attr">loader</span>: { <span class="hljs-comment">// 如果没有配置loader模板，默认使用 .js 文件作为构建入口</span>
      client: <span class="hljs-string">'app/web/framework/vue/entry/client-loader.js'</span>,
      <span class="hljs-attr">server</span>: <span class="hljs-string">'app/web/framework/vue/entry/server-loader.js'</span>,
   }    
}</code></pre>
<p>上面 <code>{ 'app/app': 'app/web/page/app/app.js?loader=false' }</code> 这个 <code>loader=false</code> 的含义表示 <code>app/web/page</code> 目录下的 <code>app/app.js</code> 不使用 entry.loader 模板。因为这个app/app.js是一个SPA服务端渲染Example，实现逻辑与其他普通的页面不一样，不能用 entry.loader 模板， 这个功能在自定义entry文件构建规范时使用。</p>
<h2 id="articleHeader7">4. 项目规范</h2>
<ul>
<li><a href="https://eggjs.org/zh-cn/basics/structure.html" rel="nofollow noreferrer" target="_blank">遵循 egg 开发规范</a></li>
<li>Vue 项目代码放到 app/web 目录，页面入口目录为 page，该目录的 所有 vue 文件默认会作为 Webpack 的 entry 构建入口。建议每个页面目录的只保留一个vue文件，vue关联的组件可以放到widget 或者 compnent目录。如果非要放到当前目前，请配置 <code>webpack.config.js</code> entry.exclude 排除 vue文件。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011760519?w=234&amp;h=532" src="https://static.alili.tech/img/remote/1460000011760519?w=234&amp;h=532" alt="egg-vue-project.png" title="egg-vue-project.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">5. 项目开发</h2>
<p>支持多页面/单页面服务端渲染, 前端渲染, 静态页面三种方式.</p>
<h3 id="articleHeader9">5.1 多页面服务端渲染实现</h3>
<h4>5.1.1 多页面前端页面实现</h4>
<p>在app/web/page 目录下面创建home目录, home.vue 文件, Webpack自动根据.vue文件创建entry入口, 具体实现请见<a href="http://hubcarl.github.io/easywebpack/webpack/config/" rel="nofollow noreferrer" target="_blank">webpack.config.js</a></p>
<ul><li>home.vue 编写界面逻辑, 根元素为layout(自定义组件, 全局注册, 统一的html, meta, header, body, 你可以自定义 title，description，keywords SEO信息，更多信息请扩展layout).</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <layout title=&quot;基于egg-vue-webpack-dev和egg-view-vue插件的工程示例项目&quot; description=&quot;vue server side render&quot; keywords=&quot;egg, vue, webpack, server side render&quot;>
   "{{"message"}}"
  </layout>
</template>
<style>
  @import &quot;home.css&quot;;
</style>
<script type=&quot;text/babel&quot;>

  export default {
    components: {

    },
    computed: {

    },
    methods: {

    },
    mounted() {

    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">layout</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"基于egg-vue-webpack-dev和egg-view-vue插件的工程示例项目"</span> <span class="hljs-attr">description</span>=<span class="hljs-string">"vue server side render"</span> <span class="hljs-attr">keywords</span>=<span class="hljs-string">"egg, vue, webpack, server side render"</span>&gt;</span>
   "{{"message"}}"
  <span class="hljs-tag">&lt;/<span class="hljs-name">layout</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">import</span> <span class="hljs-string">"home.css"</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {

    },
    <span class="hljs-attr">computed</span>: {

    },
    <span class="hljs-attr">methods</span>: {

    },
    mounted() {

    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h4>5.1.2 多页面后端渲染实现, 通过 <code>egg-view-vue-ssr</code> 插件 <code>render</code> 方法实现</h4>
<ul><li>创建controller文件home.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.index = function* (ctx) {
  yield ctx.render('home/home.js', { message: 'vue server side render!' });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.index = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">yield</span> ctx.render(<span class="hljs-string">'home/home.js'</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">'vue server side render!'</span> });
};</code></pre>
<ul><li>添加路由配置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/home', app.controller.home.home.index);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">app.get(<span class="hljs-string">'/home'</span>, app.controller.home.home.index);</code></pre>
<h4>5.1.3 多页面走前端渲染(后端路由)实现, 通过 <code>egg-view-vue-ssr</code> 插件 <code>renderClient</code> 方法实现</h4>
<ul><li>创建controller文件home.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.client = function* (ctx) {
  yield ctx.renderClient('home/home.js', { message: 'vue server side render!' });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.client = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">yield</span> ctx.renderClient(<span class="hljs-string">'home/home.js'</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">'vue server side render!'</span> });
};</code></pre>
<ul><li>添加路由配置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/client', app.controller.home.home.client);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">app.get(<span class="hljs-string">'/client'</span>, app.controller.home.home.client);</code></pre>
<h3 id="articleHeader10">5.2 HTML静态页面前端渲染</h3>
<ul>
<li>直接有easywebpack构建出静态HTML文件, 请见 <code>webpack.config.js</code> 配置和 <code>app/web/page/html</code>代码实现</li>
<li>通过 <code>egg-static</code> 静态文件访问HTML文件</li>
</ul>
<h3 id="articleHeader11">5.3 单页面服务器渲染同构实现</h3>
<h4>5.3.1 单页面前端实现</h4>
<p>在app/web/page 目录下面创建app目录, app.vue, app.js 文件.</p>
<ul><li>app.vue 编写界面逻辑, 根元素为layout(自定义组件, 全局注册, 统一的html, meta, header, body)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <app-layout>
    <transition name=&quot;fade&quot; mode=&quot;out-in&quot;>
      <router-view></router-view>
    </transition>
  </app-layout>
</template>
<style lang=&quot;sass&quot;>

</style>
<script type=&quot;text/babel&quot;>
  export default {
    computed: {

    },
    mounted(){

    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">app-layout</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"fade"</span> <span class="hljs-attr">mode</span>=<span class="hljs-string">"out-in"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">app-layout</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/babel"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">computed</span>: {

    },
    mounted(){

    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>app.js 页面调用入口</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { sync } from 'vuex-router-sync';
import store from 'store/app';
import router from 'component/app/router';
import app from './app.vue';
import App from 'app';
import Layout from 'component/layout/app';

App.component(Layout.name, Layout);

sync(store, router);

export default App.init({
  base: '/app',
  ...app,
  router,
  store
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { sync } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex-router-sync'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'store/app'</span>;
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'component/app/router'</span>;
<span class="hljs-keyword">import</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.vue'</span>;
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'app'</span>;
<span class="hljs-keyword">import</span> Layout <span class="hljs-keyword">from</span> <span class="hljs-string">'component/layout/app'</span>;

App.component(Layout.name, Layout);

sync(store, router);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> App.init({
  <span class="hljs-attr">base</span>: <span class="hljs-string">'/app'</span>,
  ...app,
  router,
  store
});
</code></pre>
<h4>5.3.2 单页面后端实现</h4>
<ul><li>创建controller文件app.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.index = function* (ctx) {
  yield ctx.render('app/app.js', { url: this.url.replace(/\/app/, '') });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">exports.index = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">yield</span> ctx.render(<span class="hljs-string">'app/app.js'</span>, { <span class="hljs-attr">url</span>: <span class="hljs-keyword">this</span>.url.replace(<span class="hljs-regexp">/\/app/</span>, <span class="hljs-string">''</span>) });
};</code></pre>
<ul><li>添加路由配置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  app.get('/app(/.+)?', app.controller.app.app.index);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  app.get(<span class="hljs-string">'/app(/.+)?'</span>, app.controller.app.app.index);</code></pre>
<h2 id="articleHeader12">6. 项目部署</h2>
<ul>
<li>正式环境部署，请设置 <code>EGG_SERVER_ENV=prod</code> 环境变量, 更多请见<a href="https://eggjs.org/zh-cn/basics/env.html" rel="nofollow noreferrer" target="_blank">运行环境</a>
</li>
<li>构建的 <code>app/view</code> 目录, <code>public</code> 目录以及 <code>buildConfig.json</code> 和 <code>manifest.json</code>等文件, 都是 <code>gitignore</code> 的，部署时请注意把这些文件打包进去。</li>
</ul>
<h2 id="articleHeader13">7. 项目和插件</h2>
<ul>
<li>
<a href="https://github.com/hubcarl/egg-vue-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">egg-vue-webpack-boilerplate</a>基于easywebpack-vue和egg-view-vue(ssr)插件的工程骨架项目</li>
<li>
<a href="https://github.com/hubcarl/easywebpack" rel="nofollow noreferrer" target="_blank">easywebpack</a> Webpack 构建工程化.</li>
<li>
<a href="https://github.com/hubcarl/easywebpack-cli" rel="nofollow noreferrer" target="_blank">easywebpack-cli</a>  Webpack 构建工程化脚手架.</li>
<li>
<a href="https://github.com/eggjs/egg-view-vue" rel="nofollow noreferrer" target="_blank">egg-view-vue</a> vue ssr engine.</li>
<li>
<a href="https://github.com/hubcarl/egg-view-vue-ssr" rel="nofollow noreferrer" target="_blank">egg-view-vue-ssr</a> vue ssr 解决方案.</li>
<li>
<a href="https://github.com/hubcarl/egg-webpack" rel="nofollow noreferrer" target="_blank">egg-webpack</a> 本地开发热更新使用.</li>
<li>
<a href="https://github.com/hubcarl/egg-webpack-vue" rel="nofollow noreferrer" target="_blank">egg-webpack-vue</a> 本地开发渲染内存读取辅助插件</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Egg + Vue 服务端渲染开发指南

## 原文链接
[https://segmentfault.com/a/1190000011760514](https://segmentfault.com/a/1190000011760514)


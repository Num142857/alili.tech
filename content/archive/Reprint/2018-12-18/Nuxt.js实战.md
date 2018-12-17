---
title: 'Nuxt.js实战' 
date: 2018-12-18 2:30:11
hidden: true
slug: f5ncci9t2mw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一、为什么选择Nuxt.js</h1>
<p>多数是基于webpack构建的项目，编译出来的html文件，资源文件都被打包到js中，以下图404页面代码为例。从代码中可以看出，这样的页面是不利于 <strong>搜索引擎优化(SEO, Search Engine Optimization)</strong> ，并且 <strong>内容到达时间(time-to-content)</strong> （或称之为<strong>首屏渲染时长</strong>）也有很大的优化空间。为了解决以上问题，引入了 <strong>Nuxt.js</strong> 框架。</p>
<p>vue官网对于Nuxt.js也是很推荐的，除此之外，Nuxt.js的开发者积极活跃，版本迭代迅速。经过一系列rc版本后，终于在1月9日<strong>发布了 v1.0.0 正式版本</strong>！</p>
<p><span class="img-wrap"><img data-src="/img/bV1TRE?w=1596&amp;h=1014" src="https://static.alili.tech/img/bV1TRE?w=1596&amp;h=1014" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>图1. 使用webpack构建的HTML（代码已格式化）</p>
<p><span class="img-wrap"><img data-src="/img/bV1TRo?w=1600&amp;h=1006" src="https://static.alili.tech/img/bV1TRo?w=1600&amp;h=1006" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>图2. 使用 Nuxt.js 构建的HTML（代码已格式化）</p>
<h1 id="articleHeader1">二、Nuxt.js 简介</h1>
<p>Nuxt.js 是一个基于 <strong>Vue.js</strong> 的通用应用框架，它预设了利用 Vue.js 开发 <strong>服务端渲染（SSR, Server Side Render）</strong> 的应用所需要的各种配置，同时也可以一键生成静态站点。</p>
<p>作为框架，Nuxt.js 为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。区别于其他 vue SSR 框架，Nuxt.js 有以下比较明显的特性。</p>
<ul>
<li>自动代码分层</li>
<li>强大的路由功能，支持异步数据（路由无需额外配置）</li>
<li>HTML头部标签管理（依赖 vue-meta 实现）</li>
<li>内置 webpack 配置，无需额外配置</li>
</ul>
<h1 id="articleHeader2">三、项目实战</h1>
<h2 id="articleHeader3">1、项目创建</h2>
<p>官方提供了基于 <strong>vue-cli</strong> 脚手架工具，常用的有如下三个，更多脚手架工具可以查看 <a href="https://github.com/nuxt-community" rel="nofollow noreferrer" target="_blank">nuxt-community</a> 。本项目使用的是 <strong>express-template</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init nuxt-community/starter-template <project-name>

vue init nuxt-community/koa-template <project-name>
 
vue init nuxt-community/express-template <project-name>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>vue init nuxt-community/starter-template &lt;project-<span class="hljs-built_in">name</span>&gt;

vue init nuxt-community/koa-template &lt;project-<span class="hljs-built_in">name</span>&gt;
 
vue init nuxt-community/express-template &lt;project-<span class="hljs-built_in">name</span>&gt;</code></pre>
<h2 id="articleHeader4">2、开发</h2>
<h3 id="articleHeader5">1）目录结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─assets                 资源目录，未编译的静态资源如less、js
├─components             组件目录
├─layouts                布局目录
├─mock                   mock数据
├─node_modules           
├─pages                  页面目录
  ├─index.vue
  ├─....                 
├─plugins                插件
├─server                 express服务
├─static                 静态文件目录
├─store                  vuex store
├─utils                  工具方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>├─assets                 资源目录，未编译的静态资源如less、js
├─components             组件目录
├─layouts                布局目录
├─mock                   mock数据
├─node_modules           
├─pages                  页面目录
  ├─<span class="hljs-keyword">index</span>.vue
  ├─....                 
├─plugins                插件
├─<span class="hljs-keyword">server</span>                 express服务
├─<span class="hljs-keyword">static</span>                 静态文件目录
├─store                  vuex store
├─utils                  工具方法</code></pre>
<h3 id="articleHeader6">2）配置</h3>
<p>Nuxt.js 默认的配置涵盖了大部分使用情形，也可通过修改 <code>nuxt.config.js</code> 来覆盖默认配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// nuxt.config.js 文件配置
const path = require('path')

module.exports = {
  // Headers of the page
  head: {
    title: '默认共用title',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' },
      { content: 'telephone=no', name: 'format-detection' }
    ],
    // html head 中创建 script 标签
    script: [
      { innerHTML: require('./assets/js/flexible_nuxt'), type: 'text/javascript', charset: 'utf-8'}
    ],
    // 不对<script>标签中内容做转义处理
    __dangerouslyDisableSanitizers: ['script']
  },
  // Global CSS
  css: ['~/assets/css/reset.css', '~/assets/css/main.less'],
  // Global env
  env: {
    __ENV: process.env.__ENV
  },
  build: {
    vendor: ['axios'],
    postcss: [
      require('postcss-px2rem')({
        remUnit: 75
      })
    ],
    extend (config, ctx) {
      if (ctx.isClient) {
        // 拓展 webpack 配置
        config.entry['polyfill'] = ['babel-polyfill']
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // 添加 alias 配置
        Object.assign(config.resolve.alias, {
          'utils': path.resolve(__dirname, 'utils')
        })
      }
    }
  },
  plugins: [{src: '~plugins/toast', ssr: false}, {src: '~plugins/dialog', ssr: false}]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// nuxt.config.js 文件配置</span>
const path = require(<span class="hljs-string">'path'</span>)

module.exports = {
  <span class="hljs-comment">// Headers of the page</span>
<span class="hljs-symbol">  head:</span> {
<span class="hljs-symbol">    title:</span> <span class="hljs-string">'默认共用title'</span>,
<span class="hljs-symbol">    meta:</span> [
      { <span class="hljs-string">charset:</span> <span class="hljs-string">'utf-8'</span> },
      { <span class="hljs-string">'http-equiv'</span>: <span class="hljs-string">'pragma'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'no-cache'</span> },
      { <span class="hljs-string">'http-equiv'</span>: <span class="hljs-string">'cache-control'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'no-cache'</span> },
      { <span class="hljs-string">'http-equiv'</span>: <span class="hljs-string">'expires'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'0'</span> },
      { <span class="hljs-string">content:</span> <span class="hljs-string">'telephone=no'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'format-detection'</span> }
    ],
    <span class="hljs-comment">// html head 中创建 script 标签</span>
<span class="hljs-symbol">    script:</span> [
      { <span class="hljs-string">innerHTML:</span> require(<span class="hljs-string">'./assets/js/flexible_nuxt'</span>), <span class="hljs-string">type:</span> <span class="hljs-string">'text/javascript'</span>, <span class="hljs-string">charset:</span> <span class="hljs-string">'utf-8'</span>}
    ],
    <span class="hljs-comment">// 不对&lt;script&gt;标签中内容做转义处理</span>
<span class="hljs-symbol">    __dangerouslyDisableSanitizers:</span> [<span class="hljs-string">'script'</span>]
  },
  <span class="hljs-comment">// Global CSS</span>
<span class="hljs-symbol">  css:</span> [<span class="hljs-string">'~/assets/css/reset.css'</span>, <span class="hljs-string">'~/assets/css/main.less'</span>],
  <span class="hljs-comment">// Global env</span>
<span class="hljs-symbol">  env:</span> {
<span class="hljs-symbol">    __ENV:</span> process.env.__ENV
  },
<span class="hljs-symbol">  build:</span> {
<span class="hljs-symbol">    vendor:</span> [<span class="hljs-string">'axios'</span>],
<span class="hljs-symbol">    postcss:</span> [
      require(<span class="hljs-string">'postcss-px2rem'</span>)({
<span class="hljs-symbol">        remUnit:</span> <span class="hljs-number">75</span>
      })
    ],
    extend (config, ctx) {
      <span class="hljs-keyword">if</span> (ctx.isClient) {
        <span class="hljs-comment">// 拓展 webpack 配置</span>
        config.entry[<span class="hljs-string">'polyfill'</span>] = [<span class="hljs-string">'babel-polyfill'</span>]
        config.module.rules.push({
<span class="hljs-symbol">          enforce:</span> <span class="hljs-string">'pre'</span>,
<span class="hljs-symbol">          test:</span> <span class="hljs-regexp">/\.(js|vue)$/</span>,
<span class="hljs-symbol">          loader:</span> <span class="hljs-string">'eslint-loader'</span>,
<span class="hljs-symbol">          exclude:</span> <span class="hljs-regexp">/(node_modules)/</span>
        })
        <span class="hljs-comment">// 添加 alias 配置</span>
        Object.assign(config.resolve.alias, {
          <span class="hljs-string">'utils'</span>: path.resolve(__dirname, <span class="hljs-string">'utils'</span>)
        })
      }
    }
  },
<span class="hljs-symbol">  plugins:</span> [{<span class="hljs-string">src:</span> <span class="hljs-string">'~plugins/toast'</span>, <span class="hljs-string">ssr:</span> <span class="hljs-literal">false</span>}, {<span class="hljs-string">src:</span> <span class="hljs-string">'~plugins/dialog'</span>, <span class="hljs-string">ssr:</span> <span class="hljs-literal">false</span>}]
}
</code></pre>
<p><strong>HTML头部标签管理</strong>：</p>
<p>Nuxt.js 通过 <a href="https://github.com/declandewet/vue-meta" rel="nofollow noreferrer" target="_blank">vue-meta</a> 实现头部标签管理，在 <code>nuxt.config.js</code> 中的 <code>head</code> 配置。所有的页面都会走这个配置，如果想要修改某一页面的title，可以在 pages/**.vue 文件下，添加如下配置，这时该页面的标题就变成了“收车费”，其余页面还保持原有标题不变。</p>
<p><span class="img-wrap"><img data-src="/img/bV1RJ9?w=1382&amp;h=596" src="https://static.alili.tech/img/bV1RJ9?w=1382&amp;h=596" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在config header配置中， <code>__dangerouslyDisableSanitizers: ['script']</code> 主要是为了不对&lt;script&gt;标签中内容做转义处理。看下面的例子?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="head: {
    title: 'myTitle',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'cache-control', content: 'no-cache' },
      { 'http-equiv': 'expires', content: '0' },
      { content: 'telephone=no', name: 'format-detection' }
    ],
    script: [
      { innerHTML: 'console.log(&quot;hello&quot;)', type: 'text/javascript', charset: 'utf-8'}
    ]
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">head:</span> {
<span class="hljs-symbol">    title:</span> <span class="hljs-string">'myTitle'</span>,
<span class="hljs-symbol">    meta:</span> [
      { <span class="hljs-string">charset:</span> <span class="hljs-string">'utf-8'</span> },
      { <span class="hljs-string">'http-equiv'</span>: <span class="hljs-string">'pragma'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'no-cache'</span> },
      { <span class="hljs-string">'http-equiv'</span>: <span class="hljs-string">'cache-control'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'no-cache'</span> },
      { <span class="hljs-string">'http-equiv'</span>: <span class="hljs-string">'expires'</span>, <span class="hljs-string">content:</span> <span class="hljs-string">'0'</span> },
      { <span class="hljs-string">content:</span> <span class="hljs-string">'telephone=no'</span>, <span class="hljs-string">name:</span> <span class="hljs-string">'format-detection'</span> }
    ],
<span class="hljs-symbol">    script:</span> [
      { <span class="hljs-string">innerHTML:</span> <span class="hljs-string">'console.log("hello")'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'text/javascript'</span>, <span class="hljs-string">charset:</span> <span class="hljs-string">'utf-8'</span>}
    ]
  },</code></pre>
<p>生成 html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script data-n-head=&quot;true&quot; type=&quot;text/javascript&quot; charset=&quot;utf-8&quot;>console.log(&amp;quot;hello&amp;quot;)</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">data-n-head</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span><span class="javascript"><span class="hljs-built_in">console</span>.log(&amp;quot;hello&amp;quot;)</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>我们发现 vue-meta 把引号做了转义处理，加入 <code>__dangerouslyDisableSanitizers: ['script']</code> 后，就不会再对这些字符做转义了，该字段使用需慎重！</p>
<h3 id="articleHeader7">3）路由</h3>
<p>Nuxt.js 依据 pages 目录结构，自动生成 <code>vue-router</code> 模块的路由配置。</p>
<p>假设 pages 的目录结构如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV1R2k?w=618&amp;h=324" src="https://static.alili.tech/img/bV1R2k?w=618&amp;h=324" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>那么，Nuxt.js 自动生成的路由配置如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV1R1l?w=1382&amp;h=1556" src="https://static.alili.tech/img/bV1R1l?w=1382&amp;h=1556" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong>嵌套路由</strong>：</p>
<p>创建内嵌子路由，需要添加一个 Vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件。在父级 Vue 文件内增加 &lt;nuxt-child/&gt; 用于显示子视图内容。</p>
<h3 id="articleHeader8">4）布局</h3>
<p>Nuxt.js布局方式如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV1The?w=260&amp;h=356" src="https://static.alili.tech/img/bV1The?w=260&amp;h=356" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>layouts对应目录中的layouts文件夹，默认pages下的页面走的都是 <strong>layouts/default.vue</strong> 布局方式，如下图。其中&lt;nuxt/&gt;可以类似<code>vue</code>中<code>slot</code>插槽的概念，pages/**.vue中的内容会插在<code>&lt;nuxt/&gt;</code>内。</p>
<p><span class="img-wrap"><img data-src="/img/bV1TSp?w=2138&amp;h=1178" src="https://static.alili.tech/img/bV1TSp?w=2138&amp;h=1178" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>此外，如果想要某一页面，不走默认布局方式，可以在vue文件中配置layouts，如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
export default {
  layout: 'demo_layout',
  ...
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">layout</span>: <span class="hljs-string">'demo_layout'</span>,
  ...
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader9">5）vuex</h3>
<p>在根目录创建 store 目录，就会默认引用 <strong>vuex</strong> 模块，除此之外，还进行了以下的操作：1）将 vuex 模块 加到 vendors 构建配置中去；2）设置 Vue 根实例的 store 配置项。</p>
<p>Nuxt.js 支持两种使用 store 的方式：</p>
<ul>
<li>普通方式：store/index.js 返回一个 Vuex.Store 实例</li>
<li>模块方式：store 目录下的每个 .js 文件会被转换成为状态树指定命名的子模块 （当然，index 是根模块，相当于设置了namespaced: true)</li>
</ul>
<p>Nuxt.js提供了模块方式的简单写法：使用状态树模块化的方式，store/index.js 不需要返回 Vuex.Store 实例，直接将 <strong>state、mutations 和 actions</strong> 暴露出来即可。示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const state = () => ({
  accesstoken: ''
})

export const mutations = {
  setAccesstoken (state, accesstoken) {
    state.accesstoken = accesstoken
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export const <span class="hljs-keyword">state</span> = () =&gt; ({
  accesstoken: ''
})

export const mutations = {
  <span class="hljs-built_in">set</span>Accesstoken (<span class="hljs-keyword">state</span>, accesstoken) {
    <span class="hljs-keyword">state</span>.accesstoken = accesstoken
  }
}</code></pre>
<h3 id="articleHeader10">6）异步数据 asyncData</h3>
<p>Nuxt.js 增加了一个 <strong>asyncData</strong> 方法，用于 在设置组件数据 之前 能够异步获取 或 处理数据。<br>由于 <code>asyncData</code> 是在组件 初始化 之前被调用的，所以不能通过 <code>this</code> 引用组件的实例对象，可以使用上下文对象来实现某些功能，可参考 <a href="https://nuxtjs.org/api/context" rel="nofollow noreferrer" target="_blank">context api</a><br>示例?：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="asyncData (params) {
  let accesstoken = params.route.query.accesstoken
  // request 基于 axios 封装的函数
  return request({
    url: '/drivers/banks',
    method: 'get',
    headers: {
      accesstoken
    }
  })
    .then(res => {
      let {
        bankInfo
      } = res.data
      return {
        banksData: bankInfo,
        accesstoken
      }
    })
    .catch(err => {
      return error({ message: 'accesstoken not found', statusCode: 404 })
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>asyncData (params) {
  <span class="hljs-keyword">let</span> accesstoken = params.route.query.accesstoken
  // request 基于 axios 封装的函数
  <span class="hljs-keyword">return</span> request({
    ur<span class="hljs-variable">l:</span> <span class="hljs-string">'/drivers/banks'</span>,
    method: <span class="hljs-string">'get'</span>,
    header<span class="hljs-variable">s:</span> {
      accesstoken
    }
  })
    .then(<span class="hljs-keyword">res</span> =&gt; {
      <span class="hljs-keyword">let</span> {
        bankInfo
      } = <span class="hljs-keyword">res</span>.data
      <span class="hljs-keyword">return</span> {
        banksDat<span class="hljs-variable">a:</span> bankInfo,
        accesstoken
      }
    })
    .<span class="hljs-keyword">catch</span>(err =&gt; {
      <span class="hljs-keyword">return</span> error({ message: <span class="hljs-string">'accesstoken not found'</span>, statusCode: <span class="hljs-number">404</span> })
    })
}</code></pre>
<p>上述代码，会在 组件初始化 之前，请求<code>'/drivers/banks'</code>接口，接口返回的数据会 <strong>融合在 data</strong> 中，一并返回模版显示。在浏览器中，使用Vue DevTools可以清晰的查看到 <code>banksData</code>, <code>accesstoken</code> 都在data中。<br>在调试中发现，刷新页面时，该请求是在服务端发送的，由其他页面回退到该页面时，请求是在客户端发送的。</p>
<h3 id="articleHeader11">7）fecth方法</h3>
<p>与 <code>asyncData</code> 方法类似，不同的是它不会设置组件的数据，作用是设置 <code>store</code> 数据。</p>
<h1 id="articleHeader12">五、总结</h1>
<p>本项目在开发中，使用的是 1.0.0-rc9 版本，我们正在积极尝试迁移到 1.0.0 正式版本。但是，1.0.0-rc9 版本，未见明显问题，比较稳定，足以投入到生产中。<br>本文主要介绍 Nuxt.js 的特性，后面还会和大家分享踩的坑。文中有任何表述不清或不当的地方，欢迎大家批评指正。<br>此外，推荐我们的公众号 <strong>前端新视野</strong> ，一个很认真的日刊公众号，欢迎扫描下方二维码关注！</p>
<p><span class="img-wrap"><img data-src="/img/bV1SGS?w=344&amp;h=344" src="https://static.alili.tech/img/bV1SGS?w=344&amp;h=344" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nuxt.js实战

## 原文链接
[https://segmentfault.com/a/1190000012802572](https://segmentfault.com/a/1190000012802572)


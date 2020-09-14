---
title: 'Nuxt.js 基础入门教程' 
date: 2018-12-14 2:30:11
hidden: true
slug: jlrarcxdpmg
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://blog.leungjz.top/blog/5b0535792c24a940bcf1997b" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<p>Vue 开发一个单页面应用，相信很多前端工程师都已经学会了，但是单页面应用有一个致命的缺点，就是 SEO 极不友好。除非，vue 能在服务端渲染（ssr）并直接返回已经渲染好的页面，而并非只是一个单纯的 <code>&lt;div id="app"&gt;&lt;/div&gt;</code>。</p>
<p><a href="https://zh.nuxtjs.org/" rel="nofollow noreferrer" target="_blank">Nuxt.js</a> 就是一个极简的 vue 版的 ssr 框架。基于它，我们可以快速开发一个基于 vue 的 ssr 单页面应用。</p>
<h3 id="articleHeader0">安装</h3>
<p>Nuxt.js 官方提供了一个模板，可以使用 vue-cli 直接安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ vue init nuxt-community/starter-template <project-name>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ vue init nuxt-community/starter-template &lt;project-name&gt;</code></pre>
<h3 id="articleHeader1">目录结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md
├── assets
├── components
├── layouts
├── middleware
├── node_modules
├── nuxt.config.js
├── package.json
├── pages
├── plugins
├── static
├── store
└── yarn.lock" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── README<span class="hljs-selector-class">.md</span>
├── assets
├── components
├── layouts
├── middleware
├── node_modules
├── nuxt<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
├── package<span class="hljs-selector-class">.json</span>
├── pages
├── plugins
├── static
├── store
└── yarn.lock</code></pre>
<p>其中：</p>
<ol>
<li>
<strong>assets</strong>: 资源文件。放置需要经过 webpack 打包处理的资源文件，如 scss，图片，字体等。</li>
<li>
<strong>components</strong>: 组件。这里存放在页面中，可以复用的组件。</li>
<li>
<strong>layouts</strong>: 布局。页面都需要有一个布局，默认为 default。它规定了一个页面如何布局页面。所有页面都会加载在布局页面中的 <code>&lt;nuxt /&gt;</code> 标签中。如果需要在普通页面中使用下级路由，则需要在页面中添加 <code>&lt;nuxt-child /&gt;</code>。<strong>该目录名为Nuxt.js保留的，不可更改。</strong>
</li>
<li>
<strong>middleware</strong>: 中间件。存放中间件。可以在页面中调用： <code>middleware: 'middlewareName'</code> 。</li>
<li>
<p><strong>pages</strong>: 页面。一个 vue 文件即为一个页面。index.vue 为根页面。</p>
<ol>
<li>若需要二级页面，则添加文件夹即可。</li>
<li>如果页面的名称类似于 <code>_id.vue</code> （以 <code>_</code> 开头），则为动态路由页面，<code>_</code> 后为匹配的变量（params）。</li>
<li>若变量是必须的，则在文件夹下建立空文件 <code>index.vue</code>。更多的配置请移步至 <a href="https://zh.nuxtjs.org/guide/routing" rel="nofollow noreferrer" target="_blank">官网</a> 。</li>
</ol>
</li>
<li>
<strong>plugin</strong>: 插件。用于组织那些需要在 <code>根vue.js应用</code> 实例化之前需要运行的 Javascript 插件。<strong>需要注意的是，在任何 Vue 组件的<a href="https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram" rel="nofollow noreferrer" target="_blank">生命周期</a>内， 只有 <code>beforeCreate</code> 和 <code>created</code> 这两个钩子方法会在 <em>客户端和服务端均被调用</em>。其他钩子方法仅在客户端被调用。</strong>
</li>
<li>
<strong>static</strong>: 静态文件。放置不需要经过 webpack 打包的静态资源。如一些 js, css 库。</li>
<li>
<strong>store</strong>: 状态管理。具体使用请移步至 <a href="https://zh.nuxtjs.org/guide/vuex-store" rel="nofollow noreferrer" target="_blank">官网</a>。</li>
<li>
<strong>nuxt.config.js</strong>: <code>nuxt.config.js</code> 文件用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。具体配置请移步至 <a href="https://zh.nuxtjs.org/guide/configuration" rel="nofollow noreferrer" target="_blank">官网</a>。</li>
</ol>
<h3 id="articleHeader2">Nuxt 特有函数</h3>
<p>首先，了解一下在 nuxt 的页面中独有的函数/变量：</p>
<h4>asyncData(context)</h4>
<p><code>asyncData</code>方法使得你能够在渲染组件之前异步获取数据。该方法在<strong>服务端</strong>中执行的，所以，请求数据时，<strong>不存在跨域问题</strong>。返回的数据将与 <code>data()</code> 返回的数据进行合并。<strong>由于<code>asyncData</code>方法是在组件 <em>初始化</em> 前被调用的，所以在方法内是没有办法通过 <code>this</code> 来引用组件的实例对象。</strong></p>
<p><code>context</code> 变量的可用属性一览：</p>
<table>
<thead><tr>
<th>属性字段</th>
<th>类型</th>
<th>可用</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td><code>isClient</code></td>
<td>Boolean</td>
<td>客户端 &amp; 服务端</td>
<td>是否来自客户端渲染</td>
</tr>
<tr>
<td><code>isServer</code></td>
<td>Boolean</td>
<td>客户端 &amp; 服务端</td>
<td>是否来自服务端渲染</td>
</tr>
<tr>
<td><code>isDev</code></td>
<td>Boolean</td>
<td>客户端 &amp; 服务端</td>
<td>是否是开发(dev) 模式，在生产环境的数据缓存中用到</td>
</tr>
<tr>
<td><code>route</code></td>
<td><a href="https://router.vuejs.org/zh-cn/api/route-object.html" rel="nofollow noreferrer" target="_blank">vue-router 路由</a></td>
<td>客户端 &amp; 服务端</td>
<td>
<code>vue-router</code> 路由实例。</td>
</tr>
<tr>
<td><code>store</code></td>
<td><a href="http://vuex.vuejs.org/zh-cn/api.html#vuexstore-instance-properties" rel="nofollow noreferrer" target="_blank">vuex 数据流</a></td>
<td>客户端 &amp; 服务端</td>
<td>
<code>Vuex.Store</code> 实例。<strong>只有vuex 数据流存在相关配置时可用。</strong>
</td>
</tr>
<tr>
<td><code>env</code></td>
<td>Object</td>
<td>客户端 &amp; 服务端</td>
<td>
<code>nuxt.config.js</code> 中配置的环境变量, 见 <a href="https://zh.nuxtjs.org/api/configuration-env" rel="nofollow noreferrer" target="_blank">环境变量 api</a>
</td>
</tr>
<tr>
<td><code>params</code></td>
<td>Object</td>
<td>客户端 &amp; 服务端</td>
<td>route.params 的别名</td>
</tr>
<tr>
<td><code>query</code></td>
<td>Object</td>
<td>客户端 &amp; 服务端</td>
<td>route.query 的别名</td>
</tr>
<tr>
<td><code>req</code></td>
<td><a href="https://nodejs.org/api/http.html#http_class_http_incomingmessage" rel="nofollow noreferrer" target="_blank">http.Request</a></td>
<td>服务端</td>
<td>Node.js API 的 Request 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。<em>nuxt generate 不可用</em>。</td>
</tr>
<tr>
<td><code>res</code></td>
<td><a href="https://nodejs.org/api/http.html#http_class_http_serverresponse" rel="nofollow noreferrer" target="_blank">http.Response</a></td>
<td>服务端</td>
<td>Node.js API 的 Response 对象。如果 nuxt 以中间件形式使用的话，这个对象就根据你所使用的框架而定。<em>nuxt generate 不可用</em>。</td>
</tr>
<tr>
<td><code>redirect</code></td>
<td>Function</td>
<td>客户端 &amp; 服务端</td>
<td>用这个方法重定向用户请求到另一个路由。状态码在服务端被使用，默认 302。<code>redirect([status,] path [, query])</code>
</td>
</tr>
<tr>
<td><code>error</code></td>
<td>Function</td>
<td>客户端 &amp; 服务端</td>
<td>用这个方法展示错误页：<code>error(params)</code>。<code>params</code> 参数应该包含 <code>statusCode</code> 和 <code>message</code> 字段。</td>
</tr>
</tbody>
</table>
<h4>fetch(context)</h4>
<p><em>fetch 方法用于在渲染页面前填充应用的状态树（store）数据， 与 asyncData 方法类似，不同的是它不会设置组件的数据。为了让获取过程可以异步，<strong>你需要返回一个 Promise</strong>，Nuxt.js 会等这个 promise 完成后再渲染组件。</em></p>
<p><strong>fetch 会在组件每次加载前被调用（在服务端或切换至目标路由之前）。</strong></p>
<h4>head</h4>
<p>Nuxt.js 使用了 <a href="https://github.com/declandewet/vue-meta" rel="nofollow noreferrer" target="_blank"><code>vue-meta</code></a> 更新应用的 <code>头部标签(Head)</code> 和 <code>html 属性</code>。</p>
<p>用于更新 头部信息。如 title，descripe 等。<strong>在 <code>head</code> 方法里可通过 <code>this</code> 关键字来获取组件的数据。</strong></p>
<h4>layout</h4>
<p>指定该页面使用哪个布局文件。默认值为 <code>default</code>。</p>
<h4>middleware</h4>
<p>需要执行的中间件，如鉴权的 <code>auth</code>等。</p>
<h4>transition</h4>
<p>指定页面切换时的动画效果。支持传入 <code>String</code>, <code>Object</code>, <code>Function</code>。具体配置请移步至 <a href="https://zh.nuxtjs.org/api/pages-transition" rel="nofollow noreferrer" target="_blank">官网</a> 。</p>
<h4>validate</h4>
<p>Nuxt.js 可以让你在动态路由对应的页面组件中配置一个校验方法用于校验动态路由参数的有效性。</p>
<p>返回 <code>true</code> 说明路由有效，则进入路由页面。返回不是 <code>true</code> 则显示 404 页面。</p>
<h3 id="articleHeader3">Begin Coding</h3>
<h4>前置工作</h4>
<h5>API</h5>
<p>在这里，我们使用 <a href="https://cnodejs.org/api" rel="nofollow noreferrer" target="_blank">CNode API</a> 进行开发 Demo.</p>
<h5>axios</h5>
<p>请求数据，我们使用 Nuxt 官方提供的 <a href="https://github.com/nuxt-community/axios-module" rel="nofollow noreferrer" target="_blank">@nuxtjs/axios</a> 安装后，在 nuxt.config.js 中加上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  ...
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: 'https://cnodejs.org/api/v1',
    // or other axios configs.
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...
  modules: [
    <span class="hljs-string">'@nuxtjs/axios'</span>
  ],
  <span class="hljs-attr">axios</span>: {
    <span class="hljs-attr">baseURL</span>: <span class="hljs-string">'https://cnodejs.org/api/v1'</span>,
    <span class="hljs-comment">// or other axios configs.</span>
  }
  ...
}</code></pre>
<p>就可以在页面中通过 <code>this.$axios.$get</code> 来获取数据，不需要在每个页面都单独引入 axios.</p>
<h5>scss</h5>
<p>需要先安装 sass-loader 和 node-sass</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$    yarn add sass-loader node-sass --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$    yarn add sass-loader node-sass --dev</code></pre>
<p>如果需要在项目中全局使用某个 scss 文件（如 mixins, vars 等），需要借助 sass-resources-loader : <code>yarn add sass-resources-loader —dev</code>， 还需要在 nuxt.config.js 的 build 配置中调整导出的 loader 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  ...
  build: {
    extend(config, { isDev, isClient }) {
      const sassResourcesLoader = {  
        loader: 'sass-resources-loader',  
        options: {  
          resources: [
            // 填写需要全局注入 scss 的文件。引入后，所有页面均有效。
            'assets/styles/mixins.scss'  
          ]
        }  
      }
      // 修改 scss sass 引用的 loader。
      config.module.rules.forEach((rule) => {  
        if (rule.test.toString() === '/\\.vue$/') {  
          rule.options.loaders.sass.push(sassResourcesLoader)  
          rule.options.loaders.scss.push(sassResourcesLoader)  
        }  
        if (['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1) {  
          rule.use.push(sassResourcesLoader)  
        }  
      })  
    }
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...
  build: {
    extend(config, { isDev, isClient }) {
      <span class="hljs-keyword">const</span> sassResourcesLoader = {  
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'sass-resources-loader'</span>,  
        <span class="hljs-attr">options</span>: {  
          <span class="hljs-attr">resources</span>: [
            <span class="hljs-comment">// 填写需要全局注入 scss 的文件。引入后，所有页面均有效。</span>
            <span class="hljs-string">'assets/styles/mixins.scss'</span>  
          ]
        }  
      }
      <span class="hljs-comment">// 修改 scss sass 引用的 loader。</span>
      config.module.rules.forEach(<span class="hljs-function">(<span class="hljs-params">rule</span>) =&gt;</span> {  
        <span class="hljs-keyword">if</span> (rule.test.toString() === <span class="hljs-string">'/\\.vue$/'</span>) {  
          rule.options.loaders.sass.push(sassResourcesLoader)  
          rule.options.loaders.scss.push(sassResourcesLoader)  
        }  
        <span class="hljs-keyword">if</span> ([<span class="hljs-string">'/\\.sass$/'</span>, <span class="hljs-string">'/\\.scss$/'</span>].indexOf(rule.test.toString()) !== <span class="hljs-number">-1</span>) {  
          rule.use.push(sassResourcesLoader)  
        }  
      })  
    }
  }
  ...
}</code></pre>
<h4>首页</h4>
<p>首页一般只需要简单的获取首页数据并渲染即可。</p>
<p>主要 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="asyncData({app, query}) {
  console.log(query)
  // 根据不用的标签获取不同的数据，最后返回话题列表。
  return app.$axios.$get(`topics?tab=${query.tab || ''}`).then(res => {
    // console.log(res)
    // console.log(JSON.parse(res))
    return {list: res.data}
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">asyncData({app, query}) {
  <span class="hljs-built_in">console</span>.log(query)
  <span class="hljs-comment">// 根据不用的标签获取不同的数据，最后返回话题列表。</span>
  <span class="hljs-keyword">return</span> app.$axios.$get(<span class="hljs-string">`topics?tab=<span class="hljs-subst">${query.tab || <span class="hljs-string">''</span>}</span>`</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-comment">// console.log(res)</span>
    <span class="hljs-comment">// console.log(JSON.parse(res))</span>
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">list</span>: res.data}
  })
}</code></pre>
<p>当进入首页时，该函数会被执行， nuxt 会等到获取数据后再和组件的 data 合并，进而渲染数据。在模板中，可以直接使用 list 变量获取数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;card fluid topic&quot; v-for=&quot;topic in list&quot; :key=&quot;topic.id&quot; >
  <div class=&quot;section&quot;>
    <h3><nuxt-link :to=&quot;{name: 'topic-id', params: {id: topic.id"}}"&quot; class=&quot;topic-title&quot;>"{{"topic.title"}}"</nuxt-link></h3>
    <p class=&quot;topic-info&quot;>
      <mark v-if=&quot;topic.top&quot; class=&quot;tertiary&quot;>精华</mark>
      <mark v-else>"{{"tabsObj[topic.tab]"}}"</mark>
      <span class=&quot;avatar&quot;>
        <img :src=&quot;topic.author.avatar_url&quot; alt=&quot;&quot;>
      </span>
      <span class=&quot;username&quot;>
        "{{"topic.author.loginname"}}"
      </span>
    </p>
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card fluid topic"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"topic in list"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"topic.id"</span> &gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"section"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">nuxt-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{name: 'topic-id', params: {id: topic.id"}}""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topic-title"</span>&gt;</span>"{{"topic.title"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">nuxt-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"topic-info"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mark</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"topic.top"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tertiary"</span>&gt;</span>精华<span class="hljs-tag">&lt;/<span class="hljs-name">mark</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mark</span> <span class="hljs-attr">v-else</span>&gt;</span>"{{"tabsObj[topic.tab]"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">mark</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"topic.author.avatar_url"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"username"</span>&gt;</span>
        "{{"topic.author.loginname"}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>在这里提及一下， <code>&lt;nuxt-link /&gt;</code> 和 <code>&lt;a /&gt;</code> 的区别是： <code>nuxt-link</code> 走的是 vue-router 的路由，即网页已为单页面，并且浏览器不会重定向。而  <code>a</code> 标签走的是 <code>window.location.href</code>，每一次点击 <code>a</code> 标签后的页面，都会进行一次服务端渲染，和普通的 PHP 混合开发没有太大的区别。</p>
<p>在这里使用了 <code>nuxt-link</code> 是因为 CNode 的 API 不存在跨域问题，因此可以作为一个单页面应用，体验更好。</p>
<p>因为列表页数据类型有多种，该页面可能会被复用，所以当路由对象发生变化时，需要重新获取数据，这时可以监听路由的变化以做出响应：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  '$route': function() {
    console.log('$route has changed.')
    this.getData()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">watch: {
  <span class="hljs-string">'$route'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'$route has changed.'</span>)
    <span class="hljs-keyword">this</span>.getData()
  }
}</code></pre>
<p>配置 seo 优化（这里只是单纯的复制罢了，demo 使用，侵删）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="head() {
  return {
    title: '首页' + (this.$route.query.tab ? `- ${this.tabsObj[this.$route.query.tab]}` : ''),
    meta: [{
      hid: 'description',
      name: 'description',
      content: 'CNode：Node.js专业中文社区'
    }]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">head() {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'首页'</span> + (<span class="hljs-keyword">this</span>.$route.query.tab ? <span class="hljs-string">`- <span class="hljs-subst">${<span class="hljs-keyword">this</span>.tabsObj[<span class="hljs-keyword">this</span>.$route.query.tab]}</span>`</span> : <span class="hljs-string">''</span>),
    <span class="hljs-attr">meta</span>: [{
      <span class="hljs-attr">hid</span>: <span class="hljs-string">'description'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'description'</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">'CNode：Node.js专业中文社区'</span>
    }]
  }
}</code></pre>
<h4>话题详情</h4>
<p>同样的，使用 <code>asyncData</code> 函数进行获取数据，再渲染页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="asyncData({app, params}) {
  console.log(params)
  return app.$axios.$get('topic/' + params.id).then(res => {
    // let data = res.data instanceof String ? JSON.parse(res.data) : res.data
    let data = res.data
    // console.log(res)
    // let div = document.createElement('div')
    // div.innerHTML = res.data.data.content
    // res.data.summary = div.innerText.substr(0, 120)
    data.summary = data.content.replace(/<[^>]+>/g,&quot;&quot;).substr(0, 120).replace(/\s+/g, '')
    return {detail: data}
  }).catch(err => {
    console.log('axios.get failed.')
    console.error(err)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">asyncData({app, params}) {
  <span class="hljs-built_in">console</span>.log(params)
  <span class="hljs-keyword">return</span> app.$axios.$get(<span class="hljs-string">'topic/'</span> + params.id).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
    <span class="hljs-comment">// let data = res.data instanceof String ? JSON.parse(res.data) : res.data</span>
    <span class="hljs-keyword">let</span> data = res.data
    <span class="hljs-comment">// console.log(res)</span>
    <span class="hljs-comment">// let div = document.createElement('div')</span>
    <span class="hljs-comment">// div.innerHTML = res.data.data.content</span>
    <span class="hljs-comment">// res.data.summary = div.innerText.substr(0, 120)</span>
    data.summary = data.content.replace(<span class="hljs-regexp">/&lt;[^&gt;]+&gt;/g</span>,<span class="hljs-string">""</span>).substr(<span class="hljs-number">0</span>, <span class="hljs-number">120</span>).replace(<span class="hljs-regexp">/\s+/g</span>, <span class="hljs-string">''</span>)
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">detail</span>: data}
  }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'axios.get failed.'</span>)
    <span class="hljs-built_in">console</span>.error(err)
  })
}</code></pre>
<p>在这里，踩过坑。想使用 div 的 innerText 来过滤掉正文中的 HTML 标签，但是，如果用户是直接进入这个页面的时候，执行 <code>asyncData</code> 时，<code>document</code> 对象是不存在的，从而会报错。也就是说，<strong>当 <code>asyncData</code> 在服务端执行时，是没有 <code>document</code> 和 <code>window</code> 对象的</strong>，请大家注意一下。</p>
<p>作为一个社区，seo 尤为重要，倘若每个页面都需要写一大堆的 head 对象，就会显得尤其的繁琐。所以可以借助 nuxt 的 plugin 机制，将其封装成一个函数，并注入到每一个页面当中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// plugins/global.js
import Vue from 'vue'

Vue.mixin({
  methods: {
    // 必传 标题，描述。其他的 meta 标签通过 payload 注入，其中，每个 meta 的 hid 需要是唯一的。
    $seo(title, content, payload = []) {
      return {
        title,
        meta: [{
          hid: 'description',
          name: 'description',
          content
        }].concat(payload)
      }
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// plugins/global.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

Vue.mixin({
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 必传 标题，描述。其他的 meta 标签通过 payload 注入，其中，每个 meta 的 hid 需要是唯一的。</span>
    $seo(title, content, payload = []) {
      <span class="hljs-keyword">return</span> {
        title,
        <span class="hljs-attr">meta</span>: [{
          <span class="hljs-attr">hid</span>: <span class="hljs-string">'description'</span>,
          <span class="hljs-attr">name</span>: <span class="hljs-string">'description'</span>,
          content
        }].concat(payload)
      }
    }
  }
})</code></pre>
<p>在 nuxt.config.js 中加上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  plugins: [
    '~plugins/global.js'
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-string">'~plugins/global.js'</span>
  ]
}</code></pre>
<p>这样，只需要在页面的 <code>head</code> 的函数中，返回该函数即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="head() {
    return this.$seo(this.detail.title, this.detail.summary)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">head() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$seo(<span class="hljs-keyword">this</span>.detail.title, <span class="hljs-keyword">this</span>.detail.summary)
}</code></pre>
<p><span class="img-wrap"><img data-src="https://ws3.sinaimg.cn/large/006tNc79gy1fo5dh2n4k5j314k0nq0vu.jpg" src="https://static.alili.techhttps://ws3.sinaimg.cn/large/006tNc79gy1fo5dh2n4k5j314k0nq0vu.jpg" alt="详情页 seo" title="详情页 seo" style="cursor: pointer;"></span></p>
<p>可见，详情页已经成功的设置了部分 seo 的标签。</p>
<p>以上是 Nuxt 的一些基础配置及应用。</p>
<p>我再去研究一下， fetch 和 store 的结合，将该 demo 继续完善。</p>
<p><a href="https://nuxt-demo-emowdvvyte.now.sh/" rel="nofollow noreferrer" target="_blank">Demo 线上地址</a><br><a href="https://github.com/JZLeung/nuxt-demo" rel="nofollow noreferrer" target="_blank">GitHub 地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Nuxt.js 基础入门教程

## 原文链接
[https://segmentfault.com/a/1190000013139139](https://segmentfault.com/a/1190000013139139)


---
title: '用 nuxt 开发部署一个 v2ex' 
date: 2019-01-12 2:30:24
hidden: true
slug: 2odrkfx4cx3
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009842523?w=1200&amp;h=639" src="https://static.alili.tech/img/remote/1460000009842523?w=1200&amp;h=639" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>先放出Github地址：<a href="https://github.com/OrangeXC/n2ex" rel="nofollow noreferrer" target="_blank">https://github.com/OrangeXC/n2ex</a></p>
<p>里面有线上网站的链接，因为链接随时可能变，在这里不直接给网站链接。</p>
<p>之前写过一篇 nuxt 入门级的文章 <a href="http://orangexc.xyz/2016/12/27/Vue-nuxt-based-ssr/" rel="nofollow noreferrer" target="_blank">Vue 基于 NUXT 的 SSR</a>，主要说一下 nuxt 是什么，以及为什么使用。</p>
<p>这里声明一下，不建议去阅读上一篇文章，因为当时写博文的时候是 0.8.0 版本，目前是 1.0.0alpha4，已经有一部分改动，建议去看最新的<a href="https://nuxtjs.org/" rel="nofollow noreferrer" target="_blank">nuxt文档</a></p>
<p>了解 nuxt 后，就可以轻松的看下文了，简单易懂，也没写什么复杂的项目。</p>
<p>本着自己学习的目的分享给大家，因为上篇文章之后有好多读者问 orange，怎么开发，怎么部署到服务器。</p>
<p>下面进入正题</p>
<h2 id="articleHeader0">环境搭建</h2>
<p>nuxt 相关的脚手架已经集成到了 vue-cli，同时提供 starter、express、koa、adonuxt</p>
<p>这里我们用的是 koa2（脚手架会询问使用 koa1 或 koa2）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init nuxt/koa <project-name>
cd <project-name> # move to your project
npm install # or yarn install*[see note below]
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">vue init nuxt/koa &lt;project-name&gt;
<span class="hljs-built_in">cd</span> &lt;project-name&gt; <span class="hljs-comment"># move to your project</span>
npm install <span class="hljs-comment"># or yarn install*[see note below]</span>
npm run dev</code></pre>
<blockquote><p>此时监听 3000 端口，如果有 bug，别犹豫，先升级 node 版本到最新。</p></blockquote>
<p>项目跑起来之后，有一个简单的轮廓，两个页面，index 和 about。</p>
<h2 id="articleHeader1">v2ex API</h2>
<p>写一个三方 API 项目时，首先要看看人家都支持什么 API，才能决定我们如何展示页面。</p>
<p>来看看<a href="https://www.v2ex.com/p/7v9TEc53" rel="nofollow noreferrer" target="_blank">官方 API 文档</a></p>
<p>这个文档说来仔细，但是仅仅提供了 4 个 API，对于我们来说远远不够，那本站的 API 从哪里来的呢</p>
<p>Github 的确是个好网站，我找到了这个项目下的一个文件：<a href="https://github.com/ochapman/v2ex/blob/master/v2ex.go" rel="nofollow noreferrer" target="_blank">https://github.com/ochapman/v...</a></p>
<p>不会 go 语言的没关系，我也不熟悉 go 语言，读一读会发现给出了比官方文档更多的 API，当然还有更详细的 API 暂且不谈。</p>
<p>本项目取的就是这个文件里（隐藏）的 API</p>
<ul>
<li><p>热门话题</p></li>
<li><p>最新话题</p></li>
<li><p>节点列表</p></li>
<li><p>节点信息</p></li>
<li><p>话题详情</p></li>
<li><p>话题评论</p></li>
<li><p>用户详情</p></li>
<li><p>用户话题</p></li>
</ul>
<p>我们也就实现了上面列表这么多接口的前端展示</p>
<h2 id="articleHeader2">路由结构</h2>
<p>nuxt 的特点之一就是以目录结构划分路由。</p>
<p>router 由 pages 目录决定，那么分析接口可以得到以下目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pages
  |
  |-- member
  |    |
  |    |-- _name.vue
  |
  |-- node
  |    |
  |    |-- _name.vue
  |
  |-- topic
  |   |
  |   |-- _id.vue
  |
  |-- index.vue
  |
  |-- new.vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>pages
  |<span class="hljs-string">
  </span>|<span class="hljs-string">-- member
  </span>|<span class="hljs-string">    </span>|
  |<span class="hljs-string">    </span>|<span class="hljs-string">-- _name.vue
  </span>|
  |<span class="hljs-string">-- node
  </span>|<span class="hljs-string">    </span>|
  |<span class="hljs-string">    </span>|<span class="hljs-string">-- _name.vue
  </span>|
  |<span class="hljs-string">-- topic
  </span>|<span class="hljs-string">   </span>|
  |<span class="hljs-string">   </span>|<span class="hljs-string">-- _id.vue
  </span>|
  |<span class="hljs-string">-- index.vue
  </span>|
  |<span class="hljs-string">-- new.vue</span></code></pre>
<p>很清晰的可以看出我们的路由结构，细心的会发现 params 有的是 name 有的是 id，为什么？</p>
<blockquote><p>这里详细解释下，v2ex 接口提供了 id 和 name 两种 url 传参形式，任何一种查询都可以匹配结果，唯独 topic 只能 id 查询，因为 name 不唯一，那用户和节点也提供了 id 查询啊，这里的坑就在评论的 <code>@</code> 部分，当 @ 一个人时，在评论可以直接链到个人详情页，v2ex 在评论里默认解析的就是 username 对应的链接，所以为了统一，其它地方也用的 name，另外无形当中提供了 search，在对应 url 后面替换成要查找的节点或用户名就可以直接跳转过去。</p></blockquote>
<h2 id="articleHeader3">组件</h2>
<p>这里只说两个最应该抽离的业务组件</p>
<ul>
<li><p>话题 list</p></li>
<li><p>评论 list</p></li>
</ul>
<p>话题 list 几乎每个列表页面里都有，而评论 list 在每个详情页里都有</p>
<p>基础组件用的是 <a href="https://github.com/museui/muse-ui" rel="nofollow noreferrer" target="_blank">muse-ui</a>，比较喜欢 Material 整体的设计风格，刚好在 muse-ui 的 2.0.3 版本支持了 SSR。</p>
<p>下面说下引入三方库相关的问题</p>
<h2 id="articleHeader4">引入三方库</h2>
<p>muse-ui 建议使用 plugins 的方式引入，因为涉及到 Vue.use 挂载方法</p>
<p>在 plugins 下新建 muse-ui.js 如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import MuseUI from 'muse-ui'

Vue.use(MuseUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> MuseUI <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui'</span>

Vue.use(MuseUI)</code></pre>
<p>然后在 nuxt.config.js 里面加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  { src: '~plugins/muse-ui.js', ssr: true }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">plugins: [
  { <span class="hljs-attr">src</span>: <span class="hljs-string">'~plugins/muse-ui.js'</span>, <span class="hljs-attr">ssr</span>: <span class="hljs-literal">true</span> }
]</code></pre>
<p>另外值得注意的是，需要全局引入 google 字体库，这里我直接插入到了 head 的 link 标签里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="link: [
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">link: [
  { <span class="hljs-attr">rel</span>: <span class="hljs-string">'stylesheet'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic'</span> },
  { <span class="hljs-attr">rel</span>: <span class="hljs-string">'stylesheet'</span>, <span class="hljs-attr">href</span>: <span class="hljs-string">'https://fonts.googleapis.com/icon?family=Material+Icons'</span> }
]</code></pre>
<p>http 请求用的是前后端同构的 axios 库</p>
<p>打包的时候注意要在配置文件加进去</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="build: {
  vendor: ['axios']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">build: {
  <span class="hljs-attr">vendor</span>: [<span class="hljs-string">'axios'</span>]
}</code></pre>
<h2 id="articleHeader5">异步请求</h2>
<p>nuxt 提供了 asyncData，可以在页面加载之前请求数据。</p>
<p>在这里使用 es7 的 async/await 来实现数据请求</p>
<p>例如：pages/index.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async asyncData () {
  try {
    const { data } = await axios.get(`https://proxy-uuptfgaypk.now.sh/topics/hot.json`)

    return {
      hotList: data
    }
  } catch (err) {
    console.error(err)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> asyncData () {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> { data } = <span class="hljs-keyword">await</span> axios.get(<span class="hljs-string">`https://proxy-uuptfgaypk.now.sh/topics/hot.json`</span>)

    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">hotList</span>: data
    }
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.error(err)
  }
}</code></pre>
<p>可读性还是挺高的，请求回来的 object，取到里面的 data 赋值给 hotList，省去了 <code>.then</code> 的操作</p>
<p>在详情页需要同时得到话题详细内容和评论，走的是两个接口</p>
<p>那么问题来了，怎么才能同时请求多个资源，当多个资源全部请求完成时才返回。</p>
<p>await 只能顺次请求，promis + await ？？？</p>
<p>不不不，只要 promis 的 all 方法就可以了，axios 有相应的封装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="asyncData ({ params, error }) {
  return axios.all([
    axios.get(`https://proxy-uuptfgaypk.now.sh/topics/show.json?id=${params.id}`),
    axios.get(`https://proxy-uuptfgaypk.now.sh/replies/show.json?topic_id=${params.id}`)
  ])
  .then(axios.spread(function (detail, comments) {
    return {
      detail: detail.data[0],
      comments: comments.data
    }
  }))
  .catch(error => console.log(error))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">asyncData ({ params, error }) {
  <span class="hljs-keyword">return</span> axios.all([
    axios.get(<span class="hljs-string">`https://proxy-uuptfgaypk.now.sh/topics/show.json?id=<span class="hljs-subst">${params.id}</span>`</span>),
    axios.get(<span class="hljs-string">`https://proxy-uuptfgaypk.now.sh/replies/show.json?topic_id=<span class="hljs-subst">${params.id}</span>`</span>)
  ])
  .then(axios.spread(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">detail, comments</span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">detail</span>: detail.data[<span class="hljs-number">0</span>],
      <span class="hljs-attr">comments</span>: comments.data
    }
  }))
  .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(error))
}</code></pre>
<p>这样一来解决了同时请求多个接口的问题。</p>
<h2 id="articleHeader6">CORS</h2>
<p>跨域 http 请求，在这里不详细解释，给大家 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow noreferrer" target="_blank">MDN 链接</a></p>
<p>细心的小伙伴发现上文代码的 url 是 <code>http://proxy...</code>，为什么不是官方给的 <code>https://www.v2ex.com/api</code></p>
<p>那是因为跨域请求时浏览器限制请求跨域资源，正常走官方的请求会报错，信息如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="XMLHttpRequest cannot load https://www.v2ex.com/api/topics/latest.json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'localhost:3000' is therefore not allowed access." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">XMLHttpRequest cannot <span class="hljs-keyword">load</span> https://www.v2ex.com/api/topics/latest.json. <span class="hljs-keyword">No</span> <span class="hljs-string">'Access-Control-Allow-Origin'</span> header <span class="hljs-keyword">is</span> <span class="hljs-keyword">present</span> <span class="hljs-keyword">on</span> the requested resource. Origin <span class="hljs-string">'localhost:3000'</span> <span class="hljs-keyword">is</span> therefore <span class="hljs-keyword">not</span> allowed access.</code></pre>
<p>报错很明显没有 <code>Access-Control-Allow-Origin</code> 返回头，打开控制台发现有数据返回，但是被浏览器拦截了，并没有加载到页面中去</p>
<p>初次玩服务端渲染的还会遇到的问题就是我什么首屏刷新不会报错，而路由跳转的请求会报错呢？</p>
<blockquote><p>这要从服务端渲染机制说起，首屏的请求是在服务端完成，服务端不存在跨域问题，而接下来的交互操作和页面跳转是在浏览器端进行，所以产生了类似的问题。够简单直接吧，不相信的可以自己打 console，看是在终端控制台输出还是浏览器控制台输出。</p></blockquote>
<p>找到了问题接下来就需要解决问题，上面有说在服务端不存在跨域请求的问题。</p>
<p>那么我们就自己写一层 proxy 就好啦，写一个 node 服务，转发请求，然后在返回头里加上，<code>Access-Control-Allow-Origin: *</code></p>
<p>这个服务实际上不到十行的代码，用到两个依赖，express 和 request</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const express = require('express')
const request = require('request')
const app = express()

app.use('/', function(req, res) {
  const url = 'https://www.v2ex.com/api' + req.url
  req.pipe(request(url)).pipe(res.set('Access-Control-Allow-Origin', '*'))
})

app.listen(process.env.PORT || 3001)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> request = <span class="hljs-built_in">require</span>(<span class="hljs-string">'request'</span>)
<span class="hljs-keyword">const</span> app = express()

app.use(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">const</span> url = <span class="hljs-string">'https://www.v2ex.com/api'</span> + req.url
  req.pipe(request(url)).pipe(res.set(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>))
})

app.listen(process.env.PORT || <span class="hljs-number">3001</span>)</code></pre>
<p>开发环境下先启动代理服务，然后将 url 指向本地服务就可以了</p>
<p>上面的方法呢，说实话有点蠢，实际项目当中呢可以直接让后端返回的接口支持跨域，当然了任何人都可以使用你们的 API，不是十分合理</p>
<p>再有就是 nuxt 官方有个 modules 组件库不知道大家有没有注意，地址：<a href="https://github.com/nuxt/modules" rel="nofollow noreferrer" target="_blank">https://github.com/nuxt/modules</a></p>
<p>里面其中有 axios 和 proxy 的封装，意在解决 axios 的 baseUrl 和 proxy 跨域限制，安装配置都十分方便，本次为什么没用？</p>
<p>好问题，因为存在未知的坑，代码没有丝毫报错，就是不生效，只能静等 nuxt 官方修复主库与插件之间的 bug。</p>
<h2 id="articleHeader7">部署</h2>
<p>怎么部署是大家最关心的问题，项目倒是好写，只要你会 vue 看看文档就可以写。</p>
<p>部署实际上官方提供了两个命令，打包和运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build
npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm run build
npm start</code></pre>
<p>这里需要一个安装了 node 的服务器，可以安装一个 <a href="https://github.com/Unitech/pm2" rel="nofollow noreferrer" target="_blank">pm2</a> 来跑 node 服务</p>
<p>当然喜欢 docker，也可以用 docker 去部署</p>
<p>之前又有人问了，看了这两个东西，依旧不会部署，那我也无能为力了，只能说，科学上网，教程一大堆。</p>
<p>如果就是想跑一个自己的 DEMO 玩玩，不想单独买服务器，也不涉及到企业项目部署和安全问题</p>
<p>那么好！给两个可以免费跑 node 服务的供应商 heroku 和 now.sh</p>
<p>nuxt 项目怎么如何跑在这两个服务上官网有写 <a href="https://zh.nuxtjs.org/faq/heroku-deployment" rel="nofollow noreferrer" target="_blank">https://zh.nuxtjs.org/faq/her...</a></p>
<p>本项目是跑在 now.sh 上的，这也就解释了为什么说这个在线链接打开速度超级慢，因为我们用的是三方的免费服务，为了提高服务器资源的利用率，减小服务器压力，当一段时间没人访问网站时，会自动把网站设置为 frozen</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="The deployment n2ex-yrgirchtae.now.sh was frozen
The deployment proxy-uuptfgaypk.now.sh was frozen
The deployment n2ex-nzkjwvytxe.now.sh was unfrozen" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>The deployment n2ex-yrgirchtae<span class="hljs-selector-class">.now</span><span class="hljs-selector-class">.sh</span> was frozen
The deployment proxy-uuptfgaypk<span class="hljs-selector-class">.now</span><span class="hljs-selector-class">.sh</span> was frozen
The deployment n2ex-nzkjwvytxe<span class="hljs-selector-class">.now</span><span class="hljs-selector-class">.sh</span> was unfrozen</code></pre>
<p>这是我控制台的最新报告，当有人访问时会切换到 unfrozen，算了下默认 frozen 时间是 15min 内无访问后。</p>
<p>不知道 heroku 是不是也有类似问题</p>
<h2 id="articleHeader8">未来</h2>
<p>这个项目会持续更新，逐步加新的功能，大家感兴趣的可以提 issue，或者直接提 pr 给我。</p>
<h2 id="articleHeader9">总结</h2>
<p>从项目分析到开发部署上线，一个 nuxt 项目就这样完成了，开发遇到的坑也随着项目递进渗透进去了，项目十分简单，没使用 vuex，写到这里，依旧不推荐大家深入使用，但是十分推荐玩一玩，抛开了 SSR 复杂的那一面，用着还是挺爽的。</p>
<blockquote><p>文章出自 orange 的 个人博客 <a href="http://orangexc.xyz/" rel="nofollow noreferrer" target="_blank">http://orangexc.xyz/</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 nuxt 开发部署一个 v2ex

## 原文链接
[https://segmentfault.com/a/1190000009842518](https://segmentfault.com/a/1190000009842518)


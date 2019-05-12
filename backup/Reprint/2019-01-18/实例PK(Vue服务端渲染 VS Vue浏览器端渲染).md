---
title: '实例PK(Vue服务端渲染 VS Vue浏览器端渲染)' 
date: 2019-01-18 2:30:34
hidden: true
slug: pxnyrmaug3t
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue 2.0 开始支持服务端渲染的功能，所以本文章也是基于vue 2.0以上版本。网上对于服务端渲染的资料还是比较少，最经典的莫过于Vue作者尤雨溪大神的 vue-hacker-news。本人在公司做Vue项目的时候，一直苦于产品、客户对首屏加载要求，SEO的诉求，也想过很多解决方案，本次也是针对浏览器渲染不足之处，采用了服务端渲染，并且做了两个一样的Demo作为比较，更能直观的对比Vue前后端的渲染。<br>话不多说，我们分别来看两个Demo:（欢迎star 欢迎pull request）</p>
<p>1.浏览器端渲染Demo: <a href="https://github.com/monkeyWangs/doubanMovie" rel="nofollow noreferrer" target="_blank">https://github.com/monkeyWang...</a></p>
<p>2.服务端渲染Demo:<a href="https://github.com/monkeyWangs/doubanMovie-SSR" rel="nofollow noreferrer" target="_blank">https://github.com/monkeyWang...</a></p>
<p>两套代码运行结果都是为了展示豆瓣电影的，运行效果也都是差不多，下面我们来分别简单的阐述一下项目的机理：</p>
<h2 id="articleHeader0">一、浏览器端渲染豆瓣电影</h2>
<p>首先我们用官网的脚手架搭建起来一个vue项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli
vue init webpack doubanMovie
cd doubanMovie
npm install
npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> install -g vue-cli
vue init webpack doubanMovie
cd doubanMovie
<span class="hljs-built_in">npm</span> install
<span class="hljs-built_in">npm</span> run dev
</code></pre>
<p>这样便可以简单地打起来一个cli框架，下面我们要做的事情就是分别配置 vue-router, vuex,然后配置我们的webpack proxyTable 让他支持代理访问豆瓣API。</p>
<p><strong>1.配置Vue-router</strong></p>
<p>我们需要三个导航页：正在上映、即将上映、Top250；一个详情页，一个搜索页。这里我给他们分别配置了各自的路由。在 router/index.js 下配置以下信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Moving from '@/components/moving'
import Upcoming from '@/components/upcoming'
import Top250 from '@/components/top250'
import MoviesDetail from '@/components/common/moviesDetail'

import Search from '@/components/searchList'

Vue.use(Router)
/**
 * 路由信息配置
 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Moving',
      component: Moving
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: Upcoming
    },
    {
      path: '/top250',
      name: 'Top250',
      component: Top250
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/moviesDetail',
      name: 'moviesDetail',
      component: MoviesDetail
    }

  ]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Moving <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/moving'</span>
<span class="hljs-keyword">import</span> Upcoming <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/upcoming'</span>
<span class="hljs-keyword">import</span> Top250 <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/top250'</span>
<span class="hljs-keyword">import</span> MoviesDetail <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/common/moviesDetail'</span>

<span class="hljs-keyword">import</span> Search <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/searchList'</span>

Vue.use(Router)
<span class="hljs-comment">/**
 * 路由信息配置
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Moving'</span>,
      <span class="hljs-attr">component</span>: Moving
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/upcoming'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'upcoming'</span>,
      <span class="hljs-attr">component</span>: Upcoming
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/top250'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Top250'</span>,
      <span class="hljs-attr">component</span>: Top250
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/search'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Search'</span>,
      <span class="hljs-attr">component</span>: Search
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/moviesDetail'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'moviesDetail'</span>,
      <span class="hljs-attr">component</span>: MoviesDetail
    }

  ]
})
</code></pre>
<p>这样我们的路由信息配置好了，然后每次切换路由的时候，尽量避免不要重复请求数据，所以我们还需要配置一下组件的keep-alive：在app.vue组件里面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<keep-alive exclude=&quot;moviesDetail&quot;>
   <router-view></router-view>
</keep-alive>
这样一个基本的vue-router就配置好了。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span> <span class="hljs-attr">exclude</span>=<span class="hljs-string">"moviesDetail"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span>
这样一个基本的vue-router就配置好了。
</code></pre>
<p><strong>2.引入vuex</strong></p>
<p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 devtools extension，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。</p>
<p>简而言之：Vuex 相当于某种意义上设置了读写权限的全局变量，将数据保存保存到该“全局变量”下，并通过一定的方法去读写数据。</p>
<p>Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：</p>
<p>应用层级的状态应该集中到单个 store 对象中。</p>
<p>提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。</p>
<p>异步逻辑都应该封装到 action 里面。</p>
<p>对于大型应用我们会希望把 Vuex 相关代码分割到模块中。下面是项目结构示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    └── moving            # 电影模块
        ├── index.js      # 模块内组装，并导出模块的地方
        ├── actions.js    # 模块基本 action
        ├── getters.js    # 模块级别 getters
        ├── mutations.js  # 模块级别 mutations
        └── types.js      # 模块级别 types
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>├── index.html
├── main.<span class="hljs-keyword">js
</span>├── api
│   └── ... <span class="hljs-comment"># 抽取出API请求</span>
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.<span class="hljs-keyword">js </span>         <span class="hljs-comment"># 我们组装模块并导出 store 的地方</span>
    └── moving            <span class="hljs-comment"># 电影模块</span>
        ├── index.<span class="hljs-keyword">js </span>     <span class="hljs-comment"># 模块内组装，并导出模块的地方</span>
        ├── actions.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># 模块基本 action</span>
        ├── getters.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># 模块级别 getters</span>
        ├── mutations.<span class="hljs-keyword">js </span> <span class="hljs-comment"># 模块级别 mutations</span>
        └── types.<span class="hljs-keyword">js </span>     <span class="hljs-comment"># 模块级别 types</span>
</code></pre>
<p>所以我们开始在我们的src目录下新建一个名为store 的文件夹 为了后期考虑 我们新建了moving 文件夹，用来组织电影，考虑到所有的action,getters,mutations,都写在一起，文件太混乱，所以我又给他们分别提取出来。</p>
<p>stroe文件夹建好，我们要开始在main.js里面引用vuex实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> store from <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  store,
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})
</code></pre>
<p>这样，我们便可以在所有的子组件里通过 this.$store 来使用vuex了。</p>
<p><strong>3.webpack proxyTable 代理跨域</strong></p>
<p>webpack 开发环境可以使用proxyTable 来代理跨域，生产环境的话可以根据各自的服务器进行配置代理跨域就行了。在我们的项目config/index.js 文件下可以看到有一个proxyTable的属性，我们对其简单的改写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
      '/api': {
        target: 'http://api.douban.com/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
      <span class="hljs-string">'/api'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://api.douban.com/v2'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true,
        <span class="hljs-attribute">pathRewrite</span>: {
          <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
        }
      }
    }
</code></pre>
<p>这样当我们访问</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost:8080/api/movie
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">localhost:</span><span class="hljs-number">8080</span><span class="hljs-meta-keyword">/api/</span>movie
</code></pre>
<p>的时候 其实我们访问的是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://api.douban.com/v2/movie
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">http</span>://api.douban.com/<span class="hljs-built_in">v2</span>/<span class="hljs-keyword">movie
</span></code></pre>
<p>这样便达到了一种跨域请求的方案。</p>
<p>至此，浏览器端的主要配置已经介绍完了，下面我们来看看运行的结果：<br><span class="img-wrap"><img data-src="/img/bVK4ad?w=4544&amp;h=3028" src="https://static.alili.tech/img/bVK4ad?w=4544&amp;h=3028" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>为了介绍浏览器渲染是怎么回事，我们运行一下<code>npm run build</code> 看看我们的发布版本的文件，到底是什么鬼东西....</p>
<p><code>run build</code> 后会都出一个dist目录 ，我们可以看到里面有个index.html，这个便是我们最终页面将要展示的html，我们打开，可以看到下面：<br><span class="img-wrap"><img data-src="/img/bVK4bs?w=600&amp;h=286" src="https://static.alili.tech/img/bVK4bs?w=600&amp;h=286" alt="v2-e62449d29c714b7161301469cc2a68cc_b.png" title="v2-e62449d29c714b7161301469cc2a68cc_b.png" style="cursor: pointer;"></span></p>
<p>观察好的小伙伴可以发现，我们并没有多余的dom元素，就只有一个div，那么页面要怎么呈现呢？答案是js append，对，下面的那些js会负责innerHTML。而js是由浏览器解释执行的，所以呢，我们称之为浏览器渲染，这有几个致命的缺点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**1.js放在dom结尾，如果js文件过大，那么必然造成页面阻塞。用户体验明显不好（这也是我我在公司反复被产品逼问的事情）**

**2.不利于SEO**

**3.客户端运行在老的JavaScript引擎上**
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>*<span class="hljs-strong">*1.js放在dom结尾，如果js文件过大，那么必然造成页面阻塞。用户体验明显不好（这也是我我在公司反复被产品逼问的事情）*</span>*

*<span class="hljs-strong">*2.不利于SEO*</span>*

*<span class="hljs-strong">*3.客户端运行在老的JavaScript引擎上*</span>*
</code></pre>
<p>对于世界上的一些地区人，可能只能用1998年产的电脑访问互联网的方式使用计算机。而Vue只能运行在IE9以上的浏览器，你可能也想为那些老式浏览器提供基础内容 - 或者是在命令行中使用 Lynx的时髦的黑客</p>
<p>基于以上的一些问题，服务端渲染呼之欲出....</p>
<h2 id="articleHeader1">二、服务器端渲染豆瓣电影</h2>
<p>先看一张Vue官网的服务端渲染示意图<br><span class="img-wrap"><img data-src="/img/bVK4bE?w=600&amp;h=275" src="https://static.alili.tech/img/bVK4bE?w=600&amp;h=275" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从图上可以看出，ssr 有两个入口文件，client.js 和 server.js， 都包含了应用代码，webpack 通过两个入口文件分别打包成给服务端用的 server bundle 和给客户端用的 client bundle. 当服务器接收到了来自客户端的请求之后，会创建一个渲染器 bundleRenderer，这个 bundleRenderer 会读取上面生成的 server bundle 文件，并且执行它的代码， 然后发送一个生成好的 html 到浏览器，等到客户端加载了 client bundle 之后，会和服务端生成的DOM 进行 Hydration(判断这个DOM 和自己即将生成的DOM 是否相同，如果相同就将客户端的vue实例挂载到这个DOM上， 否则会提示警告)。</p>
<p>具体实现：</p>
<p>我们需要vuex，需要router，需要服务器，需要服务缓存，需要代理跨域....不急我们慢慢来。</p>
<p><strong>1.建立nodejs服务</strong></p>
<p>首先我们需要一个服务器，那么对于nodejs，express是很好地选择。我们来建立一个server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> port = process.env.PORT || <span class="hljs-number">8080</span>
app.listen(port, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`server started at localhost:<span class="hljs-subst">${port}</span>`</span>)
})
</code></pre>
<p>这里用来启动服务监听 8080 端口。</p>
<p>然后我们开始处理所有的get请求，当请求页面的时候，我们需要渲染页面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('*', (req, res) => {
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }

  const s = Date.now()

  res.setHeader(&quot;Content-Type&quot;, &quot;text/html&quot;)
  res.setHeader(&quot;Server&quot;, serverInfo)

  const errorHandler = err => {
    if (err &amp;&amp; err.code === 404) {
      res.status(404).end('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).end('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err)
    }
  }

  renderer.renderToStream({ url: req.url })
    .on('error', errorHandler)
    .on('end', () => console.log(`whole request: ${Date.now() - s}ms`))
    .pipe(res)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>app.get(<span class="hljs-string">'*'</span>, <span class="hljs-function">(<span class="hljs-params">req, res</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!renderer) {
    <span class="hljs-keyword">return</span> res.end(<span class="hljs-string">'waiting for compilation... refresh in a moment.'</span>)
  }

  <span class="hljs-keyword">const</span> s = <span class="hljs-built_in">Date</span>.now()

  res.setHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"text/html"</span>)
  res.setHeader(<span class="hljs-string">"Server"</span>, serverInfo)

  <span class="hljs-keyword">const</span> errorHandler = <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (err &amp;&amp; err.code === <span class="hljs-number">404</span>) {
      res.status(<span class="hljs-number">404</span>).end(<span class="hljs-string">'404 | Page Not Found'</span>)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// Render Error Page or Redirect</span>
      res.status(<span class="hljs-number">500</span>).end(<span class="hljs-string">'500 | Internal Server Error'</span>)
      <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`error during render : <span class="hljs-subst">${req.url}</span>`</span>)
      <span class="hljs-built_in">console</span>.error(err)
    }
  }

  renderer.renderToStream({ url: req.url })
    .on(<span class="hljs-string">'error'</span>, errorHandler)
    .on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`whole request: <span class="hljs-subst">${Date.now() - s}</span>ms`</span>))
    .pipe(res)
})
</code></pre>
<p>然后我们需要代理请求，这样才能进行跨域，我们引入<code>http-proxy-middleware</code>模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const proxy = require('http-proxy-middleware');//引入代理中间件
/**
 * proxy middleware options
 * 代理跨域配置
 * @type "{{"target: string, changeOrigin: boolean, pathRewrite: {^/api: string"}}"}
 */
var options = {
  target: 'http://api.douban.com/v2', // target host
  changeOrigin: true,               // needed for virtual hosted sites
  pathRewrite: {
    '^/api': ''
  }
};

var exampleProxy = proxy(options);
app.use('/api', exampleProxy);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> proxy = <span class="hljs-keyword">require</span>(<span class="hljs-string">'http-proxy-middleware'</span>);<span class="hljs-comment">//引入代理中间件</span>
<span class="hljs-comment">/**
 * proxy middleware options
 * 代理跨域配置
 * <span class="hljs-doctag">@type</span> "{{"target: string, changeOrigin: boolean, pathRewrite: {^/api: string"}}"}
 */</span>
<span class="hljs-keyword">var</span> options = {
  target: <span class="hljs-string">'http://api.douban.com/v2'</span>, <span class="hljs-comment">// target host</span>
  changeOrigin: <span class="hljs-keyword">true</span>,               <span class="hljs-comment">// needed for virtual hosted sites</span>
  pathRewrite: {
    <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
  }
};

<span class="hljs-keyword">var</span> exampleProxy = proxy(options);
app.<span class="hljs-keyword">use</span>(<span class="hljs-string">'/api'</span>, exampleProxy);
</code></pre>
<p>这样我们的服务端server.js便配置完成。接下来 我们需要配置服务端入口文件，还有客户端入口文件，首先来配置一下客户端文件，新建src/entry-client.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'es6-promise/auto'
import { app, store, router } from './app'

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

/**
 * 异步组件
 */
router.onReady(() => {
  // 开始挂载到dom上
  app.$mount('#app')
})

// service worker
if (process.env.NODE_ENV === 'production' &amp;&amp; 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'es6-promise/auto'</span>
<span class="hljs-keyword">import</span> { app, store, router } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-comment">// prime the store with server-initialized state.</span>
<span class="hljs-comment">// the state is determined during SSR and inlined in the page markup.</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.__INITIAL_STATE__) {
  store.replaceState(<span class="hljs-built_in">window</span>.__INITIAL_STATE__)
}

<span class="hljs-comment">/**
 * 异步组件
 */</span>
router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// 开始挂载到dom上</span>
  app.$mount(<span class="hljs-string">'#app'</span>)
})

<span class="hljs-comment">// service worker</span>
<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span> &amp;&amp; <span class="hljs-string">'serviceWorker'</span> <span class="hljs-keyword">in</span> navigator) {
  navigator.serviceWorker.register(<span class="hljs-string">'/service-worker.js'</span>)
}
</code></pre>
<p>客户端入口文件很简单，同步服务端发送过来的数据，然后把 vue 实例挂载到服务端渲染的 DOM 上。</p>
<p>再配置一下服务端入口文件：src/entry-server.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { app, router, store } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// This exported function will be called by `bundleRenderer`.
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
export default context => {
  const s = isDev &amp;&amp; Date.now()

  return new Promise((resolve, reject) => {
    // set router's location
    router.push(context.url)

    // wait until router has resolved possible async hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // no matched routes
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      // Call preFetch hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      Promise.all(matchedComponents.map(component => {
        return component.preFetch &amp;&amp; component.preFetch(store)
      })).then(() => {
        isDev &amp;&amp; console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        context.state = store.state
        resolve(app)
      }).catch(reject)
    })
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { app, router, store } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-keyword">const</span> isDev = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>

<span class="hljs-comment">// This exported function will be called by `bundleRenderer`.</span>
<span class="hljs-comment">// This is where we perform data-prefetching to determine the</span>
<span class="hljs-comment">// state of our application before actually rendering it.</span>
<span class="hljs-comment">// Since data fetching is async, this function is expected to</span>
<span class="hljs-comment">// return a Promise that resolves to the app instance.</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> context =&gt; {
  <span class="hljs-keyword">const</span> s = isDev &amp;&amp; <span class="hljs-built_in">Date</span>.now()

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-comment">// set router's location</span>
    router.push(context.url)

    <span class="hljs-comment">// wait until router has resolved possible async hooks</span>
    router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> matchedComponents = router.getMatchedComponents()
      <span class="hljs-comment">// no matched routes</span>
      <span class="hljs-keyword">if</span> (!matchedComponents.length) {
        reject({ <span class="hljs-attr">code</span>: <span class="hljs-number">404</span> })
      }
      <span class="hljs-comment">// Call preFetch hooks on components matched by the route.</span>
      <span class="hljs-comment">// A preFetch hook dispatches a store action and returns a Promise,</span>
      <span class="hljs-comment">// which is resolved when the action is complete and store state has been</span>
      <span class="hljs-comment">// updated.</span>
      <span class="hljs-built_in">Promise</span>.all(matchedComponents.map(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> component.preFetch &amp;&amp; component.preFetch(store)
      })).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        isDev &amp;&amp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`data pre-fetch: <span class="hljs-subst">${<span class="hljs-built_in">Date</span>.now() - s}</span>ms`</span>)
        <span class="hljs-comment">// After all preFetch hooks are resolved, our store is now</span>
        <span class="hljs-comment">// filled with the state needed to render the app.</span>
        <span class="hljs-comment">// Expose the state on the render context, and let the request handler</span>
        <span class="hljs-comment">// inline the state in the HTML response. This allows the client-side</span>
        <span class="hljs-comment">// store to pick-up the server-side state without having to duplicate</span>
        <span class="hljs-comment">// the initial data fetching on the client.</span>
        context.state = store.state
        resolve(app)
      }).catch(reject)
    })
  })
}
</code></pre>
<p>server.js 返回一个函数，该函数接受一个从服务端传递过来的 context 的参数，将 vue 实例通过 promise 返回。context 一般包含 当前页面的url，首先我们调用 vue-router 的 router.push(url) 切换到到对应的路由， 然后调用 getMatchedComponents 方法返回对应要渲染的组件， 这里会检查组件是否有 fetchServerData 方法，如果有就会执行它。</p>
<p>下面这行代码将服务端获取到的数据挂载到 context 对象上，后面会把这些数据直接发送到浏览器端与客户端的vue 实例进行数据(状态)同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.state = store.state
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>context.<span class="hljs-keyword">state</span> = store.<span class="hljs-keyword">state</span>
</code></pre>
<p>然后我们分别配置客户端和服务端webpack，这里可以在我的github上fork下来参考配置，里面每一步都有注释，这里不再赘述。</p>
<p>接着我们需要创建app.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import Element from 'element-ui'
Vue.use(Element)

// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

/**
 * 创建vue实例
 * 在这里注入 router  store 到所有的子组件
 * 这样就可以在任何地方使用 `this.$router` and `this.$store`
 * @type {Vue$2}
 */
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

/**
 * 导出 router and store.
 * 在这里不需要挂载到app上。这里和浏览器渲染不一样
 */
export { app, router, store }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> { sync } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex-router-sync'</span>
<span class="hljs-keyword">import</span> Element <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
Vue.use(Element)

<span class="hljs-comment">// sync the router with the vuex store.</span>
<span class="hljs-comment">// this registers `store.state.route`</span>
sync(store, router)

<span class="hljs-comment">/**
 * 创建vue实例
 * 在这里注入 router  store 到所有的子组件
 * 这样就可以在任何地方使用 `this.$router` and `this.$store`
 * @type {Vue$2}
 */</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  router,
  store,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})

<span class="hljs-comment">/**
 * 导出 router and store.
 * 在这里不需要挂载到app上。这里和浏览器渲染不一样
 */</span>
<span class="hljs-keyword">export</span> { app, router, store }
</code></pre>
<p>这样 服务端入口文件和客户端入口文件便有了一个公共实例Vue, 和我们以前写的vue实例差别不大，但是我们不会在这里将app mount到DOM上，因为这个实例也会在服务端去运行，这里直接将 app 暴露出去。</p>
<p>接下来创建路由router，创建vuex跟客户端都差不多。详细的可以参考我的项目...</p>
<p>到此，服务端渲染配置 就简单介绍完了，下面我们启动项目简单的看下：</p>
<p><span class="img-wrap"><img data-src="/img/bVK39C?w=1200&amp;h=872" src="https://static.alili.tech/img/bVK39C?w=1200&amp;h=872" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>这里跟服务端界面一样，不一样的是url已经不是之前的 #/而变成了请求形式 /</p>
<p>这样每当浏览器发送一个页面的请求，会有服务器渲染出一个dom字符串返回，直接在浏览器段显示，这样就避免了浏览器端渲染的很多问题。</p>
<p>说起SSR，其实早在SPA (Single Page Application) 出现之前，网页就是在服务端渲染的。服务器接收到客户端请求后，将数据和模板拼接成完整的页面响应到客户端。 客户端直接渲染， 此时用户希望浏览新的页面，就必须重复这个过程， 刷新页面. 这种体验在Web技术发展的当下是几乎不能被接受的，于是越来越多的技术方案涌现，力求 实现无页面刷新或者局部刷新来达到优秀的交互体验。但是SEO却是致命的，所以一切看应用场景，这里只为大家提供技术思路，为vue开发提供多一种可能的方案。<br>最后再加一下前后端渲染build后 把netWork切到3G网络下进行响应对比：<br>先看看浏览器端：加载dom页面花了大约800s<br><span class="img-wrap"><img data-src="/img/bVK71o?w=1948&amp;h=1148" src="https://static.alili.tech/img/bVK71o?w=1948&amp;h=1148" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在对比一下服务端渲染：加载dom页面只花了8ms 整整快了10倍，用户可能在网络比较慢的情况下从远处访问网站 - 或者通过比较差的带宽。 这些情况下，尽量减少页面请求数量，来保证用户尽快看到基本的内容。<br><span class="img-wrap"><img data-src="/img/bVK71M?w=1946&amp;h=1140" src="https://static.alili.tech/img/bVK71M?w=1946&amp;h=1140" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>补充一下一：一般高复杂度项目都会使用webpack的拆分，实现异步组件，按需加载，这样可以有效提高时间。二：服务器渲染如此快有部分原因来自serviceworker，但是排除这部分，还是比浏览器端要快至少几倍。 当然，我们可以考虑首屏采用服务端渲染的方式，因为完全服务端渲染会考虑到很多问题，比如复杂均衡等等等</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实例PK(Vue服务端渲染 VS Vue浏览器端渲染)

## 原文链接
[https://segmentfault.com/a/1190000008795113](https://segmentfault.com/a/1190000008795113)


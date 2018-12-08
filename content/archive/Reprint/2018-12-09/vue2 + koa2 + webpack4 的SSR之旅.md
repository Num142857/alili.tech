---
title: 'vue2 + koa2 + webpack4 的SSR之旅' 
date: 2018-12-09 2:30:08
hidden: true
slug: i29w2gqb0ib
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>因为自己的博客完全的前后端分离写的，在 <code>seo</code> 这一块也没考虑过，于是乎，便开始了本次的<code>SSR</code>之旅</p>
<h2 id="articleHeader1">技术栈</h2>
<p>vue2 + koa2 + webpack4 + mongodb</p>
<p>因为webpack也已经到了 <code>4.1</code> 的版本了，所以顺带把<code>webpack3</code>迁移到了<code>webpack4</code>。</p>
<h2 id="articleHeader2">服务端渲染（SSR）</h2>
<p>大概意思就是在服务端生成<code>html</code>片段，然后返回给客户端</p>
<p>所以<code>vue-ssr</code>也可以理解为就是把我们以前在客户端写的 <code>.vue</code>文件 转换成 <code>html</code>片段，返回给客户端。</p>
<p>实际上当然是会复杂点，比如服务端 返回 <code>html</code> 片段，客户端直接接受显示，不做任何操作的话，我们是无法触发事件（点击事件等等）的。<br>为了解决上述问题。<br>所以 你通过 <a href="https://ssr.vuejs.org/zh/api.html#webpack-plugins" rel="nofollow noreferrer" target="_blank">vue-server-renderer</a> 进行渲染的话， 会在根节点上附带一个 <code>data-server-rendered="true"</code> 的特殊属性。<br>让客户端 <code>Vue</code> 知道这部分 <code>HTML</code> 是由 <code>Vue</code> 在服务端渲染的，并且应该以激活模式进行挂载</p>
<p><strong>激活模式:</strong>指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。<br>大概意思就是 服务端 已经渲染好了 <code>html</code>， 只不过服务端渲染过来的是静态页面，无法操作<code>DOM</code> 。<br>但是因为<code>dom</code>元素已经生成好了， 没有必要丢弃重新创建。<br>所以客户端便只需要激活这些静态页面，让他们变成动态的（能够响应后续的数据变化）就行。</p>
<h3 id="articleHeader3">
<code>SSR</code>优势</h3>
<ul>
<li>更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。</li>
<li>更快的内容到达时间(time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。通常可以产生更好的用户体验，并且对于那些「内容到达时间(time-to-content)与转化率直接相关」的应用程序而言，服务器端渲染(SSR)至关重要。</li>
</ul>
<h3 id="articleHeader4">
<code>SSR</code>开发需要注意的问题</h3>
<ul>
<li>服务端渲染只会执行 <code>vue</code> 的两个钩子函数 <code>beforeCreate </code> 和 <code>created</code>
</li>
<li>服务端渲染无法访问 <code>window </code> 和 <code>document</code>等只有浏览器才有的全局对象。（假如你项目里面有全局引入的插件和JS文件或着在<code>beforeCreate</code>和<code>created</code> 用到了的这些对象的话，是会报错的，因为服务端不存在这些对象。实在要用的话，可以试下这个插件<a href="https://www.npmjs.com/package/jsdom" rel="nofollow noreferrer" target="_blank">jsdom</a>
</li>
</ul>
<p>基本上只要你对<code>node</code>有了解，会配置<code>webpack</code>，<code>vue</code>能正常使用，基本上这东西实现起来还是比较轻松的，尤其官网给出了完整的例子<a href="https://github.com/vuejs/vue-hackernews-2.0/" rel="nofollow noreferrer" target="_blank">HackerNews Demo</a>,当然这个是基于<code>express</code>框架的，使用<code>koa</code>的话里面中间件的使用需要做点修改。其余的基本只需要跟着官网的例子来一遍就基本OK了<br>上面官网的例子需要终端翻墙才能访问数据，如果不想的话可以看下这个例子，跟官网例子基本一样<a href="https://github.com/tiodot/vnews" rel="nofollow noreferrer" target="_blank">掘金网站</a></p>
<h3 id="articleHeader5">这里也大概说下官网的实现</h3>
<h4>项目目录</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="src
├── components
│   ├── Foo.vue
│   ├── Bar.vue
│   └── Baz.vue
├── router
│   └── index.js
├── store
│   └── index.js
├── App.vue
├── app.js # universal entry
├── entry-client.js # 运行于客户端的项目入口
└── entry-server.js # 运行于服务端的项目入口" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>src
├── components
│   ├── Foo.vue
│   ├── <span class="hljs-keyword">Bar.vue
</span>│   └── <span class="hljs-keyword">Baz.vue
</span>├── router
│   └── index.<span class="hljs-keyword">js
</span>├── store
│   └── index.<span class="hljs-keyword">js
</span>├── App.vue
├── app.<span class="hljs-keyword">js </span><span class="hljs-comment"># universal entry</span>
├── entry-client.<span class="hljs-keyword">js </span><span class="hljs-comment"># 运行于客户端的项目入口</span>
└── entry-server.<span class="hljs-keyword">js </span><span class="hljs-comment"># 运行于服务端的项目入口</span></code></pre>
<h4>需要用到几个知识点</h4>
<ul>
<li>
<code>vuex</code>的使用，因为应用程序依赖于一些异步数据，那么在开始渲染过程之前，需要先预取和解析好这些数据。所以会使用的<code>vuex</code>来作为 数据预取存储容器</li>
<li>
<p><code>asyncData</code>自定义函数（获取接口数据）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>"{{" item.title "}}"</div>
</template>
<script>
export default {
  // 自定义获取数据的函数。
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('fetchItem', route.params.id)
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.$store.state.items[this.$route.params.id]
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-template-variable">"{{" item.title "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 自定义获取数据的函数。</span>
  asyncData ({ store, route }) {
    <span class="hljs-comment">// 触发 action 后，会返回 Promise</span>
    <span class="hljs-keyword">return</span> store.dispatch(<span class="hljs-string">'fetchItem'</span>, route.params.id)
  },
  <span class="hljs-attr">computed</span>: {
    <span class="hljs-comment">// 从 store 的 state 对象中的获取 item。</span>
    item () {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.items[<span class="hljs-keyword">this</span>.$route.params.id]
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
</li>
<li>
<p>避免状态单例：<br>  当编写纯客户端(client-only)代码时，我们习惯于每次在新的上下文中对代码进行取值。但是，Node.js 服务器是一个长期运行的进程。当我们的代码进入该进程时，它将进行一次取值并留存在内存中。这意味着如果创建一个单例对象，它将在每个传入的请求之间共享。<br>  所以我们为每个请求创建一个新的根 Vue 实例<br>  因此，我们不应该直接创建一个应用程序实例，而是应该暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router.js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      // ...
    ]
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// router.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
Vue.use(Router)
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRouter</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
    <span class="hljs-attr">routes</span>: [
      <span class="hljs-comment">// ...</span>
    ]
  })
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 假定我们有一个可以返回 Promise 的
// 通用 API（请忽略此 API 具体实现细节）
import { fetchItem } from './api'
export function createStore () {
  return new Vuex.Store({
    state: {
      items: {}
    },
    actions: {
      fetchItem ({ commit }, id) {
        // `store.dispatch()` 会返回 Promise，
        // 以便我们能够知道数据在何时更新
        return fetchItem(id).then(item => {
          commit('setItem', { id, item })
        })
      }
    },
    mutations: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// store.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
Vue.use(Vuex)
<span class="hljs-comment">// 假定我们有一个可以返回 Promise 的</span>
<span class="hljs-comment">// 通用 API（请忽略此 API 具体实现细节）</span>
<span class="hljs-keyword">import</span> { fetchItem } <span class="hljs-keyword">from</span> <span class="hljs-string">'./api'</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">state</span>: {
      <span class="hljs-attr">items</span>: {}
    },
    <span class="hljs-attr">actions</span>: {
      fetchItem ({ commit }, id) {
        <span class="hljs-comment">// `store.dispatch()` 会返回 Promise，</span>
        <span class="hljs-comment">// 以便我们能够知道数据在何时更新</span>
        <span class="hljs-keyword">return</span> fetchItem(id).then(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> {
          commit(<span class="hljs-string">'setItem'</span>, { id, item })
        })
      }
    },
    <span class="hljs-attr">mutations</span>: {
      setItem (state, { id, item }) {
        Vue.set(state.items, id, item)
      }
    }
  })
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return { app, router, store }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// app.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> { createRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApp</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 创建 router 和 store 实例</span>
  <span class="hljs-keyword">const</span> router = createRouter()
  <span class="hljs-keyword">const</span> store = createStore()
  <span class="hljs-comment">// 创建应用程序实例，将 router 和 store 注入</span>
  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
    router,
    store,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
  })
  <span class="hljs-comment">// 暴露 app, router 和 store。</span>
  <span class="hljs-keyword">return</span> { app, router, store }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createApp} from './app'
const {app, router, store} = createApp()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {createApp} <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>
<span class="hljs-keyword">const</span> {app, router, store} = createApp()</code></pre>
<p>按照上面的步骤方法，为每个请求创建新的应用实例，就不会因为多个请求造成 交叉请求状态污染(cross-request state pollution) 了</p>
</li>
</ul>
<h4>实现步骤</h4>
<ol>
<li>
<p>首先,获取当前访问的路径,因为<code>renderToString</code>支持传入一个上下文的渲染对象，所以我们传入一个context对象，包含当前的<code>url</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server.js 
const context = {
    url: ctx.url
}
renderer.renderToString(context, (err, html) => {
    if (err) {
        return reject(err)
    }
    console.log(html)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// server.js </span>
<span class="hljs-keyword">const</span> context = {
    url: ctx.url
}
renderer.renderToString(context, (<span class="hljs-keyword">err</span>, html) =&gt; {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
        <span class="hljs-keyword">return</span> reject(<span class="hljs-keyword">err</span>)
    }
    console.<span class="hljs-built_in">log</span>(html)
})</code></pre>
</li>
<li>
<p>然后中间经过webpack等配置，能让服务端的项目入口<code>entry-server.js</code>接收到context</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry-server.js
import {createApp} from './app'
export default context => {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise.
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        const { url } = context

        // 设置服务器端 router 的位置
        router.push(url)

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {

            // 获取当前路径的组件
            const matchedComponents = router.getMatchedComponents()

            // 没有返回404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            // 如果该路径存在，而且该路径存在需要调用接口来预取数据的情况，便等所有`asyncData`函数执行完毕.
            // `asyncData`函数是组件自定义静态函数, 用来提前获取数据。
            Promise.all(matchedComponents.map( ({asyncData}) => asyncData &amp;&amp; asyncData({
                store,
                route: router.currentRoute
            }))).then( () => {
                // 执行完毕后，因为获取到的数据都统一存入 vuex 中， 上方 `asyncData` 里面执行的方法就是调用 vuex 的 action, 然后把数据存入的 vuex 的 state 中
                // 所以我们便 store 里面的 state 赋值给 `context.state`
                // 然后 `renderToString` 解析 html 的时候会把 `context.state` 里面的数据 嵌入到 html 的 `window.__INITIAL_STATE__` 变量中 
                // 这样我们到时候处理 客户端 的时候，便可以把客户端中 vuex 中的state 替换成 `window.__INITIAL_STATE__` 中的数据,来完成客户端与服务端的数据统一
                context.state = store.state
                resolve(app)
            }).catch(reject)
        })
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// entry-server.js
import {createApp} <span class="hljs-keyword">from</span> './app'
export <span class="hljs-keyword">default</span> context =&gt; {
    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise.
    return new Promise((resolve, reject) =&gt; {
        const { app, router, store } = createApp()

        const { url } = context

        // 设置服务器端 router 的位置
        router.push(url)

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.<span class="hljs-keyword">on</span>Ready(() =&gt; {

            // 获取当前路径的组件
            const matchedComponents = router.getMatchedComponents()

            // 没有返回<span class="hljs-number">404</span>
            if (!matchedComponents.length) {
                return reject({ code: <span class="hljs-number">404</span> })
            }

            // 如果该路径存在，而且该路径存在需要调用接口来预取数据的情况，便等所有`asyncData`函数执行完毕.
            // `asyncData`函数是组件自定义静态函数, 用来提前获取数据。
            Promise.<span class="hljs-literal">all</span>(matchedComponents.map( ({asyncData}) =&gt; asyncData &amp;&amp; asyncData({
                store,
                route: router.currentRoute
            }))).then( () =&gt; {
                // 执行完毕后，因为获取到的数据都统一存入 vuex 中， 上方 `asyncData` 里面执行的方法就是调用 vuex 的 action, 然后把数据存入的 vuex 的 <span class="hljs-keyword">state</span> 中
                // 所以我们便 store 里面的 <span class="hljs-keyword">state</span> 赋值给 `context.<span class="hljs-keyword">state</span>`
                // 然后 `renderToString` 解析 html 的时候会把 `context.<span class="hljs-keyword">state</span>` 里面的数据 嵌入到 html 的 `window.__INITIAL_STATE__` 变量中 
                // 这样我们到时候处理 客户端 的时候，便可以把客户端中 vuex 中的<span class="hljs-keyword">state</span> 替换成 `window.__INITIAL_STATE__` 中的数据,来完成客户端与服务端的数据统一
                context.<span class="hljs-keyword">state</span> = store.<span class="hljs-keyword">state</span>
                resolve(app)
            }).catch(reject)
        })
    })
}
</code></pre>
</li>
<li>
<p>上面把我们当前访问路径的组件解析完成返回给客户端，客户端激活这些静态的html，因为我们服务端生成 html 获取数据是通过 <code>asyncData</code> 函数，但是我们只有第一次请求服务端需要渲染，以后再进行页面切换的时候不需要进行渲染的，但是 接口的调用 又放入了 <code>asyncData</code> 函数中，所以页面切换的时候，我们客户都需要处理 <code>asyncData</code> 函数，以前我们一般把数据放入 <code>created</code> 钩子函数中，现在放入的时<code>asyncData</code>里面，所以我们进行客户端切换的时候，需要执行它。获取数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {createApp} from './app'
const {app, router, store} = createApp()

// 把store中的state 替换成 window.__INITIAL_STATE__ 中的数据
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 我们只关心之前没有渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
        if (!asyncDataHooks.length) {
            return next()
        }

        // 这里如果有加载指示器(loading indicator)，就触发
        Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
            .then(() => {
                // 停止加载指示器(loading indicator)
                next()
            })
            .catch(next)
    })
    
    // 挂载到根节点上
    app.$mount('#app')
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {createApp} <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>
<span class="hljs-keyword">const</span> {app, router, store} = createApp()

<span class="hljs-comment">// 把store中的state 替换成 window.__INITIAL_STATE__ 中的数据</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.__INITIAL_STATE__) {
    store.replaceState(<span class="hljs-built_in">window</span>.__INITIAL_STATE__)
}

router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// 添加路由钩子函数，用于处理 asyncData.</span>
    <span class="hljs-comment">// 在初始路由 resolve 后执行，</span>
    <span class="hljs-comment">// 以便我们不会二次预取(double-fetch)已有的数据。</span>
    <span class="hljs-comment">// 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。</span>
    router.beforeResolve(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> matched = router.getMatchedComponents(to)
        <span class="hljs-keyword">const</span> prevMatched = router.getMatchedComponents(<span class="hljs-keyword">from</span>)

        <span class="hljs-comment">// 我们只关心之前没有渲染的组件</span>
        <span class="hljs-comment">// 所以我们对比它们，找出两个匹配列表的差异组件</span>
        <span class="hljs-keyword">let</span> diffed = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">const</span> activated = matched.filter(<span class="hljs-function">(<span class="hljs-params">c, i</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> diffed || (diffed = (prevMatched[i] !== c))
        })

        <span class="hljs-keyword">const</span> asyncDataHooks = activated.map(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c.asyncData).filter(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> _)
        <span class="hljs-keyword">if</span> (!asyncDataHooks.length) {
            <span class="hljs-keyword">return</span> next()
        }

        <span class="hljs-comment">// 这里如果有加载指示器(loading indicator)，就触发</span>
        <span class="hljs-built_in">Promise</span>.all(asyncDataHooks.map(<span class="hljs-function"><span class="hljs-params">hook</span> =&gt;</span> hook({ store, <span class="hljs-attr">route</span>: to })))
            .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                <span class="hljs-comment">// 停止加载指示器(loading indicator)</span>
                next()
            })
            .catch(next)
    })
    
    <span class="hljs-comment">// 挂载到根节点上</span>
    app.$mount(<span class="hljs-string">'#app'</span>)
})
</code></pre>
</li>
</ol>
<p>基本上这样就实现了<code>vue-ssr</code>的过程,具体源码及配置可以在我的 <a href="https://github.com/cd-dongzi/vue2-koa2-ssr" rel="nofollow noreferrer" target="_blank">github</a> 查看。</p>
<h3 id="articleHeader6">webpack4</h3>
<p>最明显的点 是 <code>webpack4</code> 以后拥有默认值了，简单配置一下便能使用<br>以下是默认值：</p>
<ul>
<li>entry 的默认值是 ./src</li>
<li>output.path 的默认值是 ./dist</li>
<li>mode 的默认值是 production</li>
<li>UglifyJs 插件默认开启 caches 和 parallizes</li>
</ul>
<p>在 mode 为 develoment 时：</p>
<ul>
<li>开启 output.pathinfo</li>
<li>关闭 optimization.minimize</li>
</ul>
<p>在 mode 为 production 时：</p>
<ul>
<li>关闭 in-memory caching</li>
<li>开启 NoEmitOnErrorsPlugin</li>
<li>开启 ModuleConcatenationPlugin</li>
<li>开启 optimization.minimize</li>
</ul>
<p>因为给自己博客做<code>ssr</code>的通知也升级了webpack,接下来便看下 迁移至 <code>webpack4</code> 需要修改的部分 <code>webpack</code> 配置</p>
<ol>
<li>将CLI移入到 <code>webpack-cli</code> 中，需要安装 <code>webpack-cli</code>
</li>
<li>
<p>通过设置 <code>mode</code> 变量来确定当前模式, 不配置会有警告</p>
<ul>
<li>命令行中配置 <code>webpack --mode development</code>
</li>
<li>
<p>文件中配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    mode: 'development',
    entry: {
      app: resolve('src')
    },
    ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">module</span>.exports = {
    mode: <span class="hljs-string">'development'</span>,
    entry: {
      app: resolve(<span class="hljs-string">'src'</span>)
    },
    ...</code></pre>
</li>
</ul>
</li>
<li><code>webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead</code></li>
</ol>
<p><code>webpack4</code>不再提供 <code>webpack.optimize.CommonsChunkPlugin</code> 来分割代码，需要用到新的属性 <code>optimization.splitChunks</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
```
output: {
  filename: assetsPath('js/[name].[chunkhash].min.js'),
},
optimization: {
  runtimeChunk: {
      name: &quot;manifest&quot;
  },
  splitChunks: {
    chunks: &quot;initial&quot;,         // 必须三选一： &quot;initial&quot; | &quot;all&quot;(默认就是all) | &quot;async&quot;
    minSize: 0,                // 最小尺寸，默认0
    minChunks: 1,              // 最小 chunk ，默认1
    maxAsyncRequests: 1,       // 最大异步请求数， 默认1
    maxInitialRequests: 1,    // 最大初始化请求书，默认1
    name: () => {},              // 名称，此选项课接收 function
    cacheGroups: {                 // 这里开始设置缓存的 chunks
      priority: &quot;0&quot;,                // 缓存组优先级 false | object |
      vendor: {                   // key 为entry中定义的 入口名称
        chunks: &quot;initial&quot;,        // 必须三选一： &quot;initial&quot; | &quot;all&quot; | &quot;async&quot;(默认就是异步)
        test: /react|lodash/,     // 正则规则验证，如果符合就提取 chunk
        name: &quot;vendor&quot;,           // 要缓存的 分隔出来的 chunk 名称
        minSize: 0,
        minChunks: 1,
        enforce: true,
        maxAsyncRequests: 1,       // 最大异步请求数， 默认1
        maxInitialRequests: 1,    // 最大初始化请求书，默认1
        reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
      }
    }
  }
},
...
```
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>
<span class="hljs-string">```</span>
<span class="hljs-attr">output:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  filename:</span> <span class="hljs-string">assetsPath('js/[name].[chunkhash].min.js'),</span>
<span class="hljs-string">},</span>
<span class="hljs-attr">optimization:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  runtimeChunk:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      name:</span> <span class="hljs-string">"manifest"</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">  splitChunks:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    chunks:</span> <span class="hljs-string">"initial"</span><span class="hljs-string">,</span>         <span class="hljs-string">//</span> <span class="hljs-string">必须三选一：</span> <span class="hljs-string">"initial"</span> <span class="hljs-string">| "all"(默认就是all) | "async"
</span><span class="hljs-attr">    minSize:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>                <span class="hljs-string">//</span> <span class="hljs-string">最小尺寸，默认0</span>
<span class="hljs-attr">    minChunks:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>              <span class="hljs-string">//</span> <span class="hljs-string">最小</span> <span class="hljs-string">chunk</span> <span class="hljs-string">，默认1</span>
<span class="hljs-attr">    maxAsyncRequests:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>       <span class="hljs-string">//</span> <span class="hljs-string">最大异步请求数，</span> <span class="hljs-string">默认1</span>
<span class="hljs-attr">    maxInitialRequests:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>    <span class="hljs-string">//</span> <span class="hljs-string">最大初始化请求书，默认1</span>
<span class="hljs-attr">    name:</span> <span class="hljs-string">()</span> <span class="hljs-string">=&gt;</span> <span class="hljs-string">{},</span>              <span class="hljs-string">//</span> <span class="hljs-string">名称，此选项课接收</span> <span class="hljs-string">function</span>
<span class="hljs-attr">    cacheGroups:</span> <span class="hljs-string">{</span>                 <span class="hljs-string">//</span> <span class="hljs-string">这里开始设置缓存的</span> <span class="hljs-string">chunks</span>
<span class="hljs-attr">      priority:</span> <span class="hljs-string">"0"</span><span class="hljs-string">,</span>                <span class="hljs-string">//</span> <span class="hljs-string">缓存组优先级</span> <span class="hljs-literal">false</span> <span class="hljs-string">| object |
</span><span class="hljs-attr">      vendor:</span> <span class="hljs-string">{</span>                   <span class="hljs-string">//</span> <span class="hljs-string">key</span> <span class="hljs-string">为entry中定义的</span> <span class="hljs-string">入口名称</span>
<span class="hljs-attr">        chunks:</span> <span class="hljs-string">"initial"</span><span class="hljs-string">,</span>        <span class="hljs-string">//</span> <span class="hljs-string">必须三选一：</span> <span class="hljs-string">"initial"</span> <span class="hljs-string">| "all" | "async"(默认就是异步)
</span><span class="hljs-attr">        test:</span> <span class="hljs-string">/react|lodash/,</span>     <span class="hljs-string">//</span> <span class="hljs-string">正则规则验证，如果符合就提取</span> <span class="hljs-string">chunk</span>
<span class="hljs-attr">        name:</span> <span class="hljs-string">"vendor"</span><span class="hljs-string">,</span>           <span class="hljs-string">//</span> <span class="hljs-string">要缓存的</span> <span class="hljs-string">分隔出来的</span> <span class="hljs-string">chunk</span> <span class="hljs-string">名称</span>
<span class="hljs-attr">        minSize:</span> <span class="hljs-number">0</span><span class="hljs-string">,</span>
<span class="hljs-attr">        minChunks:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>
<span class="hljs-attr">        enforce:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">        maxAsyncRequests:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>       <span class="hljs-string">//</span> <span class="hljs-string">最大异步请求数，</span> <span class="hljs-string">默认1</span>
<span class="hljs-attr">        maxInitialRequests:</span> <span class="hljs-number">1</span><span class="hljs-string">,</span>    <span class="hljs-string">//</span> <span class="hljs-string">最大初始化请求书，默认1</span>
<span class="hljs-attr">        reuseExistingChunk:</span> <span class="hljs-literal">true</span>   <span class="hljs-string">//</span> <span class="hljs-string">可设置是否重用该chunk（查看源码没有发现默认值）</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">},</span>
<span class="hljs-string">...</span>
<span class="hljs-string">```</span>
</code></pre>
<ol>
<li>
<code>compilation.mainTemplate.applyPluginsWaterfall is not a function</code><p>解决方案： <code>yarn add webpack-contrib/html-webpack-plugin -D</code></p>
</li>
<li>
<code>Use Chunks.groupsIterable and filter by instanceof Entrypoint instead:</code><p>解决方案： <code>yarn add extract-text-webpack-plugin@next -D</code></p>
</li>
</ol>
<p>升级<code>webpack4</code>也遇到了几个问题</p>
<ol>
<li>设置 <code>optimization.splitChunks</code> 打包。分别会打包 <code>js</code>、<code>css</code> 各一份， 不知道啥情况。</li>
<li>升级4以后，我用 <code>DllPlugin</code>打包， 但是 verdon 打包出来还是一样大，并不会把 我指定的 模块提取出来。</li>
<li>import 做按需加载好像不生效。 例如：<code>const _import_ = file =&gt; () =&gt; import(file + '.vue')</code>, 然后通过 <code>_import_('components/Foo')</code> 便能直接按需加载, 但是<code>webpack4</code>就没生效，都是一次性加载出来的。</li>
</ol>
<p>上面是我们升级4遇到的几个问题，可能是我配置方面出错了，但是<code>webpack4</code> 以前都是正常的。<br>具体我这边的配置放到了 <a href="https://github.com/cd-dongzi/vue2-koa2-ssr" rel="nofollow noreferrer" target="_blank">github</a> 上。</p>
<h2 id="articleHeader7">总结</h2>
<p>以上就是我这次<a href="http://dzblog.cn" rel="nofollow noreferrer" target="_blank">个人博客</a>的 <code>SSR</code> 之旅。</p>
<blockquote>
<a href="https://github.com/cd-dongzi/vue2-koa2-ssr" rel="nofollow noreferrer" target="_blank">github</a><p><a href="http://dzblog.cn/article/5ab7ba453aa2533986893133" rel="nofollow noreferrer" target="_blank">博客地址</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2 + koa2 + webpack4 的SSR之旅

## 原文链接
[https://segmentfault.com/a/1190000013983061](https://segmentfault.com/a/1190000013983061)


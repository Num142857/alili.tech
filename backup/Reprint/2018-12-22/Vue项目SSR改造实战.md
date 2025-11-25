---
title: 'Vue项目SSR改造实战' 
date: 2018-12-22 2:30:10
hidden: true
slug: rroq60qgvqg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>博客已全站升级到https，如果遇到无法访问，请手动加上<a href="https://%E5%89%8D%E7%BC%80" rel="nofollow noreferrer" target="_blank">https://前缀</a>
</blockquote>
<p>我们先看“疗效”，你可以打开我的博客<a>u3xyz.com</a>，通过查看源代码来看SSR直出效果。我的博客已经快上线一年了，但不吹不黑，访问量非常地小，我也一直在想办法提升访问量（包括在sf写文章，哈哈）。当然，在PC端，搜索引擎一直都是一个重要的流量来源。这里就不得不提到SEO。下图是我的博客以前在百度的快照：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012440046?w=601&amp;h=94" src="https://static.alili.tech/img/remote/1460000012440046?w=601&amp;h=94" alt="SSR前快照" title="SSR前快照" style="cursor: pointer; display: inline;"></span></p>
<p>细心的朋友会发现，这个快照非常简单，简单到几乎什么都没有。这也是没办法的事，<strong>博客是基于Vue的SPA页面</strong>，整个项目本来就是一个“空架子”，这个快照从博客2月份上线以来就一直是上面的样子，直到最近上线SSR。搜索引擎蜘蛛每次来抓取你的网站都是一个样子，慢慢得，它也就不会来了，相应的，网站的权重，排名肯定不会好。到目前为此，我的博客不用网址进行搜索都搜不到。在上线了SSR后，再加上一些SEO优化，百度快照终于更新了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012440047?w=699&amp;h=231" src="https://static.alili.tech/img/remote/1460000012440047?w=699&amp;h=231" alt="SSR后快照" title="SSR后快照" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">为什么要做SSR</h2>
<p>文章开始基本已经回答了为什么要做SSR这个问题，当然，还有另一个原因是SSR概念现在在前端非常火，无奈在实际项目中没有机会，也只有拿博客来练手了。下面将详细介绍本博客项目SSR全过程。</p>
<h2 id="articleHeader1">SSR改造实战</h2>
<p>总的来说SSR改造还是相当容易的。推荐在动手之前，先了解<a href="https://ssr.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">官方文档</a>和<a href="https://github.com/vuejs/vue-hackernews-2.0/" rel="nofollow noreferrer" target="_blank">官方Vue SSR Demo</a>，这会让我们事半功倍。</p>
<h3 id="articleHeader2">1. 构建改造</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012440048?w=1946&amp;h=892" src="https://static.alili.tech/img/remote/1460000012440048?w=1946&amp;h=892" alt="VueSSR原理" title="VueSSR原理" style="cursor: pointer; display: inline;"></span></p>
<p>上图是Vue官方的SSR原理介绍图片。从这张图片，我们可以知道：我们需要通过Webpack打包生成两份bundle文件：</p>
<ul>
<li>Client Bundle，给浏览器用。和纯Vue前端项目Bundle类似</li>
<li>Server Bundle，供服务端SSR使用，一个json文件</li>
</ul>
<p>不管你项目先前是什么样子，是否是使用vue-cli生成的。都会有这个构建改造过程。在构建改造这里会用到 vue-server-renderer 库，这里要注意的是 vue-server-renderer 版本要与Vue版本一样。下图是我的构建文件目录：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012440049?w=223&amp;h=122" src="https://static.alili.tech/img/remote/1460000012440049?w=223&amp;h=122" alt="构建" title="构建" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>util.js 提供一些公共方法</li>
<li>webpack.base.js是公共的配置</li>
<li>webpack.client.js 是生成Client Bundle的配置。核心配置如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// ...

const config = merge(baseConfig, {
  target: 'web',
  entry: './src/entry.client.js',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '&quot;client&quot;'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vender',
      minChunks: 2
    }),
    // extract webpack runtime &amp; manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new VueSSRClientPlugin()
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> VueSSRClientPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer/client-plugin'</span>)

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> config = merge(baseConfig, {
  <span class="hljs-attr">target</span>: <span class="hljs-string">'web'</span>,
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/entry.client.js'</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV || <span class="hljs-string">'development'</span>),
      <span class="hljs-string">'process.env.VUE_ENV'</span>: <span class="hljs-string">'"client"'</span>
    }),
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'vender'</span>,
      <span class="hljs-attr">minChunks</span>: <span class="hljs-number">2</span>
    }),
    <span class="hljs-comment">// extract webpack runtime &amp; manifest to avoid vendor chunk hash changing</span>
    <span class="hljs-comment">// on every build.</span>
    <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin({
      <span class="hljs-attr">name</span>: <span class="hljs-string">'manifest'</span>
    }),
    <span class="hljs-keyword">new</span> VueSSRClientPlugin()
  ]
})</code></pre>
<ul><li>webpack.server.js 是生成Server Bundle的配置，核心配置如下：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

// ...

const config = merge(baseConfig, {
  target: 'node',
  devtool: '#source-map',
  entry: './src/entry.server.js',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-bundle.js'
  },
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '&quot;server&quot;'
    }),
    new VueSSRServerPlugin()
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> VueSSRServerPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer/server-plugin'</span>)

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> config = merge(baseConfig, {
  <span class="hljs-attr">target</span>: <span class="hljs-string">'node'</span>,
  <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#source-map'</span>,
  <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/entry.server.js'</span>,
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">libraryTarget</span>: <span class="hljs-string">'commonjs2'</span>,
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'server-bundle.js'</span>
  },
  <span class="hljs-attr">externals</span>: nodeExternals({
    <span class="hljs-comment">// do not externalize CSS files in case we need to import it from a dep</span>
    whitelist: <span class="hljs-regexp">/\.css$/</span>
  }),
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-keyword">new</span> webpack.DefinePlugin({
      <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV || <span class="hljs-string">'development'</span>),
      <span class="hljs-string">'process.env.VUE_ENV'</span>: <span class="hljs-string">'"server"'</span>
    }),
    <span class="hljs-keyword">new</span> VueSSRServerPlugin()
  ]
})</code></pre>
<h3 id="articleHeader3">2. 代码改造</h3>
<h4>2.1 必须使用VueRouter, Vuex。ajax库建议使用axios</h4>
<p>可能你的项目没有使用VueRouter或Vuex。但遗憾的是，Vue-SSR必须基于 Vue + VueRouter + Vuex。Vuex官方没有提，但其实文档和Demo都是基于Vuex。我的博客以前也没有用Vuex，但经过一翻折腾后，还是乖乖加上了Vuex。另外，因为代码要能同时在浏览器和Node.js环境中运行，所以ajax库建议使用axios这样的跨平台库。</p>
<h4>2.2 两个打包入口（entry），重构app, store, router, 为每个对象增加工厂方法createXXX</h4>
<p><strong>每个用户通过浏览器访问Vue页面时，都是一个全新的上下文，但在服务端，应用启动后就一直运行着，处理每个用户请求的都是在同一个应用上下文中。为了不串数据，需要为每次SSR请求，创建全新的app, store, router</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012440050?w=206&amp;h=299" src="https://static.alili.tech/img/remote/1460000012440050?w=206&amp;h=299" alt="项目目录" title="项目目录" style="cursor: pointer;"></span></p>
<p>上图是我的项目文件目录。</p>
<ul>
<li>app.js， 通用的启动Vue应用代码</li>
<li>App.vue，Vue应用根组件</li>
<li>entry.client.js，浏览器环境入口</li>
<li>entry.server.js，服务器环境入口</li>
<li>index.html，html模板</li>
</ul>
<p>再看一下具体实现的核心代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js

import Vue from 'vue'
import App from './App.vue' // 根组件
import {createRouter} from './routers/index' 
import {createStore} from './vuex/store'
import {sync} from 'vuex-router-sync' // 把当VueRouter状态同步到Vuex中

// createApp工厂方法
export function createApp (ssrContext) {
  let router = createRouter() // 创建全新router实例
  let store = createStore() // 创建全新store实例

  // 同步路由状态到store中
  sync(store, router)
  
  // 创建Vue应用
  const app = new Vue({
    router,
    store,
    ssrContext,
    render: h => h(App)
  })
  return {app, router, store}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// app.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span> <span class="hljs-comment">// 根组件</span>
<span class="hljs-keyword">import</span> {createRouter} <span class="hljs-keyword">from</span> <span class="hljs-string">'./routers/index'</span> 
<span class="hljs-keyword">import</span> {createStore} <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>
<span class="hljs-keyword">import</span> {sync} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex-router-sync'</span> <span class="hljs-comment">// 把当VueRouter状态同步到Vuex中</span>

<span class="hljs-comment">// createApp工厂方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createApp</span> (<span class="hljs-params">ssrContext</span>) </span>{
  <span class="hljs-keyword">let</span> router = createRouter() <span class="hljs-comment">// 创建全新router实例</span>
  <span class="hljs-keyword">let</span> store = createStore() <span class="hljs-comment">// 创建全新store实例</span>

  <span class="hljs-comment">// 同步路由状态到store中</span>
  sync(store, router)
  
  <span class="hljs-comment">// 创建Vue应用</span>
  <span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
    router,
    store,
    ssrContext,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
  })
  <span class="hljs-keyword">return</span> {app, router, store}
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.client.js 

import Vue from 'vue'
import { createApp } from './app'

const { app, router, store } = createApp()

// 如果有__INITIAL_STATE__变量，则将store的状态用它替换
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    
  // 通过路由勾子，执行拉取数据逻辑
  router.beforeResolve((to, from, next) => {
    // 找到增量组件，拉取数据 
    const matched = router.getMatchedComponents(to) 
    const prevMatched = router.getMatchedComponents(from) 
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    // 组件数据通过执行asyncData方法获取
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }
    // 要注意asyncData方法要返回promise，asyncData调用的vuex action也必须返回promise
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        next()
      })
      .catch(next)
  })

  // 将Vue实例挂载到dom中，完成浏览器端应用启动
  app.$mount('#app')
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// entry.client.js </span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-keyword">const</span> { app, router, store } = createApp()

<span class="hljs-comment">// 如果有__INITIAL_STATE__变量，则将store的状态用它替换</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.__INITIAL_STATE__) {
  store.replaceState(<span class="hljs-built_in">window</span>.__INITIAL_STATE__)
}

router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    
  <span class="hljs-comment">// 通过路由勾子，执行拉取数据逻辑</span>
  router.beforeResolve(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    <span class="hljs-comment">// 找到增量组件，拉取数据 </span>
    <span class="hljs-keyword">const</span> matched = router.getMatchedComponents(to) 
    <span class="hljs-keyword">const</span> prevMatched = router.getMatchedComponents(<span class="hljs-keyword">from</span>) 
    <span class="hljs-keyword">let</span> diffed = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">const</span> activated = matched.filter(<span class="hljs-function">(<span class="hljs-params">c, i</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> diffed || (diffed = (prevMatched[i] !== c))
    })
    <span class="hljs-comment">// 组件数据通过执行asyncData方法获取</span>
    <span class="hljs-keyword">const</span> asyncDataHooks = activated.map(<span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c.asyncData).filter(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> _)
    <span class="hljs-keyword">if</span> (!asyncDataHooks.length) {
      <span class="hljs-keyword">return</span> next()
    }
    <span class="hljs-comment">// 要注意asyncData方法要返回promise，asyncData调用的vuex action也必须返回promise</span>
    <span class="hljs-built_in">Promise</span>.all(asyncDataHooks.map(<span class="hljs-function"><span class="hljs-params">hook</span> =&gt;</span> hook({ store, <span class="hljs-attr">route</span>: to })))
      .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        next()
      })
      .catch(next)
  })

  <span class="hljs-comment">// 将Vue实例挂载到dom中，完成浏览器端应用启动</span>
  app.$mount(<span class="hljs-string">'#app'</span>)
})
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.server.js
import { createApp } from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp(context)

    // 设置路由
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // 执行asyncData方法，预拉取数据
      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store: store,
            route: router.currentRoute
          })
        }
      })).then(() => {
        // 将store的快照挂到ssr上下文上
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// entry.server.js</span>
<span class="hljs-keyword">import</span> { createApp } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> context =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> { app, router, store } = createApp(context)

    <span class="hljs-comment">// 设置路由</span>
    router.push(context.url)

    router.onReady(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> matchedComponents = router.getMatchedComponents()
      <span class="hljs-keyword">if</span> (!matchedComponents.length) {
        <span class="hljs-keyword">return</span> reject({ <span class="hljs-attr">code</span>: <span class="hljs-number">404</span> })
      }

      <span class="hljs-comment">// 执行asyncData方法，预拉取数据</span>
      <span class="hljs-built_in">Promise</span>.all(matchedComponents.map(<span class="hljs-function"><span class="hljs-params">Component</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (Component.asyncData) {
          <span class="hljs-keyword">return</span> Component.asyncData({
            <span class="hljs-attr">store</span>: store,
            <span class="hljs-attr">route</span>: router.currentRoute
          })
        }
      })).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 将store的快照挂到ssr上下文上</span>
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// createStore

import Vue from 'vue'
import Vuex from 'vuex'
// ...

Vue.use(Vuex)

// createStore工厂方法
export function createStore () {
  return new Vuex.Store({
    // rootstate
    state: {
      appName: 'appName',
      title: 'home'
    },

    modules: {
      // ...
    },

    strict: process.env.NODE_ENV !== 'production' // 线上环境关闭store检查
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// createStore</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-comment">// ...</span>

Vue.use(Vuex)

<span class="hljs-comment">// createStore工厂方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createStore</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-comment">// rootstate</span>
    state: {
      <span class="hljs-attr">appName</span>: <span class="hljs-string">'appName'</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'home'</span>
    },

    <span class="hljs-attr">modules</span>: {
      <span class="hljs-comment">// ...</span>
    },

    <span class="hljs-attr">strict</span>: process.env.NODE_ENV !== <span class="hljs-string">'production'</span> <span class="hljs-comment">// 线上环境关闭store检查</span>
  })
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// createRouter

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// createRouter工厂方法
export function createRouter () {
  return new Router({
    mode: 'history', // 注意这里要使用history模式，因为hash不会发送到服务端
    fallback: false,
    routes: [
      {
        path: '/index',
        name: 'index',
        component: () => System.import('./index/index.vue') // 代码分片
      },
      {
        path: '/detail/:aid',
        name: 'detail',
        component: () => System.import('./detail/detail.vue')
      },
      // ...
      {
        path: '/',
        redirect: '/index'
      }
    ]
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// createRouter</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
Vue.use(Router)

<span class="hljs-comment">// createRouter工厂方法</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRouter</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>, <span class="hljs-comment">// 注意这里要使用history模式，因为hash不会发送到服务端</span>
    fallback: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">routes</span>: [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/index'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> System.import(<span class="hljs-string">'./index/index.vue'</span>) <span class="hljs-comment">// 代码分片</span>
      },
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/detail/:aid'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'detail'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> System.import(<span class="hljs-string">'./detail/detail.vue'</span>)
      },
      <span class="hljs-comment">// ...</span>
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/index'</span>
      }
    ]
  })
}</code></pre>
<h3 id="articleHeader4">3. 重构组件获取数据方式</h3>
<p>关于状态管理，要严格遵守Redux思想。建议把应用所有状态都存于store中，组件使用时再mapState下来，状态更改严格使用action的方式。另一个要提一点的是，action要返回promise。这样我们就可以使用asyncData方法获取组件数据了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
  getArticleList ({state, commit}, curPageNum) {
    commit(FETCH_ARTICLE_LIST, curPageNum)

    // action 要返回promise
    return apis.getArticleList({
      data: {
        size: state.pagi.itemsPerPage,
        page: curPageNum
      }
    }).then((res) => {
      // ...
    })
  }
}

// 组件asyncData实现
export default {
  asyncData ({ store }) {
    return store.dispatch('getArticleList', 1)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> actions = {
  getArticleList ({state, commit}, curPageNum) {
    commit(FETCH_ARTICLE_LIST, curPageNum)

    <span class="hljs-comment">// action 要返回promise</span>
    <span class="hljs-keyword">return</span> apis.getArticleList({
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">size</span>: state.pagi.itemsPerPage,
        <span class="hljs-attr">page</span>: curPageNum
      }
    }).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
      <span class="hljs-comment">// ...</span>
    })
  }
}

<span class="hljs-comment">// 组件asyncData实现</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  asyncData ({ store }) {
    <span class="hljs-keyword">return</span> store.dispatch(<span class="hljs-string">'getArticleList'</span>, <span class="hljs-number">1</span>)
  }
}
</code></pre>
<h3 id="articleHeader5">3. SSR服务器实现</h3>
<p>在完成构建和代码改造后，如果一切顺利。我们能得到下面的打包文件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012440051?w=310&amp;h=257" src="https://static.alili.tech/img/remote/1460000012440051?w=310&amp;h=257" alt="dist文件" title="dist文件" style="cursor: pointer;"></span></p>
<p>这时，我们可以开始实现SSR服务端代码了。下面是我博客SSR实现（基于Koa）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server.js
const Koa = require('koa')
const path = require('path')
const logger = require('./logger')
const server = new Koa()
const { createBundleRenderer } = require('vue-server-renderer')
const templateHtml = require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')

let distPath = './dist'

const renderer = createBundleRenderer(require(`${distPath}/vue-ssr-server-bundle.json`), { 
  runInNewContext: false,
  template: templateHtml, 
  clientManifest: require(`${distPath}/vue-ssr-client-manifest.json`) 
})

server.use(function * (next) {
  let ctx = this
  const context = { url: ctx.req.url, pageTitle: 'default-title' }

  // cgi请求，前端资源请求不能转到这里来。这里可以通过nginx做
  if (/\.\w+$/.test(context.url)) {
    return yield next
  }

  // 注意这里也必须返回promise  
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, function (err, html) {
      if (err) {
        logger.error(`[error][ssr-error]: ` + err.stack)
        return reject(err)
      }
      ctx.status = 200
      ctx.type = 'text/html; charset=utf-8'
      ctx.body = html
      resolve(html)
    })
  })
})

// 错误处理
server.on('error', function (err) {
  logger.error('[error][server-error]: ' + err.stack)
})

let port = 80

server.listen(port, () => {
  logger.info(`[info]: server is deploy on port: ${port}`)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// server.js</span>
<span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>)
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> logger = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./logger'</span>)
<span class="hljs-keyword">const</span> server = <span class="hljs-keyword">new</span> Koa()
<span class="hljs-keyword">const</span> { createBundleRenderer } = <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer'</span>)
<span class="hljs-keyword">const</span> templateHtml = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>).readFileSync(path.resolve(__dirname, <span class="hljs-string">'./index.template.html'</span>), <span class="hljs-string">'utf-8'</span>)

<span class="hljs-keyword">let</span> distPath = <span class="hljs-string">'./dist'</span>

<span class="hljs-keyword">const</span> renderer = createBundleRenderer(<span class="hljs-built_in">require</span>(<span class="hljs-string">`<span class="hljs-subst">${distPath}</span>/vue-ssr-server-bundle.json`</span>), { 
  <span class="hljs-attr">runInNewContext</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">template</span>: templateHtml, 
  <span class="hljs-attr">clientManifest</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">`<span class="hljs-subst">${distPath}</span>/vue-ssr-client-manifest.json`</span>) 
})

server.use(<span class="hljs-function"><span class="hljs-keyword">function</span> * (<span class="hljs-params">next</span>) </span>{
  <span class="hljs-keyword">let</span> ctx = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">const</span> context = { <span class="hljs-attr">url</span>: ctx.req.url, <span class="hljs-attr">pageTitle</span>: <span class="hljs-string">'default-title'</span> }

  <span class="hljs-comment">// cgi请求，前端资源请求不能转到这里来。这里可以通过nginx做</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\.\w+$/</span>.test(context.url)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> next
  }

  <span class="hljs-comment">// 注意这里也必须返回promise  </span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    renderer.renderToString(context, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, html</span>) </span>{
      <span class="hljs-keyword">if</span> (err) {
        logger.error(<span class="hljs-string">`[error][ssr-error]: `</span> + err.stack)
        <span class="hljs-keyword">return</span> reject(err)
      }
      ctx.status = <span class="hljs-number">200</span>
      ctx.type = <span class="hljs-string">'text/html; charset=utf-8'</span>
      ctx.body = html
      resolve(html)
    })
  })
})

<span class="hljs-comment">// 错误处理</span>
server.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
  logger.error(<span class="hljs-string">'[error][server-error]: '</span> + err.stack)
})

<span class="hljs-keyword">let</span> port = <span class="hljs-number">80</span>

server.listen(port, () =&gt; {
  logger.info(<span class="hljs-string">`[info]: server is deploy on port: <span class="hljs-subst">${port}</span>`</span>)
})
</code></pre>
<h3 id="articleHeader6">4. 服务器部署</h3>
<p>服务器部署，跟你的项目架构有关。比如我的博客项目在服务端有2个后端服务，一个数据库服务，nginx用于请求转发：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012440052?w=1181&amp;h=720" src="https://static.alili.tech/img/remote/1460000012440052?w=1181&amp;h=720" alt="u3xyz架构" title="u3xyz架构" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">5. 遇到的问题及解决办法</h3>
<blockquote>加载不到组件的JS文件</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[vue-router] Failed to resolve async component default: Error: Cannot find module 'js\main1.js'
[vue-router] uncaught error during route navigation:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>[vue-router] Failed <span class="hljs-keyword">to</span> resolve async component <span class="hljs-keyword">default</span>: <span class="hljs-keyword">Error</span>: Cannot find <span class="hljs-keyword">module</span> <span class="hljs-comment">'js\main1.js'</span>
[vue-router] uncaught <span class="hljs-keyword">error</span> during route navigation:</code></pre>
<p>解决办法：</p>
<p>去掉webpack配置中的output.chunkFilename: getFileName('js/main[name]-$hash.js')</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if you are using CommonsChunkPlugin, make sure to use it only in the client config because the server bundle requires a single entry chunk." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span> you are <span class="hljs-keyword">using</span> CommonsChunkPlugin, make sure <span class="hljs-built_in">to</span> use <span class="hljs-keyword">it</span> only <span class="hljs-keyword">in</span> <span class="hljs-keyword">the</span> client config because <span class="hljs-keyword">the</span> server bundle requires <span class="hljs-keyword">a</span> single entry chunk.</code></pre>
<p>所以对webpack.server.js不要对配置CommonsChunkPlugin,也不要设置output.chunkFilename</p>
<blockquote>代码高亮codeMirror使用到navigator对象，只能在浏览器环境运行</blockquote>
<p>把执行逻辑放到mounted回调中。实现不行，就封装一个异步组件，把组件的初始化放到mounted中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted () {
  let paragraph = require('./paragraph.vue')
  Vue.component('paragraph', paragraph)
  new Vue().$mount('#paragraph')
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">mounted () {
  <span class="hljs-keyword">let</span> paragraph = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./paragraph.vue'</span>)
  Vue.component(<span class="hljs-string">'paragraph'</span>, paragraph)
  <span class="hljs-keyword">new</span> Vue().$mount(<span class="hljs-string">'#paragraph'</span>)
},</code></pre>
<blockquote>串数据</blockquote>
<p>dispatch的action没有返回promise，保证返回promise即可</p>
<blockquote>路由跳转</blockquote>
<p>路由跳转使用router方法或&lt;router-link /&gt;标签，这两种方式能自适应浏览器端和服务端，不要使用a标签</p>
<h2 id="articleHeader8">小结</h2>
<p>本文主要记录了我的博客<a>u3xyz.com</a>SSR过程：</p>
<ul>
<li>构建webpack改造</li>
<li>代码改造</li>
<li>server端SSR实现</li>
<li>上线部署</li>
</ul>
<p>最后希望文章能对大家有些许帮助！</p>
<p>愿文地址：<a href="http://u3xyz.com/detail/29" rel="nofollow noreferrer" target="_blank">Vue项目SSR改造实战</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue项目SSR改造实战

## 原文链接
[https://segmentfault.com/a/1190000012440041](https://segmentfault.com/a/1190000012440041)


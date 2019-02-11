---
title: '使用Vue构建中(大)型应用' 
date: 2019-02-12 2:30:12
hidden: true
slug: go60azs9wha
categories: [reprint]
---

{{< raw >}}

                    
<p>想做SPA就快上车！</p>
<h2 id="articleHeader0">init</h2>
<p>首先要起一个项目，推荐用vue-cli安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g vue-cli
$ vue init webpack demo
$ cd demo
$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="console"><span class="hljs-variable">$ </span>npm install -g vue-cli
<span class="hljs-variable">$ </span>vue init webpack demo
<span class="hljs-variable">$ </span>cd demo
<span class="hljs-variable">$ </span>npm install</code></pre>
<p><code>demo</code>是这个示例项目的名字</p>
<p>现在看到目录结构如下</p>
<p><span class="img-wrap"><img data-src="/img/bVtUAp" src="https://static.alili.tech/img/bVtUAp" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>下面来稍微介绍下</p>
<p><code>build</code>目录是一些webpack的文件，配置参数什么的，一般不用动</p>
<p><code>src</code>源码文件夹，基本上文件都应该放在这里。</p>
<p><code>static</code>生成好的文件会放在这个目录下。</p>
<p><code>test</code>测试文件夹，测试都写在这里</p>
<p><code>.babelrc</code> babel编译参数，vue开发需要babel编译</p>
<p><code>.editorconfig</code> 看名字是编辑器配置文件，不晓得是哪款编辑器，没有使用过。</p>
<p><code>.eslintrc.js</code> eslint配置文件，用以规范团队开发编码规范，大中型项目很有用</p>
<p><code>.gitignore</code> 用来过滤一些版本控制的文件，比如node_modules文件夹</p>
<p><code>index.html</code> 主页</p>
<p><code>package.json</code> 项目文件，记载着一些命令和依赖还有简要的项目描述信息</p>
<p><code>README.md</code> 介绍自己这个项目的，想怎么写怎么写。不会写就参照github上star多的项目，看人家怎么写的</p>
<p>下面我针对自己的需要修改一些配置。你可以根据自己的需要进行修改。</p>
<p>首先去写.eslintrc.js。在rules中加入<code>"indent": [1, 4, { "SwitchCase": 1 }]</code></p>
<p>因为我更喜欢4个空格表一个缩进，报警程度调整成1是因为build文件夹里有很多行是2个空格，草草的。</p>
<p>然后在index.html中的<code>&lt;app&gt;&lt;/app&gt;</code>改成<code>&lt;div id="root"&gt;&lt;/div&gt;</code></p>
<p>这个文件没有写入任何加载css和js的link，而依旧可以正常运行的秘诀在于webpack会在编译的时候重新调整这个文件，注入依赖，所以不用太担心。</p>
<p>好了，差不多了。进行下一步</p>
<h2 id="articleHeader1">添加依赖</h2>
<p>我个人习惯写stylus，所以要加上预处理器，如果喜欢sass可以自行添加。</p>
<p>vue-router做前端路由管理，一个中大型项目必须要做路由管理！</p>
<p>vuex做数据管理，类似于flux的存在，没有vuex，中大型应用中的状态会把开发者搞死，绝对。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save vue-router vuex
$ npm install --save-dev stylus-loader babel-runtime" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="console">$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save vue-router vuex</span>
$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save-dev stylus-loader babel-runtime</span></code></pre>
<p>好了，到这里，依赖也加好了。剩下的就是写代码了？</p>
<p>不急，我先说下两个vue插件的介绍</p>
<h2 id="articleHeader2">vue-router 简明API</h2>
<p>vue-router用起来非常的简单</p>
<p>入口文件(<code>src/main.js</code>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
import Vue from 'vue' // 引入vue
import Router from 'vue-router' // 引入vue-router

import App from './App' // 引入根组件
import routerMap from './router' // 引入路由表

Vue.use(Router) // 声明使用vue-router
const router = new Router() // 创建路由
routerMap(router) // 路由表引入

router.start(App, '#root') // 开启应用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span> <span class="hljs-comment">// 引入vue</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span> <span class="hljs-comment">// 引入vue-router</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span> <span class="hljs-comment">// 引入根组件</span>
<span class="hljs-keyword">import</span> routerMap <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span> <span class="hljs-comment">// 引入路由表</span>

Vue.use(Router) <span class="hljs-comment">// 声明使用vue-router</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router() <span class="hljs-comment">// 创建路由</span>
routerMap(router) <span class="hljs-comment">// 路由表引入</span>

router.start(App, <span class="hljs-string">'#root'</span>) <span class="hljs-comment">// 开启应用</span>
</code></pre>
<p>看到缺了一个<code>./router.js</code>文件，来，创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/router.js
'use strict'

export default function (router) {
    router.map({
        '/': {
            name: 'index',
            component: require('./components/contents/hello.vue')
        },
        '/hi': {
            name: 'hi',
            // 按需加载
            component: function (resolve) {
                require(['./components/contents/hi.vue'], resolve)
            }
        }
    })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/router.js</span>
<span class="hljs-meta">'use strict'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">router</span>) </span>{
    router.map({
        <span class="hljs-string">'/'</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
            <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/contents/hello.vue'</span>)
        },
        <span class="hljs-string">'/hi'</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'hi'</span>,
            <span class="hljs-comment">// 按需加载</span>
            component: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
                <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/contents/hi.vue'</span>], resolve)
            }
        }
    })
}
</code></pre>
<p>好了，路由创建成功了，顺便还搞了个按需加载。</p>
<p>那么在模板文件中如何使用？</p>
<p>很简单的，就像这样就可以了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/components/contents/hello.vue -->
<a class=&quot;link&quot; v-link=&quot;{name: 'hi'}&quot;>跳转到hi</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/components/contents/hello.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"link"</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{name: 'hi'}"</span>&gt;</span>跳转到hi<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>还有，告诉应用哪里需要路由转换</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- src/App.vue -->
<div class=&quot;container&quot;>
    <router-view></router-view>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- src/App.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h2 id="articleHeader3">vuex 简明API</h2>
<p>这里简要介绍一下状态管理的vuex</p>
<p>在src下创建一个文件夹叫做<code>vuex</code>。里面定义三个文件。</p>
<p><code>mutation-types.js</code> 定义类型的</p>
<p><code>actions.js</code> 操作，可以分解成多个文件</p>
<p><code>store.js</code> 入口文件，在根组件调用，然后所有子组件可以共享数据。</p>
<p><code>modules/headers.js</code> 只是例子用的，一个headers的操作，需要定义数据的状态和mutation。<code>action.js</code>只是分发操作。</p>
<p>这一块还是看源码比较容易懂。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/mutation-types.js
export const SET_HEADER_TITLE = 'SET_HEADER_TITLE'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/mutation-types.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_HEADER_TITLE = <span class="hljs-string">'SET_HEADER_TITLE'</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import headers from './modules/headers'
import createLogger from 'vuex/logger'
Vue.use(Vuex)

Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        headers
    },
    strict: debug,
    moddlewares: debug ? [createLogger()] : []
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/store.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> headers <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/headers'</span>
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex/logger'</span>
Vue.use(Vuex)

Vue.config.debug = <span class="hljs-literal">true</span>

<span class="hljs-keyword">const</span> debug = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">modules</span>: {
        headers
    },
    <span class="hljs-attr">strict</span>: debug,
    <span class="hljs-attr">moddlewares</span>: debug ? [createLogger()] : []
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/actions.js
import {
    SET_HEADER_TITLE
} from './mutation-types'

export const setTitle = makeAction(SET_HEADER_TITLE)

function makeAction (type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/actions.js</span>
<span class="hljs-keyword">import</span> {
    SET_HEADER_TITLE
} <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation-types'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> setTitle = makeAction(SET_HEADER_TITLE)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAction</span> (<span class="hljs-params">type</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch }, ...args</span>) =&gt;</span> dispatch(type, ...args)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/modules/headers.js
import {
    SET_HEADER_TITLE
} from '../mutation-types'

const state = {
    title: 'default'
}

const mutations = {
    [SET_HEADER_TITLE](state, newTitle) {
        state.title = newTitle
    }
}

export default {
    state,
    mutations
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/modules/headers.js</span>
<span class="hljs-keyword">import</span> {
    SET_HEADER_TITLE
} <span class="hljs-keyword">from</span> <span class="hljs-string">'../mutation-types'</span>

<span class="hljs-keyword">const</span> state = {
    <span class="hljs-attr">title</span>: <span class="hljs-string">'default'</span>
}

<span class="hljs-keyword">const</span> mutations = {
    [SET_HEADER_TITLE](state, newTitle) {
        state.title = newTitle
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    state,
    mutations
}</code></pre>
<p>我再说两个，一个挂载store，一个获取数据，触发操作。</p>
<h3 id="articleHeader4">挂载store</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/App.vue
import store from './vuex/store'
import HeaderComponent from './components/header'
import FooterComponent from './components/footer'
export default {
    store,
    components: {
        HeaderComponent,
        FooterComponent
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/App.vue</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>
<span class="hljs-keyword">import</span> HeaderComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/header'</span>
<span class="hljs-keyword">import</span> FooterComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/footer'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    store,
    <span class="hljs-attr">components</span>: {
        HeaderComponent,
        FooterComponent
    }
}</code></pre>
<h2 id="articleHeader5">获取数据及操作</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/header.vue
// 从vuex拿数据，然后渲染到页面上
// 如果需要修改可以调用setTitle
import { setTitle } from '../vuex/actions'
export default {
    vuex: {
        getters: {
            title: state => state.headers.title
        },
        actions: {
            setTitle
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/components/header.vue</span>
<span class="hljs-comment">// 从vuex拿数据，然后渲染到页面上</span>
<span class="hljs-comment">// 如果需要修改可以调用setTitle</span>
<span class="hljs-keyword">import</span> { setTitle } <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">vuex</span>: {
        <span class="hljs-attr">getters</span>: {
            <span class="hljs-attr">title</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.headers.title
        },
        <span class="hljs-attr">actions</span>: {
            setTitle
        }
    }
}</code></pre>
<h2 id="articleHeader6">fetch</h2>
<p>单页应用少不了服务端交互，别老用ajax了，换<a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank">fetch</a>吧，少年！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save isomorphic-fetch es6-promise" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="console" style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save isomorphic-fetch es6-promise</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/vuex/actions.js
require('es6-promise').polyfill()
require('isomorphic-fetch')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/vuex/actions.js</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'es6-promise'</span>).polyfill()
<span class="hljs-built_in">require</span>(<span class="hljs-string">'isomorphic-fetch'</span>)</code></pre>
<p>我在示例代码中并没有写。</p>
<p>fetch用起来根本不会回忆ajax时代的。</p>
<h2 id="articleHeader7">stylus</h2>
<p>在之前的文章中安利过很多次stylus了，各种方便，这里一笔带过，喜欢的同学自然会去找<a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank">文档</a></p>
<h2 id="articleHeader8">test</h2>
<p>测试是非常重要的一环。要想以后不出乱子，一定要尽早写好测试。</p>
<p>示例代码中有少量测试，推荐看一下</p>
<h2 id="articleHeader9">Code</h2>
<p>我还是决定不在文章里写代码了。</p>
<h2 id="articleHeader10">多端</h2>
<p>vue创作的应用不仅可以跑在浏览器里，还可以通过<a href="http://electron.atom.io/" rel="nofollow noreferrer" target="_blank">electron</a>以客户端的形式跑起来！</p>
<p>是不是吊吊的。</p>
<p>至于移动端，听闻阿里内部有在开发<em>Weex</em>，类vue的api。等待开源吧。</p>
<h2 id="articleHeader11">未来</h2>
<p>未来js的前途肯定是不错的！加油～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue构建中(大)型应用

## 原文链接
[https://segmentfault.com/a/1190000004706690](https://segmentfault.com/a/1190000004706690)


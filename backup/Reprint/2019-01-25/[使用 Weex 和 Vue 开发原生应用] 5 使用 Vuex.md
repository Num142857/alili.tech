---
title: '[使用 Weex 和 Vue 开发原生应用] 5 使用 Vuex' 
date: 2019-01-25 2:30:23
hidden: true
slug: h4ufbby1sa
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>系列文章的目录在 ? <a href="https://segmentfault.com/a/1190000008342533">这里</a></p></blockquote>
<h2 id="articleHeader0">什么是 Vuex ？</h2>
<blockquote><p><a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">Vuex 官方文档</a></p></blockquote>
<p>Vuex 是一个专为 Vue.js 应用程序开发的 <strong>状态管理模式</strong>。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p>
<p>Vuex 的核心工作是状态管理，主要包含了 <code>State</code>, <code>View</code> <code>Actions</code> 这三部分，组成了一个简单的“单项数据流”，避免了管理多状态造成的数据不一致问题。</p>
<p><span class="img-wrap"><img data-src="https://vuex.vuejs.org/zh-cn/images/flow.png" src="https://static.alili.techhttps://vuex.vuejs.org/zh-cn/images/flow.png" alt="Data Flow" title="Data Flow" style="cursor: pointer;"></span></p>
<p>Vuex 是专门为 Vue.js 设计的状态管理库，贴合 Vue 本身的数据更新特性，能够利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。而且可以是以 插件（plugin）的形式提供，安装完成之后可以很方便的在 VueComponent 实例中获取到全局状态。模块之间的关系和操作如下图所示：</p>
<p><span class="img-wrap"><img data-src="https://vuex.vuejs.org/zh-cn/images/vuex.png" src="https://static.alili.techhttps://vuex.vuejs.org/zh-cn/images/vuex.png" alt="Vuex Structure" title="Vuex Structure" style="cursor: pointer;"></span></p>
<ul>
<li><p><code>State</code>: 应用的<a href="https://vuex.vuejs.org/zh-cn/state.html" rel="nofollow noreferrer" target="_blank">单一状态树</a>。通常一个应用里只保存同一份状态（组件仍然可以保有局部状态），为的是便于多个组件之间的状态同步。状态的更新将会触发指定组件的重新渲染。</p></li>
<li><p><code>Action</code>: 描述组件<a href="https://vuex.vuejs.org/zh-cn/actions.html" rel="nofollow noreferrer" target="_blank">触发的操作</a>。它可以通过 <code>commit</code> 产生 <code>mutation</code>，是对逻辑的封装，组件只需要派发 Action 而不用关心数据到底是如何更新的。</p></li>
<li><p><code>Mutations</code>: 描述<a href="https://vuex.vuejs.org/zh-cn/mutations.html" rel="nofollow noreferrer" target="_blank">状态应该如何更新</a>。只有提交 <code>mutation</code> 才可以更新 Store 中的状态，它是对数据操作的封装，定义了如何更新状态数据。</p></li>
</ul>
<blockquote><p>以上只是对 Vuex 的概述，想要了解详细的原理和用法，还是得看<a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">官方文档</a>。</p></blockquote>
<h2 id="articleHeader1">怎么在 Weex 里用 Vuex</h2>
<p>Vuex 是个状态管理的库，用的都是 javascript 本身的语法特性，是与平台无关的，所以它可以完全正常的用在 Weex 里。</p>
<p>不过因为 Vue.js 框架代码已经集成在 WeexSDK （0.9.5 以上）中，所以你不需要再引入一遍 Vue 。另外因为 Vuex <a href="https://github.com/vuejs/vuex/blob/4e1e9b230e7c93885c69bc3edf789069df010e36/src/store.js#L426-L429" rel="nofollow noreferrer" target="_blank">在浏览器环境下会自动注册</a>，只需要在非 Web 环境下注册 Vuex 插件即可，重复注册的话会抛出警告的。引入 Vuex 的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import Vue from 'vue'
import Vuex from 'vuex'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// import Vue from 'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-comment">// Vuex is auto installed on the web</span>
<span class="hljs-keyword">if</span> (WXEnvironment.platform !== <span class="hljs-string">'Web'</span>) {
  Vue.use(Vuex)
}</code></pre>
<p>注册成功之后，<strong>所有 Vuex 的特性都能在 Weex 里使用！</strong> 具体用法以<a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">官方文档</a>为准。</p>
<h2 id="articleHeader2">使用 Vuex 的例子</h2>
<h3 id="articleHeader3">创建 Store</h3>
<p>首先要创建全局唯一的 Store 对象，包含了唯一的状态树和一些操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state: {
    count: 0
  },

  mutations: {
    increment (state) {
      state.count++
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
  },

  <span class="hljs-attr">mutations</span>: {
    increment (state) {
      state.count++
    }
  }
})</code></pre>
<p>除了 <code>state</code> 和 <code>mutations</code> 以外，还可以传入 <code>actions</code> 、<code>getters</code> 、<code>modules</code> 这些属性的关系和上边图中一一对应。参考其 <a href="https://vuex.vuejs.org/zh-cn/api.html#vuexstore-" rel="nofollow noreferrer" target="_blank">API 文档</a>了解更详细的用法。在 <a href="https://github.com/weexteam/weex-hackernews" rel="nofollow noreferrer" target="_blank">weex-hackernews</a> 项目的 <a href="https://github.com/weexteam/weex-hackernews/blob/master/src/store/index.js" rel="nofollow noreferrer" target="_blank">src/store/index.js</a> 中也有一个更复杂的例子。</p>
<p>然后在创建实例的时候传入 <code>store</code> 对象，这样 Store 就和组件建立了联系，每个组件都可以通过 <code>this.$store</code> 的方式获取到 Store 中的状态和操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import App from 'path/to/App.vue'
import store from 'path/to/store.js'

App.el = '#root'
App.store = store

new Vue(App)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/App.vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'path/to/store.js'</span>

App.el = <span class="hljs-string">'#root'</span>
App.store = store

<span class="hljs-keyword">new</span> Vue(App)</code></pre>
<h3 id="articleHeader4">添加 Actions 和 Mutations</h3>
<p>光有数据是不行的，还得定义 <em>触发数据修改的行为</em>（Actions） 和 <em>对数据的操作</em>（Mutations）。以 weex-hackernews 里的加载用户数据为例，可以简化成下边的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入网络操作的接口
import { fetchUser } from './fetch'

const store = new Vuex.Store({
  state: {
    users: {},
  },

  actions: {
    FETCH_USER ({ commit }, { id }) {
      // 获取新的用户数据，然后提交给 mutation
      return fetchUser(id).then(user => commit('SET_USER', { user }))
    }
  },

  mutations: {
    SET_USER (state, { user }) {
      // 修改 users 中的数据，并且触发界面更新
      Vue.set(state.users, user.id, user)
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入网络操作的接口</span>
<span class="hljs-keyword">import</span> { fetchUser } <span class="hljs-keyword">from</span> <span class="hljs-string">'./fetch'</span>

<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">users</span>: {},
  },

  <span class="hljs-attr">actions</span>: {
    FETCH_USER ({ commit }, { id }) {
      <span class="hljs-comment">// 获取新的用户数据，然后提交给 mutation</span>
      <span class="hljs-keyword">return</span> fetchUser(id).then(<span class="hljs-function"><span class="hljs-params">user</span> =&gt;</span> commit(<span class="hljs-string">'SET_USER'</span>, { user }))
    }
  },

  <span class="hljs-attr">mutations</span>: {
    SET_USER (state, { user }) {
      <span class="hljs-comment">// 修改 users 中的数据，并且触发界面更新</span>
      Vue.set(state.users, user.id, user)
    }
  }
})</code></pre>
<p>在上边的代码中，<code>state</code> 里有一个 <code>user</code> 对象，所有需要用户数据的地方都将从这个变量中获取，所有对用户数据的修改实际上也都是改的这个变量。这是全局唯一状态的意义。</p>
<p>然后代码里定义了 <code>FETCH_USER</code> 的 action，和 <code>SET_USER</code> 的 mutation ，注意两者的差别。真正修改 <code>user</code> 数据的是 SET_USER 这个 mutation，也只有 mutation 能修改 state 中的数据。FETCH_USER 负责获取新数据然后派发 mutation，它调用了 <code>fetchUser</code> 获取用户数据，然后通过把这个新数据“提交”给 SET_USER 这个 mutation；然后在 mutation 里执行数据更新的操作，<code>Vue.set</code> 这个方法会触发更新 <code>state.users</code> 里绑定的界面元素。</p>
<h3 id="articleHeader5">使用 Getters</h3>
<blockquote><p><a href="https://vuex.vuejs.org/zh-cn/getters.html" rel="nofollow noreferrer" target="_blank">Getters 官方文档</a></p></blockquote>
<p>Getters 类似于 Vue 组件里的 <code>computed</code> 属性，可以根据现有的基础状态做运算，然后返回一个新的值。把取值过程写成 Getter 是一种惰性求值，也减少了状态同步的负担。</p>
<p>举个例子，假如你想渲染一个列表中的一组数据，又想渲染这组数据的总和，如果再加一条“数据总和”的属性的话，在列表更新后还得手动更新“数据总和”这条属性，比较麻烦也容易出错。这种情况下就很适合写成一个 Getter。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state: {
    lists: [
      { count: 4 },
      { count: 8 },
      { count: 3 },
      { count: 9 }
    ],
  },

  getters: {
    summary ({ lists }) {
      return lists.reduce((sum, curr) => sum + curr.count, 0)
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">lists</span>: [
      { <span class="hljs-attr">count</span>: <span class="hljs-number">4</span> },
      { <span class="hljs-attr">count</span>: <span class="hljs-number">8</span> },
      { <span class="hljs-attr">count</span>: <span class="hljs-number">3</span> },
      { <span class="hljs-attr">count</span>: <span class="hljs-number">9</span> }
    ],
  },

  <span class="hljs-attr">getters</span>: {
    summary ({ lists }) {
      <span class="hljs-keyword">return</span> lists.reduce(<span class="hljs-function">(<span class="hljs-params">sum, curr</span>) =&gt;</span> sum + curr.count, <span class="hljs-number">0</span>)
    }
  }
})</code></pre>
<p>上边代码中的 <code>summary</code> 就是一个对 <code>lists</code> 数组求和的 Getter。在实际使用中，组件里可以通过 <code>this.$store.state.lists</code> 获取 <code>lists</code> 列表数据，可以通过 <code>this.$store.getters.summary</code> 获取数据总和，更新列表的时候数据总和也会自动更新。</p>
<h4>在项目里的实际应用场景</h4>
<p>在 weex-hackernews 的项目的 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/src/store/index.js#L35-L48" rel="nofollow noreferrer" target="_blank">src/store/index.js</a> 文件里定义了 <code>activeIds</code> 的 Getter，用来获取当前首屏 feed 列表中需要展示的数据 ID。然后还定义了 <code>activeItems</code>，在其中有调用了 <code>activeIds</code>，会根据活跃的 ID 获取相应的数据对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  //...

  getters: {
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds (state) {
      const { activeType, lists, counts } = state
      return activeType ? lists[activeType].slice(0, counts[activeType]) : []
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems (state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-comment">//...</span>

  getters: {
    <span class="hljs-comment">// ids of the items that should be currently displayed based on</span>
    <span class="hljs-comment">// current list type and current pagination</span>
    activeIds (state) {
      <span class="hljs-keyword">const</span> { activeType, lists, counts } = state
      <span class="hljs-keyword">return</span> activeType ? lists[activeType].slice(<span class="hljs-number">0</span>, counts[activeType]) : []
    },

    <span class="hljs-comment">// items that should be currently displayed.</span>
    <span class="hljs-comment">// this Array may not be fully fetched.</span>
    activeItems (state, getters) {
      <span class="hljs-keyword">return</span> getters.activeIds.map(<span class="hljs-function"><span class="hljs-params">id</span> =&gt;</span> state.items[id]).filter(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> _)
    }
  }
}</code></pre>
<p>然后在 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/src/views/StoriesView.vue#L35-L37" rel="nofollow noreferrer" target="_blank">src/views/StoriesView.vue</a> 这个文件里定义了一个 <code>computed</code> 属性，从 Store 中获取列表需要展示的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  //...

  computed: {
    stories () {
      return this.$store.getters.activeItems
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-comment">//...</span>

  computed: {
    stories () {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.activeItems
    }
  }
}</code></pre>
<p>在 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/src/views/StoriesView.vue#L5-L7" rel="nofollow noreferrer" target="_blank">StoriesView.vue</a> 的模板中根据 <code>stories</code> 这个数据循环创建 <code>&lt;story&gt;</code> 组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<list>
  <cell v-for=&quot;story in stories&quot; :key=&quot;story.id&quot;>
    <story :story=&quot;story&quot;></story>
  </cell>
</list>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">list</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">cell</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"story in stories"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"story.id"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">story</span> <span class="hljs-attr">:story</span>=<span class="hljs-string">"story"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">story</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">cell</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">list</span>&gt;</span></code></pre>
<h2 id="articleHeader6">最佳实践 ？</h2>
<p><strong>以下都是个人观点。</strong></p>
<p>Vuex 衍生自 <a href="https://facebook.github.io/flux/docs/overview.html" rel="nofollow noreferrer" target="_blank">Flux</a> 架构，用来管理应用的状态，强调单向数据流和全局唯一状态。对于一些数据状态复杂，而且又自上而下实现了组件化的应用里，能发挥很大作用。状态的更新大概能简化为 <code>nextState = f(state, action)</code>，有一种函数式的感觉，可以节约逻辑。</p>
<p>虽然 Vuex 与其他技术没有耦合关系，但是通常都是用在单页应用（SPA）里，还经常搭配着 vue-router 使用。不过我在<a href="https://segmentfault.com/a/1190000008366358">《【使用 Weex 和 Vue 开发原生应用】 2 编写独立页面》</a> 这篇文章里说过，Weex 的实例在 Web 上是和“浏览器页签”的概念相对应的，通常一个 Weex 实例就是一个“页面”，也就是说，Weex 的设计是个“多页应用”，是多实例的。在 Weex 中使用 Vuex，它的作用域是实例级别的，不同页面（实例）之间是不能通过 Vuex 共享状态的。</p>
<p>Weex 毕竟渲染的是原生界面，虽然语法上贴近 Web，但是在一些基本概念上和 Native 更近一些。“单页应用”、“单向数据流”这些概念主要是在前端里比较流行，Weex 只是一个 SDK，在开发原生应用的时候，页面跳转策略这类问题，我觉得还是应该以客户端自身的架构设计为主。</p>
<blockquote><p>weex-hackernews 这个项目是为了验证 Vuex 和 vue-router 接入的可能性，并不一定是最佳实践。</p></blockquote>
<p>我觉得既然 Weex 在原生端是多实例的，就未必适合写单页应用。即使像 Vuex 这种相对独立的状态管理的库，在 “不同页面是不同的 Weex 实例” 这种前提下，就需要根据 App 自身的技术特性，<br>再考虑一下应不应该使用。</p>
<p>关于单页应用，会在<a href="https://segmentfault.com/a/1190000009101411" target="_blank">《使用 vue-router》</a>里有更多讨论。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[使用 Weex 和 Vue 开发原生应用] 5 使用 Vuex

## 原文链接
[https://segmentfault.com/a/1190000008520677](https://segmentfault.com/a/1190000008520677)


---
title: '你想要的——vuex源码分析' 
date: 2019-01-08 2:30:11
hidden: true
slug: tdj2egk7sgk
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="大家好，今天给大家带来的是vuex（2.3.1）源码分析，希望能够能跟大家进行交流，欢迎提意见，写的不好的地方欢迎拍砖

[github源码地址][1]

首先我们先来看看vuex是如何跟vue项目一起结合使用的，以下是官方demo中的一个简单例子
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>大家好，今天给大家带来的是vuex（2.3.1）源码分析，希望能够能跟大家进行交流，欢迎提意见，写的不好的地方欢迎拍砖

[<span class="hljs-string">github源码地址</span>][<span class="hljs-symbol">1</span>]

首先我们先来看看vuex是如何跟vue项目一起结合使用的，以下是官方demo中的一个简单例子
</code></pre>
<p>（1）我们必须先创建一个store</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  plugins
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> { state, mutations } <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations'</span>
<span class="hljs-keyword">import</span> plugins <span class="hljs-keyword">from</span> <span class="hljs-string">'./plugins'</span>

Vue.use(Vuex)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  mutations,
  plugins
})</code></pre>
<p>（2）将这个store传给vue的实例，这样我们就能够在vue中获取到这个store并且使用它的功能了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

new Vue({
  store, // inject store to all children
  el: '#app',
  render: h => h(App)
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/App.vue'</span>

<span class="hljs-keyword">new</span> Vue({
  store, <span class="hljs-comment">// inject store to all children</span>
  el: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})
</code></pre>
<p>以上就是vuex的简单使用方法，然后接下来我们就开始来分析vuex的源码吧</p>
<ul><li>
<p>目录结构</p>
<p><span class="img-wrap"><img data-src="/img/bVQXxj?w=392&amp;h=532" src="https://static.alili.tech/img/bVQXxj?w=392&amp;h=532" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li></ul>
<p>从目录结构可以看出，vuex是一个代码比较简洁的框架</p>
<ul><li><p>index.js——入口文件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Store, install } from './store'
import { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } from './helpers'

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Store, install } <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> { mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers } <span class="hljs-keyword">from</span> <span class="hljs-string">'./helpers'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  Store,
  install,
  version: <span class="hljs-string">'__VERSION__'</span>,
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}</code></pre>
<p>入口文件只做了一件事，就是导入了其他相关的文件，并且将vuex的功能export出去，相当于定义vuex对外使用的API</p>
<ul><li><p>store.js——vuex的仓库，也是vuex中比较重要的一环<br>   这个文件比较长，我们可以一点一点来分析：<br>   总体来说，这个文件做了几件事，定义并导出了Store这个类和install方法，并执行了install这个方法，我们都知道，vue的所有插件都是通过install这个方法来安装的</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import applyMixin from './mixin'
import devtoolPlugin from './plugins/devtool'
import ModuleCollection from './module/module-collection'
import { forEachValue, isObject, isPromise, assert } from './util'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code><span class="hljs-keyword">import</span> applyMixin <span class="hljs-keyword">from</span> <span class="hljs-string">'./mixin'</span>
<span class="hljs-keyword">import</span> devtoolPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">'./plugins/devtool'</span>
<span class="hljs-keyword">import</span> ModuleCollection <span class="hljs-keyword">from</span> <span class="hljs-string">'./module/module-collection'</span>
<span class="hljs-keyword">import</span> { forEachValue, isObject, isPromise, <span class="hljs-built_in">assert</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">'./util'</span></code></pre>
<p>一开始导入相关的方法，后面会解释这些方法的用处</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Vue // 定义了变量Vue，为的是引用外部的vue构造函数，这样vuex框架就可以不用导入vue这个库了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> Vue <span class="hljs-comment">// 定义了变量Vue，为的是引用外部的vue构造函数，这样vuex框架就可以不用导入vue这个库了</span></code></pre>
<p><strong>----------------------------------------------------------这是分割线----------------------------------------------------------------------------------------</strong></p>
<p>接下来是定义Store这个类，从图中可以看出这个vuex中的外store对外提供的能力，包括常用的commit,dispatch，watch等</p>
<p><span class="img-wrap"><img data-src="/img/bVQXBK?w=502&amp;h=699" src="https://static.alili.tech/img/bVQXBK?w=502&amp;h=699" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>先看看构造函数吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor (options = {}) {
    // 这个是在开发过程中的一些环节判断，vuex要求在创建vuex store实例之前必须先使用这个方法Vue.use(Vuex)来安装vuex，项目必须也得支持promise，store也必须通过new来创建实例
    
    if (process.env.NODE_ENV !== 'production') {
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`)
      assert(this instanceof Store, `Store must be called with the new operator.`)
    }
    
    // 从参数options中结构出相关变量
    const {
      plugins = [],
      strict = false
    } = options

    let {
      state = {}
    } = options
    
    // 这个简单的，不解释
    if (typeof state === 'function') {
      state = state()
    }

    // store internal state
    // 初始化store内部状态，Object.create(null)可以创建一个干净的空对象
    this._committing = false
    this._actions = Object.create(null)
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    // vuex支持模块，即将state通过key-value的形式拆分为多个模块
    // 模块的具体内容可以查看这里 ：https://vuex.vuejs.org/en/mutations.html
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    // 监听队列，当执行commit时会执行队列中的函数
    this._subscribers = []
    // 创建一个vue实例，利用vue的watch的能力，可以监控state的改变，具体后续watch方法会介绍
    this._watcherVM = new Vue()

    // bind commit and dispatch to self
    
    const store = this
    // 缓存dispatch和commit方法
    const { dispatch, commit } = this
    // 定义dispatch方法
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    // 定义commit方法
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    // strict mode
    // 定义严格模式，不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。
    // 具体后续enableStrictMode方法会提到
    this.strict = strict

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    // 这个作者的注释已经写得挺明白，就是初始化根模块，递归注册子模块，收集getter
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    // 初始化store中的state,使得state变成响应式的，原理就是将state作为一个vue实例的data属性传入,具体在分析这个函数的时候会介绍
    resetStoreVM(this, state)

    // apply plugins
    // 执行插件，这个是一个数组，所以遍历他，然后执行每个插件的函数
    plugins.concat(devtoolPlugin).forEach(plugin => plugin(this))
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">constructor</span> (<span class="hljs-params">options = {}</span>) {
    <span class="hljs-comment">// 这个是在开发过程中的一些环节判断，vuex要求在创建vuex store实例之前必须先使用这个方法Vue.use(Vuex)来安装vuex，项目必须也得支持promise，store也必须通过new来创建实例</span>
    
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      assert(Vue, <span class="hljs-string">`must call Vue.use(Vuex) before creating a store instance.`</span>)
      assert(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span>, <span class="hljs-string">`vuex requires a Promise polyfill in this browser.`</span>)
      assert(<span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> Store, <span class="hljs-string">`Store must be called with the new operator.`</span>)
    }
    
    <span class="hljs-comment">// 从参数options中结构出相关变量</span>
    <span class="hljs-keyword">const</span> {
      plugins = [],
      strict = <span class="hljs-literal">false</span>
    } = options

    <span class="hljs-keyword">let</span> {
      state = {}
    } = options
    
    <span class="hljs-comment">// 这个简单的，不解释</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> state === <span class="hljs-string">'function'</span>) {
      state = state()
    }

    <span class="hljs-comment">// store internal state</span>
    <span class="hljs-comment">// 初始化store内部状态，Object.create(null)可以创建一个干净的空对象</span>
    <span class="hljs-keyword">this</span>._committing = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">this</span>._actions = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
    <span class="hljs-keyword">this</span>._mutations = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
    <span class="hljs-keyword">this</span>._wrappedGetters = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
    <span class="hljs-comment">// vuex支持模块，即将state通过key-value的形式拆分为多个模块</span>
    <span class="hljs-comment">// 模块的具体内容可以查看这里 ：https://vuex.vuejs.org/en/mutations.html</span>
    <span class="hljs-keyword">this</span>._modules = <span class="hljs-keyword">new</span> ModuleCollection(options)
    <span class="hljs-keyword">this</span>._modulesNamespaceMap = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)
    <span class="hljs-comment">// 监听队列，当执行commit时会执行队列中的函数</span>
    <span class="hljs-keyword">this</span>._subscribers = []
    <span class="hljs-comment">// 创建一个vue实例，利用vue的watch的能力，可以监控state的改变，具体后续watch方法会介绍</span>
    <span class="hljs-keyword">this</span>._watcherVM = <span class="hljs-keyword">new</span> Vue()

    <span class="hljs-comment">// bind commit and dispatch to self</span>
    
    <span class="hljs-keyword">const</span> store = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">// 缓存dispatch和commit方法</span>
    <span class="hljs-keyword">const</span> { dispatch, commit } = <span class="hljs-keyword">this</span>
    <span class="hljs-comment">// 定义dispatch方法</span>
    <span class="hljs-keyword">this</span>.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boundDispatch</span> (<span class="hljs-params"><span class="hljs-keyword">type</span>, payload</span>) </span>{
      <span class="hljs-keyword">return</span> dispatch.call(store, <span class="hljs-keyword">type</span>, payload)
    }
    <span class="hljs-comment">// 定义commit方法</span>
    <span class="hljs-keyword">this</span>.commit = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boundCommit</span> (<span class="hljs-params"><span class="hljs-keyword">type</span>, payload, options</span>) </span>{
      <span class="hljs-keyword">return</span> commit.call(store, <span class="hljs-keyword">type</span>, payload, options)
    }

    <span class="hljs-comment">// strict mode</span>
    <span class="hljs-comment">// 定义严格模式，不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。</span>
    <span class="hljs-comment">// 具体后续enableStrictMode方法会提到</span>
    <span class="hljs-keyword">this</span>.strict = strict

    <span class="hljs-comment">// init root module.</span>
    <span class="hljs-comment">// this also recursively registers all sub-modules</span>
    <span class="hljs-comment">// and collects all module getters inside this._wrappedGetters</span>
    <span class="hljs-comment">// 这个作者的注释已经写得挺明白，就是初始化根模块，递归注册子模块，收集getter</span>
    installModule(<span class="hljs-keyword">this</span>, state, [], <span class="hljs-keyword">this</span>._modules.root)

    <span class="hljs-comment">// initialize the store vm, which is responsible for the reactivity</span>
    <span class="hljs-comment">// (also registers _wrappedGetters as computed properties)</span>
    <span class="hljs-comment">// 初始化store中的state,使得state变成响应式的，原理就是将state作为一个vue实例的data属性传入,具体在分析这个函数的时候会介绍</span>
    resetStoreVM(<span class="hljs-keyword">this</span>, state)

    <span class="hljs-comment">// apply plugins</span>
    <span class="hljs-comment">// 执行插件，这个是一个数组，所以遍历他，然后执行每个插件的函数</span>
    plugins.concat(devtoolPlugin).forEach(<span class="hljs-function"><span class="hljs-params">plugin</span> =&gt;</span> plugin(<span class="hljs-keyword">this</span>))
  }</code></pre>
<p>呼呼呼~ 至此，终于把store类全部读完了，休息五分钟，然后继续往下看哈。</p>
<p>接下来关于state的获取和设置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 获取state,  直接返回内部data的$$state
  get state () {
    return this._vm._data.$$state
  }

  set state (v) {
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `Use store.replaceState() to explicit replace store state.`)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>  // 获取<span class="hljs-keyword">state</span>,  直接返回内部data的$<span class="hljs-variable">$state</span>
  get <span class="hljs-keyword">state</span> () {
    return this._vm._data.$<span class="hljs-variable">$state</span>
  }

  <span class="hljs-built_in">set</span> <span class="hljs-keyword">state</span> (v) {
    if (process.env.NODE_ENV !== 'production') {
      assert(false, `Use store.replaceState() <span class="hljs-keyword">to</span> explicit replace store <span class="hljs-keyword">state</span>.`)
    }
  }</code></pre>
<p>commit是vuex中一个比较重要的操作，因为它可以触发mutation修改对state的修改，并且是同步执行的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="commit (_type, _payload, _options) {
    // check object-style commit
    // 首先统一传入参数的格式，主要是针对当type是个对象的情况，需要把这个对象解析出来
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)
    
    // 缓存本次commit操作的类型和负荷，以供后续监听队列（this._subscribers）使用
    const mutation = { type, payload }
    // 获取相关的type的mutation函数，我们都知道，在vuex中都是通过commit一个类型然后触发相关的mutation函数来操作state的，所以在此必须获取相关的函数
    const entry = this._mutations[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }
    // 在_withCommit中触发上面获取的mutation函数，简单粗暴使用数组的forEach执行哈哈，之所以要在外面包一层_withCommit，是表明操作的同步性
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })
    // 这个就是之前说的监听队列，在每次执行commit函数时都会遍历执行一下这个队列
    this._subscribers.forEach(sub => sub(mutation, this.state))

    if (
      process.env.NODE_ENV !== 'production' &amp;&amp;
      options &amp;&amp; options.silent
    ) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
        'Use the filter functionality in the vue-devtools'
      )
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>commit (_type, _payload, _options) {
    <span class="hljs-comment">// check object-style commit</span>
    <span class="hljs-comment">// 首先统一传入参数的格式，主要是针对当type是个对象的情况，需要把这个对象解析出来</span>
    <span class="hljs-keyword">const</span> {
      <span class="hljs-keyword">type</span>,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)
    
    <span class="hljs-comment">// 缓存本次commit操作的类型和负荷，以供后续监听队列（this._subscribers）使用</span>
    <span class="hljs-keyword">const</span> mutation = { <span class="hljs-keyword">type</span>, payload }
    <span class="hljs-comment">// 获取相关的type的mutation函数，我们都知道，在vuex中都是通过commit一个类型然后触发相关的mutation函数来操作state的，所以在此必须获取相关的函数</span>
    <span class="hljs-keyword">const</span> entry = <span class="hljs-keyword">this</span>._mutations[<span class="hljs-keyword">type</span>]
    <span class="hljs-keyword">if</span> (!entry) {
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
        <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`[vuex] unknown mutation type: <span class="hljs-subst">${type}</span>`</span>)
      }
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-comment">// 在_withCommit中触发上面获取的mutation函数，简单粗暴使用数组的forEach执行哈哈，之所以要在外面包一层_withCommit，是表明操作的同步性</span>
    <span class="hljs-keyword">this</span>._withCommit(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      entry.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">commitIterator</span> (<span class="hljs-params">handler</span>) </span>{
        handler(payload)
      })
    })
    <span class="hljs-comment">// 这个就是之前说的监听队列，在每次执行commit函数时都会遍历执行一下这个队列</span>
    <span class="hljs-keyword">this</span>._subscribers.forEach(<span class="hljs-function"><span class="hljs-params">sub</span> =&gt;</span> sub(mutation, <span class="hljs-keyword">this</span>.state))

    <span class="hljs-keyword">if</span> (
      process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp;
      options &amp;&amp; options.silent
    ) {
      <span class="hljs-built_in">console</span>.warn(
        <span class="hljs-string">`[vuex] mutation type: <span class="hljs-subst">${type}</span>. Silent option has been removed. `</span> +
        <span class="hljs-string">'Use the filter functionality in the vue-devtools'</span>
      )
    }
  }</code></pre>
<p>dispatch是跟commit有点相似的函数，但是commit必须是同步的，而dispatch是异步的，内部还是必须通过commit来操作state</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dispatch (_type, _payload) {
    // check object-style dispatch
    // 同上面commit，不解释
    const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)
    
    // 因为dispatch触发的是actions中的函数，所以这里获取actions相关函数，过程类似commit
    const entry = this._actions[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown action type: ${type}`)
      }
      return
    }
    // 因为dispatch支持异步，所以这里作者使用Promise.all来执行异步函数并且判断所有异步函数是否都已经执行完成，所以在文件最开始判断了当前环境必须支持promise就是这个原因
    return entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>dispatch (_type, _payload) {
    <span class="hljs-comment">// check object-style dispatch</span>
    <span class="hljs-comment">// 同上面commit，不解释</span>
    <span class="hljs-keyword">const</span> {
      <span class="hljs-keyword">type</span>,
      payload
    } = unifyObjectStyle(_type, _payload)
    
    <span class="hljs-comment">// 因为dispatch触发的是actions中的函数，所以这里获取actions相关函数，过程类似commit</span>
    <span class="hljs-keyword">const</span> entry = <span class="hljs-keyword">this</span>._actions[<span class="hljs-keyword">type</span>]
    <span class="hljs-keyword">if</span> (!entry) {
      <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
        <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`[vuex] unknown action type: <span class="hljs-subst">${type}</span>`</span>)
      }
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-comment">// 因为dispatch支持异步，所以这里作者使用Promise.all来执行异步函数并且判断所有异步函数是否都已经执行完成，所以在文件最开始判断了当前环境必须支持promise就是这个原因</span>
    <span class="hljs-keyword">return</span> entry.length &gt; <span class="hljs-number">1</span>
      ? <span class="hljs-built_in">Promise</span>.all(entry.map(<span class="hljs-function"><span class="hljs-params">handler</span> =&gt;</span> handler(payload)))
      : entry[<span class="hljs-number">0</span>](payload)
  }</code></pre>
<p>subscribe函数，这是pub/sub模式在vuex中的一个运用，用户可以通过subscribe函数来监听state的变化，函数返回一个取消监听的函数，便于用户在合适的时机取消订阅</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="subscribe (fn) {
    const subs = this._subscribers
    if (subs.indexOf(fn) < 0) {
      subs.push(fn)
    }
    // 返回取消订阅的函数，通过函数额splice方法，来清除函数中不需要的项
    return () => {
      const i = subs.indexOf(fn)
      if (i > -1) {
        subs.splice(i, 1)
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-keyword">subscribe </span>(<span class="hljs-meta">fn</span>) {
    const <span class="hljs-keyword">subs </span>= this._subscribers
    <span class="hljs-meta">if</span> (<span class="hljs-keyword">subs.indexOf(fn) </span>&lt; <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">subs.push(fn)
</span>    }
    // 返回取消订阅的函数，通过函数额splice方法，来清除函数中不需要的项
    return () =&gt; {
      const i = <span class="hljs-keyword">subs.indexOf(fn)
</span>      <span class="hljs-meta">if</span> (i &gt; -<span class="hljs-number">1</span>) {
        <span class="hljs-keyword">subs.splice(i, </span><span class="hljs-number">1</span>)
      }
    }
  }</code></pre>
<p>watch函数，响应式地监测一个 getter 方法的返回值，当值改变时调用回调函数，原理其实就是利用vue中的watch方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch (getter, cb, options) {
    if (process.env.NODE_ENV !== 'production') {
      assert(typeof getter === 'function', `store.watch only accepts a function.`)
    }
    // 在上面构造函数中，我们看到this._watcherVM就是一个vue的实例，所以可以利用它的watch来实现vuex的watch，原理都一样，当监听的值或者函数的返回值发送改变的时候，就触发相应的回调函数，也就是我们传入的cb参数，options则可以来让监听立即执行&amp;深度监听对象
    return this._watcherVM.$watch(() => getter(this.state, this.getters), cb, options)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>watch (getter, cb, options) {
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      assert(<span class="hljs-keyword">typeof</span> getter === <span class="hljs-string">'function'</span>, `<span class="javascript">store.watch only accepts a <span class="hljs-function"><span class="hljs-keyword">function</span>.</span></span>`)
    }
    <span class="hljs-regexp">//</span> 在上面构造函数中，我们看到<span class="hljs-keyword">this</span>._watcherVM就是一个vue的实例，所以可以利用它的watch来实现vuex的watch，原理都一样，当监听的值或者函数的返回值发送改变的时候，就触发相应的回调函数，也就是我们传入的cb参数，options则可以来让监听立即执行&amp;深度监听对象
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._watcherVM.$watch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> getter(<span class="hljs-keyword">this</span>.state, <span class="hljs-keyword">this</span>.getters), cb, options)
  }</code></pre>
<p>replaceState，根据名字就可知道，是替换当前的state</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="replaceState (state) {
    this._withCommit(() => {
      this._vm._data.$$state = state
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>replaceState (<span class="hljs-keyword">state</span>) {
    this._withCommit(() =&gt; {
      this._vm._data.$<span class="hljs-variable">$state</span> = <span class="hljs-keyword">state</span>
    })
  }</code></pre>
<p>registerModule函数，可以使用 store.registerModule 方法注册模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="registerModule (path, rawModule) {
    if (typeof path === 'string') path = [path]

    if (process.env.NODE_ENV !== 'production') {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
      assert(path.length > 0, 'cannot register the root module by using registerModule.')
    }
    //其实内部时候通过,register方法，递归寻找路径，然后将新的模块注册root模块上，具体后续介绍到module的时候会详细分析
    this._modules.register(path, rawModule)
    //安装模块，因为每个模块都有他自身的getters,actions, modules等，所以，每次注册模块都必须把这些都注册上，后续介绍installModule的时候，会详细介绍到
    installModule(this, this.state, path, this._modules.get(path))
    // reset store to update getters...
    // 重置VM
    resetStoreVM(this, this.state)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>registerModule (path, rawModule) {
    <span class="hljs-keyword">if</span> (typeof path === <span class="hljs-string">'string'</span>) path = [path]

    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
      assert(path.length &gt; <span class="hljs-number">0</span>, <span class="hljs-string">'cannot register the root module by using registerModule.'</span>)
    }
    <span class="hljs-comment">//其实内部时候通过,register方法，递归寻找路径，然后将新的模块注册root模块上，具体后续介绍到module的时候会详细分析</span>
    <span class="hljs-keyword">this</span>._modules.register(path, rawModule)
    <span class="hljs-comment">//安装模块，因为每个模块都有他自身的getters,actions, modules等，所以，每次注册模块都必须把这些都注册上，后续介绍installModule的时候，会详细介绍到</span>
    installModule(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.state, path, <span class="hljs-keyword">this</span>._modules.<span class="hljs-keyword">get</span>(path))
    <span class="hljs-comment">// reset store to update getters...</span>
    <span class="hljs-comment">// 重置VM</span>
    resetStoreVM(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.state)
  }</code></pre>
<p>unregisterModule函数，上述registerModule函数的相反操作，具体在module的时候会介绍到，在此了解个大概，先不纠结细节</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="unregisterModule (path) {
    if (typeof path === 'string') path = [path]

    if (process.env.NODE_ENV !== 'production') {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
    }

    this._modules.unregister(path)
    this._withCommit(() => {
      const parentState = getNestedState(this.state, path.slice(0, -1))
      // 利用vue.delete方法，确保模块在被删除的时候，视图能监听到变化
      Vue.delete(parentState, path[path.length - 1])
    })
    resetStore(this)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>unregisterModule (path) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> path === <span class="hljs-string">'string'</span>) path = [path]

    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      assert(Array.isArray(path), `<span class="javascript"><span class="hljs-built_in">module</span> path must be a string or an <span class="hljs-built_in">Array</span>.</span>`)
    }

    <span class="hljs-keyword">this</span>._modules.unregister(path)
    <span class="hljs-keyword">this</span>._withCommit(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      const parentState = getNestedState(<span class="hljs-keyword">this</span>.state, path.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>))
      <span class="hljs-regexp">//</span> 利用vue.<span class="hljs-keyword">delete</span>方法，确保模块在被删除的时候，视图能监听到变化
      Vue.<span class="hljs-keyword">delete</span>(parentState, path[path.length - <span class="hljs-number">1</span>])
    })
    resetStore(<span class="hljs-keyword">this</span>)
  }</code></pre>
<p>hotUpdate函数，Vuex 支持在开发过程中热重载 mutation、modules、actions、和getters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hotUpdate (newOptions) {
    this._modules.update(newOptions)
    resetStore(this, true)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>hotUpdate (<span class="hljs-keyword">new</span><span class="hljs-type">Options</span>) {
    <span class="hljs-built_in">this</span>._modules.update(<span class="hljs-keyword">new</span><span class="hljs-type">Options</span>)
    resetStore(<span class="hljs-built_in">this</span>, <span class="hljs-literal">true</span>)
  }</code></pre>
<p>_withCommit函数，从函数名可以看出这是一个内部方法，作用就是保证commit过程中执行的方法都是同步的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_withCommit (fn) {
    // 保存原来的committing的状态
    const committing = this._committing
    //将想在的committing状态设置为true
    this._committing = true
    //执行函数
    fn()
    //将committing状态设置为原来的状态
    this._committing = committing
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>_withCommit (fn) {
    <span class="hljs-comment">// 保存原来的committing的状态</span>
    const committing = <span class="hljs-keyword">this</span>._committing
    <span class="hljs-comment">//将想在的committing状态设置为true</span>
    <span class="hljs-keyword">this</span>._committing = <span class="hljs-literal">true</span>
    <span class="hljs-comment">//执行函数</span>
    fn()
    <span class="hljs-comment">//将committing状态设置为原来的状态</span>
    <span class="hljs-keyword">this</span>._committing = committing
  }</code></pre>
<p>到目前为止，我们已经看完了Store这个类的所有代码~慢慢消化，然后继续往下</p>
<p><strong>----------------------------------------------------------这又是分割线----------------------------------------------------------------------------------------</strong></p>
<p>接下来，我们分析一下，一些其他的辅助方法，跟上面store的一些内容会有相关。ready? Go</p>
<p>resetStore函数，用于重置整个vuex中的store,从代码中可以看出，这个函数主要的功能，就是将传入的store实例的_actions，_mutations，_wrappedGetters，_modulesNamespaceMap置为空，然后重新安装模块和重置VM，此方法在上述热更新和注销模块的时候会使用到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resetStore (store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  // init all modules
  installModule(store, state, [], store._modules.root, true)
  // reset vm
  resetStoreVM(store, state, hot)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function resetStore (store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const <span class="hljs-keyword">state</span> = store.<span class="hljs-keyword">state</span>
  // init <span class="hljs-literal">all</span> modules
  installModule(store, <span class="hljs-keyword">state</span>, [], store._modules.root, true)
  // reset vm
  resetStoreVM(store, <span class="hljs-keyword">state</span>, hot)
}</code></pre>
<p>resetStoreVM函数，这个用于重置store中的vm,所谓vm，指的就是视图模型，也就是常见mvvm中的vm，在此指的是将state作为data中$$state属性的一个vue实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resetStoreVM (store, state, hot) {
   // 保存原有store的_vm
  const oldVm = store._vm
    
  // bind store public getters
  store.getters = {}
  // store的_wrappedGetters缓存了当前store中所有的getter
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  //遍历这个对象，获取每个getter的key和对应的方法
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // 将getter以key-value的形式缓存在变量computed中，其实后面就是将getter作为vue实例中的计算属性
    computed[key] = () => fn(store)
    // 当用户获取getter时，相当于获取vue实例中的计算属性，使用es5的这个Object.defineProperty方法做一层代理
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  // silent设置为true，则取消了所有的警告和日志，眼不见为净
  Vue.config.silent = true
  
  // 将传入的state，作为vue实例中的data的$$state属性，将刚刚使用computed变量搜集的getter，作为实例的计算属性，所以当state和getter都变成了响应式的了
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
    
  if (store.strict) {
    //如果设置了严格模式则，不允许用户在使用mutation以外的方式去修改state
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        // 将原有的vm中的state设置为空，所以原有的getter都会重新计算一遍，利用的就是vue中的响应式，getter作为computed属性，只有他的依赖改变了，才会重新计算，而现在把state设置为null，所以计算属性重新计算
        oldVm._data.$$state = null
      })
    }
    // 在下一次周期销毁实例
    Vue.nextTick(() => oldVm.$destroy())
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function resetStoreVM (store, <span class="hljs-keyword">state</span>, hot) {
   // 保存原有store的_vm
  const oldVm = store._vm
    
  // bind store public getters
  store.getters = {}
  // store的_wrappedGetters缓存了当前store中所有的getter
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  //遍历这个对象，获取每个getter的key和对应的方法
  <span class="hljs-keyword">for</span>EachValue(wrappedGetters, (fn, key) =&gt; {
    // use computed <span class="hljs-keyword">to</span> leverage its lazy-caching mechanism
    // 将getter以key-value的形式缓存在变量computed中，其实后面就是将getter作为vue实例中的计算属性
    computed[key] = () =&gt; fn(store)
    // 当用户获取getter时，相当于获取vue实例中的计算属性，使用es5的这个Object.defineProperty方法做一层代理
    Object.defineProperty(store.getters, key, {
      get: () =&gt; store._vm[key],
      enumerable: true // <span class="hljs-keyword">for</span> local getters
    })
  })

  // use a Vue instance <span class="hljs-keyword">to</span> store the <span class="hljs-keyword">state</span> tree
  // suppress warnings just <span class="hljs-keyword">in</span> case the <span class="hljs-keyword">user</span> has added
  // some funky <span class="hljs-keyword">global</span> mixins
  const silent = Vue.config.silent
  // silent设置为true，则取消了所有的警告和日志，眼不见为净
  Vue.config.silent = true
  
  // 将传入的<span class="hljs-keyword">state</span>，作为vue实例中的data的$<span class="hljs-variable">$state</span>属性，将刚刚使用computed变量搜集的getter，作为实例的计算属性，所以当<span class="hljs-keyword">state</span>和getter都变成了响应式的了
  store._vm = new Vue({
    data: {
      $<span class="hljs-variable">$state</span>: <span class="hljs-keyword">state</span>
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode <span class="hljs-keyword">for</span> new vm
    
  if (store.strict) {
    //如果设置了严格模式则，不允许用户在使用mutation以外的方式去修改<span class="hljs-keyword">state</span>
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes <span class="hljs-keyword">in</span> <span class="hljs-literal">all</span> subscribed watchers
      // <span class="hljs-keyword">to</span> force getter re-evaluation <span class="hljs-keyword">for</span> hot reloading.
      store._withCommit(() =&gt; {
        // 将原有的vm中的<span class="hljs-keyword">state</span>设置为空，所以原有的getter都会重新计算一遍，利用的就是vue中的响应式，getter作为computed属性，只有他的依赖改变了，才会重新计算，而现在把<span class="hljs-keyword">state</span>设置为null，所以计算属性重新计算
        oldVm._data.$<span class="hljs-variable">$state</span> = null
      })
    }
    // 在下一次周期销毁实例
    Vue.nextTick(() =&gt; oldVm.<span class="hljs-variable">$destroy</span>())
  }
}</code></pre>
<p>installModule函数，用于安装模块，注册相应的mutation,action,getter和子模块等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function installModule (store, rootState, path, module, hot) {
   //判断是否为根模块
  const isRoot = !path.length
   //根据路径生成相应的命名空间
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  if (!isRoot &amp;&amp; !hot) {
    // 将模块的state设置为响应式
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      Vue.set(parentState, moduleName, module.state)
    })
  }
  //设置本地上下文，主要是针对模块的命名空间，对dispatch,commit,getters和state进行修改，后面讲到makeLocalContext的时候会详细分析，现在只需要知道，这个操作让用户能够直接获取到对象子模块下的对象就可以了
  const local = module.context = makeLocalContext(store, namespace, path)
 
  //将mutation注册到模块上
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })
  //将action注册到模块上  
  module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local)
  })
  //将getter注册到模块上
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })
  //递归安装子模块  
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">installModule</span> (<span class="hljs-params">store, rootState, path, <span class="hljs-built_in">module</span>, hot</span>) </span>{
   <span class="hljs-comment">//判断是否为根模块</span>
  <span class="hljs-keyword">const</span> isRoot = !path.length
   <span class="hljs-comment">//根据路径生成相应的命名空间</span>
  <span class="hljs-keyword">const</span> <span class="hljs-keyword">namespace</span> = store._modules.getNamespace(path)

  <span class="hljs-comment">// register in namespace map</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">module</span>.namespaced) {
    store._modulesNamespaceMap[<span class="hljs-keyword">namespace</span>] = <span class="hljs-keyword">module</span>
  }

  // set state
  if (!isRoot &amp;&amp; !hot) {
    <span class="hljs-comment">// 将模块的state设置为响应式</span>
    <span class="hljs-keyword">const</span> parentState = getNestedState(rootState, path.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>))
    <span class="hljs-keyword">const</span> moduleName = path[path.length - <span class="hljs-number">1</span>]
    store._withCommit(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      Vue.set(parentState, moduleName, <span class="hljs-built_in">module</span>.state)
    })
  }
  <span class="hljs-comment">//设置本地上下文，主要是针对模块的命名空间，对dispatch,commit,getters和state进行修改，后面讲到makeLocalContext的时候会详细分析，现在只需要知道，这个操作让用户能够直接获取到对象子模块下的对象就可以了</span>
  <span class="hljs-keyword">const</span> local = <span class="hljs-built_in">module</span>.context = makeLocalContext(store, <span class="hljs-keyword">namespace</span>, path)
 
  <span class="hljs-comment">//将mutation注册到模块上</span>
  <span class="hljs-built_in">module</span>.forEachMutation(<span class="hljs-function">(<span class="hljs-params">mutation, key</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> namespacedType = <span class="hljs-keyword">namespace</span> + key
    registerMutation(store, namespacedType, mutation, local)
  })
  <span class="hljs-comment">//将action注册到模块上  </span>
  <span class="hljs-built_in">module</span>.forEachAction(<span class="hljs-function">(<span class="hljs-params">action, key</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> namespacedType = <span class="hljs-keyword">namespace</span> + key
    registerAction(store, namespacedType, action, local)
  })
  <span class="hljs-comment">//将getter注册到模块上</span>
  <span class="hljs-built_in">module</span>.forEachGetter(<span class="hljs-function">(<span class="hljs-params">getter, key</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> namespacedType = <span class="hljs-keyword">namespace</span> + key
    registerGetter(store, namespacedType, getter, local)
  })
  <span class="hljs-comment">//递归安装子模块  </span>
  <span class="hljs-built_in">module</span>.forEachChild(<span class="hljs-function">(<span class="hljs-params">child, key</span>) =&gt;</span> {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}</code></pre>
<p>makeLocalContext函数，就是installModule中设置本地上下文的具体实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeLocalContext (store, namespace, path) {
   //如果没有命名空间，则是使用全局store上的属性，否则对store上的属性进行本地化处理
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      //dispatch的本地化处理，就是修改type
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
         //在type前面加上命名空间
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' &amp;&amp; !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }
        //调用store上的dispatch方法
      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
    // commit的本地化修改跟dispatch相似，也是只是修改了type，然后调用store上面的commit
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (process.env.NODE_ENV !== 'production' &amp;&amp; !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
   //gettters和state的修改，则依赖于makeLocalGetters函数和getNestedState函数，后面会分析
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeLocalContext</span> (<span class="hljs-params">store, <span class="hljs-keyword">namespace</span>, path</span>) </span>{
   <span class="hljs-comment">//如果没有命名空间，则是使用全局store上的属性，否则对store上的属性进行本地化处理</span>
  <span class="hljs-keyword">const</span> noNamespace = <span class="hljs-keyword">namespace</span> === <span class="hljs-string">''</span>

  <span class="hljs-keyword">const</span> local = {
    dispatch: noNamespace ? store.dispatch : <span class="hljs-function">(<span class="hljs-params">_type, _payload, _options</span>) =&gt;</span> {
      <span class="hljs-comment">//dispatch的本地化处理，就是修改type</span>
      <span class="hljs-keyword">const</span> args = unifyObjectStyle(_type, _payload, _options)
      <span class="hljs-keyword">const</span> { payload, options } = args
      <span class="hljs-keyword">let</span> { <span class="hljs-keyword">type</span> } = args

      <span class="hljs-keyword">if</span> (!options || !options.root) {
         <span class="hljs-comment">//在type前面加上命名空间</span>
        <span class="hljs-keyword">type</span> = <span class="hljs-keyword">namespace</span> + <span class="hljs-keyword">type</span>
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; !store._actions[<span class="hljs-keyword">type</span>]) {
          <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`[vuex] unknown local action type: <span class="hljs-subst">${args.type}</span>, global type: <span class="hljs-subst">${type}</span>`</span>)
          <span class="hljs-keyword">return</span>
        }
      }
        <span class="hljs-comment">//调用store上的dispatch方法</span>
      <span class="hljs-keyword">return</span> store.dispatch(<span class="hljs-keyword">type</span>, payload)
    },

    commit: noNamespace ? store.commit : <span class="hljs-function">(<span class="hljs-params">_type, _payload, _options</span>) =&gt;</span> {
    <span class="hljs-comment">// commit的本地化修改跟dispatch相似，也是只是修改了type，然后调用store上面的commit</span>
      <span class="hljs-keyword">const</span> args = unifyObjectStyle(_type, _payload, _options)
      <span class="hljs-keyword">const</span> { payload, options } = args
      <span class="hljs-keyword">let</span> { <span class="hljs-keyword">type</span> } = args

      <span class="hljs-keyword">if</span> (!options || !options.root) {
        <span class="hljs-keyword">type</span> = <span class="hljs-keyword">namespace</span> + <span class="hljs-keyword">type</span>
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; !store._mutations[<span class="hljs-keyword">type</span>]) {
          <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`[vuex] unknown local mutation type: <span class="hljs-subst">${args.type}</span>, global type: <span class="hljs-subst">${type}</span>`</span>)
          <span class="hljs-keyword">return</span>
        }
      }

      store.commit(<span class="hljs-keyword">type</span>, payload, options)
    }
  }

  <span class="hljs-comment">// getters and state object must be gotten lazily</span>
  <span class="hljs-comment">// because they will be changed by vm update</span>
   <span class="hljs-comment">//gettters和state的修改，则依赖于makeLocalGetters函数和getNestedState函数，后面会分析</span>
  <span class="hljs-built_in">Object</span>.defineProperties(local, {
    getters: {
      <span class="hljs-keyword">get</span>: noNamespace
        ? <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> store.getters
        : <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> makeLocalGetters(store, <span class="hljs-keyword">namespace</span>)
    },
    state: {
      <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> getNestedState(store.state, path)
    }
  })

  <span class="hljs-keyword">return</span> local
}</code></pre>
<p>makeLocalGetters函数，则是对getter进行本地化处理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeLocalGetters (store, namespace) {
  const gettersProxy = {}

  const splitPos = namespace.length
  Object.keys(store.getters).forEach(type => {
    //这里获取的每个type都是一个有命名空间+本地type的字符串，例如: type的值可能为 “m1/m2/”+&quot;typeName&quot;
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) return

    // extract local getter type
    const localType = type.slice(splitPos)

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    //相当于做了一层代理，将子模块的localType映射到store上的type
    Object.defineProperty(gettersProxy, localType, {
      get: () => store.getters[type],
      enumerable: true
    })
  })

  return gettersProxy
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeLocalGetters</span> (<span class="hljs-params">store, <span class="hljs-keyword">namespace</span></span>) </span>{
  <span class="hljs-keyword">const</span> gettersProxy = {}

  <span class="hljs-keyword">const</span> splitPos = <span class="hljs-keyword">namespace</span>.length
  <span class="hljs-built_in">Object</span>.keys(store.getters).forEach(<span class="hljs-function"><span class="hljs-params">type</span> =&gt;</span> {
    <span class="hljs-comment">//这里获取的每个type都是一个有命名空间+本地type的字符串，例如: type的值可能为 “m1/m2/”+"typeName"</span>
    <span class="hljs-comment">// skip if the target getter is not match this namespace</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">type</span>.slice(<span class="hljs-number">0</span>, splitPos) !== <span class="hljs-keyword">namespace</span>) <span class="hljs-keyword">return</span>

    <span class="hljs-comment">// extract local getter type</span>
    <span class="hljs-keyword">const</span> localType = <span class="hljs-keyword">type</span>.slice(splitPos)

    <span class="hljs-comment">// Add a port to the getters proxy.</span>
    <span class="hljs-comment">// Define as getter property because</span>
    <span class="hljs-comment">// we do not want to evaluate the getters in this time.</span>
    <span class="hljs-comment">//相当于做了一层代理，将子模块的localType映射到store上的type</span>
    <span class="hljs-built_in">Object</span>.defineProperty(gettersProxy, localType, {
      <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> store.getters[<span class="hljs-keyword">type</span>],
      enumerable: <span class="hljs-literal">true</span>
    })
  })

  <span class="hljs-keyword">return</span> gettersProxy
}</code></pre>
<p>registerMutation函数,就是注册mutation的过程，将相应type的mutation推到store._mutations[type]的队列中，当commit这个type的时候就触发执行队列中的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-function"><span class="hljs-keyword">function</span></span> registerMutation (store, <span class="hljs-keyword">type</span>, handler, local) {
  const <span class="hljs-built_in">entry</span> = store._mutations[<span class="hljs-keyword">type</span>] || (store._mutations[<span class="hljs-keyword">type</span>] = [])
  <span class="hljs-built_in">entry</span>.push(<span class="hljs-function"><span class="hljs-keyword">function</span></span> wrappedMutationHandler (payload) {
    handler(local.state, payload)
  })
}</code></pre>
<p>registerAction函数，注册action的过程，原理类似于registerMutation，不同点在于action支持异步，所以必须用promise进行包装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload, cb) {
    let res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerAction</span> <span class="hljs-params">(store, type, handler, local)</span> {</span>
  const entry = store._actions[<span class="hljs-built_in">type</span>] || (store._actions[<span class="hljs-built_in">type</span>] = [])
  entry.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrappedActionHandler</span> <span class="hljs-params">(payload, cb)</span> {</span>
    <span class="hljs-keyword">let</span> <span class="hljs-keyword">res</span> = handler({
      dispatch: local.dispatch,
      commi<span class="hljs-variable">t:</span> local.commit,
      getter<span class="hljs-variable">s:</span> local.getters,
      state: local.state,
      rootGetter<span class="hljs-variable">s:</span> store.getters,
      rootState: store.state
    }, payload, <span class="hljs-keyword">cb</span>)
    <span class="hljs-keyword">if</span> (!isPromise(<span class="hljs-keyword">res</span>)) {
      <span class="hljs-keyword">res</span> = Promise.<span class="hljs-built_in">resolve</span>(<span class="hljs-keyword">res</span>)
    }
    <span class="hljs-keyword">if</span> (store._devtoolHook) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">res</span>.<span class="hljs-keyword">catch</span>(err =&gt; {
        store._devtoolHook.emit(<span class="hljs-string">'vuex:error'</span>, err)
        <span class="hljs-keyword">throw</span> err
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">res</span>
    }
  })
}</code></pre>
<p>registerGetters函数,根据type，将getter方法挂载在store._wrappedGetters[type]下面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    // 为子模块的getter提供了这个四个参数，方便用户获取，如果是根模块，则local跟store取出来的state和getters相同
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[vuex] duplicate getter key: ${type}`)
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    // 为子模块的getter提供了这个四个参数，方便用户获取，如果是根模块，则local跟store取出来的<span class="hljs-keyword">state</span>和getters相同
    return rawGetter(
      local.<span class="hljs-keyword">state</span>, // local <span class="hljs-keyword">state</span>
      local.getters, // local getters
      store.<span class="hljs-keyword">state</span>, // root <span class="hljs-keyword">state</span>
      store.getters // root getters
    )
  }
}</code></pre>
<p>enableStrictMode函数则是在严格模式下，不允许state被除mutation之外的其他操作修改，代码比较简单，利用vue的$watch方法实现的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, () => {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, `Do not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: true, sync: true })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enableStrictMode</span> <span class="hljs-params">(store)</span> </span>{
  store._vm.$watch(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{ <span class="hljs-keyword">return</span> this._data.$$state }, () =&gt; {
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      assert(store._committing, `<span class="hljs-keyword">Do</span> not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: <span class="hljs-keyword">true</span>, sync: <span class="hljs-keyword">true</span> })
}</code></pre>
<p>getNestedState函数，获取对应路径下的state</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getNestedState (state, path) {
  return path.length
    ? path.reduce((state, key) => state[key], state)
    : state
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>function getNestedState (<span class="hljs-keyword">state</span>, path) {
  return path.length
    ? path.reduce((<span class="hljs-keyword">state</span>, key) =&gt; <span class="hljs-keyword">state</span>[key], <span class="hljs-keyword">state</span>)
    : <span class="hljs-keyword">state</span>
}</code></pre>
<p>unifyObjectStyle函数，作用是调整参数，主要是当type是一个对象的时候，对参数进行调整</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unifyObjectStyle (type, payload, options) {
  if (isObject(type) &amp;&amp; type.type) {
    options = payload
    payload = type
    type = type.type
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', `Expects string as the type, but found ${typeof type}.`)
  }

  return { type, payload, options }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">unifyObjectStyle</span> (type, payload, options) {
  if (<span class="hljs-keyword">is</span>Object(<span class="hljs-keyword">type</span>) &amp;&amp; <span class="hljs-keyword">type</span>.<span class="hljs-keyword">type</span>) {
    options = payload
    payload = <span class="hljs-keyword">type</span>
    <span class="hljs-type"><span class="hljs-keyword">type</span> </span>= <span class="hljs-keyword">type</span>.<span class="hljs-keyword">type</span>
  <span class="hljs-type">}

  </span><span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-symbol">'production</span>') {
    assert(typeof <span class="hljs-keyword">type</span> <span class="hljs-type">=== </span><span class="hljs-symbol">'string</span>', `Expects string as the <span class="hljs-keyword">type</span>, but found ${typeof <span class="hljs-keyword">type</span>}.`)
  }

  <span class="hljs-keyword">return</span> { <span class="hljs-keyword">type</span>, payload, options }
}</code></pre>
<p>以上是相关辅助函数的全部内容，你看明白了么~</p>
<p><strong>----------------------------------------------------------这依然是分割线------------------------------------------------------------------------------------</strong></p>
<p>文件的最后，就是定义了install函数，然后自动执行了这个函数，让vuex能够在项目中运作起来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function install (_Vue) {
  if (Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  //在vue的生命周期中初始化vuex，具体实现后面讲到mixin.js这个文件时会说明
  applyMixin(Vue)
}

// auto install in dist mode
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  install(window.Vue)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span> (<span class="hljs-params">_Vue</span>) </span>{
  <span class="hljs-keyword">if</span> (Vue) {
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      <span class="hljs-built_in">console</span>.error(
        <span class="hljs-string">'[vuex] already installed. Vue.use(Vuex) should be called only once.'</span>
      )
    }
    <span class="hljs-keyword">return</span>
  }
  Vue = _Vue
  <span class="hljs-comment">//在vue的生命周期中初始化vuex，具体实现后面讲到mixin.js这个文件时会说明</span>
  applyMixin(Vue)
}

<span class="hljs-comment">// auto install in dist mode</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  install(<span class="hljs-built_in">window</span>.Vue)
}</code></pre>
<p>以上就是store.js的所有内容啦~</p>
<p><strong>----------------------------------------------------------严肃分割线------------------------------------------------------------------------------------</strong></p>
<p>接下来讲解有关module目录下的内容，该目录有两个文件分别是module-collection.js和module.js，这两个文件主要是有关于vuex中模块的内容；<br>首先我们看看module-collection.js,这个文件主要导出一个ModuleCollection类:<br>构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    //主要是注册根模块，我们在之前store的构造函数中曾经使用到 this._modules = new ModuleCollection(options)，注册一个根模块然后缓存在this._module中
    this.register([], rawRootModule, false)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span> <span class="hljs-params">(rawRootModule)</span> <span class="hljs-comment">{
    // register root module (Vuex.Store options)
    //主要是注册根模块，我们在之前store的构造函数中曾经使用到 this._modules = new ModuleCollection(options)，注册一个根模块然后缓存在this._module中
    this.register([], rawRootModule, false)
  }</span></span></code></pre>
<p>紧接着看看下面register函数，它用于注册模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="register (path, rawModule, runtime = true) {
    if (process.env.NODE_ENV !== 'production') {
      assertRawModule(path, rawModule)
    }
    // 创建一个新模块，具体会在后面讲到Module的时候分析
    const newModule = new Module(rawModule, runtime)
    // 判读是否为根模块
    if (path.length === 0) {
      this.root = newModule
    } else {
      //根据path路径，利用get方法获取父模块  
      const parent = this.get(path.slice(0, -1))
      //为父模块添加子模块
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    // 如果当前模块里面有子模块，则递归的去注册子模块
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>register (path, rawModule, runtime = <span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
      assertRawModule(path, rawModule)
    }
    <span class="hljs-comment">// 创建一个新模块，具体会在后面讲到Module的时候分析</span>
    const <span class="hljs-keyword">new</span><span class="hljs-type">Module</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">Module</span>(rawModule, runtime)
    <span class="hljs-comment">// 判读是否为根模块</span>
    <span class="hljs-keyword">if</span> (path.length === <span class="hljs-number">0</span>) {
      <span class="hljs-built_in">this</span>.root = <span class="hljs-keyword">new</span><span class="hljs-type">Module</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">//根据path路径，利用get方法获取父模块  </span>
      const parent = <span class="hljs-built_in">this</span>.<span class="hljs-keyword">get</span>(path.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>))
      <span class="hljs-comment">//为父模块添加子模块</span>
      parent.addChild(path[path.length - <span class="hljs-number">1</span>], <span class="hljs-keyword">new</span><span class="hljs-type">Module</span>)
    }

    <span class="hljs-comment">// register nested modules</span>
    <span class="hljs-comment">// 如果当前模块里面有子模块，则递归的去注册子模块</span>
    <span class="hljs-keyword">if</span> (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) =&gt; {
        <span class="hljs-built_in">this</span>.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }</code></pre>
<p>相反，unregister函数则是移除一个模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="unregister (path) {
    // 通过get方法获取父模块
    const parent = this.get(path.slice(0, -1))
    //获取需要删除的模块的名称，即他的key
    const key = path[path.length - 1]
    if (!parent.getChild(key).runtime) return
    //利用module中removeChild方法删除该模块，其实就是delete了对象上的一个key
    parent.removeChild(key)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>unregister (path) {
    <span class="hljs-comment">// 通过get方法获取父模块</span>
    <span class="hljs-keyword">const</span> parent = <span class="hljs-keyword">this</span>.<span class="hljs-built_in">get</span>(path.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>))
    <span class="hljs-comment">//获取需要删除的模块的名称，即他的key</span>
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> = path[path.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">if</span> (!parent.getChild(<span class="hljs-built_in">key</span>).runtime) <span class="hljs-keyword">return</span>
    <span class="hljs-comment">//利用module中removeChild方法删除该模块，其实就是delete了对象上的一个key</span>
    parent.removeChild(<span class="hljs-built_in">key</span>)
  }</code></pre>
<p>get函数，其实就是利用es5中数组reduce方法，从根模块开始根据传入的path来获取相应的子模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get (path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>get (path) {
    <span class="hljs-keyword">return</span> path.reduce(<span class="hljs-function"><span class="hljs-params">(<span class="hljs-built_in">module</span>, key)</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>.getChild(key)
    }, <span class="hljs-keyword">this</span>.root)
  }</code></pre>
<p>getNamespace函数，利用传入的参数path，生成相应的命名空间，实现的原理跟上述的get方法类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getNamespace (path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>getNamespace (path) {
    let <span class="hljs-built_in">module</span> = <span class="hljs-keyword">this</span>.root
    <span class="hljs-keyword">return</span> path.reduce(<span class="hljs-function"><span class="hljs-params">(namespace, key)</span> =&gt;</span> {
      <span class="hljs-built_in">module</span> = <span class="hljs-built_in">module</span>.getChild(key)
      <span class="hljs-keyword">return</span> namespace + (<span class="hljs-built_in">module</span>.namespaced ? key + <span class="hljs-string">'/'</span> : <span class="hljs-string">''</span>)
    }, <span class="hljs-string">''</span>)
  }</code></pre>
<p>upate方法，就是更新模块，具体看下面update方法的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update (rawRootModule) {
    update([], this.root, rawRootModule)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code><span class="hljs-function"><span class="hljs-title">update</span> <span class="hljs-params">(rawRootModule)</span> {
    <span class="hljs-title">update</span><span class="hljs-params">([], this.root, rawRootModule)</span>
  }</span></code></pre>
<p>以上就是整个ModuleCollection类的实现</p>
<p>接下来讲解一下function update的实现</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule)
  }

  // update target module
  //目标模块更新为新模块，具体实现是将原有模块的namespaced，actions，mutations，getters替换为新模块的namespaced，actions，mutations，getters
  // 具体会在Module类中update方法讲解
  targetModule.update(newModule)

  // update nested modules
  // 如果新的模块有子模块，则递归更新子模块
  if (newModule.modules) {
    for (const key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `[vuex] trying to add a new module '${key}' on hot reloading, ` +
            'manual reload is needed'
          )
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      )
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">update</span> </span>(path, targetModule, <span class="hljs-keyword">new</span><span class="hljs-type">Module</span>) {
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
    assertRawModule(path, <span class="hljs-keyword">new</span><span class="hljs-type">Module</span>)
  }

  <span class="hljs-comment">// update target module</span>
  <span class="hljs-comment">//目标模块更新为新模块，具体实现是将原有模块的namespaced，actions，mutations，getters替换为新模块的namespaced，actions，mutations，getters</span>
  <span class="hljs-comment">// 具体会在Module类中update方法讲解</span>
  targetModule.update(<span class="hljs-keyword">new</span><span class="hljs-type">Module</span>)

  <span class="hljs-comment">// update nested modules</span>
  <span class="hljs-comment">// 如果新的模块有子模块，则递归更新子模块</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">new</span><span class="hljs-type">Module</span>.modules) {
    <span class="hljs-keyword">for</span> (const key <span class="hljs-keyword">in</span> <span class="hljs-keyword">new</span><span class="hljs-type">Module</span>.modules) {
      <span class="hljs-keyword">if</span> (!targetModule.getChild(key)) {
        <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span>) {
          console.warn(
            `[vuex] trying to add a <span class="hljs-keyword">new</span> <span class="hljs-type">module</span> <span class="hljs-string">'<span class="hljs-subst">${key}</span>'</span> on hot reloading, ` +
            <span class="hljs-string">'manual reload is needed'</span>
          )
        }
        <span class="hljs-keyword">return</span>
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        <span class="hljs-keyword">new</span><span class="hljs-type">Module</span>.modules[key]
      )
    }
  }
}</code></pre>
<p>至于assertRawModule方法和makeAssertionMessage方法，就是一些简单的校验和提示，不影响主流程&amp;代码比较简单，这里不做赘述</p>
<p>以上就是整个module-collection.js文件的所有内容</p>
<p>接下来就应该分析目录中的另一个文件module.js，这个文件主要导出一个Module类，这个类主要描述了vuex中模块的功能</p>
<p>构造函数，主要做了一些模块初始化的事情</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//构造函数，主要做了一些模块初始化的事情
  constructor (rawModule, runtime) {
    //缓存运行时的标志
    this.runtime = runtime
    //创建一个空对象来保存子模块
    this._children = Object.create(null)
    //缓存传入的模块
    this._rawModule = rawModule
    //缓存传入模块的state，如果state是一个函数，则执行这个函数
    const rawState = rawModule.state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>//构造函数，主要做了一些模块初始化的事情
  constructor (rawModule, runtime) {
    //缓存运行时的标志
    this.runtime = runtime
    //创建一个空对象来保存子模块
    this._children = Object.create(null)
    //缓存传入的模块
    this._rawModule = rawModule
    //缓存传入模块的<span class="hljs-keyword">state</span>，如果<span class="hljs-keyword">state</span>是一个函数，则执行这个函数
    const rawState = rawModule.<span class="hljs-keyword">state</span>
    this.<span class="hljs-keyword">state</span> = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }</code></pre>
<p>namespaced函数是主要就是获取当前模块是否是命名模块，vuex支持命名模块和匿名模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get namespaced () {
    return !!this._rawModule.namespaced
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">get</span> namespaced () {
    <span class="hljs-keyword">return</span> !!<span class="hljs-keyword">this</span>._rawModule.namespaced
  }</code></pre>
<p>addChild,removeChild,getChild这三个函数就分别是添加，删除，获取子模块，内容比较简单，不赘述</p>
<p>update方法，将原有缓存模块的namespaced，actions，mutations，getters替换成新传入模块的namespaced，actions，mutations，getters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update (rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>update (rawModule) {
    this._rawModule<span class="hljs-selector-class">.namespaced</span> = rawModule<span class="hljs-selector-class">.namespaced</span>
    <span class="hljs-keyword">if</span> (rawModule.actions) {
      this._rawModule<span class="hljs-selector-class">.actions</span> = rawModule<span class="hljs-selector-class">.actions</span>
    }
    <span class="hljs-keyword">if</span> (rawModule.mutations) {
      this._rawModule<span class="hljs-selector-class">.mutations</span> = rawModule<span class="hljs-selector-class">.mutations</span>
    }
    <span class="hljs-keyword">if</span> (rawModule.getters) {
      this._rawModule<span class="hljs-selector-class">.getters</span> = rawModule<span class="hljs-selector-class">.getters</span>
    }
  }</code></pre>
<p>forEachChild函数，利用util中forEachValue方法，变量每个子模块，将每个子模块作为传入的回调函数参数，然后执行回调函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="forEachChild (fn) {
    forEachValue(this._children, fn)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code>forEachChild (<span class="hljs-function"><span class="hljs-keyword">fn</span>) {
    <span class="hljs-title">forEachValue</span></span>(this._children, <span class="hljs-function"><span class="hljs-keyword">fn</span>)
  }</span></code></pre>
<p>forEachGetter，forEachAction，forEachMutation代码逻辑跟上述forEachChild十分类似，不在赘述</p>
<p>以上就是module.js文件的所有内容，至此我们也已经全部分析完module目录下的所有代码了</p>
<p><strong>---------------------------------------------------一本正经分割线--------------------------------------------------------------------------------</strong><br>接下来，我们再看看help.js这个文件，这个文件主要是提供了一些帮助性的方法，使得用户在使用vuex的过程中体验更好，更加方便</p>
<p>首先我们先看看文件后面三个函数：normalizeMap，normalizeNamespace，getModuleByNamespace</p>
<p>normalizeMap函数，这个方法的作用是格式化传入的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function normalizeMap (map) {
  // 如果传入的对象是数组，则放回一个每一项都是key-val对象的数组，其中key和val的值相同
  // 如果出入的是一个对象,则变量这个对象，放回一个每一项都是key-val数组，其中key对应对象的key,val对应相应key的值
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>function normalizeMap (<span class="hljs-built_in">map</span>) {
  // 如果传入的对象是数组，则放回一个每一项都是<span class="hljs-built_in">key</span>-val对象的数组，其中<span class="hljs-built_in">key</span>和val的值相同
  // 如果出入的是一个对象,则变量这个对象，放回一个每一项都是<span class="hljs-built_in">key</span>-val数组，其中<span class="hljs-built_in">key</span>对应对象的<span class="hljs-built_in">key</span>,val对应相应<span class="hljs-built_in">key</span>的值
  <span class="hljs-built_in">return</span> Array.isArray(<span class="hljs-built_in">map</span>)
    ? <span class="hljs-built_in">map</span>.<span class="hljs-built_in">map</span>(<span class="hljs-built_in">key</span> =&gt; ({ <span class="hljs-built_in">key</span>, val: <span class="hljs-built_in">key</span> }))
    : Object.keys(<span class="hljs-built_in">map</span>).<span class="hljs-built_in">map</span>(<span class="hljs-built_in">key</span> =&gt; ({ <span class="hljs-built_in">key</span>, val: <span class="hljs-built_in">map</span>[<span class="hljs-built_in">key</span>] }))
}</code></pre>
<p>normalizeNamespace函数，调整参数，格式化命名空间</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function normalizeNamespace (fn) {
  return (namespace, map) => {
    //如果没传入命名空间，或者传入的命名空间不是一个字符串，则丢弃该参数
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      //否则判断命名空间后面是否有加上‘/’，如果没有则加上
      namespace += '/'
    }
    //最后执行传入的回调函数
    return fn(namespace, map)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">normalizeNamespace</span> (<span class="hljs-params">fn</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">namespace</span>, map</span>) =&gt;</span> {
    <span class="hljs-comment">//如果没传入命名空间，或者传入的命名空间不是一个字符串，则丢弃该参数</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">namespace</span> !== <span class="hljs-string">'string'</span>) {
      map = <span class="hljs-keyword">namespace</span>
      <span class="hljs-keyword">namespace</span> = <span class="hljs-string">''</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">namespace</span>.charAt(<span class="hljs-keyword">namespace</span>.length - <span class="hljs-number">1</span>) !== <span class="hljs-string">'/'</span>) {
      <span class="hljs-comment">//否则判断命名空间后面是否有加上‘/’，如果没有则加上</span>
      <span class="hljs-keyword">namespace</span> += <span class="hljs-string">'/'</span>
    }
    <span class="hljs-comment">//最后执行传入的回调函数</span>
    <span class="hljs-keyword">return</span> fn(<span class="hljs-keyword">namespace</span>, map)
  }
}</code></pre>
<p>getModuleByNamespace函数，通过命名空间来获取模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getModuleByNamespace (store, helper, namespace) {
  // 返回store._modulesNamespaceMap缓存的模块
  const module = store._modulesNamespaceMap[namespace]
  if (process.env.NODE_ENV !== 'production' &amp;&amp; !module) {
    console.error(`[vuex] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getModuleByNamespace</span> (<span class="hljs-params">store, helper, namespace</span>) </span>{
  <span class="hljs-comment">// 返回store._modulesNamespaceMap缓存的模块</span>
  <span class="hljs-keyword">const</span> <span class="hljs-built_in">module</span> = store._modulesNamespaceMap[namespace]
  <span class="hljs-keyword">if</span> (process.env.NODE_ENV !== <span class="hljs-string">'production'</span> &amp;&amp; !<span class="hljs-built_in">module</span>) {
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">`[vuex] module namespace not found in <span class="hljs-subst">${helper}</span>(): <span class="hljs-subst">${namespace}</span>`</span>)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">module</span>
}</code></pre>
<p>mapState函数，我们可以通过这个方法将state解构到vue项目中去，使其变成vue实例中的计算属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const mapState = normalizeNamespace((namespace, states) => {
  //定义一个空对象
  const res = {}
  normalizeMap(states).forEach(({ key, val }) => {
    //收集states的所有key,对应key的值，改变成一个mappedState方法，符合计算属性的特点
    res[key] = function mappedState () {
      //获取store的state和getters
      let state = this.$store.state
      let getters = this.$store.getters
      //如果存在命名空间，则将命名空间下子模块的state和getters覆盖原来store的state和getters
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)
        if (!module) {
          return
        }
        state = module.context.state
        getters = module.context.getters
      }
      //如果对应的val是函数则执行，否则返回state下的值
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  //返回这个包装过state的对象，这个对象可以结构成vue中的计算属性
  return res
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export const mapState = normalizeNamespace((namespace, states) =&gt; {
  //定义一个空对象
  const res = {}
  normalizeMap(states).<span class="hljs-keyword">for</span>Each(({ key, val }) =&gt; {
    //收集states的所有key,对应key的值，改变成一个mappedState方法，符合计算属性的特点
    res[key] = function mappedState () {
      //获取store的<span class="hljs-keyword">state</span>和getters
      let <span class="hljs-keyword">state</span> = this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>
      let getters = this.<span class="hljs-variable">$store</span>.getters
      //如果存在命名空间，则将命名空间下子模块的<span class="hljs-keyword">state</span>和getters覆盖原来store的<span class="hljs-keyword">state</span>和getters
      if (namespace) {
        const module = getModuleByNamespace(this.<span class="hljs-variable">$store</span>, 'mapState', namespace)
        if (!module) {
          return
        }
        <span class="hljs-keyword">state</span> = module.context.<span class="hljs-keyword">state</span>
        getters = module.context.getters
      }
      //如果对应的val是函数则执行，否则返回<span class="hljs-keyword">state</span>下的值
      return typeof val === 'function'
        ? val.call(this, <span class="hljs-keyword">state</span>, getters)
        : <span class="hljs-keyword">state</span>[val]
    }
    // mark vuex getter <span class="hljs-keyword">for</span> devtools
    res[key].vuex = true
  })
  //返回这个包装过<span class="hljs-keyword">state</span>的对象，这个对象可以结构成vue中的计算属性
  return res
})</code></pre>
<p>mapMutations函数，则是将mutation解构到vue实例中的methods中，使得用户可以直接调用methods中的方法来执行store.commit</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const mapMutations = normalizeNamespace((namespace, mutations) => {
  //定义一个空对象
  const res = {}
  normalizeMap(mutations).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedMutation (...args) {
      if (namespace &amp;&amp; !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      //调用了store中的commit方法，触发相应的mutation函数的执行
      return this.$store.commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>export <span class="hljs-keyword">const</span> mapMutations = normalizeNamespace((<span class="hljs-keyword">namespace</span>, mutations) =&gt; {
  <span class="hljs-comment">//定义一个空对象</span>
  <span class="hljs-keyword">const</span> res = {}
  normalizeMap(mutations).forEach(({ key, val }) =&gt; {
    val = <span class="hljs-keyword">namespace</span> + val
    res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedMutation</span> <span class="hljs-params">(<span class="hljs-rest_arg">...args</span>)</span> </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">namespace</span> &amp;&amp; !getModuleByNamespace(<span class="hljs-keyword">this</span>.$store, <span class="hljs-string">'mapMutations'</span>, <span class="hljs-keyword">namespace</span>)) {
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-comment">//调用了store中的commit方法，触发相应的mutation函数的执行</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.commit.apply(<span class="hljs-keyword">this</span>.$store, [val].concat(args))
    }
  })
  <span class="hljs-keyword">return</span> res
})</code></pre>
<p>mapGetters的逻辑跟mapState类似，mapActions的逻辑跟mapMutations类似，这里不再赘述</p>
<p>自此，我们把help.js的内容也分析完了</p>
<p><strong>---------------------------------------------------一本正经分割线--------------------------------------------------------------------------------</strong><br>接下来我们看看mixin.js文件<br>还记得之前store.js里面有个install方法么，这个方法就用到了mixin.js文件提供的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这个文件其实就导出了一个方法，供vuex在被引入的时候，能够顺利安装到项目中
export default function (Vue) {
  // 首先，判断vue版本,不同的vue版本，生命周期不同，所以需要做差异处理
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    // 如果版本是2.0以上的，则在vue的beforeCreate生命周期中，触发vuex的初始化
    // 利用的是vue中全局混入的形式
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    // 如果是1.x版本的话，就改写原有Vue原型上的_init方法
    // 先将原来的函数保存在常量_init中
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
        // 将初始化方法作为原有init的参数传入，所以在vue初始化的时候就会执行vuexInit方法来初始化vuex
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */
  // vuex的初始化钩子 
  function vuexInit () {
    const options = this.$options
    // store injection
    // 注入store
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent &amp;&amp; options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 这个文件其实就导出了一个方法，供vuex在被引入的时候，能够顺利安装到项目中</span>
export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(Vue)</span> </span>{
  <span class="hljs-comment">// 首先，判断vue版本,不同的vue版本，生命周期不同，所以需要做差异处理</span>
  <span class="hljs-keyword">const</span> version = Number(Vue.version.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">0</span>])

  <span class="hljs-keyword">if</span> (version &gt;= <span class="hljs-number">2</span>) {
    <span class="hljs-comment">// 如果版本是2.0以上的，则在vue的beforeCreate生命周期中，触发vuex的初始化</span>
    <span class="hljs-comment">// 利用的是vue中全局混入的形式</span>
    Vue.mixin({ beforeCreate: vuexInit })
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// override init and inject vuex init procedure</span>
    <span class="hljs-comment">// for 1.x backwards compatibility.</span>
    <span class="hljs-comment">// 如果是1.x版本的话，就改写原有Vue原型上的_init方法</span>
    <span class="hljs-comment">// 先将原来的函数保存在常量_init中</span>
    <span class="hljs-keyword">const</span> _init = Vue.prototype._init
    Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(options = {})</span> </span>{
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
        <span class="hljs-comment">// 将初始化方法作为原有init的参数传入，所以在vue初始化的时候就会执行vuexInit方法来初始化vuex</span>
      _init.call(this, options)
    }
  }

  <span class="hljs-comment">/**
   * Vuex init hook, injected into each instances init hooks list.
   */</span>
  <span class="hljs-comment">// vuex的初始化钩子 </span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vuexInit</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">const</span> options = this.$options
    <span class="hljs-comment">// store injection</span>
    <span class="hljs-comment">// 注入store</span>
    <span class="hljs-keyword">if</span> (options.store) {
      this.$store = typeof options.store === <span class="hljs-string">'function'</span>
        ? options.store()
        : options.store
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.<span class="hljs-keyword">parent</span> &amp;&amp; options.<span class="hljs-keyword">parent</span>.$store) {
      this.$store = options.<span class="hljs-keyword">parent</span>.$store
    }
  }
}
</code></pre>
<p>plugins文件夹中，主要是关于插件相关的内容</p>
<p>devtool.js，是关于是当用户开启vue-devtools时，触发了一些操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过全局变量__VUE_DEVTOOLS_GLOBAL_HOOK__，判断是否开启vue-devtools
const devtoolHook =
  typeof window !== 'undefined' &amp;&amp;
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__

export default function devtoolPlugin (store) {
  if (!devtoolHook) return

  store._devtoolHook = devtoolHook
  // vue-devtool自身实现了一套事件机制，有兴趣可以看看其中的实现
  devtoolHook.emit('vuex:init', store)

  devtoolHook.on('vuex:travel-to-state', targetState => {
    //用targetState替换当前的state
    store.replaceState(targetState)
  })
  // 当触发commit的时候执行这个方法
  store.subscribe((mutation, state) => {
    // devtoolHook会emit一个vuex:mutation事件
    devtoolHook.emit('vuex:mutation', mutation, state)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 通过全局变量__VUE_DEVTOOLS_GLOBAL_HOOK__，判断是否开启vue-devtools</span>
<span class="hljs-keyword">const</span> devtoolHook =
  <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp;
  <span class="hljs-built_in">window</span>.__VUE_DEVTOOLS_GLOBAL_HOOK__

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">devtoolPlugin</span> (<span class="hljs-params">store</span>) </span>{
  <span class="hljs-keyword">if</span> (!devtoolHook) <span class="hljs-keyword">return</span>

  store._devtoolHook = devtoolHook
  <span class="hljs-comment">// vue-devtool自身实现了一套事件机制，有兴趣可以看看其中的实现</span>
  devtoolHook.emit(<span class="hljs-string">'vuex:init'</span>, store)

  devtoolHook.on(<span class="hljs-string">'vuex:travel-to-state'</span>, <span class="hljs-function"><span class="hljs-params">targetState</span> =&gt;</span> {
    <span class="hljs-comment">//用targetState替换当前的state</span>
    store.replaceState(targetState)
  })
  <span class="hljs-comment">// 当触发commit的时候执行这个方法</span>
  store.subscribe(<span class="hljs-function">(<span class="hljs-params">mutation, state</span>) =&gt;</span> {
    <span class="hljs-comment">// devtoolHook会emit一个vuex:mutation事件</span>
    devtoolHook.emit(<span class="hljs-string">'vuex:mutation'</span>, mutation, state)
  })
}</code></pre>
<p>logger.js是在开发过程中记录日志的插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Credits: borrowed code from fcomb/redux-logger
// 引入深拷贝方法
import { deepCopy } from '../util'

export default function createLogger ({
  collapsed = true,
  filter = (mutation, stateBefore, stateAfter) => true,
  transformer = state => state,
  mutationTransformer = mut => mut
} = {}) {
  return store => {
    // 保存原有的state
    let prevState = deepCopy(store.state)
    // 监听state的变化
    store.subscribe((mutation, state) => {
      if (typeof console === 'undefined') {
        return
      }
      //深拷贝并且获取新的state
      const nextState = deepCopy(state)

      if (filter(mutation, prevState, nextState)) {
        // 获取当前时间
        const time = new Date()
        // 格式化时间
        const formattedTime = ` @ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`
        // 格式化mutation
        const formattedMutation = mutationTransformer(mutation)
        // 获取输出的信息
        const message = `mutation ${mutation.type}${formattedTime}`
        // 在 Web控制台上创建一个新的分组.随后输出到控制台上的内容都会被添加一个缩进
        const startMessage = collapsed
          ? console.groupCollapsed
          : console.group

        // render
        try {
          // 输出日志
          startMessage.call(console, message)
        } catch (e) {
          console.log(message)
        }

        console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState))
        console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation)
        console.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState))

        try {
          console.groupEnd()
        } catch (e) {
          console.log('—— log end ——')
        }
      }
      // 替换state
      prevState = nextState
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// Credits: borrowed code <span class="hljs-keyword">from</span> fcomb/redux-logger
// 引入深拷贝方法
import { deepCopy } <span class="hljs-keyword">from</span> '../util'

export <span class="hljs-keyword">default</span> function createLogger ({
  collapsed = true,
  filter = (mutation, <span class="hljs-keyword">state</span>Before, <span class="hljs-keyword">state</span>After) =&gt; true,
  transformer = <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>,
  mutationTransformer = mut =&gt; mut
} = {}) {
  return store =&gt; {
    // 保存原有的<span class="hljs-keyword">state</span>
    let prevState = deepCopy(store.<span class="hljs-keyword">state</span>)
    // 监听<span class="hljs-keyword">state</span>的变化
    store.subscribe((mutation, <span class="hljs-keyword">state</span>) =&gt; {
      if (typeof console === 'undefined') {
        return
      }
      //深拷贝并且获取新的<span class="hljs-keyword">state</span>
      const nextState = deepCopy(<span class="hljs-keyword">state</span>)

      if (filter(mutation, prevState, nextState)) {
        // 获取当前时间
        const time = new Date()
        // 格式化时间
        const formattedTime = ` @ ${pad(time.getHours(), <span class="hljs-number">2</span>)}:${pad(time.getMinutes(), <span class="hljs-number">2</span>)}:${pad(time.getSeconds(), <span class="hljs-number">2</span>)}.${pad(time.getMilliseconds(), <span class="hljs-number">3</span>)}`
        // 格式化mutation
        const formattedMutation = mutationTransformer(mutation)
        // 获取输出的信息
        const message = `mutation ${mutation.type}${formattedTime}`
        // 在 Web控制台上创建一个新的分组.随后输出到控制台上的内容都会被添加一个缩进
        const startMessage = collapsed
          ? console.<span class="hljs-keyword">group</span>Collapsed
          : console.<span class="hljs-keyword">group</span>

        // render
        try {
          // 输出日志
          startMessage.call(console, message)
        } catch (e) {
          console.<span class="hljs-keyword">log</span>(message)
        }

        console.<span class="hljs-keyword">log</span>('%c prev <span class="hljs-keyword">state</span>', 'color: <span class="hljs-comment">#9E9E9E; font-weight: bold', transformer(prevState))</span>
        console.<span class="hljs-keyword">log</span>('%c mutation', 'color: <span class="hljs-comment">#03A9F4; font-weight: bold', formattedMutation)</span>
        console.<span class="hljs-keyword">log</span>('%c next <span class="hljs-keyword">state</span>', 'color: <span class="hljs-comment">#4CAF50; font-weight: bold', transformer(nextState))</span>

        try {
          console.<span class="hljs-keyword">group</span>End()
        } catch (e) {
          console.<span class="hljs-keyword">log</span>('—— <span class="hljs-keyword">log</span> end ——')
        }
      }
      // 替换<span class="hljs-keyword">state</span>
      prevState = nextState
    })
  }
}</code></pre>
<p>至于util.js,内部提供一些简单的工具方法，不再赘述啦~可自行研究<br><strong>---------------------------------------------------最后的分割线--------------------------------------------------------------------------------</strong></p>
<p>以上，便是vuex源码的所有内容。。不管写的怎么样，你都看到这里啦，对此<strong>深表感谢</strong>~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你想要的——vuex源码分析

## 原文链接
[https://segmentfault.com/a/1190000010203499](https://segmentfault.com/a/1190000010203499)


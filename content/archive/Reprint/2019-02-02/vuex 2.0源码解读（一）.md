---
title: 'vuex 2.0源码解读（一）' 
date: 2019-02-02 2:30:11
hidden: true
slug: dvp03aedwli
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>转载请注明出处 <a href="https://segmentfault.com/a/1190000007108052">https://segmentfault.com/a/11...</a></p></blockquote>
<p>vuex2.0 和 vuex1.x 相比，API改变的还是很多的，但基本思想没什么改变。vuex2.0 的源码挺短，四五百行的样子，两三天就能读完。我是国庆期间断断续续看完的，写一下自己的理解。这里使用的vuex版本是 2.0.0-rc6。在看这篇文章之前，建议先看一遍官方的vuex2.0 文档，了解基本概念，不然之后的内容理解起来会很费劲。</p>
<h2 id="articleHeader0">引入 vuex 文件</h2>
<p>要想使用 vuex 有几种方式, 这里不细讲。</p>
<ul><li><p>CDN</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src='path/vue.js'><script> <!-- 必须先引入 vue -->
<script src='path/vuex.js'></script> <!-- 平时学习时建议使用完整版 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'path/vue.js'</span>&gt;</span><span class="handlebars"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml"> <span class="hljs-comment">&lt;!-- 必须先引入 vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'path/vuex.js'</span>&gt;</span><span class="undefined"></span></span></span></span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- 平时学习时建议使用完整版 --&gt;</span></code></pre>
<ul><li><p>ES6语法 + webpack</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vuex from 'vuex'
var store = new Vuex.Store({})
Vuex.mapState({})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">var</span> store = <span class="hljs-keyword">new</span> Vuex.Store({})
Vuex.mapState({})</code></pre>
<p>或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Store, mapState } from 'vuex'
var store = new Store({})
mapState({})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Store, mapState } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">var</span> store = <span class="hljs-keyword">new</span> Store({})
mapState({})</code></pre>
<h2 id="articleHeader1">Store构造函数</h2>
<p>vuex 只暴露出了6个方法，分别是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var index = {
Store: Store,
install: install,
mapState: mapState,
mapMutations: mapMutations,
mapGetters: mapGetters,
mapActions: mapActions
}

return index;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> index = {
<span class="hljs-attr">Store</span>: Store,
<span class="hljs-attr">install</span>: install,
<span class="hljs-attr">mapState</span>: mapState,
<span class="hljs-attr">mapMutations</span>: mapMutations,
<span class="hljs-attr">mapGetters</span>: mapGetters,
<span class="hljs-attr">mapActions</span>: mapActions
}

<span class="hljs-keyword">return</span> index;</code></pre>
<p>其中 <code>install</code> 方法是配合 <code>Vue.use</code> 方法使用的，用于在 Vue 中注册 Vuex ,和数据流关系不大。其他的几种方法就是我们常用的。</p>
<p>先看看 Store 方法，学习 vuex 最先接触到的就是 <code>new Store({})</code> 了。那么就先看看这个 Store 构造函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Store = function Store (options) {
  var this$1 = this; // 指向返回的store实例
  if ( options === void 0 ) options = {};

  // 使用构造函数之前，必须保证vuex已注册，使用Vue.use(Vuex)注册vuex
  assert(Vue, &quot;must call Vue.use(Vuex) before creating a store instance.&quot;)
  // 需要使用的浏览器支持Promise
  assert(typeof Promise !== 'undefined', &quot;vuex requires a Promise polyfill in this browser.&quot;)

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  // store的内部状态(属性)
  this._options = options
  this._committing = false
  this._actions = Object.create(null)  // 保存actions
  this._mutations = Object.create(null) // 保存mutations
  this._wrappedGetters = Object.create(null) // 保存包装后的getters
  this._runtimeModules = Object.create(null) 
  this._subscribers = []
  this._watcherVM = new Vue()

  // bind commit and dispatch to self
  var store = this
  var ref = this;
  var dispatch = ref.dispatch; // 引用的是Store.prototype.dispatch
  var commit = ref.commit; // 引用的是Store.prototype.commit 
  this.dispatch = function boundDispatch (type, payload) { // 绑定上下文对象
    return dispatch.call(store, type, payload)
  }
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  }

  // strict mode
  this.strict = strict // 是否开启严格模式

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  // 初始化 root module
  // 同时也会递归初始化所有子module
  // 并且收集所有的getters至this._wrappedGetters
  installModule(this, state, [], options)

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  // 重置vm实例状态
  // 同时在这里把getters转化为computed(计算属性)
  resetStoreVM(this, state)

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); })
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Store = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Store</span> (<span class="hljs-params">options</span>) </span>{
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">this</span>$<span class="hljs-number">1</span> = <span class="hljs-keyword">this</span>; <span class="hljs-comment">// 指向返回的store实例</span>
  <span class="hljs-keyword">if</span> ( options === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> ) options = {};

  <span class="hljs-comment">// 使用构造函数之前，必须保证vuex已注册，使用Vue.use(Vuex)注册vuex</span>
  assert(Vue, <span class="hljs-string">"must call Vue.use(Vuex) before creating a store instance."</span>)
  <span class="hljs-comment">// 需要使用的浏览器支持Promise</span>
  assert(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">Promise</span> !== <span class="hljs-string">'undefined'</span>, <span class="hljs-string">"vuex requires a Promise polyfill in this browser."</span>)

  <span class="hljs-keyword">var</span> state = options.state; <span class="hljs-keyword">if</span> ( state === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> ) state = {};
  <span class="hljs-keyword">var</span> plugins = options.plugins; <span class="hljs-keyword">if</span> ( plugins === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> ) plugins = [];
  <span class="hljs-keyword">var</span> strict = options.strict; <span class="hljs-keyword">if</span> ( strict === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> ) strict = <span class="hljs-literal">false</span>;

  <span class="hljs-comment">// store internal state</span>
  <span class="hljs-comment">// store的内部状态(属性)</span>
  <span class="hljs-keyword">this</span>._options = options
  <span class="hljs-keyword">this</span>._committing = <span class="hljs-literal">false</span>
  <span class="hljs-keyword">this</span>._actions = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>)  <span class="hljs-comment">// 保存actions</span>
  <span class="hljs-keyword">this</span>._mutations = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>) <span class="hljs-comment">// 保存mutations</span>
  <span class="hljs-keyword">this</span>._wrappedGetters = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>) <span class="hljs-comment">// 保存包装后的getters</span>
  <span class="hljs-keyword">this</span>._runtimeModules = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>) 
  <span class="hljs-keyword">this</span>._subscribers = []
  <span class="hljs-keyword">this</span>._watcherVM = <span class="hljs-keyword">new</span> Vue()

  <span class="hljs-comment">// bind commit and dispatch to self</span>
  <span class="hljs-keyword">var</span> store = <span class="hljs-keyword">this</span>
  <span class="hljs-keyword">var</span> ref = <span class="hljs-keyword">this</span>;
  <span class="hljs-keyword">var</span> dispatch = ref.dispatch; <span class="hljs-comment">// 引用的是Store.prototype.dispatch</span>
  <span class="hljs-keyword">var</span> commit = ref.commit; <span class="hljs-comment">// 引用的是Store.prototype.commit </span>
  <span class="hljs-keyword">this</span>.dispatch = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boundDispatch</span> (<span class="hljs-params">type, payload</span>) </span>{ <span class="hljs-comment">// 绑定上下文对象</span>
    <span class="hljs-keyword">return</span> dispatch.call(store, type, payload)
  }
  <span class="hljs-keyword">this</span>.commit = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">boundCommit</span> (<span class="hljs-params">type, payload, options</span>) </span>{
    <span class="hljs-keyword">return</span> commit.call(store, type, payload, options)
  }

  <span class="hljs-comment">// strict mode</span>
  <span class="hljs-keyword">this</span>.strict = strict <span class="hljs-comment">// 是否开启严格模式</span>

  <span class="hljs-comment">// init root module.</span>
  <span class="hljs-comment">// this also recursively registers all sub-modules</span>
  <span class="hljs-comment">// and collects all module getters inside this._wrappedGetters</span>
  <span class="hljs-comment">// 初始化 root module</span>
  <span class="hljs-comment">// 同时也会递归初始化所有子module</span>
  <span class="hljs-comment">// 并且收集所有的getters至this._wrappedGetters</span>
  installModule(<span class="hljs-keyword">this</span>, state, [], options)

  <span class="hljs-comment">// initialize the store vm, which is responsible for the reactivity</span>
  <span class="hljs-comment">// (also registers _wrappedGetters as computed properties)</span>
  <span class="hljs-comment">// 重置vm实例状态</span>
  <span class="hljs-comment">// 同时在这里把getters转化为computed(计算属性)</span>
  resetStoreVM(<span class="hljs-keyword">this</span>, state)

  <span class="hljs-comment">// apply plugins</span>
  plugins.concat(devtoolPlugin).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">plugin</span>) </span>{ <span class="hljs-keyword">return</span> plugin(<span class="hljs-keyword">this</span>$<span class="hljs-number">1</span>); })
};</code></pre>
<p>一开始会有两个判断条件，判断 vuex 是否已经注册，和当前浏览器是否支持 <code>Promise</code>, <code>assert</code> 方法也挺简单，如果传入的第一个参数为假值，则抛出一个错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function assert (condition, msg) {
  if (!condition) { throw new Error((&quot;[vuex] &quot; + msg)) }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="javascipt"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">assert</span> (<span class="hljs-params">condition, msg</span>) </span>{
  <span class="hljs-keyword">if</span> (!condition) { <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>((<span class="hljs-string">"[vuex] "</span> + msg)) }
}</code></pre>
<p>接着往下看，接着会定义 <code>state</code>, <code>plugins</code>,<code>strict</code>三个变量，分别是你传入的 options 对应的选项。之后就是定义返回的 store 实例的一些内部状态。先不要管它们具体是什么，这个之后会慢慢讲，这里先看看 Store 构造函数都做了些什么。再之后就是绑定 <code>dispatch</code> 和 <code>commit</code> 方法到 <code>store</code> 实例上。接下来就是整个 vuex 的核心方法 <code>installModule</code> 了，之后重置 <code>vm</code> 实例的状态。</p>
<p>简单点说，当你使用 Store 构造函数，它实际上做了这么几件事，首先定义给 <code>store</code> 实例定义一些内部属性，之后就是绑定 <code>dispatch</code> 和 <code>commit</code> 的上下文对象永远是 <code>store</code> 实例上，之后 <code>installModule</code> 根据传入的 <code>options</code> ‘充实’ 内部状态等等。</p>
<h3 id="articleHeader2">installModule</h3>
<p>很重要的一个方法。贴上代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * store 就是 store 实例
 * rootState 是使用构造函数options中定义的 state 对象
 * path 路径
 * module 传入的options
 */
function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length  // 是否是root
  var state = module.state;
  var actions = module.actions;
  var mutations = module.mutations;
  var getters = module.getters;
  var modules = module.modules;

  // set state
  if (!isRoot &amp;&amp; !hot) { 
    // 找到要注册的 path 的上一级 state
    var parentState = getNestedState(rootState, path.slice(0, -1))
    // 定义 module 的 name
    var moduleName = path[path.length - 1]
    // store._withCommit方法之后会讲
    // 这里先理解为 执行传入的函数
    store._withCommit(function () {
      // 使用Vue.set方法
      // parentState[moduleName] = state
      // 并且state变成响应式的
      Vue.set(parentState, moduleName, state || {})
    })
  }
  // 之后设置 mutations, actions, getters, modules
  if (mutations) {
    Object.keys(mutations).forEach(function (key) {
      registerMutation(store, key, mutations[key], path)
    })
  }

  if (actions) {
    Object.keys(actions).forEach(function (key) {
      registerAction(store, key, actions[key], path)
    })
  }

  if (getters) {
    wrapGetters(store, getters, path)
  }

  if (modules) {
    Object.keys(modules).forEach(function (key) {
      installModule(store, rootState, path.concat(key), modules[key], hot)
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * store 就是 store 实例
 * rootState 是使用构造函数options中定义的 state 对象
 * path 路径
 * module 传入的options
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">installModule</span> (<span class="hljs-params">store, rootState, path, module, hot</span>) </span>{
  <span class="hljs-keyword">var</span> isRoot = !path.length  <span class="hljs-comment">// 是否是root</span>
  <span class="hljs-keyword">var</span> state = <span class="hljs-built_in">module</span>.state;
  <span class="hljs-keyword">var</span> actions = <span class="hljs-built_in">module</span>.actions;
  <span class="hljs-keyword">var</span> mutations = <span class="hljs-built_in">module</span>.mutations;
  <span class="hljs-keyword">var</span> getters = <span class="hljs-built_in">module</span>.getters;
  <span class="hljs-keyword">var</span> modules = <span class="hljs-built_in">module</span>.modules;

  <span class="hljs-comment">// set state</span>
  <span class="hljs-keyword">if</span> (!isRoot &amp;&amp; !hot) { 
    <span class="hljs-comment">// 找到要注册的 path 的上一级 state</span>
    <span class="hljs-keyword">var</span> parentState = getNestedState(rootState, path.slice(<span class="hljs-number">0</span>, <span class="hljs-number">-1</span>))
    <span class="hljs-comment">// 定义 module 的 name</span>
    <span class="hljs-keyword">var</span> moduleName = path[path.length - <span class="hljs-number">1</span>]
    <span class="hljs-comment">// store._withCommit方法之后会讲</span>
    <span class="hljs-comment">// 这里先理解为 执行传入的函数</span>
    store._withCommit(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 使用Vue.set方法</span>
      <span class="hljs-comment">// parentState[moduleName] = state</span>
      <span class="hljs-comment">// 并且state变成响应式的</span>
      Vue.set(parentState, moduleName, state || {})
    })
  }
  <span class="hljs-comment">// 之后设置 mutations, actions, getters, modules</span>
  <span class="hljs-keyword">if</span> (mutations) {
    <span class="hljs-built_in">Object</span>.keys(mutations).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
      registerMutation(store, key, mutations[key], path)
    })
  }

  <span class="hljs-keyword">if</span> (actions) {
    <span class="hljs-built_in">Object</span>.keys(actions).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
      registerAction(store, key, actions[key], path)
    })
  }

  <span class="hljs-keyword">if</span> (getters) {
    wrapGetters(store, getters, path)
  }

  <span class="hljs-keyword">if</span> (modules) {
    <span class="hljs-built_in">Object</span>.keys(modules).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
      installModule(store, rootState, path.concat(key), modules[key], hot)
    })
  }
}</code></pre>
<p>这里有个很重要的概念要理解，什么是 <strong>path</strong>. vuex 的一个 store 实例可以拆分成很多个 module ,不同的 module 可以理解成一个子代的 store 实例（事实上，module 确实和 store 具有一样的结构）,这是一种模块化的概念。因此这里的 path 可以理解成是表示一种层级关系，当你有了一个 root state 之后，根据这个 root state 和 path 可以找到 path 路径对应的一个 local state， 每一个 module 下的 mutations 和 actions 改变的都是这个local state，而不是 root state.</p>
<p>这里在 Store 构造函数里传入的 path 路径为 <code>[]</code>,说明注册的是一个root state. 再看看上一段代码的最后</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (modules) {
    Object.keys(modules).forEach(function (key) {
      installModule(store, rootState, path.concat(key), modules[key], hot)
   })
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (modules) {
    <span class="hljs-built_in">Object</span>.keys(modules).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
      installModule(store, rootState, path.concat(key), modules[key], hot)
   })
 }</code></pre>
<p>如果传入的options 中有 modules 选项，重复调用 <code>installModule</code>, 这里传入的函数的 path 参数是 <code>path.concat(key)</code>, 所以应该很好理解了。</p>
<p>简单看一下 <code>getNestedState</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * state: Object, path: Array
 * 假设path = ['a', 'b', 'c']
 * 函数返回结果是state[a][b][c]
 */
function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * state: Object, path: Array
 * 假设path = ['a', 'b', 'c']
 * 函数返回结果是state[a][b][c]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNestedState</span> (<span class="hljs-params">state, path</span>) </span>{
  <span class="hljs-keyword">return</span> path.length
    ? path.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">state, key</span>) </span>{ <span class="hljs-keyword">return</span> state[key]; }, state)
    : state
}</code></pre>
<p>reduce 方法接受一个函数，函数的参数分别是上一次计算后的值，和当前值，reduce 方法的第二个参数 state 是初始计算值。</p>
<h3 id="articleHeader3">registerMutation</h3>
<p>如果 <code>mutations</code> 选项存在，那么就注册这个 <code>mutations</code> ，看一下它的实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 注册mutations，也就是给store._mutations添加属性
 * 这里说一下handler
 * handler 是 mutations[key]
 * 也就是传入 Store构造函数的 mutations 
 */
function registerMutation (store, type, handler, path) {
  if ( path === void 0 ) path = [];

  // 在_mutations中找到对应type的mutation数组
  // 如果是第一次创建，就初始化为一个空数组
  var entry = store._mutations[type] || (store._mutations[type] = [])
  // 推入一个对原始mutations[key]包装过的函数
  entry.push(function wrappedMutationHandler (payload) {
    // store.state表示root state, 先获取path路径下的local state
    // mutation应该是对path路径下的state的修改
    // 函数接受一个payload参数
    // 初始的handler，接受一个state he payload 参数
    handler(getNestedState(store.state, path), payload)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * 注册mutations，也就是给store._mutations添加属性
 * 这里说一下handler
 * handler 是 mutations[key]
 * 也就是传入 Store构造函数的 mutations 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerMutation</span> (<span class="hljs-params">store, type, handler, path</span>) </span>{
  <span class="hljs-keyword">if</span> ( path === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> ) path = [];

  <span class="hljs-comment">// 在_mutations中找到对应type的mutation数组</span>
  <span class="hljs-comment">// 如果是第一次创建，就初始化为一个空数组</span>
  <span class="hljs-keyword">var</span> entry = store._mutations[type] || (store._mutations[type] = [])
  <span class="hljs-comment">// 推入一个对原始mutations[key]包装过的函数</span>
  entry.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrappedMutationHandler</span> (<span class="hljs-params">payload</span>) </span>{
    <span class="hljs-comment">// store.state表示root state, 先获取path路径下的local state</span>
    <span class="hljs-comment">// mutation应该是对path路径下的state的修改</span>
    <span class="hljs-comment">// 函数接受一个payload参数</span>
    <span class="hljs-comment">// 初始的handler，接受一个state he payload 参数</span>
    handler(getNestedState(store.state, path), payload)
  })
}</code></pre>
<p>逻辑很简单，所有的 mutations 都经过处理后，保存在了 store._mutations 对象里。 _mutations  的结构为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_mutations: {
    type1: [wrappedFunction1, wrappedFuction2, ...],
    type2: [wrappedFunction1, wrappedFuction2, ...],
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">_mutations: {
    <span class="hljs-attr">type1</span>: [wrappedFunction1, wrappedFuction2, ...],
    <span class="hljs-attr">type2</span>: [wrappedFunction1, wrappedFuction2, ...],
    ...
}</code></pre>
<h3 id="articleHeader4">registerAction</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function registerAction (store, type, handler, path) {
  if ( path === void 0 ) path = [];

  var entry = store._actions[type] || (store._actions[type] = [])
  var dispatch = store.dispatch;
  var commit = store.commit;
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: dispatch,
      commit: commit,
      getters: store.getters,
      state: getNestedState(store.state, path),
      rootState: store.state
    }, payload, cb)
    // 如果 res 不是 promise 对象 ，将其转化为promise对象
    // 这是因为store.dispatch 方法里的 Promise.all()方法。
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerAction</span> (<span class="hljs-params">store, type, handler, path</span>) </span>{
  <span class="hljs-keyword">if</span> ( path === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> ) path = [];

  <span class="hljs-keyword">var</span> entry = store._actions[type] || (store._actions[type] = [])
  <span class="hljs-keyword">var</span> dispatch = store.dispatch;
  <span class="hljs-keyword">var</span> commit = store.commit;
  entry.push(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrappedActionHandler</span> (<span class="hljs-params">payload, cb</span>) </span>{
    <span class="hljs-keyword">var</span> res = handler({
      <span class="hljs-attr">dispatch</span>: dispatch,
      <span class="hljs-attr">commit</span>: commit,
      <span class="hljs-attr">getters</span>: store.getters,
      <span class="hljs-attr">state</span>: getNestedState(store.state, path),
      <span class="hljs-attr">rootState</span>: store.state
    }, payload, cb)
    <span class="hljs-comment">// 如果 res 不是 promise 对象 ，将其转化为promise对象</span>
    <span class="hljs-comment">// 这是因为store.dispatch 方法里的 Promise.all()方法。</span>
    <span class="hljs-keyword">if</span> (!isPromise(res)) {
      res = <span class="hljs-built_in">Promise</span>.resolve(res)
    }
    <span class="hljs-keyword">if</span> (store._devtoolHook) {
      <span class="hljs-keyword">return</span> res.catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
        store._devtoolHook.emit(<span class="hljs-string">'vuex:error'</span>, err)
        <span class="hljs-keyword">throw</span> err
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> res
    }
  })
}</code></pre>
<p>这里同样是'充实' store._actions 对象，每一种 action type 都对应一个数组，数组里存放的包装后的 handler 函数，由于涉及到 promise，这里我想在下一节结合 store 的 dispatch 实例方法一起讲。</p>
<h3 id="articleHeader5">wrapGetters</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 包装getters函数
 * store增加一个 _wrappedGetters 属性
 * moduleGetters: 传入的options.getters
 * modulePath: 传入 installModule 函数的 path 
 */
function wrapGetters (store, moduleGetters, modulePath) {
  Object.keys(moduleGetters).forEach(function (getterKey) {
    var rawGetter = moduleGetters[getterKey] // 原始的getter
    if (store._wrappedGetters[getterKey]) { // 如果已经存在，警告
      console.error((&quot;[vuex] duplicate getter key: &quot; + getterKey))
      return
    }
    store._wrappedGetters[getterKey] = function wrappedGetter (store) {
        // 接受三个参数
        // local state
        //  全局的 getters
        // 全局的 state
      return rawGetter(
        getNestedState(store.state, modulePath), // local state
        store.getters, // getters
        store.state // root state
      )
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * 包装getters函数
 * store增加一个 _wrappedGetters 属性
 * moduleGetters: 传入的options.getters
 * modulePath: 传入 installModule 函数的 path 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapGetters</span> (<span class="hljs-params">store, moduleGetters, modulePath</span>) </span>{
  <span class="hljs-built_in">Object</span>.keys(moduleGetters).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">getterKey</span>) </span>{
    <span class="hljs-keyword">var</span> rawGetter = moduleGetters[getterKey] <span class="hljs-comment">// 原始的getter</span>
    <span class="hljs-keyword">if</span> (store._wrappedGetters[getterKey]) { <span class="hljs-comment">// 如果已经存在，警告</span>
      <span class="hljs-built_in">console</span>.error((<span class="hljs-string">"[vuex] duplicate getter key: "</span> + getterKey))
      <span class="hljs-keyword">return</span>
    }
    store._wrappedGetters[getterKey] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrappedGetter</span> (<span class="hljs-params">store</span>) </span>{
        <span class="hljs-comment">// 接受三个参数</span>
        <span class="hljs-comment">// local state</span>
        <span class="hljs-comment">//  全局的 getters</span>
        <span class="hljs-comment">// 全局的 state</span>
      <span class="hljs-keyword">return</span> rawGetter(
        getNestedState(store.state, modulePath), <span class="hljs-comment">// local state</span>
        store.getters, <span class="hljs-comment">// getters</span>
        store.state <span class="hljs-comment">// root state</span>
      )
    }
  })
}</code></pre>
<p>注意 这里的所有 getters 都储存在了全局的一个 _wrappedGetters 对象中，同样属性名是各个 getterKey ,属性值同样是一个函数，执行这个函数，将会返回原始 getter 的执行结果。</p>
<h3 id="articleHeader6">install modules</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (modules) {
    Object.keys(modules).forEach(function (key) {
      installModule(store, rootState, path.concat(key), modules[key], hot)
   })
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (modules) {
    <span class="hljs-built_in">Object</span>.keys(modules).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
      installModule(store, rootState, path.concat(key), modules[key], hot)
   })
 }</code></pre>
<p>如果 options 中有 modules 选项，那么就递归调用 <code>installModule</code> 方法，注意这里的 path 改变。</p>
<h3 id="articleHeader7">resetStoreVM</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function resetStoreVM (store, state) {
  var oldVm = store._vm // 原来的_vm

  // bind store public getters
  store.getters = {} // 初始化 store 的 getters 属性为一个空数组。
  var wrappedGetters = store._wrappedGetters
  var computed = {} 
  Object.keys(wrappedGetters).forEach(function (key) {
    var fn = wrappedGetters[key]
    // use computed to leverage its lazy-caching mechanism
    // 将wrappedGetter中的属性转移到 computed 中
    computed[key] = function () { return fn(store); }
    // store.getters[key] = store._vm[key]
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; }
    })
  })
  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  // 设为 silent 模式
  var silent = Vue.config.silent
  Vue.config.silent = true
  // 初始化一个 store._vm 实例
  store._vm = new Vue({
    data: { state: state },
    computed: computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  // 启用严格模式
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    // dispatch changes in all subscribed watchers
    // to force getter re-evaluation.
    store._withCommit(function () {
      oldVm.state = null
    })
    // 执行destroy 方法，通知所有的watchers 改变，并重新计算getters的值。
    Vue.nextTick(function () { return oldVm.$destroy(); })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">resetStoreVM</span> (<span class="hljs-params">store, state</span>) </span>{
  <span class="hljs-keyword">var</span> oldVm = store._vm <span class="hljs-comment">// 原来的_vm</span>

  <span class="hljs-comment">// bind store public getters</span>
  store.getters = {} <span class="hljs-comment">// 初始化 store 的 getters 属性为一个空数组。</span>
  <span class="hljs-keyword">var</span> wrappedGetters = store._wrappedGetters
  <span class="hljs-keyword">var</span> computed = {} 
  <span class="hljs-built_in">Object</span>.keys(wrappedGetters).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{
    <span class="hljs-keyword">var</span> fn = wrappedGetters[key]
    <span class="hljs-comment">// use computed to leverage its lazy-caching mechanism</span>
    <span class="hljs-comment">// 将wrappedGetter中的属性转移到 computed 中</span>
    computed[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> fn(store); }
    <span class="hljs-comment">// store.getters[key] = store._vm[key]</span>
    <span class="hljs-built_in">Object</span>.defineProperty(store.getters, key, {
      <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> store._vm[key]; }
    })
  })
  <span class="hljs-comment">// use a Vue instance to store the state tree</span>
  <span class="hljs-comment">// suppress warnings just in case the user has added</span>
  <span class="hljs-comment">// some funky global mixins</span>
  <span class="hljs-comment">// 设为 silent 模式</span>
  <span class="hljs-keyword">var</span> silent = Vue.config.silent
  Vue.config.silent = <span class="hljs-literal">true</span>
  <span class="hljs-comment">// 初始化一个 store._vm 实例</span>
  store._vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">data</span>: { <span class="hljs-attr">state</span>: state },
    <span class="hljs-attr">computed</span>: computed
  })
  Vue.config.silent = silent

  <span class="hljs-comment">// enable strict mode for new vm</span>
  <span class="hljs-comment">// 启用严格模式</span>
  <span class="hljs-keyword">if</span> (store.strict) {
    enableStrictMode(store)
  }

  <span class="hljs-keyword">if</span> (oldVm) {
    <span class="hljs-comment">// dispatch changes in all subscribed watchers</span>
    <span class="hljs-comment">// to force getter re-evaluation.</span>
    store._withCommit(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      oldVm.state = <span class="hljs-literal">null</span>
    })
    <span class="hljs-comment">// 执行destroy 方法，通知所有的watchers 改变，并重新计算getters的值。</span>
    Vue.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> oldVm.$destroy(); })
  }
}</code></pre>
<p>这个方法在 <code>installModule</code> 方法之后执行，来看看它都做了什么。简单点说，就是给 store 增加了一个 _vm 属性，指向一个新的 vue 实例，传入的选项包括一个 state 和 computed, computed 来自store 的 getters 属性。同时给 store 增加了一个 getters 属性，且 <code>store.getters[key] = store._vm[key]</code></p>
<h2 id="articleHeader8">mapState</h2>
<p>在讲 <code>mapState</code> 之前，先说一下基础方法 <code>normalizeMap</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * 如果map是一个数组 ['type1', 'type2', ...]
 * 转化为[
 *   {
 *     key: type1,
 *     val: type1
 *   },
 *   {
 *     key: type2,
 *     val: type2
 *   },
 *   ...
 * ]
 * 如果map是一个对象 {type1: fn1, type2: fn2, ...}
 * 转化为 [
 *   {
 *     key: type1,
 *     val: fn1
 *   },
 *   {
 *     key: type2,
 *     val: fn2
 *   },
 *   ...
 * ]
 */
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * 如果map是一个数组 ['type1', 'type2', ...]
 * 转化为[
 *   {
 *     key: type1,
 *     val: type1
 *   },
 *   {
 *     key: type2,
 *     val: type2
 *   },
 *   ...
 * ]
 * 如果map是一个对象 {type1: fn1, type2: fn2, ...}
 * 转化为 [
 *   {
 *     key: type1,
 *     val: fn1
 *   },
 *   {
 *     key: type2,
 *     val: fn2
 *   },
 *   ...
 * ]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">normalizeMap</span> (<span class="hljs-params">map</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.isArray(map)
    ? map.map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{ <span class="hljs-keyword">return</span> ({ <span class="hljs-attr">key</span>: key, <span class="hljs-attr">val</span>: key }); })
    : <span class="hljs-built_in">Object</span>.keys(map).map(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">key</span>) </span>{ <span class="hljs-keyword">return</span> ({ <span class="hljs-attr">key</span>: key, <span class="hljs-attr">val</span>: map[key] }); })
}</code></pre>
<p><code>normalizeMap</code> 函数接受一个对象或者数组，最后都转化成一个数组形式，数组元素是包含 key 和 value 两个属性的对象。</p>
<p>再来看看 <code>mapState</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * states: Object | Array
 * 返回一个对象
 * 对象的属性名对应于传入的 states 的属性名或者数组元素
 * 属性值都是一个函数
 * 执行这个函数的返回值根据 val 的不同而不同
 */
function mapState (states) {
  var res = {}
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key; 
    var val = ref.val; 

    res[key] = function mappedState () {
      return typeof val === 'function' // 如果是函数，返回函数执行后的结果
        ? val.call(this, this.$store.state, this.$store.getters)
        : this.$store.state[val] // 如果不是函数，而是一个字符串，直接在state中读取。
    }
  })
  return res 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * states: Object | Array
 * 返回一个对象
 * 对象的属性名对应于传入的 states 的属性名或者数组元素
 * 属性值都是一个函数
 * 执行这个函数的返回值根据 val 的不同而不同
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapState</span> (<span class="hljs-params">states</span>) </span>{
  <span class="hljs-keyword">var</span> res = {}
  normalizeMap(states).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ref</span>) </span>{
    <span class="hljs-keyword">var</span> key = ref.key; 
    <span class="hljs-keyword">var</span> val = ref.val; 

    res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedState</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> val === <span class="hljs-string">'function'</span> <span class="hljs-comment">// 如果是函数，返回函数执行后的结果</span>
        ? val.call(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>.$store.state, <span class="hljs-keyword">this</span>.$store.getters)
        : <span class="hljs-keyword">this</span>.$store.state[val] <span class="hljs-comment">// 如果不是函数，而是一个字符串，直接在state中读取。</span>
    }
  })
  <span class="hljs-keyword">return</span> res 
}</code></pre>
<p><code>mapState</code> 函数执行的结果是返回一个对象，属性名对应于传入的 states 对象或者数组元素。属性值是一个函数，执行这个函数将返回相应的 state .</p>
<h2 id="articleHeader9">mapMutations</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * mutations: Array
 * 返回一个对象
 * 属性名为 mutation 类型
 * 属性值为一个函数
 * 执行这个函数后将触发指定的 mutation 
 */
function mapMutations (mutations) {
  var res = {}
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key; // mutation type
    var val = ref.val; // mutation type

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ]; // 一个数组缓存传入的参数

      // val作为commit函数的第一个参数type， 剩下的参数依次是payload 和 options
      return this.$store.commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * mutations: Array
 * 返回一个对象
 * 属性名为 mutation 类型
 * 属性值为一个函数
 * 执行这个函数后将触发指定的 mutation 
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapMutations</span> (<span class="hljs-params">mutations</span>) </span>{
  <span class="hljs-keyword">var</span> res = {}
  normalizeMap(mutations).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ref</span>) </span>{
    <span class="hljs-keyword">var</span> key = ref.key; <span class="hljs-comment">// mutation type</span>
    <span class="hljs-keyword">var</span> val = ref.val; <span class="hljs-comment">// mutation type</span>

    res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedMutation</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> args = [], len = <span class="hljs-built_in">arguments</span>.length;
      <span class="hljs-keyword">while</span> ( len-- ) args[ len ] = <span class="hljs-built_in">arguments</span>[ len ]; <span class="hljs-comment">// 一个数组缓存传入的参数</span>

      <span class="hljs-comment">// val作为commit函数的第一个参数type， 剩下的参数依次是payload 和 options</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.commit.apply(<span class="hljs-keyword">this</span>.$store, [val].concat(args))
    }
  })
  <span class="hljs-keyword">return</span> res
}</code></pre>
<p>注意这里传入的 <code>mutations</code> 只能是一个数组，数组元素的 <code>mutation type</code> . 函数的作用的也很简单，传入一个 <code>mutations</code> 数组，返回一个对象，属性名是 <code>mutation</code> 的类型，属性值是一个函数，执行这个函数，将调用 <code>commit</code> 来触发对应的 <code>mutation</code> 从而改变state。另外注意这里的 <code>this</code> 指向的 store 的 <code>_vm</code> 。<code>mapState</code> 是在 Vue 实例中调用的。</p>
<h2 id="articleHeader10">mapActions</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mapActions (actions) {
  var res = {}
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapActions</span> (<span class="hljs-params">actions</span>) </span>{
  <span class="hljs-keyword">var</span> res = {}
  normalizeMap(actions).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ref</span>) </span>{
    <span class="hljs-keyword">var</span> key = ref.key;
    <span class="hljs-keyword">var</span> val = ref.val;

    res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedAction</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> args = [], len = <span class="hljs-built_in">arguments</span>.length;
      <span class="hljs-keyword">while</span> ( len-- ) args[ len ] = <span class="hljs-built_in">arguments</span>[ len ];

      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.dispatch.apply(<span class="hljs-keyword">this</span>.$store, [val].concat(args))
    }
  })
  <span class="hljs-keyword">return</span> res
}</code></pre>
<p><code>mapActions</code> 函数和 <code>mapMutations</code> 函数几乎如出一辙。唯一的区别即使这里应该使用 <code>dispatch</code> 方法来触发 <code>action</code>.</p>
<h2 id="articleHeader11">mapGetters</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * getters: Array
 */
function mapGetters (getters) {
  var res = {}
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val; 

    res[key] = function mappedGetter () {
      // 如果在getters中不存在，报错
      if (!(val in this.$store.getters)) {
        console.error((&quot;[vuex] unknown getter: &quot; + val))
      }
      // 根据 val 在 getters 对象里找对应的属性值
      return this.$store.getters[val]
    }
  })
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * getters: Array
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapGetters</span> (<span class="hljs-params">getters</span>) </span>{
  <span class="hljs-keyword">var</span> res = {}
  normalizeMap(getters).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ref</span>) </span>{
    <span class="hljs-keyword">var</span> key = ref.key;
    <span class="hljs-keyword">var</span> val = ref.val; 

    res[key] = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mappedGetter</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 如果在getters中不存在，报错</span>
      <span class="hljs-keyword">if</span> (!(val <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>.$store.getters)) {
        <span class="hljs-built_in">console</span>.error((<span class="hljs-string">"[vuex] unknown getter: "</span> + val))
      }
      <span class="hljs-comment">// 根据 val 在 getters 对象里找对应的属性值</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters[val]
    }
  })
  <span class="hljs-keyword">return</span> res
}</code></pre>
<p>这里 <code>getters</code> 同样接受一个数组，同样返回一个对象。</p>
<p>以上讲了四种 <code>map***</code> 方法，这四种方法可以都返回一个对象，因此可以 ES6 新特性 <code>...</code> 解构符。如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ...mapState(options)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    ...mapState(options)
}</code></pre>
<p>关于 <code>...</code> 解构符号, 举个小例子就明白了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj1 = {
    a: 1,
    b: 2,
    c: 3
}
var obj2 = {
    ...obj1,
    d: 4
}
// obj2 = { a: 1, b: 2, c: 3, d: 4 }
// 同样可以用于数组
var arr1 = ['a', 'b', 'c']
var arr2 = [...arr1, 'd']
// arr2 = ['a', 'b', 'c', 'd'] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj1 = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
}
<span class="hljs-keyword">var</span> obj2 = {
    ...obj1,
    <span class="hljs-attr">d</span>: <span class="hljs-number">4</span>
}
<span class="hljs-comment">// obj2 = { a: 1, b: 2, c: 3, d: 4 }</span>
<span class="hljs-comment">// 同样可以用于数组</span>
<span class="hljs-keyword">var</span> arr1 = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>]
<span class="hljs-keyword">var</span> arr2 = [...arr1, <span class="hljs-string">'d'</span>]
<span class="hljs-comment">// arr2 = ['a', 'b', 'c', 'd'] </span></code></pre>
<h2 id="articleHeader12">install</h2>
<p><code>install</code> 方法与 vuex 数据流关系不大，主要是用于在 Vue 中注册 Vuex，这里为了保持篇幅的完整性，简单介绍一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function install (_Vue) {
  if (Vue) { 
  // 报错，已经使用了 Vue.use(Vuex)方法注册了
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    )
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

// auto install in dist mode
// 在浏览器环境写，会自动调用 install 方法
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  install(window.Vue)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span> (<span class="hljs-params">_Vue</span>) </span>{
  <span class="hljs-keyword">if</span> (Vue) { 
  <span class="hljs-comment">// 报错，已经使用了 Vue.use(Vuex)方法注册了</span>
    <span class="hljs-built_in">console</span>.error(
      <span class="hljs-string">'[vuex] already installed. Vue.use(Vuex) should be called only once.'</span>
    )
    <span class="hljs-keyword">return</span>
  }
  Vue = _Vue
  applyMixin(Vue)
}

<span class="hljs-comment">// auto install in dist mode</span>
<span class="hljs-comment">// 在浏览器环境写，会自动调用 install 方法</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  install(<span class="hljs-built_in">window</span>.Vue)
}</code></pre>
<p>没什么难度，那就再看一下 applyMixin 方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0])
  // 检查使用的 Vue 版本，初始化时的生命周期钩子函数是 init 还是 beforeCreate
  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    // 保存之前的 Vue.prototype._init
    var _init = Vue.prototype._init

    // 重新设置Vue.prototype._init
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};
      //  初始化时先初始化vuexInit
      // options.init: Array  表示一组要执行的钩子函数
      //  options.init钩子函数之前加上了 vueInit
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }
  
  /*
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options
    // store injection
    // 如果自己有store选项，用自己的
    // 否则查找父组件的
    if (options.store) {
      this.$store = options.store
    } else if (options.parent &amp;&amp; options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">applyMixin</span> (<span class="hljs-params">Vue</span>) </span>{
  <span class="hljs-keyword">var</span> version = <span class="hljs-built_in">Number</span>(Vue.version.split(<span class="hljs-string">'.'</span>)[<span class="hljs-number">0</span>])
  <span class="hljs-comment">// 检查使用的 Vue 版本，初始化时的生命周期钩子函数是 init 还是 beforeCreate</span>
  <span class="hljs-keyword">if</span> (version &gt;= <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">var</span> usesInit = Vue.config._lifecycleHooks.indexOf(<span class="hljs-string">'init'</span>) &gt; <span class="hljs-number">-1</span>
    Vue.mixin(usesInit ? { <span class="hljs-attr">init</span>: vuexInit } : { <span class="hljs-attr">beforeCreate</span>: vuexInit })
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// override init and inject vuex init procedure</span>
    <span class="hljs-comment">// for 1.x backwards compatibility.</span>
    <span class="hljs-comment">// 保存之前的 Vue.prototype._init</span>
    <span class="hljs-keyword">var</span> _init = Vue.prototype._init

    <span class="hljs-comment">// 重新设置Vue.prototype._init</span>
    Vue.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
      <span class="hljs-keyword">if</span> ( options === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span> ) options = {};
      <span class="hljs-comment">//  初始化时先初始化vuexInit</span>
      <span class="hljs-comment">// options.init: Array  表示一组要执行的钩子函数</span>
      <span class="hljs-comment">//  options.init钩子函数之前加上了 vueInit</span>
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(<span class="hljs-keyword">this</span>, options)
    }
  }
  
  <span class="hljs-comment">/*
   * Vuex init hook, injected into each instances init hooks list.
   */</span>

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vuexInit</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> options = <span class="hljs-keyword">this</span>.$options
    <span class="hljs-comment">// store injection</span>
    <span class="hljs-comment">// 如果自己有store选项，用自己的</span>
    <span class="hljs-comment">// 否则查找父组件的</span>
    <span class="hljs-keyword">if</span> (options.store) {
      <span class="hljs-keyword">this</span>.$store = options.store
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.parent &amp;&amp; options.parent.$store) {
      <span class="hljs-keyword">this</span>.$store = options.parent.$store
    }
  }
}</code></pre>
<p>注释写的很清楚了，那么再看看什么有是 <code>vuexInit</code> 函数, <code>vuexInit</code> 函数是 vuex 的生命周期钩子函数。函数传递了两个信息，(1)子组件可以有自己单独的store，但是一般不这么做 (2) 如果子组件没有自己的 store ,就会查找父组件的。这也印证了 根组件的 store 会注入到所有的后代组件。</p>
<h2 id="articleHeader13">小结</h2>
<p>以上讲解了 Vuex 暴露出的 6 种方法，也是 Vuex 里的用的最多的几种方法，之后还会解读一下其他一些方法，比如 store 的一些实例方法。</p>
<p>另外本文的 <strong>github</strong> 的地址为： <a href="https://github.com/zengxiaotao/learnVuex2.0" rel="nofollow noreferrer" target="_blank">learnVuex2.0</a></p>
<p>转载请注明<a href="https://github.com/zengxiaotao/learnVuex2.0" rel="nofollow noreferrer" target="_blank">原链接</a></p>
<blockquote><p>全文完</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuex 2.0源码解读（一）

## 原文链接
[https://segmentfault.com/a/1190000007108052](https://segmentfault.com/a/1190000007108052)


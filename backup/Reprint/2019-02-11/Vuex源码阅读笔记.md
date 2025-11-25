---
title: 'Vuex源码阅读笔记' 
date: 2019-02-11 2:30:49
hidden: true
slug: jugwnlvabr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>笔记中的Vue与Vuex版本为1.0.21和0.6.2,需要阅读者有使用Vue，Vuex，ES6的经验。</p></blockquote>
<h2 id="articleHeader0">起因</h2>
<p>俗话说得好，没有无缘无故的爱，也没有无缘无故的恨，更不会无缘无故的去阅读别人的源代码。<br>之所以会去阅读Vuex的源代码，是因为在刚开始接触Vuex时，就在官方文档的Actions部分，看到这么一句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// the simplest action
function increment (store) {
  store.dispatch('INCREMENT')
}

// a action with additional arguments
// with ES2015 argument destructuring
function incrementBy ({ dispatch }, amount) {
  dispatch('INCREMENT', amount)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// the simplest action</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">increment</span> (<span class="hljs-params">store</span>) </span>{
  store.dispatch(<span class="hljs-string">'INCREMENT'</span>)
}

<span class="hljs-comment">// a action with additional arguments</span>
<span class="hljs-comment">// with ES2015 argument destructuring</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementBy</span> (<span class="hljs-params">{ dispatch }, amount</span>) </span>{
  dispatch(<span class="hljs-string">'INCREMENT'</span>, amount)
}</code></pre>
<p>上面的Action还好说，能看懂，但是下面使用ES6写法的Action是什么鬼呀喂（摔！）<br>虽然知道有解构赋值，但是那个<code>{ dispatch }</code>又是从哪儿冒出来的呀喂！明明我在调用时，没有传这个参数呀！<br>之前因为赶项目进度，所以抱着能用就行的态度，也就没管那么多。如今有了空闲时间，必须好好钻研一下呀。<br>而钻研最好的方式，就是阅读Vuex的源代码。这样就能弄清楚，那个<code>{ dispatch }</code>到底从哪儿冒出来的。</p>
<h3 id="articleHeader1">Vuex源代码简介</h3>
<p>Vuex的源代码量挺少的，加起来也才600行不到，但是其中大量使用了ES6的语法，且部分功能（如Vuex初始化)使用到了Vue。所以读起来还是有些费劲的。<br>整个Vuex的源代码，核心内容包括两部分。一部分是Store的构造函数，另一部分则是Vuex的初始化函数。<br>而刚才问题的答案，就在第二部分。</p>
<h2 id="articleHeader2">问题场景还原</h2>
<p>首先要介绍的，就是Vuex在Vue项目中的初始化。这儿贴一段代码：<br>首先是Vuex中，我写的Actions源代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// global/Vuex/action.js
export const getMe = ({ dispatch }) => {
  /**
   * 异步操作，获取用户信息，并存入Vuex的state中
   */
  res.user.get_me()
  .then(data => {
    dispatch('GET_ME', data)
  })
  .catch(err => {
    console.log(err)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// global/Vuex/action.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getMe = <span class="hljs-function">(<span class="hljs-params">{ dispatch }</span>) =&gt;</span> {
  <span class="hljs-comment">/**
   * 异步操作，获取用户信息，并存入Vuex的state中
   */</span>
  res.user.get_me()
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    dispatch(<span class="hljs-string">'GET_ME'</span>, data)
  })
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(err)
  })
}</code></pre>
<p>这个则是顶层组件，调用store的地方。由于Vuex的特点，store只需要在最顶层的组件声明一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;wrapper&quot;>
    <router-view></router-view>
  </div>
</template>

<script type=&quot;text/javascript&quot;>
  import store from './Vuex/store.js'

  export default {
    store
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./Vuex/store.js'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    store
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>接下来则是组件中，则是实际调用Vuex的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.vue
import { getMe } from './../global/Vuex/action'

export default {

  vuex: {
    actions: {
      getMe
    },
    getters: {
      // 从state中获取信息
      user: state => state.user
    }
  },

  ready() {
    // 开始获取用户信息
    this.getMe()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// index.vue</span>
<span class="hljs-keyword">import</span> { getMe } <span class="hljs-keyword">from</span> <span class="hljs-string">'./../global/Vuex/action'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

  <span class="hljs-attr">vuex</span>: {
    <span class="hljs-attr">actions</span>: {
      getMe
    },
    <span class="hljs-attr">getters</span>: {
      <span class="hljs-comment">// 从state中获取信息</span>
      user: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.user
    }
  },

  ready() {
    <span class="hljs-comment">// 开始获取用户信息</span>
    <span class="hljs-keyword">this</span>.getMe()
  }
}</code></pre>
<p>在这儿，可以很明显的看出，我在使用<code>this.getMe()</code>时，是没有任何参数的。但是在<code>getMe</code>函数的定义中，是需要解构赋值出<code>{dispatch}</code>的。<br>就好比说这个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getX({ x }) {
  console.log(x)
}

getX({ x: 3, y: 5 })
// 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getX</span>(<span class="hljs-params">{ x }</span>) </span>{
  <span class="hljs-built_in">console</span>.log(x)
}

getX({ <span class="hljs-attr">x</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">5</span> })
<span class="hljs-comment">// 3</span></code></pre>
<p>你得传入相应的参数，才能进行解构赋值。<br>同时，我注意到在Vuex的Actions调用，需要在Vue的options的Vuex.actions中先声明，之后才能使用。<br>那么，一定是Vuex对这个Action动了手脚。（逃）<br>而动手脚的代码，就存在于Vuex源代码的<code>override.js</code>中。这个文件，是用于初始化Vuex的。</p>
<h2 id="articleHeader3">Vuex的初始化</h2>
<p>在<code>override.js</code>中，有个<code>vuexInit</code>的函数。看名字就知道，这是拿来初始化Vuex的。<br>在代码开头，有这么一句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const options = this.$options
const { store, vuex } = options
// 感觉解构赋值真的很棒，这样写能省很多时间。
// 下面的是老写法
// const store = options.store
// const vuex = options.vuex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> options = <span class="hljs-keyword">this</span>.$options
<span class="hljs-keyword">const</span> { store, vuex } = options
<span class="hljs-comment">// 感觉解构赋值真的很棒，这样写能省很多时间。</span>
<span class="hljs-comment">// 下面的是老写法</span>
<span class="hljs-comment">// const store = options.store</span>
<span class="hljs-comment">// const vuex = options.vuex</span></code></pre>
<p>在这儿，用于是在Vue中调用，所以this指向Vue,而this.$options则是Vue的配置项。<br>也就是写Vue组件时的：<br><code>export default {……一些配置}</code><br>这里，就把Vue配置项的store和vuex抽离出来了。</p>
<h3 id="articleHeader4">搜寻store</h3>
<p>接下来，则看到了Vuex源代码的精妙之处：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store injection
if (store) {
  this.$store = store
} else if (options.parent &amp;&amp; options.parent.$store) {
  this.$store = options.parent.$store
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// store injection</span>
<span class="hljs-keyword">if</span> (store) {
  <span class="hljs-keyword">this</span>.$store = store
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (options.parent &amp;&amp; options.parent.$store) {
  <span class="hljs-keyword">this</span>.$store = options.parent.$store
}</code></pre>
<p>解构赋值并不是一定成功的，如果store在options中不存在，那么store就会是undefined。但是我们需要找store。<br>于是Vuex提供了向父级（Vue中的功能）寻找store的功能。不难看出，这儿父级的$store如果不存在，那么其实他也会到自己的父级去寻找。直到找到为止。<br>就想一条锁链一样，一层一层的连到最顶部store。所以在没有找到时，Vuex会给你报个错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 声明了Vuex但没有找到store时的状况
if (vuex) {
  if (!this.$store) {
    console.warn(
      '[vuex] store not injected. make sure to ' +
      'provide the store option in your root component.'
    )
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 声明了Vuex但没有找到store时的状况</span>
<span class="hljs-keyword">if</span> (vuex) {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.$store) {
    <span class="hljs-built_in">console</span>.warn(
      <span class="hljs-string">'[vuex] store not injected. make sure to '</span> +
      <span class="hljs-string">'provide the store option in your root component.'</span>
    )
  }</code></pre>
<h3 id="articleHeader5">对Vuex声明的内容，进行改造</h3>
<p>接下来，则是对Vuex声明的内容，进行改造。<br>首先的是获取Vuex对象的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let { state, getters, actions } = vuex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> { state, getters, actions } = vuex</code></pre>
<p>同时，在这儿还看到了对过时API的处理。感觉算是意料之外的惊喜。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// handle deprecated state option
// 如果使用state而不是getters来获取Store的数据，则会提示你state已经过时的，你需要使用新的api。
// 但是，这儿也做了兼容，确保升级时服务不会挂掉。
if (state &amp;&amp; !getters) {
  console.warn(
    '[vuex] vuex.state option will been deprecated in 1.0. ' +
    'Use vuex.getters instead.'
  )
  getters = state
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// handle deprecated state option</span>
<span class="hljs-comment">// 如果使用state而不是getters来获取Store的数据，则会提示你state已经过时的，你需要使用新的api。</span>
<span class="hljs-comment">// 但是，这儿也做了兼容，确保升级时服务不会挂掉。</span>
<span class="hljs-keyword">if</span> (state &amp;&amp; !getters) {
  <span class="hljs-built_in">console</span>.warn(
    <span class="hljs-string">'[vuex] vuex.state option will been deprecated in 1.0. '</span> +
    <span class="hljs-string">'Use vuex.getters instead.'</span>
  )
  getters = state
}</code></pre>
<p>接下来，则是对getters和actions的处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// getters
if (getters) {
  options.computed = options.computed || {}
  for (let key in getters) {
    defineVuexGetter(this, key, getters[key])
  }
}
// actions
if (actions) {
  options.methods = options.methods || {}
  for (let key in actions) {
    options.methods[key] = makeBoundAction(this.$store, actions[key], key)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// getters</span>
<span class="hljs-keyword">if</span> (getters) {
  options.computed = options.computed || {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> getters) {
    defineVuexGetter(<span class="hljs-keyword">this</span>, key, getters[key])
  }
}
<span class="hljs-comment">// actions</span>
<span class="hljs-keyword">if</span> (actions) {
  options.methods = options.methods || {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> actions) {
    options.methods[key] = makeBoundAction(<span class="hljs-keyword">this</span>.$store, actions[key], key)
  }
}</code></pre>
<p>可以看出，在这儿对getters和actions都进行了额外处理。<br>在这儿，我们讲述actions的额外处理，至于getters，涉及了过多的Vue，而我不是很熟悉。等我多钻研后，再写吧。</p>
<h2 id="articleHeader6">Actions的改造</h2>
<p>对整个Actions的改造，首先是Vuex的检测：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// actions
if (actions) {
  // options.methods是Vue的methods选项
  options.methods = options.methods || {}
  for (let key in actions) {
    options.methods[key] = makeBoundAction(this.$store, actions[key], key)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// actions</span>
<span class="hljs-keyword">if</span> (actions) {
  <span class="hljs-comment">// options.methods是Vue的methods选项</span>
  options.methods = options.methods || {}
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> actions) {
    options.methods[key] = makeBoundAction(<span class="hljs-keyword">this</span>.$store, actions[key], key)
  }
}</code></pre>
<p>在这儿，我们一点一点的剖析。可以看出，所有的actions，都会被<code>makeBoundAction</code>函数处理，并加入Vue的methods选项中。<br>那么看来，<code>makeBoundAction</code>函数就是我要找的答案了。<br>接下来贴出<code>makeBoundAction</code>函数的源代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Make a bound-to-store version of a raw action function.
 *
 * @param {Store} store
 * @param {Function} action
 * @param {String} key
 */

function makeBoundAction(store, action, key) {
  if (typeof action !== 'function') {
    console.warn(`[vuex] Action bound to key 'vuex.actions.${key}' is not a function.`)
  }
  return function vuexBoundAction(...args) {
    return action.call(this, store, ...args)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Make a bound-to-store version of a raw action function.
 *
 * @param {Store} store
 * @param {Function} action
 * @param {String} key
 */</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeBoundAction</span>(<span class="hljs-params">store, action, key</span>) </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> action !== <span class="hljs-string">'function'</span>) {
    <span class="hljs-built_in">console</span>.warn(<span class="hljs-string">`[vuex] Action bound to key 'vuex.actions.<span class="hljs-subst">${key}</span>' is not a function.`</span>)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">vuexBoundAction</span>(<span class="hljs-params">...args</span>) </span>{
    <span class="hljs-keyword">return</span> action.call(<span class="hljs-keyword">this</span>, store, ...args)
  }
}</code></pre>
<p>事情到这儿，其实已经豁然明朗了。<br>我在Vuex中传入的actions，实际会被处理为<code>vuexBoundAction</code>，并加入options.methods中。<br>在调用这个函数时，实际上的action会使用call，来改变this指向并传入store作为第一个参数。而store是有dispatch这个函数的。<br>那么，在我传入<code>{dispatch}</code>时，自然而然就会解构赋值。<br>这样的话，也形成了闭包，确保action能访问到store。</p>
<h2 id="articleHeader7">结语</h2>
<p>今天应该算是解决了心中的一个大疑惑，还是那句话：</p>
<blockquote><p>没有无缘无故的爱，也没有无缘无故的恨，更没有无缘无故冒出来的代码。</p></blockquote>
<p>整个源代码读下来一遍，虽然有些部分不太理解，但是对ES6和一些代码的使用的理解又加深了一步。比如这回就巩固了我关于ES6解构赋值的知识。而且还收获了很多别的东西。总而言之，收获颇丰~<br>最后的，依然是那句话：前端路漫漫，且行且歌。</p>
<p>最后附上本人博客地址和原文链接，希望能与各位多多交流。</p>
<blockquote><p><a href="http://www.lxxyx.win" rel="nofollow noreferrer" target="_blank">Lxxyx的前端乐园</a><br>原文链接：<a href="http://t.cn/RqSGLFR" rel="nofollow noreferrer" target="_blank">Vuex源码阅读笔记</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex源码阅读笔记

## 原文链接
[https://segmentfault.com/a/1190000004954409](https://segmentfault.com/a/1190000004954409)


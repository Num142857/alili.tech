---
title: 'vuex其实超简单,喝完这3步,还有3步' 
date: 2018-11-29 9:34:56
hidden: true
slug: uthb6hmfm5
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇 <a href="https://github.com/noahlam/articles/blob/master/vuex%E5%85%B6%E5%AE%9E%E8%B6%85%E7%AE%80%E5%8D%95%2C%E5%8F%AA%E9%9C%803%E6%AD%A5.md" rel="nofollow noreferrer" target="_blank">vuex其实超简单,只需3步</a><br>简单介绍了vuex的3步入门,不过为了初学者容易消化,我削减了很多内容,这一节,就是把少掉的内容补上,<br>如果你没看过上篇,请戳链接过去先看一下再回来,否则,你会觉得本文摸不着头脑.</p>
<blockquote>
<h4>纯属个人经验,难免有不正确的地方,如有发现,欢迎指正!</h4>
<p>还是一样,本文针对初学者.</p>
</blockquote>
<h3 id="articleHeader0">一、 <strong>Getter</strong>
</h3>
<p>我们先回忆一下上一篇的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
    getName(){
      return this.$store.state.name
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">computed:{
    getName(){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.name
    }
}</code></pre>
<p>这里假设现在逻辑有变,我们最终期望得到的数据(getName),是基于 <code>this.$store.state.name</code><br>上经过复杂计算得来的,刚好这个getName要在好多个地方使用,那么我们就得复制好几份.</p>
<p>vuex 给我们提供了 getter,请看代码 (<code>文件位置 /src/store/index.js</code>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 类似 vue 的 data
  state: {
    name: 'oldName'
  },
  // 类似 vue 的 computed -----------------以下5行为新增
  getters:{
    getReverseName: state => {
        return state.name.split('').reverse().join('')
    }
  },
  // 类似 vue 里的 mothods(同步方法)
  mutations: {
    updateName (state) {
      state.name = 'newName'
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">// 类似 vue 的 data</span>
  state: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'oldName'</span>
  },
  <span class="hljs-comment">// 类似 vue 的 computed -----------------以下5行为新增</span>
  getters:{
    <span class="hljs-attr">getReverseName</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> state.name.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>)
    }
  },
  <span class="hljs-comment">// 类似 vue 里的 mothods(同步方法)</span>
  mutations: {
    updateName (state) {
      state.name = <span class="hljs-string">'newName'</span>
    }
  }
})</code></pre>
<p>然后我们可以这样用 <code>文件位置 /src/main.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
    getName(){
      return this.$store.getters.getReverseName
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>computed:{
    getName(){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.getReverseName
    }
}</code></pre>
<p>事实上, getter 不止单单起到封装的作用,它还跟vue的computed属性一样,会缓存结果数据,<br>只有当依赖改变的时候,才要重新计算.</p>
<h3 id="articleHeader1">二、 <strong>actions和$dispatch</strong>
</h3>
<p>细心的你,一定发现我之前代码里 <code>mutations</code> 头上的注释了 <code>类似 vue 里的 mothods(同步方法)</code></p>
<p>为什么要在 <code>methods</code> 后面备注是同步方法呢? mutation只能是同步的函数,只能是同步的函数,只能是同步的函数!!<br>请看vuex的解释:</p>
<blockquote>现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，<br>devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不<br>可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调<br>用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。</blockquote>
<p>那么如果我们想触发一个异步的操作呢? 答案是: action + $dispatch, 我们继续修改store/index.js下面的代码</p>
<p><code>文件位置 /src/store/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 类似 vue 的 data
  state: {
    name: 'oldName'
  },
  // 类似 vue 的 computed
  getters:{
    getReverseName: state => {
        return state.name.split('').reverse().join('')
    }
  },
  // 类似 vue 里的 mothods(同步方法)
  mutations: {
    updateName (state) {
      state.name = 'newName'
    }
  },
  // 类似 vue 里的 mothods(异步方法) -------- 以下7行为新增
  actions: {
    updateNameAsync ({ commit }) {
      setTimeout(() => {
        commit('updateName')
      }, 1000)
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">// 类似 vue 的 data</span>
  state: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'oldName'</span>
  },
  <span class="hljs-comment">// 类似 vue 的 computed</span>
  getters:{
    <span class="hljs-attr">getReverseName</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> state.name.split(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>)
    }
  },
  <span class="hljs-comment">// 类似 vue 里的 mothods(同步方法)</span>
  mutations: {
    updateName (state) {
      state.name = <span class="hljs-string">'newName'</span>
    }
  },
  <span class="hljs-comment">// 类似 vue 里的 mothods(异步方法) -------- 以下7行为新增</span>
  actions: {
    updateNameAsync ({ commit }) {
      setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        commit(<span class="hljs-string">'updateName'</span>)
      }, <span class="hljs-number">1000</span>)
    }
  }
})</code></pre>
<p>然后我们可以再我们的vue页面里面这样使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    rename () {
        this.$store.dispatch('updateNameAsync')
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">methods: {
    rename () {
        <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'updateNameAsync'</span>)
    }
}</code></pre>
<h3 id="articleHeader2">三、 <strong>Module 模块化</strong>
</h3>
<p>当项目越来越大的时候,单个 store 文件,肯定不是我们想要的, 所以就有了模块化.<br>假设 <code>src/store</code> 目录下有这2个文件</p>
<p><code>moduleA.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state: { ... },
    getters: { ... },
    mutations: { ... },
    actions: { ... }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">state</span>: { ... },
    getters: { ... },
    mutations: { ... },
    actions: { ... }
}</code></pre>
<p><code>moduleB.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state: { ... },
    getters: { ... },
    mutations: { ... },
    actions: { ... }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">state</span>: { ... },
    getters: { ... },
    mutations: { ... },
    actions: { ... }
}</code></pre>
<p>那么我们可以把 <code>index.js</code> 改成这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import moduleA from './moduleA'
import moduleB from './moduleB'

export default new Vuex.Store({
    modules: {
        moduleA,
        moduleB
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> moduleA <span class="hljs-keyword">from</span> <span class="hljs-string">'./moduleA'</span>
<span class="hljs-keyword">import</span> moduleB <span class="hljs-keyword">from</span> <span class="hljs-string">'./moduleB'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    modules: {
        moduleA,
        moduleB
    }
})</code></pre>
<p>这样我们就可以很轻松的把一个store拆分成多个.</p>
<h3 id="articleHeader3">四、 <strong>总结</strong>
</h3>
<ol>
<li>actions 的参数是 <code>store</code> 对象,而 getters 和 mutations 的参数是 <code>state</code> .</li>
<li>actions 和 mutations 还可以传第二个参数,具体看vuex官方文档</li>
<li>getters/mutations/actions 都有对应的map,如: mapGetters , 具体看vuex官方文档</li>
<li>模块内部如果怕有命名冲突的话,可以使用命名空间, 具体看vuex官方文档</li>
<li>vuex 其实跟 vue 非常像,有data(state),methods(mutations,actions),computed(getters),还能模块化.</li>
</ol>
<p>如果觉得本文对您有用，请给本文的<a href="https://github.com/noahlam/articles" rel="nofollow noreferrer" target="_blank">github</a>加个star,万分感谢</p>
<p>另外，<a href="https://github.com/noahlam/articles" rel="nofollow noreferrer" target="_blank">github</a>上还有其他一些关于前端的教程和组件，有兴趣的童鞋可以看看，你们的支持就是我最大的动力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuex其实超简单,喝完这3步,还有3步

## 原文链接
[https://segmentfault.com/a/1190000014947431](https://segmentfault.com/a/1190000014947431)


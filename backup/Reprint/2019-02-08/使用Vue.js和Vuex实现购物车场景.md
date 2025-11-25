---
title: '使用Vue.js和Vuex实现购物车场景' 
date: 2019-02-08 2:30:41
hidden: true
slug: 05oeo86zaig
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://github.com/xiaoluoboding/vue-demo-collection/tree/vue2.x" rel="nofollow noreferrer" target="_blank">vue-demo-collection</a>已升级为2.x版本，<br>本文是基于vue全家桶1.x和webpack1.x写的demo，<br>查看2.x源码移步<a href="https://github.com/xiaoluoboding/vue-demo-collection/tree/vue2.x/shopping-cart" rel="nofollow noreferrer" target="_blank">shopping-cart2.x</a>，<br>查看1.x和2.x代码对比移步<a href="https://github.com/xiaoluoboding/vue-demo-collection/commit/6fbb1ee665d3da702681e25bc867eec2df6ee5f2" rel="nofollow noreferrer" target="_blank">shopping-cart源码比较</a>。</p></blockquote>
<p>本文是<a href="http://xlbd.me/vue-demo-github-file-explorer/" rel="nofollow noreferrer" target="_blank">上篇</a>文章的序章，一直想有机会再次实践下Vuex。写下这篇总结，See <a href="http://xiaoluoboding.github.io/vue-demo-collection/shopping-cart" rel="nofollow noreferrer" target="_blank">Demo</a>。</p>
<h3 id="articleHeader0">什么是Vuex？</h3>
<blockquote><p>Flux-inspired Application Architecture for Vue.js</p></blockquote>
<p>Vuex实际上是类<a href="https://facebook.github.io/flux/" rel="nofollow noreferrer" target="_blank">Flux</a>的数据管理架构。它主要帮我们更好的组织代码，更好的让Vue中的状态更好的通过状态管理维护起来。在实际项目运用中我们需要对组件的 <code>组件本地状态(component local state)</code> 和 <code>应用层级状态(application level state)</code> 进行区分。<br>Vuex的作用就是汇集应用层级的状态到一处，方便管理。</p>
<p>说状态其实有些同学可能不太理解，那么在刚上手Vue的时候做过的例子中，一个Vue实例中都会有data，那么这个data中保存的属性其实就是可以理解为状态。</p>
<p>试想这样的场景，比如一个Vue根实例下面有一个根组件名为<code>App.vue</code>，它下面有两个子组件<code>A.vue</code>和<code>B.vue</code>，父组件和子组件之间使用Props通讯是没问题的，通过绑定Props轻松的实现。</p>
<p>但是如果我们需要A.vue组件和B.vue组件之间通讯呢？因为<a href="http://xlbd.me/vue-demo-github-file-explorer/" rel="nofollow noreferrer" target="_blank">组件实例的作用域是孤立的</a>，它们之间是不能直接通讯的。那么只能借助共有的父组件通过<a href="http://cn.vuejs.org/guide/components.html#" rel="nofollow noreferrer" target="_blank">自定义事件</a>实现。</p>
<p>A组件想要和B组件通讯往往是这样的：</p>
<ul>
<li><p>A小弟说：“报告老大，能否帮我捎个信给你的小弟B组件？”，它需要<code>dispatch</code>一个事件给App</p></li>
<li><p>App老大说：“包在我身上”，它需要监听A组件<code>dispatch</code>的事件，同时需要<code>broadcast</code>一个事件给B组件。</p></li>
<li><p>B小弟说：“信息已收到。”，它需要<code>on</code>监听App组件分发的事件。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVypSJ?w=495&amp;h=361" src="https://static.alili.tech/img/bVypSJ?w=495&amp;h=361" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这只是<strong>一条</strong>通讯路径，那么如果父组件下有多个子组件，子组件之间通讯的路径就会变的很繁琐，父组件需要监听大量的事件，还需要负责分发给不同的子组件。很显然这并不是我们想要的组件化开发体验。</p>
<p>Vuex就是为了解决这一问题出现的。</p>
<h3 id="articleHeader1">Vuex是如何工作的？</h3>
<p>下面这张图很好的诠释了Vuex和组件之间的通讯关系。</p>
<p><span class="img-wrap"><img data-src="/img/bVvcIk?w=1400&amp;h=1100" src="https://static.alili.tech/img/bVvcIk?w=1400&amp;h=1100" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这张图描述的很棒，完整的数据流闭环，整个应用的数据流是单向的。对我们理解Vuex和Vue的组件间的通讯关系很有帮助。</p>
<p>需要掌握的：</p>
<ul>
<li><p>用户在组件中的输入操作触发 action 调用；</p></li>
<li><p>Actions 通过分发 mutations 来修改 store 实例的状态；</p></li>
<li><p>Store 实例的状态变化反过来又通过 getters 被组件获知。</p></li>
</ul>
<hr>
<h2 id="articleHeader2">使用Vuex</h2>
<p>进入正题。一个购物车我们都需要完成哪些功能？先看看<a href="http://xiaoluoboding.github.io/vue-demo-collection/shopping-cart" rel="nofollow noreferrer" target="_blank">Demo</a>的样子。</p>
<p><span class="img-wrap"><img data-src="/img/bVypSX?w=1366&amp;h=601" src="https://static.alili.tech/img/bVypSX?w=1366&amp;h=601" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">需求分析</h3>
<ul>
<li><p>显示商品的文字描述、图片描述、类型、价格信息；</p></li>
<li><p>改变商品颜色的时候图片切换；</p></li>
<li><p>改变商品类型的时候价格变化；</p></li>
<li><p>加入/移除购物车；</p></li>
<li><p>购物车中商品数量统计以及总价的统计；</p></li>
</ul>
<h3 id="articleHeader4">目录结构</h3>
<p>我参考了中型到大型项目的目录结构说明构建的购物车，把Vuex相关的代码分割到多个模块（module），我认为这样更清晰明了。</p>
<p><span class="img-wrap"><img data-src="/img/bVypSY?w=212&amp;h=433" src="https://static.alili.tech/img/bVypSY?w=212&amp;h=433" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">配置vuex</h3>
<p>每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着你应用里大部分的 状态(即 state)，我们创建<code>store.js</code>导入各个模块的初始状态和 mutations。</p>
<blockquote><p>store.js</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import index from './modules/index'

Vue.use(Vuex)

export default new Vuex.Store({
  // 组合各个模块
  modules: {
    index
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// vuex/store.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> index <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/index'</span>

Vue.use(Vuex)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">// 组合各个模块</span>
  modules: {
    index
  }
})</code></pre>
<p>通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中。</p>
<blockquote><p>App.vue</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Nav from './components/Nav.vue'
import store from './vuex/store'

export default {
  name: 'App',

  store,

  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
    }
  },

  components: {
    'cart-nav': Nav
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Nav <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Nav.vue'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'App'</span>,

  store,

  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// note: changing this line won't causes changes</span>
      <span class="hljs-comment">// with hot-reload because the reloaded component</span>
      <span class="hljs-comment">// preserves its current state and we are modifying</span>
      <span class="hljs-comment">// its initial state.</span>
    }
  },

  <span class="hljs-attr">components</span>: {
    <span class="hljs-string">'cart-nav'</span>: Nav
  }
}</code></pre>
<h3 id="articleHeader6">组件中通过getters读取状态</h3>
<p>配合ES6的箭头函数真的很简洁的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vuex: {
  getters: {
    iPhone6S: ({ index }) => index.iPhone6S
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">vuex: {
  <span class="hljs-attr">getters</span>: {
    <span class="hljs-attr">iPhone6S</span>: <span class="hljs-function">(<span class="hljs-params">{ index }</span>) =&gt;</span> index.iPhone6S
  }
}</code></pre>
<h3 id="articleHeader7">理解数据流闭环</h3>
<p>比如我们需要根据更改外观来改变商品的图片这样的需求。我们该怎样完成一个数据流闭环呢？</p>
<p>从组件开始：</p>
<p>一（<code>Vue components</code>）、首先子组件<code>Index.vue</code>需要一个点击事件来触发action：</p>
<blockquote><p><strong>Index.vue</strong></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<li v-for=&quot;styleUrl in iPhone6S.style&quot;
    @click=&quot;changeStyle($key, styleUrl)&quot;
    :class=&quot;{active: iPhone6S.activeStyleUrl == styleUrl}&quot;><span v-text=&quot;$key&quot;></span></li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"styleUrl in iPhone6S.style"</span>
    @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeStyle($key, styleUrl)"</span>
    <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: iPhone6S.activeStyleUrl == styleUrl}"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"$key"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<p>二（<code>Actions</code>）、声明一个名为<code>changeStyle</code>的action</p>
<blockquote><p><strong>actions.js</strong></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const changeStyle = makeAction('CHANGE_STYLE')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> changeStyle = makeAction(<span class="hljs-string">'CHANGE_STYLE'</span>)</code></pre>
<p>并分发mutations，用统一的函数处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeAction</span> (<span class="hljs-params">type</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">{ dispatch }, ...args</span>) =&gt;</span> dispatch(type, ...args)
}</code></pre>
<p>三（<code>Mutations</code>）、我们用常量声明mutation，并把它放到单独的地方。mutation常量习惯性大写的，区分于actions。</p>
<blockquote><p><strong>mutation-types.js</strong></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const CHANGE_STYLE = 'CHANGE_STYLE'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CHANGE_STYLE = <span class="hljs-string">'CHANGE_STYLE'</span></code></pre>
<p>四（<code>State</code>）、在模块中导入mutation改变状态：</p>
<blockquote><p><strong>index.js</strong></p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[CHANGE_STYLE] (state, styleName, styleUrl) {
  state.iPhone6S.activeStyle = styleName
  state.iPhone6S.activeStyleUrl = styleUrl
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[CHANGE_STYLE] (state, styleName, styleUrl) {
  state.iPhone6S.activeStyle = styleName
  state.iPhone6S.activeStyleUrl = styleUrl
}</code></pre>
<blockquote><p>由于 Vuex store 内部的 state 对象被 Vue 改造成了响应式对象，当我们对 state 进行修改时，任何观测着 state 的 Vue 组件都会自动地进行相应地更新。</p></blockquote>
<p>使用Vuex管理状态并不是需要把所有的状态都放在Vuex里。如上所述，组件本地状态是不需要写在Vuex里的。</p>
<h3 id="articleHeader8">组件不允许直接修改 store 实例的状态</h3>
<p>在使用vuex的过程中你有可能会对从vuex.getters获取的数据进行再次操作。这是不允许的。改变 store 中的状态的唯一途径就是显式地分发 <strong>状态变更事件</strong></p>
<blockquote><p>组件永远都不应该直接改变 Vuex store 的状态。因为我们想要让状态的每次改变都很明确且可追踪，Vuex 状态的所有改变都必须在 store 的 mutation handler (变更句柄)中管理。</p></blockquote>
<h3 id="articleHeader9">使用Vue Tools调试vuex</h3>
<p>使用Vue Tools调试vuex是一个非常愉快的体验，可以在<code>Components</code><br>中清楚的看到哪些数据是从vuex.getters中获取来的。</p>
<p><span class="img-wrap"><img data-src="/img/bVypS6?w=1031&amp;h=560" src="https://static.alili.tech/img/bVypS6?w=1031&amp;h=560" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>它记录了每次mutation的状态变化，保存了状态变化后的快照，我们可以定位到你想检查的快照观察数据的变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVypTb?w=857&amp;h=555" src="https://static.alili.tech/img/bVypTb?w=857&amp;h=555" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>原文: <a href="http://xlbd.me/vue-vuex-shopping-cart/" rel="nofollow noreferrer" target="_blank">使用Vue.js和Vuex实现购物车场景</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue.js和Vuex实现购物车场景

## 原文链接
[https://segmentfault.com/a/1190000005780326](https://segmentfault.com/a/1190000005780326)


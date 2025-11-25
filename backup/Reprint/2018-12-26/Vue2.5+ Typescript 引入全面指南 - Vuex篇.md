---
title: 'Vue2.5+ Typescript 引入全面指南 - Vuex篇' 
date: 2018-12-26 2:30:14
hidden: true
slug: pglhof0t2th
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vue2.5+ Typescript 引入全面指南 - Vuex篇</h1>
<p>系列目录：</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000011853167">Vue2.5+ Typescript 引入全面指南</a></li>
<li>Vue2.5+ Typescript 引入全面指南 - Vuex篇</li>
</ul>
<h1 id="articleHeader1">前言</h1>
<p>Vuex 正是我下决心引入Typescript的核心痛点。与 vuex 相关的代码中，到处充斥着此般写法：</p>
<p><span class="img-wrap"><img data-src="/img/bVXWwk?w=600&amp;h=391" src="https://static.alili.tech/img/bVXWwk?w=600&amp;h=391" alt="Vuex Trouble 1" title="Vuex Trouble 1" style="cursor: pointer; display: inline;"></span></p>
<p>再加上vuex的 <code>dispatch/commit</code> 并非直接引用代码，而是是通过一个string类型的 <code>type</code> 来标记，如此一来上图中写法，如果想查看 <code>payload</code> 的具体内容，甚至不能借助于编辑器的查找定义，只能手动去切代码查看！简直苦不堪言。</p>
<p>而借助于 <code>typescript</code> 的 <code>interface</code> 接口，至少可以简化成如下效果：</p>
<p><span class="img-wrap"><img data-src="/img/bVXWwt?w=490&amp;h=153" src="https://static.alili.tech/img/bVXWwt?w=490&amp;h=153" alt="Vuex Payload Interface" title="Vuex Payload Interface" style="cursor: pointer; display: inline;"></span></p>
<p>这么写一样麻烦，不是还需要记类似PostLoginParams的Interface类型？这简单，建个辅助函数就是：</p>
<p><span class="img-wrap"><img data-src="/img/bVXWwB?w=624&amp;h=142" src="https://static.alili.tech/img/bVXWwB?w=624&amp;h=142" alt="Vuex Payload Helper Function" title="Vuex Payload Helper Function" style="cursor: pointer;"></span></p>
<p>编辑器里一个 <code>Ctrl + 空格</code>，<code>payload</code>里有哪些参数就全出来，再也不用去一遍遍翻代码，效率直线提升！</p>
<p><span class="img-wrap"><img data-src="/img/bVXWxu?w=455&amp;h=99" src="https://static.alili.tech/img/bVXWxu?w=455&amp;h=99" alt="Vuex dispatch Intellisense" title="Vuex dispatch Intellisense" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">现状概述</h1>
<p>截至当前2017年11月，Vuex对Typescript的支持，仍十分薄弱，官方库只是添加了一些<code>.d.ts</code>声明文件，并没有像<code>vue 2.5</code>这样内置支持。</p>
<p>第三方衍生库 <code>vuex-typescript</code>, <code>vuex-ts-decorators</code>, <code>vuex-typex</code>, <code>vuex-class</code>等等，我个人的总结，除了<code>vuex-class</code>外，基本都存在侵入性太强的问题，引用不算友好。而<code>vuex-class</code>提供的功能其实也是薄薄一层，并不能解决核心痛点。因此，需要手动添加辅助的地方，其实颇多。</p>
<p>核心痛点：每次调用 <code>this.$store.dispatch</code> / <code>this.$store.commit</code> / <code>this.$store.state</code>/ <code>this.$store.getters</code> 都会伴随着类型丢失。</p>
<p>其中，<code>dispatch/commit</code> 可以通过建立辅助函数形式，简单绕开。 <code>state/getters</code> 没有太好办法，只能手动指定，若觉得麻烦，可以全都指成 <code>any</code>，等官方支持。官方动态见此 <a href="https://github.com/vuejs/vuex/issues/564" rel="nofollow noreferrer" target="_blank">issue</a></p>
<h1 id="articleHeader3">动手改造第一步：从 shopping-cart 示例搬运代码</h1>
<blockquote><p>以下示例基于 <code>vuex</code> 官方 <code>examples</code> 中最复杂的一个 <a href="https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart" rel="nofollow noreferrer" target="_blank">shopping-cart</a>，<br>改造后的完整代码见 <a href="https://github.com/qidaizhe11/vue-vuex-typescript-demo" rel="nofollow noreferrer" target="_blank">vue-vuex-typescript-demo</a></p></blockquote>
<p>准备工作：</p>
<ul>
<li>
<code>shopping-cart</code>代码复制至项目目录下</li>
<li>
<code>.js</code>文件统一重命名为<code>.ts</code>，</li>
<li>
<code>currency.js</code>/<code>api/shop.js</code>/<code>components/App.vue</code>等外围文件的ts改造</li>
<li>
<code>npm i -D vuex</code> 添加依赖</li>
</ul>
<p>详细步骤这里略去，参照 <a href="https://github.com/qidaizhe11/vue-vuex-typescript-demo" rel="nofollow noreferrer" target="_blank">代码库</a> 即可</p>
<h1 id="articleHeader4">动手改造第二步：State改造</h1>
<p>用到state变量的地方实在太多，不仅<code>store</code>目录下 action/getter/mutation 均有可能需要，甚至在 <code>.vue</code> 文件里，<code>mapState</code>也有引用，因此我个人总结的一套实践：</p>
<ul>
<li>store/modules下的每个子模块，均维护自己名为 State 的 Interface 声明</li>
<li>store/index.ts 文件中，汇总各子模块，维护一个总的State声明</li>
</ul>
<p><code>store/modules</code> 下文件举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/modules/cart.ts

interface Shape {
  id: number
  quantity: number
}

export interface State {
  added: Shape[]
  checkoutStatus: 'successful' | 'failed' | null
}

// initial state
// shape: [{ id, quantity }]
const state: State = {
  added: [],
  checkoutStatus: null
}

// 需引用state的地方举例：

const getters = {
  checkoutStatus: (state: State) => state.checkoutStatus
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// ./src/store/modules/cart.ts

interface Shape {
  id: number
  quantity: number
}

export interface State {
  added: Shape[]
  checkoutStatus: 'successful' | 'failed' | null
}

// initial <span class="hljs-keyword">state</span>
// shape: [{ id, quantity }]
const <span class="hljs-keyword">state</span>: State = {
  added: [],
  checkoutStatus: null
}

// 需引用<span class="hljs-keyword">state</span>的地方举例：

const getters = {
  checkoutStatus: (<span class="hljs-keyword">state</span>: State) =&gt; <span class="hljs-keyword">state</span>.checkoutStatus
}
</code></pre>
<p><code>store/index.ts</code> 文件总 State 举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/index.ts

import { State as CardState } from './modules/cart'
import { State as ProductsState } from './modules/products'

export interface State {
  cart: CardState,
  products: ProductsState
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// ./src/store/index.ts</span>

<span class="hljs-keyword">import</span> { State <span class="hljs-keyword">as</span> CardState } <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/cart'</span>
<span class="hljs-keyword">import</span> { State <span class="hljs-keyword">as</span> ProductsState } <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/products'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> State {
  cart: CardState,
  products: ProductsState
}
</code></pre>
<p>总 <code>State</code> 引用示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/getters.ts

import { State } from './index'

const cartProducts: Getter<State, any> = (state: State) => {
  return state.cart.added.map(shape => {
    // 此处shape自动推导出Shape类型
    // ... 详见源码
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// ./src/store/getters.ts</span>

<span class="hljs-keyword">import</span> { State } <span class="hljs-keyword">from</span> <span class="hljs-string">'./index'</span>

<span class="hljs-keyword">const</span> cartProducts: Getter&lt;State, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-function">(<span class="hljs-params">state: State</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> state.cart.added.map(<span class="hljs-function"><span class="hljs-params">shape</span> =&gt;</span> {
    <span class="hljs-comment">// 此处shape自动推导出Shape类型</span>
    <span class="hljs-comment">// ... 详见源码</span>
  })
}
</code></pre>
<p>如此，所有直接引用 <code>state</code> 的地方，均可启用类型推导</p>
<h1 id="articleHeader5">动手改造之 Mutation</h1>
<p><code>Mutation</code> 对应 <code>store.commit</code> 命令，常见写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const mutations = {
  [types.ADD_TO_CART] (state, { id }) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const mutations = {
  [types.ADD_TO_CART] (<span class="hljs-keyword">state</span>, { id }) {
    // ...
  }
}</code></pre>
<p>state 上步已处理<code>{ id }</code>，<code>payload</code> 参数，即为开篇介绍类型缺失的重灾区。</p>
<p>我的一套个人实践：</p>
<ul>
<li>
<code>store/modules</code> 下的子模块文件，为自己的<code>mutations</code> 维护 payload Interface声明</li>
<li>子模块共用 payload（多个模块响应同一 commit 等），在 <code>store/index.ts</code> 中统一维护</li>
<li>新建文件 <code>store/dispatches.ts</code> 文件，为每一个直接调用的带参<code>commit</code>维护辅助函数，以应用类型推导</li>
</ul>
<p>子模块 <code>payload</code> 声明举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/modules/products.ts

import { Product, AddToCartPayload } from '../index'

export interface ProductsPayload {
  products: Product[]
}

const mutations = {
  [types.RECEIVE_PRODUCTS] (state: State, payload: ProductsPayload) {
    state.all = payload.products
  },

  [types.ADD_TO_CART] (state: State, payload: AddToCartPayload) {
    const product = state.all.find(p => p.id === payload.id)
    // ...
  }
}

// mutations调用举例：
const actions = {
  getAllProducts (context: ActionContextBasic) {
    shop.getProducts((products: Product[]) => {
      const payload: ProductsPayload = {
        products
      }
      context.commit(types.RECEIVE_PRODUCTS, payload)
    })
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// ./src/store/modules/products.ts

import { Product, AddToCartPayload } <span class="hljs-keyword">from</span> '../index'

export interface ProductsPayload {
  products: Product[]
}

const mutations = {
  [types.RECEIVE_PRODUCTS] (<span class="hljs-keyword">state</span>: State, payload: ProductsPayload) {
    <span class="hljs-keyword">state</span>.<span class="hljs-literal">all</span> = payload.products
  },

  [types.ADD_TO_CART] (<span class="hljs-keyword">state</span>: State, payload: AddToCartPayload) {
    const product = <span class="hljs-keyword">state</span>.<span class="hljs-literal">all</span>.find(p =&gt; p.id === payload.id)
    // ...
  }
}

// mutations调用举例：
const actions = {
  getAllProducts (context: ActionContextBasic) {
    shop.getProducts((products: Product[]) =&gt; {
      const payload: ProductsPayload = {
        products
      }
      context.commit(types.RECEIVE_PRODUCTS, payload)
    })
  }
}
</code></pre>
<p><code>store/index.ts</code>文件公共 <code>payload</code> 声明举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/index.ts

export interface AddToCartPayload {
  id: number
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// ./src/store/index.ts</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> AddToCartPayload {
  id: <span class="hljs-built_in">number</span>
}</code></pre>
<p><code>store/dispatches.ts</code>文件，<code>commit</code>辅助函数，参见下步同文件<code>dispatch</code>辅助函数</p>
<h1 id="articleHeader6">动手改造之 Action</h1>
<p><code>Action</code> 对应 <code>store.dispatch</code> 命令，常见写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
  checkout ({ commit, state }, products) {
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const actions = {
  checkout ({ commit, <span class="hljs-keyword">state</span> }, products) {
    // ...
  }
}</code></pre>
<p>其中第二个参数<code>products</code>，<code>payload</code> 参数，用法同上步 <code>Mutation</code> 的 <code>payload</code> 参数，不再赘述。</p>
<p>第一个参数<code>{ commit, state }</code>，<code>context</code>参数，<code>vuex</code> 的 <code>d.ts</code> 提供有类型 <code>ActionContext</code>，用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { ActionContext } from 'vuex'
const actions = {
  checkout (context: ActionContext<State, any>, products: CartProduct[]) {
    context.commit(types.CHECKOUT_REQUEST)
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { ActionContext } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">const</span> actions = {
  checkout (context: ActionContext&lt;State, <span class="hljs-built_in">any</span>&gt;, products: CartProduct[]) {
    context.commit(types.CHECKOUT_REQUEST)
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p><code>ActionContext&lt;State, RootState&gt;</code> 传入两个大部分Action根本用不到的参数，才能得到需要的<code>dispatch</code>, <code>commit</code>，在我看来，难用至极。</p>
<p>个人更喜欢如下写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
  checkout (context: { commit: Commit, state: State }, products: CartProduct[]) {
    context.commit(types.CHECKOUT_REQUEST)
    // ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const actions = {
  checkout (<span class="hljs-string">context:</span> { <span class="hljs-string">commit:</span> Commit, <span class="hljs-string">state:</span> State }, <span class="hljs-string">products:</span> CartProduct[]) {
    context.commit(types.CHECKOUT_REQUEST)
    <span class="hljs-comment">// ...</span>
  }
}</code></pre>
<p><code>Action</code> payload 改造参见步骤 <code>Mutation</code>，不再赘述。</p>
<p><code>store/dispatches.ts</code>文件，<code>dispatch</code>辅助函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/dispatches.ts

import store, { CartProduct, Product } from './index'

export const dispatchCheckout = (products: CartProduct[]) => {
  return store.dispatch('checkout', products)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./src/store/dispatches.ts</span>

<span class="hljs-keyword">import</span> store, { CartProduct, Product } <span class="hljs-keyword">from</span> <span class="hljs-string">'./index'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> dispatchCheckout = <span class="hljs-function">(<span class="hljs-params">products: CartProduct[]</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> store.dispatch(<span class="hljs-string">'checkout'</span>, products)
}</code></pre>
<p><code>.vue</code>文件调用举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/components/Cart.vue

import { dispatchCheckout } from '../store/dispatches'
export default Vue.extend({
  methods: {
    checkout (products: CartProduct[]) {
    // this.$store.dispatch 写法可用，但不带类型推导
    // this.$store.dispatch('checkout', products)
    dispatchCheckout(products) // 带有类型智能提示
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// ./src/components/Cart.vue

<span class="hljs-keyword">import</span> { dispatchCheckout } from <span class="hljs-string">'../store/dispatches'</span>
export <span class="hljs-keyword">default</span> Vue.extend({
  methods: {
    checkout (products: CartProduct[]) {
    // this.$store.dispatch 写法可用，但不带类型推导
    // this.$store.dispatch(<span class="hljs-string">'checkout'</span>, products)
    dispatchCheckout(products) // 带有类型智能提示
    }
  }
})</code></pre>
<h1 id="articleHeader7">动手改造之 Getter</h1>
<p><code>Getter</code>常见写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getters = {
  checkoutStatus: state => state.checkoutStatus
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const getters = {
  checkoutStatus: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.checkoutStatus
}</code></pre>
<p>需要改的不多，state 加上声明即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getters = {
  checkoutStatus: (state: State) => state.checkoutStatus
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const getters = {
  checkoutStatus: (<span class="hljs-keyword">state</span>: State) =&gt; <span class="hljs-keyword">state</span>.checkoutStatus
}</code></pre>
<h1 id="articleHeader8">动手改造之独立的 Mutations/Actions/Getters 文件</h1>
<p>独立文件常规写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/getters.js
export const cartProducts = state => {
  return state.cart.added.map(({ id, quantity }) => {
    const product = state.products.all.find(p => p.id === id)
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// ./src/store/getters.js
export const cartProducts = <span class="hljs-keyword">state</span> =&gt; {
  return <span class="hljs-keyword">state</span>.cart.added.map(({ id, quantity }) =&gt; {
    const product = <span class="hljs-keyword">state</span>.products.<span class="hljs-literal">all</span>.find(p =&gt; p.id === id)
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}</code></pre>
<p>引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/index.js

import * as getters from './getters'
export default new Vuex.Store({
  getters
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./src/store/index.js</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getters'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  getters
})</code></pre>
<p><code>typescript</code>下均需改造：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/
import { GetterTree, Getter } from 'vuex'
import { State } from './index'

const cartProducts: Getter<State, any> = (state: State) => {
  return state.cart.added.map(shape => {
    // ...
  })
}

const getterTree: GetterTree<State, any> = {
  cartProducts
}

export default getterTree" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// ./src/</span>
<span class="hljs-keyword">import</span> { GetterTree, Getter } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> { State } <span class="hljs-keyword">from</span> <span class="hljs-string">'./index'</span>

<span class="hljs-keyword">const</span> cartProducts: Getter&lt;State, <span class="hljs-built_in">any</span>&gt; = <span class="hljs-function">(<span class="hljs-params">state: State</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> state.cart.added.map(<span class="hljs-function"><span class="hljs-params">shape</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
  })
}

<span class="hljs-keyword">const</span> getterTree: GetterTree&lt;State, <span class="hljs-built_in">any</span>&gt; = {
  cartProducts
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> getterTree</code></pre>
<blockquote><p>Actions/Mutations 文件改造同上，类型换成 ActionTree, Action, MutationTree, Mutation即可</p></blockquote>
<p>引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/store/index.js

import getters from './getters'
export default new Vuex.Store({
  getters
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./src/store/index.js</span>

<span class="hljs-keyword">import</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getters'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  getters
})</code></pre>
<p>原因是<code>vuex</code>定义，<code>new Vuex.Store</code>参数类型 StoreOptions 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  actions?: ActionTree<S, S>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<S>;
  plugins?: Plugin<S>[];
  strict?: boolean;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export interface StoreOptions<span class="hljs-variable">&lt;S&gt;</span> {
  <span class="hljs-keyword">state</span>?: S;
  getters?: GetterTree<span class="hljs-variable">&lt;S, S&gt;</span>;
  actions?: ActionTree<span class="hljs-variable">&lt;S, S&gt;</span>;
  mutations?: MutationTree<span class="hljs-variable">&lt;S&gt;</span>;
  modules?: ModuleTree<span class="hljs-variable">&lt;S&gt;</span>;
  plugins?: Plugin<span class="hljs-variable">&lt;S&gt;</span>[];
  strict?: boolean;
}</code></pre>
<p>于是，独立Gettes/Actions/Mutations文件，export 必须是GetterTree/ActionTree/MutationTree类型</p>
<h1 id="articleHeader9">动手改造之 .vue 文件调用</h1>
<ul>
<li>传统写法全部兼容，只需 <code>mapState</code>为state添加类型 (state: State) =&gt; state.balabal 等很少改动即可正常运行。只是类型均为 <code>any</code>
</li>
<li>建议不使用 <code>mapState</code> / <code>mapGetters</code> / <code>mapActions</code> / <code>mapMutations</code>，以明确指定类型</li>
<li>
<code>dispatch</code> 及 <code>commit</code> 调用可通过上述 <code>store/dispatches.ts</code> 下辅助函数，手动开启类型推导</li>
<li>
<code>state</code> 及 <code>getters</code> 类型推导，暂时只能手动指定。自动推导，估计得等官方内置支持了。</li>
</ul>
<p>完整调用示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./src/components/ProductList.vue

import Vue from 'vue'
// import { mapGetters, mapActions } from 'vuex'
import { Product } from '../store'
import { dispatchAddToCart } from '../store/dispatches'

export default Vue.extend({
  computed: {
    // ...mapGetters({
    //   products: 'allProducts'
    // })
    products (): Product[] {
      return this.$store.getters.allProducts
    }
  },
  methods: {
    // ...mapActions([
    //   'addToCart'
    // ])
    addToCart (p: Product) {
      dispatchAddToCart(p)
    }
  },
  created () {
    this.$store.dispatch('getAllProducts')
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// ./src/components/ProductList.vue

<span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>
// <span class="hljs-keyword">import</span> { mapGetters, mapActions } from <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> { Product } from <span class="hljs-string">'../store'</span>
<span class="hljs-keyword">import</span> { dispatchAddToCart } from <span class="hljs-string">'../store/dispatches'</span>

export <span class="hljs-keyword">default</span> Vue.extend({
  computed: {
    // ...mapGetters({
    //   products: <span class="hljs-string">'allProducts'</span>
    // })
    products (): Product[] {
      return this.$store.getters.allProducts
    }
  },
  methods: {
    // ...mapActions([
    //   <span class="hljs-string">'addToCart'</span>
    // ])
    addToCart (p: Product) {
      dispatchAddToCart(p)
    }
  },
  created () {
    this.$store.dispatch(<span class="hljs-string">'getAllProducts'</span>)
  }
})</code></pre>
<h1 id="articleHeader10">vue-class-component + vuex-class 组件式写法</h1>
<p>如果觉得以上废弃 <code>mapState</code> / <code>mapGetters</code> 后的写法繁琐，可引入<code>vue-class-component</code> + <code>vuex-class</code>，开启组件式写法</p>
<ul>
<li>
<code>vue-class-component</code>，vue官方维护，学习成本低</li>
<li>
<code>vuex-class</code>，作者 <code>ktsn</code>，vuex及vue-class-component贡献排第二（第一尤雨溪了）的活跃开发者，质量还是有保障的</li>
</ul>
<p>引入这俩依赖后，须在 <code>tsconfig.json</code> 添加配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;compilerOptions&quot;: {
    // 启用 vue-class-component 及 vuex-class 需要开启此选项
    &quot;experimentalDecorators&quot;: true,

    // 启用 vuex-class 需要开启此选项
    &quot;strictFunctionTypes&quot;: false
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>{
  <span class="hljs-string">"compilerOptions"</span>: {
    <span class="hljs-regexp">//</span> 启用 vue-<span class="hljs-class"><span class="hljs-keyword">class</span>-<span class="hljs-title">component</span> 及 <span class="hljs-title">vuex</span>-<span class="hljs-title">class</span> 需要开启此选项</span>
    <span class="hljs-string">"experimentalDecorators"</span>: <span class="hljs-literal">true</span>,

    <span class="hljs-regexp">//</span> 启用 vuex-<span class="hljs-class"><span class="hljs-keyword">class</span> 需要开启此选项</span>
    <span class="hljs-string">"strictFunctionTypes"</span>: <span class="hljs-literal">false</span>
  }
}</code></pre>
<p><code>Component</code> 写法示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import { Product } from '../store'
// import { dispatchAddToCart } from '../store/dispatches'
import Component from 'vue-class-component'
import { Getter, Action } from 'vuex-class'

@Component
export default class Cart extends Vue {
  @Getter('cartProducts') products: CartProduct[]
  @Getter('checkoutStatus') checkoutStatus: CheckoutStatus
  @Action('checkout') actionCheckout: Function

  get total (): number {
    return this.products.reduce((total, p) => {
      return total + p.price * p.quantity
    }, 0)
  }

  checkout (products: CartProduct[]) {
    // dispatchCheckout(products)
    this.actionCheckout(products)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">Vue</span> from <span class="hljs-symbol">'vu</span>e'
<span class="hljs-keyword">import</span> { <span class="hljs-type">Product</span> } from '../store'
<span class="hljs-comment">// import { dispatchAddToCart } from '../store/dispatches'</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">Component</span> from <span class="hljs-symbol">'vue</span>-<span class="hljs-class"><span class="hljs-keyword">class</span><span class="hljs-title">-component</span>'</span>
<span class="hljs-keyword">import</span> { <span class="hljs-type">Getter</span>, <span class="hljs-type">Action</span> } from <span class="hljs-symbol">'vuex</span>-<span class="hljs-class"><span class="hljs-keyword">class</span>'</span>

<span class="hljs-meta">@Component</span>
export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cart</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Vue</span> </span>{
  <span class="hljs-meta">@Getter</span>(<span class="hljs-symbol">'cartProduct</span>s') products: <span class="hljs-type">CartProduct</span>[]
  <span class="hljs-meta">@Getter</span>(<span class="hljs-symbol">'checkoutStatu</span>s') checkoutStatus: <span class="hljs-type">CheckoutStatus</span>
  <span class="hljs-meta">@Action</span>(<span class="hljs-symbol">'checkou</span>t') actionCheckout: <span class="hljs-type">Function</span>

  get total (): number {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.products.reduce((total, p) =&gt; {
      <span class="hljs-keyword">return</span> total + p.price * p.quantity
    }, <span class="hljs-number">0</span>)
  }

  checkout (products: <span class="hljs-type">CartProduct</span>[]) {
    <span class="hljs-comment">// dispatchCheckout(products)</span>
    <span class="hljs-keyword">this</span>.actionCheckout(products)
  }
}</code></pre>
<h1 id="articleHeader11">总结</h1>
<p>在现阶段 <code>vuex</code> 官方未改进 <code>typescript</code> 支持下，用 typescript 写 vuex 代码，的确有些繁琐，而且支持也称不上全面，不过，总比没有强。哪怕都用 <code>any</code>，也能借助智能提示减轻一些代码翻来翻去的痛苦。</p>
<p>至于再进一步更完美的支持，等官方更新吧。</p>
<h1 id="articleHeader12">完整代码</h1>
<p>见 Github 库：<a href="https://github.com/qidaizhe11/vue-vuex-typescript-demo" rel="nofollow noreferrer" target="_blank">vue-vuex-typescript-demo</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.5+ Typescript 引入全面指南 - Vuex篇

## 原文链接
[https://segmentfault.com/a/1190000011864013](https://segmentfault.com/a/1190000011864013)


---
title: 'Vuex — The core of Vue application' 
date: 2019-02-05 2:30:09
hidden: true
slug: zzwkiran7ls
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>系列文章:</p>
<ol>
<li><p><a href="https://segmentfault.com/a/1190000006435886">Vue 2.0 升（cai）级（keng）之旅</a></p></li>
<li><p>Vuex — The core of Vue application (本文)</p></li>
<li><p><a href="https://segmentfault.com/a/1190000007753975" target="_blank">从单页应用(SPA)到服务器渲染(SSR)</a></p></li>
</ol>
<p>当今，谈到状态管理首先想到的肯定是 Redux，而随着 Vue 2.0 的发布，Vuex 也伴随着推出了最新版，本文就带你对照 Redux 来看看刚刚出炉的 Vuex 2.0。</p>
<p>有关 Redux 的基础概念在本文中会简要略过，如再一一赘述篇幅就太长了，不了解的可以看一下本人之前写的有关 Redux 的两篇文章：</p>
<ol>
<li><p><a href="https://segmentfault.com/a/1190000005925630">Redux 入门</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006056167" target="_blank">Redux 进阶</a></p></li>
</ol>
</blockquote>
<h2 id="articleHeader0">为什么说 Vuex 是 Vue 应用的核心？</h2>
<p>众所周知，一个应用的外观可以千变万化，但无论如何变化，它都需要一样东西去支撑，那就是——<strong>数据</strong>。这个数据是广义上的，可以是数据库中的数据，也可以是当前应用所处的状态，甚至可以是 <a href="https://webrtc.org/" rel="nofollow noreferrer" target="_blank">WebRTC</a>, <a href="https://developers.google.com/web/updates/2015/07/interact-with-ble-devices-on-the-web" rel="nofollow noreferrer" target="_blank">Web Bluetooth</a> 等一系列实时数据。</p>
<blockquote><p>在 vue 应用中，vuex 就充当了<strong>数据</strong>提供者的角色，vue 则只需要关注页面的展示与交互。</p></blockquote>
<p>既然，明确了以 vuex 为核心，那么就来看看如何在 vue 应用中使用 vuex？</p>
<p>随着 Vue 2.0 的发布，Vuex 在近期也随之推出 2.0 版。在<a href="https://segmentfault.com/a/1190000006435886">上一篇文章</a>中有提到作者的博客是用 vue 2.0 搭建的，但之前并没有添加 vuex，现在正可以借此机会将 vuex 添加到项目中。</p>
<p>本文将介绍 Vuex 2.0 的同时，分享一些本人在这个过程中的一些心得。</p>
<p>首先，当然是核心的核心 Store。</p>
<h2 id="articleHeader1">Store</h2>
<p>Store 用来存放整个应用的 state。</p>
<p>那怎么建立 store 哪？由于，Vuex 2.0 刚刚推出，最新的 API 还得看 <a href="https://github.com/vuejs/vuex/releases" rel="nofollow noreferrer" target="_blank">Release Note</a>。</p>
<p>创建一个 Store 非常简单只需 <code>new Vuex.Store({ ...options })</code>，其中，<code>options</code> 可以是一下几种：</p>
<ul>
<li><p>state <code>Object</code>：存放应用状态</p></li>
<li><p>actions <code>Object</code>：注册 <code>action</code></p></li>
<li><p>mutations <code>Object</code>：注册 <code>mutation</code></p></li>
<li><p>getters <code>Object</code>：注册 <code>getter</code></p></li>
<li><p>modules <code>Object</code>：注册 <code>module</code></p></li>
<li><p>plugins <code>Array&lt;Function&gt;</code>：注册中间件</p></li>
<li><p>strict <code>Boolean</code>：是否开启严格模式，严格模式下所有对 state 的变化必须通过 <code>mutation</code> 来修改，反之抛出异常，默认不开启。</p></li>
</ul>
<p>或许你不了解这些属性的含义，没关系，之后每个还会分别解释。</p>
<p>明白了属性的含义，那么创建一个 store 的代码就可能会是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store.js
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/logger';

import blog from './module/blog';

// 在 Vue 中，注册 Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
    modules: {
        blog
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// store.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex/logger'</span>;

<span class="hljs-keyword">import</span> blog <span class="hljs-keyword">from</span> <span class="hljs-string">'./module/blog'</span>;

<span class="hljs-comment">// 在 Vue 中，注册 Vuex</span>
Vue.use(Vuex);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">state</span>: {},
    <span class="hljs-attr">plugins</span>: process.env.NODE_ENV !== <span class="hljs-string">'production'</span> ? [createLogger()] : [],
    <span class="hljs-attr">modules</span>: {
        blog
    }
});</code></pre>
<p>store 创建完成之后，就可以在根组件中使用了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import store from '../vuex';
import router from './router';
import './blog';

new Vue({
    store,
    router,
    template: '<blog></blog>'
}).$mount('#app');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex'</span>;
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./blog'</span>;

<span class="hljs-keyword">new</span> Vue({
    store,
    router,
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;blog&gt;&lt;/blog&gt;'</span>
}).$mount(<span class="hljs-string">'#app'</span>);</code></pre>
<p>个人看来，一个状态管理的应用，无论是使用 vuex，还是 redux，最困难的部分是在 store 的<strong>设计</strong>。</p>
<blockquote><p>究竟该如何设计一个 store，是根据组件的结构层次设计对应的 store，还是根据应用数据来设计 store？</p></blockquote>
<p>由于，store 是存放整个应用状态的地方，所以，起初我认为应该是前者按组件的层次结构去设计。这样 store 中分别保存着每个组件的状态，这对大型项目来说或许会造成大量的冗余数据存储在 store 中，以及一些重复的工作，但这也提供了简洁鲜明的层次结构，增强了项目的可维护性，这对大型项目来说更至关重要。</p>
<p>但伴随着写项目时的思考，我渐渐推翻了之前的想法。</p>
<p>假设这样一个场景，项目中有两个互不相关的组件，但它们俩却依赖同一份数据源。如果，这时采用之前的设计方法，那么这同一份数据源会被存放在 store 的两个不同的位置。那么此时，如果一个组件需要对数据源进行操作的话，它不但需要修改自己组件对应的 state，同时还要发起 action 来修改另一个组件的 state，这恰恰违背了组件的单一性。</p>
<p>然而，使用应用数据来设计 store 就不会有这样的问题。鉴于这个原因，我现在更倾向于第二个理念来设计整个应用的 store。</p>
<p>所以，当项目开始时，要考虑到整个应用的数据模型来设计 store 真是相当麻烦啊。</p>
<p>谈完了 store，就再一个个来看刚刚创建 store 时所提到的属性，state 就是用来保存状态的，没啥好说的，直接来看看第二个 <code>actions</code>。</p>
<h3 id="articleHeader2">Actions</h3>
<p><code>actions</code> 是一个对象，key 就是 action 的名字，value 就是对应的 action。此处的 action，无论从名字，还是作用都和 redux 中的 action 相同，用于激发 state 的变更。但是，它们的用法却不相同。</p>
<p>Redux 中的 action 需要返回一个 JS 对象，即使加了 thunk 中间件之后，能够返回一个函数，但这个函数最终返回的还是一个 JS 对象，最后通过，<code>store.dispatch</code> 该对象来触发 state 的变更。</p>
<p>然而，Vuex 中的 action 它本身就是一个方法，并且这个方法并不需要任何的返回，而是，通过 <code>store.commit</code> 来触发 <code>mutation</code>。</p>
<blockquote><p>Vuex 2.0 中，已将原先的 <code>store.dispatch</code> 改名为了 <code>store.commit</code> 来触发 <code>mutation</code>。  <br>Vuex 2.0 中，并没有移除 <code>store.dispatch</code>，而是改为用于触发 <code>action</code>。</p></blockquote>
<p>所有 action 方法接受当前 store 的实例作为第一个参数，调用传递的参数会作为第二个参数传入（暂不支持多参数）。</p>
<h3 id="articleHeader3">Mutations</h3>
<p><code>mutations </code> 也是一个对象，同 <code>actions</code> 类似，key 就是 mutation 的名字，value 就是对应的 mutation。</p>
<p>mutation 用于更新应用的 state。Redux 中虽然没有 mutation 这个词，但从上面的解释就明白，这同 redux 中的 reduce 起着相同的作用。</p>
<p>但两者在写法上又有着不同，由于 vuex 中的 <code>mutations</code> 是一个对象，并借用 ES6 对象方法可以<strong>使用变量</strong>和<strong>省略</strong>的特点，调用 <code>mutation</code> 可以直接通过命名找到相应的处理方法，这使得它比 redux 的一系列 switch/case 语句要更简单、更优雅。</p>
<p>更大的不同之处在于 redux 的 reduce 是要求返回一个新的 state，而 vuex 就如它的命名 mutations（变异）是对当前 state 进行操作，而不能返回一个新的 state，这里就和 FP 的理念有所冲突了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mutations.js
export default {
    // work
    [LOAD_SOCIAL_LINK](state = {}, mutation = {}) {
        state.socialLinkList = mutation.payload
            .filter(item => !!item.link)
            .map(item => ({
                ...item,
                svgPath: svgPath + '#' + item.name
            }));
    }
    
    // not work
    [LOAD_SOCIAL_LINK](state = {}, mutation = {}) {
        state = {
            ...state,
            socialLinkList: mutation.payload
                .filter(item => !!item.link)
                .map(item => ({
                    ...item,
                    svgPath: svgPath + '#' + item.name
                }))
        };
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// mutations.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// work</span>
    [LOAD_SOCIAL_LINK](state = {}, mutation = {}) {
        state.socialLinkList = mutation.payload
            .filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> !!item.link)
            .map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> ({
                ...item,
                <span class="hljs-attr">svgPath</span>: svgPath + <span class="hljs-string">'#'</span> + item.name
            }));
    }
    
    <span class="hljs-comment">// not work</span>
    [LOAD_SOCIAL_LINK](state = {}, mutation = {}) {
        state = {
            ...state,
            <span class="hljs-attr">socialLinkList</span>: mutation.payload
                .filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> !!item.link)
                .map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> ({
                    ...item,
                    <span class="hljs-attr">svgPath</span>: svgPath + <span class="hljs-string">'#'</span> + item.name
                }))
        };
    }
};</code></pre>
<p>单就这点来看，redux 略胜一筹。</p>
<h3 id="articleHeader4">Getters</h3>
<p><code>Getters</code> 也是一个对象，用于注册 getter，每个 getter 都是一个 <code>function</code> 用于返回一部分的 state。</p>
<p>getter 方法接受 state 作为第一个参数，一个简单的 <code>getters</code> 就可能是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    // 省略...
    getters: {
        socialLinkList: state => state.socialLinkList
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// 省略...</span>
    getters: {
        <span class="hljs-attr">socialLinkList</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.socialLinkList
    }
};</code></pre>
<blockquote><p>掌握了 Store, Actions, Mutations 以及 Getters 这几个概念，那你就掌握了 vuex 的核心，已经完全可以创建一个完整的 store，并可以使用了。</p></blockquote>
<p>但随着项目的增长，你会发现将 Actions, Mutations, Getters 全都写在一起非常难以维护，这时你会想念 Redux 中将 state 划分处理的 <code>combineReducers</code>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760693?w=205&amp;h=246" src="https://static.alili.tech/img/remote/1460000006760693?w=205&amp;h=246" alt="Wake up!" title="Wake up!" style="cursor: pointer;"></span></p>
<p>醒醒！别想 Redux 啦，Vuex 也可以划分处理 state 树，它就是接着就要提到的 <code>modules</code>。</p>
<h3 id="articleHeader5">Modules</h3>
<p><code>Modules</code> 的作用就如它的名字，划分模块。</p>
<p>它的属性也是一个对象，key 是对应的 module 名，在 state 中会创建相应的 key，而 value 是一个用于配置如何创建 module 的对象，该对象的属性基本同创建 store 时的 <code>options</code> 对象一样，只少了最后 2 个还没有讲到的属性 <code>plugins</code> 和 <code>strict</code>。这两者是不是有什么关系哪？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Store {
  constructor (options = {}) {
    // 省略...
    
    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], options)
    
    // 省略...
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> </span>{
  <span class="hljs-keyword">constructor</span> (options = {}) {
    <span class="hljs-comment">// 省略...</span>
    
    <span class="hljs-comment">// init root module.</span>
    <span class="hljs-comment">// this also recursively registers all sub-modules</span>
    <span class="hljs-comment">// and collects all module getters inside this._wrappedGetters</span>
    installModule(<span class="hljs-keyword">this</span>, state, [], options)
    
    <span class="hljs-comment">// 省略...</span>
  }</code></pre>
<p>从 vuex 创建的源码中可以看到，其实，store 它本身就是一个 module。</p>
<p>既然，<code>modules</code> 中能配置 <code>modules</code> 那就意味着：模块是可以嵌套的。那么，使用 <code>modules</code> 就可以将 state 划分为各个模块，同 <code>combineReducers</code> 一样可以化繁为简，这对中大型项目来说必不可少。</p>
<p>一个 module 的定义就可以是这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// nav module
import mutations from './mutations';
import actions from './actions';

export default {
    state: {},
    getters: {
        navList: state => state.navList
    },
    actions,
    mutations
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// nav module</span>
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations'</span>;
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">state</span>: {},
    <span class="hljs-attr">getters</span>: {
        <span class="hljs-attr">navList</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.navList
    },
    actions,
    mutations
};</code></pre>
<blockquote><p>警报！前方第 6 行有坑，请速速绕行。</p></blockquote>
<p>第 6 行？</p>
<p><code>state: {},</code> 初始化 state 能有什么问题啊？</p>
<p>当你运行你的应用的时候，你会发现，如果 navList 的变化是由一个同步的方法返回的就没有问题，但如果，它是通过异步方法返回的，你会发现虽然控制台上的 mutation log 输出正确，但你的组件中并没有得到正确的值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006673175" src="https://static.alili.tech/img/remote/1460000006673175" alt="What happened?" title="What happened?" style="cursor: pointer; display: inline;"></span></p>
<p>因为，当 action 调用之后会计算一次 getter，如果是同步的，那么此时 getter 的 state 中已经保存着最新的数据。</p>
<p>但如果是异步的，那么此时 getter 中的 state 是一个空对象，那么上例中的 <code>state.navList</code> 就会返回一个 <code>undefined</code>。然而，<code>undefined</code> 就不会进入 vue 的 watch 系统，所以当异步请求结束后，即使 state 中对应字段变为了目标值，但也不会再调用 getter 了，组件中的值自然也不会更新了。</p>
<p>那怎么解决哪？那就是给 state 中的每个属性设初始值，这样在第一次计算 getter 的值时就会返回对应的初始值，而这个初始值是在 vue 的系统中的，所以当异步请求结束后调用 mutation 改变 state 中对应的值后，getter 会自动触发更新，此时，组件中对应的值也就被修改了。</p>
<p>所以，一定要记得：</p>
<blockquote>
<p>为每个属性设置初始化 state ！！！</p>
<p>为每个属性设置初始化 state ！！！</p>
<p>为每个属性设置初始化 state ！！！</p>
</blockquote>
<p>重要的话，说三遍！！！</p>
<blockquote><p>最后，在使用 <code>modules</code> 还需要注意，在不同 <code>modules</code> 下，注册的 action 或 mutation 的名字重复并不会报错，但都会被调用，所以要<strong>注意命名</strong>。</p></blockquote>
<p>好，<code>modules</code> 讲完了，继续看下一个属性 <code>plugins</code>。</p>
<h3 id="articleHeader6">Plugins</h3>
<p>vuex 自 1.0 版开始就将原先的 <code>middlewares</code> 替换成了 <code>plugins</code>。也就是说，现在使用的 <code>plugins</code> 就是中间件。</p>
<p><code>plugins</code> 的参数终于同之前的有所不同了，是一个数组，数组中的每一项都是一个方法，方法接受一个参数就是当前 store 的实例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // vuex source code: apply plugins
    plugins.concat(devtoolPlugin).forEach(plugin => plugin(this))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">    <span class="hljs-comment">// vuex source code: apply plugins</span>
    plugins.concat(devtoolPlugin).forEach(<span class="hljs-function"><span class="hljs-params">plugin</span> =&gt;</span> plugin(<span class="hljs-keyword">this</span>))</code></pre>
<p>vuex 中间件的编写理解起来也十分容易，就是通过 <code>store.subscribe</code> 来订阅 mutation 的变化，这比 redux 中间件的工作原理更容易理解。</p>
<p>最后的 <code>strict</code> 属性之前已经提到了，就是用来设置时候开启严格模式的，严格模式下，state 只能通过 mutation 来修改。</p>
<p>至此，创建 vuex store 的所有属性都讲完了，store 也就完成了，那么，vue 的组件该如何和 vuex 的 store 链接起来哪？</p>
<h2 id="articleHeader7">连接到组件</h2>
<p>vuex 1.0 之前如何将 vuex 连接到组件在这里就不说了，有兴趣可以上<a href="http://vuex.vuejs.org/en/index.html" rel="nofollow noreferrer" target="_blank">官网</a>上看看。</p>
<p>主要来看看如何使用 vue 2.0 新增的 4 个 helper 方法<strong>优雅</strong>地将 vuex 连接到组件。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006673177" src="https://static.alili.tech/img/remote/1460000006673177" alt="" title="" style="cursor: pointer;"></span></p>
<p>这 4 个 helper 方法，分别是：</p>
<ul>
<li><p>mapState</p></li>
<li><p>mapMutations</p></li>
<li><p>mapGetters</p></li>
<li><p>mapActions</p></li>
</ul>
<p>常言道：口说无凭。</p>
<p>我们就来看一个博客升级中的简单例子，没有加入 vuex 前，本人博客的首页是这样设定的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// home.js
import Vue from 'vue';

import PostService from '../../../common/service/PostService';

import img from '../../../assets/img/home-bg.jpg';
import template from './home.html';

const Home = Vue.extend({
    template,
    data: () => {
        return {
            header: {
                img,
                title: 'D.D Blog',
                subtitle: 'Share More, Gain More.'
            },
            postList: []
        };
    },
    created() {
        const postService = new PostService();
        postService.queryPostList().then(({postList}) => (this.postList = postList));
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// home.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

<span class="hljs-keyword">import</span> PostService <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../common/service/PostService'</span>;

<span class="hljs-keyword">import</span> img <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../assets/img/home-bg.jpg'</span>;
<span class="hljs-keyword">import</span> template <span class="hljs-keyword">from</span> <span class="hljs-string">'./home.html'</span>;

<span class="hljs-keyword">const</span> Home = Vue.extend({
    template,
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">header</span>: {
                img,
                <span class="hljs-attr">title</span>: <span class="hljs-string">'D.D Blog'</span>,
                <span class="hljs-attr">subtitle</span>: <span class="hljs-string">'Share More, Gain More.'</span>
            },
            <span class="hljs-attr">postList</span>: []
        };
    },
    created() {
        <span class="hljs-keyword">const</span> postService = <span class="hljs-keyword">new</span> PostService();
        postService.queryPostList().then(<span class="hljs-function">(<span class="hljs-params">{postList}</span>) =&gt;</span> (<span class="hljs-keyword">this</span>.postList = postList));
    }
});</code></pre>
<p>这里我们回顾一下之前的所讲，为 home 组件创建对应的 store module。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
// mutation types
const INIT_HOME_PAGE = 'INIT_HOME_PAGE';
const LOAD_POST_LIST = 'LOAD_POST_LIST';

// actions
const initHomePage = ({dispatch, commit}) => {
    commit(createAction(INIT_HOME_PAGE, {
        header: {
            image,
            title: 'D.D Blog',
            subtitle: 'Share More, Gain More.'
        }
    }));
    dispatch('loadPostList');
};

const loadPostList = ({commit}) => {
    new PostService().queryPostList()
        .then((result = {}) => {
            commit(createAction(LOAD_POST_LIST, {
                postsList: result.postsList
            }));
        });
};

const actions = {initHomePage, loadPostList};

// mutations
const mutations = {
    [INIT_HOME_PAGE](state = {}, mutation = {}) {
        state.header = mutation.payload.header;
    },

    [LOAD_POST_LIST](state = {}, mutation = {}) {
        state.postsList = mutation.payload.postsList;
    }
};

export default {
    state: {
        header: {},
        postsList: []
    },
    getters: {
        postsList: state => state.postsList
    },
    actions,
    mutations
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// index.js</span>
<span class="hljs-comment">// mutation types</span>
<span class="hljs-keyword">const</span> INIT_HOME_PAGE = <span class="hljs-string">'INIT_HOME_PAGE'</span>;
<span class="hljs-keyword">const</span> LOAD_POST_LIST = <span class="hljs-string">'LOAD_POST_LIST'</span>;

<span class="hljs-comment">// actions</span>
<span class="hljs-keyword">const</span> initHomePage = <span class="hljs-function">(<span class="hljs-params">{dispatch, commit}</span>) =&gt;</span> {
    commit(createAction(INIT_HOME_PAGE, {
        <span class="hljs-attr">header</span>: {
            image,
            <span class="hljs-attr">title</span>: <span class="hljs-string">'D.D Blog'</span>,
            <span class="hljs-attr">subtitle</span>: <span class="hljs-string">'Share More, Gain More.'</span>
        }
    }));
    dispatch(<span class="hljs-string">'loadPostList'</span>);
};

<span class="hljs-keyword">const</span> loadPostList = <span class="hljs-function">(<span class="hljs-params">{commit}</span>) =&gt;</span> {
    <span class="hljs-keyword">new</span> PostService().queryPostList()
        .then(<span class="hljs-function">(<span class="hljs-params">result = {}</span>) =&gt;</span> {
            commit(createAction(LOAD_POST_LIST, {
                <span class="hljs-attr">postsList</span>: result.postsList
            }));
        });
};

<span class="hljs-keyword">const</span> actions = {initHomePage, loadPostList};

<span class="hljs-comment">// mutations</span>
<span class="hljs-keyword">const</span> mutations = {
    [INIT_HOME_PAGE](state = {}, mutation = {}) {
        state.header = mutation.payload.header;
    },

    [LOAD_POST_LIST](state = {}, mutation = {}) {
        state.postsList = mutation.payload.postsList;
    }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">state</span>: {
        <span class="hljs-attr">header</span>: {},
        <span class="hljs-attr">postsList</span>: []
    },
    <span class="hljs-attr">getters</span>: {
        <span class="hljs-attr">postsList</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.postsList
    },
    actions,
    mutations
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const createAction = (typeName = '', data = '') => ({ type: typeName, payload: data });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">const createAction = (<span class="hljs-built_in">type</span>Name = <span class="hljs-string">''</span>, data = <span class="hljs-string">''</span>) =&gt; ({ <span class="hljs-built_in">type</span>: <span class="hljs-built_in">type</span>Name, payload: data });</code></pre>
<p>这里的 <code>createAction</code> 是自己创建的一个简单函数，用于格式化 <code>mutation</code> 获得的参数，这并不是必须的，vuex 的 <code>commit</code> 方法是接受参数为 <code>(type, data)</code> 的。</p>
<p>OK。对应的 store module 也创建好了，就来改组件吧。</p>
<p>首先，应用的状态都来自于 store，那么组件中的 <code>data</code> 属性自然就不用了，直接删除。爽~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Home = Vue.extend({
    template,
    created() {
        const postService = new PostService();
        postService.queryPostList().then(({postList}) => (this.postList = postList));
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> Home = Vue.extend({
    template,
    created() {
        <span class="hljs-keyword">const</span> postService = <span class="hljs-keyword">new</span> PostService();
        postService.queryPostList().then(<span class="hljs-function">(<span class="hljs-params">{postList}</span>) =&gt;</span> (<span class="hljs-keyword">this</span>.postList = postList));
    }
});</code></pre>
<p>其次，原先在 created hooks 里直接去查数据，现在用了 vuex 自然要通过调用 action 来获取数据，这里就要用到 4 大金刚之一——<code>mapActions</code> 来获取 vuex 中设定好的 action。</p>
<p><code>mapActions</code> 接受一个数组或对象，根据相应的值将对应的 action 绑定到组件上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {mapActions} from 'vuex';

const Home = Vue.extend({
    template,
    methods: mapActions(['initHomePage']),
    created() {
        this.initHomePage();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> {mapActions} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;

<span class="hljs-keyword">const</span> Home = Vue.extend({
    template,
    <span class="hljs-attr">methods</span>: mapActions([<span class="hljs-string">'initHomePage'</span>]),
    created() {
        <span class="hljs-keyword">this</span>.initHomePage();
    }
});</code></pre>
<p>数据拿到了，怎么绑定到组件上哪？这就可以用到另两个 helper：<code>mapState</code> 和 <code>mapGetters</code>。</p>
<p><code>mapState</code> 和 <code>mapGetters</code> 同样接受一个数组或对象，并根据相应的值将 store 中的 state 或 getter 绑定到组件上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex';

import template from './home.html';

const Home = vue.extend({
    template,
    computed: {
        ...mapState({
            header: state => state.home.header
        }),
        ...mapGetters(['postsList'])
    },
    methods: mapActions(['initHomePage']),
    created() {
        this.initHomePage();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> { mapState, mapGetters, mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;

<span class="hljs-keyword">import</span> template <span class="hljs-keyword">from</span> <span class="hljs-string">'./home.html'</span>;

<span class="hljs-keyword">const</span> Home = vue.extend({
    template,
    <span class="hljs-attr">computed</span>: {
        ...mapState({
            <span class="hljs-attr">header</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.home.header
        }),
        ...mapGetters([<span class="hljs-string">'postsList'</span>])
    },
    <span class="hljs-attr">methods</span>: mapActions([<span class="hljs-string">'initHomePage'</span>]),
    created() {
        <span class="hljs-keyword">this</span>.initHomePage();
    }
});</code></pre>
<p>哈哈，这样模板不用改变一分一毫，升级就完成啦~</p>
<p>是不是很简洁，很优雅~</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006673179" src="https://static.alili.tech/img/remote/1460000006673179" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">容器组件和展示组件</h2>
<p>容器组件和展示组件这个概念在 <a href="https://segmentfault.com/a/1190000005925630">Redux 入门</a>一文中已有提到。然而，这个概念并不只服务于 react，在 vue 中也可以用到。</p>
<p>简单来说，容器组件就是用于包裹展示组件的组件，它和界面展示无关，它负责数据的获取和传递，之前的 home 组件就是一个容器组件，再来看看它的 template，你会发现它除了根元素以外，不包含其他任何的 html 标签。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<section>
    <!-- Content Header -->
    <content-header :board-img=&quot;header.image&quot; :title=&quot;header.title&quot; :subtitle=&quot;header.subtitle&quot;></content-header>

    <!-- Main Content -->
    <main-content>
        <post-list :post-list=&quot;postsList&quot;></post-list>
    </main-content>
</section>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="Html"><span class="hljs-tag">&lt;<span class="hljs-name">section</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Content Header --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">content-header</span> <span class="hljs-attr">:board-img</span>=<span class="hljs-string">"header.image"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"header.title"</span> <span class="hljs-attr">:subtitle</span>=<span class="hljs-string">"header.subtitle"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">content-header</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Main Content --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">main-content</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">post-list</span> <span class="hljs-attr">:post-list</span>=<span class="hljs-string">"postsList"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">post-list</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main-content</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">section</span>&gt;</span></code></pre>
<p>与此相反的是，展示组件单单用于展示，自己不获取任何数据，数据都通过 <code>props</code> 传递，比如 content-header。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const template = `<header class=&quot;intro-header&quot; :style=&quot;{ backgroundImage: 'url(' + boardImg + ')' }&quot;>
    <div class=&quot;container&quot;>
        <div class=&quot;row&quot;>
            <div class=&quot;col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1&quot;>
                <div class=&quot;site-heading&quot;>
                    <h1>"{{" title "}}"</h1>
                    <hr class=&quot;small&quot;>
                    <span class=&quot;subheading&quot;>"{{" subtitle "}}"</span>
                </div>
            </div>
        </div>
    </div>
</header>`;

export default Vue.component('contentHeader', {
    template,
    props: {
        boardImg: {
            type: String,
            default: _defaultImg
        },
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> template = <span class="hljs-string">`&lt;header class="intro-header" :style="{ backgroundImage: 'url(' + boardImg + ')' }"&gt;
    &lt;div class="container"&gt;
        &lt;div class="row"&gt;
            &lt;div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"&gt;
                &lt;div class="site-heading"&gt;
                    &lt;h1&gt;"{{" title "}}"&lt;/h1&gt;
                    &lt;hr class="small"&gt;
                    &lt;span class="subheading"&gt;"{{" subtitle "}}"&lt;/span&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/header&gt;`</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue.component(<span class="hljs-string">'contentHeader'</span>, {
    template,
    <span class="hljs-attr">props</span>: {
        <span class="hljs-attr">boardImg</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
            <span class="hljs-attr">default</span>: _defaultImg
        },
        <span class="hljs-attr">title</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
            <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
        },
        <span class="hljs-attr">subtitle</span>: {
            <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>
        }
    }
});</code></pre>
<p>这样明确地区分容器组件和展示组件会使得项目结构变得更清晰，追踪 bug ，以及维护也变得轻而易举。</p>
<h2 id="articleHeader9">管理路由</h2>
<p>是不是觉得这样就完了？</p>
<p>No, No, No. 路由系统还没处理，那么如何将 vue-router 纳入到 vuex 的管理中哪？</p>
<p>这里又得感谢尤大大为我们造好了一个小工具 <strong><a href="https://github.com/vuejs/vuex-router-sync" rel="nofollow noreferrer" target="_blank">vuex-router-sync</a></strong>。</p>
<p>首先，安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex-router-sync@next --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="Bash" style="word-break: break-word; white-space: initial;">npm install vuex-router-sync@next --save</code></pre>
<p>然后，在项目初始化的时候将 router 同 store 联系起来就行，简单到都不知道说啥好。</p>
<p>不知道说啥，就说说原理，看看源码吧。</p>
<p>这个工具的原理也非常好理解，主要是 2 点：</p>
<p>一是，给 vuex 的 store 注册一个 router 的 module。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function patchStore (store) {
  // 略...
  var routeModule = {
    mutations: {
      'router/ROUTE_CHANGED': function (state, to) {
        store.state.route = to
      }
    }
  }

  // add module
  if (store.registerModule) {
    store.registerModule('route', routeModule)
  } else if (store.module) {
    store.module('route', routeModule)
  } else {
    store.hotUpdate({
      modules: {
        route: routeModule
      }
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patchStore</span> (<span class="hljs-params">store</span>) </span>{
  <span class="hljs-comment">// 略...</span>
  <span class="hljs-keyword">var</span> routeModule = {
    <span class="hljs-attr">mutations</span>: {
      <span class="hljs-string">'router/ROUTE_CHANGED'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">state, to</span>) </span>{
        store.state.route = to
      }
    }
  }

  <span class="hljs-comment">// add module</span>
  <span class="hljs-keyword">if</span> (store.registerModule) {
    store.registerModule(<span class="hljs-string">'route'</span>, routeModule)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (store.module) {
    store.module(<span class="hljs-string">'route'</span>, routeModule)
  } <span class="hljs-keyword">else</span> {
    store.hotUpdate({
      <span class="hljs-attr">modules</span>: {
        <span class="hljs-attr">route</span>: routeModule
      }
    })
  }
}</code></pre>
<p>另一个，就是使用 vue-router 的 afterEach hooks 来触发 mutation。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.sync = function (store, router) {
  patchStore(store)
  store.router = router

  var commit = store.commit || store.dispatch
  // 略...
  
  // sync store on router navigation
  router.afterEach(function (transition) {
    if (isTimeTraveling) {
      isTimeTraveling = false
      return
    }
    var to = transition.to
    currentPath = to.path
    commit('router/ROUTE_CHANGED', to)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">exports.sync = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">store, router</span>) </span>{
  patchStore(store)
  store.router = router

  <span class="hljs-keyword">var</span> commit = store.commit || store.dispatch
  <span class="hljs-comment">// 略...</span>
  
  <span class="hljs-comment">// sync store on router navigation</span>
  router.afterEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">transition</span>) </span>{
    <span class="hljs-keyword">if</span> (isTimeTraveling) {
      isTimeTraveling = <span class="hljs-literal">false</span>
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-keyword">var</span> to = transition.to
    currentPath = to.path
    commit(<span class="hljs-string">'router/ROUTE_CHANGED'</span>, to)
  })
}</code></pre>
<p>项目中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { sync } from 'vuex-router-sync';
import store from '../vuex';
import router from './router';

sync(store, router);

new Vue({
    store,
    router,
    template: '<blog></blog>'
}).$mount('#app');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> { sync } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex-router-sync'</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex'</span>;
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>;

sync(store, router);

<span class="hljs-keyword">new</span> Vue({
    store,
    router,
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;blog&gt;&lt;/blog&gt;'</span>
}).$mount(<span class="hljs-string">'#app'</span>);</code></pre>
<p>OK，这样就大功告成了。</p>
<h2 id="articleHeader10">写在最后</h2>
<p>加入了 vuex 后，我的博客终于让 vue 它们一家子（vue + vuex + vue-router）团圆了。</p>
<p>总的来看，vuex 同 vue 一样使用起来相当方便，集成了许多方法，但似乎缺少了 redux 的那份优雅，而我喜欢比较优雅的...（看在全篇我都在安利 vue 的情面上，尤大大请不要打我~）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006673181" src="https://static.alili.tech/img/remote/1460000006673181" alt="逃~" title="逃~" style="cursor: pointer; display: inline;"></span></p>
<p>PS: 一下把 vuex 有关的一股脑都过了，可能过得太快，如有不明白的就留言吧。</p>
<p>最后的最后，当然是继续安利下自己的 <a href="http://discipled.me/" rel="nofollow noreferrer" target="_blank">Blog</a>，以及 <a href="https://github.com/DiscipleD/blog" rel="nofollow noreferrer" target="_blank">Source Code</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex — The core of Vue application

## 原文链接
[https://segmentfault.com/a/1190000006673171](https://segmentfault.com/a/1190000006673171)


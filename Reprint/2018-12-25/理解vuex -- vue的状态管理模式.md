---
title: '理解vuex -- vue的状态管理模式' 
date: 2018-12-25 2:30:11
hidden: true
slug: ettyhffxnno
categories: [reprint]
---

{{< raw >}}

                    
<p>备注：本文的示例等代码将会采用es6的语法。</p>
<h2 id="articleHeader0">链接</h2>
<ul>
<li><a href="https://vuex.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vuex官方中文网站</a></li>
<li><a href="https://github.com/willemwei/goods" rel="nofollow noreferrer" target="_blank">[使用vue和vuex实现的简易商城，仅供参考]</a></li>
</ul>
<h2 id="articleHeader1">vuex是什么？</h2>
<p>先引用vuex官网的话：</p>
<blockquote>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</blockquote>
<p><strong>状态管理模式</strong>、<strong>集中式存储管理</strong> 一听就很高大上，蛮吓人的。在我看来 <strong>vuex</strong> 就是把需要共享的变量全部存储在一个对象里面，然后将这个对象放在顶层组件中供其他组件使用。这么说吧，将vue想作是一个js文件、组件是函数，那么vuex就是一个全局变量，只是这个“全局变量”包含了一些特定的规则而已。</p>
<p>在vue的组件化开发中，经常会遇到需要将当前组件的状态传递给其他组件。父子组件通信时，我们通常会采用 <strong>props</strong> + <strong>emit</strong> 这种方式。但当通信双方不是父子组件甚至压根不存在相关联系，或者一个状态需要共享给多个组件时，就会非常麻烦，数据也会相当难维护，这对我们开发来讲就很不友好。<strong>vuex</strong> 这个时候就很实用，不过在使用vuex之后也带来了更多的概念和框架，需慎重！</p>
<h2 id="articleHeader2">vuex里面都有些什么内容？</h2>
<p><strong>Talk is cheap,Show me the code.</strong> 先来一段代码间隔下这么多的文字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
    state: {
        name: 'weish',
        age: 22
    },
    getters: {
        personInfo(state) {
            return `My name is ${state.name}, I am ${state.age}`;
        }
    }
    mutations: {
        SET_AGE(state, age) {
            commit(age, age);
        }
    },
    actions: {
        nameAsyn({commit}) {
            setTimeout(() => {
                commit('SET_AGE', 18);
            }, 1000);
        }
    },
    modules: {
        a: modulesA
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: {
        name: 'weish',
        age: <span class="hljs-number">22</span>
    },
    getters: {
        personInfo(<span class="hljs-keyword">state</span>) {
            return `My name is ${<span class="hljs-keyword">state</span>.name}, I am ${<span class="hljs-keyword">state</span>.age}`;
        }
    }
    mutations: {
        SET_AGE(<span class="hljs-keyword">state</span>, age) {
            commit(age, age);
        }
    },
    actions: {
        nameAsyn({commit}) {
            <span class="hljs-built_in">set</span>Timeout(() =&gt; {
                commit('SET_AGE', <span class="hljs-number">18</span>);
            }, <span class="hljs-number">1000</span>);
        }
    },
    modules: {
        a: modulesA
    }
}</code></pre>
<p>这个就是最基本也是完整的vuex代码；<strong>vuex</strong> 包含有五个基本的对象：</p>
<ul>
<li>
<strong>state</strong>：存储状态。也就是变量；</li>
<li>
<strong>getters</strong>：派生状态。也就是set、get中的get，有两个可选参数：state、getters分别可以获取state中的变量和其他的getters。外部调用方式：<strong>store.getters.personInfo()</strong>。就和vue的computed差不多；</li>
<li>
<strong>mutations</strong>：提交状态修改。也就是set、get中的set，这是vuex中唯一修改state的方式，但不支持异步操作。第一个参数默认是state。外部调用方式：<strong>store.commit('SET_AGE', 18)</strong>。和vue中的methods类似。</li>
<li>
<strong>actions</strong>：和mutations类似。不过actions支持异步操作。第一个参数默认是和store具有相同参数属性的对象。外部调用方式：<strong>store.dispatch('nameAsyn')</strong>。</li>
<li>
<strong>modules</strong>：store的子模块，内容就相当于是store的一个实例。调用方式和前面介绍的相似，只是要加上当前子模块名，如：<strong>store.a.getters.xxx()</strong>。</li>
</ul>
<h2 id="articleHeader3">vue-cli中使用vuex的方式</h2>
<p>一般来讲，我们都会采用vue-cli来进行实际的开发，在vue-cli中，开发和调用方式稍微不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── index.html
├── main.js
├── components
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── state.js          # 跟级别的 state
    ├── getters.js        # 跟级别的 getter
    ├── mutation-types.js # 根级别的mutations名称（官方推荐mutions方法名使用大写）
    ├── mutations.js      # 根级别的 mutation
    ├── actions.js        # 根级别的 action
    └── modules
        ├── m1.js         # 模块1
        └── m2.js         # 模块2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>├── index.html
├── main.<span class="hljs-keyword">js
</span>├── components
└── store
    ├── index.<span class="hljs-keyword">js </span>         <span class="hljs-comment"># 我们组装模块并导出 store 的地方</span>
    ├── state.<span class="hljs-keyword">js </span>         <span class="hljs-comment"># 跟级别的 state</span>
    ├── getters.<span class="hljs-keyword">js </span>       <span class="hljs-comment"># 跟级别的 getter</span>
    ├── mutation-types.<span class="hljs-keyword">js </span><span class="hljs-comment"># 根级别的mutations名称（官方推荐mutions方法名使用大写）</span>
    ├── mutations.<span class="hljs-keyword">js </span>     <span class="hljs-comment"># 根级别的 mutation</span>
    ├── actions.<span class="hljs-keyword">js </span>       <span class="hljs-comment"># 根级别的 action</span>
    └── modules
        ├── m1.<span class="hljs-keyword">js </span>        <span class="hljs-comment"># 模块1</span>
        └── m2.<span class="hljs-keyword">js </span>        <span class="hljs-comment"># 模块2</span></code></pre>
<p>state.js示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state = {
    name: 'weish',
    age: 22
};

export default state;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>const <span class="hljs-keyword">state</span> = {
    name: 'weish',
    age: <span class="hljs-number">22</span>
};

export <span class="hljs-keyword">default</span> <span class="hljs-keyword">state</span>;</code></pre>
<p>getters.js示例（我们一般使用getters来获取state的状态，而不是直接使用state）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const name = (state) => {
    return state.name;
}

export const age = (state) => {
    return state.age
}

export const other = (state) => {
    return `My name is ${state.name}, I am ${state.age}.`;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export const name = (<span class="hljs-keyword">state</span>) =&gt; {
    return <span class="hljs-keyword">state</span>.name;
}

export const age = (<span class="hljs-keyword">state</span>) =&gt; {
    return <span class="hljs-keyword">state</span>.age
}

export const other = (<span class="hljs-keyword">state</span>) =&gt; {
    return `My name is ${<span class="hljs-keyword">state</span>.name}, I am ${<span class="hljs-keyword">state</span>.age}.`;
}</code></pre>
<p>mutation-type.js示例（我们会将所有mutations的函数名放在这个文件里）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const SET_NAME = 'SET_NAME';
export const SET_AGE = 'SET_AGE';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_NAME = <span class="hljs-string">'SET_NAME'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_AGE = <span class="hljs-string">'SET_AGE'</span>;</code></pre>
<p>mutations.js示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from './mutation-type.js';

export default {
    [types.SET_NAME](state, name) {
        state.name = name;
    },
    [types.SET_AGE](state, age) {
        state.age = age;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import * as types <span class="hljs-keyword">from</span> './mutation-type.js';

export <span class="hljs-keyword">default</span> {
    [types.SET_NAME](<span class="hljs-keyword">state</span>, name) {
        <span class="hljs-keyword">state</span>.name = name;
    },
    [types.SET_AGE](<span class="hljs-keyword">state</span>, age) {
        <span class="hljs-keyword">state</span>.age = age;
    }
};</code></pre>
<p>actions.js示例（异步操作、多个commit时）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from './mutation-type.js';

export default {
    nameAsyn({commit}, {age, name}) {
        commit(types.SET_NAME, name);
        commit(types.SET_AGE, age);
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types from <span class="hljs-string">'./mutation-type.js'</span>;

export <span class="hljs-keyword">default</span> {
    nameAsyn({commit}, {age, name}) {
        commit(types.SET_NAME, name);
        commit(types.SET_AGE, age);
    }
};</code></pre>
<p>modules--m1.js示例（如果不是很复杂的应用，一般来讲是不会分模块的）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state: {},
    getters: {},
    mutations: {},
    actions: {}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    <span class="hljs-attribute">state</span>: {},
    <span class="hljs-selector-tag">getters</span>: {},
    <span class="hljs-selector-tag">mutations</span>: {},
    <span class="hljs-selector-tag">actions</span>: {}
};</code></pre>
<p>index.js示例（组装vuex）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import vue from 'vue';
import vuex from 'vuex';
import state from './state.js';
import * as getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
import m1 from './modules/m1.js';
import m2 from './modules/m2.js';
import createLogger from 'vuex/dist/logger'; // 修改日志

vue.use(vuex);

const debug = process.env.NODE_ENV !== 'production'; // 开发环境中为true，否则为false

export default new vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        m1,
        m2
    },
    plugins: debug ? [createLogger()] : [] // 开发环境下显示vuex的状态修改
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">import</span> state <span class="hljs-keyword">from</span> <span class="hljs-string">'./state.js'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getters.js'</span>;
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations.js'</span>;
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions.js'</span>;
<span class="hljs-keyword">import</span> m1 <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/m1.js'</span>;
<span class="hljs-keyword">import</span> m2 <span class="hljs-keyword">from</span> <span class="hljs-string">'./modules/m2.js'</span>;
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex/dist/logger'</span>; <span class="hljs-comment">// 修改日志</span>

vue.use(vuex);

<span class="hljs-keyword">const</span> debug = process.env.NODE_ENV !== <span class="hljs-string">'production'</span>; <span class="hljs-comment">// 开发环境中为true，否则为false</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> vuex.Store({
    state,
    getters,
    mutations,
    actions,
    <span class="hljs-attr">modules</span>: {
        m1,
        m2
    },
    <span class="hljs-attr">plugins</span>: debug ? [createLogger()] : [] <span class="hljs-comment">// 开发环境下显示vuex的状态修改</span>
});</code></pre>
<p>最后将store实例挂载到main.js里面的vue上去就行了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from './store/index.js';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store/index.js'</span>;

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  store,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});</code></pre>
<p>在vue组件中使用时，我们通常会使用<strong>mapGetters</strong>、<strong>mapActions</strong>、<strong>mapMutations</strong>，然后就可以按照vue调用methods和computed的方式去调用这些变量或函数，示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {mapGetters, mapMutations, mapActions} from 'vuex';

/* 只写组件中的script部分 */
export default {
    computed: {
        ...mapGetters([
            'name',
            'age'
        ])
    },
    methods: {
        ...mapMutations({
            setName: 'SET_NAME',
            setAge: 'SET_AGE'
        }),
        ...mapActions([
            nameAsyn
        ])
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {mapGetters, mapMutations, mapActions} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;

<span class="hljs-comment">/* 只写组件中的script部分 */</span>
<span class="hljs-keyword">export</span> default {
    computed: {
        ...mapGetters([
            <span class="hljs-string">'name'</span>,
            <span class="hljs-string">'age'</span>
        ])
    },
    methods: {
        ...mapMutations({
            setName: <span class="hljs-string">'SET_NAME'</span>,
            setAge: <span class="hljs-string">'SET_AGE'</span>
        }),
        ...mapActions([
            nameAsyn
        ])
    }
};</code></pre>
<h2 id="articleHeader4">总结</h2>
<p>以上就是<strong>vuex</strong> 的相关知识，其实vuex很简单，多用几次就会熟悉了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解vuex -- vue的状态管理模式

## 原文链接
[https://segmentfault.com/a/1190000012015742](https://segmentfault.com/a/1190000012015742)


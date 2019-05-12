---
title: '从头开始学习Vuex' 
date: 2019-02-15 2:30:44
hidden: true
slug: jk44qtqfsac
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、前言</h2>
<p>当我们的应用遇到多个组件共享状态时，会需要多个组件依赖于同一状态抑或是来自不同视图的行为需要变更同一状态。以前的解决办法：</p>
<p><strong>a.将数据以及操作数据的行为都定义在父组件;</strong></p>
<p><strong>b.将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)</strong></p>
<p>传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。在搭建下面页面时，你可能会对 vue 组件之间的通信感到崩溃 ，特别是非父子组件之间通信。此时就应该使用vuex，轻松可以搞定组件间通信问题。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016642505?w=1194&amp;h=486" src="https://static.alili.tech/img/remote/1460000016642505?w=1194&amp;h=486" alt="组件间通信" title="组件间通信" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">二、什么是Vuex</h2>
<p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。这里的关键在于集中式存储管理。<strong>简单来说,对 vue 应用中多个组件的共享状态进行集中式的管理(读/写)</strong>。</p>
<h2 id="articleHeader2">三、Vuex的原理是什么</h2>
<h4>1.简要介绍Vuex原理</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016642506?w=761&amp;h=464" src="https://static.alili.tech/img/remote/1460000016642506?w=761&amp;h=464" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>Vuex实现了一个单向数据流，在全局拥有一个State存放数据，当组件要更改State中的数据时，必须通过Mutation进行，Mutation同时提供了订阅者模式供外部插件调用获取State数据的更新。而当所有异步操作(常见于调用后端接口异步获取更新数据)或批量的同步操作需要走Action，但Action也是无法直接修改State的，还是需要通过Mutation来修改State的数据。最后，根据State的变化，渲染到视图上。</p>
<h4>2.简要介绍各模块在流程中的主要功能：</h4>
<ul>
<li>Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。</li>
<li>dispatch：操作行为触发方法，是唯一能执行action的方法。</li>
<li>actions：<strong>操作行为处理模块,由组件中的<code>$store.dispatch('action 名称', data1)</code>来触发。然后由commit()来触发mutation的调用 , 间接更新 state</strong>。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。</li>
<li>commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。</li>
<li>mutations：<strong>状态改变操作方法，由actions中的<code>commit('mutation 名称')</code>来触发</strong>。是Vuex修改state的唯一推荐方法。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。</li>
<li>state：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。</li>
<li>getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。</li>
</ul>
<h2 id="articleHeader3">四、什么时候使用Vuex</h2>
<p>虽然 Vuex 可以帮助我们管理共享状态，但也附带了更多的概念和框架。这需要对短期和长期效益进行权衡。<br>如果您的应用够简单，您最好不要使用 Vuex,因为使用 Vuex 可能是繁琐冗余的。一个简单的&nbsp;<a href="https://cn.vuejs.org/v2/guide/components.html#%E9%9D%9E%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1" rel="nofollow noreferrer" target="_blank">global event bus</a>&nbsp;就足够您所需了。但是，<strong>如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。</strong></p>
<h2 id="articleHeader4">五、Vuex安装(限定开发环境为 vue-cli)</h2>
<p>首先要安装vue-cli脚手架，对于大陆用户，建议将npm的注册表源设置为国内的镜像(淘宝镜像），可以大幅提升安装速度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry https://[registry.npm.taobao.org](http://registry.npm.taobao.org/)
npm config get registry//配置后可通过下面方式来验证是否成功
npm install -g cnpm --registry=[https://registry](https://registry/).npm.taobao.org
//cnpm安装脚手架
cnpm install -g vue-cli
vue init webpack my-vue
cd my-vue
cnpm install
cnpm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>npm config set registry https://[<span class="hljs-string">registry.npm.taobao.org</span>](<span class="hljs-link">http://registry.npm.taobao.org/</span>)
npm config get registry//配置后可通过下面方式来验证是否成功
npm install -g cnpm --registry=[<span class="hljs-string">https://registry</span>](<span class="hljs-link">https://registry/</span>).npm.taobao.org
//cnpm安装脚手架
cnpm install -g vue-cli
vue init webpack my-vue
cd my-vue
cnpm install
cnpm run dev</code></pre>
<p>脚手架安装好后，再安装vuex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install vuex --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">cnpm <span class="hljs-keyword">install</span> vuex <span class="hljs-comment">--save</span></code></pre>
<h2 id="articleHeader5">六、如何使用Vuex</h2>
<p>### 1.如何通过Vue来实现如下效果？<br><span class="img-wrap"><img data-src="/img/remote/1460000016642507?w=429&amp;h=364" src="https://static.alili.tech/img/remote/1460000016642507?w=429&amp;h=364" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>这个小demo很容易用vue实现，核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div class=&quot;hello&quot;>
    <p>click "{{"count"}}" times,count is "{{"evenOrOdd"}}"</p>
    <button @click=&quot;increment&quot;>+</button>
    <button @click=&quot;decrement&quot;>-</button>
    <button @click=&quot;incrementIfOdd&quot;>increment if odd</button>
    <button @click=&quot;incrementAsync&quot;>increment async</button>
  </div>
  ......
  export default {
  name: &quot;HelloWorld&quot;,
  data() {
    return {
      count: 0
    };
  },
  computed: {
    evenOrOdd() {
      return this.count % 2 === 0 ? &quot;偶数&quot; : &quot;奇数&quot;;
    }
  },
  methods: {
    increment() {
      this.count = this.count + 1;
    },
    decrement() {
      this.count = this.count - 1;
    },
    // 只有是奇数才加1
    incrementIfOdd() {
      if (this.count % 2 === 1) {
        this.count = this.count + 1;
      }
    },
    // 过两秒才加1
    incrementAsync() {
      setInterval(() => {
        this.count = this.count + 1;
      }, 2000);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">hello</span>"&gt;</span>
    &lt;p&gt;click "{{"count"}}" times,count <span class="hljs-keyword">is</span> "{{"evenOrOdd"}}"&lt;/p&gt;
    &lt;button <span class="hljs-meta">@click</span>=<span class="hljs-string">"increment"</span>&gt;+&lt;/button&gt;
    &lt;button <span class="hljs-meta">@click</span>=<span class="hljs-string">"decrement"</span>&gt;-&lt;/button&gt;
    &lt;button <span class="hljs-meta">@click</span>=<span class="hljs-string">"incrementIfOdd"</span>&gt;increment <span class="hljs-keyword">if</span> odd&lt;/button&gt;
    &lt;button <span class="hljs-meta">@click</span>=<span class="hljs-string">"incrementAsync"</span>&gt;increment async&lt;/button&gt;
  &lt;/div&gt;
  ......
  export <span class="hljs-keyword">default</span> {
  name: <span class="hljs-string">"HelloWorld"</span>,
  <span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
      count: <span class="hljs-number">0</span>
    };
  },
  computed: {
    evenOrOdd() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.count % <span class="hljs-number">2</span> === <span class="hljs-number">0</span> ? <span class="hljs-string">"偶数"</span> : <span class="hljs-string">"奇数"</span>;
    }
  },
  methods: {
    increment() {
      <span class="hljs-keyword">this</span>.count = <span class="hljs-keyword">this</span>.count + <span class="hljs-number">1</span>;
    },
    decrement() {
      <span class="hljs-keyword">this</span>.count = <span class="hljs-keyword">this</span>.count - <span class="hljs-number">1</span>;
    },
    <span class="hljs-comment">// 只有是奇数才加1</span>
    incrementIfOdd() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.count % <span class="hljs-number">2</span> === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">this</span>.count = <span class="hljs-keyword">this</span>.count + <span class="hljs-number">1</span>;
      }
    },
    <span class="hljs-comment">// 过两秒才加1</span>
    incrementAsync() {
      setInterval(() =&gt; {
        <span class="hljs-keyword">this</span>.count = <span class="hljs-keyword">this</span>.count + <span class="hljs-number">1</span>;
      }, <span class="hljs-number">2000</span>);
    }
  }
}</code></pre>
<h3 id="articleHeader6">2.如何通过Vuex来改造上面代码？</h3>
<h4>①创建一个store.js文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {// 包含了多个直接更新state函数的对象
        INCREMENT(state) {
            state.count = state.count + 1;
        },
        DECREMENT(state) {
            state.count = state.count - 1;
        }
    },
    getters: {   // 当读取属性值时自动调用并返回属性值
        evenOrOdd(state) {
            return state.count % 2 === 0 ? &quot;偶数&quot; : &quot;奇数&quot;;
        }
    },
    actions: { // 包含了多个对应事件回调函数的对象
        incrementIfOdd({ commit, state }) { // 带条件的action
            if (state.count % 2 === 1) {
                commit('INCREMENT')
            }
        },
        incrementAsync({ commit }) { //异步的action
            setInterval(() => {
                commit('INCREMENT')
            }, 2000);
        }

    }
})
export default store //用export default 封装代码，让外部可以引用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Vue <span class="hljs-keyword">from</span> 'vue'
import Vuex <span class="hljs-keyword">from</span> 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    <span class="hljs-keyword">state</span>: {
        count: <span class="hljs-number">0</span>
    },
    mutations: {// 包含了多个直接更新<span class="hljs-keyword">state</span>函数的对象
        INCREMENT(<span class="hljs-keyword">state</span>) {
            <span class="hljs-keyword">state</span>.count = <span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span>;
        },
        DECREMENT(<span class="hljs-keyword">state</span>) {
            <span class="hljs-keyword">state</span>.count = <span class="hljs-keyword">state</span>.count - <span class="hljs-number">1</span>;
        }
    },
    getters: {   // 当读取属性值时自动调用并返回属性值
        evenOrOdd(<span class="hljs-keyword">state</span>) {
            return <span class="hljs-keyword">state</span>.count % <span class="hljs-number">2</span> === <span class="hljs-number">0</span> ? <span class="hljs-string">"偶数"</span> : <span class="hljs-string">"奇数"</span>;
        }
    },
    actions: { // 包含了多个对应事件回调函数的对象
        incrementIfOdd({ commit, <span class="hljs-keyword">state</span> }) { // 带条件的action
            if (<span class="hljs-keyword">state</span>.count % <span class="hljs-number">2</span> === <span class="hljs-number">1</span>) {
                commit('INCREMENT')
            }
        },
        incrementAsync({ commit }) { //异步的action
            <span class="hljs-built_in">set</span>Interval(() =&gt; {
                commit('INCREMENT')
            }, <span class="hljs-number">2000</span>);
        }

    }
})
export <span class="hljs-keyword">default</span> store //用export <span class="hljs-keyword">default</span> 封装代码，让外部可以引用</code></pre>
<h4>②在main.js文件中引入store.js文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from './store'
new Vue({
  el: '#app',
  router,
  store,//注册上vuex的store: 所有组件对象都多一个属性$store
  components: { App },
  template: '<App/>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> store from <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  store,<span class="hljs-comment">//注册上vuex的store: 所有组件对象都多一个属性$store</span>
  components: { App },
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>
})</code></pre>
<h4>③新建一个模板HelloWorld.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <p>click "{{"count"}}" times,count is "{{"evenOrOdd"}}"</p>
    <button @click=&quot;increment&quot;>+</button>
    <button @click=&quot;decrement&quot;>-</button>
    <button @click=&quot;incrementIfOdd&quot;>increment if odd</button>
    <button @click=&quot;incrementAsync&quot;>increment async</button>
  </div>
</template>
<script>
export default {
  name: &quot;HelloWorld&quot;,
  computed: {
    count() {
      return this.$store.state.count;
    },
    evenOrOdd() {
      return this.$store.getters.evenOrOdd;
    }
  },
  methods: {
    increment() {
      this.$store.commit(&quot;INCREMENT&quot;);
    },
    decrement() {
      this.$store.commit(&quot;DECREMENT&quot;);
    },
    // 只有是奇数才加1
    incrementIfOdd() {
      this.$store.dispatch(&quot;incrementIfOdd&quot;); //触发store中对应的action调用
    },
    // 过两秒才加1
    incrementAsync() {
      this.$store.dispatch(&quot;incrementAsync&quot;);
    }
  }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>click </span><span class="hljs-template-variable">"{{"count"}}"</span><span class="xml"> times,count is </span><span class="hljs-template-variable">"{{"evenOrOdd"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"increment"</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"decrement"</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"incrementIfOdd"</span>&gt;</span>increment if odd<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"incrementAsync"</span>&gt;</span>increment async<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"HelloWorld"</span>,
  <span class="hljs-attr">computed</span>: {
    count() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.count;
    },
    evenOrOdd() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.evenOrOdd;
    }
  },
  <span class="hljs-attr">methods</span>: {
    increment() {
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">"INCREMENT"</span>);
    },
    decrement() {
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">"DECREMENT"</span>);
    },
    <span class="hljs-comment">// 只有是奇数才加1</span>
    incrementIfOdd() {
      <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">"incrementIfOdd"</span>); <span class="hljs-comment">//触发store中对应的action调用</span>
    },
    <span class="hljs-comment">// 过两秒才加1</span>
    incrementAsync() {
      <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">"incrementAsync"</span>);
    }
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>由于 store 中的状态是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。<strong>在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。改变store 中的状态的唯一途径就是显式地提交 (commit) mutations。</strong></p>
<h3 id="articleHeader7">3.如何通mapState等辅助函数优化上面代码？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mapActions, mapGetters, mapState, mapMutations } from &quot;vuex&quot;;
...
 computed: {
    ...mapState([&quot;count&quot;]),
    ...mapGetters([&quot;evenOrOdd&quot;])
    }
  methods: {
    ...mapActions([&quot;incrementIfOdd&quot;, &quot;incrementAsync&quot;]),
    ...mapMutations([&quot;increment&quot;, &quot;decrement&quot;])
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { mapActions, mapGetters, mapState, mapMutations } <span class="hljs-keyword">from</span> <span class="hljs-string">"vuex"</span>;
...
 computed: {
    ...mapState([<span class="hljs-string">"count"</span>]),
    ...mapGetters([<span class="hljs-string">"evenOrOdd"</span>])
    }
  methods: {
    ...mapActions([<span class="hljs-string">"incrementIfOdd"</span>, <span class="hljs-string">"incrementAsync"</span>]),
    ...mapMutations([<span class="hljs-string">"increment"</span>, <span class="hljs-string">"decrement"</span>])
    }</code></pre>
<p><strong>有点必须要注意</strong>：HelloWorld.vue文件中increment函数名称要跟store.js文件mutations中一致，才可以写成 ...mapMutations(["increment", "decrement"])，同样的道理，incrementIfOdd和incrementAsync也要和store.js文件actions保持一致。</p>
<h2 id="articleHeader8">七、使用Vuex的注意点</h2>
<h3 id="articleHeader9">1.如何在Mutations里传递参数</h3>
<p>先store.js文件里给add方法加上一个参数n</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mutations: {
    INCREMENT(state,n) {
      state.count+=n;
    },
    DECREMENT(state){
        state.count--;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>  mutations: {
    INCREMENT(<span class="hljs-keyword">state</span>,n) {
      <span class="hljs-keyword">state</span>.count+=n;
    },
    DECREMENT(<span class="hljs-keyword">state</span>){
        <span class="hljs-keyword">state</span>.count--;
    }
  }</code></pre>
<p>然后在HelloWorld.vue里修改按钮的commit( )方法传递的参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" increment() {
      return this.$store.commit(&quot;INCREMENT&quot;,2);
    },
 decrement() {
      return this.$store.commit(&quot;DECREMENT&quot;);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> increment() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">"INCREMENT"</span>,<span class="hljs-number">2</span>);
    },
 decrement() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">"DECREMENT"</span>);
    }</code></pre>
<h3 id="articleHeader10">2.如何理解getters</h3>
<p><strong>getters从表面是获得的意思，可以把他看作在获取数据之前进行的一种再编辑,相当于对数据的一个过滤和加工</strong>。getters就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。</p>
<p>例如：要对store.js文件中的count进行操作，在它输出前，给它加上100。</p>
<p>首先要在store.js里Vuex.Store()里引入getters</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getters:{
     count:state=>state.count+=100
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>getters:{
     count:<span class="hljs-keyword">state</span>=&gt;state.count+=<span class="hljs-number">100</span>
  }</code></pre>
<p>然后在HelloWorld.vue中对computed进行配置，在vue 的构造器里边只能有一个computed属性，如果你写多个，只有最后一个computed属性可用，所以要用展开运算符”…”对上节写的computed属性进行一个改造。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" computed: {
   ...mapGetters([&quot;count&quot;])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code> computed: {
   ...mapGetters([<span class="hljs-string">"count"</span>])
}</code></pre>
<h3 id="articleHeader11">3.actions和mutations区别</h3>
<p>actions和上面的Mutations功能基本一样，不同点是，<strong>actions是异步的改变state状态，而Mutations是同步改变状态</strong>。</p>
<p>同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态----尤雨溪</p>
<p>ps:如果想访问源代码，请猛戳<a href="https://github.com/ljianshu/Blog/tree/master/vuex-demo" rel="nofollow noreferrer" target="_blank">git地址</a></p>
<p><strong>如果觉得文章对你有些许帮助，欢迎在<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">我的GitHub博客</a>点赞和关注，感激不尽！</strong></p>
<h2 id="articleHeader12">参考文章</h2>
<p><a href="https://vuex.vuejs.org/zh/guide/" rel="nofollow noreferrer" target="_blank">vuex官方文档</a></p>
<p><a href="http://www.imooc.com/article/14741" rel="nofollow noreferrer" target="_blank">Vuex 2.0 源码分析</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从头开始学习Vuex

## 原文链接
[https://segmentfault.com/a/1190000016768961](https://segmentfault.com/a/1190000016768961)


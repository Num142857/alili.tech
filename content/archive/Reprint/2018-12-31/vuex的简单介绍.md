---
title: 'vuex的简单介绍' 
date: 2018-12-31 2:30:30
hidden: true
slug: bjcy105n4t
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Vuex 入门</h1>
<p>Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。说白了，vuex就是用来管理数据的。</p>
<blockquote><p>直接下载或者CDN引入</p></blockquote>
<p><a href="https://unpkg.com/vuex" rel="nofollow noreferrer" target="_blank">https://unpkg.com/vuex</a></p>
<p>Vuex的核心就是store（仓库），其包含应用中的大部分状态。Vuex 和单纯的全局对象有以下两点不同：</p>
<ul>
<li>Vuex的状态存储时响应式的</li>
<li>store中状态不能直接改变</li>
</ul>
<p>现在我们来创建一个store：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vuex.Store({
    state:{
        //......
    },
    mutations:{

    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">state</span>:{
        <span class="hljs-comment">//......</span>
    },
    <span class="hljs-attr">mutations</span>:{

    }
})</code></pre>
<p>在这个store里，包含了一个 state 对象和 mutations </p>
<p>state用来存储初始化的数据，读取数据使用 store.state.数据 。</p>
<p>修改数据使用 mutations ，调用 mutations 里的数据需要使用 commit()</p>
<p>现在来尝试使用以下vuex，做一个简单的计数程序：</p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div id=&quot;app&quot;>

  </div>

  <template id=&quot;tpl&quot;>
    <div>
      <tip></tip>
      <btn></btn>
    </div>
  </template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">tip</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tip</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">btn</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">btn</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>javascript</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    var store = new Vuex.Store({
      state:{
        count:0
      },
      mutations:{
        plus(state){
          state.count++
        },
        less(state){
          state.count--
        }
      }
    });

    var app=new Vue({
      el:'#app',
      template:'#tpl',
      components:{
        tip:{
          template:'<div>"{{"$store.state.count"}}"</div>'
        },
        btn:{
          template:`
            <div>
              <input type=&quot;button&quot; value=&quot;+&quot; v-on:click=&quot;$store.commit('plus')&quot;/>
              <input type=&quot;button&quot; value=&quot;-&quot; v-on:click=&quot;$store.commit('less')&quot;/>
            </div>
          `
        }
      },
      store
    "}}"
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
    <span class="hljs-keyword">var</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
      <span class="hljs-attr">state</span>:{
        <span class="hljs-attr">count</span>:<span class="hljs-number">0</span>
      },
      <span class="hljs-attr">mutations</span>:{
        plus(state){
          state.count++
        },
        less(state){
          state.count--
        }
      }
    });

    <span class="hljs-keyword">var</span> app=<span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>:<span class="hljs-string">'#app'</span>,
      <span class="hljs-attr">template</span>:<span class="hljs-string">'#tpl'</span>,
      <span class="hljs-attr">components</span>:{
        <span class="hljs-attr">tip</span>:{
          <span class="hljs-attr">template</span>:<span class="hljs-string">'&lt;div&gt;"{{"$store.state.count"}}"&lt;/div&gt;'</span>
        },
        <span class="hljs-attr">btn</span>:{
          <span class="hljs-attr">template</span>:<span class="hljs-string">`
            &lt;div&gt;
              &lt;input type="button" value="+" v-on:click="$store.commit('plus')"/&gt;
              &lt;input type="button" value="-" v-on:click="$store.commit('less')"/&gt;
            &lt;/div&gt;
          `</span>
        }
      },
      store
    "}}"
</code></pre>
<h2 id="articleHeader1">vuex的核心</h2>
<ul>
<li>State</li>
<li>Getters</li>
<li>Mutations</li>
<li>Actions</li>
<li>Modlues</li>
</ul>
<h3 id="articleHeader2">State</h3>
<p>由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个 Counter 组件
const Counter = {
  template: `<div>"{{" count "}}"</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建一个 Counter 组件</span>
<span class="hljs-keyword">const</span> Counter = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;"{{" count "}}"&lt;/div&gt;`</span>,
  <span class="hljs-attr">computed</span>: {
    count () {
      <span class="hljs-keyword">return</span> store.state.count
    }
  }
}</code></pre>
<p>每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。</p>
<h4>mapState 辅助函数</h4>
<p>当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 在单独构建的版本中辅助函数为 Vuex.mapState</span>
<span class="hljs-keyword">import</span> { mapState } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// ...</span>
  computed: mapState({
    <span class="hljs-comment">// 箭头函数可使代码更简练</span>
    count: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.count,

    <span class="hljs-comment">// 传字符串参数 'count' 等同于 `state =&gt; state.count`</span>
    countAlias: <span class="hljs-string">'count'</span>,

    <span class="hljs-comment">// 为了能够使用 `this` 获取局部状态，必须使用常规函数</span>
    countPlusLocalState (state) {
      <span class="hljs-keyword">return</span> state.count + <span class="hljs-keyword">this</span>.localCount
    }
  })
}</code></pre>
<h3 id="articleHeader3">Getters</h3>
<p>有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">computed: {
  doneTodosCount () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.done).length
  }
}</code></pre>
<p>如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它 —— 无论哪种方式都不是很理想。</p>
<p>Vuex 允许我们在 store 中定义『getters』（可以认为是 store 的计算属性）。就像计算属性一样，getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。</p>
<p>Getters 接受 state 作为其第一个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})


store.getters.doneTodes" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">todos</span>: [
      { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'...'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> },
      { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'...'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> }
    ]
  },
  <span class="hljs-attr">getters</span>: {
    <span class="hljs-attr">doneTodos</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> state.todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.done)
    }
  }
})


store.getters.doneTodes</code></pre>
<p>Getters 也可以接受其他 getters 作为第二个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

store.getters.doneTodosCount" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">getters: {
  <span class="hljs-comment">// ...</span>
  doneTodosCount: <span class="hljs-function">(<span class="hljs-params">state, getters</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> getters.doneTodos.length
  }
}

store.getters.doneTodosCount</code></pre>
<p>我们可以很容易地在任何组件中使用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">computed: {
  doneTodosCount () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.doneTodosCount
  }
}</code></pre>
<h4>mapGetters 辅助函数</h4>
<p>mapGetters 辅助函数仅仅是将 store 中的 getters 映射到局部计算属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
  ...mapGetters([
    // 使用对象展开运算符将 getters 混入 computed 对象中
    'doneTodosCount',
    'anotherGetters'
  ])
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">computed:{
  ...mapGetters([
    <span class="hljs-comment">// 使用对象展开运算符将 getters 混入 computed 对象中</span>
    <span class="hljs-string">'doneTodosCount'</span>,
    <span class="hljs-string">'anotherGetters'</span>
  ])
}</code></pre>
<h3 id="articleHeader4">Mutations</h3>
<p>更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    plus(state){
      state.count++
    },
    less(state){
      state.count--
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>:{
    <span class="hljs-attr">count</span>:<span class="hljs-number">0</span>
  },
  <span class="hljs-attr">mutations</span>:{
    plus(state){
      state.count++
    },
    less(state){
      state.count--
    }
  }
});</code></pre>
<h3 id="articleHeader5">提交载荷（Paylaod）</h3>
<p>你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    plus(state,n){
      state.count+=n
    },
    less(state,n){
      state.count-=n
    }
  }
});

this.$store.commit('plus',5)
this.$store.commit('less',5)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>:{
    <span class="hljs-attr">count</span>:<span class="hljs-number">0</span>
  },
  <span class="hljs-attr">mutations</span>:{
    plus(state,n){
      state.count+=n
    },
    less(state,n){
      state.count-=n
    }
  }
});

<span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'plus'</span>,<span class="hljs-number">5</span>)
<span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'less'</span>,<span class="hljs-number">5</span>)</code></pre>
<h3 id="articleHeader6">Actions</h3>
<p>Action 类似于 mutation，不同在于：</p>
<ul>
<li>Action 提交的是 mutation ，而不是直接变更状态</li>
<li>Action 可以包含任意异步操作</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="actions:{
  plus(commit){
    commit({type:'plus',n:5})
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">actions:{
  plus(commit){
    commit({<span class="hljs-attr">type</span>:<span class="hljs-string">'plus'</span>,<span class="hljs-attr">n</span>:<span class="hljs-number">5</span>})
  }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuex的简单介绍

## 原文链接
[https://segmentfault.com/a/1190000011158407](https://segmentfault.com/a/1190000011158407)


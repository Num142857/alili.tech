---
title: '关于vueX的应用' 
date: 2018-12-19 2:30:07
hidden: true
slug: bq7ga9a7ebf
categories: [reprint]
---

{{< raw >}}

                    <div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 接一篇文章 vue开发看这篇文章就够了 https://segmentfault.com/a/1190000012692321 -->
<!-- 
    vuex 我们把它叫做状态管理 ‘状态’一词来源与react 在react中数据在state中 实际上也就是&quot;数据管理&quot;
    vuex解决了大型项目的组件间的通信问题 实际上也就是数据中介 所有的数据增删改查全部通过vuex来实现 
  -->
  <div id=&quot;app&quot;>
    <!--页面总调用state中的数据-->
    store 中的数据："{{" $store.state.count "}}"

    <button @click=&quot;fn&quot;>修改store中的数据</button>
    <!-- 页面中条用getters中的数据 -->
    <p>getters的使用："{{" $store.getters.doneTodosCount "}}"</p>
  </div>

    <!--引入包-->
  <script src=&quot;./vue.js&quot;></script>
  <script src=&quot;./vuex.js&quot;></script>


  <script>
    // 创建store，用来存储项目中使用的数据(理解为数据仓库 仓库中有管理数据的方法)。
    // 也就是说 整个应用中的数据，都应该交给 store 来管理
    // 开发环境下 引入vuex那需要use一下 Vue.use( vuex)
    
    const store = new Vuex.Store({
      // state即状态，也就是组件中的data（数据）
      state: {
        count: 0,

        todos: [
          { id: 1, text: '...完成', done: true },
          { id: 2, text: '...完成', done: true },
          { id: 3, text: '...完成', done: true },
          { id: 4, text: '...完成', done: true },
          { id: 5, text: '...未完成', done: false }
        ]
      },

      // getters 就是 store 的计算属性，用法与计算属性相同！！！
      getters: {
        doneTodosCount(state) {
          return state.todos.filter(todo => todo.done).length
        }
      },

      // 注意：state中的数据只能通过 mutations 来修改！！！
      // 也就是：数据由 store 提供，同样的修改数据方法也是由 store 来提供的，这就是：mutations
      mutations: {
        increment(state) {
          // 参数 state即：上面的state，也就是数据
          state.count++
        },

        // payload 表示提交这个方法的时候，传递的数据，最好是一个对象
        increment2(state, payload) {
          state.count += payload.num
        }
      }
    })

    /* 
    使用 store 中的数据：
    
    修改数据：store.commit('increment')
    读取数据：store.state.count
    */

    var vm = new Vue({
      el: '#app',
      data: {
        
      },

      methods: {
        fn() {
          // this.$store.commit('increment')
          //通过commit触发mutations中的方法  参数一：方法名 参数二：传递数据
          this.$store.commit('increment2', {num: 3})
        }
      },
      // 将 store 与Vue实例关联到一起
      store: store
    })
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 接一篇文章 vue开发看这篇文章就够了 https://segmentfault.com/a/1190000012692321 --&gt;</span>
<span class="hljs-comment">&lt;!-- 
    vuex 我们把它叫做状态管理 ‘状态’一词来源与react 在react中数据在state中 实际上也就是"数据管理"
    vuex解决了大型项目的组件间的通信问题 实际上也就是数据中介 所有的数据增删改查全部通过vuex来实现 
  --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--页面总调用state中的数据--&gt;</span>
    store 中的数据："{{" $store.state.count "}}"

    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"fn"</span>&gt;</span>修改store中的数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 页面中条用getters中的数据 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>getters的使用："{{" $store.getters.doneTodosCount "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-comment">&lt;!--引入包--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./vuex.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 创建store，用来存储项目中使用的数据(理解为数据仓库 仓库中有管理数据的方法)。</span>
    <span class="hljs-comment">// 也就是说 整个应用中的数据，都应该交给 store 来管理</span>
    <span class="hljs-comment">// 开发环境下 引入vuex那需要use一下 Vue.use( vuex)</span>
    
    <span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
      <span class="hljs-comment">// state即状态，也就是组件中的data（数据）</span>
      state: {
        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,

        <span class="hljs-attr">todos</span>: [
          { <span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'...完成'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> },
          { <span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'...完成'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> },
          { <span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'...完成'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> },
          { <span class="hljs-attr">id</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'...完成'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span> },
          { <span class="hljs-attr">id</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">'...未完成'</span>, <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> }
        ]
      },

      <span class="hljs-comment">// getters 就是 store 的计算属性，用法与计算属性相同！！！</span>
      getters: {
        doneTodosCount(state) {
          <span class="hljs-keyword">return</span> state.todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.done).length
        }
      },

      <span class="hljs-comment">// 注意：state中的数据只能通过 mutations 来修改！！！</span>
      <span class="hljs-comment">// 也就是：数据由 store 提供，同样的修改数据方法也是由 store 来提供的，这就是：mutations</span>
      mutations: {
        increment(state) {
          <span class="hljs-comment">// 参数 state即：上面的state，也就是数据</span>
          state.count++
        },

        <span class="hljs-comment">// payload 表示提交这个方法的时候，传递的数据，最好是一个对象</span>
        increment2(state, payload) {
          state.count += payload.num
        }
      }
    })

    <span class="hljs-comment">/* 
    使用 store 中的数据：
    
    修改数据：store.commit('increment')
    读取数据：store.state.count
    */</span>

    <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
      <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
      <span class="hljs-attr">data</span>: {
        
      },

      <span class="hljs-attr">methods</span>: {
        fn() {
          <span class="hljs-comment">// this.$store.commit('increment')</span>
          <span class="hljs-comment">//通过commit触发mutations中的方法  参数一：方法名 参数二：传递数据</span>
          <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'increment2'</span>, {<span class="hljs-attr">num</span>: <span class="hljs-number">3</span>})
        }
      },
      <span class="hljs-comment">// 将 store 与Vue实例关联到一起</span>
      store: store
    })
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于vueX的应用

## 原文链接
[https://segmentfault.com/a/1190000012720694](https://segmentfault.com/a/1190000012720694)


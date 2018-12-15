---
title: 'Vue学习日记（四）——Vue状态管理vuex' 
date: 2018-12-15 2:30:11
hidden: true
slug: klde0kvloa9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>先说句前话，如果不是接触大型项目，不需要有多个子页面，不使用vuex也是完全可以的。</p>
<p>说实在话，我在阅读vuex文档的时候，也很难以去理解vuex，甚至觉得没有使用它我也可以。但是直到我在项目碰到下面这些问题：</p>
<ol>
<li>当路由切换的时候，原本路由的数据太多，传递过去太麻烦。</li>
<li>有些数据是多个路由需要用到的，那我就需要从后台获取多次数据</li>
</ol>
<p>当然，这些问题都可以解决，就是在实例化vue对象的时候，就将这些数据绑定在window对象上面。但是我们也不得不设想：</p>
<ol>
<li>万一数据太多了，那么可阅读性是不是会下降</li>
<li>如果只是修改单独的数据，是不是所有的页面都可以更新</li>
</ol>
<p>对于第一个问题，答案是肯定的，虽然说，我们现在也可以用模块化的思想去使可阅读性更加好，但是没有一个规范，对于刚入手项目的总是难以理解。</p>
<p>对于第二个问题，当你页面少的时候，是不会出现这样的问题的，但是如果页面多了，你就会发现，当你把window.$data里面的数据更新的时候，所有页面的计算属性都会失效，就是你无论怎么修改数据，页面都不会更新数据。</p>
<p><strong>这时候，就需要用到我们的vuex了。</strong></p>
<h1 id="articleHeader1">vuex介绍</h1>
<blockquote>那么vuex 到底是什么？</blockquote>
<p>引用官网的说法就是Vuex是一个专为Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p>
<p>是不是还是有点难以理解，<strong>其实简单的说vuex就是把这个项目的所有数据都存储在一个地方，方便修改和获取数据</strong>。</p>
<p>例如，我们从下面这张图给大家先简单的分析一下</p>
<p><span class="img-wrap"><img data-src="https://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/12.png?raw=true" src="https://static.alili.techhttps://github.com/XiaoCheng123/markdownImg/blob/master/vue%E5%AD%A6%E4%B9%A0%E6%97%A5%E8%AE%B0/12.png?raw=true" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>在这张图片里面我们很明显可以看到三个部分</p>
<ol>
<li>Vue Components 表示vue里面的组件</li>
<li>Backend API 后台API</li>
<li>vuex 组件里面的数据管理</li>
</ol>
<p>我们可以生动形象的理解，如果说Vuex是一个仓库，那么么Vue Components就就是售货者，负责把仓库里面的东西展现出来，Backend API就相当于入货的人，负责将货物买进来（也就是后台返回数据给前端，保存在vuex里面）。而vuex就是仓库，这个仓库里面有货物state，有管理货物进出的Muations</p>
<h2 id="articleHeader2">引用vuex</h2>
<p>在说state之前，我们可以先在我们vue项目引用vuex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vuex</code></pre>
<p>然后在我们的src目录下新建一个store的文件夹，在store文件夹里面新建一个index.js的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ~/src/store/index.js
import Vue from 'Vue'
import Vuex from 'Vuex'

// 在这里声明实例一个Vue 去引用Vuex状态管理插件
// 这样就可以减少在main.js里面的代码量了
Vue.use(Vuex)

// 返回store实例对象
export default new Vuex.Store({
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ~/src/store/index.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'Vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'Vuex'</span>

<span class="hljs-comment">// 在这里声明实例一个Vue 去引用Vuex状态管理插件</span>
<span class="hljs-comment">// 这样就可以减少在main.js里面的代码量了</span>
Vue.use(Vuex)

<span class="hljs-comment">// 返回store实例对象</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
})</code></pre>
<p>这里说一下吧，这里Store其实就是相当vuex实例化的一个仓库。</p>
<h2 id="articleHeader3">data替代者state</h2>
<blockquote>为什么说state是data的替代者呢？</blockquote>
<p>很容易理解，就是讲组件里面的局部参数，改成了一个可以全局使用的参数state，例如，我们在me.vue组件引用的数据todo。</p>
<p>那么我们可以在store里面这样实例化它出来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ~/src/store/index.js

// ...
export default new Vuex.Store({
  state: {
    todo: []
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// ~/src/store/index.js</span>

<span class="hljs-comment">// ...</span>
<span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vuex</span><span class="hljs-selector-class">.Store</span>({
  <span class="hljs-attribute">state</span>: {
    <span class="hljs-attribute">todo</span>: []
  }
})</code></pre>
<p>那么，我们在组件里面怎么使用这个数据呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// me.vue组件文件

// ...
<script type=&quot;text/ecmascript-6&quot;>
export default {
  data() {
    meTodo: [] // 然后在方法里面引用this.meTodo = this.$store.state.todo
  }
}
</script>
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// me.vue组件文件

// ...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/ecmascript-6"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-attr">meTodo</span>: [] <span class="hljs-comment">// 然后在方法里面引用this.meTodo = this.$store.state.todo</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
// ...</code></pre>
<p>是不是很简单，但是我们不可能每次使用这个值都要获取一次吧，这些vue团队也都想好了，我们可以通过计算属性来获取state里面的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
<script type=&quot;text/ecmascript-6&quot;>
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  computed: mapState([
  // 映射 this.todo 为 store.state.todo
  'todo'
])
}
</script>
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// ...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/ecmascript-6"</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 在单独构建的版本中辅助函数为 Vuex.mapState</span>
<span class="hljs-keyword">import</span> { mapState } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">computed</span>: mapState([
  <span class="hljs-comment">// 映射 this.todo 为 store.state.todo</span>
  <span class="hljs-string">'todo'</span>
])
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
// ...</code></pre>
<p>相当于</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
<script type=&quot;text/ecmascript-6&quot;>
export default {
  computed: 
  todo () {
    return this.$store.state.todo
  }
])
}
</script>
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// ...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/ecmascript-6"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">computed</span>: 
  todo () {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.todo
  }
])
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
// ...</code></pre>
<h2 id="articleHeader4">计算属性Getter</h2>
<p>有时候我们会需要对state的数据进行一些过滤操作，例如我们只要在todo里面大于10的数字，如果是用computed的话，我们就需要使用filter函数，为了更加简便，vuex也给我们提供了计算属性getter。</p>
<p>我们可以修改我们的~/src/store/index文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
export default new Vuex.Store({
  state: {
    todo: []
  },
  getters: {
    todo: state => state.todo.filter(number => number > 10)
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// ...
export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    todo: []
  },
  getters: {
    todo: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.todo.filter(number =&gt; number &gt; <span class="hljs-number">10</span>)
  }
})</code></pre>
<p>然后在me.vue里面引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
<script type=&quot;text/ecmascript-6&quot;>
// 在单独构建的版本中辅助函数为 Vuex.mapGetters
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      // 映射 this.todo 为 store.state.todo
      'todo'
    ])
  }
}
</script>
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// ...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/ecmascript-6"</span>&gt;</span><span class="javascript">
<span class="hljs-comment">// 在单独构建的版本中辅助函数为 Vuex.mapGetters</span>
<span class="hljs-keyword">import</span> { mapGetters } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">computed</span>: {
    ...mapGetters([
      <span class="hljs-comment">// 映射 this.todo 为 store.state.todo</span>
      <span class="hljs-string">'todo'</span>
    ])
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
// ...</code></pre>
<p>这样就可以简单拿到大于10的todo数据了</p>
<h2 id="articleHeader5">修改state的Mutation</h2>
<blockquote>我们说了怎么获取数据，但是我们应该怎么修改数据呢，是不是直接赋值给数据就可以了呢？</blockquote>
<p>答案当然不是，vuex规定了，我们只能用Mutation来进行修改数据，那么，我们怎么进行修改数据呢？<br>修改我们的~/src/store/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
export default new Vuex.Store({
  state: {
    todo: []
  },
  getters: {
    todo: state => state.todo.filter(number => number > 10)
  },
  mutations: {
    revsiseTode: (state, oneTodo) => (state.todo = oneTodo) // 修改state的值
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// ...
export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    todo: []
  },
  getters: {
    todo: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.todo.filter(number =&gt; number &gt; <span class="hljs-number">10</span>)
  },
  mutations: {
    revsiseTode: (<span class="hljs-keyword">state</span>, oneTodo) =&gt; (<span class="hljs-keyword">state</span>.todo = oneTodo) // 修改<span class="hljs-keyword">state</span>的值
  }
})</code></pre>
<p>然后在我们的me.vue组件里面修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
// 在单独构建的版本中辅助函数为 Vuex.mapGetters
import { mapGetters } from 'vuex'
// 在单独构建的版本中辅助函数为 Vuex.mapMutations
import { mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      // 映射 this.todo 为 store.state.todo
      'todo'
    ])
  },
  method: {
    ...mapMutations(
      [
        // 将 `this.revsiseTode()` 映射为 `this.$store.commit('revsiseTode')`
        // 如果想传递参数可以使用this.$store.commit('revsiseTode', oneTode)
        // 或者Action
        'revsiseTode' 
      ]
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">// ...</span>
<span class="hljs-comment">// 在单独构建的版本中辅助函数为 Vuex.mapGetters</span>
import <span class="hljs-comment">{ mapGetters }</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-comment">// 在单独构建的版本中辅助函数为 Vuex.mapMutations</span>
import <span class="hljs-comment">{ mapMutations }</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

export <span class="hljs-keyword">default</span> <span class="hljs-comment">{
  computed: {
    ...mapGetters([
      // 映射 this.todo 为 store.state.todo
      'todo'
    ])
  }</span>,
  <span class="hljs-function"><span class="hljs-keyword">method</span>:</span> <span class="hljs-comment">{
    ...mapMutations(
      [
        // 将 `this.revsiseTode()` 映射为 `this.$store.commit('revsiseTode')`
        // 如果想传递参数可以使用this.$store.commit('revsiseTode', oneTode)
        // 或者Action
        'revsiseTode' 
      ]
    )
  }</span>
}</code></pre>
<h2 id="articleHeader6">Action的使用</h2>
<p>写了这么久，终于到了Action的出场了，其实不管怎么说，Action主要是为了与后台交互而使用的属性，这里，我就假设todo的数据在路由/me/gettodo里面能够获取，因此，修改~/store/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
export default new Vuex.Store({
  state: {
    todo: []
  },
  getters: {
    todo: state => state.todo.filter(number => number > 10)
  },
  mutations: {
    revsiseTode: (state, oneTodo) => (state.todo = oneTodo) // 修改state的值
  },
  actions: {
    getTodo: context => Vue.http.get('/me/gettodo', (res) => {
      context.commit('revsiseTode', res.body.todo)
    })
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// ...
export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    todo: []
  },
  getters: {
    todo: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.todo.filter(number =&gt; number &gt; <span class="hljs-number">10</span>)
  },
  mutations: {
    revsiseTode: (<span class="hljs-keyword">state</span>, oneTodo) =&gt; (<span class="hljs-keyword">state</span>.todo = oneTodo) // 修改<span class="hljs-keyword">state</span>的值
  },
  actions: {
    getTodo: context =&gt; Vue.http.get('/me/gettodo', (res) =&gt; {
      context.commit('revsiseTode', res.body.todo)
    })
  }
})</code></pre>
<p>然后就可以通过触发我们的actions来提交mutations去修改state的数据了，在me.vue修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
// 在单独构建的版本中辅助函数为 Vuex.mapGetters
import { mapGetters } from 'vuex'
// 在单独构建的版本中辅助函数为 Vuex.mapMutations
import { mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      // 映射 this.todo 为 store.state.todo
      'todo'
    ])
  },
  method: {
    ...mapActions(
      [
        'reviseTodo', // 将 `this.reviseTodo()` 映射为 `this.$store.dispatch('reviseTodo')
      ]
    )
  }
}
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">// ...</span>
<span class="hljs-comment">// 在单独构建的版本中辅助函数为 Vuex.mapGetters</span>
import <span class="hljs-comment">{ mapGetters }</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-comment">// 在单独构建的版本中辅助函数为 Vuex.mapMutations</span>
import <span class="hljs-comment">{ mapActions }</span> <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

export <span class="hljs-keyword">default</span> <span class="hljs-comment">{
  computed: {
    ...mapGetters([
      // 映射 this.todo 为 store.state.todo
      'todo'
    ])
  }</span>,
  <span class="hljs-function"><span class="hljs-keyword">method</span>:</span> <span class="hljs-comment">{
    ...mapActions(
      [
        'reviseTodo', // 将 `this.reviseTodo()` 映射为 `this.$store.dispatch('reviseTodo')
      ]
    )
  }</span>
}
<span class="hljs-comment">// ...</span></code></pre>
<h1 id="articleHeader7">vuex目录结构</h1>
<p>上面主要只是简单的讲了一下vuex的使用，也只是讲了一部分，不过相信看了这里之后再去官网就会有更深的理解。当然这些都是简单的使用，如果想把vuex运用到项目，必须把他们模块化更加好看，vuex官网也为我们提供了<a href="https://vuex.vuejs.org/zh-cn/structure.html" rel="nofollow noreferrer" target="_blank">规范的项目目录结构</a>，我这里就不多啰嗦几句了。</p>
<h1 id="articleHeader8">总结</h1>
<p>vuex其实不难，我一开始也以为很难一直学不会，只要多使用就会觉得，其实也就只是别人都封装好了的方法，我们去使用这个简便的<strong>仓库</strong>就行了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue学习日记（四）——Vue状态管理vuex

## 原文链接
[https://segmentfault.com/a/1190000013108533](https://segmentfault.com/a/1190000013108533)


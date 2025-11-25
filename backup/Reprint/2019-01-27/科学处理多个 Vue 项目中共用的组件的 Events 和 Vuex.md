---
title: '科学处理多个 Vue 项目中共用的组件的 Events 和 Vuex' 
date: 2019-01-27 2:31:00
hidden: true
slug: fin6kq8p8lt
categories: [reprint]
---

{{< raw >}}

                    
<p>我们在做项目的时候，应该会有这种情况：</p>
<p>"我写了一个组件，然后做成了 npm 包，然后给好几个项目一起用。"</p>
<p><code>Vue 组件</code>也是可以这么干的，所以在公司内部可能会将组件封装成 <code>npm 模块</code>后分发给各个项目。</p>
<p>不过在 Vue 的项目中，有两个小地方可能需要精心处理下 (●’◡’●)</p>
<h2 id="articleHeader0">当公共组件使用 EventBus 时</h2>
<p><code>EventBus</code> 并不是什么独立的东西，而是 Vue 的<code>事件系统</code>的一个最佳实践，算是一种使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * EventBus.
 * src/event-bus.js
 */
export default new Vue({})


/**
 * 我的公用组件 my-component.
 */
import EventBus from 'src/event-bus'

export default {
  ...
  methods: {
    // 触发叫做 &quot;SomeModule:SomeEvent&quot; 的事件并传了值 &quot;Yeah~&quot; 过去~
    triggerSomeEvent () {
      EventBus.$emit('SomeModule:SomeEvent', 'Yeah~')
    },

    // 为我的组件注册两个事件~
    registerEvents () {
      EventBus.$on('MyComponent:Event-01', value => {
        console.log('Event-01 in MyComponent: ', value)
      }),

      EventBus.$on('MyComponent:Event-02', value => {
        console.log('Event-02 in MyComponent: ', value)
      })
    }
  },

  created () {
    this.registerEvents()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * EventBus.
 * src/event-bus.js
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue({})


<span class="hljs-comment">/**
 * 我的公用组件 my-component.
 */</span>
<span class="hljs-keyword">import</span> EventBus <span class="hljs-keyword">from</span> <span class="hljs-string">'src/event-bus'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...
  methods: {
    <span class="hljs-comment">// 触发叫做 "SomeModule:SomeEvent" 的事件并传了值 "Yeah~" 过去~</span>
    triggerSomeEvent () {
      EventBus.$emit(<span class="hljs-string">'SomeModule:SomeEvent'</span>, <span class="hljs-string">'Yeah~'</span>)
    },

    <span class="hljs-comment">// 为我的组件注册两个事件~</span>
    registerEvents () {
      EventBus.$on(<span class="hljs-string">'MyComponent:Event-01'</span>, value =&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Event-01 in MyComponent: '</span>, value)
      }),

      EventBus.$on(<span class="hljs-string">'MyComponent:Event-02'</span>, value =&gt; {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Event-02 in MyComponent: '</span>, value)
      })
    }
  },

  created () {
    <span class="hljs-keyword">this</span>.registerEvents()
  }
}</code></pre>
<p>当我们的公用模块在使用 EventBus 的时候，会有一个微小的问题，看这句话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import EventBus from 'src/event-bus'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> EventBus <span class="hljs-keyword">from</span> <span class="hljs-string">'src/event-bus'</span></code></pre>
<p><strong>我怎么保证在使用我当前模块的不同的项目中的 EventBus 的路径都是 <code>src/event-bus</code> 呢？</strong></p>
<p>所以，我们需要抽象一层，让模块<code>并不关心</code>这个 EventBus 是从哪里引入的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 我们将 EventBus 做成插件，这样就可以在项目的任何组件内使用了.
// 起名叫 $events.
// 当检测到 $events 存在的时候就使用，不存在的时候使用其他方法.

/**
 * 我们将 event-bus 封装为一个插件.
 * plugin/event-bus.js
 */
export default {
  install (Vue) {
    const EventBus = new Vue({})
    Vue.prototype.$events = EventBus
    Vue.EventBus = EventBus
  }
}

/**
 * 所以我的公用组件 my-component 要变为：
 */
export default {
  ...
  methods: {
    // 触发叫做 &quot;SomeModule:SomeEvent&quot; 的事件并传了值 &quot;Yeah~&quot; 过去~
    triggerSomeEvent () {
      if (this.$events) {
        this.$events.$emit('SomeModule:SomeEvent', 'Yeah~')        
      } else {
        // 其他方式...
      }
    },

    // 为我的组件注册两个事件~
    registerEvents () {
      if (this.$events) {
        this.$events.$on('MyComponent:Event-01', value => {
          console.log('Event-01 in MyComponent: ', value)
        }),

        this.$events.$on('MyComponent:Event-02', value => {
          console.log('Event-02 in MyComponent: ', value)
        })
      } else {
        // 其他方式...
      }
    }
  },

  created () {
    this.registerEvents()
  }
}

/**
 * 项目入口.
 * src/index.js
 */
import Vue from 'vue'
import EventBus from 'plugin/event-bus'
import MyComponent from 'my-component'

Vue.use(EventBus)

const Root = new Vue({
  components: {
    MyComponent
  },

  methods: {
    doSomething () {
      this.$events.$emit('MyComponent:Event-01', 'FA♂')
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 我们将 EventBus 做成插件，这样就可以在项目的任何组件内使用了.</span>
<span class="hljs-comment">// 起名叫 $events.</span>
<span class="hljs-comment">// 当检测到 $events 存在的时候就使用，不存在的时候使用其他方法.</span>

<span class="hljs-comment">/**
 * 我们将 event-bus 封装为一个插件.
 * plugin/event-bus.js
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  install (Vue) {
    <span class="hljs-keyword">const</span> EventBus = <span class="hljs-keyword">new</span> Vue({})
    Vue.prototype.$events = EventBus
    Vue.EventBus = EventBus
  }
}

<span class="hljs-comment">/**
 * 所以我的公用组件 my-component 要变为：
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...
  methods: {
    <span class="hljs-comment">// 触发叫做 "SomeModule:SomeEvent" 的事件并传了值 "Yeah~" 过去~</span>
    triggerSomeEvent () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$events) {
        <span class="hljs-keyword">this</span>.$events.$emit(<span class="hljs-string">'SomeModule:SomeEvent'</span>, <span class="hljs-string">'Yeah~'</span>)        
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 其他方式...</span>
      }
    },

    <span class="hljs-comment">// 为我的组件注册两个事件~</span>
    registerEvents () {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$events) {
        <span class="hljs-keyword">this</span>.$events.$on(<span class="hljs-string">'MyComponent:Event-01'</span>, value =&gt; {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Event-01 in MyComponent: '</span>, value)
        }),

        <span class="hljs-keyword">this</span>.$events.$on(<span class="hljs-string">'MyComponent:Event-02'</span>, value =&gt; {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Event-02 in MyComponent: '</span>, value)
        })
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 其他方式...</span>
      }
    }
  },

  created () {
    <span class="hljs-keyword">this</span>.registerEvents()
  }
}

<span class="hljs-comment">/**
 * 项目入口.
 * src/index.js
 */</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> EventBus <span class="hljs-keyword">from</span> <span class="hljs-string">'plugin/event-bus'</span>
<span class="hljs-keyword">import</span> MyComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'my-component'</span>

Vue.use(EventBus)

<span class="hljs-keyword">const</span> Root = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">components</span>: {
    MyComponent
  },

  <span class="hljs-attr">methods</span>: {
    doSomething () {
      <span class="hljs-keyword">this</span>.$events.$emit(<span class="hljs-string">'MyComponent:Event-01'</span>, <span class="hljs-string">'FA♂'</span>)
    }
  }
})</code></pre>
<p>OK，这样我们的组件就可以在不同项目中适应 EventBus 了！</p>
<p>这里有一个组件 <a href="https://github.com/cklmercer/vue-events" rel="nofollow noreferrer" target="_blank">cklmercer/vue-events</a> 就是解决这种问题而存在的.</p>
<h2 id="articleHeader1">当公共组件使用 Vuex 时</h2>
<p>这个问题仅仅存在于 <code>Vue 1.0</code> 的项目中，<code>Vue 2.0 + Vuex 2.0</code> 已经解决这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 我的公用组件 my-component.
 */
import store from 'src/vuex/store'
import actions from 'src/vuex/actions'
import getters from 'src/vuex/getters'

export default {
  ...
  store,

  vuex: {
    actions, getters
  },

  computed: {
    userName () {
      // &quot;getUsername&quot; 是 Vuex 中定义好的 getter.
      return this.getUsername
    }
  },

  methods: {
    changeDataInVuexByUsingAction () {
      // &quot;setUserExperience&quot; 是 Vuex 中定义好的 action.
      this.setUserExperience(450)
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 我的公用组件 my-component.
 */</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'src/vuex/store'</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'src/vuex/actions'</span>
<span class="hljs-keyword">import</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'src/vuex/getters'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...
  store,

  <span class="hljs-attr">vuex</span>: {
    actions, getters
  },

  <span class="hljs-attr">computed</span>: {
    userName () {
      <span class="hljs-comment">// "getUsername" 是 Vuex 中定义好的 getter.</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getUsername
    }
  },

  <span class="hljs-attr">methods</span>: {
    changeDataInVuexByUsingAction () {
      <span class="hljs-comment">// "setUserExperience" 是 Vuex 中定义好的 action.</span>
      <span class="hljs-keyword">this</span>.setUserExperience(<span class="hljs-number">450</span>)
    }
  }
}</code></pre>
<p>那么还是同样的问题，</p>
<p><strong>我怎么保证在使用我当前模块的不同的项目中的 Vuex 的路径都是 <code>src/vuex</code> 呢？</strong></p>
<p>所以方法一样啦，抽象出来引用路径，让模块<code>并不关心</code>是如何引入 Vuex 的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 我们将 Vuex 做成插件，这样就可以在项目的任何组件内使用了.
// 起名叫 $vuexer.
// 当检测到 $vuexer 存在的时候就使用 Vuex，不存在的时候就将数据写入组件自己内部的 state 中.

/**
 * 我们将 event-bus 封装为一个插件.
 * plugin/event-bus.js
 */
export default {
  install (Vue, { store, actions, getters }) {
    const vuexer = new Vue({
      store, actions, getters
    })
    Vue.prototype.$vuexer = vuexer
    Vue.vuexer = vuexer
  }
}

/**
 * 项目入口.
 * src/index.js
 */
import Vue from 'vue'
import Vuexer from 'plugin/vuexer'

import store from 'src/vuex/store'
import actions from 'src/vuex/actions'
import getters from 'src/vuex/getters'

import MyComponent from 'my-component'

Vue.use(Vuexer, {
  store, actions, getters
})

const Root = new Vue({
  components: {
    MyComponent
  },

  computed: {
    userExperience () {
      // &quot;getExperience&quot; 是在 Vuex 中定义好的 getter.
      return this.$vuexer.getExperience
    }
  },

  methods: {
    changeUsernameInVuex () {
      // &quot;setUsername&quot; 是在 Vuex 中定义好的 setter.
      this.$vuexer.setUsername('John Smith')
    }
  }
})

/**
 * 我的公用组件 my-component.
 */
export default {
  data () {
    return {
      _userName: '神秘用户',
      _userExperience: 65535
    }
  },

  computed: {
    userName () {
      // 如果有 Vuexer, 如果木有 Vuexer...
      return this.$vuexer
        ? this.$vuexer.getUsername
        : this._userName
    }
  },

  methods: {
    // 如果有 vuexer, 如果木有 Vuexer...    
    changeDataInVuexByUsingAction () {
      const userExperience = 450
      if (this.$vuexer) {
        this.$vuexer.setUserExperience(userExperience)
      } else {
        this._userExperience = userExperience
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 我们将 Vuex 做成插件，这样就可以在项目的任何组件内使用了.</span>
<span class="hljs-comment">// 起名叫 $vuexer.</span>
<span class="hljs-comment">// 当检测到 $vuexer 存在的时候就使用 Vuex，不存在的时候就将数据写入组件自己内部的 state 中.</span>

<span class="hljs-comment">/**
 * 我们将 event-bus 封装为一个插件.
 * plugin/event-bus.js
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  install (Vue, { store, actions, getters }) {
    <span class="hljs-keyword">const</span> vuexer = <span class="hljs-keyword">new</span> Vue({
      store, actions, getters
    })
    Vue.prototype.$vuexer = vuexer
    Vue.vuexer = vuexer
  }
}

<span class="hljs-comment">/**
 * 项目入口.
 * src/index.js
 */</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuexer <span class="hljs-keyword">from</span> <span class="hljs-string">'plugin/vuexer'</span>

<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'src/vuex/store'</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'src/vuex/actions'</span>
<span class="hljs-keyword">import</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'src/vuex/getters'</span>

<span class="hljs-keyword">import</span> MyComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'my-component'</span>

Vue.use(Vuexer, {
  store, actions, getters
})

<span class="hljs-keyword">const</span> Root = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">components</span>: {
    MyComponent
  },

  <span class="hljs-attr">computed</span>: {
    userExperience () {
      <span class="hljs-comment">// "getExperience" 是在 Vuex 中定义好的 getter.</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$vuexer.getExperience
    }
  },

  <span class="hljs-attr">methods</span>: {
    changeUsernameInVuex () {
      <span class="hljs-comment">// "setUsername" 是在 Vuex 中定义好的 setter.</span>
      <span class="hljs-keyword">this</span>.$vuexer.setUsername(<span class="hljs-string">'John Smith'</span>)
    }
  }
})

<span class="hljs-comment">/**
 * 我的公用组件 my-component.
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">_userName</span>: <span class="hljs-string">'神秘用户'</span>,
      <span class="hljs-attr">_userExperience</span>: <span class="hljs-number">65535</span>
    }
  },

  <span class="hljs-attr">computed</span>: {
    userName () {
      <span class="hljs-comment">// 如果有 Vuexer, 如果木有 Vuexer...</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$vuexer
        ? <span class="hljs-keyword">this</span>.$vuexer.getUsername
        : <span class="hljs-keyword">this</span>._userName
    }
  },

  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 如果有 vuexer, 如果木有 Vuexer...    </span>
    changeDataInVuexByUsingAction () {
      <span class="hljs-keyword">const</span> userExperience = <span class="hljs-number">450</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$vuexer) {
        <span class="hljs-keyword">this</span>.$vuexer.setUserExperience(userExperience)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>._userExperience = userExperience
      }
    }
  }
}</code></pre>
<p>妥！⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</p>
<p>至于为什么 <code>Vue 2.0 + Vuex 2.0</code> 木有这个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在 Vue 2.0 中使用 Vuex 要这么写：
// 创建一个组件.
const Components = {
  template: `<div>"{{" count "}}"</div>`,
  computed: {
    count () {
      return this.$store.getters.doneTodosCount  // 这是一个 getter.
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在 Vue 2.0 中使用 Vuex 要这么写：</span>
<span class="hljs-comment">// 创建一个组件.</span>
<span class="hljs-keyword">const</span> Components = {
  <span class="hljs-attr">template</span>: <span class="hljs-string">`&lt;div&gt;"{{" count "}}"&lt;/div&gt;`</span>,
  <span class="hljs-attr">computed</span>: {
    count () {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.doneTodosCount  <span class="hljs-comment">// 这是一个 getter.</span>
    }
  }
}</code></pre>
<p>注意 <code>computed</code> 中的 <code>return this.$store.getters.doneTodosCount</code>，看看其中的 <code>this.$store</code>，</p>
<p>是不是和 <code>this.$vuexer</code> 有点像？ (°∀°)ﾉ</p>
<p>这里还有一个组件 <a href="https://github.com/LancerComet/vuexer" rel="nofollow noreferrer" target="_blank">lancercomet/vuexer</a> 就是为 <code>Vue 1.0</code> 解决这个问题的！</p>
<p>完结撒花~</p>
<blockquote><p>By LancerComet at 01:22, 2017.01.21.</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
科学处理多个 Vue 项目中共用的组件的 Events 和 Vuex

## 原文链接
[https://segmentfault.com/a/1190000008184629](https://segmentfault.com/a/1190000008184629)


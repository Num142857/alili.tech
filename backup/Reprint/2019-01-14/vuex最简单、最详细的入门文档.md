---
title: 'vuex最简单、最详细的入门文档' 
date: 2019-01-14 2:30:07
hidden: true
slug: cwsdxu5m3q
categories: [reprint]
---

{{< raw >}}

                    
<p>如果你在使用 <code>vue.js</code> , 那么我想你可能会对 vue 组件之间的通信感到崩溃 。</p>
<p>我在使用基于 vue.js 2.0 的UI框架 <code>ElementUI</code> 开发网站的时候 , 就遇到了这种问题 : 一个页面有很多表单 , 我试图将表单写成一个单文件组件 , 但是表单 ( 子组件 ) 里的数据和页面 ( 父组件 ) 按钮交互的时候 , 它们之间的通讯很麻烦 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--父组件中引入子组件-->
<template>
  <div>
    <a href=&quot;javascript:;&quot; @click=&quot;show = true&quot;>点击</a>
    <t-dialog :show.sync=&quot;show&quot;></t-dialog>
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  data(){
    return {
      show:false
    }
  },
  components:{
    &quot;t-dialog&quot;:dialog
  }
}
</script>


<!--子组件-->
<template>
  <el-dialog :visible.sync=&quot;currentShow&quot;></el-dialog>
</template>

<script>
export default {
  props:['show'],
  computed:{
      currentShow:{
          get(){
              return this.show
          },
          set(val){
              this.$emit(&quot;update:show&quot;,val)
          }
      }
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!--父组件中引入子组件--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = true"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">t-dialog</span> <span class="hljs-attr">:show.sync</span>=<span class="hljs-string">"show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">t-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/dialog.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data(){
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">components</span>:{
    <span class="hljs-string">"t-dialog"</span>:dialog
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


<span class="hljs-comment">&lt;!--子组件--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">:visible.sync</span>=<span class="hljs-string">"currentShow"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
export <span class="hljs-keyword">default</span> {
  props:[<span class="hljs-string">'show'</span>],
  computed:{
      currentShow:{
          <span class="hljs-keyword">get</span>(){
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.show
          },
          <span class="hljs-keyword">set</span>(val){
              <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">"update:show"</span>,val)
          }
      }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>之所以这么麻烦 , 是因为父组件可以通过 <code>props</code> 给子组件传递参数 , 但子组件内却不能直接修改父组件传过来的参数。</p>
<p>这时候 , 使用 <code>vuex</code> 就可以比较方便的解决这种问题了 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--父组件中引入子组件-->
<template>
  <div>
    <a href=&quot;javascript:;&quot; @click=&quot;$store.state.show = true&quot;>点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  components:{
    &quot;t-dialog&quot;:dialog
  }
}
</script>


<!--子组件-->
<template>
  <el-dialog :visible.sync=&quot;$store.state.show&quot;></el-dialog>
</template>

<script>
export default {}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!--父组件中引入子组件--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"$store.state.show = true"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">t-dialog</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">t-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/dialog.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  components:{
    "t-dialog":dialog
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


<span class="hljs-comment">&lt;!--子组件--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">:visible.sync</span>=<span class="hljs-string">"$store.state.show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>是不是方便了许多 , 这就是 vuex 最简单的应用 , 不要被网上其他教程吓到 , vuex 原来可以这么简单 !</p>
<h2 id="articleHeader0">安装、使用 vuex</h2>
<p>首先我们在 vue.js 2.0 开发环境中安装 vuex :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> vuex <span class="hljs-comment">--save</span>
</code></pre>
<p>然后 , 在 <code>main.js</code> 中加入 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import vuex from 'vuex'
Vue.use(vuex);
var store = new vuex.Store({//store对象
    state:{
        show:false
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
Vue.use(vuex);
<span class="hljs-keyword">var</span> store = <span class="hljs-keyword">new</span> vuex.Store({<span class="hljs-comment">//store对象</span>
    state:{
        <span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>
    }
})
</code></pre>
<p>再然后 , 在实例化 Vue对象时加入 store 对象 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  store,<span class="hljs-comment">//使用store</span>
  <span class="hljs-attribute">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attribute">components</span>: { App }
})
</code></pre>
<p>完成到这一步 , 上述例子中的 <code>$store.state.show</code> 就可以使用了。</p>
<h2 id="articleHeader1">modules</h2>
<p>前面为了方便 , 我们把 store 对象写在了 main.js 里面 , 但实际上为了便于日后的维护 , 我们分开写更好 , 我们在 <code>src</code> 目录下 , 新建一个 <code>store</code> 文件夹 , 然后在里面新建一个 <code>index.js</code> :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

export default new vuex.Store({
    state:{
        show:false
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
Vue.use(vuex);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> vuex.Store({
    state:{
        show:<span class="hljs-literal">false</span>
    }
})
</code></pre>
<p>那么相应的 , 在 main.js 里的代码应该改成 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//vuex
import store from './store'

new Vue({
  el: '#app',
  router,
  store,//使用store
  template: '<App/>',
  components: { App }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//vuex</span>
<span class="hljs-keyword">import</span> store from <span class="hljs-string">'./store'</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  store,<span class="hljs-comment">//使用store</span>
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App }
})</code></pre>
<p>这样就把 store 分离出去了 , 那么还有一个问题是 : 这里 <code>$store.state.show</code> 无论哪个组件都可以使用 , 那组件多了之后 , 状态也多了 , 这么多状态都堆在 store 文件夹下的 <code>index.js</code> 不好维护怎么办 ?</p>
<p>我们可以使用 vuex 的 <code>modules</code> , 把 store 文件夹下的 <code>index.js</code> 改成 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import dialog_store from '../components/dialog_store.js';//引入某个store对象

export default new vuex.Store({
    modules: {
        dialog: dialog_store
    }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
Vue.use(vuex);

<span class="hljs-keyword">import</span> dialog_store <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/dialog_store.js'</span>;<span class="hljs-comment">//引入某个store对象</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> vuex.Store({
    <span class="hljs-attr">modules</span>: {
        <span class="hljs-attr">dialog</span>: dialog_store
    }
})
</code></pre>
<p>这里我们引用了一个 <code>dialog_store.js</code> , 在这个 js 文件里我们就可以单独写 dialog 组件的状态了 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state:{
        show:false
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">state</span>:{
        show:false
    }
}</code></pre>
<p>做出这样的修改之后 , 我们将之前我们使用的 <code>$store.state.show</code> 统统改为 <code>$store.state.dialog.show</code> 即可。</p>
<p>如果还有其他的组件需要使用 vuex , 就新建一个对应的状态文件 , 然后将他们加入 store 文件夹下的 index.js 文件中的 <code>modules</code> 中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="modules: {
    dialog: dialog_store,
    other: other,//其他组件
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">modules</span>: {
    <span class="hljs-attribute">dialog</span>: dialog_store,
    other: other,//其他组件
}
</code></pre>
<h2 id="articleHeader2">mutations</h2>
<p>前面我们提到的对话框例子 , 我们对vuex 的依赖仅仅只有一个 <code>$store.state.dialog.show</code> 一个状态 , 但是如果我们要进行一个操作 , 需要依赖很多很多个状态 , 那管理起来又麻烦了 ! </p>
<p><code>mutations</code> 登场 , 问题迎刃而解 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state:{//state
        show:false
    },
    mutations:{
        switch_dialog(state){//这里的state对应着上面这个state
            state.show = state.show?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">state</span>:{//<span class="hljs-keyword">state</span>
        show:false
    },
    mutations:{
        switch_dialog(<span class="hljs-keyword">state</span>){//这里的<span class="hljs-keyword">state</span>对应着上面这个<span class="hljs-keyword">state</span>
            <span class="hljs-keyword">state</span>.show = <span class="hljs-keyword">state</span>.show?false:true;
            //你还可以在这里执行其他的操作改变<span class="hljs-keyword">state</span>
        }
    }
}</code></pre>
<p>使用 mutations 后 , 原先我们的父组件可以改为 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <a href=&quot;javascript:;&quot; @click=&quot;$store.commit('switch_dialog')&quot;>点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  components:{
    &quot;t-dialog&quot;:dialog
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"$store.commit('switch_dialog')"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">t-dialog</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">t-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/dialog.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>:{
    <span class="hljs-string">"t-dialog"</span>:dialog
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>使用 <code>$store.commit('switch_dialog')</code> 来触发 <code>mutations</code> 中的 <code>switch_dialog</code> 方法。</p>
<p>这里需要注意的是:</p>
<ol>
<li>
<code>mutations</code> 中的方法是不分组件的 , 假如你在 dialog_stroe.js 文件中的定义了<br><code>switch_dialog</code> 方法 , 在其他文件中的一个 <code>switch_dialog</code> 方法 , 那么<br><code>$store.commit('switch_dialog')</code> 会执行所有的 <code>switch_dialog</code> 方法。</li>
<li>
<code>mutations</code>里的操作必须是同步的。</li>
</ol>
<p>你一定好奇 , 如果在 <code>mutations</code> 里执行异步操作会发生什么事情 , 实际上并不会发生什么奇怪的事情 , 只是官方推荐 , 不要在 <code>mutationss</code> 里执行异步操作而已。</p>
<h2 id="articleHeader3">actions</h2>
<p>多个 <code>state</code> 的操作 , 使用 <code>mutations</code> 会来触发会比较好维护 , 那么需要执行多个 mutations 就需要用 <code>action</code> 了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state:{//state
        show:false
    },
    mutations:{
        switch_dialog(state){//这里的state对应着上面这个state
            state.show = state.show?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    },
    actions:{
        switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('switch_dialog');
            //你还可以在这里触发其他的mutations方法
        },
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">state</span>:{//<span class="hljs-keyword">state</span>
        show:false
    },
    mutations:{
        switch_dialog(<span class="hljs-keyword">state</span>){//这里的<span class="hljs-keyword">state</span>对应着上面这个<span class="hljs-keyword">state</span>
            <span class="hljs-keyword">state</span>.show = <span class="hljs-keyword">state</span>.show?false:true;
            //你还可以在这里执行其他的操作改变<span class="hljs-keyword">state</span>
        }
    },
    actions:{
        switch_dialog(context){//这里的context和我们使用的<span class="hljs-variable">$store</span>拥有相同的对象和方法
            context.commit('switch_dialog');
            //你还可以在这里触发其他的mutations方法
        },
    }
}</code></pre>
<p>那么 , 在之前的父组件中 , 我们需要做修改 , 来触发 action 里的 switch_dialog 方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <a href=&quot;javascript:;&quot; @click=&quot;$store.dispatch('switch_dialog')&quot;>点击</a>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
import dialog from './components/dialog.vue'
export default {
  components:{
    &quot;t-dialog&quot;:dialog
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:;"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"$store.dispatch('switch_dialog')"</span>&gt;</span>点击<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">t-dialog</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">t-dialog</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> dialog <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/dialog.vue'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>:{
    <span class="hljs-string">"t-dialog"</span>:dialog
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>使用 <code>$store.dispatch('switch_dialog')</code> 来触发 <code>action</code> 中的 <code>switch_dialog</code> 方法。</p>
<p>官方推荐 , 将异步操作放在 action 中。</p>
<h2 id="articleHeader4">getters</h2>
<p><code>getters</code> 和 vue 中的 <code>computed</code> 类似 , 都是用来计算 state 然后生成新的数据 ( 状态 ) 的。</p>
<p>还是前面的例子 , 假如我们需要一个与状态 <code>show</code> 刚好相反的状态 , 使用 vue 中的 <code>computed</code> 可以这样算出来 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed(){
    not_show(){
        return !this.$store.state.dialog.show;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>computed(){
    not_show(){
        return !this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>.dialog.show;
    }
}
</code></pre>
<p>那么 , 如果很多很多个组件中都需要用到这个与 show 刚好相反的状态 , 那么我们需要写很多很多个 <code>not_show</code> , 使用 <code>getters</code> 就可以解决这种问题 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    state:{//state
        show:false
    },
    getters:{
        not_show(state){//这里的state对应着上面这个state
            return !state.show;
        }
    },
    mutations:{
        switch_dialog(state){//这里的state对应着上面这个state
            state.show = state.show?false:true;
            //你还可以在这里执行其他的操作改变state
        }
    },
    actions:{
        switch_dialog(context){//这里的context和我们使用的$store拥有相同的对象和方法
            context.commit('switch_dialog');
            //你还可以在这里触发其他的mutations方法
        },
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> {
    <span class="hljs-keyword">state</span>:{//<span class="hljs-keyword">state</span>
        show:false
    },
    getters:{
        not_show(<span class="hljs-keyword">state</span>){//这里的<span class="hljs-keyword">state</span>对应着上面这个<span class="hljs-keyword">state</span>
            return !<span class="hljs-keyword">state</span>.show;
        }
    },
    mutations:{
        switch_dialog(<span class="hljs-keyword">state</span>){//这里的<span class="hljs-keyword">state</span>对应着上面这个<span class="hljs-keyword">state</span>
            <span class="hljs-keyword">state</span>.show = <span class="hljs-keyword">state</span>.show?false:true;
            //你还可以在这里执行其他的操作改变<span class="hljs-keyword">state</span>
        }
    },
    actions:{
        switch_dialog(context){//这里的context和我们使用的<span class="hljs-variable">$store</span>拥有相同的对象和方法
            context.commit('switch_dialog');
            //你还可以在这里触发其他的mutations方法
        },
    }
}</code></pre>
<p>我们在组件中使用 <code>$store.state.dialog.show</code> 来获得状态 <code>show</code> , 类似的 , 我们可以使用 <code>$store.getters.not_show</code> 来获得状态 <code>not_show</code> 。</p>
<p>注意 :  <code>$store.getters.not_show</code> 的值是不能直接修改的 , 需要对应的 state 发生变化才能修改。</p>
<h2 id="articleHeader5">mapState、mapGetters、mapActions</h2>
<p>很多时候 , <code>$store.state.dialog.show</code> 、<code>$store.dispatch('switch_dialog')</code> 这种写法又长又臭 , 很不方便 , 我们没使用 vuex 的时候 , 获取一个状态只需要 <code>this.show</code> , 执行一个方法只需要 <code>this.switch_dialog</code> 就行了 , 使用 vuex 使写法变复杂了 ?</p>
<p>使用 <code>mapState、mapGetters、mapActions</code> 就不会这么复杂了。</p>
<p>以 mapState 为例 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-dialog :visible.sync=&quot;show&quot;></el-dialog>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed:{

    //这里的三点叫做 : 扩展运算符
    ...mapState({
      show:state=>state.dialog.show
    }),
  }
}
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">:visible.sync</span>=<span class="hljs-string">"show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {mapState} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">computed</span>:{

    <span class="hljs-comment">//这里的三点叫做 : 扩展运算符</span>
    ...mapState({
      <span class="hljs-attr">show</span>:<span class="hljs-function"><span class="hljs-params">state</span>=&gt;</span>state.dialog.show
    }),
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>相当于 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <el-dialog :visible.sync=&quot;show&quot;></el-dialog>
</template>

<script>
import {mapState} from 'vuex';
export default {
  computed:{
    show(){
        return this.$store.state.dialog.show;
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">:visible.sync</span>=<span class="hljs-string">"show"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {mapState} <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">computed</span>:{
    show(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.dialog.show;
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>mapGetters、mapActions 和 mapState 类似 , <code>mapGetters</code> 一般也写在 <code>computed</code> 中 , <code>mapActions</code> 一般写在 <code>methods</code> 中。</p>
<p>弄懂上面这些 , 你可以去看<strong>vuex</strong>文档了 , 应该能看懂了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuex最简单、最详细的入门文档

## 原文链接
[https://segmentfault.com/a/1190000009404727](https://segmentfault.com/a/1190000009404727)


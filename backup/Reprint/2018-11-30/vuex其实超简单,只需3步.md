---
title: 'vuex其实超简单,只需3步' 
date: 2018-11-30 2:30:11
hidden: true
slug: ikf8ies6l1
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>之前几个项目中,都多多少少碰到一些组件之间需要通信的地方,而因为种种原因,<br>event bus 的成本反而比vuex还高, 所以技术选型上选用了 vuex, 但是不知道为什么,<br>团队里的一些新人一听到vuex,就开始退缩了, 因为vuex 很难? 真的很难吗?<br>今天我们用简单的3步来证明一下,vuex有多简单.</p>
<blockquote>
<h4>纯属个人经验,难免有不正确的地方,如有发现,欢迎指正!</h4>
<h4>这是一个针对新手的入门级教程、入门级教程、入门级教程</h4>
</blockquote>
<h3 id="articleHeader1">第零步</h3>
<p>新建一个vue项目,安装vuex,这里不做过多介绍,能点进来的,默认你具备这些技能 ^_^</p>
<h3 id="articleHeader2">第一步</h3>
<p>新建一个<code>.js</code> 文件,名字位置任意,按照惯例,建议在<code>/src/store</code> 目录下(没有的话自己新建一个呗)</p>
<p><code>文件位置 /src/store/index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入vue 和 vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 这里需要use一下,固定写法,记住即可
Vue.use(Vuex)

// 直接导出 一个 Store 的实例
export default new Vuex.Store({
  // 类似 vue 的 data
  state: {
    name: 'oldName'
  },
  // 类似 vue 里的 mothods(同步方法)
  mutations: {
    updateName (state) {
      state.name = 'newName'
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 引入vue 和 vuex</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-comment">// 这里需要use一下,固定写法,记住即可</span>
Vue.use(Vuex)

<span class="hljs-comment">// 直接导出 一个 Store 的实例</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">// 类似 vue 的 data</span>
  state: {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'oldName'</span>
  },
  <span class="hljs-comment">// 类似 vue 里的 mothods(同步方法)</span>
  mutations: {
    updateName (state) {
      state.name = <span class="hljs-string">'newName'</span>
    }
  }
})</code></pre>
<p>代码看起来稍微有那么一点点多,不过看起来是不是很熟悉? 跟普通的 vue 没多大差别嘛.<br>这一步其实就是新建一个store,但是我们还没在项目中使用.</p>
<h3 id="articleHeader3">第二步</h3>
<p>在入口文件引入上述文件, 并稍微改一下传给 new Vue()的参数,<strong>新增的行后面有备注</strong></p>
<p><code>文件位置 /src/main.js</code> (vue-cli自动生成的入口,如果你能不用脚手架,那么也就不需要我说明了)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import vuexStore from './store'   // 新增

new Vue({
  el: '#app',
  store:vuexStore                 // 新增
  components: { App },
  template: '<App/>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> vuexStore <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>   <span class="hljs-comment">// 新增</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  store:vuexStore                 <span class="hljs-comment">// 新增</span>
  components: { App },
  template: <span class="hljs-string">'&lt;App/&gt;'</span>
})</code></pre>
<blockquote>Tip: import store from './store' 后面的地址,就是上面我们新建那个文件的位置(<code>/src/store/index.js</code>),<br>因为我这里是index.js,所以可以省略.</blockquote>
<h3 id="articleHeader4">第三步</h3>
<p>以上2步,其实已经完成了vuex的基本配置,接下来就是使用了</p>
<p><code>文件位置 /src/main.js</code> (同样是vue-cli生成的app.vue,这里为了方便演示,我去掉多余的代码)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    "{{"getName"}}"
    <button @click=&quot;changeName&quot; value=&quot;更名&quot;>更名</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  computed:{
    getName(){
      return this.$store.state.name
    }
  },
  methods:{
    changeName () {
      this.$store.commit('updateName')
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    "{{"getName"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"changeName"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"更名"</span>&gt;</span>更名<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
import HelloWorld from './</span>components/HelloWorld<span class="hljs-string">'

export default {
  computed:{
    getName(){
      return this.$store.state.name
    }
  },
  methods:{
    changeName () {
      this.$store.commit('</span>updateName<span class="hljs-string">')
    }
  }
}
&lt;/script&gt;</span></code></pre>
<p>这里就是一个很普通的vue文件了,有区别的地方是这里我们需要用computed属性去获取 <code>store 里的 "data"</code></p>
<p>还有就是我们要改变数据的话,不再用 <code>this.xxx = xxx</code> 改成 this.$store.commit('updateName')</p>
<h3 id="articleHeader5">总结</h3>
<p><strong>你可能会觉得,上例这样做的意义何在,为何不直接用vue的data跟methods?</strong></p>
<p>上例只是为了简单讲解如何使用vuex,所以简化了一些流程,试想一下,如果你有这样一个页面:<br>一共嵌套了10层组件(即子组件里面还有子子组件,子子组件下面还有子子子组件,以此类推10层)<br>然后最后一层组件一个数据改变了,要通知第一层组件的时候,我们只需在最底层组件里<code>this.$store.commit()</code>,<br>然后再最外层组件上用computed属性获取对应的值,就能做到实时更新.无需层层$emit上去.</p>
<h3 id="articleHeader6">最后</h3>
<p>本来想在最后再扩展一下getter,action+dispatch,模块化等等,不过为了对得起这个标题,<br>只好放在 <a href="https://github.com/noahlam/articles/blob/master/vuex%E5%85%B6%E5%AE%9E%E8%B6%85%E7%AE%80%E5%8D%95%2C%E5%96%9D%E5%AE%8C%E8%BF%993%E6%AD%A5%2C%E8%BF%98%E6%9C%893%E6%AD%A5.md" rel="nofollow noreferrer" target="_blank">下一篇:vuex其实超简单,喝完这3步,还有3步</a></p>
<p>如果觉得本文对您有用，请给本文的<a href="https://github.com/noahlam/articles" rel="nofollow noreferrer" target="_blank">github</a>加个star,万分感谢</p>
<p>另外，<a href="https://github.com/noahlam/articles" rel="nofollow noreferrer" target="_blank">github</a>上还有其他一些关于前端的教程和组件，有兴趣的童鞋可以看看，你们的支持就是我最大的动力。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuex其实超简单,只需3步

## 原文链接
[https://segmentfault.com/a/1190000014925937](https://segmentfault.com/a/1190000014925937)


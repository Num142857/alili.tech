---
title: 'vue全局使用axios的方法' 
date: 2018-12-14 2:30:11
hidden: true
slug: tofff0188q9
categories: [reprint]
---

{{< raw >}}

                    
<p>在vue项目开发中，我们使用axios进行ajax请求，很多人一开始使用axios的方式，会当成vue-resoure的使用方式来用，即在主入口文件引入import VueResource from 'vue-resource'之后，直接使用Vue.use(VueResource)之后即可将该插件全局引用了，所以axios这样使用的时候就报错了，很懵逼。</p>
<p>仔细看看文档，就知道axios 是一个基于 promise 的 HTTP 库，axios并没有install 方法，所以是不能使用vue.use()方法的。☞查看<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">vue插件</a><br>那么难道我们要在每个文件都要来引用一次axios吗？多繁琐！！！解决方法有很多种：<br>1.结合 vue-axios使用<br>2.<a href="https://www.npmjs.com/package/axios#resources" rel="nofollow noreferrer" target="_blank">axios</a> 改写为 Vue 的原型属性<br>3.结合 Vuex的action</p>
<h2 id="articleHeader0">1.结合 vue-axios使用</h2>
<p>看了<a href="https://www.npmjs.com/package/vue-axios" rel="nofollow noreferrer" target="_blank">vue-axios</a>的源码，它是按照vue插件的方式去写的。那么结合vue-axios，就可以去使用vue.use方法了</p>
<p>首先在主入口文件main.js中引用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios,axios);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">import</span> VueAxios <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-axios'</span>

Vue.use(VueAxios,axios);</code></pre>
<p>之后就可以使用了，在组件文件中的methods里去使用了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getNewsList(){
      this.axios.get('api/getNewsList').then((response)=>{
        this.newsList=response.data.data;
      }).catch((response)=>{
        console.log(response);
      })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>getNewsList(){
      <span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">'api/getNewsList'</span>).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
        <span class="hljs-keyword">this</span>.newsList=response.data.data;
      }).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(response);
      })
}
</code></pre>
<h2 id="articleHeader1">2.axios 改写为 Vue 的原型属性（不推荐这样用）</h2>
<p>首先在主入口文件main.js中引用，之后挂在vue的原型链上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
Vue.prototype.$ajax= axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">import</span> axios from 'axios'
<span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.$ajax= axios</code></pre>
<p>在组件中使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$ajax.get('api/getNewsList')
.then((response)=>{
    this.newsList=response.data.data;
}).catch((response)=>{
    console.log(response);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">this</span>.$ajax.get(<span class="hljs-string">'api/getNewsList'</span>)
.<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
    <span class="hljs-keyword">this</span>.newsList=response.data.data;
}).<span class="hljs-keyword">catch</span>(<span class="hljs-function"><span class="hljs-params">(response)</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(response);
})</code></pre>
<p>结合 Vuex的action<br>在vuex的仓库文件store.js中引用，使用action添加方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'Vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)
const store = new Vuex.Store({
  // 定义状态
  state: {
    user: {
      name: 'xiaoming'
    }
  },
  actions: {
    // 封装一个 ajax 方法
    login (context) {
      axios({
        method: 'post',
        url: '/user',
        data: context.state.user
      })
    }
  }
})

export default store" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'Vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

Vue.use(Vuex)
<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">// 定义状态</span>
  state: {
    <span class="hljs-attr">user</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'xiaoming'</span>
    }
  },
  <span class="hljs-attr">actions</span>: {
    <span class="hljs-comment">// 封装一个 ajax 方法</span>
    login (context) {
      axios({
        <span class="hljs-attr">method</span>: <span class="hljs-string">'post'</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">'/user'</span>,
        <span class="hljs-attr">data</span>: context.state.user
      })
    }
  }
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store</code></pre>
<p>在组件中发送请求的时候，需要使用 this.$store.dispatch</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
  submitForm () {
    this.$store.dispatch('login')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>methods: {
  submitForm () {
    this.$store.dispatch(<span class="hljs-string">'login'</span>)
  }
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue全局使用axios的方法

## 原文链接
[https://segmentfault.com/a/1190000013128858](https://segmentfault.com/a/1190000013128858)


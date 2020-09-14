---
title: '一个完整的vue应用 ( vuex+vue-router ) 起手' 
date: 2019-01-31 2:31:16
hidden: true
slug: vzb4lmt9ve8
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">项目连接</h3>
<p><a href="https://github.com/Hokkaidosunny/generator-vue-bucket.git" rel="nofollow noreferrer" target="_blank">github链接</a></p>
<h3 id="articleHeader1">介绍</h3>
<ul>
<li><p>本项目主要介绍如何使用vue+vuex+vue-router开启一个SPA应用，注重的是将应用搭建起来，所以项目不大</p></li>
<li><p>第一次发文，不知道如何开口，那我就直接上代码了，一切尽在注释中(￣▽￣)"，各位看官原谅</p></li>
<li><p>看这篇文章之前，希望你已经对vue有所认识，知道vuex，vue-router，要是懂一点flux原理就更好了</p></li>
<li><p>如果之前是react的用户，我相信转vue一定非常easy，因为两者有很多的共同点</p></li>
<li><p>用到的技术：<code>vue</code> <code>vuex</code> <code>vue-router</code> <code>fetch</code> <code>sass</code> <code>babel</code> <code>webpack</code></p></li>
</ul>
<h3 id="articleHeader2">目录结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── src
│&nbsp;&nbsp; ├── components    #组件
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Counter.vue
│&nbsp;&nbsp; ├── store
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── counter.js    #counter actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── fetchApi.js    #fetch action
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js    ##合并导出 actions
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── getters    #通过一些函数对store上的元数据做一些操作后再返回给组件使用
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js    
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── mutations    #处理上面对应的actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── counter.js    #counter mutations
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── fetchApi.js    #fetch mutation
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js    #合并导出 mutations
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index.js    #合并上面的东西，export store
│&nbsp;&nbsp; ├── style #样式
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── app.scss
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── counterpage.scss
│&nbsp;&nbsp; │&nbsp;&nbsp; └── homepage.scss
│&nbsp;&nbsp; ├── views    #页面，由组件拼凑而成
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── App.vue    #可以理解为页面的容器，页面在这个容器中切换
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── CounterPage.vue    #计算页
│&nbsp;&nbsp; │&nbsp;&nbsp; └── HomePage.vue    #首页
│&nbsp;&nbsp; ├── index.html    #html模板
│&nbsp;&nbsp; ├── main.js    #入口文件
│&nbsp;&nbsp; └── route-config.js    #路由配置
├── package.json
├── .babelrc
└── webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="shell">├── src
│&nbsp;&nbsp; ├── components    #组件
│&nbsp;&nbsp; │&nbsp;&nbsp; └── Counter<span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; ├── store
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── counter<span class="hljs-selector-class">.js</span>    <span class="hljs-selector-id">#counter</span> actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── fetchApi<span class="hljs-selector-class">.js</span>    <span class="hljs-selector-id">#fetch</span> action
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>    ##合并导出 actions
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── getters    #通过一些函数对store上的元数据做一些操作后再返回给组件使用
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>    
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── mutations    #处理上面对应的actions
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── counter<span class="hljs-selector-class">.js</span>    <span class="hljs-selector-id">#counter</span> mutations
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; ├── fetchApi<span class="hljs-selector-class">.js</span>    <span class="hljs-selector-id">#fetch</span> mutation
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>    #合并导出 mutations
│&nbsp;&nbsp; │&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>    #合并上面的东西，export store
│&nbsp;&nbsp; ├── style #样式
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── app<span class="hljs-selector-class">.scss</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── counterpage<span class="hljs-selector-class">.scss</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── homepage<span class="hljs-selector-class">.scss</span>
│&nbsp;&nbsp; ├── views    #页面，由组件拼凑而成
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── App<span class="hljs-selector-class">.vue</span>    #可以理解为页面的容器，页面在这个容器中切换
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── CounterPage<span class="hljs-selector-class">.vue</span>    #计算页
│&nbsp;&nbsp; │&nbsp;&nbsp; └── HomePage<span class="hljs-selector-class">.vue</span>    #首页
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.html</span>    #html模板
│&nbsp;&nbsp; ├── main<span class="hljs-selector-class">.js</span>    #入口文件
│&nbsp;&nbsp; └── route-config<span class="hljs-selector-class">.js</span>    #路由配置
├── package<span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-class">.babelrc</span>
└── webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<h3 id="articleHeader3">主要文件</h3>
<h5><code>src/main.js</code></h5>
<p>做为入口文件，我们当然会把所有要用到的都给引入进来。</p>
<p>引入router很简单，创建一个VueRouter的实例，最重要的两个参数一个就是路由模式，一个就是路由配置(见下)，创建好以后，扔到Vue实例的配置中就行，最终路由的所有相关信息都会挂在<code>this.$router</code>上，组件可以通过<code>this.$router</code>直接访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('es6-promise').polyfill();  //es6 promise
require('isomorphic-fetch');  //fetch库

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './route-config.js';    //路由配置
import store from './store/index.js';    //store
import App from './views/App.vue';    //页面容器

Vue.use(VueRouter);    //vue使用veux，vue-router 都是通过Vue这个对象上的use这个方法。

//创建路由
const router = new VueRouter({
  mode: 'hash',    //路由的模式
  routes
});

//将store, router加入并生成应用
new Vue({
  el: '#application',
  store,
  router,
  render: h => h(App)
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">'es6-promise'</span>).polyfill();  <span class="hljs-comment">//es6 promise</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'isomorphic-fetch'</span>);  <span class="hljs-comment">//fetch库</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-keyword">import</span> routes <span class="hljs-keyword">from</span> <span class="hljs-string">'./route-config.js'</span>;    <span class="hljs-comment">//路由配置</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store/index.js'</span>;    <span class="hljs-comment">//store</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/App.vue'</span>;    <span class="hljs-comment">//页面容器</span>

Vue.use(VueRouter);    <span class="hljs-comment">//vue使用veux，vue-router 都是通过Vue这个对象上的use这个方法。</span>

<span class="hljs-comment">//创建路由</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'hash'</span>,    <span class="hljs-comment">//路由的模式</span>
  routes
});

<span class="hljs-comment">//将store, router加入并生成应用</span>
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#application'</span>,
  store,
  router,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
});</code></pre>
<h5><code>src/route-config.js</code></h5>
<p>路由配置也很简单，文档有详细的例子。如果应用过大，打包到一个js文件里有点不合适，我们可以在这里引入页面的时候做页面的懒加载，就是code spliting。<a href="https://router.vuejs.org/zh-cn/advanced/lazy-loading.html" rel="nofollow noreferrer" target="_blank">懒加载例子</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import HomePage from './views/HomePage.vue';    //引入页面
import CounterPage from './views/CounterPage.vue';

//当然真正应用的路由不会这么简单，vue-router也提供动态路由，嵌套路由等等，详见vue-router文档
export default [
  { path: '/', component: HomePage },
  { path: '/counter', component: CounterPage}
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> HomePage <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/HomePage.vue'</span>;    <span class="hljs-comment">//引入页面</span>
<span class="hljs-keyword">import</span> CounterPage <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/CounterPage.vue'</span>;

<span class="hljs-comment">//当然真正应用的路由不会这么简单，vue-router也提供动态路由，嵌套路由等等，详见vue-router文档</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: HomePage },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/counter'</span>, <span class="hljs-attr">component</span>: CounterPage}
];</code></pre>
<h5><code>src/store/index.js</code></h5>
<p>同使用vue-router一样，先调一下use方法，然后新建一个Store实例，把state，actions，getters，mutations全扔进去。</p>
<p>最终将store抛出，会被用在新建vue实例的时候。同样store的所有相关会挂在this.$store上，组件可以通过this.$store直接访问。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions/index.js';
import mutations from './mutations/index.js';
import * as getters from './getters/index.js';

Vue.use(Vuex);

//state
const state = {
  count: 0,    //counter actions 操作的值
  pageData: {}    //fetch action 操作的值
};

//把上面的融到一起
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions/index.js'</span>;
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations/index.js'</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> getters <span class="hljs-keyword">from</span> <span class="hljs-string">'./getters/index.js'</span>;

Vue.use(Vuex);

<span class="hljs-comment">//state</span>
<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,    <span class="hljs-comment">//counter actions 操作的值</span>
  pageData: {}    <span class="hljs-comment">//fetch action 操作的值</span>
};

<span class="hljs-comment">//把上面的融到一起</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  actions,
  getters,
  mutations
});
</code></pre>
<h5><code>src/views/App.vue</code></h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style lang=&quot;sass&quot; src=&quot;../style/app.scss&quot;></style>

<template lang=&quot;html&quot;>
  <div id=&quot;app&quot;>
    <!--你也可以在其他地方使用<router-view></router-view>来创建嵌套路由，详见vue-router文档-->
    <router-view></router-view>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"sass"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../style/app.scss"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--你也可以在其他地方使用&lt;router-view&gt;&lt;/router-view&gt;来创建嵌套路由，详见vue-router文档--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<h3 id="articleHeader4">总结</h3>
<p>看到这里，各位聪明的看官，一定已经知道如何把vue，vuex，vue-router串联起来了。</p>
<p>vue的官方文档很全，也出了中文文档，而且vue的设计思路清晰，应用的结构也比较简单明了，所以上手vue不是一件很难的事情。</p>
<p>分享一波文档地址：</p>
<p><a href="https://vuefe.cn/" rel="nofollow noreferrer" target="_blank">vue</a>        <a href="https://vuefe.cn/vuex/" rel="nofollow noreferrer" target="_blank">vuex</a>    <a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router</a></p>
<p>最后各位别忘了github右上角点波关注, 噢，说错了，点颗star (￣３￣)，谢谢大家</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个完整的vue应用 ( vuex+vue-router ) 起手

## 原文链接
[https://segmentfault.com/a/1190000007480285](https://segmentfault.com/a/1190000007480285)


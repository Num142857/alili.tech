---
title: 'Vue.js教程: 构建一个预渲染SEO友好的应用示例 [译]' 
date: 2019-01-05 2:30:10
hidden: true
slug: aib6e11s82m
categories: [reprint]
---

{{< raw >}}

                    
<p>作者：<a href="https://snipcart.com/blog?author=2765" rel="nofollow noreferrer" target="_blank">Maxime Laboissonniere</a></p>
<p>原文地址: <a href="https://snipcart.com/blog/vuejs-tutorial-seo-example" rel="nofollow noreferrer" target="_blank">Vue.js Tutorial: An Example to Build and Prerender an SEO-Friendly Site</a></p>
<p>译者：<a href="https://github.com/jeneser" rel="nofollow noreferrer" target="_blank">jeneser</a></p>
<blockquote><p>快速了解？直接前往教程步骤或<a href="https://github.com/snipcart/vue-prerender-snipcart" rel="nofollow noreferrer" target="_blank">Github仓库</a>&amp;<a href="https://vue-snipcart.netlify.com/" rel="nofollow noreferrer" target="_blank">在线演示</a></p></blockquote>
<p>“我受不了了！我们的内部报告面板太烂了”</p>
<p>产品经理很生气。他从这个即将崩溃的应用程序中拉取数据的操作是灾难性的。</p>
<p>“Max，我们需要更好的报告。你能修吗？”</p>
<p>“老实说，我更愿意建立一个全新的应用”，我笑着回答说。</p>
<p>“好，请便。全权委托，老铁”</p>
<p>我笑着，搓了搓手。最后，在一个需要使用JS框架的场景中，大家一致选择了<code>Vue.js</code>。</p>
<hr>
<p>最近，我完成该应用的代码，我对它简直爱不释手。<br>我花了一些时间为社区写了一个vue.js教程，这些教程的灵感全部来自于我最近对vue的实践。在这里，我主要讨论以下两点：</p>
<ol>
<li><p>如何使用Vue.js构建精简的Web应用程序</p></li>
<li><p>如何使用<a href="https://github.com/chrisvfritz/prerender-spa-plugin" rel="nofollow noreferrer" target="_blank"><code>prerender-spa-plugin</code></a>来处理Vue.js应用的预渲染与SEO</p></li>
</ol>
<p>更具体地说，我将带您创建一个小商店，它将具备SEO友好的产品页面。我会提供在线演示以及相关代码。<br>在我们开发的最新版<a href="https://snipcart.com/blog/intro-api-first-headless-cms-directus" rel="nofollow noreferrer" target="_blank">Headless CMS</a>中我接触过一些vue，这一次我们会更加的深入，我很兴奋！</p>
<blockquote><p>更新：我们正在将Snipcart的前端从Backbone迁移到Vue.js，<a href="https://snipcart.com/blog/progressive-migration-backbone-vuejs-refactoring" rel="nofollow noreferrer" target="_blank">了解更多</a></p></blockquote>
<p>我们先来为那些不熟悉渐进式框架(Vue.js)的同学做一下简单的介绍。</p>
<h2 id="articleHeader0">Vue.js到底是什么？</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010613015" src="https://static.alili.tech/img/remote/1460000010613015" alt="Vue.js" title="Vue.js" style="cursor: pointer;"></span></p>
<p><strong>Vue.js是一套帮助你构建用户界面的轻量级，渐进式的JavaScript框架</strong></p>
<p>不要被“JS框架”这一定义所愚弄。Vue与目前流行的React.js &amp; Angular.js是截然不同的。对于初学者来说，它不是Google＆Facebook等商业技术巨头的开源副产品。</p>
<p><a href="https://twitter.com/youyuxi" rel="nofollow noreferrer" target="_blank">Evan You</a>(尤雨溪)在2014年首次发布了它，旨在创建一个“增量开发”的现代JS库。Vue最强大的功能之一是：创建可复用的组件，你可以在其他项目中重用这些组件而不用再次编写。所有开发人员都可以在项目中尝试Vue，而不用担心这会对现有的代码库产生危害或是增加额外的负担。</p>
<p>抛开模式和术语，我觉得Vue有以下提论：</p>
<p><strong>1. 一开始你不知道整个应用的架构状态</strong><br><strong>2. 应用数据一定会在运行时发生改变</strong></p>
<p>正是围绕这些提论，vue塑造了自身：它是渐进式，基于组件和响应式的。组件的粒度划分可以让你轻松地分离应用逻辑，同时又保持它们的可重用性。更重要的是，它将您的数据原生绑定到视图，以便在需要时“神奇”地更新(通过watcher)。虽然许多响应式前端框架拥有同样的功能，但是我发现Vue更优雅的实现了它，并且，对于我的大多数用例，它往往表现的更好。</p>
<p>Vue还具有更加平滑的学习曲线，对于React来说，我们需要掌握JSX模板等的相关知识。甚至可以说Vue是React减去了比较复杂的部分。</p>
<p><em>Vue官方文档提供了与其他JS框架(React, Angular, Ember, Knockout, Polymer, Riot)更加深入的对比。<a href="https://vuejs.org/v2/guide/comparison.html" rel="nofollow noreferrer" target="_blank">查看官方文档</a></em></p>
<p>最后但同样重要的是：得益于高性能&amp;强大的开发工具，Vue为我们提供了最佳的编码体验。它能<a href="https://www.quora.com/How-popular-is-VueJS-in-the-industry/answer/Evan-You-3" rel="nofollow noreferrer" target="_blank">如此流行</a>也就不足为奇了!</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010613016" src="https://static.alili.tech/img/remote/1460000010613016" alt="vuejs流行度" title="vuejs流行度" style="cursor: pointer;"></span></p>
<p>从开源项目<a href="https://laravel.com/" rel="nofollow noreferrer" target="_blank">Laravel</a>＆<a href="https://snipcart.com/blog/pagekit-cms-ecommerce-demo" rel="nofollow noreferrer" target="_blank">PageKit</a>，到企业，如<a href="https://about.gitlab.com/2016/10/20/why-we-chose-vue/" rel="nofollow noreferrer" target="_blank">Gitlab</a>＆<a href="http://codeship.com/" rel="nofollow noreferrer" target="_blank">Codeship</a>（更不用说阿里巴巴和百度这些巨头了），许多组织正在使用Vue。</p>
<p>OK，现在是时候来看看我们将如何使用它了。</p>
<h2 id="articleHeader1">Vue.js例子：一个快速的，搜索引擎友好的电子商务应用</h2>
<p>在本节中，我会告诉你如何使用<code>Vue 2.0 &amp; Snipcart</code>建立一个小型的电子商务应用程序。我们还将看到如何确保产品页面被搜索引擎正确“抓取”。</p>
<h3 id="articleHeader2">准备</h3>
<ul>
<li><p>了解一些Vue.js相关知识，<a href="https://www.slideshare.net/paddylock/an-introduction-to-vuejs" rel="nofollow noreferrer" target="_blank">还不了解？</a></p></li>
<li><p>基本了解<a href="https://vuex.vuejs.org/en/intro.html" rel="nofollow noreferrer" target="_blank">vuex</a> &amp; <a href="https://router.vuejs.org/en/" rel="nofollow noreferrer" target="_blank">vue-router</a></p></li>
<li><p><a href="https://app.snipcart.com/register" rel="nofollow noreferrer" target="_blank">一个Snipcart帐户</a>（测试模式永久免费）</p></li>
</ul>
<p>如果你想深入了解 Vue 2.0 相关知识，可以查看Laracasts上的<a href="https://laracasts.com/series/learn-vue-2-step-by-step" rel="nofollow noreferrer" target="_blank">这个系列</a>。</p>
<h3 id="articleHeader3">1. 环境配置</h3>
<p>首先，我们将使用vue-cli来构建基本的Vue应用程序。在你喜欢的终端里，输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli
vue init webpack-simple vue-snipcart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>npm install -g vue-<span class="hljs-keyword">cli</span>
vue init webpack-simple vue-snipcart</code></pre>
<p>这将创建一个新的vue-snipcart文件夹，其中包含使用vue-loader的基本配置，它将能使我们编写单文件组件(template/js/css在同一个<code>.vue</code>文件中)。</p>
<p>我们希望这个示例尽可能真实，因此，我们将在本应用中增加两个广泛应用于大型项目的模块：<code>vuex</code>和<code>vue-router</code>。</p>
<ul>
<li><p>vuex是类Flux架构的状态管理器 - 轻量级，非常强大。它受到了Redux的影响，你可以在这里<a href="https://egghead.io/courses/getting-started-with-redux" rel="nofollow noreferrer" target="_blank">了解更多</a>。</p></li>
<li><p>vue-router允许您定义路由以动态处理应用程序的组件。</p></li>
</ul>
<p>要安装这些，请先进入<code>vue-snipcart</code>项目文件夹，然后运行以下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save vue-router
npm intsall --save vuex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save vue-router</span>
npm intsall <span class="hljs-comment">--save vuex</span></code></pre>
<p>接下来要安装的是<code>prerender-spa-plugin</code>，这将使我们能够预渲染“蜘蛛”将要爬行的路径：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save prerender-spa-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save prerender-spa-plugin</span></code></pre>
<p>快要完成了，最后四个包：</p>
<ul>
<li><p>pug - 模板引擎，相对于HTML我更喜欢它。</p></li>
<li><p>vuex-router-sync-to - 轻松保持vue-router和vuex存储同步。</p></li>
<li><p>copy-webpack-plugin-to - 轻松包含我们在dist文件夹中的静态文件。</p></li>
<li><p>babel-polyfill - 在PhantomJS中运行Vue（通过我们的预渲染插件使用）。</p></li>
</ul>
<p>运行这些：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save pug
npm install --save vuex-router-sync
npm install --save copy-webpack-plugin
npm install --save babel-polyfill" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save pug</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save vuex-router-sync</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save copy-webpack-plugin</span>
npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save babel-polyfill</span></code></pre>
<h3 id="articleHeader4">2. 架构</h3>
<p>安装完成后请检查是否安装正确。之后，便可以处理我们的商店数据了。</p>
<p>先从<code>vuex</code>的<code>store</code>开始，我们将使用它来存储/访问我们的产品信息。</p>
<p>在本演示中，我们将使用静态数据，如果我们要取而代之，它仍然可以工作。</p>
<p><em>注：关于Snipcart，我们使用<a href="https://docs.snipcart.com/getting-started/installation" rel="nofollow noreferrer" target="_blank">基本的JS代码段</a>注入购物车，并使用简单的<a href="https://docs.snipcart.com/configuration/product-definition" rel="nofollow noreferrer" target="_blank">HTML属性</a>定义产品。</em></p>
<h4>2.1 构建store</h4>
<p>在<code>src</code>中创建一个<code>store</code>文件夹，包含以下3个文件：</p>
<ul>
<li><p>state.js - 定义我们的静态产品数据</p></li>
<li><p>getters.js - 定义<code>get</code>函数，通过ID检索产品</p></li>
<li><p>index.js - 组合前两个文件</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//state.js
export const state = {
    products: [
        {
            id: 1,
            name: 'The Square Pair',
            price: 100.00,
            description: 'Bold &amp; solid.',
            image: 'https://snipcart.com/media/10171/glasses1.jpeg'
        },
        {
            id: 2,
            name: 'The Hip Pair',
            price: 110.00,
            description: 'Stylish &amp; fancy.',
            image: 'https://snipcart.com/media/10172/glasses2.jpeg'
        },
        {
            id: 3,
            name: 'The Science Pair',
            price: 30,
            description: 'Discreet &amp; lightweight.',
            image: 'https://snipcart.com/media/10173/glasses3.jpeg'
        }
    ]
}

//getters.js
    export const getters = {
        getProductById: (state, getters) => (id) => {
            return state.products.find(product => product.id == id)
        }
    }

//index.js
import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state.js'
import { getters } from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>//<span class="hljs-keyword">state</span>.js
export const <span class="hljs-keyword">state</span> = {
    products: [
        {
            id: <span class="hljs-number">1</span>,
            name: 'The Square Pair',
            price: <span class="hljs-number">100.00</span>,
            description: 'Bold &amp; solid.',
            image: 'https://snipcart.com/media/<span class="hljs-number">10171</span>/glasses1.jpeg'
        },
        {
            id: <span class="hljs-number">2</span>,
            name: 'The Hip Pair',
            price: <span class="hljs-number">110.00</span>,
            description: 'Stylish &amp; fancy.',
            image: 'https://snipcart.com/media/<span class="hljs-number">10172</span>/glasses2.jpeg'
        },
        {
            id: <span class="hljs-number">3</span>,
            name: 'The Science Pair',
            price: <span class="hljs-number">30</span>,
            description: 'Discreet &amp; lightweight.',
            image: 'https://snipcart.com/media/<span class="hljs-number">10173</span>/glasses3.jpeg'
        }
    ]
}

//getters.js
    export const getters = {
        getProductById: (<span class="hljs-keyword">state</span>, getters) =&gt; (id) =&gt; {
            return <span class="hljs-keyword">state</span>.products.find(product =&gt; product.id == id)
        }
    }

//index.js
import Vue <span class="hljs-keyword">from</span> 'vue'
import Vuex <span class="hljs-keyword">from</span> 'vuex'
import { <span class="hljs-keyword">state</span> } <span class="hljs-keyword">from</span> './<span class="hljs-keyword">state</span>.js'
import { getters } <span class="hljs-keyword">from</span> './getters.js'

Vue.use(Vuex)

export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>,
  getters
})</code></pre>
<h4>2.2 构建路由器</h4>
<p>我们将保持商店尽可能简单：展示产品列表的首页以及每个产品的详细信息页面。我们需要在路由器中注册两条路由来处理这些路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueRouter from 'vue-router'
import Vue from 'vue'
import ProductDetails from './../components/productdetails.vue'
import Home from './../components/home.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/products/:id', component: ProductDetails },
    { path: '/', component: Home },
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> ProductDetails <span class="hljs-keyword">from</span> <span class="hljs-string">'./../components/productdetails.vue'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./../components/home.vue'</span>

Vue.use(VueRouter)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> VueRouter({
  mode: <span class="hljs-string">'history'</span>,
  routes: [
    { path: <span class="hljs-string">'/products/:id'</span>, component: ProductDetails },
    { path: <span class="hljs-string">'/'</span>, component: Home },
  ]
})</code></pre>
<p>我们还没有创建这些组件，不用担心，马上就来，;）</p>
<p>请注意，我们在<code>VueRouter</code>声明中使用了<code>mode：'history'</code>。这一点很重要，否则我们的<code>prerender</code>插件将不会工作。其区别在于路由器将使用<code>history API</code>而不是<code>hashbang</code>来导航。</p>
<h4>2.3 把所有东西组合在一起</h4>
<p>现在，我们有了数据(store)和路由器，我们需要把他们注册到应用中。更新你的<code>src/main.js</code>文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'

sync(store, router)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-keyword">import</span> { sync } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex-router-sync'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>

sync(store, router)

<span class="hljs-keyword">new</span> Vue({
  store,
  router,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>很简单吧！正如前面提到的，<code>vuex-router-sync</code>中的<code>sync</code>方法从我们的<code>store</code>中注入状态到当前的路由中。我们稍后再用。</p>
<h3 id="articleHeader5">3. 书写Vue组件</h3>
<p>有数据感觉真棒，但将它显示出来将会更好。我们即将用到的三个组件：</p>
<ul>
<li><p>Home - 展示产品列表</p></li>
<li><p>Product - 单个产品信息，将被用在<code>Home</code>组件中</p></li>
<li><p>ProductDetails - 产品详情页</p></li>
</ul>
<p>他们将被包含在<code>src/components</code>文件夹中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Home.vue

<template lang=&quot;pug&quot;>
    div(class=&quot;products&quot;)
        div(v-for=&quot;product in products&quot;, class=&quot;product&quot;)
            product(:product=&quot;product&quot;)
</template>

<script>
import Product from './../components/Product.vue'

export default {
  name: 'home',
  components: { Product },
  computed: {
    products(){
      return this.$store.state.products
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//Home.vue</span>

&lt;<span class="hljs-keyword">template</span> lang=<span class="hljs-string">"pug"</span>&gt;
    div(<span class="hljs-keyword">class</span>=<span class="hljs-string">"products"</span>)
        div(v-<span class="hljs-built_in">for</span>=<span class="hljs-string">"product in products"</span>, <span class="hljs-keyword">class</span>=<span class="hljs-string">"product"</span>)
            product(:product=<span class="hljs-string">"product"</span>)
&lt;/<span class="hljs-keyword">template</span>&gt;

&lt;script&gt;
<span class="hljs-keyword">import</span> Product from <span class="hljs-string">'./../components/Product.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
  name: <span class="hljs-string">'home'</span>,
  components: { Product },
  computed: {
    products(){
      <span class="hljs-built_in">return</span> <span class="hljs-keyword">this</span>.$store.state.products
    }
  }
}
&lt;/script&gt;</code></pre>
<p>以上，我们使用<code>store</code>中的状态来获取我们的产品，并对它们进行迭代，来渲染每一个产品。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Product.vue
<template lang=&quot;pug&quot;>
  div(class=&quot;product&quot;)
   router-link(v-bind:to=&quot;url&quot;).product
      img(v-bind:src=&quot;product.image&quot; v-bind:alt=&quot;product.name&quot; class=&quot;thumbnail&quot; height=&quot;200&quot;)
      p "{{" product.name "}}"
    
    button(class=&quot;snipcart-add-item&quot;
      v-bind:data-item-name=&quot;product.name&quot;
      v-bind:data-item-id=&quot;product.id&quot;
      v-bind:data-item-image=&quot;product.image&quot;
      data-item-url=&quot;/&quot;
      v-bind:data-item-price=&quot;product.price&quot;)
        | Buy it for "{{" product.price "}}"$
 
</template>

<script>
export default {
  name: 'Product',
  props: ['product'],
  computed: {
    url(){
      return `/products/${this.product.id}`
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//Product.vue</span>
&lt;template lang=<span class="hljs-string">"pug"</span>&gt;
  div(<span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">product</span>")</span>
   router-link(v-bind:to=<span class="hljs-string">"url"</span>).product
      img(v-bind:src=<span class="hljs-string">"product.image"</span> v-bind:alt=<span class="hljs-string">"product.name"</span> <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">thumbnail</span>" <span class="hljs-title">height</span>="200")</span>
      p "{{" product.name "}}"
    
    button(<span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">snipcart</span>-<span class="hljs-title">add</span>-<span class="hljs-title">item</span>"</span>
      v-bind:<span class="hljs-keyword">data</span>-item-name=<span class="hljs-string">"product.name"</span>
      v-bind:<span class="hljs-keyword">data</span>-item-id=<span class="hljs-string">"product.id"</span>
      v-bind:<span class="hljs-keyword">data</span>-item-image=<span class="hljs-string">"product.image"</span>
      <span class="hljs-keyword">data</span>-item-url=<span class="hljs-string">"/"</span>
      v-bind:<span class="hljs-keyword">data</span>-item-price=<span class="hljs-string">"product.price"</span>)
        | Buy it <span class="hljs-keyword">for</span> "{{" product.price "}}"$
 
&lt;/template&gt;

&lt;script&gt;
export <span class="hljs-keyword">default</span> {
  name: <span class="hljs-string">'Product'</span>,
  props: [<span class="hljs-string">'product'</span>],
  computed: {
    url(){
      <span class="hljs-keyword">return</span> `/products/${<span class="hljs-keyword">this</span>.product.id}`
    }
  }
}
&lt;/script&gt;</code></pre>
<p>通过路由器，我们链接到其他页面(<code>ProductDetails</code>)，来看看我们的最后一个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//ProductDetails.vue
<template lang=&quot;pug&quot;>
  div(class=&quot;product-details&quot;)
    
    img(v-bind:src=&quot;product.image&quot; v-bind:alt=&quot;product.name&quot; class=&quot;thumbnail&quot; height=&quot;200&quot;)
     
    div(class=&quot;product-description&quot; v-bind:href=&quot;url&quot;)
      p "{{" product.name "}}"
      p "{{" product. description"}}"

      button(class=&quot;snipcart-add-item&quot;
        v-bind:data-item-name=&quot;product.name&quot;
        v-bind:data-item-id=&quot;product.id&quot;
        v-bind:data-item-image=&quot;product.image&quot;
        data-item-url=&quot;/&quot;
        v-bind:data-item-price=&quot;product.price&quot;)
          | Buy it for "{{" product.price "}}"$

</template>

<script>
export default {
  name: 'ProductDetails',
  computed: {
    id(){
      return this.$store.state.route.params.id
    },
    product(){
      return this.$store.getters.getProductById(this.id)
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//ProductDetails.vue</span>
&lt;template lang=<span class="hljs-string">"pug"</span>&gt;
  div(<span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">product</span>-<span class="hljs-title">details</span>")</span>
    
    img(v-bind:src=<span class="hljs-string">"product.image"</span> v-bind:alt=<span class="hljs-string">"product.name"</span> <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">thumbnail</span>" <span class="hljs-title">height</span>="200")</span>
     
    div(<span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">product</span>-<span class="hljs-title">description</span>" <span class="hljs-title">v</span>-<span class="hljs-title">bind</span>:<span class="hljs-type">href="url")</span></span>
      p "{{" product.name "}}"
      p "{{" product. description"}}"

      button(<span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">snipcart</span>-<span class="hljs-title">add</span>-<span class="hljs-title">item</span>"</span>
        v-bind:<span class="hljs-keyword">data</span>-item-name=<span class="hljs-string">"product.name"</span>
        v-bind:<span class="hljs-keyword">data</span>-item-id=<span class="hljs-string">"product.id"</span>
        v-bind:<span class="hljs-keyword">data</span>-item-image=<span class="hljs-string">"product.image"</span>
        <span class="hljs-keyword">data</span>-item-url=<span class="hljs-string">"/"</span>
        v-bind:<span class="hljs-keyword">data</span>-item-price=<span class="hljs-string">"product.price"</span>)
          | Buy it <span class="hljs-keyword">for</span> "{{" product.price "}}"$

&lt;/template&gt;

&lt;script&gt;
export <span class="hljs-keyword">default</span> {
  name: <span class="hljs-string">'ProductDetails'</span>,
  computed: {
    id(){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.route.params.id
    },
    product(){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.getProductById(<span class="hljs-keyword">this</span>.id)
    }
  }
}
&lt;/script&gt;</code></pre>
<p>这一节的逻辑要稍微复杂些：我们从路由中获取当前的ID，然后通过之前创建的<code>getter</code>获取相关的产品信息。</p>
<h3 id="articleHeader6">4. 创建App</h3>
<p>我们开始使用刚才创建的组件。</p>
<p>打开<code>App.vue</code>文件，其内容是脚手架(<code>vue init webpack-simple</code>)生成的默认内容。我们来修改它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;pug&quot;>
  div(id=&quot;app&quot;)
    TopContext
    router-view

</template>

<script>
import TopContext from './components/TopContext.vue'

export default {
  name: 'app',
  components: { TopContext }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"pug"</span>&gt;</span>
  div(id="app")
    TopContext
    router-view

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> TopContext <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/TopContext.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: { TopContext }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><code>TopContext</code>组件不是很重要，它仅仅是一个<code>header</code>。关键部分是<code>router-view</code>：它将通过<code>VueRouter</code>动态加载组件，而之前与之关联的组件将被替换。</p>
<p>最后我们来更新一下<code>index.html</code>。对于我们的用例来说，我们在<code>src</code>中创建新的目录<code>static</code>，移动<code>index.html</code>文件至<code>static</code>并将其更新为如下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html lang=&quot;en&quot;>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>vue-snipcart</title>
  </head>

  <body>
  
    <div id=&quot;app&quot;>    
    </div>
  
    <script src=&quot;/build.js&quot;></script>
    <script src=&quot;https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js&quot;></script>
    <script src=&quot;https://cdn.snipcart.com/scripts/2.0/snipcart.js&quot; data-api-key=&quot;YjdiNWIyOTUtZTIyMy00MWMwLTkwNDUtMzI1M2M2NTgxYjE0&quot; id=&quot;snipcart&quot;></script>
    <link href=&quot;https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; />
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-snipcart<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>    
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/build.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.snipcart.com/scripts/2.0/snipcart.js"</span> <span class="hljs-attr">data-api-key</span>=<span class="hljs-string">"YjdiNWIyOTUtZTIyMy00MWMwLTkwNDUtMzI1M2M2NTgxYjE0"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"snipcart"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>你可以看到，我们在<code>index.html</code>中添加了<code>Snipcart</code>的必要脚本。如果将他们精细的划分到各个组件之中代码看起来会更加干净，但，由于我们所有的View都需要它们，我们便这样做了。</p>
<h3 id="articleHeader7">5. 使用Prerender插件处理Vue.js SEO</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010613017" src="https://static.alili.tech/img/remote/1460000010613017" alt="vuejs seo prerendering" title="vuejs seo prerendering" style="cursor: pointer;"></span></p>
<p>我们应用中的所有内容都是使用JS动态渲染的，这很不利于搜索引擎优化(SEO)：网页中的异步内容不能被“蜘蛛”(search engine bots)有效的识别并抓取，这样的话，我们的电子商务网站错过了所有有用的“网络爬虫”，这不是一个明智的选择！</p>
<p>让我们使用<strong>prerendering</strong>技术来为我们的Vue.js应用程序带来更多的SEO机会。</p>
<p>相对于Vue的SSR(服务器端渲染)，prerendering则更容易使用。坦率地说，前者<a href="https://github.com/chrisvfritz/prerender-spa-plugin#prerendering-vs-server-side-rendering-ssr" rel="nofollow noreferrer" target="_blank">有些矫枉过正了</a>，除非你有<strong>大量的</strong>路由要处理。另外，这两种技术在实现SEO层面所达到的效果是相似的。</p>
<p>预渲染将使我们能够保持我们的前端作为一种快速，轻量级的静态网站，以便于“蜘蛛”进行爬取。</p>
<p>让我们来看看如何使用它：转到<code>WebPack</code>配置文件，在<code>plugin</code>配置项中添加以下配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
  new CopyWebpackPlugin([{
    from: 'src/static'
  }]),
  new PrerenderSpaPlugin(
    path.join(__dirname, 'dist'),
    [ '/', '/products/1', '/products/2', '/products/3']
  )
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>plugins: [
  <span class="hljs-keyword">new</span> CopyWebpackPlugin([{
    <span class="hljs-keyword">from</span>: <span class="hljs-string">'src/static'</span>
  }]),
  <span class="hljs-keyword">new</span> PrerenderSpaPlugin(
    path.<span class="hljs-keyword">join</span>(__dirname, <span class="hljs-string">'dist'</span>),
    [ <span class="hljs-string">'/'</span>, <span class="hljs-string">'/products/1'</span>, <span class="hljs-string">'/products/2'</span>, <span class="hljs-string">'/products/3'</span>]
  )
]</code></pre>
<p>好吧，它是如何工作的呢？</p>
<p><code>CopyWebpackPlugin</code>将会复制<code>static</code>文件夹中的文件到<code>dist</code>文件夹中(只包含引用<code>Vue App</code>的应用程序的视图)。然后，<code>PrerenderSpaPlugin</code>使用<code>PhantomJS</code>加载网页的内容，并将结果作为我们的静态资源。</p>
<p>瞧！我们现在已经为我们的Vue应用程序提供了预渲染的，SEO友好的产品页面。</p>
<p>我们使用如下命令来进行测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>这将生成一个<code>dist</code>文件夹，其中包含生产环境所需的一切。</p>
<h2 id="articleHeader8">其他重要的SEO因素</h2>
<ol>
<li><p>考虑为您的页面添加适当的<code>meta</code>标记和站点地图(sitemap)。您可以在“postProcessHtml”函数(prerender-spa-plugin插件的配置项)中了解有关<code>meta</code>标记的<a href="https://www.npmjs.com/package/prerender-spa-plugin#webpack-advanced" rel="nofollow noreferrer" target="_blank">更多信息</a>。</p></li>
<li><p><a href="https://moz.com/blog/the-ten-types-of-content-that-work-best-for-seo-whiteboard-friday" rel="nofollow noreferrer" target="_blank">恰当的内容</a>在现代SEO中起了重要作用。建议您确保应用程序中的内容易于创建，编辑和优化。为了授权内容编辑者，请考虑将<code>headless CMS</code>放入组合中并用来构建真正的<a href="https://snipcart.com/blog/jamstack-clients-static-site-cms" rel="nofollow noreferrer" target="_blank">JAMstack</a>。</p></li>
<li><p>现在，HTTPS连接正式成为Google的排名因素。我们在<a href="https://www.netlify.com/" rel="nofollow noreferrer" target="_blank">Netlify</a>上托管这个演示，Netlify为我们提供了免费的SSL证书。</p></li>
<li><p><a href="http://searchengineland.com/faq-google-mobile-first-index-262751" rel="nofollow noreferrer" target="_blank">Mobile-first indexing</a>和&nbsp;<a href="http://searchengineland.com/library/google/google-mobile-friendly-update" rel="nofollow noreferrer" target="_blank">mobile-friendliness</a>也是排名的重要因素。确保您的移动体验与桌面版一样快速完整！</p></li>
</ol>
<h2 id="articleHeader9">GitHub库和在线演示</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010613018" src="https://static.alili.tech/img/remote/1460000010613018" alt="vuejs-tutorial-live-demo.png" title="vuejs-tutorial-live-demo.png" style="cursor: pointer;"></span></p>
<p>来吧，这里是在线演示及代码仓库的地址！</p>
<blockquote>
<p><a href="https://github.com/snipcart/vue-prerender-snipcart" rel="nofollow noreferrer" target="_blank">GitHub仓库</a></p>
<p><a href="https://vue-snipcart.netlify.com/" rel="nofollow noreferrer" target="_blank">在线演示</a></p>
</blockquote>
<h2 id="articleHeader10">总结</h2>
<p>我之前使用过Vue，本教程的制作过程还是相当顺利的。我花了一个小时在Demo上，在使用<code>CopyWebpackPlugin</code>时遇到了困难，好在我在他们的文档中找到了答案。</p>
<p>我希望这篇文章能鼓励开发人员在一些项目中开始使用Vue。就像我说的，您可以通过开发一个现有项目的一小部分来逐步地开始，我认为这绝对值得一试。我们的开发主管正在使用Vue编写最新的商业仪表盘功能，他非常喜欢Vue。另外，如果配置正确，Vue完全可以驱动具有良好SEO结果的应用程序。</p>
<p>如果你受到了启发，可以看看<a href="https://github.com/vuejs/awesome-vue" rel="nofollow noreferrer" target="_blank">Awesome-vue</a>，它包含了Vue示例和相关项目。</p>
<p><strong>如果你真的喜爱Vue，<a href="https://vue.threadless.com/" rel="nofollow noreferrer" target="_blank">cop some swag</a> 或 <a href="https://www.patreon.com/evanyou" rel="nofollow noreferrer" target="_blank">support the creator</a></strong></p>
<hr>
<p>如果你觉得这篇文章有价值，请花一点时间分享到Twitter上。有什么遗漏或错误的？有关于Vue的？或其他框架处理SEO的一些想法？现在评论区是你的了！</p>
<p>End</p>
<p>作者：<a href="https://snipcart.com/blog?author=2765" rel="nofollow noreferrer" target="_blank">Maxime Laboissonniere</a></p>
<p>原文地址: <a href="https://snipcart.com/blog/vuejs-tutorial-seo-example" rel="nofollow noreferrer" target="_blank">Vue.js Tutorial: An Example to Build and Prerender an SEO-Friendly Site</a></p>
<p>译者：<a href="https://github.com/jeneser" rel="nofollow noreferrer" target="_blank">jeneser</a></p>
<p>译者GitHub：<a href="https://github.com/jeneser" rel="nofollow noreferrer" target="_blank">https://github.com/jeneser</a></p>
<p>版权声明：自由转载-非商用-非衍生-保持署名（<a href="http://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" rel="nofollow noreferrer" target="_blank">创意共享3.0许可证</a>）</p>
<p>勘误&amp;讨论： <a href="https://github.com/jeneser/jeneser.github.io/issues/new" rel="nofollow noreferrer" target="_blank">New issue</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js教程: 构建一个预渲染SEO友好的应用示例 [译]

## 原文链接
[https://segmentfault.com/a/1190000010613010](https://segmentfault.com/a/1190000010613010)


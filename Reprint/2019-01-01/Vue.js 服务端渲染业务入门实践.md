---
title: 'Vue.js 服务端渲染业务入门实践' 
date: 2019-01-01 2:30:07
hidden: true
slug: 259hmwxpz1o
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>作者：威威（沪江前端开发工程师）<br>本文原创，转载请注明作者及出处。</p></blockquote>
<h1 id="articleHeader0">背景</h1>
<p>最近， 产品同学一如往常笑嘻嘻的递来需求文档， 纵使内心万般拒绝， 身体倒是很诚实。 接过需求，好在需求不复杂， 简单构思 后决定用Vue， 得心应手。 切好图， 挽起袖子准备撸代码的时候， SEO同学不知何时已经站到了背后。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;听说你要用Vue?&quot;
&quot;恩...&quot;
&quot;SEO考虑了吗?整个SPA出来，网页的SEO咋办?&quot;
&quot;奥...&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">"听说你要用Vue?"</span>
<span class="hljs-string">"恩..."</span>
<span class="hljs-string">"SEO考虑了吗?整个SPA出来，网页的SEO咋办?"</span>
<span class="hljs-string">"奥..."</span>
</code></pre>
<p>换以前， 估计只能无奈的换个实现方式， 但是Vue 2.0时代的到来， 给你多了一种可能。 你可以对SEO工程师说:用Vue没问题!</p>
<p>想必，很多前端同学都有类似这样的经历， 为了SEO，只能放弃得心应手的框架。 SEO(Search Engine Optimization)顾名思义就是一系列为了提高 网站收录排名，吸引精准用户的方案。 这么看来，SEO确实是有举足轻重的作用。 不过，好消息是，Vue2.0的发布为SEO提供了可能， 这就是SSR(serve side render)。</p>
<p>说起SSR，其实早在SPA (Single Page Application) 出现之前，网页就是在服务端渲染的。服务器接收到客户端请求后，将数据和模板拼接成完整的页面响应到客户端。 客户端直接渲染， 此时用户希望浏览新的页面，就必须重复这个过程， 刷新页面. 这种体验在Web技术发展的当下是几乎不能被接受的，于是越来越多的技术方案涌现，力求 实现无页面刷新或者局部刷新来达到优秀的交互体验。 比如Vue:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 在客户端管理路由，用户切换路由，无需向服务器重新请求页面和静态资源，只需要使用 ajax 获取数据在客户端完成渲染，这样可以减少了很多不必要的网络传输，缩短了响应时间。
- 声明式渲染(告诉 vue 你要做什么，让它帮你做)，把我们从烦人的DOM操作中解放出来，集中处理业务逻辑。
- 组件化视图，无论是功能组件还是UI组件都可以进行抽象，写一次到处用。
- 前后端并行开发，只需要与后端定好数据格式，前期用模拟数据，就可以与后端并行开发了。
- 对复杂项目的各个组件之间的数据传递 vue  - Vuex 状态管理模式
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> 在客户端管理路由，用户切换路由，无需向服务器重新请求页面和静态资源，只需要使用 ajax 获取数据在客户端完成渲染，这样可以减少了很多不必要的网络传输，缩短了响应时间。
</span>-<span class="ruby"> 声明式渲染(告诉 vue 你要做什么，让它帮你做)，把我们从烦人的DOM操作中解放出来，集中处理业务逻辑。
</span>-<span class="ruby"> 组件化视图，无论是功能组件还是UI组件都可以进行抽象，写一次到处用。
</span>-<span class="ruby"> 前后端并行开发，只需要与后端定好数据格式，前期用模拟数据，就可以与后端并行开发了。
</span>-<span class="ruby"> 对复杂项目的各个组件之间的数据传递 vue  - Vuex 状态管理模式
</span></code></pre>
<p>缺点大家自然猜到了， 对，主要的一点就是不利于SEO，或者说对SEO不友好。 来看下面两张图；</p>
<p>SPA页面的源代码</p>
<p><span class="img-wrap"><img data-src="/img/bVUt6n?w=640&amp;h=328" src="https://static.alili.tech/img/bVUt6n?w=640&amp;h=328" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下图SSR页面的源代码</p>
<p><span class="img-wrap"><img data-src="/img/bVUt6o?w=640&amp;h=348" src="https://static.alili.tech/img/bVUt6o?w=640&amp;h=348" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>上面两张图就是使用了传统单页应用和SSR的页面源代码， 第一张图中，很明显页面的数据都是通过Ajax异步获取，然而搜索引擎度娘家的爬虫看到这样空旷的源码并不会丝毫留恋. 相反，通过服务端渲染的页面，就有很多对于爬虫来讲有效的连接. 毕竟度娘一家独大，看来服务端渲染确实有探究的必要了。</p>
<h1 id="articleHeader1">Vue.js 的服务端渲染是怎么回事?</h1>
<p>先看一张Vue官网的服务端渲染示意图</p>
<p><span class="img-wrap"><img data-src="/img/bVUt6z?w=640&amp;h=293" src="https://static.alili.tech/img/bVUt6z?w=640&amp;h=293" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>从图上可以看出，ssr 有两个入口文件，client.js 和 server.js， 都包含了应用代码，webpack 通过两个入口文件分别打包成给服务端用的 server bundle 和给客户端用的 client bundle. 当服务器接收到了来自客户端的请求之后，会创建一个渲染器 bundleRenderer，这个 bundleRenderer 会读取上面生成的 server bundle 文件，并且执行它的代码， 然后发送一个生成好的 html 到浏览器，等到客户端加载了 client bundle 之后，会和服务端生成的DOM 进行 Hydration(判断这个DOM 和自己即将生成的DOM 是否相同，如果相同就将客户端的vue实例挂载到这个DOM上， 否则会提示警告)。</p>
<h1 id="articleHeader2">怎么实现?</h1>
<p>知道了Vue服务端渲染的大致流程，那怎么用代码来实现呢?</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 创建一个 vue 实例
2. 配置路由，以及相应的视图组件
3. 使用 vuex 管理数据
4. 创建服务端入口文件
5. 创建客户端入口文件
6. 配置 webpack，分服务端打包配置和客户端打包配置
7. 创建服务器端的渲染器，将vue实例渲染成html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>创建一个 vue 实例
<span class="hljs-bullet">2. </span>配置路由，以及相应的视图组件
<span class="hljs-bullet">3. </span>使用 vuex 管理数据
<span class="hljs-bullet">4. </span>创建服务端入口文件
<span class="hljs-bullet">5. </span>创建客户端入口文件
<span class="hljs-bullet">6. </span>配置 webpack，分服务端打包配置和客户端打包配置
<span class="hljs-bullet">7. </span>创建服务器端的渲染器，将vue实例渲染成html
</code></pre>
<ul><li>首先我们来创建一个 vue 实例</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js

    import Vue from 'vue';
    import router from './router';
    import store from './store';
    import App from './components/app';   

    let app = new Vue({
        template: '<app></app>'，
        base: '/c/'，
        components: {
            App
        }，
        router，
        store
    });

    export {
        app，
        router，
        store
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// app.js</span>

    <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
    <span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>;
    <span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>;
    <span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/app'</span>;   

    <span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;app&gt;&lt;/app&gt;'</span>，
        base: <span class="hljs-string">'/c/'</span>，
        components: {
            App
        }，
        router，
        store
    });

    <span class="hljs-keyword">export</span> {
        app，
        router，
        store
    }</code></pre>
<p>和我们以前写的vue实例差别不大，但是我们不会在这里将app mount到DOM上，因为这个实例也会在服务端去运行，这里直接将 app 暴露出去。</p>
<ul><li>配置 vue 路由</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  import Vue from 'vue';
  import VueRouter from 'vue-router';

  import IndexView from '../views/indexView';
  import ArticleItems from '../views/articleItems';

  Vue.use(VueRouter);

  const router = new VueRouter({
      mode: 'history'，
      base: '/c/'，
      routes: [
          {
              path: '/:alias'，
              component: IndexView
          }， {
              path: '/:alias/list'，
              component: ArticleItems
          }
      ]
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
  <span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;

  <span class="hljs-keyword">import</span> IndexView <span class="hljs-keyword">from</span> <span class="hljs-string">'../views/indexView'</span>;
  <span class="hljs-keyword">import</span> ArticleItems <span class="hljs-keyword">from</span> <span class="hljs-string">'../views/articleItems'</span>;

  Vue.use(VueRouter);

  <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
      <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>，
      base: <span class="hljs-string">'/c/'</span>，
      routes: [
          {
              <span class="hljs-attr">path</span>: <span class="hljs-string">'/:alias'</span>，
              component: IndexView
          }， {
              <span class="hljs-attr">path</span>: <span class="hljs-string">'/:alias/list'</span>，
              component: ArticleItems
          }
      ]
  });</code></pre>
<p>注意这里的 base，在服务端传递 path 给 vue-router 的时候要注意去掉前面的 '/c/'，否则会匹配不到。</p>
<ul><li>创建视图组件，这里我们使用单文件组件，下面是 indexView.vue 文件的实例代码</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
      <div class=&quot;content&quot;>
          <course-cover :class-data=&quot;classData[0]&quot;></course-cover>
          <article-items :article-items=&quot;articleItems&quot;></article-items>
      </div>
  </template>

  <script>
      import courseCover from '../components/courseCover.vue';
      import articleItems from '../components/articleItems';

      export default {
          computed: {
              classData() {
                  return this.$store.state.courseListItems;
              }，
              articleItems() {
                  return this.$store.state.articleItems;
              }
          }，
          components: {
              courseCover，
              articleItems
          }，
          // 服务端获取数据
          fetchServerData ({ state， dispatch， commit }) {
              let alias = state.route.params.alias;

              return Promise.all([
                  dispatch('FETCH_ZT'， { alias })，
                  dispatch('FETCH_COURSE_ITEMS')，
                  dispatch('FETCH_ARTICLE_ITEMS')
              ])
          }，
          // 客户端获取数据
          beforeMount() {
              return this.$store.dispatch('FETCH_COURSE_ITEMS');
          }
      }
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">course-cover</span> <span class="hljs-attr">:class-data</span>=<span class="hljs-string">"classData[0]"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">course-cover</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">article-items</span> <span class="hljs-attr">:article-items</span>=<span class="hljs-string">"articleItems"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">article-items</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-keyword">import</span> courseCover <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/courseCover.vue'</span>;
      <span class="hljs-keyword">import</span> articleItems <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/articleItems'</span>;

      <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
          <span class="hljs-attr">computed</span>: {
              classData() {
                  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.courseListItems;
              }，
              articleItems() {
                  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.articleItems;
              }
          }，
          components: {
              courseCover，
              articleItems
          }，
          <span class="hljs-comment">// 服务端获取数据</span>
          fetchServerData ({ state， dispatch， commit }) {
              <span class="hljs-keyword">let</span> alias = state.route.params.alias;

              <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all([
                  dispatch(<span class="hljs-string">'FETCH_ZT'</span>， { alias })，
                  dispatch(<span class="hljs-string">'FETCH_COURSE_ITEMS'</span>)，
                  dispatch(<span class="hljs-string">'FETCH_ARTICLE_ITEMS'</span>)
              ])
          }，
          <span class="hljs-comment">// 客户端获取数据</span>
          beforeMount() {
              <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'FETCH_COURSE_ITEMS'</span>);
          }
      }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这里我们暴露一个 fetchServerData 方法用来在服务端渲染时做数据的预加载，具体在哪调用，下面会讲到。 beforeMount 是vue的生命周期钩子函数，当应用在客户端切换到这个视图的时候会在特定的时候去执行，用于在客户端获取数据。</p>
<ul><li>使用 vuex 管理数据，vue2.0 的服务端官方推荐使用 STORE 来管理数据，和1.0相比 api 有一些调整</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  import Vue from 'vue';
  import Vuex from 'vuex';
  import axios from 'axios';

  Vue.use(Vuex);

  let apiHost = 'http://localhost:3000';

  const store = new Vuex.Store({
      state: {
          alias: ''，
          ztData: {}，
          courseListItems: []，
          articleItems: []
      }，
      actions: {
          FETCH_ZT: ({ commit， dispatch， state }， { alias }) = {
              commit('SET_ALIAS'， { alias });
              return axios.get(`${apiHost}/api/zt`)
                          .then(response => {
                              let data = response.data || {};
                              commit('SET_ZT_DATA'， data);
                          })
          }，
          FETCH_COURSE_ITEMS: ({ commit， dispatch， state }) => {
              return axios.get(`${apiHost}/api/course_items`).then(response => {
                  let data = response.data;
                  commit('SET_COURSE_ITEMS'， data);
              });
          }，
          FETCH_ARTICLE_ITEMS: ({ commit， dispatch， state }) => {
              return axios.get(`${apiHost}/api/article_items`)
                          .then(response => {
                              let data = response.data;
                              commit('SET_ARTICLE_ITEMS'， data);
                          })
          }
      }，
      mutations: {
          SET_COURSE_ITEMS: (state， data) => {
              state.courseListItems = data;
          }，
          SET_ALIAS: (state， { alias }) => {
              state.alias = alias;
          }，
          SET_ZT_DATA: (state， { ztData }) => {
              state.ztData = ztData;
          }，
          SET_ARTICLE_ITEMS: (state， items) => {
              state.articleItems = items;
          }
      }
  })

  export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
  <span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>;
  <span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;

  Vue.use(Vuex);

  <span class="hljs-keyword">let</span> apiHost = <span class="hljs-string">'http://localhost:3000'</span>;

  <span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
      <span class="hljs-attr">state</span>: {
          <span class="hljs-attr">alias</span>: <span class="hljs-string">''</span>，
          ztData: {}，
          courseListItems: []，
          articleItems: []
      }，
      actions: {
          <span class="hljs-attr">FETCH_ZT</span>: ({ commit， dispatch， state }， { alias }) = {
              commit(<span class="hljs-string">'SET_ALIAS'</span>， { alias });
              <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">`<span class="hljs-subst">${apiHost}</span>/api/zt`</span>)
                          .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                              <span class="hljs-keyword">let</span> data = response.data || {};
                              commit(<span class="hljs-string">'SET_ZT_DATA'</span>， data);
                          })
          }，
          FETCH_COURSE_ITEMS: <span class="hljs-function">(<span class="hljs-params">{ commit， dispatch， state }</span>) =&gt;</span> {
              <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">`<span class="hljs-subst">${apiHost}</span>/api/course_items`</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                  <span class="hljs-keyword">let</span> data = response.data;
                  commit(<span class="hljs-string">'SET_COURSE_ITEMS'</span>， data);
              });
          }，
          FETCH_ARTICLE_ITEMS: <span class="hljs-function">(<span class="hljs-params">{ commit， dispatch， state }</span>) =&gt;</span> {
              <span class="hljs-keyword">return</span> axios.get(<span class="hljs-string">`<span class="hljs-subst">${apiHost}</span>/api/article_items`</span>)
                          .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
                              <span class="hljs-keyword">let</span> data = response.data;
                              commit(<span class="hljs-string">'SET_ARTICLE_ITEMS'</span>， data);
                          })
          }
      }，
      mutations: {
          <span class="hljs-attr">SET_COURSE_ITEMS</span>: <span class="hljs-function">(<span class="hljs-params">state， data</span>) =&gt;</span> {
              state.courseListItems = data;
          }，
          SET_ALIAS: <span class="hljs-function">(<span class="hljs-params">state， { alias }</span>) =&gt;</span> {
              state.alias = alias;
          }，
          SET_ZT_DATA: <span class="hljs-function">(<span class="hljs-params">state， { ztData }</span>) =&gt;</span> {
              state.ztData = ztData;
          }，
          SET_ARTICLE_ITEMS: <span class="hljs-function">(<span class="hljs-params">state， items</span>) =&gt;</span> {
              state.articleItems = items;
          }
      }
  })

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre>
<p>state 使我们应用层的数据，相当于一个仓库，整个应用层的数据都存在这里，与不使用vuex的vue应用有两点不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-  Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
-  Vuex 不允许我们直接对 store 中的数据进行操作。改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
action 响应在view上的用户输入导致的状态变化，并不直接操作数据，异步的逻辑都封装在这里执行，它最终的目的是提交 mutation 来操作数据。 mutation vuex 中修改store 数据的唯一方法，使用 commit 来提交。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs llvm"><code>-  Vuex 的状态存储是响应式的。当 Vue 组件从 <span class="hljs-keyword">store</span> 中读取状态的时候，若 <span class="hljs-keyword">store</span> 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
-  Vuex 不允许我们直接对 <span class="hljs-keyword">store</span> 中的数据进行操作。改变 <span class="hljs-keyword">store</span> 中的状态的唯一途径就是显式地提交(commit) mutations。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
action 响应在view上的用户输入导致的状态变化，并不直接操作数据，异步的逻辑都封装在这里执行，它最终的目的是提交 mutation 来操作数据。 mutation vuex 中修改<span class="hljs-keyword">store</span> 数据的唯一方法，使用 commit 来提交。
</code></pre>
<ul><li>创建服务端的入口文件 server-entry.js</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// server-entry.js
    import {app， router， store} from './app';

    export default context => {

        const s = Date.now();
        router.push(context.url);
        const matchedComponents = router.getMatchedComponents();
        if(!matchedComponents) {
            return Promise.reject({ code: '404' });
        }

        return Promise.all(
            matchedComponents.map(component => {
                if(component.fetchServerData) {
                    return component.fetchServerData(store);
                }
            })
        ).then(() => {
            context.initialState = store.state;
            return app;
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// server-entry.js</span>
    <span class="hljs-keyword">import</span> {app， router， store} <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>;

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> context =&gt; {

        <span class="hljs-keyword">const</span> s = <span class="hljs-built_in">Date</span>.now();
        router.push(context.url);
        <span class="hljs-keyword">const</span> matchedComponents = router.getMatchedComponents();
        <span class="hljs-keyword">if</span>(!matchedComponents) {
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject({ <span class="hljs-attr">code</span>: <span class="hljs-string">'404'</span> });
        }

        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(
            matchedComponents.map(<span class="hljs-function"><span class="hljs-params">component</span> =&gt;</span> {
                <span class="hljs-keyword">if</span>(component.fetchServerData) {
                    <span class="hljs-keyword">return</span> component.fetchServerData(store);
                }
            })
        ).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            context.initialState = store.state;
            <span class="hljs-keyword">return</span> app;
        })
    }</code></pre>
<p>server.js 返回一个函数，该函数接受一个从服务端传递过来的 context 的参数，将 vue 实例通过 promise 返回。 context 一般包含 当前页面的url，首先我们调用 vue-router 的 router.push(url) 切换到到对应的路由， 然后调用 getMatchedComponents 方法返回对应要渲染的组件， 这里会检查组件是否有 fetchServerData 方法，如果有就会执行它。</p>
<p>下面这行代码将服务端获取到的数据挂载到 context 对象上，后面会把这些数据直接发送到浏览器端与客户端的vue 实例进行数据(状态)同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.initialState = store.state" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">context.initialState = store.state</code></pre>
<p>创建客户端入口文件 client-entry.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// client-entry.js
    import { app， store } from './app';
    import './main.scss';
    store.replaceState(window.__INITIAL_STATE__);
    app.$mount('#app');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// client-entry.js</span>
    <span class="hljs-keyword">import</span> { app， store } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app'</span>;
    <span class="hljs-keyword">import</span> <span class="hljs-string">'./main.scss'</span>;
    store.replaceState(<span class="hljs-built_in">window</span>.__INITIAL_STATE__);
    app.$mount(<span class="hljs-string">'#app'</span>);</code></pre>
<p>客户端入口文件很简单，同步服务端发送过来的数据，然后把 vue 实例挂载到服务端渲染的 DOM 上。</p>
<ul><li>配置 webpack</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.server.config.js
    const base = require('./webpack.base.config'); // webpack 的通用配置
    module.exports = Object.assign({}， base， {
        target: 'node'，
        entry: './src/server-entry.js'，
        output: {
            filename: 'server-bundle.js'，
            libraryTarget: 'commonjs2'
        }，
        externals: Object.keys(require('../package.json').dependencies)，
        plugins: [
            new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')，
            'process.env.VUE_ENV': '&quot;server&quot;'
            })
        ]
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// webpack.server.config.js</span>
    <span class="hljs-keyword">const</span> base = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.base.config'</span>); <span class="hljs-comment">// webpack 的通用配置</span>
    <span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">Object</span>.assign({}， base， {
        <span class="hljs-attr">target</span>: <span class="hljs-string">'node'</span>，
        entry: <span class="hljs-string">'./src/server-entry.js'</span>，
        output: {
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'server-bundle.js'</span>，
            libraryTarget: <span class="hljs-string">'commonjs2'</span>
        }，
        externals: <span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">require</span>(<span class="hljs-string">'../package.json'</span>).dependencies)，
        plugins: [
            <span class="hljs-keyword">new</span> webpack.DefinePlugin({
            <span class="hljs-string">'process.env.NODE_ENV'</span>: <span class="hljs-built_in">JSON</span>.stringify(process.env.NODE_ENV || <span class="hljs-string">'development'</span>)，
            <span class="hljs-string">'process.env.VUE_ENV'</span>: <span class="hljs-string">'"server"'</span>
            })
        ]
    })</code></pre>
<p>注意这里添加了 target: 'node' 和 libraryTarget: 'commonjs2'，然后入口文件改成我们的 server-entry.js， 客户端的 webpack 和以前一样，这里就不贴了。</p>
<ul><li>分别打包服务端代码和客户端代码</li></ul>
<p>因为有两个 webpack 配置文件，执行 webpack 时候就需要指定 --config 参数来编译不同的 bundle。 我们可以配置两个 npm script</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &quot;packclient&quot;: &quot;webpack --config webpack.client.config.js&quot;,
    &quot;packserver&quot;: &quot;webpack --config webpack.server.config.js&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    "<span class="hljs-selector-tag">packclient</span>": "<span class="hljs-selector-tag">webpack</span> <span class="hljs-selector-tag">--config</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.client</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>",
    "<span class="hljs-selector-tag">packserver</span>": "<span class="hljs-selector-tag">webpack</span> <span class="hljs-selector-tag">--config</span> <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.server</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>"</code></pre>
<p>然后在命令行运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm run packclient
    npm run packserver" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>    npm <span class="hljs-keyword">run</span><span class="bash"> packclient
</span>    npm <span class="hljs-keyword">run</span><span class="bash"> packserver</span></code></pre>
<p>就会生成两个文件 client-bundle.js 和 server-bundle.js</p>
<ul><li>创建服务端渲染器</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// controller.js

  const serialize = require('serialize-javascript');
  // 因为我们在vue-router 的配置里面使用了 `base: '/c'`，这里需要去掉请求path中的 '/c'
  let url = this.url.replace(/\/c/, '');
  let context = { url: this.url };
  // 创建渲染器
  let bundleRenderer = createRenderer(fs.readFileSync(resolve('./dist/server-bundle.js')， 'utf-8'))
  let html = yield new Promise((resolve， reject) => {
      // 将vue实例编译成一个字符串
      bundleRenderer.renderToString(
          context，   // 传递context 给 server-bundle.js 使用
          (err， html) => {
              if(err) {
                  console.error('server render error'， err);
                  resolve('');
              }
              /**
               * 还记得在 server-entry.js 里面 `context.initialState = store.state` 这行代码么？
               * 这里就直接把数据发送到浏览器端啦
              **/
              html += `<script>
                          // 将服务器获取到的数据作为首屏数据发送到浏览器
                          window.__INITIAL_STATE__ = ${serialize(context.initialState， { isJSON: true })}
                      </script>`;
              resolve(html);
          }
      )
  })

  yield this.render('ssr'， html);

  // 创建渲染器函数
  function createRenderer(code) {
      return require('vue-server-renderer').createBundleRenderer(code);
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// controller.js</span>

  <span class="hljs-keyword">const</span> serialize = <span class="hljs-built_in">require</span>(<span class="hljs-string">'serialize-javascript'</span>);
  <span class="hljs-comment">// 因为我们在vue-router 的配置里面使用了 `base: '/c'`，这里需要去掉请求path中的 '/c'</span>
  <span class="hljs-keyword">let</span> url = <span class="hljs-keyword">this</span>.url.replace(<span class="hljs-regexp">/\/c/</span>, <span class="hljs-string">''</span>);
  <span class="hljs-keyword">let</span> context = { <span class="hljs-attr">url</span>: <span class="hljs-keyword">this</span>.url };
  <span class="hljs-comment">// 创建渲染器</span>
  <span class="hljs-keyword">let</span> bundleRenderer = createRenderer(fs.readFileSync(resolve(<span class="hljs-string">'./dist/server-bundle.js'</span>)， <span class="hljs-string">'utf-8'</span>))
  <span class="hljs-keyword">let</span> html = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve， reject</span>) =&gt;</span> {
      <span class="hljs-comment">// 将vue实例编译成一个字符串</span>
      bundleRenderer.renderToString(
          context，   <span class="hljs-comment">// 传递context 给 server-bundle.js 使用</span>
          (err， html) =&gt; {
              <span class="hljs-keyword">if</span>(err) {
                  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'server render error'</span>， err);
                  resolve(<span class="hljs-string">''</span>);
              }
              <span class="hljs-comment">/**
               * 还记得在 server-entry.js 里面 `context.initialState = store.state` 这行代码么？
               * 这里就直接把数据发送到浏览器端啦
              **/</span>
              html += <span class="hljs-string">`&lt;script&gt;
                          // 将服务器获取到的数据作为首屏数据发送到浏览器
                          window.__INITIAL_STATE__ = <span class="hljs-subst">${serialize(context.initialState， { isJSON: <span class="hljs-literal">true</span> }</span>)}
                      &lt;/script&gt;`</span>;
              resolve(html);
          }
      )
  })

  <span class="hljs-keyword">yield</span> <span class="hljs-keyword">this</span>.render(<span class="hljs-string">'ssr'</span>， html);

  <span class="hljs-comment">// 创建渲染器函数</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createRenderer</span>(<span class="hljs-params">code</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'vue-server-renderer'</span>).createBundleRenderer(code);
  }
</code></pre>
<p>在 node 的 views 模板文件中只需要将上面的 html 输出就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ssr.html
    {% extends 'layout.html' %}
    {% block body %}
        "{{" html | safe "}}"
    {% endblock %}

    <script src=&quot;/public/client.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ssr.html</span>
    {% extends <span class="hljs-string">'layout.html'</span> %}
    {% block body %}
        "{{" html | safe "}}"
    {% endblock %}

    &lt;script src=<span class="hljs-string">"/public/client.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>这样，一个简单的服务端渲染就结束了。</p>
<blockquote><p>限于篇幅，详细的代码请参考 Github代码库：<a href="https://github.com/ikcamp/vue-ssr" rel="nofollow noreferrer" target="_blank">https://github.com/ikcamp/vue...</a></p></blockquote>
<h1 id="articleHeader3">小结</h1>
<p>整个demo包含了：</p>
<ul>
<li>vue + vue-router + vuex 的使用</li>
<li>服务端数据获取</li>
<li>客户端数据同步以及DOM hydration。</li>
</ul>
<p>没有涉及：</p>
<ul>
<li>流式渲染</li>
<li>组件缓存</li>
</ul>
<p>对Vue的服务端渲染有更深一步的认识，实际在生产环境中的应用可能还需要考虑很多因素。</p>
<p>选择Vue的服务端渲染方案，是情理之中的选择，不是对新技术的盲目追捧，而是一切为了需要。 Vue 2.0的SSR方案只是提供了一种可能，多了一种选择，框架本身在于服务开发者，根据不同的场景选择不同的方案，才会事半功倍。</p>
<blockquote><p>文章仅代表个人观点，有不妥当地方烦请大家指出，共同进步！</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010953661" src="https://static.alili.tech/img/remote/1460000010953661" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p>
<p><a href="https://m.bosszhipin.com/weijd/v2/job/7bbfc95b9f1e9c4a1nRy2926FVA~?date8=20170905&amp;sid=self_jd" rel="nofollow noreferrer" target="_blank">&gt;&gt; 沪江Web前端上海团队招聘【Web前端架构师】，有意者简历至：zhouyao@hujiang.com &lt;&lt;</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 服务端渲染业务入门实践

## 原文链接
[https://segmentfault.com/a/1190000011039920](https://segmentfault.com/a/1190000011039920)


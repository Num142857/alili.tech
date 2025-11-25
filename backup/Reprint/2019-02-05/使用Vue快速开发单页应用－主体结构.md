---
title: '使用Vue快速开发单页应用－主体结构' 
date: 2019-02-05 2:30:09
hidden: true
slug: jtwlkoqx2df
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文所涉及代码全在<a href="https://github.com/wszgxa/vue-cnode" rel="nofollow noreferrer" target="_blank">vue-cnode</a></p></blockquote>
<p>单页应用，即在一个页面集成系统中所有功能，整个应用只有一个页面。因为路由的控制在前端，单页面应用在页面切换时比传统页面更快，从而在前端体验更好。</p>
<p>将逻辑从后端转移到前端，提升了性能减少了页面加载时间，前后逻辑更扁平。但是当页面复杂度变高时，你会发现，数据处理，UI交互将变得难以维护，所以应运而生，出现了很多MV<em>框架和类库。Vue就是其中之一，个人觉得（非喜勿喷）Vue类库相对于其他MV</em>框架上整体的api更为简洁，提供的api很平衡，解决了问题的同时，没有增加复杂度。另外个人觉得vue在大型应用，开发中使用vue-loader将组件分成template,style,script结构更为清晰。</p>
<p>本文以及后面相应文章，主要是vue相关技术栈来快速的实现单页应用开发。系列文章将以一个实际项目进行讲解，项目的github地址为：</p>
<p><a href="https://github.com/wszgxa/vue-cnode" rel="nofollow noreferrer" target="_blank">vue-cnode demo</a></p>
<p>这是一个以<a>cnodejs.org</a>提供的api来开发的单页，主要使用的modules有vue、vue-router、vuex、vue-resource。为了快速开发，我们还使用了vue-cli脚手架工具，下文会做介绍。</p>
<h2 id="articleHeader0">vue-cli</h2>
<p>自从node的兴起，前端项目中就开始出现各种预处理工具，当我们开始一个新项目时，我们都会先编写一些预处理文件，和构建项目目录。</p>
<p>而vue-cli就是为了做这方面工作的，生成一套提前定义好的构建文件，和相应的文件。</p>
<p>vue-cli有5个对应的项目结构。我们使用的是<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">vue-webpack-boilerplate</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
$ npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>npm install -g vue-cli
<span class="hljs-variable">$ </span>vue init webpack my-project
<span class="hljs-variable">$ </span>cd my-project
<span class="hljs-variable">$ </span>npm install
<span class="hljs-variable">$ </span>npm run dev
</code></pre>
<p>执行上面命令后，我们将生成下面的文件结构，并开一个服务，你可以打开<a href="http://localhost:8080" rel="nofollow noreferrer" target="_blank">http://localhost:8080</a>看看。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760852?w=325&amp;h=678" src="https://static.alili.tech/img/remote/1460000006760852?w=325&amp;h=678" alt="文件结构" title="文件结构" style="cursor: pointer; display: inline;"></span></p>
<p>具体的使用建议看<a href="http://vuejs-templates.github.io/webpack/" rel="nofollow noreferrer" target="_blank">文档</a>。</p>
<h2 id="articleHeader1">项目结构</h2>
<p>如果你之前就了解vue和vue-router，可以先看这部分。如果你了解vue不了解vue-router,可以先看这篇文章<a href="http://hiluluke.cn/2016/08/05/vue-router/" rel="nofollow noreferrer" target="_blank">vue-router</a>。如果你连vue都不是很理解我建议，抽5个小时左右把<a href="http://cn.vuejs.org/guide/" rel="nofollow noreferrer" target="_blank">文档教程</a>过一遍。</p>
<p>你可以看到项目根目录下面有一个html，仅有的一个html。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006711747" src="https://static.alili.tech/img/remote/1460000006711747" alt="项目结构" title="项目结构" style="cursor: pointer; display: inline;"></span></p>
<p>上图的结构是我自己琢磨的，主要是结合vue-router、vuex两使用方法来考虑的。另外对于组件的复用，将一些功能组件和全局组件都放在根部，通过vuex来控制组件属性实现一些功能。</p>
<p>下面我就结构由上至下的介绍。</p>
<h3 id="articleHeader2">main.js</h3>
<p>main.js 是我们的入口文件，主要作用是初始化vue实例并使用需要的插件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import filter from './filter'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
import { configRouter } from './config_router'
import resourceGlobalSet from './resource_set'

Vue.use(VueResource)
Vue.use(VueRouter)
// 初始化自定义过滤器
Vue.use(filter)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
})
configRouter(router)
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push(resourceGlobalSet) // ajax 拦截

sync(store, router)
router.start(App, 'app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>
<span class="hljs-keyword">import</span> filter <span class="hljs-keyword">from</span> <span class="hljs-string">'./filter'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span>
<span class="hljs-keyword">import</span> { sync } <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex-router-sync'</span>
<span class="hljs-keyword">import</span> { configRouter } <span class="hljs-keyword">from</span> <span class="hljs-string">'./config_router'</span>
<span class="hljs-keyword">import</span> resourceGlobalSet <span class="hljs-keyword">from</span> <span class="hljs-string">'./resource_set'</span>

Vue.use(VueResource)
Vue.use(VueRouter)
<span class="hljs-comment">// 初始化自定义过滤器</span>
Vue.use(filter)

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">history</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">saveScrollPosition</span>: <span class="hljs-literal">true</span>
})
configRouter(router)
Vue.http.options.emulateJSON = <span class="hljs-literal">true</span>
Vue.http.interceptors.push(resourceGlobalSet) <span class="hljs-comment">// ajax 拦截</span>

sync(store, router)
router.start(App, <span class="hljs-string">'app'</span>)</code></pre>
<p>就如同上面所示，主要是使用和配置相应插件，并初始化一个vue，上面的初始化在<code>router.start(App, 'app')</code>，是以App.vue为组要组件，并以html中的&lt;app&gt;&lt;/app&gt;为挂载替换点。</p>
<h3 id="articleHeader3">APP.vue</h3>
<p>App.vue是我们的主组件，所有页面都是在App.vue下进行切换的。其实你也可以理解为所有的路由也是App.vue的子组件。所以我将router标示为App.vue的子组件。</p>
<p>下面是App.vue的template</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <cn-header></cn-header>
    <sidebar></sidebar>
    <router-view></router-view>
    <tip></tip>
    <loading></loading>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">cn-header</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">cn-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">sidebar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sidebar</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">tip</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">tip</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">loading</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">loading</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>你可以看到route-view和其它全局功能组件，全局组件在一个层级。</p>
<p>另外由于APP.vue在所有页面都有，我们将会在APP.vue上面写一些初始化全局方法。</p>
<h3 id="articleHeader4">router</h3>
<p>router 是具体的业务组件，比如index,login,content等组件都是具体业务相关的。下面就是再和业务相关的组件。</p>
<h3 id="articleHeader5">全局组件</h3>
<p>全局组件是页面共用的部分，比如header，footer，navbar，你可能在想如果我有一些header是独特的怎么办，这种情况下可以通过路由做判断，渲染不同的html，如果判断条件不是路由，也可以在vuex写一个store记录组件的state。</p>
<h3 id="articleHeader6">功能组件</h3>
<p>功能组件是比如dialog,tip等组件，是用来与用户交互的。</p>
<p>通常情况下，功能组件是各个组件都需要的一些组件。在一个页面里如果有两个组件，两个组件都同时引了一个tip组件作为子组件是纯在的。为了避免这种情况，我们将功能组件提到App.vue然后通过vuex进行组件交互，从而就讲一个功能组件变成了全局方法。</p>
<h3 id="articleHeader7">自定义插件</h3>
<p>vue还能自己写插件。对于一些公用的方法和逻辑，我们可以提出来写在插件里面。</p>
<h2 id="articleHeader8">小节</h2>
<p>可以看到，我们项目整体结构非常清晰。入口加载初始化，主组件挂载路由全局控制，然后全局组件、功能组件借助vuex进行数据控制。</p>
<blockquote><p>原文出处: <a href="http://hiluluke.cn/2016/08/04/vue-spa/" rel="nofollow noreferrer" target="_blank">http://hiluluke.cn/2016/08/04...</a></p></blockquote>
<p>其他</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006711743">使用Vue快速开发单页应用－主体结构</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006712234" target="_blank">使用Vue快速开发单页应用－vue-router</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006712278">使用Vue快速开发单页应用－登录页面</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006713809" target="_blank">使用Vue快速开发单页应用－功能组件与路由组件通信</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Vue快速开发单页应用－主体结构

## 原文链接
[https://segmentfault.com/a/1190000006711743](https://segmentfault.com/a/1190000006711743)


---
title: 'Vue.js学习系列七——Vue服务器渲染Nuxt学习' 
date: 2018-12-11 2:30:10
hidden: true
slug: 1nhixh0jxnt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>我又回来啦~这次我们来学习Vue的服务器渲染SSR。</blockquote>
<p>关于SSR的文章网上很多，一开始看得我云里雾里。然后去<a href="https://ssr.vuejs.org/zh/" rel="nofollow noreferrer" target="_blank">Vue.js 服务器渲染指南</a>和<a href="https://zh.nuxtjs.org/guide" rel="nofollow noreferrer" target="_blank">nuxt官网</a>看了看，发现文章大多都是搬运官网的内容，真正讲的清晰明了的很少。所以想写篇文章学习下SSR，希望能够帮助大家快速理解Vue SSR。</p>
<h1 id="articleHeader0">什么是SSR？</h1>
<p>SSR，即服务器渲染，就是在服务器端将对Vue页面进行渲染生成html文件，将html页面传给浏览器。<br>优点：</p>
<ul>
<li>SEO 不同于SPA的HTML只有一个无实际内容的HTML和一个app.js，SSR生成的HTML是有内容的，这让搜索引擎能够索引到页面内容。</li>
<li>更快内容到达时间 传统的SPA应用是将bundle.js从服务器获取，然后在客户端解析并挂载到dom。而SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间。</li>
</ul>
<p>可以从下面两张图来看，第一张图是SSR生成的HTML页面，第二种是传统SPA生成的HTML页面。<br><span class="img-wrap"><img data-src="/img/remote/1460000013592130" src="https://static.alili.tech/img/remote/1460000013592130" alt="SSR" title="SSR" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013592131" src="https://static.alili.tech/img/remote/1460000013592131" alt="SPA" title="SPA" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">Nuxt.js</h1>
<p>我看了官方 SSR 的介绍，也看了 Nuxt.js 的文档。本质上来说 SSR 是node后端的操作行为，作为只想好好写前端代码的我，不想太折腾。而 Nuxt.js 非常完美地整合了 SSR 的功能。让我们可以开箱即用~官方也推荐使用 Nuxt.js 来搭建 SSR 项目。</p>
<h2 id="articleHeader2">好处</h2>
<p>我觉得  Nuxt.js  相比自己写 SSR 有几点好处。</p>
<ul>
<li>无需配置Webpack：我一开始还在找Webpack配置呢，看了文档知道nuxt都帮我们封装好了。如需修改Webpack配置只需修改nuxt.config.js 文件。</li>
<li>无需node知识：只要你会写vue前端，你就可以写出SSR。无需知道SSR和node、express的配置方法（不过现在的前端多少都会点node知识~）。</li>
<li>整合了vue全家桶，直接可用。方便程度不亚于 <code>vue-cli</code>：安装Nuxt——写组件——编译并启动服务———看效果。就这么简单。</li>
<li>配置简单，文档友好：认真看下 Nuxt.js 文档就会发现涵盖的内容并不多，而功能很全，非常适合入手。</li>
</ul>
<h2 id="articleHeader3">安装</h2>
<p>安装方法<a href="https://zh.nuxtjs.org/guide/installation" rel="nofollow noreferrer" target="_blank">在此</a>。很简单，生成模板，然后npm安装依赖，最后再运行。<br>简单搬运下步骤吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vue-cli 创建nuxt模板项目
$ vue init nuxt-community/starter-template <project-name>
// 安装依赖项
$ cd <project-name>
$ npm install
// 编译并启动服务
$ npm run dev
// 打开 http://localhost:3000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// vue-cli 创建nuxt模板项目</span>
$ vue init nuxt-community/starter-<span class="hljs-keyword">template</span> &lt;project-name&gt;
<span class="hljs-comment">// 安装依赖项</span>
$ cd &lt;project-name&gt;
$ npm install
<span class="hljs-comment">// 编译并启动服务</span>
$ npm <span class="hljs-built_in">run</span> dev
<span class="hljs-comment">// 打开 http://localhost:3000</span></code></pre>
<p><strong>安装遇到的问题：</strong><br>由于 Nuxt.js 中使用了 <code>async...await</code> 语法，而低版本的 node 不支持这个语法，所以必须升级 node 到 <strong>7.0</strong> 版本之上~<br>然后建议不要使用cnpm，我用cnpm安装运行老报错，感觉有坑。</p>
<h2 id="articleHeader4">目录结构</h2>
<p>Nuxt.js 花了很大的篇幅讲它的目录结构，其实了解了目录结构就了解了 Nuxt.js 的大概。Nuxt.js 帮我们配置好了所有东西，我们只需要按照它的要求在相应目录下创建文件写代码即可。</p>
<ul>
<li>assets 需要编译的资源文件，如 JavaScript、SASS、LESS 等。</li>
<li>static 不需要编译的静态资源文件，如图片资源。</li>
<li>components 顾名思义，存放 <code>*.vue</code> 组件的地方。常规 vue 组件写法。</li>
<li>layouts 布局目录，设置布局的地方，其中 <code>&lt;nuxt/&gt;</code> 标签是我们写的页面内容。可用作添加导航栏、底部栏等截面。</li>
<li>middleware 中间件目录，所谓中间件，就是在页面与页面跳转中执行的函数方法。如页面跳转时验证用户信息操作。</li>
<li>
<p>pages 页面目录。重点来了~这就是我们存放展示页面的地方。该目录下的文件会转换成相应的路由路径供浏览器访问。另外呢，该目录下的 <code>*.vue</code> 页面文件中  Nuxt.js 提供了一些特殊的方法用于处理服务器渲染中的事件。具体关于路由和特殊方法列举在下面了。</p>
<ul>
<li><a href="https://zh.nuxtjs.org/guide/routing" rel="nofollow noreferrer" target="_blank">pages 路由</a></li>
<li>
<a href="https://zh.nuxtjs.org/guide/views#" rel="nofollow noreferrer" target="_blank">页面组件</a>的简单介绍，具体特殊配置项的用法请查阅<a href="https://zh.nuxtjs.org/api" rel="nofollow noreferrer" target="_blank">API</a>。</li>
</ul>
</li>
<li>plugins 插件目录，像 mint-ui 这种第三方插件就放在这里啦~具体用法<a href="https://zh.nuxtjs.org/guide/plugins" rel="nofollow noreferrer" target="_blank">看这里</a>。</li>
<li>store vuex 状态管理器目录，如果该目录是空的， Nuxt.js 将不启用 vuex。当我们在该文件夹下创建 index.js 文件后即可使用 vuex 状态管理器。用法<a href="https://zh.nuxtjs.org/guide/vuex-store" rel="nofollow noreferrer" target="_blank">在此</a>！</li>
<li>nuxt.config.js 该文件是 Nuxt.js 的唯一配置项，之前提过 Nuxt.js 将 Webpack 等一众配置都封装好了，所以如果需要特殊配置，只需要修改该文件来覆盖默认配置即可。具体配置参数请查阅<a href="https://zh.nuxtjs.org/api" rel="nofollow noreferrer" target="_blank">API</a>。</li>
<li>package.json 不解释……</li>
</ul>
<h1 id="articleHeader5">Demo演示</h1>
<p>好消息，<a href="https://github.com/violetjack/VueStudyDemos" rel="nofollow noreferrer" target="_blank">VueStudyDemos</a>又更新啦！欢迎Star~<a href="https://github.com/violetjack/VueStudyDemos/tree/master/NuxtDemo" rel="nofollow noreferrer" target="_blank">本文Demo</a>已收入到VueStudyDemos中。<br>下面我们来简单实现下各文件夹所提到的功能。</p>
<h2 id="articleHeader6">资源加载</h2>
<p>我在 assets 文件夹下添加了 font-awesome 字体库，在 static 文件夹中放了张 Vue 的 logo 图片。然后对资源进行调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i class=&quot;fa fa-address-book&quot; aria-hidden=&quot;true&quot;></i>
<img src=&quot;~/static/logo.png&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;i <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"fa fa-address-book"</span> aria-hidden=<span class="hljs-string">"true"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span>
&lt;img src=<span class="hljs-string">"~/static/logo.png"</span> /&gt;</code></pre>
<p>这里需要将 font-awesome 的 css 变为全局 css，避免每个用到的页面中都 import 字体库的css。所以我们在 nuxt.config.js 中添加如下配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  css: [
    '~/assets/font-awesome/css/font-awesome.min.css'
  ],
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">module</span>.exports = {
  ...
  css: [
    <span class="hljs-string">'~/assets/font-awesome/css/font-awesome.min.css'</span>
  ],
  ...
}
</code></pre>
<h2 id="articleHeader7">组件定义</h2>
<p>组件存放在 components 文件夹下，这个我们讲目录的时候提到过。组件的用法和常用 vue 组件用法一致。<br>定义组件 Avatar，然后在 Page 页面中使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <avatar/>
</template>
<script>
import avatar from '~/components/Avatar'
export default {
    ...
    components: {
        avatar
    }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">avatar</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> avatar <span class="hljs-keyword">from</span> <span class="hljs-string">'~/components/Avatar'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    ...
    components: {
        avatar
    }</span><span class="xml"><span class="undefined">
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader8">布局</h2>
<p>在 layouts 目录中，default 是默认布局。我们可以修改默认布局也可以新建布局来使用。<br>在布局文件中 <code>&lt;/nuxt&gt;</code> 标签是我们要服务器渲染的区域。<br>下面我们来创建个布局玩玩。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// layouts/page.vue
<template>
<div>
    <mt-header fixed title=&quot;标题2&quot;></mt-header>
    <nuxt/>
</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// layouts/page.vue</span>
&lt;template&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mt-header</span> <span class="hljs-attr">fixed</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"标题2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">mt-header</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nuxt</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>然后我们来使用布局，在 pages 页面中配置 layout 选项（如果不配置默认就是 <code>default</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    ...
    layout: 'page'  // 默认是 'default'
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> {
    ...
    layout: <span class="hljs-string">'page'</span>  <span class="hljs-comment">// 默认是 'default'</span>
};</code></pre>
<h2 id="articleHeader9">中间件</h2>
<p>所谓中间件，就是在两个页面跳转之间执行的行为。比如我定义一个中间件 add.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function ({ store }) {
    store.commit('increment')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">{ store }</span>) </span>{
    store.commit(<span class="hljs-string">'increment'</span>)
}</code></pre>
<p>然后在 nuxt.config.js 中进行配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  ...
  router: {
    middleware: 'add'
  },
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">module</span>.exports = {
  ...
  router: {
    middleware: <span class="hljs-string">'add'</span>
  },
  ...
}
</code></pre>
<p>这样，在每次页面跳转的时候都会执行一次中间件方法了。当然，也可以单独定义某个页面的中间件，具体看官网啦~</p>
<h2 id="articleHeader10">页面</h2>
<p>页面，就是在pages目录下的 <code>*.vue</code> 文件，Nuxt.js 将目录结构配置为 vue-router 路由系统，所以我们可以直接通过文件名来访问到相应页面（先不提特殊路由）。<br>比如 <code>pages/app.vue</code> 文件就可以通过 <code>http://localhost:3000/app</code> 来进行访问。<br>注意：页面组件写法与常用 Vue 组件写法相同，但 Nuxt.js 还提供了一些特殊配置项来配置服务器渲染过程中的行为。具体有啥配置请看<a href="https://zh.nuxtjs.org/guide/views#" rel="nofollow noreferrer" target="_blank">页面文档</a>。</p>
<h2 id="articleHeader11">路由</h2>
<p>路由就是使 pages 目录能够直接访问的原因。Nuxt.js 非常巧妙地使用目录结构和文件名称将 vue-router 的各种用法都涵盖进去了。如动态路由、嵌套路由等。具体可参考<a href="https://zh.nuxtjs.org/guide/routing" rel="nofollow noreferrer" target="_blank">文档</a>。也可以看看demo的 <a href="https://github.com/violetjack/VueStudyDemos/tree/master/NuxtDemo/pages" rel="nofollow noreferrer" target="_blank">pages</a> 目录。</p>
<h2 id="articleHeader12">插件</h2>
<p>对于前端项目，插件的使用当然是必不可少的。官网上对这方面讲的很清楚。我贴一下 demo 中的用法。这里用的是 mint-ui 库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// plugins/mint-ui.js
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// plugins/mint-ui.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> MintUI <span class="hljs-keyword">from</span> <span class="hljs-string">'mint-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'mint-ui/lib/style.css'</span>

Vue.use(MintUI)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// nuxt.config.js
module.exports = {
  build: {
    vendor: ['mint-ui']
  },
  plugins: [
    '~plugins/mint-ui'
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">// nuxt.config.js</span>
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  build: {
    vendor: [<span class="hljs-string">'mint-ui'</span>]
  },
  plugins: [
    <span class="hljs-string">'~plugins/mint-ui'</span>
  ]
}</code></pre>
<p>这样就可以使用第三方库 mint-ui 啦！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <mt-navbar v-model=&quot;selected&quot;>
        <mt-tab-item id=&quot;1&quot;>选项一</mt-tab-item>
        <mt-tab-item id=&quot;2&quot;>选项二</mt-tab-item>
        <mt-tab-item id=&quot;3&quot;>选项三</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model=&quot;selected&quot;>
        <mt-tab-container-item id=&quot;1&quot;>
            <mt-cell v-for=&quot;n in 10&quot; :key=&quot;n&quot; :title=&quot;'内容 ' + n&quot; />
        </mt-tab-container-item>
        <mt-tab-container-item id=&quot;2&quot;>
            <mt-cell v-for=&quot;n in 4&quot; :key=&quot;n&quot; :title=&quot;'测试 ' + n&quot; />
        </mt-tab-container-item>
        <mt-tab-container-item id=&quot;3&quot;>
            <mt-cell v-for=&quot;n in 6&quot; :key=&quot;n&quot; :title=&quot;'选项 ' + n&quot; />
        </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;template&gt;
  &lt;<span class="hljs-keyword">div</span>&gt;
    &lt;mt-navbar v-model=<span class="hljs-string">"selected"</span>&gt;
        &lt;mt-<span class="hljs-literal">tab</span>-<span class="hljs-built_in">item</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"1"</span>&gt;选项一&lt;/mt-<span class="hljs-literal">tab</span>-<span class="hljs-built_in">item</span>&gt;
        &lt;mt-<span class="hljs-literal">tab</span>-<span class="hljs-built_in">item</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"2"</span>&gt;选项二&lt;/mt-<span class="hljs-literal">tab</span>-<span class="hljs-built_in">item</span>&gt;
        &lt;mt-<span class="hljs-literal">tab</span>-<span class="hljs-built_in">item</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"3"</span>&gt;选项三&lt;/mt-<span class="hljs-literal">tab</span>-<span class="hljs-built_in">item</span>&gt;
    &lt;/mt-navbar&gt;

    &lt;!<span class="hljs-comment">-- tab-container --&gt;</span>
    &lt;mt-<span class="hljs-literal">tab</span>-container v-model=<span class="hljs-string">"selected"</span>&gt;
        &lt;mt-<span class="hljs-literal">tab</span>-container-<span class="hljs-built_in">item</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"1"</span>&gt;
            &lt;mt-cell v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"n in 10"</span> :key=<span class="hljs-string">"n"</span> :title=<span class="hljs-string">"'内容 ' + n"</span> /&gt;
        &lt;/mt-<span class="hljs-literal">tab</span>-container-<span class="hljs-built_in">item</span>&gt;
        &lt;mt-<span class="hljs-literal">tab</span>-container-<span class="hljs-built_in">item</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"2"</span>&gt;
            &lt;mt-cell v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"n in 4"</span> :key=<span class="hljs-string">"n"</span> :title=<span class="hljs-string">"'测试 ' + n"</span> /&gt;
        &lt;/mt-<span class="hljs-literal">tab</span>-container-<span class="hljs-built_in">item</span>&gt;
        &lt;mt-<span class="hljs-literal">tab</span>-container-<span class="hljs-built_in">item</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"3"</span>&gt;
            &lt;mt-cell v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"n in 6"</span> :key=<span class="hljs-string">"n"</span> :title=<span class="hljs-string">"'选项 ' + n"</span> /&gt;
        &lt;/mt-<span class="hljs-literal">tab</span>-container-<span class="hljs-built_in">item</span>&gt;
    &lt;/mt-<span class="hljs-literal">tab</span>-container&gt;
  &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre>
<h2 id="articleHeader13">vuex</h2>
<p>对于 vuex，用法有两种：<a href="https://zh.nuxtjs.org/guide/vuex-store#" rel="nofollow noreferrer" target="_blank">普通方式</a>和<a href="https://zh.nuxtjs.org/guide/vuex-store#" rel="nofollow noreferrer" target="_blank">模块方式</a>，用法和我们常用的 vuex 一样。我的demo中是直接复制官网的代码。<br>需要注意的是，vuex 的数据会存在<a href="https://zh.nuxtjs.org/api/#" rel="nofollow noreferrer" target="_blank">context对象</a>中，我们可以通过context对象获取状态数据。</p>
<h1 id="articleHeader14">发布</h1>
<p>发布有两种方式服务器应用渲染部署和静态部署，发布方式<a href="https://zh.nuxtjs.org/guide/commands#" rel="nofollow noreferrer" target="_blank">看这里</a></p>
<h1 id="articleHeader15">最后</h1>
<p>去看 Nuxt.js 的 <a href="https://zh.nuxtjs.org/api" rel="nofollow noreferrer" target="_blank">API</a>，会发现 Nuxt.js 真的是高度封装。对于 Nuxt.js 生成的模板项目，只有一些必要配置是需要我们去完成的。Nuxt.js 可以说是一个非常友好而强大的 SSR 框架了。</p>
<h1 id="articleHeader16">Vue.js学习系列</h1>
<p>鉴于前端知识碎片化严重，我希望能够系统化的整理出一套关于Vue的学习系列博客。</p>
<p><a href="http://www.jianshu.com/p/8013d8d37bd0" rel="nofollow noreferrer" target="_blank">Vue.js学习系列一 —— vue-router2学习实践笔记（附DEMO）</a><br><a href="http://www.jianshu.com/p/d6f7e11f18af" rel="nofollow noreferrer" target="_blank">Vue.js学习系列二 —— vuex学习实践笔记（附DEMO）</a><br><a href="http://www.jianshu.com/p/8e5fb763c3d7" rel="nofollow noreferrer" target="_blank">Vue.js学习系列三 —— axios和网络传输相关知识的学习实践</a><br><a href="http://www.jianshu.com/p/aef34acd111f" rel="nofollow noreferrer" target="_blank">Vue.js学习系列四 —— Webpack打包工具的使用</a><br><a href="http://www.jianshu.com/p/efb6fbed6fac" rel="nofollow noreferrer" target="_blank">Vue.js学习系列五 —— 从VUE-CLI来聊聊ESLint</a><br><a href="http://www.jianshu.com/p/073d25a3bba0" rel="nofollow noreferrer" target="_blank">Vue.js学习系列六 —— Vue单元测试Karma+Mocha学习笔记</a><br><a href="https://www.jianshu.com/p/ba7466d7101a" rel="nofollow noreferrer" target="_blank">Vue.js学习系列七 —— Vue服务器渲染Nuxt学习</a><br><a href="https://www.jianshu.com/p/15028f91226e" rel="nofollow noreferrer" target="_blank">Vue.js学习系列八 —— Vue源码学习之State学习</a></p>
<h1 id="articleHeader17">Vue.js学习系列项目地址</h1>
<p>本文源码已收入到GitHub中，以供参考，当然能留下一个star更好啦^-^。<br><a href="https://github.com/violetjack/VueStudyDemos" rel="nofollow noreferrer" target="_blank">https://github.com/violetjack/VueStudyDemos</a></p>
<h1 id="articleHeader18">关于作者</h1>
<p>VioletJack，高效学习前端工程师，喜欢研究提高效率的方法，也专注于Vue前端相关知识的学习、整理。<br>欢迎关注、点赞、评论留言~我将持续产出Vue相关优质内容。</p>
<p>新浪微博： <a href="http://weibo.com/u/2640909603" rel="nofollow noreferrer" target="_blank">http://weibo.com/u/2640909603</a><br>掘金：<a href="https://gold.xitu.io/user/571d953d39b0570068145cd1" rel="nofollow noreferrer" target="_blank">https://gold.xitu.io/user/571...</a><br>CSDN: <a href="http://blog.csdn.net/violetjack0808" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/violetja...</a><br>简书： <a href="http://www.jianshu.com/users/54ae4af3a98d/latest_articles" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/users/...</a><br>Github： <a href="https://github.com/violetjack" rel="nofollow noreferrer" target="_blank">https://github.com/violetjack</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js学习系列七——Vue服务器渲染Nuxt学习

## 原文链接
[https://segmentfault.com/a/1190000013592127](https://segmentfault.com/a/1190000013592127)


---
title: 'vue 2 + vue-router 2 实现SPA' 
date: 2019-01-28 2:30:09
hidden: true
slug: 14gcvqym4vz
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/DarcyAnn/vue-webpack-vue-router" rel="nofollow noreferrer" target="_blank">github项目地址请点这里。</a></p>
<p>使用 Vue.js 时，我们就已经把组件组合成一个应用了，当我们要把 vue-router 加进来，只需要配置组件和路由映射，然后告诉 vue-router 在哪里渲染它们。</p>
<p>先来看一下官方提供的最简单的例子：</p>
<h4>HTML</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<script src=&quot;https://unpkg.com/vue-router/dist/vue-router.js&quot;></script>

<div id=&quot;app&quot;>
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to=&quot;/foo&quot;>Go to Foo</router-link>
    <router-link to=&quot;/bar&quot;>Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue-router/dist/vue-router.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello App!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 使用 router-link 组件来导航. --&gt;</span>
    <span class="hljs-comment">&lt;!-- 通过传入 `to` 属性指定链接. --&gt;</span>
    <span class="hljs-comment">&lt;!-- &lt;router-link&gt; 默认会被渲染成一个 `&lt;a&gt;` 标签 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/foo"</span>&gt;</span>Go to Foo<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/bar"</span>&gt;</span>Go to Bar<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- 路由出口 --&gt;</span>
  <span class="hljs-comment">&lt;!-- 路由匹配到的组件将渲染在这里 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>从HTML文件里面我们需要学会的是：</p>
<ol>
<li>&lt;router-link&gt;标签是我们要跳转的链接，to=""是必须的属性，双引号中的内容是我们接下来在JS文件中定义的路由path。</li>
<li>&lt;router-view&gt;标签是展示我们匹配到的组件的区域。</li>
</ol>
<h4>JavaScript</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 也可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中&quot;component&quot; 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')

// 现在，应用已经启动了！

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)</span>

<span class="hljs-comment">// 1. 定义（路由）组件。</span>
<span class="hljs-comment">// 也可以从其他文件 import 进来</span>
<span class="hljs-keyword">const</span> Foo = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;foo&lt;/div&gt;'</span> }
<span class="hljs-keyword">const</span> Bar = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;bar&lt;/div&gt;'</span> }

<span class="hljs-comment">// 2. 定义路由</span>
<span class="hljs-comment">// 每个路由应该映射一个组件。 其中"component" 可以是</span>
<span class="hljs-comment">// 通过 Vue.extend() 创建的组件构造器，</span>
<span class="hljs-comment">// 或者，只是一个组件配置对象。</span>
<span class="hljs-keyword">const</span> routes = [
  { path: <span class="hljs-string">'/foo'</span>, component: Foo },
  { path: <span class="hljs-string">'/bar'</span>, component: Bar }
]

<span class="hljs-comment">// 3. 创建 router 实例，然后传 `routes` 配置</span>
<span class="hljs-comment">// 你还可以传别的配置参数, 不过先这么简单着吧。</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes <span class="hljs-comment">// （缩写）相当于 routes: routes</span>
})

<span class="hljs-comment">// 4. 创建和挂载根实例。</span>
<span class="hljs-comment">// 记得要通过 router 配置参数注入路由，</span>
<span class="hljs-comment">// 从而让整个应用都有路由功能</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
  router
}).$mount(<span class="hljs-string">'#app'</span>)

<span class="hljs-comment">// 现在，应用已经启动了！</span>

</code></pre>
<p>JavaScript文件主要做的事情是：</p>
<ol>
<li>定义路由列表，即routes。</li>
<li>创建router实例及router配置，即router。</li>
<li>创建和挂载根实例。</li>
</ol>
<p>以上只是教我们用最简单的方法使用vue-router。但实际开发过程中，首先我们的vue组件显然不会只有一个template模板这么简单，会用到vue的<a href="https://cn.vuejs.org/v2/guide/single-file-components.html" rel="nofollow noreferrer" target="_blank">单文件组件</a>；其次我们通常会希望&lt;router-view&gt;的范围是整个页面，而不是像现在这样一直有几个碍眼的导航存在于页面上，这就需要先定义好默认状态下&lt;router-view&gt;显示的内容。</p>
<p>既然是单页应用（SPA），那么整个项目有以下三个文件是必要的:</p>
<ol>
<li>一个html文件：index.html</li>
<li>一个webpack打包时的入口js文件：main.js</li>
<li>一个根vue组件，作为其他组件的挂载点：app.vue</li>
</ol>
<p>另外还有两个自定义组件：homepage.vue和chat.vue。我们希望的结果是他们之间互相跳转。</p>
<p>下面看下这几个文件的具体内容：</p>
<h4>index.html</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Vue.js v2</title>
</head>
<body>
  <!--因为我们用App.vue作为根组件，这里只需要写一个渲染用的挂载元素#application即可-->
  <div id=&quot;application&quot;></div>
  <!--这里的dist目录是webpack打包后的js文件的路径-->
  <script src=&quot;dist/main.js&quot;></script>
</body>
</html>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Vue.js v2<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!--因为我们用App.vue作为根组件，这里只需要写一个渲染用的挂载元素#application即可--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"application"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-comment">&lt;!--这里的dist目录是webpack打包后的js文件的路径--&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"dist/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre>
<h4>main.js</h4>
<p>这里我们选择把路由配置也写到main.js中，你也可以写到一个单独的router.js中再引入到main.js中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入vue、vue-router和根组件app.vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/app.vue'

Vue.use(VueRouter)

// 引入自定义组件
import HomePage from './components/homepage.vue'
import Chat from './components/chat/chat.vue'

//定义路由
const routes = [
    //这里 path: '/' 代表应用首页显示的内容
    { path: '/', component: HomePage },
    { path: '/chat', component: Chat }
];

//创建router实例
const router = new VueRouter({
  //mode指定路由模式，默认'hash'，另一种可选的模式是'history'
  mode: 'hash',
  routes,
});

new Vue({
  el: '#application',
  router,
  render: h => h(App) //用render函数渲染引入的组件App.vue到index.html中的#application元素中
})


" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//引入vue、vue-router和根组件app.vue</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/app.vue'</span>

Vue.use(VueRouter)

<span class="hljs-comment">// 引入自定义组件</span>
<span class="hljs-keyword">import</span> HomePage <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/homepage.vue'</span>
<span class="hljs-keyword">import</span> Chat <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/chat/chat.vue'</span>

<span class="hljs-comment">//定义路由</span>
<span class="hljs-keyword">const</span> routes = [
    <span class="hljs-comment">//这里 path: '/' 代表应用首页显示的内容</span>
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: HomePage },
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/chat'</span>, <span class="hljs-attr">component</span>: Chat }
];

<span class="hljs-comment">//创建router实例</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-comment">//mode指定路由模式，默认'hash'，另一种可选的模式是'history'</span>
  mode: <span class="hljs-string">'hash'</span>,
  routes,
});

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#application'</span>,
  router,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App) <span class="hljs-comment">//用render函数渲染引入的组件App.vue到index.html中的#application元素中</span>
})


</code></pre>
<h4>app.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template lang=&quot;html&quot;>
  <div id=&quot;app&quot;>
    <!--这里是组件的渲染区域-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
}
</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"html"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-comment">&lt;!--这里是组件的渲染区域--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
    }
  },
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<h4>自定义组件 homepage.vue</h4>
<p>这个组件的内容也是进入应用默认展示的页面内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h1>homepage</h1>
        <router-link to=&quot;/chat&quot;>Go to chat</router-link>
    </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>homepage<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/chat"</span>&gt;</span>Go to chat<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<h4>自定义组件 chat.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h1>Chat</h1>
        <router-link to=&quot;/&quot;>Go to homepage</router-link>
    </div>
</template>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Chat<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>Go to homepage<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

</code></pre>
<p>写完后你会发现这两个页面是互相跳转的，没错，就是这样。</p>
<p>一般我们会把路由信息routes提取到一个单独的文件中，像这样：</p>
<h4>路由信息提取到单独文件中 <code>route-config.js: </code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import HomePage from './components/homepage.vue'
import Chat from './components/chat/chat.vue'

export default [
    { 
        path: '/',
        component: HomePage 
    },
    { 
        path: '/chat', 
        component: Chat 
    }
];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> HomePage <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/homepage.vue'</span>
<span class="hljs-keyword">import</span> Chat <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/chat/chat.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> [
    { 
        path: <span class="hljs-string">'/'</span>,
        component: HomePage 
    },
    { 
        path: <span class="hljs-string">'/chat'</span>, 
        component: Chat 
    }
];
</code></pre>
<p>然后在<code>main.js</code>中引入： <code>import routes from './route-config.js'</code> 就可以了。</p>
<h4>参考文献：</h4>
<ol>
<li>vue-router 2官方文档： <a href="http://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">http://router.vuejs.org/zh-cn/</a>
</li>
<li>Vue-router2.0学习笔记： <a href="https://segmentfault.com/a/1190000007825106">https://segmentfault.com/a/11...</a>
</li>
<li>vue2.0构建单页应用最佳实战： <a href="https://segmentfault.com/a/1190000007630677" target="_blank">https://segmentfault.com/a/11...</a>
</li>
<li>一个完整的vue应用 ( vuex+vue-router ) 起手： <a href="https://segmentfault.com/a/1190000007480285">https://segmentfault.com/a/11...</a>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 2 + vue-router 2 实现SPA

## 原文链接
[https://segmentfault.com/a/1190000008082838](https://segmentfault.com/a/1190000008082838)


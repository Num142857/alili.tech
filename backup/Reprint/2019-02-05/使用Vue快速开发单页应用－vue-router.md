---
title: '使用Vue快速开发单页应用－vue-router' 
date: 2019-02-05 2:30:09
hidden: true
slug: yyimjmgyo5p
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文所涉及代码全在<a href="https://github.com/wszgxa/vue-cnode" rel="nofollow noreferrer" target="_blank">vue-cnode</a></p></blockquote>
<p>vue-router主要作用是将路由控制，转移到前端。我们将会在vue-router里面保存一个路由表，在vue中具体通过调用提供的指令或则方法进行跳转。</p>
<p>其实吧，vue-router说白了就是一个插件，对外暴露的也就是指令和方法。如果只要求灵活用起来，我们需要学习的也就3个地方：</p>
<ul>
<li><p>配置路由</p></li>
<li><p>指令</p></li>
<li><p>方法</p></li>
</ul>
<h2 id="articleHeader0">配置路由</h2>
<p>路由配置其实是分两步的，第一步把vue-router的指令方法挂到Vue实例，第二步才是添加路由配置上。下面是基本的路由配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'
import App from 'App.vue'
Vue.use(VueRouter) // 第一步
const router = new VueRouter({
  history: true,
  saveScrollPosition: true
}) // 第二步
router.map({
    '/': {
      name: 'index',
      title: '全部',
      component: (resolve) => require(['./components/main/index.vue'], resolve)
    },
    '/good': {
      name: 'good',
      title: '精华',
      component: (resolve) => require(['./components/main/index.vue'], resolve)
    }
  })
router.start(App, '#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'App.vue'</span>
Vue.use(VueRouter) <span class="hljs-comment">// 第一步</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">history</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">saveScrollPosition</span>: <span class="hljs-literal">true</span>
}) <span class="hljs-comment">// 第二步</span>
router.map({
    <span class="hljs-string">'/'</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'全部'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/main/index.vue'</span>], resolve)
    },
    <span class="hljs-string">'/good'</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'good'</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'精华'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/main/index.vue'</span>], resolve)
    }
  })
router.start(App, <span class="hljs-string">'#app'</span>)</code></pre>
<p>这里大家可以去看看源码，源码很简洁。主要就是声明了一个Router的对象，Router上面插件要的install方法，然后还有start方法。</p>
<p>源码片段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Router {

  constructor ({
    hashbang = true,
    abstract = false,
    history = false,
    saveScrollPosition = false,
    transitionOnLoad = false,
    suppressTransitionError = false,
    root = null,
    linkActiveClass = 'v-link-active'
  } = {}) {
    ....
  }
Router.install = function (externalVue) {
  ....
  Vue = externalVue
  applyOverride(Vue)
  View(Vue)
  Link(Vue)
  util.Vue = Vue
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Router</span> </span>{

  <span class="hljs-keyword">constructor</span> ({
    hashbang = <span class="hljs-literal">true</span>,
    abstract = <span class="hljs-literal">false</span>,
    history = <span class="hljs-literal">false</span>,
    saveScrollPosition = <span class="hljs-literal">false</span>,
    transitionOnLoad = <span class="hljs-literal">false</span>,
    suppressTransitionError = <span class="hljs-literal">false</span>,
    root = <span class="hljs-literal">null</span>,
    linkActiveClass = <span class="hljs-string">'v-link-active'</span>
  } = {}) {
    ....
  }
Router.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">externalVue</span>) </span>{
  ....
  Vue = externalVue
  applyOverride(Vue)
  View(Vue)
  Link(Vue)
  util.Vue = Vue
}</code></pre>
<p>源码中在Router一共有9个方法：</p>
<ul>
<li><p>map</p></li>
<li><p>on</p></li>
<li><p>redirect</p></li>
<li><p>alias</p></li>
<li><p>beforeEach</p></li>
<li><p>afterEach</p></li>
<li><p>go</p></li>
<li><p>replace</p></li>
<li><p>start</p></li>
<li><p>stop</p></li>
</ul>
<p>其中start是初始化组件的，</p>
<p>其中涉及路由前期配置的是：map, redirect，alias，beforeEach，afterEach，start。go和replace两个方法都是路由跳转的。</p>
<p>map，redirect，alias这3个方法是基础的配置方法，很简单，就请看<a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">文档</a>吧。</p>
<p>这里主要讲下beforeEach和afterEach，就和方法名一样他们分别是在路由跳转前后做的一些事情。</p>
<p>在vue-router有一个路由声明周期的概念，这里不展开来讲，你只需要知道我们berforeEach和afterEach后面接的函数是一个钩子函数，钩子函数接受的第一个参数是一个transition对象,transition对象有以下方法，主要是用来控制路由跳转的。</p>
<ul>
<li><p>transition.to 一个我们将要跳转去的路由的对象，这个对象可能有path,name等属性。</p></li>
<li><p>transition.from 当前路由对象</p></li>
<li><p>transition.next() 调用此函数处理切换过程的下一步</p></li>
<li><p>transition.abort([reason]) 终止切换</p></li>
<li><p>transition.redirect(path) 重定向到另一个路由</p></li>
</ul>
<p>afterEach由于是路由切换后，只有上面的to,from两个属性。</p>
<p>为什么要单独讲beforEach和afterEach，因为我们可以在里面做很多全局的东西。比如登陆跳转、文章切换title、特定页面设置属性、调用vuex的方法等。这里我们讲一个刷新title的例子。后续还会有一个全局控制的文章，再补充些其他例子。</p>
<p>单页应用从始至终都只有会请求一个html，也就需要动态的改变，document title, 我们完全可以将修改title这个过程提到全局，在afterEach里面做，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.map({
    '/': {
      name: 'index',
      title: '全部',
      component: (resolve) => require(['./components/main/index.vue'], resolve)
    }
  }
  // document title change
  router.afterEach((transition) => {
    document.title = transition.to.title || 'CNode.js'
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">router.map({
    <span class="hljs-string">'/'</span>: {
      <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>,
      <span class="hljs-attr">title</span>: <span class="hljs-string">'全部'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/main/index.vue'</span>], resolve)
    }
  }
  <span class="hljs-comment">// document title change</span>
  router.afterEach(<span class="hljs-function">(<span class="hljs-params">transition</span>) =&gt;</span> {
    <span class="hljs-built_in">document</span>.title = transition.to.title || <span class="hljs-string">'CNode.js'</span>
  })</code></pre>
<p>在ios下面上述方法还不行，因为ios上有一个bug，不会再修改document.title时更新浏览器上面的title。因为这里并不是真正刷新页面，所以ios下不会调用浏览器更新title的事件吧。</p>
<p>可以用一个iframe的hack<a href="https://gist.github.com/wszgxa/48eefb02650ea011ab28a116643890a9" rel="nofollow noreferrer" target="_blank">方法</a><button class="btn btn-xs btn-default ml10 preview" data-url="wszgxa/48eefb02650ea011ab28a116643890a9" data-typeid="1">点击预览</button></p>
<h2 id="articleHeader1">指令</h2>
<p>vue-router 提供的指令就一个：<code>v-link</code>。</p>
<p>他的作用就是跳转路由。具体用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 字面量路径 -->
<a v-link=&quot;'home'&quot;>Home</a>

<!-- 效果同上 -->
<a v-link=&quot;{ path: 'home' }&quot;>Home</a>

<!-- 具名路径 -->
<a v-link=&quot;{ name: 'user', params: { userId: 123 "}}"&quot;>User</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 字面量路径 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'home'"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 效果同上 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ path: 'home' }"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 具名路径 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"{ name: 'user', params: { userId: 123 "}}""</span>&gt;</span>User<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>详细的用法建议看<a href="http://router.vuejs.org/zh-cn/link.html" rel="nofollow noreferrer" target="_blank">文档</a></p>
<h2 id="articleHeader2">方法</h2>
<p>vue在use vue-router之后就会添加一个$route的属性。里面有很多属性，主要的就是router下面的方法。<br>我们用的较多的是router.go,还有就是router.on。<br>这里还是建议看<a href="http://router.vuejs.org/zh-cn/api/go.html" rel="nofollow noreferrer" target="_blank">文档</a>，比我搬过来要详细的多。</p>
<blockquote><p>原文地址：<a href="http://hiluluke.cn/2016/08/05/vue-router/" rel="nofollow noreferrer" target="_blank">http://hiluluke.cn/2016/08/05...</a></p></blockquote>
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
使用Vue快速开发单页应用－vue-router

## 原文链接
[https://segmentfault.com/a/1190000006712234](https://segmentfault.com/a/1190000006712234)


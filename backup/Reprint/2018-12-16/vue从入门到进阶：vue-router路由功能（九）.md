---
title: 'vue从入门到进阶：vue-router路由功能（九）' 
date: 2018-12-16 2:30:10
hidden: true
slug: pvlk0r36nee
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">基本使用</h2>
<p>html:</p>
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
</div>" title="" data-original-title="复制"></span>
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
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>JavaScript:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="

// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中&quot;component&quot; 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
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

// 现在，应用已经启动了！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>

<span class="arduino"><span class="hljs-comment">// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)</span>

<span class="hljs-comment">// 1. 定义（路由）组件。</span>
<span class="hljs-comment">// 可以从其他文件 import 进来</span>
<span class="hljs-keyword">const</span> Foo = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;foo&lt;/div&gt;'</span> }
<span class="hljs-keyword">const</span> Bar = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;bar&lt;/div&gt;'</span> }

<span class="hljs-comment">// 2. 定义路由</span>
<span class="hljs-comment">// 每个路由应该映射一个组件。 其中"component" 可以是</span>
<span class="hljs-comment">// 通过 Vue.extend() 创建的组件构造器，</span>
<span class="hljs-comment">// 或者，只是一个组件配置对象。</span>
<span class="hljs-comment">// 我们晚点再讨论嵌套路由。</span>
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

<span class="hljs-comment">// 现在，应用已经启动了！</span></span></code></pre>
<p>通过注入路由，我们可以用<code> this.$router </code>来访问它，就像在任何组件里用<code> this.$router </code>访问当前路有一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  computed: {
    username () {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-keyword">default</span> {
  computed: {
    username () {
      <span class="hljs-comment">// 我们很快就会看到 `params` 是什么</span>
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$route.params.username
    }
  },
  methods: {
    goBack () {
      window.history.length &gt; <span class="hljs-number">1</span>
        ? <span class="hljs-keyword">this</span>.$router.go(<span class="hljs-number">-1</span>)
        : <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>)
    }
  }
}</code></pre>
<h3 id="articleHeader1">路由的命名</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
  route<span class="hljs-variable">s:</span> [
    {
      path: <span class="hljs-string">'/user/:userId'</span>,
      name: <span class="hljs-string">'user'</span>,
      componen<span class="hljs-variable">t:</span> User
    }
  ]
})</code></pre>
<p>要链接到一个命名路由，可以给<code> router-link</code> 的 <code>to</code> 属性传一个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{ name: 'user', params: { userId: 123 "}}"&quot;>User</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;router-link <span class="hljs-symbol">:to=<span class="hljs-string">"{ name: 'user', params: { userId: 123 "}}""</span>&gt;User&lt;/router-link&gt;</span></code></pre>
<p>这跟代码调用<code> router.push() </code>是一回事：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push({ name: 'user', params: { userId: 123 "}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'user'</span>, params: { userId: <span class="hljs-number">123</span> "}}")</code></pre>
<p>这两种方式都会把路由导航到<code> /user/123</code> 路径。</p>
<h3 id="articleHeader2">重定向和别名</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/a'</span>, <span class="hljs-string">redirect:</span> <span class="hljs-string">'/b'</span> }
  ]
})</code></pre>
<p>重定向的目标也可以是一个命名的路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' "}}"
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/a'</span>, <span class="hljs-string">redirect:</span> { <span class="hljs-string">name:</span> <span class="hljs-string">'foo'</span> "}}"
  ]
})</code></pre>
<p>甚至是一个方法，动态返回重定向目标：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    "}}"
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    { <span class="hljs-attr">path</span>: <span class="hljs-string">'/a'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-function"><span class="hljs-params">to</span> =&gt;</span> {
      <span class="hljs-comment">// 方法接收 目标路由 作为参数</span>
      <span class="hljs-comment">// return 重定向的 字符串路径/路径对象</span>
    "}}"
  ]
})</code></pre>
<p><code>别名</code>：<code>/a </code>的别名是<code> /b</code>，意味着，当用户访问<code> /b </code>时，URL 会保持为<code> /b</code>，但是路由匹配则为<code> /a</code>，就像用户访问<code> /a </code>一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/a'</span>, <span class="hljs-string">component:</span> A, <span class="hljs-string">alias:</span> <span class="hljs-string">'/b'</span> }
  ]
})</code></pre>
<p>『别名』的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。</p>
<h3 id="articleHeader3">路由组件传参props</h3>
<p>方式一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User = {
  template: '<div>User "{{" $route.params.id "}}"</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>const <span class="hljs-keyword">User</span> <span class="hljs-title">= {
  template</span>: '<span class="hljs-tag">&lt;div&gt;</span><span class="hljs-keyword">User</span> <span class="hljs-title">"{{" $route</span>.<span class="hljs-keyword">params</span>.id "}}"<span class="hljs-tag">&lt;/div&gt;</span>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: <span class="hljs-keyword">User</span> <span class="hljs-title">}
  ]
})</span></code></pre>
<p>方式二：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User = {
  props: ['id'],
  template: '<div>User "{{" id "}}"</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">User</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  props:</span> <span class="hljs-string">['id'],</span>
<span class="hljs-attr">  template:</span> <span class="hljs-string">'&lt;div&gt;User <span class="hljs-template-variable">"{{" id "}}"</span>&lt;/div&gt;'</span>
<span class="hljs-string">}</span>
<span class="hljs-string">const</span> <span class="hljs-string">router</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">VueRouter({</span>
<span class="hljs-attr">  routes:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">'/user/:id'</span><span class="hljs-string">,</span> <span class="hljs-attr">component:</span> <span class="hljs-string">User,</span> <span class="hljs-attr">props:</span> <span class="hljs-literal">true</span> <span class="hljs-string">},</span>

    <span class="hljs-string">//</span> <span class="hljs-string">对于包含命名视图的路由，你必须分别为每个命名视图添加</span> <span class="hljs-string">`props`</span> <span class="hljs-string">选项：</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      path:</span> <span class="hljs-string">'/user/:id'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      components:</span> <span class="hljs-string">{</span> <span class="hljs-attr">default:</span> <span class="hljs-string">User,</span> <span class="hljs-attr">sidebar:</span> <span class="hljs-string">Sidebar</span> <span class="hljs-string">},</span>
<span class="hljs-attr">      props:</span> <span class="hljs-string">{</span> <span class="hljs-attr">default:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">sidebar:</span> <span class="hljs-literal">false</span> <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">]</span>
<span class="hljs-string">})</span></code></pre>
<blockquote>如果<code> props </code>被设置为<code> true</code>，<code>route.params </code>将会被设置为组件属性。</blockquote>
<h3 id="articleHeader4">HTML5 History 模式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  mode: 'history',
  routes: [...]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-keyword">mode</span>: <span class="hljs-string">'history'</span>,
  route<span class="hljs-variable">s:</span> [...]
})</code></pre>
<p>404 错误页面配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-keyword">mode</span>: <span class="hljs-string">'history'</span>,
  route<span class="hljs-variable">s:</span> [
    { path: <span class="hljs-string">'*'</span>, componen<span class="hljs-variable">t:</span> NotFoundComponent }
  ]
})</code></pre>
<h3 id="articleHeader5">路由元信息meta</h3>
<p>定义路由的时候可以配置<code> meta </code>字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">router</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">VueRouter({</span>
<span class="hljs-attr">  routes:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      path:</span> <span class="hljs-string">'/foo'</span><span class="hljs-string">,</span>
<span class="hljs-attr">      component:</span> <span class="hljs-string">Foo,</span>
<span class="hljs-attr">      children:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          path:</span> <span class="hljs-string">'bar'</span><span class="hljs-string">,</span>
<span class="hljs-attr">          component:</span> <span class="hljs-string">Bar,</span>
          <span class="hljs-string">//</span> <span class="hljs-string">a</span> <span class="hljs-string">meta</span> <span class="hljs-string">field</span>
<span class="hljs-attr">          meta:</span> <span class="hljs-string">{</span> <span class="hljs-attr">requiresAuth:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">]</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">]</span>
<span class="hljs-string">})</span></code></pre>
<h3 id="articleHeader6">路由过渡动效</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition>
  <router-view></router-view>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;transition&gt;</span>
  <span class="hljs-section">&lt;router-view&gt;</span><span class="hljs-section">&lt;/router-view&gt;</span>
<span class="hljs-section">&lt;/transition&gt;</span></code></pre>
<p>上面的用法会给所有路由设置一样的过渡效果，如果你想让每个路由组件有各自的过渡效果，可以在各路由组件内使用<code> &lt;transition&gt; </code>并设置不同的<code> name</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = {
  template: `
    <transition name=&quot;slide&quot;>
      <div class=&quot;foo&quot;>...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name=&quot;fade&quot;>
      <div class=&quot;bar&quot;>...</div>
    </transition>
  `
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>const Foo = {
  template: `
    &lt;transition <span class="hljs-built_in">name</span>=<span class="hljs-string">"slide"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"foo"</span>&gt;...&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/transition&gt;
  `
}

const Bar = {
  template: `
    &lt;transition <span class="hljs-built_in">name</span>=<span class="hljs-string">"fade"</span>&gt;
      &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"bar"</span>&gt;...&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/transition&gt;
  `
}</code></pre>
<h3 id="articleHeader7">active-class</h3>
<p>设置 链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项<code> linkActiveClass </code>来全局配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link class=&quot;uilink&quot; :to=&quot;{name:'orgList'}&quot; active-class=&quot;active&quot;>成员</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">&lt;router-link <span class="hljs-keyword">class</span>=<span class="hljs-string">"uilink"</span> :to=<span class="hljs-string">"{name:'orgList'}"</span> active-<span class="hljs-keyword">class</span>=<span class="hljs-string">"active"</span>&gt;成员&lt;/router-link&gt;</code></pre>
<h2 id="articleHeader8">嵌套路由</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
  route<span class="hljs-variable">s:</span> [
    { path: <span class="hljs-string">'/user/:id'</span>, componen<span class="hljs-variable">t:</span> User,
      children: [
        {
          // 当 /user/:id/<span class="hljs-keyword">profile</span> 匹配成功，
          // UserProfile 会被渲染在 User 的 <span class="hljs-symbol">&lt;router-view&gt;</span> 中
          path: <span class="hljs-string">'profile'</span>,
          componen<span class="hljs-variable">t:</span> UserProfile
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <span class="hljs-symbol">&lt;router-view&gt;</span> 中
          path: <span class="hljs-string">'posts'</span>,
          componen<span class="hljs-variable">t:</span> UserPosts
        }
      ]
    }
  ]
})</code></pre>
<blockquote>要注意，以<code> / </code>开头的嵌套路径会被当作<code>根路径</code>。 这让你充分的使用嵌套组件而无须设置嵌套的路径。</blockquote>
<h2 id="articleHeader9">编程式导航</h2>
<h3 id="articleHeader10">router.push(...)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: 123 "}}")

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' "}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 字符串</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>(<span class="hljs-string">'home'</span>)

<span class="hljs-comment">// 对象</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({ <span class="hljs-attribute">path</span>: <span class="hljs-string">'home'</span> })

<span class="hljs-comment">// 命名的路由</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({ <span class="hljs-attribute">name</span>: <span class="hljs-string">'user'</span>, <span class="hljs-attribute">params</span>: { <span class="hljs-attribute">userId</span>: <span class="hljs-number">123</span> "}}")

<span class="hljs-comment">// 带查询参数，变成 /register?plan=private</span>
<span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.push</span>({ <span class="hljs-attribute">path</span>: <span class="hljs-string">'register'</span>, <span class="hljs-attribute">query</span>: { <span class="hljs-attribute">plan</span>: <span class="hljs-string">'private'</span> "}}")</code></pre>
<blockquote>注意：如果提供了<code> path</code>，<code>params</code> 会被忽略，上述例子中的<code> query </code>并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 <code>name </code>或手写完整的带有参数的 <code>path</code>：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const userId = 123
router.push({ name: 'user', params: { userId "}}") // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId "}}") // -> /user" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const userId = <span class="hljs-number">123</span>
router.push({ <span class="hljs-string">name:</span> <span class="hljs-string">'user'</span>, <span class="hljs-string">params:</span> { userId "}}") <span class="hljs-comment">// -&gt; /user/123</span>
router.push({ <span class="hljs-string">path:</span> `<span class="hljs-regexp">/user/</span>${userId}` }) <span class="hljs-comment">// -&gt; /user/123</span>
<span class="hljs-comment">// 这里的 params 不生效</span>
router.push({ <span class="hljs-string">path:</span> <span class="hljs-string">'/user'</span>, <span class="hljs-string">params:</span> { userId "}}") <span class="hljs-comment">// -&gt; /user</span></code></pre>
<h3 id="articleHeader11">router.go(n)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">// 在浏览器记录中前进一步，等同于 history.forward()</span>
router.go<span class="hljs-comment">(1)</span>

<span class="hljs-comment">// 后退一步记录，等同于 history.back()</span>
router.go<span class="hljs-comment">(-1)</span>

<span class="hljs-comment">// 前进 3 步记录</span>
router.go<span class="hljs-comment">(3)</span>

<span class="hljs-comment">// 如果 history 记录不够用，那就默默地失败呗</span>
router.go<span class="hljs-comment">(-100)</span>
router.go<span class="hljs-comment">(100)</span></code></pre>
<h2 id="articleHeader12">命名视图</h2>
<p>有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有 <code>sidebar</code>（侧导航） 和 <code>main</code>（主内容） 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 <code>router-view </code>没有设置名字，那么默认为<code> default</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-view class=&quot;view one&quot;></router-view>
<router-view class=&quot;view two&quot; name=&quot;a&quot;></router-view>
<router-view class=&quot;view three&quot; name=&quot;b&quot;></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cos"><code>&lt;router-<span class="hljs-keyword">view</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"view one"</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;router-<span class="hljs-keyword">view</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"view two"</span> name=<span class="hljs-string">"a"</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;router-<span class="hljs-keyword">view</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"view three"</span> name=<span class="hljs-string">"b"</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;</code></pre>
<p>一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 <code>components </code>配置（带上 s）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>const router = new VueRouter({
<span class="hljs-symbol">  routes:</span> [
    {
<span class="hljs-symbol">      path:</span> <span class="hljs-string">'/'</span>,
<span class="hljs-symbol">      components:</span> {
<span class="hljs-symbol">        default:</span> Foo,
<span class="hljs-symbol">        a:</span> Bar,
<span class="hljs-symbol">        b:</span> Baz
      }
    }
  ]
})</code></pre>
<h2 id="articleHeader13">导航守卫</h2>
<h3 id="articleHeader14">全局守卫</h3>
<p>你可以使用<code> router.beforeEach</code> 注册一个全局前置守卫：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({ ... })

router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
})</code></pre>
<p>每个守卫方法接收三个参数：</p>
<ul>
<li>
<code>to: Route</code>: 即将要进入的目标 路由对象</li>
<li>
<code>from: Route</code>: 当前导航正要离开的路由</li>
<li>
<p><code>next: Function</code>: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。</p>
<ul>
<li>
<code>next()</code>: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。</li>
<li>
<code>next(false)</code>: 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。</li>
<li>
<code>next('/')</code> 或者 <code>next({ path: '/' })</code>: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 <code>router-link</code> 的 to prop 或 router.push 中的选项。</li>
<li>
<code>next(error)</code>: (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 <code>router.onError()</code> 注册过的回调。</li>
</ul>
</li>
</ul>
<p>确保要调用 <code>next</code> 方法，否则钩子就不会被<code> resolved</code>。</p>
<h3 id="articleHeader15">全局后置钩子</h3>
<p>你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 <code>next </code>函数也不会改变导航本身：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.afterEach((to, from) => {
  // ...
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>router.afterEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>)</span> =&gt;</span> {
  <span class="hljs-regexp">//</span> ...
})</code></pre>
<h3 id="articleHeader16">路由独享的守卫</h3>
<p>你可以在路由配置上直接定义<code> beforeEnter</code> 守卫：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/foo'</span>,
      <span class="hljs-attr">component</span>: Foo,
      <span class="hljs-attr">beforeEnter</span>: <span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
        <span class="hljs-comment">// ...</span>
      }
    }
  ]
})</code></pre>
<p>这些守卫与全局前置守卫的方法参数是一样的。</p>
<h3 id="articleHeader17">组件内的守卫</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 在渲染该组件的对应路由被 confirm 前调用
    <span class="hljs-regexp">//</span> 不！能！获取组件实例 `this`
    <span class="hljs-regexp">//</span> 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 在当前路由改变，但是该组件被复用时调用
    <span class="hljs-regexp">//</span> 举例来说，对于一个带有动态参数的路径 <span class="hljs-regexp">/foo/</span>:id，在 <span class="hljs-regexp">/foo/</span><span class="hljs-number">1</span> 和 <span class="hljs-regexp">/foo/</span><span class="hljs-number">2</span> 之间跳转的时候，
    <span class="hljs-regexp">//</span> 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, <span class="hljs-keyword">next</span>) {
    <span class="hljs-regexp">//</span> 导航离开该组件的对应路由时调用
    <span class="hljs-regexp">//</span> 可以访问组件实例 `this`
  }
}</code></pre>
<h2 id="articleHeader18">数据获取</h2>
<p>有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：</p>
<ul>
<li>导航完成之后获取：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示。</li>
<li>导航完成之前获取：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。</li>
</ul>
<h3 id="articleHeader19">导航完成后获取数据</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;post&quot;>
    <div class=&quot;loading&quot; v-if=&quot;loading&quot;>
      Loading...
    </div>

    <div v-if=&quot;error&quot; class=&quot;error&quot;>
      "{{" error "}}"
    </div>

    <div v-if=&quot;post&quot; class=&quot;content&quot;>
      <h2>"{{" post.title "}}"</h2>
      <p>"{{" post.body "}}"</p>
    </div>
  </div>
</template>

export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>&lt;template&gt;
  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">post</span>"&gt;</span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">loading</span>" <span class="hljs-title">v</span>-<span class="hljs-title">if</span>="<span class="hljs-title">loading</span>"&gt;</span>
      Loading...
    &lt;/div&gt;

    &lt;div v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"error"</span> <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">error</span>"&gt;</span>
      "{{" error "}}"
    &lt;/div&gt;

    &lt;div v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"post"</span> <span class="hljs-class"><span class="hljs-keyword">class</span>="<span class="hljs-title">content</span>"&gt;</span>
      &lt;h2&gt;"{{" post.title "}}"&lt;/h2&gt;
      &lt;p&gt;"{{" post.body "}}"&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      loading: <span class="hljs-literal">false</span>,
      post: <span class="hljs-literal">null</span>,
      error: <span class="hljs-literal">null</span>
    }
  },
  created () {
    <span class="hljs-comment">// 组件创建完后获取数据，</span>
    <span class="hljs-comment">// 此时 data 已经被 observed 了</span>
    <span class="hljs-keyword">this</span>.fetchData()
  },
  watch: {
    <span class="hljs-comment">// 如果路由有变化，会再次执行该方法</span>
    <span class="hljs-string">'$route'</span>: <span class="hljs-string">'fetchData'</span>
  },
  methods: {
    fetchData () {
      <span class="hljs-keyword">this</span>.error = <span class="hljs-keyword">this</span>.post = <span class="hljs-literal">null</span>
      <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">true</span>
      <span class="hljs-comment">// replace getPost with your data fetching util / API wrapper</span>
      getPost(<span class="hljs-keyword">this</span>.$route.params.id, (err, post) =&gt; {
        <span class="hljs-keyword">this</span>.loading = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">if</span> (err) {
          <span class="hljs-keyword">this</span>.error = err.toString()
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.post = post
        }
      })
    }
  }
}</code></pre>
<h3 id="articleHeader20">在导航完成前获取数据</h3>
<p>通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 <code>beforeRouteEnter </code>守卫中获取数据，当数据获取成功后只调用 <code>next </code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>export default {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-keyword">post</span>: null,
      <span class="hljs-keyword">error</span>: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (<span class="hljs-keyword">err</span>, <span class="hljs-keyword">post</span>) =&gt; {
      next(vm =&gt; vm.setData(<span class="hljs-keyword">err</span>, <span class="hljs-keyword">post</span>))
    })
  },
  <span class="hljs-comment">// 路由改变前，组件就已经渲染完了</span>
  <span class="hljs-comment">// 逻辑稍稍不同</span>
  beforeRouteUpdate (to, from, next) {
    this.<span class="hljs-keyword">post</span> = null
    getPost(to.params.id, (<span class="hljs-keyword">err</span>, <span class="hljs-keyword">post</span>) =&gt; {
      this.setData(<span class="hljs-keyword">err</span>, <span class="hljs-keyword">post</span>)
      next()
    })
  },
  methods: {
    setData (<span class="hljs-keyword">err</span>, <span class="hljs-keyword">post</span>) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">err</span>) {
        this.<span class="hljs-keyword">error</span> = <span class="hljs-keyword">err</span>.<span class="hljs-keyword">toString</span>()
      } <span class="hljs-keyword">else</span> {
        this.<span class="hljs-keyword">post</span> = <span class="hljs-keyword">post</span>
      }
    }
  }
}</code></pre>
<h2 id="articleHeader21">滚动行为</h2>
<p>使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 <code>vue-router</code> 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。</p>
<p>注意: 这个功能只在支持 <code>history.pushState</code> 的浏览器中可用。</p>
<p>当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes: [...],
  scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
    <span class="hljs-comment">// return 期望滚动到哪个的位置</span>
  }
})</code></pre>
<p><code>scrollBehavior</code> 方法接收 to 和 from 路由对象。第三个参数 <code>savedPosition </code>当且仅当<code> popstate </code>导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。</p>
<p>这个方法返回滚动位置的对象信息，长这样：</p>
<ul>
<li>{ x: number, y: number }</li>
<li>{ selector: string, offset? : { x: number, y: number "}}" (offset 只在 2.6.0+ 支持)</li>
</ul>
<p>如果返回一个 <code>falsy</code> (译者注：falsy 不是 false，参考这里)的值，或者是一个空对象，那么不会发生滚动。</p>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>scrollBehavior (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, savedPosition) {
<span class="hljs-built_in">  return</span> { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }
}</code></pre>
<p>对于所有路由导航，简单地让页面滚动到顶部。</p>
<p>返回<code> savedPosition</code>，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>scrollBehavior (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, savedPosition) {
  <span class="hljs-keyword">if</span> (savedPosition) {
<span class="hljs-built_in">    return</span> savedPosition
  } <span class="hljs-keyword">else</span> {
<span class="hljs-built_in">    return</span> { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }
  }
}</code></pre>
<p>如果你要模拟『滚动到锚点』的行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>scrollBehavior (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, savedPosition) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.hash) {
<span class="hljs-built_in">    return</span> {
      selector: <span class="hljs-keyword">to</span>.hash
    }
  }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从入门到进阶：vue-router路由功能（九）

## 原文链接
[https://segmentfault.com/a/1190000012963933](https://segmentfault.com/a/1190000012963933)


---
title: 'Vue.js学习系列一 —— vue-router2学习实践笔记（附DEMO）' 
date: 2019-01-13 2:30:11
hidden: true
slug: ppdx9t2owng
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>想学习Vue的SPA应用，路由这一块是必不可少的。相信很多和我一样刚接触前端的朋友对于路由这玩意是很困惑的。所以在我学习并成功使用了vue-router后，将我的个人经验分享出来，希望可以让同样对路由不知所措的同学有所帮助。</p></blockquote>
<h1 id="articleHeader0">注意：</h1>
<ul>
<li><p><strong>本文demo的项目结构用的是最新的<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">命令行工具</a>创建的webpack项目模板</strong>；</p></li>
<li><p>本文知识点是基于Vue2.0和vue-route 2的，更多内容请参考<a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue.js官网</a>和<a href="http://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-router 2官方文档</a>：</p></li>
</ul>
<h1 id="articleHeader1">一、路由的安装：</h1>
<h2 id="articleHeader2">npm安装</h2>
<p>可以使用npm直接安装插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vue-router <span class="hljs-comment">--save</span></code></pre>
<p>执行命令完成vue-router的安装，并在package.json中添加了vue-router的依赖。当我们在其他电脑上安装项目时只需要执行<code>npm install</code>即可完成安装。（感谢 @waynezheng、@昊哥哥 指出的关于dependency的问题，已更正^-^。）</p>
<p><strong>package.json</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;dependencies&quot;: {
    ...
    &quot;vue-router&quot;: &quot;^2.1.1&quot;
    ...
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  <span class="hljs-string">"dependencies"</span>: {
    ...
    <span class="hljs-string">"vue-router"</span>: <span class="hljs-string">"^2.1.1"</span>
    ...
  },</code></pre>
<p>如果是要安装在开发环境下，则使用以下命令行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install vue-router --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p><strong>package.json</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;devDependencies&quot;: {
    ...
    &quot;vue-router&quot;: &quot;^2.1.1&quot;,
    ...
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  <span class="hljs-string">"devDependencies"</span>: {
    ...
    <span class="hljs-string">"vue-router"</span>: <span class="hljs-string">"^2.1.1"</span>,
    ...
  },</code></pre>
<h1 id="articleHeader3">二、SPA中路由的简单实现（附demo）</h1>
<p>下面让我们来配置路由并实现我们的第一次页面跳转。<br><a href="http://router.vuejs.org/zh-cn/essentials/getting-started.html" rel="nofollow noreferrer" target="_blank">官方提供的demo</a>很简单，复制到HTML中也的确能跑，但是问题是不知道如何在SPA应用中使用，这坑了我不少时间。在看了不少他人的项目后，完成了SPA路由的简单实现demo（基于vue-cli的webpack模板）。<br><strong>main.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Page01 from './components/page01'
import Page02 from './components/page02'

Vue.use(VueRouter)//全局安装路由功能
//定义路径
const routes = [
  { path: '/', component: Page01 },
  { path: '/02', component: Page02 },
]
//创建路由对象
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Page01 <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/page01'</span>
<span class="hljs-keyword">import</span> Page02 <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/page02'</span>

Vue.use(VueRouter)<span class="hljs-comment">//全局安装路由功能</span>
<span class="hljs-comment">//定义路径</span>
<span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: Page01 },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/02'</span>, <span class="hljs-attr">component</span>: Page02 },
]
<span class="hljs-comment">//创建路由对象</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attr">components</span>: { App },
  router
})</code></pre>
<p><strong>App.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <router-link to=&quot;/&quot;>01</router-link>
    <router-link to=&quot;/02&quot;>02</router-link>
    <br/>
    <router-view></router-view>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>01<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/02"</span>&gt;</span>02<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p><strong>page01.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>page02</h1>
  </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>page02<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p><strong>page02.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>page02</h1>
  </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>page02<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>代码很简单，具体可以看下<a href="https://github.com/violetjack/VueRouterDemo/tree/base" rel="nofollow noreferrer" target="_blank">DEMO</a><br>实现步骤：</p>
<ol>
<li><p><code>npm</code>安装<code>vue-router</code></p></li>
<li><p><code>Vue.use(VueRouter)</code>全局安装路由功能</p></li>
<li><p>定义路径数组<code>routes</code>并创建路由对象<code>router</code></p></li>
<li><p>将路由注入到Vue对象中</p></li>
<li><p>在根组件中使用<code>&lt;router-link&gt;</code>定义跳转路径</p></li>
<li><p>在根组件中使用<code>&lt;router-view&gt;</code>来渲染组件</p></li>
<li><p>创建子组件</p></li>
</ol>
<h1 id="articleHeader4">三、路由的跳转</h1>
<h2 id="articleHeader5">router-link</h2>
<p><code>router-link</code>标签用于页面的跳转，简单用法如上demo</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;/page01&quot;>page01</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/page01"</span>&gt;</span>page01<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<p>点击这个<code>router-link</code>标签<code>router-view</code>就会渲染路径为<code>/page01</code>的页面。<br><strong>注意：</strong><code>router-link</code>默认是一个a标签的形式，如果需要显示不同的样子，可以在<code>router-link</code>标签中写入不同标签元素，如下显示为<code>button</code>按钮。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;/04&quot;>
    <button>to04</button>
</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/04"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>to04<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<h2 id="articleHeader6">router.push</h2>
<p>下面我们通过JS代码控制路由的界面渲染，官方是写法如下：</p>
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
<p>那么问题来了，如果是全局注册的路由<code>Vue.use(VueRouter)</code>，应该怎么写呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 字符串
this.$router.push('home')
// 对象
this.$router.push({ path: 'home' })
// 命名的路由
this.$router.push({ name: 'user', params: { userId: 123 "}}")
// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' "}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 字符串</span>
<span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'home'</span>)
<span class="hljs-comment">// 对象</span>
<span class="hljs-keyword">this</span>.$router.push({ <span class="hljs-string">path:</span> <span class="hljs-string">'home'</span> })
<span class="hljs-comment">// 命名的路由</span>
<span class="hljs-keyword">this</span>.$router.push({ <span class="hljs-string">name:</span> <span class="hljs-string">'user'</span>, <span class="hljs-string">params:</span> { <span class="hljs-string">userId:</span> <span class="hljs-number">123</span> "}}")
<span class="hljs-comment">// 带查询参数，变成 /register?plan=private</span>
<span class="hljs-keyword">this</span>.$router.push({ <span class="hljs-string">path:</span> <span class="hljs-string">'register'</span>, <span class="hljs-string">query:</span> { <span class="hljs-string">plan:</span> <span class="hljs-string">'private'</span> "}}")</code></pre>
<p>push方法其实和<code>&lt;router-link :to="..."&gt;</code>是等同的。<br><strong>注意：</strong>push方法的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。</p>
<h2 id="articleHeader7">router.replace</h2>
<p>push方法会向 history 栈添加一个新的记录，而replace方法是替换当前的页面，不会向 history 栈添加一个新的记录。用法如下<br><strong>template</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link to=&quot;/05&quot; replace>05</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/05"</span> <span class="hljs-attr">replace</span>&gt;</span>05<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></code></pre>
<p><strong>script</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$router.replace({ path: '/05' })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$router.replace({ <span class="hljs-string">path:</span> <span class="hljs-string">'/05'</span> })</code></pre>
<h2 id="articleHeader8">router.go</h2>
<p>go方法用于控制history记录的前进和后退</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)
// 后退一步记录，等同于 history.back()
this.$router.go(-1)
// 前进 3 步记录router.go(3)
// 如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 在浏览器记录中前进一步，等同于 history.forward()</span>
<span class="hljs-keyword">this</span>.$router.go(<span class="hljs-number">1</span>)
<span class="hljs-comment">// 后退一步记录，等同于 history.back()</span>
<span class="hljs-keyword">this</span>.$router.go(<span class="hljs-number">-1</span>)
<span class="hljs-comment">// 前进 3 步记录router.go(3)</span>
<span class="hljs-comment">// 如果 history 记录不够用，那就默默地失败呗</span>
<span class="hljs-keyword">this</span>.$router.go(<span class="hljs-number">-100</span>)
<span class="hljs-keyword">this</span>.$router.go(<span class="hljs-number">100</span>)</code></pre>
<p>其实很好理解：<strong>go方法就是浏览器上的前进后退按钮，后面的参数就是前进和后退的次数</strong></p>
<h1 id="articleHeader9">四、路由的传参方式</h1>
<p>在路由跳转的过程中会传递一个object，我们可以通过<code>watch</code>方法查看路由信息对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="watch: {
  '$route' (to, from) {
      console.log(to);
      console.log(from);
  },
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>watch: {
  <span class="hljs-string">'$route'</span> (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>) {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">to</span>);
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">from</span>);
  },
},</code></pre>
<p><strong>console中看到的路由信息对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ...
    params: { id: '123' },
    query: { name: 'jack' },
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>{
    <span class="hljs-params">...</span>
    <span class="hljs-keyword">params</span>: { id: <span class="hljs-string">'123'</span> },
    query: { name: <span class="hljs-string">'jack'</span> },
    <span class="hljs-params">...</span>
}</code></pre>
<p>这两个参数会在页面跳转后写在路径中，路径相当于<code>/page/123?name=jack</code></p>
<h2 id="articleHeader10">1. params</h2>
<p>其实这个params我还是有一些疑惑的，就比如下面的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <router-link :to=&quot;{ path: '/05', params: { sex: 'hello param', sex2: 'hello param2' }, query: { name: 'hello query', name2: 'hello query2' "}}"&quot;>05</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-string">&lt;router-link</span> <span class="hljs-string">:to="{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">'/05'</span><span class="hljs-string">,</span> <span class="hljs-attr">params:</span> <span class="hljs-string">{</span> <span class="hljs-attr">sex:</span> <span class="hljs-string">'hello param'</span><span class="hljs-string">,</span> <span class="hljs-attr">sex2:</span> <span class="hljs-string">'hello param2'</span> <span class="hljs-string">},</span> <span class="hljs-attr">query:</span> <span class="hljs-string">{</span> <span class="hljs-attr">name:</span> <span class="hljs-string">'hello query'</span><span class="hljs-string">,</span> <span class="hljs-attr">name2:</span> <span class="hljs-string">'hello query2'</span> <span class="hljs-string">"}}""&gt;05&lt;/router-link&gt;</span></code></pre>
<p>传递过去的数据却没有包含params的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ...
    params: {},
    query: {
        name: 'hello query',
        name2: 'hello query2'
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>{
    <span class="hljs-params">...</span>
    <span class="hljs-keyword">params</span>: {},
    query: {
        name: <span class="hljs-string">'hello query'</span>,
        name2: <span class="hljs-string">'hello query2'</span>
    }
    <span class="hljs-params">...</span>
}</code></pre>
<p>下面是我暂时调试成功的一些结论。</p>
<h3 id="articleHeader11">传递数据</h3>
<p>在路由配置文件中定义参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //命名路由&amp;路由传参
  { name: 'com03', path: '/03/:sex', component: Page03 }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>  <span class="hljs-comment">//命名路由&amp;路由传参</span>
  { <span class="hljs-string">name:</span> <span class="hljs-string">'com03'</span>, <span class="hljs-string">path:</span> <span class="hljs-string">'/03/:sex'</span>, <span class="hljs-string">component:</span> Page03 },</code></pre>
<p>路径后面的<code>/:sex</code>就是我们要传递的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$router.push({ path: '/03/441'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$router.<span class="hljs-keyword">push</span>({ path: <span class="hljs-string">'/03/441'</span>})</code></pre>
<p>此时路由跳转的路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8080/#/03/441" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span>//localhost:<span class="hljs-number">8080</span>/<span class="hljs-meta">#/03/441</span></code></pre>
<p>此时我们看到查看路由信息对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ...
    params: {
        sex: '441'
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>{
    <span class="hljs-params">...</span>
    <span class="hljs-keyword">params</span>: {
        sex: <span class="hljs-string">'441'</span>
    }
    <span class="hljs-params">...</span>
}</code></pre>
<h3 id="articleHeader12">获取数据</h3>
<p><strong>template</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2> "{{" $route.params.sex "}}" </h2>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;h2&gt; "{{" <span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.sex</span> "}}" &lt;/h2&gt;</code></pre>
<p><strong>script</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this.$route.params.sex)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">console.log(this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.sex</span>)</code></pre>
<p><strong>注：</strong>暂时我只发现在<strong>动态路由匹配</strong>中传入数据可以获取到params。而使用<code>{ path: '/', params: { sex: '123' }, query: { ..."}}"</code>传递的数据使用没有传递给下一个页面组件。如果有使用成功的同学欢迎在留言，我会及时更正的。</p>
<h2 id="articleHeader13">2. query</h2>
<p>query传递数据的方式就是URL常见的查询参数，如<code>/foo?user=1&amp;name=2&amp;age=3</code>。很好理解，下面就简单写一下用法以及结果</p>
<h3 id="articleHeader14">传递数据</h3>
<p><strong>template</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{ path: '/05', query: { name: 'query', type: 'object' "}}"&quot; replace>05</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{ path: '/05', query: { name: 'query', type: 'object' }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span> <span class="hljs-attr">replace</span>&gt;</span>05<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></span></code></pre>
<p><strong>script</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$router.replace({ path: '/05', query: { name: 'query', type: 'object' "}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$router.replace({ <span class="hljs-string">path:</span> <span class="hljs-string">'/05'</span>, <span class="hljs-string">query:</span> { <span class="hljs-string">name:</span> <span class="hljs-string">'query'</span>, <span class="hljs-string">type:</span> <span class="hljs-string">'object'</span> "}}")</code></pre>
<p><strong>路径结果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://localhost:8080/#/05?name=query&amp;type=object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">http:</span>//localhost:<span class="hljs-number">8080</span>/<span class="hljs-meta">#/05?name=query&amp;type=object</span></code></pre>
<p><strong>路由信息对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    ...
    query: {
        name: &quot;query&quot;,
        type: &quot;object&quot;
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
    ...
<span class="hljs-symbol">    query:</span> {
<span class="hljs-symbol">        name:</span> <span class="hljs-string">"query"</span>,
<span class="hljs-symbol">        type:</span> <span class="hljs-string">"object"</span>
    }
    ...
}</code></pre>
<h3 id="articleHeader15">获取数据</h3>
<p>获取数据和params是一样的。<br><strong>template</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2> "{{" $route.query.name "}}" </h2>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;h2&gt; "{{" <span class="hljs-variable">$route</span><span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.name</span> "}}" &lt;/h2&gt;</code></pre>
<p><strong>script</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(this.$route.query.type)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(this.<span class="hljs-variable">$route</span>.<span class="hljs-keyword">query</span>.<span class="hljs-keyword">type</span>)</code></pre>
<h1 id="articleHeader16">Vue.js学习系列</h1>
<p>作者最近正在恶补Vue的各种知识，希望能够系统的掌握Vue的开发知识。有兴趣的同学可以查看之前发布的文章：<br><a href="http://www.jianshu.com/p/8013d8d37bd0" rel="nofollow noreferrer" target="_blank">Vue.js学习系列一 —— vue-router2学习实践笔记（附DEMO）</a><br><a href="http://www.jianshu.com/p/d6f7e11f18af" rel="nofollow noreferrer" target="_blank">Vue.js学习系列二 —— vuex学习实践笔记（附DEMO）</a><br><a href="http://www.jianshu.com/p/8e5fb763c3d7" rel="nofollow noreferrer" target="_blank">Vue.js学习系列三——axios和网络传输相关知识的学习实践</a><br><a href="http://www.jianshu.com/p/aef34acd111f" rel="nofollow noreferrer" target="_blank">Vue.js学习系列四——Webpack打包工具的使用</a><br><a href="http://www.jianshu.com/p/efb6fbed6fac" rel="nofollow noreferrer" target="_blank">Vue.js学习系列五 —— 从VUE-CLI来聊聊ESLint</a></p>
<h1 id="articleHeader17">Vue.js学习系列项目地址（项目暂时有点乱，之后会进行整理优化。）</h1>
<p>本文源码已收入到GitHub中，以供参考，当然能留下一个star更好啦^-^。<br><a href="https://github.com/violetjack/VueStudyDemos" rel="nofollow noreferrer" target="_blank">https://github.com/violetjack...</a></p>
<h1 id="articleHeader18">关于作者</h1>
<p>VioletJack，移动、前端工程师，两年移动端工作经验、一年前端工作经验。现专注于移动前端的学习和开发。擅长Android开发和Vue前端开发。会定期产出关于Android、Vue、移动前端相关的博文。欢迎大家关注我，我会用心维护和经营好博客，多产出高质量文章。同时也希望我所写的东西可以帮到有需要的朋友。<br>新浪微博： <a href="http://weibo.com/u/2640909603" rel="nofollow noreferrer" target="_blank">http://weibo.com/u/2640909603</a><br>掘金：<a href="https://gold.xitu.io/user/571d953d39b0570068145cd1" rel="nofollow noreferrer" target="_blank">https://gold.xitu.io/user/571...</a><br>CSDN: <a href="http://blog.csdn.net/violetjack0808" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/violetja...</a><br>简书： <a href="http://www.jianshu.com/users/54ae4af3a98d/latest_articles" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/users/...</a><br>Github： <a href="https://github.com/violetjack" rel="nofollow noreferrer" target="_blank">https://github.com/violetjack</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js学习系列一 —— vue-router2学习实践笔记（附DEMO）

## 原文链接
[https://segmentfault.com/a/1190000009614579](https://segmentfault.com/a/1190000009614579)


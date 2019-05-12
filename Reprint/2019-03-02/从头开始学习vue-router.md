---
title: '从头开始学习vue-router' 
date: 2019-03-02 2:30:07
hidden: true
slug: l9blfkkvlj9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、前言</h2>
<p>要学习vue-router就要先知道这里的路由是什么？为什么我们不能像原来一样直接用<a></a>标签编写链接哪？vue-router如何使用？常见路由操作有哪些？等等这些问题，就是本篇要探讨的主要问题。</p>
<h2 id="articleHeader1">二、vue-router是什么</h2>
<p>这里的路由并不是指我们平时所说的硬件路由器，<strong>这里的路由就是SPA（单页应用）的路径管理器</strong>。再通俗的说，vue-router就是WebApp的链接路径管理系统。<br>vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。<strong>路由模块的本质 就是建立起url和页面之间的映射关系</strong>。</p>
<p>至于我们为啥不能用a标签，这是因为用Vue做的都是单页应用（<strong>当你的项目准备打包时，运行<code>npm run build</code>时，就会生成dist文件夹，这里面只有静态资源和一个index.html页面</strong>），所以你写的<a></a>标签是不起作用的，你必须使用vue-router来进行管理。</p>
<h2 id="articleHeader2">三、vue-router实现原理</h2>
<p>SPA(single page application):单一页面应用程序，只有一个完整的页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。<strong>单页面应用(SPA)的核心之一是: 更新视图而不重新请求页面</strong>;vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式；根据mode参数来决定采用哪一种方式。</p>
<h4>1、Hash模式：</h4>
<p><strong>vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。</strong> hash（#）是URL 的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说<strong>hash 出现在 URL 中，但不会被包含在 http 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面</strong>；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说<strong>Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。hash 模式的原理是 onhashchange 事件(监测hash值变化)，可以在 window 对象上监听这个事件</strong>。</p>
<h4>2、History模式：</h4>
<p>由于hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入"mode: 'history'",<strong>这种模式充分利用了html5 history interface 中新增的 pushState() 和 replaceState() 方法。这两个方法应用于浏览器记录栈，在当前已有的 back、forward、go 基础之上，它们提供了对历史记录修改的功能。只是当它们执行修改时，虽然改变了当前的 URL ，但浏览器不会立即向后端发送请求</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js文件中
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//main.js文件中</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  mode: <span class="hljs-string">'history'</span>,
  routes: [...]
})</code></pre>
<p>当你使用 history 模式时，URL 就像正常的 url，例如 <a href="http://yoursite.com/user/id" rel="nofollow noreferrer" target="_blank">http://yoursite.com/user/id</a>，比较好看！<br>不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 <a href="http://oursite.com/user/id" rel="nofollow noreferrer" target="_blank">http://oursite.com/user/id</a> 就会返回 404，这就不好看了。<br>所以呢，<strong>你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" export const routes = [ 
  {path: &quot;/&quot;, name: &quot;homeLink&quot;, component:Home}
  {path: &quot;/register&quot;, name: &quot;registerLink&quot;, component: Register},
  {path: &quot;/login&quot;, name: &quot;loginLink&quot;, component: Login},
  {path: &quot;*&quot;, redirect: &quot;/&quot;}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code> export const routes = [ 
  {<span class="hljs-string">path:</span> <span class="hljs-string">"/"</span>, <span class="hljs-string">name:</span> <span class="hljs-string">"homeLink"</span>, <span class="hljs-string">component:</span>Home}
  {<span class="hljs-string">path:</span> <span class="hljs-string">"/register"</span>, <span class="hljs-string">name:</span> <span class="hljs-string">"registerLink"</span>, <span class="hljs-string">component:</span> Register},
  {<span class="hljs-string">path:</span> <span class="hljs-string">"/login"</span>, <span class="hljs-string">name:</span> <span class="hljs-string">"loginLink"</span>, <span class="hljs-string">component:</span> Login},
  {<span class="hljs-string">path:</span> <span class="hljs-string">"*"</span>, <span class="hljs-string">redirect:</span> <span class="hljs-string">"/"</span>}]</code></pre>
<p>此处就设置如果URL输入错误或者是URL 匹配不到任何静态资源，就自动跳到到Home页面</p>
<h4>3、使用路由模块来实现页面跳转的方式</h4>
<p>方式1：直接修改地址栏</p>
<p>方式2：this.$router.push(‘路由地址’)</p>
<p>方式3：<code>&lt;router-link to="路由地址"&gt;&lt;/router-link&gt;</code></p>
<h2 id="articleHeader3">四、vue-router使用方式</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  1:下载 npm i vue-router -S
  2:在main.js中引入 import VueRouter from 'vue-router';
  3:安装插件 Vue.use(VueRouter);
  4:创建路由对象并配置路由规则 let router = new VueRouter({routes:[{path:'/home',component:Home}]});
  5:将其路由对象传递给Vue的实例，options中加入 router:router
  6:在app.vue中留坑 <router-view></router-view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-number">1</span>:下载 npm i vue-router -S
  <span class="hljs-number">2</span>:在main.js中引入 <span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
  <span class="hljs-number">3</span>:安装插件 Vue.use(VueRouter);
  <span class="hljs-number">4</span>:创建路由对象并配置路由规则 <span class="hljs-keyword">let</span> router = <span class="hljs-keyword">new</span> VueRouter({<span class="hljs-attr">routes</span>:[{<span class="hljs-attr">path</span>:<span class="hljs-string">'/home'</span>,<span class="hljs-attr">component</span>:Home}]});
  <span class="hljs-number">5</span>:将其路由对象传递给Vue的实例，options中加入 router:router
  <span class="hljs-number">6</span>:在app.vue中留坑 &lt;router-view&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span></span></code></pre>
<p>具体实现请看如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js文件中引入
import Vue from 'vue';
import VueRouter from 'vue-router';
//主体
import App from './components/app.vue';
import Home from './components/home.vue'
//安装插件
Vue.use(VueRouter); //挂载属性
//创建路由对象并配置路由规则
let router = new VueRouter({
    routes: [
        //一个个对象
        { path: '/home', component: Home }
    ]
});
//new Vue 启动
new Vue({
    el: '#app',
    //让vue知道我们的路由规则
    router: router, //可以简写router
    render: c => c(App),
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//main.js文件中引入</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>;
<span class="hljs-comment">//主体</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/app.vue'</span>;
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/home.vue'</span>
<span class="hljs-comment">//安装插件</span>
Vue.use(VueRouter); <span class="hljs-comment">//挂载属性</span>
<span class="hljs-comment">//创建路由对象并配置路由规则</span>
<span class="hljs-keyword">let</span> router = <span class="hljs-keyword">new</span> VueRouter({
    <span class="hljs-attr">routes</span>: [
        <span class="hljs-comment">//一个个对象</span>
        { <span class="hljs-attr">path</span>: <span class="hljs-string">'/home'</span>, <span class="hljs-attr">component</span>: Home }
    ]
});
<span class="hljs-comment">//new Vue 启动</span>
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-comment">//让vue知道我们的路由规则</span>
    router: router, <span class="hljs-comment">//可以简写router</span>
    render: <span class="hljs-function"><span class="hljs-params">c</span> =&gt;</span> c(App),
})</code></pre>
<p>最后记得在在app.vue中“留坑”</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.vue中
<template>
    <div>
        <!-- 留坑，非常重要 -->
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {}
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>//app.vue中
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 留坑，非常重要 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        data(){
            <span class="hljs-keyword">return</span> {}
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader4">五、vue-router核心要点</h2>
<h4>1.vue-router参数传递</h4>
<p>声明式的导航<code>&lt;router-link :to="..."&gt;</code>和编程式的导航<code>router.push(...)</code>都可以传参，本文主要介绍前者的传参方法，同样的规则也适用于编程式的导航。</p>
<p><strong>①用name传递参数</strong></p>
<p>在路由文件src/router/index.js里配置name属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">routes</span>: [
    {
      <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attribute">name</span>: <span class="hljs-string">'Hello'</span>,
      <span class="hljs-attribute">component</span>: Hello
    }
]</code></pre>
<p>模板里(src/App.vue)用<code>$route.name</code>来接收<br>比如：<code>&lt;p&gt;"{{" $route.name"}}"&lt;/p&gt;</code></p>
<p><strong>②通过<code>&lt;router-link&gt;</code> 标签中的to传参</strong></p>
<p>这种传参方法的基本语法：</p>
<p><code>&lt;router-link :to="{name:xxx,params:{key:value"}}""&gt;valueString&lt;/router-link&gt;</code></p>
<p>比如先在src/App.vue文件中</p>
<p><code>&lt;router-link :to="{name:'hi1',params:{username:'jspang',id:'555'"}}""&gt;Hi页面1&lt;/router-link&gt;</code></p>
<p>然后把src/router/index.js文件里给hi1配置的路由起个name,就叫hi1.</p>
<p><code>{path:'/hi1',name:'hi1',component:Hi1}</code></p>
<p>最后在模板里(src/components/Hi1.vue)用<code>$route.params.username</code>进行接收.</p>
<p><code>"{{"$route.params.username"}}"-"{{"$route.params.id"}}"</code></p>
<p><strong>③vue-router 利用url传递参数</strong>----在配置文件里以冒号的形式设置参数。</p>
<p>我们在/src/router/index.js文件里配置路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    path:'/params/:newsId/:newsTitle',
    component:Params
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">path</span>:<span class="hljs-string">'/params/:newsId/:newsTitle'</span>,
    component:Params
}</code></pre>
<p>我们需要传递参数是新闻ID（newsId）和新闻标题（newsTitle）.所以我们在路由配置文件里制定了这两个值。<br>在src/components目录下建立我们params.vue组件，也可以说是页面。我们在页面里输出了url传递的的新闻ID和新闻标题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h2>"{{" msg "}}"</h2>
        <p>新闻ID："{{" $route.params.newsId"}}"</p>
        <p>新闻标题："{{" $route.params.newsTitle"}}"</p>
    </div>
</template>
<script>
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>新闻ID：</span><span class="hljs-template-variable">"{{" $route.params.newsId"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>新闻标题：</span><span class="hljs-template-variable">"{{" $route.params.newsTitle"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'params'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'params page'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在App.vue文件里加入我们的<code>&lt;router-view&gt;</code>标签。这时候我们可以直接利用url传值了</p>
<p><code>&lt;router-link to="/params/198/jspang website is very good"&gt;params&lt;/router-link&gt;</code></p>
<p><strong>④使用path来匹配路由，然后通过query来传递参数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{ name:'Query',query: { queryId:  status "}}"&quot; >
     router-link跳转Query
</router-link>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{ name:'Query',query: { queryId:  status }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}"</span> &gt;</span>
     router-link跳转Query
<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
</span></code></pre>
<p>对应路由配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   {
     path: '/query',
     name: 'Query',
     component: Query
   }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>   {
     <span class="hljs-attribute">path</span>: <span class="hljs-string">'/query'</span>,
     name: <span class="hljs-string">'Query'</span>,
     component: Query
   }</code></pre>
<p>于是我们可以获取参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$route.query.queryId" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.query</span><span class="hljs-selector-class">.queryId</span></code></pre>
<h4>2.单页面多路由区域操作</h4>
<p>在一个页面里我们有2个以上<code>&lt;router-view&gt;</code>区域，我们通过配置路由的js文件，来操作这些区域的内容</p>
<p>①App.vue文件，在<code>&lt;router-view&gt;</code>下面新写了两行<code>&lt;router-view&gt;</code>标签,并加入了些CSS样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <img src=&quot;./assets/logo.png&quot;>
       <router-link :to=&quot;{name:'HelloWorld'}&quot;><h1>H1</h1></router-link>
       <router-link :to=&quot;{name:'H1'}&quot;><h1>H2</h1></router-link>
    <router-view></router-view>
    <router-view name=&quot;left&quot; style=&quot;float:left;width:50%;background-color:#ccc;height:300px;&quot;/>
    <router-view name=&quot;right&quot; style=&quot;float:right;width:50%;background-color:yellowgreen;height:300px;&quot;/>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./assets/logo.png"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'HelloWorld'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>H1<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'H1'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>H2<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:left;width:50%;background-color:#ccc;height:300px;"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"float:right;width:50%;background-color:yellowgreen;height:300px;"</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>②需要在路由里配置这三个区域，配置主要是在components字段里进行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
        components: {default: HelloWorld,
          left:H1,//显示H1组件内容'I am H1 page,Welcome to H1'
          right:H2//显示H2组件内容'I am H2 page,Welcome to H2'
        }
      },
      {
        path: '/h1',
        name: 'H1',
        components: {default: HelloWorld,
          left:H2,//显示H2组件内容
          right:H1//显示H1组件内容
        }
      }
    ]
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
    <span class="hljs-attribute">routes</span>: [
      {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'HelloWorld'</span>,
        <span class="hljs-attribute">components</span>: {<span class="hljs-attribute">default</span>: HelloWorld,
          <span class="hljs-attribute">left</span>:H1,<span class="hljs-comment">//显示H1组件内容'I am H1 page,Welcome to H1'</span>
          <span class="hljs-attribute">right</span>:H2<span class="hljs-comment">//显示H2组件内容'I am H2 page,Welcome to H2'</span>
        }
      },
      {
        <span class="hljs-attribute">path</span>: <span class="hljs-string">'/h1'</span>,
        <span class="hljs-attribute">name</span>: <span class="hljs-string">'H1'</span>,
        <span class="hljs-attribute">components</span>: {<span class="hljs-attribute">default</span>: HelloWorld,
          <span class="hljs-attribute">left</span>:H2,<span class="hljs-comment">//显示H2组件内容</span>
          <span class="hljs-attribute">right</span>:H1<span class="hljs-comment">//显示H1组件内容</span>
        }
      }
    ]
  })</code></pre>
<p>上边的代码我们编写了两个路径，一个是默认的‘/’，另一个是‘/Hi’.在两个路径下的components里面，我们对三个区域都定义了显示内容。最后页面展示如下图：</p>
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/21/16381eb52b0be962?w=1523&amp;h=751&amp;f=gif&amp;s=54546" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/21/16381eb52b0be962?w=1523&amp;h=751&amp;f=gif&amp;s=54546" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>3.vue-router配置子路由(二级路由)</h4>
<p>实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL中各段动态路径也按某种结构对应嵌套的各层组件，例如：<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/21/163822aabdd33ed2?w=619&amp;h=277&amp;f=png&amp;s=15365" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/21/163822aabdd33ed2?w=619&amp;h=277&amp;f=png&amp;s=15365" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>如何实现下图效果(H1页面和H2页面嵌套在主页中)</strong>？<br><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/21/163824944d520eda?w=621&amp;h=475&amp;f=gif&amp;s=40879" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/21/163824944d520eda?w=621&amp;h=475&amp;f=gif&amp;s=40879" alt="" title="" style="cursor: pointer;"></span></p>
<p>①首先用&lt;router-link&gt;标签增加了两个新的导航链接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<router-link :to=&quot;{name:'HelloWorld'}&quot;>主页</router-link>
<router-link :to=&quot;{name:'H1'}&quot;>H1页面</router-link>
<router-link :to=&quot;{name:'H2'}&quot;>H2页面</router-link>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'HelloWorld'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>主页<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'H1'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>H1页面<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{name:'H2'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>H2页面<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span></span></code></pre>
<p>②在HelloWorld.vue加入<code>&lt;router-view&gt;</code>标签，给子模板提供插入位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
 <div class=&quot;hello&quot;>
   <h1>"{{" msg "}}"</h1>
   <router-view></router-view>
 </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>③在components目录下新建两个组件模板 H1.vue 和 H2.vue<br> 两者内容类似，以下是H1.vue页面内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
 <div class=&quot;hello&quot;>
   <h1>"{{" msg "}}"</h1>
 </div>
</template>
<script>
 export default {
   data() {
     return {
       msg: 'I am H1 page,Welcome to H1'
     }
   }
 }
![clipboard.png](/img/bVbiDh9)

</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
 <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
   data() {
     <span class="hljs-keyword">return</span> {
       <span class="hljs-attr">msg</span>: <span class="hljs-string">'I am H1 page,Welcome to H1'</span>
     }
   }
 }
![clipboard.png](<span class="hljs-regexp">/img/</span>bVbiDh9)

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>④修改router/index.js代码，子路由的写法是在原有的路由配置下加入children字段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  routes: [
   {
     path: '/',
     name: 'HelloWorld',
     component: HelloWorld,
     children: [{path: '/h1', name: 'H1', component: H1},//子路由的<router-view>必须在HelloWorld.vue中出现
       {path: '/h2', name: 'H2', component: H2}
     ]
   }
 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>  <span class="hljs-attribute">routes</span>: [
   {
     <span class="hljs-attribute">path</span>: <span class="hljs-string">'/'</span>,
     <span class="hljs-attribute">name</span>: <span class="hljs-string">'HelloWorld'</span>,
     <span class="hljs-attribute">component</span>: HelloWorld,
     <span class="hljs-attribute">children</span>: [{<span class="hljs-attribute">path</span>: <span class="hljs-string">'/h1'</span>, <span class="hljs-attribute">name</span>: <span class="hljs-string">'H1'</span>, <span class="hljs-attribute">component</span>: H1},<span class="hljs-comment">//子路由的&lt;router-view&gt;必须在HelloWorld.vue中出现</span>
       {<span class="hljs-attribute">path</span>: <span class="hljs-string">'/h2'</span>, <span class="hljs-attribute">name</span>: <span class="hljs-string">'H2'</span>, <span class="hljs-attribute">component</span>: H2}
     ]
   }
 ]</code></pre>
<h4>4.<code>$route</code> 和 <code>$router</code> 的区别</h4>
<p>我们先将这两者console.log打印出来：</p>
<p><span class="img-wrap"><img data-src="/img/bVbiDh9" src="https://static.alili.tech/img/bVbiDh9" alt="$route" title="$route" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbiDib" src="https://static.alili.tech/img/bVbiDib" alt="$router" title="$router" style="cursor: pointer; display: inline;"></span></p>
<ul><li><strong>$route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数。</strong></li></ul>
<p><strong>① <code>$route.path</code></strong><br>字符串，对应当前路由的路径，总是解析为绝对路径，如 "/order"。</p>
<p><strong>② <code>$route.params</code></strong><br>一个 key/value 对象，包含了 动态片段 和 全匹配片段，<br>如果没有路由参数，就是一个空对象。</p>
<p><strong>③ <code>$route.query</code></strong><br>一个 key/value 对象，表示 URL 查询参数。<br>例如，对于路径 /foo?user=1，则有 $route.query.user为1，<br>如果没有查询参数，则是个空对象。</p>
<p><strong>④ <code>$route.hash</code></strong><br>当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。</p>
<p><strong>⑤ <code>$route.fullPath</code></strong><br>完成解析后的 URL，包含查询参数和 hash 的完整路径。</p>
<p><strong>⑥ <code>$route.matched</code></strong><br>数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。</p>
<p><strong>⑦ <code>$route.name</code>   当前路径名字</strong></p>
<ul><li><strong>$router 是“路由实例”对象，即使用 new VueRouter创建的实例，包括了路由的跳转方法，钩子函数等。</strong></li></ul>
<p><strong>$router常见跳转方法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button @click=&quot;goToMenu&quot; class=&quot;btn btn-success&quot;>Let's order！</button>
.....
<script>
  export default{
    methods:{
      goToMenu(){
        this.$router.go(-1)//跳转到上一次浏览的页面
        this.$router.replace('/menu')//指定跳转的地址
        this.$router.replace({name:'menuLink'})//指定跳转路由的名字下
        this.$router.push('/menu')//通过push进行跳转
        this.$router.push({name:'menuLink'})//通过push进行跳转路由的名字下
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"goToMenu"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-success"</span>&gt;</span>Let's order！<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
.....
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">methods</span>:{
      goToMenu(){
        <span class="hljs-keyword">this</span>.$router.go(<span class="hljs-number">-1</span>)<span class="hljs-comment">//跳转到上一次浏览的页面</span>
        <span class="hljs-keyword">this</span>.$router.replace(<span class="hljs-string">'/menu'</span>)<span class="hljs-comment">//指定跳转的地址</span>
        <span class="hljs-keyword">this</span>.$router.replace({<span class="hljs-attr">name</span>:<span class="hljs-string">'menuLink'</span>})<span class="hljs-comment">//指定跳转路由的名字下</span>
        <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/menu'</span>)<span class="hljs-comment">//通过push进行跳转</span>
        <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">name</span>:<span class="hljs-string">'menuLink'</span>})<span class="hljs-comment">//通过push进行跳转路由的名字下</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong><code>$router.push</code>和<code>$router.replace</code>的区别</strong>：</p>
<ul>
<li>使用push方法的跳转会向 history 栈添加一个新的记录，当我们点击浏览器的返回按钮时可以看到之前的页面。</li>
<li>使用replace方法不会向 history 添加新记录，而是替换掉当前的 history 记录，即当replace跳转到的网页后，‘后退’按钮不能查看之前的页面。</li>
</ul>
<h4>5.404页面的设置</h4>
<p>用户会经常输错页面，当用户输错页面时，我们希望给他一个友好的提示页面，这个页面就是我们常说的404页面。vue-router也为我们提供了这样的机制。<br>①设置我们的路由配置文件（/src/router/index.js）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
   path:'*',
   component:Error
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
   <span class="hljs-attribute">path</span>:<span class="hljs-string">'*'</span>,
   component:Error
}</code></pre>
<p>这里的path:'*'就是输入地址不匹配时，自动显示出Error.vue的文件内容</p>
<p>②在/src/components/文件夹下新建一个Error.vue的文件。简单输入一些有关错误页面的内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>
        <h2>"{{" msg "}}"</h2>
    </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Error:404'
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Error:404'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>此时我们随意输入一个错误的地址时，便会自动跳转到404页面</p>
<p><strong>如果觉得文章对你有些许帮助，欢迎在<a href="https://github.com/ljianshu/Blog" rel="nofollow noreferrer" target="_blank">我的GitHub博客</a>点赞和关注，感激不尽！</strong></p>
<h2 id="articleHeader5">六、参考文章</h2>
<h4><a href="https://zhang122622623.github.io/2018/03/14/vue-router%E5%AE%9E%E7%8E%B0%E5%8D%95%E9%A1%B5%E9%9D%A2%E8%B7%AF%E7%94%B1%E5%8E%9F%E7%90%86/" rel="nofollow noreferrer" target="_blank">vue-router实现单页面路由原理</a></h4>
<h4><a href="http://www.cnblogs.com/keepfool/p/5690366.html" rel="nofollow noreferrer" target="_blank">Vue.js——vue-router 60分钟快速入门</a></h4>
<h4><a href="http://jspang.com/2017/04/13/vue-router/" rel="nofollow noreferrer" target="_blank">技术胖的Vue-router视频教程</a></h4>
<h4><a href="https://segmentfault.com/a/1190000016662929">vue中$router以及$route的使用</a></h4>
<h4><a href="https://segmentfault.com/a/1190000009651628" target="_blank">Vue2.0 探索之路——vue-router入门教程和总结</a></h4>
<h4><a href="https://segmentfault.com/a/1190000009392552">vue-router 2.0一些区别</a></h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从头开始学习vue-router

## 原文链接
[https://segmentfault.com/a/1190000016944337](https://segmentfault.com/a/1190000016944337)


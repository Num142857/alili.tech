---
title: 'vue2.0构建单页应用最佳实战' 
date: 2019-01-31 2:31:15
hidden: true
slug: p8gdwxvt78g
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>我们将会选择使用一些vue周边的库<code>vue-cli</code>, <code>vue-router</code>,<code>vue-resource</code>,<code>vuex</code></p>
<blockquote><p>1.使用vue-cli创建项目<br>2.使用vue-router实现单页路由<br>3.用vuex管理我们的数据流<br>4.使用vue-resource请求我们的node服务端<br>5.使用.vue文件进行组件化的开发<br>PS：本文node v6.2.2 npm v3.9.5 vue v2.1.0 vue-router v2.0.3 vuex v2.0.0</p></blockquote>
<p>最终我们将会构建出一个小demo，不废话，直接上图。<br><span class="img-wrap"><img data-src="/img/remote/1460000007630680?w=2288&amp;h=764" src="https://static.alili.tech/img/remote/1460000007630680?w=2288&amp;h=764" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">安装</h2>
<p>1.我们将会使用webpack去为我们的模块打包，预处理，热加载。如果你对webpack不熟悉，它就是可以帮助我们把多个js文件打包为1个入口文件，并且可以达到按需加载。这就意味着，我们不用担心由于使用太多的组件，导致了过多的HTTP请求，这是非常有益于产品体验的。但我们并不只是为了这个而使用webpack，我们需要用webpack去编译.vue文件，如果没有使用一个loader去转换我们.vue文件里的style、js和html，那么浏览器就无法识别。</p>
<p>2.模块热加载是webpack的一个非常碉堡的特性，将会为我们的单页应用带来极大的便利。<br>通常来说，当我们修改了代码刷新页面，那应用里的所有状态就都没有了。这对于开发一个单页应用来说是非常痛苦的，因为需要重新在跑一遍流程。如果有模块热加载，当你修改了代码，你的代码会直接修改，页面并不会刷新，所以状态也会被保留。</p>
<p>3.Vue也为我们提供了CSS预处理，所以我们可以选择在.vue文件里写LESS或者SASS去代替原生CSS。</p>
<p>4.我们过去通常需要使用npm下载一堆的依赖，但是现在我们可以选择Vue-cli。这是一个vue生态系统中一个伟大创举。这意味着我们不需要手动构建我们的项目，而它就可以很快地为我们生成。</p>
<p>首先，安装vue-cli。(确保你有node和npm)</p>
<p><code>npm i -g vue-cli</code> </p>
<p>然后创建一个webpack项目并且下载依赖</p>
<p><code>vue init webpack vue-tutorial</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007630681?w=1100&amp;h=608" src="https://static.alili.tech/img/remote/1460000007630681?w=1100&amp;h=608" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>cd vue-tutorial</code></p>
<p><code>npm i</code></p>
<p>接着使用 <code>npm run dev</code> 在热加载中运行我们的应用</p>
<p>这一行命令代表着它会去找到<code>package.json</code>的<code>scripts</code>对象，执行<code>node bulid/dev-server.js</code>。在这文件里，配置了Webpack，会让它去编译项目文件，并且运行服务器，我们在<code>localhost:8080</code>即可查看我们的应用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007630682?w=720&amp;h=615" src="https://static.alili.tech/img/remote/1460000007630682?w=720&amp;h=615" alt="" title="" style="cursor: pointer;"></span></p>
<p>这些都准备好后，我们需要为我们的路由、XHR请求、数据管理下载三个库，我们可以从vue的官网中找到他们。另外我们使用<code>bootstrap</code>作为我的UI库</p>
<p><code>npm i vue-resource vue-router vuex bootstrap --save</code></p>
<h2 id="articleHeader2">初始化（main.js）</h2>
<p>查看我们的应用文件，我们可以在src目录下找到<code>App.vue</code>和<code>main.js</code>。<code>main.js</code>将会作为我们应用的入口文件而<code>App.vue</code>会作为我们应用的初始化组件。先让我们来完善下<code>main.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  path : '/',
  component : Home
},{
  path : '/home',
  component : Home
}];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
// 实例化我们的Vue
var app = new Vue({
  el: '#app',
  router,
  ...App,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>

<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Home'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'bootstrap/dist/css/bootstrap.css'</span>

Vue.use(VueRouter)
Vue.use(VueResource)

<span class="hljs-keyword">const</span> routes = [{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">component</span> : Home
},{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/home'</span>,
  <span class="hljs-attr">component</span> : Home
}];

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes
});

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-comment">// 实例化我们的Vue</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  ...App,
});</code></pre>
<p><strong>这有两个与1.0不同的地方</strong></p>
<blockquote>
<p>一、<code>vue-router</code>路由的参数由对象统一变为了数组要注意。还有则是实例化vue的<code>el</code>参数已经不能设置<code>html</code>和<code>body</code>了，因为在<code>vue2</code>中是会替换我们指定的标签</p>
<p>二、我们必须在实例化vue的时候指定渲染什么组件，以前我们是通过路由来指定如<code>router.start(App, '#app')</code>，而在vue2中则不需要了</p>
</blockquote>
<p>可以发现我们在<code>main.js</code>里使用了两个组件<code>App.vue</code>和<code>Home.vue</code>，稍后让我们具体实现它们的内容。</p>
<p>而我们的<code>index.html</code>只需要保留<code>&lt;div id="app"&gt;&lt;/div&gt;</code>即可，我们的Vue在实例化时设置了<code>el : '#app'</code> 所以会替换这标签，为我们<code>App</code>组件的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html
<div id=&quot;app&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//index.html
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们的初始化就到这结束了，接下来让我们开始创建组件。</p>
<h2 id="articleHeader3">创建首页组件</h2>
<p>首先我们在App.vue里为我们的应用写个顶部导航。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/App.vue

<template>
  <div id=&quot;wrapper&quot;>
    <nav class=&quot;navbar navbar-default&quot;>
      <div class=&quot;container&quot;>
        <a class=&quot;navbar-brand&quot; href=&quot;#&quot;>
          <i class=&quot;glyphicon glyphicon-time&quot;></i>
          计划板
        </a>
        <ul class=&quot;nav navbar-nav&quot;>
          <li><router-link to=&quot;/home&quot;>首页</router-link></li>
          <li><router-link to=&quot;/time-entries&quot;>计划列表</router-link></li>
        </ul>
      </div>
    </nav>
    <div class=&quot;container&quot;>
      <div class=&quot;col-sm-3&quot;>
        
      </div>
      <div class=&quot;col-sm-9&quot;>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/App.vue</span>

&lt;template&gt;
  &lt;div id="wrapper"&gt;
    &lt;nav class="navbar navbar-default"&gt;
      &lt;div class="container"&gt;
        &lt;a class="navbar-brand" href="#"&gt;
          &lt;i class="glyphicon glyphicon-time"&gt;&lt;/i&gt;
          计划板
        &lt;/a&gt;
        &lt;ul class="nav navbar-nav"&gt;
          &lt;li&gt;&lt;router-link to="/home"&gt;首页&lt;/router-link&gt;&lt;/li&gt;
          &lt;li&gt;&lt;router-link to="/time-entries"&gt;计划列表&lt;/router-link&gt;&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/div&gt;
    &lt;/nav&gt;
    &lt;div class="container"&gt;
      &lt;div class="col-sm-3"&gt;
        
      &lt;/div&gt;
      &lt;div class="col-sm-9"&gt;
        &lt;router-view&gt;&lt;/router-view&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code></pre>
<p>除了我们的<code>navbar</code>以外，我们还需要一个<code>.container</code>去放我们其余需要展示的信息。<br>并且在这里我们要放一个<code>router-view</code>标签，<code>vue-router</code>的切换就是通过这个标签开始显现的。</p>
<p><strong>在这有个与1.0不同的地方</strong></p>
<blockquote><p>以前我们可以直接通过写a标签 然后写v-link属性进行路由跳转，在vue2中改为了写<code>&lt;router-link&gt;</code>标签再写对应属性（to）进行跳转</p></blockquote>
<p>接着，我们需要创建一个<code>Home.vue</code>作为我们的首页</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/Home.vue

<template>
  <div class=&quot;jumbotron&quot;>
    <h1>任务追踪</h1>
    <p>
      <strong>
        <router-link to=&quot;/time-entries&quot;>创建一个任务</router-link>
      </strong>
    </p>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/components/Home.vue</span>

&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"jumbotron"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>任务追踪<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/time-entries"</span>&gt;</span>创建一个任务<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>不出意外的话，你可以看见如下效果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005009057" src="https://static.alili.tech/img/remote/1460000005009057" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">创建侧边栏组件</h2>
<p>目前我们首页左侧还有一块空白，我们需要它放下一个侧边栏去统计所有计划的总时间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/App.vue

  //...

  <div class=&quot;container&quot;>
    <div class=&quot;col-sm-3&quot;>
      <sidebar></sidebar>
    </div>
    <div class=&quot;col-sm-9&quot;>
      <router-view></router-view>
    </div>
  </div>

  //..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/App.vue</span>

  <span class="hljs-comment">//...</span>

  &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-3"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">sidebar</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sidebar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"col-sm-9"</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/div&gt;

  /</span><span class="hljs-regexp">/...</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: { 'sidebar': Sidebar },
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
  <span class="hljs-keyword">import</span> Sidebar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Sidebar.vue'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: { <span class="hljs-string">'sidebar'</span>: Sidebar },
  }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>在<code>Sidebar.vue</code>我们需要通过store去获取总时间，我们的总时间是共享的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/Sidebar.vue
<template>
  <div class=&quot;panel panel-default&quot;>
    <div class=&quot;panel-heading&quot;>
      <h1 class=&quot;text-center&quot;>已有时长</h1>
    </div>

    <div class=&quot;panel-body&quot;>
      <h1 class=&quot;text-center&quot;>"{{" time "}}" 小时</h1>
    </div>

  </div>
</template>

<script>
  export default {
    computed: {
        time() {
          return this.$store.state.totalTime
        }
      }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// src/components/Sidebar.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel panel-default"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel-heading"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-center"</span>&gt;</span>已有时长<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"panel-body"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text-center"</span>&gt;</span></span><span class="hljs-template-variable">"{{" time "}}"</span><span class="xml"> 小时<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">computed</span>: {
        time() {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.totalTime
        }
      }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<h2 id="articleHeader5">创建计划列表组件</h2>
<p>然后我们需要去创建我们的时间跟踪列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// src/components/TimeEntries.vue

<template>
  <div>
    //`v-if`是vue的一个指令
    //`$route.path`是当前路由对象的路径，会被解析为绝对路径当
    //`$route.path !== '/time-entries/log-time'`为`true`是显示，`false`，为不显示。
    //to 路由跳转地址
    <router-link
      v-if=&quot;$route.path !== '/time-entries/log-time'&quot;
      to=&quot;/time-entries/log-time&quot;
      class=&quot;btn btn-primary&quot;>
      创建
    </router-link>

    <div v-if=&quot;$route.path === '/time-entries/log-time'&quot;>
      <h3>创建</h3>
    </div>

    <hr>

    <router-view></router-view>

    <div class=&quot;time-entries&quot;>
      <p v-if=&quot;!plans.length&quot;><strong>还没有任何计划</strong></p>

      <div class=&quot;list-group&quot;>
      <--
        v-for循环，注意参数顺序为(item,index) in items
      -->
        <a class=&quot;list-group-item&quot; v-for=&quot;(plan,index) in plans&quot;>
          <div class=&quot;row&quot;>
            <div class=&quot;col-sm-2 user-details&quot;>
            
            <--
            `:src`属性，这个是vue的属性绑定简写`v-bind`可以缩写为`:`
             比如a标签的`href`可以写为`:href`
            并且在vue的指令里就一定不要写插值表达式了(`:src="{{"xx"}}"`)，vue自己会去解析
            -->
            
              <img :src=&quot;plan.avatar&quot; class=&quot;avatar img-circle img-responsive&quot; />
              <p class=&quot;text-center&quot;>
                <strong>
                  "{{" plan.name "}}"
                </strong>
              </p>
            </div>

            <div class=&quot;col-sm-2 text-center time-block&quot;>
              <h3 class=&quot;list-group-item-text total-time&quot;>
                <i class=&quot;glyphicon glyphicon-time&quot;></i>
                "{{" plan.totalTime "}}"
              </h3>
              <p class=&quot;label label-primary text-center&quot;>
                <i class=&quot;glyphicon glyphicon-calendar&quot;></i>
                "{{" plan.date "}}"
              </p>
            </div>

            <div class=&quot;col-sm-7 comment-section&quot;>
              <p>"{{" plan.comment "}}"</p>
            </div>

            <div class=&quot;col-sm-1&quot;>
              <button
                class=&quot;btn btn-xs btn-danger delete-button&quot;
                @click=&quot;deletePlan(index)&quot;>
              X
              </button>
            </div>

          </div>
        </a>

      </div>
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">// src/components/TimeEntries.vue</span>

&lt;template&gt;
  &lt;div&gt;
    //`v-if`是vue的一个指令
    //`$route.path`是当前路由对象的路径，会被解析为绝对路径当
    //`$route.path !== '/time-entries/log-time'`为`true`是显示，`false`，为不显示。
    //to 路由跳转地址
    &lt;router-link
      v-if="$route.path !== '/time-entries/log-time'"
      to="/time-entries/log-time"
      class="btn btn-primary"&gt;
      创建
    &lt;/router-link&gt;

    &lt;div v-if="$route.path === '/time-entries/log-time'"&gt;
      &lt;h3&gt;创建&lt;/h3&gt;
    &lt;/div&gt;

    &lt;hr&gt;

    &lt;router-view&gt;&lt;/router-view&gt;

    &lt;div class="time-entries"&gt;
      &lt;p v-if="!plans.length"&gt;&lt;strong&gt;还没有任何计划&lt;/strong&gt;&lt;/p&gt;

      &lt;div class="list-group"&gt;
      &lt;--
        v-for循环，注意参数顺序为(item,index) in items
      --&gt;
        &lt;a class="list-group-item" v-for="(plan,index) in plans"&gt;
          &lt;div class="row"&gt;
            &lt;div class="col-sm-2 user-details"&gt;
            
            &lt;--
            `:src`属性，这个是vue的属性绑定简写`v-bind`可以缩写为`:`
             比如a标签的`href`可以写为`:href`
            并且在vue的指令里就一定不要写插值表达式了(`:src="{{"xx"}}"`)，vue自己会去解析
            --&gt;
            
              &lt;img :src="plan.avatar" class="avatar img-circle img-responsive" /&gt;
              &lt;p class="text-center"&gt;
                &lt;strong&gt;
                  "{{" plan.name "}}"
                &lt;/strong&gt;
              &lt;/p&gt;
            &lt;/div&gt;

            &lt;div class="col-sm-2 text-center time-block"&gt;
              &lt;h3 class="list-group-item-text total-time"&gt;
                &lt;i class="glyphicon glyphicon-time"&gt;&lt;/i&gt;
                "{{" plan.totalTime "}}"
              &lt;/h3&gt;
              &lt;p class="label label-primary text-center"&gt;
                &lt;i class="glyphicon glyphicon-calendar"&gt;&lt;/i&gt;
                "{{" plan.date "}}"
              &lt;/p&gt;
            &lt;/div&gt;

            &lt;div class="col-sm-7 comment-section"&gt;
              &lt;p&gt;"{{" plan.comment "}}"&lt;/p&gt;
            &lt;/div&gt;

            &lt;div class="col-sm-1"&gt;
              &lt;button
                class="btn btn-xs btn-danger delete-button"
                @click="deletePlan(index)"&gt;
              X
              &lt;/button&gt;
            &lt;/div&gt;

          &lt;/div&gt;
        &lt;/a&gt;

      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
<p>关于template的解释，都写在一起了，再看看我们的<code>script</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/TimeEntries.vue

<script>
    export default {
        name : 'TimeEntries',
        computed : {
          plans () {
            // 从store中取出数据
            return this.$store.state.list
          }
        },
        methods : {
          deletePlan(idx) {
            // 稍后再来说这里的方法
            // 减去总时间
            this.$store.dispatch('decTotalTime',this.plans[idx].totalTime)
            // 删除该计划
            this.$store.dispatch('deletePlan',idx)
          }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/components/TimeEntries.vue</span>

&lt;script&gt;
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span> : <span class="hljs-string">'TimeEntries'</span>,
        <span class="hljs-attr">computed</span> : {
          plans () {
            <span class="hljs-comment">// 从store中取出数据</span>
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.list
          }
        },
        <span class="hljs-attr">methods</span> : {
          deletePlan(idx) {
            <span class="hljs-comment">// 稍后再来说这里的方法</span>
            <span class="hljs-comment">// 减去总时间</span>
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'decTotalTime'</span>,<span class="hljs-keyword">this</span>.plans[idx].totalTime)
            <span class="hljs-comment">// 删除该计划</span>
            <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'deletePlan'</span>,idx)
          }
        }
    }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>别忘了为我们的组件写上一些需要的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/TimeEntries.vue

<style>
  .avatar {
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: 1px solid #ddd;
    margin: -10px 0;
  }
  .time-block {
    padding: 10px;
  }
  .comment-section {
    padding: 20px;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/components/TimeEntries.vue</span>

&lt;style&gt;
  .avatar {
    <span class="hljs-attr">height</span>: <span class="hljs-number">75</span>px;
    margin: <span class="hljs-number">0</span> auto;
    margin-top: <span class="hljs-number">10</span>px;
    margin-bottom: <span class="hljs-number">10</span>px;
  }
  .user-details {
    background-color: #f5f5f5;
    border-right: <span class="hljs-number">1</span>px solid #ddd;
    margin: <span class="hljs-number">-10</span>px <span class="hljs-number">0</span>;
  }
  .time-block {
    <span class="hljs-attr">padding</span>: <span class="hljs-number">10</span>px;
  }
  .comment-section {
    <span class="hljs-attr">padding</span>: <span class="hljs-number">20</span>px;
  }
&lt;<span class="hljs-regexp">/style&gt;</span></code></pre>
<p>既然我们的数据是共享的，所以我们需要把数据存在<code>store</code>里</p>
<p>我们在src下创建个目录为<code>store</code></p>
<p>在<code>store</code>下分别创建4个js文件<code>actions.js</code>,<code>index.js</code>,<code>mutation-types.js</code>,<code>mutations.js</code></p>
<p>看名字也就知道这4个分别是做啥用的了，建议大家多阅读阅读<code>vuex</code>的文档，多姿势多动手实践，慢慢的也就能理解了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 先写个假数据
const state = {
  totalTime: 0,
  list: [{
    name : '二哲',
    avatar : 'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256',
    date : '2016-12-25',
    totalTime : '6',
    comment : '12月25日晚上，陪女朋友一起过圣诞节需要6个小时'
  }]
};

export default new Vuex.Store({
  state,
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/store/index.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex);

<span class="hljs-comment">// 先写个假数据</span>
<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">totalTime</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">list</span>: [{
    <span class="hljs-attr">name</span> : <span class="hljs-string">'二哲'</span>,
    <span class="hljs-attr">avatar</span> : <span class="hljs-string">'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256'</span>,
    <span class="hljs-attr">date</span> : <span class="hljs-string">'2016-12-25'</span>,
    <span class="hljs-attr">totalTime</span> : <span class="hljs-string">'6'</span>,
    <span class="hljs-attr">comment</span> : <span class="hljs-string">'12月25日晚上，陪女朋友一起过圣诞节需要6个小时'</span>
  }]
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
})</code></pre>
<p>由于新增了页面和store 在我们的入口js文件里配置下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js
import store from './store'
import TimeEntries from './components/TimeEntries.vue'
//... 

const routes = [{
  path : '/',
  component : Home
},{
  path : '/home',
  component : Home
},{
  path : '/time-entries',
  component : TimeEntries,
}];

var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/main.js</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> TimeEntries <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/TimeEntries.vue'</span>
<span class="hljs-comment">//... </span>

<span class="hljs-keyword">const</span> routes = [{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">component</span> : Home
},{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/home'</span>,
  <span class="hljs-attr">component</span> : Home
},{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/time-entries'</span>,
  <span class="hljs-attr">component</span> : TimeEntries,
}];

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  store,
  ...App,
});
</code></pre>
<p>不出意外的话，你可以在<code>/time-entries</code> 路由下看见这样的页面</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007630683?w=1517&amp;h=363" src="https://static.alili.tech/img/remote/1460000007630683?w=1517&amp;h=363" alt="" title="" style="cursor: pointer;"></span></p>
<p>通过<code>vue-Devtools</code>我们可以发现我们的store已经构造好了并且成功从store获取了数据</p>
<h2 id="articleHeader6">创建任务组件</h2>
<p>这个比较简单我们直接给出代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/components/LogTime.vue

<template>
  <div class=&quot;form-horizontal&quot;>
    <div class=&quot;form-group&quot;>
      <div class=&quot;col-sm-6&quot;>
        <label>日期</label>
        <input
          type=&quot;date&quot;
          class=&quot;form-control&quot;
          v-model=&quot;date&quot;
          placeholder=&quot;Date&quot;
        />
      </div>
      <div class=&quot;col-sm-6&quot;>
        <label>时间</label>
        <input
          type=&quot;number&quot;
          class=&quot;form-control&quot;
          v-model=&quot;totalTime&quot;
          placeholder=&quot;Hours&quot;
        />
      </div>
    </div>
    <div class=&quot;form-group&quot;>
      <div class=&quot;col-sm-12&quot;>
        <label>备注</label>
        <input
          type=&quot;text&quot;
          class=&quot;form-control&quot;
          v-model=&quot;comment&quot;
          placeholder=&quot;Comment&quot;
        />
      </div>
    </div>
    <button class=&quot;btn btn-primary&quot; @click=&quot;save()&quot;>保存</button>
    <router-link to=&quot;/time-entries&quot; class=&quot;btn btn-danger&quot;>取消</router-link>
    <hr>
  </div>
</template>

<script>
  export default {
        name : 'LogTime',
        data() {
            return {
                date : '',
                totalTime : '',
                comment : ''
            }
        },
        methods:{
          save() {
            const plan = {
              name : '二哲',
              image : 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256',
              date : this.date,
              totalTime : this.totalTime,
              comment : this.comment
            };
            this.$store.dispatch('savePlan', plan)
            this.$store.dispatch('addTotalTime', this.totalTime)
            this.$router.go(-1)
          }
        }
    }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/components/LogTime.vue</span>

&lt;template&gt;
  &lt;div class="form-horizontal"&gt;
    &lt;div class="form-group"&gt;
      &lt;div class="col-sm-6"&gt;
        &lt;label&gt;日期&lt;/label&gt;
        &lt;input
          type="date"
          class="form-control"
          v-model="date"
          placeholder="Date"
        /&gt;
      &lt;/div&gt;
      &lt;div class="col-sm-6"&gt;
        &lt;label&gt;时间&lt;/label&gt;
        &lt;input
          type="number"
          class="form-control"
          v-model="totalTime"
          placeholder="Hours"
        /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="form-group"&gt;
      &lt;div class="col-sm-12"&gt;
        &lt;label&gt;备注&lt;/label&gt;
        &lt;input
          type="text"
          class="form-control"
          v-model="comment"
          placeholder="Comment"
        /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;button class="btn btn-primary" @click="save()"&gt;保存&lt;/button&gt;
    &lt;router-link to="/time-entries" class="btn btn-danger"&gt;取消&lt;/router-link&gt;
    &lt;hr&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
        name : 'LogTime',
        data() {
            return {
                date : '',
                totalTime : '',
                comment : ''
            }
        },
        methods:{
          save() {
            const plan = {
              name : '二哲',
              image : 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256',
              date : this.date,
              totalTime : this.totalTime,
              comment : this.comment
            };
            this.$store.dispatch('savePlan', plan)
            this.$store.dispatch('addTotalTime', this.totalTime)
            this.$router.go(-1)
          }
        }
    }
&lt;/script&gt;
</code></pre>
<p>这个组件很简单就3个input输入而已，然后就两个按钮，保存我们就把数据push进我们store的列表里</p>
<p><code>LogTime</code>属于我们<code>TimeEntries</code>组件的一个子路由，所以我们依旧需要配置下我们的路由，并且利用webpack让它懒加载，减少我们首屏加载的流量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js
//...
const routes = [{
  path : '/',
  component : Home
},{
  path : '/home',
  component : Home
},{
  path : '/time-entries',
  component : TimeEntries,
  children : [{
    path : 'log-time',
    // 懒加载
    component : resolve => require(['./components/LogTime.vue'],resolve),
  }]
}];

//..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/main.js</span>
<span class="hljs-comment">//...</span>
<span class="hljs-keyword">const</span> routes = [{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">component</span> : Home
},{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/home'</span>,
  <span class="hljs-attr">component</span> : Home
},{
  <span class="hljs-attr">path</span> : <span class="hljs-string">'/time-entries'</span>,
  <span class="hljs-attr">component</span> : TimeEntries,
  <span class="hljs-attr">children</span> : [{
    <span class="hljs-attr">path</span> : <span class="hljs-string">'log-time'</span>,
    <span class="hljs-comment">// 懒加载</span>
    component : <span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/LogTime.vue'</span>],resolve),
  }]
}];

<span class="hljs-comment">//...</span></code></pre>
<h2 id="articleHeader7">vuex部分</h2>
<p><strong>在vue2.0中废除了使用事件的方式进行通信，所以在小项目中我们可以使用Event Bus，其余最好都使用vuex，本文我们使用Vuex来实现数据通信</strong></p>
<p>相信你刚刚已经看见了我写了很多<code>this.$store.dispatch('savePlan', plan)</code> 类似这样的代码，我们再次统一说明。</p>
<p>仔细思考一下，我们需要两个全局数据，一个为所有计划的总时间，一个是计划列表的数组。</p>
<p><code>src/store/index.js</code> 没啥太多可介绍的，其实就是传入我们的<code>state</code>,<code>mutations</code>,<code>actions</code>来初始化我们的Store。如果有需要的话我们还可能需要创建我们的<code>getter</code>在本例中就不用了。</p>
<p>接着我们看<code>mutation-types.js</code>，既然想很明确了解数据，那就应该有什么样的操作看起，当然这也看个人口味哈</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/store/mutation-types.js

// 增加总时间或者减少总时间
export const ADD_TOTAL_TIME = 'ADD_TOTAL_TIME';
export const DEC_TOTAL_TIME = 'DEC_TOTAL_TIME';

// 新增和删除一条计划
export const SAVE_PLAN = 'SAVE_PLAN';
export const DELETE_PLAN = 'DELETE_PLAN';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/store/mutation-types.js</span>

<span class="hljs-comment">// 增加总时间或者减少总时间</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ADD_TOTAL_TIME = <span class="hljs-string">'ADD_TOTAL_TIME'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DEC_TOTAL_TIME = <span class="hljs-string">'DEC_TOTAL_TIME'</span>;

<span class="hljs-comment">// 新增和删除一条计划</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SAVE_PLAN = <span class="hljs-string">'SAVE_PLAN'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> DELETE_PLAN = <span class="hljs-string">'DELETE_PLAN'</span>;
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/store/mutations.js
import * as types from './mutation-types'

export default {
    // 增加总时间
  [types.ADD_TOTAL_TIME] (state, time) {
    state.totalTime = state.totalTime + time
  },
  // 减少总时间
  [types.DEC_TOTAL_TIME] (state, time) {
    state.totalTime = state.totalTime - time
  },
  // 新增计划
  [types.SAVE_PLAN] (state, plan) {
    // 设置默认值，未来我们可以做登入直接读取昵称和头像
    const avatar = 'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256';
    
    state.list.push(
      Object.assign({ name: '二哲', avatar: avatar }, plan)
    )
  },
  // 删除某计划
  [types.DELETE_PLAN] (state, idx) {
    state.list.splice(idx, 1);
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/store/mutations.js</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation-types'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// 增加总时间</span>
  [types.ADD_TOTAL_TIME] (state, time) {
    state.totalTime = state.totalTime + time
  },
  <span class="hljs-comment">// 减少总时间</span>
  [types.DEC_TOTAL_TIME] (state, time) {
    state.totalTime = state.totalTime - time
  },
  <span class="hljs-comment">// 新增计划</span>
  [types.SAVE_PLAN] (state, plan) {
    <span class="hljs-comment">// 设置默认值，未来我们可以做登入直接读取昵称和头像</span>
    <span class="hljs-keyword">const</span> avatar = <span class="hljs-string">'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256'</span>;
    
    state.list.push(
      <span class="hljs-built_in">Object</span>.assign({ <span class="hljs-attr">name</span>: <span class="hljs-string">'二哲'</span>, <span class="hljs-attr">avatar</span>: avatar }, plan)
    )
  },
  <span class="hljs-comment">// 删除某计划</span>
  [types.DELETE_PLAN] (state, idx) {
    state.list.splice(idx, <span class="hljs-number">1</span>);
  }
};
</code></pre>
<p>最后对应看我们的<code>actions</code>就很明白了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/store/actions.js

import * as types from './mutation-types'

export default {
  addTotalTime({ commit }, time) {
    commit(types.ADD_TOTAL_TIME, time)
  },
  decTotalTime({ commit }, time) {
    commit(types.DEC_TOTAL_TIME, time)
  },
  savePlan({ commit }, plan) {
    commit(types.SAVE_PLAN, plan);
  },
  deletePlan({ commit }, plan) {
    commit(types.DELETE_PLAN, plan)
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/store/actions.js</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutation-types'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  addTotalTime({ commit }, time) {
    commit(types.ADD_TOTAL_TIME, time)
  },
  decTotalTime({ commit }, time) {
    commit(types.DEC_TOTAL_TIME, time)
  },
  savePlan({ commit }, plan) {
    commit(types.SAVE_PLAN, plan);
  },
  deletePlan({ commit }, plan) {
    commit(types.DELETE_PLAN, plan)
  }
};
</code></pre>
<p>我们的<code>actions</code>其实就是去触发事件和传入参数啦</p>
<p>加了这三个文件后我们的store终于完整了，更新下我们的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/store/index.js 完整代码

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
  totalTime: 0,
  list: []
};

export default new Vuex.Store({
  state,
  mutations,
  actions
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/store/index.js 完整代码</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> mutations <span class="hljs-keyword">from</span> <span class="hljs-string">'./mutations'</span>
<span class="hljs-keyword">import</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">'./actions'</span>

Vue.use(Vuex);

<span class="hljs-keyword">const</span> state = {
  <span class="hljs-attr">totalTime</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">list</span>: []
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  state,
  mutations,
  actions
})
</code></pre>
<p><code>this.$store.dispatch('savePlan', plan)</code>当执行了这样的方法就会调用<code>actions.js</code>里的<code>savePlan</code>方法，而<code>savePlan</code>又会触发 <code>mutations</code>里的 <code>types.SAVE_PLAN</code> 最后修改数据视图更新</p>
<blockquote><p>PS：在这有个技巧就是，在<code>mutations</code>里都是用大写下划线连接，而我们的<code>actions</code>里都用小写驼峰对应。</p></blockquote>
<p>个人理解这其实就是一个发布订阅的模式</p>
<p><code>mutation-types</code> 记录我们所有的事件名</p>
<p><code>mutations</code> 注册我们各种数据变化的方法</p>
<p><code>actions</code> 则可以编写异步的逻辑或者是一些逻辑，再去<code>commit</code><br>我们的事件</p>
<p>如果有<code>getter</code> 我们可以把一些需要处理返回的数据放在这即可，不进行业务操作</p>
<p>最后别忘了在我们的<code>main.js</code>里使用我们的<code>store</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/store/main.js

import store from './store'
// ...

var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/store/main.js</span>

<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  router,
  store,
  ...App,
});</code></pre>
<p>开始体验下你自己的任务计划板吧！</p>
<h2 id="articleHeader8">最后</h2>
<p>通过本文，我们可以学习到许多关于vue的特性。</p>
<p>1.了解了vue-cli脚手架</p>
<p>2.初步对webpack有了一些了解和认识</p>
<p>3.如何用.vue愉快的开发</p>
<p>4.使用vuex进行组件通信</p>
<p>5.路由（子路由）的应用</p>
<p>6.使用 vue-devtools 观察我们的数据</p>
<hr>
<p>个人网站 ：<a href="http://www.meckodo.com" rel="nofollow noreferrer" target="_blank">http://www.meckodo.com</a><br>github地址：<a href="https://github.com/MeCKodo/vue-tutorial" rel="nofollow noreferrer" target="_blank">https://github.com/MeCKodo/vu...</a></p>
<blockquote>
<p><strong>知识都不应该是无价的，如果你有收获，请点击下方赞赏</strong></p>
<p>Have a nice day</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0构建单页应用最佳实战

## 原文链接
[https://segmentfault.com/a/1190000007630677](https://segmentfault.com/a/1190000007630677)


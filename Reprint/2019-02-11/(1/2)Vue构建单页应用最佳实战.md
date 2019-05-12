---
title: '(1/2)Vue构建单页应用最佳实战' 
date: 2019-02-11 2:30:49
hidden: true
slug: 4fhedb14h3j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>我们将会选择使用一些vue周边的库</p>
<blockquote><p>1.使用node.js后台，了解到如何获取数据<br>2.实现单页路由<br>3.实现HTTP请求我们的node<br>4.单项数据流<br>5.使用.vue文件进行开发</p></blockquote>
<p>最终我们将会构建出一个小demo，不废话，直接上图。<br><span class="img-wrap"><img data-src="/img/remote/1460000006765964" src="https://static.alili.tech/img/remote/1460000006765964" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">安装</h2>
<p>1.我们将会使用webpack去为我们的模块打包，预处理，热加载。如果你对webpack不熟悉，它就是可以帮助我们把多个js文件打包为1个入口文件，并且可以达到按需加载。这就意味着，我们不用担心由于使用太多的组件，导致了过多的HTTP请求，这是非常有益于产品体验的。但我们并不只是为了这个而使用webpack，我们需要用webpack去编译.vue文件，如果没有使用一个loader去转换我们.vue文件里的style、js和html，那么浏览器就无法识别。</p>
<p>2.模块热加载是webpack的一个非常碉堡的特性，将会为我们的单页应用带来极大的便利。<br>通常来说，当我们修改了代码刷新页面，那应用里的所有状态就都没有了。这对于开发一个单页应用来说是非常痛苦的，因为需要重新在跑一遍流程。如果有模块热加载，当你修改了代码，你的代码会直接修改，页面并不会刷新，所以状态也会被保留。</p>
<p>3.Vue也为我们提供了CSS预处理，所以我们可以选择在.vue文件里写LESS或者SASS去代替原生CSS。</p>
<p>4.我们过去通常需要使用npm下载一堆的依赖，但是现在我们可以选择Vue-cli。这是一个vue生态系统中一个伟大创举。这意味着我们不需要手动构建我们的项目，而它就可以很快地为我们生成。</p>
<p>首先，安装vue-cli。(确保你有node和npm)</p>
<p><code>npm i -g vue-cli</code></p>
<p>然后创建一个webpack项目并且下载依赖</p>
<p><code>vue init webpack vue-time-tracker</code><br><code>cd vue-time-tracker</code><br><code>npm i</code></p>
<p>接着使用 <code>npm run dev</code> 在热加载中运行我们的应用</p>
<p>这一行命令代表着它会去找到<code>package.json</code>的<code>scripts</code>对象，执行<code>node bulid/dev-server.js</code>。在这文件里，配置了Webpack，会让它去编译项目文件，并且运行服务器，我们在<code>localhost:8080</code>即可查看我们的应用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005009055" src="https://static.alili.tech/img/remote/1460000005009055" alt="" title="" style="cursor: pointer;"></span></p>
<p>这些都准备好后，我们需要为我们的路由和XHR请求下载两个库，我们可以从vue的官网中找到他们。</p>
<p><code>npm i vue-resource vue-router --save</code></p>
<h3 id="articleHeader2">初始化（main.js）</h3>
<p>查看我们的应用文件，我们可以在src目录下找到<code>App.vue</code>和<code>main.js</code>。在<code>main.js</code>文件中，我们引入<code>Vue</code>和<code>App</code>，并且创建了一个vue的实例（因为在router这行引入了App组件<code>router.start(App, '#app')</code>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js

import Vue from 'vue'
import App from './App.vue'
import Hello from './components/Hello.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

//注册两个插件
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

// 路由map
router.map({
  '/hello': {
    component: Hello
  }
})

router.redirect({
  '*': '/hello'
})

router.start(App, '#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/main.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Hello.vue'</span>

<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>

<span class="hljs-comment">//注册两个插件</span>
Vue.use(VueResource)
Vue.use(VueRouter)

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter()

<span class="hljs-comment">// 路由map</span>
router.map({
  <span class="hljs-string">'/hello'</span>: {
    <span class="hljs-attr">component</span>: Hello
  }
})

router.redirect({
  <span class="hljs-string">'*'</span>: <span class="hljs-string">'/hello'</span>
})

router.start(App, <span class="hljs-string">'#app'</span>)</code></pre>
<p>我们还需要在<code>index.html</code>包裹下我们的<code>&lt;app&gt;&lt;/app&gt;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.html

<div id=&quot;app&quot;>
    <app></app>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">//index.html

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">app</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>我们的初始化就到这结束了，接下来让我们开始创建别的组件。</p>
<h2 id="articleHeader3">创建首页 View</h2>
<p>首先，我们需要为我们的应用增加下bootstrap.css，为了方便，在这就直接在头部引入CDN。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<head>
  <meta charset=&quot;utf-8&quot;>
  <title>计划板</title>
  <link href=&quot;//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>计划板<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"//cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<p>接着在App.vue里为我们的应用写个顶部导航。</p>
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
          计划表
        </a>
        <ul class=&quot;nav navbar-nav&quot;>
          <li><a v-link=&quot;'/home'&quot;>首页</a></li>
          <li><a v-link=&quot;'/time-entries'&quot;>计划列表</a></li>
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
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/App.vue</span>

&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar navbar-default"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"navbar-brand"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glyphicon glyphicon-time"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
          计划表
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav navbar-nav"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home'"</span>&gt;</span>首页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/time-entries'"</span>&gt;</span>计划列表<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-3"</span>&gt;</span>

      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-sm-9"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>除了我们的<code>navbar</code>以外，我们还需要一个<code>.container</code>去放我们其余需要展示的信息。<br>并且在这里我们要放一个<code>router-view</code>标签，<code>vue-router</code>的切换就是通过这个标签开始显现的。</p>
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
        <a v-link=&quot;'/time-entries'&quot;>创建一个任务</a>
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
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/time-entries'"</span>&gt;</span>创建一个任务<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;</span></code></pre>
<p>既然我们需要显示Home，那就需要开始配置路由，这很简单，只需要在<code>main.js</code>里把<code>Hello.vue</code>换为<code>Home.vue</code>即可</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//...
router.map({
  '/Home': {
    component: Home
  }
})

router.redirect({
  '*': '/Home'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//...</span>
router.map({
  <span class="hljs-string">'/Home'</span>: {
    <span class="hljs-attr">component</span>: Home
  }
})

router.redirect({
  <span class="hljs-string">'*'</span>: <span class="hljs-string">'/Home'</span>
})</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005009057" src="https://static.alili.tech/img/remote/1460000005009057" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">创建 任务列表 View</h3>
<p>在这个页面，我们需要去创建我们的时间跟踪列表。</p>
<blockquote><p>PS:现在这个页面没有数据，之后我们会在后台配置</p></blockquote>
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
    //v-link 路由跳转地址
    <button
      v-if=&quot;$route.path !== '/time-entries/log-time'&quot;
      v-link=&quot;'/time-entries/log-time'&quot;
      class=&quot;btn btn-primary&quot;>
      创建
    </button>

    <div v-if=&quot;$route.path === '/time-entries/log-time'&quot;>
      <h3>创建</h3>
    </div>

    <hr>

    //下一级视图
    <router-view></router-view>

    <div class=&quot;time-entries&quot;>
      <p v-if=&quot;!timeEntries.length&quot;><strong>还没有任何任务</strong></p>

      <div class=&quot;list-group&quot;>
        //v-for 循环渲染
        <a class=&quot;list-group-item&quot; v-for=&quot;timeEntry in timeEntries&quot;>
          <div class=&quot;row&quot;>

            <div class=&quot;col-sm-2 user-details&quot;>
            //`:src`属性，这个是vue的属性绑定简写`v-bind`可以缩写为`:`
            // 比如a标签的`href`可以写为`:href`
            //并且在vue的指令里就一定不要写插值表达式了(`:src="{{"xx"}}"`)，vue自己会去解析
              <img :src=&quot;timeEntry.user.image&quot; class=&quot;avatar img-circle img-responsive&quot; />
              <p class=&quot;text-center&quot;>
                <strong>
                  "{{" timeEntry.user.name "}}"
                </strong>
              </p>
            </div>

            <div class=&quot;col-sm-2 text-center time-block&quot;>
              <h3 class=&quot;list-group-item-text total-time&quot;>
                <i class=&quot;glyphicon glyphicon-time&quot;></i>
                "{{" timeEntry.totalTime "}}"
              </h3>
              <p class=&quot;label label-primary text-center&quot;>
                <i class=&quot;glyphicon glyphicon-calendar&quot;></i>
                "{{" timeEntry.date "}}"
              </p>
            </div>

            <div class=&quot;col-sm-7 comment-section&quot;>
              <p>"{{" timeEntry.comment "}}"</p>
            </div>

            <div class=&quot;col-sm-1&quot;>
              <button
                class=&quot;btn btn-xs btn-danger delete-button&quot;
                //事件绑定简写 @xxx
                @click=&quot;deleteTimeEntry(timeEntry)&quot;>
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
    //v-link 路由跳转地址
    &lt;button
      v-if="$route.path !== '/time-entries/log-time'"
      v-link="'/time-entries/log-time'"
      class="btn btn-primary"&gt;
      创建
    &lt;/button&gt;

    &lt;div v-if="$route.path === '/time-entries/log-time'"&gt;
      &lt;h3&gt;创建&lt;/h3&gt;
    &lt;/div&gt;

    &lt;hr&gt;

    //下一级视图
    &lt;router-view&gt;&lt;/router-view&gt;

    &lt;div class="time-entries"&gt;
      &lt;p v-if="!timeEntries.length"&gt;&lt;strong&gt;还没有任何任务&lt;/strong&gt;&lt;/p&gt;

      &lt;div class="list-group"&gt;
        //v-for 循环渲染
        &lt;a class="list-group-item" v-for="timeEntry in timeEntries"&gt;
          &lt;div class="row"&gt;

            &lt;div class="col-sm-2 user-details"&gt;
            //`:src`属性，这个是vue的属性绑定简写`v-bind`可以缩写为`:`
            // 比如a标签的`href`可以写为`:href`
            //并且在vue的指令里就一定不要写插值表达式了(`:src="{{"xx"}}"`)，vue自己会去解析
              &lt;img :src="timeEntry.user.image" class="avatar img-circle img-responsive" /&gt;
              &lt;p class="text-center"&gt;
                &lt;strong&gt;
                  "{{" timeEntry.user.name "}}"
                &lt;/strong&gt;
              &lt;/p&gt;
            &lt;/div&gt;

            &lt;div class="col-sm-2 text-center time-block"&gt;
              &lt;h3 class="list-group-item-text total-time"&gt;
                &lt;i class="glyphicon glyphicon-time"&gt;&lt;/i&gt;
                "{{" timeEntry.totalTime "}}"
              &lt;/h3&gt;
              &lt;p class="label label-primary text-center"&gt;
                &lt;i class="glyphicon glyphicon-calendar"&gt;&lt;/i&gt;
                "{{" timeEntry.date "}}"
              &lt;/p&gt;
            &lt;/div&gt;

            &lt;div class="col-sm-7 comment-section"&gt;
              &lt;p&gt;"{{" timeEntry.comment "}}"&lt;/p&gt;
            &lt;/div&gt;

            &lt;div class="col-sm-1"&gt;
              &lt;button
                class="btn btn-xs btn-danger delete-button"
                //事件绑定简写 @xxx
                @click="deleteTimeEntry(timeEntry)"&gt;
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
    data () {
      // 事先模拟一个数据
      let existingEntry = {
        user: {
          name: '二哲',
          email: 'kodo@forchange.cn',
          image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
        },
        comment: '我的一个备注',
        totalTime: 1.5,
        date: '2016-05-01'
      }

      return {
        timeEntries: [existingEntry]
      }
    },
    methods: {
      deleteTimeEntry (timeEntry) {
        //这个方法用于删除某一项计划
        let index = this.timeEntries.indexOf(timeEntry)
        if (window.confirm('确定要删除吗?')) {
          this.timeEntries.splice(index, 1)
          //这里会派发到父组件上，执行父组件events里的deleteTime方法
          this.$dispatch('deleteTime', timeEntry)
        }
      }
    },
    events: {
      timeUpdate (timeEntry) {
        this.timeEntries.push(timeEntry)
        //继续向上派发
        return true
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/components/TimeEntries.vue</span>

&lt;script&gt;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-comment">// 事先模拟一个数据</span>
      <span class="hljs-keyword">let</span> existingEntry = {
        <span class="hljs-attr">user</span>: {
          <span class="hljs-attr">name</span>: <span class="hljs-string">'二哲'</span>,
          <span class="hljs-attr">email</span>: <span class="hljs-string">'kodo@forchange.cn'</span>,
          <span class="hljs-attr">image</span>: <span class="hljs-string">'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'</span>
        },
        <span class="hljs-attr">comment</span>: <span class="hljs-string">'我的一个备注'</span>,
        <span class="hljs-attr">totalTime</span>: <span class="hljs-number">1.5</span>,
        <span class="hljs-attr">date</span>: <span class="hljs-string">'2016-05-01'</span>
      }

      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">timeEntries</span>: [existingEntry]
      }
    },
    <span class="hljs-attr">methods</span>: {
      deleteTimeEntry (timeEntry) {
        <span class="hljs-comment">//这个方法用于删除某一项计划</span>
        <span class="hljs-keyword">let</span> index = <span class="hljs-keyword">this</span>.timeEntries.indexOf(timeEntry)
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.confirm(<span class="hljs-string">'确定要删除吗?'</span>)) {
          <span class="hljs-keyword">this</span>.timeEntries.splice(index, <span class="hljs-number">1</span>)
          <span class="hljs-comment">//这里会派发到父组件上，执行父组件events里的deleteTime方法</span>
          <span class="hljs-keyword">this</span>.$dispatch(<span class="hljs-string">'deleteTime'</span>, timeEntry)
        }
      }
    },
    <span class="hljs-attr">events</span>: {
      timeUpdate (timeEntry) {
        <span class="hljs-keyword">this</span>.timeEntries.push(timeEntry)
        <span class="hljs-comment">//继续向上派发</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
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
<p>由于新增了页面，所以我们继续配置我们的路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js

import TimeEntries from './components/TimeEntries.vue'

//...

router.map({
  '/home': {
    component: Home
  },
  '/time-entries': {
    component: TimeEntries
  }
})

//..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/main.js</span>

<span class="hljs-keyword">import</span> TimeEntries <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/TimeEntries.vue'</span>

<span class="hljs-comment">//...</span>

router.map({
  <span class="hljs-string">'/home'</span>: {
    <span class="hljs-attr">component</span>: Home
  },
  <span class="hljs-string">'/time-entries'</span>: {
    <span class="hljs-attr">component</span>: TimeEntries
  }
})

<span class="hljs-comment">//...</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005009059" src="https://static.alili.tech/img/remote/1460000005009059" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">创建任务组件</h2>
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
          v-model=&quot;timeEntry.date&quot;
          placeholder=&quot;Date&quot;
        />
      </div>
      <div class=&quot;col-sm-6&quot;>
        <label>时间</label>
        <input
          type=&quot;number&quot;
          class=&quot;form-control&quot;
          v-model=&quot;timeEntry.totalTime&quot;
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
          v-model=&quot;timeEntry.comment&quot;
          placeholder=&quot;Comment&quot;
        />
      </div>
    </div>
    <button class=&quot;btn btn-primary&quot; @click=&quot;save()&quot;>保存</button>
    <button v-link=&quot;'/time-entries'&quot; class=&quot;btn btn-danger&quot;>取消</button>
    <hr>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        //模拟一个默认值
        timeEntry: {
          user: {
            name: '二哲',
            email: 'kodo@forchange.cn',
            image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
          }
        }
      }
    },
    methods: {
      save () {
          let timeEntry = this.timeEntry
          this.$dispatch('timeUpdate', timeEntry)
          this.timeEntry = {}
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
          v-model="timeEntry.date"
          placeholder="Date"
        /&gt;
      &lt;/div&gt;
      &lt;div class="col-sm-6"&gt;
        &lt;label&gt;时间&lt;/label&gt;
        &lt;input
          type="number"
          class="form-control"
          v-model="timeEntry.totalTime"
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
          v-model="timeEntry.comment"
          placeholder="Comment"
        /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;button class="btn btn-primary" @click="save()"&gt;保存&lt;/button&gt;
    &lt;button v-link="'/time-entries'" class="btn btn-danger"&gt;取消&lt;/button&gt;
    &lt;hr&gt;
  &lt;/div&gt;

&lt;/template&gt;

&lt;script&gt;
  export default {
    data () {
      return {
        //模拟一个默认值
        timeEntry: {
          user: {
            name: '二哲',
            email: 'kodo@forchange.cn',
            image: 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256'
          }
        }
      }
    },
    methods: {
      save () {
          let timeEntry = this.timeEntry
          this.$dispatch('timeUpdate', timeEntry)
          this.timeEntry = {}
        }
    }
  }
&lt;/script&gt;
</code></pre>
<p>这个组件很简单就3个input输入而已，然后就两个按钮，保存我们就把数据push进我们的列表里，并且初始化我们的timeEntry。取消的话，我们就路由定位到<code>/time-entries</code>即可。</p>
<blockquote><p>ps:按理来说我们应该是要填写6个数据包括名字，邮箱和头像。但这里为了演示就暂时先这样。以后结合后台我们会继续完善这里。</p></blockquote>
<p><code>LogTime</code>属于我们<code>TimeEntries</code>组件的一个子路由，所以我们依旧需要配置下我们的<code>router.map</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js

import LogTime from './components/LogTime.vue'

//...

router.map({
  '/home': {
    component: Home
  },
  '/time-entries': {
    component: TimeEntries,
    subRoutes: {
      '/log-time': {
        component: LogTime
      }
    }
  }
})

//..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/main.js</span>

<span class="hljs-keyword">import</span> LogTime <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/LogTime.vue'</span>

<span class="hljs-comment">//...</span>

router.map({
  <span class="hljs-string">'/home'</span>: {
    <span class="hljs-attr">component</span>: Home
  },
  <span class="hljs-string">'/time-entries'</span>: {
    <span class="hljs-attr">component</span>: TimeEntries,
    <span class="hljs-attr">subRoutes</span>: {
      <span class="hljs-string">'/log-time'</span>: {
        <span class="hljs-attr">component</span>: LogTime
      }
    }
  }
})

<span class="hljs-comment">//...</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000005009061" src="https://static.alili.tech/img/remote/1460000005009061" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">创建侧边栏组件</h2>
<p>目前我们首页左侧还有一块空白，我们需要它放下一个侧边栏去统计所有计划的总时间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/App.vue

  //...

  <div class=&quot;container&quot;>
    <div class=&quot;col-sm-3&quot;>
      <sidebar :time=&quot;totalTime&quot;></sidebar>
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
      <span class="hljs-tag">&lt;<span class="hljs-name">sidebar</span> <span class="hljs-attr">:time</span>=<span class="hljs-string">"totalTime"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">sidebar</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"col-sm-9"</span>&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  &lt;<span class="hljs-regexp">/div&gt;

  /</span><span class="hljs-regexp">/...</span></code></pre>
<p>由于我们把总时间存放在最上级的父组件上，所以我们需要把我们的总时间传入我们的<code>sidebar</code>组件。</p>
<p>在写下我们的两个时间计算方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
  import Sidebar from './components/Sidebar.vue'

  export default {
    components: { 'sidebar': Sidebar },
    data () {
      return {
        totalTime: 1.5
      }
    },
    events: {
      timeUpdate (timeEntry) {
        this.totalTime += parseFloat(timeEntry.totalTime)
      },
      deleteTime (timeEntry) {
        this.totalTime -= parseFloat(timeEntry.totalTime)
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
  <span class="hljs-keyword">import</span> Sidebar <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Sidebar.vue'</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: { <span class="hljs-string">'sidebar'</span>: Sidebar },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">totalTime</span>: <span class="hljs-number">1.5</span>
      }
    },
    <span class="hljs-attr">events</span>: {
      timeUpdate (timeEntry) {
        <span class="hljs-keyword">this</span>.totalTime += <span class="hljs-built_in">parseFloat</span>(timeEntry.totalTime)
      },
      deleteTime (timeEntry) {
        <span class="hljs-keyword">this</span>.totalTime -= <span class="hljs-built_in">parseFloat</span>(timeEntry.totalTime)
      }
    }
  }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>最后给出我们<code>Sidebar.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
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
    props: ['time']
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
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
    <span class="hljs-attr">props</span>: [<span class="hljs-string">'time'</span>]
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><code>props</code>就是vue中传值的写法，不仅要在我们自定义的标签上传入<code>&lt;sidebar :time="totalTime"&gt;&lt;/sidebar&gt; </code>，还需要在组件里js里定义<code>props: ['time']</code></p>
<h2 id="articleHeader7">最后</h2>
<p>本章，我们可以学习到许多关于vue的特性。</p>
<p>1.了解了vue-cli脚手架</p>
<p>2.初步对webpack有了一些了解和认识</p>
<p>3.如何用.vue愉快的开发</p>
<p>4.父子组件通信</p>
<p>5.路由（子路由）的应用</p>
<blockquote><p>下一章，我们将会结合node学习vue-resource，更好的完善我们SPA应用</p></blockquote>
<p>github地址：<a href="https://github.com/MeCKodo/vue-tutorial" rel="nofollow noreferrer" target="_blank">https://github.com/MeCKodo/vue-tutorial</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
(1/2)Vue构建单页应用最佳实战

## 原文链接
[https://segmentfault.com/a/1190000005009052](https://segmentfault.com/a/1190000005009052)


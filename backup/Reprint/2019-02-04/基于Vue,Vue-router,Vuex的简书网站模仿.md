---
title: '基于Vue,Vue-router,Vuex的简书网站模仿' 
date: 2019-02-04 2:30:58
hidden: true
slug: oi826qc0kn
categories: [reprint]
---

{{< raw >}}

                    
<p>在这个教程里面，我会通过一系列的代码和图片来学习怎么使用vue-router,以及vuex。本文假设读者手里有关于vue-router和Vuex的文档，并且对Vue-router和Vuex有一定的了解。<br>  没有文档也没关系,我这里有关于 <a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">Vue-router文档</a>以及<a href="https://segmentfault.com/a/1190000005015164">Vuex介绍</a>，可以配合本文进行学习。由于才开始学习Vue，如有不当<br>之处，还请大家帮我斧正！！</p>
<p>首先看下这个网站的截图<br><span class="img-wrap"><img data-src="/img/bVCV9v?w=1840&amp;h=1053" src="https://static.alili.tech/img/bVCV9v?w=1840&amp;h=1053" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这里是网站的源码下载地址 <a href="https://github.com/Mrjeff578575/Vue-demo-jianshu" rel="nofollow noreferrer" target="_blank">Github Repo</a> <br>部分代码已经更新为2.0 <a href="https://github.com/Mrjeff578575/JianshuVue2.0" rel="nofollow noreferrer" target="_blank">JianshuVue2</a><br>代码已经具有React版本 <a href="https://github.com/Mrjeff578575/ReactJianShu" rel="nofollow noreferrer" target="_blank">JianshuByReact</a><br>这里是<a href="https://mrjeff578575.github.io/Vue-demo/" rel="nofollow noreferrer" target="_blank">Demo</a>地址，在线感受vue的魅力</p>
<h2 id="articleHeader0">搭建项目</h2>
<h3 id="articleHeader1">项目结构</h3>
<p>本项目才用Vue-cli脚手架自动生成，这是一个Vue生态系统中一个伟大创举。这意味着我们不需要手动构建我们的项目，而它就可以很快地为我们生成。如图所示：<br><span class="img-wrap"><img data-src="/img/bVCXus?w=247&amp;h=538" src="https://static.alili.tech/img/bVCXus?w=247&amp;h=538" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<strong>components</strong>:包含所有的页面组件</li>
<li>
<strong>vuex</strong>:包含vuex相关文件（action.js, store.js）</li>
<li>
<strong>static</strong>:静态文件存放（图片和图标库等）</li>
<li>
<strong>index.html</strong>：渲染的页面</li>
<li>
<strong>main.js</strong>:应用入口点，包含根实例</li>
<li>
<strong>App.vue</strong>：主页面组件</li>
</ul>
<h3 id="articleHeader2">项目流程：</h3>
<ul><li>安装Vue-cli(要有node与npm)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -g vue-cli</code></pre>
<ul><li>创建一个webpack项目，并且下载依赖</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack vue-demo-jianshu
cd vue-demo-jianshu
npm i" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>vue init webpack vue-<span class="hljs-built_in">demo</span>-jianshu
cd vue-<span class="hljs-built_in">demo</span>-jianshu
npm i</code></pre>
<ul><li>安装Vue-router和Vuex</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router vuex --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> vue-router vuex <span class="hljs-comment">--save</span></code></pre>
<ul><li>热加载打开页面(生产的时候运行<code>npm run build</code>)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>项目的框架已经搭建好了，接下来就是为项目添砖加瓦。</p>
<h2 id="articleHeader3">添砖加瓦第一步（初始化main.js与App.vue）</h2>
<p><strong>首先分析页面结构</strong>（专题页面结构和首页一样，就不在单独赘述了，写到哪儿分析到哪儿）<br><span class="img-wrap"><img data-src="/img/bVCXE7?w=1840&amp;h=1053" src="https://static.alili.tech/img/bVCXE7?w=1840&amp;h=1053" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>
<strong>App.vue</strong>: 绿色框内的和黄色框内的就是每个页面都存在的，故写在App.vue里</li>
<li>
<strong>home.vue</strong>: 紫色区域部分，由于文章区内文章会进行变化，故把文章区域单独写成组件</li>
<li>
<strong>Article.vue</strong>: 棕色框部分</li>
</ul>
<h3 id="articleHeader4">main.js部分</h3>
<p>在main.js中我们引入<code>Vue</code>,<code>App</code>,<code>Vue-router</code>,并且创建了一个Vue的实例（因为在router这行引入了App组件router.start(App, '#app')，上main.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import home from './components/Home.vue'
import topic from './components/Topic.vue'
import article from './components/Article.vue'
import bonus from './components/Bonus.vue'
import login from './components/Login.vue'
import topic_article from './components/Topic_article.vue'

//注册VueRouter这个插件
Vue.use(VueRouter)

const router = new VueRouter()

//路由map
router.map({
    '/home': {
        component: home,
        subRoutes: {
            '/article': {
                component: article
            }
        }
    },
    '/topic': {
        component: topic,
        subRoutes: {
            'topic_article': {
                component: topic_article
            }
        }
    },
    '/bonus': {
        component: bonus
    },
    '/login': {
        component: login
    }
})
//路由重定向(访问不存在的页面时，重定向到这个页面)
router.redirect({
    '*':'/home/article'
})

router.start(App,'app')//启动一个启用了路由的应用。创建一个 App 的实例并且挂载到元素 'app'
router.go('/home/article')//为了让页面打开的时候能看见文章，我把它导航到新路由" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>

<span class="hljs-keyword">import</span> home <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Home.vue'</span>
<span class="hljs-keyword">import</span> topic <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Topic.vue'</span>
<span class="hljs-keyword">import</span> article <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Article.vue'</span>
<span class="hljs-keyword">import</span> bonus <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Bonus.vue'</span>
<span class="hljs-keyword">import</span> login <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Login.vue'</span>
<span class="hljs-keyword">import</span> topic_article <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Topic_article.vue'</span>

<span class="hljs-comment">//注册VueRouter这个插件</span>
Vue.use(VueRouter)

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter()

<span class="hljs-comment">//路由map</span>
router.map({
    <span class="hljs-string">'/home'</span>: {
        <span class="hljs-attr">component</span>: home,
        <span class="hljs-attr">subRoutes</span>: {
            <span class="hljs-string">'/article'</span>: {
                <span class="hljs-attr">component</span>: article
            }
        }
    },
    <span class="hljs-string">'/topic'</span>: {
        <span class="hljs-attr">component</span>: topic,
        <span class="hljs-attr">subRoutes</span>: {
            <span class="hljs-string">'topic_article'</span>: {
                <span class="hljs-attr">component</span>: topic_article
            }
        }
    },
    <span class="hljs-string">'/bonus'</span>: {
        <span class="hljs-attr">component</span>: bonus
    },
    <span class="hljs-string">'/login'</span>: {
        <span class="hljs-attr">component</span>: login
    }
})
<span class="hljs-comment">//路由重定向(访问不存在的页面时，重定向到这个页面)</span>
router.redirect({
    <span class="hljs-string">'*'</span>:<span class="hljs-string">'/home/article'</span>
})

router.start(App,<span class="hljs-string">'app'</span>)<span class="hljs-comment">//启动一个启用了路由的应用。创建一个 App 的实例并且挂载到元素 'app'</span>
router.go(<span class="hljs-string">'/home/article'</span>)<span class="hljs-comment">//为了让页面打开的时候能看见文章，我把它导航到新路由</span></code></pre>
<h3 id="articleHeader5">App.vue部分</h3>
<p>App.vue里面我们把两个侧边栏（绿色框和黄色框）写在这里边，因为这两个总是一直存在的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div class=&quot;container&quot;>
  <div class=&quot;sidebar&quot;>
    <ul class=&quot;dropdown&quot;>
      <li :class=&quot;{active: show === 'home'}&quot;>
        <a @click=&quot;show = 'home'&quot; v-link=&quot;'/home/article'&quot;><i class=&quot;fa fa-home&quot;></i><span>&amp;nbsp;&amp;nbsp;首页</span></a>
      </li>
      <li :class=&quot;{active: show === 'topic'}&quot;>
        <a @click=&quot;show = 'topic'&quot; v-link=&quot;'/topic/topic_article'&quot;><i class=&quot;fa fa-th&quot;></i><span>&amp;nbsp;&amp;nbsp;专题</span></a>
      </li>
      <li><a href=&quot;#&quot;><i class=&quot;fa fa-mobile&quot;></i><span>&amp;nbsp;&amp;nbsp;下载手机应用</span></a></li>
    </ul>
    <ul class=&quot;nav-user&quot;>
      <li><a href=&quot;&quot;><i class=&quot;fa fa-font&quot;></i><span>&amp;nbsp;&amp;nbsp;显示模式</span></a></li>
      <li><a v-link=&quot;'/login'&quot;><i class=&quot;fa fa-sign-in&quot;></i><span>&amp;nbsp;&amp;nbsp;登录</span></a></li>
    </ul>
  </div>
  <div class=&quot;home&quot;>
    <router-view transition = 'display' transition-mode = 'out-in'></router-view>
  </div>
  <div class=&quot;rightbar&quot;>
    <nav>
      <a v-link=&quot;'/login'&quot;><i class=&quot;fa fa-sign-in&quot;></i>登录</a>
      <a href=&quot;#&quot;><i class=&quot;fa fa-user&quot;></i>注册</a>
    </nav>
  </div>
</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"sidebar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"dropdown"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'home'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'home'"</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-home"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;nbsp;&amp;nbsp;首页<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'topic'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'topic'"</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/topic/topic_article'"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-th"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;nbsp;&amp;nbsp;专题<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-mobile"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;nbsp;&amp;nbsp;下载手机应用<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-user"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-font"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;nbsp;&amp;nbsp;显示模式<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/login'"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-sign-in"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>&amp;nbsp;&amp;nbsp;登录<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"home"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">transition</span> = <span class="hljs-string">'display'</span> <span class="hljs-attr">transition-mode</span> = <span class="hljs-string">'out-in'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"rightbar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/login'"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-sign-in"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>登录<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-user"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>注册<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<h2 id="articleHeader6">添砖加瓦第二步（home.vue和article.vue）</h2>
<h3 id="articleHeader7">home.vue部分</h3>
<p>先讲home.vue，home.vue里面要放紫色框内（除了棕色框）的内容，分析这个界面紫色框内的左侧边栏是不变的，故可以写死，顶部导航也是不变的，也写死。关键就是在中部导航栏（热门，新上榜那块），棕色框内的内容会根据中部导航栏选中不同内容进行改变。那么该怎么实现这个呢？</p>
<p>首先写好需要写死的地方，如下图代码所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>
    <div class=&quot;showbar&quot;>
        <div class=&quot;cover-image&quot;></div>
        <div class=&quot;text&quot; style=&quot;text-shadow:1px 1px 1px #000000&quot;>
            <h1>简书</h1>
            <h3>交流故事，沟通想法</h3>
            <p>一个基于内容分享的社区</p>
            <a href=&quot;#&quot;><i class=&quot;fa fa-home&quot;></i>提笔写篇文章</a>
        </div>
    </div>
    <div class=&quot;article-page&quot;>
        <nav>
            <span class=&quot;nav-text fir&quot;><a href=&quot;#&quot;>发现</a></span>
            <span class=&quot;nav-text&quot;><a v-link=&quot;'../bonus'&quot;>2015精选</a></span>
            <span class=&quot;search clearfloat&quot;>
                <span class=&quot;input&quot;>
                    <input type=&quot;search&quot; placeholder=&quot;搜索&quot;>
                </span>
                <span class=&quot;search-icon&quot;><i class=&quot;fa fa-search&quot;></i></span>
            </span>                    
        </nav>
        <div class=&quot;article-list&quot;>
            <ul class=&quot;btn-group&quot;>
                <li :class=&quot;{active: show === 'hot'}&quot;>
                    <a @click=&quot;displayArticle('hot')&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >热门</a></li>
                <li :class=&quot;{active: show === 'new'}&quot;>
                    <a @click=&quot;displayArticle('new')&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >新上榜</a></li>
                <li :class=&quot;{active: show === 'daily'}&quot;>
                    <a @click=&quot;displayArticle('daily')&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >日报</a></li>
                <li :class=&quot;{active: show === 'weekhot'}&quot;>
                    <a @click=&quot;show = 'weekhot'&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >七日热门</a></li>
                <li :class=&quot;{active: show === 'monthhot'}&quot;>
                    <a @click=&quot;show = 'monthhot'&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >三十日热门</a></li>
                <li :class=&quot;{active: show === 'reward'}&quot;>
                    <a @click=&quot;show = 'reward'&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >有奖活动</a></li>
                <li :class=&quot;{active: show === 'publish'}&quot;>
                    <a @click=&quot;show = 'publish'&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >简书出版</a></li>
                <li :class=&quot;{active: show === 'video'}&quot;>
                    <a @click=&quot;show = 'vedio'&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >简书播客</a></li>
                <li :class=&quot;{active: show === 'hotnews'}&quot;>
                    <a @click=&quot;show = 'hotnews'&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >时事热闻</a></li>
                <li :class=&quot;{active: show === 'choice'}&quot;>
                    <a @click=&quot;show = 'choice'&quot;
                       v-link=&quot;'/home/article'&quot; 
                    >专题精选</a></li>

            </ul>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"showbar"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cover-image"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"text-shadow:1px 1px 1px #000000"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>简书<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>交流故事，沟通想法<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>一个基于内容分享的社区<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-home"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>提笔写篇文章<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"article-page"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-text fir"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span>发现<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"nav-text"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'../bonus'"</span>&gt;</span>2015精选<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search clearfloat"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"搜索"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search-icon"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fa fa-search"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>                    
        <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"article-list"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-group"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'hot'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"displayArticle('hot')"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>热门<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'new'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"displayArticle('new')"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>新上榜<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'daily'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"displayArticle('daily')"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>日报<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'weekhot'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'weekhot'"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>七日热门<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'monthhot'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'monthhot'"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>三十日热门<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'reward'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'reward'"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>有奖活动<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'publish'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'publish'"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>简书出版<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'video'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'vedio'"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>简书播客<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'hotnews'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'hotnews'"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>时事热闻<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">{active: show === 'choice'}</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"show = 'choice'"</span>
                       <span class="hljs-attr">v-link</span>=<span class="hljs-string">"'/home/article'"</span> 
                    &gt;</span>专题精选<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>

            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<p>不知道你看懂代码了没，没看懂不要紧，我来给你讲解，重点分析导航栏部分，为了让导航栏标签被选中时改变背景色，这里我使用了:class="{active: show === 'hot'}" ,这是vue里v-bind:class的简写，如果你问我show从哪里来，我会告诉你show从天上来，哈哈，不开玩笑，show的来源也就是今天的另一个重点Vuex。看代码：<br>首先是store.js(我的理解是管理数据和操作数据的地方)</p>
<h3 id="articleHeader8">store.js部分</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    articles:{
        fir: {
            author:'徐丹妮',
            title:'我不是学霸，只是比你努力一点而已',
            time:'大约6小时之前',
            read:'8498',
            comment:'248',
            like:'2342',
            pay:'2',
            src:'url(../../static/vue-demo-hot.jpg)'
        },
        sec: {
            author:'共央君',
            title:'爱美的女生们，六款超高性价比的变美神器你都有了吗？',
            time:'大约8小时之前',
            read:'2623',
            comment:'34',
            like:'191',
            pay:'2',
            src:'url(../../static/vue-demo-hot_1.jpg)'
        },
        thi: {
            author:'姜肥东',
            title:'毕业9年，我才学懂的道理',
            time:'大约6天之前',
            read:'6498',
            comment:'38',
            like:'242',
            pay:'2',
            src:'url(../../static/vue-demo-hot_2.jpg)'
        }
    },
    show:'hot'
}
const mutations = {
    DISPLAY_ARTICLE (state, show) {
        const article = {
            hot: {
                fir: {
                    author:'徐丹妮',
                    title:'我不是学霸，只是比你努力一点而已',
                    time:'大约6小时之前',
                    read:'8498',
                    comment:'248',
                    like:'2342',
                    pay:'2',
                    src:'url(../../static/vue-demo-hot.jpg)'
                },
                sec: {
                    author:'共央君',
                    title:'爱美的女生们，六款超高性价比的变美神器你都有了吗？',
                    time:'大约8小时之前',
                    read:'2623',
                    comment:'34',
                    like:'191',
                    pay:'2',
                    src:'url(../../static/vue-demo-hot_1.jpg)'
                },
                thi: {
                    author:'姜肥东',
                    title:'毕业9年，我才学懂的道理',
                    time:'大约6天之前',
                    read:'6498',
                    comment:'38',
                    like:'242',
                    pay:'2',
                    src:'url(../../static/vue-demo-hot_2.jpg)'
                }
            },
            new: {
                fir: {
                    author:'阿俊',
                    title:'Learn by doing',
                    time:'大约6小时之前',
                    read:'3398',
                    comment:'258',
                    like:'232',
                    pay:'88',
                    src:'url(../../static/vue-demo-new.jpg)'    
                },
                sec: {
                    author:'阿猫',
                    title:'Learn by doing',
                    time:'大约6小时之前',
                    read:'3398',
                    comment:'258',
                    like:'232',
                    pay:'88',
                    src:'url(../../static/vue-demo-new.jpg)'    
                },
                thi: {
                    author:'阿狗',
                    title:'Learn by doing',
                    time:'大约6小时之前',
                    read:'3398',
                    comment:'258',
                    like:'232',
                    pay:'88',
                    src:'url(../../static/vue-demo-new.jpg)'    
                }
            },
            daily:{
                fir: {
                    author:'尸叔',
                    title:'如何让你的自拍，惊爆朋友圈？看我是怎么设计的',
                    time:'大约2小时之前',
                    read:'3750',
                    comment:'70',
                    like:'190',
                    pay:'0',
                    src:'../../static/vue-demo-daily.jpg'                    
                },
                sec: {
                    author:'尸爸',
                    title:'如何让你的自拍，惊爆朋友圈？看我是怎么设计的',
                    time:'大约2小时之前',
                    read:'3750',
                    comment:'70',
                    like:'190',
                    pay:'0',
                    src:'../../static/vue-demo-daily.jpg'
                },
                thi: {
                    author:'尸姐',
                    title:'如何让你的自拍，惊爆朋友圈？看我是怎么设计的',
                    time:'大约2小时之前',
                    read:'3750',
                    comment:'70',
                    like:'190',
                    pay:'0',
                    src:'../../static/vue-demo-daily.jpg'
                }
            }
        }
        state.show = show
        state.articles = article[show]
    }
}
export default new Vuex.Store({
    state,
    mutations
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>import Vue from <span class="hljs-string">'vue'</span>
import Vuex from <span class="hljs-string">'vuex'</span>

Vue.use(Vuex)

const state = {
    article<span class="hljs-variable">s:</span>{
        <span class="hljs-keyword">fir</span>: {
            author:<span class="hljs-string">'徐丹妮'</span>,
            title:<span class="hljs-string">'我不是学霸，只是比你努力一点而已'</span>,
            time:<span class="hljs-string">'大约6小时之前'</span>,
            <span class="hljs-keyword">read</span>:<span class="hljs-string">'8498'</span>,
            commen<span class="hljs-variable">t:</span><span class="hljs-string">'248'</span>,
            like:<span class="hljs-string">'2342'</span>,
            pay:<span class="hljs-string">'2'</span>,
            src:<span class="hljs-string">'url(../../static/vue-demo-hot.jpg)'</span>
        },
        sec: {
            author:<span class="hljs-string">'共央君'</span>,
            title:<span class="hljs-string">'爱美的女生们，六款超高性价比的变美神器你都有了吗？'</span>,
            time:<span class="hljs-string">'大约8小时之前'</span>,
            <span class="hljs-keyword">read</span>:<span class="hljs-string">'2623'</span>,
            commen<span class="hljs-variable">t:</span><span class="hljs-string">'34'</span>,
            like:<span class="hljs-string">'191'</span>,
            pay:<span class="hljs-string">'2'</span>,
            src:<span class="hljs-string">'url(../../static/vue-demo-hot_1.jpg)'</span>
        },
        thi: {
            author:<span class="hljs-string">'姜肥东'</span>,
            title:<span class="hljs-string">'毕业9年，我才学懂的道理'</span>,
            time:<span class="hljs-string">'大约6天之前'</span>,
            <span class="hljs-keyword">read</span>:<span class="hljs-string">'6498'</span>,
            commen<span class="hljs-variable">t:</span><span class="hljs-string">'38'</span>,
            like:<span class="hljs-string">'242'</span>,
            pay:<span class="hljs-string">'2'</span>,
            src:<span class="hljs-string">'url(../../static/vue-demo-hot_2.jpg)'</span>
        }
    },
    sho<span class="hljs-variable">w:</span><span class="hljs-string">'hot'</span>
}
const mutations = {
    DISPLAY_ARTICLE (state, show) {
        const article = {
            ho<span class="hljs-variable">t:</span> {
                <span class="hljs-keyword">fir</span>: {
                    author:<span class="hljs-string">'徐丹妮'</span>,
                    title:<span class="hljs-string">'我不是学霸，只是比你努力一点而已'</span>,
                    time:<span class="hljs-string">'大约6小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'8498'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'248'</span>,
                    like:<span class="hljs-string">'2342'</span>,
                    pay:<span class="hljs-string">'2'</span>,
                    src:<span class="hljs-string">'url(../../static/vue-demo-hot.jpg)'</span>
                },
                sec: {
                    author:<span class="hljs-string">'共央君'</span>,
                    title:<span class="hljs-string">'爱美的女生们，六款超高性价比的变美神器你都有了吗？'</span>,
                    time:<span class="hljs-string">'大约8小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'2623'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'34'</span>,
                    like:<span class="hljs-string">'191'</span>,
                    pay:<span class="hljs-string">'2'</span>,
                    src:<span class="hljs-string">'url(../../static/vue-demo-hot_1.jpg)'</span>
                },
                thi: {
                    author:<span class="hljs-string">'姜肥东'</span>,
                    title:<span class="hljs-string">'毕业9年，我才学懂的道理'</span>,
                    time:<span class="hljs-string">'大约6天之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'6498'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'38'</span>,
                    like:<span class="hljs-string">'242'</span>,
                    pay:<span class="hljs-string">'2'</span>,
                    src:<span class="hljs-string">'url(../../static/vue-demo-hot_2.jpg)'</span>
                }
            },
            ne<span class="hljs-variable">w:</span> {
                <span class="hljs-keyword">fir</span>: {
                    author:<span class="hljs-string">'阿俊'</span>,
                    title:<span class="hljs-string">'Learn by doing'</span>,
                    time:<span class="hljs-string">'大约6小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'3398'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'258'</span>,
                    like:<span class="hljs-string">'232'</span>,
                    pay:<span class="hljs-string">'88'</span>,
                    src:<span class="hljs-string">'url(../../static/vue-demo-new.jpg)'</span>    
                },
                sec: {
                    author:<span class="hljs-string">'阿猫'</span>,
                    title:<span class="hljs-string">'Learn by doing'</span>,
                    time:<span class="hljs-string">'大约6小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'3398'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'258'</span>,
                    like:<span class="hljs-string">'232'</span>,
                    pay:<span class="hljs-string">'88'</span>,
                    src:<span class="hljs-string">'url(../../static/vue-demo-new.jpg)'</span>    
                },
                thi: {
                    author:<span class="hljs-string">'阿狗'</span>,
                    title:<span class="hljs-string">'Learn by doing'</span>,
                    time:<span class="hljs-string">'大约6小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'3398'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'258'</span>,
                    like:<span class="hljs-string">'232'</span>,
                    pay:<span class="hljs-string">'88'</span>,
                    src:<span class="hljs-string">'url(../../static/vue-demo-new.jpg)'</span>    
                }
            },
            daily:{
                <span class="hljs-keyword">fir</span>: {
                    author:<span class="hljs-string">'尸叔'</span>,
                    title:<span class="hljs-string">'如何让你的自拍，惊爆朋友圈？看我是怎么设计的'</span>,
                    time:<span class="hljs-string">'大约2小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'3750'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'70'</span>,
                    like:<span class="hljs-string">'190'</span>,
                    pay:<span class="hljs-string">'0'</span>,
                    src:<span class="hljs-string">'../../static/vue-demo-daily.jpg'</span>                    
                },
                sec: {
                    author:<span class="hljs-string">'尸爸'</span>,
                    title:<span class="hljs-string">'如何让你的自拍，惊爆朋友圈？看我是怎么设计的'</span>,
                    time:<span class="hljs-string">'大约2小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'3750'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'70'</span>,
                    like:<span class="hljs-string">'190'</span>,
                    pay:<span class="hljs-string">'0'</span>,
                    src:<span class="hljs-string">'../../static/vue-demo-daily.jpg'</span>
                },
                thi: {
                    author:<span class="hljs-string">'尸姐'</span>,
                    title:<span class="hljs-string">'如何让你的自拍，惊爆朋友圈？看我是怎么设计的'</span>,
                    time:<span class="hljs-string">'大约2小时之前'</span>,
                    <span class="hljs-keyword">read</span>:<span class="hljs-string">'3750'</span>,
                    commen<span class="hljs-variable">t:</span><span class="hljs-string">'70'</span>,
                    like:<span class="hljs-string">'190'</span>,
                    pay:<span class="hljs-string">'0'</span>,
                    src:<span class="hljs-string">'../../static/vue-demo-daily.jpg'</span>
                }
            }
        }
        state.show = show
        state.articles = article[show]
    }
}
export default <span class="hljs-keyword">new</span> Vuex.Store({
    state,
    mutations
})</code></pre>
<h3 id="articleHeader9">getters获取数据</h3>
<p>这里面我采用的是模拟数据的方式（一个人没有后台 QAQ），可以看到show来自于state,我们在home.vue页面通过vuex的getters来获取数据show，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { displayArticle} from '../vuex/actions'
export default{
    vuex: {
        getters: {
            show: state => state.show
        },
        actions: {
            displayArticle
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import { displayArticle} <span class="hljs-keyword">from</span> '../vuex/actions'
export <span class="hljs-keyword">default</span>{
    vuex: {
        getters: {
            show: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.show
        },
        actions: {
            displayArticle
        }
    }
}</code></pre>
<h3 id="articleHeader10">actions.js部分</h3>
<p>在这里还引入一个action,它是做什么的呢？你答对了，这个displayArticle是用来分发事件的函数，它将更换文章区域内容的事件dispatch出去，然后在store.js里面完成内容的更换，下面是actions.js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const displayArticle = ({ dispatch },show) => {
    dispatch('DISPLAY_ARTICLE',show)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">export</span> const displayArticle = <span class="hljs-function"><span class="hljs-params">({ dispatch },show)</span> =&gt;</span> {
    dispatch(<span class="hljs-string">'DISPLAY_ARTICLE'</span>,show)
}</code></pre>
<p>是不是感觉vuex很简单。中部导航栏我只给前三个弄了正确的点击事件，如需体验更多效果，自己动手，丰衣足食！！233<br>接下来是文章区域（棕色框部分）的代码：</p>
<h3 id="articleHeader11">Article.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <ul>
        <li class='list' v-for=&quot;article in articles&quot;>
            <p class=&quot;list-top&quot;><a href=&quot;#&quot; class=&quot;author&quot;><span>"{{" article.author "}}"</span></a><span class=&quot;time&quot;> - "{{" article.time"}}"</span></p>
            <h2 class=&quot;title&quot;><a href=&quot;#&quot;>"{{" article.title "}}"</a></h2>
            <span class=&quot;small-text&quot;>阅读 "{{"article.read"}}" -</span>
            <span class=&quot;small-text&quot;>评论 "{{"article.comment"}}" -</span>
            <span class=&quot;small-text&quot;>喜欢 "{{"article.like"}}" -</span>
            <span class=&quot;small-text&quot;>打赏 "{{"article.pay"}}"</span>
            <span class=&quot;image&quot; 
                :style=&quot;{background:article.src,backgroundSize:'100%',backgroundRepeat:'no-repat'}&quot;>
            </span>
        </li>
    </ul>
</template>
<script>
    export default {
        vuex: {
            getters: {
                articles: state => state.articles
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'list'</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"article in articles"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-top"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"author"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{" article.author "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"time"</span>&gt;</span> - </span><span class="hljs-template-variable">"{{" article.time"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span></span><span class="hljs-template-variable">"{{" article.title "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"small-text"</span>&gt;</span>阅读 </span><span class="hljs-template-variable">"{{"article.read"}}"</span><span class="xml"> -<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"small-text"</span>&gt;</span>评论 </span><span class="hljs-template-variable">"{{"article.comment"}}"</span><span class="xml"> -<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"small-text"</span>&gt;</span>喜欢 </span><span class="hljs-template-variable">"{{"article.like"}}"</span><span class="xml"> -<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"small-text"</span>&gt;</span>打赏 </span><span class="hljs-template-variable">"{{"article.pay"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"image"</span> 
                <span class="hljs-attr">:style</span>=<span class="hljs-string">"{background:article.src,backgroundSize:'100%',backgroundRepeat:'no-repat'}"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">vuex</span>: {
            <span class="hljs-attr">getters</span>: {
                <span class="hljs-attr">articles</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.articles
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>Article.vue和home.vue里获取数据的方式一样,由于未知文章数量，这里采用vue的列表渲染（是不是感觉很方便，有了vue,妈妈再也不用担心我的学习啦）。简书的首页到这里就写完成了，由于电脑越写越卡，这篇就先发了，接下来开第二篇文章，简书的专题页面和推荐页面，如果你发现本文章的错误之除，还请您斧正。<br>参考文章：<a href="https://segmentfault.com/a/1190000005015164">用 Vuex 构建一个笔记应用</a>     <a href="http://www.imooc.com/article/6991Vue" rel="nofollow noreferrer" target="_blank">Vue构建单页应用最佳实战 </a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Vue,Vue-router,Vuex的简书网站模仿

## 原文链接
[https://segmentfault.com/a/1190000006864281](https://segmentfault.com/a/1190000006864281)


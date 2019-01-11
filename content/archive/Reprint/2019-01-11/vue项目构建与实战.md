---
title: 'vue项目构建与实战' 
date: 2019-01-11 2:30:07
hidden: true
slug: 11jwxjgd200b
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">关于</h2>
<ul>
<li><p>微信公众号：前端呼啦圈（Love-FED）</p></li>
<li><p>我的博客：<a href="http://www.cnblogs.com/luozhihao" rel="nofollow noreferrer" target="_blank">劳卜的博客</a></p></li>
<li><p>知乎专栏：<a href="https://zhuanlan.zhihu.com/font-end" rel="nofollow noreferrer" target="_blank">前端呼啦圈</a></p></li>
</ul>
<h2 id="articleHeader1">前言</h2>
<p>由于vue相对来说比较平缓的学习过程和新颖的技术思路，使其受到了广大前后端开发者的青睐，同时其通俗易懂的API和数据绑定的功能也为其揽获了不少用户。本文主要讲解vue项目的构建与实战，因此不会太多涉及其API和语法部分，旨在帮助vue的入门级用户了解从零开始构建vue项目的步骤和方法。</p>
<h2 id="articleHeader2">vue项目分类</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009943449?w=628&amp;h=461" src="https://static.alili.tech/img/remote/1460000009943449?w=628&amp;h=461" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>首先，在构建一个vue项目之前我们需要了解vue项目的分类，这里我主要将其分为两类：（1）直接引入vue.js文件 （2）使用vue单文件组件</p>
<p>按以上两类来看，直接引入vue.js文件就像页面中直接引入jQuery一样，这样的项目存在很多缺陷，只能使用一些基础的API和局限的功能，一般主要用于初级用户和小型项目。本文主要讲解第二种使用vue但文件组件构建的vue项目。</p>
<h2 id="articleHeader3">构建方式</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009943450?w=628&amp;h=273" src="https://static.alili.tech/img/remote/1460000009943450?w=628&amp;h=273" alt="" title="" style="cursor: pointer;"></span></p>
<p>构建一个vue项目存在着多种方式，首先我们需要用到相应的构建工具。官方推荐的构建工具主要有webpack和browserify，这里我更推荐大家使用webpack进行构建。同时除了构建工具，我们还需要用到构建方法，比如我们可以使用vue-cli脚手架来自动生成vue项目的基础目录文件，当然我们也可以从零开始进行自定义构建。</p>
<h2 id="articleHeader4">vue-cli构建</h2>
<p>如果你使用vue-cli脚手架来构建vue项目，那么你只需敲击下面5行命令即可生成一个简单的vue项目（前提安装node.js）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">vue init webpack <span class="hljs-keyword">my</span>-project</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">cd <span class="hljs-keyword">my</span>-project</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>如此一个基础的vue项目目录就自动会展现在你面前，我们可以来看一下其自动生成的基础文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build // webpack/node配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config // 环境配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── node_modules // npm包文件
├── src // 静态资源文件
│   ├── assets
│   │    └── logo.png
│   ├── components 
│   │    └── Hello.vue 
│   ├── router
│   │    └── index.js 
│   ├── App.vue 
│   └── main.js
├── static
├── .babelrc // babel配置文件
├── .gitignore // gitignore忽略文件
├── .editorconfig // 编码风格配置文件
├── .postcssrc.js // postcss配置文件
├── package.json // node包管理文件
├── index.html // 首页模板
├── package.json // 包管理文件
└── README.md // 描述文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">├── build // webpack/node配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config // 环境配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── node_modules // npm包文件
├── src // 静态资源文件
│   ├── assets
│   │    └── logo.png
│   ├── components 
│   │    └── Hello.vue 
│   ├── router
│   │    └── index.js 
│   ├── App.vue 
│   └── main.js
├── static
├── .babelrc // babel配置文件
├── .gitignore // gitignore忽略文件
├── .editorconfig // 编码风格配置文件
├── .postcssrc.js // postcss配置文件
├── package.json // node包管理文件
├── index.html // 首页模板
├── package.json // 包管理文件
└── README.md // 描述文件</code></pre>
<p>这样的构建方式其实并不适用于所有项目，很多文件你的项目可能都不会用到，并且如果你对自动生成的文件一无所知，那么后期维护起来也会非常的吃力。所以这里不推荐新手使用vue-cli构建，而是推荐大家参考vue-cli生成的文件从零开始构建一个vue项目。</p>
<h2 id="articleHeader5">自定义构建</h2>
<p>相比vue-cli构建，自定义构建就显得灵活得多，但是它需要你了解构建的步骤和原理，要求也就随之提高了。自定义构建分为以下几步：</p>
<ul>
<li><p>文件/文件夹创建</p></li>
<li><p>package.json文件创建</p></li>
<li><p>webpack配置文件创建</p></li>
<li><p>入口文件创建</p></li>
<li><p>vue组件编写</p></li>
<li><p>路由配置</p></li>
</ul>
<h3 id="articleHeader6">1. 文件/文件夹创建</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009943451?w=628&amp;h=323" src="https://static.alili.tech/img/remote/1460000009943451?w=628&amp;h=323" alt="" title="" style="cursor: pointer;"></span></p>
<p>按照上方的图示，我们需要从零开始创建以上文件和文件夹，每一个文件都有其自己的用途。</p>
<h3 id="articleHeader7">2. package.json文件</h3>
<p>使用下方命令，我们可以快速创建一个package.json文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init -y</code></pre>
<p>然后修改其scripts配置项，添加打包压缩命令，并且增加dependencies依赖项，添加项目相应依赖，这里我们主要依赖了vue和vue-router（完整package.json配置文件见最后实例源码）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

&quot;scripts&quot;: {
    &quot;build&quot;: &quot;rimraf dist &amp;&amp; cross-env NODE_ENV=prod&amp;&amp;webpack -p --config ./webpack.config.js&quot;
},
&quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.3.4&quot;,
    &quot;vue-router&quot;: &quot;^2.5.3&quot;
}

..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">...

<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"rimraf dist &amp;&amp; cross-env NODE_ENV=prod&amp;&amp;webpack -p --config ./webpack.config.js"</span>
},
<span class="hljs-string">"dependencies"</span>: {
    <span class="hljs-attr">"vue"</span>: <span class="hljs-string">"^2.3.4"</span>,
    <span class="hljs-attr">"vue-router"</span>: <span class="hljs-string">"^2.5.3"</span>
}

...</code></pre>
<h3 id="articleHeader8">3. webpack配置文件</h3>
<p>其次我们需要创建我们的webpack配置文件，这里和构建其他项目不同的是，vue单文件组件需要使用vue-loader加载器进行加载，同时使用babel-loader进行ES6语法的转换（完整 webpack 配置文件见最后实例源码）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
...

module: {
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
        }，
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },
    ]
},

...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
...

module: {
    <span class="hljs-attr">rules</span>: [
        {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.vue$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'vue-loader'</span>,
        }，
        {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>
        },
    ]
},

...
}</code></pre>
<h3 id="articleHeader9">4. 入口文件</h3>
<p>这里我们需要编写在webpack中配置的入口文件地址的entry.js，主要功能为挂载生成的vue实例app至id为app的DOM节点上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// entry.js
import { app } from './app.js'

app.$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// entry.js</span>
<span class="hljs-keyword">import</span> { app } <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.js'</span>

app.$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.js
import Vue from 'vue'
import App from './App.vue'
import router from './router'

const app = new Vue({
    router,
    ...App
})

export { app, router }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// app.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App.vue'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue({
    router,
    ...App
})

<span class="hljs-keyword">export</span> { app, router }</code></pre>
<h3 id="articleHeader10">5. vue组件编写</h3>
<p>然后我们需要编写一个最简单的vue组件index.vue，将其放在views文件夹下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div>hello world!</div>
</template>

<script>
    
</script>

<style>
    
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>hello world!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>同时我们需要编写最外层父组件App.vue，一般像下面这样，主要嵌套一层router-view来动态展示不同路由下的内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <router-view></router-view>
</template>

<script>
    
</script>

<style>
    
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="undefined">
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
    
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<h3 id="articleHeader11">6. 路由配置</h3>
<p>在编写完我们vue的单文件组件后，我们需要配置我们的路由文件，以便实现一个单页应用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue' // 引入vue
import Router from 'vue-router'  // 引入路由

Vue.use(Router) // 注册路由

import Index from '../views/index.vue'  // 引入我们刚刚编写的简单的组件

export default new Router({
    mode: 'hash',
    routes: [
        { 
            path: '/', 
            name: 'index', 
            component: Index,
        },
        { path: '*', redirect: '/' },
    ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span> <span class="hljs-comment">// 引入vue</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>  <span class="hljs-comment">// 引入路由</span>

Vue.use(Router) <span class="hljs-comment">// 注册路由</span>

<span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">'../views/index.vue'</span>  <span class="hljs-comment">// 引入我们刚刚编写的简单的组件</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">mode</span>: <span class="hljs-string">'hash'</span>,
    <span class="hljs-attr">routes</span>: [
        { 
            <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, 
            <span class="hljs-attr">name</span>: <span class="hljs-string">'index'</span>, 
            <span class="hljs-attr">component</span>: Index,
        },
        { <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/'</span> },
    ]
})</code></pre>
<h3 id="articleHeader12">7. 热加载</h3>
<p>最后我们需要实现一个前端热加载的功能来实时更新我们修改后的页面，这里我们需要安装一个webpack-dev-server的插件，其可以为我们搭建一个本地小型的Node.js Express服务器。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009943452?w=628&amp;h=295" src="https://static.alili.tech/img/remote/1460000009943452?w=628&amp;h=295" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>安装完成后，我们需要在package.json的scripts中配置启动命令dev：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server&quot;,
    &quot;build&quot;: &quot;rimraf dist &amp;&amp; cross-env NODE_ENV=prod&amp;&amp;webpack -p --config ./webpack.config.js&quot;
}

..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">...

<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"rimraf dist &amp;&amp; cross-env NODE_ENV=prod&amp;&amp;webpack -p --config ./webpack.config.js"</span>
}

...</code></pre>
<p>上次配置的build命令用于删除dist目录并切换开发环境及打包压缩代码，而dev命令用于启动本地服务器，生成的包只会存在于内存中。</p>
<h3 id="articleHeader13">8. 注意事项</h3>
<p>完成上方步骤后其实还会存在一个问题，那就是我们的部分ES6代码无法获得解析，这里我们还需要添加babel的配置文件.babelrc：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [
    [&quot;env&quot;, { &quot;modules&quot;: false }],
    &quot;stage-2&quot;
  ],
  &quot;plugins&quot;: [&quot;transform-runtime&quot;],
  &quot;comments&quot;: false,
  &quot;env&quot;: {
    &quot;test&quot;: {
      &quot;presets&quot;: [&quot;env&quot;, &quot;stage-2&quot;],
      &quot;plugins&quot;: [ &quot;istanbul&quot; ]
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"presets"</span>: [
    [<span class="hljs-string">"env"</span>, { <span class="hljs-attr">"modules"</span>: <span class="hljs-literal">false</span> }],
    <span class="hljs-string">"stage-2"</span>
  ],
  <span class="hljs-attr">"plugins"</span>: [<span class="hljs-string">"transform-runtime"</span>],
  <span class="hljs-attr">"comments"</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">"env"</span>: {
    <span class="hljs-attr">"test"</span>: {
      <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"env"</span>, <span class="hljs-string">"stage-2"</span>],
      <span class="hljs-attr">"plugins"</span>: [ <span class="hljs-string">"istanbul"</span> ]
    }
  }
}</code></pre>
<p>这里我们使用了stage-2来处理ES6中对象无法使用...解构的问题，同时使用transform-runtime来优化我们的代码利用率。</p>
<h2 id="articleHeader14">项目实例</h2>
<p>上方只讲述了vue自定义构建的主要步骤和关键代码，详细代码实例可以参考：<a href="https://github.com/luozhihao/vue-setup-course" rel="nofollow noreferrer" target="_blank">https://github.com/luozhihao/vue-setup-course</a></p>
<h2 id="articleHeader15">结语</h2>
<p>本文主要介绍了vue项目构建的两种方式，vue-cli构建与自定义构建都有其适用的范围和对象，大家需要针对项目和自身条件的情况进行择优选择，同时在自定义构建中也有很多功能配置本文并未提及，感兴趣的童鞋可以自己继续探索。</p>
<p>如果觉得本文对你有帮助，可以关注我的微信公众号，来这里聊点关于前端的事情。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008912293?w=238&amp;h=260" src="https://static.alili.tech/img/remote/1460000008912293?w=238&amp;h=260" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue项目构建与实战

## 原文链接
[https://segmentfault.com/a/1190000009944470](https://segmentfault.com/a/1190000009944470)


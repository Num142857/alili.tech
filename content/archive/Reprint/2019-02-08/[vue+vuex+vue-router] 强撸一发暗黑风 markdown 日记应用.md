---
title: '[vue+vuex+vue-router] 强撸一发暗黑风 markdown 日记应用' 
date: 2019-02-08 2:30:41
hidden: true
slug: un9gbw48gzo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>容我思考思考文章结构，能够更容易让新手入门，思考的过程中被小编拒了一次，囧。本文将会从项目开发角度出发，由外向内拆解，自顶而下设计</p></blockquote>
<p><a href="https://njaulj.github.io/darkMarkdown" rel="nofollow noreferrer" target="_blank">项目地址</a></p>
<p>效果图</p>
<p><span class="img-wrap"><img data-src="/img/bVyrCS" src="https://static.alili.tech/img/bVyrCS" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>暗黑风是不是很炫～<em>Step by step,follow me~</em></p>
<h3 id="articleHeader0">知识储备</h3>
<ul>
<li><p><a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">vue.js 官网教程</a></p></li>
<li><p><a href="http://vuex.vuejs.org/en/index.html" rel="nofollow noreferrer" target="_blank">vuex 官方教程</a><br>   核心思想</p></li>
</ul>
<p><span class="img-wrap"><img data-src="http://vuex.vuejs.org/en/vuex.png" src="https://static.alili.techhttp://vuex.vuejs.org/en/vuex.png" alt="vuex数据流" title="vuex数据流" style="cursor: pointer;"></span></p>
<ul>
<li><p><a href="http://router.vuejs.org/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">vue-router 官方教程</a></p></li>
<li><p><a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">webpack 官方教程</a></p></li>
<li><p><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node.js 官方</a></p></li>
<li><p><a href="http://es6.ruanyifeng.com/" rel="nofollow noreferrer" target="_blank">es6 阮一峰老师所著的es6入门</a></p></li>
</ul>
<p>对于知识储备这类事，无需多言，尤其是node横空出世之后，前端技能栈日新月异，学海无涯！一开始看不懂不要紧，书读百遍，其义自现！作为一名“码农”， 更要加强阅读能力＋实操能力结合。</p>
<h3 id="articleHeader1">项目初始化</h3>
<ol>
<li><p>安装nodejs,这个不赘述了</p></li>
<li>
<p>安装vue-cli，这是vue.js官方推荐的大中型项目构建工具脚手架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
</li>
<li>
<p>初始化项目，选择webpack作为资源打包工具</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack workbook(eslint，karma,e2e test等都选择n) 
cd workbook
npm install
npm run dev 
// 打开 http://localhost:8080,应该能看到页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>vue init webpack workbook(eslint，karma,e2e <span class="hljs-keyword">test</span>等都选择<span class="hljs-keyword">n</span>) 
<span class="hljs-keyword">cd</span> workbook
npm install
npm <span class="hljs-keyword">run</span> dev 
<span class="hljs-comment">// 打开 http://localhost:8080,应该能看到页面</span></code></pre>
</li>
<li>
<p>安装相关依赖，咱们把本次能用到的依赖安装一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -D vue-router vuex marked highlight.js
// -D 和 --save-dev 等效，marked是markdown 语法转换工具库" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm install -D vue-router vuex marked highlight<span class="hljs-selector-class">.js</span>
<span class="hljs-comment">// -D 和 --save-dev 等效，marked是markdown 语法转换工具库</span></code></pre>
</li>
</ol>
<h3 id="articleHeader2">项目结构</h3>
<p>ok，项目初始化工作结束,咱们来思考用vue＋vuex＋vue-router来构建页面吧。</p>
<p><span class="img-wrap"><img data-src="/img/bVyrSw" src="https://static.alili.tech/img/bVyrSw" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>Oh Yeah! 组件化设计！</p>
<p>由于咱们后面几乎所有的工作都在src文件夹下完成，所以我们先来看看我们未来的结构吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── App.vue //初始化工作，以及挂载路由的router-view组件
├── assets //静态资源文件
│&nbsp;&nbsp; └── darkness.css //暗黑风stylesheet
├── components  //组件放在这儿
│&nbsp;&nbsp; ├── rawEditor.vue //markdown 文本编辑器组件
│&nbsp;&nbsp; └── renderEditor.vue //渲染后的展示组件
├── main.js //入口程序
├── router.js //SPA 路由配置文件
├── views //页面
│&nbsp;&nbsp; ├── 404.vue // 除'/'以外的非法路由，一律指向404
│&nbsp;&nbsp; └── index.vue // '/'路由指向页面，内含 rawEditor.vue &amp; renderEditor.vue
└── vuex
    ├── actions.js //vuex理念中 actions -> dispatch
    ├── getters.js //vuex 理念中 Getters Can Return Derived State，简言之，组建里面的状态都通过getters来获取
    └── store.js //vuex 理念中 initial state,mutations，相应dispatch－》mutations－》从而完成对state的更新" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├── App<span class="hljs-selector-class">.vue</span> <span class="hljs-comment">//初始化工作，以及挂载路由的router-view组件</span>
├── assets <span class="hljs-comment">//静态资源文件</span>
│&nbsp;&nbsp; └── darkness<span class="hljs-selector-class">.css</span> <span class="hljs-comment">//暗黑风stylesheet</span>
├── components  <span class="hljs-comment">//组件放在这儿</span>
│&nbsp;&nbsp; ├── rawEditor<span class="hljs-selector-class">.vue</span> <span class="hljs-comment">//markdown 文本编辑器组件</span>
│&nbsp;&nbsp; └── renderEditor<span class="hljs-selector-class">.vue</span> <span class="hljs-comment">//渲染后的展示组件</span>
├── main<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//入口程序</span>
├── router<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//SPA 路由配置文件</span>
├── views <span class="hljs-comment">//页面</span>
│&nbsp;&nbsp; ├── <span class="hljs-number">404</span><span class="hljs-selector-class">.vue</span> <span class="hljs-comment">// 除'/'以外的非法路由，一律指向404</span>
│&nbsp;&nbsp; └── index<span class="hljs-selector-class">.vue</span> <span class="hljs-comment">// '/'路由指向页面，内含 rawEditor.vue &amp; renderEditor.vue</span>
└── vuex
    ├── actions<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//vuex理念中 actions -&gt; dispatch</span>
    ├── getters<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//vuex 理念中 Getters Can Return Derived State，简言之，组建里面的状态都通过getters来获取</span>
    └── store<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//vuex 理念中 initial state,mutations，相应dispatch－》mutations－》从而完成对state的更新</span></code></pre>
<h3 id="articleHeader3">AhhA，Talk is cheap ，show me the code！</h3>
<p><strong>1. 在 src 根目录下创建 router.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//router.js
export default (router)=>router.map({
    '/':{
        name:'index',//应用首页
        component:require('./views/index') //加载index页面
    },
    '*':{//除'/'以外的所有路由，均跳转到404页面
        name:'404',
        component:require('./views/404')// 加载404页面
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//router.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> (router)=&gt;router.map({
    <span class="hljs-string">'/'</span>:{
        <span class="hljs-attr">name</span>:<span class="hljs-string">'index'</span>,<span class="hljs-comment">//应用首页</span>
        component:<span class="hljs-built_in">require</span>(<span class="hljs-string">'./views/index'</span>) <span class="hljs-comment">//加载index页面</span>
    },
    <span class="hljs-string">'*'</span>:{<span class="hljs-comment">//除'/'以外的所有路由，均跳转到404页面</span>
        name:<span class="hljs-string">'404'</span>,
        <span class="hljs-attr">component</span>:<span class="hljs-built_in">require</span>(<span class="hljs-string">'./views/404'</span>)<span class="hljs-comment">// 加载404页面</span>
    }
})</code></pre>
<p><strong>2. 修改 main.js 入口文件，我们要加上 vue-router</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import configRouter from './router'
require('./assets/darkness.css') 

Vue.use(VueRouter)
const router = new VueRouter()
configRouter(router)//注入路由规则

router.start(Vue.extend(App),'#app')//#app是what 鬼，哪里来的？
/*
细心或者有经验的同学可能已经发现，在整个项目的根目录有个index.html 文件，这个其实才是我们整个应用的第一入口，SPA（Single Page App）完美的解释,我们来修改一下它吧。
*/

//index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;utf-8&quot;>
    <title>workbook</title>
    <style type=&quot;text/css&quot;>
        html,#app {
            height:100%;
        }
        body{
            width: 100%;
            height: 100%;
            margin:0;
            padding:0;
        }

    </style>
  </head>
  <body>
      <div id=&quot;app&quot;></div>
    <!-- built files will be auto injected -->
  </body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//main.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> configRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'./assets/darkness.css'</span>) 

Vue.use(VueRouter)
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter()
configRouter(router)<span class="hljs-comment">//注入路由规则</span>

router.start(Vue.extend(App),<span class="hljs-string">'#app'</span>)<span class="hljs-comment">//#app是what 鬼，哪里来的？</span>
<span class="hljs-comment">/*
细心或者有经验的同学可能已经发现，在整个项目的根目录有个index.html 文件，这个其实才是我们整个应用的第一入口，SPA（Single Page App）完美的解释,我们来修改一下它吧。
*/</span>

<span class="hljs-comment">//index.html</span>
&lt;!DOCTYPE html&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>workbook<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-id">#app</span> {
            <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
        }
        <span class="hljs-selector-tag">body</span>{
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
        }

    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- built files will be auto injected --&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</span></code></pre>
<p><strong>3. 修改 App.vue</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//app.vue 瞧好了，vue 组件大法来了
<template>
    <div id=&quot;main&quot;>
        <router-view></router-view> //路由组件
    </div>   
</template>
<script>
import store from './vuex/store' //后面讲vuex 配置会提到
export default {
    store
}
</script>
<style>
 #main {
    width:100%;
    height:100%;
 }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//app.vue 瞧好了，vue 组件大法来了</span>
&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span> //路由组件
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>   
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./vuex/store'</span> <span class="hljs-comment">//后面讲vuex 配置会提到</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    store
}
&lt;<span class="hljs-regexp">/script&gt;
&lt;style&gt;
 #main {
    width:100%;
    height:100%;
 }
&lt;/</span>style&gt;</code></pre>
<p><strong>4. 开始写我们的两个页面吧</strong></p>
<p>在src目录下，新建views文件夹，存放我们的页面，index.vue &amp; 404.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.vue
<template>//对照页面布局草稿图，分别把两个组件加载进来
    <raw-editor></raw-editor> 
    <render-editor></render-editor>
</template>

<script>
    import rawEditor from '../components/rawEditor'
    import renderEditor from '../components/renderEditor'

    export default {
        components:{
            rawEditor,
            renderEditor
        }
    }
</script>


//404.vue  简单到令人发指，不过我只是为了实现router功能，请开恩。

<template>
    <h1>404</h1>
</template>

<script>
    export default {
        
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">//index.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>//对照页面布局草稿图，分别把两个组件加载进来
    <span class="hljs-tag">&lt;<span class="hljs-name">raw-editor</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">raw-editor</span>&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">render-editor</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">render-editor</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> rawEditor <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/rawEditor'</span>
    <span class="hljs-keyword">import</span> renderEditor <span class="hljs-keyword">from</span> <span class="hljs-string">'../components/renderEditor'</span>

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        components:{
            rawEditor,
            renderEditor
        }</span><span class="xml"><span class="undefined">
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>


//404.vue  简单到令人发指，不过我只是为了实现router功能，请开恩。

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>404<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
        
    }</span><span class="xml"><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p><strong>5. 开始写具体组件</strong></p>
<p>在写组件之前，我们先静静地思考一下</p>
<ul>
<li>
<p>代码都写了快一大半了，怎么还不见饱守吹捧的vuex登场。OK！如你所愿，不过在vuex登场之前，咱们可否拿出纸和笔 或者 头脑风暴一下，想想咱们的应用的state应该是什么！！！</p>
<ul><li><p><strong>BingGo！</strong> <code>rawHtml</code> 和<code>renderHtml</code>，简简单单的两个state，就能够满足我们的应用需求。</p></li></ul>
</li>
<li>
<p><code>rawHtml</code> 和<code>renderHtml</code>之间又有什么关系呢?</p>
<ul><li><p><code>rawHtml</code>经过转换之后给<code>renderHtml</code>赋值</p></li></ul>
</li>
</ul>
<blockquote><p>Jack：我觉得是时候引入 Vuex 了</p></blockquote>
<p>在src 文件夹下 新建vuex文件夹，创建store.js ,getters.js,actions.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    rawHtml:'',
    renderHtml:''
}

//这块是重点，能够改变state的只能够在 mutations完成！！！
const mutations = {
    MARKDOWN_SUCCESS(state,_rawHtml,content){
        console.log(_rawHtml,content)
        state.rawHtml = _rawHtml
        state.renderHtml = content
    }
}

//最后别忘了，这块要export 出去，还记得我们在编写app.vue 的时候 引入的store，就是这个，SPA只需要在最顶层的app.vue 引用一次即可。
export default new Vuex.Store({
    state,
    mutations
})

//getters.js 简单到不像，getters存在的意义就是 纯粹！！
export const getRawHtml = (state)=>state.rawHtml;
export const getRenderHtml = (state)=>state.renderHtml;

//actions.js 还记得vuex核心思想的那张数据流图，还有上面我描述src的完成状态的关于 vuex里面各文件的意义所在，actions.js 说白了，就是处理玩rawHtml之后，dispatch 结果到 mutations，剩下更新state的工作交给mutations

import Vue from 'vue'
import marked from 'marked';
//marked配置文件
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});


export const renderHtml = ({dispatch},e)=>{
    var _renderHtml = marked(e.target.value) 
    return dispatch('MARKDOWN_SUCCESS',e.target.value,_renderHtml)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//store.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>

Vue.use(Vuex);

<span class="hljs-keyword">const</span> state = {
    <span class="hljs-attr">rawHtml</span>:<span class="hljs-string">''</span>,
    <span class="hljs-attr">renderHtml</span>:<span class="hljs-string">''</span>
}

<span class="hljs-comment">//这块是重点，能够改变state的只能够在 mutations完成！！！</span>
<span class="hljs-keyword">const</span> mutations = {
    MARKDOWN_SUCCESS(state,_rawHtml,content){
        <span class="hljs-built_in">console</span>.log(_rawHtml,content)
        state.rawHtml = _rawHtml
        state.renderHtml = content
    }
}

<span class="hljs-comment">//最后别忘了，这块要export 出去，还记得我们在编写app.vue 的时候 引入的store，就是这个，SPA只需要在最顶层的app.vue 引用一次即可。</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    state,
    mutations
})

<span class="hljs-comment">//getters.js 简单到不像，getters存在的意义就是 纯粹！！</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getRawHtml = <span class="hljs-function">(<span class="hljs-params">state</span>)=&gt;</span>state.rawHtml;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getRenderHtml = <span class="hljs-function">(<span class="hljs-params">state</span>)=&gt;</span>state.renderHtml;

<span class="hljs-comment">//actions.js 还记得vuex核心思想的那张数据流图，还有上面我描述src的完成状态的关于 vuex里面各文件的意义所在，actions.js 说白了，就是处理玩rawHtml之后，dispatch 结果到 mutations，剩下更新state的工作交给mutations</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> marked <span class="hljs-keyword">from</span> <span class="hljs-string">'marked'</span>;
<span class="hljs-comment">//marked配置文件</span>
marked.setOptions({
  <span class="hljs-attr">renderer</span>: <span class="hljs-keyword">new</span> marked.Renderer(),
  <span class="hljs-attr">gfm</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">tables</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">breaks</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">pedantic</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">sanitize</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">smartLists</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">smartypants</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">code</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">require</span>(<span class="hljs-string">'highlight.js'</span>).highlightAuto(code).value;
  }
});


<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> renderHtml = <span class="hljs-function">(<span class="hljs-params">{dispatch},e</span>)=&gt;</span>{
    <span class="hljs-keyword">var</span> _renderHtml = marked(e.target.value) 
    <span class="hljs-keyword">return</span> dispatch(<span class="hljs-string">'MARKDOWN_SUCCESS'</span>,e.target.value,_renderHtml)
}</code></pre>
<p><strong>继续我们的组件工作</strong>：</p>
<p>这个项目很简单，两个组件，一个是rawEditor 还有一个是 renderEditor，至于为什么要起这个名字，who knows！在components 文件夹下创建rawEditor.vue 和renderEditor.vue文件。</p>
<blockquote><p>往下走，可能有点复杂，千万别退缩，可能是我表述不够清楚，但是move on，你就能收获整片天空。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//rawEditor.vue
<template>
    <div id=&quot;raw-editor&quot;>
        <textarea
              :value=&quot;rawHtml&quot;
              @input=&quot;renderHtml&quot;
              class=&quot;form-control&quot;>
        </textarea>
    </div>
</template>

<script>
    //设计思想就是rawHtml内容已改变，就会触发renderHtml方法
    import {renderHtml} from '../vuex/actions' 
    import {getRawHtml} from '../vuex/getters'
    export default {
        vuex:{//看到没，里面有个 vuex 对象，actions和getters两者相得益彰
            actions:{
                renderHtml //内容改变触发
            },
            getters:{
                rawHtml:getRawHtml//获得rawHtml 
            }
        },
    }
</script>

<style>
    #raw-editor {
        float:left;
        width:45%;
        height:100%;
    }

    textarea{
        width: 100%;
        height:100%;
        border: 0;
        border-radius: 0;
    }
</style>

//renderEditor.vue
<template>
    <div id=&quot;render-editor&quot;>
        "{{"{renderHtml"}}"}
    </div>
</template>

<script>
    import {getRenderHtml} from '../vuex/getters'
    export default {
        vuex:{ //看到没，里面有个 vuex 对象
            getters:{
                renderHtml:getRenderHtml
            }
        }
    }
</script>
<style>
    #render-editor {
        float:right;
        width:50%;
        height:100%;
        overflow: scroll;
    }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//rawEditor.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"raw-editor"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
              <span class="hljs-attr">:value</span>=<span class="hljs-string">"rawHtml"</span>
              @<span class="hljs-attr">input</span>=<span class="hljs-string">"renderHtml"</span>
              <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">//设计思想就是rawHtml内容已改变，就会触发renderHtml方法</span>
    <span class="hljs-keyword">import</span> {renderHtml} <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/actions'</span> 
    <span class="hljs-keyword">import</span> {getRawHtml} <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/getters'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">vuex</span>:{<span class="hljs-comment">//看到没，里面有个 vuex 对象，actions和getters两者相得益彰</span>
            actions:{
                renderHtml <span class="hljs-comment">//内容改变触发</span>
            },
            <span class="hljs-attr">getters</span>:{
                <span class="hljs-attr">rawHtml</span>:getRawHtml<span class="hljs-comment">//获得rawHtml </span>
            }
        },
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#raw-editor</span> {
        <span class="hljs-attribute">float</span>:left;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">45%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    }

    <span class="hljs-selector-tag">textarea</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

//renderEditor.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"render-editor"</span>&gt;</span>
        </span><span class="hljs-template-variable">"{{"{renderHtml"}}"</span><span class="xml">}
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> {getRenderHtml} <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex/getters'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">vuex</span>:{ <span class="hljs-comment">//看到没，里面有个 vuex 对象</span>
            getters:{
                <span class="hljs-attr">renderHtml</span>:getRenderHtml
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#render-editor</span> {
        <span class="hljs-attribute">float</span>:right;
        <span class="hljs-attribute">width</span>:<span class="hljs-number">50%</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
        <span class="hljs-attribute">overflow</span>: scroll;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<h3 id="articleHeader4">代码写到这里，离成功不远了，是不是有点小期待呢</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//打开命令行or terminal 工具，运行一下吧
npm run dev 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>//打开命令行or terminal 工具，运行一下吧
npm <span class="hljs-keyword">run</span><span class="bash"> dev 
</span></code></pre>
<p>等待一会编译完成后，打开 <a href="http://localhost:8080," rel="nofollow noreferrer" target="_blank">http://localhost:8080,</a>查看效果，怎么样，是不是很酷！</p>
<p>好吧！大家发现了，我们的样式不够酷炫，也不是 暗黑风。退货、老板给差评！在src/assets文件夹中新建 darkness.css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pre,
code {
  font-family: Menlo, Monaco, &quot;Courier New&quot;, monospace;
}

pre {
  padding: .5rem;
  line-height: 1.25;
  overflow-x: scroll;
}

@media print {
  *,
  *:before,
  *:after {
    background: transparent !important;
    color: #000 !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  a,
  a:visited {
    text-decoration: underline;
  }

  a[href]:after {
    content: &quot; (&quot; attr(href) &quot;)&quot;;
  }

  abbr[title]:after {
    content: &quot; (&quot; attr(title) &quot;)&quot;;
  }

  a[href^=&quot;#&quot;]:after,
  a[href^=&quot;javascript:&quot;]:after {
    content: &quot;&quot;;
  }

  pre,
  blockquote {
    border: 1px solid #999;
    page-break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  tr,
  img {
    page-break-inside: avoid;
  }

  img {
    max-width: 100% !important;
  }

  p,
  h2,
  h3 {
    orphans: 3;
    widows: 3;
  }

  h2,
  h3 {
    page-break-after: avoid;
  }
}

a,
a:visited {
  color: #01ff70;
}

a:hover,
a:focus,
a:active {
  color: #2ecc40;
}

.retro-no-decoration {
  text-decoration: none;
}

html {
  font-size: 12px;
}

@media screen and (min-width: 32rem) and (max-width: 48rem) {
  html {
    font-size: 15px;
  }
}

@media screen and (min-width: 48rem) {
  html {
    font-size: 16px;
  }
}

body {
  line-height: 1.85;
}

p,
.retro-p {
  font-size: 1rem;
  margin-bottom: 1.3rem;
}

h1,
.retro-h1,
h2,
.retro-h2,
h3,
.retro-h3,
h4,
.retro-h4 {
  margin: 1.414rem 0 .5rem;
  font-weight: inherit;
  line-height: 1.42;
}

h1,
.retro-h1 {
  margin-top: 0;
  font-size: 3.998rem;
}

h2,
.retro-h2 {
  font-size: 2.827rem;
}

h3,
.retro-h3 {
  font-size: 1.999rem;
}

h4,
.retro-h4 {
  font-size: 1.414rem;
}

h5,
.retro-h5 {
  font-size: 1.121rem;
}

h6,
.retro-h6 {
  font-size: .88rem;
}

small,
.retro-small {
  font-size: .707em;
}

/* https://github.com/mrmrs/fluidity */

img,
canvas,
iframe,
video,
svg,
select,
textarea {
  max-width: 100%;
}

html,
body {
  background-color: #222;
  min-height: 100%;
}

html {
  font-size: 18px;
}

body {
  width: 100%;
  color: #fafafa;
  font-family: &quot;Courier New&quot;;
  line-height: 1.45;
  padding: .25rem;
}

pre {
  background-color: #333;
}

blockquote {
  border-left: 3px solid #01ff70;
  padding-left: 1rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">pre</span>,
<span class="hljs-selector-tag">code</span> {
  <span class="hljs-attribute">font-family</span>: Menlo, Monaco, <span class="hljs-string">"Courier New"</span>, monospace;
}

<span class="hljs-selector-tag">pre</span> {
  <span class="hljs-attribute">padding</span>: .<span class="hljs-number">5rem</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.25</span>;
  <span class="hljs-attribute">overflow-x</span>: scroll;
}

@<span class="hljs-keyword">media</span> print {
  *,
  *<span class="hljs-selector-pseudo">:before</span>,
  *<span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">background</span>: transparent <span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span> <span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">box-shadow</span>: none <span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">text-shadow</span>: none <span class="hljs-meta">!important</span>;
  }

  <span class="hljs-selector-tag">a</span>,
  <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:visited</span> {
    <span class="hljs-attribute">text-decoration</span>: underline;
  }

  <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href]</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" ("</span> <span class="hljs-built_in">attr</span>(href) <span class="hljs-string">")"</span>;
  }

  <span class="hljs-selector-tag">abbr</span><span class="hljs-selector-attr">[title]</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" ("</span> <span class="hljs-built_in">attr</span>(title) <span class="hljs-string">")"</span>;
  }

  <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href^="#"]</span><span class="hljs-selector-pseudo">:after</span>,
  <span class="hljs-selector-tag">a</span><span class="hljs-selector-attr">[href^="javascript:"]</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
  }

  <span class="hljs-selector-tag">pre</span>,
  <span class="hljs-selector-tag">blockquote</span> {
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;
    <span class="hljs-attribute">page-break-inside</span>: avoid;
  }

  <span class="hljs-selector-tag">thead</span> {
    <span class="hljs-attribute">display</span>: table-header-group;
  }

  <span class="hljs-selector-tag">tr</span>,
  <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">page-break-inside</span>: avoid;
  }

  <span class="hljs-selector-tag">img</span> {
    <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span> <span class="hljs-meta">!important</span>;
  }

  <span class="hljs-selector-tag">p</span>,
  <span class="hljs-selector-tag">h2</span>,
  <span class="hljs-selector-tag">h3</span> {
    <span class="hljs-attribute">orphans</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">widows</span>: <span class="hljs-number">3</span>;
  }

  <span class="hljs-selector-tag">h2</span>,
  <span class="hljs-selector-tag">h3</span> {
    <span class="hljs-attribute">page-break-after</span>: avoid;
  }
}

<span class="hljs-selector-tag">a</span>,
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:visited</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#01ff70</span>;
}

<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span>,
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:focus</span>,
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:active</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#2ecc40</span>;
}

<span class="hljs-selector-class">.retro-no-decoration</span> {
  <span class="hljs-attribute">text-decoration</span>: none;
}

<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}

@<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">32rem</span>) and (max-width: <span class="hljs-number">48rem</span>) {
  <span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15px</span>;
  }
}

@<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">48rem</span>) {
  <span class="hljs-selector-tag">html</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
  }
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.85</span>;
}

<span class="hljs-selector-tag">p</span>,
<span class="hljs-selector-class">.retro-p</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">1.3rem</span>;
}

<span class="hljs-selector-tag">h1</span>,
<span class="hljs-selector-class">.retro-h1</span>,
<span class="hljs-selector-tag">h2</span>,
<span class="hljs-selector-class">.retro-h2</span>,
<span class="hljs-selector-tag">h3</span>,
<span class="hljs-selector-class">.retro-h3</span>,
<span class="hljs-selector-tag">h4</span>,
<span class="hljs-selector-class">.retro-h4</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">1.414rem</span> <span class="hljs-number">0</span> .<span class="hljs-number">5rem</span>;
  <span class="hljs-attribute">font-weight</span>: inherit;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.42</span>;
}

<span class="hljs-selector-tag">h1</span>,
<span class="hljs-selector-class">.retro-h1</span> {
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">3.998rem</span>;
}

<span class="hljs-selector-tag">h2</span>,
<span class="hljs-selector-class">.retro-h2</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">2.827rem</span>;
}

<span class="hljs-selector-tag">h3</span>,
<span class="hljs-selector-class">.retro-h3</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.999rem</span>;
}

<span class="hljs-selector-tag">h4</span>,
<span class="hljs-selector-class">.retro-h4</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.414rem</span>;
}

<span class="hljs-selector-tag">h5</span>,
<span class="hljs-selector-class">.retro-h5</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.121rem</span>;
}

<span class="hljs-selector-tag">h6</span>,
<span class="hljs-selector-class">.retro-h6</span> {
  <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">88rem</span>;
}

<span class="hljs-selector-tag">small</span>,
<span class="hljs-selector-class">.retro-small</span> {
  <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">707em</span>;
}

<span class="hljs-comment">/* https://github.com/mrmrs/fluidity */</span>

<span class="hljs-selector-tag">img</span>,
<span class="hljs-selector-tag">canvas</span>,
<span class="hljs-selector-tag">iframe</span>,
<span class="hljs-selector-tag">video</span>,
<span class="hljs-selector-tag">svg</span>,
<span class="hljs-selector-tag">select</span>,
<span class="hljs-selector-tag">textarea</span> {
  <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-tag">html</span>,
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#222</span>;
  <span class="hljs-attribute">min-height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
}

<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fafafa</span>;
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Courier New"</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1.45</span>;
  <span class="hljs-attribute">padding</span>: .<span class="hljs-number">25rem</span>;
}

<span class="hljs-selector-tag">pre</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
}

<span class="hljs-selector-tag">blockquote</span> {
  <span class="hljs-attribute">border-left</span>: <span class="hljs-number">3px</span> solid <span class="hljs-number">#01ff70</span>;
  <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">1rem</span>;
}</code></pre>
<p>不行，代码部分然而并没有高亮，老板，我要退货！</p>
<h3 id="articleHeader5">服</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在 index.html的head 里面加上
<link rel=&quot;stylesheet&quot; href=&quot;//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/default.min.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs flix"><code><span class="hljs-comment">//在 index.html的head 里面加上</span>
&lt;link <span class="hljs-keyword">rel</span>=<span class="hljs-string">"stylesheet"</span> href=<span class="hljs-string">"//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/default.min.css"</span>&gt;</code></pre>
<blockquote><p>这样咱们的暗黑风的在线markdown日记应用就暂告一段落了，文中表述如果有不清不楚的，欢迎留言。同时我也是一命 new vuer，希望老鸟们能够指点！</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[vue+vuex+vue-router] 强撸一发暗黑风 markdown 日记应用

## 原文链接
[https://segmentfault.com/a/1190000005787179](https://segmentfault.com/a/1190000005787179)


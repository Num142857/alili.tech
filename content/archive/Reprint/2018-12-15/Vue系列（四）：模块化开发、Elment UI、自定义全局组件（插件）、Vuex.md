---
title: 'Vue系列（四）：模块化开发、Elment UI、自定义全局组件（插件）、Vuex' 
date: 2018-12-15 2:30:11
hidden: true
slug: mxntumslp4i
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><a href="https://segmentfault.com/a/1190000013009026"><strong>上一篇：</strong>Vue系列（三）：组件及数据传递、路由、单文件组件、vue-cli脚手架</a></h3>
<h2 id="articleHeader1">一、模块化开发</h2>
<h3 id="articleHeader2">1. vue-router模块化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install vue-router -S
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>cnpm <span class="hljs-keyword">install</span> vue-router -S
</code></pre>
<h4>1.1 编辑main.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//引入VueRouter 
import VueRouter from 'vue-router'

//使用VueRouter
Vue.use(VueRouter);

import routerConfig from './router.config.js'
//创建路由实例
const router=new VueRouter(routerConfig);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//引入VueRouter </span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>

<span class="hljs-comment">//使用VueRouter</span>
Vue.use(VueRouter);

<span class="hljs-keyword">import</span> routerConfig <span class="hljs-keyword">from</span> <span class="hljs-string">'./router.config.js'</span>
<span class="hljs-comment">//创建路由实例</span>
<span class="hljs-keyword">const</span> router=<span class="hljs-keyword">new</span> VueRouter(routerConfig);
</code></pre>
<h4>1.2 编辑App.vue</h4>
<h4>1.3 编辑router.config.js</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/news',
            component:News
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> {
    <span class="hljs-attribute">routes</span>:[
        {
            path:<span class="hljs-string">'/home'</span>,
            component:Home
        },
        {
            <span class="hljs-attribute">path</span>:<span class="hljs-string">'/news'</span>,
            component:News
        }
    ]
}</code></pre>
<h3 id="articleHeader3">2. axios模块化</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install axios -S

使用axios的两种方式：
    方式1：在每个组件中引入axios
    方式2：在main.js中全局引入axios并添加到Vue原型中
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>cnpm install axios -S

使用axios的两种方式：
    方式<span class="hljs-number">1</span>：在每个组件中引入axios
    方式<span class="hljs-number">2</span>：在main.js中全局引入axios并添加到Vue原型中
</code></pre>
<h3 id="articleHeader4">3. 为自定义组件添加事件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//为自定义组件加修饰符：native
<MyButton @click.native=&quot;send&quot;></MyButton>
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">//为自定义组件加修饰符：native</span>
&lt;MyButton <span class="hljs-meta">@click</span>.<span class="hljs-keyword">native</span>=<span class="hljs-string">"send"</span>&gt;&lt;/MyButton&gt;
 </code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/tree/master/day04/vue-cli-demo/src" rel="nofollow noreferrer" target="_blank">模块化开发</a></p>
<h2 id="articleHeader5">二、 Elment UI</h2>
<h3 id="articleHeader6">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Element UI是饿了么团队提供的一套基于Vue2.0的组件库，可以快速搭建网站，提高开发效率
    ElementUI  PC端
    MintUI 移动端
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code><span class="hljs-symbol">Element</span> UI是饿了么团队提供的一套基于Vue2.<span class="hljs-number">0</span>的组件库，可以快速搭建网站，提高开发效率
    ElementUI  <span class="hljs-built_in">PC</span>端
    MintUI 移动端
</code></pre>
<p><a href="http://element.eleme.io/" rel="nofollow noreferrer" target="_blank">官网</a></p>
<h3 id="articleHeader7">2. 快速上手</h3>
<h4>2.1 安装elment ui</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install element-ui -S
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>cnpm <span class="hljs-keyword">install</span> <span class="hljs-keyword">element</span>-ui -S
</code></pre>
<h4>2.2 在main.js中引入并使用组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css' //该样式文件需要单独引入
Vue.use(ElementUI);
这种方式引入了ElementUI中所有的组件
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">'element-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'element-ui/lib/theme-default/index.css'</span> <span class="hljs-comment">//该样式文件需要单独引入</span>
Vue.use(ElementUI);
这种方式引入了ElementUI中所有的组件
</code></pre>
<h4>2.3 在webpack.config.js中添加loader</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CSS样式和字体图标都需要由相应的loader来加载，所以需要style-loader、css-loader

默认并没有style-loader模块，所以需要单独安装
    cnpm install style-loader --save-dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>CSS样式和字体图标都需要由相应的loader来加载，所以需要<span class="hljs-built_in">style</span>-loader、css-loader

默认并没有<span class="hljs-built_in">style</span>-loader模块，所以需要单独安装
    cnpm install <span class="hljs-built_in">style</span>-loader --<span class="hljs-built_in">save</span>-dev
</code></pre>
<h4>2.4 使用组件</h4>
<h4>2.5 使用less</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="安装loader，需要两个：less、less-loader
    cnpm install less less-loader -D
在webpack.config.js中添加loader    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>安装loader，需要两个：<span class="hljs-keyword">less</span>、<span class="hljs-keyword">less</span>-loader
    cnpm <span class="hljs-keyword">install</span> <span class="hljs-keyword">less</span> <span class="hljs-keyword">less</span>-loader -D
在webpack.config.js中添加loader    
</code></pre>
<h3 id="articleHeader8">3. 按需引入组</h3>
<h4>3.1 安装babel-plugin-component</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install babel-plugin-component -D  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>cnpm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-plugin-component </span>-D  
</code></pre>
<h4>3.2 配置.babelrc文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;plugins&quot;: [[&quot;component&quot;, [
    {
      &quot;libraryName&quot;: &quot;element-ui&quot;,
      &quot;styleLibraryName&quot;: &quot;theme-default&quot;
    }
]]]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-string">"plugins"</span>: [[<span class="hljs-string">"component"</span>, [
    {
      <span class="hljs-string">"libraryName"</span>: <span class="hljs-string">"element-ui"</span>,
      <span class="hljs-string">"styleLibraryName"</span>: <span class="hljs-string">"theme-default"</span>
    }
]]]
</code></pre>
<h4>3.3  只引入需要的插件</h4>
<h2 id="articleHeader9">三、 自定义全局组件（插件）</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="全局组件（插件）：就是指可以在main.js中使用Vue.use()进行全局引入，然后在其他组件中就都可以使用了，如vue-router
    import VueRouter from 'vue-router'
    Vue.use(VueRouter);

普通组件（插件）：每次使用时都要引入，如axios
    import axios from 'axios'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>全局组件（插件）：就是指可以在main.js中使用Vue.use()进行全局引入，然后在其他组件中就都可以使用了，如vue-router
    <span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
    Vue.use(VueRouter);

普通组件（插件）：每次使用时都要引入，如axios
    <span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span></code></pre>
<p><a href="https://github.com/tcyfree/VueLearn/tree/master/day04/component-demo" rel="nofollow noreferrer" target="_blank">自定义全局组件（插件）</a></p>
<h2 id="articleHeader10">四、 Vuex</h2>
<h3 id="articleHeader11">1. 简介</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
简单来说，用来集中管理数据，类似于React中的Redux，都是基于Flux的前端状态管理框架           
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>Vuex 是一个专为 Vue<span class="hljs-selector-class">.js</span> 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
简单来说，用来集中管理数据，类似于React中的Redux，都是基于Flux的前端状态管理框架           
</code></pre>
<h3 id="articleHeader12">2. 基本用法</h3>
<h4>2.1 安装vuex</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install vuex -S
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>cnpm <span class="hljs-keyword">install</span> vuex -S
</code></pre>
<h4>2.2 创建store.js文件，在main.js中导入并配置store.选项</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from './store.js' //导入store对象

new Vue({
  store, //配置store选项，指定为store对象，会自动将store对象注入到所有子组件中，在子组件中通过this.$store访问该store对象
  el: '#app',
  render: h => h(App)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store.js'</span> <span class="hljs-comment">//导入store对象</span>

<span class="hljs-keyword">new</span> Vue({
  store, <span class="hljs-comment">//配置store选项，指定为store对象，会自动将store对象注入到所有子组件中，在子组件中通过this.$store访问该store对象</span>
  el: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App)
})</code></pre>
<h4>2.3 编辑store.js文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vuex的核心是Store(仓库)，相当于是一个容器，一个store实例中包含以下属性的方法：
    state       定义属性（状态、数据）
    getters     用来获取属性
    actions     定义方法（动作）
    commit      提交变化，修改数据的唯一方式就是显式的提交mutations
    mutations   定义变化
    注：不能直接修改数据，必须显式提交变化，目的是为了追踪到状态的变化 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>Vuex的核心是Store(仓库)，相当于是一个容器，一个store实例中包含以下属性的方法：
    <span class="hljs-keyword">state</span>       定义属性（状态、数据）
    getters     用来获取属性
    actions     定义方法（动作）
    commit      提交变化，修改数据的唯一方式就是显式的提交mutations
    mutations   定义变化
    注：不能直接修改数据，必须显式提交变化，目的是为了追踪到状态的变化 
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * vuex配置
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//定义属性（数据）
var state={
    count:6
}

//定义getters
var getters={
    count(state){
        return state.count;
    },
    isEvenOrOdd(state){
        return state.count%2==0?'偶数':'奇数';
    }
}

//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
    increment(context){//包含：commit、dispatch、state
        console.log(context);
        // context.commmit()
    },
    // increment({commit,state}){
    //     commit('increment'); //提交一个名为increment的变化，名称可自定义，可以认为是类型名
    // },
    decrement({commit,state}){
        if(state.count>10){
            commit('decrement');
        }
    },
    incrementAsync({commit,state}){
        //异步操作
        var p=new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve();
            },3000);
        });

        p.then(() => {
            commit('increment');
        }).catch(() => {
            console.log('异步操作');
        });
    }
}

//定义mutations，处理状态（数据）的改变
const mutations={
    increment(state){
        state.count++;
    },
    decrement(state){
        state.count--;
    }
}

//创建store对象
const store=new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

//导出store对象
export default store;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>/**
 * vuex配置
 */

import Vue <span class="hljs-keyword">from</span> 'vue'
import Vuex <span class="hljs-keyword">from</span> 'vuex'

Vue.use(Vuex);

//定义属性（数据）
var <span class="hljs-keyword">state</span>={
    count:<span class="hljs-number">6</span>
}

//定义getters
var getters={
    count(<span class="hljs-keyword">state</span>){
        return <span class="hljs-keyword">state</span>.count;
    },
    isEvenOrOdd(<span class="hljs-keyword">state</span>){
        return <span class="hljs-keyword">state</span>.count%<span class="hljs-number">2</span>==<span class="hljs-number">0</span>?'偶数':'奇数';
    }
}

//定义actions，要执行的操作，如流程判断、异步请求等
const actions = {
    increment(context){//包含：commit、dispatch、<span class="hljs-keyword">state</span>
        console.<span class="hljs-keyword">log</span>(context);
        // context.commmit()
    },
    // increment({commit,<span class="hljs-keyword">state</span>}){
    //     commit('increment'); //提交一个名为increment的变化，名称可自定义，可以认为是类型名
    // },
    decrement({commit,<span class="hljs-keyword">state</span>}){
        if(<span class="hljs-keyword">state</span>.count&gt;<span class="hljs-number">10</span>){
            commit('decrement');
        }
    },
    incrementAsync({commit,<span class="hljs-keyword">state</span>}){
        //异步操作
        var p=new Promise((resolve,reject) =&gt; {
            <span class="hljs-built_in">set</span>Timeout(() =&gt; {
                resolve();
            },<span class="hljs-number">3000</span>);
        });

        p.then(() =&gt; {
            commit('increment');
        }).catch(() =&gt; {
            console.<span class="hljs-keyword">log</span>('异步操作');
        });
    }
}

//定义mutations，处理状态（数据）的改变
const mutations={
    increment(<span class="hljs-keyword">state</span>){
        <span class="hljs-keyword">state</span>.count++;
    },
    decrement(<span class="hljs-keyword">state</span>){
        <span class="hljs-keyword">state</span>.count--;
    }
}

//创建store对象
const store=new Vuex.Store({
    <span class="hljs-keyword">state</span>,
    getters,
    actions,
    mutations
})

//导出store对象
export <span class="hljs-keyword">default</span> store;</code></pre>
<h4>2.4 编辑App.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在子组件中访问store对象的两种方式：
    方式1：通过this.$store访问
    方式2：通过mapState、mapGetters、mapActions访问，vuex提供了两个方法：
        mapState    获取state
        mapGetters  获取getters
        mapActions  获取actions
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>在子组件中访问store对象的两种方式：
    方式<span class="hljs-number">1</span>：通过this.<span class="hljs-variable">$store</span>访问
    方式<span class="hljs-number">2</span>：通过mapState、mapGetters、mapActions访问，vuex提供了两个方法：
        mapState    获取<span class="hljs-keyword">state</span>
        mapGetters  获取getters
        mapActions  获取actions
</code></pre>
<h3 id="articleHeader13">3. 分模块组织Vuex</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|-src
    |-store
        |-index.js
        |-getters.js
        |-actions.js
        |-mutations.js
        |-modules  //分为多个模块，每个模块都可以拥有自己的state、getters、actions、mutations
            |-user.js
            |-cart.js
            |-goods.js
            |....
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|-src</span>
    <span class="hljs-string">|-store</span>
        <span class="hljs-string">|-index.js</span>
        <span class="hljs-string">|-getters.js</span>
        <span class="hljs-string">|-actions.js</span>
        <span class="hljs-string">|-mutations.js</span>
        <span class="hljs-string">|-modules  //分为多个模块，每个模块都可以拥有自己的state、getters、actions、mutations</span>
            <span class="hljs-string">|-user.js</span>
            <span class="hljs-string">|-cart.js</span>
            <span class="hljs-string">|-goods.js</span>
            <span class="hljs-string">|....</span>
            </code></pre>
<h1 id="articleHeader14">完！</h1>
<p>参考Vue教学视频：<a href="http://edu.51cto.com/course/10543.html" rel="nofollow noreferrer" target="_blank">Vue.js 2.0之全家桶系列视频课程（vue、vue-router、axios、vuex）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue系列（四）：模块化开发、Elment UI、自定义全局组件（插件）、Vuex

## 原文链接
[https://segmentfault.com/a/1190000013036608](https://segmentfault.com/a/1190000013036608)


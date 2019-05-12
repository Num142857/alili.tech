---
title: '基于vue、vuex、vue-router、echarts搭建的数据展示平台' 
date: 2019-01-31 2:31:16
hidden: true
slug: gnh8k3372ml
categories: [reprint]
---

{{< raw >}}

                    
<p>真的好久没有更新博客了，但是我最近并没有偷懒哦，一直在学习vue这个框架，并且用它做了一个小项目，现在就给大家分享一下我的这个还比较有意思的小项目咯，本项目是基于vue2.0开发的。</p>
<h2 id="articleHeader0">灵感来源</h2>
<p>这是一个数据可视化相关的项目，作为一个学生班主任，需要对班上同学的各方面的情况都有所了解，于是我便做了一个问卷调查来了解学生各方面的情况。然后我又想到可以分析我们班的群聊记录呀，根据群聊记录可以得到班上同学之间的亲密度和班级群聊活跃度等信息。自然而然，我就想着可以搭建一个平台来展示这些数据，既然是数据当然是以图表的方式来展示更加直观，然后折中选择了echarts这个图标库。至于为什么要选择用vue这个插件，之前只是觉得学了vue可以练练手，做完之后发现vue真的很轻量也很好上手，结合vuex和vue-router基本能完成我项目中的所有需求。</p>
<blockquote><p>在线展示：<a href="http://119.29.57.165:8080/family" rel="nofollow noreferrer" target="_blank">http://119.29.57.165:8080/family</a>    <br>源码：<a href="https://github.com/hieeyh/tong2-family" rel="nofollow noreferrer" target="_blank">https://github.com/hieeyh/tong2-family</a>    <br><strong>本教程是基于你已经有一定vue基础之上的，如果你还不了解什么是vue建议先去学习一下</strong></p></blockquote>
<h2 id="articleHeader1">项目初始构建</h2>
<p>首先全局安装vue-cli，vue-cli是vue自己的项目构建工具，几个简单的步骤就可以帮助你快速构建一个vue项目。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
<p>然后，利用vue-cli构建一个vue项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 创建一个基于 &quot;webpack&quot; 模板的新项目
$ vue init webpack family
# 安装依赖
$ cd family
$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-comment"># 创建一个基于 "webpack" 模板的新项目</span>
<span class="hljs-variable">$ </span>vue init webpack family
<span class="hljs-comment"># 安装依赖</span>
<span class="hljs-variable">$ </span>cd family
<span class="hljs-variable">$ </span>npm install</code></pre>
<h3 id="articleHeader2">项目文件解释</h3>
<ul>
<li><p>build中是webpack基本配置文件，开发环境配置文件，生产环节配置文件</p></li>
<li><p>node_modules是各种依赖模块</p></li>
<li><p>src中是vue组件及入口文件</p></li>
<li><p>static中放置静态文件</p></li>
<li><p>index.html是页面入口文件</p></li>
</ul>
<h2 id="articleHeader3">基本页面实现</h2>
<p>项目创建好之后，就开始实现自己想要的页面了，修改src文件夹下的App.vue文件，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div id=&quot;#app&quot;>
<!-- 导航栏 -->
  <my-head></my-head>
  <my-nav></my-nav>
  <transition>
    <router-view></router-view>
  </transition>
  <my-foot></my-foot>
</div>
</template>

<script>
import myHead from './components/header'
import myNav from './components/nav'
import myFoot from './components/foot'

export default {
  name: 'app',
  components: {
    myHead,
    myNav,
    myFoot
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"#app"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 导航栏 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">transition</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-foot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-foot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> myHead <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/header'</span>
<span class="hljs-keyword">import</span> myNav <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/nav'</span>
<span class="hljs-keyword">import</span> myFoot <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/foot'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
  <span class="hljs-attr">components</span>: {
    myHead,
    myNav,
    myFoot
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>myHead组件是页面头部，myNav组件是页面左侧导航栏，myFoot是页面底部，router-view组件是vue-router中渲染路径匹配到的视图组件。每个组件的具体实现可以去github项目地址去看源码。</p>
<h2 id="articleHeader4">创建配置路由</h2>
<p>显然，我要做的是一个单页面应用，要用到vue-router，先安装vue-router，输入如下命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save vue-router" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save vue-router</span></code></pre>
<p>然后，在src文件夹下面的main.js文件中添加路由相关的代码，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter) 
// 定义路由组件
const Worldcloud = require('./components/cloud.vue')
const Building = require('./components/building.vue')
const Canteen = require('./components/canteen.vue')
const Selfstudy = require('./components/selfstudy.vue')
const Difficult = require('./components/difficult.vue')
const Interest = require('./components/interest.vue')
const Bedroom = require('./components/bedroom.vue')
const Graduate = require('./components/graduate.vue')
const Getup = require('./components/getup.vue')
const Gotobed = require('./components/gotobed.vue')
const Eat = require('./components/eat.vue')
const Amuse = require('./components/amuse.vue')
const Single = require('./components/single.vue')
const Chat = require('./components/chat.vue')
const Onlyme = require('./components/onlyme.vue')

// 定义路由，配置路由映射
const routes = [
  { path: '/', redirect: '/wordcloud' },
  { path: '/wordcloud', component: Worldcloud },
  { path: '/building', component: Building },
  { path: '/canteen', component: Canteen },
  { path: '/selfstudy', component: Selfstudy },
  { path: '/difficult', component: Difficult },
  { path: '/interest', component: Interest },
  { path: '/bedroom', component: Bedroom },
  { path: '/graduate', component: Graduate },
  { path: '/getup', component: Getup },
  { path: '/gotobed', component: Gotobed },
  { path: '/eat', component: Eat },
  { path: '/amuse', component: Amuse },
  { path: '/single', component: Single },
  { path: '/chat', component: Chat },
  { path: '/onlyme', component: Onlyme }
]

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

Vue.use(VueRouter) 
<span class="hljs-comment">// 定义路由组件</span>
<span class="hljs-keyword">const</span> Worldcloud = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/cloud.vue'</span>)
<span class="hljs-keyword">const</span> Building = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/building.vue'</span>)
<span class="hljs-keyword">const</span> Canteen = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/canteen.vue'</span>)
<span class="hljs-keyword">const</span> Selfstudy = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/selfstudy.vue'</span>)
<span class="hljs-keyword">const</span> Difficult = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/difficult.vue'</span>)
<span class="hljs-keyword">const</span> Interest = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/interest.vue'</span>)
<span class="hljs-keyword">const</span> Bedroom = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/bedroom.vue'</span>)
<span class="hljs-keyword">const</span> Graduate = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/graduate.vue'</span>)
<span class="hljs-keyword">const</span> Getup = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/getup.vue'</span>)
<span class="hljs-keyword">const</span> Gotobed = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/gotobed.vue'</span>)
<span class="hljs-keyword">const</span> Eat = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/eat.vue'</span>)
<span class="hljs-keyword">const</span> Amuse = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/amuse.vue'</span>)
<span class="hljs-keyword">const</span> Single = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/single.vue'</span>)
<span class="hljs-keyword">const</span> Chat = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/chat.vue'</span>)
<span class="hljs-keyword">const</span> Onlyme = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./components/onlyme.vue'</span>)

<span class="hljs-comment">// 定义路由，配置路由映射</span>
<span class="hljs-keyword">const</span> routes = [
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/wordcloud'</span> },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/wordcloud'</span>, <span class="hljs-attr">component</span>: Worldcloud },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/building'</span>, <span class="hljs-attr">component</span>: Building },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/canteen'</span>, <span class="hljs-attr">component</span>: Canteen },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/selfstudy'</span>, <span class="hljs-attr">component</span>: Selfstudy },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/difficult'</span>, <span class="hljs-attr">component</span>: Difficult },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/interest'</span>, <span class="hljs-attr">component</span>: Interest },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/bedroom'</span>, <span class="hljs-attr">component</span>: Bedroom },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/graduate'</span>, <span class="hljs-attr">component</span>: Graduate },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/getup'</span>, <span class="hljs-attr">component</span>: Getup },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/gotobed'</span>, <span class="hljs-attr">component</span>: Gotobed },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/eat'</span>, <span class="hljs-attr">component</span>: Eat },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/amuse'</span>, <span class="hljs-attr">component</span>: Amuse },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/single'</span>, <span class="hljs-attr">component</span>: Single },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/chat'</span>, <span class="hljs-attr">component</span>: Chat },
  { <span class="hljs-attr">path</span>: <span class="hljs-string">'/onlyme'</span>, <span class="hljs-attr">component</span>: Onlyme }
]

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;App/&gt;'</span>,
  <span class="hljs-attr">components</span>: { App },
  router
})</code></pre>
<p>从路由映射的配置中可以看出，访问网站的根路由会直接跳转到/wordcloud。路由映射的组件中用到了百度的<a href="http://echarts.baidu.com/" rel="nofollow noreferrer" target="_blank">echarts</a>库，这是一个很好用的图表库。</p>
<h2 id="articleHeader5">怎么画图</h2>
<p>怎么用echarts画图呢？其实官网上有很多实例，下面以bedroom.vue组件为例来简单说明，bedroom.vue代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;main_content&quot;>
    <div id=&quot;bedroom&quot;></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        chart: null,
        opinion: ['学习氛围差', '学习氛围一般', '学习氛围很好'],
        opinionData: [
          {value:26, name:'学习氛围差'},
          {value:31, name:'学习氛围一般'},
          {value:8, name:'学习氛围很好'}
        ]
      }
    },
    methods: {
      drawPie (id) {
        this.chart = echarts.init(document.getElementById(id))
        this.chart.setOption({
          title: {
            text: '寝室学习氛围情况调查',
            left: 'center',
            top: 10,
            textStyle: {
              fontSize: 24,
              fontFamily: 'Helvetica',
              fontWeight: 400
            }
          },
          tooltip: {
            trigger: 'item',
            formatte: &quot;{b}: {c} ({d}%)&quot;
          },
          toolbox: {
            feature: {
              saveAsImage: {},
              dataView: {}
            },
            right: 15,
            top: 10
          },
          legend: {
              orient: 'vertical',
              left: 5,
              top: 10,
              data: this.opinion,
          },
          series: [
            {
              name: '寝室学习氛围',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '60%'],
              avoidLabelOverlap: false,
              label: {
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '24',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.opinionData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffset: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.drawPie('bedroom')
      })
    }
  }
</script>
<style scoped>
#bedroom {
  position: relative;
  left: 50%;
  margin-left: -400px;
  margin-bottom: 70px;
  width: 800px;
  height: 600px;
  border: solid #D01257 1px;
  box-shadow: 0 0 8px #FB90B7;
  border-radius: 10px;
}   
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main_content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"bedroom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> echarts <span class="hljs-keyword">from</span> <span class="hljs-string">'echarts'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">chart</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">opinion</span>: [<span class="hljs-string">'学习氛围差'</span>, <span class="hljs-string">'学习氛围一般'</span>, <span class="hljs-string">'学习氛围很好'</span>],
        <span class="hljs-attr">opinionData</span>: [
          {<span class="hljs-attr">value</span>:<span class="hljs-number">26</span>, <span class="hljs-attr">name</span>:<span class="hljs-string">'学习氛围差'</span>},
          {<span class="hljs-attr">value</span>:<span class="hljs-number">31</span>, <span class="hljs-attr">name</span>:<span class="hljs-string">'学习氛围一般'</span>},
          {<span class="hljs-attr">value</span>:<span class="hljs-number">8</span>, <span class="hljs-attr">name</span>:<span class="hljs-string">'学习氛围很好'</span>}
        ]
      }
    },
    <span class="hljs-attr">methods</span>: {
      drawPie (id) {
        <span class="hljs-keyword">this</span>.chart = echarts.init(<span class="hljs-built_in">document</span>.getElementById(id))
        <span class="hljs-keyword">this</span>.chart.setOption({
          <span class="hljs-attr">title</span>: {
            <span class="hljs-attr">text</span>: <span class="hljs-string">'寝室学习氛围情况调查'</span>,
            <span class="hljs-attr">left</span>: <span class="hljs-string">'center'</span>,
            <span class="hljs-attr">top</span>: <span class="hljs-number">10</span>,
            <span class="hljs-attr">textStyle</span>: {
              <span class="hljs-attr">fontSize</span>: <span class="hljs-number">24</span>,
              <span class="hljs-attr">fontFamily</span>: <span class="hljs-string">'Helvetica'</span>,
              <span class="hljs-attr">fontWeight</span>: <span class="hljs-number">400</span>
            }
          },
          <span class="hljs-attr">tooltip</span>: {
            <span class="hljs-attr">trigger</span>: <span class="hljs-string">'item'</span>,
            <span class="hljs-attr">formatte</span>: <span class="hljs-string">"{b}: {c} ({d}%)"</span>
          },
          <span class="hljs-attr">toolbox</span>: {
            <span class="hljs-attr">feature</span>: {
              <span class="hljs-attr">saveAsImage</span>: {},
              <span class="hljs-attr">dataView</span>: {}
            },
            <span class="hljs-attr">right</span>: <span class="hljs-number">15</span>,
            <span class="hljs-attr">top</span>: <span class="hljs-number">10</span>
          },
          <span class="hljs-attr">legend</span>: {
              <span class="hljs-attr">orient</span>: <span class="hljs-string">'vertical'</span>,
              <span class="hljs-attr">left</span>: <span class="hljs-number">5</span>,
              <span class="hljs-attr">top</span>: <span class="hljs-number">10</span>,
              <span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.opinion,
          },
          <span class="hljs-attr">series</span>: [
            {
              <span class="hljs-attr">name</span>: <span class="hljs-string">'寝室学习氛围'</span>,
              <span class="hljs-attr">type</span>: <span class="hljs-string">'pie'</span>,
              <span class="hljs-attr">radius</span>: [<span class="hljs-string">'50%'</span>, <span class="hljs-string">'70%'</span>],
              <span class="hljs-attr">center</span>: [<span class="hljs-string">'50%'</span>, <span class="hljs-string">'60%'</span>],
              <span class="hljs-attr">avoidLabelOverlap</span>: <span class="hljs-literal">false</span>,
              <span class="hljs-attr">label</span>: {
                <span class="hljs-attr">emphasis</span>: {
                  <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>,
                  <span class="hljs-attr">textStyle</span>: {
                    <span class="hljs-attr">fontSize</span>: <span class="hljs-string">'24'</span>,
                    <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'bold'</span>
                  }
                }
              },
              <span class="hljs-attr">labelLine</span>: {
                <span class="hljs-attr">normal</span>: {
                  <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
                }
              },
              <span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.opinionData,
              <span class="hljs-attr">itemStyle</span>: {
                <span class="hljs-attr">emphasis</span>: {
                  <span class="hljs-attr">shadowBlur</span>: <span class="hljs-number">10</span>,
                  <span class="hljs-attr">shadowOffset</span>: <span class="hljs-number">0</span>,
                  <span class="hljs-attr">shadowColor</span>: <span class="hljs-string">'rgba(0, 0, 0, 0.5)'</span>
                }
              }
            }
          ]
        })
      }
    },
    mounted() {
      <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.drawPie(<span class="hljs-string">'bedroom'</span>)
      })
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#bedroom</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">400px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">70px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">border</span>: solid <span class="hljs-number">#D01257</span> <span class="hljs-number">1px</span>;
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">8px</span> <span class="hljs-number">#FB90B7</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">10px</span>;
}   
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这是一个vue的单文件组件，script中，首先导入echarts库，前提是已经安装了echarts库，输入以下命令安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save echarts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save echarts</span></code></pre>
<p>data对象中是画图要用到的一些数据，drawpie方法用来画图，接收一个DOM对象，然后在mounted构子函数中调用drawpie即可。</p>
<h4>两点说明</h4>
<ol>
<li><p>drawpie方法接收的DOM对象需要有确定的宽高，否则图像不显示</p></li>
<li><p>mounted中要包含vm.$nextTick才能保证该实例已经插入文档</p></li>
</ol>
<h2 id="articleHeader6">实现登录功能</h2>
<p>登录功能基于vuex（vue状态管理）和浏览器的sessionStorage实现的。首先在src文件夹下新建store文件夹，存放vuex的store（仓库）,新建三个文件store.js、login.js、user.js。login.js中存储登录状态，user.js中存储用户登录信息，store.js加载login和user模块。</p>
<p><strong>注意</strong>：在store.js中要引入babel-polyfill（先安装），否则会报错，报错原因是Babel默认只转换新的JavaScript句法，而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法都不会转码。所以必须使用babel-polyfill，为当前环境提供一个垫片。</p>
<p>然后修改main.js文件，引入store：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from './store/store'
...
...
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store/store'</span>
...
...
new Vue({
  el: <span class="hljs-string">'#app'</span>,
  template: <span class="hljs-string">'&lt;App/&gt;'</span>,
  components: { App },
  router,
  store
})</code></pre>
<p>修改App.vue文件，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div id=&quot;#app&quot;>
<!-- 导航栏 -->
  <my-head></my-head>
  <my-nav></my-nav>
  <transition>
    <router-view></router-view>
  </transition>
  <my-mask v-if=&quot;canlogin&quot;></my-mask>
  <my-login v-if=&quot;canlogin&quot;></my-login>
  <my-foot></my-foot>
</div>
</template>
<script>
...
import myMask from './components/mask'
import myLogin from './components/login'

export default {
  ...
  data() {
    return {
      canlogin: false
    }
  },
  computed: {
    canlogin() {
      return this.$store.state.login.islogin
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"#app"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 导航栏 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-head</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-nav</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">transition</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-mask</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"canlogin"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-mask</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-login</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"canlogin"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-login</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">my-foot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-foot</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
...
import myMask <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/mask'</span>
<span class="hljs-keyword">import</span> myLogin <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/login'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  ...
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">canlogin</span>: <span class="hljs-literal">false</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    canlogin() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.state.login.islogin
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>到此，就基本上大功告成了，在命令行中输入 npm run dev预览一下。</p>
<h2 id="articleHeader7">项目发布</h2>
<p>项目可以在本地预览了，但是要怎么发布到网上呢？首先，在命令行中输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>会生成一个dist文件夹，该文件夹中就是我们可以用来发布的代码，直接将代码上传到你的服务器上就可以啦。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue、vuex、vue-router、echarts搭建的数据展示平台

## 原文链接
[https://segmentfault.com/a/1190000007521014](https://segmentfault.com/a/1190000007521014)


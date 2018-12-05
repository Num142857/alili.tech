---
title: '美团小程序框架mpvue入门教程' 
date: 2018-12-06 2:30:09
hidden: true
slug: rjyetjw0l4n
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">美团小程序框架mpvue入门教程</h3>
<p>自打写了 <a href="https://github.com/noahlam/articles/blob/master/%E7%BE%8E%E5%9B%A2%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%A1%86%E6%9E%B6mpvue%E8%B9%B2%E5%9D%91%E6%8C%87%E5%8D%97.md" rel="nofollow noreferrer" target="_blank">美团小程序框架mpvue蹲坑指南</a>,<br>一发不可收拾，今天趁周末空闲，来写个mpvue(没朋友)的简单入门教程，本教程只针对新手，老鸟勿喷。</p>
<p>另外，我还专门为本文做了一个简单的项目，如果懒得从头开始搭项目的童鞋，可以直接去我的<br><a href="https://github.com/noahlam/mpvue-tutorials" rel="nofollow noreferrer" target="_blank">github</a>上克隆到本地，<br>安装一下依赖，即可直接在此基础在开发，不需要做任何配置。如果你觉得该项目对有帮助，<br>请顺便给我Star,你们的支持是我最大的动力，谢谢!</p>
<p>好了，我们进入主题，首先，请允许引用一下美团官方对mpvue的介绍</p>
<blockquote>mpvue是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，mpvue 修改了 Vue.js<br>的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验。</blockquote>
<h3 id="articleHeader1">主要特性</h3>
<blockquote>使用 mpvue 开发小程序，你将在小程序技术体系的基础上获取到这样一些能力：</blockquote>
<ol>
<li>彻底的组件化开发能力：提高代码复用性</li>
<li>完整的 Vue.js 开发体验</li>
<li>方便的 Vuex 数据管理方案：方便构建复杂应用</li>
<li>快捷的 webpack 构建机制：自定义构建策略、开发阶段 hotReload</li>
<li>支持使用 npm 外部依赖</li>
<li>使用 Vue.js 命令行工具 vue-cli 快速初始化项目</li>
<li>H5 代码转换编译成小程序目标代码的能力</li>
</ol>
<h3 id="articleHeader2">开始</h3>
<p>学习最好的方式就动手，我们就徒手撸一个demo项目出来跑一跑，看看到底有没有官方说的那么好。<br>如果你有过vue的开发经历，相信你会对这个过程非常熟悉，甚至你都不需要安装其他工具，<br>直接用vue-cli创建项目，如果你一起没安装过vue-cli，那么你要先运行一下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --g vue-cli
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--g vue-cli</span>
</code></pre>
<p>安装完vue-cli以后，我们就可以运行一下命令，来自动构建一个项目（期间会询问你是否使用一些工具/插件，<br>请根据自己的实际情况选择y或n,对于不懂得该选y还是n的，统统选n）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init mpvue/mpvue-quickstart test-wxapp
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>vue init mpvue/mpvue-quickstart <span class="hljs-built_in">test</span>-wxapp
</code></pre>
<p>然后 进入我们创建的项目，并安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd test-wxapp
npm i
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">cd</span> <span class="hljs-keyword">test</span>-wxapp
npm <span class="hljs-built_in">i</span>
</code></pre>
<p>最后，在运行一下我们的开发服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p>项目就跑起来了，这个时候，我们打开微信开发者工具，选择小程序，然后新建一个，项目目录填<br>我们项目目录下的<code>dist</code>目录 <code>test-wxapp/dist</code>,就可以看到效果了</p>
<h3 id="articleHeader3">进阶</h3>
<p>到此为止，一个基本的项目就完成了，但是，本文的目的不是让你学会搭一个空项目的，空项目的话，我觉得官方教程做的已经够好了。<br>接下来，我们来删掉几个示例文件，然后一步步添加页面.<br>首先，我们看一下项目的配置文件 <code>/src/main.js</code> 里面的初始内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main', '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>

Vue.config.productionTip = <span class="hljs-literal">false</span>
App.mpType = <span class="hljs-string">'app'</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Vue(App)
app.$mount()

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 这个字段走 app.json</span>
  config: {
    <span class="hljs-comment">// 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去</span>
    pages: [<span class="hljs-string">'pages/logs/main'</span>, <span class="hljs-string">'^pages/index/main'</span>],
    <span class="hljs-built_in">window</span>: {
      backgroundTextStyle: <span class="hljs-string">'light'</span>,
      navigationBarBackgroundColor: <span class="hljs-string">'#fff'</span>,
      navigationBarTitleText: <span class="hljs-string">'WeChat'</span>,
      navigationBarTextStyle: <span class="hljs-string">'black'</span>
    }
  }
}
</code></pre>
<p>这里的 <code>config</code> 字段下面的内容，就是整个小程序的全局配置了，其中<code>pages</code>是页面的路由，<code>window</code>则是页面的一些配置（大部分都是顶部栏的配置）<br>，这些配置，最终都会被打包到原生小程序的<code>app.json</code>，对这些配置不了解的，建议看一下微信方法的小程序文档，这里不做赘述。</p>
<p>我们先把<code>/src/pages</code> 下面的<code>counter</code>和<code>logs</code>两个文件夹删掉，只保留一个<code>index</code> ,顺便把 <code>/src/components</code> 文件夹下面的文件也全删掉,<br>然后把<code>/src/main.js</code> 里面的 <code>config.pages</code>里面多余的路由也删掉，只保留一条<code>['^pages/index/main']</code>,这样目前就只有个index页面，</p>
<p>然后我们打开<code>/src/pages/index/index.vue</code> 我们把里面多余的代码删掉，只保留一个基础骨架</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;container&quot;>
       我是首页
  </div>
</template>

<script>

export default {
  data () {
    return { }
  },
  methods: {},

  created () {}
}
</script>

<style scoped>

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
       我是首页
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  data () {
    return { }</span><span class="xml"><span class="undefined">
  },
  methods: </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">,

  created () </span></span><span class="hljs-template-variable">{}</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="undefined">

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<blockquote>tip <code>/src/utils/index.js</code> 是一个公共函数库，里面只有一个简单的格式化日期函数，不要也可以删掉</blockquote>
<p>到目前为止，一个干净的空项目就算是ok了，接下来我们来对微信原生的一些反人类的东西来做一下优化。</p>
<p>一、先用mptoast组件代替官方提供的wx.showToast, wx.showToast诸多不便我就不说了，关键是还有坑<br>小程序基础库比较低的，不管你怎么设置，总是会在弹窗里面加一个钩钩，有时候我想弹出错误消息也是打钩，<br>严重误导用户，字数上还有限制有带icon的不能超过7个字，你说说，你说说 7个字够干嘛的，<br>那我们来看看mptoast,据<a href="https://github.com/noahlam/mpvue-toast" rel="nofollow noreferrer" target="_blank">官方介绍</a>mptoast具有轻量，配置少，冗余少，使用简单，可定制性强等特点</p>
<p>我们开根据官方介绍，从npm引入并配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i vuex
npm i mptoast -D
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>npm <span class="hljs-selector-tag">i</span> vuex
npm <span class="hljs-selector-tag">i</span> mptoast -D
</code></pre>
<p>在项目的主配置文件（一般位于src/main.js）加入以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import mpvueToastRegistry from 'mptoast/registry'
mpvueToastRegistry(Vue)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>import mpvueToastRegistry from <span class="hljs-string">'mptoast/registry'</span>
<span class="hljs-function"><span class="hljs-title">mpvueToastRegistry</span><span class="hljs-params">(Vue)</span></span>
</code></pre>
<p>在你需要弹窗的页面，引入组件，并注册，然后在页面内加入一个你注册的组件，就可以在js里面调用this.$mptoast()了， 以下是一个简单的实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <-- 省略其他代码 -->
    <mptoast />
  </div>
</template>

<script>
import mptoast from 'mptoast'

export default {
  components: {
    mptoast
  },
  data () {
    return {}
  },
  methods: {
    showToast () {
      this.$mptoast('我是提示信息')
    },
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">--</span> 省略其他代码 <span class="hljs-attr">--</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mptoast</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> mptoast <span class="hljs-keyword">from</span> <span class="hljs-string">'mptoast'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    mptoast
  },
  data () {
    <span class="hljs-keyword">return</span> {}
  },
  <span class="hljs-attr">methods</span>: {
    showToast () {
      <span class="hljs-keyword">this</span>.$mptoast(<span class="hljs-string">'我是提示信息'</span>)
    },
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>使用起来还是蛮简单的</p>
<p>二，用promise封装异步请求函数<br>在小程序的环境下面，要想发送一个外部请求，我们只能使用小程序官方提供的wx.request方法，<br>但是该方法的代码风跟跟Jquery年代的Ajax一样，都散靠回调来处理请求响应，如果有很多层回调，<br>就会有很多层嵌套，这让我们这些平时被async-await惯坏的人怎么接受？</p>
<p>所以，建完基本项目，我们要做的第一件事，就是用wx.request自己封装一个基于promise的异步请求方法。<br>我们先来看一下 wx.request的一个官方示例代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
     x: '' ,
     y: ''
  },
  header: {
      'content-type': 'application/json' // 默认值
  },
  success: function(res) {
    console.log(res.data)
  }
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.request</span>({
  <span class="hljs-attribute">url</span>: <span class="hljs-string">'test.php'</span>, <span class="hljs-comment">//仅为示例，并非真实的接口地址</span>
  <span class="hljs-attribute">data</span>: {
     <span class="hljs-attribute">x</span>: <span class="hljs-string">''</span> ,
     <span class="hljs-attribute">y</span>: <span class="hljs-string">''</span>
  },
  <span class="hljs-attribute">header</span>: {
      <span class="hljs-string">'content-type'</span>: <span class="hljs-string">'application/json'</span> <span class="hljs-comment">// 默认值</span>
  },
  <span class="hljs-attribute">success</span>: function(res) {
    console.log(res.data)
  }
})
</code></pre>
<p>可以看到，每次请求都要发送一大堆的东西，重点少这些东西里面，很可能对于一个项目来说，<br>绝大部分都是固定不变的，那这样，不是冗余了么。</p>
<blockquote>tip: 更多wx.request参数，请参考 <a href="https://developers.weixin.qq.com/miniprogram/dev/api/network-request.html" rel="nofollow noreferrer" target="_blank">微信官方文档</a>
</blockquote>
<p>我们分析一下，第一个参数是url,也就是我们请求的地址，这个应该是每次都不一样的，但是，不一样的应该也只是url的最后一部分，<br>接口名称的位置不一样，前面的服务器地址一般都是一样的，例如<code>http://www.abc.com/api/member/login</code> 对于同一个项目的所有接口<br>服务器地址<code>http://www.abc.com/api/</code>应该都是一样的，不一样的只是后面的接口名称<code>member/login</code>,<br>那我们可以把url拆分成 <code>服务器地址</code> + <code>接口名称</code>，这样做也方便后期上线的时候，切换服务器地址。</p>
<p>第二个参数是请求的参数，请求的参数应该是每次都不一样的，所以这个我们就不做修改（事实上实际应用中，<br>经常有可能出现需要每个接口都带一个token的，我们也可以在这里统一加上去，不过这里就不做深入）</p>
<p>第三个参数是 请求头，这个一般同一个项目里面，这些都是一样的，所以我们就写死。 这里还有一个参数<code>method</code>请求方法，<br>这里因为使用默认值GET，所以就没列出，我们这边需要做设置，因为现在前后分离的模式，现在基本上大部分都是POST请求，所以我们这边也写死成method:'POST'</p>
<p>最后一个就是处理请求结果回调函数，示例里面只有一个请求成功的回调，其实我们应该再加一个请求实例的处理函数，<br><code>fail</code>，而我们封装这个函数的重点，就是要用promise来处理这两个回调函数，使它们可以用async-await的语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 假设以下代码在 `/src/utils/requestMethod.js`

let serverPath = 'http://www.abc.com/api/'
export function post(url,body) {
    return new Promise((resolve,reject) => {
        wx.request({
              url: serverPath + url    // 拼接完整的url
              data: body
              method:'POST',
              header: {
                  'content-type': 'application/json'
              },
              success(res) {
                resolve(res.data)  // 把返回的数据传出去
              },
              fail(ret) {
                reject(ret)   // 把错误信息传出去
              }
            })
    })
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 假设以下代码在 `/src/utils/requestMethod.js`</span>

<span class="hljs-keyword">let</span> serverPath = <span class="hljs-string">'http://www.abc.com/api/'</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span>(<span class="hljs-params">url,body</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>) =&gt;</span> {
        wx.request({
              <span class="hljs-attr">url</span>: serverPath + url    <span class="hljs-comment">// 拼接完整的url</span>
              data: body
              method:<span class="hljs-string">'POST'</span>,
              <span class="hljs-attr">header</span>: {
                  <span class="hljs-string">'content-type'</span>: <span class="hljs-string">'application/json'</span>
              },
              success(res) {
                resolve(res.data)  <span class="hljs-comment">// 把返回的数据传出去</span>
              },
              fail(ret) {
                reject(ret)   <span class="hljs-comment">// 把错误信息传出去</span>
              }
            })
    })
}

</code></pre>
<p>有了这样的封装，我们就可以在其他地方引入 上面这个文件，然后使用post函数请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {post} from '/src/utils/requestMethod.js'
// 需要注意的是，这行代码必须要在async修饰的函数里面才能正确调用
let res = await post('member/login',{name:myname})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> {post} <span class="hljs-keyword">from</span> <span class="hljs-string">'/src/utils/requestMethod.js'</span>
<span class="hljs-comment">// 需要注意的是，这行代码必须要在async修饰的函数里面才能正确调用</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> post(<span class="hljs-string">'member/login'</span>,{<span class="hljs-attr">name</span>:myname})
</code></pre>
<p>如果你觉得每次都要import这个文件很麻烦,那我们也可以把它挂在到Vue(mpvue)的原型(prototype)上，我们打开<code>/src/main.js</code>文件，然后在里面加入以下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {post} from '/src/utils/requestMethod.js'
Vue.prototype.$post = post
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code><span class="hljs-keyword">import</span> {post} from '/src/utils/requestMethod.js'
<span class="hljs-type">Vue</span>.proto<span class="hljs-keyword">type</span>.$post = post
</code></pre>
<p>这样，我们就可以在Vue(mpvue)的所有实例里面，直接使用 this.$post()来调用，只要一行代码，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这行代码同样需要在async修饰的函数里面才能正确调用
let res = await this.$post('member/login',{name:myname})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 这行代码同样需要在async修饰的函数里面才能正确调用</span>
<span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.$post(<span class="hljs-string">'member/login'</span>,{name:myname})
</code></pre>
<p>怎么样？是不是比原生的方便很多呢？</p>
<h3 id="articleHeader4">结束语</h3>
<p>当然，跑起来以后，你可能还会遇到各种问题，这里我有对我自己遇到的问题做了一些总结<br><a href="https://github.com/noahlam/articles/blob/master/%E7%BE%8E%E5%9B%A2%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%A1%86%E6%9E%B6mpvue%E8%B9%B2%E5%9D%91%E6%8C%87%E5%8D%97.md" rel="nofollow noreferrer" target="_blank">美团小程序框架mpvue蹲坑指南</a>，希望对你有帮助,<br>还有<a href="http://mpvue.com/mpvue/#_2" rel="nofollow noreferrer" target="_blank">官方文档</a>也是很不错的哦</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
美团小程序框架mpvue入门教程

## 原文链接
[https://segmentfault.com/a/1190000014331194](https://segmentfault.com/a/1190000014331194)


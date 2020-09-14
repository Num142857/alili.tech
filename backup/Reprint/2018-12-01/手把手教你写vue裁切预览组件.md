---
title: '手把手教你写vue裁切预览组件' 
date: 2018-12-01 2:30:12
hidden: true
slug: o6sg7qmt7p
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>vue版本裁切工具，包含预览功能</blockquote>
<p>最终效果： <a href="https://qiuyaofan.github.io/vue-crop-demo/" rel="nofollow noreferrer" target="_blank">https://qiuyaofan.github.io/vue-crop-demo/</a> </p>
<p>源码地址： <a href="https://github.com/qiuyaofan/vue-crop" rel="nofollow noreferrer" target="_blank">https://github.com/qiuyaofan/vue-crop</a></p>
<h4>第一步：先用vue-cli安装脚手架（不会安装的看 <a href="https://www.npmjs.com/package/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli官网</a>）</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 初始化vue-cli
vue init webpack my-plugin" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 初始化vue-cli</span>
vue init webpack my-<span class="hljs-keyword">plugin</span></code></pre>
<h4>第二步：创建文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="新建src/views/validSlideDemo.vue,

src/components里新建VueCrop/index.js,VueCrop.vue，

在routes/index.js配置访问路由（具体看github源码）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>新建src/views/validSlideDemo<span class="hljs-selector-class">.vue</span>,

src/components里新建VueCrop/index<span class="hljs-selector-class">.js</span>,VueCrop.vue，

在routes/index.js配置访问路由（具体看github源码）</code></pre>
<p>最终生成的文件结构如下图:<br><span class="img-wrap"><img data-src="/img/bV982Q?w=1678&amp;h=808" src="https://static.alili.tech/img/bV982Q?w=1678&amp;h=808" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>第三步：注册组件</h4>
<h5>1.引用所有插件：src/components/index.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 导入插件入口文件
import VueCrop from './VueCrop/index.js'
const install = function (Vue, opts = {}) {
  /* 如果已安装就跳过 */
  if (install.installed) return
  
  // 注册插件
  Vue.component(VueCrop.name, VueCrop)
}

// 全局情况下注册插件
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  install(window.Vue)
}

export {
  install,
  // 此处是为了兼容在vue内单独引入这个插件，如果是main.js全局引入就可以去掉
  VueCrop
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 导入插件入口文件</span>
<span class="hljs-keyword">import</span> VueCrop <span class="hljs-keyword">from</span> <span class="hljs-string">'./VueCrop/index.js'</span>
<span class="hljs-keyword">const</span> install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue, opts = {}</span>) </span>{
  <span class="hljs-comment">/* 如果已安装就跳过 */</span>
  <span class="hljs-keyword">if</span> (install.installed) <span class="hljs-keyword">return</span>
  
  <span class="hljs-comment">// 注册插件</span>
  Vue.component(VueCrop.name, VueCrop)
}

<span class="hljs-comment">// 全局情况下注册插件</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  install(<span class="hljs-built_in">window</span>.Vue)
}

<span class="hljs-keyword">export</span> {
  install,
  <span class="hljs-comment">// 此处是为了兼容在vue内单独引入这个插件，如果是main.js全局引入就可以去掉</span>
  VueCrop
}</code></pre>
<h5>2.全局调用插件：src/main.js （ <a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">vue plugins官方文档解说install</a>）</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import App from './App'
import router from './router'

// 新加的：导入入口文件
import { install } from 'src/components/index.js'

// 全局调用，相当于调用 `MyPlugin.install(Vue)`
Vue.use(install)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'./App'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'./router'</span>

<span class="hljs-comment">// 新加的：导入入口文件</span>
<span class="hljs-keyword">import</span> { install } <span class="hljs-keyword">from</span> <span class="hljs-string">'src/components/index.js'</span>

<span class="hljs-comment">// 全局调用，相当于调用 `MyPlugin.install(Vue)`</span>
Vue.use(install)

Vue.config.productionTip = <span class="hljs-keyword">false</span>
<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  router,
  components: { App },
  template: <span class="hljs-string">'&lt;App/&gt;'</span>
})</code></pre>
<h5>3.VueCrop入口文件调用VueCrop.vue：src/components/VueCrop/index.js</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 导入vue
import VueCrop from './VueCrop.vue'

// Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器
VueCrop.install = function (Vue) {
  // 注册组件
  Vue.component(VueCrop.name, VueCrop)
}

export default VueCrop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 导入vue</span>
<span class="hljs-keyword">import</span> VueCrop <span class="hljs-keyword">from</span> <span class="hljs-string">'./VueCrop.vue'</span>

<span class="hljs-comment">// Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器</span>
VueCrop.install = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Vue</span>) </span>{
  <span class="hljs-comment">// 注册组件</span>
  Vue.component(VueCrop.name, VueCrop)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> VueCrop</code></pre>
<h5>小结：我一开始一直有个误解，以为myPlugin.install是vue的一个方法，其实不是，他只是我们构造plugin识的一个公开方法，可以理解为原生js中的构造函数的方法：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyPlugin(){
  console.info('构造函数')
}
MyPlugin.prototype.install=function(vue,options){
    console.info('构造器vue:'+vue);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyPlugin</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'构造函数'</span>)
}
MyPlugin.prototype.install=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">vue,options</span>)</span>{
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'构造器vue:'</span>+vue);
}</code></pre>
<p>而真正注册组件的是：Vue.component()</p>
<p>所以，vue插件注册的过程是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.调用main.js中：
import { install } from 'src/components/index.js'
vue.use(install)

2.index.js添加install方法，调用Vue.component注册组件

3.组件内的index.js同所有组件的index.js一样" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs flix"><code><span class="hljs-number">1.</span>调用main.js中：
<span class="hljs-keyword">import</span> { install } from 'src/components/<span class="hljs-keyword">index</span>.js'
vue.use(install)

<span class="hljs-number">2.</span><span class="hljs-keyword">index</span>.js添加install方法，调用Vue.component注册组件

<span class="hljs-number">3.</span>组件内的<span class="hljs-keyword">index</span>.js同所有组件的<span class="hljs-keyword">index</span>.js一样</code></pre>
<h4>第四步：设计开发自己的组件，构建组件结构</h4>
<blockquote>在此之前，可以先了解下组件的命名规范等，可参考文章 <a href="https://juejin.im/post/5ada9b586fb9a07aaf34c746?utm_source=gold_browser_extension" rel="nofollow noreferrer" target="_blank">掘金：Vue前端开发规范</a>，其中第2点有详细讲解</blockquote>
<p>首先，确定自己的调用方式和需要暴露的参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<vue-crop
:crop-url=&quot;cropUrl1&quot;
:ratio=&quot;ratio&quot;
:height=&quot;460&quot;
:width=&quot;460&quot;
:previewJson=&quot;previewJson1&quot;
class=&quot;c-crop--preview_right&quot;
@afterCrop=&quot;afterCrop&quot;
>
>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;vue-crop
<span class="hljs-symbol">:crop-url=<span class="hljs-string">"cropUrl1"</span></span>
<span class="hljs-symbol">:ratio=<span class="hljs-string">"ratio"</span></span>
<span class="hljs-symbol">:height=<span class="hljs-string">"460"</span></span>
<span class="hljs-symbol">:width=<span class="hljs-string">"460"</span></span>
<span class="hljs-symbol">:previewJson=<span class="hljs-string">"previewJson1"</span></span>
class=<span class="hljs-string">"c-crop--preview_right"</span>
<span class="hljs-variable">@afterCrop</span>=<span class="hljs-string">"afterCrop"</span>
&gt;
&gt;</code></pre>
<p>其中，@afterCrop="afterCrop"是裁切完成的回调函数，其他是属性配置</p>
<p>在组件src/components/VueCrop/VueCrop.vue内，可以用this.$emit('afterCrop')触发demo里的afterCrop事件</p>
<p>组件结构上，主要分为：裁切主体部分（VueCrop.vue），选框组件（VueCropTool.vue）,裁切框宽度、位置坐标等计算（VueCropMove.js）,拖拽事件注册公共js（components/utils/draggable.js）</p>
<h5>当前裁切插件的总体思路</h5>
<ol>
<li>裁切插件的裁切主体由图片，选框，预览结构组成</li>
<li>选框（VueCropTool.vue）负责拖拽改变其大小，坐标位置等并返回给VueCrop.vue</li>
<li>主体计算数值同步预览显示（c-crop--preview）</li>
<li>主体触发调用页面（VueCropDemo.vue）的afterCrop事件，从而传递参数返回裁切后的url,left,top,bottom,right,x,y,w,h等</li>
</ol>
<blockquote>备注：此组件不具备真实的裁切功能，最终的裁切是传递给后台去裁，你如果想扩展可以在afterCrop函数里根据坐标等信息进行处理</blockquote>
<p>接下来我们对各个组件和js进行讲解</p>
<h5>1.draggable.js是参照element里的，修改了一部分，源码如下</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (element, options) {
  const moveFn = function (event) {
    if (options.drag) {
      options.drag(event)
    }
  }
  // mousedown fn
  const downFn = function (event) {
    if (options.start) {
        // 调用参数中start函数
      options.start(event)
    }
  }
  // mouseup fn
  const upFn = function (event) {
    document.removeEventListener('mousemove', moveFn)
    document.removeEventListener('mouseup', upFn)
    document.onselectstart = null
    document.ondragstart = null

    if (options.end) {
        // 调用参数中end函数
      options.end(event)
    }
  }
  // 绑定事件
  element.addEventListener('mousedown', event => {
    if (options.stop &amp;&amp; options.stop(event, element) === false) {
      return false
    }
    document.onselectstart = function () {
      return false
    }
    document.ondragstart = function () {
      return false
    }
    document.addEventListener('mousedown', downFn)
    document.addEventListener('mousemove', moveFn)
    document.addEventListener('mouseup', upFn)
  })
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, options</span>) </span>{
  <span class="hljs-keyword">const</span> moveFn = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">if</span> (options.drag) {
      options.drag(event)
    }
  }
  <span class="hljs-comment">// mousedown fn</span>
  <span class="hljs-keyword">const</span> downFn = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">if</span> (options.start) {
        <span class="hljs-comment">// 调用参数中start函数</span>
      options.start(event)
    }
  }
  <span class="hljs-comment">// mouseup fn</span>
  <span class="hljs-keyword">const</span> upFn = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mousemove'</span>, moveFn)
    <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'mouseup'</span>, upFn)
    <span class="hljs-built_in">document</span>.onselectstart = <span class="hljs-literal">null</span>
    <span class="hljs-built_in">document</span>.ondragstart = <span class="hljs-literal">null</span>

    <span class="hljs-keyword">if</span> (options.end) {
        <span class="hljs-comment">// 调用参数中end函数</span>
      options.end(event)
    }
  }
  <span class="hljs-comment">// 绑定事件</span>
  element.addEventListener(<span class="hljs-string">'mousedown'</span>, event =&gt; {
    <span class="hljs-keyword">if</span> (options.stop &amp;&amp; options.stop(event, element) === <span class="hljs-literal">false</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-built_in">document</span>.onselectstart = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-built_in">document</span>.ondragstart = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousedown'</span>, downFn)
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousemove'</span>, moveFn)
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mouseup'</span>, upFn)
  })
}
</code></pre>
<h5>VueCropTool.vue使用如下</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="draggable(this.$el.querySelector('.c-crop--drap_screen'), {
    start: (event) => {
      this.startPos = [event.x, event.y]
    },
    drag: (event) => {
      this.handleDragLocation(event)
    },
    end: (event) => {
      this.handleDragLocation(event)
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>draggable(<span class="hljs-keyword">this</span>.$el.querySelector(<span class="hljs-string">'.c-crop--drap_screen'</span>), {
    start: <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.startPos = [event.x, event.y]
    },
    drag: <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.handleDragLocation(event)
    },
    end: <span class="hljs-function"><span class="hljs-params">(event)</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.handleDragLocation(event)
    }
})</code></pre>
<h5>2.裁切主体部分（<a href="https://github.com/qiuyaofan/vue-crop/blob/master/src/components/VueCrop/VueCrop.vue" rel="nofollow noreferrer" target="_blank">VueCrop.vue全部源码链接</a>）</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//script部分
<script>
import VueCropTool from './VueCropTool.vue'
export default {
  name: 'VueCrop',
  data () {
    return {
      // 根据裁切后的缩放和坐标等生成的预览尺寸坐标数组
      previewImgSize: null,
      // 图片初始数据
      originImgSize: null,
      // 裁切框宽度
      elWidth: 0,
      // 裁切框高度
      elHeight: 0,
      // 裁切框top
      cursorTop: 0,
      // 裁切框left
      cursorLeft: 0,
      // 根据当前的容器宽高计算出的图片尺寸
      imgH: 0,
      imgW: 0,
      // 图片url
      url: this.cropUrl,
      // 为适应当前的容器对原始图片的缩放值
      scale: 1,
      // 根据当前选区和原始图片缩放前的尺寸，来得到最终的裁切尺寸
      coord: null,
      // 计算出的裁切框的初始值
      cropJson: {
        cw: null,
        ch: null,
        w: null,
        h: null,
        r: null
      }
    }
  },
  // 暴露出去的参数，具体解释可看前文的表格
  props: {
    cropUrl: String,
    // 比例
    ratio: {
      type: null,
      default: false
    },
    width: null,
    height: null,
    coordWidth: null,
    coordHeight: null,
    previewJson: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    VueCropTool
  },
  created () {
  },
  watch: {
      // 监听图片路径变化
    cropUrl (val) {
      this.url = val
      // setTimeout是为了兼容马上获取尺寸获取不到的情况
      setTimeout(() => {
        this.setSize()
      }, 200)
    }
  },
  methods: {
       // 更新拖拽尺寸，大部分由裁切框组件通过@updateSize触发
    drapSizeUpdate (w, h, t, l) {
      // 更新裁切框尺寸
      this.elWidth = w
      this.elHeight = h
      this.cursorTop = t
      this.cursorLeft = l
      // 根据当前选区获取原始图片缩放前的尺寸（还原原始图片的宽高以获取最终裁切数据）
      this.coord = this.getCoord(l, t, w, h)
      // 更新预览尺寸
      this.setPreviewSize(this.coord)
    },
    // 裁切完毕回调
    afterCrop () {
      this.$emit('afterCrop', this.coord, this.url)
    },
    // 设置preview尺寸
    setPreviewSize (coord) {
      if (!this.previewJson.length) {
        return false
      }
      let result = this.previewJson.map(data => {
           // 计算缩放比
        let scale = data.width / coord.w
        return {
          scale,
          l: -scale * coord.l,
          t: -scale * coord.t,
          w: scale * this.originImgSize.w,
          h: scale * this.originImgSize.h
        }
      })
      this.previewImgSize = result
    },
    // 设置裁切显示的图片尺寸，存储scale值
    async setSize () {
      if (!this.url) {
        return
      }
      let imgSize = await this.getSize(this.url)
      this.originImgSize = imgSize
      this.setCoordRange()
      this.scale = imgSize.w / this.imgW
      this.cursorTop = 0
      this.cursorLeft = 0
      let json = {...this.cropJson}
      json.w = this.imgW
      json.h = this.imgH
      // 有固定比例，则按比例截取
      if (this.ratio) {
        json.r = this.ratio
        if (json.w > json.h) {
          let r = json.h * this.ratio / json.w
          if (r > 1) {
            json.ch = json.h / r
            json.cw = json.ch * this.ratio
          } else {
            json.ch = json.h
            json.cw = json.ch * this.ratio
          }
        } else {
          let r = json.w / this.ratio / json.h
          if (r > 1) {
            json.cw = json.w / r
            json.ch = json.cw / this.ratio
          } else {
            json.cw = json.w
            json.ch = json.cw / this.ratio
          }
        }
      } else {
           // 无比例
        json.cw = json.w
        json.ch = json.h
      }
      // 裁切框的尺寸（/2是取一半的值，使裁切框居中并宽度为一半）
      this.elWidth = json.cw / 2
      this.elHeight = json.ch / 2
      this.cursorTop = json.ch / 4
      this.cursorLeft = json.cw / 4
      this.cropJson = {...json}
      this.drapSizeUpdate(this.elWidth, this.elHeight, this.cursorTop, this.cursorLeft)
    },
    // 根据图片原本的尺寸比例和用户传入的尺寸宽高设置当前可显示的区域图片尺寸
    setCoordRange () {
      var size = {...this.originImgSize}
      var ratio1 = this.width / this.height
      var ratio2 = size.r
      if (ratio2 > ratio1) {
        this.imgW = this.width
        this.imgH = this.width / size.r
      } else {
        this.imgH = this.height
        this.imgW = this.height * size.r
      }
    },
    // 获取裁切后的原始坐标宽高（裁切看到的宽高不是原始图片的宽高）
    getCoord (l, t, w, h) {
      l = this.scale * l
      t = this.scale * t
      w = this.scale * w
      h = this.scale * h
      return {
        p0: [l, t],
        p1: [l + w, t],
        p2: [l + w, t + h],
        p3: [l, t + h],
        w: w,
        h: h,
        l: l,
        t: t
      }
    },
    // 获取是src图片的尺寸
    getSize (src) {
      let _this = this
      let img = this.$el.querySelector('#c-crop--hide_img')
      return new Promise(resolve => {
        if (src &amp;&amp; img) {
          img.onload = function () {
            const size = _this.getSizeImg(img)
            resolve(size)
          }
          img.src = src
        } else {
          resolve({
            w: 0,
            h: 0,
            r: 0
          })
        }
      })
    },
    // 获取原始图片的真实宽高、比例
    getSizeImg (img) {
      let w = img.width
      let h = img.height
      let r = w === 0 &amp;&amp; h === 0 ? 0 : w / h
      return {
        w: w,
        h: h,
        r: r
      }
    }

  },
  mounted () {
    this.setSize()
  }

}

</script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//script部分</span>
&lt;script&gt;
<span class="hljs-keyword">import</span> VueCropTool from <span class="hljs-string">'./VueCropTool.vue'</span>
export <span class="hljs-keyword">default</span> {
  name: <span class="hljs-string">'VueCrop'</span>,
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// 根据裁切后的缩放和坐标等生成的预览尺寸坐标数组</span>
      previewImgSize: <span class="hljs-literal">null</span>,
      <span class="hljs-comment">// 图片初始数据</span>
      originImgSize: <span class="hljs-literal">null</span>,
      <span class="hljs-comment">// 裁切框宽度</span>
      elWidth: <span class="hljs-number">0</span>,
      <span class="hljs-comment">// 裁切框高度</span>
      elHeight: <span class="hljs-number">0</span>,
      <span class="hljs-comment">// 裁切框top</span>
      cursorTop: <span class="hljs-number">0</span>,
      <span class="hljs-comment">// 裁切框left</span>
      cursorLeft: <span class="hljs-number">0</span>,
      <span class="hljs-comment">// 根据当前的容器宽高计算出的图片尺寸</span>
      imgH: <span class="hljs-number">0</span>,
      imgW: <span class="hljs-number">0</span>,
      <span class="hljs-comment">// 图片url</span>
      url: <span class="hljs-keyword">this</span>.cropUrl,
      <span class="hljs-comment">// 为适应当前的容器对原始图片的缩放值</span>
      scale: <span class="hljs-number">1</span>,
      <span class="hljs-comment">// 根据当前选区和原始图片缩放前的尺寸，来得到最终的裁切尺寸</span>
      coord: <span class="hljs-literal">null</span>,
      <span class="hljs-comment">// 计算出的裁切框的初始值</span>
      cropJson: {
        cw: <span class="hljs-literal">null</span>,
        ch: <span class="hljs-literal">null</span>,
        w: <span class="hljs-literal">null</span>,
        h: <span class="hljs-literal">null</span>,
        r: <span class="hljs-literal">null</span>
      }
    }
  },
  <span class="hljs-comment">// 暴露出去的参数，具体解释可看前文的表格</span>
  props: {
    cropUrl: String,
    <span class="hljs-comment">// 比例</span>
    ratio: {
      type: <span class="hljs-literal">null</span>,
      <span class="hljs-keyword">default</span>: <span class="hljs-literal">false</span>
    },
    width: <span class="hljs-literal">null</span>,
    height: <span class="hljs-literal">null</span>,
    coordWidth: <span class="hljs-literal">null</span>,
    coordHeight: <span class="hljs-literal">null</span>,
    previewJson: {
      type: Array,
      <span class="hljs-keyword">default</span>: function () {
        <span class="hljs-keyword">return</span> []
      }
    }
  },
  components: {
    VueCropTool
  },
  created () {
  },
  watch: {
      <span class="hljs-comment">// 监听图片路径变化</span>
    cropUrl (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.url = <span class="hljs-keyword">val</span>
      <span class="hljs-comment">// setTimeout是为了兼容马上获取尺寸获取不到的情况</span>
      setTimeout(() =&gt; {
        <span class="hljs-keyword">this</span>.setSize()
      }, <span class="hljs-number">200</span>)
    }
  },
  methods: {
       <span class="hljs-comment">// 更新拖拽尺寸，大部分由裁切框组件通过@updateSize触发</span>
    drapSizeUpdate (w, h, t, l) {
      <span class="hljs-comment">// 更新裁切框尺寸</span>
      <span class="hljs-keyword">this</span>.elWidth = w
      <span class="hljs-keyword">this</span>.elHeight = h
      <span class="hljs-keyword">this</span>.cursorTop = t
      <span class="hljs-keyword">this</span>.cursorLeft = l
      <span class="hljs-comment">// 根据当前选区获取原始图片缩放前的尺寸（还原原始图片的宽高以获取最终裁切数据）</span>
      <span class="hljs-keyword">this</span>.coord = <span class="hljs-keyword">this</span>.getCoord(l, t, w, h)
      <span class="hljs-comment">// 更新预览尺寸</span>
      <span class="hljs-keyword">this</span>.setPreviewSize(<span class="hljs-keyword">this</span>.coord)
    },
    <span class="hljs-comment">// 裁切完毕回调</span>
    afterCrop () {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'afterCrop'</span>, <span class="hljs-keyword">this</span>.coord, <span class="hljs-keyword">this</span>.url)
    },
    <span class="hljs-comment">// 设置preview尺寸</span>
    setPreviewSize (coord) {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.previewJson.length) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
      }
      let result = <span class="hljs-keyword">this</span>.previewJson.map(<span class="hljs-keyword">data</span> =&gt; {
           <span class="hljs-comment">// 计算缩放比</span>
        let scale = <span class="hljs-keyword">data</span>.width / coord.w
        <span class="hljs-keyword">return</span> {
          scale,
          l: -scale * coord.l,
          t: -scale * coord.t,
          w: scale * <span class="hljs-keyword">this</span>.originImgSize.w,
          h: scale * <span class="hljs-keyword">this</span>.originImgSize.h
        }
      })
      <span class="hljs-keyword">this</span>.previewImgSize = result
    },
    <span class="hljs-comment">// 设置裁切显示的图片尺寸，存储scale值</span>
    async setSize () {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.url) {
        <span class="hljs-keyword">return</span>
      }
      let imgSize = await <span class="hljs-keyword">this</span>.getSize(<span class="hljs-keyword">this</span>.url)
      <span class="hljs-keyword">this</span>.originImgSize = imgSize
      <span class="hljs-keyword">this</span>.setCoordRange()
      <span class="hljs-keyword">this</span>.scale = imgSize.w / <span class="hljs-keyword">this</span>.imgW
      <span class="hljs-keyword">this</span>.cursorTop = <span class="hljs-number">0</span>
      <span class="hljs-keyword">this</span>.cursorLeft = <span class="hljs-number">0</span>
      let json = {...<span class="hljs-keyword">this</span>.cropJson}
      json.w = <span class="hljs-keyword">this</span>.imgW
      json.h = <span class="hljs-keyword">this</span>.imgH
      <span class="hljs-comment">// 有固定比例，则按比例截取</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.ratio) {
        json.r = <span class="hljs-keyword">this</span>.ratio
        <span class="hljs-keyword">if</span> (json.w &gt; json.h) {
          let r = json.h * <span class="hljs-keyword">this</span>.ratio / json.w
          <span class="hljs-keyword">if</span> (r &gt; <span class="hljs-number">1</span>) {
            json.ch = json.h / r
            json.cw = json.ch * <span class="hljs-keyword">this</span>.ratio
          } <span class="hljs-keyword">else</span> {
            json.ch = json.h
            json.cw = json.ch * <span class="hljs-keyword">this</span>.ratio
          }
        } <span class="hljs-keyword">else</span> {
          let r = json.w / <span class="hljs-keyword">this</span>.ratio / json.h
          <span class="hljs-keyword">if</span> (r &gt; <span class="hljs-number">1</span>) {
            json.cw = json.w / r
            json.ch = json.cw / <span class="hljs-keyword">this</span>.ratio
          } <span class="hljs-keyword">else</span> {
            json.cw = json.w
            json.ch = json.cw / <span class="hljs-keyword">this</span>.ratio
          }
        }
      } <span class="hljs-keyword">else</span> {
           <span class="hljs-comment">// 无比例</span>
        json.cw = json.w
        json.ch = json.h
      }
      <span class="hljs-comment">// 裁切框的尺寸（/2是取一半的值，使裁切框居中并宽度为一半）</span>
      <span class="hljs-keyword">this</span>.elWidth = json.cw / <span class="hljs-number">2</span>
      <span class="hljs-keyword">this</span>.elHeight = json.ch / <span class="hljs-number">2</span>
      <span class="hljs-keyword">this</span>.cursorTop = json.ch / <span class="hljs-number">4</span>
      <span class="hljs-keyword">this</span>.cursorLeft = json.cw / <span class="hljs-number">4</span>
      <span class="hljs-keyword">this</span>.cropJson = {...json}
      <span class="hljs-keyword">this</span>.drapSizeUpdate(<span class="hljs-keyword">this</span>.elWidth, <span class="hljs-keyword">this</span>.elHeight, <span class="hljs-keyword">this</span>.cursorTop, <span class="hljs-keyword">this</span>.cursorLeft)
    },
    <span class="hljs-comment">// 根据图片原本的尺寸比例和用户传入的尺寸宽高设置当前可显示的区域图片尺寸</span>
    setCoordRange () {
      <span class="hljs-keyword">var</span> size = {...<span class="hljs-keyword">this</span>.originImgSize}
      <span class="hljs-keyword">var</span> ratio1 = <span class="hljs-keyword">this</span>.width / <span class="hljs-keyword">this</span>.height
      <span class="hljs-keyword">var</span> ratio2 = size.r
      <span class="hljs-keyword">if</span> (ratio2 &gt; ratio1) {
        <span class="hljs-keyword">this</span>.imgW = <span class="hljs-keyword">this</span>.width
        <span class="hljs-keyword">this</span>.imgH = <span class="hljs-keyword">this</span>.width / size.r
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.imgH = <span class="hljs-keyword">this</span>.height
        <span class="hljs-keyword">this</span>.imgW = <span class="hljs-keyword">this</span>.height * size.r
      }
    },
    <span class="hljs-comment">// 获取裁切后的原始坐标宽高（裁切看到的宽高不是原始图片的宽高）</span>
    getCoord (l, t, w, h) {
      l = <span class="hljs-keyword">this</span>.scale * l
      t = <span class="hljs-keyword">this</span>.scale * t
      w = <span class="hljs-keyword">this</span>.scale * w
      h = <span class="hljs-keyword">this</span>.scale * h
      <span class="hljs-keyword">return</span> {
        p0: [l, t],
        p1: [l + w, t],
        p2: [l + w, t + h],
        p3: [l, t + h],
        w: w,
        h: h,
        l: l,
        t: t
      }
    },
    <span class="hljs-comment">// 获取是src图片的尺寸</span>
    getSize (src) {
      let _this = <span class="hljs-keyword">this</span>
      let img = <span class="hljs-keyword">this</span>.$el.querySelector(<span class="hljs-string">'#c-crop--hide_img'</span>)
      <span class="hljs-keyword">return</span> new Promise(resolve =&gt; {
        <span class="hljs-keyword">if</span> (src &amp;&amp; img) {
          img.onload = function () {
            const size = _this.getSizeImg(img)
            resolve(size)
          }
          img.src = src
        } <span class="hljs-keyword">else</span> {
          resolve({
            w: <span class="hljs-number">0</span>,
            h: <span class="hljs-number">0</span>,
            r: <span class="hljs-number">0</span>
          })
        }
      })
    },
    <span class="hljs-comment">// 获取原始图片的真实宽高、比例</span>
    getSizeImg (img) {
      let w = img.width
      let h = img.height
      let r = w === <span class="hljs-number">0</span> &amp;&amp; h === <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : w / h
      <span class="hljs-keyword">return</span> {
        w: w,
        h: h,
        r: r
      }
    }

  },
  mounted () {
    <span class="hljs-keyword">this</span>.setSize()
  }

}

&lt;/script&gt;

</code></pre>
<h5>3.裁切框部分（<a href="https://github.com/qiuyaofan/vue-crop/blob/master/src/components/VueCrop/VueCropTool.vue" rel="nofollow noreferrer" target="_blank">VueCropTool.vue全部源码链接</a>）</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//script部分

<script>
// 引入拖拽js
import draggable from '../utils/draggable'
// 引入裁切尺寸计算js
import movePos from './VueCropMove'
// 和VueCropMove有关，序号对应相应的操作，这些类名对应裁切框的四条边，四个角，四个边上的中点，拖拽由这12个位置进行
const dragEle = ['.c-crop--drap_eline', '.c-crop--drap_sline', '.c-crop--drap_wline', '.c-crop--drap_nline', '.c-crop--drap_e', '.c-crop--drap_s', '.c-crop--drap_w', '.c-crop--drap_n', '.c-crop--drap_ne', '.c-crop--drap_se', '.c-crop--drap_sw', '.c-crop--drap_nw']

export default {
  data () {
    return {
      width: this.elWidth,
      height: this.elHeight,
      top: this.cursorTop,
      left: this.cursorLeft,
      // 存储拖拽开始坐标（拖拽改变位置时）
      startPos: [0, 0],
      crop: [],
      // 计时器
      cropTimer: null,
      // 存储拖拽开始坐标尺寸（拖拽改变尺寸时）
      startSize: null
    }
  },
  props: ['elWidth', 'elHeight', 'cursorTop', 'cursorLeft', 'cropJson'],
  created () {},
  watch: {
    elWidth (val) {
      this.width = val
    },
    elHeight (val) {
      this.height = val
    },
    cursorTop (val) {
      this.top = val
    },
    cursorLeft (val) {
      this.left = val
    }
  },

  methods: {
    // 拖拽更新位置
    handleDragLocation (event) {
      let x = event.clientX
      let y = event.clientY
      this.left = x - this.startPos[0] + this.left
      this.top = y - this.startPos[1] + this.top
      this.startPos = [x, y]
      this.handleSize()
      // 更新尺寸
      this.$emit('updateSize', this.width, this.height, this.top, this.left)
      clearTimeout(this.cropTimer)
      // setTimeout是为了拖拽完成才调用afterCrop
      this.cropTimer = setTimeout(() => {
        // 调用回调
        this.$emit('afterCrop')
      }, 200)
    },
    // 拖拽改变位置：绑定事件
    dragCallLocation () {
      draggable(this.$el.querySelector('.c-crop--drap_screen'), {
        start: (event) => {
          this.startPos = [event.x, event.y]
        },
        drag: (event) => {
          this.handleDragLocation(event)
        },
        end: (event) => {
          this.handleDragLocation(event)
        }
      })
    },
    // 根据className获取父元素
    getParentElement (p, className) {
      const classNames = p.className
      if (classNames.indexOf(className) === -1) {
        p = p.parentNode
        return this.getParentElement(p, className)
      } else {
        return p
      }
    },
    // 获取拖拽的尺寸
    getDragSize (event) {
      const el = this.$el
      const screen = this.$cropArea.getBoundingClientRect()
      const rect = el.getBoundingClientRect()
      let json = {
        x: event.clientX,
        y: event.clientY,
        t: rect.top,
        b: rect.bottom,
        l: rect.left,
        r: rect.right,
        w: rect.width,
        h: rect.height,
        screen: screen
      }
      json.ratio = json.w / json.h
      return json
    },
    // 拖拽改变大小
    handleDrag (event, i) {
      // 获取坐标
      // console.info('move', i)
      const json = this.getDragSize(event)
      movePos[i](this, json, this.startSize)
      this.handleSize(true)
      this.$emit('updateSize', this.width, this.height, this.top, this.left)
      clearTimeout(this.cropTimer)
      this.cropTimer = setTimeout(() => {
        // 调用回调
        this.$emit('afterCrop')
      }, 200)
    },
    // 拖拽改变大小：绑定事件
    dragCall (i) {
      let target = this.$el.querySelector(dragEle[i])
      draggable(target, {
        start: (event) => {
          // 开始时拖拽框json
          this.startSize = this.getDragSize(event)
        },
        drag: (event) => {
          this.handleDrag(event, i)
        },
        end: (event) => {
          this.handleDrag(event, i)
        }
      })
    },
    // 改变位置大小
    handleSize (isSize) {
      this.left = range2(this.left, this.width, this.cropJson.w)
      this.top = range2(this.top, this.height, this.cropJson.h)
      if (isSize) {
        let d1 = this.cropJson.w - this.left
        let d2 = this.cropJson.h - this.top
        // 按比例裁切
        if (this.cropJson.r) {
          if (d1 < this.width) {
            this.width = d1
            this.height = this.width / this.cropJson.r
          } else if (d2 < this.height) {
            this.height = d2
            this.width = this.height * this.cropJson.r
          }
        } else {
          // 不按比例裁切
          if (d1 < this.width) {
            this.width = d1
          }
          if (d2 < this.height) {
            this.height = d2
          }
        }
      }
    }

  },
  mounted () {
    this.$cropArea = this.getParentElement(this.$el.parentNode, 'c-crop--area')
    // 初始化拖拽改变大小
    for (var i = 0; i < dragEle.length; i++) {
      this.dragCall(i)
    }
    // 初始化拖拽改变位置
    this.dragCallLocation()
  }
}

// 计算允许的范围
function range2 (pos, val, mainW) {
  return pos <= 0 ? 0 : pos > mainW - val ? mainW - val : pos
}

</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//script部分</span>

&lt;script&gt;
<span class="hljs-comment">// 引入拖拽js</span>
<span class="hljs-keyword">import</span> draggable from <span class="hljs-string">'../utils/draggable'</span>
<span class="hljs-comment">// 引入裁切尺寸计算js</span>
<span class="hljs-keyword">import</span> movePos from <span class="hljs-string">'./VueCropMove'</span>
<span class="hljs-comment">// 和VueCropMove有关，序号对应相应的操作，这些类名对应裁切框的四条边，四个角，四个边上的中点，拖拽由这12个位置进行</span>
const dragEle = [<span class="hljs-string">'.c-crop--drap_eline'</span>, <span class="hljs-string">'.c-crop--drap_sline'</span>, <span class="hljs-string">'.c-crop--drap_wline'</span>, <span class="hljs-string">'.c-crop--drap_nline'</span>, <span class="hljs-string">'.c-crop--drap_e'</span>, <span class="hljs-string">'.c-crop--drap_s'</span>, <span class="hljs-string">'.c-crop--drap_w'</span>, <span class="hljs-string">'.c-crop--drap_n'</span>, <span class="hljs-string">'.c-crop--drap_ne'</span>, <span class="hljs-string">'.c-crop--drap_se'</span>, <span class="hljs-string">'.c-crop--drap_sw'</span>, <span class="hljs-string">'.c-crop--drap_nw'</span>]

export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      width: <span class="hljs-keyword">this</span>.elWidth,
      height: <span class="hljs-keyword">this</span>.elHeight,
      top: <span class="hljs-keyword">this</span>.cursorTop,
      left: <span class="hljs-keyword">this</span>.cursorLeft,
      <span class="hljs-comment">// 存储拖拽开始坐标（拖拽改变位置时）</span>
      startPos: [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>],
      crop: [],
      <span class="hljs-comment">// 计时器</span>
      cropTimer: <span class="hljs-literal">null</span>,
      <span class="hljs-comment">// 存储拖拽开始坐标尺寸（拖拽改变尺寸时）</span>
      startSize: <span class="hljs-literal">null</span>
    }
  },
  props: [<span class="hljs-string">'elWidth'</span>, <span class="hljs-string">'elHeight'</span>, <span class="hljs-string">'cursorTop'</span>, <span class="hljs-string">'cursorLeft'</span>, <span class="hljs-string">'cropJson'</span>],
  created () {},
  watch: {
    elWidth (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.width = <span class="hljs-keyword">val</span>
    },
    elHeight (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.height = <span class="hljs-keyword">val</span>
    },
    cursorTop (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.top = <span class="hljs-keyword">val</span>
    },
    cursorLeft (<span class="hljs-keyword">val</span>) {
      <span class="hljs-keyword">this</span>.left = <span class="hljs-keyword">val</span>
    }
  },

  methods: {
    <span class="hljs-comment">// 拖拽更新位置</span>
    handleDragLocation (event) {
      let x = event.clientX
      let y = event.clientY
      <span class="hljs-keyword">this</span>.left = x - <span class="hljs-keyword">this</span>.startPos[<span class="hljs-number">0</span>] + <span class="hljs-keyword">this</span>.left
      <span class="hljs-keyword">this</span>.top = y - <span class="hljs-keyword">this</span>.startPos[<span class="hljs-number">1</span>] + <span class="hljs-keyword">this</span>.top
      <span class="hljs-keyword">this</span>.startPos = [x, y]
      <span class="hljs-keyword">this</span>.handleSize()
      <span class="hljs-comment">// 更新尺寸</span>
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'updateSize'</span>, <span class="hljs-keyword">this</span>.width, <span class="hljs-keyword">this</span>.height, <span class="hljs-keyword">this</span>.top, <span class="hljs-keyword">this</span>.left)
      clearTimeout(<span class="hljs-keyword">this</span>.cropTimer)
      <span class="hljs-comment">// setTimeout是为了拖拽完成才调用afterCrop</span>
      <span class="hljs-keyword">this</span>.cropTimer = setTimeout(() =&gt; {
        <span class="hljs-comment">// 调用回调</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'afterCrop'</span>)
      }, <span class="hljs-number">200</span>)
    },
    <span class="hljs-comment">// 拖拽改变位置：绑定事件</span>
    dragCallLocation () {
      draggable(<span class="hljs-keyword">this</span>.$el.querySelector(<span class="hljs-string">'.c-crop--drap_screen'</span>), {
        start: (event) =&gt; {
          <span class="hljs-keyword">this</span>.startPos = [event.x, event.y]
        },
        drag: (event) =&gt; {
          <span class="hljs-keyword">this</span>.handleDragLocation(event)
        },
        end: (event) =&gt; {
          <span class="hljs-keyword">this</span>.handleDragLocation(event)
        }
      })
    },
    <span class="hljs-comment">// 根据className获取父元素</span>
    getParentElement (p, className) {
      const classNames = p.className
      <span class="hljs-keyword">if</span> (classNames.indexOf(className) === <span class="hljs-number">-1</span>) {
        p = p.parentNode
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.getParentElement(p, className)
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> p
      }
    },
    <span class="hljs-comment">// 获取拖拽的尺寸</span>
    getDragSize (event) {
      const el = <span class="hljs-keyword">this</span>.$el
      const screen = <span class="hljs-keyword">this</span>.$cropArea.getBoundingClientRect()
      const rect = el.getBoundingClientRect()
      let json = {
        x: event.clientX,
        y: event.clientY,
        t: rect.top,
        b: rect.bottom,
        l: rect.left,
        r: rect.right,
        w: rect.width,
        h: rect.height,
        screen: screen
      }
      json.ratio = json.w / json.h
      <span class="hljs-keyword">return</span> json
    },
    <span class="hljs-comment">// 拖拽改变大小</span>
    handleDrag (event, i) {
      <span class="hljs-comment">// 获取坐标</span>
      <span class="hljs-comment">// console.info('move', i)</span>
      const json = <span class="hljs-keyword">this</span>.getDragSize(event)
      movePos[i](<span class="hljs-keyword">this</span>, json, <span class="hljs-keyword">this</span>.startSize)
      <span class="hljs-keyword">this</span>.handleSize(<span class="hljs-literal">true</span>)
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'updateSize'</span>, <span class="hljs-keyword">this</span>.width, <span class="hljs-keyword">this</span>.height, <span class="hljs-keyword">this</span>.top, <span class="hljs-keyword">this</span>.left)
      clearTimeout(<span class="hljs-keyword">this</span>.cropTimer)
      <span class="hljs-keyword">this</span>.cropTimer = setTimeout(() =&gt; {
        <span class="hljs-comment">// 调用回调</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'afterCrop'</span>)
      }, <span class="hljs-number">200</span>)
    },
    <span class="hljs-comment">// 拖拽改变大小：绑定事件</span>
    dragCall (i) {
      let target = <span class="hljs-keyword">this</span>.$el.querySelector(dragEle[i])
      draggable(target, {
        start: (event) =&gt; {
          <span class="hljs-comment">// 开始时拖拽框json</span>
          <span class="hljs-keyword">this</span>.startSize = <span class="hljs-keyword">this</span>.getDragSize(event)
        },
        drag: (event) =&gt; {
          <span class="hljs-keyword">this</span>.handleDrag(event, i)
        },
        end: (event) =&gt; {
          <span class="hljs-keyword">this</span>.handleDrag(event, i)
        }
      })
    },
    <span class="hljs-comment">// 改变位置大小</span>
    handleSize (isSize) {
      <span class="hljs-keyword">this</span>.left = range2(<span class="hljs-keyword">this</span>.left, <span class="hljs-keyword">this</span>.width, <span class="hljs-keyword">this</span>.cropJson.w)
      <span class="hljs-keyword">this</span>.top = range2(<span class="hljs-keyword">this</span>.top, <span class="hljs-keyword">this</span>.height, <span class="hljs-keyword">this</span>.cropJson.h)
      <span class="hljs-keyword">if</span> (isSize) {
        let d1 = <span class="hljs-keyword">this</span>.cropJson.w - <span class="hljs-keyword">this</span>.left
        let d2 = <span class="hljs-keyword">this</span>.cropJson.h - <span class="hljs-keyword">this</span>.top
        <span class="hljs-comment">// 按比例裁切</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.cropJson.r) {
          <span class="hljs-keyword">if</span> (d1 &lt; <span class="hljs-keyword">this</span>.width) {
            <span class="hljs-keyword">this</span>.width = d1
            <span class="hljs-keyword">this</span>.height = <span class="hljs-keyword">this</span>.width / <span class="hljs-keyword">this</span>.cropJson.r
          } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (d2 &lt; <span class="hljs-keyword">this</span>.height) {
            <span class="hljs-keyword">this</span>.height = d2
            <span class="hljs-keyword">this</span>.width = <span class="hljs-keyword">this</span>.height * <span class="hljs-keyword">this</span>.cropJson.r
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// 不按比例裁切</span>
          <span class="hljs-keyword">if</span> (d1 &lt; <span class="hljs-keyword">this</span>.width) {
            <span class="hljs-keyword">this</span>.width = d1
          }
          <span class="hljs-keyword">if</span> (d2 &lt; <span class="hljs-keyword">this</span>.height) {
            <span class="hljs-keyword">this</span>.height = d2
          }
        }
      }
    }

  },
  mounted () {
    <span class="hljs-keyword">this</span>.$cropArea = <span class="hljs-keyword">this</span>.getParentElement(<span class="hljs-keyword">this</span>.$el.parentNode, <span class="hljs-string">'c-crop--area'</span>)
    <span class="hljs-comment">// 初始化拖拽改变大小</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; dragEle.length; i++) {
      <span class="hljs-keyword">this</span>.dragCall(i)
    }
    <span class="hljs-comment">// 初始化拖拽改变位置</span>
    <span class="hljs-keyword">this</span>.dragCallLocation()
  }
}

<span class="hljs-comment">// 计算允许的范围</span>
function range2 (pos, <span class="hljs-keyword">val</span>, mainW) {
  <span class="hljs-keyword">return</span> pos &lt;= <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : pos &gt; mainW - <span class="hljs-keyword">val</span> ? mainW - <span class="hljs-keyword">val</span> : pos
}

&lt;/script&gt;</code></pre>
<h5>4.计算裁切框的js（<a href="https://github.com/qiuyaofan/vue-crop/blob/master/src/components/VueCrop/VueCropMove.js" rel="nofollow noreferrer" target="_blank">VueCropMove.js全部源码链接</a>）</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 12种形态，四条边，边的中点，边的四个角。e:东，w:西，n:北，s:南，ne:东南以此类推
const movePos = {
  0: e,
  4: e,
  1: s,
  5: s,
  2: w,
  6: w,
  3: n,
  7: n,
  8: ne,
  9: se,
  10: sw,
  11: nw
}
let width, height, result, ratio

// 获取某种形态类型的宽或高最大值
function getMaxSize (json, startJson, dire, type) {
  if (type === 'w') {
    switch (dire) {
      case 'e':
      case 's':
      case 'n':
      case 'ne':
      case 'se':
        return json.screen.right - json.l
      case 'w':
      case 'nw':
      case 'sw':
        return startJson.r - json.screen.left
    }
  } else if (type === 'h') {
    switch (dire) {
      case 'n':
      case 'nw':
      case 'ne':
        return startJson.b - json.screen.top
      case 's':
      case 'w':
      case 'e':
      case 'sw':
      case 'se':
        return json.screen.bottom - startJson.t
    }
  }
}
// 判断是否有ratio,返回修改后的尺寸
function setRatioSize (type, json, startJson, ratio, width, height) {
  if (ratio) {
    if (width / ratio >= height) {
      var maxHeight = getMaxSize(json, startJson, type, 'h')
      height = width / ratio
      if (height > maxHeight) {
        height = maxHeight
        width = height * ratio
      }
    } else {
      var maxWidth = getMaxSize(json, startJson, type, 'w')
      width = height * ratio
      if (width > maxWidth) {
        width = maxWidth
        height = width / ratio
      }
    }
  }
  return {
    width: width,
    height: height
  }
}
// 拖拽东边，高度是不变的，除非有比例拖拽时
function e (_this, json, startJson) {
  ratio = _this.cropJson.r
  width = range(getWidth(json, startJson, 'e'), getMaxSize(json, startJson, 'e', 'w'))
  if (ratio) {
      // 有比例时，计算高度，并对比最大值是否超出
    height = range(width / ratio, getMaxSize(json, startJson, 'e', 'h'))
    result = setRatioSize('e', json, startJson, ratio, width, height)
    setSize(_this, result)
  } else {
    _this.width = width
  }
  return _this
}

// 拖拽南边，宽度是不变的，除非有比例拖拽时
function s (_this, json, startJson) {
  ratio = _this.cropJson.r
  height = range(getHeight(json, startJson, 's'), getMaxSize(json, startJson, 's', 'h'))
  if (ratio) {
    // 有比例时，计算宽度，并对比最大值是否超出
    width = range(height * ratio, getMaxSize(json, startJson, 's', 'w'))
    result = setRatioSize('s', json, startJson, ratio, width, height)
    setSize(_this, result)
  } else {
    _this.height = height
  }

  return _this
}

// 以下同上，以此类推
function w (_this, json, startJson) {
  ratio = _this.cropJson.r
  width = range(getWidth(json, startJson, 'w'), getMaxSize(json, startJson, 'w', 'w'))
  if (ratio) {
    height = range(width / ratio, getMaxSize(json, startJson, 'w', 'h'))
    result = setRatioSize('w', json, startJson, ratio, width, height)
    setSize(_this, result)
    _this.left = getLeft(_this, json, startJson)
  } else {
    _this.width = width
    _this.left = rangeMax(json.x - json.screen.left, startJson.r)
  }
  return _this
}
function n (_this, json, startJson) {
  ratio = _this.cropJson.r
  height = range(getHeight(json, startJson, 'n'), getMaxSize(json, startJson, 'n', 'h'))
  if (ratio) {
    width = range(height * ratio, getMaxSize(json, startJson, 'n', 'w'))
    result = setRatioSize('n', json, startJson, ratio, width, height)
    setSize(_this, result)
    _this.top = getTop(_this, json, startJson)
  } else {
    _this.height = height
    _this.top = rangeMax(json.y - json.screen.top, startJson.b)
  }
  return _this
}

function ne (_this, json, startJson) {
  height = range(getHeight(json, startJson, 'n'), getMaxSize(json, startJson, 'ne', 'h'))
  width = range(getWidth(json, startJson, 'e'), getMaxSize(json, startJson, 'ne', 'w'))
  result = setRatioSize('ne', json, startJson, _this.cropJson.r, width, height)
  setSize(_this, result)
  _this.top = getTop(_this, json, startJson)
  return _this
}
function se (_this, json, startJson) {
  height = range(getHeight(json, startJson, 's'), getMaxSize(json, startJson, 'se', 'h'))
  width = range(getWidth(json, startJson, 'e'), getMaxSize(json, startJson, 'se', 'w'))
  result = setRatioSize('se', json, startJson, _this.cropJson.r, width, height)
  setSize(_this, result)
  return _this
}
function sw (_this, json, startJson) {
  width = range(getWidth(json, startJson, 'w'), getMaxSize(json, startJson, 'sw', 'w'))
  height = range(getHeight(json, startJson, 's'), getMaxSize(json, startJson, 'sw', 'h'))
  result = setRatioSize('sw', json, startJson, _this.cropJson.r, width, height)
  setSize(_this, result)
  _this.left = getLeft(_this, json, startJson)
  return _this
}
function nw (_this, json, startJson) {
  width = range(getWidth(json, startJson, 'w'), getMaxSize(json, startJson, 'nw', 'w'))
  height = range(getHeight(json, startJson, 'n'), getMaxSize(json, startJson, 'nw', 'h'))
  result = setRatioSize('nw', json, startJson, _this.cropJson.r, width, height)
  setSize(_this, result)
  _this.left = getLeft(_this, json, startJson)
  _this.top = getTop(_this, json, startJson)
  return _this
}

// 匹配范围
function range (value, max) {
  value = value > max ? max : value
  return value < 20 ? 20 : value
}
// 最大值
function rangeMax (value, max) {
  return value > max ? max : value
}
// top
function getTop (_this, json, startJson) {
  return rangeMax(startJson.b - _this.height - json.screen.top, startJson.b)
}
// left
function getLeft (_this, json, startJson) {
  return rangeMax(startJson.r - _this.width - json.screen.left, startJson.r)
}
// height：只存在于s||n类型
function getHeight (json, startJson, type) {
  return type === 'n' ? startJson.b - json.y : json.y - startJson.t
}
// width：只存在于w||e类型
function getWidth (json, startJson, type) {
  return type === 'w' ? startJson.r - json.x : json.x - startJson.l
}
// setSize
function setSize (_this, result) {
  _this.width = result.width
  _this.height = result.height
}

export default movePos
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-comment">// 12种形态，四条边，边的中点，边的四个角。e:东，w:西，n:北，s:南，ne:东南以此类推</span>
const movePos = {
  <span class="hljs-number">0</span>: e,
  <span class="hljs-number">4</span>: e,
  <span class="hljs-number">1</span>: s,
  <span class="hljs-number">5</span>: s,
  <span class="hljs-number">2</span>: w,
  <span class="hljs-number">6</span>: w,
  <span class="hljs-number">3</span>: n,
  <span class="hljs-number">7</span>: n,
  <span class="hljs-number">8</span>: ne,
  <span class="hljs-number">9</span>: se,
  <span class="hljs-number">10</span>: sw,
  <span class="hljs-number">11</span>: nw
}
<span class="hljs-keyword">let</span> width, height, result, ratio

<span class="hljs-comment">// 获取某种形态类型的宽或高最大值</span>
<span class="hljs-keyword">function</span> getMaxSize (json, startJson, dire, type) {
  <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'w'</span>) {
    <span class="hljs-keyword">switch</span> (dire) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'e'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'s'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'n'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'ne'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'se'</span>:
        <span class="hljs-keyword">return</span> json.screen.right - json.l
      <span class="hljs-keyword">case</span> <span class="hljs-string">'w'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'nw'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'sw'</span>:
        <span class="hljs-keyword">return</span> startJson.r - json.screen.left
    }
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'h'</span>) {
    <span class="hljs-keyword">switch</span> (dire) {
      <span class="hljs-keyword">case</span> <span class="hljs-string">'n'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'nw'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'ne'</span>:
        <span class="hljs-keyword">return</span> startJson.b - json.screen.top
      <span class="hljs-keyword">case</span> <span class="hljs-string">'s'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'w'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'e'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'sw'</span>:
      <span class="hljs-keyword">case</span> <span class="hljs-string">'se'</span>:
        <span class="hljs-keyword">return</span> json.screen.bottom - startJson.t
    }
  }
}
<span class="hljs-comment">// 判断是否有ratio,返回修改后的尺寸</span>
<span class="hljs-keyword">function</span> setRatioSize (type, json, startJson, ratio, width, height) {
  <span class="hljs-keyword">if</span> (ratio) {
    <span class="hljs-keyword">if</span> (width / ratio &gt;= height) {
      var maxHeight = getMaxSize(json, startJson, type, <span class="hljs-string">'h'</span>)
      height = width / ratio
      <span class="hljs-keyword">if</span> (height &gt; maxHeight) {
        height = maxHeight
        width = height * ratio
      }
    } <span class="hljs-keyword">else</span> {
      var maxWidth = getMaxSize(json, startJson, type, <span class="hljs-string">'w'</span>)
      width = height * ratio
      <span class="hljs-keyword">if</span> (width &gt; maxWidth) {
        width = maxWidth
        height = width / ratio
      }
    }
  }
  <span class="hljs-keyword">return</span> {
    width: width,
    height: height
  }
}
<span class="hljs-comment">// 拖拽东边，高度是不变的，除非有比例拖拽时</span>
<span class="hljs-keyword">function</span> e (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  ratio = <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r
  width = range(getWidth(json, startJson, <span class="hljs-string">'e'</span>), getMaxSize(json, startJson, <span class="hljs-string">'e'</span>, <span class="hljs-string">'w'</span>))
  <span class="hljs-keyword">if</span> (ratio) {
      <span class="hljs-comment">// 有比例时，计算高度，并对比最大值是否超出</span>
    height = range(width / ratio, getMaxSize(json, startJson, <span class="hljs-string">'e'</span>, <span class="hljs-string">'h'</span>))
    result = setRatioSize(<span class="hljs-string">'e'</span>, json, startJson, ratio, width, height)
    setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.width = width
  }
  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}

<span class="hljs-comment">// 拖拽南边，宽度是不变的，除非有比例拖拽时</span>
<span class="hljs-keyword">function</span> s (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  ratio = <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r
  height = range(getHeight(json, startJson, <span class="hljs-string">'s'</span>), getMaxSize(json, startJson, <span class="hljs-string">'s'</span>, <span class="hljs-string">'h'</span>))
  <span class="hljs-keyword">if</span> (ratio) {
    <span class="hljs-comment">// 有比例时，计算宽度，并对比最大值是否超出</span>
    width = range(height * ratio, getMaxSize(json, startJson, <span class="hljs-string">'s'</span>, <span class="hljs-string">'w'</span>))
    result = setRatioSize(<span class="hljs-string">'s'</span>, json, startJson, ratio, width, height)
    setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.height = height
  }

  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}

<span class="hljs-comment">// 以下同上，以此类推</span>
<span class="hljs-keyword">function</span> w (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  ratio = <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r
  width = range(getWidth(json, startJson, <span class="hljs-string">'w'</span>), getMaxSize(json, startJson, <span class="hljs-string">'w'</span>, <span class="hljs-string">'w'</span>))
  <span class="hljs-keyword">if</span> (ratio) {
    height = range(width / ratio, getMaxSize(json, startJson, <span class="hljs-string">'w'</span>, <span class="hljs-string">'h'</span>))
    result = setRatioSize(<span class="hljs-string">'w'</span>, json, startJson, ratio, width, height)
    setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.left = getLeft(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.width = width
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.left = rangeMax(json.x - json.screen.left, startJson.r)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}
<span class="hljs-keyword">function</span> n (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  ratio = <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r
  height = range(getHeight(json, startJson, <span class="hljs-string">'n'</span>), getMaxSize(json, startJson, <span class="hljs-string">'n'</span>, <span class="hljs-string">'h'</span>))
  <span class="hljs-keyword">if</span> (ratio) {
    width = range(height * ratio, getMaxSize(json, startJson, <span class="hljs-string">'n'</span>, <span class="hljs-string">'w'</span>))
    result = setRatioSize(<span class="hljs-string">'n'</span>, json, startJson, ratio, width, height)
    setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.top = getTop(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.height = height
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.top = rangeMax(json.y - json.screen.top, startJson.b)
  }
  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}

<span class="hljs-keyword">function</span> ne (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  height = range(getHeight(json, startJson, <span class="hljs-string">'n'</span>), getMaxSize(json, startJson, <span class="hljs-string">'ne'</span>, <span class="hljs-string">'h'</span>))
  width = range(getWidth(json, startJson, <span class="hljs-string">'e'</span>), getMaxSize(json, startJson, <span class="hljs-string">'ne'</span>, <span class="hljs-string">'w'</span>))
  result = setRatioSize(<span class="hljs-string">'ne'</span>, json, startJson, <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r, width, height)
  setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
  <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.top = getTop(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson)
  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}
<span class="hljs-keyword">function</span> se (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  height = range(getHeight(json, startJson, <span class="hljs-string">'s'</span>), getMaxSize(json, startJson, <span class="hljs-string">'se'</span>, <span class="hljs-string">'h'</span>))
  width = range(getWidth(json, startJson, <span class="hljs-string">'e'</span>), getMaxSize(json, startJson, <span class="hljs-string">'se'</span>, <span class="hljs-string">'w'</span>))
  result = setRatioSize(<span class="hljs-string">'se'</span>, json, startJson, <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r, width, height)
  setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}
<span class="hljs-keyword">function</span> sw (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  width = range(getWidth(json, startJson, <span class="hljs-string">'w'</span>), getMaxSize(json, startJson, <span class="hljs-string">'sw'</span>, <span class="hljs-string">'w'</span>))
  height = range(getHeight(json, startJson, <span class="hljs-string">'s'</span>), getMaxSize(json, startJson, <span class="hljs-string">'sw'</span>, <span class="hljs-string">'h'</span>))
  result = setRatioSize(<span class="hljs-string">'sw'</span>, json, startJson, <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r, width, height)
  setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
  <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.left = getLeft(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson)
  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}
<span class="hljs-keyword">function</span> nw (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  width = range(getWidth(json, startJson, <span class="hljs-string">'w'</span>), getMaxSize(json, startJson, <span class="hljs-string">'nw'</span>, <span class="hljs-string">'w'</span>))
  height = range(getHeight(json, startJson, <span class="hljs-string">'n'</span>), getMaxSize(json, startJson, <span class="hljs-string">'nw'</span>, <span class="hljs-string">'h'</span>))
  result = setRatioSize(<span class="hljs-string">'nw'</span>, json, startJson, <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.cropJson.r, width, height)
  setSize(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result)
  <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.left = getLeft(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson)
  <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.top = getTop(<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson)
  <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>
}

<span class="hljs-comment">// 匹配范围</span>
<span class="hljs-keyword">function</span> range (<span class="hljs-keyword">value</span>, max) {
  <span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span> &gt; max ? max : <span class="hljs-keyword">value</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> &lt; <span class="hljs-number">20</span> ? <span class="hljs-number">20</span> : <span class="hljs-keyword">value</span>
}
<span class="hljs-comment">// 最大值</span>
<span class="hljs-keyword">function</span> rangeMax (<span class="hljs-keyword">value</span>, max) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">value</span> &gt; max ? max : <span class="hljs-keyword">value</span>
}
<span class="hljs-comment">// top</span>
<span class="hljs-keyword">function</span> getTop (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  <span class="hljs-keyword">return</span> rangeMax(startJson.b - <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.height - json.screen.top, startJson.b)
}
<span class="hljs-comment">// left</span>
<span class="hljs-keyword">function</span> getLeft (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, json, startJson) {
  <span class="hljs-keyword">return</span> rangeMax(startJson.r - <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.width - json.screen.left, startJson.r)
}
<span class="hljs-comment">// height：只存在于s||n类型</span>
<span class="hljs-keyword">function</span> getHeight (json, startJson, type) {
  <span class="hljs-keyword">return</span> type === <span class="hljs-string">'n'</span> ? startJson.b - json.y : json.y - startJson.t
}
<span class="hljs-comment">// width：只存在于w||e类型</span>
<span class="hljs-keyword">function</span> getWidth (json, startJson, type) {
  <span class="hljs-keyword">return</span> type === <span class="hljs-string">'w'</span> ? startJson.r - json.x : json.x - startJson.l
}
<span class="hljs-comment">// setSize</span>
<span class="hljs-keyword">function</span> setSize (<span class="hljs-number">_</span><span class="hljs-keyword">this</span>, result) {
  <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.width = result.width
  <span class="hljs-number">_</span><span class="hljs-keyword">this</span>.height = result.height
}

export <span class="hljs-keyword">default</span> movePos
</code></pre>
<p>今天就分享到这里啦～喜欢这个插件可以去 <a href="https://github.com/qiuyaofan/vue-crop" rel="nofollow noreferrer" target="_blank">github star~</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你写vue裁切预览组件

## 原文链接
[https://segmentfault.com/a/1190000014772044](https://segmentfault.com/a/1190000014772044)


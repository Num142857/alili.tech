---
title: '手摸手，带你封装一个vue component' 
date: 2019-01-16 2:30:08
hidden: true
slug: 06scw6kxmvf5
categories: [reprint]
---

{{< raw >}}

                    
<p>项目地址：<a href="https://github.com/PanJiaChen/vue-countTo" rel="nofollow noreferrer" target="_blank">vue-countTo</a><br>配套完整后台demo地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a><br>系类文章一：<a href="https://segmentfault.com/a/1190000009275424">手摸手，带你用vue撸后台 系列一（基础篇）</a><br>系类文章二：<a href="https://segmentfault.com/a/1190000009506097" target="_blank">手摸手，带你用vue撸后台 系列二（登录权限篇）</a><br>系类文章三：<a href="https://segmentfault.com/a/1190000009762198">手摸手，带你用vue撸后台 系列三(实战篇）</a><br>系类文章四：<a href="https://segmentfault.com/a/1190000010043013" target="_blank">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a><br>系类文章：<a href="https://segmentfault.com/a/1190000012213278">手摸手，带你优雅的使用 icon</a></p>
<h2 id="articleHeader0">为什么选择自己封装第三方库</h2>
<p>最近几个月我司把之前两三年的所有业务都用了 vue 重构了一遍，前台使用 vue+ssr，后台使用了 vue+element，在此过程中封装和自己写了很多 vue component。其实vue 写 component 相当简单和方便，github上有很多的 vue component 都只是简单的包装了一些 jquery 或者原生 js 的插件，但我个人是不太喜欢使用这些第三方封装的。理由如下：</p>
<ol>
<li>
<strong>很多第三方封装的组件参数配置项其实是有缺损的。</strong>如一些富文本或者图表组件，配置项远比你想想中的多得多，第三方封装组件很难覆盖全部所有配置。</li>
<li>
<strong>第三方组件的更新频率很难保证。</strong>很多第三方封装组件并不能一直和原始组件保持同步更新速度，万一原始组件更新了某个你需要的功能，但第三方并没有更新那岂不是很尴尬，而且很多第三方组件维护一段时间之后就不维护了。</li>
<li>
<strong>灵活性和针对性。</strong>还是那富文本来说，富文本在我司有很多定制化需求，我们需要将图片上传七牛，需要将图片打水印，需要很多针对业务的特殊需求，使用第三方包装的组件是不合适的，一般基于第三方封装的组件是很难拓展的。</li>
</ol>
<p>所以我觉得大部分组件还是自己封装来的更为方便和灵活一些。</p>
<h2 id="articleHeader1">动手开干</h2>
<p>接下来我们一起手摸手教改造包装一个js插件，只要几分钟就可以封装一个专属于你的 vue component。封装对象：<a href="https://github.com/inorganik/countUp.js" rel="nofollow noreferrer" target="_blank">countUp.js</a>，改造后结果 <a href="https://github.com/PanJiaChen/vue-countTo" rel="nofollow noreferrer" target="_blank">vue-countTo</a>。</p>
<p>首先我们用官方提供的 <a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a> 来构建项目 这里选择了 <a href="https://github.com/vuejs-templates/webpack-simple" rel="nofollow noreferrer" target="_blank">webpack-simple</a> (组件相对而言比较简单，不需要很多复杂的功能，所以 webpack-simple 已经满足需求了)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g vue-cli
$ vue init webpack-simple my-project
$ cd my-project
$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install -g vue-cli
$ vue init webpack-simple my-project
$ <span class="hljs-built_in">cd</span> my-project
$ npm install</code></pre>
<p>安装countup.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install countup.js
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ npm install countup.js
$ npm run dev</code></pre>
<p>启动项目之后按照 countup.js 官方 demo 初始化插件</p>
<h4>app.vue</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <span ref='countup'></span>
</template>

<script>
import CountUp from 'countup.js'
export default {
  name: 'countup-demo',
  data () {
    return {
      numAnim:null
    }
  },
  mounted(){
    this.initCountUp()
  },
  methods:{
    initCountUp(){
      this.numAnim = new CountUp(this.$refs.countup,0, 2017)
      this.numAnim.start();
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">'countup'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> CountUp <span class="hljs-keyword">from</span> <span class="hljs-string">'countup.js'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'countup-demo'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">numAnim</span>:<span class="hljs-literal">null</span>
    }
  },
  mounted(){
    <span class="hljs-keyword">this</span>.initCountUp()
  },
  <span class="hljs-attr">methods</span>:{
    initCountUp(){
      <span class="hljs-keyword">this</span>.numAnim = <span class="hljs-keyword">new</span> CountUp(<span class="hljs-keyword">this</span>.$refs.countup,<span class="hljs-number">0</span>, <span class="hljs-number">2017</span>)
      <span class="hljs-keyword">this</span>.numAnim.start();
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>刷新页面，就这么简单，countUp.js 已经生效了。<br><span class="img-wrap"><img data-src="/img/bVMi7H?w=340&amp;h=90" src="https://static.alili.tech/img/bVMi7H?w=340&amp;h=90" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下来查看 countUp.js 的 github 发现它定义了如下可配置参数</p>
<p><span class="img-wrap"><img data-src="/img/bVMiDR?w=1872&amp;h=482" src="https://static.alili.tech/img/bVMiDR?w=1872&amp;h=482" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>对应 vue 就是 props，类型和初始化一目了然。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
  start: {
    type: Number,
    default: 0
  },
  end: {
    type: Number,
    default: 2017
  },
  decimal: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 2.5
  },
  options: {
    type: Object
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">props: {
  <span class="hljs-attr">start</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
  },
  <span class="hljs-attr">end</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-number">2017</span>
  },
  <span class="hljs-attr">decimal</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-number">0</span>
  },
  <span class="hljs-attr">duration</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
    <span class="hljs-attr">default</span>: <span class="hljs-number">2.5</span>
  },
  <span class="hljs-attr">options</span>: {
    <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>
  }
}</code></pre>
<p>之后再将countup之前写死的配置项替换为动态props就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
this.numAnim = new CountUp(this.$refs.countup, 
                           this.start,
                           this.end,
                           this.decimal,
                           this.duration,
                           this.options)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-keyword">this</span>.numAnim = new CountUp(<span class="hljs-keyword">this</span>.$refs.countup, 
                           <span class="hljs-keyword">this</span>.start,
                           <span class="hljs-keyword">this</span>.end,
                           <span class="hljs-keyword">this</span>.decimal,
                           <span class="hljs-keyword">this</span>.duration,
                           <span class="hljs-keyword">this</span>.options)</code></pre>
<p><strong>使用组件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<vue-count-up :end=&quot;2500&quot; :duration=&quot;2.5&quot;></vue-count-up>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;vue-count-up <span class="hljs-symbol">:end=<span class="hljs-string">"2500"</span></span> <span class="hljs-symbol">:duration=<span class="hljs-string">"2.5"</span>&gt;&lt;/vue-count-up&gt;</span></code></pre>
<p>只要几分钟一个属于自己的原生组件就包装好了，就是这么简单。<a href="https://github.com/PanJiaChen/countUp-demo/blob/master/src/App.vue" rel="nofollow noreferrer" target="_blank">完整demo</a><br>这时候你如果觉得使用countUp.js 还有些不满足你的需求，那你可以选择自己来造轮子了。</p>
<h2 id="articleHeader2">造轮子篇</h2>
<p>首先当然是阅读<a href="https://github.com/inorganik/countUp.js/blob/master/countUp.js" rel="nofollow noreferrer" target="_blank">源码</a>了<br>其实源码也就两部分核心代码<br><strong>第一部分</strong>：主要是就是 <code>requestAnimationFrame</code>，在游览器不支持<code>requestAnimationFrame</code> 的情况下使用 <code>setTimeout </code>来模拟，这段代码值得仔细阅读，自己在平时的项目中也能借鉴使用这段代码。<br><strong>第二部分</strong>：就是 <a href="https://github.com/inorganik/countUp.js/blob/master/countUp.js#L153" rel="nofollow noreferrer" target="_blank">count</a> 函数<br>看懂这两部分之后造轮子就相当的简单了, <a href="https://github.com/PanJiaChen/vue-countTo" rel="nofollow noreferrer" target="_blank">demo</a></p>
<p>造轮子过程中发现 countUp,并没有 autoplay 这个参数项可以让组件自动开始count，没关系。。。我们可以自己来撸，我们首先定义 autoplay 这个props为布尔值，默认所有组件 autoplay 为 true</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" props:{
   autoplay: {
     type: Boolean,
     required: false,
     default: true
   }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr"> props:</span><span class="hljs-string">{</span>
<span class="hljs-attr">   autoplay:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">     type:</span> <span class="hljs-string">Boolean,</span>
<span class="hljs-attr">     required:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">     default:</span> <span class="hljs-literal">true</span>
   <span class="hljs-string">}</span>
 <span class="hljs-string">}</span></code></pre>
<p>定义好 props 之后只要在 mounted 生命周期内加一个判断就完事了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
  if (this.autoplay) {
    this.start();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>mounted() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.autoplay) {
    <span class="hljs-keyword">this</span>.start();
  }
}</code></pre>
<p>我们的 countUp 组件可以自动 count 了！<br><span class="img-wrap"><img data-src="/img/bVMiHx?w=550&amp;h=94" src="https://static.alili.tech/img/bVMiHx?w=550&amp;h=94" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">上传 npm</h2>
<p>在不跨项目的情况下之前所做的已经满足需求了。但我们不能就此满足，我想让世界上更多的人来使用我的插件，这时候就要上传 <a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank">npm</a>了 <a href="https://github.com/PanJiaChen/vue-countTo" rel="nofollow noreferrer" target="_blank">demo</a> 。</p>
<p>首先我们新建一个index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import CountTo from './vue-countTo.vue'

// 导出模块
export default CountTo

//global 情况下 自动安装
if (typeof window !== 'undefined' &amp;&amp; window.Vue) {
  window.Vue.component('count-to', CountTo)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> CountTo <span class="hljs-keyword">from</span> <span class="hljs-string">'./vue-countTo.vue'</span>

<span class="hljs-comment">// 导出模块</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> CountTo

<span class="hljs-comment">//global 情况下 自动安装</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> !== <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">window</span>.Vue) {
  <span class="hljs-built_in">window</span>.Vue.component(<span class="hljs-string">'count-to'</span>, CountTo)
}</code></pre>
<p>同时我们也要改造一下 webpack 的配置，因为不是所有使用你组件的人都是通过 npm 安装使用 import 引入组件的的。</p>
<p>还有很多人是通过 <code>&lt;script&gt;</code> 标签的方式直接引入的，所以我们要将 <code>libraryTarget </code>改为 <a href="https://webpack.js.org/configuration/output/" rel="nofollow noreferrer" target="_blank">umd</a> 格式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="library: 'CountTo',
libraryTarget: 'umd',
umdNamedDefine: true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">library:</span> <span class="hljs-string">'CountTo'</span>,
<span class="hljs-string">libraryTarget:</span> <span class="hljs-string">'umd'</span>,
<span class="hljs-string">umdNamedDefine:</span> <span class="hljs-literal">true</span></code></pre>
<p>大功告成，现在只要将它发布到 npm 就可以了，首先注册一个<a href="https://www.npmjs.com/signup" rel="nofollow noreferrer" target="_blank">npm</a> 账号，<br>之后配置自己的 package.json (注意填写 version，每次发布的 version 不能相同；main 为入口文件地址)。<br>之后只要一行命令 npm publish 你的项目就发到 npm 了，快让小伙伴们一起来用你的vue component 吧！</p>
<p><span class="img-wrap"><img data-src="/img/bVMiMc?w=771&amp;h=146" src="https://static.alili.tech/img/bVMiMc?w=771&amp;h=146" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">总结</h2>
<p>这里这是拿了一个很简单的 countUp 组件举了一个简单例子，有的时候自己动手丰衣足食，很多插件的封装比想象中简单的多。产品经理再也不会看到我因为这个fu**插件怎么不支持这个功能而愁眉苦脸了，我们可以更好地满足产品了~~<br><strong>完整项目地址：</strong><a href="https://github.com/PanJiaChen/vue-countTo" rel="nofollow noreferrer" target="_blank">https://github.com/PanJiaChen...</a> 欢迎 star</p>
<h2 id="articleHeader5">占坑</h2>
<p>常规占坑，这里是手摸手，带你用vue撸后台系类<br>完整项目地址：<a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">vue-element-admin</a><br>系类文章一：<a href="https://segmentfault.com/a/1190000009275424">手摸手，带你用vue撸后台 系列一（基础篇）</a><br>系类文章二：<a href="https://segmentfault.com/a/1190000009506097" target="_blank">手摸手，带你用vue撸后台 系列二（登录权限篇）</a><br>系类文章三：<a href="https://segmentfault.com/a/1190000009762198">手摸手，带你用vue撸后台 系列三(实战篇）</a><br>系类文章四：<a href="https://segmentfault.com/a/1190000010043013" target="_blank">手摸手，带你用vue撸后台 系列四(vueAdmin 一个极简的后台基础模板)</a><br>系类文章：<a href="https://segmentfault.com/a/1190000012213278">手摸手，带你优雅的使用 icon</a><br>楼主个人免费<a href="https://jianshiapp.com/circles/1209" rel="nofollow noreferrer" target="_blank">圈子</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手摸手，带你封装一个vue component

## 原文链接
[https://segmentfault.com/a/1190000009090836](https://segmentfault.com/a/1190000009090836)


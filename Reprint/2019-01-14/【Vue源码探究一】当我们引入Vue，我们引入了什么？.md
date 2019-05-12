---
title: '【Vue源码探究一】当我们引入Vue，我们引入了什么？' 
date: 2019-01-14 2:30:07
hidden: true
slug: re4beib9ua
categories: [reprint]
---

{{< raw >}}

                    
<p>源码版本：2.0.5</p>
<h2 id="articleHeader0">构造器、实例、选项</h2>
<p>让我们用一段demo展示一下这三个概念：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//HTML
<div id=&quot;app&quot;>
  "{{" message "}}"
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//HTML</span>
&lt;<span class="hljs-keyword">div</span> id=<span class="hljs-string">"app"</span>&gt;
  "{{" message "}}"
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//JS
var vm = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">//JS</span>
<span class="hljs-built_in">var</span> vm = <span class="hljs-literal">new</span> Vue({
  el: <span class="hljs-string">'#app'</span>,
  <span class="hljs-built_in">data</span>: {
    message: <span class="hljs-string">'Hello Vue!'</span>
  }
})</code></pre>
<p>其中：</p>
<ul>
<li><p>Vue： Vue的构造器</p></li>
<li><p>vm ： 实例  （实例名可以任意取，这里我们便于理解保持和vue文档一致）</p></li>
<li><p>new Vue(options):  选项(options)即为传入构造器里的配置选项。（data, methods,computed,created...）</p></li>
</ul>
<p>当我们了解这三个概念，将有助于我们去理解vue的api文档</p>
<h2 id="articleHeader1">Vue 的开放api</h2>
<p><a href="https://cn.vuejs.org/v2/api/" rel="nofollow noreferrer" target="_blank">跳转到vue的文档</a><br><span class="img-wrap"><img data-src="/img/bVNyOm?w=1237&amp;h=484" src="https://static.alili.tech/img/bVNyOm?w=1237&amp;h=484" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li><p>全局配置:  以 <strong>Vue.config.xx</strong>  的形式去访问和修改</p></li>
<li><p>全局API： 以<strong>Vue.xx</strong> 的形式去访问和修改</p></li>
<li><p>选项:   以 <strong>var vm = new Vue(options)</strong> 的形式将options传入构造器</p></li>
<li><p>实例属性/方法：  以<strong>vm.$xx</strong>的方式去访问  (前缀$，为了避免用户data/methods等解析后绑定的api 和 默认api冲突)</p></li>
</ol>
<p>从api文档中我们可以了解到，<strong>当我们引入vue.js， 我们仅仅引入了一个构造函数（Vue）</strong><br>引入了构造函数后，我们有几种使用方式</p>
<h3 id="articleHeader2">最常见的使用方式:  var vm = new Vue(options)</h3>
<p>将我们自定义的选项，传入构造器。 当new Vue(options)时，会自动运行vm._init方法</p>
<ul>
<li><p>解析各种选项</p></li>
<li><p>调用beforeCreate 和created 上绑定的钩子函数</p></li>
<li><p>将数据项(data,computed,props)和methods等绑到实例上</p></li>
<li><p>调用vm.$mount方法，来执行模板渲染</p></li>
<li><p>返回一个实例对象  vm</p></li>
</ul>
<p>实际上，我们使用vue.js来开发时，<strong>主要就是配置不同的options提供Vue构造器解析,实现不同的业务功能。</strong></p>
<h3 id="articleHeader3">通过更改Vue.config来进行全局配置</h3>
<h3 id="articleHeader4">在选项内部可以使用 Vue 和 vm 来调用构造器和实例上的方法</h3>
<h2 id="articleHeader5">Vue源码是怎么开放这些api的</h2>
<h3 id="articleHeader6">主入口</h3>
<p>src/core/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'

initGlobalAPI(Vue)

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

Vue.version = '__VERSION__'

export default Vue" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'./instance/index'</span>
<span class="hljs-keyword">import</span> { initGlobalAPI } <span class="hljs-keyword">from</span> <span class="hljs-string">'./global-api/index'</span>
<span class="hljs-keyword">import</span> { isServerRendering } <span class="hljs-keyword">from</span> <span class="hljs-string">'core/util/env'</span>

initGlobalAPI(Vue)

<span class="hljs-built_in">Object</span>.defineProperty(Vue.prototype, <span class="hljs-string">'$isServer'</span>, {
  <span class="hljs-keyword">get</span>: isServerRendering
})

Vue.version = <span class="hljs-string">'__VERSION__'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Vue</code></pre>
<p>Vue源码的主入口主要做三件事<br>1.引用 ./instance/index 中暴露的Vue构造器<br>2.调用initGlobalAPI方法，定义全局资源<br>3.暴露Vue</p>
<h3 id="articleHeader7">initGlobalAPI</h3>
<p>src/core/global-api/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//源码有点长，我去掉了引用部分和一些注释。
export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      util.warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)
  Vue.util = util
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = util.nextTick

  Vue.options = Object.create(null)
  config._assetTypes.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  Vue.options._base = Vue

  util.extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//源码有点长，我去掉了引用部分和一些注释。</span>
export function initGlobalAPI (Vue: GlobalAPI) {
  <span class="hljs-comment">// config</span>
  const configDef = {}
  configDef<span class="hljs-selector-class">.get</span> = () =&gt; config
  <span class="hljs-keyword">if</span> (process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> !== <span class="hljs-string">'production'</span>) {
    configDef<span class="hljs-selector-class">.set</span> = () =&gt; {
      util.warn(
        <span class="hljs-string">'Do not replace the Vue.config object, set individual fields instead.'</span>
      )
    }
  }
  Object.defineProperty(Vue, <span class="hljs-string">'config'</span>, configDef)
  Vue<span class="hljs-selector-class">.util</span> = util
  Vue<span class="hljs-selector-class">.set</span> = set
  Vue<span class="hljs-selector-class">.delete</span> = <span class="hljs-selector-tag">del</span>
  Vue<span class="hljs-selector-class">.nextTick</span> = util<span class="hljs-selector-class">.nextTick</span>

  Vue<span class="hljs-selector-class">.options</span> = Object.create(null)
  config._assetTypes.forEach(type =&gt; {
    Vue<span class="hljs-selector-class">.options</span>[type + <span class="hljs-string">'s'</span>] = Object.create(null)
  })

  Vue<span class="hljs-selector-class">.options</span>._base = Vue

  util.extend(Vue<span class="hljs-selector-class">.options</span><span class="hljs-selector-class">.components</span>, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}</code></pre>
<p>initGlobal的代码就是对Vue进行各种方法和属性定义</p>
<ul>
<li><p>【Vue.config】  各种全局配置项</p></li>
<li><p>【Vue.util】    各种工具函数，还有一些兼容性的标志位（哇，不用自己判断浏览器了，Vue已经判断好了）</p></li>
<li><p>【Vue.set/delete】  这个你文档应该见过</p></li>
<li><p>【Vue.nextTick】</p></li>
<li><p>【Vue.options】 这个options和我们上面用来构造实例的options不一样。这个是Vue默认提供的资源（组件指令过滤器）。</p></li>
<li><p>【Vue.use】 通过initUse方法定义</p></li>
<li><p>【Vue.mixin】 通过initMixin方法定义</p></li>
<li><p>【Vue.extend】通过initExtend方法定义</p></li>
</ul>
<p>这些定义的全局api可好玩了，平常我们多是用实例上的方法。其实构造器上也绑了不少好用的方法。<br>有兴趣的同学，可以用下方代码去探究一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在你的vue项目里，谷歌命令行键入
Object.getOwnPropertyNames(Vue)  //可以看定义在对象上的所有属性名/方法名
Vue.config
Vue.util
Vue.set.toString()  //我们平常在控制台上是看不了一个函数到底源码怎么样的，用toString()就可以啦" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>在你的vue项目里，谷歌命令行键入
Object.getOwnPropertyNames(Vue)  <span class="hljs-comment">//可以看定义在对象上的所有属性名/方法名</span>
Vue<span class="hljs-selector-class">.config</span>
Vue<span class="hljs-selector-class">.util</span>
Vue<span class="hljs-selector-class">.set</span><span class="hljs-selector-class">.toString</span>()  <span class="hljs-comment">//我们平常在控制台上是看不了一个函数到底源码怎么样的，用toString()就可以啦</span></code></pre>
<h3 id="articleHeader8">Vue构造器的定义</h3>
<p>src/core/instance/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//构造函数，当new Vue(options) 会自动执行这个函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &amp;&amp;
    !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//构造函数，当new Vue(options) 会自动执行这个函数</span>
function Vue (options) {
  <span class="hljs-keyword">if</span> (process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.NODE_ENV</span> !== <span class="hljs-string">'production'</span> &amp;&amp;
    !(this instanceof Vue)) {
    warn(<span class="hljs-string">'Vue is a constructor and should be called with the `new` keyword'</span>)
  }
  this._init(options)
}

<span class="hljs-function"><span class="hljs-title">initMixin</span><span class="hljs-params">(Vue)</span></span>
<span class="hljs-function"><span class="hljs-title">stateMixin</span><span class="hljs-params">(Vue)</span></span>
<span class="hljs-function"><span class="hljs-title">eventsMixin</span><span class="hljs-params">(Vue)</span></span>
<span class="hljs-function"><span class="hljs-title">lifecycleMixin</span><span class="hljs-params">(Vue)</span></span>
<span class="hljs-function"><span class="hljs-title">renderMixin</span><span class="hljs-params">(Vue)</span></span></code></pre>
<p>这里就不一个一个函数展开了<br>构造函数里其实就一句话，this._init(options)</p>
<p>initMixin之类的方法，定义了实例上的方法，下面给出一个探索地图，以供探究源码</p>
<p><span class="img-wrap"><img data-src="/img/bVNzzV?w=714&amp;h=356" src="https://static.alili.tech/img/bVNzzV?w=714&amp;h=356" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到 以 "_"为开头的方法，多半是Vue内部使用，但不公开的api。<br>以“$” 为开头的方法，是文档中公开给用户使用的默认api</p>
<p>至此，我们对Vue的结构有了个初步的了解，以及相关api的原始出处有了初步了解。</p>
<p>在学习的过程中，参考了两位大牛的文章，收益良多<br><a href="http://jiongks.name/blog/vue-code-review/" rel="nofollow noreferrer" target="_blank">囧克斯 Vue.js源码学习笔记</a><br><a href="https://www.qcloud.com/community/article/914746001486266056" rel="nofollow noreferrer" target="_blank">王鹤 Vue.js 2.0源码解析之前端渲染篇</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Vue源码探究一】当我们引入Vue，我们引入了什么？

## 原文链接
[https://segmentfault.com/a/1190000009392574](https://segmentfault.com/a/1190000009392574)

